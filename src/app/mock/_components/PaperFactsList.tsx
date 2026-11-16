/**
 * "The <exam> papers at a glance": one card per printed paper, its questions,
 * marks, time and marking (lib/mocks/pastPapersPage.ts paperFacts). Shared by
 * the past-papers page and the exam's syllabus page (/exams/<exam>/syllabus),
 * so the two can never state a different pattern.
 */
import Link from "next/link";
import type { PaperFact } from "@/lib/mocks/pastPapersPage";

export default function PaperFactsList({ facts }: { facts: readonly PaperFact[] }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {facts.map((f) => (
        <li key={f.label} className="rounded-lg border bg-card p-4">
          <p className="font-semibold">{f.label}</p>
          <p className="mt-1 text-sm">
            {f.questions} questions · {f.marks} marks · {f.minutes} min
          </p>
          {f.sections && <p className="mt-1 text-sm text-muted-foreground">{f.sections}</p>}
          <p className="mt-2 text-sm text-muted-foreground">
            {f.marking.kind === "one" ? (
              <>Marking: {f.marking.line}.</>
            ) : (
              <>
                Each section is marked differently:{" "}
                <Link
                  href={`/mock/${f.newestSlug}`}
                  className="rounded-sm font-medium text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  see the newest paper&apos;s marking
                </Link>
                .
              </>
            )}
            {f.note && <> {f.note}</>}
          </p>
          {f.earlierText && <p className="mt-1 text-sm text-muted-foreground">{f.earlierText}</p>}
        </li>
      ))}
    </ul>
  );
}
