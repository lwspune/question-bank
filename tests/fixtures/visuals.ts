/**
 * Four real bank questions with an animated solution each: the cases the
 * visual-solutions core is pinned against. The solution strings are the
 * questions' stored solutions, verbatim (2026-10-25), because the steps point
 * at their sentences.
 */
import { solutionFingerprint } from "@/lib/visuals/visual";

export const ROTATION_SOLUTION = String.raw`Each revolution is \(2\pi\) radian, so two revolutions are \(4\pi\).`;

export const ARC_SOLUTION = String.raw`An arc subtending \(\theta\) radians at the centre of a circle of radius \(r\) has length \(r\theta\). Here \(r = 4\) cm and the arc is \(\pi\) cm, so \(4\theta = \pi\) and \(\theta = \dfrac{\pi}{4}\) radian.`;

export const QUAD_SOLUTION = String.raw`Discriminant \(\ge 0\): \(9\lambda^2-16\lambda(\lambda+2)\ge0\Rightarrow-\tfrac{32}{7}\le\lambda\le0\). Sum \(\tfrac{3\lambda}{\lambda+2}>0\) and product \(\tfrac{4\lambda}{\lambda+2}>0\) both require \(\lambda<-2\) or \(\lambda>0\). Intersection: \(-\tfrac{32}{7}\le\lambda<-2\). Integers \(\lambda=-4,-3\), i.e. \(2\) values. Answer: (B).`;

export const SLAB_SOLUTION = String.raw`The critical angle satisfies \(\sin\theta_{c}=\dfrac{1}{\mu}=\dfrac{1}{\sqrt{2}}\), so \(i=\theta_{c}=45^{\circ}\). Snell's law at the first face gives \(1\cdot\sin45^{\circ}=\sqrt{2}\sin r\), so \(\sin r=\dfrac{1}{2}\) and \(r=30^{\circ}\). The lateral displacement is \[\Delta=\frac{t\sin\left(i-r\right)}{\cos r}=\frac{4\sqrt{3}\times\sin15^{\circ}}{\cos30^{\circ}}=\frac{4\sqrt{3}\times0.25}{\frac{\sqrt{3}}{2}}=2\ cm.\]`;

/** MHT-CET d36a8bfc: a particle completes 2 revolutions; angular displacement? */
export const ROTATION_VISUAL = {
  v: 1,
  scene: "rotation",
  params: { revolutions: 2 },
  steps: [{ from: 0, beats: ["radiiRound", "total"] }],
  fingerprint: solutionFingerprint(ROTATION_SOLUTION),
  answer: { value: 4 * Math.PI, label: "4π" },
};

/** CDS (I) 2025 08561a61: arc of pi cm on a circle of radius 4 cm. */
export const ARC_VISUAL = {
  v: 1,
  scene: "circleArc",
  params: { radius: 4, arc: Math.PI, arcLabel: "π", unit: "cm" },
  steps: [
    { from: 0, beats: ["oneRadian"] },
    { from: 1, beats: ["compare", "angle"] },
  ],
  fingerprint: solutionFingerprint(ARC_SOLUTION),
  answer: { value: Math.PI / 4, label: "π/4" },
};

/** JEE Mains 4 Apr 2026 S2 cd89fce7: (λ+2)x² − 3λx + 4λ = 0 with two positive roots. */
export const QUAD_VISUAL = {
  v: 1,
  scene: "quadraticFamily",
  params: { a: [2, 1], b: [0, -3], c: [0, 4], range: [-6, 2], start: -3, condition: "twoPositiveRoots" },
  steps: [
    { from: 0, beats: ["discriminant"] },
    { from: 1, beats: ["signs"] },
    { from: 2, beats: ["intersection"] },
  ],
  fingerprint: solutionFingerprint(QUAD_SOLUTION),
  answer: { value: 2, label: "2" },
};

