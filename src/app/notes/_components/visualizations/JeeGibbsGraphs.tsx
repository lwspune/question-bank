/**
 * Static figure: the two graphs of concept jcthermo-g-graphs.
 *
 * Top: log K against 1/T for the concept's worked example, a straight line
 * with slope −2000 K and intercept 3.0: log K = 3.0 − 2000/T. With
 * 2.303R = 2.303 × 8.314 = 19.15 J K⁻¹ mol⁻¹: ΔH° = 2000 × 19.15 = 38 300 J
 * = +38.3 kJ mol⁻¹ (endothermic; the line falls), ΔS° = 3.0 × 19.15 =
 * +57.4 J K⁻¹ mol⁻¹. A slope triangle: 1/T from 0.5 to 1.5 (× 10⁻³ K⁻¹),
 * log K from 2.0 to 0.
 *
 * Bottom: G against the extent of reaction, with the self-check's points:
 * P left of the minimum (forward spontaneous), Q at the minimum (equilibrium),
 * R right of it (reverse spontaneous), and ΔG° = G(pure products) −
 * G(pure reactants). The curve is drawn as G = ξΔG° + ξ ln ξ + (1 − ξ) ln(1 − ξ)
 * with ΔG° = −0.6 (arbitrary units); only its shape (one minimum, between the
 * ends) is the concept's, so no G values are printed.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-11.test.ts.
 */

export const R_GAS = 8.314;
/** The worked example: log K = INTERCEPT + SLOPE × (1/T). */
export const LINE = { slopeK: -2000, intercept: 3.0 } as const;

export function twoPointThreeR(): number {
  return 2.303 * R_GAS;
}
/** ΔH° in kJ mol⁻¹ from slope = −ΔH°/2.303R. */
export function deltaH(): number {
  return (-LINE.slopeK * twoPointThreeR()) / 1000;
}
/** ΔS° in J K⁻¹ mol⁻¹ from intercept = ΔS°/2.303R. */
export function deltaS(): number {
  return LINE.intercept * twoPointThreeR();
}
/** log K at 1/T given in units of 10⁻³ K⁻¹. */
export function logK(invTmilli: number): number {
  return LINE.intercept + (LINE.slopeK * invTmilli) / 1000;
}
export const TRIANGLE = { from: 0.5, to: 1.5 } as const;

// G against extent of reaction.
export const G_CURVE = { dG0: -0.6 } as const;
const xlnx = (x: number) => (x <= 0 ? 0 : x * Math.log(x));
export function gibbs(xi: number): number {
  return xi * G_CURVE.dG0 + xlnx(xi) + xlnx(1 - xi);
}
/** Where dG/dξ = 0: ξ = 1 / (1 + e^ΔG°). */
export function equilibriumExtent(): number {
  return 1 / (1 + Math.exp(G_CURVE.dG0));
}
/** Slope of G against ξ (its sign says which way the reaction runs). */
export function gibbsSlope(xi: number): number {
  return G_CURVE.dG0 + Math.log(xi) - Math.log(1 - xi);
}
export const POINTS = [
  { id: "P", xi: 0.25, says: "forward" },
  { id: "Q", xi: equilibriumExtent(), says: "equilibrium" },
  { id: "R", xi: 0.9, says: "reverse" },
] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

// Top plot geometry.
const P1 = { x0: 40, x1: 300, yTop: 28, yBottom: 148, xMax: 2, yMin: -1.5, yMax: 3.5 } as const;
const p1x = (v: number) => r2(P1.x0 + (v / P1.xMax) * (P1.x1 - P1.x0));
const p1y = (v: number) => r2(P1.yBottom - ((v - P1.yMin) / (P1.yMax - P1.yMin)) * (P1.yBottom - P1.yTop));

// Bottom plot geometry.
const P2 = { x0: 40, x1: 250, yTop: 236, yBottom: 310, gMax: 0.1, gMin: -1.15 } as const;
const p2x = (xi: number) => r2(P2.x0 + xi * (P2.x1 - P2.x0));
const p2y = (g: number) => r2(P2.yTop + ((P2.gMax - g) / (P2.gMax - P2.gMin)) * (P2.yBottom - P2.yTop));

