import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import {
  topicNav,
  chapterStart,
  mockCta,
  extraRelated,
  shouldShowTestBar,
  TEST_BAR_SCROLL,
  TEST_BAR_GAP_MS,
} from "@/lib/notes/keepGoing";

const chapter = (route: string, slug: string) =>
  NOTES_CHAPTERS.find((c) => c.subjectRoute === route && c.chapterSlug === slug)!;

const DIFF = chapter("mht-cet-maths", "differentiation");
const order = DIFF.chapter.subtopicOrder;

describe("topicNav", () => {
  it("points the first topic at the second, with no previous", () => {
    const nav = topicNav(DIFF, order[0]);
    expect(nav.prev).toBeNull();
    expect(nav.next).toMatchObject({
      href: `/notes/mht-cet-maths/differentiation/${order[1]}`,
      kicker: "Next topic",
    });
    expect(nav.next!.label).toBe(DIFF.notes[order[1]].title);
  });

  it("links a middle topic both ways", () => {
    const nav = topicNav(DIFF, order[2]);
    expect(nav.prev!.href).toBe(`/notes/mht-cet-maths/differentiation/${order[1]}`);
    expect(nav.next!.href).toBe(`/notes/mht-cet-maths/differentiation/${order[3]}`);
  });

  it("sends the last topic of a chapter to the next chapter of the same subject", () => {
    const subject = NOTES_CHAPTERS.filter((c) => c.subjectRoute === "mht-cet-maths");
    const i = subject.indexOf(DIFF);
    const nav = topicNav(DIFF, order[order.length - 1]);
    expect(nav.next).toEqual({
      href: `/notes/mht-cet-maths/${subject[i + 1].chapterSlug}`,
      label: subject[i + 1].chapter.chapterName,
      kicker: "Next chapter",
    });
  });

  it("sends the last topic of a subject's last chapter back to the subject's notes", () => {
    const subject = NOTES_CHAPTERS.filter((c) => c.subjectRoute === "mht-cet-maths");
    const last = subject[subject.length - 1];
    const lastOrder = last.chapter.subtopicOrder;
    const nav = topicNav(last, lastOrder[lastOrder.length - 1]);
    expect(nav.next).toEqual({
      href: "/notes/mht-cet-maths",
      label: `All ${last.subjectDisplay} notes`,
      kicker: "Chapter done",
    });
  });

  it("gives every topic in every chapter a next link that is a real page", () => {
    const pages = new Set<string>(["/notes"]);
    for (const c of NOTES_CHAPTERS) {
      pages.add(`/notes/${c.subjectRoute}`);
      pages.add(`/notes/${c.subjectRoute}/${c.chapterSlug}`);
      for (const s of Object.keys(c.notes)) pages.add(`/notes/${c.subjectRoute}/${c.chapterSlug}/${s}`);
    }
    const broken: string[] = [];
    for (const c of NOTES_CHAPTERS)
      for (const s of c.chapter.subtopicOrder.filter((x) => c.notes[x])) {
        const { next, prev } = topicNav(c, s);
        for (const l of [next, prev]) if (l && !pages.has(l.href)) broken.push(`${c.chapterSlug}/${s} -> ${l.href}`);
        if (!next) broken.push(`${c.chapterSlug}/${s} has no next`);
      }
    expect(broken).toEqual([]);
  });
});

describe("chapterStart", () => {
  it("is the chapter's first topic in teaching order", () => {
    expect(chapterStart(DIFF)).toEqual({
      href: `/notes/mht-cet-maths/differentiation/${order[0]}`,
      label: DIFF.notes[order[0]].title,
      kicker: "Start with topic 1",
    });
  });
});

describe("mockCta", () => {
  it("offers the exam's mocks when the exam has them", () => {
    expect(mockCta("MHT-CET")).toEqual({ href: "/mock/exam/mht-cet", examDisplay: "MHT-CET" });
  });

  it("offers nothing for an exam without mocks, or one the registry does not know", () => {
    expect(mockCta("Foundation Course")).toBeNull();
    expect(mockCta("Not An Exam")).toBeNull();
  });
});

describe("extraRelated", () => {
  const next = { href: "/notes/a/b/next", label: "N", kicker: "Next topic" };
  const prev = { href: "/notes/a/b/prev", label: "P", kicker: "Previous topic" };

  it("drops related links that repeat next or previous, even with an anchor", () => {
    const related = [
      { href: "/notes/a/b/next#concept", label: "x" },
      { href: "/notes/a/b/prev", label: "y" },
      { href: "/notes/other/chapter/topic", label: "z" },
    ];
    expect(extraRelated(related, { next, prev })).toEqual([{ href: "/notes/other/chapter/topic", label: "z" }]);
  });

  it("handles no related links", () => {
    expect(extraRelated(undefined, { next, prev: null })).toEqual([]);
  });
});

describe("shouldShowTestBar", () => {
  const now = 1_000_000_000_000;

  it("waits until the reader is most of the way down", () => {
    expect(shouldShowTestBar({ scrollFraction: TEST_BAR_SCROLL - 0.01, lastShownAt: null, now })).toBe(false);
    expect(shouldShowTestBar({ scrollFraction: TEST_BAR_SCROLL, lastShownAt: null, now })).toBe(true);
  });

  it("shows at most once per gap on this device", () => {
    expect(shouldShowTestBar({ scrollFraction: 0.9, lastShownAt: now - TEST_BAR_GAP_MS + 1, now })).toBe(false);
    expect(shouldShowTestBar({ scrollFraction: 0.9, lastShownAt: now - TEST_BAR_GAP_MS, now })).toBe(true);
  });

  it("uses a 70% scroll line and a one-day gap", () => {
    expect(TEST_BAR_SCROLL).toBe(0.7);
    expect(TEST_BAR_GAP_MS).toBe(24 * 60 * 60 * 1000);
  });
});

describe("Related notes links", () => {
  it("never point at a notes page that does not exist", () => {
    const pages = new Set<string>();
    for (const c of NOTES_CHAPTERS) {
      pages.add(`/notes/${c.subjectRoute}`);
      pages.add(`/notes/${c.subjectRoute}/${c.chapterSlug}`);
      for (const s of Object.keys(c.notes)) pages.add(`/notes/${c.subjectRoute}/${c.chapterSlug}/${s}`);
    }
    const broken: string[] = [];
    for (const c of NOTES_CHAPTERS)
      for (const [slug, n] of Object.entries(c.notes))
        for (const r of n.related ?? []) {
          const path = r.href.split("#")[0];
          if (path.startsWith("/notes/") && !pages.has(path)) broken.push(`${c.chapterSlug}/${slug} -> ${r.href}`);
        }
    expect(broken).toEqual([]);
  });
});
