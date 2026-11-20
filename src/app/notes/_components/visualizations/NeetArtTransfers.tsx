/**
 * Static figure: where each assisted reproductive method places what it
 * moves, in the words of the NEET concept "ZIFT, IUT, GIFT, ICSI and
 * artificial insemination" (nzorh-transfers).
 *
 * - ZIFT: a zygote or early embryo with up to 8 blastomeres, into the
 *   fallopian tube.
 * - GIFT: an ovum from a donor, into the fallopian tube of a female who cannot
 *   produce ova.
 * - IUT: an embryo with more than 8 blastomeres, into the uterus.
 * - IUI: semen put into the uterus. AI: semen into the vagina or the uterus.
 * - ICSI happens in the laboratory: a sperm injected directly into the ovum.
 *
 * Data exported and pinned by tests/notes-w2-07.test.ts. Server component.
 */

export type Place = "fallopian tube" | "uterus" | "vagina or uterus" | "laboratory";
export type Transfer = { method: string; lines: readonly string[]; place: Place };

export const TRANSFERS: readonly Transfer[] = [
  { method: "ZIFT", lines: ["zygote or early embryo,", "up to 8 blastomeres"], place: "fallopian tube" },
  { method: "GIFT", lines: ["ovum from a donor", "(for a female who", "cannot produce ova)"], place: "fallopian tube" },
  { method: "IUT", lines: ["embryo with more", "than 8 blastomeres"], place: "uterus" },
  { method: "IUI", lines: ["semen put into", "the uterus"], place: "uterus" },
  { method: "AI", lines: ["semen put into the", "vagina or uterus"], place: "vagina or uterus" },
  { method: "ICSI", lines: ["a sperm is injected directly into the ovum"], place: "laboratory" },
];

/** The dividing line the concept's trap names: up to 8 blastomeres, the tube; more, the uterus. */
export const BLASTOMERE_LINE = 8;
export function transferFor(blastomeres: number): { method: "ZIFT" | "IUT"; place: Place } {
  return blastomeres <= BLASTOMERE_LINE ? { method: "ZIFT", place: "fallopian tube" } : { method: "IUT", place: "uterus" };
}

type Tag = { method: string; x: number; y: number; w: number; h: number; to: { x: number; y: number }; from: { x: number; y: number } };

/** Tag boxes and the point of the tract each one's leader reaches. */
export const TAGS: readonly Tag[] = [
  { method: "ZIFT", x: 4, y: 4, w: 146, h: 54, from: { x: 80, y: 58 }, to: { x: 82, y: 76 } },
  { method: "GIFT", x: 170, y: 4, w: 146, h: 54, from: { x: 240, y: 58 }, to: { x: 238, y: 76 } },
  { method: "IUT", x: 4, y: 120, w: 110, h: 42, from: { x: 114, y: 140 }, to: { x: 132, y: 126 } },
  { method: "IUI", x: 206, y: 120, w: 110, h: 42, from: { x: 206, y: 140 }, to: { x: 188, y: 126 } },
  { method: "AI", x: 206, y: 176, w: 110, h: 42, from: { x: 206, y: 196 }, to: { x: 172, y: 206 } },
];

/** Uterus outline: wide top, narrowing to the cervix. */
export const UTERUS = "M122 92 Q122 80 134 80 L186 80 Q198 80 198 92 L172 164 L170 176 L150 176 L148 164 Z";
export const VAGINA = { x: 148, y: 176, w: 24, h: 50 };
const LEFT_TUBE = "M126 86 Q98 68 72 74 Q56 78 50 94";
const RIGHT_TUBE = "M194 86 Q222 68 248 74 Q264 78 270 94";

const TUBE_TAG = "fill-violet-50 stroke-violet-600 dark:fill-violet-950/40 dark:stroke-violet-400";
const UTERUS_TAG = "fill-rose-50 stroke-rose-600 dark:fill-rose-950/40 dark:stroke-rose-400";
const OTHER_TAG = "fill-card stroke-border";
const ORGAN = "fill-rose-100 stroke-rose-700 dark:fill-rose-950/50 dark:stroke-rose-300";
const TUBE = "fill-none stroke-rose-700 dark:stroke-rose-300";

function tagClass(p: Place): string {
  return p === "fallopian tube" ? TUBE_TAG : p === "uterus" ? UTERUS_TAG : OTHER_TAG;
}

export default function NeetArtTransfers() {
  const byMethod = new Map(TRANSFERS.map((t) => [t.method, t]));
  const icsi = byMethod.get("ICSI")!;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · what goes where
      </p>
      <svg
        viewBox="0 0 320 276"
        className="block h-auto w-full"
        role="img"
        aria-label="The female reproductive tract with labels for each method. ZIFT: a zygote or early embryo with up to 8 blastomeres goes into the fallopian tube. GIFT: an ovum from a donor goes into the fallopian tube of a female who cannot produce ova. IUT: an embryo with more than 8 blastomeres goes into the uterus. IUI: semen into the uterus. AI: semen into the vagina or uterus. ICSI happens in the laboratory: a sperm is injected directly into the ovum."
      >
        {/* The tract. */}
        <path d={LEFT_TUBE} strokeWidth={7} strokeLinecap="round" className={TUBE} />
        <path d={RIGHT_TUBE} strokeWidth={7} strokeLinecap="round" className={TUBE} />
        <path d={UTERUS} strokeWidth={1.5} className={ORGAN} />
        <rect x={VAGINA.x} y={VAGINA.y} width={VAGINA.w} height={VAGINA.h} rx={4} strokeWidth={1.5} className={ORGAN} />
        <text x={160} y={122} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Uterus</text>
        <text x={142} y={212} textAnchor="end" className="fill-foreground text-[10px] font-semibold">Vagina</text>
        <text x={8} y={112} className="fill-foreground text-[10px] font-semibold">Fallopian tube</text>

        {/* Tags and their leaders. */}
        {TAGS.map((g) => {
          const t = byMethod.get(g.method)!;
          return (
            <g key={g.method}>
              <line x1={g.from.x} y1={g.from.y} x2={g.to.x} y2={g.to.y} strokeWidth={1} className="stroke-muted-foreground" />
              <circle cx={g.to.x} cy={g.to.y} r={2} className="fill-muted-foreground" />
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={6} strokeWidth={1} className={tagClass(t.place)} />
              <text x={g.x + g.w / 2} y={g.y + 13} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {t.method}
              </text>
              {t.lines.map((l, k) => (
                <text key={l} x={g.x + g.w / 2} y={g.y + 26 + k * 12} textAnchor="middle" className="fill-foreground text-[10px]">
                  {l}
                </text>
              ))}
            </g>
          );
        })}

        {/* ICSI is not a transfer into the body. */}
        <rect x={4} y={234} width={312} height={38} rx={6} strokeWidth={1} className={OTHER_TAG} />
        <text x={160} y={248} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          ICSI (in the laboratory)
        </text>
        <text x={160} y={263} textAnchor="middle" className="fill-foreground text-[10px]">
          {icsi.lines[0]}
        </text>
      </svg>
    </div>
  );
}
