/**
 * Move the NDA, CDS and RRB NTPC Current Affairs questions decisions-gk-exams.json names into
 * "Static GK" (owner, 2026-11-19): the SSC move (move.ts) carried to the three other exams that
 * file GK the CDS way.
 *
 *   npx tsx scripts/ssc-cgl/static-gk/move-gk-exams.ts            # dry run: every DB write, then ROLLBACK
 *   npx tsx scripts/ssc-cgl/static-gk/move-gk-exams.ts --apply    # keep them, and write the files
 *
 * Needs SUPABASE_DB_URL (run from the folder with the production `.env.local`, or pass the
 * settings in the environment). Take a backup first (npm run db:backup).
 *
 * The bank moves in ONE transaction, and each pipeline's source of record moves with it so a
 * re-commit cannot undo it:
 *   - RRB NTPC: its committed transcripts (block = question number), as SSC's.
 *   - CDS: data/<paper>.questions.json, the file commit.ts and refile.ts read (key `number`).
 *   - NDA practice papers: scripts/practice-paper/data/<records> (key `n`).
 *   - NDA past papers from Excel uploads have no file in the repo: the bank is their only copy.
 * A JSON file is edited line by line (only the subject, chapter and subtopic lines of a moving
 * record), and the result must parse to exactly what retagRecords produced, so no file is
 * reformatted. Any unresolved prefix, any moving row with neither a pipeline file nor an
 * Excel/Word source, any record that is not Current Affairs, is a REFUSAL before anything is
 * kept. Re-running after --apply is a no-op.
 */
import { join } from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { Client } from "pg";
import { SHIFTS as RRB_SHIFTS, TRANSCRIPTS as RRB_TRANSCRIPTS } from "../../rrb-ntpc/config";
import { PAPERS as CDS_PAPERS, dataPath as cdsDataPath } from "../../cds-gs/config";
import { PAPERS as PRACTICE_PAPERS, DATA as PRACTICE_DATA } from "../../practice-paper/config";
import { resolveMoves, retagBlocks, retagRecords, type Decisions, type Move } from "./lib";
import { STATIC_GK, STATIC_GK_SUBJECT, type Target } from "./taxonomy";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const EXAMS = ["NDA", "CDS", "RRB NTPC"];
/** Sources with no file in the repo (Excel, Word or PDF uploads): the bank is the only copy. */
const UPLOAD_ONLY = /\.(xlsx|docx|pdf)$/i;

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

type Row = { id: string; exam: string; exam_id: string; subject: string; subtopic_id: string | null; source_file: string | null; question_number: string | null };
type FilePlan = { path: string; text: string; changes: number };

/** Rewrite only the subject/chapter/subtopic lines of each changed record, then prove the text parses to `want`. */
function rewriteJson(path: string, key: "n" | "number", want: unknown[], changed: Map<number, Target>): FilePlan {
  const text = readFileSync(path, "utf8");
  const lines = text.split(/(?<=\n)/);
  const body = (i: number) => lines[i].replace(/\r?\n$/, "");
  const keyRe = new RegExp(`^\\s*"${key}"\\s*:\\s*(\\d+)\\s*,?\\s*$`);
  let current: number | null = null;
  const seen = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    const k = keyRe.exec(body(i));
    if (k) { current = Number(k[1]); continue; }
    if (current === null || !changed.has(current)) continue;
    const t = changed.get(current)!;
    const f = /^(\s*)"(subject|chapter|subtopic)"\s*:\s*"((?:[^"\\]|\\.)*)"(\s*,?)\s*$/.exec(body(i));
    if (!f) continue;
    const value = f[2] === "subject" ? STATIC_GK_SUBJECT : f[2] === "chapter" ? t.chapter : t.subtopic;
    lines[i] = `${f[1]}"${f[2]}": ${JSON.stringify(value)}${f[4]}` + lines[i].slice(body(i).length);
    seen.add(`${current}:${f[2]}`);
  }
  const out = lines.join("");
  const missing = [...changed.keys()].filter((n) => !["subject", "chapter", "subtopic"].every((f) => seen.has(`${n}:${f}`)));
  if (missing.length) die(`${path}: record(s) ${missing.join(", ")} lack a subject, chapter or subtopic line to rewrite`);
  if (JSON.stringify(JSON.parse(out)) !== JSON.stringify(want)) die(`${path}: the line edit does not match the intended records`);
  return { path, text: out, changes: changed.size };
}

