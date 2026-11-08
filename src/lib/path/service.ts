/**
 * The board path on the server (MENTOR_SPEC.md Phase 1): the student's active
 * path, their chapters' state folded from what they did, today's tasks, and
 * the start / stop / "Not taught yet" writes.
 *
 * WHO WRITES WHAT
 *   - study_paths, study_path_deferrals and path_chapter_done events: the
 *     student's own client (own-row RLS).
 *   - study_path_days (today's pick) and study_path_test_grants: the service
 *     role ONLY. They carry the free-limit exemptions (§6), so a student must
 *     never be able to write them; the routes decide, never the browser.
 *
 * STABLE THROUGH THE DAY. Today's pick is stored on its first read of the IST
 * day and read back after, so the card does not reshuffle as work lands; done
 * is computed live. "Not taught yet" replans: it keeps the card's other tasks
 * and fills after them (today.ts `keep`).
 *
 * The staff view of a student's /me reads with `write: false`: it computes
 * today's pick without storing it, so a teacher looking cannot fix the
 * student's day or grant them a test.
 *
 * Reads are chunked at 200 ids and paged at 1000 rows (CLAUDE.md pitfalls).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildActivityRow, type ActivityEvent } from "@/lib/activity/events";
import { loadOwnPool } from "@/lib/drill/compose";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import { resolveExamDate } from "@/lib/exam/calendar";
import { getOwnProfile } from "@/lib/profile/service";
import { getPathContent } from "./content";
import { readChapterStates } from "./stateRead";
import type { ChapterFacts } from "./fold";
import { ensureExemptions, readTodayRow, type TodayExemptions } from "./exemptions";
import { buildWeekReview, istMidnight, reviewLines, reviewWindow } from "./review";
import { projectWeek, weekText } from "./week";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { activeDeferrals, type Deferral } from "./deferrals";
import {
  PATH_SUBJECTS,
  STREAMS,
  chapterDone,
  isPathExam,
  subjectsForStream,
  NOTHING_DONE,
  type ChapterState,
  type PathChapter,
  type PathExam,
  type PathSubject,
  type Stream,
} from "./model";
import { bufferStart, startingDailyMinutes } from "./pace";
import { fixQuestions, isChapterTask, pickToday, taskDone, todayExemptions, type PathTask } from "./today";
import { buildPathView, chapterLine, examLineOf, pathRemainingMinutes, type ChapterLine, type PathView } from "./view";
import type { PathForV } from "@/lib/chat/weekPlan";


export type ActivePath = {
  id: string;
  exam: PathExam;
  subjects: PathSubject[];
  dailyMinutes: number;
  startedAt: string;
};

export async function getActivePath(db: SupabaseClient, userId: string): Promise<ActivePath | null> {
  const { data, error } = await db
    .from("study_paths")
    .select("id, exam_slug, subjects, daily_minutes, started_at")
    .eq("user_id", userId)
    .is("ended_at", null)
    .maybeSingle();
  if (error) throw new Error(`study path: ${error.message}`);
  if (!data || !isPathExam(data.exam_slug)) return null;
  return {
    id: data.id as string,
    exam: data.exam_slug,
    subjects: ((data.subjects as string[]) ?? []).filter((s): s is PathSubject => (PATH_SUBJECTS as readonly string[]).includes(s)),
    dailyMinutes: data.daily_minutes as number,
    startedAt: data.started_at as string,
  };
}

/** The board date the path paces to: the student's own date when the board is their first exam, else the calendar's. */
export function boardDateFor(
  exam: PathExam,
  profile: { targetExams: readonly string[]; examDate: string | null },
  now: Date
): { date: string; official: boolean } | null {
  const own = profile.targetExams[0] === exam ? profile.examDate : null;
  const c = resolveExamDate({ targetExams: [exam], examDate: own }, now);
  return c ? { date: c.date, official: c.official } : null;
}

