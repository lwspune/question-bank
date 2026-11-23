import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_ELECTROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Electrolytic Cell",
  title: "Electrolytic Cells and Quantitative Electrolysis",
  oneLineDefinition:
    "How an electrolytic cell forces a nonspontaneous reaction, the electrolysis of molten and aqueous NaCl, and how the charge passed fixes the moles of electrons and the mass of product.",
  whyItMatters:
    "22 questions. Eleven were set in board papers: state Faraday's two laws (2014), the current from a charge and a time (2016), the moles of aluminium from a number of faradays (2017), the faradays to make aluminium (2018), what electrometallurgy is (2020), the electrons to reduce Zn²⁺ (2022), the mass of copper deposited and the time to deposit it (2024), the gases from aqueous NaCl (2024 and 2025), and the charge to make sodium (2025). The textbook adds molten NaCl and KCl, two cells in series and the full mass calculation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccec-electrolytic-cell",
      name: "The electrolytic cell and electrolysis of molten NaCl",
      intuition:
        "Sodium chloride will never split into sodium and chlorine by itself. An electrolytic cell makes it happen: a battery acts as an electron pump, pulling electrons out at the anode and pushing them in at the cathode. In a galvanic cell it is the other way round: the reaction runs by itself and pushes the electrons.",
      definition:
        "- **Electrolysis** is the breaking down of an ionic compound, molten or in aqueous solution, by passing electricity.\n" +
        "- **Electrolytic cell:** a container of electrolyte with two electrodes, usually inert (Pt or graphite), joined to a source of direct current. A nonspontaneous reaction is forced to occur; electrical energy becomes chemical energy.\n" +
        "- The anode (+) is the electrode joined to the positive terminal; oxidation occurs there. The cathode (−) is joined to the negative terminal; reduction occurs there.\n" +
        "- **Molten NaCl:** Na⁺ and Cl⁻ are free to move. Anode: \\(2\\text{Cl}^- (l) \\to \\text{Cl}_2(g) + 2e^-\\) (each Cl⁻ gives an electron to form a Cl atom, the primary process; two Cl atoms join to Cl₂, the secondary process). Cathode: \\(2\\text{Na}^+(l) + 2e^- \\to 2\\text{Na}(l)\\).\n" +
        "- Net: \\(2\\text{Na}^+(l) + 2\\text{Cl}^-(l) \\to 2\\text{Na}(l) + \\text{Cl}_2(g)\\). Results: pale green Cl₂ at the anode, molten silvery white sodium at the cathode.\n" +
        "- A molten ionic compound gives the metal at the negative electrode and the nonmetal at the positive electrode.\n" +
        "- Board 2020 asked 'What is electrometallurgy?'. The present textbook does not use the word. Answer: getting a reactive metal such as sodium by electrolysis of its molten compound, as above.",
      table: {
        columns: ["Point", "Electrolytic cell", "Galvanic cell"],
        rows: [
          { cells: ["Energy change", "Electrical energy to chemical energy", "Chemical energy to electrical energy"] },
          { cells: ["Cell reaction", "Nonspontaneous, forced by a direct current", "Spontaneous"] },
          { cells: ["Sign of the anode", "Positive", "Negative"] },
          { cells: ["Sign of the cathode", "Negative", "Positive"] },
          {
            cells: ["Example", "Electrolysis of molten NaCl, giving sodium and chlorine", "Daniell cell (zinc and copper)"],
            pyqExampleId: "29148a93-bd8f-48e9-8880-513454f636ba",
            noteAmber: "Board 2020 asked what electrometallurgy is: give the molten NaCl example with both electrode reactions.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Write the electrode reactions for the electrolysis of molten MgCl₂.", answer: "Cathode: \\(\\text{Mg}^{2+} + 2e^- \\to \\text{Mg}\\); anode: \\(2\\text{Cl}^- \\to \\text{Cl}_2 + 2e^-\\)" },
        { prompt: "In the electrolysis of molten KBr, what forms at the cathode and what at the anode?", answer: "Potassium at the cathode, bromine at the anode" },
        { prompt: "What is the sign of the anode in an electrolytic cell?", answer: "Positive" },
        { prompt: "Why are Pt or graphite electrodes used in electrolysis?", answer: "They are inert: they do not take part in the reactions" },
      ],
      pyqExampleId: "29148a93-bd8f-48e9-8880-513454f636ba",
      traps: [
        {
          title: "Giving the galvanic signs to an electrolytic cell",
          body: "In an electrolytic cell the anode is positive and the cathode negative. In a galvanic cell it is the reverse. Oxidation is always at the anode in both.",
        },
        {
          title: "Writing chlorine as Cl at the anode",
          body: "Each Cl⁻ gives one electron to become a Cl atom, but two atoms join, so the product is Cl₂ and the balanced reaction has 2Cl⁻ and 2e⁻.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccec-aqueous-nacl",
      name: "Electrolysis of aqueous NaCl",
      intuition:
        "In water there is a new competitor at each electrode: water itself. At the cathode water is far easier to reduce than Na⁺, so hydrogen comes off and no sodium forms. At the anode water should win on standard potentials, but in practice chlorine comes off, because of overvoltage.",
      definition:
        "- **At the cathode:** reduction of Na⁺ (E⁰ = −2.71 V) competes with reduction of water (E⁰ = −0.83 V). Water has the higher potential, so it is reduced: \\(2\\text{H}_2\\text{O}(l) + 2e^- \\to \\text{H}_2(g) + 2\\text{OH}^-(aq)\\).\n" +
        "- **At the anode:** oxidation of Cl⁻ competes with oxidation of water to O₂. On standard potentials water should be oxidised, but experiments show Cl₂ is released, because of overvoltage: \\(2\\text{Cl}^-(aq) \\to \\text{Cl}_2(g) + 2e^-\\).\n" +
        "- **Overpotential** is the extra voltage, above the value from standard potentials, that is actually needed for electrolysis.\n" +
        "- **Net:** \\(2\\text{Cl}^-(aq) + 2\\text{H}_2\\text{O}(l) \\to \\text{Cl}_2(g) + \\text{H}_2(g) + 2\\text{OH}^-(aq)\\). Na⁺ stays unchanged and OH⁻ forms, so the solution becomes NaOH.",
      table: {
        columns: ["Point", "Molten NaCl", "Aqueous NaCl"],
        rows: [
          { cells: ["Species that can react", "Na⁺ and Cl⁻", "Na⁺, Cl⁻ and water"] },
          {
            cells: ["Product at the cathode", "Molten sodium", "Hydrogen gas"],
            pyqExampleId: "9ac68ccf-d2e7-4c74-b478-a81cd3392ae8",
            noteAmber: "Board 2025 asked which statement about aqueous NaCl is correct: H₂ at the cathode.",
          },
          {
            cells: ["Product at the anode", "Chlorine gas", "Chlorine gas"],
            pyqExampleId: "ecb9b2d6-2892-4129-916b-b060d15a08b6",
            noteAmber: "Board 2024 asked for the gases at the cathode and the anode: write both reactions.",
          },
          { cells: ["What is left in the cell", "Nothing; NaCl is used up", "NaOH solution"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is sodium not obtained when aqueous NaCl is electrolysed?", answer: "Water has a higher reduction potential (−0.83 V) than Na⁺ (−2.71 V), so water is reduced to hydrogen instead" },
        { prompt: "Why is Cl₂ and not O₂ released at the anode when aqueous NaCl is electrolysed?", answer: "Because of overvoltage" },
        { prompt: "Write the net reaction for the electrolysis of aqueous NaCl.", answer: "\\(2\\text{Cl}^- + 2\\text{H}_2\\text{O} \\to \\text{Cl}_2 + \\text{H}_2 + 2\\text{OH}^-\\)" },
      ],
      pyqExampleId: "ecb9b2d6-2892-4129-916b-b060d15a08b6",
      traps: [
        {
          title: "Writing sodium at the cathode for a solution",
          body: "Sodium forms only from molten NaCl. From aqueous NaCl the cathode gives hydrogen, with OH⁻ left in the solution.",
        },
        {
          title: "Expecting oxygen at the anode",
          body: "Standard potentials favour oxidising water, but the gas actually released is Cl₂. Name overvoltage as the reason.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-charge-moles",
      name: "Charge passed, moles of electrons and faradays",
      intuition:
        "Every electrode reaction is a recipe in electrons. Cu²⁺ needs two electrons for one copper atom; Al³⁺ needs three. So count the electrons you pass (from the charge) and the recipe tells you how much product you get, or count the product you want and the recipe tells you the charge.",
      definition:
        "- Charge passed: \\(Q\\ (\\text{C}) = I\\ (\\text{A}) \\times t\\ (\\text{s})\\).\n" +
        "- The charge on one mole of electrons is 96500 C, called one faraday (1 F).\n" +
        "- Moles of electrons passed \\(= \\dfrac{Q}{96500\\ \\text{C mol}^{-1}}\\).\n" +
        "- The balanced half reaction gives the electrons per mole of product: \\(\\text{Ag}^+ + e^- \\to \\text{Ag}\\) needs 1 F per mole, \\(\\text{Cu}^{2+} + 2e^- \\to \\text{Cu}\\) needs 2 F, \\(\\text{Al}^{3+} + 3e^- \\to \\text{Al}\\) needs 3 F.\n" +
        "- Faradays needed \\(=\\) moles of product \\(\\times\\) electrons in the half reaction.",
      formula: {
        label: "Charge and moles of electrons",
        latex: "Q = I \\times t, \\qquad \\text{moles of } e^- = \\frac{Q}{96500}",
      },
      authoredExample: {
        prompt:
          "A current of 2.5 A is passed through molten CaCl₂ for 1 hour. How many moles of electrons pass, and how many moles of calcium are formed?",
        steps: [
          "Given: \\(I = 2.5\\) A, \\(t = 1\\ \\text{h} = 3600\\) s.",
          "Charge: \\(Q = I \\times t = 2.5\\ \\text{A} \\times 3600\\ \\text{s} = 9000\\) C.",
          "Moles of electrons \\(= \\dfrac{9000\\ \\text{C}}{96500\\ \\text{C mol}^{-1}} = 0.0933\\) mol.",
          "Half reaction: \\(\\text{Ca}^{2+} + 2e^- \\to \\text{Ca}\\), so moles of Ca \\(= \\dfrac{0.0933}{2} = 0.0466\\) mol.",
        ],
        answer: "0.0933 mol of electrons; 0.0466 mol of calcium",
      },
      selfCheckExample: {
        prompt: "For how long must a current of 4 A flow to pass 0.5 mol of electrons?",
        steps: ["\\(Q = 0.5 \\times 96500 = 48250\\) C.", "\\(t = \\dfrac{Q}{I} = \\dfrac{48250}{4} = 12062.5\\) s."],
        answer: "12062.5 s, about 3.35 hours",
      },
      practiceSet: [
        { prompt: "A charge of 1800 C passes through a cell in 15 minutes. Find the current.", answer: "\\(I = 1800/900 = 2\\) A" },
        { prompt: "How many moles of magnesium are deposited from molten MgCl₂ by 2 F of electricity?", answer: "1 mol" },
        { prompt: "How many faradays are needed to reduce 1 mol of Au³⁺ to gold?", answer: "3 F" },
        { prompt: "What is one faraday?", answer: "The charge on one mole of electrons, 96500 C" },
      ],
      pyqExampleId: "13dfd175-5c18-4c1b-9123-a7f999041fb8",
      traps: [
        {
          title: "Time left in minutes",
          body: "\\(Q = It\\) needs t in seconds. Using minutes makes the charge 60 times too small.",
        },
        {
          title: "Ignoring the charge on the ion",
          body: "One faraday deposits one mole of Ag but only half a mole of Cu and a third of a mole of Al. Always write the half reaction first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-mass-deposited",
      name: "Mass of product and cells in series",
      intuition:
        "Put the last concept together: charge gives moles of electrons, the half reaction turns those into moles of product, and the molar mass turns moles into grams. When two cells are joined in series, the same charge flows through both, so the same moles of electrons reach each cathode.",
      definition:
        "- **Mole ratio** \\(= \\dfrac{\\text{moles of product formed in the half reaction}}{\\text{moles of electrons required in the half reaction}}\\); for Cu²⁺ it is 1/2.\n" +
        "- Moles of product \\(= \\dfrac{I \\times t}{96500} \\times \\text{mole ratio}\\).\n" +
        "- Mass of product \\(W = \\dfrac{I \\times t}{96500} \\times \\text{mole ratio} \\times \\text{molar mass}\\).\n" +
        "- **Cells in series:** the same charge passes through each, so \\(\\dfrac{W_1}{(\\text{mole ratio})_1 \\times M_1} = \\dfrac{W_2}{(\\text{mole ratio})_2 \\times M_2}\\).\n" +
        "- Board 2014 asked for Faraday's two laws, which the present textbook does not state by name. They follow from the formula above. **First law:** the mass deposited is directly proportional to the charge passed, \\(W \\propto Q\\). **Second law:** when the same charge passes through different electrolytes in series, the masses deposited are proportional to their equivalent masses (molar mass divided by the electrons in the half reaction).",
      formula: {
        label: "Mass of product in electrolysis",
        latex: "W = \\frac{I \\times t}{96500} \\times \\text{mole ratio} \\times M",
      },
      authoredExample: {
        prompt:
          "A current of 1.5 A is passed through silver nitrate solution for 20 minutes. Calculate the mass of silver deposited at the cathode. (Molar mass of Ag = 108 g mol⁻¹)",
        steps: [
          "Given: \\(I = 1.5\\) A, \\(t = 20 \\times 60 = 1200\\) s, \\(M = 108\\ \\text{g mol}^{-1}\\).",
          "Half reaction: \\(\\text{Ag}^+ + e^- \\to \\text{Ag}\\), so mole ratio \\(= 1/1\\).",
          "Formula: \\(W = \\dfrac{I \\times t}{96500} \\times \\text{mole ratio} \\times M\\).",
          "Substitution: \\(W = \\dfrac{1.5\\ \\text{A} \\times 1200\\ \\text{s}}{96500\\ \\text{C mol}^{-1}} \\times 1 \\times 108\\ \\text{g mol}^{-1} = 2.01\\) g.",
        ],
        answer: "Mass of silver deposited = 2.01 g",
      },
      selfCheckExample: {
        prompt:
          "A silver nitrate cell and a zinc sulphate cell are joined in series. If 1.08 g of silver is deposited in the first, what mass of zinc is deposited in the second? (Ag = 108, Zn = 65.4 g mol⁻¹)",
        steps: [
          "Moles of Ag \\(= 1.08/108 = 0.01\\) mol, so 0.01 mol of electrons passed.",
          "\\(\\text{Zn}^{2+} + 2e^- \\to \\text{Zn}\\): moles of Zn \\(= 0.01/2 = 0.005\\) mol; mass \\(= 0.005 \\times 65.4 = 0.327\\) g.",
        ],
        answer: "0.327 g of zinc",
      },
      practiceSet: [
        { prompt: "What is the mole ratio for the deposition of aluminium from Al³⁺?", answer: "1/3" },
        { prompt: "What mass of aluminium is deposited from Al³⁺ by 0.3 F of electricity? (Al = 27 g mol⁻¹)", answer: "\\(0.3/3 = 0.1\\) mol, that is 2.7 g" },
        { prompt: "State Faraday's first law of electrolysis.", answer: "The mass of substance deposited or liberated at an electrode is directly proportional to the quantity of electricity passed" },
      ],
      pyqExampleId: "cd10c2fe-87f5-43b4-afbc-78a2231b7192",
      traps: [
        {
          title: "Leaving out the mole ratio",
          body: "For a 2+ ion, \\(It/96500\\) is the moles of electrons, not of metal. Multiply by 1/2 before multiplying by the molar mass, or the mass comes out double.",
        },
        {
          title: "Cells in series with different charges",
          body: "In series the same charge, and so the same moles of electrons, passes through every cell. Only the mole ratio and the molar mass change from cell to cell.",
        },
        {
          title: "No unit on the answer",
          body: "Write g for a mass, s or minutes for a time and A for a current. A bare number loses the last mark of a numerical.",
        },
      ],
    },
  ],
};
