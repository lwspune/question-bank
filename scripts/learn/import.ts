/**
 * Imports Concept Ladder's lessons into the Learn tables (migration 0192).
 *
 * Concept Ladder writes the bundle (`npm run export:pyqvault -- <dir>` there: structure and
 * sympy checks first, clean tree, its commit in manifest.json). This reads it, checks it
 * (src/lib/learn/bundle.ts), then seeds each pool chapter with learn_seed_chapter (one
 * transaction each), then the courses with learn_seed_courses, then logs the import.
 *
 * DRY RUN by default: prints what it would write. `--apply` writes. `--target=test` writes to
 * the test project (.env.test.local) instead of production (.env.local). Safe to repeat.
 * If a chapter fails, the chapters before it are already updated and the courses are not:
 * fix the content in Concept Ladder, export again, and re-run.
 *
 *   npm run learn:import -- --from=<dir>                      # dry run
 *   npm run learn:import -- --from=<dir> --target=test --apply
 *   npm run learn:import -- --from=<dir> --apply              # production
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readBundle } from "../../src/lib/learn/bundle";

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const from = flag("from");
const apply = args.includes("--apply");
const target = flag("target") ?? "prod";

if (!from || !["prod", "test"].includes(target)) {
  console.error("usage: npm run learn:import -- --from=<bundle dir> [--target=test] [--apply]");
  process.exit(1);
}

const read = (name: string) => JSON.parse(readFileSync(join(from, name), "utf8"));
const bundle = readBundle(read("manifest.json"), read("bundle.json"));

const concepts = bundle.chapters.reduce((n, c) => n + c.concepts.length, 0);
const items = bundle.chapters.reduce((n, c) => n + c.concepts.reduce((m, k) => m + k.items.length, 0), 0);
console.log(`Concept Ladder ${bundle.commit.slice(0, 7)}, exported ${bundle.exportedAt}`);
console.log(`${bundle.chapters.length} chapters, ${concepts} concepts, ${items} questions`);
for (const course of bundle.courses) {
  const shown = new Set(course.chapters.flatMap((ch) => ch.parts.flatMap((p) => p.concepts.map((c) => `${p.chapter}/${c}`))));
  console.log(`  ${course.slug}: ${course.chapters.length} chapters, ${shown.size} concepts`);
}
for (const w of bundle.warnings) console.log(`  note: ${w}`);

if (!apply) {
  console.log(`\nDry run: nothing written. Add --apply to write to ${target}.`);
  process.exit(0);
}

if (target === "test") {
  config({ path: join(process.cwd(), ".env.test.local"), override: true });
} else {
  config({ path: join(process.cwd(), ".env.local"), override: true });
}
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(`Supabase settings for ${target} are missing.`);
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  console.log(`\nWriting to ${target} (${new URL(url!).hostname})`);
  for (const chapter of bundle.chapters) {
    const { data, error } = await db.rpc("learn_seed_chapter", { p: chapter });
    if (error) throw new Error(`seeding ${chapter.slug}: ${error.message}`);
    console.log(`  seeded ${JSON.stringify(data)}`);
  }
  const { data, error } = await db.rpc("learn_seed_courses", { p: { courses: bundle.courses } });
  if (error) throw new Error(`seeding courses: ${error.message}`);
  console.log(`  seeded ${JSON.stringify(data)}`);
  const log = await db.from("learn_imports").insert({
    source_commit: bundle.commit,
    exported_at: bundle.exportedAt,
    chapters: bundle.chapters.length,
    courses: bundle.courses.length,
  });
  if (log.error) throw new Error(`logging the import: ${log.error.message}`);
  console.log("done");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
