/**
 * NDA Maths · Height & Distance · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece (pieces are \qquad/\quad-joined, so the
 * key index = position in that concept's bundle, 0-based). Distractors are
 * full-equation permutations — wrong versions of the SAME relation, same shape
 * (no length/format tell). Every concrete `stem` here overrides the harvested
 * placeholder ("Which is the formula for <name>?") — the 5 `auto` pieces
 * (foundation:0, angle-subtended:0, 3d:0, shadow-find:0, chord:0) MUST be
 * verified with a concrete stem or the assembler hard-excludes them.
 *
 * H&D is application-heavy but each sub-model carries its own genuine relation,
 * so the formula theme is RICH (24 genuine formulas across 16 concepts) — NOT
 * parked. Skipped as non-formulas: hd-arc-length:formula:1 (the bare
 * annotation "(θ in radians)", not a recallable equation).
 *   npm run quiz:verify nda-maths__height-distance-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── hd-foundation-right-triangle: tan = h/d (AUTO → concrete stem) ──
  {
    atomKey: "hd-foundation-right-triangle:formula:0",
    stem: "For a vertical object of height \\(h\\) seen at angle of elevation \\(\\theta\\) from horizontal distance \\(d\\), which relation holds?",
    distractors: [f("\\tan\\theta = \\dfrac{d}{h}"), f("\\sin\\theta = \\dfrac{h}{d}"), f("\\cos\\theta = \\dfrac{h}{d}")],
    theme: "formula",
  },

  // ── hd-single-observation: tan=h/d | sin=h/ℓ | cos=d/ℓ ──
  {
    atomKey: "hd-single-observation:formula:0",
    stem: "In a right triangle of sight with vertical height \\(h\\), horizontal base \\(d\\) and elevation \\(\\theta\\), what is \\(\\tan\\theta\\)?",
    distractors: [f("\\tan\\theta = \\dfrac{d}{h}"), f("\\tan\\theta = \\dfrac{h}{\\ell}"), f("\\tan\\theta = \\dfrac{\\ell}{h}")],
    theme: "formula",
  },
  {
    atomKey: "hd-single-observation:formula:1",
    stem: "With slant (line-of-sight) length \\(\\ell\\), height \\(h\\) and elevation \\(\\theta\\), what is \\(\\sin\\theta\\)?",
    distractors: [f("\\sin\\theta = \\dfrac{\\ell}{h}"), f("\\sin\\theta = \\dfrac{h}{d}"), f("\\sin\\theta = \\dfrac{d}{\\ell}")],
    theme: "formula",
  },
  {
    atomKey: "hd-single-observation:formula:2",
    stem: "With slant length \\(\\ell\\), horizontal base \\(d\\) and elevation \\(\\theta\\), what is \\(\\cos\\theta\\)?",
    distractors: [f("\\cos\\theta = \\dfrac{\\ell}{d}"), f("\\cos\\theta = \\dfrac{h}{\\ell}"), f("\\cos\\theta = \\dfrac{d}{h}")],
    theme: "formula",
  },

  // ── hd-slant-and-half-angles: h = ℓ sinθ | cos(A/2) ──
  {
    atomKey: "hd-slant-and-half-angles:formula:0",
    stem: "If \\(\\ell\\) is the slant distance to an object at elevation \\(\\theta\\), which gives its height \\(h\\)?",
    distractors: [f("h = \\ell\\cos\\theta"), f("h = \\ell\\tan\\theta"), f("h = \\dfrac{\\ell}{\\sin\\theta}")],
    theme: "formula",
  },
  {
    atomKey: "hd-slant-and-half-angles:formula:1",
    stem: "Which is the correct half-angle identity for \\(\\cos\\tfrac{A}{2}\\)?",
    distractors: [
      f("\\cos\\tfrac{A}{2} = \\sqrt{\\tfrac{1-\\cos A}{2}}"),
      f("\\cos\\tfrac{A}{2} = \\tfrac{1+\\cos A}{2}"),
      f("\\cos\\tfrac{A}{2} = \\sqrt{\\tfrac{1+\\sin A}{2}}"),
    ],
    theme: "formula",
  },

  // ── hd-two-level-observations: tanβ=H/d | tanα=(H-p)/d ──
  {
    atomKey: "hd-two-level-observations:formula:0",
    stem: "A target of height \\(H\\) is seen from the GROUND (elevation \\(\\beta\\)) at horizontal distance \\(d\\). Which relation holds?",
    distractors: [f("\\tan\\beta = \\dfrac{d}{H}"), f("\\tan\\beta = \\dfrac{H-p}{d}"), f("\\sin\\beta = \\dfrac{H}{d}")],
    theme: "formula",
  },
  {
    atomKey: "hd-two-level-observations:formula:1",
    stem: "The same target (height \\(H\\)) is seen from a point at height \\(p\\), same distance \\(d\\), elevation \\(\\alpha\\). Which relation holds?",
    distractors: [f("\\tan\\alpha = \\dfrac{H}{d}"), f("\\tan\\alpha = \\dfrac{H+p}{d}"), f("\\tan\\alpha = \\dfrac{d}{H-p}")],
    theme: "formula",
  },

  // ── hd-tower-and-flagstaff: tanθ=T/d | tanφ=(T+f)/d ──
  {
    atomKey: "hd-tower-and-flagstaff:formula:0",
    stem: "A tower of height \\(T\\) carries a flagstaff. Viewed from distance \\(d\\), which gives the elevation \\(\\theta\\) of the TOWER top (flagstaff bottom)?",
    distractors: [f("\\tan\\theta = \\dfrac{T+f}{d}"), f("\\tan\\theta = \\dfrac{d}{T}"), f("\\tan\\theta = \\dfrac{f}{d}")],
    theme: "formula",
  },
  {
    atomKey: "hd-tower-and-flagstaff:formula:1",
    stem: "For the same tower-and-flagstaff (tower \\(T\\), flagstaff \\(f\\), distance \\(d\\)), which gives the elevation \\(\\phi\\) of the FLAGSTAFF top?",
    distractors: [f("\\tan\\phi = \\dfrac{T}{d}"), f("\\tan\\phi = \\dfrac{T-f}{d}"), f("\\tan\\phi = \\dfrac{d}{T+f}")],
    theme: "formula",
  },

  // ── hd-angle-subtended-by-segment: quadratic-tangent (AUTO → concrete stem) ──
  {
    atomKey: "hd-angle-subtended-by-segment:formula:0",
    stem: "A segment between heights \\(h_1\\) (bottom) and \\(h_2\\) (top) subtends angle \\(\\alpha\\) at a ground point distance \\(x\\) away. Which is \\(\\tan\\alpha\\)?",
    distractors: [
      f("\\tan\\alpha = \\dfrac{(h_2-h_1)\\,x}{x^2 - h_1 h_2}"),
      f("\\tan\\alpha = \\dfrac{h_2-h_1}{x}"),
      f("\\tan\\alpha = \\dfrac{(h_2+h_1)\\,x}{x^2 + h_1 h_2}"),
    ],
    theme: "formula",
  },

  // ── hd-ladder-and-pythagoras: H = x tanθ | x²+(H-k)²=L² ──
  {
    atomKey: "hd-ladder-and-pythagoras:formula:0",
    stem: "From a ladder's foot, distance \\(x\\) from a flagstaff, its top (height \\(H\\)) is at elevation \\(\\theta\\). Which gives \\(H\\)?",
    distractors: [f("H = \\dfrac{x}{\\tan\\theta}"), f("H = x\\sin\\theta"), f("H = \\dfrac{\\tan\\theta}{x}")],
    theme: "formula",
  },
  {
    atomKey: "hd-ladder-and-pythagoras:formula:1",
    stem: "A ladder of length \\(L\\) has foot at distance \\(x\\) and reaches a point \\(k\\) below the top \\(H\\). Which Pythagoras relation holds?",
    distractors: [f("x^2 + H^2 = L^2"), f("x^2 + (H+k)^2 = L^2"), f("x + (H-k) = L")],
    theme: "formula",
  },

  // ── hd-collinear-points: d = h cotθ | gap = h(cotθᵢ − cotθⱼ) ──
  {
    atomKey: "hd-collinear-points:formula:0",
    stem: "A tower of height \\(h\\) is seen at elevation \\(\\theta\\) from a ground point. Which gives that point's horizontal distance \\(d\\) from the foot?",
    distractors: [f("d = h\\tan\\theta"), f("d = \\dfrac{\\cot\\theta}{h}"), f("d = \\dfrac{h}{\\sin\\theta}")],
    theme: "formula",
  },
  {
    atomKey: "hd-collinear-points:formula:1",
    stem: "For a tower of height \\(h\\) seen at elevations \\(\\theta_i,\\theta_j\\) from two collinear points, which gives the gap between them?",
    distractors: [
      f("\\text{gap} = h(\\tan\\theta_i - \\tan\\theta_j)"),
      f("\\text{gap} = h(\\cot\\theta_i + \\cot\\theta_j)"),
      f("\\text{gap} = \\dfrac{\\cot\\theta_i - \\cot\\theta_j}{h}"),
    ],
    theme: "formula",
  },

  // ── hd-3d-different-directions: z² = h²(cot²y − cot²x) (AUTO → concrete stem) ──
  {
    atomKey: "hd-3d-different-directions:formula:0",
    stem: "A tower of height \\(h\\) is seen at elevation \\(x\\) from \\(A\\) (due south of foot \\(O\\)) and \\(y\\) from \\(B\\) (due east of \\(A\\)), with \\(AB = z\\). Which relation holds?",
    distractors: [
      f("z^2 = h^2(\\cot^2 x - \\cot^2 y)"),
      f("z^2 = h^2(\\cot^2 x + \\cot^2 y)"),
      f("z^2 = h^2(\\tan^2 y - \\tan^2 x)"),
    ],
    theme: "formula",
  },

  // ── hd-cloud-and-reflection: tanα=(H-p)/d | tanβ=(H+p)/d ──
  {
    atomKey: "hd-cloud-and-reflection:formula:0",
    stem: "An observer at height \\(p\\) above a lake sees a cloud at height \\(H\\) above the lake, distance \\(d\\). Which gives the cloud's elevation \\(\\alpha\\)?",
    distractors: [f("\\tan\\alpha = \\dfrac{H+p}{d}"), f("\\tan\\alpha = \\dfrac{H}{d}"), f("\\tan\\alpha = \\dfrac{d}{H-p}")],
    theme: "formula",
  },
  {
    atomKey: "hd-cloud-and-reflection:formula:1",
    stem: "For the same cloud (height \\(H\\), observer at height \\(p\\), distance \\(d\\)), which gives the depression \\(\\beta\\) of its reflection in the lake?",
    distractors: [f("\\tan\\beta = \\dfrac{H-p}{d}"), f("\\tan\\beta = \\dfrac{H}{d}"), f("\\tan\\beta = \\dfrac{d}{H+p}")],
    theme: "formula",
  },

  // ── hd-object-subtends-angle: R = r/sin(α/2) | h = r sinβ/sin(α/2) ──
  {
    atomKey: "hd-object-subtends-angle:formula:0",
    stem: "A sphere of radius \\(r\\) subtends angle \\(\\alpha\\) at the eye. Which gives the distance \\(R\\) to its centre?",
    distractors: [
      f("R = \\dfrac{r}{\\sin\\alpha}"),
      f("R = r\\sin(\\alpha/2)"),
      f("R = \\dfrac{r}{\\cos(\\alpha/2)}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "hd-object-subtends-angle:formula:1",
    stem: "A sphere of radius \\(r\\) subtends \\(\\alpha\\) at the eye and its centre is at elevation \\(\\beta\\). Which gives the centre's height \\(h\\) above the eye?",
    distractors: [
      f("h = \\dfrac{r\\sin\\beta}{\\sin\\alpha}"),
      f("h = \\dfrac{r\\cos\\beta}{\\sin(\\alpha/2)}"),
      f("h = r\\sin\\beta\\,\\sin(\\alpha/2)"),
    ],
    theme: "formula",
  },

  // ── hd-shadows-and-sun: s = h cotθ | Δs = h(cotθ₂ − cotθ₁) ──
  {
    atomKey: "hd-shadows-and-sun:formula:0",
    stem: "A vertical object of height \\(h\\) with the sun at elevation \\(\\theta\\) casts a shadow of length \\(s\\). Which relation holds?",
    distractors: [f("s = h\\tan\\theta"), f("s = \\dfrac{\\cot\\theta}{h}"), f("s = \\dfrac{h}{\\sin\\theta}")],
    theme: "formula",
  },
  {
    atomKey: "hd-shadows-and-sun:formula:1",
    stem: "When the sun's elevation changes from \\(\\theta_1\\) to \\(\\theta_2\\), which gives the change in a height-\\(h\\) object's shadow length?",
    distractors: [
      f("\\Delta s = h(\\tan\\theta_2 - \\tan\\theta_1)"),
      f("\\Delta s = h(\\cot\\theta_1 - \\cot\\theta_2)"),
      f("\\Delta s = \\dfrac{\\cot\\theta_2 - \\cot\\theta_1}{h}"),
    ],
    theme: "formula",
  },

  // ── hd-shadow-find-angle: tanθ = h/(s₁+x) (AUTO → concrete stem) ──
  {
    atomKey: "hd-shadow-find-angle:formula:0",
    stem: "A height-\\(h\\) object's shadow grows by \\(x\\) from an original length \\(s_1\\). Which gives the new sun elevation \\(\\theta\\)?",
    distractors: [
      f("\\tan\\theta = \\dfrac{h}{x}"),
      f("\\tan\\theta = \\dfrac{h}{s_1 - x}"),
      f("\\tan\\theta = \\dfrac{s_1 + x}{h}"),
    ],
    theme: "formula",
  },

  // ── hd-leaning-tower: tanα = h/(p-δ) | tanβ = h/(q-δ) ──
  {
    atomKey: "hd-leaning-tower:formula:0",
    stem: "A leaning tower of vertical height \\(h\\) has its top shifted \\(\\delta\\) from the foot. From point \\(P\\) at distance \\(p\\) the top's elevation is \\(\\alpha\\). Which relation holds?",
    distractors: [f("\\tan\\alpha = \\dfrac{h}{p+\\delta}"), f("\\tan\\alpha = \\dfrac{h-\\delta}{p}"), f("\\tan\\alpha = \\dfrac{p-\\delta}{h}")],
    theme: "formula",
  },
  {
    atomKey: "hd-leaning-tower:formula:1",
    stem: "For the same leaning tower (height \\(h\\), lean \\(\\delta\\)), from point \\(Q\\) at distance \\(q\\) the top's elevation is \\(\\beta\\). Which relation holds?",
    distractors: [f("\\tan\\beta = \\dfrac{h}{q+\\delta}"), f("\\tan\\beta = \\dfrac{h+\\delta}{q}"), f("\\tan\\beta = \\dfrac{q-\\delta}{h}")],
    theme: "formula",
  },

  // ── hd-chord-length: chord = 2r sin(θ/2) (AUTO → concrete stem) ──
  {
    atomKey: "hd-chord-length:formula:0",
    stem: "A chord of a circle of radius \\(r\\) subtends a central angle \\(\\theta\\). Which gives the chord's length?",
    distractors: [
      f("\\text{chord} = 2r\\sin\\theta"),
      f("\\text{chord} = r\\sin\\tfrac{\\theta}{2}"),
      f("\\text{chord} = 2r\\cos\\tfrac{\\theta}{2}"),
    ],
    theme: "formula",
  },

  // ── hd-arc-length: arc = rθ (radians) ; piece 1 is the bare "(θ in radians)" annotation → SKIPPED ──
  {
    atomKey: "hd-arc-length:formula:0",
    stem: "For a circle of radius \\(r\\), which gives the length of an arc subtending central angle \\(\\theta\\) (in radians)?",
    distractors: [
      f("\\text{arc} = \\dfrac{r}{\\theta}"),
      f("\\text{arc} = 2r\\sin\\tfrac{\\theta}{2}"),
      f("\\text{arc} = \\dfrac{r\\theta}{2}"),
    ],
    theme: "formula",
  },
];
