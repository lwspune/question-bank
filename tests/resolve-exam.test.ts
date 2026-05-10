import { describe, expect, it } from "vitest";
import { resolveExam } from "@/lib/upload/resolveExam";
import type { CourseDetection } from "@/lib/upload/detectCourse";

const knownExams = [
  { id: "id-mht", name: "MHT-CET" },
  { id: "id-nda", name: "NDA" },
];

describe("resolveExam", () => {
  describe("when the file's course column is missing (none)", () => {
    const detection: CourseDetection = { kind: "none" };

    it("uses the form's examId when provided", () => {
      const result = resolveExam(detection, "id-nda", knownExams);
      expect(result).toEqual({
        ok: true,
        examId: "id-nda",
        examName: "NDA",
        source: "form",
      });
    });

    it("errors when no examId is provided", () => {
      const result = resolveExam(detection, null, knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/select an exam/i);
      }
    });

    it("errors when the form's examId is unknown", () => {
      const result = resolveExam(detection, "id-bogus", knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/unknown exam/i);
      }
    });
  });

  describe("when rows have multiple course values (mixed)", () => {
    it("rejects regardless of form examId", () => {
      const detection: CourseDetection = {
        kind: "mixed",
        values: ["NDA", "MHT-CET"],
      };
      const result = resolveExam(detection, "id-nda", knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/multiple course values/i);
        expect(result.error).toContain("NDA");
        expect(result.error).toContain("MHT-CET");
      }
    });
  });

  describe("when the file has a uniform course value", () => {
    it("matches the course to a known exam (case-insensitive) and uses it", () => {
      const detection: CourseDetection = { kind: "uniform", value: "nda" };
      const result = resolveExam(detection, null, knownExams);
      expect(result).toEqual({
        ok: true,
        examId: "id-nda",
        examName: "NDA",
        source: "file",
      });
    });

    it("matches with whitespace tolerance", () => {
      const detection: CourseDetection = { kind: "uniform", value: " NDA " };
      const result = resolveExam(detection, null, knownExams);
      expect(result.ok).toBe(true);
      if (result.ok) expect(result.examId).toBe("id-nda");
    });

    it("succeeds when the form's examId agrees with the detected course", () => {
      const detection: CourseDetection = { kind: "uniform", value: "NDA" };
      const result = resolveExam(detection, "id-nda", knownExams);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.examId).toBe("id-nda");
        expect(result.source).toBe("file");
      }
    });

    it("rejects when the form's examId disagrees with the detected course", () => {
      const detection: CourseDetection = { kind: "uniform", value: "NDA" };
      const result = resolveExam(detection, "id-mht", knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/file says/i);
        expect(result.error).toContain("NDA");
        expect(result.error).toContain("MHT-CET");
      }
    });

    it("rejects when the detected course is not a known exam", () => {
      const detection: CourseDetection = { kind: "uniform", value: "JEE Main" };
      const result = resolveExam(detection, null, knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/not recognized/i);
        expect(result.error).toContain("JEE Main");
        // Surfaces available exams to help the user fix the file.
        expect(result.error).toContain("MHT-CET");
        expect(result.error).toContain("NDA");
      }
    });

    it("rejects when the detected course is not known, even if form examId is set", () => {
      const detection: CourseDetection = { kind: "uniform", value: "JEE Main" };
      const result = resolveExam(detection, "id-mht", knownExams);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/not recognized/i);
      }
    });
  });
});
