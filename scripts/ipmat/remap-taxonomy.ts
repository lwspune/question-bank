/**
 * Re-point the loaded IPMAT questions at the NDA/CDS-style subject axis.
 *
 *   npx tsx scripts/ipmat/remap-taxonomy.ts            # dry run
 *   npx tsx scripts/ipmat/remap-taxonomy.ts -- --apply
 *
 * A one-off, but written to be safe to re-run: it re-derives the target for
 * every row from `data/build` + `taxonomy.ts` and only writes where the row is
 * not already there, so a second run reports 0 moves.
 *
 * WHY NOT JUST RE-RUN commit.ts. `commitStaged` upserts with
 * `ignoreDuplicates: true`, i.e. ON CONFLICT **DO NOTHING**. Taxonomy is not
 * part of `content_hash`, so every row already exists by hash and a re-run
 * skips all 1,418 and changes nothing.
 *
 * WHY NOT DELETE AND RELOAD. It would work — everything is PRIVATE and
 * `data/build` is frozen — but it would discard `image_url` on 58 questions and
 * 28 options, forcing a re-upload of 86 blobs and orphaning the old ones. This
 * moves the taxonomy and leaves every other column untouched.
 *
 * THE ORDER IS THE WHOLE TRICK, and the FKs dictate it:
 *
 *   questions.subject_id  -> subjects   RESTRICT   (NOT NULL)
 *   questions.chapter_id  -> chapters   RESTRICT   (NOT NULL)
 *   questions.subtopic_id -> subtopics  SET NULL   (nullable)
 *   chapters.subject_id   -> subjects   CASCADE
 *   subtopics.chapter_id  -> chapters   CASCADE
 *
 * So: create every target FIRST, then move the questions, then delete the old
 * subjects last. Deleting a subtopic before its questions move would SET NULL
 * their `subtopic_id` **silently** — no error, no RESTRICT, just a corpus that
 * has quietly lost its subtopics. RESTRICT on subject_id/chapter_id is the only
 * reason a mistake in the other two would be loud.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { IPMAT_EXAMS, parsePaperFileName, sourceFileFor, type IpmatExamSlug } from "./config";
import { IPMAT_SUBJECTS, resolveTaxonomy } from "./taxonomy";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");

function loadEnv() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Target = { subject: string; chapter: string; subtopic: string };

/** key = `${source_file}#${question_number}` -> where the row should end up. */
function desiredTargets(): Map<string, Target> {
  const out = new Map<string, Target>();
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    const paper = parsePaperFileName(f.replace(/\.json$/, ".html"));
    if (!paper) throw new Error(`unrecognised file in data/build: ${f}`);
    for (const r of JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]) {
      if (r.reconstructed || r.dropped || r.problems.length) continue;
      const t = resolveTaxonomy(r.sourceTopic, r.sourceSubTopic);
      if (!t) throw new Error(`no taxonomy for ${r.sourceTopic} > ${r.sourceSubTopic}`);
      out.set(`${sourceFileFor(paper.exam, paper.year, paper.section)}#${r.questionNumber}`, t);
    }
  }
  return out;
}

