import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CR_REDOX_NOTE: SubtopicNote = {
  subtopicName: "Oxidation and Reduction",
  title: "Oxidation and Reduction",
  oneLineDefinition:
    "What oxidation and reduction mean, which everyday changes are oxidation, the thermite reaction, and why the standard hydrogen electrode's zero is a convention.",
  whyItMatters:
    "Five CDS questions. Two ask which everyday change is NOT an oxidation; two are on the thermite reaction; one HARD 2016 question is on the standard hydrogen electrode.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcr-redox",
      name: "Oxidation and reduction in everyday changes",
      intuition:
        "Oxidation is gaining oxygen or losing electrons; reduction is the reverse. They happen together: whatever is oxidised hands its electrons to something that is reduced. Rusting, rancid butter, burning and wine turning sour are all oxidation. A precipitate forming, or gas fizzing out of soda, is not.",
      definition:
        "Definitions:\n" +
        "- **Oxidation**: gain of oxygen, loss of hydrogen, or **loss of electrons**.\n" +
        "- **Reduction**: loss of oxygen, gain of hydrogen, or **gain of electrons**.\n" +
        "- The **oxidising agent** is itself reduced; the **reducing agent** is itself oxidised.\n" +
        "- Everyday **oxidation**: rusting, **rancidity** (butter or oil going stale), combustion, wine turning sour (ethanol → acetic acid).\n" +
        "- **Not** oxidation: a precipitation such as BaCl₂ + Na₂SO₄ → BaSO₄ (no change of oxidation state), and **opening a soda bottle** (CO₂ simply leaves the liquid).",
      table: {
        columns: ["Change", "Oxidation?"],
        rows: [
          { cells: ["Rusting of iron", "Yes"] },
          { cells: ["Butter turning rancid", "Yes"] },
          { cells: ["Wine turning sour", "Yes"] },
          { cells: ["Combustion", "Yes"] },
          {
            cells: ["White BaSO₄ forming from BaCl₂ and Na₂SO₄", "No — double displacement"],
            pyqExampleId: "66d76a56-ed4a-4357-83ff-43a7b54917cd",
          },
          {
            cells: ["Opening a soda bottle", "No — physical release of CO₂"],
            pyqExampleId: "e00fe810-8711-41ee-89eb-6dfd854b6c65",
          },
        ],
      },
      pyqExampleId: "e00fe810-8711-41ee-89eb-6dfd854b6c65",
      selfCheckExample: {
        prompt: "In CuO + H₂ → Cu + H₂O, which substance is oxidised and which is reduced?",
        steps: [
          "Hydrogen gains oxygen to become water: it is oxidised.",
          "Copper oxide loses oxygen to become copper: it is reduced.",
        ],
        answer: "H₂ is oxidised; CuO is reduced.",
      },
      practiceSet: [
        { prompt: "Is rancidity an oxidation or a reduction?", answer: "Oxidation" },
        { prompt: "Is loss of electrons oxidation or reduction?", answer: "Oxidation" },
        { prompt: "The reducing agent in a reaction is itself oxidised or reduced?", answer: "Oxidised" },
      ],
      traps: [
        {
          title: "A precipitate is not an oxidation",
          body: "Forming BaSO₄ from barium chloride and sodium sulphate changes no oxidation state, so it is **not** redox. Rusting, rancidity and souring wine are.",
        },
        {
          title: "The reducing agent is oxidised",
          body: "The substance that **reduces** something else gives up electrons, so it is itself **oxidised**. Don't confuse the agent with what happens to it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-thermite",
      name: "The thermite reaction",
      intuition:
        "Aluminium is more reactive than iron, so it can pull oxygen away from iron oxide. The reaction gives out so much heat that the iron comes out molten, hot enough to weld railway tracks where they meet.",
      definition:
        "The reaction:\n" +
        "- **Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + heat**.\n" +
        "- **Aluminium is the reducing agent** (it is oxidised); iron oxide is reduced.\n" +
        "- The heat melts the **iron**, which is run into the gap to **weld rails** and machine parts.\n" +
        "- The products are **molten iron** and **aluminium oxide**, not molten aluminium.",
      table: {
        columns: ["Statement", "True or false"],
        rows: [
          {
            cells: ["Iron oxide reacts with aluminium to join railway tracks", "True"],
            pyqExampleId: "7a85892b-0a5e-4b85-9e3a-e23f60ff56da",
          },
          { cells: ["The heat given out is used for welding", "True"] },
          { cells: ["Aluminium acts as an oxidising agent", "False — it is the reducing agent"] },
          { cells: ["Molten iron and molten aluminium are formed", "False — molten iron and aluminium oxide"] },
        ],
      },
      pyqExampleId: "3aa98e21-5fe7-40ba-bc9c-c1efc81a6a36",
      practiceSet: [
        { prompt: "Which metal is used with iron oxide to weld railway tracks?", answer: "Aluminium" },
        { prompt: "In the thermite reaction, which substance is the reducing agent?", answer: "Aluminium" },
        { prompt: "Is the thermite reaction exothermic or endothermic?", answer: "Strongly exothermic" },
      ],
      traps: [
        {
          title: "Aluminium reduces, it does not oxidise",
          body: "In thermite, aluminium takes oxygen from iron oxide, so aluminium is the **reducing** agent. 'Aluminium acts as an oxidising agent' is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-electrode",
      name: "The standard hydrogen electrode",
      intuition:
        "You cannot measure the potential of one electrode alone, only the difference between two. So chemists agreed to call the hydrogen electrode zero and measure every other electrode against it. The zero is a convention, not a fact about the electrode.",
      definition:
        "The facts:\n" +
        "- The **standard hydrogen electrode (SHE)**: hydrogen gas at 1 bar over platinum, in 1 mol/L H⁺, at 298 K.\n" +
        "- Its potential is **assigned 0 V by convention**, at every temperature.\n" +
        "- Its **absolute** potential is **not** zero; no single electrode's absolute potential can be measured.",
      table: {
        columns: ["Statement about the SHE", "True or false"],
        rows: [
          { cells: ["Its standard potential is taken as 0 V by convention", "True"] },
          {
            cells: ["Its absolute electrode potential is not zero", "True"],
            pyqExampleId: "61d65f39-d779-4856-8bda-191186c5691e",
          },
          { cells: ["Its potential is zero only at 25 °C", "False"] },
        ],
      },
      pyqExampleId: "61d65f39-d779-4856-8bda-191186c5691e",
      practiceSet: [
        { prompt: "What potential is assigned to the standard hydrogen electrode?", answer: "0 V, by convention" },
        { prompt: "Can the absolute potential of a single electrode be measured?", answer: "No" },
      ],
      traps: [
        {
          title: "The hydrogen electrode's zero is agreed, not measured",
          body: "The SHE is **assigned** 0 V so that other electrodes can be compared with it. Its **absolute** potential is not zero, and the zero is not limited to 25 °C.",
        },
      ],
    },
  ],
};
