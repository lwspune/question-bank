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
 *   finished        a run played every step to the end
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
 * Pure: no DB, no clock of its own. Spec: tests/visual-usage.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";
import { istDayKey } from "@/lib/email/dueNudge";

export const VISUAL_ACTIONS = ["shown", "finished", "replayed", "opened_still", "chose_still", "chose_animated"] as const;
export type VisualAction = (typeof VISUAL_ACTIONS)[number];

/** Every place a visual renders: the bank card's own surfaces (/browse and
 *  /questions, a /guide worked example, the question of the day; the reveal
 *  beacon's PRACTICE_SURFACES), the board readers, the drill, mock review, and
 *  V's reply. */
export const VISUAL_SURFACES = ["bank", "guide", "daily", "board", "drill", "mock", "v"] as const;
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
  return {
    ok: true,
    value: {
      kind: "solution_visual",
      refId: questionId,
      refKind: "question",
      metadata: { surface, action, scene },
      dedupeKey: `visual:${action}:${questionId}:${userId}:${istDayKey(now)}`,
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
};

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
  /** finished / shown, whole percent; null when nothing was shown. */
  finishedPct: number | null;
  /** chose_still / shown, whole percent; null when nothing was shown. */
  stillPct: number | null;
};

const FIELD: Record<VisualAction, keyof Pick<UsageGroup, "shown" | "finished" | "replayed" | "openedStill" | "choseStill" | "choseAnimated">> = {
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

export function summarizeVisualUsage(rows: readonly UsageRow[], by: UsageGroupBy): UsageGroup[] {
  const groups = new Map<string, { students: Set<string>; pairs: Record<VisualAction, Set<string>> }>();
  for (const r of rows) {
    const key = by === "all" ? "all" : r[by];
    let g = groups.get(key);
    if (!g) {
      g = {
        students: new Set(),
        pairs: Object.fromEntries(VISUAL_ACTIONS.map((a) => [a, new Set<string>()])) as Record<VisualAction, Set<string>>,
      };
      groups.set(key, g);
    }
    g.students.add(r.userId);
    g.pairs[r.action].add(`${r.userId}:${r.questionId}`);
  }
  const out: UsageGroup[] = [...groups].map(([key, g]) => {
    const counts = Object.fromEntries(VISUAL_ACTIONS.map((a) => [FIELD[a], g.pairs[a].size])) as Record<
      (typeof FIELD)[VisualAction],
      number
    >;
    return {
      key,
      students: g.students.size,
      ...counts,
      finishedPct: pct(counts.finished, counts.shown),
      stillPct: pct(counts.choseStill, counts.shown),
    };
  });
  return by === "day"
    ? out.sort((a, b) => a.key.localeCompare(b.key))
    : out.sort((a, b) => b.shown - a.shown || b.students - a.students || a.key.localeCompare(b.key));
}
