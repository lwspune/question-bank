"use client";

import { useState } from "react";

/**
 * Interactive: the switching-circuit translation rule — the single fact that
 * unlocks the hardest subtopic in MHT-CET Mathematical Logic (12 q at 67% HARD).
 *
 * ONE pair of switches drives BOTH circuits at once, and that is the whole
 * pedagogical point: at p = T, q = F the series lamp is dark while the parallel
 * lamp glows, so a student sees AND and OR disagree on the same input rather
 * than reading two separate pictures. Closing both, then neither, walks the
 * four rows of the truth table by hand.
 *
 * Was a static server component until 2026-09-20. It drew every switch OPEN
 * and both lamps LIT, which contradicted its own caption — the lamp state is
 * now derived from the switches and cannot disagree with them.
 *
 * Drawn as a real circuit (cell, switches, lamp) rather than as boxes, because
 * the exam prints real circuits and the whole skill is reading one.
 *
 * a11y: each switch is a real <button> in the SVG's sibling layer would lose
 * the geometry, so the switch group carries role="button" + tabIndex + Enter/
 * Space handling + aria-pressed, and renders a visible focus ring.
 */
export default function LogicSwitchSeriesParallel() {
  const [p, setP] = useState(false);
  const [q, setQ] = useState(false);

  const wire = "stroke-slate-500";
  const series = p && q;
  const parallel = p || q;

  const tf = (b: boolean) => (b ? "T" : "F");

  /**
   * A switch. Closed = blade lying flat on both contacts; open = blade lifted.
   * `on` drives the geometry, so the drawing can never disagree with the state.
   */
  const switchSym = (
    x: number,
    y: number,
    label: string,
    on: boolean,
    toggle: () => void,
    key: string
  ) => (
    <g
      key={key}
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={`Switch ${label}: ${on ? "closed" : "open"}. Activate to ${on ? "open" : "close"} it.`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="cursor-pointer outline-none [&:focus-visible_.focusring]:opacity-100"
    >
      {/* generous invisible hit area — the blade alone is a hard tap target on a phone */}
      <rect x={x - 10} y={y - 30} width={64} height={54} fill="transparent" />
      <rect
        x={x - 10}
        y={y - 30}
        width={64}
        height={54}
        rx={6}
        className="focusring pointer-events-none opacity-0 fill-none stroke-indigo-600 dark:stroke-indigo-400"
        strokeWidth="2"
      />
      <circle cx={x} cy={y} r={3.5} className="fill-slate-600 dark:fill-slate-300" />
      <line
        x1={x}
        y1={y}
        x2={on ? x + 44 : x + 34}
        y2={on ? y : y - 16}
        className="stroke-indigo-600 transition-all duration-200 dark:stroke-indigo-400"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={x + 44} cy={y} r={3.5} className="fill-slate-600 dark:fill-slate-300" />
      <text
        x={x + 22}
        y={y + 20}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        className="fill-indigo-800 dark:fill-indigo-200"
      >
        {label}
      </text>
    </g>
  );

  /** The lamp. Glows amber when lit, stays grey and unfilled when dark. */
  const lamp = (x: number, y: number, lit: boolean, key: string) => (
    <g key={key}>
      {lit && <circle cx={x} cy={y} r={22} className="fill-amber-400/25" />}
      <circle
        cx={x}
        cy={y}
        r={13}
        className={
          lit
            ? "fill-amber-400/70 stroke-amber-600 transition-colors dark:stroke-amber-400"
            : "fill-transparent stroke-slate-400 transition-colors dark:stroke-slate-600"
        }
        strokeWidth="2"
      />
      <line
        x1={x - 9}
        y1={y - 9}
        x2={x + 9}
        y2={y + 9}
        className={lit ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-slate-400 dark:stroke-slate-600"}
        strokeWidth="1.6"
      />
      <line
        x1={x + 9}
        y1={y - 9}
        x2={x - 9}
        y2={y + 9}
        className={lit ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-slate-400 dark:stroke-slate-600"}
        strokeWidth="1.6"
      />
      <text x={x} y={y + 32} textAnchor="middle" fontSize="11" className="fill-slate-500">
        L
      </text>
    </g>
  );

  /** The cell (long line = positive, short thick line = negative). */
  const cell = (x: number, y: number, key: string) => (
    <g key={key}>
      <line x1={x} y1={y - 12} x2={x} y2={y + 12} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2" />
      <line x1={x + 8} y1={y - 6} x2={x + 8} y2={y + 6} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="4" />
    </g>
  );

  /** A wire segment that lights up when current is actually flowing through it. */
  const live = (on: boolean) =>
    on ? "stroke-amber-500 transition-colors dark:stroke-amber-400" : `${wire} transition-colors`;

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <p className="mb-2 text-center text-xs font-medium text-brand-accent">
        Tap a switch to open or close it — both circuits share the same S₁ and S₂.
      </p>

      <svg
        viewBox="0 0 520 345"
        className="w-full"
        role="group"
        aria-label={`Switching circuits. S1 is ${tf(p)}, S2 is ${tf(q)}. The series lamp is ${
          series ? "glowing" : "dark"
        } and the parallel lamp is ${parallel ? "glowing" : "dark"}.`}
      >
        {/* ================= SERIES = AND ================= */}
        <text x={20} y={24} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Series
        </text>

        <line x1={40} y1={60} x2={110} y2={60} className={live(series)} strokeWidth="2" />
        {switchSym(110, 60, "S₁", p, () => setP((v) => !v), "a1")}
        <line x1={154} y1={60} x2={214} y2={60} className={live(series)} strokeWidth="2" />
        {switchSym(214, 60, "S₂", q, () => setQ((v) => !v), "a2")}
        <line x1={258} y1={60} x2={400} y2={60} className={live(series)} strokeWidth="2" />

        <line x1={400} y1={60} x2={400} y2={125} className={live(series)} strokeWidth="2" />
        <line x1={40} y1={60} x2={40} y2={125} className={live(series)} strokeWidth="2" />
        <line x1={40} y1={125} x2={175} y2={125} className={live(series)} strokeWidth="2" />
        {cell(175, 125, "c1")}
        <line x1={183} y1={125} x2={267} y2={125} className={live(series)} strokeWidth="2" />
        {lamp(280, 125, series, "l1")}
        <line x1={293} y1={125} x2={400} y2={125} className={live(series)} strokeWidth="2" />

        <text
          x={457}
          y={58}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          className="fill-emerald-700 dark:fill-emerald-300"
        >
          p ∧ q
        </text>
        <text x={457} y={78} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-200">
          = {tf(series)}
        </text>
        <text x={457} y={95} textAnchor="middle" fontSize="10" className="fill-slate-500">
          both needed
        </text>

        <line
          x1={20}
          y1={172}
          x2={500}
          y2={172}
          className="stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* ================= PARALLEL = OR ================= */}
        <text x={20} y={200} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Parallel
        </text>

        <line x1={40} y1={255} x2={110} y2={255} className={live(parallel)} strokeWidth="2" />
        <line x1={110} y1={230} x2={110} y2={280} className={live(parallel)} strokeWidth="2" />
        {/* each branch lights only if ITS OWN switch is closed — that is the OR, drawn */}
        <line x1={110} y1={230} x2={130} y2={230} className={live(p)} strokeWidth="2" />
        <line x1={110} y1={280} x2={130} y2={280} className={live(q)} strokeWidth="2" />
        {switchSym(130, 230, "S₁", p, () => setP((v) => !v), "b1")}
        {switchSym(130, 280, "S₂", q, () => setQ((v) => !v), "b2")}
        <line x1={174} y1={230} x2={200} y2={230} className={live(p)} strokeWidth="2" />
        <line x1={174} y1={280} x2={200} y2={280} className={live(q)} strokeWidth="2" />
        <line x1={200} y1={230} x2={200} y2={280} className={live(parallel)} strokeWidth="2" />
        <line x1={200} y1={255} x2={400} y2={255} className={live(parallel)} strokeWidth="2" />

        <line x1={400} y1={255} x2={400} y2={313} className={live(parallel)} strokeWidth="2" />
        <line x1={40} y1={255} x2={40} y2={313} className={live(parallel)} strokeWidth="2" />
        <line x1={40} y1={313} x2={175} y2={313} className={live(parallel)} strokeWidth="2" />
        {cell(175, 313, "c2")}
        <line x1={183} y1={313} x2={267} y2={313} className={live(parallel)} strokeWidth="2" />
        {lamp(280, 313, parallel, "l2")}
        <line x1={293} y1={313} x2={400} y2={313} className={live(parallel)} strokeWidth="2" />

        <text
          x={457}
          y={253}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          className="fill-emerald-700 dark:fill-emerald-300"
        >
          p ∨ q
        </text>
        <text x={457} y={273} textAnchor="middle" fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-200">
          = {tf(parallel)}
        </text>
        <text x={457} y={290} textAnchor="middle" fontSize="10" className="fill-slate-500">
          either will do
        </text>
      </svg>

      {/* Live readout — the row of the truth table the student is standing on. */}
      <p className="mt-2 text-center text-sm" aria-live="polite">
        <span className="font-mono font-semibold text-indigo-800 dark:text-indigo-200">
          p = {tf(p)}, q = {tf(q)}
        </span>
        <span className="text-muted-foreground"> → </span>
        <span className="font-mono font-semibold">
          p ∧ q = {tf(series)}, p ∨ q = {tf(parallel)}
        </span>
      </p>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        The lamp glowing is the statement being true. Series needs every switch
        closed, so it is AND; parallel needs only one, so it is OR. Close both,
        then one, then neither, and you have walked the whole truth table. A
        switch marked S′ is the negation, closed exactly when S is open.
      </p>
    </div>
  );
}
