/**
 * Side-view cross-sections of a warm front and a cold front. At a warm front
 * advancing warm air rides gently up and over retreating cold air (a shallow
 * slope, steady rain). At a cold front advancing cold air shoves under warm air
 * and lifts it steeply, building towering clouds and thunderstorms. Static SVG,
 * server component.
 */
export default function ClimWarmColdFront() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 440 240"
        className="w-full"
        role="img"
        aria-label="Two front cross-sections. On the left a warm front: advancing warm air rides gently up and over a wedge of retreating cold air on a shallow slope, giving steady widespread rain. On the right a cold front: advancing cold air pushes under the warm air and lifts it steeply, building tall clouds and thunderstorms."
      >
        {/* ground */}
        <line x1="10" y1="200" x2="430" y2="200" className="stroke-amber-700" strokeWidth="2" />

        {/* === WARM FRONT (left) === */}
        <text x="100" y="22" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Warm front</text>
        {/* cold air wedge (retreating, on the left) */}
        <path d="M 20 200 L 20 120 Q 90 165 180 200 Z" className="fill-sky-300/60 stroke-sky-700" strokeWidth="0.8" />
        <text x="50" y="180" className="fill-sky-800 dark:fill-sky-300" fontSize="7" fontWeight="600">Cold air</text>
        {/* warm air riding up the shallow slope */}
        <path d="M 180 200 Q 90 165 20 120 L 20 100 Q 110 150 200 195 Z" className="fill-rose-300/50 stroke-rose-600" strokeWidth="0.8" />
        <text x="150" y="120" className="fill-rose-800 dark:fill-rose-300" fontSize="7" fontWeight="600">Warm air rises gently</text>
        {/* steady rain */}
        <text x="70" y="100" className="fill-slate-500" fontSize="6.5">steady, widespread rain</text>
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={50 + i * 12} y1="148" x2={47 + i * 12} y2="160" className="stroke-indigo-500" strokeWidth="1" />
        ))}

        {/* === COLD FRONT (right) === */}
        <text x="340" y="22" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">Cold front</text>
        {/* advancing cold air wedge (steep, on the right pushing left) */}
        <path d="M 420 200 L 420 90 Q 360 120 320 200 Z" className="fill-sky-300/60 stroke-sky-700" strokeWidth="0.8" />
        <text x="385" y="175" className="fill-sky-800 dark:fill-sky-300" fontSize="7" fontWeight="600">Cold air</text>
        {/* warm air forced up steeply */}
        <path d="M 320 200 Q 360 120 350 60 Q 320 110 270 200 Z" className="fill-rose-300/50 stroke-rose-600" strokeWidth="0.8" />
        <text x="262" y="120" className="fill-rose-800 dark:fill-rose-300" fontSize="7" fontWeight="600">Warm air lifted steeply</text>
        {/* towering storm cloud */}
        <ellipse cx="338" cy="58" rx="34" ry="16" className="fill-slate-400/70 stroke-slate-600" strokeWidth="0.8" />
        <text x="338" y="44" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5">thunderstorm</text>
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1={322 + i * 11} y1="74" x2={319 + i * 11} y2="88" className="stroke-indigo-600" strokeWidth="1.4" />
        ))}
      </svg>
    </div>
  );
}
