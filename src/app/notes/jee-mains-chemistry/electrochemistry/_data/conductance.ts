import type { SubtopicNote } from "@/app/notes/_types";

export const CONDUCTANCE_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Conductivity, Cell Constant and Molar Conductivity",
  title: "Conductivity, Cell Constant and Molar Conductivity",
  oneLineDefinition:
    "From a measured resistance to conductivity through the cell constant, then to molar conductivity, with the units and the factors that change how well a solution conducts.",
  whyItMatters:
    "Fourteen PYQs, nine of them numerical, and one from 2026. Ten turn a resistance, resistivity or ppm figure into κ and Λm through the cell constant, often with a unit change on the way; four ask what affects conductance and how fast different ions move. Two ideas cover the page.",
  concepts: [
    // C1 — cell constant, κ and Λm
    {
      kind: "formula" as const,
      slug: "jcelec-cell-constant",
      name: "Cell constant, conductivity and molar conductivity",
      intuition:
        "A conductivity cell measures resistance. The cell constant turns that into conductivity, which belongs to the solution, not the cell. Dividing conductivity by concentration then gives molar conductivity: how well one mole of electrolyte conducts.",
      definition:
        "- Conductance \\(G=\\frac{1}{R}\\) (S). Resistivity \\(\\rho=\\frac{1}{\\kappa}\\).\n" +
        "- Cell constant \\(G^*=\\frac{l}{A}\\), in cm⁻¹ or m⁻¹. Then \\(\\kappa=\\frac{G^*}{R}=G\\times G^*\\).\n" +
        "- \\(\\Lambda_m=\\frac{1000\\,\\kappa}{c}\\) with \\(\\kappa\\) in S cm⁻¹ and \\(c\\) in mol L⁻¹ gives S cm² mol⁻¹.\n" +
        "- In SI, \\(\\Lambda_m=\\frac{\\kappa}{c}\\) with \\(\\kappa\\) in S m⁻¹ and \\(c\\) in mol m⁻³ gives S m² mol⁻¹.\n" +
        "- \\(1\\) S cm² mol⁻¹ \\(=10^{-4}\\) S m² mol⁻¹. \\(1\\) S m² \\(=10^{5}\\) mS dm².\n" +
        "- ppm to molarity: 74.5 ppm KCl is 74.5 mg L⁻¹, which is \\(10^{-3}\\) M.\n" +
        "- One cell, two solutions: \\(G^*\\) is the same, so \\(\\kappa_1R_1=\\kappa_2R_2\\).\n" +
        "- Units to match: cell constant m⁻¹; \\(\\kappa\\) S m⁻¹ (\\(\\Omega^{-1}\\) m⁻¹); \\(\\Lambda_m\\) S cm² mol⁻¹; degree of dissociation, none.",
      formula: {
        label: "From resistance to molar conductivity",
        latex: "\\kappa=\\frac{G^*}{R},\\qquad \\Lambda_m=\\frac{1000\\,\\kappa}{c}",
        symbols: [
          { symbol: "G^*", meaning: "cell constant l/A (cm⁻¹)" },
          { symbol: "c", meaning: "concentration in mol L⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "A cell filled with a standard solution of \\(\\kappa=0.0040\\) S cm⁻¹ reads 250 Ω. Filled with a 0.05 M solution it reads 400 Ω. Find the cell constant and the molar conductivity of the 0.05 M solution.",
        steps: [
          "\\(G^*=\\kappa R=0.0040\\times250=1.0\\) cm⁻¹.",
          "Second solution: \\(\\kappa=\\frac{1.0}{400}=0.0025\\) S cm⁻¹.",
          "\\(\\Lambda_m=\\frac{1000\\times0.0025}{0.05}=50\\) S cm² mol⁻¹.",
        ],
        answer: "\\(G^*=1.0\\) cm⁻¹; \\(\\Lambda_m=50\\) S cm² mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "A 0.1 M solution has resistivity 50 Ω cm. Find its molar conductivity in S cm² mol⁻¹ and in S m² mol⁻¹.",
        steps: [
          "\\(\\kappa=\\frac{1}{50}=0.02\\) S cm⁻¹.",
          "\\(\\Lambda_m=\\frac{1000\\times0.02}{0.1}=200\\) S cm² mol⁻¹.",
          "\\(200\\times10^{-4}=0.02\\) S m² mol⁻¹.",
        ],
        answer: "\\(200\\) S cm² mol⁻¹ \\(=0.02\\) S m² mol⁻¹.",
      },
      practiceSet: [
        { prompt: "\\(R=200\\) Ω, \\(G^*=1.2\\) cm⁻¹: \\(\\kappa\\)?", answer: "\\(0.006\\) S cm⁻¹" },
        { prompt: "\\(\\kappa=0.012\\) S cm⁻¹, \\(c=0.1\\) M: \\(\\Lambda_m\\)?", answer: "\\(120\\) S cm² mol⁻¹" },
        { prompt: "120 S cm² mol⁻¹ in S m² mol⁻¹?", answer: "\\(0.012\\)" },
        { prompt: "Same cell: solution 1 reads 300 Ω, solution 2 reads 150 Ω. \\(\\kappa_2/\\kappa_1\\)?", answer: "\\(2\\)" },
        { prompt: "SI unit of the cell constant?", answer: "m⁻¹" },
      ],
      pyqExampleId: "a5a006ad-9e05-4c02-a48a-57c8caa80da1", // 2026 — Λm and conductance give the % (w/w) of MX
      traps: [
        {
          title: "Mixing unit systems",
          body: "The factor 1000 belongs with S cm⁻¹ and mol L⁻¹. In SI, convert \\(c\\) to mol m⁻³ (multiply mol L⁻¹ by 1000) and drop the factor.",
        },
        {
          title: "Resistivity used as conductivity",
          body: "A resistivity in Ω cm must be inverted to get \\(\\kappa\\) before anything else.",
        },
      ],
    },

    // C2 — what conductance depends on
    {
      kind: "reference" as const,
      slug: "jcelec-conductance-factors",
      name: "What conductance depends on",
      intuition:
        "Current in a solution is carried by moving ions. Anything that changes how many ions there are, or how fast they move, changes the conductance. The electrodes only collect the current.",
      definition:
        "- **Affects conductance**: the nature of the electrolyte, the size and hydration of its ions, the solvent and its viscosity, the concentration, and the temperature (conductance rises with temperature).\n" +
        "- **Does not**: the material of the electrodes.\n" +
        "- On dilution \\(\\kappa\\) FALLS, because there are fewer ions per unit volume. \\(\\Lambda_m\\) RISES, because each mole of ions moves more freely.\n" +
        "- \\(\\mathrm{H^+}\\) and \\(\\mathrm{OH^-}\\) are much faster than any other ion: they pass along chains of hydrogen-bonded water (the Grotthuss mechanism).\n" +
        "- Within a group, a smaller BARE ion holds more water, so its hydrated ion is larger and slower: \\(\\mathrm{Li^+<Na^+<K^+}\\).",
      table: {
        columns: ["Ion", "λ° at 298 K (S cm² mol⁻¹)", "Why"],
        rows: [
          { cells: ["\\(\\mathrm{H^+}\\)", "\\(349.6\\)", "Proton hopping along hydrogen bonds"] },
          { cells: ["\\(\\mathrm{OH^-}\\)", "\\(199.1\\)", "Proton hopping, in reverse"] },
          { cells: ["\\(\\mathrm{SO_4^{2-}}\\)", "\\(160.0\\)", "Double charge carries twice the current"] },
          { cells: ["\\(\\mathrm{Ca^{2+}}\\)", "\\(119.0\\)", "Double charge"] },
          { cells: ["\\(\\mathrm{Mg^{2+}}\\)", "\\(106.0\\)", "Double charge, but a smaller ion is more hydrated than Ca²⁺"] },
          { cells: ["\\(\\mathrm{Br^-}\\)", "\\(78.1\\)", "Large anion, lightly hydrated"] },
          { cells: ["\\(\\mathrm{Cl^-}\\)", "\\(76.3\\)", "Close to K⁺, which is why KCl is the standard"] },
          { cells: ["\\(\\mathrm{K^+}\\)", "\\(73.5\\)", "Least hydrated of Li⁺, Na⁺, K⁺"] },
          { cells: ["\\(\\mathrm{Na^+}\\)", "\\(50.1\\)", "More hydrated than K⁺"] },
          { cells: ["\\(\\mathrm{CH_3COO^-}\\)", "\\(40.9\\)", "Large, bulky organic anion"] },
          { cells: ["\\(\\mathrm{Li^+}\\)", "\\(38.7\\)", "Smallest bare ion, largest hydrated ion"] },
        ],
        caption: "Values are per mole of the ion as written.",
      },
      selfCheckExample: {
        prompt:
          "Rank \\(\\mathrm{Cl^-}\\), \\(\\mathrm{OH^-}\\), \\(\\mathrm{CH_3COO^-}\\) and \\(\\mathrm{SO_4^{2-}}\\) by limiting molar conductivity in water.",
        steps: [
          "\\(\\mathrm{OH^-}\\) hops, so it is first. \\(\\mathrm{SO_4^{2-}}\\) carries a double charge, so it is next.",
          "\\(\\mathrm{Cl^-}\\) is a small single-charged ion; acetate is bulky and slowest.",
        ],
        answer: "\\(\\mathrm{OH^->SO_4^{2-}>Cl^->CH_3COO^-}\\)",
      },
      practiceSet: [
        { prompt: "Which does not affect conductance: temperature, concentration, electrode material, solvent?", answer: "Electrode material" },
        { prompt: "On dilution, \\(\\kappa\\) ___ and \\(\\Lambda_m\\) ___.", answer: "Falls; rises" },
        { prompt: "Why is \\(\\mathrm{H^+}\\) so fast?", answer: "Grotthuss mechanism: protons hop along hydrogen-bonded water" },
        { prompt: "Better conductor in water: \\(\\mathrm{Li^+}\\) or \\(\\mathrm{K^+}\\)?", answer: "\\(\\mathrm{K^+}\\)", method: "Its hydrated ion is smaller." },
        { prompt: "Electrolytic conductance as temperature rises?", answer: "Increases" },
      ],
      pyqExampleId: "fe5cef72-049b-4c0a-8426-d6b47dd98c98", // 2025 — order of λ° for H⁺, Ca²⁺, Mg²⁺, K⁺, Na⁺
      traps: [
        {
          title: "Bare size against hydrated size",
          body: "\\(\\mathrm{Li^+}\\) is the smallest bare ion but the slowest in water. What moves is the ion with its shell of water.",
        },
        {
          title: "κ and Λm move opposite ways",
          body: "\"Conductivity always decreases on dilution\" is true. \"Molar conductivity decreases on dilution\" is false.",
        },
      ],
    },
  ],
};
