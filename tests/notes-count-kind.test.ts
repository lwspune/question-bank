import { describe, expect, it } from "vitest";
import { featuredLeadIn, notesBrowseKind, notesCountKind, notesCountNoun, notesHubCountLabel } from "../src/lib/notes/countKind";
import { buildBrowseUrl } from "../src/lib/guide/buildBrowseUrl";

describe("notesCountKind", () => {
  it("keeps every exam's notes past-year-only by default (migration 0036)", () => {
    for (const exam of ["NDA", "CDS", "MHT-CET", "JEE Mains", "IMAT"]) expect(notesCountKind(exam)).toBe("pyq");
  });

  it("counts both kinds for SPI, whose bank is mostly practice around one past paper", () => {
    expect(notesCountKind("SPI")).toBe("all");
  });

  it("names what it counts, so a card never calls a practice question a PYQ", () => {
    expect(notesCountNoun("pyq")).toBe("PYQs");
    expect(notesCountNoun("all")).toBe("questions");
  });
});

describe("notesHubCountLabel", () => {
  it("calls a past-year-only count past questions, and an all-kinds count just questions", () => {
    expect(notesHubCountLabel("pyq")).toBe("past questions");
    expect(notesHubCountLabel("all")).toBe("questions");
  });
});

describe("featuredLeadIn", () => {
  it("calls only a past-paper question a real exam question", () => {
    expect(featuredLeadIn("pyq")).toBe("The same idea in a real exam question:");
    expect(featuredLeadIn("practice")).toBe("The same idea in a practice question:");
    expect(featuredLeadIn("textbook")).toBe("The same idea in a textbook question:");
  });
});

describe("notesBrowseKind", () => {
  it("opens /browse on both kinds only for an exam whose notes count both", () => {
    expect(notesBrowseKind("all")).toBe("all");
    // undefined keeps every other exam's drill URL byte-identical (no kind param)
    expect(notesBrowseKind("pyq")).toBeUndefined();
  });

  it("puts kind=all on an SPI drill URL, so practice rows are not filtered out", () => {
    expect(buildBrowseUrl({ extraIds: ["a"], kind: notesBrowseKind(notesCountKind("SPI")) })).toContain("kind=all");
    expect(buildBrowseUrl({ extraIds: ["a"], kind: notesBrowseKind(notesCountKind("CDS")) })).not.toContain("kind=");
  });
});
