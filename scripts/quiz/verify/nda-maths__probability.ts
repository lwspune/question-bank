/**
 * Verified distractors for NDA Maths · Probability · "Classical Probability &
 * Counting" — the first hand-finalized batch of the verify pass (step 4).
 *
 * Each entry gives 3 wrong options for a harvested needs_review atom whose KEY is
 * already correct (from the /notes answer). Distractors are authored to match the
 * concept's real misconceptions (the atom's trap_hints): the classic confusions a
 * student actually makes, not random numbers. `npm run quiz:verify nda-maths__probability`
 * validates each (distinct, none equals the key) and promotes the atom to
 * status='verified' in public.quiz_atoms.
 *
 * 40 atoms ≈ enough for ~2–3 daily quizzes once assembled.
 */
export type VerifiedEntry = {
  atomKey: string;
  distractors: string[];
  /** Optional theme override (default stays the harvested one, usually
   *  'computation'). Set to 'property' for identity/rule questions, etc. */
  theme?: "formula" | "property" | "computation" | "fact" | "trap";
};

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // classical probability (favourable / total)
  { atomKey: "classical-probability:practiceSet:0", distractors: [f("\\dfrac{1}{3}"), f("\\dfrac{1}{4}"), f("\\dfrac{2}{3}")] }, // P(head)=1/2
  { atomKey: "classical-probability:practiceSet:1", distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{1}{6}"), f("\\dfrac{2}{3}")] }, // P(>4)=1/3
  { atomKey: "classical-probability:practiceSet:2", distractors: [f("\\dfrac{1}{52}"), f("\\dfrac{1}{4}"), f("\\dfrac{4}{13}")] }, // P(ace)=1/13
  { atomKey: "classical-probability:practiceSet:3", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{13}"), f("\\dfrac{1}{26}")] }, // P(red)=1/2
  { atomKey: "classical-probability:selfCheck:0", distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{1}{6}"), f("\\dfrac{2}{3}")] }, // die>4 = 1/3

  // counting with combinations
  { atomKey: "counting-with-combinations:practiceSet:0", distractors: [f("20"), f("15"), f("25")] }, // C(5,2)=10
  { atomKey: "counting-with-combinations:practiceSet:1", distractors: [f("30"), f("12"), f("20")] }, // C(6,2)=15
  { atomKey: "counting-with-combinations:practiceSet:2", distractors: [f("\\dfrac{1}{10}"), f("\\dfrac{2}{5}"), f("\\dfrac{3}{5}")] }, // both red=3/10
  { atomKey: "counting-with-combinations:practiceSet:3", distractors: [f("\\dfrac{1}{5}"), f("\\dfrac{2}{5}"), f("\\dfrac{3}{10}")] }, // 2 specified=1/10
  { atomKey: "counting-with-combinations:selfCheck:0", distractors: [f("\\dfrac{2}{5}"), f("\\dfrac{3}{10}"), f("\\dfrac{9}{25}")] }, // both black=1/3

  // complement, odds, axioms
  { atomKey: "complement-and-axioms:practiceSet:0", distractors: [f("0.4"), f("0.5"), f("1.4")] }, // P(E')=0.6
  { atomKey: "complement-and-axioms:practiceSet:1", distractors: [f("\\dfrac{3}{5}"), f("\\dfrac{2}{3}"), f("\\dfrac{1}{5}")] }, // odds 2:3 -> 2/5
  { atomKey: "complement-and-axioms:practiceSet:2", distractors: [f("\\dfrac{5}{6}"), f("\\dfrac{1}{5}"), f("\\dfrac{1}{2}")] }, // odds against 5:1 -> 1/6
  { atomKey: "complement-and-axioms:practiceSet:3", distractors: ["Yes", "Yes, if the event is certain", "Only when outcomes are not equally likely"] }, // Can P=1.2? -> No
  { atomKey: "complement-and-axioms:selfCheck:0", distractors: [f("\\dfrac{1}{6}"), f("\\dfrac{1}{2}"), f("\\dfrac{31}{36}")] }, // not sum 7 = 5/6

  // selecting numbers
  { atomKey: "selecting-numbers:practiceSet:0", distractors: [f("\\dfrac{3}{10}"), f("\\dfrac{1}{2}"), f("\\dfrac{1}{5}")] }, // 1-10 prime = 2/5
  { atomKey: "selecting-numbers:practiceSet:1", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{10}"), f("\\dfrac{2}{5}")] }, // 1-20 mult of 5 = 1/5
  { atomKey: "selecting-numbers:practiceSet:2", distractors: [f("10"), f("7"), f("9")] }, // consecutive triples 1..10 = 8
  { atomKey: "selecting-numbers:practiceSet:3", distractors: [f("\\dfrac{1}{5}"), f("\\dfrac{1}{50}"), f("\\dfrac{1}{25}")] }, // 1-50 div by 10 = 1/10
  { atomKey: "selecting-numbers:selfCheck:0", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{5}"), f("\\dfrac{4}{15}")] }, // 1-30 div by 4 = 7/30

  // arrangements
  { atomKey: "probability-with-arrangements:practiceSet:0", distractors: [f("12"), f("16"), f("4")] }, // 4! = 24
  { atomKey: "probability-with-arrangements:practiceSet:1", distractors: [f("\\dfrac{1}{3}"), f("\\dfrac{1}{4}"), f("\\dfrac{1}{12}")] }, // 4 in row A,B together = 1/2
  { atomKey: "probability-with-arrangements:practiceSet:2", distractors: [f("24"), f("6"), f("4")] }, // BOOK = 12
  { atomKey: "probability-with-arrangements:practiceSet:3", distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{1}{6}"), f("\\dfrac{1}{15}")] }, // 6 in row A,B together = 1/3
  { atomKey: "probability-with-arrangements:selfCheck:0", distractors: [f("\\dfrac{1}{5}"), f("\\dfrac{1}{2}"), f("\\dfrac{3}{5}")] }, // DELHI E,I together = 2/5

  // coins
  { atomKey: "probability-with-coins:practiceSet:0", distractors: [f("6"), f("9"), f("4")] }, // n(S) 3 tosses = 8
  { atomKey: "probability-with-coins:practiceSet:1", distractors: [f("\\dfrac{1}{3}"), f("\\dfrac{3}{8}"), f("\\dfrac{1}{6}")] }, // all heads 3 = 1/8
  { atomKey: "probability-with-coins:practiceSet:2", distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{1}{4}"), f("\\dfrac{1}{3}")] }, // >=1 tail in 2 = 3/4
  { atomKey: "probability-with-coins:practiceSet:3", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{6}"), f("\\dfrac{2}{3}")] }, // biased P(HH)=1/9
  { atomKey: "probability-with-coins:selfCheck:0", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{2}"), f("\\dfrac{5}{16}")] }, // exactly 2 H in 4 = 3/8

  // dice
  { atomKey: "probability-with-dice:practiceSet:0", distractors: [f("12"), f("21"), f("6")] }, // n(S) two dice = 36
  { atomKey: "probability-with-dice:practiceSet:1", distractors: [f("\\dfrac{1}{9}"), f("\\dfrac{5}{36}"), f("\\dfrac{7}{36}")] }, // sum 7 = 1/6
  { atomKey: "probability-with-dice:practiceSet:2", distractors: [f("\\dfrac{1}{12}"), f("\\dfrac{1}{36}"), f("\\dfrac{1}{3}")] }, // doublet = 1/6
  { atomKey: "probability-with-dice:practiceSet:3", distractors: [f("\\dfrac{1}{6}"), f("\\dfrac{1}{12}"), f("\\dfrac{1}{18}")] }, // sum 12 = 1/36
  { atomKey: "probability-with-dice:selfCheck:0", distractors: [f("\\dfrac{1}{3}"), f("\\dfrac{1}{6}"), f("\\dfrac{7}{36}")] }, // sum mult of 4 = 1/4

  // sample space basics
  { atomKey: "what-is-probability:practiceSet:1", distractors: [f("12"), f("21"), f("6")] }, // two dice outcomes = 36
  { atomKey: "what-is-probability:practiceSet:2", distractors: [f("6"), f("9"), f("4")] }, // coin 3 tosses outcomes = 8

  // geometric probability
  { atomKey: "geometric-probability:practiceSet:1", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{1}{10}"), f("\\dfrac{4}{5}")] }, // [0,10] P(>8) = 1/5
  { atomKey: "geometric-probability:practiceSet:2", distractors: [f("\\dfrac{1}{2}"), f("\\dfrac{1}{3}"), f("\\dfrac{3}{4}")] }, // within r/2 (area) = 1/4 ; 1/2 = radius-ratio trap
  { atomKey: "geometric-probability:selfCheck:0", distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{4}{7}"), f("\\dfrac{1}{2}")] }, // rod 3..7 of 12 = 1/3
];
