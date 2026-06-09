/**
 * NDA Maths · Lines · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Formula-recall is in …-formulas.ts.
 *   npm run quiz:verify nda-maths__lines
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // lines-angle-between
  e("lines-angle-between:practiceSet:0", [
    f("\\tan\\theta=\\left|\\dfrac{m_1+m_2}{1-m_1m_2}\\right|"),
    f("\\tan\\theta=\\left|\\dfrac{m_2-m_1}{m_1m_2}\\right|"),
    f("\\tan\\theta=\\dfrac{m_1-m_2}{1+m_1m_2}"),
  ]),
  e("lines-angle-between:practiceSet:2", ["Parallel (0°)", "Coincident", "Angle of 45°"]),
  e("lines-angle-between:practiceSet:3", ["It is the complement", "It is equal", "It is half"]),
  e("lines-angle-between:selfCheck:0", [f("60°"), f("30°"), f("150°")]),

  // lines-parallel-perpendicular
  e("lines-parallel-perpendicular:practiceSet:0", [f("m_1m_2=-1"), f("m_1m_2=1"), f("m_1+m_2=0")]),
  e("lines-parallel-perpendicular:practiceSet:1", [f("m_1=m_2"), f("m_1m_2=1"), f("m_1+m_2=0")]),
  e("lines-parallel-perpendicular:practiceSet:2", [f("a_1b_2-a_2b_1=0"), f("a_1a_2-b_1b_2=0"), f("a_1b_2+a_2b_1=0")]),
  e("lines-parallel-perpendicular:practiceSet:3", ["No", "They are parallel", "They are coincident"]),
  e("lines-parallel-perpendicular:selfCheck:0", [
    f("aa'+bb'=0"),
    f("aa'=bb'"),
    f("ab'+a'b=0"),
  ]),

  // lines-distance-formulas
  e("lines-distance-formulas:practiceSet:0", [
    f("\\dfrac{ax_0+by_0+c}{\\sqrt{a^2+b^2}}"),
    f("\\dfrac{|ax_0+by_0+c|}{a^2+b^2}"),
    f("\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2-b^2}}"),
  ]),
  e("lines-distance-formulas:practiceSet:1", [
    f("\\dfrac{|c_1+c_2|}{\\sqrt{a^2+b^2}}"),
    f("\\dfrac{|c_1-c_2|}{a^2+b^2}"),
    f("\\dfrac{|c_1-c_2|}{\\sqrt{a^2-b^2}}"),
  ]),
  e("lines-distance-formulas:practiceSet:2", [f("1"), f("\\tfrac{11}{5}"), f("5")]),
  e("lines-distance-formulas:practiceSet:3", [
    "The constant terms are equal",
    "The lines pass through the origin",
    "The slopes are negative reciprocals",
  ]),
  e("lines-distance-formulas:selfCheck:0", [f("5"), f("\\tfrac53"), f("\\tfrac{13}{5}")]),

  // lines-locus
  e("lines-locus:practiceSet:3", [f("PA=2\\,PB"), f("PA^2+PB^2=0"), f("PA\\cdot PB=0")]),
  e("lines-locus:selfCheck:0", [f("4x+6y+5a=0"), f("4x-6y-5a=0"), f("2x-3y+5a=0")]),

  // lines-section-formula
  e("lines-section-formula:practiceSet:0", [
    f("\\dfrac{mx_1+nx_2}{m+n}"),
    f("\\dfrac{mx_2-nx_1}{m-n}"),
    f("\\dfrac{mx_2+nx_1}{m-n}"),
  ]),
  e("lines-section-formula:practiceSet:1", [f("2:1"), f("1:2"), f("1:0")]),
  e("lines-section-formula:practiceSet:2", [f("m:n"), f("-m:n"), f("n:-m")]),
  e("lines-section-formula:practiceSet:3", [f("1"), "Infinite", "Undefined"]),
  e("lines-section-formula:selfCheck:0", [f("4:1"), f("1:2"), f("2:3")]),

  // lines-family-and-concurrency
  e("lines-family-and-concurrency:practiceSet:0", [f("L_1\\cdot L_2=0"), f("L_1-\\lambda L_2=1"), f("\\lambda L_1+L_2=1")]),
  e("lines-family-and-concurrency:practiceSet:2", ["Negative reciprocals", "Reciprocals", "Opposite in sign"]),
  e("lines-family-and-concurrency:selfCheck:0", [f("k=4"), f("k=3"), f("k=-2")]),

  // lines-image-reflection
  e("lines-image-reflection:practiceSet:0", ["Median", "Angle bisector", "Tangent"]),
  e("lines-image-reflection:practiceSet:1", [f("(-a,-b)"), f("(-b,-a)"), f("(a,-b)")]),
  e("lines-image-reflection:practiceSet:2", [f("(-a,b)"), f("(b,a)"), f("(-a,-b)")]),
  e("lines-image-reflection:practiceSet:3", ["Centroid", "Reflection", "Endpoint"]),
  e("lines-image-reflection:selfCheck:0", [f("y=\\tfrac{x}{2}"), f("y=-2x"), f("y=-\\tfrac{x}{2}")]),

  // lines-intercept-form
  e("lines-intercept-form:practiceSet:0", [
    f("\\tfrac{x}{a}-\\tfrac{y}{b}=1"),
    f("ax+by=1"),
    f("\\tfrac{x}{b}+\\tfrac{y}{a}=1"),
  ]),
  e("lines-intercept-form:practiceSet:1", [f("-c/b"), f("c/a"), f("-a/c")]),
  e("lines-intercept-form:practiceSet:2", [f("h,\\ k"), f("\\tfrac{h}{2},\\ \\tfrac{k}{2}"), f("h+k")]),
  e("lines-intercept-form:practiceSet:3", [f("2"), f("8"), f("3")]),
  e("lines-intercept-form:selfCheck:0", [f("3x+4y=24"), f("4x+3y=12"), f("8x+6y=24")]),

  // lines-slope-and-forms
  e("lines-slope-and-forms:practiceSet:0", [f("-b/a"), f("a/b"), f("b/a")]),
  e("lines-slope-and-forms:practiceSet:1", [f("\\cot\\theta"), f("\\sin\\theta"), f("\\sec\\theta")]),
  e("lines-slope-and-forms:practiceSet:2", [
    f("y-y_1=m(x+x_1)"),
    f("y+y_1=m(x-x_1)"),
    f("x-x_1=m(y-y_1)"),
  ]),
  e("lines-slope-and-forms:practiceSet:3", [
    f("x\\sin\\theta+y\\cos\\theta=p"),
    f("x\\cos\\theta-y\\sin\\theta=p"),
    f("x\\cos\\theta+y\\sin\\theta=0"),
  ]),
  e("lines-slope-and-forms:selfCheck:0", [f("-\\tfrac34"), f("\\tfrac43"), f("-\\tfrac43")]),

  // lines-area-of-triangle
  e("lines-area-of-triangle:practiceSet:1", [f("1"), "Undefined", "Infinite"]),
  e("lines-area-of-triangle:practiceSet:2", [f("12"), f("7"), f("3")]),
  e("lines-area-of-triangle:practiceSet:3", ["Perpendicularity", "Concurrency", "Parallelism"]),
  e("lines-area-of-triangle:selfCheck:0", ["No — they form a triangle", "Cannot be determined", "Only two of them are"]),

  // lines-quadrilaterals
  e("lines-quadrilaterals:practiceSet:0", [f("D=A+B-C"), f("D=B+C-A"), f("D=A-B-C")]),
  e("lines-quadrilaterals:practiceSet:2", [
    f("\\tfrac12|x_1y_2-x_2y_1|"),
    f("x_1y_2+x_2y_1"),
    f("|x_1x_2-y_1y_2|"),
  ]),
  e("lines-quadrilaterals:practiceSet:3", ["Endpoint", "Trisection point", "Centroid"]),
  e("lines-quadrilaterals:selfCheck:0", [f("14"), f("10"), f("1")]),

  // lines-triangle-centres
  e("lines-triangle-centres:practiceSet:2", ["The right-angle vertex", "The centroid", "The orthocentre"]),
  e("lines-triangle-centres:practiceSet:3", ["A vertex", "The midpoint of a side", "A point outside the triangle"]),

  // lines-triangle-construction
  e("lines-triangle-construction:practiceSet:0", [f("M"), f("\\tfrac{M}{2}"), f("M-B")]),
  e("lines-triangle-construction:practiceSet:2", [f("B=2A-M"), f("B=M-A"), f("B=\\tfrac{M+A}{2}")]),
  e("lines-triangle-construction:practiceSet:3", ["Equal", "Reciprocal", "Opposite in sign only"]),
  e("lines-triangle-construction:selfCheck:0", [f("(3,1)"), f("(5,-1)"), f("(9,1)")]),
];
