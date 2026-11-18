import { describe, expect, it } from "vitest";
import {
  aisseePaper,
  getBlueprint,
  RMS_CET_6_PAPER,
  RMS_CET_9_PAPER,
  totalMarks,
  totalQuestions,
} from "../src/lib/mocks/blueprints";
import { PAPERS } from "../scripts/milschool/config";
import { deriveMilschoolSittings, SECTION_ORDER } from "../scripts/mocks/milschoolSittings";

describe("military-school blueprints", () => {
  it("AISSEE Class 9: 150 questions, 400 marks, Maths at 4 and the rest at 2, no penalty", () => {
    const bp = aisseePaper(9, ["Mathematics", "English", "General Science", "Social Science", "Intelligence"]);
    expect(totalQuestions(bp)).toBe(150);
    expect(totalMarks(bp)).toBe(400);
    expect(bp.durationSecs).toBe(180 * 60);
    expect(bp.sections.map((s) => s.subjects[0])).toEqual([
      "Mathematics",
      "English",
      "General Science",
      "Social Science",
      "Intelligence",
    ]);
    expect(bp.sections.find((s) => s.key === "mathematics")?.marking).toEqual({ correct: 4, wrong: 0 });
    expect(bp.marking).toEqual({ correct: 2, wrong: 0 });
  });

  it("AISSEE Class 6: 125 questions, 300 marks, Maths at 3, in the order it is given", () => {
    const bp = aisseePaper(6, ["English", "Mathematics", "Intelligence", "General Knowledge"]);
    expect(totalQuestions(bp)).toBe(125);
    expect(totalMarks(bp)).toBe(300);
    expect(bp.durationSecs).toBe(150 * 60);
    expect(bp.sections[0].label).toBe("Language (English)");
    expect(bp.sections.find((s) => s.key === "mathematics")?.marking).toEqual({ correct: 3, wrong: 0 });
  });

  it("an order that misses or repeats a subject is refused", () => {
    expect(() => aisseePaper(6, ["English", "Mathematics", "Intelligence"])).toThrow();
    expect(() => aisseePaper(9, ["Mathematics", "Mathematics", "English", "General Science", "Social Science"])).toThrow();
  });

  it("RMS CET: 200 one-mark questions, no penalty, 2 h 30 min", () => {
    for (const bp of [RMS_CET_6_PAPER, RMS_CET_9_PAPER]) {
      expect(totalQuestions(bp)).toBe(200);
      expect(totalMarks(bp)).toBe(200);
      expect(bp.marking).toEqual({ correct: 1, wrong: 0 });
      expect(bp.durationSecs).toBe(150 * 60);
    }
    expect(RMS_CET_9_PAPER.sections.map((s) => [s.subjects[0], s.count])).toEqual([
      ["English", 50],
      ["Hindi", 20],
      ["Social Science", 30],
      ["Mathematics", 50],
      ["Science", 50],
    ]);
  });

  it("getBlueprint resolves every military-school paper", () => {
    for (const slug of ["aissee-6", "aissee-9", "rms-cet-6", "rms-cet-9"]) {
      expect(getBlueprint(slug, "paper")?.examSlug).toBe(slug);
    }
  });
});

describe("military-school sittings", () => {
  const sittings = deriveMilschoolSittings(Object.values(PAPERS));

  it("one sitting per AISSEE and RMS paper, none for RIMC", () => {
    expect(sittings.every((s) => !s.key.startsWith("rimc"))).toBe(true);
    const mcqPapers = Object.values(PAPERS).filter((p) => p.exam !== "rimc");
    expect(sittings.map((s) => s.key).sort()).toEqual(mcqPapers.map((p) => p.id).sort());
  });

  it("builds the eleven whole papers and holds every paper with a question missing", () => {
    const built = sittings.filter((s) => !s.hold).map((s) => s.slug).sort();
    expect(built).toEqual([
      "aissee-6-2020",
      "aissee-6-2022",
      "aissee-6-2024",
      "aissee-6-2026",
      "aissee-9-2020",
      "aissee-9-2021",
      "aissee-9-2022",
      "aissee-9-2024",
      "aissee-9-2025",
      "aissee-9-2026",
      "rms-cet-9-2023",
    ]);
    for (const s of sittings.filter((x) => x.hold)) {
      expect(PAPERS[s.key].held?.numbers.length).toBeGreaterThan(0);
      expect(s.hold).toContain(PAPERS[s.key].held!.why);
    }
  });

  it("each sitting carries its own paper's section order and its exam's blueprint", () => {
    const s22 = sittings.find((s) => s.key === "aissee-6-2022")!;
    expect(s22.blueprint.sections.map((x) => x.subjects[0])).toEqual(SECTION_ORDER["aissee-6-2022"]);
    expect(s22.blueprint.examSlug).toBe("aissee-6");
    expect(sittings.find((s) => s.key === "aissee-9-2025")!.blueprint.sections[1].subjects[0]).toBe("Intelligence");
    expect(sittings.find((s) => s.key === "rms-cet-9-2023")!.blueprint).toBe(RMS_CET_9_PAPER);
  });

  it("every AISSEE paper has a section order, and titles name the exam, year and class", () => {
    for (const p of Object.values(PAPERS).filter((x) => x.exam.startsWith("aissee"))) {
      expect(SECTION_ORDER[p.id], p.id).toBeDefined();
    }
    expect(sittings.find((s) => s.key === "aissee-9-2026")!.title).toBe("AISSEE 2026 Class 9");
    expect(sittings.find((s) => s.key === "rms-cet-9-2023")!.title).toBe("RMS CET 2023 Class 9");
  });
});
