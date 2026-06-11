/**
 * NDA Maths · 3D Geometry · per-FORMULA recall MCQs.
 * Each formula gets a specific stem + 3 TEMPTING PERMUTATION distractors — wrong
 * versions of the SAME formula, in the SAME full-equation format as the answer
 * (no length/format tell). Run:
 *   npm run quiz:verify nda-maths__3d-geometry-formulas
 *
 * Covers the direction-angle identities (Σcos²θ=1, Σsin²θ=2, Σcos2θ=-1), the
 * direction-cosine unit identity + l=cosα definition, the sphere–plane tangency
 * condition (p=r), and the general-sphere centre/radius. The auto-generated
 * "Which is the formula for X?" stems are rewritten to name the specific formula.
 * Skipped: sphere-and-plane:formula:1 ("perpendicular distance from centre =
 * radius") — descriptive restatement of :0's p=r, not a distinct recallable form.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Direction-angle identities (α, β, γ are a line's angles with the axes) ──
  { atomKey: "direction-angle-identities:formula:0", stem: "For a line making angles α, β, γ with the coordinate axes, which identity for the sum of cos² is correct?", distractors: [f("\\sum \\cos^2\\!\\theta = 0"), f("\\sum \\cos^2\\!\\theta = 2"), f("\\sum \\sin^2\\!\\theta = 1")], theme: "formula" },
  { atomKey: "direction-angle-identities:formula:1", stem: "For a line making angles α, β, γ with the coordinate axes, which identity for the sum of sin² is correct?", distractors: [f("\\sum \\sin^2\\!\\theta = 1"), f("\\sum \\sin^2\\!\\theta = 3"), f("\\sum \\cos^2\\!\\theta = 2")], theme: "formula" },
  { atomKey: "direction-angle-identities:formula:2", stem: "For a line making angles α, β, γ with the coordinate axes, which identity for the sum of cos 2θ is correct?", distractors: [f("\\sum \\cos 2\\theta = 1"), f("\\sum \\cos 2\\theta = -2"), f("\\sum \\sin 2\\theta = -1")], theme: "formula" },

  // ── Direction ratios / cosines fundamentals ──
  { atomKey: "dr-dc-fundamentals:formula:0", stem: "Which unit identity holds for the direction cosines l, m, n of a line?", distractors: [f("l^2 + m^2 + n^2 = 0"), f("l + m + n = 1"), f("l^2 + m^2 + n^2 = 3")], theme: "formula" },
  { atomKey: "dr-dc-fundamentals:formula:1", stem: "If a line makes angles α, β, γ with the axes, which gives its direction cosines l, m, n?", distractors: [f("l = \\sin\\alpha,\\ m = \\sin\\beta,\\ n = \\sin\\gamma"), f("l = \\cos\\alpha,\\ m = \\cos\\beta,\\ n = \\sin\\gamma"), f("l = \\tan\\alpha,\\ m = \\tan\\beta,\\ n = \\tan\\gamma")], theme: "formula" },

  // ── Sphere & plane — tangency condition ──
  { atomKey: "sphere-and-plane:formula:0", stem: "A plane is tangent to a sphere of radius r when the perpendicular distance p from the centre to the plane satisfies which condition?", distractors: [f("p < r"), f("p > r"), f("p = 2r")], theme: "formula" },

  // ── General sphere — centre and radius ──
  { atomKey: "sphere-equation-centre-radius:formula:0", stem: "For x²+y²+z²+2ux+2vy+2wz+d=0, what is the centre of the sphere?", distractors: [f("\\text{centre} = (u, v, w)"), f("\\text{centre} = (-2u, -2v, -2w)"), f("\\text{centre} = (-u, -v, w)")], theme: "formula" },
  { atomKey: "sphere-equation-centre-radius:formula:1", stem: "For x²+y²+z²+2ux+2vy+2wz+d=0, what is the radius of the sphere?", distractors: [f("r = \\sqrt{u^2 + v^2 + w^2 + d}"), f("r = u^2 + v^2 + w^2 - d"), f("r = \\sqrt{u^2 + v^2 + w^2} - d")], theme: "formula" },

  // ── auto-atom fixes (2026-06-11) ─────────────────────────────────────────
  // Distance between two points
  {
    atomKey: "distance-formula:formula:0",
    stem: "The distance between the points \\(A(x_1, y_1, z_1)\\) and \\(B(x_2, y_2, z_2)\\) in space is:",
    distractors: [
      f("AB = (x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2"),
      f("AB = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 - (z_2-z_1)^2}"),
      f("AB = \\sqrt{(x_2+x_1)^2 + (y_2+y_1)^2 + (z_2+z_1)^2}"),
    ],
    theme: "formula",
  },

  // Section formula — internal division in ratio m : n
  {
    atomKey: "section-formula:formula:0",
    stem: "The point dividing the segment from \\(A(x_1,y_1,z_1)\\) to \\(B(x_2,y_2,z_2)\\) internally in the ratio \\(m:n\\) is:",
    distractors: [
      f("\\left( \\frac{m x_1 + n x_2}{m+n},\\ \\frac{m y_1 + n y_2}{m+n},\\ \\frac{m z_1 + n z_2}{m+n} \\right)"),
      f("\\left( \\frac{m x_2 + n x_1}{m-n},\\ \\frac{m y_2 + n y_1}{m-n},\\ \\frac{m z_2 + n z_1}{m-n} \\right)"),
      f("\\left( \\frac{m x_2 - n x_1}{m+n},\\ \\frac{m y_2 - n y_1}{m+n},\\ \\frac{m z_2 - n z_1}{m+n} \\right)"),
    ],
    theme: "formula",
  },

  // Centroid of a triangle
  {
    atomKey: "midpoint-centroid:formula:0",
    stem: "The centroid \\(G\\) of the triangle with vertices \\((x_1,y_1,z_1),(x_2,y_2,z_2),(x_3,y_3,z_3)\\) is:",
    distractors: [
      f("G = \\left( \\frac{x_1+x_2+x_3}{2},\\ \\frac{y_1+y_2+y_3}{2},\\ \\frac{z_1+z_2+z_3}{2} \\right)"),
      f("G = \\left( \\frac{x_1+x_2}{3},\\ \\frac{y_1+y_2}{3},\\ \\frac{z_1+z_2}{3} \\right)"),
      f("G = \\left( \\frac{x_1 x_2 x_3}{3},\\ \\frac{y_1 y_2 y_3}{3},\\ \\frac{z_1 z_2 z_3}{3} \\right)"),
    ],
    theme: "formula",
  },

  // Diameter form of a sphere
  {
    atomKey: "diameter-form:formula:0",
    stem: "If \\((x_1,y_1,z_1)\\) and \\((x_2,y_2,z_2)\\) are the ends of a diameter, the equation of the sphere is:",
    distractors: [
      f("(x-x_1)(x+x_2) + (y-y_1)(y+y_2) + (z-z_1)(z+z_2) = 0"),
      f("(x-x_1)(x-x_2) + (y-y_1)(y-y_2) + (z-z_1)(z-z_2) = 1"),
      f("(x-x_1)^2 + (y-y_1)^2 + (z-z_1)^2 = 0"),
    ],
    theme: "formula",
  },

  // General sphere — centre (this concept_slug's :0 is the centre coordinate, but
  // the harvested `correct` is the dist-to-z-axis identity — see sphere-and-axes below).
  // Distance from a point to the z-axis (sphere-and-axes)
  {
    atomKey: "sphere-and-axes:formula:0",
    stem: "The (perpendicular) distance from a point \\((x_c, y_c, z_c)\\) to the \\(z\\)-axis is:",
    distractors: [
      f("\\text{dist to } z\\text{-axis} = \\sqrt{x_c^2 + z_c^2}"),
      f("\\text{dist to } z\\text{-axis} = \\sqrt{y_c^2 + z_c^2}"),
      f("\\text{dist to } z\\text{-axis} = x_c^2 + y_c^2"),
    ],
    theme: "formula",
  },

  // Direction cosines: unit identity is dr-dc; here line-equation-forms (symmetric form)
  {
    atomKey: "line-equation-forms:formula:0",
    stem: "The symmetric (parametric) form of the line through \\((x_0,y_0,z_0)\\) with direction ratios \\(\\langle a,b,c\\rangle\\) is:",
    distractors: [
      f("\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c} = 0"),
      f("\\frac{a}{x - x_0} = \\frac{b}{y - y_0} = \\frac{c}{z - z_0} = t"),
      f("\\frac{x + x_0}{a} = \\frac{y + y_0}{b} = \\frac{z + z_0}{c} = t"),
    ],
    theme: "formula",
  },

  // Projection of a segment on a line of direction cosines
  {
    atomKey: "projection-on-axis:formula:0",
    stem: "The projection of the segment from \\(A(x_1,y_1,z_1)\\) to \\(B(x_2,y_2,z_2)\\) on a line with direction cosines \\(\\langle l,m,n\\rangle\\) is:",
    distractors: [
      f("\\text{proj} = (x_2-x_1)\\,l - (y_2-y_1)\\,m - (z_2-z_1)\\,n"),
      f("\\text{proj} = (x_2+x_1)\\,l + (y_2+y_1)\\,m + (z_2+z_1)\\,n"),
      f("\\text{proj} = \\frac{(x_2-x_1)}{l} + \\frac{(y_2-y_1)}{m} + \\frac{(z_2-z_1)}{n}"),
    ],
    theme: "formula",
  },

  // Angle between TWO LINES (direction ratios)
  {
    atomKey: "angle-between-two-lines:formula:0",
    stem: "The angle \\(\\theta\\) between two lines with direction ratios \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\) is given by:",
    distractors: [
      f("\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{a_1^2+b_1^2+c_1^2 + a_2^2+b_2^2+c_2^2}"),
      f("\\cos\\theta = \\frac{|a_1 b_1 + a_2 b_2 + c_1 c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}"),
      f("\\cos\\theta = \\frac{a_1 a_2 + b_1 b_2 + c_1 c_2}{\\sqrt{a_1^2+b_1^2+c_1^2} + \\sqrt{a_2^2+b_2^2+c_2^2}}"),
    ],
    theme: "formula",
  },

  // Perpendicular / parallel conditions (perpendicularity)
  {
    atomKey: "perpendicular-parallel-lines:formula:0",
    stem: "Two lines with direction ratios \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\) are perpendicular if and only if:",
    distractors: [
      f("\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}"),
      f("a_1 a_2 + b_1 b_2 + c_1 c_2 = 1"),
      f("a_1 a_2 - b_1 b_2 - c_1 c_2 = 0"),
    ],
    theme: "formula",
  },

  // Plane — point-normal form
  {
    atomKey: "plane-equation-forms:formula:0",
    stem: "The equation of the plane through \\((x_0,y_0,z_0)\\) with normal \\(\\langle a,b,c\\rangle\\) is:",
    distractors: [
      f("a(x - x_0) + b(y - y_0) + c(z - z_0) = 1"),
      f("a(x + x_0) + b(y + y_0) + c(z + z_0) = 0"),
      f("x(a - x_0) + y(b - y_0) + z(c - z_0) = 0"),
    ],
    theme: "formula",
  },

  // Plane — intercept form
  {
    atomKey: "intercept-and-special-planes:formula:0",
    stem: "The equation of the plane with x-, y-, z-intercepts \\(a, b, c\\) is:",
    distractors: [
      f("\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 0"),
      f("a x + b y + c z = 1"),
      f("\\frac{a}{x} + \\frac{b}{y} + \\frac{c}{z} = 1"),
    ],
    theme: "formula",
  },

  // Plane through three points (determinant form)
  {
    atomKey: "plane-through-three-points:formula:0",
    stem: "The equation of the plane through the three points \\((x_1,y_1,z_1),(x_2,y_2,z_2),(x_3,y_3,z_3)\\) is:",
    distractors: [
      f("\\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\\\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ x_3-x_1 & y_3-y_1 & z_3-z_1 \\end{vmatrix} = 1"),
      f("\\begin{vmatrix} x & y & z \\\\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ x_3-x_1 & y_3-y_1 & z_3-z_1 \\end{vmatrix} = 0"),
      f("\\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\\\ x_2+x_1 & y_2+y_1 & z_2+z_1 \\\\ x_3+x_1 & y_3+y_1 & z_3+z_1 \\end{vmatrix} = 0"),
    ],
    theme: "formula",
  },

  // Distance from a point to a plane
  {
    atomKey: "distance-and-foot-of-perpendicular:formula:0",
    stem: "The perpendicular distance from the point \\((x_1,y_1,z_1)\\) to the plane \\(ax + by + cz + d = 0\\) is:",
    distractors: [
      f("\\text{distance} = \\frac{|a x_1 + b y_1 + c z_1 + d|}{a^2 + b^2 + c^2}"),
      f("\\text{distance} = \\frac{a x_1 + b y_1 + c z_1 + d}{\\sqrt{a^2 + b^2 + c^2}}"),
      f("\\text{distance} = \\frac{|a x_1 + b y_1 + c z_1|}{\\sqrt{a^2 + b^2 + c^2}}"),
    ],
    theme: "formula",
  },

  // Angle between TWO PLANES (via normals)
  {
    atomKey: "angle-between-planes:formula:0",
    stem: "The angle \\(\\theta\\) between two planes with normals \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\) is given by:",
    distractors: [
      f("\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{a_1^2+b_1^2+c_1^2 + a_2^2+b_2^2+c_2^2}"),
      f("\\cos\\theta = \\frac{a_1 a_2 + b_1 b_2 + c_1 c_2}{\\sqrt{a_1^2+b_1^2+c_1^2} + \\sqrt{a_2^2+b_2^2+c_2^2}}"),
      f("\\cos\\theta = \\frac{|a_1 + a_2 + b_1 + b_2 + c_1 + c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}"),
    ],
    theme: "formula",
  },

  // Plane through the line of intersection of two planes (pencil)
  {
    atomKey: "plane-through-intersection:formula:0",
    stem: "The family of planes through the line of intersection of planes \\(P_1 = 0\\) and \\(P_2 = 0\\) is:",
    distractors: [
      f("P_1 + \\lambda P_2 = 1"),
      f("\\lambda P_1 + \\lambda P_2 = 0"),
      f("P_1 \\cdot \\lambda P_2 = 0"),
    ],
    theme: "formula",
  },

  // Line parallel to / lying in a plane (direction ⟂ normal condition)
  {
    atomKey: "line-parallel-or-lying-in-plane:formula:0",
    stem: "A line with direction ratios \\(\\langle a,b,c\\rangle\\) is parallel to (or lies in) a plane with normal \\(\\langle A,B,C\\rangle\\) if and only if:",
    distractors: [
      f("\\frac{A}{a} = \\frac{B}{b} = \\frac{C}{c}"),
      f("A a + B b + C c = 1"),
      f("A a - B b + C c = 0"),
    ],
    theme: "formula",
  },
];
