import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HE_TRANSFER_NOTE: SubtopicNote = {
  subtopicName: "Heat Transfer and Specific Heat",
  title: "Heat Transfer and Specific Heat",
  oneLineDefinition:
    "Heat moves by conduction, convection and radiation, and evaporation carries it away; the heat a body takes to warm up is Q = mcΔT, and water's high specific heat makes it a good coolant.",
  whyItMatters:
    "Four questions in the bank, three EASY and one MODERATE: the temperatures along a test tube of water heated in the middle, why evaporation keeps the Earth's surface cool, why water is used as a coolant, and the heat needed to warm an iron bob by 10 °C.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hetr-transfer",
      name: "Conduction, convection, radiation and cooling by evaporation",
      intuition:
        "Hold one end of a steel spoon in a flame and the other end soon gets hot: heat passes along the metal. Heat a pan of water and the warm water rises while cooler water sinks to take its place. Stand in the sun and you feel its heat across empty space. And when water evaporates from your skin, it takes heat with it, which is why sweat cools you.",
      definition:
        "- **Conduction**: heat passes from particle to particle without the particles moving along, mainly in **solids**. Metals are good conductors; **water, air and wood are poor conductors**.\n" +
        "- **Convection**: in a **liquid or gas**, the heated part becomes lighter and **rises**, and cooler parts sink. So heat in water travels **upward** far more easily than downward.\n" +
        "- **Radiation**: heat travels **without any medium**, as from the Sun to the Earth.\n" +
        "- Heat a test tube of water in the middle: the water at the flame is hottest, the water above it warms by convection, and the water below stays cooler and cooler, since water conducts heat poorly.\n" +
        "- **Evaporation causes cooling**: the liquid takes heat (latent heat) from its surroundings to turn into vapour. Sweat drying on the skin, water in an earthen pot and evaporation from seas, lakes and plants (which keeps the Earth's surface cooler) all work this way.",
      table: {
        columns: ["Mode", "How heat moves", "Example"],
        rows: [
          { cells: ["Conduction", "Particle to particle, mainly in solids", "The handle of a steel spoon in hot tea gets hot"] },
          { cells: ["Convection", "The heated liquid or gas itself rises and carries the heat", "Water boiling in a pan, the sea breeze"] },
          { cells: ["Radiation", "With no medium at all", "The Sun's heat reaching the Earth"] },
        ],
        caption: "Evaporation is not a mode of transfer, but it carries heat away and so cools.",
      },
      selfCheckExample: {
        prompt: "Why does water kept in an earthen pot stay cool in summer?",
        steps: ["Water seeps through the tiny pores of the pot and evaporates from its outer surface.", "Evaporation takes heat from the pot and the water inside."],
        answer: "Evaporation from the pot's surface takes heat away and cools the water",
      },
      practiceSet: [
        { prompt: "By which mode does the heat of the Sun reach the Earth?", answer: "Radiation" },
        { prompt: "Why do we feel cool when sweat dries on our skin?", answer: "The sweat takes heat from the body to evaporate, so the body cools" },
        { prompt: "Is water a good or a poor conductor of heat?", answer: "A poor conductor" },
        { prompt: "By which mode does heat travel from the hot end of a metal rod to its cold end?", answer: "Conduction" },
      ],
      pyqExampleId: "9d859ec3-508b-4b5e-a692-4ebc57cb0555",
      traps: [
        {
          title: "Thinking heat spreads downward easily in water",
          body: "Water is a poor conductor. Heated water rises by convection, so water below a flame stays much cooler than water above it.",
        },
        {
          title: "Thinking evaporation warms a surface",
          body: "Evaporation takes heat away from the surface it leaves, so it cools. That is why evaporation keeps the Earth's surface cooler.",
        },
        {
          title: "Mixing up conduction and convection",
          body: "In conduction the particles stay in place and pass the heat on. In convection the warm liquid or gas itself moves and carries the heat.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9hetr-specific",
      name: "Specific heat and latent heat",
      intuition:
        "On a sunny day the sand on a beach gets too hot to walk on, while the sea stays cool. Water needs much more heat than sand to warm up by one degree: it has a high specific heat. That same property lets water soak up a lot of heat from an engine without getting very hot, which is why it is used as a coolant.",
      definition:
        "- **Specific heat capacity (c)**: the heat needed to raise the temperature of **1 g** of a substance by **1 °C** (in cal/g °C), or of 1 kg by 1 °C (in J/kg °C).\n" +
        "- Heat taken in or given out: \\(Q = mc\\Delta T\\). Keep units matched: grams with cal/g °C.\n" +
        "- **Water** has a very high specific heat, **1 cal/g °C** (about 4200 J/kg °C). It heats up and cools down slowly, so it is used as a **coolant** in car radiators and in hot-water bags. It is used for this even though it is a poor conductor.\n" +
        "- **Latent heat**: heat taken in during a change of state with **no change of temperature**. Melting ice at 0 °C takes 80 cal/g; boiling water at 100 °C takes 540 cal/g.",
      formula: {
        label: "Heat for a change of temperature",
        latex: "Q = mc\\Delta T \\qquad c = \\frac{Q}{m\\Delta T} \\qquad Q = mL",
        symbols: [
          { symbol: "Q", meaning: "heat, in calories (or joules)" },
          { symbol: "m", meaning: "mass, in grams (or kg)" },
          { symbol: "c", meaning: "specific heat capacity, in cal/g °C (or J/kg °C)" },
          { symbol: "ΔT", meaning: "change in temperature, in °C" },
          { symbol: "L", meaning: "latent heat, in cal/g" },
        ],
      },
      authoredExample: {
        prompt: "How much heat is needed to warm 200 g of water from 20 °C to 70 °C? The specific heat of water is 1 cal/g °C.",
        steps: [
          "Rise in temperature: \\(\\Delta T = 70 - 20 = 50\\) °C.",
          "\\(Q = mc\\Delta T = 200 \\times 1 \\times 50 = 10000\\) cal.",
        ],
        answer: "10 000 cal",
      },
      selfCheckExample: {
        prompt: "500 g of a metal of specific heat 0.2 cal/g °C is heated through 30 °C. How much heat does it take in?",
        steps: ["\\(Q = 500 \\times 0.2 \\times 30 = 3000\\) cal."],
        answer: "3000 cal",
      },
      practiceSet: [
        { prompt: "Why is water used in a car radiator to cool the engine?", answer: "It has a high specific heat, so it takes in a lot of heat with only a small rise in temperature" },
        { prompt: "600 cal of heat raises the temperature of 50 g of a liquid by 20 °C. What is its specific heat?", answer: "\\(\\frac{600}{50 \\times 20} = 0.6\\) cal/g °C" },
        { prompt: "What is the specific heat of water in cal/g °C?", answer: "1 cal/g °C" },
        { prompt: "How much heat is needed to melt 10 g of ice at 0 °C? The latent heat of melting of ice is 80 cal/g.", answer: "\\(10 \\times 80 = 800\\) cal" },
      ],
      pyqExampleId: "a00b0082-c655-49d2-9975-edaf9f86687c",
      traps: [
        {
          title: "Thinking water is a coolant because it conducts heat well",
          body: "Water is a poor conductor. It is a good coolant because of its high specific heat: it can take in a lot of heat and stay fairly cool.",
        },
        {
          title: "Mixing grams and kilograms",
          body: "With c in cal/g °C, the mass must be in grams. 2 kg of water warmed by 5 °C takes \\(2000 \\times 1 \\times 5 = 10000\\) cal.",
        },
        {
          title: "Thinking the temperature rises while ice melts",
          body: "During melting or boiling the heat goes into changing the state, so the temperature stays the same. That heat is the latent heat.",
        },
      ],
    },
  ],
};
