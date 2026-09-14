/**
 * Emit the BLIND derivation packet for one paper: `data/<paperId>.derive.json`.
 *
 *   npx tsx scripts/nda-gat/dump-derive.ts <paperId>
 *   npx tsx scripts/nda-gat/dump-derive.ts <paperId> --apply
 *   npx tsx scripts/nda-gat/dump-derive.ts <paperId> --apply --split=30
 *
 * The packet is what the blind derivation pass reads (see DERIVATION_BRIEF.md).
 * It carries the question and NOTHING that could reveal an answer.
 *
 * THE ALLOWLIST BELOW IS THE POINT OF THIS FILE. Fields are copied by NAME, not
 * spread — so a field added to the transcription later (a flag, a note, an
 * annotation someone found useful) cannot silently leak into the packet and
 * un-blind the pass. Before adding a field here, ask whether a deriver seeing it
 * could infer the answer.
 *
 * ## What a GAT packet withholds that a Mathematics packet need not
 *
 * `subject`, `chapter` and `subtopic` are EXCLUDED, and on this paper that
 * matters more than it does on a single-subject one. Telling a deriver that a
 * question is filed under `Current Affairs / Military Exercises — Bilateral and
 * Multilateral` narrows a four-option recall question to one plausible answer
 * before it has read the options — and the taxonomy was assigned by a human
 * reading the same page, so it is not independent evidence. The sibling
 * scripts/cds-gs packet withholds exactly these for the same reason.
 *
 * `difficulty` is excluded on the same ground: "HARD" is a transcriber's
 * judgement, and a deriver that reads it starts discounting the obvious option.
 *
 * `flags` is excluded because a transcriber's note reading "option C looks like
 * the intended answer, the others are not real committees" is precisely the
 * steer that makes a later "independent" derivation agree for the wrong reason.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { normalizeQuestions, PART_A_LAST, type GatTQ } from "./lib";

export type DerivePacketItem = {
  number: number;
  /** The paper's own Part A / Part B split. Printed on the page, not a judgement. */
  part: "A" | "B";
  context?: string;
  stem: string;
  options: { label: string; text: string }[];
  hasFigure?: boolean;
};

/**
 * Exported for tests: strips a transcribed question down to the blind packet.
 *
 * `part` IS included, and it is not a steer: it is printed on the booklet's own
 * page as `PART - A` / `PART - B`, a student sitting the paper sees it, and it
 * tells the deriver whether it is reading an English-language item or a general
 * knowledge one — which changes the METHOD, never the answer.
 *
 * `figureNote` is EXCLUDED ON PURPOSE and must stay excluded. It is the
 * transcriber's reading of a diagram, and a deriver handed it stops reading the
 * page and starts trusting a description. On the sibling Mathematics paper a
 * figureNote had two semicircles the wrong way round, and its reading gives a
 * value that is not a printed option — so a pass that trusted it would have
 * failed loudly there and could as easily have failed quietly.
 */
export function toPacket(q: GatTQ): DerivePacketItem {
  return {
    number: q.number,
    part: q.number <= PART_A_LAST ? "A" : "B",
    ...(q.context ? { context: q.context } : {}),
    stem: q.stem,
    options: q.options.map((o) => ({ label: o.label, text: o.text })),
    ...(q.hasFigure ? { hasFigure: true } : {}),
  };
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const split = Number(process.argv.find((a) => a.startsWith("--split="))?.split("=")[1] ?? 0);

  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);
  const questions = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8"))) as GatTQ[];

  const items = questions.map(toPacket).sort((a, b) => a.number - b.number);

  // A packet that leaked an answer field would be catastrophic and silent, so
  // assert rather than trust the allowlist.
  const ALLOWED = new Set(["number", "part", "context", "stem", "options", "hasFigure"]);
  for (const it of items) {
    for (const k of Object.keys(it)) {
      if (!ALLOWED.has(k)) throw new Error(`Q${it.number}: packet carries an unexpected field "${k}"`);
    }
    for (const o of it.options) {
      for (const k of Object.keys(o)) {
        if (k !== "label" && k !== "text") {
          throw new Error(`Q${it.number} option ${o.label}: unexpected field "${k}"`);
        }
      }
    }
  }

  const partA = items.filter((i) => i.part === "A").length;
  console.log(
    `${paper.id}: ${items.length} questions in the blind packet — Part A ${partA}, Part B ${items.length - partA}`
  );
  console.log(`  withheld: subject, chapter, subtopic, difficulty, flags, figureNote`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the packet. Nothing written.`);
    return;
  }

  writeFileSync(dataPath(paper.id, "derive"), JSON.stringify(items, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "derive")}`);

  if (split > 0) {
    // Range files for throughput. This is ONE pass split for parallelism, not
    // several passes — so a question appearing in two range files is a DISPATCH
    // ERROR, and merge-answers.ts reports it as one rather than reconciling.
    let n = 0;
    for (let i = 0; i < items.length; i += split) {
      n += 1;
      const chunk = items.slice(i, i + split);
      writeFileSync(
        dataPath(paper.id, `derive.part${n}`),
        JSON.stringify(chunk, null, 2) + "\n",
        "utf8"
      );
      console.log(`  part${n}: Q${chunk[0].number}-${chunk[chunk.length - 1].number} (${chunk.length})`);
    }
  }
}

if (require.main === module) main();
