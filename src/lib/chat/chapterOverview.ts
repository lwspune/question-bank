/**
 * V's chapter_overview tool (2026-11-21): a student asked V to teach a whole
 * chapter ("bro can you teach a certain chapter i am really bad at vectors",
 * then "teach each type and at which it is applied"). V had no tool for that:
 * find_chapters linked a list of 334 questions, and explain_concept, built for
 * one concept, found nothing for "vectors types and their applications", so V
 * said our notes did not match while the MHT-CET Vectors notes chapter (6 parts,
 * 59 cards) was live.
 *
 * This tool finds the chapter (find_chapters' own search), then its notes
 * chapter by exam and chapter name (notesChapters.generated.ts), and returns the
 * parts in teaching order with each part's one-line definition and page. V maps
 * the chapter, teaches the first part, and offers the rest one part at a time.
 * A chapter with no notes (board chapters have none by design) returns its
 * subtopic names and its questions page.
 *
 * Pure: the chapter list and the notes loader are passed in.
 * Spec: tests/chat-chapter-overview.test.ts.
 */
import type { VTool } from "./anthropic";
import { chapterPath, findChapters, type ChapterHit, type ChapterSearchRow } from "./chapterSearch";

/** A notes chapter, keyed the way the bank names it (written by `npm run chat:notes-data`). */
export type NotesChapterRef = {
  /** "<subjectRoute>/<chapterSlug>": the notes data loader's key and the page path under /notes. */
  key: string;
  /** The DB exam name, e.g. "MHT-CET". */
  examName: string;
  /** The DB chapter name, e.g. "Vectors". */
  chapterName: string;
  /** Subtopic slugs in teaching order (the chapter page's order). */
  slugs: readonly string[];
};

/** What the tool reads of one notes chapter: each part's title and one-line definition. */
export type NotesChapterParts = Record<string, { title: string; oneLineDefinition: string }>;

