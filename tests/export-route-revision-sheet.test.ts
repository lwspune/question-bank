/**
 * POST /api/export/revision-sheet (2026-11-03): one /board chapter's quick-
 * revision sheet as a PDF, for Premium Pass holders and institute staff (no
 * free first copy). The checks before the gate run on a plain POST; the sheet
 * lookup is a registry read, so an unknown chapter is a 404 here. Nothing past
 * the gate is reachable without cookies.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { testRunId } from "./helpers/runId";

const RUN_ID = testRunId();

function post(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/export/revision-sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `revision-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const PILOT = { examSlug: "mh-hsc-12", subjectRoute: "physics", chapterSlug: "rotational-dynamics" };

describe.skipIf(!HAS_ENV)("/api/export/revision-sheet", () => {
  it("refuses a body that names no chapter", async () => {
    const { POST } = await import("@/app/api/export/revision-sheet/route");
    expect((await POST(post({}))).status).toBe(400);
    expect((await POST(post({ examSlug: "mh-hsc-12", subjectRoute: "physics" }))).status).toBe(400);
  });

  it("refuses a chapter with no revision sheet", async () => {
    const { POST } = await import("@/app/api/export/revision-sheet/route");
    const res = await POST(post({ ...PILOT, chapterSlug: "no-such-chapter" }));
    expect(res.status).toBe(404);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/revision-sheet/route");
    const res = await POST(post(PILOT));
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/sign in/i);
  });
});
