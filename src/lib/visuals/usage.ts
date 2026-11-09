/**
 * What a student does with an animated solution (2026-10-31), the pure core.
 *
 * WHY THIS EXISTS. Animated solutions shipped on 2026-10-26 and nothing
 * recorded a play, a finish or a switch to Still: the switch's choice lived
 * only in the browser. So "are students using them?" could be answered only by
 * counting reveals on questions that have a visual today, which counts reveals
 * from before the visual existed and says nothing about watching.
 *
 * ONE ROW per student, question, action and India day (the dedupe key), kind
 * `solution_visual` (migration 0208), refId = the question:
 *   shown           the first run started (40% of the picture on screen)
 *   reached         a step further than any before, by the run or a tap
 *                   (one row per step: the step is in the dedupe key)
 *   finished        the last step was reached, by the run or by tapping
 *   replayed        the student tapped Play again
 *   opened_still    the solution was on screen in Still because the device
 *                   remembered Still
 *   chose_still     the student switched this solution to Still
 *   chose_animated  ...or back to Animated
 * Signed-in students only, like every reveal (most of the audience is under
 * 18; see /api/activity/practice).
 *
 * The summary counts student-question PAIRS, not rows: the same question shown
 * on two days is one pair, so a student who returns is not two viewers.
 *
 * FINISHING, CORRECTED 2026-11-08 (lib/visuals/progress). Before then
 * "finished" was sent only when the automatic run reached the end untouched,
 * so tapping through never counted and a phone with animations off could
 * never finish at all: the old finished share is a FLOOR. The new player adds
 * details, each allowed on one action only:
 *   shown     motion "full" | "reduced" (animations off), steps 1-50
 *   reached   step 2-50 (required)
 *   finished  how "auto" | "tapped"
 * A pair whose shown carries `motion` came from the new player ("tracked");
 * only those count in trackedFinishedPct, and pairs with animations off are
 * left out of it. Old rows stay valid and still count in the raw columns.
 *
 * Pure: no DB, no clock of its own. Spec: tests/visual-usage.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";
import { istDayKey } from "@/lib/email/dueNudge";

export const VISUAL_ACTIONS = [
  "shown",
  "reached",
  "finished",
  "replayed",
  "opened_still",
  "chose_still",
  "chose_animated",
] as const;
export type VisualAction = (typeof VISUAL_ACTIONS)[number];

/** The extra facts the player sends with some actions (see the header). */
export type VisualDetail = {
  motion?: "full" | "reduced";
  steps?: number;
  step?: number;
  how?: "auto" | "tapped";
};

const MAX_STEPS = 50;
const DETAIL_KEYS = ["motion", "steps", "step", "how"] as const;
/** Which details each action may carry; any other is refused. */
const ALLOWED: Partial<Record<VisualAction, readonly (typeof DETAIL_KEYS)[number][]>> = {
  shown: ["motion", "steps"],
  reached: ["step"],
  finished: ["how"],
};

function intIn(v: unknown, lo: number, hi: number): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi;
}

/** The details of one event, checked against its action. */
function parseDetail(action: VisualAction, raw: Record<string, unknown>): { ok: true; value: VisualDetail } | { ok: false } {
  const allowed = ALLOWED[action] ?? [];
  const out: VisualDetail = {};
  for (const k of DETAIL_KEYS) {
    const v = raw[k];
    if (v === undefined) continue;
    if (!allowed.includes(k)) return { ok: false };
    if (k === "motion" && (v === "full" || v === "reduced")) out.motion = v;
    else if (k === "how" && (v === "auto" || v === "tapped")) out.how = v;
    else if (k === "steps" && intIn(v, 1, MAX_STEPS)) out.steps = v;
    else if (k === "step" && intIn(v, 2, MAX_STEPS)) out.step = v;
    else return { ok: false };
  }
  if (action === "reached" && out.step === undefined) return { ok: false };
  return { ok: true, value: out };
}

/** Every place a visual renders: the bank card's own surfaces (/browse and
 *  /questions, a /guide worked example, the question of the day; the reveal
 *  beacon's PRACTICE_SURFACES), the board readers, the drill, mock review,
 *  V's reply, and the back of a flashcard (2026-11-09). */
export const VISUAL_SURFACES = ["bank", "guide", "daily", "board", "drill", "mock", "v", "flashcards"] as const;
export type VisualSurface = (typeof VISUAL_SURFACES)[number];

const ACTION_SET: ReadonlySet<string> = new Set(VISUAL_ACTIONS);
const SURFACE_SET: ReadonlySet<string> = new Set(VISUAL_SURFACES);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SCENE_RE = /^[A-Za-z][A-Za-z0-9]{0,39}$/;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** The scene a stored visual names, for the event's metadata. */
export function sceneOf(visual: unknown): string {
  return isPlainObject(visual) && typeof visual.scene === "string" && SCENE_RE.test(visual.scene) ? visual.scene : "unknown";
}

export type ParseVisualEventResult = { ok: true; value: ActivityEvent } | { ok: false; error: string };

