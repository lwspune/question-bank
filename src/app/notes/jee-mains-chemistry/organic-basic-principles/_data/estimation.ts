import type { SubtopicNote } from "@/app/notes/_types";

export const ESTIMATION_GOC_NOTE: SubtopicNote = {
  subtopicName: "Estimation of Carbon, Hydrogen, Halogens, Sulphur and Phosphorus",
  title: "Estimation of Carbon, Hydrogen, Halogens, Sulphur and Phosphorus",
  oneLineDefinition:
    "Each element is turned into a product that can be weighed (CO₂, water, a silver halide, barium sulphate or magnesium pyrophosphate), and its percentage is the element's mass fraction in that product times the product's mass over the sample's mass.",
  whyItMatters:
    "Thirty-three PYQs, twenty-four of them asking for a number, and eleven from 2026, the most of any page in this chapter. Eleven are combustion analysis: carbon from CO₂, hydrogen from water, and oxygen by difference. Eleven are Carius estimations of chlorine, bromine or iodine as a silver halide. Eleven estimate sulphur as barium sulphate or phosphorus as magnesium pyrophosphate, or ask what the Carius tube is used for.",
  concepts: [
    // C1 — combustion analysis
    {
      kind: "formula" as const,
      slug: "jcgoc-combustion",
      name: "Combustion analysis for carbon, hydrogen and oxygen",
      intuition:
        "Burn a weighed sample completely over copper(II) oxide. All its carbon becomes CO₂ and all its hydrogen becomes water. Two absorption tubes catch these, and each tube's gain in mass is the mass of the product it caught.",
      definition:
        "- Water is caught first, in a U-tube of anhydrous \\(\\mathrm{CaCl_2}\\); \\(\\mathrm{CO_2}\\) next, in a U-tube of concentrated KOH (the potash tube).\n" +
        "- Carbon is 12/44 of the mass of \\(\\mathrm{CO_2}\\); hydrogen is 2/18 of the mass of water.\n" +
        "- Oxygen is found by difference: %O = 100 − (the sum of all the other percentages).\n" +
        "- Empirical formula: divide each percentage by the atomic mass, then divide by the smallest result and round to whole numbers.\n" +
        "- Many numerical questions ask for the answer as '× 10⁻¹' or '× 10⁻³ g': read the scale before you round.",
      formula: {
        label: "Percentages of carbon and hydrogen",
        latex:
          "\\%\\,\\mathrm{C} = \\dfrac{12}{44} \\times \\dfrac{m_{\\mathrm{CO_2}}}{m} \\times 100 \\qquad \\%\\,\\mathrm{H} = \\dfrac{2}{18} \\times \\dfrac{m_{\\mathrm{H_2O}}}{m} \\times 100",
      },
      authoredExample: {
        prompt:
          "0.30 g of a compound of carbon, hydrogen and oxygen gives 0.66 g of \\(\\mathrm{CO_2}\\) and 0.27 g of water on complete combustion. Find the percentages of C, H and O.",
        steps: [
          "\\(\\%\\,\\mathrm{C} = \\dfrac{12}{44} \\times \\dfrac{0.66}{0.30} \\times 100 = 60.0\\%\\).",
          "\\(\\%\\,\\mathrm{H} = \\dfrac{2}{18} \\times \\dfrac{0.27}{0.30} \\times 100 = 10.0\\%\\).",
          "\\(\\%\\,\\mathrm{O} = 100 - 60.0 - 10.0 = 30.0\\%\\).",
        ],
        answer: "C 60.0%, H 10.0%, O 30.0%.",
      },
      selfCheckExample: {
        prompt: "A compound of carbon, hydrogen and oxygen contains 40.0% C and 6.7% H. Find its empirical formula.",
        steps: [
          "%O \\(= 100 - 40.0 - 6.7 = 53.3\\%\\).",
          "Moles in 100 g: C \\(= 40.0/12 = 3.33\\); H \\(= 6.7/1 = 6.7\\); O \\(= 53.3/16 = 3.33\\).",
          "Divide by 3.33: C : H : O \\(= 1 : 2 : 1\\).",
        ],
        answer: "\\(\\mathrm{CH_2O}\\).",
      },
      practiceSet: [
        { prompt: "Which tube absorbs the water in combustion analysis?", answer: "The anhydrous \\(\\mathrm{CaCl_2}\\) tube" },
        { prompt: "What mass of carbon is contained in 0.44 g of \\(\\mathrm{CO_2}\\)?", answer: "0.12 g" },
        { prompt: "What mass of hydrogen is contained in 0.36 g of water?", answer: "0.04 g" },
        { prompt: "How is the percentage of oxygen found?", answer: "By difference, from 100" },
      ],
      pyqExampleId: "b76b6c4a-cc71-4ea2-b3fa-88132a9e5b87", // 2026 — % oxygen by difference from the CaCl2 and potash tubes
      traps: [
        {
          title: "Hydrogen is 2/18 of water, not 1/18",
          body: "Each water molecule carries two hydrogen atoms. Using 1/18 halves the percentage of hydrogen and then throws off the oxygen found by difference.",
        },
        {
          title: "Oxygen is never weighed directly",
          body: "Combustion analysis gives only C and H. Oxygen comes from 100 minus everything else, so an error in carbon or hydrogen carries straight into it.",
        },
        {
          title: "Match the tube to the gas",
          body: "The \\(\\mathrm{CaCl_2}\\) tube gains the mass of water and the potash (KOH) tube the mass of \\(\\mathrm{CO_2}\\). Swapping them swaps the two fractions, 12/44 and 2/18.",
        },
      ],
    },

    // C2 — Carius method for halogens
    {
      kind: "formula" as const,
      slug: "jcgoc-carius-halogen",
      name: "Carius method for halogens",
      intuition:
        "Heat the compound with fuming nitric acid and silver nitrate in a sealed tube. Carbon and hydrogen are oxidised away, and every halogen atom ends up in a silver halide precipitate, which is filtered, dried and weighed.",
      definition:
        "- A known mass of the compound is heated with fuming \\(\\mathrm{HNO_3}\\) and \\(\\mathrm{AgNO_3}\\) in a sealed hard-glass tube, the Carius tube.\n" +
        "- The halogen is weighed as AgCl (143.5), AgBr (188) or AgI (235), with Cl = 35.5, Br = 80 and I = 127.\n" +
        "- Which halogen it is can be settled first by Lassaigne's test.\n" +
        "- Combined with a known percentage of carbon, the halogen percentage gives the empirical formula.",
      formula: {
        label: "Percentage of halogen (Carius)",
        latex:
          "\\%\\,\\mathrm{X} = \\dfrac{\\text{atomic mass of X}}{\\text{molar mass of AgX}} \\times \\dfrac{m_{\\mathrm{AgX}}}{m} \\times 100",
      },
      authoredExample: {
        prompt:
          "In a Carius estimation, 0.20 g of an organic compound gives 0.287 g of AgCl. Find the percentage of chlorine (AgCl = 143.5 g mol⁻¹, Cl = 35.5 g mol⁻¹).",
        steps: [
          "Moles of AgCl \\(= 0.287/143.5 = 0.00200\\), and each AgCl carries one Cl.",
          "Mass of Cl \\(= 0.00200 \\times 35.5 = 0.0710\\) g.",
          "\\(\\%\\,\\mathrm{Cl} = 0.0710/0.20 \\times 100 = 35.5\\%\\).",
        ],
        answer: "35.5% chlorine.",
      },
      selfCheckExample: {
        prompt:
          "In a Carius estimation, 0.50 g of an organic compound gives 0.564 g of AgBr. Find the percentage of bromine (AgBr = 188 g mol⁻¹, Br = 80 g mol⁻¹).",
        steps: [
          "Moles of AgBr \\(= 0.564/188 = 0.00300\\).",
          "Mass of Br \\(= 0.00300 \\times 80 = 0.240\\) g.",
          "\\(\\%\\,\\mathrm{Br} = 0.240/0.50 \\times 100\\).",
        ],
        answer: "48.0% bromine.",
      },
      practiceSet: [
        { prompt: "What is heated with the compound and fuming \\(\\mathrm{HNO_3}\\) in the Carius method for halogens?", answer: "\\(\\mathrm{AgNO_3}\\)" },
        { prompt: "What fraction of the mass of AgBr is bromine?", answer: "80/188" },
        { prompt: "Which silver halide is yellow and insoluble in ammonia?", answer: "AgI" },
        { prompt: "Is the Carius method used to estimate nitrogen?", answer: "No" },
      ],
      pyqExampleId: "e329dcbd-1353-48a8-946a-9cff73cd0b12", // 2026 — Carius % chlorine from AgCl
      traps: [
        {
          title: "Divide by the silver halide's molar mass",
          body: "The fraction is the halogen's atomic mass over the molar mass of the WHOLE precipitate: 35.5/143.5 for AgCl, not 35.5/108.",
        },
        {
          title: "Keep the three silver halides apart",
          body: "AgCl is 143.5, AgBr 188 and AgI 235 g mol⁻¹. Pairing bromine with 143.5 is the commonest slip, and it gives an answer that is often among the options.",
        },
        {
          title: "Carius does not estimate nitrogen",
          body: "The Carius tube is used for halogens, sulphur and phosphorus. Nitrogen is estimated by Dumas' or Kjeldahl's method.",
        },
      ],
    },

    // C3 — sulphur and phosphorus
    {
      kind: "formula" as const,
      slug: "jcgoc-carius-sp",
      name: "Estimation of sulphur and phosphorus",
      intuition:
        "The route is the same as for halogens: oxidise the compound in a sealed tube and trap the element in a precipitate that can be weighed. Sulphur becomes sulphuric acid and is weighed as barium sulphate; phosphorus becomes phosphoric acid and is weighed as magnesium pyrophosphate or ammonium phosphomolybdate.",
      definition:
        "- **Sulphur**: heat with fuming \\(\\mathrm{HNO_3}\\) (or sodium peroxide) in a Carius tube to give \\(\\mathrm{H_2SO_4}\\); add \\(\\mathrm{BaCl_2}\\) to precipitate \\(\\mathrm{BaSO_4}\\) (233 g mol⁻¹). Each \\(\\mathrm{BaSO_4}\\) carries one S.\n" +
        "- **Phosphorus**: heat with fuming \\(\\mathrm{HNO_3}\\) to give \\(\\mathrm{H_3PO_4}\\). Precipitate it as ammonium phosphomolybdate, \\(\\mathrm{(NH_4)_3PO_4 \\cdot 12MoO_3}\\), or as \\(\\mathrm{MgNH_4PO_4}\\), which gives \\(\\mathrm{Mg_2P_2O_7}\\) (222 g mol⁻¹) on ignition. Each \\(\\mathrm{Mg_2P_2O_7}\\) carries TWO P, so the fraction is 62/222.\n" +
        "- Methionine and cysteine are the amino acids that contain sulphur.\n" +
        "- When a question gives its own molar mass for the precipitate, use it.",
      formula: {
        label: "Percentages of sulphur and phosphorus",
        latex:
          "\\%\\,\\mathrm{S} = \\dfrac{32}{233} \\times \\dfrac{m_{\\mathrm{BaSO_4}}}{m} \\times 100 \\qquad \\%\\,\\mathrm{P} = \\dfrac{62}{222} \\times \\dfrac{m_{\\mathrm{Mg_2P_2O_7}}}{m} \\times 100",
      },
      authoredExample: {
        prompt:
          "In a Carius estimation, 0.40 g of an organic compound gives 0.466 g of \\(\\mathrm{BaSO_4}\\). Find the percentage of sulphur (\\(\\mathrm{BaSO_4}\\) = 233 g mol⁻¹, S = 32 g mol⁻¹).",
        steps: [
          "Moles of \\(\\mathrm{BaSO_4}\\) \\(= 0.466/233 = 0.00200\\) = moles of S.",
          "Mass of S \\(= 0.00200 \\times 32 = 0.064\\) g.",
          "\\(\\%\\,\\mathrm{S} = 0.064/0.40 \\times 100 = 16.0\\%\\).",
        ],
        answer: "16.0% sulphur.",
      },
      selfCheckExample: {
        prompt:
          "0.50 g of an organic compound gives 0.444 g of \\(\\mathrm{Mg_2P_2O_7}\\). Find the percentage of phosphorus (\\(\\mathrm{Mg_2P_2O_7}\\) = 222 g mol⁻¹, P = 31 g mol⁻¹).",
        steps: [
          "Moles of \\(\\mathrm{Mg_2P_2O_7}\\) \\(= 0.444/222 = 0.00200\\).",
          "Each unit carries two P, so moles of P \\(= 0.00400\\) and mass of P \\(= 0.00400 \\times 31 = 0.124\\) g.",
          "\\(\\%\\,\\mathrm{P} = 0.124/0.50 \\times 100\\).",
        ],
        answer: "24.8% phosphorus.",
      },
      practiceSet: [
        { prompt: "In what form is sulphur weighed in the Carius method?", answer: "Barium sulphate, \\(\\mathrm{BaSO_4}\\)" },
        { prompt: "How many phosphorus atoms does one \\(\\mathrm{Mg_2P_2O_7}\\) unit contain?", answer: "2" },
        { prompt: "Which amino acid contains sulphur, glycine or methionine?", answer: "Methionine" },
        { prompt: "What mass of sulphur is contained in 2.33 g of \\(\\mathrm{BaSO_4}\\)?", answer: "0.32 g" },
      ],
      pyqExampleId: "0abbff92-4e71-4b0f-afec-b016593e6452", // 2026 — Carius % sulphur from BaSO4
      traps: [
        {
          title: "Two phosphorus atoms per pyrophosphate",
          body: "\\(\\mathrm{Mg_2P_2O_7}\\) holds two P atoms, so phosphorus is 62/222 of its mass. Using 31/222 halves the answer.",
        },
        {
          title: "Use the molar mass the question gives",
          body: "Some papers print an unusual molar mass for \\(\\mathrm{BaSO_4}\\) or for the pyrophosphate. The key is worked with the printed value, so use it even if it differs from 233 or 222.",
        },
        {
          title: "Sulphur is weighed as a barium salt",
          body: "Silver nitrate traps halogens; barium chloride traps sulphate. A question that adds \\(\\mathrm{BaCl_2}\\) is estimating sulphur, and the precipitate is \\(\\mathrm{BaSO_4}\\).",
        },
      ],
    },
  ],
};
