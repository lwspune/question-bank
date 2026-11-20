/**
 * Emit BLIND derivation packets from the merged transcription.
 *
 *   npx tsx scripts/mh-scholarship/dump-derive.ts ms8-2026-p1      # default 25 items per packet
 *   npx tsx scripts/mh-scholarship/dump-derive.ts ms8-2026-p1 30
 *
 * Reads   data/<paperId>.merged.json
 * Writes  out/derive/<paperId>.pN.json   (gitignored — regenerable)
 *
 * WHAT A PACKET WITHHOLDS, AND WHY IT MATTERS MORE THAN WHAT IT CARRIES.
 *
 * A packet carries ONLY: number, stem, options, and (Paper II) the governing
 * context passage. It deliberately drops `subject`, `chapter`, `subtopic`,
 * `difficulty` and `flags`.
 *
 * Every one of those is a second reader's OPINION formed while transcribing. Tell
 * a deriver the item is filed under "Environment and Ecology / Climate Change"
 * and you have narrowed its search before it has read the stem; tell it the
 * transcriber marked the item EASY and you have told it not to look twice. The
 * pipeline's whole claim is that two passes are INDEPENDENT, and independence is
 * a property of the inputs, not of good intentions.
 *
 * It also drops any answer: a key MSCE published is read only after both passes.
 *
 * The two passes read the SAME packets. What must differ is who reads them, not
 * what they see: a packet tailored per pass would make the crosstab meaningless.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { figurePath } from "./figures";
import { join } from "node:path";
import { OUT, dataPath, expectedCount, pattern, requirePaper } from "./config";
import type { TQ } from "../upsc/lib";

const DEFAULT_BATCH = 25;

function main() {
  const args = process.argv.slice(2);
  const positional = args.filter((a) => !a.startsWith("--"));
  const paper = requirePaper(positional[0]);
  const batch = positional[1] ? Number(positional[1]) : DEFAULT_BATCH;
  if (!Number.isFinite(batch) || batch < 1) throw new Error(`bad batch size: ${positional[1]}`);

  const merged = dataPath(paper.id, "merged");
  if (!existsSync(merged)) {
    throw new Error(`${merged} not found — run merge.ts --apply first.`);
  }
  const questions: TQ[] = JSON.parse(readFileSync(merged, "utf8")).questions as TQ[];
  const pat = pattern(paper);

  if (questions.length !== expectedCount(paper)) {
    throw new Error(
      `merged file holds ${questions.length} items but ${paper.id} expects ${expectedCount(paper)}. ` +
        `Refusing to emit packets from an incomplete paper.`
    );
  }

  const dir = join(OUT, "derive");
  mkdirSync(dir, { recursive: true });

  // `--only=51-70 --first=5`: packets for items added AFTER the passes ran,
  // numbered from p5 so the packets already derived are neither rewritten nor
  // renumbered.
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split("-").map(Number);
  const first = Number(process.argv.find((a) => a.startsWith("--first="))?.slice(8) ?? 1);
  if (only && (only.length !== 2 || !only.every(Number.isFinite))) throw new Error(`bad --only: expected --only=<from>-<to>`);
  const sorted = [...questions]
    .sort((a, b) => a.number - b.number)
    .filter((q) => !only || (q.number >= only[0] && q.number <= only[1]));
  if (only && !sorted.length) throw new Error(`--only=${only.join("-")} matches no item`);
  const packets: TQ[][] = [];
  for (let i = 0; i < sorted.length; i += batch) packets.push(sorted.slice(i, i + batch));

  console.log(`${paper.id}  ${sorted.length} items -> ${packets.length} packet(s) of <=${batch}, from p${first}\n`);

  packets.forEach((items, k) => {
    const i = k + first - 1;
    const blind = items.map((q) => ({
      number: q.number,
      stem: q.stem,
      options: q.options,
      ...(q.context ? { context: q.context } : {}),
      // A figure item cannot be solved from text, so the deriver gets the crop.
      // The crop shows only what the page prints: no answer, no classification.
      ...((q as TQ & { figure?: unknown }).figure ? { figureImage: figurePath(paper.id, q.number) } : {}),
    }));
    for (const b of blind) {
      if ("figureImage" in b && !existsSync(b.figureImage as string)) {
        throw new Error(`Q${b.number}: figure not cropped yet (python -P scripts/mh-scholarship/crop.py ${paper.id})`);
      }
    }
    const file = join(dir, `${paper.id}.p${i + 1}.json`);
    writeFileSync(
      file,
      JSON.stringify(
        {
          paper: paper.id,
          packet: `p${i + 1}`,
          // Do NOT reinstate "no answer key exists for this booklet" here. It was
          // written during the 2025 pilot, before any official key had been found,
          // and it is now false for most papers — a deriver on 2024-p2 read the
          // note, saw `2024-p2.key.json` sitting in the tree, and correctly
          // reported the contradiction rather than concluding its instructions
          // were stale and opening the file. A withheld key must be described as
          // withheld, never as absent.
          note:
            "BLIND PACKET. An official key may exist for this paper and is WITHHELD " +
            "from you on purpose; do not go looking for one. Subject, chapter, " +
            "difficulty and transcription flags are withheld too — see " +
            "scripts/mh-scholarship/DERIVATION_BRIEF.md.",
          items: blind,
        },
        null,
        2
      ) + "\n"
    );
    const withCtx = blind.filter((b) => "context" in b).length;
    console.log(
      `  p${i + 1}  Q${items[0].number}-Q${items[items.length - 1].number}  ` +
        `${items.length} items${withCtx ? `  (${withCtx} with context)` : ""}`
    );
  });

  console.log(`\nwrote ${packets.length} packet(s) to ${dir}`);
  console.log(
    `\nNext: run ONE blind pass over these packets (owner, 2026-11-20) and write\n` +
      `  derived/${paper.id}.a.pN.json\n` +
      `Contract: scripts/mh-scholarship/DERIVATION_BRIEF.md`
  );
}

main();
