import { describe, it, expect } from "vitest";
import { isInAppBrowser } from "@/lib/browser/inAppBrowser";

// "Save as PDF" calls window.print(), which in-app browsers ignore. Clarity
// (2026-10-01) recorded a visitor trying it three times. These are the
// browsers that get "Open in Chrome to download" instead of a dead button.
const IN_APP: Record<string, string> = {
  "WhatsApp (Android)":
    "Mozilla/5.0 (Linux; Android 13; SM-A146B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.81 Mobile Safari/537.36 WhatsApp/2.24.20.79",
  "Instagram (Android)":
    "Mozilla/5.0 (Linux; Android 14; 23021RAAEG Build/UKQ1.230917.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36 Instagram 350.0.0.43.89 Android",
  "Instagram (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.25.104 (iPhone14,5; iOS 17_6)",
  "Facebook (Android)":
    "Mozilla/5.0 (Linux; Android 12; RMX3085 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0.6613.146 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/482.0.0.47.103;]",
  "Facebook (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/480.0.0.39.107;FBBV/123;FBDV/iPhone13,2]",
  "Google app (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/330.0.663035834 Mobile/15E148 Safari/604.1",
  "Google app (Android)":
    "Mozilla/5.0 (Linux; Android 14; Pixel 7 Build/AP2A.240905.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.81 Mobile Safari/537.36 GSA/15.38.32.29.arm64",
  "LinkedIn (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]/9.30.1",
  "Snapchat (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Snapchat/13.6.0.38 (like Safari/8618.2.12.10.4, panda)",
};

const STANDARD: Record<string, string> = {
  "Chrome (Android)":
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
  "Safari (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
  "Chrome (iPhone)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1",
  "Samsung Internet":
    "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36",
  "Edge (Windows)":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
  "Firefox (Android)": "Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0",
};

describe("isInAppBrowser", () => {
  for (const [name, ua] of Object.entries(IN_APP)) {
    it(`recognises ${name}`, () => expect(isInAppBrowser(ua)).toBe(true));
  }

  // The costly mistake is the other direction: telling a Chrome or Safari user
  // their browser cannot save, when it can.
  for (const [name, ua] of Object.entries(STANDARD)) {
    it(`leaves ${name} alone`, () => expect(isInAppBrowser(ua)).toBe(false));
  }

  it("treats a missing user agent as a normal browser", () => {
    expect(isInAppBrowser("")).toBe(false);
    expect(isInAppBrowser(undefined)).toBe(false);
  });
});
