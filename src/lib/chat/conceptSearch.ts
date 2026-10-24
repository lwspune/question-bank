/**
 * V explains a concept, a definition or a derivation (V_SPEC.md step 2,
 * 2026-10-22): the `explain_concept` tool.
 *
 * The knowledge ladder, in order:
 *   1. our question bank's model answers (a board paper often asks the very
 *      thing: "Derive an expression for electric potential due to a point
 *      charge" is an MH HSC 12 question word for word), searched through the
 *      full-text index by v_search_answers (migration 0177), the student's exam
 *      and the page's subject ranked first;
 *   2. the notes' concept cards (the generated index, notesConcepts.generated.ts);
 *   3. only when both have nothing: a short general explanation from the
 *      model's own knowledge (owner, 2026-10-22). It opened with a fixed
 *      "General explanation (not from our question bank):" line until
 *      2026-10-23, when the owner dropped it: it told the student nothing.
 *      A FAILED search is not "nothing": V must not fall back to its own
 *      knowledge because the database was slow.
 *
 * A concept answer does not spend a free answer (owner, 2026-10-22): it
 * answers a topic, not the question on the student's screen.
 *
 * Pure: the bank search, the chapter list and the notes loader are passed in.
 * Spec: tests/chat-concept-search.test.ts.
 */
import type { VTool } from "./anthropic";
import { chapterPath, examsNamed, type ChapterSearchRow } from "./chapterSearch";


const MAX_WORDS = 6;
const QUESTION_CHARS = 300;
const ANSWER_CHARS = 1500;
const NOTES_CHARS = 900;
const MAX_NOTES = 2;

// What a student wraps a topic in. "point" stays ("point charge"); "points" goes ("imp points").
const FILLER = new Set(
  (
    "the and for with from into this that these those what which who why how does did can could would should " +
    "you your please pls plz tell give explain explanation define definition derive derivation expression formula " +
    "imp important points question questions answer answers notes short long mark marks about its are was were due " +
    "also any all some write state meaning mean means"
  ).split(" ")
);

/** The topic's search words: lowercase, 3+ characters, no bare numbers, no filler, no repeats, at most 6. */
export function conceptWords(topic: string): string[] {
  const out: string[] = [];
  for (const w of topic.toLowerCase().match(/[a-z0-9]+/g) ?? []) {
    if (w.length < 3 || /^\d+$/.test(w) || FILLER.has(w) || out.includes(w)) continue;
    out.push(w);
    if (out.length === MAX_WORDS) break;
  }
  return out;
}

/** A to_tsquery string needing every word. The words are [a-z0-9] only, so nothing can break the syntax. */
export function allWordsQuery(words: readonly string[]): string {
  return words.join(" & ");
}

/** One concept card in the notes index (scripts/chat/gen-notes-data.ts). */
export type NotesConceptEntry = {
  /** "<subjectRoute>/<chapterSlug>": the notes data loader's key. */
  key: string;
  subtopic: string;
  concept: string;
  name: string;
  subtopicTitle: string;
  examName: string;
};

/**
 * The generated index's compact shape: per chapter its key and exam, then per
 * subtopic its slug and title, then each card's slug and name. Flat, the 5,361
 * cards of 2026-10-22 were 1.3 MB; this way the repeated names are written once.
 */
export type NotesConceptTree = readonly (readonly [
  key: string,
  examName: string,
  subtopics: readonly (readonly [subtopic: string, title: string, concepts: readonly (readonly [slug: string, name: string])[]])[],
])[];

export function expandNotesConcepts(tree: NotesConceptTree): NotesConceptEntry[] {
  return tree.flatMap(([key, examName, subs]) =>
    subs.flatMap(([subtopic, subtopicTitle, cards]) =>
      cards.map(([concept, name]) => ({ key, subtopic, concept, name, subtopicTitle, examName }))
    )
  );
}

export function compactNotesConcepts(entries: readonly NotesConceptEntry[]): NotesConceptTree {
  const tree: [string, string, [string, string, [string, string][]][]][] = [];
  for (const e of entries) {
    let ch = tree[tree.length - 1];
    if (!ch || ch[0] !== e.key) tree.push((ch = [e.key, e.examName, []]));
    let sub = ch[2][ch[2].length - 1];
    if (!sub || sub[0] !== e.subtopic) ch[2].push((sub = [e.subtopic, e.subtopicTitle, []]));
    sub[2].push([e.concept, e.name]);
  }
  return tree;
}

