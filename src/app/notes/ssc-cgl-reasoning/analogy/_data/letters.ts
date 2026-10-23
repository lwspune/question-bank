import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter Analogy",
  title: "Letter Analogy",
  oneLineDefinition:
    "In a letter analogy each letter of a word is changed by a rule on its position in the alphabet: the same shift for every letter, a pattern of shifts, or a swap to the opposite letter.",
  whyItMatters:
    "Seventy-five questions in the bank, fifty EASY and twenty-five MODERATE, twenty-seven of them from the 2025 shifts. All of them rest on one skill: knowing the position of any letter at once. With that, the rule is found by writing the gaps between letters, and most options fall away after the first letter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscranlt-positions",
      name: "Letter positions, forward and backward",
      intuition:
        "Every letter has a number: A is 1 and Z is 26. Counting from the other end, Z is 1 and A is 26. Once you know these numbers without counting on your fingers, a letter rule becomes simple arithmetic.",
      definition:
        "- Learn A = 1 to Z = 26.\n" +
        "- The anchors **E J O T Y** stand at 5, 10, 15, 20 and 25. Any letter is at most two steps from one of them: R is T less 2, so 18.\n" +
        "- The **reverse position** (counting from Z) is 27 less the forward position: G is 7th from the front and 20th from the back.\n" +
        "- Some questions turn letters into numbers. A pair such as HM may be written as \\(8 \\times 13\\), or as the squares of the positions. Write the positions under the letters and the rule shows.",
      formula: {
        label: "Reverse position",
        latex: "\\text{position from Z} = 27 - n",
        symbols: [{ symbol: "n", meaning: "the position from A (A = 1, Z = 26)" }],
      },
      authoredExample: {
        prompt: "If CF is written as 9/36, how is DH written?",
        steps: [
          "Positions: C = 3 and F = 6.",
          "\\(3^2 = 9\\) and \\(6^2 = 36\\), so each letter is replaced by the square of its position.",
          "D = 4 and H = 8: \\(4^2 = 16\\) and \\(8^2 = 64\\).",
        ],
        answer: "16/64",
      },
      selfCheckExample: {
        prompt: "Using the anchors E J O T Y, find the positions of Q and W.",
        steps: ["Q is two after O (15), so 17.", "W is three after T (20), so 23."],
        answer: "Q = 17, W = 23",
      },
      practiceSet: [
        { prompt: "What is the position of the letter M in the alphabet?", answer: "13" },
        { prompt: "Which letter is at position 21?", answer: "U", method: "One after T (20)." },
        { prompt: "What is the position of the letter G counted from Z?", answer: "20", method: "\\(27 - 7 = 20\\)." },
        { prompt: "If BE is written as \\(2 \\times 5\\), how is KL written?", answer: "\\(11 \\times 12\\)" },
      ],
      pyqExampleId: "4f0e0f4b-bddd-48c4-b7e2-f91832d9ea57",
      traps: [
        {
          title: "Counting the starting letter",
          body:
            "Moving 3 places on from P lands on S (Q, R, S). Counting P itself as the first step gives R, one short. Count only the letters you move onto, or add the numbers: \\(16 + 3 = 19\\), which is S.",
        },
        {
          title: "Mixing the two directions",
          body:
            "A rule may use positions from A or positions from Z. If one letter fits only when you count from Z, test every other letter from Z too before you trust the rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranlt-same",
      name: "One shift for every letter",
      intuition:
        "The simplest letter code moves every letter the same number of places along the alphabet. Find that number from the first letter, confirm it on a second, and apply it to the new word.",
      definition:
        "- The gap between a letter and its code letter is the **shift**: G to J is 3 forward.\n" +
        "- Check the gap on a second letter. If it holds, use it on every letter of the new word.\n" +
        "- **Wrap round**: after Z the alphabet starts again at A. If a position goes past 26, take away 26: Y + 4 is \\(25 + 4 = 29\\), and \\(29 - 26 = 3\\), which is C.\n" +
        "- A shift of 13 forward lands on the same letter as 13 back; 19 forward is the same as 7 back. Use the shorter way round.\n" +
        "- **Fast route:** work out only the first letter of the answer and strike out the options that start with another letter. Usually one or two are left; one more letter decides.",
      formula: {
        label: "Shift with wrap-round",
        latex: "n' = n + k \\qquad (\\text{take away } 26 \\text{ if } n' > 26)",
        symbols: [
          { symbol: "n", meaning: "the position of the letter" },
          { symbol: "k", meaning: "the shift: positive forward, negative backward" },
        ],
      },
      authoredExample: {
        prompt: "GOLD : JROG :: SILK : ?",
        steps: [
          "G to J is 3 forward. Check: O + 3 = R, L + 3 = O, D + 3 = G. Every letter moves 3 forward.",
          "SILK: S + 3 = V, I + 3 = L, L + 3 = O, K + 3 = N.",
        ],
        answer: "VLON",
      },
      selfCheckExample: {
        prompt: "WAX : BFC :: YES : ?",
        steps: [
          "W (23) to B (2): \\(23 + 5 = 28\\) and \\(28 - 26 = 2\\), so the shift is 5 forward. Check: A + 5 = F, X + 5 = C.",
          "Y (25) + 5 = 30, and \\(30 - 26 = 4\\): D. E + 5 = J. S + 5 = X.",
        ],
        answer: "DJX",
      },
      practiceSet: [
        { prompt: "ABC : DEF :: PQR : ?", answer: "STU", method: "Each letter 3 forward." },
        { prompt: "MAN : LZM :: BOY : ?", answer: "ANX", method: "Each letter 1 back; A goes back to Z." },
        { prompt: "KITE : MKVG :: BIRD : ?", answer: "DKTF", method: "Each letter 2 forward." },
        { prompt: "RAT : DMF :: CUP : ?", answer: "OGB", method: "Each letter 12 forward, wrapping past Z." },
      ],
      pyqExampleId: "07994fe1-a769-4e38-8f9c-505a6d22d78b",
      traps: [
        {
          title: "Forgetting to wrap past Z",
          body:
            "X moved 4 forward is B, not a letter beyond Z. When a position comes out above 26, take 26 away before you look the letter up.",
        },
        {
          title: "Trusting one letter",
          body:
            "A gap found from the first letter alone may not hold for the rest; the code may be a pattern. Check at least two letters of the given pair before you work out the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranlt-pattern",
      name: "A pattern of shifts",
      intuition:
        "When the gaps are not all equal, they usually follow a pattern you can see once they are written down: rising by one, changing sign each time, or one gap for vowels and another for consonants.",
      definition:
        "- Write the gap, with its sign, under every letter of the given pair.\n" +
        "- Common patterns: rising gaps (+1, +2, +3, +4), falling gaps (+4, +3, +2, +1), signs that take turns (+2, \\(-2\\), +2, \\(-2\\)), the first half moved one way and the second half another, a fixed gap for vowels and another for consonants.\n" +
        "- **One letter becomes two**: each letter may be replaced by the letters just before and after it, or by the next two letters. Then the code is twice as long as the word.\n" +
        "- **Fast route:** the length of the code tells you the family at once. Same length: a shift. Double length: one letter became two.",
      authoredExample: {
        prompt: "LAMP : MCPT :: DESK : ?",
        steps: [
          "Gaps: L to M is +1, A to C is +2, M to P is +3, P to T is +4. The gaps rise by one.",
          "DESK: D + 1 = E, E + 2 = G, S + 3 = V, K + 4 = O.",
        ],
        answer: "EGVO",
      },
      selfCheckExample: {
        prompt: "BOAT : DMCR :: FISH : ?",
        steps: [
          "Gaps: +2, \\(-2\\), +2, \\(-2\\) (B to D, O to M, A to C, T to R).",
          "FISH: F + 2 = H, I \\(-\\) 2 = G, S + 2 = U, H \\(-\\) 2 = F.",
        ],
        answer: "HGUF",
      },
      practiceSet: [
        { prompt: "CAT : BDZBSU :: DOG : ?", answer: "CENPFH", method: "Each letter becomes the letter before it and the letter after it." },
        { prompt: "MOON : NNPM :: FIRE : ?", answer: "GHSD", method: "Gaps +1, \\(-1\\), +1, \\(-1\\)." },
        { prompt: "Vowels move one place forward and consonants one place back. What does BEAN become?", answer: "AFBM" },
        { prompt: "WORD : ARTE :: CART : ?", answer: "GDTU", method: "Gaps +4, +3, +2, +1." },
      ],
      pyqExampleId: "9aff1b8b-fb36-4688-b99b-a8d786c025dc",
      traps: [
        {
          title: "Dropping the sign of a gap",
          body:
            "From O to M is 2 back, not 2 forward. Write every gap with its sign; a pattern such as +2, \\(-2\\) is invisible if all the gaps are written as 2.",
        },
        {
          title: "Treating vowels like the other letters",
          body:
            "When the gaps agree for some letters and not others, check whether the odd ones are all vowels. A rule with one gap for vowels and another for consonants hides behind gaps that look random.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranlt-opposite",
      name: "Opposite letters: pairs that add to 27",
      intuition:
        "Write the alphabet forward and backward in two rows, one under the other: A sits over Z, B over Y, and so on. A letter and the one beneath it are opposite letters, and their positions always add to 27.",
      definition:
        "- The thirteen opposite pairs: **AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN**.\n" +
        "- To find an opposite, take the position away from 27: K is 11, and \\(27 - 11 = 16\\), which is P.\n" +
        "- Spot it fast: if a letter and its code letter add to 27, test the rest of the word for the same rule.\n" +
        "- Some codes take the opposite and then shift it one or two places, or use 26 less the position (one before the opposite). Check one letter both ways.",
      formula: {
        label: "Opposite letter",
        latex: "n + n_{\\text{opp}} = 27",
        symbols: [{ symbol: "\\(n_{\\text{opp}}\\)", meaning: "the position of the opposite letter" }],
      },
      authoredExample: {
        prompt: "BIRD : YRIW :: FROG : ?",
        steps: [
          "B (2) and Y (25) add to 27, and so do I and R, R and I, D and W. Each letter is replaced by its opposite.",
          "FROG: F to U, R to I, O to L, G to T.",
        ],
        answer: "UILT",
      },
      selfCheckExample: {
        prompt: "HEN : SVM :: COW : ?",
        steps: [
          "H and S, E and V, N and M are opposite pairs.",
          "COW: C to X, O to L, W to D.",
        ],
        answer: "XLD",
      },
      practiceSet: [
        { prompt: "What is the opposite letter of K?", answer: "P", method: "\\(27 - 11 = 16\\)." },
        { prompt: "JAM : QZN :: TOP : ?", answer: "GLK", method: "Opposite letters." },
        { prompt: "Which letter is the opposite of the 6th letter of the alphabet?", answer: "U", method: "The 6th letter is F, and F pairs with U." },
        { prompt: "Take the opposite of each letter, then move it one place forward. What does ACE become?", answer: "AYW", method: "A to Z to A, C to X to Y, E to V to W." },
      ],
      pyqExampleId: "3d0748b6-32cc-4cbf-a361-53894e07488e",
      traps: [
        {
          title: "Opposite letters are not a reversed word",
          body:
            "Reversing BIRD gives DRIB: the same letters in a new order. The opposite-letter code YRIW changes every letter. Check whether the code uses the word's own letters before you choose the rule.",
        },
        {
          title: "One before the opposite",
          body:
            "If a letter and its code add to 26 rather than 27, the rule is 'one before the opposite'. Test the sum on two letters; using the plain opposite then gives an answer one letter off throughout.",
        },
      ],
    },
  ],
};
