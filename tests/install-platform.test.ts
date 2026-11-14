/**
 * Which version of /app a visitor gets (lib/install/platform.ts).
 *
 * Real user-agent strings, because the rule is only as good as the strings it
 * is tested on: an in-app browser (Instagram, Facebook, an Android WebView)
 * cannot install anything, and it carries an "iPhone" or "Android" token like
 * the real browser does, so it has to be caught BEFORE the phone checks.
 */
import { describe, it, expect } from "vitest";
import { installAction, installPlatform, isInAppBrowser } from "@/lib/install/platform";

const UA = {
  androidChrome:
    "Mozilla/5.0 (Linux; Android 14; SM-A146B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  samsungInternet:
    "Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-M135F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36",
  androidWebView:
    "Mozilla/5.0 (Linux; Android 12; RMX3085 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36",
  instagramAndroid:
    "Mozilla/5.0 (Linux; Android 13; V2207 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0.6668.100 Mobile Safari/537.36 Instagram 353.0.0.47.90 Android",
  instagramIphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 342.0.0.33.95 (iPhone14,7; iOS 17_5; en_IN; en; scale=3.00; 1170x2532; 627400398)",
  facebookIphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/460.0.0.38.109;FBBV/584447210;FBDV/iPhone13,2;FBMD/iPhone;FBSN/iOS;FBSV/17.4]",
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  iphoneChrome:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.6723.90 Mobile/15E148 Safari/604.1",
  ipadAsMac:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  windowsChrome:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
};

describe("isInAppBrowser", () => {
  it.each([
    ["an Android WebView", UA.androidWebView],
    ["Instagram on Android", UA.instagramAndroid],
    ["Instagram on iPhone", UA.instagramIphone],
    ["Facebook on iPhone", UA.facebookIphone],
  ])("catches %s", (_label, ua) => {
    expect(isInAppBrowser(ua)).toBe(true);
  });

  it.each([
    ["Chrome on Android", UA.androidChrome],
    ["Samsung Internet", UA.samsungInternet],
    ["Safari on iPhone", UA.iphoneSafari],
    ["Chrome on iPhone", UA.iphoneChrome],
    ["Chrome on Windows", UA.windowsChrome],
  ])("leaves %s alone", (_label, ua) => {
    expect(isInAppBrowser(ua)).toBe(false);
  });
});

describe("installPlatform", () => {
  it("is 'installed' whenever the page runs in its own window, whatever the browser", () => {
    expect(installPlatform({ userAgent: UA.androidChrome, standalone: true })).toBe("installed");
    expect(installPlatform({ userAgent: UA.iphoneSafari, standalone: true })).toBe("installed");
    expect(installPlatform({ userAgent: UA.windowsChrome, standalone: true })).toBe("installed");
  });

  it("puts an in-app browser before the phone checks (it carries iPhone/Android tokens too)", () => {
    expect(installPlatform({ userAgent: UA.instagramIphone, standalone: false })).toBe("in-app");
    expect(installPlatform({ userAgent: UA.instagramAndroid, standalone: false })).toBe("in-app");
    expect(installPlatform({ userAgent: UA.androidWebView, standalone: false })).toBe("in-app");
  });

  it("reads Android browsers as android", () => {
    expect(installPlatform({ userAgent: UA.androidChrome, standalone: false })).toBe("android");
    expect(installPlatform({ userAgent: UA.samsungInternet, standalone: false })).toBe("android");
  });

  it("reads iPhone browsers as ios (Chrome on iPhone adds to the Home Screen from Share too)", () => {
    expect(installPlatform({ userAgent: UA.iphoneSafari, standalone: false })).toBe("ios");
    expect(installPlatform({ userAgent: UA.iphoneChrome, standalone: false })).toBe("ios");
  });

  it("reads an iPad (a touch-capable 'Mac') as ios, a real Mac as desktop", () => {
    expect(installPlatform({ userAgent: UA.ipadAsMac, standalone: false, maxTouchPoints: 5 })).toBe("ios");
    expect(installPlatform({ userAgent: UA.ipadAsMac, standalone: false, maxTouchPoints: 0 })).toBe("desktop");
  });

  it("reads everything else as desktop", () => {
    expect(installPlatform({ userAgent: UA.windowsChrome, standalone: false })).toBe("desktop");
    expect(installPlatform({ userAgent: "", standalone: false })).toBe("desktop");
  });
});

describe("installAction", () => {
  it("offers the one-tap button wherever the browser handed us its install prompt", () => {
    expect(installAction("android", true)).toBe("button");
    expect(installAction("desktop", true)).toBe("button");
  });

  it("falls back to the browser-menu steps on Android without a prompt", () => {
    expect(installAction("android", false)).toBe("android-steps");
  });

  it("gives iPhone the Share steps, prompt or not (Safari never hands one over)", () => {
    expect(installAction("ios", false)).toBe("ios-steps");
    expect(installAction("ios", true)).toBe("ios-steps");
  });

  it("sends an in-app browser out to a real browser", () => {
    expect(installAction("in-app", false)).toBe("open-in-browser");
  });

  it("tells an installed app it is already the app, and a desktop without a prompt to use the phone", () => {
    expect(installAction("installed", true)).toBe("already");
    expect(installAction("installed", false)).toBe("already");
    expect(installAction("desktop", false)).toBe("use-phone");
  });
});
