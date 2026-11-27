/**
 * The rooms a student sees (owner, 2026-11-25): one per exam on their profile,
 * joined ones first. A student who chose no exam sees their GUESSED exam's
 * circle in its own section (owner, 2026-11-27); joining it makes the exam a
 * chosen one (lib/rooms/alert joinDecision). Pure. Spec:
 * tests/rooms-core.test.ts, tests/rooms-circle-alert.test.ts.
 */

/** `today`: a circle not joined whose morning question is up today (always false once joined). */
export type RoomListItem = { slug: string; name: string; joined: boolean; unread: number; today: boolean };

export type RoomList = { joined: RoomListItem[]; others: RoomListItem[]; guessed: RoomListItem[] };

export function buildRoomList(input: {
  targetExams: readonly string[];
  /** The stored exam guess (0254); used only while targetExams is empty. */
  guessExam?: string | null;
  /** The exam's display name, or null for a slug the registry no longer knows. */
  nameOf: (slug: string) => string | null;
  joined: ReadonlySet<string>;
  /** Rooms the owner switched off (exam_rooms.open = false). */
  closed: ReadonlySet<string>;
  unread: ReadonlyMap<string, number>;
  /** Circles whose pinned question was posted today (IST). */
  pinnedToday?: ReadonlySet<string>;
}): RoomList {
  const seen = new Set<string>();
  const joined: RoomListItem[] = [];
  const others: RoomListItem[] = [];
  const guessed: RoomListItem[] = [];
  const add = (slug: string, notJoined: RoomListItem[]) => {
    if (seen.has(slug)) return;
    seen.add(slug);
    const name = input.nameOf(slug);
    if (!name || input.closed.has(slug)) return;
    const isJoined = input.joined.has(slug);
    (isJoined ? joined : notJoined).push({
      slug,
      name,
      joined: isJoined,
      unread: isJoined ? input.unread.get(slug) ?? 0 : 0,
      today: !isJoined && (input.pinnedToday?.has(slug) ?? false),
    });
  };
  for (const slug of input.targetExams) add(slug, others);
  if (input.targetExams.length === 0 && input.guessExam) add(input.guessExam, guessed);
  // A room joined for an exam since dropped from the profile stays, so it can be left.
  for (const slug of input.joined) add(slug, others);
  return { joined, others, guessed };
}

const LEVEL = /^(\d{1,2}|I|II|III|IV)$/;

/**
 * The short label in a room's round badge: the exam's distinctive capital
 * word (the LAST one, so "SSC CGL" reads CGL, not the family SSC) plus a class
 * or tier ("CGL II", "CBSE 12"); initials when the name has no such word.
 */
export function roomBadge(name: string): string {
  const tokens = name.split(/[\s-]+/).filter(Boolean);
  const last = tokens[tokens.length - 1] ?? "";
  const level = tokens.length > 1 && LEVEL.test(last) ? last : null;
  const caps = tokens.filter((t) => /^[A-Z]{2,4}$/.test(t) && !LEVEL.test(t));
  if (caps.length) return level ? `${caps[caps.length - 1]} ${level}` : caps[caps.length - 1];
  const words = tokens.filter((t) => /^\p{L}/u.test(t));
  if (words.length > 1) return words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return (words[0] ?? name).slice(0, 3).toUpperCase();
}

/**
 * A message or question as one line of plain text, for the rooms list and the
 * pinned bar, which do not render maths: delimiters dropped, \frac{a}{b} as
 * a/b, \cdot as ·, any other command's backslash removed.
 */
export function plainPreview(body: string): string {
  let s = body.replace(/\\[()[\]]/g, "");
  for (let i = 0; i < 3 && /\\frac\{/.test(s); i++) s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");
  s = s.replace(/\^\{?2\}?(?![\d])/g, "²").replace(/\^\{?3\}?(?![\d])/g, "³").replace(/\^\{([^{}]*)\}/g, "^$1");
  s = s.replace(/\\cdot/g, "·").replace(/\\times/g, "×").replace(/\\([a-zA-Z]+)/g, "$1");
  return s.replace(/\s+/g, " ").trim();
}

export function totalUnread(rooms: readonly { unread: number }[]): number {
  return rooms.reduce((n, r) => n + r.unread, 0);
}

export function badgeText(count: number): string | null {
  if (count <= 0) return null;
  return count > 9 ? "9+" : String(count);
}
