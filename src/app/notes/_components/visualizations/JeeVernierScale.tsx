/**
 * Static figure: reading a vernier callipers and a screw gauge (concept
 * jpunit-least-count).
 *
 * Vernier: the concept's practice item, 10 VSD = 9 MSD with 1 MSD = 1 mm, so
 * 1 VSD = 0.9 mm and LC = 1 MSD − 1 VSD = 0.1 mm. (The worked example's
 * 25 VSD = 24 MSD of 0.5 mm, LC 0.02 mm, is too fine to draw on a phone; the
 * caption works it.) The vernier's zero sits past the 23 mm mark and its 6th
 * mark lines up with the 29 mm mark, so the reading is 23 + 6 × 0.1 = 23.6 mm:
 * only one vernier mark can line up, and it is the 6th.
 *
 * Screw gauge: the worked example's pitch 0.5 mm and 50 circular divisions,
 * LC = 0.5/50 = 0.01 mm. Its sleeve shows 5.5 mm and the 28th circular division
 * is on the reference line: 5.5 + 28 × 0.01 = 5.78 mm.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts. Server component.
 */

/** The drawn vernier: main-scale division (mm), vernier divisions N spanning N − 1 MSD. */
export const VERNIER = { msd: 1, n: 10, spans: 9 } as const;
/** The reading shown, in mm. */
export const VERNIER_READING = 23.6;

/** Least count of a vernier with N VSD = m MSD: (1 − m/N) MSD. */
export const vernierLC = (msd: number, n: number, m: number) => (1 - m / n) * msd;

/** Position (mm on the main scale) of vernier mark k, when the vernier's zero is at `zero`. */
export const vernierMark = (zero: number, k: number) => zero + k * (VERNIER.spans / VERNIER.n) * VERNIER.msd;

/** The vernier marks that line up with a main-scale mark (within a hair). */
export function coincidingMarks(zero: number): number[] {
  const out: number[] = [];
  for (let k = 0; k <= VERNIER.n; k++) {
    const p = vernierMark(zero, k);
    if (Math.abs(p - Math.round(p)) < 1e-6) out.push(k);
  }
  return out;
}

/** The screw gauge: pitch in mm, circular divisions, and the reading shown. */
export const SCREW = { pitch: 0.5, divisions: 50, sleeve: 5.5, circular: 28 } as const;
export const screwLC = (pitch: number, divisions: number) => pitch / divisions;
export const screwReading = () => SCREW.sleeve + SCREW.circular * screwLC(SCREW.pitch, SCREW.divisions);

