/**
 * The database half of notes:lint (scripts/notes-lint.ts): a BULK loader and
 * the per-note checks that read what it loaded.
 *
 * Split out 2026-10-26. The lint used to await ~6 lookups per subtopic note,
 * one after another; at 2,220 notes that was ~13,000 round trips (~30 min
 * locally), and the daily prod-contract job was cancelled at its 25-minute
 * limit every day from 2026-10-05. Now it reads each table in a few chunked,
 * paged requests (~90 in all), whatever the number of notes.
 *
 * Two PostgREST limits shape the loader (CLAUDE.md "Recurring pitfalls"):
 * results are capped at 1000 rows (so every read is paged through
 * `readAllPages`, ordered by a unique key), and `.in()` puts its list in the
 * URL (so filters are chunked at IN_CHUNK values). A database error throws:
 * the old loop read a failed lookup as "not found" and reported a false error.
 *
 * Name lookups match the old `.eq("name", …).maybeSingle()` exactly because
 * every one is unique in the schema (exams.name, subjects(exam_id, name),
 * chapters(subject_id, name), subtopics(chapter_id, name)).
 *
 * Spec: tests/notes-lint-batch.test.ts (verdicts + a request-count bound).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SubtopicNote } from "../../app/notes/_types";
import { readAllPages } from "../supabase/readAllPages";
import { reusesPyqNumbers } from "./pyqDuplication";

export type Issue = { severity: "error" | "warn"; note: string; message: string };

export type NoteRef = {
  /** Display path used in messages. */
  path: string;
  /** Stable URL slug used as `subtopic_slug` in question_concept_tags. */
  subtopicSlug: string;
  exam: string;
  subject: string;
  chapter: string;
  note: SubtopicNote;
};

type QuestionRow = { id: string; visibility: string; subtopic_id: string | null; text: string | null };
type TagRow = { concept_slug: string; question_id: string };

export type LintSnapshot = {
  examId: Map<string, string>; // name → id
  subjectId: Map<string, string>; // `${examId}|${name}` → id
  chapterId: Map<string, string>; // `${subjectId}|${name}` → id
  subtopicId: Map<string, string>; // `${chapterId}|${name}` → id
  questions: Map<string, QuestionRow>;
  tagsBySlug: Map<string, TagRow[]>;
};

/** Values per `.in()` filter: well under the URL limit even for uuids. */
export const IN_CHUNK = 200;

type Client = Pick<SupabaseClient, "from">;

function chunks<T>(xs: T[], size = IN_CHUNK): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size));
  return out;
}

/** Every row where `col` is one of `values`, chunked and paged. */
async function readIn<T>(
  client: Client,
  table: string,
  columns: string,
  col: string,
  values: string[],
  orderBy: string[]
): Promise<T[]> {
  const out: T[] = [];
  for (const part of chunks([...new Set(values)])) {
    const rows = await readAllPages<T>((from, to) => {
      let q = client.from(table).select(columns).in(col, part);
      for (const o of orderBy) q = q.order(o);
      return q.range(from, to) as unknown as PromiseLike<{ data: T[] | null; error: { message: string } | null }>;
    });
    out.push(...rows);
  }
  return out;
}

/** Every concept-level and reference-row featured PYQ id in a note, in check order. */
function pyqIdsOf(note: SubtopicNote): { id: string; conceptName: string; where: string }[] {
  const ids: { id: string; conceptName: string; where: string }[] = [];
  for (const c of note.concepts) {
    if (c.pyqExampleId) ids.push({ id: c.pyqExampleId, conceptName: c.name, where: "concept" });
    if (c.kind === "reference") {
      c.table.rows.forEach((row, rIdx) => {
        if (row.pyqExampleId) ids.push({ id: row.pyqExampleId, conceptName: c.name, where: `table.row${rIdx}` });
      });
    }
  }
  return ids;
}

/**
 * Load everything the per-note checks read, in bulk. `onProgress` gets one
 * line per stage so a slow run is visibly alive.
 */
