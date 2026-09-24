import type { SubtopicNote } from "@/app/notes/_types";

export const PACKING_AND_VOIDS_NOTE: SubtopicNote = {
  subtopicName: "Packing Efficiency and Voids",
  title: "Packing Efficiency and Voids",
  oneLineDefinition:
    "Packing efficiency is the fraction of the unit cell that the atoms actually fill — 52.4% simple cubic, 68% bcc, 74% fcc and hcp — and the rest is void; in close packing every atom brings one octahedral and two tetrahedral voids.",
  whyItMatters:
    "27 PYQs, 4 of them HARD — the chapter's densest HARD cluster. Three question shapes: the occupied or void volume of a cell from its volume (multiply by 0.74, 0.68, 0.524 or their complements), the number of voids in a given number of moles (N and 2N), and the formula of a compound from which voids the cations fill. " +
    "The HARD rows are the last shape and a lost-digit stem; the arithmetic is never hard.",
  concepts: [
    // 1 — packing efficiency values
    {
      kind: "formula" as const,
      slug: "cetss-packing-efficiency-values",
      name: "Packing Efficiency: 52.4%, 68%, 74%",
      intuition:
        "Divide the volume of the atoms in the cell by the cell volume. Because the edge–radius relation fixes \\(r\\) as a multiple of \\(a\\), the ratio has no units and no numbers in it — it is a pure property of the cell type.",
      definition:
        "- **Simple cubic**: \\(\\dfrac{\\tfrac{4}{3}\\pi r^3}{(2r)^3} = \\dfrac{\\pi}{6} = 52.4\\%\\). Void 47.6%.\n" +
        "- **bcc**: \\(\\dfrac{2 \\cdot \\tfrac{4}{3}\\pi r^3}{(4r/\\sqrt{3})^3} = \\dfrac{\\sqrt{3}\\pi}{8} = 68\\%\\). Void 32%.\n" +
        "- **fcc / ccp and hcp**: \\(\\dfrac{4 \\cdot \\tfrac{4}{3}\\pi r^3}{(2\\sqrt{2}r)^3} = \\dfrac{\\pi}{3\\sqrt{2}} = 74\\%\\). Void 26%.\n" +
        "- Silver, copper, gold, aluminium are fcc — packing efficiency 74%.",
      formula: {
        label: "Packing efficiency",
        latex:
          "\\text{PE} = \\frac{n \\cdot \\tfrac{4}{3}\\pi r^3}{a^3} \\times 100:\\quad \\tfrac{\\pi}{6},\\ \\tfrac{\\sqrt{3}\\pi}{8},\\ \\tfrac{\\pi}{3\\sqrt{2}}",
      },
      authoredExample: {
        prompt: "Derive the packing efficiency of the simple cubic cell.",
        steps: [
          "One atom per cell, \\(a = 2r\\): \\(\\dfrac{\\tfrac{4}{3}\\pi r^3}{8r^3} = \\dfrac{\\pi}{6} = 0.5236\\).",
        ],
        answer: "\\(52.4\\%\\)",
      },
      selfCheckExample: {
        prompt: "What percentage of a bcc unit cell is empty, and what is the packing efficiency of silver?",
        steps: [
          "bcc packs 68%, so 32% is void.",
          "Silver is fcc: 74%.",
        ],
        answer: "32%; 74%",
      },
      practiceSet: [
        { prompt: "Packing efficiency of bcc?", answer: "68%" },
        { prompt: "Packing efficiency of hcp?", answer: "74%" },
        { prompt: "Void fraction in simple cubic?", answer: "47.6%" },
        { prompt: "Which fraction is \\(\\pi/3\\sqrt{2}\\)?", answer: "fcc (74%)" },
      ],
      pyqExampleId: "d6594faa-5c32-47a0-8db1-91de41ef3c86",
      traps: [
        {
          title: "Giving 74% for bcc",
          body:
            "bcc is the middle value, 68%. 74% belongs to the two close-packed structures (fcc and hcp), which is why they are called close packed.",
        },
      ],
    },

    // 2 — occupied and void volume
    {
      kind: "formula" as const,
      slug: "cetss-occupied-and-void-volume",
      name: "Occupied Volume, Void Volume and the Volume Per Particle",
      intuition:
        "Given the cell volume, the atoms occupy PE × V and the void is (1 − PE) × V. The volume of ONE particle is the occupied volume divided by the particles per cell. Run the same three numbers in reverse when the void volume is given and the cell volume is asked.",
      definition:
        "- Occupied volume \\(= \\text{PE} \\times V_{\\text{cell}}\\): fcc \\(0.74\\,V\\), bcc \\(0.68\\,V\\), sc \\(0.524\\,V\\).\n" +
        "- Void volume \\(= (1 - \\text{PE}) \\times V_{\\text{cell}}\\): fcc \\(0.26\\,V\\), bcc \\(0.32\\,V\\), sc \\(0.476\\,V\\).\n" +
        "- Volume of one particle \\(= \\dfrac{\\text{PE} \\times V}{n}\\): fcc \\(0.185\\,V\\), bcc \\(0.34\\,V\\), sc \\(0.524\\,V\\).\n" +
        "- Reverse: \\(V_{\\text{cell}} = \\dfrac{\\text{void volume}}{1 - \\text{PE}}\\) or \\(\\dfrac{\\text{volume of one particle}}{\\text{PE}/n}\\).",
      formula: {
        label: "Occupied and void volume",
        latex:
          "V_{\\text{occ}} = \\text{PE}\\cdot V,\\qquad V_{\\text{void}} = (1-\\text{PE})\\,V,\\qquad V_{\\text{particle}} = \\frac{\\text{PE}\\cdot V}{n}",
      },
      authoredExample: {
        prompt: "The volume of a bcc unit cell is \\(2.0 \\times 10^{-22}\\ \\text{cm}^3\\). Find the void volume and the volume of one particle.",
        steps: [
          "Void \\(= 0.32 \\times 2.0 \\times 10^{-22} = 6.4 \\times 10^{-23}\\ \\text{cm}^3\\).",
          "Occupied \\(= 0.68 \\times 2.0 \\times 10^{-22} = 1.36 \\times 10^{-22}\\); one of the two particles \\(= 6.8 \\times 10^{-23}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(6.4 \\times 10^{-23}\\ \\text{cm}^3\\); \\(6.8 \\times 10^{-23}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A simple cubic cell has particle volume \\(1.05 \\times 10^{-23}\\ \\text{cm}^3\\). Find the cell volume.",
        steps: [
          "Simple cubic holds one particle at PE 0.524: \\(V = \\dfrac{1.05 \\times 10^{-23}}{0.524} = 2.0 \\times 10^{-23}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(2.0 \\times 10^{-23}\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "fcc, \\(V = 1.25 \\times 10^{-22}\\): void volume?", answer: "\\(3.25 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "bcc, \\(V = 8.0 \\times 10^{-23}\\): occupied volume?", answer: "\\(5.44 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "fcc, \\(V = 1.6 \\times 10^{-23}\\): volume of ONE particle?", answer: "\\(2.96 \\times 10^{-24}\\ \\text{cm}^3\\)" },
        { prompt: "fcc void volume \\(4.16 \\times 10^{-24}\\): cell volume?", answer: "\\(1.6 \\times 10^{-23}\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "06ec63ad-18c3-41cf-a809-d3ae462ed612",
      traps: [
        {
          title: "Reporting the occupied volume when ONE particle is asked",
          body:
            "'Volume occupied by a particle in fcc' means one of the four: \\(0.74\\,V/4 = 0.185\\,V\\). The option \\(0.74\\,V\\) is always there for the student who skips the division.",
        },
      ],
    },

    // 3 — counting voids
    {
      kind: "formula" as const,
      slug: "cetss-counting-voids",
      name: "Tetrahedral and Octahedral Voids: 2N and N",
      intuition:
        "Close packing (ccp or hcp) of N spheres leaves N octahedral holes (each ringed by 6 spheres) and 2N tetrahedral holes (each capped by 4 spheres). For a mole count, N is moles × Avogadro's number.",
      definition:
        "- Tetrahedral void: formed by 4 spheres (three in a layer, one on top); **2 per atom**. Per fcc cell: 8.\n" +
        "- Octahedral void: surrounded by 6 spheres; **1 per atom**. Per fcc cell: 4.\n" +
        "- Total voids per atom \\(= 3\\); in \\(x\\) mol: tetrahedral \\(2xN_A\\), octahedral \\(xN_A\\), total \\(3xN_A\\).\n" +
        "- Octahedral voids are larger than tetrahedral (radius ratio 0.414 against 0.225).",
      formula: {
        label: "Void counts",
        latex:
          "N_{\\text{tet}} = 2N,\\qquad N_{\\text{oct}} = N,\\qquad N = n_{\\text{mol}} \\times 6.022 \\times 10^{23}",
      },
      authoredExample: {
        prompt: "Find the number of octahedral and tetrahedral voids in 0.5 mol of a metal packed in hcp.",
        steps: [
          "\\(N = 0.5 \\times 6.022 \\times 10^{23} = 3.011 \\times 10^{23}\\).",
          "Octahedral \\(= 3.011 \\times 10^{23}\\); tetrahedral \\(= 6.022 \\times 10^{23}\\).",
        ],
        answer: "\\(3.011 \\times 10^{23}\\) octahedral, \\(6.022 \\times 10^{23}\\) tetrahedral",
      },
      selfCheckExample: {
        prompt: "How many voids of both kinds together are there in 0.2 mol of a ccp compound?",
        steps: [
          "\\(N = 1.2044 \\times 10^{23}\\); total \\(= 3N = 3.613 \\times 10^{23}\\).",
        ],
        answer: "\\(3.613 \\times 10^{23}\\)",
      },
      practiceSet: [
        { prompt: "Minimum spheres to form a tetrahedral void?", answer: "4" },
        { prompt: "Tetrahedral voids in 0.6 mol hcp?", answer: "\\(7.2264 \\times 10^{23}\\)" },
        { prompt: "Octahedral voids in 0.2 mol hcp?", answer: "\\(1.2044 \\times 10^{23}\\)" },
        { prompt: "'One octahedral void per two atoms' — true or false?", answer: "False (one per atom)" },
      ],
      pyqExampleId: "b43e5bf2-7dd6-48a8-9c71-69aa6cef8d4f",
      traps: [
        {
          title: "Swapping the two counts",
          body:
            "Tetrahedral is the SMALLER hole and the MORE numerous: 2 per atom. Octahedral is larger and fewer: 1 per atom. The option with the numbers reversed is always offered.",
        },
      ],
    },

    // 4 — formula from void occupancy
    {
      kind: "formula" as const,
      slug: "cetss-formula-from-void-occupancy",
      name: "Formula of a Compound From the Voids the Cations Fill",
      intuition:
        "Let the close-packed ions number N. A cation that fills a fraction \\(f\\) of the tetrahedral voids numbers \\(2fN\\); of the octahedral voids, \\(fN\\). The ratio of the two counts, reduced to whole numbers, is the formula. For corner-and-face arrangements count the sharing fractions instead.",
      definition:
        "- B in ccp/hcp, A in \\(\\tfrac{1}{3}\\) of tetrahedral voids: A \\(= \\tfrac{2}{3}N\\), ratio A:B \\(= 2:3\\) → \\(\\text{A}_2\\text{B}_3\\).\n" +
        "- B in ccp, A in half the tetrahedral voids: A \\(= N\\) → AB (zinc blende).\n" +
        "- B in ccp, A in all octahedral voids: AB (rock salt); in all tetrahedral voids: \\(\\text{A}_2\\text{B}\\) (fluorite-type antistructure).\n" +
        "- A at corners, B at face centres: \\(1 : 3\\) → \\(\\text{AB}_3\\). A at corners, B at body centre: AB.\n" +
        "- Removing an atom: A at corners with one corner missing → \\(\\tfrac{7}{8}\\) A per cell.",
      formula: {
        label: "Cations from void fraction",
        latex:
          "n_{\\text{A}} = f_{\\text{tet}} \\cdot 2N + f_{\\text{oct}} \\cdot N,\\qquad \\text{formula} = \\text{A}_{n_{\\text{A}}}\\text{B}_{N}",
      },
      authoredExample: {
        prompt: "Anions Y form an hcp lattice; cations X fill \\(\\tfrac{2}{3}\\) of the octahedral voids. Find the formula.",
        steps: [
          "Octahedral voids \\(= N\\); filled \\(= \\tfrac{2}{3}N\\). X:Y \\(= \\tfrac{2}{3} : 1 = 2 : 3\\).",
        ],
        answer: "\\(\\text{X}_2\\text{Y}_3\\) (the corundum ratio)",
      },
      selfCheckExample: {
        prompt: "A compound has B at the corners of a cube and A at the body centre and at two opposite face centres. Find its formula.",
        steps: [
          "B: \\(8 \\times \\tfrac{1}{8} = 1\\). A: \\(1 + 2 \\times \\tfrac{1}{2} = 2\\).",
        ],
        answer: "\\(\\text{A}_2\\text{B}\\)",
      },
      practiceSet: [
        { prompt: "B ccp, A in \\(\\tfrac{1}{3}\\) tetrahedral voids: formula?", answer: "\\(\\text{A}_2\\text{B}_3\\)" },
        { prompt: "B ccp, A in half the tetrahedral voids: formula?", answer: "AB" },
        { prompt: "A at corners, B at face centres: formula?", answer: "\\(\\text{AB}_3\\)" },
        { prompt: "Y hcp, X in \\(\\tfrac{1}{3}\\) tetrahedral voids: formula?", answer: "\\(\\text{X}_2\\text{Y}_3\\)" },
      ],
      pyqExampleId: "5703291c-fe5d-4d40-89d9-1a035a1e36b8",
      traps: [
        {
          title: "Forgetting the factor 2 on tetrahedral voids",
          body:
            "\\(\\tfrac{1}{3}\\) of the tetrahedral voids is \\(\\tfrac{1}{3} \\times 2N = \\tfrac{2}{3}N\\), giving \\(\\text{A}_2\\text{B}_3\\). Using \\(\\tfrac{1}{3}N\\) gives \\(\\text{AB}_3\\), which is offered as an option every time.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Unit Cells — the n and the edge–radius relation behind each PE",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-unit-cells",
    },
    {
      label: "Density — the same n in the density formula",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-density",
    },
  ],
};
