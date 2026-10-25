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

export const FIXTURES = [
  { name: "rotation", visual: ROTATION_VISUAL, solution: ROTATION_SOLUTION },
  { name: "circleArc", visual: ARC_VISUAL, solution: ARC_SOLUTION },
  { name: "quadraticFamily", visual: QUAD_VISUAL, solution: QUAD_SOLUTION },
  { name: "slab", visual: SLAB_VISUAL, solution: SLAB_SOLUTION },
  { name: "functionGraph", visual: FG_CROSS_VISUAL, solution: FG_CROSS_SOLUTION },
  { name: "functionGraph", visual: FG_SLOPE_VISUAL, solution: FG_SLOPE_SOLUTION },
  { name: "functionGraph", visual: FG_INC_VISUAL, solution: FG_INC_SOLUTION },
] as const;
