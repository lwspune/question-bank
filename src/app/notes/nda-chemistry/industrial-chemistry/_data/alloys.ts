import type { SubtopicNote } from "@/app/notes/_types";

export const ALLOYS_NOTE: SubtopicNote = {
  subtopicName: "Common Industrial Substances and Alloys",
  title: "Common Industrial Substances and Alloys",
  oneLineDefinition:
    "The composition of everyday industrial substances and alloys — plaster of Paris, borax, soft soap and solder — plus the raw materials of Portland cement, all answered by knowing one formula or element list per item.",
  whyItMatters:
    "Five PYQs of pure composition recall. The bank asks 'solder is an alloy of...', 'the formula of plaster of Paris is...', or 'soft soap contains...'. " +
    "Each is a single fact: solder = Pb + Sn, plaster of Paris = CaSO₄·½H₂O, soft soap = potassium soap, borax = Na, B, O, H.",
  concepts: [
    // alloy composition (reference)
    {
      kind: "reference" as const,
      slug: "common-alloys",
      name: "Common alloys and their composition",
      intuition:
        "An alloy is a mixture of metals. The bank asks the two (or more) metals in a named alloy. Solder is the high-frequency one — learn its pair first, then the rest.",
      definition:
        "The alloy composition facts:\n" +
        "- **Solder** = **lead (Pb) + tin (Sn)** — a low-melting alloy for joining metals.\n" +
        "- **Brass** = **copper (Cu) + zinc (Zn)**.\n" +
        "- **Bronze** = **copper (Cu) + tin (Sn)**.\n" +
        "- **Steel** = **iron (Fe) + carbon (C)**.\n" +
        "- **Duralumin** = **aluminium (Al) + copper (Cu) + magnesium + manganese**.",
      table: {
        columns: ["Alloy", "Composition", "Use"],
        rows: [
          {
            cells: ["Solder", "Lead (Pb) + tin (Sn)", "Joining/soldering metals"],
            noteAmber: "Solder is an alloy of lead and tin (Pb + Sn).",
          },
          { cells: ["Brass", "Copper + zinc (Cu + Zn)", "Fittings, instruments"] },
          { cells: ["Bronze", "Copper + tin (Cu + Sn)", "Statues, coins, bearings"] },
          { cells: ["Steel", "Iron + carbon (Fe + C)", "Construction, tools"] },
          { cells: ["Duralumin", "Al + Cu + Mg + Mn", "Aircraft (light, strong)"] },
        ],
      },
      pyqExampleId: "17c062ad-be99-4dcf-aa4c-5beba1922d9c", // solder = Pb and Sn
      selfCheckExample: {
        prompt: "Name the metals in solder and in brass.",
        steps: [
          "Solder is a low-melting joining alloy — lead and tin.",
          "Brass is a copper alloy with zinc.",
        ],
        answer: "Solder = lead (Pb) + tin (Sn); brass = copper (Cu) + zinc (Zn).",
      },
      practiceSet: [
        { prompt: "Solder is an alloy of which two metals?", answer: "Lead (Pb) and tin (Sn)" },
        { prompt: "Brass is an alloy of which two metals?", answer: "Copper (Cu) and zinc (Zn)" },
        { prompt: "Bronze is an alloy of which two metals?", answer: "Copper (Cu) and tin (Sn)" },
        { prompt: "Steel is iron alloyed with what?", answer: "Carbon (C)" },
      ],
      traps: [
        {
          title: "Solder = Pb + Sn, brass = Cu + Zn, bronze = Cu + Sn",
          body:
            "Keep the copper alloys apart: brass is copper + ZINC, bronze is copper + TIN. Solder is lead + tin (no copper). The bank swaps these as distractors.",
        },
      ],
    },

    // industrial substances: plaster of Paris, borax, soft soap (reference)
    {
      kind: "reference" as const,
      slug: "industrial-substances",
      name: "Plaster of Paris, borax and soft soap",
      intuition:
        "A short list of named industrial substances, each with one fact the bank wants: a formula, an element list, or the metal in a soap. Learn one line each.",
      definition:
        "The named-substance facts:\n" +
        "- **Plaster of Paris** = **CaSO₄·½H₂O** (calcium sulphate hemihydrate), made by heating gypsum. Sets hard when mixed with water.\n" +
        "- **Borax** is composed of **sodium, boron, oxygen and hydrogen** (Na₂B₄O₇·10H₂O).\n" +
        "- **Soft soap** is a **potassium soap** — it contains **potassium** (hard soap is the sodium salt). Soft soap is more soluble and used in liquid/shaving soaps.",
      table: {
        columns: ["Substance", "Formula / composition", "Key fact"],
        rows: [
          {
            cells: ["Plaster of Paris", "CaSO₄·½H₂O", "Calcium sulphate hemihydrate; from gypsum"],
            noteAmber: "Plaster of Paris = CaSO₄·½H₂O (½ water per CaSO₄), not CaSO₄·2H₂O (that is gypsum).",
          },
          {
            cells: ["Borax", "Na, B, O, H (Na₂B₄O₇·10H₂O)", "Sodium tetraborate decahydrate"],
            noteAmber: "Borax contains sodium, boron, oxygen and hydrogen.",
          },
          {
            cells: ["Soft soap", "Potassium soap", "Contains potassium (K)"],
            noteAmber: "Soft soap = potassium salt; HARD soap = sodium salt.",
          },
        ],
      },
      pyqExampleId: "774dcc44-6641-4897-9a7b-e404d2dd517c", // plaster of Paris formula
      selfCheckExample: {
        prompt: "A sample of 'soft soap' contains which metal — sodium or potassium? What about ordinary hard soap?",
        steps: [
          "Soaps are the alkali-metal salts of fatty acids.",
          "Soft (liquid) soaps use the potassium salt; hard (bar) soaps use the sodium salt.",
        ],
        answer: "Soft soap contains potassium; hard soap contains sodium.",
      },
      practiceSet: [
        { prompt: "What is the chemical formula of plaster of Paris?", answer: "CaSO₄·½H₂O" },
        { prompt: "Soft soap contains which metal?", answer: "Potassium (K)" },
        { prompt: "Which four elements make up borax?", answer: "Sodium, boron, oxygen and hydrogen" },
        { prompt: "Plaster of Paris is made by heating which mineral?", answer: "Gypsum (CaSO₄·2H₂O)" },
      ],
      traps: [
        {
          title: "Soft soap = potassium, hard soap = sodium",
          body:
            "Soft soap is the POTASSIUM salt of a fatty acid (more soluble, used in liquid soaps); ordinary hard bar soap is the SODIUM salt. The bank asks which metal soft soap contains — answer potassium.",
        },
        {
          title: "Plaster of Paris is ½ water, gypsum is 2 waters",
          body:
            "Plaster of Paris is CaSO₄·½H₂O; gypsum is CaSO₄·2H₂O. Picking the 2-water formula for plaster of Paris is the standard mistake.",
        },
      ],
    },

    // Portland cement raw materials — this EASY q is filed under THIS DB subtopic (reference)
    {
      kind: "reference" as const,
      slug: "cement-raw-materials",
      name: "Raw materials of Portland cement",
      intuition:
        "Two of the bank's cement questions are filed here under industrial substances. The raw materials are the same lime–silica–alumina list as the building-materials subtopic — learn it once.",
      definition:
        "The raw materials of Portland cement:\n" +
        "- **Lime (CaO)** — from limestone / calcium carbonate.\n" +
        "- **Silica (SiO₂)** — from clay or sand.\n" +
        "- **Alumina (Al₂O₃)** — from clay.\n" +
        "- Plus a little **iron oxide**. A small amount of **gypsum** is added at the end to control setting time.",
      table: {
        columns: ["Raw material", "Provides", "Source"],
        rows: [
          { cells: ["Limestone", "Lime (CaO)", "Calcium carbonate rock"] },
          { cells: ["Clay / sand", "Silica (SiO₂)", "Clay, sand"] },
          { cells: ["Clay", "Alumina (Al₂O₃)", "Aluminosilicate clay"] },
          {
            cells: ["Iron ore + gypsum", "Iron oxide; setting control", "Added in small amounts"],
            noteAmber: "Lime, silica and alumina are the essential trio — gypsum is only a setting regulator.",
          },
        ],
      },
      pyqExampleId: "fff4e0cf-f0b7-46ae-945f-f8af1e54a7ff", // raw materials: lime, silica, alumina
      practiceSet: [
        { prompt: "Name the three essential raw materials of Portland cement.", answer: "Lime, silica and alumina" },
        { prompt: "Which raw material provides lime in cement?", answer: "Limestone (calcium carbonate)" },
        { prompt: "Why is gypsum added to cement?", answer: "To regulate (slow) the setting time" },
      ],
      traps: [
        {
          title: "Lime + silica + alumina is the trio",
          body:
            "The essential raw materials of Portland cement are lime, silica and alumina. Gypsum is added only to control setting time — it is not one of the three essential constituents.",
        },
      ],
    },
  ],
};
