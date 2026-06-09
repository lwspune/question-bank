/**
 * NDA Maths · Vectors · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Formula-recall is in …-formulas.ts.
 *   npm run quiz:verify nda-maths__vectors-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // angle-via-dot-product-formula
  e("angle-via-dot-product-formula:practiceSet:0", [f("0^\\circ"), f("45^\\circ"), f("180^\\circ")]),
  e("angle-via-dot-product-formula:practiceSet:1", [f("\\tfrac{1}{4}"), f("\\tfrac{1}{3}"), f("\\tfrac{2}{3}")]),
  e("angle-via-dot-product-formula:practiceSet:2", [f("90^\\circ"), f("180^\\circ"), f("45^\\circ")]),
  e("angle-via-dot-product-formula:practiceSet:3", ["acute", "right", "straight"]),
  e("angle-via-dot-product-formula:selfCheck:0", [f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{3}"), f("\\pi")]),
  // angles-and-vertices-from-position-vectors
  e("angles-and-vertices-from-position-vectors:practiceSet:0", [f("\\vec{c} - \\vec{a}"), f("\\vec{a} + \\vec{c}"), f("\\vec{a} - \\vec{b}")]),
  e("angles-and-vertices-from-position-vectors:practiceSet:1", [f("\\tfrac{\\vec{CA}\\times\\vec{CB}}{|\\vec{CA}||\\vec{CB}|}"), f("\\tfrac{\\vec{CA}\\cdot\\vec{CB}}{|\\vec{CA}|+|\\vec{CB}|}"), f("\\vec{CA}\\cdot\\vec{CB}")]),
  e("angles-and-vertices-from-position-vectors:practiceSet:2", [f("30^\\circ"), f("60^\\circ"), f("90^\\circ")]),
  e("angles-and-vertices-from-position-vectors:practiceSet:3", [f("0^\\circ"), f("90^\\circ"), f("360^\\circ")]),
  e("angles-and-vertices-from-position-vectors:selfCheck:0", [f("\\tfrac{\\pi}{6}"), f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{2}")]),
  // collinearity-and-vector-relations-in-figures
  e("collinearity-and-vector-relations-in-figures:practiceSet:0", ["No", "Cannot be determined", "Only if coplanar"]),
  e("collinearity-and-vector-relations-in-figures:practiceSet:1", ["Yes", "Cannot be determined", "Only if they are unit vectors"]),
  e("collinearity-and-vector-relations-in-figures:practiceSet:2", ["No", "Cannot be determined", "Only if \\(\\vec{a}\\perp\\vec{b}\\)"]),
  e("collinearity-and-vector-relations-in-figures:practiceSet:3", ["cross product", "dot product", "sum"]),
  e("collinearity-and-vector-relations-in-figures:selfCheck:0", [f("1 : 3"), f("4 : 1"), f("1 : 4")]),
  // component-form-and-basis
  e("component-form-and-basis:practiceSet:0", [f("\\hat{i} + 3\\hat{j} + 2\\hat{k}"), f("3\\hat{i} + \\hat{j} + 2\\hat{k}"), f("\\hat{i} + \\hat{j} + 4\\hat{k}")]),
  e("component-form-and-basis:practiceSet:1", [f("\\hat{i} - \\hat{j} + 2\\hat{k}"), f("2\\hat{i} - \\hat{j} + 4\\hat{k}"), f("2\\hat{i} - 2\\hat{j} + 2\\hat{k}")]),
  e("component-form-and-basis:practiceSet:2", [f("x = 3,\\ y = 5"), f("x = 5,\\ y = 5"), f("x = 3,\\ y = 3")]),
  e("component-form-and-basis:practiceSet:3", [f("2\\hat{i} - \\hat{j} + 2\\hat{k}"), f("4\\hat{i} + \\hat{j} + 2\\hat{k}"), f("2\\hat{i} + \\hat{j}")]),
  // cross-product-algebra-and-properties
  e("cross-product-algebra-and-properties:practiceSet:0", [f("|\\vec{a}|^2"), f("\\vec{a}"), f("2\\vec{a}")]),
  e("cross-product-algebra-and-properties:practiceSet:1", [f("\\vec{b}\\times\\vec{a}"), f("\\vec{0}"), f("\\vec{a}\\cdot\\vec{b}")]),
  e("cross-product-algebra-and-properties:practiceSet:2", ["perpendicular", "equal", "opposite"]),
  e("cross-product-algebra-and-properties:practiceSet:3", ["Yes", "Only for unit vectors", "Only in 2D"]),
  e("cross-product-algebra-and-properties:selfCheck:0", [f("3\\,\\vec{a}\\times\\vec{b}"), f("-\\vec{a}\\times\\vec{b}"), f("2\\,\\vec{a}\\times\\vec{b}")]),
  // cross-product-magnitude-area-and-lagrange
  e("cross-product-magnitude-area-and-lagrange:practiceSet:0", [f("\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|"), f("\\vec{a}\\cdot\\vec{b}"), f("|\\vec{a}||\\vec{b}|")]),
  e("cross-product-magnitude-area-and-lagrange:practiceSet:1", [f("6"), f("3\\sqrt{3}"), f("1.5")]),
  e("cross-product-magnitude-area-and-lagrange:practiceSet:2", [f("|\\vec{a}\\times\\vec{b}|"), f("2|\\vec{a}\\times\\vec{b}|"), f("\\tfrac{1}{2}\\vec{a}\\cdot\\vec{b}")]),
  e("cross-product-magnitude-area-and-lagrange:practiceSet:3", [f("|\\vec{a}|^2+|\\vec{b}|^2"), f("2|\\vec{a}||\\vec{b}|"), f("(\\vec{a}\\cdot\\vec{b})^2")]),
  e("cross-product-magnitude-area-and-lagrange:selfCheck:0", [f("15"), f("7.5\\sqrt{3}"), f("3.75")]),
  // direction-cosines
  e("direction-cosines:practiceSet:0", [f("\\tfrac{2}{3}"), f("\\tfrac{1}{\\sqrt{3}}"), f("\\tfrac{1}{9}")]),
  e("direction-cosines:practiceSet:1", [f("0"), f("2"), f("3")]),
  e("direction-cosines:practiceSet:2", [f("\\tfrac{1}{3}"), f("\\tfrac{4}{9}"), f("\\tfrac{\\sqrt{5}}{3}")]),
  e("direction-cosines:practiceSet:3", [f("1"), f("3"), f("0")]),
  e("direction-cosines:selfCheck:0", [f("\\tfrac{1}{2}"), f("\\tfrac{\\sqrt{3}}{2}"), f("\\tfrac{1}{3}")]),
  // distance-identities-in-quadrilaterals
  e("distance-identities-in-quadrilaterals:practiceSet:0", [f("|\\vec{a}|^2 + |\\vec{b}|^2"), f("4|\\vec{a}||\\vec{b}|"), f("2|\\vec{a}|^2|\\vec{b}|^2")]),
  e("distance-identities-in-quadrilaterals:practiceSet:1", [f("\\vec{PQ}\\times\\vec{RS} = 0"), f("\\vec{PQ}\\cdot\\vec{RS} = 1"), f("|\\vec{PQ}| = |\\vec{RS}|")]),
  e("distance-identities-in-quadrilaterals:practiceSet:2", [f("|\\vec{q}|^2 + 2\\,\\vec{p}\\cdot\\vec{q} + |\\vec{p}|^2"), f("|\\vec{q}|^2 - |\\vec{p}|^2"), f("|\\vec{q}|^2 - 2\\,\\vec{p}\\cdot\\vec{q} - |\\vec{p}|^2")]),
  e("distance-identities-in-quadrilaterals:practiceSet:3", [f("\\vec{PQ}\\cdot\\vec{RS} = 0"), f("1"), f("|\\vec{PQ}||\\vec{RS}|")]),
  e("distance-identities-in-quadrilaterals:selfCheck:0", [f("15"), f("60"), f("25")]),
  // dot-product-evaluation-and-work
  e("dot-product-evaluation-and-work:practiceSet:0", [f("7"), f("4"), f("6")]),
  e("dot-product-evaluation-and-work:practiceSet:1", [f("1"), f("-1"), f("\\hat{k}")]),
  e("dot-product-evaluation-and-work:practiceSet:2", [f("0"), f("-1"), f("\\hat{i}")]),
  e("dot-product-evaluation-and-work:practiceSet:3", [f("2"), f("-2"), f("4")]),
  e("dot-product-evaluation-and-work:selfCheck:0", [f("3"), f("1"), f("-1")]),
  // magnitude-and-distance
  e("magnitude-and-distance:practiceSet:0", [f("7"), f("25"), f("\\sqrt{7}")]),
  e("magnitude-and-distance:practiceSet:1", [f("5"), f("9"), f("\\sqrt{5}")]),
  e("magnitude-and-distance:practiceSet:2", [f("5"), f("\\sqrt{5}"), f("9")]),
  e("magnitude-and-distance:practiceSet:3", [f("14"), f("100"), f("\\sqrt{14}")]),
  e("magnitude-and-distance:selfCheck:0", [f("11"), f("49"), f("\\sqrt{11}")]),
  // moment-of-force
  e("moment-of-force:practiceSet:0", [f("\\vec{F}\\times\\overrightarrow{OP}"), f("\\overrightarrow{OP}\\cdot\\vec{F}"), f("\\overrightarrow{OP} + \\vec{F}")]),
  e("moment-of-force:practiceSet:1", [f("\\vec{F}\\times\\vec{r}"), f("\\vec{r}\\cdot\\vec{F}"), "Either order works"]),
  e("moment-of-force:practiceSet:2", [f("-\\hat{k}"), f("\\hat{i}"), f("\\vec{0}")]),
  e("moment-of-force:practiceSet:3", ["scalar", "either a scalar or a vector", "neither"]),
  e("moment-of-force:selfCheck:0", [f("-\\hat{i} + 2\\hat{j} - \\hat{k}"), f("\\hat{i} + 2\\hat{j} + 3\\hat{k}"), f("2\\hat{i} - \\hat{j} + \\hat{k}")]),
  // parallelogram-properties-and-diagonals
  e("parallelogram-properties-and-diagonals:practiceSet:0", [f("\\vec{CD}"), f("\\vec{BC}"), f("\\vec{AD}")]),
  e("parallelogram-properties-and-diagonals:practiceSet:1", [f("\\vec{AB} - \\vec{AD}"), f("\\vec{AD} - \\vec{AB}"), f("\\tfrac{1}{2}(\\vec{AB} + \\vec{AD})")]),
  e("parallelogram-properties-and-diagonals:practiceSet:2", [f("\\vec{a} + \\vec{b} - \\vec{c}"), f("\\vec{b} + \\vec{c} - \\vec{a}"), f("\\vec{a} + \\vec{b} + \\vec{c}")]),
  e("parallelogram-properties-and-diagonals:practiceSet:3", ["No", "Only in a rectangle", "Only in a square"]),
  e("parallelogram-properties-and-diagonals:selfCheck:0", [f("2\\hat{i} - \\hat{j}"), f("4\\hat{i} + \\hat{j}"), f("3\\hat{i} + 2\\hat{j}")]),
  // perpendicularity-test
  e("perpendicularity-test:practiceSet:0", ["No", "Only in 2D", "They are parallel"]),
  e("perpendicularity-test:practiceSet:1", [f("-2"), f("\\tfrac{1}{2}"), f("1")]),
  e("perpendicularity-test:practiceSet:2", [f("\\vec{a}\\times\\vec{b} = 0"), f("\\vec{a}\\cdot\\vec{b} = 1"), f("|\\vec{a}| = |\\vec{b}|")]),
  e("perpendicularity-test:practiceSet:3", ["No", "They are parallel", "Only if both are unit vectors"]),
  e("perpendicularity-test:selfCheck:0", [f("-\\tfrac{5}{2}"), f("5"), f("\\tfrac{2}{5}")]),
  // position-and-displacement-vectors
  e("position-and-displacement-vectors:practiceSet:0", [f("5\\hat{i} + 6\\hat{j}"), f("-3\\hat{i} - 4\\hat{j}"), f("3\\hat{i} + 5\\hat{j}")]),
  e("position-and-displacement-vectors:practiceSet:1", [f("7"), f("25"), f("\\sqrt{7}")]),
  e("position-and-displacement-vectors:practiceSet:2", [f("3\\hat{j}"), f("-3\\hat{i}"), f("4\\hat{i} + 3\\hat{j}")]),
  e("position-and-displacement-vectors:practiceSet:3", [f("-5\\hat{k}"), f("5\\hat{i}"), f("\\hat{k}")]),
  // scalar-multiplication
  e("scalar-multiplication:practiceSet:0", [f("6\\hat{i} - 3\\hat{j}"), f("5\\hat{i}"), f("2\\hat{i} - 9\\hat{j}")]),
  e("scalar-multiplication:practiceSet:1", [f("2\\hat{i} + \\hat{j}"), f("-2\\hat{i} + \\hat{j}"), f("-8\\hat{i} - 4\\hat{j}")]),
  e("scalar-multiplication:practiceSet:2", [f("5"), f("8"), f("45")]),
  e("scalar-multiplication:practiceSet:3", [f("-12"), f("6"), f("4")]),
  // scalar-projection
  e("scalar-projection:practiceSet:0", [f("\\tfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|}"), f("\\tfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}"), f("\\vec{a}\\cdot\\vec{b}")]),
  e("scalar-projection:practiceSet:1", [f("18"), f("\\tfrac{1}{2}"), f("6")]),
  e("scalar-projection:practiceSet:2", [f("1"), f("\\sqrt{5}"), f("3")]),
  e("scalar-projection:practiceSet:3", ["acute", "right", "zero"]),
  e("scalar-projection:selfCheck:0", [f("\\tfrac{5}{\\sqrt{3}}"), f("\\tfrac{5}{9}"), f("\\tfrac{3}{5}")]),
  // scalar-triple-product-and-coplanarity
  e("scalar-triple-product-and-coplanarity:practiceSet:0", ["collinear", "parallel", "perpendicular"]),
  e("scalar-triple-product-and-coplanarity:practiceSet:1", [f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"), f("\\tfrac{1}{6}|[\\vec{a}\\,\\vec{b}\\,\\vec{c}]|"), f("|\\vec{a}||\\vec{b}||\\vec{c}|")]),
  e("scalar-triple-product-and-coplanarity:practiceSet:2", [f("0"), f("-1"), f("3")]),
  e("scalar-triple-product-and-coplanarity:practiceSet:3", [f("\\vec{a}\\times(\\vec{b}\\cdot\\vec{c})"), f("(\\vec{a}\\cdot\\vec{b})\\times\\vec{c}"), f("\\vec{a}\\cdot\\vec{b}\\cdot\\vec{c}")]),
  e("scalar-triple-product-and-coplanarity:selfCheck:0", [f("1"), f("4"), f("0")]),
  // section-formula-internal-external
  e("section-formula-internal-external:practiceSet:0", [f("2\\hat{i}"), f("6\\hat{i}"), f("\\hat{i}")]),
  e("section-formula-internal-external:practiceSet:1", [f("4\\hat{i}"), f("3\\hat{i}"), f("\\hat{i}")]),
  e("section-formula-internal-external:practiceSet:2", [f("m - n"), f("mn"), f("m")]),
  e("section-formula-internal-external:practiceSet:3", [f("m + n"), f("mn"), f("n")]),
  e("section-formula-internal-external:selfCheck:0", [f("8\\hat{i} + 2\\hat{j}"), f("\\hat{i} + 2\\hat{j}"), f("4\\hat{i} - \\hat{j}")]),
  // solve-perpendicularity-constraint-system
  e("solve-perpendicularity-constraint-system:practiceSet:0", [f("|\\vec{a}|^2 + |\\vec{b}|^2"), f("|\\vec{a}|^2 - 2\\,\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2"), f("2(|\\vec{a}|^2 + |\\vec{b}|^2)")]),
  e("solve-perpendicularity-constraint-system:practiceSet:1", [f("2 + 2\\,\\vec{a}\\cdot\\vec{b}"), f("1 - 2\\,\\vec{a}\\cdot\\vec{b}"), f("2 - \\vec{a}\\cdot\\vec{b}")]),
  e("solve-perpendicularity-constraint-system:practiceSet:2", [f("1"), f("\\tfrac{3}{2}"), f("-\\tfrac{1}{2}")]),
  e("solve-perpendicularity-constraint-system:practiceSet:3", [f("0"), f("2"), f("|\\vec{a}|")]),
  e("solve-perpendicularity-constraint-system:selfCheck:0", [f("\\tfrac{\\pi}{6}"), f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{2}")]),
  // triangle-vector-loop-and-centroid
  e("triangle-vector-loop-and-centroid:practiceSet:0", [f("\\vec{AC}"), f("2\\vec{AB}"), f("\\vec{AB}")]),
  e("triangle-vector-loop-and-centroid:practiceSet:1", [f("(1.5, 1.5)"), f("(3, 3)"), f("(0, 0)")]),
  e("triangle-vector-loop-and-centroid:practiceSet:2", [f("\\tfrac{\\vec{a} + \\vec{b} + \\vec{c}}{2}"), f("\\vec{a} + \\vec{b} + \\vec{c}"), f("\\tfrac{\\vec{a} + \\vec{b} + \\vec{c}}{6}")]),
  e("triangle-vector-loop-and-centroid:practiceSet:3", [f("1:2"), f("1:1"), f("3:1")]),
  e("triangle-vector-loop-and-centroid:selfCheck:0", [f("(2, 1, 3)"), f("(3, 1, 2)"), f("(6, 3, 6)")]),
  // triple-product-cyclic-and-derived-identities
  e("triple-product-cyclic-and-derived-identities:practiceSet:0", ["No", "Only if coplanar", "Only for unit vectors"]),
  e("triple-product-cyclic-and-derived-identities:practiceSet:1", [f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"), f("0"), f("2[\\vec{a}\\,\\vec{b}\\,\\vec{c}]")]),
  e("triple-product-cyclic-and-derived-identities:practiceSet:2", [f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"), f("1"), f("|\\vec{a}|^2")]),
  e("triple-product-cyclic-and-derived-identities:practiceSet:3", [f("0"), f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"), f("-3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]")]),
  e("triple-product-cyclic-and-derived-identities:selfCheck:0", [f("0"), f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"), f("-[\\vec{a}\\,\\vec{b}\\,\\vec{c}]")]),
  // types-of-vectors
  e("types-of-vectors:practiceSet:0", [f("3\\hat{i} + 4\\hat{j}"), f("\\tfrac{1}{7}(3\\hat{i} + 4\\hat{j})"), f("\\tfrac{1}{5}(4\\hat{i} + 3\\hat{j})")]),
  e("types-of-vectors:practiceSet:1", ["No", "perpendicular", "Only if they are unit vectors"]),
  e("types-of-vectors:practiceSet:2", ["No", "Only in 3D", "It is the zero vector"]),
  e("types-of-vectors:practiceSet:3", [f("1"), "Undefined", f("\\sqrt{2}")]),
  // unit-vector-and-direction-construction
  e("unit-vector-and-direction-construction:practiceSet:0", [f("\\tfrac{1}{3}(\\hat{i} + \\hat{j} + \\hat{k})"), f("\\hat{i} + \\hat{j} + \\hat{k}"), f("\\tfrac{1}{\\sqrt{2}}(\\hat{i} + \\hat{j} + \\hat{k})")]),
  e("unit-vector-and-direction-construction:practiceSet:1", [f("30\\hat{i} + 40\\hat{j}"), f("3\\hat{i} + 4\\hat{j}"), f("8\\hat{i} + 6\\hat{j}")]),
  e("unit-vector-and-direction-construction:practiceSet:2", [f("\\sin\\theta\\,\\hat{i} + \\cos\\theta\\,\\hat{j}"), f("\\cos\\theta\\,\\hat{i} - \\sin\\theta\\,\\hat{j}"), f("\\tan\\theta\\,\\hat{i} + \\hat{j}")]),
  e("unit-vector-and-direction-construction:practiceSet:3", [f("5\\hat{i}"), f("\\tfrac{1}{5}\\hat{i}"), f("\\hat{i} + \\hat{j}")]),
  e("unit-vector-and-direction-construction:selfCheck:0", [f("\\tfrac{1}{5}(3\\hat{i} + 4\\hat{j})"), f("3\\hat{i} - 4\\hat{j}"), f("\\tfrac{1}{7}(3\\hat{i} - 4\\hat{j})")]),
  // unit-vector-orthogonal-triple-configurations
  e("unit-vector-orthogonal-triple-configurations:practiceSet:0", [f("3"), f("1"), f("\\sqrt{2}")]),
  e("unit-vector-orthogonal-triple-configurations:practiceSet:1", [f("2"), f("1"), f("\\sqrt{3}")]),
  e("unit-vector-orthogonal-triple-configurations:practiceSet:2", [f("1"), f("-1"), f("|\\vec{a}|")]),
  e("unit-vector-orthogonal-triple-configurations:practiceSet:3", [f("7"), f("25"), f("1")]),
  e("unit-vector-orthogonal-triple-configurations:selfCheck:0", [f("7"), f("1"), f("25")]),
  // unit-vector-perpendicular-via-cross
  e("unit-vector-perpendicular-via-cross:practiceSet:0", [f("\\tfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}||\\vec{b}|}"), f("\\tfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}\\times\\vec{b}|}"), f("\\vec{a}\\times\\vec{b}")]),
  e("unit-vector-perpendicular-via-cross:practiceSet:1", ["one", "infinitely many", "none"]),
  e("unit-vector-perpendicular-via-cross:practiceSet:2", [f("-\\hat{k}"), f("\\hat{i}"), f("0")]),
  e("unit-vector-perpendicular-via-cross:practiceSet:3", [f("\\hat{k} \\text{ only}"), f("\\pm\\hat{i}"), f("\\hat{i} + \\hat{j}")]),
  e("unit-vector-perpendicular-via-cross:selfCheck:0", [f("\\hat{k} \\text{ only}"), f("\\pm\\hat{i}"), f("\\pm\\hat{j}")]),
  // vector-addition
  e("vector-addition:practiceSet:0", [f("\\hat{i} - 2\\hat{j}"), f("3\\hat{i} + 3\\hat{j}"), f("2\\hat{i} + 3\\hat{j}")]),
  e("vector-addition:practiceSet:1", [f("6\\hat{i} - 2\\hat{j}"), f("\\hat{i}"), f("-6\\hat{i} + 2\\hat{j}")]),
  e("vector-addition:practiceSet:2", [f("6\\hat{i} + 4\\hat{j}"), f("4\\hat{i} + 4\\hat{j}"), f("4\\hat{j}")]),
  e("vector-addition:practiceSet:3", [f("5"), f("1"), f("12")]),
  // vector-triple-product-bac-cab
  e("vector-triple-product-bac-cab:practiceSet:0", [f("(\\vec{a}\\cdot\\vec{b})\\vec{c} - (\\vec{a}\\cdot\\vec{c})\\vec{b}"), f("(\\vec{a}\\cdot\\vec{b})\\vec{b} - (\\vec{a}\\cdot\\vec{c})\\vec{c}"), f("(\\vec{b}\\cdot\\vec{c})\\vec{a}")]),
  e("vector-triple-product-bac-cab:practiceSet:1", [f("\\vec{a} \\text{ and } \\vec{b}"), f("\\vec{a} \\text{ and } \\vec{c}"), f("\\vec{a} \\text{ alone}")]),
  e("vector-triple-product-bac-cab:practiceSet:2", [f("\\hat{j}"), f("\\hat{k}"), f("\\vec{0}")]),
  e("vector-triple-product-bac-cab:practiceSet:3", ["Yes", "Only for unit vectors", "Only in 2D"]),
  e("vector-triple-product-bac-cab:selfCheck:0", [f("\\hat{i}"), f("-\\hat{j}"), f("\\hat{i} + \\hat{k}")]),
];
