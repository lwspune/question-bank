import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CR_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Equations",
  title: "Chemical Equations",
  oneLineDefinition:
    "A balanced equation has the same number of each kind of atom, and the same total charge, on both sides; a missing substance is found from the reaction's usual products and by counting atoms.",
  whyItMatters:
    "Six questions in the bank, one EASY, three MODERATE and two HARD. Three ask which equation is balanced or unbalanced, one of them with ions, and three give equations with blanks to fill: lime water and carbon dioxide, bleaching powder, and carbonates and bicarbonates with acids.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9creq-balance",
      name: "Balancing a chemical equation",
      intuition:
        "Atoms are not made or destroyed in a reaction; they are only rearranged. So every atom on the left must turn up on the right. To balance an equation you change only the big numbers in front of the formulas, never the small numbers inside them, because those decide what the substance is.",
      definition:
        "- **Law of conservation of mass**: the total mass, and so the number of each kind of atom, is the same before and after a reaction.\n" +
        "- **Balanced equation**: for every element, the number of atoms on the left equals the number on the right.\n" +
        "- **To check**: count each element on both sides. A number in front multiplies the whole formula; a number after a bracket multiplies everything inside it: \\(\\mathrm{Ca(OH)_2}\\) has 2 O and 2 H.\n" +
        "- **To balance**: change only the **coefficients** (numbers in front), never the **subscripts**.\n" +
        "- **Ionic equations**: the **total charge** must also be equal on both sides. Two sodium ions are written \\(\\mathrm{2Na^+}\\); there is no ion \\(\\mathrm{Na_2^+}\\).\n" +
        "- A balanced equation is not always a real reaction: it must also show what actually happens.",
      authoredExample: {
        prompt: "Balance the equation \\(\\mathrm{Fe + H_2O \\rightarrow Fe_3O_4 + H_2}\\).",
        steps: [
          "Iron: 3 on the right, so put 3 before Fe.",
          "Oxygen: 4 on the right, so put 4 before \\(\\mathrm{H_2O}\\).",
          "Hydrogen: now 8 on the left, so put 4 before \\(\\mathrm{H_2}\\).",
          "Check: Fe 3 = 3, O 4 = 4, H 8 = 8.",
        ],
        answer: "\\(\\mathrm{3Fe + 4H_2O \\rightarrow Fe_3O_4 + 4H_2}\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(\\mathrm{N_2 + H_2 \\rightarrow 2NH_3}\\) balanced? If not, balance it.",
        steps: [
          "Nitrogen: 2 on each side.",
          "Hydrogen: 2 on the left, 6 on the right, so put 3 before \\(\\mathrm{H_2}\\).",
        ],
        answer: "Not balanced. \\(\\mathrm{N_2 + 3H_2 \\rightarrow 2NH_3}\\)",
      },
      practiceSet: [
        { prompt: "Balance: \\(\\mathrm{Mg + O_2 \\rightarrow MgO}\\)", answer: "\\(\\mathrm{2Mg + O_2 \\rightarrow 2MgO}\\)" },
        { prompt: "How many oxygen atoms are there in \\(\\mathrm{2CO_2 + 3H_2O}\\)?", answer: "7: four in \\(\\mathrm{2CO_2}\\) and three in \\(\\mathrm{3H_2O}\\)" },
        { prompt: "Why may we not balance an equation by changing \\(\\mathrm{H_2O}\\) into \\(\\mathrm{H_2O_2}\\)?", answer: "Changing the small number changes the substance: \\(\\mathrm{H_2O_2}\\) is hydrogen peroxide, not water" },
        { prompt: "Besides the atoms, what else must be equal on both sides of a balanced ionic equation?", answer: "The total electric charge" },
      ],
      pyqExampleId: "c7958104-cb76-4a57-8989-025d0757df6b",
      traps: [
        {
          title: "Changing a subscript to balance",
          body: "Only the numbers in front of formulas may change. Changing a small number inside a formula makes a different substance.",
        },
        {
          title: "Forgetting the atoms inside brackets",
          body: "The 2 after a bracket multiplies everything inside: \\(\\mathrm{Ca(OH)_2}\\) has 2 oxygen and 2 hydrogen atoms.",
        },
        {
          title: "Thinking a balanced equation must happen",
          body: "An equation can have equal atoms on both sides and still describe a reaction that does not take place, such as one written backwards from a precipitate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9creq-products",
      name: "Completing equations: reactions to know",
      intuition:
        "Most fill-in-the-blank equations use a handful of reactions that come up again and again. If you know that an acid with a carbonate always gives a salt, water and carbon dioxide, you can name the missing substance at once, and then count atoms to be sure of the number in front.",
      definition:
        "- **Acid + carbonate or bicarbonate** gives **salt + water + carbon dioxide**.\n" +
        "- **Acid + metal** gives **salt + hydrogen**. **Acid + base** gives **salt + water**.\n" +
        "- **Lime water** \\(\\mathrm{Ca(OH)_2}\\) turns **milky** with carbon dioxide: calcium carbonate forms.\n" +
        "- **Slaked lime + chlorine** gives **bleaching powder** \\(\\mathrm{CaOCl_2}\\). Bleaching powder with an acid gives back chlorine.\n" +
        "- **Method**: name the missing substance from the type of reaction, then count each element on both sides to find its number.",
      table: {
        columns: ["Reaction", "Equation"],
        rows: [
          { cells: ["Lime water with carbon dioxide", "\\(\\mathrm{Ca(OH)_2 + CO_2 \\rightarrow CaCO_3 + H_2O}\\)"] },
          { cells: ["Washing soda with acid", "\\(\\mathrm{Na_2CO_3 + 2HCl \\rightarrow 2NaCl + H_2O + CO_2}\\)"] },
          { cells: ["Baking soda with acid", "\\(\\mathrm{NaHCO_3 + HCl \\rightarrow NaCl + H_2O + CO_2}\\)"] },
          { cells: ["Metal with dilute acid", "\\(\\mathrm{Zn + H_2SO_4 \\rightarrow ZnSO_4 + H_2}\\)"] },
          { cells: ["Acid with base", "\\(\\mathrm{NaOH + HCl \\rightarrow NaCl + H_2O}\\)"] },
          { cells: ["Making bleaching powder", "\\(\\mathrm{Ca(OH)_2 + Cl_2 \\rightarrow CaOCl_2 + H_2O}\\)"] },
          { cells: ["Bleaching powder with dilute sulphuric acid", "\\(\\mathrm{CaOCl_2 + H_2SO_4 \\rightarrow CaSO_4 + H_2O + Cl_2}\\)"] },
        ],
        caption: "Carbonates give carbon dioxide with acids; metals give hydrogen.",
      },
      selfCheckExample: {
        prompt: "Complete the equation: \\(\\mathrm{Zn + 2HCl \\rightarrow ZnCl_2 + \\;?}\\)",
        steps: ["A metal with a dilute acid gives a salt and hydrogen.", "Hydrogen: 2 on the left, so one \\(\\mathrm{H_2}\\) on the right."],
        answer: "\\(\\mathrm{H_2}\\)",
      },
      practiceSet: [
        { prompt: "Which gas is given off when baking soda reacts with an acid?", answer: "Carbon dioxide" },
        { prompt: "What forms when carbon dioxide is passed through lime water?", answer: "Calcium carbonate and water: the lime water turns milky" },
        { prompt: "Complete: \\(\\mathrm{KOH + HNO_3 \\rightarrow KNO_3 + \\;?}\\)", answer: "\\(\\mathrm{H_2O}\\)" },
        { prompt: "What is formed when chlorine is passed over dry slaked lime?", answer: "Bleaching powder, \\(\\mathrm{CaOCl_2}\\)" },
      ],
      pyqExampleId: "b4a90bdc-32fe-4bab-a93a-6eafb42065df",
      traps: [
        {
          title: "Giving hydrogen from a carbonate",
          body: "A carbonate or bicarbonate with an acid gives carbon dioxide, not hydrogen. Hydrogen comes from a metal with an acid.",
        },
        {
          title: "Writing bleaching powder as CaOCl",
          body: "Bleaching powder is \\(\\mathrm{CaOCl_2}\\), with two chlorine atoms, made from slaked lime and chlorine.",
        },
      ],
    },
  ],
};
