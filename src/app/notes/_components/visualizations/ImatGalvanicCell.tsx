/**
 * Static figure: a Daniell cell, the concept's own example of a galvanic
 * cell (zinc and copper). Zinc is the anode: oxidation, the NEGATIVE
 * electrode. Copper is the cathode: reduction, the POSITIVE electrode.
 * Electrons flow through the wire from anode to cathode; in the salt bridge
 * negative ions move towards the anode's solution and positive ions towards
 * the cathode's, keeping each solution neutral.
 *
 * Pedagogical aim: tie each electrode's job (AN OX, RED CAT) to its sign in
 * a galvanic cell and to the direction of every flow. The facts drawn are
 * exported and pinned by tests/notes-imat-visuals-chem2.test.ts. Server
 * component, no client state.
 */

export type Electrode = {
  metal: string;
  role: "anode" | "cathode";
  process: "oxidation" | "reduction";
  sign: "−" | "+";
  /** Half-equation, and the electrons it releases (+) or takes in (−). */
  half: string;
  electrons: number;
  solution: string;
};

export const ANODE: Electrode = {
  metal: "Zn",
  role: "anode",
  process: "oxidation",
  sign: "−",
  half: "Zn → Zn²⁺ + 2e⁻",
  electrons: 2,
  solution: "ZnSO₄(aq)",
};

export const CATHODE: Electrode = {
  metal: "Cu",
  role: "cathode",
  process: "reduction",
  sign: "+",
  half: "Cu²⁺ + 2e⁻ → Cu",
  electrons: -2,
  solution: "CuSO₄(aq)",
};

/** Which way each carrier moves. */
export const FLOWS = {
  electronsInWire: { from: "anode", to: "cathode" },
  bridgeCations: { towards: "cathode" },
  bridgeAnions: { towards: "anode" },
} as const;

/** The bridge's salt: any unreactive one works; KNO₃ is a common choice. */
export const BRIDGE_IONS = { cation: "K⁺", anion: "NO₃⁻" } as const;

// Geometry (viewBox units). The anode's half-cell is on the left.
const W = 320;
const H = 222;
export const LAYOUT = { anodeX: 70, cathodeX: 250 } as const;

const BEAKER_W = 96;
const BEAKER_TOP = 98;
const BEAKER_BOT = 186;
const LIQUID_TOP = 112;
const WIRE_Y = 30;
const BRIDGE_Y = 78;

function Beaker({ cx, liquid }: { cx: number; liquid: string }) {
  const x = cx - BEAKER_W / 2;
  return (
    <g>
      <rect x={x} y={LIQUID_TOP} width={BEAKER_W} height={BEAKER_BOT - LIQUID_TOP} className={liquid} />
      <path d={`M${x},${BEAKER_TOP} L${x},${BEAKER_BOT} L${x + BEAKER_W},${BEAKER_BOT} L${x + BEAKER_W},${BEAKER_TOP}`} fill="none" className="stroke-muted-foreground" strokeWidth={1.5} />
    </g>
  );
}

function Arrow({ x, y, dir, className }: { x: number; y: number; dir: 1 | -1; className: string }) {
  // A small filled arrow head pointing right (dir 1) or left (dir -1).
  return <path d={`M${x - 5 * dir},${y - 4} L${x + 5 * dir},${y} L${x - 5 * dir},${y + 4} Z`} className={className} />;
}

