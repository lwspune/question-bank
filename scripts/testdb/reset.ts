/**
 * Reset the DEDICATED TEST project to a clean, seeded state:
 *
 *   1. TRUNCATE every public base table (except testdb_migrations — the
 *      schema stays migrated; this is a DATA reset, not a schema nuke, so
 *      Supabase's schema grants/default privileges are never disturbed).
 *   2. Delete every auth user (the test project holds only fixtures + seed).
 *   3. Empty the question-images bucket.
 *   4. Re-apply any pending migrations (migrate.ts) and re-seed (seed.ts).
 *
 * Guarded by the same allow-list as migrate.ts — cannot touch prod.
 * Run whenever the test DB accumulates crumbs from killed runs:
 *   npx tsx scripts/testdb/reset.ts
 */
import { config } from "dotenv";
import * as path from "node:path";
import { execFileSync } from "node:child_process";
import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";
import { ALLOWED_TEST_REFS, extractProjectRef } from "../../tests/helpers/testdb";

config({ path: path.join(process.cwd(), ".env.test.local") });

async function main(): Promise<void> {
  const dbUrl = process.env.TEST_SUPABASE_DB_URL;
  const url = process.env.TEST_SUPABASE_URL;
  const service = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY;
  if (!dbUrl || !url || !service) throw new Error("TEST_SUPABASE_* env not set (see .env.test.local.example)");

  const apiRef = extractProjectRef(url);
  const dbRef = /@(?:db\.)?([a-z0-9]{20})\.supabase\.co/i.exec(dbUrl)?.[1]?.toLowerCase();
  if (!apiRef || !ALLOWED_TEST_REFS.has(apiRef) || dbRef !== apiRef) {
    throw new Error("Refusing: env does not point at a single allow-listed test project");
  }

  // 1) truncate all public base tables (RESTART IDENTITY, CASCADE).
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  try {
    const { rows } = await client.query<{ table_name: string }>(
      `select table_name from information_schema.tables
       where table_schema='public' and table_type='BASE TABLE' and table_name <> 'testdb_migrations'`
    );
    if (rows.length > 0) {
      const list = rows.map((r) => `public."${r.table_name}"`).join(", ");
      await client.query(`truncate ${list} restart identity cascade`);
      console.log(`truncated ${rows.length} tables`);
    }
    // 3) empty the bucket (storage.objects rows; actual blobs are GC'd by Supabase).
    await client.query(`delete from storage.objects where bucket_id = 'question-images'`);
    console.log("emptied question-images bucket");
  } finally {
    await client.end();
  }

  // 2) delete all auth users via the admin API.
  const admin = createClient(url, service, { auth: { persistSession: false } });
  let deleted = 0;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw error;
    if (!data.users.length) break;
    for (const u of data.users) {
      await admin.auth.admin.deleteUser(u.id);
      deleted++;
    }
    if (data.users.length < 1000) break;
  }
  console.log(`deleted ${deleted} auth users`);

  // 4) re-apply pending migrations + re-seed.
  const tsx = process.platform === "win32" ? "npx.cmd" : "npx";
  execFileSync(tsx, ["tsx", "scripts/testdb/migrate.ts"], { stdio: "inherit", shell: process.platform === "win32" });
  execFileSync(tsx, ["tsx", "scripts/testdb/seed.ts"], { stdio: "inherit", shell: process.platform === "win32" });
  console.log("reset complete");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
