import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_INO_OXIDATION_NOTE: SubtopicNote = {
  subtopicName: "Oxidation Numbers and Formulas",
  title: "Oxidation Numbers, Common Ions and Writing Formulas",
  oneLineDefinition:
    "Every atom in a compound gets an oxidation number by fixed rules; they always add up to the overall charge, which lets you check or build any formula.",
  whyItMatters:
    "The older papers asked which formula of a compound is wrong (2012), which formula fits a given set of oxidation numbers (2015), and what the formula Br₂ represents (2020). All three are charge-balance checks.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ino-ox-rules",
      name: "Rules for assigning oxidation numbers",
      intuition:
        "An oxidation number is the charge an atom would carry if every bond in the compound were fully ionic, with the shared electrons given to the more electronegative atom. It is bookkeeping, not a real charge. Because charge is never lost, the numbers in a neutral compound must add up to zero.",
      definition:
        "Apply the rules in this order of priority:\n" +
        "- An atom in an **element** is 0: Na, \\(\\mathrm{O_2}\\), \\(\\mathrm{Br_2}\\), \\(\\mathrm{S_8}\\).\n" +
        "- A **monatomic ion** has its charge: \\(\\mathrm{Fe^{3+}}\\) is \\(+3\\), \\(\\mathrm{Cl^-}\\) is \\(-1\\).\n" +
        "- **F** is always \\(-1\\). **Group 1** metals are \\(+1\\), **Group 2** \\(+2\\), Al \\(+3\\).\n" +
        "- **H** is \\(+1\\) with non-metals, but \\(-1\\) in metal hydrides (NaH, \\(\\mathrm{CaH_2}\\)).\n" +
        "- **O** is \\(-2\\), except in peroxides (\\(\\mathrm{H_2O_2}\\), \\(\\mathrm{Na_2O_2}\\)) where it is \\(-1\\), and in \\(\\mathrm{OF_2}\\) where it is \\(+2\\).\n" +
        "- The sum is **0** for a neutral compound and equals the **charge** for an ion. Solve for the one unknown.",
      formula: {
        label: "Sum of oxidation numbers",
        latex: "\\sum (\\text{number of atoms} \\times \\text{oxidation number}) = \\text{overall charge}",
        symbols: [
          { symbol: "overall charge", meaning: "0 for a compound, the ion's charge for an ion" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the oxidation number of chromium in potassium dichromate, \\(\\mathrm{K_2Cr_2O_7}\\), and of sulfur in the thiosulfate ion, \\(\\mathrm{S_2O_3^{2-}}\\).",
        steps: [
          "\\(\\mathrm{K_2Cr_2O_7}\\) is neutral: \\(2(+1) + 2x + 7(-2) = 0\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "\\(\\mathrm{S_2O_3^{2-}}\\) has charge \\(-2\\): \\(2x + 3(-2) = -2\\), so \\(2x = 4\\) and \\(x = +2\\).",
          "Multiply by the number of atoms of the unknown element before dividing: there are two Cr and two S.",
        ],
        answer: "Cr is \\(+6\\); S is \\(+2\\)",
      },
      selfCheckExample: {
        prompt: "What is the oxidation number of phosphorus in the dihydrogen phosphate ion, \\(\\mathrm{H_2PO_4^-}\\)?",
        options: ["+3", "+4", "+5", "+6", "+7"],
        steps: [
          "The ion has charge \\(-1\\): \\(2(+1) + x + 4(-2) = -1\\).",
          "\\(2 + x - 8 = -1\\), so \\(x = +5\\).",
          "D comes from setting the sum to 0 and ignoring the charge; E from using \\(+1\\) instead of \\(-1\\).",
        ],
        answer: "(C) +5",
      },
      practiceSet: [
        { prompt: "Oxidation number of S in \\(\\mathrm{H_2SO_4}\\)?", answer: "+6", method: "\\(2 + x - 8 = 0\\)" },
        { prompt: "Oxidation number of Mn in \\(\\mathrm{KMnO_4}\\)?", answer: "+7", method: "\\(1 + x - 8 = 0\\)" },
        { prompt: "Oxidation number of O in \\(\\mathrm{H_2O_2}\\)?", answer: "\\(-1\\)", method: "Peroxide" },
        { prompt: "Oxidation number of N in \\(\\mathrm{NH_4^+}\\)?", answer: "\\(-3\\)", method: "\\(x + 4 = +1\\)" },
      ],
      traps: [
        {
          title: "An element in its free state is always zero",
          body: "In \\(\\mathrm{Br_2}\\), \\(\\mathrm{O_2}\\) or \\(\\mathrm{P_4}\\), each atom is 0, however many atoms the molecule has. \\(\\mathrm{Br_2}\\) is one molecule of the element bromine: not a compound, not two separate atoms, and not ions.",
        },
        {
          title: "Hydrogen is negative in metal hydrides",
          body: "In NaH and \\(\\mathrm{CaH_2}\\) hydrogen is bonded to a less electronegative metal, so it is \\(-1\\) (the hydride ion, \\(\\mathrm{H^-}\\)). Using \\(+1\\) there makes the metal's oxidation number come out impossible.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ino-ions",
      name: "Common ions and their charges",
      intuition:
        "You cannot write a formula without knowing the charges of its ions. Simple ion charges follow from the group number, but the polyatomic ions have to be learned. There are about fifteen that turn up again and again, and their charges are worth memorising like a times table.",
      definition:
        "- Simple ions: Group 1 \\(+1\\), Group 2 \\(+2\\), \\(\\mathrm{Al^{3+}}\\); \\(\\mathrm{N^{3-}}\\) (nitride), \\(\\mathrm{O^{2-}}\\) (oxide), \\(\\mathrm{S^{2-}}\\) (sulfide), \\(\\mathrm{F^-}\\), \\(\\mathrm{Cl^-}\\), \\(\\mathrm{Br^-}\\), \\(\\mathrm{I^-}\\) (halides).\n" +
        "- Common transition metal ions: \\(\\mathrm{Fe^{2+}}\\) and \\(\\mathrm{Fe^{3+}}\\), \\(\\mathrm{Cu^+}\\) and \\(\\mathrm{Cu^{2+}}\\), \\(\\mathrm{Zn^{2+}}\\), \\(\\mathrm{Ag^+}\\).\n" +
        "- A **polyatomic ion** is a group of covalently bonded atoms carrying an overall charge; it stays together through reactions and in formulas.\n" +
        "- Adding \\(\\mathrm{H^+}\\) to an anion raises its charge by one: \\(\\mathrm{CO_3^{2-}}\\) becomes \\(\\mathrm{HCO_3^-}\\), \\(\\mathrm{PO_4^{3-}}\\) becomes \\(\\mathrm{HPO_4^{2-}}\\) then \\(\\mathrm{H_2PO_4^-}\\).",
      table: {
        columns: ["Name", "Formula", "Charge"],
        rows: [
          { cells: ["Ammonium", "\\(\\mathrm{NH_4^+}\\)", "1+"] },
          { cells: ["Hydroxide", "\\(\\mathrm{OH^-}\\)", "1−"] },
          { cells: ["Nitrate / nitrite", "\\(\\mathrm{NO_3^-}\\) / \\(\\mathrm{NO_2^-}\\)", "1−"] },
          { cells: ["Hydrogen carbonate", "\\(\\mathrm{HCO_3^-}\\)", "1−"] },
          { cells: ["Hydrogen sulfate", "\\(\\mathrm{HSO_4^-}\\)", "1−"] },
          { cells: ["Ethanoate (acetate)", "\\(\\mathrm{CH_3COO^-}\\)", "1−"] },
          { cells: ["Permanganate", "\\(\\mathrm{MnO_4^-}\\)", "1−"] },
          { cells: ["Cyanide", "\\(\\mathrm{CN^-}\\)", "1−"] },
          { cells: ["Carbonate", "\\(\\mathrm{CO_3^{2-}}\\)", "2−"] },
          { cells: ["Sulfate / sulfite", "\\(\\mathrm{SO_4^{2-}}\\) / \\(\\mathrm{SO_3^{2-}}\\)", "2−"] },
          { cells: ["Chromate / dichromate", "\\(\\mathrm{CrO_4^{2-}}\\) / \\(\\mathrm{Cr_2O_7^{2-}}\\)", "2−"] },
          { cells: ["Phosphate", "\\(\\mathrm{PO_4^{3-}}\\)", "3−"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of these ions has a charge of 3−?",
        options: ["Nitrate", "Sulfate", "Carbonate", "Phosphate", "Permanganate"],
        steps: [
          "Phosphate is \\(\\mathrm{PO_4^{3-}}\\).",
          "Nitrate and permanganate are 1−; sulfate and carbonate are 2−.",
        ],
        answer: "(D) Phosphate",
      },
      practiceSet: [
        { prompt: "Charge of the hydrogen carbonate ion?", answer: "1−", method: "\\(\\mathrm{CO_3^{2-}}\\) plus \\(\\mathrm{H^+}\\)" },
        { prompt: "Formula of the ammonium ion?", answer: "\\(\\mathrm{NH_4^+}\\)", method: "The common positive polyatomic ion" },
        { prompt: "Charge of the dichromate ion?", answer: "2−", method: "\\(\\mathrm{Cr_2O_7^{2-}}\\)" },
      ],
      traps: [
        {
          title: "Carbonate is 2−, hydrogen carbonate is 1−",
          body: "Each added H takes away one negative charge. So a Group 1 metal forms \\(\\mathrm{M_2CO_3}\\) but \\(\\mathrm{MHCO_3}\\); a formula like \\(\\mathrm{NaCO_3}\\) leaves the carbonate charge unbalanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ino-formulas",
      name: "Writing a correct formula by balancing charges",
      intuition:
        "A compound has no overall charge, so the positive charges must cancel the negative ones exactly. Find the lowest common multiple of the two charges and take enough of each ion to reach it. Keep polyatomic ions whole, in brackets when you need more than one.",
      definition:
        "To write the formula of an ionic compound:\n" +
        "- Write the cation first, then the anion, each with its charge.\n" +
        "- Choose the smallest numbers that make the total charge zero (**cross over** the charge numbers, then simplify).\n" +
        "- Put a polyatomic ion in **brackets** when there is more than one of it: \\(\\mathrm{Ca(OH)_2}\\), never \\(\\mathrm{CaOH_2}\\).\n" +
        "- Check: the oxidation numbers of all the atoms must add to zero.",
      formula: {
        label: "Charge balance",
        latex: "a \\times (\\text{cation charge}) + b \\times (\\text{anion charge}) = 0",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "smallest whole numbers of cations and anions in the formula" },
        ],
      },
      authoredExample: {
        prompt: "Write the formulas of aluminium sulfate and ammonium phosphate.",
        steps: [
          "Aluminium sulfate: \\(\\mathrm{Al^{3+}}\\) and \\(\\mathrm{SO_4^{2-}}\\). Lowest common multiple of 3 and 2 is 6: two \\(\\mathrm{Al^{3+}}\\) (\\(+6\\)) and three \\(\\mathrm{SO_4^{2-}}\\) (\\(-6\\)). Formula \\(\\mathrm{Al_2(SO_4)_3}\\).",
          "Ammonium phosphate: \\(\\mathrm{NH_4^+}\\) and \\(\\mathrm{PO_4^{3-}}\\). Three ammonium ions balance one phosphate: \\(\\mathrm{(NH_4)_3PO_4}\\).",
        ],
        answer: "\\(\\mathrm{Al_2(SO_4)_3}\\) and \\(\\mathrm{(NH_4)_3PO_4}\\)",
      },
      selfCheckExample: {
        prompt: "Which one of the following is NOT a correct formula for a magnesium compound?",
        options: [
          "\\(\\mathrm{Mg(NO_3)_2}\\)",
          "\\(\\mathrm{MgSO_4}\\)",
          "\\(\\mathrm{Mg_3N_2}\\)",
          "\\(\\mathrm{Mg(OH)_2}\\)",
          "\\(\\mathrm{MgHCO_3}\\)",
        ],
        steps: [
          "Magnesium is \\(\\mathrm{Mg^{2+}}\\).",
          "A: two \\(\\mathrm{NO_3^-}\\), balanced. B: one \\(\\mathrm{SO_4^{2-}}\\), balanced. C: three \\(\\mathrm{Mg^{2+}}\\) (\\(+6\\)) and two \\(\\mathrm{N^{3-}}\\) (\\(-6\\)), balanced. D: two \\(\\mathrm{OH^-}\\), balanced.",
          "E: hydrogen carbonate is only 1−, so one of them leaves \\(+1\\) over. The correct formula is \\(\\mathrm{Mg(HCO_3)_2}\\).",
        ],
        answer: "(E) \\(\\mathrm{MgHCO_3}\\)",
      },
      practiceSet: [
        { prompt: "Formula of calcium nitrate?", answer: "\\(\\mathrm{Ca(NO_3)_2}\\)", method: "\\(\\mathrm{Ca^{2+}}\\) needs two \\(\\mathrm{NO_3^-}\\)" },
        { prompt: "Formula of the oxide formed by \\(\\mathrm{Fe^{3+}}\\) ions?", answer: "\\(\\mathrm{Fe_2O_3}\\)", method: "\\(2 \\times (+3) + 3 \\times (-2) = 0\\)" },
        { prompt: "Formula of potassium dichromate?", answer: "\\(\\mathrm{K_2Cr_2O_7}\\)", method: "Two \\(\\mathrm{K^+}\\) for one \\(\\mathrm{Cr_2O_7^{2-}}\\)" },
        { prompt: "Formula of sodium hydrogen sulfate?", answer: "\\(\\mathrm{NaHSO_4}\\)", method: "Both ions are singly charged" },
      ],
      traps: [
        {
          title: "Brackets matter: Ca(OH)₂ is not CaOH₂",
          body: "Without brackets the 2 applies only to the H. Whenever a formula needs more than one polyatomic ion, the whole ion goes in brackets with the number outside: \\(\\mathrm{Ca(OH)_2}\\), \\(\\mathrm{(NH_4)_2SO_4}\\).",
        },
      ],
    },
  ],
};
