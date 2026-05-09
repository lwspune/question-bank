import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  FileSpreadsheet,
  Search,
  Upload,
} from "lucide-react";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default async function DashboardPage() {
  const member = await getSessionMember();

  if (!member) {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    return (
      <>
        <AppHeader />
        <main className="mx-auto max-w-2xl p-8">
          <Card>
            <CardHeader>
              <CardTitle>Account not linked to an organization</CardTitle>
              <CardDescription>
                You are signed in as{" "}
                <span className="font-medium">{user.email}</span>, but you have
                not been added to any organization yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Ask your administrator to add you, then refresh this page.
              </p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const supabase = createSupabaseServerClient();
  const [stats, recentUploads] = await Promise.all([
    getDashboardStats(supabase, member.orgId),
    member.role === "ADMIN"
      ? getRecentUploads(supabase, member.orgId)
      : Promise.resolve([] as RecentUpload[]),
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

        <QuickActions isAdmin={isAdmin} isFresh={isFresh} />

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
              <Section heading="Recent uploads">
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
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function QuickActions({
  isAdmin,
  isFresh,
}: {
  isAdmin: boolean;
  isFresh: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        isAdmin ? "sm:grid-cols-2" : "sm:grid-cols-1"
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
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  primary?: boolean;
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
          <h3 className="flex items-center gap-1 font-semibold">
            {title}
            <ArrowRight
              className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              aria-hidden
            />
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
      <StatCard value={fmtNumber(stats.totalQuestions)} label="Questions" />
      <StatCard value={fmtNumber(stats.examsCovered)} label="Exams" />
      <StatCard value={fmtNumber(stats.chaptersCovered)} label="Chapters" />
      <StatCard
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
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
        <li key={u.id} className="flex items-center gap-4 p-4">
          <FileSpreadsheet
            className="h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{u.filename}</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-700">+{u.inserted} added</span>
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
        </li>
      ))}
    </ul>
  );
}

function fmtNumber(n: number): string {
  return n.toLocaleString("en-IN");
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

