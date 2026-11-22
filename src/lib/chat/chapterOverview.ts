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
 * parts in teaching order with each part's one-line definition and page. V
 * teaches one part; the window draws the map, a question to try and the
 * lesson's buttons from the lesson the tool hands it (lib/chat/lesson.ts).
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
import { lessonOrder, nextPart, type LessonPart, type VLesson } from "./lesson";

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

/**
 * One unit the lesson teaches: a notes part, or, for a chapter with no notes
 * (board chapters have none by design), a bank topic.
 */
type Unit = { n: number; title: string; subtopicName: string | null; href: string | null; definition: string | null };

function unitsOf(hit: ChapterSearchRow, notes: { ref: NotesChapterRef; parts: NotesChapterParts } | null): Unit[] {
  if (notes) {
    const out: Unit[] = [];
    for (const slug of notes.ref.slugs) {
      const part = notes.parts[slug];
      if (!part) continue;
      out.push({
        n: out.length + 1,
        title: part.title,
        subtopicName: part.subtopicName ?? null,
        href: `/notes/${notes.ref.key}/${slug}`,
        definition: part.oneLineDefinition,
      });
    }
    return out;
  }
  return (hit.subtopicNames ?? []).map((t, i) => ({ n: i + 1, title: t, subtopicName: t, href: null, definition: null }));
}

/**
 * Where the lesson stands: each unit with the student's waiting mistakes in it,
 * the unit this reply teaches, and the mistake to work as its example.
 */
type LessonPlan = {
  units: Unit[];
  parts: LessonPart[];
  current: number;
  /** The student asked for this unit by number (the Go on button). */
  asked: boolean;
  /** The waiting mistakes; null = not known (signed out, a failed read): claim nothing. */
  misses: readonly ChapterMiss[] | null;
  /** Mistakes in a topic no unit covers. */
  other: number;
  /** The mistake to work as the example: the latest in the current unit. */
  exampleMiss: ChapterMiss | null;
  /** The example sits in the current unit (so a question like it is a question on this part). */
  exampleInUnit: boolean;
};

const latest = (ms: readonly ChapterMiss[]) => (ms.length ? ms.reduce((a, b) => (b.lastWrongAt > a.lastWrongAt ? b : a)) : null);

export function planLesson(
  hit: ChapterSearchRow,
  notes: { ref: NotesChapterRef; parts: NotesChapterParts } | null,
  misses: readonly ChapterMiss[] | null,
  askedPart: number | null
): LessonPlan {
  const units = unitsOf(hit, notes);
  const unitOf = (m: ChapterMiss) => units.find((u) => u.subtopicName && norm(u.subtopicName) === norm(m.subtopic)) ?? null;
  const counts = new Map<number, number>();
  let other = 0;
  for (const m of misses ?? []) {
    const u = unitOf(m);
    if (u) counts.set(u.n, (counts.get(u.n) ?? 0) + 1);
    else other += 1;
  }
  const parts: LessonPart[] = units.map((u) => ({ n: u.n, title: u.title, href: u.href, missed: counts.get(u.n) ?? 0 }));
  const asked = askedPart !== null && units.some((u) => u.n === askedPart);
  const current = asked ? askedPart! : (lessonOrder(parts)[0] ?? 1);
  const inUnit = (misses ?? []).filter((m) => unitOf(m)?.n === current);
  const inUnitLatest = latest(inUnit);
  // Asked for a part with no mistakes in it: no example. Otherwise, with every mistake in a topic no
  // unit covers, the latest anywhere still beats teaching with none.
  const exampleMiss = inUnitLatest ?? (asked ? null : latest(misses ?? []));
  return { units, parts, current, asked, misses, other, exampleMiss, exampleInUnit: inUnitLatest !== null };
}

const STEM_MAX = 500;
const OPTION_MAX = 120;
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function exampleLines(e: MissExample): string[] {
  const opts = e.options.map((o) => `(${o.label}) ${cut(o.text, OPTION_MAX)}`).join("; ");
  const lines = [`Their latest mistake here, to use as the worked example: ${cut(e.text, STEM_MAX)}`, `Options: ${opts}`];
  if (e.chose) {
    lines.push(
      `They picked (${e.chose}); the answer is (${e.answer ?? "?"}). Show its working in one or two lines, then name in one line the slip that leads to their pick. ` +
        "If you cannot see the slip, leave it out and do not mention it."
    );
  } else {
    lines.push(`It was in a mock, where the pick was not recorded; the answer is (${e.answer ?? "?"}). Show the right working in one or two lines.`);
  }
  return lines;
}

