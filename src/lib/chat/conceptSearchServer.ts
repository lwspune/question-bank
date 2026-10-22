/**
 * The reads behind V's explain_concept tool (lib/chat/conceptSearch.ts):
 *   searchBankAnswers  v_search_answers (migration 0177) with the ANON client,
 *                      so only PUBLIC questions; THROWS on a failed read, so the
 *                      tool can tell an outage from "nothing found"
 *   loadNotesConceptText  one concept card's teaching text, read from its
 *                      chapter alone through the generated loader map
 * Not "server-only": V's test runner (scripts/chat/eval/run.ts) uses both.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { expandNotesConcepts, type BankAnswer, type ConceptToolDeps, type NotesConceptEntry } from "./conceptSearch";
import { NOTES_DATA_LOADERS } from "./notesData.generated";

type Row = { exam_name: string; chapter_id: string | null; chapter_name: string; question_format: string; text: string; solution: string };

export async function searchBankAnswers(
  anon: SupabaseClient,
  query: string,
  examNames: string[],
  subjectName: string | null
): Promise<BankAnswer[]> {
  const { data, error } = await anon.rpc("v_search_answers", {
    p_query: query,
    p_exam_names: examNames,
    p_subject_name: subjectName,
    p_limit: 3,
  });
  if (error) throw new Error(`v_search_answers: ${error.message}`);
  return ((data ?? []) as Row[]).map((r) => ({
    examName: r.exam_name,
    chapterName: r.chapter_name,
    chapterId: r.chapter_id,
    format: r.question_format,
    text: r.text,
    solution: r.solution,
  }));
}

let notesIndex: Promise<NotesConceptEntry[]> | null = null;

/** The notes concept index, imported on the first concept question and kept (it is large). A failed import is retried. */
export function loadNotesConceptIndex(): Promise<NotesConceptEntry[]> {
  notesIndex ??= import("./notesConcepts.generated")
    .then((m) => expandNotesConcepts(m.NOTES_CONCEPT_TREE))
    .catch((err) => {
      notesIndex = null;
      throw err;
    });
  return notesIndex;
}

/** The data sources of V's explain_concept tool, for the route and the test runner alike. */
export function conceptSources(anon: SupabaseClient): Pick<ConceptToolDeps, "searchBank" | "loadNotesIndex" | "loadNotesConcept"> {
  return {
    searchBank: (query, examNames, subjectName) => searchBankAnswers(anon, query, examNames, subjectName),
    loadNotesIndex: loadNotesConceptIndex,
    loadNotesConcept: loadNotesConceptText,
  };
}

const plain = (s: string) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

export async function loadNotesConceptText(entry: NotesConceptEntry): Promise<string | null> {
  const load = NOTES_DATA_LOADERS[entry.key];
  if (!load) return null;
  try {
    const concept = (await load())[entry.subtopic]?.concepts.find((c) => c.slug === entry.concept);
    if (!concept) return null;
    const parts = [plain(concept.definition), plain(concept.intuition)];
    if (concept.kind === "formula" && concept.formula?.latex) parts.push(`Formula: ${concept.formula.latex}`);
    return parts.filter(Boolean).join(" ");
  } catch (err) {
    console.error("V: notes chapter unavailable", entry.key, err);
    return null;
  }
}
