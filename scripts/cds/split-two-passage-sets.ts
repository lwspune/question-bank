/**
 * Split a CDS Reading-Comprehension set that carries TWO passages into two sets
 * of one passage each.
 *
 *   npx tsx scripts/cds/split-two-passage-sets.ts            # dry run
 *   npx tsx scripts/cds/split-two-passage-sets.ts --apply
 *
 * WHY. A CDS RC block is printed as "you have two short passages", and three
 * sets were ingested with both passages under ONE set_id and all ten questions
 * attached to it. `scripts/bank-paper/english.ts` R2 makes a shared-passage set
 * ATOMIC — all or nothing — so those blocks can only be drawn as a single
 * 10-question lump. A real GAT comprehension block is 5. Splitting them makes a
 * paper able to take ONE passage, which is the size the exam actually prints,
 * and doubles the number of drawable RC blocks.
 *
 * The corpus is already inconsistent about this: 2021-1, 2022-1 and 2023-1 had
 * their two-passage blocks split into consecutive sets at ingestion (S3+S4,
 * S11+S12, S12+S13). These three were missed.
 *
 * HASH-NEUTRAL BY CONSTRUCTION. `contentHash` covers question + options +
 * answer (src/lib/upload/hash.ts); neither `context` nor `set_id` is an input.
 * So no row identity moves, no `paper_questions` membership is orphaned and no
 * re-commit is needed — and the script ASSERTS every hash is unchanged rather
 * than trusting that reading.
 *
 * THE MARKER IS NOT UNIFORM — checked, not assumed. Two sets separate the
 * passages with an en-dash "Passage – II"; the third uses a bold em-dash
 * "**Passage—II**" and additionally repeats its "Passage 1" heading, a
 * transcription artefact. A single-form regex silently mis-splits the third.
 *
 * QUESTION -> PASSAGE ASSIGNMENT IS BY PRINTED ORDER, AND VERIFIED BY CONTENT.
 * Order alone would be an assumption; the dry run prints each half's stems
 * beside its passage opening so the pairing can be read before anything is
 * written.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Second-passage heading in any of the forms this corpus uses. */
const P2 = /\n\s*\**\s*Passage\s*[–—-]?\s*(?:II|2)\b\s*\**\s*\n?/;
/** A repeated first-passage heading left behind by transcription. */
const STRAY_P1 = /\n\s*\**\s*Passage\s*[–—-]?\s*(?:I|1)\b\s*\**\s*(?=\n\s*\**\s*Passage)/g;

const SETS = [
  "82fc90f2-e71d-4238-82fa-517828b7b9d5:S1",
  "55d278a3-5600-474f-aa18-d4296ab1b0f5:S7",
  "2fb47771-8ec7-4532-a9ff-257a9f621541:S7",
];

type Row = {
  id: string; set_id: string; question_number: string | null; text: string;
  context: string; content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

/** Directions preamble = everything before the first passage heading. */
function splitContext(ctx: string): { directions: string; p1: string; p2: string } | null {
  const cleaned = ctx.replace(STRAY_P1, "");
  const m = cleaned.match(P2);
  if (!m || m.index === undefined) return null;
  const head = cleaned.slice(0, m.index);
  const p2Body = cleaned.slice(m.index + m[0].length).trim();

  const firstHeading = head.search(/\n\s*\**\s*Passage\b/);
  const directions = (firstHeading === -1 ? head : head.slice(0, firstHeading)).trim();
  // Strip heading lines REPEATEDLY: these blocks carry a bare "Passage" line
  // followed by "Passage – I", so removing one leaves the other stranded at the
  // top of the body — and the emitted context adds its own "Passage" heading.
  let p1Body = firstHeading === -1 ? "" : head.slice(firstHeading);
  for (;;) {
    const next = p1Body.replace(/^\s*\**\s*Passage\s*[–—-]?\s*(?:I|1)?\s*\**\s*(?:\n|$)/, "");
    if (next === p1Body) break;
    p1Body = next;
  }
  p1Body = p1Body.trim();
  if (!p1Body || !p2Body) return null;
  return { directions, p1: p1Body, p2: p2Body };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const setId of SETS) {
    const { data, error } = await db
      .from("questions")
      .select("id, set_id, question_number, text, context, content_hash, options(label, text, is_correct)")
      .eq("set_id", setId);
    if (error) throw new Error(`${setId}: ${error.message}`);
    const rows = ((data ?? []) as unknown as Row[])
      .sort((a, b) => Number(a.question_number) - Number(b.question_number));

    if (rows.length !== 10) { console.log(`SKIP ${setId}: ${rows.length} rows, expected 10`); continue; }
    const parts = splitContext(rows[0].context);
    if (!parts) { console.log(`SKIP ${setId}: no second-passage heading found`); continue; }

    const half = rows.length / 2;
    const groups = [
      { suffix: "a", body: parts.p1, rows: rows.slice(0, half) },
      { suffix: "b", body: parts.p2, rows: rows.slice(half) },
    ];

    console.log(`\n${"=".repeat(70)}\n${setId}  ->  ${setId}a / ${setId}b`);
    for (const g of groups) {
      const ctx = `${parts.directions}\n\nPassage\n\n${g.body}`;
      console.log(`\n  ${setId}${g.suffix}  (${g.rows.length} q, passage ${g.body.length} chars)`);
      console.log(`    passage opens: ${JSON.stringify(g.body.slice(0, 110))}`);
      for (const r of g.rows) console.log(`    Q${r.question_number}: ${r.text.slice(0, 78)}`);

      if (apply) {
        for (const r of g.rows) {
          // Hash must not move: context and set_id are not inputs to it.
          const expect = contentHash(r.text, r.options.map((o) => o.text),
            r.options.find((o) => o.is_correct)?.label ?? "");
          if (expect !== r.content_hash) {
            throw new Error(`${r.id}: stored hash does not recompute — refusing to touch this set`);
          }
          const { error: e } = await db.from("questions")
            .update({ set_id: `${setId}${g.suffix}`, context: ctx }).eq("id", r.id);
          if (e) throw new Error(`update ${r.id}: ${e.message}`);
        }
        console.log(`    applied.`);
      }
    }
  }
  if (!apply) console.log("\n[dry run] pass --apply to write.");
}

main().catch((e) => { console.error(e); process.exit(1); });