/** The concept index of the notes registry, chapter by chapter (the generator writes it; a test pins it). */
export function notesConceptIndex(
  chapters: readonly {
    subjectRoute: string;
    chapterSlug: string;
    examName: string;
    notes: Record<string, { title: string; concepts: readonly { slug: string; name: string }[] }>;
  }[]
): NotesConceptEntry[] {
  const out: NotesConceptEntry[] = [];
  const seen = new Set<string>();
  for (const ch of chapters) {
    const key = `${ch.subjectRoute}/${ch.chapterSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    for (const [subtopic, note] of Object.entries(ch.notes)) {
      for (const c of note.concepts) {
        out.push({ key, subtopic, concept: c.slug, name: c.name, subtopicTitle: note.title, examName: ch.examName });
      }
    }
  }
  return out;
}

function nameWords(s: string): string[] {
  return s.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

/** A search word lands on a name word: equal, or (4+ letters) sharing a root of up to 6, so "diamagnetic" finds "Diamagnetism". */
function sameRoot(w: string, nw: string): boolean {
  if (w === nw) return true;
  if (w.length < 4 || nw.length < 4) return false;
  return nw.startsWith(w.slice(0, 6)) || w.startsWith(nw.slice(0, 6));
}

/** Concept cards whose name or subtopic title holds every word, the student's exams first, at most 2. */
export function rankNotesConcepts(
  words: readonly string[],
  index: readonly NotesConceptEntry[],
  examNames: readonly string[] = []
): NotesConceptEntry[] {
  if (words.length === 0) return [];
  const hits = index.filter((e) => {
    const ws = [...nameWords(e.name), ...nameWords(e.subtopicTitle)];
    return words.every((w) => ws.some((nw) => sameRoot(w, nw)));
  });
  const mine = hits.filter((e) => examNames.includes(e.examName));
  return [...mine, ...hits.filter((e) => !examNames.includes(e.examName))].slice(0, MAX_NOTES);
}

/** A model answer from v_search_answers. */
export type BankAnswer = {
  examName: string;
  chapterName: string;
  chapterId: string | null;
  format: string;
  text: string;
  solution: string;
};

function trimTo(s: string, n: number): string {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n)}...` : one;
}

export const NOTHING_FOUND =
  `Nothing in our question bank or notes matches this. If it is a concept, definition or derivation from the syllabus, ` +
  `give a short general explanation from what you know. ` +
  `Never solve a new numeric problem this way, never give an answer to a question from a paper, and never use it for PYQ Vault, prices or exam dates.`;

const SEARCH_FAILED =
  "Could not search the question bank just now. Do not explain from your own knowledge: tell the student to ask again in a minute.";

export function formatConceptResult(found: {
  bank: (BankAnswer & { path: string | null })[];
  notes: { name: string; path: string; text: string }[];
}): string {
  if (found.bank.length === 0 && found.notes.length === 0) return NOTHING_FOUND;
  const lines: string[] = [];
  if (found.bank.length > 0) {
    lines.push(
      "Model answers from our question bank. Explain from these in your own short words, in the student's language, and link the chapter page. Do not mention the other questions."
    );
    found.bank.forEach((a, i) => {
      lines.push(`${i + 1}. ${a.examName}, ${a.chapterName}${a.path ? ` (${a.path})` : ""}`);
      lines.push(`Question: ${trimTo(a.text, QUESTION_CHARS)}`);
      lines.push(`Model answer: ${trimTo(a.solution, ANSWER_CHARS)}`);
    });
  }
  if (found.notes.length > 0) {
    lines.push("From our notes. Explain from these and link the notes page:");
    for (const n of found.notes) lines.push(`${n.name} (${n.path}): ${trimTo(n.text, NOTES_CHARS)}`);
  }
  return lines.join("\n");
}

export type ConceptToolDeps = {
  /** v_search_answers: a to_tsquery string, the exam names to rank first, the subject to rank first. */
  searchBank: (query: string, examNames: string[], subjectName: string | null) => Promise<BankAnswer[]>;
  loadChapters: () => Promise<readonly ChapterSearchRow[]>;
  /** The notes concept index, loaded on the first concept question (it is large). */
  loadNotesIndex: () => Promise<readonly NotesConceptEntry[]>;
  /** The concept card's teaching text, read from its chapter alone; null when it cannot be read. */
  loadNotesConcept: (entry: NotesConceptEntry) => Promise<string | null>;
  /** The exam and subject of the page the student asked from. */
  page: { examName: string; subjectName?: string } | null;
  onPaths: (paths: string[]) => void;
};

export function conceptTool(d: ConceptToolDeps): VTool {
  return {
    name: "explain_concept",
    logResult: true,
    description:
      "Explain a concept, definition, law, formula or derivation the student asks about (not a whole question with options: use find_question for that). " +
      "Give the topic in 1 to 5 key words (topic) and the exam if known (exam). Returns model answers from our question bank or our notes, " +
      "or says nothing was found.",
    input_schema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "The topic in key words, e.g. 'electric potential point charge' or 'radius of gyration'." },
        exam: { type: "string", description: "The student's exam if known, e.g. 'MH HSC 12', 'CBSE Class 12', 'NEET'." },
      },
      required: ["topic"],
    },
    run: async (input) => {
      const i = (input ?? {}) as { topic?: unknown; exam?: unknown };
      const words = conceptWords(typeof i.topic === "string" ? i.topic : "");
      if (words.length === 0) return "No topic words given. Ask the student which concept they want explained.";

      const rows = await d.loadChapters().catch(() => [] as ChapterSearchRow[]);
      const named = typeof i.exam === "string" && i.exam.trim() ? examsNamed(rows, i.exam) : [];
      const examNames = (named.length > 0 ? named : d.page ? examsNamed(rows, d.page.examName) : []).map((e) => e.name);
      const subjectName = d.page?.subjectName ?? null;

      let bank: BankAnswer[];
      try {
        bank = await d.searchBank(allWordsQuery(words), examNames, subjectName);
      } catch (err) {
        console.error("V: explain_concept search failed", err);
        return SEARCH_FAILED;
      }
      const pathOf = new Map(rows.filter((r) => r.chapterId).map((r) => [r.chapterId!, chapterPath(r)]));
      const withPaths = bank.map((a) => ({ ...a, path: a.chapterId ? (pathOf.get(a.chapterId) ?? null) : null }));

      const notes: { name: string; path: string; text: string }[] = [];
      if (withPaths.length === 0) {
        const index = await d.loadNotesIndex().catch((err) => {
          console.error("V: notes concept index unavailable", err);
          return [] as NotesConceptEntry[];
        });
        for (const e of rankNotesConcepts(words, index, examNames)) {
          const text = await d.loadNotesConcept(e);
          if (text) notes.push({ name: e.name, path: `/notes/${e.key}/${e.subtopic}`, text });
        }
      }
      d.onPaths([...withPaths.flatMap((a) => (a.path ? [a.path] : [])), ...notes.map((n) => n.path)]);
      return formatConceptResult({ bank: withPaths, notes });
    },
  };
}
