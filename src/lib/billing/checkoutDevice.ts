/**
 * The phone and browser a checkout was opened on, as a Razorpay order note
 * (2026-11-27, owner). Pure.
 *
 * WHY: since go-live 38 of 52 failed payments were "payment_timed_out", every
 * one with no UPI ID (the request never reached, or was never approved in, a
 * UPI app), and four students kept trying, 3 to 8 times, without UPI working.
 * Razorpay keeps no device, so the cause (an app's own browser, such as
 * Instagram's, which often cannot open a UPI app? an iPhone?) was a guess.
 * The order route reads the browser's User-Agent and stamps `device` beside
 * the order's other notes, so paid and failed payments can be compared by it
 * and the owner's 6 pm list can name it.
 *
 * Only the coarse kind is kept ("android/instagram"), never the User-Agent.
 */

/** Razorpay refuses an order with more than 15 notes. */
export const MAX_ORDER_NOTES = 15;

type Os = "android" | "ios" | "desktop" | "other";

/** In-app browsers, matched in this order (an Instagram UA also says "wv"). */
const IN_APP: ReadonlyArray<[RegExp, string]> = [
  [/\bInstagram\b/i, "instagram"],
  [/FBAN\/|FBAV\/|FB_IAB|FBIOS/i, "facebook"],
  [/WhatsApp/i, "whatsapp"],
  [/Telegram/i, "telegram"],
  [/Snapchat/i, "snapchat"],
  [/LinkedInApp/i, "linkedin"],
  [/Twitter for/i, "x"],
  [/\bGSA\//, "google_app"],
];

function osOf(ua: string): Os {
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Windows|Macintosh|CrOS|X11|Linux/i.test(ua)) return "desktop";
  return "other";
}

/** "android/instagram", "ios/browser", "desktop/browser", ... or "unknown". */
export function checkoutDevice(userAgent: string | null | undefined): string {
  const ua = typeof userAgent === "string" ? userAgent.slice(0, 1000) : "";
  if (!ua.trim()) return "unknown";
  const os = osOf(ua);
  for (const [re, app] of IN_APP) if (re.test(ua)) return `${os}/${app}`;
  // An app's own browser that names no app: Android marks it "; wv)", and on
  // an iPhone every real browser (Safari, Chrome, Firefox, Edge) says "Safari/".
  if (os === "android" && /;\s*wv\)/.test(ua)) return "android/webview";
  if (os === "ios" && !/Safari\//.test(ua)) return "ios/webview";
  return `${os}/browser`;
}

const OS_LABEL: Record<string, string> = { android: "Android", ios: "iPhone", desktop: "computer", other: "other device" };
const APP_LABEL: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  snapchat: "Snapchat",
  linkedin: "LinkedIn",
  x: "X",
  google_app: "the Google app",
  webview: "another app",
};

/** The note in plain words for the owner ("Android, inside Instagram"), or null. */
export function deviceLabel(device: string | null | undefined): string | null {
  if (typeof device !== "string") return null;
  const [os, app, extra] = device.split("/");
  if (extra !== undefined || !os || !app) return null;
  const osLabel = OS_LABEL[os];
  if (!osLabel) return null;
  if (app === "browser") return osLabel;
  const appLabel = APP_LABEL[app];
  return appLabel ? `${osLabel}, inside ${appLabel}` : null;
}

/**
 * The order's notes with `device` beside them. Returns the notes untouched
 * when they already use the key, or when one more would pass Razorpay's limit:
 * a refused order is a lost sale, and the device is only for reading.
 */
export function stampDeviceNotes(notes: Record<string, string>, userAgent: string | null | undefined): Record<string, string> {
  if ("device" in notes || Object.keys(notes).length >= MAX_ORDER_NOTES) return notes;
  return { ...notes, device: checkoutDevice(userAgent) };
}

/** The fields of a Razorpay payment the device readout reads. */
export type DevicePayment = {
  status: string;
  error_reason?: string | null;
  notes?: Record<string, unknown> | unknown[] | null;
};

export type DeviceRow = { device: string; payments: number; paid: number; timedOut: number; otherFailed: number };

/**
 * Payments per device, busiest first (npm run billing:devices). A payment
 * inherits its order's notes, so one from an order made before 2026-11-27
 * lands under "not recorded". Paid = captured or since refunded.
 */
export function paymentsByDevice(payments: readonly DevicePayment[]): DeviceRow[] {
  const rows = new Map<string, DeviceRow>();
  for (const p of payments) {
    const notes = p.notes && !Array.isArray(p.notes) ? (p.notes as Record<string, unknown>) : {};
    const device = typeof notes.device === "string" && notes.device ? notes.device : "not recorded";
    const row = rows.get(device) ?? { device, payments: 0, paid: 0, timedOut: 0, otherFailed: 0 };
    row.payments++;
    if (p.status === "captured" || p.status === "refunded") row.paid++;
    else if (p.status === "failed") {
      if (p.error_reason === "payment_timed_out") row.timedOut++;
      else row.otherFailed++;
    }
    rows.set(device, row);
  }
  return [...rows.values()].sort((a, b) => b.payments - a.payments || a.device.localeCompare(b.device));
}
