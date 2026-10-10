import { describe, it, expect } from "vitest";
import { examGapNotice } from "@/lib/exam/examGap";

// What /notes covers today, as far as these tests care: no MPSC exam.
const NOTES = ["nda", "mht-cet", "jee-mains", "cds"] as const;

describe("examGapNotice — a signed-in student whose exam has nothing on this page", () => {
  it("names their exam and points to what it does have", () => {
    const n = examGapNotice(["mpsc-group-b-c"], NOTES);
    expect(n).toEqual({
      slug: "mpsc-group-b-c",
      displayName: "MPSC Group B & C",
      links: [
        { label: "Past papers and chapter tests", href: "/mock/exam/mpsc-group-b-c" },
        { label: "Everything for MPSC Group B & C", href: "/exams/mpsc-group-b-c" },
      ],
    });
  });

  it("says nothing when any of their exams is on the page", () => {
    expect(examGapNotice(["mpsc-group-b-c", "cds"], NOTES)).toBeNull();
  });

  it("says nothing to a visitor who never chose an exam", () => {
    expect(examGapNotice([], NOTES)).toBeNull();
  });

  it("ignores a stored exam the site no longer knows", () => {
    expect(examGapNotice(["not-an-exam"], NOTES)).toBeNull();
    expect(examGapNotice(["not-an-exam", "mpsc-sti-mains"], NOTES)?.slug).toBe("mpsc-sti-mains");
  });

  it("offers past papers only for an exam that has them", () => {
    // MH State Board Class 9 has a textbook reader but no mocks.
    const n = examGapNotice(["mh-sb-9"], NOTES);
    expect(n?.links).toEqual([{ label: "Everything for MH State Board 9", href: "/exams/mh-sb-9" }]);
  });
});
