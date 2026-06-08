/**
 * NDA Probability — Daily Quiz 1: Classical Probability & Counting.
 *
 * 15 Level-1 recall MCQs harvested from the /notes chapter
 * (src/app/notes/nda-maths/probability/_data/classical-probability-counting.ts):
 * formula-recall + trap-derived conceptual checks + practiceSet computations.
 * Distractors taken from the notes' own traps where possible (e.g. Q4 "21", Q10
 * "3/2"). Math is LaTeX — nda-tracker's <Math> renderer handles \( ... \).
 *
 * Stable id ⇒ re-pushing UPDATES the draft in nda-tracker rather than duplicating.
 * Marking defaults to +1 / 0 (low-stakes daily habit); adjust in the editor before
 * publishing if you want negative marking.
 */
import type { DraftQuiz } from "../../src/lib/quiz/quizPayload";

const COMMON = { chapter: "Probability", subtopic: "Probability via Counting", difficulty: "Easy" };

export const CLASSICAL_PROBABILITY_QUIZ: DraftQuiz = {
  id: "nda-prob-classical-1",
  title: "NDA Probability — Classical Probability & Counting (Daily 1)",
  subject: "Maths",
  marking: { correct: 1, wrong: 0 },
  questions: [
    {
      q: 1,
      question: "For equally likely outcomes, the classical probability of an event \\(E\\) is:",
      optionA: "\\(n(E) \\times n(S)\\)",
      optionB: "\\(\\dfrac{n(E)}{n(S)}\\)",
      optionC: "\\(\\dfrac{n(S)}{n(E)}\\)",
      optionD: "\\(n(E) - n(S)\\)",
      answer: "B",
      ...COMMON,
    },
    {
      q: 2,
      question: "A card is drawn from a well-shuffled deck of 52. What is \\(P(\\text{it is an ace})\\)?",
      optionA: "\\(\\dfrac{1}{52}\\)",
      optionB: "\\(\\dfrac{1}{4}\\)",
      optionC: "\\(\\dfrac{1}{13}\\)",
      optionD: "\\(\\dfrac{4}{13}\\)",
      answer: "C",
      ...COMMON,
    },
    {
      q: 3,
      question: "The formula \\(P = \\dfrac{n(E)}{n(S)}\\) is valid only when:",
      optionA: "all outcomes are equally likely",
      optionB: "the sample space is infinite",
      optionC: "the events are independent",
      optionD: "there are exactly two outcomes",
      answer: "A",
      ...COMMON,
    },
    {
      q: 4,
      question: "Two fair dice are thrown. The number of outcomes in the sample space is:",
      optionA: "\\(12\\)",
      optionB: "\\(21\\)",
      optionC: "\\(36\\)",
      optionD: "\\(6\\)",
      answer: "C",
      ...COMMON,
    },
    {
      q: 5,
      question: "Two fair dice are thrown. What is \\(P(\\text{sum} = 7)\\)?",
      optionA: "\\(\\dfrac{1}{6}\\)",
      optionB: "\\(\\dfrac{1}{12}\\)",
      optionC: "\\(\\dfrac{1}{9}\\)",
      optionD: "\\(\\dfrac{1}{2}\\)",
      answer: "A",
      ...COMMON,
    },
    {
      q: 6,
      question: "When two dice are thrown, the results \\((2,3)\\) and \\((3,2)\\) are:",
      optionA: "the same outcome",
      optionB: "impossible",
      optionC: "counted as one outcome",
      optionD: "two different outcomes",
      answer: "D",
      ...COMMON,
    },
    {
      q: 7,
      question: "A fair coin is tossed \\(n\\) times. The number of possible outcomes is:",
      optionA: "\\(2n\\)",
      optionB: "\\(2^{n}\\)",
      optionC: "\\(n^{2}\\)",
      optionD: "\\(n!\\)",
      answer: "B",
      ...COMMON,
    },
    {
      q: 8,
      question: "A fair coin is tossed 3 times. What is \\(P(\\text{all three heads})\\)?",
      optionA: "\\(\\dfrac{1}{2}\\)",
      optionB: "\\(\\dfrac{3}{8}\\)",
      optionC: "\\(\\dfrac{1}{8}\\)",
      optionD: "\\(\\dfrac{1}{6}\\)",
      answer: "C",
      ...COMMON,
    },
    {
      q: 9,
      question: "For any event \\(E\\), the complement probability \\(P(E')\\) equals:",
      optionA: "\\(1 - P(E)\\)",
      optionB: "\\(1 + P(E)\\)",
      optionC: "\\(P(E) - 1\\)",
      optionD: "\\(\\dfrac{1}{P(E)}\\)",
      answer: "A",
      ...COMMON,
    },
    {
      q: 10,
      question: "If the odds in favour of an event are \\(3 : 2\\), its probability is:",
      optionA: "\\(\\dfrac{3}{2}\\)",
      optionB: "\\(\\dfrac{2}{5}\\)",
      optionC: "\\(\\dfrac{2}{3}\\)",
      optionD: "\\(\\dfrac{3}{5}\\)",
      answer: "D",
      ...COMMON,
    },
    {
      q: 11,
      question: "The fastest way to find \\(P(\\text{at least one head in several tosses})\\) is:",
      optionA: "add the probabilities of each toss",
      optionB: "\\(1 - P(\\text{no heads})\\)",
      optionC: "multiply the number of heads",
      optionD: "\\(P(\\text{exactly one head})\\)",
      answer: "B",
      ...COMMON,
    },
    {
      q: 12,
      question: "The value of \\(\\binom{5}{2}\\) (ways to choose 2 from 5) is:",
      optionA: "\\(5\\)",
      optionB: "\\(20\\)",
      optionC: "\\(10\\)",
      optionD: "\\(25\\)",
      answer: "C",
      ...COMMON,
    },
    {
      q: 13,
      question: "Five people sit in a row at random. What is \\(P(\\text{two particular people sit together})\\)?",
      optionA: "\\(\\dfrac{1}{5}\\)",
      optionB: "\\(\\dfrac{2}{5}\\)",
      optionC: "\\(\\dfrac{1}{2}\\)",
      optionD: "\\(\\dfrac{2}{120}\\)",
      answer: "B",
      ...COMMON,
    },
    {
      q: 14,
      question: "A number is chosen at random from 1 to 20. What is \\(P(\\text{it is a multiple of 5})\\)?",
      optionA: "\\(\\dfrac{1}{4}\\)",
      optionB: "\\(\\dfrac{4}{5}\\)",
      optionC: "\\(\\dfrac{1}{10}\\)",
      optionD: "\\(\\dfrac{1}{5}\\)",
      answer: "D",
      ...COMMON,
    },
    {
      q: 15,
      question: "A point is chosen at random on a rod of length 10. What is \\(P(\\text{it lies in the first 2 units})\\)?",
      optionA: "\\(\\dfrac{1}{5}\\)",
      optionB: "\\(\\dfrac{1}{2}\\)",
      optionC: "\\(\\dfrac{1}{10}\\)",
      optionD: "\\(\\dfrac{4}{5}\\)",
      answer: "A",
      ...COMMON,
    },
  ],
};
