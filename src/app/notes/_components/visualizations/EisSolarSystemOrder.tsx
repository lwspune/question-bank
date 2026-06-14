/**
 * Order of the eight planets outward from the Sun, split into the four rocky
 * terrestrial (inner) planets and the four giant (outer) planets, with the
 * asteroid belt between them. Circle size hints at relative planet size.
 * Static SVG, server component.
 */
export default function EisSolarSystemOrder() {
  const planets = [
    { name: "Mercury", x: 70, rad: 4, fill: "fill-stone-400" },
    { name: "Venus", x: 110, rad: 6, fill: "fill-amber-300" },
    { name: "Earth", x: 152, rad: 6.5, fill: "fill-sky-500" },
    { name: "Mars", x: 192, rad: 5, fill: "fill-rose-500" },
    { name: "Jupiter", x: 270, rad: 18, fill: "fill-orange-400" },
    { name: "Saturn", x: 330, rad: 15, fill: "fill-yellow-400" },
    { name: "Uranus", x: 380, rad: 10, fill: "fill-cyan-400" },
    { name: "Neptune", x: 420, rad: 10, fill: "fill-blue-500" },
  ];
  const baseY = 100;
  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 460 180"
        className="w-full"
        role="img"
        aria-label="The eight planets in order outward from the Sun: Mercury, Venus, Earth, Mars, then the asteroid belt, then Jupiter, Saturn, Uranus and Neptune. Mercury, Venus, Earth and Mars are the small rocky terrestrial planets and lie between the Sun and the asteroid belt. Jupiter, Saturn, Uranus and Neptune are the large gas and ice giant planets. Earth is the densest planet; Jupiter is the largest; Saturn is the least dense."
      >
        {/* Sun at left edge */}
        <circle cx="20" cy={baseY} r="22" className="fill-amber-300 stroke-amber-600" strokeWidth="1.4" />
        <text x="20" y={baseY + 3} textAnchor="middle" className="fill-amber-800" fontSize="8" fontWeight="700">Sun</text>

        {/* orbit baseline */}
        <line x1="44" y1={baseY} x2="450" y2={baseY} className="stroke-slate-300" strokeWidth="1" strokeDasharray="2 3" />

        {/* asteroid belt between Mars (192) and Jupiter (270) */}
        <rect x="214" y={baseY - 24} width="42" height="48" className="fill-stone-300/40 stroke-stone-500/40" strokeWidth="0.8" strokeDasharray="2 2" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx={216 + (i % 7) * 5.5}
            cy={baseY - 18 + (i < 7 ? 0 : 28)}
            r="1"
            className="fill-stone-500"
          />
        ))}
        <text x="235" y={baseY + 40} textAnchor="middle" className="fill-stone-600 dark:fill-stone-300" fontSize="6.5">Asteroid belt</text>

        {/* planets */}
        {planets.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={baseY} r={p.rad} className={`${p.fill} stroke-slate-600/50`} strokeWidth="0.8" />
            <text
              x={p.x}
              y={baseY - p.rad - 5}
              textAnchor="middle"
              className="fill-slate-700 dark:fill-slate-200"
              fontSize="7"
              fontWeight="600"
            >
              {p.name}
            </text>
          </g>
        ))}

        {/* grouping brackets */}
        <text x="130" y={baseY + 58} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="8" fontWeight="600">Terrestrial (rocky, dense)</text>
        <text x="350" y={baseY + 58} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="8" fontWeight="600">Giant (gas / ice, low density)</text>

        <text x="20" y="22" className="fill-slate-500" fontSize="8" fontWeight="600">Earth = densest. Jupiter = largest. Saturn = least dense (floats on water).</text>
      </svg>
    </div>
  );
}
