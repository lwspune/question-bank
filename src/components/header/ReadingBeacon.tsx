"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { readingViewFor } from "@/lib/activity/views";

/**
 * Records that a signed-in student read a page: notes, /board, /questions,
 * guides, formula pages and past papers (2026-10-19). Answers on those pages
 * were recorded, a read was not, so nothing could say whether reading a
 * chapter's notes came before doing better on it.
 *
 * Lives in the header because the header is on every page and already knows,
 * in the browser, whether anyone is signed in. Signed out, it sends nothing:
 * most reading traffic is anonymous, and every ping is a paid function call
 * the server would only refuse. Renders nothing.
 */
export default function ReadingBeacon({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!signedIn || !pathname) return;
    const view = readingViewFor(pathname);
    if (!view) return;
    sendActivityOnce(`view:${view.path}`, { kind: "surface_viewed", surface: view.surface, path: view.path });
  }, [signedIn, pathname]);
  return null;
}
