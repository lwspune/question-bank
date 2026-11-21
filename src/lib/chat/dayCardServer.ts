/**
 * The reads behind V's "Your day" card (lib/chat/dayCard.ts), all through the
 * student's own login, like "How's my progress" (progressCardServer):
 * get_own_day_card (0262) for practice per day, get_own_performance for mocks
 * and chapter bands, the drill's own ladder for fixed and waiting, and the
 * board plan's own read for a student on it, so V and Home show one task.
 * The exam countdown (2026-11-21) adds the exam's chapter weights, the same
 * cached read as Home's "Start next" (loadChapterWeights, a day's cache).
 */
import type { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveExamDate } from "@/lib/exam/calendar";
import { getOwnProfile } from "@/lib/profile/service";
import { getOwnLadder } from "@/lib/drill/service";
import { getOwnPerformance } from "@/lib/performance/service";
import { selectAttempts } from "@/lib/performance/compute";
import { getActivePath, getPathToday } from "@/lib/path/service";
import { isPathExam } from "@/lib/path/model";
import { dueByChapter } from "@/lib/drill/select";
import { loadChapterWeights } from "@/lib/me/startNextServer";
import { mockDays, movedUpSince, pickProgressExams } from "./progressCard";
import { examByName, examBySlug, examIdOf } from "./progressCardServer";
import { loadStudyRows } from "@/lib/studyTime/reportServer";
import { dayStudyLine, type StudyRow } from "@/lib/studyTime/report";
import {
  buildDayCard,
  DAY_LOOKBACK_DAYS,
  COUNTDOWN_DAYS,
  COUNTDOWN_MOCK_DAYS,
  fixedBetween,
  lastVisit,
  mergeDays,
  planDoneOn,
  type DayCard,
  type DayPlan,
  type DaySpan,
} from "./dayCard";

const IST_OFFSET_MS = 5.5 * 3_600_000;

type DayPayload = {
  exam_id: string | null;
  exam_name: string | null;
  days: { day: string; answered: number; right: number; top_chapter: string | null; top_answered: number }[];
};

/** The card for the student's main exam, or null when there is nothing to say. */
export async function loadDayCard(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  now: Date = new Date()
): Promise<DayCard | null> {
  const [profile, perf, ladder, active, studyRows] = await Promise.all([
    getOwnProfile(db, userId),
    getOwnPerformance(),
    getOwnLadder(db, userId, now),
    getActivePath(db, userId).catch(() => null),
    // Study time (2026-11-21): only adds a line, so a failed read costs that line.
    loadStudyRows(db, userId, now, DAY_LOOKBACK_DAYS + 1).catch((e: unknown) => {
      console.error("day card: study time read failed", e instanceof Error ? e.message : e);
      return [] as StudyRow[];
    }),
  ]);

  const latest = perf ? selectAttempts(perf.attempts, perf.facts).kept.sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0] : undefined;
  // A student on the board plan gets the plan's exam: its task is the day's step,
  // even when another exam comes first on their profile (real data, 2026-11-15).
  const picked = pickProgressExams({
    asked: active && isPathExam(active.exam) ? active.exam : null,
    targetExams: profile.targetExams,
    latestMockExam: examByName(latest?.examName ?? null)?.slug ?? null,
  });
  let exam = picked.exam ? examBySlug(picked.exam) : null;

  const pickedId = exam ? await examIdOf(db, exam.examName) : null;
  const { data, error } = await db.rpc("get_own_day_card", { p_exam_id: pickedId });
  if (error) throw new Error(`get_own_day_card: ${error.message}`);
  const payload = (data ?? { days: [] }) as DayPayload;
  exam ??= examByName(payload.exam_name);
  if (!exam) return null;

  const practice: DaySpan[] = (payload.days ?? []).map((d) => ({
    day: d.day,
    answered: Number(d.answered),
    right: Number(d.right),
    topChapter: d.top_chapter ? { name: d.top_chapter, answered: Number(d.top_answered) } : null,
  }));
  const days = mergeDays(practice, perf ? mockDays(perf, exam.examName) : []);
  const last = lastVisit(days, now);
  const lastStart = last ? new Date(Date.parse(`${last.day}T00:00:00Z`) - IST_OFFSET_MS) : null;

  let plan: DayPlan | null = null;
  if (isPathExam(exam.slug)) {
    const today = await getPathToday(db, userId, { write: true, profile, now }).catch((e: unknown) => {
      // The plan only adds lines; without it the card still shows the answers and Fix.
      console.error("day card: board plan read failed", e);
      return null;
    });
    if (today && today.path.exam === exam.slug) {
      plan = {
        doneOnDay: last ? planDoneOn(last.day, today.chapters, today.facts) : [],
        chaptersDone: today.view.subjects.reduce((n, s) => n + s.done, 0),
        chaptersOf: today.view.subjects.reduce((n, s) => n + s.of, 0),
        tasks: today.view.tasks.map((t) => ({ title: t.title, detail: t.detail, href: t.href, minutes: t.minutes, done: t.done })),
      };
    }
  }

  const countdown = resolveExamDate(
    { targetExams: [exam.slug], examDate: profile.targetExams[0] === exam.slug ? profile.examDate : null },
    now
  );
  // The chapter weights only matter inside the countdown's window; a failed
  // read is [] (loadChapterWeights), which shows no countdown row.
  const examId = pickedId ?? payload.exam_id;
  const weights =
    countdown && countdown.daysLeft > COUNTDOWN_MOCK_DAYS && countdown.daysLeft <= COUNTDOWN_DAYS && examId
      ? await loadChapterWeights(examId)
      : [];

  return buildDayCard({
    exam: { slug: exam.slug, displayName: exam.displayName },
    now,
    daysLeft: countdown?.daysLeft ?? null,
    countdown: countdown
      ? { label: countdown.label, date: countdown.date, official: countdown.official, daysLeft: countdown.daysLeft }
      : null,
    bigChapters: weights.map((w) => ({
      chapterId: w.chapterId,
      chapter: w.chapter,
      subject: w.subject,
      examName: w.exam,
      qPerPaper: w.qPerPaper,
      marksPerPaper: w.marksPerPaper,
    })),
    dueByChapter: dueByChapter(ladder.due),
    days,
    fixedOnDay: last ? fixedBetween(ladder.events, last.day) : 0,
    fixedTotal: ladder.fixed,
    dueChapters: ladder.due.map((d) => d.chapter),
    movedUp: perf && lastStart ? movedUpSince(perf, exam.examName, now, lastStart) : [],
    plan,
    studyOnDay: last ? dayStudyLine(studyRows, last.day, pickedId ?? payload.exam_id) : null,
  });
}
