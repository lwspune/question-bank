import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CC_VBT_NOTE: SubtopicNote = {
  subtopicName: "Valence Bond Theory and Magnetic Moments",
  title: "Valence Bond Theory and Magnetic Moments",
  oneLineDefinition:
    "Valence bond theory links a complex's hybridisation to its shape and to whether its d electrons pair up; the number of unpaired electrons n then gives the spin-only magnetic moment μ = √(n(n+2)) BM.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026. Two use valence bond theory: NEET 2026 matched four complexes with their shapes (square planar, octahedral, tetrahedral, trigonal bipyramidal), and NEET 2024 asked why [Co(NH₃)₆]³⁺ is diamagnetic but [CoF₆]³⁻ paramagnetic. Three count unpaired electrons: four iron complexes matched with their spin-only moments (2021), the paramagnetic nickel complexes in a list (2025), and the complex with the highest spin-only moment (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcc-vbt",
      name: "Hybridisation and shape by valence bond theory",
      intuition:
        "In valence bond theory the metal ion mixes some of its empty s, p and d orbitals into a set of equal hybrid orbitals, one for each ligand. Each ligand puts a lone pair into one of them. The kind of hybrid sets the shape. A strong-field ligand can push the metal's d electrons to pair up, which empties inner d orbitals for the hybrid set and leaves fewer unpaired electrons.",
      definition:
        "- **Inner orbital (low spin) complex**: uses the inner \\((n-1)d\\) orbitals, \\(d^2sp^3\\). Strong-field ligands such as \\(\\text{CN}^-\\) and CO pair the d electrons; \\(\\text{NH}_3\\) does so for \\(\\text{Co}^{3+}\\).\n" +
        "- **Outer orbital (high spin) complex**: uses the outer \\(nd\\) orbitals, \\(sp^3d^2\\). A weak-field ligand such as \\(\\text{F}^-\\) leaves the d electrons unpaired.\n" +
        "- \\(\\text{Ni}^{2+}\\) (\\(3d^8\\)): with \\(\\text{Cl}^-\\), \\(sp^3\\), tetrahedral, two unpaired electrons. With \\(\\text{CN}^-\\) the electrons pair, \\(dsp^2\\), square planar, diamagnetic.\n" +
        "- In \\(\\text{[Ni(CO)}_4\\text{]}\\) nickel is 0, its ten electrons fill the 3d orbitals, and it is \\(sp^3\\), tetrahedral and diamagnetic.\n" +
        "- Limits of the theory: it does not explain the colour of complexes and does not tell strong-field from weak-field ligands.",
      table: {
        columns: ["Coordination number", "Hybridisation", "Shape", "Examples"],
        rows: [
          { cells: ["4", "\\(sp^3\\)", "Tetrahedral", "\\(\\text{[Ni(CO)}_4\\text{]}\\), \\(\\text{[NiCl}_4\\text{]}^{2-}\\)"], noteAmber: "NEET 2026 matched [NiCl₄]²⁻ with tetrahedral." },
          { cells: ["4", "\\(dsp^2\\)", "Square planar", "\\(\\text{[Ni(CN)}_4\\text{]}^{2-}\\), \\(\\text{[Pt(NH}_3\\text{)}_2\\text{Cl}_2\\text{]}\\)"] },
          { cells: ["5", "\\(dsp^3\\)", "Trigonal bipyramidal", "\\(\\text{[Fe(CO)}_5\\text{]}\\)"], noteAmber: "NEET 2026 matched [Fe(CO)₅] with trigonal bipyramidal." },
          { cells: ["6", "\\(d^2sp^3\\) (inner orbital)", "Octahedral", "\\(\\text{[Co(NH}_3\\text{)}_6\\text{]}^{3+}\\), \\(\\text{[Fe(CN)}_6\\text{]}^{3-}\\)"], noteAmber: "NEET 2024: [Co(NH₃)₆]³⁺ is diamagnetic, [CoF₆]³⁻ paramagnetic, though both are octahedral." },
          { cells: ["6", "\\(sp^3d^2\\) (outer orbital)", "Octahedral", "\\(\\text{[CoF}_6\\text{]}^{3-}\\)"] },
        ],
      },
      pyqExampleId: "855db9fb-507f-41a4-b05e-a1fd09c45cc6",
      selfCheckExample: {
        prompt: "Give the hybridisation of iron in \\(\\text{[Fe(CN)}_6\\text{]}^{3-}\\) and its number of unpaired electrons.",
        steps: [
          "\\(\\text{Fe}^{3+}\\) is \\(3d^5\\).",
          "\\(\\text{CN}^-\\) is a strong-field ligand: the five electrons pair into three 3d orbitals (2, 2, 1), leaving two 3d orbitals empty.",
          "Two 3d, one 4s and three 4p orbitals give \\(d^2sp^3\\).",
        ],
        answer: "\\(d^2sp^3\\) (inner orbital), with 1 unpaired electron",
      },
      practiceSet: [
        { prompt: "What hybridisation does nickel use in \\(\\text{[Ni(CO)}_4\\text{]}\\)?", answer: "\\(sp^3\\) (tetrahedral)" },
        { prompt: "Which hybridisation gives a square planar complex?", answer: "\\(dsp^2\\)" },
        { prompt: "Is \\(\\text{[CoF}_6\\text{]}^{3-}\\) an inner orbital or an outer orbital complex?", answer: "Outer orbital (\\(sp^3d^2\\))" },
        { prompt: "Which d orbitals does an inner orbital complex of a 3d metal use in its hybrid set?", answer: "The 3d orbitals" },
      ],
      traps: [
        {
          title: "Same metal ion, different magnetism",
          body: "\\(\\text{Co}^{3+}\\) is \\(3d^6\\) in both. With \\(\\text{NH}_3\\) the electrons pair (\\(d^2sp^3\\), diamagnetic); with \\(\\text{F}^-\\) they do not (\\(sp^3d^2\\), four unpaired, paramagnetic).",
        },
        {
          title: "Four ligands can mean two shapes",
          body: "A four-coordinate complex is tetrahedral (\\(sp^3\\)) or square planar (\\(dsp^2\\)). For \\(\\text{Ni}^{2+}\\), \\(\\text{Cl}^-\\) gives tetrahedral and \\(\\text{CN}^-\\) gives square planar.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcc-magnetic",
      name: "Unpaired electrons and the spin-only magnetic moment",
      intuition:
        "Each unpaired electron behaves like a tiny magnet. A complex with unpaired electrons is pulled into a magnetic field (paramagnetic); one with every electron paired is not (diamagnetic). Count the unpaired electrons n and the formula gives the size of the moment. The count needs two things: how many d electrons the metal ion has, and whether the ligand is strong enough to pair them.",
      definition:
        "- d electrons of a first-row ion = group number minus oxidation state. \\(\\text{Fe}^{3+}\\): \\(8 - 3 = 5\\). \\(\\text{Co}^{3+}\\): \\(9 - 3 = 6\\).\n" +
        "- Weak-field ligands (\\(\\text{F}^-\\), \\(\\text{Cl}^-\\), \\(\\text{H}_2\\text{O}\\)): electrons stay unpaired as far as they can (high spin).\n" +
        "- Strong-field ligands (\\(\\text{CN}^-\\), CO, en): electrons pair (low spin). In an octahedral complex this changes n only for \\(d^4\\) to \\(d^7\\): low spin \\(d^4\\) 2, \\(d^5\\) 1, \\(d^6\\) 0, \\(d^7\\) 1.\n" +
        "- n = 1, 2, 3, 4, 5 give 1.73, 2.83, 3.87, 4.90, 5.92 BM.\n" +
        "- n at least 1: **paramagnetic**. n = 0: **diamagnetic**.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "spin-only magnetic moment in Bohr magnetons (BM)" },
          { symbol: "\\(n\\)", meaning: "number of unpaired electrons" },
        ],
      },
      authoredExample: {
        prompt: "Find the spin-only magnetic moment of \\(\\text{[Mn(H}_2\\text{O)}_6\\text{]}^{2+}\\).",
        steps: [
          "Mn is in group 7 and the ion is \\(\\text{Mn}^{2+}\\): \\(7 - 2 = 5\\) d electrons.",
          "\\(\\text{H}_2\\text{O}\\) is a weak-field ligand, so all five stay unpaired: \\(n = 5\\).",
          "\\(\\mu = \\sqrt{5 \\times 7} = \\sqrt{35} = 5.92\\) BM.",
        ],
        answer: "5.92 BM",
      },
      selfCheckExample: {
        prompt: "Find the spin-only magnetic moment of \\(\\text{[Cr(NH}_3\\text{)}_6\\text{]}^{3+}\\).",
        steps: [
          "\\(\\text{Cr}^{3+}\\): \\(6 - 3 = 3\\) d electrons.",
          "Three electrons go one each into three d orbitals whatever the ligand: \\(n = 3\\).",
          "\\(\\mu = \\sqrt{3 \\times 5} = \\sqrt{15} = 3.87\\) BM.",
        ],
        answer: "3.87 BM",
      },
      practiceSet: [
        { prompt: "What is the spin-only magnetic moment of an ion with 2 unpaired electrons?", answer: "\\(\\sqrt{8} = 2.83\\) BM" },
        { prompt: "How many unpaired electrons does \\(\\text{[Cu(NH}_3\\text{)}_4\\text{]}^{2+}\\) have, and what is its spin-only moment?", answer: "1 (\\(\\text{Cu}^{2+}\\) is \\(3d^9\\)); 1.73 BM" },
        { prompt: "How many unpaired electrons does \\(\\text{[CoF}_6\\text{]}^{3-}\\) have, and what is its spin-only moment?", answer: "4; 4.90 BM" },
        { prompt: "Is \\(\\text{[Ni(CO)}_4\\text{]}\\) paramagnetic or diamagnetic?", answer: "Diamagnetic (no unpaired electrons)" },
      ],
      pyqExampleId: "01b26ed7-fd30-4733-b709-793b96b65055",
      traps: [
        {
          title: "Count d electrons of the ion, not the atom",
          body: "\\(\\text{Fe}^{3+}\\) has 5 d electrons, not 6 (the Fe atom's 3d count) or 8 (its group number).",
        },
        {
          title: "Low spin d⁴ still has two unpaired electrons",
          body: "In \\(\\text{[Mn(CN)}_6\\text{]}^{3-}\\), \\(\\text{Mn}^{3+}\\) is \\(d^4\\). The strong field squeezes all four into three d orbitals, so only one pair forms and 2 stay unpaired: 2.83 BM, not 0.",
        },
        {
          title: "Cyanide and water give different counts for the same ion",
          body: "\\(\\text{[Fe(CN)}_6\\text{]}^{3-}\\) has 1 unpaired electron (1.73 BM); \\(\\text{[Fe(H}_2\\text{O)}_6\\text{]}^{3+}\\) has 5 (5.92 BM). Check the ligand before counting.",
        },
      ],
    },
  ],
};
