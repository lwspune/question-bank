/**
 * POST /api/chat/steps: "Teach me step by step" (V_SPEC.md section 0, step 1).
 * Signed in only and never cached. Which questions get steps is tested in
 * chat-solution-steps.test.ts, the events in chat-step-by-step.test.ts, and
 * the "explained today" rule in v-step-by-step.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

const QID = "11111111-1111-4111-8111-111111111111";

describe("POST /api/chat/steps", () => {
  it("refuses a signed-out visitor and is never cached", async () => {
    const { POST } = await import("@/app/api/chat/steps/route");
    const req = new NextRequest("http://localhost/api/chat/steps", {
      method: "POST",
      body: JSON.stringify({ questionId: QID, action: "open", step: 0 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(res.headers.get("Cache-Control")).toMatch(/no-store/);
  });
});
