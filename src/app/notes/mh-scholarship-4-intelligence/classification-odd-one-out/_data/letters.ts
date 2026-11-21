import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_CL_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letter and Figure Groups",
  title: "Letter and Figure Groups",
  oneLineDefinition:
    "Turn letters into their place numbers in the alphabet to see the rule, and compare figures part by part: what they hold, how many, and in which order.",
  whyItMatters:
    "4 of the chapter's 9 questions: 1 EASY and 3 MODERATE. Two are letter pairs (count the letters skipped, or compare the place numbers) and two are figures (the same shape outside and inside, and parts in a clockwise order).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ms4clle-places",
      name: "Letters by their place in the alphabet",
      intuition:
        "A letter pair hides a number rule. Write each letter's place in the alphabet (A is 1, B is 2) and the rule becomes a sum you already know how to check.",
      definition:
        "- Know the **place numbers**. Five anchors help: E is 5, J is 10, O is 15, T is 20, Y is 25 (remember EJOTY).\n" +
        "- **Count the letters skipped** between the two letters of a pair: Q (R) S skips one letter.\n" +
        "- Or compare the **place numbers**: is the second double the first, or a fixed number more?\n" +
        "- **Opposite letters** add up to 27: A and Z (1 + 26), B and Y, M and N.",
      table: {
        columns: ["Letter", "Place", "Letter", "Place"],
        rows: [
          { cells: ["A", "1", "N", "14"] },
          { cells: ["B", "2", "O", "15"] },
          { cells: ["C", "3", "P", "16"] },
          { cells: ["D", "4", "Q", "17"] },
          { cells: ["E", "5", "R", "18"] },
          { cells: ["F", "6", "S", "19"] },
          { cells: ["G", "7", "T", "20"] },
          { cells: ["H", "8", "U", "21"] },
          { cells: ["I", "9", "V", "22"] },
          { cells: ["J", "10", "W", "23"] },
          { cells: ["K", "11", "X", "24"] },
          { cells: ["L", "12", "Y", "25"] },
          { cells: ["M", "13", "Z", "26"] },
        ],
        caption: "Each letter and its place in the alphabet.",
      },
      selfCheckExample: {
        prompt: "Which pair fits the group BD, FH, PR: MN, TV, CG or XY?",
        steps: ["In BD, FH and PR one letter is skipped: B (C) D. In TV one letter is skipped: T (U) V."],
        answer: "TV",
      },
      practiceSet: [
        { prompt: "Find the odd term: AB, CD, EF, GI.", answer: "GI. In the others the two letters are next to each other; G and I have H between them." },
        { prompt: "Which pair fits the group BE, FI, KN: MP, OQ, RT or ST?", answer: "MP. Each pair skips two letters, as M (N O) P does." },
        { prompt: "Write the place numbers of the letters J and T.", answer: "J is 10 and T is 20." },
        { prompt: "Find the odd term: AZ, BY, CX, DV.", answer: "DV. A + Z, B + Y and C + X each add up to 27; D + V is 4 + 22 = 26." },
      ],
      pyqExampleId: "1213ac20-50a3-4ad0-b11d-5ef6c0861411",
      traps: [
        {
          title: "Counting the end letters as skipped",
          body: "In QS only R is skipped. Count the letters BETWEEN the two, not the two letters themselves.",
        },
        {
          title: "Guessing a place number",
          body: "Count from an anchor instead: for R, start at T = 20 and go back two, so R is 18.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4clle-shapes",
      name: "Figures: parts, number and order",
      intuition:
        "Three figures that belong together are often the same picture turned round. Look at what each figure holds, how many of each part, and the order of the parts as you go round it. The one that changes something a turn cannot change is the odd one.",
      definition:
        "- **Compare the parts**: which shapes, lines, dots or arrows are there?\n" +
        "- **Count**: the same number of lines, sides or dots?\n" +
        "- **Shading**: which parts are black and which are white?\n" +
        "- **Order going clockwise**: turning a figure keeps this order. Only a mirror flip reverses it.\n" +
        "- **Outside and inside**: is the outer shape the same as the inner one?",
      authoredExample: {
        prompt: "Four figures each show one arrow. In (1) it points up, in (2) right, in (3) down, and in (4) up with a head at both ends. Which is the odd one?",
        steps: [
          "(1), (2) and (3) are the same one-headed arrow, turned to face different ways.",
          "Figure (4) has two heads. A turn cannot add a head, so it is a different figure.",
        ],
        answer: "Figure (4)",
      },
      selfCheckExample: {
        prompt: "Three figures are one triangle with a black dot, turned to different sides. The fourth is the same triangle seen in a mirror. Which is the odd one?",
        steps: ["Turning keeps the clockwise order of the parts; a mirror reverses it. So the mirror figure cannot be made by turning."],
        answer: "The mirror figure",
      },
      practiceSet: [
        { prompt: "Three figures are drawn with 4 lines each and one with 5 lines. Which is the odd one?", answer: "The figure with 5 lines" },
        { prompt: "Three figures each show a shape inside the same shape (a circle in a circle, a square in a square, a triangle in a triangle). The fourth shows a square inside a circle. Which is the odd one?", answer: "The square inside the circle, because its outer and inner shapes differ" },
        { prompt: "Can turning a figure change the clockwise order of its parts?", answer: "No. Turning keeps the order; only a mirror flip reverses it." },
        { prompt: "Three figures each have two black dots and one white dot. The fourth has one black dot and two white dots. Which is the odd one?", answer: "The figure with two white dots" },
      ],
      pyqExampleId: "a5c39e1e-bc16-436c-a4c4-7b931e0f58f7",
      traps: [
        {
          title: "Calling a turned figure different",
          body: "A figure turned a quarter or half way round is still the same figure. Check the order of its parts before calling it the odd one.",
        },
        {
          title: "Missing a reversed order",
          body: "A mirror figure looks almost the same. Go round each figure clockwise and say the parts in order; the reversed one stands out.",
        },
      ],
    },
  ],
};
