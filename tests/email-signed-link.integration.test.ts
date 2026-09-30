/**
 * signInFromSend against the TEST project: an admin-minted magic link is
 * verified in the SAME call, so the student's browser gets a session and no
 * email is ever sent. A plain anon client stands in for the SSR client the
 * route uses — both are SupabaseClients, and the session it holds afterwards
 * is the proof.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { signInFromSend } from "@/lib/email/signedLinkService";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `signed_${STAMP}@test.invalid`;

function authClient(): SupabaseClient {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

describe.skipIf(!HAS_ENV)("signInFromSend", () => {
  let admin: SupabaseClient;
  let userId = "";

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const u = await admin.auth.admin.createUser({ email: EMAIL, password: "test-password-12345", email_confirm: true });
    userId = u.data.user!.id;
  });

  afterAll(async () => {
    if (admin && userId) await admin.auth.admin.deleteUser(userId);
  });

  it("mints a session for the send's student, without any email being sent", async () => {
    const auth = authClient();
    expect(await signInFromSend(admin, auth, userId)).toBe(true);
    const { data } = await auth.auth.getUser();
    expect(data.user?.id).toBe(userId);
  });

  it("returns false for a user that does not exist, and throws nothing", async () => {
    const auth = authClient();
    expect(await signInFromSend(admin, auth, randomUUID())).toBe(false);
    expect((await auth.auth.getUser()).data.user).toBeNull();
  });
});
