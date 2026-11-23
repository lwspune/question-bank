import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_TRANSISTOR_NOTE: SubtopicNote = {
  subtopicName: "Bipolar Junction Transistor",
  title: "The Bipolar Junction Transistor",
  oneLineDefinition:
    "How a transistor is built and doped, how carriers cross its thin base when the emitter-base junction is forward biased and the collector-base junction reverse biased, and the current gains α and β.",
  whyItMatters:
    "10 questions. Three were set in board papers: explain the working of an n-p-n transistor in the common base configuration (2023), define the current gains α and β and obtain the relation between them (2024), and a multiple-choice question on how the junctions are biased in saturation (2017). The textbook adds why the three regions are doped differently, why the base is thin and lightly doped, which terminal carries the largest current, the α-β derivation and three calculations with the terminal currents.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsd-bjt-structure",
      name: "Structure and doping of a transistor",
      intuition:
        "A transistor is three layers of doped semiconductor, like two diodes back to back. Each layer has one job. The emitter sends carriers in, the base lets almost all of them pass, and the collector gathers them. Each layer is doped and sized to suit its job.",
      definition:
        "- **Bipolar junction transistor (BJT):** a device with two junctions and three terminals. Its current is carried by both electrons and holes, hence 'bipolar'. Two types: **n-p-n** (a thin p-type base between two n-type layers) and **p-n-p** (a thin n-type base between two p-type layers).\n" +
        "- **Symbol:** an arrow on the emitter shows the direction of conventional current: in an n-p-n it points away from the base; in a p-n-p it points towards the base.\n" +
        "- **Configurations:** common emitter (CE), common base (CB) and common collector (CC), named by the terminal common to the input and the output.\n" +
        "- The thin, lightly doped base between a heavily doped emitter and an intermediate doped collector is what makes transistor action possible.",
      table: {
        columns: ["Region", "Size and doping", "Its job"],
        rows: [
          { cells: ["Emitter", "Thick and heavily doped", "Supplies a large number of majority carriers"] },
          {
            cells: ["Base", "Thin and lightly doped", "Passes almost all the carriers on: few recombine, so the base current is only about 5% of the emitter current"],
            pyqExampleId: "3389cb5b-6bc1-48b4-90ba-6ea4b8631049",
            noteAmber: "The textbook asks why the base is made thin and lightly doped.",
          },
          { cells: ["Collector", "Intermediate doping, largest area", "Collects most of the carriers and dissipates the small heat produced"] },
        ],
      },
      practiceSet: [
        { prompt: "Which region of a transistor has the largest area?", answer: "The collector" },
        { prompt: "In the symbol of an n-p-n transistor, which way does the arrow on the emitter point?", answer: "Away from the base" },
        { prompt: "Name the three configurations in which a transistor can be connected.", answer: "Common emitter, common base and common collector" },
      ],
      traps: [
        {
          title: "Calling the collector lightly doped",
          body: "Page 357 of the textbook calls the collector lightly doped, ten times lighter than the base, but its own 'Remember this' box on page 358 calls it intermediate doped. Write: emitter heavy, base light, collector intermediate.",
        },
        {
          title: "Giving the doping without the reason",
          body: "'Why are the three regions doped differently?' needs each region's JOB with its doping. 'The base is lightly doped' alone does not say why, and loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-bjt-working",
      name: "How an n-p-n transistor works",
      intuition:
        "Forward bias on the emitter-base junction floods the base with electrons from the emitter. The base is too thin and too lightly doped to catch many of them, so about 95 of every 100 drift through to the collector-base junction, where the reverse bias field sweeps them into the collector. A small base current goes with a large collector current.",
      definition:
        "The board asks you to explain this (2023: in the common base configuration). Write it in this order:\n" +
        "- **Biasing:** the emitter-base junction is **forward biased** and the collector-base junction is **reverse biased**. In the common base configuration the base is common to the input (emitter-base) and the output (collector-base).\n" +
        "- When \\(V_{BE}\\) exceeds the barrier potential (0.6 V to 0.7 V for silicon), many electrons from the n-type emitter enter the base. They form the emitter current \\(I_E\\).\n" +
        "- The base is thin and lightly doped, so only a few electrons recombine there. They form the small base current \\(I_B\\), about 5% of \\(I_E\\).\n" +
        "- The rest diffuse to the collector-base depletion region, and its field pushes them into the collector. They form the collector current \\(I_C\\), about 95% of \\(I_E\\).\n" +
        "- So \\(I_E = I_B + I_C\\), and since \\(I_B\\) is very small, \\(I_C \\approx I_E\\).\n" +
        "- A p-n-p transistor works the same way, with holes as the majority carriers.",
      formula: {
        label: "Terminal currents",
        latex: "I_E = I_B + I_C",
      },
      authoredExample: {
        prompt:
          "In a transistor the emitter current is 12 mA and the base current is 5% of the emitter current. Find the base current and the collector current.",
        steps: [
          "Given: \\(I_E = 12\\) mA, \\(I_B = 5\\%\\) of \\(I_E\\).",
          "\\(I_B = 0.05 \\times 12 = 0.6\\) mA.",
          "Formula: \\(I_E = I_B + I_C\\), so \\(I_C = I_E - I_B\\).",
          "\\(I_C = 12 - 0.6 = 11.4\\) mA.",
        ],
        answer: "Base current 0.6 mA; collector current 11.4 mA",
      },
      selfCheckExample: {
        prompt: "A transistor has a collector current of 4.9 mA and a base current of 0.1 mA. Find the emitter current.",
        steps: ["\\(I_E = I_B + I_C = 0.1 + 4.9\\)."],
        answer: "5.0 mA",
      },
      practiceSet: [
        { prompt: "In normal operation, which junction of a transistor is reverse biased?", answer: "The collector-base junction" },
        { prompt: "What is the barrier potential of the emitter-base junction of a silicon transistor?", answer: "0.6 V to 0.7 V" },
        { prompt: "Which carriers form the emitter current of a p-n-p transistor?", answer: "Holes" },
      ],
      pyqExampleId: "25742c73-a02c-464c-8327-835dfdc006c6",
      traps: [
        {
          title: "Skipping the biasing",
          body: "Start the working by stating which junction is forward biased and which is reverse biased. Without it the rest of the explanation has nothing to stand on, and the first mark is lost.",
        },
        {
          title: "A large base current",
          body: "The base current is the SMALLEST of the three, about 5% of the emitter current. The emitter current is the largest, since it is the sum of the other two.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-alpha-beta",
      name: "Current gains α and β and their relation",
      intuition:
        "α compares the collector current with the emitter current: nearly all the emitter's carriers reach the collector, so α is just below 1. β compares the collector current with the tiny base current, so β is large. Both come from the same three currents, so one fixes the other.",
      definition:
        "The board asks you to define both and obtain the relation (2024). The derivation, one step a line:\n" +
        "- \\(\\alpha_{DC} = \\dfrac{I_C}{I_E}\\): the common base DC current gain, slightly less than 1.\n" +
        "- \\(\\beta_{DC} = \\dfrac{I_C}{I_B}\\): the common emitter DC current gain (current amplification factor), typically 20 to 200.\n" +
        "- Start from \\(I_E = I_B + I_C\\).\n" +
        "- Divide by \\(I_C\\): \\(\\dfrac{I_E}{I_C} = \\dfrac{I_B}{I_C} + 1\\), that is, \\(\\dfrac{1}{\\alpha} = \\dfrac{1}{\\beta} + 1 = \\dfrac{1 + \\beta}{\\beta}\\).\n" +
        "- So \\(\\alpha = \\dfrac{\\beta}{1 + \\beta}\\), and rearranging, \\(\\beta = \\dfrac{\\alpha}{1 - \\alpha}\\).\n" +
        "- The textbook's Eq. (16.6) prints the second relation with \\(\\alpha - 1\\) in the denominator. That gives a negative β for every transistor, so write \\(1 - \\alpha\\).",
      formula: {
        label: "Relation between α and β",
        latex: "\\alpha = \\frac{\\beta}{1 + \\beta}, \\qquad \\beta = \\frac{\\alpha}{1 - \\alpha}",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "collector current divided by emitter current" },
          { symbol: "\\(\\beta\\)", meaning: "collector current divided by base current" },
        ],
      },
      authoredExample: {
        prompt:
          "A transistor has \\(\\beta_{DC} = 49\\). Find \\(\\alpha_{DC}\\), and the collector and base currents when the emitter current is 5 mA.",
        steps: [
          "Given: \\(\\beta = 49\\), \\(I_E = 5\\) mA.",
          "Formula: \\(\\alpha = \\dfrac{\\beta}{1 + \\beta} = \\dfrac{49}{50} = 0.98\\).",
          "\\(I_C = \\alpha I_E = 0.98 \\times 5 = 4.9\\) mA.",
          "\\(I_B = I_E - I_C = 5 - 4.9 = 0.1\\) mA. Check: \\(I_C / I_B = 4.9 / 0.1 = 49\\).",
        ],
        answer: "α = 0.98; collector current 4.9 mA; base current 0.1 mA",
      },
      selfCheckExample: {
        prompt: "The common base current gain of a transistor is 0.95. Find its common emitter current gain.",
        steps: ["\\(\\beta = \\dfrac{\\alpha}{1 - \\alpha} = \\dfrac{0.95}{0.05}\\)."],
        answer: "19",
      },
      practiceSet: [
        { prompt: "A transistor has a collector current of 2 mA and a base current of 20 μA. Find β.", answer: "100" },
        { prompt: "In a common emitter circuit β = 80 and the base current is 50 μA. Find the collector current.", answer: "4 mA" },
        { prompt: "Why is α always less than 1?", answer: "The collector current is always a little less than the emitter current, since part of the emitter current leaves through the base" },
      ],
      pyqExampleId: "af1a3d57-c293-4d89-998e-529ccf167fe1",
      traps: [
        {
          title: "Copying the misprinted relation",
          body: "\\(\\beta = \\dfrac{\\alpha}{\\alpha - 1}\\) gives a negative answer, since \\(\\alpha\\) is less than 1. The correct relation is \\(\\beta = \\dfrac{\\alpha}{1 - \\alpha}\\); check it by putting \\(\\alpha = 0.98\\), which must give 49.",
        },
        {
          title: "Mixing up the two definitions",
          body: "α divides by the EMITTER current, β by the BASE current. Both have the collector current on top, and both have no unit.",
        },
        {
          title: "Microamperes and milliamperes together",
          body: "When the base current is in μA and the collector current in mA, bring them to the same unit before dividing. 2 mA over 20 μA is 2000 μA over 20 μA, which is 100.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpsd-bjt-regions",
      name: "Cut-off, active and saturation (older papers)",
      intuition:
        "Each of the two junctions can be forward or reverse biased, so a transistor can be in one of three useful states. Both junctions blocking: no current, like an open switch. Only the emitter junction conducting: the normal amplifying state. Both conducting: a large current fixed by the outside circuit, like a closed switch.",
      definition:
        "- **How much time to give it:** the board asked about the saturation region in 2017, before the present book. The present book does not teach these regions by name; it only asks, in a 'Use your brain power' box, what would happen if both junctions were forward or both reverse biased. Learn the table, but give it little time.\n" +
        "- The present book's biasing for normal use is the **active** row: emitter-base forward, collector-base reverse.\n" +
        "- The regions are set by the bias of the junctions, so they are the same for n-p-n and p-n-p transistors (the supply polarities are reversed for p-n-p).",
      table: {
        columns: ["Region", "Emitter-base junction", "Collector-base junction", "Behaviour"],
        rows: [
          { cells: ["Cut-off", "Reverse biased", "Reverse biased", "Almost no collector current; an open switch"] },
          { cells: ["Active", "Forward biased", "Reverse biased", "Normal working, used as an amplifier"] },
          {
            cells: ["Saturation", "Forward biased", "Forward biased", "Large current set by the outside circuit; a closed switch"],
            pyqExampleId: "8f273b36-b817-4101-9aac-4762543214da",
            noteAmber: "Board 2017 asked how the junctions of a p-n-p transistor are biased in saturation.",
          },
        ],
      },
      practiceSet: [
        { prompt: "In which region must a transistor work to act as an amplifier?", answer: "The active region" },
        { prompt: "Both junctions of a transistor are reverse biased. In which region is it?", answer: "Cut-off" },
      ],
      traps: [
        {
          title: "A different table for p-n-p",
          body: "The regions depend only on which junctions are forward or reverse biased, so the same table holds for p-n-p and n-p-n transistors.",
        },
      ],
    },
  ],
};
