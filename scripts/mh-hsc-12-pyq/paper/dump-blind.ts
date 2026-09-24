/**
 * Dump a paper's MCQs as stem + options ONLY, for an independent blind key pass.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/dump-blind.ts <paperId>
 *
 * Writes out/<id>/blind-mcq.md.
 *
 * WHY A SEPARATE DUMP RATHER THAN "just don't look". No official key exists for
 * any board paper, so every MCQ key in this corpus is DERIVED, and the corpus's
 * only defence is deriving it twice independently. A second pass that can see
 * the first one's answer is not a second derivation — it is a review, and a
 * review agrees far more readily than it should. Withholding at DUMP time is the
 * only version of this that cannot leak: there is nothing to resist.
 *
 * This dump therefore refuses to run once answers exist in the transcription,
 * because at that point the file it would be built from is no longer blind.
 * Run it BEFORE either derivation, and keep the output.
 *
 * It also omits `chapter` and `subtopic`. They are not the answer, but they are
 * a strong hint about method ("Integration by Partial Fractions" tells you how
 * to attack the integral), and a blind pass should re-derive that too.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, requirePaper, questionsJsonPath, pagesDir } from "./config";
import { grammarFor } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

function dump(id: string) {
  const paper = requirePaper(id);
  const path = questionsJsonPath(id);
  if (!existsSync(path)) throw new Error(`${id}: no transcription at ${path}`);

  const qs = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];
  const mcqs = qs.filter((q) => q.format === "mcq");

  const keyed = mcqs.filter((q) => q.answer);
  if (keyed.length) {
    throw new Error(
      `${id}: ${keyed.length} MCQ(s) already carry an answer (${keyed.map((q) => q.ref).join(", ")}).\n` +
        `  This dump exists to be built BEFORE any key is derived. Building it now would\n` +
        `  mean stripping answers the file already holds, and "stripped" is not the same\n` +
        `  as "never seen" — the ordering is the guarantee, not the redaction.`,
    );
  }

  const out: string[] = [
    `# Blind MCQ key derivation — ${paper.month} ${paper.year} (${paper.paperCode})`,
    ``,
    // The subject was hardcoded to Mathematics until 2026-09-23, when the blind
    // pass on a PHYSICS paper opened with "Mathematics & Statistics" and said so.
    // It is the first line a deriver reads, and it was wrong about what they were
    // being asked to solve.
    `${mcqs.length} multiple-choice questions from a Maharashtra HSC Class-12`,
    `${paper.subject === "Mathematics" ? "Mathematics & Statistics" : paper.subject} board paper. **No official answer key exists for this`,
    `paper, and none exists anywhere** — the board does not publish one. Derive each`,
    `answer from first principles.`,
    ``,
    `You have NOT been shown anyone else's answers, and that is deliberate: this is`,
    `one of two independent derivations that will be compared. Do not try to guess`,
    `what the "expected" answer is — solve the question as printed.`,
    ``,
    `**Solve the question AS PRINTED.** If the printed stem is defective, or if no`,
    `option is correct, say so and show what the correct value actually is. A`,
    `no-correct-option MCQ is an expected outcome here, not a failure — three`,
    `occurred in the sibling corpus. Do not silently pick the nearest option.`,
    ``,
    `Rendered pages, if you need to check anything: ${pagesDir(id)}/p-NN.png`,
    ``,
    `For each question output exactly:`,
    ``,
    "```",
    `<ref> | <A|B|C|D or NONE> | <confidence: high|medium|low> | <one-line justification>`,
    "```",
    ``,
    `---`,
    ``,
  ];

  for (const q of mcqs) {
    out.push(`## ${q.ref}  (${grammarFor(paper.subject).sectionOf(q.ref).marks} marks)`, ``, q.stem, ``);
    for (const o of q.options ?? []) out.push(`- **(${o.label})** ${o.text}`);
    out.push(``);
  }

  const dir = pagesDir(id);
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, "blind-mcq.md");
  writeFileSync(dest, out.join("\n"), "utf8");
  console.log(`${id}: ${mcqs.length} MCQs (0 keyed) -> ${dest}`);
}

const id = process.argv[2];
if (!id) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/dump-blind.ts <paperId>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
dump(id);
