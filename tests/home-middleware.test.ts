/**
 * The homepage `/` is a cached page (2026-11-06). Before that it read the
 * session during render to send signed-in people to their own home, which made
 * every visit, including every crawler's, a fresh server render. The decision
 * now lives in middleware:
 *
 * - no Supabase cookie: the cached page, and NO auth call (the bulk of traffic);
 * - no Supabase cookie but a chosen exam (qb_exam): the cached copy with that
 *   exam first, by rewrite, so the URL stays `/`;
 * - a Supabase cookie and a live user: a redirect to their own home, as before;
 * - a Supabase cookie that is no longer a session: treated as signed out.
 *
 * Supabase is mocked; the routing decisions are real.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { pathToRegexp } = require("next/dist/compiled/path-to-regexp") as {
  pathToRegexp: (path: string) => RegExp;
};

let mockUser: { id: string; email: string } | null = null;
let mockRole: "ADMIN" | "TEACHER" | null = null;
const getUser = vi.fn(async () => ({ data: { user: mockUser }, error: null }));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(async () => ({
            data: mockRole ? { role: mockRole } : null,
            error: null,
          })),
        })),
      })),
    })),
  })),
}));

const { middleware, config } = await import("@/middleware");

const AUTH = "sb-wunvtnqlzjrkvolslbnm-auth-token=abc";

function home(cookie?: string): NextRequest {
  return new NextRequest("https://www.pyqvault.com/", {
    headers: { host: "www.pyqvault.com", ...(cookie ? { cookie } : {}) },
  });
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-test-key";
  mockUser = null;
  mockRole = null;
  getUser.mockClear();
});

describe("middleware on the homepage", () => {
  it("runs on / in production (the matcher is a literal list there)", () => {
    const literal = (config.matcher as unknown[]).filter((m): m is string => typeof m === "string");
    expect(literal.some((m) => pathToRegexp(m).test("/"))).toBe(true);
  });

  it("serves a signed-out visitor the cached page without asking Supabase", async () => {
    const res = await middleware(home());
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(getUser).not.toHaveBeenCalled();
  });

  it("serves a signed-out visitor who chose an exam the cached copy with it first", async () => {
    const res = await middleware(home("qb_exam=nda"));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://www.pyqvault.com/home-exam/nda");
    expect(getUser).not.toHaveBeenCalled();
  });

  it("ignores a qb_exam value that is not an exam", async () => {
    const res = await middleware(home("qb_exam=..%2Fdashboard"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.headers.get("location")).toBeNull();
  });

  it("sends a signed-in student to /me", async () => {
    mockUser = { id: "u1", email: "s@example.com" };
    const res = await middleware(home(AUTH));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://www.pyqvault.com/me");
  });

  it("sends an admin to /dashboard and a teacher to /browse", async () => {
    mockUser = { id: "u2", email: "a@example.com" };
    mockRole = "ADMIN";
    expect((await middleware(home(AUTH))).headers.get("location")).toBe("https://www.pyqvault.com/dashboard");
    mockRole = "TEACHER";
    expect((await middleware(home(AUTH))).headers.get("location")).toBe("https://www.pyqvault.com/browse");
  });

  it("treats a stale sign-in cookie as signed out, keeping the chosen exam", async () => {
    const res = await middleware(home(`${AUTH}; qb_exam=nda`));
    expect(getUser).toHaveBeenCalledTimes(1);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://www.pyqvault.com/home-exam/nda");
  });
});
