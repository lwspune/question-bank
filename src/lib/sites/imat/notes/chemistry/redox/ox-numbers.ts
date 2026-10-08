import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_RDX_OX_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Oxidation Numbers",
  title: "Oxidation Numbers: Rules and Calculation",
  oneLineDefinition:
    "An oxidation number is the charge an atom would carry if every bond were fully ionic; a few fixed rules and the total charge let you find it for any atom.",
  whyItMatters:
    "Oxidation numbers are the most tested idea in this chapter. The 2025 paper asked which compound gives chlorine +3 and what kind of number an oxidation number cannot be; the older papers asked for the states of nitrogen, chlorine and vanadium across a list of species, and for a general formula for an oxoacid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-rdx-on-rules",
      name: "The rules for assigning oxidation numbers",
      intuition:
        "Oxidation numbers are bookkeeping. Pretend every bond is broken so that the more electronegative atom takes all the shared electrons, then read off the charge each atom would have. A handful of atoms almost always behave the same way, so start with them and let the total charge decide the rest.",
      definition:
        "The **oxidation number** (oxidation state) of an atom is the charge it would have if all its bonds were ionic.\n" +
        "- Work in this order: elements, then fixed atoms (F, Group 1, Group 2, Al, H, O), then the unknown atom from the total.\n" +
        "- The **sum** of oxidation numbers is 0 in a neutral compound and equals the charge in an ion.\n" +
        "- When rules clash, the higher one in the table wins: in \\(\\mathrm{OF_2}\\), F is −1, so O must be +2.\n" +
        "- The naming side (Stock numbers such as iron(III), and the -ite and -ate endings) is covered in the Inorganic Compounds and Nomenclature chapter.",
      table: {
        columns: ["Atom or situation", "Oxidation number", "Exception or example"],
        rows: [
          { cells: ["An uncombined element", "0", "\\(\\mathrm{Na}\\), \\(\\mathrm{O_2}\\), \\(\\mathrm{Cl_2}\\), \\(\\mathrm{P_4}\\), \\(\\mathrm{S_8}\\) are all 0"] },
          { cells: ["A simple (monatomic) ion", "Equal to its charge", "\\(\\mathrm{Mg^{2+}}\\) is +2, \\(\\mathrm{Cl^-}\\) is −1"] },
          { cells: ["Fluorine in a compound", "−1 always", "The most electronegative element, no exceptions"] },
          { cells: ["Group 1, Group 2, aluminium", "+1, +2, +3", "Almost no exceptions in IMAT"] },
          {
            cells: ["Hydrogen", "+1", "−1 in metal hydrides: \\(\\mathrm{NaH}\\), \\(\\mathrm{LiH}\\), \\(\\mathrm{CaH_2}\\)"],
          },
          {
            cells: ["Oxygen", "−2", "−1 in peroxides (\\(\\mathrm{H_2O_2}\\), \\(\\mathrm{Na_2O_2}\\)); +2 in \\(\\mathrm{OF_2}\\)"],
            noteAmber: "Peroxides are the exception IMAT likes most: in hydrogen peroxide each O is −1.",
          },
          { cells: ["Cl, Br, I", "−1 in halides", "Positive when bonded to O: +1 in \\(\\mathrm{HClO}\\), +7 in \\(\\mathrm{HClO_4}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which compound does hydrogen have an oxidation number of −1?",
        options: [
          "\\(\\mathrm{H_2O}\\)",
          "\\(\\mathrm{NH_3}\\)",
          "\\(\\mathrm{CaH_2}\\)",
          "\\(\\mathrm{HCl}\\)",
          "\\(\\mathrm{CH_4}\\)",
        ],
        steps: [
          "In a metal hydride, hydrogen is bonded to a less electronegative metal and counts as \\(\\mathrm{H^-}\\).",
          "Calcium is +2, so each H in \\(\\mathrm{CaH_2}\\) is −1.",
          "In the other four, hydrogen is bonded to a more electronegative non-metal and is +1.",
        ],
        answer: "(C) \\(\\mathrm{CaH_2}\\)",
      },
      practiceSet: [
        { prompt: "What is the oxidation number of oxygen in \\(\\mathrm{H_2O_2}\\)?", answer: "−1", method: "Peroxide: two H at +1 balance two O" },
        { prompt: "What is the oxidation number of sulfur in \\(\\mathrm{S_8}\\)?", answer: "0", method: "An uncombined element" },
        { prompt: "What is the oxidation number of oxygen in \\(\\mathrm{OF_2}\\)?", answer: "+2", method: "Each F is −1" },
        { prompt: "What is the oxidation number of iron in \\(\\mathrm{Fe^{3+}}\\)?", answer: "+3", method: "Monatomic ion: its charge" },
      ],
      traps: [
        {
          title: "Oxygen is not always −2, and hydrogen is not always +1",
          body: "In peroxides each oxygen is −1, and in \\(\\mathrm{OF_2}\\) oxygen is +2. In metal hydrides such as NaH, hydrogen is −1. Applying the usual values blindly to these compounds gives a wrong oxidation number for every other atom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-on-calc",
      name: "Working out an oxidation number from a formula",
      intuition:
        "Once the fixed atoms are assigned, the unknown atom must make the total come out right. Write one equation, with the unknown multiplied by how many of those atoms there are, and solve it. For oxoacids and oxoanions this gives a quick general formula.",
      definition:
        "- Write: (count × unknown) + (sum of the known oxidation numbers) = overall charge.\n" +
        "- For an oxoacid \\(\\mathrm{H_mXO_n}\\): \\(x + m - 2n = 0\\), so \\(x = 2n - m\\).\n" +
        "- For an oxoanion \\(\\mathrm{XO_n^{c-}}\\): \\(x - 2n = -c\\), so \\(x = 2n - c\\).\n" +
        "- In a polyatomic ion, remember the charge: in \\(\\mathrm{NH_4^+}\\) the sum is +1, not 0.",
      formula: {
        label: "Sum of oxidation numbers",
        latex: "\\sum (\\text{number of atoms} \\times \\text{oxidation number}) = \\text{overall charge}",
        symbols: [
          { symbol: "overall charge", meaning: "0 for a neutral compound; the ion's charge for an ion" },
        ],
      },
      authoredExample: {
        prompt: "Find the oxidation number of chromium in \\(\\mathrm{Cr_2O_7^{2-}}\\) and of nitrogen in \\(\\mathrm{NH_4^+}\\).",
        steps: [
          "\\(\\mathrm{Cr_2O_7^{2-}}\\): \\(2x + 7(-2) = -2\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "\\(\\mathrm{NH_4^+}\\): \\(x + 4(+1) = +1\\), so \\(x = -3\\).",
          "Check: the total equals the charge on each ion.",
        ],
        answer: "Cr is +6; N is −3",
      },
      selfCheckExample: {
        prompt: "In which of these species does sulfur have an oxidation number of +4?",
        options: [
          "\\(\\mathrm{H_2SO_4}\\)",
          "\\(\\mathrm{Na_2SO_3}\\)",
          "\\(\\mathrm{H_2S}\\)",
          "\\(\\mathrm{S_8}\\)",
          "\\(\\mathrm{Na_2S_2O_3}\\)",
        ],
        steps: [
          "\\(\\mathrm{Na_2SO_3}\\): \\(2(+1) + x + 3(-2) = 0\\), so \\(x = +4\\).",
          "The others: \\(\\mathrm{H_2SO_4}\\) +6, \\(\\mathrm{H_2S}\\) −2, \\(\\mathrm{S_8}\\) 0, and \\(\\mathrm{Na_2S_2O_3}\\) gives \\(2x = 4\\), so +2 (the 4 is shared by two S atoms).",
        ],
        answer: "(B) \\(\\mathrm{Na_2SO_3}\\)",
      },
      practiceSet: [
        { prompt: "What is the oxidation number of manganese in \\(\\mathrm{K_2MnO_4}\\)?", answer: "+6", method: "\\(2 + x - 8 = 0\\)" },
        { prompt: "What is the oxidation number of phosphorus in \\(\\mathrm{H_3PO_4}\\)?", answer: "+5", method: "\\(2n - m = 8 - 3\\)" },
        { prompt: "What is the oxidation number of nitrogen in \\(\\mathrm{N_2O}\\)?", answer: "+1", method: "\\(2x - 2 = 0\\)" },
        { prompt: "What is the oxidation number of carbon in methanol, \\(\\mathrm{CH_3OH}\\)?", answer: "−2", method: "\\(x + 4(+1) - 2 = 0\\)" },
      ],
      traps: [
        {
          title: "Divide by the number of atoms of the unknown element",
          body: "In \\(\\mathrm{Cr_2O_7^{2-}}\\) the oxygens contribute −14 and the ion is −2, so the two chromium atoms together are +12 and EACH is +6. Forgetting to divide gives +12, an impossible value that IMAT sometimes offers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-on-range",
      name: "The range of oxidation numbers, and fractional averages",
      intuition:
        "A main-group atom can lose at most all its outer electrons and gain at most enough to fill its octet. That fixes the highest and lowest oxidation number it can show. Inside that range many values are possible, and when atoms of the same element in one formula sit in different states, the calculation gives their average, which may be a fraction.",
      definition:
        "- For a main-group element: **highest** oxidation number = the number of outer electrons (the group number in the 1 to 8 numbering); **lowest** = that number minus 8.\n" +
        "- Nitrogen: −3 to +5. Sulfur: −2 to +6. Chlorine: −1 to +7. Carbon: −4 to +4.\n" +
        "- Transition metals show many states: manganese from +2 to +7, chromium +3 and +6, iron +2 and +3, vanadium +2 to +5.\n" +
        "- An oxidation number can be **positive, negative, zero, or a fraction** (an average over several atoms). Being a ratio of whole numbers, it is always rational, never an irrational number.",
      formula: {
        label: "Limits for a main-group element",
        latex: "\\text{lowest} = \\text{outer electrons} - 8 \\qquad \\text{highest} = \\text{outer electrons}",
        symbols: [
          { symbol: "outer electrons", meaning: "valence electrons: 5 for N and P, 6 for O and S, 7 for the halogens" },
        ],
      },
      authoredExample: {
        prompt: "Find the oxidation number of iron in magnetite, \\(\\mathrm{Fe_3O_4}\\), and explain the result.",
        steps: [
          "\\(3x + 4(-2) = 0\\), so \\(x = +8/3\\).",
          "No single iron atom is \\(+8/3\\). The formula hides one \\(\\mathrm{Fe^{2+}}\\) and two \\(\\mathrm{Fe^{3+}}\\): \\((2 + 3 + 3)/3 = 8/3\\).",
          "A fractional oxidation number is an average over atoms of the same element.",
        ],
        answer: "\\(+8/3\\) on average (one Fe at +2, two at +3)",
      },
      selfCheckExample: {
        prompt: "Which of these values can nitrogen never have as an oxidation number?",
        options: [
          "−3",
          "+5",
          "0",
          "+6",
          "+2",
        ],
        steps: [
          "Nitrogen has 5 outer electrons, so its range is −3 to +5.",
          "−3 occurs in \\(\\mathrm{NH_3}\\), +5 in \\(\\mathrm{HNO_3}\\), 0 in \\(\\mathrm{N_2}\\), +2 in NO. +6 would need six electrons removed from an atom that has only five outer electrons.",
        ],
        answer: "(D) +6",
      },
      practiceSet: [
        { prompt: "What is the highest oxidation number sulfur can show?", answer: "+6", method: "Six outer electrons" },
        { prompt: "What is the average oxidation number of sulfur in \\(\\mathrm{S_4O_6^{2-}}\\)?", answer: "+2.5", method: "\\(4x - 12 = -2\\)" },
        { prompt: "What is the oxidation number of manganese in \\(\\mathrm{MnO_4^-}\\)?", answer: "+7", method: "\\(x - 8 = -1\\), the highest state of Mn" },
        { prompt: "Can an oxidation number be zero for an atom in a compound?", answer: "Yes", method: "Carbon in \\(\\mathrm{CH_2O}\\) is 0" },
      ],
      traps: [
        {
          title: "Oxidation numbers can be fractions, but not irrational",
          body: "An average such as \\(+8/3\\) in \\(\\mathrm{Fe_3O_4}\\) or +2.5 in \\(\\mathrm{S_4O_6^{2-}}\\) is a genuine result. Every oxidation number is a whole-number total shared among whole numbers of atoms, so it is always a ratio of integers: never irrational.",
        },
      ],
    },
  ],
};
