"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, Calculator, ChevronLeft, ChevronRight, Grid3x3, SpellCheck, type LucideIcon } from "lucide-react";
import { slotStyle, wrapOffset } from "@/lib/exam/showcaseSlots";
import { useCardRing } from "@/components/ring/useCardRing";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import {
  PLAY_SUBJECTS,
  HUB_SUBJECT_KEY,
  gameStatus,
  nearestVirtual,
  realIndex,
  ringCopies,
  subjectIndex,
  type GameKey,
} from "@/lib/play/hub";
import { PROGRESS_KEY, parseProgress } from "@/lib/play/progress";
import { BUILDER_KEY, istDay, parseBuilder } from "@/lib/play/words/builder";
import { DAILY_KEY, parseDaily } from "@/lib/play/words/daily";

/**
 * The /play hub (2026-11-17): the homepage's 3D ring with one card per
 * subject (owner's pick: "will add more subjects"), and that subject's games
 * below. A short subject list is drawn more than once round the ring
 * (lib/play/hub ringCopies) so it never looks empty; the dots count subjects.
 * Unlike the homepage ring it never moves by itself: the games list below
 * follows it, and a list that changes on its own would be hard to use.
 */

const GAME_ICON: Record<GameKey, LucideIcon> = {
  maths: Calculator,
  word_builder: SpellCheck,
  daily_word: Grid3x3,
};

export default function PlayHub() {
  const n = PLAY_SUBJECTS.length;
  const total = n * ringCopies(n);
  const [announce, setAnnounce] = useState("");

  const onMove = useCallback(
    (next: number, byUser: boolean) => {
      const s = PLAY_SUBJECTS[realIndex(next, n)];
      writeLocal(HUB_SUBJECT_KEY, s.key);
      if (byUser) setAnnounce(`${s.name}, ${realIndex(next, n) + 1} of ${n}`);
    },
    [n]
  );

  const { active, pos, dragging, go, stageRef, stageHandlers } = useCardRing({ count: total, onMove });
  const subject = realIndex(active, n);

  // Open on the subject chosen last time.
  useEffect(() => {
    const want = subjectIndex(readLocal(HUB_SUBJECT_KEY));
    if (want !== 0) go(nearestVirtual(0, want, n, total), false);
    // Once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mathsRaw = useLocalStore(PROGRESS_KEY);
  const builderRaw = useLocalStore(BUILDER_KEY);
  const dailyRaw = useLocalStore(DAILY_KEY);
  const loaded = mathsRaw !== undefined;
  const saved = useMemo(
    () => ({
      maths: parseProgress(mathsRaw ?? null),
      builder: parseBuilder(builderRaw ?? null),
      daily: parseDaily(dailyRaw ?? null),
    }),
    [mathsRaw, builderRaw, dailyRaw]
  );
  const today = loaded ? istDay(new Date()) : "";

  return (
    <>
      <section className="hero-brand sc-host rounded-3xl pt-6" aria-labelledby="play-title">
        <div className="px-5 text-center">
          <h1 id="play-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Play
          </h1>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed opacity-85">
            Short games that train exam skills. Pick a subject and beat your own best; there are no rankings.
          </p>
        </div>

        <div className="sc-ring" data-compact>
          <div
            ref={stageRef}
            className="sc-stage"
            data-dragging={dragging || undefined}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Subjects. Use the left and right arrow keys to move."
            {...stageHandlers}
          >
            {Array.from({ length: total }, (_, v) => {
              const s = PLAY_SUBJECTS[realIndex(v, n)];
              const d = wrapOffset(v, pos, total);
              const slot = slotStyle(d);
              const front = v === active;
              const style = {
                "--d": d,
                "--z": slot.z,
                "--ry": slot.rotateY,
                "--s": slot.scale,
                "--shade": slot.shade,
                zIndex: slot.zIndex,
              } as CSSProperties;
              return (
                <article
                  key={v}
                  className="sc-card"
                  style={style}
                  data-card-index={v}
                  data-active={front || undefined}
                  data-hidden={slot.hidden || undefined}
                  aria-hidden={!front}
                  aria-roledescription="slide"
                  aria-label={s.name}
                >
                  <div className="sc-face items-center justify-center text-center">
                    <p className="sc-layer font-serif text-5xl font-bold leading-none text-[hsl(var(--showcase-accent))]">{s.face}</p>
                    <p className="sc-layer mt-2 text-xl font-bold">{s.name}</p>
                    <p className="sc-layer text-sm opacity-80">{s.tagline}</p>
                    <p className="sc-layer mt-1 text-xs font-semibold uppercase tracking-wide opacity-70">
                      {s.games.length} {s.games.length === 1 ? "game" : "games"}
                    </p>
                    <div className="sc-shade" aria-hidden />
                  </div>
                </article>
              );
            })}
            <div className="sc-floor" aria-hidden />
          </div>

          <div className="sc-controls">
            <button type="button" className="sc-round" onClick={() => go(active - 1, true)} aria-label="Previous subject">
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <div className="sc-dots">
              {PLAY_SUBJECTS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  className="sc-dot"
                  aria-label={`Show ${s.name}`}
                  aria-current={i === subject ? "true" : "false"}
                  onClick={() => go(nearestVirtual(active, i, n, total), true)}
                >
                  <span className="sc-dot-fill" />
                </button>
              ))}
            </div>
            <button type="button" className="sc-round" onClick={() => go(active + 1, true)} aria-label="Next subject">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {announce}
          </p>
        </div>
      </section>

      {PLAY_SUBJECTS.map((s, i) => (
        <section key={s.key} hidden={i !== subject} className="mt-6" aria-labelledby={`play-${s.key}-games`}>
          <h2 id={`play-${s.key}-games`} className="section-title text-lg font-bold">
            {s.name} games
          </h2>
          <ul className="mt-3 space-y-3">
            {s.games.map((g) => {
              const Icon = GAME_ICON[g.key];
              return (
                <li key={g.key}>
                  <Link
                    href={g.href}
                    className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-brand-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="icon-tile grid h-12 w-12 shrink-0 place-items-center rounded-xl">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{g.name}</span>
                      <span className="block text-sm text-muted-foreground">{g.blurb}</span>
                      <span className="mt-0.5 block min-h-[1.25rem] text-sm font-medium text-brand-accent">
                        {loaded ? gameStatus(g.key, saved, today) : ""}
                      </span>
                    </span>
                    <span className="inline-flex h-11 shrink-0 items-center gap-1 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground">
                      Play
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
