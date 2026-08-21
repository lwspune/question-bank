/**
 * What dropping `practiceOnly` from the cbse-12 registry entry actually changes.
 *
 *   npx tsx scripts/cbse-12-pyq/flip-impact.ts
 *
 * `practiceOnly` is not just a /browse default. `listChapterLandings` derives
 * `kind = practiceOnly ? "practice" : "pyq"`, so dropping the flag switches every
 * CBSE Class-12 chapter landing page from textbook questions to board PYQs — and
 * re-ranks which chapters clear MIN_QUESTIONS_FOR_LANDING at all. A chapter with
 * 300 textbook questions and 9 PYQs KEEPS its page today and LOSES it after,
 * which silently drops a live indexed URL.
 *
 * So the flip is a product decision, not a mechanical toggle. This prints the
 * per-chapter before/after so it is made with the numbers in view.
 *
 * Counts PUBLIC only, because that is what an anonymous visitor sees and what
 * the landing pages are built from. Run it AFTER flipping the PYQ rows public,
 * or the "after" column reads zero everywhere.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID_CBSE_12 } from "./config";

/** Mirrors MIN_QUESTIONS_FOR_LANDING in src/lib/questions/landing.ts. */
const MIN = 15;

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: chapters, error: ce } = await client.from("chapters")
    .select("id, name, subjects!inner(exam_id)")
    .eq("subjects.exam_id", EXAM_ID_CBSE_12);
  if (ce) throw new Error(ce.message);

  const rows: { chapter_id: string | null; question_kind: string; visibility: string }[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("questions")
      .select("chapter_id, question_kind, visibility")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12)
      .order("id").range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...(data as never as typeof rows));
    if (!data || data.length < 500) break;
  }

  const tally = new Map<string, { practice: number; pyq: number; pyqPrivate: number }>();
  for (const r of rows) {
    if (!r.chapter_id) continue;
    if (!tally.has(r.chapter_id)) tally.set(r.chapter_id, { practice: 0, pyq: 0, pyqPrivate: 0 });
    const t = tally.get(r.chapter_id)!;
    if (r.question_kind === "practice") { if (r.visibility === "PUBLIC") t.practice++; }
    else if (r.visibility === "PUBLIC") t.pyq++;
    else t.pyqPrivate++;
  }

  const named = (chapters ?? []).map((c) => ({
    name: c.name as string,
    ...(tally.get(c.id as string) ?? { practice: 0, pyq: 0, pyqPrivate: 0 }),
  })).sort((a, b) => b.practice - a.practice);

  console.log(`chapter                                practice   pyq(pub)  pyq(priv)   landing now -> after`);
  let gains = 0, losses = 0, keeps = 0;
  for (const c of named) {
    // After the flip the PYQ rows are PUBLIC, so the "after" count is pub+priv.
    const after = c.pyq + c.pyqPrivate;
    const now = c.practice >= MIN, next = after >= MIN;
    const verdict = now && next ? "keeps" : now && !next ? "** LOSES **" : !now && next ? "** GAINS **" : "none -> none";
    if (now && next) keeps++; else if (now) losses++; else if (next) gains++;
    console.log(`${c.name.slice(0, 38).padEnd(38)} ${String(c.practice).padStart(8)} ${String(c.pyq).padStart(9)} ${String(c.pyqPrivate).padStart(10)}   ${verdict}`);
  }
  console.log(`\nlanding pages: ${keeps} keep, ${gains} gain, ${losses} LOSE`);
  console.log(`(a LOST page is a live indexed URL disappearing — check it before flipping)`);

  const pub = rows.filter((r) => r.visibility === "PUBLIC").length;
  const priv = rows.length - pub;
  console.log(`\nexam totals: ${rows.length} rows | PUBLIC ${pub} | PRIVATE ${priv}`);
  console.log(`  practice ${rows.filter((r) => r.question_kind === "practice").length} | pyq ${rows.filter((r) => r.question_kind === "pyq").length}`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
