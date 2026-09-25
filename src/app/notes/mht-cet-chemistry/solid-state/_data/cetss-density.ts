import type { SubtopicNote } from "@/app/notes/_types";

export const DENSITY_NOTE: SubtopicNote = {
  subtopicName: "Density and Crystal Structure Calculations",
  title: "Density and Crystal Structure Calculations",
  oneLineDefinition:
    "One relation, ρ = nM/(a³N_A), links density, molar mass, particles per cell and the cell volume; MHT-CET hands you a lumped product such as a³N_A or ρ·a³ so that the answer is one multiplication or division.",
  whyItMatters:
    "43 PYQs, 2 HARD — the largest subtopic in the chapter. Every row is the same formula solved for a different unknown: density, molar mass, cell volume, the number of particles per cell (which then names the structure), or the number of cells or atoms in a given mass or volume. " +
    "Read what is given as a LUMP (a³N_A, ρN_A, ρa³) and the question collapses to arithmetic on two numbers.",
  concepts: [
    // 1 — the density formula
    {
      kind: "formula" as const,
      slug: "cetss-density-formula",
      name: "The Density Formula and the Lumped Constants",
      intuition:
        "Mass of the cell is n atoms × (M/N_A) grams; volume is a³. Their ratio is the density. The paper rarely gives a and M separately — it gives a³·N_A (cm³ mol⁻¹), or ρ·N_A, or ρ·a³ (the mass of one cell), so the arithmetic is two numbers and n.",
      definition:
        "- \\(\\rho = \\dfrac{n\\,M}{a^3 N_A}\\) with \\(n = 1, 2, 4\\) for sc, bcc, fcc and \\(a\\) in cm.\n" +
        "- Given \\(a^3 N_A\\): \\(\\rho = \\dfrac{nM}{a^3 N_A}\\) directly. E.g. fcc, \\(M = 197\\), \\(a^3 N_A = 40\\): \\(\\rho = \\dfrac{4 \\times 197}{40} = 19.7\\ \\text{g cm}^{-3}\\).\n" +
        "- Given \\(a\\) in Å or pm: convert to cm, cube, multiply by \\(6.022 \\times 10^{23}\\). \\(a = 4\\ \\text{Å}\\): \\(a^3 N_A = 64 \\times 10^{-24} \\times 6.022 \\times 10^{23} = 38.5\\).\n" +
        "- \\(\\rho \\cdot a^3\\) is the MASS of one unit cell; \\(\\rho \\cdot a^3 / n\\) is the mass of one atom.",
      formula: {
        label: "Density of a cubic crystal",
        latex:
          "\\rho = \\frac{n\\,M}{a^3\\,N_A}",
      },
      authoredExample: {
        prompt: "Sodium (\\(M = 23\\)) is bcc with \\(a = 4.29\\) Å. Find its density.",
        steps: [
          "\\(a^3 = (4.29 \\times 10^{-8})^3 = 7.9 \\times 10^{-23}\\ \\text{cm}^3\\); \\(a^3 N_A = 47.5\\).",
          "\\(\\rho = \\dfrac{2 \\times 23}{47.5} = 0.97\\ \\text{g cm}^{-3}\\).",
        ],
        answer: "\\(\\approx 0.97\\ \\text{g cm}^{-3}\\)",
      },
      selfCheckExample: {
        prompt: "A metal of molar mass 108 forms fcc cells with \\(a^3 N_A = 41\\ \\text{cm}^3\\ \\text{mol}^{-1}\\). Find its density.",
        steps: [
          "\\(\\rho = \\dfrac{4 \\times 108}{41} = 10.5\\ \\text{g cm}^{-3}\\).",
        ],
        answer: "\\(10.5\\ \\text{g cm}^{-3}\\)",
      },
      practiceSet: [
        { prompt: "fcc, \\(M = 63\\), \\(a^3 N_A = 28\\): \\(\\rho\\)?", answer: "\\(9.0\\ \\text{g cm}^{-3}\\)" },
        { prompt: "sc, \\(M = 210\\), \\(a^3 N_A = 21.5\\): \\(\\rho\\)?", answer: "\\(9.77\\ \\text{g cm}^{-3}\\)" },
        { prompt: "bcc K, \\(M = 39\\), \\(a = 4\\) Å: \\(\\rho\\)?", answer: "\\(\\approx 2\\ \\text{g cm}^{-3}\\)" },
        { prompt: "What does \\(\\rho \\cdot a^3\\) equal?", answer: "Mass of one unit cell" },
      ],
      pyqExampleId: "aecc768a-86b1-49ab-a1f2-2868f6a3293d",
      traps: [
        {
          title: "Using n = 4 for bcc",
          body:
            "The wrong n doubles or halves the answer, and that wrong answer is always among the options. bcc is 2; fcc is 4; simple cubic is 1.",
        },
      ],
    },

    // 2 — molar mass from density
    {
      kind: "formula" as const,
      slug: "cetss-molar-mass-from-density",
      name: "Molar Mass From Density",
      intuition:
        "Rearrange: \\(M = \\rho\\,a^3 N_A / n\\). With the lump \\(a^3 N_A\\) given, it is density × lump ÷ n. If the mass of the cell is given instead, divide by n for the mass of one atom and multiply by \\(N_A\\).",
      definition:
        "- \\(M = \\dfrac{\\rho \\cdot a^3 N_A}{n}\\). bcc, \\(\\rho = 5.6\\), \\(a^3 N_A = 75\\): \\(M = \\dfrac{5.6 \\times 75}{2} = 210\\ \\text{g mol}^{-1}\\).\n" +
        "- From the cell mass: \\(M = \\dfrac{\\rho a^3}{n} \\times N_A\\). fcc cell of mass \\(1.8 \\times 10^{-22}\\) g: one atom \\(= 4.5 \\times 10^{-23}\\) g, \\(M = 27\\).\n" +
        "- From \\(a\\) and \\(\\rho\\): bcc, \\(\\rho = 10\\), \\(a = 4 \\times 10^{-8}\\) cm: \\(M = \\dfrac{10 \\times 6.4 \\times 10^{-23} \\times 6.022 \\times 10^{23}}{2} = 193\\).",
      formula: {
        label: "Molar mass",
        latex:
          "M = \\frac{\\rho\\,a^3 N_A}{n}",
      },
      authoredExample: {
        prompt: "An fcc metal has density \\(8.9\\ \\text{g cm}^{-3}\\) and \\(a^3 N_A = 28.4\\ \\text{cm}^3\\ \\text{mol}^{-1}\\). Find its molar mass.",
        steps: [
          "\\(M = \\dfrac{8.9 \\times 28.4}{4} = 63.2\\ \\text{g mol}^{-1}\\) (copper).",
        ],
        answer: "\\(\\approx 63\\ \\text{g mol}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A bcc metal has \\(\\rho = 7.8\\ \\text{g cm}^{-3}\\) and \\(a^3 N_A = 16.2\\). Find \\(M\\).",
        steps: [
          "\\(M = \\dfrac{7.8 \\times 16.2}{2} = 63.2\\ \\text{g mol}^{-1}\\).",
        ],
        answer: "\\(63.18\\ \\text{g mol}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "sc, \\(\\rho = 9.3\\), \\(a^3 N_A = 22.6\\): \\(M\\)?", answer: "\\(210.2\\ \\text{g mol}^{-1}\\)" },
        { prompt: "fcc, \\(\\rho = 21\\), \\(a^3 N_A = 36\\): \\(M\\)?", answer: "\\(189\\ \\text{g mol}^{-1}\\)" },
        { prompt: "bcc, \\(\\rho = 8.6\\), \\(a^3 N_A = 22\\): \\(M\\)?", answer: "\\(94.6\\ \\text{g mol}^{-1}\\)" },
        { prompt: "fcc cell mass \\(1.8 \\times 10^{-22}\\) g: \\(M\\)?", answer: "\\(27\\ \\text{g mol}^{-1}\\)" },
      ],
      pyqExampleId: "d57de833-8fc4-426c-bbc4-b7fce182ef2d",
      traps: [
        {
          title: "Dividing by N_A when the lump already contains it",
          body:
            "\\(a^3 N_A\\) in cm³ mol⁻¹ has Avogadro's number built in. Multiply \\(\\rho\\) by it and divide by n — nothing else. A second \\(N_A\\) sends the exponent off by 23.",
        },
      ],
    },

    // 3 — cell volume from density
    {
      kind: "formula" as const,
      slug: "cetss-cell-volume-from-density",
      name: "Unit Cell Volume From Density and Molar Mass",
      intuition:
        "\\(a^3 = nM/(\\rho N_A)\\). The paper gives \\(\\rho N_A\\) as one lump (of order \\(10^{24}\\)), so the cell volume is n × M ÷ lump — a number of order \\(10^{-23}\\) cm³.",
      definition:
        "- \\(a^3 = \\dfrac{n\\,M}{\\rho\\,N_A}\\). fcc, \\(M = 27\\), \\(\\rho N_A = 16.0 \\times 10^{23}\\): \\(a^3 = \\dfrac{4 \\times 27}{1.6 \\times 10^{24}} = 6.75 \\times 10^{-23}\\ \\text{cm}^3\\).\n" +
        "- Without the lump: bcc Na, \\(M = 23\\), \\(\\rho = 1\\): \\(a^3 = \\dfrac{2 \\times 23}{6.022 \\times 10^{23}} = 7.6 \\times 10^{-23}\\ \\text{cm}^3\\).\n" +
        "- Sanity check: a cubic cell volume is \\(10^{-23}\\) to \\(10^{-22}\\) cm³ (edges 200–500 pm). An answer of \\(10^{-21}\\) means a lost exponent.",
      formula: {
        label: "Cell volume",
        latex:
          "a^3 = \\frac{n\\,M}{\\rho\\,N_A}",
      },
      authoredExample: {
        prompt: "An element of molar mass 52 forms bcc cells with \\(\\rho N_A = 4.3 \\times 10^{24}\\ \\text{g cm}^{-3}\\ \\text{mol}^{-1}\\). Find the cell volume.",
        steps: [
          "\\(a^3 = \\dfrac{2 \\times 52}{4.3 \\times 10^{24}} = 2.42 \\times 10^{-23}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(2.42 \\times 10^{-23}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "Molar mass 92, bcc, \\(\\rho N_A = 5.0 \\times 10^{24}\\). Find \\(a^3\\).",
        steps: [
          "\\(a^3 = \\dfrac{2 \\times 92}{5.0 \\times 10^{24}} = 3.68 \\times 10^{-23}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(3.68 \\times 10^{-23}\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "fcc, \\(M = 63.5\\), \\(\\rho N_A = 5.5 \\times 10^{24}\\): \\(a^3\\)?", answer: "\\(4.62 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "bcc, \\(M = 56\\), \\(\\rho N_A = 4.8 \\times 10^{24}\\): \\(a^3\\)?", answer: "\\(2.33 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "bcc, \\(M = 23\\), \\(\\rho = 1\\): \\(a^3\\)?", answer: "\\(7.6 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "Typical order of a cubic cell volume in cm³?", answer: "\\(10^{-23}\\)" },
      ],
      pyqExampleId: "a6c3992b-56f2-4d7a-905d-0be6674f2585",
      traps: [
        {
          title: "Trusting a printed exponent over the order of magnitude",
          body:
            "One 2024 paper printed \\(d N_A = 120 \\times 10^{21}\\); the working gives \\(6 \\times 10^{-21}\\), the key says \\(6.00 \\times 10^{-23}\\). Match the mantissa to the options and let the sanity range (\\(10^{-23}\\)) settle the exponent.",
        },
      ],
    },

    // 4 — identify the structure from n
    {
      kind: "formula" as const,
      slug: "cetss-identify-structure-from-n",
      name: "Which Structure? Solve for n",
      intuition:
        "Solve the density relation for the particles per cell: \\(n = \\rho a^3 N_A / M\\), or, when the cell mass and atom mass are given, \\(n = \\rho a^3 / m_{\\text{atom}}\\). The answer rounds to 1, 2 or 4 and names the cell: simple, body-centred, face-centred.",
      definition:
        "- \\(n = \\dfrac{\\rho \\cdot a^3 N_A}{M}\\). \\(\\rho = 8.6\\), \\(a^3 N_A = 21.5\\), \\(M = 92\\): \\(n = 2\\) → bcc.\n" +
        "- \\(n = \\dfrac{\\text{mass of cell}}{\\text{mass of one atom}} = \\dfrac{\\rho a^3}{m}\\). \\(1.792 \\times 10^{-22} / 4.4 \\times 10^{-23} = 4.07\\) → fcc.\n" +
        "- \\(n = 1\\): simple cubic. \\(n = 2\\): bcc. \\(n = 4\\): fcc/ccp. Round — the data are rarely exact.",
      formula: {
        label: "Particles per cell",
        latex:
          "n = \\frac{\\rho\\,a^3 N_A}{M} = \\frac{\\rho\\,a^3}{m_{\\text{atom}}}",
      },
      authoredExample: {
        prompt: "An element (\\(M = 60\\)) has density \\(6.23\\ \\text{g cm}^{-3}\\) and \\(a = 400\\) pm. Identify the cell.",
        steps: [
          "\\(a^3 N_A = 6.4 \\times 10^{-23} \\times 6.022 \\times 10^{23} = 38.5\\).",
          "\\(n = \\dfrac{6.23 \\times 38.5}{60} = 4.0\\) → face-centred cubic.",
        ],
        answer: "fcc",
      },
      selfCheckExample: {
        prompt: "The mass of a unit cell is \\(3.2 \\times 10^{-22}\\) g and each particle weighs \\(8.0 \\times 10^{-23}\\) g. How many particles per cell, and which cubic cell is it?",
        steps: [
          "\\(n = 3.2 \\times 10^{-22} / 8.0 \\times 10^{-23} = 4\\): fcc.",
        ],
        answer: "4; face-centred cubic",
      },
      practiceSet: [
        { prompt: "\\(a = 5\\) Å, \\(\\rho = 4\\), \\(M = 149\\): structure?", answer: "bcc (n ≈ 2)" },
        { prompt: "\\(\\rho a^3 = 1.8 \\times 10^{-22}\\) g, atom \\(4.5 \\times 10^{-23}\\) g: \\(n\\)?", answer: "4" },
        { prompt: "\\(n = 1\\) names which cell?", answer: "Simple cubic" },
        { prompt: "\\(\\rho = 20\\), \\(a^3 N_A = 38\\), \\(M = 190\\): \\(n\\)?", answer: "4" },
      ],
      pyqExampleId: "ac73755d-d85e-47b1-8956-7fbb0f974976",
      traps: [
        {
          title: "Stopping at n and not naming the cell",
          body:
            "Half these questions ask for the STRUCTURE, not the number. n = 2 is 'body-centred cubic'; n = 4 is 'face-centred cubic'. hcp is never the answer of a cubic-cell calculation.",
        },
      ],
    },

    // 5 — counting cells and atoms
    {
      kind: "formula" as const,
      slug: "cetss-counting-cells-and-atoms",
      name: "Counting Unit Cells and Atoms in a Mass or a Volume",
      intuition:
        "Divide the sample by one cell. In a mass: cells = mass ÷ (ρ·a³), the mass of one cell; atoms = n × cells. In a volume: cells = V ÷ a³. One mole of a simple-cubic metal is \\(N_A\\) cells because each cell holds one atom.",
      definition:
        "- Cells in mass \\(w\\): \\(\\dfrac{w}{\\rho a^3}\\). \\(0.9\\) g, \\(\\rho a^3 = 3 \\times 10^{-22}\\): \\(3 \\times 10^{21}\\) cells.\n" +
        "- Atoms in mass \\(w\\): \\(n \\times \\dfrac{w}{\\rho a^3}\\). bcc, \\(0.3\\) g, \\(\\rho a^3 = 3 \\times 10^{-22}\\): \\(2 \\times 10^{21}\\) atoms.\n" +
        "- Cells from moles: \\(\\dfrac{w}{M} \\times \\dfrac{N_A}{n}\\). \\(0.60\\) g, \\(M = 60\\), fcc: \\(0.01 \\times 6.022 \\times 10^{23} / 4 = 1.5 \\times 10^{21}\\).\n" +
        "- Cells in volume \\(V\\): \\(\\dfrac{V}{a^3}\\). \\(1\\ \\text{cm}^3\\), \\(a = 2 \\times 10^{-8}\\) cm: \\(1.25 \\times 10^{23}\\).\n" +
        "- Simple cubic, 1 mol: \\(6.022 \\times 10^{23}\\) cells (one atom per cell).",
      formula: {
        label: "Counting cells",
        latex:
          "N_{\\text{cells}} = \\frac{w}{\\rho\\,a^3} = \\frac{V}{a^3} = \\frac{w}{M}\\cdot\\frac{N_A}{n},\\qquad N_{\\text{atoms}} = n\\,N_{\\text{cells}}",
      },
      authoredExample: {
        prompt: "How many atoms are in 2.0 g of an fcc metal whose unit cell weighs \\(2.5 \\times 10^{-22}\\) g?",
        steps: [
          "Cells \\(= 2.0 / 2.5 \\times 10^{-22} = 8.0 \\times 10^{21}\\).",
          "Atoms \\(= 4 \\times 8.0 \\times 10^{21} = 3.2 \\times 10^{22}\\).",
        ],
        answer: "\\(3.2 \\times 10^{22}\\)",
      },
      selfCheckExample: {
        prompt: "How many unit cells are there in 1 cm³ of a metal with \\(a = 2.5 \\times 10^{-8}\\) cm?",
        steps: [
          "\\(a^3 = 1.5625 \\times 10^{-23}\\); cells \\(= 1 / 1.5625 \\times 10^{-23} = 6.4 \\times 10^{22}\\).",
        ],
        answer: "\\(6.4 \\times 10^{22}\\)",
      },
      practiceSet: [
        { prompt: "\\(0.4\\) g, \\(\\rho a^3 = 1.2 \\times 10^{-22}\\): cells?", answer: "\\(3.3 \\times 10^{21}\\)" },
        { prompt: "fcc, 1 g, \\(\\rho a^3 = 1.728 \\times 10^{-22}\\): atoms?", answer: "\\(2.315 \\times 10^{22}\\)" },
        { prompt: "1 cm³, \\(a = 4.0 \\times 10^{-8}\\) cm: cells?", answer: "\\(1.56 \\times 10^{22}\\)" },
        { prompt: "1 mol of a simple-cubic metal: cells?", answer: "\\(6.022 \\times 10^{23}\\)" },
      ],
      pyqExampleId: "c774b4bf-39d2-47e7-8554-649940844a58",
      traps: [
        {
          title: "Counting cells when atoms are asked",
          body:
            "'Number of atoms in 0.3 g of a bcc metal' is cells × 2. The cell count \\(10^{21}\\) is offered as option (A) for the student who stops one step early.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Unit Cells — n and the edge that feed this formula",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-unit-cells",
    },
    {
      label: "Packing Efficiency — the other use of the cell volume",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-packing-and-voids",
    },
  ],
};
