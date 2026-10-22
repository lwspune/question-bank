/**
 * The chat window's copy of the conversation on this device (2026-10-15). It
 * survives a reload or a later visit within the session, keeps the newest 30
 * messages and goes after an hour with no messages (SESSION_IDLE_MS, owner
 * 2026-10-21; it was 7 days). The conversation itself is stored server-side
 * (migration 0159); this copy only saves re-fetching it, and for a signed-in
 * student the account's newer conversation wins (preferNewer).
 *
 * Pure apart from readStoredChat/writeStoredChat, which never throw: storage
 * can be blocked (private mode, full disk) and V must work without it.
 * Spec: tests/chat-local.test.ts.
 */
import { HISTORY_MESSAGES, SESSION_IDLE_MS, isConversationId, type HistoryTurn } from "./conversation";

export const LOCAL_CHAT_KEY = "v-chat";

export type StoredChat = {
  v: 1;
  conversationId: string;
  /** ms since epoch of the last message. */
  lastAt: number;
  /** Replies that arrived while the window was closed. */
  unread: number;
  turns: HistoryTurn[];
};

function isTurn(t: unknown): t is HistoryTurn {
  const x = t as { role?: unknown; text?: unknown };
  return !!x && (x.role === "user" || x.role === "assistant") && typeof x.text === "string";
}

export function parseStoredChat(raw: string | null): StoredChat | null {
  if (!raw) return null;
  let o: Partial<StoredChat>;
  try {
    o = JSON.parse(raw) as Partial<StoredChat>;
  } catch {
    return null;
  }
  if (!o || o.v !== 1 || !isConversationId(o.conversationId) || typeof o.lastAt !== "number") return null;
  return {
    v: 1,
    conversationId: o.conversationId,
    lastAt: o.lastAt,
    unread: typeof o.unread === "number" && o.unread > 0 ? Math.floor(o.unread) : 0,
    turns: Array.isArray(o.turns) ? o.turns.filter(isTurn) : [],
  };
}

export function trimForStorage(c: StoredChat): StoredChat {
  return { ...c, turns: c.turns.slice(-HISTORY_MESSAGES) };
}

export function isStale(c: StoredChat, now: number): boolean {
  return now - c.lastAt > SESSION_IDLE_MS;
}

/** The newer of the device's copy and the account's latest conversation. */
export function preferNewer(device: StoredChat | null, account: StoredChat | null): StoredChat | null {
  if (!account) return device;
  if (!device) return account;
  return account.lastAt > device.lastAt ? account : device;
}

export function readStoredChat(): StoredChat | null {
  try {
    const c = parseStoredChat(localStorage.getItem(LOCAL_CHAT_KEY));
    return c && !isStale(c, Date.now()) ? c : null;
  } catch {
    return null;
  }
}

export function writeStoredChat(c: StoredChat): void {
  try {
    localStorage.setItem(LOCAL_CHAT_KEY, JSON.stringify(trimForStorage(c)));
  } catch {
    // Storage blocked: V still works, the conversation just isn't kept here.
  }
}

export function newConversationId(): string {
  return crypto.randomUUID();
}
