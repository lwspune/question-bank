import { describe, it, expect } from "vitest";
import { buildBreadcrumb, type BreadcrumbInput } from "@/app/browse/breadcrumb";

const Q_FULL: BreadcrumbInput = {
  exam: { name: "MHT-CET" },
  subject: { name: "Maths" },
  chapter: { name: "Indefinite Integration" },
  subtopic: { name: "Integration by Substitution" },
};

const Q_NO_SUBTOPIC: BreadcrumbInput = {
  exam: { name: "NDA" },
  subject: { name: "Mathematics" },
  chapter: { name: "Trigonometric Equations" },
  subtopic: null,
};

describe("buildBreadcrumb", () => {
  it("omits exam when includeExam=false (existing behaviour)", () => {
    expect(buildBreadcrumb(Q_FULL, { includeExam: false })).toBe(
      "Maths → Indefinite Integration → Integration by Substitution"
    );
  });

  it("prepends exam when includeExam=true", () => {
    expect(buildBreadcrumb(Q_FULL, { includeExam: true })).toBe(
      "MHT-CET → Maths → Indefinite Integration → Integration by Substitution"
    );
  });

  it("omits subtopic segment when subtopic is null", () => {
    expect(buildBreadcrumb(Q_NO_SUBTOPIC, { includeExam: false })).toBe(
      "Mathematics → Trigonometric Equations"
    );
    expect(buildBreadcrumb(Q_NO_SUBTOPIC, { includeExam: true })).toBe(
      "NDA → Mathematics → Trigonometric Equations"
    );
  });

  it("uses the same ' → ' separator throughout", () => {
    const result = buildBreadcrumb(Q_FULL, { includeExam: true });
    // count of separators = parts - 1 = 3
    expect(result.split(" → ")).toHaveLength(4);
  });

  it("does not mutate the input", () => {
    const snapshot = JSON.parse(JSON.stringify(Q_FULL));
    buildBreadcrumb(Q_FULL, { includeExam: true });
    expect(Q_FULL).toEqual(snapshot);
  });
});

describe("buildBreadcrumb: levels the page already fixes are dropped", () => {
  // Inside one chapter, all 25 cards printed "Mathematics → Vectors → <topic>"
  // and only the topic changed (2026-10-05). A level the filter or the page
  // already fixes says nothing on a card.
  it("drops subject and chapter when both are fixed, keeping the topic", () => {
    expect(
      buildBreadcrumb(Q_FULL, { includeExam: false, fixed: { subject: true, chapter: true } })
    ).toBe("Integration by Substitution");
  });

  it("drops only the subject when only the subject is fixed", () => {
    expect(buildBreadcrumb(Q_FULL, { includeExam: false, fixed: { subject: true } })).toBe(
      "Indefinite Integration → Integration by Substitution"
    );
  });

  it("can come out empty when every level is fixed", () => {
    expect(
      buildBreadcrumb(Q_FULL, {
        includeExam: false,
        fixed: { subject: true, chapter: true, subtopic: true },
      })
    ).toBe("");
  });

  it("a fixed topic on a row with no topic changes nothing", () => {
    expect(
      buildBreadcrumb(Q_NO_SUBTOPIC, { includeExam: false, fixed: { subtopic: true } })
    ).toBe("Mathematics → Trigonometric Equations");
  });
});
