import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const MAGNETIC_DFB_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Moment and Colour",
  title: "Magnetic Moment and Colour",
  oneLineDefinition:
    "An ion's unpaired d electrons give its spin-only magnetic moment, √(n(n+2)) BM, and a partly filled d shell lets it absorb visible light, so d⁰ and d¹⁰ ions are colourless and diamagnetic.",
  whyItMatters:
    "Twenty-five PYQs, nineteen of them multiple choice, and three from 2026. Sixteen turn an ion into a count of unpaired electrons and a spin-only moment, or run that backwards from a value in BM to the ion; nine ask which ions are coloured, which share a colour, and why permanganate is purple with no d electrons at all. Moments also finish many questions on other pages, so this formula pays several times.",
  concepts: [
    // C1 — spin-only magnetic moment
    {
      kind: "formula" as const,
      slug: "jcdfb-spin-only",
      name: "The spin-only magnetic moment",
      intuition:
        "Each unpaired electron is a tiny magnet; paired electrons cancel. So the moment depends only on n, the number of unpaired electrons. For a free 3d ion, the first five d electrons go in singly and the next five pair them up, so n rises to 5 at d⁵ and falls back to 0 at d¹⁰.",
      definition:
        "- \\(\\mu = \\sqrt{n(n+2)}\\) BM, where n is the number of unpaired electrons.\n" +
        "- n = 0, 1, 2, 3, 4, 5 gives μ = 0, 1.73, 2.83, 3.87, 4.90, 5.92 BM. For f ions, n = 6 gives 6.93 and n = 7 gives 7.94.\n" +
        "- Free ion, dˣ: n = x for d¹ to d⁵, and n = 10 − x for d⁶ to d¹⁰.\n" +
        "- Remove 4s electrons first: \\(\\mathrm{Mn^{2+}}\\) is 3d⁵ (n = 5), \\(\\mathrm{Ni^{2+}}\\) is 3d⁸ (n = 2).\n" +
        "- Ions with the same d count have the same moment: \\(\\mathrm{V^{2+}}\\) and \\(\\mathrm{Cr^{3+}}\\) (d³), \\(\\mathrm{Mn^{2+}}\\) and \\(\\mathrm{Fe^{3+}}\\) (d⁵).\n" +
        "- Working backwards: solve \\(n(n+2) = \\mu^{2}\\) and take the positive whole number.\n" +
        "- 'Nearest integer' answers: 1.73 → 2, 2.83 → 3, 3.87 → 4, 4.90 → 5, 5.92 → 6.\n" +
        "- Count the free ion unless a strong-field complex is named; ligands that pair electrons are on the Coordination Compounds pages.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      },
      authoredExample: {
        prompt:
          "Find the spin-only magnetic moments of \\(\\mathrm{Co^{2+}}\\) (Z = 27) and \\(\\mathrm{Ti^{3+}}\\) (Z = 22) as free ions.",
        steps: [
          "\\(\\mathrm{Co^{2+}}\\): \\(27 - 18 - 2 = 7\\) d electrons. d⁷ has \\(10 - 7 = 3\\) unpaired.",
          "\\(\\mu = \\sqrt{3 \\times 5} = \\sqrt{15} = 3.87\\) BM.",
          "\\(\\mathrm{Ti^{3+}}\\): \\(22 - 18 - 3 = 1\\) d electron, so n = 1 and \\(\\mu = \\sqrt{1 \\times 3} = 1.73\\) BM.",
        ],
        answer: "\\(\\mathrm{Co^{2+}}\\) 3.87 BM; \\(\\mathrm{Ti^{3+}}\\) 1.73 BM.",
      },
      selfCheckExample: {
        prompt:
          "A +3 ion of the first transition series has a spin-only moment of 5.92 BM. Which ion is it?",
        steps: [
          "\\(n(n+2) = 5.92^{2} \\approx 35\\), so n = 5.",
          "Five unpaired electrons means d⁵.",
          "A 3+ ion with d⁵ has \\(Z = 5 + 18 + 3 = 26\\): iron.",
        ],
        answer: "\\(\\mathrm{Fe^{3+}}\\).",
      },
      practiceSet: [
        { prompt: "Spin-only moment of \\(\\mathrm{Ni^{2+}}\\) (Z = 28)?", answer: "2.83 BM" },
        { prompt: "How many unpaired electrons give 3.87 BM?", answer: "3" },
        { prompt: "Spin-only moment of \\(\\mathrm{Sc^{3+}}\\)?", answer: "0 BM" },
        { prompt: "Largest moment among \\(\\mathrm{V^{3+}}\\), \\(\\mathrm{Cr^{3+}}\\), \\(\\mathrm{Mn^{2+}}\\) and \\(\\mathrm{Cu^{2+}}\\)?", answer: "\\(\\mathrm{Mn^{2+}}\\), 5.92 BM" },
        { prompt: "Which configuration gives the higher moment, 3d⁴ or 3d⁸?", answer: "3d⁴ (4 unpaired against 2)" },
      ],
      pyqExampleId: "4fda2517-1db9-4982-a63b-2d66c6c62dd6", // 2025 — which ions give 4.9 BM: Cr2+, Fe2+, Mn3+
      traps: [
        {
          title: "Past d⁵ the electrons pair up",
          body: "\\(\\mathrm{Cu^{2+}}\\) is d⁹ with ONE unpaired electron, not nine, and \\(\\mathrm{Ni^{2+}}\\) is d⁸ with two. Use \\(10 - x\\) for d⁶ to d¹⁰.",
        },
        {
          title: "Take the 4s electrons off first",
          body: "\\(\\mathrm{Mn^{2+}}\\) is 3d⁵ with five unpaired electrons (5.92 BM). Writing it as 3d³4s² gives three and a wrong answer of 3.87 BM, which is usually one of the options.",
        },
      ],
    },

    // C2 — colour
    {
      kind: "reference" as const,
      slug: "jcdfb-colour",
      name: "Colours of the aqueous 3d ions",
      intuition:
        "Water molecules around an ion split its d orbitals into two sets. Visible light can lift an electron from the lower set to the upper one, and we see the colour that is left. That needs at least one d electron and a gap in the upper set, so d⁰ and d¹⁰ ions are colourless. A few d⁰ ions such as permanganate are coloured another way: light moves an electron from oxygen to the metal, a charge-transfer transition.",
      definition:
        "- **Colourless**: d⁰ (\\(\\mathrm{Sc^{3+}}\\), \\(\\mathrm{Ti^{4+}}\\)) and d¹⁰ (\\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Cu^{+}}\\), \\(\\mathrm{Cd^{2+}}\\)).\n" +
        "- **Coloured**: d¹ to d⁹ in water, by d–d transitions.\n" +
        "- **Charge transfer**: \\(\\mathrm{KMnO_4}\\) (purple), \\(\\mathrm{K_2Cr_2O_7}\\) (orange) and \\(\\mathrm{K_2CrO_4}\\) (yellow) are d⁰ but coloured. They are also diamagnetic.\n" +
        "- Colour needs the ligands: anhydrous \\(\\mathrm{CuSO_4}\\) is white, while \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\) is blue.\n" +
        "- 'Paramagnetic and coloured' both follow from unpaired d electrons, so a pair qualifies only if both ions are d¹ to d⁹.",
      table: {
        columns: ["Ion", "d configuration", "Unpaired electrons (free ion)", "Colour in water"],
        rows: [
          { cells: ["\\(\\mathrm{Sc^{3+}}\\)", "3d⁰", "0", "Colourless"] },
          { cells: ["\\(\\mathrm{Ti^{4+}}\\)", "3d⁰", "0", "Colourless"] },
          { cells: ["\\(\\mathrm{Ti^{3+}}\\)", "3d¹", "1", "Purple"] },
          { cells: ["\\(\\mathrm{V^{4+}}\\)", "3d¹", "1", "Blue"] },
          { cells: ["\\(\\mathrm{V^{3+}}\\)", "3d²", "2", "Green"] },
          { cells: ["\\(\\mathrm{V^{2+}}\\)", "3d³", "3", "Violet"] },
          { cells: ["\\(\\mathrm{Cr^{3+}}\\)", "3d³", "3", "Violet"] },
          { cells: ["\\(\\mathrm{Mn^{3+}}\\)", "3d⁴", "4", "Violet"], noteAmber: "V²⁺, Cr³⁺ and Mn³⁺ are all violet." },
          { cells: ["\\(\\mathrm{Cr^{2+}}\\)", "3d⁴", "4", "Blue"] },
          { cells: ["\\(\\mathrm{Mn^{2+}}\\)", "3d⁵", "5", "Pink"] },
          { cells: ["\\(\\mathrm{Fe^{3+}}\\)", "3d⁵", "5", "Yellow"] },
          { cells: ["\\(\\mathrm{Fe^{2+}}\\)", "3d⁶", "4", "Green"] },
          { cells: ["\\(\\mathrm{Co^{3+}}\\)", "3d⁶", "4", "Blue"] },
          { cells: ["\\(\\mathrm{Co^{2+}}\\)", "3d⁷", "3", "Pink"] },
          { cells: ["\\(\\mathrm{Ni^{2+}}\\)", "3d⁸", "2", "Green"] },
          { cells: ["\\(\\mathrm{Cu^{2+}}\\)", "3d⁹", "1", "Blue"] },
          { cells: ["\\(\\mathrm{Zn^{2+}}\\)", "3d¹⁰", "0", "Colourless"] },
        ],
        caption: "Same colour does not mean same d count: Fe²⁺ (d⁶), Ni²⁺ (d⁸) and V³⁺ (d²) are all green.",
      },
      selfCheckExample: {
        prompt:
          "Which pair has the same colour in water: \\(\\mathrm{Fe^{2+}}\\) and \\(\\mathrm{Ni^{2+}}\\), or \\(\\mathrm{Co^{2+}}\\) and \\(\\mathrm{Cu^{2+}}\\)?",
        steps: [
          "\\(\\mathrm{Fe^{2+}}\\) is green and \\(\\mathrm{Ni^{2+}}\\) is green.",
          "\\(\\mathrm{Co^{2+}}\\) is pink but \\(\\mathrm{Cu^{2+}}\\) is blue.",
        ],
        answer: "\\(\\mathrm{Fe^{2+}}\\) and \\(\\mathrm{Ni^{2+}}\\), both green.",
      },
      practiceSet: [
        { prompt: "Pair in which both ions are colourless: \\(\\mathrm{Sc^{3+}}\\) and \\(\\mathrm{Zn^{2+}}\\), or \\(\\mathrm{Ti^{3+}}\\) and \\(\\mathrm{Cu^{2+}}\\)?", answer: "\\(\\mathrm{Sc^{3+}}\\) and \\(\\mathrm{Zn^{2+}}\\)" },
        { prompt: "Colours of \\(\\mathrm{Fe^{2+}}\\) and \\(\\mathrm{Fe^{3+}}\\) in water?", answer: "Green and yellow" },
        { prompt: "Why is \\(\\mathrm{K_2Cr_2O_7}\\) orange?", answer: "Charge transfer; Cr(VI) is d⁰" },
        { prompt: "Which shows colour by a d–d transition: \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\) or \\(\\mathrm{KMnO_4}\\)?", answer: "\\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\)" },
        { prompt: "Paramagnetic and coloured: \\(\\mathrm{Mn^{2+}}\\) and \\(\\mathrm{Cu^{2+}}\\), or \\(\\mathrm{Cu^{+}}\\) and \\(\\mathrm{Zn^{2+}}\\)?", answer: "\\(\\mathrm{Mn^{2+}}\\) and \\(\\mathrm{Cu^{2+}}\\)" },
      ],
      pyqExampleId: "84d9d13e-29a3-4139-accd-fa18e35c9ab5", // 2025 — V2+, Cr3+, Mn3+ all violet
      traps: [
        {
          title: "Intensely coloured is not paramagnetic",
          body: "Permanganate is deep purple but Mn(VII) is d⁰, so \\(\\mathrm{MnO_4^{-}}\\) is diamagnetic. Its colour comes from charge transfer, not from d electrons. The same holds for dichromate and chromate.",
        },
        {
          title: "Copper is colourless as Cu⁺",
          body: "\\(\\mathrm{Cu^{2+}}\\) (d⁹) is blue, but \\(\\mathrm{Cu^{+}}\\) (d¹⁰) is colourless. Always count the d electrons of the ION, not of the element.",
        },
      ],
    },
  ],
  related: [
    { label: "Electronic Configuration and General Properties — counting d electrons in an ion", href: `${BASE}/jch-dfb-config` },
    { label: "Lanthanoids and Actinoids — moments and colour of the f ions", href: `${BASE}/jch-dfb-lanthanoids` },
  ],
};
