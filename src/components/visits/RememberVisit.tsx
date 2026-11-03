"use client";

import { useEffect } from "react";
import { LAST_VISIT_KEY, serializeLastVisit, type LastVisitKind } from "@/lib/visits/lastVisit";

/**
 * Remembers this page in the visitor's own browser, so the homepage can offer
 * "Continue" when they come back (ContinueCard). Renders nothing, writes after
 * load, and a blocked storage (private window) just means no card.
 */
export default function RememberVisit({ href, title, kind }: { href: string; title: string; kind: LastVisitKind }) {
  useEffect(() => {
    try {
      localStorage.setItem(LAST_VISIT_KEY, serializeLastVisit({ href, title, kind }, Date.now()));
    } catch {
      /* storage unavailable: no continue card, nothing else changes */
    }
  }, [href, title, kind]);
  return null;
}
