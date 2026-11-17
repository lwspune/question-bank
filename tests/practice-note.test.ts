import { describe, expect, it } from "vitest";
import { practiceNoteFromSourceFile } from "../scripts/practice/lib";

// 2026-11-17: every bulk NDA Maths practice PDF was stamped "Algebra / Sequence & Series"
// whatever its chapter (2,956 rows). The note now comes from the file name.
describe("practiceNoteFromSourceFile", () => {
  it("names the area and chapter the file name encodes", () => {
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__Algebra__Sequence_and_Series.pdf")).toBe(
      "NDA Maths practice — Algebra / Sequence & Series"
    );
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__Calculus__Limits_and_Continuity.pdf")).toBe(
      "NDA Maths practice — Calculus / Limits & Continuity"
    );
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__Trigonometry__Height_and_Distance.pdf")).toBe(
      "NDA Maths practice — Trigonometry / Height & Distance"
    );
  });

  it("spells out the 2D and 3D geometry areas", () => {
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__2D__Circles.pdf")).toBe(
      "NDA Maths practice — 2D Geometry / Circles"
    );
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__3D__Vectors.pdf")).toBe(
      "NDA Maths practice — 3D Geometry / Vectors"
    );
    expect(practiceNoteFromSourceFile("NDA_Maths_Practice__3D__3D_Geometry.pdf")).toBe(
      "NDA Maths practice — 3D Geometry / 3D Geometry"
    );
  });

  it("returns null for a file name it cannot read, so the caller must supply a note", () => {
    expect(practiceNoteFromSourceFile("NDA_Geography_Practice__Atmosphere_Test_P1.pdf")).toBeNull();
    expect(practiceNoteFromSourceFile("Matrices Test.pdf")).toBeNull();
  });
});

describe("every configured practice topic has a note", () => {
  it("either carries `note` or has a file name the note can be read from", async () => {
    const { TOPICS } = await import("../scripts/practice/config");
    const missing = Object.entries(TOPICS)
      .filter(([, t]) => !t.note && !practiceNoteFromSourceFile(t.sourceFile))
      .map(([id]) => id);
    expect(missing).toEqual([]);
  });
});
