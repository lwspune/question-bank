import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Eye } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StudentTabs from "../StudentTabs";
import MeView from "@/app/me/MeView";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient, createTypedAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadMe } from "@/lib/me/load";
import { buildPulse } from "@/lib/pulse/build";
import { countStudentWeekStudyDays, readWeeklyGoal } from "@/lib/goals/service";
import { getStudentAnswerTotals } from "@/lib/celebrate/service";
import { accountNameOf } from "@/lib/ebooks/coverName";
import { displayName } from "@/lib/students/derive";

/**
 * "Their /me" (2026-11-07): one student's /me as they see it, for the owner.
 *
 * The same loader (lib/me/load.ts) and the same body (app/me/MeView.tsx) as the
 * student's own /me, so the view cannot drift from the real page. Reads:
 *  - every per-student read with the service role, each filtering on the
 *    student (and on PUBLIC / published where RLS would have);
 *  - the two counts SQL takes from "the caller" (study days this week,
 *    Answered / Right) through the staff functions of migration 0222, called
 *    with the superadmin's OWN session, which those functions check.
 *
 * READ ONLY. Nothing here logs activity as the student, and MeView swaps every
 * control that saves for a grey note (see `viewAs` there).
 *
 * Superadmin only, like the rest of /dashboard/students (platform-wide data).
 * Per-student: never cached, never indexed.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string };

export default async function StudentMeViewPage(props: { params: Promise<Params> }) {
  const { id } = await props.params;
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const admin = createSupabaseAdminClient();
  const { data: found, error } = await admin.auth.admin.getUserById(id);
  if (error || !found.user) notFound();
  const meta = (found.user.user_metadata ?? {}) as Record<string, unknown>;
  const preferred = meta.preferred_name;
  const student = {
    id,
    name: accountNameOf(meta),
    preferredName: typeof preferred === "string" ? preferred : null,
  };
  const heading = displayName(meta as { full_name?: string; name?: string }, found.user.email ?? null);

  // The superadmin's own session: the 0222 functions refuse anyone else.
  const session = createSupabaseServerClient();
  const now = new Date();
  const weekly = Promise.all([countStudentWeekStudyDays(session, id, now), readWeeklyGoal(admin, id)]).then(
    ([done, goal]) => ({ done, goal })
  );
  const [data, pulse] = await Promise.all([
    loadMe(admin, createTypedAdminClient(), student, weekly, now, { staffView: true }),
    buildPulse(admin, id, now, { week: weekly, answers: getStudentAnswerTotals(session, id) }),
  ]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        <StudentTabs id={id} name={heading} active="me" />
        <p className="flex items-start gap-2 rounded-lg border border-brand/30 bg-brand/5 px-4 py-3 text-sm">
          <Eye className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
          <span>
            Their /me as they see it, read only. Grey notes stand in for buttons that would save as them. Links
            open as you, and the badge in the header is yours.
          </span>
        </p>
        <MeView data={data} vapidKey="" viewAs={{ studentId: id, pulse }} />
      </main>
    </>
  );
}
