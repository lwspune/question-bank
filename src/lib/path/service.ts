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
import { logActivityBatchOnce } from "@/lib/activity/service";
import type { ActivityEvent } from "@/lib/activity/events";
import { loadOwnPool } from "@/lib/drill/compose";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import { resolveExamDate } from "@/lib/exam/calendar";
import { getOwnProfile } from "@/lib/profile/service";
import { getPathContent } from "./content";
import { readChapterStates } from "./stateRead";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { activeDeferrals, type Deferral } from "./deferrals";
import {
  PATH_SUBJECTS,
  STREAMS,
  chapterDone,
  isPathExam,
  subjectsForStream,
  type ChapterState,
  type PathChapter,
  type PathExam,
  type PathSubject,
  type Stream,
} from "./model";
import { bufferStart, startingDailyMinutes } from "./pace";
import { fixQuestions, isChapterTask, pickToday, taskDone, todayExemptions, type PathTask } from "./today";
import { buildPathView, pathRemainingMinutes, type PathView } from "./view";


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

/** Write `path_chapter_done` once for each chapter newly done. Best effort. */
async function recordNewlyDone(
  db: SupabaseClient,
  userId: string,
  exam: PathExam,
  chapters: readonly PathChapter[],
  states: ReadonlyMap<string, ChapterState>
): Promise<void> {
  const events: ActivityEvent[] = chapters
    .filter((c) => {
      const s = states.get(c.id);
      return s && !s.recordedDone && chapterDone(c, s);
    })
    .map((c) => ({
      kind: "path_chapter_done",
      refId: c.id,
      refKind: "chapter",
      metadata: { exam, subject: c.subject },
      dedupeKey: `path_chapter_done:${userId}:${c.id}`,
    }));
  if (events.length > 0) await logActivityBatchOnce(db, userId, events);
}

export type PathToday = { path: ActivePath; view: PathView };

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
  const [{ states, lastWorkAt }, deferrals, stored] = await Promise.all([
    readChapterStates(db, userId, chapters),
    readDeferrals(db, path.id),
    readDay(db, userId, day),
  ]);
  if (opts.write) await recordNewlyDone(db, userId, path.exam, chapters, states);

  let tasks = stored?.tasks ?? null;
  if (!tasks) {
    const pool = await loadOwnPool(db, userId, now);
    const fix = fixQuestions(pool.drillable, new Set(chapters.map((c) => c.id)), dayStart);
    tasks = pickToday({
      chapters,
      states,
      deferred: activeDeferrals(deferrals, lastWorkAt, now),
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

  return {
    path,
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
    }),
  };
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