async function readDeferrals(db: SupabaseClient, pathId: string): Promise<Deferral[]> {
  const rows = await readAllPages<{ chapter_id: string; deferred_at: string }>(
    (f, t) => db.from("study_path_deferrals").select("chapter_id, deferred_at").eq("path_id", pathId).order("id").range(f, t)
  );
  return rows.map((r) => ({ chapterId: r.chapter_id, at: r.deferred_at }));
}

type DayRow = { tasks: PathTask[]; fix_question_ids: string[] };

async function readDay(db: SupabaseClient, userId: string, day: string): Promise<DayRow | null> {
  const { data, error } = await db
    .from("study_path_days")
    .select("tasks, fix_question_ids")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();
  if (error) throw new Error(`path day: ${error.message}`);
  return (data as DayRow | null) ?? null;
}

/** Store today's pick and grant its chapter tests. Service role only. */
async function writeDay(
  userId: string,
  pathId: string,
  day: string,
  tasks: readonly PathTask[],
  chapters: readonly PathChapter[],
  replace: boolean
): Promise<void> {
  const admin = createSupabaseAdminClient();
  const ex = todayExemptions(tasks, chapters);
  const row = {
    user_id: userId,
    day,
    path_id: pathId,
    tasks,
    exempt_question_ids: ex.revealIds,
    fix_question_ids: ex.drillIds,
    updated_at: new Date().toISOString(),
  };
  const { error } = await admin
    .from("study_path_days")
    .upsert(row, { onConflict: "user_id,day", ignoreDuplicates: !replace });
  if (error) throw new Error(`path day write: ${error.message}`);
  if (ex.testMockIds.length > 0) {
    const { error: gErr } = await admin
      .from("study_path_test_grants")
      .upsert(
        ex.testMockIds.map((mock_id) => ({ user_id: userId, mock_id, path_id: pathId })),
        { onConflict: "user_id,mock_id", ignoreDuplicates: true }
      );
    if (gErr) throw new Error(`path test grants: ${gErr.message}`);
  }
}

/**
 * Question ids among `ids` the student answered since `sinceIso`, on any page:
 * the Fix task's link is the drill, but a mistake fixed in the bank first is
 * fixed too, and would otherwise hold the task open all day.
 */
async function answeredSince(db: SupabaseClient, userId: string, ids: readonly string[], sinceIso: string): Promise<Set<string>> {
  if (ids.length === 0) return new Set();
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id")
    .eq("user_id", userId)
    .in("kind", ["answer_wrong", "answer_correct", "question_practiced", "self_mark"])
    .in("ref_id", [...ids])
    .gte("created_at", sinceIso);
  if (error) throw new Error(`path fix answers: ${error.message}`);
  return new Set((data ?? []).map((r) => r.ref_id as string));
}

/**
 * Write `path_chapter_done` once for each chapter newly done, and return the
 * ones THIS call wrote: the upsert returns only rows it inserted, so a chapter
 * is celebrated once even with two tabs open (the milestone pattern,
 * lib/celebrate/service). Best effort: a failure celebrates nothing.
 */
async function recordNewlyDone(
  db: SupabaseClient,
  userId: string,
  exam: PathExam,
  chapters: readonly PathChapter[],
  states: ReadonlyMap<string, ChapterState>,
  now: Date
): Promise<string[]> {
  const nowIso = now.toISOString();
  const rows = chapters
    .filter((c) => {
      const s = states.get(c.id);
      return s && !s.recordedDone && chapterDone(c, s);
    })
    .map((c) => {
      const event: ActivityEvent = {
        kind: "path_chapter_done",
        refId: c.id,
        refKind: "chapter",
        metadata: { exam, subject: c.subject },
        dedupeKey: `path_chapter_done:${userId}:${c.id}`,
      };
      return buildActivityRow(userId, event, nowIso);
    });
  if (rows.length === 0) return [];
  try {
    const { data, error } = await db
      .from("user_activity")
      .upsert(rows, { onConflict: "dedupe_key", ignoreDuplicates: true })
      .select("ref_id");
    if (error) {
      console.error("path chapter done write failed", error.message);
      return [];
    }
    return (data ?? []).map((r) => r.ref_id as string).filter(Boolean);
  } catch (e) {
    console.error("path chapter done write threw", e);
    return [];
  }
}

