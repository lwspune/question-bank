/**
 * Dump the existing bank — stems + options + answer + solution — for the
 * /lws-test-ingest DEDUP gate, so a subagent can semantic-match a new paper's
 * questions against the corpus without blowing the orchestrator's context.
 *
 *   # one file per SUBJECT (a multi-subject GAT mock):
 *   npx tsx scripts/practice-paper/dump-bank.ts --subject English Geography Physics Chemistry
 *   npx tsx scripts/practice-paper/dump-bank.ts --exam MHT-CET --subject Chemistry
 *
 *   # one file per CHAPTER (a single-/multi-chapter paper):
 *   npx tsx scripts/practice-paper/dump-bank.ts --chapter <chapterId> [<chapterId> ...]
 *
 * Pulls BOTH question_kinds (pyq + practice) at every visibility the service
 * role can see, since dedup must match against the whole corpus. Writes
 * C:/tmp/bank_<key>.json as an array of
 *   { id, chapter, subtopic, stem, options:["A. ...","B. ..."], answer, solution }
 * — the exact shape the per-subject dedup agents already consume.
 *
 * Tooling for the manual dedup core (like render.ts / preview.ts), NOT a
 * committed data artifact. Pages in 1000-row windows (PostgREST caps a raw
 * .select() at 1000 rows — deriving anything past that silently truncates).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_ID } from "../practice/config"; // default NDA exam id

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const OUT_DIR = "C:/tmp";

type BankRow = {
  id: string;
  chapter: string | null;
  subtopic: string | null;
  stem: string;
  options: string[];
  answer: string | null;
  solution: string | null;
};

/** Page a question query (1000-row windows) and shape each row for dedup. */
async function dumpQuestions(
  db: SupabaseClient,
  filter: (q: any) => any,
): Promise<BankRow[]> {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await filter(
      db
        .from("questions")
        .select(
          "id, text, solution, chapter:chapters!inner(name, subject_id), subtopic:subtopics(name), options(label, text, is_correct)",
        ),
    )
      .order("id")
      .range(from, from + 999);
    if (error) throw error;
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < 1000) break;
  }
  return rows.map((r) => {
    const opts = (r.options ?? []).sort((a: any, b: any) => a.label.localeCompare(b.label));
    const correct = opts.find((o: any) => o.is_correct);
    return {
      id: r.id,
      chapter: r.chapter?.name ?? null,
      subtopic: r.subtopic?.name ?? null,
      stem: r.text,
      options: opts.map((o: any) => `${o.label}. ${o.text}`),
      answer: correct?.label ?? null,
      solution: r.solution ?? null,
    };
  });
}

function write(key: string, rows: BankRow[]) {
  const path = `${OUT_DIR}/bank_${key}.json`;
  writeFileSync(path, JSON.stringify(rows, null, 1), "utf-8");
  console.log(`  ${rows.length} rows -> ${path}`);
}

async function main() {
  loadEnv();
  const argv = process.argv.slice(2);
  const examIdx = argv.indexOf("--exam");
  const examName = examIdx >= 0 ? argv[examIdx + 1] : "NDA";
  const subjIdx = argv.indexOf("--subject");
  const chapIdx = argv.indexOf("--chapter");

  /** read the values following a flag, up to the next flag or end */
  const valsAfter = (i: number) => {
    if (i < 0) return [];
    const out: string[] = [];
    for (let j = i + 1; j < argv.length && !argv[j].startsWith("--"); j++) out.push(argv[j]);
    return out;
  };
  const subjects = valsAfter(subjIdx);
  const chapterIds = valsAfter(chapIdx);

  if (subjects.length === 0 && chapterIds.length === 0) {
    throw new Error(
      "pass --subject <name...> and/or --chapter <id...> (optionally --exam <name>, default NDA).",
    );
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // resolve exam id (default NDA constant; otherwise look up by name)
  let examId = EXAM_ID;
  if (examName !== "NDA") {
    const { data: ex } = await db.from("exams").select("id").eq("name", examName).single();
    if (!ex) throw new Error(`no exam named "${examName}"`);
    examId = ex.id as string;
  }

  if (subjects.length) {
    console.log(`Subjects under ${examName}:`);
    for (const subjectName of subjects) {
      const { data: subj } = await db
        .from("subjects").select("id").eq("exam_id", examId).eq("name", subjectName).single();
      if (!subj) throw new Error(`no subject "${subjectName}" under ${examName}`);
      const rows = await dumpQuestions(db, (q) => q.eq("chapters.subject_id", subj.id));
      write(`${slug(examName)}_${slug(subjectName)}`, rows);
    }
  }

  if (chapterIds.length) {
    console.log("Chapters:");
    for (const chapterId of chapterIds) {
      const { data: ch } = await db.from("chapters").select("name").eq("id", chapterId).single();
      const key = ch?.name ? `chapter_${slug(ch.name)}` : `chapter_${chapterId.slice(0, 8)}`;
      const rows = await dumpQuestions(db, (q) => q.eq("chapter_id", chapterId));
      write(key, rows);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
