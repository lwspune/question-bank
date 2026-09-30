/**
 * Build CHAPTER TESTS — the first sectional mocks (migration 0088:
 * `source='pyq'`, `scope='sectional'`, no year).
 *
 *   npx tsx scripts/mocks/build-sectional.ts --plan              # choose questions, write data/mht-cet-sectional.json
 *   npx tsx scripts/mocks/build-sectional.ts                     # dry run from the committed plan
 *   npx tsx scripts/mocks/build-sectional.ts --apply --publish   # write the rows
 *   npx tsx scripts/mocks/build-sectional.ts --only=<slug>
 *
 * TWO STEPS, and the split is the point. `--plan` asks the bank which
 * questions each chapter test should carry (src/lib/mocks/sectional.ts) and
 * COMMITS the answer as data. The build step reads that file and nothing else,
 * so a later ingest or re-cut cannot reshuffle a test students have already
 * sat. Re-running `--plan` keeps every test already in the file and only adds
 * chapters that are new (appended at the end of their subject), so the slugs,
 * and with them the mock ids and every attempt, stay put.
 *
 * THE GATE. A mock stores question refs and renders them live through the
 * RLS-bound client, so a PRIVATE or deleted row does not error: the student
 * sees a blank question and it scores as skipped. The build step therefore
 * re-asserts, per question: PUBLIC, a past-year question, a four-option MCQ
 * with exactly one correct option, still in the planned chapter, and not tied
 * to a shared context. A test with any failure is refused whole.
 *
 * Writes via the service-role client (bypasses RLS by design, as every builder).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
  type MockPaperBlueprint,
} from "../../src/lib/mocks/blueprints";
import type { OptionLabel } from "../../src/lib/mocks/answers";
import { buildMockPaper, type PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import { mockTestRow } from "../../src/lib/mocks/row";
import {
  isSectionalEligible,
  orderChapters,
  pickSectionalQuestions,
  sectionalBlueprint,
  sectionalSize,
  sectionalSlug,
  sectionalTitle,
  type SectionalCandidate,
  type SectionalDifficulty,
} from "../../src/lib/mocks/sectional";
import { PLAYBOOKS as MATHS_PLAYBOOKS } from "../../src/app/guide/mht-cet-maths/_data/playbooks";
import { PLAYBOOKS as PHYSICS_PLAYBOOKS } from "../../src/app/guide/mht-cet-physics/_data/playbooks";
import { PLAYBOOKS as CHEMISTRY_PLAYBOOKS } from "../../src/app/guide/mht-cet-chemistry/_data/playbooks";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** One subject of an exam that gets chapter tests. */
type SubjectPlan = {
  /** Bank subject name — MHT-CET's is "Maths", not "Mathematics". */
  bankSubject: string;
  /** Slug segment, e.g. "maths". */
  code: string;
  paper: MockPaperBlueprint;
  sectionKey: string;
  /** Recent questions per paper by chapter — the catalogue order. */
  weights: Map<string, number>;
};

const weightsOf = (p: { chapter: string; qPerPaper: number }[]) =>
  new Map(p.map((x) => [x.chapter, x.qPerPaper]));

const EXAM = {
  examName: "MHT-CET",
  examSlug: "mht-cet",
  dataFile: join(__dirname, "data", "mht-cet-sectional.json"),
  subjects: [
    { bankSubject: "Maths", code: "maths", paper: MHT_CET_MATHS_PAPER, sectionKey: "mathematics", weights: weightsOf(MATHS_PLAYBOOKS) },
    { bankSubject: "Physics", code: "physics", paper: MHT_CET_PHY_CHEM_PAPER, sectionKey: "physics", weights: weightsOf(PHYSICS_PLAYBOOKS) },
    { bankSubject: "Chemistry", code: "chemistry", paper: MHT_CET_PHY_CHEM_PAPER, sectionKey: "chemistry", weights: weightsOf(CHEMISTRY_PLAYBOOKS) },
  ] satisfies SubjectPlan[],
};

/** One committed chapter test. */
type PlannedTest = {
  slug: string;
  title: string;
  examSlug: string;
  paperCode: string;
  sectionKey: string;
  subject: string;
  chapter: string;
  chapterId: string;
  /** In sitting order. */
  questionIds: string[];
};

const CHUNK = 200; // `.in()` puts its filter in the URL; PostgREST 400s past ~200 ids.
const PAGE = 1000; // PostgREST's silent row cap.

type BankRow = {
  id: string;
  visibility: string;
  question_kind: string;
  question_format: string | null;
  difficulty: SectionalDifficulty | null;
  set_id: string | null;
  context: string | null;
  chapter_id: string;
  chapter: { name: string; subject: { name: string } | null } | null;
  subtopic: { name: string } | null;
  options: { label: string; is_correct: boolean }[];
};

