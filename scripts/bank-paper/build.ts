/**
 * Assemble a /dashboard/papers paper from EXISTING bank questions.
 *
 *   npx tsx scripts/bank-paper/build.ts nda-binomial-dist-logs          # dry run
 *   npx tsx scripts/bank-paper/build.ts nda-binomial-dist-logs --apply  # write
 *
 * Dry run is the default and prints the exact 60 rows --apply would add, plus a
 * structural key audit of every pick. Selection is deterministic (stable id
 * order, no Math.random), so the preview is truthful rather than indicative.
 *
 * Two exclusions are applied before selection, both silent-failure guards:
 *   - questions already used in ANY paper in this org (a student may have seen
 *     them), and
 *   - the audit's STRUCT/DUP flags, which are objective defects (not exactly 4
 *     options / not exactly 1 correct / two identical options) and can never be
 *     shipped. SOLN≠KEY is only high-signal, not proof, so it is REPORTED and
 *     left for a human call rather than auto-excluded.
 *
 * Idempotent: the paper is reused if one with the same title exists in the org,
 * and addQuestion upserts on (paper_id, question_id).
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createPaper, addQuestion } from "../../src/lib/papers/admin";
import type { SectionTemplate } from "../../src/lib/papers/types";
import { concludedLetter } from "../practice/audit-keys";
import { ORG_ID, EXAM_ID, CREATED_BY } from "../practice/config";
import {
  selectByQuota, selectTotal, orderPaper, DIFFICULTIES,
  type Cand, type Quota, type Shape,
} from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type ChapterPlan = {
  chapterId: string;
  label: string;
  /** Exact per-difficulty counts. A thin difficulty is REPORTED, never substituted. */
  quota?: Quota;
  /** A total, spent against the paper's `shape`; a thin difficulty IS substituted. */
  take?: number;
  /**
   * Set when the chapter's questions live in a DIFFERENT exam to the paper's own
   * (e.g. Binary Numbers, which has no fresh NDA rows and is drawn from the
   * Cadetprep worksheet course). Documentation only — candidates are fetched by
   * chapter_id, which is already exam-specific — but it keeps a cross-exam draw
   * visible in the spec instead of hidden behind a bare uuid.
   */
  fromExam?: string;
};

type PaperSpec = {
  slug: string;
  title: string;
  /** The paper's own exam. Questions may come from other exams — see fromExam. */
  examId: string;
  section: { key: string; label: string };
  /** Only rows of these kinds are eligible. */
  kinds: ("pyq" | "practice")[];
  /** Only rows of these formats are eligible. Defaults to MCQ-only. */
  formats?: ("mcq" | "subjective" | "numeric")[];
  /**
   * Require a non-empty `solution`. Set when the answer key must carry worked
   * solutions rather than a bare letter — 132 of the State Board Class 11 MCQs
   * store a blind-re-derived key with no working.
   */
  requireSolution?: boolean;
  /** Difficulty preference for chapters using `take`. */
  shape?: Shape;
  chapters: ChapterPlan[];
  /** Known-defective rows, excluded by id with the reason recorded here. */
  exclude: { id: string; reason: string }[];
};

