/**
 * Static figure: allylic, vinylic or benzylic, read off where the OH carbon
 * sits (concept cetalc-allylic-benzylic-vinylic).
 *
 * Each molecule is a chain of carbon groups. The OH carbon is boxed. Its class
 * comes from the distance, in bonds, to the nearest C=C carbon or ring:
 * 0 (OH on the C=C carbon itself) = vinylic, 1 = allylic (or benzylic for a
 * ring), 2 = neither (the concept's but-3-en-1-ol and 2-phenylethanol traps).
 * The degree is the number of carbon groups bonded to the OH carbon. All five
 * molecules and their labels are the concept's own; `classify` is pinned by
 * tests/notes-w2-14.test.ts. Server component.
 */

export type Group = { text: string; ring?: boolean; oh?: boolean };
export type Bond = "single" | "double";
export type Molecule = { name: string; groups: readonly Group[]; bonds: readonly Bond[] };

export const MOLECULES: readonly Molecule[] = [
  {
    name: "but-3-en-2-ol",
    groups: [{ text: "CH₂" }, { text: "CH" }, { text: "CH(OH)", oh: true }, { text: "CH₃" }],
    bonds: ["double", "single", "single"],
  },
  {
    name: "but-2-en-2-ol",
    groups: [{ text: "CH₃" }, { text: "C(OH)", oh: true }, { text: "CH" }, { text: "CH₃" }],
    bonds: ["single", "double", "single"],
  },
  {
    name: "benzyl alcohol",
    groups: [{ text: "C₆H₅", ring: true }, { text: "CH₂OH", oh: true }],
    bonds: ["single"],
  },
  {
    name: "but-3-en-1-ol",
    groups: [{ text: "CH₂" }, { text: "CH" }, { text: "CH₂" }, { text: "CH₂OH", oh: true }],
    bonds: ["double", "single", "single"],
  },
  {
    name: "2-phenylethanol",
    groups: [{ text: "C₆H₅", ring: true }, { text: "CH₂" }, { text: "CH₂OH", oh: true }],
    bonds: ["single", "single"],
  },
];

export type Kind = "vinylic" | "allylic" | "benzylic" | "not allylic" | "not benzylic";
export type Verdict = { kind: Kind; degree: number; label: string; note: string };

const DEGREE = ["", "1°", "2°", "3°"];
const AWAY = ["", "next door", "two carbons away", "three carbons away"];

/** Classify the OH carbon by its distance to the nearest C=C carbon or ring, and its degree. */
export function classify(m: Molecule): Verdict {
  const idx = m.groups.findIndex((g) => g.oh);
  const doubleCarbons = new Set<number>();
  m.bonds.forEach((b, i) => {
    if (b === "double") {
      doubleCarbons.add(i);
      doubleCarbons.add(i + 1);
    }
  });
  const rings = m.groups.map((g, i) => (g.ring ? i : -1)).filter((i) => i >= 0);
  const dist = (set: number[]) => (set.length ? Math.min(...set.map((j) => Math.abs(j - idx))) : Infinity);
  const dDouble = dist([...doubleCarbons]);
  const dRing = dist(rings);
  const degree = [idx - 1, idx + 1].filter((j) => j >= 0 && j < m.groups.length).length;

  if (dDouble === 0) return { kind: "vinylic", degree, label: "vinylic", note: "OH on a C=C carbon" };
  if (dDouble === 1) return { kind: "allylic", degree, label: `${DEGREE[degree]} allylic`, note: "C=C next door" };
  if (dRing === 1) return { kind: "benzylic", degree, label: `${DEGREE[degree]} benzylic`, note: "ring next door" };
  if (doubleCarbons.size > 0) return { kind: "not allylic", degree, label: "not allylic", note: `C=C ${AWAY[dDouble]}` };
  return { kind: "not benzylic", degree, label: "not benzylic", note: `ring ${AWAY[dRing]}` };
}

// Layout: approximate glyph widths at 12 px.
const CHAR_W = 7.6;
const BOND_W = 10;
const X0 = 10;
export const tokenWidth = (text: string) => [...text].length * CHAR_W;

