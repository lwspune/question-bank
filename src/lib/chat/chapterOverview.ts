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
import type { DueQuestion } from "@/lib/drill/select";
import type { VQuestion } from "./questionTools";

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

/**
 * What the tool reads of one notes chapter: each part's title, one-line definition
 * and bank subtopic name (SubtopicNote.subtopicName), which matches a mistake to its part.
 */
export type NotesChapterParts = Record<string, { title: string; oneLineDefinition: string; subtopicName?: string }>;

/** One of the student's waiting mistakes in the chapter (the Fix list's due pool, lib/drill). */
export type ChapterMiss = { questionId: string; subtopic: string; lastWrongAt: string };

/** The latest mistake, as V's worked example. `chose` is null for a mock, which records no pick. */
export type MissExample = { text: string; options: { label: string; text: string }[]; chose: string | null; answer: string | null };

/**
 * The waiting mistakes in ONE chapter of one exam: NDA's Vectors and MHT-CET's
 * Vectors are different chapters. By chapter id when the row carries one, else
 * by exam and chapter name (the drill's refs carry both).
 */
export function chapterMissesOf(due: readonly DueQuestion[], hit: ChapterSearchRow): ChapterMiss[] {
  const inChapter = hit.chapterId
    ? (q: DueQuestion) => q.chapterId === hit.chapterId
    : (q: DueQuestion) => q.exam === hit.examName && q.chapter === hit.chapterName;
  return due.filter(inChapter).map((q) => ({ questionId: q.questionId, subtopic: q.subtopic, lastWrongAt: q.lastWrongAt }));
}

const LETTER = /^[A-E]$/;

/**
 * A mistake as V's worked example: an MCQ V can read whole. A figure V cannot
 * see, a written or a numeric question gives none, and V teaches without one.
 * The key is given because the student has already seen it: a bank answer
 * shows its solution, and a mock result shows every answer.
 */
