/**
 * Static figure: what each protection tool guards (concept ssc2ccssc-protect).
 * - A firewall guards the network door: it filters traffic, letting some in
 *   and blocking the rest.
 * - Encryption in transit keeps data unreadable on its way: anyone who
 *   intercepts it sees scrambled text; the receiver reads it again.
 * - Hashing proves data has not changed: the hash of what arrived matches the
 *   hash of what was sent.
 * The scrambled text and the hash shown are made-up stand-ins, not real
 * output. Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const TOOLS = [
  { tool: "Firewall", guards: "the network door", does: "filters traffic in and out" },
  { tool: "Encryption in transit", guards: "data on its way", does: "unreadable to anyone who intercepts it" },
  { tool: "Hashing", guards: "that data is unchanged", does: "same hash: not altered" },
] as const;

/** Data is unaltered when the hash of what arrived equals the hash of what was sent. */
export const unaltered = (sentHash: string, receivedHash: string) => sentHash === receivedHash;

export const MESSAGE = "HELLO";
export const SCRAMBLED = "x7#Qk";
export const HASH = "9f2c";

const PANEL_Y = [8, 88, 166] as const;
const TITLE = "fill-sky-700 text-[11px] font-semibold dark:fill-sky-300";
const BOX = "fill-background stroke-border";
const OK = "stroke-emerald-600 dark:stroke-emerald-400";
const BAD = "stroke-rose-600 dark:stroke-rose-400";

function Head({ x, y, dir, cls }: { x: number; y: number; dir: 1 | -1; cls: string }) {
  return <polygon points={`${x},${y} ${x - 7 * dir},${y - 4} ${x - 7 * dir},${y + 4}`} className={cls} />;
}

export default function SscT2SecurityTools() {
  const [fw, enc, hash] = TOOLS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · each tool guards one thing
      </p>
      <svg
        viewBox="0 0 320 246"
        className="block h-auto w-full"
        role="img"
        aria-label="Three panels. Firewall: between the Internet and your network, it lets one stream of traffic through and blocks another. Encryption in transit: the message HELLO travels scrambled, so anyone who intercepts it sees only scrambled text, and the receiver reads HELLO. Hashing: the hash of the file sent and the hash of the file received are the same, so the data was not altered."
      >
        {/* Firewall */}
        <text x={8} y={PANEL_Y[0] + 10} className={TITLE}>
          {fw.tool}: guards {fw.guards}
        </text>
        <rect x={10} y={PANEL_Y[0] + 22} width={76} height={40} rx={8} className={BOX} />
        <text x={48} y={PANEL_Y[0] + 46} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Internet
        </text>
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={150} y={PANEL_Y[0] + 20 + k * 11} width={20} height={10} className="fill-amber-200 stroke-amber-700 dark:fill-amber-800 dark:stroke-amber-400" />
        ))}
        <rect x={234} y={PANEL_Y[0] + 22} width={78} height={40} rx={4} className={BOX} />
        <text x={273} y={PANEL_Y[0] + 46} textAnchor="middle" className="fill-foreground text-[10.5px]">
          your network
        </text>
        <line x1={88} y1={PANEL_Y[0] + 31} x2={226} y2={PANEL_Y[0] + 31} strokeWidth={1.6} className={OK} />
        <Head x={233} y={PANEL_Y[0] + 31} dir={1} cls="fill-emerald-600 dark:fill-emerald-400" />
        <text x={200} y={PANEL_Y[0] + 27} textAnchor="middle" className="fill-emerald-700 text-[9.5px] font-semibold dark:fill-emerald-300">
          allowed
        </text>
        <line x1={88} y1={PANEL_Y[0] + 53} x2={142} y2={PANEL_Y[0] + 53} strokeWidth={1.6} className={BAD} />
        <Head x={148} y={PANEL_Y[0] + 53} dir={1} cls="fill-rose-600 dark:fill-rose-400" />
        <text x={115} y={PANEL_Y[0] + 49} textAnchor="middle" className="fill-rose-700 text-[9.5px] font-semibold dark:fill-rose-300">
          blocked
        </text>
        <text x={160} y={PANEL_Y[0] + 76} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          it {fw.does}
        </text>

        {/* Encryption in transit */}
        <text x={8} y={PANEL_Y[1] + 10} className={TITLE}>
          {enc.tool}: guards {enc.guards}
        </text>
        <rect x={10} y={PANEL_Y[1] + 22} width={62} height={26} rx={4} className={BOX} />
        <text x={41} y={PANEL_Y[1] + 39} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {MESSAGE}
        </text>
        <line x1={74} y1={PANEL_Y[1] + 35} x2={120} y2={PANEL_Y[1] + 35} strokeWidth={1.4} className="stroke-muted-foreground" />
        <Head x={126} y={PANEL_Y[1] + 35} dir={1} cls="fill-muted-foreground" />
        <rect x={128} y={PANEL_Y[1] + 22} width={64} height={26} rx={4} className="fill-muted stroke-muted-foreground" />
        <text x={160} y={PANEL_Y[1] + 39} textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold">
          {SCRAMBLED}
        </text>
        <line x1={194} y1={PANEL_Y[1] + 35} x2={240} y2={PANEL_Y[1] + 35} strokeWidth={1.4} className="stroke-muted-foreground" />
        <Head x={246} y={PANEL_Y[1] + 35} dir={1} cls="fill-muted-foreground" />
        <rect x={248} y={PANEL_Y[1] + 22} width={62} height={26} rx={4} className={BOX} />
        <text x={279} y={PANEL_Y[1] + 39} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {MESSAGE}
        </text>
        <text x={41} y={PANEL_Y[1] + 60} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          sent
        </text>
        <text x={160} y={PANEL_Y[1] + 60} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          on the way
        </text>
        <text x={279} y={PANEL_Y[1] + 60} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          received
        </text>
        <text x={160} y={PANEL_Y[1] + 73} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {enc.does}
        </text>

        {/* Hashing */}
        <text x={8} y={PANEL_Y[2] + 10} className={TITLE}>
          {hash.tool}: guards {hash.guards}
        </text>
        {[
          { x: 10, label: "file sent" },
          { x: 180, label: "file received" },
        ].map((f) => (
          <g key={f.label}>
            <rect x={f.x} y={PANEL_Y[2] + 22} width={130} height={26} rx={4} className={BOX} />
            <text x={f.x + 65} y={PANEL_Y[2] + 39} textAnchor="middle" className="fill-foreground text-[10.5px]">
              {f.label}: hash {HASH}
            </text>
          </g>
        ))}
        <text x={160} y={PANEL_Y[2] + 39} textAnchor="middle" className="fill-emerald-700 text-[14px] font-semibold dark:fill-emerald-300">
          =
        </text>
        <text x={160} y={PANEL_Y[2] + 66} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          {unaltered(HASH, HASH) ? hash.does : "different hash: altered"}
        </text>
      </svg>
    </div>
  );
}
