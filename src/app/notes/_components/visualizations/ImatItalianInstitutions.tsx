/**
 * Static figure: who chooses whom in the Italian state, as the IMAT concept
 * "Parliament, President of the Republic and Government of Italy" states it.
 *
 * - Citizens elect only Parliament directly: the Chamber of Deputies (400) and
 *   the Senate (200 elected, plus a few senators for life), both for 5 years,
 *   with the same powers (perfect bicameralism).
 * - Parliament in joint session, joined by 58 regional delegates, elects the
 *   President of the Republic (7 years, at least 50).
 * - The President of the Republic appoints the Prime Minister (President of
 *   the Council of Ministers).
 * - The Government needs the confidence of both chambers.
 *
 * The concept's trap is that Italians elect neither the President nor the
 * Prime Minister directly, so the only arrow leaving "Citizens" goes to
 * Parliament. Boxes and arrows are exported and pinned by
 * tests/notes-imat-visuals-reading.test.ts (each arrow starts and ends on the
 * right box, and the numbers match the concept).
 *
 * Server component, no client state.
 */

export type Box = { id: string; lines: readonly string[]; x: number; y: number; w: number; h: number };

export const BOXES = {
  citizens: { id: "citizens", lines: ["Citizens", "voters aged 18+"], x: 100, y: 8, w: 120, h: 34 },
  parliament: { id: "parliament", lines: ["Parliament", "elected for 5 years"], x: 16, y: 74, w: 288, h: 104 },
  president: { id: "president", lines: ["President of", "the Republic", "Head of State", "7 years, aged 50+"], x: 8, y: 248, w: 120, h: 64 },
  government: {
    id: "government",
    lines: ["Government", "Prime Minister", "(President of the", "Council of Ministers)", "+ ministers"],
    x: 192,
    y: 248,
    w: 120,
    h: 76,
  },
} as const satisfies Record<string, Box>;

/** The two chambers, drawn inside the Parliament box. */
export const CHAMBERS = [
  { id: "chamber", name: "Chamber of Deputies", seats: 400, lines: ["Chamber of Deputies", "400 members"], x: 28, y: 108, w: 128, h: 48 },
  { id: "senate", name: "Senate of the Republic", seats: 200, lines: ["Senate", "200 elected members", "+ senators for life"], x: 164, y: 108, w: 128, h: 48 },
] as const;

/** The numbers the figure prints, as the concept states them. */
export const FACTS = {
  deputies: 400,
  senatorsElected: 200,
  parliamentTermYears: 5,
  presidentTermYears: 7,
  presidentMinAge: 50,
  regionalDelegates: 58,
  voterMinAge: 18,
} as const;

export type BoxId = keyof typeof BOXES;

export type Link = {
  from: BoxId;
  to: BoxId;
  /** The verb, in the concept's words. */
  verb: string;
  /** Label lines; the first one holds the verb. */
  label: readonly string[];
  /** Polyline in viewBox units, in the direction of the arrow. */
  points: readonly { x: number; y: number }[];
  labelAt: { x: number; y: number; anchor: "start" | "middle" | "end" };
};

export const LINKS: readonly Link[] = [
  {
    from: "citizens",
    to: "parliament",
    verb: "elect directly",
    label: ["elect directly"],
    points: [
      { x: 160, y: 42 },
      { x: 160, y: 74 },
    ],
    labelAt: { x: 167, y: 62, anchor: "start" },
  },
  {
    from: "parliament",
    to: "president",
    verb: "elects",
    label: ["elects, in joint session", "+ 58 regional delegates"],
    points: [
      { x: 60, y: 178 },
      { x: 60, y: 248 },
    ],
    labelAt: { x: 67, y: 196, anchor: "start" },
  },
  {
    from: "parliament",
    to: "government",
    verb: "gives or withdraws confidence",
    label: ["gives or withdraws", "confidence (both chambers)"],
    points: [
      { x: 262, y: 178 },
      { x: 262, y: 248 },
    ],
    labelAt: { x: 255, y: 222, anchor: "end" },
  },
  {
    from: "president",
    to: "government",
    verb: "appoints",
    label: ["appoints"],
    points: [
      { x: 128, y: 270 },
      { x: 192, y: 270 },
    ],
    labelAt: { x: 160, y: 262, anchor: "middle" },
  },
];

