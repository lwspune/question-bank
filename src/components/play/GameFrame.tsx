"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { useLocalStore } from "./useLocalStore";
import { SOUND_KEY, setMuted } from "./sfx";

/** The speaker button every game shows; off is remembered per device. */
export function MuteButton() {
  const raw = useLocalStore(SOUND_KEY);
  const off = raw === "off";
  return (
    <button
      type="button"
      className="pa-icon-btn"
      onClick={() => setMuted(!off)}
      aria-label={off ? "Turn sound on" : "Turn sound off"}
      aria-pressed={off}
    >
      {off ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
    </button>
  );
}

/**
 * A game's page (2026-11-18): the dark arcade band under the site header, a
 * way back to the games and the sound switch, then the game.
 */
export default function GameFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="arcade min-h-[calc(100dvh-4rem)] w-full">
      <div className="mx-auto w-full max-w-md px-3 pb-10 pt-3 sm:px-4 sm:pt-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <Link
            href="/play"
            className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-sm font-semibold pa-dim hover:text-[var(--pa-ink)]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            All games
          </Link>
          <h1 className="pa-display truncate text-2xl font-extrabold leading-none">{title}</h1>
          <MuteButton />
        </div>
        {children}
      </div>
    </main>
  );
}
