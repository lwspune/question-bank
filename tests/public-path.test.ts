/**
 * publicPath(): the address a visitor SEES, from the pathname a component reads.
 *
 * Middleware serves some requests from a cached copy at another route (a
 * rewrite: the address bar keeps the original). On the server, usePathname()
 * then returns the copy's route, `/browse-start/all`; in the browser it returns
 * `/browse`. Anything the header draws from the pathname (the tutor link's
 * `from`, the highlighted tab) came out different in the two places, and React
 * threw the cached HTML away on every such visit (error #418, found 2026-11-10).
 *
 * The round-trip tests feed the middleware's OWN rewrite outputs through
 * publicPath(), so a new rewrite that nobody maps back fails here.
 */
import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { publicPath } from "@/lib/nav/publicPath";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const getUser = vi.fn(async () => ({ data: { user: null }, error: null }));
vi.mock("@supabase/ssr", () => ({ createServerClient: vi.fn(() => ({ auth: { getUser } })) }));

const { middleware } = await import("@/middleware");

function request(path: string, cookie?: string) {
  const headers: Record<string, string> = { host: "www.pyqvault.com", "x-vercel-ip-country": "IN" };
  if (cookie) headers.cookie = cookie;
  return new NextRequest(`https://www.pyqvault.com${path}`, { headers });
}

async function rewrittenPath(path: string, cookie?: string): Promise<string | null> {
  const target = (await middleware(request(path, cookie))).headers.get("x-middleware-rewrite");
  return target ? new URL(target).pathname : null;
}

const examSlugs = EXAM_REGISTRY.map((e) => e.slug);

describe("publicPath", () => {
  it("maps the cached /browse landing back to /browse", () => {
    expect(publicPath("/browse-start/all")).toBe("/browse");
    expect(publicPath("/browse-start/nda")).toBe("/browse");
    expect(publicPath("/browse-start")).toBe("/browse");
  });

  it("maps the cached homepage copies back to /", () => {
    expect(publicPath("/home-exam/nda")).toBe("/");
    expect(publicPath("/index")).toBe("/");
  });

  it("leaves every other path alone, matching whole segments only", () => {
    for (const p of ["/", "/browse", "/notes/nda", "/homework", "/homework/x", "/browse-starter", "/indexes", "/mock"]) {
      expect(publicPath(p), p).toBe(p);
    }
  });

  it("reads a missing pathname as the homepage", () => {
    expect(publicPath(null)).toBe("/");
  });
});

describe("publicPath undoes every middleware rewrite on www", () => {
  it("bare /browse, with and without a chosen exam", async () => {
    const cookies = [undefined, "qb_exam=nope", ...examSlugs.map((s) => `qb_exam=${s}`)];
    let rewrites = 0;
    for (const cookie of cookies) {
      const target = await rewrittenPath("/browse", cookie);
      if (target === null) continue; // the live page: nothing to undo
      rewrites++;
      expect(publicPath(target), `${cookie} -> ${target}`).toBe("/browse");
    }
    expect(rewrites).toBeGreaterThan(1);
  });

  it("the homepage, with every chosen exam", async () => {
    let rewrites = 0;
    for (const slug of examSlugs) {
      const target = await rewrittenPath("/", `qb_exam=${slug}`);
      if (target === null) continue;
      rewrites++;
      expect(publicPath(target), `${slug} -> ${target}`).toBe("/");
    }
    expect(rewrites).toBeGreaterThan(1);
  });
});
