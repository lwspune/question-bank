import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_SECTION_NOTE: SubtopicNote = {
  subtopicName: "Section Formula",
  title: "Section Formula",
  oneLineDefinition:
    "The point dividing the join of A and B internally in the ratio m : n has position vector (mb + na)/(m + n); externally it is (mb − na)/(m − n), and the mid-point is (a + b)/2.",
  whyItMatters:
    "19 questions, thirteen of them from board papers. In 2022 the board asked for the unknown that makes three points collinear and the ratio in which the middle point divides the segment. In 2023 it asked for B from the mid-point, the ratio in which the xy-plane divides a segment, the median AD, and c in terms of a and b from a figure. In 2024 it asked for a point dividing a segment externally in 4 : 1 with the ratio of two lengths, and for the mid-point of PR when R divides PQ. In 2025 it asked for points on BA produced and on QP produced, the two points that trisect a wire, the ratio in which a wicket-keeper divides a line, and a coordinate of a point on a segment. In 2026 it asked to prove the median formula and find the median's length. The textbook adds Example 11, Exercise 10.2 Questions 15 and 16, and Miscellaneous Questions 8 and 9.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmva-section-internal",
      name: "Internal division and the mid-point",
      intuition:
        "If R divides PQ in the ratio \\(m : n\\), R is \\(\\dfrac{m}{m + n}\\) of the way from P to Q. The position vector of R is a weighted average of the two ends, and each end is weighted by the part of the ratio next to the OTHER end. With equal parts you get the mid-point, the plain average.",
      definition:
        "- R divides PQ internally in \\(m : n\\) (so \\(PR : RQ = m : n\\)): \\(\\vec{r} = \\dfrac{m\\vec{q} + n\\vec{p}}{m + n}\\).\n" +
        "- **Mid-point:** \\(\\vec{r} = \\dfrac{\\vec{p} + \\vec{q}}{2}\\).\n" +
        "- **Points of trisection:** the ratios \\(1 : 2\\) and \\(2 : 1\\).\n" +
        "- **Median:** taking A as origin, the mid-point D of BC gives \\(\\overrightarrow{AD} = \\dfrac{\\overrightarrow{AB} + \\overrightarrow{AC}}{2}\\).\n" +
        "- The same formula works on each coordinate.",
      formula: {
        label: "Section formula (internal)",
        latex: "\\vec{r} = \\dfrac{m\\vec{q} + n\\vec{p}}{m + n}",
        symbols: [
          { symbol: "\\(\\vec{p}, \\vec{q}\\)", meaning: "position vectors of P and Q" },
          { symbol: "\\(m : n\\)", meaning: "the ratio PR : RQ" },
        ],
      },
      authoredExample: {
        prompt: "Find the position vector of the point R which divides the join of P and Q internally in the ratio \\(3 : 2\\), where \\(\\vec{p} = 2\\hat{i} - \\hat{j} + 4\\hat{k}\\) and \\(\\vec{q} = 7\\hat{i} + 4\\hat{j} - \\hat{k}\\).",
        steps: [
          "\\(\\vec{r} = \\dfrac{3\\vec{q} + 2\\vec{p}}{3 + 2}\\).",
          "\\(3\\vec{q} = 21\\hat{i} + 12\\hat{j} - 3\\hat{k}\\) and \\(2\\vec{p} = 4\\hat{i} - 2\\hat{j} + 8\\hat{k}\\).",
          "\\(3\\vec{q} + 2\\vec{p} = 25\\hat{i} + 10\\hat{j} + 5\\hat{k}\\).",
          "\\(\\vec{r} = \\dfrac{1}{5}(25\\hat{i} + 10\\hat{j} + 5\\hat{k}) = 5\\hat{i} + 2\\hat{j} + \\hat{k}\\).",
        ],
        answer: "\\(5\\hat{i} + 2\\hat{j} + \\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find the position vector of the mid-point of the join of A\\((3, -2, 5)\\) and B\\((-1, 4, 1)\\).",
        steps: [
          "\\(\\dfrac{\\vec{a} + \\vec{b}}{2} = \\dfrac{(3 - 1)\\hat{i} + (-2 + 4)\\hat{j} + (5 + 1)\\hat{k}}{2}\\).",
          "\\(= \\dfrac{2\\hat{i} + 2\\hat{j} + 6\\hat{k}}{2} = \\hat{i} + \\hat{j} + 3\\hat{k}\\).",
        ],
        answer: "\\(\\hat{i} + \\hat{j} + 3\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "The mid-point of AB is \\((2, 1, 0)\\) and A is \\((5, -1, 2)\\). Find B.", answer: "\\((-1, 3, -2)\\)", method: "\\(\\vec{b} = 2\\vec{m} - \\vec{a}\\)" },
        { prompt: "In triangle ABC, \\(\\overrightarrow{AB} = 4\\hat{i} - 2\\hat{j}\\) and \\(\\overrightarrow{AC} = 2\\hat{i} + 4\\hat{j} + 2\\hat{k}\\). D is the mid-point of BC. Find \\(\\overrightarrow{AD}\\).", answer: "\\(3\\hat{i} + \\hat{j} + \\hat{k}\\)" },
        { prompt: "R divides PQ internally in \\(1 : 3\\) and S is the mid-point of PR. Find \\(\\vec{s}\\) in terms of \\(\\vec{p}\\) and \\(\\vec{q}\\).", answer: "\\(\\vec{s} = \\dfrac{7\\vec{p} + \\vec{q}}{8}\\)", method: "\\(\\vec{r} = \\dfrac{\\vec{q} + 3\\vec{p}}{4}\\)" },
      ],
      pyqExampleId: "7eadb733-74bc-4ea7-be5f-a6865bf532ac",
      traps: [
        {
          title: "Weights on the wrong ends",
          body: "In \\(\\dfrac{m\\vec{q} + n\\vec{p}}{m + n}\\) the \\(m\\) of the ratio multiplies the FAR end Q. Putting \\(m\\) with P gives the point that divides PQ in \\(n : m\\).",
        },
        {
          title: "Stopping one step early",
          body: "When a question asks for the mid-point of a segment whose end is itself a section point, find that end first and then average. The first answer is not the final one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-section-external",
      name: "External division and points on a line produced",
      intuition:
        "When R divides PQ externally, R lies outside the segment, on PQ produced. The formula is the internal one with a minus sign in the numerator and the denominator. Questions often hide the ratio in words like \"C on BA produced so that BC = 3BA\"; turning that sentence into a vector equation is usually the quickest route.",
      definition:
        "- R divides PQ externally in \\(m : n\\): \\(\\vec{r} = \\dfrac{m\\vec{q} - n\\vec{p}}{m - n}\\).\n" +
        "- \"C on AB produced\" means C is on the ray from A through B, beyond B.\n" +
        "- A sentence like \\(AC = k\\,AB\\) with C on AB produced gives \\(\\vec{c} - \\vec{a} = k(\\vec{b} - \\vec{a})\\).\n" +
        "- When the section formula gives a negative ratio \\(k : 1\\), the division is external in \\(|k| : 1\\).\n" +
        "- A coordinate plane divides a segment in the ratio that makes that coordinate zero.",
      formula: {
        label: "Section formula (external)",
        latex: "\\vec{r} = \\dfrac{m\\vec{q} - n\\vec{p}}{m - n}",
      },
      authoredExample: {
        prompt: "Find the position vector of the point R which divides the join of P and Q externally in the ratio \\(3 : 1\\), where \\(\\vec{p} = \\hat{i} + 2\\hat{j} - \\hat{k}\\) and \\(\\vec{q} = 3\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(\\vec{r} = \\dfrac{3\\vec{q} - \\vec{p}}{3 - 1}\\).",
          "\\(3\\vec{q} - \\vec{p} = (9 - 1)\\hat{i} + (-3 - 2)\\hat{j} + (6 + 1)\\hat{k} = 8\\hat{i} - 5\\hat{j} + 7\\hat{k}\\).",
          "\\(\\vec{r} = \\dfrac{1}{2}(8\\hat{i} - 5\\hat{j} + 7\\hat{k}) = 4\\hat{i} - \\dfrac{5}{2}\\hat{j} + \\dfrac{7}{2}\\hat{k}\\).",
        ],
        answer: "\\(4\\hat{i} - \\dfrac{5}{2}\\hat{j} + \\dfrac{7}{2}\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "P and Q have position vectors \\(2\\vec{a} + \\vec{b}\\) and \\(\\vec{a} - 3\\vec{b}\\). Find the position vector of R which divides PQ externally in the ratio \\(1 : 2\\).",
        steps: [
          "\\(\\vec{r} = \\dfrac{1 \\cdot \\vec{q} - 2\\vec{p}}{1 - 2}\\).",
          "\\(\\vec{q} - 2\\vec{p} = \\vec{a} - 3\\vec{b} - 4\\vec{a} - 2\\vec{b} = -3\\vec{a} - 5\\vec{b}\\).",
          "\\(\\vec{r} = \\dfrac{-3\\vec{a} - 5\\vec{b}}{-1} = 3\\vec{a} + 5\\vec{b}\\).",
        ],
        answer: "\\(3\\vec{a} + 5\\vec{b}\\)",
      },
      practiceSet: [
        { prompt: "In what ratio does the yz-plane divide the join of \\((1, 2, 3)\\) and \\((2, 4, 1)\\)?", answer: "\\(1 : 2\\) externally", method: "\\(\\dfrac{2k + 1}{k + 1} = 0\\) gives \\(k = -\\dfrac{1}{2}\\)" },
        { prompt: "R divides PQ externally in \\(3 : 2\\), where \\(\\vec{p} = \\hat{i} - \\hat{j}\\) and \\(\\vec{q} = 2\\hat{i} + \\hat{j} + \\hat{k}\\). Find \\(\\vec{r}\\).", answer: "\\(4\\hat{i} + 5\\hat{j} + 3\\hat{k}\\)" },
        { prompt: "C divides AB externally in \\(2 : 1\\). Show that B is the mid-point of AC.", answer: "\\(\\vec{c} = 2\\vec{b} - \\vec{a}\\), so \\(\\dfrac{\\vec{a} + \\vec{c}}{2} = \\vec{b}\\)" },
      ],
      pyqExampleId: "24a458f3-51c5-4d05-9f3a-b77da99abea0",
      traps: [
        {
          title: "One minus sign only",
          body: "External division changes the sign in BOTH places: \\(m\\vec{q} - n\\vec{p}\\) on top and \\(m - n\\) below. Changing only the numerator gives a point that is not on the line.",
        },
        {
          title: "Produced the wrong way",
          body: "\"On BA produced\" means beyond A, starting from B. Draw a quick line with the three letters in order before you write the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-collinear-ratio",
      name: "Collinear points and the ratio of division",
      intuition:
        "Three points lie on one line when the vector from the first to the second is a multiple of the vector from the second to the third. That multiple also gives the ratio in which the middle point divides the segment. An unknown coordinate is found by making the components proportional.",
      definition:
        "- A, B, C are collinear when \\(\\overrightarrow{AB} = \\lambda\\overrightarrow{BC}\\) (or \\(\\overrightarrow{AB} = \\mu\\overrightarrow{AC}\\)).\n" +
        "- If \\(\\overrightarrow{AB} = \\lambda\\overrightarrow{BC}\\) with \\(\\lambda > 0\\), B lies between A and C and divides AC internally in \\(\\lambda : 1\\).\n" +
        "- Check the ratio with the section formula: it must give the position vector of B.\n" +
        "- For a point on a segment with one known coordinate, write the point as \\(\\vec{a} + t(\\vec{c} - \\vec{a})\\) with \\(0 \\le t \\le 1\\).",
      formula: {
        label: "Collinearity of three points",
        latex: "\\overrightarrow{AB} = \\lambda\\,\\overrightarrow{BC} \\;\\Rightarrow\\; AB : BC = |\\lambda| : 1",
      },
      authoredExample: {
        prompt: "Show that A\\((2, -1, 3)\\), B\\((4, 3, 1)\\) and C\\((5, 5, 0)\\) are collinear, and find the ratio in which B divides AC.",
        steps: [
          "\\(\\overrightarrow{AB} = 2\\hat{i} + 4\\hat{j} - 2\\hat{k}\\) and \\(\\overrightarrow{BC} = \\hat{i} + 2\\hat{j} - \\hat{k}\\).",
          "\\(\\overrightarrow{AB} = 2\\overrightarrow{BC}\\), so the two are parallel and share B: A, B, C are collinear.",
          "\\(AB : BC = 2 : 1\\), and B lies between A and C, so B divides AC internally in \\(2 : 1\\).",
          "Check: \\(\\dfrac{2\\vec{c} + \\vec{a}}{3} = \\dfrac{12\\hat{i} + 9\\hat{j} + 3\\hat{k}}{3} = 4\\hat{i} + 3\\hat{j} + \\hat{k} = \\vec{b}\\).",
        ],
        answer: "Collinear; B divides AC internally in \\(2 : 1\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(k\\) if the points \\((1, 2, k)\\), \\((3, 6, 5)\\) and \\((4, 8, 7)\\) are collinear.",
        steps: [
          "\\(\\overrightarrow{AB} = 2\\hat{i} + 4\\hat{j} + (5 - k)\\hat{k}\\) and \\(\\overrightarrow{BC} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
          "The first two components give \\(\\overrightarrow{AB} = 2\\overrightarrow{BC}\\).",
          "So \\(5 - k = 4\\), and \\(k = 1\\).",
        ],
        answer: "\\(k = 1\\)",
      },
      practiceSet: [
        { prompt: "P lies on the segment joining \\((2, 4, -1)\\) and \\((5, -2, 3)\\), and its x-coordinate is 3. Find P.", answer: "\\(\\left(3, 2, \\dfrac{1}{3}\\right)\\)", method: "\\(t = \\dfrac{1}{3}\\)" },
        { prompt: "In what ratio does the point \\(4\\hat{i} + 6\\hat{j}\\) divide the join of \\(2\\hat{i} + 2\\hat{j}\\) and \\(7\\hat{i} + 12\\hat{j}\\)?", answer: "\\(2 : 3\\) internally" },
        { prompt: "Are the points \\((0, 0, 0)\\), \\((1, 2, 3)\\) and \\((3, 6, 8)\\) collinear?", answer: "No: \\((3, 6, 8)\\) is not a multiple of \\((1, 2, 3)\\)" },
      ],
      pyqExampleId: "3adeb55f-8e5c-4ef0-8672-ee4c1b786a4e",
      traps: [
        {
          title: "Ratio before collinearity",
          body: "Show first that the points are collinear (one vector a multiple of the other). A ratio of division means nothing for three points that are not on one line.",
        },
        {
          title: "Using AC for the second part",
          body: "B divides AC in \\(AB : BC\\), not \\(AB : AC\\). Find BC as AC minus AB when B lies between them.",
        },
      ],
    },
  ],
};
