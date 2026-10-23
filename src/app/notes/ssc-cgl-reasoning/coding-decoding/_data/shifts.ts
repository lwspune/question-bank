import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCD_SHIFTS_NOTE: SubtopicNote = {
  subtopicName: "Letter Shifts",
  title: "Letter Shifts",
  oneLineDefinition:
    "Each letter of the word moves a fixed number of places along the alphabet: one shift for every letter, a pattern of shifts that changes from letter to letter, or one shift for vowels and another for consonants.",
  whyItMatters:
    "Eighty-two questions in the bank, fifty-two of them from the 2025 shifts and sixty-three EASY. Forty-four move every letter by the same amount, and the wrong options usually differ from the answer in a single letter, so the marks go to the student who knows the alphabet positions cold and checks the letter where the options split.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcdsh-fixed",
      name: "One shift for every letter",
      intuition:
        "Put the word above its code and count how far the first letter moved. If the second and third letters moved the same distance, the whole code is that one shift, and you can write the answer without thinking about the rest.",
      definition:
        "- **Positions:** A = 1, B = 2, and so on to Z = 26. Learn the anchors **EJOTY**: E = 5, J = 10, O = 15, T = 20, Y = 25. Every other letter is a short count from one of them: R is two before T, so 18.\n" +
        "- **Find the shift:** count from a word letter to its code letter, forward (+) or back. Check the same count on two more letters before you trust it.\n" +
        "- **Wrap round:** going forward past Z starts again at A (Y + 3 = B); going back past A starts again at Z (B back 3 = Y). In numbers, take away 26 when you pass 26, add 26 when you go below 1.\n" +
        "- **Coding the code:** 'If MASTER is NBTUFS, how is NBTUFS coded?' means apply the same shift once more to NBTUFS. The answer is two shifts away from MASTER.\n" +
        "- **Decoding:** if the code is given and the word is asked, move the code letters the other way.\n" +
        "- **Fast route:** write only the first two letters of the answer and strike out the options that differ. If two options are left, go to the first letter where they differ and work out only that one.",
      formula: {
        label: "Moving a letter k places forward",
        latex: "\\text{new position} = p + k \\quad (\\text{take away } 26 \\text{ if the total is above } 26)",
        symbols: [
          { symbol: "\\(p\\)", meaning: "the position of the letter in the word (A = 1, Z = 26)" },
          { symbol: "\\(k\\)", meaning: "the shift; for a shift back, use a minus sign" },
        ],
      },
      authoredExample: {
        prompt: "In a certain code language, 'WORLD' is written as 'ZRUOG'. How will 'YACHT' be written in that language?",
        steps: [
          "W to Z is 3 places forward. O to R and R to U are also 3 forward, so every letter moves +3.",
          "Y is 25; 25 + 3 = 28, and 28 minus 26 = 2, which is B. The code wraps round past Z.",
          "A + 3 = D, C + 3 = F, H + 3 = K, T + 3 = W.",
        ],
        answer: "BDFKW",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'TIGER' is written as 'SHFDQ'. How will 'BLADE' be written in that language?",
        steps: [
          "T to S, I to H, G to F: every letter moves 1 place back.",
          "B to A, L to K, A back 1 wraps round to Z, D to C, E to D.",
        ],
        answer: "AKZCD",
      },
      practiceSet: [
        { prompt: "What is the position of the letter T in the English alphabet?", answer: "20", method: "T is one of the EJOTY anchors: E 5, J 10, O 15, T 20, Y 25." },
        { prompt: "Which letter do you reach if you move X four places forward along the alphabet, starting again at A after Z?", answer: "B", method: "X is 24; 24 + 4 = 28, and 28 minus 26 = 2." },
        { prompt: "In a certain code language, 'CAT' is written as 'FDW'. How will 'DOG' be written in that language?", answer: "GRJ", method: "Every letter moves 3 places forward." },
        { prompt: "In a certain code language, 'LAMP' is coded as 'MBNQ'. How is 'MBNQ' coded in the same language?", answer: "NCOR", method: "The rule is +1, so apply +1 again to MBNQ." },
      ],
      pyqExampleId: "63f6ac94-e297-45c3-ba52-87b4d006f7b1",
      traps: [
        {
          title: "Forgetting to wrap round",
          body:
            "Moving forward past Z carries on from A, and moving back past A carries on from Z: A moved 3 places back is X. An option that stops at Z or A, or prints a letter that ignores the wrap, is a printed trap.",
        },
        {
          title: "Answering with the first code when the code is coded again",
          body:
            "'If CROWN is DSPXO, how is DSPXO coded?' asks for the shift applied to DSPXO itself. The answer, ETQYP, is two shifts away from CROWN; giving DSPXO back loses the mark.",
        },
        {
          title: "Checking only the first letter",
          body:
            "The four options usually share their first two or three letters. Compare them first and work out the letter where they split, instead of the letters they all agree on.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdsh-pattern",
      name: "A pattern of shifts that changes from letter to letter",
      intuition:
        "When the first two letters moved by different amounts, write the gap under every letter. The row of gaps is the rule: it alternates, it grows, it shrinks, or it simply belongs to each position, and the new word takes the same row of gaps.",
      definition:
        "1. Write the word, its code under it, and the gap under each pair: +2, +3, +2, +3 or +1, back 1, +1, back 1.\n" +
        "2. Read the row of gaps. The common shapes are **alternating** (+1, back 1, +1, back 1), **growing** (+1, +2, +3, ...), **shrinking** (+4, +3, +2, +1), a **block that repeats** (+1, back 2, 0, then again), or **two halves** with different gaps.\n" +
        "3. If no shape shows, use the gaps as they stand, **position by position**: the third letter of the new word gets the third gap. With only one example this is always safe, because it is exactly what the example shows.\n" +
        "4. If a second example is printed, check the row of gaps on it too.\n" +
        "5. **Fast route:** the gaps of the first two letters already strike out most options. Work the rest of the word only if two options survive.",
      authoredExample: {
        prompt: "In a certain code language, 'FOREST' is written as 'GMSCTR'. How will 'BRIDGE' be written in that language?",
        steps: [
          "F to G is +1, O to M is 2 back, R to S is +1, E to C is 2 back, S to T is +1, T to R is 2 back.",
          "The gaps alternate: +1, back 2, +1, back 2, +1, back 2.",
          "B + 1 = C, R back 2 = P, I + 1 = J, D back 2 = B, G + 1 = H, E back 2 = C.",
        ],
        answer: "CPJBHC",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'SALT' is written as 'TCOX'. How will 'BEAN' be written in that language?",
        steps: [
          "S + 1 = T, A + 2 = C, L + 3 = O, T + 4 = X: the gaps grow by one each time.",
          "B + 1 = C, E + 2 = G, A + 3 = D, N + 4 = R.",
        ],
        answer: "CGDR",
      },
      practiceSet: [
        { prompt: "The gaps between a five-letter word and its code are +2, +3, +2, +3, +2. What is the gap for the fifth letter?", answer: "+2" },
        { prompt: "In a certain code language, 'COLD' is written as 'DNMC'. How will 'WARM' be written in that language?", answer: "XZSL", method: "The gaps are +1, back 1, +1, back 1." },
        { prompt: "In a certain code language, 'ROSE' is written as 'TNUD'. How will 'LILY' be written in that language?", answer: "NHNX", method: "The gaps are +2, back 1, +2, back 1." },
        { prompt: "In a certain code, the first letter of a word moves 4 places forward, the second 3, the third 2 and the fourth 1. What is the code for 'NEWS'?", answer: "RHYT" },
      ],
      pyqExampleId: "b0211d70-6ad0-4aaf-bae8-7cb047b1e85e",
      traps: [
        {
          title: "Taking the first gap as the rule for every letter",
          body:
            "A code can start +2, +2 and still move the third letter by +3. Write the gap under every letter of the example before you apply anything to the new word.",
        },
        {
          title: "Turning a backward gap into a forward one",
          body:
            "O to M is 2 places back. Written as +2 it sends the new word's letter the wrong way, and SSC prints that letter as an option. Mark each gap with its direction.",
        },
        {
          title: "Forcing a shape that is not there",
          body:
            "Gaps such as +1, back 1, +1, +1, +2 make no neat shape, and they do not need to. Use them position by position; inventing a 'next term' for a pattern you guessed is how the wrong option gets chosen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdsh-vowels",
      name: "Vowels and consonants moved differently",
      intuition:
        "If some letters of the code are the same as the word and others have moved, look at which letters stayed. When they are the vowels, the rule has two parts: one for vowels, one for consonants.",
      definition:
        "- The vowels are **A, E, I, O, U**; every other letter is a consonant.\n" +
        "- Usual rules: vowels stay and consonants move; consonants stay and vowels move; or vowels move by one amount and consonants by another.\n" +
        "- Decide the rule by the letter **in the word**, never by the letter it becomes: E moved 1 forward becomes F, a consonant, but it was moved as a vowel.\n" +
        "- **Fast route:** find a vowel in the new word and see what each option does with it. That one letter usually leaves a single option.",
      authoredExample: {
        prompt: "In a certain code language, 'PLANET' is written as 'QMAOEU'. How will 'MOTHER' be written in that language?",
        steps: [
          "P to Q, L to M, N to O and T to U move 1 forward; A and E stay. Vowels stay, consonants move +1.",
          "M to N, O stays, T to U, H to I, E stays, R to S.",
        ],
        answer: "NOUIES",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'BREAD' is written as 'AQFBC'. How will 'HOUSE' be written in that language?",
        steps: [
          "B, R and D move 1 back; E and A move 1 forward. Consonants move back 1, vowels forward 1.",
          "H to G, O to P, U to V, S to R, E to F.",
        ],
        answer: "GPVRF",
      },
      practiceSet: [
        { prompt: "Which letters of the word 'EQUATION' are vowels?", answer: "E, U, A, I and O" },
        { prompt: "In a certain code, every vowel moves 2 places forward and every consonant stays. How is 'RADIO' written?", answer: "RCDKQ" },
        { prompt: "In a certain code, every consonant moves 1 place back and every vowel stays. How is 'TIGER' written?", answer: "SIFEQ" },
        { prompt: "In a certain code, every vowel moves 1 place forward. What is the code letter for U?", answer: "V" },
      ],
      pyqExampleId: "33eeff8d-fe31-462f-9aa4-ab0dbc65eaff",
      traps: [
        {
          title: "Judging the letter after it has moved",
          body:
            "A vowel moved 1 forward can turn into a consonant (E to F, O to P). The rule is fixed by what the letter was in the word, so do not move it a second time as a consonant.",
        },
        {
          title: "Calling it one shift when the vowels stayed",
          body:
            "If 'every letter +1' fits the consonants but not the vowels, the rule is not wrong at one letter: the vowels follow a rule of their own. Check every vowel of the example.",
        },
      ],
    },
  ],
};
