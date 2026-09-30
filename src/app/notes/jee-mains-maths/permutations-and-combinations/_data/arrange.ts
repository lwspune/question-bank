import type { SubtopicNote } from "@/app/notes/_types";

export const ARRANGE_PNC_NOTE: SubtopicNote = {
  subtopicName: "Arrangements with Restrictions",
  title: "Arrangements with Restrictions",
  oneLineDefinition:
    "Arranging people, letters or objects in a row or around a table when some must stay together, some must stay apart, or some items repeat.",
  whyItMatters:
    "Nineteen PYQs, ten of them numerical answer. Twelve put a condition on who sits next to whom, solved by blocks, by gaps, or by subtracting the unwanted cases. The rest arrange repeated items or count sequences, where dividing by the repeats does the work. Two ideas cover the page.",
  concepts: [
    // C1 — blocks, gaps and complements
    {
      kind: "formula" as const,
      slug: "jpnc-block",
      name: "Together, apart and around a table",
      intuition:
        "To keep a group together, glue it into one block, arrange the blocks, then arrange inside the block. To keep items apart, first arrange the others, then drop the separated items into the gaps between them. 'Never all together' is the total minus 'all together'. Around a round table one seat is fixed, so \\(n\\) people sit in \\((n-1)!\\) ways.",
      definition:
        "- Together: treat as one block; multiply by the inner arrangements.\n" +
        "- Apart: arrange the others, then choose gaps: \\(n\\) items leave \\(n+1\\) gaps in a row, \\(n\\) around a circle.\n" +
        "- Not all together \\(=\\) total \\(-\\) all together.\n" +
        "- Circular: \\((n-1)!\\).\n" +
        "- Either \\(A\\) or \\(B\\): \\(|A|+|B|-|A\\cap B|\\).",
      formula: {
        label: "No two of k items together (row)",
        latex: "n!\\times{}^{n+1}P_{k}\\quad(n\\ \\text{others arranged, then}\\ k\\ \\text{items in the gaps})",
      },
      authoredExample: {
        prompt: "In how many ways can 4 boys and 3 girls stand in a row so that no two girls are together?",
        steps: [
          "Arrange the boys: \\(4!=24\\). They leave 5 gaps.",
          "Place the 3 girls in 3 of the 5 gaps: \\({}^5P_3=60\\).",
        ],
        answer: "\\(24\\cdot60=1440\\).",
      },
      selfCheckExample: {
        prompt: "In how many arrangements of the letters of EQUATION do the consonants stay together?",
        steps: [
          "The consonants Q, T, N form one block; with the 5 vowels that is 6 units: \\(6!\\), times \\(3!\\) inside the block.",
        ],
        answer: "\\(720\\cdot6=4320\\).",
      },
      practiceSet: [
        { prompt: "5 people around a round table?", answer: "\\(24\\)" },
        { prompt: "Arrangements of ABCDE with A and B together?", answer: "\\(2\\cdot4!=48\\)" },
        { prompt: "Arrangements of ABCDE with A and B apart?", answer: "\\(120-48=72\\)" },
        { prompt: "Gaps left by 6 people in a row?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "d9dcf338-cb8b-458e-bfeb-56f3510c31dd", // 2025 — DAUGHTER, vowels never all together
      traps: [
        {
          title: "Not together is not the same as apart",
          body: "'All the vowels never together' allows two of them to be adjacent; it is the total minus the all-together case. 'No two vowels together' is the gap method. Read which one is asked.",
        },
      ],
    },

    // C2 — repeated items and sequences
    {
      kind: "formula" as const,
      slug: "jpnc-repeat",
      name: "Repeated items, sequences and derangements",
      intuition:
        "With repeats, arrangements are \\(\\frac{n!}{p!\\,q!\\cdots}\\): swapping identical items changes nothing. A sequence of 0s, 1s and 2s with fixed counts is the same problem. A choice made independently at each step — a floor for each person, a character for each password position — multiplies. A derangement, where nobody is in their own place, is counted by inclusion–exclusion: \\(D_n=n!\\sum_{k=0}^{n}\\frac{(-1)^k}{k!}\\).",
      definition:
        "- \\(n\\) items with repeats \\(p,q,\\dots\\): \\(\\frac{n!}{p!\\,q!\\cdots}\\).\n" +
        "- Independent choices: multiply; 'at least one of a kind' \\(=\\) total \\(-\\) none of that kind.\n" +
        "- Derangements: \\(D_3=2,\\ D_4=9,\\ D_5=44\\).\n" +
        "- A series won when one side reaches \\(k\\) wins: the last game is the winner's, so count the earlier games.",
      formula: {
        label: "Arrangements with repeats",
        latex: "\\frac{n!}{p!\\,q!\\,r!\\cdots}",
      },
      authoredExample: {
        prompt: "How many arrangements of the letters of BANANA are there?",
        steps: [
          "6 letters with A three times and N twice.",
        ],
        answer: "\\(\\frac{6!}{3!\\,2!}=60\\).",
      },
      selfCheckExample: {
        prompt: "Four letters are put in four addressed envelopes. In how many ways is every letter in a wrong envelope?",
        steps: [
          "\\(D_4=24\\left(1-1+\\frac12-\\frac16+\\frac1{24}\\right)\\).",
        ],
        answer: "\\(9\\).",
      },
      practiceSet: [
        { prompt: "Arrangements of AABBB?", answer: "\\(10\\)" },
        { prompt: "3 people leaving a lift at 5 floors, all on different floors?", answer: "\\(60\\)" },
        { prompt: "Strings of length 3 from \\(\\{a,b\\}\\) with at least one \\(a\\)?", answer: "\\(7\\)" },
        { prompt: "\\(D_5\\)?", answer: "\\(44\\)" },
      ],
      pyqExampleId: "2ddb5989-ccdb-417e-ae96-460c48139d7c", // 2025 — ten-term sequences with five 1s and three 2s
      traps: [
        {
          title: "People are distinct, floors are distinct",
          body: "When people leave a lift, each person picks a floor; the order of choosing does not matter but the people do. '4 get off at one floor and 5 at another' is a choice of the 4 people times an ordered pair of floors.",
        },
      ],
    },
  ],
};
