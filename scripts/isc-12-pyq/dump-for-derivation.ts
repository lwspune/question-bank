/**
 * Emit a BLIND derivation payload — questions only, key structurally absent.
 *
 *   npx tsx scripts/isc-12-pyq/dump-for-derivation.ts 2025 Mathematics Q1
 *
 * WHY THIS IS A SEPARATE STEP AND NOT A CONVENTION:
 *
 * For 2025 the source document interleaves the official answer with the
 * questions — p11 of the Mathematics APUP carries subpart (xv) and the MARKING
 * SCHEME block on the SAME PAGE. So a deriver handed page images, or handed the
 * data directory, is contaminated by construction, and no instruction to
 * "ignore the key" can undo that.
 *
 * This writes the question half to a directory that contains NO key file, and
 * REFUSES to write if a key file would land beside it. Withholding at dump time
 * is the only enforceable form of the rule; asking an agent not to look is not
 * a control. See [[blind-check-contamination]].
 *
 * The output directory is deliberately OUTSIDE scripts/ so a deriver told to
 * read it cannot walk up into the sibling .key.json.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const DUMP_ROOT = "C:\\tmp\\PYQPs\\ISC\\XII\\blind";

type Subpart = {
  ref: string;
  marks: number;
  format: string;
  chapter?: string;
  text: string;
  options?: string[];
  needsFigure?: boolean;
  figureNote?: string;
};

function main() {
  const [year, subject, block] = process.argv.slice(2);
  if (!year || !subject || !block) {
    throw new Error(
      "usage: dump-for-derivation.ts <year> <subject> <block>   e.g. 2025 Mathematics Q1"
    );
  }

  const stem = `${year}-${subject}-${block}`;
  const dataDir = join(process.cwd(), "scripts", "isc-12-pyq", "data");
  const src = join(dataDir, `${stem}.questions.json`);
  if (!existsSync(src)) throw new Error(`missing transcription: ${src}`);

  const parsed = JSON.parse(readFileSync(src, "utf8")) as {
    exam: string;
    subject: string;
    year: number;
    questionNumber: number;
    instruction?: string;
    subparts: Subpart[];
  };

  // Fail LOUDLY if the transcription itself leaked an answer field. This is the
  // check that matters: the dump is only blind if the thing it copies is.
  const leaked = parsed.subparts.filter((s) =>
    Object.keys(s).some((k) => /answer|correct|key|solution/i.test(k))
  );
  if (leaked.length) {
    throw new Error(
      `REFUSING TO DUMP: ${leaked.length} subpart(s) carry an answer-shaped field ` +
        `(${leaked.map((s) => s.ref).join(", ")}). The questions file must hold no key.`
    );
  }

  const outDir = join(DUMP_ROOT, stem);
  mkdirSync(outDir, { recursive: true });

  // And refuse if a key somehow already sits in the destination.
  const intruders = readdirSync(outDir).filter((f) => /key|answer/i.test(f));
  if (intruders.length) {
    throw new Error(
      `REFUSING TO DUMP: ${outDir} already contains ${intruders.join(", ")}. ` +
        `A blind payload directory must never hold a key.`
    );
  }

  const payload = {
    instructions: [
      "Derive the answer to every subpart below INDEPENDENTLY, as a candidate",
      "sitting the paper would: work it out from the question alone.",
      "You have NOT been given an answer key and must not look for one.",
      "For each subpart return: ref, answer, a short derivation, and a",
      "confidence of HIGH | MEDIUM | LOW.",
      "For an MCQ, give BOTH the option letter (A/B/C/D, where A is the first",
      "option listed) AND the option's text — if those two disagree, say so",
      "rather than picking one.",
      "If a question cannot be answered as printed, say exactly that and why;",
      "do NOT repair the question and answer the repaired version.",
    ],
    exam: parsed.exam,
    subject: parsed.subject,
    year: parsed.year,
    questionNumber: parsed.questionNumber,
    sharedInstruction: parsed.instruction ?? null,
    subparts: parsed.subparts.map((s) => ({
      ref: s.ref,
      marks: s.marks,
      format: s.format,
      text: s.text,
      ...(s.options ? { options: s.options } : {}),
      ...(s.needsFigure ? { figureNote: s.figureNote ?? "figure referenced" } : {}),
    })),
  };

  const out = join(outDir, `${stem}.blind.json`);
  writeFileSync(out, JSON.stringify(payload, null, 2), "utf8");

  console.log(`blind payload -> ${out}`);
  console.log(`  ${payload.subparts.length} subparts, no answer fields.`);
  console.log(`  chapter hints stripped: the deriver classifies nothing, it only solves.`);
  console.log(`  sibling key NOT copied (lives at ${basename(dataDir)}/${stem}.key.json).`);
}

main();
