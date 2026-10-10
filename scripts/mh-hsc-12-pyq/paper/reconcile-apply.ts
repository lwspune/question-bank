/**
 * Correct a RECONCILE sitting's shipped rows to the printed paper, IN PLACE.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-apply.ts <paperId>           # report only
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-apply.ts <paperId> --apply   # write
 *
 * WHY IN PLACE. The compilation rows are live: drills, saved questions, chapter
 * tests, activity history and item statistics all point at their ids. The old
 * plan for a corrected stem was delete + re-commit (content_hash covers the
 * stem), which would have cut every one of those links. Here the row keeps its
 * id and gets the printed text, the printed question number and a fingerprint
 * recomputed by the lane's own record builder, so the next commit of this
 * transcription dedupes onto it instead of duplicating it.
 *
 * WHAT IS GATED. Pairing and classification are reconcileCore.ts. A pair whose
 * only differences are typesetting is applied as it stands. A pair that differs
 * in CONTENT (a word, a number, an option) or in its KEY is refused until
 * data/reconcile/<id>.json records, under `checked`, that a person compared it
 * with the printed page. On a third-party reproduction (config `thirdParty`)
 * that note is required for every content pair, because there the paper is a
 * second transcription, not the artifact. The transcription file is the source
 * of record: where the bank was right, fix the TRANSCRIPTION, re-run, and the
 * pair stops differing.
 *
 * SAFETY. Every row and its options are written to backups/ before anything
 * changes. Each update is conditional on the row still carrying the fingerprint
 * this run read, so a second run, or a row edited meanwhile, changes nothing. A
 * new fingerprint already held by another row of the exam is refused (the
 * unique index would refuse it anyway; this names both rows).
 *
 * data/reconcile/<id>.json (all keys optional):
 *   manual:   { "<transcription ref>": "<row id>" }   pairs autoPair cannot make
 *   checked:  { "<transcription ref>": "<what the page shows>" }
 *   resolve:  { "<transcription ref>": "<row id>" }  leave this row as it is (corrected,
 *             it would copy another sitting's row) and build the paper from it
 *   solution: { "<transcription ref>": "paper" }     take the transcription's solution
 *             (only when the row's question changed shape, so its old solution no
 *             longer fits; otherwise the reviewed solution on the row is kept)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper, questionsJsonPath, type Paper } from "./config";
import { catalogFor } from "./catalog";
import { grammarFor } from "./lib";
import { buildPaperRecords, type PaperQuestion } from "../../mh-ssc-10/lib";
import { autoPair, classifyPair, type BankSide, type PaperSide } from "./reconcileCore";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

type Decisions = {
  manual?: Record<string, string>;
  checked?: Record<string, string>;
  solution?: Record<string, "paper">;
  /** Refs whose row stays as it is because, corrected, it would copy another
   *  sitting's row; the paper builder uses this row for the ref. */
  resolve?: Record<string, string>;
  /** As `resolve`, but the paper does NOT use this row: it finds the identical
   *  row of the other sitting by fingerprint. For a row that, kept as is, would
   *  print differently from its siblings (it lacks their shared heading). */
  keep?: Record<string, string>;
  /** Refs whose row was held PRIVATE only because it was broken, and which this
   *  correction mends: made PUBLIC once corrected. */
  publish?: Record<string, string>;
  /** Row ids taken out of the sitting: a fragment duplicating a question that
   *  another row now carries whole. Made PRIVATE (never deleted, so every link
   *  to it survives) and left out of the pairing. */
  hide?: Record<string, string>;
};

type Row = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  content_hash: string;
  question_format: string;
  pyq_month: string | null;
  visibility: string;
  options: { id: string; label: string; text: string; is_correct: boolean }[];
};

export const decisionsPath = (id: string) => join(__dirname, "data", "reconcile", `${id}.json`);

/** Every shipped row of this sitting: the compilation's (filed under its own
 *  month) and any the paper lane already added (filed under the cover month). */
