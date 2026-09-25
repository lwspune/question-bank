import Link from "next/link";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { boardIndexNodes } from "@/lib/board/examIndex";
import ExamFeedList from "@/components/exam/ExamFeedList";

export const metadata: Metadata = {
  title: "Board textbook solutions",
  description:
    "Read school-board textbooks chapter by chapter — solved examples, exercises, and miscellaneous questions with model answers, in book order. Free.",
  alternates: { canonical: "/board" },
};

/**
 * One destination row. Shared by the family and flat branches so the two cannot
 * drift — this codebase has twice shipped a fix to one renderer and not its
 * twin. `label` is the class within a family ("Class 10 (SSC)") and the exam's
 * own name when it stands alone; `ariaLabel` re-attaches the board, because a
 * row reading "Class 9" does not say whose Class 9 once the board has moved up
 * into the heading.
 */
function BoardLink({ href, label, ariaLabel }: { href: string; label: string; ariaLabel?: string }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-4 transition-colors hover:border-brand-accent/40 hover:bg-brand-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-accent/10 text-brand-accent">
        <GraduationCap className="h-5 w-5" aria-hidden />
      </span>
      <span className="font-medium text-foreground">{label}</span>
    </Link>
  );
}

export default function BoardIndex() {
  // Grouped by board, classes ascending. Derived from the registry's board/std
  // fields — NOT from the exam name, which does not sort into families
  // ("Maharashtra HSC Class 12" files under …H, away from its …State Board
  // siblings). See lib/exam/examFamily for the three rules.
  const nodes = boardIndexNodes();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Textbook Solutions</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your board textbook, chapter by chapter — every solved example, exercise, and miscellaneous question with
            a model answer, laid out the way the book teaches it.
          </p>
        </header>

        <ExamFeedList
          as="div"
          className="space-y-8"
          items={nodes.map((node) => {
            if (node.kind === "family") {
              const headingId = `board-${node.key.toLowerCase().replace(/\s+/g, "-")}`;
              return {
                key: node.key,
                // A family is never split: it is "yours" when any class is.
                slugs: node.members.map((cls) => cls.item.slug),
                node: (
                  <section aria-labelledby={headingId}>
                    <h2
                      id={headingId}
                      className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {node.label}
                    </h2>
                    <ul className="grid gap-3">
                      {node.members.map((cls) => (
                        <li key={cls.item.slug}>
                          <BoardLink
                            href={`/board/${cls.item.slug}`}
                            label={cls.label}
                            ariaLabel={`${node.label} ${cls.label}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                ),
              };
            }
            // A board exam that could not be grouped — registered without a
            // board/class, or the last of its family. Listed standalone rather
            // than dropped; see boardIndexNodes.
            return {
              key: node.item.slug,
              slugs: [node.item.slug],
              node: (
                <ul className="grid gap-3">
                  <li>
                    <BoardLink href={`/board/${node.item.slug}`} label={node.item.displayName} />
                  </li>
                </ul>
              ),
            };
          })}
        />
      </main>
      <Footer />
    </>
  );
}
