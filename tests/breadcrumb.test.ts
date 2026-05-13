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
