/**
 * Move the SSC Current Affairs questions decisions.json names into the new "Static GK" subject
 * (owner, 2026-11-19), in SSC CGL Tier I and II, SSC CHSL and SSC CPO.
 *
 *   npx tsx scripts/ssc-cgl/static-gk/move.ts            # dry run: every DB write runs, then ROLLBACK
 *   npx tsx scripts/ssc-cgl/static-gk/move.ts --apply    # keep them, and write the files
 *
 * Run it from the folder that holds the production `.env.local` (it needs SUPABASE_DB_URL and
 * the service-role key). Take a backup first (npm run db:backup).
 *
 * THREE things move together, so a re-commit of a shift cannot undo the move (the scripts/ssc-cgl
 * reshape.ts contract): the bank (one transaction), the committed transcripts (the source of
 * record), and the catalog, which gains the Static GK subject. A transcript block joins its bank
 * row by source_file + source_row; a block skipped at commit as a repeat follows the row it
 * repeats (repeats.json). Any prefix that matches no row or two, any block that is not Current
 * Affairs, and any row with no transcript is a REFUSAL, checked before anything is kept.
 * Re-running after --apply is a no-op.
 */
import { join } from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { Client } from "pg";
import { CATALOG, CHSL_EXAM, CPO_EXAM, EXAMS, SHIFTS, TRANSCRIPTS } from "../config";
import { formatAuthored, type Authored, type Repeat } from "../recut";
import { addStaticGkToCatalog, resolveMoves, retagBlocks, type Decisions, type Move } from "./lib";
import { STATIC_GK, STATIC_GK_SUBJECT, type Target } from "./taxonomy";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const HERE = __dirname;
const SSC = join(HERE, "..");
const EXAM_IDS = [EXAMS[1].id, EXAMS[2].id, CHSL_EXAM.id, CPO_EXAM.id];

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

type Row = { id: string; exam_id: string; subject: string; subtopic_id: string | null; source_file: string | null; source_row: number | null };