export default function ImatGalvanicCell() {
  const { anodeX: ax, cathodeX: cx } = LAYOUT;
  const legL = ax + 34;
  const legR = cx - 34;
  const mid = (ax + cx) / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a galvanic cell: the Daniell cell
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Daniell cell. Left: zinc anode, negative, in zinc sulfate solution, where zinc is oxidised. Right: copper cathode, positive, in copper sulfate solution, where copper ions are reduced. Electrons flow through the wire from zinc to copper. In the salt bridge, positive ions move towards the copper side and negative ions towards the zinc side."
      >
        <Beaker cx={ax} liquid="fill-slate-400/20 dark:fill-slate-400/15" />
        <Beaker cx={cx} liquid="fill-sky-500/30 dark:fill-sky-400/25" />

        {/* Salt bridge: an upside-down U dipping into both solutions */}
        <path d={`M${legL},${BEAKER_BOT - 26} L${legL},${BRIDGE_Y} L${legR},${BRIDGE_Y} L${legR},${BEAKER_BOT - 26}`} fill="none" strokeLinejoin="round" className="stroke-violet-300 dark:stroke-violet-700" strokeWidth={11} />
        <text x={mid} y={BRIDGE_Y + 3.5} textAnchor="middle" className="fill-violet-900 text-[9px] font-semibold dark:fill-violet-100">
          salt bridge (KNO₃)
        </text>
        <text x={mid + 14} y={BRIDGE_Y - 10} textAnchor="middle" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {BRIDGE_IONS.cation}
        </text>
        <Arrow x={mid + 32} y={BRIDGE_Y - 13} dir={1} className="fill-violet-600 dark:fill-violet-400" />
        <text x={mid - 6} y={BRIDGE_Y + 22} textAnchor="middle" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {BRIDGE_IONS.anion}
        </text>
        <Arrow x={mid - 32} y={BRIDGE_Y + 19} dir={-1} className="fill-violet-600 dark:fill-violet-400" />

        {/* Electrodes */}
        <rect x={ax - 6} y={WIRE_Y + 30} width={12} height={BEAKER_BOT - 14 - (WIRE_Y + 30)} className="fill-slate-500 dark:fill-slate-400" />
        <rect x={cx - 6} y={WIRE_Y + 30} width={12} height={BEAKER_BOT - 14 - (WIRE_Y + 30)} className="fill-orange-600 dark:fill-orange-500" />
        <text x={ax - 12} y={WIRE_Y + 46} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          Zn
        </text>
        <text x={cx + 12} y={WIRE_Y + 46} className="fill-foreground text-[11px] font-semibold">
          Cu
        </text>

        {/* Wire with a voltmeter */}
        <path d={`M${ax},${WIRE_Y + 30} L${ax},${WIRE_Y} L${cx},${WIRE_Y} L${cx},${WIRE_Y + 30}`} fill="none" className="stroke-foreground" strokeWidth={1.5} />
        <circle cx={mid} cy={WIRE_Y} r={11} className="fill-background stroke-foreground" strokeWidth={1.5} />
        <text x={mid} y={WIRE_Y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          V
        </text>
        {[ax + 40, cx - 40].map((x) => (
          <g key={x}>
            <Arrow x={x} y={WIRE_Y} dir={1} className="fill-amber-600 dark:fill-amber-400" />
            <text x={x} y={WIRE_Y + 14} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
              e⁻
            </text>
          </g>
        ))}
        <text x={mid} y={WIRE_Y - 16} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
          electrons: anode to cathode
        </text>

        {/* Solutions */}
        {[
          { x: ax, e: ANODE },
          { x: cx, e: CATHODE },
        ].map(({ x, e }) => (
          <text key={e.metal} x={x} y={BEAKER_BOT - 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {e.solution}
          </text>
        ))}

        {/* Electrode roles under each beaker */}
        {[
          { x: ax, e: ANODE, tone: "fill-rose-700 dark:fill-rose-300" },
          { x: cx, e: CATHODE, tone: "fill-sky-700 dark:fill-sky-300" },
        ].map(({ x, e, tone }) => (
          <g key={`r-${e.metal}`}>
            <text x={x} y={BEAKER_BOT + 15} textAnchor="middle" className={`${tone} text-[11px] font-semibold`}>
              {e.role} ({e.sign}): {e.process}
            </text>
            <text x={x} y={BEAKER_BOT + 29} textAnchor="middle" className="fill-foreground text-[10px]">
              {e.half}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        AN OX, RED CAT: zinc is oxidised at the anode, copper ions are reduced at the cathode. In a galvanic cell the
        anode is negative, because its oxidation releases electrons into the wire, and they flow to the copper. In the
        salt bridge, positive ions move towards the cathode and negative ions towards the anode, so each solution stays
        neutral and the circuit is complete.
      </p>
    </div>
  );
}
