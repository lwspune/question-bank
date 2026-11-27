/**
 * The phone and browser a checkout was opened on (2026-11-27). Since go-live
 * 38 of 52 failed payments timed out with no UPI ID at all, and four students
 * kept trying (3 to 8 times) without UPI ever working. Razorpay keeps no device,
 * so the order notes carry one: "android/instagram", "ios/browser", ...
 */
import { describe, it, expect } from "vitest";
import { checkoutDevice, deviceLabel, paymentsByDevice, stampDeviceNotes, MAX_ORDER_NOTES } from "@/lib/billing/checkoutDevice";

const UA = {
  chromeAndroid:
    "Mozilla/5.0 (Linux; Android 14; SM-A146B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  instagramAndroid:
    "Mozilla/5.0 (Linux; Android 13; RMX3363 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36 Instagram 356.0.0.41.101 Android (33/13; 480dpi; 1080x2400; realme; RMX3363; RE54BL1; qcom; en_IN; 655201111)",
  instagramIos:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 356.0.0.28.80 (iPhone14,7; iOS 18_1; en_IN; en; scale=3.00; 1170x2532; 657108134)",
  facebookAndroid:
    "Mozilla/5.0 (Linux; Android 12; V2120 Build/SP1A.210812.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/489.0.0.66.81;]",
  googleAppIos:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/343.0.695551749 Mobile/15E148 Safari/604.1",
  webviewAndroid:
    "Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RKQ1.201004.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36",
  safariIos:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  chromeIos:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1",
  webviewIos:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  chromeWindows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  safariMac:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
};

describe("checkoutDevice", () => {
  it("names the phone and the browser, telling an app's own browser apart", () => {
    expect(checkoutDevice(UA.chromeAndroid)).toBe("android/browser");
    expect(checkoutDevice(UA.instagramAndroid)).toBe("android/instagram");
    expect(checkoutDevice(UA.instagramIos)).toBe("ios/instagram");
    expect(checkoutDevice(UA.facebookAndroid)).toBe("android/facebook");
    expect(checkoutDevice(UA.googleAppIos)).toBe("ios/google_app");
    expect(checkoutDevice(UA.webviewAndroid)).toBe("android/webview");
    expect(checkoutDevice(UA.safariIos)).toBe("ios/browser");
    expect(checkoutDevice(UA.chromeIos)).toBe("ios/browser");
    expect(checkoutDevice(UA.webviewIos)).toBe("ios/webview");
    expect(checkoutDevice(UA.chromeWindows)).toBe("desktop/browser");
    expect(checkoutDevice(UA.safariMac)).toBe("desktop/browser");
  });

  it("says unknown rather than guessing", () => {
    expect(checkoutDevice(null)).toBe("unknown");
    expect(checkoutDevice("")).toBe("unknown");
    expect(checkoutDevice("curl/8.4.0")).toBe("other/browser");
  });

  it("always fits a Razorpay note (256 characters)", () => {
    expect(checkoutDevice("x".repeat(5000)).length).toBeLessThanOrEqual(256);
  });
});

describe("deviceLabel", () => {
  it("reads the note back in plain words for the owner", () => {
    expect(deviceLabel("android/instagram")).toBe("Android, inside Instagram");
    expect(deviceLabel("ios/browser")).toBe("iPhone");
    expect(deviceLabel("ios/webview")).toBe("iPhone, inside another app");
    expect(deviceLabel("desktop/browser")).toBe("computer");
    expect(deviceLabel("android/google_app")).toBe("Android, inside the Google app");
  });

  it("says nothing for an order from before the note, or an unknown one", () => {
    expect(deviceLabel(null)).toBeNull();
    expect(deviceLabel(undefined)).toBeNull();
    expect(deviceLabel("unknown")).toBeNull();
    expect(deviceLabel("nonsense")).toBeNull();
  });
});

describe("stampDeviceNotes", () => {
  it("adds the device beside the order's own notes, changing none of them", () => {
    const notes = { userId: "u1", planId: "mock-pass-6m", amountPaise: "19900" };
    expect(stampDeviceNotes(notes, UA.instagramAndroid)).toEqual({ ...notes, device: "android/instagram" });
    expect(notes).not.toHaveProperty("device");
  });

  it("never pushes an order past Razorpay's 15 notes, since a refused order loses a sale", () => {
    const full = Object.fromEntries(Array.from({ length: MAX_ORDER_NOTES }, (_, i) => [`k${i}`, "v"]));
    expect(stampDeviceNotes(full, UA.safariIos)).toBe(full);
    expect(MAX_ORDER_NOTES).toBe(15);
  });

  it("never overwrites a key the order already uses", () => {
    const notes = { userId: "u1", device: "kept" };
    expect(stampDeviceNotes(notes, UA.safariIos)).toBe(notes);
  });
});

describe("paymentsByDevice", () => {
  const pay = (status: string, device: string | null, error_reason: string | null = null) => ({
    status,
    error_reason,
    notes: device === null ? {} : { userId: "u1", device },
  });

  it("counts paid, timed-out and other failed payments per device, busiest first", () => {
    const rows = paymentsByDevice([
      pay("captured", "android/browser"),
      pay("refunded", "android/browser"),
      pay("failed", "android/browser", "bank_account_invalid"),
      pay("failed", "android/instagram", "payment_timed_out"),
      pay("failed", "android/instagram", "payment_timed_out"),
      pay("failed", "android/instagram", "payment_timed_out"),
      pay("failed", "android/instagram", "payment_timed_out"),
      pay("created", "ios/browser"),
    ]);
    expect(rows).toEqual([
      { device: "android/instagram", payments: 4, paid: 0, timedOut: 4, otherFailed: 0 },
      { device: "android/browser", payments: 3, paid: 2, timedOut: 0, otherFailed: 1 },
      { device: "ios/browser", payments: 1, paid: 0, timedOut: 0, otherFailed: 0 },
    ]);
  });

  it("files a payment from an order before the note under 'not recorded'", () => {
    expect(paymentsByDevice([pay("captured", null), { status: "captured", notes: null }, { status: "captured", notes: [] }])).toEqual([
      { device: "not recorded", payments: 3, paid: 3, timedOut: 0, otherFailed: 0 },
    ]);
  });
});
