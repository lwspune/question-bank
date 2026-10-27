/**
 * What a learner sees of a course: which course chapters show a concept, and each concept's
 * state. Pure, and safe in the browser: lesson pages are cached for everyone, so a student's
 * progress is applied after the page loads.
 *
 * The gate (decision, 2026-10-27): a signed-in student opens a concept once its published
 * prerequisites in the course are mastered (Concept Ladder's rule); a guest's progress is not
 * saved, so a guest opens every lesson and is told what it builds on instead.
 */
import { ancestorsOf, type GraphNode } from "./engine/graph";
import { type ConceptState, conceptStates, inScope, nextConceptAfter } from "./engine/unlock";
import { isReviewDue } from "./engine/review";

export type PoolConcept = {
  code: string;
  slug: string;
  title: string;
  one_liner: string;
  grp: string;
  tier: string;
  prereqs: string[];
  published: boolean;
};

export type Pool = { title: string; concepts: PoolConcept[] };

export type OutlineChapter = {
  slug: string;
  title: string;
  standard: number;
  pyqvault: string | null;
  parts: { chapter: string; concepts: string[] }[];
};

/** `learn_course_outline` (migration 0192). */
export type Outline = {
  slug: string;
  title: string;
  exam: string;
  subject: string;
  standard: number;
  chapters: OutlineChapter[];
  pools: Record<string, Pool>;
};

export type Home = { course: string; courseTitle: string; chapter: string; chapterTitle: string };

export type LearnerState = "learning" | "mastered";

/** A student's own progress on one concept (`learn_my_progress`, migration 0193). */
export type ConceptProgress = { state: LearnerState; nextReviewAt: string | null; updatedAt?: string | null };

const graphOf = (pool: Pool): GraphNode[] => pool.concepts.map((c) => ({ id: c.code, prereqs: c.prereqs }));
const publishedOf = (pool: Pool) => new Set(pool.concepts.filter((c) => c.published).map((c) => c.code));
const brief = (c: PoolConcept) => ({ slug: c.slug, title: c.title });

/** Every course chapter that shows concept `code` of pool chapter `chapter`, in course order. */
export function homesOf(outlines: Outline[], chapter: string, code: string): Home[] {
  return outlines.flatMap((o) =>
    o.chapters
      .filter((ch) => ch.parts.some((p) => p.chapter === chapter && p.concepts.includes(code)))
      .map((ch) => ({ course: o.slug, courseTitle: o.title, chapter: ch.slug, chapterTitle: ch.title })),
  );
}

/**
 * The concepts of pool chapter `chapter` the course shows in course chapter `courseChapter` or any
 * chapter before it: the scope a concept there is gated in (owner, 2026-10-27). A prerequisite the
 * course teaches only LATER counts as known, as one it never teaches does: CBSE teaches Matrices
 * before Determinants, while the lessons make Types of matrices build on a determinant.
 */
export function scopeUpTo(outline: Outline, courseChapter: string, chapter: string): Set<string> {
  const upTo = outline.chapters.findIndex((c) => c.slug === courseChapter);
  return new Set(
    outline.chapters.slice(0, upTo + 1).flatMap((ch) => ch.parts.filter((p) => p.chapter === chapter).flatMap((p) => p.concepts)),
  );
}

export type LessonView = {
  state: ConceptState;
  /** True only for a signed-in student who has not unlocked it (and did not come as a refresher). */
  locked: boolean;
  /** Its direct published prerequisites in the course: "builds on" for a guest, "master first" when locked. */
  buildsOn: { slug: string; title: string }[];
  /** Set when the student was sent here to fix a gap in a later concept (`?from=`). */
  refresher: { slug: string; title: string } | null;
  /** Where "Next concept" goes once this one is mastered. */
  next: { slug: string; title: string } | null;
};

