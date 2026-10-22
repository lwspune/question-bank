import { Download } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { PaperSummary } from "@/lib/answerSheets/paperReport";

/**
 * The checked sheet summed up (migration 0175): where the marks went, what to
 * focus on, and the student's own pages with our marks on them. Every number
 * comes from buildPaperReport, the same summary the downloadable PDF is laid
 * out from, so the page and the PDF cannot disagree.
 */

const LINK = "text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const fmt = (n: number) => String(Number(n));
const marksWord = (n: number) => `mark${n === 1 ? "" : "s"}`;

function QuestionLinks({ labels, anchors }: { labels: string[]; anchors: Record<string, string> }) {
  return (
    <>
      {labels.map((label, i) => (
        <span key={label}>
          {i > 0 && ", "}
          {anchors[label] ? (
            <a href={anchors[label]} className={LINK}>
              {label}
            </a>
          ) : (
            label
          )}
        </span>
      ))}
    </>
  );
}

/** Under the score: the percentage, how the answers went, and what the slips cost. */
export function SummaryHeadline({ summary }: { summary: PaperSummary }) {
  const c = summary.counts;
  const p = summary.potential;
  return (
    <>
      <p className="mt-1 text-sm text-muted-foreground">
        {summary.pct}% · Of the questions you answered: full marks {c.full} · part marks {c.partial} · no marks {c.zero}
      </p>
      {p.avoidable > 0 && (
        <p className="mt-2 text-sm text-foreground">
          Fix the slips in {p.questions.join(", ")} and this is{" "}
          <strong>
            {fmt(p.marks)} / {fmt(summary.max)}
          </strong>{" "}
          ({p.pct}%): {fmt(p.avoidable)} {marksWord(p.avoidable)} you already knew how to get.
        </p>
      )}
    </>
  );
}

export function PaperSummaryCard({ summary, anchors }: { summary: PaperSummary; anchors: Record<string, string> }) {
  if (summary.lost.length === 0) return null;
  const widest = Math.max(...summary.lost.map((l) => l.marks));
  return (
    <>
      <section className="mt-4 rounded-lg border bg-card p-4" aria-labelledby="where-marks-went">
        <h2 id="where-marks-went" className="text-sm font-semibold text-foreground">
          Where your marks went
        </h2>
        <ul className="mt-3 space-y-3">
          {summary.lost.map((l) => (
            <li key={l.key}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">{l.label}</span>
                <span className="tabular-nums text-foreground">
                  −{fmt(l.marks)} {marksWord(l.marks)}
                </span>
              </div>
              {/* One hue, the marks written beside it: the bar adds nothing a screen reader needs. */}
              <div className="mt-1 h-2 rounded-full bg-muted" aria-hidden>
                <div className="h-2 rounded-full bg-brand" style={{ width: `${Math.max(4, Math.round((l.marks / widest) * 100))}%` }} />
              </div>
              {l.questions.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  <QuestionLinks labels={l.questions} anchors={anchors} />
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {summary.focus.length > 0 && (
        <section className="mt-4" aria-labelledby="focus-on">
          <h2 id="focus-on" className="text-sm font-semibold text-foreground">
            What to focus on
          </h2>
          <ol className="mt-2 space-y-2">
            {summary.focus.map((f) => (
              <li key={f.label} className="rounded-lg border border-l-4 border-l-brand bg-card p-3 text-sm">
                <p className="font-medium text-foreground">{f.heading}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <QuestionLinks labels={[f.label]} anchors={anchors} /> · {fmt(f.lost)} {marksWord(f.lost)} lost
                </p>
                {f.missing && <KatexRenderer text={f.missing} className="mt-1 block text-muted-foreground" />}
              </li>
            ))}
          </ol>
        </section>
      )}

      {summary.smallerFixes.length > 0 && (
        <section className="mt-4 rounded-lg border bg-card p-4" aria-labelledby="smaller-fixes">
          <h2 id="smaller-fixes" className="text-sm font-semibold text-foreground">
            Smaller fixes
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            {summary.smallerFixes.map((f) => (
              <li key={f.cause}>
                <span className="font-medium text-foreground">{f.heading}</span>
                <span className="text-muted-foreground">
                  {" "}
                  (−{fmt(f.marks)}): {f.advice} <QuestionLinks labels={f.questions} anchors={anchors} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** The student's own pages with our marks on them, exactly as the grader previewed them. */
export function MarkedPages({ pages, pdf, removed }: { pages: string[]; pdf: string | null; removed: boolean }) {
  return (
    <section id="marked-pages" className="mt-8 scroll-mt-20" aria-labelledby="marked-pages-title">
      <h2 id="marked-pages-title" className="section-title">
        Your marked pages
      </h2>
      {removed ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Your marked pages were removed 30 days after checking, as we promised when you sent them. The marks and
          comments above are kept.
        </p>
      ) : pages.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Your marked pages could not be loaded. Refresh the page to try again.</p>
      ) : (
        <>
          {pdf && (
            <a
              href={pdf}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download marked paper (PDF)
            </a>
          )}
          <ol className="mt-3 space-y-4">
            {pages.map((src, i) => (
              <li key={src}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open page ${i + 1} full size`}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- a signed, private link; next/image is not used on this site */}
                  <img
                    src={src}
                    alt={`Page ${i + 1} of your answer sheet, with our marks`}
                    loading="lazy"
                    className="w-full rounded-lg border bg-white"
                  />
                </a>
                <p className="mt-1 text-center text-xs text-muted-foreground">Page {i + 1}</p>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
