/**
 * The study-time report (2026-11-21, owner: "You studied 3 h 20 min this week,
 * 1 h on Calculus"), shared by Home's Study time card and V, so the two show
 * the same numbers. Built from get_study_time (migration 0278): practice and
 * reading from the study clock (0277), mocks from each question's own time.
 *
 * Rules (ENGAGEMENT_SPEC.md principles gate):
 * - Hidden under 15 minutes in the last 7 days: a small number about a
 *   student's own effort reads as "you did nothing".
 * - Never "less than": last week is shown as a plain number, and the usual-day
 *   line appears only when today is above it.
 * - Last week is compared only when the clock ran last week; in the clock's
 *   first week the week counts from its first day ("since Wed"), so mocks from
 *   before it do not sit beside a half-counted week.
 * - Time vs the paper is within ONE subject: a chapter's share of the
 *   student's time in that subject beside its share of that subject's marks in
 *   the exam's past papers (get_chapter_paper_weights, 0242). Not the whole
 *   paper's marks, which would compare a JEE Maths chapter's 3% of the paper
 *   with its 30% of the student's Maths time.
 *
 * Pure. Spec: tests/study-time-report.test.ts.
 */
import { MIN_QUESTIONS_PER_PAPER, type ChapterWeight } from "@/lib/me/startNext";

export type StudyKind = "practice" | "reading" | "mock";

/** One get_study_time row. `day` is YYYY-MM-DD in India time. */
export type StudyRow = {
  day: string;
  kind: StudyKind;
  secs: number;
  chapterId: string | null;
  chapter: string | null;
  subject: string | null;
  examId: string | null;
};

/** Under this in the last 7 days, no card. */
export const CARD_MIN_WEEK_SECS = 15 * 60;
/** Under this on a day, V's day card leaves its study line out. */
export const DAY_LINE_MIN_SECS = 5 * 60;
/** Time vs the paper needs this much in the subject this week. */
export const PAPER_MIN_SUBJECT_SECS = 60 * 60;
/** "Good week on X" needs this much on X. */
const PRAISE_MIN_SECS = 30 * 60;
/** The usual day needs this many days studied in the 28 before today. */
const USUAL_MIN_DAYS = 3;
const USUAL_LOOKBACK_DAYS = 28;
/** Days the card reads: the usual day's 28 plus today. */
export const STUDY_READ_DAYS = USUAL_LOOKBACK_DAYS + 1;

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Split = { practice: number; mock: number; reading: number };
export type ChapterTime = { chapterId: string; chapter: string; subject: string; secs: number };
export type Summary = {
  secs: number;
  split: Split;
  /** Most first. */
  subjects: { subject: string; secs: number }[];
  /** Named chapters only, most first. */
  chapters: ChapterTime[];
};

export type PaperRow = { chapterId: string; chapter: string; secs: number; timePct: number; paperPct: number };

export type StudyCard = {
  examLabel: string;
  /** Today, else the last day studied in the week. */
  today: { label: string; summary: Summary; usualSecs: number | null } | null;
  week: {
    summary: Summary;
    /** The last 7 days, today last ("Today"). */
    days: { day: string; label: string; secs: number }[];
    /** The clock's first day, when it started inside this week ("Wed"). */
    since: string | null;
    lastWeekSecs: number | null;
    /** Every exam together, when the card shows one exam and others add time. */
    allExamsSecs: number | null;
  };
  paper: { subject: string; subjectSecs: number; rows: PaperRow[] } | null;
  /** No paper yet, but the exam has past-paper weights: it shows from an hour in a subject. */
  paperSoon: boolean;
};

export type StudyCardInput = {
  rows: readonly StudyRow[];
  now: Date;
  /** The exam the card shows; null = every exam. */
  examId: string | null;
  examLabel: string;
  /** The exam's past-paper weights ([] = no time vs the paper). */
  weights: readonly ChapterWeight[];
};