export function toMissExample(q: VQuestion | null, chose: string | null): MissExample | null {
  if (!q || q.hasFigure || q.format !== "mcq") return null;
  const answer = q.options.find((o) => o.isCorrect)?.label ?? null;
  return {
    text: q.context ? `${q.context}\n${q.text}` : q.text,
    options: q.options.map((o) => ({ label: o.label, text: o.text })),
    chose: chose && LETTER.test(chose) ? chose : null,
    answer,
  };
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

/** The student's mistakes, grouped for V: by notes part (teaching order) or, with no notes, by topic. */
type Mine = {
  total: number;
  /** Labelled groups with their count, in the order V should read them. */
  groups: { label: string; count: number }[];
  /** Mistakes in a topic no notes part covers. */
  other: number;
  /** Where to start: "part 2, Dot Product" or a topic name; null = the first part. */
  start: string | null;
  example: MissExample | null;
};

function mineByParts(
  misses: readonly ChapterMiss[],
  ordered: readonly { n: number; title: string; subtopicName?: string }[],
  example: MissExample | null
): Mine {
  const counts = new Map<number, number>();
  let other = 0;
  for (const m of misses) {
    const part = ordered.find((p) => p.subtopicName && norm(p.subtopicName) === norm(m.subtopic));
    if (part) counts.set(part.n, (counts.get(part.n) ?? 0) + 1);
    else other += 1;
  }
  const groups = ordered.filter((p) => counts.has(p.n)).map((p) => ({ label: p.title, count: counts.get(p.n)! }));
  // Most mistakes first; a tie goes to the earlier part, since `ordered` is teaching order.
  let best: { n: number; title: string } | null = null;
  let bestCount = 0;
  for (const p of ordered) {
    const c = counts.get(p.n) ?? 0;
    if (c > bestCount) {
      best = p;
      bestCount = c;
    }
  }
  return { total: misses.length, groups, other, start: best ? `part ${best.n}, ${best.title}` : null, example };
}

function mineByTopic(misses: readonly ChapterMiss[], example: MissExample | null): Mine {
  const by = new Map<string, { label: string; count: number; last: string }>();
  for (const m of misses) {
    const key = norm(m.subtopic);
    const g = by.get(key);
    if (g) {
      g.count += 1;
      if (m.lastWrongAt > g.last) g.last = m.lastWrongAt;
    } else by.set(key, { label: m.subtopic.trim(), count: 1, last: m.lastWrongAt });
  }
  const groups = [...by.values()].sort((a, b) => b.count - a.count || (a.last < b.last ? 1 : -1));
  return { total: misses.length, groups: groups.map(({ label, count }) => ({ label, count })), other: 0, start: groups[0]?.label ?? null, example };
}

const STEM_MAX = 500;
const OPTION_MAX = 120;
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function exampleLines(e: MissExample): string[] {
  const opts = e.options.map((o) => `(${o.label}) ${cut(o.text, OPTION_MAX)}`).join("; ");
  const lines = [`Their latest mistake here, to use as the worked example: ${cut(e.text, STEM_MAX)}`, `Options: ${opts}`];
  if (e.chose) {
    lines.push(
      `They picked (${e.chose}); the answer is (${e.answer ?? "?"}). Work it, and name in one line the slip that leads to their pick. ` +
        "If you cannot see what led to it, just show the right working."
    );
  } else {
    lines.push(`It was in a mock, where the pick was not recorded; the answer is (${e.answer ?? "?"}). Work it and show the right working.`);
  }
  return lines;
}

/** The lines that tell V about the student's mistakes; [] when there is nothing to tell (signed out, or a failed read). */
function mineLines(mine: Mine | null, unit: "part" | "topic"): string[] {
  if (!mine) return [];
  if (mine.total === 0) return [`The student has no mistakes waiting in this chapter: start at the first ${unit}.`];
  const list = mine.groups.map((g) => `${g.label}: ${g.count}`);
  if (mine.other > 0) list.push(`${mine.other} in other topics`);
  const lines = [`The student has ${mine.total} ${mine.total === 1 ? "mistake" : "mistakes"} waiting in this chapter (their Fix list): ${list.join("; ")}.`];
  if (mine.start && unit === "part") {
    lines.push(
      `START at ${mine.start}${mine.start.startsWith("part 1,") ? "" : ", not part 1"}: say in one line that this is where most of their mistakes are, give the short map, then teach that part.`
    );
  } else if (mine.start) {
    lines.push(`Start with ${mine.start}: say in one line that this is where most of their mistakes are, then teach it.`);
  } else {
    lines.push(`None of them sits in one ${unit}: start at the first ${unit}.`);
  }
  if (mine.example) lines.push(...exampleLines(mine.example));
  return lines;
}

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

/** The same, when the student's mistakes say where to start. */
const TEACH_FROM_MISTAKES =
  "Teach from this: give the student a short map of the parts in order, each with what it is used for, " +
  "then teach the starting part above briefly with one small example (their mistake, if given), and offer to go on one part at a time. " +
  "Link the notes chapter. Do not list the chapter's questions instead of teaching.";

function header(hit: ChapterSearchRow): string {
  return `${hit.examName} | ${hit.subjectName} | ${hit.chapterName} (${hit.questionCount} q)`;
}

/** The student's waiting mistakes in the chapter, and the latest as an example; null = nothing known (signed out, a failed read). */
export type ChapterMistakes = { list: readonly ChapterMiss[]; example: MissExample | null } | null;

export function formatChapterOverview(
  hit: ChapterSearchRow,
  notes: { ref: NotesChapterRef; parts: NotesChapterParts } | null,
  /** A notes chapter that exists but could not be read just now: still linked, never called missing. */
  unreadNotesKey: string | null = null,
  mistakes: ChapterMistakes = null
): string {
  const questions = chapterPath(hit);
  if (notes) {
    const lines = [header(hit), `Notes chapter: /notes/${notes.ref.key}`, `Questions: ${questions}`, "Its parts, in teaching order:"];
    const ordered: { n: number; title: string; subtopicName?: string }[] = [];
    for (const slug of notes.ref.slugs) {
      const part = notes.parts[slug];
      if (!part) continue;
      ordered.push({ n: ordered.length + 1, title: part.title, subtopicName: part.subtopicName });
      lines.push(`${ordered.length}. ${part.title}: ${part.oneLineDefinition} (/notes/${notes.ref.key}/${slug})`);
    }
    const mine = mistakes ? mineByParts(mistakes.list, ordered, mistakes.example) : null;
    lines.push(...mineLines(mine, "part"));
    lines.push(mine && mine.total > 0 ? TEACH_FROM_MISTAKES : TEACH);
    return lines.join("\n");
  }
  const topics = (hit.subtopicNames ?? []).slice(0, MAX_TOPICS);
  const topicLine = topics.length ? ` Its topics: ${topics.join("; ")}.` : "";
  const mine = mistakes ? mineByTopic(mistakes.list, mistakes.example) : null;
  const first = mine?.start ? "teach that topic first" : "teach the first one briefly";
  return [
    header(hit),
    `Questions: ${questions}`,
    unreadNotesKey ? `Notes chapter: /notes/${unreadNotesKey}.${topicLine}` : `No notes for this chapter on PYQ Vault.${topicLine}`,
    ...mineLines(mine, "topic"),
    "Give a short general map of these topics from what you know (rule 7a), each with what it is used for, " +
      `${first}, offer to go on one at a time, and link the ${unreadNotesKey ? "notes chapter" : "questions page"}.`,
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
  /** The signed-in student's waiting mistakes in a chapter; null or absent when signed out. */
  loadMisses?: ((hit: ChapterSearchRow) => Promise<readonly ChapterMiss[]>) | null;
  /** One mistake as a worked example; null when it cannot be one (a figure, not an MCQ, a failed read). */
  loadMissExample?: ((questionId: string) => Promise<MissExample | null>) | null;
};

async function readMistakes(d: ChapterOverviewDeps, hit: ChapterSearchRow): Promise<ChapterMistakes> {
  if (!d.loadMisses) return null;
  let list: readonly ChapterMiss[];
  try {
    list = await d.loadMisses(hit);
  } catch (err) {
    console.error("V: chapter_overview mistakes unavailable", hit.examName, hit.chapterName, err);
    return null;
  }
  if (list.length === 0 || !d.loadMissExample) return { list, example: null };
  const latest = list.reduce((a, b) => (b.lastWrongAt > a.lastWrongAt ? b : a));
  const example = await d.loadMissExample(latest.questionId).catch((err) => {
    console.error("V: chapter_overview example unavailable", latest.questionId, err);
    return null;
  });
  return { list, example };
}

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
      const [parts, mistakes] = await Promise.all([
        ref
          ? d.loadNotesChapter(ref.key).catch((err) => {
              console.error("V: chapter_overview notes unavailable", ref.key, err);
              return null;
            })
          : Promise.resolve(null),
        readMistakes(d, hit),
      ]);
      const notes = ref && parts ? { ref, parts } : null;

      const paths = [chapterPath(hit)];
      if (ref) paths.push(`/notes/${ref.key}`);
      if (notes) for (const slug of notes.ref.slugs) if (notes.parts[slug]) paths.push(`/notes/${notes.ref.key}/${slug}`);
      d.onPaths(paths);
      return formatChapterOverview(hit, notes, ref && !notes ? ref.key : null, mistakes);
    },
  };
}
