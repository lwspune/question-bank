import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_MAYER_NOTE: SubtopicNote = {
  subtopicName: "Specific Heat Capacity and Mayer's Relation",
  title: "Specific Heats of Gases, Solids and Water",
  oneLineDefinition:
    "Mayer's relation, Cp = Cv + R for one mole of an ideal gas, and its proof, finding the two specific heats from their difference and ratio, and the specific heats of a monatomic gas, a solid and water.",
  whyItMatters:
    "6 questions. Four were set in board papers: the molar specific heat of water (2019), both specific heats from their difference and ratio (2022), the proof of Mayer's relation (2024), and Cv of a monatomic gas with the kinetic energy of a gas at S.T.P. (2024). The textbook adds finding J from the two principal specific heats of hydrogen, and the same difference and ratio sum.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpkt-mayer-relation",
      name: "Mayer's relation",
      intuition:
        "Heat a gas in a closed rigid box and every joule goes into its internal energy. Heat it with a free piston and the gas also pushes the piston out, which costs extra energy. So the gas needs more heat for the same temperature rise at constant pressure. For one mole of an ideal gas that extra is exactly R per kelvin.",
      definition:
        "**Proof (one mole of an ideal gas):**\n" +
        "- At constant volume: no work is done, so the heat supplied raises the internal energy: \\(dQ = C_V\\,dT = dE\\).\n" +
        "- At constant pressure: \\(dQ = C_P\\,dT = dE + P\\,dV\\) (first law of thermodynamics).\n" +
        "- The internal energy of an ideal gas depends only on its temperature, so dE is the same for the same dT: \\(C_P\\,dT = C_V\\,dT + P\\,dV\\).\n" +
        "- For one mole \\(PV = RT\\); at constant pressure \\(P\\,dV = R\\,dT\\).\n" +
        "- So \\(C_P\\,dT = C_V\\,dT + R\\,dT\\), giving \\(C_P - C_V = R\\).\n" +
        "- If the specific heats are in heat units (calories), \\(C_P - C_V = \\dfrac{R}{J}\\), J being the mechanical equivalent of heat.\n" +
        "- For principal (per unit mass) specific heats: \\(S_P - S_V = \\dfrac{R}{M_0 J}\\).",
      formula: {
        label: "Mayer's relation",
        latex: "C_P - C_V = R, \\qquad C_P - C_V = \\frac{R}{J}, \\qquad S_P - S_V = \\frac{R}{M_0 J}",
        symbols: [
          { symbol: "\\(J\\)", meaning: "mechanical equivalent of heat, about 4.18 J/cal" },
          { symbol: "\\(S_P, S_V\\)", meaning: "principal specific heats, per unit mass" },
        ],
      },
      authoredExample: {
        prompt: "Find the difference between the two principal specific heats of oxygen in J kg⁻¹ K⁻¹. (Molar mass 32 g/mol, R = 8.31 J mol⁻¹ K⁻¹)",
        steps: [
          "Given: \\(M_0 = 32\\) g/mol \\(= 0.032\\) kg/mol, \\(R = 8.31\\) J mol⁻¹ K⁻¹. In joules, no J factor is needed.",
          "Formula: \\(S_P - S_V = \\dfrac{R}{M_0}\\).",
          "Substitution: \\(S_P - S_V = \\dfrac{8.31}{0.032}\\).",
          "\\(S_P - S_V = 259.7\\) J kg⁻¹ K⁻¹.",
        ],
        answer: "About 260 J kg⁻¹ K⁻¹",
      },
      selfCheckExample: {
        prompt: "Why is the molar specific heat of a gas at constant pressure greater than at constant volume?",
        steps: [
          "At constant volume all the heat raises the internal energy.",
          "At constant pressure the gas also expands and does work \\(P\\,dV\\), which needs extra heat.",
        ],
        answer: "At constant pressure part of the heat is used for the work of expansion",
      },
      practiceSet: [
        { prompt: "What is \\(C_P - C_V\\) for one mole of any ideal gas? (R = 8.31 J mol⁻¹ K⁻¹)", answer: "8.31 J mol⁻¹ K⁻¹" },
        { prompt: "Write Mayer's relation when the specific heats are in calories.", answer: "\\(C_P - C_V = R/J\\)" },
        { prompt: "For one mole of an ideal gas at constant pressure, what is \\(P\\,dV\\) equal to?", answer: "\\(R\\,dT\\)" },
      ],
      pyqExampleId: "38a96b2a-0827-4889-a407-89d7e25f20c0",
      traps: [
        {
          title: "Forgetting why dE is the same",
          body: "The step \\(C_P\\,dT = C_V\\,dT + P\\,dV\\) uses the fact that the internal energy of an ideal gas depends only on temperature. Say so in the proof; it is the key line.",
        },
        {
          title: "Leaving out J",
          body: "When the specific heats are given in cal and R in joules, divide R by J. Without it the units do not match.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-cp-cv-values",
      name: "Finding Cp and Cv, and Cv of a monatomic gas",
      intuition:
        "Two numbers tie the specific heats together: their difference and their ratio γ. Know both and you can find each one. For a monatomic gas you do not even need data: equipartition gives its energy, and the energy gives its specific heat.",
      definition:
        "- With \\(C_P - C_V\\) and \\(\\gamma = \\dfrac{C_P}{C_V}\\) known: put \\(C_P = \\gamma C_V\\) in the difference, so \\(C_V = \\dfrac{C_P - C_V}{\\gamma - 1}\\), then \\(C_P = \\gamma C_V\\).\n" +
        "- **Cv of a monatomic gas:** a molecule has 3 translational degrees of freedom, so its average energy is \\(\\dfrac{3}{2}k_BT\\). For one mole, \\(E = N_A \\times \\dfrac{3}{2}k_BT = \\dfrac{3}{2}RT\\).\n" +
        "- At constant volume \\(C_V = \\dfrac{dE}{dT} = \\dfrac{3}{2}R\\); then \\(C_P = \\dfrac{5}{2}R\\) and \\(\\gamma = \\dfrac{5}{3}\\).\n" +
        "- \\(C_P\\) is always the larger, so γ is always greater than 1.",
      formula: {
        label: "Cv from the difference and the ratio",
        latex: "C_V = \\frac{C_P - C_V}{\\gamma - 1}, \\qquad C_P = \\gamma\\,C_V",
      },
      authoredExample: {
        prompt: "Deduce the molar specific heat of a monatomic gas at constant volume, and find its value, \\(C_P\\) and γ. (R = 8.31 J mol⁻¹ K⁻¹)",
        steps: [
          "A monatomic molecule has 3 degrees of freedom; average energy \\(\\dfrac{3}{2}k_BT\\).",
          "For one mole: \\(E = \\dfrac{3}{2}N_Ak_BT = \\dfrac{3}{2}RT\\).",
          "\\(C_V = \\dfrac{dE}{dT} = \\dfrac{3}{2}R = 1.5 \\times 8.31 = 12.5\\) J mol⁻¹ K⁻¹.",
          "\\(C_P = C_V + R = \\dfrac{5}{2}R = 20.8\\) J mol⁻¹ K⁻¹; \\(\\gamma = \\dfrac{5}{3} = 1.67\\).",
        ],
        answer: "Cv = (3/2)R = 12.5 J mol⁻¹ K⁻¹, Cp = 20.8 J mol⁻¹ K⁻¹, γ = 1.67",
      },
      selfCheckExample: {
        prompt: "A gas has Cp = 29.1 J mol⁻¹ K⁻¹ and Cv = 20.8 J mol⁻¹ K⁻¹. Find γ and say whether the gas is monatomic or diatomic.",
        steps: ["\\(\\gamma = \\dfrac{29.1}{20.8} = 1.40\\).", "γ = 1.4 is the value for a rigid diatomic gas (monatomic gives 1.67)."],
        answer: "γ = 1.4; diatomic",
      },
      practiceSet: [
        { prompt: "Write the molar specific heat at constant volume of a monatomic gas in terms of R.", answer: "\\(\\frac{3}{2}R\\)" },
        { prompt: "What is γ for a monatomic gas?", answer: "\\(\\frac{5}{3}\\), about 1.67" },
        { prompt: "Why is \\(C_V\\) the same for every monatomic gas?", answer: "It depends only on the 3 degrees of freedom, not on the kind of atom" },
      ],
      pyqExampleId: "3cb7449c-6a8a-4fc1-bf04-179549da4ffe",
      traps: [
        {
          title: "Taking the ratio the wrong way round",
          body: "γ is \\(C_P/C_V\\) and is greater than 1. If your \\(C_V\\) comes out larger than \\(C_P\\), you have inverted the ratio.",
        },
        {
          title: "Dividing by \\(\\gamma\\) instead of \\(\\gamma - 1\\)",
          body: "From \\(\\gamma C_V - C_V = C_P - C_V\\), the divisor is \\(\\gamma - 1\\). Dividing by γ gives a wrong \\(C_V\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-solids-water",
      name: "Specific heat of solids and of water",
      intuition:
        "Atoms in a solid cannot wander or spin; they only vibrate about fixed places, back and forth along three directions. Each of those vibrations holds kinetic and potential energy, so each atom holds 3kT on average. Water is treated the same way, with three atoms in each molecule.",
      definition:
        "- An atom of a solid vibrates along three perpendicular directions. Each vibration has two energy terms (kinetic and potential), each with \\(\\dfrac{1}{2}k_BT\\), so each direction contributes \\(k_BT\\).\n" +
        "- Average energy per atom \\(= 3k_BT\\). For one mole: \\(E = 3N_Ak_BT = 3RT\\), so \\(C = 3R\\).\n" +
        "- A solid hardly expands, so \\(C_P\\) and \\(C_V\\) are nearly equal and both are written C.\n" +
        "- **Water** is treated like a solid: a molecule has 3 atoms, each with \\(3k_BT\\), so \\(9k_BT\\) per molecule, \\(E = 9RT\\) per mole and \\(C = 9R\\).",
      formula: {
        label: "Molar specific heat of a solid",
        latex: "C = 3R \\ (\\text{solid}), \\qquad C = 9R \\ (\\text{water})",
      },
      authoredExample: {
        prompt: "Find the molar specific heat of a solid from the law of equipartition. (R = 8.31 J mol⁻¹ K⁻¹)",
        steps: [
          "Each atom vibrates along 3 directions; each direction contributes \\(k_BT\\).",
          "Energy per atom \\(3k_BT\\); per mole \\(E = 3N_Ak_BT = 3RT\\).",
          "\\(C = \\dfrac{dE}{dT} = 3R = 3 \\times 8.31 = 24.9\\) J mol⁻¹ K⁻¹.",
        ],
        answer: "3R = 24.9 J mol⁻¹ K⁻¹",
      },
      selfCheckExample: {
        prompt: "What is the average energy of one atom vibrating in a solid at absolute temperature T?",
        steps: ["Three directions of vibration, each with kinetic and potential energy.", "\\(3 \\times 2 \\times \\dfrac{1}{2}k_BT\\)."],
        answer: "3kT, k being the Boltzmann constant",
      },
      practiceSet: [
        { prompt: "Why does each direction of vibration of an atom contribute \\(k_BT\\) and not \\(\\frac{1}{2}k_BT\\)?", answer: "A vibration has both kinetic and potential energy, each with \\(\\frac{1}{2}k_BT\\)" },
        { prompt: "Why are \\(C_P\\) and \\(C_V\\) of a solid nearly the same?", answer: "A solid expands very little, so almost no work is done on heating" },
      ],
      pyqExampleId: "c48a974c-de15-4204-a595-bcf94bbdc01d",
      traps: [
        {
          title: "Counting an atom of a solid like a gas atom",
          body: "A gas atom has \\(\\frac{3}{2}k_BT\\) (motion only). An atom of a solid has \\(3k_BT\\), because each of its three vibrations also has potential energy.",
        },
      ],
    },
  ],
};
