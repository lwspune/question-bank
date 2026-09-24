/**
 * Name the rows a board paper could NOT insert, and say WHY.
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/report-collisions.ts <paperId>
 *   npx tsx scripts/mh-hsc-12-geo-pyq/report-collisions.ts --all
 *
 * `commitStaged` reports a count of `skipped` and nothing else. On this lane a
 * skip is a FINDING, not a re-run artefact: the unique index is
 * (org_id, exam_id, content_hash) and the Class-12 Geography TEXTBOOK corpus
 * sits on these same eight chapters, so a board question the book already asks
 * word-for-word cannot insert a second time. This script turns that bare count
 * into named rows.
 *
 * It reports two DIFFERENT causes, which need different responses:
 *
 *   IN-PAPER   two rows of THIS paper hash identically — a transcription
 *              duplicate, or the paper genuinely printing the same sub-question
 *              twice. Fix the JSON if it is the former.
 *   IN-BANK    the hash already belongs to a row from another source_file. The
 *              printout names that row's source_file, question_kind and
 *              visibility, which is what decides the response:
 *                • kind='pyq'      → the board repeated itself across sittings.
 *                                    The survivor is already a PYQ, so the PYQ
 *                                    filter is unaffected; only the sitting
 *                                    note needs to record the repeat.
 *                • kind='practice' → the TEXTBOOK holds it. Per the ruling on
 *                                    this lane the survivor STAYS practice, and
 *                                    the consequence to state whenever this
 *                                    corpus is counted is that the PYQ row count
 *                                    under-reports the papers by this many rows.
 *
 * Read-only. It computes the same hashes `commit.ts` would and asks the bank
 * which already exist — it never writes.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildPaperRecords, type PaperQuestion } from "./lib";
import { EXAM_ID, GEOGRAPHY_CATALOG, PAPERS, requirePaper, questionsJsonPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Hit = { hash: string; source_file: string; question_kind: string; visibility: string; text: string };

/** Named so `Db` below picks up the CONCRETE client type. `ReturnType<typeof
 *  createClient>` resolves to the no-argument defaults, whose schema parameter is
 *  `never`, and every row property then fails to exist. */
function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
type Db = ReturnType<typeof makeClient>;


async function reportOne(client: Db, id: string) {
  const paper = requirePaper(id);
  let questions: PaperQuestion[];
  try {
    questions = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  } catch {
    console.log(`\n${id}: no questions JSON yet — skipping.`);
    return;
  }
  const { rows } = buildPaperRecords(GEOGRAPHY_CATALOG, questions);

  // IN-PAPER duplicates: same hash twice within this one file.
  const byHash = new Map<string, string[]>();
  for (const r of rows) byHash.set(r.contentHash, [...(byHash.get(r.contentHash) ?? []), r.questionNumber ?? "?"]);
  const inPaper = [...byHash].filter(([, refs]) => refs.length > 1);

  // IN-BANK: hashes that already exist under a DIFFERENT source_file.
  const hashes = [...byHash.keys()];
  const found = new Map<string, Hit>();
  for (let i = 0; i < hashes.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select("content_hash, source_file, question_kind, visibility, text")
      .eq("exam_id", EXAM_ID)
      .in("content_hash", hashes.slice(i, i + 200));
    if (error) throw new Error(`lookup failed: ${error.message}`);
    for (const r of data ?? []) {
      if (r.source_file === paper.sourceFile) continue; // our own committed copy
      found.set(r.content_hash as string, r as unknown as Hit);
    }
  }

  console.log(`\n=== ${id} (${paper.month} ${paper.year}) — ${rows.length} rows ===`);
  if (!inPaper.length && !found.size) {
    console.log("  no collisions.");
    return;
  }
  for (const [hash, refs] of inPaper) {
    console.log(`  IN-PAPER  ${refs.join(" = ")}`);
    console.log(`            ${byHashText(rows, hash)}`);
  }
  for (const [hash, hit] of found) {
    const refs = byHash.get(hash) ?? [];
    console.log(`  IN-BANK   ${refs.join(", ")}  ->  ${hit.source_file}  [${hit.question_kind} / ${hit.visibility}]`);
    console.log(`            ${oneLine(hit.text)}`);
  }
}

const oneLine = (s: string) => (s ?? "").replace(/\s+/g, " ").slice(0, 110);
const byHashText = (rows: { contentHash: string; text: string }[], h: string) =>
  oneLine(rows.find((r) => r.contentHash === h)?.text ?? "");

async function main() {
  const arg = process.argv[2];
  const ids = arg === "--all" ? Object.keys(PAPERS) : [arg];
  if (!arg) throw new Error("usage: report-collisions.ts <paperId> | --all");
  const client = makeClient();
  for (const id of ids) await reportOne(client, id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
