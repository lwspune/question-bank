/**
 * NDA Maths · Lines (coordinate geometry) · per-FORMULA recall MCQs.
 * Each formula gets a specific stem + 3 TEMPTING PERMUTATION distractors — wrong
 * versions of the SAME formula, in the SAME full-equation format as the answer
 * (no length/format tell). Run:
 *   npm run quiz:verify nda-maths__lines-formulas
 *
 * Covers every straight-line formula the chapter teaches: slope + line forms,
 * intercept form, family/concurrency, the three distance formulas, section +
 * midpoint, angle between lines, parallel/perpendicular conditions, triangle
 * area, centroid + incentre, vertex-from-midpoint, and parallelogram fourth
 * vertex + area. (formula.latex was added 2026-06-10 so every taught formula
 * harvests as a recall atom — see CLAUDE.md Decisions log.)
 *
 * Atom index = position of each \qquad-split piece in the concept's formula.latex.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Slope and forms of a line ──
  { atomKey: "lines-slope-and-forms:formula:0", stem: "Which is the correct slope of the line through \\((x_1,y_1)\\) and \\((x_2,y_2)\\)?", distractors: [f("m=\\dfrac{x_2-x_1}{y_2-y_1}"), f("m=\\dfrac{y_2-y_1}{x_1-x_2}"), f("m=\\dfrac{x_2-x_1}{x_2+x_1}")], theme: "formula" },
  { atomKey: "lines-slope-and-forms:formula:1", stem: "What is the slope of the line \\(ax+by+c=0\\)?", distractors: [f("m_{ax+by+c=0}=\\dfrac{a}{b}"), f("m_{ax+by+c=0}=-\\dfrac{b}{a}"), f("m_{ax+by+c=0}=\\dfrac{b}{a}")], theme: "formula" },
  { atomKey: "lines-slope-and-forms:formula:2", stem: "Which is the point-slope form of a line?", distractors: [f("y-y_1=m(x+x_1)"), f("y+y_1=m(x-x_1)"), f("x-x_1=m(y-y_1)")], theme: "formula" },
  { atomKey: "lines-slope-and-forms:formula:3", stem: "Which is the slope-intercept form of a line?", distractors: [f("y=mx-c"), f("x=my+c"), f("y=cx+m")], theme: "formula" },

  // ── Intercept form ──
  { atomKey: "lines-intercept-form:formula:0", stem: "Which is the intercept form of a line (x-intercept \\(a\\), y-intercept \\(b\\))?", distractors: [f("\\dfrac{x}{b}+\\dfrac{y}{a}=1"), f("\\dfrac{x}{a}+\\dfrac{y}{b}=0"), f("ax+by=1")], theme: "formula" },
  { atomKey: "lines-intercept-form:formula:1", stem: "What is the x-intercept of \\(ax+by+c=0\\)?", distractors: [f("x\\text{-intercept}=-\\dfrac{c}{b}"), f("x\\text{-intercept}=\\dfrac{c}{a}"), f("x\\text{-intercept}=-\\dfrac{a}{c}")], theme: "formula" },
  { atomKey: "lines-intercept-form:formula:2", stem: "What is the y-intercept of \\(ax+by+c=0\\)?", distractors: [f("y\\text{-intercept}=-\\dfrac{c}{a}"), f("y\\text{-intercept}=\\dfrac{c}{b}"), f("y\\text{-intercept}=-\\dfrac{b}{c}")], theme: "formula" },

  // ── Family of lines and concurrency ──
  { atomKey: "lines-family-and-concurrency:formula:0", stem: "Which represents the family of lines through the intersection of \\(L_1=0\\) and \\(L_2=0\\)?", distractors: [f("L_1\\cdot\\lambda L_2=0"), f("L_1+\\lambda L_2=\\lambda"), f("\\lambda L_1+L_2=1")], theme: "formula" },
  { atomKey: "lines-family-and-concurrency:formula:1", stem: "Which is the condition for three lines \\(a_ix+b_iy+c_i=0\\) to be concurrent?", distractors: [f("\\begin{vmatrix}a_1&b_1&c_1\\\\a_2&b_2&c_2\\\\a_3&b_3&c_3\\end{vmatrix}=1"), f("\\begin{vmatrix}a_1&a_2&a_3\\\\b_1&b_2&b_3\\\\c_1&c_2&c_3\\end{vmatrix}\\neq 0"), f("\\begin{vmatrix}a_1&b_1&1\\\\a_2&b_2&1\\\\a_3&b_3&1\\end{vmatrix}=0")], theme: "formula" },

  // ── Distance formulas ──
  { atomKey: "lines-distance-formulas:formula:0", stem: "Which is the distance between points \\((x_1,y_1)\\) and \\((x_2,y_2)\\)?", distractors: [f("\\sqrt{(x_2-x_1)^2-(y_2-y_1)^2}"), f("(x_2-x_1)^2+(y_2-y_1)^2"), f("\\sqrt{(x_2+x_1)^2+(y_2+y_1)^2}")], theme: "formula" },
  { atomKey: "lines-distance-formulas:formula:1", stem: "Which is the distance from \\((x_0,y_0)\\) to the line \\(ax+by+c=0\\)?", distractors: [f("\\dfrac{|ax_0+by_0+c|}{a^2+b^2}"), f("\\dfrac{ax_0+by_0+c}{\\sqrt{a^2+b^2}}"), f("\\dfrac{|ax_0+by_0+c|}{\\sqrt{a+b}}")], theme: "formula" },
  { atomKey: "lines-distance-formulas:formula:2", stem: "Which is the distance between parallel lines \\(ax+by+c_1=0\\) and \\(ax+by+c_2=0\\)?", distractors: [f("\\dfrac{|c_1+c_2|}{\\sqrt{a^2+b^2}}"), f("\\dfrac{|c_1-c_2|}{a^2+b^2}"), f("\\dfrac{|c_1-c_2|}{\\sqrt{a^2-b^2}}")], theme: "formula" },

  // ── Section formula and midpoint ──
  { atomKey: "lines-section-formula:formula:0", stem: "Which is the point dividing \\((x_1,y_1)\\),\\((x_2,y_2)\\) internally in ratio \\(m:n\\)?", distractors: [f("\\left(\\dfrac{mx_1+nx_2}{m+n},\\dfrac{my_1+ny_2}{m+n}\\right)"), f("\\left(\\dfrac{mx_2+nx_1}{m-n},\\dfrac{my_2+ny_1}{m-n}\\right)"), f("\\left(\\dfrac{mx_2-nx_1}{m+n},\\dfrac{my_2-ny_1}{m+n}\\right)")], theme: "formula" },
  { atomKey: "lines-section-formula:formula:1", stem: "Which is the midpoint of \\((x_1,y_1)\\) and \\((x_2,y_2)\\)?", distractors: [f("\\left(\\dfrac{x_1-x_2}{2},\\dfrac{y_1-y_2}{2}\\right)"), f("\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1-y_2}{2}\\right)"), f("\\left(x_1+x_2,\\,y_1+y_2\\right)")], theme: "formula" },

  // ── Angle between two lines ──
  { atomKey: "lines-angle-between:formula:0", stem: "Which is the tangent of the angle between lines of slopes \\(m_1,m_2\\)?", distractors: [f("\\tan\\theta=\\left|\\dfrac{1+m_1 m_2}{m_1-m_2}\\right|"), f("\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1-m_1 m_2}\\right|"), f("\\tan\\theta=\\left|\\dfrac{m_1+m_2}{1+m_1 m_2}\\right|")], theme: "formula" },

  // ── Parallel / perpendicular ──
  { atomKey: "lines-parallel-perpendicular:formula:0", stem: "What is the slope condition for two lines to be parallel?", distractors: [f("\\text{Parallel: } m_1 m_2=1"), f("\\text{Parallel: } m_1 m_2=-1"), f("\\text{Parallel: } m_1=-m_2")], theme: "formula" },
  { atomKey: "lines-parallel-perpendicular:formula:1", stem: "What is the slope condition for two lines to be perpendicular?", distractors: [f("\\text{Perpendicular: } m_1 m_2=1"), f("\\text{Perpendicular: } m_1=m_2"), f("\\text{Perpendicular: } m_1+m_2=0")], theme: "formula" },
  { atomKey: "lines-parallel-perpendicular:formula:2", stem: "In coefficient form, when are \\(a_1x+b_1y+c_1=0\\) and \\(a_2x+b_2y+c_2=0\\) perpendicular?", distractors: [f("a_1b_2+a_2b_1=0"), f("a_1a_2-b_1b_2=0"), f("a_1a_2+b_1b_2=1")], theme: "formula" },

  // ── Area of a triangle ──
  { atomKey: "lines-area-of-triangle:formula:0", stem: "Which is the area of a triangle with vertices \\((x_1,y_1),(x_2,y_2),(x_3,y_3)\\)?", distractors: [f("\\text{Area}=\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|"), f("\\text{Area}=\\dfrac12\\left|x_1(y_2+y_3)+x_2(y_3+y_1)+x_3(y_1+y_2)\\right|"), f("\\text{Area}=\\dfrac12\\left|x_1(x_2-x_3)+y_1(y_2-y_3)\\right|")], theme: "formula" },

  // ── Centroid and incentre ──
  { atomKey: "lines-triangle-centres:formula:0", stem: "Which is the centroid of a triangle with vertices \\((x_1,y_1),(x_2,y_2),(x_3,y_3)\\)?", distractors: [f("G=\\left(\\dfrac{x_1+x_2+x_3}{2},\\dfrac{y_1+y_2+y_3}{2}\\right)"), f("G=\\left(\\dfrac{x_1 x_2 x_3}{3},\\dfrac{y_1 y_2 y_3}{3}\\right)"), f("G=\\left(\\dfrac{x_1-x_2-x_3}{3},\\dfrac{y_1-y_2-y_3}{3}\\right)")], theme: "formula" },
  { atomKey: "lines-triangle-centres:formula:1", stem: "Which is the incentre of a triangle (sides \\(a,b,c\\) opposite vertices \\(A,B,C\\))?", distractors: [f("I=\\dfrac{A+B+C}{a+b+c}"), f("I=\\dfrac{a\\,A+b\\,B+c\\,C}{3}"), f("I=\\dfrac{b\\,A+c\\,B+a\\,C}{a+b+c}")], theme: "formula" },

  // ── Vertex from a midpoint ──
  { atomKey: "lines-triangle-construction:formula:0", stem: "If \\(M\\) is the midpoint of \\(BC\\), which relation holds?", distractors: [f("B+C=M"), f("B-C=2M"), f("B+C=\\dfrac{M}{2}")], theme: "formula" },
  { atomKey: "lines-triangle-construction:formula:1", stem: "Given the midpoint \\(M\\) of \\(BC\\) and vertex \\(B\\), what is \\(C\\)?", distractors: [f("C=M-B"), f("C=2B-M"), f("C=2M+B")], theme: "formula" },

  // ── Parallelogram ──
  { atomKey: "lines-quadrilaterals:formula:0", stem: "For parallelogram \\(ABCD\\), which diagonal-midpoint relation holds?", distractors: [f("A+B=C+D"), f("A+D=B+C"), f("A+B+C+D=0")], theme: "formula" },
  { atomKey: "lines-quadrilaterals:formula:1", stem: "For parallelogram \\(ABCD\\), what is the fourth vertex \\(D\\)?", distractors: [f("D=A+B-C"), f("D=B+C-A"), f("D=A-C+B")], theme: "formula" },
  { atomKey: "lines-quadrilaterals:formula:2", stem: "Which is the area of a parallelogram with side vectors \\((x_1,y_1)\\) and \\((x_2,y_2)\\)?", distractors: [f("\\text{Area}=|x_1y_2+x_2y_1|"), f("\\text{Area}=|x_1x_2-y_1y_2|"), f("\\text{Area}=\\dfrac12|x_1y_2-x_2y_1|")], theme: "formula" },
];
