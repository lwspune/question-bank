/**
 * The read-only data sources behind V's question tools (lib/chat/questionToolSet.ts).
 * Questions are read with the anon client, so V can only ever see PUBLIC
 * questions. The free-answer check and its record are lib/chat/questionReveal.ts,
 * apart because they write (server only), so scripts can still use these.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { loadRepeatGroups } from "@/lib/questions/repeatQuery";
import { marksLine, repeatsLine, type PaperMark } from "./questionExtras";
import { matchPasted, pickSimilar, toVQuestion, type VQuestion } from "./questionTools";
import type { QuestionMatch } from "./questionToolSet";

const SIMILAR_POOL = 40;
const SNIPPET_CHARS = 140;
// Pasted text from a rendered page is full of maths debris ("cot ⁡ x", "d x"):
// search on its longest real words, which the stored stem also carries.
const SEARCH_WORDS = [6, 4] as const;

/**
 * `extras` (V's tools, 2026-11-16): also its marks in a printed board paper and
 * the other papers that asked it (lib/chat/questionExtras), so V can answer
 * "how many marks?" and "any other year?". Best-effort: a failed read leaves
 * the line out, and V is told to say it cannot see it, never to guess.
 */
export async function loadVQuestion(anon: SupabaseClient, id: string, opts: { extras?: boolean } = {}): Promise<VQuestion | null> {
  const [rows, marks, repeats] = await Promise.all([
    queryQuestionsByIds(anon, [id]),
    opts.extras ? loadMarksLine(anon, id) : null,
    opts.extras ? loadRepeatsLine(anon, id) : null,
  ]);
  if (!rows[0]) return null;
  const q = toVQuestion(rows[0]);
  return opts.extras ? { ...q, marks, repeats } : q;
}

type One<T> = T | T[] | null;
const one = <T,>(v: One<T>): T | null => (Array.isArray(v) ? (v[0] ?? null) : v);

type RawItem = {
  paper_id: string;
  position: number;
  printed_number: string;
  marks: number | null;
  part_of: number | null;
  paper: One<{ title: string; year: number }>;
};

/** Its marks in each published board paper that prints it (0146, parts 0147). Anon: published papers only. */
async function loadMarksLine(anon: SupabaseClient, id: string): Promise<string | null> {
  try {
    const { data, error } = await anon
      .from("board_paper_items")
      .select("paper_id, position, printed_number, marks, part_of, paper:board_papers!inner(title, year)")
      .eq("question_id", id)
      .eq("paper.published", true)
      .limit(10);
    if (error) throw new Error(error.message);
    const items: RawItem[] = data ?? [];
    // A part carries no marks: its whole question (an earlier position of the same paper) does.
    const parents = new Map<string, { printedNumber: string; marks: number }>();
    const wanted = items.filter((i) => i.part_of !== null);
    if (wanted.length > 0) {
      const { data: rows, error: e2 } = await anon
        .from("board_paper_items")
        .select("paper_id, position, printed_number, marks")
        .in("paper_id", [...new Set(wanted.map((i) => i.paper_id))])
        .in("position", [...new Set(wanted.map((i) => i.part_of as number))]);
      if (e2) throw new Error(e2.message);
      for (const r of (rows ?? []) as { paper_id: string; position: number; printed_number: string; marks: number | null }[]) {
        if (r.marks !== null) parents.set(`${r.paper_id}:${r.position}`, { printedNumber: r.printed_number, marks: Number(r.marks) });
      }
    }
    const papers: PaperMark[] = [];
    for (const i of items) {
      const paper = one(i.paper);
      if (!paper) continue;
      papers.push({
        paperTitle: paper.title,
        year: paper.year,
        printedNumber: i.printed_number,
        marks: i.marks === null ? null : Number(i.marks),
        partOf: i.part_of === null ? null : (parents.get(`${i.paper_id}:${i.part_of}`) ?? null),
      });
    }
    return marksLine(papers);
  } catch (err) {
    console.error("V: marks read failed", err);
    return null;
  }
}

async function loadRepeatsLine(anon: SupabaseClient, id: string): Promise<string | null> {
  try {
    return repeatsLine((await loadRepeatGroups(anon, [id])).get(id) ?? []);
  } catch (err) {
    console.error("V: repeats read failed", err);
    return null;
  }
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

/**
 * A question from one topic of a chapter, by the topic's name (V's chapter
 * lesson, 2026-11-21: the question to try on a part with no mistake to be
 * "like"). Same pool rules as loadSimilarId: PUBLIC, an MCQ, not part of a set.
 */
export async function loadSubtopicQuestionId(
  anon: SupabaseClient,
  chapterId: string,
  subtopic: string,
  exclude: readonly string[]
): Promise<string | null> {
  const { data: sub, error: subError } = await anon
    .from("subtopics")
    .select("id")
    .eq("chapter_id", chapterId)
    .eq("name", subtopic)
    .limit(1)
    .maybeSingle();
  if (subError) {
    console.error("V: lesson topic read failed", subError.message);
    return null;
  }
  if (!sub) return null;
  const { data, error } = await anon
    .from("questions")
    .select("id")
    .eq("subtopic_id", (sub as { id: string }).id)
    .eq("visibility", "PUBLIC")
    .eq("question_format", "mcq")
    .is("set_id", null)
    .limit(SIMILAR_POOL);
  if (error) {
    console.error("V: lesson question read failed", error.message);
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
