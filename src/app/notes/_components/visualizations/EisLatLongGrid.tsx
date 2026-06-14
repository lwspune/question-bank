/**
 * The geographical grid on a globe: parallels of latitude (run east-west,
 * shrink toward the poles) and meridians of longitude (run pole to pole, all
 * equal length, converge at the poles). Equator, Tropics, Arctic/Antarctic
 * Circles and the Prime Meridian labelled. Static SVG, server component.
 */
export default function EisLatLongGrid() {
  const cx = 150;
  const cy = 150;
  const r = 120;
  // parallels at given latitude (deg): y offset = -r*sin(lat), x radius = r*cos(lat)
  const parallels = [
    { lat: 66.5, label: "Arctic Circle" },
    { lat: 23.5, label: "Tropic of Cancer" },
    { lat: 0, label: "Equator (longest)" },
    { lat: -23.5, label: "Tropic of Capricorn" },
    { lat: -66.5, label: "Antarctic Circle" },
  ];
  const rad = (d: number) => (d * Math.PI) / 180;
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 460 300"
        className="w-full"
        role="img"
        aria-label="A globe with the geographical grid. Parallels of latitude run east to west around the globe and get shorter toward the poles, so the Equator at zero degrees is the longest parallel. Meridians of longitude run from the North Pole to the South Pole, are all equal in length, and converge at the two poles. The Equator, Tropic of Cancer, Tropic of Capricorn, Arctic Circle, Antarctic Circle and Prime Meridian are marked."
      >
        {/* globe outline */}
        <circle cx={cx} cy={cy} r={r} className="fill-sky-100/50 stroke-slate-500 dark:fill-sky-950/30" strokeWidth="1.5" />

        {/* meridians (ellipses through the poles) */}
        {[0.35, 0.7, 1].map((k, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={r * k}
            ry={r}
            className="fill-none stroke-indigo-400/70"
            strokeWidth="1"
          />
        ))}
        {/* prime meridian = central vertical */}
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} className="stroke-rose-600" strokeWidth="1.6" />

        {/* parallels */}
        {parallels.map((p) => {
          const y = cy - r * Math.sin(rad(p.lat));
          const rx = r * Math.cos(rad(p.lat));
          const isEq = p.lat === 0;
          return (
            <g key={p.label}>
              <ellipse
                cx={cx}
                cy={y}
                rx={rx}
                ry={rx * 0.18}
                className={
                  isEq
                    ? "fill-none stroke-emerald-600"
                    : "fill-none stroke-slate-400/80"
                }
                strokeWidth={isEq ? "1.8" : "1"}
                strokeDasharray={isEq ? undefined : "3 2"}
              />
              <text
                x={cx + r + 8}
                y={y + 2}
                className={isEq ? "fill-emerald-700 dark:fill-emerald-300" : "fill-slate-600 dark:fill-slate-300"}
                fontSize="8"
                fontWeight={isEq ? "700" : "500"}
              >
                {p.label}
              </text>
              <line
                x1={cx + rx}
                y1={y}
                x2={cx + r + 6}
                y2={y}
                className="stroke-slate-300"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            </g>
          );
        })}

        {/* poles */}
        <circle cx={cx} cy={cy - r} r="3" className="fill-slate-700 dark:fill-slate-200" />
        <text x={cx + 6} y={cy - r + 2} className="fill-slate-600 dark:fill-slate-300" fontSize="7.5">North Pole</text>
        <circle cx={cx} cy={cy + r} r="3" className="fill-slate-700 dark:fill-slate-200" />
        <text x={cx + 6} y={cy + r + 8} className="fill-slate-600 dark:fill-slate-300" fontSize="7.5">South Pole</text>

        <text x={cx} y={cy - r - 8} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="7.5" fontWeight="600">Prime Meridian (0 deg)</text>
        <text x="20" y="292" className="fill-slate-500" fontSize="7.5">Meridians: all equal length, meet at poles. Parallels: shrink toward poles.</text>
      </svg>
    </div>
  );
}
