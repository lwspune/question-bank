import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_AN_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Word, Number and Letter Pairs",
  title: "Word, Number and Letter Pairs",
  oneLineDefinition:
    "Say how the first two terms are linked in one short sentence, then use the same sentence, in the same direction, to find the missing term.",
  whyItMatters:
    "3 of the chapter's 5 questions: 1 EASY and 2 MODERATE, one each for words (who a teacher teaches), numbers (the digit sum, squared) and letters (each letter moved one place, then the two swapped).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4anpa-words",
      name: "Word pairs",
      intuition:
        "A word pair is a small sentence in hiding. Pen : Write means a pen is used to write. Find that sentence first, and the second pair answers itself.",
      definition:
        "- Common links: **worker and the person served** (doctor, patient), **tool and its use** (pen, write), **animal and its home** (bird, nest), **animal and its young** (cow, calf), **opposites** (hot, cold).\n" +
        "- Keep the **same direction**: if the first word is the worker, the third word is a worker too.\n" +
        "- Make your sentence **exact**: \"treats\" is better than \"goes with\".",
      authoredExample: {
        prompt: "Pen : Write : : Knife : ?",
        steps: [
          "The link: a pen is used to write.",
          "Use the same sentence: a knife is used to cut.",
        ],
        answer: "Cut",
      },
      selfCheckExample: {
        prompt: "Bird : Nest : : Lion : ?",
        steps: ["A bird lives in a nest. A lion lives in a den."],
        answer: "Den",
      },
      practiceSet: [
        { prompt: "Cow : Calf : : Dog : ?", answer: "Puppy, the young one of a dog" },
        { prompt: "Eye : See : : Ear : ?", answer: "Hear" },
        { prompt: "Doctor : Hospital : : Farmer : ?", answer: "Field, the place where a farmer works" },
        { prompt: "Hot : Cold : : Day : ?", answer: "Night, its opposite" },
      ],
      pyqExampleId: "9de1debb-3089-4ab0-bd28-6d73017725e5",
      traps: [
        {
          title: "Picking a word from the same topic",
          body: "For a teacher, \"school\" and \"knowledge\" are about teaching too, but the first pair links a worker to the person served. Only \"student\" keeps that link.",
        },
        {
          title: "Turning the pair round",
          body: "Patient : Doctor is not the same as Doctor : Patient. Keep the order of the first pair.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4anpa-numbers",
      name: "Number pairs",
      intuition:
        "Two numbers are linked by a rule you can test: double it, square it, add its digits. Find a rule that turns the first number into the second, then check it against the options.",
      definition:
        "- Try these rules in order: **add or take away**, **multiply** (double, times 3), **square** (\\(7 \\times 7 = 49\\)), **square plus or minus 1**, **add the digits**.\n" +
        "- A rule can have **two steps**: add the digits, then square the sum.\n" +
        "- Several rules can fit one pair. Use the **options** to decide: the right rule gives one of them.",
      authoredExample: {
        prompt: "3 : 10 : : 6 : ? (choose from 12, 37, 20, 36)",
        steps: [
          "Add 7: \\(3 + 7 = 10\\), and \\(6 + 7 = 13\\). 13 is not an option, so this is not the rule.",
          "Square plus 1: \\(3 \\times 3 + 1 = 10\\). For 6: \\(6 \\times 6 + 1 = 37\\), which is an option.",
        ],
        answer: "37",
      },
      selfCheckExample: {
        prompt: "14 : 5 : : 23 : ? (choose from 6, 5, 9, 32)",
        steps: ["Add the digits: 1 + 4 = 5. For 23: 2 + 3 = 5."],
        answer: "5",
      },
      practiceSet: [
        { prompt: "8 : 64 : : 11 : ? (choose from 88, 121, 111, 19)", answer: "121, the square of 11" },
        { prompt: "10 : 21 : : 15 : ? (choose from 30, 31, 25, 45)", answer: "31. Double the number and add 1." },
        { prompt: "7 : 50 : : 9 : ? (choose from 82, 81, 72, 90)", answer: "82. Square the number and add 1." },
        { prompt: "12 : 9 : : 31 : ? (choose from 16, 4, 64, 8)", answer: "16. Add the digits (1 + 2 = 3), then square (3 × 3 = 9). For 31: 3 + 1 = 4, and 4 × 4 = 16." },
      ],
      pyqExampleId: "47afad7f-de33-48be-a940-adf88458eb6d",
      traps: [
        {
          title: "Stopping at the first rule that fits",
          body: "A pair like 3 : 10 fits more than one rule (add 7, or square plus 1). Keep the rule whose answer is among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4anpa-letters",
      name: "Letter pairs",
      intuition:
        "Letter pairs change in small steps: each letter moves forward or back a few places, or the two letters change places. Write the place numbers and watch what happens to each letter.",
      definition:
        "- **Move**: count how many places each letter moves, forward (A to B) or back (B to A).\n" +
        "- **Swap**: check whether the letters have changed places.\n" +
        "- **Opposite letters**: A and Z, B and Y, C and X (the places add up to 27).\n" +
        "- Do the **same moves to the same positions** in the second pair.",
      authoredExample: {
        prompt: "AC : BD : : PR : ?",
        steps: [
          "A moves 1 forward to B, and C moves 1 forward to D.",
          "Do the same to PR: P moves to Q and R moves to S.",
        ],
        answer: "QS",
      },
      selfCheckExample: {
        prompt: "CE : FH : : LN : ?",
        steps: ["C to F is 3 forward, E to H is 3 forward. L moves 3 to O, N moves 3 to Q."],
        answer: "OQ",
      },
      practiceSet: [
        { prompt: "AB : ZY : : CD : ?", answer: "XW. Each letter becomes its opposite letter: C to X, D to W." },
        { prompt: "BD : DB : : MO : ?", answer: "OM. The two letters change places." },
        { prompt: "AE : BF : : GK : ?", answer: "HL. Each letter moves 1 forward." },
        { prompt: "DF : CE : : PR : ?", answer: "OQ. Each letter moves 1 back." },
      ],
      pyqExampleId: "ad677b4e-37f8-49f1-b46d-021e95820146",
      traps: [
        {
          title: "Missing a swap",
          body: "When the moved letters also change places, a pair can look wrong even though every move is right. Track each letter separately: where did it go, and where did it end up?",
        },
      ],
    },
  ],
};
