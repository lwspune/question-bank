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

  // ── bounds-on-probability ──
  { atomKey: "min-max-of-combined-probabilities:practiceSet:0", distractors: [f("0.5"), f("1.1"), f("0.3")] }, // min P(A∪B)=max=0.6
  { atomKey: "probability-identity-statements:practiceSet:0", distractors: [f("P(A)+P(B)-P(A\\cap B)"), f("P(A)+P(B)"), f("P(A)+P(B)+2P(A\\cap B)")], theme: "property" }, // exactly one = sum - 2∩
  { atomKey: "frechet-and-boole-bounds:practiceSet:0", distractors: [f("0"), f("0.4"), f("0.5")] }, // min ∩ = 0.8+0.5-1 = 0.3
  { atomKey: "min-max-of-combined-probabilities:practiceSet:1", distractors: [f("1.1"), f("0.6"), f("0.8")] }, // max ∪ = min(1,1.1) = 1
  { atomKey: "frechet-and-boole-bounds:practiceSet:1", distractors: [f("0.4"), f("0.8"), f("0.3")] }, // max ∩ = min = 0.5
  { atomKey: "probability-identity-statements:practiceSet:1", distractors: [f("0.25"), f("0.6"), f("0.85")] }, // P(A∩B̄)=0.6-0.25=0.35
  { atomKey: "frechet-and-boole-bounds:practiceSet:2", distractors: [f("0.12"), f("0.3"), f("0.1")] }, // min ∩ = max(0,-0.3) = 0
  { atomKey: "probability-identity-statements:practiceSet:2", distractors: [f("0.7"), f("0.9"), f("0.3")] }, // exactly one = 0.9-0.4 = 0.5
  { atomKey: "min-max-of-combined-probabilities:practiceSet:2", distractors: [f("0.5"), f("0.8"), f("1.0")] }, // P(A)+P(B)=∪+∩=1.1
  { atomKey: "frechet-and-boole-bounds:practiceSet:3", distractors: [f("1.3"), f("0.7"), f("0.6")] }, // max ∪ = min(1,1.3) = 1
  { atomKey: "min-max-of-combined-probabilities:practiceSet:3", distractors: [f("\\tfrac14"), f("\\tfrac12"), f("1")] }, // min ∩ = 0
  { atomKey: "probability-identity-statements:practiceSet:3", distractors: ["No", "Only if A = B", "Only if A and B are independent"], theme: "property" }, // B⊆A ⇒ A∩B=B, Yes
  { atomKey: "frechet-and-boole-bounds:selfCheck:0", distractors: [f("0.4 \\le P(A \\cup B) \\le 0.9"), f("0.5 \\le P(A \\cup B) \\le 1"), f("0.1 \\le P(A \\cup B) \\le 0.9")] },
  { atomKey: "min-max-of-combined-probabilities:selfCheck:0", distractors: [f("0.75"), f("1.125"), f("0.625")] }, // min sum = 0.75+0.125
  { atomKey: "probability-identity-statements:selfCheck:0", distractors: [f("P(A)+P(B)"), f("P(B)-P(A)"), f("P(A)\\,P(B)")], theme: "property" }, // B⊆A ⇒ A∩B̄ = P(A)-P(B)

  // ── conditional-probability-bayes ──
  { atomKey: "multiplication-rule-and-restricted-sample-space:practiceSet:0", distractors: [f("4"), f("6"), f("8")] }, // sum=8 → 5 outcomes
  { atomKey: "conditional-probability:practiceSet:0", distractors: [f("0.18"), f("0.3"), f("0.2")] }, // 0.3/0.6 = 0.5
  { atomKey: "bayes-theorem:practiceSet:0", distractors: [f("\\dfrac{5}{8}"), f("\\dfrac{3}{5}"), f("\\dfrac{2}{5}")] }, // 12/(12+20) = 3/8
  { atomKey: "total-probability:practiceSet:0", distractors: [f("\\dfrac14"), f("\\dfrac34"), f("\\dfrac38")] }, // ½·¼+½·¾ = ½
  { atomKey: "multiplication-rule-and-restricted-sample-space:practiceSet:1", distractors: [f("\\dfrac16"), f("\\dfrac12"), f("\\dfrac15")] }, // given odd, P(3)=1/3
  { atomKey: "bayes-theorem:practiceSet:1", distractors: ["the multiplication rule", "the addition rule", "the complement rule"], theme: "property" }, // denominator = total probability
  { atomKey: "conditional-probability:practiceSet:1", distractors: [f("\\dfrac18"), f("\\dfrac14"), f("\\dfrac34")] }, // (¼)/(½) = ½
  { atomKey: "total-probability:practiceSet:1", distractors: [f("0.8"), f("0.3"), f("0.5")] }, // ½·0.6+½·0.2 = 0.4
  { atomKey: "multiplication-rule-and-restricted-sample-space:practiceSet:2", distractors: [f("0.9"), f("0.8"), f("0.1")] }, // 0.4·0.5 = 0.2
  { atomKey: "conditional-probability:practiceSet:2", distractors: [f("P(B)"), f("P(A\\cap B)"), f("P(A)\\,P(B)")], theme: "property" }, // independent ⇒ P(A|B)=P(A)
  { atomKey: "bayes-theorem:practiceSet:2", distractors: [f("0.6"), f("0.5"), f("0.25")] }, // 0.3/0.4 = 0.75
  { atomKey: "conditional-probability:practiceSet:3", distractors: [f("0.05"), f("0.5"), f("0.1")] }, // 0.1/0.5 = 0.2
  { atomKey: "bayes-theorem:practiceSet:3", distractors: [f("P(A\\mid B_k)"), f("P(A)"), f("\\tfrac12")], theme: "property" }, // equal likelihoods ⇒ posterior = prior
  { atomKey: "total-probability:practiceSet:3", distractors: [f("0.6"), f("0.3"), f("0.15")] }, // 0.15+0.07 = 0.22
  { atomKey: "multiplication-rule-and-restricted-sample-space:practiceSet:3", distractors: [f("\\dfrac16"), f("\\dfrac{1}{36}"), f("\\dfrac25")] }, // sum=6: doublet 1 of 5
  { atomKey: "total-probability:selfCheck:0", distractors: [f("\\dfrac12"), f("\\dfrac25"), f("\\dfrac45")] }, // ½·2/5+½·4/5 = 3/5
  { atomKey: "bayes-theorem:selfCheck:0", distractors: [f("0.9"), f("\\approx 0.5"), f("\\dfrac{1}{10}")] }, // 0.009/0.108 = 1/12
  { atomKey: "conditional-probability:selfCheck:0", distractors: [f("\\dfrac{1}{18}"), f("\\dfrac13"), f("\\dfrac23")] }, // (1/6)/(1/3) = ½
  { atomKey: "multiplication-rule-and-restricted-sample-space:selfCheck:0", distractors: [f("\\dfrac16"), f("\\dfrac12"), f("\\dfrac14")] }, // given even, P(4) = 1/3

  // ── event-algebra-addition-rule ──
  { atomKey: "set-operations-on-events:practiceSet:0", distractors: [f("A \\cup B"), f("A' \\cap B'"), f("A \\setminus B")], theme: "property" }, // both occur = A∩B
  { atomKey: "addition-rule:practiceSet:0", distractors: [f("0.9"), f("0.2"), f("1.1")] }, // 0.4+0.5-0.2 = 0.7
  { atomKey: "neither-and-complement-of-union:practiceSet:0", distractors: [f("0.7"), f("0.5"), f("0.1")] }, // 1-0.7 = 0.3
  { atomKey: "mutually-exclusive-events:practiceSet:0", distractors: [f("0.1"), f("0.3"), f("1.0")] }, // ME ⇒ 0.2+0.5 = 0.7
  { atomKey: "exhaustive-events:practiceSet:0", distractors: [f("0.7"), f("1.0"), f("0.35")] }, // ME&exh ⇒ 1-0.7 = 0.3
  { atomKey: "addition-rule:practiceSet:1", distractors: [f("0.3"), f("1.1"), f("0.1")] }, // 0.5+0.6-0.9 = 0.2
  { atomKey: "set-operations-on-events:practiceSet:1", distractors: [f("A \\cap B"), f("A' \\cup B'"), f("A \\setminus B")], theme: "property" }, // at least one = A∪B
  { atomKey: "exhaustive-events:practiceSet:1", distractors: [f("\\dfrac12"), f("\\dfrac14"), f("1")] }, // 3 equal ME&exh ⇒ 1/3
  { atomKey: "mutually-exclusive-events:practiceSet:1", distractors: [f("P(A)\\,P(B)"), f("1"), f("P(A)+P(B)")], theme: "property" }, // ME ⇒ P(A∩B)=0
  { atomKey: "neither-and-complement-of-union:practiceSet:1", distractors: [f("10\\%"), f("40\\%"), f("20\\%")] }, // neither = 100-70 = 30%
  { atomKey: "set-operations-on-events:practiceSet:2", distractors: [f("A' \\cup B'"), f("(A \\cap B)'"), f("A \\cup B")], theme: "property" }, // neither = A'∩B' = (A∪B)'
  { atomKey: "exhaustive-events:practiceSet:2", distractors: [f("\\dfrac12"), f("\\dfrac23"), f("\\dfrac14")] }, // 2P(B)+P(B)=1 ⇒ 1/3
  { atomKey: "addition-rule:practiceSet:2", distractors: [f("P(A)\\,P(B)"), f("0"), f("P(A)-P(B)")], theme: "property" }, // disjoint ⇒ P(A)+P(B)
  { atomKey: "neither-and-complement-of-union:practiceSet:2", distractors: [f("A' \\cup B'"), f("A \\cap B"), f("A \\cup B'")], theme: "property" }, // De Morgan: (A∪B)'=A'∩B'
  { atomKey: "mutually-exclusive-events:practiceSet:2", distractors: ["Yes", "Yes, always", "Only if they are equally likely"], theme: "property" }, // ME + indep impossible ⇒ No
  { atomKey: "addition-rule:practiceSet:3", distractors: [f("1"), f("\\dfrac56"), f("\\dfrac13")] }, // ½+⅓-⅙ = ⅔
  { atomKey: "mutually-exclusive-events:practiceSet:3", distractors: [f("\\dfrac19"), f("\\dfrac13"), f("1")] }, // ME ⇒ ⅓+⅓ = ⅔
  { atomKey: "neither-and-complement-of-union:practiceSet:3", distractors: [f("0.75"), f("0.5"), f("0")] }, // 1-0.75 = 0.25
  { atomKey: "exhaustive-events:practiceSet:3", distractors: ["Yes", "Only for two events", "Yes, always"], theme: "property" }, // exhaustive alone ⇏ sum 1 ⇒ No
  { atomKey: "set-operations-on-events:practiceSet:3", distractors: [f("A' \\cap B'"), f("A \\cup B"), f("A \\cap B'")], theme: "property" }, // De Morgan: (A∩B)'=A'∪B'
  { atomKey: "exhaustive-events:selfCheck:0", distractors: [f("\\dfrac14"), f("\\dfrac13"), f("\\dfrac25")] }, // 2+2+1 parts ⇒ P(C)=1/5
  { atomKey: "mutually-exclusive-events:selfCheck:0", distractors: [f("\\dfrac18"), f("\\dfrac14"), f("1")] }, // ME ⇒ ¼+½ = ¾
  { atomKey: "neither-and-complement-of-union:selfCheck:0", distractors: [f("\\dfrac{7}{12}"), f("\\dfrac14"), f("\\dfrac12")] }, // 1-7/12 = 5/12
  { atomKey: "addition-rule:selfCheck:0", distractors: [f("\\dfrac{5}{12}"), f("\\dfrac{11}{12}"), f("\\dfrac14")] }, // ½+⅓-¼ = 7/12

  // ── independent-events ──
  { atomKey: "independence-and-multiplication-rule:practiceSet:0", distractors: [f("1.1"), f("0.8"), f("0.55")] }, // 0.5·0.6 = 0.3
  { atomKey: "finding-unknowns-with-independence:practiceSet:0", distractors: [f("1.1"), f("0.3"), f("0.9")] }, // 0.6+0.5-0.3 = 0.8
  { atomKey: "solving-a-problem-independently:practiceSet:0", distractors: [f("\\dfrac14"), f("\\dfrac12"), f("1")] }, // 1-¼ = ¾
  { atomKey: "at-least-one-via-complement:practiceSet:0", distractors: [f("0.9"), f("0.2"), f("0.3")] }, // 1-0.6·0.5 = 0.7
  { atomKey: "independence-and-multiplication-rule:practiceSet:1", distractors: [f("\\dfrac12"), f("\\dfrac18"), f("\\dfrac34")] }, // two heads = ¼
  { atomKey: "at-least-one-via-complement:practiceSet:1", distractors: [f("\\dfrac18"), f("\\dfrac38"), f("\\dfrac12")] }, // 1-⅛ = 7/8
  { atomKey: "finding-unknowns-with-independence:practiceSet:1", distractors: [f("0.28"), f("0.9"), f("0.18")] }, // 1-0.7·0.4 = 0.72
  { atomKey: "solving-a-problem-independently:practiceSet:1", distractors: [f("\\dfrac56"), f("\\dfrac12"), f("\\dfrac13")] }, // ½·⅓ = 1/6
  { atomKey: "finding-unknowns-with-independence:practiceSet:2", distractors: [f("0.25"), f("0.75"), f("0.3")] }, // 0.5+0.5P(B)=0.75 ⇒ 0.5
  { atomKey: "solving-a-problem-independently:practiceSet:2", distractors: [f("\\dfrac{1}{12}"), f("\\dfrac{7}{12}"), f("\\dfrac23")] }, // ⅔·¾ = ½
  { atomKey: "at-least-one-via-complement:practiceSet:2", distractors: [f("\\dfrac14"), f("\\dfrac12"), f("1")] }, // 1-¼ = ¾
  { atomKey: "independence-and-multiplication-rule:practiceSet:2", distractors: [f("\\dfrac{7}{12}"), f("\\dfrac12"), f("\\dfrac{1}{7}")] }, // ⅓·¼ = 1/12
  { atomKey: "finding-unknowns-with-independence:practiceSet:3", distractors: [f("\\dfrac14"), f("\\dfrac12"), f("1")] }, // 1-¼ = ¾
  { atomKey: "solving-a-problem-independently:practiceSet:3", distractors: [f("\\dfrac{1}{12}"), f("\\dfrac12"), f("\\dfrac56")] }, // 1-⅓·¼ = 11/12
  { atomKey: "independence-and-multiplication-rule:practiceSet:3", distractors: ["No", "Only if P(B) = 0.5", "Cannot be determined"], theme: "property" }, // indep of B ⇒ indep of B', Yes
  { atomKey: "at-least-one-via-complement:practiceSet:3", distractors: [f("0.1"), f("0.7"), f("0.3")] }, // 1-0.2·0.5 = 0.9
  { atomKey: "solving-a-problem-independently:selfCheck:0", distractors: [f("\\dfrac{1}{60}"), f("\\dfrac12"), f("\\dfrac25")] }, // 1-1/60 = 59/60
  { atomKey: "independence-and-multiplication-rule:selfCheck:0", distractors: [f("1.4"), f("0.7"), f("0.91")] }, // 0.7² = 0.49
  { atomKey: "at-least-one-via-complement:selfCheck:0", distractors: [f("\\dfrac49"), f("\\dfrac23"), f("\\dfrac19")] }, // 1-(⅔)² = 5/9
  { atomKey: "finding-unknowns-with-independence:selfCheck:0", distractors: [f("\\dfrac{1}{12}"), f("\\dfrac{7}{12}"), f("\\dfrac{5}{12}")] }, // ⅓+¼-1/12 = ½
];
