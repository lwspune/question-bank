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
];
