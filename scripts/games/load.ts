/**
 * npm run games:load -- --file=<path to JSON> [--target=test] [--apply] [--prune]
 *
 * Writes the learning-games catalogue (migration 0268) that /dashboard/games
 * shows. The database is the source of truth; the JSON file is only how rows
 * get there, and it must live OUTSIDE the repo (the repo is public and the
 * owner keeps this list private). The script refuses a file inside the repo.
 *
 * File shape: { "games": [<learning_games row>...], "notes": [<learning_game_notes row>...] }
 * in the table's own column names; checked by parseLoadFile (src/lib/games/model.ts),
 * the same rules the page applies when it reads.
 *
 * DRY RUN by default: prints what it would add and (with --prune) remove.
 * --apply upserts every row in one transaction. --prune also deletes rows that
 * are in the table but not in the file; without it nothing is ever deleted.
 * --target=test writes to the test project (.env.test.local) instead of production.
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseLoadFile } from "../../src/lib/games/model";

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const has = (name: string) => args.includes(`--${name}`);

const file = flag("file");
const target = flag("target") ?? "prod";
const apply = has("apply");
const prune = has("prune");

if (!file || !["prod", "test"].includes(target)) {
  console.error("usage: npm run games:load -- --file=<json outside the repo> [--target=test] [--apply] [--prune]");
  process.exit(1);
}

const abs = resolve(file);
const rel = relative(process.cwd(), abs);
if (!rel.startsWith("..") && !isAbsolute(rel)) {
  console.error(`refusing ${abs}: the file is inside the repo, which is public. Keep it outside (e.g. the session scratchpad).`);
  process.exit(1);
}

config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(`missing Supabase URL or service-role key for ${target}`);
  process.exit(1);
}

async function main() {
  // Strip a byte-order mark: PowerShell's Set-Content writes one.
  const { games, notes } = parseLoadFile(JSON.parse(readFileSync(abs, "utf8").replace(/^﻿/, "")));
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const [haveGames, haveNotes] = await Promise.all([
    db.from("learning_games").select("id"),
    db.from("learning_game_notes").select("id"),
  ]);
  if (haveGames.error) throw new Error(`read learning_games: ${haveGames.error.message}`);
  if (haveNotes.error) throw new Error(`read learning_game_notes: ${haveNotes.error.message}`);
  const gameIds = new Set((haveGames.data ?? []).map((r) => r.id as string));
  const noteIds = new Set((haveNotes.data ?? []).map((r) => r.id as string));

  const goneGames = [...gameIds].filter((id) => !games.some((g) => g.id === id));
  const goneNotes = [...noteIds].filter((id) => !notes.some((n) => n.id === id));

  console.log(`target: ${target}`);
  console.log(`games: ${games.length} in file (${games.filter((g) => !gameIds.has(g.id)).length} new), ${goneGames.length} in table but not in file`);
  console.log(`notes: ${notes.length} in file (${notes.filter((n) => !noteIds.has(n.id)).length} new), ${goneNotes.length} in table but not in file`);
  if (goneGames.length || goneNotes.length) {
    console.log(`not in file: ${[...goneGames, ...goneNotes].join(", ")}${prune ? " (will be deleted)" : " (kept; --prune deletes them)"}`);
  }

  if (!apply) {
    console.log("dry run: nothing written. Add --apply to save.");
    return;
  }

  const { data, error } = await db.rpc("load_learning_games", { p_games: games, p_notes: notes, p_prune: prune });
  if (error) throw new Error(`load_learning_games: ${error.message}`);
  const r = data as { games: number; notes: number; deleted: number };
  console.log(`saved ${r.games} games and ${r.notes} notes to ${target}${prune ? `; deleted ${r.deleted}` : ""}.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