async function findOrCreate(
  client: SupabaseClient,
  table: "subjects" | "chapters" | "subtopics",
  match: Record<string, string>,
  apply: boolean
): Promise<string | null> {
  const q = client.from(table).select("id");
  for (const [k, v] of Object.entries(match)) q.eq(k, v);
  const { data, error } = await q.limit(1).maybeSingle();
  if (error) throw new Error(`${table} lookup failed: ${error.message}`);
  if (data) return data.id as string;
  if (!apply) return null;
  const { data: made, error: iErr } = await client.from(table).insert(match).select("id").single();
  if (iErr) throw new Error(`${table} insert failed (${JSON.stringify(match)}): ${iErr.message}`);
  return made.id as string;
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false } });
  const targets = desiredTargets();
  console.log(`${apply ? "REMAPPING" : "DRY RUN"}: ${targets.size} rows\n`);

  // ---- exam ids
  const examId = new Map<IpmatExamSlug, string>();
  for (const e of IPMAT_EXAMS) {
    const { data, error } = await client.from("exams").select("id").eq("name", e.examName).limit(1).maybeSingle();
    if (error) throw new Error(`exam lookup failed: ${error.message}`);
    if (!data) throw new Error(`exam not found: ${e.examName} — has commit.ts run?`);
    examId.set(e.slug, data.id as string);
  }

  // ---- STEP 1: create every target subject / chapter / subtopic FIRST
  console.log("step 1 — ensure targets exist");
  const subjectId = new Map<string, string>(); // `${exam}|${subject}`
  const chapterId = new Map<string, string>(); // `${exam}|${subject}|${chapter}`
  const subtopicId = new Map<string, string>(); // `${exam}|${subject}|${chapter}|${subtopic}`
  let missing = 0;

  for (const e of IPMAT_EXAMS) {
    for (const subject of IPMAT_SUBJECTS) {
      const sk = `${e.slug}|${subject}`;
      const match = { exam_id: examId.get(e.slug)!, name: subject };
      const before = await findOrCreate(client, "subjects", match, false);
      // Counted on ABSENCE, not on a returned id: in a dry run findOrCreate
      // returns null for a missing row, so counting creations under-reported
      // the work as zero.
      if (!before) missing++;
      const id = before ?? (await findOrCreate(client, "subjects", match, apply));
      if (id) subjectId.set(sk, id);
    }
  }

  // Only the (exam, subject, chapter, subtopic) combinations actually used.
  const used = new Set<string>();
  for (const [rowKey, t] of targets) {
    const exam = IPMAT_EXAMS.find((e) => rowKey.startsWith(`ipmat/${e.slug}-`))!;
    used.add(`${exam.slug}|${t.subject}|${t.chapter}|${t.subtopic}`);
  }
  for (const combo of [...used].sort()) {
    const [slug, subject, chapter, subtopic] = combo.split("|");
    const sid = subjectId.get(`${slug}|${subject}`);
    if (!sid) continue; // dry run, subject not created yet
    const ck = `${slug}|${subject}|${chapter}`;
    if (!chapterId.has(ck)) {
      const match = { subject_id: sid, name: chapter };
      const before = await findOrCreate(client, "chapters", match, false);
      if (!before) missing++;
      const id = before ?? (await findOrCreate(client, "chapters", match, apply));
      if (id) chapterId.set(ck, id);
    }
    const cid = chapterId.get(ck);
    if (!cid) continue;
    const stk = `${ck}|${subtopic}`;
    if (!subtopicId.has(stk)) {
      const match = { chapter_id: cid, name: subtopic };
      const before = await findOrCreate(client, "subtopics", match, false);
      if (!before) missing++;
      const id = before ?? (await findOrCreate(client, "subtopics", match, apply));
      if (id) subtopicId.set(stk, id);
    }
  }
  console.log(`  ${apply ? "created" : "MISSING, would create"} ${missing} taxonomy rows`);
  console.log(`  subjects ${subjectId.size} | chapters ${chapterId.size} | subtopics ${subtopicId.size}`);

  if (!apply) {
    console.log(
      "\n  NOTE: that count is a FLOOR. A chapter or subtopic under a subject that does not"
    );
    console.log(
      "  exist yet cannot be counted here, because its parent id is unknown until the subject"
    );
    console.log("  is created. Only --apply can report the true total.");
    console.log(`\n[dry run] nothing written. Would move ${targets.size} questions, then delete the old subjects.`);
    return;
  }

  // ---- STEP 2: move the questions
  console.log("\nstep 2 — move the questions");
  let moved = 0;
  let alreadyThere = 0;
  const failures: string[] = [];

  for (const e of IPMAT_EXAMS) {
    const eid = examId.get(e.slug)!;
    // Paged read: a bare select is silently capped at 1000 rows by PostgREST.
    const rows: { id: string; source_file: string | null; question_number: string | null; chapter_id: string; subtopic_id: string | null; subject_id: string }[] = [];
    for (let from = 0; ; from += 500) {
      const { data, error } = await client
        .from("questions")
        .select("id, source_file, question_number, chapter_id, subtopic_id, subject_id")
        .eq("exam_id", eid)
        .order("source_file")
        .order("question_number")
        .range(from, from + 499);
      if (error) throw new Error(`read failed: ${error.message}`);
      if (!data || data.length === 0) break;
      rows.push(...(data as typeof rows));
      if (data.length < 500) break;
    }

    for (const row of rows) {
      const t = targets.get(`${row.source_file}#${row.question_number}`);
      if (!t) {
        failures.push(`${row.source_file}#${row.question_number}: no target in data/build`);
        continue;
      }
      const sid = subjectId.get(`${e.slug}|${t.subject}`);
      const cid = chapterId.get(`${e.slug}|${t.subject}|${t.chapter}`);
      const stid = subtopicId.get(`${e.slug}|${t.subject}|${t.chapter}|${t.subtopic}`);
      if (!sid || !cid || !stid) {
        failures.push(`${row.source_file}#${row.question_number}: target ids missing for ${t.subject}/${t.chapter}/${t.subtopic}`);
        continue;
      }
      if (row.subject_id === sid && row.chapter_id === cid && row.subtopic_id === stid) {
        alreadyThere++;
        continue;
      }
      const { error } = await client
        .from("questions")
        .update({ subject_id: sid, chapter_id: cid, subtopic_id: stid })
        .eq("id", row.id);
      if (error) failures.push(`${row.source_file}#${row.question_number}: ${error.message}`);
      else moved++;
    }
    console.log(`  ${e.slug.padEnd(14)} ${rows.length} rows read`);
  }
  console.log(`  moved ${moved} | already in place ${alreadyThere} | failed ${failures.length}`);
  for (const f of failures.slice(0, 10)) console.log(`    ${f}`);
  if (failures.length) {
    console.log("\nSTOPPING before any delete — a partial move must not be followed by a delete.");
    process.exit(1);
  }

  // ---- STEP 3: delete the now-empty old subjects (CASCADE takes their
  // chapters and subtopics). Safe only because step 2 fully succeeded:
  // subject_id and chapter_id are RESTRICT, so a still-referenced subject
  // refuses to delete rather than orphaning anything.
  console.log("\nstep 3 — delete the old subjects");
  const keep = new Set<string>(IPMAT_SUBJECTS);
  let deleted = 0;
  for (const e of IPMAT_EXAMS) {
    const { data: subs, error } = await client
      .from("subjects")
      .select("id, name")
      .eq("exam_id", examId.get(e.slug)!);
    if (error) throw new Error(`subject read failed: ${error.message}`);
    for (const s of subs ?? []) {
      if (keep.has(s.name as string)) continue;
      const { error: dErr } = await client.from("subjects").delete().eq("id", s.id);
      if (dErr) {
        console.log(`  REFUSED ${e.slug} / ${s.name}: ${dErr.message}`);
        console.log("  (RESTRICT means questions still point at it — that is the guard working)");
        process.exit(1);
      }
      deleted++;
      console.log(`  deleted ${e.slug} / ${s.name}`);
    }
  }
  console.log(`  deleted ${deleted} old subject rows (chapters + subtopics cascaded)`);

  // ---- STEP 3b: delete orphans under a subject whose NAME SURVIVED.
  //
  // Step 3 alone is not enough, and the gap was real. Two of the nine target
  // subject names already existed ("Logical Reasoning", for Rohtak and JIPMAT),
  // so those rows were kept rather than deleted — and any chapter under them
  // that the new map no longer wants survived too, with no questions left in it.
  //
  // The live instance: Rohtak carried a one-question "Linear Equations" chapter
  // under Logical Reasoning, because the exam had filed one Algebra question in
  // the LR section. The remap moved that question to Mathematics and left the
  // empty husk behind — exactly the wart this whole change exists to remove.
  //
  // Two conditions, both required. Zero questions is not sufficient on its own:
  // a chapter the map genuinely wants must never be deleted just because it is
  // momentarily empty, so the target set is checked as well.
  console.log("\nstep 3b — delete orphans under a surviving subject");
  const wantedChapters = new Set([...chapterId.keys()].map((k) => k.split("|").slice(1).join("|")));
  const wantedSubtopics = new Set([...subtopicId.keys()].map((k) => k.split("|").slice(1).join("|")));
  let orphanSubtopics = 0;
  let orphanChapters = 0;

  for (const e of IPMAT_EXAMS) {
    const { data: subs } = await client.from("subjects").select("id, name").eq("exam_id", examId.get(e.slug)!);
    for (const s of subs ?? []) {
      const { data: chs } = await client.from("chapters").select("id, name").eq("subject_id", s.id);
      for (const c of chs ?? []) {
        const { data: sts } = await client.from("subtopics").select("id, name").eq("chapter_id", c.id);
        for (const st of sts ?? []) {
          const key = `${s.name}|${c.name}|${st.name}`;
          const { count } = await client
            .from("questions")
            .select("id", { count: "exact", head: true })
            .eq("subtopic_id", st.id);
          if ((count ?? 0) > 0 || wantedSubtopics.has(key)) continue;
          const { error } = await client.from("subtopics").delete().eq("id", st.id);
          if (error) throw new Error(`orphan subtopic delete failed: ${error.message}`);
          orphanSubtopics++;
          console.log(`  deleted subtopic  ${e.slug} / ${s.name} / ${c.name} / ${st.name}`);
        }
        const key = `${s.name}|${c.name}`;
        const { count } = await client
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("chapter_id", c.id);
        if ((count ?? 0) > 0 || wantedChapters.has(key)) continue;
        const { error } = await client.from("chapters").delete().eq("id", c.id);
        if (error) throw new Error(`orphan chapter delete failed: ${error.message}`);
        orphanChapters++;
        console.log(`  deleted chapter   ${e.slug} / ${s.name} / ${c.name}`);
      }
    }
  }
  console.log(`  deleted ${orphanChapters} orphan chapter(s) and ${orphanSubtopics} orphan subtopic(s)`);

  console.log("\nnext: npx tsx scripts/ipmat/verify-load.ts");
}

void main();
