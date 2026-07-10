/**
 * Extract the official answer key from a test's canonical PDF text layer and write it to
 * data/<testId>.keys.json as { "1": "D", "2": "B", ... } (question number → A-D).
 *
 *   npx tsx scripts/pariksha/extract-keys.ts <testId>          # print, don't write
 *   npx tsx scripts/pariksha/extract-keys.ts <testId> --write  # write data/<id>.keys.json
 *
 * ParikshaGruh "+"/answer files print `Answer : X` once per question in continuous 1..N
 * order, so the i-th match is Q(i+1)'s key. commit.ts merges this over the vision
 * transcription (the key is authoritative — no vision answer-read for keyed tests).
 * For a keyless test the extractor finds 0 keys and writes nothing (answers are derived
 * by the transcription agent + REVIEW-flagged).
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { extractAnswerKeyFromText } from "./lib";
import { requireTest, dataPath } from "./config";

function pdfText(pdf: string): string {
  const py = `
import fitz
d = fitz.open(r"${pdf.replace(/\\/g, "\\\\")}")
print(chr(10).join(p.get_text() for p in d))
`;
  const res = spawnSync("python", ["-c", py], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`python extract failed: ${res.stderr}`);
  return res.stdout;
}

function main() {
  const testId = process.argv[2];
  const write = process.argv.includes("--write");
  const test = requireTest(testId);

  const keys = extractAnswerKeyFromText(pdfText(test.pdf));
  console.log(`${test.id}: ${keys.length} keys extracted (expected ${test.questionCount}, hasKey=${test.hasKey}).`);
  if (keys.length && keys.length !== test.questionCount) {
    console.log(`  WARNING: key count ${keys.length} != questionCount ${test.questionCount} — verify numbering.`);
  }
  const map: Record<string, string> = {};
  keys.forEach((k, i) => { map[String(i + 1)] = k; });

  if (!write) { console.log(JSON.stringify(map)); return; }
  if (!keys.length) { console.log("  no keys — nothing written (keyless test)."); return; }
  const out = dataPath(test.id, "keys");
  writeFileSync(out, JSON.stringify(map, null, 2));
  console.log(`wrote ${out}`);
}

main();
