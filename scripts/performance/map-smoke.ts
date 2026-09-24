/**
 * Drive /me/map's OWN data chain against live data.
 *
 * `/me/map` is auth-gated `ƒ`, so `next build` never renders it, and its tiles
 * are behind a tap. The unit tests prove the banding and the ordering; this
 * proves that real students produce real maps: the heaviest few payloads go
 * through the SAME buildPerformance → buildLaneNav → buildMasteryMap the page
 * runs, and the result is checked for the two properties worth failing on —
 * every tile has at least one dot, and the totals add up to the dot count.
 *
 * Reads with the SERVICE ROLE where the page uses the student's own JWT, so
 * the RLS path is not proven here; it renders nothing, so layout is a browser
 * check. Read-only. `npm run map:smoke [n]`.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentPerformance } from "@/lib/performance/query";
import { buildPerformance } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { buildMasteryMap, BAND_ORDER } from "@/lib/performance/masteryMap";

const LIMIT = Number(process.argv[2] ?? 3);

async function main() {
  const db = createSupabaseAdminClient();

  // Heaviest students by graded attempts — the biggest maps.
  const { data, error } = await db
    .from("mock_attempts")
    .select("user_id")
    .not("submitted_at", "is", null)
    .range(0, 999);
  if (error) throw new Error(error.message);
  const counts = new Map<string, number>();
  for (const r of (data ?? []) as { user_id: string }[]) counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  const users = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, LIMIT);

  for (const [userId, attempts] of users) {
    const payload = await fetchStudentPerformance(db, userId);
    const perf = buildPerformance(payload, new Date());
    const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, {});
    if (!nav.selected) {
      console.log(`- ${userId.slice(0, 8)}  attempts=${attempts}  no lane`);
      continue;
    }
    const map = buildMasteryMap(nav.selected);
    const dots = map.tiles.reduce((n, t) => n + t.dots.length, 0);
    const sum = BAND_ORDER.reduce((n, b) => n + map.totals[b], 0);
    console.log(
      `- ${userId.slice(0, 8)}  attempts=${attempts}  ${map.exam} · ${map.subject}  tiles=${map.tiles.length} dots=${dots}  ` +
        BAND_ORDER.map((b) => `${b}=${map.totals[b]}`).join(" ")
    );
    for (const t of map.tiles.slice(0, 4)) {
      console.log(`     ${t.chapter}: ${t.label}  (${t.dots.map((d) => d.band[0]).join("")})`);
    }
    if (map.tiles.some((t) => t.dots.length === 0)) {
      console.error("  !! a tile with no dots");
      process.exitCode = 1;
    }
    if (sum !== dots || sum !== map.subtopics) {
      console.error(`  !! totals ${sum} != dots ${dots} != subtopics ${map.subtopics}`);
      process.exitCode = 1;
    }
  }
  console.log("\nNot proven here: RLS (this reads service-role), layout, and the tap-to-expand.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
