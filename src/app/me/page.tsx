import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  History,
  LayoutDashboard,
  Play,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserAttempts } from "@/lib/mocks/query";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import { listOwnNotesProgress } from "@/lib/notes/progressService";
import { summarizeNotesProgress, prettifyNotesSlug } from "@/lib/notes/progress";
import { listBookmarkIds } from "@/lib/bookmarks/service";
import AttemptsList from "../mock/_components/AttemptsList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your dashboard",
  robots: { index: false },
};

export default async function MePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me");

  const db = createSupabaseServerClient();
  const [attempts, notesRows, bookmarkIds] = await Promise.all([
    getUserAttempts(db, user.id),
    listOwnNotesProgress(db, user.id),
    listBookmarkIds(db, user.id),
  ]);

  const mocks = summarizeUserMocks(attempts);
  const notes = summarizeNotesProgress(notesRows);
  const savedCount = bookmarkIds.length;

  // Continue-where-you-left-off: an open mock beats a recently-read chapter.
  const resume = mocks.resumeAttempt;
  const cont = notes.recent[0];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <header className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
            <LayoutDashboard className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your dashboard</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </header>

        {/* Continue hero */}
        {resume ? (
          <ContinueHero
            eyebrow="Resume your mock test"
            title={resume.mockTitle}
            subtitle="You have an attempt in progress — pick up where the timer left off."
            href={`/mock/${resume.mockSlug}/attempt/${resume.attemptId}`}
            cta="Resume"
          />
        ) : cont ? (
          <ContinueHero
            eyebrow="Continue where you left off"
            title={prettifyNotesSlug(cont.subtopicSlug)}
            subtitle={prettifyNotesSlug(cont.chapterSlug)}
            href={`/notes/${cont.subjectRoute}/${cont.chapterSlug}/${cont.subtopicSlug}`}
            cta="Continue"
          />
        ) : (
          <WelcomeHero />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            <MockCard mocks={mocks} attempts={attempts} />
          </section>
          <div className="space-y-6">
            <NotesCard
              recent={notes.recent}
              bookmarkedCount={notes.bookmarkedCount}
              masteredCount={notes.masteredCount}
            />
            <SavedCard count={savedCount} />
          </div>
        </div>
      </main>
    </>
  );
}

/* ---------------------------------------------------------------- heroes */

function ContinueHero({
  eyebrow,
  title,
  subtitle,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
          <Play className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            {eyebrow}
          </p>
          <p className="truncate text-lg font-semibold">{title}</p>
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Link
        href={href}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}

function WelcomeHero() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-accent">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold">Start learning</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Take a timed mock test, read a chapter of notes, or save questions to
            revisit. Everything you do shows up here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/mock"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
            >
              <Timer className="h-4 w-4" aria-hidden />
              Take a mock
            </Link>
            <Link
              href="/notes"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Read notes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ cards */

function CardShell({
  icon,
  title,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="text-brand-accent">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline"
    >
      {children}
      <ArrowRight className="h-3 w-3" aria-hidden />
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-background p-3 text-center">
      <div className="text-xl font-bold tabular-nums text-brand-accent">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function MockCard({
  mocks,
  attempts,
}: {
  mocks: ReturnType<typeof summarizeUserMocks>;
  attempts: Awaited<ReturnType<typeof getUserAttempts>>;
}) {
  const recent = attempts.slice(0, 4);
  return (
    <CardShell
      icon={<Timer className="h-4 w-4" aria-hidden />}
      title="Mock tests"
      action={<CardLink href="/mock">Browse mocks</CardLink>}
    >
      {attempts.length === 0 ? (
        <EmptyState
          text="You haven't taken a mock test yet."
          href="/mock"
          cta="Take your first mock"
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat value={String(mocks.completed)} label="Completed" />
            <Stat value={mocks.bestPct == null ? "—" : `${mocks.bestPct}%`} label="Best" />
            <Stat value={mocks.avgPct == null ? "—" : `${mocks.avgPct}%`} label="Average" />
          </div>
          <AttemptsList attempts={recent} />
          {attempts.length > recent.length && (
            <div className="text-right">
              <CardLink href="/mock/attempts">
                View all {attempts.length} attempts
              </CardLink>
            </div>
          )}
        </div>
      )}
    </CardShell>
  );
}

function NotesCard({
  recent,
  bookmarkedCount,
  masteredCount,
}: {
  recent: ReturnType<typeof summarizeNotesProgress>["recent"];
  bookmarkedCount: number;
  masteredCount: number;
}) {
  const hasActivity = recent.length > 0 || bookmarkedCount > 0 || masteredCount > 0;
  return (
    <CardShell
      icon={<BookOpen className="h-4 w-4" aria-hidden />}
      title="Notes progress"
      action={<CardLink href="/notes">Go to notes</CardLink>}
    >
      {!hasActivity ? (
        <EmptyState
          text="No notes activity yet."
          href="/notes"
          cta="Explore notes"
        />
      ) : (
        <div className="space-y-3">
          {recent.length > 0 && (
            <ul className="space-y-1">
              {recent.slice(0, 4).map((r) => (
                <li key={r.subtopicSlug}>
                  <Link
                    href={`/notes/${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}`}
                    className="flex items-center gap-1.5 truncate rounded px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                    title={prettifyNotesSlug(r.subtopicSlug)}
                  >
                    <History className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="truncate">{prettifyNotesSlug(r.subtopicSlug)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5" aria-hidden />
              {bookmarkedCount} bookmarked
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" aria-hidden />
              {masteredCount} mastered
            </span>
          </div>
        </div>
      )}
    </CardShell>
  );
}

function SavedCard({ count }: { count: number }) {
  return (
    <CardShell
      icon={<Bookmark className="h-4 w-4" aria-hidden />}
      title="Saved questions"
      action={count > 0 ? <CardLink href="/saved">View saved</CardLink> : undefined}
    >
      {count === 0 ? (
        <EmptyState
          text="You haven't saved any questions yet."
          href="/browse"
          cta="Browse questions"
        />
      ) : (
        <Link href="/saved" className="block">
          <div className="text-3xl font-bold tabular-nums text-brand-accent">{count}</div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            question{count === 1 ? "" : "s"} saved for later
          </p>
        </Link>
      )}
    </CardShell>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="text-sm">
      <p className="text-muted-foreground">{text}</p>
      <Link
        href={href}
        className="mt-2 inline-flex items-center gap-1 font-medium text-brand-accent hover:underline"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
