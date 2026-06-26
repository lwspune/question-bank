/**
 * MHT-CET extractor — one shift.
 *
 *   npx tsx scripts/mhtcet/extract.ts "<path/to/QP.docx>" "<path/to/AK.docx>" <shiftId>
 *   e.g. npx tsx scripts/mhtcet/extract.ts \
 *        "C:/tmp/PYQPs/MHT-CET/2025/19th april shift I.docx" \
 *        "C:/tmp/PYQPs/MHT-CET/2025/19th april shift I_AK.docx" 2025-apr-19-s1
 *
 * Runs pandoc (OMML -> LaTeX + media extraction) on the question paper, parses
 * the SEPARATE answer-key docx for the per-Q answer letter + worked reference
 * solution, and writes an inspectable JSON artifact (out/<shiftId>.records.json).
 * NOTHING hits the DB. The AK answer + AK solution are captured ONLY as a
 * cross-check reference; we author our own answer + solution in shifts/<id>.json.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { contentHash } from "../../src/lib/upload/hash";
import { mdPath, akMdPath, mediaDir, recordsPath, requireShiftId } from "./config";
import { segmentQuestions, parseAnswerKey, splitSolutions, subjectForNumber, type Subject } from "./lib";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;
type Label = (typeof OPTION_LABELS)[number];
type Status = "ok" | "no_answer_key" | "needs_review";

type Option = { label: Label; text: string; isCorrect: boolean };

type Record_ = {
  questionNumber: number;
  subject: Subject;
  status: Status;
  stem: string;
  options: Option[] | null;
  akAnswer: Label | null; // LWS answer-key letter — cross-check reference only
  akSolution: string | null; // LWS worked solution — cross-check reference only
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

function pandocToMd(pandoc: string, docx: string, mdOut: string, media?: string) {
  const args = [docx, "-t", "markdown", "-o", mdOut];
  if (media) args.push(`--extract-media=${media}`);
  execFileSync(pandoc, args);
}

function main() {
  const questionDocx = resolve(process.argv[2] ?? "");
  const akDocx = resolve(process.argv[3] ?? "");
  if (!questionDocx || !existsSync(questionDocx)) throw new Error(`question docx not found: ${questionDocx}`);
  if (!akDocx || !existsSync(akDocx)) throw new Error(`answer-key docx not found: ${akDocx}`);
  const shiftId = requireShiftId(process.argv, 4, 'extract.ts "<QP.docx>" "<AK.docx>" <shiftId>');

  const pandoc = findPandoc();
  const media = mediaDir(shiftId);
  mkdirSync(media, { recursive: true });

  const qMd = mdPath(shiftId);
  const aMd = akMdPath(shiftId);
  console.log(`[pandoc] ${basename(questionDocx)} -> markdown (+media)`);
  pandocToMd(pandoc, questionDocx, qMd, media);
  console.log(`[pandoc] ${basename(akDocx)} -> markdown`);
  pandocToMd(pandoc, akDocx, aMd);

  const questions = segmentQuestions(readFileSync(qMd, "utf8"));
  const akText = readFileSync(aMd, "utf8");
  const akKey = parseAnswerKey(akText); // number -> letter
  const akSolutions = splitSolutions(akText); // number -> worked solution

  // Sanity: each subject should be exactly 50 questions (Phy 1-50, Chem 51-100, Maths 101-150).
  for (const s of ["Physics", "Chemistry", "Maths"] as Subject[]) {
    const n = questions.filter((q) => q.subject === s).length;
    if (n !== 50) console.warn(`[warn] ${s} has ${n} blocks (expected 50) — section split may be off`);
  }
  if (questions.length !== 150) console.warn(`[warn] ${questions.length} total blocks (expected 150)`);

  const records: Record_[] = questions.map((q) => {
    const akAnswer = akKey.get(q.number) ?? null;
    const base = {
      questionNumber: q.number,
      subject: q.subject,
      stem: q.stem,
      akAnswer,
      akSolution: akSolutions.get(q.number) ?? null,
      imageRefs: q.imageRefs,
      hasStemImage: q.imageRefs.length > 0,
    };

    if (q.options === null) {
      return { ...base, status: "needs_review" as Status, options: null, contentHash: null };
    }

    const options: Option[] = q.options.map((text, i) => ({
      label: OPTION_LABELS[i],
      text,
      isCorrect: OPTION_LABELS[i] === akAnswer, // provisional — final answer is the DERIVED one
    }));

    let status: Status = "ok";
    if (!akAnswer) status = "no_answer_key";
    else if (options.some((o) => o.text === "") || q.stem.length < 5) status = "needs_review";

    return {
      ...base,
      status,
      options,
      contentHash: akAnswer ? contentHash(q.stem, q.options, akAnswer) : null,
    };
  });

  const jsonPath = recordsPath(shiftId);
  writeFileSync(jsonPath, JSON.stringify(records, null, 2), "utf8");

  // ---- summary ----
  console.log(`\n=== ${shiftId} extraction summary ===`);
  console.log(`total blocks: ${records.length}`);
  for (const s of ["Physics", "Chemistry", "Maths"] as Subject[]) {
    const arr = records.filter((r) => r.subject === s);
    const ok = arr.filter((r) => r.status === "ok").length;
    const img = arr.filter((r) => r.imageRefs.length > 0).length;
    console.log(`  ${s.padEnd(10)} ${arr.length} blocks · ${ok} clean · ${img} with figures`);
  }
  for (const st of ["ok", "no_answer_key", "needs_review"] as Status[]) {
    console.log(`  status ${st.padEnd(14)} ${records.filter((r) => r.status === st).length}`);
  }
  const review = records.filter((r) => r.status !== "ok");
  if (review.length) {
    console.log(`\nNEEDS REVIEW (${review.length}):`);
    for (const r of review) console.log(`  Q${r.questionNumber} [${r.subject}] ${r.status}: ${r.stem.slice(0, 70)}`);
  }
  console.log(`\nartifact: ${jsonPath}`);
}

main();
