/**
 * The two push helpers the BROWSER needs, kept apart from core.ts because
 * core.ts reaches lib/email/click.ts and through it `node:crypto`, which cannot
 * go into a client bundle. Pure; re-exported by core.ts, and specified in
 * tests/push-core.test.ts.
 */

/**
 * iPhone and iPad browsers can receive push only from a site installed to the
 * Home Screen. iPadOS reports a Mac user agent, so a touch-capable "Mac" is
 * treated as an iPad.
 */
export function isIosNotStandalone(userAgent: string, standalone: boolean, maxTouchPoints = 0): boolean {
  const ios = /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
  return ios && !standalone;
}

/** A base64url VAPID public key → the bytes `pushManager.subscribe` wants. */
export function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = base64.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded);
  // A plain ArrayBuffer, which is what applicationServerKey accepts.
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
