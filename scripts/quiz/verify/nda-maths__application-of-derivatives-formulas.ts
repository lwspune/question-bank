/**
 * NDA Maths · Application of Derivatives · per-FORMULA recall MCQs.
 * Each genuine recallable formula gets a SPECIFIC stem + 3 TEMPTING PERMUTATION
 * distractors — wrong versions of the SAME formula in the SAME full-equation
 * format (no length/format tell). Run:
 *   npm run quiz:verify nda-maths__application-of-derivatives-formulas
 *
 * Atom index = position of each \qquad-split piece in the concept's formula.latex.
 * formula.latex enriched 2026-06-12: tangent/normal + related-rates/approximation
 * carry genuine recallable formulas. The monotonicity / extrema / optimisation
 * concepts were TRIAGED OUT — their content is a TEST/CRITERION/recipe (technique),
 * not a memorised equation, so their formula.latex stays empty (computation only).
 * The two pre-existing AM-GM formula atoms also get concrete stems here.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── aod-tangents-normals (3 pieces) ──
  {
    atomKey: "aod-tangents-normals:formula:0",
    stem: "Which is the slope of the TANGENT to \\(y=f(x)\\) at \\((x_1,y_1)\\)?",
    distractors: [
      f("m_{\\text{tangent}}=-\\left.\\frac{dy}{dx}\\right|_{(x_1,y_1)}"),
      f("m_{\\text{tangent}}=\\left.\\frac{dx}{dy}\\right|_{(x_1,y_1)}"),
      f("m_{\\text{tangent}}=-\\frac{1}{dy/dx}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aod-tangents-normals:formula:1",
    stem: "Which is the slope of the NORMAL to a curve where the tangent slope is \\(dy/dx\\)?",
    distractors: [
      f("m_{\\text{normal}}=\\frac{1}{dy/dx}"),
      f("m_{\\text{normal}}=\\frac{dy}{dx}"),
      f("m_{\\text{normal}}=-\\frac{dy}{dx}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aod-tangents-normals:formula:2",
    stem: "Which is the point-slope equation of the tangent line at \\((x_1,y_1)\\) with slope \\(m\\)?",
    distractors: [
      f("y-y_1=m(x+x_1)"),
      f("y+y_1=m(x-x_1)"),
      f("x-x_1=m(y-y_1)"),
    ],
    theme: "formula",
  },

  // ── aod-rate-approximation (3 pieces) ──
  {
    atomKey: "aod-rate-approximation:formula:0",
    stem: "Which is the chain relation for a time rate of change \\(\\dfrac{dy}{dt}\\)?",
    distractors: [
      f("\\frac{dy}{dt}=\\frac{dx}{dy}\\cdot\\frac{dx}{dt}"),
      f("\\frac{dy}{dt}=\\frac{dy}{dx}+\\frac{dx}{dt}"),
      f("\\frac{dy}{dt}=\\frac{dy}{dx}\\cdot\\frac{dt}{dx}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aod-rate-approximation:formula:1",
    stem: "Which is the small-change (differential) approximation for \\(\\Delta y\\)?",
    distractors: [
      f("\\Delta y\\approx f''(x)\\,\\Delta x"),
      f("\\Delta y\\approx \\frac{\\Delta x}{f'(x)}"),
      f("\\Delta y\\approx f(x)\\,\\Delta x"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aod-rate-approximation:formula:2",
    stem: "Which is the differential \\(dy\\) of \\(y=f(x)\\)?",
    distractors: [
      f("dy=f''(x)\\,dx"),
      f("dy=\\frac{dx}{f'(x)}"),
      f("dy=f(x)\\,dx"),
    ],
    theme: "formula",
  },

  // ── aod-am-gm-shortcut (pre-existing 2 pieces: inequality + equality condition) ──
  {
    atomKey: "aod-am-gm-shortcut:formula:0",
    stem: "Which is the AM-GM inequality for two positive numbers \\(u,v\\)?",
    distractors: [
      f("\\frac{u+v}{2}\\le\\sqrt{uv}"),
      f("\\frac{u+v}{2}\\ge\\frac{uv}{2}"),
      f("\\sqrt{\\frac{u+v}{2}}\\ge uv"),
    ],
    theme: "formula",
  },
  {
    atomKey: "aod-am-gm-shortcut:formula:1",
    stem: "In AM-GM \\(\\dfrac{u+v}{2}\\ge\\sqrt{uv}\\ (u,v>0)\\), equality holds precisely when:",
    distractors: [
      f("u=-v"),
      f("uv=1"),
      f("u+v=1"),
    ],
    theme: "formula",
  },
];
