import type { SubtopicNote } from "@/app/notes/_types";

export const SPHERE_3D_NOTE: SubtopicNote = {
  subtopicName: "Sphere",
  title: "The Sphere",
  oneLineDefinition:
    "A sphere is all points at a fixed distance from a centre; its equation reveals the centre and radius, and a perpendicular distance settles how it meets a plane.",
  whyItMatters:
    "Twenty PYQs across 2017–2026 — the chapter's most self-contained subtopic and a reliable " +
    "scorer. The work is reading centre and radius off the general equation, building spheres " +
    "from conditions (diameter endpoints, concentric, through a point), and the tangency test " +
    "against a plane. Six concepts, ending with the HARD locus problems.",
  concepts: [
    // C1 — equation, centre, radius
    {
      kind: "formula" as const,
      slug: "sphere-equation-centre-radius",
      name: "General equation, centre, and radius",
      intuition:
        "The general sphere \\(x^2+y^2+z^2+2ux+2vy+2wz+d=0\\) hides its centre and radius in the " +
        "coefficients: the centre is \\((-u,-v,-w)\\) (half the linear coefficients, negated) and the " +
        "radius comes from \\(\\sqrt{u^2+v^2+w^2-d}\\). Note the squared terms must have coefficient 1.",
      definition:
        "For \\(x^2+y^2+z^2+2ux+2vy+2wz+d=0\\): **centre** \\(= (-u,-v,-w)\\), **radius** " +
        "\\(= \\sqrt{u^2+v^2+w^2-d}\\). Always ensure the coefficients of \\(x^2, y^2, z^2\\) are each 1 " +
        "(divide through if needed) before reading \\(u, v, w, d\\).",
      formula: {
        label: "Centre and radius of a sphere",
        latex:
          "\\text{centre} = (-u, -v, -w), \\quad r = \\sqrt{u^2 + v^2 + w^2 - d}",
      },
      visualizationSlug: "sphere-centre-radius-3d",
      authoredExample: {
        prompt: "Find the radius of the sphere \\(x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0\\).",
        steps: [
          "Match \\(2u = -2,\\ 2v = 4,\\ 2w = -6\\): so \\(u = -1,\\ v = 2,\\ w = -3\\), and \\(d = -2\\).",
          "Centre \\(= (1, -2, 3)\\).",
          "Radius \\(= \\sqrt{(-1)^2 + 2^2 + (-3)^2 - (-2)} = \\sqrt{1+4+9+2} = \\sqrt{16} = 4\\).",
        ],
        answer: "Radius \\(= 4\\) (centre \\((1,-2,3)\\)).",
      },
      selfCheckExample: {
        prompt: "Find the centre and radius of \\(x^2+y^2+z^2 - 2x - 4y + 2z - 3 = 0\\).",
        steps: [
          "\\(u = -1,\\ v = -2,\\ w = 1,\\ d = -3\\).",
          "Centre \\(= (1, 2, -1)\\).",
          "Radius \\(= \\sqrt{1 + 4 + 1 - (-3)} = \\sqrt{9} = 3\\).",
        ],
        answer: "Centre \\((1, 2, -1)\\), radius \\(3\\).",
      },
      practiceSet: [
        { prompt: "Centre of \\(x^2+y^2+z^2-4x-6y-8z-16=0\\)?", answer: "\\((2,3,4)\\)" },
        { prompt: "Radius formula in terms of u,v,w,d?", answer: "\\(\\sqrt{u^2+v^2+w^2-d}\\)" },
        { prompt: "Centre of \\(x^2+y^2+z^2+2x=0\\)?", answer: "\\((-1,0,0)\\)" },
        { prompt: "Must the coefficients of \\(x^2,y^2,z^2\\) be?", answer: "each 1 (divide first)" },
      ],
      pyqExampleId: "ad6994cc-2d26-4f2e-a9bd-427e375b895c", // 2019 — radius of sphere
    },

    // C2 — diameter form
    {
      kind: "formula" as const,
      slug: "diameter-form",
      name: "Diameter form of a sphere",
      intuition:
        "If you're handed the two ENDS of a diameter, you don't need the centre and radius separately — " +
        "the diameter form writes the sphere directly. The idea: any point \\(P\\) on the sphere sees the " +
        "diameter at a right angle, so \\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0\\).",
      definition:
        "With diameter endpoints \\(A(x_1,y_1,z_1)\\) and \\(B(x_2,y_2,z_2)\\), the sphere is " +
        "\\((x-x_1)(x-x_2) + (y-y_1)(y-y_2) + (z-z_1)(z-z_2) = 0\\). The centre is the midpoint of \\(AB\\) " +
        "and the radius is half of \\(AB\\).",
      formula: {
        label: "Diameter form",
        latex:
          "(x-x_1)(x-x_2) + (y-y_1)(y-y_2) + (z-z_1)(z-z_2) = 0",
      },
      authoredExample: {
        prompt:
          "\\((1,2,3)\\) and \\((3,4,5)\\) are the endpoints of a diameter of \\(x^2+y^2+z^2+2ux+2vy+2wz+d=0\\). Find \\(u+v+w\\).",
        steps: [
          "Centre = midpoint of the diameter = \\(\\left(\\tfrac{1+3}{2}, \\tfrac{2+4}{2}, \\tfrac{3+5}{2}\\right) = (2, 3, 4)\\).",
          "Centre \\(= (-u,-v,-w)\\), so \\(u = -2,\\ v = -3,\\ w = -4\\).",
          "\\(u + v + w = -2 - 3 - 4 = -9\\).",
        ],
        answer: "\\(u + v + w = -9\\).",
      },
      selfCheckExample: {
        prompt: "Find the centre and radius of the sphere with diameter endpoints \\((2,3,5)\\) and \\((4,9,3)\\).",
        steps: [
          "Centre = midpoint \\(= (3, 6, 4)\\).",
          "Diameter length \\(= \\sqrt{(4-2)^2+(9-3)^2+(3-5)^2} = \\sqrt{4+36+4} = \\sqrt{44} = 2\\sqrt{11}\\).",
          "Radius \\(= \\tfrac12(2\\sqrt{11}) = \\sqrt{11}\\).",
        ],
        answer: "Centre \\((3, 6, 4)\\), radius \\(\\sqrt{11}\\).",
      },
      practiceSet: [
        { prompt: "Centre of a sphere given its diameter endpoints?", answer: "midpoint of the endpoints" },
        { prompt: "Radius given diameter endpoints?", answer: "half the distance between them" },
        { prompt: "Diameter ends \\((0,0,0)\\),\\((2,0,0)\\): centre?", answer: "\\((1,0,0)\\)" },
        { prompt: "On the diameter form, \\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = ?\\)", answer: "\\(0\\)" },
      ],
      pyqExampleId: "343928f5-f659-4aa5-9494-c5f7e847583f", // 2024 — endpoints of diameter, u+v+w
    },

    // C3 — sphere from conditions
    {
      kind: "formula" as const,
      slug: "sphere-from-conditions",
      name: "Building a sphere from conditions",
      intuition:
        "Most sphere questions hand you conditions instead of the equation: a centre and radius, or " +
        "'concentric with this sphere and passing through that point'. Concentric means SAME centre — " +
        "reuse \\(u, v, w\\) and only the constant \\(d\\) changes; pin it down with the through-point.",
      definition:
        "**Centre \\((a,b,c)\\), radius \\(r\\):** \\((x-a)^2 + (y-b)^2 + (z-c)^2 = r^2\\).\n" +
        "**Concentric** spheres share a centre, so they share \\(u, v, w\\); only \\(d\\) differs. To make " +
        "it pass through a given point, substitute that point to solve for \\(d\\) (passing through the " +
        "origin forces \\(d = 0\\)).",
      authoredExample: {
        prompt: "Find the equation of the sphere with centre \\((2, -1, 3)\\) and radius 5.",
        steps: [
          "Centre-radius form: \\((x-2)^2 + (y+1)^2 + (z-3)^2 = 25\\).",
          "Expand: \\(x^2 - 4x + 4 + y^2 + 2y + 1 + z^2 - 6z + 9 = 25\\).",
          "Collect: \\(x^2 + y^2 + z^2 - 4x + 2y - 6z - 11 = 0\\).",
        ],
        answer: "\\(x^2 + y^2 + z^2 - 4x + 2y - 6z - 11 = 0\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the sphere concentric with \\(x^2+y^2+z^2-2x-6y-8z-5=0\\) and passing through the origin.",
        steps: [
          "Concentric → same linear terms: \\(x^2+y^2+z^2-2x-6y-8z + d = 0\\).",
          "Passes through origin \\((0,0,0)\\): substitute → \\(d = 0\\).",
          "So the sphere is \\(x^2+y^2+z^2-2x-6y-8z = 0\\).",
        ],
        answer: "\\(x^2+y^2+z^2-2x-6y-8z = 0\\).",
      },
      practiceSet: [
        { prompt: "Concentric spheres share their?", answer: "centre (u, v, w)" },
        { prompt: "Sphere centre origin radius 5?", answer: "\\(x^2+y^2+z^2=25\\)" },
        { prompt: "Passing through the origin forces which constant to?", answer: "\\(d = 0\\)" },
        { prompt: "Centre \\((1,0,0)\\), radius 2 — equation?", answer: "\\((x-1)^2+y^2+z^2=4\\)" },
      ],
      pyqExampleId: "4875bcaf-6e97-4ac4-afb3-89bbdcc79699", // 2018 — sphere centre + radius
    },

    // C4 — sphere and plane
    {
      kind: "formula" as const,
      slug: "sphere-and-plane",
      name: "Sphere and a plane — tangency and sections",
      intuition:
        "Whether a plane misses, touches, or cuts a sphere is decided by ONE number: the perpendicular " +
        "distance \\(p\\) from the centre to the plane, compared with the radius \\(r\\). \\(p>r\\) misses, " +
        "\\(p=r\\) is tangent (touches), \\(p<r\\) cuts a circle of radius \\(\\sqrt{r^2-p^2}\\).",
      definition:
        "Let \\(p\\) be the perpendicular distance from the sphere's centre to the plane and \\(r\\) the " +
        "radius:\n" +
        "- \\(p > r\\): no intersection.\n" +
        "- \\(p = r\\): the plane is **tangent** (touches at one point) — the key NDA condition.\n" +
        "- \\(p < r\\): the plane cuts a **circle** of radius \\(\\sqrt{r^2 - p^2}\\).",
      formula: {
        label: "Tangency condition",
        latex: "p = r \\quad\\text{(perpendicular distance from centre = radius)}",
      },
      visualizationSlug: "sphere-plane-tangency",
      authoredExample: {
        prompt:
          "Find the diameter of the sphere whose centre is \\((1, 2, 2)\\) and which touches the plane \\(x + 2y + 2z + 3 = 0\\).",
        steps: [
          "Touches → radius = perpendicular distance from centre to plane.",
          "\\(p = \\dfrac{|1(1) + 2(2) + 2(2) + 3|}{\\sqrt{1+4+4}} = \\dfrac{|1+4+4+3|}{\\sqrt{9}} = \\dfrac{12}{3} = 4\\).",
          "So radius \\(r = 4\\); diameter \\(= 8\\).",
        ],
        answer: "Diameter \\(= 8\\).",
      },
      selfCheckExample: {
        prompt:
          "Does the plane \\(z = 0\\) cut, touch, or miss the sphere centre \\((0,0,3)\\), radius 2?",
        steps: [
          "Perpendicular distance from \\((0,0,3)\\) to \\(z = 0\\) is \\(p = 3\\).",
          "Radius \\(r = 2\\), so \\(p > r\\).",
          "The plane misses the sphere entirely.",
        ],
        answer: "Misses — \\(p = 3 > r = 2\\).",
      },
      practiceSet: [
        { prompt: "Sphere tangent to a plane means \\(p = ?\\)", answer: "\\(r\\) (the radius)" },
        { prompt: "If \\(p < r\\), the plane cuts a circle of radius?", answer: "\\(\\sqrt{r^2 - p^2}\\)" },
        { prompt: "If \\(p > r\\) the plane and sphere?", answer: "do not meet" },
        { prompt: "z-axis tangent to a sphere means distance from centre to z-axis = ?", answer: "\\(r\\)" },
      ],
      pyqExampleId: "14d831de-041b-404b-b316-21002752e5ce", // 2020 — diameter, sphere touches plane
      traps: [
        {
          title: "Touching a PLANE vs touching an AXIS",
          body:
            "Tangent to a plane → use the point-to-plane distance for \\(p\\). Tangent to the z-axis → use the " +
            "distance from the centre to the z-axis, \\(\\sqrt{x_c^2 + y_c^2}\\). Don't mix the two distance formulas.",
        },
      ],
    },

    // C5 — sphere and axes
    {
      kind: "formula" as const,
      slug: "sphere-and-axes",
      name: "Sphere and the coordinate axes",
      intuition:
        "Counting spheres of a fixed radius that touch all three coordinate axes is a symmetry puzzle: " +
        "the centre must sit at distance \\(r\\) from each axis, which forces \\(|x_c| = |y_c| = |z_c|\\) " +
        "with a sign choice per octant — giving a small finite count.",
      definition:
        "A sphere of radius \\(r\\) touches all three axes when its centre is equidistant from each, " +
        "with each distance equal to \\(r\\). Writing the centre as \\((\\pm a, \\pm a, \\pm a)\\), the " +
        "distance from the centre to (say) the \\(z\\)-axis is \\(\\sqrt{a^2 + a^2} = a\\sqrt2\\); setting " +
        "\\(a\\sqrt2 = r\\) gives \\(a = \\tfrac{r}{\\sqrt2}\\). Each independent sign choice gives a " +
        "distinct sphere, so there are several such spheres (one per octant configuration).",
      formula: {
        label: "Distance from a point to the z-axis",
        latex: "\\text{dist to } z\\text{-axis} = \\sqrt{x_c^2 + y_c^2}",
      },
      authoredExample: {
        prompt: "A sphere of radius 6 touches all three coordinate axes and lies in the first octant. Find the coordinates of its centre.",
        steps: [
          "Touching all three axes makes the centre equidistant from each, so write it as \\((a, a, a)\\) with \\(a > 0\\) (first octant).",
          "The distance from the centre to the \\(z\\)-axis is \\(\\sqrt{a^2 + a^2} = a\\sqrt2\\), and this must equal the radius: \\(a\\sqrt2 = 6\\).",
          "Solve: \\(a = \\dfrac{6}{\\sqrt2} = 3\\sqrt2\\).",
        ],
        answer: "Centre \\(= (3\\sqrt2,\\ 3\\sqrt2,\\ 3\\sqrt2)\\).",
      },
      selfCheckExample: {
        prompt:
          "A sphere has centre \\((3, 4, 7)\\). What is its distance from the z-axis, and is the z-axis tangent if \\(r = 5\\)?",
        steps: [
          "Distance to the z-axis ignores \\(z\\): \\(\\sqrt{3^2 + 4^2} = \\sqrt{9+16} = 5\\).",
          "This equals \\(r = 5\\).",
          "So the z-axis is tangent to the sphere.",
        ],
        answer: "Distance \\(5\\); yes, the z-axis is tangent.",
      },
      practiceSet: [
        { prompt: "Distance from \\((x_c,y_c,z_c)\\) to the z-axis?", answer: "\\(\\sqrt{x_c^2+y_c^2}\\)" },
        { prompt: "Spheres of radius r touching all three axes — how many?", answer: "8", method: "sign choice per coordinate" },
        { prompt: "z-axis tangent ⇒ distance from centre to z-axis equals?", answer: "the radius" },
        { prompt: "Distance from \\((6,8,1)\\) to the z-axis?", answer: "\\(10\\)", method: "\\(\\sqrt{36+64}\\)" },
      ],
      pyqExampleId: "e2894b68-d7be-4e60-9f10-fd099f3ea067", // 2021 — number of spheres touching axes
    },

    // C6 — locus problems
    {
      kind: "formula" as const,
      slug: "sphere-locus-problems",
      name: "Locus problems with spheres",
      intuition:
        "The chapter's hardest sphere questions ask for the LOCUS of a moving point — the centre of a " +
        "variable sphere, or the centroid of the triangle where a sphere cuts the axes. The method is " +
        "always the same: write the moving point's coordinates in terms of a parameter, then eliminate " +
        "the parameter to get a relation in \\(x, y, z\\).",
      definition:
        "Set the moving point \\((x, y, z)\\) equal to the expression you're tracking (centre, centroid, " +
        "etc.), express the free parameters from those equations, and substitute into the governing " +
        "condition (the sphere passes through the origin, the plane through a fixed point, etc.). The " +
        "resulting equation in \\(x, y, z\\) — usually itself a sphere or plane — is the locus.",
      authoredExample: {
        prompt:
          "A sphere of radius \\(r\\) through the origin cuts the axes at \\(A, B, C\\). Find the locus of the centroid of triangle \\(ABC\\).",
        steps: [
          "Such a sphere is \\(x^2+y^2+z^2 - 2ux - 2vy - 2wz = 0\\) (through origin → \\(d=0\\)); it meets the axes at \\(A(2u,0,0), B(0,2v,0), C(0,0,2w)\\).",
          "Centroid \\((x,y,z) = \\left(\\tfrac{2u}{3}, \\tfrac{2v}{3}, \\tfrac{2w}{3}\\right)\\), so \\(u = \\tfrac{3x}{2}\\) etc.",
          "Radius: \\(r = \\sqrt{u^2+v^2+w^2}\\Rightarrow u^2+v^2+w^2 = r^2\\).",
          "Substitute: \\(\\tfrac{9}{4}(x^2+y^2+z^2) = r^2\\), i.e. \\(x^2+y^2+z^2 = \\tfrac{4r^2}{9}\\).",
        ],
        answer: "A sphere: \\(x^2 + y^2 + z^2 = \\tfrac{4r^2}{9}\\).",
      },
      selfCheckExample: {
        prompt:
          "A point \\(P\\) moves so that its distance from the origin is always twice its distance from the point \\((3, 0, 0)\\). Find the locus of \\(P\\).",
        steps: [
          "Let \\(P = (x, y, z)\\). The condition is \\(\\sqrt{x^2+y^2+z^2} = 2\\sqrt{(x-3)^2+y^2+z^2}\\).",
          "Square both sides: \\(x^2+y^2+z^2 = 4\\big[(x-3)^2+y^2+z^2\\big]\\).",
          "Expand and collect: \\(x^2+y^2+z^2 = 4x^2-24x+36+4y^2+4z^2 \\Rightarrow 3x^2+3y^2+3z^2-24x+36 = 0\\).",
          "Divide by 3: \\(x^2+y^2+z^2-8x+12 = 0\\) — a sphere.",
        ],
        answer: "The sphere \\(x^2+y^2+z^2-8x+12 = 0\\).",
      },
      practiceSet: [
        { prompt: "Locus method: write the point in terms of a parameter, then?", answer: "eliminate the parameter" },
        { prompt: "A sphere through the origin has which constant zero?", answer: "\\(d = 0\\)" },
        { prompt: "Sphere \\(x^2+y^2+z^2-2ux-2vy-2wz=0\\) meets the x-axis at?", answer: "\\((2u, 0, 0)\\)" },
        { prompt: "The locus of a centre is often itself a?", answer: "sphere or plane" },
      ],
      pyqExampleId: "73eb6f02-6473-4820-aed4-1aee2c35c3d1", // 2017 — locus of centre OABC
    },
  ],
};
