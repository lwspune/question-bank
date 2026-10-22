/**
 * The two answer-sheet emails (migration 0153): the student's "your sheet is
 * checked", and the grader's daily "sheets are waiting". The second exists so
 * the 48-hour promise cannot slip unseen: it names how long the oldest sheet
 * has waited and how many are past 36 hours.
 */
import { describe, it, expect } from "vitest";
import {
  buildAnswerRejectedEmail,
  buildAnswerReportEmail,
  buildGradingQueueEmail,
  queueSummary,
  OVERDUE_HOURS,
} from "@/lib/answerSheets/emails";

const NOW = new Date("2026-10-12T12:30:00Z");
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3600 * 1000).toISOString();

describe("queueSummary", () => {
  it("counts waiting sheets, the oldest wait, and those past the overdue line", () => {
    const s = queueSummary([hoursAgo(2), hoursAgo(40), hoursAgo(20)], 1, NOW);
    expect(s).toEqual({ waiting: 3, oldestHours: 40, overdue: 1, openQuestions: 1 });
    expect(OVERDUE_HOURS).toBe(36);
  });

  it("is null when there is nothing to do, so no email goes out", () => {
    expect(queueSummary([], 0, NOW)).toBeNull();
  });

  it("still reports open questions when no sheet is waiting", () => {
    expect(queueSummary([], 2, NOW)).toEqual({ waiting: 0, oldestHours: 0, overdue: 0, openQuestions: 2 });
  });
});

describe("buildGradingQueueEmail", () => {
  it("puts the count and any overdue sheet in the subject", () => {
    const e = buildGradingQueueEmail({ waiting: 3, oldestHours: 40, overdue: 1, openQuestions: 0 });
    expect(e.subject).toMatch(/3 answer sheets waiting/);
    expect(e.subject).toMatch(/1 past 36 hours/);
    expect(e.text).toMatch(/npm run grading:pull/);
  });

  it("says one sheet, not one sheets", () => {
    expect(buildGradingQueueEmail({ waiting: 1, oldestHours: 3, overdue: 0, openQuestions: 0 }).subject).toMatch(
      /1 answer sheet waiting/
    );
  });
});

describe("buildAnswerRejectedEmail", () => {
  it("gives the reason, says the free day was not used, and links back to the paper", () => {
    const e = buildAnswerRejectedEmail({
      name: "",
      paperTitle: "Maths 2024",
      reason: "Pages 3 to 6 are too dark to read.",
      paperUrl: "https://www.pyqvault.com/question-papers/cbse-12/mathematics/2024-65-1",
    });
    expect(e.subject).toMatch(/could not check/i);
    expect(e.text).toContain("Pages 3 to 6 are too dark to read.");
    expect(e.text).toMatch(/did not use up/);
    expect(e.text).toContain("/question-papers/cbse-12/mathematics/2024-65-1");
  });
});

describe("buildAnswerReportEmail", () => {
  const e = buildAnswerReportEmail({
    name: "Asha",
    paperTitle: "Physics <2025>",
    totalAwarded: 54.5,
    totalMax: 70,
    submissionId: "abc",
  });

  it("names the paper and the marks, and links to the report", () => {
    expect(e.subject).toContain("Physics <2025>");
    expect(e.text).toContain("54.5 / 70");
    expect(e.text).toContain("https://www.pyqvault.com/me/answer-sheets/abc");
  });

  it("says the marked pages are on the report", () => {
    expect(e.text).toMatch(/your pages with our marks on them/);
    expect(e.html).toMatch(/your pages with our marks on them/);
  });

  it("escapes the paper title in HTML", () => {
    expect(e.html).toContain("Physics &lt;2025&gt;");
    expect(e.html).not.toContain("<2025>");
  });
});
