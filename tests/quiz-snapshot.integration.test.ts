/**
 * Integration test for the quiz question SNAPSHOT (migration 0035): assembling a
 * quiz stores an immutable copy of its questions on the quiz row, so a later
 * change to an underlying atom can't break the recorded quiz (the bug where a
 * re-harvested bundle atom rendered a question with no options).
 *
 * Flow: insert ready atoms → assemble → snapshot stored → BREAK an atom
 * (options→null, status→needs_review) → listAssembledQuizzes still returns the
 * quiz's ORIGINAL questions. Skips if Supabase env isn't loaded.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
// admin.ts is a server module (`import "server-only"`) — stub it for the runner.
vi.mock("server-only", () => ({}));
import { assembleNextQuiz } from "@/lib/quiz/assemble";
import { listAssembledQuizzes } from "@/lib/quiz/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const ROUTE = `snaptest${STAMP}`;
const CHAPTER = "ch";
const N = 12; // balancedSizes min — one full quiz
const atomKeys = Array.from({ length: N }, (_, i) => `${ROUTE}:formula:${i}`);

describe.skipIf(!HAS_ENV)("quiz question snapshot (migration 0035)", () => {
  let admin: SupabaseClient;
  let quizId = "";

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const rows = atomKeys.map((k, i) => ({
      atom_key: k, exam: "NDA", subject_route: ROUTE, chapter_slug: CHAPTER,
      subtopic_slug: "s", concept_slug: `c${i}`, source_kind: "formula", source_index: 0,
      theme: "formula", stem: `Stem ${i}`, correct: "A",
      options: { A: `a${i}`, B: `b${i}`, C: `c${i}`, D: `d${i}` }, answer: "A",
      status: "verified", source_fingerprint: `fp-${STAMP}-${i}`, looks_mcq_clean: true,
    }));
    await admin.from("quiz_atoms").insert(rows);
  });

  afterAll(async () => {
    if (!admin) return;
    if (quizId) {
      await admin.from("quiz_atoms_map").delete().eq("quiz_id", quizId);
      await admin.from("quizzes").delete().eq("id", quizId);
    }
    await admin.from("quiz_atoms").delete().in("atom_key", atomKeys);
  });

  it("assembles a quiz and stores an immutable question snapshot on the quiz row", async () => {
    const r = await assembleNextQuiz(admin, { route: ROUTE, chapter: CHAPTER, push: null });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.questionCount).toBe(N);

    const { data } = await admin
      .from("quizzes")
      .select("id, theme, questions")
      .eq("slug", r.slug)
      .single();
    quizId = data!.id;
    expect(data!.theme).toBe("formula");
    expect(Array.isArray(data!.questions)).toBe(true);
    expect((data!.questions as unknown[]).length).toBe(N);
    expect((data!.questions as Array<{ stem: string }>)[0].stem).toMatch(/Stem \d/);
  });

  it("survives a later atom change — the recorded quiz keeps its original questions", async () => {
    // Break an atom that's in the quiz: options→null, status→needs_review (the
    // exact shape a re-harvested bundle slot takes).
    await admin.from("quiz_atoms").update({ options: null, status: "needs_review" }).eq("atom_key", atomKeys[0]);

    const quizzes = await listAssembledQuizzes();
    const mine = quizzes.find((q) => q.id === quizId);
    expect(mine).toBeDefined();
    // Snapshot intact: still N questions, none optionless.
    expect(mine!.questions).toHaveLength(N);
    expect(mine!.questions.every((q) => q.options !== null)).toBe(true);
    expect(mine!.theme).toBe("formula");
  });
});
