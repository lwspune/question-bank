/**
 * "Asked in NDA" (exam twins, migration 0220): turn a board question's links to
 * entrance-exam past questions into the one line the student sees, and a
 * chapter's links into its count. Pure: the same code runs on the server and in
 * the browser, where the student's own exam is known.
 *
 * Three kinds of link, settled by a person (scripts/cross-exam/README.md):
 * - exact: the same question; only wording or format differ.
 * - numbers: the same question with new numbers or another matrix.
 * - similar: the same specific task, so one worked example teaches both.
 *
 * Owner rules (2026-11-06), so it stays compact however many exams are matched:
 * one line per question; "similar" alone gets its own quiet wording and never
 * counts as "asked"; the student's own exam comes first.
 */

export type TwinKind = "exact" | "numbers" | "similar";

export type TwinLink = {
  /** The exam's past question. */
  targetId: string;
  kind: TwinKind;
  /** questions.exam name, e.g. "NDA" or "MHT-CET". */
  examName: string;
  /** How the exam is named on the page. */
  examLabel: string;
  /** One sitting, named the way the student knows it: "NDA 2 2023". */
  paper: string;
  /** Larger is newer (year * 100 + month). */
  paperOrder: number;
};

export type TwinSummary = {
  /** "asked": NDA asked it, the same or with new numbers. "similar": only like one. */
  tone: "asked" | "similar";
  label: string;
  detail: string | null;
  /** Every linked question once, in the order the panel shows them. */
  links: TwinLink[];
  /** The distinct papers, in panel order. */
  papers: string[];
};

const RANK: Record<TwinKind, number> = { exact: 3, numbers: 2, similar: 1 };

const isAsked = (l: TwinLink) => l.kind !== "similar";

function distinct<T>(xs: T[]): T[] {
  return Array.from(new Set(xs));
}

/** Exams in naming order: the student's own first, then the one with more papers, then by name. */
function examOrder(links: TwinLink[], preferred: string | null | undefined): { name: string; label: string }[] {
  const papers = new Map<string, Set<string>>();
  const labels = new Map<string, string>();
  for (const l of links) {
    if (!papers.has(l.examName)) papers.set(l.examName, new Set());
    papers.get(l.examName)!.add(l.paper);
    labels.set(l.examName, l.examLabel);
  }
  return Array.from(papers.keys())
    .sort((a, b) => {
      if (a === preferred) return -1;
      if (b === preferred) return 1;
      return papers.get(b)!.size - papers.get(a)!.size || labels.get(a)!.localeCompare(labels.get(b)!);
    })
    .map((name) => ({ name, label: labels.get(name)! }));
}

/** "NDA", "NDA, MHT-CET", "NDA, MHT-CET +2". */
function nameExams(exams: { label: string }[]): string {
  const shown = exams.slice(0, 2).map((e) => e.label).join(", ");
  return exams.length > 2 ? `${shown} +${exams.length - 2}` : shown;
}

const plural = (n: number) => `${n} ${n === 1 ? "paper" : "papers"}`;

