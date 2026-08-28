/**
 * One-off: split the awards catch-all.
 *
 *   npx tsx scripts/cds-gs/rename-awards.ts          # dry-run
 *   npx tsx scripts/cds-gs/rename-awards.ts --apply
 *
 * `Civilian Awards, Honours and Educational Institutions` was doing two unrelated
 * jobs. Measured across all 19 papers it held 18 questions: 14 awards/honours,
 * 3 pure institution-identification rows that never mention an award, and one
 * event-hosting question wearing an award's name. An institution is not an award.
 *
 * So: RENAME the subtopic to `Civilian Awards and Honours`, and RE-FILE the three
 * institution rows onto `National Institutions, Milestones and History`, which
 * already exists — checking for a home before adding one, which is the lesson
 * round 2 learned twice by adding a subtopic to one period chapter and stranding
 * content in another.
 *
 * WHY A RENAME AND NOT 18 RE-FILES. In the database a question points at a
 * `subtopic_id`, so renaming that ONE row renames it for every question at once.
 * Only the three genuine moves need a per-question update. `refile.ts` is the
 * wrong tool here: it is per-paper, and these 18 rows span twelve papers.
 *
 * SCOPED TO CDS BY CONSTRUCTION, and this was verified rather than assumed. NDA
 * carries a subtopic of the SAME NAME with 13 rows of its own — the CDS catalog
 * was generated from NDA's GAT-GK taxonomy — but it is a different row under a
 * different chapter under a different subject under a different exam. This script
 * resolves its target through exam -> subject -> chapter and asserts it matched
 * exactly one subtopic, so it cannot reach NDA's. NDA's copy has the same
 * catch-all problem and is deliberately NOT touched: it is shipped, published
 * content and its own decision.
 *
 * SOURCE OF RECORD FIRST, THEN THE DATABASE — a DB-only fix is silently reverted
 * by the next re-commit from source.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const CHAPTER = "Awards, Honours, Books and Culture";
const OLD = "Civilian Awards, Honours and Educational Institutions";
const NEW = "Civilian Awards and Honours";

const INSTITUTION_CHAPTER = "National Events, Persons and India General Knowledge";
const INSTITUTION_SUBTOPIC = "National Institutions, Milestones and History";

/** The three rows that are institution-identification and never mention an award. */
const MOVES: { paper: string; number: number; why: string }[] = [
  { paper: "2023-2", number: 95, why: "Indian Maritime University — a statutory central university, no award content." },
  { paper: "2025-1", number: 107, why: "An educational institution established under the Union Ministry of Culture." },
  { paper: "2025-2", number: 16, why: "Institute-and-location pairs (IIAS Shimla, IIPA, Sushma Swaraj Institute)." },
];

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  // 1. catalog.json
  const catPath = join(__dirname, "catalog.json");
  const cat = JSON.parse(readFileSync(catPath, "utf8"));
  const subs: string[] = cat["Current Affairs"][CHAPTER];
  if (!subs.includes(OLD) && subs.includes(NEW)) {
    console.log("catalog already renamed — continuing to check source files and DB.");
  } else {
    const i = subs.indexOf(OLD);
    if (i < 0) throw new Error(`"${OLD}" not found under Current Affairs / ${CHAPTER}`);
    subs[i] = NEW;
    subs.sort((a, b) => a.localeCompare(b));
  }

  // 2. source of record — every paper's committed questions file
  let renamed = 0;
  let moved = 0;
  const files = readdirSync(DATA).filter((f) => f.endsWith(".questions.json"));
  const edits: { file: string; rows: any[] }[] = [];
  for (const f of files) {
    const paper = f.replace(".questions.json", "");
    const rows = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    let touched = false;
    for (const q of rows) {
      const move = MOVES.find((m) => m.paper === paper && m.number === q.number);
      if (move) {
        if (q.subtopic !== OLD && q.subtopic !== NEW) {
          throw new Error(`${paper} Q${q.number}: expected the awards subtopic, found "${q.subtopic}"`);
        }
        q.chapter = INSTITUTION_CHAPTER;
        q.subtopic = INSTITUTION_SUBTOPIC;
        moved++;
        touched = true;
      } else if (q.subtopic === OLD) {
        q.subtopic = NEW;
        renamed++;
        touched = true;
      }
    }
    if (touched) edits.push({ file: f, rows });
  }

  console.log(`\nawards split — ${renamed} row(s) renamed, ${moved} row(s) re-filed as institutions`);
  for (const m of MOVES) console.log(`  move  ${m.paper} Q${m.number}  ${m.why}`);
  if (moved !== MOVES.length) {
    throw new Error(`expected to move exactly ${MOVES.length} rows, moved ${moved} — refusing.`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write catalog, source files and the database.");
    return;
  }

  writeFileSync(catPath, JSON.stringify(cat, null, 2) + "\n", "utf8");
  for (const e of edits) writeFileSync(join(DATA, e.file), JSON.stringify(e.rows, null, 2) + "\n", "utf8");
  console.log(`wrote catalog.json + ${edits.length} source file(s)`);

  // 3. database
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  async function resolveSubtopic(chapter: string, subtopic: string) {
    const { data, error } = await client
      .from("subtopics")
      .select("id, chapters!inner(name, subjects!inner(name, exam_id))")
      .eq("name", subtopic)
      .eq("chapters.name", chapter)
      .eq("chapters.subjects.name", "Current Affairs")
      .eq("chapters.subjects.exam_id", EXAM_ID);
    if (error) throw new Error(error.message);
    if (!data || data.length !== 1) {
      throw new Error(`expected exactly 1 CDS subtopic "${subtopic}" under "${chapter}", found ${data?.length ?? 0}`);
    }
    return data[0].id as string;
  }

  const awardsId = await resolveSubtopic(CHAPTER, OLD).catch(() => resolveSubtopic(CHAPTER, NEW));
  const instId = await resolveSubtopic(INSTITUTION_CHAPTER, INSTITUTION_SUBTOPIC);

  // 3a. move the three institution rows FIRST, while the awards subtopic still
  //     holds them — after the rename they would be indistinguishable by name.
  const { data: instChapter } = await client
    .from("subtopics").select("chapter_id").eq("id", instId).single();
  for (const m of MOVES) {
    const { error, count } = await client
      .from("questions")
      .update({ subtopic_id: instId, chapter_id: instChapter!.chapter_id }, { count: "exact" })
      .eq("exam_id", EXAM_ID)
      .eq("question_number", String(m.number))
      .eq("subtopic_id", awardsId);
    if (error) throw new Error(`${m.paper} Q${m.number}: ${error.message}`);
    if (count !== 1) throw new Error(`${m.paper} Q${m.number}: expected to move 1 row, moved ${count}`);
  }
  console.log(`moved ${MOVES.length} institution row(s) in the database`);

  // 3b. the rename — one row, so every remaining question follows automatically
  const { error: rErr } = await client.from("subtopics").update({ name: NEW }).eq("id", awardsId);
  if (rErr) throw new Error(rErr.message);
  console.log(`renamed subtopic ${awardsId} -> "${NEW}"`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