const SELECT =
  "id, visibility, question_kind, question_format, difficulty, set_id, context, chapter_id, " +
  "chapter:chapters(name, subject:subjects(name)), subtopic:subtopics(name), options(label, is_correct)";

function one<T>(v: T | T[] | null): T | null {
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function normalise(r: BankRow): BankRow {
  const chapter = one(r.chapter as never) as BankRow["chapter"];
  return {
    ...r,
    chapter: chapter ? { name: chapter.name, subject: one(chapter.subject as never) } : null,
    subtopic: one(r.subtopic as never),
  };
}

const setBound = (r: BankRow) => r.set_id !== null || (r.context ?? "").trim() !== "";
const correctCount = (r: BankRow) => (r.options ?? []).filter((o) => o.is_correct).length;

function candidateOf(r: BankRow): SectionalCandidate {
  return {
    id: r.id,
    difficulty: r.difficulty,
    subtopic: r.subtopic?.name ?? null,
    setBound: setBound(r),
    format: r.question_format ?? "mcq",
    // A row without exactly four options is unusable here; report it as
    // not-one-correct so the core's single eligibility rule excludes it.
    correctCount: (r.options ?? []).length === 4 ? correctCount(r) : -1,
  };
}

async function examId(db: SupabaseClient): Promise<string> {
  const { data, error } = await db.from("exams").select("id").eq("name", EXAM.examName).single();
  if (error || !data) throw new Error(`exam ${EXAM.examName}: ${error?.message ?? "not found"}`);
  return data.id as string;
}

/** Every PUBLIC past-year row of the exam, paged past the 1000-row cap. */
async function fetchPool(db: SupabaseClient, exam: string): Promise<BankRow[]> {
  const out: BankRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select(SELECT)
      .eq("exam_id", exam)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchPool: ${error.message}`);
    const rows = (data ?? []) as unknown as BankRow[];
    out.push(...rows.map(normalise));
    if (rows.length < PAGE) break;
  }
  return out;
}

async function fetchByIds(db: SupabaseClient, ids: string[]): Promise<Map<string, BankRow>> {
  const out = new Map<string, BankRow>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db.from("questions").select(SELECT).in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`fetchByIds: ${error.message}`);
    for (const r of (data ?? []) as unknown as BankRow[]) out.set(r.id, normalise(r));
  }
  return out;
}

function readPlan(): PlannedTest[] {
  return existsSync(EXAM.dataFile)
    ? (JSON.parse(readFileSync(EXAM.dataFile, "utf8")) as PlannedTest[])
    : [];
}

// ── --plan ──────────────────────────────────────────────────────────────────

async function plan(db: SupabaseClient): Promise<void> {
  const existing = readPlan();
  const planned = new Set(existing.map((t) => t.chapterId));
  const pool = await fetchPool(db, await examId(db));
  console.log(`pool: ${pool.length} PUBLIC past-year rows · ${existing.length} tests already planned\n`);

  const added: PlannedTest[] = [];
  for (const sp of EXAM.subjects) {
    const rows = pool.filter((r) => r.chapter?.subject?.name === sp.bankSubject);
    const byChapter = new Map<string, { id: string; name: string; rows: BankRow[] }>();
    for (const r of rows) {
      const c = byChapter.get(r.chapter_id) ?? { id: r.chapter_id, name: r.chapter!.name, rows: [] };
      c.rows.push(r);
      byChapter.set(r.chapter_id, c);
    }
    const chapters = orderChapters(
      [...byChapter.values()].map((c) => ({
        ...c,
        eligible: c.rows.map(candidateOf).filter(isSectionalEligible),
        pyq: c.rows.length,
      })),
      sp.weights
    );

    // New chapters take the next free order numbers, after the committed ones.
    let seq = existing.filter((t) => t.subject === sp.bankSubject).length;
    console.log(`${sp.bankSubject}`);
    for (const c of chapters) {
      const size = sectionalSize(c.eligible.length);
      if (planned.has(c.id)) {
        console.log(`  = ${c.name.padEnd(44)} already planned`);
        continue;
      }
      if (size === null) {
        console.log(`  – ${c.name.padEnd(44)} ${String(c.eligible.length).padStart(3)} eligible — too few for a test`);
        continue;
      }
      const picked = pickSectionalQuestions(c.eligible, size)!;
      seq += 1;
      const test: PlannedTest = {
        slug: sectionalSlug(EXAM.examSlug, sp.code, seq, c.name),
        title: sectionalTitle(EXAM.examName, c.name),
        examSlug: EXAM.examSlug,
        paperCode: sp.paper.code,
        sectionKey: sp.sectionKey,
        subject: sp.bankSubject,
        chapter: c.name,
        chapterId: c.id,
        questionIds: picked.map((q) => q.id),
      };
      added.push(test);
      const mix = (d: string) => picked.filter((q) => q.difficulty === d).length;
      const subs = new Set(picked.map((q) => q.subtopic)).size;
      const allSubs = new Set(c.eligible.map((q) => q.subtopic)).size;
      const mins = sectionalBlueprint(sp.paper, sp.sectionKey, size).durationSecs / 60;
      console.log(
        `  + ${String(seq).padStart(2)} ${c.name.padEnd(41)} ${String(c.eligible.length).padStart(3)} eligible → ` +
          `${size} q · ${mins} min · E${mix("EASY")}/M${mix("MODERATE")}/H${mix("HARD")} · ${subs}/${allSubs} subtopics`
      );
    }
    console.log("");
  }

  if (added.length === 0) {
    console.log("nothing new to plan — the committed file is unchanged");
    return;
  }
  writeFileSync(EXAM.dataFile, JSON.stringify([...existing, ...added], null, 2) + "\n");
  console.log(`planned ${added.length} new test(s) → ${EXAM.dataFile}`);
}

// ── build ───────────────────────────────────────────────────────────────────

function problemsOf(r: BankRow | undefined, t: PlannedTest): string[] {
  if (!r) return ["NOT FOUND in the bank"];
  const p: string[] = [];
  if (r.visibility !== "PUBLIC") p.push(`${r.visibility} (would render BLANK to a student)`);
  if (r.question_kind !== "pyq") p.push(`question_kind ${r.question_kind}`);
  if ((r.question_format ?? "mcq") !== "mcq") p.push(`format ${r.question_format}`);
  if ((r.options ?? []).length !== 4) p.push(`${(r.options ?? []).length} options`);
  if (correctCount(r) !== 1) p.push(`${correctCount(r)} correct options`);
  if (setBound(r)) p.push("tied to a shared context");
  if (r.chapter_id !== t.chapterId) p.push(`moved to chapter "${r.chapter?.name}"`);
  return p;
}

async function build(db: SupabaseClient, opts: { apply: boolean; publish: boolean; only?: string }) {
  const tests = readPlan().filter((t) => !opts.only || t.slug === opts.only);
  if (tests.length === 0) throw new Error(`no planned tests${opts.only ? ` match ${opts.only}` : ""} — run --plan first`);

  const exam = await examId(db);
  const byId = await fetchByIds(db, [...new Set(tests.flatMap((t) => t.questionIds))]);
  const now = new Date();
  let built = 0;
  const failures: string[] = [];

  for (const t of tests) {
    const sp = EXAM.subjects.find((s) => s.bankSubject === t.subject);
    if (!sp) { failures.push(`${t.slug}: unknown subject ${t.subject}`); continue; }

    const issues: string[] = [];
    const rows: PaperQuestionRow[] = t.questionIds.flatMap((id, i) => {
      const r = byId.get(id);
      const p = problemsOf(r, t);
      if (p.length) { issues.push(`${id}: ${p.join("; ")}`); return []; }
      const label = r!.options.find((o) => o.is_correct)!.label as OptionLabel;
      return [{
        id,
        // The planned order IS the sitting order — see pickSectionalQuestions.
        sourceRow: i + 1,
        questionNumber: String(i + 1),
        subjectName: sp.bankSubject,
        answer: { kind: "mcq" as const, label },
      }];
    });
    if (issues.length) {
      failures.push(`${t.slug}: ${issues.length} unusable question(s)\n    ${issues.join("\n    ")}`);
      continue;
    }

    let snap;
    try {
      const bp = sectionalBlueprint(sp.paper, t.sectionKey, t.questionIds.length);
      // year 0 is never stored: mockTestRow writes pyq_year from its own argument.
      snap = buildMockPaper(bp, rows, { year: 0, month: null, title: t.title, slug: t.slug });
    } catch (e) {
      failures.push(`${t.slug}: ${(e as Error).message}`);
      continue;
    }

    console.log(
      `  ✓ ${snap.slug.padEnd(58)} ${snap.totalQuestions}q / ${snap.totalMarks}m / ${snap.durationSecs / 60} min`
    );
    if (opts.apply) {
      const { error } = await db.from("mock_tests").upsert(
        mockTestRow(snap, {
          examId: exam, source: "pyq", scope: "sectional",
          pyqYear: null, pyqMonth: null, publish: opts.publish, now,
        }),
        { onConflict: "id" }
      );
      if (error) { failures.push(`${t.slug}: upsert ${error.message}`); continue; }
    }
    built++;
  }

  console.log(`\n${opts.apply ? (opts.publish ? "applied + published" : "applied as draft") : "dry run"} — built ${built}, failed ${failures.length}`);
  for (const f of failures) console.error(`  ! ${f}`);
  if (failures.length) process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  if (args.includes("--plan")) return plan(db);
  return build(db, {
    apply: args.includes("--apply"),
    publish: args.includes("--publish"),
    only: args.find((a) => a.startsWith("--only="))?.slice("--only=".length),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
