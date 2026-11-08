import { describe, it, expect } from "vitest";
import {
  homeworkLine,
  planSlugOf,
  pickContinue,
  practiceContinue,
  type ChapterInfo,
  type ContinueItem,
} from "@/lib/me/continue";

/**
 * /me's Continue card (2026-11-06) replaced "Keep reading", which listed notes
 * topics only: most students work in the bank (25k answers in 30 days) and on
 * /board (6k), and /me pointed back at neither. One list, newest first, one
 * entry per place.
 */
const item = (key: string, at: string, kind: ContinueItem["kind"] = "notes"): ContinueItem => ({
  key,
  kind,
  title: key,
  subtitle: "",
  href: `/${key}`,
  at,
});

describe("pickContinue", () => {
  it("newest first, three at most", () => {
    const out = pickContinue([
      item("a", "2026-11-01T00:00:00Z"),
      item("b", "2026-11-04T00:00:00Z"),
      item("c", "2026-11-02T00:00:00Z"),
      item("d", "2026-11-03T00:00:00Z"),
    ]);
    expect(out.map((i) => i.key)).toEqual(["b", "d", "c"]);
  });

  it("one entry per place, the newest visit kept", () => {
    const out = pickContinue([item("a", "2026-11-01T00:00:00Z"), item("a", "2026-11-05T00:00:00Z")]);
    expect(out).toHaveLength(1);
    expect(out[0].at).toBe("2026-11-05T00:00:00Z");
  });

  it("is empty when there is nothing", () => {
    expect(pickContinue([])).toEqual([]);
  });
});

const nda: ChapterInfo = {
  chapterId: "ch-prob",
  chapterName: "Probability",
  subjectId: "sub-m",
  subjectName: "Mathematics",
  examId: "ex-nda",
  examName: "NDA",
  examSlug: "nda",
  landingHref: "/questions/nda/mathematics/probability",
};
const hsc: ChapterInfo = {
  chapterId: "ch-mat",
  chapterName: "Matrices",
  subjectId: "sub-hm",
  subjectName: "Mathematics",
  examId: "ex-hsc",
  examName: "Maharashtra HSC Class 12",
  examSlug: "mh-hsc-12",
  landingHref: null,
};
const chapters = new Map<string, ChapterInfo>([
  ["q1", nda],
  ["q2", nda],
  ["q3", hsc],
]);
const boardExams = new Set(["mh-hsc-12"]);

describe("practiceContinue", () => {
  it("a bank chapter links to its questions page", () => {
    const [i] = practiceContinue([{ questionId: "q1", at: "2026-11-05T00:00:00Z", surface: "bank" }], chapters, boardExams);
    expect(i).toEqual({
      key: "bank:ch-prob",
      kind: "bank",
      title: "Probability",
      subtitle: "Mathematics · NDA",
      href: "/questions/nda/mathematics/probability",
      at: "2026-11-05T00:00:00Z",
      // The chapter's exam, for the exam focus on Home (2026-11-08).
      examSlug: "nda",
    });
  });

  it("a bank chapter with no questions page links to the bank filtered to it", () => {
    const [i] = practiceContinue([{ questionId: "q3", at: "2026-11-05T00:00:00Z", surface: "bank" }], chapters, boardExams);
    expect(i.href).toBe("/browse?examId=ex-hsc&subjectId=sub-hm&chapterIds=ch-mat");
  });

  it("a /board chapter links to the book reader", () => {
    const [i] = practiceContinue([{ questionId: "q3", at: "2026-11-05T00:00:00Z", surface: "board" }], chapters, boardExams);
    expect(i).toMatchObject({ key: "board:ch-mat", kind: "board", href: "/board/mh-hsc-12/mathematics/matrices" });
  });

  it("drops a /board answer whose exam has no /board reader: that link would 404", () => {
    expect(practiceContinue([{ questionId: "q1", at: "2026-11-05T00:00:00Z", surface: "board" }], chapters, boardExams)).toEqual([]);
  });

  it("one entry per chapter and kind, keeping the newest answer", () => {
    const out = practiceContinue(
      [
        { questionId: "q1", at: "2026-11-01T00:00:00Z", surface: "bank" },
        { questionId: "q2", at: "2026-11-03T00:00:00Z", surface: "bank" },
      ],
      chapters,
      boardExams
    );
    expect(out).toHaveLength(1);
    expect(out[0].at).toBe("2026-11-03T00:00:00Z");
  });

  it("ignores answers given elsewhere (drill, V, guides) and questions with no chapter", () => {
    const out = practiceContinue(
      [
        { questionId: "q1", at: "2026-11-05T00:00:00Z", surface: "drill" },
        { questionId: "q1", at: "2026-11-05T00:00:00Z", surface: "v" },
        { questionId: "q1", at: "2026-11-05T00:00:00Z", surface: null },
        { questionId: "zz", at: "2026-11-05T00:00:00Z", surface: "bank" },
      ],
      chapters,
      boardExams
    );
    expect(out).toEqual([]);
  });
});

describe("homeworkLine", () => {
  const plan = { slug: "cds-maths" };

  it("a plan in progress: the next day and how many are done, linking to that day", () => {
    expect(homeworkLine(plan, { started: true, nextDay: 4, doneDays: 3, totalDays: 30 })).toEqual({
      line: "Day 4 next · 3 of 30 days done",
      href: "/homework/cds-maths/day/4",
    });
  });

  it("a plan opened but not started: day 1", () => {
    expect(homeworkLine(plan, { started: false, nextDay: 1, doneDays: 0, totalDays: 30 })).toEqual({
      line: "30 days · start with day 1",
      href: "/homework/cds-maths/day/1",
    });
  });

  it("a finished plan: says so and links to the plan", () => {
    expect(homeworkLine(plan, { started: true, nextDay: null, doneDays: 30, totalDays: 30 })).toEqual({
      line: "All 30 days done",
      href: "/homework/cds-maths",
    });
  });
});

describe("planSlugOf", () => {
  it("reads the plan from a plan, day or Top 10 address", () => {
    expect(planSlugOf("/homework/cds-maths")).toBe("cds-maths");
    expect(planSlugOf("/homework/cds-maths/day/4")).toBe("cds-maths");
    expect(planSlugOf("/homework/cds-maths/top/probability")).toBe("cds-maths");
  });

  it("is null for the homework hub, an exam's list of plans, or anything else", () => {
    expect(planSlugOf("/homework")).toBeNull();
    expect(planSlugOf("/homework/exam/nda")).toBeNull();
    expect(planSlugOf("/notes/nda-maths")).toBeNull();
    expect(planSlugOf(null)).toBeNull();
  });
});