/** JEE Mains 4 Apr 2024 9d9e0808: slab 4√3 cm, μ = √2, incidence at the critical angle. */
export const SLAB_VISUAL = {
  v: 1,
  scene: "slab",
  params: { thickness: 4 * Math.sqrt(3), thicknessLabel: "4√3 cm", mu: Math.SQRT2, muLabel: "√2", incidence: "critical" },
  steps: [
    { from: 0, beats: ["incidence"] },
    { from: 1, beats: ["refraction", "emergence"] },
    { from: 2, beats: ["shift"] },
  ],
  fingerprint: solutionFingerprint(SLAB_SOLUTION),
  // The paper gives sin 15° = 0.25, so its key is 2; the to-scale picture measures 2.07.
  answer: { value: 2, label: "2 cm", tolerance: 0.1 },
};


/** MHT-CET 564f2302: number of solutions of 16^(sin^2 x) + 16^(cos^2 x) = 10 in [0, 2pi]. */
export const FG_CROSS_SOLUTION = String.raw`Let \(m=16^{\sin^2 x}\); then \(m+\frac{16}{m}=10\Rightarrow m^2-10m+16=0\Rightarrow m=8\) or \(m=2\). Each gives \(\sin^2x=\frac{3}{4}\) or \(\sin^2x=\frac{1}{4}\), each with 4 solutions in \([0,2\pi]\). Total \(=8\). Matches option D.`;

/** MHT-CET b03b5c01: point on y = x log x where the normal is parallel to 2x - 2y = 3. */
export const FG_SLOPE_SOLUTION = String.raw`\(y' = 1 + \log x\). Slope of normal \(= -1/y' = 1\) (parallel to the line). So \(1 + \log x = -1 \Rightarrow x = e^{-2}\), \(y = e^{-2}\log(e^{-2}) = -2e^{-2}\). Matches option D: \((e^{-2}, -2e^{-2})\).`;

/** MHT-CET 4fbc2dc5: where sin^4 x + cos^4 x is increasing. */
export const FG_INC_SOLUTION = String.raw`\(f'(x)=-\sin4x\). \(f'(x)>0\) when \(\sin4x<0\), i.e., \(\pi<4x<2\pi\), giving \(\frac{\pi}{4}<x<\frac{\pi}{2}\). Matches option B.`;

export const FG_CROSS_VISUAL = {
  v: 1,
  scene: "functionGraph",
  params: {
    f: "sin(x)^2",
    fLabel: "y = sin²x",
    g: ["3/4", "1/4"],
    gLabels: ["3/4", "1/4"],
    window: { x: [0, 2 * Math.PI], y: [-0.1, 1.15] },
    xTicks: "pi",
    ask: { kind: "crossings" },
  },
  steps: [
    { from: 0, beats: ["curve", "compare"] },
    { from: 1, beats: ["mark"] },
  ],
  fingerprint: solutionFingerprint(FG_CROSS_SOLUTION),
  answer: { value: 8, label: "8" },
};

export const FG_SLOPE_VISUAL = {
  v: 1,
  scene: "functionGraph",
  params: {
    f: "x*log(x)",
    fLabel: "y = x log x",
    window: { x: [0, 1.4], y: [-0.6, 0.6] },
    ask: { kind: "slopePoint", slope: -1, normal: true, pointLabel: "(e⁻², −2e⁻²)" },
  },
  steps: [
    { from: 0, beats: ["curve"] },
    { from: 1, beats: ["tangent"] },
    { from: 2, beats: ["mark"] },
  ],
  fingerprint: solutionFingerprint(FG_SLOPE_SOLUTION),
  answer: { value: Math.exp(-2), label: "x = e⁻²" },
};

export const FG_INC_VISUAL = {
  v: 1,
  scene: "functionGraph",
  params: {
    f: "sin(x)^4+cos(x)^4",
    fLabel: "y = sin⁴x + cos⁴x",
    window: { x: [0, Math.PI], y: [0.35, 1.1] },
    xTicks: "pi",
    ask: { kind: "increasingOn", interval: [Math.PI / 4, Math.PI / 2], intervalLabel: "π/4 < x < π/2" },
  },
  steps: [
    { from: 0, beats: ["curve"] },
    { from: 1, beats: ["shade"] },
  ],
  fingerprint: solutionFingerprint(FG_INC_SOLUTION),
  answer: { value: 1, label: "rising on π/4 < x < π/2" },
};

