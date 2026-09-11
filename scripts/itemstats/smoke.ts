/**
 * Drive the /dashboard/item-stats page's OWN loader against live data.
 *
 *   npm run itemstats:smoke
 *
 * That page is auth-gated and `force-dynamic`, so `next build` never executes
 * it: a green build proves it COMPILES and nothing more. This runs the loader
 * the page actually calls, which is the half that can fail against real rows —
 * the `scripts/syllabus/smoke-page-data.ts` precedent.
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  // buildItemStatOverview, not the `server-only` admin wrapper — that guard
  // exists to keep the service-role client out of a bundle and cannot resolve
  // outside Next. The logic being client-injectable is what makes this probe
  // possible without weakening it.
  const { createClient } = await import("@supabase/supabase-js");
  const { buildItemStatOverview } = await import("@/lib/itemStats/overview");
  const { LEAD_RATIO_DEFAULT } = await import("@/lib/itemStats/leads");
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  for (const ratio of [LEAD_RATIO_DEFAULT, 0]) {
    const { coverage, leads, keyNeverChosen } = await buildItemStatOverview(db, ratio);
    console.log(`\n--- ratio >= ${ratio || "any"} ---`);
    console.log(
      `coverage: ${coverage.questionsWithData} questions | n>=10 ${coverage.atChipThreshold} | n>=20 ${coverage.atHeadlineThreshold} | ${coverage.totalAttempts} attempts over ${coverage.sittings} sittings`
    );
    for (const s of coverage.bySource) {
      console.log(`  ${s.source}: ${s.sittings} sittings, ${s.attempts} attempts`);
    }
    console.log(`leads shown: ${leads.length} (key never chosen: ${keyNeverChosen})`);

    const missing = leads.filter((l) => l.question === null).length;
    if (missing > 0) console.log(`  WARNING: ${missing} lead(s) resolve to no readable question`);

    for (const l of leads.slice(0, 5)) {
      // `reason`, not the null-ness of `ratio` — a verdict-mismatch row also has
      // no ratio, and labelling it KEY NEVER CHOSEN would be simply wrong.
      const r =
        l.lead.reason === "verdict-mismatch"
          ? `MARK!=KEY x${l.lead.verdictMismatch}`
          : l.lead.reason === "key-never-chosen"
            ? "KEY NEVER CHOSEN"
            : `${(l.lead.ratio as number).toFixed(1)}x`;
      console.log(
        `  ${r.padEnd(17)} n=${String(l.lead.attempted).padEnd(4)} ${l.pct}%  ${(l.question?.text ?? "").replace(/\s+/g, " ").slice(0, 56)}`
      );
    }
  }

  // --- the /browse CARD read path, which is a different module -------------
  const { getItemStatsForQuestions } = await import("@/lib/itemStats/query");
  const { itemStatChip } = await import("@/lib/itemStats/leads");

  const { data: sample } = await db
    .from("question_item_stats")
    .select("question_id")
    .gte("attempted", 10)
    .limit(25);
  const ids = (sample ?? []).map((r: { question_id: string }) => r.question_id);
  const map = await getItemStatsForQuestions(db, ids);
  const chips = ids.map((id) => itemStatChip(map.get(id) ?? null)).filter(Boolean);
  console.log(
    `
card path: ${ids.length} ids in -> ${map.size} aggregates -> ${chips.length} chips render`
  );
  if (ids.length > 0 && map.size === 0) {
    console.log("  WARNING: ids resolved to no aggregates — check the content-hash join");
  }
  // The empty-input case is a PostgREST 400 if unguarded, not an empty result.
  const empty = await getItemStatsForQuestions(db, []);
  console.log(`empty input: ${empty.size} aggregates, no throw`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
