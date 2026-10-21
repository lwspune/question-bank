/**
 * The answer-sheet emails (migration 0153). PURE.
 * Spec: tests/answer-sheets-emails.test.ts.
 *
 * 1. To the student when a sheet is checked (scripts/grading/commit.ts). A
 *    service email they asked for, so no unsubscribe line; email_sends kind
 *    `answer_report`, one per sheet (dedupe key).
 * 2. To the grader, once a day, when sheets are waiting
 *    (scripts/grading/notify.ts). The student was promised a report within 48
 *    hours, so it names the oldest wait and anything past 36 hours.
 */
import {
  ACCENT,
  BRAND,
  INK,
  MUTED,
  REPLY_TO,
  SITE_URL,
  escapeHtml,
  greetingName,
  type BuiltEmail,
} from "@/lib/email/templates";

export const ANSWER_REPORT_KIND = "answer_report" as const;
export const OVERDUE_HOURS = 36;

export function answerReportDedupeKey(submissionId: string): string {
  return `answer_report:${submissionId}`;
}

export type QueueSummary = { waiting: number; oldestHours: number; overdue: number; openQuestions: number };

/** Null when there is nothing to do: no email. */
export function queueSummary(submittedAts: string[], openQuestions: number, now: Date): QueueSummary | null {
  if (submittedAts.length === 0 && openQuestions === 0) return null;
  const ages = submittedAts.map((iso) => Math.floor((now.getTime() - Date.parse(iso)) / 3_600_000));
  return {
    waiting: ages.length,
    oldestHours: ages.length ? Math.max(...ages) : 0,
    overdue: ages.filter((h) => h >= OVERDUE_HOURS).length,
    openQuestions,
  };
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function buildGradingQueueEmail(s: QueueSummary): BuiltEmail {
  const parts = [
    s.waiting > 0 ? `${plural(s.waiting, "answer sheet", "answer sheets")} waiting` : null,
    s.overdue > 0 ? `${s.overdue} past ${OVERDUE_HOURS} hours` : null,
    s.openQuestions > 0 ? plural(s.openQuestions, "grade question", "grade questions") : null,
  ].filter(Boolean);
  const subject = `${BRAND}: ${parts.join(", ")}`;
  const lines = [
    s.waiting > 0
      ? `${plural(s.waiting, "answer sheet is", "answer sheets are")} waiting. The oldest was sent ${s.oldestHours} hours ago; students were promised a report within 48.`
      : "No answer sheet is waiting.",
    s.overdue > 0 ? `${plural(s.overdue, "sheet is", "sheets are")} past ${OVERDUE_HOURS} hours: grade those first.` : null,
    s.openQuestions > 0 ? `${plural(s.openQuestions, "student has", "students have")} questioned a grade.` : null,
    "",
    "To grade: npm run grading:pull, then grade by scripts/grading/GRADING.md (preview the marks, then commit).",
  ].filter((l): l is string => l !== null);
  const text = lines.join("\n");
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
${lines.map((l) => (l ? `  <p style="margin:0 0 12px">${escapeHtml(l)}</p>` : "")).join("\n")}
</div>`;
  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}

export type AnswerRejectedEmailInput = { name: string; paperTitle: string; reason: string; paperUrl: string | null };

/** The sheet could not be checked (unreadable, wrong paper, blank). Same dedupe key as a report. */
export function buildAnswerRejectedEmail(input: AnswerRejectedEmailInput): BuiltEmail {
  const who = greetingName(input.name);
  const subject = `We could not check your answer sheet: ${input.paperTitle}`;
  const lead = `We could not check your answers to ${input.paperTitle}.`;
  const after = "It did not use up your free sheet for the day, so you can send it again.";
  const text = [
    who ? `Hi ${who},` : "Hi,",
    "",
    lead,
    "",
    input.reason,
    "",
    after,
    ...(input.paperUrl ? ["", `Send it again from the paper's page: ${input.paperUrl}`] : []),
    "",
    `${BRAND}`,
  ].join("\n");
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 16px">${escapeHtml(lead)}</p>
  <p style="margin:0 0 16px">${escapeHtml(input.reason)}</p>
  <p style="margin:0 0 20px;color:${MUTED}">${escapeHtml(after)}</p>
${input.paperUrl ? `  <p style="margin:0 0 24px"><a href="${escapeHtml(input.paperUrl)}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:600">Send it again</a></p>\n` : ""}  <p style="margin:0">${BRAND}</p>
</div>`;
  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}

export type AnswerReportEmailInput = {
  name: string;
  paperTitle: string;
  totalAwarded: number;
  totalMax: number;
  submissionId: string;
};

export function buildAnswerReportEmail(input: AnswerReportEmailInput): BuiltEmail {
  const who = greetingName(input.name);
  const url = `${SITE_URL}/me/answer-sheets/${input.submissionId}`;
  const marks = `${input.totalAwarded} / ${input.totalMax}`;
  const subject = `Your answer sheet is checked: ${input.paperTitle}`;
  const lead = `Your answers to ${input.paperTitle} are checked. You scored ${marks}.`;
  const body =
    "The report shows what went well, what to work on next, where your marks went, and for every question what earned marks and what was missing. It also has your pages with our marks on them, to look at or download.";
  const text = [
    who ? `Hi ${who},` : "Hi,",
    "",
    lead,
    "",
    body,
    "",
    `Read your report: ${url}`,
    "",
    "If a grade looks wrong, tap \"Question this grade\" under that question and we will look again.",
    "",
    `${BRAND}`,
  ].join("\n");
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 16px">${escapeHtml(lead)}</p>
  <p style="margin:0 0 20px;color:${MUTED}">${escapeHtml(body)}</p>
  <p style="margin:0 0 24px"><a href="${url}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:600">Read your report</a></p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">If a grade looks wrong, tap &quot;Question this grade&quot; under that question and we will look again.</p>
  <p style="margin:0">${BRAND}</p>
</div>`;
  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}
