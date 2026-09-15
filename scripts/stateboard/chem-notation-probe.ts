/**
 * Which chemical-notation LaTeX actually survives BOTH renderers?
 *
 * The web path is KaTeX; the Word path is temml -> mathml2omml, and they fail on
 * DIFFERENT things. mhchem (`\ce{...}`) is NOT loaded in this project, so it is
 * out regardless -- but that only settles what we cannot use, not what we can.
 * Everything an agent is told to write must be measured against the real
 * converter first, which is the lesson from the `(A \cup B)'` OMML finding:
 * five plausible-looking candidates all failed and only `\overline{...}` passed.
 *
 * Run: npx tsx scripts/stateboard/_kt_chem_notation_probe.ts
 */
import katex from "katex";

import { findOmmlFailures } from "../../src/lib/export/ommlAudit";

const CANDIDATES: [string, string][] = [
  ["plain formula", "\\mathrm{H_2SO_4}"],
  ["formula, no mathrm", "H_2SO_4"],
  ["polyatomic ion", "\\mathrm{SO_4^{2-}}"],
  ["cation", "\\mathrm{Na^+}"],
  ["circled charge (book glyph)", "\\mathrm{NH_3^{\\oplus}}"],
  ["state symbol", "\\mathrm{NaCl(aq)}"],
  ["scientific notation", "6.022 \\times 10^{23}"],
  ["negative exponent", "1.6 \\times 10^{-19}"],
  ["degree celsius", "25\\,^\\circ\\mathrm{C}"],
  ["simple arrow", "\\mathrm{A} \\longrightarrow \\mathrm{B}"],
  ["equilibrium arrow", "\\mathrm{A} \\rightleftharpoons \\mathrm{B}"],
  ["labelled arrow", "\\xrightarrow{\\text{conc. } \\mathrm{H_2SO_4}}"],
  ["labelled arrow, two-line", "\\xrightarrow[\\Delta]{\\text{conc. } \\mathrm{H_2SO_4}}"],
  ["overset arrow", "\\overset{\\text{heat}}{\\longrightarrow}"],
  ["delta H", "\\Delta_r H^\\circ = -1200\\ \\mathrm{kJ}"],
  ["units with per", "8.314\\ \\mathrm{J\\,K^{-1}mol^{-1}}"],
  ["fraction unit", "\\dfrac{\\mathrm{mol}}{\\mathrm{dm^3}}"],
  ["concentration bracket", "[\\mathrm{H^+}] = 10^{-7}"],
  ["equilibrium constant", "K_c = \\dfrac{[\\mathrm{C}]^2}{[\\mathrm{A}][\\mathrm{B}]}"],
  ["isotope notation", "^{14}_{6}\\mathrm{C}"],
  ["isotope via sideset", "\\sideset{^{14}_{6}}{}{\\mathrm{C}}"],
  ["reversible w/ text above", "\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3}"],
  ["bond dash", "\\mathrm{CH_3\\!-\\!CH_2\\!-\\!OH}"],
  ["mhchem (EXPECTED TO FAIL)", "\\ce{H2SO4}"],
];

function katexOk(tex: string): string {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: false });
    return "ok";
  } catch (e) {
    return "FAIL: " + String((e as Error).message).slice(0, 58);
  }
}

const rows = CANDIDATES.map(([label, tex]) => {
  const web = katexOk(tex);
  // findOmmlFailures takes the SAME shape stored in the DB: a math zone.
  const omml = findOmmlFailures(`\\(${tex}\\)`);
  return { label, tex, web, omml: omml.length === 0 ? "ok" : `FAIL(${omml.length})` };
});

const w = Math.max(...rows.map((r) => r.label.length));
let webFails = 0;
let ommlFails = 0;
for (const r of rows) {
  if (r.web !== "ok") webFails++;
  if (r.omml !== "ok") ommlFails++;
  const flag = r.web === "ok" && r.omml === "ok" ? "  " : "!!";
  console.log(`${flag} ${r.label.padEnd(w)}  web=${r.web.padEnd(12)}  word=${r.omml}`);
}
console.log(`\n${rows.length} candidates: ${webFails} fail on web, ${ommlFails} fail in Word.`);
