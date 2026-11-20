/**
 * Static figure: the fields of a plane electromagnetic wave (concept
 * nphem-fields). The wave travels along z; E_x = E₀ sin(kz − ωt) is drawn in
 * the upright plane and B_y = B₀ sin(kz − ωt) in the flat plane, shown at
 * t = 0. E, B and the direction of travel are at right angles, the travel is
 * along E × B (x cross y gives z), and the two fields peak and pass through zero at
 * the same z (in phase). The numbers are the concept's worked example:
 * E₀ = 30 V/m, B₀ = E₀/c = 10⁻⁷ T. B is not drawn to scale against E (they
 * are in different units). Pinned by tests/notes-w2-02.test.ts. Server
 * component, no client state.
 */

/** The worked example. */
export const E0 = 30;
export const C = 3e8;
export const B0 = E0 / C;

/** Wavelengths drawn and their length on screen. */
export const WAVES = 2;
export const LAMBDA_PX = 120;
/** Where z = 0 sits, and the drawn amplitudes (viewBox units). */
export const ORIGIN = { x: 34, y: 112 } as const;
export const E_AMP = 58;
export const B_AMP = 50;
/** Screen direction of +y (towards the reader), drawn slanting down-left. */
export const Y_DIR = { x: -0.6, y: 0.45 } as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Field value as a fraction of its amplitude at z (in wavelengths), t = 0. */
export const phase = (z: number) => Math.sin(2 * Math.PI * z);

/** Screen point of the E curve at z (wavelengths): E along x, drawn upward. */
export function ePoint(z: number): { x: number; y: number } {
  return { x: r2(ORIGIN.x + z * LAMBDA_PX), y: r2(ORIGIN.y - E_AMP * phase(z)) };
}

/** Screen point of the B curve at z: B along y, drawn slanting. */
export function bPoint(z: number): { x: number; y: number } {
  const b = B_AMP * phase(z);
  return { x: r2(ORIGIN.x + z * LAMBDA_PX + Y_DIR.x * b), y: r2(ORIGIN.y + Y_DIR.y * b) };
}

/** Axis point at z. */
export const axisPoint = (z: number) => ({ x: r2(ORIGIN.x + z * LAMBDA_PX), y: ORIGIN.y });

/** z values (wavelengths) of the field arrows: every eighth of a wavelength. */
export const ARROW_Z: readonly number[] = Array.from({ length: WAVES * 8 + 1 }, (_, i) => i / 8);

function curve(f: (z: number) => { x: number; y: number }): string {
  const pts: string[] = [];
  for (let k = 0; k <= WAVES * 60; k++) {
    const p = f(k / 60);
    pts.push(`${p.x},${p.y}`);
  }
  return pts.join(" ");
}

export default function NeetEmWaveFields() {
  const end = axisPoint(WAVES);
  const crest = 1.25;
  const eTop = ePoint(crest);
  const bTop = bPoint(crest);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the electric and magnetic fields of a plane wave
      </p>
      <svg
        viewBox="0 0 320 212"
        className="block h-auto w-full"
        role="img"
        aria-label="A plane electromagnetic wave travelling along z. The electric field oscillates along x in the upright plane, the magnetic field along y in the flat plane. Both are at right angles to each other and to the direction of travel, and they peak and pass through zero at the same places: in phase."
      >
        {/* E field arrows (along x) */}
        {ARROW_Z.map((z) => {
          const a = axisPoint(z);
          const p = ePoint(z);
          return <line key={`e${z}`} x1={a.x} y1={a.y} x2={p.x} y2={p.y} strokeWidth={0.9} className="stroke-sky-500/70 dark:stroke-sky-400/70" />;
        })}
        {/* B field arrows (along y) */}
        {ARROW_Z.map((z) => {
          const a = axisPoint(z);
          const p = bPoint(z);
          return <line key={`b${z}`} x1={a.x} y1={a.y} x2={p.x} y2={p.y} strokeWidth={0.9} className="stroke-rose-500/70 dark:stroke-rose-400/70" />;
        })}

        <polyline points={curve(bPoint)} fill="none" strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
        <polyline points={curve(ePoint)} fill="none" strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />

        {/* Direction of travel */}
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2={end.x + 32} y2={ORIGIN.y} strokeWidth={1.5} className="stroke-foreground" />
        <polygon points={`${end.x + 40},${ORIGIN.y} ${end.x + 31},${ORIGIN.y - 4} ${end.x + 31},${ORIGIN.y + 4}`} className="fill-foreground" />
        <text x={end.x + 42} y={ORIGIN.y - 8} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          z
        </text>

        {/* Labels */}
        <text x={eTop.x + 6} y={eTop.y + 2} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          E (along x)
        </text>
        <text x={bTop.x - 4} y={bTop.y + 14} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          B (along y)
        </text>
        <line x1={eTop.x} y1={eTop.y} x2={eTop.x} y2={ORIGIN.y} strokeDasharray="2 3" className="stroke-muted-foreground" />
        <text x={ePoint(0.25).x} y={ePoint(0.25).y - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          both peak at the same z
        </text>

        {/* The worked example */}
        <text x={160} y={180} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          E₀ = 30 V/m, so B₀ = E₀/c = 30/(3 × 10⁸) = 10⁻⁷ T
        </text>
        <text x={160} y={198} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          travel along E × B, at right angles to both fields
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Drawn at one instant. E and B rise and fall together (in phase) and E = cB at every point, so the magnetic field is tiny: B is drawn
        far larger than to scale. The wave travels along E × B (E along x and B along y give travel along z); B × E would point the other way.
      </p>
    </div>
  );
}
