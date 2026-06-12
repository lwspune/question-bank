import type { SubtopicNote } from "@/app/notes/_types";

export const RESPIRATION_FERMENTATION_NOTE: SubtopicNote = {
  subtopicName: "Anaerobic Respiration and Fermentation",
  title: "Respiration and Fermentation",
  oneLineDefinition:
    "Cells release energy from glucose as ATP; with oxygen this is aerobic respiration, and without oxygen it is anaerobic respiration or fermentation — which in yeast yields ethanol and carbon dioxide, and in muscle yields lactic acid.",
  whyItMatters:
    "The NDA tests this as a recall fact about the PRODUCTS — most often what oxygen-starved yeast produces (ATP + CO₂ + ethanol). " +
    "Keep the two fermentation routes straight: yeast → alcohol + CO₂; muscle → lactic acid. EASY recall. This builds on the Cell Biology chapter's respiration concept.",
  concepts: [
    // Foundation — aerobic vs anaerobic (no PYQ)
    {
      kind: "formula" as const,
      slug: "biochem-respiration-overview",
      name: "How cells release energy — aerobic vs anaerobic",
      intuition:
        "Cells run on a chemical energy currency called ATP. They make it by breaking down glucose. " +
        "If oxygen is available, glucose is broken down completely (aerobic respiration) and a lot of ATP is released; if oxygen is scarce, glucose is only partly broken down (anaerobic respiration / fermentation) and far less ATP is released.",
      definition:
        "Two routes from glucose to energy:\n" +
        "- **Aerobic respiration** (with O₂): glucose + oxygen → carbon dioxide + water + **lots of ATP** (~36–38 ATP). The site is the **mitochondria**.\n" +
        "- **Anaerobic respiration / fermentation** (without O₂): glucose is only partly broken down → **little ATP** (net 2 ATP) plus a waste product.\n" +
        "The first stage, **glycolysis** (glucose → pyruvate, in the cytoplasm, net 2 ATP), is common to both. What happens to the pyruvate afterwards is what differs.",
      formula: {
        label: "Aerobic respiration (overall)",
        latex:
          "C_6H_{12}O_6 + 6\\,O_2 \\;\\to\\; 6\\,CO_2 + 6\\,H_2O + \\text{energy (ATP)}",
        symbols: [
          { symbol: "C₆H₁₂O₆", meaning: "glucose — the fuel" },
          { symbol: "O₂", meaning: "oxygen — required for the aerobic route" },
          { symbol: "ATP", meaning: "the cell's energy currency (~36–38 per glucose, aerobically)" },
        ],
      },
      authoredExample: {
        prompt:
          "Why does aerobic respiration release far more ATP from one glucose molecule than fermentation does?",
        steps: [
          "Fermentation only partly breaks down glucose, stopping at ethanol or lactic acid, so most of the chemical energy stays locked in those products.",
          "Aerobic respiration fully oxidises glucose to CO₂ and water, releasing nearly all the stored energy.",
        ],
        answer:
          "Because aerobic respiration breaks glucose down completely (to CO₂ + H₂O), while fermentation leaves energy locked in ethanol/lactic acid.",
      },
    },

    // Fermentation (PYQ 8f7691ab yeast)
    {
      kind: "formula" as const,
      slug: "biochem-fermentation",
      name: "Fermentation — alcoholic and lactic acid",
      intuition:
        "When oxygen runs out, cells fall back on fermentation to keep making a little ATP. There are two everyday versions: yeast turns sugar into alcohol and fizz (the basis of bread and brewing), and your muscles turn sugar into lactic acid during hard exercise (the cause of the burn and fatigue).",
      definition:
        "Two fermentation routes, both starting from the pyruvate made in glycolysis:\n" +
        "- **Alcoholic fermentation** (in **yeast** and many microbes): glucose → **ethanol + carbon dioxide + 2 ATP**. The CO₂ makes bread rise; the ethanol is the alcohol in brewing.\n" +
        "- **Lactic-acid fermentation** (in **muscle cells** during heavy exercise, and in **Lactobacillus** making curd): glucose → **lactic acid + 2 ATP**. The build-up of lactic acid causes muscle fatigue.\n" +
        "Both yield only **2 ATP** per glucose — far less than aerobic respiration.",
      formula: {
        label: "Alcoholic fermentation (yeast, anaerobic)",
        latex:
          "C_6H_{12}O_6 \\;\\to\\; 2\\,C_2H_5OH + 2\\,CO_2 + 2\\,\\text{ATP}",
        symbols: [
          { symbol: "C₂H₅OH", meaning: "ethanol (ethyl alcohol)" },
          { symbol: "CO₂", meaning: "carbon dioxide — makes dough rise" },
          { symbol: "2 ATP", meaning: "the small energy yield without oxygen" },
        ],
      },
      authoredExample: {
        prompt:
          "A runner sprints so hard that her muscles run short of oxygen. Which fermentation product builds up and causes the muscle 'burn'?",
        steps: [
          "Muscle cells short of oxygen switch to lactic-acid fermentation.",
          "Glucose is converted to lactic acid (not ethanol — that is the yeast route).",
        ],
        answer: "Lactic acid builds up in the muscles.",
      },
      pyqExampleId: "8f7691ab-0865-437b-b60f-47067eaa6b53", // yeast fermentation products
      traps: [
        {
          title: "Yeast makes ethanol + CO₂; muscle makes lactic acid",
          body:
            "Oxygen-starved **yeast** → **ATP + CO₂ + ethanol**. Oxygen-starved **muscle** → **lactic acid**. The distractors swap these (lactic acid for yeast) or wrongly include O₂/pyruvate as products. Fermentation is **anaerobic**, so O₂ is never a product, and pyruvate is an intermediate, not the final product.",
        },
      ],
    },
  ],
};
