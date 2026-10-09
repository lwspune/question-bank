/**
 * /api/export's fifth request shape (2026-10-09): `boardPaper`, one published
 * board past paper set from /question-papers. These are the checks that run
 * before the download gate, so a plain POST reaches them (see
 * export-route-kind.test.ts for why nothing past the gate is reachable here).
 * Turning a paper into its download is pinned by question-papers-export.test.ts
 * and board-paper-printed-labels.test.ts.
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
      "x-forwarded-for": `board-paper-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const PAPER = { exam: "cbse-12", slug: "2025-55-1-1" };
const OPTIONS = { format: "pdf" };

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export: a board paper", () => {
  it("refuses a board paper together with any other request shape", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const extra of [
      { mockSlug: "x" },
      { homework: { slug: "x", day: 1 } },
      { filters: { examId: "x" } },
      { questionIds: ["a"] },
    ]) {
      const res = await POST(post({ kind: "paper", boardPaper: PAPER, ...extra, options: OPTIONS }));
      expect(res.status).toBe(400);
    }
  });

  it("refuses a board paper that does not name an exam and a paper", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const boardPaper of [{ exam: "cbse-12" }, { exam: "CBSE 12", slug: "x" }, { exam: "cbse-12", slug: "../x" }, "x"]) {
      expect((await POST(post({ kind: "paper", boardPaper, options: OPTIONS }))).status).toBe(400);
    }
  });

  it("offers a board paper as a paper or a key only", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "ppt", boardPaper: PAPER, options: OPTIONS }))).status).toBe(400);
    expect((await POST(post({ kind: "tags", boardPaper: PAPER, options: OPTIONS }))).status).toBe(400);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "paper", boardPaper: PAPER, options: OPTIONS }))).status).toBe(401);
  });
});
