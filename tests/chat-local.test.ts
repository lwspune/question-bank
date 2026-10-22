/**
 * The chat window's copy of the conversation on the device (2026-10-15):
 * survives a reload, keeps 30 messages, goes after 7 quiet days.
 */
import { describe, it, expect } from "vitest";
import { parseStoredChat, trimForStorage, isStale, preferNewer, type StoredChat } from "@/lib/chat/localChat";

const CID = "6f1c2a52-8a3e-4c5b-9d7e-1f2a3b4c5d6e";
const HOUR = 60 * 60 * 1000;

function chat(lastAt: number, n = 2): StoredChat {
  return {
    v: 1,
    conversationId: CID,
    lastAt,
    unread: 0,
    turns: Array.from({ length: n }, (_, i) => ({ role: i % 2 ? "assistant" : "user", text: `t${i}` })),
  };
}

describe("parseStoredChat", () => {
  it("reads back what was stored", () => {
    const c = chat(1000);
    expect(parseStoredChat(JSON.stringify(c))).toEqual(c);
  });

  it("returns null for junk, an old shape or a bad conversation id", () => {
    expect(parseStoredChat("not json")).toBeNull();
    expect(parseStoredChat(null)).toBeNull();
    expect(parseStoredChat(JSON.stringify({ ...chat(1), v: 0 }))).toBeNull();
    expect(parseStoredChat(JSON.stringify({ ...chat(1), conversationId: "x" }))).toBeNull();
  });

  it("drops turns that are not well formed", () => {
    const raw = JSON.stringify({ ...chat(1), turns: [{ role: "user", text: "ok" }, { role: "x", text: 1 }] });
    expect(parseStoredChat(raw)?.turns).toEqual([{ role: "user", text: "ok" }]);
  });
});

describe("trimForStorage", () => {
  it("keeps the newest 30 messages", () => {
    const t = trimForStorage(chat(1, 40));
    expect(t.turns).toHaveLength(30);
    expect(t.turns[0].text).toBe("t10");
  });
});

describe("isStale", () => {
  // 2026-10-21 (owner): a chat is a session that ends after an hour with no messages (it was 7 days).
  it("is stale after an hour without a message", () => {
    expect(isStale(chat(0), HOUR + 1)).toBe(true);
    expect(isStale(chat(0), HOUR - 1)).toBe(false);
  });
});

describe("preferNewer", () => {
  it("takes the account's conversation when it is newer than the device's", () => {
    const device = chat(1000);
    const account = { ...chat(2000), conversationId: "11111111-2222-4333-8444-555555555555" };
    expect(preferNewer(device, account)).toBe(account);
  });

  it("keeps the device's when it is as new or newer, or the account has none", () => {
    const device = chat(2000);
    expect(preferNewer(device, chat(1000))).toBe(device);
    expect(preferNewer(device, null)).toBe(device);
  });

  it("takes the account's when the device has nothing", () => {
    const account = chat(5);
    expect(preferNewer(null, account)).toBe(account);
  });
});