export async function sittingRows(db: SupabaseClient, paper: Paper): Promise<Row[]> {
  const { data: subj, error: sErr } = await db
    .from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", paper.subject).single();
  if (sErr || !subj) throw new Error(`subject ${paper.subject}: ${sErr?.message}`);
  const months = [...new Set([paper.month, paper.bankMonth ?? paper.month])];
  const { data, error } = await db
    .from("questions")
    .select("id, question_number, text, context, solution, content_hash, question_format, pyq_month, visibility, options(id, label, text, is_correct)")
    .eq("subject_id", subj.id)
    .eq("question_kind", "pyq")
    .eq("pyq_year", paper.year)
    .in("pyq_month", months);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Row[];
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id) throw new Error("usage: reconcile-apply.ts <paperId> [--apply]");
  const paper = requirePaper(id);
  if (paper.bankStatus !== "reconcile") throw new Error(`${id} is not a reconcile paper`);
  const g = grammarFor(paper.subject);
  const decisions: Decisions = existsSync(decisionsPath(id)) ? JSON.parse(readFileSync(decisionsPath(id), "utf8")) : {};

  const questions = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];
  const { rows: records } = buildPaperRecords(catalogFor(paper.subject), questions);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const rows = await sittingRows(db, paper);

  const hide = decisions.hide ?? {};
  for (const rid of Object.keys(hide)) {
    if (!rows.some((r) => r.id === rid)) throw new Error(`hide names row ${rid}, which is not in this sitting`);
  }
  const bank: BankSide[] = rows.filter((r) => !hide[r.id]).map((r) => ({
    id: r.id,
    ref: r.question_number,
    text: r.text,
    context: r.context,
    options: [...(r.options ?? [])].sort((a, b) => a.label.localeCompare(b.label)),
    contentHash: r.content_hash,
    format: r.question_format,
  }));
  const side: PaperSide[] = records.map((r, i) => ({
    ref: questions[i].ref,
    stem: r.text,
    context: r.context ?? null,
    options: r.options.map((o) => ({ label: o.label, text: o.text })),
    answer: r.options.find((o) => o.isCorrect)?.label ?? null,
    contentHash: r.contentHash,
    format: r.questionFormat ?? "mcq",
  }));
  const recordOf = new Map(records.map((r, i) => [questions[i].ref, r]));

  const { pairs, unpairedBank, unpairedPaper } = autoPair(bank, side, (r) => g.normaliseRef(String(r ?? "")), decisions.manual ?? {});

  // A transcription row with no bank row of its own is fine when its fingerprint
  // already sits on another row of the exam: a verbatim repeat of an earlier
  // sitting, which the paper builder resolves by fingerprint.
  const loose = unpairedPaper.map((ref) => recordOf.get(ref)!.contentHash);
  const elsewhere = new Map<string, string>();
  for (let i = 0; i < loose.length; i += 150) {
    const { data, error } = await db.from("questions").select("id, content_hash").eq("exam_id", EXAM_ID).in("content_hash", loose.slice(i, i + 150));
    if (error) throw new Error(error.message);
    for (const h of data ?? []) elsewhere.set(h.content_hash as string, h.id as string);
  }

  const byId = new Map(bank.map((b) => [b.id, b]));
  const sideOf = new Map(side.map((s) => [s.ref, s]));
  const plan = pairs.map((p) => ({ ...p, cls: classifyPair(byId.get(p.rowId)!, sideOf.get(p.paperRef)!) }));

  const counts: Record<string, number> = {};
  for (const p of plan) counts[p.cls.kind] = (counts[p.cls.kind] ?? 0) + 1;
  console.log(`\n${id}: ${paper.subject} ${paper.month} ${paper.year} (${paper.thirdParty ? "THIRD-PARTY reproduction" : "board print"})`);
  console.log(`  bank rows ${rows.length} · transcription rows ${questions.length} · paired ${pairs.length}`);
  console.log(`  ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(" · ")}`);

  const problems: string[] = [];
  const needsLook = plan.filter((p) => p.cls.kind === "content" || p.cls.kind === "key");
  for (const p of needsLook) {
    const ok = decisions.checked?.[p.paperRef];
    console.log(`  ${ok ? "checked" : "UNCHECKED"} ${p.cls.kind.padEnd(7)} ${p.paperRef} <- ${byId.get(p.rowId)!.ref} (${p.rowId.slice(0, 8)}): ${p.cls.detail.join("; ")}`);
    if (ok) console.log(`           page: ${ok}`);
    else problems.push(`${p.paperRef}: ${p.cls.kind} difference not checked against the page`);
  }
  // A written row that lost its printed options may become the MCQ it was, once
  // checked against the page; nothing else may change format.
  const toMcq = new Set<string>();
  for (const p of plan.filter((x) => x.cls.kind === "format-mismatch")) {
    const b = byId.get(p.rowId)!;
    const lostOptions = b.format === "subjective" && b.options.length === 0 && sideOf.get(p.paperRef)!.format === "mcq";
    if (lostOptions && decisions.checked?.[p.paperRef]) {
      toMcq.add(p.paperRef);
      console.log(`  checked to-mcq  ${p.paperRef} <- ${b.ref} (${p.rowId.slice(0, 8)}): the row lost its printed options`);
    } else problems.push(`${p.paperRef}: ${p.cls.detail.join("")}${lostOptions ? " (check it against the page to restore the options)" : ""}`);
  }
  for (const p of plan) {
    const r = rows.find((x) => x.id === p.rowId)!;
    if (r.visibility !== "PUBLIC" && !decisions.publish?.[p.paperRef]) {
      problems.push(`${p.paperRef}: row ${p.rowId} is ${r.visibility}; record publish["${p.paperRef}"] once it is mended, or the paper cannot use it`);
    }
  }
  for (const [rid, why] of Object.entries(hide)) console.log(`  hide ${rid.slice(0, 8)}: ${why}`);
  for (const rid of unpairedBank) {
    const b = byId.get(rid)!;
    problems.push(`bank row ${rid} (${b.ref}) has no transcription row: "${b.text.slice(0, 80)}"`);
  }
  const adds: string[] = [];
  for (const ref of unpairedPaper) {
    const at = elsewhere.get(recordOf.get(ref)!.contentHash);
    if (at) console.log(`  resolves elsewhere: ${ref} is row ${at}`);
    else adds.push(ref);
  }
  if (adds.length) {
    const known = new Set((paper.knownMissingRefs ?? []).map((r) => g.normaliseRef(r)));
    for (const ref of adds) {
      if (!known.has(g.normaliseRef(ref))) problems.push(`${ref}: on the paper, in no row, and not in knownMissingRefs`);
    }
    console.log(`  to ADD via commit.ts --only-missing: ${adds.join(", ")}`);
  }
  for (const ref of Object.keys(decisions.checked ?? {})) {
    if (!needsLook.some((p) => p.paperRef === ref)) console.log(`  note: checked ${ref} no longer differs in content`);
  }

  // A corrected row must not become a copy of ANOTHER row: the board repeats
  // questions across sittings, and the lane keeps each sitting's row. Such a
  // row is left as it is and the paper points at it through `resolve`.
  const changing = plan.filter((p) => p.cls.kind !== "same");
  const targets = changing.map((w) => recordOf.get(w.paperRef)!.contentHash);
  const owner = new Map<string, string>();
  for (let i = 0; i < targets.length; i += 150) {
    const { data, error } = await db.from("questions").select("id, content_hash").eq("exam_id", EXAM_ID).in("content_hash", targets.slice(i, i + 150));
    if (error) throw new Error(error.message);
    for (const h of data ?? []) owner.set(h.content_hash as string, h.id as string);
  }
  const kept = new Set<string>();
  for (const w of changing) {
    const other = owner.get(recordOf.get(w.paperRef)!.contentHash);
    if (!other || other === w.rowId) continue;
    if (decisions.resolve?.[w.paperRef] === w.rowId || decisions.keep?.[w.paperRef] === w.rowId) {
      kept.add(w.paperRef);
      console.log(`  kept as is: ${w.paperRef} (row ${w.rowId.slice(0, 8)}); corrected, it would be a copy of row ${other}`);
    } else {
      problems.push(`${w.paperRef}: corrected, row ${w.rowId} would copy row ${other}; add resolve (or keep) ["${w.paperRef}"] = "${w.rowId}" to leave it as is`);
    }
  }
  const writes = changing.filter((w) => !kept.has(w.paperRef));
  const monthFix = paper.bankMonth && paper.bankMonth !== paper.month ? rows.filter((r) => r.pyq_month !== paper.month) : [];
  console.log(`  would correct ${writes.length} row(s)${monthFix.length ? `, and re-file ${monthFix.length} from ${paper.bankMonth} to ${paper.month}` : ""}`);
  if (problems.length) {
    console.log(`\n  REFUSED (${problems.length}):\n    ${problems.join("\n    ")}`);
    if (apply) process.exit(1);
    return;
  }
  if (!apply) {
    console.log("  DRY RUN: nothing written. Add --apply.");
    return;
  }

  const publishIds = plan.filter((p) => decisions.publish?.[p.paperRef]).map((p) => p.rowId);
  const touched = new Set([...writes.map((w) => w.rowId), ...monthFix.map((r) => r.id), ...publishIds, ...Object.keys(hide)]);
  const dir = join(process.cwd(), "backups");
  mkdirSync(dir, { recursive: true });
  const backup = join(dir, `reconcile-${id}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(backup, JSON.stringify(rows.filter((r) => touched.has(r.id)), null, 1));
  console.log(`  backup: ${backup}`);

  let done = 0;
  for (const w of writes) {
    const rec = recordOf.get(w.paperRef)!;
    const row = rows.find((r) => r.id === w.rowId)!;
    const patch: Record<string, unknown> = {
      text: rec.text,
      context: rec.context ?? null,
      question_number: w.paperRef,
      content_hash: rec.contentHash,
    };
    if (toMcq.has(w.paperRef)) patch.question_format = "mcq";
    if (decisions.publish?.[w.paperRef]) patch.visibility = "PUBLIC";
    if (decisions.solution?.[w.paperRef] === "paper") {
      if (!rec.solution) throw new Error(`${w.paperRef}: solution "paper" chosen but the transcription has none`);
      patch.solution = rec.solution;
    }
    const { data, error } = await db.from("questions").update(patch).eq("id", w.rowId).eq("content_hash", row.content_hash).select("id");
    if (error) throw new Error(`${w.paperRef}: ${error.message}`);
    if (data?.length !== 1) throw new Error(`${w.paperRef}: row ${w.rowId} changed since it was read; nothing written for it`);
    if (toMcq.has(w.paperRef)) {
      const { error: iErr } = await db
        .from("options")
        .insert(rec.options.map((o) => ({ question_id: w.rowId, label: o.label, text: o.text, is_correct: o.isCorrect })));
      if (iErr) throw new Error(`${w.paperRef} options: ${iErr.message}`);
    }
    for (const o of toMcq.has(w.paperRef) ? [] : rec.options) {
      const cur = row.options.find((x) => x.label === o.label);
      if (!cur) throw new Error(`${w.paperRef}: option ${o.label} missing on row ${w.rowId}`);
      if (cur.text === o.text && cur.is_correct === o.isCorrect) continue;
      const { error: oErr } = await db.from("options").update({ text: o.text, is_correct: o.isCorrect }).eq("id", cur.id);
      if (oErr) throw new Error(`${w.paperRef} option ${o.label}: ${oErr.message}`);
    }
    done++;
  }
  // A mended row whose content already matched (nothing to write) still opens.
  for (const p of plan.filter((x) => decisions.publish?.[x.paperRef] && !writes.includes(x))) {
    const { error } = await db.from("questions").update({ visibility: "PUBLIC" }).eq("id", p.rowId);
    if (error) throw new Error(`publish ${p.paperRef}: ${error.message}`);
  }
  for (const rid of Object.keys(hide)) {
    const { error } = await db.from("questions").update({ visibility: "PRIVATE" }).eq("id", rid);
    if (error) throw new Error(`hide ${rid}: ${error.message}`);
  }
  for (const r of monthFix) {
    const { error } = await db.from("questions").update({ pyq_month: paper.month }).eq("id", r.id);
    if (error) throw new Error(`re-file ${r.id}: ${error.message}`);
  }
  console.log(`  corrected ${done} row(s)${monthFix.length ? `, re-filed ${monthFix.length}` : ""}.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
