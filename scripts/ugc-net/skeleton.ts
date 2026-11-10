/**
 * Write the empty transcription for a shift from its extracted manifest: every
 * row's ref and NTA question id filled in, the rest for the transcriber. The
 * ids come from the paper's text layer, so a transcriber never types one.
 *
 *   npx tsx scripts/ugc-net/skeleton.ts <shift-id|all>
 *
 * Never overwrites an existing transcription.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SHIFTS, blindDir, dataDir, renderDir, shiftById, sourceFile } from "./config";
import type { UgcPaper } from "./lib";

const arg = process.argv[2];
if (!arg) throw new Error("usage: skeleton.ts <shift-id|all>");
mkdirSync(dataDir(), { recursive: true });
for (const s of arg === "all" ? SHIFTS : [shiftById(arg)]) {
  const out = join(dataDir(), `${s.id}.questions.json`);
  mkdirSync(blindDir(s.id), { recursive: true });
  if (existsSync(out)) {
    console.log(`${s.id}: transcription exists, left as it is`);
    continue;
  }
  const m = JSON.parse(readFileSync(join(renderDir(s.id), "manifest.json"), "utf8")) as {
    rows: { ref: string; qid: string }[];
  };
  const paper: UgcPaper & { source: string } = {
    shift: s.id,
    source: `${sourceFile(s)}: NTA master question paper, ${s.subject} (${s.file}); Paper 1 is Q1-50`,
    _transcription: "",
    rows: m.rows.map((r) => ({ ref: r.ref, qid: r.qid, chapter: "", subtopic: "", text: "", options: [] })),
  };
  writeFileSync(out, JSON.stringify(paper, null, 2) + "\n");
  console.log(`${s.id}: skeleton written (${paper.rows.length} rows)`);
}
