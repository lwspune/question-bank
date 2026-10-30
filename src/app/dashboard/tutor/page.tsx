import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadTutorContacts, loadTutorInterestReadout } from "@/lib/tutor/readout";
import { tallyYesByCity } from "@/lib/tutor/interest";
import { getExamBySlug } from "@/lib/exam/examContext";
import { formatMobile } from "@/lib/students/roster";
import { whatsappHref } from "@/lib/profile/mobile";
import { EXPERIMENTS, TUTOR_STUDENT_YES_KEEP, checkOn } from "@/lib/growth/registry";

export const dynamic = "force-dynamic";

/** "28 Oct". Dates here are YYYY-MM-DD, so format them as UTC. */
function fmtDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
}

const examName = (slug: string | null) => (slug ? getExamBySlug(slug)?.displayName ?? slug : null);

/**
 * /dashboard/tutor: the 1:1 tutoring interest check's answers (migration 0190),
 * on a page of their own since 2026-10-30 (they were a section of
 * /dashboard/growth, which keeps a one-line summary and a link here). Names,
 * emails, mobiles and cities of every Yes, so superadmin only.
 */
export default async function TutorInterestPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const admin = createSupabaseAdminClient();
  const [tutor, { contacts, unreachableYes }] = await Promise.all([
    loadTutorInterestReadout(admin),
    loadTutorContacts(admin),
  ]);
  const byCity = tallyYesByCity(contacts);
  const experiment = EXPERIMENTS.find((e) => e.id === "tutor-interest");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Tutor interest</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Answers to <Link href="/tutor" className="underline underline-offset-2 hover:text-foreground">/tutor</Link>:
            students who want 1:1 tutoring and teachers who would teach.{" "}
            {experiment && (
              <>
                Check on {fmtDate(checkOn(experiment.liveSince, experiment.windowDays))}: take tutoring further if{" "}
                {TUTOR_STUDENT_YES_KEEP}+ students answer Yes.{" "}
              </>
            )}
            {tutor.total} answers so far, {tutor.signedIn} signed in (sign-in is required since 28 Oct; earlier
            signed-out answers count once each). Header Tutor taps are in Vercel Analytics. The growth experiment is on{" "}
            <Link href="/dashboard/growth" className="underline underline-offset-2 hover:text-foreground">
              Growth
            </Link>
            .
          </p>
        </header>

        <section className="rounded-xl border bg-card p-6">
          <h2 className="text-sm font-semibold">Answers</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-medium">Who</th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">Yes</th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">Online</th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">Offline</th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">Either</th>
                  <th scope="col" className="py-1 text-right font-medium">No</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {(["student", "teacher"] as const).map((role) => (
                  <tr key={role} className="border-t">
                    <td className="py-1.5 pr-3">{role === "student" ? "Students wanting a tutor" : "Teachers willing to teach"}</td>
                    <td className="py-1.5 pr-3 text-right font-semibold">{tutor[role].yes}</td>
                    <td className="py-1.5 pr-3 text-right">{tutor[role].online}</td>
                    <td className="py-1.5 pr-3 text-right">{tutor[role].offline}</td>
                    <td className="py-1.5 pr-3 text-right">{tutor[role].either}</td>
                    <td className="py-1.5 text-right">{tutor[role].no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tutor.studentYesByExam.length > 0 && (
            <p className="mt-3 text-sm">
              <span className="text-muted-foreground">Student Yes by exam: </span>
              {tutor.studentYesByExam.map((x) => `${examName(x.exam) ?? "no exam chosen"} ${x.count}`).join(" · ")}
            </p>
          )}
        </section>

        <section className="rounded-xl border bg-card p-6">
          <h2 className="text-sm font-semibold">Yes by city</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Signed-in Yes answers, by the city on the account&rsquo;s profile. /tutor asks for it after a Yes since 30
            Oct, so earlier Yes answers have none unless the student filled it in on /account.
          </p>
          {byCity.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No signed-in Yes answers yet.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="py-1 pr-3 font-medium">City</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Students</th>
                    <th scope="col" className="py-1 text-right font-medium">Teachers</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {byCity.map((c) => (
                    <tr key={c.city ?? ""} className="border-t">
                      <td className="py-1.5 pr-3">{c.city ?? <span className="text-muted-foreground">No city</span>}</td>
                      <td className="py-1.5 pr-3 text-right">{c.students}</td>
                      <td className="py-1.5 text-right">{c.teachers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-6">
          <h2 className="text-sm font-semibold">Who said Yes</h2>
          {contacts.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No signed-in Yes answers yet.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="py-1 pr-3 font-medium">Name</th>
                    <th scope="col" className="py-1 pr-3 font-medium">Email</th>
                    <th scope="col" className="py-1 pr-3 font-medium">Mobile</th>
                    <th scope="col" className="py-1 pr-3 font-medium">City</th>
                    <th scope="col" className="py-1 pr-3 font-medium">Who</th>
                    <th scope="col" className="py-1 pr-3 font-medium">Mode</th>
                    <th scope="col" className="py-1 pr-3 font-medium">Exam</th>
                    <th scope="col" className="py-1 font-medium">Answered</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => {
                    const wa = whatsappHref(c.mobile);
                    return (
                      <tr key={c.userId} className="border-t">
                        <td className="py-1.5 pr-3">{c.name ?? "-"}</td>
                        <td className="py-1.5 pr-3">
                          {c.email ? (
                            <a href={`mailto:${c.email}`} className="underline underline-offset-2 hover:text-foreground">
                              {c.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 pr-3 tabular-nums">
                          {wa ? (
                            <a
                              href={wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 hover:text-foreground"
                              aria-label={`WhatsApp ${c.name ?? c.email ?? "this person"}`}
                            >
                              {formatMobile(c.mobile)}
                            </a>
                          ) : (
                            formatMobile(c.mobile)
                          )}
                        </td>
                        <td className="py-1.5 pr-3">{c.city ?? "-"}</td>
                        <td className="py-1.5 pr-3">{c.role === "student" ? "Student" : "Teacher"}</td>
                        <td className="py-1.5 pr-3">{c.mode ? c.mode[0].toUpperCase() + c.mode.slice(1) : "-"}</td>
                        <td className="py-1.5 pr-3">{examName(c.examSlug) ?? "-"}</td>
                        <td className="whitespace-nowrap py-1.5">{fmtDate(c.answeredAt.slice(0, 10))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {unreachableYes > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              {unreachableYes} more Yes {unreachableYes === 1 ? "answer was" : "answers were"} given signed out, before
              sign-in was required, and cannot be reached.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
