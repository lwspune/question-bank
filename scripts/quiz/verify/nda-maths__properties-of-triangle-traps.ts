/**
 * NDA Maths · Properties of Triangle · COMMON-TRAPS theme — "spot the mistake" MCQs.
 * One per misconception callout authored into the notes _data. The first
 * distractor in each is the warned mistake; every `correct` re-derived.
 * Trap callouts were topped up from 3 → 12 (sine-rule ×3, cosine-rule ×2,
 * nature ×1, area ×2, angle-sum ×1, tan-product ×1, incircle/circumcircle ×2).
 *   npm run quiz:verify nda-maths__properties-of-triangle-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pt-sine-rule ──
  {
    // pairing a side with the wrong angle
    atomKey: "pt-sine-rule:trap:0",
    stem: "In \\(\\triangle ABC\\), \\(A = 30^\\circ\\), \\(B = 90^\\circ\\), \\(a = 5\\). Find side \\(b\\).",
    correct: f("10"),
    distractors: [f("\\dfrac{5}{2}"), f("5\\sqrt3"), f("\\dfrac{5}{\\sqrt3}")],
    theme: "trap",
  },
  {
    // the ratio is 2R, not R
    atomKey: "pt-sine-rule:trap:1",
    stem: "In \\(\\triangle ABC\\), \\(A = 30^\\circ\\) and \\(a = 6\\). Find the circumradius \\(R\\).",
    correct: f("6"),
    distractors: [f("12"), f("3"), f("\\sqrt3")],
    theme: "trap",
  },
  {
    // ambiguous SSA — two triangles possible
    atomKey: "pt-sine-rule:trap:2",
    stem: "Two sides and a non-included angle are given. How many distinct triangles can the data fit (in the ambiguous case)?",
    correct: "Possibly two.",
    distractors: ["Always exactly one.", "None — the data is invalid.", "Always three."],
    theme: "trap",
  },

  // ── pt-cosine-rule ──
  {
    // which side is squared / opposite the angle
    atomKey: "pt-cosine-rule:trap:0",
    stem: "For \\(\\triangle ABC\\) with \\(a = 3,\\ b = 4,\\ c = 5\\), find \\(\\cos C\\).",
    correct: f("0"),
    distractors: [f("\\dfrac{3}{5}"), f("\\dfrac{4}{5}"), f("1")],
    theme: "trap",
  },
  {
    // a negative cosine means an obtuse angle
    atomKey: "pt-cosine-rule:trap:1",
    stem: "In \\(\\triangle ABC\\), \\(\\cos C = -\\tfrac12\\). What is angle \\(C\\)?",
    correct: f("120^\\circ"),
    distractors: [f("60^\\circ"), f("30^\\circ"), f("150^\\circ")],
    theme: "trap",
  },

  // ── pt-nature-of-triangle ──
  {
    // test a²+b²=c² on the LARGEST side only
    atomKey: "pt-nature-of-triangle:trap:0",
    stem: "A triangle has sides \\(6,\\ 8,\\ 10\\). What is its nature?",
    correct: "Right-angled.",
    distractors: ["Acute.", "Obtuse.", "Equilateral."],
    theme: "trap",
  },

  // ── pt-area-of-triangle ──
  {
    // area uses sin, not cos
    atomKey: "pt-area-of-triangle:trap:0",
    stem: "Find the area of \\(\\triangle ABC\\) with \\(a = 4,\\ b = 5\\) and included angle \\(C = 90^\\circ\\).",
    correct: f("10"),
    distractors: [f("0"), f("20"), f("\\dfrac{5}{2}")],
    theme: "trap",
  },
  {
    // Heron's s is the SEMI-perimeter
    atomKey: "pt-area-of-triangle:trap:1",
    stem: "For Heron's formula on a triangle with sides \\(3,\\ 4,\\ 5\\), what value of \\(s\\) do you use?",
    correct: f("6"),
    distractors: [f("12"), f("4"), f("3")],
    theme: "trap",
  },

  // ── pt-angle-sum-consequences ──
  {
    // sin(B+C)=+sinA but cos(B+C)=-cosA
    atomKey: "pt-angle-sum-consequences:trap:0",
    stem: "In \\(\\triangle ABC\\), what does \\(\\cos(B+C)\\) equal?",
    correct: f("-\\cos A"),
    distractors: [f("\\cos A"), f("\\sin A"), f("-\\sin A")],
    theme: "trap",
  },

  // ── pt-tan-cot-product-identity ──
  {
    // sum = product, only in a triangle
    atomKey: "pt-tan-cot-product-identity:trap:0",
    stem: "In \\(\\triangle ABC\\), \\(\\tan A\\,\\tan B\\,\\tan C = 8\\). What is \\(\\tan A + \\tan B + \\tan C\\)?",
    correct: f("8"),
    distractors: [f("0"), f("1"), f("\\dfrac{1}{8}")],
    theme: "trap",
  },

  // ── pt-incircle-circumcircle ──
  {
    // r = Δ/s vs R = abc/4Δ swap
    atomKey: "pt-incircle-circumcircle:trap:0",
    stem: "A right triangle has legs \\(6,\\ 8\\) and hypotenuse \\(10\\). What is its CIRCUMradius \\(R\\)?",
    correct: f("5"),
    distractors: [f("2"), f("\\dfrac{24}{12}"), f("1")],
    theme: "trap",
  },
  {
    // central angle is twice the inscribed angle
    atomKey: "pt-incircle-circumcircle:trap:1",
    stem: "An arc subtends \\(40^\\circ\\) at a point on the circle. What angle does it subtend at the centre?",
    correct: f("80^\\circ"),
    distractors: [f("20^\\circ"), f("40^\\circ"), f("160^\\circ")],
    theme: "trap",
  },
];
