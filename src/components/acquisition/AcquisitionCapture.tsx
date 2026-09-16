"use client";

import { useEffect } from "react";
import { parseAcquisition, isFirstTouchWorthStoring } from "@/lib/acquisition/source";
import { writeAcquisitionCookieValue } from "@/lib/acquisition/cookie";

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
 * FIRST TOUCH WINS: if the cookie already exists we return immediately, so a
 * later WhatsApp visit never overwrites the Google search that earned the
 * account. See lib/acquisition/source.ts for the rules.
 */

export const ACQ_COOKIE = "qb_acq";
const MAX_AGE_DAYS = 90;

function hasCookie(name: string): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith(`${name}=`));
}

export default function AcquisitionCapture() {
  useEffect(() => {
    try {
      // First touch already parked — never overwrite it.
      if (hasCookie(ACQ_COOKIE)) return;

      const acq = parseAcquisition({
        url: window.location.href,
        referrer: document.referrer || null,
        selfHost: window.location.hostname,
      });
      if (!acq) return;
      if (!isFirstTouchWorthStoring({ existing: null, incoming: acq })) return;

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
