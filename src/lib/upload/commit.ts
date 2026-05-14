import type { SupabaseClient } from "@supabase/supabase-js";
import type { ParsedRowPayload, OptionLabel } from "./validate";
import { makeTaxonomyResolver } from "./taxonomy";

export type CommitInput = {
  orgId: string;
  examId: string;
  filename: string;
  createdBy: string;
  rows: ParsedRowPayload[];
  uploadJobId?: string;
  pyqYear?: number | null;
  pyqMonth?: string | null;
  pyqNote?: string | null;
};

export type CommitResult = {
  inserted: number;
  skipped: number;
  failed: number;
  errors: { sourceRow: number; message: string }[];
};

export async function commitStaged(
  client: SupabaseClient,
  input: CommitInput
): Promise<CommitResult> {
  const {
    orgId,
    examId,
    filename,
    createdBy,
    rows,
    uploadJobId,
    pyqYear,
    pyqMonth,
    pyqNote,
  } = input;
  const result: CommitResult = { inserted: 0, skipped: 0, failed: 0, errors: [] };
  if (rows.length === 0) return result;

  // Dedup happens at the DB via the unique index on (org_id, content_hash)
  // — see the .upsert call below. We used to pre-pull every hash for the
  // org into an in-memory Set, but PostgREST silently capped that read at
  // 1000 rows, breaking dedup once an org crossed that threshold.

  const taxonomy = makeTaxonomyResolver(client);

  // Resolve subject IDs upfront (no auto-create for subjects).
  // Parallelise lookups across unique names to avoid N sequential round-trips
  // — for a 150-row upload with 3 subjects, this is the difference between
  // ~3 × latency and 1 × latency.
  const uniqueSubjectNames = Array.from(new Set(rows.map((r) => r.subjectName)));
  const subjectResults = await Promise.all(
    uniqueSubjectNames.map((name) =>
      taxonomy.findSubject(examId, name).then((id) => ({ name, id }))
    )
  );
  const subjectIdByName = new Map<string, string>();
  for (const { name, id } of subjectResults) {
    if (id) subjectIdByName.set(name, id);
  }

  // Pre-resolve unique chapters in parallel. Each unique key is resolved
  // exactly once, so concurrent calls can't race on the find→insert path.
  const chapterKeyOf = (subjectId: string, name: string) =>
    `${subjectId}::${name}`;
  const chapterKeys = new Set<string>();
  for (const row of rows) {
    const subjectId = subjectIdByName.get(row.subjectName);
    if (subjectId) chapterKeys.add(chapterKeyOf(subjectId, row.chapterName));
  }
  await Promise.all(
    Array.from(chapterKeys).map((k) => {
      const sep = k.indexOf("::");
      const subjectId = k.slice(0, sep);
      const name = k.slice(sep + 2);
      return taxonomy.resolveChapter(subjectId, name);
    })
  );

  // Pre-resolve unique subtopics in parallel — chapters are now in cache,
  // so resolveChapter inside the keying loop returns instantly.
  const subtopicKeyOf = (chapterId: string, name: string) =>
    `${chapterId}::${name}`;
  const subtopicKeys = new Set<string>();
  for (const row of rows) {
    if (!row.subtopicName) continue;
    const subjectId = subjectIdByName.get(row.subjectName);
    if (!subjectId) continue;
    const chapterId = await taxonomy.resolveChapter(
      subjectId,
      row.chapterName
    );
    subtopicKeys.add(subtopicKeyOf(chapterId, row.subtopicName));
  }
  await Promise.all(
    Array.from(subtopicKeys).map((k) => {
      const sep = k.indexOf("::");
      const chapterId = k.slice(0, sep);
      const name = k.slice(sep + 2);
      return taxonomy.resolveSubtopic(chapterId, name);
    })
  );

  type QuestionInsert = {
    org_id: string;
    exam_id: string;
    subject_id: string;
    chapter_id: string;
    subtopic_id: string | null;
    context: string | null;
    text: string;
    difficulty: ParsedRowPayload["difficulty"];
    solution: string | null;
    content_hash: string;
    source_file: string;
    source_row: number;
    question_number: string | null;
    set_id: string | null;
    upload_job_id: string | null;
    pyq_year: number | null;
    pyq_month: string | null;
    pyq_note: string | null;
    created_by: string;
  };

  const stagedInserts: { row: ParsedRowPayload; q: QuestionInsert }[] = [];

  for (const row of rows) {
    const subjectId = subjectIdByName.get(row.subjectName);
    if (!subjectId) {
      result.failed++;
      result.errors.push({
        sourceRow: row.sourceRow,
        message: `Subject "${row.subjectName}" does not exist for this exam`,
      });
      continue;
    }

    try {
      const chapterId = await taxonomy.resolveChapter(subjectId, row.chapterName);
      const subtopicId = row.subtopicName
        ? await taxonomy.resolveSubtopic(chapterId, row.subtopicName)
        : null;

      // Set membership is scoped per upload: the same Excel label "S1" used
      // in two different uploads forms two different sets. Without an
      // uploadJobId (sync receivers, ad-hoc imports) set_id stays NULL.
      const setId =
        row.setLabel && uploadJobId ? `${uploadJobId}:${row.setLabel}` : null;

      stagedInserts.push({
        row,
        q: {
          org_id: orgId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          subtopic_id: subtopicId,
          context: row.context ?? null,
          text: row.text,
          difficulty: row.difficulty,
          solution: row.solution ?? null,
          content_hash: row.contentHash,
          source_file: filename,
          source_row: row.sourceRow,
          question_number: row.questionNumber ?? null,
          set_id: setId,
          upload_job_id: uploadJobId ?? null,
          pyq_year: pyqYear ?? null,
          pyq_month: pyqMonth ?? null,
          pyq_note: pyqNote ?? null,
          created_by: createdBy,
        },
      });
    } catch (err) {
      result.failed++;
      result.errors.push({
        sourceRow: row.sourceRow,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (stagedInserts.length === 0) return result;

  // ON CONFLICT DO NOTHING on the (org_id, content_hash) unique index:
  // duplicates (within-batch or cross-batch) are skipped silently and
  // the returned rows are exactly the ones that landed.
  const { data: insertedQs, error: qErr } = await client
    .from("questions")
    .upsert(stagedInserts.map((s) => s.q), {
      onConflict: "org_id,content_hash",
      ignoreDuplicates: true,
    })
    .select("id, content_hash");
  if (qErr) throw new Error(`question insert failed: ${qErr.message}`);

  const idByHash = new Map<string, string>();
  for (const q of insertedQs ?? []) {
    idByHash.set(q.content_hash as string, q.id as string);
  }
  result.inserted = insertedQs?.length ?? 0;
  result.skipped += stagedInserts.length - result.inserted;

  const optionRows: {
    question_id: string;
    label: OptionLabel;
    text: string;
    is_correct: boolean;
  }[] = [];
  // Dedup by content_hash so within-batch duplicates don't emit options
  // twice for the same question_id (which would 23505 on options_question_id_label_key).
  const seenHashes = new Set<string>();
  for (const s of stagedInserts) {
    if (seenHashes.has(s.q.content_hash)) continue;
    seenHashes.add(s.q.content_hash);
    const qId = idByHash.get(s.q.content_hash);
    if (!qId) continue;
    for (const opt of s.row.options) {
      optionRows.push({
        question_id: qId,
        label: opt.label,
        text: opt.text,
        is_correct: opt.isCorrect,
      });
    }
  }

  if (optionRows.length > 0) {
    const { error: oErr } = await client.from("options").insert(optionRows);
    if (oErr) throw new Error(`option insert failed: ${oErr.message}`);
  }

  return result;
}
