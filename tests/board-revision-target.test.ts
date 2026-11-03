/**
 * What a board revision-sheet download names (2026-11-03): the /board chapter's
 * three URL parts. Anything else is refused before the registry is asked.
 */
import { describe, it, expect } from "vitest";
import { parseRevisionTarget } from "@/lib/board/revision/target";

describe("parseRevisionTarget", () => {
  it("accepts the three slugs", () => {
    expect(parseRevisionTarget({ examSlug: "mh-hsc-12", subjectRoute: "physics", chapterSlug: "rotational-dynamics" })).toEqual({
      examSlug: "mh-hsc-12",
      subjectRoute: "physics",
      chapterSlug: "rotational-dynamics",
    });
  });

  it.each([
    null,
    "mh-hsc-12/physics/rotational-dynamics",
    {},
    { examSlug: "mh-hsc-12", subjectRoute: "physics" },
    { examSlug: "MH", subjectRoute: "physics", chapterSlug: "x" },
    { examSlug: "mh-hsc-12", subjectRoute: "../etc", chapterSlug: "x" },
    { examSlug: "mh-hsc-12", subjectRoute: "physics", chapterSlug: 3 },
    { examSlug: "mh-hsc-12", subjectRoute: "physics", chapterSlug: "a".repeat(200) },
  ])("refuses %j", (v) => {
    expect(parseRevisionTarget(v)).toBeNull();
  });
});
