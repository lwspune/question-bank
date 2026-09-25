import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/transition-and-inner-transition-elements";

export const POSITION_AND_CONFIGURATION_NOTE: SubtopicNote = {
  subtopicName: "Position, Electronic Configuration and General Features of d-Block",
  title: "The d-Block: Position, d-Electron Counts and General Properties",
  oneLineDefinition:
    "Transition elements are the d-block elements that have a partly filled d subshell in the atom or in a common ion; they sit in groups 3 to 12 as four series of ten, their ions lose the outer s electrons before any d electrons, and the half-filled and filled d subshells explain the odd configurations of chromium and copper and the high ionisation enthalpy of zinc.",
  whyItMatters:
    "18 PYQs, 1 HARD. Seven place the elements — the series of Co and Mo, the groups and period of Sc to Zn, ten elements a series, the last element of the 5d series, and which element (Hg) is not a transition element; six count d electrons in an atom or ion — Ti²⁺, Ti³⁺, Co²⁺, Cr with six unpaired electrons, the half-filled Mn and Cr; five are general properties — the soft metal, the highest and lowest first ionisation enthalpy, and one HARD ionisation order. " +
    "Three cards.",
  concepts: [
    // 1 — position and series
    {
      kind: "reference" as const,
      slug: "cettr-position-and-series",
      name: "Four Transition Series in Groups 3 to 12",
      intuition:
        "The d-block sits between the s-block and the p-block, in groups 3 to 12, and its properties sit between theirs too. Each row that fills a d subshell is one series of ten elements, and there are four: 3d in period 4 (Sc to Zn), 4d in period 5 (Y to Cd), 5d in period 6 (La, then Hf to Hg), and 6d in period 7 (Ac, then Rf onward). The series number is one less than the period: cobalt is in period 4, so it is a 3d element; molybdenum is in period 5, a 4d element. A transition element needs a PARTLY filled d subshell in the atom or a common ion, so zinc, cadmium and mercury, which are d¹⁰ both as atoms and as M²⁺ ions, are d-block elements but not transition elements in the strict sense.",
      definition:
        "- **Position**: groups **3 to 12**; Sc–Zn are period **4**, groups 3–12.\n" +
        "- **Series** (10 elements each, **four** series): 3d (Sc–Zn), 4d (Y–Cd), 5d (La, Hf–Hg), 6d (Ac, Rf–Cn). Last element of the 5d series: **Hg**.\n" +
        "- The 5d series is La plus Hf to Hg; it does NOT run through every element from La to Hg — the fourteen lanthanoids Ce–Lu between them fill 4f.\n" +
        "- **Not transition** (d¹⁰ in the atom and in the common ion): Zn, Cd, **Hg**. Silver counts as transition because Ag²⁺ is d⁹.\n" +
        "- Last electron entering the \\((n-1)d\\) orbital marks a d-block element: Ag, not Dy or Pu (f-block).",
      table: {
        columns: ["Series", "Period", "Elements", "Example"],
        rows: [
          { cells: ["3d", "4", "Sc (21) – Zn (30)", "Co, Cr, Mn, Fe"] },
          { cells: ["4d", "5", "Y (39) – Cd (48)", "Mo, Ag"] },
          { cells: ["5d", "6", "La (57), Hf (72) – Hg (80)", "Pt, Au, Hg"], noteAmber: "The lanthanoids Ce–Lu sit inside this row but are f-block." },
          { cells: ["6d", "7", "Ac (89), Rf (104) onward", "—"] },
        ],
        caption: "Series number = period − 1; ten elements a series.",
      },
      selfCheckExample: {
        prompt: "Which transition series contain Co and Mo respectively?",
        steps: [
          "Co is in period 4 and Mo in period 5; the series is one lower.",
        ],
        answer: "3d and 4d",
      },
      practiceSet: [
        { prompt: "Position of Sc to Zn in the long form of the periodic table?", answer: "Groups 3 to 12, period 4" },
        { prompt: "Number of elements in each transition series?", answer: "10" },
        { prompt: "Last element of the 5d series?", answer: "Hg" },
        { prompt: "Not a transition element on the basis of configuration: Ti, V, Hg, Ag?", answer: "Hg" },
      ],
      pyqExampleId: "0281078c-7146-4deb-9163-92352d0388aa",
      traps: [
        {
          title: "Using the period number as the series number",
          body:
            "Cobalt is in period 4 but is a 3d element; the d subshell being filled is one shell below the valence shell, (n − 1)d.",
        },
      ],
    },

    // 2 — d-electron counts
    {
      kind: "formula" as const,
      slug: "cettr-d-electron-count",
      name: "Counting d Electrons in Atoms and Ions",
      intuition:
        "Write the atom as [Ar] 3dˣ 4s², with two exceptions that prefer a half-filled or filled d subshell: chromium is 3d⁵ 4s¹ and copper is 3d¹⁰ 4s¹. To make an ion, take electrons from 4s FIRST and only then from 3d. So Ti (3d² 4s²) gives Ti²⁺ 3d² and Ti³⁺ 3d¹; Co (3d⁷ 4s²) gives Co²⁺ 3d⁷. For a 3d ion the shortcut is: d electrons = atomic number − 18 − charge. Unpaired electrons then follow Hund's rule: up to five d electrons are all unpaired, and beyond five they pair one by one, so dⁿ has n unpaired for n ≤ 5 and 10 − n for n ≥ 5.",
      definition:
        "- **Atoms**: [Ar] 3dˣ 4s² from Sc (3d¹) to Zn (3d¹⁰), except **Cr 3d⁵ 4s¹** and **Cu 3d¹⁰ 4s¹**.\n" +
        "- **Ions**: remove 4s first. \\(\\text{Ti}^{2+}\\) 3d², \\(\\text{Ti}^{3+}\\) 3d¹, \\(\\text{Co}^{2+}\\) 3d⁷ (Z = 27, +2 → **7**), \\(\\text{Mn}^{2+}\\) 3d⁵, \\(\\text{Fe}^{3+}\\) 3d⁵, \\(\\text{Cu}^{2+}\\) 3d⁹.\n" +
        "- **Unpaired electrons** in dⁿ: n for n ≤ 5, 10 − n for n > 5. Chromium ATOM has **6** unpaired (five 3d + one 4s).\n" +
        "- **Half-filled d**: Mn (3d⁵ 4s², expected and observed) and Cr (3d⁵ 4s¹, observed). Fe, Co and Ni are not half-filled.",
      formula: {
        label: "d electrons in a 3d ion",
        latex:
          "n_d = Z - 18 - q;\\qquad \\text{unpaired} = \\begin{cases} n_d & n_d \\le 5 \\\\ 10 - n_d & n_d > 5 \\end{cases}",
      },
      authoredExample: {
        prompt: "How many d electrons and unpaired electrons does V³⁺ have (Z = 23)?",
        steps: [
          "n_d = 23 − 18 − 3 = 2.",
          "Two electrons in separate d orbitals: 2 unpaired.",
        ],
        answer: "3d², 2 unpaired",
      },
      selfCheckExample: {
        prompt: "How many electrons are in the 3d subshell of an ion with Z = 27 and oxidation state +2?",
        steps: [
          "27 − 18 − 2 = 7.",
        ],
        answer: "7",
      },
      practiceSet: [
        { prompt: "Unpaired electrons in Ti³⁺?", answer: "1" },
        { prompt: "Electrons in the 3d orbitals of Ti²⁺?", answer: "2" },
        { prompt: "Element with six unpaired electrons: Cu, Zn, Cr, Ti?", answer: "Cr (3d⁵ 4s¹)" },
        { prompt: "Pair with half-filled d orbitals in the observed configuration?", answer: "Mn and Cr" },
      ],
      pyqExampleId: "b2c32283-398e-4e06-bab8-07b6c93ad101",
      traps: [
        {
          title: "Removing the 3d electrons first",
          body:
            "4s fills before 3d but empties first too. Fe²⁺ is 3d⁶, not 3d⁴ 4s²; Ti²⁺ is 3d², not 3d⁰ 4s².",
        },
      ],
    },

    // 3 — general properties and ionisation enthalpy
    {
      kind: "formula" as const,
      slug: "cettr-physical-properties-and-ionisation",
      name: "Hard Metals, Soft Exceptions and First Ionisation Enthalpy",
      intuition:
        "Transition metals are hard, high-melting, malleable and ductile, conduct heat and electricity well and form alloys, because unpaired d electrons join the metallic bonding. Where the d subshell is full — zinc, cadmium, mercury — the d electrons do not take part, so these metals are soft and low-melting. First ionisation enthalpy rises only slowly across the 3d series because each extra proton is largely screened by the extra 3d electron; the ends stand out: scandium is the lowest and zinc, with its stable 3d¹⁰ 4s², is by far the highest.",
      definition:
        "- **General properties**: hard (except Zn, **Cd**, Hg), high melting, malleable, ductile, good conductors of heat and electricity, form alloys, coloured and paramagnetic compounds, variable oxidation states, catalysts.\n" +
        "- **First ionisation enthalpy (kJ mol⁻¹)**: Sc 633, Ti 658, V 650, Cr 653, Mn 717, Fe 762, Co 760, Ni 737, Cu 745, **Zn 906**.\n" +
        "- Keyed orders: highest of {Ti, Sc, Zn, Ni} → **Zn**; lowest of {Cu, Sc, Mn, Zn} → **Sc**; decreasing **Zn > Fe > Cr > Sc**.",
      formula: {
        label: "3d first ionisation enthalpy (ends)",
        latex:
          "\\text{Sc } (633) < \\ldots < \\text{Fe } (762) < \\text{Zn } (906)\\ \\text{kJ mol}^{-1}",
      },
      authoredExample: {
        prompt: "Arrange Mn, Sc, Zn and Ni in increasing first ionisation enthalpy.",
        steps: [
          "Sc 633 < Mn 717 < Ni 737 < Zn 906.",
        ],
        answer: "Sc < Mn < Ni < Zn",
      },
      selfCheckExample: {
        prompt: "Which is a soft metal: Cr, V, Co, Cd?",
        steps: [
          "Cd has a full 4d¹⁰ subshell, so its d electrons add little to metallic bonding.",
        ],
        answer: "Cd",
      },
      practiceSet: [
        { prompt: "Highest first ionisation enthalpy: Ti, Sc, Zn, Ni?", answer: "Zn" },
        { prompt: "Lowest first ionisation enthalpy: Cu, Sc, Mn, Zn?", answer: "Sc" },
        { prompt: "Property NOT shown by transition elements: hard, alloys, do not conduct heat, malleable?", answer: "Do not conduct heat" },
      ],
      pyqExampleId: "19eb92a8-7544-44bf-9414-853ea9a17848",
      traps: [
        {
          title: "Expecting a steady rise across the series",
          body:
            "Cr (653) is barely above Sc (633) and below Fe (762); Zn's filled shell makes it the outlier. Learn the two ends and Fe, not a smooth trend.",
        },
      ],
    },
  ],
  related: [
    { label: "Colour and Magnetism — what the unpaired count decides", href: `${BASE}/cettr-colour-and-magnetism` },
    { label: "Oxidation States — why Mn shows the most", href: `${BASE}/cettr-oxidation-states` },
  ],
};
