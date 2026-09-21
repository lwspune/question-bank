import type { ChapterNote } from "@/app/notes/_types";

export const MATHEMATICAL_LOGIC_CHAPTER: ChapterNote = {
  chapterName: "Mathematical Logic",
  title: "Mathematical Logic — MHT-CET Maths",
  intro:
    "Mathematical Logic is the most self-contained chapter in MHT-CET Maths: 88 PYQs across 2021–2025, and almost all of it is machinery you " +
    "build from scratch here rather than carry in from other chapters — which makes it the fastest chapter to bank from a cold start. " +
    "The one exception is real and sits in the very first block: a MHT-CET stem will sometimes make p and q into claims about cube roots of unity, " +
    "direction cosines or matrix algebra, and then the logic is trivial while the marks turn entirely on settling those claims. That single concept " +
    "is what makes the opening subtopic 38% HARD; the rest of the chapter genuinely stands alone. " +
    "It is also the one chapter with its own execution mode — roughly 70% of its stems hand you four claims to adjudicate rather than a problem to solve. " +
    "Its 31% HARD is badly distributed, and knowing where the difficulty actually sits is worth more than any single formula here: " +
    "Switching Circuits is 12 q at 67% HARD while Negation is 14 q at 14%, so the smallest subtopic is the expensive one and the " +
    "block that looks fiddliest is the cheapest. If you are short of time, drill Negation and Finding Truth Values first — 30 questions at " +
    "14% and 19% HARD — and leave Switching Circuits until Logical Equivalence and Algebra of Statements is solid, because it depends on it. " +
    "Work the six subtopics below in order — each genuinely rests on the one before. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  cardBlurb:
    "The most self-contained chapter in MHT-CET Maths, taught from statements and truth tables through negation, equivalence and switching circuits.",
  subtopicOrder: [
    "statements-connectives-truth-tables",
    "finding-truth-values",
    "negation-and-quantifiers",
    "converse-inverse-contrapositive",
    "logical-equivalence-algebra",
    "switching-circuits",
  ],
};
