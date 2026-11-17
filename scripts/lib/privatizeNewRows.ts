/**
 * Hide only the rows a commit run INSERTED.
 *
 * Every ingestion lane commits PRIVATE and publishes later with its own
 * flip-public step. Until 2026-11-17 most lanes did the hiding with
 * `update({ visibility: "PRIVATE" }).eq("source_file", ...)`, which is harmless
 * on a first commit and an outage on any later one: adding five questions to a
 * shipped chapter hid its 33 live questions until flip-public ran again.
 *
 *   const before = await sourceFileIds(client, examId, sourceFile);
 *   await commitStaged(...);
 *   await privatizeNewRows(client, { examId, sourceFile, before, questionKind: "pyq" });
 *
 * Rows that existed before the run keep their visibility. `questionKind`, when
 * given, is still stamped on every row of the file, as the lanes always did.
 * Ids, not created_at: a local clock ahead of the database would leave new rows
 * PUBLIC, which fails the wrong way.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

/** The ids in `after` that `before` does not hold. Pure. */
export function newIds(before: ReadonlySet<string>, after: readonly string[]): string[] {
  return after.filter((id) => !before.has(id));
}

/** Every question id of one source file, paged past PostgREST's 1000-row cap. */
export async function sourceFileIds(
  client: SupabaseClient,
  examId: string,
  sourceFile: string
): Promise<Set<string>> {
  const ids = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", examId)
      .eq("source_file", sourceFile)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`id read failed for ${sourceFile}: ${error.message}`);
    for (const r of data ?? []) ids.add(r.id as string);
    if (!data || data.length < PAGE) break;
  }
  return ids;
}

export async function privatizeNewRows(
  client: SupabaseClient,
  opts: {
    examId: string;
    sourceFile: string;
    before: ReadonlySet<string>;
    questionKind?: "pyq" | "practice";
  }
): Promise<{ inserted: number; existing: number }> {
  const { examId, sourceFile, before, questionKind } = opts;
  if (questionKind) {
    const { error } = await client
      .from("questions")
      .update({ question_kind: questionKind })
      .eq("exam_id", examId)
      .eq("source_file", sourceFile);
    if (error) throw new Error(`kind update failed for ${sourceFile}: ${error.message}`);
  }
  const after = await sourceFileIds(client, examId, sourceFile);
  const fresh = newIds(before, [...after]);
  for (let i = 0; i < fresh.length; i += 200) {
    const { error } = await client
      .from("questions")
      .update({ visibility: "PRIVATE" })
      .in("id", fresh.slice(i, i + 200));
    if (error) throw new Error(`visibility update failed for ${sourceFile}: ${error.message}`);
  }
  const existing = after.size - fresh.length;
  console.log(
    `set ${fresh.length} newly inserted row(s) of ${sourceFile} to PRIVATE; ${existing} existing row(s) keep their visibility.`
  );
  return { inserted: fresh.length, existing };
}
