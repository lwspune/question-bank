/**
 * Integration test for deleteQuiz: deletes the PYQ Vault quiz row + cascades its
 * quiz_atoms_map; propagation to nda-tracker is push:null here (covered by the
 * push being a plain fetch). Skips if Supabase env isn't loaded.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { deleteQuiz } from "@/lib/quiz/deleteQuiz";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const QUIZ_ID = "00000000-0000-4000-8003-" + String(STAMP).padStart(12, "0").slice(-12);
const SLUG = `deltest-${STAMP}`;
const ATOM_KEY = `deltest-${STAMP}:formula:0`;

describe.skipIf(!HAS_ENV)("deleteQuiz", () => {
  let admin: SupabaseClient;
  let atomId = "";

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    await admin.from("quizzes").insert({
      id: QUIZ_ID, slug: SLUG, exam: "NDA", subject: "Maths", title: "Del Test", chapter: "X", status: "draft",
    });
    const { data } = await admin
      .from("quiz_atoms")
      .insert({
        atom_key: ATOM_KEY, exam: "NDA", subject_route: "nda-maths", chapter_slug: "x",
        subtopic_slug: "s", concept_slug: "c", source_kind: "formula", source_index: 0,
        theme: "formula", stem: "s", correct: "A", options: { A: "a", B: "b", C: "c", D: "d" },
        answer: "A", status: "verified", source_fingerprint: `fp-${STAMP}`, looks_mcq_clean: true,
      })
      .select("id")
      .single();
    atomId = data!.id;
    await admin.from("quiz_atoms_map").insert({ quiz_id: QUIZ_ID, atom_id: atomId, position: 1 });
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("quiz_atoms_map").delete().eq("quiz_id", QUIZ_ID);
    await admin.from("quizzes").delete().eq("id", QUIZ_ID);
    await admin.from("quiz_atoms").delete().eq("atom_key", ATOM_KEY);
  });

  it("deletes the quiz + cascades its map; the atom survives", async () => {
    const r = await deleteQuiz(admin, SLUG, null);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.deleted).toBe(true);
    expect(r.id).toBe(QUIZ_ID);

    const { count: quizCount } = await admin.from("quizzes").select("id", { count: "exact", head: true }).eq("id", QUIZ_ID);
    expect(quizCount).toBe(0);
    const { count: mapCount } = await admin.from("quiz_atoms_map").select("position", { count: "exact", head: true }).eq("quiz_id", QUIZ_ID);
    expect(mapCount).toBe(0); // cascaded
    const { count: atomCount } = await admin.from("quiz_atoms").select("id", { count: "exact", head: true }).eq("atom_key", ATOM_KEY);
    expect(atomCount).toBe(1); // atom freed, not deleted
  });

  it("returns deleted:false for an unknown slug", async () => {
    const r = await deleteQuiz(admin, "no-such-quiz-xyz", null);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.deleted).toBe(false);
  });
});
