/**
 * Dump one subject's questions from an extracted paper for the classification /
 * key-verification pass. Reads out/<paperId>.records.json, writes
 * out/<paperId>_<subject>.txt — one block per question with its stem, options
 * (marking the extracted key), NAT answer, and a FIGURE flag.
 *
 * The figure flag matters for Physics/Chemistry: a stem whose data lives in a
 * diagram is NOT self-contained, so it can't be classified (or blind-solved)
 * from the text alone — the image has to be read.
 *
 *   npx tsx scripts/jee/dump-subject.ts <paperId> [--subject=Physics] [--blind]
 *
 * --blind suppresses the answer key (both the <==srcKEY marker and the NAT
 * answer) for the BLIND lane, where the extracted key is untrustworthy and the
 * agent must derive every answer itself. Writes <paperId>_<subject>_blind.txt.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { mediaDir, recordsPath, requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  stem: string;
  numericAnswer?: number | null;
  imageRefs?: string[];
  hasStemImage?: boolean;
  options: { label: string; text: string; isCorrect: boolean }[] | null;
};

function main() {
  const paperId = requirePaperId(process.argv, 2, "dump-subject.ts <paperId> [--subject=Physics]");
  const subject = parseSubjectArg(process.argv) ?? "Maths";
  const blind = process.argv.includes("--blind");
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const rows = records
    .filter((r) => r.subject === subject)
    .sort((a, b) => a.questionNumber - b.questionNumber);

  const out: string[] = [];
  for (const r of rows) {
    const refs = r.imageRefs ?? [];
    const fig = refs.length ? `  [FIGURE x${refs.length}${r.hasStemImage ? " in-stem" : ""}]` : "";
    out.push(`=== Q${r.questionNumber} [${r.status}]${fig} ===`);
    // Emit the resolved on-disk paths so a classifier can actually OPEN the
    // figure. A text-only dump forces the agent to either guess or abstain on
    // every figure-bearing question — on the Chemistry pilot that was 4 of 25,
    // and one of them (a zero-order half-life plot read as first-order) was
    // MISCLASSIFIED purely because the plot wasn't visible.
    for (const ref of refs) {
      const local = existsSync(ref) ? ref : join(mediaDir(paperId), "media", basename(ref));
      out.push(`  [IMAGE] ${local}`);
    }
    out.push(r.stem.trim());
    if (r.status === "numeric") {
      // In blind mode the NAT answer IS the key — emitting it defeats the lane.
      out.push(blind ? "  NAT — derive the numeric answer." : `  NAT answer: ${r.numericAnswer ?? "(none)"}`);
    } else if (r.options) {
      for (const o of r.options) {
        out.push(`  (${o.label}) ${o.text}${!blind && o.isCorrect ? "  <==srcKEY" : ""}`);
      }
    }
    out.push("");
  }
  // A blind dump gets its own filename. If both shared one, a stale keyed dump
  // left in out/ could be handed to a blind agent with nothing to reveal the
  // mistake — and an agent that can see the key is not solving blind, it is
  // rationalising a key that may be shifted.
  const path = join(
    "scripts/jee/out",
    `${paperId}_${subject.toLowerCase()}${blind ? "_blind" : ""}.txt`,
  );
  writeFileSync(path, out.join("\n"), "utf8");
  console.log(`wrote ${rows.length} ${subject} questions -> ${path}`);
}

main();
