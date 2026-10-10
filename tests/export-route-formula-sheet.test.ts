/**
 * POST /api/export/formula-sheet (2026-10-10): one chapter's formula sheet as
 * a PDF. Its own route, not a fourth shape on /api/export: the sheet reads the
 * /notes registry (1,884 data modules), which must not land in the paper
 * route's bundle (the 2026-10-02 bundle incident).
 *
 * These are the checks that run before the download gate, so a plain POST
 * reaches them; the chapter lookup is a registry read, so it sits before the
 * gate too and an unknown chapter is a 404 here. Nothing past the gate is
 * reachable without cookies (see export-route-kind.test.ts).
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

const RUN_ID = randomUUID().slice(0, 8);

function post(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/export/formula-sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `formula-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export/formula-sheet", () => {
  it("refuses a body that names no chapter", async () => {
    const { POST } = await import("@/app/api/export/formula-sheet/route");
    expect((await POST(post({}))).status).toBe(400);
    expect((await POST(post({ subjectRoute: "nda-maths" }))).status).toBe(400);
    expect((await POST(post({ subjectRoute: "nda-maths", chapterSlug: "" }))).status).toBe(400);
  });

  it("refuses a chapter that is not in the notes registry", async () => {
    const { POST } = await import("@/app/api/export/formula-sheet/route");
    const res = await POST(post({ subjectRoute: "nda-maths", chapterSlug: "no-such-chapter" }));
    expect(res.status).toBe(404);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/formula-sheet/route");
    const res = await POST(post({ subjectRoute: "nda-maths", chapterSlug: "trigonometric-identities" }));
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/sign in/i);
  });
});
