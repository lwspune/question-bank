/**
 * /school-exams: the exams a school child can sit, by the class they are in now
 * (owner, 2026-11-27). The catalogue is hand-checked data; these tests pin the
 * rules a parent relies on: an exam shows only for the classes that sit it,
 * every fact links to the conducting body's own site, and an exam we carry
 * links to our papers only when it has public content.
 */
import { describe, expect, it } from "vitest";
import { getExamBySlug, isExamSlug } from "@/lib/exam/examContext";
import { SCHOOL_EXAMS } from "@/lib/schoolExams/catalog";
import {
  SCHOOL_CLASSES,
  classHref,
  examsForClass,
  KIND_NOTES,
  groupByKind,
  nextTestLine,
  ourExamLink,
  parseClassSlug,
  shortNames,
} from "@/lib/schoolExams/select";

const ids = (n: number) => examsForClass(n).map((e) => e.id);

describe("class slugs", () => {
  it("offers Class 1 to Class 10, in order", () => {
    expect(SCHOOL_CLASSES).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("round-trips every class through its URL", () => {
    for (const n of SCHOOL_CLASSES) {
      expect(classHref(n)).toBe(`/school-exams/class-${n}`);
      expect(parseClassSlug(`class-${n}`)).toBe(n);
    }
  });

  it.each(["class-0", "class-11", "class-05", "class-", "5", "class-five", "Class-5"])(
    "refuses %s",
    (slug) => {
      expect(parseClassSlug(slug)).toBeNull();
    }
  );
});

describe("examsForClass: the class the child is in NOW", () => {
  it("shows Class 6 admission tests to a Class 5 child, not to a Class 6 child", () => {
    expect(ids(5)).toEqual(expect.arrayContaining(["aissee-6", "jnvst-6", "rms-cet-6"]));
    expect(ids(6)).not.toContain("aissee-6");
    expect(ids(6)).not.toContain("jnvst-6");
  });

  it("shows Class 9 admission tests and NMMS to a Class 8 child", () => {
    expect(ids(8)).toEqual(expect.arrayContaining(["aissee-9", "rms-cet-9", "jnvst-9", "nmms"]));
    expect(ids(9)).not.toContain("aissee-9");
  });

  it("shows Navodaya's Class 9 lateral entry in Class 8 only", () => {
    for (const n of SCHOOL_CLASSES) expect(ids(n).includes("jnvst-9")).toBe(n === 8);
  });

  it("shows the Maharashtra scholarship in Class 4 and Class 7 only", () => {
    for (const n of SCHOOL_CLASSES) {
      expect(ids(n).includes("mh-scholarship-4")).toBe(n === 4);
      expect(ids(n).includes("mh-scholarship-7")).toBe(n === 7);
    }
  });

  it("shows SPI only in Class 10", () => {
    for (const n of SCHOOL_CLASSES) expect(ids(n).includes("spi")).toBe(n === 10);
  });

  it("has nothing for Classes 1 to 3, which the page then says plainly", () => {
    for (const n of [1, 2, 3]) expect(examsForClass(n)).toEqual([]);
  });

  it("returns nothing for a class outside 1-10", () => {
    expect(examsForClass(0)).toEqual([]);
    expect(examsForClass(11)).toEqual([]);
  });
});

describe("groupByKind", () => {
  it("orders admission, then scholarship, then competition, and drops empty groups", () => {
    const groups = groupByKind(examsForClass(8));
    expect(groups.map((g) => g.kind)).toEqual(["admission", "scholarship", "competition", "other"]);
    const class4 = groupByKind(examsForClass(4));
    expect(class4.map((g) => g.kind)).toEqual(["scholarship"]);
  });

  it("puts all-India exams before Maharashtra-only ones within a group", () => {
    for (const n of SCHOOL_CLASSES) {
      for (const g of groupByKind(examsForClass(n))) {
        const regions = g.exams.map((e) => e.region);
        expect(regions).toEqual([...regions].sort((a, b) => (a === b ? 0 : a === "india" ? -1 : 1)));
      }
    }
  });
});

describe("ourExamLink", () => {
  it("links an exam we carry to its exam page", () => {
    const aissee = SCHOOL_EXAMS.find((e) => e.id === "aissee-6")!;
    expect(ourExamLink(aissee)).toBe("/exams/aissee-6");
  });

  it("never links an exam we do not carry, or one with no public questions yet", () => {
    const nmms = SCHOOL_EXAMS.find((e) => e.id === "nmms")!;
    expect(ourExamLink(nmms)).toBeNull();
    const hb6 = SCHOOL_EXAMS.find((e) => e.id === "homi-bhabha-6")!;
    expect(getExamBySlug("homi-bhabha-6")?.noPublicContent).toBe(true);
    expect(ourExamLink(hb6)).toBeNull();
  });
});

describe("shortNames", () => {
  it("names each exam once, without its bracket or class suffix", () => {
    expect(shortNames(examsForClass(8))).toEqual(
      expect.arrayContaining(["AISSEE", "RMS CET", "NMMS", "IOQM", "NSEJS"])
    );
    expect(shortNames(examsForClass(8)).filter((s) => s === "AISSEE")).toHaveLength(1);
  });
});

describe("nextTestLine: the exam calendar's next date on a card", () => {
  const spi = SCHOOL_EXAMS.find((e) => e.id === "spi")!;
  const aissee = SCHOOL_EXAMS.find((e) => e.id === "aissee-6")!;

  it("names the calendar's date in words", () => {
    expect(nextTestLine(aissee, { date: "2027-01-17" })).toBe("Next test: 17 January 2027");
  });

  it("stays quiet when there is no upcoming sitting", () => {
    expect(nextTestLine(aissee, null)).toBeNull();
  });

  it("stays quiet when the card already gives that date, so it is never said twice", () => {
    expect(spi.when).toContain("4 April 2027");
    expect(nextTestLine(spi, { date: "2027-04-04" })).toBeNull();
  });
});

describe("the catalogue", () => {
  const TEXT_FIELDS = ["name", "body", "forWhat", "whoCanSit", "when"] as const;

  it("has unique ids", () => {
    const all = SCHOOL_EXAMS.map((e) => e.id);
    expect(new Set(all).size).toBe(all.length);
  });

  it.each(SCHOOL_EXAMS.map((e) => [e.id, e] as const))("%s is well formed", (_id, e) => {
    expect(e.sitInClasses.length).toBeGreaterThan(0);
    for (const n of e.sitInClasses) expect(SCHOOL_CLASSES).toContain(n);
    expect([...e.sitInClasses]).toEqual([...new Set(e.sitInClasses)].sort((a, b) => a - b));
    expect(e.officialUrl).toMatch(/^https:\/\//);
    expect(e.sourceUrl).toMatch(/^https:\/\//);
    expect(e.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    if (e.registrySlug !== undefined) expect(isExamSlug(e.registrySlug)).toBe(true);
    for (const f of TEXT_FIELDS) {
      expect(e[f].trim().length, `${e.id}.${f}`).toBeGreaterThan(0);
      // Owner rule (2026-10-05): no em dashes, and no spaced dash that keeps their rhythm.
      expect(e[f], `${e.id}.${f}`).not.toMatch(/—| – | -- /);
    }
  });
});

describe("other well-known exams (private institutes, owner 2026-11-28)", () => {
  it("lists MTS for Class 8, 9 and 10 only, in the last group", () => {
    for (const n of SCHOOL_CLASSES) {
      expect(ids(n).includes("mts")).toBe([8, 9, 10].includes(n));
    }
    const groups = groupByKind(examsForClass(9));
    expect(groups.at(-1)?.kind).toBe("other");
    expect(groups.at(-1)?.exams.map((e) => e.id)).toContain("mts");
  });

  it("says plainly that the group is not run by the government", () => {
    expect(KIND_NOTES.other).toMatch(/private/i);
    expect(KIND_NOTES.other).toMatch(/not the government/i);
  });

  it("keeps the government groups free of private exams", () => {
    for (const e of SCHOOL_EXAMS.filter((x) => x.kind !== "other")) {
      expect(e.id).not.toBe("mts");
    }
  });
});
