import type { SubtopicNote } from "@/app/notes/_types";

export const LIPIDS_AND_ENZYMES_NOTE: SubtopicNote = {
  subtopicName: "Lipids, Enzymes and Other Biomolecules",
  title: "Lipids, Enzymes and Other Biomolecules",
  oneLineDefinition:
    "Fats and oils are triglycerides — triesters of glycerol with three fatty acids, hydrolysed by three water molecules and saponified to soap, the sodium or potassium salt of a higher fatty acid; the common fatty acids are counted by carbons and double bonds (linolenic 18:3), enzymes are globular protein catalysts named for their substrate and site, and haemoglobin is the biological coordination compound.",
  whyItMatters:
    "5 PYQs, none HARD — a short page. Two ask the number of C=C bonds in linolenic acid (three), one the water needed to hydrolyse n mol of triglyceride (3n), one what a soap is (K or Na salt of a higher fatty acid), one the enzymes in saliva; haemoglobin as a coordination compound sits here too. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetbio-lipids-fatty-acids-and-enzymes",
      name: "Triglycerides, Fatty Acids, Soap and Enzymes",
      intuition:
        "A triglyceride has three ester bonds, so complete hydrolysis needs three waters per molecule and returns glycerol plus three fatty acids; done with NaOH or KOH it gives the salts instead — soap. A fatty acid is described by two numbers, carbons and C=C: palmitic 16:0 and stearic 18:0 are saturated (solid fats), oleic 18:1, linoleic 18:2 and linolenic 18:3 are unsaturated (oils). Enzymes are proteins that speed one reaction each; the name usually says what they act on (amylase on starch, lipase on fats, pepsin and trypsin on proteins).",
      definition:
        "- **Triglyceride** = glycerol + 3 fatty acids (3 ester links). Hydrolysis: \\(n\\) mol triglyceride needs **\\(3n\\) mol \\(\\text{H}_2\\text{O}\\)** → glycerol + 3 RCOOH.\n" +
        "- **Soap** = sodium or **potassium salt of a higher fatty acid** (C12–C18); Na gives hard soap, K soft soap. Formic-acid or ammonium salts are not soaps.\n" +
        "- **Fatty acids**: palmitic \\(\\text{C}_{15}\\text{H}_{31}\\text{COOH}\\) (16:0), stearic \\(\\text{C}_{17}\\text{H}_{35}\\text{COOH}\\) (18:0), oleic 18:1, linoleic 18:2, **linolenic 18:3** (9,12,15-octadecatrienoic acid — **three** C=C).\n" +
        "- **Enzymes**: globular proteins, highly specific, work at body temperature and pH. Saliva: **amylase (ptyalin), lysozyme, lingual lipase**; stomach: pepsin (with HCl); intestine: trypsin, lactase; invertase hydrolyses sucrose.\n" +
        "- **Haemoglobin**: Fe(II) held by the porphyrin ring — a coordination compound in blood; chlorophyll (Mg) is the plant counterpart, and vitamin B12 holds cobalt.",
      formula: {
        label: "Triglyceride hydrolysis",
        latex:
          "\\text{triglyceride} + 3\\,\\text{H}_2\\text{O} \\to \\text{glycerol} + 3\\,\\text{RCOOH};\\qquad \\text{linolenic acid: } \\text{C}_{18},\\ 3\\ \\text{C=C}",
      },
      authoredExample: {
        prompt: "How many moles of NaOH saponify 2 mol of a triglyceride completely, and what are the products?",
        steps: [
          "Three esters per molecule: 3 × 2 = 6 mol NaOH; products are 2 mol glycerol and 6 mol sodium fatty-acid salt (soap).",
        ],
        answer: "6 mol NaOH; glycerol + sodium soap",
      },
      selfCheckExample: {
        prompt: "How many C=C bonds does linoleic acid have, and how many does linolenic acid have?",
        steps: [
          "Dienoic 18:2 — two; trienoic 18:3 — three.",
        ],
        answer: "2 and 3",
      },
      practiceSet: [
        { prompt: "Water for complete hydrolysis of n mol triglyceride?", answer: "3n mol" },
        { prompt: "A soap molecule is?", answer: "Na or K salt of a higher fatty acid" },
        { prompt: "Enzymes in saliva?", answer: "Amylase, lysozyme, lingual lipase" },
        { prompt: "Biological coordination compound in blood?", answer: "Haemoglobin (Fe)" },
      ],
      pyqExampleId: "c5095896-0039-405b-b555-878b4d33e30f",
      traps: [
        {
          title: "Linoleic for linolenic",
          body:
            "One letter apart: linoleic acid has TWO C=C, linolenic THREE. The '-trien-' in 9,12,15-octadecatrienoic acid gives the count.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Carboxylic Acids — esters and their hydrolysis",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-carboxylic-acids",
    },
    {
      label: "Amino Acids and Proteins — enzymes are globular proteins",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-amino-acids-and-proteins",
    },
  ],
};
