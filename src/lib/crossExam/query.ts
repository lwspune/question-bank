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
 * Both PostgREST limits (ids in the URL, the silent 1000-row cap) are handled
 * by readInChunks.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { twinPaper } from "@/lib/crossExam/paper";
import { readInChunks } from "@/lib/supabase/readInChunks";
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

const SELECT =
  "source_question_id, kind, target:questions!exam_twins_target_question_id_fkey(id, text, context, image_url, pyq_year, pyq_month, pyq_note, exam_id, subject_id, chapter_id, exam:exams(name), chapter:chapters(name), options(label, text))";

export async function getTwinsForQuestions(client: SupabaseClient<Database>, sourceIds: string[]): Promise<QuestionTwins> {
  const out: QuestionTwins = { links: {}, targets: {} };
  // (source, target) is the primary key, so the order is unique, as paging needs.
  const rows = await readInChunks(sourceIds, (ids, from, to) => page(client, ids, from, to));
  for (const r of rows) add(out, r);
  return out;
}

function page(client: SupabaseClient<Database>, ids: string[], from: number, to: number) {
  return client
    .from("exam_twins")
    .select(SELECT)
    .in("source_question_id", ids)
    .order("source_question_id")
    .order("target_question_id")
    .range(from, to);
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
