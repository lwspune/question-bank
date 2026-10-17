/**
 * V's my_progress tool (2026-10-16, owner): a signed-in student asks "how am I
 * doing?" and V answers from their own mock results.
 *
 * Nothing new is read or computed here. The route passes a loader built on
 * getOwnPerformance() (lib/performance/service.ts: the student's own login,
 * through a database function that takes no user id, so it cannot fetch anyone
 * else) and buildPerformance(), the same numbers /performance shows. Weak and
 * strong chapters come from the mastery map's own bandOf(), so V and /me/map
 * can never disagree, and a chapter with fewer than 3 judged answers is never
 * called either.
 *
 * What V reads: chapter names, counts and percentages. No question text, no
 * name, no email, and nothing about any other student.
 *
 * The read is the heaviest per-student query we have, so a student's summary
 * is remembered for a few minutes (createProgressMemo): "how am I doing?" then
 * "which chapter first?" reads the database once. The memory lives in the
 * server instance, so a cold instance simply reads again.
 *
 * PRACTICE OUTSIDE MOCKS (2026-10-17). A student who had answered 328 bank
 * questions that evening asked "today how many question i solved?" and V,
 * reading mocks only, told them it could not see. The tool now also reads
 * get_own_practice_counts (lib/activity/practiceCounts.ts, migration 0165):
 * answers today, in the last 7 days and in all, by India's day, through the
 * student's own login again. It is not remembered like the mock summary: it is
 * one small read, and "today" should move between two questions. Each read
 * fails alone, so a slow mock read still lets V give the practice, and the other
 * way round.
 *
 * Pure apart from the injected loaders. Spec: tests/chat-progress.test.ts.
 */
import type { Performance } from "@/lib/performance/compute";
import type { PracticeCounts, PracticeSpan } from "@/lib/activity/practiceCounts";
import { bandOf } from "@/lib/performance/masteryMap";
import type { VTool } from "./anthropic";

const MAX_LANES = 3;
const MAX_WEAK = 3;
const MAX_STRONG = 2;

const SIGNED_OUT =
  "The student is signed out, so their results cannot be read. Tell them to sign in to see their progress at /performance.";
const UNAVAILABLE = "Their progress is unavailable right now. Point them to /performance instead.";
const MOCKS_UNAVAILABLE = "Their mock results are unavailable right now; for those, point them to /performance.";

function spanText(s: PracticeSpan): string {
  const parts: string[] = [];
  if (s.answered > 0) parts.push(`${s.answered} answered, ${s.right} right`);
  if (s.revealed > 0) parts.push(`${s.revealed} answer${s.revealed === 1 ? "" : "s"} read without picking an option`);
  return parts.length > 0 ? `${parts.join("; ")}.` : "nothing yet.";
}

function hasPractice(p: PracticeCounts | null | undefined): p is PracticeCounts {
  return !!p && (p.all.answered > 0 || p.all.revealed > 0);
}

/** The practice half: question bank, board reader, guides, question of the day and drill. */
function practiceLines(p: PracticeCounts): string[] {
  if (!hasPractice(p)) return ["No practice outside mocks yet."];
  return [
    "Questions practised outside mocks (question bank, board reader, guides, question of the day, drill), by the day in India:",
    `Today: ${spanText(p.today)}`,
    `Last 7 days (today included): ${spanText(p.week)}`,
    `All time: ${spanText(p.all)}`,
  ];
}

function rightOf(c: { chapter: string; correct: number; judged: number }): string {
  return `${c.chapter} (${c.correct} of ${c.judged} right)`;
}

/**
 * What V reads back: a few lines in plain words, with the pages to link.
 * `practice` undefined = not read (the mock half alone, as before 2026-10-17).
 */
