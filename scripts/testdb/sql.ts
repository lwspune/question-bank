/**
 * Ad-hoc SQL against the DEDICATED TEST project (guarded by the same
 * allow-list as migrate.ts — cannot touch prod).
 *
 * Usage: npx tsx scripts/testdb/sql.ts "select count(*) from questions"
 */
import { config } from "dotenv";
import * as path from "node:path";
import { Client } from "pg";
import { ALLOWED_TEST_REFS } from "../../tests/helpers/testdb";

config({ path: path.join(process.cwd(), ".env.test.local") });

async function main(): Promise<void> {
  const dbUrl = process.env.TEST_SUPABASE_DB_URL;
  if (!dbUrl) throw new Error("TEST_SUPABASE_DB_URL not set");
  const ref = /@(?:db\.)?([a-z0-9]{20})\.supabase\.co/i.exec(dbUrl)?.[1]?.toLowerCase();
  if (!ref || !ALLOWED_TEST_REFS.has(ref)) throw new Error("not a test project — refusing");

  const query = process.argv[2];
  if (!query) throw new Error("usage: tsx scripts/testdb/sql.ts \"<sql>\"");

  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  try {
    const res = await client.query(query);
    console.log(JSON.stringify(res.rows ?? [], null, 1));
    if (res.command && res.command !== "SELECT") console.log(`-- ${res.command} ${res.rowCount}`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
