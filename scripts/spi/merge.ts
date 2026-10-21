/**
 * Join a paper's pass-1 drafts into its transcript, dropping each draft's own preamble.
 *
 *   npx tsx scripts/spi/merge.ts <paperId> <draft> [<draft> ...]           # in number order
 *   npx tsx scripts/spi/merge.ts <paperId> <draft> ... --force             # replace an existing transcript
 *
 * Refuses to overwrite a transcript without --force: once merged, the transcript is the
 * source of record and is corrected in place (seams, adjudications), never re-merged over.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TRANSCRIPTS, requirePaper } from "./config";
import { mergeDrafts } from "./lib";

const args = process.argv.slice(2);
const [id, ...files] = args.filter((a) => !a.startsWith("--"));
const paper = requirePaper(id);
if (!files.length) throw new Error("name the drafts to merge, in number order");
const out = join(TRANSCRIPTS, `${paper.id}.txt`);
if (existsSync(out) && !args.includes("--force")) throw new Error(`${out} exists: it is the source of record; pass --force to replace it`);

const answers =
  paper.answerSource === "derived"
    ? "No key exists for this paper: every answer is our own, derived in two blind passes and settled against the page."
    : "Answers derived blind, then compared with the source's key; every disagreement is settled against the page.";
const header = [`${paper.sourceFile} (${paper.kind}). Transcribed from page images of ${paper.pdf}.`, answers, "Format: scripts/ssc-cgl/lib.ts."].join("\n");

mkdirSync(TRANSCRIPTS, { recursive: true });
writeFileSync(out, mergeDrafts(files.map((f) => readFileSync(f, "utf8")), header));
console.log(`wrote ${out} from ${files.length} draft(s)`);
