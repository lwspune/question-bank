import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_XENON_NOTE: SubtopicNote = {
  subtopicName: "Compounds of Xenon",
  title: "Compounds of Xenon",
  oneLineDefinition:
    "Why xenon, alone among the noble gases here, forms compounds; how its fluorides, trioxide and oxyfluorides are made; and their oxidation states and shapes.",
  whyItMatters:
    "6 questions. One was set in a board paper: completing the hydrolysis of XeF₂ and the direct reaction of xenon with fluorine (2024). The textbook adds the preparation of the three xenon fluorides, of XeO₃ and XeOF₄, the oxidation states and structures of xenon compounds, and the names of the oxyfluorides.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-xenon-preparation",
      name: "Preparing xenon fluorides, oxide and oxyfluorides",
      intuition:
        "Noble gases are unreactive because their full shells are hard to disturb. But ionisation enthalpy falls down group 18, and xenon is large enough to give up electrons to the most electronegative element, fluorine. Once you have the fluorides, water does the rest: it swaps fluorine for oxygen, one water molecule at a time.",
      definition:
        "- Ionisation enthalpy decreases down group 18, so the heavier noble gases krypton, xenon and radon can form compounds. The first true noble gas compound was made in 1962 by Neil Bartlett: \\(\\text{Xe} + 2[\\text{PtF}_6] \\longrightarrow [\\text{XeF}]^+[\\text{Pt}_2\\text{F}_{11}]^-\\).\n" +
        "- Only xenon reacts directly with fluorine. The fluorides form from xenon and fluorine in different ratios and conditions, as below.\n" +
        "- \\(\\text{XeF}_2\\): xenon and fluorine in a sealed nickel tube at 400 °C.\n" +
        "- \\(\\text{XeF}_4\\): xenon and fluorine in the ratio 1 : 5, nickel tube, 400 °C, 5 to 6 atm; or \\(\\text{Xe} + 2\\text{F}_2\\) with an electric discharge at \\(-80\\) °C.\n" +
        "- \\(\\text{XeF}_6\\): \\(\\text{Xe} + 3\\text{F}_2\\) with an electric discharge at low temperature.\n" +
        "- The fluorides are colourless crystalline solids that sublime readily at 298 K and are powerful fluorinating agents.\n" +
        "- **Reactions of \\(\\text{XeF}_2\\):** hydrolysis, \\(2\\text{XeF}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 4\\text{HF} + 2\\text{Xe} + \\text{O}_2\\); with \\(\\text{PF}_5\\) it forms the adduct \\(\\text{XeF}_2 \\cdot \\text{PF}_5\\).\n" +
        "- **\\(\\text{XeO}_3\\):** \\(3\\text{XeF}_4 + 6\\text{H}_2\\text{O} \\longrightarrow 2\\text{Xe} + \\text{XeO}_3 + 12\\text{HF} + \\tfrac{3}{2}\\text{O}_2\\), or complete hydrolysis of \\(\\text{XeF}_6\\).\n" +
        "- **Oxyfluorides** (\\(\\text{XeOF}_2\\), \\(\\text{XeO}_2\\text{F}_2\\), \\(\\text{XeO}_3\\text{F}_2\\), \\(\\text{XeO}_2\\text{F}_4\\), \\(\\text{XeOF}_4\\)) come from partial hydrolysis: \\(\\text{XeF}_4 + \\text{H}_2\\text{O} \\xrightarrow{80\\ ^\\circ\\text{C}} \\text{XeOF}_2 + 2\\text{HF}\\). Then \\(2\\text{XeOF}_4 + \\text{SiO}_2 \\longrightarrow 2\\text{XeO}_2\\text{F}_2 + \\text{SiF}_4\\) and \\(\\text{XeOF}_4 + \\text{H}_2\\text{O} \\longrightarrow \\text{XeO}_2\\text{F}_2 + 2\\text{HF}\\).\n" +
        "- Names count the atoms: \\(\\text{XeOF}_2\\) xenon monooxydifluoride, \\(\\text{XeO}_2\\text{F}_2\\) xenon dioxydifluoride, \\(\\text{XeO}_3\\text{F}_2\\) xenon trioxydifluoride, \\(\\text{XeO}_2\\text{F}_4\\) xenon dioxytetrafluoride.",
      formula: {
        label: "Making the highest fluoride of xenon",
        latex: "\\text{Xe} + 3\\text{F}_2 \\xrightarrow{\\text{electric discharge, low temp.}} \\text{XeF}_6",
      },
      authoredExample: {
        prompt: "Starting from xenon hexafluoride, how are (a) XeO₃ and (b) XeOF₄ prepared? Write balanced equations.",
        steps: [
          "(a) Complete hydrolysis replaces all six fluorines: \\(\\text{XeF}_6 + 3\\text{H}_2\\text{O} \\longrightarrow \\text{XeO}_3 + 6\\text{HF}\\).",
          "Check: 1 Xe, 6 F, 6 H and 3 O on each side.",
          "(b) Partial hydrolysis with one water molecule replaces only two fluorines: \\(\\text{XeF}_6 + \\text{H}_2\\text{O} \\longrightarrow \\text{XeOF}_4 + 2\\text{HF}\\).",
          "Check: 1 Xe, 6 F, 2 H and 1 O on each side.",
        ],
        answer: "XeF₆ + 3H₂O → XeO₃ + 6HF; XeF₆ + H₂O → XeOF₄ + 2HF",
      },
      selfCheckExample: {
        prompt: "What does xenon difluoride form with phosphorus pentafluoride?",
        steps: ["\\(\\text{XeF}_2 + \\text{PF}_5 \\longrightarrow \\text{XeF}_2 \\cdot \\text{PF}_5\\)."],
        answer: "An adduct, XeF₂·PF₅",
      },
      practiceSet: [
        { prompt: "Who made the first true compound of a noble gas, and in which year?", answer: "Neil Bartlett, in 1962" },
        { prompt: "What is formed when XeOF₄ reacts with silica?", answer: "\\(\\text{XeO}_2\\text{F}_2\\) and \\(\\text{SiF}_4\\)" },
        { prompt: "Name XeO₂F₄.", answer: "Xenon dioxytetrafluoride" },
        { prompt: "Why do the heavier noble gases form compounds while helium and neon do not?", answer: "Ionisation enthalpy falls down the group, so krypton, xenon and radon lose electrons more easily" },
      ],
      pyqExampleId: "a13616ad-77c8-41da-abf6-360cc6a9911c",
      traps: [
        {
          title: "XeF₂ and water give xenon back",
          body: "Hydrolysis of \\(\\text{XeF}_2\\) gives free xenon, HF and oxygen; it is a redox reaction. It does not give an oxide of xenon.",
        },
        {
          title: "Partial against complete hydrolysis",
          body: "One molecule of water turns \\(\\text{XeF}_6\\) into \\(\\text{XeOF}_4\\); three turn it into \\(\\text{XeO}_3\\). Read how much water the question gives.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-xenon-structures",
      name: "Oxidation states and shapes of xenon compounds",
      intuition:
        "Xenon has eight valence electrons. Each fluorine uses one of them in a bond and each oxygen two; whatever is left stays as lone pairs. Count bonded atoms and lone pairs, place them as far apart as possible, and name the shape from the atoms alone.",
      definition:
        "- **Oxidation state:** take F as \\(-1\\) and O as \\(-2\\); the sum is zero. So \\(\\text{XeF}_2\\) is \\(+2\\), \\(\\text{XeF}_4\\) \\(+4\\), and \\(\\text{XeF}_6\\), \\(\\text{XeO}_3\\) and \\(\\text{XeOF}_4\\) are \\(+6\\).\n" +
        "- **Shape:** five electron pairs make a trigonal bipyramid, six an octahedron; lone pairs take the positions with most room, and the shape is named from the atoms.\n" +
        "- A board 'draw the structure' answer gives the formula, the shape name and a labelled sketch with the lone pairs shown.",
      table: {
        columns: ["Compound", "Oxidation state of Xe", "Bonded atoms and lone pairs on Xe", "Shape"],
        rows: [
          { cells: ["\\(\\text{XeF}_2\\)", "\\(+2\\)", "2 atoms, 3 lone pairs", "Linear"] },
          {
            cells: ["\\(\\text{XeF}_4\\)", "\\(+4\\)", "4 atoms, 2 lone pairs", "Square planar"],
            pyqExampleId: "7ea07bc4-4cc1-4b7e-83e5-19bb0dd4a2cf",
          },
          { cells: ["\\(\\text{XeF}_6\\)", "\\(+6\\)", "6 atoms, 1 lone pair", "Distorted octahedral"] },
          { cells: ["\\(\\text{XeO}_3\\)", "\\(+6\\)", "3 atoms, 1 lone pair", "Trigonal pyramidal"] },
          { cells: ["\\(\\text{XeOF}_4\\)", "\\(+6\\)", "5 atoms, 1 lone pair", "Square pyramidal"] },
        ],
      },
      practiceSet: [
        { prompt: "Find the oxidation state of xenon in XeO₂F₂.", answer: "\\(+6\\), since \\(x - 4 - 2 = 0\\)" },
        { prompt: "Which xenon compound is trigonal pyramidal?", answer: "\\(\\text{XeO}_3\\)" },
        { prompt: "Why is XeF₆ a distorted octahedron and not a regular one?", answer: "Xenon carries one lone pair besides the six bonds, and it distorts the shape" },
      ],
      pyqExampleId: "f94cc851-f9df-4d8a-9de8-d28f77260646",
      traps: [
        {
          title: "XeF₄ is not tetrahedral",
          body: "Xenon in \\(\\text{XeF}_4\\) has four bonds and two lone pairs. The lone pairs sit above and below the plane, so the molecule is square planar.",
        },
        {
          title: "Forgetting the lone pair in XeO₃",
          body: "Three oxygens round xenon look like a flat triangle, but xenon also carries a lone pair, so the molecule is trigonal pyramidal.",
        },
      ],
    },
  ],
};
