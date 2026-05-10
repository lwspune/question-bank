import AppHeader from "@/components/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrowseLoading() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 lg:hidden" />
            <Skeleton className="h-9 w-32" />
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <Skeleton className="h-[32rem] w-full rounded-lg" />
          </aside>

          <ul className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <QuestionCardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

function QuestionCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm sm:p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-7 w-9 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-9 w-11 shrink-0 rounded-md" />
        <Skeleton className="mt-1 h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}
