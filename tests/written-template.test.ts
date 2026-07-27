/**
 * Materialising a blueprint must produce ORDINARY PaperSections — that's what
 * lets a written paper reuse the whole MCQ membership/ordering/snapshot path.
 */
import { describe, it, expect } from "vitest";
import {
  blueprintToTemplate,
  blueprintToMeta,
  sectionMarks,
  templateTotalMarks,
  isWrittenPaper,
  slotToSection,
} from "@/lib/papers/written/template";
import { getBlueprintById } from "@/lib/papers/written/registry";
import { sectionProgress } from "@/lib/papers/sections";

const ANNUAL = getBlueprintById("mh-ssc-10-maths-annual-40")!;

describe("slotToSection", () => {
  it("maps the printed count onto targetCount and carries the slot fields", () => {
    const s = slotToSection({
      key: "q2b",
      code: "Q.2 (B)",
      label: "Solve the following subquestions",
      instruction: "Attempt any FOUR of the following",
      print: 5,
      attempt: 4,
      marksEach: 2,
      format: "subjective",
    });
    expect(s.key).toBe("q2b");
    expect(s.targetCount).toBe(5); // printed
    expect(s.attempt).toBe(4); // answered
    expect(s.marksEach).toBe(2);
    expect(s.code).toBe("Q.2 (B)");
  });
});

describe("blueprintToTemplate", () => {
  it("produces one section per slot, in order, with keys preserved", () => {
    const t = blueprintToTemplate(ANNUAL);
    expect(t).toHaveLength(ANNUAL.slots.length);
    expect(t.map((s) => s.key)).toEqual(ANNUAL.slots.map((s) => s.key));
  });

  it("totals to the blueprint's max marks", () => {
    expect(templateTotalMarks(blueprintToTemplate(ANNUAL))).toBe(40);
  });

  it("is consumable by the EXISTING sectionProgress helper (shared machinery)", () => {
    const t = blueprintToTemplate(ANNUAL);
    // 4 of the 5 printed Q.2(B) questions picked so far.
    const progress = sectionProgress(t, { q2b: 4 });
    const q2b = progress.sections.find((s) => s.key === "q2b");
    expect(q2b?.count).toBe(4);
    expect(q2b?.target).toBe(5); // progress tracks the PRINTED count
    expect(progress.unassigned).toBe(0);
  });
});

describe("sectionMarks", () => {
  it("is attempt x marksEach", () => {
    expect(sectionMarks({ key: "k", label: "l", targetCount: 5, attempt: 4, marksEach: 2 })).toBe(8);
  });

  it("falls back to targetCount when attempt is not set (half-built custom slot)", () => {
    expect(sectionMarks({ key: "k", label: "l", targetCount: 3, marksEach: 2 })).toBe(6);
  });

  it("is 0 for an MCQ-mode section that carries no marks", () => {
    expect(sectionMarks({ key: "english", label: "English", targetCount: 50 })).toBe(0);
  });
});

describe("blueprintToMeta", () => {
  it("stamps the written discriminator and the header fields", () => {
    const meta = blueprintToMeta(ANNUAL, "Algebra", "LWS Pune");
    expect(meta.kind).toBe("written");
    expect(meta.subject).toBe("Algebra");
    expect(meta.std).toBe(10);
    expect(meta.maxMarks).toBe(40);
    expect(meta.durationMins).toBe(120);
    expect(meta.blueprintId).toBe(ANNUAL.id);
    expect(meta.schoolName).toBe("LWS Pune");
    expect(meta.instructions?.length).toBeGreaterThan(0);
  });
});

describe("isWrittenPaper", () => {
  it("reads the explicit discriminator", () => {
    expect(isWrittenPaper({ kind: "written" })).toBe(true);
    expect(isWrittenPaper({ kind: "mcq" })).toBe(false);
  });

  it("treats a paper with no meta as MCQ — every pre-existing paper stays MCQ", () => {
    expect(isWrittenPaper(null)).toBe(false);
    expect(isWrittenPaper(undefined)).toBe(false);
  });
});
