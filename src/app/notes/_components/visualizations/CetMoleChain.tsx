/**
 * Static figure: the particle bridge (concept cetsbcc-particles-from-moles).
 *
 * Mass (÷ M) or a gas volume at STP (÷ 22.4) gives moles; moles × Nₐ gives
 * molecules; molecules × atoms per molecule gives atoms. The two worked chains
 * under the picture are the concept's own: 5.4 g of urea (M = 60) is 0.09 mol,
 * 5.42 × 10²² molecules; 2.24 dm³ of NH₃ at STP is 0.1 mol, 6.022 × 10²²
 * molecules but 2.4088 × 10²³ atoms (the trap: atoms need the extra × 4).
 * Values pinned by tests/notes-w2-01.test.ts. Server component.
 */

/** Avogadro's number, as the concept writes it. */
export const AVOGADRO = 6.022e23;
/** Molar volume at STP, dm³ per mole. */
export const MOLAR_VOLUME = 22.4;

export const molesFromMass = (m: number, M: number) => m / M;
export const molesFromVolume = (V: number) => V / MOLAR_VOLUME;
export const moleculesFromMoles = (n: number) => n * AVOGADRO;

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };

/** "5.42 × 10²²": a number in scientific notation with `digits` decimals. */
export function sci(v: number, digits: number): string {
  const exp = Math.floor(Math.log10(Math.abs(v)));
  const mant = v / 10 ** exp;
  const sup = String(exp)
    .split("")
    .map((c) => SUP[c])
    .join("");
  return `${mant.toFixed(digits)} × 10${sup}`;
}

/** The concept's two worked chains. */
export const UREA = { mass: 5.4, M: 60 } as const;
export const AMMONIA = { volume: 2.24, atomsPerMolecule: 4 } as const;

export function ureaChain() {
  const n = molesFromMass(UREA.mass, UREA.M);
  return { n, molecules: moleculesFromMoles(n) };
}

export function ammoniaChain() {
  const n = molesFromVolume(AMMONIA.volume);
  const molecules = moleculesFromMoles(n);
  return { n, molecules, atoms: molecules * AMMONIA.atomsPerMolecule };
}

/** The five boxes of the bridge (viewBox units). */
export const BOXES = {
  mass: { x: 8, y: 18, w: 96, h: 42, title: "mass m", sub: "in g" },
  volume: { x: 8, y: 142, w: 96, h: 42, title: "gas volume V", sub: "dm³ at STP" },
  moles: { x: 130, y: 80, w: 62, h: 42, title: "moles n", sub: "mol" },
  molecules: { x: 216, y: 18, w: 96, h: 42, title: "molecules N", sub: "a number" },
  atoms: { x: 216, y: 142, w: 96, h: 42, title: "atoms", sub: "a number" },
} as const;

type Box = (typeof BOXES)[keyof typeof BOXES];

function BoxShape({ b, strong }: { b: Box; strong?: boolean }) {
  return (
    <g>
      <rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx={7}
        className={
          strong
            ? "fill-indigo-100 stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-400"
            : "fill-background stroke-border"
        }
        strokeWidth={1.5}
      />
      <text x={b.x + b.w / 2} y={b.y + 18} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {b.title}
      </text>
      <text x={b.x + b.w / 2} y={b.y + 32} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {b.sub}
      </text>
    </g>
  );
}

const ARROW = "stroke-indigo-600 dark:stroke-indigo-400";
const STEP_TEXT = "fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300";

export default function CetMoleChain() {
  const { mass, volume, moles, molecules, atoms } = BOXES;
  const urea = ureaChain();
  const nh3 = ammoniaChain();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the particle bridge through moles
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="Mass divided by molar mass, or a gas volume at STP divided by 22.4, gives moles. Moles times Avogadro's number gives molecules. Molecules times the atoms per molecule gives atoms."
      >
        <defs>
          <marker id="mole-chain-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* mass to moles */}
        <line x1={mass.x + mass.w} y1={mass.y + 30} x2={moles.x + 8} y2={moles.y - 2} markerEnd="url(#mole-chain-arrow)" className={ARROW} strokeWidth={1.8} />
        <text x={130} y={58} className={STEP_TEXT}>
          ÷ M
        </text>

        {/* volume to moles */}
        <line x1={volume.x + volume.w} y1={volume.y + 12} x2={moles.x + 8} y2={moles.y + moles.h + 2} markerEnd="url(#mole-chain-arrow)" className={ARROW} strokeWidth={1.8} />
        <text x={130} y={150} className={STEP_TEXT}>
          ÷ 22.4
        </text>

        {/* moles to molecules */}
        <line x1={moles.x + moles.w - 8} y1={moles.y - 2} x2={molecules.x} y2={molecules.y + 30} markerEnd="url(#mole-chain-arrow)" className={ARROW} strokeWidth={1.8} />
        <text x={196} y={84} className={STEP_TEXT}>
          × N
          <tspan dy={3} className="text-[8px]">
            A
          </tspan>
        </text>

        {/* molecules to atoms */}
        <line x1={molecules.x + 24} y1={molecules.y + molecules.h} x2={atoms.x + 24} y2={atoms.y - 2} markerEnd="url(#mole-chain-arrow)" className={ARROW} strokeWidth={1.8} />
        <text x={248} y={92} className={STEP_TEXT}>
          × atoms
        </text>
        <text x={248} y={105} className={STEP_TEXT}>
          per
        </text>
        <text x={248} y={118} className={STEP_TEXT}>
          molecule
        </text>

        <BoxShape b={mass} />
        <BoxShape b={volume} />
        <BoxShape b={moles} strong />
        <BoxShape b={molecules} />
        <BoxShape b={atoms} />
      </svg>

      <table className="mt-3 w-full text-left text-xs">
        <tbody className="tabular-nums text-foreground">
          <tr>
            <td className="py-1 pr-2 font-semibold">Urea, 5.4 g (M = 60)</td>
            <td className="py-1">
              5.4 ÷ 60 = {urea.n.toFixed(2)} mol → {sci(urea.molecules, 2)} molecules
            </td>
          </tr>
          <tr className="border-t border-border">
            <td className="py-1 pr-2 font-semibold">NH₃, 2.24 dm³ at STP</td>
            <td className="py-1">
              2.24 ÷ 22.4 = {nh3.n.toFixed(1)} mol → {sci(nh3.molecules, 3)} molecules → × 4 = {sci(nh3.atoms, 4)} atoms
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-2 text-xs text-muted-foreground">
        Moles sit in the middle of every chain. Moles × Avogadro&apos;s number (6.022 × 10²³) counts molecules; for atoms multiply once more by
        the atoms in one molecule (4 in NH₃).
      </p>
    </div>
  );
}
