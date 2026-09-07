/**
 * Build PRACTICE mocks — full-length papers ASSEMBLED from the bank, not sat at
 * a real sitting (migration 0088: `source='practice'`, `scope='full'`).
 *
 *   npx tsx scripts/mocks/build-practice-mocks.ts                    # dry run, all
 *   npx tsx scripts/mocks/build-practice-mocks.ts --apply --publish
 *   npx tsx scripts/mocks/build-practice-mocks.ts --only=nda-practice-maths-01
 *
 * HOW THIS DIFFERS FROM scripts/mocks/build.ts, and why it is a separate path.
 * That script DISCOVERS a paper by asking the corpus a question — which
 * (year, month) sittings exist, or which `source_file`s, or which row blocks
 * within one. A practice paper cannot be discovered: it has no sitting, and its
 * questions are scattered across dozens of unrelated source files, so the paper
 * exists only as an ordered LIST of question identities (data/*.json). What the
 * two share is the part that matters — the pure core (`buildMockPaper`) and the
 * `mock_tests` column list — so a change to how a snapshot is SHAPED lands on
 * both.
 *
 * ORDERING. `buildMockPaper` sorts within a section by `sourceRow`, which for a
 * PYQ paper is the row's index in its source file. Here that is meaningless and
 * actively harmful: an assembled paper draws on 40+ files with overlapping row
 * numbers, so the keys collide and `validatePaperRows` rejects the paper as
 * ambiguous — correctly. The printed question number IS this paper's ordering
 * key, so it is passed as `sourceRow`.
 *
 * THE GATE THAT MATTERS. A mock stores refs and renders content live through the
 * RLS-bound cookie client, so a ref to a PRIVATE or missing row does not error —
 * the student sees a BLANK question and the grader finds no key and scores it
 * skipped. `build.ts` is immune because its fetch is hard-filtered to PUBLIC; a
 * bank-mirrored paper takes its ids from a dedup pass that saw every visibility,
 * so this script re-asserts PUBLIC + exactly-one-correct-option itself and
 * REFUSES the paper otherwise.
 *
 * Writes via the service-role client (bypasses RLS by design, as every ingest).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getBlueprint } from "../../src/lib/mocks/blueprints";
import type { MockAnswerKey, OptionLabel } from "../../src/lib/mocks/answers";
import {
  buildMockPaper,
  type MockPaperSnapshot,
  type PaperQuestionRow,
} from "../../src/lib/mocks/reconstruct";
import type { PracticeQuestionRef } from "./practiceSittings";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type SittingFile = {
  key: string;
  slug: string;
  title: string;
  examSlug: string;
  paperCode: string;
  sourceFile: string;
  note: string;
  questions: PracticeQuestionRef[];
  hold?: string;
};

const DATA = join(__dirname, "data");
const SOURCES = ["nda2-2026-practice.json"];

/** `.in()` puts its filter in the URL — chunk it or PostgREST 400s past ~200 ids. */
const CHUNK = 200;

type Row = {
  id: string;
  visibility: string;
  question_kind: string;
  question_format: string | null;
  numeric_answer: number | null;
  source_file: string | null;
  question_number: string | null;
  chapter_id: string;
  options: { label: string; is_correct: boolean }[];
};

const SELECT =
  "id, visibility, question_kind, question_format, numeric_answer, source_file, question_number, chapter_id, options(label, is_correct)";

async function fetchByIds(db: SupabaseClient, ids: string[]): Promise<Row[]> {
  const out: Row[] = [];
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db.from("questions").select(SELECT).in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`fetchByIds: ${error.message}`);
    out.push(...((data ?? []) as unknown as Row[]));
  }
  return out;
}

/** Rows this ingest committed, addressed by their own source_file. */
async function fetchBySourceFile(db: SupabaseClient, files: string[]): Promise<Row[]> {
  if (files.length === 0) return [];
  const { data, error } = await db.from("questions").select(SELECT).in("source_file", files);
  if (error) throw new Error(`fetchBySourceFile: ${error.message}`);
  return (data ?? []) as unknown as Row[];
}

/** The answer key for a row — mirrors readAnswerKey in build.ts and loadAnswerKey
 *  in query.ts. The build and the grader must agree about what the answer IS. */
function answerOf(r: Row): MockAnswerKey | null {
  if (r.question_format === "numeric") {
    const v = r.numeric_answer;
    return v === null || v === undefined || !Number.isFinite(Number(v))
      ? null
      : { kind: "numeric", value: Number(v) };
  }
  const label = (r.options ?? []).find((o) => o.is_correct)?.label;
  return label ? { kind: "mcq", label: label as OptionLabel } : null;
}

