/**
 * The read-only data sources behind V's question tools (lib/chat/questionToolSet.ts).
 * Questions are read with the anon client, so V can only ever see PUBLIC
 * questions. The free-answer check and its record are lib/chat/questionReveal.ts,
 * apart because they write (server only), so scripts can still use these.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { matchPasted, pickSimilar, toVQuestion, type VQuestion } from "./questionTools";
import type { QuestionMatch } from "./questionToolSet";

const SIMILAR_POOL = 40;
const SNIPPET_CHARS = 140;
// Pasted text from a rendered page is full of maths debris ("cot ⁡ x", "d x"):
// search on its longest real words, which the stored stem also carries.
const SEARCH_WORDS = [6, 4] as const;

export async function loadVQuestion(anon: SupabaseClient, id: string): Promise<VQuestion | null> {
  const rows = await queryQuestionsByIds(anon, [id]);
  return rows[0] ? toVQuestion(rows[0]) : null;
}

/** A PUBLIC single-answer question from the same subtopic, not this one and not one opened today. */
export async function loadSimilarId(anon: SupabaseClient, q: VQuestion, exclude: readonly string[]): Promise<string | null> {
  if (!q.subtopicId) return null;
  const { data, error } = await anon
    .from("questions")
    .select("id")
    .eq("subtopic_id", q.subtopicId)
    .eq("visibility", "PUBLIC")
    .eq("question_format", "mcq")
    .is("set_id", null)
    .neq("id", q.id)
    .limit(SIMILAR_POOL);
  if (error) {
    console.error("V: similar question read failed", error.message);
    return null;
  }
  return pickSimilar(((data ?? []) as { id: string }[]).map((r) => r.id), new Set(exclude));
}

/** The search words of pasted text: its longest distinct real words, longest first. */
export function searchWordsOf(text: string, n: number): string[] {
  const words = [...new Set((text.toLowerCase().match(/[a-z]{5,}/g) ?? []))];
  return words.sort((a, b) => b.length - a.length).slice(0, n);
}

const CHAPTER_POOL = 1000;
const FTS_POOL = 30;

function snippetOf(text: string): string {
  return text.length > SNIPPET_CHARS ? `${text.slice(0, SNIPPET_CHARS)}...` : text;
}

/**
 * The bank questions a pasted text most likely is, best first. Within the
 * page's chapter when there is one: a paste usually comes from the page the
 * student is on, and a chapter is a few hundred stems, few enough to compare
 * every one (matchPasted). Elsewhere, or when the chapter holds no match, a
 * word search narrows the bank first, and its hits must still pass
 * matchPasted, so a stray word match is never offered. "No match", not "no
 * rows": the chapter read stops at CHAPTER_POOL, and SSC CGL English
 * Vocabulary passed it (1,036 PUBLIC, 2026-10-30), so a pasted stem can be one
 * the read never returned.
 */
export async function searchVQuestions(anon: SupabaseClient, text: string, chapterId: string | null = null): Promise<QuestionMatch[]> {
  type Row = { id: string; text: string; chapter: { name: string } | null; exam: { name: string } | null };
  const columns = "id, text, chapter:chapters(name), exam:exams(name)";
  let rows: Row[] = [];
  if (chapterId) {
    const { data, error } = await anon
      .from("questions")
      .select(columns)
      .eq("chapter_id", chapterId)
      .eq("visibility", "PUBLIC")
      .limit(CHAPTER_POOL);
    if (error) console.error("V: chapter question read failed", error.message);
    rows = (data ?? []) as unknown as Row[];
  }
  let ids = matchPasted(text, rows);
  if (ids.length === 0) {
    for (const n of SEARCH_WORDS) {
      const words = searchWordsOf(text, n);
      if (words.length < 2) break;
      const { data, error } = await anon
        .from("questions")
        .select(columns)
        .eq("visibility", "PUBLIC")
        .textSearch("search_vector", words.join(" "), { type: "plain", config: "english" })
        .limit(FTS_POOL);
      if (error) {
        console.error("V: question search failed", error.message);
        break;
      }
      rows = (data ?? []) as unknown as Row[];
      if (rows.length > 0) break;
    }
    ids = matchPasted(text, rows);
  }
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => {
    const r = byId.get(id)!;
    return { id, snippet: snippetOf(r.text), where: [r.exam?.name, r.chapter?.name].filter(Boolean).join(", ") };
  });
}
