/**
 * The rooms a student sees (owner, 2026-11-25): one per exam on their profile,
 * joined ones first. Pure. Spec: tests/rooms-core.test.ts.
 */

export type RoomListItem = { slug: string; name: string; joined: boolean; unread: number };

export type RoomList = { joined: RoomListItem[]; others: RoomListItem[] };

export function buildRoomList(input: {
  targetExams: readonly string[];
  /** The exam's display name, or null for a slug the registry no longer knows. */
  nameOf: (slug: string) => string | null;
  joined: ReadonlySet<string>;
  /** Rooms the owner switched off (exam_rooms.open = false). */
  closed: ReadonlySet<string>;
  unread: ReadonlyMap<string, number>;
}): RoomList {
  const seen = new Set<string>();
  const joined: RoomListItem[] = [];
  const others: RoomListItem[] = [];
  const add = (slug: string) => {
    if (seen.has(slug)) return;
    seen.add(slug);
    const name = input.nameOf(slug);
    if (!name || input.closed.has(slug)) return;
    const isJoined = input.joined.has(slug);
    (isJoined ? joined : others).push({ slug, name, joined: isJoined, unread: isJoined ? input.unread.get(slug) ?? 0 : 0 });
  };
  for (const slug of input.targetExams) add(slug);
  // A room joined for an exam since dropped from the profile stays, so it can be left.
  for (const slug of input.joined) add(slug);
  return { joined, others };
}

export function totalUnread(rooms: readonly { unread: number }[]): number {
  return rooms.reduce((n, r) => n + r.unread, 0);
}

export function badgeText(count: number): string | null {
  if (count <= 0) return null;
  return count > 9 ? "9+" : String(count);
}
