/**
 * Reconcile a JEE subject's coverage BOTH WAYS: every paper on disk against the
 * rows in the DB, and every DB source_file against the papers on disk.
 *
 *   npx tsx scripts/jee/coverage.ts [--subject=Chemistry]
 *
 * Why this exists. "Have we finished?" was answered for Physics by eyeballing a
 * total, and a whole sitting (2023-jan30) had silently never been dispatched —
 * the subject would have been declared complete with a paper missing. A total
 * cannot show you a hole; only a per-paper diff can, and it has to run in BOTH
 * directions because the failure modes differ:
 *   - on disk, not in DB  -> never ingested (the 2023-jan30 case)
 *   - in DB, not on disk  -> committed under a wrong source_file (this happened
 *     when a flag was parsed as a filename and 100 rows landed under
 *     "--subject=Chemistry")
 *
 * The expected per-paper count is NOT a constant, which is exactly why a naive
 * "expect 60" check cries wolf on a third of the corpus:
 *   2026        per-SHIFT files of 75 q (Phy 1-25, Chem 26-50, Maths 51-75) -> 25
 *   2025        date files of two 75-q shifts                               -> 50
 *   single-shift 2023 sittings (only one shift was ever published)          -> 30
 *   2021 p1-p10,p18  legacy 20 MCQ + 10 NAT per subject                     -> 20-30
 *   2021 p11-p26     compilations, genuinely variable                       -> any
 *   everything else  two 90-q shifts                                        -> 60
 * A shortfall against these is a REPORT, not a failure: a paper legitimately
 * loses rows to `skip[]` (corrupted beyond recovery) and to deliberate holds.
 * Read it as "explain each one", not "fix each one".
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";
import { parseSubjectArg } from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAPERS_DIR = join("scripts", "jee", "papers");

/** Expected rows for ONE subject in a paper, by paper id. null = variable. */
export function expectedForPaper(paperId: string, notes: string): number | null {
  if (/^2026-/.test(paperId)) return 25;
  if (/^2025-/.test(paperId)) return 50;
  if (/^2021-p(1|2|3|4|5|6|7|8|9|10|18)$/.test(paperId)) return null; // legacy, 20 MCQ +/- NAT
  if (/^2021-/.test(paperId)) return null; // compilations
  if (/SINGLE shift/i.test(notes)) return 30;
  return 60;
}

async function main() {
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: subs, error: se } = await db
    .from("subjects")
    .select("id,name")
    .eq("exam_id", EXAM_ID);
  if (se) throw se;
  const sub = (subs ?? []).find((s) => s.name === subject);
  if (!sub) throw new Error(`subject not found: ${subject}`);

  // Page past the PostgREST 1000-row cap — a bare select silently truncates and
  // would invent missing papers out of thin air.
  const rows: { question_number: string; source_file: string; visibility: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("question_number,source_file,visibility")
      .eq("exam_id", EXAM_ID)
      .eq("subject_id", sub.id)
      .range(from, from + 999);
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...(data as typeof rows));
    if (data.length < 1000) break;
  }

  const inDb = new Map<string, { total: number; withheld: string[] }>();
  for (const r of rows) {
    const e = inDb.get(r.source_file) ?? { total: 0, withheld: [] };
    e.total++;
    if (r.visibility !== "PUBLIC") e.withheld.push(r.question_number);
    inDb.set(r.source_file, e);
  }

  const disk = new Map<string, { id: string; notes: string; skip: number[] }>();
  for (const f of readdirSync(PAPERS_DIR)) {
    if (!f.endsWith(".json")) continue;
    const j = JSON.parse(readFileSync(join(PAPERS_DIR, f), "utf8"));
    if (j.sourceFile) {
      disk.set(j.sourceFile, {
        id: f.replace(/\.json$/, ""),
        notes: j.notes ?? "",
        skip: (j.skip ?? []) as number[],
      });
    }
  }

  const pub = rows.filter((r) => r.visibility === "PUBLIC").length;
  console.log(`${subject}: ${rows.length} rows (${pub} PUBLIC) across ${inDb.size} source files`);
  console.log(`papers on disk: ${disk.size}\n`);

  const missing = [...disk]
    .filter(([sf]) => !inDb.has(sf))
    .map(([, v]) => v.id)
    .sort();
  console.log(`NOT INGESTED (${missing.length}):`);
  for (const id of missing) console.log(`  ${id}`);

  console.log("\nSHORT vs expected (explain each — skips and holds are legitimate):");
  let short = 0;
  for (const [sf, e] of [...inDb].sort()) {
    const d = disk.get(sf);
    if (!d) continue;
    const want = expectedForPaper(d.id, d.notes);
    if (want !== null && e.total < want) {
      short++;
      // A skip[] entry is a question this paper deliberately dropped. It spans
      // every subject, so it can only ACCOUNT FOR a shortfall, never prove one:
      // read "gap 3, skips 2,52,35" as explained and "gap 3, skips (none)" as
      // something to go and look at.
      const gap = want - e.total;
      const skips = d.skip.length ? d.skip.join(", ") : "(none recorded)";
      console.log(`  ${d.id}: ${e.total} of ${want}  gap ${gap}  skip[] ${skips}`);
    }
  }
  if (!short) console.log("  (none)");

  const withheld = [...inDb].filter(([, e]) => e.withheld.length);
  console.log(`\nWITHHELD (PRIVATE) rows: ${withheld.reduce((n, [, e]) => n + e.withheld.length, 0)}`);
  for (const [sf, e] of withheld.sort()) {
    console.log(`  ${disk.get(sf)?.id ?? sf}: Q${e.withheld.sort().join(", Q")}`);
  }

  const orphan = [...inDb.keys()].filter((sf) => !disk.has(sf)).sort();
  console.log(`\nIN DB BUT NOT ON DISK (wrong source_file?): ${orphan.length}`);
  for (const sf of orphan) console.log(`  ${JSON.stringify(sf)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
