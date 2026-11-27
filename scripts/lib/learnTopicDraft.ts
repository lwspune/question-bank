/**
 * A first guess at which bank topics each Learn lesson's mistakes are filed under (2026-11-27):
 * TF-IDF cosine between a lesson (title, summary, questions) and each topic of its chapter (name
 * and sample questions), inside one chapter. A DRAFT only: scripts/learn/topics-draft.ts writes it
 * for review, and nothing reaches src/lib/learn/lessonTopics/ until a person or reviewer has read
 * the row. Rules: under FLOOR, no topic (a wrong row sends a student to the wrong lesson); a second
 * topic only within SECOND_RATIO of the first. Spec: tests/learn-topic-draft.test.ts.
 */

const STOP = new Set(
  "the and for with that this from into are was were has have had not but its their there these those which what when where how why who whom can will would should could may might also than then them they you your our out per each any all one two three over under between about above below after before both more most other some such only same very via use used using find value values given show shows given let gets get two".split(
    " ",
  ),
);

/** Lower-case words (letters and digits, 3+ long) with LaTeX commands dropped and a plain plural folded. */
export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/\\[a-z]+/g, " ")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w))
    .map((w) => (w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));
}

type Vec = Map<string, number>;

function tf(words: string[]): Vec {
  const v: Vec = new Map();
  for (const w of words) v.set(w, (v.get(w) ?? 0) + 1);
  return v;
}

function weigh(v: Vec, idf: Map<string, number>): Vec {
  const out: Vec = new Map();
  for (const [w, n] of v) out.set(w, (1 + Math.log(n)) * (idf.get(w) ?? 0));
  return out;
}

function cosine(a: Vec, b: Vec): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (const [, x] of a) na += x * x;
  for (const [w, y] of b) {
    nb += y * y;
    const x = a.get(w);
    if (x) dot += x * y;
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}

/** Below this a lesson gets no topic. */
export const FLOOR = 0.08;
/** A second topic is offered when it scores at least this share of the first. */
export const SECOND_RATIO = 0.8;

export type LessonIn = { slug: string; title: string; text: string };
export type TopicIn = { name: string; text: string };
export type DraftRow = { slug: string; chosen: string[]; scores: { topic: string; score: number }[] };

/** Every lesson of one chapter against that chapter's topics. The title and the topic name count three times. */
export function draftChapter(lessons: LessonIn[], topics: TopicIn[]): DraftRow[] {
  const lessonWords = lessons.map((l) => [...tokens(l.title), ...tokens(l.title), ...tokens(l.title), ...tokens(l.text)]);
  const topicWords = topics.map((t) => [...tokens(t.name), ...tokens(t.name), ...tokens(t.name), ...tokens(t.text)]);
  const docs = [...lessonWords, ...topicWords];
  const df = new Map<string, number>();
  for (const d of docs) for (const w of new Set(d)) df.set(w, (df.get(w) ?? 0) + 1);
  const idf = new Map([...df].map(([w, n]) => [w, Math.log((docs.length + 1) / (n + 1)) + 1]));
  const topicVecs = topicWords.map((w) => weigh(tf(w), idf));
  return lessons.map((l, i) => {
    const v = weigh(tf(lessonWords[i]), idf);
    const scores = topics.map((t, j) => ({ topic: t.name, score: Math.round(cosine(v, topicVecs[j]) * 1000) / 1000 })).sort((a, b) => b.score - a.score);
    const chosen: string[] = [];
    if (scores[0] && scores[0].score >= FLOOR) {
      chosen.push(scores[0].topic);
      if (scores[1] && scores[1].score >= FLOOR && scores[1].score >= scores[0].score * SECOND_RATIO) chosen.push(scores[1].topic);
    }
    return { slug: l.slug, chosen, scores: scores.slice(0, 4) };
  });
}

/** A draft against hand-checked rows, lesson by lesson: same set, sharing a topic, none shared, or the draft left it empty. */
export function agreement(draft: Record<string, string[]>, hand: Record<string, string[]>) {
  const out = { lessons: 0, exact: 0, overlap: 0, wrong: 0, empty: 0 };
  for (const [slug, want] of Object.entries(hand)) {
    out.lessons++;
    const got = draft[slug] ?? [];
    if (got.length === 0) out.empty++;
    else if (got.length === want.length && got.every((t) => want.includes(t))) out.exact++;
    else if (got.some((t) => want.includes(t))) out.overlap++;
    else out.wrong++;
  }
  return out;
}

/**
 * A reviewed file before scripts/learn/topics-commit.ts checks it in: every chapter and every
 * lesson of the course listed once (an empty list is allowed: read, no topic fits), nothing
 * extra, at most three topics, and every topic EXACTLY a bank topic of that chapter (the live
 * stuck offer matches on the name).
 */
export function checkFinal(
  lessons: Record<string, readonly string[]>,
  topics: Record<string, readonly string[]>,
  final: Record<string, Record<string, readonly string[]>>,
): string[] {
  const errors: string[] = [];
  for (const chapter of Object.keys(final)) if (!lessons[chapter]) errors.push(`${chapter}: not a chapter of this course`);
  for (const [chapter, want] of Object.entries(lessons)) {
    const got = final[chapter];
    if (!got) {
      errors.push(`${chapter}: missing`);
      continue;
    }
    const real = new Set(topics[chapter] ?? []);
    for (const lesson of want) if (!Object.hasOwn(got, lesson)) errors.push(`${chapter}/${lesson}: missing`);
    for (const [lesson, ts] of Object.entries(got)) {
      if (!want.includes(lesson)) errors.push(`${chapter}/${lesson}: not a lesson of this chapter`);
      if (!Array.isArray(ts)) {
        errors.push(`${chapter}/${lesson}: not a list`);
        continue;
      }
      if (ts.length > 3) errors.push(`${chapter}/${lesson}: ${ts.length} topics (at most 3)`);
      for (const t of new Set(ts)) if (!real.has(t)) errors.push(`${chapter}/${lesson}: no topic "${t}" in the bank chapter`);
    }
  }
  return errors;
}

/**
 * The bank topics a Learn lesson was BUILT from: Concept Ladder records each lesson's sources as
 * `<book file>#<bank topic>` (2026-11-27: 1,588 of 1,667 sources carry one, nearly all Maharashtra
 * textbook topics). Kept only when the topic is one of THIS chapter's, so a Maharashtra course gets
 * its own exam's topics and every other course gets nothing from here (its exam names topics
 * differently). Scored against two agent-reviewed courses: 90% exact, 98% sharing a topic.
 */
export function sourceTopics(sources: readonly string[], chapterTopics: readonly string[]): string[] {
  const out: string[] = [];
  for (const s of sources) {
    const at = s.indexOf("#");
    if (at < 0) continue;
    const t = s.slice(at + 1);
    if (chapterTopics.includes(t) && !out.includes(t)) out.push(t);
  }
  return out.slice(0, 3);
}
