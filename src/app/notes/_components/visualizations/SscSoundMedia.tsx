/**
 * Static figure: a sound wave crossing from air into water (concept
 * sscfsoso-waves).
 *
 * The concept's own self-check: a 500 Hz sound goes from air (340 m/s) into
 * water (1,500 m/s). The source fixes the frequency, so it stays 500 Hz; the
 * medium fixes the speed; the wavelength λ = v ÷ f grows from 0.68 m to 3 m.
 * The drawn wavelengths keep that ratio (1,500 ÷ 340), and the wave is
 * continuous at the boundary. Values pinned by tests/notes-ssc-visuals-gk.test.ts.
 * Server component, no client state.
 */

/** The concept's self-check numbers. */
export const SOUND = {
  frequencyHz: 500,
  air: { name: "Air", speed: 340 },
  water: { name: "Water", speed: 1500 },
} as const;

/** λ = v ÷ f, in metres. */
export function wavelengthM(speed: number, frequencyHz: number): number {
  return speed / frequencyHz;
}

/** Drawn length of one wavelength in air (SVG units). */
export const AIR_WAVE_PX = 24;
/** Drawn length of one wavelength in water: same ratio as the real wavelengths. */
export const WATER_WAVE_PX = AIR_WAVE_PX * (SOUND.water.speed / SOUND.air.speed);

export const WAVE_LEFT = 16;
export const BOUNDARY_X = 160;
export const WAVE_RIGHT = 308;
const MID_Y = 112;
const AMP = 16;

/** Phase (in cycles) of the wave at x: continuous across the boundary. */
export function phaseAt(x: number): number {
  if (x <= BOUNDARY_X) return (x - WAVE_LEFT) / AIR_WAVE_PX;
  return (BOUNDARY_X - WAVE_LEFT) / AIR_WAVE_PX + (x - BOUNDARY_X) / WATER_WAVE_PX;
}

function wavePath(): string {
  const pts: string[] = [];
  for (let x = WAVE_LEFT; x <= WAVE_RIGHT; x += 1) {
    const y = MID_Y - AMP * Math.sin(2 * Math.PI * phaseAt(x));
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
}

const fmt = (m: number) => (Number.isInteger(m) ? `${m}` : m.toFixed(2));

function Bracket({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className="stroke-foreground" strokeWidth={1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} className="stroke-foreground" strokeWidth={1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} className="stroke-foreground" strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {label}
      </text>
    </g>
  );
}

export default function SscSoundMedia() {
  const f = SOUND.frequencyHz;
  const airL = wavelengthM(SOUND.air.speed, f);
  const waterL = wavelengthM(SOUND.water.speed, f);
  // Each bracket spans one full cycle, starting where the wave crosses its middle line.
  const airStart = WAVE_LEFT + 2 * AIR_WAVE_PX;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · sound passing from air into water
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="A 500 hertz sound wave travels from air into water. In air its speed is 340 metres per second and its wavelength 0.68 metres. In water the frequency is still 500 hertz, the speed is 1,500 metres per second and the wavelength is 3 metres."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Same frequency, longer wavelength in water
        </text>

        <rect x={BOUNDARY_X} y={26} width={156} height={166} className="fill-sky-100 dark:fill-sky-950/40" />
        <line x1={BOUNDARY_X} y1={26} x2={BOUNDARY_X} y2={192} className="stroke-sky-500 dark:stroke-sky-400" strokeWidth={1.5} />

        <text x={88} y={40} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
          {SOUND.air.name}
        </text>
        <text x={238} y={40} textAnchor="middle" className="fill-sky-800 text-[12px] font-bold dark:fill-sky-200">
          {SOUND.water.name}
        </text>

        <Bracket x1={airStart} x2={airStart + AIR_WAVE_PX} y={78} label={`λ = ${fmt(airL)} m`} />
        <Bracket x1={BOUNDARY_X} x2={BOUNDARY_X + WATER_WAVE_PX} y={78} label={`λ = ${fmt(waterL)} m`} />

        <path d={wavePath()} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.8} />

        <text x={88} y={152} textAnchor="middle" className="fill-foreground text-[11px]">
          f = {f} Hz
        </text>
        <text x={88} y={168} textAnchor="middle" className="fill-foreground text-[11px]">
          v = {SOUND.air.speed} m/s
        </text>
        <text x={88} y={184} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          λ = {SOUND.air.speed} ÷ {f} = {fmt(airL)} m
        </text>

        <text x={238} y={152} textAnchor="middle" className="fill-foreground text-[11px]">
          f = {f} Hz (unchanged)
        </text>
        <text x={238} y={168} textAnchor="middle" className="fill-foreground text-[11px]">
          v = 1,500 m/s (faster)
        </text>
        <text x={238} y={184} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          λ = 1,500 ÷ {f} = {fmt(waterL)} m
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        v = f × λ. The source fixes the frequency, the medium fixes the speed, so the wavelength adjusts: faster in water means a longer
        wavelength, not a shorter one.
      </p>
    </div>
  );
}
