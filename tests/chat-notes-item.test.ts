/**
 * Ask V on a practice question written into the notes (2026-10-20). On
 * 2026-10-19 a student pasted a Halogen Derivatives practice rep into V; V
 * searched the bank, found nothing, and told them to tap an Ask V button the
 * notes did not have. Notes questions are not bank rows, so V reads them from
 * the notes themselves, by page and position, never from text the browser sends.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import type { SubtopicNote } from "@/app/notes/_types";
import { notesItemBrief, notesPageOf, notesRefKey, parseNotesItemRef, parseNotesRefKey } from "@/lib/chat/notesItem";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { NOTES_DATA_KEYS } from "@/lib/chat/notesData.generated";
import { notesDataKeys } from "@/lib/chat/notesItem";
import { collectImports } from "../scripts/lib/importGraph";

const REPO = path.resolve(__dirname, "..");

describe("parseNotesItemRef", () => {
  it("reads a self-check or a numbered practice rep", () => {
    expect(parseNotesItemRef({ concept: "benzylic", item: "self" })).toEqual({ concept: "benzylic", item: "self" });
    expect(parseNotesItemRef({ concept: "benzylic", item: "practice", index: 2 })).toEqual({
      concept: "benzylic",
      item: "practice",
      index: 2,
    });
  });

  it("drops anything malformed", () => {
    expect(parseNotesItemRef(null)).toBeNull();
    expect(parseNotesItemRef({ concept: "Bad Slug!", item: "self" })).toBeNull();
    expect(parseNotesItemRef({ concept: "x", item: "worked" })).toBeNull();
    expect(parseNotesItemRef({ concept: "x", item: "practice" })).toBeNull();
    expect(parseNotesItemRef({ concept: "x", item: "practice", index: -1 })).toBeNull();
    expect(parseNotesItemRef({ concept: "x", item: "practice", index: 1.5 })).toBeNull();
  });
});

// 2026-10-23: an Ask V tap on a notes question is stored with this key (migration 0181), so V's memory can
// label it and the card can be rebuilt. Two taps had sent the identical "Explain this question." unlabelled.
describe("notesRefKey / parseNotesRefKey: the stored form of a notes question", () => {
  it("writes a practice question as concept#index and the worked example as concept#self, and reads them back", () => {
    expect(notesRefKey({ concept: "ap-sum-terms", item: "practice", index: 3 })).toBe("ap-sum-terms#3");
    expect(notesRefKey({ concept: "ap-sum-terms", item: "self" })).toBe("ap-sum-terms#self");
    expect(parseNotesRefKey("ap-sum-terms#3")).toEqual({ concept: "ap-sum-terms", item: "practice", index: 3 });
    expect(parseNotesRefKey("ap-sum-terms#self")).toEqual({ concept: "ap-sum-terms", item: "self" });
  });

  it("reads nothing from a malformed key", () => {
    for (const bad of [null, "", "ap-sum-terms", "AP#3", "ap#-1", "ap#99", "ap#3#4", "ap#x"]) expect(parseNotesRefKey(bad)).toBeNull();
  });
});

describe("notesPageOf", () => {
  it("reads a notes subtopic page", () => {
    expect(notesPageOf("/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties")).toEqual({
      key: "mht-cet-chemistry/halogen-derivatives",
      subtopic: "cethal-classification-and-properties",
    });
  });

  it("is null for any other page", () => {
    expect(notesPageOf("/notes/mht-cet-chemistry/halogen-derivatives")).toBeNull();
    expect(notesPageOf("/browse")).toBeNull();
    expect(notesPageOf(null)).toBeNull();
  });
});

describe("notesItemBrief", () => {
  const note = {
    slug: "classification",
    title: "Classification and Properties",
    concepts: [
      {
        kind: "formula",
        slug: "benzylic",
        name: "Benzylic halides",
        intuition: "The halogen sits on a carbon next to the ring.",
        definition: "A **benzylic** halide has X on an sp3 carbon bonded to a benzene ring.",
        selfCheckExample: {
          prompt: "Which is benzylic?",
          options: ["Bromobenzene", "Benzyl bromide"],
          steps: ["Find the carbon carrying Br.", "It is sp3 and next to the ring."],
          answer: "(B) Benzyl bromide",
        },
        practiceSet: [
          { prompt: "Aryl: chlorobenzene or benzyl chloride?", answer: "Chlorobenzene" },
          { prompt: "Benzylic: bromobenzene, bromophenylmethane, 4-bromotoluene?", answer: "Bromophenylmethane", method: "CH2Br on the ring" },
        ],
      },
    ],
  } as unknown as SubtopicNote;

  it("gives V a self-check with its options, stored steps and answer", () => {
    const b = notesItemBrief(note, { concept: "benzylic", item: "self" })!;
    expect(b).toContain("Which is benzylic?");
    // V repeats the labels it reads: "ANSWER", never our word "stored" (2026-10-23).
    expect(b).not.toMatch(/stored/i);
    expect(b).toContain("(A) Bromobenzene");
    expect(b).toContain("(B) Benzyl bromide");
    expect(b).toContain("1. Find the carbon carrying Br.");
    expect(b).toContain("(B) Benzyl bromide");
    expect(b).toMatch(/not in the question bank/i);
  });

  it("gives V a practice rep with its answer, method and what the notes teach for the concept", () => {
    const b = notesItemBrief(note, { concept: "benzylic", item: "practice", index: 1 })!;
    expect(b).toContain("Benzylic: bromobenzene, bromophenylmethane, 4-bromotoluene?");
    expect(b).toContain("Bromophenylmethane");
    expect(b).toContain("CH2Br on the ring");
    expect(b).toContain("The halogen sits on a carbon next to the ring.");
    expect(b).toContain("benzylic");
  });

  it("tells V not to reach for the bank tools and not to work out its own answer", () => {
    const b = notesItemBrief(note, { concept: "benzylic", item: "self" })!;
    expect(b).toMatch(/do not call get_question/i);
    expect(b).toMatch(/never work out your own answer/i);
    // Owner, 2026-10-20: no "hint or full solution?" question when they tapped Ask V.
    expect(b).not.toMatch(/Want a hint or the full solution/);
  });

  // 2026-10-24: V told a student "This is a notes item, so I can't use the solution steps", then
  // "If you think that value is wrong, please tap Report" unasked. Neither is for the student.
  it("tells V to just explain: nothing about where the question comes from, and Report only when asked", () => {
    const rules = notesItemBrief(note, { concept: "benzylic", item: "practice", index: 0 })!;
    expect(rules).toMatch(/do not tell the student where the question comes from or what it lacks/i);
    expect(rules).toMatch(/mention Report only if they say the answer is wrong/i);
    expect(rules).toMatch(/only the answer is given, explain the idea from the notes and how it leads to that answer/i);
    expect(rules).not.toMatch(/notes item/i);
  });

  it("is null when the item is not there", () => {
    expect(notesItemBrief(note, { concept: "nope", item: "self" })).toBeNull();
    expect(notesItemBrief(note, { concept: "benzylic", item: "practice", index: 5 })).toBeNull();
  });
});

describe("the notes lookup V loads from", () => {
  it("has a loader for every notes chapter — run `npm run chat:notes-data` after shipping one", () => {
    expect([...NOTES_DATA_KEYS]).toEqual(notesDataKeys(NOTES_CHAPTERS));
  });

  it("V's answer route never loads the whole notes registry", () => {
    const read = (rel: string) => {
      try {
        return fs.statSync(path.join(REPO, rel)).isFile() ? fs.readFileSync(path.join(REPO, rel), "utf8") : null;
      } catch {
        return null;
      }
    };
    const reached = [...collectImports("src/app/api/chat/typed/route.ts", read, { valueOnly: true })];
    expect(reached).not.toContain("src/lib/notes/chapters.ts");
  });
});
