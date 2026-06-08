/**
 * NDA Maths · Probability · the "Common Traps" theme.
 *
 * Unlike the practice/property batches (which only supply distractors for an
 * already-correct key), trap atoms are SEEDS — placeholder stem + empty key — so
 * each entry here authors the FULL question via the `stem` + `correct` overrides.
 * Every question is engineered so the misconception is the most TEMPTING wrong
 * option. Theme stays 'trap' (no override). Run:
 *   npm run quiz:verify nda-maths__probability-traps
 *
 * 16 traps → one 16-question "Common Traps" quiz (balanced sizing).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "probability-with-dice:trap:0",
    stem: "Two dice are thrown. Outcomes are ordered pairs. What is \\(P(\\text{sum} = 4)\\)?",
    correct: f("\\dfrac{1}{12}"), // (1,3)(2,2)(3,1) = 3 of 36
    distractors: [f("\\dfrac{1}{18}"), f("\\dfrac{1}{9}"), f("\\dfrac{2}{21}")], // 1/18 = counting unordered
  },
  {
    atomKey: "mutually-exclusive-events:trap:0",
    stem: "\\(A\\) and \\(B\\) are mutually exclusive with \\(P(A)=0.3,\\,P(B)=0.5\\). What is \\(P(A\\cap B)\\)?",
    correct: f("0"),
    distractors: [f("0.15"), f("0.8"), f("0.2")], // 0.15 = P(A)P(B), treating ME as independent
  },
  {
    atomKey: "independence-and-multiplication-rule:trap:0",
    stem: "\\(A\\) and \\(B\\) are independent with \\(P(A)=0.4,\\,P(B)=0.5\\). What is \\(P(A\\cup B)\\)?",
    correct: f("0.7"), // 0.4+0.5-0.2
    distractors: [f("0.9"), f("0.2"), f("1.1")], // 0.9 = forgetting to subtract the overlap (treating as ME)
  },
  {
    atomKey: "neither-and-complement-of-union:trap:0",
    stem: "\\(P(A)=0.5,\\,P(B)=0.4,\\,P(A\\cap B)=0.2\\). What is \\(P(\\text{neither } A \\text{ nor } B)\\)?",
    correct: f("0.3"), // 1 - P(A∪B) = 1 - 0.7
    distractors: [f("0.1"), f("0.7"), f("0.5")], // 0.1 = 1 - P(A) - P(B)
  },
  {
    atomKey: "complement-and-axioms:trap:0",
    stem: "The odds AGAINST an event are \\(2:3\\). What is the probability of the event?",
    correct: f("\\dfrac{3}{5}"),
    distractors: [f("\\dfrac{2}{5}"), f("\\dfrac{2}{3}"), f("\\dfrac{3}{2}")], // 2/5 = reading as odds in favour; 2/3 = a/b
  },
  {
    atomKey: "conditional-probability:trap:0",
    stem: "In a class, \\(P(\\text{plays football}\\mid\\text{is a boy})=0.6\\). Does it follow that \\(P(\\text{is a boy}\\mid\\text{plays football})=0.6\\)?",
    correct: "No",
    distractors: ["Yes", "Yes, always", "Only if there are equal numbers of boys and girls"],
  },
  {
    atomKey: "at-least-one-via-complement:trap:0",
    stem: "A fair coin is tossed 4 times. What is \\(P(\\text{at least one head})\\)?",
    correct: f("\\dfrac{15}{16}"), // 1 - (1/2)^4
    distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{2}"), f("\\dfrac{1}{16}")], // 1/4 = adding individual probs
  },
  {
    atomKey: "geometric-probability:trap:0",
    stem: "A point is chosen at random inside a circle of radius \\(r\\). What is the probability it lies within distance \\(\\tfrac{r}{2}\\) of the centre?",
    correct: f("\\dfrac{1}{4}"), // area ratio (r/2)^2 / r^2
    distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{3}{4}"), f("\\dfrac{1}{\\pi}")], // 1/2 = radius ratio (the trap)
  },
  {
    atomKey: "probability-identity-statements:trap:0",
    stem: "\\(P(A)=0.5,\\,P(B)=0.4,\\,P(A\\cap B)=0.2\\). What is \\(P(\\text{exactly one of } A, B)\\)?",
    correct: f("0.5"), // P(A)+P(B)-2P(A∩B)
    distractors: [f("0.7"), f("0.9"), f("0.3")], // 0.7 = subtracting the overlap only once (= union)
  },
  {
    atomKey: "multiplication-rule-and-restricted-sample-space:trap:0",
    stem: "Two dice are thrown. Given that the sum is \\(8\\), what is \\(P(\\text{a } 5 \\text{ appears})\\)?",
    correct: f("\\dfrac{2}{5}"), // 5 outcomes with sum 8; (3,5),(5,3) → 2/5
    distractors: [f("\\dfrac{1}{18}"), f("\\dfrac{1}{6}"), f("\\dfrac{1}{3}")], // 1/18 = dividing by 36 not n(B)=5
  },
  {
    atomKey: "counting-with-combinations:trap:0",
    stem: "From 5 boys and 3 girls, 2 people are chosen at random. What is \\(P(\\text{one boy and one girl})\\)?",
    correct: f("\\dfrac{15}{28}"), // 5·3 / C(8,2)
    distractors: [f("\\dfrac{15}{56}"), f("\\dfrac{5}{28}"), f("\\dfrac{3}{8}")], // 15/56 = ordered denominator 8·7
  },
  {
    atomKey: "probability-with-coins:trap:1",
    stem: "A biased coin has \\(P(\\text{head})=\\tfrac{1}{3}\\). It is tossed twice. What is \\(P(\\text{two heads})\\)?",
    correct: f("\\dfrac{1}{9}"),
    distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{2}{3}"), f("\\dfrac{1}{6}")], // 1/4 = using the fair-coin count
  },
  {
    atomKey: "neither-and-complement-of-union:trap:1",
    stem: "By De Morgan's law, which event equals \\((A \\cup B)'\\)?",
    correct: f("A' \\cap B'"),
    distractors: [f("A' \\cup B'"), f("A \\cap B"), f("A' \\cap B")], // A'∪B' = not flipping the operation
  },
  {
    atomKey: "addition-rule:trap:0",
    stem: "In a group, 60% play cricket, 50% play hockey, and 30% play both. What percentage play at least one of the two?",
    correct: f("80\\%"), // 60 + 50 - 30
    distractors: [f("110\\%"), f("30\\%"), f("20\\%")], // 110% = forgetting to subtract the overlap
  },
  {
    atomKey: "frechet-and-boole-bounds:trap:1",
    stem: "\\(P(A)=0.6,\\,P(B)=0.5\\). What is the SMALLEST possible value of \\(P(A\\cup B)\\)?",
    correct: f("0.6"), // max(P(A),P(B))
    distractors: [f("1.1"), f("0.3"), f("0.5")], // 1.1 = the sum; 0.3 = the product
  },
  {
    atomKey: "probability-with-arrangements:trap:1",
    stem: "How many distinct arrangements are there of the letters of the word \\(\\text{LEVEL}\\)?",
    correct: f("30"), // 5!/(2!·2!)
    distractors: [f("120"), f("60"), f("20")], // 120 = 5!, ignoring the repeated letters
  },
];
