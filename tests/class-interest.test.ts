/**
 * The offline-classes interest form (owner, 2026-11-16; migration 0265). Pure
 * rules shared by /api/class-interest and the /classes form: which courses,
 * Pune or another city, a mobile the team can call, and consent to be called.
 * Plus the team's list: Pune first, newest first, and a CSV Excel cannot mangle.
 */
import { describe, it, expect } from "vitest";
import {
  CLASS_COURSES,
  validateClassInterest,
  sortClassLeads,
  summariseClassLeads,
  toClassLeadsCsv,
  type ClassLead,
} from "@/lib/classes/interest";

const ok = { courses: ["nda"], city: "pune", mobile: "98765 43210", consent: true };

describe("CLASS_COURSES", () => {
  it("offers the nine courses the owner named, the defence exams together (SPI added 2026-11-18)", () => {
    expect(CLASS_COURSES.map((c) => c.label)).toEqual([
      "NDA",
      "CDS",
      "AFCAT",
      "SPI",
      "MHT-CET",
      "JEE",
      "10th Board",
      "12th Board",
      "SSC CGL",
    ]);
  });
});

describe("validateClassInterest", () => {
  it("accepts Pune with one course and stores the mobile as 91XXXXXXXXXX", () => {
    const v = validateClassInterest(ok);
    expect(v).toEqual({
      ok: true,
      value: { courses: ["nda"], city: "Pune", isPune: true, mobile: "919876543210", name: null },
    });
  });

  it("keeps several courses, once each, in the catalogue's order", () => {
    const v = validateClassInterest({ ...ok, courses: ["board-12", "spi", "afcat", "mht-cet", "cds", "board-12"] });
    expect(v.ok && v.value.courses).toEqual(["cds", "afcat", "spi", "mht-cet", "board-12"]);
  });

  it("refuses no course, an unknown course, or a non-list", () => {
    expect(validateClassInterest({ ...ok, courses: [] })).toMatchObject({ ok: false, field: "courses" });
    expect(validateClassInterest({ ...ok, courses: ["neet"] })).toMatchObject({ ok: false, field: "courses" });
    expect(validateClassInterest({ ...ok, courses: "nda" })).toMatchObject({ ok: false, field: "courses" });
  });

  it("takes another city as typed, trimmed, with spaces collapsed", () => {
    const v = validateClassInterest({ ...ok, city: "other", otherCity: "  Navi   Mumbai " });
    expect(v.ok && v.value).toMatchObject({ city: "Navi Mumbai", isPune: false });
  });

  it("counts Pune typed under Other as Pune", () => {
    const v = validateClassInterest({ ...ok, city: "other", otherCity: " pune " });
    expect(v.ok && v.value).toMatchObject({ city: "Pune", isPune: true });
  });

  it("needs a city name under Other, and caps it at 80 characters", () => {
    expect(validateClassInterest({ ...ok, city: "other", otherCity: "  " })).toMatchObject({ ok: false, field: "city" });
    expect(validateClassInterest({ ...ok, city: "other" })).toMatchObject({ ok: false, field: "city" });
    expect(validateClassInterest({ ...ok, city: "other", otherCity: "x".repeat(81) })).toMatchObject({
      ok: false,
      field: "city",
    });
    expect(validateClassInterest({ ...ok, city: "mumbai" })).toMatchObject({ ok: false, field: "city" });
  });

  it("refuses a mobile that is not a 10-digit Indian number", () => {
    expect(validateClassInterest({ ...ok, mobile: "12345" })).toMatchObject({ ok: false, field: "mobile" });
    expect(validateClassInterest({ ...ok, mobile: "5876543210" })).toMatchObject({ ok: false, field: "mobile" });
    expect(validateClassInterest({ ...ok, mobile: undefined })).toMatchObject({ ok: false, field: "mobile" });
  });

  it("accepts +91 and 0 prefixes", () => {
    expect(validateClassInterest({ ...ok, mobile: "+91 98765-43210" })).toMatchObject({ ok: true });
    expect(validateClassInterest({ ...ok, mobile: "09876543210" })).toMatchObject({ ok: true });
  });

  it("needs consent to be called", () => {
    expect(validateClassInterest({ ...ok, consent: false })).toMatchObject({ ok: false, field: "consent" });
    expect(validateClassInterest({ ...ok, consent: "yes" })).toMatchObject({ ok: false, field: "consent" });
  });

  it("keeps an optional name, trimmed, and drops an empty one", () => {
    expect(validateClassInterest({ ...ok, name: "  Asha   Patil " })).toMatchObject({
      ok: true,
      value: { name: "Asha Patil" },
    });
    expect(validateClassInterest({ ...ok, name: "   " })).toMatchObject({ ok: true, value: { name: null } });
    expect(validateClassInterest({ ...ok, name: "x".repeat(81) })).toMatchObject({ ok: false, field: "name" });
  });

  it("refuses a body that is not an object", () => {
    expect(validateClassInterest(null)).toMatchObject({ ok: false });
    expect(validateClassInterest("nda")).toMatchObject({ ok: false });
  });
});

