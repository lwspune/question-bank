import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_CLUSTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter Clusters",
  title: "Letter Clusters",
  oneLineDefinition:
    "A cluster series is three or four letter series running side by side: read the first letters down the list, then the second, then the third, and each column gives one letter of the answer.",
  whyItMatters:
    "The biggest group in the chapter: 119 questions in the bank, 33 from the 2023 shifts, 32 from the 2024 shifts and 54 from the 2025 shifts, with 97 EASY and 22 MODERATE. In 37 every letter moves by the same step, in 78 each column has a step of its own, and in four a column's step grows or runs through the vowels. Done column by column, each one is under half a minute.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsecl-same",
      name: "Every letter moves by the same step",
      intuition:
        "When the whole cluster slides along the alphabet together, the step you find from the first letters works for every letter. Find it once, apply it three times, and you are done.",
      definition:
        "- **Write the clusters one under another** so the columns line up.\n" +
        "- **Find the step from the first column** (positions: 4, 7, 10 is +3).\n" +
        "- **Test it on one more column.** If it fits, the whole cluster moves together: add the step to every letter of the last cluster.\n" +
        "- **Clusters of consecutive letters** (BCD, EFG, HIJ) are this case too: the start letter moves by a fixed step and the rest follow it.\n" +
        "- **Fast route:** apply the step to the first letter, strike out options that start differently, then check the last letter of what is left.",
      authoredExample: {
        prompt: "Which cluster comes next: DHM, GKP, JNS, ?",
        steps: [
          "First letters D, G, J are 4, 7, 10: +3, so next is 13, M.",
          "Second letters H, K, N are 8, 11, 14: +3 again, so the cluster moves as one block.",
          "Third letters M, P, S go on to V. The next cluster is M, Q, V.",
        ],
        answer: "MQV",
      },
      selfCheckExample: {
        prompt: "Which cluster comes next: WSO, UQM, SOK, ?",
        steps: [
          "Every column moves back 2: W, U, S, Q; S, Q, O, M; O, M, K, I.",
        ],
        answer: "QMI",
      },
      practiceSet: [
        { prompt: "Which cluster comes next: ACE, DFH, GIK, ?", answer: "JLN", method: "Every letter moves forward 3." },
        { prompt: "Which cluster comes next: XZB, ZBD, BDF, ?", answer: "DFH", method: "Every letter moves forward 2, wrapping from Z to B." },
        { prompt: "Which cluster comes next: QRS, NOP, KLM, ?", answer: "HIJ", method: "Three letters in a row, each block starting 3 places earlier." },
        { prompt: "Which cluster comes next: KPU, PUZ, UZE, ?", answer: "ZEJ", method: "Every letter moves forward 5." },
      ],
      pyqExampleId: "e553b59d-0972-4392-ba8a-3e7debceb90e",
      traps: [
        {
          title: "Checking only the first letter",
          body:
            "SSC's wrong options usually share the right first letter and change the last one. After the first column, always check the last column too.",
        },
        {
          title: "Wrapping in the middle of a cluster",
          body:
            "V + 6 is 28, and \\(28 - 26 = 2\\), so the letter is B. A cluster can wrap in one column while the others do not, so wrap each letter on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsecl-own",
      name: "Each column has its own step",
      intuition:
        "Most SSC clusters are built so that the columns move differently: one forward by 3, one back by 2, one standing still. Nothing about one column tells you about the next, so each needs its own look.",
      definition:
        "- **Write the step above each column** before writing any letter of the answer, for example +3, \\(-2\\), +1.\n" +
        "- **Forward and back both appear.** A column of W, U, S, Q is going back 2.\n" +
        "- **A column can stand still** (every cluster starts with the same letter); that letter simply stays.\n" +
        "- **Steps are often a family:** +2, +4, +6 or +3, +6, +9 across the columns. Spotting it is a check, not a requirement.\n" +
        "- **Missing cluster in the middle:** find each column's step from the clusters on both sides, then fill the gap and check it leads on to the next cluster.",
      authoredExample: {
        prompt: "Which cluster comes next: BZM, EXN, HVO, ?",
        steps: [
          "First column B, E, H: 2, 5, 8, so +3 and next is 11, K.",
          "Second column Z, X, V: 26, 24, 22, so \\(-2\\) and next is 20, T.",
          "Third column M, N, O: +1, so next is P.",
        ],
        answer: "KTP",
      },
      selfCheckExample: {
        prompt: "Which cluster comes next: TFQ, QJP, NNO, ?",
        steps: [
          "First column 20, 17, 14: \\(-3\\), so 11, K.",
          "Second column 6, 10, 14: +4, so 18, R. Third column 17, 16, 15: \\(-1\\), so 14, N.",
        ],
        answer: "KRN",
      },
      practiceSet: [
        { prompt: "Which cluster comes next: MAH, OEG, QIF, ?", answer: "SME", method: "+2, +4 and \\(-1\\) in the three columns." },
        { prompt: "Which cluster comes next: GDKW, GHPS, GLUO, ?", answer: "GPZK", method: "G stays; then +4, +5 and \\(-4\\)." },
        { prompt: "Which cluster comes next: YCP, WFP, UIP, ?", answer: "SLP", method: "\\(-2\\), +3, and P stays." },
        { prompt: "Which cluster comes next: JAZ, LDX, NGV, ?", answer: "PJT", method: "+2, +3 and \\(-2\\)." },
      ],
      pyqExampleId: "654aeec5-1c6f-4ccb-8896-b26ca06c79cd",
      traps: [
        {
          title: "Assuming all columns go the same way",
          body:
            "If the first column moves forward 3, the second may still move back 2. Copying the first column's step to the others is the error most wrong options are built on.",
        },
        {
          title: "Wrapping backwards",
          body:
            "C moved back 5 is \\(3 - 5 = -2\\), and \\(-2 + 26 = 24\\), which is X. Add 26 when the number drops below 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsecl-growing",
      name: "Steps that grow and vowel columns",
      intuition:
        "Now and then one column does not keep a fixed step. Treat that column as a tiny number series: its steps go up by one, or the letters walk through the vowels.",
      definition:
        "- **Growing step:** a column of D, E, G, J has steps 1, 2, 3, so the next step is 4. Work it like a difference series.\n" +
        "- **Vowel column:** A, E, I, O, U in order (or backwards). The gaps are 4, 4, 6, 6, so they do not look steady; recognise the letters instead.\n" +
        "- **A vowel column needs four terms to be sure.** With only E, I, O written, the steps 4, 6 could also grow to 8. When a question shows only three, let the other columns and the options decide.\n" +
        "- **The other columns are usually plain,** so solve them first and use them to cut the options down.",
      authoredExample: {
        prompt: "Which cluster comes next: CPA, DOC, FNF, ?",
        steps: [
          "First column C, D, F: 3, 4, 6, steps 1 and 2, so the next step is 3: 9, I.",
          "Second column P, O, N: back 1, so M.",
          "Third column A, C, F: 1, 3, 6, steps 2 and 3, so the next step is 4: 10, J.",
        ],
        answer: "IMJ",
      },
      selfCheckExample: {
        prompt: "Which cluster comes next: ABZ, ECY, IDX, OEW, ?",
        steps: [
          "First column A, E, I, O: the vowels, so next is U.",
          "Second column B, C, D, E: +1, so F. Third column Z, Y, X, W: back 1, so V.",
        ],
        answer: "UFV",
      },
      practiceSet: [
        { prompt: "Which cluster comes next: BRK, CSL, EUM, ?", answer: "HXN", method: "Steps 1, 2, then 3 in the first two columns; the third goes +1." },
        { prompt: "Which cluster comes next: KMT, LOR, NRO, ?", answer: "QVK", method: "Steps 1, 2, 3; 2, 3, 4; and \\(-2\\), \\(-3\\), \\(-4\\)." },
        { prompt: "Which vowel comes after O in the order A, E, I, O?", answer: "U" },
        { prompt: "A column of a cluster series reads F, G, I, L. What is its next letter?", answer: "P", method: "Steps 1, 2, 3, then 4: \\(12 + 4 = 16\\)." },
      ],
      pyqExampleId: "7e0c01bc-a50c-40c9-9056-565afb870f6d",
      traps: [
        {
          title: "Forcing a fixed step on a growing column",
          body:
            "In a column of K, M, P, T the steps are 2, 3, 4. A fixed step of 3 gives W, but the next step is 5, so the letter is Y.",
        },
      ],
    },
  ],
};
