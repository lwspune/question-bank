/**
 * POST /api/chat/typed (2026-10-09): V takes a typed question, stores it with
 * personal details masked, and answers with the owner's fixed reply.
 */
import { describe, it, expect, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { TYPED_QUESTION_REPLY } from "@/lib/chat/typed";

const RUN = randomUUID().slice(0, 8);
const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

function post(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/chat/typed", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `typed-${RUN}-${Math.random().toString(36).slice(2, 8)}` },
    body: JSON.stringify(body),
  });
}

describe.skipIf(!HAS_ENV)("/api/chat/typed", () => {
  afterAll(async () => {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    await admin.from("chat_interactions").delete().like("message", `route-${RUN}%`);
  });

  it("refuses an empty question and one over 500 characters", async () => {
    const { POST } = await import("@/app/api/chat/typed/route");
    expect((await POST(post({ message: "   " }))).status).toBe(400);
    expect((await POST(post({ message: "x".repeat(501) }))).status).toBe(400);
  });

  it("stores a question with its phone number masked and gives the fixed reply", async () => {
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN} call me on 9876543210` }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, reply: TYPED_QUESTION_REPLY });

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data } = await admin.from("chat_interactions").select("message").like("message", `route-${RUN}%`);
    expect(data).toEqual([{ message: `route-${RUN} call me on [phone]` }]);
  });
});
