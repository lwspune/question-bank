import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_BOND_NOTE: SubtopicNote = {
  subtopicName: "Nature of C-X Bond",
  title: "Nature of the C-X Bond",
  oneLineDefinition:
    "Why the carbon-halogen bond is polar, how its length and strength change from C-F to C-I, and why the C-X bond of a haloarene is shorter and stronger than that of a haloalkane.",
  whyItMatters:
    "3 questions. Two are 2023 assertion-reason items: why iodoethane is substituted more easily than chloroethane, and whether resonance makes the C-Cl bond of chlorobenzene weaker. The textbook asks which of CH₂Cl₂, CHCl₃ and CCl₄ has the highest dipole moment. The same two ideas return as \"give reason\" parts on the Chemical Reactions page every year from 2023 to 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcha-cx-bond",
      name: "Polarity, length and strength of the C-X bond",
      intuition:
        "A halogen is more electronegative than carbon, so it pulls the bonding pair towards itself: the carbon becomes slightly positive and is the place a nucleophile attacks. Going down the group the halogen atom gets bigger, so the bond gets longer and weaker. A weaker bond breaks more easily, which is why iodides react fastest.",
      definition:
        "- Halogens are more electronegative than carbon, so the C-X bond is **polarised**: carbon carries a partial positive charge (δ+), the halogen a partial negative charge (δ-).\n" +
        "- Down the group the halogen atom gets larger (F smallest, I largest), so the **C-X bond length increases** from C-F to C-I.\n" +
        "- The **bond enthalpy decreases** from C-F to C-I, so C-I is the easiest bond to break.\n" +
        "- So for a given alkyl group the reactivity is R-I > R-Br > R-Cl >> R-F, in both SN1 and SN2.\n" +
        "- The dipole moment does not follow electronegativity alone: CH₃Cl has a slightly higher dipole moment than CH₃F.",
      table: {
        columns: ["Bond", "Bond length (pm)", "Bond enthalpy (kJ/mol)", "Dipole moment (D)"],
        rows: [
          { cells: ["CH₃-F", "139", "452", "1.847"] },
          { cells: ["CH₃-Cl", "178", "351", "1.860"] },
          { cells: ["CH₃-Br", "193", "293", "1.830"] },
          { cells: ["CH₃-I", "214", "234", "1.636"] },
        ],
        caption: "Table 6.2 of the NCERT chapter.",
      },
      selfCheckExample: {
        prompt: "Arrange the bonds C-Br, C-F, C-I and C-Cl in increasing order of bond length, and say which one breaks most easily.",
        steps: [
          "Bond length grows with the size of the halogen atom: F < Cl < Br < I.",
          "The longest bond is the weakest (lowest bond enthalpy), so it breaks most easily.",
        ],
        answer: "C-F < C-Cl < C-Br < C-I; the C-I bond breaks most easily",
      },
      practiceSet: [
        { prompt: "Which carbon-halogen bond has the highest bond enthalpy?", answer: "C-F (452 kJ/mol)" },
        { prompt: "In a C-Br bond, which atom carries the partial positive charge?", answer: "Carbon, because bromine is more electronegative" },
        { prompt: "Each C-Cl bond in CCl₄ is polar. Why is the dipole moment of CCl₄ zero?", answer: "The four C-Cl bond moments point to the corners of a regular tetrahedron and cancel" },
      ],
      pyqExampleId: "a093260a-2bd0-4f48-871d-3110c5807f59",
      traps: [
        {
          title: "Reading the comparison backwards",
          body: "The C-I bond is the WEAKEST of the four. An assertion-reason item may print the comparison the wrong way round (\"C-Cl bond energy is less than C-I\"): then the Reason is false and the answer is (C), A true and R false.",
        },
        {
          title: "Highest electronegativity, highest dipole moment",
          body: "Fluorine is the most electronegative halogen, yet Table 6.2 gives CH₃Cl the highest dipole moment (1.860 D). Do not predict the dipole moment from electronegativity alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-aryl-bond",
      name: "The C-X bond of a haloarene: shorter and stronger",
      intuition:
        "In chlorobenzene a lone pair on chlorine spreads into the ring, so the C-Cl bond gets a little double bond character. The carbon holding chlorine is also sp², which holds the bonding pair more tightly than an sp³ carbon. Both make the bond shorter and stronger, so it is hard to break. Resonance strengthens this bond; it never weakens it.",
      definition:
        "- **Resonance:** the lone pairs on the halogen are in conjugation with the π electrons of the ring, so the C-X bond gets **partial double bond character**.\n" +
        "- **Hybridisation:** the carbon bonded to X is sp² in a haloarene (more s-character, more electronegative) but sp³ in a haloalkane. The sp² carbon holds the bonding pair more tightly.\n" +
        "- Result: the C-Cl bond is **177 pm in a haloalkane but 169 pm in a haloarene**. A shorter bond is harder to break, so haloarenes are much less reactive towards nucleophilic substitution.\n" +
        "- The same two effects make the dipole moment of chlorobenzene lower than that of cyclohexyl chloride.",
      table: {
        columns: ["Property", "Haloalkane, e.g. cyclohexyl chloride", "Haloarene, e.g. chlorobenzene"],
        rows: [
          { cells: ["Carbon bonded to Cl", "sp³ hybridised", "sp² hybridised (more s-character)"] },
          { cells: ["Nature of the C-Cl bond", "Pure single bond", "Partial double bond character from resonance"] },
          { cells: ["C-Cl bond length", "177 pm", "169 pm"] },
          { cells: ["Dipole moment", "Higher", "Lower"] },
          { cells: ["Nucleophilic substitution", "Takes place readily", "Very difficult"] },
        ],
      },
      selfCheckExample: {
        prompt: "Vinyl chloride, CH₂=CHCl, is also very unreactive towards nucleophiles. Explain using the C-Cl bond.",
        steps: [
          "A lone pair on chlorine is in conjugation with the C=C π bond, so the C-Cl bond gets partial double bond character.",
          "The carbon holding chlorine is sp², so it holds the bonding pair tightly.",
          "Both make the C-Cl bond shorter and stronger, so it is hard for a nucleophile to break it.",
        ],
        answer: "Resonance and sp² carbon make the C-Cl bond short and strong",
      },
      practiceSet: [
        { prompt: "State the hybridisation of the carbon bonded to chlorine in chlorobenzene.", answer: "sp²" },
        { prompt: "Does resonance make the C-Cl bond of chlorobenzene stronger or weaker?", answer: "Stronger: it gets partial double bond character" },
        { prompt: "Give the C-Cl bond length in a haloalkane and in a haloarene.", answer: "177 pm in a haloalkane, 169 pm in a haloarene" },
      ],
      pyqExampleId: "dd6edee7-0493-44a3-8ab9-9f8a5c56b66d",
      traps: [
        {
          title: "Saying resonance weakens the bond",
          body: "Partial double bond character makes the C-Cl bond shorter and STRONGER. A Reason that says the bond gets weaker due to resonance is false.",
        },
        {
          title: "One reason where two are asked",
          body: "For \"why is the C-Cl bond of chlorobenzene shorter\" give both resonance (partial double bond) and hybridisation (sp² carbon). One alone earns half the marks.",
        },
      ],
    },
  ],
};
