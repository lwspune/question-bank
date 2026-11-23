"use client";

/**
 * Animation: the vascular cambium of a dicot stem becoming a ring and adding
 * secondary xylem and phloem, in the NEET concept's own terms (nboan-cambium).
 *
 * A young stem has cambium only inside its bundles (intrafascicular cambium,
 * between primary xylem and primary phloem). The medullary ray cells next to
 * it become meristematic (interfascicular cambium), and the two make a
 * continuous cambial ring. The ring cuts off secondary xylem towards the pith
 * and secondary phloem towards the periphery, more xylem than phloem; the
 * primary phloem is crushed, the primary xylem stays in or around the centre,
 * and narrow secondary medullary rays run radially through both.
 *
 * Drawn schematically, not to scale. The interfascicular cambium is labelled
 * as coming from medullary ray cells, never the pericycle (the concept's first
 * trap), and the secondary xylem band is far wider than the secondary phloem
 * band (the second). Radii and steps are exported and pinned by
 * tests/notes-w2-06.test.ts. Nothing moves except by opacity.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

export const CAMBIUM_STEPS: readonly FigureStep[] = [
  {
    title: "A young stem",
    caption: "Each vascular bundle has a strip of cambium, the intrafascicular cambium, between its primary xylem and primary phloem.",
  },
  {
    title: "Interfascicular cambium",
    caption: "The medullary ray cells next to the intrafascicular cambium become meristematic: this is the interfascicular cambium.",
  },
  {
    title: "A continuous ring",
    caption: "The intrafascicular and interfascicular cambium together make a continuous cambial ring.",
  },
  {
    title: "Secondary growth",
    caption:
      "The ring cuts off secondary xylem towards the pith and secondary phloem towards the periphery. It is more active on the inner side, so there is more xylem; the primary phloem is crushed.",
  },
];

export const CENTRE = { x: 108, y: 140 } as const;
export const STEM_R = 94;
/** The cambium sits at the same radius in every step. */
export const RING_R = 60;
/** Six bundles, angles in degrees clockwise from the top. */
export const BUNDLE_ANGLES = [0, 60, 120, 180, 240, 300] as const;
/** Half the angle a bundle's cambium strip spans. */
export const BUNDLE_HALF = 11;

/** The young stem's bundle, radial extents. */
export const YOUNG = { xylem: [38, 57], phloem: [63, 75] } as const;
/** After secondary growth, radial extents of each band. */
export const OLD = {
  pith: 20,
  primaryXylem: [20, 28],
  secondaryXylem: [29, 58],
  secondaryPhloem: [62, 69],
  primaryPhloemCrushed: [70, 72],
} as const;

export function polar(r: number, deg: number): { x: number; y: number } {
  const a = (deg * Math.PI) / 180;
  return { x: Math.round((CENTRE.x + r * Math.sin(a)) * 100) / 100, y: Math.round((CENTRE.y - r * Math.cos(a)) * 100) / 100 };
}