async function main() {
  console.log(APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to keep) ===");
  const decisions = JSON.parse(readFileSync(join(HERE, "decisions.json"), "utf8")) as Decisions;
  const url = process.env.SUPABASE_DB_URL ?? die("SUPABASE_DB_URL is not set (run from the folder with the production .env.local)");
  const db = new Client({ connectionString: url });
  await db.connect();
  try {
    await db.query("BEGIN");
    const { rows } = await db.query<Row>(
      `select q.id, q.exam_id, s.name as subject, q.subtopic_id, q.source_file, q.source_row
         from questions q join subjects s on s.id = q.subject_id
        where q.exam_id = any($1) and s.name in ('Current Affairs', $2)
        for update of q`,
      [EXAM_IDS, STATIC_GK_SUBJECT]
    );
    const r = resolveMoves(rows, decisions);
    if (r.problems.length) die(`${r.problems.length} decision(s) do not resolve`, r.problems);
    const byId = new Map(rows.map((x) => [x.id, x]));
    console.log(`rows read: ${rows.length}; to move: ${r.moves.length}; already in ${STATIC_GK_SUBJECT}: ${r.alreadyMoved}`);

    // ---------- transcripts: resolve every block before writing anything ----------
    const fileToShift = new Map(Object.entries(SHIFTS).map(([id, s]) => [s.sourceFile, id]));
    const targetsByShift = new Map<string, Map<number, Target>>();
    const put = (sid: string, n: number, t: Target, problems: string[]) => {
      if (!targetsByShift.has(sid)) targetsByShift.set(sid, new Map());
      const m = targetsByShift.get(sid)!;
      if (m.has(n)) problems.push(`BLOCK ${sid}#${n} is named twice`);
      m.set(n, t);
    };
    const problems: string[] = [];
    const moveOf = new Map<string, Move>(r.moves.map((m) => [m.id, m]));
    for (const m of r.moves) {
      const row = byId.get(m.id)!;
      const sid = row.source_file ? fileToShift.get(row.source_file) : undefined;
      if (!sid || row.source_row == null) { problems.push(`NO TRANSCRIPT JOIN ${m.id} (${row.source_file} #${row.source_row})`); continue; }
      put(sid, Number(row.source_row), m, problems);
    }
    const repeats: Record<string, Repeat[]> = JSON.parse(readFileSync(join(SSC, "repeats.json"), "utf8"));
    let viaRepeats = 0;
    for (const [sid, list] of Object.entries(repeats)) {
      for (const rep of list) {
        const m = moveOf.get(rep.questionId);
        if (m) { put(sid, rep.number, m, problems); viaRepeats++; }
      }
    }
    if (problems.length) die(`${problems.length} row(s) have no transcript block`, problems);
    const filePlans: { path: string; text: string; changes: number }[] = [];
    for (const [sid, targets] of targetsByShift) {
      const path = join(TRANSCRIPTS, `${sid}.txt`);
      if (!existsSync(path)) { problems.push(`${sid}: transcript missing`); continue; }
      const t = retagBlocks(readFileSync(path, "utf8"), targets);
      problems.push(...t.problems.map((p) => `${sid} ${p}`));
      if (t.changes) filePlans.push({ path, text: t.text, changes: t.changes });
    }
    if (problems.length) die(`${problems.length} transcript block(s) do not resolve`, problems);
    const blocks = filePlans.reduce((s, f) => s + f.changes, 0);
    console.log(`transcripts: ${blocks} block(s) in ${filePlans.length} file(s) (${viaRepeats} repeat block(s) via repeats.json)`);

    // ---------- the bank ----------
    const perExam = new Map<string, Move[]>();
    for (const m of r.moves) perExam.set(byId.get(m.id)!.exam_id, [...(perExam.get(byId.get(m.id)!.exam_id) ?? []), m]);
    const emptied = new Set<string>();
    for (const [examId, moves] of perExam) {
      const subj = await db.query<{ id: string }>(
        `insert into subjects (exam_id, name) values ($1, $2) on conflict (exam_id, name) do update set name = excluded.name returning id`,
        [examId, STATIC_GK_SUBJECT]
      );
      const subjectId = subj.rows[0].id;
      const subtopicId = new Map<string, string>();
      const chapterId = new Map<string, string>();
      for (const [ci, c] of STATIC_GK.entries()) {
        const ch = await db.query<{ id: string }>(
          `insert into chapters (subject_id, name, order_index) values ($1, $2, $3)
           on conflict (subject_id, name) do update set order_index = excluded.order_index returning id`,
          [subjectId, c.chapter, ci + 1]
        );
        chapterId.set(c.chapter, ch.rows[0].id);
        for (const [si, s] of c.subtopics.entries()) {
          const st = await db.query<{ id: string }>(
            `insert into subtopics (chapter_id, name, order_index) values ($1, $2, $3)
             on conflict (chapter_id, name) do update set order_index = excluded.order_index returning id`,
            [ch.rows[0].id, s.name, si + 1]
          );
          subtopicId.set(`${c.chapter}|${s.name}`, st.rows[0].id);
        }
      }
      for (const m of moves) { const old = byId.get(m.id)!.subtopic_id; if (old) emptied.add(old); }
      const ids = moves.map((m) => m.id);
      const subs = moves.map((m) => subtopicId.get(`${m.chapter}|${m.subtopic}`)!);
      const chs = moves.map((m) => chapterId.get(m.chapter)!);
      const u = await db.query(
        `update questions q set subject_id = $1, chapter_id = v.chapter_id, subtopic_id = v.subtopic_id
           from unnest($2::uuid[], $3::uuid[], $4::uuid[]) as v(id, chapter_id, subtopic_id)
          where q.id = v.id`,
        [subjectId, ids, chs, subs]
      );
      if (u.rowCount !== moves.length) die(`exam ${examId}: updated ${u.rowCount} of ${moves.length} rows`);
      console.log(`  exam ${examId}: ${moves.length} row(s) moved`);
    }
    // A Current Affairs subtopic this move left with no question at all goes; nothing else points at subtopics.
    const del = await db.query<{ name: string }>(
      `delete from subtopics st where st.id = any($1) and not exists (select 1 from questions q where q.subtopic_id = st.id) returning st.name`,
      [[...emptied]]
    );
    console.log(`  emptied Current Affairs subtopics dropped: ${del.rowCount}${del.rowCount ? " (" + del.rows.map((x) => x.name).join(" · ") + ")" : ""}`);

    // ---------- catalog ----------
    const authoredPath = join(SSC, "catalog-authored.json");
    const cat = addStaticGkToCatalog(CATALOG, JSON.parse(readFileSync(authoredPath, "utf8")) as Authored & { _comment?: string });
    console.log(`catalog: ${cat.added ? `add the ${STATIC_GK_SUBJECT} subject` : "already has it"}`);

    if (!APPLY) {
      await db.query("ROLLBACK");
      console.log("\nDRY RUN: every bank write ran and was rolled back; no file written. Re-run with --apply.");
      return;
    }
    await db.query("COMMIT");
    for (const f of filePlans) writeFileSync(f.path, f.text, "utf8");
    if (cat.added) {
      writeFileSync(authoredPath, formatAuthored(cat.authored), "utf8");
      writeFileSync(join(SSC, "catalog.json"), JSON.stringify(cat.catalog, null, 2) + "\n", "utf8");
    }
    console.log("\nCOMMITTED; transcripts and catalog written. Commit the files.");
  } catch (e) {
    await db.query("ROLLBACK").catch(() => {});
    throw e;
  } finally {
    await db.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
