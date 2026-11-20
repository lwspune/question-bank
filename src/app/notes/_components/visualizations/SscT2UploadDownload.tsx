/**
 * Static figure: uploading and downloading (concept ssc2ciene-protocol).
 * Uploading moves data from your machine to the server; downloading moves it
 * from the server to your machine. On the way, TCP splits the data into
 * packets and checks that they arrive.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const TRANSFERS = [
  { name: "Uploading", from: "your machine", to: "server" },
  { name: "Downloading", from: "server", to: "your machine" },
] as const;

export const PACKETS = 4;

const ARROW_UP = "stroke-sky-600 dark:stroke-sky-400";
const ARROW_DOWN = "stroke-emerald-600 dark:stroke-emerald-400";

export default function SscT2UploadDownload() {
  const leftEdge = 92;
  const rightEdge = 228;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which way the data moves
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="Your machine on the left, a server on the right. The top arrow, uploading, carries data from your machine to the server, split into packets by TCP. The bottom arrow, downloading, carries data from the server back to your machine."
      >
        {/* Your machine: a laptop */}
        <rect x={18} y={60} width={64} height={44} rx={3} strokeWidth={1.5} className="fill-sky-50 stroke-foreground dark:fill-sky-950/40" />
        <path d="M 10 108 h 80 l -6 8 h -68 z" strokeWidth={1.5} className="fill-muted stroke-foreground" />
        <text x={50} y={136} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          your machine
        </text>

        {/* Server: a stack of units */}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={242} y={52 + k * 22} width={60} height={18} rx={2} strokeWidth={1.5} className="fill-amber-50 stroke-foreground dark:fill-amber-950/40" />
            <circle cx={252} cy={61 + k * 22} r={2.5} className="fill-emerald-600 dark:fill-emerald-400" />
          </g>
        ))}
        <text x={272} y={136} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          server
        </text>

        {/* Uploading: machine to server, in packets */}
        <text x={160} y={30} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          Uploading
        </text>
        <line x1={leftEdge} y1={66} x2={rightEdge} y2={66} strokeWidth={2} className={ARROW_UP} />
        <polygon points={`${rightEdge + 8},66 ${rightEdge},61 ${rightEdge},71`} className="fill-sky-600 dark:fill-sky-400" />
        {Array.from({ length: PACKETS }, (_, k) => (
          <rect key={k} x={112 + k * 26} y={40} width={16} height={12} rx={2} className="fill-sky-200 stroke-sky-600 dark:fill-sky-800 dark:stroke-sky-400" />
        ))}
        <text x={160} y={84} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          data split into packets (TCP)
        </text>

        {/* Downloading: server to machine */}
        <line x1={rightEdge + 8} y1={104} x2={leftEdge + 8} y2={104} strokeWidth={2} className={ARROW_DOWN} />
        <polygon points={`${leftEdge},104 ${leftEdge + 8},99 ${leftEdge + 8},109`} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={160} y={122} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          Downloading
        </text>

        {TRANSFERS.map((t, i) => (
          <text
            key={t.name}
            x={160}
            y={164 + i * 18}
            textAnchor="middle"
            className={`text-[11px] ${i === 0 ? "fill-sky-700 dark:fill-sky-300" : "fill-emerald-700 dark:fill-emerald-300"}`}
          >
            {t.name}: {t.from} → {t.to}
          </text>
        ))}
      </svg>
    </div>
  );
}
