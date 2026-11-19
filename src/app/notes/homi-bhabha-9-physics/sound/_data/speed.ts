import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SO_SPEED_NOTE: SubtopicNote = {
  subtopicName: "Speed of Sound",
  title: "Speed of Sound",
  oneLineDefinition:
    "Sound is fastest in solids, slower in liquids, slower still in gases and cannot travel in a vacuum; in a gas it is faster when the gas is lighter or warmer, and pressure alone does not change it.",
  whyItMatters:
    "The busiest page of the chapter: nine questions, two EASY, four MODERATE and three HARD. Four ask you to put media in order of the speed of sound; the other five are about gases: lighter gases are faster, the speed rises with temperature, and at a fixed temperature the pressure makes no difference. Learn the table and the square-root rule and all nine fall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sosp-media",
      name: "Speed of sound in solids, liquids, gases and a vacuum",
      intuition:
        "Sound is passed from particle to particle. In a solid the particles are packed close and held tightly, so a push is handed on fastest. In a liquid they are a little looser, and in a gas they are far apart, so the push is handed on slowest. In a vacuum there is nothing to pass it on at all.",
      definition:
        "- Order of speed: **solids > liquids > gases**, and **zero in a vacuum**.\n" +
        "- The kind of **medium** matters far more than anything else.\n" +
        "- Among metals the speed differs too: at 25 °C it is fastest in aluminium, then nickel, steel and iron, then brass, and slower in glass.\n" +
        "- A light gas such as hydrogen carries sound far faster than air, but still slower than water.",
      table: {
        columns: ["State", "Medium", "Speed of sound at 25 °C"],
        rows: [
          { cells: ["Solid", "Aluminium", "6420 m/s"] },
          { cells: ["Solid", "Nickel", "6040 m/s"] },
          { cells: ["Solid", "Steel", "5960 m/s"] },
          { cells: ["Solid", "Brass", "4700 m/s"] },
          { cells: ["Solid", "Glass (flint)", "3980 m/s"] },
          { cells: ["Liquid", "Sea water", "1531 m/s"] },
          { cells: ["Liquid", "Distilled (pure) water", "1498 m/s"] },
          { cells: ["Gas", "Hydrogen", "1284 m/s"] },
          { cells: ["Gas", "Helium", "965 m/s"] },
          { cells: ["Gas", "Air", "346 m/s"] },
          { cells: ["Gas", "Oxygen", "316 m/s"] },
          { cells: ["Gas", "Sulphur dioxide", "213 m/s"] },
          { cells: ["None", "Vacuum", "Sound cannot travel"], noteAmber: "Always first in an ascending order." },
        ],
        caption: "The standard school table of values at 25 °C. Other tables give slightly different numbers for some solids.",
      },
      selfCheckExample: {
        prompt: "Arrange in increasing order of the speed of sound in them: steel, air, sea water.",
        steps: ["A gas is slowest, a liquid comes next, a solid is fastest."],
        answer: "Air, sea water, steel",
      },
      practiceSet: [
        { prompt: "In which of these is sound fastest: water, wood, air?", answer: "Wood, because it is a solid" },
        { prompt: "Why do we not hear the explosions on the Sun?", answer: "The space between the Sun and the Earth is a vacuum, and sound cannot travel through a vacuum" },
        { prompt: "Arrange in increasing order of the speed of sound: helium, oxygen, distilled water.", answer: "Oxygen, helium, distilled water" },
        { prompt: "Someone taps a long iron railing at the far end. Why do you hear the tap through the railing before you hear it through the air?", answer: "Sound travels much faster in a solid (iron) than in air" },
      ],
      pyqExampleId: "21b60e4a-cfe0-4c37-85cb-e80d4ab3b3d7",
      traps: [
        {
          title: "Putting a gas after a liquid",
          body: "Every liquid in the table carries sound faster than every gas: sea water and pure water are about 1500 m/s, air only about 346 m/s.",
        },
        {
          title: "Forgetting the vacuum",
          body: "When a vacuum is one of the choices it is always slowest: sound cannot travel through it at all.",
        },
        {
          title: "Thinking all metals are equally fast",
          body: "Metals differ: aluminium (6420 m/s) is faster than brass (4700 m/s), and glass is slower than both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9sosp-gases",
      name: "What sets the speed of sound in a gas",
      intuition:
        "In a light gas the molecules are easy to push, so they hand the vibration on quickly: sound is about four times as fast in hydrogen as in oxygen. Warming a gas makes its molecules move faster, so sound speeds up too. Squeezing a gas at the same temperature makes it denser and stiffer by the same amount, so the two effects cancel and the speed stays the same.",
      definition:
        "- At the same temperature, the speed of sound in a gas is **inversely proportional to the square root of its density** (or of its molecular mass): a lighter gas is faster.\n" +
        "- The speed is **directly proportional to the square root of the absolute temperature**: sound is faster on a hot day. In air it rises by about **0.6 m/s for each 1 °C**.\n" +
        "- At a fixed temperature, changing the **pressure** of the gas does **not** change the speed of sound.\n" +
        "- Humid air carries sound slightly faster than dry air.\n" +
        "- For two gases under the same conditions: \\(\\frac{v_1}{v_2} = \\sqrt{\\frac{M_2}{M_1}}\\).",
      formula: {
        label: "Speed of sound in a gas",
        latex: "v \\propto \\sqrt{\\frac{T}{M}} \\qquad v \\propto \\frac{1}{\\sqrt{\\rho}} \\qquad \\frac{v_1}{v_2} = \\sqrt{\\frac{M_2}{M_1}}",
        symbols: [
          { symbol: "v", meaning: "speed of sound in the gas" },
          { symbol: "T", meaning: "absolute temperature of the gas, in kelvin" },
          { symbol: "M", meaning: "molecular mass of the gas" },
          { symbol: "ρ", meaning: "density of the gas" },
        ],
      },
      authoredExample: {
        prompt: "Compare the speed of sound in helium (molecular mass 4) with that in methane (molecular mass 16) under the same conditions.",
        steps: [
          "The lighter gas is faster: \\(\\frac{v_{He}}{v_{CH_4}} = \\sqrt{\\frac{M_{CH_4}}{M_{He}}} = \\sqrt{\\frac{16}{4}} = \\sqrt{4} = 2\\).",
        ],
        answer: "Sound is twice as fast in helium: the ratio is 2 : 1.",
      },
      selfCheckExample: {
        prompt: "At the same temperature, which carries sound faster, oxygen or helium?",
        steps: ["Helium is much lighter than oxygen, and a lighter gas carries sound faster."],
        answer: "Helium",
      },
      practiceSet: [
        { prompt: "The pressure of a gas is doubled while its temperature is kept the same. What happens to the speed of sound in it?", answer: "It stays the same" },
        { prompt: "Is sound faster in air on a hot afternoon or on a cold morning?", answer: "On a hot afternoon, because the speed rises with temperature" },
        { prompt: "Find the ratio of the speed of sound in hydrogen (molecular mass 2) to that in water vapour (molecular mass 18) under the same conditions.", answer: "\\(\\sqrt{\\frac{18}{2}} = 3\\), so 3 : 1" },
        { prompt: "How does the speed of sound change with the density of a gas at a fixed temperature?", answer: "It is inversely proportional to the square root of the density" },
      ],
      pyqExampleId: "3903c3ef-1b57-475c-9b42-202742cd009d",
      traps: [
        {
          title: "Making speed depend on pressure",
          body: "At a fixed temperature, pressure and density rise together, so the speed of sound in a gas does not change. Only temperature and the kind of gas matter.",
        },
        {
          title: "Saying speed falls as temperature rises",
          body: "The speed is directly proportional to the square root of the absolute temperature. Warmer gas, faster sound.",
        },
        {
          title: "Forgetting the square root",
          body: "Speed goes as 1 divided by the square root of density, not as 1 divided by density. Hydrogen is 16 times lighter than oxygen, so sound is \\(\\sqrt{16} = 4\\) times faster in it, not 16 times.",
        },
        {
          title: "Thinking a heavier gas is faster",
          body: "It is the other way round: sulphur dioxide (heavy) is slowest of the gases in the table and hydrogen (lightest) is fastest.",
        },
      ],
    },
  ],
};
