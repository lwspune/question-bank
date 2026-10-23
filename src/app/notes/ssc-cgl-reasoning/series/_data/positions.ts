import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_POSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Letter Positions and Gaps",
  title: "Letter Positions and Gaps",
  oneLineDefinition:
    "Turn each letter into its place in the alphabet, write the gaps between the numbers, and carry the gap on to the next letter.",
  whyItMatters:
    "Thirty-one questions in the bank, twenty-five of them from the 2025 shifts: twenty-six EASY and five MODERATE. Thirteen ask for the next single letter, fourteen for the next pair of letters and four fill the blanks in a run of the alphabet. Every other letter page in this chapter rests on the same skill: knowing where each letter sits without counting on your fingers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsepo-steps",
      name: "Letter positions and the gap rule",
      intuition:
        "A letter series is a number series in disguise. Once B is 2 and T is 20, the question is only about the gaps between the numbers, and the gaps are nearly always the same each time or grow by one.",
      definition:
        "- **Positions:** A1 B2 C3 D4 E5 F6 G7 H8 I9 J10 K11 L12 M13 N14 O15 P16 Q17 R18 S19 T20 U21 V22 W23 X24 Y25 Z26.\n" +
        "- **Anchor letters (EJOTY):** E is 5, J is 10, O is 15, T is 20, Y is 25. Count one or two steps from the nearest anchor instead of from A.\n" +
        "- **Reverse position:** a letter's place counted from Z is 27 minus its place from A. So M (13) is 14th from the end.\n" +
        "- **Wrapping round:** past Z, take away 26 (Y + 4 is 29, which is C). Before A, add 26 (C \\(-\\) 5 is \\(-2\\), which is X).\n" +
        "- **Method:** write the positions, write the gaps, extend the gaps, turn the number back into a letter.\n" +
        "- **Growing gaps:** gaps of 2, 3, 4 go on as 5, 6. This is the same as a number series whose differences rise by one.",
      formula: {
        label: "Reverse position and wrapping round",
        latex: "n_{\\text{reverse}} = 27 - n \\qquad n > 26 \\Rightarrow n - 26 \\qquad n < 1 \\Rightarrow n + 26",
        symbols: [{ symbol: "\\(n\\)", meaning: "the letter's place counted from A" }],
      },
      authoredExample: {
        prompt: "What comes next: B, E, I, N, ?",
        steps: [
          "Positions: B is 2, E is 5, I is 9, N is 14.",
          "Gaps: 3, 4, 5. They grow by one, so the next gap is 6.",
          "\\(14 + 6 = 20\\), and 20 is T (an anchor letter, so no counting needed).",
        ],
        answer: "T",
      },
      selfCheckExample: {
        prompt: "What comes next: Y, U, Q, M, ?",
        steps: [
          "Positions: 25, 21, 17, 13. Each gap is 4 backwards.",
          "\\(13 - 4 = 9\\), which is I.",
        ],
        answer: "I",
      },
      practiceSet: [
        { prompt: "Which letter is 8th from the end of the English alphabet?", answer: "S", method: "\\(27 - 8 = 19\\), and 19 is S." },
        { prompt: "What comes next: C, H, M, R, ?", answer: "W", method: "Positions 3, 8, 13, 18 rise by 5; 23 is W." },
        { prompt: "What comes next: P, R, U, Y, ?", answer: "D", method: "Gaps 2, 3, 4, then 5: \\(25 + 5 = 30\\), and \\(30 - 26 = 4\\) is D." },
        { prompt: "Fill the gap: E, I, ?, Q, U", answer: "M", method: "Positions 5, 9, 13, 17, 21 rise by 4." },
      ],
      pyqExampleId: "a83c218e-d1fc-4c39-9b1b-9bd51c9bff67",
      traps: [
        {
          title: "Counting the starting letter as a step",
          body:
            "Three steps forward from D is G (4 + 3 = 7), not F. Work with the numbers, not by tapping letters, and the off-by-one slip cannot happen.",
        },
        {
          title: "Stopping at Z",
          body:
            "A series does not end at Z. When the number passes 26, take away 26 and carry on from A: W (23) plus 5 is 28, which is B.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsepo-pairs",
      name: "Pairs of letters, one letter at a time",
      intuition:
        "A term like DW is two separate series written side by side. Follow the first letters down the list, then the second letters, and the answer is just the two results put together.",
      definition:
        "- **Split the pair:** list the first letters, then the second letters. Each list has its own gap, and one list can go forward while the other goes back.\n" +
        "- **Opposite letters:** the pairs A Z, B Y, C X, D W, E V, F U, G T, H S, I R, J Q, K P, L O, M N add up to 27. When every term is an opposite pair, the next term is one too, which is a quick check on the options.\n" +
        "- **Places that take turns:** if one letter of the pair does not move steadily, check the odd terms and the even terms of that letter on their own.\n" +
        "- **Fast route:** find the first letter of the answer, strike out every option with a different first letter, and work the second letter only if two options are left.",
      authoredExample: {
        prompt: "What comes next: DW, FU, HS, ?",
        steps: [
          "First letters D, F, H are 4, 6, 8: forward 2, so next is 10, J.",
          "Second letters W, U, S are 23, 21, 19: back 2, so next is 17, Q.",
          "Check: J and Q are 10 and 17, which add to 27, an opposite pair like DW, FU and HS.",
        ],
        answer: "JQ",
      },
      selfCheckExample: {
        prompt: "What comes next: BK, EM, HO, ?",
        steps: [
          "First letters 2, 5, 8: forward 3, so 11, K.",
          "Second letters 11, 13, 15: forward 2, so 17, Q.",
        ],
        answer: "KQ",
      },
      practiceSet: [
        { prompt: "What comes next: LO, MN, NM, ?", answer: "OL", method: "First letters forward 1, second letters back 1." },
        { prompt: "What comes next: AE, CG, EI, ?", answer: "GK", method: "Both letters move forward 2." },
        { prompt: "What comes next: MD, OH, QL, ?", answer: "SP", method: "First letters forward 2 (13, 15, 17, 19), second forward 4 (4, 8, 12, 16)." },
        { prompt: "Which letter is the opposite of H, so that their positions add up to 27?", answer: "S", method: "\\(27 - 8 = 19\\), S." },
      ],
      pyqExampleId: "0e7e5b46-a919-4436-8285-0d2cc7272882",
      traps: [
        {
          title: "Opposite letters add to 27, not 26",
          body:
            "F is 6 and its opposite U is 21, and \\(6 + 21 = 27\\). Using 26 gives T, one letter off, and SSC often prints that letter as an option.",
        },
        {
          title: "Reading the pair as one jump",
          body:
            "In AZ, BY, CX the two letters move in opposite directions. Treating the pair as one block that moves forward gives a wrong second letter. Follow each letter on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsepo-runs",
      name: "Runs of the alphabet with blanks",
      intuition:
        "Some blank series are just the alphabet with a fixed pattern of letters left out. Find the skip pattern from the letters you can see, and the blanks fill themselves.",
      definition:
        "- **Write positions under the visible letters** and look at the gaps between them.\n" +
        "- **Common skip patterns:** every second letter (gap 2); two letters then one skipped; gaps that repeat in a cycle such as 3, 3, 2, 2; runs of four letters with three left out; every fifth letter left out.\n" +
        "- **Check the skipped letters too:** when the left-out letters themselves are evenly spaced (D, I, N, S, X are 5 apart), the pattern is confirmed.\n" +
        "- **Check every blank:** options often agree on the first blank and differ later.",
      authoredExample: {
        prompt: "Fill the blanks: A C _ G I _ M O _",
        steps: [
          "Visible positions: A 1, C 3, G 7, I 9, M 13, O 15. The gap is 2 everywhere you can check.",
          "So the run is 1, 3, 5, 7, 9, 11, 13, 15, 17: the odd places.",
          "The blanks are 5, 11 and 17: E, K and Q.",
        ],
        answer: "E, K, Q",
      },
      selfCheckExample: {
        prompt: "Fill the blank: A B D E G H _ K",
        steps: [
          "The letters come two at a time with one left out: A B (C) D E (F) G H (I).",
          "The next pair after I is J K, so the blank is J.",
        ],
        answer: "J",
      },
      practiceSet: [
        { prompt: "Fill the blanks: C F I _ O _ U", answer: "L, R", method: "Positions rise by 3: 3, 6, 9, 12, 15, 18, 21." },
        { prompt: "Fill the blank: Z X V _ R", answer: "T", method: "Back 2 each time: 26, 24, 22, 20, 18." },
        { prompt: "Which letters are left out of A B C E F G I J K M N O?", answer: "D, H, L", method: "Every fourth letter is skipped." },
        { prompt: "Fill the blanks: D H _ P T _", answer: "L, X", method: "Positions rise by 4: 4, 8, 12, 16, 20, 24." },
      ],
      pyqExampleId: "1970e175-65f2-4d80-b7f0-8d0d49c4d3ca",
      traps: [
        {
          title: "Checking only the first blank",
          body:
            "Two or three options usually start with the same letter. Fill every blank and make sure the whole run keeps its pattern before you choose.",
        },
      ],
    },
  ],
};
