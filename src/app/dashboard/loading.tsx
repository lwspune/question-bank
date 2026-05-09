import AppHeader from "@/components/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <header>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-2 h-4 w-32" />
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        <div>
          <Skeleton className="mb-3 h-3 w-24" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </main>
    </>
  );
}
