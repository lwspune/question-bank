/**
 * The notes concept index V's explain_concept tool searches
 * (src/lib/chat/notesConcepts.generated.ts, written by `npm run chat:notes-data`):
 * one entry per concept card of every notes chapter. Fails until the
 * generator is re-run after a notes chapter ships or is renamed.
 */
import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { compactNotesConcepts, expandNotesConcepts, notesConceptIndex } from "@/lib/chat/conceptSearch";
import { NOTES_CONCEPT_TREE } from "@/lib/chat/notesConcepts.generated";

describe("notes concept index", () => {
  it("is current: one entry per concept card, in registry order", () => {
    expect(expandNotesConcepts(NOTES_CONCEPT_TREE)).toEqual(notesConceptIndex(NOTES_CHAPTERS));
  });

  it("the compact form expands back to exactly the entries it was made from", () => {
    const entries = notesConceptIndex(NOTES_CHAPTERS).slice(0, 300);
    expect(expandNotesConcepts(compactNotesConcepts(entries))).toEqual(entries);
  });

  it("names each card's exam, chapter key, subtopic and concept", () => {
    const one = notesConceptIndex([
      {
        subjectRoute: "nda-physics",
        chapterSlug: "sound",
        examName: "NDA",
        notes: {
          "sound-basics": { title: "Sound Basics", concepts: [{ slug: "speed-of-sound", name: "Speed of sound" }] },
        },
      },
    ]);
    expect(one).toEqual([
      { key: "nda-physics/sound", subtopic: "sound-basics", concept: "speed-of-sound", name: "Speed of sound", subtopicTitle: "Sound Basics", examName: "NDA" },
    ]);
  });
});
