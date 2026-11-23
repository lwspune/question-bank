/**
 * Undo the runner-up strip on CSE answers whose letter came from UPSC's key over
 * the blind derivation ("[Answer corrected to X from the official UPSC answer key
 * ...]"). On those rows the working argues for the derived letter and the
 * "runner-up" aside was the ONLY argument for the official answer, so removing it
 * left a solution that argues only for a wrong option (2026-11-19).
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/restore-corrected-runner-up.ts [--apply]
 *
 * Restores `reasoning` from git HEAD in the answers JSON and `solution` in the bank,
 * the latter guarded on the stripped text, so only rows this branch changed move.
 */
import { createClient } from "@supabase/supabase-js";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const APPLY = process.argv.includes("--apply");
const BASE = process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "HEAD";

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let found = 0;
  let restored = 0;
  for (const lane of ["upsc", "capf"]) {
    const dir = join("scripts", lane, "data");
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".answers.json"))) {
      const path = join(dir, f);
      const raw = readFileSync(path, "utf8");
      const now = JSON.parse(raw);
      const head = JSON.parse(execFileSync("git", ["show", `${BASE}:${path.replace(/\\/g, "/")}`], { encoding: "utf8" }));
      const before = new Map<number, string>(head.answers.map((a: { number: number; reasoning: string }) => [a.number, a.reasoning]));
      let changed = false;
      for (const a of now.answers) {
        const old = before.get(a.number)!;
        if (old === a.reasoning || !/corrected to \(?[A-D]/.test(old)) continue;
        found++;
        const { data, error } = await db.from("questions").select("id").eq("solution", a.reasoning);
        if (error) throw new Error(error.message);
        if (data.length !== 1) throw new Error(`${f} Q${a.number}: ${data.length} bank rows hold the stripped text`);
        console.log(`${f} Q${a.number} -> ${data[0].id}`);
        if (APPLY) {
          const { error: ue, count } = await db
            .from("questions")
            .update({ solution: old }, { count: "exact" })
            .eq("id", data[0].id)
            .eq("solution", a.reasoning);
          if (ue || count !== 1) throw new Error(`${data[0].id}: ${ue?.message ?? `count ${count}`}`);
          restored++;
        }
        a.reasoning = old;
        changed = true;
      }
      if (changed && APPLY) writeFileSync(path, JSON.stringify(now, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
    }
  }
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: ${found} key-corrected answers${APPLY ? `, ${restored} restored` : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
