/**
 * Drive /me/map's OWN data chain against live data.
 *
 * `/me/map` is auth-gated `ƒ`, so `next build` never renders it, and its tiles
 * are behind a tap. The unit tests prove the banding and the ordering; this
 * proves that real students produce real maps: payloads go through the SAME
 * buildPerformance → withPractice → buildLaneNav → buildMasteryMap the page
 * runs, and the result is checked for the properties worth failing on —
 * every tile has at least one dot, the totals add up to the dot count, a
 * lane's judged total is its chapters' sum, and no tile claims more practice
 * answers than it has answers.
 *
 * Two groups (2026-11-06, migration 0221): the heaviest mock-takers, and the
 * busiest students who have ONLY practised, the ones the map was empty for.
 *
 * Reads with the SERVICE ROLE where the page uses the student's own JWT, so
 * the RLS path is not proven here (tests/own-practice-evidence.integration
 * proves the student's own read); it renders nothing, so layout is a browser
 * check. Read-only. `npm run map:smoke [n]`.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentPerformance } from "@/lib/performance/query";
import { fetchStudentPracticeEvidence } from "@/lib/performance/practiceQuery";
import { buildPerformance } from "@/lib/performance/compute";
import { latestEvidenceExam, withPractice } from "@/lib/performance/practice";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { buildMasteryMap, BAND_ORDER } from "@/lib/performance/masteryMap";

const LIMIT = Number(process.argv[2] ?? 3);

function topByCount(ids: string[], n: number): [string, number][] {
  const counts = new Map<string, number>();
  for (const id of ids) counts.set(id, (counts.get(id) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

/** Students among `ids` who have sat any mock. `.in()` chunked: the list rides in the URL. */
async function mockTakers(db: SupabaseClient, ids: string[]): Promise<Set<string>> {
  const out = new Set<string>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("mock_attempts").select("user_id").in("user_id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const r of (data ?? []) as { user_id: string }[]) out.add(r.user_id);
  }
  return out;
}

async function check(db: SupabaseClient, userId: string, label: string) {
  const now = new Date();
  const [payload, practice] = await Promise.all([
    fetchStudentPerformance(db, userId),
    fetchStudentPracticeEvidence(db, userId),
  ]);
  const perf = withPractice(payload, buildPerformance(payload, now), practice, now);
  const nav = buildLaneNav(perf.lanes, latestEvidenceExam(perf, practice), {});
  if (!nav.selected) {
    console.log(`- ${userId.slice(0, 8)}  ${label}  practice=${practice.rows.length}  no lane`);
    return;
  }
  const map = buildMasteryMap(nav.selected);
  const dots = map.tiles.reduce((n, t) => n + t.dots.length, 0);
  const sum = BAND_ORDER.reduce((n, b) => n + map.totals[b], 0);
  const fromPractice = map.tiles.reduce((n, t) => n + t.fromPractice, 0);
  const fromPapers = map.tiles.reduce((n, t) => n + t.fromPapers, 0);
  console.log(
    `- ${userId.slice(0, 8)}  ${label}  practice=${practice.rows.length}  ${map.exam} · ${map.subject}  ` +
      `tiles=${map.tiles.length} dots=${dots}  papers=${fromPapers} practice=${fromPractice}  ` +
      BAND_ORDER.map((b) => `${b}=${map.totals[b]}`).join(" ")
  );
  for (const t of map.tiles.slice(0, 3)) {
    console.log(`     ${t.chapter}: ${t.label}  (${t.dots.map((d) => d.band[0]).join("")})`);
  }
  const fail = (msg: string) => {
    console.error(`  !! ${msg}`);
    process.exitCode = 1;
  };
  if (map.tiles.some((t) => t.dots.length === 0)) fail("a tile with no dots");
  if (sum !== dots || sum !== map.subtopics) fail(`totals ${sum} != dots ${dots} != subtopics ${map.subtopics}`);
  for (const lane of perf.lanes) {
    const chapters = lane.chapters.reduce((n, c) => n + c.correct + c.wrong, 0);
    if (chapters !== lane.judged) fail(`${lane.exam}/${lane.subject}: judged ${lane.judged} != chapters ${chapters}`);
    for (const c of lane.chapters) {
      if ((c.practiceJudged ?? 0) > c.judged) fail(`${c.chapter}: practice ${c.practiceJudged} > judged ${c.judged}`);
    }
  }
}

async function main() {
  const db = createSupabaseAdminClient();

  // Heaviest students by graded attempts — the biggest mock maps.
  const { data: attempts, error } = await db
    .from("mock_attempts")
    .select("user_id")
    .not("submitted_at", "is", null)
    .range(0, 999);
  if (error) throw new Error(error.message);
  console.log("Heaviest mock-takers:");
  for (const [userId, n] of topByCount(((attempts ?? []) as { user_id: string }[]).map((r) => r.user_id), LIMIT)) {
    await check(db, userId, `attempts=${n}`);
  }

  // Busiest recent practisers who have never sat a mock: the map was empty for them.
  const { data: answers, error: aErr } = await db
    .from("user_activity")
    .select("user_id")
    .eq("kind", "question_practiced")
    .not("metadata->correct", "is", null)
    .order("created_at", { ascending: false })
    .range(0, 999);
  if (aErr) throw new Error(aErr.message);
  const candidates = topByCount(((answers ?? []) as { user_id: string }[]).map((r) => r.user_id), 50);
  const sat = await mockTakers(db, candidates.map(([id]) => id));
  const practiceOnly = candidates.filter(([id]) => !sat.has(id)).slice(0, LIMIT);
  console.log("\nBusiest practice-only students (recent 1,000 answers):");
  for (const [userId, n] of practiceOnly) await check(db, userId, `recentAnswers=${n}`);

  console.log("\nNot proven here: RLS (this reads service-role), layout, and the tap-to-expand.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
