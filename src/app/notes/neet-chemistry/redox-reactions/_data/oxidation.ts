import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_RR_OXIDATION_NOTE: SubtopicNote = {
  subtopicName: "Oxidation Number",
  title: "Oxidation Number",
  oneLineDefinition:
    "Oxidation and reduction as the loss and gain of electrons, the oxidising and reducing agent, the rules for oxidation numbers (including peroxides, superoxides and metal hydrides), and how to find the oxidation number of any atom by making the charges add up.",
  whyItMatters:
    "Three NEET questions from 2024 to 2026. One asks which of four reactions is not a redox reaction (2024), one asks the oxidation states of K in KO₂, O in H₂O₂ and S in H₂SO₄ (2025), and one asks which set of three molecules is in decreasing order of the oxidation state of a marked atom (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchrr-redox",
      name: "Oxidation, reduction and redox reactions",
      intuition:
        "When zinc is dipped in copper sulphate solution, zinc atoms give electrons to copper ions. Zinc goes into solution as Zn²⁺ and copper comes out as metal. Losing electrons is oxidation, gaining them is reduction, and the two always happen together: one substance cannot lose electrons unless another takes them. That is why such a reaction is called a redox reaction. To keep track of the electrons in any compound, each atom is given an oxidation number: the charge it would carry if every bond in the compound were ionic.",
      definition:
        "- **Oxidation:** loss of electrons. In older terms, adding oxygen (or another electronegative element) to a substance, or removing hydrogen (or an electropositive element) from it.\n" +
        "- **Reduction:** gain of electrons. In older terms, removing oxygen, or adding hydrogen.\n" +
        "- In terms of oxidation number, oxidation is an **increase** and reduction is a **decrease**.\n" +
        "- The **oxidising agent** takes electrons, so it is itself reduced. The **reducing agent** gives electrons, so it is itself oxidised.\n" +
        "- A reaction is a **redox reaction** only if some element changes its oxidation number. A reaction where every element keeps its oxidation number, such as a precipitation or a neutralisation, is not redox.",
      table: {
        columns: ["Way of looking", "Oxidation", "Reduction"],
        rows: [
          { cells: ["Oxygen and hydrogen", "Oxygen added, or hydrogen removed", "Oxygen removed, or hydrogen added"] },
          { cells: ["Electrons", "Electrons lost", "Electrons gained"] },
          { cells: ["Oxidation number", "Goes up", "Goes down"], noteAmber: "NEET 2024: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl is not a redox reaction, because no element changes its oxidation number." },
          { cells: ["The agent", "The reducing agent is oxidised", "The oxidising agent is reduced"] },
        ],
      },
      pyqExampleId: "a74ae6e3-3224-4a75-acef-86b29498459b",
      selfCheckExample: {
        prompt:
          "In \\(\\text{CuO} + \\text{H}_2 \\rightarrow \\text{Cu} + \\text{H}_2\\text{O}\\), name the substance oxidised, the substance reduced, the oxidising agent and the reducing agent.",
        steps: [
          "Hydrogen gains oxygen to become water, so \\(\\text{H}_2\\) is oxidised.",
          "Copper oxide loses its oxygen, so \\(\\text{CuO}\\) is reduced.",
          "The substance reduced is the oxidising agent, and the substance oxidised is the reducing agent.",
        ],
        answer: "\\(\\text{H}_2\\) is oxidised and is the reducing agent; \\(\\text{CuO}\\) is reduced and is the oxidising agent",
      },
      practiceSet: [
        { prompt: "In \\(\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}\\), which species is the oxidising agent?", answer: "\\(\\text{Cu}^{2+}\\): it takes electrons from zinc" },
        { prompt: "Is the removal of hydrogen from a substance oxidation or reduction?", answer: "Oxidation" },
        { prompt: "In \\(2\\text{Na} + \\text{Cl}_2 \\rightarrow 2\\text{NaCl}\\), which element loses electrons?", answer: "Sodium" },
        { prompt: "Does an oxidising agent gain electrons or lose them?", answer: "It gains electrons" },
      ],
      traps: [
        {
          title: "The oxidising agent is the one reduced",
          body: "An oxidising agent oxidises something else by taking its electrons, so the oxidising agent itself is reduced. In \\(\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}\\), \\(\\text{Cu}^{2+}\\) is the oxidising agent and is reduced to copper.",
        },
        {
          title: "A precipitate does not make a reaction redox",
          body: "In \\(\\text{BaCl}_2 + \\text{Na}_2\\text{SO}_4 \\rightarrow \\text{BaSO}_4 + 2\\text{NaCl}\\), barium stays +2, sodium +1, chlorine \\(-1\\) and the sulphate ion keeps its charge. Ions only change partners, so it is not a redox reaction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchrr-rules",
      name: "Rules for oxidation numbers",
      intuition:
        "A few fixed values do most of the work. Fluorine is always \\(-1\\), an alkali metal is always +1 and an alkaline earth metal always +2 in its compounds. Oxygen is usually \\(-2\\) and hydrogen usually +1, but each has exceptions worth learning by name: oxygen in peroxides and superoxides, and hydrogen bonded to a metal. Every other atom is then found by making the total come out right.",
      definition:
        "- An element in the free state has oxidation number **0**, whatever its form: Na, \\(\\text{H}_2\\), \\(\\text{O}_3\\), \\(\\text{P}_4\\), \\(\\text{S}_8\\).\n" +
        "- A monatomic ion has an oxidation number equal to its charge.\n" +
        "- In compounds, alkali metals are **+1**, alkaline earth metals **+2** and aluminium **+3**. Fluorine is **\\(-1\\)** in all its compounds.\n" +
        "- Oxygen is **\\(-2\\)** in most compounds, but **\\(-1\\)** in peroxides (\\(\\text{H}_2\\text{O}_2\\), \\(\\text{Na}_2\\text{O}_2\\)) and **\\(-\\tfrac{1}{2}\\)** in superoxides (\\(\\text{KO}_2\\), \\(\\text{RbO}_2\\)). Bonded to fluorine it is positive: +2 in \\(\\text{OF}_2\\) and +1 in \\(\\text{O}_2\\text{F}_2\\).\n" +
        "- Hydrogen is **+1** with non-metals, but **\\(-1\\)** in metal hydrides such as LiH, NaH and \\(\\text{CaH}_2\\).\n" +
        "- Chlorine, bromine and iodine are \\(-1\\) in halides, but take positive values when bonded to oxygen, as in oxoacids and oxoanions.\n" +
        "- The oxidation numbers of all atoms add up to **0** in a neutral compound and to the **charge** of a polyatomic ion.",
      table: {
        columns: ["Atom or case", "Oxidation number", "Example"],
        rows: [
          { cells: ["Element in the free state", "0", "O₃, P₄, S₈, Na"] },
          { cells: ["Alkali metal in a compound", "+1", "K in KO₂, Na in NaH"], noteAmber: "NEET 2025: K in KO₂ is +1, O in H₂O₂ is −1 and S in H₂SO₄ is +6." },
          { cells: ["Alkaline earth metal in a compound", "+2", "Ca in CaH₂"] },
          { cells: ["Fluorine in a compound", "−1", "F in OF₂"] },
          { cells: ["Oxygen in most compounds", "−2", "O in H₂O, SO₃"] },
          { cells: ["Oxygen in a peroxide", "−1", "O in H₂O₂, Na₂O₂"] },
          { cells: ["Oxygen in a superoxide", "−½", "O in KO₂, RbO₂"] },
          { cells: ["Oxygen bonded to fluorine", "+2 in OF₂, +1 in O₂F₂", "OF₂, O₂F₂"] },
          { cells: ["Hydrogen with a non-metal", "+1", "H in HCl, H₂O"] },
          { cells: ["Hydrogen in a metal hydride", "−1", "H in LiH, CaH₂"] },
        ],
      },
      pyqExampleId: "e762fd30-5d33-4010-b56b-b1de001e3a8c",
      selfCheckExample: {
        prompt: "Give the oxidation number of hydrogen in \\(\\text{CaH}_2\\) and of oxygen in \\(\\text{OF}_2\\).",
        steps: [
          "In \\(\\text{CaH}_2\\), calcium is +2, so the two hydrogens share \\(-2\\): each is \\(-1\\).",
          "In \\(\\text{OF}_2\\), each fluorine is \\(-1\\), so oxygen must be +2 for the total to be 0.",
        ],
        answer: "Hydrogen \\(-1\\); oxygen +2",
      },
      practiceSet: [
        { prompt: "What is the oxidation number of oxygen in ozone, \\(\\text{O}_3\\)?", answer: "0" },
        { prompt: "What is the oxidation number of oxygen in the superoxide \\(\\text{RbO}_2\\)?", answer: "\\(-\\tfrac{1}{2}\\)" },
        { prompt: "What are the oxidation numbers of sodium and hydrogen in NaH?", answer: "Sodium +1, hydrogen \\(-1\\)" },
        { prompt: "What is the oxidation number of chlorine in \\(\\text{Cl}_2\\text{O}\\)?", answer: "+1" },
      ],
      traps: [
        {
          title: "Oxygen is not always minus two",
          body: "Oxygen is \\(-1\\) in a peroxide such as \\(\\text{H}_2\\text{O}_2\\), \\(-\\tfrac{1}{2}\\) in a superoxide such as \\(\\text{KO}_2\\), and +2 in \\(\\text{OF}_2\\). Using \\(-2\\) in \\(\\text{KO}_2\\) would wrongly make potassium +4.",
        },
        {
          title: "Hydrogen bonded to a metal is minus one",
          body: "In LiH, NaH and \\(\\text{CaH}_2\\), hydrogen is \\(-1\\), because the metal is the positive partner. It is +1 only when bonded to a non-metal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchrr-finding",
      name: "Finding an oxidation number",
      intuition:
        "Write the unknown oxidation number as x, put in the fixed values from the rules, multiply each by how many atoms there are, and make the total equal the charge on the species. Two cases need care. If the answer is a fraction, it is an average over atoms of the same element in different states. And if a molecule holds two oxygens bonded to each other (a peroxo link), those two oxygens are \\(-1\\), not \\(-2\\).",
      definition:
        "- Add up (number of atoms) × (oxidation number) for every element and set the sum equal to the charge: 0 for a neutral compound.\n" +
        "- A **fractional** answer is an average. In \\(\\text{Fe}_3\\text{O}_4\\), \\(3x + 4(-2) = 0\\) gives \\(x = +\\tfrac{8}{3}\\): the oxide holds iron in two states, +2 and +3.\n" +
        "- A **peroxo link** (an oxygen bonded to another oxygen) makes each of its two oxygens \\(-1\\). Peroxomonosulphuric acid \\(\\text{H}_2\\text{SO}_5\\) has one such link, and \\(\\text{CrO}_5\\) has two.\n" +
        "- An answer above the number of valence electrons the atom has (above +6 for chromium or sulphur) is a sign that a peroxo link was missed.",
      formula: {
        label: "Sum of oxidation numbers",
        latex: "\\sum_i n_i x_i = q",
        symbols: [
          { symbol: "\\(n_i\\)", meaning: "number of atoms of element i in the formula" },
          { symbol: "\\(x_i\\)", meaning: "oxidation number of element i" },
          { symbol: "\\(q\\)", meaning: "charge on the species, 0 for a neutral compound" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the oxidation number of chromium in \\(\\text{CrO}_5\\), in which one oxygen is joined to chromium by a double bond and the other four form two peroxo links.",
        steps: [
          "The double-bonded oxygen is \\(-2\\). The four peroxo oxygens are \\(-1\\) each.",
          "\\(x + (-2) + 4(-1) = 0\\), so \\(x = +6\\).",
          "Taking every oxygen as \\(-2\\) would give \\(x = +10\\), which chromium, with six valence electrons, cannot reach.",
        ],
        answer: "+6",
      },
      selfCheckExample: {
        prompt: "Find the oxidation number of sulphur in \\(\\text{H}_2\\text{SO}_5\\), which has one peroxo link.",
        steps: [
          "Two hydrogens are +1 each. Of the five oxygens, two are in the peroxo link (\\(-1\\) each) and three are \\(-2\\).",
          "\\(2(+1) + x + 3(-2) + 2(-1) = 0\\), so \\(x - 6 = 0\\) and \\(x = +6\\).",
        ],
        answer: "+6",
      },
      practiceSet: [
        { prompt: "Find the oxidation number of manganese in \\(\\text{KMnO}_4\\).", answer: "+7" },
        { prompt: "Find the oxidation number of chromium in \\(\\text{Cr}_2\\text{O}_7^{2-}\\).", answer: "+6" },
        { prompt: "Find the oxidation number of nitrogen in \\(\\text{NH}_4^+\\).", answer: "\\(-3\\)" },
        { prompt: "Find the average oxidation number of iron in \\(\\text{Fe}_3\\text{O}_4\\).", answer: "\\(+\\tfrac{8}{3}\\)" },
      ],
      pyqExampleId: "8c4d9619-735e-496a-bb8f-4d17ef420381",
      traps: [
        {
          title: "Multiply by the number of atoms",
          body: "In \\(\\text{Cr}_2\\text{O}_7^{2-}\\), \\(2x + 7(-2) = -2\\) gives \\(x = +6\\). Forgetting the 2 in front of x gives +12, which is impossible.",
        },
        {
          title: "Look for a peroxo link before using minus two",
          body: "In \\(\\text{CrO}_5\\) four oxygens sit in peroxo links at \\(-1\\) each, so chromium is +6, not +10.",
        },
        {
          title: "A fractional oxidation number is an average",
          body: "Iron in \\(\\text{Fe}_3\\text{O}_4\\) works out to \\(+\\tfrac{8}{3}\\). No single iron atom has that value; the oxide holds iron at +2 and at +3.",
        },
      ],
    },
  ],
};
