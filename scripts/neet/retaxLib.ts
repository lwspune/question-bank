/**
 * Pure core of scripts/neet/retax.ts: move NEET rows (PYQ or practice) to another
 * subject / chapter / subtopic, in the bank AND in the row's source JSON.
 *
 * Why both: `content_hash` leaves out taxonomy, so a re-commit from source dedups
 * against the existing row and never moves it; but a source file that still says
 * the old chapter is the source of record, and the next rebuild from it (homework
 * prep, a re-ingest after a reset) would put the row back. Spec: tests/neet-retax.test.ts.
 */

export type Target = { subject: string; chapter: string; subtopic: string };
export type Move = Target & { id: string; why: string };
export type RowNow = Target & { id: string; sourceFile: string; number: string };
export type Change = { id: string; sourceFile: string; number: string; from: Target; to: Target; why: string };

export function planMoves(
  moves: Move[],
  rows: RowNow[],
  catalog: Record<string, readonly string[]>
): { errors: string[]; changes: Change[]; unchanged: string[] } {
  const errors: string[] = [];
  const changes: Change[] = [];
  const unchanged: string[] = [];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const seen = new Set<string>();

  for (const m of moves) {
    if (seen.has(m.id)) {
      errors.push(`${m.id}: listed more than once`);
      continue;
    }
    seen.add(m.id);
    const r = byId.get(m.id);
    if (!r) {
      errors.push(`${m.id}: not found among NEET rows`);
      continue;
    }
    const subtopic = m.subtopic.trim();
    if (!subtopic) {
      errors.push(`${m.id}: empty subtopic`);
      continue;
    }
    const list = catalog[m.subject];
    if (!list) {
      errors.push(`${m.id}: unknown subject "${m.subject}"`);
      continue;
    }
    if (!list.includes(m.chapter)) {
      errors.push(`${m.id}: chapter "${m.chapter}" is not in the ${m.subject} catalog`);
      continue;
    }
    const to = { subject: m.subject, chapter: m.chapter, subtopic };
    if (r.subject === to.subject && r.chapter === to.chapter && r.subtopic === to.subtopic) {
      unchanged.push(r.id);
      continue;
    }
    changes.push({
      id: r.id,
      sourceFile: r.sourceFile,
      number: r.number,
      from: { subject: r.subject, chapter: r.chapter, subtopic: r.subtopic },
      to,
      why: m.why,
    });
  }
  return { errors, changes, unchanged };
}

/** Which data folder and file prefix hold a row's source entry; null when no JSON source is known. */
export function sourceKeyFor(
  sourceFile: string,
  neetPapers: Record<string, string>,
  parikshaTests: Record<string, string>
): { lane: "neet" | "pariksha"; prefix: string } | null {
  for (const [id, f] of Object.entries(neetPapers)) if (f === sourceFile) return { lane: "neet", prefix: `${id}.` };
  for (const [id, f] of Object.entries(parikshaTests)) if (f === sourceFile) return { lane: "pariksha", prefix: `${id}.` };
  return null;
}

type Entry = { number: number | string; subject?: string; chapter?: string; subtopic?: string; stem?: string };
export const isQuestionFile = (v: unknown): v is Entry[] =>
  Array.isArray(v) && v.length > 0 && v.every((e) => e && typeof e === "object" && "number" in e && "chapter" in e && "stem" in e);

/**
 * Rewrite the entry with this question number. `files` maps file name -> parsed JSON
 * (one paper's or test's files); only arrays of question entries are considered.
 * Returns ONLY the files that changed, and how many entries matched (the caller
 * refuses anything but 1).
 */
export function updateSourceEntries(
  files: Record<string, unknown>,
  number: string,
  to: Target
): { updated: Record<string, Entry[]>; matched: number } {
  const updated: Record<string, Entry[]> = {};
  let matched = 0;
  for (const [name, json] of Object.entries(files)) {
    if (!isQuestionFile(json)) continue;
    let hit = false;
    const next = json.map((e) => {
      if (String(e.number) !== number) return e;
      matched++;
      hit = true;
      return { ...e, subject: to.subject, chapter: to.chapter, subtopic: to.subtopic };
    });
    if (hit) updated[name] = next;
  }
  return { updated, matched };
}

/**
 * A notes re-cut plan, as an agent writes it: page name -> space-separated 8-character id
 * prefixes, plus rows that belong to another chapter. Every row of the chapter's dump must be
 * placed exactly once (practice rows included: they share the subtopics).
 */
export type RecutPlan = {
  /** The chapter dump in generated-papers/ (`_cdsk_<code>.json`). */
  dump?: string;
  subject: string;
  chapter: string;
  pages: Record<string, string>;
  refile?: Record<string, Target & { why: string }>;
};

export function planToMoves(plan: RecutPlan, dumpRows: { id: string }[]): { errors: string[]; moves: Move[] } {
  const errors: string[] = [];
  const byPrefix = new Map(dumpRows.map((r) => [r.id.slice(0, 8), r.id]));
  if (byPrefix.size !== dumpRows.length) errors.push("two dump rows share an 8-character prefix: place them by full id");
  const placed = new Map<string, Move>();
  const place = (prefix: string, m: Omit<Move, "id">) => {
    const id = byPrefix.get(prefix);
    if (!id) return errors.push(`${prefix}: not in the dump`);
    if (placed.has(prefix)) return errors.push(`${prefix}: placed more than once`);
    placed.set(prefix, { id, ...m });
  };
  for (const [page, list] of Object.entries(plan.pages)) {
    for (const p of list.split(/\s+/).filter(Boolean)) {
      place(p, { subject: plan.subject, chapter: plan.chapter, subtopic: page, why: "notes re-cut" });
    }
  }
  for (const [p, t] of Object.entries(plan.refile ?? {})) place(p, t);
  for (const prefix of byPrefix.keys()) if (!placed.has(prefix)) errors.push(`${prefix}: not placed on any page`);
  const moves = dumpRows.map((r) => placed.get(r.id.slice(0, 8))).filter((m): m is Move => !!m);
  return { errors, moves };
}

/**
 * Rewrite subject/chapter/subtopic of the entry numbered `number` IN THE FILE TEXT, so every other
 * byte (inline option arrays, CRLF, a missing final newline) stays as it was. Re-serialising the
 * whole file expanded every inline array and turned a 20-row move into a 2,700-line diff.
 */
export function patchEntryText(raw: string, number: string, to: Target): { text: string; matched: number } {
  const esc = number.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const head = new RegExp(`"number"\\s*:\\s*(?:${esc}|"${esc}")\\s*(?=[,}\\r\\n])`, "g");
  const starts = [...raw.matchAll(head)].map((m) => m.index!);
  if (starts.length === 0) return { text: raw, matched: 0 };
  let text = raw;
  // Patch from the last match backwards so earlier offsets stay valid.
  for (const start of [...starts].reverse()) {
    const next = text.slice(start + 1).search(/"number"\s*:/);
    const end = next === -1 ? text.length : start + 1 + next;
    let seg = text.slice(start, end);
    for (const [field, value] of [
      ["subject", to.subject],
      ["chapter", to.chapter],
      ["subtopic", to.subtopic],
    ] as const) {
      seg = seg.replace(new RegExp(`("${field}"\\s*:\\s*)"(?:[^"\\\\]|\\\\.)*"`), (_m, pre) => pre + JSON.stringify(value));
    }
    text = text.slice(0, start) + seg + text.slice(end);
  }
  return { text, matched: starts.length };
}
