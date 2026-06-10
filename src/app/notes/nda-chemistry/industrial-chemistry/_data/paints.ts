import type { SubtopicNote } from "@/app/notes/_types";

export const PAINTS_NOTE: SubtopicNote = {
  subtopicName: "Paints and Coatings",
  title: "Paints and Coatings",
  oneLineDefinition:
    "What each ingredient in a paint actually does — the pigment that colours, the binder that forms the film, the thinner that thins, the drier that speeds drying, and the additives (anti-skinning, antifoaming) that fix storage problems.",
  whyItMatters:
    "The chapter's hardest pocket — three of the four PYQs are HARD, all from 2019–2026, all asking the role of a specific paint additive. " +
    "The win is one clean role↔example table: pigment = TiO₂, binder = silicones/resins, drier = metal naphthenates, thinner = turpentine, anti-skinning = polyhydroxy phenol, antifoaming = pine oil. Learn it cold.",
  concepts: [
    // paint components: role <-> example (reference)
    {
      kind: "reference" as const,
      slug: "paint-components",
      name: "Paint ingredients and their roles",
      intuition:
        "A paint is pigment + binder + solvent + additives. The bank gives you a role and asks the example, or gives an example and asks the role. There is exactly one correct match per row — memorise the whole table.",
      definition:
        "The role↔example facts the bank tests:\n" +
        "- **Pigment** — gives colour and opacity. White pigment = **titanium dioxide (TiO₂)**; blue/green organic pigment = **phthalocyanine**.\n" +
        "- **Binder (film-former)** — holds pigment together and sticks it to the surface. Examples: **silicones**, **alkyd/phenolic resins (novolac)**, drying oils.\n" +
        "- **Thinner (solvent)** — thins the paint for application. Example: **turpentine**.\n" +
        "- **Drier** — speeds up drying by catalysing oxidation. Examples: **metal naphthenates** (cobalt, lead, manganese naphthenate).\n" +
        "- **Anti-skinning agent** — stops a skin forming on the paint surface during storage. Example: **polyhydroxy phenol**.\n" +
        "- **Antifoaming agent** — stops foam in emulsion paints. Example: **pine oil**.",
      table: {
        columns: ["Role in paint", "What it does", "Correct example"],
        rows: [
          {
            cells: ["Pigment", "Colour + opacity", "Titanium dioxide (TiO₂)"],
            noteAmber: "TiO₂ is the standard white pigment; phthalocyanine is a blue/green pigment.",
          },
          {
            cells: ["Binder (film-former)", "Holds pigment, forms the film", "Silicones (also resins / drying oils)"],
            noteAmber: "Silicones are the binder; TiO₂, novolac and phthalocyanine in that question are pigment/resin distractors.",
          },
          { cells: ["Thinner (solvent)", "Thins the paint", "Turpentine"] },
          {
            cells: ["Drier", "Accelerates drying (oxidation)", "Metal naphthenates"],
            noteAmber: "Naphthenates are DRIERS, not thinners. Turpentine is the thinner.",
          },
          {
            cells: ["Anti-skinning agent", "Prevents skin in storage", "Polyhydroxy phenol"],
            noteAmber: "Anti-skinning agent = polyhydroxy phenol — not gelatin, pyridine or NMP.",
          },
          { cells: ["Antifoaming agent", "Stops foam in emulsion paint", "Pine oil"] },
        ],
      },
      pyqExampleId: "d00b4e6d-42f3-4694-92b5-ae6b3c376f29", // binder = silicones
      selfCheckExample: {
        prompt: "Match each: (i) Pigment, (ii) Thinner, (iii) Drier, (iv) Anti-skinning agent — to TiO₂, turpentine, metal naphthenates, polyhydroxy phenol.",
        steps: [
          "Pigment gives colour → TiO₂.",
          "Thinner thins the paint → turpentine.",
          "Drier speeds oxidation → metal naphthenates.",
          "Anti-skinning agent stops a skin in storage → polyhydroxy phenol.",
        ],
        answer: "Pigment = TiO₂; Thinner = turpentine; Drier = metal naphthenates; Anti-skinning = polyhydroxy phenol.",
      },
      practiceSet: [
        { prompt: "What is commonly used as a white pigment in paints?", answer: "Titanium dioxide (TiO₂)" },
        { prompt: "Which paint ingredient is the binder (film-former) among TiO₂, novolac, phthalocyanine, silicones?", answer: "Silicones" },
        { prompt: "What is commonly used as an anti-skinning agent in paints?", answer: "Polyhydroxy phenol" },
        { prompt: "What is the role of metal naphthenates in paint?", answer: "Driers (accelerate drying)" },
        { prompt: "What is the role of turpentine in paint?", answer: "Thinner (solvent)" },
      ],
      traps: [
        {
          title: "Turpentine is the thinner; naphthenates are driers",
          body:
            "The bank swaps these in a match-the-pairs question. Turpentine = thinner. Metal naphthenates = drier. Pairing 'drier : turpentine' or 'thinner : naphthenates' is the wrong match.",
        },
        {
          title: "Binder ≠ pigment",
          body:
            "TiO₂ and phthalocyanine are PIGMENTS, not binders. The binder (film-former) is the silicone/resin. When asked for the binder, do not pick a pigment.",
        },
        {
          title: "Anti-skinning agent = polyhydroxy phenol",
          body:
            "Among gelatin, N-methyl pyrrolidone, pyridine and polyhydroxy phenol, the anti-skinning agent is polyhydroxy phenol — the others are solvents/reagents.",
        },
      ],
    },

    // emulsion paint statements (reference)
    {
      kind: "reference" as const,
      slug: "emulsion-paint-additives",
      name: "Emulsion paint additives — true/false facts",
      intuition:
        "Emulsion (water-based) paints add a few special agents. The bank tests true/false statements about them: pine oil controls foam, protective colloids INCREASE stability, and oxidizable-oil driers speed drying. Learn which direction each one acts.",
      definition:
        "The emulsion-paint statements the bank tests:\n" +
        "- **Pine oil** is used as an **antifoaming agent** in emulsion paints — **TRUE**.\n" +
        "- **Protective colloids INCREASE the stability** of an emulsion — so 'protective colloids decrease stability' is **FALSE**.\n" +
        "- **Driers containing oxidizable oils accelerate drying** when added to emulsion paints — **TRUE**.",
      table: {
        columns: ["Statement about emulsion paint", "True or false", "Why"],
        rows: [
          { cells: ["Pine oil is used as antifoaming agent", "True", "Pine oil controls foam"] },
          {
            cells: ["Protective colloids decrease stability", "False", "They INCREASE stability"],
            noteAmber: "Protective colloids stabilise the emulsion — they increase, not decrease, stability.",
          },
          { cells: ["Oxidizable-oil driers accelerate drying", "True", "Oxidation speeds film formation"] },
        ],
      },
      pyqExampleId: "abbc7f00-327d-4766-8d9e-58f2d43a05b0", // emulsion statements: I and III correct
      practiceSet: [
        { prompt: "Pine oil is used as which agent in emulsion paints?", answer: "Antifoaming agent" },
        { prompt: "Do protective colloids increase or decrease the stability of emulsion paints?", answer: "Increase stability" },
        { prompt: "Why are oxidizable-oil driers added to emulsion paints?", answer: "To accelerate drying" },
      ],
      traps: [
        {
          title: "Protective colloids INCREASE stability",
          body:
            "The statement 'protective colloids are used to DECREASE stability of emulsion paints' is false. Protective colloids stabilise the dispersed phase — they increase emulsion stability.",
        },
      ],
    },
  ],
};
