/**
 * Is this page open inside another app's built-in browser (WhatsApp,
 * Instagram, Facebook, the Google app, LinkedIn, Snapchat…)?
 *
 * Those browsers ignore window.print(), so the notes handout's "Save as PDF"
 * does nothing there. Clarity (2026-10-01) recorded a visitor trying it three
 * times. A visitor in one gets "Open in Chrome to download" instead.
 *
 * The costly error is a false YES — telling a Chrome or Safari user their
 * browser cannot save when it can — so the generic rules are narrow: Android's
 * WebView marker "; wv)", and an iPhone/iPad page with no "Safari/" token
 * (Safari, Chrome and Firefox on iOS all carry one; app web views do not).
 *
 * Pure: takes the user-agent string, reads no globals.
 */
const NAMED_APPS = /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|\bGSA\/|LinkedInApp|Snapchat|MicroMessenger|\bLine\//;

export function isInAppBrowser(userAgent: string | null | undefined): boolean {
  const ua = userAgent ?? "";
  if (!ua) return false;
  if (NAMED_APPS.test(ua)) return true;
  if (/Android/.test(ua) && /; wv\)/.test(ua)) return true;
  if (/iPhone|iPad|iPod/.test(ua) && !/Safari\//.test(ua)) return true;
  return false;
}
