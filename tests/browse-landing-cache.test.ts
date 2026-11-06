/**
 * The bare `/browse` landing is a CACHED page for signed-out visitors in India
 * (2026-11-07). 48% of /browse renders carried no filters, and each one was a
 * fresh 200 KB server render of an exam picker that is the same for every
 * signed-out visitor. Middleware rewrites those requests to /browse-start/<x>,
 * a cached copy built by the same render code with a fixed, signed-out request:
 *
 * - `all` when the visitor chose no exam (the indexable copy);
 * - the exam's slug when qb_exam names one, so it still comes first.
 *
 * Everything else reaches the live page exactly as before: any query string,
 * a sign-in cookie, a practice-only exam cookie (the page scopes to it), a
 * visitor outside India (the pass price is per country), the intl host.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const { pathToRegexp } = require("next/dist/compiled/path-to-regexp") as {
  pathToRegexp: (path: string) => RegExp;
};

const getUser = vi.fn(async () => ({ data: { user: null }, error: null }));
vi.mock("@supabase/ssr", () => ({ createServerClient: vi.fn(() => ({ auth: { getUser } })) }));

const { middleware, config } = await import("@/middleware");

function browse(path = "/browse", opts: { cookie?: string; country?: string | null; host?: string } = {}) {
  const host = opts.host ?? "www.pyqvault.com";
  const headers: Record<string, string> = { host };
  if (opts.cookie) headers.cookie = opts.cookie;
  if (opts.country !== null) headers["x-vercel-ip-country"] = opts.country ?? "IN";
  return new NextRequest(`https://${host}${path}`, { headers });
}

const rewriteOf = (res: Response) => res.headers.get("x-middleware-rewrite");

beforeEach(() => getUser.mockClear());

describe("middleware on bare /browse", () => {
  it("runs on /browse in production", () => {
    const literal = (config.matcher as unknown[]).filter((m): m is string => typeof m === "string");
    expect(literal.some((m) => pathToRegexp(m).test("/browse"))).toBe(true);
  });

  it("sends a signed-out visitor in India to the cached landing", async () => {
    expect(rewriteOf(await middleware(browse()))).toBe("https://www.pyqvault.com/browse-start/all");
    expect(getUser).not.toHaveBeenCalled();
  });

  it("keeps a chosen exam first", async () => {
    expect(rewriteOf(await middleware(browse("/browse", { cookie: "qb_exam=nda" })))).toBe(
      "https://www.pyqvault.com/browse-start/nda"
    );
  });

  it("treats a cookie that is not an exam as no choice", async () => {
    expect(rewriteOf(await middleware(browse("/browse", { cookie: "qb_exam=nope" })))).toBe(
      "https://www.pyqvault.com/browse-start/all"
    );
  });

  it("leaves everything else on the live page", async () => {
    const live = [
      browse("/browse?examId=01d193e7-74cf-4dd0-83b5-ef98ee221e67"),
      browse("/browse", { cookie: "sb-wunvtnqlzjrkvolslbnm-auth-token=x" }),
      browse("/browse", { cookie: "qb_exam=foundation-course" }), // practice-only: the page scopes to it
      browse("/browse", { country: "US" }),
      browse("/browse", { country: null }),
    ];
    for (const req of live) {
      const res = await middleware(req);
      expect(rewriteOf(res), req.url).toBeNull();
      expect(res.headers.get("location"), req.url).toBeNull();
    }
    expect(getUser).not.toHaveBeenCalled();
  });
});

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

describe("the cached landing reads nothing about the request", () => {
  const REQUEST_READS = [
    "cookies(",
    "headers(",
    "getSessionUser",
    "getSessionMember",
    "getPageIdentity",
    "createSupabaseServerClient",
    "sessionHasAnyScope",
    "sessionPaperFree",
    "auth.getUser(",
    "force-dynamic",
  ];

  it("in its page file", () => {
    const src = read("src", "app", "browse-start", "[exam]", "page.tsx");
    // `searchParams: {}` is the fixed empty request; reading the URL's is what is banned.
    for (const r of [...REQUEST_READS, "props.searchParams"]) expect(src, r).not.toContain(r);
    expect(src).toMatch(/export const revalidate = \d+/);
  });

  it("in the render code it shares with /browse (every request read lives in browse/page.tsx)", () => {
    const src = read("src", "app", "browse", "renderBrowse.tsx");
    for (const r of REQUEST_READS) expect(src, r).not.toContain(r);
  });

  it("indexes only the no-exam copy, and points every copy at /browse", () => {
    const src = read("src", "app", "browse-start", "[exam]", "page.tsx");
    expect(src).toMatch(/canonical:\s*"\/browse"/);
    expect(src).toMatch(/index:\s*false/);
  });
});
