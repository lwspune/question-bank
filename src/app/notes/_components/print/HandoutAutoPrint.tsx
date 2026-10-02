"use client";

import { useEffect } from "react";
import { isInAppBrowser } from "@/lib/browser/inAppBrowser";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { shouldAutoPrint, withoutPrintParam } from "@/lib/notes/handoutDownload";

/**
 * Two effects on the print handout, no UI.
 *
 * 1. Records the open (surface "handout", with the browser kind) so the
 *    handout's use can finally be read; the server keeps signed-in rows only.
 * 2. When the chapter's "Download as PDF" link opened this page (`?print=1`),
 *    opens the save screen once fonts are in, so the PDF is one tap, not three.
 *    The flag is dropped first, so a reload or Back does not reprint. In-app
 *    browsers ignore window.print(), so it is not attempted there.
 *
 * Reads location directly rather than useSearchParams: the route is cached,
 * and useSearchParams would bail it out of static rendering.
 */
export default function HandoutAutoPrint() {
  useEffect(() => {
    // Read here, not through useIsInAppBrowser: that hook reports "standard"
    // on the hydration render, and a once-per-page ping sent then would stick.
    const inApp = isInAppBrowser(navigator.userAgent);
    sendActivityOnce("handout", {
      kind: "surface_viewed",
      surface: "handout",
      browser: inApp ? "inapp" : "standard",
    });

    if (inApp || !shouldAutoPrint(window.location.search)) return;
    // Dropping the flag BEFORE printing is also what stops a second print: a
    // re-run of this effect (React's dev double-invoke, a remount) finds no
    // flag. No cleanup guard, which would cancel the only print in dev.
    window.history.replaceState(null, "", withoutPrintParam(window.location.pathname + window.location.search));
    void document.fonts.ready.then(() => window.print());
  }, []);

  return null;
}
