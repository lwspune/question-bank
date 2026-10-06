/**
 * Clear first-touch channels that were really a SIGN-IN HOP, not an arrival.
 *
 * WHAT HAPPENED: a visitor with no referrer (typed address, bookmark, an app
 * that strips it) who signed in through Google's redirect came back to /welcome
 * with accounts.google.com as the referrer, and the parser read that as a Google
 * search. 27 accounts (2026-09-19 to 10-06) were credited to Google that Google
 * never sent. The parser now ignores sign-in hops (lib/acquisition/source.ts).
 *
 * WHAT THIS DOES: sets those rows' acq_* columns back to NULL, which is what the
 * fixed code would have written: "no channel recorded", the bucket the growth
 * snapshot (0125) already keeps for it. The true channel was never collected, so
 * nothing better can be written.
 *
 * Only rows whose stored channel CAME FROM the hop are touched: Google organic
 * via accounts.google.*, or a referral from our *.supabase.co auth host. A row
 * whose source is a UTM tag is left alone, since the tag is a real channel.
 *
 * DRY RUN BY DEFAULT. `-- --apply` writes, after saving every matched row to
 * backups/ (gitignored) so the change can be put back. Idempotent: a second run
 * matches nothing. Re-run once after the fix deploys, to catch hops recorded by
 * the old code in between.
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const APPLY = process.argv.includes("--apply");

type Row = {
  user_id: string;
  acq_source: string | null;
  acq_medium: string | null;
  acq_campaign: string | null;
  acq_landing: string | null;
  acq_referrer_host: string | null;
  acq_captured_at: string | null;
};

function isHopRow(r: Row): boolean {
  const host = r.acq_referrer_host ?? "";
  if (host.startsWith("accounts.google.")) return r.acq_source === "google" && r.acq_medium === "organic";
  if (host.endsWith(".supabase.co")) return r.acq_source === host && r.acq_medium === "referral";
  return false;
}

async function main() {
  const db = createSupabaseAdminClient();
  // Few rows carry a channel (~150), far under the 1000-row cap, but filter in
  // SQL anyway so the payload is only the candidates.
  const { data, error } = await db
    .from("student_profiles")
    .select("user_id, acq_source, acq_medium, acq_campaign, acq_landing, acq_referrer_host, acq_captured_at")
    .or("acq_referrer_host.like.accounts.google.%,acq_referrer_host.like.%.supabase.co");
  if (error) throw new Error(error.message);

  const rows = ((data ?? []) as Row[]).filter(isHopRow);
  const byHost = new Map<string, number>();
  for (const r of rows) byHost.set(r.acq_referrer_host!, (byHost.get(r.acq_referrer_host!) ?? 0) + 1);
  console.log(`Sign-in hop rows: ${rows.length}`);
  for (const [host, n] of byHost) console.log(`  ${host}: ${n}`);

  if (!APPLY) {
    console.log("Dry run. Add -- --apply to clear them (a backup is written first).");
    return;
  }
  if (rows.length === 0) return;

  mkdirSync("backups", { recursive: true });
  const file = join("backups", `acq-signin-hops-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(file, JSON.stringify(rows, null, 2));
  console.log(`Backup: ${file}`);

  let cleared = 0;
  for (const r of rows) {
    const { error: upErr, count } = await db
      .from("student_profiles")
      .update(
        {
          acq_source: null,
          acq_medium: null,
          acq_campaign: null,
          acq_landing: null,
          acq_referrer_host: null,
          acq_captured_at: null,
        },
        { count: "exact" }
      )
      .eq("user_id", r.user_id)
      // Guard: only if the row still holds the hop we read.
      .eq("acq_referrer_host", r.acq_referrer_host!);
    if (upErr) throw new Error(`${r.user_id}: ${upErr.message}`);
    cleared += count ?? 0;
  }
  console.log(`Cleared: ${cleared}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
