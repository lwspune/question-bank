import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_RDX_BALANCING_NOTE: SubtopicNote = {
  subtopicName: "Balancing Redox Equations",
  title: "Balancing Redox Equations",
  oneLineDefinition:
    "A redox equation balances when the electrons lost by the reducing agent equal the electrons gained by the oxidising agent; fix that ratio first, then the spectator atoms.",
  whyItMatters:
    "The 2026 paper had three balancing questions: a metal with nitric acid, an electron transfer between two metal bromides, and a disproportionation. No earlier paper asked one, so this is the newest shape in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdx-balance-on",
      name: "Balancing by matching electrons lost and gained",
      intuition:
        "Trial and error is slow for redox equations because the coefficients are linked by the electrons. Find how many electrons each atom loses or gains, choose multipliers so the two totals match, and most of the equation falls into place. Atoms that are not oxidised or reduced are filled in at the end.",
      definition:
        "The **oxidation-number method**:\n" +
        "- Find the atoms whose oxidation numbers change, and the change per atom.\n" +
        "- Multiply each side of the transfer so that **electrons lost = electrons gained**. This fixes the ratio of oxidised to reduced species.\n" +
        "- Add any extra reagent that is used without changing (for example nitrate that only supplies ions to the salt).\n" +
        "- Balance hydrogen with \\(\\mathrm{H_2O}\\) or \\(\\mathrm{H^+}\\), and check oxygen last.\n" +
        "- In a multiple-choice question, check the electron ratio first: it usually eliminates most options at once.",
      formula: {
        label: "The balancing condition",
        latex: "(\\text{atoms oxidised}) \\times (\\text{rise per atom}) = (\\text{atoms reduced}) \\times (\\text{fall per atom})",
      },
      authoredExample: {
        prompt:
          "Very dilute nitric acid oxidises zinc and is itself reduced to ammonium ions. Balance: \\(\\mathrm{Zn + HNO_3 \\rightarrow Zn(NO_3)_2 + NH_4NO_3 + H_2O}\\).",
        steps: [
          "Zn rises from 0 to +2: 2 electrons lost per Zn. N falls from +5 in \\(\\mathrm{HNO_3}\\) to −3 in \\(\\mathrm{NH_4^+}\\): 8 electrons gained per N.",
          "Match: 4 Zn lose 8 electrons, 1 N gains 8. So \\(\\mathrm{4Zn \\rightarrow 4Zn(NO_3)_2}\\) and one \\(\\mathrm{NH_4NO_3}\\).",
          "Count nitrogen on the right: \\(4 \\times 2 + 2 = 10\\), so 10 \\(\\mathrm{HNO_3}\\).",
          "Hydrogen: 10 on the left, 4 in \\(\\mathrm{NH_4^+}\\), so 6 left for water: 3 \\(\\mathrm{H_2O}\\). Oxygen check: 30 on each side.",
        ],
        answer: "\\(\\mathrm{4Zn + 10HNO_3 \\rightarrow 4Zn(NO_3)_2 + NH_4NO_3 + 3H_2O}\\)",
      },
      selfCheckExample: {
        prompt:
          "Balance \\(\\mathrm{SnCl_2 + HgCl_2 \\rightarrow SnCl_4 + Hg_2Cl_2}\\). The coefficients, in the order written, are:",
        options: [
          "1, 2, 1, 1",
          "1, 1, 1, 1",
          "2, 1, 2, 1",
          "1, 2, 1, 2",
          "2, 2, 2, 1",
        ],
        steps: [
          "Sn rises from +2 to +4: 2 electrons lost. Hg falls from +2 to +1: 1 electron gained per Hg.",
          "So one Sn needs two Hg: \\(\\mathrm{SnCl_2 + 2HgCl_2 \\rightarrow SnCl_4 + Hg_2Cl_2}\\). Chlorine: \\(2 + 4 = 6\\) on the left, \\(4 + 2 = 6\\) on the right.",
          "B leaves the Hg atoms unbalanced. E balances Sn and Hg but has 2 electrons gained for 4 lost, and the chlorine does not balance.",
        ],
        answer: "(A) 1, 2, 1, 1",
      },
      practiceSet: [
        { prompt: "Balance \\(\\mathrm{MnO_2 + Al \\rightarrow Mn + Al_2O_3}\\).", answer: "\\(\\mathrm{3MnO_2 + 4Al \\rightarrow 3Mn + 2Al_2O_3}\\)", method: "Mn gains 4, Al loses 3: 3 Mn to 4 Al" },
        { prompt: "Balance \\(\\mathrm{NH_3 + O_2 \\rightarrow NO + H_2O}\\).", answer: "\\(\\mathrm{4NH_3 + 5O_2 \\rightarrow 4NO + 6H_2O}\\)", method: "N loses 5 per atom, each \\(\\mathrm{O_2}\\) gains 4" },
        { prompt: "How many electrons are transferred in \\(\\mathrm{Fe_2O_3 + 3CO \\rightarrow 2Fe + 3CO_2}\\) as written?", answer: "6", method: "Two Fe each gain 3" },
      ],
      traps: [
        {
          title: "Atom balance alone can hide a wrong electron count",
          body: "Some wrong options balance the metal atoms but not the electrons or the spectator ions. Check three things: the electron ratio, every element, and (for ionic equations) the total charge. An equation is balanced only when all three agree.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-half-eq",
      name: "Half-equations in acidic solution",
      intuition:
        "Splitting a reaction into its two halves lets you balance each one separately, using only water, \\(\\mathrm{H^+}\\) and electrons as fillers. Then you scale the halves so the electrons cancel and add them together. This is the standard way to handle ions such as permanganate and dichromate.",
      definition:
        "For each half-equation, in acid:\n" +
        "- Balance the atoms other than O and H.\n" +
        "- Add \\(\\mathrm{H_2O}\\) to balance oxygen.\n" +
        "- Add \\(\\mathrm{H^+}\\) to balance hydrogen.\n" +
        "- Add electrons to the more positive side to balance the charge.\n" +
        "Then multiply the halves so the electrons are equal, add them, and cancel anything that appears on both sides.",
      formula: {
        label: "Two common reduction half-equations in acid",
        latex: "\\mathrm{MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O} \\qquad \\mathrm{Cr_2O_7^{2-} + 14H^+ + 6e^- \\rightarrow 2Cr^{3+} + 7H_2O}",
      },
      authoredExample: {
        prompt: "Write the overall equation for acidified permanganate oxidising iron(II) ions to iron(III).",
        steps: [
          "Oxidation: \\(\\mathrm{Fe^{2+} \\rightarrow Fe^{3+} + e^-}\\).",
          "Reduction: \\(\\mathrm{MnO_4^-}\\) to \\(\\mathrm{Mn^{2+}}\\); 4 O need \\(\\mathrm{4H_2O}\\), those 8 H need \\(\\mathrm{8H^+}\\); charge on the left is \\(-1 + 8 = +7\\), on the right +2, so add 5 electrons on the left.",
          "Multiply the iron half by 5 so both halves carry 5 electrons, then add.",
          "Charge check: \\(-1 + 8 + 10 = +17\\) on the left, \\(2 + 15 = +17\\) on the right.",
        ],
        answer: "\\(\\mathrm{MnO_4^- + 8H^+ + 5Fe^{2+} \\rightarrow Mn^{2+} + 5Fe^{3+} + 4H_2O}\\)",
      },
      selfCheckExample: {
        prompt:
          "Acidified dichromate oxidises iodide ions to iodine and is reduced to \\(\\mathrm{Cr^{3+}}\\). How many moles of iodide ions are oxidised by one mole of \\(\\mathrm{Cr_2O_7^{2-}}\\)?",
        options: [
          "2",
          "3",
          "7",
          "6",
          "14",
        ],
        steps: [
          "\\(\\mathrm{Cr_2O_7^{2-} + 14H^+ + 6e^- \\rightarrow 2Cr^{3+} + 7H_2O}\\): 6 electrons per dichromate.",
          "\\(\\mathrm{2I^- \\rightarrow I_2 + 2e^-}\\): one electron per iodide, so 6 iodide ions.",
          "Overall: \\(\\mathrm{Cr_2O_7^{2-} + 14H^+ + 6I^- \\rightarrow 2Cr^{3+} + 3I_2 + 7H_2O}\\). B counts the \\(\\mathrm{I_2}\\) molecules, A the chromium atoms, C the water and E the \\(\\mathrm{H^+}\\).",
        ],
        answer: "(D) 6",
      },
      practiceSet: [
        { prompt: "Complete the half-equation \\(\\mathrm{NO_3^- \\rightarrow NO}\\) in acid.", answer: "\\(\\mathrm{NO_3^- + 4H^+ + 3e^- \\rightarrow NO + 2H_2O}\\)", method: "2 water for O, 4 H⁺ for H, 3 electrons for charge" },
        { prompt: "Complete the half-equation \\(\\mathrm{SO_2 \\rightarrow SO_4^{2-}}\\) in acid.", answer: "\\(\\mathrm{SO_2 + 2H_2O \\rightarrow SO_4^{2-} + 4H^+ + 2e^-}\\)", method: "S rises from +4 to +6" },
        { prompt: "How many moles of \\(\\mathrm{MnO_4^-}\\) react with 0.010 mol of \\(\\mathrm{Fe^{2+}}\\)?", answer: "0.0020 mol", method: "1 permanganate per 5 iron(II)" },
      ],
      traps: [
        {
          title: "Electrons go on the side that is more positive",
          body: "After adding water and \\(\\mathrm{H^+}\\), compare the total charges. Electrons are added to the side with the larger positive charge, enough to make the two sides equal. In a reduction they end up on the left; in an oxidation, on the right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-disprop",
      name: "Disproportionation and comproportionation",
      intuition:
        "Sometimes one element in a single species is both the giver and the taker of electrons: some of its atoms go up and the rest go down. That is disproportionation. The balancing idea is unchanged: the electrons lost by the atoms going up must equal those gained by the atoms going down, so you split the same species between the two products.",
      definition:
        "- **Disproportionation**: the same element, from one oxidation state, is simultaneously oxidised and reduced. The species is both the oxidising and the reducing agent.\n" +
        "- Examples: \\(\\mathrm{Cl_2 + 2NaOH \\rightarrow NaCl + NaClO + H_2O}\\) (cold alkali); \\(\\mathrm{2H_2O_2 \\rightarrow 2H_2O + O_2}\\); \\(\\mathrm{2Cu^+ \\rightarrow Cu + Cu^{2+}}\\).\n" +
        "- **Comproportionation** is the reverse: two oxidation states of one element meet at a middle value, as in \\(\\mathrm{2H_2S + SO_2 \\rightarrow 3S + 2H_2O}\\).\n" +
        "- A species can disproportionate only if its element sits in an intermediate state, with room both above and below.",
      formula: {
        label: "Splitting one species between two products",
        latex: "(\\text{atoms going up}) \\times (\\text{rise}) = (\\text{atoms going down}) \\times (\\text{fall})",
      },
      authoredExample: {
        prompt:
          "Chlorine reacts with hot sodium hydroxide to give sodium chloride and sodium chlorate(V). Balance: \\(\\mathrm{Cl_2 + NaOH \\rightarrow NaCl + NaClO_3 + H_2O}\\).",
        steps: [
          "Cl starts at 0. In NaCl it is −1 (gains 1 electron); in \\(\\mathrm{NaClO_3}\\) it is +5 (loses 5).",
          "Match: 5 Cl atoms each gain 1 for every 1 Cl atom that loses 5. So 5 NaCl to 1 \\(\\mathrm{NaClO_3}\\): 6 Cl atoms, 3 \\(\\mathrm{Cl_2}\\).",
          "Sodium: 6 on the right, so 6 NaOH. Hydrogen: 6, so 3 \\(\\mathrm{H_2O}\\). Oxygen: 6 on each side.",
        ],
        answer: "\\(\\mathrm{3Cl_2 + 6NaOH \\rightarrow 5NaCl + NaClO_3 + 3H_2O}\\)",
      },
      selfCheckExample: {
        prompt:
          "On heating, potassium chlorate disproportionates into potassium chloride and potassium perchlorate. Which equation is balanced?",
        options: [
          "\\(\\mathrm{2KClO_3 \\rightarrow KCl + KClO_4}\\)",
          "\\(\\mathrm{4KClO_3 \\rightarrow KCl + 3KClO_4}\\)",
          "\\(\\mathrm{4KClO_3 \\rightarrow 3KCl + KClO_4}\\)",
          "\\(\\mathrm{3KClO_3 \\rightarrow KCl + 2KClO_4}\\)",
          "\\(\\mathrm{5KClO_3 \\rightarrow 2KCl + 3KClO_4}\\)",
        ],
        steps: [
          "Cl is +5 in \\(\\mathrm{KClO_3}\\), −1 in KCl (gains 6) and +7 in \\(\\mathrm{KClO_4}\\) (loses 2).",
          "Match: 1 Cl gaining 6 needs 3 Cl each losing 2. So 1 KCl and 3 \\(\\mathrm{KClO_4}\\), from 4 \\(\\mathrm{KClO_3}\\). Oxygen: 12 on each side.",
          "C reverses the ratio. A, D and E all fail the oxygen count.",
        ],
        answer: "(B) \\(\\mathrm{4KClO_3 \\rightarrow KCl + 3KClO_4}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{2H_2O_2 \\rightarrow 2H_2O + O_2}\\) a disproportionation?", answer: "Yes", method: "O goes from −1 to both −2 and 0" },
        { prompt: "Balance the disproportionation \\(\\mathrm{NaClO \\rightarrow NaCl + NaClO_3}\\).", answer: "\\(\\mathrm{3NaClO \\rightarrow 2NaCl + NaClO_3}\\)", method: "Cl +1 to −1 gains 2; +1 to +5 loses 4" },
        { prompt: "What kind of reaction is \\(\\mathrm{2H_2S + SO_2 \\rightarrow 3S + 2H_2O}\\)?", answer: "Comproportionation", method: "S at −2 and +4 both become 0" },
        { prompt: "Can \\(\\mathrm{ClO_4^-}\\) disproportionate?", answer: "No", method: "Cl is at +7, its highest state, so it cannot go up" },
      ],
      traps: [
        {
          title: "In disproportionation one species is both agents",
          body: "In \\(\\mathrm{Cl_2 + H_2O \\rightarrow HCl + HClO}\\), chlorine is both the oxidising agent and the reducing agent: one Cl atom falls to −1 while the other rises to +1. An option saying the reaction is not redox because only one element changes is wrong.",
        },
      ],
    },
  ],
};
