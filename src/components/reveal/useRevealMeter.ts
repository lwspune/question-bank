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
import type { PassCta } from "@/lib/billing/plans";
import { intlExamOfPath } from "@/lib/sites/intl";
import { isFreeExamName } from "@/lib/billing/passScope";
import { fetchDailyQuota } from "@/lib/questions/dailyQuotaFetch";
import { applyClaim, claimReveal, needsClaim } from "@/lib/questions/claimReveal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

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
 * THE SIGNED-IN DAILY LIMIT (2026-10-05, migration 0134): N answers a day free
 * on the bank, the board readers, guides and V.
 *
 * THE SERVER DECIDES (2026-11-08, migration 0228). A new answer is opened only
 * after claim_reveal, called straight from the browser with the student's own
 * login, says yes; it records the answer in the same step. Before, this page
 * decided from a copy of the count fetched once per load, and a failed fetch
 * left the student unlimited until a reload. One failure now costs one answer:
 * when the server cannot be asked, that answer goes ahead (never walled by our
 * error) and the next tap asks again.
 *
 * The copy from /api/me/reveals is kept for DISPLAY: which cards to draw
 * locked before a tap, and the pass the wall sells. Until it lands nothing is
 * drawn locked (a pass holder must never see a lock flash), and every claim
 * reply updates it. A reply of "no limit" (a pass, or the limit off) is the one
 * thing taken from it: `dailyUnlimited`, which skips the claim. Same store and
 * listeners as the signed-out list, so a card that subscribes to "am I
 * locked?" redraws when either changes.
 */
type DailyQuota = { limit: number; todayIds: string[]; exemptIds: string[]; used?: number; day: string; pass: PassCta | null };
let dailyQuota: DailyQuota | null = null;
let dailyFetch: Promise<void> | null = null;
/** The server said this student has no limit (a pass, or the limit is off). */
let dailyUnlimited = false;
/** One claim per question at a time: a double tap asks once. */
const claims = new Map<string, Promise<boolean>>();

/** Today's quota, or null when unlimited / not loaded. Rolls over at midnight
 *  IST by starting an empty list, so a tab left open overnight is not walled. */
function currentDaily(): DailyReveals | null {
  if (!dailyQuota) return null;
  const today = istDayKey(new Date());
  // A new day: today's path questions are another day's, so they go too.
  if (dailyQuota.day !== today) dailyQuota = { ...dailyQuota, todayIds: [], exemptIds: [], used: 0, day: today };
  return dailyQuota;
}

/**
 * May this signed-in student open this answer? Asks the server for a new one
 * (lib/questions/claimReveal `needsClaim`); an answer already open today, a
 * board-path question or a confirmed pass needs no question.
 */
function claimForPage(questionId: string, surface: PracticeSurface): Promise<boolean> {
  const daily = currentDaily();
  const ask = needsClaim({
    signedIn: true,
    surface,
    unlimited: dailyUnlimited,
    todayIds: daily?.todayIds ?? [],
    exemptIds: daily?.exemptIds ?? [],
    questionId,
  });
  if (!ask) return Promise.resolve(true);
  const pending = claims.get(questionId);
  if (pending) return pending;
  const claim = (async () => {
    const result = await claimReveal((fn, args) => createSupabaseBrowserClient().rpc(fn, args), questionId, surface);
    // The server could not be asked: this one answer goes ahead.
    if (!result) return true;
    const before = currentDaily();
    const next = applyClaim(before, questionId, result);
    if (next && next !== before) {
      dailyQuota = {
        limit: next.limit,
        todayIds: [...next.todayIds],
        exemptIds: dailyQuota?.exemptIds ?? [],
        used: next.used,
        day: istDayKey(new Date()),
        pass: dailyQuota?.pass ?? null,
      };
      notify();
    }
    return result.allowed;
  })().finally(() => {
    claims.delete(questionId);
    notify();
  });
  claims.set(questionId, claim);
  notify();
  return claim;
}

/** True while this question's reveal waits on the server: for a busy cursor. */
export function useRevealPending(questionId: string): boolean {
  return useSyncExternalStore(subscribe, () => claims.has(questionId), () => false);
}

/** The day's free answers, for the copy on a locked card; null = no limit. */
export function dailyRevealLimit(): number | null {
  return dailyQuota?.limit ?? null;
}

/** The pass the wall sells in place (2026-10-25); null = none on sale, so it links to /pricing. */
export function dailyRevealPass(): PassCta | null {
  return dailyQuota?.pass ?? null;
}

/**
 * A pass bought without a reload (V's offer, 2026-10-28): every card on the
 * page opens again. The quota is not asked for again on this page load.
 */
export function liftDailyLimit(): void {
  dailyUnlimited = true;
  if (!dailyQuota) return;
  dailyQuota = null;
  notify();
}

