/**
 * The three Indian cropping seasons laid out on a 12-month calendar strip:
 * Kharif (monsoon, sown Jun-Jul, harvested Sep-Oct), Rabi (winter, sown
 * Oct-Nov, harvested Mar-Apr) and Zaid (short summer, Mar-Jun). Static SVG,
 * server component.
 */
export default function IgeCroppingCalendar() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const x0 = 40;
  const cellW = 38;
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 500 190"
        className="w-full"
        role="img"
        aria-label="A 12-month calendar of India's three cropping seasons. Kharif crops (rice, bajra, cotton) are sown in June-July with the monsoon and harvested in September-October. Rabi crops (wheat, barley, mustard) are sown in October-November in the cool winter and harvested in March-April. Zaid crops (watermelon, cucumber) occupy the short summer months from March to June."
      >
        {/* month axis */}
        {months.map((m, i) => (
          <text
            key={i}
            x={x0 + i * cellW + cellW / 2}
            y="28"
            textAnchor="middle"
            className="fill-slate-500"
            fontSize="9"
          >
            {m}
          </text>
        ))}
        <line x1={x0} y1="34" x2={x0 + 12 * cellW} y2="34" className="stroke-slate-300" strokeWidth="1" />

        {/* Kharif: Jun(5) -> Oct(9) */}
        <rect x={x0 + 5 * cellW} y="44" width={5 * cellW} height="28" rx="5" className="fill-emerald-300/70 stroke-emerald-700 dark:fill-emerald-900/50" strokeWidth="1" />
        <text x={x0 + 7.5 * cellW} y="62" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="10" fontWeight="700">Kharif</text>
        <text x="36" y="62" textAnchor="end" className="fill-slate-600 dark:fill-slate-300" fontSize="8">monsoon</text>
        <text x={x0 + 7.5 * cellW} y="84" textAnchor="middle" className="fill-slate-500" fontSize="7">rice, bajra, cotton</text>

        {/* Rabi: Oct(9) -> wrap to Apr(3 next year); draw Oct-Dec then Jan-Apr */}
        <rect x={x0 + 9 * cellW} y="98" width={3 * cellW} height="28" rx="5" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1" />
        <rect x={x0} y="98" width={4 * cellW} height="28" rx="5" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1" />
        <text x={x0 + 2 * cellW} y="116" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="10" fontWeight="700">Rabi</text>
        <text x="36" y="116" textAnchor="end" className="fill-slate-600 dark:fill-slate-300" fontSize="8">winter</text>
        <text x={x0 + 2 * cellW} y="138" textAnchor="middle" className="fill-slate-500" fontSize="7">wheat, barley, mustard</text>

        {/* Zaid: Mar(2) -> Jun(5) */}
        <rect x={x0 + 2 * cellW} y="150" width={3 * cellW} height="26" rx="5" className="fill-amber-300/70 stroke-amber-700 dark:fill-amber-900/50" strokeWidth="1" />
        <text x={x0 + 3.5 * cellW} y="167" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="10" fontWeight="700">Zaid</text>
        <text x="36" y="167" textAnchor="end" className="fill-slate-600 dark:fill-slate-300" fontSize="8">summer</text>
        <text x={x0 + 9 * cellW} y="167" textAnchor="middle" className="fill-slate-500" fontSize="7">melon, cucumber</text>
      </svg>
    </div>
  );
}
