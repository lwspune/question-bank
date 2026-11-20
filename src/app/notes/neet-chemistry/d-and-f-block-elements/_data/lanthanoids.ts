import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_DF_LANTHANOIDS_NOTE: SubtopicNote = {
  subtopicName: "Lanthanoids and Actinoids",
  title: "Lanthanoids and Actinoids",
  oneLineDefinition:
    "The 4f and 5f series: their configurations and the +3 state with its +2 and +4 exceptions, lanthanoid contraction and its results, the colour and magnetism of the lanthanoid ions, and how the actinoids differ.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, the largest share of the chapter. Three are on configuration and oxidation states: why cerium shows +4 (NEET 2026), which ions are oxidising agents (Re-NEET 2024) and why gadolinium's third ionisation enthalpy is low (2022). Three are on colour and magnetism: the ion with four unpaired electrons (Re-NEET 2026), the diamagnetic pair (NEET 2024) and the narrow absorption bands (Re-NEET 2024). One is on lanthanoid contraction (2021) and one picks the incorrect statement about lanthanoids and actinoids (2021).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchdf-ln-configuration",
      name: "Configuration and oxidation states of the lanthanoids",
      intuition:
        "From cerium to lutetium each new electron goes into the 4f subshell, which lies deep inside the atom. The outer electrons barely change, so every lanthanoid behaves alike and loses three electrons to give the +3 state. A different state appears only when it leads to an empty (4f⁰), half-filled (4f⁷) or full (4f¹⁴) subshell, and even then the ion tends to go back to +3.",
      definition:
        "- The lanthanoids are the 14 elements after lanthanum, Ce (Z = 58) to Lu (Z = 71). Lanthanum is studied with them.\n" +
        "- General configuration: \\([\\text{Xe}]4f^{1-14}5d^{0-1}6s^2\\). Every \\(\\text{Ln}^{3+}\\) ion is \\([\\text{Xe}]4f^n\\).\n" +
        "- **+3 is the common state.** Ce⁴⁺ (\\(4f^0\\)) is an oxidising agent that goes back to +3; E°(Ce⁴⁺/Ce³⁺) = +1.74 V. Tb⁴⁺ (\\(4f^7\\)) is also an oxidant.\n" +
        "- Eu²⁺ (\\(4f^7\\)) and Yb²⁺ (\\(4f^{14}\\)) form by losing the two 6s electrons; both are reducing agents that change to the common +3 state.\n" +
        "- The third ionisation enthalpy is unusually low for La, Gd and Lu: after losing three electrons they reach an empty, half-filled or full 4f subshell.",
      table: {
        columns: ["Element (Z)", "Configuration", "Ions and their 4f count"],
        rows: [
          { cells: ["La (57)", "\\([\\text{Xe}]5d^1 6s^2\\)", "La³⁺: \\(4f^0\\)"] },
          { cells: ["Ce (58)", "\\([\\text{Xe}]4f^1 5d^1 6s^2\\)", "Ce³⁺: \\(4f^1\\); Ce⁴⁺: \\(4f^0\\)"], noteAmber: "NEET 2026: cerium shows +4 because losing one more electron gives 4f⁰." },
          { cells: ["Eu (63)", "\\([\\text{Xe}]4f^7 6s^2\\)", "Eu²⁺: \\(4f^7\\); Eu³⁺: \\(4f^6\\)"] },
          { cells: ["Gd (64)", "\\([\\text{Xe}]4f^7 5d^1 6s^2\\)", "Gd³⁺: \\(4f^7\\)"], noteAmber: "NEET 2022: gadolinium's low third ionisation enthalpy comes from the high exchange enthalpy of 4f⁷." },
          { cells: ["Tb (65)", "\\([\\text{Xe}]4f^9 6s^2\\)", "Tb³⁺: \\(4f^8\\); Tb⁴⁺: \\(4f^7\\)"], noteAmber: "Re-NEET 2024: Ce⁴⁺ and Tb⁴⁺ are the pair that act as oxidising agents." },
          { cells: ["Yb (70)", "\\([\\text{Xe}]4f^{14} 6s^2\\)", "Yb²⁺: \\(4f^{14}\\); Yb³⁺: \\(4f^{13}\\)"] },
          { cells: ["Lu (71)", "\\([\\text{Xe}]4f^{14} 5d^1 6s^2\\)", "Lu³⁺: \\(4f^{14}\\)"] },
        ],
      },
      pyqExampleId: "2051e3bb-0a43-45c4-a4fb-0d6d3cfe6af4",
      selfCheckExample: {
        prompt: "Eu²⁺ has a half-filled 4f⁷ subshell. Why is it still a reducing agent?",
        steps: [
          "Eu is \\([\\text{Xe}]4f^7 6s^2\\); losing the two 6s electrons gives Eu²⁺, \\(4f^7\\).",
          "The common, most stable state of the lanthanoids is +3.",
          "So Eu²⁺ readily gives up one more electron to become Eu³⁺, which is what a reducing agent does.",
        ],
        answer: "It readily loses an electron to reach the common +3 state",
      },
      practiceSet: [
        { prompt: "What is the most common oxidation state of the lanthanoids?", answer: "+3" },
        { prompt: "Samarium is \\([\\text{Xe}]4f^6 6s^2\\). How many 4f electrons does Sm³⁺ have?", answer: "5 (\\(4f^5\\))" },
        { prompt: "Is Yb²⁺ an oxidising agent or a reducing agent?", answer: "A reducing agent: it changes to the common +3 state" },
        { prompt: "How many lanthanoids are there from cerium to lutetium?", answer: "14" },
      ],
      traps: [
        {
          title: "A noble gas core does not make Ce⁴⁺ stable in solution",
          body: "Ce⁴⁺ (\\(4f^0\\)) exists, but it is a strong oxidising agent (E° = +1.74 V) that goes back to Ce³⁺. The +3 state is still the more stable one.",
        },
        {
          title: "Gadolinium keeps one 5d electron",
          body: "Gd is \\([\\text{Xe}]4f^7 5d^1 6s^2\\), not \\(4f^8 6s^2\\): the half-filled 4f⁷ is kept and the extra electron goes to 5d.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-contraction",
      name: "Lanthanoid contraction",
      visualizationSlug: "neet-lanthanoid-contraction",
      intuition:
        "Going from lanthanum to lutetium, each step adds one proton to the nucleus and one electron to the 4f subshell. A 4f electron is poor at shielding another 4f electron from the nucleus, so the outer electrons feel a slightly stronger pull each time and the atom shrinks a little. Fourteen small shrinkages add up to a large one, big enough to cancel the usual growth in size on going down a group.",
      definition:
        "- **Lanthanoid contraction:** the steady decrease in the atomic and ionic radii of the lanthanoids from La to Lu. It is more regular for the \\(\\text{M}^{3+}\\) ions than for the atoms.\n" +
        "- **Cause:** imperfect shielding of one 4f electron by another in the same subshell, so the effective nuclear charge rises along the series.\n" +
        "- **Result:** the elements of the third transition series (5d) come out almost the same size as those of the second (4d): Zr 160 pm, Hf 159 pm. So the members of such a 4d and 5d pair have very similar properties.",
      table: {
        columns: ["What changes", "Example"],
        rows: [
          { cells: ["Ln³⁺ radius falls steadily with atomic number", "La³⁺ is the largest and Lu³⁺ the smallest"] },
          { cells: ["A 5d element is about the same size as the 4d element above it", "Zr 160 pm and Hf 159 pm"], noteAmber: "NEET 2021: Zr and Hf have similar atomic and ionic radii because of lanthanoid contraction." },
          { cells: ["Similar size gives similar chemistry", "Zr and Hf have very similar physical and chemical properties"] },
        ],
      },
      pyqExampleId: "696c53df-9890-4df5-9321-555d56a4abee",
      selfCheckExample: {
        prompt: "Which has the smaller ionic radius, Nd³⁺ (Z = 60) or Dy³⁺ (Z = 66)?",
        steps: [
          "Both are \\(\\text{Ln}^{3+}\\) ions, so lanthanoid contraction applies.",
          "The radius falls as the atomic number rises, and Dy has the higher Z.",
        ],
        answer: "Dy³⁺",
      },
      practiceSet: [
        { prompt: "What is the cause of lanthanoid contraction?", answer: "Imperfect shielding of one 4f electron by another in the same subshell" },
        { prompt: "Arrange La³⁺, Gd³⁺ and Lu³⁺ in decreasing order of ionic radius.", answer: "La³⁺ > Gd³⁺ > Lu³⁺" },
        { prompt: "Is the decrease in radius smoother for the lanthanoid atoms or for their M³⁺ ions?", answer: "For the M³⁺ ions" },
        { prompt: "Is the shrinkage from one lanthanoid to the next large or small?", answer: "Small, but it adds up to a large total over the series" },
      ],
      traps: [
        {
          title: "The cause is poor shielding, not the extra proton alone",
          body: "Nuclear charge rises along every period. What is special about the lanthanoids is that the added 4f electrons shield one another poorly, so the rise in nuclear charge is felt almost in full.",
        },
        {
          title: "Hafnium is not bigger than zirconium",
          body: "Down a group size normally grows, but Hf (159 pm) comes out almost the same as Zr (160 pm) because the 14 lanthanoids sit between them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-ln-ions",
      name: "Colour and magnetism of the lanthanoid ions",
      intuition:
        "This is the d-block counting game played with seven f orbitals instead of five d orbitals. Fill the seven 4f orbitals one electron each before pairing. Any unpaired electron makes the ion paramagnetic, and a partly filled 4f subshell lets an electron be excited within the f level, which gives colour. An empty or full 4f subshell gives neither.",
      definition:
        "- Unpaired electrons: \\(4f^1\\) to \\(4f^7\\) have 1 to 7; \\(4f^8\\) to \\(4f^{14}\\) have 6 down to 0 (that is, 14 minus the number of f electrons).\n" +
        "- All lanthanoid ions are paramagnetic except the \\(f^0\\) ions (La³⁺, Ce⁴⁺) and the \\(f^{14}\\) ions (Yb²⁺, Lu³⁺), which are diamagnetic.\n" +
        "- Many trivalent lanthanoid ions are coloured, both in the solid state and in water, because of their f electrons. La³⁺ and Lu³⁺ are colourless.\n" +
        "- Their absorption bands are **narrow**, probably because the excitation is within the f level.",
      table: {
        columns: ["Ion", "4f electrons", "Unpaired electrons", "Magnetic nature"],
        rows: [
          { cells: ["La³⁺", "0", "0", "Diamagnetic"] },
          { cells: ["Ce⁴⁺", "0", "0", "Diamagnetic"], noteAmber: "NEET 2024: Ce⁴⁺ and Yb²⁺ are the diamagnetic pair." },
          { cells: ["Ce³⁺", "1", "1", "Paramagnetic"] },
          { cells: ["Nd³⁺", "3", "3", "Paramagnetic"] },
          { cells: ["Gd³⁺", "7", "7", "Paramagnetic"] },
          { cells: ["Tb³⁺", "8", "6", "Paramagnetic"] },
          { cells: ["Ho³⁺", "10", "4", "Paramagnetic"], noteAmber: "Re-NEET 2026: Ho³⁺ is the lanthanoid ion with four unpaired electrons." },
          { cells: ["Yb²⁺", "14", "0", "Diamagnetic"] },
          { cells: ["Lu³⁺", "14", "0", "Diamagnetic"] },
        ],
      },
      pyqExampleId: "1d276e4b-eb70-45c1-9a2a-68488f384850",
      selfCheckExample: {
        prompt: "Why are La³⁺ and Lu³⁺ colourless while Nd³⁺ is coloured?",
        steps: [
          "La³⁺ is \\(4f^0\\) and Lu³⁺ is \\(4f^{14}\\): with an empty or a full 4f subshell no electron can be excited within the f level.",
          "Nd³⁺ is \\(4f^3\\), a partly filled subshell, so it absorbs visible light by such an excitation.",
        ],
        answer: "Their 4f subshell is empty or full; Nd³⁺ has a partly filled 4f subshell",
      },
      practiceSet: [
        { prompt: "Is Gd³⁺ paramagnetic or diamagnetic?", answer: "Paramagnetic (\\(4f^7\\), seven unpaired electrons)" },
        { prompt: "Name a lanthanoid ion with the \\(4f^0\\) configuration other than La³⁺.", answer: "Ce⁴⁺" },
        { prompt: "Is the Lu³⁺ ion coloured?", answer: "No: it is \\(4f^{14}\\)" },
        { prompt: "Which 4f configuration gives the largest number of unpaired electrons?", answer: "\\(4f^7\\), with 7 unpaired" },
      ],
      traps: [
        {
          title: "Seven f orbitals, not five",
          body: "\\(4f^8\\) has 6 unpaired electrons, not 2: the first seven electrons go one into each of the seven f orbitals, and only the eighth pairs. Do not count as if they were d orbitals.",
        },
        {
          title: "Both ends of the series are diamagnetic",
          body: "An \\(f^0\\) ion (La³⁺, Ce⁴⁺) and an \\(f^{14}\\) ion (Yb²⁺, Lu³⁺) have no unpaired electrons. Every other lanthanoid ion is paramagnetic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-actinoids",
      name: "The actinoids, and the lanthanoids as metals",
      intuition:
        "The actinoids fill the 5f subshell the way the lanthanoids fill 4f, but 5f orbitals are not buried as deeply. Their electrons are easier to use in bonding, and the 5f, 6d and 7s levels are close in energy. So the actinoids show many more oxidation states and a bigger contraction per step. They are also all radioactive, which is why far less is known about them.",
      definition:
        "- The actinoids are the 14 elements after actinium, Th (Z = 90) to Lr (Z = 103). General configuration \\([\\text{Rn}]5f^{1-14}6d^{0-1}7s^2\\). All of them are radioactive.\n" +
        "- 5f orbitals have the same angular shape as 4f orbitals but are less deeply buried, so 5f electrons take part in bonding to a far greater extent.\n" +
        "- **Oxidation states:** +3 is common, but the range is wider than for the lanthanoids because 5f, 6d and 7s are of comparable energy. The highest state rises from +4 (Th) to +5 (Pa), +6 (U) and +7 (Np), then falls.\n" +
        "- **Actinoid contraction** is greater from element to element than lanthanoid contraction, because 5f electrons shield poorly.\n" +
        "- The ionisation enthalpies of the early actinoids are lower than those of the early lanthanoids: 5f electrons are more effectively shielded from the nuclear charge than 4f electrons.\n" +
        "- Actinoid metals are silvery and highly reactive, especially when finely divided. Hydrochloric acid attacks them all, nitric acid only slightly (a protective oxide layer forms), and alkalies have no action.\n" +
        "- **Lanthanoid metals** are soft and silvery white, have a typical metallic structure and are good conductors of heat and electricity. Mischmetall (about 95% lanthanoid metal and 5% iron, with traces of S, C, Ca and Al) is used in lighter flints; mixed lanthanoid oxides are catalysts in petroleum cracking.",
      table: {
        columns: ["Property", "Lanthanoids", "Actinoids"],
        rows: [
          { cells: ["Subshell being filled", "4f", "5f"] },
          { cells: ["Oxidation states", "Mainly +3, a few +2 and +4", "+3 common, with a wider range up to +7"] },
          { cells: ["Contraction from one element to the next", "Smaller", "Greater"], noteAmber: "NEET 2021 gave this as a correct statement; the incorrect one said most trivalent lanthanoid ions are colourless in the solid state." },
          { cells: ["f electrons in bonding", "Little (4f lies deep)", "Far more (5f less buried)"] },
          { cells: ["Ionisation enthalpy of the early members", "Higher", "Lower"] },
        ],
      },
      pyqExampleId: "9f469a6d-257e-413a-b8fb-2fc0b1c5d79d",
      selfCheckExample: {
        prompt: "Why do the actinoids show a wider range of oxidation states than the lanthanoids?",
        steps: [
          "In the actinoids the 5f, 6d and 7s levels have comparable energies.",
          "So electrons from all three can be removed or used in bonding, giving many oxidation states.",
          "In the lanthanoids the 4f electrons lie deep and are seldom used, so +3 dominates.",
        ],
        answer: "Their 5f, 6d and 7s levels are of comparable energy",
      },
      practiceSet: [
        { prompt: "Which is more deeply buried in the atom, a 4f orbital or a 5f orbital?", answer: "A 4f orbital" },
        { prompt: "What is the highest oxidation state shown by uranium?", answer: "+6" },
        { prompt: "What is mischmetall made of?", answer: "About 95% lanthanoid metal and 5% iron, with traces of S, C, Ca and Al" },
        { prompt: "What is the action of alkalies on the actinoid metals?", answer: "None: alkalies do not attack them" },
      ],
      traps: [
        {
          title: "Early actinoids are easier to ionise",
          body: "The ionisation enthalpies of the early actinoids are lower than those of the early lanthanoids, because their 5f electrons are better shielded from the nucleus. A statement saying higher is false.",
        },
        {
          title: "Actinoid contraction is the larger one per step",
          body: "Element to element, the actinoid contraction is greater than the lanthanoid contraction, because of the poor shielding by 5f electrons.",
        },
      ],
    },
  ],
};