function ensureDailyQuota(): void {
  if (dailyFetch) return;
  // Read only after an await, so it is set by then.
  let fetchAt: Promise<void> | null = null;
  fetchAt = (async () => {
    // An intl exam's page names its exam, so only that exam's pass lifts the
    // limit (migration 0206); a www page names none and the site's pass counts.
    const exam = intlExamOfPath(window.location.pathname);
    // A failed read is asked for once more (2026-11-08). Two failures leave no
    // copy: cards draw open, and each new answer is still decided by the server.
    const data = await fetchDailyQuota(
      () => fetch(`/api/me/reveals${exam ? `?exam=${exam}` : ""}`, { cache: "no-store" }),
      (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    );
    // Signed out while the retry waited: drop the answer.
    if (dailyFetch !== fetchAt) return;
    if (!data) return;
    // The server's "no limit" (a pass, or the limit off): no claims needed.
    if (data.limit === null) {
      dailyUnlimited = true;
      return;
    }
    dailyQuota = {
      limit: data.limit,
      // A claim that landed first knows answers this reply may not (other tabs).
      todayIds: [...new Set([...data.todayIds, ...(dailyQuota?.todayIds ?? [])])],
      used: dailyQuota?.used,
      // Today's board-path questions (migration 0225): never counted or walled.
      exemptIds: data.exemptIds ?? [],
      day: istDayKey(new Date()),
      pass: data.pass ?? null,
    };
    notify();
  })();
  dailyFetch = fetchAt;
}

/** Ask for today's quota once the viewer is known to be signed in. */
function useDailyQuota(signedIn: boolean, loading: boolean): void {
  useEffect(() => {
    if (loading) return;
    if (signedIn) {
      ensureDailyQuota();
    } else if (dailyQuota || dailyFetch || dailyUnlimited) {
      // Signed out mid-session: the signed-out wall applies again, and a
      // loaded quota is how the walls tell the two apart.
      dailyQuota = null;
      dailyFetch = null;
      dailyUnlimited = false;
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
 * Answer-reveal meter, shared across /browse + /board. Anon viewers get
 * FREE_REVEAL_LIMIT (lib/questions/revealMeter) distinct-question reveals
 * (persisted in localStorage); a signed-in viewer's new answers are decided by
 * the server (claim_reveal, 0228). `attemptReveal(id)` resolves to whether the
 * reveal may go ahead, after the server has answered when it had to be asked.
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
  // A free exam (the Class 9-10 exams, migration 0210) is never drawn locked.
  // Display only: whether its answers count is the server's call (0228), so
  // the browser's copy of the free list can never open a paid exam.
  const free = isFreeExamName(examName);

  /** `pick`: the option tapped, when this reveal is an answer — graded on the
   *  server (bank verdicts, 2026-10-02). Omitted for a "Show solution" reveal.
   *  `topic` names the chapter in a "right in a row" message (2026-10-04). */
  const attemptReveal = useCallback(
    async (questionId: string, pick?: RevealPick, topic: string | null = null): Promise<boolean> => {
      let allow: boolean;
      let wall: "daily" | "signin" | null = null;
      if (loading) {
        // Don't gate before auth resolves — a signed-in user must never be
        // walled by a brief loading window.
        allow = true;
      } else if (!signedIn) {
        const decision = revealDecision({ signedIn: false, revealedIds: readIds(), questionId });
        allow = decision.allow;
        if (allow) writeIds(decision.nextIds);
        else wall = "signin";
      } else {
        allow = await claimForPage(questionId, surface);
        if (!allow) wall = "daily";
      }
      // Persist the reveal as a practice signal (migration 0105), tagged with
      // the surface that revealed it (0107/0108). Signed-in only — recordPractice
      // no-ops for anon. The beacon feeds grading, the drill and milestones; the
      // daily count itself was recorded by the claim above.
      if (allow) {
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
      if (wall === "daily") reportDailyWall(surface);
      else if (wall === "signin") trackFunnelOnce("reveal_wall_hit", surface, { surface, exam: examName });
      return allow;
    },
    [signedIn, loading, surface, examName]
  );

  return { attemptReveal, signedIn, loading, free };
}

export function useRevealMeter(surface: PracticeSurface, examName: string) {
  const { attemptReveal, signedIn, loading, free } = useAttemptReveal(surface, examName);
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const v = useSyncExternalStore(subscribe, getVersion, () => 0);

  /** Render this card locked (before any tap)? See `isRevealLocked`. */
  const isLocked = useCallback(
    (questionId: string): boolean =>
      isRevealLocked({ signedIn, loading, revealedIds: ids, questionId, daily: signedIn && !free ? currentDaily() : null }),
    // `v` is read only to redraw when the daily list changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signedIn, loading, ids, v, free]
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
  const { attemptReveal, signedIn, loading, free } = useAttemptReveal(surface, examName);
  const getLocked = useCallback(
    () =>
      isRevealLocked({
        signedIn,
        loading,
        revealedIds: getSnapshot(),
        questionId,
        daily: signedIn && !free ? currentDaily() : null,
      }),
    [signedIn, loading, questionId, free]
  );
  // Nothing is locked on the server or in the hydration pass, as before.
  const locked = useSyncExternalStore(subscribe, getLocked, () => false);

  return { attemptReveal, locked, signedIn, loading };
}

/**
 * The signed-in daily limit ALONE, for /guide and /notes worked examples
 * (2026-10-05). Those cards never had the signed-out wall (see
 * WorkedExampleCard) and still do not; a signed-in free student's reveals there
 * count toward, and are stopped by, the same daily limit as the bank and
 * board, decided by the server (0228; a free exam's example counts nothing
 * there). Resolves to whether this reveal may go ahead.
 */
export function useDailyRevealGate(signedIn: boolean, loading: boolean, surface: PracticeSurface) {
  useDailyQuota(signedIn, loading);
  return useCallback(
    async (questionId: string): Promise<boolean> => {
      if (loading || !signedIn) return true;
      const allow = await claimForPage(questionId, surface);
      if (!allow) reportDailyWall(surface);
      return allow;
    },
    [signedIn, loading, surface]
  );
}
