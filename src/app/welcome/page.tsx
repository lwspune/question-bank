import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState } from "@/lib/profile/service";
import { needsOnboarding } from "@/lib/profile/onboarding";
import { guessExam } from "@/lib/exam/examFromPath";
import { readAcquisitionCookie } from "@/lib/acquisition/cookie";
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

export default async function WelcomePage(
  props: {
    searchParams: Promise<{ next?: string | string[] }>;
  }
) {
  const searchParams = await props.searchParams;
  const next = safeNext(searchParams.next);

  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/welcome?next=${next}`)}`);

  // Self-guard: a returning / already-onboarded student never sees this — one
  // cheap read, then straight on to where they were headed.
  const state = await getOnboardingState(createSupabaseServerClient(), user.id);
  if (!needsOnboarding(state)) redirect(next);

  // The exam to CONFIRM rather than ask cold (2026-11-13): the one they tapped
  // (qb_exam), else the page they are going back to, else the page they first
  // landed on (the qb_acq cookie sign-in reads). Most sign-ups start on a
  // chapter page, which never sets qb_exam. Only offered: nothing is saved
  // until they tap. See lib/exam/examFromPath.
  const jar = await cookies();
  const guess = guessExam({
    cookie: jar.get("qb_exam")?.value,
    next,
    landing: readAcquisitionCookie(jar.get("qb_acq")?.value ?? null)?.landing,
  });

  return <ExamOnboarding next={next} guess={guess?.slug ?? null} />;
}
