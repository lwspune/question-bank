/**
 * /api/e/[token] against the TEST project: the click redirect records ONE
 * email_clicked per send for the student it was sent to, redirects to the
 * same-site path, and never strands a reader — an unknown token or an
 * off-site `to` still redirects (to the path, or to /) and records nothing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/e/[token]/route";
import { newClickToken } from "@/lib/email/click";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `click_${STAMP}@test.invalid`;

function req(token: string, to?: string): NextRequest {
  const url = new URL(`http://localhost/api/e/${token}`);
  if (to !== undefined) url.searchParams.set("to", to);
  return new NextRequest(url);
}

describe.skipIf(!HAS_ENV)("email click redirect", () => {
  let admin: SupabaseClient;
  let userId = "";
  let sendId = "";
  const token = newClickToken();

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const u = await admin.auth.admin.createUser({ email: EMAIL, password: "test-password-12345", email_confirm: true });
    userId = u.data.user!.id;
    const { data, error } = await admin
      .from("email_sends")
      .insert({
        user_id: userId,
        kind: "due_nudge",
        to_email: EMAIL,
        subject: "test",
        ref_kind: "drill",
        dedupe_key: `test:click:${STAMP}`,
        status: "sent",
        click_token: token,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    sendId = data.id as string;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.from("email_sends").delete().eq("id", sendId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("records one click for the send and redirects to the same-site path", async () => {
    const res = await GET(req(token, "/drill?from=nudge"), { params: { token } });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/drill?from=nudge");

    const { data } = await admin
      .from("user_activity")
      .select("kind, ref_id, metadata, dedupe_key")
      .eq("user_id", userId)
      .eq("kind", "email_clicked");
    expect(data).toHaveLength(1);
    expect(data![0]).toMatchObject({ ref_id: sendId, metadata: { kind: "due_nudge" }, dedupe_key: `email_click:${sendId}` });
  });

  it("a second click on the same send adds nothing", async () => {
    await GET(req(token, "/drill"), { params: { token } });
    const { count } = await admin
      .from("user_activity")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("kind", "email_clicked");
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