const PAPERS: PaperSpec[] = [
  {
    slug: "nda-binomial-dist-logs",
    title: "NDA Maths — Binomial Distribution & Logarithms (60 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice"],
    chapters: [
      {
        chapterId: "ba3fe1c6-2763-4c1c-8652-a72e319cd5e3",
        label: "Binomial Distribution",
        quota: { EASY: 3, MODERATE: 27, HARD: 5 },
      },
      {
        chapterId: "c1f32a21-4392-4091-b0b2-382450c0d5ff",
        label: "Logarithms",
        quota: { EASY: 3, MODERATE: 11, HARD: 11 },
      },
    ],
    exclude: [
      {
        id: "abd69b5a-17e0-4462-ba55-d62e551817fc",
        reason: "two options flagged is_correct (log_k x · log_5 k = log_x 5) — bank defect",
      },
    ],
  },
  {
    slug: "nda-circles-hd-binary",
    title: "NDA Maths — Circles, Height & Distance and Binary Numbers (60 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice"],
    chapters: [
      {
        chapterId: "1f6b061a-f657-4f29-94bf-33266509d4fe",
        label: "Circles",
        quota: { EASY: 4, MODERATE: 16, HARD: 4 },
      },
      {
        // Zero EASY practice questions exist for this chapter — the quota is 0
        // rather than back-filled, so the gap is visible instead of papered over.
        chapterId: "ed5a3b63-be74-47be-b9e5-4cb537611049",
        label: "Height & Distance",
        quota: { EASY: 0, MODERATE: 12, HARD: 4 },
      },
      {
        // The NDA bank has NO fresh Binary Numbers question: 0 PUBLIC practice
        // rows (all 9 are PRIVATE dup/flawed) and all 13 PYQs are already in
        // earlier papers. Drawn instead from the Cadetprep NDA-Maths worksheet
        // course — same syllabus, dual-blind-verified keys, 85 fresh rows.
        chapterId: "d9865e2b-3702-418a-baa6-d642a72f321f",
        label: "Binary Numbers",
        fromExam: "Worksheets - 11th+12th",
        quota: { EASY: 6, MODERATE: 10, HARD: 4 },
      },
    ],
    exclude: [],
  },
  {
    // 120 questions drawn ENTIRELY from the Maharashtra State Board Class 11 +
    // Class 12 Maths books (user's call — State Board can now supply the whole
    // paper, so no NDA top-up is taken).
    //
    // Three chapters are deliberately absent, not overlooked:
    //   Mathematical Logic  — not in the NDA Paper I syllabus
    //   Linear Programming  — NDA lists graphical linear inequations, not LP
    //   Pair of Straight Lines — not enumerated in NDA's 2-D geometry list
    //
    // Four NDA topics are consequently untested, because the State Board Maths
    // books contain no such chapter: Logarithms, Binary Numbers, Quadratic
    // Equations, Height & Distance.
    slug: "nda-stateboard-120",
    title: "NDA Maths — State Board Class 11 & 12 MCQ Paper (120 Q)",
    examId: EXAM_ID,
    section: { key: "maths", label: "Maths" },
    kinds: ["practice", "pyq"],
    requireSolution: true,
    shape: { EASY: 0.2, MODERATE: 0.55, HARD: 0.25 },
    chapters: [
      // ── Maharashtra HSC Class 12 — 84 across 12 chapters. All 268 of its MCQs
      //    carry a worked solution, so requireSolution costs nothing here.
      { chapterId: "7b42aa88-dcf2-4530-964e-cd8cf84f8a2b", label: "Trigonometric Functions", fromExam: "MH HSC 12", take: 10 },
      { chapterId: "f9759ec4-d83f-4a4c-84e2-9e802c7a6cbc", label: "Line and Planes", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "16b4c885-2d16-4285-93ee-a40b076ca401", label: "Vectors", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "ca49cea6-38bc-4f9c-a268-9e685e3ee27b", label: "Indefinite Integration", fromExam: "MH HSC 12", take: 8 },
      { chapterId: "6d2c6915-b152-4674-9088-0b577f73967d", label: "Application of Definite Integration", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "17788c0f-7693-4582-a26a-35c9bc694913", label: "Differential Equations", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "7904e0f9-0879-4f2b-9686-03c32485ad6f", label: "Matrices", fromExam: "MH HSC 12", take: 7 },
      { chapterId: "b84f55e8-e3a9-4097-895c-fa1b6fca287a", label: "Differentiation", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "6cd80658-ad86-4587-9a35-d6312a6cee43", label: "Application of Derivatives", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "e28689cf-640e-45a1-a00f-76240295d10b", label: "Probability Distributions", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "3ba2c066-737a-4b19-84be-bd6c6aa39948", label: "Definite Integration", fromExam: "MH HSC 12", take: 6 },
      { chapterId: "e1570ec0-6521-41b2-a392-f9fe99cc0e07", label: "Binomial Distribution", fromExam: "MH HSC 12", take: 5 },

      // ── Maharashtra State Board Class 11 — 36 across 14 chapters. Only 71 of
      //    its 203 MCQs carry a worked solution, so the four fully-solved
      //    chapters lead and the rest contribute what they have. The 1-question
      //    chapters are thin BY SUPPLY, not by choice.
      { chapterId: "695ab5fb-cfed-486e-b11f-41aead22beef", label: "Limits", fromExam: "MH SB 11", take: 5 },
      { chapterId: "51ccafc0-2b6c-49fb-8574-a308ab47d81d", label: "Complex Numbers", fromExam: "MH SB 11", take: 5 },
      { chapterId: "a7105f51-4ffb-4f8c-8831-83525b81bd2e", label: "Continuity", fromExam: "MH SB 11", take: 5 },
      { chapterId: "73ddabb6-90f0-4ae3-a801-dda00662ae26", label: "Permutations and Combination", fromExam: "MH SB 11", take: 5 },
      { chapterId: "f16a8046-16ce-435a-a98e-683fe2b954b0", label: "Conic Sections", fromExam: "MH SB 11", take: 4 },
      { chapterId: "4f46d840-c155-4d97-b1aa-fd26497c89f0", label: "Functions", fromExam: "MH SB 11", take: 3 },
      { chapterId: "92d1953c-0b14-4549-bf63-6f2911d1b3f6", label: "Determinants and Matrices", fromExam: "MH SB 11", take: 2 },
      { chapterId: "8bb78e9b-86ac-4e0a-a7c1-6e1a8b236c6d", label: "Probability", fromExam: "MH SB 11", take: 1 },
      { chapterId: "d37165a6-1c28-4d71-8770-9f10c141c0e3", label: "Angle and its Measurement", fromExam: "MH SB 11", take: 1 },
      { chapterId: "42ab0090-6922-4c33-91c6-fb688f8708c2", label: "Circle", fromExam: "MH SB 11", take: 1 },
      { chapterId: "8bccad61-78ac-4eb5-971a-f28d183a4d71", label: "Binomial Theorem", fromExam: "MH SB 11", take: 1 },
      { chapterId: "c7eb0e36-8eec-4309-8f7a-efc0cdc9bf29", label: "Measures of Dispersion", fromExam: "MH SB 11", take: 1 },
      { chapterId: "c4a8ad9e-5be6-44b0-8a07-a32ed56b032c", label: "Sets and Relations", fromExam: "MH SB 11", take: 1 },
      { chapterId: "86615e9b-54de-467a-a57e-e6c8a6a1a4a7", label: "Trigonometry - II", fromExam: "MH SB 11", take: 1 },
    ],
    // All 9 solution-vs-key flags from the 471-row audit. Two were verified in
    // detail as PROBE FALSE POSITIVES with correct keys (00f7e6f8 — the trailing
    // "note the trap: option (C)" paragraph; f02fc4a1 — a "which is NOT the
    // derivative" stem whose solution correctly concludes C). The other seven
    // are UNVERIFIED. All are excluded because supply is ample, not because all
    // nine are known-bad. (371fe787 is in Mathematical Logic, already out.)
    exclude: [
      { id: "00f7e6f8-333f-4beb-968c-412726b124e8", reason: "SOLN≠KEY flag [Cl-12 Trigonometric Functions] — VERIFIED false positive, key correct" },
      { id: "08cad135-d664-470f-84d9-1645226602b2", reason: "SOLN≠KEY flag [Cl-12 Trigonometric Functions] — unverified" },
      { id: "1c7616c9-da33-405e-a0e7-65015b1b4440", reason: "SOLN≠KEY flag [Cl-12 Vectors] — unverified" },
      { id: "24e2fcaf-db86-4d60-8479-211a16ef0e4e", reason: "SOLN≠KEY flag [Cl-12 Differentiation] — unverified" },
      { id: "59ab2eda-c6c6-4bd4-95c2-066a1ad1e9d8", reason: "SOLN≠KEY flag [Cl-12 Differential Equations] — unverified" },
      { id: "78185186-f826-43f1-8716-2454bd6a5910", reason: "SOLN≠KEY flag [Cl-12 Differential Equations] — unverified" },
      { id: "9a3eab34-c8dd-435d-9743-61107d2908ae", reason: "SOLN≠KEY flag [Cl-11 Complex Numbers] — unverified" },
      { id: "f02fc4a1-f885-4426-b566-81f1c37cd0e6", reason: "SOLN≠KEY flag [Cl-12 Differentiation] — VERIFIED false positive, key correct" },
    ],
  },
];

