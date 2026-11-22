/**
 * The exam calendar for the app (public.exam_sittings, migration 0281),
 * remembered for a DAY. A day, not an hour: a cached page refreshes as often
 * as the shortest cache it reaches (tests/page-cache-window.test.ts), and the
 * Learn course pages are daily. So a date the /blog skill records shows in
 * countdowns within a day.
 *
 * A failed read is never remembered (the read throws inside the cache). Then
 * it tries one direct read, which is also what runs outside a Next render
 * (scripts, where unstable_cache throws), and if that fails too every
 * countdown falls back to the student's own date or none: an empty calendar,
 * never a wrong one.
 */
import { unstable_cache } from "next/cache";
import { singleFlight } from "@/lib/cache/singleFlight";
import { buildFailureMemoMs } from "@/lib/cache/buildPhase";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import type { SittingEntry } from "./calendar";
import { readExamCalendar } from "./calendarRead";

export const EXAM_CALENDAR_CACHE_TAG = "exam-calendar";

const cachedCalendar = unstable_cache(() => readExamCalendar(createSupabaseAnonClient()), ["exam-calendar-v1"], {
  revalidate: 86400,
  tags: [EXAM_CALENDAR_CACHE_TAG],
});

export async function loadExamCalendar(): Promise<SittingEntry[]> {
  try {
    return await singleFlight("exam-calendar", cachedCalendar, { rememberFailureMs: buildFailureMemoMs() });
  } catch {
    try {
      return await readExamCalendar(createSupabaseAnonClient());
    } catch (e) {
      console.error("loadExamCalendar:", e instanceof Error ? e.message : e);
      return [];
    }
  }
}
