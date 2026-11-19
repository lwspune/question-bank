/**
 * Static figure: chemiosmosis across the thylakoid membrane, in the words of
 * the NEET concept "Chemiosmosis and ATP synthase" (nbops-chemiosmosis), with
 * the water-splitting equation and PS II / PS I from its neighbour on the Z
 * scheme.
 *
 * - The stroma above, the lumen below, the thylakoid membrane between.
 * - Three things build the proton gradient: water splitting puts H⁺ into the
 *   lumen; an electron (hydrogen) carrier moves H⁺ from the stroma into the
 *   lumen; NADP reductase, on the stroma side, uses up H⁺ of the stroma to make
 *   NADPH + H⁺. So H⁺ piles up in the lumen and its pH drops.
 * - ATP synthase: CF₀ embedded in the membrane, a channel for the facilitated
 *   diffusion of H⁺; CF₁ sticking out on the stroma side. H⁺ flows back out
 *   through CF₀ to the stroma and CF₁ makes ATP.
 *
 * Data exported and pinned by tests/notes-neet-visuals-bio-b.test.ts. Server
 * component, no client state.
 */

export type Side = "stroma" | "membrane" | "lumen";

/** The membrane's two faces (y). */
export const MEMBRANE = { top: 92, bottom: 116 };

/** Where the parts sit, by the concept's terms. */
export const PARTS = {
  psII: { name: "PS II", x: 30, w: 40, y: 84, h: 40 },
  carrier: { name: "electron carrier", x: 92, w: 26, y: 88, h: 32 },
  psI: { name: "PS I", x: 140, w: 36, y: 84, h: 40 },
  nadpReductase: { name: "NADP reductase", x: 192, w: 50, y: 62, h: 28 },
  cf0: { name: "CF₀", x: 278, w: 20, y: 90, h: 28 },
  cf1: { name: "CF₁", cx: 288, cy: 58, r: 17 },
} as const;

/** Which side each part is on, read off its position against the membrane. */
export function sideOf(top: number, bottom: number): Side {
  if (bottom <= MEMBRANE.top + 2) return "stroma";
  if (top >= MEMBRANE.bottom - 2) return "lumen";
  return "membrane";
}

/** How protons move, as the concept's table states it. */
export type ProtonMove = { by: string; from: Side | "water"; to: Side | "NADPH"; effect: string };
export const PROTON_MOVES: readonly ProtonMove[] = [
  { by: "water splitting", from: "water", to: "lumen", effect: "protons added to the lumen" },
  { by: "electron carrier", from: "stroma", to: "lumen", effect: "protons moved from the stroma into the lumen" },
  { by: "NADP reductase", from: "stroma", to: "NADPH", effect: "protons removed from the stroma" },
  { by: "CF₀", from: "lumen", to: "stroma", effect: "the gradient breaks down; CF₁ makes ATP" },
];

/** H⁺ drawn in each space: many in the lumen, few in the stroma. */
export const LUMEN_H: readonly { x: number; y: number }[] = [
  { x: 140, y: 136 },
  { x: 168, y: 150 },
  { x: 196, y: 134 },
  { x: 224, y: 148 },
  { x: 252, y: 134 },
  { x: 150, y: 172 },
  { x: 182, y: 186 },
  { x: 212, y: 170 },
  { x: 244, y: 182 },
  { x: 132, y: 192 },
];
export const STROMA_H: readonly { x: number; y: number }[] = [
  { x: 128, y: 34 },
  { x: 156, y: 62 },
];

const LABEL = "fill-foreground text-[10px]";
const H_TEXT = "fill-rose-700 text-[10px] font-semibold dark:fill-rose-300";
const ARROW = "stroke-rose-600 dark:stroke-rose-400";
const HEAD = "fill-rose-600 dark:fill-rose-400";
const PROTEIN = "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-900 dark:stroke-emerald-300";

