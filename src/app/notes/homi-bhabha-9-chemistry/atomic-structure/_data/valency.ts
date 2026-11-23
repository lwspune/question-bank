import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AT_VALENCY_NOTE: SubtopicNote = {
  subtopicName: "Valency, Radicals and Formulae",
  title: "Valency, Radicals and Formulae",
  oneLineDefinition:
    "Valency is an atom's or radical's combining capacity; read it off one formula, then cross the valencies to write any other formula, and remember that a radical carries its charge as a group.",
  whyItMatters:
    "The busiest page of the chapter: ten questions, five EASY and five MODERATE. Six use valency (the oxide from a chloride, the nitride from a sulphate, the sulphate and hydroxide from a chloride, valencies read from iodides, stannic and stannous tin, variable valency), and four name radicals: the ions of calcium phosphate and sodium phosphate, which radicals are basic, and which are polyatomic and negative.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9atva-formula",
      name: "Valency and writing formulae",
      intuition:
        "Valency is how many hands an atom has for holding others. Chlorine and hydrogen have one hand, oxygen has two. If a metal holds three chlorine atoms, it has three hands, and it will hold oxygen atoms in the ratio that uses every hand on both sides. Crossing the valencies does exactly that.",
      definition:
        "- **Valency** is the combining capacity of an atom or radical. Take Cl, H, OH and \\(\\mathrm{NO_3}\\) as 1; O and \\(\\mathrm{SO_4}\\) and \\(\\mathrm{CO_3}\\) as 2; N (nitride) and \\(\\mathrm{PO_4}\\) as 3.\n" +
        "- **Reading a valency**: in \\(\\mathrm{XCl_n}\\) the valency of X is n. In \\(\\mathrm{X_a(SO_4)_b}\\): \\(a \\times\\) valency of X \\(= b \\times 2\\).\n" +
        "- **Writing a formula**: swap the valencies and use them as subscripts, then cut to the simplest ratio. A radical used more than once goes in **brackets**: \\(\\mathrm{Ca(OH)_2}\\).\n" +
        "- **Variable valency**: some metals show two valencies. The ending **-ous** means the **lower**, **-ic** the **higher**: ferrous 2 and ferric 3, cuprous 1 and cupric 2, stannous 2 and stannic 4, mercurous 1 and mercuric 2.\n" +
        "- Fixed valencies: Na, K, Ag 1; Mg, Ca, Zn 2; Al 3.",
      formula: {
        label: "Crossing the valencies",
        latex: "\\text{valency } a \\text{ of A},\\ \\text{valency } b \\text{ of B} \\;\\Rightarrow\\; \\mathrm{A}_b\\mathrm{B}_a \\ (\\text{simplest ratio})",
        symbols: [
          { symbol: "a", meaning: "valency of A, written as the subscript of B" },
          { symbol: "b", meaning: "valency of B, written as the subscript of A" },
        ],
      },
      authoredExample: {
        prompt: "The chloride of a metal R is \\(\\mathrm{RCl_2}\\). Write the formula of its phosphate.",
        steps: [
          "R holds two Cl atoms of valency 1, so R has valency 2.",
          "Phosphate, \\(\\mathrm{PO_4}\\), has valency 3.",
          "Cross the valencies: \\(\\mathrm{R_3(PO_4)_2}\\). The ratio 3 : 2 cannot be cut further.",
        ],
        answer: "\\(\\mathrm{R_3(PO_4)_2}\\)",
      },
      selfCheckExample: {
        prompt: "The oxide of an element Z is \\(\\mathrm{ZO_2}\\). What is the formula of its chloride?",
        steps: ["Two O atoms of valency 2 give Z a valency of 4.", "Chlorine has valency 1, so Z holds four Cl atoms."],
        answer: "\\(\\mathrm{ZCl_4}\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of aluminium oxide (valency of Al 3, of O 2).", answer: "\\(\\mathrm{Al_2O_3}\\)" },
        { prompt: "What valency does iron show in a ferric compound?", answer: "3" },
        { prompt: "A metal X forms the oxide \\(\\mathrm{X_2O}\\). What is the formula of its sulphate?", answer: "\\(\\mathrm{X_2SO_4}\\) (X has valency 1)" },
        { prompt: "What is the valency of nitrogen in \\(\\mathrm{NH_3}\\)?", answer: "3" },
      ],
      pyqExampleId: "614a6143-590e-4d7b-9d1b-9d8c591c1f13",
      traps: [
        {
          title: "Leaving out the brackets",
          body: "Two hydroxide groups are written \\(\\mathrm{Ca(OH)_2}\\), not \\(\\mathrm{CaOH_2}\\). The brackets show that the whole radical is doubled.",
        },
        {
          title: "Not cutting to the simplest ratio",
          body: "Magnesium (2) and oxygen (2) cross to \\(\\mathrm{Mg_2O_2}\\), which is written \\(\\mathrm{MgO}\\).",
        },
        {
          title: "Swapping -ous and -ic",
          body: "-ous is the lower valency and -ic the higher: stannous tin is 2 and stannic tin is 4.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9atva-radicals",
      name: "Basic and acidic radicals",
      intuition:
        "A radical is an ion, one atom or a group of atoms, that moves into a compound as a single unit with its own charge. In a salt the positive part came from the base and the negative part from the acid, so they are called the basic radical and the acidic radical.",
      definition:
        "- A **radical** is an ion that takes part in a compound as one unit. A **polyatomic** radical has several atoms, such as \\(\\mathrm{SO_4^{2-}}\\); a **monatomic** one has one, such as \\(\\mathrm{Cl^-}\\).\n" +
        "- **Basic radicals** are the **positive** ions: \\(\\mathrm{Na^+}\\), \\(\\mathrm{K^+}\\), \\(\\mathrm{Ag^+}\\), \\(\\mathrm{Ca^{2+}}\\), \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{NH_4^+}\\).\n" +
        "- **Acidic radicals** are the **negative** ions: \\(\\mathrm{Cl^-}\\), \\(\\mathrm{Br^-}\\), \\(\\mathrm{I^-}\\), \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{SO_4^{2-}}\\), \\(\\mathrm{PO_4^{3-}}\\) and the others in the table.\n" +
        "- The charge of a radical is its valency: calcium phosphate is built from \\(\\mathrm{Ca^{2+}}\\) and \\(\\mathrm{PO_4^{3-}}\\), giving \\(\\mathrm{Ca_3(PO_4)_2}\\).",
      table: {
        columns: ["Radical", "Formula", "Charge"],
        rows: [
          { cells: ["Ammonium", "\\(\\mathrm{NH_4^+}\\)", "+1 (the common positive polyatomic radical)"], noteAmber: "Polyatomic but POSITIVE: a basic radical." },
          { cells: ["Hydroxide", "\\(\\mathrm{OH^-}\\)", "−1"] },
          { cells: ["Nitrate", "\\(\\mathrm{NO_3^-}\\)", "−1"] },
          { cells: ["Nitrite", "\\(\\mathrm{NO_2^-}\\)", "−1"] },
          { cells: ["Bicarbonate", "\\(\\mathrm{HCO_3^-}\\)", "−1"] },
          { cells: ["Permanganate", "\\(\\mathrm{MnO_4^-}\\)", "−1"] },
          { cells: ["Carbonate", "\\(\\mathrm{CO_3^{2-}}\\)", "−2"] },
          { cells: ["Sulphate", "\\(\\mathrm{SO_4^{2-}}\\)", "−2"] },
          { cells: ["Sulphite", "\\(\\mathrm{SO_3^{2-}}\\)", "−2"] },
          { cells: ["Phosphate", "\\(\\mathrm{PO_4^{3-}}\\)", "−3"] },
        ],
        caption: "Every polyatomic radical in this table is negative except ammonium.",
      },
      selfCheckExample: {
        prompt: "Which two radicals make up aluminium sulphate, and what is its formula?",
        steps: ["Aluminium forms \\(\\mathrm{Al^{3+}}\\); sulphate is \\(\\mathrm{SO_4^{2-}}\\).", "Cross the charges: two Al and three sulphate."],
        answer: "\\(\\mathrm{Al^{3+}}\\) and \\(\\mathrm{SO_4^{2-}}\\); \\(\\mathrm{Al_2(SO_4)_3}\\)",
      },
      practiceSet: [
        { prompt: "Is the ammonium ion a basic radical or an acidic radical?", answer: "A basic radical, because it is positive" },
        { prompt: "What is the charge on the carbonate ion?", answer: "−2" },
        { prompt: "Is the bromide ion, Br⁻, a polyatomic radical?", answer: "No: it has only one atom" },
        { prompt: "Name the two radicals of potassium nitrate.", answer: "\\(\\mathrm{K^+}\\) and \\(\\mathrm{NO_3^-}\\)" },
      ],
      pyqExampleId: "c7d84d8a-9486-4936-a246-e03cd93bf0dd",
      traps: [
        {
          title: "Calling every polyatomic ion negative",
          body: "The ammonium ion, \\(\\mathrm{NH_4^+}\\), is made of five atoms and is positive. It is a basic radical.",
        },
        {
          title: "Giving phosphate a charge of −1 or −2",
          body: "Phosphate is \\(\\mathrm{PO_4^{3-}}\\). That is why potassium phosphate needs three potassium ions: \\(\\mathrm{K_3PO_4}\\).",
        },
        {
          title: "Writing the number of ions as the charge",
          body: "\\(\\mathrm{Ca_3(PO_4)_2}\\) contains three \\(\\mathrm{Ca^{2+}}\\) ions and two \\(\\mathrm{PO_4^{3-}}\\) ions. The 3 and 2 are counts, not charges.",
        },
      ],
    },
  ],
};
