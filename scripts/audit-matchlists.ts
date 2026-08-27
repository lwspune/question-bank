/**
 * How many match-list questions fail to render as a TABLE — measured with the
 * REAL renderer, not a regex.
 *
 *   npx tsx scripts/audit-matchlists.ts [examSubstr]
 *
 * WHY THE REAL PARSER. A `LIKE '%|---%'` probe reports a correctly-formed table
 * as broken whenever its separator row is written `| --- | --- |` with spaces,
 * which GFM accepts and this bank uses widely. That single artefact inflated a
 * first count of this defect from ~30 to ~322. `parseTableBlocks` is what
 * `/browse`, `/board` and the docx exporter actually run, and it is what
 * `paper-text.ts` P2 gates on, so a disagreement here is a real one.
 *
 * TRIAGE, not a gate: exits 0 always. A hit is a question whose List I / List II
 * would print to a student as run-on prose instead of two columns.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Row = {
  id: string;
  question_number: string | null;
  visibility: string;
  text: string;
  context: string | null;
  chapters: { name: string; subjects: { name: string; exams: { name: string } } } | null;
};

/** A stem is match-list SHAPED if it names paired lists — the words are a hint,
 *  not the test (GAT_RULES rule 2), so this is a LOWER BOUND on the class. */
function isMatchList(body: string): boolean {
  return /list\s*-?\s*i\b/i.test(body) && /list\s*-?\s*ii\b/i.test(body);
}

function hasTable(s: string | null): boolean {
  if (!s) return false;
  return parseTableBlocks(s).some((b) => (b as { kind?: string }).kind === "table");
}

async function main() {
  const filter = process.argv[2]?.toLowerCase();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Paged at 200: the `.or()` over four ilike patterns is an unindexed scan of
  // ~57k rows, and a wider page exceeds the statement timeout. The scan is the
  // cost of not having a text index, which this read does not justify adding —
  // `questions` is the most heavily written table in the schema.
  const rows: Row[] = [];
  const PAGE = 200;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, visibility, text, context, chapters(name, subjects(name, exams(name)))")
      .or("text.ilike.%List I%,context.ilike.%List I%,text.ilike.%List-I%,context.ilike.%List-I%")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < PAGE) break;
  }

  const byExam = new Map<string, { total: number; broken: number; brokenPublic: number; recoverable: number; needsSource: number; sample: string[] }>();
  for (const r of rows) {
    const exam = r.chapters?.subjects?.exams?.name ?? "(none)";
    if (filter && !exam.toLowerCase().includes(filter)) continue;
    const body = `${r.context ?? ""}\n${r.text}`;
    if (!isMatchList(body)) continue;

    const e = byExam.get(exam) ?? { total: 0, broken: 0, brokenPublic: 0, recoverable: 0, needsSource: 0, sample: [] };
    e.total++;
    // The lists live in whichever field carries them; a table in EITHER renders.
    if (!hasTable(r.text) && !hasTable(r.context)) {
      e.broken++;
      if (r.visibility === "PUBLIC") {
        e.brokenPublic++;
        // Can a repair be MECHANICAL? The pairing survives if a run of 2+ spaces
        // still marks the column boundary, or if BOTH columns keep their labels
        // (so the table rebuilds from labels regardless of position). Either way
        // the fix is a rewrite of the stored string. If neither holds — or if the
        // columns are INTERLEAVED — only the source page can restore it
        // (GAT_RULES rule 2: a wrong column boundary reads as authoritative and
        // is worse than a flat stem).
        const spaced = /  +/.test(body);
        // List II is labelled 1-4 OR i-v (JEE uses roman), with or without
        // brackets. Getting this wrong reaches the right verdict for the wrong
        // reason, which is worse than a wrong count: it hides WHY a row needs
        // the source page.
        const labelled =
          /(^|\s)\(?[A-D]\)?[.)]?\s/.test(body) &&
          /(^|\s)\(?(?:[1-4]|i{1,3}v?|iv|v)\)?[.)]?\s/.test(body);
        // INTERLEAVED beats both: a two-column PDF read across the gutter weaves
        // List-II fragments INTO List-I items ("Hypophosphorous (i) +5 acid"), so
        // the item text itself is shredded and no rebuild from the stored string
        // can recover it. Detected as a label appearing INSIDE a run of prose
        // rather than at a line start.
        const interleaved = /[a-z]{3,}\s+\(?(?:i{1,3}v?|iv|v|[1-4])\)[.)]?\s+[a-z+]/.test(body);
        if (interleaved) e.needsSource++;
        else if (spaced || labelled) e.recoverable++;
        else e.needsSource++;
        if (e.sample.length < 3) e.sample.push(`${r.id} Q${r.question_number ?? "?"} ${r.chapters?.name ?? ""}`);
      }
    }
    byExam.set(exam, e);
  }

  const out = [...byExam.entries()].sort((a, b) => b[1].brokenPublic - a[1].brokenPublic);
  console.log("match-list rows that do NOT parse as a table (real parseTableBlocks)\n");
  console.log("exam".padEnd(34) + "matchlists".padStart(11) + "broken".padStart(9) + "  broken+PUBLIC" + "  mechanical" + "  needs source");
  let tp = 0, tb = 0, tbp = 0, tr = 0, tn = 0;
  for (const [exam, e] of out) {
    console.log(exam.padEnd(34) + String(e.total).padStart(11) + String(e.broken).padStart(9) + String(e.brokenPublic).padStart(17) + String(e.recoverable).padStart(13) + String(e.needsSource).padStart(14));
    tp += e.total; tb += e.broken; tbp += e.brokenPublic; tr += e.recoverable; tn += e.needsSource;
  }
  console.log("".padEnd(34, "-") + "-".repeat(37));
  console.log("TOTAL".padEnd(34) + String(tp).padStart(11) + String(tb).padStart(9) + String(tbp).padStart(17) + String(tr).padStart(13) + String(tn).padStart(14));

  console.log("\nsamples (broken + PUBLIC):");
  for (const [exam, e] of out) for (const s of e.sample) console.log(`  [${exam}] ${s}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
