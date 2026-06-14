/**
 * The three coral-reef types as a developmental sequence around a volcanic
 * island. A FRINGING reef hugs the shore; as the island subsides a lagoon
 * opens and the reef becomes a BARRIER reef offset from the coast; when the
 * island sinks entirely a ring of reef enclosing a lagoon remains — an ATOLL.
 * Static SVG, server component.
 */
export default function OcnCoralReefTypes() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 200"
        className="w-full"
        role="img"
        aria-label="Three stages of coral reef growth around a volcanic island. A fringing reef grows directly against the island shore. As the island slowly sinks, a lagoon opens between the reef and the shore to form a barrier reef. When the island disappears below the sea, only a ring of coral enclosing a central lagoon remains: an atoll."
      >
        {/* sea backdrop */}
        <rect x="0" y="0" width="560" height="170" className="fill-sky-200/40 dark:fill-sky-950/30" />

        {/* ---- FRINGING ---- */}
        <text x="90" y="186" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8" fontWeight="700">Fringing reef</text>
        <text x="90" y="196" textAnchor="middle" className="fill-slate-500" fontSize="6">reef hugs the shore</text>
        {/* island */}
        <polygon points="60,150 90,55 120,150" className="fill-stone-400/80 stroke-stone-700 dark:fill-stone-600/60" strokeWidth="1" />
        <text x="90" y="48" textAnchor="middle" className="fill-slate-500" fontSize="6">island</text>
        {/* reef band against shore */}
        <rect x="44" y="146" width="16" height="10" className="fill-rose-400/80 stroke-rose-700" strokeWidth="0.8" />
        <rect x="120" y="146" width="16" height="10" className="fill-rose-400/80 stroke-rose-700" strokeWidth="0.8" />

        {/* ---- BARRIER ---- */}
        <text x="280" y="186" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8" fontWeight="700">Barrier reef</text>
        <text x="280" y="196" textAnchor="middle" className="fill-slate-500" fontSize="6">lagoon between reef and shore</text>
        {/* smaller island (subsiding) */}
        <polygon points="262,150 280,90 298,150" className="fill-stone-400/80 stroke-stone-700 dark:fill-stone-600/60" strokeWidth="1" />
        {/* lagoon */}
        <text x="280" y="143" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="5.5">lagoon</text>
        {/* reef offset further out */}
        <rect x="218" y="146" width="16" height="10" className="fill-rose-400/80 stroke-rose-700" strokeWidth="0.8" />
        <rect x="326" y="146" width="16" height="10" className="fill-rose-400/80 stroke-rose-700" strokeWidth="0.8" />

        {/* ---- ATOLL ---- */}
        <text x="470" y="186" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8" fontWeight="700">Atoll</text>
        <text x="470" y="196" textAnchor="middle" className="fill-slate-500" fontSize="6">ring of reef, island gone</text>
        {/* island fully submerged — dashed under sea */}
        <line x1="470" y1="150" x2="470" y2="120" className="stroke-slate-400" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="470" y="116" textAnchor="middle" className="fill-slate-400" fontSize="5.5">island sunk</text>
        {/* ring of reef */}
        <ellipse cx="470" cy="150" rx="40" ry="9" className="fill-none stroke-rose-600" strokeWidth="3" />
        <text x="470" y="153" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="5.5">central lagoon</text>
      </svg>
    </div>
  );
}
