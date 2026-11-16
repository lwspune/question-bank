/**
 * "What this means" under a calculator score: one line for what went well, one
 * for where the next marks are (growth-framed, never a bare verdict; the
 * engagement rules in CLAUDE.md). Plain sentences, no em dashes (owner rule).
 *
 * Next marks: blanks first (questions never tried cost nothing to try in
 * practice), then wrong answers (negative marking took marks away).
 */
import type { MockPaperBlueprint } from "@/lib/mocks/blueprints";
import type { Score, SectionScore } from "./score";

const BLANKS_WORTH_NAMING = 3;
const WRONGS_WORTH_NAMING = 3;
/** Subjects within this share of each other read as "even". */
const EVEN_GAP = 0.08;

const share = (s: SectionScore) => (s.max > 0 ? s.marks / s.max : 0);

export function scoreInsights(blueprint: MockPaperBlueprint, score: Score): string[] {
  const sections = [...score.sections];
  if (sections.length < 2) return [];
  const byShare = [...sections].sort((a, b) => share(b) - share(a));
  const best = byShare[0];
  const worst = byShare[byShare.length - 1];

  if (share(best) - share(worst) < EVEN_GAP) {
    return [`Even across all ${sections.length === 3 ? "three" : sections.length} ${sections.length === 3 ? "subjects" : "parts"}. Well done.`];
  }

  const lines = [`${best.label} carried your score.`];
  const { correct, wrong } = blueprint.marking;
  if (worst.blank >= BLANKS_WORTH_NAMING) {
    lines.push(
      `${worst.label} is where your next marks are: you left ${worst.blank} questions blank there, worth up to ${worst.blank * correct} marks.`,
    );
  } else if (worst.wrong >= WRONGS_WORTH_NAMING && wrong < 0) {
    const lost = worst.wrong * -wrong;
    lines.push(
      `${worst.label} cost you the most: ${worst.wrong} wrong answers took away ${lost} marks. Answer only when you can rule out the other options.`,
    );
  } else {
    lines.push(`${worst.label} is where your next marks are.`);
  }
  return lines;
}
