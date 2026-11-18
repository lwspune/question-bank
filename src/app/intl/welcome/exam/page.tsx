import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import IntlHeader from "@/components/header/IntlHeader";
import IntlFooter from "@/components/footer/IntlFooter";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState, saveIntlTargets } from "@/lib/profile/service";
import { LIVE_INTL_EXAMS, intlExamPickerPath, intlPickedExam, safeNextFrom } from "@/lib/sites/intl";
import { INTL_EXAM_ABOUT } from "@/lib/sites/intlExamAbout";

/**
 * intl.pyqvault.com's /welcome/exam (2026-11-18): a new student whose exam the
 * welcome step could not tell (neither the page they were headed to nor the
 * page they landed on named one) picks it here. Exactly one exam is saved,
 * because an intl student counts as a student of every exam on their profile.
 * There is no "later": a profile with no exam is treated as PYQ Vault's.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Choose your exam",
  robots: { index: false },
};

function nextFrom(raw: unknown): string {
  return safeNextFrom(new URLSearchParams({ next: typeof raw === "string" ? raw : "" }).toString());
}

async function chooseExam(formData: FormData) {
  "use server";
  const next = nextFrom(formData.get("next"));
  const exam = intlPickedExam(formData.get("exam"));
  if (!exam) redirect(intlExamPickerPath(next));
  const user = await getSessionUser();
  if (user) {
    try {
      await saveIntlTargets(createSupabaseServerClient(), user, [exam]);
    } catch (e) {
      console.error("intl exam picker: saving the exam failed", e instanceof Error ? e.message : e);
    }
  }
  redirect(next);
}

export default async function IntlExamPicker(props: { searchParams: Promise<{ next?: string | string[] }> }) {
  const raw = (await props.searchParams).next;
  const next = nextFrom(Array.isArray(raw) ? raw[0] : raw);

  // Only a signed-in student with no exam yet has anything to choose.
  const user = await getSessionUser();
  if (!user) redirect(next);
  const state = await getOnboardingState(createSupabaseServerClient(), user.id);
  if (state.targetExams.length > 0) redirect(next);

  return (
    <>
      <IntlHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Which exam are you preparing for?</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Pick one and we will set up your account for it. Every exam&apos;s pages stay open to you.
        </p>
        <form action={chooseExam} className="mt-6 grid gap-4">
          <input type="hidden" name="next" value={next} />
          {LIVE_INTL_EXAMS.map((exam) => (
            <button
              key={exam.slug}
              type="submit"
              name="exam"
              value={exam.slug}
              className="flex w-full items-center gap-4 rounded-2xl border bg-card p-6 text-left transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold">{exam.displayName}</span>
                {INTL_EXAM_ABOUT[exam.slug] && (
                  <span className="mt-1 block text-sm text-muted-foreground">{INTL_EXAM_ABOUT[exam.slug]}</span>
                )}
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
            </button>
          ))}
        </form>
      </main>
      <IntlFooter />
    </>
  );
}
