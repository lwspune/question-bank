/**
 * The name other students see in a room: first name + last initial ("Priya S."),
 * never an email or a number. Saved on the membership at join time (migration
 * 0289), so a later account rename does not rewrite old messages. Pure.
 * Spec: tests/rooms-core.test.ts.
 */
import { hasPersonal } from "@/lib/chat/maskPersonal";

const MAX = 24;

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function roomDisplayName(accountName: string | null | undefined): string {
  const raw = (accountName ?? "").trim();
  if (!raw || hasPersonal(raw) || raw.includes("@")) return "Student";
  const words = raw.split(/\s+/).filter((w) => /\p{L}/u.test(w));
  if (words.length === 0) return "Student";
  const first = cap(words[0]).slice(0, MAX - 3);
  if (words.length === 1) return first;
  const initial = words[words.length - 1].charAt(0).toUpperCase();
  return `${first} ${initial}.`;
}
