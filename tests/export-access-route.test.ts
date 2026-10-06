/**
 * GET /api/export/access (2026-10-07): what the download box needs to know
 * about the viewer, asked from the browser because the pages that show the box
 * are cached copies served to everyone, so they cannot carry it.
 *
 * Signed-in answers need a real request (cookies), which a plain call cannot
 * make, so this pins the signed-out answer and that it is never cached.
 */
import { describe, it, expect } from "vitest";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

describe.skipIf(!HAS_ENV)("GET /api/export/access", () => {
  it("tells a signed-out visitor they are signed out, and offers the pass on sale", async () => {
    const { GET } = await import("@/app/api/export/access/route");
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      signedIn: false,
      isStaff: false,
      hasDownloadPass: false,
      freeDownloadLeft: false,
    });
    expect(body).toHaveProperty("pass");
  });

  it("is never cached: the answer differs per viewer", async () => {
    const { GET } = await import("@/app/api/export/access/route");
    const res = await GET();
    expect(res.headers.get("Cache-Control")).toContain("no-store");
  });
});