function curvePoints(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const xi = i / 100;
    pts.push(`${p2x(xi)},${p2y(gibbs(xi))}`);
  }
  return pts.join(" ");
}

/** A small arrowhead on the curve at ξ, pointing downhill (towards Q). */
function downhillHead(xi: number): string {
  const goRight = gibbsSlope(xi) < 0;
  const h = goRight ? 0.04 : -0.04;
  const ax = p2x(xi + h);
  const ay = p2y(gibbs(xi + h));
  const bx = p2x(xi);
  const by = p2y(gibbs(xi));
  const len = Math.hypot(ax - bx, ay - by);
  const ux = (ax - bx) / len;
  const uy = (ay - by) / len;
  const tip = { x: r2(bx + ux * 13), y: r2(by + uy * 13) };
  const base = { x: tip.x - ux * 7, y: tip.y - uy * 7 };
  const w1 = { x: r2(base.x - uy * 3.5), y: r2(base.y + ux * 3.5) };
  const w2 = { x: r2(base.x + uy * 3.5), y: r2(base.y - ux * 3.5) };
  return `${tip.x},${tip.y} ${w1.x},${w1.y} ${w2.x},${w2.y}`;
}

const minus = (s: string) => s.replace("-", "−");

export default function JeeGibbsGraphs() {
  const [P, Q, R] = POINTS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading the two equilibrium graphs
      </p>
      <svg
        viewBox="0 0 320 346"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: log K against 1 over T, a straight line falling from log K 3.0 at 1 over T equal to zero, with slope minus 2000 kelvin. The slope is minus delta H over 2.303 R, so delta H is plus 38.3 kilojoules per mole; the intercept is delta S over 2.303 R, so delta S is plus 57.4 joules per kelvin per mole. Bottom: G against the extent of reaction, falling from pure reactants to a minimum and rising to pure products. At P, left of the minimum, the forward reaction is spontaneous; at Q, the minimum, the mixture is at equilibrium; at R, right of it, the reverse reaction is spontaneous. Delta G standard is G of pure products minus G of pure reactants."
      >
        {/* ---- Top: log K against 1/T ---- */}
        {[-1, 0, 1, 2, 3].map((v) => (
          <g key={v}>
            <line x1={P1.x0} y1={p1y(v)} x2={P1.x1} y2={p1y(v)} strokeWidth={v === 0 ? 1 : 0.6} className="stroke-border" />
            <text x={P1.x0 - 5} y={p1y(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {minus(String(v))}
            </text>
          </g>
        ))}
        <line x1={P1.x0} y1={P1.yBottom} x2={P1.x1} y2={P1.yBottom} className="stroke-muted-foreground" />
        <line x1={P1.x0} y1={P1.yBottom} x2={P1.x0} y2={P1.yTop - 6} className="stroke-muted-foreground" />
        {[0, 0.5, 1, 1.5, 2].map((v) => (
          <text key={v} x={p1x(v)} y={P1.yBottom + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {v.toFixed(1)}
          </text>
        ))}
        <text x={P1.x0 + 4} y={P1.yTop - 10} className="fill-foreground text-[10px] font-semibold">
          log K
        </text>
        <text x={p1x(1)} y={P1.yBottom + 25} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          1/T (10⁻³ K⁻¹)
        </text>
        <line x1={p1x(0)} y1={p1y(logK(0))} x2={p1x(P1.xMax)} y2={p1y(logK(P1.xMax))} strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <circle cx={p1x(0)} cy={p1y(LINE.intercept)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        {/* Slope triangle */}
        <polyline
          points={`${p1x(TRIANGLE.from)},${p1y(logK(TRIANGLE.from))} ${p1x(TRIANGLE.to)},${p1y(logK(TRIANGLE.from))} ${p1x(TRIANGLE.to)},${p1y(logK(TRIANGLE.to))}`}
          fill="none"
          strokeDasharray="3 2"
          className="stroke-foreground"
        />
        <text x={(p1x(TRIANGLE.from) + p1x(TRIANGLE.to)) / 2} y={p1y(logK(TRIANGLE.from)) - 5} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          1.0 × 10⁻³
        </text>
        <text x={p1x(TRIANGLE.to) + 5} y={(p1y(logK(TRIANGLE.from)) + p1y(logK(TRIANGLE.to))) / 2 + 3.5} className="fill-foreground text-[10px] tabular-nums">
          {minus((logK(TRIANGLE.to) - logK(TRIANGLE.from)).toFixed(1))}
        </text>

        {/* Readings */}
        <text x={10} y={190} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          slope = −ΔH°/2.303R
        </text>
        <text x={10} y={203} className="fill-foreground text-[10px] tabular-nums">
          = −2000 K
        </text>
        <text x={10} y={216} className="fill-foreground text-[10px] font-semibold tabular-nums">
          ΔH° = +{deltaH().toFixed(1)} kJ mol⁻¹
        </text>
        <text x={166} y={190} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          intercept = ΔS°/2.303R
        </text>
        <text x={166} y={203} className="fill-foreground text-[10px] tabular-nums">
          = {LINE.intercept.toFixed(1)}
        </text>
        <text x={166} y={216} className="fill-foreground text-[10px] font-semibold tabular-nums">
          ΔS° = +{deltaS().toFixed(1)} J K⁻¹ mol⁻¹
        </text>

        {/* ---- Bottom: G against extent of reaction ---- */}
        <line x1={P2.x0} y1={P2.yBottom + 4} x2={P2.x1} y2={P2.yBottom + 4} className="stroke-muted-foreground" />
        <line x1={P2.x0} y1={P2.yBottom + 4} x2={P2.x0} y2={P2.yTop - 4} className="stroke-muted-foreground" />
        <text x={P2.x0 - 5} y={P2.yTop + 4} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          G
        </text>
        <polyline points={curvePoints()} fill="none" strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        {/* ΔG° between the two ends */}
        <line x1={P2.x0} y1={p2y(0)} x2={P2.x1 + 16} y2={p2y(0)} strokeDasharray="3 2" className="stroke-border" />
        <line x1={P2.x1} y1={p2y(G_CURVE.dG0)} x2={P2.x1 + 16} y2={p2y(G_CURVE.dG0)} strokeDasharray="3 2" className="stroke-border" />
        <line x1={P2.x1 + 12} y1={p2y(0) + 2} x2={P2.x1 + 12} y2={p2y(G_CURVE.dG0) - 2} className="stroke-foreground" />
        <text x={P2.x1 + 20} y={(p2y(0) + p2y(G_CURVE.dG0)) / 2 + 3.5} className="fill-foreground text-[11px] font-semibold">
          ΔG°
        </text>
        {/* P, Q, R */}
        {POINTS.map((pt) => (
          <circle key={pt.id} cx={p2x(pt.xi)} cy={p2y(gibbs(pt.xi))} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        ))}
        <polygon points={downhillHead(P.xi)} className="fill-emerald-600 dark:fill-emerald-400" />
        <polygon points={downhillHead(R.xi)} className="fill-amber-600 dark:fill-amber-400" />
        <text x={p2x(P.xi) + 4} y={p2y(gibbs(P.xi)) - 16} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          P: {P.says}
        </text>
        <text x={p2x(Q.xi)} y={p2y(gibbs(Q.xi)) - 20} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          Q: {Q.says}
        </text>
        <text x={p2x(R.xi) - 3} y={P2.yBottom - 1} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          R: {R.says}
        </text>
        <text x={P2.x0} y={P2.yBottom + 17} className="fill-muted-foreground text-[10px]">
          pure reactants
        </text>
        <text x={P2.x1} y={P2.yBottom + 17} textAnchor="end" className="fill-muted-foreground text-[10px]">
          pure products
        </text>
        <text x={(P2.x0 + P2.x1) / 2} y={P2.yBottom + 31} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          extent of reaction
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The line falls from left to right, so ΔH° is positive and K grows as the temperature rises. On the lower curve the reaction always runs downhill
        towards the lowest point, Q, which is the equilibrium mixture.
      </p>
    </div>
  );
}
