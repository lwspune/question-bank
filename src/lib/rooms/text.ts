/**
 * What a student may post in an exam room (owner, 2026-11-25). Pure.
 * Spec: tests/rooms-core.test.ts.
 *
 * Phone numbers, emails and links are REFUSED, not masked: a room is read by
 * every member, and "[phone] DM me" still pulls a student off the app. Group
 * invites (t.me, wa.me, chat.whatsapp.com) are the commonest spam in Indian
 * exam groups. Abuse reuses V's word list (lib/chat/abuse). The 1,000-character
 * cap is mirrored by a CHECK in migration 0289.
 *
 * Social handles are refused too (round 2, 2026-11-25): a platform word followed
 * by a handle ("insta: priya_2009", "snap me riya2009"), or an @handle carrying
 * a digit, underscore or inner dot. A plain "@Quiet" mention of a room name, and
 * "snap test", stay allowed: a handle needs a separator, an @ or such a character.
 */
import { hasPersonal } from "@/lib/chat/maskPersonal";
import { isAbusive } from "@/lib/chat/abuse";

export const ROOM_TEXT_MAX = 1000;

export type RoomTextResult = { ok: true; body: string } | { ok: false; error: string };

// A scheme, a www. host, or a host ending in a common TLD followed by / or the end.
// "2.5 m/s" and "i.e." do not match: a TLD needs 2+ letters after a letter run.
const LINK =
  /(https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|in|org|net|io|me|ly|co|app|info|xyz|link|gl|page)(?:\/|\b))/i;

const PLATFORM =
  /\b(?:insta(?:gram)?|snap(?:chat)?|telegram|discord|youtube|twitter)\b(?:\s+(?:me|is|id|handle|at|on|username|par|pe))*\s*([:\-]\s*|@)?(@?[a-z0-9_.#]{3,})/gi;
const AT_HANDLE = /(?:^|\s)@[a-z0-9_.]*(?:[0-9_]|\.[a-z])/i;

export function hasSocialHandle(text: string): boolean {
  for (const m of text.matchAll(PLATFORM)) {
    const [, sep, handle] = m;
    if (sep || handle.startsWith("@") || /[0-9_.#]/.test(handle)) return true;
  }
  return AT_HANDLE.test(text);
}

export function checkRoomText(raw: string): RoomTextResult {
  const body = raw
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (body.length === 0) return { ok: false, error: "Write a message first." };
  if (body.length > ROOM_TEXT_MAX) return { ok: false, error: `Keep it under ${ROOM_TEXT_MAX} characters.` };
  if (hasPersonal(body)) return { ok: false, error: "Phone numbers and email addresses can't be shared in circles." };
  if (LINK.test(body)) return { ok: false, error: "Links can't be shared in circles." };
  if (hasSocialHandle(body)) return { ok: false, error: "Social media handles can't be shared in circles." };
  if (isAbusive(body)) return { ok: false, error: "Please keep it kind. That message can't be posted." };
  return { ok: true, body };
}
