"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { revealDecision, isRevealLocked, type DailyReveals } from "@/lib/questions/revealMeter";
import { istDayKey } from "@/lib/email/dueNudge";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { recordPractice } from "./practiceBeacon";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { noteRevealForRun } from "@/components/celebrate/answerRun";
import type { PickLabel, PracticeSurface } from "@/lib/questions/practiceBatch";

/**
 * A reveal that came from tapping an option. `correct` is the page's own
 * reading of the key (lib/questions/bankVerdict `gradePick`, the rule the
 * server grades by), or null when the question cannot be graded. It drives the
 * "right in a row" message only; the recorded verdict is still the server's.
 */
export type RevealPick = { label: PickLabel; correct: boolean | null };

const KEY = "qb_revealed";

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode / disabled storage — meter just won't persist */
  }
  notify();
}

/*
 * ONE store for every card on the page. Each card mounts its own copy of this
 * hook, and while each copy kept its own `useState`, a card never learned that
 * ANOTHER card had spent the last free reveal — so it could not render locked
 * until it was tapped and refused, which is the invisible wall this replaced.
 * The snapshot is cached by raw string so useSyncExternalStore sees a stable
 * reference between writes. The `storage` event keeps other tabs in step.
 */
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

/** Bumped on every write this tab makes, to either list. A hook that holds one
 *  meter for many items (the board) subscribes to it, so it redraws when the
 *  daily list loads or grows even though the signed-out list did not change. */
let version = 0;
const getVersion = () => version;

function notify(): void {
  version++;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = readIds();
  }
  return cachedIds;
}

/*
 * THE SIGNED-IN DAILY LIMIT (2026-10-05, migration 0134): 50 answers a day free
 * on the bank, the board reader and guides. A cached page carries nothing about
 * the student, so the browser asks /api/me/reveals ONCE per page load for the
 * limit and today's ids, then keeps the list itself as reveals happen. It is a
 * soft limit by construction: the answer is already in the page.
 *
 * Until that reply lands, `daily` is null and nothing is locked: a pass holder
 * must never see a lock flash, and neither must anyone while we are loading.
 * Same store and listeners as the signed-out list, so a card that subscribes
 * to "am I locked?" redraws when either changes.
 */
type DailyQuota = { limit: number; todayIds: string[]; day: string };
let dailyQuota: DailyQuota | null = null;
let dailyFetch: Promise<void> | null = null;

/** Today's quota, or null when unlimited / not loaded. Rolls over at midnight
 *  IST by starting an empty list, so a tab left open overnight is not walled. */
function currentDaily(): DailyReveals | null {
  if (!dailyQuota) return null;
  const today = istDayKey(new Date());
  if (dailyQuota.day !== today) dailyQuota = { ...dailyQuota, todayIds: [], day: today };
  return dailyQuota;
}

/** The day's free answers, for the copy on a locked card; null = no limit. */
export function dailyRevealLimit(): number | null {
  return dailyQuota?.limit ?? null;
}

