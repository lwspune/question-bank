import type { SubtopicNote } from "@/app/notes/_types";

export const COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Counting Sets, Subsets, and Inclusion-Exclusion",
  title: "Counting, Subsets and Inclusion-Exclusion",
  oneLineDefinition:
    "An n-element set has 2ⁿ subsets; the inclusion-exclusion principle counts a union by adding the parts and subtracting the overlaps — the engine behind every Venn 'survey' word problem.",
  whyItMatters:
    "27 PYQs — the largest subtopic, and the home of the chapter's highest-yield HARD genre: the survey word problem (so many like cricket, so many like both, how many like exactly two). " +
    "Master two things — counting subsets with 2ⁿ, and the exactly-one / exactly-two / all-three accounting — and you cover most of these marks.",
  concepts: [
    // 1 — power set and subsets
    {
      kind: "formula" as const,
      slug: "power-set-and-subsets",
      name: "Power set and counting subsets",
      intuition:
        "Each element of a set is either in or out of a subset, so an n-element set has \\(2^n\\) subsets — the power set. From that one fact flow proper-subset counts, superset counts, and a slick symmetry trick for 'at most half' the elements.",
      definition:
        "The counting rules:\n" +
        "- A set with \\(n\\) elements has \\(2^n\\) **subsets** (the power set \\(P(A)\\)), of which \\(2^n - 1\\) are **proper subsets** (all except the set itself).\n" +
        "- **Supersets of a fixed set** \\(\\{x\\}\\): fix x as 'in', let the other \\(n-1\\) elements vary \\(\\Rightarrow 2^{n-1}\\) subsets contain x.\n" +
        "- **Count carefully when elements are themselves sets**: \\(A=\\{\\{1,2,3\\}\\}\\) has ONE element, so \\(|P(A)|=2\\).\n" +
        "- **Symmetry trick**: in a \\((2n+1)\\)-element set, the subsets of size \\(\\le n\\) are exactly half of all subsets \\(= \\tfrac{1}{2}\\cdot 2^{2n+1} = 2^{2n}\\).",
      formula: {
        label: "Counting subsets",
        latex: "|P(A)| = 2^n \\qquad \\text{proper subsets} = 2^n - 1 \\qquad \\text{subsets containing a fixed element} = 2^{n-1}",
      },
      authoredExample: {
        prompt:
          "A set S has \\(2n+1\\) elements. The number of subsets of S with at most n elements is 256. Find n.",
        steps: [
          "Subsets of size \\(0,1,\\dots,n\\) pair up with subsets of size \\(2n+1,\\dots,n+1\\) by complementation — exactly half of all subsets.",
          "So that count is \\(\\tfrac{1}{2}\\cdot 2^{2n+1} = 2^{2n}\\).",
          "Set \\(2^{2n} = 256 = 2^8 \\Rightarrow 2n = 8 \\Rightarrow n = 4\\).",
        ],
        answer: "\\(n = 4\\).",
      },
      selfCheckExample: {
        prompt:
          "How many subsets of \\(\\{1,2,3,4\\}\\) are supersets of \\(\\{3\\}\\) but are not the whole set?",
        steps: [
          "A superset of \\(\\{3\\}\\) must contain 3; the other three elements \\(\\{1,2,4\\}\\) are free.",
          "That gives \\(2^3 = 8\\) subsets containing 3.",
          "Exclude the full set \\(\\{1,2,3,4\\}\\) itself: \\(8 - 1 = 7\\).",
        ],
        answer: "7.",
      },
      practiceSet: [
        { prompt: "How many subsets does a 10-element set have?", answer: "\\(2^{10} = 1024\\)" },
        { prompt: "How many proper subsets does a 6-element set have?", answer: "\\(2^6 - 1 = 63\\)" },
        { prompt: "If \\(A = \\{\\{1,2\\}\\}\\), how many elements has \\(P(A)\\)?", answer: "2", method: "A has ONE element (a set), so \\(2^1\\)" },
        { prompt: "How many subsets of an 8-set contain a fixed element x?", answer: "\\(2^7 = 128\\)" },
      ],
      pyqExampleId: "c7c6f37e-6da4-4270-b80e-082254a1218e", // (2n+1)-set, at most n elements = 1024 → n=5
      traps: [
        {
          title: "Count the elements before raising 2 to a power",
          body:
            "\\(A=\\{\\lambda, \\{\\lambda,\\mu\\}\\}\\) has TWO elements (an element \\(\\lambda\\) and a SET \\(\\{\\lambda,\\mu\\}\\)), so \\(|P(A)|=4\\). The brace-inside-brace is one element, not two — miscounting elements is the usual error.",
        },
      ],
    },

    // 2 — inclusion-exclusion two sets (Venn 2)
    {
      kind: "formula" as const,
      slug: "inclusion-exclusion-two-sets",
      name: "Inclusion-exclusion for two sets",
      intuition:
        "If you add the sizes of two overlapping sets you count the overlap twice, so subtract it once: \\(|A\\cup B| = |A|+|B|-|A\\cap B|\\). The same idea bounds how small or large an overlap can be in 'at least / at most' survey questions.",
      definition:
        "The two-set rule and its uses:\n" +
        "- \\(|A\\cup B| = |A| + |B| - |A\\cap B|\\).\n" +
        "- For sets of multiples, \\(A\\cap B\\) uses the **LCM**: multiples of 3 \\(\\cap\\) multiples of 2 are multiples of 6.\n" +
        "- **Least overlap**: \\(|A\\cap B| \\ge |A|+|B|-|U|\\) (when the union can't exceed the universe). **Most overlap**: \\(|A\\cap B| \\le \\min(|A|,|B|)\\).",
      formula: {
        label: "Inclusion–exclusion (two sets)",
        latex: "|A \\cup B| = |A| + |B| - |A \\cap B| \\qquad |A \\cap B| \\ge |A| + |B| - |U|",
      },
      visualizationSlug: "sets-venn-two",
      authoredExample: {
        prompt:
          "In a group of 100 people, 70 like tea and 80 like coffee, and everyone likes at least one. How many like both?",
        steps: [
          "Everyone likes at least one, so \\(|T\\cup C| = 100\\).",
          "Inclusion-exclusion: \\(100 = 70 + 80 - |T\\cap C|\\).",
          "\\(|T\\cap C| = 150 - 100 = 50\\).",
        ],
        answer: "50 like both.",
      },
      selfCheckExample: {
        prompt:
          "How many integers from 1 to 100 are divisible by 2 or by 5?",
        steps: [
          "Divisible by 2: \\(100/2 = 50\\). Divisible by 5: \\(100/5 = 20\\).",
          "Divisible by both (i.e. by \\(\\mathrm{lcm}(2,5)=10\\)): \\(100/10 = 10\\).",
          "Inclusion-exclusion: \\(50 + 20 - 10 = 60\\).",
        ],
        answer: "60.",
      },
      practiceSet: [
        { prompt: "\\(|A|=30, |B|=25, |A\\cap B|=10\\). Find \\(|A\\cup B|\\).", answer: "45" },
        { prompt: "Multiples of 4 \\(\\cap\\) multiples of 6 are multiples of?", answer: "12 (the LCM)" },
        { prompt: "\\(|A|=60, |B|=50\\) in a universe of 100. Least \\(|A\\cap B|\\)?", answer: "10", method: "\\(60+50-100\\)" },
      ],
      pyqExampleId: "ee27ec67-5d65-459a-8af4-20c810ec38d7", // multiples of 3 ∪ even, LCM
      traps: [
        {
          title: "Overlap of multiples uses LCM, not product",
          body:
            "Multiples of 4 and 6 in common are multiples of \\(\\mathrm{lcm}(4,6)=12\\), NOT \\(4\\times 6 = 24\\). Use the LCM whenever 'divisible by both' appears.",
        },
      ],
    },

    // 3 — inclusion-exclusion three sets (Venn 3)
    {
      kind: "formula" as const,
      slug: "inclusion-exclusion-three-sets",
      name: "Inclusion-exclusion for three sets",
      intuition:
        "Three overlapping sets need alternating signs: add the three singles, subtract the three pairwise overlaps, add back the triple overlap. With three sets, max/min questions hinge on how large the triple overlap can be.",
      definition:
        "The three-set rule:\n" +
        "- \\(|A\\cup B\\cup C| = |A|+|B|+|C| - |A\\cap B| - |B\\cap C| - |A\\cap C| + |A\\cap B\\cap C|\\).\n" +
        "- This equals the sum of the **seven disjoint Venn regions**.\n" +
        "- **Maximising/minimising the union**: the only free quantity is the triple overlap \\(x = |A\\cap B\\cap C|\\). The union grows with x; x is bounded by \\(0 \\le x \\le \\min\\) of the pairwise intersections.",
      formula: {
        label: "Inclusion–exclusion (three sets)",
        latex: "|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |B \\cap C| - |A \\cap C| + |A \\cap B \\cap C|",
      },
      visualizationSlug: "sets-venn-three",
      authoredExample: {
        prompt:
          "Three sets satisfy \\(|A\\cup B\\cup C| = 90 + x\\) where \\(x=|A\\cap B\\cap C|\\), and the pairwise intersections are 20, 15, 12. What is the maximum possible \\(|A\\cup B\\cup C|\\)?",
        steps: [
          "The triple overlap can be at most the smallest pairwise intersection: \\(x \\le \\min(20,15,12) = 12\\).",
          "The union increases with x, so use \\(x = 12\\).",
          "\\(|A\\cup B\\cup C|_{\\max} = 90 + 12 = 102\\).",
        ],
        answer: "102 (at \\(x = 12\\)).",
      },
      selfCheckExample: {
        prompt:
          "Expand \\(n(X)+n(Y)+n(Z)-n(X\\cap Y)-n(Y\\cap Z)-n(X\\cap Z)+n(X\\cap Y\\cap Z)\\) — what single quantity is it?",
        steps: [
          "This is exactly the three-set inclusion-exclusion formula.",
          "It counts each element of the union once: singles added, pairs removed, triple added back.",
          "So it equals \\(n(X\\cup Y\\cup Z)\\) — the size of the union.",
        ],
        answer: "\\(n(X\\cup Y\\cup Z)\\), the number of elements in the union.",
      },
      practiceSet: [
        { prompt: "Write the sign of the triple-overlap term in the 3-set formula.", answer: "+ (added back)" },
        { prompt: "The 3-set formula equals the sum of how many disjoint regions?", answer: "7" },
        { prompt: "Triple overlap \\(x\\) is bounded above by?", answer: "\\(\\min\\) of the three pairwise intersections" },
      ],
      pyqExampleId: "213654f2-9f7a-41f7-b37a-27e60173ff49", // max number of students
      traps: [
        {
          title: "Mind the alternating signs",
          body:
            "Pairwise intersections are SUBTRACTED, the triple intersection is ADDED. Dropping the \\(+|A\\cap B\\cap C|\\) term is the most common slip — it under-counts the union.",
        },
      ],
    },

    // 4 — survey region counting (Venn 3 regions) — signature HARD genre
    {
      kind: "formula" as const,
      slug: "survey-region-counting",
      name: "Survey problems — exactly one, exactly two, all three",
      intuition:
        "The hardest sets questions are surveys: so many play each game, so many play exactly two, how many play all three. The trick is to keep 'exactly k' and 'at least k' strictly separate, and to remember the two bridging identities. Most of these are pure region bookkeeping on a 3-circle Venn diagram.",
      definition:
        "The accounting identities (let one/two/three = people in exactly one / exactly two / all three regions):\n" +
        "- **Total in the union** \\(= (\\text{exactly one}) + (\\text{exactly two}) + (\\text{exactly three})\\). This is the 'exactly' decomposition — NOT the raw inclusion-exclusion sum.\n" +
        "- **Sum of pairwise intersections** \\(= (\\text{exactly two}) + 3\\cdot(\\text{all three})\\), so **exactly two** \\(= \\sum\\text{pairwise} - 3\\cdot(\\text{all three})\\).\n" +
        "- **At least two** \\(= (\\text{exactly two}) + (\\text{all three})\\).\n" +
        "- **Exactly one** \\(= \\text{total} - (\\text{at least two})\\).",
      formula: {
        label: "Survey accounting identities",
        latex: "\\text{exactly two} = \\textstyle\\sum\\text{pairwise} - 3\\,(\\text{all three}) \\qquad \\text{at least two} = \\text{exactly two} + (\\text{all three})",
      },
      visualizationSlug: "sets-venn-three",
      authoredExample: {
        prompt:
          "In a class everyone plays at least one of three sports. 25 play exactly two sports and 5 play all three. The pairwise totals \\(|A\\cap B|+|B\\cap C|+|A\\cap C|\\) sum to S. Find S.",
        steps: [
          "Each 'exactly two' person sits in one pairwise-intersection region: contributes 1 to S.",
          "Each 'all three' person sits in all three pairwise intersections: contributes 3 to S.",
          "So \\(S = (\\text{exactly two}) + 3\\cdot(\\text{all three}) = 25 + 3(5) = 40\\).",
        ],
        answer: "\\(S = 40\\).",
      },
      selfCheckExample: {
        prompt:
          "In a class of 240, 10 passed none. Of those who passed at least one, 60 passed exactly one and 110 passed exactly two. How many passed all three?",
        steps: [
          "Passed at least one \\(= 240 - 10 = 230\\).",
          "Use the EXACTLY decomposition: (exactly one) + (exactly two) + (all three) = 230.",
          "\\(60 + 110 + (\\text{all three}) = 230 \\Rightarrow \\text{all three} = 60\\).",
        ],
        answer: "60 passed all three.",
      },
      practiceSet: [
        { prompt: "exactly two = (sum of pairwise) − ? × (all three)", answer: "3" },
        { prompt: "at least two = exactly two + ?", answer: "all three" },
        { prompt: "Total in union (exactly form) = exactly one + exactly two + ?", answer: "all three (exactly three)" },
        { prompt: "exactly one = total − ?", answer: "at least two" },
      ],
      pyqExampleId: "91aae553-31cf-4e55-bea4-e4f5574d6783", // 240 students, exactly one/two → all three
      traps: [
        {
          title: "'Exactly two' is not the sum of pairwise intersections",
          body:
            "Each all-three person is counted in all three pairwise intersections, so \\(\\sum\\text{pairwise}\\) over-counts them by a factor of 3. Subtract: exactly two \\(= \\sum\\text{pairwise} - 3\\cdot(\\text{all three})\\). Mixing up 'exactly' and 'at least' is the single biggest source of wrong answers here.",
        },
      ],
    },
  ],
};