export function progressFacts(perf: Performance, practice?: PracticeCounts | null): string {
  const s = perf.summary;
  // Practice first: for most students it is all there is, and V says what went well first.
  const lines: string[] = practice ? practiceLines(practice) : [];
  const unfinished = s.inProgress > 0 ? ` ${s.inProgress} mock${s.inProgress === 1 ? " is" : "s are"} started but not finished.` : "";

  if (s.graded === 0 || !s.latest) {
    lines.push(
      hasPractice(practice)
        ? `No graded mock yet, so no mock scores or chapter bands. A timed mock at /mock is a good next step.${unfinished}`
        : `No graded mock yet; progress appears after the first one. Suggest a timed mock at /mock.${unfinished}`
    );
    return lines.join("\n");
  }

  let change = "";
  if (s.deltaPoints !== null) {
    if (s.deltaPoints > 0) change = `, up ${s.deltaPoints} points on the one before`;
    else if (s.deltaPoints < 0) change = `, down ${-s.deltaPoints} points on the one before`;
    else change = ", the same as the one before";
  }
  // Mock titles carry em dashes ("NDA 2026 (II) — Paper II — ..."), which V's rules forbid it to write.
  const title = s.latest.title.replace(/\s*—\s*/g, ", ");
  lines.push(`${s.graded} graded mock${s.graded === 1 ? "" : "s"}. Latest: ${title}: ${s.latest.pct}%${change}.${unfinished}`);

  const lanes = [...perf.lanes].sort((a, b) => b.attempts - a.attempts).slice(0, MAX_LANES);
  for (const lane of lanes) {
    if (lane.accuracy === null) continue;
    lines.push(
      `${lane.exam} | ${lane.subject}: ${lane.accuracy}% right over ${lane.judged} answered questions in ${lane.attempts} mock${lane.attempts === 1 ? "" : "s"}.`
    );
    const weak = lane.chapters
      .filter((c) => bandOf(c) === "weak")
      .sort((a, b) => a.weightedScore - b.weightedScore)
      .slice(0, MAX_WEAK);
    const strong = lane.chapters
      .filter((c) => bandOf(c) === "mastered")
      .sort((a, b) => b.weightedScore - a.weightedScore)
      .slice(0, MAX_STRONG);
    if (weak.length > 0) lines.push(`Needs work: ${weak.map(rightOf).join(", ")}.`);
    if (strong.length > 0) lines.push(`Strong: ${strong.map(rightOf).join(", ")}.`);
  }

  // Measured on real students: "9 of 14 right" listed as needs work. Without this V would contradict itself.
  lines.push(
    "Needs work and Strong follow the mastery map: recent mocks count more, and questions left blank count against a chapter, so a band can differ from the plain count."
  );
  lines.push(
    "Pages: /performance (full breakdown and what to work on), /me/map (mastery map by chapter), /drill (practise the questions they got wrong)."
  );
  return lines.join("\n");
}

/**
 * The tool V is given. `load` is undefined for a signed-out visitor: nothing is
 * read. `loadPractice` is the student's practice outside mocks.
 */
export function progressTool(
  load: (() => Promise<Performance | null>) | undefined,
  loadPractice?: () => Promise<PracticeCounts>
): VTool {
  return {
    name: "my_progress",
    description:
      "Get this student's own progress: questions practised today, in the last 7 days and in all (outside mocks), plus their mock scores, change, and weak and strong chapters. Takes no input. Use only when they ask about their own results or practice.",
    input_schema: { type: "object", properties: {} },
    run: async () => {
      if (!load) return SIGNED_OUT;
      const [perf, practice] = await Promise.allSettled([load(), loadPractice ? loadPractice() : Promise.resolve(undefined)]);
      if (practice.status === "rejected") console.error("V: my_progress practice read failed", practice.reason);
      const counts = practice.status === "fulfilled" ? practice.value : undefined;
      if (perf.status === "rejected") {
        console.error("V: my_progress read failed", perf.reason);
        return hasPractice(counts) ? [...practiceLines(counts), MOCKS_UNAVAILABLE].join("\n") : UNAVAILABLE;
      }
      return perf.value ? progressFacts(perf.value, counts) : SIGNED_OUT;
    },
  };
}

export const PROGRESS_MEMO_MS = 5 * 60 * 1000;

/** A few minutes' memory of each student's summary, at most `max` students. A failed read is not kept. */
export function createProgressMemo(max: number) {
  const entries = new Map<string, { at: number; value: Performance | null }>();
  return {
    async get(key: string, load: () => Promise<Performance | null>, now = Date.now()): Promise<Performance | null> {
      const hit = entries.get(key);
      if (hit && now - hit.at < PROGRESS_MEMO_MS) return hit.value;
      const value = await load();
      entries.delete(key);
      entries.set(key, { at: now, value });
      // Oldest first in a Map: drop from the front.
      while (entries.size > max) entries.delete(entries.keys().next().value as string);
      return value;
    },
    size: () => entries.size,
  };
}
