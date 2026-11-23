"use client";

/**
 * Animated figure: the life cycle of Plasmodium across its two hosts, in the
 * words and order of the NEET concept "The life cycle of Plasmodium"
 * (nzohh-malaria), its seven-stage table.
 *
 * 1. Sporozoites enter the human blood by the bite of an infected female
 *    Anopheles. 2. They multiply asexually in the liver cells. 3. They
 *    multiply asexually in the red blood cells and burst them; haemozoin
 *    causes the chill and fever. 4. Gametocytes develop in the red blood
 *    cells. 5. A female Anopheles takes them up with a blood meal.
 *    6. Fertilisation in the mosquito's stomach. 7. Mature sporozoites reach
 *    the salivary glands, ready for the next bite.
 *
 * One marker (the parasite) moves from stop to stop; it changes colour while
 * it is a gametocyte. The station labels are always shown, so the last step
 * is the whole cycle. Data exported and pinned by tests/notes-w2-07.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type Station = { id: string; x: number; y: number; w: number; h: number; lines: readonly string[]; host: "human" | "mosquito" };

export const STATIONS: readonly Station[] = [
  { id: "blood", x: 14, y: 46, w: 112, h: 30, lines: ["Sporozoites", "enter the blood"], host: "human" },
  { id: "liver", x: 14, y: 102, w: 112, h: 30, lines: ["Liver cells", "multiply asexually"], host: "human" },
  { id: "rbc", x: 14, y: 158, w: 112, h: 44, lines: ["Red blood cells", "multiply asexually,", "gametocytes form"], host: "human" },
  { id: "salivary", x: 194, y: 46, w: 112, h: 30, lines: ["Salivary glands", "sporozoites stored"], host: "mosquito" },
  { id: "stomach", x: 194, y: 158, w: 112, h: 44, lines: ["Stomach", "fertilisation and", "development"], host: "mosquito" },
];

export type Stage = { title: string; caption: string; at: string; gametocyte: boolean };

/** The concept's table, in order. `at` names the station (or "meal", the crossing). */
export const STAGES: readonly Stage[] = [
  {
    title: "Sporozoites enter",
    caption: "An infected female Anopheles bites a person and injects sporozoites, the infectious form, into the blood.",
    at: "blood",
    gametocyte: false,
  },
  {
    title: "Liver cells",
    caption: "The parasites reach the liver through the blood, multiply asexually in the liver cells, and are released into the blood.",
    at: "liver",
    gametocyte: false,
  },
  {
    title: "Red blood cells",
    caption: "The parasites multiply asexually in the red blood cells and burst them. The haemozoin released causes chill and high fever every three to four days.",
    at: "rbc",
    gametocyte: false,
  },
  {
    title: "Gametocytes",
    caption: "The sexual stages, gametocytes, develop in the red blood cells of the human.",
    at: "rbc",
    gametocyte: true,
  },
  {
    title: "Blood meal",
    caption: "A female Anopheles bites the infected person, and the gametocytes enter the mosquito with the blood.",
    at: "meal",
    gametocyte: true,
  },
  {
    title: "Fertilisation",
    caption: "Fertilisation and development take place in the mosquito's stomach. In the human, Plasmodium only multiplies asexually.",
    at: "stomach",
    gametocyte: false,
  },
  {
    title: "Salivary glands",
    caption: "Mature sporozoites escape from the intestine and reach the salivary glands, ready to be injected at the next bite.",
    at: "salivary",
    gametocyte: false,
  },
];

export const STEPS: readonly FigureStep[] = STAGES.map(({ title, caption }) => ({ title, caption }));

/** The midpoint of the blood-meal arrow, between the two hosts. */
export const MEAL = { x: 160, y: 206 };

/** Where the parasite marker sits in a step: on the outer side of its station's box. */
export function markerAt(step: number): { x: number; y: number } {
  const s = STAGES[step];
  if (s.at === "meal") return MEAL;
  const st = STATIONS.find((t) => t.id === s.at)!;
  return st.host === "human" ? { x: st.x - 8, y: st.y + st.h / 2 } : { x: st.x + st.w + 8, y: st.y + st.h / 2 };
}

