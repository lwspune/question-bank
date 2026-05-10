export type Difficulty = "EASY" | "MODERATE" | "HARD";
export type OptionLabel = "A" | "B" | "C" | "D";
export type Visibility = "PUBLIC" | "PRIVATE";

export type ExistingOption = {
  label: OptionLabel;
  text: string;
  imageUrl: string | null;
  isCorrect: boolean;
};

export type ExistingQuestion = {
  text: string;
  context: string | null;
  difficulty: Difficulty;
  solution: string | null;
  imageUrl: string | null;
  subjectId: string;
  chapterId: string;
  subtopicId: string | null;
  visibility: Visibility;
  options: ExistingOption[];
};

export type QuestionFormState = {
  text: string;
  context: string;
  difficulty: Difficulty;
  solution: string;
  imagePath: string | null;
  subjectId: string;
  chapterId: string;
  subtopicId: string | null;
  visibility: Visibility;
  correct: OptionLabel;
  optionTexts: Record<OptionLabel, string>;
  optionImages: Record<OptionLabel, string | null>;
};

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];

export function toFormState(q: ExistingQuestion): QuestionFormState {
  const optionTexts = { A: "", B: "", C: "", D: "" } as Record<
    OptionLabel,
    string
  >;
  const optionImages = { A: null, B: null, C: null, D: null } as Record<
    OptionLabel,
    string | null
  >;
  for (const o of q.options) {
    optionTexts[o.label] = o.text;
    optionImages[o.label] = o.imageUrl;
  }
  return {
    text: q.text,
    context: q.context ?? "",
    difficulty: q.difficulty,
    solution: q.solution ?? "",
    imagePath: q.imageUrl,
    subjectId: q.subjectId,
    chapterId: q.chapterId,
    subtopicId: q.subtopicId,
    visibility: q.visibility,
    correct:
      (q.options.find((o) => o.isCorrect)?.label as OptionLabel) ?? "A",
    optionTexts,
    optionImages,
  };
}

export function isQuestionDirty(
  initial: ExistingQuestion,
  current: QuestionFormState
): boolean {
  const baseline = toFormState(initial);
  if (
    baseline.text !== current.text ||
    baseline.context !== current.context ||
    baseline.difficulty !== current.difficulty ||
    baseline.solution !== current.solution ||
    baseline.imagePath !== current.imagePath ||
    baseline.subjectId !== current.subjectId ||
    baseline.chapterId !== current.chapterId ||
    baseline.subtopicId !== current.subtopicId ||
    baseline.visibility !== current.visibility ||
    baseline.correct !== current.correct
  ) {
    return true;
  }
  for (const label of LABELS) {
    if (baseline.optionTexts[label] !== current.optionTexts[label]) return true;
    if (baseline.optionImages[label] !== current.optionImages[label])
      return true;
  }
  return false;
}
