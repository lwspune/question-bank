import type { SubtopicNote } from "@/app/notes/_types";

export const GASES_NOTE: SubtopicNote = {
  subtopicName: "Industrial Gases, Manufacturing and Reactions",
  title: "Industrial Gases, Manufacturing and Reactions",
  oneLineDefinition:
    "The composition and use of the industrially important gas mixtures — water gas, syngas, producer gas — plus the Haber process for ammonia, the gases that cause acid rain, and the chemistry behind airbags.",
  whyItMatters:
    "The largest subtopic in the chapter — eight PYQs, mostly EASY/MODERATE. The bank asks the composition of a named gas mixture (water gas, syngas), the name of a manufacturing process (Haber–Bosch), or a one-fact reaction (sodium azide in airbags). " +
    "All recall: learn the gas-mixture table and the process names.",
  concepts: [
    // water gas / syngas / coal gas — composition (reference)
    {
      kind: "reference" as const,
      slug: "industrial-gas-mixtures",
      name: "Water gas, syngas and producer gas",
      intuition:
        "Industry uses several cheap gas mixtures made from coke, steam and air. The bank tests their composition — what two or three gases each mixture contains — so learn the pairs.",
      definition:
        "The named industrial gas mixtures and what they contain:\n" +
        "- **Water gas** = **CO + H₂** (made by passing steam over red-hot coke). Also called **syngas** (synthesis gas), the feedstock for many syntheses.\n" +
        "- **Producer gas** = **CO + N₂** (made by passing limited air over red-hot coke).\n" +
        "- **Coal gas** = **H₂ + CH₄ + CO** (made by the destructive distillation of coal).\n" +
        "- **Natural gas** is mostly **methane (CH₄)**.",
      table: {
        columns: ["Gas mixture", "Composition", "How it is made"],
        rows: [
          {
            cells: ["Water gas (syngas)", "CO + H₂", "Steam over red-hot coke"],
            noteAmber:
              "Water gas and syngas are the SAME mixture: carbon monoxide + hydrogen. Do not pick CO + H₂O.",
          },
          { cells: ["Producer gas", "CO + N₂", "Limited air over red-hot coke"] },
          { cells: ["Coal gas", "H₂ + CH₄ + CO", "Destructive distillation of coal"] },
          { cells: ["Natural gas", "Mainly CH₄ (methane)", "Underground deposits"] },
        ],
      },
      pyqExampleId: "0ad42894-0b43-4f32-ba9b-594210695740", // water gas = CO + H2
      selfCheckExample: {
        prompt: "A gas mixture is made by passing limited air over red-hot coke. Name it and give its composition.",
        steps: [
          "Limited air (not steam) over coke gives the producer-gas reaction.",
          "The nitrogen of the air passes through unreacted; the carbon partially oxidises to CO.",
        ],
        answer: "Producer gas — a mixture of carbon monoxide (CO) and nitrogen (N₂).",
      },
      practiceSet: [
        { prompt: "Water gas is a mixture of which two gases?", answer: "CO and H₂" },
        { prompt: "Syngas (synthesis gas) is a mixture of which two gases?", answer: "CO and H₂ — same as water gas" },
        { prompt: "Producer gas is a mixture of which two gases?", answer: "CO and N₂" },
        { prompt: "Natural gas is mainly which compound?", answer: "Methane (CH₄)" },
      ],
      traps: [
        {
          title: "Water gas is CO + H₂, not CO + H₂O",
          body:
            "Water gas is made USING steam (H₂O over coke), but the PRODUCT mixture is carbon monoxide + hydrogen (CO + H₂). The distractor 'CO + H₂O' describes the reactants, not the gas.",
        },
        {
          title: "Syngas = water gas",
          body:
            "'Syngas' and 'water gas' are two names for the same CO + H₂ mixture. If a question names one, the answer is the same composition as the other.",
        },
      ],
    },

    // Haber process — ammonia manufacture (reference)
    {
      kind: "reference" as const,
      slug: "manufacturing-processes",
      name: "Named manufacturing processes",
      intuition:
        "Each industrial chemical has a named process behind it. The bank asks 'which process makes ammonia / sulphuric acid?' — learn the process↔product pairs.",
      definition:
        "The high-frequency industrial processes:\n" +
        "- **Ammonia (NH₃)** → **Haber–Bosch process** (N₂ + 3H₂ → 2NH₃, with an iron catalyst).\n" +
        "- **Sulphuric acid (H₂SO₄)** → **Contact process**.\n" +
        "- **Nitric acid (HNO₃)** → **Ostwald process**.\n" +
        "- **Sodium carbonate (washing soda)** → **Solvay process**.",
      table: {
        columns: ["Product", "Process", "Key reaction / catalyst"],
        rows: [
          {
            cells: ["Ammonia (NH₃)", "Haber–Bosch", "N₂ + 3H₂ → 2NH₃, iron catalyst"],
            noteAmber: "Ammonia is manufactured by the Haber (Haber–Bosch) process.",
          },
          { cells: ["Sulphuric acid (H₂SO₄)", "Contact", "2SO₂ + O₂ → 2SO₃, V₂O₅ catalyst"] },
          { cells: ["Nitric acid (HNO₃)", "Ostwald", "Catalytic oxidation of ammonia"] },
          { cells: ["Washing soda (Na₂CO₃)", "Solvay", "Ammonia-soda process"] },
        ],
      },
      pyqExampleId: "15acbd5c-b819-4f9e-bde9-557d1b738c22", // Haber-Bosch for ammonia
      practiceSet: [
        { prompt: "Ammonia is manufactured by which process?", answer: "Haber–Bosch process" },
        { prompt: "Which catalyst is used in the Haber process?", answer: "Iron (Fe)" },
        { prompt: "Sulphuric acid is manufactured by which process?", answer: "Contact process" },
        { prompt: "Nitric acid is manufactured by which process?", answer: "Ostwald process" },
      ],
      traps: [
        {
          title: "Haber makes ammonia; Contact makes sulphuric acid",
          body:
            "Do not swap them. The Haber–Bosch process makes NH₃; the Contact process makes H₂SO₄; the Ostwald process makes HNO₃. The bank pairs the wrong product with a process as a distractor.",
        },
      ],
    },

    // reactions: acid rain, airbags, atmosphere abundance (reference)
    {
      kind: "reference" as const,
      slug: "applied-gas-reactions",
      name: "Applied gas facts — acid rain, airbags, atmosphere",
      intuition:
        "A scatter of one-fact reactions and atmospheric facts: which gas causes acid rain, what reaction inflates an airbag, what is the second-most-abundant atmospheric gas, and how paper quality is tested. Memorise each pair.",
      definition:
        "The applied one-fact recall:\n" +
        "- **Acid rain** is caused mainly by **sulphur dioxide (SO₂)** and **nitrogen oxides (NOₓ)**, which form sulphuric and nitric acids in rain.\n" +
        "- **Airbags** inflate by the rapid decomposition of **sodium azide**: 2NaN₃ → 2Na + 3N₂. The sudden release of **nitrogen gas** fills the bag.\n" +
        "- **Atmosphere abundance** (by volume): **nitrogen ≈ 78%** (first), **oxygen ≈ 21%** (second), argon ≈ 0.9%, then carbon dioxide.\n" +
        "- **Paper manufacture** is quality-tested by physical tests of mechanical/strength, surface, optical and permeability properties.",
      table: {
        columns: ["Phenomenon", "Chemistry / fact", "Answer the bank wants"],
        rows: [
          {
            cells: ["Acid rain", "SO₂ and NOₓ dissolve in rain", "Sulphur dioxide (SO₂)"],
            noteAmber: "The single biggest cause of acid rain in NDA options is sulphur dioxide.",
          },
          {
            cells: ["Airbag inflation", "2NaN₃ → 2Na + 3N₂", "Sodium azide → nitrogen gas"],
            noteAmber: "Airbags work by sodium azide decomposing into nitrogen gas.",
          },
          {
            cells: ["2nd most abundant atmospheric gas", "N₂ ≈ 78%, O₂ ≈ 21%", "Oxygen"],
            noteAmber: "Nitrogen is first (most abundant); OXYGEN is second.",
          },
          { cells: ["Paper physical testing", "Mechanical, surface, optical, permeability", "All four properties tested"] },
        ],
      },
      pyqExampleId: "1edf2985-33de-4f54-8e5f-c08b77492a6b", // airbags — sodium azide into nitrogen
      practiceSet: [
        { prompt: "Which gas is the main cause of acid rain?", answer: "Sulphur dioxide (SO₂)" },
        { prompt: "Airbags inflate using which chemical conversion?", answer: "Sodium azide → nitrogen gas (2NaN₃ → 2Na + 3N₂)" },
        { prompt: "Which gas is SECOND most abundant in Earth's atmosphere?", answer: "Oxygen (nitrogen is first)" },
        { prompt: "Which gas is MOST abundant in Earth's atmosphere?", answer: "Nitrogen (≈ 78%)" },
      ],
      traps: [
        {
          title: "Oxygen is second, nitrogen is first",
          body:
            "Nitrogen (≈ 78%) is the most abundant atmospheric gas; OXYGEN (≈ 21%) is second. A question asking for the second-most-abundant gas wants oxygen, not nitrogen.",
        },
        {
          title: "Airbags release nitrogen, not CO₂",
          body:
            "The gas that inflates an airbag is nitrogen (N₂), produced by sodium azide decomposing. It is not carbon dioxide.",
        },
      ],
    },
  ],
};
