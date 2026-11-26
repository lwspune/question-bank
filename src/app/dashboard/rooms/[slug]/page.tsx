import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BlockText from "@/components/math/BlockText";
import KatexRenderer from "@/components/math/KatexRenderer";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadAdminRoom } from "@/lib/rooms/admin";
import RoomChatAdmin from "./RoomChatAdmin";
import TeamForms from "../TeamForms";

export const dynamic = "force-dynamic";

const WHEN = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const LINK = "text-sm text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * /dashboard/rooms/<exam>: the owner reads one room (owner, 2026-11-26). The
 * whole chat newest first, hidden messages included, each student's email
 * beside their nickname, and how the room answered its daily question (counts
 * are for staff only: students never see one). The owner is not a member and
 * does not show in the room. Superadmin only.
 */
export default async function AdminRoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ before?: string }>;
}) {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const { slug } = await params;
  const { before: rawBefore } = await searchParams;
  const before = rawBefore && /^\d{1,15}$/.test(rawBefore) ? Number(rawBefore) : null;
  const room = await loadAdminRoom(createSupabaseAdminClient(), slug, before);
  if (!room) notFound();
  const daily = room.daily;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        {/* prefetch off on every link here: each one is a full staff render. */}
        <Link href="/dashboard/rooms" prefetch={false} className={LINK}>
          All rooms
        </Link>
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{room.name} room</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {room.members} member{room.members === 1 ? "" : "s"} · {room.open ? "Open" : "Closed"}. You read it here without joining; nobody in the
            room sees you.
          </p>
        </header>

        <section aria-labelledby="daily" className="space-y-3 rounded-xl border bg-card p-4">
          <h2 id="daily" className="font-semibold">
            Today&apos;s question
          </h2>
          {daily ? (
            <>
              <p className="text-xs text-muted-foreground">
                Pinned {WHEN.format(new Date(daily.at))} · {daily.tally.answered} answered, {daily.tally.right} right
              </p>
              {daily.context && <BlockText text={daily.context} className="font-serif text-sm" />}
              <BlockText text={daily.text} className="font-serif text-sm" />
              <ul className="space-y-1.5 text-sm">
                {daily.tally.byOption.map((o) => (
                  <li
                    key={o.label}
                    className={`flex items-baseline justify-between gap-3 rounded-md border px-3 py-1.5 ${o.correct ? "border-emerald-600/60" : ""}`}
                  >
                    <span className="font-serif">
                      <span className="font-sans font-medium">({o.label}) </span>
                      <KatexRenderer text={daily.options.find((x) => x.label === o.label)?.text ?? ""} />
                      {o.correct && <span className="ml-2 font-sans text-xs font-medium text-emerald-700 dark:text-emerald-400">Answer</span>}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted-foreground" aria-label={`${o.count} picked (${o.label})`}>
                      {o.count}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No question pinned yet.</p>
          )}
        </section>

        <RoomChatAdmin slug={room.slug} roomName={room.name} messages={room.messages} />

        {room.olderBefore && (
          <Link href={`/dashboard/rooms/${room.slug}?before=${room.olderBefore}`} prefetch={false} className={`inline-block ${LINK}`}>
            Older messages
          </Link>
        )}

        {room.open && <TeamForms rooms={[{ slug: room.slug, name: room.name }]} fixed />}
      </main>
    </>
  );
}
