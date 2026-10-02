/**
 * Apply adjudicated CDS English key fixes found during the /notes pass — bank AND source together,
 * row id kept.
 *
 *   npx tsx scripts/cds/apply-notes-fixes.ts <spec.json>           # dry run
 *   npx tsx scripts/cds/apply-notes-fixes.ts <spec.json> --apply   # write
 *
 * spec: [{ "id": "<full uuid>", "paper": "2023-1", "q": 61, "from": "B", "to": "C",
 *          "reasoning": "<new solution reasoning>", "why": "<adjudication>",
 *          "options": { "A": "...", ... }   // OPTIONAL: printed option texts, ONLY when read off the page
 *       }]
 *
 * WHY NOT fix-keys.ts OR apply-key-fixes.ts. fix-keys.ts flips the key in the bank only, so the
 * source <paper>.questions.json still hashes to the OLD row and the next `resync.ts` would delete
 * the fixed row as stale. apply-key-fixes.ts edits the source only, so a re-commit mints a NEW row
 * (new uuid) and leaves concept tags and 20 mocks pointing at the old one. This does both, in place:
 *   - bank: options.is_correct (and printed option text when given), questions.solution
 *     ("Answer: X. reasoning", the lib.ts template) and content_hash re-stamped with the real
 *     contentHash helper over the corrected content;
 *   - source: the row's answer, reasoning and (when given) option texts;
 *   - question_reviews: one key_fixed row stamped with the NEW hash (run "notes:cds-english").
 * So `resync.ts <paper>` stays a no-op afterwards (run it dry to prove that).
 *
 * Guards, all before any write: the bank row must join to (paper, q) by source_file and
 * question_number; its current key must equal `from` (a row already at `to` with matching options is
 * a no-op); `to` must be a real option; given option texts must cover A-D. Mis-slot repairs (option
 * text moved between letters) must come from the printed page — see the defect class in README.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";
import { EXAM_ID, dataPath, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = { id: string; paper: string; q: number; from: string; to: string; reasoning: string; why: string; options?: Record<string, string> };
const RUN_LABEL = "notes:cds-english";

async function main() {
  const specPath = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!specPath || specPath.startsWith("--")) throw new Error("usage: apply-notes-fixes.ts <spec.json> [--apply]");
  const fixes: Fix[] = JSON.parse(readFileSync(specPath, "utf8"));
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  type Plan = { fix: Fix; text: string; opts: { label: string; text: string }[]; hash: string; solution: string };
  const plans: Plan[] = [];
  const files = new Map<string, { path: string; raw: string; list: any[] }>();
  for (const fix of fixes) {
    const paper = requirePaper(fix.paper);
    const { data: q, error } = await db.from("questions")
      .select("id, exam_id, text, content_hash, source_file, question_number, options(label, text, is_correct)")
      .eq("id", fix.id).single();
    if (error || !q) throw new Error(`${fix.id}: ${error?.message ?? "not found"}`);
    if (q.exam_id !== EXAM_ID || q.source_file !== paper.sourceFile || Number(q.question_number) !== fix.q) {
      throw new Error(`${fix.id}: does not join to ${fix.paper} Q${fix.q} (${q.source_file} Q${q.question_number})`);
    }
    const stored = ((q.options ?? []) as any[]).sort((a, b) => a.label.localeCompare(b.label));
    const current = stored.filter((o) => o.is_correct).map((o) => o.label);
    if (fix.options && Object.keys(fix.options).sort().join("") !== stored.map((o) => o.label).join("")) {
      throw new Error(`${fix.id}: given options must cover exactly ${stored.map((o) => o.label).join("")}`);
    }
    const opts = stored.map((o) => ({ label: o.label, text: fix.options?.[o.label] ?? o.text }));
    if (!opts.some((o) => o.label === fix.to)) throw new Error(`${fix.id}: no option ${fix.to}`);
    const optsSame = opts.every((o, i) => o.text === stored[i].text);
    if (current.length === 1 && current[0] === fix.to && optsSame) { console.log(`= ${fix.paper} Q${fix.q} already ${fix.to}`); continue; }
    if (current.length !== 1 || current[0] !== fix.from) throw new Error(`${fix.id}: expected key ${fix.from}, found [${current.join(",")}]`);
    if (!fix.reasoning?.trim() || !fix.why?.trim()) throw new Error(`${fix.id}: reasoning and why are required`);

    const hash = contentHash(q.text as string, opts.map((o) => o.text), fix.to);
    const solution = `Answer: ${fix.to}. ${fix.reasoning.trim()}`;
    plans.push({ fix, text: q.text as string, opts, hash, solution });

    const fp = dataPath(paper.id, "questions");
    if (!files.has(fp)) { const raw = readFileSync(fp, "utf8"); files.set(fp, { path: fp, raw, list: JSON.parse(raw) }); }
    const row = files.get(fp)!.list.find((x) => Number(x.number) === fix.q);
    if (!row) throw new Error(`${fix.paper} Q${fix.q}: not in ${fp}`);
    if (String(row.answer).toUpperCase() !== fix.from && String(row.answer).toUpperCase() !== fix.to) {
      throw new Error(`${fix.paper} Q${fix.q}: source answer is ${row.answer}, expected ${fix.from}`);
    }
    row.answer = fix.to;
    row.reasoning = fix.reasoning.trim();
    if (fix.options) for (const o of row.options) if (fix.options[o.label] !== undefined) o.text = fix.options[o.label];

    console.log(`${fix.paper} Q${fix.q} (${fix.id.slice(0, 8)})  ${fix.from} -> ${fix.to}${fix.options ? "  + printed option text" : ""}`);
    console.log(`  ${fix.why}`);
  }

  console.log(`\n${plans.length} fix(es) to apply`);
  if (!apply) return console.log("dry run — add --apply to write");

  const reviews: ReviewInput[] = [];
  for (const p of plans) {
    for (const o of p.opts) {
      const { error } = await db.from("options")
        .update({ is_correct: o.label === p.fix.to, text: o.text })
        .eq("question_id", p.fix.id).eq("label", o.label);
      if (error) throw new Error(`${p.fix.id} option ${o.label}: ${error.message}`);
    }
    const { error } = await db.from("questions").update({ content_hash: p.hash, solution: p.solution }).eq("id", p.fix.id);
    if (error) throw new Error(`${p.fix.id}: ${error.message}`);
    reviews.push({
      questionId: p.fix.id, reviewedContentHash: p.hash, method: "blind_rederivation", verdict: "key_fixed",
      runLabel: RUN_LABEL, derivedModel: "claude-opus-5", note: p.fix.why.slice(0, 480),
    });
  }
  for (const f of files.values()) {
    let out = JSON.stringify(f.list, null, 1);
    if (/\n$/.test(f.raw)) out += "\n";
    if (f.raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
    writeFileSync(f.path, out, "utf8");
  }
  console.log(formatRecordResult(await recordReviews(db, reviews)));
  console.log(`applied ${plans.length}; now run: npx tsx scripts/cds/resync.ts <paper> (dry) for each paper touched — it must report 0 stale rows`);
}

main().catch((e) => { console.error(e); process.exit(1); });
