/**
 * Visibility rule for the /browse question-format filter.
 *
 * The bank is 77% MCQ, and five of its eleven exams (NDA, MHT-CET, NEET,
 * Foundation, Worksheets — 29,524 PUBLIC questions) are 100% MCQ, where the
 * control could only ever be a no-op. It is therefore rendered only where the
 * exam genuinely holds more than one format, the same posture the syllabus-fit
 * filter takes off JEE.
 *
 * Two failure directions, and they are NOT symmetric — hence the guards
 * asserted first below:
 *
 *   - Showing an inert control is noise.
 *   - HIDING a control while its filter is active strands the viewer with an
 *     invisible narrowing they cannot undo, and no error to explain the
 *     missing questions. That must never happen, so an active filter pins the
 *     control on, and every "we don't know" path fails toward showing it.
 *
 * That asymmetry is what makes the registry flag safe: the worst a stale
 * `mixedFormats` can do is add or drop an inert control, never strand anyone.
 * The flag's accuracy is a separate contract, pinned against the live bank by
 * tests/format-mix-registry.test.ts.
 */
import { describe, it, expect } from "vitest";
import {
  shouldShowFormatFilter,
  mixedFormatExamIds,
} from "@/lib/questions/formatMix";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";

const NDA = "11111111-1111-1111-1111-111111111111";
const SB11 = "22222222-2222-2222-2222-222222222222";
const JEE = "33333333-3333-3333-3333-333333333333";

const show = (over: Partial<Parameters<typeof shouldShowFormatFilter>[0]> = {}) =>
  shouldShowFormatFilter({
    mixedExamIds: [SB11, JEE],
    examId: null,
    activeFormat: "all",
    ...over,
  });

describe("shouldShowFormatFilter", () => {
  it("NEVER hides the control while its filter is active", () => {
    // NDA is single-format, so the registry alone says hide. An active
    // ?format=mcq would then be an invisible filter with no way back — and the
    // /browse chip that undoes it lives in a component that may not render.
    expect(show({ examId: NDA, activeFormat: "mcq" })).toBe(true);
    expect(show({ mixedExamIds: [], activeFormat: "subjective" })).toBe(true);
  });

  it("fails toward showing when the exam-id map is unavailable", () => {
    // getExamIdMap() swallows errors and yields all-null slugs, so this is the
    // real DB-blip shape. Degrading to an always-visible control is strictly
    // better than removing capability.
    expect(show({ mixedExamIds: [] })).toBe(true);
    expect(show({ mixedExamIds: [], examId: NDA })).toBe(true);
  });

  it("hides on a single-format exam", () => {
    expect(show({ examId: NDA })).toBe(false);
  });

  it("shows on a mixed exam", () => {
    expect(show({ examId: SB11 })).toBe(true);
    expect(show({ examId: JEE })).toBe(true);
  });

  it("shows with no exam selected — bank-wide there is a mix", () => {
    expect(show({ examId: null })).toBe(true);
  });

  it("hides for an exam absent from the mixed list rather than guessing", () => {
    expect(show({ examId: "44444444-4444-4444-4444-444444444444" })).toBe(false);
  });
});

describe("mixedFormatExamIds", () => {
  const idFor = (slug: string) => `id-${slug}`;
  const fullMap = Object.fromEntries(
    EXAM_REGISTRY.map((e) => [e.slug, idFor(e.slug)])
  ) as ExamIdMap;

  it("returns exactly the flagged exams' uuids", () => {
    const expected = EXAM_REGISTRY.filter((e) => e.mixedFormats).map((e) =>
      idFor(e.slug)
    );
    expect(mixedFormatExamIds(fullMap)).toEqual(expected);
    expect(expected.length).toBeGreaterThan(0);
  });

  it("skips a flagged exam whose uuid did not resolve", () => {
    // getExamIdMap() sets a slug to null when the exam is in the registry but
    // not yet seeded. Emitting `undefined` there would make every unmatched
    // examId compare equal to a hole in the list.
    const flagged = EXAM_REGISTRY.find((e) => e.mixedFormats)!;
    const holed: ExamIdMap = { ...fullMap, [flagged.slug]: null };
    const ids = mixedFormatExamIds(holed);
    expect(ids).not.toContain(idFor(flagged.slug));
    expect(ids.every((id) => typeof id === "string" && id.length > 0)).toBe(true);
  });

  it("returns an empty list when nothing resolves — the fail-open input", () => {
    const empty = Object.fromEntries(
      EXAM_REGISTRY.map((e) => [e.slug, null])
    ) as ExamIdMap;
    expect(mixedFormatExamIds(empty)).toEqual([]);
  });
});
