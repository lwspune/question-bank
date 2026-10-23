import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RDC_TURNING_NOTE: SubtopicNote = {
  subtopicName: "Turning About a Common Face",
  title: "Turning About a Common Face",
  oneLineDefinition:
    "When two views of a dice show the same face in the same place, the dice has turned about that face, so the faces sitting in matching places in the two views are opposite each other.",
  whyItMatters:
    "Twenty-two questions in the bank, 4 from the 2023 shifts and 18 from the 2024 shifts, with 4 EASY and 18 MODERATE. The neighbour rule alone often cannot reach the face asked for here; the common-face rule gives every opposite pair in one step.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrdctu-common",
      name: "Faces in matching places are opposite",
      intuition:
        "If a face stays in the same place in two views, the dice has only turned round it. The four faces around it keep their order, so each face in the first view has been replaced, in the same spot, by the face opposite it.",
      definition:
        "1. Find the face shown in both views.\n" +
        "2. Check that it sits in the same place in both (both on top, or both on the right).\n" +
        "3. Pair the other faces by position: the first view's top with the second view's top, its left with the second's left. Each pair is opposite.\n" +
        "4. The common face is opposite the one face that appears in neither view.\n" +
        "- If the common face is in different places, the rule does not apply directly; use the neighbour rule, or go round the common face in the same direction in both views.\n" +
        "- **Fast route:** with the common face in the same place, read the answer straight off the matching position.",
      authoredExample: {
        prompt:
          "Two views of a dice: (top 4, left 1, right 2) and (top 6, left 1, right 3). Which number is opposite 4?",
        steps: [
          "1 is in both views, on the left each time.",
          "So the faces in matching places are opposite: top 4 with top 6, and right 2 with right 3.",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt:
          "Two views of a dice with letters: (top K, front L, right M) and (top N, front O, right M). Which letter is opposite L?",
        steps: ["M is on the right in both views.", "Matching places: top K with top N, and front L with front O."],
        answer: "O",
      },
      practiceSet: [
        { prompt: "When a face sits in the same place in two views, which faces are opposite?", answer: "The faces in matching places." },
        { prompt: "Two views share face 3 on top. The first shows 1 on the left and 5 on the right; the second shows 6 on the left and 2 on the right. Which number is opposite 1?", answer: "6" },
        { prompt: "In those two views, which number is opposite 3?", answer: "4", method: "The one number that appears in neither view." },
        { prompt: "Does the matching-places rule work when the common face is in a different place in the two views?", answer: "No: use the neighbour rule instead." },
      ],
      pyqExampleId: "8ec43c33-616b-43d6-af8f-3c1729a315db",
      traps: [
        {
          title: "Using the rule when the common face has moved",
          body:
            "If the shared face is on top in one view and on the left in the other, matching positions do not pair opposite faces. Check that the common face is in the same place first.",
        },
        {
          title: "Pairing the common face with a shown face",
          body:
            "The common face is opposite the face that appears in neither view, not any face shown beside it. Every face shown with it is a neighbour.",
        },
        {
          title: "Matching a top with a front",
          body:
            "Pair the faces by exactly the same position: top with top, left with left. Pairing the first view's top with the second view's front gives a wrong pair.",
        },
      ],
    },
  ],
};
