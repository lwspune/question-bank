/**
 * Build mock tests from the bank — "use PYQPs as is".
 *
 * A mock is exactly the PYQs of one sitting, reconstructed into an immutable
 * snapshot by the pure core (src/lib/mocks/reconstruct.ts) and upserted into
 * `mock_tests` keyed on the deterministic slugToUuid id (re-running is
 * idempotent). Content is NOT copied: the snapshot stores ordered question refs;
 * delivery renders live from `questions`.
 *
 * TWO WAYS A SITTING IS DISCOVERED, and the split is a property of the corpus:
 *   • YEAR × MONTH (NDA) — `pyq_month` distinguishes the two sittings of a year,
 *     so the sittings can be discovered from the bank itself. Driven by
 *     MOCK_BLUEPRINTS.
 *   • SOURCE_FILE (NEET, CDS, MHT-CET) — the bank cannot tell two sittings of a
 *     year apart, so the sittings come from a registry. NEET's is hand-written
 *     (each sitting carries bespoke grace/override/length facts); CDS's is
 *     DERIVED from scripts/cds/config.ts (see cdsSittings.ts); MHT-CET's is BOTH
 *     (13 of 45 derived from scripts/mhtcet/config.ts, the rest hand-written
 *     because no config exists for them — see mhtcetSittings.ts).
 *     For MHT-CET `pyq_month` is not merely null but ACTIVELY MISLEADING: 17 of
 *     its 45 sittings share (2023, "May"), so the year+month loop would emit one
 *     slug for all 17 and silently overwrite 16 real papers.
 * Both feed one shared loop (`buildFromSourceFiles`) and one shared writer
 * (`emitMock`) so a fix to the write path cannot land on one exam and miss the
 * other — the drift this repo has already paid for twice.
 *
 *   npx tsx scripts/mocks/build.ts                       # dry-run all papers
 *   npx tsx scripts/mocks/build.ts --apply               # upsert as status='draft'
 *   npx tsx scripts/mocks/build.ts --apply --publish     # ...and publish
 *   npx tsx scripts/mocks/build.ts --paper=gat --apply --publish
 *   npx tsx scripts/mocks/build.ts --paper=cds
 *   npx tsx scripts/mocks/build.ts --paper=mht-cet          # both CET papers
 *   npx tsx scripts/mocks/build.ts --only=2024-Sep --apply --publish
 *   npx tsx scripts/mocks/build.ts --only=cds-2026-i-english
 *   npx tsx scripts/mocks/build.ts --only=2023-may-03-s1    # one CET sitting
 *
 * NOTE ON --publish: the upsert writes `status` unconditionally, so re-running
 * an already-published family WITHOUT --publish demotes it to 'draft'. Re-run
 * shipped mocks with `--apply --publish`.
 *
 * Writes via the service-role client (bypasses RLS by design — same as the other
 * ingest scripts).
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  MOCK_BLUEPRINTS,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
  type MockPaperBlueprint,
} from "../../src/lib/mocks/blueprints";
import {
  buildMockPaper,
  neetMockSlug,
  neetMockTitle,
  mhtCetMockSlug,
  mhtCetMockTitle,
  type MockPaperSnapshot,
  type PaperQuestionRow,
} from "../../src/lib/mocks/reconstruct";
import { deriveCdsSittings } from "./cdsSittings";
import { deriveMhtCetSittings } from "./mhtcetSittings";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Run-wide accumulators threaded through every build path. */
type RunState = {
  apply: boolean;
  publish: boolean;
  only: string | undefined;
  built: { n: number };
  /** Papers deliberately not shipped because they cannot reconstruct whole. */
  held: { n: number };
  failures: string[];
};

/** Distinct bank subject names a paper's sections span. */
function paperSubjects(bp: MockPaperBlueprint): string[] {
  return [...new Set(bp.sections.flatMap((s) => s.subjects))];
}

