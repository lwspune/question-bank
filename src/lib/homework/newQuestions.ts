/**
 * A new paper into an existing homework plan (2026-11-06). Pure.
 *
 * A plan file (scripts/homework/data/*.json) names every PUBLIC past question of
 * its subject: printed, or left out on purpose. A later ingest adds questions the
 * file has never seen. `unplannedIds` finds them (the daily prod check and
 * homework:build both ask it, so the two cannot disagree); `mergeNewQuestions`
 * folds a reviewer's decisions about them into the file, so the plan is rebuilt
 * without re-reviewing the chapters it already has.
 *
 * Rebuild rule (owner, 2026-11-06): rebuild freely. The whole order is ranked
 * again, so a day's questions can change; students' marks are per question, so
 * nothing they did is lost.
 *
 * Spec: tests/homework-new-questions.test.ts.
 */
import type { PlanGroup } from "./plan";
import { compareSittings } from "./sittings";

/** The fields of a plan file these helpers read; the rest pass through. */
export type PlanFileShape = {
  sittings: string[];
  questions: { id: string; sitting: string; rows?: string[] }[];
  excluded?: string[];
  excludedChapters?: string[];
  excludedQuestions?: { id: string; reason: string }[];
  groups: PlanGroup[];
};

/** A new question as homework:new found it: one slot (a case study = its parts). */
export type NewSlot = { id: string; sitting: string; chapter: string; rows?: string[] };

/**
 * A reviewer's decisions for one chapter's new questions. `repeat` / `type` is
 * the index of an existing group in the plan file. `changed` (a repeat member
 * only): this wording's numbers differ from the group's newest member.
 */
export type NewDecisions = {
  chapter: string;
  attach?: { id: string; repeat?: number; type?: number; changed?: boolean }[];
  newRepeats?: { label: string; members: { id: string; changed: boolean }[] }[];
  newTypes?: { label: string; members: string[] }[];
}[];

/** Every bank row the file covers: printed questions (case-study parts too) and rows left out. */
export function planFileIds(plan: Pick<PlanFileShape, "questions" | "excluded">): Set<string> {
  return new Set([...plan.questions.flatMap((q) => q.rows ?? [q.id]), ...(plan.excluded ?? [])]);
}

/** The PUBLIC past questions of the plan's subject that the file has never seen, in the order given. */
export function unplannedIds(plan: Pick<PlanFileShape, "questions" | "excluded">, publicIds: readonly string[]): string[] {
  const covered = planFileIds(plan);
  return publicIds.filter((id) => !covered.has(id));
}

const base = (s: string) => s.replace(/\*$/, "");
const bySitting = (a: string, b: string) => compareSittings(base(a), base(b));