export function lessonView({
  pool,
  scope,
  code,
  learner,
  signedIn,
  from,
}: {
  pool: Pool;
  scope?: Set<string>;
  code: string;
  learner: Map<string, LearnerState>;
  signedIn: boolean;
  /** The `?from=` concept slug of a refresher link. */
  from?: string | null;
}): LessonView {
  const graph = graphOf(pool);
  const open = inScope(publishedOf(pool), scope?.has(code) ? scope : undefined);
  const state = conceptStates(graph, open, learner, signedIn).get(code) ?? "unpublished";
  const node = pool.concepts.find((c) => c.code === code);
  const source = from ? pool.concepts.find((c) => c.slug === from) : undefined;
  const refresher =
    source && open.has(source.code) && ancestorsOf(graph, source.code).has(code) ? brief(source) : null;
  const buildsOn = (node?.prereqs ?? [])
    .filter((p) => open.has(p))
    .map((p) => pool.concepts.find((c) => c.code === p)!)
    .map(brief);
  const nextCode = nextConceptAfter(graph, open, learner, code, signedIn);
  const next = nextCode ? pool.concepts.find((c) => c.code === nextCode) : undefined;
  return { state, locked: state === "locked" && !refresher, buildsOn, refresher, next: next ? brief(next) : null };
}

export type ChapterConcept = {
  chapter: string;
  code: string;
  slug: string;
  title: string;
  oneLiner: string;
  group: string;
  state: ConceptState;
  /** Mastered and due for spaced review now. */
  due: boolean;
  buildsOn: { slug: string; title: string }[];
  /** When the student last answered here (migration 0194); null for a guest or an untouched concept. */
  updatedAt: string | null;
};

/** A course chapter's concepts in teaching order, each with this learner's state. Null if the course has no such chapter. */
export function chapterView(
  outline: Outline,
  courseChapter: string,
  learner: Map<string, ConceptProgress>,
  signedIn: boolean,
  now: number,
): { title: string; standard: number; pyqvault: string | null; concepts: ChapterConcept[] } | null {
  const ch = outline.chapters.find((c) => c.slug === courseChapter);
  if (!ch) return null;
  const concepts = ch.parts.flatMap((part) => {
    const pool = outline.pools[part.chapter];
    const states = new Map([...learner].filter(([k]) => k.startsWith(`${part.chapter}/`)).map(([k, v]) => [k.split("/")[1], v.state]));
    const scope = scopeUpTo(outline, courseChapter, part.chapter);
    return part.concepts.flatMap((code) => {
      const node = pool.concepts.find((c) => c.code === code);
      if (!node || !node.published) return [];
      const view = lessonView({ pool, scope, code, learner: states, signedIn });
      const own = learner.get(`${part.chapter}/${code}`);
      return [
        {
          chapter: part.chapter,
          code,
          slug: node.slug,
          title: node.title,
          oneLiner: node.one_liner,
          group: node.grp,
          state: view.state,
          due: own ? isReviewDue(own.state, own.nextReviewAt, now) : false,
          buildsOn: view.buildsOn,
          updatedAt: own?.updatedAt ?? null,
        },
      ];
    });
  });
  return { title: ch.title, standard: ch.standard, pyqvault: ch.pyqvault, concepts };
}

/** A guest's progress on a concept from the answers kept in the page: each question by its latest answer, as the database counts. */
export function localProgress(attempts: { itemId: string; correct: boolean }[], needed: number) {
  const latest = new Map<string, boolean>();
  for (const a of attempts) latest.set(a.itemId, a.correct);
  const streak = [...latest.values()].filter(Boolean).length;
  const toRetry = latest.size - streak;
  return { streak, toRetry, mastered: streak >= needed && toRetry === 0 };
}

/** What a learner should open next among these concepts: one in progress, then one due for review, then a new one. */
export function upNextIn(concepts: ChapterConcept[]): ChapterConcept | null {
  // Of several in progress, the one the student touched last ("Continue where you left off").
  const learning = concepts
    .filter((c) => c.state === "learning")
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
  return (
    learning[0] ??
    concepts.find((c) => c.due) ??
    concepts.find((c) => c.state === "available") ??
    null
  );
}

