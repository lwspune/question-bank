/**
 * Emit BLIND derivation packets for a paper.
 *
 *   npx tsx scripts/cds-gs/dump-derive.ts <paperId> [packetSize]
 *
 * Writes out/derive/<paperId>.p<N>.json — each packet carrying ONLY the question
 * number, the stem and the four options.
 *
 * WHAT IS WITHHELD, AND WHY EACH OMISSION MATTERS:
 *
 *  - There is no answer to withhold: this corpus has no printed key. That is the
 *    whole reason two independent passes exist.
 *
 *  - `subject` / `chapter` / `subtopic` are withheld even though they are
 *    harmless-looking. They are a transcriber's judgement about what the question
 *    tests, and handing a solver "Chemistry / Atomic Structure" narrows the
 *    search before it starts — so pass A and pass B would be reasoning from a
 *    shared prior instead of independently. Two passes that share a prior are one
 *    pass counted twice.
 *
 *  - `flags` are withheld for the same reason, and more sharply: a flag saying
 *    "options (b) and (c) differ only in the order of two ranks" hands over the
 *    discriminating observation the derivation is supposed to make for itself.
 *
 *  - `difficulty` is withheld: "HARD" invites hedging, "EASY" invites skimming.
 *
 * Packets go to out/ (gitignored, regenerable) rather than data/ — they are a
 * projection of the committed questions file, not a source of record.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, dataPath, requirePaper } from "./config";
import type { TQ } from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const size = Number(process.argv[3] ?? 30) || 30;

  const questions: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"));
  const dir = join(OUT, "derive");
  mkdirSync(dir, { recursive: true });

  const blind = questions.map((q) => ({
    number: q.number,
    stem: q.stem,
    options: q.options.map((o) => ({ label: o.label, text: o.text })),
  }));

  const packets: (typeof blind)[] = [];
  for (let i = 0; i < blind.length; i += size) packets.push(blind.slice(i, i + size));

  packets.forEach((p, i) => {
    const path = join(dir, `${paper.id}.p${i + 1}.json`);
    writeFileSync(path, JSON.stringify(p, null, 2) + "\n", "utf8");
    console.log(`  ${path}  Q${p[0].number}-${p[p.length - 1].number}  (${p.length})`);
  });

  // A packet that leaked a field would silently couple the two passes, so assert
  // the shape rather than trusting the mapping above.
  const leaked = new Set<string>();
  for (const q of blind) for (const k of Object.keys(q)) if (!["number", "stem", "options"].includes(k)) leaked.add(k);
  if (leaked.size) throw new Error(`packet leaked field(s): ${[...leaked].join(", ")}`);

  console.log(`\n${packets.length} packet(s), ${blind.length} questions, no leaked fields.`);
}

main();
