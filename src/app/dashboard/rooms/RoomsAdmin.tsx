"use client";

/**
 * /dashboard/rooms' actions (POST /api/admin/rooms). Each one toasts its result
 * and refreshes the page's server data. A room's name opens its own page.
 */
import Link from "next/link";
import type { AdminRoom, FlaggedMessage } from "@/lib/rooms/admin";
import TeamForms from "./TeamForms";
import { BTN, useRoomAction } from "./useRoomAction";

const REASON: Record<string, string> = { spam: "Spam", abuse: "Rude", personal: "Personal details", off_topic: "Off topic", other: "Other" };

export default function RoomsAdmin({ rooms, flagged }: { rooms: AdminRoom[]; flagged: FlaggedMessage[] }) {
  const { busy, act } = useRoomAction();
  const openRooms = rooms.filter((r) => r.open);

  return (
    <div className="space-y-8">
      <section aria-labelledby="flagged" className="space-y-3">
        <h2 id="flagged" className="text-lg font-semibold">
          To check ({flagged.length})
        </h2>
        {flagged.length === 0 && <p className="text-sm text-muted-foreground">Nothing reported.</p>}
        <ul className="space-y-3">
          {flagged.map((m) => (
            <li key={m.id} className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">
                {m.room} · {m.name}
                {m.email ? ` (${m.email})` : ""} · {new Date(m.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} ·{" "}
                {m.hidden ? `Hidden after ${m.reports} reports` : `${m.reports} report${m.reports === 1 ? "" : "s"}`} ·{" "}
                {m.reasons.map((r) => REASON[r] ?? r).join(", ")}
              </p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm">{m.body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" disabled={busy} className={BTN} onClick={() => act({ action: "review", id: m.id, verdict: "keep" }, "Kept: it shows again.")}>
                  Keep
                </button>
                <button type="button" disabled={busy} className={BTN} onClick={() => act({ action: "review", id: m.id, verdict: "hide" }, "Hidden.")}>
                  Hide
                </button>
                {m.userId && (
                  <button
                    type="button"
                    disabled={busy}
                    className={BTN}
                    onClick={() => act({ action: "mute", slug: m.slug, userId: m.userId, days: 7 }, `${m.name} muted in ${m.room} for 7 days.`)}
                  >
                    Mute author 7 days
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="rooms" className="space-y-3">
        <h2 id="rooms" className="text-lg font-semibold">
          Rooms ({rooms.length})
        </h2>
        {rooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">No room has a member yet. A room is made when its first student joins.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Room</th>
                  <th className="px-4 py-2 font-medium">Members</th>
                  <th className="px-4 py-2 font-medium">Messages, 24 h</th>
                  <th className="px-4 py-2 font-medium">Pinned question</th>
                  <th className="px-4 py-2 font-medium">
                    <span className="sr-only">Open or closed</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.slug} className="border-t">
                    <td className="px-4 py-2 font-medium">
                      {/* prefetch off: each room page reads its whole chat (CLAUDE.md, next/link prefetch trap). */}
                      <Link href={`/dashboard/rooms/${r.slug}`} prefetch={false} className="text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {r.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 tabular-nums">{r.members}</td>
                    <td className="px-4 py-2 tabular-nums">{r.messages24h}</td>
                    <td className="px-4 py-2 font-mono text-xs">{r.pinnedQuestionId ?? "None"}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        disabled={busy}
                        className={BTN}
                        onClick={() => act({ action: "open", slug: r.slug, open: !r.open }, r.open ? `${r.name} room closed.` : `${r.name} room opened.`)}
                      >
                        {r.open ? "Close room" : "Open room"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <TeamForms rooms={openRooms} />
    </div>
  );
}
