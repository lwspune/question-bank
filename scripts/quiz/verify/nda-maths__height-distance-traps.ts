/**
 * NDA Maths · Height & Distance · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (17 trap seeds, all
 * concept:trap:0). Each stem is a concrete problem whose tempting wrong answer
 * IS the warned mistake (always the first distractor).
 *   npm run quiz:verify nda-maths__height-distance-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // 1 — Depression equals the elevation back
  {
    atomKey: "hd-foundation-right-triangle:trap:0",
    stem: "From a lighthouse top a boat is seen at an angle of DEPRESSION of \\(40^\\circ\\). What is the angle of ELEVATION of the lighthouse top from the boat?",
    correct: f("40^\\circ"),
    distractors: [f("50^\\circ"), f("80^\\circ"), f("20^\\circ")],
    theme: "trap",
  },
  // 2 — Tangent, not sine, links height to ground distance
  {
    atomKey: "hd-foundation-right-triangle:trap:1",
    stem: "A tower of height \\(h\\) stands at HORIZONTAL distance \\(d\\) from an observer who sees its top at elevation \\(\\theta\\). Which ratio is correct?",
    correct: f("\\tan\\theta = \\dfrac{h}{d}"),
    distractors: [f("\\sin\\theta = \\dfrac{h}{d}"), f("\\cos\\theta = \\dfrac{h}{d}"), f("\\tan\\theta = \\dfrac{d}{h}")],
    theme: "trap",
  },
  // 3 — Keep tan⁻¹ as a ratio
  {
    atomKey: "hd-single-observation:trap:0",
    stem: "From a \\(60\\) m tower the depression of a point is \\(\\tan^{-1}\\!\\left(\\tfrac{5}{12}\\right)\\). What is its horizontal distance from the foot?",
    correct: f("144\\text{ m}"),
    distractors: [f("25\\text{ m}"), f("60\\text{ m}"), f("156\\text{ m}")],
    theme: "trap",
  },
  // 4 — Slant uses sine, ground uses tangent
  {
    atomKey: "hd-slant-and-half-angles:trap:0",
    stem: "An aircraft is \\(10\\) km away ALONG the line of sight at an elevation of \\(30^\\circ\\). How high is it?",
    correct: f("5\\text{ km}"),
    distractors: [f("\\dfrac{10}{\\sqrt{3}}\\text{ km}"), f("10\\sqrt{3}\\text{ km}"), f("5\\sqrt{3}\\text{ km}")],
    theme: "trap",
  },
  // 5 — Same base, different opposite side
  {
    atomKey: "hd-two-level-observations:trap:0",
    stem: "A tower top is seen at \\(45^\\circ\\) from the foot of a \\(20\\) m pole and at angle \\(\\alpha\\) from the pole's top, both at distance \\(d = H\\). If the tower height is \\(H\\), which is the correct \\(\\tan\\alpha\\)?",
    correct: f("\\tan\\alpha = \\dfrac{H-20}{H}"),
    distractors: [f("\\tan\\alpha = \\dfrac{H}{H}"), f("\\tan\\alpha = \\dfrac{H+20}{H}"), f("\\tan\\alpha = \\dfrac{20}{H}")],
    theme: "trap",
  },
  // 6 — The lower angle goes with the lower height
  {
    atomKey: "hd-tower-and-flagstaff:trap:0",
    stem: "A tower (height \\(T\\)) carries a flagstaff (height \\(f\\)), seen from distance \\(d\\). Which angle pairs with the FLAGSTAFF top?",
    correct: f("\\tan\\phi = \\dfrac{T+f}{d}\\text{ (the larger angle)}"),
    distractors: [
      f("\\tan\\theta = \\dfrac{T}{d}\\text{ (the smaller angle)}"),
      f("\\tan\\theta = \\dfrac{f}{d}"),
      f("\\tan\\phi = \\dfrac{T-f}{d}"),
    ],
    theme: "trap",
  },
  // 7 — A subtended angle is a difference, not a single elevation
  {
    atomKey: "hd-angle-subtended-by-segment:trap:0",
    stem: "A segment from height \\(h_1\\) to \\(h_2\\) subtends angle \\(\\alpha\\) at a ground point distance \\(x\\) away. Which correctly gives \\(\\tan\\alpha\\)?",
    correct: f("\\tan\\alpha = \\dfrac{(h_2-h_1)x}{x^2+h_1h_2}"),
    distractors: [
      f("\\tan\\alpha = \\dfrac{h_2}{x}"),
      f("\\tan\\alpha = \\dfrac{h_2-h_1}{x}"),
      f("\\tan\\alpha = \\dfrac{h_2+h_1}{x}"),
    ],
    theme: "trap",
  },
  // 8 — The ladder top is not the flagstaff top
  {
    atomKey: "hd-ladder-and-pythagoras:trap:0",
    stem: "A \\(10\\) m ladder with foot at distance \\(x\\) reaches a point \\(2\\) m BELOW a flagstaff top of height \\(H\\). Which Pythagoras equation is right?",
    correct: f("x^2+(H-2)^2 = 100"),
    distractors: [f("x^2+H^2 = 100"), f("x^2+(H+2)^2 = 100"), f("x^2+(H-2)^2 = 10")],
    theme: "trap",
  },
  // 9 — Bigger angle ⇒ nearer point ⇒ smaller cotangent
  {
    atomKey: "hd-collinear-points:trap:0",
    stem: "A tower of height \\(h\\) is seen at \\(60^\\circ\\) from \\(R\\) and \\(30^\\circ\\) from \\(Q\\) on the same line. Which point is NEARER the foot?",
    correct: "\\(R\\) (steeper angle \\(\\Rightarrow\\) smaller distance \\(h\\cot 60^\\circ\\))",
    distractors: [
      "\\(Q\\) (the larger cotangent means nearer)",
      "Both are equidistant",
      "Cannot tell without \\(h\\)",
    ],
    theme: "trap",
  },
  // 10 — The right angle sits at the middle observer
  {
    atomKey: "hd-3d-different-directions:trap:0",
    stem: "Observer \\(A\\) is due SOUTH of tower foot \\(O\\); observer \\(B\\) is due EAST of \\(A\\). In triangle \\(OAB\\), where is the right angle?",
    correct: "At \\(A\\), so \\(OB\\) is the hypotenuse",
    distractors: [
      "At \\(O\\), so \\(AB\\) is the hypotenuse",
      "At \\(B\\), so \\(OA\\) is the hypotenuse",
      "There is no right angle",
    ],
    theme: "trap",
  },
  // 11 — Image depth is H + observer height, not H
  {
    atomKey: "hd-cloud-and-reflection:trap:0",
    stem: "An observer \\(p\\) metres above a lake watches a cloud \\(H\\) above the lake. How far BELOW the observer's eye is the cloud's reflection?",
    correct: f("H+p"),
    distractors: [f("H"), f("H-p"), f("p")],
    theme: "trap",
  },
  // 12 — Use half the subtended angle
  {
    atomKey: "hd-object-subtends-angle:trap:0",
    stem: "A balloon of radius \\(r\\) subtends \\(60^\\circ\\) at the eye. What is the distance \\(R\\) to its centre?",
    correct: f("2r"),
    distractors: [f("\\dfrac{r}{\\sin 60^\\circ}"), f("r"), f("\\dfrac{r}{2}")],
    theme: "trap",
  },
  // 13 — Lower sun, longer shadow
  {
    atomKey: "hd-shadows-and-sun:trap:0",
    stem: "A tower casts a shadow at sun elevations \\(60^\\circ\\) and \\(30^\\circ\\). At which elevation is the shadow LONGER?",
    correct: f("30^\\circ\\text{ (lower sun)}"),
    distractors: [f("60^\\circ\\text{ (higher sun)}"), "Both shadows are equal", "Depends on the tower height"],
    theme: "trap",
  },
  // 14 — The new shadow is old + increase, not just the increase
  {
    atomKey: "hd-shadow-find-angle:trap:0",
    stem: "A height-\\(h\\) tower's shadow was \\(s_1\\) and then grew by \\(x\\). What is its NEW shadow length to use in \\(\\tan\\theta = h/(\\text{shadow})\\)?",
    correct: f("s_1 + x"),
    distractors: [f("x"), f("s_1 - x"), f("s_1")],
    theme: "trap",
  },
  // 15 — A leaning tower has two unknowns
  {
    atomKey: "hd-leaning-tower:trap:0",
    stem: "To find the vertical height of a LEANING tower (top shifted \\(\\delta\\) off the foot), how many elevation readings are needed?",
    correct: "Two — height \\(h\\) and lean \\(\\delta\\) are both unknown",
    distractors: [
      "One — treat it like a vertical tower with \\(\\delta = 0\\)",
      "Three readings minimum",
      "None — the lean fixes the height",
    ],
    theme: "trap",
  },
  // 16 — Half the angle, not the whole angle
  {
    atomKey: "hd-chord-length:trap:0",
    stem: "A chord subtends a central angle of \\(60^\\circ\\) in a circle of radius \\(10\\). What is the chord length?",
    correct: f("10"),
    distractors: [f("10\\sqrt{3}"), f("20"), f("5")],
    theme: "trap",
  },
  // 17 — Angle must be in radians for r·θ
  {
    atomKey: "hd-arc-length:trap:0",
    stem: "An arc of a circle of radius \\(6\\) subtends \\(60^\\circ\\) at the centre. What is its length?",
    correct: f("2\\pi"),
    distractors: [f("360"), f("60\\pi"), f("\\pi")],
    theme: "trap",
  },
];
