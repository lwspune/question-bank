/**
 * Browser push for the due-queue nudge — the pure core (PUSH_SPEC.md §5).
 *
 * The notification's wording was fixed against a mockup (2026-10-01): the
 * email subject truncates on a collapsed Android lock screen, a fixed "About
 * five minutes" is wrong for one question, and with no icon every notification
 * shows a generic browser glyph. Those three are pinned here.
 */
import { describe, it, expect } from "vitest";
import {
  PUSH_BADGE,
  PUSH_ICON,
  PUSH_MAX_FAILS,
  buildDuePushPayload,
  classifyDelivery,
  drillTimeLine,
  isIosNotStandalone,
  parseSubscription,
  pushTitle,
  serializePayload,
  shouldDropAfterFailure,
  urlBase64ToUint8Array,
} from "@/lib/push/core";
import { SITE_URL } from "@/lib/email/templates";
import type { DueSummary } from "@/lib/email/dueNudge";

const KEYS = { p256dh: "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM", auth: "tBHItJI5svbpez7KI4CCXg" };
const ENDPOINT = "https://fcm.googleapis.com/fcm/send/abc123";
const TOKEN = "AbCdEfGhIjKlMnOpQrStUvWxYz012345";

const summary = (...chapters: [string, number][]): DueSummary => ({
  total: chapters.reduce((n, [, c]) => n + c, 0),
  chapters: chapters.map(([chapter, count]) => ({ chapter, count })),
});

describe("parseSubscription", () => {
  it("accepts a browser's PushSubscription.toJSON() and keeps the user agent", () => {
    const r = parseSubscription({ endpoint: ENDPOINT, keys: KEYS, userAgent: "Mozilla/5.0 (Linux; Android 14)" });
    expect(r).toEqual({ ok: true, value: { endpoint: ENDPOINT, keys: KEYS, userAgent: "Mozilla/5.0 (Linux; Android 14)" } });
  });

  it("ignores the expirationTime a browser also sends", () => {
    const r = parseSubscription({ endpoint: ENDPOINT, expirationTime: null, keys: KEYS });
    expect(r.ok).toBe(true);
  });

  it("truncates a long user agent to 256", () => {
    const r = parseSubscription({ endpoint: ENDPOINT, keys: KEYS, userAgent: "x".repeat(900) });
    expect(r.ok && r.value.userAgent?.length).toBe(256);
  });

  it("rejects anything that is not an https endpoint of sane length", () => {
    for (const endpoint of ["http://fcm.googleapis.com/x", "javascript:alert(1)", "", 42, "https://" + "a".repeat(2050), "https://"]) {
      expect(parseSubscription({ endpoint, keys: KEYS }).ok).toBe(false);
    }
  });

  it("rejects missing, short or non-base64url keys", () => {
    expect(parseSubscription({ endpoint: ENDPOINT }).ok).toBe(false);
    expect(parseSubscription({ endpoint: ENDPOINT, keys: { p256dh: KEYS.p256dh } }).ok).toBe(false);
    expect(parseSubscription({ endpoint: ENDPOINT, keys: { ...KEYS, auth: "short" } }).ok).toBe(false);
    expect(parseSubscription({ endpoint: ENDPOINT, keys: { ...KEYS, auth: "has spaces in it!!" } }).ok).toBe(false);
    expect(parseSubscription({ endpoint: ENDPOINT, keys: { ...KEYS, p256dh: "A".repeat(300) } }).ok).toBe(false);
  });

  it("rejects a non-object body", () => {
    for (const body of [null, undefined, "x", 3, []]) expect(parseSubscription(body).ok).toBe(false);
  });
});

describe("pushTitle", () => {
  it("counts mistakes and names Fix, singular at one", () => {
    expect(pushTitle(1)).toBe("1 mistake is waiting in Fix");
    expect(pushTitle(5)).toBe("5 mistakes are waiting in Fix");
  });

  it("fits a collapsed lock-screen line even at three digits", () => {
    expect(pushTitle(250).length).toBeLessThanOrEqual(34);
  });
});

describe("drillTimeLine", () => {
  it("is a minute a question, capped at the five a drill serves", () => {
    expect(drillTimeLine(1)).toBe("About a minute.");
    expect(drillTimeLine(3)).toBe("About 3 minutes.");
    expect(drillTimeLine(5)).toBe("About 5 minutes.");
    expect(drillTimeLine(40)).toBe("About 5 minutes.");
  });
});

