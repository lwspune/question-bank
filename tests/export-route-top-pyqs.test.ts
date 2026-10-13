/**
 * /api/export's `topPyqs` request shape (2026-10-13): one chapter's top PYQs
 * from a published homework plan. These are the checks that run before the
 * download gate, so a plain POST reaches them (see export-route-kind.test.ts for
 * why nothing past the gate is reachable here). Choosing and printing the
 * questions is pinned by homework-top-pyqs.test.ts.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

const RUN_ID = randomUUID().slice(0, 8);

function post(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `top-pyqs-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const TOP = { plan: "mh-hsc-12-maths", chapter: "0f8b1c3e-2a4d-4e5f-9a6b-7c8d9e0f1a2b" };
const OPTIONS = { format: "pdf" };

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export: a chapter's top PYQs", () => {
  it("refuses top PYQs together with any other request shape", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const extra of [
      { mockSlug: "x" },
      { filters: { examId: "x" } },
      { questionIds: ["a"] },
      { homework: { slug: "mh-hsc-12-maths", day: 1 } },
      { boardPaper: { exam: "cbse-12", slug: "x" } },
    ]) {
      const res = await POST(post({ kind: "paper", topPyqs: TOP, ...extra, options: OPTIONS }));
      expect(res.status).toBe(400);
    }
  });

  it("refuses a request that does not name a plan and a chapter id", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const topPyqs of [{ plan: "Bad Slug", chapter: TOP.chapter }, { plan: "ok", chapter: "nope" }, "mh-hsc-12-maths"]) {
      expect((await POST(post({ kind: "paper", topPyqs, options: OPTIONS }))).status).toBe(400);
    }
  });

  it("offers the top PYQs as a paper or a key only", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "ppt", topPyqs: TOP, options: OPTIONS }))).status).toBe(400);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "paper", topPyqs: TOP, options: OPTIONS }))).status).toBe(401);
  });
});
