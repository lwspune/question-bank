import { Skeleton } from "@/components/ui/skeleton";
import BoardLoadingShell from "../../../BoardLoadingShell";

/** Shown the moment a chapter is tapped: a section heading and question cards. */
export default function BoardChapterLoading() {
  return (
    <BoardLoadingShell>
      <Skeleton className="mb-4 h-6 w-56" />
      <ul className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="rounded-lg border bg-card p-3 sm:p-4">
            <div className="flex items-start gap-2.5">
              <Skeleton className="h-5 w-10 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </BoardLoadingShell>
  );
}
