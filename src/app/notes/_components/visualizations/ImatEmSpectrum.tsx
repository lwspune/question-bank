/**
 * Diagram: the electromagnetic spectrum (concept imat-osw-em-spectrum), in the
 * concept's order of increasing wavelength: gamma, X-rays, ultraviolet,
 * visible, infrared, microwaves, radio. Wavelength grows to the right, so
 * frequency and photon energy grow to the left. The regions are drawn the
 * same width (the real spectrum spans many powers of ten), with the concept's
 * boundary wavelengths written under the edges. The visible band is opened
 * out below it, violet (about 400 nm) to red (about 700 nm), and each region
 * gets a use from the concept's table.
 *
 * Every boundary and use is exported and pinned by
 * tests/notes-imat-visuals-phys.test.ts against the concept's table.
 */

export type EmBand = {
  name: string;
  /** Two short lines for the label inside the strip. */
  label: readonly [string, string?];
  /** Lower and upper wavelength, in metres (0 and Infinity for the open ends). */
  minM: number;
  maxM: number;
  use: string;
};

/** The concept's table, in order of increasing wavelength. */
export const EM_BANDS: readonly EmBand[] = [
  { name: "gamma rays", label: ["gamma", "rays"], minM: 0, maxM: 1e-11, use: "radiotherapy, sterilising equipment" },
  { name: "X-rays", label: ["X-rays"], minM: 1e-11, maxM: 1e-8, use: "imaging bones and teeth, CT scans" },
  { name: "ultraviolet", label: ["ultra-", "violet"], minM: 1e-8, maxM: 400e-9, use: "sterilising water, vitamin D, sunburn" },
  { name: "visible light", label: ["visible"], minM: 400e-9, maxM: 700e-9, use: "sight, optical fibres, photosynthesis" },
  { name: "infrared", label: ["infra-", "red"], minM: 700e-9, maxM: 1e-3, use: "heat, remote controls, thermal cameras" },
  { name: "microwaves", label: ["micro-", "waves"], minM: 1e-3, maxM: 0.3, use: "microwave ovens, mobile phones, radar" },
  { name: "radio waves", label: ["radio", "waves"], minM: 0.3, maxM: Infinity, use: "radio and TV, MRI scanners" },
];

/** The wavelengths written under the six boundaries between neighbouring regions. */
export const BOUNDARY_LABELS: readonly string[] = ["10⁻¹¹ m", "10 nm", "400 nm", "700 nm", "1 mm", "30 cm"];

/** The visible band opened out, in nm (approximate colour edges). */
export const VISIBLE_COLOURS = [
  { name: "violet", fromNm: 400, toNm: 450, cls: "fill-violet-600 dark:fill-violet-500" },
  { name: "blue", fromNm: 450, toNm: 495, cls: "fill-blue-600 dark:fill-blue-500" },
  { name: "green", fromNm: 495, toNm: 570, cls: "fill-green-500 dark:fill-green-500" },
  { name: "yellow", fromNm: 570, toNm: 590, cls: "fill-yellow-400 dark:fill-yellow-400" },
  { name: "orange", fromNm: 590, toNm: 620, cls: "fill-orange-500 dark:fill-orange-500" },
  { name: "red", fromNm: 620, toNm: 700, cls: "fill-red-600 dark:fill-red-500" },
] as const;

/** Index of the region the ionising bracket stops inside (high-energy ultraviolet). */
export const IONISING_THROUGH = 2;

const BAND_FILL = [
  "fill-fuchsia-200 dark:fill-fuchsia-900",
  "fill-purple-200 dark:fill-purple-900",
  "fill-violet-200 dark:fill-violet-900",
  "",
  "fill-rose-200 dark:fill-rose-900",
  "fill-orange-200 dark:fill-orange-900",
  "fill-amber-100 dark:fill-amber-900",
] as const;

