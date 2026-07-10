import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, LogIn, CalendarDays, Gem } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import AttemptsList from "@/app/mock/_components/AttemptsList";
import { cn } from "@/lib/utils";
import { getSessionMember } from "@/lib/auth";
import { getStudentDetail } from "@/lib/students/detail";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string };

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function StudentDetailPage({ params }: { params: Params }) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const detail = await getStudentDetail(params.id);
  if (!detail) notFound();
  const { profile, premium, attempts, summary } = detail;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl space-y-6 px-6 py-8">
        <div>
          <Link href="/dashboard/students" className="text-sm text-muted-foreground hover:text-foreground">
            ← All students
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{profile.name}</h1>
        </div>

        {/* Profile */}
        <section className="rounded-lg border bg-card p-5">
          <dl className="grid gap-3 sm:grid-cols-2">
            <Field icon={Mail} label="Email" value={profile.email} />
            <Field icon={LogIn} label="Sign-in" value={profile.provider} />
            <Field icon={CalendarDays} label="Registered" value={fmtDate(profile.createdAt)} />
            <Field
              icon={Gem}
              label="Premium"
              value={premium.active ? `Active${premium.source ? ` · ${premium.source}` : ""}` : "None"}
              highlight={premium.active}
            />
          </dl>
        </section>

        {/* Mock performance */}
        <section>
          <h2 className="mb-3 text-sm font-semibold">Mock performance</h2>
          <div className="mb-3 grid grid-cols-3 gap-3">
            <StatCard kind="numeric" value={summary.taken} label="Mocks taken" />
            <StatCard kind="text" value={summary.bestPct != null ? `${summary.bestPct}%` : "—"} label="Best" />
            <StatCard kind="text" value={summary.avgPct != null ? `${summary.avgPct}%` : "—"} label="Average" />
          </div>
          {attempts.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              This student hasn&apos;t attempted any mock yet.
            </p>
          ) : (
            <AttemptsList attempts={attempts} />
          )}
        </section>
      </main>
    </>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", highlight ? "text-brand-accent" : "text-muted-foreground")} aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className={cn("truncate text-sm font-medium", highlight && "text-brand-accent")} title={value}>{value}</dd>
      </div>
    </div>
  );
}
