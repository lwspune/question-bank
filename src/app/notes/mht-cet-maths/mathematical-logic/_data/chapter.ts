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
    "14% and 19% HARD — and leave Switching Circuits until the algebra in block 5 is solid, because it depends on it. " +
    "The chapter teaches in six movements, and each genuinely rests on the one before: " +
    "(1) Statements, Connectives and Truth Tables — what counts as a statement, the five connectives, vacuous truth, building the table, and " +
    "the four readings of its last column (tautology, contradiction, contingency, and logical equivalence) that every later block uses; " +
    "(2) Finding Truth Values of Component Statements — the signature MHT-CET move run backwards, where you are told the pattern is false and asked for p, q and r; " +
    "(3) Negation of Statements and Quantifiers — De Morgan, negating a conditional and a biconditional, and flipping quantifiers; " +
    "(4) Converse, Inverse and Contrapositive — the three relatives of a conditional, only one of which is equivalent to it; " +
    "(5) Logical Equivalence and Algebra of Statements — the simplification laws that reach those verdicts without writing the table out, plus duals; " +
    "(6) Switching Circuits — series is AND, parallel is OR, and everything you already know applies. " +
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
