/**
 * Integration test for POST /api/public-quiz/submit — the funnel's one anon
 * write. Drives the route handler directly (like sync-mock-flow) against the
 * live DB: happy path records a lead + returns the key; consent/mobile/slug
 * validation. A fresh per-run x-forwarded-for keeps the rate-limit bucket clean.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { POST } from "@/app/api/public-quiz/submit/route";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const QUIZ_ID = "00000000-0000-4000-8002-" + String(STAMP).padStart(12, "0").slice(-12);
const PUBLIC_SLUG = `subtest-${STAMP}`;
const IP = `203.0.113.${STAMP % 254}`;
const atomKeys = [0, 1, 2].map((i) => `subtest-${STAMP}:practiceSet:${i}`);

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/public-quiz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": IP },
    body: JSON.stringify(body),
  });
}

describe.skipIf(!HAS_ENV)("POST /api/public-quiz/submit", () => {
  let admin: SupabaseClient;
  const atomIds: string[] = [];
  const MOBILE = "9" + String(800000000 + (STAMP % 100000000));

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    await admin.from("quizzes").insert({
      id: QUIZ_ID, slug: `subtest-q-${STAMP}`, exam: "NDA", subject: "Maths",
      title: "Submit Test Quiz", chapter: "Probability", status: "published", public_slug: PUBLIC_SLUG,
    });
    const atomRows = atomKeys.map((k, i) => ({
      atom_key: k, exam: "NDA", subject_route: "nda-maths", chapter_slug: "probability",
      subtopic_slug: "classical-probability-counting", concept_slug: `sc-${i}`,
      source_kind: "practiceSet", source_index: i, theme: "computation",
      stem: `Stem ${i}`, correct: ["A", "B", "C"][i],
      options: { A: "a", B: "b", C: "c", D: "d" }, answer: ["A", "B", "C"][i],
      status: "verified", source_fingerprint: `fp-${STAMP}-${i}`, looks_mcq_clean: true,
    }));
    const { data } = await admin.from("quiz_atoms").insert(atomRows).select("id");
    for (const r of data ?? []) atomIds.push(r.id);
    await admin.from("quiz_atoms_map").insert(
      atomIds.map((id, i) => ({ quiz_id: QUIZ_ID, atom_id: id, position: i + 1 }))
    );
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("quiz_leads").delete().eq("quiz_id", QUIZ_ID);
    await admin.from("quiz_atoms_map").delete().eq("quiz_id", QUIZ_ID);
    await admin.from("quiz_atoms").delete().in("atom_key", atomKeys);
    await admin.from("quizzes").delete().eq("id", QUIZ_ID);
  });

  it("grades a submission, records a lead, and returns the key + billingLive", async () => {
    const res = await POST(
      makeRequest({
        slug: PUBLIC_SLUG, name: "  Tester  ", mobile: MOBILE, consent: true,
        answers: { "1": "A", "2": "B", "3": "A" }, utmSource: "quiz:subtest",
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchObject({ correct: 2, incorrect: 1, notAttempted: 0, total: 3 });
    expect(json.key).toEqual({ "1": "A", "2": "B", "3": "C" });
    expect(json.notesLinks["1"]).toContain("/notes/nda-maths/probability");
    expect(typeof json.billingLive).toBe("boolean");

    const { data, count } = await admin
      .from("quiz_leads")
      .select("name, mobile, attempts", { count: "exact" })
      .eq("quiz_id", QUIZ_ID);
    expect(count).toBe(1);
    expect(data![0]).toMatchObject({ name: "Tester", mobile: `91${MOBILE}`, attempts: 1 });
  });

  it("rejects a submission without consent (400)", async () => {
    const res = await POST(
      makeRequest({ slug: PUBLIC_SLUG, name: "X", mobile: MOBILE, consent: false, answers: {} })
    );
    expect(res.status).toBe(400);
  });

  it("rejects an invalid mobile (400)", async () => {
    const res = await POST(
      makeRequest({ slug: PUBLIC_SLUG, name: "X", mobile: "12345", consent: true, answers: {} })
    );
    expect(res.status).toBe(400);
  });

  it("returns 404 for an unknown / un-published slug", async () => {
    const res = await POST(
      makeRequest({ slug: "no-such-public-slug", name: "X", mobile: MOBILE, consent: true, answers: {} })
    );
    expect(res.status).toBe(404);
  });
});
