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
const isQuestionFile = (v: unknown): v is Entry[] =>
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
