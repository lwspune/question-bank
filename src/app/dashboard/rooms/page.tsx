import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadAdminRooms, loadFlagged } from "@/lib/rooms/admin";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import RoomsAdmin from "./RoomsAdmin";

export const dynamic = "force-dynamic";

/**
 * /dashboard/rooms: the owner moderates the exam rooms (owner, 2026-11-25;
 * migration 0289). Reported and hidden messages first (keep, hide, mute the
 * author), then every room with its members, last-24-hour messages and an
 * open switch, a form to post as "PYQ Vault team" and one to swap the daily
 * question. Names and messages from students, so superadmin only.
 */
export default async function RoomsAdminPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const db = createSupabaseAdminClient();
  const [rooms, flagged] = await Promise.all([loadAdminRooms(db), loadFlagged(db)]);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Exam rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            One room per exam, opened from the bubble at the bottom left. A message is hidden by itself after 3 reports; keep or hide each one
            here. The evening email lists these too, with doubts nobody answered.
          </p>
        </header>
        <RoomsAdmin rooms={rooms} flagged={flagged} />
      </main>
    </>
  );
}
