/**
 * Name an exam twin's paper the way students know it ("NDA 2 2023",
 * "MHT-CET 10 May 2025 S2"), with the homework plans' sitting labels, so a
 * paper is named the same on /homework and under a board question. An exam
 * with no labeller of its own, or a row its labeller cannot read, falls back
 * to exam, month and year: a label must never break a page.
 */
import { getExamByName } from "@/lib/exam/examContext";
import { cdsSittingLabel, cetSittingLabel, ndaSittingLabel } from "@/lib/homework/sittings";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthIndex(month: string | null): number {
  if (!month) return 0;
  const i = MONTHS.findIndex((m) => month.startsWith(m));
  return i + 1;
}

const LABELLERS: Record<string, (year: number, month: string | null, note: string | null) => string> = {
  NDA: (y, m) => ndaSittingLabel(y, m),
  CDS: (y, m) => cdsSittingLabel(y, m),
  "MHT-CET": (y, m, n) => `MHT-CET ${cetSittingLabel(y, m, n)}`,
};

export function twinPaper(
  examName: string,
  year: number,
  month: string | null,
  note: string | null
): { examLabel: string; paper: string; paperOrder: number } {
  const examLabel = getExamByName(examName)?.displayName ?? examName;
  const mi = monthIndex(month);
  const fallback = mi > 0 ? `${examLabel} ${MONTHS[mi - 1]} ${year}` : `${examLabel} ${year}`;
  let paper = fallback;
  const labeller = LABELLERS[examName];
  if (labeller) {
    try {
      paper = labeller(year, month, note);
    } catch {
      paper = fallback;
    }
  }
  return { examLabel, paper, paperOrder: year * 100 + mi };
}
