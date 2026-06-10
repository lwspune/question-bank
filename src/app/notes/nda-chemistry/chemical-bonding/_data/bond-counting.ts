import type { SubtopicNote } from "@/app/notes/_types";

export const BOND_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Bond Counting and Molecular Structure",
  title: "Bond Counting and Molecular Structure",
  oneLineDefinition:
    "Once you know how many bonds each atom forms, you can count every covalent bond in a small molecule by adding up the C–C, C–H and C–X links — and you can spot odd-electron molecules that pair up (dimerize) to satisfy the octet.",
  whyItMatters:
    "A small subtopic — 2 PYQs — but a reliable one. The bank gives a molecular formula and asks for the total number of covalent bonds, or names an oxide and asks which one dimerizes. " +
    "Both come straight from the valency rules: carbon forms 4 bonds, hydrogen 1, oxygen 2, and an atom with an unpaired electron will pair up with a partner.",
  concepts: [
    // counting covalent bonds (formula variant)
    {
      kind: "formula" as const,
      slug: "counting-covalent-bonds",
      name: "Counting the covalent bonds in a molecule",
      intuition:
        "Each atom forms a fixed number of bonds — carbon 4, hydrogen 1, oxygen 2, chlorine 1, nitrogen 3. To count the bonds in a molecule, just tally the links: the carbon skeleton (C–C bonds), then every C–H, C–O, O–H or C–Cl bond around it. " +
        "The bank gives a formula like C₃H₇Cl and asks for the total.",
      definition:
        "How to count covalent bonds:\n" +
        "- Each **single bond is one shared pair = one covalent bond**. (A double bond counts as the structure dictates; for these PYQs the molecules are all single-bonded.)\n" +
        "- Bonds per atom: **C = 4, N = 3, O = 2, H = 1, Cl = 1**.\n" +
        "- Build the skeleton, then add bonds: for **C₃H₇Cl** — C–C bonds = 2, C–H bonds = 7, C–Cl bond = 1 → **10** covalent bonds.\n" +
        "- For **methanol CH₃OH (CH₄O)** — C–H bonds = 3, C–O bond = 1, O–H bond = 1 → **5** covalent bonds.",
      formula: {
        label: "Bonds formed per atom",
        latex: "\\text{C}=4 \\quad \\text{N}=3 \\quad \\text{O}=2 \\quad \\text{H}=1 \\quad \\text{Cl}=1",
      },
      pyqExampleId: "99618823-c0eb-4b01-8286-c70cc5863d8a", // total covalent bonds in methanol = 5
      authoredExample: {
        prompt:
          "How many covalent bonds are present in a chloropropane molecule, C₃H₇Cl?",
        steps: [
          "The three carbons form a chain: that is 2 C–C bonds.",
          "The seven hydrogens each bond to a carbon: 7 C–H bonds.",
          "The one chlorine bonds to a carbon: 1 C–Cl bond.",
          "Total = 2 + 7 + 1 = 10 covalent bonds.",
        ],
        answer: "10 covalent bonds.",
      },
      selfCheckExample: {
        prompt: "How many covalent bonds are present in an ethane molecule, C₂H₆?",
        steps: [
          "The two carbons join with one C–C bond.",
          "The six hydrogens each bond to a carbon: 6 C–H bonds.",
          "Total = 1 + 6 = 7 covalent bonds.",
        ],
        answer: "7 covalent bonds.",
      },
      practiceSet: [
        { prompt: "Total covalent bonds in C₃H₇Cl (chloropropane)?", answer: "10", method: "2 C–C + 7 C–H + 1 C–Cl" },
        { prompt: "Total covalent bonds in methanol CH₃OH?", answer: "5", method: "3 C–H + 1 C–O + 1 O–H" },
        { prompt: "How many bonds does a carbon atom form?", answer: "4" },
        { prompt: "Total covalent bonds in methane CH₄?", answer: "4", method: "four C–H bonds" },
        { prompt: "Total covalent bonds in water H₂O?", answer: "2", method: "two O–H bonds" },
      ],
      traps: [
        {
          title: "Count every link, including the O–H in an alcohol",
          body:
            "For methanol CH₃OH the answer is **5**, not 4 — don't forget the **O–H** bond on top of the three C–H bonds and the C–O bond. Tally the whole skeleton, every atom included.",
        },
      ],
    },

    // odd-electron molecules / dimerization (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "odd-electron-dimerization",
      name: "Odd-electron molecules and dimerization",
      intuition:
        "A molecule with an odd total number of valence electrons must have one unpaired electron — it is a free radical. Such molecules are reactive and often pair up with a copy of themselves (dimerize) so that the lone electrons join into a bond and both atoms reach a stable arrangement. " +
        "The bank asks which nitrogen oxide dimerizes.",
      definition:
        "Dimerization of odd-electron molecules:\n" +
        "- A molecule with an **odd number of valence electrons** has an **unpaired electron** — it is a **paramagnetic free radical**.\n" +
        "- Two such molecules can join, pairing their lone electrons into a new bond — this is **dimerization**.\n" +
        "- **Nitrogen dioxide NO₂** has an unpaired electron, so it readily dimerizes to **dinitrogen tetroxide N₂O₄**: 2 NO₂ ⇌ N₂O₄.\n" +
        "- The other common nitrogen oxides (N₂O, N₂O₃, N₂O₅) have all electrons paired and do **not** dimerize this way.",
      pyqExampleId: "ec0b0031-c5b0-4fee-af5e-3e1ef42cc8d9", // which nitrogen oxide dimerizes — NO2
      authoredExample: {
        prompt: "Which of these nitrogen oxides may dimerize: N₂O, NO₂, N₂O₃ or N₂O₅?",
        steps: [
          "Count the valence electrons: NO₂ has an odd total, leaving one electron unpaired (a radical).",
          "An unpaired electron makes NO₂ reactive — it pairs up with another NO₂.",
          "The two lone electrons join into a new N–N bond: 2 NO₂ → N₂O₄.",
        ],
        answer: "NO₂ — it has an unpaired electron, so it dimerizes to N₂O₄.",
      },
      selfCheckExample: {
        prompt: "Why does NO₂ dimerize to N₂O₄ while N₂O₅ does not?",
        steps: [
          "NO₂ has an odd number of valence electrons → one is unpaired (a free radical).",
          "Pairing that lone electron with another NO₂'s lone electron forms an N–N bond → N₂O₄.",
          "N₂O₅ already has all its electrons paired, so there is no unpaired electron to share.",
        ],
        answer: "NO₂ has an unpaired electron and dimerizes; N₂O₅ is fully paired, so it does not.",
      },
      practiceSet: [
        { prompt: "Which nitrogen oxide dimerizes?", answer: "NO₂", method: "it has an unpaired electron" },
        { prompt: "What does NO₂ dimerize into?", answer: "N₂O₄ (dinitrogen tetroxide)" },
        { prompt: "What is a molecule with one unpaired electron called?", answer: "A free radical" },
        { prompt: "Is NO₂ paramagnetic or diamagnetic?", answer: "Paramagnetic", method: "it has an unpaired electron" },
      ],
      traps: [
        {
          title: "NO₂ dimerizes because it is a radical, not N₂O or N₂O₅",
          body:
            "Among the nitrogen oxides only **NO₂** has an unpaired electron, so it is the one that dimerizes (to N₂O₄). N₂O, N₂O₃ and N₂O₅ are all even-electron and do not pair up this way.",
        },
      ],
    },
  ],
};
