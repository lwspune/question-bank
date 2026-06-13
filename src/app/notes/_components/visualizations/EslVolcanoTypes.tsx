/**
 * The three volcano profiles compared: a broad low shield (runny basalt, quiet
 * eruptions), a steep layered composite/stratovolcano (sticky lava, explosive
 * pyroclastic eruptions), and a small cinder cone. Static SVG, server component.
 */
export default function EslVolcanoTypes() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 170"
        className="w-full"
        role="img"
        aria-label="Three volcano types in profile. A shield volcano is low and very wide with gentle slopes, built from runny basaltic lava in quiet eruptions. A composite or stratovolcano is a tall, steep cone built of alternating layers of lava and ash, with explosive eruptions that eject pyroclastic material. A cinder cone is small and steep, a heap of cinders around a single vent."
      >
        <line x1="10" y1="130" x2="530" y2="130" className="stroke-emerald-700" strokeWidth="1.5" />

        {/* Shield */}
        <path d="M 20 130 Q 90 96 170 130 Z" className="fill-orange-300/70 stroke-orange-700 dark:fill-orange-900/50" strokeWidth="1.2" />
        <text x="95" y="148" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Shield</text>
        <text x="95" y="159" textAnchor="middle" className="fill-slate-500" fontSize="6.5">low, wide · runny basalt · quiet</text>
        <text x="95" y="90" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Mauna Loa</text>

        {/* Composite */}
        <path d="M 210 130 L 270 40 L 330 130 Z" className="fill-rose-300/70 stroke-rose-700 dark:fill-rose-900/50" strokeWidth="1.2" />
        {/* layers */}
        <path d="M 240 86 L 270 40 L 300 86" className="fill-none stroke-rose-700/60" strokeWidth="0.8" />
        <path d="M 226 108 L 270 42 L 314 108" className="fill-none stroke-rose-700/40" strokeWidth="0.8" />
        {/* explosive plume */}
        <path d="M 270 40 q -10 -16 4 -24 q 12 6 6 18 q 10 -8 8 6" className="fill-slate-400/60 stroke-slate-500" strokeWidth="0.8" />
        <text x="270" y="148" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Composite</text>
        <text x="270" y="159" textAnchor="middle" className="fill-slate-500" fontSize="6.5">steep, layered · EXPLOSIVE · pyroclastic</text>
        <text x="270" y="18" textAnchor="middle" className="fill-slate-500" fontSize="6.5">Fuji, Mount Ibu</text>

        {/* Cinder cone */}
        <path d="M 420 130 L 460 88 L 500 130 Z" className="fill-amber-400/70 stroke-amber-700 dark:fill-amber-900/50" strokeWidth="1.2" />
        <text x="460" y="148" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.5" fontWeight="700">Cinder cone</text>
        <text x="460" y="159" textAnchor="middle" className="fill-slate-500" fontSize="6.5">small, steep · cinders round a vent</text>
      </svg>
    </div>
  );
}
