import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Greeting from "@/app/me/Greeting";
import SuggestExamCard from "@/app/me/SuggestExamCard";
import TabStrip, { type Tab } from "@/components/TabStrip";
import FocusChips from "./FocusChips";
import type { MeHeaderData } from "@/lib/me/header";
import type { ExamLink } from "@/lib/exam/examLinks";

export type MeTab = "home" | "review" | "performance" | "account";

/** The student's three pages, shared with their loading screens (MeLoading). */
export const ME_TABS: readonly Tab<MeTab>[] = [
  { key: "home", label: "Home", href: "/me" },
  // Everything to come back to: the drill's mistakes and the saved list (2026-11-08).
  { key: "review", label: "Review", href: "/review" },
  { key: "performance", label: "Performance", href: "/performance" },
  { key: "account", label: "Account", href: "/account" },
];

/**
 * The header above a student's Home · Performance · Account (2026-11-08):
 * the greeting, their exams and the tab strip, the same on all three pages.
 *
 * A student with two or more exams gets the exams as the FOCUS switch
 * (lib/me/focus): Home and Performance follow it. A one-exam student keeps the
 * chip they had, a link to their exam. With no exam: the exam their practice
 * points to, or a line asking them to choose.
 *
 * `readOnly` is the staff view of a student's /me: no control that saves, and
 * no student tab strip (the staff page has its own tabs). `active` absent: no
 * tab strip.
 */
export default function MeHeader({
  data,
  active,
  readOnly,
}: {
  data: MeHeaderData;
  active?: MeTab;
  readOnly: boolean;
}) {
  const { focus } = data;
  const labelOf = new Map(data.examLinks.map((l) => [l.slug, l.label]));

  return (
    <header className="space-y-4">
      <div className="space-y-2">
        {readOnly ? (
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {data.name ? `${data.greeting}, ${data.name}` : data.greeting}
          </h1>
        ) : (
          <Greeting greeting={data.greeting} name={data.name} />
        )}

        {focus.switchable ? (
          <section aria-label="Exam in focus" className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focus</span>
            <FocusChips
              options={focus.options.map((slug) => ({ slug, label: labelOf.get(slug) ?? slug }))}
              selected={focus.selected}
              readOnly={readOnly}
            />
            {!readOnly && <ChangeLink />}
          </section>
        ) : data.examLinks.length > 0 ? (
          <YourExams links={data.examLinks} readOnly={readOnly} />
        ) : data.suggestedExam ? (
          readOnly ? (
            <p className="text-sm text-muted-foreground">
              Here they see a card suggesting {data.suggestedExam.displayName} as their exam.
            </p>
          ) : (
            <SuggestExamCard slug={data.suggestedExam.slug} examName={data.suggestedExam.displayName} />
          )
        ) : (
          <NoTargetCard readOnly={readOnly} />
        )}
      </div>

      {active && !readOnly && <TabStrip label="Your pages" tabs={ME_TABS} active={active} />}
    </header>
  );
}

function ChangeLink() {
  return (
    <Link
      href="/account"
      prefetch={false}
      className="text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Change
    </Link>
  );
}

/** A one-exam student's exam, to its best page, as before the focus. */
function YourExams({ links, readOnly }: { links: ExamLink[]; readOnly: boolean }) {
  return (
    <section aria-label="Your exams" className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your exams</span>
      {links.map((l) => (
        <Link
          key={l.slug}
          href={l.href}
          prefetch={false}
          className="inline-flex h-8 items-center rounded-full border px-3 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {l.label}
        </Link>
      ))}
      {!readOnly && <ChangeLink />}
    </section>
  );
}

/** Shown instead of the exam row when the student has no target exam: one
 *  quiet line, not a card with a full-width button. */
function NoTargetCard({ readOnly }: { readOnly: boolean }) {
  return (
    <p className="text-sm text-muted-foreground">
      <GraduationCap className="mr-1.5 inline h-4 w-4 align-[-3px] text-brand-accent" aria-hidden />
      Tell us your exam and this page shows only what you need.{" "}
      {readOnly ? (
        <span className="font-medium">Choose your exam</span>
      ) : (
        <Link
          href="/account"
          prefetch={false}
          className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Choose your exam
        </Link>
      )}
    </p>
  );
}
