/**
 * The repeat line (2026-11-12) against live data, read-only.
 *
 *   npm run repeat:smoke
 *
 * 1. EVERY group of every published homework plan through repeatLine(): each
 *    line that would show is checked for the ways a wording goes wrong (a
 *    count that is not the paper count, a year outside 2000 to next year,
 *    "undefined"/"NaN", a dash) and printed once per plan as a sample. A
 *    range-less line (a paper name with no year) is listed, not failed: it
 *    says less, never something wrong.
 * 2. THE LIVE READ: for each plan, real questions from its qualifying groups
 *    through loadRepeatLines with the ANON client the public pages use; each
 *    must come back with a line.
 *
 * Exits 1 on any wrong line or a question the read misses.
 */
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { repeatLine, pickRepeatGroup, type RepeatGroup, type RepeatLine } from "@/lib/questions/repeatLine";
import { loadRepeatLines } from "@/lib/questions/repeatQuery";

type GroupRow = { plan_id: string; n: number; tier: "repeat" | "type"; sittings: string[] };
type PlanRow = { id: string; slug: string };

const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
  auth: { persistSession: false },
});

const NEXT_YEAR = new Date().getFullYear() + 1;

function problems(line: RepeatLine, group: RepeatGroup): string[] {
  const out: string[] = [];
  const text = `${line.lead}${line.rest} ${line.linkText}`;
  if (/undefined|NaN|null/.test(text)) out.push("prints undefined/NaN/null");
  if (/[–—]| -- | - /.test(text)) out.push("has a dash");
  if (line.count !== group.sittings.length) out.push(`count ${line.count} vs ${group.sittings.length} papers`);
  if (!line.lead.includes(String(line.count)) || line.linkText !== `See all ${line.count}`) out.push("count not in lead/link");
  for (const y of text.match(/\b(19|20)\d{2}\b/g) ?? []) {
    const year = Number(y);
    if (year < 2000 || year > NEXT_YEAR) out.push(`year ${year}`);
  }
  if (line.kind === "type" && !line.lead.startsWith("Questions like this")) out.push("type not worded as 'questions like this'");
  if (!line.href.startsWith(`/homework/${group.planSlug}/group/${group.n}`)) out.push(`href ${line.href}`);
  return out;
}

async function main() {
  const plans = (await anon.from("homework_plans").select("id, slug").eq("published", true)).data as PlanRow[] | null;
  if (!plans?.length) throw new Error("no published plans readable by anon");
  const slugOf = new Map(plans.map((p) => [p.id, p.slug]));

  const groups = await readAllPages<GroupRow>((from, to) =>
    anon.from("homework_plan_groups").select("plan_id, n, tier, sittings").order("plan_id").order("n").range(from, to)
  );

  let wrong = 0;
  const noRange: string[] = [];
  const perPlan = new Map<string, { groups: number; repeats: number; types: number; sample: string | null; qualifying: number[] }>();
  for (const g of groups) {
    const slug = slugOf.get(g.plan_id);
    if (!slug) continue;
    const stat = perPlan.get(slug) ?? { groups: 0, repeats: 0, types: 0, sample: null, qualifying: [] };
    stat.groups++;
    const group: RepeatGroup = { tier: g.tier, sittings: g.sittings, n: g.n, planSlug: slug };
    const line = repeatLine([group]);
    if (line && pickRepeatGroup([group])) {
      if (line.kind === "repeat") stat.repeats++;
      else stat.types++;
      stat.qualifying.push(g.n);
      const bad = problems(line, group);
      if (bad.length) {
        wrong++;
        console.log(`  WRONG ${slug} #${g.n}: ${bad.join("; ")} :: ${line.lead}${line.rest}`);
      }
      if (line.rest === "") noRange.push(`${slug} #${g.n} (${g.sittings.slice(0, 2).join(", ")}...)`);
      if (!stat.sample || (line.kind === "repeat" && stat.sample.startsWith("Questions"))) stat.sample = `${line.lead}${line.rest}`;
    }
    perPlan.set(slug, stat);
  }

  console.log(`\n${groups.length} groups in ${perPlan.size} published plans\n`);
  for (const [slug, s] of [...perPlan].sort()) {
    console.log(`${slug.padEnd(28)} ${String(s.repeats).padStart(5)} repeats ${String(s.types).padStart(5)} types  | ${s.sample ?? "(none)"}`);
  }
  console.log(`\nRange left out (a paper name with no year): ${noRange.length}`);
  for (const r of noRange.slice(0, 10)) console.log(`  ${r}`);

  // 2. The live read, anon, a few questions per plan.
  let missed = 0;
  for (const [slug, s] of perPlan) {
    const planId = plans.find((p) => p.slug === slug)!.id;
    const ns = s.qualifying.slice(0, 5);
    if (ns.length === 0) continue;
    const { data, error } = await anon
      .from("homework_plan_group_questions")
      .select("question_id")
      .eq("plan_id", planId)
      .in("n", ns)
      .limit(10);
    if (error) throw new Error(error.message);
    const ids = [...new Set((data ?? []).map((r: { question_id: string }) => r.question_id))];
    const lines = await loadRepeatLines(anon, ids);
    const without = ids.filter((id) => !lines.has(id));
    if (without.length) {
      missed += without.length;
      console.log(`  MISSED ${slug}: ${without.length} of ${ids.length} questions came back with no line`);
    }
  }

  console.log(`\nWrong lines: ${wrong} · questions the live read missed: ${missed}`);
  if (wrong || missed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
