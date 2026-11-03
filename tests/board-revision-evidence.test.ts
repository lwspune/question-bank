/**
 * The board revision sheet's evidence check (2026-11-03): a drafting agent
 * hands in, beside its sheet, a quote from the book for every key point,
 * derivation and diagram, and the past-paper lines behind every most-asked
 * topic. The check proves each quote is really in the book's text and each
 * topic's years are exactly the years of the lines it cites, so the main
 * session verifies 67 drafts mechanically instead of trusting them.
 */
import { describe, it, expect } from "vitest";
import { checkRevisionEvidence, checkSourceChapter, type RevisionEvidence } from "../scripts/board-revision/evidenceCore";
import type { RevisionSheet } from "@/lib/board/revision/types";

const book = `1.7.1 Theorem of Parallel Axes: It states that, "The moment of inertia (IO) of an object
about any axis is the sum of its moment of inertia (IC) about an axis parallel to the given axis".
Fig. 1.6: Vehicle on a banked road. The surfaces of curved roads are tilted with the horizontal.`;

const pyqs = [
  "2025 February [subjective] State and prove the law of conservation of angular momentum.",
  "2018 March [subjective] State and prove principle of conservation of angular momentum.",
  "2024 February [subjective] Derive an expression for maximum speed of a vehicle.",
];

const sheet = {
  keyPoints: [{ term: "Theorem of parallel axes", text: "x" }],
  derivations: [{ title: "Parallel axes", steps: ["a", "b"] }],
  diagrams: [{ title: "Banked road", labels: ["a", "b"] }],
  mostAsked: [{ topic: "Conservation of angular momentum", years: [2025, 2018] }],
} as Pick<RevisionSheet, "keyPoints" | "derivations" | "diagrams" | "mostAsked">;

function ev(over: Partial<RevisionEvidence> = {}): RevisionEvidence {
  return {
    keyPoints: [{ term: "Theorem of parallel axes", quote: "the moment of inertia (IO) of an object about any axis is the sum" }],
    derivations: [{ title: "Parallel axes", quote: "1.7.1 Theorem of Parallel Axes: It states that" }],
    diagrams: [{ title: "Banked road", quote: "Fig. 1.6: Vehicle on a banked road" }],
    mostAsked: [
      {
        topic: "Conservation of angular momentum",
        questions: ["2025 February [subjective] State and prove the law of conservation", "2018 March [subjective] State and prove principle"],
      },
    ],
    ...over,
  };
}

describe("checkSourceChapter", () => {
  // Most books number their sections "10.1", "10.2": the commonest leading number is the chapter.
  const sections = "Can you recall?\n1. What is a functional group?\n10.1 Classification : x\n10.2 Nomenclature\n10.2.1 Common names\n9.9 A stray cross-reference";
  // Geography has no numbered sections; its heading is "<n>. <chapter name>".
  const heading = "4. Primary Economic Activities\n\nCan you recall?\n1. What do farmers grow?";

  it("reads the chapter from the section numbers", () => {
    expect(checkSourceChapter("Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 10", sections, "Halogen Derivatives")).toEqual([]);
    expect(checkSourceChapter("Balbharati Chemistry Std XII, Chapter 9", sections, "Halogen Derivatives").join()).toMatch(/Chapter 9.*10/);
  });

  it("falls back to the heading carrying the chapter's name", () => {
    expect(checkSourceChapter("Balbharati Geography Std XII, Chapter 4", heading, "Primary Economic Activities")).toEqual([]);
    expect(checkSourceChapter("Balbharati Geography Std XII, Chapter 3", heading, "Primary Economic Activities").join()).toMatch(/3.*4/);
  });

  it("says so when either number is missing", () => {
    expect(checkSourceChapter("Balbharati Chemistry Std XII", sections, "Halogen Derivatives").join()).toMatch(/source/);
    expect(checkSourceChapter("Balbharati, Chapter 10", "no numbers here", "Halogen Derivatives").join()).toMatch(/book/);
  });
});

describe("checkRevisionEvidence", () => {
  it("passes quotes that are in the book and years that match the cited lines", () => {
    expect(checkRevisionEvidence(sheet, ev(), book, pyqs)).toEqual([]);
  });

  it("matches a quote across line breaks, case and punctuation", () => {
    const e = ev({ keyPoints: [{ term: "Theorem of parallel axes", quote: "OBJECT ABOUT ANY AXIS IS THE SUM OF ITS MOMENT" }] });
    expect(checkRevisionEvidence(sheet, e, book, pyqs)).toEqual([]);
  });

  it("refuses a quote that is not in the book", () => {
    const e = ev({ keyPoints: [{ term: "Theorem of parallel axes", quote: "the moment of inertia is the sum of all masses everywhere" }] });
    expect(checkRevisionEvidence(sheet, e, book, pyqs).join()).toMatch(/keyPoints\[0\].*not in the book/);
  });

  it("refuses a quote too short to prove anything", () => {
    const e = ev({ diagrams: [{ title: "Banked road", quote: "banked road" }] });
    expect(checkRevisionEvidence(sheet, e, book, pyqs).join()).toMatch(/diagrams\[0\].*words/);
  });

  it("refuses evidence that does not line up with the sheet", () => {
    expect(checkRevisionEvidence(sheet, ev({ keyPoints: [] }), book, pyqs).join()).toMatch(/keyPoints/);
    const renamed = ev({ derivations: [{ title: "Something else", quote: "1.7.1 Theorem of Parallel Axes: It states that" }] });
    expect(checkRevisionEvidence(sheet, renamed, book, pyqs).join()).toMatch(/derivations\[0\].*title/);
  });

  it("refuses a cited past-paper line that is not in the list", () => {
    const e = ev({ mostAsked: [{ topic: "Conservation of angular momentum", questions: ["2019 March [subjective] Made up question"] }] });
    expect(checkRevisionEvidence(sheet, e, book, pyqs).join()).toMatch(/mostAsked\[0\].*not in the past papers/);
  });

  it("refuses years that differ from the years of the cited lines", () => {
    const wrong = { ...sheet, mostAsked: [{ topic: "Conservation of angular momentum", years: [2025, 2024, 2018] }] };
    expect(checkRevisionEvidence(wrong, ev(), book, pyqs).join()).toMatch(/mostAsked\[0\].*years/);
  });

  it("refuses a topic with no cited line", () => {
    const e = ev({ mostAsked: [{ topic: "Conservation of angular momentum", questions: [] }] });
    expect(checkRevisionEvidence(sheet, e, book, pyqs).join()).toMatch(/mostAsked\[0\]/);
  });
});
