/**
 * The order of a daily homework plan (2026-10-09). Pure.
 *
 * Input is a reviewed repeat analysis: which questions are the SAME question
 * asked in more than one paper ("repeat" groups), and which are the same KIND
 * of question with new numbers ("type" groups). The output is days of perDay
 * questions in three parts:
 *
 *   1. Every repeat, highest count first, printed ONCE in its latest wording;
 *      its other wordings are never printed again.
 *   2. One example of each type, the latest question not already printed,
 *      highest count first. A type whose questions were all printed in part 1
 *      is skipped.
 *   3. Every remaining question, asked once: types first (highest count first,
 *      taking one question per type in turn), then the rest one chapter at a
 *      time in turn, so a day never fills up with one kind of question.
 *
 * Every question ends up printed, or is a wording of a printed repeat.
 * Spec: tests/homework-plan-order.test.ts.
 */

/**
 * One slot of a day. A case study is one slot holding its parts: `rows` lists
 * every part in order, the slot's own id first. A plain question has no rows.
 */
export type PlanQuestion = { id: string; sitting: string; chapter: string; rows?: string[] };

export type PlanGroup = {
  tier: "repeat" | "type";
  /** What the reviewer called it; not printed. */
  label: string;
  /** Papers that asked it; a trailing `*` means that paper changed a number. */
  sittings: string[];
  questionIds: string[];
  /** Wordings never to print as the example (one that also carries another question). */
  avoidAsExample?: string[];
};

export type PlanInput = {
  perDay: number;
  /** Every sitting, oldest first. */
  sittings: string[];
  questions: PlanQuestion[];
  groups: PlanGroup[];
};

export type PlanItem = {
  day: number;
  position: number;
  questionId: string;
  part: 1 | 2 | 3;
  /** Printed above the question. */
  note: string;
  /** Every bank row in the slot, in order: the question, or a case study's parts. */
  rows: string[];
};

const bare = (s: string) => s.replace(/\*$/, "");

export function buildPlanOrder(input: PlanInput): PlanItem[] {
  const sittingRank = new Map(input.sittings.map((s, i) => [s, i]));
  const byId = new Map(input.questions.map((x) => [x.id, x]));
  for (const x of input.questions) {
    if (!sittingRank.has(x.sitting)) throw new Error(`unknown sitting ${x.sitting} on question ${x.id}`);
    if (x.rows && x.rows[0] !== x.id) throw new Error(`the parts of ${x.id} must start with ${x.id}`);
  }
  for (const g of input.groups) {
    for (const s of g.sittings) if (!sittingRank.has(bare(s))) throw new Error(`unknown sitting ${s} in "${g.label}"`);
    for (const id of g.questionIds) if (!byId.has(id)) throw new Error(`unknown question ${id} in "${g.label}"`);
  }

  const rankOf = (id: string) => sittingRank.get(byId.get(id)!.sitting)!;
  const latestFirst = (ids: string[]) => [...ids].sort((a, b) => rankOf(b) - rankOf(a));
  const chrono = (g: PlanGroup) =>
    [...g.sittings].sort((a, b) => sittingRank.get(bare(a))! - sittingRank.get(bare(b))!);
  const lastOf = (g: PlanGroup) => Math.max(...g.sittings.map((s) => sittingRank.get(bare(s))!));
  const byWeight = (a: PlanGroup, b: PlanGroup) =>
    b.sittings.length - a.sittings.length || lastOf(b) - lastOf(a);

  const repeats = input.groups.filter((g) => g.tier === "repeat").sort(byWeight);
  const types = input.groups.filter((g) => g.tier === "type").sort(byWeight);
  const typeOf = new Map<string, PlanGroup>();
  for (const g of types) for (const id of g.questionIds) if (!typeOf.has(id)) typeOf.set(id, g);

  const used = new Set<string>();
  const order: Omit<PlanItem, "day" | "position" | "rows">[] = [];

  // Part 1
  for (const g of repeats) {
    const avoid = new Set(g.avoidAsExample ?? []);
    const open = latestFirst(g.questionIds).filter((id) => !used.has(id));
    const pick = open.find((id) => !avoid.has(id)) ?? open[0];
    if (pick === undefined) continue;
    const list = chrono(g);
    const star = list.some((s) => s.endsWith("*")) ? " (* = numbers or wording changed that year)" : "";
    order.push({ questionId: pick, part: 1, note: `Asked ${list.length} times: ${list.join(", ")}${star}` });
    used.add(pick);
  }
  for (const g of repeats) for (const id of g.questionIds) used.add(id);

  // Part 2
  for (const g of types) {
    const pick = latestFirst(g.questionIds).find((id) => !used.has(id));
    if (pick === undefined) continue;
    order.push({
      questionId: pick,
      part: 2,
      note: `This type asked ${g.sittings.length} times: ${chrono(g).join(", ")}. This one: ${byId.get(pick)!.sitting}`,
    });
    used.add(pick);
  }

  // Part 3
  const rest = input.questions.map((x) => x.id).filter((id) => !used.has(id));
  const roundRobin = (keys: string[], keyOf: (id: string) => string, ids: string[]) => {
    const queues = keys.map((k) => latestFirst(ids.filter((id) => keyOf(id) === k)));
    const out: string[] = [];
    while (queues.some((qu) => qu.length)) for (const qu of queues) if (qu.length) out.push(qu.shift()!);
    return out;
  };
  const typed = roundRobin(
    types.map((g) => g.label),
    (id) => typeOf.get(id)?.label ?? "",
    rest.filter((id) => typeOf.has(id))
  );
  const untypedIds = rest.filter((id) => !typeOf.has(id));
  const chapters = [...new Set(untypedIds.map((id) => byId.get(id)!.chapter))].sort();
  const untyped = roundRobin(chapters, (id) => byId.get(id)!.chapter, untypedIds);
  for (const id of [...typed, ...untyped]) {
    const g = typeOf.get(id);
    order.push({
      questionId: id,
      part: 3,
      note: `Asked once: ${byId.get(id)!.sitting}` + (g ? ` (same type asked ${g.sittings.length} times)` : ""),
    });
  }

  return order.map((o, n) => ({
    ...o,
    rows: byId.get(o.questionId)!.rows ?? [o.questionId],
    day: Math.floor(n / input.perDay) + 1,
    position: (n % input.perDay) + 1,
  }));
}
