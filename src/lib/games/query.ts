/**
 * The read behind /dashboard/games. The tables (migration 0268) are
 * service-role only, so pass the service-role client. No `server-only`, so the
 * loader script and the integration test drive the same function.
 *
 * Both tables hold a few hundred rows at most; one page of 1,000 each is the
 * whole list, and a full page is reported rather than silently cut.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { parseGameRow, parseNoteRow, type Game, type GameNote } from "./model";

const LIMIT = 1000;

export async function fetchGames(
  client: SupabaseClient<Database>,
): Promise<{ games: Game[]; notes: GameNote[] }> {
  const [games, notes] = await Promise.all([
    client.from("learning_games").select("*").order("id").limit(LIMIT),
    client.from("learning_game_notes").select("*").order("sort").order("id").limit(LIMIT),
  ]);
  if (games.error) throw new Error(`learning_games: ${games.error.message}`);
  if (notes.error) throw new Error(`learning_game_notes: ${notes.error.message}`);
  if ((games.data?.length ?? 0) >= LIMIT || (notes.data?.length ?? 0) >= LIMIT) {
    throw new Error("learning games: 1,000 rows reached; page the read before adding more");
  }
  return {
    games: (games.data ?? []).map(parseGameRow),
    notes: (notes.data ?? []).map(parseNoteRow),
  };
}
