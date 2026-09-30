import type { SubtopicNote } from "@/app/notes/_types";

export const SELECT_PNC_NOTE: SubtopicNote = {
  subtopicName: "Selections and Committees",
  title: "Selections and Committees",
  oneLineDefinition:
    "Choosing groups when order does not matter — committees with 'at least' conditions, picks from several groups, letters chosen from a word and then arranged — and simplifying expressions in nCr and nPr.",
  whyItMatters:
    "Twenty-five PYQs, fourteen of them numerical answer. Most split into cases by how many come from each group and add products of combinations. Six choose letters from a word with repeats, and five are algebra with the nCr and nPr formulas. Three ideas cover the page.",
  concepts: [
    // C1 — cases and committees
    {
      kind: "formula" as const,
      slug: "jpnc-select",
      name: "Committees and 'at least' conditions",
      intuition:
        "List the allowed compositions — how many from each group — and for each multiply the combinations, then add. 'At least one' is often faster as total minus none. When a person must be included, remove them and choose the rest; when two may not both be in, subtract the selections containing both.",
      definition:
        "- Compositions \\((a,b)\\) from groups of sizes \\(m,n\\): \\(\\sum\\binom ma\\binom nb\\).\n" +
        "- At least one of a kind \\(=\\) total \\(-\\) none of that kind.\n" +
        "- A fixed person included: choose the remaining \\(r-1\\) from \\(n-1\\).\n" +
        "- Two people not both in: \\(\\binom nr-\\binom{n-2}{r-2}\\).",
      formula: {
        label: "Case sum",
        latex: "\\sum_{\\text{allowed }(a,b)}\\binom ma\\binom nb",
      },
      authoredExample: {
        prompt: "A team of 4 is chosen from 5 men and 4 women with at least 2 women. In how many ways?",
        steps: [
          "\\((2W,2M)\\): \\(6\\cdot10=60\\); \\((3W,1M)\\): \\(4\\cdot5=20\\); \\((4W)\\): \\(1\\).",
        ],
        answer: "\\(81\\).",
      },
      selfCheckExample: {
        prompt: "In how many ways can 3 people be chosen from 8 if two particular people cannot both be chosen?",
        steps: [
          "\\(\\binom83-\\binom61\\).",
        ],
        answer: "\\(56-6=50\\).",
      },
      practiceSet: [
        { prompt: "Committees of 3 from 10 containing a particular person?", answer: "\\(\\binom92=36\\)" },
        { prompt: "At least one woman in 3 from 4 men, 3 women?", answer: "\\(35-4=31\\)" },
        { prompt: "\\(\\binom b3\\binom g2=120\\), \\(g=4\\): \\(b\\)?", answer: "\\(6\\)" },
        { prompt: "Mixed-doubles matches from \\(n\\) couples with no couple in the same match?", answer: "\\(\\frac{n(n-1)(n-2)(n-3)}{2}\\)" },
      ],
      pyqExampleId: "b9850754-333a-46bb-8393-fb3629129307", // 2021 — committee of Indians and foreigners, twice as many foreigners
      traps: [
        {
          title: "Do not choose 'at least one' first",
          body: "Choosing one woman first and then any others counts the same committee several times. Split into exact cases, or use the complement.",
        },
      ],
    },

    // C2 — choose letters, then arrange
    {
      kind: "formula" as const,
      slug: "jpnc-select-arrange",
      name: "Choosing letters from a word",
      intuition:
        "When letters are taken from a word with repeats, split by pattern: all different, one pair and the rest different, two pairs, a triple, and so on. For each pattern count the choices of letters, then the arrangements with that pattern. For selections only (not words), stop before arranging.",
      definition:
        "- Patterns for 4 letters: all different, \\(2+1+1\\), \\(2+2\\), \\(3+1\\), \\(4\\).\n" +
        "- Arrangements of a pattern: \\(\\frac{4!}{2!}\\), \\(\\frac{4!}{2!\\,2!}\\), \\(\\frac{4!}{3!}\\).\n" +
        "- Vowels and consonants chosen separately: multiply, then arrange.",
      formula: {
        label: "One pattern",
        latex: "\\text{(choices of letters)}\\times\\frac{r!}{\\text{(repeats)}!}",
      },
      authoredExample: {
        prompt: "How many 3-letter words can be made from the letters of APPLE?",
        steps: [
          "Distinct letters A, P, L, E: all different \\({}^4P_3=24\\).",
          "PP with one of A, L, E: \\(3\\cdot\\frac{3!}{2!}=9\\).",
        ],
        answer: "\\(33\\).",
      },
      selfCheckExample: {
        prompt: "How many 3-letter words with one vowel and two consonants, no letter repeated, come from the letters of MOTHER?",
        steps: [
          "Vowels O, E: 2 ways; consonants M, T, H, R: \\(\\binom42=6\\); arrange \\(3!\\).",
        ],
        answer: "\\(2\\cdot6\\cdot6=72\\).",
      },
      practiceSet: [
        { prompt: "Selections of 2 letters from AAB?", answer: "\\(2\\) (AA, AB)" },
        { prompt: "Words of 2 letters from AAB?", answer: "\\(3\\)" },
        { prompt: "Arrangements of the pattern \\(2+2\\)?", answer: "\\(6\\)" },
        { prompt: "Arrangements of the pattern \\(3+1\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "c7ae60c9-4206-4049-81ba-4dcd6c5ccc82", // 2023 — 4-letter words, 2 vowels and 2 consonants, from UNIVERSE
      traps: [
        {
          title: "Distinct letters, not letter count",
          body: "UNIVERSE has 8 letters but E repeats; without repetition there are only 3 distinct vowels. Count distinct letters before choosing.",
        },
      ],
    },

    // C3 — nCr and nPr algebra
    {
      kind: "formula" as const,
      slug: "jpnc-formula",
      name: "Working with the nCr and nPr formulas",
      intuition:
        "Ratios of permutation or combination symbols cancel to short products: \\(\\frac{{}^nP_r}{{}^{n-1}P_{r-1}}=n\\), \\(\\frac{{}^{2n}C_3}{{}^nC_3}=\\frac{4(2n-1)}{n-2}\\). Pascal's rule combines neighbours. A sum like \\(\\sum k\\cdot k!\\) telescopes because \\(k\\cdot k!=(k+1)!-k!\\).",
      definition:
        "- \\({}^nP_r=\\frac{n!}{(n-r)!}\\), \\({}^nC_r=\\frac{n!}{r!\\,(n-r)!}\\).\n" +
        "- \\(\\binom nr+2\\binom n{r+1}+\\binom n{r+2}=\\binom{n+2}{r+2}\\).\n" +
        "- \\(k\\cdot k!=(k+1)!-k!\\).\n" +
        "- \\(\\frac{(mn)!}{(m!)^{n}}\\) is an integer (it counts arrangements into labelled groups).",
      formula: {
        label: "Telescoping",
        latex: "\\sum_{k=1}^{n}k\\cdot k!=(n+1)!-1",
      },
      authoredExample: {
        prompt: "If \\({}^nC_2=45\\), find \\(n\\).",
        steps: [
          "\\(\\frac{n(n-1)}{2}=45\\Rightarrow n(n-1)=90\\).",
        ],
        answer: "\\(n=10\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(1\\cdot1!+2\\cdot2!+3\\cdot3!\\).",
        steps: [
          "\\(4!-1\\).",
        ],
        answer: "\\(23\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{{}^nP_4}{{}^{n-1}P_3}\\)?", answer: "\\(n\\)" },
        { prompt: "\\(\\binom63+2\\binom64+\\binom65\\)?", answer: "\\(\\binom85=56\\)" },
        { prompt: "Is \\(\\frac{12!}{(3!)^4}\\) an integer?", answer: "Yes" },
        { prompt: "\\({}^nP_2=56\\): \\(n\\)?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "3b00684f-d3e8-48a6-a474-c9b277df89b6", // 2023 — 2nC3 : nC3 = 10 : 1
      traps: [
        {
          title: "Check which root is valid",
          body: "Equations in \\(n\\) from these formulas are often quadratic. Discard a root that is negative, not an integer, or smaller than \\(r\\).",
        },
      ],
    },
  ],
};