export async function loadLintSnapshot(
  client: Client,
  notes: NoteRef[],
  onProgress: (line: string) => void = () => {}
): Promise<LintSnapshot> {
  const exams = await readIn<{ id: string; name: string }>(
    client, "exams", "id, name", "name", notes.map((n) => n.exam), ["id"]
  );
  const examId = new Map(exams.map((r) => [r.name, r.id]));

  const subjects = await readIn<{ id: string; exam_id: string; name: string }>(
    client, "subjects", "id, exam_id, name", "exam_id", [...examId.values()], ["id"]
  );
  const subjectId = new Map(subjects.map((r) => [`${r.exam_id}|${r.name}`, r.id]));

  const wantedSubjects = new Set<string>();
  for (const n of notes) {
    const e = examId.get(n.exam);
    const s = e && subjectId.get(`${e}|${n.subject}`);
    if (s) wantedSubjects.add(s);
  }
  const chapters = await readIn<{ id: string; subject_id: string; name: string }>(
    client, "chapters", "id, subject_id, name", "subject_id", [...wantedSubjects], ["id"]
  );
  const chapterId = new Map(chapters.map((r) => [`${r.subject_id}|${r.name}`, r.id]));

  const wantedChapters = new Set<string>();
  for (const n of notes) {
    const e = examId.get(n.exam);
    const s = e && subjectId.get(`${e}|${n.subject}`);
    const c = s && chapterId.get(`${s}|${n.chapter}`);
    if (c) wantedChapters.add(c);
  }
  const subtopics = await readIn<{ id: string; chapter_id: string; name: string }>(
    client, "subtopics", "id, chapter_id, name", "chapter_id", [...wantedChapters], ["id"]
  );
  const subtopicId = new Map(subtopics.map((r) => [`${r.chapter_id}|${r.name}`, r.id]));
  onProgress(`taxonomy: ${exams.length} exams, ${subjects.length} subjects, ${chapters.length} chapters, ${subtopics.length} subtopics`);

  const questionRows = await readIn<QuestionRow>(
    client, "questions", "id, visibility, subtopic_id, text", "id",
    notes.flatMap((n) => pyqIdsOf(n.note).map((p) => p.id)), ["id"]
  );
  const questions = new Map(questionRows.map((r) => [r.id, r]));
  onProgress(`featured PYQs: ${questions.size} found`);

  // Ordered by the table's primary key, so paging is stable and each note's
  // tags come back in a fixed order (the old per-note read had no ORDER BY).
  const tagRows = await readIn<TagRow & { subtopic_slug: string }>(
    client, "question_concept_tags", "question_id, subtopic_slug, concept_slug", "subtopic_slug",
    notes.map((n) => n.subtopicSlug), ["question_id", "subtopic_slug", "concept_slug"]
  );
  const tagsBySlug = new Map<string, TagRow[]>();
  for (const r of tagRows) {
    const list = tagsBySlug.get(r.subtopic_slug) ?? [];
    list.push({ concept_slug: r.concept_slug, question_id: r.question_id });
    tagsBySlug.set(r.subtopic_slug, list);
  }
  onProgress(`concept tags: ${tagRows.length}`);

  return { examId, subjectId, chapterId, subtopicId, questions, tagsBySlug };
}

