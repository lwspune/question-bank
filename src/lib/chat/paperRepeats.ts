/**
 * "How many questions of this paper were repeated?" (owner, 2026-11-16): a
 * student on a /question-papers page asked how many of its questions came from
 * earlier years, and V could only give chapter shares. The homework plans'
 * repeat and type groups (0216) answer it, question by question.
 *
 * "No repeat on record" is never "not repeated": a plan may not cover the
 * paper's subject, so the text says what it does not know.
 * Pure. Spec: tests/chat-paper-repeats.test.ts. Read: paperRepeatsServer.ts.
 */
import type { RepeatGroup } from "@/lib/questions/repeatLine";

export type PaperPage = { examSlug: string; subjectSlug: string; paperSlug: string };

const PAPER_PAGE = /^\/question-papers\/([a-z0-9-]+)\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/;

/** The paper a /question-papers/<exam>/<subject>/<paper> page shows, or null. */
export function paperPageOf(path: string | null | undefined): PaperPage | null {
  if (!path) return null;
  const m = PAPER_PAGE.exec(path.split(/[?#]/)[0]);
  return m ? { examSlug: m[1], subjectSlug: m[2], paperSlug: m[3] } : null;
}

const LIST_MAX = 10;

function qNumber(printed: string): string {
  const n = printed.trim();
  return /^q/i.test(n) ? n : `Q. ${n}`;
}

function papersOf(group: RepeatGroup): string {
  return group.sittings.map((s) => s.replace(/\*+\s*$/, "").trim()).join(", ");
}

function list(entries: string[]): string {
  const shown = entries.slice(0, LIST_MAX).join("; ");
  return entries.length > LIST_MAX ? `${shown}; and ${entries.length - LIST_MAX} more` : shown;
}

/** One paper's questions against their repeat groups, in a few sentences V can quote. */
export function paperRepeatsText(
  paperName: string,
  items: readonly { printedNumber: string; questionId: string }[],
  groups: ReadonlyMap<string, readonly RepeatGroup[]>
): string {
  const same: string[] = [];
  const type: string[] = [];
  for (const item of items) {
    const mine = groups.get(item.questionId) ?? [];
    const repeat = mine.find((x) => x.tier === "repeat" && x.sittings.length >= 2);
    if (repeat) {
      same.push(`${qNumber(item.printedNumber)} (${papersOf(repeat)})`);
      continue;
    }
    if (mine.some((x) => x.tier === "type" && x.sittings.length >= 2)) type.push(qNumber(item.printedNumber));
  }
  const total = items.length;
  const head = `${paperName} has ${total} ${total === 1 ? "question" : "questions"}.`;
  if (same.length === 0 && type.length === 0) {
    return `${head} None of them has a repeat on record; this does not prove they were never asked before.`;
  }
  const parts = [head];
  if (same.length > 0) {
    parts.push(`${same.length} ${same.length === 1 ? "was" : "were"} asked as the same question in another paper too: ${list(same)}.`);
  }
  if (type.length > 0) {
    parts.push(`${type.length} more ${type.length === 1 ? "is" : "are"} of a type asked in other papers: ${list(type)}.`);
  }
  const rest = total - same.length - type.length;
  if (rest > 0) parts.push(rest === 1 ? "The other one has no repeat on record." : `The other ${rest} have no repeat on record.`);
  return parts.join(" ");
}
