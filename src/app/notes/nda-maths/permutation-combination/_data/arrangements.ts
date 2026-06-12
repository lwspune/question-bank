import type { SubtopicNote } from "@/app/notes/_types";

export const ARRANGEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Arrangements with Restrictions",
  title: "Permutations & Restricted Arrangements",
  oneLineDefinition:
    "Arranging objects in order — distinct or with repeated letters — and handling the standard restrictions: things together, things apart, and fixed positions.",
  whyItMatters:
    "Word-arrangement questions are a guaranteed NDA appearance. A few reliable moves — divide by repeats, treat a group as one block, fill restricted slots first — cover almost all of them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "pc-permutations-basics",
      name: "Arranging objects (with repeats)",
      intuition:
        "Arranging \\(n\\) distinct objects gives \\(n!\\) orders. When letters repeat, identical arrangements are over-counted, so divide by the factorial of each repeat count.",
      definition:
        "\\(n\\) distinct objects: \\(n!\\) arrangements. With repeats — \\(n\\) objects where one letter appears \\(p\\) times, another \\(q\\) times, etc.: \\(\\dfrac{n!}{p!\\,q!\\cdots}\\). (E.g. MATHEMATICS: 11 letters with M, A, T each twice ⇒ \\(\\dfrac{11!}{2!\\,2!\\,2!}\\).)",
      authoredExample: {
        prompt: "How many arrangements of the letters of LEVEL are there?",
        steps: [
          "5 letters with L twice and E twice.",
          "\\(\\dfrac{5!}{2!\\,2!}=\\dfrac{120}{4}=30\\).",
        ],
        answer: "\\(30\\).",
      },
      selfCheckExample: {
        prompt: "How many distinct words can be formed from the letters of DELHI?",
        steps: [
          "5 distinct letters, no repeats.",
          "\\(5!=120\\).",
        ],
        answer: "\\(120\\).",
      },
      practiceSet: [
        { prompt: "Arrangements of \\(n\\) distinct objects?", answer: "\\(n!\\)" },
        { prompt: "Arrangements of MATHEMATICS?", answer: "\\(\\dfrac{11!}{2!\\,2!\\,2!}\\)" },
        { prompt: "Why divide by repeat-factorials?", answer: "Identical arrangements are over-counted" },
        { prompt: "Arrangements of LEVEL?", answer: "\\(30\\)" },
      ],
      traps: [
        {
          title: "Repeated letters → divide by the repeat-factorials",
          body: "The arrangements of a word with repeated letters is **not** \\(n!\\). For each letter repeated \\(p\\) times, swapping those identical copies gives the *same* word, so you over-count by \\(p!\\). Divide: MATHEMATICS (M, A, T each twice) has \\(\\dfrac{11!}{2!\\,2!\\,2!}\\), not \\(11!\\).",
        },
      ],
      pyqExampleId: "7c0c76a0-ac2d-45ef-8823-3ed7364b9493", // letters of a word
    },

    {
      kind: "formula" as const,
      slug: "pc-restricted-arrangements",
      name: "Restrictions: together, apart, fixed positions",
      intuition:
        "Restrictions reshape the count. 'Together' → glue the group into one block. 'Apart/alternating' → place the others first, then drop the rest into the gaps. 'Fixed slots' (even positions, vowels in odd places) → fill the constrained slots first, then the rest.",
      definition:
        "- **Together (block):** treat the \\(k\\) items as one unit ⇒ \\((n-k+1)!\\) for the units \\(\\times\\,k!\\) inside.\n" +
        "- **Apart / alternating:** arrange the unrestricted items, then choose gaps for the rest.\n" +
        "- **Fixed positions:** fill the restricted positions first (e.g. vowels into the even slots), then fill the remaining positions.",
      authoredExample: {
        prompt: "In how many ways can 4 boys and 3 girls sit in a row with all girls together?",
        steps: [
          "Glue the 3 girls into one block ⇒ 5 units (4 boys + block): \\(5!\\).",
          "Girls within the block: \\(3!\\). Total \\(=5!\\times 3!=720\\).",
        ],
        answer: "\\(720\\).",
      },
      selfCheckExample: {
        prompt: "How many arrangements of TIGER have both vowels in the two even positions?",
        steps: [
          "Even positions are 2 and 4 — place the 2 vowels (I, E) there: \\(2!\\).",
          "Remaining 3 consonants in the 3 odd slots: \\(3!\\). Total \\(=2!\\times 3!=12\\).",
        ],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "'Together' is handled by which method?", answer: "Block (glue into one unit)" },
        { prompt: "Block of \\(k\\) among \\(n\\): factor for inside?", answer: "\\(k!\\)" },
        { prompt: "'Apart' is handled by?", answer: "Place others first, use the gaps" },
        { prompt: "Fixed-position items: fill which slots first?", answer: "The restricted ones" },
      ],
      pyqExampleId: "41465fc6-2683-4234-96c4-ca52f1d2fbb7", // 8-letter words restriction
    },
  ],
  related: [
    { label: "Factorials & Coefficients", href: "/notes/nda-maths/permutation-combination/pc-factorials-coefficients" },
    { label: "Combinations", href: "/notes/nda-maths/permutation-combination/pc-combinations" },
  ],
};
