/**
 * /api/export's third request shape (2026-10-07): `mockSlug`, a published past
 * paper downloaded whole. These are the checks that run before the download
 * gate, so a plain POST reaches them (see export-route-kind.test.ts for why
 * nothing past the gate is reachable here). Turning a slug into the paper's
 * questions is pinned by mock-paper-export.test.ts.
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
      "x-forwarded-for": `mock-test-${RUN_ID}-${Math.random().toString(36).slice(2, 8)}`,
    },
    body: JSON.stringify(body),
  });
}

const SLUG = "jee-mains-2026-apr-06-s1-paper-1";
const OPTIONS = { includeSolutions: true };

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/api/export: a past paper by slug", () => {
  it("refuses a slug together with filters", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(post({ kind: "paper", mockSlug: SLUG, filters: { examId: "x" }, options: OPTIONS }));
    expect(res.status).toBe(400);
  });

  it("refuses a slug together with question ids", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(post({ kind: "paper", mockSlug: SLUG, questionIds: ["a"], options: OPTIONS }));
    expect(res.status).toBe(400);
  });

  it("refuses an empty or non-text slug", async () => {
    const { POST } = await import("@/app/api/export/route");
    expect((await POST(post({ kind: "paper", mockSlug: "", options: OPTIONS }))).status).toBe(400);
    expect((await POST(post({ kind: "paper", mockSlug: 42, options: OPTIONS }))).status).toBe(400);
  });

  it("offers a past paper as a paper or a key only", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(post({ kind: "ppt", mockSlug: SLUG, options: OPTIONS }));
    expect(res.status).toBe(400);
  });

  it("reaches the download gate, which turns a signed-out caller away", async () => {
    const { POST } = await import("@/app/api/export/route");
    const res = await POST(post({ kind: "key", mockSlug: SLUG, options: OPTIONS }));
    expect(res.status).toBe(401);
  });
});
