import type { SubtopicNote } from "@/app/notes/_types";

export const LAWS_COMBINATION_NOTE: SubtopicNote = {
  subtopicName: "Laws of Chemical Combination and Percentage Composition",
  title: "Laws of Chemical Combination and Percentage Composition",
  oneLineDefinition:
    "Five named laws fix the ratios in which elements combine (conservation of mass, definite and multiple proportions, reciprocal proportions and combining volumes, Avogadro's law), while percentage composition converts a formula into the mass fraction of each element.",
  whyItMatters:
    "Seven PYQs, split two ways. Four of them test the law of multiple proportions as a recognition task — pick the pair of compounds that does (or does not) demonstrate it — and the single give-away is whether the two compounds share the SAME two elements. The remaining three are one name-the-law question (definite proportions) and two short calculations (percentage of an element by mass, percent atom economy). So this subtopic is one recall table plus two one-line formulas — all EASY-to-MODERATE and heavily recall-driven.",
  concepts: [
    // reference table — the five named laws
    {
      kind: "reference" as const,
      slug: "cetsbcc-laws-named-laws",
      name: "The five laws of chemical combination",
      intuition:
        "These are the named rules the paper asks you to recognise from a one-line statement or a worked example. Learn each law's name, its one-line statement, and one stock example — that is exactly what the MCQs test.",
      definition:
        "Five laws govern how elements combine, each tested by either its definition or a 'which law is shown' example:\n" +
        "- **Law of conservation of mass** — total mass of reactants equals total mass of products.\n" +
        "- **Law of definite (constant) proportions** — a pure compound always has the same elements in the same fixed mass ratio.\n" +
        "- **Law of multiple proportions** — when the **same** two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in small whole-number ratios.\n" +
        "- **Gay-Lussac's law of combining volumes** — gases combine in simple whole-number volume ratios (at the same temperature and pressure).\n" +
        "- **Avogadro's law** — equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.",
      table: {
        columns: ["Law", "Statement", "Stock example"],
        rows: [
          {
            cells: [
              "Law of conservation of mass",
              "Matter can neither be created nor destroyed in a chemical reaction; total mass of reactants = total mass of products.",
              "\\(1.7\\) g \\(\\text{AgNO}_3 + 0.585\\) g \\(\\text{NaCl}\\) give \\(1.435\\) g \\(\\text{AgCl} + 0.85\\) g \\(\\text{NaNO}_3\\); both sides total \\(2.285\\) g.",
            ],
          },
          {
            cells: [
              "Law of definite (constant) proportions",
              "A given pure compound always contains the same elements in the same fixed proportion by mass, whatever its source.",
              "Water is always \\(1 : 8\\) hydrogen to oxygen by mass.",
            ],
            noteAmber:
              "Also called Proust's law. The tell-tale phrase in an MCQ is 'a given compound always contains the same proportion of elements'.",
            pyqExampleId: "4fd61faf-3c85-4441-8216-36e784480cad",
          },
          {
            cells: [
              "Law of multiple proportions",
              "When the same two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a ratio of small whole numbers.",
              "\\(\\text{CO}\\) and \\(\\text{CO}_2\\): oxygen masses per fixed carbon are in a \\(1 : 2\\) ratio.",
            ],
            noteAmber:
              "The most-asked law here. It ONLY applies when both compounds contain the SAME two elements — this is the whole basis of the 'which pair cannot demonstrate it' questions.",
            pyqExampleId: "24c25d49-7121-46f0-bced-5335b3b0ea79",
          },
          {
            cells: [
              "Gay-Lussac's law of combining volumes",
              "Gases combine (and form gaseous products) in volume ratios that are simple whole numbers, at the same temperature and pressure.",
              "\\(1\\) volume \\(\\text{N}_2 + 3\\) volumes \\(\\text{H}_2 \\to 2\\) volumes \\(\\text{NH}_3\\) (a \\(1 : 3 : 2\\) ratio).",
            ],
            noteAmber:
              "Sometimes phrased as the law of reciprocal proportions in older texts — both express fixed combining relationships; for gases the paper uses the combining-volumes form.",
          },
          {
            cells: [
              "Avogadro's law",
              "Equal volumes of all gases at the same temperature and pressure contain an equal number of molecules.",
              "\\(22.4\\) L of any gas at STP contains \\(1\\) mole \\((6.022\\times10^{23}\\) molecules\\()\\).",
            ],
          },
        ],
        caption: "Recognise the law from either its definition or a worked example.",
      },
      pyqExampleId: "a3140a00-e79a-4ce7-9d63-90f068976241", // H2O and H2O2 -> multiple proportions
      selfCheckExample: {
        prompt:
          "Which law is illustrated by the compounds H2O and H2O2, both formed from the two elements H and O?",
        steps: [
          "Both compounds contain the SAME two elements, H and O — the pre-condition for multiple proportions.",
          "For a fixed \\(2\\) g of hydrogen, oxygen is \\(16\\) g in \\(\\text{H}_2\\text{O}\\) and \\(32\\) g in \\(\\text{H}_2\\text{O}_2\\).",
          "These oxygen masses are in a simple \\(16 : 32 = 1 : 2\\) whole-number ratio.",
        ],
        answer: "Law of multiple proportions.",
      },
      practiceSet: [
        { prompt: "Which law states matter can neither be created nor destroyed?", answer: "Law of conservation of mass" },
        { prompt: "'A given compound always contains the same proportion of elements' states which law?", answer: "Law of definite (constant) proportions" },
        { prompt: "CO and CO2 (oxygen in a 1 : 2 ratio per fixed carbon) illustrate which law?", answer: "Law of multiple proportions" },
        { prompt: "Which law says equal volumes of gases at the same T and P have equal numbers of molecules?", answer: "Avogadro's law" },
      ],
      traps: [
        {
          title: "Multiple proportions needs the SAME two elements",
          body:
            "A pair like \\(\\text{Na}_2\\text{S}\\) and \\(\\text{NaF}\\) (elements S and F differ), or \\(\\text{NaNO}_3\\) and \\(\\text{CaCO}_3\\), CANNOT demonstrate multiple proportions — the law compares two compounds built from the identical pair of elements (like \\(\\text{CO}/\\text{CO}_2\\) or \\(\\text{NO}/\\text{NO}_2\\)). Check the elements first, not the subscripts.",
        },
        {
          title: "Definite vs multiple proportions",
          body:
            "**Definite** proportions = ONE compound with ONE fixed internal ratio. **Multiple** proportions = TWO different compounds of the same two elements, in small whole-number ratios. If the question names two compounds being compared, it is multiple; if it describes one compound's constant make-up, it is definite.",
        },
      ],
    },

    // Dalton's atomic theory — the postulates that explain the laws
    {
      kind: "reference" as const,
      slug: "cetsbcc-laws-dalton-atomic-theory",
      name: "Dalton's atomic theory",
      intuition:
        "John Dalton (1808) explained WHY the laws of chemical combination hold: matter is built from atoms that keep their identity through a reaction. Learn the postulates and which law each accounts for — the paper tests them as straight recall and as 'which postulate is no longer valid'.",
      definition:
        "Dalton's atomic theory rests on a few postulates:\n" +
        "- **Matter is made of atoms** — tiny, indivisible particles.\n" +
        "- **Atoms of one element are identical** in mass and properties; atoms of different elements differ.\n" +
        "- **Atoms combine in small whole-number ratios** to form compounds.\n" +
        "- **Atoms are neither created nor destroyed** in a chemical reaction — they only rearrange.\n" +
        "Together these explain the laws of conservation of mass, definite proportions and multiple proportions.",
      table: {
        columns: ["Postulate", "What it states", "Explains / modern status"],
        rows: [
          {
            cells: [
              "Atoms exist",
              "Matter is made of extremely small, indivisible particles called atoms.",
              "Modern caveat: the atom IS divisible into protons, neutrons and electrons.",
            ],
          },
          {
            cells: [
              "Atoms of an element are identical",
              "All atoms of a given element have the same mass and chemical properties.",
              "Modern caveat: isotopes are atoms of one element with different masses.",
            ],
          },
          {
            cells: [
              "Small whole-number combining ratio",
              "Atoms of different elements combine in simple whole-number ratios to form compounds.",
              "Explains the laws of definite and multiple proportions.",
            ],
          },
          {
            cells: [
              "Atoms are conserved",
              "Atoms are neither created nor destroyed in a chemical reaction; they are only rearranged.",
              "Explains the law of conservation of mass.",
            ],
          },
        ],
        caption: "The postulates that underlie the laws of chemical combination; two are now known to have exceptions.",
      },
      practiceSet: [
        { prompt: "According to Dalton, are atoms created or destroyed in a chemical reaction?", answer: "No — they are only rearranged (this explains the law of conservation of mass)." },
        { prompt: "Which modern discovery contradicts Dalton's postulate that all atoms of an element are identical in mass?", answer: "Isotopes (same element, different mass)." },
        { prompt: "Which modern discovery contradicts Dalton's postulate that the atom is indivisible?", answer: "Sub-atomic particles — the electron, proton and neutron." },
        { prompt: "Which law does Dalton's whole-number combining-ratio postulate explain?", answer: "The laws of definite and multiple proportions." },
      ],
      traps: [
        {
          title: "Two postulates have modern exceptions",
          body:
            "Dalton claimed atoms are **indivisible** and that all atoms of an element are **identical in mass** — both are now known to be wrong (atoms split into sub-atomic particles; isotopes differ in mass). The postulates about small whole-number combining ratios and conservation of atoms in a reaction still hold.",
        },
      ],
    },

    // percentage composition by mass
    {
      kind: "formula" as const,
      slug: "cetsbcc-laws-percentage-composition",
      name: "Percentage composition by mass",
      intuition:
        "The percentage of an element in a compound is just its total mass inside one formula unit divided by the whole molar mass, times 100. Count the atoms of that element, multiply by its atomic mass, divide by the compound's molar mass.",
      definition:
        "Percentage composition rule:\n" +
        "- **Molar mass** = sum of (atoms × atomic mass) over every element in the formula.\n" +
        "- **Percentage of an element** \\(= \\dfrac{(\\text{atoms of that element}) \\times (\\text{its atomic mass})}{\\text{molar mass of the compound}} \\times 100\\).\n" +
        "- The percentages of all elements in the compound add up to \\(100\\%\\).",
      formula: {
        label: "Mass percentage of an element",
        latex: "\\%\\,\\text{element} = \\dfrac{n \\times A}{M} \\times 100",
        symbols: [
          { symbol: "n", meaning: "number of atoms of that element in one formula unit" },
          { symbol: "A", meaning: "atomic mass of that element" },
          { symbol: "M", meaning: "molar mass of the whole compound" },
        ],
      },
      pyqExampleId: "a19b7eb7-0531-44e5-bb84-bc1ff7204343", // % O in NaOH = 40
      authoredExample: {
        prompt: "Find the percentage by mass of nitrogen in ammonium nitrate, NH4NO3. (N = 14, H = 1, O = 16)",
        steps: [
          "Molar mass of \\(\\text{NH}_4\\text{NO}_3 = 2(14) + 4(1) + 3(16) = 28 + 4 + 48 = 80\\) g/mol.",
          "There are 2 nitrogen atoms, contributing \\(2 \\times 14 = 28\\) g.",
          "\\(\\% \\text{N} = \\dfrac{28}{80} \\times 100 = 35\\%\\).",
        ],
        answer: "\\(35\\%\\).",
      },
      selfCheckExample: {
        prompt: "Find the percentage by mass of carbon in CO2. (C = 12, O = 16)",
        steps: [
          "Molar mass of \\(\\text{CO}_2 = 12 + 2(16) = 44\\) g/mol.",
          "Carbon contributes \\(1 \\times 12 = 12\\) g.",
          "\\(\\% \\text{C} = \\dfrac{12}{44} \\times 100 \\approx 27.3\\%\\).",
        ],
        answer: "About \\(27.3\\%\\).",
      },
      practiceSet: [
        { prompt: "Molar mass of NaOH (Na = 23, O = 16, H = 1)?", answer: "40 g/mol" },
        { prompt: "% by mass of sodium in NaOH?", answer: "57.5%", method: "\\((23/40)\\times100\\)" },
        { prompt: "% by mass of hydrogen in H2O (H = 1, O = 16)?", answer: "About 11.1%", method: "\\((2/18)\\times100\\)" },
      ],
      traps: [
        {
          title: "Multiply by the number of atoms, not just the atomic mass",
          body:
            "For water \\(\\text{H}_2\\text{O}\\), hydrogen contributes \\(2 \\times 1 = 2\\) g, not \\(1\\) g — there are two H atoms. Always use \\(n \\times A\\) in the numerator, and remember the percentages of every element must sum to \\(100\\%\\).",
        },
      ],
    },

    // percent atom economy
    {
      kind: "formula" as const,
      slug: "cetsbcc-laws-atom-economy",
      name: "Percent atom economy",
      intuition:
        "Atom economy asks what fraction of the reactant mass actually ends up in the product you want. Divide the formula weight of the desired product by the total formula weight of all reactants, then multiply by 100 — a green-chemistry efficiency measure.",
      definition:
        "Percent atom economy:\n" +
        "- **Percent atom economy** \\(= \\dfrac{\\text{formula weight of desired product}}{\\text{sum of formula weights of all reactants}} \\times 100\\).\n" +
        "- A higher value means less mass is wasted as by-products; a value of \\(100\\%\\) means every atom of the reactants ends up in the wanted product.",
      formula: {
        label: "Percent atom economy",
        latex: "\\%\\,\\text{atom economy} = \\dfrac{\\text{FW of desired product}}{\\sum \\text{FW of reactants}} \\times 100",
      },
      pyqExampleId: "694cb076-af0c-42be-8828-3aaf5b905d10", // 65/78 -> 83%
      authoredExample: {
        prompt:
          "Reactants with a total formula weight of 78 u form a desired product of formula weight 65 u. What is the percent atom economy?",
        steps: [
          "\\(\\% \\text{atom economy} = \\dfrac{\\text{FW of product}}{\\sum \\text{FW of reactants}} \\times 100\\).",
          "\\(= \\dfrac{65}{78} \\times 100\\).",
          "\\(\\approx 83.3\\%\\).",
        ],
        answer: "About \\(83\\%\\).",
      },
      selfCheckExample: {
        prompt:
          "Reactants of total formula weight 120 u give a desired product of formula weight 90 u. Find the percent atom economy.",
        steps: [
          "\\(\\% \\text{atom economy} = \\dfrac{90}{120} \\times 100\\).",
          "\\(= 75\\%\\).",
        ],
        answer: "\\(75\\%\\).",
      },
      practiceSet: [
        { prompt: "Product FW 50 u from reactants totalling 100 u — atom economy?", answer: "50%", method: "\\((50/100)\\times100\\)" },
        { prompt: "Product FW 44 u from reactants totalling 44 u — atom economy?", answer: "100%" },
        { prompt: "Does a higher atom economy mean more or less wasted mass?", answer: "Less wasted mass" },
      ],
      traps: [
        {
          title: "Product over reactants, not the other way round",
          body:
            "The desired product's formula weight is the NUMERATOR and the total reactant weight is the denominator. Flipping them (e.g. \\(78/65\\)) gives a nonsensical value above \\(100\\%\\). Atom economy can never exceed \\(100\\%\\).",
        },
      ],
    },
  ],
};