/** JEE Mains a6b70415: the midpoint of (3, 2) and a point on x^2 + y^2 = 1 traces a circle; its radius. */
export const CG_LOCUS_SOLUTION = String.raw`\(\therefore P \equiv (2\text{ }h - 3,2k - 2) \rightarrow\) on circle \[\therefore\left( h - \frac{3}{2} \right)^{2} + (k - 1)^{2} = \frac{1}{4}\] \(\Rightarrow\) radius \(= \frac{1}{2}\)`;

/** JEE Mains db846893: the circle found from a differential equation, and the shortest distance to it from (11, 6). */
export const CG_DIST_SOLUTION = String.raw`Cross-multiplying, \((bx+cy+a)dy=(ax-by+a)dx\); for a circle the \(xy\) term must vanish (\(b=0\)) and \(x^2,y^2\) coefficients equal (\(c=-a\)). Integrating gives \(x^2+y^2+2x-2y=\text{const}\); through \((2,5)\) the constant is \(23\), so the circle has centre \((-1,1)\), radius \(5\). Distance from \((11,6)\) to the centre is \(\sqrt{12^2+5^2}=13\), so the shortest distance to the circle is \(13-5=8\).`;

/** JEE Mains 4ce522ce: the line through a circle's centre and a parabola's vertex; its y-intercept. */
export const CG_LINE_SOLUTION = String.raw`\(\operatorname{Re}(z^2)+2(\operatorname{Im}z)^2+2\operatorname{Re}(z)=x^2-y^2+2y^2+2x=x^2+y^2+2x=0\): a circle with centre \((-1,0)\). The parabola \(x^2-6x+y+13=0\) has vertex \((3,-4)\). The line through \((-1,0)\) and \((3,-4)\) has slope \(-1\), i.e. \(y=-x-1\), giving \(y\)-intercept \(-1\).`;

export const CG_LOCUS_VISUAL = {
  v: 1,
  scene: "coordGeometry",
  params: {
    window: { x: [-1.6, 3.6], y: [-1.4, 2.6] },
    points: [{ id: "A", at: [3, 2], label: "A(3, 2)" }],
    circles: [{ id: "S", center: [0, 0], r: 1, label: "x² + y² = 1" }],
    locus: { fixed: "A", on: "S", ratio: 0.5 },
    ask: { kind: "locusRadius", label: "radius = 1/2" },
  },
  steps: [{ from: 0, beats: ["given", "trace", "answer"] }],
  fingerprint: solutionFingerprint(CG_LOCUS_SOLUTION),
  answer: { value: 0.5, label: "1/2" },
};

export const CG_DIST_VISUAL = {
  v: 1,
  scene: "coordGeometry",
  params: {
    window: { x: [-7, 13], y: [-5, 8] },
    points: [
      { id: "Q", at: [11, 6], label: "(11, 6)" },
      { id: "P", at: [2, 5], label: "(2, 5)" },
      { id: "C", at: [-1, 1], label: "(−1, 1)", beat: "derived" },
    ],
    circles: [{ id: "S", center: "C", r: 5, label: "r = 5", beat: "derived" }],
    ask: { kind: "distance", from: "Q", to: "S", label: "shortest distance = 8" },
  },
  steps: [
    { from: 0, beats: ["given"] },
    { from: 1, beats: ["derived"] },
    { from: 2, beats: ["answer"] },
  ],
  fingerprint: solutionFingerprint(CG_DIST_SOLUTION),
  answer: { value: 8, label: "8" },
};

