/**
 * Emit BLIND derivation packets from the merged transcription.
 *
 *   npx tsx scripts/upsc/dump-derive.ts 2025-p1        # default 25 items per packet
 *   npx tsx scripts/upsc/dump-derive.ts 2025-p2 20
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
 * It also drops any answer, because there is none — this booklet has no key.
 *
 * The two passes read the SAME packets. What must differ is who reads them, not
 * what they see: a packet tailored per pass would make the crosstab meaningless.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, dataPath, pattern, requirePaper } from "./config";
import type { TQ } from "./lib";

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
  const questions: TQ[] = JSON.parse(readFileSync(merged, "utf8")).questions;
  const pat = pattern(paper);

  if (questions.length !== pat.questions) {
    throw new Error(
      `merged file holds ${questions.length} items but Paper ${paper.paper} has ${pat.questions}. ` +
        `Refusing to emit packets from an incomplete paper.`
    );
  }

  const dir = join(OUT, "derive");
  mkdirSync(dir, { recursive: true });

  const sorted = [...questions].sort((a, b) => a.number - b.number);
  const packets: TQ[][] = [];
  for (let i = 0; i < sorted.length; i += batch) packets.push(sorted.slice(i, i + batch));

  console.log(`${paper.id}  ${sorted.length} items -> ${packets.length} packet(s) of <=${batch}\n`);

  packets.forEach((items, i) => {
    const blind = items.map((q) => ({
      number: q.number,
      stem: q.stem,
      options: q.options,
      ...(q.context ? { context: q.context } : {}),
    }));
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
            "scripts/upsc/DERIVATION_BRIEF.md.",
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
    `\nNext: run TWO independent passes over these packets and write\n` +
      `  derived/${paper.id}.a.pN.json   and   derived/${paper.id}.b.pN.json\n` +
      `Contract: scripts/upsc/DERIVATION_BRIEF.md`
  );
}

main();
