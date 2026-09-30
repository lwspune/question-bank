import type { SubtopicNote } from "@/app/notes/_types";

export const CONCENTRATION_SBC_NOTE: SubtopicNote = {
  subtopicName: "Molality, Mole Fraction and ppm",
  title: "Molality, Mole Fraction and ppm",
  oneLineDefinition:
    "Molality, mole fraction, mass percent and parts per million, and converting between them through the density of the solution.",
  whyItMatters:
    "Twenty-six PYQs, fourteen of them numerical and two from 2026. Thirteen convert between molarity, molality and mass percent through a density. Nine find a mole fraction or a mass percent, often of a mixture, and four use parts per million. Every one starts by fixing a basis: one litre, or one hundred grams, of solution.",
  concepts: [
    // C1 — density conversions
    {
      kind: "formula" as const,
      slug: "jcsbc-density-conversion",
      name: "Converting molarity, molality and mass percent",
      intuition:
        "Density turns a volume of solution into a mass. Fix a basis, 1 L of solution or 100 g of it, find the masses of solute and solvent, and every concentration term follows.",
      definition:
        "- Molality: \\(m=\\frac{n_{\\text{solute}}}{\\text{mass of solvent (kg)}}\\).\n" +
        "- Basis 1 L: mass of solution \\(=1000d\\) g; mass of solvent \\(=1000d-nM_B\\). Here \\(d\\) is the density in g mL\\(^{-1}\\), \\(M\\) the molarity and \\(M_B\\) the solute's molar mass.\n" +
        "- From mass percent: \\(M=\\frac{10\\times(\\%\\text{ w/w})\\times d}{M_B}\\), with \\(d\\) in g mL\\(^{-1}\\).\n" +
        "- v/v: turn each volume into a mass with its own density before anything else.",
      formula: {
        label: "Molarity to molality",
        latex: "m=\\frac{1000\\,M}{1000\\,d-M\\,M_B}",
      },
      authoredExample: {
        prompt: "A 2 M solution of KCl (74.5 g mol\\(^{-1}\\)) has a density of \\(1.09\\) g mL\\(^{-1}\\). Find its molality.",
        steps: [
          "Take 1 L: mass of solution \\(=1090\\) g.",
          "KCl \\(=2\\times74.5=149\\) g, so water \\(=1090-149=941\\) g.",
          "\\(m=\\frac{2}{0.941}=2.13\\) m.",
        ],
        answer: "\\(2.13\\) m.",
      },
      selfCheckExample: {
        prompt: "Sulphuric acid is \\(49\\%\\) \\(\\mathrm{H_2SO_4}\\) by mass, with density \\(1.40\\) g mL\\(^{-1}\\). Find its molarity.",
        steps: [
          "\\(M=\\frac{10\\times49\\times1.40}{98}=\\frac{686}{98}=7.0\\) M.",
        ],
        answer: "\\(7.0\\) M.",
      },
      practiceSet: [
        { prompt: "\\(40\\%\\) w/w NaOH, \\(d=1.5\\) g mL\\(^{-1}\\). Molarity?", answer: "15 M" },
        { prompt: "1 L of solution, \\(d=1.2\\) g mL\\(^{-1}\\), holds 60 g of solute. Mass of solvent?", answer: "1140 g" },
        { prompt: "1 mol of solute in 500 g of water. Molality?", answer: "2 m" },
        { prompt: "Molality divides by the mass of the solution or of the solvent?", answer: "The solvent" },
      ],
      pyqExampleId: "a0cc0a14-a5a0-4d7e-87ba-24eab64260cf", // 26 June 2022 — molarity of 35% HCl from its density
      traps: [
        {
          title: "Dividing by the solution's mass",
          body: "Molality is per kilogram of solvent. For the 2 M KCl above, dividing by the whole 1.09 kg of solution gives 1.83 m; the right answer, 2.13 m, subtracts the 149 g of KCl first.",
        },
      ],
    },

    // C2 — mole fraction and mass percent
    {
      kind: "formula" as const,
      slug: "jcsbc-mole-fraction",
      name: "Mole fraction and mass percent of mixtures",
      intuition:
        "Mole fraction is a share of the moles. Convert every mass to moles, then divide. When two solutions are mixed, add the solutes together and the solutions together first.",
      definition:
        "- \\(x_A=\\frac{n_A}{n_A+n_B+\\ldots}\\), and all the fractions add to 1.\n" +
        "- From molality in water: 1000 g of water is 55.5 mol, so \\(x=\\frac{m}{m+55.5}\\).\n" +
        "- Mass percent \\(=\\frac{\\text{mass of solute}}{\\text{mass of solution}}\\times100\\).\n" +
        "- Mixing: total solute over total solution, for mass percent and mole fraction alike.",
      formula: {
        label: "Mole fraction from molality",
        latex: "x_{\\text{solute}}=\\frac{m}{m+\\frac{1000}{M_{\\text{solvent}}}}",
      },
      authoredExample: {
        prompt: "Find the mole fraction of ethanol (\\(\\mathrm{C_2H_5OH}\\), 46 g mol\\(^{-1}\\)) in a solution of 23 g of ethanol in 36 g of water.",
        steps: [
          "Ethanol: \\(\\frac{23}{46}=0.5\\) mol. Water: \\(\\frac{36}{18}=2\\) mol.",
          "\\(x=\\frac{0.5}{2.5}=0.2\\).",
        ],
        answer: "\\(0.2\\).",
      },
      selfCheckExample: {
        prompt: "300 g of a \\(20\\%\\) sugar solution is mixed with 200 g of a \\(45\\%\\) sugar solution (both by mass). Find the mass percent of sugar in the mixture.",
        steps: [
          "Sugar: \\(60+90=150\\) g. Solution: \\(300+200=500\\) g.",
          "Mass percent \\(=\\frac{150}{500}\\times100=30\\%\\).",
        ],
        answer: "\\(30\\%\\).",
      },
      practiceSet: [
        { prompt: "Mole fraction of solute in a 1 m aqueous solution?", answer: "\\(\\approx0.0177\\)" },
        { prompt: "Mole fraction of water if the solute's is \\(0.1\\)?", answer: "\\(0.9\\)" },
        { prompt: "10 g of solute in 90 g of water. Mass percent?", answer: "\\(10\\%\\)" },
        { prompt: "Moles in 1000 g of water?", answer: "\\(55.5\\)" },
      ],
      pyqExampleId: "673eac71-01ad-421e-87e4-d111240d2e14", // 5 Apr 2026 S1 — mole fraction of water in a urea solution
      traps: [
        {
          title: "Whose mole fraction?",
          body: "Options usually carry both the solute's and the solvent's fraction, and the two add to 1. Read which one the question asks for.",
        },
      ],
    },

    // C3 — ppm
    {
      kind: "formula" as const,
      slug: "jcsbc-ppm",
      name: "Parts per million",
      intuition:
        "ppm is a mass ratio multiplied by a million. In dilute water solutions, 1 ppm is 1 mg of solute per kilogram, which is 1 mg per litre.",
      definition:
        "- \\(\\text{ppm}=\\frac{\\text{mass of solute}}{\\text{mass of solution}}\\times10^{6}\\).\n" +
        "- Dilute aqueous solutions: 1 ppm \\(=1\\) mg kg\\(^{-1}\\approx1\\) mg L\\(^{-1}\\).\n" +
        "- ppm of an element to mass of a compound: mass of the element, to moles, to moles of the compound (one Fe per \\(\\mathrm{FeSO_4\\cdot7H_2O}\\)), to mass.\n" +
        "- A dense solution such as sea water: use its own density to find the mass of 1 L.",
      formula: {
        label: "Parts per million",
        latex: "\\text{ppm}=\\frac{m_{\\text{solute}}}{m_{\\text{solution}}}\\times10^{6}",
      },
      authoredExample: {
        prompt: "Drinking water contains 25 ppm of \\(\\mathrm{Ca^{2+}}\\). How many moles of \\(\\mathrm{Ca^{2+}}\\) are there in 4 L (Ca \\(=40\\))?",
        steps: [
          "25 ppm \\(=25\\) mg L\\(^{-1}\\), so 4 L holds 100 mg \\(=0.1\\) g.",
          "\\(n=\\frac{0.1}{40}=2.5\\times10^{-3}\\) mol.",
        ],
        answer: "\\(2.5\\times10^{-3}\\) mol.",
      },
      selfCheckExample: {
        prompt: "What mass of NaF (42 g mol\\(^{-1}\\)) gives 1 ppm of fluoride in 1000 kg of water (F \\(=19\\))?",
        steps: [
          "1 ppm of 1000 kg is 1 g of fluoride \\(=\\frac{1}{19}=0.0526\\) mol.",
          "One F per NaF, so NaF \\(=0.0526\\times42=2.21\\) g.",
        ],
        answer: "\\(2.21\\) g.",
      },
      practiceSet: [
        { prompt: "5 mg of solute in 1 kg of water. ppm?", answer: "5" },
        { prompt: "\\(0.002\\%\\) by mass in ppm?", answer: "20" },
        { prompt: "mg of solute in 3 L of 10 ppm water?", answer: "30 mg" },
        { prompt: "1 ppm by mass as a fraction?", answer: "\\(10^{-6}\\)" },
      ],
      pyqExampleId: "604aac74-6eb9-4738-80a3-4363e353d0e0", // 4 Apr 2025 — iron salt needed for 12 ppm of iron in wheat
      traps: [
        {
          title: "The element, not the compound",
          body: "A limit in ppm of iron counts iron only. Find the moles of iron first, then the salt, whose molar mass is several times larger.",
        },
      ],
    },
  ],
};