/** A chapter's concepts by topic (Concept Ladder's groups), in the order the topics first appear. */
export function groupsOf(concepts: ChapterConcept[]): { group: string; concepts: ChapterConcept[]; mastered: number }[] {
  const groups: { group: string; concepts: ChapterConcept[]; mastered: number }[] = [];
  for (const c of concepts) {
    let g = groups.find((x) => x.group === c.group);
    if (!g) groups.push((g = { group: c.group, concepts: [], mastered: 0 }));
    g.concepts.push(c);
    if (c.state === "mastered") g.mastered++;
  }
  return groups;
}

export type CourseSummary = {
  total: number;
  mastered: number;
  /** Mastered concepts due for spaced review now. */
  due: number;
  chapters: { slug: string; title: string; total: number; mastered: number; learning: number }[];
  /** The concept to open next anywhere in the course (upNextIn, in course order); null when all is mastered and nothing is due. */
  upNext: (ChapterConcept & { courseChapter: string; chapterTitle: string }) | null;
};

/** A course for one learner: progress per chapter and overall, and where to go next. */
export function courseSummary(outline: Outline, learner: Map<string, ConceptProgress>, signedIn: boolean, now: number): CourseSummary {
  const views = outline.chapters.map((ch) => ({ ch, view: chapterView(outline, ch.slug, learner, signedIn, now)! }));
  const all = views.flatMap(({ ch, view }) => view.concepts.map((c) => ({ ...c, courseChapter: ch.slug, chapterTitle: ch.title })));
  const next = upNextIn(all) as (typeof all)[number] | null;
  return {
    total: all.length,
    mastered: all.filter((c) => c.state === "mastered").length,
    due: all.filter((c) => c.due).length,
    chapters: views.map(({ ch, view }) => ({
      slug: ch.slug,
      title: ch.title,
      total: view.concepts.length,
      mastered: view.concepts.filter((c) => c.state === "mastered").length,
      learning: view.concepts.filter((c) => c.state === "learning").length,
    })),
    upNext: next,
  };
}

/** A concept's place among its course chapter's published concepts (1-based), with the ones either side. */
export function neighbours(
  outline: Outline,
  courseChapter: string,
  chapter: string,
  code: string,
): { index: number; total: number; prev: { chapter: string; slug: string; title: string } | null; next: { chapter: string; slug: string; title: string } | null } | null {
  const ch = outline.chapters.find((c) => c.slug === courseChapter);
  if (!ch) return null;
  const list = ch.parts.flatMap((p) =>
    p.concepts.flatMap((k) => {
      const node = outline.pools[p.chapter]?.concepts.find((c) => c.code === k && c.published);
      return node ? [{ chapter: p.chapter, code: k, slug: node.slug, title: node.title }] : [];
    }),
  );
  const at = list.findIndex((c) => c.chapter === chapter && c.code === code);
  if (at === -1) return null;
  const strip = (c: (typeof list)[number] | undefined) => (c ? { chapter: c.chapter, slug: c.slug, title: c.title } : null);
  return { index: at + 1, total: list.length, prev: strip(list[at - 1]), next: strip(list[at + 1]) };
}

/** Every Learn page worth indexing: the hub, each course and course chapter, and each published lesson once (decision B: one address per concept). */
export function learnSitemapPaths(outlines: Outline[]): string[] {
  const paths = ["/learn", ...outlines.map((o) => `/learn/${o.slug}`)];
  for (const o of outlines) for (const ch of o.chapters) paths.push(`/learn/${o.slug}/${ch.slug}`);
  const lessons = new Set<string>();
  for (const o of outlines) {
    for (const ch of o.chapters) {
      for (const part of ch.parts) {
        for (const code of part.concepts) {
          const node = o.pools[part.chapter]?.concepts.find((c) => c.code === code);
          if (node?.published) lessons.add(`/learn/lesson/${part.chapter}/${node.slug}`);
        }
      }
    }
  }
  return [...paths, ...lessons];
}
