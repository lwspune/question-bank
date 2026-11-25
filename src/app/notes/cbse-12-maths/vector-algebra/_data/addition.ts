import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_ADDITION_NOTE: SubtopicNote = {
  subtopicName: "Addition of Vectors",
  title: "Addition of Vectors",
  oneLineDefinition:
    "Vectors add by the triangle law (AB + BC = AC) or the parallelogram law; a vector from A to B is the position vector of B minus that of A, and the diagonals of a parallelogram are the sum and difference of its sides.",
  whyItMatters:
    "28 questions, twenty of them from board papers. In 2022 the board asked for the lengths of both diagonals of a parallelogram. In 2023 it asked for the fourth vertex of a parallelogram, for AC from BA and BC, and for the length of b from a + b. In 2024 it asked which triangle three given vectors form (once as an assertion-reason item), the distance between two stars, and the range of the length of ka. In 2025 a case study asked for AC and BC from position vectors and to complete the figure, and the board asked for the coordinates of B from a given AB, for the median through A, for r as a combination of p and q, and for a range of lengths (that MCQ printed no correct option). In 2026 it asked to show three points form an isosceles triangle, for unit vectors along the diagonals, for the median vector, for an unknown that puts three toys on a line, for the greatest and least length of a multiple of a, and for both diagonals and their lengths. The textbook adds four questions from Exercise 10.2 and four from the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmva-triangle-law",
      name: "Triangle law and the vector joining two position vectors",
      intuition:
        "Walking from A to B and then from B to C lands you where walking straight from A to C would. That is the triangle law: \\(\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}\\). Going right round the triangle brings you back, so \\(\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA} = \\vec{0}\\). With an origin O, every vector between two points is head minus tail: \\(\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}\\).",
      definition:
        "- **Triangle law:** \\(\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}\\), and \\(\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA} = \\vec{0}\\).\n" +
        "- **Reversing:** \\(\\overrightarrow{BA} = -\\overrightarrow{AB}\\).\n" +
        "- **Head minus tail:** \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\), where \\(\\vec{a}\\), \\(\\vec{b}\\) are the position vectors of A and B.\n" +
        "- **In components:** add or subtract the matching components: \\((a_1 + b_1)\\hat{i} + (a_2 + b_2)\\hat{j} + (a_3 + b_3)\\hat{k}\\).\n" +
        "- \\(|\\vec{a} + \\vec{b}| \\le |\\vec{a}| + |\\vec{b}|\\): lengths do not simply add.",
      formula: {
        label: "Triangle law",
        latex: "\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}, \\qquad \\overrightarrow{AB} = \\vec{b} - \\vec{a}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of A and B from the origin" },
        ],
      },
      authoredExample: {
        prompt: "In triangle PQR, \\(\\overrightarrow{PQ} = 4\\vec{a}\\) and \\(\\overrightarrow{RQ} = 5\\vec{b}\\). Find \\(\\overrightarrow{PR}\\).",
        steps: [
          "By the triangle law, \\(\\overrightarrow{PR} = \\overrightarrow{PQ} + \\overrightarrow{QR}\\).",
          "\\(\\overrightarrow{QR} = -\\overrightarrow{RQ} = -5\\vec{b}\\).",
          "\\(\\overrightarrow{PR} = 4\\vec{a} - 5\\vec{b}\\).",
        ],
        answer: "\\(\\overrightarrow{PR} = 4\\vec{a} - 5\\vec{b}\\)",
      },
      selfCheckExample: {
        prompt: "A is the point \\((1, -2, 3)\\) and \\(\\overrightarrow{AB} = 2\\hat{i} + 5\\hat{j} - \\hat{k}\\). Find the coordinates of B.",
        steps: [
          "Let B be \\((x, y, z)\\). Then \\(\\overrightarrow{AB} = (x - 1)\\hat{i} + (y + 2)\\hat{j} + (z - 3)\\hat{k}\\).",
          "Compare components: \\(x - 1 = 2\\), \\(y + 2 = 5\\), \\(z - 3 = -1\\).",
          "\\(x = 3\\), \\(y = 3\\), \\(z = 2\\).",
        ],
        answer: "B is \\((3, 3, 2)\\)",
      },
      practiceSet: [
        { prompt: "Find the sum of \\(2\\hat{i} - \\hat{j} + 3\\hat{k}\\), \\(-\\hat{i} + 4\\hat{j} - \\hat{k}\\) and \\(3\\hat{i} - 2\\hat{j} + 5\\hat{k}\\).", answer: "\\(4\\hat{i} + \\hat{j} + 7\\hat{k}\\)" },
        { prompt: "Express \\(\\vec{r} = 4\\hat{i} + \\hat{j}\\) as \\(\\lambda\\vec{p} + \\mu\\vec{q}\\), where \\(\\vec{p} = \\hat{i} + \\hat{j}\\) and \\(\\vec{q} = \\hat{i} - \\hat{j}\\).", answer: "\\(\\lambda = \\dfrac{5}{2}\\), \\(\\mu = \\dfrac{3}{2}\\)", method: "\\(\\lambda + \\mu = 4\\) and \\(\\lambda - \\mu = 1\\)." },
        { prompt: "A man walks 3 km east and then 4 km north. Taking i east and j north, find his displacement and its length.", answer: "\\(3\\hat{i} + 4\\hat{j}\\); 5 km" },
      ],
      pyqExampleId: "ed2e940b-3671-4fcc-a32b-38d72b9e5738",
      traps: [
        {
          title: "Tail minus head",
          body: "\\(\\overrightarrow{AB}\\) is the position vector of B minus that of A. Writing \\(\\vec{a} - \\vec{b}\\) gives \\(\\overrightarrow{BA}\\), the same length pointing the wrong way.",
        },
        {
          title: "Adding lengths",
          body: "\\(|\\vec{a} + \\vec{b}|\\) is not \\(|\\vec{a}| + |\\vec{b}|\\) unless the two vectors point the same way. Add the vectors first, then find the length.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-parallelogram",
      name: "Parallelogram: diagonals, fourth vertex and the median",
      intuition:
        "Put two adjacent sides \\(\\vec{a}\\) and \\(\\vec{b}\\) of a parallelogram at one corner. Going along one side and then the other reaches the far corner, so one diagonal is \\(\\vec{a} + \\vec{b}\\). The other diagonal joins the two free ends, so it is \\(\\vec{b} - \\vec{a}\\) (or \\(\\vec{a} - \\vec{b}\\)). In a triangle, the median from A ends at the mid-point of BC, which is half-way between B and C: \\(\\overrightarrow{AD} = \\dfrac{1}{2}(\\overrightarrow{AB} + \\overrightarrow{AC})\\).",
      definition:
        "- **Parallelogram law:** with adjacent sides \\(\\overrightarrow{AB} = \\vec{a}\\), \\(\\overrightarrow{AD} = \\vec{b}\\), the diagonal \\(\\overrightarrow{AC} = \\vec{a} + \\vec{b}\\).\n" +
        "- **Other diagonal:** \\(\\overrightarrow{BD} = \\vec{b} - \\vec{a}\\).\n" +
        "- **Fourth vertex:** in parallelogram ABCD the diagonals bisect each other, so \\(\\vec{a} + \\vec{c} = \\vec{b} + \\vec{d}\\) and \\(\\vec{d} = \\vec{a} + \\vec{c} - \\vec{b}\\).\n" +
        "- **Median:** if D is the mid-point of BC, \\(\\overrightarrow{AD} = \\dfrac{\\overrightarrow{AB} + \\overrightarrow{AC}}{2}\\).\n" +
        "- **Sides from diagonals:** \\(\\vec{a} = \\dfrac{1}{2}(\\overrightarrow{AC} - \\overrightarrow{BD})\\), \\(\\vec{b} = \\dfrac{1}{2}(\\overrightarrow{AC} + \\overrightarrow{BD})\\).",
      formula: {
        label: "Diagonals and median",
        latex: "\\overrightarrow{AC} = \\vec{a} + \\vec{b}, \\quad \\overrightarrow{BD} = \\vec{b} - \\vec{a}, \\quad \\overrightarrow{AD} = \\dfrac{\\overrightarrow{AB} + \\overrightarrow{AC}}{2}",
      },
      authoredExample: {
        prompt: "The adjacent sides of a parallelogram are \\(\\vec{a} = 2\\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\vec{b} = \\hat{i} + 3\\hat{j} + \\hat{k}\\). Find the vectors along its diagonals and their lengths.",
        steps: [
          "One diagonal: \\(\\vec{a} + \\vec{b} = 3\\hat{i} + 4\\hat{j} - \\hat{k}\\).",
          "Its length: \\(\\sqrt{9 + 16 + 1} = \\sqrt{26}\\).",
          "Other diagonal: \\(\\vec{a} - \\vec{b} = \\hat{i} - 2\\hat{j} - 3\\hat{k}\\).",
          "Its length: \\(\\sqrt{1 + 4 + 9} = \\sqrt{14}\\).",
        ],
        answer: "\\(3\\hat{i} + 4\\hat{j} - \\hat{k}\\) of length \\(\\sqrt{26}\\); \\(\\hat{i} - 2\\hat{j} - 3\\hat{k}\\) of length \\(\\sqrt{14}\\)",
      },
      selfCheckExample: {
        prompt: "Three consecutive vertices of parallelogram ABCD are A\\((1, 0, 2)\\), B\\((3, 1, -1)\\) and C\\((4, 4, 0)\\). Find D.",
        steps: [
          "The diagonals bisect each other, so \\(\\vec{d} = \\vec{a} + \\vec{c} - \\vec{b}\\).",
          "\\(\\vec{d} = (1 + 4 - 3)\\hat{i} + (0 + 4 - 1)\\hat{j} + (2 + 0 + 1)\\hat{k} = 2\\hat{i} + 3\\hat{j} + 3\\hat{k}\\).",
        ],
        answer: "D is \\((2, 3, 3)\\)",
      },
      practiceSet: [
        { prompt: "In triangle ABC, \\(\\overrightarrow{AB} = 2\\hat{i} + 4\\hat{j}\\) and \\(\\overrightarrow{AC} = 4\\hat{i} - 2\\hat{k}\\). Find the median \\(\\overrightarrow{AD}\\) and its length.", answer: "\\(3\\hat{i} + 2\\hat{j} - \\hat{k}\\); \\(\\sqrt{14}\\)" },
        { prompt: "In parallelogram PQRS, \\(\\overrightarrow{PQ} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\) and \\(\\overrightarrow{QR} = \\hat{i} - 2\\hat{j} - \\hat{k}\\). Find the unit vector along \\(\\overrightarrow{PR}\\).", answer: "\\(\\dfrac{1}{\\sqrt{5}}(2\\hat{i} + \\hat{k})\\)" },
        { prompt: "In parallelogram ABCD, \\(\\overrightarrow{AC} = 3\\hat{i} + \\hat{j}\\) and \\(\\overrightarrow{BD} = \\hat{i} - 3\\hat{j}\\). Find \\(\\overrightarrow{AB}\\).", answer: "\\(\\hat{i} + 2\\hat{j}\\)", method: "\\(\\overrightarrow{AB} = \\dfrac{1}{2}(\\overrightarrow{AC} - \\overrightarrow{BD})\\)" },
      ],
      pyqExampleId: "cc304df0-1186-42ed-a1ed-1555a39295b4",
      traps: [
        {
          title: "The wrong fourth vertex",
          body: "For consecutive vertices A, B, C the fourth vertex is \\(\\vec{a} + \\vec{c} - \\vec{b}\\): the middle vertex is the one subtracted. \\(\\vec{a} + \\vec{b} - \\vec{c}\\) gives a different parallelogram.",
        },
        {
          title: "Median without the half",
          body: "\\(\\overrightarrow{AB} + \\overrightarrow{AC}\\) is the diagonal of the parallelogram on AB and AC. The median to BC is half of it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-triangle-sides",
      name: "Which triangle three vectors or points form",
      intuition:
        "Three vectors form the sides of a triangle when, taken in order, they close up: their sum is \\(\\vec{0}\\), or one is the sum of the other two. Then their lengths tell the type. Two equal lengths make it isosceles, three make it equilateral, and squares that obey Pythagoras (or two sides with a zero dot product) make it right-angled.",
      definition:
        "- **Sides of a triangle:** \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\), or one vector equals the sum of the other two, with no two of them collinear.\n" +
        "- **From three points:** find \\(\\overrightarrow{AB}\\), \\(\\overrightarrow{BC}\\), \\(\\overrightarrow{CA}\\) and their lengths.\n" +
        "- **Isosceles:** two lengths equal. **Equilateral:** all three equal.\n" +
        "- **Right-angled:** the squares of two lengths add up to the square of the third, or the dot product of the two sides at a vertex is 0.\n" +
        "- Write the conclusion in words: \"two sides are equal, so the triangle is isosceles\".",
      formula: {
        label: "Closing condition and the right-angle test",
        latex: "\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}, \\qquad |\\vec{p}|^2 + |\\vec{q}|^2 = |\\vec{r}|^2",
      },
      authoredExample: {
        prompt: "Show that the points A\\((1, 0, 0)\\), B\\((0, 1, 0)\\) and C\\((0, 0, 4)\\) form an isosceles triangle.",
        steps: [
          "\\(\\overrightarrow{AB} = -\\hat{i} + \\hat{j}\\), so \\(|\\overrightarrow{AB}| = \\sqrt{2}\\).",
          "\\(\\overrightarrow{AC} = -\\hat{i} + 4\\hat{k}\\), so \\(|\\overrightarrow{AC}| = \\sqrt{1 + 16} = \\sqrt{17}\\).",
          "\\(\\overrightarrow{BC} = -\\hat{j} + 4\\hat{k}\\), so \\(|\\overrightarrow{BC}| = \\sqrt{1 + 16} = \\sqrt{17}\\).",
          "\\(|\\overrightarrow{AC}| = |\\overrightarrow{BC}|\\), and \\(\\sqrt{2} + \\sqrt{17} > \\sqrt{17}\\), so the points are not collinear.",
          "Two sides are equal, so triangle ABC is isosceles.",
        ],
        answer: "AC = BC = \\(\\sqrt{17}\\), so the triangle is isosceles.",
      },
      selfCheckExample: {
        prompt: "Show that \\(\\vec{a} = 2\\hat{i} + 2\\hat{j} + \\hat{k}\\), \\(\\vec{b} = 4\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\vec{c} = 2\\hat{i} - \\hat{j} - 2\\hat{k}\\) represent the sides of a right-angled triangle.",
        steps: [
          "\\(\\vec{a} + \\vec{c} = 4\\hat{i} + \\hat{j} - \\hat{k} = \\vec{b}\\), so the three vectors close into a triangle.",
          "\\(\\vec{a} \\cdot \\vec{c} = 4 - 2 - 2 = 0\\), so the sides along \\(\\vec{a}\\) and \\(\\vec{c}\\) are perpendicular.",
          "Check: \\(|\\vec{a}|^2 + |\\vec{c}|^2 = 9 + 9 = 18 = |\\vec{b}|^2\\).",
        ],
        answer: "They form a right-angled triangle (right angle between the sides along a and c).",
      },
      practiceSet: [
        { prompt: "Is the triangle with vertices \\((2, 0, 0)\\), \\((0, 2, 0)\\) and \\((0, 0, 2)\\) equilateral?", answer: "Yes: every side is \\(2\\sqrt{2}\\)" },
        { prompt: "Do \\(\\hat{i} + \\hat{j}\\), \\(\\hat{j} + \\hat{k}\\) and \\(\\hat{i} + 2\\hat{j} + \\hat{k}\\) form the sides of a triangle?", answer: "Yes: the first two add up to the third, and no two are collinear" },
        { prompt: "The sides of a triangle have lengths \\(\\sqrt{5}\\), \\(\\sqrt{20}\\) and 5. What kind of triangle is it?", answer: "Right-angled, since \\(5 + 20 = 25\\)" },
      ],
      pyqExampleId: "1cedc6da-9a55-492d-b5a4-f6f8f3efb3a5",
      traps: [
        {
          title: "Not checking that they close",
          body: "Three vectors are sides of a triangle only if their sum is zero or one is the sum of the other two. Find this before you name the triangle.",
        },
        {
          title: "Naming the triangle from one pair",
          body: "Find all three lengths. Two equal lengths give isosceles; you may still be asked whether it is also right-angled.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-scalar-multiple",
      name: "Length of a scalar multiple",
      intuition:
        "Multiplying \\(\\vec{a}\\) by \\(\\lambda\\) stretches it by \\(|\\lambda|\\) and turns it round when \\(\\lambda\\) is negative. Its length is \\(|\\lambda|\\,|\\vec{a}|\\), never negative. When \\(\\lambda\\) runs over an interval that contains 0, the smallest length is 0, not the length at an end point.",
      definition:
        "- \\(|\\lambda\\vec{a}| = |\\lambda|\\,|\\vec{a}|\\).\n" +
        "- \\(\\lambda > 0\\): same direction as \\(\\vec{a}\\). \\(\\lambda < 0\\): opposite direction. \\(\\lambda = 0\\): the zero vector.\n" +
        "- \\(\\lambda\\vec{a}\\) is a unit vector when \\(|\\lambda|\\,|\\vec{a}| = 1\\).\n" +
        "- **Range:** for \\(p \\le \\lambda \\le q\\) with \\(p < 0 < q\\), \\(|\\lambda|\\) runs from 0 to the larger of \\(|p|\\) and \\(|q|\\).",
      formula: {
        label: "Length of a scalar multiple",
        latex: "|\\lambda\\vec{a}| = |\\lambda|\\,|\\vec{a}|",
      },
      authoredExample: {
        prompt: "If \\(|\\vec{a}| = 4\\) and \\(-1 \\le k \\le 3\\), find the range of \\(|k\\vec{a}|\\).",
        steps: [
          "\\(|k\\vec{a}| = |k|\\,|\\vec{a}| = 4|k|\\).",
          "As \\(k\\) runs over \\([-1, 3]\\), \\(|k|\\) takes every value from 0 (at \\(k = 0\\)) to 3 (at \\(k = 3\\)).",
          "So \\(4|k|\\) runs from 0 to 12.",
        ],
        answer: "\\(|k\\vec{a}| \\in [0, 12]\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(x\\) so that \\(x(2\\hat{i} - \\hat{j} + 2\\hat{k})\\) is a unit vector.",
        steps: [
          "\\(|2\\hat{i} - \\hat{j} + 2\\hat{k}| = \\sqrt{4 + 1 + 4} = 3\\).",
          "\\(|x| \\times 3 = 1\\), so \\(|x| = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(x = \\pm\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec{a}| = 3\\). Give the magnitude and direction of \\(-2\\vec{a}\\).", answer: "Magnitude 6, opposite to \\(\\vec{a}\\)" },
        { prompt: "\\(|\\vec{a}| = 6\\) and \\(-\\dfrac{1}{2} \\le \\lambda \\le 2\\). Find the greatest and least values of \\(|\\lambda\\vec{a}|\\).", answer: "Greatest 12, least 0" },
        { prompt: "\\(\\vec{a}\\) has magnitude \\(a\\) and \\(\\lambda \\ne 0\\). When is \\(\\lambda\\vec{a}\\) a unit vector?", answer: "When \\(a = \\dfrac{1}{|\\lambda|}\\)" },
      ],
      pyqExampleId: "ae842342-3e5e-4488-a829-bf4a2113f19f",
      traps: [
        {
          title: "A negative length",
          body: "\\(|\\lambda\\vec{a}|\\) uses \\(|\\lambda|\\), so it is never negative. An answer interval that starts below 0 is wrong on sight.",
        },
        {
          title: "Taking the least value at an end point",
          body: "If 0 lies inside the interval for \\(\\lambda\\), the least length is 0. Putting the end values of \\(\\lambda\\) in alone misses it.",
        },
      ],
    },
  ],
};
