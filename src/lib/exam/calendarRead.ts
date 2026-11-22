/**
 * The uncached read of the exam calendar (public.exam_sittings, migration
 * 0281). Readable by anyone (RLS), so the anon client serves every page alike.
 * THROWS on failure, so a cache never keeps an empty calendar. No Next.js
 * import: scripts and the live test read through this; the app reads through
 * calendarQuery's cached loadExamCalendar.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { isExamSlug } from "./examContext";
import type { SittingEntry } from "./calendar";

type SittingRow = {
  exam: string;
  sitting: string;
  label: string;
  date: string;
  official: boolean;
  source: string;
  source_url: string | null;
};

export async function readExamCalendar(client: SupabaseClient): Promise<SittingEntry[]> {
  const { data, error } = await client
    .from("exam_sittings")
    .select("exam, sitting, label, date, official, source, source_url")
    .order("date")
    .order("exam")
    .limit(1000);
  if (error) throw new Error(`exam_sittings: ${error.message}`);
  // A row for an exam this build does not know (added for a newer deploy) is skipped.
  return ((data ?? []) as SittingRow[]).flatMap((r) =>
    isExamSlug(r.exam)
      ? [{ exam: r.exam, sitting: r.sitting, label: r.label, date: r.date, official: r.official, source: r.source, sourceUrl: r.source_url }]
      : []
  );
}
