import { Skeleton } from "@/components/ui/skeleton";

/**
 * A plain loading screen for the pages under /me that are not one of its three
 * tabs (the chapter map, answer sheets). Without one, /me's own loading screen
 * (Home with its tabs) would show while they load.
 */
export default function PlainLoading() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8" aria-busy="true">
      <span className="sr-only">Loading</span>
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </main>
  );
}
