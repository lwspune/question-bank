/**
 * The small grey lines in a room (owner, 2026-11-26; migration 0291): "Asha
 * joined" and "Asha answered the daily question". Consecutive lines of the same
 * kind on the same day fold into one ("Asha, Bala and 3 others answered the
 * daily question"), so a busy morning never buries the conversation. The line
 * never says whether an answer was right. Pure. Spec: tests/rooms-system-lines.test.ts.
 */
import type { RoomMessageView, RoomSystemEvent } from "./view";

export type RoomSystemItem = {
  type: "system";
  /** The first folded message's id: stable as more lines join the fold. */
  key: number;
  event: RoomSystemEvent;
  /** Other students, in order, each once. */
  names: string[];
  /** The viewer is one of them. */
  you: boolean;
  at: string;
};

export type RoomItem = { type: "message"; message: RoomMessageView } | RoomSystemItem;

export function groupRoomItems(messages: readonly RoomMessageView[], dayKey: (iso: string) => string): RoomItem[] {
  const out: RoomItem[] = [];
  for (const m of messages) {
    if (m.kind !== "system" || !m.event) {
      out.push({ type: "message", message: m });
      continue;
    }
    const last = out[out.length - 1];
    const fold = last && last.type === "system" && last.event === m.event && dayKey(last.at) === dayKey(m.at) ? last : null;
    const item = fold ?? { type: "system" as const, key: m.id, event: m.event, names: [], you: false, at: m.at };
    if (m.own) item.you = true;
    else if (!item.names.includes(m.name)) item.names.push(m.name);
    if (!fold) out.push(item);
  }
  return out;
}

const VERB: Record<RoomSystemEvent, string> = {
  joined: "joined",
  answered: "answered the daily question",
};

export function systemLineText(item: RoomSystemItem): string {
  const people = item.you ? ["You", ...item.names] : item.names;
  let who: string;
  if (people.length <= 1) who = people[0] ?? "Someone";
  else if (people.length <= 3) who = `${people.slice(0, -1).join(", ")} and ${people[people.length - 1]}`;
  else who = `${people[0]}, ${people[1]} and ${people.length - 2} others`;
  return `${who} ${VERB[item.event]}`;
}
