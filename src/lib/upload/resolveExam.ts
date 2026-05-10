import type { CourseDetection } from "./detectCourse";

export type KnownExam = { id: string; name: string };

export type ResolveResult =
  | {
      ok: true;
      examId: string;
      examName: string;
      source: "file" | "form";
    }
  | { ok: false; error: string };

export function resolveExam(
  detection: CourseDetection,
  formExamId: string | null,
  knownExams: KnownExam[]
): ResolveResult {
  if (detection.kind === "mixed") {
    return {
      ok: false,
      error: `Excel has multiple Course values: ${detection.values.join(", ")}. One file = one exam.`,
    };
  }

  const findById = (id: string) => knownExams.find((e) => e.id === id);
  const findByName = (name: string) => {
    const key = name.trim().toLowerCase();
    return knownExams.find((e) => e.name.toLowerCase() === key);
  };

  if (detection.kind === "uniform") {
    const matched = findByName(detection.value);
    if (!matched) {
      const available = knownExams.map((e) => e.name).join(", ");
      return {
        ok: false,
        error: `Course "${detection.value}" in your Excel is not recognized. Available exams: ${available}.`,
      };
    }
    if (formExamId && formExamId !== matched.id) {
      const formed = findById(formExamId);
      const formedName = formed?.name ?? formExamId;
      return {
        ok: false,
        error: `Excel file says "${matched.name}" but you selected "${formedName}". Pick one.`,
      };
    }
    return {
      ok: true,
      examId: matched.id,
      examName: matched.name,
      source: "file",
    };
  }

  // detection.kind === "none"
  if (!formExamId) {
    return {
      ok: false,
      error:
        "Please select an exam (your Excel has no Course column to detect from).",
    };
  }
  const matched = findById(formExamId);
  if (!matched) {
    return { ok: false, error: `Unknown exam: ${formExamId}.` };
  }
  return {
    ok: true,
    examId: matched.id,
    examName: matched.name,
    source: "form",
  };
}
