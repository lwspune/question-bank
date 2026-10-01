import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_IC_GASES_NOTE: SubtopicNote = {
  subtopicName: "Industrial Gases and Manufacturing",
  title: "Industrial Gases and Paper-Making",
  oneLineDefinition:
    "What liquid nitrogen, argon, helium, oxygen and hydrogen sulphide are used for or known by, and the two chemicals behind paper: caustic soda to pulp, chlorine to bleach.",
  whyItMatters:
    "Six CDS questions. Liquid nitrogen for storing blood and tissue came twice (2020 and 2022). The 2024 (II) paper-bleaching question is defective as printed: none of its options is a bleaching agent.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschic-gas-uses",
      name: "Uses of industrial gases",
      intuition:
        "Each gas is chosen for one property. Liquid nitrogen is very cold, cheap and unreactive, so it preserves living tissue. Argon is unreactive and heavy, so it protects a bulb filament. Hydrogen sulphide is known by its smell.",
      definition:
        "The uses:\n" +
        "- **Liquid nitrogen** (boils at about −196 °C): **cryopreservation** of blood, semen, embryos and organs. Solid CO₂ only reaches about −78 °C.\n" +
        "- **Nitrogen gas** replaces air in **food packets** to stop the food oxidising.\n" +
        "- **Argon** (often with nitrogen) fills **electric bulbs**; **helium is not used** in bulbs. Helium fills balloons and is used in divers' breathing mixtures.\n" +
        "- **Liquid oxygen** is the oxidiser that burns rocket fuel.\n" +
        "- **Hydrogen** has three isotopes (protium, deuterium, tritium).\n" +
        "- **Hydrogen sulphide** smells of **rotten eggs**; ammonia is pungent; sulphur dioxide is suffocating.",
      table: {
        columns: ["Gas", "Use or property"],
        rows: [
          {
            cells: ["Liquid nitrogen", "Storing blood, semen and organs at about −196 °C"],
            noteAmber: "Asked in CDS 2020 (II) and 2022 (II).",
            pyqExampleId: "0d86d2aa-197d-4e9d-9b7a-23c13b685385",
          },
          { cells: ["Nitrogen gas", "Fills food packets to prevent oxidation"] },
          {
            cells: ["Argon", "Fills electric bulbs"],
            noteAmber: "CDS 2024 (II): 'helium is commonly used in electric bulbs' was the incorrect statement.",
            pyqExampleId: "a807ee51-5a27-4a87-ac8f-1f744aae5c5d",
          },
          { cells: ["Liquid oxygen", "Burns fuel in rocket engines"] },
          {
            cells: ["Hydrogen sulphide", "Smell of rotten eggs"],
            pyqExampleId: "e794a9d1-704d-4260-8b19-5ec7e9b2a5e0",
          },
        ],
      },
      pyqExampleId: "2dc57815-6e4a-4065-b773-6765777e10c0",
      practiceSet: [
        { prompt: "Which liquefied gas is used to store blood and organs?", answer: "Liquid nitrogen" },
        { prompt: "Which gas fills ordinary electric bulbs?", answer: "Argon (often with nitrogen)" },
        { prompt: "Which gas smells like rotten eggs?", answer: "Hydrogen sulphide" },
        { prompt: "Why are chip packets filled with nitrogen?", answer: "To keep out oxygen and stop the food oxidising" },
      ],
      traps: [
        {
          title: "Bulbs use argon, not helium",
          body: "Electric bulbs are filled with **argon** (with some nitrogen) because it is inert and heavy enough to slow the filament wearing away. Helium is for balloons and diving gas.",
        },
        {
          title: "Dry ice is not cold enough for tissue",
          body: "Solid CO₂ reaches only about −78 °C. Biological tissue is stored in **liquid nitrogen** at about −196 °C.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschic-paper",
      name: "Chemicals in paper-making",
      intuition:
        "Paper is cellulose fibre. To get it, wood or bamboo is cooked with an alkali that dissolves the gums and lignin holding the fibres together. The brown pulp is then bleached white with chlorine compounds.",
      definition:
        "The two steps:\n" +
        "- **Pulping (degumming)**: raw material is digested with **caustic soda (NaOH)**, which dissolves lignin and gums and frees the cellulose.\n" +
        "- **Bleaching**: **chlorine** and its compounds (chlorine dioxide, bleaching powder) oxidise the coloured matter; hydrogen peroxide is also used.\n" +
        "- A chloride ion, chlorobenzene or hydrochloric acid does **not** bleach.",
      table: {
        columns: ["Step", "Chemical"],
        rows: [
          {
            cells: ["Degumming / pulping", "Caustic soda (NaOH)"],
            pyqExampleId: "5d1c6a12-b120-44ef-aef8-13e0f704fd3e",
          },
          {
            cells: ["Bleaching", "Chlorine, chlorine dioxide, bleaching powder"],
            noteAmber: "CDS 2024 (II) printed 'chloride', which cannot bleach; the question is defective as printed.",
            pyqExampleId: "ea9a2506-3dd6-4d19-a686-2d241453d57c",
          },
        ],
      },
      pyqExampleId: "5d1c6a12-b120-44ef-aef8-13e0f704fd3e",
      practiceSet: [
        { prompt: "Which alkali is used to pulp wood for paper?", answer: "Caustic soda (sodium hydroxide)" },
        { prompt: "Which element's compounds are used to bleach paper pulp?", answer: "Chlorine" },
      ],
      traps: [
        {
          title: "Pulping uses an alkali, not an acid",
          body: "Paper pulp is digested with **caustic soda**. Sulphuric and nitric acids are distractors.",
        },
        {
          title: "Chlorine bleaches; chloride does not",
          body: "Bleaching needs an oxidiser: **chlorine** or chlorine dioxide. The chloride ion (as in common salt) is not an oxidiser and does not bleach.",
        },
      ],
    },
  ],
};
