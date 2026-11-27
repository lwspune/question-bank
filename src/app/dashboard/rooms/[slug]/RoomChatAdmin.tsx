"use client";

/**
 * A room's chat on /dashboard/rooms/<exam>, newest first: hidden messages
 * stay listed (marked) so the owner can show them again; a student's message
 * carries their email. Hide / show and mute go through POST /api/admin/rooms.
 */
import KatexRenderer from "@/components/math/KatexRenderer";
import type { AdminRoomMessage } from "@/lib/rooms/admin";
import { BTN, useRoomAction } from "../useRoomAction";

const WHEN = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

const LINE: Record<"joined" | "answered", string> = { joined: "joined", answered: "answered the daily question" };

export default function RoomChatAdmin({ slug, roomName, messages }: { slug: string; roomName: string; messages: AdminRoomMessage[] }) {
  const { busy, act } = useRoomAction();

  return (
    <section aria-labelledby="chat" className="space-y-3">
      <h2 id="chat" className="text-lg font-semibold">
        Messages, newest first
      </h2>
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing posted yet.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((m) =>
            m.kind === "system" ? (
              <li key={m.id} className="px-1 text-xs text-muted-foreground">
                {m.name} {m.event ? LINE[m.event] : ""} · {WHEN.format(new Date(m.at))}
              </li>
            ) : (
              <li key={m.id} className={`rounded-xl border bg-card p-3 ${m.hidden ? "border-dashed" : ""}`}>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{m.kind === "v" ? "V · tutor" : m.name}</span>
                  {m.email ? ` (${m.email})` : ""} · {WHEN.format(new Date(m.at))}
                  {m.pinned ? " · Pinned" : ""}
                  {m.hidden ? ` · Hidden (${m.hiddenReason === "reports" ? "3 reports" : "by staff"})` : ""}
                </p>
                {m.replyTo && (
                  <p className="mt-1 border-l-2 pl-2 text-xs text-muted-foreground">
                    Reply to {m.replyTo.name}: {m.replyTo.body.length > 80 ? `${m.replyTo.body.slice(0, 80)}…` : m.replyTo.body}
                  </p>
                )}
                <div className="mt-1.5 whitespace-pre-wrap break-words text-sm">
                  {m.kind === "v" ? <KatexRenderer text={m.body} /> : m.body}
                </div>
                {m.image && (
                  <a href={m.image.url} target="_blank" rel="noopener noreferrer" className="mt-2 block w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {/* eslint-disable-next-line @next/next/no-img-element -- a public bucket picture; next/image is not used on this site */}
                    <img src={m.image.url} alt={m.image.alt} loading="lazy" className="block h-auto max-h-60 w-auto rounded-md border" />
                  </a>
                )}
                {!m.pinned && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.hidden ? (
                      <button type="button" disabled={busy} className={BTN} onClick={() => act({ action: "review", id: m.id, verdict: "keep" }, "Shown again.")}>
                        Show again
                      </button>
                    ) : (
                      <button type="button" disabled={busy} className={BTN} onClick={() => act({ action: "review", id: m.id, verdict: "hide" }, "Hidden.")}>
                        Hide
                      </button>
                    )}
                    {m.userId && (
                      <button
                        type="button"
                        disabled={busy}
                        className={BTN}
                        aria-label={`Mute ${m.name} in this circle for 7 days`}
                        onClick={() => act({ action: "mute", slug, userId: m.userId, days: 7 }, `${m.name} muted in ${roomName} for 7 days.`)}
                      >
                        Mute 7 days
                      </button>
                    )}
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}
