import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_REARRANGEMENT_NOTE: SubtopicNote = {
  subtopicName: "Letter Rearrangement",
  title: "Letter Rearrangement",
  oneLineDefinition:
    "Here the letters of the word are moved rather than changed: the word is reversed, cut into blocks, or its letters swap places. Harder codes move the letters and then shift them.",
  whyItMatters:
    "Thirty-seven questions in the bank, seventeen EASY and twenty MODERATE, ten of them from the 2025 shifts. Seventeen of the twenty MODERATE ones are a move followed by a shift, which is why this page comes after the shifts: the first check, 'are these the same letters?', tells you which half of the rule you are looking at.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscranlr-reverse",
      name: "Reversed words and reversed blocks",
      intuition:
        "If the code uses exactly the word's letters, nothing was shifted: only the order changed. The commonest change is reading the word backwards, either as a whole or in pieces.",
      definition:
        "- **First check:** are the code's letters the same letters as the word's? If yes, look only at order.\n" +
        "- Read the code backwards. If that gives the word, the rule is a full reversal.\n" +
        "- If not, cut the word into two halves (or blocks of three) and reverse each block, or swap the blocks.\n" +
        "- In a word of odd length, see what happens to the middle letter: it may stay put, or the cut may fall at 4 and 3.\n" +
        "- **Fast route:** the option must start with the letter the rule puts first. Strike out the rest before reading further.",
      authoredExample: {
        prompt: "CANDLE : NACELD :: PLANET : ?",
        steps: [
          "Same letters, new order. CANDLE backwards is ELDNAC, not NACELD, so it is not a full reversal.",
          "Cut it in half: CAN and DLE. Each half reversed gives NAC and ELD: NACELD.",
          "PLANET: PLA and NET, reversed, give ALP and TEN.",
        ],
        answer: "ALPTEN",
      },
      selfCheckExample: {
        prompt: "MARKET : TEKRAM :: GARDEN : ?",
        steps: ["TEKRAM is MARKET read backwards.", "GARDEN read backwards is NEDRAG."],
        answer: "NEDRAG",
      },
      practiceSet: [
        { prompt: "WATER : RETAW :: BREAD : ?", answer: "DAERB", method: "Full reversal." },
        { prompt: "BASKET : SABTEK :: COFFEE : ?", answer: "FOCEEF", method: "Each half of three letters reversed." },
        { prompt: "SUNDAY : DAYSUN :: MONDAY : ?", answer: "DAYMON", method: "The two halves change places." },
        { prompt: "Write PENCIL with each half reversed.", answer: "NEPLIC", method: "PEN to NEP, CIL to LIC." },
      ],
      pyqExampleId: "ce310e9a-377a-40e2-86ba-2e4a76aa9bbb",
      traps: [
        {
          title: "Reversing the whole word when only the halves turn",
          body:
            "A half-reversed code and a fully reversed code contain the same letters, and SSC prints both. Test the rule on the given pair: the full reversal must give the code exactly.",
        },
        {
          title: "Cutting a word of odd length in the wrong place",
          body:
            "A seven-letter word may be cut 4 and 3, or 3, 1 and 3 with the middle letter kept. Read the cut from the given pair rather than guessing it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranlr-swap",
      name: "Swapped pairs and numbered positions",
      intuition:
        "When the order is not a simple reversal, number the letters 1, 2, 3, ... and write down which number lands in each place of the code. That list of numbers is the rule, and it works on any word of the same length.",
      definition:
        "- **Pair swap:** letters 1 and 2 change places, then 3 and 4, and so on. An odd last letter stays.\n" +
        "- **First and last swap:** the middle letters stay where they are.\n" +
        "- **Numbered order:** write 1, 2, 3, ... under the word and read off the order the code uses, for example 3, 1, 4, 2. The code's first letter is the word's third letter, its second is the word's first, and so on.\n" +
        "- Use a given word with no repeated letters to read the order; a double letter hides which copy went where.",
      authoredExample: {
        prompt: "LION : OLNI :: BEAR : ?",
        steps: [
          "Number LION: L1 I2 O3 N4. The code OLNI reads letters 3, 1, 4, 2.",
          "BEAR: B1 E2 A3 R4. Letters 3, 1, 4, 2 are A, B, R, E.",
        ],
        answer: "ABRE",
      },
      selfCheckExample: {
        prompt: "GARDEN : AGDRNE :: SILVER : ?",
        steps: [
          "GA to AG, RD to DR, EN to NE: each pair of letters swaps.",
          "SILVER: SI to IS, LV to VL, ER to RE.",
        ],
        answer: "ISVLRE",
      },
      practiceSet: [
        { prompt: "STAR : TSRA :: MOON : ?", answer: "OMNO", method: "Each pair swaps." },
        { prompt: "TABLE : EABLT :: CHAIR : ?", answer: "RHAIC", method: "First and last letters swap." },
        { prompt: "Write CLOUD in the order 2, 1, 3, 5, 4.", answer: "LCODU" },
        { prompt: "BRAVE : RBVAE :: QUIET : ?", answer: "UQEIT", method: "Pairs swap and the last letter stays." },
      ],
      pyqExampleId: "61a108df-4d3b-48e9-88bc-c30f2f43b9b2",
      traps: [
        {
          title: "Reading the order the wrong way round",
          body:
            "The order 3, 1, 4, 2 means the code's first letter is the word's third letter. It does not mean the word's first letter moves to place 3. For many orders the two readings give different answers, and SSC prints both.",
        },
        {
          title: "Reading the order from a word with a double letter",
          body:
            "In a word such as COFFEE you cannot tell which F went where. Take the order from a word whose letters are all different, then apply it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranlr-combined",
      name: "A move and a shift together",
      intuition:
        "If the code's letters are not the word's letters but the gaps look random, the letters may have been moved first. Reverse the word, or swap its halves, and write the gaps again: a clean pattern usually appears.",
      definition:
        "- Order of checks: same letters? Then it is a pure move (see above). Gaps all equal? Then it is a pure shift. Neither? Reverse the word and write the gaps again.\n" +
        "- Common SSC pairs: reverse, then shift every letter the same; reverse, then shift by +1, +2, +3, ...; swap the halves, then shift; swap pairs and replace the middle letters by their opposites.\n" +
        "- For one fixed shift the order of the two steps does not matter. For rising gaps it does, so copy the order of steps from the given pair.\n" +
        "- **Fast route:** find the first letter of the answer from the LAST letter of the word as well as the first. One of the two usually matches only one option.",
      authoredExample: {
        prompt: "COAT : UBPD :: SHIP : ?",
        steps: [
          "C to U and O to B give no pattern, so reverse COAT: TAOC.",
          "TAOC to UBPD: every letter moves 1 forward.",
          "SHIP reversed is PIHS; one forward gives QJIT.",
        ],
        answer: "QJIT",
      },
      selfCheckExample: {
        prompt: "LAMB : CODP :: FISH : ?",
        steps: [
          "LAMB reversed is BMAL. B + 1 = C, M + 2 = O, A + 3 = D, L + 4 = P: reverse, then gaps +1, +2, +3, +4.",
          "FISH reversed is HSIF: H + 1 = I, S + 2 = U, I + 3 = L, F + 4 = J.",
        ],
        answer: "IULJ",
      },
      practiceSet: [
        { prompt: "DOG : HPE :: CAT : ?", answer: "UBD", method: "Reverse, then each letter 1 forward." },
        { prompt: "BEST : UTFC :: MILK : ?", answer: "LMJN", method: "Each letter 1 forward, then reverse." },
        { prompt: "SOFA : YDMQ :: BELL : ?", answer: "JJCZ", method: "Reverse, then each letter 2 back." },
        { prompt: "Swap the two halves of GOLDEN, then move every letter one place back. What do you get?", answer: "CDMFNK", method: "DENGOL, then one back." },
      ],
      pyqExampleId: "2e157c14-d9b2-46b5-94b4-6baa5a6c65d6",
      traps: [
        {
          title: "Shifting before reversing when the gaps rise",
          body:
            "With rising gaps, 'reverse then +1, +2, +3' and '+1, +2, +3 then reverse' give different codes. Take the order of the steps from the given pair and keep it.",
        },
        {
          title: "Giving up on random-looking gaps",
          body:
            "Gaps such as +18, \\(-13\\), +15 against the word usually mean the letters were moved first. Reverse the word and measure the gaps again before you try anything stranger.",
        },
      ],
    },
  ],
};
