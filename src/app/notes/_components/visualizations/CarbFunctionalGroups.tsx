/**
 * The four functional groups the NDA tests, as condensed structures: alcohol
 * (-OH), carboxylic acid (-COOH), ester (-COO-), and aldehyde (-CHO). The
 * functional group is the reactive cluster (highlighted) that names the family.
 * Static SVG.
 */
export default function CarbFunctionalGroups() {
  const bond = "stroke-slate-500 dark:stroke-slate-300";
  const grp = "fill-rose-600 dark:fill-rose-300";
  const atom = "fill-slate-700 dark:fill-slate-100";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="Four functional groups. An alcohol carries an O-H group. A carboxylic acid carries a C double-bond-O and O-H together (COOH). An ester carries C double-bond-O joined to O and another carbon (COO). An aldehyde carries C double-bond-O and an H (CHO). The functional group is the reactive cluster that names the family.">
        <text x="160" y="15" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Functional groups</text>

        {/* Alcohol — top-left */}
        <text x="80" y="38" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="9.5" fontWeight="700">Alcohol</text>
        <text x="38" y="68" className={atom} fontSize="12" fontWeight="600">R</text>
        <line x1="50" y1="64" x2="66" y2="64" className={bond} strokeWidth="1.5" />
        <text x="68" y="68" className={grp} fontSize="12" fontWeight="700">O</text>
        <line x1="82" y1="64" x2="98" y2="64" className={bond} strokeWidth="1.5" />
        <text x="100" y="68" className={grp} fontSize="12" fontWeight="700">H</text>
        <text x="80" y="84" textAnchor="middle" className="fill-slate-500" fontSize="8">–OH  (e.g. ethanol)</text>

        {/* Carboxylic acid — top-right */}
        <text x="240" y="38" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="9.5" fontWeight="700">Carboxylic acid</text>
        <text x="196" y="68" className={atom} fontSize="12" fontWeight="600">R</text>
        <line x1="208" y1="64" x2="222" y2="64" className={bond} strokeWidth="1.5" />
        <text x="224" y="68" className={grp} fontSize="12" fontWeight="700">C</text>
        <line x1="230" y1="58" x2="230" y2="46" className={bond} strokeWidth="1.5" />
        <line x1="233" y1="58" x2="233" y2="46" className={bond} strokeWidth="1.5" />
        <text x="231" y="44" textAnchor="middle" className={grp} fontSize="11" fontWeight="700">O</text>
        <line x1="238" y1="64" x2="252" y2="64" className={bond} strokeWidth="1.5" />
        <text x="254" y="68" className={grp} fontSize="12" fontWeight="700">O–H</text>
        <text x="240" y="86" textAnchor="middle" className="fill-slate-500" fontSize="8">–COOH  (e.g. acetic acid)</text>

        <line x1="20" y1="118" x2="300" y2="118" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.7" strokeDasharray="3 3" />

        {/* Ester — bottom-left */}
        <text x="80" y="146" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="9.5" fontWeight="700">Ester</text>
        <text x="32" y="176" className={atom} fontSize="12" fontWeight="600">R</text>
        <line x1="44" y1="172" x2="58" y2="172" className={bond} strokeWidth="1.5" />
        <text x="60" y="176" className={grp} fontSize="12" fontWeight="700">C</text>
        <line x1="66" y1="166" x2="66" y2="154" className={bond} strokeWidth="1.5" />
        <line x1="69" y1="166" x2="69" y2="154" className={bond} strokeWidth="1.5" />
        <text x="67" y="152" textAnchor="middle" className={grp} fontSize="11" fontWeight="700">O</text>
        <line x1="74" y1="172" x2="86" y2="172" className={bond} strokeWidth="1.5" />
        <text x="88" y="176" className={grp} fontSize="12" fontWeight="700">O</text>
        <line x1="100" y1="172" x2="112" y2="172" className={bond} strokeWidth="1.5" />
        <text x="114" y="176" className={atom} fontSize="12" fontWeight="600">R′</text>
        <text x="80" y="194" textAnchor="middle" className="fill-slate-500" fontSize="8">–COO–  (sweet, fruity smell)</text>

        {/* Aldehyde — bottom-right */}
        <text x="240" y="146" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300" fontSize="9.5" fontWeight="700">Aldehyde</text>
        <text x="198" y="176" className={atom} fontSize="12" fontWeight="600">R</text>
        <line x1="210" y1="172" x2="224" y2="172" className={bond} strokeWidth="1.5" />
        <text x="226" y="176" className={grp} fontSize="12" fontWeight="700">C</text>
        <line x1="232" y1="166" x2="232" y2="154" className={bond} strokeWidth="1.5" />
        <line x1="235" y1="166" x2="235" y2="154" className={bond} strokeWidth="1.5" />
        <text x="233" y="152" textAnchor="middle" className={grp} fontSize="11" fontWeight="700">O</text>
        <line x1="240" y1="172" x2="254" y2="172" className={bond} strokeWidth="1.5" />
        <text x="256" y="176" className={grp} fontSize="12" fontWeight="700">H</text>
        <text x="240" y="194" textAnchor="middle" className="fill-slate-500" fontSize="8">–CHO  (e.g. formaldehyde)</text>
      </svg>
    </div>
  );
}
