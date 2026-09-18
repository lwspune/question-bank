import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import StudentTabs from "../StudentTabs";
import PerformanceBody from "@/components/performance/PerformanceBody";
import { getSessionUser } from "@/lib/auth";
import { getStudentDetail } from "@/lib/students/detail";
import { getStaffStudentPerformance } from "@/lib/performance/service";
import { getTaxonomyLinks } from "@/lib/performance/taxonomy";
import { EMPTY_TAXONOMY_LINKS, type TaxonomyLinks } from "@/lib/performance/links";
import { buildPerformance } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";

// Reads another student's own-row data behind a staff gate, so it must never be
// cached or indexed.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string };
type Search = { exam?: string; subject?: string };

export default async function StudentPerformancePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  // AUTHORIZATION MOVED INTO THE DATABASE (migration 0110). It used to be a
  // getSessionSuperadmin() check here in front of a service-role read; that
  // could not express the rule a teacher needs, because "which students may
  // this teacher see" is a join across batch_enrollments, batches and
  // branch_members. get_student_performance_for_staff runs that join as the
  // caller and RAISES 42501 when the answer is no, so the gate cannot be
  // bypassed by any route that forgets to repeat it.
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const payload = await getStaffStudentPerformance(params.id);
  // A refusal is a fact about the CALLER, an empty payload a fact about the
  // student. Keeping them distinct is why this is a 404 and not an empty page.
  if (!payload) notFound();

  const detail = await getStudentDetail(params.id);
  if (!detail) notFound();

  const perf = buildPerformance(payload, new Date());
  const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, searchParams);

  // Only the SELECTED lane's taxonomy, and only for the links: the RPC returns
  // chapters and subtopics as NAMES, so this is a ~30-120 row read independent
  // of how much the student sat. It FAILS SOFT — every number comes from the
  // RPC, so a broken taxonomy read costs the links and nothing else.
  const links: TaxonomyLinks = nav.selected
    ? await getTaxonomyLinks(nav.selected.exam, nav.selected.subject)
    : EMPTY_TAXONOMY_LINKS;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <StudentTabs id={params.id} name={detail.profile.name} active="performance" />
        <PerformanceBody
          perf={perf}
          nav={nav}
          links={links}
          basePath={`/dashboard/students/${params.id}/performance`}
          viewer="staff"
        />
      </main>
    </>
  );
}
