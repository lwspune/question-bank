import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient, createTypedServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getOwnWeekly } from "@/lib/goals/service";
import { loadMe } from "@/lib/me/load";
import { getOwnAnswerTotals } from "@/lib/celebrate/service";
import { buildPulse } from "@/lib/pulse/build";
import MeView from "./MeView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your dashboard",
  robots: { index: false },
};

/**
 * The student's signed-in home. What it reads lives in lib/me/load.ts and what
 * it shows in MeView, both shared with the staff view of a student's /me
 * (/dashboard/students/[id]/me), so the two cannot drift apart.
 */
export default async function MePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me");

  const db = createSupabaseServerClient();
  const now = new Date();
  // One weekly read, shared by the page and the pulse.
  const weekly = getOwnWeekly(db, user.id, now);
  const [, , data, pulse] = await Promise.all([
    // The once-a-day view records go alongside the reads, not before them.
    logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "me", now)),
    // "On the site today": /api/me/pulse writes it, and with the pulse built
    // here the browser no longer calls that on Home.
    logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "site", now)),
    loadMe(db, createTypedServerClient(), user, weekly, now),
    // The pulse (due count, week, tiles, Weak spots), built with the page so
    // its numbers are in the HTML (2026-11-08): the same builder as
    // /api/me/pulse. A failed read is null, and the cards fetch it as before.
    buildPulse(db, user.id, now, { week: weekly, answers: getOwnAnswerTotals(db) }).catch((e: unknown) => {
      console.error("me pulse failed", e instanceof Error ? e.message : e);
      return null;
    }),
  ]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        <MeView data={data} vapidKey={process.env.VAPID_PUBLIC_KEY ?? ""} initialPulse={pulse} />
      </main>
    </>
  );
}
