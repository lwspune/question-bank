"use client";

import { useEffect } from "react";
import { parseAcquisition, isFirstTouchWorthStoring } from "@/lib/acquisition/source";
import { readAcquisitionCookie, writeAcquisitionCookieValue } from "@/lib/acquisition/cookie";

/**
 * Captures first-touch acquisition into a cookie, once per browser.
 *
 * WHY A CLIENT ISLAND: the referrer only exists in the browser, and reading
 * anything request-scoped during a server render would mark every route dynamic
 * and cost the site its prerendering — the failure that left this project with
 * zero cached HTML files for months. This component touches no server API and
 * runs after hydration, so a static page stays static.
 *
 * WHY A COOKIE AND NOT A FETCH: the visitor usually has no account yet. The
 * channel is parked client-side and read once, server-side, when the student
 * completes onboarding — so nothing is written about anyone who never signs up.
 * That is the privacy posture as well as the cheap one: an anonymous visitor
 * leaves no row anywhere.
 *
 * FIRST NAMED TOUCH WINS: a parked channel is never overwritten, so a later
 * WhatsApp visit never replaces the Google search that earned the account. A
 * direct visit is parked too, for its landing page, until a named channel
 * replaces it. See lib/acquisition/source.ts for the rules.
 */

export const ACQ_COOKIE = "qb_acq";
const MAX_AGE_DAYS = 90;

function readCookie(name: string): string | null {
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : null;
}

export default function AcquisitionCapture() {
  useEffect(() => {
    try {
      const acq = parseAcquisition({
        url: window.location.href,
        referrer: document.referrer || null,
        selfHost: window.location.hostname,
      });
      if (!acq) return;
      // A parked named channel is never replaced; a parked direct visit is,
      // by the first named one (the rule lives in isFirstTouchWorthStoring).
      const existing = readAcquisitionCookie(readCookie(ACQ_COOKIE));
      if (!isFirstTouchWorthStoring({ existing, incoming: acq })) return;

      // One serialiser shared with the server-side reader, so the two cannot
      // drift into disagreeing about the cookie's shape.
      const value = writeAcquisitionCookieValue(acq);
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${ACQ_COOKIE}=${value}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
    } catch {
      /* attribution is never worth breaking a page over */
    }
  }, []);

  return null;
}
