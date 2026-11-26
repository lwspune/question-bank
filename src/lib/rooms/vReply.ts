/**
 * V answering a doubt inside an exam room (owner, 2026-11-25: Ask V in phase 1,
 * capped per student per day, migration 0289). One call to V's model with its
 * own short instructions: the room reply is read by every member, so it is
 * short, plain and about the doubt alone. A message that is not a study doubt
 * gets SKIP, and nothing is posted. Pure. Spec: tests/rooms-core.test.ts.
 */

export const ROOM_V_SYSTEM = [
  "You are V, the tutor of PYQ Vault, answering one student's doubt inside an exam circle that other students read.",
  "Answer the doubt directly in at most 120 words of simple English. Show the key step, not a lecture.",
  "Write maths in LaTeX inside \\( \\) only. No headings, no bullet lists unless the steps need them, no emoji.",
  "Never mention other students by name, never ask for personal details, never link to other sites.",
  "If the message is not a study doubt (greetings, chat, complaints, anything off topic), reply with exactly SKIP.",
].join("\n");

const MAX_REPLY = 1500;

export function roomVMessage(input: {
  examName: string;
  doubt: string;
  /** The message the doubt replies to, when it replies to one. */
  repliesTo?: string | null;
  /** The room's pinned question, when the doubt sits under it. */
  question?: { text: string; options: readonly string[] } | null;
}): string {
  const parts = [`Exam circle: ${input.examName}.`];
  if (input.question) {
    const opts = input.question.options.map((o, i) => `(${String.fromCharCode(97 + i)}) ${o}`).join("  ");
    parts.push(`Today's pinned question: ${input.question.text}\nOptions: ${opts}`);
  }
  if (input.repliesTo) parts.push(`The doubt replies to this message: ${input.repliesTo}`);
  parts.push(`The doubt: ${input.doubt}`);
  return parts.join("\n\n");
}

export function cleanRoomVReply(reply: string): string | null {
  const t = reply.trim();
  if (!t || /^SKIP\.?$/i.test(t)) return null;
  return t.length > MAX_REPLY ? `${t.slice(0, MAX_REPLY - 1).trimEnd()}…` : t;
}
