/**
 * `mustSignIn` — a test sign-in that FAILS LOUDLY.
 *
 * 41 of the suite's 56 `signInWithPassword` calls discarded the result
 * (found 2026-09-21). Supabase Auth limits `/auth/v1/token` to 150 requests
 * per 5 minutes per IP, so a rate-limited sign-in returned an error nobody
 * read, the client stayed ANONYMOUS, and the test then failed on a write as
 * `42501 new row violates row-level security policy` — a fake RLS regression
 * that points nowhere near the cause. At 8 forks an entire run read that way.
 *
 * The helper is deliberately NOT retried: a rate limit is not a blip, and
 * retrying it only burns more of the same window.
 */
import { describe, it, expect } from "vitest";
import { mustSignIn } from "./helpers/fixture";

type Creds = { email: string; password: string };
type AuthResult = {
  data: { session: unknown } | null;
  error: { message: string } | null;
};

function fakeClient(result: AuthResult) {
  const calls: Creds[] = [];
  return {
    calls,
    auth: {
      signInWithPassword: async (c: Creds) => {
        calls.push(c);
        return result;
      },
    },
  };
}

const CREDS = { email: "alice@test.local", password: "pw" };

describe("mustSignIn", () => {
  it("resolves on success and passes the credentials straight through", async () => {
    const client = fakeClient({ data: { session: { access_token: "t" } }, error: null });
    await expect(mustSignIn("alice", client, CREDS)).resolves.toBeUndefined();
    expect(client.calls).toEqual([CREDS]);
  });

  it("THROWS on an auth error, naming the label and the reason", async () => {
    const client = fakeClient({
      data: { session: null },
      error: { message: "Request rate limit reached" },
    });
    await expect(mustSignIn("alice", client, CREDS)).rejects.toThrow(
      /sign in "alice".*Request rate limit reached/
    );
  });

  it("does not retry — a rate limit is not a transient blip", async () => {
    const client = fakeClient({
      data: { session: null },
      error: { message: "Request rate limit reached" },
    });
    await mustSignIn("alice", client, CREDS).catch(() => undefined);
    expect(client.calls).toHaveLength(1);
  });

  it("treats no-error-but-no-session as a failure — never hands back an anonymous client", async () => {
    const client = fakeClient({ data: { session: null }, error: null });
    await expect(mustSignIn("alice", client, CREDS)).rejects.toThrow(/sign in "alice".*no session/);
  });
});
