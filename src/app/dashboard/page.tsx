import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Flag,
  Gem,
  GraduationCap,
  ListChecks,
  MessageSquareHeart,
  Search,
  Timer,
  Upload,
  Users,
} from "lucide-react";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { cn } from "@/lib/utils";
import {
  getDashboardStats,
  type ByExamRow,
  type DashboardStats,
} from "@/lib/dashboard/stats";
import {
  getRecentUploads,
  type RecentUpload,
} from "@/lib/dashboard/activity";
import StatCard from "./StatCard";

export default async function DashboardPage() {
  const [member, user] = await Promise.all([getSessionMember(), getSessionUser()]);

  // Teachers don't see the dashboard — they go straight to /browse where
  // the editor workflow lives (clicking through to /questions/[id]/edit).
  // Admin tooling on this page (upload, reports, members) is admin-only.
  if (member && member.role === "TEACHER") redirect("/browse");

  // Org-less means "not staff" (admins atomically get an org_members row).
  // A signed-in self-serve student gets their own home (/me); anon → /browse.
  if (!member) redirect(user ? "/me" : "/browse");

  const supabase = createSupabaseServerClient();
  const [stats, recentUploads, openReportCount, openConceptReportCount] =
    await Promise.all([
      getDashboardStats(supabase, member.orgId),
      member.role === "ADMIN"
        ? getRecentUploads(supabase, member.orgId)
        : Promise.resolve([] as RecentUpload[]),
      member.role === "ADMIN"
        ? supabase
            .from("question_reports")
            .select("id", { count: "exact", head: true })
            .eq("org_id", member.orgId)
            .eq("status", "open")
            .then(({ count }) => count ?? 0)
        : Promise.resolve(0),
      member.role === "ADMIN"
        ? supabase
            .from("concept_reports")
            .select("id", { count: "exact", head: true })
            .eq("org_id", member.orgId)
            .eq("status", "open")
            .then(({ count }) => count ?? 0)
        : Promise.resolve(0),
    ]);

  const isAdmin = member.role === "ADMIN";
  const isFresh = stats.totalQuestions === 0;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {member.orgName} · {isAdmin ? "Admin" : "Teacher"}
          </p>
        </header>

        <QuickActions
          isAdmin={isAdmin}
          isFresh={isFresh}
          openReportCount={openReportCount}
          openConceptReportCount={openConceptReportCount}
        />

        {!isFresh && (
          <>
            <Section heading="At a glance">
              <StatGrid stats={stats} />
            </Section>

            {stats.byExam.length > 0 && (
              <Section heading="By exam">
                <ByExamBreakdown
                  rows={stats.byExam}
                  total={stats.totalQuestions}
                />
              </Section>
            )}

            {isAdmin && recentUploads.length > 0 && (
              <Section
                heading="Recent uploads"
                action={
                  <Link
                    href="/uploads"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    View all
                    <ArrowRight className="ml-0.5 inline h-3 w-3" aria-hidden />
                  </Link>
                }
              >
                <RecentUploadsList uploads={recentUploads} />
              </Section>
            )}
          </>
        )}
      </main>
    </>
  );
}

