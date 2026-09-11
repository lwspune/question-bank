import { XI_MATHS_PLAN } from "@/app/dashboard/planner/_data/xi-maths";
import type { SessionPlan } from "./types";

/**
 * Every session plan the app can render.
 *
 * A plan is authored TS, not a database row, for the same reason the `/notes`
 * chapters are: cut points are editorial judgement that belongs under review in
 * a pull request, and there is no admin who edits them in production today.
 * When teachers need to move a boundary themselves this becomes a table and
 * this array becomes the seed — the `id` on each session is what makes that
 * migration possible without detaching a single teaching note.
 */
export const SESSION_PLANS: SessionPlan[] = [XI_MATHS_PLAN];

/** The plan `/dashboard/planner` opens on. */
export const DEFAULT_PLAN_KEY = XI_MATHS_PLAN.key;

/**
 * Resolve a URL segment. Null for anything unmapped so the route can 404 —
 * falling back to the default would serve the Maths plan under another
 * subject's URL and read as a claim that subject had been planned.
 */
export function resolvePlan(key: string | undefined): SessionPlan | null {
  if (!key) return null;
  const k = key.trim().toLowerCase();
  return SESSION_PLANS.find((p) => p.key === k) ?? null;
}
