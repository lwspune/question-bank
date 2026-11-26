/**
 * The small grey lines in a room (owner, 2026-11-26; migration 0291): "Priya
 * joined" and "Priya answered the daily question". Consecutive lines of the
 * same kind on the same day fold into one, so 50 answers never bury the chat.
 * Pure: lib/rooms/systemLines.
 */
import { describe, it, expect } from "vitest";
import { groupRoomItems, systemLineText } from "@/lib/rooms/systemLines";
import type { RoomMessageView } from "@/lib/rooms/view";

let nextId = 1;
function msg(over: Partial<RoomMessageView>): RoomMessageView {
  return {
    id: nextId++,
    kind: "student",
    event: null,
    name: "Asha",
    body: "hello",
    at: "2026-11-26T05:00:00.000Z",
    own: false,
    pinned: false,
    replyTo: null,
    canAskV: true,
    question: null,
    ...over,
  };
}
const joined = (name: string, over: Partial<RoomMessageView> = {}) =>
  msg({ kind: "system", event: "joined", name, body: "joined the room", canAskV: false, ...over });
const answered = (name: string, over: Partial<RoomMessageView> = {}) =>
  msg({ kind: "system", event: "answered", name, body: "answered the daily question", canAskV: false, ...over });
const dayKey = (iso: string) => iso.slice(0, 10);

describe("groupRoomItems", () => {
  it("passes ordinary messages through in order", () => {
    const a = msg({ body: "one" });
    const b = msg({ body: "two" });
    const items = groupRoomItems([a, b], dayKey);
    expect(items.map((i) => (i.type === "message" ? i.message.id : null))).toEqual([a.id, b.id]);
  });

  it("folds consecutive lines of the same kind into one", () => {
    const items = groupRoomItems([answered("Asha"), answered("Bala"), answered("Chetan")], dayKey);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ type: "system", event: "answered", names: ["Asha", "Bala", "Chetan"], you: false });
  });

  it("starts a new line when a message, another kind or another day comes between", () => {
    const items = groupRoomItems(
      [
        joined("Asha"),
        msg({ body: "hi all" }),
        joined("Bala"),
        answered("Bala"),
        answered("Chetan", { at: "2026-11-27T05:00:00.000Z" }),
      ],
      dayKey
    );
    expect(items.map((i) => (i.type === "system" ? `${i.event}:${i.names.join("+")}` : "msg"))).toEqual([
      "joined:Asha",
      "msg",
      "joined:Bala",
      "answered:Bala",
      "answered:Chetan",
    ]);
  });

  it("shows the viewer as You, once, and never twice under a name", () => {
    const items = groupRoomItems([answered("Asha"), answered("Quiet Falcon", { own: true }), answered("Asha")], dayKey);
    expect(items[0]).toMatchObject({ you: true, names: ["Asha"] });
  });

  it("keys a folded line by its first message, so the list stays stable as lines arrive", () => {
    const first = answered("Asha");
    const items = groupRoomItems([first, answered("Bala")], dayKey);
    expect(items[0]).toMatchObject({ key: first.id, at: first.at });
  });
});

describe("systemLineText", () => {
  const line = (event: "joined" | "answered", names: string[], you = false) => ({ type: "system" as const, key: 1, event, names, you, at: "" });

  it("names one, two or three people", () => {
    expect(systemLineText(line("joined", ["Asha"]))).toBe("Asha joined");
    expect(systemLineText(line("joined", ["Asha", "Bala"]))).toBe("Asha and Bala joined");
    expect(systemLineText(line("answered", ["Asha", "Bala", "Chetan"]))).toBe("Asha, Bala and Chetan answered the daily question");
  });

  it("counts the rest after two names", () => {
    expect(systemLineText(line("answered", ["Asha", "Bala", "Chetan", "Dev", "Esha"]))).toBe("Asha, Bala and 3 others answered the daily question");
  });

  it("puts You first", () => {
    expect(systemLineText(line("joined", [], true))).toBe("You joined");
    expect(systemLineText(line("answered", ["Asha"], true))).toBe("You and Asha answered the daily question");
  });

  it("never says whether an answer was right", () => {
    expect(systemLineText(line("answered", ["Asha"]))).not.toMatch(/right|wrong|correct|option/i);
  });
});
