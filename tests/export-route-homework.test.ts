/**
 * /api/export's fourth request shape (2026-10-09): `homework`, one day of a
 * published homework plan. These are the checks that run before the download
 * gate, so a plain POST reaches them (see export-route-kind.test.ts for why
 * nothing past the gate is reachable here). Turning a day into its questions
 * is pinned by homework-day-export.test.ts.
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
      "x-forwarded-for": `homework-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const DAY = { slug: "mh-hsc-12-maths", day: 1 };
const OPTIONS = { format: "pdf" };

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export: a homework day", () => {
  it("refuses a day together with a past paper, filters or question ids", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const extra of [{ mockSlug: "x" }, { filters: { examId: "x" } }, { questionIds: ["a"] }]) {
      const res = await POST(post({ kind: "paper", homework: DAY, ...extra, options: OPTIONS }));
      expect(res.status).toBe(400);
    }
  });

  it("refuses a day that does not name a plan and a whole day number", async () => {
    const { POST } = await import("@/app/api/export/route");
    for (const homework of [{ slug: "Bad Slug", day: 1 }, { slug: "ok", day: 0 }, "mh-hsc-12-maths:1"]) {
      expect((await POST(post({ kind: "paper", homework, options: OPTIONS }))).status).toBe(400);
    }
  });

  it("offers a day as a paper or a key only", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "ppt", homework: DAY, options: OPTIONS }))).status).toBe(400);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "paper", homework: DAY, options: OPTIONS }))).status).toBe(401);
  });
});