/** The lines on the student's mistakes and where this reply starts. */
function mineLines(plan: LessonPlan, unit: "part" | "topic"): string[] {
  const cur = plan.units.find((u) => u.n === plan.current);
  const name = (u: Unit | undefined) => (u ? (unit === "part" ? `part ${u.n}, ${u.title}` : u.title) : `the first ${unit}`);
  const lines: string[] = [];
  const known = plan.misses !== null;
  const total = plan.misses?.length ?? 0;
  if (known && total === 0) lines.push("The student has no mistakes waiting in this chapter.");
  if (known && total > 0) {
    const list = plan.parts.filter((p) => p.missed > 0).map((p) => `${p.title}: ${p.missed}`);
    if (plan.other > 0) list.push(`${plan.other} in other topics`);
    lines.push(`The student has ${total} ${total === 1 ? "mistake" : "mistakes"} waiting in this chapter (their Fix list): ${list.join("; ")}.`);
  }
  if (plan.asked) {
    lines.push(`They asked for ${name(cur)}: teach that ${unit} now.`);
  } else if (cur && plan.parts.find((p) => p.n === plan.current)!.missed > 0) {
    lines.push(
      unit === "part"
        ? `START at ${name(cur)}${plan.current === 1 ? "" : ", not part 1"}: this is where most of their mistakes are.`
        : `Start with ${cur.title}: this is where most of their mistakes are.`
    );
  } else {
    const none = known && total > 0 ? `None of them sits in one ${unit}: ` : "";
    lines.push(`${none}Start at the first ${unit}${cur ? `, ${name(cur)}` : ""}.`);
  }
  return lines;
}

/** How V writes the reply, around the card and buttons the window draws. */
function teachLines(plan: LessonPlan, opts: { hasExample: boolean; tryShown: boolean; fromNotes: boolean }): string[] {
  const unit = opts.fromNotes ? "part" : "topic";
  const hasMistakes = (plan.misses?.length ?? 0) > 0;
  const buttons = "buttons to go on to the next part, to explain more simply and to open the notes";
  const lines = [
    plan.asked
      ? `Buttons under your reply ${buttons.replace("buttons to ", "")}.`
      : `A card under your reply shows the map of the chapter's ${unit}s${hasMistakes ? ", with the student's mistakes in each," : ""} and ${buttons}.`,
    "So do not list the parts, do not write a notes or questions path, and do not ask whether to go on.",
    "Write: " +
      (hasMistakes && !plan.asked ? `one line saying which ${unit}s their mistakes are in and that you start here; then ` : "") +
      `teach the ${unit} in two or three short lines` +
      (opts.fromNotes ? "" : " as a general explanation from what you know (rule 7a)") +
      (opts.hasExample ? ", then work their mistake above" : " with one small example") +
      ". Write maths inside \\( \\).",
  ];
  if (opts.tryShown) lines.push(`A question on this ${unit} is shown under your reply: end with one short line asking them to try it.`);
  // 2026-11-21 (real capture): V wrote "Try this one: a single fair die..." above the card's own question.
  lines.push("Do not write a question of your own for them to try: you cannot check their answer, and the shown one is their turn.");
  lines.push("Do not list the chapter's questions instead of teaching, and do not call my_progress.");
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

function header(hit: ChapterSearchRow): string {
  return `${hit.examName} | ${hit.subjectName} | ${hit.chapterName} (${hit.questionCount} q)`;
}

export function formatChapterOverview(
  hit: ChapterSearchRow,
  notes: { ref: NotesChapterRef; parts: NotesChapterParts } | null,
  /** A notes chapter that exists but could not be read just now: still linked, never called missing. */
  unreadNotesKey: string | null = null,
  plan: LessonPlan = planLesson(hit, notes, null, null),
  example: MissExample | null = null,
  tryShown = false
): string {
  const questions = chapterPath(hit);
  const extra = example ? exampleLines(example) : [];
  if (notes) {
    const lines = [header(hit), `Notes chapter: /notes/${notes.ref.key}`, `Questions: ${questions}`, "Its parts, in teaching order:"];
    for (const u of plan.units) lines.push(`${u.n}. ${u.title}: ${u.definition ?? ""} (${u.href})`);
    return [...lines, ...mineLines(plan, "part"), ...extra, ...teachLines(plan, { hasExample: !!example, tryShown, fromNotes: true })].join("\n");
  }
  const topics = (hit.subtopicNames ?? []).slice(0, MAX_TOPICS);
  const topicLine = topics.length ? ` Its topics: ${topics.join("; ")}.` : "";
  return [
    header(hit),
    `Questions: ${questions}`,
    unreadNotesKey ? `Notes chapter: /notes/${unreadNotesKey}.${topicLine}` : `No notes for this chapter on PYQ Vault.${topicLine}`,
    ...mineLines(plan, "topic"),
    ...extra,
    ...teachLines(plan, { hasExample: !!example, tryShown, fromNotes: false }),
  ].join("\n");
}

/** What the "question to try" reader is given: a question like `near`, or else one from the part's topic. */
export type TryArgs = {
  chapterId: string | null;
  /** The bank subtopic of the part being taught; null when the part names none. */
  subtopic: string | null;
  /** The mistake worked as the example, when it sits in this part: the question to try is one like it. */
  near: string | null;
  /** The student's waiting mistakes in the chapter: Fix serves those, so the question to try is another. */
  exclude: string[];
};

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
  /** A question to try under the reply (signed in); null when there is none. */
  loadTryId?: ((args: TryArgs) => Promise<string | null>) | null;
  /** The lesson the window draws under the reply: map card, question to try, buttons (lib/chat/lesson). */
  onLesson?: ((lesson: VLesson) => void) | null;
};

