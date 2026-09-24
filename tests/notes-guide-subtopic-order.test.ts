import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { PLAYBOOKS } from "@/app/guide/mht-cet-maths/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/mht-cet-maths/_data/playbook-details";

// A chapter's subtopic ORDER is a teaching claim, and it is stated in THREE
// places: the /notes chapter's `subtopicOrder`, the /guide playbook card's
// `subtopics`, and the /guide detail page's `subSkills`. On 2026-09-20 the
// three disagreed on Mathematical Logic — the card and the notes put Negation
// third, the detail page put Converse third — so the same product told a
// student two different orders on two surfaces, with nothing to catch it.
//
// The notes order is canonical: it is what `npm run notes:order` syncs into
// `subtopics.order_index`, so it is what /browse renders too.
//
// TWO STRENGTHS, DELIBERATELY. Set equality is asserted for EVERY chapter,
// because a subtopic present on one surface and missing from another is a
// straightforward defect. ORDER is asserted only for chapters whose arc has
// actually been reviewed — measured 2026-09-20, EIGHT other MHT-CET Maths
// chapters carry order-only drift (line-and-plane, vectors,
// applications-of-derivative, differential-equations, indefinite-integration,
// differentiation, probability-distribution, binomial-distribution). Each needs
// an editorial decision about which order is RIGHT, which is shipped-content
// work, not a test fix. Asserting order globally today would either fail the
// gate chain or pressure someone into reordering eight chapters by whichever
// surface happened to be edited last. Logged in ROADMAP.md; add a slug here as
// its arc is reviewed. See [[notes-teaching-arc-forward-reference]].

const ARC_VERIFIED = new Set<string>([
  "mathematical-logic",
  "limits",
  "definite-integration",
  "applications-of-definite-integral",
  "determinants-and-matrices",
  "complex-numbers",
  "permutations-and-combinations",
  "linear-programming",
  // measures-of-dispersion has notes but no playbook (dropped chapter), so nothing to pin
  // sets-relations-and-functions has notes but no playbook (below the q/paper line), so nothing to pin here
]);

/** Compare on a normalised key — the surfaces differ on case and the Oxford comma. */
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const notesChapters = new Map(
  NOTES_CHAPTERS.filter((c) => c.subjectRoute === "mht-cet-maths").map((c) => [
    c.chapter.chapterName,
    c,
  ])
);

describe("guide ↔ notes subtopic agreement", () => {
  for (const playbook of PLAYBOOKS) {
    const notes = notesChapters.get(playbook.chapter);
    if (!notes) continue; // not every playbook has shipped /notes

    const fromNotes = notes.chapter.subtopicOrder.map((slug) =>
      key(notes.notes[slug].subtopicName)
    );
    const fromCard = playbook.subtopics.map(key);

    it(`${playbook.slug}: card and /notes list the SAME subtopics`, () => {
      expect([...fromCard].sort()).toEqual([...fromNotes].sort());
    });

    const detail = PLAYBOOK_DETAILS[playbook.slug];
    // subSkills is a curated list that is 1:1 with subtopics only for some
    // playbooks; when it is a different length it is a deliberate editorial
    // summary, not drift.
    const subSkillsAre1to1 = detail && detail.subSkills.length === playbook.subtopics.length;

    if (ARC_VERIFIED.has(playbook.slug)) {
      it(`${playbook.slug}: card ORDER matches /notes (arc-verified chapter)`, () => {
        expect(fromCard).toEqual(fromNotes);
      });

      if (subSkillsAre1to1) {
        it(`${playbook.slug}: detail subSkills ORDER matches the card (arc-verified chapter)`, () => {
          expect(detail.subSkills.map((s) => key(s.name))).toEqual(fromCard);
        });
      }
    } else {
      it.skip(`${playbook.slug}: card ORDER matches /notes — arc not yet reviewed (ROADMAP backfill)`, () => {});
    }
  }

  it("every arc-verified slug is a real playbook — the allowlist cannot rot silently", () => {
    const slugs = new Set(PLAYBOOKS.map((p) => p.slug));
    for (const s of ARC_VERIFIED) expect(slugs.has(s)).toBe(true);
  });
});
