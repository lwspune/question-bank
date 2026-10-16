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
 * Pure apart from the injected loader. Spec: tests/chat-progress.test.ts.
 */
import type { Performance } from "@/lib/performance/compute";
import { bandOf } from "@/lib/performance/masteryMap";
import type { VTool } from "./anthropic";

const MAX_LANES = 3;
const MAX_WEAK = 3;
const MAX_STRONG = 2;

const SIGNED_OUT =
  "The student is signed out, so their results cannot be read. Tell them to sign in to see their progress at /performance.";
const UNAVAILABLE = "Their progress is unavailable right now. Point them to /performance instead.";

function rightOf(c: { chapter: string; correct: number; judged: number }): string {
  return `${c.chapter} (${c.correct} of ${c.judged} right)`;
}

/** What V reads back: a few lines in plain words, with the pages to link. */
export function progressFacts(perf: Performance): string {
  const s = perf.summary;
  const lines: string[] = [];
  const unfinished = s.inProgress > 0 ? ` ${s.inProgress} mock${s.inProgress === 1 ? " is" : "s are"} started but not finished.` : "";

  if (s.graded === 0 || !s.latest) {
    lines.push(`No graded mock yet; progress appears after the first one. Suggest a timed mock at /mock.${unfinished}`);
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

/** The tool V is given. `load` is undefined for a signed-out visitor: nothing is read. */
export function progressTool(load: (() => Promise<Performance | null>) | undefined): VTool {
  return {
    name: "my_progress",
    description:
      "Get this student's own mock-test progress: latest score, change, and weak and strong chapters. Takes no input. Use only when they ask about their own results.",
    input_schema: { type: "object", properties: {} },
    run: async () => {
      if (!load) return SIGNED_OUT;
      try {
        const perf = await load();
        return perf ? progressFacts(perf) : SIGNED_OUT;
      } catch (err) {
        console.error("V: my_progress read failed", err);
        return UNAVAILABLE;
      }
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
