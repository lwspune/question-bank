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
  PROVIDERS,
  coursesOnSale,
  courseById,
  courseStatusLine,
  outboundUrl,
  COURSE_EXAMS,
  courseShelves,
  providerLine,
  joinNames,
} from "@/lib/partnerCourses/courses";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const day = (iso: string) => new Date(`${iso}T06:30:00Z`); // noon in India

describe("the course list", () => {
  it("has unique, URL-safe ids", () => {
    const ids = PARTNER_COURSES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]{1,60}$/);
  });

  it("names a live exam for every course and every shelf, and only the exams it shelves", () => {
    const slugs = new Set(EXAM_REGISTRY.map((e) => e.slug));
    for (const c of PARTNER_COURSES) {
      expect(slugs.has(c.examSlug)).toBe(true);
      expect(COURSE_EXAMS.map((e) => e.slug)).toContain(c.examSlug);
    }
    for (const e of COURSE_EXAMS) for (const s of e.alsoFor) expect(slugs.has(s)).toBe(true);
  });

  it("never shelves a course on an exam students cannot choose (it would reach nobody first)", () => {
    const hidden = new Set(EXAM_REGISTRY.filter((e) => e.noPublicContent).map((e) => e.slug));
    for (const e of COURSE_EXAMS) {
      expect(hidden.has(e.slug)).toBe(false);
      for (const s of e.alsoFor) expect(hidden.has(s)).toBe(false);
    }
  });

  it("links only to its provider's own https site", () => {
    for (const c of PARTNER_COURSES) {
      const u = new URL(c.url);
      expect(u.protocol).toBe("https:");
      expect(u.hostname).toBe(PROVIDERS[c.provider].host);
    }
  });

  it("has a price in paise and dates in order", () => {
    for (const c of PARTNER_COURSES) {
      expect(Number.isInteger(c.pricePaise)).toBe(true);
      expect(c.pricePaise).toBeGreaterThan(0);
      if (c.startsOn) expect(c.startsOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (c.endsOn && c.startsOn) expect(c.endsOn > c.startsOn).toBe(true);
    }
  });

  it("carries no em dash in what students read", () => {
    for (const c of PARTNER_COURSES) {
      for (const text of [c.title, c.blurb, providerLine(c.provider)]) expect(text).not.toMatch(/—| – | -- /);
    }
  });
});

describe("providerLine", () => {
  it("says plainly who runs the course and that it opens their site", () => {
    expect(providerLine("Defence Mania")).toBe("From our partner Defence Mania. Opens their site.");
    expect(providerLine("LWS Pune")).toBe("From LWS Pune. Opens their site.");
  });
});

describe("the SPI course", () => {
  it("is LWS Pune's, with no start date the page does not give", () => {
    const spi = PARTNER_COURSES.find((c) => c.examSlug === "spi");
    expect(spi?.provider).toBe("LWS Pune");
    expect(spi?.startsOn).toBeNull();
    expect(courseStatusLine(spi!, day("2026-11-23"))).toBeNull();
  });

  it("sits first for SPI, Maharashtra SSC Class 10 and CBSE Class 10 students", () => {
    const shelf = courseShelves(PARTNER_COURSES, day("2026-11-23")).find((s) => s.slug === "spi");
    expect(shelf?.feedSlugs).toEqual(["spi", "mh-ssc-10", "cbse-10"]);
  });
});

describe("joinNames", () => {
  it("lists names the way a sentence does", () => {
    expect(joinNames(["CDS"])).toBe("CDS");
    expect(joinNames(["CDS", "AFCAT"])).toBe("CDS and AFCAT");
    expect(joinNames(["CDS", "AFCAT", "SPI"])).toBe("CDS, AFCAT and SPI");
    expect(joinNames([])).toBe("");
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

  it("says nothing when the course gives no start date", () => {
    expect(courseStatusLine({ startsOn: null }, day("2026-11-23"))).toBeNull();
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
    const shelves = courseShelves(PARTNER_COURSES, day("2026-11-23"));
    expect(shelves.map((s) => s.slug)).toEqual(["cds", "afcat", "spi"]);
    for (const s of shelves) {
      expect(s.key).toBe(`courses-${s.slug}`);
      expect(s.courses.every((c) => c.examSlug === s.slug)).toBe(true);
      expect(s.feedSlugs[0]).toBe(s.slug);
    }
  });

  it("drops a shelf whose courses have all ended", () => {
    const shelves = courseShelves(PARTNER_COURSES, day("2027-04-12"));
    expect(shelves.map((s) => s.slug)).toEqual(["afcat", "spi"]);
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
