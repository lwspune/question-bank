import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SU_CHEMICALS_NOTE: SubtopicNote = {
  subtopicName: "Common Chemicals and Their Uses",
  title: "Common Chemicals and Their Uses",
  oneLineDefinition:
    "Common salt is the starting point for caustic soda, washing soda and baking soda, and slaked lime for bleaching powder; each of these and a few other salts such as blue vitriol, gypsum and borax has its own formula and uses.",
  whyItMatters:
    "Eight questions in the bank, one EASY, six MODERATE and one HARD. Five are about sodium compounds (the products of electrolysis of brine, the properties of caustic soda, the uses of washing soda and baking soda, the atoms in borax), and three about other chemicals: how bleaching powder is made, the 1% Bordeaux mixture and the uses of gypsum, blue vitriol and nitre.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9such-sodium",
      name: "Sodium compounds: caustic soda, washing soda, baking soda and borax",
      intuition:
        "Pass electricity through strong salt water (brine) and it splits into three useful things: chlorine gas, hydrogen gas and caustic soda. Caustic soda, washing soda and baking soda all carry sodium, but they are different chemicals with different jobs, and the papers test which job belongs to which.",
      definition:
        "- **Electrolysis of brine**: \\(\\mathrm{2NaCl + 2H_2O \\rightarrow 2NaOH + Cl_2 + H_2}\\). Chlorine forms at the **anode**, hydrogen at the **cathode**, and **sodium hydroxide** stays in the solution.\n" +
        "- **Caustic soda** (\\(\\mathrm{NaOH}\\)): a white, **odourless**, crystalline solid when pure. It dissolves in water giving out **heat** (the mixture gets hot), and dissolves in ethanol and glycerol too.\n" +
        "- **Washing soda** (\\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\)): crystals whose solution is **basic** (red litmus turns blue, blue litmus stays blue).\n" +
        "- **Baking soda** (\\(\\mathrm{NaHCO_3}\\)): a mild base; gives carbon dioxide on heating or with an acid.\n" +
        "- **Borax** (\\(\\mathrm{Na_2B_4O_7 \\cdot 10H_2O}\\)): 2 sodium, 4 boron and 7 oxygen atoms, with 10 water molecules.",
      table: {
        columns: ["Common name", "Chemical name and formula", "Uses"],
        rows: [
          { cells: ["Caustic soda", "Sodium hydroxide, \\(\\mathrm{NaOH}\\)", "Making soap and paper"] },
          { cells: ["Washing soda (soda ash)", "Sodium carbonate, \\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\)", "Glass and paper industry, softening hard water, washing clothes, refining petroleum"] },
          { cells: ["Baking soda", "Sodium bicarbonate, \\(\\mathrm{NaHCO_3}\\)", "Baking powder, antacid, fire extinguishers, cleaning ovens"], noteAmber: "Glass, paper and petroleum use washing soda, not baking soda." },
          { cells: ["Borax", "\\(\\mathrm{Na_2B_4O_7 \\cdot 10H_2O}\\)", "Glazes on pottery, heat-resistant glass"] },
          { cells: ["Common salt", "Sodium chloride, \\(\\mathrm{NaCl}\\)", "Food; raw material for caustic soda, chlorine and washing soda"] },
        ],
        caption: "Washing soda is the industrial one; baking soda is the kitchen one.",
      },
      selfCheckExample: {
        prompt: "Name the three products formed when electricity is passed through saturated brine, and say where each one appears.",
        steps: ["The chloride ions give chlorine gas at the anode.", "Hydrogen gas forms at the cathode, and sodium hydroxide is left in the solution."],
        answer: "Chlorine (at the anode), hydrogen (at the cathode) and sodium hydroxide (in the solution)",
      },
      practiceSet: [
        { prompt: "What is the chemical name of washing soda?", answer: "Sodium carbonate" },
        { prompt: "A few pellets of sodium hydroxide are dissolved in water in a test tube. Does the test tube become warm or cool?", answer: "Warm: dissolving sodium hydroxide gives out heat" },
        { prompt: "Which sodium compound is used in fire extinguishers and as an antacid?", answer: "Baking soda (sodium bicarbonate)" },
        { prompt: "What is the ratio of oxygen atoms to sodium atoms in borax?", answer: "7 : 2" },
      ],
      pyqExampleId: "a08e7e80-70a1-499a-9be5-f2208af96cdc",
      traps: [
        {
          title: "Giving washing soda's uses to baking soda",
          body: "The glass and paper industries and petroleum refining use washing soda, sodium carbonate. Baking soda is for baking, antacids, fire extinguishers and cleaning ovens.",
        },
        {
          title: "Thinking caustic soda cools water",
          body: "Sodium hydroxide gives out heat as it dissolves, so the solution becomes hot.",
        },
        {
          title: "Leaving sodium hydroxide out of the brine products",
          body: "Electrolysis of brine gives three products, not two: chlorine, hydrogen and sodium hydroxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9such-lime",
      name: "Bleaching powder, Bordeaux mixture and other useful salts",
      intuition:
        "Slaked lime is cheap, and chlorine from brine turns it into bleaching powder. Blue vitriol and lime together make Bordeaux mixture, which farmers spray on grapes against fungus. Gypsum, plaster of Paris and nitre each turn up in a which-use question, so learn one use for each.",
      definition:
        "- **Bleaching powder** is made by passing chlorine over dry slaked lime: \\(\\mathrm{Ca(OH)_2 + Cl_2 \\rightarrow CaOCl_2 + H_2O}\\). It bleaches cloth and paper and disinfects drinking water.\n" +
        "- **Bordeaux mixture** is a **fungicide** made of blue vitriol, lime and water. A **1%** mixture uses **1 kg blue vitriol, 1 kg lime and 100 litres of water**: the ratio **1 : 1 : 100**.\n" +
        "- **Gypsum** (\\(\\mathrm{CaSO_4 \\cdot 2H_2O}\\)) is used to make plaster of Paris and is added to cement. It is **not** an antiseptic.\n" +
        "- **Nitre** (potassium nitrate, \\(\\mathrm{KNO_3}\\)) is used in gunpowder and as a fertilizer.",
      table: {
        columns: ["Chemical", "Formula", "Main use"],
        rows: [
          { cells: ["Bleaching powder", "\\(\\mathrm{CaOCl_2}\\)", "Bleaching cloth and paper, disinfecting drinking water"] },
          { cells: ["Slaked lime", "\\(\\mathrm{Ca(OH)_2}\\)", "Making bleaching powder, whitewash"] },
          { cells: ["Blue vitriol (copper sulphate)", "\\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\)", "Fungicide (in Bordeaux mixture)"] },
          { cells: ["Gypsum", "\\(\\mathrm{CaSO_4 \\cdot 2H_2O}\\)", "Making plaster of Paris; added to cement"] },
          { cells: ["Plaster of Paris", "\\(\\mathrm{CaSO_4 \\cdot \\frac{1}{2}H_2O}\\)", "Plaster casts for broken bones, statues"] },
          { cells: ["Nitre (saltpetre)", "\\(\\mathrm{KNO_3}\\)", "Gunpowder, fertilizer"] },
        ],
        caption: "Bordeaux mixture is blue vitriol plus lime in water: equal masses of the two solids.",
      },
      selfCheckExample: {
        prompt: "A farmer wants to make a 1% Bordeaux mixture with 300 litres of water. How much blue vitriol and how much lime does he need?",
        steps: ["A 1% mixture is 1 kg blue vitriol and 1 kg lime for every 100 litres of water.", "300 litres is three times 100 litres."],
        answer: "3 kg of blue vitriol and 3 kg of lime",
      },
      practiceSet: [
        { prompt: "Which gas is passed over slaked lime to make bleaching powder?", answer: "Chlorine" },
        { prompt: "For what is Bordeaux mixture sprayed on crops?", answer: "As a fungicide, to kill fungus" },
        { prompt: "Name a substance made from gypsum.", answer: "Plaster of Paris" },
        { prompt: "Which salt, also called saltpetre, is used in gunpowder?", answer: "Nitre (potassium nitrate)" },
      ],
      pyqExampleId: "cdba0296-6c69-40f9-9940-33ad4aa61b33",
      traps: [
        {
          title: "Calling gypsum an antiseptic",
          body: "Gypsum is used to make plaster of Paris and in cement. Boric acid, not gypsum, is the mild antiseptic.",
        },
        {
          title: "Forgetting the water in the bleaching powder reaction",
          body: "Slaked lime and chlorine give bleaching powder and water, not calcium chloride.",
        },
        {
          title: "Getting the Bordeaux proportions wrong",
          body: "A 1% Bordeaux mixture is 1 : 1 : 100, blue vitriol to lime to water. The 1% refers to the blue vitriol in the water.",
        },
      ],
    },
  ],
};