/** Fold new questions and the decisions about them into a copy of the plan file. Throws on any decision that would break it. */
export function mergeNewQuestions<T extends PlanFileShape>(plan: T, slots: readonly NewSlot[], decisions: NewDecisions): T {
  const out = structuredClone(plan) as T;
  const leftOutChapters = new Set(out.excludedChapters ?? []);
  const kept = slots.filter((s) => !leftOutChapters.has(s.chapter));
  const newIds = new Set(kept.map((s) => s.id));
  const sittingOf = new Map<string, string>([
    ...out.questions.map((q) => [q.id, q.sitting] as [string, string]),
    ...kept.map((s) => [s.id, s.sitting] as [string, string]),
  ]);

  // A new question in a chapter the plan leaves out is excluded, as the chapter's others are.
  for (const s of slots.filter((s) => leftOutChapters.has(s.chapter))) {
    out.excluded = [...(out.excluded ?? []), ...(s.rows ?? [s.id])];
    out.excludedQuestions = [
      ...(out.excludedQuestions ?? []),
      { id: s.id, reason: `in ${s.chapter}, a chapter this plan leaves out` },
    ];
  }
  for (const s of kept) out.questions.push({ id: s.id, sitting: s.sitting, ...(s.rows && s.rows.length > 1 ? { rows: s.rows } : {}) });

  const inRepeat = new Map<string, string>();
  const inType = new Map<string, string>();
  for (const g of out.groups) for (const id of g.questionIds) (g.tier === "repeat" ? inRepeat : inType).set(id, g.label);

  const needNew = (id: string) => {
    if (!newIds.has(id)) throw new Error(`${id} is not a new question in this plan`);
  };
  const groupAt = (i: number, tier: "repeat" | "type") => {
    const g = out.groups[i];
    if (!g) throw new Error(`no group ${i} in this plan`);
    if (g.tier !== tier) throw new Error(`group ${i} is a ${g.tier}, not a ${tier}`);
    return g;
  };

  for (const d of decisions) {
    for (const a of d.attach ?? []) {
      needNew(a.id);
      const sitting = sittingOf.get(a.id)!;
      if (a.repeat !== undefined) {
        const g = groupAt(a.repeat, "repeat");
        if (typeof a.changed !== "boolean") throw new Error(`${a.id}: a repeat member needs "changed" (true or false)`);
        if (inRepeat.has(a.id)) throw new Error(`${a.id} is already in repeat "${inRepeat.get(a.id)}"`);
        joinRepeat(g, a.id, sitting, a.changed);
        inRepeat.set(a.id, g.label);
      }
      if (a.type !== undefined) {
        const g = groupAt(a.type, "type");
        if (inType.has(a.id)) throw new Error(`${a.id} is already in type "${inType.get(a.id)}"`);
        g.questionIds.push(a.id);
        if (!g.sittings.some((s) => base(s) === sitting)) g.sittings = [...g.sittings, sitting].sort(bySitting);
        inType.set(a.id, g.label);
      }
    }

    for (const r of d.newRepeats ?? []) {
      const ids = r.members.map((m) => m.id);
      checkNewGroup("repeat", r.label, ids, newIds, sittingOf);
      for (const id of ids) if (inRepeat.has(id)) throw new Error(`${id} is already in repeat "${inRepeat.get(id)}"`);
      // A sitting is starred when every member from it had its numbers changed.
      const star = new Map<string, boolean>();
      for (const m of r.members) {
        const s = sittingOf.get(m.id)!;
        star.set(s, (star.get(s) ?? true) && m.changed);
      }
      const sittings = [...star.keys()].sort(compareSittings).map((s) => (star.get(s) ? `${s}*` : s));
      out.groups.push({ tier: "repeat", label: r.label, sittings, questionIds: ids });
      for (const id of ids) inRepeat.set(id, r.label);
    }

    for (const t of d.newTypes ?? []) {
      checkNewGroup("type", t.label, t.members, newIds, sittingOf);
      for (const id of t.members) if (inType.has(id)) throw new Error(`${id} is already in type "${inType.get(id)}"`);
      const sittings = [...new Set(t.members.map((id) => sittingOf.get(id)!))].sort(compareSittings);
      out.groups.push({ tier: "type", label: t.label, sittings, questionIds: [...t.members] });
      for (const id of t.members) inType.set(id, t.label);
    }
  }

  out.sittings = [...new Set([...out.sittings, ...kept.map((s) => s.sitting)])].sort(compareSittings);
  return out;
}

function checkNewGroup(
  tier: string,
  label: string,
  ids: readonly string[],
  newIds: ReadonlySet<string>,
  sittingOf: ReadonlyMap<string, string>
): void {
  for (const id of ids) if (!sittingOf.has(id)) throw new Error(`${tier} "${label}": ${id} is not in this plan`);
  if (!ids.some((id) => newIds.has(id))) {
    throw new Error(`${tier} "${label}" has no new question: regrouping old questions needs a full review`);
  }
  const n = new Set(ids.map((id) => sittingOf.get(id))).size;
  if (n < 2) throw new Error(`${tier} "${label}" spans ${n} sitting(s); a group needs two`);
}

/**
 * Add a wording to a repeat. `changed` = its numbers differ from the group's
 * newest member. When it is the new newest and changed, the sittings that
 * matched the old newest (unstarred) now differ from the newest: star them.
 */
function joinRepeat(g: PlanGroup, id: string, sitting: string, changed: boolean): void {
  g.questionIds.push(id);
  const at = g.sittings.findIndex((s) => base(s) === sitting);
  if (at >= 0) {
    // Another wording from the same sitting: starred only while every one changed.
    if (!changed) g.sittings[at] = sitting;
    return;
  }
  const newest = g.sittings.map(base).sort(compareSittings).at(-1)!;
  if (compareSittings(sitting, newest) > 0) {
    if (changed) g.sittings = g.sittings.map((s) => (s.endsWith("*") ? s : `${s}*`));
    g.sittings = [...g.sittings, sitting];
  } else {
    g.sittings = [...g.sittings, changed ? `${sitting}*` : sitting];
  }
  g.sittings.sort(bySitting);
}