const lead = (over: Partial<ClassLead>): ClassLead => ({
  id: "x",
  name: null,
  email: null,
  courses: ["nda"],
  city: "Pune",
  isPune: true,
  mobile: "919876543210",
  fromSection: null,
  calledAt: null,
  createdAt: "2026-11-16T10:00:00Z",
  updatedAt: "2026-11-16T10:00:00Z",
  ...over,
});

describe("sortClassLeads", () => {
  it("puts Pune first, then the newest first within each group", () => {
    const rows = [
      lead({ id: "other-new", isPune: false, city: "Nagpur", createdAt: "2026-11-16T12:00:00Z" }),
      lead({ id: "pune-old", createdAt: "2026-11-14T10:00:00Z" }),
      lead({ id: "pune-new", createdAt: "2026-11-16T09:00:00Z" }),
      lead({ id: "other-old", isPune: false, city: "Delhi", createdAt: "2026-11-10T09:00:00Z" }),
    ];
    expect(sortClassLeads(rows).map((r) => r.id)).toEqual(["pune-new", "pune-old", "other-new", "other-old"]);
  });
});

describe("summariseClassLeads", () => {
  it("counts leads, Pune leads, ones not yet called, and each course", () => {
    const s = summariseClassLeads([
      lead({ courses: ["nda", "board-12"] }),
      lead({ courses: ["board-12"], calledAt: "2026-11-16T11:00:00Z" }),
      lead({ isPune: false, city: "Delhi", courses: ["ssc-cgl"] }),
    ]);
    expect(s).toMatchObject({ total: 3, pune: 2, notCalled: 2 });
    expect(s.byCourse).toEqual([
      { course: "board-12", label: "12th Board", leads: 2, pune: 2 },
      { course: "nda", label: "NDA", leads: 1, pune: 1 },
      { course: "ssc-cgl", label: "SSC CGL", leads: 1, pune: 0 },
    ]);
  });
});

describe("toClassLeadsCsv", () => {
  it("writes the mobile with a space so Excel keeps every digit", () => {
    const csv = toClassLeadsCsv([lead({ name: "Asha", courses: ["nda", "jee"] })]);
    const [header, row] = csv.split("\n");
    expect(header).toBe("name,mobile,city,courses,called,asked_on,email,from");
    expect(row).toContain('"91 9876543210"');
    expect(row).toContain('"NDA | JEE"');
    expect(row).toContain('"2026-11-16"');
  });

  it("disarms a typed value that would run as a formula", () => {
    const csv = toClassLeadsCsv([lead({ isPune: false, city: "=HYPERLINK(1)" })]);
    expect(csv).toContain(`"'=HYPERLINK(1)"`);
  });
});
