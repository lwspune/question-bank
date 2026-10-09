import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_PTB_TRANSITION_NOTE: SubtopicNote = {
  subtopicName: "Transition Metals",
  title: "Transition Metals and Their Oxidation States",
  oneLineDefinition:
    "The d-block metals are dense, high-melting and often coloured; they show several oxidation states, which you find by making the oxidation states in a formula add up to its charge.",
  whyItMatters:
    "The 2012 paper asked for the false statement about iron, copper and zinc, testing their oxides, densities, ions, colours and reactivity. Oxidation states of metals also sit behind the formula questions on the first page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ptb-transition-properties",
      name: "Properties of the transition metals",
      intuition:
        "In the d-block the new electrons go into an inner d subshell, so neighbouring metals have very similar outer shells and similar properties. The 4s and 3d electrons are close in energy, so these metals can lose different numbers of them, giving several oxidation states. Partly filled d subshells absorb some visible light, which is why their compounds are coloured.",
      definition:
        "- **Typical metals**: hard, dense (much denser than group 1), high melting points (mercury is the exception), good conductors.\n" +
        "- **Variable oxidation states**: iron +2 and +3, copper +1 and +2, manganese from +2 to +7, chromium +3 and +6. Most form a 2+ ion.\n" +
        "- **Coloured** ions and compounds, when the d subshell is partly filled. Ions with an empty or full d subshell are colourless.\n" +
        "- Good **catalysts**: iron in the Haber process, nickel for adding hydrogen to alkenes, manganese(IV) oxide for decomposing hydrogen peroxide.\n" +
        "- They form **complex ions** with water, ammonia and other ligands.\n" +
        "- Many are only **moderately reactive**: copper, silver and gold do not react with dilute hydrochloric or sulfuric acid.\n" +
        "- Strictly, a transition element forms an ion with a partly filled d subshell, so zinc (\\(\\mathrm{Zn^{2+}}\\): \\(3d^{10}\\)) and scandium (\\(\\mathrm{Sc^{3+}}\\): \\(3d^0\\)) are d-block metals but not transition elements.",
      table: {
        columns: ["Ion", "Electron configuration", "Colour in water"],
        rows: [
          { cells: ["\\(\\mathrm{Cr^{3+}}\\)", "\\([\\mathrm{Ar}]\\,3d^3\\)", "Green"] },
          { cells: ["\\(\\mathrm{Mn^{2+}}\\)", "\\([\\mathrm{Ar}]\\,3d^5\\)", "Very pale pink"] },
          { cells: ["\\(\\mathrm{Fe^{2+}}\\)", "\\([\\mathrm{Ar}]\\,3d^6\\)", "Pale green"] },
          { cells: ["\\(\\mathrm{Fe^{3+}}\\)", "\\([\\mathrm{Ar}]\\,3d^5\\)", "Yellow to orange-brown"] },
          { cells: ["\\(\\mathrm{Cu^{2+}}\\)", "\\([\\mathrm{Ar}]\\,3d^9\\)", "Blue"] },
          { cells: ["\\(\\mathrm{Zn^{2+}}\\)", "\\([\\mathrm{Ar}]\\,3d^{10}\\)", "Colourless"] },
        ],
        caption: "The configurations follow the rule from Atomic Structure: the 4s electrons leave first.",
      },
      selfCheckExample: {
        prompt: "Which of these ions is colourless in water?",
        options: [
          "\\(\\mathrm{Cu^{2+}}\\)",
          "\\(\\mathrm{Fe^{2+}}\\)",
          "\\(\\mathrm{Cr^{3+}}\\)",
          "\\(\\mathrm{Zn^{2+}}\\)",
          "\\(\\mathrm{Fe^{3+}}\\)",
        ],
        steps: [
          "Colour needs a partly filled d subshell. \\(\\mathrm{Zn^{2+}}\\) is \\([\\mathrm{Ar}]\\,3d^{10}\\): full, so colourless.",
          "\\(\\mathrm{Cu^{2+}}\\) (\\(3d^9\\)) is blue, \\(\\mathrm{Fe^{2+}}\\) (\\(3d^6\\)) pale green, \\(\\mathrm{Cr^{3+}}\\) (\\(3d^3\\)) green and \\(\\mathrm{Fe^{3+}}\\) (\\(3d^5\\)) yellow-brown.",
        ],
        answer: "(D) \\(\\mathrm{Zn^{2+}}\\)",
      },
      practiceSet: [
        { prompt: "Which metal catalyses the Haber process?", answer: "Iron" },
        { prompt: "Of copper, zinc and iron, which does not react with dilute hydrochloric acid?", answer: "Copper" },
        { prompt: "Why are zinc compounds usually white?", answer: "\\(\\mathrm{Zn^{2+}}\\) has a full 3d subshell, so it absorbs no visible light" },
      ],
      traps: [
        {
          title: "Not every transition metal is reactive",
          body: "Iron rusts and zinc reacts with dilute acids, but copper does not react with dilute hydrochloric or sulfuric acid at all. Statements that all transition metals are reactive, or that all their ions are coloured, are false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ptb-oxidation-states",
      name: "Finding the oxidation state of a metal in a compound or ion",
      intuition:
        "Oxidation states are bookkeeping charges: you pretend every bond is ionic and give the electrons to the more electronegative atom. Elements with fixed values (oxygen, hydrogen, group 1 and 2 metals) are filled in first, and the metal takes whatever is left so that the total matches the charge on the whole species.",
      definition:
        "Rules, applied in this order:\n" +
        "- An uncombined element is **0**.\n" +
        "- The oxidation states in a formula **add up to its overall charge** (0 for a compound).\n" +
        "- Group 1 metals are **+1**, group 2 metals **+2**, fluorine **−1**.\n" +
        "- Hydrogen is **+1**, except in metal hydrides (**−1**).\n" +
        "- Oxygen is **−2**, except in peroxides such as \\(\\mathrm{H_2O_2}\\) (**−1**).\n" +
        "- If the metal appears more than once, divide its total by the number of its atoms.",
      formula: {
        label: "Sum of oxidation states",
        latex: "\\sum \\text{oxidation states of all atoms} = \\text{overall charge}",
      },
      authoredExample: {
        prompt:
          "Find the oxidation state of manganese in potassium manganate(VII), \\(\\mathrm{KMnO_4}\\), and of iron in \\(\\mathrm{Fe_2O_3}\\).",
        steps: [
          "\\(\\mathrm{KMnO_4}\\): \\(+1 + x + 4(-2) = 0\\), so \\(x = +7\\). The (VII) in the name says the same.",
          "\\(\\mathrm{Fe_2O_3}\\): \\(2x + 3(-2) = 0\\), so \\(2x = +6\\) and \\(x = +3\\).",
        ],
        answer: "Mn is +7; Fe is +3",
      },
      selfCheckExample: {
        prompt: "What is the oxidation state of chromium in potassium dichromate, \\(\\mathrm{K_2Cr_2O_7}\\)?",
        options: ["+3", "+6", "+7", "+12", "+2"],
        steps: [
          "\\(2(+1) + 2x + 7(-2) = 0\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "D forgets to divide by the two chromium atoms. C copies manganese's +7 from permanganate.",
          "A is the oxidation state in the common \\(\\mathrm{Cr^{3+}}\\) ion, not in dichromate.",
        ],
        answer: "(B) +6",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of copper in \\(\\mathrm{Cu_2O}\\)?", answer: "+1", method: "\\(2x - 2 = 0\\)" },
        { prompt: "What is the oxidation state of manganese in \\(\\mathrm{MnO_2}\\)?", answer: "+4", method: "\\(x - 4 = 0\\)" },
        { prompt: "What is the oxidation state of vanadium in the ion \\(\\mathrm{VO_2^{+}}\\)?", answer: "+5", method: "\\(x - 4 = +1\\)" },
        { prompt: "What is the oxidation state of iron in \\(\\mathrm{FeCl_3}\\)?", answer: "+3", method: "Three chlorides at −1" },
      ],
      traps: [
        {
          title: "Share the total between the metal atoms",
          body: "In \\(\\mathrm{K_2Cr_2O_7}\\) the two chromium atoms together carry +12, so each is +6. Answering with the total is a classic distractor whenever the metal appears more than once in the formula.",
        },
      ],
    },
  ],
};
