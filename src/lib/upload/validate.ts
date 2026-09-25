import { contentHash } from "./hash";

export type RawRow = {
  sourceRow: number;
  questionNumber?: string;
  setLabel?: string;
  subject: string;
  chapter: string;
  subtopic?: string;
  context?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  difficulty: string;
  solution?: string;
  /**
   * The question was officially CANCELLED (the exam body's final key awards no
   * option). Required with Answer = "CANCELLED", refused otherwise — a question
   * without a key must carry the reason it has none (migration 0119).
   */
  cancelledNote?: string;
};

export type Difficulty = "EASY" | "MODERATE" | "HARD";
export type OptionLabel = "A" | "B" | "C" | "D";

export type ParsedRowPayload = {
  sourceRow: number;
  questionNumber?: string;
  setLabel?: string;
  subjectName: string;
  chapterName: string;
  subtopicName?: string;
  context?: string;
  text: string;
  difficulty: Difficulty;
  solution?: string;
  /** 'mcq' (default) has the 4 options below; 'subjective' has an empty options
   *  array and its model answer in `solution` (migration 0041); 'numeric' (NAT)
   *  has an empty options array and its exact answer in `numericAnswer`
   *  (migration 0061). */
  questionFormat?: "mcq" | "subjective" | "numeric";
  /** The single correct value for a 'numeric' (NAT) question; ignored otherwise. */
  numericAnswer?: number;
  options: { label: OptionLabel; text: string; isCorrect: boolean }[];
  contentHash: string;
  /** Set only for an officially cancelled question — every option is then incorrect. */
  cancelledNote?: string;
};

export type ValidatedRow = {
  sourceRow: number;
  raw: RawRow;
  errors: string[];
  parsed?: ParsedRowPayload;
};

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  easy: "EASY",
  moderate: "MODERATE",
  hard: "HARD",
};

export function validateRow(row: RawRow): ValidatedRow {
  const errors: string[] = [];

  if (!row.subject) errors.push("Subject is required");
  if (!row.chapter) errors.push("Chapter is required");
  if (!row.question) errors.push("Question is required");
  if (!row.optionA) errors.push("OptionA is required");
  if (!row.optionB) errors.push("OptionB is required");
  if (!row.optionC) errors.push("OptionC is required");
  if (!row.optionD) errors.push("OptionD is required");

  let answer: OptionLabel | "CANCELLED" | undefined;
  const note = row.cancelledNote?.trim() || undefined;
  if (!row.answer) {
    errors.push("Answer is required");
  } else if (row.answer.trim().toUpperCase() === "CANCELLED") {
    if (note) answer = "CANCELLED";
    else errors.push("A CANCELLED question needs a cancelledNote explaining it");
  } else {
    const ans = row.answer.trim().toUpperCase();
    if (note) {
      errors.push("cancelledNote is only allowed with Answer = CANCELLED");
    } else if (!["A", "B", "C", "D"].includes(ans)) {
      errors.push(`Answer must be A/B/C/D (got "${row.answer}")`);
    } else {
      answer = ans as OptionLabel;
    }
  }

  let difficulty: Difficulty | undefined;
  if (!row.difficulty) {
    errors.push("Difficulty is required");
  } else {
    const d = DIFFICULTY_MAP[row.difficulty.trim().toLowerCase()];
    if (!d) {
      errors.push(
        `Difficulty must be Easy / Moderate / Hard (got "${row.difficulty}")`
      );
    } else {
      difficulty = d;
    }
  }

  if (errors.length > 0 || !answer || !difficulty) {
    return { sourceRow: row.sourceRow, raw: row, errors };
  }

  const options: ParsedRowPayload["options"] = [
    { label: "A", text: row.optionA, isCorrect: answer === "A" },
    { label: "B", text: row.optionB, isCorrect: answer === "B" },
    { label: "C", text: row.optionC, isCorrect: answer === "C" },
    { label: "D", text: row.optionD, isCorrect: answer === "D" },
  ];

  const hash = contentHash(
    row.question,
    [row.optionA, row.optionB, row.optionC, row.optionD],
    answer
  );

  return {
    sourceRow: row.sourceRow,
    raw: row,
    errors: [],
    parsed: {
      sourceRow: row.sourceRow,
      questionNumber: row.questionNumber,
      setLabel: row.setLabel,
      subjectName: row.subject,
      chapterName: row.chapter,
      subtopicName: row.subtopic,
      context: row.context,
      text: row.question,
      difficulty,
      solution: row.solution,
      options,
      contentHash: hash,
      ...(answer === "CANCELLED" ? { cancelledNote: note } : {}),
    },
  };
}
