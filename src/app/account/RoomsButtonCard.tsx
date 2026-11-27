"use client";

/**
 * Account: show or hide the exam rooms button (owner, 2026-11-25; mockup H4).
 * The same three choices as the rooms window's sheet, saved on the account
 * (migration 0290), so they hold on phone and computer. Hiding keeps the rooms:
 * they open from the account menu.
 */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HIDE_FOREVER, backAtLabel, buttonHidden, hiddenLabel, type HideMode } from "@/lib/rooms/button";
import { fetchRooms, setRoomsButton } from "@/lib/rooms/client";
import { badgeCacheFresh } from "@/lib/rooms/poll";
import { readRoomsState, saveRoomsState, useRoomsState } from "@/lib/rooms/store";

const OPTION =
  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm has-[:checked]:border-brand has-[:checked]:bg-brand/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring";

function modeOf(until: string | null): HideMode {
  if (!buttonHidden(until, Date.now())) return "show";
  return until === HIDE_FOREVER ? "off" : "2h";
}

export default function RoomsButtonCard() {
  const state = useRoomsState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const s = readRoomsState();
    if (s && badgeCacheFresh(s.at, Date.now())) return;
    fetchRooms()
      .then((r) => saveRoomsState({ unread: r.unread, waiting: r.waiting, hiddenUntil: r.hiddenUntil }))
      .catch(() => {
        // The card still works: choosing an option saves it.
      });
  }, []);

  const mode = modeOf(state?.hiddenUntil ?? null);

  async function choose(next: HideMode) {
    if (next === mode && next !== "2h") return;
    setSaving(true);
    try {
      const r = await setRoomsButton(next);
      saveRoomsState({ hiddenUntil: r.hiddenUntil });
      toast.success(r.hiddenUntil ? `${hiddenLabel(r.hiddenUntil)}.` : "Circles button shown.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="my-6 rounded-xl border bg-card p-6" aria-labelledby="rooms-button">
      <h2 id="rooms-button" className="text-base font-semibold">
        Exam circles button
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        The round chat button at the bottom left. Hiding it keeps your circles: open them from the account menu.
      </p>
      <fieldset className="mt-4 space-y-2" disabled={saving}>
        <legend className="sr-only">Show or hide the exam circles button</legend>
        <label className={OPTION}>
          <input type="radio" name="rooms-button" checked={mode === "show"} onChange={() => choose("show")} className="h-4 w-4 accent-brand" />
          Show
        </label>
        <label className={OPTION}>
          <input type="radio" name="rooms-button" checked={mode === "2h"} onChange={() => choose("2h")} className="h-4 w-4 accent-brand" />
          <span>
            Hide for 2 hours
            {mode === "2h" && state?.hiddenUntil && (
              <span className="block text-xs text-muted-foreground">{backAtLabel(state.hiddenUntil)}</span>
            )}
          </span>
        </label>
        <label className={OPTION}>
          <input type="radio" name="rooms-button" checked={mode === "off"} onChange={() => choose("off")} className="h-4 w-4 accent-brand" />
          Hide until I turn it back on
        </label>
      </fieldset>
      <p className="mt-3 text-xs text-muted-foreground">Saved to your account, so it applies on your phone and computer.</p>
    </section>
  );
}
