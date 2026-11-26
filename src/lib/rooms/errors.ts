/**
 * A guard trigger's refusal (migration 0289 raises `exam_room:<key>`) as one
 * plain line for the student and an HTTP status. Pure.
 * Spec: tests/rooms-view.test.ts.
 */
export type RoomError = { status: number; error: string };

const LINES: Record<string, RoomError> = {
  too_fast: { status: 429, error: "Wait a few seconds before your next message." },
  daily_limit: { status: 429, error: "You've reached today's message limit. Try again tomorrow." },
  v_limit: { status: 429, error: "You've asked V 5 times in circles today. Ask again tomorrow, or open V's chat." },
  not_member: { status: 403, error: "Join this circle first." },
  muted: { status: 403, error: "You can't post in this circle for now." },
  closed: { status: 403, error: "This circle is closed for now." },
  own_message: { status: 400, error: "You can't report your own message." },
  v_target: { status: 400, error: "V can't answer that message." },
  system: { status: 400, error: "That line can't be reported." },
  reply_target: { status: 400, error: "You can't reply to that." },
  bad_option: { status: 400, error: "That answer doesn't belong to this question." },
};

export function roomErrorOf(message: string | null | undefined): RoomError | null {
  if (!message) return null;
  if (message.includes("exam_room_messages_one_v_reply")) return { status: 409, error: "V has already answered this." };
  const m = /exam_room:([a-z_]+)/.exec(message);
  return m ? LINES[m[1]] ?? null : null;
}