export const CG_LINE_VISUAL = {
  v: 1,
  scene: "coordGeometry",
  params: {
    window: { x: [-4, 6], y: [-6, 2.5] },
    points: [
      { id: "C", at: [-1, 0], label: "(−1, 0)" },
      { id: "V", at: [3, -4], label: "V(3, −4)", beat: "derived" },
    ],
    circles: [{ id: "S", center: "C", r: 1 }],
    conics: [{ id: "K", type: "parabola", vertex: "V", a: -0.25, axis: "y", beat: "derived" }],
    lines: [{ id: "L", through: ["C", "V"], label: "y = −x − 1" }],
    ask: { kind: "yIntercept", line: "L", label: "y-intercept = −1" },
  },
  steps: [
    { from: 0, beats: ["given"] },
    { from: 1, beats: ["derived"] },
    { from: 2, beats: ["construct", "answer"] },
  ],
  fingerprint: solutionFingerprint(CG_LINE_SOLUTION),
  answer: { value: -1, label: "−1" },
};

/** MHT-CET 150c6ed0: distance of the origin from x - 3y + 4z = 6. */
export const S3_PLANE_SOLUTION = String.raw`Distance \(=\frac{|0-0+0-6|}{\sqrt{1+9+16}}=\frac{6}{\sqrt{26}}\). Matches option B.`;

/** MHT-CET fa974266: length of the projection of a segment on x + y + z = 7. */
export const S3_PROJ_SOLUTION = String.raw`\(\vec{AB}=(4-5,\,-1+1,\,3-4)=(-1,0,-1)\), \(|\vec{AB}|=\sqrt{2}\). Plane normal \(\vec n=(1,1,1)\). Projection on the plane \(=\sqrt{|\vec{AB}|^2-\left(\frac{\vec{AB}\cdot\vec n}{|\vec n|}\right)^2}=\sqrt{2-\frac{4}{3}}=\sqrt{\frac{2}{3}}\).`;

/** MHT-CET 9e235789: shortest distance between two skew lines. */
export const S3_SKEW_SOLUTION = String.raw`\((3, -1, 1) \times (-3, 2, 4) = (-6, -15, 3)\), of length \(\sqrt{270} = 3\sqrt{30}\). The points differ by \((-6, -15, 3)\), whose dot product with it is 270. The distance is \(\dfrac{270}{3\sqrt{30}} = 3\sqrt{30}\).`;

/** JEE Mains d3a9b6a0: foot of the perpendicular from R to a line, then the distance PQ. */
export const S3_FOOT_SOLUTION = String.raw`Line: \((2-2t,-5+3t,11-4t)\), dir \((-2,3,-4)\). Foot from \(R(1,7,6)\): \(29t-58=0\Rightarrow t=2\), \(Q=(-2,1,3)\). \(\vec{PQ}=(-12,3,4)\), \(|PQ|=\sqrt{144+9+16}=13\).`;

export const S3_PLANE_VISUAL = {
  v: 1,
  scene: "space3d",
  params: {
    points: [{ id: "O", at: [0, 0, 0], label: "O" }],
    planes: [{ id: "P", eq: [1, -3, 4, 6], label: "x − 3y + 4z = 6" }],
    ask: { kind: "distance", from: "O", to: "P", label: "distance = 6/√26" },
  },
  steps: [{ from: 0, beats: ["given", "answer"] }],
  fingerprint: solutionFingerprint(S3_PLANE_SOLUTION),
  answer: { value: 6 / Math.sqrt(26), label: "6/√26" },
};

export const S3_PROJ_VISUAL = {
  v: 1,
  scene: "space3d",
  params: {
    points: [{ id: "A", at: [5, -1, 4], label: "A(5, −1, 4)" }, { id: "B", at: [4, -1, 3], label: "B(4, −1, 3)" }],
    planes: [{ id: "P", eq: [1, 1, 1, 7], label: "x + y + z = 7", beat: "derived" }],
    segments: [{ from: "A", to: "B", beat: "given" }],
    ask: { kind: "projection", from: "A", to: "B", onto: "P", label: "projection = √(2/3)" },
  },
  steps: [
    { from: 0, beats: ["given"] },
    { from: 1, beats: ["derived"] },
    { from: 2, beats: ["answer"] },
  ],
  fingerprint: solutionFingerprint(S3_PROJ_SOLUTION),
  answer: { value: Math.sqrt(2 / 3), label: "√(2/3)" },
};

