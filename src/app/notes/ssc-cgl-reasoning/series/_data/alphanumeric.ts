import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_ALPHANUMERIC_NOTE: SubtopicNote = {
  subtopicName: "Alphanumeric and Pattern Series",
  title: "Alphanumeric and Pattern Series",
  oneLineDefinition:
    "Terms that mix letters with numbers are two or three small series in one: solve the letters and the number separately. A few series instead shuffle the letters of a word or follow a known order.",
  whyItMatters:
    "Twenty-three questions in the bank, two from the 2023 shifts, thirteen from the 2024 shifts and eight from the 2025 shifts: 21 EASY and two MODERATE. Fifteen are letter-and-number terms like FM61 where each part moves on its own, three weave two series together or pair a letter with its own position, and five rearrange letters or follow an order such as the levels of life. Each uses only the letter and number rules from earlier pages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrseal-parts",
      name: "Letters and numbers as separate series",
      intuition:
        "A term like HM71 is a letter cluster stuck to a number. The letters follow a letter rule and the number follows a number rule, and neither cares about the other.",
      definition:
        "- **Split each term** into its letter columns and its number.\n" +
        "- **Solve each part** with the earlier pages: positions and steps for the letters, differences or ratios for the number.\n" +
        "- **Fast route:** the number part is usually quickest. Work it out first and strike out every option with the wrong number; then check the letters of what is left.\n" +
        "- **The number can come first** (3P, 6N, 12L): the method is the same.",
      authoredExample: {
        prompt: "Which term comes next: CR12, FP17, IN22, LL27, ?",
        steps: [
          "First letters C, F, I, L are 3, 6, 9, 12: +3, so O.",
          "Second letters R, P, N, L are 18, 16, 14, 12: \\(-2\\), so J.",
          "Numbers 12, 17, 22, 27: +5, so 32. The term is OJ32.",
        ],
        answer: "OJ32",
      },
      selfCheckExample: {
        prompt: "Which term comes next: ZB40, XE36, VH32, ?",
        steps: [
          "Numbers fall by 4: 28. First letters go back 2: T. Second letters go forward 3: K.",
        ],
        answer: "TK28",
      },
      practiceSet: [
        { prompt: "Which term comes next: A2, D4, G6, J8, ?", answer: "M10", method: "Letters +3, numbers +2." },
        { prompt: "Which term comes next: QW5, RU10, SS15, ?", answer: "TQ20", method: "+1 and \\(-2\\) for the letters, +5 for the number." },
        { prompt: "Which term comes next: 3P, 6N, 12L, 24J, ?", answer: "48H", method: "The number doubles; the letter goes back 2." },
        { prompt: "Which term comes next: K90, M81, O72, ?", answer: "Q63", method: "Letter +2, number \\(-9\\)." },
      ],
      pyqExampleId: "2cb9e810-6225-4eb9-8428-15115bd56290",
      traps: [
        {
          title: "Right letters, wrong number",
          body:
            "SSC's options often share the correct letters and change only the number by one or two. Check every part of the term, not just the letters.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrseal-alternate",
      name: "Two series woven together, and letters with their positions",
      intuition:
        "In a row like G7, T20, H8, S19, the odd terms walk one way and the even terms walk the other. The numbers are usually just each letter's place in the alphabet.",
      definition:
        "- **Check odd and even places separately** when next-door terms look unrelated.\n" +
        "- **A letter with its own position:** C3, X24. The number is the letter's place from A, so it confirms the letter.\n" +
        "- **A letter with its reverse position:** A26, C24. The number is 27 minus the letter's place.\n" +
        "- **Decide which series the answer belongs to** by counting its place.",
      authoredExample: {
        prompt: "Which term comes next: E5, V22, F6, U21, G7, ?",
        steps: [
          "Odd places: E5, F6, G7, letters forward with their positions.",
          "Even places: V22, U21, letters backward with their positions.",
          "The 6th term is in the even series: after U21 comes T20.",
        ],
        answer: "T20",
      },
      selfCheckExample: {
        prompt: "Which term comes next: A26, C24, E22, G20, ?",
        steps: [
          "Letters go forward 2: A, C, E, G, so I.",
          "Each number is 27 minus the letter's place (A is 1 and \\(27 - 1 = 26\\)). I is 9, so \\(27 - 9 = 18\\).",
        ],
        answer: "I18",
      },
      practiceSet: [
        { prompt: "Which term comes next: B2, Y25, D4, W23, ?", answer: "F6", method: "Odd places B2, D4, then F6." },
        { prompt: "Which term comes next: Z1, A26, Y2, B25, X3, ?", answer: "C24", method: "Even places A26, B25, then C24." },
        { prompt: "Write the letter H together with its reverse position (its place counted from Z).", answer: "H19", method: "\\(27 - 8 = 19\\)." },
        { prompt: "Which term comes next: J10, Q17, K11, P16, ?", answer: "L12", method: "Odd places J10, K11, then L12." },
      ],
      pyqExampleId: "df1fe8d6-5804-4ce0-84ac-1f6020eb4171",
      traps: [
        {
          title: "Continuing the wrong series",
          body:
            "If the answer is the 5th term, it carries on the 1st and 3rd terms, not the 4th. Counting places first avoids picking the option that continues the other series.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrseal-patterns",
      name: "Rearranged letters and word series",
      intuition:
        "Some pattern series keep the same letters and only shuffle their order. Others are words in an order you already know. Both are solved by naming the rule exactly, then using it once more.",
      definition:
        "1. **Number the letters** of the first term 1, 2, 3, and so on.\n" +
        "2. **Write where each letter of the next term came from,** for example 3, 1, 2, 5, 4.\n" +
        "3. **Test the same order on the next pair.** If it does not work, find the second order: SSC series often switch between two orders.\n" +
        "4. **Apply the right order** to the last term.\n" +
        "5. **Word series:** the terms follow an order you know, such as days, months, the Greek letters (Alpha, Beta, Gamma, Delta, Epsilon) or the levels of life (atom, molecule, cell, tissue, organ).\n" +
        "6. **Digit patterns** such as 111X222, 222X333 move each part on by one.",
      authoredExample: {
        prompt: "Under one rule PLANT becomes LPNAT. What does STORM become under the same rule?",
        steps: [
          "Number PLANT: P1 L2 A3 N4 T5. LPNAT takes letters 2, 1, 4, 3, 5.",
          "So the first two letters swap and the next two swap; the last stays.",
          "STORM: S T swap to T S, O R swap to R O, M stays: TSROM.",
        ],
        answer: "TSROM",
      },
      selfCheckExample: {
        prompt: "What comes next: Monday, Wednesday, Friday, ?",
        steps: [
          "Each day skips one: Monday (Tuesday) Wednesday (Thursday) Friday.",
          "Skip Saturday: Sunday.",
        ],
        answer: "Sunday",
      },
      practiceSet: [
        { prompt: "Under a rule that swaps the first and last letters, CAT becomes TAC. What does DOG become?", answer: "GOD" },
        { prompt: "What comes next: January, April, July, ?", answer: "October", method: "Every third month." },
        { prompt: "What comes next: 12X21, 23X32, 34X43, ?", answer: "45X54" },
        { prompt: "What comes next: Tissue, Organ, Organ system, ?", answer: "Organism", method: "The levels of life, from smaller to larger." },
      ],
      pyqExampleId: "1eaf7820-de9f-4e80-8212-b0ee57796c55",
      traps: [
        {
          title: "Using one order for every step",
          body:
            "If the first rearrangement does not turn term 2 into term 3, the rule is not wrong: the series may switch between two orders. Find both before you apply one.",
        },
      ],
    },
  ],
};
