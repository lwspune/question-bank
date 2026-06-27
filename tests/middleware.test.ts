/**
 * Pure unit test for the route guard middleware.
 * Mocks @supabase/ssr so this runs without a live database.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

let mockUser: { id: string } | null = null;

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(async () => ({ data: { user: mockUser }, error: null })),
    },
  })),
}));

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-test-key";
  mockUser = null;
});

describe("middleware route guard", () => {
  it("redirects unauthenticated /dashboard requests to /browse (public-pivot)", async () => {
    // Post Phase A of the public-product pivot: anon users hitting an admin
    // route land on the public browse page (login is reachable from the
    // AppHeader Sign in button).
    const { updateSession } = await import("@/lib/supabase/middleware");
    const req = new NextRequest("http://localhost:3000/dashboard");
    const res = await updateSession(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/browse");
  });

  it("does not redirect /login itself", async () => {
    const { updateSession } = await import("@/lib/supabase/middleware");
    const req = new NextRequest("http://localhost:3000/login");
    const res = await updateSession(req);

    expect([200, 204]).toContain(res.status);
  });

  it("allows authenticated users through to /dashboard", async () => {
    mockUser = { id: "00000000-0000-0000-0000-000000000001" };
    const { updateSession } = await import("@/lib/supabase/middleware");
    const req = new NextRequest("http://localhost:3000/dashboard");
    const res = await updateSession(req);

    expect([200, 204]).toContain(res.status);
  });
});

describe("middleware matcher scope", () => {
  // The middleware runs a Supabase auth.getUser() network call on every matched
  // request. Scoping it to the signed-in surfaces only (the four self-guarding
  // authenticated route prefixes) keeps that cost off the public, anon-heavy
  // traffic (/browse, /notes, /guide, ...) — which was ~40% of Vercel Active
  // CPU (the entire Edge runtime line). See the 2026-06-27 Decisions entry.
  const AUTH_PREFIXES = ["/dashboard", "/account", "/upload", "/uploads"];

  it("scopes the matcher to authenticated surfaces only — no public catch-all", async () => {
    const { config } = await import("@/middleware");
    expect(Array.isArray(config.matcher)).toBe(true);

    for (const entry of config.matcher) {
      // The old broad matcher was a negative-lookahead catch-all "/((?!...).*)"
      // that ran middleware on every public page. Guard against regressing to it.
      expect(entry.startsWith("/((")).toBe(false);
      expect(
        AUTH_PREFIXES.some(
          (p) => entry === p || entry.startsWith(p + "/")
        )
      ).toBe(true);
    }
  });

  it("covers every authenticated prefix (and its subpaths)", async () => {
    const { config } = await import("@/middleware");
    for (const prefix of AUTH_PREFIXES) {
      expect(config.matcher).toContain(prefix);
      expect(config.matcher).toContain(`${prefix}/:path*`);
    }
  });
});
