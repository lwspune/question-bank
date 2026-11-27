import Link from "next/link";
import { SCHOOL_CLASSES, classHref } from "@/lib/schoolExams/select";

/** Class 1 to Class 10 as links: each is its own cached page, so a parent can share it. */
export default function ClassPicker({ current }: { current?: number }) {
  return (
    <nav aria-label="Pick the class your child is in now">
      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {SCHOOL_CLASSES.map((n) => {
          const active = n === current;
          return (
            <li key={n}>
              <Link
                href={classHref(n)}
                aria-current={active ? "page" : undefined}
                aria-label={`Class ${n}`}
                className={
                  "flex h-12 flex-col items-center justify-center rounded-lg border text-sm font-medium transition-colors " +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                  (active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "bg-card hover:border-brand-accent hover:text-brand-accent")
                }
              >
                <span className="text-[10px] font-normal uppercase tracking-wide opacity-80">Class</span>
                <span className="text-base leading-none">{n}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
