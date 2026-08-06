/**
 * Replay supabase/migrations/*.sql into the DEDICATED TEST project, in
 * filename order, over a direct Postgres connection (TEST_SUPABASE_DB_URL).
 *
 * - Guarded: refuses to run unless the connection string's host belongs to an
 *   allow-listed TEST project ref (tests/helpers/testdb.ts). It can never
 *   touch production, whose migrations are applied via the Supabase MCP.
 * - Idempotent: applied filenames are recorded in public.testdb_migrations;
 *   re-runs apply only what's missing. `--force <file>` re-applies one file.
 * - Each file runs in its own transaction; the first failure stops the run
 *   with the file name + error so it can be fixed and resumed.
 *
 * Usage:  npx tsx scripts/testdb/migrate.ts [--dry]
 */
import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { Client } from "pg";
import { ALLOWED_TEST_REFS } from "../../tests/helpers/testdb";

config({ path: path.join(process.cwd(), ".env.test.local") });

const DRY = process.argv.includes("--dry");

function refFromDbUrl(dbUrl: string): string | null {
  // db.<ref>.supabase.co  OR pooler user postgres.<ref>
  const host = /@(?:db\.)?([a-z0-9]{20})\.supabase\.co/i.exec(dbUrl);
  if (host) return host[1].toLowerCase();
  const pooler = /postgres(?:ql)?:\/\/postgres\.([a-z0-9]{20}):/i.exec(dbUrl);
  return pooler ? pooler[1].toLowerCase() : null;
}

async function main(): Promise<void> {
  const dbUrl = process.env.TEST_SUPABASE_DB_URL;
  if (!dbUrl) throw new Error("TEST_SUPABASE_DB_URL not set (see .env.test.local.example)");
  const ref = refFromDbUrl(dbUrl);
  if (!ref || !ALLOWED_TEST_REFS.has(ref)) {
    throw new Error(
      `Refusing to run: DB URL resolves to project ref ${ref ?? "(none)"}, ` +
        `which is not on the test allow-list. This script must never touch prod.`
    );
  }

  const dir = path.join(process.cwd(), "supabase", "migrations");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  if (files.length === 0) throw new Error(`no migrations found in ${dir}`);

  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  try {
    await client.query(
      `create table if not exists public.testdb_migrations (
         name text primary key,
         applied_at timestamptz not null default now()
       )`
    );
    const { rows } = await client.query<{ name: string }>(
      "select name from public.testdb_migrations"
    );
    const applied = new Set(rows.map((r) => r.name));

    const pending = files.filter((f) => !applied.has(f));
    console.log(`${files.length} migration files, ${applied.size} applied, ${pending.length} pending`);
    if (DRY) {
      for (const f of pending) console.log(`  would apply ${f}`);
      return;
    }

    for (const f of pending) {
      const sql = fs.readFileSync(path.join(dir, f), "utf8");
      process.stdout.write(`applying ${f} ... `);
      try {
        await client.query("begin");
        await client.query(sql);
        await client.query("insert into public.testdb_migrations (name) values ($1)", [f]);
        await client.query("commit");
        console.log("ok");
      } catch (err) {
        await client.query("rollback").catch(() => {});
        console.log("FAILED");
        throw new Error(`${f}: ${(err as Error).message}`);
      }
    }
    console.log("done — all migrations applied");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
