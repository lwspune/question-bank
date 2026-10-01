import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MS_STATES_NOTE: SubtopicNote = {
  subtopicName: "States of Matter, Phase Changes and Diffusion",
  title: "States of Matter and Evaporation",
  oneLineDefinition:
    "What the particle picture of matter says, the five states including plasma and the Bose-Einstein condensate, the two liquid elements, and what does and does not change the rate of evaporation.",
  whyItMatters:
    "Six CDS questions, five of them from 2019 and 2020. Two are on evaporation and turn on one idea: evaporation happens only at the surface.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschms-particles",
      name: "Particles of matter and the five states",
      intuition:
        "All matter is made of tiny particles that keep moving and pull on each other. How strongly they pull decides whether a substance is a solid, a liquid or a gas. At the extremes there are two more states: plasma, hot enough to strip electrons, and the Bose-Einstein condensate, cold enough that atoms act as one.",
      definition:
        "The particle picture and the states:\n" +
        "- Particles of matter are **always moving**, so they **intermix on their own** (diffusion).\n" +
        "- Particles **attract each other**; the force is strongest in solids, weaker in liquids, weakest in gases.\n" +
        "- **Solid, liquid, gas**, then **plasma** (the fourth state, ionised gas) and the **Bose-Einstein condensate** (the **fifth state**, a gas of bosons cooled almost to absolute zero).\n" +
        "- Only two elements are **liquid at room temperature**: **bromine** and **mercury**. Gallium and caesium melt just above it.\n" +
        "- Hydrogen, nitrogen, oxygen and carbon dioxide are all **gases** at room temperature; CO₂ is triatomic, not diatomic.",
      table: {
        columns: ["State", "How particles behave", "Example"],
        rows: [
          { cells: ["Solid", "Fixed places, strong attraction", "Ice, iron"] },
          { cells: ["Liquid", "Move past each other, moderate attraction", "Water; bromine and mercury among elements"] },
          { cells: ["Gas", "Move freely, weak attraction", "Hydrogen, nitrogen, oxygen, carbon dioxide"] },
          { cells: ["Plasma (4th state)", "Ionised: free electrons and ions", "Lightning, the Sun"] },
          {
            cells: ["Bose-Einstein condensate (5th state)", "Atoms near absolute zero share one quantum state", "Made in laboratories"],
            pyqExampleId: "ab66c616-772e-43ad-abf3-9eb5044bebe1",
          },
        ],
      },
      pyqExampleId: "531fb3a1-7ca6-4a51-8977-dacdcbc4e82f",
      selfCheckExample: {
        prompt: "A drop of ink spreads through a glass of still water without stirring. Which two properties of particles does this show?",
        steps: [
          "The ink spreads with no stirring, so its particles are moving on their own.",
          "They spread into the spaces between water particles, so the particles intermix: diffusion.",
        ],
        answer: "Particles are in constant motion, and particles of different substances intermix on their own.",
      },
      practiceSet: [
        { prompt: "Is gallium a solid or a liquid at room temperature?", answer: "A solid (it melts just above room temperature)" },
        { prompt: "What is called the fifth state of matter?", answer: "Bose-Einstein condensate" },
        { prompt: "Is carbon dioxide diatomic?", answer: "No — it is triatomic (CO₂)" },
        { prompt: "What is the spreading of one substance through another on its own called?", answer: "Diffusion" },
      ],
      traps: [
        {
          title: "Fluorine is a gas, rubidium a solid",
          body: "The liquid elements at room temperature are **bromine and mercury**. Fluorine is a gas, and thallium and rubidium are solids (rubidium melts at about 39 °C).",
        },
        {
          title: "Plasma is the fourth state, BEC the fifth",
          body: "The Bose-Einstein condensate is the **fifth** state of matter. Plasma is the fourth, and neither is a kind of solid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschms-evaporation",
      name: "What changes the rate of evaporation",
      intuition:
        "Evaporation happens only at the surface, where the fastest particles escape into the air. So anything that gives particles more surface, more energy or more room in the air speeds it up. The total amount of liquid does not matter.",
      definition:
        "The factors:\n" +
        "- **Surface area** up → faster.\n" +
        "- **Temperature** up → faster.\n" +
        "- **Wind speed** up → faster (it carries the vapour away).\n" +
        "- **Humidity** up → **slower** (the air already holds vapour).\n" +
        "- The **mass** of liquid does **not** affect the rate; it only decides how long evaporation lasts.\n" +
        "- Evaporation **cools** the liquid left behind.",
      table: {
        columns: ["Factor", "Effect on rate"],
        rows: [
          {
            cells: ["Larger surface area", "Increases"],
            pyqExampleId: "d289ef18-5e48-4749-ad9b-6d58402d3cb5",
          },
          { cells: ["Higher temperature", "Increases"] },
          { cells: ["Higher wind speed", "Increases"] },
          { cells: ["Higher humidity", "Decreases"] },
          {
            cells: ["Mass of the liquid", "No effect"],
            pyqExampleId: "11539cdb-56b6-4915-ad8b-593c43d4dd19",
          },
        ],
      },
      pyqExampleId: "11539cdb-56b6-4915-ad8b-593c43d4dd19",
      practiceSet: [
        { prompt: "Do clothes dry faster on a humid day or a dry day?", answer: "A dry day" },
        { prompt: "Does spreading water in a wide tray speed up evaporation?", answer: "Yes — more surface area" },
        { prompt: "Does evaporation warm or cool the remaining liquid?", answer: "It cools it" },
      ],
      traps: [
        {
          title: "More liquid does not mean faster evaporation",
          body: "Evaporation is a **surface** process. The **mass** of liquid does not change its rate; surface area, temperature, wind and humidity do.",
        },
        {
          title: "Humidity slows evaporation",
          body: "Humid air already holds a lot of water vapour, so less can escape into it. An **increase** in humidity **decreases** the rate of evaporation.",
        },
      ],
    },
  ],
};
