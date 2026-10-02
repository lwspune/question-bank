/**
 * The homepage's exam chips — one row under the hero (UX_REVIEW_TRIAGE.md A8).
 *
 * WHY. On a 390 px phone the exam choice sat behind ~1,500 px of cards. A chip
 * row lets a visitor pick an exam without scrolling. A single exam's chip goes
 * where its card goes and carries the slug to remember in `qb_exam`, which
 * upgrades the Bank and Board tabs to that exam (the 2026-08-21 decision: a
 * missing cookie is "no choice", a set one only ever personalises those two).
 * A family's chip jumps to its card instead, and remembers nothing, because a
 * family (CBSE, a state board, MPSC) names no single exam.
 *
 * Pure; the slug is validated HERE so the client island imports nothing heavy.
 * Spec: tests/home-exam-chips.test.ts.
 */
import { isExamSlug, type ExamSlug } from "./examContext";
import type { ExamFamilyNode } from "./examFamily";

export type HomeExamChip = {
  key: string;
  label: string;
  href: string;
  /** Set only for a single exam: the slug to remember on tap. */
  cookieSlug: ExamSlug | null;
};

type ChipItem = {
  slug: string;
  displayName: string;
  href: string;
  counts: { pyq: number; practice: number };
};

const hasQuestions = (i: ChipItem) => i.counts.pyq + i.counts.practice > 0;

/** The id a card carries so a family chip can jump to it. */
export function examCardAnchor(key: string): string {
  return `exam-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export function homeExamChips<T extends ChipItem>(nodes: readonly ExamFamilyNode<T>[]): HomeExamChip[] {
  const chips: HomeExamChip[] = [];
  for (const node of nodes) {
    if (node.kind === "family") {
      if (!node.members.some((m) => hasQuestions(m.item))) continue;
      chips.push({ key: node.key, label: node.label, href: `#${examCardAnchor(node.key)}`, cookieSlug: null });
      continue;
    }
    const exam = node.item;
    if (!hasQuestions(exam)) continue;
    chips.push({
      key: exam.slug,
      label: exam.displayName,
      href: exam.href,
      cookieSlug: isExamSlug(exam.slug) ? exam.slug : null,
    });
  }
  return chips;
}
