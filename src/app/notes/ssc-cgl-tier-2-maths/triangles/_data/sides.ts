import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TR_SIDES_NOTE: SubtopicNote = {
  subtopicName: "Sides, Bisectors and Midpoints",
  title: "Sides, Bisectors and Midpoints",
  oneLineDefinition:
    "Pythagoras and its converse sort right, acute and obtuse triangles, the cosine rule handles any angle, an angle bisector splits the opposite side in the ratio of the neighbouring sides, and a midline is half the parallel side.",
  whyItMatters:
    "8 questions in the Tier II bank, 5 EASY and 3 MODERATE. Each turns on one named result; recognising which result the stem is pointing at is most of the work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2trsi-pythagoras",
      name: "Pythagoras, its converse and the cosine rule",
      intuition:
        "For a right-angled triangle, the hypotenuse squared equals the other two sides squared and added. Turned round, comparing the longest side's square with that sum tells you whether the largest angle is right, acute or obtuse.",
      definition:
        "- Right angle at C: \\(c^2 = a^2 + b^2\\).\n" +
        "- With c the longest side: \\(c^2 < a^2 + b^2\\) means acute, \\(=\\) means right, \\(>\\) means obtuse.\n" +
        "- Cosine rule for any angle: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\). For an obtuse C the cosine is negative, so the last term adds.\n" +
        "- Triples worth knowing: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25; 20, 21, 29; 12, 35, 37; 48, 55, 73.",
      formula: {
        label: "The cosine rule",
        latex: "c^2 = a^2 + b^2 - 2ab\\cos C",
      },
      authoredExample: {
        prompt: "The sides of a triangle are 7, 8 and 12. Is its largest angle acute, right or obtuse?",
        steps: ["\\(12^2 = 144\\) and \\(7^2 + 8^2 = 113\\).", "144 is larger, so the angle opposite 12 is obtuse."],
        answer: "Obtuse",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, AB = 5, AC = 8 and angle A = 60°. Find BC.",
        steps: ["\\(BC^2 = 25 + 64 - 2 \\times 5 \\times 8 \\times \\frac{1}{2} = 49\\).", "\\(BC = 7\\)."],
        answer: "7",
      },
      practiceSet: [
        { prompt: "Is a triangle with sides 9, 12 and 15 right angled?", answer: "Yes" },
        { prompt: "Find the hypotenuse of a right triangle with legs 20 and 21.", answer: "29" },
        { prompt: "A triangle has sides 6, 7 and 9. Is it acute, right or obtuse?", answer: "Acute", method: "81 is less than 85." },
      ],
      pyqExampleId: "6f2bced9-03f9-496e-adc1-e13f2e0c2c10",
      traps: [
        {
          title: "Testing a side that is not the longest",
          body: "Only the LONGEST side's square decides the type of triangle. Comparing a shorter side's square with the other two tells you nothing about the largest angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trsi-bisector",
      name: "The angle-bisector theorem",
      intuition:
        "The bisector of an angle cuts the opposite side in the ratio of the two sides that make the angle. The longer neighbouring side gets the longer piece.",
      definition:
        "- If AD bisects angle A, then \\(BD : DC = AB : AC\\).\n" +
        "- So \\(BD = BC \\times \\frac{AB}{AB + AC}\\).\n" +
        "- Any point on an angle bisector is the same distance from both arms. On the hypotenuse of a right triangle with legs a and b, the bisector of the right angle lands at distance \\(\\frac{ab}{a + b}\\) from each leg.",
      formula: {
        label: "Angle-bisector theorem",
        latex: "\\frac{BD}{DC} = \\frac{AB}{AC}",
      },
      authoredExample: {
        prompt: "In triangle ABC, AB = 9, AC = 6 and BC = 10. The bisector of angle A meets BC at D. Find BD.",
        steps: ["\\(BD : DC = 9 : 6 = 3 : 2\\).", "\\(BD = 10 \\times \\frac{3}{5} = 6\\)."],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "In triangle PQR, the bisector of angle P meets QR at S. PQ = 8, PR = 12 and QS = 4. Find QR.",
        steps: ["\\(QS : SR = 8 : 12\\), so \\(SR = 6\\).", "\\(QR = 4 + 6 = 10\\)."],
        answer: "10",
      },
      practiceSet: [
        { prompt: "AB = 6, AC = 9 and BC = 10; the bisector of angle A meets BC at D. Find DC.", answer: "6" },
        { prompt: "The bisector of angle A cuts BC into BD = 3 cm and DC = 5 cm, and AB = 6 cm. Find AC.", answer: "10 cm" },
        { prompt: "A right triangle has legs 6 and 12. The bisector of the right angle meets the hypotenuse at P. How far is P from each leg?", answer: "4", method: "\\(\\frac{6 \\times 12}{18}\\)" },
      ],
      pyqExampleId: "6db3f7cb-2422-4c08-a0c8-d4c9c6bf4fef",
      traps: [
        {
          title: "Pairing each piece with the wrong side",
          body: "BD lies next to B, so it goes with AB; DC lies next to C, so it goes with AC. Swapping them reverses the split.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trsi-midpoint",
      name: "The midpoint theorem",
      intuition:
        "Join the middles of two sides of a triangle and the line you draw is parallel to the third side and half as long. Spotting two midpoints is often the whole question.",
      definition:
        "- If M and N are the midpoints of AB and AC, then \\(MN \\parallel BC\\) and \\(MN = \\frac{1}{2}BC\\).\n" +
        "- Run a line from the middle of one side, keeping it parallel to another side, and it meets the third side exactly at its middle.\n" +
        "- An angle bisector that meets a line at right angles makes an isosceles triangle, and so creates a midpoint you can use.",
      formula: {
        label: "The midline",
        latex: "MN = \\tfrac{1}{2}BC \\text{ when } M, N \\text{ are the midpoints of } AB, AC",
      },
      authoredExample: {
        prompt: "In triangle ABC, BC = 14 cm. M and N are the midpoints of AB and AC. Find MN.",
        steps: ["MN is parallel to BC and half its length.", "\\(MN = 7\\) cm."],
        answer: "7 cm",
      },
      selfCheckExample: {
        prompt: "Join the middles of the three sides of a triangle whose sides are 8, 10 and 12. What is the perimeter of the triangle inside?",
        steps: ["Each side of the small triangle is half a side of the large one: 4, 5 and 6.", "Perimeter \\(= 15\\)."],
        answer: "15",
      },
      practiceSet: [
        { prompt: "MN joins the midpoints of AB and AC, and MN = 4.5 cm. Find BC.", answer: "9 cm" },
        { prompt: "A triangle has perimeter 30 cm. Find the perimeter of the triangle made by joining the midpoints of its sides.", answer: "15 cm" },
        { prompt: "M is the midpoint of AB, and the line through M parallel to BC meets AC at N. If AC = 11 cm, find AN.", answer: "5.5 cm" },
      ],
      pyqExampleId: "8dd202aa-a4ae-42fc-b21a-a1969d4406b0",
      traps: [
        {
          title: "Halving the wrong side",
          body: "A midline is half the side it runs PARALLEL to, the third side, not half of either side its ends sit on.",
        },
      ],
    },
  ],
};
