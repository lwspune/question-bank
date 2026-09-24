import type { SubtopicNote } from "@/app/notes/_types";

export const FEASIBLE_REGION_NOTE: SubtopicNote = {
  subtopicName: "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
  title: "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
  oneLineDefinition:
    "Each linear inequality keeps one side of its boundary line; the feasible region is the intersection of those half-planes, and it can be a bounded polygon, an unbounded region, or nothing at all.",
  whyItMatters:
    "13 PYQs, none HARD — the chapter's opening move and its largest page. Half the stems hand you four figures and ask which one is the solution set; the rest ask whether a region is bounded, unbounded or empty, or for its vertices. " +
    "Every one is settled by a test point per line, and the empty-region stem has a two-line algebraic proof that beats any sketch.",
  concepts: [
    // 1 — half-plane test
    {
      kind: "formula" as const,
      slug: "cetlpp-half-plane-test",
      name: "The Half-Plane Test: Draw the Line, Test a Point, Keep One Side",
      intuition:
        "\\(ax + by \\le c\\) is everything on one side of the line \\(ax + by = c\\). Substitute a point NOT on the line — the origin whenever the line misses it — and if the inequality holds, keep the origin's side; otherwise keep the other side.",
      definition:
        "- Draw \\(ax + by = c\\) from its intercepts \\(\\left(\\dfrac{c}{a}, 0\\right)\\) and \\(\\left(0, \\dfrac{c}{b}\\right)\\).\n" +
        "- **Origin test**: for \\(2x + y \\le 10\\), \\(0 \\le 10\\) is true, so keep the origin side. For \\(x + 4y \\ge 4\\), \\(0 \\ge 4\\) is false, so keep the far side.\n" +
        "- A line THROUGH the origin (\\(y \\le x\\), \\(2x - y \\le 0\\)) needs another test point, e.g. \\((1, 0)\\): \\(0 \\le 1\\) is true, so \\(y \\le x\\) is the side containing \\((1, 0)\\), below the line.\n" +
        "- \\(x, y \\ge 0\\) restricts everything to the first quadrant; \\(x \\le 4\\) is the region left of the vertical line, \\(y \\le 2\\) the region below the horizontal one.\n" +
        "- For \\(2x + y \\le 10\\), \\(y \\le x\\), \\(y \\le 2\\), \\(x, y \\ge 0\\): the region is the polygon with vertices \\((0,0)\\), \\((5,0)\\), \\((4,2)\\), \\((2,2)\\) — the one graph among four that is bounded above by \\(y = 2\\) and cut by \\(y = x\\) on the left.",
      formula: {
        label: "Half-plane test",
        latex:
          "ax + by \\le c \\text{ keeps the side where the test point satisfies it; the origin unless the line passes through it}",
      },
      authoredExample: {
        prompt: "Which side of \\(3x + 2y = 12\\) does \\(3x + 2y \\ge 12\\) keep, and which side of \\(x - y = 0\\) does \\(x - y \\le 0\\) keep?",
        steps: [
          "Origin in \\(3x + 2y \\ge 12\\): \\(0 \\ge 12\\) false, so the side AWAY from the origin.",
          "\\(x - y = 0\\) passes through the origin; test \\((1, 0)\\): \\(1 \\le 0\\) false, so the side NOT containing \\((1, 0)\\) — above the line \\(y = x\\).",
        ],
        answer: "Away from the origin for the first; above \\(y = x\\) for the second.",
      },
      selfCheckExample: {
        prompt: "Sketch the region \\(x + y \\le 4\\), \\(x - y \\ge 0\\), \\(x, y \\ge 0\\) and name its vertices.",
        steps: [
          "\\(x + y \\le 4\\): origin side of the line through \\((4,0)\\), \\((0,4)\\). \\(x - y \\ge 0\\): test \\((1,0)\\), \\(1 \\ge 0\\) true, so below \\(y = x\\).",
          "Vertices: \\((0,0)\\), \\((4,0)\\), and \\(y = x\\) meets \\(x + y = 4\\) at \\((2,2)\\).",
        ],
        answer: "Triangle \\((0,0)\\), \\((4,0)\\), \\((2,2)\\).",
      },
      practiceSet: [
        {
          prompt: "Does \\((0,0)\\) satisfy \\(x + 2y \\ge 2\\)?",
          answer: "No — keep the far side.",
        },
        {
          prompt: "Test point for \\(y \\ge 2x\\)?",
          answer: "Not the origin; e.g. \\((0, 1)\\), which satisfies it — keep the side above.",
        },
        {
          prompt: "Intercepts of \\(4x + 3y = 60\\)?",
          answer: "\\((15, 0)\\), \\((0, 20)\\)",
        },
        {
          prompt: "Region \\(x \\le 3\\), \\(y \\le 2\\), \\(x, y \\ge 0\\) is a?",
          answer: "Rectangle \\((0,0)\\), \\((3,0)\\), \\((3,2)\\), \\((0,2)\\).",
        },
      ],
      pyqExampleId: "a3449b29-cfb3-43b2-b5a7-601bee580982",
      traps: [
        {
          title: "Testing the origin on a line through it",
          body:
            "\\(0 \\le 0\\) is true for \\(y \\le x\\) and tells you nothing. Use \\((1, 0)\\) or \\((0, 1)\\), and remember that the distractor figures differ from the right one by exactly this side.",
        },
      ],
    },

    // 2 — bounded / unbounded / empty
    {
      kind: "formula" as const,
      slug: "cetlpp-bounded-unbounded-empty",
      name: "Bounded, Unbounded or Empty: Classify Before You Optimise",
      intuition:
        "A region is bounded if it fits inside some circle, unbounded if it runs off to infinity in some direction, and empty if two constraints contradict each other. The empty case is proved by adding inequalities, not by drawing.",
      definition:
        "- \\(x, y \\ge 0\\), \\(y \\le 6\\), \\(x + y \\le 3\\): the constraint \\(x + y \\le 3\\) caps both variables, so the region is the **bounded** triangle \\((0,0)\\), \\((3,0)\\), \\((0,3)\\) — \\(y \\le 6\\) never binds.\n" +
        "- \\(-x_1 + x_2 \\le 1\\), \\(-x_1 + 3x_2 \\le 9\\), \\(x_1, x_2 \\ge 0\\): nothing caps \\(x_1\\), so the region is **unbounded** along the \\(x_1\\)-axis.\n" +
        "- \\(|x - y| \\le 1\\), \\(x, y \\ge 0\\): the strip between \\(y = x - 1\\) and \\(y = x + 1\\) in the first quadrant — unbounded (not a polygon, not finite).\n" +
        "- **Empty (null set)**: \\(2x + 3y \\le 18\\) with \\(x + y \\ge 10\\): from the second, \\(2x + 3y \\ge 2(x + y) \\ge 20 > 18\\). No point satisfies both.\n" +
        "- A bounded region always has both a maximum and a minimum of any linear objective; an unbounded one may lack one of them.",
      formula: {
        label: "Empty-region proof",
        latex:
          "x + y \\ge 10 \\Rightarrow 2x + 3y \\ge 2(x + y) \\ge 20 > 18 \\ \\Rightarrow\\ \\text{no feasible point}",
      },
      authoredExample: {
        prompt: "Is the region \\(x + y \\ge 6\\), \\(x + 2y \\le 4\\), \\(x, y \\ge 0\\) bounded, unbounded or empty?",
        steps: [
          "From \\(x + y \\ge 6\\) with \\(y \\ge 0\\): \\(x + 2y \\ge x + y \\ge 6 > 4\\), contradicting \\(x + 2y \\le 4\\).",
        ],
        answer: "Empty.",
      },
      selfCheckExample: {
        prompt: "Classify the region \\(x - y \\le 2\\), \\(x + y \\ge 1\\), \\(x, y \\ge 0\\).",
        steps: [
          "Neither constraint caps \\(y\\): \\((0, 100)\\) satisfies both. Unbounded.",
        ],
        answer: "Unbounded.",
      },
      practiceSet: [
        {
          prompt: "\\(x + y \\le 5\\), \\(x, y \\ge 0\\): bounded?",
          answer: "Yes — a triangle.",
        },
        {
          prompt: "\\(x + y \\ge 5\\), \\(x, y \\ge 0\\): bounded?",
          answer: "No.",
        },
        {
          prompt: "\\(x \\ge 3\\), \\(x \\le 2\\): region?",
          answer: "Empty.",
        },
        {
          prompt: "\\(y \\le 6\\) alongside \\(x + y \\le 3\\), \\(y \\ge 0\\): does \\(y \\le 6\\) bind?",
          answer: "No — \\(y \\le 3\\) already.",
        },
      ],
      pyqExampleId: "11f5e12c-dcdb-4c90-90f7-247e5438b977",
      traps: [
        {
          title: "Calling every first-quadrant region bounded",
          body:
            "\\(x, y \\ge 0\\) only closes two sides. Unless some constraint caps \\(x\\) AND some constraint caps \\(y\\) (or one caps \\(x + y\\)), the region runs to infinity.",
        },
      ],
    },

    // 3 — vertices
    {
      kind: "formula" as const,
      slug: "cetlpp-vertices-of-the-feasible-region",
      name: "Vertices of the Region: Intersect Pairs of Boundaries, Then Check the Rest",
      intuition:
        "A corner is where two boundary lines meet — but only if that meeting point satisfies every OTHER constraint. List the candidate intersections, test each, and keep the survivors.",
      definition:
        "- \\(x + y \\le 4\\), \\(x \\le 2\\), \\(y \\le 1\\), \\(x + y \\ge 1\\), \\(x, y \\ge 0\\): candidates on the axes \\((1,0)\\), \\((2,0)\\), \\((0,1)\\); \\(x = 2\\) meets \\(y = 1\\) at \\((2,1)\\); \\(x + y = 4\\) never binds (it would need \\(x + y = 4\\) with \\(x \\le 2\\), \\(y \\le 1\\), impossible). Vertices \\((1,0)\\), \\((2,0)\\), \\((2,1)\\), \\((0,1)\\).\n" +
        "- \\(y \\ge x - 2\\), \\(y \\le x + 1\\), \\(x \\ge 2\\), \\(y \\le 4\\): the strip between two parallel lines, right of \\(x = 2\\), under \\(y = 4\\): corners \\((2,0)\\), \\((2,3)\\), \\((3,4)\\), \\((6,4)\\).\n" +
        "- \\(4x + 3y \\le 60\\), \\(y \\ge 2x\\), \\(x \\ge 3\\): at \\(x = 3\\), \\(y\\) runs from \\(6\\) to \\(16\\); \\(y = 2x\\) meets \\(4x + 3y = 60\\) at \\((6, 12)\\). Triangle \\((3,6)\\), \\((3,16)\\), \\((6,12)\\).\n" +
        "- An option listing \\((0,4)\\) or \\((4,0)\\) for the first example is built from the non-binding constraint; a vertex must satisfy ALL constraints.",
      formula: {
        label: "Vertex test",
        latex:
          "\\text{corner} = (\\text{line}_i \\cap \\text{line}_j) \\text{ that satisfies every other constraint}",
      },
      authoredExample: {
        prompt: "Find the vertices of \\(x + 2y \\le 8\\), \\(x \\le 4\\), \\(x, y \\ge 0\\).",
        steps: [
          "Axes: \\((0,0)\\), \\((4,0)\\), \\((0,4)\\). \\(x = 4\\) meets \\(x + 2y = 8\\) at \\((4, 2)\\).",
          "All four satisfy every constraint.",
        ],
        answer: "\\((0,0)\\), \\((4,0)\\), \\((4,2)\\), \\((0,4)\\)",
      },
      selfCheckExample: {
        prompt: "Find the vertices of \\(x + y \\le 6\\), \\(x \\le 5\\), \\(y \\le 5\\), \\(x + y \\ge 2\\), \\(x, y \\ge 0\\).",
        steps: [
          "Candidates: \\((2,0)\\), \\((5,0)\\), \\((5,1)\\), \\((1,5)\\), \\((0,5)\\), \\((0,2)\\). Check \\((5,5)\\): \\(x + y = 10 > 6\\), rejected; \\((6,0)\\): \\(x > 5\\), rejected.",
        ],
        answer: "Hexagon \\((2,0)\\), \\((5,0)\\), \\((5,1)\\), \\((1,5)\\), \\((0,5)\\), \\((0,2)\\).",
      },
      practiceSet: [
        {
          prompt: "Where does \\(x = 2\\) meet \\(x + y = 4\\)?",
          answer: "\\((2, 2)\\)",
        },
        {
          prompt: "Where does \\(y = 2x\\) meet \\(4x + 3y = 60\\)?",
          answer: "\\((6, 12)\\)",
        },
        {
          prompt: "Is \\((0, 4)\\) a vertex of \\(x + y \\le 4\\), \\(y \\le 1\\), \\(x, y \\ge 0\\)?",
          answer: "No — \\(y > 1\\).",
        },
        {
          prompt: "Vertices of \\(x + y \\ge 1\\), \\(x \\le 1\\), \\(y \\le 1\\), \\(x, y \\ge 0\\)?",
          answer: "\\((1,0)\\), \\((1,1)\\), \\((0,1)\\)",
        },
      ],
      pyqExampleId: "47e9b742-ad22-451b-a0aa-86f3f2f8bcae",
      traps: [
        {
          title: "Keeping an intersection that a third constraint kills",
          body:
            "Two boundary lines meet at a point that lies OUTSIDE the region because another constraint excludes it. Every candidate corner is tested against all the constraints before it counts.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Reading Constraints Off a Shaded Region — the same half-plane test, run backwards",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-reading-constraints",
    },
    {
      label: "Corner-Point Method — what the vertices are for",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-corner-point-method",
    },
  ],
};
