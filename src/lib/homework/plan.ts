/**
 * The order of a daily homework plan (2026-10-09). Pure.
 *
 * Input is a reviewed repeat analysis: which questions are the SAME question
 * asked in more than one paper ("repeat" groups), and which are the same KIND
 * of question with new numbers ("type" groups). The output is days of perDay
 * questions:
 *
 *   First, repeats and types RANKED TOGETHER by how often they were asked
 *   (2026-11-04, owner; until then every repeat came before every type, so in
 *   NDA a type asked 8 times sat behind repeats asked twice). On a tie the
 *   exact repeat comes first, then the one asked most recently.
 *   - A repeat (part 1) is printed ONCE in its latest wording; its other
 *     wordings are never printed again.
 *   - A type (part 2) prints one example, its latest question not already
 *     printed. When that example is a wording of a repeat, it is printed as the
 *     type and the repeat's other wordings are never printed. A type whose
 *     questions were all printed is skipped.
 *   Then (part 3) every remaining question, asked once: types first (highest
 *   count first, taking one question per type in turn), then the rest one
 *   chapter at a time in turn, so a day never fills up with one kind of question.
 *
 * Each slot records the group it stands for (its index in the input), so a page
 * can list every question of that group.
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
  /** The group this slot stands for (its index in the input's groups), or none for a question asked once with no type. */
  group?: number;
};

const bare = (s: string) => s.replace(/\*$/, "");

/** The database caps a note at 300 characters (migration 0143). */
const NOTE_MAX = 300;

/** "5 in 2023, 4 in 2024": papers counted by year, oldest first, for a list too long to print whole. */
function byYear(list: readonly string[]): string {
  const counts = new Map<string, number>();
  for (const s of list) {
    const year = /\d{4}/.exec(s)?.[0] ?? s;
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return [...counts].map(([year, n]) => `${n} in ${year}`).join(", ");
}

function typeNote(count: number, list: readonly string[], shown: string): string {
  const full = `This type asked ${count} times: ${list.join(", ")}. This one: ${shown}`;
  return full.length <= NOTE_MAX ? full : `This type asked ${count} times: ${byYear(list)}. This one: ${shown}`;
}

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

  const indexOf = new Map(input.groups.map((g, i) => [g, i]));
  const types = input.groups.filter((g) => g.tier === "type").sort(byWeight);
  const typeOf = new Map<string, PlanGroup>();
  for (const g of types) for (const id of g.questionIds) if (!typeOf.has(id)) typeOf.set(id, g);
  const repeatOf = new Map<string, PlanGroup>();
  for (const g of input.groups) if (g.tier === "repeat") for (const id of g.questionIds) if (!repeatOf.has(id)) repeatOf.set(id, g);
  // One ranking: count, then an exact repeat before a type, then the latest asked.
  const ranked = [...input.groups].sort(
    (a, b) =>
      b.sittings.length - a.sittings.length ||
      (a.tier === "repeat" ? 0 : 1) - (b.tier === "repeat" ? 0 : 1) ||
      lastOf(b) - lastOf(a)
  );

  const used = new Set<string>();
  const order: Omit<PlanItem, "day" | "position" | "rows">[] = [];

  // Parts 1 and 2, interleaved by the ranking.
  for (const g of ranked) {
    if (g.tier === "repeat") {
      const avoid = new Set(g.avoidAsExample ?? []);
      const open = latestFirst(g.questionIds).filter((id) => !used.has(id));
      const pick = open.find((id) => !avoid.has(id)) ?? open[0];
      if (pick === undefined) continue;
      const list = chrono(g);
      const changed = list.some((s) => s.endsWith("*"));
      const star = changed ? " (* = numbers or wording changed that year)" : "";
      let note = `Asked ${list.length} times: ${list.join(", ")}${star}`;
      // MHT-CET has 69 shifts: a long list is summarised by year (the See all page lists every paper).
      if (note.length > NOTE_MAX) {
        note = `Asked ${list.length} times: ${byYear(list)}${changed ? " (numbers or wording changed in some)" : ""}`;
      }
      order.push({ questionId: pick, part: 1, note, group: indexOf.get(g)! });
      // Its other wordings are never printed.
      for (const id of g.questionIds) used.add(id);
    } else {
      const pick = latestFirst(g.questionIds).find((id) => !used.has(id));
      if (pick === undefined) continue;
      order.push({
        questionId: pick,
        part: 2,
        note: typeNote(g.sittings.length, chrono(g), byId.get(pick)!.sitting),
        group: indexOf.get(g)!,
      });
      used.add(pick);
      // Printed as the type: a repeat it belongs to is never printed again.
      for (const id of repeatOf.get(pick)?.questionIds ?? []) used.add(id);
    }
  }

  // Part 3
  const rest = input.questions.map((x) => x.id).filter((id) => !used.has(id));
  const roundRobin = <K,>(keys: K[], keyOf: (id: string) => K, ids: string[]) => {
    const queues = keys.map((k) => latestFirst(ids.filter((id) => keyOf(id) === k)));
    const out: string[] = [];
    while (queues.some((qu) => qu.length)) for (const qu of queues) if (qu.length) out.push(qu.shift()!);
    return out;
  };
  // Keyed by the group, not its label: two chapters can name a type alike.
  const typed = roundRobin(types, (id) => typeOf.get(id), rest.filter((id) => typeOf.has(id)));
  const untypedIds = rest.filter((id) => !typeOf.has(id));
  const chapters = [...new Set(untypedIds.map((id) => byId.get(id)!.chapter))].sort();
  const untyped = roundRobin(chapters, (id) => byId.get(id)!.chapter, untypedIds);
  for (const id of [...typed, ...untyped]) {
    const g = typeOf.get(id);
    order.push({
      questionId: id,
      part: 3,
      note: `Asked once: ${byId.get(id)!.sitting}` + (g ? ` (same type asked ${g.sittings.length} times)` : ""),
      ...(g ? { group: indexOf.get(g)! } : {}),
    });
  }

  return order.map((o, n) => ({
    ...o,
    rows: byId.get(o.questionId)!.rows ?? [o.questionId],
    day: Math.floor(n / input.perDay) + 1,
    position: (n % input.perDay) + 1,
  }));
}
