"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { normaliseFrom } from "@/lib/tutor/interest";
import TutorInterestForm from "./TutorInterestForm";

/**
 * Who is answering, decided in the BROWSER (2026-11-06), so the /tutor page
 * itself is cached: the form for a signed-in account, a sign-in card otherwise.
 * A visitor with no sign-in cookie never makes a request. `?from=` is read
 * from the address bar after mount: Next's search-params hook would turn the
 * page's prerender into a client-only render (CLAUDE.md, "next caching traps").
 */

type Gate =
  | { kind: "loading" }
  | { kind: "signedOut" }
  | { kind: "form"; hasMobile: boolean; hasCity: boolean };

type Status = { signedIn: boolean; hasMobile: boolean; hasCity: boolean };

export default function TutorGate() {
  const [gate, setGate] = useState<Gate>({ kind: "loading" });
  const [here, setHere] = useState("/tutor");

  useEffect(() => {
    const from = normaliseFrom(new URLSearchParams(window.location.search).get("from"));
    setHere(encodeURIComponent(from ? `/tutor?from=${from}` : "/tutor"));

    if (!hasAuthCookie()) {
      setGate({ kind: "signedOut" });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/tutor-interest", { cache: "no-store" });
        const status = res.ok ? ((await res.json()) as Status) : null;
        if (cancelled) return;
        setGate(
          status?.signedIn
            ? { kind: "form", hasMobile: status.hasMobile, hasCity: status.hasCity }
            : { kind: "signedOut" }
        );
      } catch {
        // Could not tell: offer sign-in. A signed-in visitor who taps it is
        // sent straight back into the site by /login.
        if (!cancelled) setGate({ kind: "signedOut" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (gate.kind === "form") {
    return <TutorInterestForm hasMobile={gate.hasMobile} hasCity={gate.hasCity} />;
  }

  if (gate.kind === "loading") {
    return (
      <section
        className="mt-6 flex min-h-[220px] items-center justify-center rounded-xl border bg-card p-6"
        aria-live="polite"
      >
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />
        <span className="sr-only">Loading</span>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-xl border bg-card p-6 text-center">
      <h2 className="text-lg font-semibold">Sign in to answer</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We ask you to sign in so we can tell you if 1:1 tutoring opens.
      </p>
      <div className="mt-5 grid gap-3">
        <Button asChild variant="brand" className="h-12 w-full text-base">
          <Link href={`/login?next=${here}`}>Sign in</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 w-full text-base">
          <Link href={`/signup?next=${here}`}>Create a free account</Link>
        </Button>
      </div>
    </section>
  );
}
