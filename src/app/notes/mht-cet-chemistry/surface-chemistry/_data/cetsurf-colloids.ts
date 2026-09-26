import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/surface-chemistry";

export const COLLOIDS_NOTE: SubtopicNote = {
  subtopicName: "Colloids, Classification, Coagulation and Hardy-Schulze Rule",
  title: "Colloids: Phase and Medium, Kinds of Colloid, Charge on a Sol, and Coagulation",
  oneLineDefinition:
    "A colloid is one substance dispersed through another in particles bigger than molecules but too small to settle; it is classified by the phases involved and by how the particles form, and a charged sol is coagulated by ions of the opposite charge — the higher their charge, the faster.",
  whyItMatters:
    "21 PYQs — the largest page in the chapter — and none HARD. Five name the phases (milk, fog, cheese, gels, emulsions), five classify multimolecular, macromolecular and associated colloids, four are about lyophilic sols and which sols are positive, five apply the Hardy–Schulze rule, and two are processes. " +
    "Five cards, all recall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetsurf-phase-and-medium",
      name: "Dispersed Phase and Dispersion Medium",
      intuition:
        "Name the colloid by what is spread out (the dispersed phase) and what it is spread through (the dispersion medium). Liquid in gas is an aerosol like fog; liquid in liquid is an emulsion like milk; liquid in solid is a gel like cheese.",
      definition:
        "- **Aerosol** (liquid in gas): **fog**, mist, clouds. Solid in gas: smoke, dust.\n" +
        "- **Emulsion** (liquid in liquid): **milk**, **hair cream**, cold cream.\n" +
        "- **Gel** (liquid in solid): **cheese**, **butter**, **jellies**.\n" +
        "- **Sol** (solid in liquid): paints, gold sol. **Foam** (gas in liquid): froth, whipped cream. Solid foam (gas in solid): foam rubber, pumice.",
      table: {
        columns: ["Colloid", "Dispersed phase in medium", "Type"],
        rows: [
          { cells: ["Fog", "Liquid in gas", "Aerosol"], pyqExampleId: "0979fd43-2dd0-4800-8997-7c41cff836f0" },
          { cells: ["Milk", "Liquid in liquid", "**Emulsion**"], pyqExampleId: "42a9e6ac-ac01-485c-a637-59367f7122f3" },
          { cells: ["Hair cream", "Liquid in liquid", "**Emulsion**"], pyqExampleId: "20808130-ea3d-4895-af2b-fddfb0279705" },
          { cells: ["Cheese, butter, jellies", "Liquid in solid", "**Gel**"], pyqExampleId: "f918c02a-05c9-4bd6-819e-af0657a1d885" },
          { cells: ["Froth", "Gas in liquid", "Foam"] },
          { cells: ["Foam rubber", "Gas in solid", "Solid foam"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these is NOT a gel: cheese, butter, milk, jellies?",
        steps: ["Milk is liquid in liquid — an emulsion. The other three are liquid in solid."],
        answer: "Milk",
      },
      practiceSet: [
        { prompt: "Dispersed phase and medium in fog?", answer: "Liquid in gas" },
        { prompt: "Which is an emulsion: foam rubber, froth, gelatin, hair cream?", answer: "Hair cream" },
      ],
      pyqExampleId: "0979fd43-2dd0-4800-8997-7c41cff836f0",
    },
    {
      kind: "reference" as const,
      slug: "cetsurf-multi-macro-associated",
      name: "Multimolecular, Macromolecular and Associated Colloids",
      intuition:
        "How big are the particles, and how did they get that big? Many small molecules clumping together make a multimolecular colloid (sulphur sol, S₈). One giant molecule is already colloid-sized — a macromolecular colloid (starch, proteins, nylon). Soap and detergents are ordinary solutes that gather into micelles only above a certain concentration — associated colloids.",
      definition:
        "- **Multimolecular**: aggregates of small molecules — **S₈ sulphur sol**, gold sol.\n" +
        "- **Macromolecular**: single large molecules — **starch, cellulose, proteins, nylon, polythene**.\n" +
        "- **Associated** (micelles): **soap, detergents** — above the critical micelle concentration.",
      table: {
        columns: ["Example", "Kind"],
        rows: [
          { cells: ["S₈ sulphur", "**Multimolecular**"], pyqExampleId: "668d1748-c5dc-4732-9dad-4f17cc2dfff9" },
          { cells: ["Nylon, polythene, protein, starch", "**Macromolecular**"], pyqExampleId: "cf67dfda-19a8-463f-9189-b35052f5b42b" },
          { cells: ["Soap, detergent", "**Associated**"], pyqExampleId: "b6a70819-4d6c-438c-b753-9ab2091e1410" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT a macromolecular colloid: protein, polythene, nylon, soap?",
        steps: ["Soap forms micelles — an associated colloid."],
        answer: "Soap",
      },
      practiceSet: [
        { prompt: "Starch forms which type of colloid?", answer: "Macromolecular" },
        { prompt: "Which is multimolecular: soap, polythene, S₈, nylon?", answer: "S₈" },
      ],
      pyqExampleId: "ce828623-9a6c-454f-a0cd-62a88d2f195b",
    },
    {
      kind: "reference" as const,
      slug: "cetsurf-lyophilic-and-charge",
      name: "Lyophilic and Lyophobic Sols, and the Charge on a Sol",
      intuition:
        "A lyophilic ('solvent-loving') sol holds its medium tightly, so it is stable, reversible and needs a LOT of electrolyte to coagulate. A lyophobic sol is the opposite. Most sols are negative; a short list of metal hydroxides, basic dyes and haemoglobin are positive.",
      definition:
        "- **Lyophilic**: strong affinity for the medium; **reversible**; **self-stabilised**; coagulated only by a **large amount** of electrolyte (salting out).\n" +
        "- **Lyophobic**: little affinity; irreversible; easily coagulated by a little electrolyte.\n" +
        "- **Positive sols**: **haemoglobin**, Fe(OH)₃, Al(OH)₃, basic dyes (methylene blue).\n" +
        "- **Negative sols**: **As₂S₃**, clay, **congo red**, gold, starch, gum, gelatin, CdS.",
      table: {
        columns: ["Sol", "Charge"],
        rows: [
          { cells: ["Haemoglobin, Fe(OH)₃, Al(OH)₃, methylene blue", "**Positive**"], pyqExampleId: "a42de343-920f-4c54-94df-64bcbd295e5c" },
          { cells: ["As₂S₃, clay, congo red, gum, gelatin, CdS, gold", "**Negative**"], pyqExampleId: "37c502bd-d70e-4501-af11-ad69851e2351" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT true of lyophilic colloids: dispersed phase has great affinity for the medium; reversible; self-stabilised; coagulated by a very small amount of electrolyte?",
        steps: ["Lyophilic sols need a LARGE amount of electrolyte. The last statement is false."],
        answer: "Coagulated by a very small amount of electrolyte",
      },
      practiceSet: [
        { prompt: "Which is not a negatively charged sol: As₂S₃, haemoglobin, clay, congo red?", answer: "Haemoglobin" },
      ],
      pyqExampleId: "59b9cc12-8a54-41fd-bdaf-ccd1e1e7f422",
      traps: [
        {
          title: "Assuming every protein sol is negative",
          body: "Gelatin is negative, but haemoglobin is positive — and it is the positive one the paper asks for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetsurf-coagulation-hardy-schulze",
      name: "Coagulation and the Hardy–Schulze Rule",
      intuition:
        "A sol stays dispersed because its particles carry the same charge and repel. Add ions of the OPPOSITE charge and they neutralise the particles, which then clump and settle. The bigger the charge on the added ion, the smaller the amount needed — that is the Hardy–Schulze rule.",
      definition:
        "- **Only the ion of opposite charge** coagulates: anions for a positive sol, cations for a negative sol.\n" +
        "- **Hardy–Schulze**: coagulating power rises with that ion's charge.\n" +
        "- **Positive sol**: **[Fe(CN)₆]⁴⁻ > PO₄³⁻ > SO₄²⁻ > Cl⁻**.\n" +
        "- **Negative sol**: **Al³⁺ > Ba²⁺ > Na⁺**.\n" +
        "- **Other ways to coagulate**: electrophoresis, mixing two oppositely charged sols, boiling. Adding **more solvent does not** — it only dilutes.",
      formula: {
        label: "Hardy–Schulze rule",
        latex: "\\text{coagulating power} \\propto |z_{\\text{counter-ion}}|",
      },
      authoredExample: {
        prompt: "Which ion coagulates a negatively charged sol most strongly: [Fe(CN)₆]⁴⁻, PO₄³⁻, Ba²⁺, Al³⁺?",
        steps: [
          "A negative sol is coagulated by CATIONS, so the two anions are out, however high their charge.",
          "Of Ba²⁺ and Al³⁺, the larger charge wins.",
        ],
        answer: "Al³⁺",
      },
      selfCheckExample: {
        prompt: "Which anion has the LOWEST coagulating power for a positive sol: [Fe(CN)₆]⁴⁻, PO₄³⁻, SO₄²⁻, Cl⁻?",
        steps: ["Lowest charge, lowest power."],
        answer: "Cl⁻",
      },
      practiceSet: [
        { prompt: "Maximum coagulating power for a positive sol: SO₄²⁻, Cl⁻, PO₄³⁻, [Fe(CN)₆]⁴⁻?", answer: "[Fe(CN)₆]⁴⁻" },
        { prompt: "Which does NOT cause coagulation: electrophoresis, adding excess solvent, mixing opposite sols, boiling?", answer: "Adding excess solvent" },
      ],
      pyqExampleId: "bfa962c7-cec2-46c9-b616-229657f991e7",
      traps: [
        {
          title: "Choosing the highest charge regardless of sign",
          body: "For a NEGATIVE sol, [Fe(CN)₆]⁴⁻ is offered because it has the biggest charge — but it is an anion and does nothing. Pick the highest-charged ion of the OPPOSITE sign.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetsurf-colloid-processes",
      name: "Electrophoresis, Dialysis, Peptization and Emulsification",
      intuition:
        "Four named processes, each paired with what it does: electrophoresis moves charged particles to an electrode; dialysis purifies a sol through a membrane; peptization makes a sol from a precipitate; emulsification is how soap cleans.",
      definition:
        "- **Electrophoresis**: charged sol particles move to the **oppositely charged electrode** under an applied potential (it also coagulates the sol there).\n" +
        "- **Dialysis**: **purification** of a colloidal solution — dissolved ions pass a membrane, colloid particles do not.\n" +
        "- **Peptization**: **preparation** of a sol from a fresh precipitate by adding a little electrolyte.\n" +
        "- **Emulsification**: the **cleansing action of soap**.",
      table: {
        columns: ["Process", "Application"],
        rows: [
          { cells: ["Dialysis", "Purification of a colloidal solution"], pyqExampleId: "e9ebf3d3-785f-4d59-995c-bf3a1531993d" },
          { cells: ["Peptization", "Preparation of a colloidal solution"] },
          { cells: ["Emulsification", "Cleansing action of soap"] },
          { cells: ["Electrophoresis", "Movement to an electrode; coagulation"], pyqExampleId: "59b6a4ff-b6c8-41bf-9500-56edd4b566ad" },
        ],
      },
      selfCheckExample: {
        prompt: "Colloidal particles move towards the electrodes under an applied potential. What is this called?",
        steps: ["Movement of the dispersed PARTICLES is electrophoresis; movement of the MEDIUM is electro-osmosis."],
        answer: "Electrophoresis",
      },
      pyqExampleId: "e9ebf3d3-785f-4d59-995c-bf3a1531993d",
    },
  ],
  related: [
    { label: "Adsorption — the surface chemistry behind stabilising sols", href: `${BASE}/cetsurf-adsorption` },
  ],
};
