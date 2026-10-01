import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MS_COLLOIDS_NOTE: SubtopicNote = {
  subtopicName: "Colloids and Suspensions",
  title: "Colloids and Suspensions",
  oneLineDefinition:
    "Solutions, colloids and suspensions by particle size, the kinds of colloid named by phase and medium, and the Tyndall effect.",
  whyItMatters:
    "Three CDS questions: what an emulsion is made of, why soap solution looks cloudy, and which colloid has a liquid medium. The last one, from 2024 (II), has two correct options as printed.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschms-colloid-types",
      name: "Kinds of colloid",
      intuition:
        "A colloid has tiny particles of one substance (the dispersed phase) spread through another (the dispersion medium). Name the two phases and you have named the colloid: a liquid in a liquid is an emulsion, a gas in a liquid is a foam.",
      definition:
        "Sizes first:\n" +
        "- **True solution**: particles below 1 nm; clear; never settle.\n" +
        "- **Colloid**: 1–100 nm (or 1–1000 nm); look uniform; do not settle; **scatter light**.\n" +
        "- **Suspension**: larger particles that settle.\n" +
        "Then the kinds, by dispersed phase in dispersion medium:\n" +
        "- **Emulsion**: liquid in liquid (milk, cream) — **two liquids**.\n" +
        "- **Foam**: gas in liquid (shaving cream, soap lather).\n" +
        "- **Gel**: liquid in solid (jelly, cheese).\n" +
        "- **Aerosol**: liquid in gas (mist, fog) or solid in gas (smoke).\n" +
        "- **Sol**: solid in liquid (paint, mud).",
      table: {
        columns: ["Kind", "Dispersed phase", "Dispersion medium", "Example"],
        rows: [
          {
            cells: ["Emulsion", "Liquid", "Liquid", "Milk"],
            pyqExampleId: "c0dd2880-fc12-4c66-b8c7-7d8b06df1504",
          },
          {
            cells: ["Foam", "Gas", "Liquid", "Shaving cream, soap lather"],
            noteAmber: "CDS 2024 (II) asked which has a liquid medium: foam and shaving cream both do, so the question has two right options.",
            pyqExampleId: "73e1c25d-98bc-4b39-9c80-9cbba557aade",
          },
          { cells: ["Gel", "Liquid", "Solid", "Jelly, cheese"] },
          { cells: ["Aerosol", "Liquid or solid", "Gas", "Mist, fog, smoke"] },
          { cells: ["Sol", "Solid", "Liquid", "Paint"] },
        ],
      },
      pyqExampleId: "c0dd2880-fc12-4c66-b8c7-7d8b06df1504",
      selfCheckExample: {
        prompt: "Smoke is tiny solid particles of carbon spread through air. Name the dispersed phase, the medium and the kind of colloid.",
        steps: [
          "The particles are solid: the dispersed phase is solid.",
          "They are spread through air: the medium is a gas.",
          "Solid in gas is a solid aerosol.",
        ],
        answer: "Solid in gas: an aerosol.",
      },
      practiceSet: [
        { prompt: "What is the dispersed phase in a foam?", answer: "A gas" },
        { prompt: "What is the dispersion medium in fog?", answer: "Gas (air)" },
        { prompt: "What kind of colloid is jelly?", answer: "A gel (liquid in solid)" },
      ],
      traps: [
        {
          title: "Mist is liquid in gas, not gas in liquid",
          body: "In **mist** the liquid droplets are dispersed in **air**, so the medium is a gas. In **foam** the gas is dispersed in a **liquid**.",
        },
        {
          title: "An emulsion is two liquids",
          body: "An **emulsion** is one liquid dispersed in another (milk, cream). A solid in a liquid is a **sol**; a gas in a liquid is a **foam**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschms-tyndall",
      name: "The Tyndall effect",
      intuition:
        "Colloid particles are just big enough to scatter light. Shine a beam through a colloid and you see its path; through a true solution you do not. That scattering is why soap solution and milk look cloudy.",
      definition:
        "The effect:\n" +
        "- **Tyndall effect**: scattering of light by colloid particles, making the beam visible.\n" +
        "- Seen in soap solution (soap **micelles**), milk, fog, and sunlight through a dusty room or a forest canopy.\n" +
        "- A true solution (salt in water) shows **no** Tyndall effect.",
      table: {
        columns: ["System", "Tyndall effect?"],
        rows: [
          {
            cells: ["Soap solution (micelles)", "Yes — micelles scatter light, so it looks cloudy"],
            pyqExampleId: "4adcf48d-7ae2-4799-8af2-5d4a3ba40a0e",
          },
          { cells: ["Milk", "Yes"] },
          { cells: ["Salt solution", "No — a true solution"] },
        ],
      },
      pyqExampleId: "4adcf48d-7ae2-4799-8af2-5d4a3ba40a0e",
      practiceSet: [
        { prompt: "What is the scattering of light by colloid particles called?", answer: "The Tyndall effect" },
        { prompt: "Does a copper sulphate solution show the Tyndall effect?", answer: "No — it is a true solution" },
      ],
      traps: [
        {
          title: "Cloudiness is scattering, not refraction",
          body: "Soap solution looks cloudy because its micelles **scatter** light (the Tyndall effect). Refraction, diffraction and polarisation are distractors.",
        },
      ],
    },
  ],
};
