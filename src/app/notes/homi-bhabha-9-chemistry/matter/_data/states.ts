import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MN_STATES_NOTE: SubtopicNote = {
  subtopicName: "States of Matter",
  title: "States of Matter",
  oneLineDefinition:
    "Matter exists as solid, liquid and gas, and also as plasma and the Bose-Einstein condensate; it changes from one state to another at fixed temperatures, and some solids, such as dry ice, turn straight into gas.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE. Two are about the properties of the states: how compressible oxygen is, and a match of liquid, gas, plasma and Bose-Einstein condensate. Three are about changes of state: the freezing point of mercury, and what happens to solid carbon dioxide at 1 atmosphere, asked in December 2021 and again in 2023-24.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mnst-states",
      name: "Solids, liquids, gases, plasma and the Bose-Einstein condensate",
      intuition:
        "In a solid the particles are packed tight and held firmly, so it keeps its shape. In a liquid they are close but free to slide, so it keeps its volume but flows. In a gas they are far apart and move freely, so a gas fills any container and can be squeezed a lot. Heat a gas enough and its particles become super energetic: plasma. Cool a very thin gas almost to the lowest possible temperature and you get the fifth state, the Bose-Einstein condensate.",
      definition:
        "- **Solid**: definite shape and definite volume; hardly compressible.\n" +
        "- **Liquid**: **definite volume** but no definite shape; takes the shape of its container; very little compressible.\n" +
        "- **Gas**: no definite shape or volume; **highly compressible**, because its particles have large spaces between them. That is why gases such as oxygen and LPG can be filled into cylinders.\n" +
        "- **Plasma**: the fourth state, made of **super energetic**, super excited particles (an ionised gas). It is found in the Sun and stars, in lightning and in neon signs.\n" +
        "- **Bose-Einstein condensate (BEC)**: the fifth state, formed by cooling a gas of extremely low density to a super low temperature. It has **super low density**. It was predicted by **Satyendra Nath Bose** and **Albert Einstein**.",
      table: {
        columns: ["State", "Particles", "Key property"],
        rows: [
          { cells: ["Solid", "Packed tightly and held firmly", "Definite shape and volume; hardly compressible"] },
          { cells: ["Liquid", "Close together but free to slide", "Definite volume, no definite shape"] },
          { cells: ["Gas", "Far apart and moving freely", "No definite shape or volume; highly compressible"] },
          { cells: ["Plasma", "Super energetic and ionised", "Found in the Sun, stars, lightning and neon signs"] },
          { cells: ["Bose-Einstein condensate", "A very thin gas cooled to a super low temperature", "Super low density; predicted by Bose and Einstein"] },
        ],
        caption: "Plasma is the super energetic state; the Bose-Einstein condensate is the super cold, super low density one.",
      },
      selfCheckExample: {
        prompt: "A large volume of natural gas can be filled into a small cylinder, but the same cannot be done with water. Why?",
        steps: ["Gas particles have large spaces between them, so a gas can be squeezed.", "Liquid particles are close together, so a liquid is hardly compressible."],
        answer: "A gas is highly compressible and a liquid is not.",
      },
      practiceSet: [
        { prompt: "Which state of matter has a definite volume but no definite shape?", answer: "Liquid" },
        { prompt: "In which state of matter is the material of the Sun and the stars?", answer: "Plasma" },
        { prompt: "After which Indian scientist is the fifth state of matter partly named?", answer: "Satyendra Nath Bose (the Bose-Einstein condensate)" },
        { prompt: "Why does a gas fill the whole of any container it is put in?", answer: "Its particles are far apart and move freely in all directions" },
      ],
      pyqExampleId: "574c441d-73fd-4ed2-b49c-8bcd3c843214",
      traps: [
        {
          title: "Swapping plasma and the Bose-Einstein condensate",
          body: "Plasma is super energetic and hot, as in the Sun. The Bose-Einstein condensate is super cold with a super low density.",
        },
        {
          title: "Giving a liquid a definite shape",
          body: "A liquid has a definite volume but takes the shape of its container. Only a solid has a definite shape.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mnst-changes",
      name: "Changes of state and sublimation",
      intuition:
        "Heating gives particles more energy, so a solid melts and a liquid boils; cooling does the reverse. Each pure substance melts and boils at its own fixed temperature, which is how it can be identified. A few solids skip the liquid stage altogether and turn straight into gas: that is sublimation.",
      definition:
        "- **Melting point**: the temperature at which a solid becomes a liquid. A liquid **freezes** at the same temperature.\n" +
        "- **Boiling point**: the temperature at which a liquid boils into gas at 1 atmosphere.\n" +
        "- Water melts at **0 °C** and boils at **100 °C**. **Mercury**, the only metal that is liquid at room temperature, freezes at about **\\(-39\\) °C** and boils at **357 °C**.\n" +
        "- **Sublimation**: a solid changing **straight into a gas** without melting. Camphor, naphthalene, iodine, ammonium chloride and **dry ice** (solid carbon dioxide) sublime.\n" +
        "- Carbon dioxide cannot be a liquid at 1 atmosphere. So when the pressure on solid carbon dioxide is lowered to 1 atmosphere, it turns **directly into gas**.",
      table: {
        columns: ["Change", "From", "To", "Example"],
        rows: [
          { cells: ["Melting", "Solid", "Liquid", "Ice at 0 °C"] },
          { cells: ["Freezing", "Liquid", "Solid", "Mercury at about \\(-39\\) °C"] },
          { cells: ["Boiling (vaporisation)", "Liquid", "Gas", "Water at 100 °C"] },
          { cells: ["Condensation", "Gas", "Liquid", "Steam on a cold plate"] },
          {
            cells: ["Sublimation", "Solid", "Gas, directly", "Camphor, naphthalene, iodine, dry ice"],
            noteAmber: "No liquid stage in between.",
          },
        ],
        caption: "The freezing point and the melting point of a substance are the same temperature.",
      },
      selfCheckExample: {
        prompt: "Naphthalene balls kept in a cupboard become smaller over weeks without leaving any liquid. What change is taking place?",
        steps: ["The solid disappears without first becoming a liquid.", "A solid turning straight into a gas is sublimation."],
        answer: "Sublimation",
      },
      practiceSet: [
        { prompt: "Which metal is a liquid at room temperature?", answer: "Mercury" },
        { prompt: "What is the boiling point of mercury?", answer: "357 °C" },
        { prompt: "What is solid carbon dioxide commonly called?", answer: "Dry ice" },
        { prompt: "Name the change in which a gas becomes a liquid on cooling.", answer: "Condensation" },
      ],
      pyqExampleId: "5a4050b7-179b-456f-9d0f-263c5e0bb9cc",
      traps: [
        {
          title: "Mixing up mercury's two temperatures",
          body: "Mercury freezes at about \\(-39\\) °C and boils at 357 °C. A choice of \\(-357\\) °C is a trap built from the boiling point.",
        },
        {
          title: "Thinking dry ice melts into a liquid",
          body: "At 1 atmosphere solid carbon dioxide cannot become a liquid. It sublimes straight into gas, which is why it is called dry ice.",
        },
      ],
    },
  ],
};
