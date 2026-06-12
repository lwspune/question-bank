/**
 * A labelled eukaryotic cell showing the major organelles in place: nucleus,
 * mitochondrion, endoplasmic reticulum, Golgi body, lysosome, ribosomes and
 * vacuole. The one-glance "who sits where" map for the organelles subtopic.
 * Static SVG.
 */
export default function CellOrganelleMap() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 360 230" className="w-full" role="img" aria-label="A labelled eukaryotic cell. At the centre is the nucleus. Around it sit the mitochondrion (the powerhouse that makes ATP), the endoplasmic reticulum (transport network), the Golgi body (packaging), lysosomes (digestion), ribosomes (protein synthesis) and a vacuole (storage). The membrane is the outer boundary.">
        {/* cell boundary */}
        <ellipse cx="180" cy="115" rx="168" ry="104" className="fill-indigo-50/40 stroke-indigo-500 dark:fill-indigo-950/30" strokeWidth="2.4" />
        {/* nucleus */}
        <circle cx="180" cy="112" r="40" className="fill-indigo-200/80 stroke-indigo-700 dark:fill-indigo-800/50" strokeWidth="1.8" />
        <circle cx="180" cy="112" r="13" className="fill-indigo-400/70 stroke-indigo-800 dark:fill-indigo-600/60" strokeWidth="1" />
        <text x="180" y="100" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8" fontWeight="700">Nucleus</text>
        <text x="180" y="146" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300" fontSize="6.5">(nucleolus inside)</text>

        {/* mitochondrion */}
        <ellipse cx="78" cy="72" rx="26" ry="14" className="fill-rose-200/80 stroke-rose-600 dark:fill-rose-800/50" strokeWidth="1.5" />
        <path d="M58 72 q8 -7 14 0 q8 7 14 0 q8 -7 14 0" className="fill-none stroke-rose-600" strokeWidth="1" />
        <text x="78" y="52" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300" fontSize="7" fontWeight="600">Mitochondrion</text>
        <text x="78" y="96" textAnchor="middle" className="fill-slate-500" fontSize="6">makes ATP</text>

        {/* endoplasmic reticulum */}
        <path d="M250 70 q18 8 0 16 q-18 8 0 16 q18 8 0 16" className="fill-none stroke-sky-600" strokeWidth="2" />
        <text x="290" y="92" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="7" fontWeight="600">ER</text>
        <text x="290" y="104" textAnchor="middle" className="fill-slate-500" fontSize="6">transport</text>

        {/* Golgi body */}
        <g className="stroke-amber-600" strokeWidth="2" fill="none">
          <path d="M250 150 q22 -6 44 0" />
          <path d="M252 158 q22 -6 40 0" />
          <path d="M254 166 q22 -6 36 0" />
        </g>
        <text x="280" y="182" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300" fontSize="7" fontWeight="600">Golgi body</text>

        {/* lysosome */}
        <circle cx="92" cy="166" r="13" className="fill-emerald-200/80 stroke-emerald-700 dark:fill-emerald-800/50" strokeWidth="1.4" />
        <text x="92" y="169" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200" fontSize="6">Lyso-</text>
        <text x="92" y="192" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="6.5" fontWeight="600">Lysosome (digests)</text>

        {/* ribosomes */}
        <circle cx="135" cy="60" r="3" className="fill-slate-600" />
        <circle cx="145" cy="56" r="3" className="fill-slate-600" />
        <circle cx="140" cy="66" r="3" className="fill-slate-600" />
        <text x="140" y="44" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.5" fontWeight="600">ribosomes</text>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-500">
        Powerhouse (mitochondrion), digestion (lysosome), transport (ER), packaging (Golgi), control (nucleus).
      </p>
    </div>
  );
}
