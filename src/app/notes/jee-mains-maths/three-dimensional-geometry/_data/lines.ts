import type { SubtopicNote } from "@/app/notes/_types";

export const LINES_3D_NOTE: SubtopicNote = {
  subtopicName: "Direction Cosines and Equations of Lines",
  title: "Direction Cosines and Equations of Lines",
  oneLineDefinition:
    "Describing a direction in space by its direction cosines or direction ratios, the angle between two lines, and writing a line through a point, through two points, or perpendicular to two given lines.",
  whyItMatters:
    "Twenty-seven PYQs. One step carries most of them: the cross product of two directions gives a third direction perpendicular to both. Five ideas cover the page.",
  concepts: [
    // C1 — direction cosines
    {
      kind: "formula" as const,
      slug: "j3d-direction-cosines",
      name: "Direction cosines and direction ratios",
      intuition:
        "A line making angles \\(\\alpha\\), \\(\\beta\\), \\(\\gamma\\) with the three axes has direction cosines \\(l=\\cos\\alpha\\), \\(m=\\cos\\beta\\), \\(n=\\cos\\gamma\\), and these always satisfy \\(l^2+m^2+n^2=1\\). Any triple in the same proportion, such as \\((2,3,6)\\), is a set of direction ratios. To turn ratios into cosines, divide by their length.",
      definition:
        "- **Direction cosines:** \\((\\cos\\alpha,\\cos\\beta,\\cos\\gamma)\\), with \\(l^2+m^2+n^2=1\\).\n" +
        "- **Direction ratios:** any \\((a,b,c)\\) proportional to them; \\((l,m,n)=\\pm\\frac{(a,b,c)}{\\sqrt{a^2+b^2+c^2}}\\).\n" +
        "- Equivalently \\(\\sin^2\\alpha+\\sin^2\\beta+\\sin^2\\gamma=2\\).\n" +
        "- The line joining \\((x_1,y_1,z_1)\\) and \\((x_2,y_2,z_2)\\) has direction ratios \\((x_2-x_1,\\,y_2-y_1,\\,z_2-z_1)\\).",
      formula: {
        label: "Direction cosines from direction ratios",
        latex: "(l,m,n)=\\frac{(a,b,c)}{\\sqrt{a^2+b^2+c^2}},\\qquad l^2+m^2+n^2=1",
      },
      authoredExample: {
        prompt: "A line makes \\(60^\\circ\\) with the \\(x\\)-axis and \\(45^\\circ\\) with the \\(y\\)-axis. Find its angle with the \\(z\\)-axis.",
        steps: [
          "\\(\\cos^2\\gamma=1-\\cos^260^\\circ-\\cos^245^\\circ=1-\\frac14-\\frac12=\\frac14\\).",
          "So \\(\\cos\\gamma=\\pm\\frac12\\).",
        ],
        answer: "\\(60^\\circ\\) or \\(120^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Find the direction cosines of a line with direction ratios \\(2,-1,2\\).",
        steps: [
          "Length \\(\\sqrt{4+1+4}=3\\).",
        ],
        answer: "\\(\\pm\\left(\\frac23,-\\frac13,\\frac23\\right)\\).",
      },
      practiceSet: [
        { prompt: "Direction cosines of a line equally inclined to the three axes?", answer: "\\(\\pm\\left(\\frac{1}{\\sqrt3},\\frac{1}{\\sqrt3},\\frac{1}{\\sqrt3}\\right)\\)" },
        { prompt: "\\(\\sin^2\\alpha+\\sin^2\\beta+\\sin^2\\gamma\\)?", answer: "\\(2\\)" },
        { prompt: "Direction cosines of the line joining \\((1,2,3)\\) and \\((3,5,9)\\)?", answer: "\\(\\left(\\frac27,\\frac37,\\frac67\\right)\\)" },
        { prompt: "Direction cosines of the \\(z\\)-axis?", answer: "\\((0,0,1)\\)" },
      ],
      pyqExampleId: "a65b6fea-8d9c-43b2-b8a1-3d0fe29d1142", // 2025 — beta = gamma = alpha/2, sum of possible beta
      traps: [
        {
          title: "Ratios are not cosines until you divide",
          body: "\\((2,3,6)\\) gives \\(4+9+36=49\\), not \\(1\\). Divide by \\(7\\) first; only then do the squares add to \\(1\\).",
        },
      ],
    },

    // C2 — lines from DC equations
    {
      kind: "formula" as const,
      slug: "j3d-dc-equations",
      name: "Two lines from a pair of equations in l, m, n",
      intuition:
        "When the direction cosines of two lines satisfy one linear and one quadratic equation, use the linear one to remove a variable. The quadratic then becomes homogeneous in the other two, so it factorises into two ratios. Each ratio is one line's direction, and the angle between them follows from the dot product.",
      definition:
        "- From the linear equation, write one of \\(l,m,n\\) in terms of the others.\n" +
        "- Substitute into the quadratic; divide by the square of one variable to get a quadratic in the ratio.\n" +
        "- Its two roots give the two directions.\n" +
        "- Equal roots mean the lines are parallel; roots with product \\(-1\\) (in the right ratio) often signal perpendicular lines, but always check with the dot product.",
      formula: {
        label: "Angle between the two directions",
        latex: "\\cos\\theta=\\frac{|a_1a_2+b_1b_2+c_1c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}",
      },
      authoredExample: {
        prompt: "The direction cosines of two lines satisfy \\(l+m+n=0\\) and \\(2lm+2ln-mn=0\\). Find the angle between the lines.",
        steps: [
          "\\(n=-l-m\\). Substituting: \\(2lm-2l^2-2lm+lm+m^2=0\\), i.e. \\(m^2+lm-2l^2=0\\).",
          "\\((m-l)(m+2l)=0\\). If \\(m=l\\): \\(n=-2l\\), direction \\((1,1,-2)\\). If \\(m=-2l\\): \\(n=l\\), direction \\((1,-2,1)\\).",
          "\\(\\cos\\theta=\\frac{|1-2-2|}{\\sqrt6\\,\\sqrt6}=\\frac12\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "The direction cosines of two lines satisfy \\(l=m\\) and \\(l^2+m^2-n^2=0\\). Find the angle between them.",
        steps: [
          "\\(n^2=2l^2\\), so \\(n=\\pm\\sqrt2\\,l\\): directions \\((1,1,\\sqrt2)\\) and \\((1,1,-\\sqrt2)\\).",
          "Dot product \\(1+1-2=0\\).",
        ],
        answer: "\\(90^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(m^2-lm-2l^2=0\\) as \\(\\frac{m}{l}\\)?", answer: "\\(2\\) and \\(-1\\)" },
        { prompt: "Direction with \\(l=m\\) and \\(n=0\\)?", answer: "\\(\\left(\\frac{1}{\\sqrt2},\\frac{1}{\\sqrt2},0\\right)\\)" },
        { prompt: "When are the two lines parallel?", answer: "When the quadratic in the ratio has equal roots" },
        { prompt: "Angle between \\((1,1,-2)\\) and \\((1,-2,1)\\)?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "59957e4e-40c7-4022-b28b-3817fd54dde1", // 2026 — 4l + m - n = 0 and 2mn + 10nl + 3lm = 0
      traps: [
        {
          title: "Remove a variable with the LINEAR equation first",
          body: "Only after substituting from the linear equation is the quadratic homogeneous in two variables. Dividing the original quadratic by \\(l^2\\) straight away leaves three unknowns.",
        },
      ],
    },

    // C3 — angle between lines
    {
      kind: "formula" as const,
      slug: "j3d-angle-between-lines",
      name: "The angle between two lines, perpendicular and parallel lines",
      intuition:
        "The angle between two lines is the angle between their direction vectors, so it comes from the dot product. Perpendicular lines have zero dot product; parallel lines have proportional direction ratios. The one care point is reading the direction ratios: the symmetric form needs \\(x\\), \\(y\\), \\(z\\) with coefficient \\(+1\\) in each numerator.",
      definition:
        "- \\(\\cos\\theta=\\frac{|\\vec d_1\\cdot\\vec d_2|}{|\\vec d_1||\\vec d_2|}\\).\n" +
        "- **Perpendicular:** \\(a_1a_2+b_1b_2+c_1c_2=0\\). **Parallel:** \\(\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}\\).\n" +
        "- **Rewrite first:** \\(\\frac{2-x}{3}\\) is \\(\\frac{x-2}{-3}\\); \\(\\frac{3y-2}{k}\\) is \\(\\frac{y-\\frac23}{k/3}\\).\n" +
        "- The angle between two sides of a triangle at \\(P\\) uses \\(\\vec{PQ}\\) and \\(\\vec{PR}\\).",
      formula: {
        label: "Angle between two lines",
        latex: "\\cos\\theta=\\frac{|\\vec d_1\\cdot\\vec d_2|}{|\\vec d_1|\\,|\\vec d_2|}",
      },
      authoredExample: {
        prompt: "Find the angle between \\(\\frac{x-1}{2}=\\frac{y+1}{1}=\\frac{z-3}{2}\\) and \\(\\frac{x}{1}=\\frac{y-2}{-2}=\\frac{z}{2}\\).",
        steps: [
          "Directions \\((2,1,2)\\) and \\((1,-2,2)\\); dot product \\(2-2+4=4\\).",
          "Both have length \\(3\\): \\(\\cos\\theta=\\frac49\\).",
        ],
        answer: "\\(\\cos^{-1}\\frac49\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(\\frac{x-1}{k}=\\frac{y}{2}=\\frac{z}{-1}\\) perpendicular to \\(\\frac{x}{3}=\\frac{y}{-1}=\\frac{z+2}{1}\\)?",
        steps: [
          "\\(3k-2-1=0\\).",
        ],
        answer: "\\(k=1\\).",
      },
      practiceSet: [
        { prompt: "Angle between \\((1,1,\\sqrt2)\\) and the \\(x\\)-axis?", answer: "\\(60^\\circ\\)" },
        { prompt: "Direction ratios of \\(\\frac{1-x}{2}=\\frac{y}{3}=\\frac{z+1}{1}\\)?", answer: "\\((-2,3,1)\\)" },
        { prompt: "Are \\((2,-1,3)\\) and \\((-4,2,-6)\\) parallel?", answer: "Yes" },
        { prompt: "Are \\((1,2,3)\\) and \\((3,0,-1)\\) perpendicular?", answer: "Yes: \\(3+0-3=0\\)" },
      ],
      pyqExampleId: "fa9e443e-a720-4509-92ea-8bf1c9de62ad", // 2024 — (2 - x)/3 = (3y - 2)/(4 lambda + 1) = 4 - z perpendicular to another line
      traps: [
        {
          title: "Coefficient of \\(x\\), \\(y\\), \\(z\\) must be \\(+1\\)",
          body: "In \\(\\frac{2-x}{3}\\) the direction ratio for \\(x\\) is \\(-3\\), and in \\(\\frac{3y-2}{k}\\) it is \\(\\frac{k}{3}\\) for \\(y\\). Reading the denominators as they stand gives a wrong angle.",
        },
      ],
    },

    // C4 — equation of a line
    {
      kind: "formula" as const,
      slug: "j3d-line-equation",
      name: "Writing a line: through a point, two points, or perpendicular to two lines",
      intuition:
        "A line needs a point and a direction. In vector form it is \\(\\vec r=\\vec a+\\lambda\\vec d\\); in symmetric form \\(\\frac{x-x_1}{a}=\\frac{y-y_1}{b}=\\frac{z-z_1}{c}\\). When a line must be perpendicular to two given lines, its direction is the cross product of their directions. To step a known distance along a line, use the unit direction.",
      definition:
        "- **Point and direction:** \\(\\vec r=\\vec a+\\lambda\\vec d\\).\n" +
        "- **Two points \\(A\\), \\(B\\):** direction \\(\\vec{AB}\\).\n" +
        "- **Perpendicular to \\(\\vec d_1\\) and \\(\\vec d_2\\):** direction \\(\\vec d_1\\times\\vec d_2\\).\n" +
        "- **Points at distance \\(k\\) from \\(A\\) on the line:** \\(A\\pm k\\,\\hat d\\).\n" +
        "- **Where it meets a coordinate plane:** set that coordinate to \\(0\\) in the parametric point.",
      formula: {
        label: "Parametric point and a common perpendicular direction",
        latex: "(x_1+a\\lambda,\\ y_1+b\\lambda,\\ z_1+c\\lambda),\\qquad \\vec d=\\vec d_1\\times\\vec d_2",
      },
      authoredExample: {
        prompt: "A line through \\((1,2,3)\\) is perpendicular to the directions \\((1,1,0)\\) and \\((0,1,1)\\). Where does it meet the \\(xy\\)-plane?",
        steps: [
          "Direction \\((1,1,0)\\times(0,1,1)=(1,-1,1)\\).",
          "Points \\((1+t,2-t,3+t)\\); \\(z=0\\) gives \\(t=-3\\).",
        ],
        answer: "\\((-2,5,0)\\).",
      },
      selfCheckExample: {
        prompt: "Find the points on the line through \\((1,-1,2)\\) with direction \\((2,-1,2)\\) at distance \\(6\\) from \\((1,-1,2)\\).",
        steps: [
          "\\(\\hat d=\\frac{(2,-1,2)}{3}\\).",
          "\\((1,-1,2)\\pm6\\hat d=(1,-1,2)\\pm(4,-2,4)\\).",
        ],
        answer: "\\((5,-3,6)\\) and \\((-3,1,-2)\\).",
      },
      practiceSet: [
        { prompt: "Line through \\((1,2,3)\\) and \\((3,6,4)\\)?", answer: "\\(\\frac{x-1}{2}=\\frac{y-2}{4}=\\frac{z-3}{1}\\)" },
        { prompt: "\\((1,0,0)\\times(0,1,0)\\)?", answer: "\\((0,0,1)\\)" },
        { prompt: "Unit vector along \\((6,2,3)\\)?", answer: "\\(\\frac{(6,2,3)}{7}\\)" },
        { prompt: "Where does \\((2+t,1-t,t)\\) meet the \\(yz\\)-plane?", answer: "\\((0,3,-2)\\)" },
      ],
      pyqExampleId: "6deb0db9-2de3-4c56-a5cc-163243b03317", // 2025 — line through P perpendicular to two lines meets the yz-plane at Q
      traps: [
        {
          title: "Step with the UNIT vector",
          body: "\\(A+k\\vec d\\) moves \\(k|\\vec d|\\), not \\(k\\). For a stated distance, divide \\(\\vec d\\) by its length first.",
        },
      ],
    },

    // C5 — triangles and tetrahedra
    {
      kind: "formula" as const,
      slug: "j3d-space-geometry",
      name: "Triangles and tetrahedra with coordinates",
      intuition:
        "Two edges from one vertex span a triangle: half the length of their cross product is its area. Three edges from one vertex span a tetrahedron: a sixth of their scalar triple product is its volume. Right angles show up as zero dot products.",
      definition:
        "- **Area:** \\(\\frac12|\\vec{AB}\\times\\vec{AC}|\\).\n" +
        "- **Volume of a tetrahedron:** \\(\\frac16\\left|[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}]\\right|\\).\n" +
        "- **Right angle at \\(A\\):** \\(\\vec{AB}\\cdot\\vec{AC}=0\\).\n" +
        "- **Three mutually perpendicular edges at \\(A\\):** the opposite face's area squared is the sum of the other three faces' areas squared.",
      formula: {
        label: "Area and volume",
        latex: "[ABC]=\\tfrac12|\\vec{AB}\\times\\vec{AC}|,\\qquad V=\\tfrac16\\left|[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}]\\right|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with vertices \\((1,0,0)\\), \\((0,2,0)\\), \\((0,0,3)\\).",
        steps: [
          "\\(\\vec{AB}=(-1,2,0)\\), \\(\\vec{AC}=(-1,0,3)\\); \\(\\vec{AB}\\times\\vec{AC}=(6,3,2)\\).",
          "\\(|(6,3,2)|=7\\).",
        ],
        answer: "\\(\\frac72\\).",
      },
      selfCheckExample: {
        prompt: "Find the volume of the tetrahedron with vertices \\(O\\), \\((1,0,0)\\), \\((0,2,0)\\), \\((0,0,3)\\).",
        steps: [
          "The three edges from \\(O\\) are along the axes: triple product \\(1\\cdot2\\cdot3=6\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Is the angle at \\(O\\) in \\(O\\), \\((1,1,0)\\), \\((1,-1,0)\\) a right angle?", answer: "Yes: dot product \\(0\\)" },
        { prompt: "Area of the triangle with \\(\\vec{AB}\\times\\vec{AC}=(2,3,6)\\)?", answer: "\\(\\frac72\\)" },
        { prompt: "Faces at a right-angled corner have areas \\(1\\), \\(2\\), \\(2\\). The fourth face?", answer: "\\(3\\)" },
        { prompt: "Volume if the triple product is \\(12\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "af90224d-5fe6-48a4-ab06-a569b541899b", // 2025 — A in the xy-plane equidistant from three points; triangle ABC
      traps: [
        {
          title: "Half for a triangle, a sixth for a tetrahedron",
          body: "The cross product's length is a parallelogram's area and the triple product is a parallelepiped's volume. Forgetting the \\(\\frac12\\) or the \\(\\frac16\\) doubles or sextuples the answer.",
        },
      ],
    },
  ],
};
