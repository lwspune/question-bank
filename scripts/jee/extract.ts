/**
 * JEE Mains extractor — one paper.
 *
 *   npx tsx scripts/jee/extract.ts "<path/to/Paper N.docx>" <paperId>
 *   e.g. npx tsx scripts/jee/extract.ts "C:/tmp/PYQPs/JEE_Mains/2021/Paper 2.docx" 2021-p2
 *
 * Runs pandoc (OMML -> LaTeX + media extraction), segments MCQs, joins the
 * answer key + worked solution from the sibling " soln.docx", and writes an
 * inspectable JSON artifact (out/<paperId>.records.json). NOTHING hits the DB.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { contentHash } from "../../src/lib/upload/hash";
import { mdPath, solnMdPath, mediaDir, recordsPath, requirePaperId } from "./config";
import {
  segmentQuestions,
  parseAnswerTokens,
  findDuplicateSolutionNumbers,
  localSection,
  matchValueToOption,
  parseNumericAnswer,
  splitSolutions,
  parseAnswerTokensOrdered,
  splitSolutionsOrdered,
  solnNumberingIsBroken,
  type JeeSubject,
} from "./lib";
import { numericContentHash } from "../../src/lib/upload/hash";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;
type Label = (typeof OPTION_LABELS)[number];

type Option = { label: Label; text: string; isCorrect: boolean };
type Status =
  | "ok"
  | "numeric"
  | "skipped_numerical"
  | "no_answer_key"
  | "image_options"
  | "needs_review";

type PilotRecord = {
  questionNumber: number;
  subject: JeeSubject;
  status: Status;
  stem: string;
  options: Option[] | null;
  correctLabel: Label | null;
  /** The parsed answer for a Section-B NAT record (status 'numeric'); null otherwise. */
  numericAnswer: number | null;
  solution: string | null;
  imageRefs: string[];
  hasStemImage: boolean;
  contentHash: string | null;
};

function findPandoc(): string {
  if (process.env.PANDOC && existsSync(process.env.PANDOC)) return process.env.PANDOC;
  const candidates = [
    join(process.env.LOCALAPPDATA ?? "", "Pandoc", "pandoc.exe"),
    "C:/Users/vilas/AppData/Local/Pandoc/pandoc.exe",
    "pandoc",
  ];
  for (const c of candidates) {
    try {
      execFileSync(c, ["--version"], { stdio: "ignore" });
      return c;
    } catch {
      /* try next */
    }
  }
  throw new Error("pandoc not found — set PANDOC env var to the binary path");
}

function pandocToMd(pandoc: string, docx: string, mdOut: string, mediaDir?: string) {
  const args = [docx, "-t", "markdown", "-o", mdOut];
  if (mediaDir) args.push(`--extract-media=${mediaDir}`);
  execFileSync(pandoc, args);
}

