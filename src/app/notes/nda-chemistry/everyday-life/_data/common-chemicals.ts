import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_CHEMICALS_NOTE: SubtopicNote = {
  subtopicName: "Common Chemicals and Their Uses",
  title: "Common Chemicals and Their Uses",
  oneLineDefinition:
    "The household and industrial substances the NDA names by their use — washing soda, plaster of Paris, potassium permanganate, silver salts in photography, clean fuels, biogas, and the gas divers breathe.",
  whyItMatters:
    "The larger of the chapter's two subtopics — about seven PYQs, all EASY/MODERATE, almost all 'which chemical is used as / for X'. " +
    "A recurring shape is 'which statement is NOT correct', where the falsified statement is usually a wrong chemical formula (the plaster-of-Paris formula trap). " +
    "All recall: learn the substance↔use↔formula table cold.",
  concepts: [
    // Household chemicals: washing soda, PoP, KMnO4, AgBr
    {
      kind: "reference" as const,
      slug: "household-chemicals",
      name: "Household chemicals by use",
      intuition:
        "A cluster of common salts named by their everyday job — what cleans, what sets hard, what purifies water, what darkens in light. The bank asks the substance for a use, or falsifies one chemical formula in a list. Learn the name, the use, and the exact formula.",
      definition:
        "The high-frequency household chemicals:\n" +
        "- **Washing soda** = sodium carbonate, **Na₂CO₃·10H₂O** (used for cleaning and softening hard water).\n" +
        "- **Baking soda** = sodium bicarbonate, **NaHCO₃** (do not confuse with washing soda).\n" +
        "- **Plaster of Paris** = calcium sulphate hemihydrate, **CaSO₄·½H₂O** (sets hard with water; used in casts and moulds).\n" +
        "- **Potassium permanganate**, **KMnO₄**, is a strong **oxidizing agent** — that is why it purifies (disinfects) drinking water.\n" +
        "- **Silver bromide**, **AgBr** (and silver chloride), darkens on exposure to light — the basis of black-and-white photography.",
      table: {
        columns: ["Substance", "Formula", "Common use"],
        rows: [
          {
            cells: ["Washing soda", "Na₂CO₃·10H₂O", "Cleaning; softening hard water"],
            pyqExampleId: "72ff1c6c-b01c-4bcb-aaab-3f628ebf86c8",
            noteAmber: "Washing soda = sodium carbonate (Na₂CO₃). Baking soda is sodium bicarbonate (NaHCO₃) — different substance.",
          },
          {
            cells: ["Plaster of Paris", "CaSO₄·½H₂O", "Casts, moulds, blackboard chalk"],
            pyqExampleId: "1796b42b-0204-46cb-b928-5cb403e6f9fc",
            noteAmber: "Plaster of Paris is CaSO₄·½H₂O (hemihydrate) — NOT CaSO₄·2H₂O. CaSO₄·2H₂O is gypsum. This wrong formula is the bank's favourite 'NOT correct' statement.",
          },
          {
            cells: ["Potassium permanganate", "KMnO₄", "Purifies drinking water (oxidizing agent)"],
            pyqExampleId: "8be3ba25-51e6-476c-a029-c49eb21d5743",
            noteAmber: "KMnO₄ purifies water because it is an oxidizing agent — it oxidises (destroys) organic impurities and microbes.",
          },
          {
            cells: ["Silver bromide", "AgBr", "Black-and-white photography (light-sensitive)"],
            pyqExampleId: "105de25a-63c3-4926-b5b2-ec07e5afad05",
            noteAmber: "Silver halides (AgBr, AgCl) darken in light — used in photographic film. Not a silver oxide or nitrate here.",
          },
        ],
      },
      pyqExampleId: "1796b42b-0204-46cb-b928-5cb403e6f9fc",
      practiceSet: [
        { prompt: "Which chemical is used as washing soda?", answer: "Sodium carbonate (Na₂CO₃·10H₂O)" },
        { prompt: "What is the molecular formula of plaster of Paris?", answer: "CaSO₄·½H₂O (calcium sulphate hemihydrate)" },
        { prompt: "Why is potassium permanganate used to purify drinking water?", answer: "It is an oxidizing agent" },
        { prompt: "Which compound is used in black-and-white photography?", answer: "Silver bromide (AgBr)" },
        { prompt: "Which silver salt darkens on exposure to light?", answer: "Silver bromide / silver chloride (a silver halide)" },
      ],
      traps: [
        {
          title: "Plaster of Paris is CaSO₄·½H₂O, not CaSO₄·2H₂O",
          body:
            "Plaster of Paris is the hemihydrate, CaSO₄·½H₂O. The dihydrate CaSO₄·2H₂O is gypsum (the raw material). A statement giving plaster of Paris as CaSO₄·2H₂O is the FALSE one in a 'which is NOT correct' question.",
        },
        {
          title: "Washing soda ≠ baking soda",
          body:
            "Washing soda is sodium carbonate, Na₂CO₃·10H₂O. Baking soda is sodium bicarbonate, NaHCO₃. The bank offers the bicarbonate as a distractor when it asks for washing soda.",
        },
        {
          title: "KMnO₄ disinfects by oxidising, not by killing on contact",
          body:
            "Potassium permanganate purifies water because it is an oxidizing agent — it oxidises organic matter and microbes. The wanted answer is 'oxidizing agent', not 'reducing agent' or 'bleaching agent'.",
        },
      ],
    },

    // Fuels & combustible gases: propane clean fuel, methane biogas
    {
      kind: "reference" as const,
      slug: "fuels-and-gases",
      name: "Clean fuels and biogas",
      intuition:
        "Two recall facts about everyday fuels: which gas is the 'clean' fuel, and what biogas is mostly made of. Both answer a small hydrocarbon — propane for clean LPG fuel, methane for biogas.",
      definition:
        "The fuel-recall pairs:\n" +
        "- **Propane (C₃H₈)** is a clean fuel — it burns with little soot and is a major component of **LPG** (liquefied petroleum gas).\n" +
        "- **Biogas** (gobar gas) is produced by anaerobic decomposition of organic waste and is **mainly methane (CH₄)**, with some carbon dioxide.\n" +
        "- **CNG** (compressed natural gas) is also mainly **methane** — a cleaner vehicle fuel than petrol or diesel.",
      table: {
        columns: ["Fuel", "Main component", "Note"],
        rows: [
          {
            cells: ["Clean fuel / LPG", "Propane (C₃H₈) with butane", "Burns cleanly, little soot"],
            pyqExampleId: "d3827fb3-9c71-4b8e-858a-6a09b64ea78f",
            noteAmber: "Propane is the clean-fuel answer; it is a key component of LPG.",
          },
          {
            cells: ["Biogas (gobar gas)", "Methane (CH₄)", "From anaerobic decay of organic waste"],
            pyqExampleId: "911c307a-1ea4-45c5-86bb-12fefc27b849",
            noteAmber: "Biogas is MAINLY methane (≈ 50–70%), with carbon dioxide as the next gas. The major constituent is methane.",
          },
          { cells: ["CNG (vehicle fuel)", "Methane (CH₄)", "Compressed natural gas; cleaner than diesel"] },
        ],
      },
      pyqExampleId: "911c307a-1ea4-45c5-86bb-12fefc27b849",
      practiceSet: [
        { prompt: "Which gas is an example of a clean fuel?", answer: "Propane (a major LPG component)" },
        { prompt: "Which gas is the major constituent of biogas?", answer: "Methane (CH₄)" },
        { prompt: "CNG used as a vehicle fuel is mainly which gas?", answer: "Methane (CH₄)" },
      ],
      traps: [
        {
          title: "Biogas is mainly methane, not carbon dioxide",
          body:
            "Biogas does contain carbon dioxide, but its MAJOR constituent is methane (CH₄). When asked for the major constituent, choose methane.",
        },
        {
          title: "LPG and CNG are different gases",
          body:
            "LPG (liquefied petroleum gas) is mainly propane and butane. CNG (compressed natural gas) is mainly methane. Do not equate them.",
        },
      ],
    },

    // Breathing gas mixture for divers: heliox
    {
      kind: "reference" as const,
      slug: "breathing-gas-mixtures",
      name: "Gas mixtures for breathing",
      intuition:
        "Deep-sea divers cannot breathe ordinary air at depth — the nitrogen causes 'nitrogen narcosis'. So their cylinders mix oxygen with helium, which is inert and light and does not cause narcosis.",
      definition:
        "The breathing-gas facts:\n" +
        "- **Deep-sea divers** breathe **oxygen mixed with helium** (called **heliox**). Helium is used because it does not cause **nitrogen narcosis** and has low density, making breathing easier at high pressure.\n" +
        "- Ordinary **air** is about 78% nitrogen and 21% oxygen — the nitrogen is the problem at depth, so it is replaced by helium.",
      table: {
        columns: ["Use", "Gas mixture", "Why"],
        rows: [
          {
            cells: ["Deep-sea diving", "Oxygen + helium (heliox)", "Helium avoids nitrogen narcosis; low density eases breathing"],
            pyqExampleId: "7f7d5200-6976-471e-bc36-48a8811db561",
            noteAmber: "Divers breathe oxygen + HELIUM — not oxygen + nitrogen. Nitrogen at depth causes narcosis.",
          },
          { cells: ["Hospital / medical use", "Oxygen (sometimes with helium or CO₂)", "Pure oxygen or controlled mixtures for patients"] },
        ],
      },
      pyqExampleId: "7f7d5200-6976-471e-bc36-48a8811db561",
      practiceSet: [
        { prompt: "Deep-sea divers carry oxygen mixed with which gas?", answer: "Helium (the mixture is called heliox)" },
        { prompt: "Why is helium, not nitrogen, used in diving cylinders?", answer: "Helium does not cause nitrogen narcosis and is low-density" },
      ],
      traps: [
        {
          title: "Divers breathe oxygen + helium, not oxygen + nitrogen",
          body:
            "The whole point of the diver's mixture is to AVOID nitrogen, which causes narcosis at depth. The answer is helium. 'Nitrogen' is the wrong-on-purpose distractor.",
        },
      ],
    },
  ],
};
