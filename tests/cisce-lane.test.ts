import { describe, it, expect } from "vitest";
import { CISCE_EXAMS, cisceExam, dataDir, sourceForYear } from "../scripts/cisce-pyq/exams";
import { patternFor, effectiveMarks, transcribedMarks, sectionForQuestion } from "../scripts/cisce-pyq/pattern";
import { paperIssues, sourceFileFor, pyqNoteFor, type CiscePaper } from "../scripts/cisce-pyq/lib";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

/**
 * The shared CISCE lane: one set of scripts for ISC Class 12 and ICSE Class 10,
 * each exam a profile in exams.ts. The ISC-only specs (isc-12-*.test.ts) still
 * hold; this file pins what the generalisation added.
 */

describe("exam profiles", () => {
  it("holds exactly ISC 12 and ICSE 10", () => {
    expect(Object.keys(CISCE_EXAMS).sort()).toEqual(["icse-10", "isc-12"]);
  });

  it("finds a profile by slug or by its exams-row name, and throws otherwise", () => {
    expect(cisceExam("icse-10").examName).toBe("ICSE Class 10");
    expect(cisceExam("ISC Class 12").slug).toBe("isc-12");
    expect(() => cisceExam("ICSE Class 9")).toThrow(/no CISCE exam/);
  });

  it("keeps each exam's files in its own data folder", () => {
    expect(dataDir(cisceExam("icse-10"))).toMatch(/cisce-pyq[\\/]data[\\/]icse-10$/);
    expect(dataDir(cisceExam("isc-12"))).toMatch(/cisce-pyq[\\/]data[\\/]isc-12$/);
  });

  it("records 2025 as keyed and 2026 as not, for both exams", () => {
    for (const slug of ["isc-12", "icse-10"] as const) {
      expect(sourceForYear(cisceExam(slug), 2025).keyed).toBe(true);
      expect(sourceForYear(cisceExam(slug), 2026).keyed).toBe(false);
      expect(() => sourceForYear(cisceExam(slug), 2024)).toThrow(/no source document/);
    }
  });

  it("names exams that the site registry knows, exactly", () => {
    for (const exam of Object.values(CISCE_EXAMS)) {
      // icse-10 joins the registry when its rows go PUBLIC; until then only ISC can be checked.
      const entry = EXAM_REGISTRY.find((e) => (e.slug as string) === exam.slug);
      if (!entry) continue;
      expect(entry.examName).toBe(exam.examName);
    }
  });
});

describe("ICSE 10 in the site registry", () => {
  it("is registered as CISCE Class 10, school tier, mixed formats, and NOT a /board reader exam", () => {
    // Live 2026-10-30: 353 rows PUBLIC, 120 MCQ against 233 written (measured).
    const entry = EXAM_REGISTRY.find((e) => (e.slug as string) === "icse-10");
    expect(entry).toBeDefined();
    expect(entry!.examName).toBe("ICSE Class 10");
    expect(entry!.tier).toBe("school");
    expect(entry!.board).toBe("CISCE");
    expect(entry!.std).toBe(10);
    expect(entry!.mixedFormats).toBe(true);
    // Papers only, no textbook layer: boardExam tracks a TEXTBOOK corpus.
    expect(entry!.boardExam).toBeUndefined();
    expect(entry!.practiceOnly).toBeUndefined();
    expect(entry!.noPublicContent).toBeUndefined();
  });
});

