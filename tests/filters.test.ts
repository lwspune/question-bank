import { describe, it, expect } from "vitest";
import {
  parseFilters,
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";

describe("parseFilters", () => {
  it("returns defaults when params are empty", () => {
    expect(parseFilters(new URLSearchParams(""))).toEqual({
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      pyqYears: [],
      extraIds: [],
      q: "",
      page: 1,
    });
  });

  it("parses comma-separated extraIds (curated principle drill extensions)", () => {
    const f = parseFilters(
      new URLSearchParams(
        "extras=11111111-1111-1111-1111-111111111111,22222222-2222-2222-2222-222222222222"
      )
    );
    expect(f.extraIds).toEqual([
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
    ]);
  });

  it("parses comma-separated pyqYears as integers", () => {
    const f = parseFilters(new URLSearchParams("pyqYears=2024,2023,2022"));
    expect(f.pyqYears).toEqual([2024, 2023, 2022]);
  });

  it("filters out non-numeric pyqYear values silently", () => {
    const f = parseFilters(new URLSearchParams("pyqYears=2024,abc,2022"));
    expect(f.pyqYears).toEqual([2024, 2022]);
  });

  it("filters out absurd pyqYear values silently (out of [1900, 2100])", () => {
    const f = parseFilters(new URLSearchParams("pyqYears=1899,2024,2101"));
    expect(f.pyqYears).toEqual([2024]);
  });

  it("parses single-value scalar params", () => {
    const f = parseFilters(
      new URLSearchParams("examId=e1&subjectId=s1&q=lens&page=3")
    );
    expect(f.examId).toBe("e1");
    expect(f.subjectId).toBe("s1");
    expect(f.q).toBe("lens");
    expect(f.page).toBe(3);
  });

  it("parses comma-separated array params", () => {
    const f = parseFilters(
      new URLSearchParams("chapterIds=c1,c2,c3&subtopicIds=s1,s2")
    );
    expect(f.chapterIds).toEqual(["c1", "c2", "c3"]);
    expect(f.subtopicIds).toEqual(["s1", "s2"]);
  });

  it("filters out invalid difficulty values silently", () => {
    const f = parseFilters(
      new URLSearchParams("difficulty=EASY,EXTREME,HARD")
    );
    expect(f.difficulties).toEqual(["EASY", "HARD"]);
  });

  it("clamps invalid page values to 1", () => {
    expect(parseFilters(new URLSearchParams("page=0")).page).toBe(1);
    expect(parseFilters(new URLSearchParams("page=-5")).page).toBe(1);
    expect(parseFilters(new URLSearchParams("page=abc")).page).toBe(1);
  });
});

describe("buildSearchParams", () => {
  const empty: Filters = {
    examId: null,
    subjectId: null,
    chapterIds: [],
    subtopicIds: [],
    difficulties: [],
    pyqYears: [],
    extraIds: [],
    q: "",
    page: 1,
  };

  it("emits no params when filters are at defaults", () => {
    expect(buildSearchParams(empty).toString()).toBe("");
  });

  it("serializes set values", () => {
    const sp = buildSearchParams({
      examId: "e1",
      subjectId: "s1",
      chapterIds: ["c1", "c2"],
      subtopicIds: [],
      difficulties: ["EASY"],
      pyqYears: [],
      extraIds: [],
      q: "lens",
      page: 2,
    });
    expect(sp.get("examId")).toBe("e1");
    expect(sp.get("subjectId")).toBe("s1");
    expect(sp.get("chapterIds")).toBe("c1,c2");
    expect(sp.get("difficulty")).toBe("EASY");
    expect(sp.get("q")).toBe("lens");
    expect(sp.get("page")).toBe("2");
    expect(sp.has("subtopicIds")).toBe(false);
  });

  it("round-trips an arbitrary filter object", () => {
    const original: Filters = {
      examId: "e1",
      subjectId: "s1",
      chapterIds: ["a", "b"],
      subtopicIds: ["x"],
      difficulties: ["EASY", "HARD"],
      pyqYears: [2024, 2022],
      extraIds: [],
      q: "wave",
      page: 3,
    };
    const params = buildSearchParams(original);
    const parsed = parseFilters(params);
    expect(parsed).toEqual(original);
  });

  it("round-trips extraIds — used by principle drill links", () => {
    const original: Filters = {
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: ["s1"],
      difficulties: [],
      pyqYears: [],
      extraIds: [
        "11111111-1111-1111-1111-111111111111",
        "22222222-2222-2222-2222-222222222222",
        "33333333-3333-3333-3333-333333333333",
      ],
      q: "",
      page: 1,
    };
    const params = buildSearchParams(original);
    expect(params.get("extras")).toBe(original.extraIds.join(","));
    expect(parseFilters(params)).toEqual(original);
  });

  it("emits no extras param when extraIds is empty", () => {
    const sp = buildSearchParams({
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      pyqYears: [],
      extraIds: [],
      q: "",
      page: 1,
    });
    expect(sp.has("extras")).toBe(false);
  });

  it("emits pyqYears as a comma-joined param when set", () => {
    const sp = buildSearchParams({
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      pyqYears: [2024, 2023],
      extraIds: [],
      q: "",
      page: 1,
    });
    expect(sp.get("pyqYears")).toBe("2024,2023");
  });
});
