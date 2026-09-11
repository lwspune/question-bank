/**
 * Drives the planner page's OWN loaders against the live database and prints
 * what it resolved.
 *
 * `/dashboard/planner/[plan]` is auth-gated and `force-dynamic`, so `next build`
 * never executes it and an anonymous curl is bounced by middleware before the
 * route even compiles. A green build therefore proves the page COMPILES and
 * nothing about whether its data resolves. This is what covers that gap.
 *
 * Run: npx tsx scripts/planner/smoke.ts [planKey]
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { chapterTotals, numberSessions, planTotals } from "../../src/lib/planner/plan";
import { loadPlanContext } from "../../src/lib/planner/query";
import { SESSION_PLANS, resolvePlan } from "../../src/lib/planner/registry";

config({ path: ".env.local", override: true });

async function main() {
  const key = process.argv[2] ?? SESSION_PLANS[0].key;
  const plan = resolvePlan(key);
  if (!plan) {
    console.error(`No plan "${key}". Known: ${SESSION_PLANS.map((p) => p.key).join(", ")}`);
    process.exit(1);
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const ctx = await loadPlanContext(db, plan);
  const totals = planTotals(plan);

  console.log(`\n${plan.label} — ${plan.source}\n${"=".repeat(60)}`);
  console.log(
    `chapters ${totals.chapters} | sessions ${totals.sessions} ` +
      `(${totals.core} book + ${totals.extra} added) | ` +
      `NDA ${totals.nda} | CBSE ${totals.cbse} | ${totals.extraPyq} PYQ at stake`,
  );
  console.log(`spine sections resolved: ${ctx.sections.size} | exams: ${ctx.exams.join(", ")}`);

  let unresolved = 0;
  let noPractice = 0;

  for (const chapter of plan.chapters) {
    const t = chapterTotals(chapter);
    const name =
      chapter.chapterNo === null
        ? (chapter.title ?? "?")
        : (ctx.chapterNames.get(chapter.chapterNo) ?? "!! CHAPTER NAME UNRESOLVED");
    const leaves = chapter.chapterNo === null ? 0 : (ctx.leafCount.get(chapter.chapterNo) ?? 0);
    const practice = ctx.practiceByChapter.get(chapter.bankChapterName ?? name);
    if (practice === undefined && chapter.chapterNo !== null) noPractice += 1;

    console.log(
      `\nCh.${chapter.chapterNo ?? "-"} ${name}` +
        `  [${t.sessions}h, ${leaves} sections, practice ${practice ?? "NONE"}]`,
    );

    for (const { number, session } of numberSessions(chapter)) {
      const refs = [...session.subtopics, ...session.concepts];
      const bad = refs.filter((r) => !ctx.sections.has(r));
      unresolved += bad.length;
      const label =
        session.extra?.title ??
        refs
          .map((r) => ctx.sections.get(r)?.title)
          .filter(Boolean)
          .join("; ") ??
        "";
      const tag = session.extra ? `[${session.extra.source}] ` : "";
      console.log(
        `   ${String(number).padStart(2)}. ${tag}${label.slice(0, 84)}` +
          (bad.length ? `  !! UNRESOLVED ${bad.join(",")}` : ""),
      );
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`unresolved refs: ${unresolved}`);
  console.log(`chapters with no practice count: ${noPractice}`);
  // A chapter whose name does not resolve renders as "Chapter N" with an empty
  // practice column — visible on the page but easy to read as "no questions
  // yet" rather than "the lookup missed".
  if (unresolved > 0 || noPractice > 0) {
    console.log("\nNOT CLEAN — see the !! markers above.");
    process.exit(1);
  }
  console.log("clean.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
