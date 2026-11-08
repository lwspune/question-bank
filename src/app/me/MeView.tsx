import Link from "next/link";
import { CalendarClock, Check, EyeOff } from "lucide-react";
import FeedbackCards from "./FeedbackCards";
import TodayCard from "./TodayCard";
import PathCard from "./PathCard";
import WeakSpots from "./WeakSpots";
import ContinueCard from "./ContinueCard";
import HomeReminder from "./HomeReminder";
import StageNudge from "./StageNudge";
import ResultCheckCard from "./ResultCheckCard";
import TutorPriceCard from "./TutorPriceCard";
import { rupees } from "@/lib/tutor/price";
import type { MeData } from "@/lib/me/load";
import type { Pulse } from "@/lib/pulse/cache";
import type { StudentAssignmentView } from "@/lib/assignments/core";
import { checkQuestion } from "@/lib/results/check";
import { mockCatalogueHref } from "@/lib/exam/examLinks";
import { STAGE_LABELS } from "@/lib/profile/onboarding";
import { homeReminderAsk } from "@/lib/profile/push";
import { cn } from "@/lib/utils";
import MeHeader, { type MeTab } from "@/components/me/MeHeader";

/**
 * The body of /me, shared by the student's own /me and the staff view of a
 * student's /me (/dashboard/students/[id]/me, 2026-11-07), so the two cannot
 * drift apart.
 *
 * `viewAs` is the staff view. It changes three things and nothing else:
 *  - the pulse cards get the STUDENT's pulse, built on the server (left to
 *    fetch, they would show the viewer's own numbers);
 *  - every control that saves (goal, name, exam pick, reminder, result answer,
 *    feedback) becomes a grey note saying what the student sees there, so a
 *    click can never save as the student;
 *  - Home links none of the student's own records since 2026-11-08 (Recent
 *    mocks moved to the Progress tab), so no link needs a staff twin.
 */
export type ViewAs = { studentId: string; pulse: Pulse };

export default function MeView({
  data,
  vapidKey,
  viewAs,
  tab = "home",
  initialPulse,
}: {
  data: MeData;
  vapidKey: string;
  viewAs?: ViewAs;
  /** The open tab in the header's strip; the staff view shows none. */
  tab?: MeTab;
  /** The student's own Home: the pulse built with the page (2026-11-08), so
   *  the cards' numbers are in its HTML. Null when that read failed: the
   *  cards then fetch it, as before. */
  initialPulse?: Pulse | null;
}) {
  const staff = !!viewAs;
  const now = new Date();
  const { continueItems } = data;

  return (
    <>
      {/* Greeting, exams (the focus switch for a two-exam student) and the
          Home · Performance · Account tabs: shared with the other two pages. */}
      <MeHeader data={data} active={staff ? undefined : tab} readOnly={staff} />

      {data.resultCheck &&
        (staff ? (
          <HiddenNote>Here they see the question &ldquo;{checkQuestion(data.resultCheck)}&rdquo;</HiddenNote>
        ) : (
          <ResultCheckCard
            announcementId={data.resultCheck.id}
            question={checkQuestion(data.resultCheck)}
            sitting={data.resultCheck.sitting}
            suggestedName={data.suggestedName}
            practiseHref={mockCatalogueHref(data.resultCheck.examSlug)}
          />
        ))}

      {/* The 1:1 tutoring price question, for a student Yes that owes an
          answer (2026-11-07). Answered here; "Not now" puts it away a week. */}
      {data.tutorPriceAsk &&
        (staff ? (
          <HiddenNote>
            Here they see the 1:1 tutoring price question ({rupees(data.tutorPriceAsk.price)}) for a 1-hour session.
          </HiddenNote>
        ) : (
          <TutorPriceCard price={data.tutorPriceAsk.price} />
        ))}

      {data.showStageNudge &&
        data.stage &&
        (staff ? (
          <HiddenNote>
            Here they see &ldquo;Still in {STAGE_LABELS[data.stage]}? Update your stage&rdquo;, unless they closed it
            on their device.
          </HiddenNote>
        ) : (
          <StageNudge stageLabel={STAGE_LABELS[data.stage]} year={now.getFullYear()} />
        ))}

      {/* ONE brand card with ONE lead action (2026-10-05). It replaced the
          continue card, the welcome card and the week strip, which put three
          full-width blue buttons on a phone before any progress. */}
      {/* The board path (MENTOR_SPEC.md, 2026-11-07): for a path student its
          Today card takes the week ring's place (D4: one pace on the page);
          a Class 12 student without one sees the start card above it. */}
      {data.pathCard.path ? (
        <PathCard initial={data.pathCard} readOnly={staff} />
      ) : (
        <>
          {data.pathCard.offer &&
            (staff ? (
              <HiddenNote>
                Here they see the board plan offer: about {data.pathCard.offer.minutes} minutes a day, with a button to
                start it.
              </HiddenNote>
            ) : (
              <PathCard initial={data.pathCard} />
            ))}
          <TodayCard
            resume={data.resume}
            cont={data.cont}
            mockHref={data.mockHref}
            pulse={viewAs?.pulse}
            initialPulse={initialPulse}
            readOnly={staff}
          />
        </>
      )}

      {/* The reminder ask, one row, only while mistakes are waiting and
          only until it is answered on any screen (2026-10-05). */}
      {viewAs ? (
        homeReminderAsk({ pushPromptedAt: data.pushPromptedAt }, viewAs.pulse.due) && (
          <HiddenNote>Here they see the ask to turn on reminders when mistakes are due.</HiddenNote>
        )
      ) : (
        <HomeReminder vapidKey={vapidKey} pushPromptedAt={data.pushPromptedAt} initialPulse={initialPulse} />
      )}

      {/* Papers a teacher has assigned to this student's batch, with the
          deadline (ENGAGEMENT_SPEC.md C1). Rendered only when there is one,
          so the page gains nothing for the 90% of students with no batch. */}
      {data.assigned.length > 0 && <DueList items={data.assigned} />}

      {/* The chapters holding most waiting mistakes, each with its own Fix
          (2026-11-06): 448 of 745 /me visitors had misses waiting. */}
      <WeakSpots pulse={viewAs?.pulse} initialPulse={initialPulse} />

      {/* Home keeps things to DO (2026-11-08): the number tiles and Recent
          mocks moved to the Progress tab (OutcomeTiles, Papers you sat). */}
      {continueItems.length > 0 ? (
        <ContinueCard items={continueItems} notesHref={data.notesHref} />
      ) : (
        <AlsoHere mockHref={data.mockHref} notesHref={data.notesHref} />
      )}

      {staff ? (
        <HiddenNote>
          Here they see the feedback cards{data.showNps ? ", including the 0 to 10 rating question" : ""}.
        </HiddenNote>
      ) : (
        <FeedbackCards showNps={data.showNps} />
      )}
    </>
  );
}

