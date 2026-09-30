"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  buildClaritySnippet,
  clarityCommandFor,
  resolveClarityProjectId,
  shouldLoadClarity,
} from "@/lib/analytics/clarity";

/**
 * Microsoft Clarity client island. Rules live in lib/analytics/clarity.ts.
 *
 * WHY A CLIENT ISLAND IN THE ROOT LAYOUT: it reads only the pathname (a
 * client hook that does NOT bail prerendering — `useSearchParams` would) and
 * touches no server API, so every static route stays static. `afterInteractive`
 * keeps it off the critical path for the mobile-first audience.
 *
 * WHY THE EFFECT AS WELL AS THE RENDER GUARD: the render guard decides whether
 * the loader is ever emitted for this document. But Clarity, once loaded, is
 * global — a soft navigation from /browse into /dashboard keeps it recording.
 * The effect issues stop/start at every route change so the staff boundary
 * holds across client-side navigation too. A hard load of a staff route never
 * emits the loader at all.
 *
 * The project id is a BUILD-TIME NEXT_PUBLIC_* value; unset means the island
 * renders nothing anywhere.
 */
const PROJECT_ID = resolveClarityProjectId(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);

type ClarityFn = (command: "start" | "stop") => void;

export default function ClarityScript() {
  const pathname = usePathname();
  const allowed = shouldLoadClarity(pathname);

  useEffect(() => {
    if (!PROJECT_ID) return;
    const clarity = (window as unknown as { clarity?: ClarityFn }).clarity;
    if (typeof clarity !== "function") return;
    try {
      clarity(clarityCommandFor(pathname));
    } catch {
      // Best effort, like every analytics ping here: never surface to a student.
    }
  }, [pathname]);

  if (!PROJECT_ID || !allowed) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {buildClaritySnippet(PROJECT_ID)}
    </Script>
  );
}
