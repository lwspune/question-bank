import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EE_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy Flow and Ecological Pyramids",
  title: "Energy Flow and Ecological Pyramids",
  oneLineDefinition:
    "Only about a tenth of the energy at one level of a food chain passes to the next, so energy shrinks at every step, flows one way and makes an upright pyramid, while nutrients go round in cycles.",
  whyItMatters:
    "Six questions in the bank, one EASY and five MODERATE. Four use the ten percent law: the energy a bear gets, which link passes on the least, matching calorie values to a food chain, and where energy is lost as heat. Two ask who first proposed the ecological pyramid and how nutrients flow compared with energy.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9eeen-tenpercent",
      name: "The ten percent law",
      intuition:
        "A deer eats a lot of grass, but most of what it eats is used up in walking, breathing and keeping warm, and is lost as heat. Only about a tenth is built into the deer's body for a tiger to eat. So each step up a food chain has about one tenth of the energy of the step below.",
      definition:
        "- **Ten percent law** (Lindeman): only about **10%** of the energy at one trophic level passes to the next. About 90% is used in life processes and **lost as heat**.\n" +
        "- So the energy falls by a factor of 10 at each step: the **top consumer has the least energy** and passes on the least.\n" +
        "- Every level, producers and consumers alike, loses energy as heat.\n" +
        "- **Ordering by energy**: when energy values are given for the members of a chain, the largest is the producer and the smallest the top consumer.\n" +
        "- Count the **steps**, not the levels: from the 1st level to the 4th there are 3 steps, so divide by \\(10 \\times 10 \\times 10 = 1000\\).",
      formula: {
        label: "Energy at a level",
        latex: "E_{\\text{next}} = \\frac{E}{10} \\qquad E_n = \\frac{E_1}{10^{\\,n-1}}",
        symbols: [
          { symbol: "E₁", meaning: "energy at the first level (the producers)" },
          { symbol: "Eₙ", meaning: "energy at level n of the chain" },
          { symbol: "n", meaning: "the level's place in the chain: producers are 1" },
        ],
      },
      authoredExample: {
        prompt: "The grass in a field traps 50 000 kJ of energy. In the chain grass, mouse, snake, how much energy reaches the snake?",
        steps: [
          "Mouse (2nd level): \\(\\frac{50\\,000}{10} = 5000\\) kJ.",
          "Snake (3rd level): \\(\\frac{5000}{10} = 500\\) kJ.",
        ],
        answer: "500 kJ",
      },
      selfCheckExample: {
        prompt: "In the chain grass, grasshopper, frog, hawk, the hawk receives 2 kJ. How much energy did the grass hold?",
        steps: ["From the hawk (4th level) down to the grass (1st level) is 3 steps.", "\\(2 \\times 10 \\times 10 \\times 10 = 2000\\) kJ."],
        answer: "2000 kJ",
      },
      practiceSet: [
        { prompt: "The producers in a pond store 20 000 kcal. How much energy reaches the primary consumers?", answer: "2000 kcal" },
        { prompt: "Why does energy decrease at each step of a food chain?", answer: "Most of it is used in life processes and lost as heat; only about 10% passes on" },
        { prompt: "In the chain wheat, rat, snake, eagle, which member has the least energy?", answer: "The eagle, the top consumer" },
        { prompt: "Who gave the ten percent law of energy flow?", answer: "Lindeman" },
      ],
      pyqExampleId: "664bf1d8-3874-44b9-848c-59513abed147",
      traps: [
        {
          title: "Multiplying by 10 going up the chain",
          body: "Energy falls to a tenth at each step up. Multiply by 10 only when you work back down towards the producer.",
        },
        {
          title: "Counting levels instead of steps",
          body: "From the producer to the 4th level there are 3 steps, so the energy is divided by 1000, not by 10 000.",
        },
        {
          title: "Thinking only one level loses heat",
          body: "Producers, herbivores, carnivores and decomposers all lose energy as heat in their life processes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eeen-pyramids",
      name: "Ecological pyramids and the one-way flow of energy",
      intuition:
        "Stack the levels of a food chain one on top of another, the producers at the bottom. Because each level holds much less energy than the one below, the stack narrows to a point like a pyramid. Energy leaks out as heat at every step and never comes back, but the matter in dead bodies is returned to the soil and used again.",
      definition:
        "- The **ecological pyramid** was first proposed by **Charles Elton** (1927), so it is also called the **Eltonian pyramid**.\n" +
        "- There are three kinds: the pyramid of **numbers**, of **biomass** and of **energy**.\n" +
        "- The **pyramid of energy is always upright**. The pyramids of numbers and biomass can be **inverted**.\n" +
        "- **Energy flows one way**: from the Sun to producers to consumers, and is lost as heat. It is never recycled.\n" +
        "- **Nutrients flow in a cycle**: decomposers return them to the soil and air, and plants take them up again.",
      table: {
        columns: ["Pyramid", "What it shows", "Shape"],
        rows: [
          { cells: ["Pyramid of numbers", "The number of organisms at each level", "Usually upright; inverted when one big tree feeds many insects"] },
          { cells: ["Pyramid of biomass", "The mass of living matter at each level", "Usually upright; can be inverted in the sea"] },
          { cells: ["Pyramid of energy", "The energy at each level", "Always upright"], noteAmber: "The only pyramid that can never be inverted." },
        ],
        caption: "Energy: one way. Nutrients: a cycle.",
      },
      selfCheckExample: {
        prompt: "Why can a pyramid of energy never be upside down?",
        steps: ["Each level receives only part of the energy of the level below and loses some as heat.", "So every level has less energy than the one beneath it."],
        answer: "Each higher level always has less energy than the level below it.",
      },
      practiceSet: [
        { prompt: "Who first proposed the ecological pyramid?", answer: "Charles Elton" },
        { prompt: "Give an example where the pyramid of numbers is inverted.", answer: "One large tree on which many insects feed" },
        { prompt: "Is energy recycled in an ecosystem?", answer: "No: it flows one way and is lost as heat" },
        { prompt: "Which organisms return the nutrients in dead bodies to the soil?", answer: "Decomposers (bacteria and fungi)" },
      ],
      pyqExampleId: "d108bff3-615b-49e4-a38a-f9488572cacd",
      traps: [
        {
          title: "Thinking energy cycles like nutrients",
          body: "Energy flows one way and is lost as heat at every step. Only nutrients go round in a cycle.",
        },
        {
          title: "Thinking every pyramid is upright",
          body: "Pyramids of numbers and of biomass can be inverted. Only the pyramid of energy is always upright.",
        },
        {
          title: "Giving the pyramid to Lindeman",
          body: "Charles Elton first proposed the ecological pyramid. Lindeman is known for the ten percent law.",
        },
      ],
    },
  ],
};
