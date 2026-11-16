import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SO_RAOULT_NOTE: SubtopicNote = {
  subtopicName: "Raoult's Law and Deviations",
  title: "Raoult's Law and Deviations",
  oneLineDefinition:
    "The vapour pressure of a mixture of two volatile liquids by Raoult's law, ideal solutions, solutions that show positive or negative deviations, and the azeotropes they form.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026, four of them from 2025 or later. One finds the vapour pressure of a 3 : 2 benzene and octane mixture (2021), one decides the deviation from a measured 70 torr against the 73 torr Raoult's law predicts (2025), one checks statements on ideal solutions and on the chloroform and acetone and the aniline and phenol mixtures (Re-NEET 2026), one asks why chloroform and acetone deviate negatively (NEET 2026), and one is an assertion on the enthalpy and volume of mixing of an ideal solution (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchso-raoult",
      name: "Vapour pressure and Raoult's law",
      intuition:
        "In a closed vessel some molecules of a liquid escape into the space above it until the vapour is in equilibrium with the liquid. The pressure of that vapour is the vapour pressure. In a mixture of two volatile liquids, each liquid has only part of the surface, so each escapes less than it would alone. Raoult's law says each one's partial pressure is its pure vapour pressure scaled by its mole fraction.",
      definition:
        "- **Vapour pressure** is the pressure of the vapour in equilibrium with its liquid at a given temperature. It rises as the temperature rises.\n" +
        "- A liquid boils when its vapour pressure equals the atmospheric pressure. So, at a given temperature, the liquid with the lower boiling point has the higher vapour pressure: it is more **volatile**.\n" +
        "- **Raoult's law:** for a solution of volatile liquids, the partial vapour pressure of each component is proportional to its mole fraction: \\(p_1 = x_1 p_1^\\circ\\), \\(p_2 = x_2 p_2^\\circ\\).\n" +
        "- **Total vapour pressure** (Dalton's law): \\(P = p_1 + p_2 = x_1 p_1^\\circ + x_2 p_2^\\circ\\). Plotted against the mole fraction it is a straight line from one pure vapour pressure to the other.\n" +
        "- **Composition of the vapour:** \\(y_1 = \\dfrac{p_1}{P}\\). The vapour is richer in the more volatile component.\n" +
        "- A mole ratio of 3 : 2 means mole fractions of \\(\\dfrac{3}{5}\\) and \\(\\dfrac{2}{5}\\).",
      formula: {
        label: "Raoult's law",
        latex: "p_1 = x_1 p_1^\\circ, \\qquad P = x_1 p_1^\\circ + x_2 p_2^\\circ, \\qquad y_1 = \\frac{p_1}{P}",
        symbols: [
          { symbol: "\\(p_1^\\circ\\)", meaning: "vapour pressure of pure component 1 at that temperature" },
          { symbol: "\\(x_1\\)", meaning: "mole fraction of component 1 in the liquid" },
          { symbol: "\\(y_1\\)", meaning: "mole fraction of component 1 in the vapour" },
        ],
      },
      authoredExample: {
        prompt:
          "Liquids A (\\(p_A^\\circ = 300\\) mm Hg) and B (\\(p_B^\\circ = 100\\) mm Hg) form an ideal solution with \\(x_A = 0.25\\). Find the total vapour pressure and the mole fraction of A in the vapour.",
        steps: [
          "\\(x_B = 1 - 0.25 = 0.75\\).",
          "\\(p_A = 0.25 \\times 300 = 75\\) mm Hg and \\(p_B = 0.75 \\times 100 = 75\\) mm Hg.",
          "\\(P = 75 + 75 = 150\\) mm Hg.",
          "\\(y_A = \\dfrac{75}{150} = 0.5\\). A is a quarter of the liquid but half of the vapour, because it is the more volatile liquid.",
        ],
        answer: "150 mm Hg; \\(y_A = 0.5\\)",
      },
      selfCheckExample: {
        prompt:
          "An equimolar ideal solution of A and B has a total vapour pressure of 400 mm Hg. Pure A has a vapour pressure of 500 mm Hg. Find the vapour pressure of pure B.",
        steps: [
          "Equimolar means \\(x_A = x_B = 0.5\\).",
          "\\(400 = 0.5 \\times 500 + 0.5\\,p_B^\\circ = 250 + 0.5\\,p_B^\\circ\\).",
          "\\(0.5\\,p_B^\\circ = 150\\), so \\(p_B^\\circ = 300\\) mm Hg.",
        ],
        answer: "300 mm Hg",
      },
      practiceSet: [
        { prompt: "Over an ideal solution of A and B, the partial pressure of A is 30 torr and the total vapour pressure is 120 torr. Find the mole fraction of A in the vapour.", answer: "0.25" },
        { prompt: "Liquid X boils at 60 °C and liquid Y boils at 110 °C. Which has the higher vapour pressure at 30 °C?", answer: "X, the liquid with the lower boiling point" },
        { prompt: "For an ideal solution of two volatile liquids, what is the shape of the plot of total vapour pressure against mole fraction?", answer: "A straight line" },
        { prompt: "In the vapour over an ideal solution of two volatile liquids, which component has a larger share than it has in the liquid?", answer: "The more volatile one, with the higher pure vapour pressure" },
      ],
      pyqExampleId: "2acc8e7e-940e-46c0-bf59-5a4395bfaad7",
      traps: [
        {
          title: "Turn a mole ratio into mole fractions first",
          body: "A ratio of 3 : 2 gives mole fractions \\(\\dfrac{3}{5}\\) and \\(\\dfrac{2}{5}\\), not 3 and 2 or \\(\\dfrac{3}{2}\\). Each fraction multiplies its own liquid's pure vapour pressure.",
        },
        {
          title: "Divide by the total to get the vapour mole fraction",
          body: "\\(x_1 p_1^\\circ\\) is a partial pressure. The mole fraction in the vapour is that partial pressure divided by the total vapour pressure.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchso-deviations",
      name: "Ideal and non-ideal solutions",
      intuition:
        "Raoult's law holds exactly only when a molecule of A is held by B just as strongly as by another A. If mixing makes the attractions weaker, molecules escape more easily and the vapour pressure comes out higher than Raoult's law predicts. If mixing makes them stronger, often through a new hydrogen bond, the vapour pressure comes out lower. To decide, work out the Raoult's law value and compare it with the measured one.",
      definition:
        "- **Ideal solution:** obeys Raoult's law over the entire range of concentration. The attractions A-B are nearly equal to A-A and B-B. For it \\(\\Delta_{\\text{mix}}H = 0\\) and \\(\\Delta_{\\text{mix}}V = 0\\).\n" +
        "- **Positive deviation:** the A-B attractions are weaker than A-A and B-B, so the vapour pressure is higher than Raoult's law predicts.\n" +
        "- **Negative deviation:** the A-B attractions are stronger than A-A and B-B, so the vapour pressure is lower than Raoult's law predicts.\n" +
        "- To check a mixture by number: work out \\(x_A p_A^\\circ + x_B p_B^\\circ\\). A measured value above it is a positive deviation; below it, a negative deviation.\n" +
        "- **Azeotropes** are mixtures that have the same composition in the liquid and the vapour and boil at a constant temperature, so fractional distillation cannot separate them.\n" +
        "- A large positive deviation gives a **minimum boiling azeotrope**; a large negative deviation gives a **maximum boiling azeotrope**.",
      table: {
        columns: ["Mixture", "Behaviour", "Why, or what follows"],
        rows: [
          { cells: ["n-Hexane and n-heptane", "Ideal", "Similar molecules with nearly equal attractions"] },
          { cells: ["Bromoethane and chloroethane", "Ideal", "Similar molecules with nearly equal attractions"] },
          { cells: ["Benzene and toluene", "Ideal", "Similar molecules with nearly equal attractions"] },
          { cells: ["Ethanol and acetone", "Positive deviation", "Acetone molecules get between ethanol molecules and break some of their hydrogen bonds"] },
          { cells: ["Carbon disulphide and acetone", "Positive deviation", "The attractions between the two liquids are weaker than those within each"] },
          { cells: ["Ethanol and water", "Positive deviation", "Minimum boiling azeotrope at about 95% ethanol by volume"] },
          { cells: ["Chloroform and acetone", "Negative deviation", "Chloroform forms a hydrogen bond with acetone"], noteAmber: "NEET 2026: the negative deviation is due to hydrogen bonding between chloroform and acetone." },
          { cells: ["Phenol and aniline", "Negative deviation", "The hydrogen bond between phenol's O-H and aniline's nitrogen is stronger than those within each liquid"], noteAmber: "Re-NEET 2026: aniline and phenol show negative deviation, not positive." },
          { cells: ["Nitric acid and water", "Negative deviation", "Maximum boiling azeotrope at about 68% nitric acid by mass"] },
        ],
        caption: "A new, stronger attraction between the two liquids lowers the vapour pressure; broken attractions raise it.",
      },
      pyqExampleId: "2648df17-ef18-4479-b62a-78f105e30795",
      selfCheckExample: {
        prompt:
          "1 mol of liquid A (\\(p_A^\\circ = 100\\) torr) is mixed with 1 mol of liquid B (\\(p_B^\\circ = 200\\) torr). The measured vapour pressure of the mixture is 170 torr. Which deviation from Raoult's law does it show?",
        steps: [
          "\\(x_A = x_B = 0.5\\). Raoult's law predicts \\(0.5 \\times 100 + 0.5 \\times 200 = 150\\) torr.",
          "The measured 170 torr is higher than 150 torr, so the molecules escape more easily than in an ideal solution.",
        ],
        answer: "Positive deviation",
      },
      practiceSet: [
        { prompt: "Does a mixture of ethanol and acetone show a positive or a negative deviation from Raoult's law?", answer: "Positive" },
        { prompt: "Which kind of azeotrope does a solution with a large negative deviation from Raoult's law form?", answer: "A maximum boiling azeotrope" },
        { prompt: "What are the enthalpy of mixing and the volume of mixing for an ideal solution?", answer: "Both are zero" },
        { prompt: "Why can fractional distillation not separate an azeotrope?", answer: "Its liquid and its vapour have the same composition" },
      ],
      traps: [
        {
          title: "Ideal does not mean no attractions",
          body: "In an ideal solution the molecules still attract each other. The A-B attractions are nearly equal to the A-A and B-B ones, which is why \\(\\Delta_{\\text{mix}}H\\) and \\(\\Delta_{\\text{mix}}V\\) are zero.",
        },
        {
          title: "Positive deviation gives the minimum boiling azeotrope",
          body: "A positive deviation raises the vapour pressure, so the mixture boils lower: ethanol and water form a minimum boiling azeotrope. A negative deviation gives a maximum boiling azeotrope, as nitric acid and water do.",
        },
        {
          title: "Phenol and aniline deviate negatively",
          body: "Phenol and aniline form a hydrogen bond with each other that is stronger than the hydrogen bonds in either pure liquid, so their deviation is negative, like chloroform and acetone.",
        },
      ],
    },
  ],
};