function Section({
  heading,
  action,
  children,
}: {
  heading: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight text-foreground/80">
          {heading}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function QuickActions({
  isAdmin,
  isFresh,
  openReportCount,
  openConceptReportCount,
}: {
  isAdmin: boolean;
  isFresh: boolean;
  openReportCount: number;
  openConceptReportCount: number;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        isAdmin ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-1"
      )}
    >
      <ActionCard
        href="/browse"
        icon={<Search className="h-5 w-5" aria-hidden />}
        title="Browse questions"
        description={
          isFresh
            ? "Once questions are uploaded, you'll filter and download them here."
            : "Filter by exam, chapter, difficulty — then download a question paper."
        }
        primary
      />
      {isAdmin && (
        <ActionCard
          href="/upload"
          icon={<Upload className="h-5 w-5" aria-hidden />}
          title={isFresh ? "Add your first questions" : "Upload questions"}
          description="Add a new batch from an Excel file."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/reports"
          icon={<Flag className="h-5 w-5" aria-hidden />}
          title="Question reports"
          description={
            openReportCount > 0
              ? `${openReportCount} open report${openReportCount === 1 ? "" : "s"} need review.`
              : "Triage user-filed reports on your questions."
          }
          badge={
            openReportCount > 0 ? String(openReportCount) : undefined
          }
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/notes-reports"
          icon={<BookOpen className="h-5 w-5" aria-hidden />}
          title="Concept reports"
          description={
            openConceptReportCount > 0
              ? `${openConceptReportCount} open report${openConceptReportCount === 1 ? "" : "s"} on notes concepts.`
              : "Triage user-filed reports on /notes concepts."
          }
          badge={
            openConceptReportCount > 0
              ? String(openConceptReportCount)
              : undefined
          }
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/members"
          icon={<Users className="h-5 w-5" aria-hidden />}
          title="Members"
          description="Add admins and teachers, reset passwords, manage roles."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/students"
          icon={<GraduationCap className="h-5 w-5" aria-hidden />}
          title="Registered Students"
          description="See who has signed up — self-serve student accounts, when they joined."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/entitlements"
          icon={<Gem className="h-5 w-5" aria-hidden />}
          title="Access"
          description="Grant or revoke free premium access for students by email."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/quizzes"
          icon={<ListChecks className="h-5 w-5" aria-hidden />}
          title="Daily Quizzes"
          description="View quizzes assembled from the /notes question pool and their status."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/mocks"
          icon={<Timer className="h-5 w-5" aria-hidden />}
          title="Mock Performance"
          description="See how students scored on each timed mock test, attempt by attempt."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/feedback"
          icon={<MessageSquareHeart className="h-5 w-5" aria-hidden />}
          title="Feedback"
          description="NPS score and student suggestions — what to build next."
        />
      )}
      {isAdmin && (
        <ActionCard
          href="/dashboard/activity"
          icon={<Activity className="h-5 w-5" aria-hidden />}
          title="Usage shape"
          description="How students actually use the app — daily or in bursts — before we build engagement mechanics."
        />
      )}
      <ActionCard
        href="/dashboard/papers"
        icon={<FileText className="h-5 w-5" aria-hidden />}
        title="Papers"
        description="Build an exam paper together — each teacher fills their subject's section."
      />
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
  primary,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  primary?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "rounded-md p-2.5",
            primary
              ? "bg-primary/10 text-primary"
              : "bg-muted text-foreground"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 font-semibold">
            <span className="flex items-center gap-1">
              {title}
              <ArrowRight
                className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden
              />
            </span>
            {badge && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white tabular-nums">
                {badge}
              </span>
            )}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function StatGrid({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard kind="numeric" value={stats.totalQuestions} label="Questions" />
      <StatCard kind="numeric" value={stats.examsCovered} label="Exams" />
      <StatCard kind="numeric" value={stats.chaptersCovered} label="Chapters" />
      <StatCard
        kind="text"
        value={
          stats.daysSinceLastUpload == null
            ? "—"
            : fmtDays(stats.daysSinceLastUpload)
        }
        label="Since last upload"
      />
    </div>
  );
}

function ByExamBreakdown({
  rows,
  total,
}: {
  rows: ByExamRow[];
  total: number;
}) {
  return (
    <div className="space-y-3 rounded-lg border bg-card p-5">
      {rows.map((row) => {
        const pct = total > 0 ? (row.count / total) * 100 : 0;
        return (
          <div key={row.examId} className="space-y-1.5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{row.examName}</span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {row.count}
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={row.count}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${row.examName}: ${row.count} of ${total}`}
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RecentUploadsList({ uploads }: { uploads: RecentUpload[] }) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {uploads.map((u) => (
        <li key={u.id}>
          <Link
            href={`/uploads/${u.id}`}
            className="group flex items-center gap-4 p-4 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none"
            aria-label={`Open upload ${u.filename}`}
          >
            <FileSpreadsheet
              className="h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{u.filename}</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-700 dark:text-emerald-400">+{u.inserted} added</span>
                {u.skipped > 0 && (
                  <span>
                    {" · "}
                    {u.skipped} skipped
                  </span>
                )}
                {u.status === "FAILED" && (
                  <span className="text-destructive"> · failed</span>
                )}
              </p>
            </div>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {timeAgo(u.createdAt)}
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function fmtDays(d: number): string {
  if (d === 0) return "Today";
  if (d === 1) return "1d";
  return `${d}d`;
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.round(diffMs / 60_000);
  const hr = Math.round(diffMs / 3_600_000);
  const day = Math.round(diffMs / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(min) < 60) return rtf.format(-min, "minute");
  if (Math.abs(hr) < 24) return rtf.format(-hr, "hour");
  if (Math.abs(day) < 30) return rtf.format(-day, "day");
  const months = Math.round(day / 30);
  return rtf.format(-months, "month");
}

