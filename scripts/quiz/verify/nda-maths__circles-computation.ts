/**
 * NDA Maths · Circles · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived.
 *
 * The chapter shipped with only 7 computation atoms (5 practiceSet + 2 selfCheck),
 * below the ≥12 floor — so 10 genuine practiceSet items were added to the notes
 * `_data` (concepts that had a worked example but no practice): circ-general-form
 * (+2), circ-axis-intercepts (+2), circ-perpendicular-from-centre (+2),
 * circ-touching-axes (+2), circ-two-circles (+2). Final total: 17.
 *
 * No notes errors found — all 7 pre-existing answers re-derived correct.
 * Distractors lean on the standard circle slips: centre sign (-g,-f) vs (g,f),
 * radius √(g²+f²−c) vs g²+f²−c, intercept gap vs single root, chord
 * 2√(r²−d²), touch-distance d=r₁±r₂, contact-point coordinate swap.
 *   npm run quiz:verify nda-maths__circles-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── circ-what-is-a-circle ──
  // Centre (0,0), r=5 → x²+y²=25
  e("circ-what-is-a-circle:practiceSet:0", [f("x^2+y^2=5"), f("x^2+y^2=10"), f("x^2+y^2=625")]),
  // radius of (x-2)²+(y+4)²=49 → r=7
  e("circ-what-is-a-circle:practiceSet:1", [f("r=49"), f("r=14"), f("r=\\sqrt{53}")]),
  // Centre (-1,2), diameter 6 → r=3 → (x+1)²+(y-2)²=9
  e("circ-what-is-a-circle:practiceSet:2", [
    f("(x-1)^2+(y+2)^2=9"),
    f("(x+1)^2+(y-2)^2=36"),
    f("(x+1)^2+(y-2)^2=6"),
  ]),

  // ── circ-general-form ──
  // radius of 4x²+4y²-8x+12y-3=0 → ÷4, r=2
  e("circ-general-form:selfCheck:0", [f("r=4"), f("r=\\sqrt{14}"), f("r=8")]),
  // centre of x²+y²+4x-6y-12=0 → (-2,3)
  e("circ-general-form:practiceSet:0", [f("(2,-3)"), f("(-4,6)"), f("(4,-6)")]),
  // radius of x²+y²-6x+8y=0 → r=5
  e("circ-general-form:practiceSet:1", [f("r=\\sqrt{5}"), f("r=25"), f("r=10")]),

  // ── circ-axis-intercepts ──
  // x-axis chord of x²+y²-4x-5=0 → roots 5,-1 → 6
  e("circ-axis-intercepts:practiceSet:0", [f("4"), f("5"), f("3")]),
  // y-axis chord of x²+y²-6y-7=0 → roots 7,-1 → 8
  e("circ-axis-intercepts:practiceSet:1", [f("6"), f("7"), f("4")]),

  // ── circ-perpendicular-from-centre ──
  // chord of x²+y²=25 at d=3 → 2√(25-9)=8
  e("circ-perpendicular-from-centre:practiceSet:0", [f("4"), f("10"), f("2\\sqrt{34}")]),
  // chord 24 in r=13 → d=√(169-144)=5
  e("circ-perpendicular-from-centre:practiceSet:1", [f("12"), f("\\sqrt{145}"), f("11")]),

  // ── circ-touching-axes ──
  // first-quadrant, touches both axes, r=4 → centre (4,4)
  e("circ-touching-axes:practiceSet:0", [f("(2,2)"), f("(8,8)"), f("(0,0)")]),
  // centre (3,5) touches x-axis → r=5
  e("circ-touching-axes:practiceSet:1", [f("3"), f("\\sqrt{34}"), f("8")]),

  // ── circ-two-circles ──
  // r 3,4 touch externally → d=7
  e("circ-two-circles:practiceSet:0", [f("1"), f("5"), f("12")]),
  // r 9,4 touch internally → d=5
  e("circ-two-circles:practiceSet:1", [f("13"), f("\\sqrt{65}"), f("36")]),

  // ── circ-build-from-diameter-endpoints ──
  // endpoints (0,0),(4,0) → x²+y²-4x=0
  e("circ-build-from-diameter-endpoints:practiceSet:0", [
    f("x^2+y^2-4y=0"),
    f("x^2+y^2+4x=0"),
    f("x^2+y^2=16"),
  ]),
  // centre of (x-1)(x-7)+(y-2)(y-2)=0 → midpoint of (1,2),(7,2) = (4,2)
  e("circ-build-from-diameter-endpoints:practiceSet:1", [f("(8,4)"), f("(3,0)"), f("(7,2)")]),

  // ── circ-centre-on-a-line ──
  // through (2,3),(4,5), centre on y=2 → (5,2)
  e("circ-centre-on-a-line:selfCheck:0", [f("(3,2)"), f("(2,7)"), f("(7,2)")]),
];
