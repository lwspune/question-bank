import { describe, it, expect } from "vitest";
import { getFilterRecipes } from "@/app/browse/recipes";

describe("getFilterRecipes — recipe count + ordering", () => {
  it("returns 3 recipes in a stable order", () => {
    const recipes = getFilterRecipes({
      examId: "abc",
      pyqYears: [2026, 2025, 2024, 2023],
    });
    expect(recipes).toHaveLength(3);
    expect(recipes[0].id).toBe("hard-only");
    expect(recipes[1].id).toBe("recent-years");
    expect(recipes[2].id).toBe("hard-latest");
  });

  it("each recipe has a non-empty label + href + icon name", () => {
    const recipes = getFilterRecipes({
      examId: "abc",
      pyqYears: [2026, 2025],
    });
    for (const r of recipes) {
      expect(r.label.length).toBeGreaterThan(0);
      expect(r.href.startsWith("/browse")).toBe(true);
      expect(r.iconName.length).toBeGreaterThan(0);
    }
  });
});

describe("getFilterRecipes — URL composition with examId", () => {
  it("HARD-only recipe scopes to the active exam", () => {
    const recipes = getFilterRecipes({
      examId: "exam-uuid",
      pyqYears: [2026, 2025],
    });
    const hardOnly = recipes.find((r) => r.id === "hard-only")!;
    expect(hardOnly.href).toBe("/browse?examId=exam-uuid&difficulty=HARD");
  });

  it("recent-years recipe uses the top 2 years from pyqYears", () => {
    const recipes = getFilterRecipes({
      examId: "exam-uuid",
      pyqYears: [2026, 2025, 2024, 2023],
    });
    const recent = recipes.find((r) => r.id === "recent-years")!;
    expect(recent.href).toBe(
      "/browse?examId=exam-uuid&pyqYears=2026%2C2025"
    );
  });

  it("hard-latest recipe combines difficulty + the latest year", () => {
    const recipes = getFilterRecipes({
      examId: "exam-uuid",
      pyqYears: [2026, 2025, 2024],
    });
    const combo = recipes.find((r) => r.id === "hard-latest")!;
    expect(combo.href).toBe(
      "/browse?examId=exam-uuid&difficulty=HARD&pyqYears=2026"
    );
  });
});

describe("getFilterRecipes — URL composition without examId", () => {
  it("emits recipes without examId when null", () => {
    const recipes = getFilterRecipes({ examId: null, pyqYears: [2026] });
    const hardOnly = recipes.find((r) => r.id === "hard-only")!;
    expect(hardOnly.href).toBe("/browse?difficulty=HARD");
  });
});

describe("getFilterRecipes — fallbacks when years are missing", () => {
  it("omits year-dependent recipes when pyqYears is empty", () => {
    const recipes = getFilterRecipes({ examId: "x", pyqYears: [] });
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain("hard-only");
    expect(ids).not.toContain("recent-years");
    expect(ids).not.toContain("hard-latest");
  });

  it("includes hard-latest but not recent-years when only 1 year is available", () => {
    const recipes = getFilterRecipes({ examId: "x", pyqYears: [2026] });
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain("hard-only");
    expect(ids).toContain("hard-latest");
    expect(ids).not.toContain("recent-years");
  });
});

describe("getFilterRecipes — defensive sorting", () => {
  it("sorts pyqYears descending if the caller passes them ascending", () => {
    const recipes = getFilterRecipes({
      examId: "x",
      pyqYears: [2023, 2024, 2025, 2026],
    });
    const recent = recipes.find((r) => r.id === "recent-years")!;
    expect(recent.href).toContain("pyqYears=2026%2C2025");
    const combo = recipes.find((r) => r.id === "hard-latest")!;
    expect(combo.href).toContain("pyqYears=2026");
  });
});
