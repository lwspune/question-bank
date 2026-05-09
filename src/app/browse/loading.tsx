import AppHeader from "@/components/AppHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrowseLoading() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </header>

        <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <Skeleton className="h-[28rem] w-full rounded-lg" />
          </aside>

          <ul className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-24 w-full rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