function ensureDailyQuota(): void {
  if (dailyFetch) return;
  dailyFetch = (async () => {
    try {
      const res = await fetch("/api/me/reveals", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { limit: number | null; todayIds: string[] };
      // null = no limit (off, or a pass): stay unlimited for this page load.
      if (data.limit === null) return;
      dailyQuota = { limit: data.limit, todayIds: data.todayIds, day: istDayKey(new Date()) };
      notify();
    } catch {
      /* offline or blocked: no limit is the safe direction */
    }
  })();
}

function spendDaily(nextIds: string[]): void {
  if (!dailyQuota) return;
  dailyQuota = { ...dailyQuota, todayIds: nextIds };
  notify();
}

/** Ask for today's quota once the viewer is known to be signed in. */
function useDailyQuota(signedIn: boolean, loading: boolean): void {
  useEffect(() => {
    if (loading) return;
    if (signedIn) {
      ensureDailyQuota();
    } else if (dailyQuota || dailyFetch) {
      // Signed out mid-session: the signed-out wall applies again, and a
      // loaded quota is how the walls tell the two apart.
      dailyQuota = null;
      dailyFetch = null;
      notify();
    }
  }, [signedIn, loading]);
}

/** The daily wall was met: one impression per page session. */
function reportDailyWall(surface: PracticeSurface): void {
  sendActivityOnce("reveals", { kind: "paywall_event", step: "shown", gate: "reveals" });
  trackFunnelOnce("reveal_daily_limit_hit", surface, { surface });
}

// The server (and the hydration pass) never sees localStorage, so nothing is
// locked there; the lock appears on the client's first commit after hydration.
function getServerSnapshot(): string[] {
  return EMPTY;
}

/** The ids this device has revealed while signed out, live across cards and
 *  tabs. Read-only: for V's hello, which counts reveals on the current page. */
export function useRevealedIds(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Client-side answer-reveal meter, shared across /browse + /board. Anon viewers
 * get FREE_REVEAL_LIMIT (lib/questions/revealMeter) distinct-question reveals (persisted in localStorage);
 * signed-in viewers are unlimited. `attemptReveal(id)` returns whether the
 * reveal is allowed and consumes budget on the first reveal of a new question.
 *
 * `surface` is REQUIRED and has no default on purpose. It defaulted to the bank
 * for as long as this hook has existed, which is why /board spent from 0105 to
 * 2026-09-18 recording its reveals as /browse reveals: the caller that needed to
 * say something different was never asked to. A default here is silent
 * mislabelling with a compile-time fix available, so the next surface to adopt
 * the hook has to state which product it is.
 *
 * `examName` is required for the same reason rather than optional: both current
 * callers have it, and an optional one would let the next caller quietly create
 * an unattributed bucket in the wall-hit breakdown. It is the DB `exams.name`
 * on both surfaces, so the two never speak different vocabularies.
 */
/** The tap itself: gate, persist, report. Shared by the page and card hooks. */
function useAttemptReveal(surface: PracticeSurface, examName: string) {
  const { signedIn, loading } = useSignedIn();
  useDailyQuota(signedIn, loading);

  /** `pick`: the option tapped, when this reveal is an answer — graded on the
   *  server (bank verdicts, 2026-10-02). Omitted for a "Show solution" reveal.
   *  `topic` names the chapter in a "right in a row" message (2026-10-04). */
  const attemptReveal = useCallback(
    (questionId: string, pick?: RevealPick, topic: string | null = null): boolean => {
      // Don't gate before auth resolves — a signed-in user must never be walled
      // by a brief loading window.
      if (loading) return true;
      const daily = signedIn ? currentDaily() : null;
      const decision = revealDecision({ signedIn, revealedIds: readIds(), questionId, daily });
      if (decision.allow && !signedIn) writeIds(decision.nextIds);
      if (decision.allow && daily) spendDaily(decision.nextIds);
      // Persist the reveal as a practice signal (migration 0105), tagged with
      // the surface that revealed it (0107/0108). Signed-in only — recordPractice
      // no-ops for anon. This is the ONLY place the bank or the board reader
      // tells the server it was used; everything else about /browse,
      // /questions and /board is invisible by construction.
      if (decision.allow) {
        recordPractice(questionId, signedIn, surface, pick?.label);
        // Every allowed reveal goes to the run counter, a pick or not: a
        // "Show answer" first is what stops a later pick on the same question
        // from counting. Signed out too — nothing is sent.
        noteRevealForRun(questionId, pick?.correct ?? null, topic);
      }
      // The wall bit: an anon viewer has spent their free reveals and is about
      // to meet RevealSignInPrompt. This is the sharpest conversion moment in
      // the product and, until now, the only one that emitted nothing at all —
      // recordPractice above no-ops for exactly the population this measures.
      // Anonymous + aggregate: a count, never a person. Once per session,
      // because clicking five more locked cards is one wall, not five.
      if (!decision.allow && decision.wall === "daily") reportDailyWall(surface);
      else if (!decision.allow) trackFunnelOnce("reveal_wall_hit", surface, { surface, exam: examName });
      return decision.allow;
    },
    [signedIn, loading, surface, examName]
  );

  return { attemptReveal, signedIn, loading };
}

export function useRevealMeter(surface: PracticeSurface, examName: string) {
  const { attemptReveal, signedIn, loading } = useAttemptReveal(surface, examName);
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const v = useSyncExternalStore(subscribe, getVersion, () => 0);

  /** Render this card locked (before any tap)? See `isRevealLocked`. */
  const isLocked = useCallback(
    (questionId: string): boolean =>
      isRevealLocked({ signedIn, loading, revealedIds: ids, questionId, daily: signedIn ? currentDaily() : null }),
    // `v` is read only to redraw when the daily list changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signedIn, loading, ids, v]
  );

  return { attemptReveal, isLocked, signedIn, loading };
}

/**
 * The same meter for ONE card (2026-10-04, DEAD_TAPS.md fix #2). It subscribes
 * to a yes/no, "is this card locked?", rather than to the whole reveal list,
 * so React redraws a card only when its own answer changes: on a normal reveal
 * that is no other card at all, and when the last free reveal is spent it is
 * every unrevealed card at once, which is the lock-up-front behaviour of
 * 2026-10-01. Before this, one signed-out reveal redrew all 25-50 cards on a
 * page. The board reader keeps useRevealMeter: it holds one meter for all of
 * its items.
 */
export function useCardRevealMeter(surface: PracticeSurface, examName: string, questionId: string) {
  const { attemptReveal, signedIn, loading } = useAttemptReveal(surface, examName);
  const getLocked = useCallback(
    () =>
      isRevealLocked({
        signedIn,
        loading,
        revealedIds: getSnapshot(),
        questionId,
        daily: signedIn ? currentDaily() : null,
      }),
    [signedIn, loading, questionId]
  );
  // Nothing is locked on the server or in the hydration pass, as before.
  const locked = useSyncExternalStore(subscribe, getLocked, () => false);

  return { attemptReveal, locked, signedIn, loading };
}

/**
 * The signed-in daily limit ALONE, for /guide and /notes worked examples
 * (2026-10-05). Those cards never had the signed-out wall (see
 * WorkedExampleCard) and still do not; a signed-in free student's reveals there
 * count toward, and are stopped by, the same 50 a day as the bank and board.
 * Returns whether this reveal may go ahead.
 */
export function useDailyRevealGate(signedIn: boolean, loading: boolean, surface: PracticeSurface) {
  useDailyQuota(signedIn, loading);
  return useCallback(
    (questionId: string): boolean => {
      if (loading || !signedIn) return true;
      const daily = currentDaily();
      const decision = revealDecision({ signedIn: true, revealedIds: [], questionId, daily });
      if (decision.allow && daily) spendDaily(decision.nextIds);
      if (!decision.allow) reportDailyWall(surface);
      return decision.allow;
    },
    [signedIn, loading, surface]
  );
}
