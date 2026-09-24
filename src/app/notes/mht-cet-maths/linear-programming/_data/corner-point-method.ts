import type { SubtopicNote } from "@/app/notes/_types";

export const CORNER_POINT_METHOD_NOTE: SubtopicNote = {
  subtopicName: "Corner-Point Method — Maximum and Minimum of the Objective Function",
  title: "Corner-Point Method — Maximum and Minimum of the Objective Function",
  oneLineDefinition:
    "A linear objective over a polygon takes its maximum and minimum at corners: list the vertices, evaluate Z at each, and read off the largest and smallest.",
  whyItMatters:
    "16 PYQs and not one HARD — the chapter's largest page and the cheapest two marks in the subject. Half the stems give the constraints, half give the figure with the corners labelled; either way the work is four or five substitutions. " +
    "One 2024 figure stem carries an official key that its own working contradicts (19.8 marked where the corner gives 19.5); it is kept as printed and taught as a trap, and it is the only irregularity in sixteen questions.",
  concepts: [
    // 1 — the theorem
    {
      kind: "formula" as const,
      slug: "cetlpp-corner-point-theorem",
      name: "The Corner-Point Theorem: Evaluate Z at Every Vertex",
      intuition:
        "\\(Z = ax + by\\) is constant along parallel lines; sliding that line across a polygon, the last point it touches is a corner. So the optimum is at a vertex, and a bounded region needs only its vertices checked.",
      definition:
        "- \\(Z = 3x + 5y\\) with \\(3x + 2y \\le 18\\), \\(x \\le 4\\), \\(y \\le 6\\): vertices \\((0,0)\\), \\((4,0)\\), \\((4,3)\\), \\((2,6)\\), \\((0,6)\\); \\(Z = 0, 12, 27, 36, 30\\). Maximum \\(36\\) at \\((2, 6)\\).\n" +
        "- \\(Z = 10x + 6y\\) with \\(x + y \\le 12\\), \\(2x + y \\le 20\\): corners \\((0,0)\\), \\((10,0)\\), \\((8,4)\\), \\((0,12)\\); \\(Z = 0, 100, 104, 72\\): the maximum is at \\((8, 4)\\), NOT at the corner with the biggest \\(x\\).\n" +
        "- \\(Z = 7x + 8y\\), \\(x + y \\le 20\\), \\(y \\ge 5\\), \\(x \\le 10\\): corners \\((0,5)\\), \\((10,5)\\), \\((10,10)\\), \\((0,20)\\); \\(Z = 40, 110, 150, 160\\); maximum \\(160\\).\n" +
        "- The minimum is read from the same table: \\(Z = 4x + 6y\\) over \\((4,0)\\), \\((0,4)\\), \\((0,6)\\) gives \\(16, 24, 36\\) — maximum \\(36\\), minimum \\(16\\).\n" +
        "- Always write the vertex beside its value; stems ask sometimes for the value, sometimes for the point.",
      formula: {
        label: "Corner-point method",
        latex:
          "\\max / \\min\\ Z = \\max / \\min_{\\text{vertices } V}\\ Z(V) \\quad (\\text{bounded region})",
      },
      authoredExample: {
        prompt: "Maximise \\(Z = 2x + 3y\\) subject to \\(x + y \\le 6\\), \\(x \\le 4\\), \\(y \\le 5\\), \\(x, y \\ge 0\\).",
        steps: [
          "Vertices \\((0,0)\\), \\((4,0)\\), \\((4,2)\\), \\((1,5)\\), \\((0,5)\\).",
          "\\(Z = 0, 8, 14, 17, 15\\). Maximum \\(17\\) at \\((1, 5)\\).",
        ],
        answer: "\\(17\\) at \\((1, 5)\\)",
      },
      selfCheckExample: {
        prompt: "Find the maximum and minimum of \\(Z = 5x + 3y\\) over \\(x + y \\le 8\\), \\(x \\ge 2\\), \\(y \\ge 1\\).",
        steps: [
          "Vertices \\((2,1)\\), \\((7,1)\\), \\((2,6)\\): \\(Z = 13, 38, 28\\).",
        ],
        answer: "Maximum \\(38\\) at \\((7,1)\\); minimum \\(13\\) at \\((2,1)\\).",
      },
      practiceSet: [
        {
          prompt: "\\(Z = 3x + 4y\\) at \\((10, 20)\\)?",
          answer: "\\(110\\)",
        },
        {
          prompt: "Largest of \\(Z = x + y\\) over \\((0,0)\\), \\((6,0)\\), \\((6,4)\\), \\((0,5)\\)?",
          answer: "\\(10\\) at \\((6,4)\\)",
        },
        {
          prompt: "Smallest of \\(Z = 2x + y\\) over \\((1,0)\\), \\((3,0)\\), \\((0,4)\\)?",
          answer: "\\(2\\) at \\((1,0)\\)",
        },
        {
          prompt: "Where is the optimum of a linear \\(Z\\) over a polygon?",
          answer: "At a vertex.",
        },
      ],
      pyqExampleId: "7ab90913-e07d-441c-a0b0-ac4ff5f086aa",
      traps: [
        {
          title: "Stopping at the first good corner",
          body:
            "\\((10, 0)\\) gives \\(100\\) and looks final; \\((8, 4)\\) gives \\(104\\). Every vertex is evaluated before the answer is read.",
        },
      ],
    },

    // 2 — corners from intersections
    {
      kind: "formula" as const,
      slug: "cetlpp-corners-from-intersections",
      name: "Corners That Are Not on the Axes: Solve the Pair of Lines",
      intuition:
        "When the best corner is where two slanted boundaries cross, solve the two equations simultaneously — the answer is often a fraction, and the option list has it as a fraction.",
      definition:
        "- \\(Z = 6x + 3y\\), \\(x + y \\le 5\\), \\(x + 2y \\ge 4\\), \\(4x + y \\le 12\\): \\(4x + y = 12\\) with \\(x + y = 5\\) gives \\(\\left(\\frac73, \\frac83\\right)\\), \\(Z = 22\\); \\(4x + y = 12\\) with \\(x + 2y = 4\\) gives \\(\\left(\\frac{20}{7}, \\frac47\\right)\\), \\(Z = \\frac{132}{7}\\); axis corners \\((0,2)\\), \\((0,5)\\) give \\(6\\), \\(15\\). Maximum \\(22\\).\n" +
        "- \\(Z = 5x + 2y\\), \\(2x - y \\ge 2\\), \\(x + 2y \\le 8\\): corners \\((1,0)\\), \\((8,0)\\), \\(\\left(\\frac{12}{5}, \\frac{14}{5}\\right)\\); \\(Z = 5, 40, 17.6\\); maximum \\(40\\) — the fractional corner is a distractor here, not the answer.\n" +
        "- Solve by elimination: multiply to match a coefficient, subtract, back-substitute. Check the corner satisfies the remaining constraints before evaluating.\n" +
        "- Keep values as fractions until the comparison; \\(\\frac{132}{7} \\approx 18.9 < 22\\) is only obvious once both are numbers.",
      formula: {
        label: "Corner from two boundaries",
        latex:
          "a_1x + b_1y = c_1,\\ a_2x + b_2y = c_2 \\ \\Rightarrow\\ (x, y) \\text{ by elimination, then check the other constraints}",
      },
      authoredExample: {
        prompt: "Maximise \\(Z = 4x + 5y\\) subject to \\(2x + y \\le 8\\), \\(x + 2y \\le 7\\), \\(x, y \\ge 0\\).",
        steps: [
          "\\(2x + y = 8\\) and \\(x + 2y = 7\\): doubling the second, \\(2x + 4y = 14\\); subtract: \\(3y = 6\\), \\(y = 2\\), \\(x = 3\\).",
          "Vertices \\((0,0)\\), \\((4,0)\\), \\((3,2)\\), \\((0, 3.5)\\): \\(Z = 0, 16, 22, 17.5\\).",
        ],
        answer: "\\(22\\) at \\((3, 2)\\)",
      },
      selfCheckExample: {
        prompt: "Maximise \\(Z = 3x + 2y\\) subject to \\(x + y \\le 4\\), \\(x + 3y \\le 6\\), \\(x, y \\ge 0\\).",
        steps: [
          "Lines meet at \\(y = 1\\), \\(x = 3\\). Vertices \\((0,0)\\), \\((4,0)\\), \\((3,1)\\), \\((0,2)\\): \\(Z = 0, 12, 11, 4\\).",
        ],
        answer: "\\(12\\) at \\((4, 0)\\)",
      },
      practiceSet: [
        {
          prompt: "Solve \\(4x + y = 12\\), \\(x + y = 5\\).",
          answer: "\\(\\left(\\dfrac73, \\dfrac83\\right)\\)",
        },
        {
          prompt: "Solve \\(2x - y = 2\\), \\(x + 2y = 8\\).",
          answer: "\\(\\left(\\dfrac{12}{5}, \\dfrac{14}{5}\\right)\\)",
        },
        {
          prompt: "\\(6x + 3y\\) at \\(\\left(\\dfrac73, \\dfrac83\\right)\\)?",
          answer: "\\(22\\)",
        },
        {
          prompt: "Is \\(\\dfrac{132}{7}\\) more or less than \\(22\\)?",
          answer: "Less (\\(\\approx 18.9\\)).",
        },
      ],
      pyqExampleId: "9255d6d8-a7e4-48ef-a1e0-79c3172dad59",
      traps: [
        {
          title: "Assuming the fractional corner is the answer",
          body:
            "Option lists offer \\(\\frac{132}{7}\\) and \\(\\frac{122}{7}\\) beside \\(22\\). A fraction is a corner value, not automatically the optimum; compare all of them.",
        },
      ],
    },

    // 3 — minimum, negative coefficients, max-min
    {
      kind: "formula" as const,
      slug: "cetlpp-minimum-and-difference",
      name: "Minimising, Negative Coefficients, and Max Minus Min",
      intuition:
        "Nothing changes for a minimum: the same vertex table, read for the smallest value. A negative coefficient (\\(Z = 7x - 8y\\)) makes large \\(y\\) BAD, so the maximum can sit where \\(y\\) is smallest; and a 'difference of max and min' stem is two lookups in one table.",
      definition:
        "- \\(Z = 7x - 8y\\), \\(x + y \\le 20\\), \\(y \\ge 5\\): corners \\((0,20)\\), \\((0,5)\\), \\((15,5)\\); \\(Z = -160, -40, 65\\). Max \\(-\\) min \\(= 225 = 5k + 200 \\Rightarrow k = 5\\).\n" +
        "- **Minimum from a figure**: region between \\(y = 3\\) and \\(y = x + 3\\), right of \\(2x + 3y = 12\\), left of \\(x = 4\\); \\(Z = 3x + 5y\\) at \\((4,3)\\), \\((4,7)\\), \\(\\left(\\frac35, \\frac{18}{5}\\right)\\), \\(\\left(\\frac32, 3\\right)\\) is \\(27, 47, 19.8, 19.5\\). The corner-point minimum is \\(19.5\\); the official key marks \\(19.8\\) even though its own working lists \\(19.5\\). The bank keeps the official letter with a note — know both numbers.\n" +
        "- A minimum over an UNBOUNDED region exists when the objective's coefficients are non-negative (it cannot decrease without bound); a maximum then may not exist.\n" +
        "- Cost stems ('minimum cost of the chip') are minimisations with the same method.",
      formula: {
        label: "Max minus min",
        latex:
          "\\max Z - \\min Z = \\max_V Z(V) - \\min_V Z(V)",
      },
      authoredExample: {
        prompt: "Find the difference between the maximum and minimum of \\(Z = 5x - 3y\\) over \\(x + y \\le 10\\), \\(y \\ge 2\\), \\(x, y \\ge 0\\).",
        steps: [
          "Corners \\((0,2)\\), \\((8,2)\\), \\((0,10)\\): \\(Z = -6, 34, -30\\).",
          "Difference \\(34 - (-30) = 64\\).",
        ],
        answer: "\\(64\\)",
      },
      selfCheckExample: {
        prompt: "Minimise \\(Z = 3x + 2y\\) subject to \\(x + y \\ge 4\\), \\(x \\ge 1\\), \\(y \\ge 1\\).",
        steps: [
          "Corners of the (unbounded) region: \\((1,3)\\), \\((3,1)\\): \\(Z = 9, 11\\). Coefficients positive, so the minimum exists.",
        ],
        answer: "\\(9\\) at \\((1, 3)\\)",
      },
      practiceSet: [
        {
          prompt: "\\(Z = 7x - 8y\\) at \\((0, 20)\\)?",
          answer: "\\(-160\\)",
        },
        {
          prompt: "\\(Z = 3x + 5y\\) at \\(\\left(\\dfrac32, 3\\right)\\)?",
          answer: "\\(19.5\\)",
        },
        {
          prompt: "Min of \\(Z = x + y\\) over \\((2,0)\\), \\((0,2)\\), \\((0,3)\\)?",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\(225 = 5k + 200 \\Rightarrow k = ?\\)",
          answer: "\\(5\\)",
        },
      ],
      pyqExampleId: "d00e5d80-2476-4e79-9c3e-1706ba87d985",
      traps: [
        {
          title: "Treating the largest coordinates as the maximum",
          body:
            "With \\(Z = 7x - 8y\\), the corner \\((0, 20)\\) gives the MINIMUM. Substitute; never rank corners by position.",
        },
      ],
    },

    // 4 — corners read from a figure
    {
      kind: "formula" as const,
      slug: "cetlpp-corners-read-from-a-figure",
      name: "When the Figure Labels the Corners: Read Coordinates, Then Substitute",
      intuition:
        "Many stems give the shaded region with its vertices marked. There is no plotting to do — read each vertex's coordinates from the axes, evaluate \\(Z\\), compare.",
      definition:
        "- Region \\(OCDB\\) with \\(C(10,10)\\), \\(D(10,20)\\), \\(B(0,25)\\): \\(Z = 3x + 4y\\) gives \\(0, 70, 110, 100\\); maximum \\(110\\) at \\(D\\).\n" +
        "- Corners \\(O(0,0)\\), \\(A(6,0)\\), \\(B(6,4)\\), \\(C(3,7)\\), \\(D(0,5)\\) with \\(Z = 4x + 3y\\): \\(0, 24, 36, 33, 15\\); maximum \\(36\\) at \\(B\\) — set in two sittings with the same figure.\n" +
        "- Corners \\((3,0)\\), \\((3,2)\\), \\((2,3)\\), \\((0,3)\\) with \\(Z = 10x + 25y\\): \\(30, 80, 95, 75\\); maximum \\(95\\) at \\((2, 3)\\).\n" +
        "- A vertex not on a grid intersection must be COMPUTED from the two lines through it (previous concept); the figure only tells you which two lines.\n" +
        "- Word-dressed figures (a scholarship \\(z = 550x + 300y\\) over a quadrilateral) are the same read-and-substitute.",
      formula: {
        label: "Figure stems",
        latex:
          "\\text{read } V_i \\text{ from the axes} \\to Z(V_i) \\to \\text{compare}",
      },
      authoredExample: {
        prompt: "A figure shows a feasible region with vertices \\(O(0,0)\\), \\(P(8,0)\\), \\(Q(5,6)\\), \\(R(0,7)\\). Maximise \\(Z = 6x + 4y\\).",
        steps: [
          "\\(Z = 0, 48, 54, 28\\). Maximum \\(54\\) at \\(Q\\).",
        ],
        answer: "\\(54\\) at \\(Q(5, 6)\\)",
      },
      selfCheckExample: {
        prompt: "A figure shows vertices \\(A(2,0)\\), \\(B(6,0)\\), \\(C(4,4)\\), \\(D(0,3)\\). Minimise \\(Z = 3x + 2y\\).",
        steps: [
          "\\(Z = 6, 18, 20, 6\\). Minimum \\(6\\), at both \\(A\\) and \\(D\\) — the whole edge \\(AD\\) is optimal.",
        ],
        answer: "\\(6\\), attained along \\(AD\\).",
      },
      pyqExampleId: "85abeef0-b80e-4649-9003-cca06d34ff73",
      traps: [
        {
          title: "Reading a corner one grid unit off",
          body:
            "\\(C(3,7)\\) misread as \\((3,8)\\) gives \\(36\\) again, by coincidence — but \\((10,20)\\) misread as \\((10,25)\\) gives \\(130\\), which is on the list. Read each vertex against both axes.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Feasible Region — finding the vertices this page evaluates",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-feasible-region",
    },
    {
      label: "Formulation and Special Cases — when two corners tie",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-formulation-and-special-cases",
    },
  ],
};
