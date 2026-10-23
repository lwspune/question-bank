import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCD_REVERSAL_NOTE: SubtopicNote = {
  subtopicName: "Reversal and Opposite Letters",
  title: "Reversal and Opposite Letters",
  oneLineDefinition:
    "The letters of the word are put in a new order (reversed, split into halves, swapped in pairs), often with a letter shift on top, or each letter is replaced by its opposite letter, the one in the same place from the other end of the alphabet.",
  whyItMatters:
    "Forty-nine questions in the bank, and they include all five HARD questions in the chapter. Twenty-eight of them reverse or swap the letters and then shift them, which is why a letter-by-letter count of gaps finds no rule: the reversal has to be undone first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcdre-reverse",
      name: "Reversing and rearranging the letters",
      intuition:
        "If the code is made of exactly the letters of the word, nothing was shifted: the letters only changed places. The job is to find where each letter went and send the new word's letters to the same places.",
      definition:
        "1. **Same letters?** Compare the code's letters with the word's. If they match, it is a rearrangement, and every option with new letters is out.\n" +
        "2. Try the usual moves first: the **whole word reversed**; the **first letter kept** and the rest reversed; the **last letter kept** and the rest reversed; each **half reversed**; letters **swapped in pairs** (1st with 2nd, 3rd with 4th, ...); some pairs swapped and others left alone.\n" +
        "3. **When none fits, number the places.** Write 1, 2, 3, ... under the word and write the code as a list of those numbers (FRAME to MERAF is 4, 5, 2, 3, 1). Take the new word's letters in the same order.\n" +
        "4. **Fast route:** find where the first letter of the word went, and check only that place in the options.",
      authoredExample: {
        prompt: "In a certain code language, 'CARPET' is written as 'RACTEP'. How will 'MONKEY' be written in that language?",
        steps: [
          "RACTEP uses only the letters of CARPET, so the letters were only moved.",
          "CAR became RAC and PET became TEP: each half of three letters is reversed.",
          "MON becomes NOM and KEY becomes YEK.",
        ],
        answer: "NOMYEK",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'PLANET' is written as 'LPNATE'. How will 'SILVER' be written in that language?",
        steps: [
          "PL became LP, AN became NA, ET became TE: the letters are swapped in pairs.",
          "SI becomes IS, LV becomes VL, ER becomes RE.",
        ],
        answer: "ISVLRE",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'STAR' is written as 'RATS'. How will 'LOOP' be written in that language?", answer: "POOL", method: "The whole word is reversed." },
        { prompt: "In a certain code, the first letter of a word stays and the rest of the word is written in reverse. How is 'MARKET' written?", answer: "MTEKRA" },
        { prompt: "Number the letters of 'BASKET' from 1 to 6. Which word is formed by taking the letters in the order 6, 5, 4, 3, 2, 1?", answer: "TEKSAB" },
        { prompt: "In a certain code language, 'ORANGE' is written as 'ROANEG'. How will 'PURPLE' be written in that language?", answer: "UPRPEL", method: "The first and last pairs are swapped; the middle pair stays." },
      ],
      pyqExampleId: "f28d92e4-7124-4d8f-ab5a-7d1c95fb2f9e",
      traps: [
        {
          title: "Shifting letters that were only moved",
          body:
            "When the code has the same letters as the word, no letter changes. An option containing a letter the new word does not have is wrong, however neat its pattern looks.",
        },
        {
          title: "Reversing the whole word when only the halves were reversed",
          body:
            "CARPET written backwards is TEPRAC, not RACTEP. Look at where the word's first letter landed (the middle here, not the end) before you choose the move.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdre-combined",
      name: "Rearrange first, then shift",
      intuition:
        "Many codes do two jobs: they move the letters around and then shift them. If the gaps between word and code make no sense letter by letter, undo the most likely rearrangement (usually a reversal) and count the gaps again. A clean rule, +3 everywhere or +6, +5, +4, ..., then appears.",
      definition:
        "1. Count the gaps letter by letter. If they form a pattern, the code is only a shift.\n" +
        "2. If they do not, compare the **last** letter of the word with the **first** letter of the code. If those two are close, reverse the word and count again.\n" +
        "3. Also try the other moves: swap the first two and last two letters, swap in pairs, reverse each half. Then count the gaps on the rearranged word.\n" +
        "4. **Does the order matter?** With one shift for every letter, reversing before or after shifting gives the same code. With a pattern of gaps (+1, +2, +3, ...) it does not, so read from the example which step came first.\n" +
        "5. Some codes treat the two halves differently: the first half only shifted, the second half reversed and then shifted.\n" +
        "6. **Fast route:** once you know the rule, build only the first two letters of the answer from the right end of the word.",
      authoredExample: {
        prompt: "In a certain code language, 'BASKET' is written as 'VGMUCD'. How will 'POCKET' be written in that language?",
        steps: [
          "Letter by letter the gaps make no sense (B to V, A to G). But T, the last letter of BASKET, is two steps from V, the first code letter.",
          "BASKET reversed is TEKSAB. Moving each letter 2 forward gives V, G, M, U, C, D: VGMUCD.",
          "POCKET reversed is TEKCOP. Two forward: V, G, M, E, Q, R.",
        ],
        answer: "VGMEQR",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'LAMP' is written as 'QODP'. How will 'SOFA' be written in that language?",
        steps: [
          "LAMP reversed is PMAL. P + 1 = Q, M + 2 = O, A + 3 = D, L + 4 = P: reverse, then +1, +2, +3, +4.",
          "SOFA reversed is AFOS. A + 1 = B, F + 2 = H, O + 3 = R, S + 4 = W.",
        ],
        answer: "BHRW",
      },
      practiceSet: [
        { prompt: "In a certain code, a word is written in reverse and every letter then moves 2 places forward. How is 'DOG' written?", answer: "IQF" },
        { prompt: "In a certain code, the first two letters of a word swap, the last two letters swap, and every letter then moves 1 place back. How is 'TRAIN' written?", answer: "QSZMH", method: "TRAIN becomes RTANI, then each letter moves 1 back." },
        { prompt: "Does it matter whether a word is reversed before or after every one of its letters is moved 3 places forward?", answer: "No. With the same shift for every letter, both orders give the same code." },
        { prompt: "In a certain code language, 'MILK' is written as 'JKHL'. How will 'RICE' be written in that language?", answer: "DBHQ", method: "Reverse the word, then move every letter 1 back." },
      ],
      pyqExampleId: "c1496248-c166-44ea-b660-96dd4bb68521",
      traps: [
        {
          title: "Counting gaps before undoing the reversal",
          body:
            "In a reversed code the first code letter comes from the word's last letter. Comparing it with the word's first letter gives a nonsense gap, and a student who stops there guesses.",
        },
        {
          title: "Running a growing shift from the wrong end",
          body:
            "When the word is reversed first, the gaps +6, +5, +4, ... start at the reversed word's first letter, which is the original last letter. Starting them at the original first letter gives a code that is printed as a wrong option.",
        },
        {
          title: "Stopping after one example fits",
          body:
            "A reverse-and-shift rule can fit one example by luck. When two examples are printed, check the rule on both before building the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscrcdre-opposite",
      name: "Opposite letters: pairs that add to 27",
      intuition:
        "Every letter has an opposite: the letter in the same place counted from the other end. A is first from the front and Z is first from the back, so A and Z are opposites. Their positions always add to 27.",
      definition:
        "- **Rule:** a letter at position p has its opposite at 27 minus p. So the opposite of G (7) is T (20).\n" +
        "- **To write the table fast,** put A to M in a row and Z to N under it, backwards. Each column is a pair.\n" +
        "- **Spot it:** when the gaps between word and code jump about (A to Z, B to Y, K to P), test whether each pair adds to 27.\n" +
        "- Some codes add a shift: the letter just after the opposite (B to Y to Z), or opposites only for the first and last letters.",
      table: {
        columns: ["Letter", "Position", "Opposite", "Opposite's position"],
        rows: [
          { cells: ["A", "1", "Z", "26"] },
          { cells: ["B", "2", "Y", "25"] },
          { cells: ["C", "3", "X", "24"] },
          { cells: ["D", "4", "W", "23"] },
          { cells: ["E", "5", "V", "22"] },
          { cells: ["F", "6", "U", "21"] },
          { cells: ["G", "7", "T", "20"] },
          { cells: ["H", "8", "S", "19"] },
          { cells: ["I", "9", "R", "18"] },
          { cells: ["J", "10", "Q", "17"] },
          { cells: ["K", "11", "P", "16"] },
          { cells: ["L", "12", "O", "15"] },
          { cells: ["M", "13", "N", "14"] },
        ],
        caption: "Each pair adds to 27. A memory line some students use: 'AZ BY CX DW EV'.",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'GOLD' is written as 'TLOW'. How will 'IRON' be written in that language?",
        steps: [
          "G (7) and T (20) add to 27, as do O and L, L and O, D and W: every letter is replaced by its opposite.",
          "I to R, R to I, O to L, N to M.",
        ],
        answer: "RILM",
      },
      practiceSet: [
        { prompt: "What is the opposite letter of K in the English alphabet?", answer: "P", method: "K is 11, and 27 minus 11 = 16, which is P." },
        { prompt: "Which pair are opposite letters: H and S, or H and T?", answer: "H and S", method: "8 + 19 = 27." },
        { prompt: "In a certain code, every letter is replaced by its opposite letter. How is 'MILK' written?", answer: "NROP" },
        { prompt: "In a certain code, every letter is replaced by the letter just after its opposite. How is 'BAD' written?", answer: "ZAX", method: "B to Y to Z, A to Z to A, D to W to X." },
      ],
      pyqExampleId: "95cbfb4d-d16f-4b25-a8a1-13a9ffce4841",
      traps: [
        {
          title: "Using 26 instead of 27",
          body:
            "The opposite of a letter is at 27 minus its position. Taking 26 minus the position lands one letter short: it gives V for D, when the opposite of D is W.",
        },
        {
          title: "Hunting for a shift in an opposite code",
          body:
            "An opposite code moves each letter a different distance (A moves 25, M moves 1), so no shift pattern exists. When the gaps look random, add each pair's positions before anything else.",
        },
      ],
    },
  ],
};
