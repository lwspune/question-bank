/**
 * Static figure: a sun-synchronous orbit and a geostationary orbit are two
 * different orbits (concept sscfassp-satellites).
 *
 * Sun-synchronous: near-polar and low; the satellite passes each place at the
 * same local solar time. Geostationary: over the equator, about 36,000 km up,
 * one day per orbit. The concept gives no height for the low orbit, so the
 * drawing is not to scale. Values pinned by tests/notes-w2-10.test.ts.
 * Server component.
 */

export type OrbitFact = { name: string; plane: string; height: string; extra: string };

export const ORBITS: readonly OrbitFact[] = [
  { name: "Sun-synchronous", plane: "near-polar", height: "low", extra: "same local solar time over each place" },
  { name: "Geostationary", plane: "over the equator", height: "about 36,000 km up", extra: "one orbit a day" },
];

export const GEO_HEIGHT_KM = 36000;

const EARTH = { x: 160, y: 104, r: 30 };
/** Drawn orbit sizes (not to scale): the near-polar one hugs the Earth, the equatorial one is far out. */
export const POLAR_ORBIT = { rx: 14, ry: 44, tiltDeg: 12 };
export const GEO_ORBIT = { rx: 140, ry: 22 };

export default function SscSatelliteOrbits() {
  const tilt = (POLAR_ORBIT.tiltDeg * Math.PI) / 180;
  // satellite on the polar orbit, at its top end
  const sx = Math.round((EARTH.x + Math.sin(tilt) * POLAR_ORBIT.ry) * 100) / 100;
  const sy = Math.round((EARTH.y - Math.cos(tilt) * POLAR_ORBIT.ry) * 100) / 100;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two different orbits
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="The Earth with two orbits, not to scale. A sun-synchronous orbit runs close to the Earth, nearly over the poles; its satellite passes each place at the same local solar time. A geostationary orbit lies over the equator, about 36,000 kilometres up, and takes one day per orbit."
      >
        {/* far half of the geostationary ring, behind the Earth */}
        <path
          d={`M ${EARTH.x - GEO_ORBIT.rx} ${EARTH.y} A ${GEO_ORBIT.rx} ${GEO_ORBIT.ry} 0 0 1 ${EARTH.x + GEO_ORBIT.rx} ${EARTH.y}`}
          fill="none"
          className="stroke-amber-500 dark:stroke-amber-400"
          strokeWidth={1.4}
          strokeDasharray="4 3"
        />
        <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} className="fill-sky-200 stroke-sky-600 dark:fill-sky-900 dark:stroke-sky-400" strokeWidth={1.2} />
        <line x1={EARTH.x - EARTH.r} y1={EARTH.y} x2={EARTH.x + EARTH.r} y2={EARTH.y} className="stroke-sky-700 dark:stroke-sky-300" strokeWidth={1} strokeDasharray="3 2" />
        <text x={EARTH.x - 10} y={EARTH.y - EARTH.r - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          N
        </text>
        <text x={EARTH.x + 10} y={EARTH.y + EARTH.r + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          S
        </text>
        <text x={EARTH.x - EARTH.r - 4} y={EARTH.y + 4} textAnchor="end" className="fill-sky-800 text-[10px] dark:fill-sky-200">
          equator
        </text>

        {/* the near-polar, low orbit */}
        <ellipse
          cx={EARTH.x}
          cy={EARTH.y}
          rx={POLAR_ORBIT.rx}
          ry={POLAR_ORBIT.ry}
          transform={`rotate(${POLAR_ORBIT.tiltDeg} ${EARTH.x} ${EARTH.y})`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth={1.8}
        />
        <circle cx={sx} cy={sy} r={4} className="fill-emerald-600 dark:fill-emerald-400" />

        {/* near half of the geostationary ring, in front */}
        <path
          d={`M ${EARTH.x - GEO_ORBIT.rx} ${EARTH.y} A ${GEO_ORBIT.rx} ${GEO_ORBIT.ry} 0 0 0 ${EARTH.x + GEO_ORBIT.rx} ${EARTH.y}`}
          fill="none"
          className="stroke-amber-500 dark:stroke-amber-400"
          strokeWidth={1.8}
        />
        <circle cx={EARTH.x + 60} cy={Math.round((EARTH.y + GEO_ORBIT.ry * Math.sqrt(1 - (60 / GEO_ORBIT.rx) ** 2)) * 100) / 100} r={4} className="fill-amber-500 dark:fill-amber-400" />

        {/* labels */}
        <text x={8} y={16} className="fill-emerald-700 text-[11px] font-bold dark:fill-emerald-300">
          {ORBITS[0].name}
        </text>
        <text x={8} y={29} className="fill-foreground text-[10px]">
          {ORBITS[0].plane}, {ORBITS[0].height}
        </text>
        <text x={8} y={42} className="fill-muted-foreground text-[10px]">
          same local solar time
        </text>
        <text x={8} y={54} className="fill-muted-foreground text-[10px]">
          over each place
        </text>
        <line x1={106} y1={22} x2={sx - 5} y2={sy - 3} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={1} />

        <text x={312} y={160} textAnchor="end" className="fill-amber-700 text-[11px] font-bold dark:fill-amber-300">
          {ORBITS[1].name}
        </text>
        <text x={312} y={173} textAnchor="end" className="fill-foreground text-[10px]">
          {ORBITS[1].plane}, {ORBITS[1].height}
        </text>
        <text x={312} y={186} textAnchor="end" className="fill-muted-foreground text-[10px]">
          {ORBITS[1].extra}
        </text>
        <text x={8} y={206} className="fill-muted-foreground text-[10px] italic">
          not to scale
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        A sun-synchronous orbit is not a geostationary one: one is low and near-polar, the other high and over the equator.
      </p>
    </div>
  );
}
