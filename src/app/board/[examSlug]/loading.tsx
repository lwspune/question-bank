import { Skeleton } from "@/components/ui/skeleton";
import BoardLoadingShell from "../BoardLoadingShell";

/** Shown the moment a class is tapped: subject headings with chapter rows. */
export default function BoardExamLoading() {
  return (
    <BoardLoadingShell>
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, s) => (
          <section key={s}>
            <Skeleton className="mb-3 h-5 w-40" />
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-12 w-full rounded-lg" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </BoardLoadingShell>
  );
}
