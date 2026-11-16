/**
 * The header's identity follows a sign-in or sign-out on the same page load
 * (2026-11-16). Before this, the identity was fetched once per page load and
 * kept: signing in on /login moved the person on without a reload, so the
 * header kept the signed-out answer and said "Sign in" until a refresh. Sign-out
 * did the mirror image.
 *
 *  - createIdentityTracker decides WHEN to ask again: only when the signed-in
 *    user actually changes. Supabase also says SIGNED_IN when a tab regains
 *    focus, and a refresh on every focus would cost a request for nothing.
 *  - refreshViewerSession drops the kept answer, asks again and tells every
 *    mounted hook.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createIdentityTracker } from "@/lib/viewer/identityTracker";
import {
  fetchViewerSession,
  refreshViewerSession,
  resetViewerSessionCache,
  subscribeViewerSession,
} from "@/lib/viewer/useViewerSession";

describe("createIdentityTracker", () => {
  it("takes the first observation as the starting point, without asking again", () => {
    expect(createIdentityTracker().observe(null)).toBe(false);
    expect(createIdentityTracker().observe("u1")).toBe(false);
  });

  it("asks again on a sign-in", () => {
    const t = createIdentityTracker();
    t.observe(null);
    expect(t.observe("u1")).toBe(true);
  });

  it("asks again on a sign-out", () => {
    const t = createIdentityTracker();
    t.observe("u1");
    expect(t.observe(null)).toBe(true);
  });

  it("asks again when a different account signs in", () => {
    const t = createIdentityTracker();
    t.observe("u1");
    expect(t.observe("u2")).toBe(true);
  });

  it("does not ask again for the same user (tab focus, token refresh)", () => {
    const t = createIdentityTracker();
    t.observe("u1");
    expect(t.observe("u1")).toBe(false);
    t.observe(null);
    expect(t.observe(null)).toBe(false);
  });
});

describe("refreshViewerSession", () => {
  const session = { email: "a@b.c", role: null };
  let cookie = "";

  beforeEach(() => {
    resetViewerSessionCache();
    cookie = "";
    vi.stubGlobal("document", {
      get cookie() {
        return cookie;
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ session }), { status: 200 }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    resetViewerSessionCache();
  });

  it("replaces a signed-out answer kept from before the sign-in", async () => {
    expect(await fetchViewerSession()).toBeNull(); // no sign-in cookie yet
    cookie = "sb-proj-auth-token=x";
    expect(await fetchViewerSession()).toBeNull(); // still the kept answer

    await refreshViewerSession();
    expect(await fetchViewerSession()).toEqual(session);
  });

  it("tells every subscriber the new answer, and stops after unsubscribe", async () => {
    const seen: unknown[] = [];
    const off = subscribeViewerSession((s) => seen.push(s));
    cookie = "sb-proj-auth-token=x";
    await refreshViewerSession();
    expect(seen).toEqual([session]);

    off();
    cookie = "";
    await refreshViewerSession();
    expect(seen).toEqual([session]);
  });

  it("gives null after a sign-out, without asking the server", async () => {
    cookie = "sb-proj-auth-token=x";
    expect(await fetchViewerSession()).toEqual(session);
    cookie = "";
    await refreshViewerSession();
    expect(await fetchViewerSession()).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
