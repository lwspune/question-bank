/**
 * The STARTERS half of `npm run path:readout` (MENTOR_SPEC.md §9, Phase 1): the
 * students who started a board path (study_paths, migration 0225).
 *
 *   - starters, active and stopped, and PCB starters (the Biology demand signal);
 *   - active on 4+ IST days in their first 28 days (of those who started 28+
 *     days ago);
 *   - chapters done now (median) and on track now (finish date at their pace
 *     on or before the revision buffer);
 *   - fixing mistakes in the drill on 2+ days since starting;
 *   - today's tasks done of those shown: a task counts only if its work landed
 *     by the END OF ITS OWN DAY (IST), so a task finished a week later does
 *     not flatter the day it was set;
 *   - chapter tests the path granted, and how many were started: what the
 *     free-limit exemption costs (§13).
 *
 * Read-only, service role, fed the readout's own reads.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { istDayKey } from "@/lib/email/dueNudge";
import { nextSitting } from "@/lib/exam/calendar";
import type { ProgressEvent } from "@/lib/homework/progress";
import { chapterParts, isFinishedTest, topWorked, type TopSlot } from "@/lib/path/done";
import { isPathExam, type ChapterState, type PathChapter } from "@/lib/path/model";
import { bufferStart, paceStatus } from "@/lib/path/pace";
import { pathRemainingMinutes } from "@/lib/path/view";

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;
const CHUNK = 200;
const MARK_KINDS = new Set(["self_mark", "question_practiced", "answer_wrong", "answer_correct"]);
const SUBJECT_NAME: Record<string, string> = { physics: "Physics", chemistry: "Chemistry", mathematics: "Mathematics" };

export type StarterChapter = {
  board: string;
  subject: string;
  id: string;
  name: string;
  revisionPath: string;
  top: TopSlot[];
  testMockId: string | null;
};
export type StarterEvent = {
  user_id: string;
  kind: string;
  ref_id: string | null;
  created_at: string;
  surface: string | null;
  path: string | null;
  mark: string | null;
};
export type StarterAttempt = {
  user_id: string;
  mock_id: string;
  status: string;
  answered: number;
  submitted_at: string | null;
};

type PathRow = {
  id: string;
  user_id: string;
  exam_slug: string;
  subjects: string[];
  daily_minutes: number;
  started_at: string;
  ended_at: string | null;
};
type DayRow = { user_id: string; day: string; tasks: { kind: string; chapterId?: string; questionIds?: string[] }[] };

const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "-");
const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const toProgress = (e: StarterEvent): ProgressEvent => ({
  questionId: e.ref_id!,
  kind: e.kind as ProgressEvent["kind"],
  at: e.created_at,
  ...(e.mark === "understood" || e.mark === "review" ? { mark: e.mark } : {}),
});

export async function reportStarters(
  db: SupabaseClient,
  ctx: {
    now: Date;
    staff: ReadonlySet<string>;
    /** The Class 12 cohort the readout read events for. */
    cohort: ReadonlySet<string>;
    chapters: readonly StarterChapter[];
    events: readonly StarterEvent[];
    attempts: readonly StarterAttempt[];
  }
): Promise<void> {
  const { data: rows, error } = await db
    .from("study_paths")
    .select("id, user_id, exam_slug, subjects, daily_minutes, started_at, ended_at")
    .order("started_at");
  if (error) {
    console.log(`\nSTARTERS  none to read (${error.message})`);
    return;
  }
  // A student's latest path stands for them; staff are left out.
  const latest = new Map<string, PathRow>();
  for (const r of (rows ?? []) as PathRow[]) if (!ctx.staff.has(r.user_id)) latest.set(r.user_id, r);
  const paths = [...latest.values()];
  const outside = paths.filter((p) => !ctx.cohort.has(p.user_id)).length;
  const starters = paths.filter((p) => ctx.cohort.has(p.user_id));
  console.log(
    `\nSTARTERS  ${paths.length} (active ${paths.filter((p) => !p.ended_at).length}, stopped ${paths.filter((p) => p.ended_at).length})` +
      ` · PCB (no Maths) ${paths.filter((p) => !p.subjects.includes("mathematics")).length}` +
      (outside ? ` · ${outside} not Class 12 by profile, left out below` : "")
  );
  if (starters.length === 0) return;

  const byUser = new Map<string, StarterEvent[]>();
  for (const e of ctx.events) {
    const list = byUser.get(e.user_id) ?? [];
    list.push(e);
    byUser.set(e.user_id, list);
  }
  const today = istDayKey(ctx.now);

  let fourPlus = 0;
  let eligible28 = 0;
  let onTrack = 0;
  let fixers = 0;
  let withMiss = 0;
  const doneCounts: number[] = [];
  for (const p of starters) {
    const evs = byUser.get(p.user_id) ?? [];
    const start = Date.parse(p.started_at);
    if (ctx.now.getTime() - start >= 28 * DAY_MS) {
      eligible28++;
      const days = new Set(
        evs
          .filter((e) => e.created_at >= p.started_at && Date.parse(e.created_at) - start < 28 * DAY_MS)
          .map((e) => istDayKey(new Date(e.created_at)))
      );
      if (days.size >= 4) fourPlus++;
    }

    const mine = ctx.chapters.filter((c) => c.board === p.exam_slug && p.subjects.some((s) => SUBJECT_NAME[s] === c.subject));
    const marks = evs.filter((e) => MARK_KINDS.has(e.kind) && e.ref_id).map(toProgress);
    const seen = new Set(evs.filter((e) => e.kind === "surface_viewed" && e.surface === "board_revision" && e.path).map((e) => e.path!));
    const finished = new Set(ctx.attempts.filter((a) => a.user_id === p.user_id && isFinishedTest(a)).map((a) => a.mock_id));
    const recorded = new Set(evs.filter((e) => e.kind === "path_chapter_done" && e.ref_id).map((e) => e.ref_id!));
    const states = new Map<string, ChapterState>();
    let done = 0;
    for (const c of mine) {
      const tw = topWorked(c.top, marks);
      const st: ChapterState = {
        sheet: seen.has(c.revisionPath),
        topWorked: tw.worked,
        test: c.testMockId ? finished.has(c.testMockId) : true,
        recordedDone: recorded.has(c.id),
      };
      states.set(c.id, st);
      if (st.recordedDone || chapterParts({ sheet: st.sheet, top: tw.complete, test: st.test }).done) done++;
    }
    doneCounts.push(done);

    const sitting = isPathExam(p.exam_slug) ? nextSitting(p.exam_slug, ctx.now) : null;
    if (sitting) {
      // Only what pathRemainingMinutes reads: the parts and their minutes.
      const asPath: PathChapter[] = mine.map((c) => ({
        id: c.id,
        name: c.name,
        subject: "physics",
        queue: "q",
        rank: 0,
        boardPath: c.revisionPath,
        top: c.top,
        test: c.testMockId ? { mockId: c.testMockId, slug: "", minutes: 15 } : null,
      }));
      const pace = paceStatus({
        remaining: pathRemainingMinutes(asPath, states),
        daily: p.daily_minutes,
        today,
        buffer: bufferStart(sitting.date),
      });
      if (pace.onTrack) onTrack++;
    }

    if (evs.some((e) => e.kind === "answer_wrong" && e.created_at >= p.started_at)) {
      withMiss++;
      const drilled = new Set(
        evs
          .filter((e) => e.surface === "drill" && e.created_at >= p.started_at && (e.kind === "answer_wrong" || e.kind === "answer_correct"))
          .map((e) => istDayKey(new Date(e.created_at)))
      );
      if (drilled.size >= 2) fixers++;
    }
  }
  console.log(`  active on 4+ days in their first 28: ${fourPlus} of ${eligible28} who started 28+ days ago (${pct(fourPlus, eligible28)})`);
  console.log(`  chapters done: median ${median(doneCounts)} · on track now ${onTrack} of ${starters.length} (${pct(onTrack, starters.length)})`);
  console.log(`  fixing mistakes on 2+ days since starting: ${fixers} of ${withMiss} with a miss (${pct(fixers, withMiss)})`);

  // Today's tasks, each judged by the end of its own day.
  const users = starters.map((p) => p.user_id);
  const dayRows: DayRow[] = [];
  for (let i = 0; i < users.length; i += CHUNK) {
    const part = users.slice(i, i + CHUNK);
    dayRows.push(
      ...(await readAllPages<DayRow>((f, to) =>
        db.from("study_path_days").select("user_id, day, tasks").in("user_id", part).order("user_id").order("day").range(f, to)
      ))
    );
  }
  const chapterById = new Map(ctx.chapters.map((c) => [c.id, c]));
  let shown = 0;
  let doneByDay = 0;
  for (const d of dayRows) {
    const end = new Date(Date.parse(`${d.day}T00:00:00Z`) + DAY_MS - IST_OFFSET_MS).toISOString();
    const begin = new Date(Date.parse(end) - DAY_MS).toISOString();
    const evs = (byUser.get(d.user_id) ?? []).filter((e) => e.created_at < end);
    for (const t of d.tasks) {
      shown++;
      if (t.kind === "fix") {
        const ids = new Set(t.questionIds ?? []);
        const answered = new Set(evs.filter((e) => e.created_at >= begin && e.ref_id && ids.has(e.ref_id) && MARK_KINDS.has(e.kind)).map((e) => e.ref_id));
        if (ids.size > 0 && answered.size >= ids.size) doneByDay++;
        continue;
      }
      const c = t.chapterId ? chapterById.get(t.chapterId) : undefined;
      if (!c) continue;
      if (t.kind === "sheet" && evs.some((e) => e.kind === "surface_viewed" && e.surface === "board_revision" && e.path === c.revisionPath)) doneByDay++;
      if (t.kind === "top" && topWorked(c.top, evs.filter((e) => MARK_KINDS.has(e.kind) && e.ref_id).map(toProgress)).complete) doneByDay++;
      if (
        t.kind === "test" &&
        ctx.attempts.some((a) => a.user_id === d.user_id && a.mock_id === c.testMockId && isFinishedTest(a) && (a.submitted_at ?? "") < end)
      )
        doneByDay++;
    }
  }
  console.log(`  today's tasks done by the end of their day: ${doneByDay} of ${shown} shown (${pct(doneByDay, shown)}), ${dayRows.length} student-days`);

  const { data: grants, error: gErr } = await db.from("study_path_test_grants").select("user_id, mock_id");
  if (gErr) {
    console.log(`  chapter tests granted: unreadable (${gErr.message})`);
    return;
  }
  const g = (grants ?? []).filter((r) => !ctx.staff.has(r.user_id as string));
  const started = g.filter((r) => ctx.attempts.some((a) => a.user_id === r.user_id && a.mock_id === r.mock_id)).length;
  console.log(`  chapter tests granted ${g.length}, started ${started}`);
}