/** Fix questions of the week's cards answered right in that week (the review's "mistakes fixed"). */
async function fixedInWeek(db: SupabaseClient, userId: string, from: string, to: string): Promise<number> {
  const { data: days, error } = await db
    .from("study_path_days")
    .select("fix_question_ids")
    .eq("user_id", userId)
    .gte("day", from)
    .lt("day", to);
  if (error) throw new Error(`path week days: ${error.message}`);
  const ids = [...new Set((days ?? []).flatMap((d) => (d.fix_question_ids as string[] | null) ?? []))];
  if (ids.length === 0) return 0;
  // At most 5 a day, 35 a week: one .in() list.
  const { data, error: aErr } = await db
    .from("user_activity")
    .select("ref_id, kind, correct:metadata->>correct")
    .eq("user_id", userId)
    .in("kind", ["answer_correct", "question_practiced"])
    .in("ref_id", ids)
    .gte("created_at", istMidnight(from))
    .lt("created_at", istMidnight(to));
  if (aErr) throw new Error(`path week fixes: ${aErr.message}`);
  return new Set((data ?? []).filter((r) => r.kind === "answer_correct" || r.correct === "true").map((r) => r.ref_id as string)).size;
}

function latest(values: Iterable<string>): string | null {
  let best: string | null = null;
  for (const v of values) if (best === null || Date.parse(v) > Date.parse(best)) best = v;
  return best;
}

export type PathToday = {
  path: ActivePath;
  view: PathView;
  chapters: PathChapter[];
  states: Map<string, ChapterState>;
  tasks: PathTask[];
  deferred: Set<string>;
};

/**
 * Today on the student's path, or null without an active path (or a board
 * date to pace to). `write: false` for the staff view: nothing is stored.
 */
export async function getPathToday(
  db: SupabaseClient,
  userId: string,
  opts: {
    write: boolean;
    profile: { targetExams: readonly string[]; examDate: string | null; stream: string | null };
    now?: Date;
  }
): Promise<PathToday | null> {
  const now = opts.now ?? new Date();
  const path = await getActivePath(db, userId);
  if (!path) return null;
  const board = boardDateFor(path.exam, opts.profile, now);
  if (!board) return null;

  const day = istDayKey(now);
  const dayStart = istDayStartIso(now);
  const chapters = await getPathContent(path.exam, path.subjects);
  const [{ states, lastWorkAt, facts }, deferrals, stored] = await Promise.all([
    readChapterStates(db, userId, chapters),
    readDeferrals(db, path.id),
    readDay(db, userId, day),
  ]);
  const newlyDone = opts.write ? await recordNewlyDone(db, userId, path.exam, chapters, states, now) : [];
  const deferred = activeDeferrals(deferrals, lastWorkAt, now);

  let tasks = stored?.tasks ?? null;
  if (!tasks) {
    const pool = await loadOwnPool(db, userId, now);
    const fix = fixQuestions(pool.drillable, new Set(chapters.map((c) => c.id)), dayStart);
    tasks = pickToday({
      chapters,
      states,
      deferred,
      budget: path.dailyMinutes,
      fix,
    });
    if (opts.write) {
      await writeDay(userId, path.id, day, tasks, chapters, false);
      // Two tabs can race on the first read of the day: read back the one kept.
      tasks = (await readDay(db, userId, day))?.tasks ?? tasks;
    }
  }

  const fixIds = tasks.flatMap((t) => (t.kind === "fix" ? t.questionIds : []));
  const fixAnswered = await answeredSince(db, userId, fixIds, dayStart);
  const stream = (STREAMS as readonly string[]).includes(opts.profile.stream ?? "") ? (opts.profile.stream as Stream) : null;
  const startDay = istDayKey(new Date(path.startedAt));
  const lastWork = latest(lastWorkAt.values());
  const review = await weekReview(db, userId, path, chapters, facts, tasks, startDay, day).catch((e) => {
    console.error("path week review failed", e instanceof Error ? e.message : e);
    return null;
  });

  return {
    path,
    chapters,
    states,
    tasks,
    deferred,
    view: buildPathView({
      exam: path.exam,
      subjects: path.subjects,
      stream,
      dailyMinutes: path.dailyMinutes,
      chapters,
      states,
      tasks,
      fixAnswered,
      today: day,
      examDate: board.date,
      examOfficial: board.official,
      startDay,
      lastWorkDay: lastWork ? istDayKey(new Date(lastWork)) : null,
      review,
      newlyDone,
    }),
  };
}