async function main() {
  console.log(APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to keep) ===");
  const decisions = JSON.parse(readFileSync(join(__dirname, "decisions-gk-exams.json"), "utf8")) as Decisions;
  const url = process.env.SUPABASE_DB_URL ?? die("SUPABASE_DB_URL is not set");
  const db = new Client({ connectionString: url });
  await db.connect();
  try {
    await db.query("BEGIN");
    const { rows } = await db.query<Row>(
      `select q.id, e.name as exam, q.exam_id, s.name as subject, q.subtopic_id, q.source_file, q.question_number
         from questions q join subjects s on s.id = q.subject_id join exams e on e.id = q.exam_id
        where e.name = any($1) and s.name in ('Current Affairs', $2)
        for update of q`,
      [EXAMS, STATIC_GK_SUBJECT]
    );
    const r = resolveMoves(rows, decisions);
    if (r.problems.length) die(`${r.problems.length} decision(s) do not resolve`, r.problems);
    const byId = new Map(rows.map((x) => [x.id, x]));
    console.log(`rows read: ${rows.length}; to move: ${r.moves.length}; already in ${STATIC_GK_SUBJECT}: ${r.alreadyMoved}`);

    // ---------- sources of record: resolve every row before writing anything ----------
    const rrbShift = new Map(Object.entries(RRB_SHIFTS).map(([id, s]) => [s.sourceFile, id]));
    const cdsPaper = new Map(Object.values(CDS_PAPERS).map((p) => [p.sourceFile, p]));
    const practice = new Map(Object.values(PRACTICE_PAPERS).map((p) => [p.sourceFile, p]));
    const groups = new Map<string, { kind: "rrb" | "cds" | "practice"; ref: string; targets: Map<number, Target> }>();
    const problems: string[] = [];
    let uploadOnly = 0;
    for (const m of r.moves) {
      const row = byId.get(m.id)!;
      const sf = row.source_file ?? "";
      const n = Number(String(row.question_number ?? "").replace(/\D/g, ""));
      let kind: "rrb" | "cds" | "practice" | null = null;
      let ref = "";
      if (rrbShift.has(sf)) { kind = "rrb"; ref = rrbShift.get(sf)!; }
      else if (cdsPaper.has(sf)) { kind = "cds"; ref = cdsPaper.get(sf)!.id; }
      else if (practice.has(sf)) { kind = "practice"; ref = practice.get(sf)!.slug; }
      else if (UPLOAD_ONLY.test(sf)) { uploadOnly++; continue; }
      else { problems.push(`NO SOURCE ${m.id} (${row.exam}, ${sf})`); continue; }
      if (!n) { problems.push(`NO QUESTION NUMBER ${m.id} (${sf})`); continue; }
      const k = `${kind}:${ref}`;
      if (!groups.has(k)) groups.set(k, { kind, ref, targets: new Map() });
      const g = groups.get(k)!;
      if (g.targets.has(n)) problems.push(`${k} Q${n} named twice`);
      g.targets.set(n, { chapter: m.chapter, subtopic: m.subtopic });
    }
    if (problems.length) die(`${problems.length} moving row(s) do not resolve to a source`, problems);

    const plans: FilePlan[] = [];
    for (const g of groups.values()) {
      if (g.kind === "rrb") {
        const path = join(RRB_TRANSCRIPTS, `${g.ref}.txt`);
        if (!existsSync(path)) { problems.push(`${g.ref}: transcript missing`); continue; }
        const t = retagBlocks(readFileSync(path, "utf8"), g.targets);
        problems.push(...t.problems.map((p) => `${g.ref} ${p}`));
        if (t.changes) plans.push({ path, text: t.text, changes: t.changes });
      } else if (g.kind === "cds") {
        const path = cdsDataPath(g.ref, "questions");
        const recs = JSON.parse(readFileSync(path, "utf8"));
        const t = retagRecords(recs, "number", g.targets);
        problems.push(...t.problems.map((p) => `${g.ref} ${p}`));
        if (!t.problems.length && t.changes) plans.push(rewriteJson(path, "number", t.records, g.targets));
      } else {
        const spec = PRACTICE_PAPERS[g.ref];
        const path = join(PRACTICE_DATA, spec.recordsFile);
        const recs = JSON.parse(readFileSync(path, "utf8"));
        const t = retagRecords(recs, "n", g.targets, spec.subjectName);
        problems.push(...t.problems.map((p) => `${g.ref} ${p}`));
        if (!t.problems.length && t.changes) plans.push(rewriteJson(path, "n", t.records, g.targets));
      }
    }
    if (problems.length) die(`${problems.length} source record(s) do not resolve`, problems);
    console.log(`source files: ${plans.reduce((s, f) => s + f.changes, 0)} record(s) in ${plans.length} file(s); ${uploadOnly} row(s) from uploads with no repo file`);

    // ---------- the bank: only the chapters and subtopics that receive rows ----------
    const perExam = new Map<string, Move[]>();
    for (const m of r.moves) { const e = byId.get(m.id)!.exam_id; perExam.set(e, [...(perExam.get(e) ?? []), m]); }
    const emptied = new Set<string>();
    for (const [examId, moves] of perExam) {
      const subj = await db.query<{ id: string }>(
        `insert into subjects (exam_id, name) values ($1, $2) on conflict (exam_id, name) do update set name = excluded.name returning id`,
        [examId, STATIC_GK_SUBJECT]
      );
      const subjectId = subj.rows[0].id;
      const ids = new Map<string, { chapter: string; subtopic: string }>();
      for (const [ci, c] of STATIC_GK.entries()) {
        const used = c.subtopics.filter((s) => moves.some((m) => m.chapter === c.chapter && m.subtopic === s.name));
        if (!used.length) continue;
        const ch = await db.query<{ id: string }>(
          `insert into chapters (subject_id, name, order_index) values ($1, $2, $3)
           on conflict (subject_id, name) do update set order_index = excluded.order_index returning id`,
          [subjectId, c.chapter, ci + 1]
        );
        for (const s of used) {
          const st = await db.query<{ id: string }>(
            `insert into subtopics (chapter_id, name, order_index) values ($1, $2, $3)
             on conflict (chapter_id, name) do update set order_index = excluded.order_index returning id`,
            [ch.rows[0].id, s.name, c.subtopics.indexOf(s) + 1]
          );
          ids.set(`${c.chapter}|${s.name}`, { chapter: ch.rows[0].id, subtopic: st.rows[0].id });
        }
      }
      for (const m of moves) { const old = byId.get(m.id)!.subtopic_id; if (old) emptied.add(old); }
      const u = await db.query(
        `update questions q set subject_id = $1, chapter_id = v.chapter_id, subtopic_id = v.subtopic_id
           from unnest($2::uuid[], $3::uuid[], $4::uuid[]) as v(id, chapter_id, subtopic_id)
          where q.id = v.id`,
        [subjectId, moves.map((m) => m.id), moves.map((m) => ids.get(`${m.chapter}|${m.subtopic}`)!.chapter), moves.map((m) => ids.get(`${m.chapter}|${m.subtopic}`)!.subtopic)]
      );
      if (u.rowCount !== moves.length) die(`exam ${examId}: updated ${u.rowCount} of ${moves.length} rows`);
      console.log(`  ${byId.get(moves[0].id)!.exam}: ${moves.length} row(s) moved`);
    }
    const del = await db.query<{ name: string }>(
      `delete from subtopics st where st.id = any($1) and not exists (select 1 from questions q where q.subtopic_id = st.id) returning st.name`,
      [[...emptied]]
    );
    console.log(`  emptied Current Affairs subtopics dropped: ${del.rowCount}${del.rowCount ? " (" + del.rows.map((x) => x.name).join(" · ") + ")" : ""}`);

    if (!APPLY) {
      await db.query("ROLLBACK");
      console.log("\nDRY RUN: every bank write ran and was rolled back; no file written. Re-run with --apply.");
      return;
    }
    await db.query("COMMIT");
    for (const f of plans) writeFileSync(f.path, f.text, "utf8");
    console.log("\nCOMMITTED; source files written. Commit them.");
  } catch (e) {
    await db.query("ROLLBACK").catch(() => {});
    throw e;
  } finally {
    await db.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
