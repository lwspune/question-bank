/**
 * POST /api/chat/similar: "One more like this" (2026-11-08). Signed in only and
 * never cached; the picking is tested in chat-more-like-this.test.ts.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

describe("POST /api/chat/similar", () => {
  it("refuses a signed-out visitor and is never cached", async () => {
    const { POST } = await import("@/app/api/chat/similar/route");
    const req = new NextRequest("http://localhost/api/chat/similar", {
      method: "POST",
      body: JSON.stringify({ questionId: "11111111-1111-4111-8111-111111111111" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(res.headers.get("Cache-Control")).toMatch(/no-store/);
  });
});