export const S3_SKEW_VISUAL = {
  v: 1,
  scene: "space3d",
  params: {
    lines: [
      { id: "L1", point: [3, 8, 3], dir: [3, -1, 1], label: "L₁" },
      { id: "L2", point: [-3, -7, 6], dir: [-3, 2, 4], label: "L₂" },
    ],
    ask: { kind: "distance", from: "L1", to: "L2", label: "shortest distance = 3√30" },
  },
  steps: [
    { from: 0, beats: ["given"] },
    { from: 2, beats: ["answer"] },
  ],
  fingerprint: solutionFingerprint(S3_SKEW_SOLUTION),
  answer: { value: 3 * Math.sqrt(30), label: "3√30" },
};

export const S3_FOOT_VISUAL = {
  v: 1,
  scene: "space3d",
  params: {
    points: [
      { id: "P", at: [10, -2, -1], label: "P(10, −2, −1)" },
      { id: "R", at: [1, 7, 6], label: "R(1, 7, 6)" },
      { id: "A", at: [2, -5, 11], label: "" },
      { id: "B", at: [-6, 7, -5], label: "" },
    ],
    lines: [{ id: "L", through: ["A", "B"] }],
    derived: [{ id: "Q", kind: "foot", from: "R", to: "L", label: "Q(−2, 1, 3)" }],
    segments: [{ from: "R", to: "Q", beat: "derived" }],
    ask: { kind: "distance", from: "P", to: "Q", label: "PQ = 13" },
  },
  steps: [
    { from: 0, beats: ["given"] },
    { from: 1, beats: ["derived"] },
    { from: 2, beats: ["answer"] },
  ],
  fingerprint: solutionFingerprint(S3_FOOT_SOLUTION),
  answer: { value: 13, label: "13" },
};

// MHT-CET Linear Programming 00733e89: the point where 10x + 6y is greatest (key B, (8, 4)).
export const LP_SOLUTION = String.raw`Corner points: O(0,0), B(10,0), C(8,4), D(0,12). Evaluating \(z=10x+6y\): at C(8,4), \(z=80+24=104\) (maximum). Matches option B: \((8,4)\).`;

export const LP_VISUAL = {
  v: 1,
  scene: "lpRegion",
  params: {
    window: { x: [0, 14], y: [0, 14] },
    constraints: [
      { a: 1, b: 1, op: "<=", c: 12 },
      { a: 2, b: 1, op: "<=", c: 20 },
    ],
    objective: { a: 10, b: 6, label: "z = 10x + 6y" },
    ask: { kind: "maxAt", at: [8, 4], label: "max z = 104 at (8, 4)" },
  },
  steps: [
    { from: 0, beats: ["constraints", "region", "corners"] },
    { from: 1, beats: ["sweep", "answer"] },
  ],
  fingerprint: solutionFingerprint(LP_SOLUTION),
  answer: { value: 1, label: "(8, 4)" },
};

// MHT-CET Mathematical Logic 020a2a68: [(p ∧ q) → (∼p ∨ r)] ∨ [(∼p ∨ r) → (p ∧ q)] is a tautology (key B).
export const TT_SOLUTION = String.raw`It has the form \((X \to Y) \vee (Y \to X) \equiv \sim X \vee Y \vee \sim Y \vee X\), which is always true. It is a tautology.`;

export const TT_VISUAL = {
  v: 1,
  scene: "truthTable",
  params: {
    columns: [
      { f: "p & q", label: "X = p ∧ q" },
      { f: "~p | r", label: "Y = ∼p ∨ r" },
      { f: "(p & q) -> (~p | r)", label: "X → Y" },
      { f: "(~p | r) -> (p & q)", label: "Y → X" },
    ],
    ask: { kind: "classify", f: "((p & q) -> (~p | r)) | ((~p | r) -> (p & q))", expect: "tautology" },
  },
  steps: [
    { from: 0, beats: ["vars", "columns"] },
    { from: 1, beats: ["answer"] },
  ],
  fingerprint: solutionFingerprint(TT_SOLUTION),
  answer: { value: 1, label: "a tautology" },
};