/** Resolve the exam + the chapters (with their subject name) for a paper. */
async function resolvePaper(db: SupabaseClient, bp: MockPaperBlueprint) {
  const { data: exam, error: eErr } = await db
    .from("exams").select("id").eq("name", bp.examName).single();
  if (eErr || !exam) throw new Error(`${bp.examName} exam not found: ${eErr?.message}`);

  const names = paperSubjects(bp);
  const { data: subjects, error: sErr } = await db
    .from("subjects").select("id, name").eq("exam_id", exam.id).in("name", names);
  if (sErr) throw new Error(`subjects lookup: ${sErr.message}`);
  const subjectName = new Map<string, string>((subjects ?? []).map((s) => [s.id as string, s.name as string]));

  const { data: chapters, error: cErr } = await db
    .from("chapters").select("id, subject_id").in("subject_id", [...subjectName.keys()]);
  if (cErr) throw new Error(`chapters lookup: ${cErr.message}`);
  const chapterToSubject = new Map<string, string>();
  for (const c of chapters ?? []) {
    const sn = subjectName.get(c.subject_id as string);
    if (sn) chapterToSubject.set(c.id as string, sn);
  }
  return { examId: exam.id as string, chapterToSubject };
}

/** Distinct (year, month) sittings present in this paper's PUBLIC pyq corpus. */
async function discoverSittings(db: SupabaseClient, chapterIds: string[]) {
  const seen = new Map<string, { year: number; month: string | null }>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, pyq_month")
      .in("chapter_id", chapterIds)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .not("pyq_year", "is", null)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`discover sittings: ${error.message}`);
    for (const r of data ?? []) {
      const year = r.pyq_year as number;
      const month = (r.pyq_month as string | null) ?? null;
      seen.set(`${year}-${month ?? ""}`, { year, month });
    }
    if (!data || data.length < PAGE) break;
  }
  return [...seen.values()].sort((a, b) => b.year - a.year || (a.month ?? "").localeCompare(b.month ?? ""));
}

// ── Shared fetch ────────────────────────────────────────────────────────────
// Every sitting is the same query — PUBLIC pyq rows of this paper's chapters,
// paged — differing only in HOW the sitting is pinned. One implementation takes
// that as a typed pin so the select list, the paging, and the option→answer
// mapping cannot drift apart between exams.

/** How a sitting is pinned within a paper's corpus. */
type SittingPin =
  | { by: "yearMonth"; year: number; month: string | null }
  | { by: "sourceFile"; sourceFile: string };

function pinLabel(pin: SittingPin): string {
  return pin.by === "sourceFile" ? pin.sourceFile : `${pin.year}-${pin.month ?? "-"}`;
}

async function fetchPaperRows(
  db: SupabaseClient,
  chapterToSubject: Map<string, string>,
  pin: SittingPin
): Promise<PaperQuestionRow[]> {
  const chapterIds = [...chapterToSubject.keys()];
  const out: PaperQuestionRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = db
      .from("questions")
      .select("id, source_row, question_number, chapter_id, options(label,is_correct)")
      .in("chapter_id", chapterIds)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC");
    if (pin.by === "sourceFile") {
      q = q.eq("source_file", pin.sourceFile);
    } else {
      q = q.eq("pyq_year", pin.year);
      q = pin.month === null ? q.is("pyq_month", null) : q.eq("pyq_month", pin.month);
    }
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw new Error(`fetch rows ${pinLabel(pin)}: ${error.message}`);
    for (const r of data ?? []) {
      const opts = (r.options ?? []) as { label: string; is_correct: boolean }[];
      out.push({
        id: r.id as string,
        sourceRow: (r.source_row as number | null) ?? null,
        questionNumber: (r.question_number as string | null) ?? null,
        subjectName: chapterToSubject.get(r.chapter_id as string) ?? "?",
        answer: (opts.find((o) => o.is_correct)?.label as "A" | "B" | "C" | "D" | null) ?? null,
      });
    }
    if (!data || data.length < PAGE) break;
  }
  return out;
}