async function readMisses(d: ChapterOverviewDeps, hit: ChapterSearchRow): Promise<readonly ChapterMiss[] | null> {
  if (!d.loadMisses) return null;
  try {
    return await d.loadMisses(hit);
  } catch (err) {
    console.error("V: chapter_overview mistakes unavailable", hit.examName, hit.chapterName, err);
    return null;
  }
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
      "words (chapter) and the exam if known (exam). When they ask for one part of it by number ('Teach me part 3 of <chapter> " +
      "for <exam>: ...'), give that number (part). Returns the chapter's parts in teaching order from our notes, and how to teach. " +
      "For one concept inside a chapter use explain_concept.",
    input_schema: {
      type: "object",
      properties: {
        chapter: { type: "string", description: "The chapter name in full words, e.g. 'vectors' or 'solid state'." },
        exam: { type: "string", description: "The student's exam if known, e.g. 'MHT-CET', 'MH HSC 12', 'NEET'." },
        part: { type: "integer", description: "The part's number, only when the student asked for one part by number." },
      },
      required: ["chapter"],
    },
    run: async (input) => {
      const i = (input ?? {}) as { chapter?: unknown; exam?: unknown; part?: unknown };
      const chapter = typeof i.chapter === "string" ? i.chapter.trim() : "";
      if (!chapter) return "No chapter given. Ask the student which chapter they want to learn.";
      const named = typeof i.exam === "string" && i.exam.trim() ? i.exam.trim() : undefined;
      const exam = named ?? d.page?.examName;
      const askedPart = typeof i.part === "number" && Number.isInteger(i.part) ? i.part : null;

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
      const [parts, misses] = await Promise.all([
        ref
          ? d.loadNotesChapter(ref.key).catch((err) => {
              console.error("V: chapter_overview notes unavailable", ref.key, err);
              return null;
            })
          : Promise.resolve(null),
        readMisses(d, hit),
      ]);
      const notes = ref && parts ? { ref, parts } : null;
      const plan = planLesson(hit, notes, misses, askedPart);
      const cur = plan.units.find((u) => u.n === plan.current) ?? null;

      const [example, tryId] = await Promise.all([
        plan.exampleMiss && d.loadMissExample
          ? d.loadMissExample(plan.exampleMiss.questionId).catch((err) => {
              console.error("V: chapter_overview example unavailable", plan.exampleMiss?.questionId, err);
              return null;
            })
          : Promise.resolve(null),
        cur && d.loadTryId
          ? d
              .loadTryId({
                chapterId: hit.chapterId ?? null,
                subtopic: cur.subtopicName,
                near: plan.exampleInUnit && plan.exampleMiss ? plan.exampleMiss.questionId : null,
                exclude: (misses ?? []).map((m) => m.questionId),
              })
              .catch((err) => {
                console.error("V: chapter_overview question to try unavailable", hit.chapterName, err);
                return null;
              })
          : Promise.resolve(null),
      ]);

      const paths = [chapterPath(hit)];
      if (ref) paths.push(`/notes/${ref.key}`);
      for (const u of plan.units) if (u.href) paths.push(u.href);
      d.onPaths(paths);

      if (plan.parts.length > 0) {
        d.onLesson?.({
          exam: hit.examName,
          chapter: hit.chapterName,
          notesHref: ref ? `/notes/${ref.key}` : null,
          questionsHref: chapterPath(hit),
          parts: plan.parts,
          current: plan.current,
          next: nextPart(plan.parts, plan.current),
          showMap: !plan.asked,
          missed: misses?.length ?? 0,
          tryQuestionId: tryId,
        });
      }
      return formatChapterOverview(hit, notes, ref && !notes ? ref.key : null, plan, example, tryId !== null);
    },
  };
}
