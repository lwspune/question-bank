import { ACCENT, INK, KIND_LABEL, MUTED, PAPER } from "@/lib/ebooks/theme";
import type { EbookKind } from "@/lib/ebooks/catalog";

/**
 * A book's cover as the store shows it: the same paper, ink, accent and
 * layout the PDF cover prints (lib/ebooks/theme), drawn in CSS so it stays
 * crisp at any size and needs no image. It keeps the book's own colours in
 * dark mode too, as a printed book on a dark table would.
 */
export default function BookCover({
  kind,
  subject,
  over,
  size = "md",
  stats = [],
}: {
  kind: EbookKind;
  subject: string;
  /** The line over the subject on a Solved Papers cover: "Maharashtra HSC Class 12". */
  over?: string;
  size?: "sm" | "md" | "lg";
  /** The cover's numbers (`ebooks.stats`); the first three fill the tiles, as on the PDF cover. */
  stats?: { value: string; label: string }[];
}) {
  const accent = ACCENT[kind];
  const pad = size === "sm" ? "p-3" : size === "md" ? "p-4" : "p-6";
  const title = size === "sm" ? "text-sm" : size === "md" ? "text-base sm:text-xl" : "text-2xl";
  const tiles = size === "sm" ? [] : stats.slice(0, 3);
  if (kind === "papers") return <PremiumCover subject={subject} over={over} pad={pad} title={title} tiles={tiles} />;
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[1/1.414] w-full flex-col overflow-hidden rounded-lg font-serif shadow-[0_10px_30px_rgba(15,29,74,0.18)] ring-1 ring-black/5 ${pad}`}
      style={{ background: PAPER, color: INK }}
    >
      <div className="flex items-center gap-1.5 text-[0.55rem] font-bold tracking-[0.2em]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        PYQ VAULT
      </div>
      <div className="mt-[22%]">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.14em]"
          style={{ color: accent, background: `color-mix(in srgb, ${accent} 12%, white)` }}
        >
          {KIND_LABEL[kind]}
        </span>
        <div className={`mt-2 font-bold leading-tight ${title}`}>{subject}</div>
        <div className="mt-2 h-0.5 w-8 rounded" style={{ background: accent }} />
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1 sm:grid-cols-3">
        {tiles.length > 0
          ? tiles.map((t, i) => (
              // Two tiles on a phone, where three would cut their labels short.
              <div key={t.label} className={`min-w-0 rounded bg-white px-1.5 py-1 shadow-sm ${i === 2 ? "hidden sm:block" : ""}`}>
                <div className="truncate text-[0.7rem] font-bold leading-tight sm:text-sm" style={{ color: accent }}>
                  {t.value}
                </div>
                <div className="truncate text-[0.5rem] leading-tight sm:text-[0.6rem]" style={{ color: MUTED }}>{t.label}</div>
              </div>
            ))
          : [0, 1, 2].map((i) => <div key={i} className="h-3 rounded bg-white shadow-sm" />)}
      </div>
    </div>
  );
}

const GOLD = "#f0c46e";

/**
 * The Solved Papers cover as the PDF prints it (lib/ebooks/bookHtml PREMIUM_CSS):
 * navy with a soft blue glow, a gold frame, the board line over the subject, a
 * stack of paper sheets with a gold seal, gold numbers.
 */
function PremiumCover({
  subject,
  over,
  pad,
  title,
  tiles,
}: {
  subject: string;
  over?: string;
  pad: string;
  title: string;
  tiles: { value: string; label: string }[];
}) {
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[1/1.414] w-full flex-col overflow-hidden rounded-lg font-serif text-white shadow-[0_10px_30px_rgba(15,29,74,0.35)] ring-1 ring-black/10 ${pad}`}
      style={{ background: "radial-gradient(120% 75% at 100% 0%, #2a4aa0 0%, #16296a 36%, #0f1d4a 62%, #0a1433 100%)" }}
    >
      <div className="pointer-events-none absolute inset-[4%] rounded border" style={{ borderColor: "rgba(240,196,110,0.5)" }} />
      <div className="relative flex items-center gap-1.5 text-[0.55rem] font-bold tracking-[0.2em]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
        PYQ VAULT
      </div>
      <div className="relative mt-[16%]">
        <span
          className="inline-block rounded-full border px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.14em]"
          style={{ color: GOLD, borderColor: GOLD }}
        >
          {KIND_LABEL.papers}
        </span>
        {over ? (
          <div className="mt-2 text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] sm:text-[0.6rem]" style={{ color: "#b9c6ec" }}>
            {over}
          </div>
        ) : null}
        <div className={`mt-0.5 font-bold leading-tight ${title}`}>{subject}</div>
        <div className="mt-2 h-0.5 w-8 rounded" style={{ background: `linear-gradient(90deg, #f7d58b, #d99a2b)` }} />
      </div>
      <div className="relative mt-auto h-[24%]">
        <div className="absolute left-[30%] top-[12%] h-[80%] w-[52%] rotate-[8deg] rounded-sm bg-[#dfe6f7] shadow-md" />
        <div className="absolute left-[22%] top-[4%] h-[80%] w-[52%] -rotate-[3deg] rounded-sm bg-white shadow-lg">
          <div className="mx-[10%] mt-[12%] h-[6%] rounded bg-[#0f1d4a]/70" />
          <div className="mx-[10%] mt-[8%] h-[5%] rounded bg-[#e6ebf5]" />
          <div className="mx-[10%] mt-[6%] h-[5%] w-[60%] rounded bg-[#e6ebf5]" />
        </div>
        <div
          className="absolute right-[6%] top-[-8%] aspect-square w-[22%] rotate-12 rounded-full shadow-md"
          style={{ background: "radial-gradient(circle at 34% 28%, #fde9b4 0%, #eab452 48%, #b97f1f 100%)" }}
        />
      </div>
      {tiles.length > 0 ? (
        <div className="relative mt-2 grid grid-cols-2 border-t pt-1.5 sm:grid-cols-3" style={{ borderColor: "rgba(240,196,110,0.5)" }}>
          {tiles.map((t, i) => (
            <div key={t.label} className={`min-w-0 ${i === 2 ? "hidden sm:block" : ""}`}>
              <div className="truncate text-[0.7rem] font-bold leading-tight sm:text-sm" style={{ color: GOLD }}>
                {t.value}
              </div>
              <div className="truncate text-[0.5rem] leading-tight sm:text-[0.6rem]" style={{ color: "#b9c6ec" }}>
                {t.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** "MHT-CET Mathematics Formula Book" -> "MHT-CET Mathematics". */
export function subjectOf(title: string): string {
  return title.replace(/\s+(Formula|Notes|PYQ) Book$/i, "");
}
