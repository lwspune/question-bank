/**
 * A family built from a blood-relations question's statements (owner,
 * 2026-10-31), and the questions the family-tree scene asks it. Pure.
 *
 * Statements come as three facts: `parent` (a is b's parent), `spouse` and
 * `sibling`. The family then follows the conventions the exam assumes: a
 * spouse shares the other spouse's children, siblings share their parents,
 * and children of one parent are siblings. A person never has more than two
 * parents, and spouses or a child's two parents are never the same sex.
 *
 * An option is read by FOLLOWING it: from one person, a chain of steps
 * (father, then sister, ...) gives a set of people, and the option holds when
 * the other person is in it. Standard words (uncle, sister-in-law) are each
 * defined here once as the chains they may mean. A sex that is not stated
 * matches no gendered step: the scene tries each possible sex instead.
 */

export type Sex = "m" | "f" | "?";
export interface Person {
  id: string;
  sex: Sex;
}
export interface Fact {
  rel: "parent" | "spouse" | "sibling";
  a: string;
  b: string;
}
export type Step = "father" | "mother" | "parent" | "son" | "daughter" | "child" | "brother" | "sister" | "sibling" | "husband" | "wife" | "spouse";
export type Meaning = { rel: string } | { chain: Step[] } | { any: Meaning[] } | { self: true };

export class KinError extends Error {}

export interface Family {
  ids: string[];
  sex: Map<string, Sex>;
  parents: Map<string, Set<string>>;
  children: Map<string, Set<string>>;
  spouses: Map<string, Set<string>>;
  siblings: Map<string, Set<string>>;
}

export const STEPS: readonly Step[] = ["father", "mother", "parent", "son", "daughter", "child", "brother", "sister", "sibling", "husband", "wife", "spouse"];

/** Each word an option may use, as the chains (from the asked-about person) it may mean. */
export const TERMS: Record<string, Step[][]> = {
  father: [["father"]],
  mother: [["mother"]],
  parent: [["parent"]],
  son: [["son"]],
  daughter: [["daughter"]],
  child: [["child"]],
  brother: [["brother"]],
  sister: [["sister"]],
  sibling: [["sibling"]],
  husband: [["husband"]],
  wife: [["wife"]],
  spouse: [["spouse"]],
  grandfather: [["parent", "father"]],
  grandmother: [["parent", "mother"]],
  grandparent: [["parent", "parent"]],
  grandson: [["child", "son"]],
  granddaughter: [["child", "daughter"]],
  grandchild: [["child", "child"]],
  "paternal grandfather": [["father", "father"]],
  "paternal grandmother": [["father", "mother"]],
  "maternal grandfather": [["mother", "father"]],
  "maternal grandmother": [["mother", "mother"]],
  uncle: [["parent", "brother"], ["parent", "sister", "husband"]],
  "paternal uncle": [["father", "brother"]],
  "maternal uncle": [["mother", "brother"]],
  aunt: [["parent", "sister"], ["parent", "brother", "wife"]],
  "paternal aunt": [["father", "sister"]],
  "maternal aunt": [["mother", "sister"]],
  nephew: [["sibling", "son"], ["spouse", "sibling", "son"]],
  niece: [["sibling", "daughter"], ["spouse", "sibling", "daughter"]],
  cousin: [["parent", "sibling", "child"]],
  "father-in-law": [["spouse", "father"]],
  "mother-in-law": [["spouse", "mother"]],
  "son-in-law": [["daughter", "husband"]],
  "daughter-in-law": [["son", "wife"]],
  "brother-in-law": [["spouse", "brother"], ["sister", "husband"]],
  "sister-in-law": [["spouse", "sister"], ["brother", "wife"]],
};

const add = (m: Map<string, Set<string>>, k: string, v: string) => {
  const s = m.get(k)!;
  if (s.has(v)) return false;
  s.add(v);
  return true;
};

