/**
 * The board path's readout funnel (MENTOR_SPEC.md Phase 4, 2026-11-08): the
 * signals the 4-week readout needs and the path did not record.
 *
 *   - the start offer seen, on /me and on a /board chapter page;
 *   - a path student's line seen on /board, the weekly review and "Pick up
 *     here" seen, V's "My plan for today" opened;
 *   - Lighter / More, one `path_paced` row per tap with the minutes before and
 *     after (the path keeps only the current minutes).
 *
 * Views are `surface_viewed` rows (lib/activity/views), once per student per
 * surface per day; starting, stopping and "Not taught yet" were already rows
 * of their own (study_paths, study_path_deferrals). `npm run path:readout`
 * prints the funnel through summarizeFunnel.
 *
 * Pure. Spec: tests/path-funnel.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";

export const PATH_SURFACES = [
  "path_offer_me",
  "path_offer_board",
  "path_board_line",
  "path_review",
  "path_pickup",
  "v_path",
] as const;
export type PathSurface = (typeof PATH_SURFACES)[number];

/** One Lighter / More tap. No dedupe key: two taps are two changes. */
export function pacedEvent(direction: "lighter" | "more", from: number, to: number): ActivityEvent {
  return { kind: "path_paced", metadata: { direction, from: String(from), to: String(to) } };
}

export type FunnelInput = {
  views: readonly { user: string; surface: string; day: string }[];
  starts: readonly { user: string; at: string }[];
  paced: readonly { user: string; direction: "lighter" | "more"; from: number; to: number }[];
  deferrals: readonly { user: string; chapter: string }[];
  stops: number;
};

export type FunnelSummary = {
  offerSeen: { me: number; board: number; either: number };
  started: number;
  /** Starters who had seen the offer on or before the day they started. */
  startedAfterOffer: number;
  pace: { students: number; more: number; lighter: number; netMinutes: number };
  seen: { review: number; pickup: number; vCard: number; boardLine: number };
  deferrals: { taps: number; students: number; top: [string, number][] };
  stops: number;
};

const usersOf = (views: FunnelInput["views"], surfaces: readonly string[]) =>
  new Set(views.filter((v) => surfaces.includes(v.surface)).map((v) => v.user));

export function summarizeFunnel(input: FunnelInput): FunnelSummary {
  const me = usersOf(input.views, ["path_offer_me"]);
  const board = usersOf(input.views, ["path_offer_board"]);
  const either = new Set([...me, ...board]);
  const firstOffer = new Map<string, string>();
  for (const v of input.views) {
    if (v.surface !== "path_offer_me" && v.surface !== "path_offer_board") continue;
    const prev = firstOffer.get(v.user);
    if (!prev || v.day < prev) firstOffer.set(v.user, v.day);
  }
  const startedAfterOffer = input.starts.filter((s) => {
    const seen = firstOffer.get(s.user);
    return seen !== undefined && seen <= s.at.slice(0, 10);
  }).length;

  const byChapter = new Map<string, number>();
  for (const d of input.deferrals) byChapter.set(d.chapter, (byChapter.get(d.chapter) ?? 0) + 1);

  return {
    offerSeen: { me: me.size, board: board.size, either: either.size },
    started: new Set(input.starts.map((s) => s.user)).size,
    startedAfterOffer,
    pace: {
      students: new Set(input.paced.map((p) => p.user)).size,
      more: input.paced.filter((p) => p.direction === "more").length,
      lighter: input.paced.filter((p) => p.direction === "lighter").length,
      netMinutes: input.paced.reduce((n, p) => n + (p.to - p.from), 0),
    },
    seen: {
      review: usersOf(input.views, ["path_review"]).size,
      pickup: usersOf(input.views, ["path_pickup"]).size,
      vCard: usersOf(input.views, ["v_path"]).size,
      boardLine: usersOf(input.views, ["path_board_line"]).size,
    },
    deferrals: {
      taps: input.deferrals.length,
      students: new Set(input.deferrals.map((d) => d.user)).size,
      top: [...byChapter.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10),
    },
    stops: input.stops,
  };
}
