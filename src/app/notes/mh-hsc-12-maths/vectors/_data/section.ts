import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_VE_SECTION_NOTE: SubtopicNote = {
  subtopicName: "Section Formula",
  title: "Section Formula: Division of a Segment, Centroids and Proofs in Geometry",
  oneLineDefinition:
    "The position vector of the point that divides a segment in a given ratio, internally or externally, and its uses: the mid-point, the ratio in which a point divides a segment, the centroid, the incentre, and proofs about triangles and quadrilaterals.",
  whyItMatters:
    "49 questions, twelve of them from board papers: the proof of the section formula for internal division (2015, 2019, 2022, 2026), the incentre of a triangle (2017), the ratio in which C divides a segment from a vector relation (2023, 2024, 2026), the ratio BP to PE where two lines in a triangle cross (2024), the medians of a triangle are concurrent (2025), and AD + BE + CF = 0 and a third vertex from the centroid (2026). The textbook rows are Exercise 5.2, its solved examples and the Miscellaneous Exercise questions on these ideas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmve-division",
      name: "Section formula for internal and external division",
      intuition:
        "If R divides AB in the ratio m to n, R is pulled towards whichever end has the bigger share of the weight. The far end B gets the weight m and the near end A gets the weight n, so the formula looks the wrong way round at first: m goes with b. For external division R lies outside the segment, and the plus signs become minus signs.",
      definition:
        "- **Theorem 5 (internal division):** if \\(R(\\vec{r})\\) divides the segment joining \\(A(\\vec{a})\\) and \\(B(\\vec{b})\\) internally in the ratio \\(m : n\\), then \\(\\vec{r} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\). Proof outline:\n" +
        "- R lies between A and B, so \\(\\overrightarrow{AR}\\) and \\(\\overrightarrow{RB}\\) have the same direction, and \\(\\dfrac{AR}{RB} = \\dfrac{m}{n}\\).\n" +
        "- Hence \\(n\\,\\overrightarrow{AR}\\) and \\(m\\,\\overrightarrow{RB}\\) have the same magnitude and direction: \\(m\\,\\overrightarrow{RB} = n\\,\\overrightarrow{AR}\\).\n" +
        "- \\(m(\\vec{b} - \\vec{r}) = n(\\vec{r} - \\vec{a})\\).\n" +
        "- \\(m\\vec{b} + n\\vec{a} = (m + n)\\vec{r}\\), so \\(\\vec{r} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\).\n" +
        "- **Theorem 6 (external division):** \\(\\vec{r} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\), with \\(m \\neq n\\).\n" +
        "- **Mid-point:** \\(m = n\\) gives \\(\\vec{r} = \\dfrac{\\vec{a} + \\vec{b}}{2}\\).\n" +
        "- The same formula works on each coordinate x, y and z separately.",
      formula: {
        label: "Section formula",
        latex: "\\vec{r} = \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\ \\text{(internal)}, \\qquad \\vec{r} = \\frac{m\\vec{b} - n\\vec{a}}{m - n} \\ \\text{(external)}",
      },
      authoredExample: {
        prompt:
          "Find the point R that divides the segment joining \\(A(1, -2, 3)\\) and \\(B(4, 1, -3)\\) in the ratio \\(2 : 1\\) (i) internally (ii) externally.",
        steps: [
          "\\(\\vec{a} = \\hat{i} - 2\\hat{j} + 3\\hat{k}\\), \\(\\vec{b} = 4\\hat{i} + \\hat{j} - 3\\hat{k}\\), \\(m = 2\\), \\(n = 1\\).",
          "(i) \\(\\vec{r} = \\dfrac{2\\vec{b} + \\vec{a}}{2 + 1} = \\dfrac{(8 + 1)\\hat{i} + (2 - 2)\\hat{j} + (-6 + 3)\\hat{k}}{3} = 3\\hat{i} - \\hat{k}\\), so \\(R(3, 0, -1)\\).",
          "(ii) \\(\\vec{r} = \\dfrac{2\\vec{b} - \\vec{a}}{2 - 1} = (8 - 1)\\hat{i} + (2 + 2)\\hat{j} + (-6 - 3)\\hat{k} = 7\\hat{i} + 4\\hat{j} - 9\\hat{k}\\), so \\(R(7, 4, -9)\\).",
          "Check (i): \\(\\overrightarrow{AR} = 2\\hat{i} + 2\\hat{j} - 4\\hat{k}\\) is twice \\(\\overrightarrow{RB} = \\hat{i} + \\hat{j} - 2\\hat{k}\\), so \\(AR : RB = 2 : 1\\).",
        ],
        answer: "Internally \\((3, 0, -1)\\); externally \\((7, 4, -9)\\)",
      },
      selfCheckExample: {
        prompt: "Find the mid-point of the segment joining \\(P(3, -1, 4)\\) and \\(Q(-5, 7, 2)\\).",
        steps: ["\\(\\left(\\dfrac{3 - 5}{2}, \\dfrac{-1 + 7}{2}, \\dfrac{4 + 2}{2}\\right)\\)."],
        answer: "\\((-1, 3, 3)\\)",
      },
      practiceSet: [
        {
          prompt: "A and B have position vectors \\(\\vec{a}\\) and \\(\\vec{b}\\). Write the position vector of the point dividing AB externally in the ratio \\(3 : 1\\).",
          answer: "\\(\\dfrac{3\\vec{b} - \\vec{a}}{2}\\)",
        },
        {
          prompt: "Why can the external section formula not be used for the ratio \\(1 : 1\\)?",
          answer: "Its denominator \\(m - n\\) would be 0",
        },
      ],
      pyqExampleId: "fca890b1-991c-43aa-8f16-ab1bc320ac46",
      traps: [
        {
          title: "Pairing m with the wrong end",
          body: "In \\(\\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\), the first part \\(m\\) (the part next to A) multiplies \\(\\vec{b}\\), the far end. Putting \\(m = n = 1\\) to get the mid-point is a quick check that does not catch this, so recheck with the ratio itself.",
        },
        {
          title: "A plus sign in the external formula",
          body: "External division has minus signs in BOTH the numerator and the denominator: \\(\\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\).",
        },
        {
          title: "Leaving out why the lengths become vectors",
          body: "In the proof, write that \\(\\overrightarrow{AR}\\) and \\(\\overrightarrow{RB}\\) have the same direction because R lies between A and B. Without that line, \\(n \\cdot AR = m \\cdot RB\\) does not give the vector equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-ratio",
      name: "Finding the ratio, and collinear points with unknowns",
      intuition:
        "Turn the question round: you know the three points and want the ratio. Write the unknown ratio as k to 1, so there is only one unknown. If k comes out positive the point lies between the two ends; if negative, it lies outside and the division is external.",
      definition:
        "- Take an unknown ratio as \\(k : 1\\): \\(\\vec{c} = \\dfrac{k\\vec{b} + \\vec{a}}{k + 1}\\) for internal division. A negative \\(k\\) means C divides AB externally in the ratio \\(|k| : 1\\).\n" +
        "- For collinear points with unknown coordinates, use the coordinate with no unknown to find \\(k\\), then the other coordinates to find the unknowns.\n" +
        "- Given a relation such as \\(p\\vec{a} + q\\vec{b} - (p + q)\\vec{c} = \\vec{0}\\), make \\(\\vec{c}\\) the subject and compare it with a section formula: both weights positive means internal division, a minus sign means external.\n" +
        "- The coefficients in such a relation add to 0; that is what makes A, B and C collinear.",
      formula: {
        label: "Ratio taken as k to 1",
        latex: "\\vec{c} = \\frac{k\\vec{b} + \\vec{a}}{k + 1} \\ (k > 0 \\text{ internal},\\ k < 0 \\text{ external})",
      },
      authoredExample: {
        prompt:
          "The points \\(A(1, 2, 3)\\), \\(B(7, -4, 9)\\) and \\(C(x, y, 7)\\) are collinear. Find the ratio in which C divides AB, and the values of \\(x\\) and \\(y\\).",
        steps: [
          "Let C divide AB in the ratio \\(k : 1\\). By the section formula, \\(\\vec{c} = \\dfrac{k\\vec{b} + \\vec{a}}{k + 1}\\).",
          "z-coordinate: \\(7 = \\dfrac{9k + 3}{k + 1}\\), so \\(7k + 7 = 9k + 3\\) and \\(k = 2\\).",
          "\\(k = 2 > 0\\), so C divides AB internally in the ratio \\(2 : 1\\).",
          "x-coordinate: \\(x = \\dfrac{2(7) + 1}{3} = 5\\). y-coordinate: \\(y = \\dfrac{2(-4) + 2}{3} = -2\\).",
          "Check: \\(\\overrightarrow{AC} = 4\\hat{i} - 4\\hat{j} + 4\\hat{k} = \\dfrac{2}{3}\\overrightarrow{AB}\\).",
        ],
        answer: "Internally in the ratio \\(2 : 1\\); \\(x = 5\\), \\(y = -2\\)",
      },
      selfCheckExample: {
        prompt: "C divides AB in the ratio \\(k : 1\\) and \\(k\\) comes out as \\(-3\\). How does C divide AB?",
        steps: ["A negative \\(k\\) means external division in the ratio \\(|k| : 1\\)."],
        answer: "Externally in the ratio \\(3 : 1\\)",
      },
      practiceSet: [
        { prompt: "The points \\(A(1, 0, 2)\\), \\(B(3, 4, 6)\\) and \\(C(5, y, z)\\) are collinear. Find \\(y\\) and \\(z\\).", answer: "\\(y = 8\\), \\(z = 10\\)" },
        { prompt: "In what ratio does the point \\((2, 2, 4)\\) divide the segment joining \\(A(1, 0, 2)\\) and \\(B(3, 4, 6)\\)?", answer: "Internally in the ratio \\(1 : 1\\) (it is the mid-point)" },
      ],
      pyqExampleId: "7a6332ce-4916-404a-9e8b-19092f46aa8b",
      traps: [
        {
          title: "Reading the ratio backwards",
          body: "From \\(\\vec{c} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\), the ratio is \\(m : n\\), where \\(m\\) is the weight on \\(\\vec{b}\\). Writing \\(n : m\\) names the wrong point.",
        },
        {
          title: "Throwing away a negative k",
          body: "A negative \\(k\\) is not an error: it says the division is external. Give the ratio as a positive pair and write 'externally'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-centroid",
      name: "Centroid of a triangle and a tetrahedron, and the medians",
      intuition:
        "The centroid is the average of the vertices: add their position vectors and divide by how many there are. It sits two thirds of the way down each median of a triangle, so one point lies on all three medians, which is exactly why the medians meet.",
      definition:
        "- Centroid of triangle ABC: \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\). It divides each median, from the vertex, in the ratio \\(2 : 1\\).\n" +
        "- Centroid of tetrahedron ABCD: \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4}\\). It divides the join of a vertex to the centroid of the opposite face in the ratio \\(3 : 1\\).\n" +
        "- **The medians of a triangle are concurrent.** Proof outline:\n" +
        "- Let D, E, F be the mid-points of BC, CA, AB: \\(\\vec{d} = \\dfrac{\\vec{b} + \\vec{c}}{2}\\), \\(\\vec{e} = \\dfrac{\\vec{c} + \\vec{a}}{2}\\), \\(\\vec{f} = \\dfrac{\\vec{a} + \\vec{b}}{2}\\).\n" +
        "- The point dividing AD in the ratio \\(2 : 1\\) is \\(\\dfrac{2\\vec{d} + \\vec{a}}{3} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\).\n" +
        "- In the same way, the points dividing BE and CF in the ratio \\(2 : 1\\) are both \\(\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\).\n" +
        "- This one point G lies on all three medians, so the medians are concurrent.\n" +
        "- With the same D, E, F: \\(\\overrightarrow{AD} + \\overrightarrow{BE} + \\overrightarrow{CF} = \\vec{0}\\).",
      formula: {
        label: "Centroids",
        latex: "\\vec{g} = \\frac{\\vec{a} + \\vec{b} + \\vec{c}}{3} \\ \\text{(triangle)}, \\qquad \\vec{g} = \\frac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4} \\ \\text{(tetrahedron)}",
      },
      authoredExample: {
        prompt:
          "Find the centroid G of the triangle with vertices \\(A(2, -1, 4)\\), \\(B(-3, 5, 0)\\) and \\(C(4, 2, -1)\\), and check that G divides the median AD in the ratio \\(2 : 1\\).",
        steps: [
          "\\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3} = \\dfrac{(2 - 3 + 4)\\hat{i} + (-1 + 5 + 2)\\hat{j} + (4 + 0 - 1)\\hat{k}}{3} = \\hat{i} + 2\\hat{j} + \\hat{k}\\), so \\(G(1, 2, 1)\\).",
          "D is the mid-point of BC: \\(D\\left(\\dfrac{1}{2}, \\dfrac{7}{2}, -\\dfrac{1}{2}\\right)\\).",
          "The point dividing AD in the ratio \\(2 : 1\\): \\(\\dfrac{2\\vec{d} + \\vec{a}}{3} = \\dfrac{(1 + 2)\\hat{i} + (7 - 1)\\hat{j} + (-1 + 4)\\hat{k}}{3} = \\hat{i} + 2\\hat{j} + \\hat{k}\\).",
          "This is G, as expected.",
        ],
        answer: "\\(G(1, 2, 1)\\), and it divides AD in the ratio \\(2 : 1\\)",
      },
      selfCheckExample: {
        prompt: "Find the centroid of the tetrahedron with vertices \\((1, 0, 2)\\), \\((3, -2, 4)\\), \\((-1, 5, 0)\\) and \\((1, 1, 2)\\).",
        steps: ["Add the four position vectors and divide by 4: \\(\\dfrac{(4, 4, 8)}{4}\\)."],
        answer: "\\((1, 1, 2)\\)",
      },
      practiceSet: [
        { prompt: "In what ratio does the centroid divide each median of a triangle, measured from the vertex?", answer: "\\(2 : 1\\)" },
        { prompt: "The centroid of triangle ABC is at the origin. What is \\(\\vec{a} + \\vec{b} + \\vec{c}\\)?", answer: "\\(\\vec{0}\\)" },
      ],
      pyqExampleId: "dfa6e16c-4dac-43cc-bd24-81a42df72896",
      traps: [
        {
          title: "Dividing by 3 for a tetrahedron",
          body: "A tetrahedron has four vertices, so its centroid is the sum of four position vectors divided by 4.",
        },
        {
          title: "Finding a missing vertex from the centroid",
          body: "From \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\), \\(\\vec{c} = 3\\vec{g} - \\vec{a} - \\vec{b}\\). Forgetting the 3 is the usual slip; recompute the centroid from your answer to check.",
        },
        {
          title: "Showing one median only",
          body: "Concurrency needs the SAME point on all three medians. Show the \\(2 : 1\\) point of each median, or say 'similarly' only after one full working.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-geometry",
      name: "Incentre, crossing lines and proofs about quadrilaterals",
      intuition:
        "The section formula turns geometry into algebra. To find where two lines in a triangle cross, write the crossing point twice, once from each line, and equate the two forms. Choose one vertex as the origin so that only two non-collinear vectors are left; then their coefficients must match.",
      definition:
        "- **Incentre** of triangle ABC: \\(\\vec{h} = \\dfrac{BC\\,\\vec{a} + CA\\,\\vec{b} + AB\\,\\vec{c}}{BC + CA + AB}\\): each vertex is weighted by the length of the side opposite it.\n" +
        "- The bisector of angle A meets BC at D with \\(BD : DC = AB : AC\\).\n" +
        "- **Two crossing lines:** write P on AD as \\(\\vec{p} = \\lambda\\vec{d}\\) and on BE in the section form with an unknown ratio; take A as the origin so \\(\\vec{b}\\) and \\(\\vec{c}\\) are non-collinear, and equate their coefficients.\n" +
        "- A quadrilateral ABCD is a parallelogram if and only if its diagonals bisect each other: \\(\\dfrac{\\vec{a} + \\vec{c}}{2} = \\dfrac{\\vec{b} + \\vec{d}}{2}\\).\n" +
        "- The mid-points of the sides of any quadrilateral form a parallelogram.",
      formula: {
        label: "Incentre",
        latex: "\\vec{h} = \\frac{BC\\,\\vec{a} + CA\\,\\vec{b} + AB\\,\\vec{c}}{BC + CA + AB}",
      },
      authoredExample: {
        prompt: "Using the vector method, find the incentre of the triangle with vertices \\(A(0, 0, 0)\\), \\(B(3, 0, 0)\\) and \\(C(0, 4, 0)\\).",
        steps: [
          "Side lengths: \\(BC = \\sqrt{9 + 16} = 5\\), \\(CA = 4\\), \\(AB = 3\\).",
          "\\(\\vec{h} = \\dfrac{5\\vec{a} + 4\\vec{b} + 3\\vec{c}}{5 + 4 + 3} = \\dfrac{5(\\vec{0}) + 4(3\\hat{i}) + 3(4\\hat{j})}{12}\\).",
          "\\(\\vec{h} = \\dfrac{12\\hat{i} + 12\\hat{j}}{12} = \\hat{i} + \\hat{j}\\).",
          "Check: the triangle is right-angled at A with legs 3 and 4, so its inradius is \\(\\dfrac{3 + 4 - 5}{2} = 1\\), and the incentre is 1 unit from each leg.",
        ],
        answer: "The incentre is \\((1, 1, 0)\\)",
      },
      selfCheckExample: {
        prompt:
          "In triangle OAB, with O as origin, D is the mid-point of AB and P is the point on OD with \\(OP : PD = 2 : 1\\). Write \\(\\vec{p}\\) in terms of \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        steps: ["\\(\\vec{d} = \\dfrac{\\vec{a} + \\vec{b}}{2}\\), and \\(\\vec{p} = \\dfrac{2\\vec{d} + 1(\\vec{0})}{3}\\)."],
        answer: "\\(\\vec{p} = \\dfrac{\\vec{a} + \\vec{b}}{3}\\)",
      },
      practiceSet: [
        { prompt: "For a quadrilateral ABCD, \\(\\vec{a} + \\vec{c} = \\vec{b} + \\vec{d}\\). What kind of quadrilateral is it?", answer: "A parallelogram (its diagonals bisect each other)" },
        { prompt: "In triangle ABC, \\(AB = 6\\) and \\(AC = 4\\). The bisector of angle A meets BC at D. Find \\(BD : DC\\).", answer: "\\(3 : 2\\)" },
      ],
      pyqExampleId: "caf785f9-10bf-4aab-bff9-d299af47a980",
      traps: [
        {
          title: "Weighting each vertex by a side next to it",
          body: "In the incentre formula, \\(\\vec{a}\\) is multiplied by BC, the side opposite A. Pairing a vertex with an adjacent side gives a point that is not the incentre.",
        },
        {
          title: "Equating coefficients of vectors that may be collinear",
          body: "Comparing coefficients is allowed only for non-collinear vectors. Say so in the answer: 'as \\(\\vec{b}\\) and \\(\\vec{c}\\) are non-collinear, we equate coefficients'.",
        },
      ],
    },
  ],
};
