import type { SubtopicNote } from "@/app/notes/_types";

export const THROUGH_POINTS_CONCYCLICITY_NOTE: SubtopicNote = {
  subtopicName: "Circles Through Given Points and Concyclicity",
  title: "Circles Through Given Points & Concyclicity",
  oneLineDefinition:
    "Building a circle from given data — three points, two points plus a constraint on the centre, or a chord — and testing whether a fourth point is concyclic. This is the construction half of the chapter, and where the HARD marks live.",
  whyItMatters:
    "This subtopic is the chapter's HARD pocket (9 PYQs, 7 of them HARD, in two passage sets plus singles). The questions ask you to CONSTRUCT a circle from data rather than read one off, then extract its centre, radius, or diameter. " +
    "Three methods cover almost everything: the general-equation system for three points, the perpendicular-bisector / centre-on-a-line method, and the family-of-circles trick through a chord. Add the concyclicity test and the right-triangle circumcentre shortcut and the whole pocket is yours.",
  concepts: [
    // 1 — diameter-endpoints form as a constructive tool (c6e47f3d EASY)
    {
      kind: "formula" as const,
      slug: "circ-build-from-diameter-endpoints",
      name: "Building a Circle From Diameter Endpoints",
      pyqExampleId: "c6e47f3d-3a2b-4350-aee6-c08d9866508d",
      intuition:
        "The quickest construction of all: if you are handed the two ends of a diameter, the angle-in-a-semicircle fact writes the circle in one line, with no need to find the centre or radius separately.",
      definition:
        "Given the **endpoints of a diameter** \\((x_1,y_1)\\) and \\((x_2,y_2)\\), the circle is\n" +
        "\\[(x-x_1)(x-x_2)+(y-y_1)(y-y_2)=0.\\]\n" +
        "- This is the constructive use of the **diameter form** — every point sees the diameter at \\(90^\\circ\\), so \\(\\vec{PA}\\cdot\\vec{PB}=0\\).\n" +
        "- Equivalently, find the **centre** as the midpoint \\(\\left(\\tfrac{x_1+x_2}{2},\\tfrac{y_1+y_2}{2}\\right)\\) and the **radius** as half the distance \\(\\tfrac12\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\), then use standard form.",
      formula: {
        label: "Circle on a diameter",
        latex: "(x-x_1)(x-x_2)+(y-y_1)(y-y_2)=0",
      },
      authoredExample: {
        prompt:
          "Write the circle whose diameter has endpoints \\((2,3)\\) and \\((6,7)\\).",
        steps: [
          "Apply the diameter form: \\((x-2)(x-6)+(y-3)(y-7)=0\\).",
          "Expand: \\(x^2-8x+12+y^2-10y+21=0\\), i.e. \\(x^2+y^2-8x-10y+33=0\\).",
        ],
        answer: "\\(x^2+y^2-8x-10y+33=0\\).",
      },
      practiceSet: [
        { prompt: "Diameter endpoints \\((0,0)\\) and \\((4,0)\\) — write the circle.", answer: "\\(x^2+y^2-4x=0\\)", method: "\\((x-0)(x-4)+y^2=0\\)." },
        { prompt: "Centre of the circle \\((x-1)(x-7)+(y-2)(y-2)=0\\)?", answer: "\\((4,2)\\)", method: "Midpoint of \\((1,2),(7,2)\\)." },
      ],
    },

    // 2 — three points via general equation system (2e1ddd9e HARD)
    {
      kind: "formula" as const,
      slug: "circ-three-points-general",
      name: "Circle Through Three Points — the General-Equation System",
      pyqExampleId: "2e1ddd9e-aa79-41a5-9cf2-119d87f70ce4",
      intuition:
        "Three non-collinear points fix a unique circle. The reliable machine is to write the general equation with three unknowns (D, E, F), substitute each point to get three linear equations, and solve — no geometry insight needed, just careful algebra.",
      definition:
        "To find the circle through three points, start from the general form with unknowns:\n" +
        "\\[x^2+y^2+Dx+Ey+F=0.\\]\n" +
        "- Substitute each of the three points to get **three linear equations** in \\(D,E,F\\); solve the system.\n" +
        "- The **centre** is then \\(\\left(-\\tfrac D2,-\\tfrac E2\\right)\\) and the **radius** is \\(\\sqrt{\\tfrac{D^2}{4}+\\tfrac{E^2}{4}-F}\\).\n" +
        "- Subtracting pairs of the equations eliminates the \\(x^2+y^2\\) terms and gives the two **perpendicular-bisector lines**; their intersection is the centre — a useful shortcut.",
      formula: {
        label: "Unknown-coefficient circle",
        latex: "x^2+y^2+Dx+Ey+F=0,\\quad \\text{centre }\\left(-\\tfrac D2,-\\tfrac E2\\right)",
      },
      authoredExample: {
        prompt:
          "Find the circle through \\((0,0)\\), \\((4,0)\\) and \\((0,6)\\).",
        steps: [
          "Through \\((0,0)\\): \\(F=0\\).",
          "Through \\((4,0)\\): \\(16+4D=0\\Rightarrow D=-4\\). Through \\((0,6)\\): \\(36+6E=0\\Rightarrow E=-6\\).",
          "So \\(x^2+y^2-4x-6y=0\\), centre \\((2,3)\\), radius \\(\\sqrt{4+9}=\\sqrt{13}\\).",
        ],
        answer: "\\(x^2+y^2-4x-6y=0\\).",
      },
      traps: [
        {
          title: "Clear fractions, then match the option's scale",
          body:
            "The system often gives fractional \\(D,E,F\\). The answer options may be scaled up (e.g. \\(4x^2+4y^2+\\ldots\\)) to clear them — multiply through to match, but remember the circle is the same. Don't read \\(g=D\\); the general form uses \\(2g=D\\), so centre is \\(-D/2\\) not \\(-D\\).",
        },
      ],
    },

    // 3 — SET S1: centre + radius from three points (054bb908, 3360c6b6)  HARD
    {
      kind: "formula" as const,
      slug: "circ-centre-radius-from-three-points",
      name: "Extracting Centre and Radius From Three Points",
      pyqExampleId: "054bb908-8caa-4f6e-901c-8b352027e418",
      intuition:
        "Once the three-point system is solved, the centre and radius drop straight out — but the radius is often the deciding quantity (a question may only ask whether r exceeds a threshold). Compute r² from the centre and any one of the three points; you rarely need its exact decimal.",
      definition:
        "After solving the three-point system \\(x^2+y^2+Dx+Ey+F=0\\):\n" +
        "- **Centre** \\(=\\left(-\\tfrac D2,-\\tfrac E2\\right)\\).\n" +
        "- **Radius** is most safely found as the distance from the centre to **any one of the three given points**: \\(r^2=(x_0-h)^2+(y_0-k)^2\\). This avoids sign errors in \\(\\sqrt{g^2+f^2-c}\\).\n" +
        "- When the question only asks a **comparison** (\"is \\(r>60\\)?\"), compare \\(r^2\\) against the threshold squared — no square root needed.",
      formula: {
        label: "Radius from centre and a point",
        latex: "r^2 = (x_0-h)^2 + (y_0-k)^2",
        symbols: [
          { symbol: "(h,k)", meaning: "centre" },
          { symbol: "(x_0,y_0)", meaning: "any point on the circle" },
        ],
      },
      authoredExample: {
        prompt:
          "A circle has centre \\((-5,-12)\\) and passes through the origin. Is its radius greater than \\(12\\)?",
        steps: [
          "\\(r^2=(0+5)^2+(0+12)^2=25+144=169\\), so \\(r=13\\).",
          "Compare: \\(13>12\\).",
        ],
        answer: "Yes, \\(r=13>12\\).",
      },
      traps: [
        {
          title: "Compute r² and compare squares — skip the root",
          body:
            "If the question asks only whether \\(r\\) beats a bound, compare \\(r^2\\) with (bound)². Forcing a messy square root invites arithmetic slips. And always take the radius from a KNOWN point on the circle, not from a half-remembered formula.",
        },
      ],
    },

    // 4 — centre on a line / perpendicular bisector (5ad1647b HARD)
    {
      kind: "formula" as const,
      slug: "circ-centre-on-a-line",
      name: "Centre on a Given Line — Perpendicular-Bisector Method",
      pyqExampleId: "5ad1647b-a283-4294-833d-38a7a74ee97a",
      intuition:
        "When the circle passes through two points and its centre is restricted to a line, you have just enough to pin it down. The centre is equidistant from the two points, so it lies on their perpendicular bisector — intersect that with the given line and the centre is fixed.",
      definition:
        "Given **two points the circle passes through** and a **line the centre lies on**:\n" +
        "- The centre is equidistant from the two points \\(A,B\\), so it lies on the **perpendicular bisector** of \\(AB\\). Form that bisector (equate \\(CA^2=CB^2\\)).\n" +
        "- **Intersect** the perpendicular bisector with the given line to get the centre \\((h,k)\\).\n" +
        "- The **radius** is the distance from \\((h,k)\\) to either point; write the circle in standard form, then expand to general form to match the options.",
      formula: {
        label: "Equidistance condition",
        latex: "(h-x_1)^2+(k-y_1)^2 = (h-x_2)^2+(k-y_2)^2",
      },
      authoredExample: {
        prompt:
          "Find the circle through \\((1,0)\\) and \\((5,4)\\) whose centre lies on the line \\(x=4\\).",
        steps: [
          "Equidistance: \\((h-1)^2+k^2=(h-5)^2+(k-4)^2\\). Expand and cancel \\(h^2,k^2\\): \\(-2h+1=-10h-8k+41\\Rightarrow 8h+8k=40\\Rightarrow h+k=5\\).",
          "Centre on \\(x=4\\) means \\(h=4\\), so \\(k=1\\): centre \\((4,1)\\).",
          "Radius \\(=\\sqrt{(4-1)^2+1^2}=\\sqrt{10}\\): \\((x-4)^2+(y-1)^2=10\\).",
        ],
        answer: "\\((x-4)^2+(y-1)^2=10\\), centre \\((4,1)\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the centre of the circle through \\((2,3)\\) and \\((4,5)\\) whose centre lies on the line \\(y=2\\).",
        steps: [
          "Equidistance: \\((h-2)^2+(k-3)^2=(h-4)^2+(k-5)^2\\). Expand and cancel: \\(-4h-6k+13=-8h-10k+41\\Rightarrow 4h+4k=28\\Rightarrow h+k=7\\).",
          "With \\(k=2\\) (centre on \\(y=2\\)): \\(h=5\\).",
        ],
        answer: "Centre \\((5,2)\\).",
      },
      traps: [
        {
          title: "Two through-points give ONE equation, not two",
          body:
            "Equating the distances to the two given points yields a single line (the perpendicular bisector), so you still need the centre-on-a-line constraint to fix the point. With only the two points you'd have a whole family of circles — the extra line is what makes the answer unique.",
        },
      ],
    },

    // 5 — SET S6: concyclicity + diameter (a5963112, 0f484982)  HARD
    {
      kind: "formula" as const,
      slug: "circ-concyclicity-test",
      name: "Concyclicity — Does a Fourth Point Lie on the Circle?",
      pyqExampleId: "a5963112-6da5-4102-98a7-6cc6b58a9126",
      intuition:
        "Four points are concyclic when a fourth lies on the circle fixed by the first three. So build the circle through three points, then substitute the fourth: if it satisfies the equation, the points are concyclic — and an unknown coordinate becomes a clean equation to solve.",
      definition:
        "**Concyclicity test:** four points are concyclic \\(\\iff\\) the fourth lies on the circle through the first three.\n" +
        "- Find the circle through three of the points (general-equation system), then **substitute the fourth point**; it must give \\(0\\).\n" +
        "- If the fourth point has an **unknown** coordinate \\((0,k)\\), substitution produces a quadratic in \\(k\\) — its roots are the value(s) that make all four concyclic.\n" +
        "- Once the circle is known, its **diameter** is \\(2r=2\\sqrt{g^2+f^2-c}\\).",
      formula: {
        label: "Concyclicity",
        latex: "(x_4,y_4)\\text{ on }x^2+y^2+Dx+Ey+F=0 \\iff x_4^2+y_4^2+Dx_4+Ey_4+F=0",
      },
      authoredExample: {
        prompt:
          "The points \\((0,0),(4,0),(0,4)\\) and \\((0,k)\\) are concyclic. Find the non-zero \\(k\\).",
        steps: [
          "Circle through \\((0,0),(4,0),(0,4)\\): \\(F=0\\), \\(16+4D=0\\Rightarrow D=-4\\), \\(16+4E=0\\Rightarrow E=-4\\). So \\(x^2+y^2-4x-4y=0\\).",
          "Put \\((0,k)\\): \\(k^2-4k=0\\Rightarrow k(k-4)=0\\), so \\(k=0\\) or \\(k=4\\).",
          "The non-zero value is \\(k=4\\) (and indeed \\((0,4)\\) is already one of the points).",
        ],
        answer: "\\(k=4\\).",
      },
      traps: [
        {
          title: "An unknown coordinate gives TWO values — keep both",
          body:
            "Substituting \\((0,k)\\) yields a quadratic, so there are usually two valid \\(k\\) (one may coincide with a given point). The NDA answer often lists BOTH; discarding one because it 'looks like' an existing point loses a mark.",
        },
      ],
    },

    // 6 — family of circles through a chord (8e269286 HARD)
    {
      kind: "formula" as const,
      slug: "circ-family-through-chord",
      name: "Family of Circles Through a Chord (the S + λL Trick)",
      pyqExampleId: "8e269286-e136-4ab4-a351-31729a2a292f",
      intuition:
        "Every circle that passes through the two points where a circle S meets a line L can be written as S + λL = 0 — one parameter λ sweeps the whole family. Pick λ to enforce the extra condition (a particular centre, a point it must pass through) and you've found the specific circle without solving for the intersection points.",
      definition:
        "If \\(S\\equiv x^2+y^2+\\ldots=0\\) is a circle and \\(L\\equiv ax+by+c=0\\) a line cutting it in a chord, then\n" +
        "\\[S + \\lambda L = 0\\]\n" +
        "is the **family of all circles through the two chord endpoints**, for any real \\(\\lambda\\).\n" +
        "- Apply the extra condition to fix \\(\\lambda\\): e.g. **\"the chord is a diameter\"** means the new circle's centre lies on \\(L\\) — set the centre \\(\\left(-\\tfrac{\\lambda a}{2},-\\tfrac{\\lambda b}{2}\\right)\\) on \\(L\\) and solve for \\(\\lambda\\).\n" +
        "- Similarly \\(S_1+\\lambda S_2=0\\) (two circles) gives the family through their common points; \\(\\lambda=-1\\) gives the **radical axis** (common chord).",
      formula: {
        label: "Family through a chord",
        latex: "S + \\lambda L = 0",
      },
      authoredExample: {
        prompt:
          "Find the circle on the chord of \\(x^2+y^2=9\\) cut by \\(x+y=3\\) as diameter.",
        steps: [
          "Family: \\(x^2+y^2-9+\\lambda(x+y-3)=0\\). Centre \\(=\\left(-\\tfrac\\lambda2,-\\tfrac\\lambda2\\right)\\).",
          "Chord as diameter \\(\\Rightarrow\\) centre lies on \\(x+y=3\\): \\(-\\tfrac\\lambda2-\\tfrac\\lambda2=3\\Rightarrow -\\lambda=3\\Rightarrow\\lambda=-3\\).",
          "Substitute: \\(x^2+y^2-9-3(x+y-3)=0\\Rightarrow x^2+y^2-3x-3y=0\\).",
        ],
        answer: "\\(x^2+y^2-3x-3y=0\\).",
      },
      traps: [
        {
          title: "\"Chord as diameter\" = the new centre sits on the chord line",
          body:
            "The condition that makes \\(\\lambda\\) solvable is geometric: the chord is a diameter of the new circle exactly when the new centre lies ON the chord line \\(L\\). Trying to force the new circle to pass through a chord endpoint instead leaves \\(\\lambda\\) undetermined.",
        },
      ],
    },

    // 7 — circumcentre of a right triangle = midpoint of hypotenuse (d67a570b MODERATE)
    {
      kind: "formula" as const,
      slug: "circ-right-triangle-circumcentre",
      name: "Circumcentre of a Right Triangle — Midpoint of the Hypotenuse",
      pyqExampleId: "d67a570b-7787-48a0-8efb-17dcf03c7c2f",
      intuition:
        "A right triangle's hypotenuse is a diameter of its circumcircle (the right angle is the angle in a semicircle). So the circumcentre is simply the midpoint of the hypotenuse — no perpendicular bisectors to solve.",
      definition:
        "For a triangle with a **right angle**, the **circumcentre** (centre of the circle through all three vertices) is the **midpoint of the hypotenuse**, and the circumradius is half the hypotenuse.\n" +
        "- Spotting the right angle: two of the bounding lines are perpendicular (e.g. \\(x=\\text{const}\\) and \\(y=\\text{const}\\), or slopes whose product is \\(-1\\)).\n" +
        "- Then set the **midpoint of the hypotenuse** equal to the given circumcentre and solve for the unknown parameter.",
      formula: {
        label: "Right-triangle circumcentre",
        latex: "\\text{circumcentre} = \\text{midpoint of hypotenuse},\\quad R=\\tfrac12(\\text{hypotenuse})",
      },
      authoredExample: {
        prompt:
          "A right triangle has its right angle at \\((0,0)\\) and the other two vertices at \\((6,0)\\) and \\((0,8)\\). Find its circumcentre and circumradius.",
        steps: [
          "The hypotenuse joins \\((6,0)\\) and \\((0,8)\\). Circumcentre = its midpoint \\(=(3,4)\\).",
          "Hypotenuse length \\(=\\sqrt{36+64}=10\\), so circumradius \\(=5\\).",
        ],
        answer: "Circumcentre \\((3,4)\\), circumradius \\(5\\).",
      },
      traps: [
        {
          title: "Only works when there IS a right angle",
          body:
            "The midpoint-of-hypotenuse shortcut needs a right-angled triangle. Confirm two sides are perpendicular first (perpendicular lines, or slopes multiplying to \\(-1\\)). For a general triangle you must intersect two perpendicular bisectors instead.",
        },
      ],
    },
  ],
};