type Row = {
  id: string;
  chapter_id: string;
  difficulty: Cand["difficulty"];
  question_kind: string;
  text: string;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

type Flag = { id: string; kind: "STRUCT" | "DUP_OPT" | "SOLN≠KEY"; detail: string };

const DEFAULT_SHAPE: Shape = { EASY: 0.2, MODERATE: 0.55, HARD: 0.25 };

/** Objective defects (STRUCT/DUP) vs the advisory SOLN≠KEY signal. */
function auditRows(rows: Row[]): Flag[] {
  const flags: Flag[] = [];
  for (const r of rows) {
    const opts = r.options ?? [];
    const correct = opts.filter((o) => o.is_correct);
    if (opts.length !== 4 || correct.length !== 1) {
      flags.push({ id: r.id, kind: "STRUCT", detail: `${opts.length} options, ${correct.length} correct` });
      continue; // a broken option set makes the other two checks meaningless
    }
    const texts = opts.map((o) => o.text.trim());
    if (new Set(texts).size !== texts.length) {
      flags.push({ id: r.id, kind: "DUP_OPT", detail: "two option texts identical" });
    }
    const concluded = concludedLetter(r.solution);
    const key = correct[0].label.toUpperCase();
    if (concluded && concluded !== key) {
      flags.push({ id: r.id, kind: "SOLN≠KEY", detail: `solution concludes ${concluded}, key is ${key}` });
    }
  }
  return flags;
}

/**
 * Scoped by chapter_id, NOT exam_id: a chapter row belongs to exactly one exam,
 * so the chapter list already pins the exam — and filtering on the PAPER's exam
 * would silently return nothing for a cross-exam chapter (see fromExam).
 */
async function fetchCandidates(client: SupabaseClient, spec: PaperSpec): Promise<Row[]> {
  const rows: Row[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("id, chapter_id, difficulty, question_kind, text, solution, options(label, text, is_correct)")
      .eq("visibility", "PUBLIC")
      .in("question_kind", spec.kinds)
      .in("question_format", spec.formats ?? ["mcq"])
      .in("chapter_id", spec.chapters.map((c) => c.chapterId))
      .order("id", { ascending: true }) // stable paging
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchCandidates: ${error.message}`);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < PAGE) break;
  }
  // A key with no working is not shippable in a teacher's answer key.
  return spec.requireSolution ? rows.filter((r) => (r.solution ?? "").trim() !== "") : rows;
}

/**
 * Every question already sitting in some OTHER paper in this org.
 *
 * `exceptPaperId` is what makes a re-run idempotent: without it, re-running a
 * built paper sees its own 60 questions as "already used", excludes them, and
 * tries to assemble a different paper under the same title.
 */
async function fetchAlreadyUsed(client: SupabaseClient, exceptPaperId: string | null): Promise<Set<string>> {
  const used = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = client
      .from("paper_questions")
      .select("question_id")
      .order("question_id", { ascending: true }) // stable paging — LIMIT/OFFSET without ORDER BY may repeat or skip
      .range(from, from + PAGE - 1);
    if (exceptPaperId) q = q.neq("paper_id", exceptPaperId);
    const { data, error } = await q;
    if (error) throw new Error(`fetchAlreadyUsed: ${error.message}`);
    for (const r of data ?? []) used.add(r.question_id as string);
    if (!data || data.length < PAGE) break;
  }
  return used;
}

/** The org's paper with this title, if it already exists. */
async function findPaperId(client: SupabaseClient, title: string): Promise<string | null> {
  const { data } = await client
    .from("papers").select("id").eq("org_id", ORG_ID).eq("title", title).limit(1).maybeSingle();
  return (data?.id as string | undefined) ?? null;
}

async function findOrCreatePaper(client: SupabaseClient, spec: PaperSpec, count: number): Promise<string> {
  const existingId = await findPaperId(client, spec.title);
  if (existingId) {
    console.log(`reusing existing paper ${existingId}`);
    return existingId;
  }
  const template: SectionTemplate = [
    { key: spec.section.key, label: spec.section.label, targetCount: count, assignedTo: [] },
  ];
  return createPaper(client, {
    orgId: ORG_ID, createdBy: CREATED_BY, title: spec.title, examId: spec.examId, template,
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const slug = process.argv[2];
  const spec = PAPERS.find((p) => p.slug === slug);
  if (!spec) throw new Error(`unknown paper "${slug}". Known: ${PAPERS.map((p) => p.slug).join(", ")}`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const existingId = await findPaperId(client, spec.title);
  const all = await fetchCandidates(client, spec);
  const used = await fetchAlreadyUsed(client, existingId);
  const excluded = new Map(spec.exclude.map((e) => [e.id, e.reason]));

  console.log(`\n"${spec.title}"${existingId ? ` (re-run — paper ${existingId} exists)` : ""}`);
  console.log(
    `kinds: ${spec.kinds.join(", ")} · formats: ${(spec.formats ?? ["mcq"]).join(", ")} · PUBLIC only · ` +
      `${all.length} candidates before exclusions\n`
  );

  const flags = auditRows(all);
  const hardFlagged = new Set(flags.filter((f) => f.kind !== "SOLN≠KEY").map((f) => f.id));

  const eligible = all.filter((r) => !excluded.has(r.id) && !used.has(r.id) && !hardFlagged.has(r.id));
  const droppedUsed = all.filter((r) => used.has(r.id)).length;
  console.log(`excluded: ${spec.exclude.length} listed defect(s), ${droppedUsed} already in a paper, ${hardFlagged.size} audit STRUCT/DUP`);
  for (const [id, reason] of excluded) console.log(`  - ${id}  ${reason}`);
  for (const f of flags.filter((x) => x.kind !== "SOLN≠KEY")) console.log(`  - ${f.id}  ${f.kind}: ${f.detail}`);

  // Select per chapter, then interleave into the printed order.
  const groups: Cand[][] = [];
  let shortfallTotal = 0;
  for (const ch of spec.chapters) {
    const pool: Cand[] = eligible
      .filter((r) => r.chapter_id === ch.chapterId)
      .map((r) => ({ id: r.id, chapterId: r.chapter_id, difficulty: r.difficulty }));

    let picked: Cand[];
    let want: string;
    if (ch.quota) {
      const res = selectByQuota(pool, ch.quota);
      picked = res.picked;
      want = `quota ${DIFFICULTIES.map((d) => `${d[0]}${ch.quota![d]}`).join("/")}`;
      for (const [d, n] of Object.entries(res.shortfall)) {
        console.log(`  ⚠  SHORTFALL ${d}: ${n} short — the paper will MISS its difficulty shape`);
        shortfallTotal += n as number;
      }
    } else if (ch.take != null) {
      const res = selectTotal(pool, ch.take, spec.shape ?? DEFAULT_SHAPE);
      picked = res.picked;
      want = `take ${ch.take}`;
      if (res.shortfall > 0) {
        console.log(`  ⚠  SHORTFALL: ${res.shortfall} short — pool too small`);
        shortfallTotal += res.shortfall;
      }
    } else {
      throw new Error(`chapter "${ch.label}" declares neither quota nor take`);
    }

    const fmt = (rows: Cand[]) => DIFFICULTIES.map((d) => `${d[0]}${rows.filter((p) => p.difficulty === d).length}`).join("/");
    const src = ch.fromExam ? ` [${ch.fromExam}]` : "";
    console.log(
      `  ${ch.label.padEnd(36)}${src.padEnd(12)} pool ${String(pool.length).padStart(3)} (${fmt(pool)})` +
        ` · ${want.padEnd(9)} · picked ${String(picked.length).padStart(3)} (${fmt(picked)})`
    );
    groups.push(picked);
  }

  const ordered = orderPaper(groups);
  const byDiff = DIFFICULTIES.map((d) => `${d} ${ordered.filter((q) => q.difficulty === d).length}`).join(" · ");
  console.log(`\nTOTAL ${ordered.length} questions — ${byDiff}`);

  const soft = flags.filter((f) => f.kind === "SOLN≠KEY" && ordered.some((o) => o.id === f.id));
  if (soft.length) {
    console.log(`\n⚠  ${soft.length} selected question(s) flagged SOLN≠KEY (advisory — verify before shipping):`);
    for (const f of soft) console.log(`  ${f.id}  ${f.detail}`);
  } else {
    console.log("\nSOLN≠KEY: none among the selected questions.");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to create the paper. Nothing written.");
    return;
  }
  if (shortfallTotal > 0) throw new Error(`refusing to apply with ${shortfallTotal} unmet quota slot(s) — adjust the quotas.`);

  const paperId = await findOrCreatePaper(client, spec, ordered.length);
  console.log(`\npaper: ${paperId}`);
  let added = 0;
  for (const q of ordered) {
    await addQuestion(client, paperId, q.id, { sectionKey: spec.section.key, addedBy: CREATED_BY });
    added++;
  }
  console.log(`added ${added} questions.\nReview at /dashboard/papers/${paperId}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
