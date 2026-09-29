import type { SubtopicNote } from "@/app/notes/_types";

export const SKEW_3D_NOTE: SubtopicNote = {
  subtopicName: "Shortest Distance, Intersection and Coplanar Lines",
  title: "Shortest Distance, Intersection and Coplanar Lines",
  oneLineDefinition:
    "Two lines in space: the shortest distance between skew or parallel lines, the common perpendicular, where two lines meet and when they are coplanar, and a third line drawn to meet both.",
  whyItMatters:
    "Sixty-nine PYQs, the largest page in the chapter; more than half are one formula, the shortest distance between skew lines. Five ideas cover the page.",
  concepts: [
    // C1 — shortest distance
    {
      kind: "formula" as const,
      slug: "j3d-shortest-distance",
      name: "Shortest distance between skew lines",
      intuition:
        "Two skew lines neither meet nor run parallel. Their common perpendicular has direction \\(\\vec d_1\\times\\vec d_2\\), and the shortest distance is the length of the projection of any joining vector \\(\\vec a_2-\\vec a_1\\) onto that direction. It is zero exactly when the lines meet.",
      definition:
        "- \\(SD=\\frac{|(\\vec a_2-\\vec a_1)\\cdot(\\vec d_1\\times\\vec d_2)|}{|\\vec d_1\\times\\vec d_2|}\\).\n" +
        "- \\(SD=0\\): the lines intersect. \\(\\vec d_1\\times\\vec d_2=\\vec 0\\): they are parallel (use the next concept).\n" +
        "- **Rewrite odd forms first:** \\(x+1=2y=-12z\\) is \\(\\frac{x+1}{1}=\\frac{y}{1/2}=\\frac{z}{-1/12}\\), direction \\((12,6,-1)\\).\n" +
        "- With an unknown in a point or direction, the formula gives an equation in it; an absolute value usually gives two roots.",
      formula: {
        label: "Shortest distance between skew lines",
        latex: "SD=\\frac{\\left|(\\vec a_2-\\vec a_1)\\cdot(\\vec d_1\\times\\vec d_2)\\right|}{|\\vec d_1\\times\\vec d_2|}",
      },
      authoredExample: {
        prompt: "Find the shortest distance between \\(\\vec r=(1,0,0)+\\lambda(1,1,0)\\) and \\(\\vec r=(0,0,2)+\\mu(0,1,1)\\).",
        steps: [
          "\\(\\vec d_1\\times\\vec d_2=(1,-1,1)\\), length \\(\\sqrt3\\).",
          "\\(\\vec a_2-\\vec a_1=(-1,0,2)\\); dot product \\(-1+0+2=1\\).",
        ],
        answer: "\\(\\frac{1}{\\sqrt3}\\).",
      },
      selfCheckExample: {
        prompt: "The shortest distance between the \\(x\\)-axis and the line through \\((0,k,1)\\) with direction \\((1,0,1)\\) is \\(3\\). Find \\(k\\).",
        steps: [
          "\\((1,0,0)\\times(1,0,1)=(0,-1,0)\\), length \\(1\\).",
          "\\((0,k,1)\\cdot(0,-1,0)=-k\\), so \\(|k|=3\\).",
        ],
        answer: "\\(k=\\pm3\\).",
      },
      practiceSet: [
        { prompt: "Direction ratios of \\(x+1=2y=-12z\\)?", answer: "\\((12,6,-1)\\)" },
        { prompt: "\\(SD=0\\) means?", answer: "The lines intersect" },
        { prompt: "\\(\\vec d_1\\times\\vec d_2=\\vec 0\\) means?", answer: "The lines are parallel" },
        { prompt: "\\(|\\vec d_1\\times\\vec d_2|=7\\) and the dot product is \\(21\\). \\(SD\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "d94ba45b-4661-4e97-82d9-5503483d2eb2", // 2026 — SD between two given lines is 3 root 5
      traps: [
        {
          title: "Absolute value, and two answers",
          body: "The formula has \\(|\\dots|\\). With an unknown inside, \\(|expression|=c\\) gives two cases; questions asking for 'the sum of all values' need both.",
        },
      ],
    },

    // C2 — parallel lines
    {
      kind: "formula" as const,
      slug: "j3d-parallel-lines",
      name: "Distance between parallel lines",
      intuition:
        "When the directions are parallel, \\(\\vec d_1\\times\\vec d_2=\\vec 0\\) and the skew-line formula breaks. The distance is then just the distance of a point of one line from the other line.",
      definition:
        "- Parallel lines share a direction \\(\\vec d\\).\n" +
        "- \\(d=\\frac{|(\\vec a_2-\\vec a_1)\\times\\vec d|}{|\\vec d|}\\).",
      formula: {
        label: "Distance between parallel lines",
        latex: "d=\\frac{|(\\vec a_2-\\vec a_1)\\times\\vec d|}{|\\vec d|}",
      },
      authoredExample: {
        prompt: "Find the distance between \\(\\frac{x-1}{2}=\\frac{y-2}{3}=\\frac{z-3}{6}\\) and \\(\\frac{x-3}{2}=\\frac{y-2}{3}=\\frac{z-3}{6}\\).",
        steps: [
          "\\(\\vec a_2-\\vec a_1=(2,0,0)\\); \\((2,0,0)\\times(2,3,6)=(0,-12,6)\\), length \\(6\\sqrt5\\).",
          "\\(|\\vec d|=7\\).",
        ],
        answer: "\\(\\frac{6\\sqrt5}{7}\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance between the \\(x\\)-axis and the line \\(y=3,\\ z=4\\).",
        steps: [
          "Both run along \\((1,0,0)\\); the second passes through \\((0,3,4)\\).",
        ],
        answer: "\\(5\\).",
      },
      practiceSet: [
        { prompt: "Are \\(\\frac{x}{2}=\\frac{y}{4}=\\frac{z}{6}\\) and \\(\\frac{x-1}{1}=\\frac{y}{2}=\\frac{z}{3}\\) parallel?", answer: "Yes" },
        { prompt: "Distance between the \\(z\\)-axis and \\(x=6,\\ y=8\\)?", answer: "\\(10\\)" },
        { prompt: "Which formula fails for parallel lines?", answer: "The skew-line formula (division by zero)" },
        { prompt: "\\(|(\\vec a_2-\\vec a_1)\\times\\vec d|=10\\), \\(|\\vec d|=5\\). Distance?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "e1d89a5d-c08a-40f8-9851-c60f1b9834b2", // 2024 — parallel lines at distance 13/root 29, find lambda
      traps: [
        {
          title: "Check for parallel directions first",
          body: "\\((2,3,4)\\) and \\((4,6,8)\\) are parallel. Plugging them into the skew-line formula divides by zero; spot it before computing.",
        },
      ],
    },

    // C3 — line of shortest distance
    {
      kind: "formula" as const,
      slug: "j3d-line-of-sd",
      name: "The line of shortest distance: its feet on the two lines",
      intuition:
        "Sometimes the question wants the ends of the common perpendicular, not just its length. Take a general point \\(P\\) on the first line and \\(Q\\) on the second. \\(\\vec{PQ}\\) must be perpendicular to both directions: two linear equations in the two parameters. Solve them and you have both feet.",
      definition:
        "- \\(P=\\vec a_1+\\lambda\\vec d_1\\), \\(Q=\\vec a_2+\\mu\\vec d_2\\).\n" +
        "- \\(\\vec{PQ}\\cdot\\vec d_1=0\\) and \\(\\vec{PQ}\\cdot\\vec d_2=0\\).\n" +
        "- \\(PQ\\) is the shortest distance, and \\(\\vec{PQ}\\) is parallel to \\(\\vec d_1\\times\\vec d_2\\).\n" +
        "- A point lies on the line of shortest distance if it is \\(P+s\\,\\vec{PQ}\\) for some \\(s\\).",
      formula: {
        label: "Conditions for the feet",
        latex: "\\vec{PQ}\\cdot\\vec d_1=0,\\qquad \\vec{PQ}\\cdot\\vec d_2=0",
      },
      authoredExample: {
        prompt: "Find the feet of the common perpendicular of the \\(x\\)-axis and the line through \\((1,0,1)\\) with direction \\((0,1,0)\\).",
        steps: [
          "\\(P=(\\lambda,0,0)\\), \\(Q=(1,\\mu,1)\\); \\(\\vec{PQ}=(1-\\lambda,\\mu,1)\\).",
          "\\(\\perp(1,0,0)\\): \\(\\lambda=1\\). \\(\\perp(0,1,0)\\): \\(\\mu=0\\).",
        ],
        answer: "\\(P=(1,0,0)\\), \\(Q=(1,0,1)\\); the shortest distance is \\(1\\).",
      },
      selfCheckExample: {
        prompt: "Find the feet of the common perpendicular of the \\(x\\)-axis and the line through \\((0,2,0)\\) with direction \\((0,0,1)\\).",
        steps: [
          "\\(P=(\\lambda,0,0)\\), \\(Q=(0,2,\\mu)\\); \\(\\vec{PQ}=(-\\lambda,2,\\mu)\\).",
          "\\(\\perp(1,0,0)\\): \\(\\lambda=0\\). \\(\\perp(0,0,1)\\): \\(\\mu=0\\).",
        ],
        answer: "\\(P=O\\), \\(Q=(0,2,0)\\); the shortest distance is \\(2\\).",
      },
      practiceSet: [
        { prompt: "How many equations fix the two feet?", answer: "Two (one per direction)" },
        { prompt: "Direction of the line of shortest distance?", answer: "\\(\\vec d_1\\times\\vec d_2\\)" },
        { prompt: "Midpoint of \\(P=(1,0,0)\\) and \\(Q=(1,0,1)\\)?", answer: "\\(\\left(1,0,\\frac12\\right)\\)" },
        { prompt: "Feet \\(P=(2,1,0)\\) and \\(Q=(2,1,3)\\). Shortest distance?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "96103a56-c35c-4b91-9a6b-b27ce2d673dd", // 2024 — M and N the feet of the shortest distance, OM . ON
      traps: [
        {
          title: "Perpendicular to BOTH lines",
          body: "Making \\(\\vec{PQ}\\) perpendicular to only one direction gives the foot from a point, not the common perpendicular. Both dot products must vanish.",
        },
      ],
    },

    // C4 — intersecting and coplanar lines
    {
      kind: "formula" as const,
      slug: "j3d-intersecting-lines",
      name: "Where two lines meet, and when they are coplanar",
      intuition:
        "To find where two lines meet, set their general points equal: three equations, two unknowns. Two of them give \\(\\lambda\\) and \\(\\mu\\); the third either checks out (they meet) or fails (they are skew). Equivalently, two lines are coplanar exactly when the joining vector, \\(\\vec d_1\\) and \\(\\vec d_2\\) lie in one plane: their scalar triple product is zero.",
      definition:
        "- **Meeting point:** solve \\(\\vec a_1+\\lambda\\vec d_1=\\vec a_2+\\mu\\vec d_2\\) using two coordinates; check the third.\n" +
        "- **Coplanar:** \\((\\vec a_2-\\vec a_1)\\cdot(\\vec d_1\\times\\vec d_2)=0\\).\n" +
        "- Non-parallel coplanar lines meet; parallel lines are always coplanar.\n" +
        "- A line given as two planes: find its direction and one point first.",
      formula: {
        label: "Condition for coplanar lines",
        latex: "(\\vec a_2-\\vec a_1)\\cdot(\\vec d_1\\times\\vec d_2)=0",
      },
      authoredExample: {
        prompt: "Where do \\(\\frac{x-1}{1}=\\frac{y-2}{2}=\\frac{z-3}{3}\\) and \\(\\frac{x-2}{1}=\\frac{y-3}{1}=\\frac{z-4}{1}\\) meet?",
        steps: [
          "\\((1+\\lambda,2+2\\lambda,3+3\\lambda)=(2+\\mu,3+\\mu,4+\\mu)\\).",
          "From \\(x\\): \\(\\lambda=1+\\mu\\). From \\(y\\): \\(2+2+2\\mu=3+\\mu\\), so \\(\\mu=-1\\), \\(\\lambda=0\\).",
          "Check \\(z\\): \\(3=4-1\\).",
        ],
        answer: "At \\((1,2,3)\\).",
      },
      selfCheckExample: {
        prompt: "Are the line through \\(O\\) with direction \\((1,1,0)\\) and the line through \\((1,0,1)\\) with direction \\((0,1,1)\\) coplanar?",
        steps: [
          "\\(\\vec d_1\\times\\vec d_2=(1,-1,1)\\); \\(\\vec a_2-\\vec a_1=(1,0,1)\\).",
          "Triple product \\(1+0+1=2\\neq0\\).",
        ],
        answer: "No, they are skew.",
      },
      practiceSet: [
        { prompt: "Triple product for coplanar lines?", answer: "\\(0\\)" },
        { prompt: "Two coordinates give \\(\\lambda,\\mu\\) but the third fails. The lines?", answer: "Skew" },
        { prompt: "Are two parallel lines coplanar?", answer: "Always" },
        { prompt: "Where do the lines \\((t,t,t)\\) and \\((2,s,2)\\) meet?", answer: "\\((2,2,2)\\)" },
      ],
      pyqExampleId: "ca6cd3b6-3665-419f-be12-9861df5ad667", // 2024 — distance of the intersection point of two lines from (7,8,9)
      traps: [
        {
          title: "Always check the third equation",
          body: "Any two coordinates can be solved for \\(\\lambda\\) and \\(\\mu\\). Only if the third coordinate also agrees do the lines actually meet.",
        },
      ],
    },

    // C5 — transversals
    {
      kind: "formula" as const,
      slug: "j3d-transversals",
      name: "A line that meets two given lines",
      intuition:
        "A third line that meets two given lines is fixed by its two meeting points \\(P\\) (on the first) and \\(Q\\) (on the second). Write both as general points. If the third line has a given direction, \\(\\vec{PQ}\\) must be parallel to it; if it passes through a given point \\(R\\), then \\(R\\), \\(P\\), \\(Q\\) must be collinear. Either way you get equations in the two parameters.",
      definition:
        "- \\(P=\\vec a_1+\\lambda\\vec d_1\\), \\(Q=\\vec a_2+\\mu\\vec d_2\\).\n" +
        "- **Given direction \\(\\vec v\\):** \\(\\vec{PQ}=k\\vec v\\) (compare ratios).\n" +
        "- **Through a given point \\(R\\):** \\(\\vec{RP}\\parallel\\vec{RQ}\\).\n" +
        "- Then \\(PQ\\), the points themselves, or a point on the line follow directly.",
      formula: {
        label: "Condition for a given direction",
        latex: "Q-P=k\\,\\vec v",
      },
      authoredExample: {
        prompt: "A line with direction \\((1,1,1)\\) meets the \\(x\\)-axis at \\(P\\) and the line through \\((0,0,1)\\) with direction \\((0,1,0)\\) at \\(Q\\). Find \\(P\\), \\(Q\\) and \\(PQ\\).",
        steps: [
          "\\(P=(t,0,0)\\), \\(Q=(0,s,1)\\); \\(Q-P=(-t,s,1)\\).",
          "Parallel to \\((1,1,1)\\): \\(-t=s=1\\).",
        ],
        answer: "\\(P=(-1,0,0)\\), \\(Q=(0,1,1)\\), \\(PQ=\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "A line through the origin meets the line through \\((1,0,1)\\) with direction \\((0,1,0)\\) and the line through \\((0,2,2)\\) with direction \\((1,0,0)\\). Find it.",
        steps: [
          "\\(P=(1,a,1)\\), \\(Q=(b,2,2)\\); the origin, \\(P\\), \\(Q\\) collinear: \\(Q=kP\\).",
          "\\(z\\): \\(k=2\\); \\(x\\): \\(b=2\\); \\(y\\): \\(2=2a\\), \\(a=1\\).",
        ],
        answer: "\\(P=(1,1,1)\\), \\(Q=(2,2,2)\\): the line \\(x=y=z\\).",
      },
      practiceSet: [
        { prompt: "How many unknowns fix a transversal of two lines?", answer: "Two (one parameter on each line)" },
        { prompt: "\\(Q-P=(2,-2,4)\\) must be parallel to?", answer: "\\((1,-1,2)\\)" },
        { prompt: "\\(P=(6,4,6)\\), \\(Q=(2,2,2)\\). \\(PQ\\)?", answer: "\\(6\\)" },
        { prompt: "Collinearity of \\(R\\), \\(P\\), \\(Q\\) in vectors?", answer: "\\(\\vec{RP}\\times\\vec{RQ}=\\vec 0\\)" },
      ],
      pyqExampleId: "e426bcf4-7af8-42c9-922a-34800e8f2bdc", // 2024 — direction 2,1,2 meets x = y + 2 = z and x + 2 = 2y = 2z
      traps: [
        {
          title: "Two parameters, not one",
          body: "Using the same letter for the parameters on both lines forces the meeting points to correspond, which they do not. Give each line its own parameter.",
        },
      ],
    },
  ],
};
