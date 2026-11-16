/**
 * The JEE Main answer keys the calculator marks against, read from score_keys
 * (migration 0266) and kept for 5 minutes. On key day thousands of students
 * check within hours: they share this one cached read instead of each one
 * reading the table. A key loaded with `npm run score:load-key` shows within
 * 5 minutes.
 *
 * Only the last 13 months of sittings are read, so the cached entry stays well
 * under Next's 2 MB data-cache limit as years of keys pile up.
 */
import { unstable_cache } from "next/cache";
import { singleFlight } from "@/lib/cache/singleFlight";
import { createTypedAnonClient } from "@/lib/supabase/server";
import { toStoredKeyRow, type StoredKeyRow } from "./jeeServer";

async function readKeyRows(): Promise<StoredKeyRow[]> {
  const since = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const { data, error } = await createTypedAnonClient()
    .from("score_keys")
    .select("id, sitting, region, status, drop_policy, loaded_at, key")
    .eq("calculator", "jee-main")
    .gte("sitting", since);
  if (error) throw new Error(`score_keys read failed: ${error.message}`);
  const rows: StoredKeyRow[] = [];
  for (const r of data ?? []) {
    const parsed = toStoredKeyRow(r);
    if (parsed) rows.push(parsed);
    else console.error(`score_keys row ${r.id} has an unreadable key; skipped.`);
  }
  return rows;
}

const cachedKeyRows = unstable_cache(readKeyRows, ["score-keys", "jee-main", "v1"], { revalidate: 300 });

export function getJeeKeyRows(): Promise<StoredKeyRow[]> {
  return singleFlight("score-keys:jee-main", cachedKeyRows);
}

/** The sittings with a key loaded, newest first: for the page's "key is out" state. */
export async function listJeeKeySittings(): Promise<{ sitting: string; status: string }[]> {
  const rows = await getJeeKeyRows();
  const best = new Map<string, string>();
  for (const r of rows) if (best.get(r.sitting) !== "final") best.set(r.sitting, r.status);
  return [...best.entries()].map(([sitting, status]) => ({ sitting, status })).sort((a, b) => b.sitting.localeCompare(a.sitting));
}
