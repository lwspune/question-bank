/**
 * Load the exam twins (migration 0220) of a set of board questions: each
 * question's links, and the linked past questions as the panel shows them.
 *
 * Runs on the server when a /board chapter or a homework day is built (both
 * cached for a day), with the anon client, so RLS shows only links whose two
 * questions are public. The panel carries the question and its options but
 * never `is_correct`: the answer stays behind the practice link, where the
 * free daily answer limit applies.
 *
 * Two PostgREST limits (CLAUDE.md pitfalls): `.in()` puts ids in the URL, so
 * sources go in chunks; and a result stops at 1000 rows without an error, so
 * each chunk is paged.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { twinPaper } from "@/lib/crossExam/paper";
import type { TwinKind, TwinLink } from "@/lib/crossExam/summary";

export type TwinTarget = {
  id: string;
  text: string;
  context: string | null;
  imageUrl: string | null;
  options: { label: string; text: string }[];
  chapterName: string;
  /** /browse filtered to this exam chapter's past questions. */
  practiseHref: string;
};

export type QuestionTwins = {
  /** Board question id -> its links (absent when it has none). */
  links: Record<string, TwinLink[]>;
  /** Linked past question id -> what the panel shows. */
  targets: Record<string, TwinTarget>;
};

const CHUNK = 150;
const PAGE = 1000;

const SELECT =
  "source_question_id, kind, target:questions!exam_twins_target_question_id_fkey(id, text, context, image_url, pyq_year, pyq_month, pyq_note, exam_id, subject_id, chapter_id, exam:exams(name), chapter:chapters(name), options(label, text))";

export async function getTwinsForQuestions(client: SupabaseClient<Database>, sourceIds: string[]): Promise<QuestionTwins> {
  const out: QuestionTwins = { links: {}, targets: {} };
  const ids = Array.from(new Set(sourceIds));
  for (let i = 0; i < ids.length; i += CHUNK) {
    const chunk = ids.slice(i, i + CHUNK);
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await page(client, chunk, from);
      if (error) throw new Error(`exam twins query: ${error.message}`);
      const rows = data ?? [];
      for (const r of rows) add(out, r);
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

function page(client: SupabaseClient<Database>, chunk: string[], from: number) {
  return client
    .from("exam_twins")
    .select(SELECT)
    .in("source_question_id", chunk)
    .order("source_question_id")
    .order("target_question_id")
    .range(from, from + PAGE - 1);
}

type Row = NonNullable<Awaited<ReturnType<typeof page>>["data"]>[number];

const KINDS: ReadonlySet<string> = new Set<TwinKind>(["exact", "numbers", "similar"]);
const isKind = (k: string): k is TwinKind => KINDS.has(k);

function add(out: QuestionTwins, r: Row) {
  const t = r.target;
  // A target the reader cannot see (made private since) arrives as null; the
  // kind is CHECKed by 0220, the guard only narrows the type.
  if (!t || !t.exam || t.pyq_year == null || !isKind(r.kind)) return;
  const { examLabel, paper, paperOrder } = twinPaper(t.exam.name, t.pyq_year, t.pyq_month, t.pyq_note);
  (out.links[r.source_question_id] ??= []).push({
    targetId: t.id,
    kind: r.kind,
    examName: t.exam.name,
    examLabel,
    paper,
    paperOrder,
  });
  if (!out.targets[t.id]) {
    const q = new URLSearchParams({ examId: t.exam_id, subjectId: t.subject_id, chapterIds: t.chapter_id, kind: "pyq" });
    out.targets[t.id] = {
      id: t.id,
      text: t.text,
      context: t.context,
      imageUrl: t.image_url,
      options: [...(t.options ?? [])].sort((a, b) => a.label.localeCompare(b.label)),
      chapterName: t.chapter?.name ?? "",
      practiseHref: `/browse?${q.toString()}`,
    };
  }
}