/** The weekly review's lines when one shows today (review.ts), else null. */
async function weekReview(
  db: SupabaseClient,
  userId: string,
  path: ActivePath,
  chapters: readonly PathChapter[],
  facts: ChapterFacts,
  tasks: readonly PathTask[],
  startDay: string,
  today: string
): Promise<string[] | null> {
  const window = reviewWindow(startDay, today);
  if (!window) return null;
  const byId = new Map(chapters.map((c) => [c.id, c]));
  const nextTask = tasks.find(isChapterTask);
  const next = nextTask && isChapterTask(nextTask) ? (byId.get(nextTask.chapterId)?.name ?? null) : null;
  const fixed = await fixedInWeek(db, userId, window.from, window.to);
  return reviewLines(buildWeekReview({ chapters, facts, from: window.from, to: window.to, daily: path.dailyMinutes, fixed, next }));
}

export type PathOffer = { exam: PathExam; minutes: number; stream: Stream | null };

/**
 * The start card's offer for a Class 12 student with no active path: their
 * board (the first of their target exams that is one) and about how many
 * minutes a day it takes, from the content alone (no per-student read: the
 * path starts from zero, so this is the most it can ask).
 */
export async function getPathOffer(
  profile: { targetExams: readonly string[]; examDate: string | null; stream: string | null },
  now: Date = new Date()
): Promise<PathOffer | null> {
  const exam = profile.targetExams.find(isPathExam);
  if (!exam) return null;
  const board = boardDateFor(exam, profile, now);
  if (!board) return null;
  const stream = (STREAMS as readonly string[]).includes(profile.stream ?? "") ? (profile.stream as Stream) : null;
  const chapters = await getPathContent(exam, subjectsForStream(stream ?? "pcm"));
  if (chapters.length === 0) return null;
  const minutes = startingDailyMinutes(pathRemainingMinutes(chapters, new Map()), istDayKey(now), bufferStart(board.date));
  return { exam, minutes, stream };
}

export class PathError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

/**
 * Start a path (or return the one already active on this board). Saves the
 * stream to the profile, which most Class 12 students have never given.
 */
export async function startPath(
  db: SupabaseClient,
  userId: string,
  input: { exam: PathExam; stream: Stream },
  profile: { targetExams: readonly string[]; examDate: string | null },
  now: Date = new Date()
): Promise<ActivePath> {
  const existing = await getActivePath(db, userId);
  if (existing) {
    if (existing.exam === input.exam) return existing;
    throw new PathError("You already have a path. Stop it on your account page first.", 409);
  }
  const board = boardDateFor(input.exam, profile, now);
  if (!board) throw new PathError("No board date to plan to.", 409);

  const subjects = subjectsForStream(input.stream);
  const chapters = await getPathContent(input.exam, subjects);
  if (chapters.length === 0) throw new PathError("This board's chapters could not be read.", 503);
  const { states } = await readChapterStates(db, userId, chapters);
  const dailyMinutes = startingDailyMinutes(pathRemainingMinutes(chapters, states), istDayKey(now), bufferStart(board.date));

  const { error: profileErr } = await db
    .from("student_profiles")
    .upsert({ user_id: userId, academic_stream: input.stream, updated_at: now.toISOString() }, { onConflict: "user_id" });
  if (profileErr) console.error("path start: stream not saved", profileErr.message);

  const { data, error } = await db
    .from("study_paths")
    .insert({ user_id: userId, exam_slug: input.exam, subjects, daily_minutes: dailyMinutes })
    .select("id, started_at")
    .single();
  if (error) {
    // A second tab started one a moment ago.
    if (error.code === "23505") {
      const again = await getActivePath(db, userId);
      if (again) return again;
    }
    throw new Error(`path start: ${error.message}`);
  }
  return { id: data.id as string, exam: input.exam, subjects, dailyMinutes, startedAt: data.started_at as string };
}