/** The per-note checks (1–5 in scripts/notes-lint.ts), in the order the lint has always reported them. */
export function checkNotes(notes: NoteRef[], snap: LintSnapshot): Issue[] {
  const issues: Issue[] = [];
  for (const ref of notes) {
    // 1. Resolve subtopic via the same name-keyed path the page uses at request time.
    const exam = snap.examId.get(ref.exam);
    if (!exam) {
      issues.push({ severity: "error", note: ref.path, message: `exam not found: ${ref.exam}` });
      continue;
    }
    const subject = snap.subjectId.get(`${exam}|${ref.subject}`);
    if (!subject) {
      issues.push({ severity: "error", note: ref.path, message: `subject not found: ${ref.subject} under exam ${ref.exam}` });
      continue;
    }
    const chapter = snap.chapterId.get(`${subject}|${ref.chapter}`);
    if (!chapter) {
      issues.push({ severity: "error", note: ref.path, message: `chapter not found: ${ref.chapter} under ${ref.subject}` });
      continue;
    }
    const sub = snap.subtopicId.get(`${chapter}|${ref.note.subtopicName}`);
    if (!sub) {
      issues.push({
        severity: "error",
        note: ref.path,
        message: `subtopic not found: "${ref.note.subtopicName}". The taxonomy may have been renamed or merged`,
      });
    }

    // 2a. Reference-variant tables must have valid shape: 2–5 columns,
    //     ≥1 row, every row's cells.length === columns.length. Caught
    //     here so silent broken tables surface before render.
    for (const c of ref.note.concepts) {
      if (c.kind !== "reference") continue;
      const cols = c.table.columns.length;
      if (cols < 2 || cols > 5) {
        issues.push({
          severity: "error",
          note: ref.path,
          message: `reference concept "${c.name}" has ${cols} columns; must be 2–5`,
        });
      }
      if (c.table.rows.length === 0) {
        issues.push({
          severity: "error",
          note: ref.path,
          message: `reference concept "${c.name}" has 0 rows`,
        });
      }
      c.table.rows.forEach((row, rIdx) => {
        if (row.cells.length !== cols) {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `reference concept "${c.name}" row ${rIdx} has ${row.cells.length} cells but table declares ${cols} columns`,
          });
        }
      });
    }

    // 2b. Every pyqExampleId must resolve, be PUBLIC, AND live in the parent module's subtopic.
    //     The subtopic-match check catches the "featured question is actually in a different
    //     subtopic" failure mode — see memory feedback_pyqexampleid_must_match_subtopic.md.
    //     Walks BOTH concept-level pyqExampleId AND reference rows' per-row pyqExampleId.
    const pyqIds = pyqIdsOf(ref.note);
    if (pyqIds.length > 0) {
      const expectedSubtopicId = sub ?? null;
      for (const p of pyqIds) {
        const row = snap.questions.get(p.id);
        if (!row) {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `pyqExampleId not found in bank: ${p.id} (concept "${p.conceptName}", ${p.where})`,
          });
          continue;
        }
        if (row.visibility !== "PUBLIC") {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `pyqExampleId is PRIVATE, so students won't see it: ${p.id} (concept "${p.conceptName}", ${p.where})`,
          });
        }
        if (expectedSubtopicId && row.subtopic_id !== expectedSubtopicId) {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `pyqExampleId ${p.id} lives in a different subtopic than "${ref.note.subtopicName}" (concept "${p.conceptName}", ${p.where}). A concept tag would be impossible there. Swap for a question in the correct subtopic.`,
          });
        }
      }

      // 2c. Duplication WARN: a concept's worked example / self-check must be a
      //     DIFFERENT problem from its featured PYQ. Flags when the example
      //     re-uses (almost) all of the PYQ's distinctive numbers. See
      //     feedback_notes_concept_content_alignment.
      for (const c of ref.note.concepts) {
        if (!c.pyqExampleId) continue;
        const pyqText = snap.questions.get(c.pyqExampleId)?.text;
        if (!pyqText) continue;
        const candidates: { slot: string; text: string }[] = [];
        if (c.kind === "formula") candidates.push({ slot: "worked example", text: c.authoredExample.prompt });
        if (c.selfCheckExample) candidates.push({ slot: "self-check", text: c.selfCheckExample.prompt });
        for (const cand of candidates) {
          if (reusesPyqNumbers(cand.text, pyqText)) {
            issues.push({
              severity: "warn",
              note: ref.path,
              message: `concept "${c.name}" ${cand.slot} re-uses the featured PYQ's numbers (${c.pyqExampleId}), so it is likely the same problem. Author a DIFFERENT problem (rule: worked example/self-check must differ from the featured PYQ)`,
            });
          }
        }
      }
    }

    // 3 + 4. DB-tag integrity: orphan concept_slugs (error) + untagged TS concepts (warn).
    const knownConceptSlugs = new Set(ref.note.concepts.map((c) => c.slug));
    const taggedConceptSlugs = new Set<string>();
    for (const row of snap.tagsBySlug.get(ref.subtopicSlug) ?? []) {
      taggedConceptSlugs.add(row.concept_slug);
      if (!knownConceptSlugs.has(row.concept_slug)) {
        issues.push({
          severity: "error",
          note: ref.path,
          message: `DB tag has unknown concept_slug "${row.concept_slug}" (question ${row.question_id}). Was the concept renamed or removed?`,
        });
      }
    }
    for (const c of ref.note.concepts) {
      // Foundation exemption — formula-variant only. Foundation concepts
      // (no pyqExampleId) are bank-less by design — pure teaching
      // primitives that don't map to a specific PYQ lever. Reference-variant
      // concepts are NEVER foundation primitives — they are the bucket for a
      // subtopic's flat-fact recall, so they MUST have tagged questions
      // regardless of whether the concept-level pyqExampleId is set.
      if (c.kind === "formula" && !c.pyqExampleId) continue;
      if (!taggedConceptSlugs.has(c.slug)) {
        issues.push({
          severity: "warn",
          note: ref.path,
          message: `concept "${c.name}" (slug "${c.slug}") has 0 tagged questions in question_concept_tags. Run a tagging session`,
        });
      }
    }
  }
  return issues;
}
