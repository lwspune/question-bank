"use client";

/**
 * /dashboard/rooms' actions (POST /api/admin/rooms). Each one toasts its result
 * and refreshes the page's server data.
 */
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AdminRoom, FlaggedMessage } from "@/lib/rooms/admin";

const BTN =
  "inline-flex h-9 items-center rounded-md border border-border bg-card px-3 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";
const FIELD = "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const REASON: Record<string, string> = { spam: "Spam", abuse: "Rude", personal: "Personal details", off_topic: "Off topic", other: "Other" };

export default function RoomsAdmin({ rooms, flagged }: { rooms: AdminRoom[]; flagged: FlaggedMessage[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(body: Record<string, unknown>, done: string): Promise<boolean> {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/rooms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Could not save.");
      toast.success(done);
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  const openRooms = rooms.filter((r) => r.open);

  async function post(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const form = e.currentTarget;
    if (await act({ action: "post", slug: f.get("slug"), body: f.get("body") }, "Posted as PYQ Vault team.")) form.reset();
  }

  async function swap(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const form = e.currentTarget;
    if (await act({ action: "swap", slug: f.get("slug"), questionId: String(f.get("questionId") ?? "").trim() }, "Daily question swapped.")) form.reset();
  }

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
                {m.room} · {m.name} · {new Date(m.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} ·{" "}
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
                    <td className="px-4 py-2 font-medium">{r.name}</td>
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

      {openRooms.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={post} className="space-y-3 rounded-xl border bg-card p-4">
            <h2 className="font-semibold">Post as PYQ Vault team</h2>
            <label className="block text-sm">
              Room
              <select name="slug" required className={`${FIELD} mt-1 w-full`}>
                {openRooms.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Message
              <textarea name="body" required maxLength={1500} rows={4} className={`${FIELD} mt-1 h-auto w-full py-2`} />
            </label>
            <button type="submit" disabled={busy} className={BTN}>
              Post
            </button>
          </form>
          <form onSubmit={swap} className="space-y-3 rounded-xl border bg-card p-4">
            <h2 className="font-semibold">Swap today&apos;s question</h2>
            <label className="block text-sm">
              Room
              <select name="slug" required className={`${FIELD} mt-1 w-full`}>
                {openRooms.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Question id
              <input name="questionId" required className={`${FIELD} mt-1 w-full font-mono`} placeholder="A PUBLIC MCQ of this exam, no figure" />
            </label>
            <button type="submit" disabled={busy} className={BTN}>
              Pin this question
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
