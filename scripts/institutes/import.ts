/**
 * Import Google Maps places (Apify's compass/crawler-google-places output) into
 * institute_prospects (migration 0246), the /dashboard/institutes sales list.
 *
 *   npm run institutes:import -- --file=<scrape.json> [--file=<more.json>] [--target=test] [--apply]
 *
 * DRY RUN by default: prints what it would write. `--apply` writes.
 * `--target=test` uses the test project (.env.test.local).
 *
 * Safe to repeat: rows upsert on Google's place_id and the upsert never names
 * status, note or follow_up, so the owner's sales notes survive a re-run. A
 * place that drops off a later scrape is NOT deleted (the owner may have
 * notes on it).
 *
 * The centre and radius are FC Road, Pune, 3 km: the area of the first scrape
 * (2026-11-09). A different area needs its own --area / --lat / --lng / --km.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readAllPages } from "../../src/lib/supabase/readAllPages";
import { KIND_LABELS, PROSPECT_KINDS, sizeBand, toProspectRows, type MapsPlace } from "../../src/lib/institutes/prospects";

const args = process.argv.slice(2);
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const files = args.filter((a) => a.startsWith("--file=")).map((a) => a.slice("--file=".length));
const apply = args.includes("--apply");
const target = arg("target") ?? "prod";

if (files.length === 0) {
  console.error("usage: npm run institutes:import -- --file=<scrape.json> [--target=test] [--apply]");
  process.exit(1);
}

const area = arg("area") ?? "FC Road";
const center = { lat: Number(arg("lat") ?? 18.5225), lng: Number(arg("lng") ?? 73.8412) };
const radiusKm = Number(arg("km") ?? 3);

config({ path: join(process.cwd(), target === "test" ? ".env.test.local" : ".env.local"), override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error(`Supabase settings for ${target} are missing`);

async function main() {
  const places: MapsPlace[] = files.flatMap((f) => JSON.parse(readFileSync(f, "utf8")) as MapsPlace[]);
  const rows = toProspectRows(places, { center, radiusKm, area });

  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const existing = new Set(
    (
      await readAllPages<{ place_id: string }>((from, to) =>
        db.from("institute_prospects").select("place_id").order("place_id").range(from, to)
      )
    ).map((r) => r.place_id)
  );

  const fresh = rows.filter((r) => !existing.has(r.place_id)).length;
  console.log(`${target}: ${places.length} places read from ${files.length} file(s), ${rows.length} kept within ${radiusKm} km of ${area}`);
  console.log(`  ${fresh} new, ${rows.length - fresh} already on the list (Maps fields refreshed, notes kept)`);
  for (const k of PROSPECT_KINDS) {
    const ofKind = rows.filter((r) => r.kind === k);
    const small = ofKind.filter((r) => sizeBand(r.reviews) === "small");
    console.log(`  ${KIND_LABELS[k]}: ${ofKind.length} (small ${small.length}, small with no website ${small.filter((r) => !r.website).length})`);
  }

  if (!apply) {
    console.log("DRY RUN: nothing written. Add --apply to write.");
    return;
  }
  for (let i = 0; i < rows.length; i += 200) {
    const { error } = await db.from("institute_prospects").upsert(rows.slice(i, i + 200), { onConflict: "place_id" });
    if (error) throw new Error(`upsert failed at row ${i}: ${error.message}`);
  }
  console.log(`written: ${rows.length} rows`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
