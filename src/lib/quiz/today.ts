/**
 * Today's quiz: the one public quiz the daily Instagram Story, the story-reply
 * DM, the Telegram post and the bio link all point at on a given day. Pure;
 * spec in tests/quiz-today.test.ts.
 *
 * ONE PICKER, MANY CALLERS. /go/quiz (the bio + highlight link) redirects with
 * it, and /api/quiz/today hands the same pick to the LWS publisher, which makes
 * the Story card, the DM and the Telegram post. If each computed its own day,
 * a Story could name one quiz while its link opened another.
 *
 * THE ROTATION. Every public quiz gets a day before any repeats, and the order
 * spreads a chapter out so the same chapter does not run two days in a row
 * (Vectors has four quizzes; four Vectors days back to back would read as a
 * Vectors course, not a daily quiz). Publishing a new quiz changes the order, so
 * the bio link can move to a different quiz on the day of a publish; the Story,
 * DM and Telegram post carry the direct /quiz/<slug> link and are unaffected.
 */

export type RotationQuiz = { publicSlug: string; title: string; chapter: string | null };

const SITE_URL = "https://www.pyqvault.com";
const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;

/** One campaign for the whole daily loop, so its arrivals read as one loop. */
export const DAILY_QUIZ_CAMPAIGN = "daily-quiz";

/** Where the link was posted. `bio` is the bare /go/quiz in the Instagram bio. */
export const DAILY_QUIZ_SOURCES = ["story", "dm", "bio", "highlight", "telegram"] as const;
export type DailyQuizSource = (typeof DAILY_QUIZ_SOURCES)[number];

/** Days since the epoch on the Indian calendar: the day turns at midnight IST. */
export function istDay(now: Date): number {
  return Math.floor((now.getTime() + IST_OFFSET_MS) / DAY_MS);
}

/**
 * The rotation order. Greedy: each day takes the chapter with the most quizzes
 * left that is not yesterday's chapter, so a chapter only repeats on consecutive
 * days when it is the only one left. The rotation is a CYCLE (day n+1 is day 1
 * again), so a tie goes to the first day's chapter: used up early, it cannot be
 * left over for the last day and sit next to itself across the wrap. Other ties
 * break on chapter name and a chapter's own quizzes keep their numbered order,
 * so the result never depends on the order the rows came back in.
 */
export function rotationOrder(quizzes: RotationQuiz[]): RotationQuiz[] {
  const groups = new Map<string, RotationQuiz[]>();
  for (const quiz of quizzes) {
    const key = quiz.chapter ?? "";
    const group = groups.get(key) ?? [];
    group.push(quiz);
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    group.sort((a, b) => a.publicSlug.localeCompare(b.publicSlug, "en", { numeric: true }));
  }

  const keys = [...groups.keys()].sort();
  const order: RotationQuiz[] = [];
  let first: string | null = null;
  let last: string | null = null;
  while (order.length < quizzes.length) {
    let pick: string | null = null;
    for (const key of keys) {
      const left = groups.get(key)!.length;
      if (left === 0 || key === last) continue;
      const best = pick === null ? -1 : groups.get(pick)!.length;
      if (left > best || (left === best && key === first)) pick = key;
    }
    pick ??= last!;
    order.push(groups.get(pick)!.shift()!);
    first ??= pick;
    last = pick;
  }
  return order;
}

/** The quiz for the IST day containing `now`; null when nothing is public. */
export function pickTodaysQuiz(quizzes: RotationQuiz[], now: Date): RotationQuiz | null {
  if (quizzes.length === 0) return null;
  const order = rotationOrder(quizzes);
  return order[istDay(now) % order.length];
}

/** An unknown or missing `src` is the bare bio link, the one place it is untagged. */
export function parseDailyQuizSource(raw: string | null): DailyQuizSource {
  const s = (raw ?? "").trim().toLowerCase();
  return (DAILY_QUIZ_SOURCES as readonly string[]).includes(s) ? (s as DailyQuizSource) : "bio";
}

/** The quiz page path with the loop's UTM tags, read by lib/acquisition/source.ts. */
export function dailyQuizPath(publicSlug: string, src: DailyQuizSource): string {
  const params = new URLSearchParams(
    src === "telegram"
      ? { utm_source: "telegram", utm_medium: "channel", utm_campaign: DAILY_QUIZ_CAMPAIGN }
      : { utm_source: "instagram", utm_medium: src, utm_campaign: DAILY_QUIZ_CAMPAIGN }
  );
  return `/quiz/${encodeURIComponent(publicSlug)}?${params}`;
}

/** Hardcoded host, never the request's: a link posted to Instagram must be canonical. */
export function dailyQuizUrl(publicSlug: string, src: DailyQuizSource): string {
  return SITE_URL + dailyQuizPath(publicSlug, src);
}
