/**
 * Static figure: left and right at a round table, from the IMAT concept
 * imat-spa-seating, drawn with its worked example. Lia, Max, Nora and Omar sit
 * at four evenly spaced seats, all facing the centre, seen from above. Seats
 * are numbered 0 to 3 clockwise from Lia: Lia 0, Omar 1, Max 2 (opposite
 * Lia), Nora 3 (immediately to Lia's right).
 *
 * The concept's rule: a person's left-hand neighbour is the next seat
 * clockwise, the right-hand neighbour the next seat anticlockwise. Each person
 * carries a small L and R on the correct sides, and two arrows show the
 * example's facts: Nora is on Lia's right, Max is on Omar's left (the answer).
 *
 * The seating and the left/right relations are exported and pinned by
 * tests/notes-imat-visuals-logic.test.ts. Server component, no client state.
 */

/** Seat numbers clockwise seen from above; seat 0 at the bottom. */
export const SEATING: readonly { seat: number; name: string }[] = [
  { seat: 0, name: "Lia" },
  { seat: 1, name: "Omar" },
  { seat: 2, name: "Max" },
  { seat: 3, name: "Nora" },
];
export const SEATS = SEATING.length;

/** The seat immediately to the left of someone facing the centre: next clockwise. */
export function leftOf(seat: number, n: number = SEATS): number {
  return (seat + 1) % n;
}
/** The seat immediately to the right: next anticlockwise. */
export function rightOf(seat: number, n: number = SEATS): number {
  return (seat + n - 1) % n;
}
export function oppositeOf(seat: number, n: number = SEATS): number {
  return (seat + n / 2) % n;
}
export function nameAt(seat: number): string {
  return SEATING.find((s) => s.seat === seat)?.name ?? "";
}

export const CENTRE = { x: 160, y: 118 } as const;
const R_SEAT = 74;

/** Screen position of a seat. SVG y points down, so a growing angle turns clockwise on screen. */
export function seatPos(seat: number, radius: number = R_SEAT, n: number = SEATS): { x: number; y: number } {
  const a = Math.PI / 2 + (seat * 2 * Math.PI) / n;
  return { x: Math.round((CENTRE.x + radius * Math.cos(a)) * 100) / 100, y: Math.round((CENTRE.y + radius * Math.sin(a)) * 100) / 100 };
}

/**
 * The direction of a seated person's left hand on screen. They face the centre
 * (f); seen from above, their left is f turned a quarter turn: (fx, fy) to
 * (fy, −fx) in SVG coordinates (y down). Lia, at the bottom facing up, gets
 * (−1, 0): the page's left.
 */
export function leftHand(seat: number): { x: number; y: number } {
  const p = seatPos(seat);
  const fx = CENTRE.x - p.x;
  const fy = CENTRE.y - p.y;
  const len = Math.hypot(fx, fy);
  return { x: fy / len, y: -fx / len };
}

const r2 = (v: number) => Math.round(v * 100) / 100;

/** An arc along the seat circle from one seat to the next, with an arrowhead. */
function arcPath(from: number, to: number, radius: number, clockwise: boolean): string {
  const shrink = 0.32; // radians kept clear at each end
  const n = SEATS;
  const a0 = Math.PI / 2 + (from * 2 * Math.PI) / n + (clockwise ? shrink : -shrink);
  let a1 = Math.PI / 2 + (to * 2 * Math.PI) / n + (clockwise ? -shrink : shrink);
  if (clockwise && a1 < a0) a1 += 2 * Math.PI;
  if (!clockwise && a1 > a0) a1 -= 2 * Math.PI;
  const p0 = { x: r2(CENTRE.x + radius * Math.cos(a0)), y: r2(CENTRE.y + radius * Math.sin(a0)) };
  const p1 = { x: r2(CENTRE.x + radius * Math.cos(a1)), y: r2(CENTRE.y + radius * Math.sin(a1)) };
  return `M${p0.x},${p0.y} A${radius},${radius} 0 0 ${clockwise ? 1 : 0} ${p1.x},${p1.y}`;
}

const LIA = 0;
const OMAR = 1;

export default function ImatSeatingCircle() {
  const outer = 104;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · left and right at a round table
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="A round table seen from above with four people facing the centre: Lia at the bottom, Omar on the left, Max at the top, Nora on the right. Each person's left hand points clockwise. Nora is immediately to Lia's right, and Max is immediately to Omar's left."
      >
        <defs>
          <marker id="imat-seat-arrow-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="imat-seat-arrow-l" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        <circle cx={CENTRE.x} cy={CENTRE.y} r={46} className="fill-amber-100 stroke-amber-600 dark:fill-amber-900/40 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={CENTRE.x} y={CENTRE.y - 2} textAnchor="middle" className="fill-amber-800 text-[10px] dark:fill-amber-200">
          table
        </text>
        <text x={CENTRE.x} y={CENTRE.y + 11} textAnchor="middle" className="fill-amber-800 text-[10px] dark:fill-amber-200">
          (seen from above)
        </text>

        {/* Lia's right: anticlockwise to Nora. Omar's left: clockwise to Max. */}
        <path d={arcPath(LIA, rightOf(LIA), outer, false)} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth={2} markerEnd="url(#imat-seat-arrow-r)" />
        <path d={arcPath(OMAR, leftOf(OMAR), outer, true)} className="fill-none stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} markerEnd="url(#imat-seat-arrow-l)" />
        <text x={272} y={214} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          Lia&apos;s right: Nora
        </text>
        <text x={48} y={30} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          Omar&apos;s left: Max
        </text>

        {SEATING.map(({ seat, name }) => {
          const p = seatPos(seat);
          const toward = { x: (CENTRE.x - p.x) / R_SEAT, y: (CENTRE.y - p.y) / R_SEAT };
          const lh = leftHand(seat);
          const nose = `${r2(p.x + toward.x * 18)},${r2(p.y + toward.y * 18)} ${r2(p.x + toward.x * 11 + lh.x * 5)},${r2(p.y + toward.y * 11 + lh.y * 5)} ${r2(p.x + toward.x * 11 - lh.x * 5)},${r2(p.y + toward.y * 11 - lh.y * 5)}`;
          const side = Math.abs(toward.x) > 0.5;
          const label = side
            ? { x: r2(p.x - toward.x * 16), y: r2(p.y + 4), anchor: (toward.x > 0 ? "end" : "start") as "end" | "start" }
            : { x: r2(p.x), y: r2(p.y - toward.y * 24 + 4), anchor: "middle" as const };
          return (
            <g key={seat}>
              <circle cx={p.x} cy={p.y} r={11} className="fill-indigo-100 stroke-indigo-600 dark:fill-indigo-900/50 dark:stroke-indigo-300" strokeWidth={1.5} />
              <polygon points={nose} className="fill-indigo-600 dark:fill-indigo-300" />
              <text x={r2(p.x + lh.x * 17)} y={r2(p.y + lh.y * 17 + 3.5)} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                L
              </text>
              <text x={r2(p.x - lh.x * 17)} y={r2(p.y - lh.y * 17 + 3.5)} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
                R
              </text>
              <text x={label.x} y={label.y} textAnchor={label.anchor} className="fill-foreground text-[11px] font-semibold">
                {name} ({seat})
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Everyone faces the centre (the small triangles). Seen from above, each person&apos;s left hand (L) points
        clockwise and the right hand (R) anticlockwise. Seats are numbered clockwise from Lia: Max (2) is opposite her,
        Nora (3) is on her right, so Omar takes seat 1, and Omar&apos;s left is the next seat clockwise, Max.
      </p>
    </div>
  );
}
