/**
 * Check a shift before anything is transcribed or committed.
 *
 *   npx tsx scripts/ugc-net/validate.ts <shift-id|all>
 *
 * Without a transcription: the extracted manifest has Q1-50, and every id is in
 * NTA's key section for THIS date and shift (so the paper is the shift we say it
 * is, and every answer exists). With data/<shift>.questions.json: also its
 * paperIssues, and that its ids are the manifest's, ref for ref.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SHIFTS, dataDir, keyPath, renderDir, shiftById, type Shift } from "./config";
import { paperIssues, parseNtaKey, type KeySection, type UgcPaper } from "./lib";

type Manifest = { header: string | null; rows: { ref: string; qid: string }[] };
const keyCache = new Map<string, KeySection[]>();

function check(s: Shift): string[] {
  const issues: string[] = [];
  const mPath = join(renderDir(s.id), "manifest.json");
  if (!existsSync(mPath)) return [`${s.id}: not extracted (python -P scripts/ugc-net/extract.py ${s.id} <pdf>)`];
  const m = JSON.parse(readFileSync(mPath, "utf8")) as Manifest;
  if (!keyCache.has(s.cycle)) keyCache.set(s.cycle, parseNtaKey(readFileSync(keyPath(s.cycle), "utf8")));
  const sections = keyCache.get(s.cycle)!.filter((k) => k.date === s.date && k.shift === s.shift);
  if (!sections.length) return [`${s.id}: NTA's key has no section for ${s.date} shift ${s.shift}`];
  const inShift = (qid: string) => sections.some((k) => k.answers.has(qid));
  const missing = m.rows.filter((r) => !inShift(r.qid));
  if (m.rows.length !== 50) issues.push(`${s.id}: manifest has ${m.rows.length} questions`);
  if (missing.length) issues.push(`${s.id}: ${missing.length} id(s) not in the key for this shift, e.g. Q${missing[0].ref} ${missing[0].qid}`);
  const own = sections.find((k) => m.rows.every((r) => k.answers.has(r.qid)));
  if (own && own.code !== s.code) issues.push(`${s.id}: ids belong to key subject ${own.code} ${own.subject}, config says ${s.code}`);

  const qPath = join(dataDir(), `${s.id}.questions.json`);
  if (existsSync(qPath)) {
    const paper = JSON.parse(readFileSync(qPath, "utf8")) as UgcPaper;
    issues.push(...paperIssues(paper));
    const want = new Map(m.rows.map((r) => [r.ref, r.qid]));
    for (const r of paper.rows) if (want.get(r.ref) !== r.qid) issues.push(`${s.id} Q${r.ref}: id ${r.qid} is not the manifest's ${want.get(r.ref)}`);
    if (paper.rows.length !== 50) issues.push(`${s.id}: transcription has ${paper.rows.length} rows`);
  }
  console.log(`${s.id}  ${s.subject.padEnd(22)} ${m.header ?? ""}  ${issues.length ? `${issues.length} issue(s)` : "ok"}`);
  return issues;
}

const arg = process.argv[2];
if (!arg) throw new Error("usage: validate.ts <shift-id|all>");
const issues = (arg === "all" ? SHIFTS : [shiftById(arg)]).flatMap(check);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
