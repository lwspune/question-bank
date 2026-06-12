/**
 * NDA Maths · Height & Distance · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived
 * from the notes _data — all 7 pre-existing answers verified correct, no notes
 * fixes needed. The chapter shipped with only 7 practiceSet/selfCheck atoms
 * (< 12 floor), so 7 genuine practiceSet items were ADDED to the notes
 * (tower-flagstaff ×2, collinear, cloud-reflection, object-subtends, shadow-
 * find-angle, chord) — those ride the new keys below. Total = 14.
 * Distractor genre is the H&D classic mistakes: tan vs cot, elevation vs
 * depression, √3 vs 1/√3, adding vs subtracting the observer height.
 *   npm run quiz:verify nda-maths__height-distance-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── hd-foundation-right-triangle (4 pre-existing) ──
  // tower 50 high, base 50 → tan=1 → 45°
  e("hd-foundation-right-triangle:practiceSet:0", [f("30^\\circ"), f("60^\\circ"), f("90^\\circ")]),
  // 20 m from foot, 60° → h = 20·tan60 = 20√3
  e("hd-foundation-right-triangle:practiceSet:1", [f("\\dfrac{20}{\\sqrt{3}}\\text{ m}"), f("20\\text{ m}"), f("40\\text{ m}")]),
  // recall: tan30=1/√3, tan45=1, tan60=√3
  e("hd-foundation-right-triangle:practiceSet:2", [
    "\\(\\tan 30^\\circ = \\sqrt{3},\\ \\tan 45^\\circ = 1,\\ \\tan 60^\\circ = \\tfrac{1}{\\sqrt{3}}\\).",
    "\\(\\tan 30^\\circ = \\tfrac{1}{2},\\ \\tan 45^\\circ = 1,\\ \\tan 60^\\circ = 2\\).",
    "\\(\\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}},\\ \\tan 45^\\circ = \\sqrt{3},\\ \\tan 60^\\circ = 1\\).",
  ]),
  // depression 30° → equal elevation 30°
  e("hd-foundation-right-triangle:practiceSet:3", [f("60^\\circ"), f("45^\\circ"), f("90^\\circ")]),

  // ── hd-single-observation (selfCheck) ──
  // 45 m tower, depression tan⁻¹(3/4) → d = 45·4/3 = 60 m
  e("hd-single-observation:selfCheck:0", [f("33.75\\text{ m}"), f("75\\text{ m}"), f("180\\text{ m}")]),

  // ── hd-two-level-observations (selfCheck) ──
  // hill height = 3h/2
  e("hd-two-level-observations:selfCheck:0", [f("\\dfrac{2h}{3}"), f("2h"), f("3h")]),

  // ── hd-tower-and-flagstaff (NEW ×2) ──
  // 7 m flagstaff, tower top 45° (T=d), flagstaff top 60° → d = 7/(√3-1)
  e("hd-tower-and-flagstaff:practiceSet:0", [
    f("\\dfrac{7}{\\sqrt{3}+1}\\text{ m}"),
    f("7(\\sqrt{3}-1)\\text{ m}"),
    f("\\dfrac{7}{\\sqrt{3}}\\text{ m}"),
  ]),
  // tower top 30°, flagstaff top 60° → f = 2T
  e("hd-tower-and-flagstaff:practiceSet:1", [f("3T"), f("\\dfrac{T}{2}"), f("T")]),

  // ── hd-collinear-points (NEW) ──
  // 30° from P, 60° from nearer Q → PQ = 2h/√3
  e("hd-collinear-points:practiceSet:0", [
    f("\\dfrac{h}{\\sqrt{3}}"),
    f("h\\sqrt{3}"),
    f("\\dfrac{4h}{\\sqrt{3}}"),
  ]),

  // ── hd-cloud-and-reflection (NEW) ──
  // cloud 30° elev, image 60° depr, observer h above lake → H = 2h
  e("hd-cloud-and-reflection:practiceSet:0", [f("4h"), f("3h"), f("\\dfrac{h}{2}")]),

  // ── hd-object-subtends-angle (NEW) ──
  // balloon radius r subtends 60° → R = 2r
  e("hd-object-subtends-angle:practiceSet:0", [f("r"), f("r\\sqrt{3}"), f("\\dfrac{r}{2}")]),

  // ── hd-shadow-find-angle (NEW) ──
  // pole 10√3, shadow 30 → tan = 1/√3 → 30°
  e("hd-shadow-find-angle:practiceSet:0", [f("60^\\circ"), f("45^\\circ"), f("90^\\circ")]),

  // ── hd-chord-length (NEW) ──
  // chord r=10, central angle 60° → 2·10·sin30 = 10
  e("hd-chord-length:practiceSet:0", [f("10\\sqrt{3}\\text{ cm}"), f("20\\text{ cm}"), f("5\\text{ cm}")]),
];
