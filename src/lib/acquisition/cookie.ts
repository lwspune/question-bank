/**
 * The `qb_acq` cookie: shared shape between the client island that writes it and
 * the server route that reads it.
 *
 * THE COOKIE IS UNTRUSTED. Anyone can set it to anything from the console, and
 * its contents go straight into a DB column with a length CHECK. So this parser
 * never assumes: a non-string field becomes null, an over-long one is truncated
 * HERE (a 400-character source would otherwise reach the CHECK and turn a
 * student's onboarding into a 500), and anything unparseable yields null.
 *
 * Truncating rather than rejecting is deliberate for length alone — a clipped
 * attribution is still useful, whereas a rejected one loses a real channel over
 * a cosmetic problem. Missing source/medium IS rejected, because a record
 * without a channel is not attribution at all.
 *
 * Pure. Spec: tests/acquisition-cookie.test.ts.
 */
import { ACQ_MAX_LEN, type Acquisition } from "./source";

function str(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, ACQ_MAX_LEN) : null;
}

/** Serialise for `document.cookie` — the client island's writer. */
export function writeAcquisitionCookieValue(acq: Acquisition): string {
  return encodeURIComponent(
    JSON.stringify({
      s: acq.source,
      m: acq.medium,
      c: acq.campaign,
      l: acq.landing,
      r: acq.referrerHost,
    })
  );
}

/** Parse a raw cookie value into an Acquisition, or null if it is not one. */
export function readAcquisitionCookie(raw: string | null | undefined): Acquisition | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;

  const o = parsed as Record<string, unknown>;
  const source = str(o.s);
  const medium = str(o.m);
  // Without a channel there is nothing to attribute — reject rather than store
  // a half-record that would later read as a real, if odd, source.
  if (!source || !medium) return null;

  return {
    source,
    medium,
    campaign: str(o.c),
    landing: str(o.l) ?? "/",
    referrerHost: str(o.r),
  };
}
