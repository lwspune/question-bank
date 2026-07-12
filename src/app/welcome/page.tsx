import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState } from "@/lib/profile/service";
import { needsOnboarding } from "@/lib/profile/onboarding";
import { isExamSlug } from "@/lib/exam/examContext";
import ExamOnboarding from "./ExamOnboarding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Welcome to PYQ Vault",
  robots: { index: false },
};

/** Only same-origin app paths are allowed as a post-onboarding destination. */
function safeNext(raw: string | string[] | undefined): string {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return typeof v === "string" && v.startsWith("/") && !v.startsWith("//") ? v : "/browse";
}

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: { next?: string | string[] };
}) {
  const next = safeNext(searchParams.next);

  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/welcome?next=${next}`)}`);

  // Self-guard: a returning / already-onboarded student never sees this — one
  // cheap read, then straight on to where they were headed.
  const state = await getOnboardingState(createSupabaseServerClient(), user.id);
  if (!needsOnboarding(state)) redirect(next);

  // Pre-select the exam they were already browsing (the qb_exam cookie), so the
  // first real ask is a confirm, not a cold question.
  const cookieExam = cookies().get("qb_exam")?.value;
  const initialExam = isExamSlug(cookieExam) ? cookieExam : null;

  return <ExamOnboarding next={next} initialExam={initialExam} />;
}
