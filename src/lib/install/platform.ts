/**
 * Which version of /app a visitor gets (2026-11-14, growth registry
 * "install-app"). Pure: the /app card, the account-menu item and the launch
 * recorder all read the browser through these, and tests/install-platform.test.ts
 * pins them on real user-agent strings.
 *
 * WHY: about 8 students in four weeks asked whether PYQ Vault has an app. It
 * does, in effect: the site carries a manifest and installs to the home screen,
 * but nothing on the site offered it, so nobody knew.
 */

export type InstallPlatform = "installed" | "ios" | "android" | "in-app" | "desktop";

export type InstallAction =
  /** The browser handed us its install prompt: one tap installs. */
  | "button"
  /** Android without a prompt (Samsung Internet, Firefox, or Chrome before it offers one): the menu steps. */
  | "android-steps"
  /** iPhone and iPad: Share, then Add to Home Screen. Safari never hands over a prompt. */
  | "ios-steps"
  /** Instagram, Facebook or another app's built-in browser, which cannot install anything. */
  | "open-in-browser"
  /** Already running from the home-screen icon. */
  | "already"
  /** A computer with no prompt: the app is for the phone. */
  | "use-phone";

/**
 * An app's built-in browser. Instagram and Facebook name themselves; any other
 * Android app that opens links in a WebView marks it with "; wv)". Android
 * Chrome Custom Tabs (WhatsApp's usual way to open a link) send Chrome's own
 * user agent and DO offer "Open in Chrome", so they are rightly not caught.
 */
export function isInAppBrowser(userAgent: string): boolean {
  return /Instagram|FBAN|FBAV|FB_IAB|Line\/|Snapchat|LinkedInApp|; wv\)/.test(userAgent);
}

/** iPadOS reports a Mac user agent, so a touch-capable "Mac" is an iPad (as in lib/push/browser.ts). */
function isIos(userAgent: string, maxTouchPoints: number): boolean {
  return /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
}

export function installPlatform(input: {
  userAgent: string;
  /** `display-mode: standalone`, or iOS's `navigator.standalone`. */
  standalone: boolean;
  maxTouchPoints?: number;
}): InstallPlatform {
  if (input.standalone) return "installed";
  const ua = input.userAgent;
  // Before the phone checks: an in-app browser carries the iPhone/Android tokens too.
  if (isInAppBrowser(ua)) return "in-app";
  if (isIos(ua, input.maxTouchPoints ?? 0)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

/** What the /app card shows, given the platform and whether the browser handed over its install prompt. */
export function installAction(platform: InstallPlatform, canPrompt: boolean): InstallAction {
  switch (platform) {
    case "installed":
      return "already";
    case "in-app":
      return "open-in-browser";
    case "ios":
      return "ios-steps";
    case "android":
      return canPrompt ? "button" : "android-steps";
    case "desktop":
      return canPrompt ? "button" : "use-phone";
  }
}

/** A phone or tablet that is not yet running the app: the account menu offers "Get the app" to these. */
export function shouldOfferApp(platform: InstallPlatform): boolean {
  return platform === "android" || platform === "ios" || platform === "in-app";
}
