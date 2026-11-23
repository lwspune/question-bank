/**
 * The class offer on /me (owner, 2026-11-22; migration 0282; widened
 * 2026-11-23, migration 0285): a student is asked ONCE about offline classes
 * in Pune for their main exam, with Yes · No · Know more. Class 10 students
 * are asked about the SPI crash course; NDA, MHT-CET, JEE, CDS, AFCAT, 12th
 * Board and SSC CGL students about that course.
 *
 * Pure rules: which exam maps to which course, who sees which card (at most
 * one, ever), and what the card may send.
 */
import { describe, it, expect } from "vitest";
import {
  CLASS_10_EXAMS,
  CLASS_OFFERS,
  offerForExam,
  pickClassOffer,
  validateClassOfferAction,
} from "@/lib/classes/meOffer";
import { CLASS_COURSES } from "@/lib/classes/interest";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const none = new Set<never>();

describe("offerForExam", () => {
  it("maps a Class 10 exam to the SPI crash course", () => {
    for (const s of ["spi", "cbse-10", "mh-ssc-10", "icse-10", "up-board-10"]) expect(offerForExam(s)).toBe("spi");
  });

  it("maps each exam to its own course", () => {
    expect(offerForExam("nda")).toBe("nda");
    expect(offerForExam("mht-cet")).toBe("mht-cet");
    expect(offerForExam("jee-mains")).toBe("jee");
    expect(offerForExam("cds")).toBe("cds");
    expect(offerForExam("afcat")).toBe("afcat");
    expect(offerForExam("ssc-cgl")).toBe("ssc-cgl");
    expect(offerForExam("ssc-cgl-tier-2")).toBe("ssc-cgl");
  });

  it("maps every Class 12 board to the 12th Board course", () => {
    for (const s of ["cbse-12", "mh-hsc-12", "isc-12", "up-board-12"]) expect(offerForExam(s)).toBe("board-12");
  });

  it("has no course for other exams", () => {
    for (const s of ["upsc-cse", "neet", "clat", "mh-sb-11", "imat", "nope"]) expect(offerForExam(s)).toBeNull();
  });

  it("names only real exams, and each offer is a real /classes course", () => {
    const slugs = new Set<string>(EXAM_REGISTRY.map((e) => e.slug));
    for (const s of CLASS_10_EXAMS) expect(slugs.has(s)).toBe(true);
    const courses = new Set<string>(CLASS_COURSES.map((c) => c.slug));
    for (const o of CLASS_OFFERS) {
      expect(courses.has(o.offer)).toBe(true);
      for (const e of o.exams) expect(slugs.has(e), e).toBe(true);
      if (o.knowMoreExam) expect(slugs.has(o.knowMoreExam)).toBe(true);
    }
  });

  it("maps each exam to one course only", () => {
    const all = CLASS_OFFERS.flatMap((o) => o.exams);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("pickClassOffer", () => {
  const base = { mainExam: "cbse-10", targets: ["cbse-10"], role: null, answered: none, hasLead: false };

  it("asks about the main exam's course", () => {
    expect(pickClassOffer(base)).toEqual({ offer: "spi", examSlug: "cbse-10" });
    expect(pickClassOffer({ ...base, mainExam: "jee-mains", targets: ["jee-mains"] })).toEqual({
      offer: "jee",
      examSlug: "jee-mains",
    });
  });

  it("asks about the main exam even when another exam comes first in the list", () => {
    expect(pickClassOffer({ ...base, mainExam: "nda", targets: ["cbse-10", "nda"] })).toEqual({
      offer: "nda",
      examSlug: "nda",
    });
  });

  it("falls back to the first other exam that has a course", () => {
    expect(pickClassOffer({ ...base, mainExam: "upsc-cse", targets: ["upsc-cse", "neet", "cds"] })).toEqual({
      offer: "cds",
      examSlug: "cds",
    });
  });

  it("never asks again once any offer was answered, Yes or No", () => {
    expect(pickClassOffer({ ...base, answered: new Set(["spi"] as const) })).toBeNull();
    expect(pickClassOffer({ ...base, mainExam: "nda", targets: ["cbse-10", "nda"], answered: new Set(["spi"] as const) })).toBeNull();
  });

  it("never asks a student who already left a number on /classes", () => {
    expect(pickClassOffer({ ...base, hasLead: true })).toBeNull();
  });

  it("is never shown to a teacher", () => {
    expect(pickClassOffer({ ...base, role: "teacher" })).toBeNull();
  });

  it("shows nothing to a student with no matching exam", () => {
    expect(pickClassOffer({ ...base, mainExam: "neet", targets: ["neet", "upsc-cse"] })).toBeNull();
    expect(pickClassOffer({ ...base, mainExam: null, targets: [] })).toBeNull();
  });
});

describe("validateClassOfferAction", () => {
  it("accepts seen, more and no for a known offer", () => {
    for (const offer of ["nda", "jee", "board-12"] as const) {
      for (const action of ["seen", "more", "no"] as const) {
        expect(validateClassOfferAction({ offer, action })).toEqual({ ok: true, value: { offer, action } });
      }
    }
  });

  it("refuses an unknown offer or action", () => {
    expect(validateClassOfferAction({ offer: "board-10", action: "no" }).ok).toBe(false);
    expect(validateClassOfferAction({ offer: "neet", action: "no" }).ok).toBe(false);
    expect(validateClassOfferAction({ offer: "nda", action: "maybe" }).ok).toBe(false);
    expect(validateClassOfferAction(null).ok).toBe(false);
  });

  it("checks a Yes with the /classes rules, for that one course", () => {
    const v = validateClassOfferAction({
      offer: "mht-cet",
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
        offer: "mht-cet",
        action: "yes",
        lead: { courses: ["mht-cet"], city: "Pune", isPune: true, mobile: "919876543210", name: null },
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
