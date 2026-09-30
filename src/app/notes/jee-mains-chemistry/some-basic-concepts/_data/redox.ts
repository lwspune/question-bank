import type { SubtopicNote } from "@/app/notes/_types";

export const REDOX_SBC_NOTE: SubtopicNote = {
  subtopicName: "Oxidation Number and Redox Reactions",
  title: "Oxidation Number and Redox Reactions",
  oneLineDefinition:
    "Assigning oxidation numbers, naming the type of a redox reaction, and balancing redox equations by the half-reaction method.",
  whyItMatters:
    "Twenty-four PYQs, fourteen of them multiple choice and none yet from 2026. Nine assign oxidation numbers. Eight classify a redox reaction, most often asking whether it is a disproportionation, and seven balance a half-reaction or a whole equation. The electron counts found here are the n-factors the titration page uses next.",
  concepts: [
    // C1 — oxidation numbers
    {
      kind: "formula" as const,
      slug: "jcsbc-oxidation-number",
      name: "Assigning oxidation numbers",
      intuition:
        "An oxidation number is the charge an atom would carry if every bond went wholly to the more electronegative partner. Fix the atoms whose values are set, then solve for the one that is left.",
      definition:
        "- The oxidation numbers in a species add up to its charge.\n" +
        "- F is always \\(-1\\). O is \\(-2\\), but \\(-1\\) in peroxides and \\(+2\\) in \\(\\mathrm{OF_2}\\). H is \\(+1\\), but \\(-1\\) in metal hydrides.\n" +
        "- A neutral ligand adds nothing: Fe in \\(\\mathrm{Fe(CO)_5}\\) is 0.\n" +
        "- Examples: Mn is \\(+7\\) in \\(\\mathrm{KMnO_4}\\), C is \\(+3\\) in \\(\\mathrm{H_2C_2O_4}\\), Mo is \\(+6\\) in \\(\\mathrm{(NH_4)_3[PMo_{12}O_{40}]}\\).\n" +
        "- An atom at its lowest oxidation number (\\(\\mathrm{N^{3-}}\\)) cannot be an oxidising agent; one at its highest cannot be a reducing agent.\n" +
        "- The oxidation state is based on electronegativity, not on electron gain enthalpy.",
      formula: {
        label: "Charge balance",
        latex: "\\sum(\\text{oxidation numbers})=\\text{charge on the species}",
      },
      authoredExample: {
        prompt: "Find the oxidation number of Cr in \\(\\mathrm{K_2Cr_2O_7}\\) and of S in \\(\\mathrm{Na_2S_2O_3}\\).",
        steps: [
          "Cr: \\(2(+1)+2x+7(-2)=0\\), so \\(2x=12\\) and \\(x=+6\\).",
          "S: \\(2(+1)+2x+3(-2)=0\\), so \\(2x=4\\) and \\(x=+2\\) (an average over the two S atoms).",
        ],
        answer: "Cr \\(+6\\); S \\(+2\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of the oxidation numbers of chlorine in \\(\\mathrm{HClO_2}\\) and \\(\\mathrm{HClO_4}\\).",
        steps: [
          "\\(\\mathrm{HClO_2}\\): \\(1+x-4=0\\), so \\(x=+3\\).",
          "\\(\\mathrm{HClO_4}\\): \\(1+x-8=0\\), so \\(x=+7\\).",
        ],
        answer: "\\(+10\\).",
      },
      practiceSet: [
        { prompt: "Mn in \\(\\mathrm{MnO_4^{2-}}\\)?", answer: "\\(+6\\)" },
        { prompt: "C in \\(\\mathrm{H_2C_2O_4}\\)?", answer: "\\(+3\\)" },
        { prompt: "O in \\(\\mathrm{H_2O_2}\\)?", answer: "\\(-1\\)" },
        { prompt: "Ni in \\(\\mathrm{Ni(CO)_4}\\)?", answer: "0" },
      ],
      pyqExampleId: "83a418bc-f171-49a1-b5a9-9fc1103874d0", // 27 Jan 2024 — how many compounds have sulphur at +4
      traps: [
        {
          title: "A fraction is an average",
          body: "S in \\(\\mathrm{S_4O_6^{2-}}\\) works out to \\(+2.5\\). That is an average: two S atoms are \\(+5\\) and two are 0. A fractional answer means unlike atoms, not an error.",
        },
      ],
    },

    // C2 — types of redox reaction
    {
      kind: "reference" as const,
      slug: "jcsbc-redox-types",
      name: "Types of redox reaction",
      intuition:
        "Name the reaction by what happens to the reactants: two combine, one splits, one element pushes another out of a compound, or one element goes both up and down. That last one, disproportionation, needs an element in an in-between oxidation state.",
      definition:
        "- **Combination**: two substances form one.\n" +
        "- **Decomposition**: one substance breaks into two or more.\n" +
        "- **Displacement**: an element replaces another in a compound.\n" +
        "- **Disproportionation**: one element, in one oxidation state, is both oxidised and reduced.\n" +
        "- Cannot disproportionate: \\(\\mathrm{F_2}\\) (fluorine has no positive state), an element at its highest state (\\(\\mathrm{MnO_4^-}\\), \\(\\mathrm{Cr_2O_7^{2-}}\\), \\(\\mathrm{ClO_4^-}\\)) or at its lowest (\\(\\mathrm{K^+}\\), \\(\\mathrm{N^{3-}}\\), Ag).\n" +
        "- Two states meeting in the middle (comproportionation) is not disproportionation. Nor is \\(\\mathrm{2KMnO_4\\rightarrow K_2MnO_4+MnO_2+O_2}\\), where Mn is reduced but O is oxidised.",
      table: {
        columns: ["Reaction", "Type", "Why"],
        rows: [
          { cells: ["\\(\\mathrm{2Mg+O_2\\rightarrow2MgO}\\)", "Combination", "Two reactants, one product"] },
          { cells: ["\\(\\mathrm{2Pb(NO_3)_2\\rightarrow2PbO+4NO_2+O_2}\\)", "Decomposition", "N goes from \\(+5\\) to \\(+4\\); O goes from \\(-2\\) to 0"] },
          { cells: ["\\(\\mathrm{V_2O_5+5Ca\\rightarrow2V+5CaO}\\)", "Metal displacement", "Ca pushes V out of its oxide"] },
          { cells: ["\\(\\mathrm{2Na+2H_2O\\rightarrow2NaOH+H_2}\\)", "Hydrogen displacement", "Na pushes H out of water"] },
          { cells: ["\\(\\mathrm{2H_2O_2\\rightarrow2H_2O+O_2}\\)", "Disproportionation", "O at \\(-1\\) goes to \\(-2\\) and to 0"] },
          { cells: ["\\(\\mathrm{Cl_2+2OH^-\\rightarrow Cl^-+ClO^-+H_2O}\\)", "Disproportionation", "Cl at 0 goes to \\(-1\\) and to \\(+1\\)"] },
          { cells: ["\\(\\mathrm{2MnO_4^-+3Mn^{2+}+2H_2O\\rightarrow5MnO_2+4H^+}\\)", "Comproportionation", "\\(+7\\) and \\(+2\\) meet at \\(+4\\); not a disproportionation"] },
        ],
        caption: "Disproportionation needs one element in one intermediate oxidation state going both up and down.",
      },
      selfCheckExample: {
        prompt: "Which of these can disproportionate: \\(\\mathrm{ClO^-}\\), \\(\\mathrm{ClO_4^-}\\), \\(\\mathrm{Cl^-}\\), \\(\\mathrm{F_2}\\)?",
        steps: [
          "\\(\\mathrm{ClO_4^-}\\) has Cl at \\(+7\\), its highest; \\(\\mathrm{Cl^-}\\) has Cl at \\(-1\\), its lowest.",
          "\\(\\mathrm{F_2}\\) cannot be oxidised above 0. \\(\\mathrm{ClO^-}\\) has Cl at \\(+1\\), with states above and below.",
        ],
        answer: "Only \\(\\mathrm{ClO^-}\\).",
      },
      practiceSet: [
        { prompt: "Type of \\(\\mathrm{2NaH\\rightarrow2Na+H_2}\\)?", answer: "Decomposition" },
        { prompt: "Can \\(\\mathrm{MnO_4^-}\\) disproportionate?", answer: "No; Mn is already at \\(+7\\)" },
        { prompt: "Type of \\(\\mathrm{Cu+2Ag^+\\rightarrow Cu^{2+}+2Ag}\\)?", answer: "Displacement" },
        { prompt: "Type of \\(\\mathrm{2Cu^+\\rightarrow Cu^{2+}+Cu}\\)?", answer: "Disproportionation" },
      ],
      pyqExampleId: "3935949d-bb18-40c2-9e6f-cb921df06dad", // 26 June 2022 — pick the disproportionation reaction
      traps: [
        {
          title: "Burning methane is 'combination' here",
          body: "In the NCERT scheme the paper follows, a fuel burning in oxygen, \\(\\mathrm{CH_4+2O_2\\rightarrow CO_2+2H_2O}\\), is filed as a combination reaction, and it is keyed that way.",
        },
        {
          title: "Two manganese species are not enough",
          body: "A reaction with Mn on both sides is a disproportionation only if all the Mn started in one state. \\(\\mathrm{MnO_4^-}\\) with \\(\\mathrm{Mn^{2+}}\\) starts from two states, so it is not one.",
        },
      ],
    },

    // C3 — balancing
    {
      kind: "formula" as const,
      slug: "jcsbc-balancing",
      name: "Balancing redox equations by half-reactions",
      intuition:
        "Split the reaction into an oxidation and a reduction. In each, balance the main atoms, then O with water, then H with \\(\\mathrm{H^+}\\), then the charge with electrons. Scale the halves so the electrons cancel, and add.",
      definition:
        "- In acid: atoms other than O and H first; O with \\(\\mathrm{H_2O}\\); H with \\(\\mathrm{H^+}\\); charge with \\(e^-\\).\n" +
        "- In base: balance as in acid, then add \\(\\mathrm{OH^-}\\) to both sides to turn every \\(\\mathrm{H^+}\\) into water.\n" +
        "- \\(\\mathrm{MnO_4^-+8H^++5e^-\\rightarrow Mn^{2+}+4H_2O}\\) in acid; \\(\\mathrm{MnO_4^-+2H_2O+3e^-\\rightarrow MnO_2+4OH^-}\\) in neutral or basic solution.\n" +
        "- \\(\\mathrm{Cr_2O_7^{2-}+14H^++6e^-\\rightarrow2Cr^{3+}+7H_2O}\\).\n" +
        "- \\(\\mathrm{C_2O_4^{2-}\\rightarrow2CO_2+2e^-}\\); \\(\\mathrm{Fe^{2+}\\rightarrow Fe^{3+}+e^-}\\).",
      formula: {
        label: "Electron balance",
        latex: "\\text{electrons lost in oxidation}=\\text{electrons gained in reduction}",
      },
      authoredExample: {
        prompt: "Balance \\(\\mathrm{MnO_4^-+Fe^{2+}\\rightarrow Mn^{2+}+Fe^{3+}}\\) in acid.",
        steps: [
          "Reduction: \\(\\mathrm{MnO_4^-+8H^++5e^-\\rightarrow Mn^{2+}+4H_2O}\\).",
          "Oxidation: \\(\\mathrm{Fe^{2+}\\rightarrow Fe^{3+}+e^-}\\), taken 5 times.",
          "Add: \\(\\mathrm{MnO_4^-+5Fe^{2+}+8H^+\\rightarrow Mn^{2+}+5Fe^{3+}+4H_2O}\\). Charge: \\(-1+10+8=17\\) on the left, \\(2+15=17\\) on the right.",
        ],
        answer: "\\(\\mathrm{MnO_4^-+5Fe^{2+}+8H^+\\rightarrow Mn^{2+}+5Fe^{3+}+4H_2O}\\)",
      },
      selfCheckExample: {
        prompt: "Balance the disproportionation of \\(\\mathrm{Cl_2}\\) into \\(\\mathrm{Cl^-}\\) and \\(\\mathrm{ClO_3^-}\\) in base.",
        steps: [
          "Reduction: \\(\\mathrm{Cl_2+2e^-\\rightarrow2Cl^-}\\), taken 5 times.",
          "Oxidation: \\(\\mathrm{Cl_2+12OH^-\\rightarrow2ClO_3^-+6H_2O+10e^-}\\).",
          "Add and halve: \\(\\mathrm{3Cl_2+6OH^-\\rightarrow5Cl^-+ClO_3^-+3H_2O}\\). Charge: \\(-6\\) on each side.",
        ],
        answer: "\\(\\mathrm{3Cl_2+6OH^-\\rightarrow5Cl^-+ClO_3^-+3H_2O}\\)",
      },
      practiceSet: [
        { prompt: "Electrons in \\(\\mathrm{MnO_4^-\\rightarrow Mn^{2+}}\\)?", answer: "5" },
        { prompt: "Electrons in \\(\\mathrm{MnO_4^-\\rightarrow MnO_2}\\)?", answer: "3" },
        { prompt: "Electrons lost per \\(\\mathrm{C_2O_4^{2-}\\rightarrow2CO_2}\\)?", answer: "2" },
        { prompt: "Moles of \\(\\mathrm{Fe^{2+}}\\) oxidised by 1 mol of \\(\\mathrm{MnO_4^-}\\) in acid?", answer: "5" },
      ],
      pyqExampleId: "18210c77-5df8-4474-9647-76ab8e5014f2", // 13 Apr 2023 — sum of coefficients in the dichromate–iron(II) equation
      traps: [
        {
          title: "The medium sets the product",
          body: "Permanganate takes 5 electrons in acid (to \\(\\mathrm{Mn^{2+}}\\)) but 3 in neutral or basic solution (to \\(\\mathrm{MnO_2}\\)). Read the medium before counting.",
        },
        {
          title: "Check the charge, not just the atoms",
          body: "An equation can balance every atom and still be wrong. Add the charges on each side; they must match.",
        },
      ],
    },
  ],
};
