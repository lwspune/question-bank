import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_BM_ENZYMES_NOTE: SubtopicNote = {
  subtopicName: "Enzymes",
  title: "Enzymes: Biocatalysts",
  oneLineDefinition:
    "Enzymes as biocatalysts: almost all are globular proteins, each is specific to a reaction and a substrate, they are named with the ending -ase, and they lower the activation energy.",
  whyItMatters:
    "1 question, the NCERT exercise \"What are enzymes?\". No board paper from 2023 to 2026 has asked about enzymes in this chapter, so this is a short page: learn the definition, three properties and how enzymes are named, which together make a full two-mark answer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcbm-enzymes",
      name: "Enzymes and how they are named",
      intuition:
        "Digesting food in a test tube would need strong acid and boiling. The body does it at body temperature, in mild conditions, because enzymes speed each step up. Each enzyme fits one job, and its name usually tells you that job: maltase works on maltose.",
      definition:
        "- **Enzymes** are **biocatalysts**: they catalyse the reactions of living organisms, which occur in the body under very mild conditions.\n" +
        "- **Almost all enzymes are globular proteins.**\n" +
        "- Enzymes are **very specific** for a particular reaction and for a particular substrate.\n" +
        "- They are generally **named after the compound** or class of compounds on which they work, and sometimes **after the reaction** they catalyse. The name ends in **-ase**.\n" +
        "- Maltase catalyses the hydrolysis of maltose into glucose: \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{maltase}} 2\\,\\text{C}_6\\text{H}_{12}\\text{O}_6\\)\n" +
        "- Enzymes that catalyse the oxidation of one substrate with the simultaneous reduction of another are called **oxidoreductases**.\n" +
        "- Enzymes are needed only in **small quantities**. Like chemical catalysts, they **reduce the activation energy**. The activation energy for the acid hydrolysis of sucrose is 6.22 kJ mol⁻¹, while it is only 2.15 kJ mol⁻¹ when sucrose is hydrolysed by the enzyme sucrase.",
      table: {
        columns: ["Enzyme", "Named after", "Reaction it catalyses"],
        rows: [
          { cells: ["Maltase", "Its substrate, maltose", "Hydrolysis of maltose into glucose"] },
          { cells: ["Sucrase", "Its substrate, sucrose", "Hydrolysis of sucrose, with a lower activation energy than acid"] },
          { cells: ["Oxidoreductases", "The reaction", "Oxidation of one substrate with simultaneous reduction of another"] },
        ],
      },
      selfCheckExample: {
        prompt: "An enzyme catalyses the hydrolysis of maltose. What is it called, what product does it give, and what does its name tell you about how enzymes are named?",
        steps: [
          "It is maltase; it hydrolyses one maltose molecule into two molecules of glucose.",
          "Enzymes are generally named after the compound they act on, with the ending -ase.",
        ],
        answer: "Maltase; glucose; named after its substrate, ending in -ase",
      },
      practiceSet: [
        { prompt: "Most enzymes belong to which class of biomolecules, and of which shape?", answer: "Proteins; almost all enzymes are globular proteins" },
        { prompt: "How does an enzyme speed up a reaction?", answer: "Like a chemical catalyst, it reduces the activation energy of the reaction" },
        { prompt: "What are oxidoreductase enzymes?", answer: "Enzymes that catalyse the oxidation of one substrate with the simultaneous reduction of another" },
      ],
      pyqExampleId: "f4ae8f8f-32d7-499a-9569-b589534cf686",
      traps: [
        {
          title: "\"Enzymes are catalysts\" is not enough",
          body: "Write that they are biocatalysts, almost all globular proteins, and specific for a reaction and a substrate. The bare word \"catalyst\" leaves out what makes an enzyme an enzyme.",
        },
        {
          title: "An enzyme lowers the activation energy",
          body: "It does not raise the temperature or supply energy. Sucrase hydrolyses sucrose with a smaller activation energy than acid does.",
        },
      ],
    },
  ],
};
