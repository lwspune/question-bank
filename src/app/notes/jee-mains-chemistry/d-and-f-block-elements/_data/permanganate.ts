import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const PERMANGANATE_DFB_NOTE: SubtopicNote = {
  subtopicName: "Potassium Permanganate and Manganese Compounds",
  title: "Potassium Permanganate and Manganese Compounds",
  oneLineDefinition:
    "MnO₂ fused with KOH and an oxidant gives green manganate, which disproportionates or is oxidised to purple permanganate; permanganate is then a five-electron oxidant in acid, ending at Mn²⁺, and a three-electron oxidant in neutral or faintly alkaline solution, ending at MnO₂.",
  whyItMatters:
    "Twenty-eight PYQs, eleven of them numeric, and three from 2026. Fourteen follow MnO₂ to K₂MnO₄ and KMnO₄: the disproportionation of manganate, the effect of heat, and the two tetrahedral ions; fourteen use permanganate as an oxidant, where the product depends on whether the solution is acidic or neutral. Most of the numeric answers are an oxidation-state change or a magnetic moment of the manganese product.",
  concepts: [
    // C1 — preparation and properties
    {
      kind: "formula" as const,
      slug: "jcdfb-kmno4-prep",
      name: "Making KMnO₄: manganate, permanganate and disproportionation",
      intuition:
        "Manganese climbs in two steps. Fusing \\(\\mathrm{MnO_2}\\) (+4) with alkali and an oxidant gives green manganate, Mn(VI). Manganate is stable only in alkali. In neutral or acid solution it disproportionates: two Mn(VI) go up to Mn(VII) and one comes down to Mn(IV). Industry avoids wasting a third of the manganese by oxidising manganate electrolytically instead.",
      definition:
        "- **Fusion**: \\(\\mathrm{2MnO_2 + 4KOH + O_2 \\rightarrow 2K_2MnO_4 + 2H_2O}\\) (air or \\(\\mathrm{KNO_3}\\) as the oxidant).\n" +
        "- **Disproportionation** (neutral or acid): \\(\\mathrm{3MnO_4^{2-} + 4H^{+} \\rightarrow 2MnO_4^{-} + MnO_2 + 2H_2O}\\). Products +7 and +4, a difference of 3.\n" +
        "- **Commercial route**: manganate is oxidised electrolytically in alkaline solution to permanganate.\n" +
        "- **Laboratory route**: \\(\\mathrm{Mn^{2+}}\\) is oxidised by peroxodisulphate: \\(\\mathrm{2Mn^{2+} + 5S_2O_8^{2-} + 8H_2O \\rightarrow 2MnO_4^{-} + 10SO_4^{2-} + 16H^{+}}\\).\n" +
        "- **Heating**: \\(\\mathrm{2KMnO_4 \\xrightarrow{513\\ K} K_2MnO_4 + MnO_2 + O_2}\\).\n" +
        "- **The two ions**: both tetrahedral, with π bonds between oxygen p and manganese d orbitals. Manganate is green, Mn +6, d¹, paramagnetic (1.73 BM). Permanganate is purple, Mn +7, d⁰, diamagnetic; its colour is charge transfer.",
      formula: {
        label: "Disproportionation of manganate",
        latex: "\\mathrm{3\\overset{+6}{Mn}O_4^{2-} + 4H^{+} \\rightarrow 2\\overset{+7}{Mn}O_4^{-} + \\overset{+4}{Mn}O_2 + 2H_2O}",
      },
      authoredExample: {
        prompt:
          "0.9 mol of manganate is acidified. How many moles of permanganate and of \\(\\mathrm{MnO_2}\\) form, and what are the spin-only moments of manganese in each product?",
        steps: [
          "3 manganate give 2 permanganate and 1 \\(\\mathrm{MnO_2}\\): \\(0.9 \\times 2/3 = 0.6\\) mol and \\(0.9 \\times 1/3 = 0.3\\) mol.",
          "Permanganate: Mn(VII) is d⁰, so 0 BM.",
          "\\(\\mathrm{MnO_2}\\): Mn(IV) is d³, 3 unpaired, so \\(\\sqrt{15} = 3.87\\) BM.",
        ],
        answer: "0.6 mol \\(\\mathrm{MnO_4^{-}}\\) (0 BM) and 0.3 mol \\(\\mathrm{MnO_2}\\) (3.87 BM).",
      },
      selfCheckExample: {
        prompt:
          "0.2 mol of \\(\\mathrm{KMnO_4}\\) is heated to 513 K. What mass of oxygen is released, and which manganese product is paramagnetic?",
        steps: [
          "2 KMnO₄ give 1 O₂, so 0.1 mol of \\(\\mathrm{O_2}\\) = \\(0.1 \\times 32 = 3.2\\) g.",
          "The products are \\(\\mathrm{K_2MnO_4}\\) (Mn +6, d¹) and \\(\\mathrm{MnO_2}\\) (Mn +4, d³). Both have unpaired electrons.",
        ],
        answer: "3.2 g of oxygen; both \\(\\mathrm{K_2MnO_4}\\) (green) and \\(\\mathrm{MnO_2}\\) are paramagnetic.",
      },
      practiceSet: [
        { prompt: "Colour and Mn oxidation state of \\(\\mathrm{K_2MnO_4}\\)?", answer: "Green, +6" },
        { prompt: "Shapes of manganate and permanganate?", answer: "Both tetrahedral" },
        { prompt: "Products when manganate disproportionates in acid?", answer: "\\(\\mathrm{MnO_4^{-}}\\) and \\(\\mathrm{MnO_2}\\)" },
        { prompt: "Which reagent turns \\(\\mathrm{Mn^{2+}}\\) into permanganate in the lab?", answer: "Peroxodisulphate, \\(\\mathrm{S_2O_8^{2-}}\\)" },
        { prompt: "Spin-only moment of manganese in permanganate?", answer: "0 BM" },
      ],
      pyqExampleId: "5692f828-c257-49c2-aab4-9f61c747e3b9", // 2025 — MnO2 + KOH + KNO3 gives K2MnO4
      traps: [
        {
          title: "Manganate +6, permanganate +7",
          body: "The names are easy to swap. Manganate, \\(\\mathrm{MnO_4^{2-}}\\), is green, +6 and paramagnetic. Permanganate, \\(\\mathrm{MnO_4^{-}}\\), is purple, +7 and diamagnetic.",
        },
        {
          title: "Peroxodisulphate goes all the way to permanganate",
          body: "Oxidising a Mn(II) salt with peroxodisulphate gives \\(\\mathrm{MnO_4^{-}}\\), not manganate. A statement that it stops at manganate is false.",
        },
      ],
    },

    // C2 — permanganate as an oxidant
    {
      kind: "formula" as const,
      slug: "jcdfb-kmno4-reactions",
      name: "Permanganate as an oxidant: acid against neutral",
      intuition:
        "Permanganate always gains electrons, but how many depends on the medium. In acid there is enough H⁺ to strip all four oxygens off as water, so Mn falls all the way to +2: five electrons. In neutral or faintly alkaline solution it stops at insoluble \\(\\mathrm{MnO_2}\\), +4: three electrons. The product of the reducing agent can change with the medium too.",
      definition:
        "- **Acid**: \\(\\mathrm{MnO_4^{-} + 8H^{+} + 5e^{-} \\rightarrow Mn^{2+} + 4H_2O}\\), \\(E^\\circ = +1.52\\) V. n-factor 5.\n" +
        "- Iodide: \\(\\mathrm{10I^{-} + 2MnO_4^{-} + 16H^{+} \\rightarrow 2Mn^{2+} + 5I_2 + 8H_2O}\\).\n" +
        "- Iron(II): \\(\\mathrm{5Fe^{2+} + MnO_4^{-} + 8H^{+} \\rightarrow Mn^{2+} + 5Fe^{3+} + 4H_2O}\\).\n" +
        "- Oxalate: \\(\\mathrm{5C_2O_4^{2-} + 2MnO_4^{-} + 16H^{+} \\rightarrow 2Mn^{2+} + 10CO_2 + 8H_2O}\\).\n" +
        "- Also \\(\\mathrm{S^{2-} \\rightarrow S}\\), \\(\\mathrm{SO_3^{2-} \\rightarrow SO_4^{2-}}\\), \\(\\mathrm{NO_2^{-} \\rightarrow NO_3^{-}}\\).\n" +
        "- **Neutral or faintly alkaline**: \\(\\mathrm{MnO_4^{-} + 2H_2O + 3e^{-} \\rightarrow MnO_2 + 4OH^{-}}\\). n-factor 3.\n" +
        "- Iodide goes to iodate: \\(\\mathrm{2MnO_4^{-} + H_2O + I^{-} \\rightarrow 2MnO_2 + 2OH^{-} + IO_3^{-}}\\).\n" +
        "- Thiosulphate goes to sulphate: \\(\\mathrm{8MnO_4^{-} + 3S_2O_3^{2-} + H_2O \\rightarrow 8MnO_2 + 6SO_4^{2-} + 2OH^{-}}\\).\n" +
        "- Titrations are done in dilute \\(\\mathrm{H_2SO_4}\\), never HCl: permanganate oxidises chloride to chlorine.\n" +
        "- With Mohr's salt: \\(\\mathrm{2KMnO_4 + 10FeSO_4 + 8H_2SO_4 \\rightarrow K_2SO_4 + 2MnSO_4 + 5Fe_2(SO_4)_3 + 8H_2O}\\).",
      formula: {
        label: "Two media, two products",
        latex: "\\text{acid: } \\mathrm{Mn^{+7} \\rightarrow Mn^{2+}}\\ (5e^{-}) \\qquad \\text{neutral/faintly alkaline: } \\mathrm{Mn^{+7} \\rightarrow MnO_2}\\ (3e^{-})",
      },
      authoredExample: {
        prompt:
          "What volume of 0.02 M \\(\\mathrm{KMnO_4}\\) oxidises 25 mL of 0.1 M \\(\\mathrm{FeSO_4}\\) in dilute sulphuric acid?",
        steps: [
          "Moles of \\(\\mathrm{Fe^{2+}}\\) = \\(0.025 \\times 0.1 = 2.5\\) mmol; each loses 1 electron.",
          "In acid permanganate takes 5 electrons, so \\(\\mathrm{KMnO_4}\\) = \\(2.5/5 = 0.5\\) mmol.",
          "Volume \\(= 0.5/0.02 = 25\\) mL.",
        ],
        answer: "25 mL.",
      },
      selfCheckExample: {
        prompt:
          "In neutral solution, how many moles of permanganate oxidise 0.03 mol of thiosulphate to sulphate, and what is the manganese product?",
        steps: [
          "S goes from +2 to +6 in each of the two S atoms: 8 electrons per \\(\\mathrm{S_2O_3^{2-}}\\), so \\(0.03 \\times 8 = 0.24\\) mol of electrons.",
          "In neutral solution permanganate takes 3: \\(0.24/3 = 0.08\\) mol.",
          "Manganese ends as \\(\\mathrm{MnO_2}\\).",
        ],
        answer: "0.08 mol of \\(\\mathrm{MnO_4^{-}}\\); the product is \\(\\mathrm{MnO_2}\\).",
      },
      practiceSet: [
        { prompt: "n-factor of \\(\\mathrm{KMnO_4}\\) in acid, and in neutral solution?", answer: "5 and 3" },
        { prompt: "Spin-only moment of the manganese product in acid?", answer: "\\(\\mathrm{Mn^{2+}}\\), d⁵: 5.92 BM" },
        { prompt: "Why are permanganate titrations not done in HCl?", answer: "Permanganate oxidises chloride to chlorine" },
        { prompt: "Product of iodide with permanganate in faintly alkaline solution?", answer: "Iodate, \\(\\mathrm{IO_3^{-}}\\)" },
        { prompt: "Water molecules formed per 2 \\(\\mathrm{KMnO_4}\\) in the Mohr's-salt titration, not counting water of crystallisation?", answer: "8" },
      ],
      pyqExampleId: "01822604-7bbf-4fd8-b9cd-951ecab25ab7", // 2023 — I- goes to I2 in acid and to IO3- in neutral/faintly alkaline
      traps: [
        {
          title: "Permanganate oxidises; it never reduces",
          body: "Acidified permanganate OXIDISES oxalate, nitrite and iodide. A statement that it 'reduces oxalate, nitrite and iodide' is false, however familiar the list looks.",
        },
        {
          title: "Count the water of crystallisation when the question does",
          body: "If the titration uses ferrous ammonium sulphate HEXAHYDRATE, the 10 formula units bring 60 water molecules of their own. With the 8 formed in the reaction that is 68 per 2 \\(\\mathrm{KMnO_4}\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Potassium Dichromate and Chromium Compounds — the six-electron oxidant", href: `${BASE}/jch-dfb-dichromate` },
    { label: "Magnetic Moment and Colour — moments of the manganese products", href: `${BASE}/jch-dfb-magnetic` },
  ],
};
