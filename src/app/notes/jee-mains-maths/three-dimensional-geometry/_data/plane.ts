import type { SubtopicNote } from "@/app/notes/_types";

export const PLANE_3D_NOTE: SubtopicNote = {
  subtopicName: "Equation of a Plane",
  title: "Equation of a Plane",
  oneLineDefinition:
    "Writing a plane from a point and a normal, three points or its intercepts; finding the normal as a cross product when the plane contains lines or is perpendicular to other planes; the family of planes through a line of intersection; and the angle between planes.",
  whyItMatters:
    "Fifty-two PYQs. A plane needs a point and a normal, and in most questions the work is finding the normal: a cross product, or one number in the family P₁ + λP₂. Four ideas cover the page.",
  concepts: [
    // C1 — basic forms
    {
      kind: "formula" as const,
      slug: "j3d-plane-forms",
      name: "A plane from a point and a normal, three points, or its intercepts",
      intuition:
        "A plane is fixed by one point on it and a normal vector \\(\\vec n=(a,b,c)\\): every vector lying in the plane is perpendicular to \\(\\vec n\\). That gives \\(a(x-x_1)+b(y-y_1)+c(z-z_1)=0\\), and in \\(ax+by+cz+d=0\\) the coefficients ARE the normal. Three points give two in-plane vectors, whose cross product is the normal. A plane cutting the axes at \\(a\\), \\(b\\), \\(c\\) is \\(\\frac xa+\\frac yb+\\frac zc=1\\).",
      definition:
        "- **Point and normal:** \\(a(x-x_1)+b(y-y_1)+c(z-z_1)=0\\).\n" +
        "- **Three points:** normal \\(\\vec{AB}\\times\\vec{AC}\\).\n" +
        "- **Intercepts:** \\(\\frac xa+\\frac yb+\\frac zc=1\\).\n" +
        "- **Foot of the perpendicular from \\(O\\) is \\(F\\):** normal \\(\\vec{OF}\\), plane \\(\\vec r\\cdot\\vec{OF}=|\\vec{OF}|^2\\).\n" +
        "- **Perpendicular bisector of \\(AB\\):** normal \\(\\vec{AB}\\), through the midpoint.\n" +
        "- **Four points coplanar:** scalar triple product of the three edges from one of them is \\(0\\).",
      formula: {
        label: "Point-normal form",
        latex: "a(x-x_1)+b(y-y_1)+c(z-z_1)=0",
      },
      authoredExample: {
        prompt: "Find the plane through \\((1,0,0)\\), \\((0,2,0)\\) and \\((0,0,3)\\).",
        steps: [
          "The intercepts are \\(1\\), \\(2\\), \\(3\\): \\(\\frac x1+\\frac y2+\\frac z3=1\\).",
          "Multiply by \\(6\\).",
        ],
        answer: "\\(6x+3y+2z=6\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) are \\((1,1,1)\\), \\((2,1,0)\\), \\((0,2,1)\\) and \\((k,1,2)\\) coplanar?",
        steps: [
          "Edges from \\((1,1,1)\\): \\((1,0,-1)\\), \\((-1,1,0)\\), \\((k-1,0,1)\\).",
          "Triple product \\(1\\cdot1-0+(-1)(0-(k-1))=k\\).",
        ],
        answer: "\\(k=0\\).",
      },
      practiceSet: [
        { prompt: "Normal to \\(2x-y+3z=5\\)?", answer: "\\((2,-1,3)\\)" },
        { prompt: "Plane through \\((1,1,1)\\) with normal \\((1,2,2)\\)?", answer: "\\(x+2y+2z=5\\)" },
        { prompt: "Perpendicular bisector plane of \\(O\\) and \\((2,4,6)\\)?", answer: "\\(x+2y+3z=14\\)" },
        { prompt: "The foot of the perpendicular from \\(O\\) is \\((1,2,2)\\). The plane?", answer: "\\(x+2y+2z=9\\)" },
      ],
      pyqExampleId: "8525f005-5ca0-4498-a0a3-d5c8d1da753c", // 2021 — plane bisecting a segment at right angles, least a^2+b^2+c^2+d^2
      traps: [
        {
          title: "Intercepts are not the normal",
          body: "\\(\\frac x2+\\frac y3+\\frac z6=1\\) has normal \\(\\left(\\frac12,\\frac13,\\frac16\\right)\\), i.e. \\((3,2,1)\\), not \\((2,3,6)\\). Clear the fractions before reading the normal.",
        },
      ],
    },

    // C2 — normal by cross product
    {
      kind: "formula" as const,
      slug: "j3d-plane-normal-cross",
      name: "The normal as a cross product: planes containing lines or perpendicular to planes",
      intuition:
        "Whenever two directions lie IN the plane, their cross product is its normal. A plane containing a line and a point uses the line's direction and the vector from a point of the line to the given point. A plane containing two lines uses both directions. A plane perpendicular to two other planes contains both of their normals, so its normal is their cross product.",
      definition:
        "- **Contains a line (point \\(A\\), direction \\(\\vec d\\)) and a point \\(P\\):** \\(\\vec n=\\vec d\\times\\vec{AP}\\).\n" +
        "- **Contains two lines (or parallel to two directions):** \\(\\vec n=\\vec d_1\\times\\vec d_2\\).\n" +
        "- **Perpendicular to two planes:** \\(\\vec n=\\vec n_1\\times\\vec n_2\\).\n" +
        "- **Contains a line and is perpendicular to a plane:** \\(\\vec n=\\vec d\\times\\vec n_1\\).\n" +
        "- **Contains an axis:** that axis's unit vector is one in-plane direction.",
      formula: {
        label: "Normal from two in-plane directions",
        latex: "\\vec n=\\vec u\\times\\vec v",
      },
      authoredExample: {
        prompt: "Find the plane containing the line \\(x=y=z\\) and the point \\((1,2,3)\\).",
        steps: [
          "In-plane directions: \\((1,1,1)\\) and \\((1,2,3)\\) (from \\(O\\) on the line).",
          "\\(\\vec n=(1,1,1)\\times(1,2,3)=(1,-2,1)\\); the plane passes through \\(O\\).",
          "Check \\((1,2,3)\\): \\(1-4+3=0\\).",
        ],
        answer: "\\(x-2y+z=0\\).",
      },
      selfCheckExample: {
        prompt: "Find the plane through \\((1,0,0)\\) perpendicular to both \\(x+y+z=1\\) and \\(x-y=0\\).",
        steps: [
          "\\(\\vec n=(1,1,1)\\times(1,-1,0)=(1,1,-2)\\).",
          "Through \\((1,0,0)\\): \\(x+y-2z=1\\).",
        ],
        answer: "\\(x+y-2z=1\\).",
      },
      practiceSet: [
        { prompt: "Plane containing the \\(y\\)-axis and \\((1,2,3)\\)?", answer: "\\(3x-z=0\\)" },
        { prompt: "Plane through \\((1,1,1)\\) parallel to the \\(x\\)- and \\(y\\)-axes?", answer: "\\(z=1\\)" },
        { prompt: "Normal of a plane containing directions \\((1,0,0)\\) and \\((0,0,1)\\)?", answer: "\\((0,1,0)\\)" },
        { prompt: "Normal of a plane perpendicular to \\(z=0\\) and \\(x=0\\)?", answer: "\\((0,1,0)\\)" },
      ],
      pyqExampleId: "710a110d-1f8f-4663-af68-a9359571e144", // 2023 — plane through (-2,3,5) perpendicular to two planes
      traps: [
        {
          title: "Perpendicular to a plane means CONTAINING its normal",
          body: "A plane perpendicular to \\(x+y+z=1\\) has \\((1,1,1)\\) lying in it, so \\((1,1,1)\\) goes into the cross product. Using \\((1,1,1)\\) as the new normal gives a PARALLEL plane instead.",
        },
      ],
    },

    // C3 — family of planes
    {
      kind: "formula" as const,
      slug: "j3d-plane-family",
      name: "The family of planes through a line of intersection",
      intuition:
        "Every plane through the line where \\(P_1=0\\) and \\(P_2=0\\) meet can be written \\(P_1+\\lambda P_2=0\\). The whole question reduces to finding one number \\(\\lambda\\) from the extra condition: a point on the plane, perpendicular to another plane, parallel to a line or an axis, a distance from a point, or a rotation through a right angle.",
      definition:
        "- **Family:** \\(P_1+\\lambda P_2=0\\), normal \\(\\vec n_1+\\lambda\\vec n_2\\).\n" +
        "- **Through a point:** substitute it.\n" +
        "- **Perpendicular to a plane with normal \\(\\vec m\\):** \\((\\vec n_1+\\lambda\\vec n_2)\\cdot\\vec m=0\\).\n" +
        "- **Parallel to a line or axis with direction \\(\\vec d\\):** \\((\\vec n_1+\\lambda\\vec n_2)\\cdot\\vec d=0\\).\n" +
        "- **\\(P_1\\) rotated through \\(90^\\circ\\) about the line:** the new normal is perpendicular to \\(\\vec n_1\\).\n" +
        "- The form never produces \\(P_2\\) itself; check it separately if needed.",
      formula: {
        label: "Planes through a line of intersection",
        latex: "P_1+\\lambda P_2=0",
      },
      authoredExample: {
        prompt: "Find the plane through the line of intersection of \\(x+y+z=1\\) and \\(2x+3y+4z=5\\) that passes through \\((1,1,1)\\).",
        steps: [
          "\\((x+y+z-1)+\\lambda(2x+3y+4z-5)=0\\).",
          "At \\((1,1,1)\\): \\(2+4\\lambda=0\\), so \\(\\lambda=-\\frac12\\).",
          "Multiply by \\(2\\): \\(2x+2y+2z-2-2x-3y-4z+5=0\\).",
        ],
        answer: "\\(y+2z=3\\).",
      },
      selfCheckExample: {
        prompt: "Find the plane through the line of intersection of \\(x-y=1\\) and \\(y+z=3\\) that is perpendicular to \\(x+2y+z=0\\).",
        steps: [
          "Normal \\((1,\\lambda-1,\\lambda)\\); dot with \\((1,2,1)\\): \\(3\\lambda-1=0\\), \\(\\lambda=\\frac13\\).",
          "\\(3(x-y-1)+(y+z-3)=0\\).",
        ],
        answer: "\\(3x-2y+z=6\\).",
      },
      practiceSet: [
        { prompt: "Normal of \\(P_1+\\lambda P_2=0\\)?", answer: "\\(\\vec n_1+\\lambda\\vec n_2\\)" },
        { prompt: "Condition for the family member parallel to the \\(x\\)-axis?", answer: "Its \\(x\\)-coefficient is \\(0\\)" },
        { prompt: "\\(P_1\\) rotated \\(90^\\circ\\) about the line: condition?", answer: "New normal \\(\\cdot\\,\\vec n_1=0\\)" },
        { prompt: "Which plane of the pencil is missing from \\(P_1+\\lambda P_2\\)?", answer: "\\(P_2\\) itself" },
      ],
      pyqExampleId: "123f7b79-01c6-4093-9654-83c79d0fb773", // 2023 — plane through a line of intersection and (0,2,-2); distance squared
      traps: [
        {
          title: "Parallel to a line: dot with its DIRECTION",
          body: "A plane parallel to a line has the line's direction perpendicular to its normal: \\(\\vec n\\cdot\\vec d=0\\). Setting \\(\\vec n\\) parallel to \\(\\vec d\\) instead makes the plane perpendicular to the line.",
        },
      ],
    },

    // C4 — angle between planes
    {
      kind: "formula" as const,
      slug: "j3d-angle-planes",
      name: "The angle between two planes; parallel and perpendicular planes",
      intuition:
        "Two planes meet at the same angle as their normals. So the angle comes from the dot product of the normals, parallel planes have proportional normals, and perpendicular planes have normals with zero dot product.",
      definition:
        "- \\(\\cos\\theta=\\frac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1||\\vec n_2|}\\).\n" +
        "- **Parallel:** \\(\\vec n_1\\parallel\\vec n_2\\). **Perpendicular:** \\(\\vec n_1\\cdot\\vec n_2=0\\).\n" +
        "- The points equidistant from \\(A\\) and \\(B\\) form a plane with normal \\(\\vec{AB}\\).",
      formula: {
        label: "Angle between planes",
        latex: "\\cos\\theta=\\frac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1|\\,|\\vec n_2|}",
      },
      authoredExample: {
        prompt: "Find the angle between \\(x+y=0\\) and \\(y+z=0\\).",
        steps: [
          "\\((1,1,0)\\cdot(0,1,1)=1\\); both normals have length \\(\\sqrt2\\).",
          "\\(\\cos\\theta=\\frac12\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Are \\(2x-4y+6z=1\\) and \\(x-2y+3z=5\\) parallel?",
        steps: [
          "\\((2,-4,6)=2(1,-2,3)\\).",
        ],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Angle between \\(2x-y+z=6\\) and \\(x+y+2z=7\\)?", answer: "\\(60^\\circ\\)" },
        { prompt: "Are \\(x+y+z=1\\) and \\(x-y=4\\) perpendicular?", answer: "Yes" },
        { prompt: "Angle between \\(z=0\\) and \\(x=0\\)?", answer: "\\(90^\\circ\\)" },
        { prompt: "Normal of the plane of points equidistant from \\((1,0,0)\\) and \\((3,2,0)\\)?", answer: "\\((1,1,0)\\)" },
      ],
      pyqExampleId: "3599c607-af94-495a-8ac7-65b46d47c7fd", // 2022 — plane of points equidistant from two points; angle with 2x + y + 3z = 1
      traps: [
        {
          title: "Take the absolute value for the acute angle",
          body: "A negative dot product gives the obtuse angle between the normals. The angle between planes is conventionally the acute one, so use \\(|\\vec n_1\\cdot\\vec n_2|\\).",
        },
      ],
    },
  ],
};
