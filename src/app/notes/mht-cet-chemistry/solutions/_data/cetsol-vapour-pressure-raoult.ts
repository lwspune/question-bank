import type { SubtopicNote } from "@/app/notes/_types";

export const VAPOUR_PRESSURE_RAOULT_NOTE: SubtopicNote = {
  subtopicName: "Vapour Pressure and Raoult's Law",
  title: "Vapour Pressure and Raoult's Law",
  oneLineDefinition:
    "Each volatile component contributes its pure vapour pressure times its mole fraction; a non-volatile solute lowers the solvent's vapour pressure by the solute's mole fraction — the relative lowering (P° − P)/P° = x₂.",
  whyItMatters:
    "24 PYQs, one HARD. Two-thirds are the relative lowering of vapour pressure — from the two pressures, from moles, or in the dilute form W₂M₁/(M₂W₁) to recover a molar mass — and the rest are Raoult's law for two volatile liquids solved for a mole fraction or a pure vapour pressure, plus the recall of which mixtures are ideal, positive-deviation or negative-deviation. " +
    "The only real trap is dividing by the wrong pressure.",
  concepts: [
    // 1 — two volatile liquids
    {
      kind: "formula" as const,
      slug: "cetsol-raoults-law-two-volatile-liquids",
      name: "Raoult's Law for Two Volatile Liquids: P = x_A P_A° + x_B P_B°",
      intuition:
        "Each liquid evaporates as if it alone were present, scaled down by its mole fraction. The total vapour pressure is the sum, and the same equation solved backwards gives an unknown mole fraction or an unknown pure-component pressure.",
      definition:
        "- \\(P_A = x_A P_A^\\circ\\), \\(P_B = x_B P_B^\\circ\\), \\(P_{\\text{total}} = x_A P_A^\\circ + x_B P_B^\\circ\\) with \\(x_A + x_B = 1\\).\n" +
        "- \\(2\\) mol A (\\(420\\)) and \\(3\\) mol B (\\(610\\)): \\(0.4 \\times 420 + 0.6 \\times 610 = 534\\) mm Hg.\n" +
        "- Unknown mole fraction: \\(500 = 400(1 - x_B) + 575x_B \\Rightarrow x_B = 0.57\\). Unknown pure pressure: \\(600 = 0.6P_A^\\circ + 0.4 \\times 900 \\Rightarrow P_A^\\circ = 400\\); \\(600 = 0.6 \\times 400 + 0.4P_B^\\circ \\Rightarrow P_B^\\circ = 900\\).\n" +
        "- Statement form: 'the partial vapour pressure of any volatile component equals the vapour pressure of the pure component multiplied by its mole fraction' — Raoult's law.\n" +
        "- The mole fraction of a component in the VAPOUR is \\(y_A = \\dfrac{P_A}{P_{\\text{total}}}\\) (Dalton), richer in the more volatile component.",
      formula: {
        label: "Raoult's law",
        latex:
          "P_{\\text{total}} = x_A P_A^\\circ + x_B P_B^\\circ \\qquad y_A = \\frac{x_A P_A^\\circ}{P_{\\text{total}}}",
      },
      authoredExample: {
        prompt: "Liquids A (\\(P^\\circ = 300\\) mm Hg) and B (\\(P^\\circ = 500\\) mm Hg) are mixed in the mole ratio \\(1 : 3\\). Find the total vapour pressure and the mole fraction of A in the vapour.",
        steps: [
          "\\(x_A = 0.25\\), \\(x_B = 0.75\\): \\(P = 75 + 375 = 450\\) mm Hg.",
          "\\(y_A = \\dfrac{75}{450} = \\dfrac16\\).",
        ],
        answer: "\\(450\\) mm Hg; \\(y_A = \\dfrac16\\)",
      },
      selfCheckExample: {
        prompt: "A mixture of A and B has total vapour pressure \\(560\\) mm Hg when \\(x_A = 0.3\\). If \\(P_B^\\circ = 650\\) mm Hg, find \\(P_A^\\circ\\).",
        steps: [
          "\\(560 = 0.3P_A^\\circ + 0.7 \\times 650 = 0.3P_A^\\circ + 455 \\Rightarrow P_A^\\circ = 350\\).",
        ],
        answer: "\\(350\\) mm Hg",
      },
      practiceSet: [
        { prompt: "\\(0.4 \\times 420 + 0.6 \\times 610 = ?\\)", answer: "\\(534\\) mm Hg" },
        { prompt: "\\(x_B\\) if \\(500 = 400(1 - x_B) + 575x_B\\)?", answer: "\\(0.57\\)" },
        { prompt: "Vapour-phase mole fraction formula?", answer: "\\(y_A = P_A / P_{\\text{total}}\\)" },
        { prompt: "\\(P_A^\\circ\\) if \\(600 = 0.6P_A^\\circ + 360\\)?", answer: "\\(400\\) mm Hg" },
      ],
      pyqExampleId: "6e791d4b-357e-406f-a6ba-513e1085f0bd",
      traps: [
        {
          title: "Using the given mole fraction for the wrong component",
          body:
            "If \\(x_B = 0.4\\) is given, \\(x_A = 0.6\\) multiplies \\(P_A^\\circ\\). Swapping them turns \\(400\\) into a value that is also on the list.",
        },
      ],
    },

    // 2 — relative lowering
    {
      kind: "formula" as const,
      slug: "cetsol-relative-lowering-of-vapour-pressure",
      name: "Relative Lowering of Vapour Pressure = Mole Fraction of the Solute",
      intuition:
        "A non-volatile solute contributes nothing to the vapour but takes up a share of the surface, so \\(P = x_1 P^\\circ\\) and the fractional drop \\(\\dfrac{P^\\circ - P}{P^\\circ} = x_2\\). For a dilute solution \\(x_2 \\approx \\dfrac{n_2}{n_1} = \\dfrac{W_2 M_1}{M_2 W_1}\\), which turns a measured lowering into a molar mass.",
      definition:
        "- \\(\\dfrac{P^\\circ - P}{P^\\circ} = x_2 = \\dfrac{n_2}{n_1 + n_2}\\); e.g. \\(\\dfrac{32 - 30}{32} = 0.0625\\), \\(\\dfrac{640 - 590}{640} = 0.078\\), \\(\\dfrac{40}{550} = 0.072\\).\n" +
        "- \\(1\\) mol solute in \\(36\\) g water (\\(2\\) mol): \\(x_2 = \\tfrac13\\), \\(P = 32 \\times \\tfrac23 = 21.44\\) mm Hg. \\(0.1\\) mol in \\(16.2\\) g water: \\(x_1 = 0.9\\), \\(P = 21.6\\) mm Hg.\n" +
        "- **Dilute form** \\(\\dfrac{\\Delta P}{P^\\circ} = \\dfrac{W_2 M_1}{M_2 W_1}\\): \\(3\\) g urea in \\(50\\) g water gives \\(\\dfrac{3 \\times 18}{60 \\times 50} = 0.018\\); \\(20\\) g solute in \\(200\\) g water with lowering \\(0.02\\) gives \\(M_2 = \\dfrac{20 \\times 18}{200 \\times 0.02} = 90\\).\n" +
        "- Lowering is proportional to \\(x_2\\): doubling the lowering (\\(10 \\to 20\\) mm Hg) doubles the solute mole fraction (\\(0.2 \\to 0.4\\)). Given the relative lowering, \\(P = P^\\circ(1 - 0.018) = 17.68\\) mm Hg for \\(P^\\circ = 18\\).\n" +
        "- Identify the solute: \\(100\\) g water, \\(17.53 \\to 17.22\\) mm Hg, \\(17.10\\) g of X: \\(x_2 = 0.0177\\), \\(n_2 \\approx 0.1\\), \\(M \\approx 171 \\approx 180\\) — glucose.",
      formula: {
        label: "Relative lowering",
        latex:
          "\\frac{P^\\circ - P}{P^\\circ} = x_2 = \\frac{n_2}{n_1 + n_2} \\approx \\frac{W_2\\,M_1}{M_2\\,W_1}",
      },
      authoredExample: {
        prompt: "\\(9\\) g of a non-volatile solute in \\(90\\) g of water lowers the vapour pressure from \\(30\\) to \\(29.4\\) mm Hg. Find the solute's molar mass.",
        steps: [
          "Relative lowering \\(= \\dfrac{0.6}{30} = 0.02 = \\dfrac{9 \\times 18}{M_2 \\times 90}\\).",
          "\\(M_2 = \\dfrac{162}{1.8} = 90\\) g mol\\(^{-1}\\).",
        ],
        answer: "\\(90\\) g mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "The vapour pressure of water at \\(298\\) K is \\(24\\) mm Hg. Find the vapour pressure of a solution of \\(0.5\\) mol of glucose in \\(81\\) g of water.",
        steps: [
          "\\(n_1 = 4.5\\); \\(x_1 = \\dfrac{4.5}{5} = 0.9\\); \\(P = 0.9 \\times 24 = 21.6\\) mm Hg.",
        ],
        answer: "\\(21.6\\) mm Hg",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{32 - 30}{32} = ?\\)", answer: "\\(0.0625\\)" },
        { prompt: "Mole fraction of solute for \\(1\\) mol in \\(36\\) g water?", answer: "\\(\\dfrac13\\)" },
        { prompt: "\\(\\dfrac{3 \\times 18}{60 \\times 50} = ?\\)", answer: "\\(0.018\\)" },
        { prompt: "\\(P\\) if \\(P^\\circ = 18\\) and relative lowering \\(0.018\\)?", answer: "\\(17.68\\) mm Hg" },
      ],
      pyqExampleId: "2758632c-fe9c-43c8-8327-7bd59450c416",
      traps: [
        {
          title: "Dividing by the solution's pressure, or reporting the solvent's mole fraction",
          body:
            "\\(\\dfrac{2}{30}\\) gives \\(0.067\\), and \\(0.9375\\) is \\(x_1\\), the SOLVENT's mole fraction — both are options on the \\(32/30\\) stem. The relative lowering divides by \\(P^\\circ\\) and equals the SOLUTE's mole fraction.",
        },
      ],
    },

    // 3 — ideal vs non-ideal (reference)
    {
      kind: "reference" as const,
      slug: "cetsol-ideal-and-non-ideal-solutions",
      name: "Ideal and Non-Ideal Solutions: Which Way a Mixture Deviates",
      intuition:
        "An ideal solution obeys Raoult's law at every composition because A–B attractions match A–A and B–B, so \\(\\Delta H_{\\text{mix}} = 0\\) and \\(\\Delta V_{\\text{mix}} = 0\\). Weaker A–B attractions push the vapour pressure ABOVE Raoult (positive deviation); stronger ones, usually new hydrogen bonds, pull it below (negative deviation).",
      definition:
        "- **Ideal**: \\(\\Delta H_{\\text{mix}} = 0\\), \\(\\Delta V_{\\text{mix}} = 0\\), obeys Raoult over the whole range — benzene + toluene, n-hexane + n-heptane.\n" +
        "- **Positive deviation**: \\(P > P_{\\text{Raoult}}\\), \\(\\Delta H_{\\text{mix}} > 0\\), \\(\\Delta V_{\\text{mix}} > 0\\) — ethanol + acetone, carbon disulphide + acetone, ethanol + water.\n" +
        "- **Negative deviation**: \\(P < P_{\\text{Raoult}}\\), \\(\\Delta H_{\\text{mix}} < 0\\), \\(\\Delta V_{\\text{mix}} < 0\\) — chloroform + acetone, phenol + aniline, nitric acid + water.\n" +
        "- The vapour pressure of a non-ideal solution can lie OUTSIDE the range of the pure components' pressures (a maximum or a minimum), which is what makes azeotropes; 'always lies between' is the false statement.",
      table: {
        columns: ["Type", "Raoult's law", "ΔH mix, ΔV mix", "Examples"],
        rows: [
          { cells: ["Ideal", "Obeyed at every composition", "Both zero", "Benzene + toluene; hexane + heptane"], noteAmber: "The exam's default 'obeys Raoult's law' answer is benzene + toluene." },
          { cells: ["Positive deviation", "P above Raoult", "Both positive", "Ethanol + acetone; CS₂ + acetone; ethanol + water"], noteAmber: "Acetone breaks ethanol's hydrogen bonds — weaker A–B attraction, higher vapour pressure." },
          { cells: ["Negative deviation", "P below Raoult", "Both negative", "Chloroform + acetone; phenol + aniline; HNO₃ + water"], noteAmber: "Chloroform's H bonds to acetone's oxygen — a NEW attraction, lower vapour pressure." },
        ],
        caption: "Deviation follows the strength of the A–B attraction relative to A–A and B–B.",
      },
      selfCheckExample: {
        prompt: "Classify: (i) chloroform + acetone, (ii) benzene + toluene, (iii) ethanol + acetone.",
        steps: [
          "(i) new hydrogen bond → negative; (ii) matched attractions → ideal; (iii) broken hydrogen bonds → positive.",
        ],
        answer: "(i) negative deviation; (ii) ideal; (iii) positive deviation.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta H_{\\text{mix}}\\) for an ideal solution?", answer: "\\(0\\)" },
        { prompt: "Ethanol + acetone deviates?", answer: "Positively" },
        { prompt: "Chloroform + acetone deviates?", answer: "Negatively" },
        { prompt: "Can a non-ideal solution's vapour pressure exceed both pure components'?", answer: "Yes (positive deviation)." },
      ],
      pyqExampleId: "167711f4-aad9-42ca-9e94-bd26bf49e9fd",
      traps: [
        {
          title: "Calling chloroform + acetone positive",
          body:
            "Chloroform's C–H hydrogen-bonds to acetone's C=O, a new attraction that LOWERS the vapour pressure: negative deviation. Ethanol + acetone is the positive one.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Elevation of Boiling Point — the first consequence of a lowered vapour pressure",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-boiling-point-elevation",
    },
    {
      label: "Types of Solutions, Solubility and Henry's Law — Dalton's partial pressures",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-types-solubility-henry",
    },
  ],
};
