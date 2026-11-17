/**
 * Static figure: the chloroplast and its two stages, in the IMAT concept's
 * own terms (imat-bem-chloroplast-equation).
 *
 * - Thylakoid membranes, stacked into a granum: the light-dependent reactions.
 *   Light is absorbed, water is split, O₂ leaves, ATP and NADPH are made.
 * - Stroma: the light-independent reactions (Calvin cycle). CO₂ is fixed by
 *   RuBisCO and sugar is made, using the ATP and NADPH; ADP, Pi and NADP⁺ go
 *   back to the thylakoids.
 * - The overall equation underneath.
 *
 * The concept warns that "light-independent" does not mean "in the dark", so
 * the figure never uses the older name. Stages, flows and the equation are
 * exported and pinned by tests/notes-imat-visuals-biometab.test.ts.
 * Server component, no client state.
 */

export type Site = "thylakoid" | "stroma" | "outside";

export const STAGES = [
  { name: "light-dependent reactions", site: "thylakoid" as Site },
  { name: "light-independent reactions (Calvin cycle)", site: "stroma" as Site },
] as const;

/** What moves where, as the arrows draw it. */
export const FLOWS: readonly { label: string; from: Site; to: Site }[] = [
  { label: "light", from: "outside", to: "thylakoid" },
  { label: "H₂O", from: "outside", to: "thylakoid" },
  { label: "O₂", from: "thylakoid", to: "outside" },
  { label: "ATP + NADPH", from: "thylakoid", to: "stroma" },
  { label: "ADP + Pi, NADP⁺", from: "stroma", to: "thylakoid" },
  { label: "CO₂", from: "outside", to: "stroma" },
  { label: "sugar (C₆H₁₂O₆)", from: "stroma", to: "outside" },
];

export type Formula = Partial<Record<"C" | "H" | "O", number>>;
export type Term = { n: number; text: string; atoms: Formula };

/** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll). */
export const EQUATION: { reactants: readonly Term[]; products: readonly Term[] } = {
  reactants: [
    { n: 6, text: "CO₂", atoms: { C: 1, O: 2 } },
    { n: 6, text: "H₂O", atoms: { H: 2, O: 1 } },
  ],
  products: [
    { n: 1, text: "C₆H₁₂O₆", atoms: { C: 6, H: 12, O: 6 } },
    { n: 6, text: "O₂", atoms: { O: 2 } },
  ],
};

/** The words under the figure (exported so the test can hold them to the concept's warning). */
export const NOTE_TEXT =
  "The O₂ comes from the water split in the thylakoids, not from CO₂. The Calvin cycle is called light-independent because light does not drive it directly, but it needs a constant supply of ATP and NADPH from the light-dependent reactions, so it stops within a minute of darkness.";

export function equationText(): string {
  const side = (ts: readonly Term[]) => ts.map((t) => `${t.n === 1 ? "" : t.n}${t.text}`).join(" + ");
  return `${side(EQUATION.reactants)} → ${side(EQUATION.products)}`;
}

/** Atom totals on one side, to check the equation balances. */
export function atomTotals(ts: readonly Term[]): Required<Formula> {
  const out = { C: 0, H: 0, O: 0 };
  for (const t of ts) for (const k of ["C", "H", "O"] as const) out[k] += t.n * (t.atoms[k] ?? 0);
  return out;
}

const ARROW = "stroke-slate-500 dark:stroke-slate-400";
const GRANUM = { x: 84, y: 112 };
const CALVIN = { x: 222, y: 104 };

export default function ImatChloroplastReactions() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the chloroplast and its two stages
      </p>

      <svg
        viewBox="0 0 320 248"
        className="block h-auto w-full"
        role="img"
        aria-label="A chloroplast: in the thylakoids of a granum, light splits water, releasing oxygen and making ATP and NADPH; in the stroma, the Calvin cycle uses them to fix carbon dioxide into sugar"
      >
        <defs>
          <marker id="chloro-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* Envelope: two membranes; the stroma fills it. */}
        <ellipse cx={160} cy={114} rx={150} ry={88} className="fill-emerald-50 stroke-emerald-700 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth={1.5} />
        <ellipse cx={160} cy={114} rx={144} ry={82} className="fill-none stroke-emerald-700 dark:stroke-emerald-400" strokeWidth={1} />
        <text x={206} y={22} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          envelope (two membranes)
        </text>

        {/* Granum: a stack of thylakoids. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={GRANUM.x}
            cy={GRANUM.y - 18 + i * 9}
            rx={26}
            ry={4.5}
            className="fill-green-500 stroke-green-800 dark:fill-green-600 dark:stroke-green-300"
            strokeWidth={1}
          />
        ))}
        <text x={GRANUM.x} y={142} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          thylakoids
        </text>
        <text x={112} y={117} className="fill-muted-foreground text-[10px]">
          granum
        </text>
        <text x={GRANUM.x} y={156} textAnchor="middle" className="fill-green-800 text-[10px] font-semibold dark:fill-green-300">
          light-dependent
        </text>
        <text x={GRANUM.x} y={168} textAnchor="middle" className="fill-green-800 text-[10px] font-semibold dark:fill-green-300">
          reactions
        </text>

        {/* Calvin cycle in the stroma. */}
        {/* A 320° arc from -60° round to 260°, the arrowhead closing the cycle. */}
        <path
          d="M235,81.48 A26,26 0 1,1 217.49,78.4"
          fill="none"
          className="stroke-amber-600 dark:stroke-amber-400"
          strokeWidth={2}
          markerEnd="url(#chloro-arrow)"
        />
        <text x={CALVIN.x} y={CALVIN.y - 2} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          Calvin
        </text>
        <text x={CALVIN.x} y={CALVIN.y + 10} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          cycle
        </text>
        <text x={CALVIN.x} y={146} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          stroma
        </text>
        <text x={CALVIN.x} y={158} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          light-independent
        </text>
        <text x={CALVIN.x} y={170} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          reactions
        </text>

        {/* Light in, water in, oxygen out (thylakoids). */}
        <line x1={104} y1={20} x2={92} y2={84} markerEnd="url(#chloro-arrow)" className="stroke-amber-500" strokeWidth={2} />
        <text x={110} y={18} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          light
        </text>
        <line x1={24} y1={190} x2={60} y2={128} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={18} y={204} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          H₂O
        </text>
        <line x1={62} y1={96} x2={22} y2={40} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={16} y={34} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          O₂
        </text>

        {/* ATP + NADPH to the Calvin cycle; ADP + Pi and NADP⁺ back. */}
        <line x1={114} y1={98} x2={190} y2={98} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={152} y={92} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          ATP + NADPH
        </text>
        <line x1={192} y1={124} x2={116} y2={124} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={154} y={138} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          ADP + Pi, NADP⁺
        </text>

        {/* CO₂ in, sugar out (stroma). */}
        <line x1={292} y1={34} x2={240} y2={82} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={298} y={30} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          CO₂
        </text>
        <line x1={240} y1={128} x2={288} y2={196} markerEnd="url(#chloro-arrow)" className={ARROW} strokeWidth={1.5} />
        <text x={314} y={214} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          sugar (C₆H₁₂O₆)
        </text>

        {/* Overall equation. */}
        <text x={160} y={240} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          {equationText()}
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Overall, with light energy and chlorophyll: {equationText()}. {NOTE_TEXT}
      </p>
    </div>
  );
}
