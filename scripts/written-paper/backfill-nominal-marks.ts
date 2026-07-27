/**
 * Backfill `questions.nominal_marks` (migration 0063) for the Maharashtra SSC
 * Class 10 PYQs, derived from each question's ORIGINAL slot in the real board
 * paper (`question_number`).
 *
 * WHY ONLY THIS CORPUS: Class 10 is the one place marks are FREE. A board paper
 * fixes what a Q.2(B) is worth, and the ingest preserved the slot — so this is a
 * deterministic lookup, no LLM and no judgement. Every other corpus (textbook
 * exercises: MH HSC 12, CBSE 12, MH SB 9) carries refs like "Ex 3.1 Q5", which
 * say nothing about size; those are tagged at ingest going forward, never by a
 * mass backfill.
 *
 * WHAT IS DELIBERATELY SKIPPED (each leaves the row NULL rather than guessing):
 *   - OLD-SYLLABUS YEARS. 2016-2018 Maths papers are a flat Q1..Q5 with no A/B
 *     split, and 2019 is a transitional 9-slot paper with a Q6 — the same slot
 *     LABEL means different marks there, so only modern sittings are touched.
 *     (Science's 2016-2019 papers likewise predate the Q.2(A)/(B) split.)
 *   - SUB-PART ROWS. Q3(ii)(a)/(b)/(c) are three rows of ONE 3-mark question;
 *     tagging each 3 would treble its apparent weight. See provenance.ts.
 *   - Anything whose slot isn't in the modern map.
 *
 * Marks are an INDICATIVE SOURCING HINT, never a printed value — the printed
 * mark comes from the paper's slot. See migration 0063 and written/types.ts.
 *
 * IDEMPOTENT: writes only where nominal_marks IS NULL (unless --force), so a
 * re-run is a no-op and a teacher's manual correction is never clobbered.
 *
 *   npx tsx scripts/written-paper/backfill-nominal-marks.ts           # dry run
 *   npx tsx scripts/written-paper/backfill-nominal-marks.ts --apply
 *   npx tsx scripts/written-paper/backfill-nominal-marks.ts --apply --force
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  deriveNominalMarks,
  SSC_MATHS_SLOT_MARKS,
  SSC_SCIENCE_SLOT_MARKS,
  parseQuestionNumber,
  type SlotMarksMap,
} from "../../src/lib/papers/written/provenance";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const FORCE = process.argv.includes("--force");
const PAGE = 1000;

const EXAM_NAME = "Maharashtra State Board Class 10";

/**
 * Sittings that use the modern pattern, per subject family. Derived from the
 * bank itself (the slot shape changes at these boundaries), not assumed:
 * 2021 is absent everywhere because the March 2021 SSC exams were cancelled.
 */
const MODERN_YEARS = [2020, 2022, 2023, 2024, 2025, 2026];

const SUBJECT_MAPS: { subjects: string[]; marks: SlotMarksMap; family: string }[] = [
  { family: "Maths", subjects: ["Algebra", "Geometry"], marks: SSC_MATHS_SLOT_MARKS },
  {
    family: "Science",
    subjects: ["Science and Technology I", "Science and Technology II"],
    marks: SSC_SCIENCE_SLOT_MARKS,
  },
];

type Row = {
  id: string;
  question_number: string | null;
  pyq_year: number | null;
  nominal_marks: number | null;
  subject_id: string;
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env (URL / SERVICE_ROLE_KEY).");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const examId = await lookupId(db, "exams", EXAM_NAME);
  if (!examId) throw new Error(`Exam not found: ${EXAM_NAME}`);

  let totalTagged = 0;
  const skipped = { oldYear: 0, subPart: 0, unknownSlot: 0, alreadySet: 0 };

  for (const group of SUBJECT_MAPS) {
    for (const subjectName of group.subjects) {
      const subjectId = await lookupId(db, "subjects", subjectName, examId);
      if (!subjectId) {
        console.log(`  ! subject not found, skipping: ${subjectName}`);
        continue;
      }

      const rows = await fetchRows(db, examId, subjectId);
      const updates: { id: string; marks: number }[] = [];

      for (const r of rows) {
        if (r.nominal_marks != null && !FORCE) {
          skipped.alreadySet += 1;
          continue;
        }
        if (!r.pyq_year || !MODERN_YEARS.includes(r.pyq_year)) {
          skipped.oldYear += 1;
          continue;
        }
        const marks = deriveNominalMarks(r.question_number, group.marks);
        if (marks == null) {
          const parsed = parseQuestionNumber(r.question_number);
          if (parsed && parsed.depth > 1) skipped.subPart += 1;
          else skipped.unknownSlot += 1;
          continue;
        }
        updates.push({ id: r.id, marks });
      }

      console.log(
        `${subjectName}: ${rows.length} rows -> ${updates.length} taggable ` +
          `(${group.family} pattern)`
      );
      printHistogram(updates);

      if (APPLY) {
        for (const u of updates) {
          const { error } = await db
            .from("questions")
            .update({ nominal_marks: u.marks })
            .eq("id", u.id);
          if (error) throw new Error(`update ${u.id}: ${error.message}`);
        }
      }
      totalTagged += updates.length;
    }
  }

  console.log(
    `\n${APPLY ? "TAGGED" : "WOULD TAG"} ${totalTagged} questions.\n` +
      `Skipped — old/transitional sitting: ${skipped.oldYear}, ` +
      `sub-part row: ${skipped.subPart}, ` +
      `slot not in modern pattern: ${skipped.unknownSlot}, ` +
      `already tagged: ${skipped.alreadySet}`
  );
  if (!APPLY) console.log("\nDry run — nothing written. Re-run with --apply.");
}

/** Paged read: the PostgREST 1000-row cap silently truncates a bare select. */
async function fetchRows(
  db: SupabaseClient,
  examId: string,
  subjectId: string
): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, pyq_year, nominal_marks, subject_id")
      .eq("exam_id", examId)
      .eq("subject_id", subjectId)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as Row[];
    out.push(...batch);
    if (batch.length < PAGE) break;
  }
  return out;
}

async function lookupId(
  db: SupabaseClient,
  table: "exams" | "subjects",
  name: string,
  examId?: string
): Promise<string | null> {
  let q = db.from(table).select("id").eq("name", name);
  if (examId) q = q.eq("exam_id", examId);
  const { data } = await q.maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

function printHistogram(updates: { marks: number }[]) {
  if (updates.length === 0) return;
  const by = new Map<number, number>();
  for (const u of updates) by.set(u.marks, (by.get(u.marks) ?? 0) + 1);
  const parts = [...by.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([m, n]) => `${m}m:${n}`);
  console.log(`    ${parts.join("  ")}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
