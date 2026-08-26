/**
 * Fill in subject/chapter/subtopic on the `dup` rows of a records file, by copying them
 * from the LIVE bank row each one duplicates.
 *
 * WHY. A `dup` row is never committed under `createPaper:false`, so it carries no
 * classification. But `check-taxonomy.ts` validates EVERY record and fails on a missing
 * subject, which would either block the gate or invite exempting those rows from it —
 * and an exemption is a hole that widens.
 *
 * Copying from the duplicated bank row is better than inventing a label: the value is
 * whatever a human already filed that exact question under, so it is correct by
 * construction and stays consistent if the row's status is ever revisited.
 *
 *   npx tsx scripts/practice-paper/fill-dup-taxonomy.ts <slug> <dedupTxt> [--apply]
 *
 * Tooling for the manual ingest core, NOT a committed data artifact.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PAPERS, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const [slug, dedupTxt] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  const spec = PAPERS[slug];
  if (!spec) throw new Error(`unknown slug ${slug}`);
  const tag = "lws" + slug.slice(-1); // lws-gat-weekly-t3 -> lws3

  // Which bank row does each dup correspond to? The scan report already says.
  const map = new Map<number, { src: string; n: string }>();
  let cur = "";
  for (const L of readFileSync(dedupTxt, "utf-8").split("\n")) {
    const h = L.match(/^(lws\d)\.records\.json:/);
    if (h) {
      cur = h[1];
      continue;
    }
    const m = L.match(/^\s+(?:EXACT|STEM)\s+Q(\d+)\s+<-\s+(\S+)\s+Q(\S+)/);
    if (m && cur === tag) map.set(Number(m[1]), { src: m[2], n: m[3] });
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const path = join(DATA, spec.recordsFile ?? `${slug}.records.json`);
  const recs = JSON.parse(readFileSync(path, "utf-8")) as any[];
  let filled = 0;
  let unmatched = 0;
  for (const r of recs) {
    if (r.subject && r.chapter && r.subtopic) continue;
    const hit = map.get(r.n);
    if (!hit) {
      unmatched++;
      continue;
    }
    const { data } = await db
      .from("questions")
      .select("chapters(name, subjects(name)), subtopics(name)")
      .eq("source_file", hit.src)
      .eq("question_number", hit.n)
      .limit(1);
    const row = data?.[0] as any;
    const subject = row?.chapters?.subjects?.name;
    const chapter = row?.chapters?.name;
    const subtopic = row?.subtopics?.name;
    if (subject && chapter && subtopic) {
      r.subject = subject;
      r.chapter = chapter;
      r.subtopic = subtopic;
      filled++;
    } else {
      unmatched++;
    }
  }
  console.log(`${slug}: filled ${filled}, still unclassified ${unmatched}`);
  if (apply) writeFileSync(path, JSON.stringify(recs, null, 1), "utf-8");
  else console.log("  dry run - pass --apply");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