// Geometry (viewBox units).
const X0 = 12;
const X1 = 308;
const BW = (X1 - X0) / EM_BANDS.length;
const STRIP = { top: 34, h: 32 };
const BAR = { x0: 30, x1: 290, top: 128, h: 18 };
const nmX = (nm: number) => BAR.x0 + ((nm - 400) / 300) * (BAR.x1 - BAR.x0);
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function ImatEmSpectrum() {
  const visX = X0 + 3 * BW;
  const ionEnd = X0 + (IONISING_THROUGH + 0.5) * BW;
  const stripBottom = STRIP.top + STRIP.h;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the electromagnetic spectrum
      </p>
      <svg
        viewBox="0 0 320 356"
        className="block h-auto w-full"
        role="img"
        aria-label="The electromagnetic spectrum in order of increasing wavelength: gamma rays below 10 to the minus 11 metres, X-rays up to 10 nanometres, ultraviolet up to 400 nanometres, visible light from 400 to 700 nanometres, infrared up to 1 millimetre, microwaves up to 30 centimetres, then radio waves. Frequency and photon energy rise the other way. Gamma, X-rays and high-energy ultraviolet are ionising."
      >
        {/* Ionising bracket: gamma, X-rays and the high-energy end of ultraviolet. */}
        <path
          d={`M ${X0} 30 V 25 H ${r2(ionEnd)} V 30`}
          fill="none"
          className="stroke-fuchsia-700 dark:stroke-fuchsia-300"
          strokeWidth={1.2}
        />
        <text x={r2((X0 + ionEnd) / 2)} y={20} textAnchor="middle" className="fill-fuchsia-800 text-[10px] font-semibold dark:fill-fuchsia-200">
          ionising
        </text>
        <text x={r2(visX + BW / 2)} y={28} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          visible
        </text>

        {/* The strip of regions. */}
        {EM_BANDS.map((b, i) => {
          const x = X0 + i * BW;
          if (i === 3) {
            return (
              <g key={b.name}>
                {VISIBLE_COLOURS.map((c) => (
                  <rect
                    key={c.name}
                    x={r2(x + ((c.fromNm - 400) / 300) * BW)}
                    y={STRIP.top}
                    width={r2(((c.toNm - c.fromNm) / 300) * BW)}
                    height={STRIP.h}
                    className={c.cls}
                  />
                ))}
              </g>
            );
          }
          const [l1, l2] = b.label;
          return (
            <g key={b.name}>
              <rect x={r2(x)} y={STRIP.top} width={r2(BW)} height={STRIP.h} className={BAND_FILL[i]} />
              <text x={r2(x + BW / 2)} y={l2 ? STRIP.top + 14 : STRIP.top + 20} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {l1}
              </text>
              {l2 && (
                <text x={r2(x + BW / 2)} y={STRIP.top + 26} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                  {l2}
                </text>
              )}
            </g>
          );
        })}
        <rect x={X0} y={STRIP.top} width={X1 - X0} height={STRIP.h} fill="none" className="stroke-border" />

        {/* Boundary wavelengths under the edges. */}
        {BOUNDARY_LABELS.map((t, i) => {
          const x = r2(X0 + (i + 1) * BW);
          return (
            <g key={t}>
              <line x1={x} y1={stripBottom} x2={x} y2={stripBottom + 5} className="stroke-muted-foreground" />
              <text x={x} y={stripBottom + 15} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
                {t}
              </text>
            </g>
          );
        })}

        {/* The visible band opened out. */}
        <line x1={r2(visX)} y1={stripBottom + 20} x2={BAR.x0} y2={BAR.top} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <line x1={r2(visX + BW)} y1={stripBottom + 20} x2={BAR.x1} y2={BAR.top} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <text x={160} y={BAR.top - 8} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          visible light, opened out
        </text>
        {VISIBLE_COLOURS.map((c) => (
          <rect key={c.name} x={r2(nmX(c.fromNm))} y={BAR.top} width={r2(nmX(c.toNm) - nmX(c.fromNm))} height={BAR.h} className={c.cls} />
        ))}
        {[400, 500, 600, 700].map((nm) => (
          <g key={nm}>
            <line x1={r2(nmX(nm))} y1={BAR.top + BAR.h} x2={r2(nmX(nm))} y2={BAR.top + BAR.h + 4} className="stroke-muted-foreground" />
            <text x={r2(nmX(nm))} y={BAR.top + BAR.h + 14} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {nm} nm
            </text>
          </g>
        ))}
        <text x={BAR.x0} y={BAR.top + BAR.h + 27} className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          violet
        </text>
        <text x={BAR.x1} y={BAR.top + BAR.h + 27} textAnchor="end" className="fill-red-700 text-[10px] font-semibold dark:fill-red-300">
          red
        </text>

        {/* Direction arrows. */}
        <text x={160} y={204} textAnchor="middle" className="fill-foreground text-[11px]">
          wavelength gets longer
        </text>
        <line x1={20} y1={210} x2={296} y2={210} className="stroke-foreground" strokeWidth={1.2} />
        <polygon points="302,210 294,206 294,214" className="fill-foreground" />
        <line x1={24} y1={222} x2={300} y2={222} className="stroke-foreground" strokeWidth={1.2} />
        <polygon points="18,222 26,218 26,226" className="fill-foreground" />
        <text x={160} y={236} textAnchor="middle" className="fill-foreground text-[11px]">
          frequency and photon energy get higher
        </text>

        {/* One use per region, from the concept's table. */}
        <text x={X0} y={256} className="fill-foreground text-[11px] font-semibold">
          Uses
        </text>
        {EM_BANDS.map((b, i) => (
          <text key={b.name} x={X0} y={272 + i * 13} className="fill-muted-foreground text-[10px]">
            <tspan className="fill-foreground font-semibold">{b.name}:</tspan> {b.use}
          </text>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Not to scale: each region is drawn the same width, though together they span many powers of ten. All of
        them travel at 3.00 × 10⁸ m/s in a vacuum (c = fλ), so a shorter wavelength means a higher frequency and
        a more energetic photon (E = hf).
      </p>
    </div>
  );
}