export function summariseTwins(input: TwinLink[], preferredExam?: string | null): TwinSummary | null {
  if (input.length === 0) return null;
  const seen = new Set<string>();
  const unique = input.filter((l) => (seen.has(l.targetId) ? false : (seen.add(l.targetId), true)));

  const links = [...unique].sort((a, b) => {
    const pa = a.examName === preferredExam ? 1 : 0;
    const pb = b.examName === preferredExam ? 1 : 0;
    return pb - pa || RANK[b.kind] - RANK[a.kind] || b.paperOrder - a.paperOrder;
  });
  const papers = distinct(links.map((l) => l.paper));

  const asked = links.filter(isAsked);
  if (asked.length > 0) {
    const exams = examOrder(asked, preferredExam);
    const askedPapers = distinct(asked.map((l) => l.paper));
    const kinds = new Set(asked.map((l) => l.kind));
    if (exams.length === 1 && askedPapers.length === 1) {
      return {
        tone: "asked",
        label: `Asked in ${askedPapers[0]}`,
        detail: kinds.has("exact") ? "same question" : "new numbers",
        links,
        papers,
      };
    }
    let detail = plural(askedPapers.length);
    if (exams.length === 1 && kinds.size === 1) detail += kinds.has("exact") ? " · same question" : " · new numbers";
    return { tone: "asked", label: `Asked in ${nameExams(exams)}`, detail, links, papers };
  }

  if (papers.length <= 2) {
    return { tone: "similar", label: `Similar to ${papers.join(" · ")}`, detail: null, links, papers };
  }
  return {
    tone: "similar",
    label: `Similar to ${nameExams(examOrder(links, preferredExam))}`,
    detail: plural(papers.length),
    links,
    papers,
  };
}

export type ChapterTwinTally = {
  examName: string;
  examLabel: string;
  /** Board questions this exam asked, the same or with new numbers. */
  asked: number;
  /** Board questions only like one of this exam's (never counted as asked). */
  similar: number;
};

/** One entry per exam: how many of the chapter's questions it asked, and how many it only resembles. */
export function tallyChapterTwins(byQuestion: TwinLink[][], preferredExam?: string | null): ChapterTwinTally[] {
  const tally = new Map<string, ChapterTwinTally>();
  for (const links of byQuestion) {
    const perExam = new Map<string, TwinLink[]>();
    for (const l of links) {
      if (!perExam.has(l.examName)) perExam.set(l.examName, []);
      perExam.get(l.examName)!.push(l);
    }
    for (const [examName, ls] of perExam) {
      if (!tally.has(examName)) tally.set(examName, { examName, examLabel: ls[0].examLabel, asked: 0, similar: 0 });
      const t = tally.get(examName)!;
      if (ls.some(isAsked)) t.asked += 1;
      else t.similar += 1;
    }
  }
  return Array.from(tally.values()).sort((a, b) => {
    if (a.examName === preferredExam) return -1;
    if (b.examName === preferredExam) return 1;
    return b.asked - a.asked || b.similar - a.similar || a.examLabel.localeCompare(b.examLabel);
  });
}

export type LinePart = { text: string; bold?: boolean };

/**
 * The /board chapter page's one-line summary (2026-11-07, owner OK'd on a
 * mockup; it replaced a ~130 px box). Names the total ("of the 142 questions
 * here") because the header above counts the textbook alone. "Similar" is
 * never called asked, and similar counts are never added across exams: one
 * question can resemble two. Empty when nothing matched.
 * Spec: tests/cross-exam-summary.test.ts.
 */
export function chapterTwinLine(tally: readonly ChapterTwinTally[], total: number): LinePart[] {
  const of = `the ${total} questions here`;
  if (tally.length === 0) return [];
  if (tally.length === 1) {
    const t = tally[0];
    if (t.asked === 0) {
      return [{ text: String(t.similar), bold: true }, { text: ` of ${of} are similar to ${t.examLabel} questions` }];
    }
    const parts: LinePart[] = [{ text: String(t.asked), bold: true }, { text: ` of ${of} were asked in ${t.examLabel}` }];
    if (t.similar > 0) parts.push({ text: " · " }, { text: String(t.similar), bold: true }, { text: " similar" });
    return parts;
  }
  const asked = tally.filter((t) => t.asked > 0);
  const list = asked.length > 0 ? asked : tally;
  const parts: LinePart[] = [{ text: `Of ${of}, ${asked.length > 0 ? "asked in" : "similar to"} ` }];
  list.forEach((t, i) => {
    if (i > 0) parts.push({ text: " · " });
    parts.push({ text: `${t.examLabel} ` }, { text: String(asked.length > 0 ? t.asked : t.similar), bold: true });
  });
  return parts;
}
