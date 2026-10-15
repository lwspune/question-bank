import { describe, expect, it } from "vitest";
import {
  DAILY_QUIZ_CAMPAIGN,
  DAILY_QUIZ_SOURCES,
  dailyQuizLinks,
  parseIstDate,
  dailyQuizPath,
  dailyQuizUrl,
  istDay,
  parseDailyQuizSource,
  pickTodaysQuiz,
  rotationOrder,
  type RotationQuiz,
} from "@/lib/quiz/today";

const q = (publicSlug: string, chapter: string | null): RotationQuiz => ({
  publicSlug,
  title: publicSlug,
  chapter,
});

function adjacentRepeats(order: RotationQuiz[]): number {
  let n = 0;
  for (let i = 1; i < order.length; i++) if (order[i].chapter === order[i - 1].chapter) n++;
  return n;
}

describe("istDay", () => {
  it("rolls over at midnight IST, not midnight UTC", () => {
    // 18:29 UTC = 23:59 IST; 18:30 UTC = 00:00 IST the next day.
    const before = istDay(new Date("2026-10-16T18:29:59Z"));
    const after = istDay(new Date("2026-10-16T18:30:00Z"));
    expect(after - before).toBe(1);
  });

  it("is the same IST day across one IST calendar day", () => {
    expect(istDay(new Date("2026-10-16T00:00:00+05:30"))).toBe(
      istDay(new Date("2026-10-16T23:59:59+05:30"))
    );
  });
});

describe("rotationOrder", () => {
  it("never puts the same chapter on two days running when that is possible", () => {
    const quizzes = [
      q("vectors-1", "Vectors"),
      q("vectors-2", "Vectors"),
      q("vectors-3", "Vectors"),
      q("stats-1", "Statistics"),
      q("stats-2", "Statistics"),
      q("circles-1", "Circles"),
      q("lines-1", "Lines"),
    ];
    const order = rotationOrder(quizzes);
    expect(order).toHaveLength(quizzes.length);
    expect(new Set(order.map((x) => x.publicSlug)).size).toBe(quizzes.length);
    expect(adjacentRepeats(order)).toBe(0);
  });

  it("does not repeat a chapter when the rotation starts over", () => {
    // The live shape on 2026-10-17: one big chapter that sorts last by name,
    // a few mid-size ones, many singles. Greedy alone put Vectors first AND last.
    const quizzes = [
      ...[1, 2, 3, 4].map((i) => q(`vectors-${i}`, "Vectors")),
      ...[1, 2, 3].map((i) => q(`stats-${i}`, "Statistics")),
      ...[1, 2].map((i) => q(`prob-${i}`, "Probability")),
      ...["Circles", "Conics", "Lines", "Logarithms", "Sets"].map((c) => q(`${c}-1`, c)),
    ];
    const order = rotationOrder(quizzes);
    expect(adjacentRepeats(order)).toBe(0);
    expect(order[order.length - 1].chapter).not.toBe(order[0].chapter);
  });

  it("does not depend on the order the database returned the rows in", () => {
    const quizzes = [
      q("b-1", "B"),
      q("a-1", "A"),
      q("a-2", "A"),
      q("c-1", "C"),
    ];
    const reversed = [...quizzes].reverse();
    expect(rotationOrder(reversed).map((x) => x.publicSlug)).toEqual(
      rotationOrder(quizzes).map((x) => x.publicSlug)
    );
  });

  it("keeps a chapter's quizzes in their numbered order", () => {
    const order = rotationOrder([q("s-2", "S"), q("s-1", "S"), q("t-1", "T"), q("s-3", "S")]);
    const s = order.filter((x) => x.chapter === "S").map((x) => x.publicSlug);
    expect(s).toEqual(["s-1", "s-2", "s-3"]);
  });

  it("treats quizzes with no chapter as one group", () => {
    const order = rotationOrder([q("x", null), q("y", null), q("z", "Z")]);
    expect(order).toHaveLength(3);
    expect(adjacentRepeats(order)).toBe(0);
  });
});

