/**
 * Writes src/lib/learn/bankLinks.generated.ts: the bank chapter each Learn course chapter
 * teaches (src/lib/learn/bankLinksBuild.ts), from Concept Ladder's bundle and the LIVE taxonomy.
 * Read-only on the database (the taxonomy is public, so the anon key is enough). Refuses to write
 * while any chapter does not resolve: add the bank's name to ALIASES and run it again.
 *
 *   npm run learn:links -- --from=<bundle dir>           # write the file
 *   npm run learn:links -- --from=<bundle dir> --check   # exit 1 if the committed file differs
 *
 * RUN AFTER EVERY learn:import and commit the result (tests/learn-bank-chapters.test.ts fails on
 * a Learn course chapter the file does not name).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "../../src/lib/exam/examContext";
import { readBundle } from "../../src/lib/learn/bundle";
import { type BankChapterRow, buildLearnBankChapters, renderBankLinksFile } from "../../src/lib/learn/bankLinksBuild";

const args = process.argv.slice(2);
const from = args.find((a) => a.startsWith("--from="))?.slice("--from=".length);
const check = args.includes("--check");
if (!from) {
  console.error("usage: npm run learn:links -- --from=<bundle dir> [--check]");
  process.exit(1);
}

config({ path: join(process.cwd(), ".env.local") });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing.");
  process.exit(1);
}

const read = (name: string) => JSON.parse(readFileSync(join(from, name), "utf8"));
const bundle = readBundle(read("manifest.json"), read("bundle.json"));
const examNameOf = (slug: string) => EXAM_REGISTRY.find((e) => e.slug === slug)?.examName;
const OUT = join(process.cwd(), "src/lib/learn/bankLinks.generated.ts");

type Row = { name: string; subjects: { name: string; exams: { name: string } } };

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const exams = [...new Set(bundle.courses.map((c) => examNameOf(c.exam)).filter((n): n is string => Boolean(n)))];
  const bank: BankChapterRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("chapters")
      .select("name, subjects!inner(name, exams!inner(name))")
      .in("subjects.exams.name", exams)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data as unknown as Row[]) bank.push({ exam: r.subjects.exams.name, subject: r.subjects.name, chapter: r.name });
    if (data.length < 1000) break;
  }
  const { links, errors } = buildLearnBankChapters(bundle.courses, bank, examNameOf);
  console.log(`${bank.length} bank chapters in ${exams.length} exams; ${Object.keys(links).length} Learn chapters linked`);
  if (errors.length) {
    for (const e of errors) console.error(`  ${e}`);
    console.error(`${errors.length} chapter(s) did not resolve; nothing written.`);
    process.exit(1);
  }
  const file = renderBankLinksFile(links, bundle.commit.slice(0, 7));
  if (check) {
    const now = readFileSync(OUT, "utf8");
    if (now !== file) {
      console.error(`${OUT} is stale: run npm run learn:links -- --from=${from} and commit it.`);
      process.exit(1);
    }
    console.log("up to date");
    return;
  }
  writeFileSync(OUT, file);
  console.log(`wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
