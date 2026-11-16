import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_PB_OXYGEN_NOTE: SubtopicNote = {
  subtopicName: "Oxygen Family",
  title: "Oxygen Family",
  oneLineDefinition:
    "Group 16: the elements and their oxidation states, the hydrides H₂O to H₂Te with their boiling points and acid strengths, and the oxoacids of sulphur with the dilute-acid tests for anions.",
  whyItMatters:
    "Six NEET questions from 2021 to 2024. Three are on the hydrides H₂O to H₂Te: two on their boiling points (2022 and 2024) and one on their pKa values (2021). One asks which element of the group does not show the −2 state (2024), one matches four oxoacids of sulphur to their bonds (2023, the chapter's only HARD question), and one matches the gas each anion gives with dilute sulphuric acid (Re-NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchpb-group16",
      name: "Group 16 elements and their oxidation states",
      intuition:
        "Oxygen, sulphur, selenium, tellurium and polonium all have six outer electrons (ns² np⁴), two short of a noble gas, so −2 is the state you expect. Oxygen, small and very electronegative, mostly stays at −2. The others also use their outer electrons to reach +2, +4 and +6 when bonded to oxygen or fluorine. Down the group the metallic character grows and the −2 state fades: polonium, a metal, hardly shows it at all.",
      definition:
        "- **Nature:** oxygen and sulphur are non-metals, selenium and tellurium metalloids, polonium a radioactive metal.\n" +
        "- **Oxygen:** mostly −2. It is −1 in peroxides such as \\(\\text{H}_2\\text{O}_2\\), +1 in \\(\\text{O}_2\\text{F}_2\\) and +2 in \\(\\text{OF}_2\\), where it is bonded to the more electronegative fluorine.\n" +
        "- **S, Se, Te:** −2, +2, +4 and +6; +4 and +6 are the common ones, with oxygen and fluorine.\n" +
        "- **Down the group** the stability of −2 falls (polonium hardly shows it), and +4 becomes more stable than +6 (inert pair effect).\n" +
        "- **Oxygen is the odd one out:** it is a diatomic gas, \\(\\text{O}_2\\), held by a \\(p\\pi\\)-\\(p\\pi\\) double bond, while sulphur is a solid of \\(\\text{S}_8\\) rings. Its covalency is limited to 4, since it has no d orbitals.\n" +
        "- Oxygen's electron gain enthalpy is less negative than sulphur's, because the small oxygen atom is crowded with electrons.\n" +
        "- Dioxygen, \\(\\text{O}_2\\), is paramagnetic.",
      table: {
        columns: ["Element", "Nature", "Main oxidation states"],
        rows: [
          { cells: ["Oxygen, O", "Non-metal; gas, O₂", "−2; also −1 in peroxides, +1 in O₂F₂, +2 in OF₂"] },
          { cells: ["Sulphur, S", "Non-metal; solid, S₈", "−2, +2, +4, +6"] },
          { cells: ["Selenium, Se", "Metalloid", "−2, +2, +4, +6"] },
          { cells: ["Tellurium, Te", "Metalloid", "−2, +2, +4, +6"] },
          { cells: ["Polonium, Po", "Radioactive metal", "+2 and +4; hardly ever −2"], pyqExampleId: "1a721829-c16a-44af-80c7-1d7a7d7d5f26", noteAmber: "NEET 2024: polonium was the group 16 element that does not show −2." },
        ],
      },
      pyqExampleId: "1a721829-c16a-44af-80c7-1d7a7d7d5f26",
      selfCheckExample: {
        prompt: "What is the oxidation state of oxygen in OF₂, and why is it positive here?",
        steps: [
          "Fluorine is more electronegative than oxygen, so each fluorine counts as −1.",
          "\\(x + 2(-1) = 0\\), so \\(x = +2\\).",
        ],
        answer: "+2, because fluorine is more electronegative than oxygen",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of oxygen in H₂O₂?", answer: "−1" },
        { prompt: "Which is the more stable state for tellurium, +4 or +6?", answer: "+4" },
        { prompt: "Is the dioxygen molecule paramagnetic or diamagnetic?", answer: "Paramagnetic" },
        { prompt: "Which has the more negative electron gain enthalpy, oxygen or sulphur?", answer: "Sulphur" },
      ],
      traps: [
        {
          title: "Oxygen is not always −2",
          body: "Oxygen is −1 in peroxides, +1 in \\(\\text{O}_2\\text{F}_2\\) and +2 in \\(\\text{OF}_2\\). A statement that oxygen shows only −2 is false.",
        },
        {
          title: "Polonium hardly shows −2",
          body: "The −2 state gets less stable down the group. O, S, Se and Te all show it; polonium, a metal, hardly ever does.",
        },
        {
          title: "Sulphur beats oxygen in electron gain enthalpy",
          body: "Oxygen is more electronegative, yet its electron gain enthalpy is less negative than sulphur's, because an added electron is crowded in oxygen's small 2p shell.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-hydrides16",
      name: "Hydrides of group 16: boiling point and acid strength",
      intuition:
        "Two different rules decide the properties of H₂O, H₂S, H₂Se and H₂Te. Acid strength follows the H-E bond: it gets longer and weaker down the group, so it breaks more easily and the acid gets stronger. Boiling point follows the forces between molecules: they grow with molar mass from H₂S to H₂Te, but water breaks the pattern because its molecules are held together by hydrogen bonds. So water, the lightest, boils highest.",
      definition:
        "- **Acid strength** rises down the group: \\(\\text{H}_2\\text{O} < \\text{H}_2\\text{S} < \\text{H}_2\\text{Se} < \\text{H}_2\\text{Te}\\), because the H-E bond enthalpy falls. A stronger acid has a lower \\(\\text{p}K_a\\), so \\(\\text{p}K_a\\) falls in the same order.\n" +
        "- **Reducing power** rises from \\(\\text{H}_2\\text{S}\\) to \\(\\text{H}_2\\text{Te}\\); thermal stability falls.\n" +
        "- **Boiling point:** \\(\\text{H}_2\\text{O} > \\text{H}_2\\text{Te} > \\text{H}_2\\text{Se} > \\text{H}_2\\text{S}\\). From \\(\\text{H}_2\\text{S}\\) to \\(\\text{H}_2\\text{Te}\\) it rises with molar mass; water is far higher because of intermolecular hydrogen bonding.\n" +
        "- The H-E-H bond angle falls from 104° in water to about 90° in \\(\\text{H}_2\\text{Te}\\).",
      table: {
        columns: ["Hydride", "Boiling point (K)", "H-E bond enthalpy (kJ/mol)", "Acid dissociation constant"],
        rows: [
          { cells: ["\\(\\text{H}_2\\text{O}\\)", "373", "463", "\\(1.8 \\times 10^{-16}\\)"], pyqExampleId: "e47fc3e6-153e-4789-b9ec-2ba750a75934", noteAmber: "NEET 2024: the order H₂O > H₂Te > H₂Se > H₂S was correct, and so was the hydrogen-bond reason." },
          { cells: ["\\(\\text{H}_2\\text{S}\\)", "213", "347", "\\(1.3 \\times 10^{-7}\\)"] },
          { cells: ["\\(\\text{H}_2\\text{Se}\\)", "232", "276", "\\(1.3 \\times 10^{-4}\\)"] },
          { cells: ["\\(\\text{H}_2\\text{Te}\\)", "269", "238", "\\(2.3 \\times 10^{-3}\\)"] },
        ],
        caption: "Down the table the bond gets weaker and the acid stronger, while the boiling point dips at H₂S and then climbs.",
      },
      pyqExampleId: "e47fc3e6-153e-4789-b9ec-2ba750a75934",
      selfCheckExample: {
        prompt: "Arrange H₂O, H₂S, H₂Se and H₂Te in order of decreasing pKa.",
        steps: [
          "Acid strength rises from H₂O to H₂Te, because the H-E bond gets weaker.",
          "The stronger the acid, the lower its pKa, so pKa falls in that order.",
        ],
        answer: "H₂O > H₂S > H₂Se > H₂Te",
      },
      practiceSet: [
        { prompt: "Which is the strongest reducing agent among H₂S, H₂Se and H₂Te?", answer: "\\(\\text{H}_2\\text{Te}\\)" },
        { prompt: "Which group 16 hydride has the strongest H-E bond?", answer: "\\(\\text{H}_2\\text{O}\\) (463 kJ/mol)" },
        { prompt: "Why does acid strength rise from H₂S to H₂Te?", answer: "The H-E bond gets longer and weaker, so it gives up \\(\\text{H}^+\\) more easily" },
        { prompt: "What is the H-O-H bond angle in water, to the nearest degree?", answer: "104°" },
      ],
      traps: [
        {
          title: "Boiling point does not simply follow molar mass",
          body: "\\(\\text{H}_2\\text{S}\\), \\(\\text{H}_2\\text{Se}\\) and \\(\\text{H}_2\\text{Te}\\) rise with molar mass, but water, the lightest, boils highest because of hydrogen bonding. The order is \\(\\text{H}_2\\text{O} > \\text{H}_2\\text{Te} > \\text{H}_2\\text{Se} > \\text{H}_2\\text{S}\\).",
        },
        {
          title: "Stronger acid, lower pKa",
          body: "Acid strength rises from \\(\\text{H}_2\\text{O}\\) to \\(\\text{H}_2\\text{Te}\\), so the \\(\\text{p}K_a\\) values fall in that order. An order of increasing \\(\\text{p}K_a\\) from \\(\\text{H}_2\\text{O}\\) to \\(\\text{H}_2\\text{Te}\\) is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-sulphur",
      name: "Oxoacids of sulphur and the tests for anions",
      intuition:
        "Each sulphur oxoacid is built from sulphur atoms carrying S=O and S-OH groups. One sulphur gives sulphurous or sulphuric acid. Two sulphur units can be joined by a single oxygen (S-O-S) or by two oxygens in a row (S-O-O-S, a peroxo link). Read the name: 'pyro' means two units joined by one oxygen, 'peroxo' means the O-O link. Separately, several anions can be told apart by the gas they give off with dilute sulphuric acid.",
      definition:
        "- **Sulphuric acid** is made by the contact process: \\(2\\text{SO}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{SO}_3\\) over \\(\\text{V}_2\\text{O}_5\\). The \\(\\text{SO}_3\\) is absorbed in sulphuric acid to give oleum, \\(\\text{H}_2\\text{S}_2\\text{O}_7\\), which is diluted to the required strength.\n" +
        "- **Oxidation states:** S is +4 in sulphurous acid and +6 in the other three acids below. In peroxodisulphuric acid the two peroxo oxygens are −1 each, so sulphur is still +6.\n" +
        "- **Tests with dilute \\(\\text{H}_2\\text{SO}_4\\):**\n" +
        "- Carbonate gives brisk effervescence of colourless, odourless \\(\\text{CO}_2\\), which turns lime water milky.\n" +
        "- Sulphide gives \\(\\text{H}_2\\text{S}\\), smelling of rotten eggs, which turns lead acetate paper black.\n" +
        "- Sulphite gives \\(\\text{SO}_2\\), with a pungent smell, which turns acidified potassium dichromate paper green.\n" +
        "- Nitrite gives brown fumes of \\(\\text{NO}_2\\).",
      table: {
        columns: ["Acid", "Formula", "Oxidation state of S", "Bonds in one molecule"],
        rows: [
          { cells: ["Sulphurous acid", "\\(\\text{H}_2\\text{SO}_3\\)", "+4", "Two S-OH, one S=O"] },
          { cells: ["Sulphuric acid", "\\(\\text{H}_2\\text{SO}_4\\)", "+6", "Two S-OH, two S=O"] },
          { cells: ["Pyrosulphuric acid (oleum)", "\\(\\text{H}_2\\text{S}_2\\text{O}_7\\)", "+6", "Two S-OH, four S=O, one S-O-S bridge"] },
          { cells: ["Peroxodisulphuric acid", "\\(\\text{H}_2\\text{S}_2\\text{O}_8\\)", "+6", "Two S-OH, four S=O, one S-O-O-S bridge"], pyqExampleId: "0f899ff8-5a4e-4573-8b9a-df757be54669", noteAmber: "NEET 2023: all four acids were matched to these bond counts." },
        ],
      },
      pyqExampleId: "0f899ff8-5a4e-4573-8b9a-df757be54669",
      selfCheckExample: {
        prompt: "Find the oxidation state of sulphur in peroxodisulphuric acid, H₂S₂O₈.",
        steps: [
          "Two of the eight oxygens form the peroxo link and count −1 each; the other six count −2.",
          "\\(2(+1) + 2x + 6(-2) + 2(-1) = 0\\), so \\(2x = 12\\) and \\(x = +6\\).",
        ],
        answer: "+6",
      },
      practiceSet: [
        { prompt: "Name the catalyst used in the contact process.", answer: "Vanadium pentoxide, \\(\\text{V}_2\\text{O}_5\\)" },
        { prompt: "What is the chemical formula of oleum?", answer: "\\(\\text{H}_2\\text{S}_2\\text{O}_7\\)" },
        { prompt: "Which gas turns lead acetate paper black?", answer: "\\(\\text{H}_2\\text{S}\\) (it forms black PbS)" },
        { prompt: "Which gas from an anion test turns lime water milky?", answer: "\\(\\text{CO}_2\\), from a carbonate" },
      ],
      traps: [
        {
          title: "Pyro has S-O-S, peroxo has S-O-O-S",
          body: "Pyrosulphuric acid \\(\\text{H}_2\\text{S}_2\\text{O}_7\\) joins its two units through one oxygen. Peroxodisulphuric acid \\(\\text{H}_2\\text{S}_2\\text{O}_8\\) joins them through an O-O link, the one extra oxygen.",
        },
        {
          title: "Sulphur in H₂S₂O₈ is +6, not +7",
          body: "Counting every oxygen as −2 gives +7, which sulphur cannot reach. The two peroxo oxygens are −1 each, so sulphur is +6.",
        },
        {
          title: "Rotten eggs means sulphide, pungent means sulphite",
          body: "A sulphide gives \\(\\text{H}_2\\text{S}\\) (rotten eggs); a sulphite gives \\(\\text{SO}_2\\) (pungent). Brown fumes come from a nitrite, a colourless odourless gas from a carbonate.",
        },
      ],
    },
  ],
};
