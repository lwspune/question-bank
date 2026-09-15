/**
 * Reads for the Current-Affairs CLIs.
 *
 * One loader, three callers, so the brief, the audit and the hindsight run can
 * never disagree about what "the Current-Affairs corpus" is.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CaRow } from "@/lib/currentAffairs/types";
import { EXAM_ID, SUBJECT_NAME } from "./config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** PostgREST truncates a bare `.select()` at 1000 rows with NO error. */
const PAGE = 1000;

export function admin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (.env.local)."
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

type Raw = {
  id: string;
  text: string;
  solution: string | null;
  pyq_year: number | null;
  pyq_month: string | null;
  source_file: string | null;
  chapters: { name: string } | null;
};

async function subjectId(db: SupabaseClient): Promise<string> {
  const { data, error } = await db
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT_NAME)
    .maybeSingle();
  if (error) throw new Error(`subject lookup failed: ${JSON.stringify(error)}`);
  if (!data) throw new Error(`No ${SUBJECT_NAME} subject under exam ${EXAM_ID}.`);
  return (data as { id: string }).id;
}

const SELECT = "id, text, solution, pyq_year, pyq_month, source_file, chapters(name)";

async function loadRows(
  db: SupabaseClient,
  eq: Record<string, string>
): Promise<CaRow[]> {
  const sid = await subjectId(db);
  const out: CaRow[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = db.from("questions").select(SELECT).eq("subject_id", sid);
    for (const [col, val] of Object.entries(eq)) q = q.eq(col, val);
    const { data, error } = await q.order("id").range(from, from + PAGE - 1);
    if (error) throw new Error(`question read failed: ${JSON.stringify(error)}`);
    const batch = (data ?? []) as unknown as Raw[];
    for (const r of batch) {
      out.push({
        id: r.id,
        // A row with no chapter would otherwise vanish from every per-chapter
        // total silently; name it so it shows up as its own line instead.
        chapter: r.chapters?.name ?? "(unfiled)",
        text: r.text,
        solution: r.solution,
        pyqYear: r.pyq_year,
        pyqMonth: r.pyq_month,
        sourceFile: r.source_file,
      });
    }
    if (batch.length < PAGE) return out;
  }
}

/**
 * The PYQ history the blueprint is derived from.
 *
 * PYQ only, and that is the whole point: practice rows are what WE chose to
 * author, so deriving the target from them would score a pool against its own
 * predecessor's habits rather than against the exam.
 */
export function loadPyqHistory(db: SupabaseClient): Promise<CaRow[]> {
  return loadRows(db, { question_kind: "pyq" });
}

/** One authored pool, or one real paper's Current-Affairs rows, by `source_file`. */
export function loadBySourceFile(db: SupabaseClient, sourceFile: string): Promise<CaRow[]> {
  return loadRows(db, { source_file: sourceFile });
}
