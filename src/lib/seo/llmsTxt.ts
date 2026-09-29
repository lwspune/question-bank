/**
 * /llms.txt — a plain-text index for language-model crawlers (llmstxt.org).
 *
 * GENERATED from the exam registry and the live catalogue, never a static
 * file: the README's typed exam list lagged three ingests, and a file nobody
 * reads would lag worse. Whether any engine reads llms.txt is unconfirmed as
 * of 2026-09-29; it costs one route and cannot mislead, because every line
 * is derived from the same data the pages render. Pure — spec in
 * tests/llms-txt.test.ts; the route handler is src/app/llms.txt/route.ts.
 */
import { examHomeHref } from "@/lib/exam/examHome";

const SITE_URL = "https://www.pyqvault.com";

export type LlmsExam = {
  slug: string;
  displayName: string;
  examName: string;
  totalPublicQuestions: number;
  practiceOnly: boolean;
  noPublicContent: boolean;
};

const HUBS: readonly [path: string, title: string, blurb: string][] = [
  ["/questions", "Question bank by chapter", "every chapter page: past-year questions with answers, worked solutions, years covered, difficulty split and most-asked subtopics"],
  ["/notes", "Chapter notes", "self-sufficient teaching notes per chapter — concepts, worked past-year examples, self-checks and practice"],
  ["/guide", "Strategy guides", "per-subject guides built by counting the papers: chapter weightage, playbooks, traps"],
  ["/guide/reports", "Trend reports", "year-by-year analyses of each exam's papers, dated, with the sitting each runs through"],
  ["/mock", "Timed mocks", "real past papers served whole as timed, auto-graded tests"],
  ["/board", "Textbook solutions", "school-board textbooks solved exercise by exercise, in book order"],
  ["/blog", "Blog", "paper analyses after each sitting"],
  ["/about", "About", "who builds PYQ Vault, what is free, and how to report a wrong answer"],
];

const fmt = (n: number) => n.toLocaleString("en-IN");

export function buildLlmsTxt(input: {
  exams: readonly LlmsExam[];
  totalPublicQuestions: number;
}): string {
  const exams = input.exams.filter((e) => !e.noPublicContent && e.totalPublicQuestions > 0);
  const lines: string[] = [];

  lines.push("# PYQ Vault");
  lines.push("");
  lines.push(
    `> PYQ Vault (${SITE_URL}) is a free, public bank of past-year questions for Indian entrance and board exams — ${fmt(input.totalPublicQuestions)} questions across ${exams.length} exams, each filed by exam, subject, chapter, subtopic, difficulty and the year it was asked, most with a worked solution. Browsing needs no account. Around the bank: timed mocks rebuilt from real papers, chapter notes, strategy guides with trend reports, and a textbook-solutions reader for school boards.`
  );
  lines.push("");
  lines.push("Every count on the site is a public question in the bank. Chapter pages state how many questions they hold, which papers and years they span, and their difficulty split.");
  lines.push("");
  lines.push("## Sections");
  lines.push("");
  for (const [path, title, blurb] of HUBS) {
    lines.push(`- [${title}](${SITE_URL}${path}): ${blurb}`);
  }
  lines.push("");
  lines.push("## Exams");
  lines.push("");
  for (const e of exams) {
    const kind = e.practiceOnly ? "practice questions" : "past-year questions";
    lines.push(`- [${e.displayName}](${SITE_URL}${examHomeHref(e.slug)}): ${fmt(e.totalPublicQuestions)} ${kind}`);
  }
  lines.push("");
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml): every public page with its last-modified date`);
  lines.push(`- [Privacy](${SITE_URL}/privacy)`);
  lines.push("");

  return lines.join("\n");
}
