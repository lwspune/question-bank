/**
 * Hand rewrites for the runner-up mentions `stripRunnerUp` reports but never
 * removes, because they are woven into working (2026-11-19). Each entry replaces
 * an exact phrase; an empty `to` deletes the sentence and one adjacent space.
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/apply-runner-up-rewrites.ts [--apply]
 *
 * Fixes the answers JSON (source of record) and the bank together. Refuses an
 * entry that matches no text, and skips any answer whose letter UPSC's key
 * corrected: there the runner-up IS the official answer (see
 * restore-corrected-runner-up.ts).
 */
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const APPLY = process.argv.includes("--apply");
const EXAMS = ["UPSC CSE (Prelims)", "UPSC CAPF (AC)"];
type Rewrite = { from: string; to: string };
const REWRITES: Rewrite[] = JSON.parse(
  readFileSync(join("scripts", "reviews", "data", "2026-11-19-runner-up-rewrites.json"), "utf8")
);
const CORRECTED = /corrected to \(?[A-D]/;

export function rewrite(text: string, r: Rewrite): string {
  if (r.to) return text.replace(r.from, r.to);
  if (text.includes(` ${r.from}`)) return text.replace(` ${r.from}`, "");
  if (text.includes(`${r.from} `)) return text.replace(`${r.from} `, "");
  return text.replace(r.from, "");
}

async function main() {
  const hits = new Map<string, number>(REWRITES.map((r) => [r.from, 0]));
  const skipped = new Set<string>();

  for (const lane of ["upsc", "capf"]) {
    const dir = join("scripts", lane, "data");
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".answers.json"))) {
      const path = join(dir, f);
      const raw = readFileSync(path, "utf8");
      const doc = JSON.parse(raw);
      let changed = false;
      for (const a of doc.answers) {
        if (CORRECTED.test(a.reasoning)) {
          for (const r of REWRITES) if (a.reasoning.includes(r.from)) skipped.add(r.from);
          continue;
        }
        for (const r of REWRITES) {
          if (!a.reasoning.includes(r.from)) continue;
          a.reasoning = rewrite(a.reasoning, r);
          hits.set(r.from, hits.get(r.from)! + 1);
          changed = true;
        }
      }
      if (changed && APPLY) writeFileSync(path, JSON.stringify(doc, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
    }
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exams, error: e1 } = await db.from("exams").select("id").in("name", EXAMS);
  if (e1 || exams?.length !== EXAMS.length) throw new Error(`exam lookup failed: ${e1?.message}`);
  let rows = 0;
  for (const r of REWRITES) {
    const { data, error } = await db
      .from("questions")
      .select("id, solution")
      .in("exam_id", exams.map((e) => e.id))
      .like("solution", `%${r.from.replace(/[%_\\]/g, (c) => `\\${c}`)}%`);
    if (error) throw new Error(error.message);
    for (const q of data) {
      const old = q.solution as string;
      if (CORRECTED.test(old)) continue;
      const next = rewrite(old, r);
      rows++;
      console.log(`${q.id}: ${r.to ? "rewrite" : "delete"} "${r.from.slice(0, 60)}..."`);
      if (!APPLY) continue;
      const { error: ue, count } = await db
        .from("questions")
        .update({ solution: next }, { count: "exact" })
        .eq("id", q.id)
        .eq("solution", old);
      if (ue || count !== 1) throw new Error(`${q.id}: ${ue?.message ?? `count ${count}`}`);
    }
  }

  const missing = [...hits].filter(([from, n]) => n === 0 && !skipped.has(from)).map(([from]) => from);
  if (missing.length) throw new Error(`no JSON answer matched:\n${missing.join("\n")}`);
  console.log(
    `${APPLY ? "APPLIED" : "DRY RUN"}: ${[...hits.values()].reduce((a, b) => a + b, 0)} JSON edits, ${rows} bank rows; ` +
      `${skipped.size} left alone on key-corrected answers`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
