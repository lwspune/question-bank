/**
 * Integration tests for the daily-quiz link: the public-only read behind the
 * rotation, /go/quiz (the Instagram bio + highlight link) and /api/quiz/today
 * (what the LWS publisher reads to make the Story, DM and Telegram post).
 *
 * Skips without Supabase env. Creates + tears down one public and one private
 * clearly-prefixed quiz.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { listRotationQuizzes } from "@/lib/quiz/publicQuiz";
import { GET as goQuizGET } from "@/app/go/quiz/route";
import { GET as todayGET } from "@/app/api/quiz/today/route";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const PUBLIC_ID = "00000000-0000-4000-8002-" + String(STAMP).padStart(12, "0").slice(-12);
const PRIVATE_ID = "00000000-0000-4000-8003-" + String(STAMP).padStart(12, "0").slice(-12);
const PUBLIC_SLUG = `todaytest-${STAMP}`;

const req = (path: string) => new NextRequest(`http://localhost:3000${path}`);

describe.skipIf(!HAS_ENV)("daily quiz link", () => {
  let admin: SupabaseClient;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await admin.from("quizzes").insert([
      { id: PUBLIC_ID, slug: `todaytest-pub-${STAMP}`, exam: "NDA", subject: "Maths", title: "Today Test Quiz", chapter: "Vectors", status: "published", public_slug: PUBLIC_SLUG },
      { id: PRIVATE_ID, slug: `todaytest-priv-${STAMP}`, exam: "NDA", subject: "Maths", title: "Private Today Quiz", chapter: "Vectors", status: "draft" },
    ]);
    if (error) throw new Error(`fixture insert failed: ${error.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("quizzes").delete().in("id", [PUBLIC_ID, PRIVATE_ID]);
  });

  it("reads public quizzes only", async () => {
    const rows = await listRotationQuizzes(admin);
    expect(rows).toContainEqual({ publicSlug: PUBLIC_SLUG, title: "Today Test Quiz", chapter: "Vectors" });
    expect(rows.some((r) => r.title === "Private Today Quiz")).toBe(false);
  });

  it("/go/quiz redirects to a public quiz, tagged with where it was posted", async () => {
    const res = await goQuizGET(req("/go/quiz?src=highlight"));
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location")!);
    expect(loc.pathname).toMatch(/^\/quiz\/[^/]+$/);
    expect(loc.searchParams.get("utm_source")).toBe("instagram");
    expect(loc.searchParams.get("utm_medium")).toBe("highlight");
    expect(loc.searchParams.get("utm_campaign")).toBe("daily-quiz");
  });

  it("/go/quiz with no src is the bio link", async () => {
    const res = await goQuizGET(req("/go/quiz"));
    expect(new URL(res.headers.get("location")!).searchParams.get("utm_medium")).toBe("bio");
  });

  it("/api/quiz/today names the same quiz /go/quiz opens", async () => {
    const res = await todayGET(req("/api/quiz/today?src=dm"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data).toMatchObject({
      publicSlug: expect.any(String),
      title: expect.any(String),
    });
    const url = new URL(body.data.url);
    expect(url.origin).toBe("https://www.pyqvault.com");
    expect(url.pathname).toBe(`/quiz/${body.data.publicSlug}`);
    expect(url.searchParams.get("utm_medium")).toBe("dm");

    const go = await goQuizGET(req("/go/quiz"));
    expect(new URL(go.headers.get("location")!).pathname).toBe(`/quiz/${body.data.publicSlug}`);
  });
});
