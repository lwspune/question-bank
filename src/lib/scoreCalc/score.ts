/**
 * Answer-key score calculators (growth registry "score-calculator", 2026-11-16).
 *
 * A student brings their own answer-key sheet; a reader (SSC: the colours on
 * SSC's answer-key page, JEE: NTA's key against the response sheet) turns it
 * into one outcome per question, and this file turns outcomes into marks.
 *
 * ONE SOURCE FOR MARKING. Each calculator points at the exam's mock blueprint
 * (src/lib/mocks/blueprints.ts), so the timed mock and the calculator can never
 * disagree on +2 / -0.5 or on the order of the parts. An exam without a
 * blueprint (SSC MTS today) gets no calculator until its scheme is checked
 * against SSC's notice and written down there.
 *
 * REFUSE RATHER THAN GUESS. A reader that misses or doubles a question would
 * otherwise produce a confident wrong score, so every section's count must
 * match the paper exactly or the result is an error the page shows as
 * "we could not read your sheet".
 */
import {
  JEE_MAINS_PAPER,
  SSC_CGL_T1_PAPER,
  SSC_CHSL_T1_PAPER,
  SSC_CPO_P1_PAPER,
  type MockPaperBlueprint,
} from "@/lib/mocks/blueprints";

/** How a student's sheet is read. */
export type SheetSource = "ssc-sheet" | "nta-key";

export interface ScoreCalculator {
  /** URL segment: /score-calculator/<slug>. Named the way students search. */
  slug: string;
  /** Short name used in headings, e.g. "SSC CGL Tier I". */
  title: string;
  source: SheetSource;
  blueprint: MockPaperBlueprint;
  /** Has a page. False until its reader is built and checked on a real sheet. */
  live: boolean;
  /** Where to practise next: the exam's past-paper mocks. */
  practiceHref: string;
}

export const SCORE_CALCULATORS: readonly ScoreCalculator[] = [
  { slug: "jee-main", title: "JEE Main", source: "nta-key", blueprint: JEE_MAINS_PAPER, live: true, practiceHref: "/mock/exam/jee-mains" },
  { slug: "ssc-cgl", title: "SSC CGL Tier I", source: "ssc-sheet", blueprint: SSC_CGL_T1_PAPER, live: false, practiceHref: "/mock/exam/ssc-cgl" },
  { slug: "ssc-chsl", title: "SSC CHSL Tier I", source: "ssc-sheet", blueprint: SSC_CHSL_T1_PAPER, live: false, practiceHref: "/mock/exam/ssc-chsl" },
  { slug: "ssc-cpo", title: "SSC CPO Paper I", source: "ssc-sheet", blueprint: SSC_CPO_P1_PAPER, live: false, practiceHref: "/mock/exam/ssc-cpo" },
];

export const LIVE_CALCULATORS = SCORE_CALCULATORS.filter((c) => c.live);

export function calculatorBySlug(slug: string): ScoreCalculator | undefined {
  return SCORE_CALCULATORS.find((c) => c.slug === slug);
}

/**
 * One question as the reader saw it. `bonus` = a question the exam body dropped
 * or marked with more than one right answer, scored as right.
 */
export interface SheetItem {
  section: string;
  outcome: "right" | "wrong" | "blank" | "bonus";
}

export interface SectionScore {
  key: string;
  label: string;
  marks: number;
  max: number;
  right: number;
  wrong: number;
  blank: number;
  bonus: number;
}

export interface Score {
  total: number;
  max: number;
  right: number;
  wrong: number;
  blank: number;
  bonus: number;
  /** Marks lost to wrong answers, as a positive number. */
  negative: number;
  sections: SectionScore[];
}

export type ScoreResult = { ok: true; score: Score } | { ok: false; error: string };

export function computeScore(blueprint: MockPaperBlueprint, items: readonly SheetItem[]): ScoreResult {
  const { correct, wrong: wrongMark } = blueprint.marking;
  const byKey = new Map<string, SectionScore>();
  for (const s of blueprint.sections) {
    if (s.count === undefined) return { ok: false, error: `${s.label} has no fixed number of questions.` };
    byKey.set(s.key, { key: s.key, label: s.label, marks: 0, max: s.count * correct, right: 0, wrong: 0, blank: 0, bonus: 0 });
  }

  for (const item of items) {
    const sec = byKey.get(item.section);
    if (!sec) return { ok: false, error: `The sheet has a part this paper does not have ("${item.section}").` };
    sec[item.outcome] += 1;
  }

  for (const s of blueprint.sections) {
    const sec = byKey.get(s.key)!;
    const seen = sec.right + sec.wrong + sec.blank + sec.bonus;
    if (seen !== s.count) {
      return { ok: false, error: `${s.label}: read ${seen} questions, the paper has ${s.count}.` };
    }
    sec.marks = (sec.right + sec.bonus) * correct + sec.wrong * wrongMark;
  }

  const sections = blueprint.sections.map((s) => byKey.get(s.key)!);
  const sum = (f: (s: SectionScore) => number) => sections.reduce((a, s) => a + f(s), 0);
  const wrong = sum((s) => s.wrong);
  return {
    ok: true,
    score: {
      total: sum((s) => s.marks),
      max: sum((s) => s.max),
      right: sum((s) => s.right),
      wrong,
      blank: sum((s) => s.blank),
      bonus: sum((s) => s.bonus),
      negative: Math.abs(wrong * wrongMark),
      sections,
    },
  };
}
