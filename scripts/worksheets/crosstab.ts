// Crosstab the two independent blind passes against the source key for the
// disputed rows. Classifies each row so hand-derivation goes where the two
// passes CONFLICT, not where they already agree.
//
//   npx tsx scripts/worksheets/crosstab.ts <chapterId>
//
// Batch-H trap encoded here: a "flip" landing on a row either pass flagged as a
// TWIN is NOT a flip — both passes may have named the twin letter of an
// equivalent pair, in which case the repair is to the option text and the key
// is RETAINED. Those are surfaced separately as FLIP?TWIN.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA, OUT } from "./config";
import { readChapterQuestions } from "./read";
import { questionId } from "./lib";

const chapter = requireChapter(process.argv[2]);
type V1 = { id: string; derived: string; confidence: string; note?: string };
type V2 = { id: string; derived: string; confidence: string; value?: string; note?: string };

const p1: V1[] = JSON.parse(readFileSync(join(DATA, `${chapter.id}.derived.json`), "utf8"));
// Pass-2 verdicts are COMMITTED (data/<id>.recheck.json) — they are the evidence
// behind every retained key on a disputed row, so they must survive the run.
// Fall back to the raw agent drop in out/ while a batch is still in flight.
const recheckCommitted = join(DATA, `${chapter.id}.recheck.json`);
const recheckScratch = join(OUT, chapter.id, "recheck-verdicts.json");
const p2: V2[] = JSON.parse(
  readFileSync(existsSync(recheckCommitted) ? recheckCommitted : recheckScratch, "utf8")
);
const m1 = new Map(p1.map((v) => [v.id, v]));
const m2 = new Map(p2.map((v) => [v.id, v]));

const keyOf = new Map<string, string>();
const stemOf = new Map<string, string>();
for (const f of readChapterQuestions(chapter))
  for (const q of f.questions) {
    keyOf.set(questionId(f.fileIndex, q.row), q.answer);
    stemOf.set(questionId(f.fileIndex, q.row), q.stem);
  }

const buckets: Record<string, string[]> = {};
const up = (s?: string) => (s ?? "").trim().toUpperCase();

for (const v2 of p2) {
  const id = v2.id;
  const key = keyOf.get(id) ?? "?";
  const a = up(m1.get(id)?.derived);
  const b = up(v2.derived);
  // Match ONLY the structured prefix the brief mandates ("TWIN: A=C"). An
  // earlier version matched free prose (twin|both|equal|identical) and fired on
  // a pass-2 note reading "p = 0 (equivalently q = 1)" — burying a GENUINE key
  // flip in the FLIP?TWIN bucket, which is the one bucket a reviewer is primed
  // to dismiss. A twin claim is a structured assertion, not a turn of phrase.
  const twinFlag = /\bTWIN:\s*[A-D]\s*=\s*[A-D]/i.test(`${m1.get(id)?.note ?? ""} ${v2.note ?? ""}`);

  let bucket: string;
  if (a !== b) bucket = "CONFLICT (passes disagree — hand-derive)";
  else if (b === "X") bucket = "X dual-confirmed (no correct option / broken)";
  else if (b === key) bucket = "PASS2 AGREES WITH KEY (pass 1 was wrong — key stands)";
  else if (twinFlag) bucket = "FLIP?TWIN (both passes name same letter BUT a twin was flagged — verify before flipping)";
  else bucket = "FLIP dual-confirmed";

  (buckets[bucket] ??= []).push(
    `  ${id.padEnd(7)} key=${key} p1=${a} p2=${b}${v2.value ? `  value=${v2.value.slice(0, 70)}` : ""}\n      ${(stemOf.get(id) ?? "").replace(/\s+/g, " ").slice(0, 95)}${v2.note ? `\n      p2note: ${v2.note.replace(/\s+/g, " ").slice(0, 150)}` : ""}`
  );
}

for (const [name, list] of Object.entries(buckets).sort()) {
  console.log(`\n### ${name}  (${list.length})`);
  for (const l of list) console.log(l);
}
const missing = p2.length;
console.log(`\n${missing} disputed rows crosstabbed`);