function main() {
  const questionDocx = resolve(process.argv[2] ?? "");
  if (!questionDocx || !existsSync(questionDocx)) {
    throw new Error(`question docx not found: ${questionDocx}`);
  }
  // The sibling solution/answer-key doc. 2021-2025 name it "<paper> soln.docx";
  // the 2026 sittings name it "<paper>_ak.docx" (and vary the case), so try each
  // known suffix rather than making every 2026 paper a hand-staged rename.
  const solnCandidates = [" soln.docx", "_ak.docx", "_AK.docx", " soln.DOCX"].map((suffix) =>
    join(dirname(questionDocx), basename(questionDocx).replace(/\.docx$/i, suffix)),
  );
  const solnDocx = solnCandidates.find((p) => existsSync(p));
  if (!solnDocx) {
    throw new Error(`solution docx not found; tried:\n  ${solnCandidates.join("\n  ")}`);
  }

  const paperId = requirePaperId(process.argv, 3, 'extract.ts "<Paper N.docx>" <paperId>');
  // Non-standard "compilation" papers (e.g. the 2021 Paper 11-16 topic sets) don't
  // follow the rigid Physics 1-30 / Chem 31-60 / Maths 61-90 layout, so the
  // position-based Section-B skip mislabels real MCQ as numerical. With this flag,
  // MCQ-vs-numerical is decided purely by whether 4 options parse, and subjects are
  // assigned per-question via classification (see PaperData.classification.subject).
  const compilation = process.argv.includes("--compilation");
  // With --numeric, Section B (Numerical Answer Type) questions are KEPT as
  // numeric-format records (answer parsed from the soln token) instead of being
  // dropped as skipped_numerical. NAT rows carry no options.
  const withNumeric = process.argv.includes("--numeric");
  const pandoc = findPandoc();
  const media = mediaDir(paperId);
  mkdirSync(media, { recursive: true });

  const qMd = mdPath(paperId);
  const sMd = solnMdPath(paperId);
  console.log(`[pandoc] ${basename(questionDocx)} -> markdown (+media)`);
  pandocToMd(pandoc, questionDocx, qMd, media);
  console.log(`[pandoc] ${basename(solnDocx)} -> markdown`);
  pandocToMd(pandoc, solnDocx, sMd);

  // Layout auto-detect: 2025 sittings are 150 questions (2 shifts x 75: each
  // subject 20 MCQ + 5 NAT), vs the 180/90 layout of 2021-2024 (30-block
  // subjects). Segment once to count, then re-segment with the right shift size
  // so subjects map correctly. `--layout2025` forces the 75/shift split.
  const qMdText = readFileSync(qMd, "utf8");
  const probe = segmentQuestions(qMdText);
  const shiftSize = process.argv.includes("--layout2025") || probe.length === 150 ? 75 : 90;
  const subjectSize = shiftSize / 3;
  const questions = shiftSize === 90 ? probe : segmentQuestions(qMdText, shiftSize);
  const solnText = readFileSync(sMd, "utf8");
  const tokens = parseAnswerTokens(solnText);
  const solutions = splitSolutions(solnText);

  // Answer/solution keying: by the soln block's printed number (default), OR
  // POSITIONAL (i-th block answers the i-th question) when the numbering is
  // broken — pandoc reset most blocks to `1.` (the "all-1." case, common in the
  // 2022-2025 sittings). Auto-detected; force with --positional / --by-number.
  const positional =
    process.argv.includes("--positional") ||
    (!process.argv.includes("--by-number") && solnNumberingIsBroken(solnText));
  const orderedTokens = parseAnswerTokensOrdered(solnText);
  const orderedSolutions = splitSolutionsOrdered(solnText);
  const tokenAt = (n: number): string | undefined => (positional ? orderedTokens[n - 1] : tokens.get(n));
  const solutionAt = (n: number): string | undefined => (positional ? orderedSolutions[n - 1] : solutions.get(n));
  if (positional) {
    console.log(`[keys] POSITIONAL mapping (soln numbering broken/all-1.): ${orderedTokens.length} ordered blocks for ${questions.length} questions`);
  }

  // A duplicate solution number means a mis-numbered block silently overwrote an
  // earlier answer key (Map last-wins) — BOTH need an answerOverride.
  const dupSoln = findDuplicateSolutionNumbers(solnText);
  if (dupSoln.length) {
    console.warn(`[warn] solution doc has DUPLICATE numbers ${dupSoln.join(", ")} — the key for each (and the question it shadowed) is unreliable; set answerOverrides`);
  }

  // Sanity: each subject should have (subjectSize x #shifts) blocks — 60 for a
  // two-shift 90-layout file, 50 for a two-shift 2025 (25-block) file, 30 for a
  // single-shift 90 file. Skipped for compilations (non-standard boundaries).
  if (!compilation) {
    const perShift = subjectSize;
    const shifts = Math.max(1, Math.round(questions.length / (shiftSize)));
    const expected = perShift * shifts;
    for (const s of ["Physics", "Chemistry", "Maths"] as JeeSubject[]) {
      const n = questions.filter((q) => q.subject === s).length;
      if (n !== expected) console.warn(`[warn] ${s} has ${n} blocks (expected ${expected}) — section split may be off`);
    }
  }

  const records: PilotRecord[] = questions.map((q) => {
    const base = {
      questionNumber: q.number,
      subject: q.subject,
      stem: q.stem,
      numericAnswer: null as number | null,
      imageRefs: q.imageRefs,
      hasStemImage: q.imageRefs.length > 0,
      solution: solutionAt(q.number) ?? null,
    };

    // Position is the authoritative Section A/B discriminator (not option count) —
    // EXCEPT for compilations, where it doesn't hold, so numerical questions are
    // detected by the absence of parsed options (the `q.options === null` check below).
    if (!compilation && localSection(q.number, subjectSize) === "B") {
      if (!withNumeric) {
        return { ...base, status: "skipped_numerical", options: null, correctLabel: null, contentHash: null };
      }
      // Section-B NAT: the soln token IS the numeric answer; no options.
      const num = parseNumericAnswer(tokenAt(q.number));
      if (num === null) {
        return { ...base, status: "no_answer_key", options: null, correctLabel: null, contentHash: null };
      }
      return {
        ...base,
        status: "numeric",
        options: null,
        correctLabel: null,
        numericAnswer: num,
        contentHash: numericContentHash(q.stem, null),
      };
    }

    // Section A MCQ that failed to yield 4 options — surface it loudly.
    if (q.options === null) {
      return { ...base, status: "needs_review", options: null, correctLabel: null, contentHash: null };
    }

    // Resolve the correct label: a clean (a-d) token, else a value-token matched to an option.
    const token = tokenAt(q.number);
    let correctLabel: Label | null = null;
    if (token && /^[abcd]$/i.test(token)) correctLabel = token.toUpperCase() as Label;
    else if (token) correctLabel = matchValueToOption(token, q.options);

    const options: Option[] = q.options.map((text, i) => ({
      label: OPTION_LABELS[i],
      text,
      isCorrect: OPTION_LABELS[i] === correctLabel,
    }));

    let status: Status = "ok";
    if (!correctLabel) status = "no_answer_key";
    else if (options.some((o) => o.text === "") && q.imageRefs.length > 0) status = "image_options";
    else if (options.some((o) => o.text === "") || q.stem.length < 5) status = "needs_review";

    return {
      ...base,
      status,
      options,
      correctLabel,
      contentHash: correctLabel ? contentHash(q.stem, q.options, correctLabel) : null,
    };
  });

  const jsonPath = recordsPath(paperId);
  writeFileSync(jsonPath, JSON.stringify(records, null, 2), "utf8");

  // ---- summary ----
  const by = (pred: (r: PilotRecord) => boolean) => records.filter(pred).length;
  const subj = (s: JeeSubject) => records.filter((r) => r.subject === s);
  console.log(`\n=== ${paperId} extraction summary ===`);
  console.log(`total blocks:        ${records.length}`);
  for (const s of ["Physics", "Chemistry", "Maths"] as JeeSubject[]) {
    const arr = subj(s);
    const mcq = arr.filter((r) => r.status === "ok").length;
    const nat = arr.filter((r) => r.status === "numeric").length;
    console.log(`  ${s.padEnd(10)} ${arr.length} blocks · ${mcq} clean MCQ${nat ? ` · ${nat} NAT` : ""}`);
  }
  console.log(`\nstatus breakdown:`);
  for (const st of ["ok", "numeric", "skipped_numerical", "no_answer_key", "image_options", "needs_review"] as Status[]) {
    console.log(`  ${st.padEnd(18)} ${by((r) => r.status === st)}`);
  }
  const review = records.filter((r) => r.status === "no_answer_key" || r.status === "needs_review");
  if (review.length) {
    console.log(`\nNEEDS REVIEW (${review.length}):`);
    for (const r of review) console.log(`  Q${r.questionNumber} [${r.subject}] ${r.status}: ${r.stem.slice(0, 70)}`);
  }
  console.log(`\nartifact: ${jsonPath}`);
}

main();
