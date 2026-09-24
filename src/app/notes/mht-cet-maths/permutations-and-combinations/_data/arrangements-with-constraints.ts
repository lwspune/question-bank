import type { SubtopicNote } from "@/app/notes/_types";

export const ARRANGEMENTS_WITH_CONSTRAINTS_NOTE: SubtopicNote = {
  subtopicName: "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
  title: "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
  oneLineDefinition:
    "Arrange in a row under a condition: divide by k! for each letter repeated k times, glue a together-group into one block, place never-together items in the gaps, and fill a fixed position before counting the rest.",
  whyItMatters:
    "10 PYQs at 50% HARD — the chapter's most expensive large page and the one where a single misread word costs the mark. " +
    "Word stems recur with the same letters (CALCULATE, HAVANA, MANAMA, BARRACK) and the same three constraints — a fixed first and last letter, two letters kept apart, a group kept together — and the students-on-a-platform stem has been set twice. " +
    "Every one is answered by the four moves below in some order; the difficulty is only in choosing the order.",
  concepts: [
    // 1 — repeated letters
    {
      kind: "formula" as const,
      slug: "cetpc-arrangements-with-repeated-letters",
      name: "Repeated Letters: Divide n! by k! for Each Repeat",
      intuition:
        "Swapping two identical A's changes nothing, so \\(n!\\) over-counts by the \\(k!\\) internal orders of each repeated letter. HAVANA has \\(6\\) letters with A three times: \\(\\dfrac{6!}{3!} = 120\\) distinct words.",
      definition:
        "- Arrangements of \\(n\\) objects with \\(p\\) alike, \\(q\\) alike, …: \\(\\dfrac{n!}{p!\\,q!\\cdots}\\).\n" +
        "- Write the letter census FIRST. CALCULATE: C,C · L,L · A,A · U,T,E (\\(9\\) letters). MANAMA: M,M · A,A,A · N (\\(6\\)). BARRACK: A,A · R,R · B,C,K (\\(7\\)). 223355888: \\(2,2 \\cdot 3,3 \\cdot 5,5 \\cdot 8,8,8\\).\n" +
        "- **Positions restricted by type**: odd digits \\(3,3,5,5\\) into the \\(4\\) even positions in \\(\\dfrac{4!}{2!\\,2!} = 6\\) ways, even digits \\(2,2,8,8,8\\) into the \\(5\\) odd positions in \\(\\dfrac{5!}{2!\\,3!} = 10\\) ways: \\(60\\).\n" +
        "- **Short words from a multiset** (four-letter words from BARRACK) go by cases on the repeat pattern: all different \\({}^5P_4 = 120\\); one pair + two singles \\({}^2C_1 \\cdot {}^4C_2 \\cdot \\dfrac{4!}{2!} = 144\\); two pairs \\(\\dfrac{4!}{2!\\,2!} = 6\\); total \\(270\\).",
      formula: {
        label: "Permutations of a multiset",
        latex:
          "\\frac{n!}{p!\\,q!\\,r!\\cdots}",
      },
      authoredExample: {
        prompt: "How many distinct arrangements of the letters of BANANA have the two N's in the first and last positions?",
        steps: [
          "The N's are fixed at the ends (identical, so \\(1\\) way).",
          "Middle four letters B, A, A, A: \\(\\dfrac{4!}{3!} = 4\\).",
        ],
        answer: "\\(4\\)",
      },
      selfCheckExample: {
        prompt: "How many distinct arrangements of the digits of \(1223344\) have the two \(4\)'s at the two ends?",
        steps: [
          "The ends are fixed by the identical \(4\)'s (\(1\) way).",
          "Middle five digits \(1, 2, 2, 3, 3\): \(\dfrac{5!}{2!\,2!} = 30\).",
        ],
        answer: "\(30\)",
      },
      practiceSet: [
        {
          prompt: "Arrangements of ASSAM?",
          answer: "\\(30\\)",
          method: "\\(5!/(2!\\,2!)\\).",
        },
        {
          prompt: "Arrangements of LEVEL?",
          answer: "\\(30\\)",
        },
        {
          prompt: "Arrangements of \\(112233\\)?",
          answer: "\\(90\\)",
        },
        {
          prompt: "Arrangements of MISSISSIPPI?",
          answer: "\\(34650\\)",
          method: "\\(11!/(4!\\,4!\\,2!)\\).",
        },
      ],
      pyqExampleId: "b360d7d5-0526-4a42-9bd2-72651f011780",
      traps: [
        {
          title: "Counting the letters wrong",
          body:
            "Every word question is lost at the census. CALCULATE is nine letters, not eight; BARRACK has two R's AND two A's. Write the tally before any factorial.",
        },
      ],
    },

    // 2 — fixed positions
    {
      kind: "formula" as const,
      slug: "cetpc-fixed-positions-first",
      name: "Fixed Positions: Fill the Constrained Slots First, Then the Rest",
      intuition:
        "A constraint on particular positions (first and last letter must be consonants; \\(B_1\\) sits second) removes choices, so those slots are filled first, and whatever is left fills the remaining slots freely.",
      definition:
        "- CALCULATE starting and ending with a consonant: the consonants are C,C,L,L,T. Choose the ordered pair for the ends, then arrange the remaining \\(7\\) letters with their repeats — summing over the end-pair patterns gives \\(\\dfrac{5 \\times 7!}{2}\\) as the key has it.\n" +
        "- Five students on a platform, \\(B_1\\) in position \\(2\\), \\(G_1G_2\\) adjacent: \\(B_1\\) is placed (\\(1\\) way); the girls need two ADJACENT free positions from \\(\\{1, 3, 4, 5\\}\\) — only \\((3,4)\\) and \\((4,5)\\) — in \\(2\\) internal orders; the last two students fill the last two seats in \\(2!\\): \\(2 \\times 2 \\times 2 = 8\\).\n" +
        "- Order of operations: most-constrained slot first. If two constraints compete (a fixed seat AND an adjacent pair), place the fixed one, then LIST the adjacent pairs that remain possible rather than assuming \\(n - 1\\) of them.",
      formula: {
        label: "Constrained slots first",
        latex:
          "\\text{ways} = (\\text{fill constrained slots}) \\times (\\text{arrange what remains})",
      },
      authoredExample: {
        prompt: "How many arrangements of the letters of ORANGE begin with a vowel and end with a consonant?",
        steps: [
          "Vowels O, A, E (\\(3\\)); consonants R, N, G (\\(3\\)). First slot: \\(3\\) ways; last slot: \\(3\\) ways.",
          "Remaining \\(4\\) letters in the middle: \\(4! = 24\\). Total \\(3 \\times 3 \\times 24 = 216\\).",
        ],
        answer: "\\(216\\)",
      },
      selfCheckExample: {
        prompt: "Six people stand in a row. \\(P\\) must be at one end and \\(Q\\), \\(R\\) must be adjacent. How many arrangements?",
        steps: [
          "\\(P\\) at an end: \\(2\\) ways. Of the \\(5\\) remaining consecutive positions, adjacent pairs: \\(4\\); \\(Q, R\\) in \\(2\\) orders.",
          "Last \\(3\\) people in \\(3!\\). Total \\(2 \\times 4 \\times 2 \\times 6 = 96\\).",
        ],
        answer: "\\(96\\)",
      },
      practiceSet: [
        {
          prompt: "Arrangements of \\(5\\) people with a given person first?",
          answer: "\\(24\\)",
        },
        {
          prompt: "Arrangements of \\(5\\) people with a given person NOT first?",
          answer: "\\(96\\)",
          method: "\\(4 \\times 4!\\).",
        },
        {
          prompt: "Adjacent position-pairs among seats \\(\\{1, 3, 4, 5\\}\\)?",
          answer: "\\(2\\): \\((3,4)\\), \\((4,5)\\).",
        },
        {
          prompt: "Words from TABLE with T first and E last?",
          answer: "\\(6\\)",
        },
      ],
      pyqExampleId: "2d472872-935f-48ea-92de-aa92b305a3f8",
      traps: [
        {
          title: "Assuming four adjacent pairs remain",
          body:
            "After \\(B_1\\) takes seat \\(2\\), seats \\(1\\) and \\(3\\) are no longer adjacent. The count of adjacent pairs is \\(2\\), not \\(3\\) or \\(4\\); option (B) \\(12\\) is what \\(3\\) pairs would give.",
        },
      ],
    },

    // 3 — together: block method
    {
      kind: "formula" as const,
      slug: "cetpc-together-block-method",
      name: "Together: Glue the Group Into One Block, Then Arrange Inside It",
      intuition:
        "Items that must stay together are one object for the outer arrangement. Count the arrangement of the blocks, then multiply by the internal orders of each block.",
      definition:
        "- \\(3\\) Physics + \\(2\\) Chemistry + \\(4\\) Maths books, Physics together and Maths together: units are \\(P\\), \\(M\\), \\(C_1\\), \\(C_2\\) — \\(4!\\) ways; inside \\(P\\): \\(3!\\); inside \\(M\\): \\(4!\\). Total \\(24 \\times 6 \\times 24 = 3456\\).\n" +
        "- A block of \\(k\\) distinct items contributes \\(k!\\) internal orders; a block of identical items contributes \\(1\\).\n" +
        "- 'Exactly two letters repeated twice' in a \\(10\\)-letter word from \\(10\\) distinct letters: choose the two repeaters \\({}^{10}C_2\\), the six singles \\({}^8C_6\\), arrange \\(\\dfrac{10!}{2!\\,2!}\\); dividing by the no-repeat count \\(10!\\) gives \\(\\dfrac{45 \\times 28}{4} = 315\\).\n" +
        "- The block method also proves the total for the complement: 'together' is the thing subtracted in every 'never together' count.",
      formula: {
        label: "Block method",
        latex:
          "(\\text{blocks})! \\times \\prod (\\text{size of each block})!",
      },
      authoredExample: {
        prompt: "In how many ways can \\(4\\) boys and \\(3\\) girls stand in a row if all the girls stand together?",
        steps: [
          "Units: the girls' block + \\(4\\) boys = \\(5\\) units, \\(5! = 120\\).",
          "Inside the block \\(3! = 6\\). Total \\(720\\).",
        ],
        answer: "\\(720\\)",
      },
      selfCheckExample: {
        prompt: "Seven different books, of which \\(3\\) are on History, are shelved so that the History books are together and the two Economics books are also together. How many ways?",
        steps: [
          "Units: History block, Economics block, \\(2\\) others = \\(4\\) units, \\(4! = 24\\).",
          "Inside: \\(3! \\times 2! = 12\\). Total \\(288\\).",
        ],
        answer: "\\(288\\)",
      },
      practiceSet: [
        {
          prompt: "Words from GARDEN with the vowels together?",
          answer: "\\(240\\)",
          method: "\\(5! \\times 2!\\).",
        },
        {
          prompt: "\\(5\\) people in a row, \\(A\\) and \\(B\\) adjacent?",
          answer: "\\(48\\)",
        },
        {
          prompt: "\\(5\\) people, \\(A, B, C\\) together in that fixed order?",
          answer: "\\(6\\)",
          method: "\\(3!\\) with no internal factor.",
        },
        {
          prompt: "Arrangements of AAABB with the B's together?",
          answer: "\\(4\\)",
        },
      ],
      pyqExampleId: "d67660c4-c482-4f5c-848e-080aa4200823",
      traps: [
        {
          title: "Forgetting the inside of the block",
          body:
            "\\(4! = 24\\) counts the blocks only; without \\(3! \\times 4!\\) inside, the answer is \\(24\\) instead of \\(3456\\). Conversely, a block of identical letters has NO inside factor.",
        },
      ],
    },

    // 4 — never together: gaps or complement
    {
      kind: "formula" as const,
      slug: "cetpc-never-together-gap-and-complement",
      name: "Never Together: Total Minus Together, or Place Them in the Gaps",
      intuition:
        "Two ways to keep items apart. Complement: count all arrangements, subtract the ones with the items glued. Gap method: arrange everyone else first, then drop the restricted items into the \\(k + 1\\) gaps they create — never two in one gap.",
      definition:
        "- **Complement** (HAVANA, V and N apart): total \\(\\dfrac{6!}{3!} = 120\\); V,N glued as a block \\(\\dfrac{5!}{3!} \\times 2 = 40\\); apart \\(120 - 40 = 80\\).\n" +
        "- **Gap method** (MANAMA, M's apart): arrange A,N,A,A in \\(\\dfrac{4!}{3!} = 4\\) ways; they make \\(5\\) gaps; two IDENTICAL M's into two gaps: \\({}^5C_2 = 10\\); total \\(40\\). Distinct items in gaps use \\({}^{k+1}P_r\\) instead.\n" +
        "- Choose the method by the count: two items apart — complement is quickest; three or more items pairwise apart — the gap method, since the complement needs inclusion-exclusion.\n" +
        "- The gap method needs enough gaps: \\(r\\) items apart need \\(r \\le k + 1\\) gaps, or the count is \\(0\\).",
      formula: {
        label: "Two routes to 'apart'",
        latex:
          "\\text{apart} = \\text{total} - \\text{together} \\qquad \\text{or} \\qquad (\\text{others})! \\times {}^{k+1}P_r \\ (\\text{or } {}^{k+1}C_r \\text{ if identical})",
      },
      authoredExample: {
        prompt: "In how many ways can \\(4\\) boys and \\(3\\) girls stand in a row so that no two girls are adjacent?",
        steps: [
          "Boys first: \\(4! = 24\\), creating \\(5\\) gaps.",
          "Girls into \\(3\\) different gaps: \\({}^5P_3 = 60\\). Total \\(24 \\times 60 = 1440\\).",
        ],
        answer: "\\(1440\\)",
      },
      selfCheckExample: {
        prompt: "How many arrangements of the letters of SALAD have the two A's not adjacent?",
        steps: [
          "Total \\(\\dfrac{5!}{2!} = 60\\). A's together: block + S, L, D = \\(4! = 24\\) (identical A's, no inside factor).",
          "Apart: \\(60 - 24 = 36\\). Check by gaps: S, L, D in \\(3! = 6\\) ways, \\(4\\) gaps, \\({}^4C_2 = 6\\): \\(36\\).",
        ],
        answer: "\\(36\\)",
      },
      practiceSet: [
        {
          prompt: "\\(5\\) people, \\(A\\) and \\(B\\) not adjacent?",
          answer: "\\(72\\)",
          method: "\\(120 - 48\\).",
        },
        {
          prompt: "Gaps created by \\(6\\) people in a row?",
          answer: "\\(7\\)",
        },
        {
          prompt: "\\(3\\) boys and \\(2\\) girls, girls apart?",
          answer: "\\(72\\)",
          method: "\\(3! \\times {}^4P_2\\).",
        },
        {
          prompt: "Arrangements of AABBB with A's apart?",
          answer: "\\(6\\)",
          method: "B's make \\(4\\) gaps: \\({}^4C_2\\).",
        },
      ],
      pyqExampleId: "cb8ad327-6353-44b7-8f37-607cd30571ea",
      traps: [
        {
          title: "Using nPr for identical items in gaps",
          body:
            "Two identical M's into \\(5\\) gaps is \\({}^5C_2 = 10\\), not \\({}^5P_2 = 20\\). The doubled answer \\(80\\) is option (C) on the MANAMA stem.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Circular Arrangements — the same block and gap moves around a table",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-circular-arrangements",
    },
    {
      label: "Fundamental Principle, nPr and nCr — select-then-arrange",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-fundamentals",
    },
  ],
};
