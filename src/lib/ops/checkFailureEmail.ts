/**
 * The email a scheduled check sends the owner when it fails.
 *
 * WHY: the daily prod-contract check failed 8 days running (2026-10-28 to 11-04), and was
 * cancelled for 6 days before that, while GitHub's own failure emails went unread. New
 * failures landed behind old ones unseen. The owner chose email (TECH_DEBT_SPEC.md 1.2,
 * 2026-11-05): one PYQ Vault email that names what failed, sent only on a failure.
 *
 * Pure; unit-tested in tests/ops-check-failure-email.test.ts. The sender is
 * scripts/ops/notify-check-failure.ts.
 */
import { BRAND, INK, REPLY_TO, escapeHtml, type BuiltEmail } from "@/lib/email/templates";

/** Failing tests named in the email; the rest are counted. */
export const MAX_LISTED = 12;

const ANSI = /\u001b\[[0-9;]*m/g;
const VITEST_FAIL = /^\s*FAIL\s+(\S.*\S)\s*$/;

/** Each failing vitest test named in a log, once, in the order first seen. */
export function extractFailures(log: string): string[] {
  const seen = new Set<string>();
  for (const line of log.replace(ANSI, "").split(/\r?\n/)) {
    const m = VITEST_FAIL.exec(line);
    if (m) seen.add(m[1]);
  }
  return [...seen];
}

export type CheckFailureInput = {
  /** The workflow's name, e.g. "Prod contract". */
  workflow: string;
  runUrl: string;
  /** The run's date, YYYY-MM-DD. */
  date: string;
  failures: string[];
};

export function buildCheckFailureEmail(input: CheckFailureInput): BuiltEmail {
  const n = input.failures.length;
  const count = n === 0 ? "" : ` (${n} ${n === 1 ? "test" : "tests"})`;
  const subject = `${BRAND}: the ${input.workflow} check failed${count}, ${input.date}`;
  const listed = input.failures.slice(0, MAX_LISTED);
  const more = n - listed.length;

  const intro =
    n === 0
      ? `The ${input.workflow} check failed on ${input.date} before naming a failing test, so a step around the tests stopped it.`
      : `The ${input.workflow} check failed on ${input.date}. Failing:`;
  const outro = [
    `Open the run for the full log: ${input.runUrl}`,
    "Each failure names the mismatch and where to fix it. Until it is green again, a new failure can hide behind this one.",
  ];
  const textLines = [intro, ...listed.map((f) => `- ${f}`), ...(more > 0 ? [`- and ${more} more`] : []), "", ...outro];

  const li = listed.map((f) => `    <li style="margin:0 0 6px">${escapeHtml(f)}</li>`);
  if (more > 0) li.push(`    <li style="margin:0 0 6px">and ${more} more</li>`);
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 12px">${escapeHtml(intro)}</p>
${li.length ? `  <ul style="margin:0 0 12px;padding-left:20px;font-family:Consolas,monospace;font-size:13px">\n${li.join("\n")}\n  </ul>` : ""}
  <p style="margin:0 0 12px"><a href="${escapeHtml(input.runUrl)}">Open the run</a> for the full log.</p>
  <p style="margin:0 0 12px">${escapeHtml(outro[1])}</p>
</div>`;
  return { subject, text: textLines.join("\n"), html, replyTo: REPLY_TO, headers: {} };
}
