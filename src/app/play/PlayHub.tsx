"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  FlaskConical,
  Grid3x3,
  LayoutGrid,
  ListOrdered,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { slotStyle, wrapOffset } from "@/lib/exam/showcaseSlots";
import { useCardRing } from "@/components/ring/useCardRing";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { MuteButton } from "@/components/play/GameFrame";
import { sfx } from "@/components/play/sfx";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import {
  HUB_SUBJECT_KEY,
  PLAY_SUBJECTS,
  gameStatus,
  nearestVirtual,
  realIndex,
  ringCopies,
  subjectIndex,
  type GameKey,
} from "@/lib/play/hub";
import { istDay } from "@/lib/play/day";
import { RAIN_KEY, parseRainProgress } from "@/lib/play/rain";
import { GROUPS_KEY, parseGroupsProgress } from "@/lib/play/groups";
import { DAILY_KEY, parseDaily } from "@/lib/play/words/daily";
import { LAUNCH_KEY, parseLaunchProgress } from "@/lib/play/launch";
import { HUNT_KEY, parseHuntProgress } from "@/lib/play/elements";
import { TIMELINE_KEY, parseTimelineProgress } from "@/lib/play/timeline";
import { PIN_KEY, parsePinProgress } from "@/lib/play/pin";

/**
 * The /play hub (2026-11-17; arcade rebuild 2026-11-18): the homepage's 3D
 * ring with one card per subject. Tapping the FRONT card opens a panel with
 * that subject's games (owner's pick: no list under the ring); tapping a side
 * card spins it to the front. It never moves by itself.
 */

const GAME_ICON: Record<GameKey, LucideIcon> = {
  number_rain: CloudRain,
  word_groups: LayoutGrid,
  daily_word: Grid3x3,
  launch: Target,
  element_hunt: FlaskConical,
  timeline: ListOrdered,
  pin_it: MapPin,
};

function useSaved() {
  const rain = useLocalStore(RAIN_KEY);
  const groups = useLocalStore(GROUPS_KEY);
  const daily = useLocalStore(DAILY_KEY);
  const launch = useLocalStore(LAUNCH_KEY);
  const hunt = useLocalStore(HUNT_KEY);
  const timeline = useLocalStore(TIMELINE_KEY);
  const pin = useLocalStore(PIN_KEY);
  const loaded = rain !== undefined;
  const saved = useMemo(
    () => ({
      rain: parseRainProgress(rain ?? null),
      groups: parseGroupsProgress(groups ?? null),
      daily: parseDaily(daily ?? null),
      launch: parseLaunchProgress(launch ?? null),
      hunt: parseHuntProgress(hunt ?? null),
      timeline: parseTimelineProgress(timeline ?? null),
      pin: parsePinProgress(pin ?? null),
    }),
    [rain, groups, daily, launch, hunt, timeline, pin]
  );
  return { loaded, saved };
}

export default function PlayHub() {
  const n = PLAY_SUBJECTS.length;
  const total = n * ringCopies(n);
  const [announce, setAnnounce] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const onMove = useCallback(
    (next: number, byUser: boolean) => {
      const s = PLAY_SUBJECTS[realIndex(next, n)];
      writeLocal(HUB_SUBJECT_KEY, s.key);
      if (byUser) {
        setAnnounce(`${s.name}, ${realIndex(next, n) + 1} of ${n}`);
        sfx.tick();
      }
    },
    [n]
  );

  const { active, pos, dragging, go, stageRef, stageHandlers } = useCardRing({ count: total, onMove });
  const subject = realIndex(active, n);

  // Open on the subject chosen last time.
  useEffect(() => {
    const want = subjectIndex(readLocal(HUB_SUBJECT_KEY));
    if (want !== 0) go(nearestVirtual(0, want, n, total), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loaded, saved } = useSaved();
  const today = loaded ? istDay(new Date()) : "";
  const shown = open === null ? null : PLAY_SUBJECTS[open];

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="pa-display text-4xl font-extrabold leading-none">Play</h1>
          <p className="mt-2 max-w-xs text-sm pa-dim">Swipe to pick a subject. Tap it to see its games.</p>
        </div>
        <MuteButton />
      </div>

      <section className="sc-host mt-2" aria-label="Subjects">
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
                  <div className="sc-face items-center justify-center text-center" style={{ background: s.color }}>
                    <p className="sc-layer pa-display text-6xl font-extrabold leading-none">{s.face}</p>
                    <p className="sc-layer pa-display mt-2 text-2xl font-extrabold">{s.name}</p>
                    <p className="sc-layer text-sm font-medium opacity-80">{s.tagline}</p>
                    <p className="sc-layer mt-2 rounded-full bg-white/60 px-3 py-1 text-xs font-bold">
                      {s.games.length} {s.games.length === 1 ? "game" : "games"} · Tap to play
                    </p>
                    {front && (
                      <button
                        type="button"
                        className="absolute inset-0 z-10 rounded-[22px]"
                        aria-label={`Open ${s.name} games`}
                        onClick={() => {
                          sfx.power();
                          setOpen(realIndex(v, n));
                        }}
                      />
                    )}
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

      <Sheet open={shown !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent
          side="bottom"
          className="arcade rounded-t-[1.75rem] border-0 px-4 pb-8 pt-4"
          closeClassName="grid h-11 w-11 place-items-center text-[var(--pa-ink)] opacity-90 right-3 top-3"
        >
          {shown && (
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[var(--pa-night-3)]" aria-hidden />
              <SheetTitle className="pa-display text-3xl font-extrabold text-[var(--pa-ink)]">{shown.name}</SheetTitle>
              <SheetDescription className="pa-dim">{shown.tagline}</SheetDescription>
              <ul className="mt-4 space-y-3">
                {shown.games.map((g) => {
                  const Icon = GAME_ICON[g.key];
                  return (
                    <li key={g.key}>
                      <Link
                        href={g.href}
                        className="flex items-center gap-3 rounded-2xl bg-[var(--pa-night-3)] p-3 text-[var(--pa-ink)]"
                      >
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-[#1b1240]" style={{ background: shown.color }}>
                          <Icon className="h-7 w-7" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="pa-display block text-xl font-extrabold leading-tight">{g.name}</span>
                          <span className="block text-sm pa-dim">{g.blurb}</span>
                          <span className="mt-0.5 block min-h-[1.25rem] text-sm font-semibold text-[var(--pa-mango)]">
                            {loaded ? gameStatus(g.key, saved, today) : ""}
                          </span>
                        </span>
                        <span className="pa-display inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--pa-mango)] px-4 py-2 text-base font-extrabold text-[var(--pa-mango-ink)]">
                          Play
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
