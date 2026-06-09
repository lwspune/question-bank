/**
 * Integration tests for the public-quiz server reads + lead recording. Exercises
 * the real DB: the public gate (public_slug), the KEY-STRIPPED public payload
 * (the security spine — an anon page must never receive `answer`), the grading
 * fetch, and the retake-aware upsert RPC (migration 0034).
 *
 * Skips if Supabase env isn't loaded. Creates + tears down a clearly-prefixed
 * quiz + atoms + map + lead.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getPublicQuizBySlug,
  getGradingBySlug,
  recordLead,
  resolvePublicQuizForChapter,
} from "@/lib/quiz/publicQuiz";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const QUIZ_ID = "00000000-0000-4000-8000-" + String(STAMP).padStart(12, "0").slice(-12);
const PUBLIC_SLUG = `pubtest-${STAMP}`;
// Chapter token so the published quiz's slug follows the `${route}-${chapter}-…`
// convention that resolvePublicQuizForChapter matches on.
const CH = `resq${STAMP}`;
const PRIVATE_SLUG_QUIZ_ID = "00000000-0000-4000-8001-" + String(STAMP).padStart(12, "0").slice(-12);
const MOBILE = "91" + String(9000000000 + (STAMP % 1000000000));

const atomKeys = [0, 1, 2].map((i) => `pubtest-${STAMP}:practiceSet:${i}`);

describe.skipIf(!HAS_ENV)("public-quiz server reads + lead recording", () => {
  let admin: SupabaseClient;
  const atomIds: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    // A PUBLIC quiz + a PRIVATE one (public_slug null) to prove the gate.
    await admin.from("quizzes").insert([
      { id: QUIZ_ID, slug: `nda-maths-${CH}-formula-1`, exam: "NDA", subject: "Maths", title: "Public Test Quiz", chapter: "Probability", status: "published", public_slug: PUBLIC_SLUG },
      { id: PRIVATE_SLUG_QUIZ_ID, slug: `pubtest-priv-${STAMP}`, exam: "NDA", subject: "Maths", title: "Private Test Quiz", chapter: "Probability", status: "draft" },
    ]);

    const atomRows = atomKeys.map((k, i) => ({
      atom_key: k, exam: "NDA", subject_route: "nda-maths", chapter_slug: "probability",
      subtopic_slug: "classical-probability-counting", concept_slug: `concept-${i}`,
      source_kind: "practiceSet", source_index: i, theme: "computation",
      stem: `Test stem ${i}`, correct: ["A", "B", "C"][i],
      options: { A: "opt a", B: "opt b", C: "opt c", D: "opt d" },
      answer: ["A", "B", "C"][i], status: "verified",
      source_fingerprint: `fp-${STAMP}-${i}`, looks_mcq_clean: true,
    }));
    const { data: inserted } = await admin.from("quiz_atoms").insert(atomRows).select("id");
    for (const r of inserted ?? []) atomIds.push(r.id);

    await admin.from("quiz_atoms_map").insert(
      atomIds.map((id, i) => ({ quiz_id: QUIZ_ID, atom_id: id, position: i + 1 }))
    );
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("quiz_leads").delete().eq("quiz_id", QUIZ_ID);
    await admin.from("quiz_atoms_map").delete().eq("quiz_id", QUIZ_ID);
    await admin.from("quiz_atoms").delete().in("atom_key", atomKeys);
    await admin.from("quizzes").delete().in("id", [QUIZ_ID, PRIVATE_SLUG_QUIZ_ID]);
  });

  it("returns a public quiz by slug with ordered, KEY-STRIPPED questions", async () => {
    const quiz = await getPublicQuizBySlug(admin, PUBLIC_SLUG);
    expect(quiz).not.toBeNull();
    expect(quiz!.title).toBe("Public Test Quiz");
    expect(quiz!.questions).toHaveLength(3);
    expect(quiz!.questions[0]).toMatchObject({ q: 1, stem: "Test stem 0" });
    expect(quiz!.questions[0].options).toMatchObject({ A: "opt a", D: "opt d" });
    // THE SECURITY ASSERTION: no answer key on any question. (Scoped to the
    // questions array — the quiz-level `marking` legitimately has a `correct`
    // field, so a whole-payload substring scan would false-positive.)
    for (const q of quiz!.questions) {
      expect(q).not.toHaveProperty("answer");
      expect(q).not.toHaveProperty("correct");
    }
    expect(JSON.stringify(quiz!.questions)).not.toContain('"answer"');
  });

  it("returns null for a private (un-published) quiz and an unknown slug", async () => {
    expect(await getPublicQuizBySlug(admin, `pubtest-priv-${STAMP}`)).toBeNull();
    expect(await getPublicQuizBySlug(admin, "no-such-slug-ever")).toBeNull();
  });

  it("exposes the answer key + concept links only via the server grading fetch", async () => {
    const g = await getGradingBySlug(admin, PUBLIC_SLUG);
    expect(g).not.toBeNull();
    expect(g!.quizId).toBe(QUIZ_ID);
    expect(g!.questions.map((q) => q.answer)).toEqual(["A", "B", "C"]);
    expect(g!.questions[0]).toMatchObject({ q: 1, subjectRoute: "nda-maths", chapterSlug: "probability" });
  });

  it("resolves the newest published quiz for a chapter; null when none", async () => {
    const ref = await resolvePublicQuizForChapter(admin, "nda-maths", CH);
    expect(ref).not.toBeNull();
    expect(ref!.publicSlug).toBe(PUBLIC_SLUG);
    expect(ref!.title).toBe("Public Test Quiz");
    expect(ref!.questionCount).toBe(3);
    expect(await resolvePublicQuizForChapter(admin, "nda-maths", "no-such-chapter-xyz")).toBeNull();
  });

  it("records a lead, and a retake bumps attempts + keeps best_score (one row)", async () => {
    await recordLead(admin, {
      quizId: QUIZ_ID, name: "Tester", mobile: MOBILE,
      score: 2, correct: 2, incorrect: 1, notAttempted: 0, total: 3,
      answers: { "1": "A", "2": "B", "3": "A" }, utmSource: "quiz:pubtest",
    });
    // Retake with a BETTER score.
    await recordLead(admin, {
      quizId: QUIZ_ID, name: "Tester", mobile: MOBILE,
      score: 3, correct: 3, incorrect: 0, notAttempted: 0, total: 3,
      answers: { "1": "A", "2": "B", "3": "C" },
    });
    const { data, count } = await admin
      .from("quiz_leads")
      .select("attempts, best_score, score, utm_source", { count: "exact" })
      .eq("quiz_id", QUIZ_ID)
      .eq("mobile", MOBILE);
    expect(count).toBe(1); // no duplicate lead
    expect(data![0]).toMatchObject({ attempts: 2, best_score: 3, score: 3 });
    expect(data![0].utm_source).toBe("quiz:pubtest"); // retained from first attempt
  });
});
