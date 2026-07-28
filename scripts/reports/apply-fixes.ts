/**
 * Apply source-verified corrections raised by /dashboard/reports.
 *
 * Every edit in the manifest must cite the source it was verified against in
 * `reason` — the printed paper is the ground truth, never a derivation alone.
 *
 * Idempotent: a fix whose values already match the live row is reported as a
 * no-op and skipped, so re-running is safe.
 *
 *   npx tsx scripts/reports/apply-fixes.ts <fixes.json>           # dry-run
 *   npx tsx scripts/reports/apply-fixes.ts <fixes.json> --apply   # write
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { planFix, type Fix, type QuestionState } from "./fixes";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const path = process.argv[2];
  if (!path || path.startsWith("--")) {
    throw new Error("usage: apply-fixes.ts <fixes.json> [--apply]");
  }
  const apply = process.argv.includes("--apply");
  const fixes: Fix[] = JSON.parse(readFileSync(path, "utf8"));

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let applied = 0;
  let noop = 0;
  const problems: string[] = [];

  for (const fix of fixes) {
    const { data: q, error } = await db
      .from("questions")
      .select("id, text, context, solution, org_id, exam_id, content_hash, options(id, label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) {
      problems.push(`${fix.label}: NOT FOUND`);
      continue;
    }

    const opts = ((q.options ?? []) as { id: string; label: string; text: string; is_correct: boolean }[])
      .slice()
      .sort((a, b) => a.label.localeCompare(b.label));
    const state: QuestionState = {
      text: q.text as string,
      context: (q.context as string | null) ?? null,
      solution: (q.solution as string | null) ?? null,
      options: opts.map(({ label, text, is_correct }) => ({ label, text, is_correct })),
    };

    const plan = planFix(state, fix);
    if (plan.problems.length) {
      problems.push(`${fix.label}: ${plan.problems.join("; ")}`);
      console.log(`[${fix.label}] ⚠ ${plan.problems.join("; ")}`);
      continue;
    }
    if (plan.isNoop) {
      console.log(`[${fix.label}] no-op (already correct)`);
      noop++;
      continue;
    }

    let newHash: string | null = null;
    let collides = false;
    if (plan.needsRehash) {
      newHash = contentHash(
        plan.finalText,
        plan.finalOptions.map((o) => o.text),
        plan.finalCorrect ?? ""
      );
      const { data: clash, error: cErr } = await db
        .from("questions")
        .select("id")
        .eq("org_id", q.org_id)
        .eq("exam_id", q.exam_id)
        .eq("content_hash", newHash)
        .neq("id", q.id);
      if (cErr) throw cErr;
      collides = (clash ?? []).length > 0;
      if (collides) problems.push(`${fix.label}: hash collision — content_hash left unchanged`);
    }

    console.log(
      `[${fix.label}] ${plan.changed.join(", ")}` +
        `${plan.needsRehash ? (collides ? "  ⚠HASH_COLLISION" : "  rehash") : "  (hash-neutral)"}` +
        `  — ${fix.reason}`
    );

    if (!apply) {
      applied++;
      continue;
    }

    for (const o of plan.finalOptions) {
      const before = opts.find((p) => p.label === o.label)!;
      if (before.text !== o.text || before.is_correct !== o.is_correct) {
        const { error: e } = await db
          .from("options")
          .update({ text: o.text, is_correct: o.is_correct })
          .eq("id", before.id);
        if (e) throw e;
      }
    }

    const upd: Record<string, unknown> = {};
    if (plan.finalText !== state.text) upd.text = plan.finalText;
    if (plan.finalContext !== state.context) upd.context = plan.finalContext;
    if (plan.finalSolution !== state.solution) upd.solution = plan.finalSolution;
    if (newHash && !collides) upd.content_hash = newHash;
    if (Object.keys(upd).length) {
      const { error: e } = await db.from("questions").update(upd).eq("id", q.id);
      if (e) throw e;
    }
    applied++;
  }

  console.log(
    `\n${apply ? "APPLIED" : "dry-run OK for"} ${applied}/${fixes.length} fixes` +
      (noop ? `  (${noop} already correct)` : "")
  );
  if (problems.length) {
    console.log("PROBLEMS:");
    problems.forEach((p) => console.log("  - " + p));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