/** The arrows of the cycle, in order. */
export const ARROWS: readonly { label: string; points: readonly [number, number][] }[] = [
  { label: "", points: [[70, 76], [70, 100]] },
  { label: "", points: [[70, 132], [70, 156]] },
  { label: "blood meal", points: [[126, 196], [192, 196]] },
  { label: "", points: [[250, 158], [250, 78]] },
  { label: "bite", points: [[194, 56], [128, 56]] },
];

const BOX_HUMAN = "fill-rose-50 stroke-rose-600 dark:fill-rose-950/40 dark:stroke-rose-400";
const BOX_MOSQ = "fill-sky-50 stroke-sky-600 dark:fill-sky-950/40 dark:stroke-sky-400";

export default function NeetPlasmodiumCycle() {
  return (
    <StepFigure
      title="Animation · the life cycle of Plasmodium"
      label="The life cycle of Plasmodium in two hosts. In the human: sporozoites enter the blood, multiply asexually in the liver cells, then in the red blood cells, where gametocytes form. A female Anopheles takes up the gametocytes with a blood meal; fertilisation happens in its stomach, and sporozoites reach its salivary glands, ready for the next bite."
      viewBox="0 0 320 216"
      steps={STEPS}
    >
      {(step) => {
        const p = markerAt(step);
        const gam = STAGES[step].gametocyte;
        return (
          <g>
            <defs>
              <marker id="neet-plasmodium-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
              </marker>
            </defs>
            <text x={70} y={14} textAnchor="middle" className="fill-rose-800 text-[11px] font-semibold dark:fill-rose-200">Human</text>
            <text x={70} y={27} textAnchor="middle" className="fill-muted-foreground text-[10px]">(asexual only)</text>
            <text x={250} y={14} textAnchor="middle" className="fill-sky-800 text-[11px] font-semibold dark:fill-sky-200">Female Anopheles</text>
            <text x={250} y={27} textAnchor="middle" className="fill-muted-foreground text-[10px]">(fertilisation here)</text>
            <line x1={160} y1={6} x2={160} y2={150} strokeWidth={1} strokeDasharray="3 3" className="stroke-border" />

            {ARROWS.map((a, i) => (
              <g key={i}>
                <polyline points={a.points.map(([x, y]) => `${x},${y}`).join(" ")} strokeWidth={1.25} markerEnd="url(#neet-plasmodium-arrow)" className="fill-none stroke-foreground" />
                {a.label && (
                  <text x={(a.points[0][0] + a.points[1][0]) / 2} y={a.points[0][1] - 5} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    {a.label}
                  </text>
                )}
              </g>
            ))}

            {STATIONS.map((s) => {
              const active = STAGES[step].at === s.id;
              return (
                <g key={s.id}>
                  <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={6} strokeWidth={active ? 2.5 : 1} className={`${s.host === "human" ? BOX_HUMAN : BOX_MOSQ} ${MOTION}`} />
                  {s.lines.map((l, k) => (
                    <text key={l} x={s.x + s.w / 2} y={s.y + 12 + k * 12} textAnchor="middle" className={k === 0 ? "fill-foreground text-[10px] font-semibold" : "fill-foreground text-[10px]"}>
                      {l}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* The parasite: amber, violet while it is a gametocyte. */}
            <circle r={6} strokeWidth={1} className={`fill-amber-400 stroke-amber-800 dark:fill-amber-300 dark:stroke-amber-100 ${MOTION}`} style={{ transform: svgTransform(p), opacity: gam ? 0 : 1 }} />
            <circle r={6} strokeWidth={1} className={`fill-violet-500 stroke-violet-900 dark:fill-violet-400 dark:stroke-violet-100 ${MOTION}`} style={{ transform: svgTransform(p), opacity: gam ? 1 : 0 }} />
          </g>
        );
      }}
    </StepFigure>
  );
}
