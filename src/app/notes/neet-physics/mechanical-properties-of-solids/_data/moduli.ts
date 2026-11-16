import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_SO_MODULI_NOTE: SubtopicNote = {
  subtopicName: "Elastic Moduli and Materials",
  title: "Elastic Moduli and Materials",
  oneLineDefinition:
    "The shear and bulk moduli, compressibility and Poisson's ratio beside Young's modulus, then the stress-strain curve and how steel, copper and rubber behave under load.",
  whyItMatters:
    "Two NEET questions. NEET 2026 asks to match Young's modulus, compressibility, bulk modulus and Poisson's ratio with their formulas. NEET 2022 gives an assertion that a spring's stretching is set by the shear modulus, with a reason comparing the tensile strength of copper and steel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphso-moduli",
      name: "Shear modulus, bulk modulus and Poisson's ratio",
      intuition:
        "Each kind of stress has its own modulus, always stress divided by the strain it causes. Young's modulus is for stretching, the shear modulus for twisting a shape sideways, and the bulk modulus for squeezing from all sides. Solids resist all three; a liquid or a gas has no fixed shape, so only the bulk modulus applies to it. A stretched wire also gets thinner, and Poisson's ratio compares that sideways strain with the stretch.",
      definition:
        "- **Shear modulus** (modulus of rigidity): \\(G = \\dfrac{F/A}{\\theta}\\), with \\(\\theta\\) the shearing strain. For most materials \\(G \\approx \\dfrac{Y}{3}\\).\n" +
        "- **Bulk modulus**: \\(B = -\\dfrac{p}{\\Delta V/V}\\). The minus sign makes B positive, because a rise in pressure makes the volume smaller.\n" +
        "- **Compressibility** \\(k = \\dfrac{1}{B}\\). Gases are the most compressible, solids the least.\n" +
        "- **Poisson's ratio** \\(= \\dfrac{\\text{lateral strain}}{\\text{longitudinal strain}} = \\dfrac{\\Delta d/d}{\\Delta L/L}\\). It has no unit.\n" +
        "- Y and G apply only to solids; B applies to solids, liquids and gases.\n" +
        "- A small change in each side of a cube by a fraction x changes its volume by about 3x.",
      formula: {
        label: "Elastic moduli",
        latex: "G = \\frac{F/A}{\\theta}, \\qquad B = -\\frac{p}{\\Delta V/V}, \\qquad k = \\frac{1}{B}, \\qquad \\sigma = \\frac{\\Delta d/d}{\\Delta L/L}",
        symbols: [
          { symbol: "\\(G\\)", meaning: "shear modulus" },
          { symbol: "\\(B\\)", meaning: "bulk modulus" },
          { symbol: "\\(k\\)", meaning: "compressibility" },
          { symbol: "\\(\\sigma\\)", meaning: "Poisson's ratio" },
        ],
      },
      authoredExample: {
        prompt:
          "The bulk modulus of water is \\(2.2 \\times 10^{9}\\ \\text{N m}^{-2}\\). What pressure reduces the volume of some water by 0.5%?",
        steps: [
          "Volume strain \\(\\dfrac{\\Delta V}{V} = -0.005\\).",
          "\\(p = -B\\dfrac{\\Delta V}{V} = 2.2 \\times 10^{9} \\times 0.005\\).",
          "\\(p = 1.1 \\times 10^{7}\\ \\text{N m}^{-2}\\), about a hundred times atmospheric pressure. Water is hard to squeeze.",
        ],
        answer: "\\(1.1 \\times 10^{7}\\ \\text{N m}^{-2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A wire 2 m long and 2 mm in diameter is stretched by 1 mm, and its diameter shrinks by 0.0003 mm. Find Poisson's ratio for the wire.",
        steps: [
          "Lateral strain \\(= \\dfrac{0.0003}{2} = 1.5 \\times 10^{-4}\\). Longitudinal strain \\(= \\dfrac{1 \\times 10^{-3}}{2} = 5 \\times 10^{-4}\\).",
          "Poisson's ratio \\(= \\dfrac{1.5 \\times 10^{-4}}{5 \\times 10^{-4}} = 0.3\\).",
        ],
        answer: "0.3",
      },
      practiceSet: [
        { prompt: "Which elastic modulus applies to liquids and gases as well as solids?", answer: "The bulk modulus" },
        { prompt: "A material has a bulk modulus of \\(2 \\times 10^{9}\\ \\text{N m}^{-2}\\). What is its compressibility?", answer: "\\(5 \\times 10^{-10}\\ \\text{m}^{2}\\ \\text{N}^{-1}\\)" },
        { prompt: "Pressure from all sides makes each side of a cube 1% shorter. About what is the volume strain?", answer: "About 3%, that is 0.03" },
        { prompt: "For most materials, roughly how does the shear modulus compare with Young's modulus?", answer: "It is about one third of Young's modulus" },
      ],
      pyqExampleId: "a20ac3a1-d079-4425-826d-0177f00cf4a4",
      traps: [
        {
          title: "Compressibility is the reciprocal of the bulk modulus",
          body: "A large bulk modulus means a material is hard to squeeze, so its compressibility \\(\\dfrac{1}{B}\\) is small. They are not the same quantity.",
        },
        {
          title: "A volume changes by three times the side's fraction",
          body: "When each side of a cube shrinks by 1%, the volume shrinks by about 3%. Using the 1% as the volume strain gives an answer three times too small.",
        },
        {
          title: "Poisson's ratio puts the sideways strain on top",
          body: "Poisson's ratio is the lateral strain divided by the longitudinal strain, \\(\\dfrac{\\Delta d/d}{\\Delta L/L}\\). Turning it upside down gives a number larger than 1.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphso-materials",
      name: "The stress-strain curve and how materials behave",
      intuition:
        "Pull a metal wire harder and harder and plot stress against strain. At first the graph is a straight line and the wire springs back. Past a point it stops springing back fully, then it flows, and at last it breaks. Different materials go through these stages differently, which is why steel is used for springs and girders and rubber for bands.",
      definition:
        "- The slope of the straight part of a stress-strain graph is Young's modulus: the steeper line belongs to the stiffer material.\n" +
        "- **More elastic** means harder to deform for a given stress: steel is more elastic than rubber.\n" +
        "- When a coil spring is stretched, its wire is twisted rather than lengthened, so the spring's stretch is set by the shear modulus of its material.\n" +
        "- Materials like rubber and the tissue of the aorta stretch to large strains and still return: they are **elastomers**.",
      table: {
        columns: ["Term", "What it means", "Example"],
        rows: [
          { cells: ["Proportional limit", "Up to this point stress is proportional to strain and the graph is a straight line", "Hooke's law holds for a steel wire under a small load"] },
          { cells: ["Yield point (elastic limit)", "The largest stress after which the body still returns to its original size", "A spring loaded beyond it stays a little longer"] },
          { cells: ["Plastic region", "Beyond the yield point the strain stays when the load is removed: a permanent set", "A copper wire bent out of shape stays bent"] },
          { cells: ["Ultimate tensile strength", "The greatest stress the material can bear", "A crane's steel rope is chosen so its load stays far below this"] },
          { cells: ["Fracture point", "The stress at which the material breaks", "A wire snaps"] },
          { cells: ["Ductile and brittle", "A ductile material breaks far beyond its ultimate strength; a brittle one breaks soon after it", "Copper is ductile; glass is brittle"] },
          {
            cells: ["Spring stretching", "A coil spring changes shape, not length of wire or volume, as it stretches", "Its stretch is set by the shear modulus"],
            noteAmber: "NEET 2022: the assertion that a spring's stretching is set by the shear modulus is true; the reason, that a copper spring has more tensile strength than a steel one, is false.",
            pyqExampleId: "be50733a-ea81-43a2-b8c7-33aacf433c56",
          },
        ],
        caption: "Steel has a large Young's modulus and a high tensile strength; rubber stretches far but has a small Young's modulus.",
      },
      selfCheckExample: {
        prompt: "Steel and rubber are put under the same small stress. Which stretches more, and which has the larger Young's modulus?",
        steps: [
          "Strain \\(= \\dfrac{\\text{stress}}{Y}\\). Rubber has a much smaller Y, so it gets the larger strain and stretches more.",
          "Steel has the larger Young's modulus, so it is the more elastic of the two.",
        ],
        answer: "Rubber stretches more; steel has the larger Young's modulus",
      },
      practiceSet: [
        { prompt: "What are materials like rubber, which can be stretched to large strains and still return, called?", answer: "Elastomers" },
        { prompt: "A wire is loaded beyond its yield point and the load is removed. Does it return to its original length?", answer: "No, it keeps a permanent set" },
        { prompt: "What is the greatest stress a material can bear called?", answer: "Its ultimate tensile strength" },
        { prompt: "On a stress-strain graph, which part gives Young's modulus?", answer: "The slope of the straight part" },
      ],
      pyqExampleId: "be50733a-ea81-43a2-b8c7-33aacf433c56",
      traps: [
        {
          title: "More elastic does not mean stretchier",
          body: "In physics a more elastic material is one that is harder to deform, with a larger Young's modulus. Steel is more elastic than rubber.",
        },
        {
          title: "The elastic limit is not the breaking point",
          body: "Past the elastic limit a wire stops returning to its length, but it has not broken. It still carries more load until its fracture point.",
        },
      ],
    },
  ],
};
