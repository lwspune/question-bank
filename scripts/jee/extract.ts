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
  localSection,
  matchValueToOption,
  splitSolutions,
  type JeeSubject,
} from "./lib";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;
type Label = (typeof OPTION_LABELS)[number];

type Option = { label: Label; text: string; isCorrect: boolean };
type Status =
  | "ok"
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
  const solnDocx = join(dirname(questionDocx), basename(questionDocx).replace(/\.docx$/i, " soln.docx"));
  if (!existsSync(solnDocx)) throw new Error(`solution docx not found: ${solnDocx}`);

  const paperId = requirePaperId(process.argv, 3, 'extract.ts "<Paper N.docx>" <paperId>');
  const pandoc = findPandoc();
  const media = mediaDir(paperId);
  mkdirSync(media, { recursive: true });

  const qMd = mdPath(paperId);
  const sMd = solnMdPath(paperId);
  console.log(`[pandoc] ${basename(questionDocx)} -> markdown (+media)`);
  pandocToMd(pandoc, questionDocx, qMd, media);
  console.log(`[pandoc] ${basename(solnDocx)} -> markdown`);
  pandocToMd(pandoc, solnDocx, sMd);

  const questions = segmentQuestions(readFileSync(qMd, "utf8"));
  const solnText = readFileSync(sMd, "utf8");
  const tokens = parseAnswerTokens(solnText);
  const solutions = splitSolutions(solnText);

  // Sanity: each subject part should be exactly 30 questions (20 MCQ + 10 numerical).
  for (const s of ["Physics", "Chemistry", "Maths"] as JeeSubject[]) {
    const n = questions.filter((q) => q.subject === s).length;
    if (n !== 30) console.warn(`[warn] ${s} has ${n} blocks (expected 30) — section split may be off`);
  }

  const records: PilotRecord[] = questions.map((q) => {
    const base = {
      questionNumber: q.number,
      subject: q.subject,
      stem: q.stem,
      imageRefs: q.imageRefs,
      hasStemImage: q.imageRefs.length > 0,
      solution: solutions.get(q.number) ?? null,
    };

    // Position is the authoritative Section A/B discriminator (not option count).
    if (localSection(q.number) === "B") {
      return { ...base, status: "skipped_numerical", options: null, correctLabel: null, contentHash: null };
    }

    // Section A MCQ that failed to yield 4 options — surface it loudly.
    if (q.options === null) {
      return { ...base, status: "needs_review", options: null, correctLabel: null, contentHash: null };
    }

    // Resolve the correct label: a clean (a-d) token, else a value-token matched to an option.
    const token = tokens.get(q.number);
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
    console.log(`  ${s.padEnd(10)} ${arr.length} blocks · ${mcq} clean MCQ`);
  }
  console.log(`\nstatus breakdown:`);
  for (const st of ["ok", "skipped_numerical", "no_answer_key", "image_options", "needs_review"] as Status[]) {
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
