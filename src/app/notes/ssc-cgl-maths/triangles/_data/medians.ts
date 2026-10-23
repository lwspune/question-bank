import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_MEDIANS_NOTE: SubtopicNote = {
  subtopicName: "Medians and Apollonius Theorem",
  title: "Medians and Apollonius Theorem",
  oneLineDefinition:
    "A median joins a corner to the midpoint of the opposite side; the three medians meet at the centroid, two thirds of the way along each, and Apollonius' theorem gives a median's length from the sides.",
  whyItMatters:
    "Ten questions in the bank, 9 EASY and 1 MODERATE, four of them from the 2025 shifts. Four use the 2 : 1 split at the centroid, three the equal areas that medians make, and three Apollonius' theorem or the median to a hypotenuse. They are quick marks once the 2 : 1 is read from the right end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctrmd-centroid",
      name: "The centroid divides each median in the ratio 2 : 1",
      intuition:
        "The centroid is the balance point of a triangle cut from card. It sits on every median, twice as far from the corner as from the midpoint of the opposite side.",
      definition:
        "- A **median** joins a corner to the midpoint of the opposite side. The three medians meet at one point, the **centroid** G.\n" +
        "- G divides each median **2 : 1 from the corner**: on the median AD, \\(AG = \\frac{2}{3}AD\\) and \\(GD = \\frac{1}{3}AD\\), so \\(AD = 3 \\times GD\\).\n" +
        "- **Equilateral triangle of side \\(a\\):** each median is also the height, \\(\\frac{\\sqrt{3}}{2}a\\), so the distance from a corner to the centroid is \\(\\frac{2}{3} \\times \\frac{\\sqrt{3}}{2}a = \\frac{a}{\\sqrt{3}}\\).\n" +
        "- **Two medians at right angles:** if AD and BE meet at G at 90°, triangle AGB is right-angled with legs \\(AG = \\frac{2}{3}AD\\) and \\(BG = \\frac{2}{3}BE\\), so Pythagoras gives AB.",
      formula: {
        label: "Centroid on a median",
        latex: "AG = \\frac{2}{3}AD \\qquad GD = \\frac{1}{3}AD",
        symbols: [
          { symbol: "AD", meaning: "the median from A to the midpoint D of BC" },
          { symbol: "G", meaning: "the centroid" },
        ],
      },
      authoredExample: {
        prompt: "In triangle PQR, the median PM is 21 cm long and G is the centroid. Find PG and GM.",
        steps: ["\\(PG = \\frac{2}{3} \\times 21 = 14\\) cm.", "\\(GM = \\frac{1}{3} \\times 21 = 7\\) cm. Check: \\(14 : 7 = 2 : 1\\)."],
        answer: "PG = 14 cm, GM = 7 cm",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, the medians AD and BE meet at G at right angles, AD = 7.5 cm and BE = 18 cm. Find AB.",
        steps: [
          "\\(AG = \\frac{2}{3} \\times 7.5 = 5\\) cm and \\(BG = \\frac{2}{3} \\times 18 = 12\\) cm.",
          "\\(AB = \\sqrt{5^2 + 12^2} = 13\\) cm.",
        ],
        answer: "13 cm",
      },
      practiceSet: [
        { prompt: "G is the centroid of triangle ABC, and AG = 10 cm on the median AD. Find AD.", answer: "15 cm" },
        { prompt: "A median of a triangle is 27 cm long. How far is the centroid from the midpoint end of that median?", answer: "9 cm" },
        { prompt: "Find the distance from a corner to the centroid of an equilateral triangle of side 9 cm.", answer: "\\(3\\sqrt{3}\\) cm" },
      ],
      pyqExampleId: "3fdd2605-5136-4837-8c72-30de40036dff",
      traps: [
        {
          title: "Reading 2 : 1 from the wrong end",
          body: "The longer part of a median is the one at the corner. GD, at the midpoint end, is one third of the median.",
        },
        {
          title: "Using whole medians when two medians cross at 90°",
          body: "The right angle is at the centroid, so the right triangle's legs are the two-thirds parts AG and BG, not the full medians.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrmd-area",
      name: "A median halves the area, and the centroid makes equal parts",
      intuition:
        "Two triangles with the same height have areas in the ratio of their bases. A median gives two equal bases under one height, so it cuts the area exactly in half.",
      definition:
        "- **Same height, compare the bases:** triangles with their top corner at A and bases on BC have areas in the ratio of their bases.\n" +
        "- So a **median AD halves the area**: ar(ABD) = ar(ACD) = \\(\\frac{1}{2}\\) ar(ABC).\n" +
        "- The three medians cut a triangle into **six small triangles of equal area**, each \\(\\frac{1}{6}\\) of the whole.\n" +
        "- So **GAB, GBC and GCA each have \\(\\frac{1}{3}\\)** of the area, where G is the centroid.",
      formula: {
        label: "Areas made by medians",
        latex: "\\text{ar}(ABD) = \\frac{1}{2}\\,\\text{ar}(ABC) \\qquad \\text{ar}(GBC) = \\frac{1}{3}\\,\\text{ar}(ABC)",
      },
      authoredExample: {
        prompt:
          "Triangle ABC has an area of 72 cm². AD is a median and G is the centroid. Find the areas of triangles ABD, GBC and GBD.",
        steps: [
          "The median halves the area: ar(ABD) \\(= 36\\) cm².",
          "The centroid triangles are thirds: ar(GBC) \\(= 24\\) cm².",
          "GD is a median of triangle GBC, so it halves that: ar(GBD) \\(= 12\\) cm², one sixth of 72.",
        ],
        answer: "36 cm², 24 cm², 12 cm²",
      },
      selfCheckExample: {
        prompt: "In triangle PQR of area 40 cm², S is a point on QR with QS : SR = 2 : 3. Find the area of triangle PQS.",
        steps: ["Triangles PQS and PSR have the same height from P, so their areas are in the ratio 2 : 3.", "ar(PQS) \\(= \\frac{2}{5} \\times 40 = 16\\) cm²."],
        answer: "16 cm²",
      },
      practiceSet: [
        { prompt: "AD is a median of triangle ABC. Find the ratio of the areas of triangles ABD and ADC.", answer: "1 : 1" },
        { prompt: "The three medians of a triangle of area 90 cm² are drawn. Find the area of each of the six small triangles.", answer: "15 cm²" },
        { prompt: "G is the centroid of triangle ABC, whose area is 54 cm². Find the area of triangle GCA.", answer: "18 cm²" },
      ],
      pyqExampleId: "13211057-1b26-47db-a1c0-b7656b06641b",
      traps: [
        {
          title: "Taking the centroid triangles as quarters",
          body: "GAB, GBC and GCA are each a third of the triangle. The quarter belongs to the triangle that joins the midpoints of the sides.",
        },
        {
          title: "Thinking a median quarters the area",
          body: "A median halves one side and keeps the height, so it halves the area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrmd-apollonius",
      name: "Apollonius theorem: the length of a median",
      intuition:
        "Drop the median AD onto BC and the two sides AB and AC lean out on either side of it. Apollonius' theorem ties their squares to the median and the half-side, the way Pythagoras ties the sides of a right triangle.",
      definition:
        "- For the median AD to BC: **\\(AB^2 + AC^2 = 2(AD^2 + BD^2)\\)**, where \\(BD = \\frac{1}{2}BC\\).\n" +
        "- Solved for the median: \\(AD = \\frac{1}{2}\\sqrt{2AB^2 + 2AC^2 - BC^2}\\).\n" +
        "- **Median to the hypotenuse:** if \\(\\angle A = 90^\\circ\\), then \\(AB^2 + AC^2 = BC^2\\) and the theorem gives \\(AD = \\frac{1}{2}BC\\). The midpoint of the hypotenuse is the same distance from all three corners.\n" +
        "- Two equal medians come from two equal sides, so a triangle with all three medians equal is equilateral.",
      formula: {
        label: "Apollonius theorem",
        latex: "AB^2 + AC^2 = 2(AD^2 + BD^2) \\qquad AD = \\frac{1}{2}\\sqrt{2AB^2 + 2AC^2 - BC^2}",
        symbols: [{ symbol: "D", meaning: "the midpoint of BC, so BD is half of BC" }],
      },
      authoredExample: {
        prompt: "In triangle ABC, AB = 7 cm, AC = 9 cm and BC = 8 cm. Find the median AD.",
        steps: [
          "\\(AD = \\frac{1}{2}\\sqrt{2 \\times 49 + 2 \\times 81 - 64} = \\frac{1}{2}\\sqrt{196} = 7\\) cm.",
          "Check: \\(49 + 81 = 130\\) and \\(2(7^2 + 4^2) = 2 \\times 65 = 130\\).",
        ],
        answer: "7 cm",
      },
      selfCheckExample: {
        prompt: "Triangle PQR is right-angled at P, and QR = 26 cm. Find the length of the median from P.",
        steps: ["The median from the right angle goes to the midpoint of the hypotenuse QR.", "It is half the hypotenuse: 13 cm."],
        answer: "13 cm",
      },
      practiceSet: [
        {
          prompt: "In triangle ABC, AD is the median to BC, AB = 6 cm, AC = 8 cm and AD = 5 cm. Find BC.",
          answer: "10 cm",
          method: "\\(36 + 64 = 2(25 + BD^2)\\), so \\(BD = 5\\).",
        },
        { prompt: "All three medians of a triangle are equal. What kind of triangle is it?", answer: "Equilateral" },
        { prompt: "A triangle has sides 10 cm, 10 cm and 12 cm. Find the median to the 12 cm side.", answer: "8 cm" },
      ],
      pyqExampleId: "60c2d1d1-b368-48b7-9cb0-57c364e383ca",
      traps: [
        {
          title: "Dropping the 2 in Apollonius",
          body: "The theorem is AB² + AC² = 2AD² + 2BD². Writing AD² + BD² on the right halves the answer's square.",
        },
        {
          title: "Using the whole side where the half is needed",
          body: "BD in the theorem is half of BC, because D is the midpoint. Put BC itself in only through the form with 2AB² + 2AC² − BC².",
        },
      ],
    },
  ],
};
