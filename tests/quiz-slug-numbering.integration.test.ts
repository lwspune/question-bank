/**
 * Regression test for the quiz slug-numbering bug: the next slug index must be
 * MAX(existing suffix)+1, not COUNT+1 — otherwise deleting a middle quiz (a gap)
 * makes the next assemble collide with an existing slug and silently overwrite it
 * (and a multi-quiz loop produces N copies of the same slug). Skips without env.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assembleNextQuiz } from "@/lib/quiz/assemble";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const ROUTE = `slugtest${STAMP}`;
const CHAPTER = "ch";
const BASE = `${ROUTE}-${CHAPTER}-formula`;
const atomKeys = Array.from({ length: 12 }, (_, i) => `${ROUTE}:formula:${i}`);
// Two existing quizzes with a GAP (1 and 3 — no 2). count=2 → buggy n=3 (collides);
// correct n = max(1,3)+1 = 4.
const id1 = "00000000-0000-4000-8005-" + (STAMP % 1e12).toString().padStart(12, "0");
const id3 = "00000000-0000-4000-8006-" + (STAMP % 1e12).toString().padStart(12, "0");

describe.skipIf(!HAS_ENV)("quiz slug numbering (gap-safe)", () => {
  let admin: SupabaseClient;
  let newSlug = "";

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    await admin.from("quiz_atoms").insert(atomKeys.map((k, i) => ({
      atom_key: k, exam: "NDA", subject_route: ROUTE, chapter_slug: CHAPTER, subtopic_slug: "s",
      concept_slug: `c${i}`, source_kind: "formula", source_index: 0, theme: "formula",
      stem: `Stem ${i}`, correct: "A", options: { A: `a${i}`, B: `b${i}`, C: `c${i}`, D: `d${i}` },
      answer: "A", status: "verified", source_fingerprint: `fp-${STAMP}-${i}`, looks_mcq_clean: true,
    })));
    await admin.from("quizzes").insert([
      { id: id1, slug: `${BASE}-1`, exam: "NDA", subject: "Maths", title: "g1", chapter: "Ch", status: "draft", theme: "formula", questions: [{ position: 1, stem: "x", options: { A: "1", B: "2", C: "3", D: "4" }, answer: "A", conceptSlug: "c" }] },
      { id: id3, slug: `${BASE}-3`, exam: "NDA", subject: "Maths", title: "g3", chapter: "Ch", status: "draft", theme: "formula", questions: [{ position: 1, stem: "x", options: { A: "1", B: "2", C: "3", D: "4" }, answer: "A", conceptSlug: "c" }] },
    ]);
  });

  afterAll(async () => {
    if (!admin) return;
    if (newSlug) {
      const { data } = await admin.from("quizzes").select("id").eq("slug", newSlug).maybeSingle();
      if (data) { await admin.from("quiz_atoms_map").delete().eq("quiz_id", data.id); await admin.from("quizzes").delete().eq("id", data.id); }
    }
    await admin.from("quizzes").delete().in("id", [id1, id3]);
    await admin.from("quiz_atoms").delete().in("atom_key", atomKeys);
  });

  it("numbers the next quiz from MAX suffix + 1, skipping the gap (no overwrite)", async () => {
    const r = await assembleNextQuiz(admin, { route: ROUTE, chapter: CHAPTER, theme: "formula", push: null });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    newSlug = r.slug;
    expect(r.slug).toBe(`${BASE}-4`); // max(1,3)+1 — NOT -2 (gap) or -3 (count+1, collision)
  });
});
