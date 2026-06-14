/**
 * Time-zone strip: the Earth is split into 24 zones, 15 degrees of longitude per
 * hour. Going EAST adds time; going WEST subtracts. The Prime Meridian (0 deg)
 * sets GMT and the 180-degree meridian carries the International Date Line, where
 * the date changes. Static SVG, server component.
 */
export default function EisTimeZonesIdl() {
  // marks every 45 deg from 180 W to 180 E across the strip
  const marks = [
    { lon: -180, label: "180 W" },
    { lon: -90, label: "90 W" },
    { lon: 0, label: "0 (GMT)" },
    { lon: 90, label: "90 E" },
    { lon: 180, label: "180 E" },
  ];
  const x0 = 40;
  const x1 = 440;
  const y = 90;
  const xFor = (lon: number) => x0 + ((lon + 180) / 360) * (x1 - x0);
  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 460 180"
        className="w-full"
        role="img"
        aria-label="A strip of the Earth showing time zones. The Earth turns 360 degrees in 24 hours, so 15 degrees of longitude equals 1 hour. The Prime Meridian at 0 degrees sets Greenwich Mean Time. Moving east of the Prime Meridian adds time, moving west subtracts time. The 180-degree meridian carries the International Date Line, where the calendar date changes by one day."
      >
        {/* strip */}
        <rect x={x0} y={y - 22} width={x1 - x0} height="44" className="fill-sky-100/60 stroke-slate-500 dark:fill-sky-950/30" strokeWidth="1.2" />

        {/* 15-deg zone ticks */}
        {Array.from({ length: 25 }).map((_, i) => {
          const lon = -180 + i * 15;
          const x = xFor(lon);
          return <line key={i} x1={x} y1={y - 22} x2={x} y2={y + 22} className="stroke-slate-300/70" strokeWidth="0.6" />;
        })}

        {/* prime meridian */}
        <line x1={xFor(0)} y1={y - 30} x2={xFor(0)} y2={y + 30} className="stroke-rose-600" strokeWidth="1.8" />
        {/* date line at 180 (both edges) */}
        <line x1={x0} y1={y - 30} x2={x0} y2={y + 30} className="stroke-indigo-600" strokeWidth="1.8" strokeDasharray="4 2" />
        <line x1={x1} y1={y - 30} x2={x1} y2={y + 30} className="stroke-indigo-600" strokeWidth="1.8" strokeDasharray="4 2" />

        {/* labels */}
        {marks.map((m) => (
          <text key={m.label} x={xFor(m.lon)} y={y + 40} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="7.5" fontWeight="600">
            {m.label}
          </text>
        ))}

        {/* west subtracts / east adds arrows */}
        <line x1={xFor(0) - 12} y1={y - 40} x2={xFor(-90)} y2={y - 40} className="stroke-slate-500" strokeWidth="1.2" />
        <path d={`M ${xFor(-90)} ${y - 40} l 6 -3 m -6 3 l 6 3`} className="stroke-slate-500" strokeWidth="1.2" fill="none" />
        <text x={xFor(-90) + 30} y={y - 44} className="fill-slate-600 dark:fill-slate-300" fontSize="8" fontWeight="600">WEST: subtract time</text>

        <line x1={xFor(0) + 12} y1={y - 40} x2={xFor(90)} y2={y - 40} className="stroke-emerald-600" strokeWidth="1.2" />
        <path d={`M ${xFor(90)} ${y - 40} l -6 -3 m 6 3 l -6 3`} className="stroke-emerald-600" strokeWidth="1.2" fill="none" />
        <text x={xFor(90) - 80} y={y - 44} className="fill-emerald-700 dark:fill-emerald-300" fontSize="8" fontWeight="600">EAST: add time</text>

        <text x="50" y="22" className="fill-rose-700 dark:fill-rose-300" fontSize="8" fontWeight="600">15 deg of longitude = 1 hour</text>
        <text x={x1 - 6} y={y + 56} textAnchor="end" className="fill-indigo-700 dark:fill-indigo-300" fontSize="7.5" fontWeight="600">180 deg = International Date Line (date changes)</text>
      </svg>
    </div>
  );
}