export function parseVisualEvent(raw: unknown, userId: string, now: Date): ParseVisualEventResult {
  if (!isPlainObject(raw)) return { ok: false, error: "Invalid event." };
  const { questionId, surface, action, scene } = raw;
  if (typeof questionId !== "string" || !UUID_RE.test(questionId)) return { ok: false, error: "Invalid question." };
  if (typeof surface !== "string" || !SURFACE_SET.has(surface)) return { ok: false, error: "Unknown surface." };
  if (typeof action !== "string" || !ACTION_SET.has(action)) return { ok: false, error: "Unknown action." };
  if (typeof scene !== "string" || !SCENE_RE.test(scene)) return { ok: false, error: "Invalid scene." };
  const detail = parseDetail(action as VisualAction, raw);
  if (!detail.ok) return { ok: false, error: "Invalid detail." };
  // One row per step reached, so step 2 and step 3 are both kept.
  const what = action === "reached" ? `reached:${detail.value.step}` : action;
  return {
    ok: true,
    value: {
      kind: "solution_visual",
      refId: questionId,
      refKind: "question",
      metadata: { surface, action, scene, ...detail.value },
      dedupeKey: `visual:${what}:${questionId}:${userId}:${istDayKey(now)}`,
    },
  };
}

/** One stored event, joined to its question's exam by the readout script. */
export type UsageRow = {
  userId: string;
  questionId: string;
  action: VisualAction;
  surface: VisualSurface;
  scene: string;
  exam: string;
  /** India day, YYYY-MM-DD. */
  day: string;
} & VisualDetail;

export type UsageGroupBy = "all" | "surface" | "exam" | "scene" | "day";

export type UsageGroup = {
  key: string;
  students: number;
  /** Student-question pairs with each action. */
  shown: number;
  finished: number;
  replayed: number;
  openedStill: number;
  choseStill: number;
  choseAnimated: number;
  /** finished / shown, whole percent; null when nothing was shown. A FLOOR
   *  for rows from before 2026-11-08 (see the header). */
  finishedPct: number | null;
  /** chose_still / shown, whole percent; null when nothing was shown. */
  stillPct: number | null;
  /** Pairs shown by the new player (its shown carried `motion`). */
  tracked: number;
  /** ...of which the phone had animations off. */
  animOff: number;
  /** Tracked pairs with animations on that reached the last step. */
  trackedFinished: number;
  /** ...of which the last step was reached by tapping. */
  tapped: number;
  /** trackedFinished / (tracked - animOff), whole percent; null when none. */
  trackedFinishedPct: number | null;
  /** Tracked pairs with animations on that did NOT finish, by the furthest
   *  step reached: "1/3" = stopped at step 1 of 3. */
  stoppedAt: Record<string, number>;
};

type CountField = "shown" | "finished" | "replayed" | "openedStill" | "choseStill" | "choseAnimated";
const FIELD: Partial<Record<VisualAction, CountField>> = {
  shown: "shown",
  finished: "finished",
  replayed: "replayed",
  opened_still: "openedStill",
  chose_still: "choseStill",
  chose_animated: "choseAnimated",
};

function pct(n: number, of: number): number | null {
  return of === 0 ? null : Math.round((100 * n) / of);
}

/** What one student-question pair did, across all its rows in the group. */
type Pair = {
  actions: Set<VisualAction>;
  tracked: boolean;
  animOff: boolean;
  steps: number;
  furthest: number;
  tapped: boolean;
};

export function summarizeVisualUsage(rows: readonly UsageRow[], by: UsageGroupBy): UsageGroup[] {
  const groups = new Map<string, { students: Set<string>; pairs: Map<string, Pair> }>();
  for (const r of rows) {
    const key = by === "all" ? "all" : r[by];
    let g = groups.get(key);
    if (!g) {
      g = { students: new Set(), pairs: new Map() };
      groups.set(key, g);
    }
    g.students.add(r.userId);
    const id = `${r.userId}:${r.questionId}`;
    let p = g.pairs.get(id);
    if (!p) {
      p = { actions: new Set(), tracked: false, animOff: false, steps: 0, furthest: 1, tapped: false };
      g.pairs.set(id, p);
    }
    p.actions.add(r.action);
    if (r.action === "shown" && r.motion) {
      p.tracked = true;
      if (r.motion === "reduced") p.animOff = true;
      if (r.steps) p.steps = Math.max(p.steps, r.steps);
    }
    if (r.action === "reached" && r.step) p.furthest = Math.max(p.furthest, r.step);
    if (r.action === "finished" && r.how === "tapped") p.tapped = true;
  }
  const out: UsageGroup[] = [...groups].map(([key, g]) => {
    const counts: Record<CountField, number> = { shown: 0, finished: 0, replayed: 0, openedStill: 0, choseStill: 0, choseAnimated: 0 };
    let tracked = 0;
    let animOff = 0;
    let trackedFinished = 0;
    let tapped = 0;
    const stoppedAt: Record<string, number> = {};
    for (const p of g.pairs.values()) {
      for (const a of p.actions) {
        const f = FIELD[a];
        if (f) counts[f]++;
      }
      if (!p.tracked || !p.actions.has("shown")) continue;
      tracked++;
      if (p.animOff) {
        animOff++;
        continue;
      }
      if (p.actions.has("finished")) {
        trackedFinished++;
        if (p.tapped) tapped++;
      } else {
        const at = `${p.furthest}/${p.steps || "?"}`;
        stoppedAt[at] = (stoppedAt[at] ?? 0) + 1;
      }
    }
    return {
      key,
      students: g.students.size,
      ...counts,
      finishedPct: pct(counts.finished, counts.shown),
      stillPct: pct(counts.choseStill, counts.shown),
      tracked,
      animOff,
      trackedFinished,
      tapped,
      trackedFinishedPct: pct(trackedFinished, tracked - animOff),
      stoppedAt,
    };
  });
  return by === "day"
    ? out.sort((a, b) => a.key.localeCompare(b.key))
    : out.sort((a, b) => b.shown - a.shown || b.students - a.students || a.key.localeCompare(b.key));
}
