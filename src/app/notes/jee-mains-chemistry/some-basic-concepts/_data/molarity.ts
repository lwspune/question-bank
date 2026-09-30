import type { SubtopicNote } from "@/app/notes/_types";

export const MOLARITY_SBC_NOTE: SubtopicNote = {
  subtopicName: "Molarity, Dilution and Mixing",
  title: "Molarity, Dilution and Mixing",
  oneLineDefinition:
    "Molarity from a mass and a volume, dilution and mixing of solutions, and which concentration terms change with temperature.",
  whyItMatters:
    "Eighteen PYQs, fourteen of them numerical, which makes this the chapter's most numerical page; none yet from 2026. Ten find a molarity, or the mass needed for one, often from a hydrate. Four dilute or mix solutions, and four ask which concentration terms change with temperature. The arithmetic is short, so the marks go to whoever keeps the units straight.",
  concepts: [
    // C1 — molarity
    {
      kind: "formula" as const,
      slug: "jcsbc-molarity",
      name: "Molarity from mass and volume",
      intuition:
        "Molarity counts the moles of solute in each litre of solution. Weigh the solute, divide by its molar mass, then divide by the volume in litres. For a hydrate, the water of crystallisation is part of the molar mass.",
      definition:
        "- \\(M=\\frac{n}{V(\\mathrm{L})}=\\frac{m\\times1000}{M_B\\times V(\\mathrm{mL})}\\).\n" +
        "- Hydrates: \\(\\mathrm{CuSO_4\\cdot5H_2O}\\) is 249.5 g mol\\(^{-1}\\); \\(\\mathrm{H_2C_2O_4\\cdot2H_2O}\\) is 126 g mol\\(^{-1}\\).\n" +
        "- An ion's concentration: multiply by its count per formula unit. \\(\\mathrm{Na_3PO_4}\\) gives 3 \\(\\mathrm{Na^+}\\).\n" +
        "- A solute that reacts with water: count the product. \\(\\mathrm{Na_2O}\\) gives 2 NaOH.\n" +
        "- 'Dissolved in 500 mL of water' is taken as 500 mL of solution unless a density is given.",
      formula: {
        label: "Molarity",
        latex: "M=\\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\mathrm{L})}",
      },
      authoredExample: {
        prompt: "Find the molarity when \\(24.95\\) g of \\(\\mathrm{CuSO_4\\cdot5H_2O}\\) is dissolved to make 500 mL of solution.",
        steps: [
          "\\(M_B=159.5+5(18)=249.5\\) g mol\\(^{-1}\\).",
          "\\(n=\\frac{24.95}{249.5}=0.1\\) mol.",
          "\\(M=\\frac{0.1}{0.5}=0.2\\) M.",
        ],
        answer: "\\(0.2\\) M.",
      },
      selfCheckExample: {
        prompt: "What mass of NaOH is needed to make 250 mL of \\(0.4\\) M solution?",
        steps: [
          "\\(n=0.4\\times0.25=0.1\\) mol.",
          "Mass \\(=0.1\\times40=4.0\\) g.",
        ],
        answer: "\\(4.0\\) g.",
      },
      practiceSet: [
        { prompt: "4 g of NaOH in 500 mL. Molarity?", answer: "\\(0.2\\) M" },
        { prompt: "Molar mass of oxalic acid dihydrate?", answer: "126 g mol\\(^{-1}\\)" },
        { prompt: "\\([\\mathrm{Na^+}]\\) in \\(0.1\\) M \\(\\mathrm{Na_2SO_4}\\)?", answer: "\\(0.2\\) M" },
        { prompt: "Moles in 200 mL of \\(0.5\\) M?", answer: "\\(0.1\\)" },
      ],
      pyqExampleId: "f1a78255-74e5-4e7b-a54a-69afb0f35c51", // 2021 Paper 22 — molarity of oxalic acid dihydrate
      traps: [
        {
          title: "Forgetting the water of crystallisation",
          body: "Copper sulphate crystals are 249.5 g mol\\(^{-1}\\), not 159.5. Using the anhydrous value overstates the moles by more than half.",
        },
      ],
    },

    // C2 — dilution and mixing
    {
      kind: "formula" as const,
      slug: "jcsbc-dilution",
      name: "Dilution and mixing",
      intuition:
        "Adding water changes the volume, not the moles. Mixing two solutions of one solute adds their moles and their volumes. If acid and water both boil off, recount both.",
      definition:
        "- Dilution: \\(M_1V_1=M_2V_2\\).\n" +
        "- Mixing the same solute: \\(M=\\frac{M_1V_1+M_2V_2}{V_1+V_2}\\).\n" +
        "- Evaporation: moles left \\(=\\) moles at the start \\(-\\) moles lost; divide by the new volume.\n" +
        "- Millimoles \\(=M\\times V(\\mathrm{mL})\\).",
      formula: {
        label: "Mixing rule",
        latex: "M_{\\text{mix}}=\\frac{M_1V_1+M_2V_2}{V_1+V_2}",
      },
      authoredExample: {
        prompt: "50 mL of \\(1.0\\) M HCl is mixed with 150 mL of \\(0.2\\) M HCl. Find the molarity of the mixture.",
        steps: [
          "Millimoles: \\(50\\times1.0+150\\times0.2=50+30=80\\).",
          "Volume \\(=200\\) mL, so \\(M=\\frac{80}{200}=0.4\\) M.",
        ],
        answer: "\\(0.4\\) M.",
      },
      selfCheckExample: {
        prompt: "What volume of \\(2.5\\) M NaCl stock is needed to make 400 mL of \\(0.1\\) M NaCl?",
        steps: [
          "\\(V_1=\\frac{M_2V_2}{M_1}=\\frac{0.1\\times400}{2.5}=16\\) mL.",
        ],
        answer: "16 mL.",
      },
      practiceSet: [
        { prompt: "100 mL of 1 M diluted to 1 L. Molarity?", answer: "\\(0.1\\) M" },
        { prompt: "Water to add to 200 mL of \\(0.6\\) M to make \\(0.2\\) M?", answer: "400 mL" },
        { prompt: "1 L of 1 M mixed with 1 L of 3 M?", answer: "2 M" },
        { prompt: "Millimoles in 25 mL of \\(0.2\\) M?", answer: "5" },
      ],
      pyqExampleId: "cea891b8-8321-413e-a5ea-77ebbf835e49", // 22 Jan 2025 — mixing two NaOH solutions
      traps: [
        {
          title: "Water added is not the final volume",
          body: "Water added \\(=\\) final volume \\(-\\) starting volume. Taking 200 mL of \\(0.6\\) M to \\(0.2\\) M needs a final 600 mL, so you add 400 mL.",
        },
      ],
    },

    // C3 — temperature dependence
    {
      kind: "reference" as const,
      slug: "jcsbc-temperature",
      name: "Which concentration terms depend on temperature",
      intuition:
        "A liquid expands when it is warmed. Any concentration term with a volume in it changes with temperature. Any term built only from masses and moles does not.",
      definition:
        "- Changes with temperature: molarity and normality, because both are per litre of solution.\n" +
        "- Does not change: molality, mole fraction, mass percent and ppm by mass.\n" +
        "- Water is densest at 4 °C, so a fixed amount of an aqueous solution has its smallest volume, and its highest molarity, near 4 °C.\n" +
        "- The usual concentration terms are mass percent, mole fraction, molarity, molality and ppm. A mole is an amount, not a concentration.",
      table: {
        columns: ["Term", "Defined with", "Changes with temperature?"],
        rows: [
          { cells: ["Molarity", "Volume of solution (L)", "Yes"] },
          { cells: ["Normality", "Volume of solution (L)", "Yes"] },
          { cells: ["Molality", "Mass of solvent (kg)", "No"] },
          { cells: ["Mole fraction", "Moles only", "No"] },
          { cells: ["Mass percent", "Masses only", "No"] },
          { cells: ["ppm (by mass)", "Masses only", "No"] },
          { cells: ["Mole", "An amount of substance", "Not a concentration term at all"], noteAmber: "In a list of 'units of concentration', the mole is the one to leave out." },
        ],
        caption: "Water is densest at 4 °C, so the molarity of an aqueous solution peaks near 4 °C.",
      },
      selfCheckExample: {
        prompt: "A solution is 1.00 m and 0.95 M at 25 °C. It is warmed to 50 °C. Which value changes, and which way?",
        steps: [
          "The volume grows on warming, so moles per litre fall: the molarity drops below 0.95 M.",
          "Molality uses the mass of solvent, which does not change: it stays 1.00 m.",
        ],
        answer: "Molarity falls; molality stays the same.",
      },
      practiceSet: [
        { prompt: "Which changes with temperature: molality or molarity?", answer: "Molarity" },
        { prompt: "Is the mole a unit of concentration?", answer: "No" },
        { prompt: "Mole fraction on heating?", answer: "Unchanged" },
        { prompt: "Temperature at which an aqueous solution's molarity is highest?", answer: "About 4 °C" },
      ],
      pyqExampleId: "baa0af94-765b-4b31-9228-eeab031336ef", // 27 Jan 2024 — the quantity that changes with temperature
      traps: [
        {
          title: "Heating does not always lower molarity",
          body: "Warming an aqueous solution from 1 °C to 4 °C shrinks it slightly, so molarity first rises, then falls above 4 °C. A graph with a single maximum near 4 °C is the right shape.",
        },
      ],
    },
  ],
};
