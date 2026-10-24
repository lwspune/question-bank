/**
 * Ask V on a practice question written into the notes (2026-10-20, owner:
 * "add to notes as well"). On 2026-10-19 a student pasted a Halogen
 * Derivatives practice rep into V; V searched the bank, found nothing, and
 * pointed them to an Ask V button the notes did not have.
 *
 * Notes questions are not bank rows. The window sends WHICH item was tapped
 * (concept slug, self-check or practice rep number) and the page it is on;
 * the server reads the item from the notes (notesItemServer.ts), so V never
 * explains text a browser made up. V explains from the stored steps and
 * answer and from what the notes teach for that concept, never its own
 * working: the same scope as a bank question (facts.ts rule 7).
 *
 * Pure. Spec: tests/chat-notes-item.test.ts.
 */
import type { SubtopicNote } from "@/app/notes/_types";
import type { CardQuestion } from "./questionCard";

export type NotesItemRef = { concept: string; item: "self" } | { concept: string; item: "practice"; index: number };

const SLUG_RE = /^[a-z0-9-]{1,100}$/;
const MAX_PRACTICE = 50;
const BRIEF_MAX = 4000;

export function parseNotesItemRef(raw: unknown): NotesItemRef | null {
  if (!raw || typeof raw !== "object") return null;
  const { concept, item, index } = raw as { concept?: unknown; item?: unknown; index?: unknown };
  if (typeof concept !== "string" || !SLUG_RE.test(concept)) return null;
  if (item === "self") return { concept, item };
  if (item === "practice" && typeof index === "number" && Number.isInteger(index) && index >= 0 && index < MAX_PRACTICE) {
    return { concept, item, index };
  }
  return null;
}

/**
 * The stored form of a notes question (migration 0181, 2026-10-23): "concept#3"
 * for practice question 3, "concept#self" for the self-check. With the row's
 * page it names the question, as asked_question_id names a bank one.
 */
export function notesRefKey(ref: NotesItemRef): string {
  return `${ref.concept}#${ref.item === "practice" ? ref.index : "self"}`;
}

const REF_KEY_RE = /^([a-z0-9-]{1,100})#(self|\d{1,2})$/;

export function parseNotesRefKey(key: string | null | undefined): NotesItemRef | null {
  const m = key ? REF_KEY_RE.exec(key) : null;
  if (!m) return null;
  return parseNotesItemRef(m[2] === "self" ? { concept: m[1], item: "self" } : { concept: m[1], item: "practice", index: Number(m[2]) });
}

/** A notes subtopic page (/notes/<subject>/<chapter>/<subtopic>): its chapter key and subtopic slug. */
export function notesPageOf(pagePath: string | null): { key: string; subtopic: string } | null {
  if (!pagePath) return null;
  const parts = pagePath.split(/[?#]/)[0].split("/").filter(Boolean);
  if (parts.length !== 4 || parts[0] !== "notes" || !parts.slice(1).every((p) => SLUG_RE.test(p))) return null;
  return { key: `${parts[1]}/${parts[2]}`, subtopic: parts[3] };
}

/** The chapter keys the generated loader map must cover, in registry order. */
export function notesDataKeys(chapters: readonly { subjectRoute: string; chapterSlug: string }[]): string[] {
  return [...new Set(chapters.map((c) => `${c.subjectRoute}/${c.chapterSlug}`))];
}

const plain = (s: string) => s.replace(/\*\*/g, "").trim();
const letter = (i: number) => String.fromCharCode(65 + i);

// 2026-10-24: V told a student "This is a notes item, so I can't use the solution steps" and pointed to
// Report unasked. The first two sentences keep that out of V's replies.
const RULES = `Just explain the question: do not tell the student where the question comes from or what it lacks (the notes, the question bank, steps). Mention Report only if they say the answer is wrong, and then tell them to use Report on the notes page. Explain only from the solution and what the notes teach above; when only the answer is given, explain the idea from the notes and how it leads to that answer. Never work out your own answer, and never say the answer is wrong. Explain it straight away, without asking whether they want a hint; give a hint (the first idea only, never the answer) only when they ask for one. Do not call similar_question: there is no similar question for this one.`;

/**
 * The card shown above an Ask V tap on a notes item (2026-10-23): the prompt
 * and, for a self-check written as an exam item, its options. NEVER its
 * answer, steps or method: the student has not revealed them.
 */
export function notesItemCard(note: SubtopicNote, ref: NotesItemRef, page: string): CardQuestion | null {
  const concept = note.concepts.find((c) => c.slug === ref.concept);
  if (!concept) return null;
  const id = `notes:${page}#${ref.concept}:${ref.item === "practice" ? ref.index : "self"}`;
  const where = `Notes · ${note.title}`;
  if (ref.item === "self") {
    const ex = concept.selfCheckExample;
    if (!ex) return null;
    const options = (ex.options ?? []).map((text, i) => ({ label: letter(i), text }));
    return { id, text: ex.prompt, context: null, imageUrl: null, where, options };
  }
  const rep = concept.practiceSet?.[ref.index];
  return rep ? { id, text: rep.prompt, context: null, imageUrl: null, where, options: [] } : null;
}

/** What V is told about the tapped notes item, or null when it is not on that page. */
export function notesItemBrief(note: SubtopicNote, ref: NotesItemRef): string | null {
  const concept = note.concepts.find((c) => c.slug === ref.concept);
  if (!concept) return null;
  const lines: string[] = [
    `The student tapped Ask V on a practice question in the notes ("${note.title}", concept: ${concept.name}). It is not in the question bank: do not call get_question, explain_question, similar_question or find_question for it.`,
  ];
  if (ref.item === "self") {
    const ex = concept.selfCheckExample;
    if (!ex) return null;
    lines.push("QUESTION", plain(ex.prompt));
    if (ex.options && ex.options.length > 0) lines.push(ex.options.map((o, i) => `(${letter(i)}) ${plain(o)}`).join("\n"));
    // The answer before the steps, so a cut for length (BRIEF_MAX) never loses it.
    lines.push(`ANSWER: ${plain(ex.answer)}`);
    lines.push("SOLUTION", ex.steps.map((s, i) => `${i + 1}. ${plain(s)}`).join("\n"));
  } else {
    const rep = concept.practiceSet?.[ref.index];
    if (!rep) return null;
    lines.push("QUESTION", plain(rep.prompt), `ANSWER: ${plain(rep.answer)}`);
    if (rep.method) lines.push(`METHOD: ${plain(rep.method)}`);
  }
  lines.push("WHAT THE NOTES TEACH FOR THIS CONCEPT", plain(concept.intuition), plain(concept.definition));
  const body = lines.join("\n");
  return `${body.length > BRIEF_MAX ? `${body.slice(0, BRIEF_MAX)}...` : body}\n${RULES}`;
}
