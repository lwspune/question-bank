"use client";

/**
 * Post as "PYQ Vault team" and swap today's question: on the rooms list for any
 * open room, and on a room's own page for that room alone (no room picker).
 */
import type { FormEvent } from "react";
import { BTN, FIELD, useRoomAction } from "./useRoomAction";

function RoomPicker({ rooms, fixed }: { rooms: { slug: string; name: string }[]; fixed: boolean }) {
  if (fixed) return <input type="hidden" name="slug" value={rooms[0].slug} />;
  return (
    <label className="block text-sm">
      Room
      <select name="slug" required className={`${FIELD} mt-1 w-full`}>
        {rooms.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function TeamForms({ rooms, fixed = false }: { rooms: { slug: string; name: string }[]; fixed?: boolean }) {
  const { busy, act } = useRoomAction();
  if (rooms.length === 0) return null;

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
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={post} className="space-y-3 rounded-xl border bg-card p-4">
        <h2 className="font-semibold">Post as PYQ Vault team</h2>
        <RoomPicker rooms={rooms} fixed={fixed} />
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
        <RoomPicker rooms={rooms} fixed={fixed} />
        <label className="block text-sm">
          Question id
          <input name="questionId" required className={`${FIELD} mt-1 w-full font-mono`} placeholder="A PUBLIC MCQ of this exam, no figure" />
        </label>
        <button type="submit" disabled={busy} className={BTN}>
          Pin this question
        </button>
      </form>
    </div>
  );
}
