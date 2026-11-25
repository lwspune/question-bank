/**
 * A student's name inside a room (owner, 2026-11-25: anonymity). Picked at
 * Join, prefilled with a random friendly one, changeable later from the room's
 * menu; the account's real name is never shown to other students. Unique per
 * room, case-insensitive (migration 0290). Pure. Spec: tests/rooms-identity.test.ts.
 */
import { hasPersonal } from "@/lib/chat/maskPersonal";
import { isAbusive } from "@/lib/chat/abuse";

export const NICK_MIN = 2;
export const NICK_MAX = 20;

const ADJ = [
  "Quiet", "Bright", "Calm", "Swift", "Brave", "Clever", "Steady", "Sunny", "Bold", "Keen",
  "Kind", "Lucky", "Gentle", "Happy", "Sharp", "Eager", "Patient", "Curious", "Silver", "Golden",
];
const NOUN = [
  "Falcon", "Tiger", "Lotus", "River", "Comet", "Panda", "Eagle", "Otter", "Maple", "Banyan",
  "Peacock", "Dolphin", "Cedar", "Meteor", "Robin", "Koel", "Mango", "Sparrow", "Lynx", "Heron",
];

const pick = <T,>(list: readonly T[], r: number) => list[Math.min(list.length - 1, Math.floor(r * list.length))];

export function suggestNickname(rand: () => number = Math.random): string {
  return `${pick(ADJ, rand())} ${pick(NOUN, rand())}`;
}

// Names that would pass for the team, V or a moderator.
const STAFF_WORDS = /(pyq\s*vault|^pyq$|^v$|^team$|admin|moderator|^staff$|official)/i;

export type NicknameResult = { ok: true; name: string } | { ok: false; error: string };

export function checkNickname(raw: string): NicknameResult {
  const name = raw.replace(/\s+/g, " ").trim();
  if (name.length < NICK_MIN || name.length > NICK_MAX) {
    return { ok: false, error: `Use ${NICK_MIN} to ${NICK_MAX} letters.` };
  }
  if (!/^[\p{L}\p{M}\p{N} ]+$/u.test(name)) return { ok: false, error: "Use letters, numbers and spaces only." };
  if (/\d{5,}/.test(name) || hasPersonal(name)) return { ok: false, error: "Leave out long numbers." };
  if (STAFF_WORDS.test(name)) return { ok: false, error: "That name is kept for the team. Pick another." };
  if (isAbusive(name)) return { ok: false, error: "Please pick a kind name." };
  return { ok: true, name };
}
