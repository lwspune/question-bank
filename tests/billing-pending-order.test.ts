/**
 * The browser's note of an open checkout (2026-11-22), so a page that comes
 * back after a UPI app (or a reload) knows which order to ask about. What is
 * locked: it expires (a stale note never triggers a check), it is forgotten on
 * request, and a storage that throws (private mode, blocked site data) is
 * treated as empty rather than breaking the page.
 */
import { describe, expect, it } from "vitest";
import {
  PENDING_ORDER_MAX_AGE_MS,
  forgetPendingOrder,
  readPendingOrder,
  rememberPendingOrder,
} from "@/lib/billing/pendingOrder";

function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => void m.set(k, v),
    removeItem: (k) => void m.delete(k),
    clear: () => m.clear(),
    key: () => null,
    get length() {
      return m.size;
    },
  };
}

const throwing: Storage = {
  getItem: () => {
    throw new Error("blocked");
  },
  setItem: () => {
    throw new Error("blocked");
  },
  removeItem: () => {
    throw new Error("blocked");
  },
  clear: () => undefined,
  key: () => null,
  length: 0,
};

describe("pending order note", () => {
  const T = 1_800_000_000_000;

  it("reads back what was remembered", () => {
    const s = memoryStorage();
    rememberPendingOrder(s, "k", "order_A", T);
    expect(readPendingOrder(s, "k", T + 60_000)).toBe("order_A");
  });

  it("expires", () => {
    const s = memoryStorage();
    rememberPendingOrder(s, "k", "order_A", T);
    expect(readPendingOrder(s, "k", T + PENDING_ORDER_MAX_AGE_MS + 1)).toBeNull();
  });

  it("is forgotten on request", () => {
    const s = memoryStorage();
    rememberPendingOrder(s, "k", "order_A", T);
    forgetPendingOrder(s, "k");
    expect(readPendingOrder(s, "k", T)).toBeNull();
  });

  it("ignores a note that is not ours", () => {
    const s = memoryStorage();
    s.setItem("k", "not json");
    expect(readPendingOrder(s, "k", T)).toBeNull();
    s.setItem("k", JSON.stringify({ orderId: "../x", at: T }));
    expect(readPendingOrder(s, "k", T)).toBeNull();
  });

  it("treats a storage that throws as empty", () => {
    expect(() => rememberPendingOrder(throwing, "k", "order_A", T)).not.toThrow();
    expect(readPendingOrder(throwing, "k", T)).toBeNull();
    expect(() => forgetPendingOrder(throwing, "k")).not.toThrow();
    expect(readPendingOrder(null, "k", T)).toBeNull();
  });
});
