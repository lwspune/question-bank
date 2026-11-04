import { contentHash, msqContentHash } from "./hash";

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
  /**
   * "msq": a multiple-select question (migration 0214). Its Answer lists ONE OR MORE letters
   * ("A, C"); every listed option is marked correct. Absent = an ordinary single-answer MCQ.
   */
  questionFormat?: "msq";
};

export type Difficulty = "EASY" | "MODERATE" | "HARD";
/** The four labels the Excel template (validateRow below) produces. */
export type OptionLabel = "A" | "B" | "C" | "D";
/** Every label the bank stores. "E" since migration 0140: IMAT prints five
 *  options. Only script pipelines emit an E; the Excel template never does. */
export type StoredOptionLabel = OptionLabel | "E";

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
  questionFormat?: "mcq" | "subjective" | "numeric" | "msq";
  /** The single correct value for a 'numeric' (NAT) question; ignored otherwise. */
  numericAnswer?: number;
  /** Top of an accepted range for a 'numeric' question; `numericAnswer` is then the bottom (0214). */
  numericAnswerMax?: number;
  options: { label: StoredOptionLabel; text: string; isCorrect: boolean }[];
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
  let correctSet: OptionLabel[] | undefined;
  const msq = row.questionFormat === "msq";
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
    } else if (msq) {
      const letters = ans.split(/[\s,]+/).filter(Boolean);
      if (letters.length === 0 || letters.some((l) => !["A", "B", "C", "D"].includes(l))) {
        errors.push(`Answer must list one or more of A/B/C/D (got "${row.answer}")`);
      } else if (new Set(letters).size !== letters.length) {
        errors.push(`Answer lists a letter twice (got "${row.answer}")`);
      } else {
        correctSet = (letters as OptionLabel[]).sort();
        answer = correctSet[0];
      }
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

  const correct = (l: OptionLabel) => (correctSet ? correctSet.includes(l) : answer === l);
  const options: ParsedRowPayload["options"] = [
    { label: "A", text: row.optionA, isCorrect: correct("A") },
    { label: "B", text: row.optionB, isCorrect: correct("B") },
    { label: "C", text: row.optionC, isCorrect: correct("C") },
    { label: "D", text: row.optionD, isCorrect: correct("D") },
  ];

  const optionTexts = [row.optionA, row.optionB, row.optionC, row.optionD];
  const hash = msq
    ? msqContentHash(row.question, optionTexts, correctSet ?? [answer])
    : contentHash(row.question, optionTexts, answer);

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
      ...(msq ? { questionFormat: "msq" as const } : {}),
      ...(answer === "CANCELLED" ? { cancelledNote: note } : {}),
    },
  };
}
