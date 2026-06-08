/**
 * TEMPLATE — copy this file to scripts/quiz/daily/<slug>.ts to author a daily quiz.
 *
 * Workflow:
 *   1. Copy → rename. Set a STABLE, unique `slug` (e.g. "nda-prob-classical-2").
 *      The slug maps to a deterministic UUID, so re-pushing UPDATES the same draft.
 *   2. Fill ~15 questions. For each, prefer the {correct, distractors} form —
 *      you write the right answer + three wrong ones in any order, and the helper
 *      places A–D + marks the answer for you. Pull distractors from the concept's
 *      /notes `traps` where possible (the misconception IS an exam-grade wrong option).
 *   3. Set `concept` on every question to the /notes conceptSlug it came from
 *      (provenance — it rides into nda-tracker for analytics). Math is \(...\) LaTeX.
 *   4. Push it:  npm run quiz:push -- daily/<slug>
 *      It lands as a DRAFT. Open nda-tracker → Daily Quiz, set batch + close time,
 *      and publish by hand. Nothing goes live automatically.
 *
 * Tip: harvested candidates live in scripts/quiz/atoms/*.json — finalize a
 * needs_review atom's distractors, then drop it in here (or use fromAtom()).
 */
import { defineDailyQuiz } from "../daily";

export default defineDailyQuiz({
  slug: "REPLACE-ME-unique-slug",
  exam: "NDA",
  subject: "Maths",
  title: "NDA <Chapter> — <Theme> (Daily N)",
  chapter: "Probability",
  marking: { correct: 1, wrong: 0 }, // low-stakes daily; teacher can change before publishing
  questions: [
    {
      concept: "classical-probability",
      stem: "A card is drawn from a deck of 52. What is \\(P(\\text{it is an ace})\\)?",
      correct: "\\(\\dfrac{1}{13}\\)",
      distractors: ["\\(\\dfrac{1}{52}\\)", "\\(\\dfrac{1}{4}\\)", "\\(\\dfrac{4}{13}\\)"],
    },
    {
      concept: "complement-and-axioms",
      stem: "For any event \\(E\\), \\(P(E')\\) equals:",
      // explicit form also allowed when you want to fix the option order:
      options: {
        A: "\\(1 - P(E)\\)",
        B: "\\(1 + P(E)\\)",
        C: "\\(P(E) - 1\\)",
        D: "\\(\\dfrac{1}{P(E)}\\)",
      },
      answer: "A",
    },
    // … add ~13 more to reach 15.
  ],
});
