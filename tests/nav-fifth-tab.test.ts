/**
 * The fifth nav tab: Board for most viewers, Fix for graduate students
 * (2026-10-07). Graduates (CDS, UPSC, MPSC, or "College / other") had never
 * revealed one board-textbook answer, while most of them had mistakes waiting
 * in /drill that few had found. Pure core: src/lib/nav/fifthTab.ts.
 */
import { describe, it, expect } from "vitest";
import { fifthTabFor } from "@/lib/nav/fifthTab";

const student = (stage: string | null, targetExams: string[]) =>
  ({ isStaff: false, stage, targetExams }) as NonNullable<Parameters<typeof fifthTabFor>[0]>;

describe("fifthTabFor", () => {
  it("keeps Board for a visitor who is not signed in", () => {
    expect(fifthTabFor(null)).toBe("board");
  });

  it("gives Fix to a student who said College / other", () => {
    expect(fifthTabFor(student("college", ["nda"]))).toBe("fix");
  });

  it("keeps Board for a student repeating a year: a dropper re-sits a Class 11-12 exam", () => {
    expect(fifthTabFor(student("dropper", ["upsc-cse"]))).toBe("board");
  });

  it("lets a stated school stage outrank graduate exams", () => {
    expect(fifthTabFor(student("class-12", ["cds", "upsc-cse"]))).toBe("board");
  });

  it("infers graduate from the exams when no stage was given", () => {
    expect(fifthTabFor(student(null, ["upsc-cse"]))).toBe("fix");
    expect(fifthTabFor(student(null, ["mpsc-group-b-c", "nda"]))).toBe("fix");
  });

  it("keeps Board when the exams lean school or senior", () => {
    expect(fifthTabFor(student(null, ["nda", "cds"]))).toBe("board");
    expect(fifthTabFor(student(null, ["mh-hsc-12"]))).toBe("board");
  });

  it("keeps Board for a student who told us nothing", () => {
    expect(fifthTabFor(student(null, []))).toBe("board");
  });

  // Institute staff use Board to teach from; their tier is not a student's.
  it("keeps Board for org staff whatever their profile says", () => {
    expect(fifthTabFor({ ...student("college", ["upsc-cse"]), isStaff: true })).toBe("board");
  });
});
