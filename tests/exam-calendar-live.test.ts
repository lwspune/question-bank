/**
 * PROD-CONTRACT: the live exam calendar (public.exam_sittings, migration 0281).
 *
 * This is the rot probe the code calendar's unit test used to be. It moved
 * here when the calendar became a table (2026-11-22), because a push-time test
 * cannot see a table the /blog skill writes between pushes. It runs DAILY
 * (prod-contract.yml), so a stale calendar fails within a day:
 *   - no exam's LATEST sitting is more than CALENDAR_GRACE_DAYS past (a
 *     student's countdown must never quietly vanish);
 *   - every row passes the same checks `npm run calendar` applies before a
 *     write (registry exam, not a course, official dates link their notice).
 * Read-only, anon client: exactly what the site reads.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { CALENDAR_GRACE_DAYS, staleExams, type SittingEntry } from "@/lib/exam/calendar";
import { readExamCalendar } from "@/lib/exam/calendarRead";
import { checkSittingInput } from "@/lib/exam/calendarWrite";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

describe.skipIf(!HAS_ENV)("the live exam calendar", () => {
  let rows: SittingEntry[] = [];

  beforeAll(async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    rows = await readExamCalendar(anon);
  });

  it("is not empty", () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  it(`ROT PROBE: no exam's latest sitting is more than ${CALENDAR_GRACE_DAYS} days past (add its next sitting: npm run calendar)`, () => {
    const stale = staleExams(rows, new Date()).map((s) => `${s.exam} ${s.latest.sitting} (${s.latest.date})`);
    expect(stale).toEqual([]);
  });

  it("every row passes the write checks", () => {
    const problems = rows.flatMap((r) => {
      const c = checkSittingInput(r);
      return c.ok ? [] : c.errors;
    });
    expect(problems).toEqual([]);
  });
});
