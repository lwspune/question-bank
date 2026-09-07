/**
 * Find bank rows that can REPLACE an irredeemably-flawed question in a practice
 * mock, without changing the paper's blueprint shape.
 *
 *   npx tsx scripts/mocks/find-replacements.ts
 *
 * A replacement must match the flawed question's chapter, subtopic and
 * difficulty (so the paper's coverage is unchanged), be PUBLIC and gradeable
 * (a mock renders content live through the RLS-bound client — a PRIVATE ref
 * shows a BLANK question and grades it skipped), and must NOT already appear in
 * that same paper (the same row twice would silently turn two printed questions
 * into one).
 *
 * Prints candidates for a human to choose from. Chooses nothing itself — which
 * question a student sits is an editorial call, not a query result.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** The five questions that cannot be repaired without inventing content. */
const NEEDED = [
  { paper: "t1", n: 62, chapter: "Probability", subtopic: "Probability via Counting", difficulty: "MODERATE" },
  { paper: "t1", n: 72, chapter: "Statistics", subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation", difficulty: "MODERATE" },
  { paper: "t1", n: 110, chapter: "3D Geometry", subtopic: "Sphere", difficulty: "MODERATE" },
  { paper: "t3", n: 44, chapter: "Matrices & Determinants", subtopic: "Linear Systems — Consistency, Cramer's Rule, Solution Space", difficulty: "MODERATE" },
  { paper: "t3", n: 100, chapter: "Lines", subtopic: "Triangles, Quadrilaterals, and Polygons", difficulty: "MODERATE" },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const sittings = JSON.parse(
    readFileSync(join(__dirname, "data", "nda2-2026-practice.json"), "utf8")
  ) as { key: string; questions: { kind: string; questionId?: string }[] }[];
  /** Every bank row already used by a paper — a replacement must avoid these. */
  const usedByPaper = new Map<string, Set<string>>(
    sittings.map((s) => [s.key, new Set(s.questions.flatMap((q) => (q.questionId ? [q.questionId] : [])))])
  );
  /** …and every row used by ANY of the five, so two papers can't take the same one. */
  const usedAnywhere = new Set([...usedByPaper.values()].flatMap((s) => [...s]));

  for (const want of NEEDED) {
    const { data: st, error: sErr } = await db
      .from("subtopics")
      .select("id, name, chapter:chapters!inner(name, subject:subjects!inner(name, exam:exams!inner(name)))")
      .eq("name", want.subtopic);
    if (sErr) throw new Error(sErr.message);
    const match = (st ?? []).find((r) => {
      const ch = (Array.isArray(r.chapter) ? r.chapter[0] : r.chapter) as { name: string; subject: unknown };
      const su = (Array.isArray(ch?.subject) ? ch.subject[0] : ch?.subject) as { name: string; exam: unknown };
      const ex = (Array.isArray(su?.exam) ? su.exam[0] : su?.exam) as { name: string };
      return ch?.name === want.chapter && su?.name === "Mathematics" && ex?.name === "NDA";
    });
    if (!match) { console.log(`\n${want.paper} Q${want.n}: NO SUBTOPIC "${want.subtopic}" under NDA/Mathematics/${want.chapter}`); continue; }

    const { data: rows, error } = await db
      .from("questions")
      .select("id, difficulty, text, question_kind, set_id, context, options(label, text, is_correct)")
      .eq("subtopic_id", match.id)
      .eq("visibility", "PUBLIC")
      .eq("difficulty", want.difficulty)
      .limit(400);
    if (error) throw new Error(error.message);

    const used = usedByPaper.get(want.paper) ?? new Set<string>();
    const ok = (rows ?? []).filter((r) => {
      const o = (r.options ?? []) as { label: string; text: string; is_correct: boolean }[];
      const texts = o.map((x) => (x.text ?? "").trim());
      return (
        !used.has(r.id) && !usedAnywhere.has(r.id) &&
        // RULE 1 (from build-blueprint-mock.ts): NEVER take a set member. A row
        // carrying a set_id OR a context depends on a shared stimulus, so on its
        // own it is unanswerable — "What is u+v+w equal to?" is a real candidate
        // this filter removes. Testing `context` as well as `set_id` matters:
        // the LWS sources contain rows that share a context with set_id NULL.
        r.set_id === null && (r.context === null || String(r.context).trim() === "") &&
        o.length === 4 && o.filter((x) => x.is_correct).length === 1 &&
        texts.every((t) => t.length > 0) && new Set(texts).size === 4 &&
        (r.text ?? "").trim().length > 0
      );
    });
    console.log(`\n${want.paper} Q${want.n}  [${want.chapter} / ${want.subtopic} / ${want.difficulty}]`);
    console.log(`   ${(rows ?? []).length} same-subtopic PUBLIC rows at that difficulty; ${ok.length} eligible (unused here, 4 distinct options, exactly 1 correct)`);
    for (const c of ok.slice(0, 5)) {
      console.log(`   - ${c.id}  [${c.question_kind}]  ${(c.text ?? "").replace(/\s+/g, " ").slice(0, 105)}`);
    }
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
