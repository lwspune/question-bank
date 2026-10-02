"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, ExternalLink, LogIn } from "lucide-react";
import { practiceGateState } from "@/lib/notes/access";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { useIsInAppBrowser } from "@/components/browser/useIsInAppBrowser";
import { handoutDownloadHref } from "@/lib/notes/handoutDownload";

/**
 * "Download as PDF" affordance on a /notes chapter landing.
 *
 * Client-gated (not server-gated) for the same reason PracticeGate is: reading
 * the session on the server would make every chapter landing dynamic and undo
 * its ISR caching. Like that gate, this is a CONVERSION NUDGE over public
 * content, not a security boundary — the notes themselves are free and
 * indexed, and /notes/print/… stays reachable. The sign-in ask buys us the
 * teacher/student identity, it does not withhold the material.
 *
 * While auth resolves we render a neutral skeleton rather than either state,
 * so a signed-in teacher never sees a flash of the sign-in prompt.
 */
export default function NotesHandoutLink({
  href,
  chapterName,
}: {
  href: string;
  chapterName: string;
}) {
  const { signedIn, loading } = useSignedIn();
  const state = practiceGateState({ signedIn, loading });
  const pathname = usePathname();
  const inApp = useIsInAppBrowser();
  const [showTip, setShowTip] = useState(false);

  if (state === "loading") {
    return <div aria-hidden className="h-9 w-44 animate-pulse rounded-md bg-muted" />;
  }

  if (state === "locked") {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LogIn className="h-4 w-4" aria-hidden />
        Sign in to download as PDF
      </Link>
    );
  }

  // In-app browsers (WhatsApp, Instagram, the Google app…) ignore the print
  // call behind "Save as PDF", so the button would do nothing there. Say so,
  // and say how to get out, instead of offering a dead control.
  if (inApp) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowTip((v) => !v)}
          aria-expanded={showTip}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Open in Chrome to download
        </button>
        {showTip && (
          <p className="max-w-sm text-xs text-muted-foreground">
            This app&apos;s browser can&apos;t save PDFs. Tap the menu (⋮ or ⋯) at the top, choose
            &ldquo;Open in browser&rdquo; or &ldquo;Open in Chrome&rdquo;, then tap Download as PDF.
          </p>
        )}
      </div>
    );
  }

  return (
    // No prefetch: a handout's payload runs to megabytes (one KaTeX-heavy
    // chapter is 13 MB of HTML) and the route builds on first visit, so a
    // prefetch would download it — and build it — for every chapter view.
    <Link
      href={handoutDownloadHref(href)}
      prefetch={false}
      aria-label={`Download the ${chapterName} notes as a printable PDF`}
      className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Download className="h-4 w-4" aria-hidden />
      Download as PDF
    </Link>
  );
}
