/**
 * Emit the BLIND derivation packet for one paper: `data/<paperId>.derive.json`.
 *
 *   npx tsx scripts/cds-maths/dump-derive.ts <paperId>
 *   npx tsx scripts/cds-maths/dump-derive.ts <paperId> --apply
 *
 * The packet is what the two independent derivation passes read (see
 * DERIVATION_BRIEF.md). It carries the question and NOTHING that could reveal an
 * answer.
 *
 * THE WHITELIST BELOW IS THE POINT OF THIS FILE. Fields are copied by NAME, not
 * spread — so a field added to the transcription later (a flag, a note, an
 * annotation someone found useful) cannot silently leak into the packet and
 * un-blind the pass. If you add a field here, ask first whether a deriver seeing
 * it could infer the answer.
 *
 * `flags` in particular is deliberately EXCLUDED: a transcriber's note reading
 * "option C looks like the intended answer, the others are non-integers" is
 * exactly the kind of steer that makes a downstream "independent" derivation
 * agree for the wrong reason.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { normalizeQuestions, type TQ } from "./lib";

type DerivePacketItem = {
  number: number;
  context?: string;
  stem: string;
  options: { label: string; text: string }[];
  hasFigure?: boolean;
};

/** Exported for tests: strips a transcribed question down to the blind packet. */
export function toPacket(questions: TQ[]): DerivePacketItem[] {
  return questions
    .slice()
    .sort((a, b) => a.number - b.number)
    .map((q) => ({
      number: q.number,
      ...(q.context ? { context: q.context } : {}),
      stem: q.stem,
      options: q.options.map((o) => ({ label: o.label, text: o.text })),
      ...(q.hasFigure ? { hasFigure: true } : {}),
    }));
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);

  const questions: TQ[] = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8")));
  const packet = toPacket(questions);

  const figures = packet.filter((p) => p.hasFigure).map((p) => p.number);
  console.log(`${paper.id}: ${packet.length} questions in the blind packet`);
  console.log(`  figure-bearing (deriver MUST open the page image): ${figures.length ? figures.join(", ") : "none"}`);
  console.log(`  page images: scripts/cds-maths/out/${paper.id}/pNN.png`);

  // Cheap guard against the packet carrying something it should not. It cannot
  // prove absence of a leak, but it catches the obvious ones.
  const serialized = JSON.stringify(packet);
  for (const banned of ["answer", "solution", "correct", "sourcekey"]) {
    if (new RegExp(`"${banned}"`).test(serialized)) {
      throw new Error(`packet contains a "${banned}" field — that would un-blind the derivation`);
    }
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.derive.json. Nothing written.`);
    return;
  }
  writeFileSync(dataPath(paper.id, "derive"), JSON.stringify(packet, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "derive")}`);
}

if (require.main === module) main();
