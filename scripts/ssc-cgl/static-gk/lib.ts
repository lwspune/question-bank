/**
 * Pure core of the Static GK move (move.ts): which Current Affairs rows move where, and the
 * matching rewrite of the committed transcripts and catalog. No I/O here.
 */
import { STATIC_GK, STATIC_GK_SUBJECT, TARGET_OF_CODE, type Target } from "./taxonomy";

/** decisions.json: question-id PREFIX → subtopic code. A Current Affairs row no prefix names stays. */
export type Decisions = { moves: Record<string, string> };

export type Move = { id: string; code: string } & Target;

/** Problems with the file itself: an unknown code, or one prefix that starts another (ambiguous). */
export function checkDecisions(d: Decisions): string[] {
  const problems: string[] = [];
  const prefixes = Object.keys(d.moves).sort();
  for (const [p, code] of Object.entries(d.moves)) {
    if (!TARGET_OF_CODE.has(code)) problems.push(`${p}: unknown code "${code}"`);
  }
  for (let i = 0; i + 1 < prefixes.length; i++) {
    if (prefixes[i + 1].startsWith(prefixes[i])) problems.push(`prefix ${prefixes[i]} starts ${prefixes[i + 1]}`);
  }
  return problems;
}

/**
 * Resolve each decided prefix to exactly one row. `rows` are every row the decisions may name: the
 * Current Affairs rows still to move AND the rows already in Static GK (a second run then moves
 * nothing and reports them as done).
 */
export function resolveMoves(rows: { id: string; subject: string }[], d: Decisions): { moves: Move[]; alreadyMoved: number; problems: string[] } {
  const problems = checkDecisions(d);
  const moves: Move[] = [];
  let alreadyMoved = 0;
  for (const [prefix, code] of Object.entries(d.moves)) {
    const hits = rows.filter((r) => r.id.startsWith(prefix));
    if (hits.length !== 1) {
      problems.push(hits.length ? `${prefix} matches ${hits.length} rows` : `${prefix} matches no row`);
      continue;
    }
    const target = TARGET_OF_CODE.get(code);
    if (!target) continue;
    if (hits[0].subject === STATIC_GK_SUBJECT) alreadyMoved++;
    else moves.push({ id: hits[0].id, code, ...target });
  }
  moves.sort((a, b) => a.id.localeCompare(b.id));
  return { moves, alreadyMoved, problems };
}

/**
 * Rewrite the subject, chapter and subtopic lines of the numbered blocks in a transcript. A block
 * must be Current Affairs (or already carry exactly its target, which is no change), so a stale
 * plan can never re-file a Reasoning question.
 */
export function retagBlocks(text: string, targets: Map<number, Target>): { text: string; changes: number; problems: string[] } {
  const problems: string[] = [];
  const lines = text.split(/(?<=\n)/);
  const body = (i: number) => lines[i].replace(/\r?\n$/, "");
  const set = (i: number, value: string) => { lines[i] = value + lines[i].slice(body(i).length); };
  const heads = new Map<number, number>();
  lines.forEach((_, i) => {
    const m = /^=== (\d+)\s*$/.exec(body(i));
    if (m) heads.set(Number(m[1]), i);
  });
  const edits: [number, string][] = [];
  for (const [n, t] of [...targets].sort((a, b) => a[0] - b[0])) {
    const at = heads.get(n);
    if (at === undefined) { problems.push(`Q${n}: no such block`); continue; }
    const field = (name: string) => {
      for (let i = at + 1; i < lines.length && !/^=== \d+/.test(body(i)); i++) if (body(i).startsWith(`${name}:`)) return i;
      return -1;
    };
    const [si, ci, ti] = [field("subject"), field("chapter"), field("subtopic")];
    if (si < 0 || ci < 0 || ti < 0) { problems.push(`Q${n}: missing a subject, chapter or subtopic line`); continue; }
    const subject = body(si).slice(8).trim();
    const done = subject === STATIC_GK_SUBJECT && body(ci).slice(8).trim() === t.chapter && body(ti).slice(9).trim() === t.subtopic;
    if (done) continue;
    if (subject !== "Current Affairs") { problems.push(`Q${n}: subject is "${subject}", not Current Affairs`); continue; }
    edits.push([si, `subject: ${STATIC_GK_SUBJECT}`], [ci, `chapter: ${t.chapter}`], [ti, `subtopic: ${t.subtopic}`]);
  }
  if (problems.length) return { text, changes: 0, problems };
  for (const [i, v] of edits) set(i, v);
  return { text: lines.join(""), changes: edits.length / 3, problems };
}

type Chapter = { chapter: string; subtopics: string[] };
type Authored = { subjects: Record<string, Chapter[]> } & Record<string, unknown>;

/** Add the Static GK subject to catalog.json and catalog-authored.json (whole subjects live in `subjects`). Inputs are not changed. */
export function addStaticGkToCatalog<C extends Record<string, Chapter[]>, A extends Authored>(catalog: C, authored: A): { catalog: C; authored: A; added: boolean } {
  const next = structuredClone(catalog) as Record<string, Chapter[]>;
  const auth = structuredClone(authored);
  if (next[STATIC_GK_SUBJECT] && auth.subjects[STATIC_GK_SUBJECT]) return { catalog: next as C, authored: auth, added: false };
  const list = STATIC_GK.map((c) => ({ chapter: c.chapter, subtopics: c.subtopics.map((s) => s.name) }));
  next[STATIC_GK_SUBJECT] = structuredClone(list);
  auth.subjects[STATIC_GK_SUBJECT] = structuredClone(list);
  return { catalog: next as C, authored: auth, added: true };
}

type Filed = { subject?: string; chapter?: string; subtopic?: string };

/**
 * The record-file twin of retagBlocks, for pipelines whose source of record is a JSON list of
 * questions keyed by printed number (CDS `questions.json` uses `number`, a practice paper's
 * records use `n`). A record with no subject of its own takes the paper's `defaultSubject`.
 * Same contract: only Current Affairs records move, a record already on its target is no change,
 * any problem refuses the whole file. Returns new records; the input is not changed.
 */
export function retagRecords<R extends Filed>(records: R[], key: "n" | "number", targets: Map<number, Target>, defaultSubject?: string): { records: R[]; changes: number; problems: string[] } {
  const problems: string[] = [];
  const out = records.map((r) => ({ ...r }));
  const byNumber = new Map(out.map((r, i) => [Number((r as Record<string, unknown>)[key]), i] as const));
  const edits: [number, Target][] = [];
  for (const [n, t] of [...targets].sort((a, b) => a[0] - b[0])) {
    const i = byNumber.get(n);
    if (i === undefined) { problems.push(`Q${n}: no such record`); continue; }
    const r = out[i];
    const subject = r.subject ?? defaultSubject;
    if (subject === STATIC_GK_SUBJECT && r.chapter === t.chapter && r.subtopic === t.subtopic) continue;
    if (subject !== "Current Affairs") { problems.push(`Q${n}: subject is "${subject}", not Current Affairs`); continue; }
    edits.push([i, t]);
  }
  if (problems.length) return { records, changes: 0, problems };
  for (const [i, t] of edits) Object.assign(out[i], { subject: STATIC_GK_SUBJECT, chapter: t.chapter, subtopic: t.subtopic });
  return { records: out, changes: edits.length, problems };
}