describe("buildDuePushPayload", () => {
  it("titles by the total and lists the chapters, then the time", () => {
    const p = buildDuePushPayload({ summary: summary(["Trigonometry", 3], ["Vectors", 2]), clickToken: TOKEN });
    expect(p.title).toBe("5 mistakes are waiting in Fix");
    expect(p.body).toBe("Trigonometry 3 · Vectors 2 · About 5 minutes.");
  });

  it("one question in one chapter", () => {
    const p = buildDuePushPayload({ summary: summary(["Vectors", 1]), clickToken: TOKEN });
    expect(p.title).toBe("1 mistake is waiting in Fix");
    expect(p.body).toBe("Vectors 1 · About a minute.");
  });

  it("names three chapters, then counts the CHAPTERS left out", () => {
    const p = buildDuePushPayload({
      summary: summary(["Trigonometry", 3], ["Vectors", 2], ["Matrices", 2], ["Limits", 1], ["Sets", 1]),
      clickToken: TOKEN,
    });
    expect(p.body).toBe("Trigonometry 3 · Vectors 2 · Matrices 2 · +2 more · About 5 minutes.");
  });

  it("opens the drill through the click tracker, with the brand icon and badge", () => {
    const p = buildDuePushPayload({ summary: summary(["Vectors", 1]), clickToken: TOKEN });
    expect(p.url).toBe(`${SITE_URL}/api/e/${TOKEN}?to=%2Fdrill`);
    expect(p.tag).toBe("due-nudge");
    expect(p.icon).toBe(PUSH_ICON);
    expect(p.badge).toBe(PUSH_BADGE);
  });
});

describe("serializePayload", () => {
  it("stays under the push service's 4 KB cap with room to spare", () => {
    const long = Array.from({ length: 10 }, (_, i) => [`A very long chapter name number ${i} `.repeat(4), 9] as [string, number]);
    const s = serializePayload(buildDuePushPayload({ summary: summary(...long), clickToken: TOKEN }));
    expect(new TextEncoder().encode(s).length).toBeLessThan(3500);
    expect(JSON.parse(s).title).toBe("90 mistakes are waiting in Fix");
  });

  it("refuses a payload over the cap rather than letting the push service reject it", () => {
    expect(() =>
      serializePayload({ title: "x", body: "y".repeat(4000), url: "/", tag: "due-nudge", icon: PUSH_ICON, badge: PUSH_BADGE })
    ).toThrow();
  });
});

describe("classifyDelivery", () => {
  it("2xx is sent; 404 and 410 mean the subscription is gone; anything else is a failure to retry", () => {
    expect(classifyDelivery(201)).toBe("sent");
    expect(classifyDelivery(200)).toBe("sent");
    expect(classifyDelivery(404)).toBe("gone");
    expect(classifyDelivery(410)).toBe("gone");
    for (const code of [400, 403, 413, 429, 500, 503]) expect(classifyDelivery(code)).toBe("failed");
    expect(classifyDelivery(null)).toBe("failed");
  });
});

describe("shouldDropAfterFailure", () => {
  it("drops a subscription on its PUSH_MAX_FAILS-th consecutive failure, not before", () => {
    expect(shouldDropAfterFailure(PUSH_MAX_FAILS - 2)).toBe(false);
    expect(shouldDropAfterFailure(PUSH_MAX_FAILS - 1)).toBe(true);
  });
});

describe("isIosNotStandalone", () => {
  const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
  const IPADOS = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
  const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";

  it("is true for an iPhone browser tab and false once installed to the Home Screen", () => {
    expect(isIosNotStandalone(IPHONE, false)).toBe(true);
    expect(isIosNotStandalone(IPHONE, true)).toBe(false);
  });

  it("catches an iPad that reports a Mac user agent, by its touch points", () => {
    expect(isIosNotStandalone(IPADOS, false, 5)).toBe(true);
    expect(isIosNotStandalone(IPADOS, false, 0)).toBe(false);
  });

  it("is false on Android and desktop", () => {
    expect(isIosNotStandalone(ANDROID, false)).toBe(false);
  });
});

describe("urlBase64ToUint8Array", () => {
  it("decodes a base64url VAPID key into its 65 raw bytes", () => {
    const key = urlBase64ToUint8Array(KEYS.p256dh);
    expect(key.length).toBe(65);
    expect(key[0]).toBe(0x04); // an uncompressed P-256 point
  });
});
