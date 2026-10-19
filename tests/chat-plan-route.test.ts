/**
 * GET /api/chat/plan: the week plan card inside V (2026-10-19, study-partner
 * Phase 3). Signed in only, never cached; the plan itself is read with the
 * student's own login (tested in chat-week-plan-server.integration.test.ts).
 */
import { describe, it, expect } from "vitest";

describe("GET /api/chat/plan", () => {
  it("refuses a signed-out visitor and is never cached", async () => {
    const { GET } = await import("@/app/api/chat/plan/route");
    const res = await GET();
    expect(res.status).toBe(401);
    expect(res.headers.get("Cache-Control")).toMatch(/no-store/);
  });
});