export default function NeetThylakoidChemiosmosis() {
  const { psII, carrier, psI, nadpReductase: nr, cf0, cf1 } = PARTS;
  const carrierX = carrier.x + carrier.w / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · chemiosmosis in the thylakoid
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="A thylakoid membrane between the stroma above and the lumen below. Water splitting and an electron carrier put protons into the lumen and NADP reductase on the stroma side uses up protons of the stroma, so protons pile up in the lumen. They flow back to the stroma through CF0 of ATP synthase, and CF1, facing the stroma, makes ATP."
      >
        {/* Lumen and stroma. */}
        <rect x={0} y={MEMBRANE.bottom} width={320} height={98} className="fill-rose-100/60 dark:fill-rose-950/30" />
        <text x={4} y={14} className="fill-foreground text-[11px] font-semibold">Stroma</text>
        <text x={4} y={26} className="fill-muted-foreground text-[10px]">(fewer H⁺)</text>
        <text x={4} y={198} className="fill-foreground text-[11px] font-semibold">Lumen</text>
        <text x={4} y={210} className="fill-muted-foreground text-[10px]">H⁺ piles up, pH drops</text>

        {/* The membrane. */}
        <rect x={0} y={MEMBRANE.top} width={320} height={MEMBRANE.bottom - MEMBRANE.top} className="fill-emerald-50 dark:fill-emerald-950/40" />
        <line x1={0} y1={MEMBRANE.top} x2={320} y2={MEMBRANE.top} strokeWidth={1.5} className="stroke-emerald-700 dark:stroke-emerald-400" />
        <line x1={0} y1={MEMBRANE.bottom} x2={320} y2={MEMBRANE.bottom} strokeWidth={1.5} className="stroke-emerald-700 dark:stroke-emerald-400" />
        <text x={236} y={103} textAnchor="middle" className="fill-emerald-800 text-[10px] dark:fill-emerald-200">thylakoid</text>
        <text x={236} y={113} textAnchor="middle" className="fill-emerald-800 text-[10px] dark:fill-emerald-200">membrane</text>

        {/* H⁺ in each space. */}
        {LUMEN_H.map((h, i) => (
          <text key={`l${i}`} x={h.x} y={h.y} textAnchor="middle" className={H_TEXT}>H⁺</text>
        ))}
        {STROMA_H.map((h, i) => (
          <text key={`s${i}`} x={h.x} y={h.y} textAnchor="middle" className={H_TEXT}>H⁺</text>
        ))}

        {/* Electron path: PS II, carrier, PS I, NADP reductase. */}
        <polyline
          points={`${psII.x + psII.w / 2},112 ${carrierX},112 ${psI.x + psI.w / 2},112 ${psI.x + psI.w / 2 + 22},112 ${nr.x + 14},${nr.y + nr.h}`}
          strokeWidth={1.25}
          strokeDasharray="3 2"
          className="fill-none stroke-indigo-600 dark:stroke-indigo-300"
        />
        <text x={129} y={109} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">e⁻</text>

        {/* Proteins. */}
        <rect x={psII.x} y={psII.y} width={psII.w} height={psII.h} rx={6} strokeWidth={1.5} className={PROTEIN} />
        <text x={psII.x + psII.w / 2} y={104} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">{psII.name}</text>
        <rect x={carrier.x} y={carrier.y} width={carrier.w} height={carrier.h} rx={10} strokeWidth={1.5} className="fill-amber-200 stroke-amber-700 dark:fill-amber-800 dark:stroke-amber-300" />
        <rect x={psI.x} y={psI.y} width={psI.w} height={psI.h} rx={6} strokeWidth={1.5} className={PROTEIN} />
        <text x={psI.x + psI.w / 2} y={104} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">{psI.name}</text>
        <rect x={nr.x} y={nr.y} width={nr.w} height={nr.h} rx={6} strokeWidth={1.5} className="fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300" />
        <text x={nr.x + nr.w / 2} y={nr.y + 12} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">NADP</text>
        <text x={nr.x + nr.w / 2} y={nr.y + 23} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">reductase</text>

        {/* ATP synthase: CF₀ in the membrane, CF₁ in the stroma. */}
        <rect x={cf0.x} y={cf0.y} width={cf0.w} height={cf0.h} rx={3} strokeWidth={1.5} className="fill-violet-200 stroke-violet-700 dark:fill-violet-900 dark:stroke-violet-300" />
        <rect x={cf1.cx - 3} y={cf1.cy + cf1.r - 1} width={6} height={cf0.y - (cf1.cy + cf1.r) + 2} className="fill-violet-400 dark:fill-violet-600" />
        <circle cx={cf1.cx} cy={cf1.cy} r={cf1.r} strokeWidth={1.5} className="fill-violet-200 stroke-violet-700 dark:fill-violet-900 dark:stroke-violet-300" />
        <text x={cf1.cx} y={cf1.cy + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">{cf1.name}</text>
        <text x={cf0.x + cf0.w + 3} y={cf0.y + 18} className="fill-foreground text-[10px] font-semibold">{cf0.name}</text>
        <text x={318} y={24} textAnchor="end" className="fill-violet-800 text-[10px] font-semibold dark:fill-violet-200">ADP + Pi → ATP</text>
        <text x={cf0.x + cf0.w / 2 - 4} y={206} textAnchor="middle" className="fill-violet-800 text-[10px] font-semibold dark:fill-violet-200">ATP synthase</text>

        {/* Proton movements. */}
        {/* Water splitting, on the inner side, adds H⁺ to the lumen. */}
        <text x={8} y={142} className="fill-sky-800 text-[10px] dark:fill-sky-200">2H₂O → 4H⁺ + O₂ + 4e⁻</text>
        <text x={8} y={154} className="fill-muted-foreground text-[10px]">water splitting</text>
        <line x1={50} y1={132} x2={50} y2={127} strokeWidth={1.25} className="stroke-sky-700 dark:stroke-sky-300" />
        {/* The carrier takes H⁺ from the stroma and releases it in the lumen. */}
        <line x1={carrierX} y1={58} x2={carrierX} y2={124} strokeWidth={1.5} className={ARROW} />
        <polygon points={`${carrierX - 3.5},124 ${carrierX + 3.5},124 ${carrierX},131`} className={HEAD} />
        <text x={carrierX} y={54} textAnchor="middle" className={H_TEXT}>H⁺</text>
        <text x={40} y={58} className={LABEL}>electron</text>
        <text x={40} y={70} className={LABEL}>carrier</text>
        <line x1={78} y1={66} x2={96} y2={88} strokeWidth={0.75} className="stroke-muted-foreground" />
        {/* NADP reductase uses up H⁺ of the stroma. */}
        <text x={nr.x + nr.w / 2} y={50} textAnchor="middle" className="fill-sky-800 text-[10px] dark:fill-sky-200">NADP⁺ → NADPH + H⁺</text>
        <text x={174} y={80} textAnchor="end" className={H_TEXT}>H⁺</text>
        <line x1={176} y1={76} x2={186} y2={76} strokeWidth={1.5} className={ARROW} />
        <polygon points={`${nr.x},76 ${nr.x - 6},72.5 ${nr.x - 6},79.5`} className={HEAD} />
        {/* H⁺ flows back out through CF₀; CF₁ makes ATP. */}
        <polyline points={`${cf0.x + 5},170 ${cf0.x + 5},86 ${cf0.x - 10},76`} strokeWidth={1.75} className={`fill-none ${ARROW}`} />
        <polygon points={`${cf0.x - 14},73.5 ${cf0.x - 6},74 ${cf0.x - 10},80`} className={HEAD} />
        <text x={cf0.x + 9} y={168} className={H_TEXT}>H⁺</text>
      </svg>
      <p className="mt-3 text-xs text-muted-foreground">
        The lumen gains protons from water splitting and from the electron carrier, and the stroma loses them to NADP
        reductase, so a proton gradient builds and the pH of the lumen drops. When the gradient breaks down, protons
        flow by facilitated diffusion through the channel in CF₀ back to the stroma, and the energy changes the shape
        of CF₁, which makes ATP.
      </p>
    </div>
  );
}
