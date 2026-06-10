import type { SubtopicNote } from "@/app/notes/_types";

export const CEMENT_GLASS_NOTE: SubtopicNote = {
  subtopicName: "Cement, Glass and Building Materials",
  title: "Cement, Glass and Building Materials",
  oneLineDefinition:
    "What glass and Portland cement are actually made of — their raw materials, the chemical compounds inside set cement, and the property statements (glass is a supercooled liquid; pyrex beats soda glass) the bank loves to test.",
  whyItMatters:
    "Six PYQs, mostly EASY/MODERATE. The bank asks the raw materials of glass or cement, the compounds present in set cement, or a 'which statement about glass is NOT correct' trap. " +
    "Two reliable facts win most marks: glass is an amorphous (non-crystalline) supercooled liquid, and Portland cement is made from lime, silica and alumina.",
  concepts: [
    // glass — nature + raw materials (reference)
    {
      kind: "reference" as const,
      slug: "glass-nature-and-materials",
      name: "Glass — nature and raw materials",
      intuition:
        "Glass is a non-crystalline solid — a supercooled liquid with no fixed melting point. It is made from sand (silica), soda and limestone. The bank tests both its physical nature and its ingredient list.",
      definition:
        "The glass facts the bank tests:\n" +
        "- **Glass is an amorphous (non-crystalline) solid** — often described as a **supercooled liquid**; it has **no definite melting point**.\n" +
        "- **Raw materials**: **silica sand (SiO₂)** — the source of silica, **soda ash (Na₂CO₃)**, **limestone (CaCO₃)**, and **borax** for borosilicate glass.\n" +
        "- **Gypsum is NOT a glass raw material** (it belongs to cement/plaster).\n" +
        "- **Pyrex (borosilicate) glass contains boron oxide**, making it **harder and more heat-resistant** than ordinary **soda glass**.",
      table: {
        columns: ["Aspect", "Glass fact", "Note"],
        rows: [
          {
            cells: ["Physical nature", "Amorphous, non-crystalline solid", "Supercooled liquid; no definite melting point"],
            noteAmber: "Glass is a non-crystalline amorphous solid — a supercooled liquid.",
          },
          {
            cells: ["Source of silica", "Sand (SiO₂)", "The silica-providing raw material"],
            noteAmber: "Sand is the source of silica in glass-making.",
          },
          { cells: ["Other raw materials", "Soda ash, limestone, borax", "Borax → borosilicate (pyrex)"] },
          {
            cells: ["NOT a glass material", "Gypsum (CaSO₄·2H₂O)", "Belongs to cement/plaster, not glass"],
            noteAmber: "Gypsum is the trap option — it is NOT used in making glass.",
          },
          {
            cells: ["Pyrex vs soda glass", "Pyrex is harder", "Pyrex has boron oxide; heat-resistant"],
            noteAmber: "'Soda glass is harder than pyrex' is FALSE — pyrex (borosilicate) is the harder, more heat-resistant one.",
          },
        ],
      },
      pyqExampleId: "045b310a-cc0f-4636-a639-50c2196e2d62", // glass is a non-crystalline amorphous solid
      selfCheckExample: {
        prompt: "Of soda, alumina, borax and gypsum, which one is NOT used as a raw material in glass-making?",
        steps: [
          "Soda (soda ash), alumina and borax all go into various glasses.",
          "Gypsum (calcium sulphate) is a cement/plaster ingredient, not a glass one.",
        ],
        answer: "Gypsum.",
      },
      practiceSet: [
        { prompt: "Glass is which kind of solid — crystalline or amorphous?", answer: "Amorphous (non-crystalline) — a supercooled liquid" },
        { prompt: "What is the source of silica in glass-making?", answer: "Sand (SiO₂)" },
        { prompt: "Which of soda, alumina, borax, gypsum is NOT a glass raw material?", answer: "Gypsum" },
        { prompt: "Is soda glass harder than pyrex glass?", answer: "No — pyrex (borosilicate) is harder and more heat-resistant" },
      ],
      traps: [
        {
          title: "Pyrex is harder than soda glass",
          body:
            "'Soda glass is harder than pyrex glass' is NOT correct. Pyrex is borosilicate glass — it contains boron oxide, which makes it harder and far more heat-resistant than ordinary soda glass.",
        },
        {
          title: "Gypsum is the glass trap",
          body:
            "When asked which is NOT a glass raw material, gypsum is the answer. Soda, limestone, sand and borax all go into glass; gypsum belongs to cement/plaster.",
        },
      ],
    },

    // cement — raw materials + compounds present (reference)
    {
      kind: "reference" as const,
      slug: "cement-composition",
      name: "Portland cement — raw materials and compounds",
      intuition:
        "Portland cement is made from lime, silica and alumina, and when set it contains a fixed set of calcium silicate and aluminate compounds. The bank asks both the raw-material list and 'which compound is NOT present in cement'.",
      definition:
        "The cement facts the bank tests:\n" +
        "- **Essential raw materials / constituents**: **lime (CaO), silica (SiO₂) and alumina (Al₂O₃)** (plus a little iron oxide).\n" +
        "- **Compounds present in set Portland cement**:\n" +
        "  - **3CaO·SiO₂** (tricalcium silicate, *alite*)\n" +
        "  - **2CaO·SiO₂** (dicalcium silicate, *belite*)\n" +
        "  - **3CaO·Al₂O₃** (tricalcium aluminate)\n" +
        "  - **4CaO·Al₂O₃·Fe₂O₃** (tetracalcium aluminoferrite)\n" +
        "- **4CaO·SiO₂ is NOT a cement compound** — the silicates are only the 3:1 and 2:1 ratios.\n" +
        "- **Gypsum** is added in a small amount to **regulate the setting time**.",
      table: {
        columns: ["Aspect", "Cement fact", "Note"],
        rows: [
          {
            cells: ["Raw materials", "Lime, silica, alumina", "+ a little iron oxide"],
            noteAmber: "Essential constituents of Portland cement: silica, alumina, lime.",
          },
          { cells: ["Alite", "3CaO·SiO₂", "Tricalcium silicate"] },
          { cells: ["Belite", "2CaO·SiO₂", "Dicalcium silicate"] },
          { cells: ["Aluminate", "3CaO·Al₂O₃", "Tricalcium aluminate"] },
          {
            cells: ["NOT in cement", "4CaO·SiO₂", "No such silicate; only 3:1 and 2:1"],
            noteAmber: "4CaO·SiO₂ is the trap — it is NOT a standard cement compound.",
          },
          { cells: ["Setting regulator", "Gypsum (small amount)", "Slows the setting time"] },
        ],
      },
      pyqExampleId: "915e493c-fcec-4565-83fd-58a612fdb01f", // 4CaO.SiO2 NOT in cement
      selfCheckExample: {
        prompt: "Which of 2CaO·SiO₂, 3CaO·SiO₂, 4CaO·SiO₂, 3CaO·Al₂O₃ is NOT present in set Portland cement?",
        steps: [
          "The calcium silicates in cement are alite (3CaO·SiO₂) and belite (2CaO·SiO₂) only.",
          "3CaO·Al₂O₃ is a real aluminate component.",
          "4CaO·SiO₂ is not a cement compound at all.",
        ],
        answer: "4CaO·SiO₂.",
      },
      practiceSet: [
        { prompt: "Name the three essential raw materials of Portland cement.", answer: "Lime (CaO), silica (SiO₂) and alumina (Al₂O₃)" },
        { prompt: "Which silicate compound is NOT present in cement: 2CaO·SiO₂, 3CaO·SiO₂ or 4CaO·SiO₂?", answer: "4CaO·SiO₂" },
        { prompt: "Why is a little gypsum added to cement?", answer: "To regulate (slow) the setting time" },
        { prompt: "What is the chemical name of 3CaO·SiO₂ in cement?", answer: "Tricalcium silicate (alite)" },
      ],
      traps: [
        {
          title: "4CaO·SiO₂ does not exist in cement",
          body:
            "Cement's calcium silicates are the 3:1 (3CaO·SiO₂) and 2:1 (2CaO·SiO₂) ratios only. A '4CaO·SiO₂' option is fabricated — it is the 'which is NOT present' answer.",
        },
      ],
    },
  ],
};