/* ------------------------------------------------------------ staff note */

/** In the staff view, in place of a card that saves when used: what the
 *  student sees there, so the page still shows the student's whole /me. */
function HiddenNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
      <EyeOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------ due list */

/** Deadline pull: paper, batch, due label, one Start button. Sat papers show a
 *  tick and no button. At most three rows; the rest are on the mock pages. */
function DueList({ items }: { items: StudentAssignmentView[] }) {
  const shown = items.slice(0, 3);
  return (
    <section aria-labelledby="due-heading" className="rounded-xl border bg-card p-6">
      <h2 id="due-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <CalendarClock className="h-4 w-4 text-brand-accent" aria-hidden />
        Set by your teacher
      </h2>
      <ul className="mt-3 divide-y">
        {shown.map((a) => (
          <li key={a.id} className="flex items-center gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{a.mockTitle}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                <span
                  className={cn(
                    "font-medium",
                    a.done
                      ? "text-emerald-600 dark:text-emerald-400"
                      : a.state === "overdue"
                        ? "text-red-600 dark:text-red-400"
                        : a.state === "due-soon"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-foreground"
                  )}
                >
                  {a.done ? "Done" : a.label}
                </span>
                {" · "}
                {a.batchName}
                {a.note && <> {" · "} {a.note}</>}
              </p>
            </div>
            {a.done ? (
              <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Sat" />
            ) : (
              <Link
                href={`/mock/${a.mockSlug}`}
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start
              </Link>
            )}
          </li>
        ))}
      </ul>
      {items.length > shown.length && (
        <p className="mt-2 text-xs text-muted-foreground">
          {items.length - shown.length} more on your mock pages.
        </p>
      )}
    </section>
  );
}

/** In place of Continue when there is nothing to continue: one quiet line. */
function AlsoHere({ mockHref, notesHref }: { mockHref: string; notesHref: string }) {
  const link =
    "font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <p className="text-sm text-muted-foreground">
      Also here:{" "}
      <Link href={mockHref} prefetch={false} className={link}>
        timed mocks
      </Link>
      {" · "}
      <Link href={notesHref} prefetch={false} className={link}>
        notes
      </Link>
    </p>
  );
}
