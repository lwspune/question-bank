/**
 * Practice questions fixed in place, 2026-11-16 (solutions backfill second
 * pass, b46). Owner rule for practice questions: fix the clear ones, list the
 * rest. The fixes are DATA: scripts/reviews/data/practice-key-fixes-2026-11-16.json
 * (why, key from/to, text edits, worked solution per row).
 *
 *   npx tsx <this file>            # dry run, from the main checkout (reads .env.local and the b46 drafts there)
 *   npx tsx <this file> --apply    # writes; saves every touched row first
 *
 * SAFETY, per row, before anything is written:
 *   - question_kind is 'practice' (a past-paper key is never changed here)
 *   - the live key equals keyFrom and the stored content_hash reproduces with contentHash()
 *   - every stem find/replace matches exactly once; option edits name existing labels
 *   - the new hash belongs to no other row
 *   - the solution is still empty, passes solutionProblems() and its last line names (keyTo)
 * The write is conditional on the old content_hash, and the row is selected back:
 * only a returned row counts as written. Rows that fail any check are listed, not written.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { solutionProblems } from "../lib/solutionText";

type Fix = {
  id: string;
  keyFrom: string;
  keyTo: string;
  stem?: [string, string][];
  stemRegex?: [string, string][];
  options?: Record<string, string>;
  optionReplace?: Record<string, [string, string][]>;
  solution: string | null;
  why: string;
  staleHash?: boolean;
};
type Row = {
  id: string; text: string; content_hash: string; question_kind: string; question_format: string;
  solution: string | null; visibility: string;
  options: { id: string; label: string; text: string; is_correct: boolean }[];
};

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
const APPLY = process.argv.includes("--apply");
const DATA = join(__dirname, "data", "practice-key-fixes-2026-11-16.json");
const DRAFTS = join(process.cwd(), "generated-papers", "solutions", "b46-retry-practice");

function loadDrafts(): Record<string, { solution?: string; solvedAnswer?: string }> {
  const out: Record<string, { solution?: string; solvedAnswer?: string }> = {};
  for (const f of readdirSync(DRAFTS).filter((x) => /^drafts-\d+\.json$/.test(x))) {
    Object.assign(out, JSON.parse(readFileSync(join(DRAFTS, f), "utf8")));
  }
  return out;
}

function count(hay: string, needle: string): number {
  return hay.split(needle).length - 1;
}

async function main() {
  const { fixes } = JSON.parse(readFileSync(DATA, "utf8")) as { fixes: Fix[] };
  const drafts = loadDrafts();
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const plan: { fix: Fix; row: Row; text: string; opts: { id: string; label: string; text: string; is_correct: boolean }[]; hash: string; solution: string | null }[] = [];
  const refused: string[] = [];
  for (const fix of fixes) {
    const refuse = (why: string) => refused.push(`${fix.id.slice(0, 8)}: ${why}`);
    const { data, error } = await db
      .from("questions")
      .select("id, text, content_hash, question_kind, question_format, solution, visibility, options(id, label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    const row = data as Row | null;
    if (!row) { refuse("row not found"); continue; }
    if (row.question_kind !== "practice") { refuse(`question_kind is ${row.question_kind}`); continue; }
    if (row.question_format !== "mcq") { refuse(`format ${row.question_format}`); continue; }
    if ((row.solution ?? "").trim()) { refuse("already has a solution"); continue; }
    const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
    const key = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (key.length !== 1 || key[0] !== fix.keyFrom) { refuse(`live key [${key}] is not ${fix.keyFrom}`); continue; }
    // A row whose text was edited after commit carries a STALE hash: it reproduces from
    // nothing, so it guards nothing. Such a row is named in the data (staleHash) and its
    // hash is recomputed from the corrected content; any other mismatch refuses.
    if (contentHash(row.text, opts.map((o) => o.text), fix.keyFrom) !== row.content_hash && !fix.staleHash) {
      refuse("stored hash does not reproduce");
      continue;
    }

    let text = row.text;
    let bad = false;
    for (const [from, to] of fix.stem ?? []) {
      if (count(text, from) !== 1) { refuse(`stem find matches ${count(text, from)}x: ${from}`); bad = true; break; }
      text = text.replace(from, to);
    }
    for (const [re, to] of fix.stemRegex ?? []) {
      const r = new RegExp(re);
      if (!r.test(text)) { refuse(`stem regex no match: ${re}`); bad = true; break; }
      text = text.replace(r, to).trim();
    }
    const newOpts = opts.map((o) => ({ ...o }));
    for (const [label, t] of Object.entries(fix.options ?? {})) {
      const o = newOpts.find((x) => x.label === label);
      if (!o) { refuse(`no option ${label}`); bad = true; break; }
      o.text = t;
    }
    for (const [label, pairs] of Object.entries(fix.optionReplace ?? {})) {
      const o = newOpts.find((x) => x.label === label);
      if (!o) { refuse(`no option ${label}`); bad = true; break; }
      for (const [from, to] of pairs) {
        if (count(o.text, from) !== 1) { refuse(`option ${label} find matches ${count(o.text, from)}x: ${from}`); bad = true; break; }
        o.text = o.text.replace(from, to);
      }
    }
    if (bad) continue;
    for (const o of newOpts) o.is_correct = o.label === fix.keyTo;
    if (new Set(newOpts.map((o) => o.text.trim())).size !== newOpts.length) { refuse("options not distinct after the edit"); continue; }

    let solution = fix.solution;
    if (solution === null) {
      // A text repair whose key is left for the owner: no solution is written.
      const hash = contentHash(text, newOpts.map((o) => o.text), fix.keyTo);
      plan.push({ fix, row, text, opts: newOpts, hash, solution: null });
      continue;
    }
    if (solution === "@draft") {
      const d = drafts[fix.id];
      if (!d?.solution) { refuse("no draft solution"); continue; }
      if ((d.solvedAnswer ?? "").trim().toUpperCase() !== fix.keyTo) { refuse(`draft reached ${d.solvedAnswer}, not ${fix.keyTo}`); continue; }
      solution = d.solution;
    }
    const problems = solutionProblems(solution);
    if (problems.length) { refuse(`solution: ${problems.join("; ")}`); continue; }
    const last = solution.trim().split("\n").pop() ?? "";
    if (!last.includes(`(${fix.keyTo})`)) { refuse(`solution's last line does not name (${fix.keyTo})`); continue; }

    const hash = contentHash(text, newOpts.map((o) => o.text), fix.keyTo);
    if (hash !== row.content_hash) {
      const { data: clash } = await db.from("questions").select("id").eq("content_hash", hash).neq("id", row.id);
      if ((clash ?? []).length) { refuse("new hash belongs to another row"); continue; }
    }
    plan.push({ fix, row, text, opts: newOpts, hash, solution });
  }

  const flips = plan.filter((p) => p.fix.keyFrom !== p.fix.keyTo).length;
  const edits = plan.filter((p) => p.text !== p.row.text || p.opts.some((o, i) => o.text !== [...p.row.options].sort((a, b) => a.label.localeCompare(b.label))[i].text)).length;
  console.log(`fixes ${fixes.length} · ready ${plan.length} (key flips ${flips}, text edits ${edits}) · refused ${refused.length}`);
  for (const r of refused) console.log(`  REFUSED ${r}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  const outDir = join(process.cwd(), "generated-papers", "solutions", "b48-practice-fixes");
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  writeFileSync(join(outDir, `before-${stamp}.json`), JSON.stringify(plan.map((p) => p.row), null, 2));

  let written = 0;
  for (const p of plan) {
    const before = [...p.row.options].sort((a, b) => a.label.localeCompare(b.label));
    for (const o of p.opts) {
      const b = before.find((x) => x.id === o.id)!;
      if (b.text === o.text && b.is_correct === o.is_correct) continue;
      const { error } = await db.from("options").update({ text: o.text, is_correct: o.is_correct }).eq("id", o.id);
      if (error) throw error;
    }
    const { data, error } = await db
      .from("questions")
      .update(p.solution === null ? { text: p.text, content_hash: p.hash } : { text: p.text, content_hash: p.hash, solution: p.solution })
      .eq("id", p.row.id)
      .eq("content_hash", p.row.content_hash)
      .select("id");
    if (error) throw error;
    if (data?.length) written++;
    else console.log(`  NOT WRITTEN ${p.row.id}: hash changed under us (options may already be updated; restore from the before file)`);
  }
  console.log(`written ${written} of ${plan.length}; before-rows saved to ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
