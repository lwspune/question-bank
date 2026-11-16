/**
 * What V is told about a question beyond its text (owner, 2026-11-16): the
 * marks it carried in its printed board paper, and the other papers that asked
 * it. In the 14 days to 2026-11-16 students asked "how many marks is this?"
 * twice and "any other year?" / "how many were repeated?" twice; V answered
 * none, though the site holds all of it (board_paper_items 0146/0147, the
 * homework plans' repeat and type groups 0216).
 *
 * Both lines are null when there is nothing on record, and V is told never to
 * read null as "not repeated": a question no plan covers has no groups at all.
 * Pure. Spec: tests/chat-question-extras.test.ts. Reads: questionToolsServer.ts.
 */
import type { RepeatGroup } from "@/lib/questions/repeatLine";

/** One printed board paper's entry for the question. */
export type PaperMark = {
  paperTitle: string;
  year: number;
  printedNumber: string;
  /** Null for a part of a question (0147): the marks sit on the whole question. */
  marks: number | null;
  /** The whole question a part belongs to, with its marks. */
  partOf: { printedNumber: string; marks: number } | null;
};

const MARKS_PAPERS = 3;

function marksWord(n: number): string {
  return `${n} ${n === 1 ? "mark" : "marks"}`;
}

/** Papers store the number bare ("27", "3 (ii)"); V should say "Q. 27". */
function qNumber(printed: string): string {
  const n = printed.trim();
  return /^q/i.test(n) ? n : `Q. ${n}`;
}

function markPhrase(m: PaperMark): string | null {
  const number = qNumber(m.printedNumber);
  if (m.marks !== null) return `${number} in ${m.paperTitle} carries ${marksWord(m.marks)}`;
  if (m.partOf) {
    return `${number} in ${m.paperTitle} is part of ${qNumber(m.partOf.printedNumber)}, which carries ${marksWord(m.partOf.marks)} for all its parts; the paper does not split them`;
  }
  return null;
}

/** "Marks: Q. 27 in <paper> carries 4 marks." Newest paper first, at most 3. */
export function marksLine(papers: readonly PaperMark[]): string | null {
  const phrases = [...papers]
    .sort((a, b) => b.year - a.year)
    .map(markPhrase)
    .filter((p): p is string => p !== null)
    .slice(0, MARKS_PAPERS);
  return phrases.length === 0 ? null : `Marks: ${phrases.join("; ")}.`;
}

/** Past this many papers the list keeps its first three and last two. */
const LIST_MAX = 8;

function paperList(sittings: readonly string[]): string {
  // A trailing `*` marks a paper that changed the numbers (lib/questions/repeatLine).
  const names = sittings.map((s) => (s.trimEnd().endsWith("*") ? `${s.replace(/\*+\s*$/, "").trim()} (new numbers)` : s.trim()));
  if (names.length <= LIST_MAX) return names.join(", ");
  return `${names.slice(0, 3).join(", ")} ... ${names.slice(-2).join(", ")}`;
}

/** The group with the most papers, of one tier. */
function biggest(groups: readonly RepeatGroup[], tier: RepeatGroup["tier"]): RepeatGroup | null {
  let best: RepeatGroup | null = null;
  for (const g of groups) {
    if (g.tier !== tier || g.sittings.length < 2) continue;
    if (!best || g.sittings.length > best.sittings.length) best = g;
  }
  return best;
}

/**
 * "Repeats: this same question was asked in 3 papers: ...". A type is always
 * questions LIKE it, never this question. Unlike the card's line it shows a
 * type from 2 papers up: V answers a direct ask, the card shows everyone.
 */
export function repeatsLine(groups: readonly RepeatGroup[]): string | null {
  const parts: string[] = [];
  const same = biggest(groups, "repeat");
  if (same) parts.push(`this same question was asked in ${same.sittings.length} papers: ${paperList(same.sittings)}.`);
  const type = biggest(groups, "type");
  if (type) {
    const lead = `questions of this type (same idea, own numbers) were asked ${type.sittings.length} times: ${paperList(type.sittings)}.`;
    parts.push(parts.length === 0 ? lead : lead[0].toUpperCase() + lead.slice(1));
  }
  return parts.length === 0 ? null : `Repeats: ${parts.join(" ")}`;
}
