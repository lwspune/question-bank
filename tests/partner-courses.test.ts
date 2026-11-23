/**
 * Partner courses on the store (owner, 2026-11-17): a trial that links two
 * online courses of our offline partner Defence Mania from /store, to see
 * whether students tap them. Nothing is agreed with the partner yet, so the
 * only signals are our own tap count and the UTM tags on the link.
 * Pure core: src/lib/partnerCourses/courses.ts.
 */
import { describe, it, expect } from "vitest";
import {
  PARTNER_COURSES,
  PARTNER_NAME,
  coursesOnSale,
  courseById,
  courseStatusLine,
  outboundUrl,
  COURSE_EXAMS,
  courseShelves,
} from "@/lib/partnerCourses/courses";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const day = (iso: string) => new Date(`${iso}T06:30:00Z`); // noon in India

describe("the course list", () => {
  it("has unique, URL-safe ids", () => {
    const ids = PARTNER_COURSES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]{1,60}$/);
  });

  it("names a live exam for every course, and only the exams it shelves", () => {
    const slugs = new Set(EXAM_REGISTRY.map((e) => e.slug));
    for (const c of PARTNER_COURSES) {
      expect(slugs.has(c.examSlug)).toBe(true);
      expect(COURSE_EXAMS.map((e) => e.slug)).toContain(c.examSlug);
    }
  });

  it("links only to the partner's own https site", () => {
    for (const c of PARTNER_COURSES) {
      const u = new URL(c.url);
      expect(u.protocol).toBe("https:");
      expect(u.hostname).toBe("defencemania.classx.co.in");
    }
  });

  it("has a price in paise and dates in order", () => {
    for (const c of PARTNER_COURSES) {
      expect(Number.isInteger(c.pricePaise)).toBe(true);
      expect(c.pricePaise).toBeGreaterThan(0);
      expect(c.startsOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (c.endsOn) expect(c.endsOn > c.startsOn).toBe(true);
    }
  });

  it("names the partner and carries no em dash in what students read", () => {
    expect(PARTNER_NAME).toBe("Defence Mania");
    for (const c of PARTNER_COURSES) {
      for (const text of [c.title, c.blurb]) expect(text).not.toMatch(/—| – | -- /);
    }
  });
});

describe("coursesOnSale", () => {
  const list = [
    { ...PARTNER_COURSES[0], id: "a", endsOn: "2027-04-11" },
    { ...PARTNER_COURSES[0], id: "b", endsOn: null },
    { ...PARTNER_COURSES[0], id: "c", endsOn: "2026-11-30" },
  ];

  it("keeps a course up to and including its last day, in India's calendar", () => {
    expect(coursesOnSale(list, day("2026-11-30")).map((c) => c.id)).toEqual(["a", "b", "c"]);
    expect(coursesOnSale(list, day("2026-12-01")).map((c) => c.id)).toEqual(["a", "b"]);
  });

  it("uses the India date, not UTC: 00:30 IST on 1 Dec is past the 30 Nov end", () => {
    expect(coursesOnSale(list, new Date("2026-11-30T19:00:00Z")).map((c) => c.id)).toEqual(["a", "b"]);
  });

  it("keeps a course with no end date", () => {
    expect(coursesOnSale(list, day("2030-01-01")).map((c) => c.id)).toEqual(["b"]);
  });
});

describe("courseStatusLine", () => {
  const c = { ...PARTNER_COURSES[0], startsOn: "2026-12-05" };

  it("says when a batch starts, before it starts", () => {
    expect(courseStatusLine(c, day("2026-11-17"))).toBe("Starts 5 Dec");
  });

  it("says the batch is running once it has started (classes are recorded)", () => {
    expect(courseStatusLine(c, day("2026-12-05"))).toBe("Batch running, classes recorded");
    expect(courseStatusLine(c, day("2027-01-10"))).toBe("Batch running, classes recorded");
  });
});

describe("outboundUrl", () => {
  it("adds our UTM tags so the partner can see visitors we sent", () => {
    const course = PARTNER_COURSES[0];
    const u = new URL(outboundUrl(course));
    expect(u.origin + u.pathname).toBe(new URL(course.url).origin + new URL(course.url).pathname);
    expect(u.searchParams.get("utm_source")).toBe("pyqvault");
    expect(u.searchParams.get("utm_medium")).toBe("store");
    expect(u.searchParams.get("utm_campaign")).toBe(course.id);
  });

  it("keeps a query string the partner's link already carries", () => {
    const u = new URL(outboundUrl({ ...PARTNER_COURSES[0], url: "https://defencemania.classx.co.in/x?ref=1" }));
    expect(u.searchParams.get("ref")).toBe("1");
    expect(u.searchParams.get("utm_source")).toBe("pyqvault");
  });
});

describe("courseShelves", () => {
  it("makes one shelf per exam with a course on sale, in shelf order", () => {
    const shelves = courseShelves(PARTNER_COURSES, day("2026-11-17"));
    expect(shelves.map((s) => s.slug)).toEqual(["cds", "afcat"]);
    for (const s of shelves) {
      expect(s.key).toBe(`courses-${s.slug}`);
      expect(s.courses.every((c) => c.examSlug === s.slug)).toBe(true);
    }
  });

  it("drops a shelf whose courses have all ended", () => {
    const shelves = courseShelves(PARTNER_COURSES, day("2027-04-12"));
    expect(shelves.map((s) => s.slug)).toEqual(["afcat"]);
  });
});

describe("courseById", () => {
  it("finds a course and refuses an unknown or malformed id", () => {
    const first = PARTNER_COURSES[0];
    expect(courseById(first.id)?.id).toBe(first.id);
    expect(courseById("no-such-course")).toBeNull();
    expect(courseById("../etc")).toBeNull();
    expect(courseById("")).toBeNull();
  });
});
