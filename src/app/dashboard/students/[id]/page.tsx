import type { ReactNode } from "react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Mail,
  LogIn,
  CalendarDays,
  Gem,
  Phone,
  Target,
  GraduationCap,
  Languages,
  FlaskConical,
  MapPin,
  Flag,
  ShieldCheck,
  MessageCircle,
  Clock,
  Activity,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import StudentTabs from "./StudentTabs";
import AttemptsList from "@/app/mock/_components/AttemptsList";
import { cn } from "@/lib/utils";
import { getSessionSuperadmin } from "@/lib/auth";
import { getStudentDetail } from "@/lib/students/detail";
import { formatMobile } from "@/lib/students/roster";
import WhatsappLink from "@/components/contact/WhatsappLink";
import {
  stageLabel,
  mediumLabel,
  streamLabel,
  examLabels,
  activityLabel,
  relativeTime,
  DASH,
} from "@/lib/students/profileView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string };

function fmtDate(iso: string | null): string {
  if (!iso) return DASH;
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function StudentDetailPage({ params }: { params: Params }) {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const detail = await getStudentDetail(params.id);
  if (!detail) notFound();
  const { profile, premium, capture, engagement, attempts, summary, activity, activityTotal } = detail;
  const now = new Date();
  const exams = examLabels(capture.targetExams);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <StudentTabs id={params.id} name={profile.name} active="profile" />

        {/* Account — who they are + how they got here */}
        <Section title="Account">
          <dl className="grid gap-3 sm:grid-cols-2">
            <Field icon={Mail} label="Email" value={profile.email} />
            <Field icon={LogIn} label="Sign-in" value={profile.provider} />
            <Field icon={CalendarDays} label="Registered" value={fmtDate(profile.createdAt)} />
            <Field icon={Clock} label="Last sign-in" value={relativeTime(profile.lastSignInAt, now)} />
            <Field
              icon={Gem}
              label="Premium"
              value={premium.active ? `Active${premium.source ? ` · ${premium.source}` : ""}` : "None"}
              highlight={premium.active}
            />
          </dl>
        </Section>

        {/* Profile — what the student told us. Every field shows, dash when unanswered:
            a blank slot is the signal that we never asked or they never answered. */}
        <Section
          title="Profile"
          note={
            capture.hasProfile
              ? undefined
              : "No profile row — this student has never completed onboarding."
          }
        >
          <dl className="grid gap-3 sm:grid-cols-2">
            <Field
              icon={Phone}
              label="Mobile"
              title={formatMobile(capture.mobile)}
              value={
                <WhatsappLink mobile={capture.mobile} icon={false}>
                  {formatMobile(capture.mobile)}
                </WhatsappLink>
              }
            />
            <div className="flex items-start gap-2">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">Target exams</dt>
                <dd className="mt-0.5 flex flex-wrap gap-1">
                  {exams.length === 0 ? (
                    <span className="text-sm font-medium">{DASH}</span>
                  ) : (
                    exams.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border px-2 py-0.5 text-xs font-medium text-brand-accent"
                      >
                        {label}
                      </span>
                    ))
                  )}
                </dd>
              </div>
            </div>
            <Field icon={GraduationCap} label="Stage" value={stageLabel(capture.stage)} />
            <Field icon={Languages} label="Medium" value={mediumLabel(capture.medium)} />
            <Field icon={FlaskConical} label="Stream" value={streamLabel(capture.stream)} />
            <Field icon={MapPin} label="City" value={capture.city ?? DASH} />
            <Field icon={Flag} label="Goal" value={capture.goal ?? DASH} />
          </dl>
        </Section>

        {/* Contactability — can we reach them, and on which channel */}
        <Section title="Contactability">
          <dl className="grid gap-3 sm:grid-cols-2">
            <Field
              icon={ShieldCheck}
              label="Contact consent (DPDP)"
              value={capture.consent ? "Given" : "Not given"}
            />
            <Field
              icon={MessageCircle}
              label="WhatsApp"
              value={
                capture.whatsappOptIn
                  ? "Opted in"
                  : capture.whatsappPromptedAt
                    ? "Declined"
                    : "Not asked yet"
              }
            />
            <Field
              icon={Mail}
              label="Email updates"
              value={capture.emailOptOut ? "Unsubscribed" : "Subscribed"}
            />
            <Field icon={CalendarDays} label="Onboarded" value={fmtDate(capture.onboardedAt)} />
          </dl>
        </Section>

        {/* Engagement — the same aggregate the roster list renders, so the two can't disagree */}
        <section>
          <h2 className="mb-3 text-sm font-semibold">Engagement</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard kind="numeric" value={engagement.qsAnswered} label="Questions answered" />
            <StatCard kind="numeric" value={engagement.notesSubtopics} label="Notes subtopics" />
            <StatCard kind="numeric" value={engagement.notesMastered} label="Mastered" />
            <StatCard kind="numeric" value={engagement.bookmarks} label="Saved questions" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {engagement.notesCheckpoints} checkpoint{engagement.notesCheckpoints === 1 ? "" : "s"} across{" "}
            {engagement.notesSubjects} subject{engagement.notesSubjects === 1 ? "" : "s"} · last active{" "}
            <span className="font-medium text-foreground">{relativeTime(engagement.lastActive, now)}</span>
          </p>
        </section>

        {/* Mock performance — the 3-stat summary stays here; the diagnosis
            (chapters, audits, pacing, projection) lives on the Performance tab,
            which is a separate route because it loads a far heavier aggregate
            and wants a wider shell than this profile's field list. */}
        <section>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold">Mock performance</h2>
            <Link
              prefetch={false}
              href={`/dashboard/students/${params.id}/performance`}
              className="rounded text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Full performance →
            </Link>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-3">
            <StatCard kind="numeric" value={summary.taken} label="Mocks taken" />
            <StatCard kind="text" value={summary.bestPct != null ? `${summary.bestPct}%` : DASH} label="Best" />
            <StatCard kind="text" value={summary.avgPct != null ? `${summary.avgPct}%` : DASH} label="Average" />
          </div>
          {attempts.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              This student hasn&apos;t attempted any mock yet.
            </p>
          ) : (
            <AttemptsList
              attempts={attempts}
              // Own-row: the student result page 404s for anyone but the owner,
              // so every row here was a dead link until this route existed.
              reviewBase={`/dashboard/students/${params.id}/attempt`}
            />
          )}
        </section>

        {/* Recent activity — the newest slice of user_activity, not the whole log */}
        <section>
          <h2 className="mb-3 text-sm font-semibold">
            Recent activity
            {activityTotal > activity.length && (
              <span className="ml-2 font-normal text-muted-foreground">
                showing {activity.length} of {activityTotal.toLocaleString("en-IN")}
              </span>
            )}
          </h2>
          {activity.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              No recorded activity yet.
            </p>
          ) : (
            <ul className="divide-y rounded-lg border bg-card">
              {activity.map((e) => (
                <li key={e.id} className="flex items-center gap-3 px-4 py-2.5">
                  <Activity className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-sm">{activityLabel(e.kind)}</span>
                  <time
                    dateTime={e.createdAt}
                    className="shrink-0 text-xs tabular-nums text-muted-foreground"
                  >
                    {relativeTime(e.createdAt, now)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      <div className="rounded-lg border bg-card p-5">
        {note && <p className="mb-3 text-xs text-muted-foreground">{note}</p>}
        {children}
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  title,
  highlight,
}: {
  icon: typeof Mail;
  label: string;
  /** A node, so a field can render a link (the mobile) rather than bare text. */
  value: ReactNode;
  /** Hover text when `value` isn't a plain string to fall back on. */
  title?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", highlight ? "text-brand-accent" : "text-muted-foreground")} aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd
          className={cn("truncate text-sm font-medium", highlight && "text-brand-accent")}
          title={title ?? (typeof value === "string" ? value : undefined)}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