function arc(r: number, from: number, to: number): string {
  const a = polar(r, from);
  const b = polar(r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M${a.x},${a.y} A${r},${r} 0 ${large} 1 ${b.x},${b.y}`;
}

function annulus(r0: number, r1: number): string {
  const { x, y } = CENTRE;
  const ring = (r: number) => `M${x - r},${y} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0`;
  return `${ring(r1)} ${ring(r0)}`;
}

/** A bundle-shaped band between two radii, centred on an angle. */
function wedge(r0: number, r1: number, deg: number, half: number): string {
  const p = [polar(r0, deg - half), polar(r0, deg + half), polar(r1, deg + half * 1.15), polar(r1, deg - half * 1.15)];
  return `M${p[0].x},${p[0].y} L${p[1].x},${p[1].y} L${p[2].x},${p[2].y} L${p[3].x},${p[3].y} Z`;
}

/** Thickness of a band. */
export function width(band: readonly [number, number] | readonly number[]): number {
  return band[1] - band[0];
}

const XYLEM = "fill-rose-300 stroke-rose-700 dark:fill-rose-800/70 dark:stroke-rose-300";
const PHLOEM = "fill-sky-300 stroke-sky-700 dark:fill-sky-800/70 dark:stroke-sky-300";
const CAMBIUM = "stroke-emerald-600 dark:stroke-emerald-400";

function Label({ x, y, to, lines, show }: { x: number; y: number; to: { x: number; y: number }; lines: readonly string[]; show: boolean }) {
  return (
    <g className={MOTION} style={{ opacity: show ? 1 : 0 }}>
      <line x1={x - 3} y1={y - 3} x2={to.x} y2={to.y} className="stroke-muted-foreground" strokeWidth={0.8} />
      <circle cx={to.x} cy={to.y} r={1.6} className="fill-foreground" />
      <text x={x} y={y} className="fill-foreground text-[10px] font-semibold">
        {lines.map((l, i) => (
          <tspan key={l} x={x} dy={i === 0 ? 0 : 11}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

const LX = 214;

export default function NeetCambiumRing() {
  return (
    <StepFigure
      title="Animation · the vascular cambium ring"
      label="A dicot stem: cambium strips inside the bundles join with the interfascicular cambium from medullary ray cells into a continuous ring, which cuts off a wide band of secondary xylem towards the pith and a thin band of secondary phloem towards the periphery"
      viewBox="0 0 320 242"
      steps={CAMBIUM_STEPS}
      note="Schematic, not to scale. Secondary growth happens in dicots and gymnosperms, not in monocots."
    >
      {(step) => {
        const young = step <= 2;
        const old = step >= 3;
        const layers: ReactNode = (
          <g>
            <circle cx={CENTRE.x} cy={CENTRE.y} r={STEM_R} className="fill-lime-50 stroke-lime-700 dark:fill-lime-950/30 dark:stroke-lime-400" strokeWidth={1.5} />

            {/* Young stem: bundles. */}
            <g className={MOTION} style={{ opacity: young ? 1 : 0 }}>
              {BUNDLE_ANGLES.map((a) => (
                <g key={`b-${a}`}>
                  <path d={wedge(YOUNG.xylem[0], YOUNG.xylem[1], a, 7)} className={XYLEM} strokeWidth={1} />
                  <path d={wedge(YOUNG.phloem[0], YOUNG.phloem[1], a, BUNDLE_HALF)} className={PHLOEM} strokeWidth={1} />
                </g>
              ))}
              <text x={CENTRE.x} y={CENTRE.y + 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                pith
              </text>
            </g>

            {/* After secondary growth. */}
            <g className={MOTION} style={{ opacity: old ? 1 : 0 }}>
              <path d={annulus(OLD.secondaryXylem[0], OLD.secondaryXylem[1])} fillRule="evenodd" className={XYLEM} strokeWidth={1} />
              <path d={annulus(OLD.secondaryPhloem[0], OLD.secondaryPhloem[1])} fillRule="evenodd" className={PHLOEM} strokeWidth={1} />
              <path
                d={annulus(OLD.primaryPhloemCrushed[0], OLD.primaryPhloemCrushed[1])}
                fillRule="evenodd"
                className="fill-sky-800 dark:fill-sky-500"
              />
              {BUNDLE_ANGLES.map((a) => (
                <path key={`px-${a}`} d={wedge(OLD.primaryXylem[0], OLD.primaryXylem[1], a, 9)} className={XYLEM} strokeWidth={1} />
              ))}
              {BUNDLE_ANGLES.map((a) => {
                const p0 = polar(OLD.secondaryXylem[0] + 2, a + 30);
                const p1 = polar(OLD.secondaryPhloem[1], a + 30);
                return (
                  <line key={`ray-${a}`} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} className="stroke-lime-50 dark:stroke-lime-950" strokeWidth={2.2} />
                );
              })}
            </g>

            {/* Cambium: intrafascicular strips in every step. */}
            {BUNDLE_ANGLES.map((a) => (
              <path key={`ic-${a}`} d={arc(RING_R, a - BUNDLE_HALF, a + BUNDLE_HALF)} fill="none" className={CAMBIUM} strokeWidth={2.6} />
            ))}
            {/* Interfascicular cambium forming from medullary ray cells. */}
            <g className={MOTION} style={{ opacity: step === 1 ? 1 : 0 }}>
              {BUNDLE_ANGLES.map((a) => (
                <path
                  key={`if-${a}`}
                  d={arc(RING_R, a + BUNDLE_HALF, a + 60 - BUNDLE_HALF)}
                  fill="none"
                  strokeDasharray="3 2.5"
                  className={CAMBIUM}
                  strokeWidth={2.6}
                />
              ))}
            </g>
            {/* The continuous ring. */}
            <circle
              cx={CENTRE.x}
              cy={CENTRE.y}
              r={RING_R}
              fill="none"
              className={`${CAMBIUM} ${MOTION}`}
              strokeWidth={2.6}
              style={{ opacity: step >= 2 ? 1 : 0 }}
            />
          </g>
        );
        return (
          <g>
            {layers}

            {/* Young labels. */}
            <Label x={LX} y={30} to={polar(70, 60)} lines={["primary phloem"]} show={young} />
            <Label x={LX} y={72} to={polar(RING_R, 60)} lines={["intrafascicular", "cambium"]} show={young} />
            <Label x={LX} y={124} to={polar(RING_R, 90)} lines={["medullary ray", "cells"]} show={step === 0} />
            <Label x={LX} y={124} to={polar(RING_R, 90)} lines={["interfascicular", "cambium"]} show={step === 1} />
            <Label x={LX} y={124} to={polar(RING_R, 90)} lines={["continuous", "cambial ring"]} show={step === 2} />
            <Label x={LX} y={186} to={polar(48, 120)} lines={["primary xylem"]} show={young} />

            {/* Labels after secondary growth. */}
            <Label x={LX} y={22} to={polar(71, 20)} lines={["primary phloem,", "crushed"]} show={old} />
            <Label x={LX} y={62} to={polar(66, 50)} lines={["secondary phloem", "(less)"]} show={old} />
            <Label x={LX} y={102} to={polar(RING_R, 75)} lines={["vascular", "cambium"]} show={old} />
            <Label x={LX} y={142} to={polar(44, 105)} lines={["secondary xylem", "(more)"]} show={old} />
            <Label x={LX} y={186} to={polar(46, 150)} lines={["secondary", "medullary ray"]} show={old} />
            <Label x={LX} y={226} to={polar(25, 180)} lines={["primary xylem"]} show={old} />

          </g>
        );
      }}
    </StepFigure>
  );
}
