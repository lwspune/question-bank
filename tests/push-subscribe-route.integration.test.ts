/**
 * /api/push/subscribe against the TEST project (PUSH_SPEC.md §6).
 *
 * The route verifies the session, then writes with the SERVICE ROLE, because
 * one browser endpoint can change hands on a shared phone and own-row RLS
 * cannot move a row from one user to another. `next/headers` is replaced by an
 * in-memory jar; a real sign-in through the app's own server client fills it,
 * so the route sees exactly the cookies a browser would send.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";

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

import { POST, DELETE } from "@/app/api/push/subscribe/route";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = "push-route-password-1234";
const A = `push-route-a-${RUN_ID}@test.local`;
const B = `push-route-b-${RUN_ID}@test.local`;
const ENDPOINT = `https://fcm.googleapis.com/fcm/send/${RUN_ID}-shared`;
const SUB = {
  endpoint: ENDPOINT,
  expirationTime: null,
  keys: { p256dh: "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQ", auth: "tBHItJI5svbpez7KI4CCXg" },
  userAgent: "Mozilla/5.0 (Linux; Android 14)",
};

function req(method: "POST" | "DELETE", body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/push/subscribe", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function signInAs(email: string) {
  jar.clear();
  const { error } = await createSupabaseServerClient().auth.signInWithPassword({ email, password: PASSWORD });
  if (error) throw new Error(`sign in ${email}: ${error.message}`);
}

describe.skipIf(!HAS_ENV)("/api/push/subscribe", () => {
  let admin: SupabaseClient;
  let aId = "";
  let bId = "";

  const owner = async () => {
    const { data } = await admin.from("push_subscriptions").select("user_id, user_agent").eq("endpoint", ENDPOINT);
    return data ?? [];
  };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const [a, b] = await Promise.all([
      admin.auth.admin.createUser({ email: A, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: B, password: PASSWORD, email_confirm: true }),
    ]);
    aId = a.data.user!.id;
    bId = b.data.user!.id;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("push_subscriptions").delete().eq("endpoint", ENDPOINT);
    if (aId) await admin.auth.admin.deleteUser(aId);
    if (bId) await admin.auth.admin.deleteUser(bId);
  });

  it("refuses a signed-out browser", async () => {
    jar.clear();
    const res = await POST(req("POST", SUB));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ ok: false });
  });

  it("refuses a malformed subscription before touching the database", async () => {
    await signInAs(A);
    const res = await POST(req("POST", { ...SUB, endpoint: "http://insecure.example/x" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ ok: false });
  });

  it("stores the browser for the signed-in student", async () => {
    await signInAs(A);
    const res = await POST(req("POST", SUB));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(await owner()).toEqual([{ user_id: aId, user_agent: SUB.userAgent }]);
  });

  it("a second student on the same browser takes the endpoint over", async () => {
    await signInAs(B);
    expect((await POST(req("POST", SUB))).status).toBe(200);
    expect((await owner()).map((r) => r.user_id)).toEqual([bId]);
  });

  it("DELETE removes only the caller's own row", async () => {
    await signInAs(A);
    expect((await DELETE(req("DELETE", { endpoint: ENDPOINT }))).status).toBe(200);
    expect((await owner()).map((r) => r.user_id)).toEqual([bId]);

    await signInAs(B);
    expect((await DELETE(req("DELETE", { endpoint: ENDPOINT }))).status).toBe(200);
    expect(await owner()).toEqual([]);
  });
});
