import type { SubtopicNote } from "@/app/notes/_types";

export const FORMULA_SBC_NOTE: SubtopicNote = {
  subtopicName: "Percentage Composition and Empirical Formula",
  title: "Percentage Composition and Empirical Formula",
  oneLineDefinition:
    "The mass percentage of an element from a formula, and the reverse: percentages or combustion data to the empirical and molecular formula.",
  whyItMatters:
    "Twenty PYQs, eleven of them multiple choice and three from 2026. Six ask for a mass percentage, or for a molar mass worked back from one. Ten go from percentages to the empirical and molecular formula, and four burn a hydrocarbon and read its formula off the gas volumes. One routine, masses to moles to a ratio, covers all three.",
  concepts: [
    // C1 — mass percentage
    {
      kind: "formula" as const,
      slug: "jcsbc-mass-percent",
      name: "Mass percentage of an element",
      intuition:
        "A formula fixes how much of each element is in one mole. Divide that element's share by the molar mass. Run it backwards and a mass percentage plus a number of moles gives a molar mass.",
      definition:
        "- \\(\\%X=\\frac{(\\text{atoms of }X)\\times A_X}{M}\\times100\\).\n" +
        "- Combustion: the carbon is \\(\\frac{12}{44}\\) of the mass of \\(\\mathrm{CO_2}\\); the hydrogen is \\(\\frac{2}{18}\\) of the mass of \\(\\mathrm{H_2O}\\); oxygen is found by difference.\n" +
        "- Backwards: moles of the element \\(\\times\\) its atomic mass gives its mass in the sample. Divide by its mass fraction for the sample's mass, then by the sample's moles for \\(M\\).",
      formula: {
        label: "Mass percentage",
        latex: "\\%X=\\frac{n_X\\,A_X}{M}\\times100",
      },
      authoredExample: {
        prompt: "Find the percentage of nitrogen in urea, \\(\\mathrm{CO(NH_2)_2}\\).",
        steps: [
          "\\(M=12+16+2(14)+4(1)=60\\) g mol\\(^{-1}\\).",
          "Two N atoms: \\(\\%\\mathrm{N}=\\frac{28}{60}\\times100=46.7\\%\\).",
        ],
        answer: "\\(46.7\\%\\).",
      },
      selfCheckExample: {
        prompt: "\\(0.02\\) mol of a compound containing \\(40\\%\\) carbon burns completely to give \\(2.64\\) g of \\(\\mathrm{CO_2}\\). Find its molar mass.",
        steps: [
          "\\(\\frac{2.64}{44}=0.06\\) mol of C, which is \\(0.72\\) g.",
          "Carbon is \\(40\\%\\) of the sample, so the sample weighs \\(\\frac{0.72}{0.40}=1.8\\) g.",
          "\\(M=\\frac{1.8}{0.02}=90\\) g mol\\(^{-1}\\).",
        ],
        answer: "\\(90\\) g mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Percentage of O in \\(\\mathrm{H_2O}\\)?", answer: "\\(88.9\\%\\)" },
        { prompt: "Percentage of C in \\(\\mathrm{CH_4}\\)?", answer: "\\(75\\%\\)" },
        { prompt: "Mass of C in 22 g of \\(\\mathrm{CO_2}\\)?", answer: "6 g" },
        { prompt: "Mass of H in 9 g of \\(\\mathrm{H_2O}\\)?", answer: "1 g" },
      ],
      pyqExampleId: "59d52175-a3d6-4946-a92d-a0a69b33c849", // 29 Jan 2023 — molar mass from % carbon and the CO2 formed
      traps: [
        {
          title: "Carbon is 12/44 of CO₂",
          body: "Convert the \\(\\mathrm{CO_2}\\) to moles of carbon before anything else. Dividing by the compound's molar mass, or using \\(\\frac{12}{28}\\), is the usual slip.",
        },
      ],
    },

    // C2 — empirical and molecular formula
    {
      kind: "formula" as const,
      slug: "jcsbc-empirical",
      name: "Empirical and molecular formula",
      intuition:
        "Percentages are the masses in 100 g. Turn them into moles, find the simplest whole-number ratio, then scale up by the molar mass.",
      definition:
        "- Take 100 g, so grams equal percentages. If they add to less than 100, the rest is usually oxygen.\n" +
        "- Divide each by its atomic mass, then divide all by the smallest.\n" +
        "- Clear fractions: 1.5 means \\(\\times2\\), 1.33 means \\(\\times3\\), 1.25 means \\(\\times4\\).\n" +
        "- \\(\\text{MF}=k\\times\\text{EF}\\), where \\(k=\\frac{M}{\\text{EF mass}}\\).\n" +
        "- Molar mass from a vapour at STP: \\(M=\\frac{m}{V/22.4}\\) with \\(V\\) in litres.\n" +
        "- Degree of unsaturation of \\(\\mathrm{C}_x\\mathrm{H}_y\\): \\(\\frac{2x+2-y}{2}\\).",
      formula: {
        label: "Molecular formula",
        latex: "\\text{MF}=\\left(\\frac{M}{\\text{EF mass}}\\right)\\times\\text{EF}",
      },
      authoredExample: {
        prompt: "A compound is \\(40.0\\%\\) C and \\(6.7\\%\\) H, and the rest is O. Its molar mass is \\(180\\) g mol\\(^{-1}\\). Find its molecular formula.",
        steps: [
          "O \\(=100-40.0-6.7=53.3\\%\\).",
          "Moles: C \\(\\frac{40.0}{12}=3.33\\), H \\(\\frac{6.7}{1}=6.7\\), O \\(\\frac{53.3}{16}=3.33\\).",
          "Divide by 3.33: \\(1:2:1\\), so the EF is \\(\\mathrm{CH_2O}\\), mass 30.",
          "\\(k=\\frac{180}{30}=6\\), so the MF is \\(\\mathrm{C_6H_{12}O_6}\\).",
        ],
        answer: "\\(\\mathrm{C_6H_{12}O_6}\\).",
      },
      selfCheckExample: {
        prompt: "An oxide of chromium is \\(68.4\\%\\) Cr (Cr \\(=52\\), O \\(=16\\)). Find its empirical formula.",
        steps: [
          "Cr: \\(\\frac{68.4}{52}=1.315\\); O: \\(\\frac{31.6}{16}=1.975\\).",
          "\\(\\frac{1.975}{1.315}=1.50\\), so Cr : O \\(=1:1.5=2:3\\).",
        ],
        answer: "\\(\\mathrm{Cr_2O_3}\\).",
      },
      practiceSet: [
        { prompt: "C : H \\(=1:1.5\\). Empirical formula?", answer: "\\(\\mathrm{C_2H_3}\\)" },
        { prompt: "EF \\(\\mathrm{CH_2}\\), \\(M=56\\). Molecular formula?", answer: "\\(\\mathrm{C_4H_8}\\)" },
        { prompt: "Degree of unsaturation of \\(\\mathrm{C_6H_6}\\)?", answer: "4" },
        { prompt: "\\(0.25\\) g of vapour fills 56 mL at STP. Molar mass?", answer: "\\(100\\) g mol\\(^{-1}\\)" },
      ],
      pyqExampleId: "d2b951de-e62b-40c2-be41-1f4d1c696b71", // 6 Apr 2026 S1 — empirical formula of an iron oxide
      traps: [
        {
          title: "Rounding 1.5 away",
          body: "A ratio of \\(1:1.5\\) is \\(2:3\\), not \\(1:2\\) or \\(1:1\\). Round only when the value is within about 0.05 of a whole number; otherwise multiply through.",
        },
        {
          title: "Empirical mass offered as the molar mass",
          body: "Options often list the EF mass beside the MF mass. Check whether the question asks for the empirical or the molecular formula.",
        },
      ],
    },

    // C3 — combustion volumes
    {
      kind: "formula" as const,
      slug: "jcsbc-combustion-formula",
      name: "Formula from combustion volumes",
      intuition:
        "For gases at one temperature and pressure, volumes are in the ratio of moles. Burn the hydrocarbon, find how much \\(\\mathrm{CO_2}\\) formed and how much \\(\\mathrm{O_2}\\) was used, and \\(x\\) and \\(y\\) follow.",
      definition:
        "- \\(\\mathrm{C}_x\\mathrm{H}_y+\\left(x+\\frac{y}{4}\\right)\\mathrm{O_2}\\rightarrow x\\,\\mathrm{CO_2}+\\frac{y}{2}\\,\\mathrm{H_2O}\\).\n" +
        "- Cooling condenses the water. KOH absorbs \\(\\mathrm{CO_2}\\). What remains is unused \\(\\mathrm{O_2}\\).\n" +
        "- \\(x=\\frac{V(\\mathrm{CO_2})}{V(\\text{hydrocarbon})}\\).\n" +
        "- If water is still a vapour, \\(\\frac{y}{2}=\\frac{V(\\mathrm{H_2O})}{V(\\text{hydrocarbon})}\\). Otherwise use \\(x+\\frac{y}{4}=\\frac{V(\\mathrm{O_2}\\text{ used})}{V(\\text{hydrocarbon})}\\).\n" +
        "- 'Equivalents' of oxygen or water in a stem mean moles per mole of fuel.",
      formula: {
        label: "Combustion of a hydrocarbon",
        latex: "\\mathrm{C}_x\\mathrm{H}_y+\\left(x+\\tfrac{y}{4}\\right)\\mathrm{O_2}\\rightarrow x\\,\\mathrm{CO_2}+\\tfrac{y}{2}\\,\\mathrm{H_2O}",
      },
      authoredExample: {
        prompt: "20 mL of a gaseous hydrocarbon burns in 150 mL of \\(\\mathrm{O_2}\\). After cooling, the gas occupies 110 mL. KOH reduces it to 50 mL. Find the formula.",
        steps: [
          "\\(\\mathrm{CO_2}=110-50=60\\) mL, so \\(x=\\frac{60}{20}=3\\).",
          "\\(\\mathrm{O_2}\\) left is 50 mL, so 100 mL was used: \\(x+\\frac{y}{4}=\\frac{100}{20}=5\\).",
          "\\(\\frac{y}{4}=2\\), so \\(y=8\\).",
        ],
        answer: "\\(\\mathrm{C_3H_8}\\).",
      },
      selfCheckExample: {
        prompt: "15 mL of a gaseous hydrocarbon burns to give 45 mL of \\(\\mathrm{CO_2}\\) and 45 mL of water vapour. Find the formula.",
        steps: [
          "\\(x=\\frac{45}{15}=3\\).",
          "\\(\\frac{y}{2}=\\frac{45}{15}=3\\), so \\(y=6\\).",
        ],
        answer: "\\(\\mathrm{C_3H_6}\\).",
      },
      practiceSet: [
        { prompt: "Which gas does KOH absorb?", answer: "\\(\\mathrm{CO_2}\\)" },
        { prompt: "Moles of \\(\\mathrm{O_2}\\) to burn 1 mol of \\(\\mathrm{C_2H_6}\\)?", answer: "\\(3.5\\)" },
        { prompt: "1 volume of hydrocarbon gives 2 volumes of \\(\\mathrm{CO_2}\\). Carbons per molecule?", answer: "2" },
        { prompt: "A fuel needs \\(6.5\\) mol \\(\\mathrm{O_2}\\) and gives 5 mol \\(\\mathrm{H_2O}\\) per mole. Formula?", answer: "\\(\\mathrm{C_4H_{10}}\\)" },
      ],
      pyqExampleId: "313eac23-0f2a-4118-8f33-db4fbc17b2be", // 21 Jan 2026 S1 — eudiometry with KOH absorption
      traps: [
        {
          title: "The water is gone after cooling",
          body: "Once the gas is cooled, the water is liquid and drops out of the volume. Only \\(\\mathrm{CO_2}\\) and leftover \\(\\mathrm{O_2}\\) remain, so find \\(y\\) from the oxygen used, not from the residue.",
        },
      ],
    },
  ],
};
