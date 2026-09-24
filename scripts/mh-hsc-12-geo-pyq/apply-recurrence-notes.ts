/**
 * Record the OTHER sitting on a Geography board question the board asked twice.
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/apply-recurrence-notes.ts          # dry run
 *   npx tsx scripts/mh-hsc-12-geo-pyq/apply-recurrence-notes.ts --apply
 *
 * `content_hash` is unique on (org_id, exam_id, content_hash) and covers stem +
 * options + answer, so when the board re-asks a sub-question verbatim at a later
 * sitting the two copies CANNOT both exist as rows — the second is absorbed and
 * its year and question number vanish. That is correct behaviour and a repeat is
 * genuine signal (a board that asks a thing twice is telling you something), but
 * the surviving row then silently claims to be a one-off.
 *
 * DATA-DRIVEN, unlike the hand-listed sibling in scripts/mh-hsc-12-pyq/. There
 * the pairs live inside one chapter file and had to be adjudicated by eye; here
 * both sides are whole papers in `PAPERS`, so the pairs are DERIVED — rebuild
 * each paper's rows, hash them the way commit.ts would, and ask the bank which
 * hashes already belong to a row from a different source_file. A hand-typed list
 * would rot the moment a transcription is corrected.
 *
 * SAFE AS AN IN-PLACE UPDATE. `pyq_note` is not part of `content_hash`, so the
 * row's identity does not move and no delete-and-re-commit is needed.
 *
 * TWO GUARDS, both of which make a re-run a no-op rather than a second append:
 *   • it skips a row whose note already names the sitting;
 *   • it REFUSES a note that would exceed 48 characters. That is not a tidiness
 *     rule — `publicPyqNote` publishes a `pyq` note only under 48 chars, so a
 *     49-char note would silently stop publishing the sitting id it exists to
 *     carry. See `npm run audit:provenance`.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildPaperRecords, type PaperQuestion } from "./lib";
import { EXAM_ID, GEOGRAPHY_CATALOG, PAPERS, questionsJsonPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const NOTE_CAP = 48;

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // hash -> the sittings that asked it, in paper order
  const asked = new Map<string, { sitting: string; ref: string; sourceFile: string }[]>();
  for (const paper of Object.values(PAPERS)) {
    let questions: PaperQuestion[];
    try {
      questions = JSON.parse(readFileSync(questionsJsonPath(paper.id), "utf8"));
    } catch {
      continue;
    }
    const { rows } = buildPaperRecords(GEOGRAPHY_CATALOG, questions);
    for (const r of rows) {
      asked.set(r.contentHash, [
        ...(asked.get(r.contentHash) ?? []),
        { sitting: `${paper.month} ${paper.year}`, ref: r.questionNumber ?? "?", sourceFile: paper.sourceFile },
      ]);
    }
  }

  const repeated = [...asked].filter(([, v]) => v.length > 1);
  console.log(`\n${repeated.length} question(s) asked at more than one sitting.\n`);
  if (!repeated.length) return;

  let written = 0;
  for (const [hash, sittings] of repeated) {
    const { data, error } = await client
      .from("questions")
      .select("id, pyq_note, source_file, text")
      .eq("exam_id", EXAM_ID)
      .eq("content_hash", hash);
    if (error) throw new Error(`lookup failed: ${error.message}`);
    if ((data ?? []).length !== 1) {
      console.log(`  SKIP (resolved to ${(data ?? []).length} rows) ${sittings.map((s) => s.sitting).join(" + ")}`);
      continue;
    }
    const row = data![0];
    const survivor = sittings.find((s) => s.sourceFile === row.source_file);
    const others = sittings.filter((s) => s.sourceFile !== row.source_file).map((s) => s.sitting);
    const note = (row.pyq_note as string | null) ?? "";
    const missing = others.filter((s) => !note.includes(s));
    const text = (row.text as string).replace(/\s+/g, " ").slice(0, 70);

    if (!missing.length) {
      console.log(`  already noted  [${note}]  ${text}`);
      continue;
    }
    const next = `${note}; also asked ${missing.join(", ")}`;
    if (next.length > NOTE_CAP) {
      console.log(`  REFUSED (${next.length} > ${NOTE_CAP} chars, would stop publishing) [${next}]`);
      continue;
    }
    console.log(`  ${survivor?.sitting ?? row.source_file} ${survivor?.ref ?? ""} -> [${next}]`);
    console.log(`     ${text}`);
    if (apply) {
      const { error: uErr } = await client.from("questions").update({ pyq_note: next }).eq("id", row.id);
      if (uErr) throw new Error(`update failed: ${uErr.message}`);
      written++;
    }
  }
  console.log(apply ? `\nwrote ${written} note(s).` : "\n[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