/** End the active path. Chapters done stay done: done comes from work (D7). */
export async function stopPath(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<void> {
  const { error } = await db
    .from("study_paths")
    .update({ ended_at: now.toISOString() })
    .eq("user_id", userId)
    .is("ended_at", null);
  if (error) throw new Error(`path stop: ${error.message}`);
}

/**
 * "Not taught yet": record the tap, then replan today keeping the card's other
 * tasks (and this chapter's tasks already done) and filling after them.
 */
export async function deferChapter(
  db: SupabaseClient,
  userId: string,
  chapterId: string,
  now: Date = new Date()
): Promise<void> {
  const path = await getActivePath(db, userId);
  if (!path) throw new PathError("You have no path to change.", 409);
  const chapters = await getPathContent(path.exam, path.subjects);
  if (!chapters.some((c) => c.id === chapterId)) throw new PathError("That chapter is not on your path.", 400);

  const { error } = await db
    .from("study_path_deferrals")
    .insert({ path_id: path.id, user_id: userId, chapter_id: chapterId, deferred_at: now.toISOString() });
  if (error) throw new Error(`path defer: ${error.message}`);

  const day = istDayKey(now);
  const [{ states, lastWorkAt }, deferrals, stored] = await Promise.all([
    readChapterStates(db, userId, chapters),
    readDeferrals(db, path.id),
    readDay(db, userId, day),
  ]);
  if (!stored) return; // Today is picked on the next read, without this chapter.
  const fixIds = stored.tasks.flatMap((t) => (t.kind === "fix" ? t.questionIds : []));
  const fixAnswered = await answeredSince(db, userId, fixIds, istDayStartIso(now));
  const keep = stored.tasks.filter(
    (t) => !(isChapterTask(t) && t.chapterId === chapterId && !taskDone(t, chapters, states, fixAnswered))
  );
  const tasks = pickToday({
    chapters,
    states,
    deferred: activeDeferrals(deferrals, lastWorkAt, now),
    budget: path.dailyMinutes,
    fix: [],
    keep,
  });
  await writeDay(userId, path.id, day, tasks, chapters, true);
}

export type PathCard = { path: PathView | null; offer: PathOffer | null };

/**
 * What /me shows for the path: today on it, or the start offer for a student
 * whose exams include a Class 12 board, or nothing. `write: false` is the staff
 * view (nothing stored). Only students with a board among their exams pay for
 * the reads.
 */
export async function loadPathCard(
  db: SupabaseClient,
  userId: string,
  targetExams: readonly string[],
  opts: { write: boolean; now?: Date }
): Promise<PathCard> {
  if (!targetExams.some(isPathExam)) return { path: null, offer: null };
  const profile = await getOwnProfile(db, userId);
  const today = await getPathToday(db, userId, { write: opts.write, profile, now: opts.now });
  if (today) return { path: today.view, offer: null };
  return { path: null, offer: await getPathOffer(profile, opts.now) };
}

/** For /account: the active path, and whether one was stopped with none active. */
export async function getPathSettings(
  db: SupabaseClient,
  userId: string
): Promise<{ active: ActivePath | null; stopped: boolean }> {
  const active = await getActivePath(db, userId);
  if (active) return { active, stopped: false };
  const { count, error } = await db
    .from("study_paths")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .not("ended_at", "is", null);
  if (error) throw new Error(`path settings: ${error.message}`);
  return { active: null, stopped: (count ?? 0) > 0 };
}

/**
 * Today's free-limit exemptions, picking today first when a path student has
 * no pick yet (Phase 2: a /board page or the drill opened before /me on a new
 * day). Used by /api/me/reveals and the drill's allowance.
 */
export async function ensureTodayExemptions(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<TodayExemptions> {
  return ensureExemptions({
    read: () => readTodayRow(db, userId, now),
    hasPath: async () => (await getActivePath(db, userId)) !== null,
    pick: async () => {
      const profile = await getOwnProfile(db, userId);
      await getPathToday(db, userId, { write: true, profile, now });
    },
  });
}

/** "Physics, Chemistry and Maths". */
function subjectWords(subjects: readonly PathSubject[]): string {
  const names = subjects.map((s) => (s === "mathematics" ? "Maths" : s === "physics" ? "Physics" : "Chemistry"));
  return names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * What V knows of the student's board path (Phase 2, lib/chat/weekPlan):
 * today's card and the coming days for a student on it, the offer for a Class
 * 12 board student without one, else nothing. Writes today's pick like /me.
 */
export async function getPathForV(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<PathForV> {
  const profile = await getOwnProfile(db, userId);
  if (!profile.targetExams.some(isPathExam)) return { kind: "none" };
  const today = await getPathToday(db, userId, { write: true, profile, now });
  if (today) {
    const v = today.view;
    const week = projectWeek({
      chapters: today.chapters,
      states: today.states,
      deferred: today.deferred,
      budget: today.path.dailyMinutes,
      today: istDayKey(now),
      todayTasks: today.tasks,
    });
    return {
      kind: "on",
      exam: today.path.exam,
      examLine: v.examLine,
      status: v.statusLine,
      today: v.tasks.map((t) => `${t.done ? "Done: " : ""}${t.title}${t.detail ? `: ${t.detail}` : ""}, about ${t.minutes} min, ${t.href}`),
      week: weekText(week.slice(1), today.chapters),
    };
  }
  const offer = await getPathOffer(profile, now);
  const board = offer ? boardDateFor(offer.exam, profile, now) : null;
  if (!offer || !board) return { kind: "none" };
  return {
    kind: "offer",
    exam: offer.exam,
    minutes: offer.minutes,
    subjects: subjectWords(subjectsForStream(offer.stream ?? "pcm")),
    examLine: examLineOf(offer.exam, board.date, board.official),
  };
}

export type BoardPathLine = { line: ChapterLine | null; celebrate: string[] };

/**
 * The path's line on a /board chapter page (D8) for a student on the path:
 * this chapter's parts, today's part of it, and any chapter newly done, said
 * once (the page's own trigger surface). Null line when the chapter is not on
 * their path. Writes today's pick like /me, so the page's free answers work.
 */
export async function getBoardPathLine(db: SupabaseClient, userId: string, chapterId: string, now: Date = new Date()): Promise<BoardPathLine> {
  const profile = await getOwnProfile(db, userId);
  const today = await getPathToday(db, userId, { write: true, profile, now });
  if (!today) return { line: null, celebrate: [] };
  const c = today.chapters.find((x) => x.id === chapterId);
  return {
    line: c ? chapterLine(c, today.states.get(c.id) ?? NOTHING_DONE, today.tasks) : null,
    celebrate: today.view.celebrate,
  };
}

/**
 * After a test's result (Phase 2): any chapter it finished, said once on the
 * result page. Only when the student is on a path and this test is one of the
 * path's chapter tests; anyone else pays one indexed read.
 */
export async function pathCelebrationsAfterTest(db: SupabaseClient, userId: string, mockSlug: string, now: Date = new Date()): Promise<string[]> {
  const path = await getActivePath(db, userId);
  if (!path) return [];
  const chapters = await getPathContent(path.exam, path.subjects);
  if (!chapters.some((c) => c.test?.slug === mockSlug)) return [];
  const profile = await getOwnProfile(db, userId);
  const today = await getPathToday(db, userId, { write: true, profile, now });
  return today?.view.celebrate ?? [];
}
