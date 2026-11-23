import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_PACKING_NOTE: SubtopicNote = {
  subtopicName: "Packing of Particles in Crystal Lattice",
  title: "Close Packing, Coordination Number and Voids",
  oneLineDefinition:
    "How spheres pack in one, two and three dimensions to give simple cubic, hcp and ccp structures, the coordination number of each lattice, the tetrahedral and octahedral voids, and the formula of a compound from the voids its atoms fill.",
  whyItMatters:
    "13 questions, two of them from board papers: the coordination number of atoms in a bcc lattice (2022) and the coordination number of an ionic crystal from its radius ratio (2018). The textbook asks how hcp and ccp are built, how voids form, how many voids a given amount gives and the formula of a compound from void filling.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccss-stacking",
      name: "Close packed structures: simple cubic, hcp and ccp",
      intuition:
        "Pack marbles in a tray. Rows lined up square give each marble four neighbours; rows slipped into the hollows of the row before give six, and less wasted space. Stack the layers and the way the third layer sits decides the structure: square layers straight above each other give simple cubic, hexagonal layers give hcp or ccp.",
      definition:
        "- **One dimension:** spheres touching in a row.\n" +
        "- **Two dimensions:** square close packing (rows aligned, AAAA type, two dimensional coordination number 4) or hexagonal close packing (rows staggered, ABAB type, two dimensional coordination number 6). Hexagonal packing leaves less free space; its voids are triangular.\n" +
        "- **Three dimensions:** square close packed layers stack only one way, giving simple cubic. In hexagonal layers, the second layer (B) sits in the depressions of the first (A); the third layer can go two ways, giving hcp or ccp.\n" +
        "- Common to hcp and ccp: coordination number 12, packing efficiency 74 %, and 2 tetrahedral and 1 octahedral void per atom.",
      table: {
        columns: ["Structure", "How the layers are placed", "Pattern", "Example metals"],
        rows: [
          { cells: ["Simple cubic", "Square close packed layers, each sphere exactly above a sphere of the layer below", "AAAA", "Polonium, the only metal with this structure"] },
          {
            cells: ["Hexagonal close packed (hcp)", "Hexagonal layers; spheres of the third layer lie right above the spheres of the first layer", "ABAB", "Mg, Zn"],
            pyqExampleId: "c830247a-6f0a-425b-a49f-7a1653484371",
            noteAmber: "The textbook exercise asks how adding the third layer differs for hcp and ccp.",
          },
          { cells: ["Cubic close packed (ccp), the same as fcc", "Hexagonal layers; spheres of the third layer cover the octahedral voids, lining up with neither layer below; the fourth layer repeats the first", "ABCABC", "Copper, silver"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the two dimensional coordination number in square close packing?", answer: "4" },
        { prompt: "What is the two dimensional coordination number in hexagonal close packing?", answer: "6" },
        { prompt: "Which cubic unit cell is the same as the ccp structure?", answer: "Face-centred cubic (fcc)" },
      ],
      traps: [
        {
          title: "Calling ABCABC packing hcp",
          body: "Both hcp and ccp are built from hexagonal close packed LAYERS, but only the ABAB stacking is called hexagonal close packed. ABCABC is cubic close packed, the same as fcc.",
        },
        {
          title: "Where the third layer goes",
          body: "For ccp the third layer covers the octahedral voids of the second layer. For hcp it lines up with the first layer. Say which, in those words, for the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-coordination",
      name: "Coordination number of each lattice",
      intuition:
        "The coordination number counts the neighbours that touch a sphere. The more neighbours, the more tightly the spheres are packed. Picture one sphere and count its neighbours layer by layer: its own layer, the one above and the one below.",
      definition:
        "- **Coordination number:** the number of neighbouring spheres that touch a given sphere. The larger it is, the closer the spheres are to each other.\n" +
        "- The board asked in 2018 for the coordination number of an ionic crystal whose radius ratio \\(r^{+}/r^{-}\\) is 0.320. The present textbook does not teach the radius ratio rule, so give it little time. The answer uses: \\(r^{+}/r^{-}\\) from 0.225 to 0.414 gives coordination number 4, from 0.414 to 0.732 gives 6, from 0.732 to 1 gives 8.",
      table: {
        columns: ["Lattice", "Coordination number", "Which spheres touch it"],
        rows: [
          { cells: ["Simple cubic (sc)", "6", "Four in its own layer, one directly above and one directly below"] },
          {
            cells: ["Body-centred cubic (bcc)", "8", "Four in the layer below and four in the layer above"],
            pyqExampleId: "5b5e2d85-a8d1-452d-b040-15875b36ee21",
            noteAmber: "Board 2022 asked for the coordination number of atoms in bcc; a 2025 paper asked it again.",
          },
          { cells: ["fcc (ccp) and hcp", "12", "Six in its own layer, three above and three below"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the coordination number of a sphere in an hcp lattice?", answer: "12" },
        { prompt: "What is the coordination number of a sphere in a simple cubic lattice?", answer: "6" },
        { prompt: "An ionic crystal has a radius ratio of 0.52. What is its coordination number?", answer: "6 (the ratio lies between 0.414 and 0.732)" },
      ],
      traps: [
        {
          title: "Writing 12 for bcc",
          body: "bcc is not close packed. Its coordination number is 8; 12 belongs to fcc (ccp) and hcp.",
        },
        {
          title: "Confusing particles per cell with coordination number",
          body: "A bcc cell holds 2 particles but each touches 8 neighbours; an fcc cell holds 4 particles but each touches 12. Read whether the question asks 'how many per cell' or 'how many neighbours'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-voids",
      name: "Tetrahedral and octahedral voids",
      intuition:
        "When the second hexagonal layer sits on the first, its spheres cover some of the triangular hollows of the first layer but not all. A covered hollow is a small space walled in by four spheres: a tetrahedral void. An uncovered hollow lies under a hollow of the second layer pointing the other way; the two together make a space walled in by six spheres: an octahedral void.",
      definition:
        "- **Tetrahedral void:** formed where a triangular void of the first layer is covered by a sphere of the second layer. It is surrounded by **four** spheres; joining their centres gives a tetrahedron.\n" +
        "- **Octahedral void:** formed where a triangular void of the first layer lies under a triangular void of the second layer. It is surrounded by **six** spheres.\n" +
        "- In hcp and ccp there are 2 tetrahedral voids per atom and half as many octahedral voids, 1 per atom.\n" +
        "- For N particles: tetrahedral voids \\(= 2N\\), octahedral voids \\(= N\\), total voids \\(= 3N\\). For n mol, \\(N = n \\times N_A\\).",
      formula: {
        label: "Voids in hcp and ccp",
        latex: "\\text{tetrahedral voids} = 2N \\qquad \\text{octahedral voids} = N",
        symbols: [{ symbol: "\\(N\\)", meaning: "number of particles in the close packed structure" }],
      },
      authoredExample: {
        prompt: "A metal forms a ccp structure. Find the number of (a) atoms, (b) octahedral voids, (c) tetrahedral voids and (d) total voids in 0.3 mol of it.",
        steps: [
          "(a) Atoms \\(= 0.3 \\times N_A = 0.3 \\times 6.022 \\times 10^{23} = 1.807 \\times 10^{23}\\).",
          "(b) Octahedral voids = number of atoms \\(= 1.807 \\times 10^{23}\\).",
          "(c) Tetrahedral voids \\(= 2 \\times 1.807 \\times 10^{23} = 3.613 \\times 10^{23}\\).",
          "(d) Total voids \\(= 1.807 \\times 10^{23} + 3.613 \\times 10^{23} = 5.420 \\times 10^{23}\\).",
        ],
        answer: "1.807 × 10²³ atoms; 1.807 × 10²³ octahedral, 3.613 × 10²³ tetrahedral, 5.420 × 10²³ voids in all",
      },
      selfCheckExample: {
        prompt: "When a second hexagonal layer is placed on the first, which triangular voids of the first layer become tetrahedral voids?",
        steps: ["A sphere of the second layer rests over some triangular voids of the first layer; the four spheres around each such void enclose a tetrahedron."],
        answer: "Those covered by a sphere of the second layer",
      },
      practiceSet: [
        { prompt: "How many spheres surround an octahedral void?", answer: "Six" },
        { prompt: "How many octahedral voids are there per atom in hcp?", answer: "One" },
        { prompt: "What shape do you get by joining the centres of the spheres around a tetrahedral void?", answer: "A tetrahedron" },
      ],
      pyqExampleId: "4f054519-1cd5-42fb-a766-cd3f0334c6cb",
      traps: [
        {
          title: "Swapping the two counts",
          body: "Tetrahedral voids are the MORE numerous: 2N. Octahedral voids are N. When a question asks for octahedral and then tetrahedral, keep that order in the answer.",
        },
        {
          title: "Four spheres for an octahedral void",
          body: "Four spheres surround a tetrahedral void; six surround an octahedral void (three from each layer). The names match the shapes made by joining the centres.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-void-formula",
      name: "Formula of a compound from the voids it fills",
      intuition:
        "One kind of atom builds the close packed frame; the other kind sits in some of the holes. Count the frame atoms as N, count the holes from 2N or N, take the fraction that is filled, and the ratio of the two counts is the formula.",
      definition:
        "- Let the atoms forming the ccp or hcp frame be N.\n" +
        "- Atoms in tetrahedral voids \\(= (\\text{fraction filled}) \\times 2N\\); atoms in octahedral voids \\(= (\\text{fraction filled}) \\times N\\).\n" +
        "- Write the ratio of the two kinds of atom, clear the fractions to the smallest whole numbers, and write the formula.",
      formula: {
        label: "Atoms in the voids",
        latex: "\\text{atoms in voids} = (\\text{fraction filled}) \\times (\\text{voids per atom}) \\times N",
      },
      authoredExample: {
        prompt: "Oxide ions form a ccp lattice and metal ions A occupy half of the octahedral voids. What is the formula of the oxide?",
        steps: [
          "Let the number of oxide ions be N. Octahedral voids \\(= N\\).",
          "A occupies half of them: number of A \\(= \\tfrac{1}{2} N\\).",
          "A : O \\(= \\tfrac{1}{2} N : N = 1 : 2\\).",
        ],
        answer: "Formula = AO₂",
      },
      selfCheckExample: {
        prompt: "Atoms Q form an hcp lattice and atoms P fill one third of the octahedral voids. Write the formula.",
        steps: ["Q = N; octahedral voids \\(= N\\), so P \\(= \\tfrac{1}{3}N\\).", "P : Q \\(= \\tfrac{1}{3} : 1 = 1 : 3\\)."],
        answer: "PQ₃",
      },
      practiceSet: [
        { prompt: "Anions B form a ccp lattice and cations A fill all the octahedral voids. Formula?", answer: "AB" },
        { prompt: "A ccp lattice has N atoms. How many atoms can it take in if every void, tetrahedral and octahedral, is filled?", answer: "3N" },
        { prompt: "In a compound A₂B, atoms B form a ccp lattice and atoms A sit in tetrahedral voids. What fraction of the tetrahedral voids is filled?", answer: "All of them (2N atoms of A in 2N voids)" },
      ],
      pyqExampleId: "d836ca34-2a68-460b-8694-6c480d742a89",
      traps: [
        {
          title: "Forgetting the 2 for tetrahedral voids",
          body: "Tetrahedral voids are 2N, not N. A fraction of the tetrahedral voids is a fraction of 2N.",
        },
        {
          title: "Writing the ratio upside down",
          body: "Keep track of which element fills the voids and which forms the lattice. Write each count next to its symbol before you write the formula.",
        },
      ],
    },
  ],
};
