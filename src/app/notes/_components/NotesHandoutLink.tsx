"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, LogIn } from "lucide-react";
import { practiceGateState } from "@/lib/notes/access";
import { useSignedIn } from "@/components/auth/useSignedIn";

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

  return (
    <Link
      href={href}
      aria-label={`Download the ${chapterName} notes as a printable PDF`}
      className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Download className="h-4 w-4" aria-hidden />
      Download as PDF
    </Link>
  );
}
