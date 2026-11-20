"use client";

/**
 * Animation: integration by parts repeated (concept jii-by-parts), with the
 * concept's worked example ∫x²eˣ dx. Differentiate x² (it gets simpler:
 * x², 2x, 2, 0) and integrate eˣ (it stays eˣ). Each round of parts gives
 * one term, and the signs alternate: + x²eˣ, − 2xeˣ, + 2eˣ. Stop when the
 * polynomial is gone. Sum: eˣ(x² − 2x + 2) + C. Pieces fade in by opacity.
 * Pinned by tests/notes-w2-04.test.ts.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

/** x² as coefficients [x², x, 1]; its successive derivatives. */
export const POLY = [1, 0, 0] as const;

export function derivative(c: readonly number[]): number[] {
  // c = [a, b, c0] for a·x² + b·x + c0 (highest power first).
  const n = c.length - 1;
  return c.slice(0, -1).map((a, i) => a * (n - i));
}

/** The column that is differentiated: x², 2x, 2, 0. */
export const DIFF_COL = ["x²", "2x", "2", "0"] as const;
/** The column that is integrated: eˣ every time. */
export const INT_COL = ["eˣ", "eˣ", "eˣ", "eˣ"] as const;
/** The sign of each term: they alternate. */
export const SIGNS = [1, -1, 1] as const;
export const TERMS = ["x²eˣ", "2xeˣ", "2eˣ"] as const;

/**
 * The polynomial in eˣ(…): Σ sign_k × (k-th derivative of x²), padded to
 * [x², x, 1]. For x² this is [1, −2, 2].
 */
export function resultPoly(): number[] {
  let d: number[] = [...POLY];
  const out = [0, 0, 0];
  for (let k = 0; k < SIGNS.length; k++) {
    const pad = [...new Array<number>(3 - d.length).fill(0), ...d];
    for (let i = 0; i < 3; i++) out[i] += SIGNS[k] * pad[i];
    d = derivative(d);
  }
  return out;
}

export const PARTS_STEPS: readonly FigureStep[] = [
  {
    title: "Choose what to differentiate",
    caption: "Differentiate x², which gets simpler, and integrate eˣ, which stays eˣ.",
  },
  { title: "First round of parts", caption: "x²eˣ − ∫2xeˣ dx: the first term is + x²eˣ." },
  { title: "Parts again", caption: "∫2xeˣ dx = 2xeˣ − ∫2eˣ dx, and it sits behind a minus sign: the next term is − 2xeˣ." },
  { title: "The polynomial is gone", caption: "The last term is + 2eˣ, and the next derivative is 0, so stop. The signs went +, −, +." },
  { title: "Collect", caption: "x²eˣ − 2xeˣ + 2eˣ = eˣ(x² − 2x + 2) + C." },
];

// Geometry (viewBox units).
export const X_DIFF = 60;
export const X_INT = 150;
export const X_TERM = 262;
export const ROW_Y = [52, 84, 116, 148] as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** A small arrow head at (x2, y2) pointing along the line from (x1, y1). */
function arrowHead(x1: number, y1: number, x2: number, y2: number): string {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const bx = x2 - 7 * ux;
  const by = y2 - 7 * uy;
  return `M ${r2(x2)} ${r2(y2)} L ${r2(bx - 3 * uy)} ${r2(by + 3 * ux)} L ${r2(bx + 3 * uy)} ${r2(by - 3 * ux)} Z`;
}

export default function JeeRepeatedParts() {
  const last = PARTS_STEPS.length - 1;
  return (
    <StepFigure
      title="Animation · integration by parts, repeated"
      label="The integral of x squared e to the x. Differentiate x squared: x squared, 2x, 2, 0. Integrate e to the x: e to the x each time. The terms are plus x squared e to the x, minus 2x e to the x, plus 2 e to the x, with alternating signs, so the answer is e to the x times (x squared minus 2x plus 2) plus C."
      viewBox="0 0 320 200"
      steps={PARTS_STEPS}
      note="∫u dv = uv − ∫v du, used again on each new integral."
    >
      {(step) => (
        <g>
          {/* Column heads */}
          <g className="fill-foreground text-[11px] font-semibold">
            <text x={X_DIFF} y={22} textAnchor="middle">differentiate</text>
            <text x={X_INT} y={22} textAnchor="middle">integrate</text>
            <text x={X_TERM} y={22} textAnchor="middle">terms</text>
          </g>
          <line x1={14} y1={30} x2={306} y2={30} className="stroke-border" />

          {/* The two columns: row k appears with round k */}
          {ROW_Y.map((y, k) => (
            <g key={`row-${k}`} className={MOTION} style={{ opacity: step >= k ? 1 : 0 }}>
              <text
                x={X_DIFF}
                y={y}
                textAnchor="middle"
                className={`text-[13px] ${k === 3 ? "fill-muted-foreground" : "fill-sky-700 dark:fill-sky-300"}`}
              >
                {DIFF_COL[k]}
              </text>
              <text x={X_INT} y={y} textAnchor="middle" className="fill-amber-700 text-[13px] dark:fill-amber-300">
                {INT_COL[k]}
              </text>
            </g>
          ))}
          <text
            x={X_DIFF}
            y={ROW_Y[3] + 14}
            textAnchor="middle"
            className={`fill-muted-foreground text-[9.5px] ${MOTION}`}
            style={{ opacity: step >= 3 ? 1 : 0 }}
          >
            stop
          </text>

          {/* Diagonal pairings with their signs, and the terms */}
          {SIGNS.map((s, k) => {
            const y1 = ROW_Y[k] - 4;
            const y2 = ROW_Y[k + 1] - 8;
            const sign = s > 0 ? "+" : "−";
            return (
              <g key={`arrow-${k}`} className={MOTION} style={{ opacity: step >= k + 1 ? 1 : 0 }}>
                <line x1={X_DIFF + 18} y1={y1} x2={X_INT - 18} y2={y2} strokeWidth={1.3} className="stroke-indigo-500 dark:stroke-indigo-400" />
                <path d={arrowHead(X_DIFF + 18, y1, X_INT - 18, y2)} className="fill-indigo-500 dark:fill-indigo-400" />
                <text
                  x={r2((X_DIFF + X_INT) / 2) + 8}
                  y={r2((y1 + y2) / 2) - 6}
                  textAnchor="middle"
                  className={`text-[13px] font-semibold ${s > 0 ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
                >
                  {sign}
                </text>
                <text
                  x={X_TERM}
                  y={r2((y1 + y2) / 2) + 6}
                  textAnchor="middle"
                  className={`text-[13px] ${s > 0 ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
                >
                  {`${sign} ${TERMS[k]}`}
                </text>
              </g>
            );
          })}

          {/* The answer */}
          <g className={MOTION} style={{ opacity: step === last ? 1 : 0 }}>
            <line x1={14} y1={170} x2={306} y2={170} className="stroke-border" />
            <text x={160} y={190} textAnchor="middle" className="fill-indigo-700 text-[13px] font-semibold dark:fill-indigo-300">
              ∫x²eˣ dx = eˣ(x² − 2x + 2) + C
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
