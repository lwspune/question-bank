/**
 * The routes V's practice-test builder calls (2026-10-15):
 *   GET  /api/practice-tests/options  the choices for each step, the same for
 *                                     everyone, so the CDN may keep them
 *   POST /api/practice-tests          build one test, signed-in students only
 *   POST /api/chat/builder            count a builder step for /dashboard/chat
 * Every answer has the shape { ok: true, ... } or { ok: false, error }.
 */
import { describe, it, expect, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const STARTED = new Date().toISOString();

const get = (query: string) => new NextRequest(`http://localhost:3000/api/practice-tests/options${query}`);
const post = (url: string, body: unknown) =>
  new NextRequest(`http://localhost:3000${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `builder-${Math.random().toString(36).slice(2, 10)}` },
    body: JSON.stringify(body),
  });

describe("GET /api/practice-tests/options", () => {
  it("lists the exams V can build for, and lets the CDN keep the answer", async () => {
    const { GET } = await import("@/app/api/practice-tests/options/route");
    const res = await GET(get(""));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage");
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.exams).toContainEqual({ slug: "nda", name: "NDA" });
  });

  it("lists an exam's subjects", async () => {
    const { GET } = await import("@/app/api/practice-tests/options/route");
    const body = await (await GET(get("?exam=nda"))).json();
    expect(body.ok).toBe(true);
    expect(body.subjects).toContainEqual({ key: "physics", label: "Physics" });
  });

  it("refuses an exam or a subject V does not build for", async () => {
    const { GET } = await import("@/app/api/practice-tests/options/route");
    const exam = await GET(get("?exam=neet"));
    expect(exam.status).toBe(404);
    expect((await exam.json()).ok).toBe(false);
    const subject = await GET(get("?exam=nda&subject=astrology"));
    expect(subject.status).toBe(404);
  });
});

describe("POST /api/practice-tests", () => {
  it("asks a signed-out visitor to sign in", async () => {
    const { POST } = await import("@/app/api/practice-tests/route");
    const res = await POST(post("/api/practice-tests", {}));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ ok: false, signIn: true });
  });
});

describe.skipIf(!HAS_ENV)("POST /api/chat/builder", () => {
  afterAll(async () => {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    await admin.from("chat_interactions").delete().eq("event_type", "builder_step").gte("created_at", STARTED);
  });

  it("records a builder step", async () => {
    const { POST } = await import("@/app/api/chat/builder/route");
    const res = await POST(post("/api/chat/builder", { step: "open" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("refuses a step it does not know", async () => {
    const { POST } = await import("@/app/api/chat/builder/route");
    const res = await POST(post("/api/chat/builder", { step: "hack" }));
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });
});
