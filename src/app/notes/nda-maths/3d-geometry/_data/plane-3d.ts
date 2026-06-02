import type { SubtopicNote } from "@/app/notes/_types";

export const PLANE_3D_NOTE: SubtopicNote = {
  subtopicName: "The Plane",
  title: "The Plane",
  oneLineDefinition:
    "A plane is fixed by a point and a normal direction; its equation, distances, and angles all read off the normal ⟨a, b, c⟩.",
  whyItMatters:
    "Fourteen PYQs spanning EASY to HARD. The plane's normal vector is the master key: it gives " +
    "the equation, the angle between two planes, the distance from a point, and the foot of a " +
    "perpendicular. Six concepts cover the lot — equation forms, intercepts, the three-point " +
    "plane, distances, angles, and the plane-through-intersection pencil.",
  concepts: [
    // C1 — plane equation forms
    {
      kind: "formula" as const,
      slug: "plane-equation-forms",
      name: "Equation of a plane and its normal",
      intuition:
        "The coefficients in \\(ax + by + cz = d\\) ARE the components of the plane's normal vector " +
        "\\(\\langle a, b, c\\rangle\\). So building a plane is mostly about finding its normal: a plane " +
        "perpendicular to a given line just borrows that line's direction ratios as its normal.",
      definition:
        "The general plane is \\(ax + by + cz = d\\) with **normal** \\(\\langle a, b, c\\rangle\\). " +
        "**Point-normal form:** the plane through \\((x_0,y_0,z_0)\\) with normal \\(\\langle a,b,c\\rangle\\) " +
        "is \\(a(x-x_0) + b(y-y_0) + c(z-z_0) = 0\\). Parallel planes share the same normal (only \\(d\\) differs).",
      formula: {
        label: "Point-normal form",
        latex: "a(x - x_0) + b(y - y_0) + c(z - z_0) = 0",
        symbols: [
          { symbol: "\\(\\langle a,b,c\\rangle\\)", meaning: "normal direction ratios" },
          { symbol: "\\((x_0,y_0,z_0)\\)", meaning: "a point on the plane" },
        ],
      },
      visualizationSlug: "plane-with-normal",
      authoredExample: {
        prompt:
          "Find the equation of the plane through \\((2, -1, 3)\\) perpendicular to the line with direction ratios \\(\\langle 1, 4, 2\\rangle\\).",
        steps: [
          "Perpendicular to that line → the plane's normal IS \\(\\langle 1, 4, 2\\rangle\\).",
          "Point-normal form: \\(1(x-2) + 4(y+1) + 2(z-3) = 0\\).",
          "Expand: \\(x + 4y + 2z - 4 = 0\\).",
        ],
        answer: "\\(x + 4y + 2z = 4\\).",
      },
      selfCheckExample: {
        prompt:
          "What are the direction ratios of a normal to the plane \\(2x - 3y + 6z + 4 = 0\\)?",
        steps: [
          "The normal's components are the coefficients of \\(x, y, z\\).",
          "Read them off: \\(\\langle 2, -3, 6\\rangle\\).",
        ],
        answer: "\\(\\langle 2, -3, 6\\rangle\\).",
      },
      practiceSet: [
        { prompt: "Normal to \\(x - 2y + 5z = 9\\)?", answer: "\\(\\langle 1,-2,5\\rangle\\)" },
        { prompt: "Plane ⟂ to line \\(\\langle1,0,0\\rangle\\) through origin?", answer: "\\(x = 0\\)" },
        { prompt: "Two parallel planes share what?", answer: "the same normal" },
        { prompt: "Plane through \\((0,0,0)\\) with normal \\(\\langle1,1,1\\rangle\\)?", answer: "\\(x+y+z=0\\)" },
      ],
      pyqExampleId: "91a5cd3c-4035-45dd-b58c-0d686c00a659", // 2025 — plane ⟂ to line through point
    },

    // C2 — intercept + special planes
    {
      kind: "formula" as const,
      slug: "intercept-and-special-planes",
      name: "Intercept form and special planes",
      intuition:
        "If a plane cuts the axes at \\(a, b, c\\), its equation is the clean intercept form " +
        "\\(\\frac{x}{a}+\\frac{y}{b}+\\frac{z}{c}=1\\). And planes parallel to a coordinate plane are the " +
        "simplest of all — \\(z = k\\) is everything at height \\(k\\), a plane parallel to the XY-plane.",
      definition:
        "**Intercept form:** a plane with x-, y-, z-intercepts \\(a, b, c\\) is " +
        "\\(\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1\\).\n" +
        "**Special planes:** \\(z = k\\) is parallel to the XY-plane; \\(x = k\\) parallel to the YZ-plane; " +
        "\\(y = k\\) parallel to the ZX-plane. The locus \\(z = 7\\) is therefore a plane, not a line.",
      formula: {
        label: "Intercept form",
        latex: "\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1",
      },
      authoredExample: {
        prompt:
          "Find the equation of the plane that cuts intercepts of 2, 3 and 4 on the x-, y- and z-axes respectively.",
        steps: [
          "Intercept form: \\(\\frac{x}{2} + \\frac{y}{3} + \\frac{z}{4} = 1\\).",
          "Multiply through by 12: \\(6x + 4y + 3z = 12\\).",
        ],
        answer: "\\(6x + 4y + 3z = 12\\).",
      },
      selfCheckExample: {
        prompt:
          "A plane has intercepts 2, 2, 1 on the coordinate axes. Find the direction cosines of its normal.",
        steps: [
          "Intercept form: \\(\\frac{x}{2} + \\frac{y}{2} + \\frac{z}{1} = 1\\), i.e. \\(x + y + 2z = 2\\).",
          "Normal \\(= \\langle 1, 1, 2\\rangle\\); magnitude \\(\\sqrt{1+1+4} = \\sqrt6\\).",
          "Direction cosines: \\(\\left\\langle \\tfrac{1}{\\sqrt6}, \\tfrac{1}{\\sqrt6}, \\tfrac{2}{\\sqrt6}\\right\\rangle\\).",
        ],
        answer: "\\(\\left\\langle \\tfrac{1}{\\sqrt6}, \\tfrac{1}{\\sqrt6}, \\tfrac{2}{\\sqrt6}\\right\\rangle\\).",
      },
      practiceSet: [
        { prompt: "Plane with intercepts 1,1,1?", answer: "\\(x+y+z=1\\)" },
        { prompt: "The locus \\(z = 7\\) is a line or a plane?", answer: "a plane", method: "parallel to XY-plane" },
        { prompt: "Plane parallel to YZ-plane through \\(x=3\\)?", answer: "\\(x = 3\\)" },
        { prompt: "x-intercept of \\(2x + y + z = 4\\)?", answer: "\\(2\\)", method: "set y=z=0" },
      ],
      pyqExampleId: "90237ad8-ae0e-40d4-983a-660b1e202fe1", // 2020 — plane ∥ xy, intercept 5
    },

    // C3 — plane through three points
    {
      kind: "formula" as const,
      slug: "plane-through-three-points",
      name: "Plane through three points",
      intuition:
        "Three non-collinear points fix a plane. Build two edge vectors from one point, take their cross " +
        "product to get the normal, then use point-normal form. (The determinant formula packages the " +
        "same computation.)",
      definition:
        "For points \\(A, B, C\\): form \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\); the " +
        "normal is \\(\\vec n = \\overrightarrow{AB} \\times \\overrightarrow{AC}\\); then write " +
        "\\(\\vec n \\cdot (\\vec r - \\vec A) = 0\\). Equivalently, the plane is the determinant equation " +
        "below.",
      formula: {
        label: "Determinant form through three points",
        latex:
          "\\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\\\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ x_3-x_1 & y_3-y_1 & z_3-z_1 \\end{vmatrix} = 0",
      },
      authoredExample: {
        prompt: "Find the equation of the plane through \\(A(1,1,0)\\), \\(B(2,0,1)\\) and \\(C(0,1,2)\\).",
        steps: [
          "Form two edge vectors: \\(\\overrightarrow{AB} = B - A = \\langle 1, -1, 1\\rangle\\) and \\(\\overrightarrow{AC} = C - A = \\langle -1, 0, 2\\rangle\\).",
          "The normal is their cross product: \\(\\vec n = \\overrightarrow{AB} \\times \\overrightarrow{AC} = \\langle (-1)(2)-(1)(0),\\ (1)(-1)-(1)(2),\\ (1)(0)-(-1)(-1)\\rangle = \\langle -2, -3, -1\\rangle\\).",
          "Point-normal form through \\(A\\): \\(-2(x-1) - 3(y-1) - 1(z-0) = 0\\).",
          "Simplify: \\(2x + 3y + z = 5\\). (Check: \\(A\\) gives \\(2+3+0=5\\) ✓.)",
        ],
        answer: "\\(2x + 3y + z = 5\\).",
      },
      selfCheckExample: {
        prompt: "Find the equation of the plane through \\(P(2,1,1)\\), \\(Q(1,2,1)\\) and \\(R(1,1,2)\\) using the cross product.",
        steps: [
          "Edge vectors: \\(\\overrightarrow{PQ} = \\langle -1, 1, 0\\rangle\\), \\(\\overrightarrow{PR} = \\langle -1, 0, 1\\rangle\\).",
          "Normal: \\(\\vec n = \\overrightarrow{PQ} \\times \\overrightarrow{PR} = \\langle 1, 1, 1\\rangle\\).",
          "Point-normal through \\(P\\): \\((x-2)+(y-1)+(z-1)=0 \\Rightarrow x+y+z=4\\).",
        ],
        answer: "\\(x + y + z = 4\\).",
      },
      practiceSet: [
        { prompt: "The normal to a 3-point plane comes from which operation?", answer: "cross product of two edge vectors" },
        { prompt: "Plane through \\((2,0,0),(0,2,0),(0,0,2)\\)?", answer: "\\(x+y+z=2\\)" },
        { prompt: "Three collinear points fix a plane?", answer: "No — infinitely many planes" },
        { prompt: "Minimum points to fix a unique plane?", answer: "Three (non-collinear)" },
      ],
      pyqExampleId: "3cedd8c3-d544-41b6-a0ce-5bfd727f6ed1", // 2018 — plane through 3 points
    },

    // C4 — distance + foot of perpendicular
    {
      kind: "formula" as const,
      slug: "distance-and-foot-of-perpendicular",
      name: "Distance from a point and the foot of the perpendicular",
      intuition:
        "The perpendicular distance from a point to a plane plugs the point into \\(ax+by+cz-d\\) and " +
        "divides by the normal's length. For two PARALLEL planes, make the normals identical and the " +
        "distance is just the gap in the constants over that same length. The foot of the perpendicular " +
        "is reached by stepping from the point along the unit normal.",
      definition:
        "Distance from \\((x_1,y_1,z_1)\\) to \\(ax+by+cz+d=0\\) is the formula below. For parallel planes " +
        "\\(ax+by+cz+d_1 = 0\\) and \\(ax+by+cz+d_2 = 0\\) (SAME coefficients), the distance is " +
        "\\(\\frac{|d_1-d_2|}{\\sqrt{a^2+b^2+c^2}}\\) — scale one plane first so the normals match.",
      formula: {
        label: "Distance from a point to a plane",
        latex: "\\text{distance} = \\frac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
      },
      visualizationSlug: "plane-with-normal",
      authoredExample: {
        prompt: "Find the distance of the point \\((2, 3, 4)\\) from the plane \\(3x - 6y + 2z + 11 = 0\\).",
        steps: [
          "Plug into \\(|ax_1+by_1+cz_1+d|\\): \\(|3(2) - 6(3) + 2(4) + 11| = |6 - 18 + 8 + 11| = |7| = 7\\).",
          "Normal length: \\(\\sqrt{9 + 36 + 4} = \\sqrt{49} = 7\\).",
          "Distance \\(= \\tfrac{7}{7} = 1\\).",
        ],
        answer: "\\(1\\) unit.",
      },
      selfCheckExample: {
        prompt:
          "Find the distance between the parallel planes \\(2x - y + 2z + 3 = 0\\) and \\(4x - 2y + 4z + 5 = 0\\).",
        steps: [
          "Scale the second by \\(\\tfrac12\\) so the normals match: \\(2x - y + 2z + 2.5 = 0\\).",
          "Constants now \\(d_1 = 3,\\ d_2 = 2.5\\): difference \\(|3 - 2.5| = 0.5\\).",
          "Normal length \\(\\sqrt{4 + 1 + 4} = 3\\).",
          "Distance \\(= \\tfrac{0.5}{3} = \\tfrac16\\).",
        ],
        answer: "\\(\\tfrac16\\) unit.",
      },
      practiceSet: [
        { prompt: "Distance of origin from \\(x + 2y - 2z = 9\\)?", answer: "\\(3\\)", method: "\\(|{-9}|/\\sqrt{1+4+4}=9/3\\)" },
        { prompt: "Distance of \\((1,1,1)\\) from \\(x+y+z=0\\)?", answer: "\\(\\sqrt3\\)", method: "\\(3/\\sqrt3\\)" },
        { prompt: "Before using the parallel-plane gap formula, normals must be?", answer: "identical (scale one plane)" },
        { prompt: "Foot of perpendicular is reached by stepping along the?", answer: "unit normal" },
      ],
      pyqExampleId: "0fad24a0-85b4-47fa-9093-33e12adf4c17", // 2019 — distance between parallel planes
      traps: [
        {
          title: "Scale parallel planes to a common normal BEFORE subtracting constants",
          body:
            "\\(4x-2y+4z+9=0\\) and \\(8x-4y+8z+21=0\\) look like they differ by 12 in the constant — but the " +
            "normals differ by a factor of 2. Halve the second plane first; only then is \\(|d_1-d_2|/|n|\\) valid.",
        },
      ],
    },

    // C5 — angle between planes
    {
      kind: "formula" as const,
      slug: "angle-between-planes",
      name: "Angle between two planes",
      intuition:
        "The angle between two planes is the angle between their normals — same dot-product formula as " +
        "two lines, applied to \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\). " +
        "Perpendicular planes have perpendicular normals; parallel planes have proportional normals.",
      definition:
        "For planes with normals \\(\\vec n_1, \\vec n_2\\), the angle \\(\\theta\\) between them satisfies " +
        "\\(\\cos\\theta = \\frac{|\\vec n_1 \\cdot \\vec n_2|}{|\\vec n_1||\\vec n_2|}\\). The planes are " +
        "**perpendicular** iff \\(\\vec n_1 \\cdot \\vec n_2 = 0\\) and **parallel** iff the normals are proportional.",
      formula: {
        label: "Angle between planes (via normals)",
        latex:
          "\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}",
      },
      authoredExample: {
        prompt: "Find the angle between the planes \\(2x - y + z = 1\\) and \\(x + y + 2z = 3\\).",
        steps: [
          "Normals: \\(\\langle 2,-1,1\\rangle\\) and \\(\\langle 1,1,2\\rangle\\).",
          "Dot: \\(2 - 1 + 2 = 3\\). Magnitudes: \\(\\sqrt6\\) and \\(\\sqrt6\\).",
          "\\(\\cos\\theta = \\dfrac{3}{\\sqrt6 \\cdot \\sqrt6} = \\dfrac{3}{6} = \\tfrac12\\).",
          "So \\(\\theta = 60° = \\tfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\tfrac{\\pi}{3}\\) (60°).",
      },
      selfCheckExample: {
        prompt: "Are the planes \\(2x - y + 2z = 5\\) and \\(x + 2y = 4\\) perpendicular?",
        steps: [
          "Normals: \\(\\langle 2, -1, 2\\rangle\\) and \\(\\langle 1, 2, 0\\rangle\\).",
          "Dot: \\(2(1) + (-1)(2) + 2(0) = 2 - 2 + 0 = 0\\).",
          "Zero → the normals (and hence the planes) are perpendicular.",
        ],
        answer: "Yes — the normals' dot product is 0.",
      },
      practiceSet: [
        { prompt: "Angle between planes = angle between their?", answer: "normals" },
        { prompt: "Perpendicular planes: normals' dot product?", answer: "\\(0\\)" },
        { prompt: "Planes \\(x+y+z=1\\), \\(2x+2y+2z=5\\): parallel?", answer: "Yes", method: "normals proportional" },
        { prompt: "\\(\\cos\\theta\\) for normals \\(\\langle1,0,0\\rangle\\),\\(\\langle0,0,1\\rangle\\)?", answer: "\\(0\\) (90°)" },
      ],
      pyqExampleId: "6c2938ee-7824-4d5b-a106-b6aa60b3e315", // 2018 — angle + distance between planes
    },

    // C6 — plane through intersection
    {
      kind: "formula" as const,
      slug: "plane-through-intersection",
      name: "Plane through the line of intersection of two planes",
      intuition:
        "Every plane containing the line where \\(P_1 = 0\\) and \\(P_2 = 0\\) meet can be written as " +
        "\\(P_1 + \\lambda P_2 = 0\\) for some \\(\\lambda\\). Pick \\(\\lambda\\) to satisfy one extra " +
        "condition — passing through a point, or being perpendicular to a third plane — and you're done.",
      definition:
        "The family (pencil) of planes through the intersection of \\(P_1: a_1x+b_1y+c_1z+d_1 = 0\\) and " +
        "\\(P_2: a_2x+b_2y+c_2z+d_2 = 0\\) is \\(P_1 + \\lambda P_2 = 0\\). Determine \\(\\lambda\\) from " +
        "the extra constraint (point on the plane, or perpendicularity to a given plane via the normal dot product).",
      formula: {
        label: "Pencil of planes",
        latex: "P_1 + \\lambda P_2 = 0",
      },
      authoredExample: {
        prompt:
          "Find the plane through the intersection of \\(x + y + z = 3\\) and \\(2x - y + z = 4\\) that passes through \\((3, 1, 1)\\).",
        steps: [
          "Family: \\((x+y+z-3) + \\lambda(2x-y+z-4) = 0\\).",
          "Substitute \\((3,1,1)\\): \\((3+1+1-3) + \\lambda(6-1+1-4) = 0 \\Rightarrow 2 + 2\\lambda = 0\\).",
          "\\(\\lambda = -1\\).",
          "Plug back: \\((x+y+z-3) - (2x-y+z-4) = -x + 2y + 1 = 0\\), i.e. \\(x - 2y = 1\\).",
        ],
        answer: "\\(x - 2y = 1\\).",
      },
      selfCheckExample: {
        prompt:
          "Set up (don't fully solve) the plane through the intersection of \\(x + y + z = 1\\) and \\(2x + 3y + 4z = 7\\) that is perpendicular to \\(x - 5y + 3z = 5\\).",
        steps: [
          "Family: \\((x+y+z-1) + \\lambda(2x+3y+4z-7) = 0\\); normal \\(\\langle 1+2\\lambda,\\ 1+3\\lambda,\\ 1+4\\lambda\\rangle\\).",
          "Perpendicular to \\(\\langle 1,-5,3\\rangle\\): dot \\(= 0\\).",
          "\\((1+2\\lambda) - 5(1+3\\lambda) + 3(1+4\\lambda) = 0 \\Rightarrow -1 - \\lambda = 0 \\Rightarrow \\lambda = -1\\).",
        ],
        answer: "\\(\\lambda = -1\\), giving \\(-x - 2y - 3z + 6 = 0\\), i.e. \\(x + 2y + 3z = 6\\).",
      },
      practiceSet: [
        { prompt: "The pencil of planes through an intersection is written as?", answer: "\\(P_1 + \\lambda P_2 = 0\\)" },
        { prompt: "λ is fixed using how many extra conditions?", answer: "one" },
        { prompt: "To pass through a point, you substitute the point and solve for?", answer: "\\(\\lambda\\)" },
        { prompt: "Perpendicular-to-a-plane condition uses which product of normals?", answer: "dot product = 0" },
      ],
      pyqExampleId: "e3c7f647-fff9-42a3-bdad-cde0ab6b49e6", // 2019 — plane through intersection + point
    },
  ],
};
