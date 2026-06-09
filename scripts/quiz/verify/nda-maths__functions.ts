/**
 * NDA Maths · Functions · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__functions
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // funcs-composition
  e("funcs-composition:selfCheck:0", [f("(f\\circ f)(2)=4"), f("(f\\circ f)(2)=7"), f("(f\\circ f)(2)=16")]),

  // funcs-inverse
  e("funcs-inverse:selfCheck:0", [f("f^{-1}(x)=\\dfrac{x-5}{2}"), f("f^{-1}(x)=2x+5"), f("f^{-1}(x)=\\dfrac{5-x}{2}")]),

  // funcs-counting-functions
  e("funcs-counting-functions:practiceSet:0", [f("2^5=32"), f("5\\cdot2=10"), f("5\\cdot4=20")]),
  e("funcs-counting-functions:practiceSet:1", [f("4^2=16"), f("4!=24"), f("\\binom{4}{2}=6")]),
  e("funcs-counting-functions:practiceSet:2", [f("2^4=16"), f("2^4-1=15"), f("4^2-2=14")]),

  // funcs-mapping-terms
  e("funcs-mapping-terms:practiceSet:1", [f("[0,\\infty)"), f("(0,\\infty)"), f("(-\\infty,0]")]),
  e("funcs-mapping-terms:practiceSet:2", [f("7"), f("2"), f("6")]),
  e("funcs-mapping-terms:practiceSet:3", [f("16"), f("8"), f("\\pm4")]),

  // funcs-domain-range-from-graph
  e("funcs-domain-range-from-graph:practiceSet:0", [f("[1,3]"), f("(-1,3)"), f("[-3,1]")]),
  e("funcs-domain-range-from-graph:practiceSet:1", ["Included (closed interval)", "The maximum value", "Approached but the curve continues"]),
  e("funcs-domain-range-from-graph:practiceSet:3", [f("\\text{The }y\\text{-axis}"), "The origin", f("\\text{The line }y=x")]),

  // funcs-finding-domain
  e("funcs-finding-domain:selfCheck:0", [f("(-1,3)\\cup(3,\\infty)"), f("[-1,\\infty)"), f("(-\\infty,-1]\\cup(3,\\infty)")]),

  // funcs-finding-range
  e("funcs-finding-range:selfCheck:0", [f("(1,5)"), f("[2,5)"), f("[1,5]")]),

  // funcs-periodicity
  e("funcs-periodicity:selfCheck:0", [f("\\pi"), f("\\dfrac{2\\pi}{3}"), f("6\\pi")]),

  // funcs-standard-functions-graphs
  e("funcs-standard-functions-graphs:practiceSet:0", [f("(0,\\infty)"), f("[0,\\infty)"), f("(-\\infty,0)")]),
  e("funcs-standard-functions-graphs:practiceSet:1", [f("(-\\infty,\\infty)"), f("[0,\\infty)"), f("(1,\\infty)")]),
  e("funcs-standard-functions-graphs:practiceSet:2", [f("1"), f("-4"), f("4")]),
  e("funcs-standard-functions-graphs:practiceSet:3", [f("x=-1"), f("x=0"), f("y=1")]),

  // funcs-fe-multiplicative-additive
  e("funcs-fe-multiplicative-additive:selfCheck:0", [f("f\\!\\left(\\tfrac13\\right)=\\dfrac13"), f("f\\!\\left(\\tfrac13\\right)=\\dfrac{1}{81}"), f("f\\!\\left(\\tfrac13\\right)=3")]),

  // funcs-fe-substitution
  e("funcs-fe-substitution:selfCheck:0", [f("f(x)=x+\\dfrac{1}{3}"), f("f(x)=\\dfrac{x-1}{3}"), f("f(x)=x-1")]),

  // funcs-floor-graph
  e("funcs-floor-graph:practiceSet:0", [f("4"), f("3.99"), f("3.9")]),
  e("funcs-floor-graph:practiceSet:1", [f("0"), f("-0.5"), f("1")]),
  e("funcs-floor-graph:practiceSet:2", ["Yes — it is continuous everywhere", "Yes — continuous except at half-integers", "Only from the right"]),

  // funcs-fractional-part
  e("funcs-fractional-part:selfCheck:0", [f("0"), f("1"), f("-2")]),
];
