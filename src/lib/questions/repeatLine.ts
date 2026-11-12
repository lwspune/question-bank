/**
 * The repeat line under an answered question (2026-11-12). Pure.
 *
 * The homework plans' reviewed repeat analysis (migration 0216) says which
 * questions are the SAME question asked in more than one paper ("repeat") and
 * which are the same KIND with new numbers ("type"). After a student answers,
 * the card says so in one quiet line:
 *
 *   Asked in 3 papers: NDA 1 2017, NDA 1 2021, NDA 2 2024 (new numbers in 2)
 *   Questions like this were asked 9 times, 2022 to 2026, each with its own numbers
 *
 * Only the strong cases: an exact repeat in 2+ papers, or a type asked 5+
 * times (a weak type on 40% of cards would mean nothing). A type is always
 * "questions like this", never "this question", so it cannot read as the same
 * question. Shown after the answer, never in a running mock (it is a hint).
 *
 * Paper names are the plans' own labels: "NDA 1 2017", "10 May 2023 S1",
 * "Feb 2025", or a bare "2022" for CBSE (one per year), where the line says
 * years instead of papers. A trailing `*` marks a paper that changed a number.
 * Spec: tests/repeat-line.test.ts.
 */

export type RepeatGroup = {
  tier: "repeat" | "type";
  /** The papers that asked it, oldest first; a trailing `*` = numbers changed. */
  sittings: string[];
  /** The group's number within its plan, for /homework/<plan>/group/<n>. */
  n: number;
  planSlug: string;
};

export type RepeatLine = {
  kind: "repeat" | "type";
  count: number;
  /** Printed bold. */
  lead: string;
  /** Printed after the lead; starts with its own punctuation, may be empty. */
  rest: string;
  href: string;
  linkText: string;
};

export const REPEAT_MIN_PAPERS = 2;
export const TYPE_MIN_TIMES = 5;
/** Past this many papers the line gives a year range instead of the list. */
const LIST_MAX = 4;

function qualifies(group: RepeatGroup): boolean {
  const asked = group.sittings.length;
  return group.tier === "repeat" ? asked >= REPEAT_MIN_PAPERS : asked >= TYPE_MIN_TIMES;
}

/** The group the line speaks for: an exact repeat before a type, then the most asked. */
export function pickRepeatGroup(groups: readonly RepeatGroup[]): RepeatGroup | null {
  let best: RepeatGroup | null = null;
  for (const group of groups) {
    if (!qualifies(group)) continue;
    if (
      !best ||
      (group.tier === "repeat" && best.tier === "type") ||
      (group.tier === best.tier && group.sittings.length > best.sittings.length)
    ) {
      best = group;
    }
  }
  return best;
}

const YEAR = /\b(19|20)\d{2}\b/;

/** "2022 to 2026", "in 2024", or null when any paper's name carries no year. */
function yearSpan(labels: readonly string[]): { from: number; to: number } | null {
  const years: number[] = [];
  for (const label of labels) {
    const m = YEAR.exec(label);
    if (!m) return null;
    years.push(Number(m[0]));
  }
  if (years.length === 0) return null;
  return { from: Math.min(...years), to: Math.max(...years) };
}

function spanText(span: { from: number; to: number }): string {
  return span.from === span.to ? ` in ${span.from}` : `, ${span.from} to ${span.to}`;
}

export function repeatLine(groups: readonly RepeatGroup[]): RepeatLine | null {
  const group = pickRepeatGroup(groups);
  if (!group) return null;
  const count = group.sittings.length;
  const labels = group.sittings.map((s) => s.replace(/\*+$/, "").trim());
  const span = yearSpan(labels);
  const href = `/homework/${encodeURIComponent(group.planSlug)}/group/${group.n}`;
  const linkText = `See all ${count}`;

  if (group.tier === "type") {
    const rest = span ? `${spanText(span)}, each with its own numbers` : "";
    return { kind: "type", count, lead: `Questions like this were asked ${count} times`, rest, href, linkText };
  }

  const yearsOnly = labels.every((l) => /^\d{4}$/.test(l));
  const lead = `Asked in ${count} ${yearsOnly ? "years" : "papers"}`;
  const changed = group.sittings.filter((s) => s.trimEnd().endsWith("*")).length;
  const changedNote = changed > 0 ? ` (new numbers in ${changed})` : "";
  let rest: string;
  if (count <= LIST_MAX) rest = `: ${labels.join(", ")}${changedNote}`;
  else rest = span ? `${spanText(span)}${changedNote}` : "";
  return { kind: "repeat", count, lead, rest, href, linkText };
}