export function istDay(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

function weekday(day: string): string {
  return WEEKDAYS[new Date(`${day}T00:00:00Z`).getUTCDay()];
}

/** "42 min", "1 h", "3 h 20 min"; anything under a minute is "1 min". */
export function formatDuration(secs: number): string {
  const mins = Math.max(1, Math.round(secs / 60));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

const pct = (part: number, whole: number) => (whole > 0 ? Math.round((100 * part) / whole) : 0);

export function summarize(rows: readonly StudyRow[]): Summary {
  const split: Split = { practice: 0, mock: 0, reading: 0 };
  const subjects = new Map<string, number>();
  const chapters = new Map<string, ChapterTime>();
  let secs = 0;
  for (const r of rows) {
    secs += r.secs;
    split[r.kind] += r.secs;
    if (r.subject) subjects.set(r.subject, (subjects.get(r.subject) ?? 0) + r.secs);
    if (r.chapterId && r.chapter) {
      const had = chapters.get(r.chapterId);
      if (had) had.secs += r.secs;
      else chapters.set(r.chapterId, { chapterId: r.chapterId, chapter: r.chapter, subject: r.subject ?? "", secs: r.secs });
    }
  }
  const bySecs = <T extends { secs: number }>(a: T, b: T) => b.secs - a.secs;
  return {
    secs,
    split,
    subjects: [...subjects].map(([subject, s]) => ({ subject, secs: s })).sort(bySecs),
    chapters: [...chapters.values()].sort((a, b) => b.secs - a.secs || a.chapter.localeCompare(b.chapter)),
  };
}

function sumByDay(rows: readonly StudyRow[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const r of rows) out.set(r.day, (out.get(r.day) ?? 0) + r.secs);
  return out;
}

/** The median of the days studied in the 28 before `today`; null under 3 such days. */
export function usualDaySecs(rows: readonly StudyRow[], today: string): number | null {
  const oldest = addDays(today, -USUAL_LOOKBACK_DAYS);
  const days = [...sumByDay(rows.filter((r) => r.day < today && r.day >= oldest))].map(([, s]) => s).filter((s) => s >= 60);
  if (days.length < USUAL_MIN_DAYS) return null;
  days.sort((a, b) => a - b);
  const mid = Math.floor(days.length / 2);
  return days.length % 2 ? days[mid] : Math.round((days[mid - 1] + days[mid]) / 2);
}

const isClock = (r: StudyRow) => r.kind !== "mock";

/** The card, or null when the last 7 days hold under 15 minutes. */
export function buildStudyCard(input: StudyCardInput): StudyCard | null {
  const today = istDay(input.now);
  const weekStart = addDays(today, -6);
  const prevStart = addDays(today, -13);
  const rows = input.examId ? input.rows.filter((r) => r.examId === input.examId) : [...input.rows];

  // The clock's first week: no clock row before this week, its first inside it.
  const clockDays = input.rows.filter(isClock).map((r) => r.day).sort();
  const firstClock = clockDays[0] ?? null;
  const since = firstClock && firstClock > weekStart ? firstClock : null;
  const from = since ?? weekStart;

  const inWeek = rows.filter((r) => r.day >= from && r.day <= today);
  const week = summarize(inWeek);
  if (week.secs < CARD_MIN_WEEK_SECS) return null;

  const allWeek = input.rows.filter((r) => r.day >= from && r.day <= today).reduce((n, r) => n + r.secs, 0);
  const prev = rows.filter((r) => r.day >= prevStart && r.day < weekStart);
  const clockLastWeek = input.rows.some((r) => isClock(r) && r.day >= prevStart && r.day < weekStart);

  const perDay = sumByDay(inWeek);
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i);
    return { day, label: day === today ? "Today" : weekday(day), secs: perDay.get(day) ?? 0 };
  });

  // Today, else the latest day of the week with a minute in it.
  const shownDay = [...days].reverse().find((d) => d.secs >= 60)?.day ?? null;
  let todayView: StudyCard["today"] = null;
  if (shownDay) {
    const summary = summarize(inWeek.filter((r) => r.day === shownDay));
    const usual = shownDay === today ? usualDaySecs(rows, today) : null;
    todayView = {
      label: shownDay === today ? "Today" : shownDay === addDays(today, -1) ? "Yesterday" : weekday(shownDay),
      summary,
      usualSecs: usual !== null && summary.secs > usual ? usual : null,
    };
  }

  const paper = paperView(week, input.weights);
  return {
    examLabel: input.examLabel,
    today: todayView,
    week: {
      summary: week,
      days,
      since: since ? weekday(since) : null,
      lastWeekSecs: clockLastWeek && !since ? prev.reduce((n, r) => n + r.secs, 0) : null,
      allExamsSecs: input.examId && allWeek > week.secs ? allWeek : null,
    },
    paper,
    paperSoon: !paper && input.weights.length > 0,
  };
}

/** One weight per chapter (the highest, as Start next keeps it). */
function chapterWeights(weights: readonly ChapterWeight[]): ChapterWeight[] {
  const best = new Map<string, ChapterWeight>();
  for (const w of weights) {
    const had = best.get(w.chapterId);
    if (!had || w.marksPerPaper > had.marksPerPaper) best.set(w.chapterId, w);
  }
  return [...best.values()];
}

