import { ACCENT, KIND_LABEL, PAPER } from "@/lib/ebooks/theme";
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
  size = "md",
}: {
  kind: EbookKind;
  subject: string;
  size?: "sm" | "md" | "lg";
}) {
  const accent = ACCENT[kind];
  const pad = size === "sm" ? "p-3" : size === "md" ? "p-4" : "p-6";
  const title = size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-2xl";
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[1/1.414] w-full flex-col overflow-hidden rounded-lg font-serif shadow-[0_10px_30px_rgba(35,48,74,0.18)] ring-1 ring-black/5 ${pad}`}
      style={{ background: PAPER, color: "#23304a" }}
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
      <div className="mt-auto grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 rounded bg-white shadow-sm" />
        ))}
      </div>
    </div>
  );
}

/** "MHT-CET Mathematics Formula Book" -> "MHT-CET Mathematics". */
export function subjectOf(title: string): string {
  return title.replace(/\s+(Formula|Notes|PYQ) Book$/i, "");
}
