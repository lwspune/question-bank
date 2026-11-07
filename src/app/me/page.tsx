import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient, createTypedServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getOwnWeekly } from "@/lib/goals/service";
import { loadMe } from "@/lib/me/load";
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
  await logActivityOnce(db, user.id, surfaceViewedEvent(user.id, "me", new Date()));
  const data = await loadMe(db, createTypedServerClient(), user, getOwnWeekly(db, user.id));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        <MeView data={data} vapidKey={process.env.VAPID_PUBLIC_KEY ?? ""} />
      </main>
    </>
  );
}
