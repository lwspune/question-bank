/**
 * One-shot seed: upserts the taxonomy from supabase/seed/taxonomy.json into the database.
 * Idempotent — safe to re-run.
 *
 * Run: `npm run db:seed`
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { seedTaxonomy, type Taxonomy } from "../src/lib/seed";

function envFile() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

async function main() {
  envFile();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local"
    );
  }

  const taxonomyPath = path.join(
    process.cwd(),
    "supabase",
    "seed",
    "taxonomy.json"
  );
  if (!fs.existsSync(taxonomyPath)) {
    throw new Error(
      `taxonomy.json not found at ${taxonomyPath} — run 'npm run extract:taxonomy' first`
    );
  }
  const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, "utf8")) as Taxonomy;

  const client = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const stats = await seedTaxonomy(client, taxonomy);
  console.log("Seed complete. Newly inserted:");
  console.log(`  exams=${stats.exams}`);
  console.log(`  subjects=${stats.subjects}`);
  console.log(`  chapters=${stats.chapters}`);
  console.log(`  subtopics=${stats.subtopics}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
