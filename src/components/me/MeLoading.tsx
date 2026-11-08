import { Skeleton } from "@/components/ui/skeleton";
import TabStrip from "@/components/TabStrip";
import { ME_TABS, type MeTab } from "./MeHeader";

/**
 * The loading screen of Home · Performance · Account (2026-11-08): what shows
 * the moment a tab is tapped, while the page is built on the server.
 *
 * Before it, none of the three pages had one, so a tap left the old page on
 * screen until the new one was done (0.4-0.8 s warm in production, 3.3 s on a
 * cold start), which reads as a tap that did nothing. Here the tapped tab is
 * already selected and the header keeps its place; only the body is grey.
 *
 * Same widths and spacing as each page, so nothing jumps when it arrives.
 */
const MAIN: Record<MeTab, string> = {
  home: "mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8",
  review: "mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8",
  performance: "mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-8",
  account: "mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8",
};

export default function MeLoading({ active }: { active: MeTab }) {
  return (
    <main className={MAIN[active]} aria-busy="true">
      {/* Same children, in the same order, as the real header (MeHeader), so
          the space-y rules put everything where the page will: an extra first
          child would push the header down and it would jump on arrival. */}
      <header className="space-y-4">
        <div className="space-y-2">
          {/* The greeting, and its "Not you? Change the name" line. */}
          <div>
            <Skeleton className="h-8 w-64 max-w-full sm:h-9">
              <span className="sr-only">Loading</span>
            </Skeleton>
            <Skeleton className="mt-1 h-4 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-8 w-14 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
        <TabStrip label="Your pages" tabs={ME_TABS} active={active} />
      </header>

      {active === "home" && (
        <>
          <Skeleton className="h-56 w-full rounded-2xl" />
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Skeleton className="h-[76px] rounded-xl sm:h-[92px]" />
            <Skeleton className="h-[76px] rounded-xl sm:h-[92px]" />
            <Skeleton className="h-[76px] rounded-xl sm:h-[92px]" />
          </div>
          <Skeleton className="h-40 w-full rounded-2xl" />
        </>
      )}

      {active === "review" && (
        <>
          <Skeleton className="h-10 w-48 rounded-full" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </>
      )}

      {active === "performance" && (
        <>
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </>
      )}

      {active === "account" && (
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-72 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      )}
    </main>
  );
}
