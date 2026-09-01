/**
 * Restore the part labels "P, Q, R and S" to NDA Sentence-Rearrangement
 * directions, where the docx extraction dropped them.
 *
 *   npx tsx scripts/practice-paper/fix-jumbled-labels.ts            # dry run
 *   npx tsx scripts/practice-paper/fix-jumbled-labels.ts --apply
 *
 * THE DEFECT, as a reader sees it:
 *
 *   "These parts have been labelled as  and ."
 *
 * — a directions line that names no labels, printed above five questions whose
 * parts ARE labelled P./Q./R./S. Reported from NDA GAT Mock 5, Q26-30.
 *
 * THE SOURCE IS NOT AT FAULT — verified, not inferred. The LWS weekly GAT mock
 * .docx files type those labels as OMML MATH ZONES (Word's equation editor, the
 * usual way an author gets italic letters), and the ingest read only <w:t> runs:
 *
 *   AS PRINTED : ...have been labelled as [[P,Q,R]] and [[S]]. Given below...
 *   AS INGESTED: ...have been labelled as  and . Given below...
 *
 * The tell that this is the mechanism rather than a guess: where `S` happened to
 * be plain text instead of a math zone it SURVIVED, giving the second variant
 * "labelled as  and S." Both forms appear across the three source files.
 *
 * SCOPE. 23 rows, 5 sets, 3 source files (Weekly Mock T1/T2/T5), all in NDA
 * English > Sentence Rearrangement. A bank-wide scan of all 10,697 rows carrying
 * a context found no others. Two directions blocks are affected: "ORDERING OF
 * WORDS IN A SENTENCE" and "ORDERING OF SENTENCES" (the S1/S6 passage form) —
 * each was matched to its OWN source paragraph, not assumed to share one.
 *
 * HASH-NEUTRAL. `contentHash` covers question + options + answer
 * (src/lib/upload/hash.ts); `context` is not an input. So no row identity moves
 * and nothing is orphaned — and the script ASSERTS every hash is unchanged after
 * the write rather than trusting that reading.
 *
 * Each repair names the EXACT text it expects and is refused otherwise, so a
 * re-run is a no-op and a row someone has since edited is skipped rather than
 * overwritten.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

/**
 * Rendered as "P, Q, R and S" with comma spacing, which is how every NDA and CDS
 * booklet prints it. The source's math zone stores the glyphs as "P,Q,R" — OMML
 * supplies its own spacing when rendered, so the un-spaced form is an artefact of
 * the equation encoding rather than the printed page.
 */
const LABELS = "P, Q, R and S";

/** `from` must match the stored context EXACTLY once. */
type Fix = { from: string; to: string; why: string };

const FIXES: Fix[] = [
  {
    // Variants 2, 4, 5 — both P,Q,R and S were math zones, so both vanished.
    from: "labelled as and .",
    to: `labelled as ${LABELS}.`,
    why: "T1 set S8, T2 set S10, T5 set S8: source prints 'labelled as [[P,Q,R]] and [[S]].' — both labels are OMML math zones and the ingest read only <w:t> runs.",
  },
  {
    // Variant 1 — S was plain text and survived; the source also carries a space
    // before its full stop, which is normalised here.
    from: "labelled as and S .",
    to: `labelled as ${LABELS}.`,
    why: "T2 set S9: source prints 'labelled as [[P,Q,R]] and S .' — only P,Q,R was a math zone. The stray space before the stop is the source's own and is normalised.",
  },
  {
    // Variant 3 — same as variant 1 but with no space before the stop.
    from: "labelled as and S.",
    to: `labelled as ${LABELS}.`,
    why: "T5 set S1 (the S1/S6 passage form): source prints 'labelled as [[P,Q,R]] and S.' — only P,Q,R was a math zone.",
  },
];

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  let rows: { id: string; context: string | null; content_hash: string; set_id: string | null; source_file: string | null }[] = [];
  for (let f = 0; ; f += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("id, context, content_hash, set_id, source_file")
      .not("context", "is", null)
      // ORDER BY is load-bearing: LIMIT/OFFSET without one has no stable
      // ordering, so pages silently repeat and skip. An unordered version of
      // this very scan missed the rows it was written to find.
      .order("id")
      .range(f, f + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows = rows.concat(data as typeof rows);
    if (data.length < 1000) break;
  }

  const planned: { id: string; before: string; after: string; hash: string; why: string; set: string }[] = [];
  const alreadyOk: string[] = [];
  for (const r of rows) {
    const c = String(r.context);
    if (c.includes(`labelled as ${LABELS}`)) {
      if (/Sentence|jumbled/i.test(c)) alreadyOk.push(r.id);
      continue;
    }
    const fix = FIXES.find((f) => c.includes(f.from));
    if (!fix) continue;
    const occurrences = c.split(fix.from).length - 1;
    if (occurrences !== 1) {
      throw new Error(`${r.id}: ${JSON.stringify(fix.from)} occurs ${occurrences} times — refusing`);
    }
    planned.push({
      id: r.id,
      before: c,
      after: c.split(fix.from).join(fix.to),
      hash: r.content_hash,
      why: fix.why,
      set: `${r.set_id ?? "-"} ${r.source_file ?? ""}`,
    });
  }

  const bySet = new Map<string, number>();
  for (const p of planned) bySet.set(p.set, (bySet.get(p.set) ?? 0) + 1);
  console.log(`rows scanned: ${rows.length}`);
  console.log(`already repaired: ${alreadyOk.length}`);
  console.log(`to repair: ${planned.length} row(s) across ${bySet.size} set(s)\n`);
  for (const [s, n] of bySet) console.log(`  ${String(n).padStart(2)}  ${s}`);
  if (planned.length) {
    const sample = planned[0];
    console.log(`\nsample:`);
    console.log(`  BEFORE: ${JSON.stringify(sample.before.slice(0, 150))}`);
    console.log(`  AFTER : ${JSON.stringify(sample.after.slice(0, 150))}`);
  }

  if (!apply) {
    console.log(`\n[dry run] pass --apply to write.`);
    return;
  }

  for (const p of planned) {
    const { error } = await db.from("questions").update({ context: p.after }).eq("id", p.id);
    if (error) throw new Error(`${p.id}: ${error.message}`);
  }
  console.log(`\n${planned.length} context(s) repaired.`);

  // Verify from the database: contexts changed, hashes did not.
  const ids = planned.map((p) => p.id);
  let moved = 0;
  let stillBroken = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select("id, context, content_hash").in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) {
      const p = planned.find((x) => x.id === q.id)!;
      if (q.content_hash !== p.hash) moved++;
      if (!String(q.context).includes(`labelled as ${LABELS}`)) stillBroken++;
    }
  }
  console.log(`verified: ${moved} hash(es) moved (expected 0), ${stillBroken} still missing labels (expected 0)`);
  if (moved || stillBroken) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
