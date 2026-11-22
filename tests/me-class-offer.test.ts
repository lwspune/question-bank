/**
 * The class offer on /me (owner, 2026-11-22; migration 0282): Class 10
 * students are asked about the SPI crash course in Pune, NDA students about
 * offline NDA classes in Pune, with Yes · No · Know more.
 *
 * Pure rules: who sees which card (at most one), and what the card may send.
 */
import { describe, it, expect } from "vitest";
import {
  CLASS_10_EXAMS,
  CLASS_OFFERS,
  offersFor,
  pickClassOffer,
  validateClassOfferAction,
} from "@/lib/classes/meOffer";
import { CLASS_COURSES } from "@/lib/classes/interest";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const none = new Set<never>();

describe("offersFor", () => {
  it("offers SPI to a Class 10 exam, and NDA to NDA", () => {
    expect(offersFor(["cbse-10"])).toEqual(["spi"]);
    expect(offersFor(["mh-ssc-10"])).toEqual(["spi"]);
    expect(offersFor(["icse-10"])).toEqual(["spi"]);
    expect(offersFor(["up-board-10"])).toEqual(["spi"]);
    expect(offersFor(["spi"])).toEqual(["spi"]);
    expect(offersFor(["nda"])).toEqual(["nda"]);
  });

  it("offers nothing to other exams (Class 12, CDS, JEE ...)", () => {
    expect(offersFor(["cbse-12", "cds", "jee-mains", "mht-cet"])).toEqual([]);
    expect(offersFor([])).toEqual([]);
  });

  it("puts SPI first when a Class 10 student also targets NDA", () => {
    expect(offersFor(["nda", "cbse-10"])).toEqual(["spi", "nda"]);
  });

  it("names only real exams, and each offer is a real /classes course", () => {
    const slugs = new Set(EXAM_REGISTRY.map((e) => e.slug));
    for (const s of CLASS_10_EXAMS) expect(slugs.has(s)).toBe(true);
    const courses = new Set<string>(CLASS_COURSES.map((c) => c.slug));
    for (const o of CLASS_OFFERS) {
      expect(courses.has(o.offer)).toBe(true);
      expect(slugs.has(o.examSlug)).toBe(true);
    }
  });
});

describe("pickClassOffer", () => {
  const base = { targets: ["cbse-10"], role: null, answered: none, leadCourses: [] as string[] };

  it("shows the offer that fits", () => {
    expect(pickClassOffer(base)).toBe("spi");
    expect(pickClassOffer({ ...base, targets: ["nda"] })).toBe("nda");
  });

  it("never asks again once answered (Yes or No)", () => {
    expect(pickClassOffer({ ...base, answered: new Set(["spi"] as const) })).toBeNull();
  });

  it("moves to the next offer once the first is answered", () => {
    expect(pickClassOffer({ ...base, targets: ["cbse-10", "nda"], answered: new Set(["spi"] as const) })).toBe("nda");
  });

  it("skips a course the student already asked about on /classes", () => {
    expect(pickClassOffer({ ...base, leadCourses: ["spi", "cds"] })).toBeNull();
  });

  it("is never shown to a teacher", () => {
    expect(pickClassOffer({ ...base, role: "teacher" })).toBeNull();
  });

  it("shows nothing to a student with no matching exam", () => {
    expect(pickClassOffer({ ...base, targets: ["jee-mains"] })).toBeNull();
  });
});

describe("validateClassOfferAction", () => {
  it("accepts seen, more and no for a known offer", () => {
    for (const action of ["seen", "more", "no"] as const) {
      expect(validateClassOfferAction({ offer: "nda", action })).toEqual({ ok: true, value: { offer: "nda", action } });
    }
  });

  it("refuses an unknown offer or action", () => {
    expect(validateClassOfferAction({ offer: "jee", action: "no" }).ok).toBe(false);
    expect(validateClassOfferAction({ offer: "nda", action: "maybe" }).ok).toBe(false);
    expect(validateClassOfferAction(null).ok).toBe(false);
  });

  it("checks a Yes with the /classes rules, for that one course", () => {
    const v = validateClassOfferAction({
      offer: "spi",
      action: "yes",
      city: "pune",
      mobile: "98765 43210",
      consent: true,
      // A card cannot widen the lead to other courses.
      courses: ["nda", "jee"],
    });
    expect(v).toEqual({
      ok: true,
      value: {
        offer: "spi",
        action: "yes",
        lead: { courses: ["spi"], city: "Pune", isPune: true, mobile: "919876543210", name: null },
      },
    });
  });

  it("names the field to fix on a bad Yes", () => {
    expect(validateClassOfferAction({ offer: "nda", action: "yes", city: "pune", mobile: "123", consent: true })).toMatchObject({
      ok: false,
      field: "mobile",
    });
    expect(
      validateClassOfferAction({ offer: "nda", action: "yes", city: "other", otherCity: "Nashik", mobile: "9876543210" })
    ).toMatchObject({ ok: false, field: "consent" });
  });
});
