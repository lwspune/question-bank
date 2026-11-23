import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_LIGANDS_NOTE: SubtopicNote = {
  subtopicName: "Types of Ligands",
  title: "Ligands and Their Donor Atoms",
  oneLineDefinition:
    "What a ligand is, how ligands are classed as monodentate, polydentate and ambidentate by their donor atoms, and why forming a complex is a Lewis acid and base reaction.",
  whyItMatters:
    "5 questions. Two were set in board papers: whether diethylenetriamine is mono, bi, tri or tetradentate (2018), and the number of donor atoms EDTA uses (2025). The textbook adds the types of ligands with an example of each, bidentate ligands, and the Lewis acid and Lewis bases in [PtCl₂(NH₃)₂].",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscccc-denticity",
      name: "Monodentate, polydentate and ambidentate ligands",
      intuition:
        "A ligand holds the metal ion the way fingers hold a rod. Some ligands grip with one finger, some with two, and EDTA wraps round with six. Count the atoms that actually give an electron pair to the metal: that count, not the number of ligands, is what matters later for the coordination number.",
      definition:
        "- **Ligands** are the ions or molecules that surround the central metal atom or ion. They are linked to it by **coordinate bonds**, and the shared electron pair comes from the ligand.\n" +
        "- **Monodentate ligand:** a single donor atom shares an electron pair with the metal ion. Examples: \\(\\text{Cl}^-\\), \\(\\text{OH}^-\\), \\(\\text{CN}^-\\), \\(\\text{NH}_3\\) (donor N), \\(\\text{H}_2\\text{O}\\) (donor O).\n" +
        "- **Polydentate ligand:** two or more donor atoms of the same ligand are linked to the metal ion. Ethylenediamine (en, \\(\\text{H}_2\\text{N-CH}_2\\text{-CH}_2\\text{-NH}_2\\)) binds through its two N atoms and the oxalate ion \\(\\text{C}_2\\text{O}_4^{2-}\\) through two O atoms, so both are **bidentate**. \\(\\text{EDTA}^{4-}\\) binds through four O and two N atoms, so it is **hexadentate**.\n" +
        "- **Ambidentate ligand:** it has two different donor atoms and uses the electron pair of either one (one at a time) to bond. \\(\\text{NO}_2^-\\) links through N or O; \\(\\text{SCN}^-\\) links through S or N.",
      table: {
        columns: ["Type", "Donor atoms bonded to the metal", "Examples"],
        rows: [
          { cells: ["Monodentate", "One", "\\(\\text{Cl}^-\\), \\(\\text{OH}^-\\), \\(\\text{CN}^-\\), \\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\)"] },
          { cells: ["Bidentate", "Two", "Ethylenediamine (two N), oxalate ion (two O)"] },
          {
            cells: ["Tridentate", "Three", "Diethylenetriamine, \\(\\text{H}_2\\text{N-CH}_2\\text{CH}_2\\text{-NH-CH}_2\\text{CH}_2\\text{-NH}_2\\) (three N)"],
            pyqExampleId: "7ee94745-9ba3-4bbe-9ee5-7ed5ee7683f6",
            noteAmber: "Board 2018 asked what kind of ligand diethylenetriamine is. Count its N atoms: three, so tridentate.",
          },
          {
            cells: ["Hexadentate", "Six", "\\(\\text{EDTA}^{4-}\\): two N atoms and four O atoms"],
            pyqExampleId: "d09ee798-b978-42a9-921e-35568ce1b17f",
            noteAmber: "Board 2025 asked how many donor atoms EDTA uses. Name them too: two N and four O.",
          },
          { cells: ["Ambidentate", "One at a time, chosen from two different atoms", "\\(\\text{NO}_2^-\\) (N or O), \\(\\text{SCN}^-\\) (S or N)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name the donor atoms of ethylenediamine, and say how many coordinate bonds one ethylenediamine molecule forms with a metal ion.",
        steps: [
          "Ethylenediamine is \\(\\text{H}_2\\text{N-CH}_2\\text{-CH}_2\\text{-NH}_2\\): each N atom carries a lone pair.",
          "Both N atoms donate to the same metal ion, so it is bidentate.",
        ],
        answer: "Two nitrogen atoms; two coordinate bonds",
      },
      practiceSet: [
        { prompt: "Is NH₃ a monodentate or a bidentate ligand? Name its donor atom.", answer: "Monodentate; the donor atom is nitrogen" },
        { prompt: "How does an ambidentate ligand differ from a bidentate ligand?", answer: "An ambidentate ligand has two different donor atoms but bonds through only one at a time; a bidentate ligand bonds through both of its donor atoms at once" },
        { prompt: "Name one ambidentate ligand and its two possible donor atoms.", answer: "\\(\\text{SCN}^-\\): sulphur or nitrogen (or \\(\\text{NO}_2^-\\): nitrogen or oxygen)" },
      ],
      pyqExampleId: "d09ee798-b978-42a9-921e-35568ce1b17f",
      traps: [
        {
          title: "Calling an ambidentate ligand bidentate",
          body: "\\(\\text{NO}_2^-\\) has two possible donor atoms but uses only one of them at a time, so it is monodentate and ambidentate. A bidentate ligand such as en bonds through both donor atoms together.",
        },
        {
          title: "Counting atoms that do not donate",
          body: "Only atoms with a lone pair that bond to the metal count. In EDTA the carbon and hydrogen atoms donate nothing; the six donor atoms are two N and four carboxylate O.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-lewis-acid-base",
      name: "Complex formation as a Lewis acid and base reaction",
      intuition:
        "In a coordinate bond one partner brings both electrons. The ligand has a spare lone pair to give; the metal ion is short of electrons and takes it. A giver of an electron pair is a Lewis base and a taker is a Lewis acid, so every complex is a Lewis acid holding several Lewis bases.",
      definition:
        "- A **coordinate bond** forms when the shared electron pair is contributed by one atom only, here the ligand. It is drawn as an arrow whose head points to the electron acceptor.\n" +
        "- The central metal atom or ion is usually electron deficient: it **accepts** electron pairs, so it is a **Lewis acid**.\n" +
        "- The ligands **donate** electron pairs, so they are **Lewis bases**.\n" +
        "- So the formation of a coordination compound is a **Lewis acid and base interaction**. In cisplatin, two \\(\\text{NH}_3\\) molecules and two \\(\\text{Cl}^-\\) ions use their lone pairs to bond to Pt(II).",
      table: {
        columns: ["Part of the complex", "What it does with the electron pair", "Lewis type"],
        rows: [
          { cells: ["Central metal ion", "Accepts electron pairs from the ligands", "Lewis acid"] },
          { cells: ["Ligand", "Donates a lone pair from its donor atom", "Lewis base"] },
          { cells: ["Coordinate bond", "Shared pair supplied by the ligand alone; arrow points to the metal", "Bond between a Lewis base and a Lewis acid"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name the Lewis acid and the Lewis base in the complex ion \\(\\text{[Cu(NH}_3)_4]^{2+}\\).",
        steps: [
          "\\(\\text{Cu}^{2+}\\) accepts four electron pairs: Lewis acid.",
          "Each \\(\\text{NH}_3\\) donates the lone pair on its N atom: Lewis base.",
        ],
        answer: "Lewis acid: Cu²⁺; Lewis base: NH₃",
      },
      practiceSet: [
        { prompt: "Why is a ligand called a Lewis base?", answer: "It donates an electron pair to the metal ion" },
        { prompt: "In \\(\\text{[Fe(CN)}_6]^{4-}\\), which species is the Lewis base?", answer: "The cyanide ion, \\(\\text{CN}^-\\)" },
        { prompt: "In the arrow used for a coordinate bond, which atom does the arrow head point to?", answer: "The electron acceptor, that is the metal" },
      ],
      pyqExampleId: "3984bef3-9db4-42ff-b38c-a6a878ef2bb0",
      traps: [
        {
          title: "Calling the metal the base",
          body: "The metal ion takes electron pairs, so it is the Lewis acid. Every ligand, neutral or negative, is a Lewis base because it gives the pair.",
        },
      ],
    },
  ],
};
