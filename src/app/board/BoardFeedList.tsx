"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { ExamSlug } from "@/lib/exam/examContext";
import { splitBoardIndex, type BoardIndexCard, type BoardIndexGroup } from "@/lib/board/examIndex";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import FeedSections from "@/components/exam/FeedSections";

/**
 * The /board index list. A signed-in student who chose a board class sees their
 * board first with that class marked "Your class", and the other board folded
 * under "Other boards (N)". Everyone else sees the plain list.
 *
 * The page is cached and reads no identity, so the first render is always the
 * plain list (hydration matches the server HTML) and the personal view appears
 * once the session arrives. See splitBoardIndex for why this is not the tier
 * feed that /mock, /notes and /guide use.
 */
export default function BoardFeedList({ groups }: { groups: BoardIndexGroup[] }) {
  const { session } = useViewerSession();
  const split = session ? splitBoardIndex(groups, session.targetExams) : null;

  if (!split) return <GroupList groups={groups} yours={NONE} />;

  const yours = new Set(split.yourClasses);
  return (
    <FeedSections
      eyebrow="Your board"
      primary={<GroupList groups={split.mine} yours={yours} className="!mt-3" />}
      otherLabel={`Other boards (${split.other.length})`}
      other={split.other.length > 0 ? <GroupList groups={split.other} yours={NONE} className="!mt-4" /> : null}
    />
  );
}

const NONE: ReadonlySet<ExamSlug> = new Set();

function GroupList({
  groups,
  yours,
  className,
}: {
  groups: BoardIndexGroup[];
  yours: ReadonlySet<ExamSlug>;
  className?: string;
}) {
  return (
    <div className={["space-y-8", className].filter(Boolean).join(" ")}>
      {groups.map((group) => {
        if (group.kind === "family") {
          const headingId = `board-${group.key.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section key={group.key} aria-labelledby={headingId}>
              <h2
                id={headingId}
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {group.label}
              </h2>
              <ul className="grid gap-3">
                {group.classes.map((cls) => (
                  <li key={cls.slug}>
                    <BoardLink card={cls} yours={yours.has(cls.slug)} />
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        // A board exam that could not be grouped: listed standalone rather
        // than dropped; see boardIndexNodes.
        return (
          <ul key={group.key} className="grid gap-3">
            <li>
              <BoardLink card={group.card} yours={yours.has(group.card.slug)} />
            </li>
          </ul>
        );
      })}
    </div>
  );
}

/**
 * One destination row. `ariaLabel` re-attaches the board, because a row reading
 * "Class 9" does not say whose Class 9 once the board has moved up into the
 * heading. It replaces the link's visible text for screen readers, so the
 * "Your class" badge has to be added to it too.
 */
function BoardLink({ card, yours }: { card: BoardIndexCard; yours: boolean }) {
  const ariaLabel = card.ariaLabel && yours ? `${card.ariaLabel}, your class` : card.ariaLabel;
  return (
    <Link
      href={`/board/${card.slug}`}
      aria-label={ariaLabel}
      className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-4 transition-colors hover:border-brand-accent/40 hover:bg-brand-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-accent/10 text-brand-accent">
        <GraduationCap className="h-5 w-5" aria-hidden />
      </span>
      <span className="font-medium text-foreground">{card.label}</span>
      {yours && (
        <span className="ml-auto shrink-0 rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-brand-foreground">
          Your class
        </span>
      )}
    </Link>
  );
}