// Vernier geometry (viewBox units): main scale from 19 to 41 mm.
const MS = { from: 19, to: 41, x0: 24, unit: 12, y: 58 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const msX = (mm: number) => r2(MS.x0 + (mm - MS.from) * MS.unit);

// Screw gauge geometry.
const SG = { x0: 30, unit: 20, line: 206, divUnit: 4 } as const;
const sgX = (mm: number) => r2(SG.x0 + mm * SG.unit);

export default function JeeVernierScale() {
  const lc = vernierLC(VERNIER.msd, VERNIER.n, VERNIER.spans);
  const zero = VERNIER_READING;
  const k = coincidingMarks(zero)[0];
  const msr = Math.floor(zero);
  const mmTicks = Array.from({ length: MS.to - MS.from + 1 }, (_, i) => MS.from + i);
  const vTicks = Array.from({ length: VERNIER.n + 1 }, (_, i) => i);
  const sLC = screwLC(SCREW.pitch, SCREW.divisions);
  const edge = sgX(screwReading());
  const circ = Array.from({ length: 13 }, (_, i) => SCREW.circular - 6 + i);
  const AMBER_TEXT = "fill-amber-700 text-[10px] font-semibold dark:fill-amber-300";

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading a vernier and a screw gauge
      </p>
      <svg
        viewBox="0 0 320 268"
        className="block h-auto w-full"
        role="img"
        aria-label="A vernier callipers reading: the vernier's zero is just past 23 millimetres on the main scale and its sixth mark lines up with a main-scale mark, so with a least count of 0.1 millimetre the reading is 23.6 millimetres. Below, a screw gauge: the sleeve shows 5.5 millimetres and the 28th circular division is on the reference line, so with a least count of 0.01 millimetre the reading is 5.78 millimetres."
      >
        <text x={8} y={14} className="fill-foreground text-[11px] font-semibold">
          Vernier callipers: 10 VSD = 9 MSD
        </text>

        {/* Main scale: ticks up from its edge */}
        <rect x={MS.x0 - 6} y={MS.y - 26} width={msX(MS.to) - MS.x0 + 12} height={26} className="fill-slate-100 dark:fill-slate-800/60" />
        {mmTicks.map((mm) => (
          <line
            key={mm}
            x1={msX(mm)}
            y1={MS.y}
            x2={msX(mm)}
            y2={MS.y - (mm % 10 === 0 ? 14 : mm % 5 === 0 ? 10 : 6)}
            strokeWidth={mm === 29 ? 2 : 1}
            className={mm === 29 ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-foreground"}
          />
        ))}
        {[20, 30, 40].map((mm) => (
          <text key={mm} x={msX(mm)} y={MS.y - 17} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
            {mm}
          </text>
        ))}
        <text x={msX(MS.to) + 8} y={MS.y - 17} className="fill-muted-foreground text-[10px]">
          mm
        </text>
        <line x1={MS.x0 - 6} y1={MS.y} x2={msX(MS.to) + 6} y2={MS.y} className="stroke-foreground" />

        {/* Vernier scale: ticks down, slid along to the reading */}
        <rect x={msX(zero) - 6} y={MS.y} width={r2(VERNIER.spans * MS.unit + 12)} height={24} className="fill-sky-100 dark:fill-sky-950/60" />
        {vTicks.map((i) => (
          <line
            key={i}
            x1={msX(vernierMark(zero, i))}
            y1={MS.y}
            x2={msX(vernierMark(zero, i))}
            y2={MS.y + (i % 5 === 0 ? 11 : 7)}
            strokeWidth={i === k ? 2 : 1}
            className={i === k ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-sky-700 dark:stroke-sky-300"}
          />
        ))}
        {[0, 5, 10].map((i) => (
          <text key={i} x={msX(vernierMark(zero, i))} y={MS.y + 21} textAnchor="middle" className="fill-sky-800 text-[9px] tabular-nums dark:fill-sky-300">
            {i}
          </text>
        ))}

        {/* How the reading is taken */}
        <line x1={msX(msr)} y1={MS.y + 30} x2={msX(zero)} y2={MS.y + 30} strokeWidth={1} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={msX(zero)} y1={MS.y + 26} x2={msX(zero)} y2={MS.y + 34} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={msX(msr) - 4} y={MS.y + 44} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
          zero past 23 mm
        </text>
        <text x={198} y={MS.y + 16} className={AMBER_TEXT}>
          6th mark lines up
        </text>

        <g className="text-[11px] tabular-nums">
          <text x={8} y={124} className="fill-foreground">
            1 VSD = 9/10 MSD = 0.9 mm
          </text>
          <text x={8} y={140} className="fill-foreground font-semibold">
            LC = 1 MSD − 1 VSD = 1 − 0.9 = {lc.toFixed(1)} mm
          </text>
          <text x={8} y={156} className="fill-foreground">
            reading = {msr} + {k} × {lc.toFixed(1)} = {(msr + k * lc).toFixed(1)} mm
          </text>
        </g>

        <line x1={8} y1={166} x2={312} y2={166} className="stroke-border" />
        <text x={8} y={178} className="fill-foreground text-[11px] font-semibold">
          Screw gauge: pitch 0.5 mm, 50 divisions
        </text>

        {/* Sleeve with its linear scale, and the thimble's edge */}
        <rect x={14} y={SG.line - 14} width={edge - 14} height={28} className="fill-slate-100 dark:fill-slate-800/60" />
        <line x1={14} y1={SG.line} x2={edge} y2={SG.line} className="stroke-foreground" />
        {Array.from({ length: 12 }, (_, i) => i * 0.5).map((mm) => (
          <line
            key={mm}
            x1={sgX(mm)}
            y1={SG.line}
            x2={sgX(mm)}
            y2={Number.isInteger(mm) ? SG.line - 7 : SG.line + 6}
            className="stroke-foreground"
          />
        ))}
        {[0, 5].map((mm) => (
          <text key={mm} x={sgX(mm)} y={SG.line - 9} textAnchor="middle" className="fill-foreground text-[9px] tabular-nums">
            {mm}
          </text>
        ))}
        <rect x={edge} y={SG.line - 26} width={70} height={52} rx={3} className="fill-sky-100 dark:fill-sky-950/60" />
        <line x1={edge} y1={SG.line - 26} x2={edge} y2={SG.line + 26} strokeWidth={1.5} className="stroke-sky-700 dark:stroke-sky-300" />
        {circ.map((d) => {
          const y = r2(SG.line - (d - SCREW.circular) * SG.divUnit);
          return (
            <line
              key={d}
              x1={edge}
              y1={y}
              x2={edge + (d % 5 === 0 ? 10 : 6)}
              y2={y}
              strokeWidth={d === SCREW.circular ? 2 : 1}
              className={d === SCREW.circular ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-sky-700 dark:stroke-sky-300"}
            />
          );
        })}
        {[25, 30].map((d) => (
          <text key={d} x={edge + 13} y={r2(SG.line - (d - SCREW.circular) * SG.divUnit + 3)} className="fill-sky-800 text-[9px] tabular-nums dark:fill-sky-300">
            {d}
          </text>
        ))}
        <text x={edge + 30} y={SG.line + 4} className={AMBER_TEXT}>
          28 on the line
        </text>

        <g className="text-[11px] tabular-nums">
          <text x={8} y={248} className="fill-foreground font-semibold">
            LC = pitch ÷ divisions = 0.5 ÷ 50 = {sLC.toFixed(2)} mm
          </text>
          <text x={8} y={262} className="fill-foreground">
            reading = {SCREW.sleeve} + {SCREW.circular} × {sLC.toFixed(2)} = {screwReading().toFixed(2)} mm
          </text>
        </g>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The vernier&apos;s marks are each 0.1 mm shorter than the main scale&apos;s, so the first falls short of a main mark by one least count,
        the second by two, and the 6th lines up after six. Reading = main-scale reading + coinciding division × LC. For 25 VSD = 24 MSD with
        1 MSD = 0.5 mm: LC = (1 − 24/25) × 0.5 = 0.02 mm. LC is a difference, never MSD times the number of divisions.
      </p>
    </div>
  );
}
