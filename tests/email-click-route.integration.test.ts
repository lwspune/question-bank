/**
 * /api/e/[token] against the TEST project: the click redirect records ONE
 * email_clicked per send for the student it was sent to, redirects to the
 * same-site path, and never strands a reader — an unknown token or an
 * off-site `to` still redirects (to the path, or to /) and records nothing.
 *
 * Since 2026-09-30 it also SIGNS THE STUDENT IN on a fresh link (a phone's
 * in-app browser holds no session, so /drill bounced every nudge to /login).
 * The route reads and writes cookies through next/headers, which throws
 * outside a request, so `cookies()` is replaced here by an in-memory jar —
 * what lands in the jar is what Next would attach to the response.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/e/[token]/route";
import { newClickToken } from "@/lib/email/click";
import { SIGNED_LINK_DAYS } from "@/lib/email/signedLink";

const { jar } = vi.hoisted(() => ({ jar: new Map<string, string>() }));
vi.mock("next/headers", () => ({
  cookies: () => ({
    getAll: () => [...jar.entries()].map(([name, value]) => ({ name, value })),
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => {
      if (value === "") jar.delete(name);
      else jar.set(name, value);
    },
  }),
}));

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `click_${STAMP}@test.invalid`;
const DAY = 86_400_000;

const hasSession = () => [...jar.keys()].some((k) => /^sb-.*-auth-token/.test(k));

function req(token: string, to?: string): NextRequest {
  const url = new URL(`http://localhost/api/e/${token}`);
  if (to !== undefined) url.searchParams.set("to", to);
  return new NextRequest(url);
}

describe.skipIf(!HAS_ENV)("email click redirect", () => {
  let admin: SupabaseClient;
  let userId = "";
  const sendIds: string[] = [];
  const token = newClickToken();
  let sendId = "";

  async function insertSend(clickToken: string, createdAt?: Date): Promise<string> {
    const { data, error } = await admin
      .from("email_sends")
      .insert({
        user_id: userId,
        kind: "due_nudge",
        to_email: EMAIL,
        subject: "test",
        ref_kind: "drill",
        dedupe_key: `test:click:${STAMP}:${clickToken}`,
        status: "sent",
        click_token: clickToken,
        ...(createdAt ? { created_at: createdAt.toISOString() } : {}),
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    sendIds.push(data.id as string);
    return data.id as string;
  }

  async function clickMeta(id: string): Promise<Record<string, unknown> | null> {
    const { data } = await admin
      .from("user_activity")
      .select("metadata")
      .eq("dedupe_key", `email_click:${id}`)
      .maybeSingle();
    return (data?.metadata as Record<string, unknown>) ?? null;
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const u = await admin.auth.admin.createUser({ email: EMAIL, password: "test-password-12345", email_confirm: true });
    userId = u.data.user!.id;
    sendId = await insertSend(token);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    if (sendIds.length) await admin.from("email_sends").delete().in("id", sendIds);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("records one click for the send, signs the student in, and redirects to the same-site path", async () => {
    jar.clear();
    const res = await GET(req(token, "/drill?from=nudge"), { params: { token } });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/drill?from=nudge");

    const { data } = await admin
      .from("user_activity")
      .select("kind, ref_id, metadata, dedupe_key")
      .eq("user_id", userId)
      .eq("kind", "email_clicked");
    expect(data).toHaveLength(1);
    expect(data![0]).toMatchObject({
      ref_id: sendId,
      metadata: { kind: "due_nudge", signIn: "done" },
      dedupe_key: `email_click:${sendId}`,
    });
    expect(hasSession()).toBe(true);
  });

  it("a link older than the window redirects but signs nobody in", async () => {
    jar.clear();
    const stale = newClickToken();
    const id = await insertSend(stale, new Date(Date.now() - (SIGNED_LINK_DAYS + 1) * DAY));
    const res = await GET(req(stale, "/drill"), { params: { token: stale } });
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/drill");
    expect(hasSession()).toBe(false);
    expect(await clickMeta(id)).toMatchObject({ signIn: "expired" });
  });

  it("leaves a live session alone", async () => {
    jar.clear();
    const first = newClickToken();
    await insertSend(first);
    await GET(req(first, "/drill"), { params: { token: first } });
    expect(hasSession()).toBe(true);
    const before = new Map(jar);

    const second = newClickToken();
    const id = await insertSend(second);
    await GET(req(second, "/drill"), { params: { token: second } });
    expect(new Map(jar)).toEqual(before);
    expect(await clickMeta(id)).toMatchObject({ signIn: "session-present" });
  });

  it("a second click on the same send adds nothing", async () => {
    await GET(req(token, "/drill"), { params: { token } });
    const { count } = await admin
      .from("user_activity")
      .select("id", { count: "exact", head: true })
      .eq("dedupe_key", `email_click:${sendId}`);
    expect(count).toBe(1);
  });

  it("an unknown token still redirects and records nothing", async () => {
    const res = await GET(req(newClickToken(), "/start"), { params: { token: newClickToken() } });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/start");
  });

  it("refuses to leave the site", async () => {
    const res = await GET(req(token, "https://evil.example/x"), { params: { token } });
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/");
    const res2 = await GET(req(token, "//evil.example/x"), { params: { token } });
    expect(res2.headers.get("location")).toBe("https://www.pyqvault.com/");
  });
});