/** The index the generator writes, from the notes registry. First registration of a key wins. */
export function notesChapterIndex(
  chapters: readonly {
    subjectRoute: string;
    chapterSlug: string;
    examName: string;
    chapter: { chapterName: string };
    slugs: readonly string[];
  }[]
): NotesChapterRef[] {
  const out: NotesChapterRef[] = [];
  const seen = new Set<string>();
  for (const c of chapters) {
    const key = `${c.subjectRoute}/${c.chapterSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ key, examName: c.examName, chapterName: c.chapter.chapterName, slugs: [...c.slugs] });
  }
  return out;
}

// Topics listed for a chapter with no notes: enough to map it, not the whole taxonomy.
const MAX_TOPICS = 12;

const TEACH =
  "Teach from this: give the student a short map of the parts in order, each with what it is used for, " +
  "then teach the first part briefly with one small example, and offer to go on one part at a time. " +
  "Link the notes chapter. Do not list the chapter's questions instead of teaching.";

function header(hit: ChapterSearchRow): string {
  return `${hit.examName} | ${hit.subjectName} | ${hit.chapterName} (${hit.questionCount} q)`;
}

export function formatChapterOverview(
  hit: ChapterSearchRow,
  notes: { ref: NotesChapterRef; parts: NotesChapterParts } | null,
  /** A notes chapter that exists but could not be read just now: still linked, never called missing. */
  unreadNotesKey: string | null = null
): string {
  const questions = chapterPath(hit);
  if (notes) {
    const lines = [header(hit), `Notes chapter: /notes/${notes.ref.key}`, `Questions: ${questions}`, "Its parts, in teaching order:"];
    let n = 0;
    for (const slug of notes.ref.slugs) {
      const part = notes.parts[slug];
      if (!part) continue;
      n += 1;
      lines.push(`${n}. ${part.title}: ${part.oneLineDefinition} (/notes/${notes.ref.key}/${slug})`);
    }
    lines.push(TEACH);
    return lines.join("\n");
  }
  const topics = (hit.subtopicNames ?? []).slice(0, MAX_TOPICS);
  const topicLine = topics.length ? ` Its topics: ${topics.join("; ")}.` : "";
  return [
    header(hit),
    `Questions: ${questions}`,
    unreadNotesKey ? `Notes chapter: /notes/${unreadNotesKey}.${topicLine}` : `No notes for this chapter on PYQ Vault.${topicLine}`,
    "Give a short general map of these topics from what you know (rule 7a), each with what it is used for, " +
      `teach the first one briefly, offer to go on one at a time, and link the ${unreadNotesKey ? "notes chapter" : "questions page"}.`,
  ].join("\n");
}

export type ChapterOverviewDeps = {
  loadChapters: () => Promise<readonly ChapterSearchRow[]>;
  notesIndex: readonly NotesChapterRef[];
  /** One notes chapter's parts, read from that chapter alone; null when it cannot be read. */
  loadNotesChapter: (key: string) => Promise<NotesChapterParts | null>;
  /** The exam and subject of the page the student asked from. */
  page: { examName: string; subjectName?: string } | null;
  onPaths: (paths: string[]) => void;
};

function distinctExams(hits: readonly ChapterHit[]): string[] {
  return [...new Set(hits.map((h) => h.examName))];
}

export function chapterOverviewTool(d: ChapterOverviewDeps): VTool {
  return {
    name: "chapter_overview",
    logResult: true,
    description:
      "Teach a whole chapter: use when the student asks to be taught a chapter, says they are weak at one, or wants an overview " +
      "of its topics ('teach me vectors', 'I am bad at thermodynamics', 'explain solid state from basics'). Give the chapter in full " +
      "words (chapter) and the exam if known (exam). Returns the chapter's parts in teaching order from our notes, with pages to link. " +
      "For one concept inside a chapter use explain_concept.",
    input_schema: {
      type: "object",
      properties: {
        chapter: { type: "string", description: "The chapter name in full words, e.g. 'vectors' or 'solid state'." },
        exam: { type: "string", description: "The student's exam if known, e.g. 'MHT-CET', 'MH HSC 12', 'NEET'." },
      },
      required: ["chapter"],
    },
    run: async (input) => {
      const i = (input ?? {}) as { chapter?: unknown; exam?: unknown };
      const chapter = typeof i.chapter === "string" ? i.chapter.trim() : "";
      if (!chapter) return "No chapter given. Ask the student which chapter they want to learn.";
      const named = typeof i.exam === "string" && i.exam.trim() ? i.exam.trim() : undefined;
      const exam = named ?? d.page?.examName;

      const rows = await d.loadChapters();
      const { hits, missedExam } = findChapters(rows, { query: chapter, exam });
      if (hits.length === 0) return "No chapter matched. Ask the student which chapter and exam they mean, or suggest /browse.";
      if (missedExam) {
        return `Nothing matched in ${missedExam}. The chapter is in: ${distinctExams(hits).join(", ")}. Tell them, and ask which exam they mean.`;
      }
      if (!exam && distinctExams(hits).length > 1) {
        return `This chapter is in several exams: ${distinctExams(hits).join(", ")}. Ask which exam they are preparing for before teaching.`;
      }

      const hit = hits[0];
      const ref = d.notesIndex.find((r) => r.examName === hit.examName && r.chapterName === hit.chapterName) ?? null;
      const parts = ref
        ? await d.loadNotesChapter(ref.key).catch((err) => {
            console.error("V: chapter_overview notes unavailable", ref.key, err);
            return null;
          })
        : null;
      const notes = ref && parts ? { ref, parts } : null;

      const paths = [chapterPath(hit)];
      if (ref) paths.push(`/notes/${ref.key}`);
      if (notes) for (const slug of notes.ref.slugs) if (notes.parts[slug]) paths.push(`/notes/${notes.ref.key}/${slug}`);
      d.onPaths(paths);
      return formatChapterOverview(hit, notes, ref && !notes ? ref.key : null);
    },
  };
}
