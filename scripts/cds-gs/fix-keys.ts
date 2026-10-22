/**
 * Change the key of committed CDS General Knowledge rows, in place.
 *
 *   npx tsx scripts/cds-gs/fix-keys.ts <spec.json>           # dry run
 *   npx tsx scripts/cds-gs/fix-keys.ts <spec.json> --apply   # write
 *
 * spec: [{ "paper": "2019-1", "number": 7, "answer": "C", "reasoning": "...", "why": "..." }]
 *
 * For the notes passes (2026-10-22): a reviewer re-derived a key the two blind
 * passes agreed on and found it wrong. SOURCE FIRST, THEN DB, as fix-solutions.ts:
 * data/<paper>.answers.json gets the new answer, value and reasoning plus a
 * `corrected` record, so a rebuild reproduces the change. The bank row keeps its
 * id; its options flip, its solution gets the corrected-on-review tail and its
 * content_hash is recomputed (planKeyFix, tests/cds-gs-key-fix.test.ts). Every
 * row is backed up to generated-papers/ before a write, and each update is
 * conditional on the old hash. A keyed paper (2026-2) is refused.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, dataPath, requirePaper } from "./config";
import { planKeyFix, type LiveRow } from "./keyFix";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = { paper: string; number: number; answer: string; reasoning: string; why: string };

function writePreserving(path: string, raw: string, data: unknown) {
  let out = JSON.stringify(data, null, 2);
  if (/\n$/.test(raw)) out += "\n";
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  writeFileSync(path, out, "utf8");
}

async function main() {
  const specPath = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!specPath) throw new Error("usage: fix-keys.ts <spec.json> [--apply]");
  const fixes: Fix[] = JSON.parse(readFileSync(specPath, "utf8"));
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const today = new Date().toISOString().slice(0, 10);

  const files = new Map<string, { path: string; raw: string; data: any }>();
  const load = (path: string) => {
    if (!files.has(path)) {
      const raw = readFileSync(path, "utf8");
      files.set(path, { path, raw, data: JSON.parse(raw) });
    }
    return files.get(path)!.data;
  };
  const writes: { id: string; oldHash: string; label: string; plan: ReturnType<typeof planKeyFix>; optionIds: Record<string, string> }[] = [];
  const backup: unknown[] = [];

  for (const f of fixes) {
    const paper = requirePaper(f.paper);
    const label = `${f.paper} Q${f.number}`;
    const { data: rows, error } = await sb
      .from("questions")
      .select("id, text, content_hash, solution, options(id, label, text, is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", String(f.number));
    if (error) throw error;
    if (rows?.length !== 1) throw new Error(`${label}: expected 1 bank row, found ${rows?.length}`);
    const live = rows[0] as LiveRow & { id: string; solution: string; options: (LiveRow["options"][number] & { id: string })[] };
    const plan = planKeyFix(live, f, !!paper.answerKey);

    const d = load(dataPath(paper.id, "answers")).derivations.find((x: any) => x.number === f.number);
    const q = load(dataPath(paper.id, "questions")).find((x: any) => x.number === f.number);
    if (!d || !q) throw new Error(`${label}: missing from the data files`);
    if (d.answer.toUpperCase() !== plan.from) throw new Error(`${label}: data file keys ${d.answer}, bank keys ${plan.from}`);
    const value = q.options.find((o: any) => o.label === plan.flips[1].label)?.text;
    if (!value) throw new Error(`${label}: data file has no option ${plan.flips[1].label}`);
    Object.assign(d, { answer: plan.flips[1].label, value, reasoning: f.reasoning.trim(), corrected: { from: plan.from, why: f.why, on: today } });

    const { data: clash } = await sb.from("questions").select("id").eq("exam_id", EXAM_ID).eq("content_hash", plan.newHash).neq("id", live.id).maybeSingle();
    if (clash) throw new Error(`${label}: the new content_hash already belongs to ${clash.id}`);

    backup.push(live);
    writes.push({ id: live.id, oldHash: live.content_hash, label: `${label} (${live.id.slice(0, 8)})`, plan, optionIds: Object.fromEntries(live.options.map((o) => [o.label, o.id])) });
    console.log(`  ${label} (${live.id.slice(0, 8)}): ${plan.from} -> ${plan.flips[1].label}  ${f.why}`);
  }

  console.log(`\n${writes.length} key change(s)`);
  if (!apply) return console.log("dry run — add --apply to write");
  const bpath = join(process.cwd(), "generated-papers", `_keyfix-backup-${Date.now()}.json`);
  writeFileSync(bpath, JSON.stringify(backup, null, 2), "utf8");
  console.log(`backup: ${bpath}`);
  for (const { path, raw, data } of files.values()) writePreserving(path, raw, data);
  for (const w of writes) {
    const { data: moved, error } = await sb
      .from("questions")
      .update({ content_hash: w.plan.newHash, solution: w.plan.solution })
      .eq("id", w.id)
      .eq("content_hash", w.oldHash)
      .select("id");
    if (error) throw new Error(`${w.label}: ${error.message}`);
    if (moved?.length !== 1) throw new Error(`${w.label}: the row changed since it was read; nothing written for it`);
    for (const flip of w.plan.flips) {
      const { error: oe } = await sb.from("options").update({ is_correct: flip.is_correct }).eq("id", w.optionIds[flip.label]);
      if (oe) throw new Error(`${w.label} option ${flip.label}: ${oe.message}`);
    }
  }
  // Prove it landed: exactly one keyed option per row, and it is the new one.
  for (const w of writes) {
    const { data } = await sb.from("options").select("label").eq("question_id", w.id).eq("is_correct", true);
    if (data?.length !== 1 || data[0].label !== w.plan.flips[1].label) throw new Error(`${w.label}: options did not land (${JSON.stringify(data)})`);
  }
  console.log(`wrote ${files.size} data file(s) and ${writes.length} row(s); verified`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