describe("pickTodaysQuiz", () => {
  const quizzes = [q("a-1", "A"), q("b-1", "B"), q("c-1", "C")];

  it("returns null when nothing is published", () => {
    expect(pickTodaysQuiz([], new Date())).toBeNull();
  });

  it("gives every quiz one day before any repeats", () => {
    const start = new Date("2026-10-17T06:00:00+05:30");
    const seen = [0, 1, 2].map(
      (d) => pickTodaysQuiz(quizzes, new Date(start.getTime() + d * 86_400_000))!.publicSlug
    );
    expect(new Set(seen).size).toBe(3);
    const day4 = pickTodaysQuiz(quizzes, new Date(start.getTime() + 3 * 86_400_000))!;
    expect(day4.publicSlug).toBe(seen[0]);
  });

  it("is the same quiz all day long", () => {
    const morning = pickTodaysQuiz(quizzes, new Date("2026-10-17T00:01:00+05:30"));
    const night = pickTodaysQuiz(quizzes, new Date("2026-10-17T23:59:00+05:30"));
    expect(morning).toEqual(night);
  });
});

describe("parseDailyQuizSource", () => {
  it("accepts each place the link is posted", () => {
    for (const s of ["story", "dm", "bio", "highlight", "telegram"]) {
      expect(parseDailyQuizSource(s)).toBe(s);
    }
  });

  it("falls back to bio, where the bare link lives", () => {
    expect(parseDailyQuizSource(null)).toBe("bio");
    expect(parseDailyQuizSource("")).toBe("bio");
    expect(parseDailyQuizSource("<script>")).toBe("bio");
  });

  it("ignores case and spaces", () => {
    expect(parseDailyQuizSource(" DM ")).toBe("dm");
  });
});

describe("dailyQuizPath / dailyQuizUrl", () => {
  it("tags an Instagram click with instagram + where on Instagram", () => {
    const u = new URL(dailyQuizUrl("nda-maths-vectors-formula-1", "story"));
    expect(u.origin).toBe("https://www.pyqvault.com");
    expect(u.pathname).toBe("/quiz/nda-maths-vectors-formula-1");
    expect(u.searchParams.get("utm_source")).toBe("instagram");
    expect(u.searchParams.get("utm_medium")).toBe("story");
    expect(u.searchParams.get("utm_campaign")).toBe(DAILY_QUIZ_CAMPAIGN);
  });

  it("tags a Telegram click as telegram", () => {
    const u = new URL(dailyQuizUrl("s", "telegram"));
    expect(u.searchParams.get("utm_source")).toBe("telegram");
    expect(u.searchParams.get("utm_medium")).toBe("channel");
  });

  it("escapes the slug", () => {
    expect(dailyQuizPath("a b/c", "dm").startsWith("/quiz/a%20b%2Fc?")).toBe(true);
  });
});

describe("dailyQuizLinks", () => {
  it("has one tagged link per place the quiz is posted", () => {
    const links = dailyQuizLinks("s-1");
    expect(Object.keys(links).sort()).toEqual([...DAILY_QUIZ_SOURCES].sort());
    for (const src of DAILY_QUIZ_SOURCES) expect(links[src]).toBe(dailyQuizUrl("s-1", src));
  });
});

describe("parseIstDate", () => {
  it("reads YYYY-MM-DD as midday IST that day", () => {
    const d = parseIstDate("2026-10-19")!;
    expect(istDay(d)).toBe(istDay(new Date("2026-10-19T12:00:00+05:30")));
  });

  it("refuses anything that isn't a real calendar date", () => {
    for (const bad of ["2026-13-01", "2026-02-30", "19-10-2026", "2026-10-19T00:00", "tomorrow", ""]) {
      expect(parseIstDate(bad)).toBeNull();
    }
  });
});
