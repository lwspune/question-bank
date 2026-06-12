/**
 * The parts of a germinating seed/embryo: the radicle (grows into the root,
 * downward) and the plumule (grows into the shoot, upward), with the cotyledon
 * storing food and the seed coat outside. Static SVG.
 */
export default function PlantSeedParts() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 240 200"
        className="w-full"
        role="img"
        aria-label="A germinating seed. The plumule is the embryonic shoot and grows upward into the stem and leaves. The radicle is the embryonic root and grows downward into the root. The cotyledon stores reserve food and the seed coat (testa) protects the seed."
      >
        <text x="120" y="16" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9" fontWeight="700">Parts of the seed embryo</text>

        {/* seed body (cotyledon) */}
        <ellipse cx="120" cy="110" rx="46" ry="60" className="fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/30" strokeWidth="1.6" />
        <text x="120" y="114" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="8" fontWeight="700">Cotyledon</text>
        <text x="120" y="126" textAnchor="middle" className="fill-slate-500" fontSize="6.5">(stores food)</text>

        {/* seed coat label */}
        <text x="120" y="180" textAnchor="middle" className="fill-slate-500" fontSize="7">Seed coat (testa) — outer protective layer</text>

        {/* plumule — up into shoot */}
        <path d="M120,52 C118,38 122,30 120,22" className="fill-none stroke-emerald-600" strokeWidth="3" markerEnd="url(#plant-seed-plum)" />
        <text x="150" y="40" className="fill-emerald-700 dark:fill-emerald-300" fontSize="7.5" fontWeight="700">Plumule</text>
        <text x="150" y="51" className="fill-slate-500" fontSize="6.5">→ shoot (up)</text>

        {/* radicle — down into root */}
        <path d="M120,170 C118,182 122,188 120,196" className="fill-none stroke-rose-600" strokeWidth="3" markerEnd="url(#plant-seed-rad)" />
        <text x="14" y="180" className="fill-rose-700 dark:fill-rose-300" fontSize="7.5" fontWeight="700">Radicle</text>
        <text x="6" y="191" className="fill-slate-500" fontSize="6.5">→ root (down)</text>

        <defs>
          <marker id="plant-seed-plum" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
            <path d="M0,6 L4,0 L8,6 Z" className="fill-emerald-600" />
          </marker>
          <marker id="plant-seed-rad" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto">
            <path d="M0,2 L4,8 L8,2 Z" className="fill-rose-600" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
