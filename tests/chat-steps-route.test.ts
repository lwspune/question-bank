/**
 * POST /api/chat/steps: the step chips' taps (tapped a step, Explain, Reply;
 * owner 2026-11-15). Signed in only and never cached. What a tap reads as is
 * tested in chat-step-chips.test.ts, its stored shape in
 * v-step-chips.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

const QID = "11111111-1111-4111-8111-111111111111";

describe("POST /api/chat/steps", () => {
  it("refuses a signed-out visitor and is never cached", async () => {
    const { POST } = await import("@/app/api/chat/steps/route");
    const req = new NextRequest("http://localhost/api/chat/steps", {
      method: "POST",
      body: JSON.stringify({ questionId: QID, action: "explain", step: 0 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(res.headers.get("Cache-Control")).toMatch(/no-store/);
  });
});
