/**
 * Still: pKb of the methyl amines, ammonia and aniline (concept
 * ncham-basicity), the concept's own values: (CH₃)₂NH 3.27, CH₃NH₂ 3.38,
 * (CH₃)₃N 4.22, NH₃ 4.75, aniline 9.38. Shorter bar, stronger base. Uses the
 * shared bar chart from JeeAmineBasicity. Pinned by tests/notes-w2-03.test.ts.
 */
import { PkBars, type PkRow } from "./JeeAmineBasicity";

export const METHYL_ROWS: readonly PkRow[] = [
  { label: "(CH₃)₂NH", value: 3.27, tag: "2°", tone: "main" },
  { label: "CH₃NH₂", value: 3.38, tag: "1°", tone: "main" },
  { label: "(CH₃)₃N", value: 4.22, tag: "3°", tone: "main" },
  { label: "NH₃", value: 4.75, tone: "ref" },
  { label: "aniline", value: 9.38, tone: "weak" },
];

export default function NeetAmineBasicity() {
  return (
    <PkBars
      title="Diagram · basic strength of the methyl amines in water"
      label="Bar chart of pKb, smaller meaning a stronger base: dimethylamine 3.27, methylamine 3.38, trimethylamine 4.22, ammonia 4.75, aniline 9.38. In water the order is dimethylamine, methylamine, trimethylamine, ammonia; in the gas phase it is 3 degree, 2 degree, 1 degree, ammonia. Aniline is far weaker because its lone pair is in conjugation with the ring."
      quantity="pKb: shorter bar, stronger base"
      max={10}
      ticks={[0, 2, 4, 6, 8, 10]}
      rows={METHYL_ROWS}
      footer={[
        "water: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃",
        "gas phase, alkyl push only: 3° > 2° > 1° > NH₃",
        "aniline: lone pair in conjugation with the ring",
      ]}
      height={210}
    />
  );
}
