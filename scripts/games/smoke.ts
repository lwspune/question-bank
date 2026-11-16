/**
 * npm run games:smoke [-- --target=test]
 *
 * Drives /dashboard/games' own read (fetchGames) and arrangement
 * (lib/games/view) over the stored rows. The page is superadmin-gated and
 * dynamic, so the build never renders it; this proves the data chain, not the
 * layout. Read-only. Exits 1 if a check fails. Prints counts only, never the
 * content (the catalogue stays out of logs as well as out of the repo).
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../src/types/db";
import { fetchGames } from "../../src/lib/games/query";
import { buildMatrix, gateCounts } from "../../src/lib/games/view";

const target = process.argv.find((a) => a.startsWith("--target="))?.split("=")[1] ?? "prod";
config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!url || !key) throw new Error(`missing Supabase URL or service-role key for ${target}`);
  const { games, notes } = await fetchGames(createClient<Database>(url, key, { auth: { persistSession: false } }));
  const failures: string[] = [];

  const matrix = buildMatrix(games);
  const placed = matrix.rows.reduce((n, r) => n + matrix.goals.reduce((m, g) => m + r.cells[g].length, 0), 0);
  const fits = games.reduce((n, g) => n + g.fits.length, 0);
  if (placed !== fits) failures.push(`matrix placed ${placed} of ${fits} fits`);
  const unmapped = games.filter((g) => g.fits.length === 0).length;
  const counts = gateCounts(games);
  if (counts.passes + counts.caution + counts.fails !== games.length) failures.push("gate counts do not add up");
  const empty = matrix.rows.reduce((n, r) => n + matrix.goals.filter((g) => r.cells[g].length === 0).length, 0);

  console.log(`target: ${target}`);
  console.log(`games ${games.length} (${unmapped} with no exam fit), notes ${notes.length}, fits ${fits}`);
  console.log(`gate ${JSON.stringify(counts)}; empty matrix cells ${empty} of ${matrix.rows.length * matrix.goals.length}`);
  if (failures.length) {
    console.error(`FAIL:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log("OK");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
