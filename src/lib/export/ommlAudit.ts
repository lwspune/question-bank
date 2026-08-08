import { parseLatex } from "@/components/math/parseLatex";
import { convertLatexToOmml, UNDERLINE_BYPASS_RE } from "./ommlBuilder";

export interface OmmlFailure {
  latex: string;
  display: boolean;
  /**
   * Why the zone falls back to Unicode.
   *  - "unconvertible": temml/mml2omml can't handle the construct. Expected for
   *    the known mml2omml gaps; the fallback is the remedy.
   *  - "malformed": conversion produced structurally invalid OMML. This is a
   *    BUG in the converter or in our rewrites, not an unsupported construct —
   *    before the well-formedness guard existed it made Word refuse to open the
   *    whole document. Treat any occurrence as a defect to fix, not to accept.
   */
  reason: "unconvertible" | "malformed";
  /** Structural detail for a "malformed" hit (e.g. `</m:limUpp> closes <m:acc>`). */
  detail?: string;
}

/**
 * Every math zone in `text` that the docx exporter CANNOT convert to OMML.
 *
 * `latexToOmml` returns null when temml → mml2omml throws or yields no
 * <m:oMath> — the exporter then falls back to emitting the raw \(...\) LaTeX
 * as plain text (see textWithMathToOmmlSegments). This mirrors that exact
 * decision (parseLatex → underline bypass → latexToOmml), so a hit here is
 * precisely a raw-LaTeX fallback there.
 *
 * Construct-agnostic on purpose: it catches the nested-prime complement crash
 * (mml2omml chokes on `(B' \cap A)'`) AND any FUTURE mml2omml failure, so the
 * `audit:omml` probe surfaces new export breakage at ingest time rather than
 * when a teacher opens a broken Word paper. Pure; used by scripts/audit-omml.ts.
 */
export function findOmmlFailures(text: string): OmmlFailure[] {
  const out: OmmlFailure[] = [];
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    // Underline-bypass zones are rendered as native Word runs, not OMML —
    // latexToOmml is never called on them, so they are not failures.
    if (seg.type === "inline" && UNDERLINE_BYPASS_RE.test(seg.content)) continue;
    const display = seg.type === "block";
    const result = convertLatexToOmml(seg.content, display);
    if (!result.ok) {
      out.push({
        latex: seg.content,
        display,
        reason: result.reason,
        ...(result.reason === "malformed" ? { detail: result.detail } : {}),
      });
    }
  }
  return out;
}
