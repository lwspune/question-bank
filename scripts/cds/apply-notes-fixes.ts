/**
 * Apply adjudicated CDS English repairs found during the /notes pass — source edited, row rebuilt
 * through the REAL commit pipeline, bank row updated IN PLACE (id kept).
 *
 *   npx tsx scripts/cds/apply-notes-fixes.ts <spec.json>           # dry run
 *   npx tsx scripts/cds/apply-notes-fixes.ts <spec.json> --apply   # write
 *
 * spec: [{ "id": "<full uuid>", "paper": "2018-1", "q": 34,
 *          "verdict": "key_fixed" | "stem_fixed" | "solution_rewritten",
 *          "from": "C",                         // REQUIRED when `set.answer` changes the key: the bank's current key
 *          "set": { "answer": "B", "reasoning": "...", "stem": "...",
 *                   "options": { "B": "composed", "D": "heedless" },   // printed text, read off the page
 *                   "underline": "anxious" },    // single-underline token (underlines.json)
 *          "why": "<adjudication, with the page evidence>" }]
 *
 * WHY THIS SHAPE. `content_hash` covers stem + options + answer, and for CDS English the stored stem
 * is BUILT (underline markup, error-part stems rebuilt from option text — lib.ts buildRecords). Editing
 * the bank directly would drift from what the source implies; re-committing mints a NEW uuid and
 * orphans concept tags and 20 mock refs. So: edit <paper>.questions.json / underlines.json, rebuild the
 * paper with buildRecords → normalizeNewlines → validateRow (exactly resync.ts's pipeline), take the
 * rebuilt row, and write its text, solution, options and content_hash onto the EXISTING bank row.
 * `resync.ts <paper>` is then a no-op, which the run checks for every paper it touched.
 * One question_reviews row per fix, stamped with the NEW hash (run "notes:cds-english").
 *
 * Mis-slot / option-text repairs must come from the PRINTED PAGE (README "the defect class").
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { validateRow } from "../../src/lib/upload/validate";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";
import { buildRecords, normalizeQuestions, type Section, type Underlines } from "./lib";
import { EXAM_ID, dataPath, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = {
  id: string; paper: string; q: number; verdict: "key_fixed" | "stem_fixed" | "solution_rewritten"; from?: string; why: string;
  set: { answer?: string; reasoning?: string; stem?: string; options?: Record<string, string>; underline?: string };
};
const RUN_LABEL = "notes:cds-english";
type Src = { qPath: string; qRaw: string; list: any[]; uPath: string; uRaw: string | null; underlines: Underlines; sections: Section[] };

function writeLike(path: string, raw: string, data: unknown, indent: number) {
  let out = JSON.stringify(data, null, indent);
  if (/\n$/.test(raw)) out += "\n";
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  writeFileSync(path, out, "utf8");
}
const indentOf = (raw: string) => (raw.match(/\n( +)"/)?.[1].length ?? 1);

function rebuild(src: Src, q: number) {
  const { rows } = buildRecords(src.sections, normalizeQuestions(src.list), src.underlines);
  const r = rows.find((x) => Number(x.questionNumber) === q);
  if (!r) throw new Error(`Q${q}: no row built`);
  r.question = normalizeNewlines(r.question);
  if (r.context) r.context = normalizeNewlines(r.context);
  if (r.solution) r.solution = normalizeNewlines(r.solution);
  const v = validateRow(r);
  if (v.errors.length || !v.parsed) throw new Error(`Q${q} does not validate: ${v.errors.join("; ")}`);
  return v.parsed;
}

async function main() {
  const specPath = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!specPath || specPath.startsWith("--")) throw new Error("usage: apply-notes-fixes.ts <spec.json> [--apply]");
  const fixes: Fix[] = JSON.parse(readFileSync(specPath, "utf8"));
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const srcs = new Map<string, Src>();
  const load = (pid: string): Src => {
    if (!srcs.has(pid)) {
      const qPath = dataPath(pid, "questions"), uPath = dataPath(pid, "underlines");
      const qRaw = readFileSync(qPath, "utf8");
      const uRaw = existsSync(uPath) ? readFileSync(uPath, "utf8") : null;
      srcs.set(pid, {
        qPath, qRaw, list: JSON.parse(qRaw), uPath, uRaw, underlines: uRaw ? JSON.parse(uRaw) : {},
        sections: JSON.parse(readFileSync(dataPath(pid, "sections"), "utf8")),
      });
    }
    return srcs.get(pid)!;
  };

  type Plan = { fix: Fix; parsed: ReturnType<typeof rebuild> };
  const plans: Plan[] = [];
  for (const fix of fixes) {
    const paper = requirePaper(fix.paper);
    if (!fix.why?.trim()) throw new Error(`${fix.id}: why is required`);
    const { data: b, error } = await db.from("questions")
      .select("id, exam_id, source_file, question_number, content_hash, options(label, is_correct)").eq("id", fix.id).single();
    if (error || !b) throw new Error(`${fix.id}: ${error?.message ?? "not found"}`);
    if (b.exam_id !== EXAM_ID || b.source_file !== paper.sourceFile || Number(b.question_number) !== fix.q) {
      throw new Error(`${fix.id}: does not join to ${fix.paper} Q${fix.q} (${b.source_file} Q${b.question_number})`);
    }
    const bankKey = ((b.options ?? []) as any[]).filter((o) => o.is_correct).map((o) => o.label).join("");

    const src = load(paper.id);
    const row = src.list.find((x) => Number(x.number) === fix.q);
    if (!row) throw new Error(`${fix.paper} Q${fix.q}: not in ${src.qPath}`);
    const s = fix.set;
    if (s.answer !== undefined && String(row.answer).toUpperCase() !== s.answer) {
      if (!fix.from) throw new Error(`${fix.id}: a key change needs "from"`);
      if (bankKey !== fix.from) throw new Error(`${fix.id}: bank key is ${bankKey}, expected ${fix.from}`);
      row.answer = s.answer;
    }
    if (s.reasoning !== undefined) row.reasoning = s.reasoning.trim();
    if (s.stem !== undefined) row.stem = s.stem;
    if (s.options) for (const [label, text] of Object.entries(s.options)) {
      const o = row.options.find((x: any) => x.label === label);
      if (!o) throw new Error(`${fix.id}: no option ${label} in source`);
      o.text = text;
    }
    if (s.underline !== undefined) {
      src.underlines.single = { ...(src.underlines.single ?? {}), [String(fix.q)]: s.underline };
    }
    const parsed = rebuild(src, fix.q);
    plans.push({ fix, parsed });
    const key = parsed.options.filter((o) => o.isCorrect).map((o) => o.label).join("");
    console.log(`${fix.paper} Q${fix.q} (${fix.id.slice(0, 8)}) ${fix.verdict}: key ${bankKey} -> ${key}; hash ${String(b.content_hash).slice(0, 10)} -> ${parsed.contentHash.slice(0, 10)}`);
    console.log(`  ${fix.why}`);
  }

  console.log(`\n${plans.length} fix(es)`);
  if (!apply) return console.log("dry run — add --apply to write");

  const reviews: ReviewInput[] = [];
  for (const { fix, parsed } of plans) {
    for (const o of parsed.options) {
      const { error } = await db.from("options").update({ text: o.text, is_correct: o.isCorrect }).eq("question_id", fix.id).eq("label", o.label);
      if (error) throw new Error(`${fix.id} option ${o.label}: ${error.message}`);
    }
    const { error } = await db.from("questions")
      .update({ text: parsed.text, solution: parsed.solution ?? null, content_hash: parsed.contentHash }).eq("id", fix.id);
    if (error) throw new Error(`${fix.id}: ${error.message}`);
    reviews.push({
      questionId: fix.id, reviewedContentHash: parsed.contentHash, method: "blind_rederivation", verdict: fix.verdict,
      runLabel: RUN_LABEL, derivedModel: "claude-opus-5", note: fix.why.slice(0, 480),
    });
  }
  for (const s of srcs.values()) {
    writeLike(s.qPath, s.qRaw, s.list, indentOf(s.qRaw));
    if (s.uRaw !== null) writeLike(s.uPath, s.uRaw, s.underlines, indentOf(s.uRaw));
  }
  console.log(formatRecordResult(await recordReviews(db, reviews)));
  console.log(`applied ${plans.length}. Check: npx tsx scripts/cds/resync.ts <paper> for ${[...srcs.keys()].join(", ")} — each must read "in sync".`);
}

main().catch((e) => { console.error(e); process.exit(1); });
