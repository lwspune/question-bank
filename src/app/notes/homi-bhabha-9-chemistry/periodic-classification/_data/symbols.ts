import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EP_SYMBOLS_NOTE: SubtopicNote = {
  subtopicName: "Symbols, Formulae and Valency",
  title: "Symbols, Formulae and Valency",
  oneLineDefinition:
    "Every element has a one or two letter symbol, some taken from Latin names, and a compound's formula is written by balancing the valencies of the parts that make it.",
  whyItMatters:
    "Nine questions in the bank, four EASY and five MODERATE. Four are about symbols: Dalton's sign for an element, two odd-one-out questions on symbols from Latin names, and the element with atomic number 30. Five are about formulae: aluminium sulphate, sodium thiosulphate, sodium zincate, a nitride worked out from a sulphate's formula, and which molecule has four atoms.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9epsy-symbols",
      name: "Symbols of elements, from Dalton to Latin names",
      intuition:
        "Writing 'sodium chloride' again and again is slow, so chemists use short symbols. Dalton drew a different circle for each element. Today we use letters: usually the first one or two letters of the English name, but for some old, well known metals the letters come from their Latin names, which is why sodium is Na and not So.",
      definition:
        "- **Dalton** used **circles** as symbols: a circle with a **dot at the centre** for **hydrogen**, a plain circle for **oxygen**, a filled black circle for **carbon**, and a circle with a **letter** inside for many metals (C for copper, S for silver, G for gold).\n" +
        "- **Berzelius** began the modern system: the **first letter** of the name as a **capital**, and if needed a **second letter in small type**.\n" +
        "- Some symbols come from **Latin** names: Na, K, Fe, Cu, Ag, Au, Pb, Hg, Sn.\n" +
        "- Elements 21 to 30: Sc, Ti, V, Cr, Mn, **Fe (26)**, **Co (27)**, **Ni (28)**, **Cu (29)**, **Zn (30)**.",
      table: {
        columns: ["Element", "Symbol", "Name the symbol comes from"],
        rows: [
          { cells: ["Sodium", "Na", "Natrium (Latin)"] },
          { cells: ["Potassium", "K", "Kalium (Latin)"] },
          { cells: ["Iron", "Fe", "Ferrum (Latin)"] },
          { cells: ["Copper", "Cu", "Cuprum (Latin)"] },
          { cells: ["Silver", "Ag", "Argentum (Latin)"] },
          { cells: ["Gold", "Au", "Aurum (Latin)"] },
          { cells: ["Lead", "Pb", "Plumbum (Latin)"] },
          { cells: ["Mercury", "Hg", "Hydrargyrum (Latin)"] },
          { cells: ["Tin", "Sn", "Stannum (Latin)"] },
          { cells: ["Magnesium", "Mg", "Magnesium (English)"] },
          { cells: ["Aluminium", "Al", "Aluminium (English)"] },
          { cells: ["Zinc", "Zn", "Zinc (English)"] },
        ],
        caption: "An odd-one-out question on symbols hides one English-name symbol among Latin ones, or the other way round.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out by where the symbol comes from: iron, copper, nitrogen, lead.",
        steps: [
          "Iron (Fe), copper (Cu) and lead (Pb) take their symbols from Latin names.",
          "Nitrogen (N) takes its symbol from its English name.",
        ],
        answer: "Nitrogen",
      },
      practiceSet: [
        { prompt: "What is the symbol of potassium, and from which Latin name does it come?", answer: "K, from Kalium" },
        { prompt: "What symbol did Dalton use for oxygen?", answer: "A plain circle" },
        { prompt: "Which element has atomic number 26?", answer: "Iron, Fe" },
        { prompt: "Why is Co the symbol of cobalt while CO is not the symbol of any element?", answer: "A symbol has one capital letter and a small second letter; CO has two capitals, so it is the formula of carbon monoxide (carbon and oxygen)" },
      ],
      pyqExampleId: "56eb6b41-5531-4d43-8188-9eacc584e296",
      traps: [
        {
          title: "Writing the second letter as a capital",
          body: "Only the first letter of a symbol is a capital. Co is cobalt; CO is carbon monoxide, a compound of carbon and oxygen.",
        },
        {
          title: "Guessing a symbol from the English name",
          body: "Sodium is Na, potassium K, iron Fe, silver Ag and gold Au: their symbols come from Latin names, not English ones.",
        },
        {
          title: "Mixing up Dalton's circles",
          body: "In Dalton's signs a circle with a dot at the centre is hydrogen; a plain circle is oxygen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9epsy-formulae",
      name: "Writing formulae from valency",
      intuition:
        "Valency is how many bonds an atom or a group of atoms can make, like the number of hands it has. In a compound every hand must be held, so the two parts join in the numbers that use up all the hands on both sides. Swap the valencies across and you have the formula.",
      definition:
        "- **Valency** is the combining capacity of an atom or a radical. Common valencies: **1**: Na, K, Ag, H, Cl, OH, \\(\\mathrm{NO_3}\\), \\(\\mathrm{HCO_3}\\). **2**: Mg, Ca, Zn, O, \\(\\mathrm{SO_4}\\), \\(\\mathrm{CO_3}\\), \\(\\mathrm{S_2O_3}\\) (thiosulphate), \\(\\mathrm{ZnO_2}\\) (zincate). **3**: Al, N (nitride), \\(\\mathrm{PO_4}\\).\n" +
        "- **Cross-over method**: write the two symbols, write each valency above, swap them down as subscripts, and cancel any common factor. Put a **radical** in a **bracket** when it is taken more than once.\n" +
        "- **Working back**: from a known formula, find the valency of an unknown element, then use it in a new formula.\n" +
        "- **Atomicity** is the number of atoms in one molecule: He and Ne 1, \\(\\mathrm{H_2}\\), \\(\\mathrm{O_2}\\), \\(\\mathrm{N_2}\\), \\(\\mathrm{Cl_2}\\) 2, \\(\\mathrm{O_3}\\) 3, \\(\\mathrm{P_4}\\) 4, \\(\\mathrm{S_8}\\) 8.",
      formula: {
        label: "Valencies balance in a formula",
        latex: "\\text{valency of A} \\times n_A = \\text{valency of B} \\times n_B",
        symbols: [
          { symbol: "nA", meaning: "number of A atoms or groups in the formula" },
          { symbol: "nB", meaning: "number of B atoms or groups in the formula" },
        ],
      },
      authoredExample: {
        prompt: "Write the formula of calcium phosphate. (Valency of calcium 2, of phosphate 3)",
        steps: [
          "Write Ca and \\(\\mathrm{PO_4}\\), with valencies 2 and 3.",
          "Swap them: Ca takes 3, \\(\\mathrm{PO_4}\\) takes 2, so \\(\\mathrm{Ca_3(PO_4)_2}\\).",
          "Check: \\(3 \\times 2 = 6\\) and \\(2 \\times 3 = 6\\), so the valencies balance.",
        ],
        answer: "\\(\\mathrm{Ca_3(PO_4)_2}\\)",
      },
      selfCheckExample: {
        prompt: "Write the formula of sodium carbonate. (Valency of sodium 1, of carbonate 2)",
        steps: ["Swap the valencies: Na takes 2 and \\(\\mathrm{CO_3}\\) takes 1."],
        answer: "\\(\\mathrm{Na_2CO_3}\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of aluminium oxide.", answer: "\\(\\mathrm{Al_2O_3}\\)" },
        { prompt: "An element X forms the chloride \\(\\mathrm{XCl_2}\\). What is the formula of its oxide?", answer: "XO: X has valency 2, the same as oxygen" },
        { prompt: "Write the formula of calcium hydroxide.", answer: "\\(\\mathrm{Ca(OH)_2}\\)" },
        { prompt: "How many atoms are there in one molecule of sulphur?", answer: "Eight: \\(\\mathrm{S_8}\\)" },
      ],
      pyqExampleId: "3235928f-aeb3-4356-9eb0-10cf14d14ade",
      traps: [
        {
          title: "Not cancelling a common factor",
          body: "Magnesium (2) and oxygen (2) swap to \\(\\mathrm{Mg_2O_2}\\), which must be cancelled to MgO.",
        },
        {
          title: "Leaving out the bracket",
          body: "When a radical is taken more than once it goes in a bracket: \\(\\mathrm{Ca(OH)_2}\\), not \\(\\mathrm{CaOH_2}\\).",
        },
        {
          title: "Mixing up sulphate and thiosulphate",
          body: "Sulphate is \\(\\mathrm{SO_4}\\); thiosulphate is \\(\\mathrm{S_2O_3}\\). Both have valency 2, so sodium sulphate is \\(\\mathrm{Na_2SO_4}\\) and sodium thiosulphate is \\(\\mathrm{Na_2S_2O_3}\\).",
        },
        {
          title: "Calling every gas molecule diatomic",
          body: "Hydrogen, oxygen and chlorine molecules have two atoms, but noble gases have one, ozone three, phosphorus four and sulphur eight.",
        },
      ],
    },
  ],
};
