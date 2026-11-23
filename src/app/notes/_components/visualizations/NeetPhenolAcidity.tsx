/**
 * Still: pKa of the nitrophenols, phenol, p-cresol and ethanol (concept
 * nchal-acidity), the concept's own values: p-nitrophenol 7.1, o-nitrophenol
 * 7.2, m-nitrophenol 8.3, phenol 10.0, p-cresol 10.2, ethanol 15.9. Shorter
 * bar, stronger acid. Uses the shared bar chart from JeeAmineBasicity.
 * Pinned by tests/notes-w2-03.test.ts.
 */
import { PkBars, type PkRow } from "./JeeAmineBasicity";

export const PHENOL_ROWS: readonly PkRow[] = [
  { label: "p-nitrophenol", value: 7.1, tone: "main" },
  { label: "o-nitrophenol", value: 7.2, tone: "main" },
  { label: "m-nitrophenol", value: 8.3, tone: "main" },
  { label: "phenol", value: 10.0, tone: "ref" },
  { label: "p-cresol", value: 10.2, tone: "weak" },
  { label: "ethanol", value: 15.9, tone: "weak" },
];

export default function NeetPhenolAcidity() {
  return (
    <PkBars
      title="Diagram · ring groups and the acidity of phenol"
      label="Bar chart of pKa, smaller meaning a stronger acid: p-nitrophenol 7.1, o-nitrophenol 7.2, m-nitrophenol 8.3, phenol 10.0, p-cresol 10.2, ethanol 15.9. A nitro group makes phenol stronger, most at the ortho and para positions; a methyl group makes it weaker; ethanol is far weaker than phenol."
      quantity="pKa: shorter bar, stronger acid"
      max={16}
      ticks={[0, 4, 8, 12, 16]}
      rows={PHENOL_ROWS}
      digits={1}
      footer={[
        "–NO₂ pulls electrons: stronger, most at ortho and para",
        "–CH₃ pushes electrons: p-cresol is weaker than phenol",
        "ethanol: the charge stays on the oxygen",
      ]}
      height={232}
    />
  );
}
