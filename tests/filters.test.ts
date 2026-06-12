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
      principleSlug: null,
      kind: "pyq",
      q: "",
      page: 1,
    });
  });

  it("defaults kind to 'pyq' and parses valid kind values", () => {
    expect(parseFilters(new URLSearchParams("")).kind).toBe("pyq");
    expect(parseFilters(new URLSearchParams("kind=practice")).kind).toBe("practice");
    expect(parseFilters(new URLSearchParams("kind=all")).kind).toBe("all");
    expect(parseFilters(new URLSearchParams("kind=pyq")).kind).toBe("pyq");
  });

  it("falls back to 'pyq' for an unknown kind", () => {
    expect(parseFilters(new URLSearchParams("kind=garbage")).kind).toBe("pyq");
    expect(parseFilters(new URLSearchParams("kind=")).kind).toBe("pyq");
  });

  it("parses ?principle=<slug> into principleSlug", () => {
    const f = parseFilters(new URLSearchParams("principle=am-gm-mean-inequalities"));
    expect(f.principleSlug).toBe("am-gm-mean-inequalities");
  });

  it("silently drops invalid principle slug shapes (defense vs SQL fragments)", () => {
    expect(
      parseFilters(new URLSearchParams("principle=DROP TABLE questions")).principleSlug
    ).toBeNull();
    expect(parseFilters(new URLSearchParams("principle=foo bar")).principleSlug).toBeNull();
    expect(parseFilters(new URLSearchParams("principle=foo/bar")).principleSlug).toBeNull();
    expect(parseFilters(new URLSearchParams("principle=")).principleSlug).toBeNull();
  });

  it("returns null principleSlug when ?principle= is missing", () => {
    expect(parseFilters(new URLSearchParams("examId=e1")).principleSlug).toBeNull();
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
    principleSlug: null,
    kind: "pyq",
    q: "",
    page: 1,
  };

  it("emits no params when filters are at defaults", () => {
    expect(buildSearchParams(empty).toString()).toBe("");
  });

  it("omits kind when 'pyq' (default) and emits it otherwise; round-trips", () => {
    expect(buildSearchParams({ ...empty, kind: "pyq" }).has("kind")).toBe(false);
    expect(buildSearchParams({ ...empty, kind: "practice" }).get("kind")).toBe("practice");
    expect(buildSearchParams({ ...empty, kind: "all" }).get("kind")).toBe("all");
    expect(parseFilters(buildSearchParams({ ...empty, kind: "practice" })).kind).toBe("practice");
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
      principleSlug: null,
      kind: "pyq",
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
      principleSlug: null,
      kind: "pyq",
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
      principleSlug: null,
      kind: "pyq",
      q: "",
      page: 1,
    };
    const params = buildSearchParams(original);
    expect(params.get("extras")).toBe(original.extraIds.join(","));
    expect(parseFilters(params)).toEqual(original);
  });

  it("round-trips principleSlug", () => {
    const original: Filters = {
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      pyqYears: [],
      extraIds: [],
      principleSlug: "vieta-symmetric-roots",
      kind: "pyq",
      q: "",
      page: 1,
    };
    const params = buildSearchParams(original);
    expect(params.get("principle")).toBe("vieta-symmetric-roots");
    expect(parseFilters(params)).toEqual(original);
  });

  it("emits no principle param when principleSlug is null", () => {
    const sp = buildSearchParams({
      examId: null,
      subjectId: null,
      chapterIds: [],
      subtopicIds: [],
      difficulties: [],
      pyqYears: [],
      extraIds: [],
      principleSlug: null,
      kind: "pyq",
      q: "",
      page: 1,
    });
    expect(sp.has("principle")).toBe(false);
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
      principleSlug: null,
      kind: "pyq",
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
      principleSlug: null,
      kind: "pyq",
      q: "",
      page: 1,
    });
    expect(sp.get("pyqYears")).toBe("2024,2023");
  });
});
