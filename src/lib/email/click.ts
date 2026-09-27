/**
 * Email click tracking through our own redirect: every CTA in an email points
 * at /api/e/<token>?to=<path>, the route records `email_clicked` for the
 * student the token belongs to, then redirects. Chosen over Resend's link
 * rewriting (2026-09-27) so the click lands in user_activity beside the
 * student's other acts and the "--report" scripts can join on it.
 *
 * The token is minted BEFORE the send and stored on the email_sends row
 * (migration 0122): the row is written only after Resend accepts the message,
 * so the row id cannot be in the link.
 *
 * Pure except newClickToken (node:crypto randomness).
 */
import { randomBytes } from "node:crypto";
import { SITE_URL } from "./templates";

/** 24 random bytes, base64url: 32 chars, unguessable, safe in a URL path. */
export const CLICK_TOKEN_RE = /^[A-Za-z0-9_-]{32}$/;

export function newClickToken(): string {
  return randomBytes(24).toString("base64url");
}

export function clickUrl(token: string, path: string): string {
  return `${SITE_URL}/api/e/${token}?to=${encodeURIComponent(path)}`;
}

const MAX_TARGET = 512;

/**
 * The path the redirect may send a browser to: same-site only, or "/". A
 * token in an email is public to whoever holds the email, so the target must
 * not be able to leave the site or smuggle a header.
 */
export function resolveClickTarget(to: string | null | undefined): string {
  if (typeof to !== "string" || to.length === 0 || to.length > MAX_TARGET) return "/";
  if (!to.startsWith("/") || to.startsWith("//") || to.startsWith("/\\")) return "/";
  if (/[\r\n\0]/.test(to)) return "/";
  return to;
}
