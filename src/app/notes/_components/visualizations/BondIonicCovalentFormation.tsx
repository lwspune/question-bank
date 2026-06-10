/**
 * The two main ways atoms reach an octet. IONIC: a metal TRANSFERS an electron
 * to a non-metal, making oppositely charged ions that attract (Na+ + Cl-).
 * COVALENT: two non-metals SHARE a pair of electrons (Cl-Cl). The bank tests
 * which compounds are ionic vs covalent. Static SVG.
 */
export default function BondIonicCovalentFormation() {
  const atom = "fill-indigo-100/70 stroke-indigo-500 dark:fill-indigo-900/40";
  const dot = "fill-slate-700 dark:fill-slate-200";
  const shared = "fill-rose-500";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="Two ways atoms bond. Ionic bonding: a sodium atom transfers its single outer electron to a chlorine atom, forming a positive sodium ion and a negative chloride ion that attract each other. Covalent bonding: two chlorine atoms share a pair of electrons so each reaches a full outer shell.">
        {/* IONIC — top */}
        <text x="160" y="16" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="10" fontWeight="700">Ionic bond — electron TRANSFER</text>
        <circle cx="50" cy="50" r="18" className={atom} strokeWidth="1.4" />
        <text x="50" y="54" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Na</text>
        <circle cx="50" cy="30" r="2.6" className={shared} />
        <circle cx="150" cy="50" r="18" className={atom} strokeWidth="1.4" />
        <text x="150" y="54" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Cl</text>
        {/* 7 electrons around Cl */}
        {[0, 51, 102, 153, 204, 255, 306].map((deg, i) => {
          const a = (Math.PI / 180) * deg;
          return <circle key={i} cx={(150 + 18 * Math.cos(a)).toFixed(1)} cy={(50 + 18 * Math.sin(a)).toFixed(1)} r="2.4" className={dot} />;
        })}
        <defs>
          <marker id="eArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" className="fill-rose-600 dark:fill-rose-400" /></marker>
        </defs>
        <line x1="72" y1="34" x2="128" y2="44" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.4" markerEnd="url(#eArrow)" />
        <text x="100" y="30" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="7.5">1 e⁻</text>
        <text x="200" y="46" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">→ Na⁺ + Cl⁻</text>
        <text x="200" y="62" className="fill-slate-500" fontSize="7.5">ions attract</text>
        {/* divider */}
        <line x1="20" y1="100" x2="300" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.8" strokeDasharray="3 3" />
        {/* COVALENT — bottom */}
        <text x="160" y="122" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="10" fontWeight="700">Covalent bond — electron SHARING</text>
        <circle cx="118" cy="160" r="18" className={atom} strokeWidth="1.4" />
        <text x="112" y="164" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Cl</text>
        <circle cx="202" cy="160" r="18" className={atom} strokeWidth="1.4" />
        <text x="208" y="164" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Cl</text>
        {/* shared pair in the overlap */}
        <circle cx="155" cy="154" r="2.8" className={shared} />
        <circle cx="155" cy="166" r="2.8" className={shared} />
        <text x="160" y="190" textAnchor="middle" className="fill-slate-500" fontSize="7.5">a shared pair = one covalent bond (Cl–Cl)</text>
      </svg>
    </div>
  );
}
