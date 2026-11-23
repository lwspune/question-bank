import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_CL_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter and Figure Groups",
  title: "Letter and Figure Groups",
  oneLineDefinition:
    "Turn letters into place numbers and look at the gaps or the sums; for figures, count what each holds and check the order of its parts.",
  whyItMatters:
    "4 of the chapter's 9 questions, all MODERATE. Two are three-letter groups (place sums, and jumps of +3 then +6; MSCE's key accepts two answers for the second) and two are figures (circles inside shapes, and parts turned round a circle).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7clle-places",
      name: "Letter groups: gaps and place sums",
      intuition:
        "Write each letter's place number under it. Then two things usually show the rule: the jumps from one letter to the next, or what two of the letters add up to.",
      definition:
        "- Know the places: A 1, E 5, J 10, O 15, T 20, Y 25 (EJOTY), and Z 26.\n" +
        "- **Gaps**: the jump from each letter to the next (+2, +2, or +3 then +6).\n" +
        "- **Opposite letters** add to 27: A and Z, C and X, G and T.\n" +
        "- **Sums**: two letters may add to a fixed number such as 26.\n" +
        "- Check **every option** with the rule; a doubled jump can look like a new rule.",
      authoredExample: {
        prompt: "Select the odd term: ACE, BDF, GIK, LNQ.",
        steps: [
          "ACE: +2, +2. BDF: +2, +2. GIK: +2, +2.",
          "LNQ: L 12, N 14, Q 17, so +2 then +3.",
        ],
        answer: "LNQ",
      },
      selfCheckExample: {
        prompt: "Select the odd term: BCE, FGI, KLN, PQT.",
        steps: ["The first three go +1 then +2. P 16, Q 17, T 20 goes +1 then +3."],
        answer: "PQT",
      },
      practiceSet: [
        { prompt: "Select the odd term: CF, GJ, KN, OS.", answer: "OS. The others jump +3; O to S is +4." },
        { prompt: "Select the odd term: AZ, CX, EV, GS.", answer: "GS. The others are opposite letters adding to 27; G (7) and S (19) add to 26." },
        { prompt: "Which group matches DGJ, MPS, KNQ: BEH, CEG, FHJ or PRT?", answer: "BEH, which jumps +3, +3 like the group" },
        { prompt: "Select the odd term: BY, DW, FU, HT.", answer: "HT. B + Y, D + W and F + U add to 27; H + T is 8 + 20 = 28." },
      ],
      pyqExampleId: "3bd82ed4-2d22-473b-abf8-5c81e9792001",
      traps: [
        {
          title: "Testing only the first two letters",
          body: "A rule can involve the second and third letters too. Write all three place numbers before deciding.",
        },
        {
          title: "Misreading a doubled jump",
          body: "+4 then +8 is +3 then +6 made bigger, and both are a jump that doubles. Say the rule exactly before calling a group odd.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7clle-shapes",
      name: "Figures: counts and order",
      intuition:
        "Class 7 figure groups hide a number in the picture (dots inside a shape that depend on its sides) or a fixed order of parts that turning keeps. Count first, then check the order.",
      definition:
        "- **Count**: sides of the shape, dots or circles inside. Try a rule linking them: equal, double, double minus 1, one more.\n" +
        "- **A circle has no sides**, so a side-count rule cannot fit it.\n" +
        "- **Order**: go round each figure clockwise. A turned figure keeps the order; a mirrored one reverses it.\n" +
        "- **Position**: which end of a shape a small part sits at also stays the same under a turn.",
      authoredExample: {
        prompt: "A triangle holds 6 dots, a square 8 dots and a pentagon 10 dots. Which matches the group: a hexagon with 11 dots, a hexagon with 12 dots, an octagon with 14 dots, or a circle with 4 dots?",
        steps: [
          "Each shape holds twice its number of sides: \\(2 \\times 3 = 6\\), \\(2 \\times 4 = 8\\), \\(2 \\times 5 = 10\\).",
          "A hexagon needs \\(2 \\times 6 = 12\\) dots; an octagon would need 16.",
        ],
        answer: "The hexagon with 12 dots",
      },
      selfCheckExample: {
        prompt: "Going clockwise, three figures show a star, a dot, then a square; the fourth shows a star, a square, then a dot. Which is the odd one?",
        steps: ["Turning keeps the clockwise order. The fourth has the order reversed, so it is a mirror image."],
        answer: "The fourth figure",
      },
      practiceSet: [
        { prompt: "A square holds 3 lines, a pentagon 4 and a hexagon 5. Which matches: a triangle with 2 lines, a triangle with 3, or an octagon with 8?", answer: "The triangle with 2 lines (one fewer than its sides)" },
        { prompt: "Is a figure turned half way round still the same figure?", answer: "Yes. Its parts keep their order." },
        { prompt: "A square holds 5 dots and a triangle 4 dots. Which pentagon matches: one with 6 dots or one with 5?", answer: "The one with 6 dots (one more than its sides)" },
        { prompt: "Three figures each hold 2 small shapes inside a big one; the fourth holds 3. Which is the odd one?", answer: "The one holding 3 small shapes" },
      ],
      pyqExampleId: "aca55ae0-091a-4bd0-b3c4-de76e95b74d1",
      traps: [
        {
          title: "Counting carelessly",
          body: "A miscount of one dot breaks the rule. Count each figure twice, in a fixed order.",
        },
        {
          title: "Calling a turned figure odd",
          body: "A figure turned a quarter or half way is the same figure. Only a change of order or of parts makes it odd.",
        },
      ],
    },
  ],
};