/** One sitting's rows, pinned by year + month (NDA). */
function fetchRowsByYearMonth(
  db: SupabaseClient,
  chapterToSubject: Map<string, string>,
  year: number,
  month: string | null
): Promise<PaperQuestionRow[]> {
  return fetchPaperRows(db, chapterToSubject, { by: "yearMonth", year, month });
}

/** One sitting's rows, pinned by source_file (NEET, CDS). */
function fetchRowsBySourceFile(
  db: SupabaseClient,
  chapterToSubject: Map<string, string>,
  sourceFile: string
): Promise<PaperQuestionRow[]> {
  return fetchPaperRows(db, chapterToSubject, { by: "sourceFile", sourceFile });
}

// ── Shared write ────────────────────────────────────────────────────────────

/**
 * Log the snapshot, upsert it when applying, and count it. The single writer for
 * every exam — the `mock_tests` column list lives here once.
 */
async function emitMock(
  db: SupabaseClient,
  examId: string,
  snap: MockPaperSnapshot,
  run: RunState
): Promise<void> {
  const graceCount = snap.questions.filter((q) => q.grace).length;
  console.log(
    `  ✓ ${snap.slug.padEnd(20)} ${snap.title}  ` +
      `(${snap.totalQuestions}q / ${snap.totalMarks}m${graceCount ? `, ${graceCount} grace` : ""})`
  );
  if (run.apply) {
    const { error } = await db.from("mock_tests").upsert(
      {
        id: snap.id, slug: snap.slug, exam_id: examId, paper_code: snap.paperCode,
        pyq_year: snap.pyqYear, pyq_month: snap.pyqMonth, title: snap.title,
        duration_secs: snap.durationSecs, marking: snap.marking, sections: snap.sections,
        questions: snap.questions, total_questions: snap.totalQuestions, total_marks: snap.totalMarks,
        status: run.publish ? "published" : "draft", updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) { run.failures.push(`${snap.slug}: upsert ${error.message}`); return; }
  }
  run.built.n++;
}

// ── source_file-keyed sittings (NEET + CDS) ─────────────────────────────────

/**
 * One sitting of a source_file-keyed exam. Everything genuinely bespoke to an
 * exam stays at its CALL SITE: `prepare` does per-sitting row surgery (NEET's
 * grace marking + include-overrides), and durationSecs / questionCount are
 * optional overrides only NEET needs.
 */
type SourceFileSitting = {
  /** Registry key — matched by `--only` alongside the slug. */
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  /** Override the blueprint duration (NEET's 200-q sittings). */
  durationSecs?: number;
  /** Expected full length — a soft advisory warning, NOT a contract. Omit where
   *  the blueprint declares a hard section count (CDS) — that already throws. */
  questionCount?: number;
  /** Per-sitting row surgery, applied after fetch and before reconstruction. */
  prepare?: (rows: PaperQuestionRow[]) => PaperQuestionRow[];
  /**
   * This paper is KNOWN not to reconstruct whole — the reason, e.g.
   * "48/50 — 2 questions withheld PRIVATE (flawed)". A mock is the real paper
   * or it is nothing, so a held paper is not shipped.
   *
   * It is an ASSERTION, not a mute. The build is still attempted, and a hold
   * whose paper NOW reconstructs is reported as a failure telling you to delete
   * the line — otherwise closing a corpus hole would silently leave the mock
   * un-shipped forever. Used by MHT-CET (30 of its 90 papers).
   */
  hold?: string;
};

async function buildFromSourceFiles(
  db: SupabaseClient,
  bp: MockPaperBlueprint,
  allSittings: SourceFileSitting[],
  run: RunState
) {
  const { examId, chapterToSubject } = await resolvePaper(db, bp);
  const only = run.only;
  // Match `--only` against either the registry key or the emitted slug: for NEET
  // the two are identical, for CDS the key is the config paper id ("2026-1").
  const sittings = allSittings.filter((s) => !only || s.key === only || s.slug === only);
  console.log(`\n${bp.paperLabel} — ${sittings.length} sitting(s)${only ? ` (filtered: ${only})` : ""}\n`);

  for (const s of sittings) {
    let rows = await fetchRowsBySourceFile(db, chapterToSubject, s.sourceFile);
    if (s.prepare) rows = s.prepare(rows);
    if (s.questionCount != null && rows.length !== s.questionCount) {
      console.log(`  ! ${s.key}: ${rows.length} rows vs expected ${s.questionCount} (shipping the PUBLIC subset)`);
    }

    let snap;
    try {
      snap = buildMockPaper(bp, rows, {
        year: s.year, month: null,
        slug: s.slug, title: s.title,
        durationSecs: s.durationSecs,
      });
    } catch (e) {
      // A KNOWN-short paper is a decision, not a breakage — but an unexplained
      // one is a real failure and must stay loud.
      if (s.hold) {
        console.log(`  ⊘ ${s.key.padEnd(18)} held — ${s.hold}`);
        run.held.n++;
        continue;
      }
      run.failures.push(`${s.key}: ${e instanceof Error ? e.message.split("\n").slice(0, 4).join(" | ") : String(e)}`);
      continue;
    }
    // The other half of the assertion: the corpus hole has been closed, so the
    // hold is stale. Refuse to ship rather than contradict the registry — that
    // is a human's call, and a silent emit would leave the stale line in place.
    if (s.hold) {
      run.failures.push(
        `${s.key} (${bp.code}): STALE HOLD — this paper now reconstructs whole ` +
          `(recorded as "${s.hold}"). Delete the hold in mhtcetSittings.ts and re-run.`
      );
      continue;
    }
    await emitMock(db, examId, snap, run);
  }
}

// ── NEET ────────────────────────────────────────────────────────────────────
// NEET is one combined paper with per-SITTING variance the NDA year+month loop
// can't express: pyq_month is null everywhere AND two sittings share a year
// (NEET 2024 + Re-NEET 2024), so sittings are keyed by source_file. Each carries
// its true length (180 vs 200), duration, the officially dropped/bonus GRACE
// question numbers (full marks to all, no valid key), and any include-OVERRIDE
// (a real paper question deduped out of its own sitting — referenced by id).
// Hand-written (unlike CDS's derived registry) because none of those facts is
// recorded anywhere else.
type NeetSitting = {
  key: string; // the mock slug (also the --only filter key)
  sourceFile: string;
  year: number;
  isRe: boolean;
  questionCount: number; // expected full length — a soft advisory, not a contract
  durationSecs: number;
  graceNumbers: number[];
  overrides: {
    questionNumber: number;
    questionId: string;
    subjectName: string;
    answer: "A" | "B" | "C" | "D";
  }[];
};

const NEET_SITTINGS: NeetSitting[] = [
  // 2021 Q5 was a verbatim cross-bank duplicate → deduped at insert (its content
  // survives as a Pariksha practice row). Reference that row at Physics slot 5 so
  // the 2021 mock is the complete 200-q paper.
  {
    key: "neet-2021", sourceFile: "NEET_UG_2021.pdf", year: 2021, isRe: false,
    questionCount: 200, durationSecs: 200 * 60, graceNumbers: [],
    overrides: [{ questionNumber: 5, questionId: "f63c56ed-96cc-4197-9cb4-b77710a897a0", subjectName: "Physics", answer: "D" }],
  },
  // Q93 + Q128 officially dropped by NTA (no valid option) → grace.
  {
    key: "neet-2022", sourceFile: "NEET_UG_2022.pdf", year: 2022, isRe: false,
    questionCount: 200, durationSecs: 200 * 60, graceNumbers: [93, 128], overrides: [],
  },
  { key: "neet-2023", sourceFile: "NEET_UG_2023.pdf", year: 2023, isRe: false, questionCount: 200, durationSecs: 200 * 60, graceNumbers: [], overrides: [] },
  { key: "neet-2024", sourceFile: "NEET_UG_2024.pdf", year: 2024, isRe: false, questionCount: 200, durationSecs: 200 * 60, graceNumbers: [], overrides: [] },
  { key: "neet-2024-re", sourceFile: "RE_NEET_UG_2024.pdf", year: 2024, isRe: true, questionCount: 200, durationSecs: 200 * 60, graceNumbers: [], overrides: [] },
  { key: "neet-2025", sourceFile: "NEET_UG_2025.pdf", year: 2025, isRe: false, questionCount: 180, durationSecs: 180 * 60, graceNumbers: [], overrides: [] },
  { key: "neet-2026", sourceFile: "NEET_UG_2026.pdf", year: 2026, isRe: false, questionCount: 180, durationSecs: 180 * 60, graceNumbers: [], overrides: [] },
  // Q26 (vernier) — NTA Bonus, computed value not among options → grace.
  { key: "neet-2026-re", sourceFile: "RE_NEET_UG_2026.pdf", year: 2026, isRe: true, questionCount: 180, durationSecs: 180 * 60, graceNumbers: [26], overrides: [] },
];

/** NEET sittings as the shared shape — grace + overrides ride in `prepare`. */
function neetSittings(): SourceFileSitting[] {
  return NEET_SITTINGS.map((s) => ({
    key: s.key,
    sourceFile: s.sourceFile,
    year: s.year,
    slug: neetMockSlug(s.year, s.isRe),
    title: neetMockTitle(s.year, s.isRe),
    durationSecs: s.durationSecs,
    questionCount: s.questionCount,
    prepare: (rows) => {
      // Mark officially dropped/bonus questions as grace (full marks to all).
      const grace = new Set(s.graceNumbers);
      const out = rows.map((r) => (grace.has(Number(r.questionNumber)) ? { ...r, grace: true } : r));
      // Inject include-overrides (a deduped real question referenced at its slot).
      for (const ov of s.overrides) {
        out.push({ id: ov.questionId, sourceRow: ov.questionNumber, questionNumber: String(ov.questionNumber), subjectName: ov.subjectName, answer: ov.answer });
      }
      return out;
    },
  }));
}

// ── CDS ─────────────────────────────────────────────────────────────────────
// CDS English is source_file-keyed for the same reason as NEET (pyq_month NULL,
// two sittings share a year) but is otherwise perfectly uniform: 19 × 120 q, no
// grace, no overrides, one duration. So it needs no hand-written registry — its
// sittings are DERIVED from scripts/cds/config.ts, the source of record the
// ingestion pipeline stamps into source_file (see cdsSittings.ts).
//
// No `questionCount` advisory: the blueprint declares a HARD count of 120, so a
// short sitting already fails loudly in validatePaperRows — a soft warning first
// would just be noise ahead of the throw.
function cdsSittings(): SourceFileSitting[] {
  return deriveCdsSittings().map((s) => ({
    key: s.key,
    sourceFile: s.sourceFile,
    year: s.year,
    slug: s.slug,
    title: s.title,
  }));
}

// ── MHT-CET ─────────────────────────────────────────────────────────────────
// TWO papers per sitting (Maths, and Physics+Chemistry), so one registry feeds
// buildFromSourceFiles twice. source_file-keyed because 17 of the 45 sittings
// share (2023, "May") — the year+month loop would collapse them onto one slug.
//
// `paper` is passed explicitly rather than sniffed from bp.code: NDA also uses
// the code "maths", and a mis-read there would silently attach the Maths holds
// to the Physics+Chemistry paper.
function mhtCetSittings(
  bp: MockPaperBlueprint,
  paper: "maths" | "phyChem"
): SourceFileSitting[] {
  return deriveMhtCetSittings().map((s) => ({
    key: s.key,
    sourceFile: s.sourceFile,
    year: s.year,
    slug: mhtCetMockSlug(s.key, bp.code),
    title: mhtCetMockTitle(s.year, s.label, bp),
    hold: paper === "maths" ? s.hold?.maths : s.hold?.phyChem,
  }));
}

async function main() {
  const apply = process.argv.includes("--apply");
  const publish = process.argv.includes("--publish");
  const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
  const paperFilter = process.argv.find((a) => a.startsWith("--paper="))?.split("=")[1];
  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const NDA_CODES = new Set(["maths", "gat"]);
  const runNda = !paperFilter || NDA_CODES.has(paperFilter);
  const runNeet = !paperFilter || paperFilter === "neet";
  const runCds = !paperFilter || paperFilter === "cds";
  const runMhtCet = !paperFilter || paperFilter === "mht-cet";
  if (paperFilter && !runNda && !runNeet && !runCds && !runMhtCet) {
    throw new Error(`no paper matches --paper=${paperFilter} (known: maths, gat, neet, cds, mht-cet)`);
  }

  const run: RunState = { apply, publish, only, built: { n: 0 }, held: { n: 0 }, failures: [] };

  const blueprints = runNda ? MOCK_BLUEPRINTS.filter((b) => !paperFilter || b.code === paperFilter) : [];
  for (const bp of blueprints) {
    const { examId, chapterToSubject } = await resolvePaper(db, bp);
    let sittings = await discoverSittings(db, [...chapterToSubject.keys()]);
    if (only) sittings = sittings.filter((s) => `${s.year}-${s.month ?? ""}` === only);
    console.log(`\n${bp.paperLabel} — ${sittings.length} sitting(s)${only ? ` (filtered: ${only})` : ""}\n`);

    for (const { year, month } of sittings) {
      const rows = await fetchRowsByYearMonth(db, chapterToSubject, year, month);
      // 2020 was a single combined NDA I+II sitting (COVID); the bank tags it Apr.
      const titleOverride =
        year === 2020 && month === "Apr"
          ? `NDA 2020 (Combined I & II) — ${bp.paperLabel}`
          : undefined;
      let snap;
      try {
        snap = buildMockPaper(bp, rows, { year, month, title: titleOverride });
      } catch (e) {
        run.failures.push(`${bp.code} ${year} ${month ?? "-"}: ${e instanceof Error ? e.message.split("\n")[0] : String(e)}`);
        continue;
      }
      await emitMock(db, examId, snap, run);
    }
  }

  if (runNeet) await buildFromSourceFiles(db, NEET_PAPER, neetSittings(), run);
  if (runCds) await buildFromSourceFiles(db, CDS_ENGLISH_PAPER, cdsSittings(), run);
  if (runMhtCet) {
    await buildFromSourceFiles(db, MHT_CET_MATHS_PAPER, mhtCetSittings(MHT_CET_MATHS_PAPER, "maths"), run);
    await buildFromSourceFiles(db, MHT_CET_PHY_CHEM_PAPER, mhtCetSittings(MHT_CET_PHY_CHEM_PAPER, "phyChem"), run);
  }

  console.log(`\n${apply ? "Upserted" : "Would build"} ${run.built.n} mock(s)${publish ? " (published)" : apply ? " (draft)" : ""}.`);
  if (run.held.n) console.log(`${run.held.n} paper(s) held — cannot reconstruct whole (see ⊘ lines above).`);
  if (run.failures.length) { console.log(`\n${run.failures.length} failure(s):`); run.failures.forEach((f) => console.log(`  ✗ ${f}`)); }
  if (!apply) console.log("\n(dry-run — re-run with --apply to write)");
}

main().catch((e) => { console.error(e); process.exit(1); });
