/**
 * Drive /dashboard/play's OWN loader + the pure core against live data.
 *
 *   npm run play:smoke
 *
 * The page is superadmin-gated and dynamic, so `next build` never renders it.
 * This runs the loader the page calls and THROWS on a contradiction a
 * type-check cannot see (a subset larger than its superset). Read-only. It
 * does NOT prove the page lays out: that is owed to a browser.
 */
import { join } from "node:path";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`INVARIANT VIOLATED: ${msg}`);
}

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { loadPlayStats } = await import("@/lib/play/adminQuery");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const s = await loadPlayStats(db as Parameters<typeof loadPlayStats>[0]);

  console.log(
    `players ${s.summary.players} · rounds ${s.summary.rounds} · today ${s.summary.roundsToday} · 2+ days ${s.summary.cameBack} · last ${s.summary.lastRoundAt ?? "none"}`
  );
  for (const g of s.games) console.log(`  ${g.label}: ${g.rounds} rounds, ${g.players} players`);
  for (const l of s.levels.filter((x) => x.rounds > 0)) {
    console.log(
      `  L${l.id}: ${l.rounds} rounds, ${l.players} players, cleared ${l.cleared}, first try ${l.firstTryCleared}/${l.firstTries}, median right ${l.medianCorrect} vs ${l.target}${l.hint ? `, ${l.hint}` : ""}`
    );
  }
  for (const p of s.players) {
    console.log(`  ${p.name}: ${p.rounds} rounds, ${p.days} days, top L${p.topLevel ?? "-"}, study ${p.studyBefore}/${p.studyAfter}`);
  }
  const e = s.experiment;
  console.log(`experiment: compared ${e.compared}, median ${e.medianBefore} -> ${e.medianAfter}, more ${e.studiedMore}, less ${e.studiedLess}`);

  // --- invariants ------------------------------------------------------------
  assert(s.players.reduce((n, p) => n + p.rounds, 0) === s.summary.rounds, "player rounds must add up to all rounds");
  assert(s.games.reduce((n, g) => n + g.rounds, 0) === s.summary.rounds, "game rounds must add up to all rounds");
  const mathsRounds = s.games.find((g) => g.game === "maths")?.rounds ?? 0;
  assert(s.levels.reduce((n, l) => n + l.rounds, 0) <= mathsRounds, "level rounds cannot exceed maths rounds");
  for (const l of s.levels) {
    assert(l.cleared <= l.rounds, `L${l.id}: cleared > rounds`);
    assert(l.firstTries === l.players, `L${l.id}: one first try per player`);
    assert(l.firstTryCleared <= l.firstTries, `L${l.id}: first-try cleared > first tries`);
  }
  assert(s.summary.cameBack <= s.summary.players, "came back > players");
  assert(s.summary.playersToday <= s.summary.players, "players today > players");
  assert(e.studiedMore + e.studiedLess <= e.compared, "more + less > compared");
  assert(s.recent.length <= Math.min(50, s.summary.rounds), "recent longer than rounds");
  const unnamed = s.players.filter((p) => p.name.startsWith("Student ")).length;
  if (unnamed) console.warn(`WARN: ${unnamed} player(s) have no account to name them (deleted?)`);
  console.log("OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