/** Every reason a row cannot back a mock question. Empty = usable. */
function rowProblems(r: Row): string[] {
  const p: string[] = [];
  if (r.visibility !== "PUBLIC") p.push(`${r.visibility} (would render BLANK to a student)`);
  if (r.question_format !== "numeric") {
    const correct = (r.options ?? []).filter((o) => o.is_correct).length;
    if ((r.options ?? []).length !== 4) p.push(`${(r.options ?? []).length} options`);
    if (correct !== 1) p.push(`${correct} correct options`);
  }
  if (!answerOf(r)) p.push("no answer key");
  return p;
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const publish = args.includes("--publish");
  const only = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const sittings: SittingFile[] = SOURCES.flatMap(
    (f) => JSON.parse(readFileSync(join(DATA, f), "utf8")) as SittingFile[]
  ).filter((s) => !only || s.slug === only || s.key === only);
  if (sittings.length === 0) throw new Error(`no sittings matched ${only ?? "(all)"}`);

  // Chapter -> subject name, so assignSection can map each row to a section.
  const { data: chapters, error: cErr } = await db
    .from("chapters").select("id, subject:subjects(name)");
  if (cErr) throw new Error(`chapters: ${cErr.message}`);
  const subjectOf = new Map<string, string>();
  for (const c of (chapters ?? []) as unknown as { id: string; subject: { name: string } | { name: string }[] }[]) {
    const s = Array.isArray(c.subject) ? c.subject[0] : c.subject;
    if (s?.name) subjectOf.set(c.id, s.name);
  }

  const bankIds = [...new Set(sittings.flatMap((s) => s.questions.flatMap((q) => (q.kind === "bank" ? [q.questionId] : []))))];
  const newFiles = [...new Set(sittings.flatMap((s) => s.questions.flatMap((q) => (q.kind === "new" ? [q.sourceFile] : []))))];
  const byId = new Map((await fetchByIds(db, bankIds)).map((r) => [r.id, r]));
  const byNew = new Map(
    (await fetchBySourceFile(db, newFiles)).map((r) => [`${r.source_file}#${r.question_number}`, r])
  );

  let built = 0, held = 0;
  const failures: string[] = [];

  for (const s of sittings) {
    const bp = getBlueprint(s.examSlug, s.paperCode);
    if (!bp) { failures.push(`${s.slug}: no blueprint for ${s.examSlug}/${s.paperCode}`); continue; }

    const rows: PaperQuestionRow[] = [];
    const issues: string[] = [];
    for (const q of s.questions) {
      const r = q.kind === "bank" ? byId.get(q.questionId) : byNew.get(`${q.sourceFile}#${q.questionNumber}`);
      if (!r) {
        issues.push(`n=${q.n}: ${q.kind === "bank" ? q.questionId : `${q.sourceFile}#${q.questionNumber}`} NOT FOUND`);
        continue;
      }
      const probs = rowProblems(r);
      if (probs.length) { issues.push(`n=${q.n}: ${r.id} — ${probs.join("; ")}`); continue; }
      rows.push({
        id: r.id,
        // The PRINTED question number is this paper's ordering key — see the header.
        sourceRow: q.n,
        questionNumber: String(q.n),
        subjectName: subjectOf.get(r.chapter_id) ?? "?",
        answer: answerOf(r),
      });
    }

    if (s.hold) {
      if (issues.length === 0 && rows.length === s.questions.length) {
        failures.push(`${s.slug}: HELD ("${s.hold}") but it now reconstructs whole — delete the hold`);
      } else {
        console.log(`  – ${s.slug.padEnd(24)} HELD: ${s.hold}`);
        held++;
      }
      continue;
    }
    if (issues.length) {
      failures.push(`${s.slug}: ${issues.length} unusable question(s)\n    ` + issues.slice(0, 10).join("\n    ") +
        (issues.length > 10 ? `\n    … and ${issues.length - 10} more` : ""));
      continue;
    }

    let snap: MockPaperSnapshot;
    try {
      snap = buildMockPaper(bp, rows, { year: 0, month: null, title: s.title, slug: s.slug });
    } catch (e) { failures.push(`${s.slug}: ${(e as Error).message}`); continue; }

    console.log(`  ✓ ${snap.slug.padEnd(24)} ${snap.title}  (${snap.totalQuestions}q / ${snap.totalMarks}m)`);

    if (apply) {
      const { data: exam, error: eErr } = await db.from("exams").select("id").eq("name", bp.examName).single();
      if (eErr || !exam) { failures.push(`${s.slug}: exam ${bp.examName} not found`); continue; }
      const { error } = await db.from("mock_tests").upsert(
        {
          id: snap.id, slug: snap.slug, exam_id: exam.id, paper_code: snap.paperCode,
          // An assembled paper has NO sitting — see migration 0088. The CHECK
          // permits a null year only because source/scope say what this is.
          source: "practice", scope: "full", pyq_year: null, pyq_month: null,
          title: snap.title, duration_secs: snap.durationSecs, marking: snap.marking,
          sections: snap.sections, questions: snap.questions,
          total_questions: snap.totalQuestions, total_marks: snap.totalMarks,
          status: publish ? "published" : "draft", updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) { failures.push(`${s.slug}: upsert ${error.message}`); continue; }
    }
    built++;
  }

  console.log(`\n${apply ? "applied" : "dry run"} — built ${built}, held ${held}, failed ${failures.length}`);
  for (const f of failures) console.error(`  ! ${f}`);
  if (failures.length) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
