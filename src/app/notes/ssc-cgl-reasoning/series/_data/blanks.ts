import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "Letter Series with Blanks",
  title: "Letter Series with Blanks",
  oneLineDefinition:
    "A string of letters with gaps is one short block written again and again, sometimes with one letter changing each time: find the block, and the blanks are whatever the block says belongs there.",
  whyItMatters:
    "Eighty-three questions in the bank, 45 from the 2023 shifts, 36 from the 2024 shifts and two from the 2025 shifts: 46 MODERATE and 37 EASY, the most MODERATE questions of any page here. In 48 one block repeats exactly, in ten the series uses only two letters, and in 25 one place in the block moves along the alphabet. They take longer than other series because of the counting, so a fixed routine saves the most time here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsebl-repeat",
      name: "Find the repeating block",
      intuition:
        "Behind almost every blank series is one block of four to seven letters written three or four times. The printed letters show you most of the block; the blanks are the bits you fill in from the other copies.",
      definition:
        "1. **Count the places,** letters and blanks together. The total is usually the block length times the number of copies (20 = 4 × 5, 21 = 3 × 7).\n" +
        "2. **Find the block length:** look for where the first letter, or the first two letters, come back. Try the lengths that divide the total.\n" +
        "3. **Build the block** from the letters printed in each position across all the copies.\n" +
        "4. **Read the blanks** from left to right using the block.\n" +
        "5. **Fast route:** once the block is known, fill only the first two blanks and strike out the options that disagree; check the last blank of whatever is left.",
      authoredExample: {
        prompt: "Fill the blanks: K _ T R _ K M _ R S _ M T _ S",
        steps: [
          "There are 15 places, so try 3 copies of a 5-letter block.",
          "Position by position across the copies: K, M, T, R, S. The block is KMTRS.",
          "Written out: KMTRS KMTRS KMTRS. The blanks fall on M, S, T, K and R.",
        ],
        answer: "MSTKR",
      },
      selfCheckExample: {
        prompt: "Fill the blanks: D _ A H D Q _ H _ Q A _",
        steps: [
          "12 places; D comes back at place 5, so the block has 4 letters: D Q A H.",
          "DQAH DQAH DQAH gives the blanks Q, A, D, H.",
        ],
        answer: "QADH",
      },
      practiceSet: [
        { prompt: "Fill the blanks: B N _ B _ V _ N V", answer: "VNB", method: "The block BNV written three times." },
        { prompt: "Fill the blanks: _ R G L W _ G L _ R _ L", answer: "WRWG", method: "The block WRGL written three times." },
        { prompt: "A letter series has 21 places and is one block written three times. How many letters are in the block?", answer: "7" },
        { prompt: "Fill the blanks: H _ E H J _ H _ E", answer: "JEJ", method: "The block HJE written three times." },
      ],
      pyqExampleId: "a2b00235-753c-4fe5-95df-e63d2a5fa07f",
      traps: [
        {
          title: "Taking the first repeat you see as the block",
          body:
            "A letter can appear twice inside one block: NABANA holds two Ns and three As. Check the block length against the total number of places before trusting it.",
        },
        {
          title: "Losing count of the places",
          body:
            "A missed blank shifts every letter after it by one place, and the block then seems not to repeat. Number the places once, slowly, before looking for the block.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsebl-few",
      name: "Series built from two letters",
      intuition:
        "When the whole series uses only two letters, the block is short (two, three or four letters), and the only question is the order. Try each short length against the letters that are printed.",
      definition:
        "1. **Count the places.** With 12 places, the block is 2, 3, 4 or 6 letters long.\n" +
        "2. **Try the shortest length first.** Write the block from the first copy that has no blank in it, or from the printed letters at the same place in each copy.\n" +
        "3. **Test every printed letter.** A block is right only if each printed letter sits where the block says it should.\n" +
        "4. **Prefer the shortest block that fits.** With only two letters, a longer block can sometimes be made to fit too; SSC's answer is the series with the shortest repeating block.",
      authoredExample: {
        prompt: "Fill the blanks: M _ N M _ _ M M _ M _ N",
        steps: [
          "12 places and two letters, M and N. Try a 3-letter block.",
          "Places 1, 4, 7, 10 are M and places 3 and 12 are N, so the block is M M N.",
          "MMN MMN MMN MMN: the blanks are M, M, N, N, M.",
        ],
        answer: "MMNNM",
      },
      selfCheckExample: {
        prompt: "Fill the blanks: _ G _ H G _ H _ G _ G G",
        steps: [
          "H is printed at places 4 and 7, three apart, so try the 3-letter block H G G.",
          "HGG HGG HGG HGG fits every printed letter. The blanks are H, G, G, G, H.",
        ],
        answer: "HGGGH",
      },
      practiceSet: [
        { prompt: "Fill the blanks: A _ A B _ B A _", answer: "B, A, B", method: "The block AB written four times." },
        { prompt: "Fill the blanks: P P _ P P Q _ P Q", answer: "Q, P", method: "The block PPQ written three times." },
        { prompt: "Fill the blanks: T _ S T _ S _ S S", answer: "S, S, T", method: "The block TSS written three times." },
        { prompt: "How many letters long is the shortest repeating block in R R E R R E R R E R R E?", answer: "3" },
      ],
      pyqExampleId: "82c3152c-2a97-429f-b954-bab957c3dffc",
      traps: [
        {
          title: "Stopping once the first half fits",
          body:
            "With two letters, a wrong option can match the first six places and fail later. Check every printed letter all the way to the end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsebl-moving",
      name: "Blocks where one letter moves",
      intuition:
        "If no block repeats exactly, the series is usually equal blocks that are the same except in one place, and that one place steps through the alphabet: MNBVC, MNBWC, MNBXC.",
      definition:
        "1. **Split the series into equal blocks,** usually four blocks of five or four of four.\n" +
        "2. **Compare the blocks place by place.** Most places hold the same letter in every block.\n" +
        "3. **Find the moving place:** its letters run on, such as J, K, L, M or T, S, R, Q.\n" +
        "4. **A variant:** in some series every place moves, each by its own step. Read each place down the blocks as a letter series.\n" +
        "5. **Fill the blanks** block by block, using the fixed letters and the next letter of the moving place.",
      authoredExample: {
        prompt: "Fill the blanks: P A _ E S P A M _ S _ A N E S P _ O E S",
        steps: [
          "20 places, so try four blocks of five: PA?ES each time.",
          "The third place reads ?, M, N, O. It moves one step, so the first block has L.",
          "Blocks PALES, PAMES, PANES, PAOES give the blanks L, E, P, A.",
        ],
        answer: "LEPA",
      },
      selfCheckExample: {
        prompt: "Fill the blanks: _ T C K R T _ L R T C _ R _ C N",
        steps: [
          "Four blocks of four: RTC followed by K, L, M, N.",
          "RTCK RTCL RTCM RTCN gives the blanks R, C, M, T.",
        ],
        answer: "RCMT",
      },
      practiceSet: [
        { prompt: "Fill the blanks: G O _ D G O B D G _ C D", answer: "A, O", method: "Blocks GOAD, GOBD, GOCD." },
        { prompt: "Fill the blanks: L U _ E L V N E L _ N E", answer: "N, W", method: "Blocks LUNE, LVNE, LWNE." },
        { prompt: "The blocks FAX, FBX, FCX follow one pattern. What is the next block?", answer: "FDX" },
        { prompt: "Fill the blanks: B _ Y D B X _ D B Y Y _", answer: "W, Y, D", method: "Blocks BWYD, BXYD, BYYD." },
      ],
      pyqExampleId: "a2c4f03b-6389-4ad8-9481-1eb8444ac5b1",
      traps: [
        {
          title: "Hunting for an exact repeat that is not there",
          body:
            "When the blocks almost repeat, do not give up on the block idea. Look for the single place that changes and check that it steps along the alphabet.",
        },
      ],
    },
  ],
};
