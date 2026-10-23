import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_MIXED_NOTE: SubtopicNote = {
  subtopicName: "Letter, Number and Symbol Groups",
  title: "Letter, Number and Symbol Groups",
  oneLineDefinition:
    "Each option is a short group of terms like K11@, mixing a letter, a number and a symbol. Three groups follow one pattern in every part; the odd group breaks it in one part.",
  whyItMatters:
    "Fourteen questions in the bank, all from the 2025 shifts, with 6 EASY and 8 MODERATE. Each term has three parts, and the odd group usually breaks the pattern in only one of them, so check every part before you choose.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclmx-position",
      name: "The number tied to the letter's position",
      intuition:
        "In most of these groups the number beside a letter is not random: it is the letter's place in the alphabet, or that place plus a fixed amount, or the place counted from Z. Once you know the link, the odd group is the one where a number or a letter step does not fit.",
      definition:
        "1. For each term, compare the number with the letter's position (A1 to Z26). Find the link the three groups share: the same, plus 1, plus 2, or the reverse position (27 minus the position).\n" +
        "2. Then check how the letters move from term to term: forward or back, and by how many places.\n" +
        "3. Then check how the numbers move. If they follow the letters, they step by the same amount.\n" +
        "4. The odd group breaks one of the three checks: a number off by one or two, a letter step of 3 among steps of 2, or a wrap missed.\n" +
        "- **Wrapping:** going back 3 from A reaches X (A1, X24). Forward past Z starts again at A.\n" +
        "- **Fast route:** look at the last term of each group first. Setters often build the odd group by changing only its last letter or last number.",
      authoredExample: {
        prompt: "Find the odd one out: (a) F6 : H8 : J10 (b) K11 : M13 : O15 (c) P16 : R18 : T20 (d) Q17 : S19 : V22",
        steps: [
          "Every number is its letter's position: F6, H8, J10 and so on, so that check passes everywhere.",
          "Letter steps: (a) F, H, J is +2, +2. (b) K, M, O is +2, +2. (c) P, R, T is +2, +2.",
          "(d) Q, S, V is +2, then +3. The last letter should be U.",
        ],
        answer: "(d) Q17 : S19 : V22",
      },
      selfCheckExample: {
        prompt: "In each term the number is the letter's position counted from Z (Z = 1, A = 26). Find the odd one out: (a) A26# (b) C24@ (c) E22% (d) G21&",
        steps: [
          "Reverse position = 27 minus the forward position.",
          "A: 27 minus 1 = 26. C: 27 minus 3 = 24. E: 27 minus 5 = 22.",
          "G: 27 minus 7 = 20, but the term carries 21.",
        ],
        answer: "(d) G21&",
      },
      practiceSet: [
        { prompt: "In the group T20 : Q17 : N14, how do the letters move?", answer: "Three places back each time", method: "T to Q and Q to N; the numbers fall by 3 to match." },
        { prompt: "A group pairs each letter with its position plus 2. What number goes with H?", answer: "10", method: "H is 8, and 8 + 2 = 10." },
        { prompt: "Find the odd one out: B2#, K11@, R18%, W24&", answer: "W24&", method: "W is the 23rd letter, not the 24th." },
        { prompt: "Which letter carries the number 5 when every number is the letter's position counted from Z?", answer: "V", method: "27 minus 5 = 22, which is V." },
      ],
      pyqExampleId: "4b3f9433-c1f9-433a-aeff-eaf0fbc6e916",
      traps: [
        {
          title: "Checking the letters but not the numbers",
          body:
            "A group can step its letters correctly and still carry one wrong number. For each term, test the number against the letter's position before you move on to the next term.",
        },
        {
          title: "Counting from the wrong end of the alphabet",
          body:
            "If the numbers are reverse positions (Z = 1), reading them as forward positions makes three groups look wrong at once. When no group fits A = 1, try Z = 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclmx-symbols",
      name: "Checking every part of the group",
      intuition:
        "Some odd groups get the letters and numbers right and break the pattern elsewhere: a symbol that repeats, numbers that run the wrong way, or a letter that is skipped. Three quick checks, one for each part, find it.",
      definition:
        "- **Symbols:** in most groups each term carries a different symbol. A symbol used twice in one group is the break.\n" +
        "- **Directions:** if the letters go back while the numbers go up in three groups, a group whose numbers also go back is the odd one.\n" +
        "- **Skips:** letters or numbers that should run in order (M, N, O and 1, 2, 3) are broken by one that jumps (V, X, Y or 10, 11, 13).\n" +
        "- Check the parts in the same order every time: letters, then numbers, then symbols.\n" +
        "- **Fast route:** read down the symbols of each group first; a repeat is visible in a second and needs no counting.",
      authoredExample: {
        prompt: "Find the odd one out: (a) C3@ : D4# : E5% (b) H8& : I9@ : J10# (c) L12% : M13& : N14@ (d) R18# : S19# : T20&",
        steps: [
          "Letters: every group runs in order (C, D, E; H, I, J; L, M, N; R, S, T).",
          "Numbers: every number is its letter's position.",
          "Symbols: (a), (b) and (c) use three different symbols. (d) uses # twice.",
        ],
        answer: "(d) R18# : S19# : T20&",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) B5@ : C6# : D7% (b) J12& : K13@ : L14# (c) P1% : Q2& : R3@ (d) T8# : V9% : W10&",
        steps: [
          "Symbols: each group uses three different ones, so that check passes.",
          "Numbers: each group runs in order (5, 6, 7; 12, 13, 14; 1, 2, 3; 8, 9, 10).",
          "Letters: B, C, D; J, K, L; P, Q, R run in order. T, V, W skips U.",
        ],
        answer: "(d) T8# : V9% : W10&",
      },
      practiceSet: [
        { prompt: "In the group F2@ : G3# : H4@, which part breaks the rule that every symbol is different?", answer: "The symbol @, used twice." },
        { prompt: "How many parts should you check in each term of a group like K11@?", answer: "Three: the letter, the number and the symbol." },
        { prompt: "In the group P20 : O21 : N22, do the letters and the numbers move the same way?", answer: "No: the letters go back one place each time while the numbers go up by one." },
        { prompt: "Find the odd one out: A1@ : B2# : C3%, D4& : E5@ : F6#, G7% : H8& : I9@, J10# : L12% : M13&", answer: "J10# : L12% : M13&", method: "It skips K (and 11)." },
      ],
      pyqExampleId: "71352b1e-b481-4ba2-aa61-1705462adc3b",
      traps: [
        {
          title: "Stopping once the letters and numbers fit",
          body:
            "A group whose letters and numbers are all correct can still be the odd one, because one symbol repeats. Read the symbols last, every time.",
        },
        {
          title: "Missing a direction change",
          body:
            "Letters going back and numbers going up is a pattern of its own. A group where both go back looks orderly, but it breaks the pattern the other three share.",
        },
      ],
    },
  ],
};