/** True when a point lies on the border of a box (within 0.5 units). */
export function onBorder(p: { x: number; y: number }, b: Box): boolean {
  const inX = p.x >= b.x - 0.5 && p.x <= b.x + b.w + 0.5;
  const inY = p.y >= b.y - 0.5 && p.y <= b.y + b.h + 0.5;
  const onV = Math.abs(p.x - b.x) <= 0.5 || Math.abs(p.x - (b.x + b.w)) <= 0.5;
  const onH = Math.abs(p.y - b.y) <= 0.5 || Math.abs(p.y - (b.y + b.h)) <= 0.5;
  return (onV && inY) || (onH && inX);
}

const BOX_TONE: Record<BoxId, string> = {
  citizens: "fill-muted/40 stroke-muted-foreground",
  parliament: "fill-sky-50 stroke-sky-600 dark:fill-sky-950/40 dark:stroke-sky-400",
  president: "fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400",
  government: "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400",
};

function Arrow({ link }: { link: Link }) {
  const a = link.points[link.points.length - 2];
  const b = link.points[link.points.length - 1];
  const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return (
    <g>
      <polyline
        points={link.points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        strokeWidth={2}
        className="stroke-indigo-600 dark:stroke-indigo-400"
      />
      <polygon points="0,0 -9,-5 -9,5" transform={`translate(${b.x} ${b.y}) rotate(${angle})`} className="fill-indigo-600 dark:fill-indigo-400" />
      {link.label.map((line, i) => (
        <text
          key={i}
          x={link.labelAt.x}
          y={link.labelAt.y + i * 12}
          textAnchor={link.labelAt.anchor}
          className={i === 0 ? "fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300" : "fill-muted-foreground text-[10px]"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function ImatItalianInstitutions() {
  const p = BOXES.parliament;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · Who chooses whom in the Italian Republic
      </p>
      <svg
        viewBox="0 0 320 330"
        className="block h-auto w-full"
        role="img"
        aria-label="The Italian state: citizens aged 18 and over directly elect Parliament, made of the Chamber of Deputies (400 members) and the Senate (200 elected members plus senators for life), for 5 years. Parliament in joint session, with 58 regional delegates, elects the President of the Republic for 7 years. The President appoints the Prime Minister. The Government needs the confidence of both chambers."
      >
        {(Object.keys(BOXES) as BoxId[]).map((id) => {
          const b: Box = BOXES[id];
          const isParliament = id === "parliament";
          return (
            <g key={id}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6} strokeWidth={1.5} className={BOX_TONE[id]} />
              {b.lines.slice(0, isParliament ? 1 : undefined).map((line, i) => (
                <text
                  key={i}
                  x={b.x + b.w / 2}
                  y={b.y + 14 + i * 12}
                  textAnchor="middle"
                  className={i === 0 ? "fill-foreground text-[11px] font-semibold" : "fill-muted-foreground text-[10px]"}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Inside Parliament: its term, the two chambers and their equal powers */}
        <text x={p.x + p.w / 2} y={p.y + 28} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {BOXES.parliament.lines[1]}
        </text>
        {CHAMBERS.map((c) => (
          <g key={c.id}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={4} strokeWidth={1} className="fill-background stroke-sky-500 dark:stroke-sky-500" />
            {c.lines.map((line, i) => (
              <text
                key={i}
                x={c.x + c.w / 2}
                y={c.y + (c.lines.length === 2 ? 20 : 14) + i * 12}
                textAnchor="middle"
                className={i === 0 ? "fill-foreground text-[10px] font-semibold" : "fill-muted-foreground text-[10px]"}
              >
                {line}
              </text>
            ))}
          </g>
        ))}
        <text x={p.x + p.w / 2} y={p.y + p.h - 10} textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-300">
          same powers: perfect bicameralism
        </text>

        {LINKS.map((l) => (
          <Arrow key={`${l.from}-${l.to}`} link={l} />
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Italians directly elect only Parliament. Parliament elects the President of the Republic, the President appoints
        the Prime Minister, and the Government stays in office only while both chambers give it their confidence. That
        chain makes Italy a parliamentary republic.
      </p>
    </div>
  );
}