export const SKETCH_SOLUTION = String.raw`The slope at \(P\) is \(2e^0 = 2\), so the tangent is \(y = 2x + 1\). It meets the axes at \(A\left(-\dfrac{1}{2}, 0\right)\) and \(B(0, 1)\); area \(= \dfrac{1}{2} \times \dfrac{1}{2} \times 1 = \dfrac{1}{4}\).`;

/** MHT-CET 8aceb9c7: the tangent to y = e^(2x) at P(0, 1) cuts the axes at A and B; area of OAB. A noFit for every shared scene. */
export const SKETCH_VISUAL = {
  v: 1,
  scene: "sketch",
  params: {
    vars: { m: "2*exp(0)", c: "exp(0)", ax: "-c/m", by: "c", area: "abs(ax)*by/2" },
    view: { x: [-1.6, 1.4], y: [-0.5, 2.6] },
    axes: true,
    points: { O: [0, 0], A: ["ax", 0], B: [0, "by"] },
    items: [
      { kind: "curve", f: "exp(2*x)", x: [-1.6, 0.47], step: "s1", label: "y = e²ˣ", labelAt: [-1.5, 0.15], pos: "n" },
      { kind: "point", at: "B", step: "s1", label: "P(0, 1)", pos: "nw" },
      { kind: "line", through: ["A", "B"], step: "s2", label: "y = 2x + 1", labelAt: [0.55, 2.1], pos: "e" },
      { kind: "point", at: "A", step: "s3", label: "A(−1/2, 0)", pos: "sw" },
      { kind: "polygon", points: ["O", "A", "B"], step: "s3" },
      { kind: "label", at: [-1.55, 2.3], text: "area of OAB = {area}", step: "s3", tone: "good" },
    ],
    assert: ["by = exp(2*0)", "m*ax + c = 0"],
    answer: "area",
  },
  steps: [
    { from: 0, beats: ["s1", "s2"] },
    { from: 1, beats: ["s3"] },
  ],
  fingerprint: solutionFingerprint(SKETCH_SOLUTION),
  answer: { value: 0.25, label: "1/4" },
};

export const FIXTURES = [
  { name: "rotation", visual: ROTATION_VISUAL, solution: ROTATION_SOLUTION },
  { name: "circleArc", visual: ARC_VISUAL, solution: ARC_SOLUTION },
  { name: "quadraticFamily", visual: QUAD_VISUAL, solution: QUAD_SOLUTION },
  { name: "slab", visual: SLAB_VISUAL, solution: SLAB_SOLUTION },
  { name: "functionGraph", visual: FG_CROSS_VISUAL, solution: FG_CROSS_SOLUTION },
  { name: "functionGraph", visual: FG_SLOPE_VISUAL, solution: FG_SLOPE_SOLUTION },
  { name: "functionGraph", visual: FG_INC_VISUAL, solution: FG_INC_SOLUTION },
  { name: "coordGeometry", visual: CG_LOCUS_VISUAL, solution: CG_LOCUS_SOLUTION },
  { name: "coordGeometry", visual: CG_DIST_VISUAL, solution: CG_DIST_SOLUTION },
  { name: "coordGeometry", visual: CG_LINE_VISUAL, solution: CG_LINE_SOLUTION },
  { name: "space3d", visual: S3_PLANE_VISUAL, solution: S3_PLANE_SOLUTION },
  { name: "space3d", visual: S3_PROJ_VISUAL, solution: S3_PROJ_SOLUTION },
  { name: "space3d", visual: S3_SKEW_VISUAL, solution: S3_SKEW_SOLUTION },
  { name: "space3d", visual: S3_FOOT_VISUAL, solution: S3_FOOT_SOLUTION },
  { name: "lpRegion", visual: LP_VISUAL, solution: LP_SOLUTION },
  { name: "truthTable", visual: TT_VISUAL, solution: TT_SOLUTION },
  { name: "sketch", visual: SKETCH_VISUAL, solution: SKETCH_SOLUTION },
] as const;
