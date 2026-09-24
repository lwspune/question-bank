/**
 * The five-minute classroom script for teachers — written ONCE here and
 * rendered by the batch roster card, the "Copy for WhatsApp" button and (three
 * lines of it) the batch invite email. STUDENT_EDUCATION_SPEC.md appendix A is
 * a MIRROR of these constants, pinned by tests/classroom-script.test.ts, so
 * the spec a human reads and the card a teacher uses cannot drift.
 *
 * WHY A SCRIPT AND NOT A FEATURE LIST. Teachers are the channel LWS students
 * actually listen to, and what a teacher needs in class is words to say, in
 * order, that end in the student doing one thing on their phone. Five lines,
 * one action each.
 *
 * Pure data + one formatter. No React, no DB.
 */

/** Read aloud or paraphrase; assumes students have phones and have signed up. */
export const MOCK_SCRIPT: readonly string[] = [
  "Open PYQ Vault, tap Mocks, and sit the paper I assigned. It is the real paper from that year, timed. Answer what you can; leave the rest.",
  "On the result page, ignore the score for now. Look at the line that says how many you got right of the ones you attempted. That number is your real level.",
  "Tap the big button, Fix these mistakes. It gives you five of the questions you got wrong, one at a time, with the solution after each. Do all five now. It takes about five minutes.",
  "Tap your initial at the top right. The number on it is how many mistakes are waiting for you. When it is zero, you are done for the day. Tap Your map to see which chapters are red.",
  "Before the next class, do one round of Fix your mistakes each day. Not another full paper. Five questions.",
];

/** For board classes, replacing steps 1 to 4 of the mock script. */
export const BOARD_SCRIPT: readonly string[] = [
  "Tap Board, open the chapter we are on, and attempt each exercise question before you tap Show answer. Save the ones you got wrong with the bookmark. Before the exam, open Saved.",
];

/**
 * The three-line version that rides the batch invite email. GENERIC BY
 * DESIGN: the invite is deliberately thin because a mistyped address reaches
 * a stranger, and these lines disclose nothing about the recipient.
 */
export const INVITE_LINES: readonly string[] = [
  "Sit the paper your teacher assigns.",
  "On the result page, tap Fix these mistakes and do the five.",
  "Do one round of five each day until the next class.",
];

/**
 * The script as plain text for the clipboard — what a teacher pastes into the
 * batch's WhatsApp group. Numbered, one line per step, the board variant
 * appended under its own heading so a mixed staffroom gets both.
 */
export function classroomScriptText(): string {
  const mock = MOCK_SCRIPT.map((s, i) => `${i + 1}. ${s}`);
  const board = BOARD_SCRIPT.map((s) => `- ${s}`);
  return [
    "Five minutes in class (PYQ Vault)",
    "",
    ...mock,
    "",
    "For board classes, instead of steps 1 to 4:",
    ...board,
    "",
    "https://www.pyqvault.com/start",
  ].join("\n");
}
