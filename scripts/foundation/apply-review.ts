/**
 * Apply the Physics review-pass verdicts in data/_review.json:
 *  - flips: move is_correct to the new option + recompute content_hash
 *    (collision-guarded, per-exam) directly on the live PRIVATE rows; sync the
 *    override JSON answer. (Direct DB edit — NOT a re-commit, which would orphan
 *    figure image_urls when a flipped row's hash changes.)
 *  - annotate every override reason: flips -> "FIXED", confirmed -> "CONFIRMED",
 *    flawed -> "FLAWED (keep PRIVATE)" — so no REVIEW flag remains and the
 *    flawed set is explicit for the PUBLIC-flip gate.
 *
 *   npx tsx scripts/foundation/apply-review.ts          # dry-run
 *   npx tsx scripts/foundation/apply-review.ts --apply  # write DB + JSON
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { EXAM_ID, DATA, requireWorksheet } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Flip = { id: string; q: number; from: string; to: string; why: string };
type Verdict = { id: string; q: number; why?: string; ans?: string; note?: string };

async function main() {
  const apply = process.argv.includes("--apply");
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  const reviewFile = fileArg ? fileArg.slice("--file=".length) : "_review.json";
  loadEnv();
  const review = JSON.parse(readFileSync(join(DATA, reviewFile), "utf8")) as {
    flips: Flip[];
    flawed: Verdict[];
    confirmed: Verdict[];
  };

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // ---- 1. DB flips ----
  console.log(`\n=== ${review.flips.length} answer flips ===`);
  for (const f of review.flips) {
    const ws = requireWorksheet(f.id);
    const { data: q, error } = await client
      .from("questions")
      .select("id, text, content_hash, options(id, label, text, is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ws.sourceFile)
      .eq("question_number", String(f.q))
      .maybeSingle();
    if (error) throw new Error(`${f.id} Q${f.q} lookup: ${error.message}`);
    if (!q) { console.log(`  ${f.id} Q${f.q}: NO ROW — skip`); continue; }
    const opts = (q.options as { id: string; label: string; text: string; is_correct: boolean }[]) ?? [];
    const cur = opts.find((o) => o.is_correct)?.label ?? "?";
    const target = opts.find((o) => o.label === f.to);
    if (!target) { console.log(`  ${f.id} Q${f.q}: option ${f.to} not found — skip`); continue; }
    const optTexts = opts.sort((a, b) => a.label.localeCompare(b.label)).map((o) => o.text);
    const newHash = contentHash(q.text as string, optTexts, f.to);
    // collision guard (per-exam): another question already on this hash?
    const { data: clash } = await client
      .from("questions").select("id").eq("exam_id", EXAM_ID).eq("content_hash", newHash).neq("id", q.id).maybeSingle();
    const clashNote = clash ? "  ** HASH COLLISION — leaving hash stale **" : "";
    console.log(`  ${f.id} Q${f.q}: ${cur} -> ${f.to}${clashNote}  (${f.why})`);
    if (!apply) continue;
    for (const o of opts) {
      const want = o.label === f.to;
      if (o.is_correct !== want) {
        const { error: e } = await client.from("options").update({ is_correct: want }).eq("id", o.id);
        if (e) throw new Error(`${f.id} Q${f.q} opt ${o.label}: ${e.message}`);
      }
    }
    if (!clash) {
      const { error: e } = await client.from("questions").update({ content_hash: newHash }).eq("id", q.id);
      if (e) throw new Error(`${f.id} Q${f.q} hash: ${e.message}`);
    }
  }

  // ---- 2. annotate override JSONs (group verdicts by worksheet) ----
  const byWs = new Map<string, { flips: Flip[]; flawed: Verdict[]; confirmed: Verdict[] }>();
  const ensure = (id: string) => byWs.get(id) ?? byWs.set(id, { flips: [], flawed: [], confirmed: [] }).get(id)!;
  for (const f of review.flips) ensure(f.id).flips.push(f);
  for (const v of review.flawed) ensure(v.id).flawed.push(v);
  for (const v of review.confirmed) ensure(v.id).confirmed.push(v);

  console.log(`\n=== annotate override reasons across ${byWs.size} worksheets ===`);
  for (const [id, v] of byWs) {
    const p = join(DATA, `${id}.overrides.json`);
    const o = JSON.parse(readFileSync(p, "utf8")) as Record<string, { answer: string; reason: string }>;
    let changed = 0;
    for (const f of v.flips) {
      const k = String(f.q);
      if (o[k]) { o[k] = { answer: f.to, reason: `FIXED (was ${f.from}): ${f.why}` }; changed++; }
    }
    for (const c of v.confirmed) {
      const k = String(c.q);
      if (o[k]) { o[k].reason = `CONFIRMED${c.note ? ` (${c.note})` : ""}: ` + o[k].reason.replace(/REVIEW:?\s*/i, ""); changed++; }
    }
    for (const fl of v.flawed) {
      const k = String(fl.q);
      if (o[k]) { o[k].reason = `FLAWED (keep PRIVATE): ${fl.why}`; changed++; }
    }
    console.log(`  ${id}: ${changed} reasons annotated`);
    if (apply) writeFileSync(p, JSON.stringify(o, null, 2) + "\n", "utf8");
  }

  console.log(apply ? "\nAPPLIED." : "\n[dry-run] pass --apply to write DB + JSON.");
}

main().catch((e) => { console.error(e); process.exit(1); });
