import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CB_POLARITY_NOTE: SubtopicNote = {
  subtopicName: "Polarity and Hydrogen Bonding",
  title: "Polarity and Hydrogen Bonding",
  oneLineDefinition:
    "Bond dipoles and the net dipole moment of a molecule, why symmetric molecules are non-polar, partial covalent character in ionic bonds, and hydrogen bonds within and between molecules.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. Three are about dipole moments: the one non-polar molecule among four (SbCl₅, 2021), the one molecule with a non-zero dipole moment (HI, Re-NEET 2024), and an order of dipole moments inside a pick-the-correct-statements question (2025). One asks which nitrophenol has an intramolecular hydrogen bond (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcb-dipole",
      name: "Dipole moment and polarity",
      intuition:
        "When two different atoms share electrons, the more electronegative one pulls the pair closer and becomes slightly negative. That bond has a dipole. A molecule's dipole moment is all its bond dipoles added as arrows. If the shape is symmetric, the arrows cancel and the molecule is non-polar even though its bonds are polar. So decide polarity from the SHAPE first.",
      definition:
        "- Dipole moment \\(\\mu = q \\times d\\) (charge times distance). Unit: the debye, \\(1\\ \\text{D} = 3.33564 \\times 10^{-30}\\ \\text{C m}\\).\n" +
        "- Symmetric shapes cancel their bond dipoles: \\(\\text{CO}_2\\) (linear), \\(\\text{BF}_3\\) (trigonal planar), \\(\\text{CCl}_4\\) (tetrahedral), \\(\\text{PCl}_5\\) and \\(\\text{SbCl}_5\\) (trigonal bipyramidal), \\(\\text{SF}_6\\) (octahedral). All have \\(\\mu = 0\\).\n" +
        "- Polar: any heteronuclear diatomic (\\(\\text{HCl}\\), \\(\\text{HI}\\)), bent \\(\\text{H}_2\\text{O}\\) and \\(\\text{NO}_2\\), pyramidal \\(\\text{NH}_3\\).\n" +
        "- \\(\\text{NH}_3\\) (1.47 D) has a larger dipole moment than \\(\\text{NF}_3\\) (0.24 D): in \\(\\text{NH}_3\\) the lone pair's moment adds to the bond moments, in \\(\\text{NF}_3\\) it partly cancels them.\n" +
        "- **Fajans' rules** (covalent character in an ionic bond): a smaller cation, a larger anion and a higher charge on either make the bond more covalent.",
      table: {
        columns: ["Molecule", "Shape", "Dipole moment"],
        rows: [
          { cells: ["\\(\\text{H}_2\\text{O}\\)", "Bent", "1.85 D"] },
          { cells: ["\\(\\text{NH}_3\\)", "Trigonal pyramidal", "1.47 D"] },
          { cells: ["\\(\\text{NF}_3\\)", "Trigonal pyramidal", "0.24 D"] },
          { cells: ["\\(\\text{CO}_2\\)", "Linear", "Zero"] },
          { cells: ["\\(\\text{BF}_3\\)", "Trigonal planar", "Zero"], noteAmber: "Re-NEET 2024: CCl₄, CO₂ and BF₃ have zero dipole moment; HI does not." },
          { cells: ["\\(\\text{CCl}_4\\)", "Tetrahedral", "Zero"] },
        ],
      },
      pyqExampleId: "57f6455f-c1d9-42a7-a336-fda015462c05",
      selfCheckExample: {
        prompt: "CO₂ and H₂O both have polar bonds. Why is CO₂ non-polar while H₂O is polar?",
        steps: [
          "CO₂ is linear: its two C=O bond dipoles point in opposite directions and cancel.",
          "H₂O is bent: its two O-H bond dipoles point partly the same way and add up.",
        ],
        answer: "CO₂ is linear so its bond dipoles cancel; H₂O is bent so they do not",
      },
      practiceSet: [
        { prompt: "Which has the larger dipole moment, NH₃ or NF₃?", answer: "NH₃" },
        { prompt: "What is the dipole moment of CCl₄?", answer: "Zero" },
        { prompt: "By Fajans' rules, which is more covalent: LiCl or KCl?", answer: "LiCl (the smaller cation polarises the anion more)" },
        { prompt: "Is a molecule with polar bonds always polar?", answer: "No: a symmetric shape cancels the bond dipoles" },
      ],
      traps: [
        {
          title: "Polar bonds can give a non-polar molecule",
          body: "\\(\\text{BF}_3\\), \\(\\text{CCl}_4\\) and \\(\\text{SbCl}_5\\) all have polar bonds, but their symmetric shapes cancel the bond dipoles to zero.",
        },
        {
          title: "NF₃ has the smaller dipole moment",
          body: "Fluorine is more electronegative than hydrogen, yet \\(\\text{NF}_3\\) (0.24 D) is far less polar than \\(\\text{NH}_3\\) (1.47 D), because its lone pair's moment opposes the N-F bond moments.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcb-hydrogen-bond",
      name: "Hydrogen bonding",
      intuition:
        "When hydrogen is bonded to a small, very electronegative atom (F, O or N), it is left with a strong positive charge. It is then attracted to a lone pair on another F, O or N nearby. That attraction is the hydrogen bond. It is much weaker than a covalent bond but strong enough to raise boiling points. It can form between two molecules, or between two groups inside one molecule when they sit close together.",
      definition:
        "- Forms when H is bonded to **F, O or N** and meets a lone pair on another such atom.\n" +
        "- **Intermolecular:** between different molecules, as in HF and water. It raises the boiling point.\n" +
        "- **Intramolecular:** between two groups in the SAME molecule, as in **o-nitrophenol**, where the -OH and -NO₂ groups are next to each other on the ring.\n" +
        "- In p-nitrophenol and m-nitrophenol the two groups are too far apart, so they form intermolecular hydrogen bonds instead.\n" +
        "- The magnitude of hydrogen bonding depends on the physical state: it is greatest in the solid state and least in the gaseous state.",
      table: {
        columns: ["Compound", "Hydrogen bond", "Why"],
        rows: [
          { cells: ["o-Nitrophenol", "Intramolecular", "The -OH and -NO₂ groups are on neighbouring ring carbons"], noteAmber: "NEET 2024: intramolecular hydrogen bonding is present in o-nitrophenol." },
          { cells: ["p-Nitrophenol", "Intermolecular", "The two groups face opposite ways"] },
          { cells: ["HF", "Intermolecular", "Zigzag chains of HF molecules"] },
          { cells: ["Water", "Intermolecular", "Each molecule bonds to its neighbours"] },
        ],
      },
      pyqExampleId: "1258b085-90a6-49f2-bfa4-feccab8fb163",
      selfCheckExample: {
        prompt: "Hydrogen bonds hold water molecules together. In which state of water are they strongest, and in which weakest?",
        steps: [
          "Hydrogen bonding is greatest where the molecules are held closest and longest.",
          "That is the solid; in the gas the molecules are far apart.",
        ],
        answer: "Strongest in ice (solid), weakest in steam (gas)",
      },
      practiceSet: [
        { prompt: "Which three elements bonded to hydrogen can form hydrogen bonds?", answer: "F, O and N" },
        { prompt: "Is the hydrogen bond in water intermolecular or intramolecular?", answer: "Intermolecular" },
        { prompt: "Why does HF boil at a much higher temperature than HCl?", answer: "HF molecules are held together by hydrogen bonds; HCl molecules are not" },
        { prompt: "Is a hydrogen bond stronger or weaker than a covalent bond?", answer: "Weaker" },
      ],
      traps: [
        {
          title: "Only the ortho isomer bonds within itself",
          body: "Intramolecular hydrogen bonding needs the two groups side by side, as in o-nitrophenol. The para and meta isomers bond between molecules.",
        },
        {
          title: "Strongest in the solid",
          body: "Hydrogen bonding is greatest in the solid and least in the gas. A statement putting it maximum in the gaseous state is false.",
        },
      ],
    },
  ],
};