/** Centre x of every group, and of every bond glyph between groups. */
export function layoutRow(m: Molecule): { groups: number[]; bonds: number[] } {
  const groups: number[] = [];
  const bonds: number[] = [];
  let x = X0;
  m.groups.forEach((g, i) => {
    const w = tokenWidth(g.text);
    groups.push(Math.round((x + w / 2) * 100) / 100);
    x += w;
    if (i < m.bonds.length) {
      bonds.push(Math.round((x + BOND_W / 2) * 100) / 100);
      x += BOND_W;
    }
  });
  return { groups, bonds };
}

const ROW_Y0 = 40;
const ROW_H = 34;
const LABEL_X = 196;

export default function CetAllylicBenzylicVinylic() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · allylic, vinylic or benzylic: where the OH carbon sits
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="Five alcohols. But-3-en-2-ol: the OH carbon is bonded to a double-bond carbon, secondary allylic. But-2-en-2-ol: OH on a double-bond carbon, vinylic. Benzyl alcohol: the OH carbon is bonded to the ring, primary benzylic. But-3-en-1-ol: the double bond is two carbons away, not allylic. 2-Phenylethanol: the ring is two carbons away, not benzylic."
      >
        <text x={X0} y={16} className="fill-muted-foreground text-[10px] font-semibold">
          molecule (OH carbon boxed)
        </text>
        <text x={LABEL_X} y={16} className="fill-muted-foreground text-[10px] font-semibold">
          class
        </text>
        <line x1={X0} y1={22} x2={310} y2={22} strokeWidth={1} className="stroke-border" />

        {MOLECULES.map((m, r) => {
          const y = ROW_Y0 + r * ROW_H;
          const lay = layoutRow(m);
          const v = classify(m);
          const good = v.kind === "allylic" || v.kind === "vinylic" || v.kind === "benzylic";
          return (
            <g key={m.name}>
              {m.groups.map((g, i) => {
                const w = tokenWidth(g.text);
                return (
                  <g key={i}>
                    {g.oh && (
                      <rect
                        x={Math.round((lay.groups[i] - w / 2 - 3) * 100) / 100}
                        y={y - 12}
                        width={Math.round((w + 6) * 100) / 100}
                        height={17}
                        rx={4}
                        strokeWidth={1.2}
                        className="fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400"
                      />
                    )}
                    <text
                      x={lay.groups[i]}
                      y={y}
                      textAnchor="middle"
                      className={
                        g.ring
                          ? "fill-amber-700 text-[12px] font-semibold dark:fill-amber-300"
                          : "fill-foreground text-[12px]"
                      }
                    >
                      {g.text}
                    </text>
                  </g>
                );
              })}
              {m.bonds.map((b, i) => {
                const x1 = Math.round((lay.bonds[i] - BOND_W / 2 + 1.5) * 100) / 100;
                const x2 = Math.round((lay.bonds[i] + BOND_W / 2 - 1.5) * 100) / 100;
                return b === "double" ? (
                  <g key={i} strokeWidth={1.6} className="stroke-sky-600 dark:stroke-sky-300">
                    <line x1={x1} y1={y - 6} x2={x2} y2={y - 6} />
                    <line x1={x1} y1={y - 2} x2={x2} y2={y - 2} />
                  </g>
                ) : (
                  <line key={i} x1={x1} y1={y - 4} x2={x2} y2={y - 4} strokeWidth={1.2} className="stroke-foreground" />
                );
              })}
              <text x={X0} y={y + 13} className="fill-muted-foreground text-[10px]">
                {m.name}
              </text>
              <text
                x={LABEL_X}
                y={y}
                className={
                  good
                    ? "fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300"
                    : "fill-rose-700 text-[11px] font-semibold dark:fill-rose-300"
                }
              >
                {v.label}
              </text>
              <text x={LABEL_X} y={y + 13} className="fill-muted-foreground text-[10px]">
                {v.note}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Count bonds from the boxed OH carbon. OH on a C=C carbon: vinylic. One bond to a C=C carbon: allylic; one bond to a
        benzene ring: benzylic. Two carbons away is neither. The 1°, 2° or 3° in front counts the carbons on the OH carbon.
      </p>
    </div>
  );
}