function paperView(week: Summary, weights: readonly ChapterWeight[]): StudyCard["paper"] {
  const all = chapterWeights(weights);
  // The subject with the most time that the papers weigh.
  const top = week.subjects.find((s) => all.some((w) => w.subject === s.subject));
  if (!top || top.secs < PAPER_MIN_SUBJECT_SECS) return null;
  const inSubject = all.filter((w) => w.subject === top.subject);
  const marks = inSubject.reduce((n, w) => n + w.marksPerPaper, 0);
  const timeOf = new Map(week.chapters.map((c) => [c.chapterId, c.secs]));
  const rows = inSubject
    .map((w) => {
      const secs = timeOf.get(w.chapterId) ?? 0;
      return { chapterId: w.chapterId, chapter: w.chapter, secs, timePct: pct(secs, top.secs), paperPct: pct(w.marksPerPaper, marks), q: w.qPerPaper };
    })
    .filter((r) => r.secs > 0 || r.q >= MIN_QUESTIONS_PER_PAPER)
    .sort((a, b) => b.secs - a.secs || b.paperPct - a.paperPct || a.chapter.localeCompare(b.chapter))
    .map(({ q: _q, ...r }) => r);
  return rows.length > 0 ? { subject: top.subject, subjectSecs: top.secs, rows } : null;
}

export type StudyNext = {
  chapterId: string;
  chapter: string;
  subject: string;
  /** Its share of the subject's marks in the papers. */
  paperPct: number;
  /** "Good week on X", when X held 30 minutes or more. */
  praise: string | null;
};

/**
 * The one suggestion: the chapter of the paper's subject worth most in the
 * papers that got no time this week, skipping chapters already strong
 * (`strong` = "subject|chapter", the band V's progress card uses). Null when
 * there is none: every weighted chapter got time or is strong.
 */
export function pickStudyNext(card: StudyCard, strong: ReadonlySet<string>): StudyNext | null {
  const paper = card.paper;
  if (!paper) return null;
  const next = paper.rows
    .filter((r) => r.secs === 0 && !strong.has(`${paper.subject}|${r.chapter}`))
    .sort((a, b) => b.paperPct - a.paperPct || a.chapter.localeCompare(b.chapter))[0];
  if (!next) return null;
  const top = card.week.summary.chapters.find((c) => c.subject === paper.subject);
  return {
    chapterId: next.chapterId,
    chapter: next.chapter,
    subject: paper.subject,
    paperPct: next.paperPct,
    praise: top && top.secs >= PRAISE_MIN_SECS ? top.chapter : null,
  };
}

/** One day's time in the exam with its top chapter, for V's day card; null under 5 minutes. */
export function dayStudyLine(
  rows: readonly StudyRow[],
  day: string,
  examId: string | null
): { secs: number; top: { chapter: string; secs: number } | null } | null {
  const summary = summarize(rows.filter((r) => r.day === day && (!examId || r.examId === examId)));
  if (summary.secs < DAY_LINE_MIN_SECS) return null;
  const top = summary.chapters[0];
  return { secs: summary.secs, top: top ? { chapter: top.chapter, secs: top.secs } : null };
}

/** A row of V's "How's my progress" card (lib/chat/progressCard ProgressRow). */
export type StudyProgressRow = { label: string; value: string; detail?: string };

const SPLIT_ORDER: { key: keyof Split; label: string }[] = [
  { key: "practice", label: "Practice" },
  { key: "mock", label: "Mocks" },
  { key: "reading", label: "Reading" },
];

/** V's two study rows: the week's time, and the chapter the paper wants next. Empty without a card. */
export function studyProgressRows(card: StudyCard | null, next: StudyNext | null): StudyProgressRow[] {
  if (!card) return [];
  const w = card.week;
  const split = SPLIT_ORDER.filter((k) => w.summary.split[k.key] >= 60)
    .map((k) => `${k.label} ${formatDuration(w.summary.split[k.key])}`)
    .join(" · ");
  const top = w.summary.chapters[0];
  const detail = [
    split ? `${split}.` : "",
    top ? `Most on ${top.chapter} (${formatDuration(top.secs)}).` : "",
    w.lastWeekSecs !== null ? `Last week ${formatDuration(w.lastWeekSecs)}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const rows: StudyProgressRow[] = [
    { label: "Study time this week", value: formatDuration(w.summary.secs), ...(detail ? { detail } : {}) },
  ];
  if (next) {
    rows.push({
      label: "Time vs the paper",
      value: `${next.chapter} got no time`,
      detail: `It is about ${next.paperPct}% of the ${card.examLabel} ${next.subject} marks.`,
    });
  }
  return rows;
}
