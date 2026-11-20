/**
 * Static figure: a hub against a switch (concept ssc2cnwnw-device). Computer A
 * sends data meant for computer D. A hub does no filtering: it sends the data
 * out of every other port, to B, C and D. A switch filters: it reads D's MAC
 * address and sends the data only to D.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type Device = "hub" | "switch";

export const PORTS = ["A", "B", "C", "D"] as const;
export const SENDER = "A";
export const TARGET = "D";

/** The computers that receive data sent from `from` to `to`. */
export function deliver(device: Device, from: string, to: string, ports: readonly string[] = PORTS): string[] {
  return device === "hub" ? ports.filter((p) => p !== from) : [to];
}

const PANEL_Y = [6, 120] as const;
const OUT_Y = [24, 52, 80] as const;
const RECEIVERS = PORTS.filter((p) => p !== SENDER);

function Panel({ device, y }: { device: Device; y: number }) {
  const got = deliver(device, SENDER, TARGET);
  const isHub = device === "hub";
  return (
    <g>
      <text x={8} y={y + 10} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
        {isHub ? "Hub: no filtering" : "Switch: filters by MAC address"}
      </text>
      {/* sender */}
      <rect x={14} y={y + 42} width={44} height={24} rx={3} className="fill-background stroke-foreground" />
      <text x={36} y={y + 58} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {SENDER}
      </text>
      <text x={36} y={y + 80} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
        sends to {TARGET}
      </text>
      <line x1={58} y1={y + 54} x2={112} y2={y + 54} strokeWidth={1.6} className="stroke-foreground" />
      <polygon points={`118,${y + 54} 111,${y + 50} 111,${y + 58}`} className="fill-foreground" />
      {/* device */}
      <rect
        x={120}
        y={y + 38}
        width={62}
        height={32}
        rx={4}
        strokeWidth={1.5}
        className={isHub ? "fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400" : "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400"}
      />
      <text x={151} y={y + 58} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {isHub ? "hub" : "switch"}
      </text>
      {/* receivers */}
      {RECEIVERS.map((p, k) => {
        const on = got.includes(p);
        const py = y + OUT_Y[k];
        return (
          <g key={p}>
            <line
              x1={182}
              y1={y + 54}
              x2={244}
              y2={py + 10}
              strokeWidth={on ? 1.6 : 1}
              strokeDasharray={on ? undefined : "2 3"}
              className={on ? (isHub ? "stroke-amber-600 dark:stroke-amber-400" : "stroke-emerald-600 dark:stroke-emerald-400") : "stroke-border"}
            />
            <rect
              x={250}
              y={py}
              width={44}
              height={20}
              rx={3}
              className={on ? "fill-background stroke-foreground" : "fill-background stroke-border"}
            />
            <text x={272} y={py + 14} textAnchor="middle" className={`text-[11px] font-semibold ${on ? "fill-foreground" : "fill-muted-foreground"}`}>
              {p}
            </text>
            <text x={300} y={py + 14} className={`text-[9.5px] ${on ? "fill-foreground" : "fill-muted-foreground"}`}>
              {on ? "gets it" : "not sent"}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function SscT2HubSwitch() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the same message through a hub and a switch
      </p>
      <svg
        viewBox="0 0 340 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Computer A sends data meant for computer D. Through a hub, with no filtering, the data goes out to every other port: B, C and D all get it. Through a switch, which filters by MAC address, the data goes only to D; B and C get nothing."
      >
        <Panel device="hub" y={PANEL_Y[0]} />
        <line x1={0} y1={112} x2={340} y2={112} className="stroke-border" />
        <Panel device="switch" y={PANEL_Y[1]} />
        <text x={170} y={230} textAnchor="middle" className="fill-foreground text-[11px]">
          A switch connects computers within one network (a LAN).
        </text>
      </svg>
    </div>
  );
}
