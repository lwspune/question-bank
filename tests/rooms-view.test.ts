/**
 * Exam rooms: the route-side pure pieces.
 * - roomErrorOf: a guard trigger's `exam_room:<key>` (migration 0289) becomes
 *   one plain line and a status; anything else is a 500.
 * - parseRoomPost / parseRoomReport / parseRoomAnswer / parseRoomAskV: request bodies.
 * - toMessageView: what the window gets. Never the author's user id, never
 *   is_correct before the student answered; "own" and "V already replied" flags.
 */
import { describe, it, expect } from "vitest";
import { roomErrorOf } from "@/lib/rooms/errors";
import { parseRoomPost, parseRoomReport, parseRoomAnswer, parseRoomAskV } from "@/lib/rooms/validate";
import { toMessageView, type RoomMessageRow } from "@/lib/rooms/view";
import { nextPollDelay, badgeCacheFresh } from "@/lib/rooms/poll";

describe("roomErrorOf", () => {
  it("maps each guard key to a line and a status", () => {
    expect(roomErrorOf("exam_room:too_fast")).toEqual({ status: 429, error: expect.stringMatching(/few seconds/i) });
    expect(roomErrorOf("exam_room:daily_limit")?.status).toBe(429);
    expect(roomErrorOf("exam_room:v_limit")?.status).toBe(429);
    expect(roomErrorOf("exam_room:not_member")?.status).toBe(403);
    expect(roomErrorOf("exam_room:system")?.status).toBe(400);
    expect(roomErrorOf("exam_room:reply_target")?.status).toBe(400);
    expect(roomErrorOf("exam_room:muted")?.status).toBe(403);
    expect(roomErrorOf("exam_room:closed")?.status).toBe(403);
    expect(roomErrorOf("exam_room:own_message")?.status).toBe(400);
  });
  it("finds the key inside a longer message and leaves other errors alone", () => {
    expect(roomErrorOf('ERROR: exam_room:muted (SQLSTATE P0001)')?.status).toBe(403);
    expect(roomErrorOf("connection reset")).toBeNull();
  });
  it("treats a duplicate V reply as already answered", () => {
    expect(roomErrorOf('duplicate key value violates unique constraint "exam_room_messages_one_v_reply"')?.status).toBe(409);
  });
});

describe("request bodies", () => {
  it("parses a post with an optional reply", () => {
    expect(parseRoomPost({ body: "Why 23?" })).toEqual({ ok: true, value: { body: "Why 23?", replyTo: null } });
    expect(parseRoomPost({ body: "ok", replyTo: 42 })).toEqual({ ok: true, value: { body: "ok", replyTo: 42 } });
    expect(parseRoomPost({ body: 5 }).ok).toBe(false);
    expect(parseRoomPost({ body: "ok", replyTo: -1 }).ok).toBe(false);
  });
  it("parses a report with a known reason", () => {
    expect(parseRoomReport({ messageId: 3, reason: "spam" }).ok).toBe(true);
    expect(parseRoomReport({ messageId: 3, reason: "boring" }).ok).toBe(false);
  });
  it("parses an answer and an Ask V", () => {
    expect(parseRoomAnswer({ messageId: 3, optionId: "6f1c2a52-6c0e-4b8e-9d55-5a0b2d1e7f10" }).ok).toBe(true);
    expect(parseRoomAnswer({ messageId: 3, optionId: "x" }).ok).toBe(false);
    expect(parseRoomAskV({ messageId: 9 }).ok).toBe(true);
    expect(parseRoomAskV({}).ok).toBe(false);
  });
});

describe("polling and the badge cache", () => {
  it("checks every 6 seconds while messages flow, every 20 once quiet for a minute", () => {
    expect(nextPollDelay(0)).toBe(6000);
    expect(nextPollDelay(59_000)).toBe(6000);
    expect(nextPollDelay(60_000)).toBe(20_000);
  });
  it("reuses a badge count for 10 minutes", () => {
    const t = Date.parse("2026-11-25T10:00:00Z");
    expect(badgeCacheFresh(t, t + 9 * 60_000)).toBe(true);
    expect(badgeCacheFresh(t, t + 11 * 60_000)).toBe(false);
    expect(badgeCacheFresh(null, t)).toBe(false);
  });
});

describe("toMessageView", () => {
  const row: RoomMessageRow = {
    id: 10,
    author_kind: "student",
    user_id: "u-1",
    display_name: "Priya S.",
    body: "Why take 2 away?",
    reply_to: null,
    question_id: null,
    pinned: false,
    created_at: "2026-11-25T13:08:00Z",
    system_event: null,
  };

  it("hides the author's id and marks own messages", () => {
    const mine = toMessageView(row, { viewerId: "u-1", repliedByV: new Set(), byId: new Map() });
    expect(mine).not.toHaveProperty("user_id");
    expect(mine.own).toBe(true);
    expect(toMessageView(row, { viewerId: "u-2", repliedByV: new Set(), byId: new Map() }).own).toBe(false);
  });

  it("says whether V can still be asked", () => {
    expect(toMessageView(row, { viewerId: "u-2", repliedByV: new Set(), byId: new Map() }).canAskV).toBe(true);
    expect(toMessageView(row, { viewerId: "u-2", repliedByV: new Set([10]), byId: new Map() }).canAskV).toBe(false);
    const v = toMessageView({ ...row, id: 11, author_kind: "v", reply_to: 10 }, { viewerId: "u-2", repliedByV: new Set(), byId: new Map() });
    expect(v.canAskV).toBe(false);
  });

  it("marks a system line (0291): its event, the viewer's own, and never askable", () => {
    const line = { ...row, id: 12, author_kind: "system" as const, system_event: "answered" as const, body: "answered the daily question" };
    const mine = toMessageView(line, { viewerId: "u-1", repliedByV: new Set(), byId: new Map() });
    expect(mine).toMatchObject({ kind: "system", event: "answered", own: true, canAskV: false });
    expect(toMessageView(line, { viewerId: "u-2", repliedByV: new Set(), byId: new Map() }).own).toBe(false);
    expect(toMessageView(row, { viewerId: "u-2", repliedByV: new Set(), byId: new Map() }).event).toBeNull();
  });

  it("quotes the message it replies to, shortened", () => {
    const parent = { ...row, id: 5, display_name: "Aman", body: "Got (a). Squared both sides and took 2 away, which gives 23 in the end." };
    const v = toMessageView({ ...row, id: 11, author_kind: "v", display_name: "V", reply_to: 5 }, {
      viewerId: "u-2",
      repliedByV: new Set(),
      byId: new Map([[5, parent]]),
    });
    expect(v.replyTo?.name).toBe("Aman");
    expect(v.replyTo?.snippet.length).toBeLessThanOrEqual(61);
  });
});
