import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_CUBIC_NOTE: SubtopicNote = {
  subtopicName: "Cubic System",
  title: "The Cubic System: Particles per Cell, Radius, Density and Counting",
  oneLineDefinition:
    "Counting the particles in simple, body-centred and face-centred cubic cells, relating the atomic radius to the edge length, deriving and using the density formula, and counting atoms and unit cells in a given mass.",
  whyItMatters:
    "27 questions, fifteen of them from board papers, the most of any page in this chapter. The board asked you to count the particles in a cell (2020, 2024) and write a formula from where the ions sit (2017), to give the radius and edge length relation (2023, 2024, 2026) and find a radius (2026), to derive the density formula (2024, 2026), to calculate a density (2023, 2024, 2025) and to identify the type of cell from its density (2024, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccss-particles",
      name: "Particles in a cubic unit cell",
      intuition:
        "A particle at a corner is shared by the eight cubes that meet there, so only one eighth of it belongs to any one cube. A particle on a face is shared by two cubes, one on an edge by four, and one at the body centre by none. Add up the shares and you have the number of particles that truly belong to one cell.",
      definition:
        "- **Simple cubic (sc):** particles at the 8 corners only: \\(8 \\times \\tfrac{1}{8} = 1\\).\n" +
        "- **Body-centred cubic (bcc):** 8 corners and 1 at the body centre: \\(1 + 1 = 2\\).\n" +
        "- **Face-centred cubic (fcc):** 8 corners and 1 at the centre of each of the 6 faces: \\(1 + 6 \\times \\tfrac{1}{2} = 4\\).\n" +
        "- Shares: a corner particle is shared by 8 cubes, a face particle by 2 cubes, an edge particle by 4 cubes, and a body-centre particle belongs wholly to its cube.\n" +
        "- The formula of a compound is the ratio of the numbers of each kind of particle in one cell.",
      formula: {
        label: "Particles per cubic cell",
        latex: "n = \\frac{N_{\\text{corner}}}{8} + \\frac{N_{\\text{face}}}{2} + \\frac{N_{\\text{edge}}}{4} + N_{\\text{body}}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "particles that belong to one unit cell" },
          { symbol: "\\(N_{\\text{corner}}\\)", meaning: "particles at corners (8 in a cube)" },
          { symbol: "\\(N_{\\text{face}}\\)", meaning: "particles at face centres" },
          { symbol: "\\(N_{\\text{body}}\\)", meaning: "particles at the body centre" },
        ],
      },
      authoredExample: {
        prompt:
          "In a cubic unit cell, atoms X are at the eight corners, atoms Y at the centres of the six faces and an atom Z at the body centre. What is the formula of the compound?",
        steps: [
          "X at the corners: \\(8 \\times \\tfrac{1}{8} = 1\\) atom per cell.",
          "Y at the face centres: \\(6 \\times \\tfrac{1}{2} = 3\\) atoms per cell.",
          "Z at the body centre: 1 atom, not shared with any other cell.",
          "Ratio X : Y : Z \\(= 1 : 3 : 1\\).",
        ],
        answer: "Formula = XY₃Z",
      },
      selfCheckExample: {
        prompt: "Atoms P occupy the corners of a cube and an atom Q the body centre. Write the formula of the compound.",
        steps: ["P: \\(8 \\times \\tfrac{1}{8} = 1\\); Q: 1.", "P : Q = 1 : 1."],
        answer: "PQ",
      },
      practiceSet: [
        { prompt: "What fraction of a particle at the centre of an edge belongs to one cubic unit cell?", answer: "\\(\\tfrac{1}{4}\\)" },
        { prompt: "How many particles belong to a base-centred cubic cell (corners plus the centres of two opposite faces)?", answer: "2" },
        { prompt: "A particle at which position in a cubic cell is not shared with any other cell?", answer: "At the body centre" },
      ],
      pyqExampleId: "809743f9-bc8c-47ec-98ee-4aee74053e7a",
      traps: [
        {
          title: "Counting eight corners as eight particles",
          body: "Each corner particle gives only \\(\\tfrac{1}{8}\\) to the cell. Eight corners together make ONE particle, not eight.",
        },
        {
          title: "Swapping which atom sits where",
          body: "In a formula question, read twice which element is at the corners and which at the faces. Corners give 1, faces give 3, so swapping them turns AB₃ into A₃B.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-radius-edge",
      name: "Atomic radius and edge length",
      intuition:
        "Treat atoms as hard spheres that touch. Find the line along which they touch, write its length two ways (in terms of the edge a and in terms of radii r), and the relation falls out. In sc the spheres touch along an edge, in bcc along the body diagonal, in fcc along a face diagonal.",
      definition:
        "- **sc:** corner spheres touch along the edge: \\(a = 2r\\), so \\(r = \\dfrac{a}{2} = 0.5a\\).\n" +
        "- **bcc:** the body-centre sphere touches two corner spheres along the body diagonal. By Pythagoras, face diagonal\\(^2 = a^2 + a^2 = 2a^2\\), body diagonal\\(^2 = a^2 + 2a^2 = 3a^2\\). The body diagonal \\(= 4r\\), so \\(\\sqrt{3}\\,a = 4r\\) and \\(r = \\dfrac{\\sqrt{3}}{4}a = 0.433a\\).\n" +
        "- **fcc:** the corner spheres touch the face-centre sphere along a face diagonal: \\(\\sqrt{2}\\,a = 4r\\), so \\(r = \\dfrac{\\sqrt{2}}{4}a = 0.3535a\\).",
      formula: {
        label: "Radius from edge length",
        latex: "\\text{sc: } r = \\frac{a}{2} \\qquad \\text{bcc: } r = \\frac{\\sqrt{3}}{4}\\,a \\qquad \\text{fcc: } r = \\frac{\\sqrt{2}}{4}\\,a",
      },
      authoredExample: {
        prompt: "Sodium crystallises in a body-centred cubic lattice with edge length 429 pm. Calculate the radius of a sodium atom.",
        steps: [
          "Given: bcc, \\(a = 429\\) pm.",
          "Formula: in bcc the spheres touch along the body diagonal, \\(\\sqrt{3}\\,a = 4r\\), so \\(r = 0.433a\\).",
          "Substitution: \\(r = 0.433 \\times 429\\ \\text{pm}\\).",
          "\\(r = 185.8\\ \\text{pm}\\).",
        ],
        answer: "Radius of a sodium atom = 185.8 pm",
      },
      selfCheckExample: {
        prompt: "Polonium has a simple cubic lattice with edge length 336 pm. Find the radius of a polonium atom.",
        steps: ["In sc, \\(r = \\dfrac{a}{2} = \\dfrac{336}{2}\\)."],
        answer: "168 pm",
      },
      practiceSet: [
        { prompt: "Along which line do the spheres touch in a face-centred cubic cell?", answer: "Along a face diagonal" },
        { prompt: "Atoms of radius 124 pm form a bcc lattice. Find the edge length.", answer: "\\(a = \\dfrac{4r}{\\sqrt{3}} = 286.4\\) pm" },
        { prompt: "Which cubic cell does the relation \\(4r = \\sqrt{3}\\,a\\) belong to?", answer: "Body-centred cubic" },
      ],
      pyqExampleId: "91b1b317-3de8-4089-87ad-cc53584e0344",
      traps: [
        {
          title: "Using the face diagonal for bcc",
          body: "In bcc the face centres are empty, so nothing touches along a face diagonal. The contact is along the body diagonal, \\(\\sqrt{3}\\,a = 4r\\). The face diagonal belongs to fcc.",
        },
        {
          title: "Turning the relation upside down",
          body: "A radius must be smaller than the edge. If your formula gives \\(r = \\dfrac{4a}{\\sqrt{3}}\\), larger than a, you have inverted it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-density",
      name: "Density, molar mass and edge length",
      intuition:
        "One unit cell is a tiny sample of the whole solid, so the density of the cell is the density of the substance. Its mass is n particles, each of mass M divided by Avogadro's number; its volume is a cubed. Divide, and the density formula appears. Turn it round to find n, and n tells you the type of cell.",
      definition:
        "- Derivation (board answer, one step a line):\n" +
        "- i. If the edge length of the cubic unit cell is a, its volume is \\(a^3\\).\n" +
        "- ii. Let the mass of one particle be m and let there be n particles per unit cell. Mass of the unit cell \\(= m \\times n\\).\n" +
        "- iii. Density of the unit cell (the same as the density of the substance): \\(\\rho = \\dfrac{m \\times n}{a^3}\\).\n" +
        "- iv. Molar mass \\(M = m \\times N_A\\), so \\(m = \\dfrac{M}{N_A}\\).\n" +
        "- v. Combining: \\(\\rho = \\dfrac{nM}{a^3 N_A}\\). Knowing any four of the quantities, the fifth can be calculated.\n" +
        "- n = 1 for sc, 2 for bcc, 4 for fcc. Rearranged, \\(n = \\dfrac{\\rho\\,a^3 N_A}{M}\\) identifies the type of cell.\n" +
        "- Use a in centimetres (1 pm \\(= 10^{-10}\\) cm) to get \\(\\rho\\) in g cm\\(^{-3}\\).",
      formula: {
        label: "Density of a cubic crystal",
        latex: "\\rho = \\frac{n\\,M}{a^{3}\\,N_A}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "density, g per cubic centimetre" },
          { symbol: "\\(n\\)", meaning: "particles per unit cell (1, 2 or 4)" },
          { symbol: "\\(M\\)", meaning: "molar mass, g per mol" },
          { symbol: "\\(a\\)", meaning: "edge length of the unit cell, in cm" },
          { symbol: "\\(N_A\\)", meaning: "Avogadro's number, 6.022 × 10²³ per mol" },
        ],
      },
      authoredExample: {
        prompt:
          "Copper crystallises in a face-centred cubic lattice with edge length 361 pm. Calculate the density of copper. (Molar mass of Cu = 63.5 g mol⁻¹)",
        steps: [
          "Given: fcc, so \\(n = 4\\); \\(M = 63.5\\ \\text{g mol}^{-1}\\); \\(a = 361\\ \\text{pm} = 3.61 \\times 10^{-8}\\ \\text{cm}\\); \\(N_A = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}\\).",
          "Formula: \\(\\rho = \\dfrac{nM}{a^3 N_A}\\).",
          "\\(a^3 = (3.61 \\times 10^{-8}\\ \\text{cm})^3 = 4.705 \\times 10^{-23}\\ \\text{cm}^3\\).",
          "Substitution: \\(\\rho = \\dfrac{4 \\times 63.5\\ \\text{g mol}^{-1}}{4.705 \\times 10^{-23}\\ \\text{cm}^3 \\times 6.022 \\times 10^{23}\\ \\text{mol}^{-1}} = \\dfrac{254}{28.33}\\ \\text{g cm}^{-3}\\).",
          "\\(\\rho = 8.97\\ \\text{g cm}^{-3}\\).",
        ],
        answer: "Density of copper = 8.97 g cm⁻³",
      },
      selfCheckExample: {
        prompt:
          "Iron (molar mass 55.85 g mol⁻¹) forms a cubic cell of edge 286.6 pm and has density 7.87 g cm⁻³. Identify the type of cubic cell.",
        steps: [
          "\\(a^3 = (2.866 \\times 10^{-8}\\ \\text{cm})^3 = 2.354 \\times 10^{-23}\\ \\text{cm}^3\\).",
          "\\(n = \\dfrac{\\rho\\,a^3 N_A}{M} = \\dfrac{7.87 \\times 2.354 \\times 10^{-23} \\times 6.022 \\times 10^{23}}{55.85} = 2.00\\).",
        ],
        answer: "n = 2, so the cell is body-centred cubic",
      },
      practiceSet: [
        { prompt: "Which value of n goes into \\(\\rho = \\dfrac{nM}{a^3 N_A}\\) for a face-centred cubic cell?", answer: "4" },
        { prompt: "Convert an edge length of 352 pm to centimetres and find the cell volume.", answer: "\\(3.52 \\times 10^{-8}\\) cm; \\(a^3 = 4.36 \\times 10^{-23}\\ \\text{cm}^3\\)" },
        { prompt: "A metal of molar mass 39 g mol⁻¹ forms a bcc lattice with edge 520 pm. Find its density.", answer: "0.921 g cm⁻³" },
      ],
      pyqExampleId: "f2b5dcff-4645-4cd0-bc5a-1f745c38cac4",
      traps: [
        {
          title: "Leaving the edge in picometres",
          body: "Convert a to centimetres before cubing: \\(1\\ \\text{pm} = 10^{-10}\\ \\text{cm}\\). A cube of picometres makes the answer wrong by a factor of \\(10^{30}\\).",
        },
        {
          title: "The wrong n",
          body: "n is the number of particles per cell: 1 for sc, 2 for bcc, 4 for fcc. Putting 4 for a bcc metal doubles the density.",
        },
        {
          title: "Stopping at n",
          body: "When asked for the type of cell, a value of n alone is half the answer. Round it to 1, 2 or 4 and NAME the cell: simple, body-centred or face-centred cubic.",
        },
        {
          title: "A derivation without its steps",
          body: "The derivation earns marks step by step: volume \\(a^3\\), mass of the cell \\(m \\times n\\), \\(m = M/N_A\\), then the result. Writing only the final formula loses most of them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-counting",
      name: "Atoms and unit cells in a given mass or volume",
      intuition:
        "If you know how much one unit cell weighs, you know how many cells make up any mass. The mass of one cell is its density times its volume, \\(\\rho a^3\\). Divide the mass by that and you have the number of cells; multiply by n for the number of atoms.",
      definition:
        "- Number of particles in x g of metal \\(= \\dfrac{x N_A}{M}\\). Using \\(\\rho = \\dfrac{nM}{a^3 N_A}\\), this becomes \\(\\dfrac{x n}{\\rho a^3}\\).\n" +
        "- n particles make 1 unit cell, so the number of unit cells in x g \\(= \\dfrac{x}{\\rho a^3}\\).\n" +
        "- Number of unit cells in a volume V of metal \\(= \\dfrac{V}{a^3}\\).",
      formula: {
        label: "Counting in x grams",
        latex: "\\text{atoms} = \\frac{x\\,n}{\\rho\\,a^{3}} \\qquad \\text{unit cells} = \\frac{x}{\\rho\\,a^{3}}",
      },
      authoredExample: {
        prompt:
          "Tungsten forms a bcc lattice. Its density is 19.3 g cm⁻³ and its unit cell edge is 316 pm. How many unit cells and how many atoms are there in 5 g of tungsten?",
        steps: [
          "Given: bcc, \\(n = 2\\); \\(\\rho = 19.3\\ \\text{g cm}^{-3}\\); \\(a = 316\\ \\text{pm} = 3.16 \\times 10^{-8}\\ \\text{cm}\\); \\(x = 5\\ \\text{g}\\).",
          "\\(a^3 = (3.16 \\times 10^{-8}\\ \\text{cm})^3 = 3.155 \\times 10^{-23}\\ \\text{cm}^3\\).",
          "Unit cells \\(= \\dfrac{x}{\\rho a^3} = \\dfrac{5\\ \\text{g}}{19.3\\ \\text{g cm}^{-3} \\times 3.155 \\times 10^{-23}\\ \\text{cm}^3} = 8.21 \\times 10^{21}\\).",
          "Atoms \\(= \\dfrac{x n}{\\rho a^3} = 2 \\times 8.21 \\times 10^{21} = 1.64 \\times 10^{22}\\).",
        ],
        answer: "8.21 × 10²¹ unit cells and 1.64 × 10²² atoms",
      },
      selfCheckExample: {
        prompt: "A piece of an fcc metal contains 2.0 × 10²² unit cells. How many atoms does it contain?",
        steps: ["Each fcc cell holds 4 atoms: \\(4 \\times 2.0 \\times 10^{22}\\)."],
        answer: "8.0 × 10²² atoms",
      },
      practiceSet: [
        { prompt: "Write the expression for the number of unit cells in a volume V of a metal with cell edge a.", answer: "\\(\\dfrac{V}{a^3}\\)" },
        { prompt: "One unit cell of a metal has a mass of \\(4 \\times 10^{-22}\\) g. How many unit cells are there in 2 g?", answer: "\\(5 \\times 10^{21}\\)" },
        { prompt: "What does the product \\(\\rho a^3\\) represent?", answer: "The mass of one unit cell" },
      ],
      pyqExampleId: "b785b59f-3a34-4944-92bb-1a1c020449d1",
      traps: [
        {
          title: "Giving unit cells when atoms are asked",
          body: "\\(\\dfrac{x}{\\rho a^3}\\) counts cells. For atoms multiply by n (2 for bcc, 4 for fcc). Questions often ask for both: label each answer.",
        },
      ],
    },
  ],
};