describe("ICSE 10 taxonomy", () => {
  const icse = cisceExam("icse-10");

  it("covers Mathematics and the three Science papers", () => {
    expect([...icse.subjects]).toEqual(["Mathematics", "Physics", "Chemistry", "Biology"]);
    expect(Object.keys(icse.taxonomy).sort()).toEqual(["Biology", "Chemistry", "Mathematics", "Physics"]);
  });

  it("gives every chapter at least one subtopic, and no chapter name twice in a subject", () => {
    for (const subject of icse.subjects) {
      const names = icse.taxonomy[subject].map((c) => c.name);
      expect(new Set(names).size).toBe(names.length);
      for (const name of names) expect(icse.subtopics[name]?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("marks the topics the 2027 syllabus dropped but the 2025-26 papers still examine", () => {
    const maths = icse.taxonomy.Mathematics.map((c) => [c.name, c.syllabusRef]);
    expect(maths).toContainEqual(["Shares and Dividend", "pre-2027"]);
  });

  it("has no subtopic listed for a chapter that does not exist", () => {
    const chapters = new Set(icse.subjects.flatMap((s) => icse.taxonomy[s].map((c) => c.name)));
    const isc = cisceExam("isc-12");
    const iscChapters = new Set(isc.subjects.flatMap((s) => isc.taxonomy[s].map((c) => c.name)));
    for (const name of Object.keys(icse.subtopics)) expect(chapters.has(name) || iscChapters.has(name)).toBe(true);
  });
});

describe("ICSE paper shapes", () => {
  it("is 80 marks: Section A 40 compulsory, Section B any four of the rest", () => {
    for (const [subject, firstB, lastB] of [
      ["Mathematics", 4, 10],
      ["Physics", 4, 9],
      ["Chemistry", 3, 8],
      ["Biology", 3, 8],
    ] as const) {
      for (const year of [2025, 2026]) {
        const p = patternFor("icse-10", subject, year);
        expect(effectiveMarks(p)).toBe(80);
        expect(sectionForQuestion(p, firstB - 1)).toBe("A");
        expect(sectionForQuestion(p, firstB)).toBe("B");
        expect(sectionForQuestion(p, lastB)).toBe("B");
        expect(() => sectionForQuestion(p, lastB + 1)).toThrow();
      }
    }
  });

  it("expects every Section B question transcribed: 7 x 10 for Maths, not the 40 a candidate sits", () => {
    const b = patternFor("icse-10", "Mathematics", 2026).sections.find((s) => s.id === "B")!;
    expect(b.marks).toBe(40);
    expect(transcribedMarks(b)).toBe(70);
    const a = patternFor("icse-10", "Mathematics", 2026).sections.find((s) => s.id === "A")!;
    expect(transcribedMarks(a)).toBe(40);
  });

  it("still knows ISC's shapes", () => {
    expect(effectiveMarks(patternFor("isc-12", "Mathematics", 2025))).toBe(80);
    expect(effectiveMarks(patternFor("isc-12", "Physics", 2026))).toBe(70);
  });

  it("throws for a subject an exam does not have", () => {
    expect(() => patternFor("isc-12", "Biology", 2025)).toThrow();
  });
});

describe("exam-aware paper checks", () => {
  const icsePaper = (chapter: string, subtopic: string): CiscePaper => ({
    exam: "ICSE Class 10",
    subject: "Physics",
    year: 2026,
    paperCode: "521",
    source: "test",
    rows: [
      {
        ref: "1(i)", questionNumber: "1(i)", section: "A", marks: 1, format: "mcq",
        chapter, subtopic, text: "Pick one.", options: ["a", "b", "c", "d"],
      },
    ],
  });

  it("reads an ICSE paper against the ICSE taxonomy", () => {
    expect(paperIssues(icsePaper("Machines", "Pulleys"))).toEqual([]);
  });

  it("rejects an ISC chapter on an ICSE paper", () => {
    expect(paperIssues(icsePaper("Alternating Current", "Transformers")).join("\n")).toMatch(/not in the ICSE Class 10 Physics taxonomy/);
  });
});

describe("provenance per exam", () => {
  it("keeps ISC's source_file names unchanged and gives ICSE its own", () => {
    expect(sourceFileFor(cisceExam("isc-12"), 2025, "Physics")).toBe("isc-12-pyq-2025-physics");
    expect(sourceFileFor(cisceExam("icse-10"), 2026, "Biology")).toBe("icse-10-pyq-2026-biology");
  });

  it("names the right certificate and says plainly whether CISCE's key checked the answers", () => {
    const keyed = pyqNoteFor(cisceExam("icse-10"), 2025, "Biology", "523");
    expect(keyed).toMatch(/^ICSE Class 10 Biology \(523\) board examination 2025/);
    expect(keyed).toMatch(/cross-checked against CISCE/);
    expect(pyqNoteFor(cisceExam("icse-10"), 2026, "Physics", "521")).toMatch(/not yet published/);
    expect(pyqNoteFor(cisceExam("isc-12"), 2025, "Mathematics", "860")).toMatch(/^ISC Class 12 Mathematics \(860\)/);
  });
});
