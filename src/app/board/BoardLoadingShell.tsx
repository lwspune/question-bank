import type { ReactNode } from "react";
import AppHeader from "@/components/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shared frame for the /board loading screens: the same header, width and
 * breadcrumb-then-title rhythm as the real pages, so nothing jumps when the
 * page arrives.
 *
 * WHY /board HAS LOADING SCREENS when most pages do not: its class and chapter
 * pages are rendered on every request (ƒ in the build table), measured at
 * 0.4–1.6 s to first byte on 2026-10-02 against 0.16–0.25 s for a cached page.
 * Until the server answered, a tapped link changed nothing on screen, and
 * Clarity recorded those taps as dead clicks.
 */
export default function BoardLoadingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6" aria-busy="true">
        <span role="status" className="sr-only">
          Loading…
        </span>
        <Skeleton className="mb-4 h-3 w-48" />
        <header className="mb-8">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-7 w-3/4" />
          <Skeleton className="mt-3 h-4 w-1/2" />
        </header>
        {children}
      </main>
    </>
  );
}
