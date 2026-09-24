/**
 * The zero-PUBLIC-content guard on the student exam chips.
 *
 * WHY THIS EXISTS. `/welcome` and `/account` let a student pick their target
 * exam, and the value is persisted to `student_profiles.target_exams`. That
 * choice then steers `/drill`, the mock recommendations and the report email.
 * An exam with no PUBLIC questions therefore cannot be offered: picking it sets
 * a target that resolves to nothing, everywhere, with no error to explain it.
 *
 * THIS WAS A LIVE DEFECT, NOT A HYPOTHETICAL. `isc-12` shipped in
 * EXAM_REGISTRY and rendered as a chip while its `examName` resolved to no
 * `exams` row at all — the corpus is PAUSED and nothing was ever ingested. It
 * is flagged now, which is what removes the chip.
 *
 * The flag is HAND-DECLARED because these chips are a module-level const built
 * from static TS; there is no request in which to count rows. That is the same
 * bargain `mixedFormats` makes, and it carries the same obligation: a declared
 * fact needs a standing probe or it rots. The probe is
 * tests/exam-registry-content.test.ts, which re-measures the flag against the
 * live bank on every prod-contract run.
 *
 * This file is the OTHER half — the pure, fast half that runs in the push gate
 * and asserts the wiring: whatever the flag says, a flagged exam does not reach
 * the chips. It tests `buildExamChips` against a SYNTHETIC registry rather than
 * only eyeballing the real one, so it still fails when the real registry
 * happens to have nothing flagged.
 */
import { describe, it, expect } from "vitest";
import { buildExamChips, EXAM_CHIP_OPTIONS } from "@/lib/profile/examChoices";
import { EXAM_REGISTRY, type ExamEntry } from "@/lib/exam/examContext";

/** A minimal registry entry; only the fields the chip builder reads matter. */
function entry(over: Partial<ExamEntry> & Pick<ExamEntry, "slug">): ExamEntry {
  return {
    displayName: over.slug,
    examName: over.slug,
    guidesPath: null,
    notesPath: null,
    ...over,
  } as ExamEntry;
}

describe("buildExamChips — the zero-PUBLIC-content guard", () => {
  it("drops an exam flagged noPublicContent", () => {
    const chips = buildExamChips([
      entry({ slug: "nda", displayName: "NDA" }),
      entry({ slug: "isc-12", displayName: "ISC Class 12", noPublicContent: true }),
    ]);
    expect(chips.map((c) => c.value)).toEqual(["nda"]);
  });

  it("keeps an exam that does not carry the flag", () => {
    const chips = buildExamChips([
      entry({ slug: "nda", displayName: "NDA" }),
      entry({ slug: "isc-12", displayName: "ISC Class 12" }),
    ]);
    expect(chips.map((c) => c.value)).toEqual(["nda", "isc-12"]);
  });

  // The guard runs BEFORE grouping, not after. Filtering afterwards would leave
  // a family that had lost a member still rendering as a family — and rule 2 of
  // groupExamFamilies (a family of one degrades to flat) would never fire, so a
  // board reduced to one live class would render as a one-option group.
  it("degrades a family to a flat chip when the flag empties it to one member", () => {
    const chips = buildExamChips([
      entry({ slug: "cbse-11", displayName: "CBSE Class 11", board: "CBSE", std: 11 }),
      entry({
        slug: "cbse-12",
        displayName: "CBSE Class 12",
        board: "CBSE",
        std: 12,
        noPublicContent: true,
      }),
    ]);
    expect(chips).toEqual([{ value: "cbse-11", label: "CBSE Class 11" }]);
  });

  it("still groups a family whose members all have content", () => {
    const chips = buildExamChips([
      entry({ slug: "cbse-11", displayName: "CBSE Class 11", board: "CBSE", std: 11 }),
      entry({ slug: "cbse-12", displayName: "CBSE Class 12", board: "CBSE", std: 12 }),
    ]);
    expect(chips).toEqual([
      { value: "cbse-11", label: "Class 11", group: "CBSE" },
      { value: "cbse-12", label: "Class 12", group: "CBSE" },
    ]);
  });

  it("returns nothing when every exam is flagged, rather than failing open", () => {
    // Fail-OPEN is right for an exam the registry has never heard of
    // (groupExamFamilies rule 1 — a fresh ingest must not vanish from pickers).
    // It is wrong here: this flag is an explicit statement that the exam has no
    // content, so honouring it can never be the unsafe direction.
    expect(buildExamChips([entry({ slug: "isc-12", noPublicContent: true })])).toEqual([]);
  });
});

describe("the real registry", () => {
  it("offers no chip for any exam flagged noPublicContent", () => {
    const flagged = EXAM_REGISTRY.filter((e) => e.noPublicContent).map((e) => e.slug);
    const offered = new Set(EXAM_CHIP_OPTIONS.map((c) => c.value));
    expect(flagged.filter((s) => offered.has(s))).toEqual([]);
  });

  it("offers a chip for every exam that is NOT flagged", () => {
    // The mirror direction. Without it the guard could hide everything and
    // still pass — and a missing chip is a target exam a student cannot pick.
    expect(EXAM_CHIP_OPTIONS.map((c) => c.value).sort()).toEqual(
      EXAM_REGISTRY.filter((e) => !e.noPublicContent).map((e) => e.slug).sort()
    );
  });

  it("flags isc-12, whose examName resolves to no exams row", () => {
    // Pinned by slug on purpose. This is the case that proved the guard was
    // needed; if someone un-flags it, that must be a deliberate edit here too.
    const isc = EXAM_REGISTRY.find((e) => e.slug === "isc-12");
    expect(isc?.noPublicContent).toBe(true);
  });
});