export function buildFamily(people: readonly Person[], facts: readonly Fact[]): Family {
  const ids = people.map((p) => p.id);
  if (new Set(ids).size !== ids.length) throw new KinError("a person is listed twice");
  const empty = () => new Map(ids.map((id) => [id, new Set<string>()]));
  const f: Family = { ids, sex: new Map(people.map((p) => [p.id, p.sex])), parents: empty(), children: empty(), spouses: empty(), siblings: empty() };
  for (const x of facts) {
    for (const id of [x.a, x.b]) if (!f.sex.has(id)) throw new KinError(`${id} is not among the people`);
    if (x.a === x.b) throw new KinError(`${x.a} cannot be their own ${x.rel}`);
    if (x.rel === "parent") {
      add(f.parents, x.b, x.a);
      add(f.children, x.a, x.b);
    } else {
      const m = x.rel === "spouse" ? f.spouses : f.siblings;
      add(m, x.a, x.b);
      add(m, x.b, x.a);
    }
  }
  // The exam's conventions, to a fixed point.
  const parentOf = (p: string, c: string) => [add(f.parents, c, p), add(f.children, p, c)].some(Boolean);
  const siblingsOf = (x: string, y: string) => [add(f.siblings, x, y), add(f.siblings, y, x)].some(Boolean);
  for (let changed = true; changed; ) {
    changed = false;
    for (const a of ids) {
      for (const b of f.spouses.get(a)!) for (const c of [...f.children.get(a)!]) if (parentOf(b, c)) changed = true;
      // Siblings are one group: everyone's siblings are everyone else's, and they share parents.
      for (const b of [...f.siblings.get(a)!]) {
        for (const c of [...f.siblings.get(b)!]) if (c !== a && siblingsOf(a, c)) changed = true;
        for (const p of [...f.parents.get(a)!]) if (parentOf(p, b)) changed = true;
      }
      const kids = [...f.children.get(a)!];
      for (const x of kids) for (const y of kids) if (x !== y && siblingsOf(x, y)) changed = true;
    }
  }
  for (const id of ids) {
    const ps = [...f.parents.get(id)!];
    if (ps.length > 2) throw new KinError(`${id} would have ${ps.length} parents`);
    if (ps.length === 2 && f.sex.get(ps[0]) !== "?" && f.sex.get(ps[0]) === f.sex.get(ps[1])) throw new KinError(`${id}'s two parents are the same sex`);
    for (const s of f.spouses.get(id)!) if (f.sex.get(id) !== "?" && f.sex.get(id) === f.sex.get(s)) throw new KinError(`${id} and ${s} are married but the same sex`);
    if (f.spouses.get(id)!.has(id) || f.parents.get(id)!.has(id)) throw new KinError(`${id} is their own relative`);
  }
  return f;
}

const STEP_SEX: Partial<Record<Step, "m" | "f">> = { father: "m", son: "m", brother: "m", husband: "m", mother: "f", daughter: "f", sister: "f", wife: "f" };

function stepOnce(f: Family, from: string, step: Step): string[] {
  const kind = /father|mother|parent/.test(step) ? f.parents : /son|daughter|child/.test(step) ? f.children : /brother|sister|sibling/.test(step) ? f.siblings : f.spouses;
  const want = STEP_SEX[step];
  return [...kind.get(from)!].filter((id) => !want || f.sex.get(id) === want);
}

/** Everyone reached from `from` by the chain of steps. */
export function follow(f: Family, from: string, chain: readonly Step[]): Set<string> {
  let at = new Set([from]);
  for (const step of chain) {
    if (!STEPS.includes(step)) throw new KinError(`unknown step ${step}`);
    const next = new Set<string>();
    for (const id of at) for (const n of stepOnce(f, id, step)) next.add(n);
    at = next;
  }
  return at;
}

export const normTerm = (t: string) => t.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'");

/** Whether `who` is `of`'s <meaning> in this family. */
export function holds(f: Family, who: string, of: string, m: Meaning): boolean {
  if ("self" in m) return who === of;
  if ("any" in m) return m.any.some((x) => holds(f, who, of, x));
  if ("chain" in m) return follow(f, of, m.chain).has(who);
  const chains = TERMS[normTerm(m.rel)];
  if (!chains) throw new KinError(`unknown relation "${m.rel}"`);
  return chains.some((c) => follow(f, of, c).has(who));
}

const NAMED: Record<string, [Step, Step, Step]> = { parents: ["father", "mother", "parent"], children: ["son", "daughter", "child"], siblings: ["brother", "sister", "sibling"], spouses: ["husband", "wife", "spouse"] };

/** The shortest route from `from` to `to`, each step named by the sex of the person it reaches. */
export function pathBetween(f: Family, from: string, to: string): { to: string; step: Step }[] {
  const prev = new Map<string, { from: string; step: Step }>([[from, { from, step: "parent" }]]);
  const queue = [from];
  while (queue.length) {
    const at = queue.shift()!;
    if (at === to) break;
    for (const kind of ["spouses", "parents", "siblings", "children"] as const) {
      for (const n of [...f[kind].get(at)!].sort()) {
        if (prev.has(n)) continue;
        const [m, w, x] = NAMED[kind];
        const s = f.sex.get(n);
        prev.set(n, { from: at, step: s === "m" ? m : s === "f" ? w : x });
        queue.push(n);
      }
    }
  }
  if (!prev.has(to)) return [];
  const out: { to: string; step: Step }[] = [];
  for (let at = to; at !== from; at = prev.get(at)!.from) out.unshift({ to: at, step: prev.get(at)!.step });
  return out;
}
