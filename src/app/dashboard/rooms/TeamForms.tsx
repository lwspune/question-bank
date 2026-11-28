"use client";

/**
 * Post as "PYQ Vault team" and swap today's question: on the rooms list for any
 * open room, and on a room's own page for that room alone (no room picker).
 */
import type { FormEvent } from "react";
import { toast } from "sonner";
import { BTN, FIELD, useRoomAction } from "./useRoomAction";

/** Upload a picture first (0295); the post then names its path. */
async function uploadPicture(slug: string, file: File): Promise<string | null> {
  const data = new FormData();
  data.set("slug", slug);
  data.set("file", file);
  const res = await fetch("/api/admin/rooms/image", { method: "POST", body: data });
  const json = (await res.json().catch(() => ({}))) as { path?: string; error?: string };
  if (!res.ok || !json.path) {
    toast.error(json.error ?? "Could not upload the picture.");
    return null;
  }
  return json.path;
}

function RoomPicker({ rooms, fixed }: { rooms: { slug: string; name: string }[]; fixed: boolean }) {
  if (fixed) return <input type="hidden" name="slug" value={rooms[0].slug} />;
  return (
    <label className="block text-sm">
      Circle
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
    const slug = String(f.get("slug") ?? "");
    const file = f.get("picture");
    const imageAlt = String(f.get("imageAlt") ?? "").trim();
    let imagePath: string | undefined;
    if (file instanceof File && file.size > 0) {
      if (!imageAlt) {
        toast.error("Say in a line what the picture shows.");
        return;
      }
      imagePath = (await uploadPicture(slug, file)) ?? undefined;
      if (!imagePath) return;
    }
    const sent = { action: "post", slug, body: f.get("body"), imagePath, imageAlt: imagePath ? imageAlt : undefined };
    if (await act(sent, "Posted as PYQ Vault team.")) form.reset();
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
        <label className="block text-sm">
          Picture (optional, PNG or JPEG, up to 1 MB)
          <input name="picture" type="file" accept="image/png,image/jpeg" className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium" />
        </label>
        <label className="block text-sm">
          What the picture shows (read aloud to students who cannot see it)
          <input name="imageAlt" maxLength={300} className={`${FIELD} mt-1 w-full`} placeholder="Bar chart: share of CBSE Class 12 Maths questions by chapter" />
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
