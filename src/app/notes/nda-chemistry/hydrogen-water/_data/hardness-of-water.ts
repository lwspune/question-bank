import type { SubtopicNote } from "@/app/notes/_types";

export const HARDNESS_OF_WATER_NOTE: SubtopicNote = {
  subtopicName: "Hardness and Purity of Water",
  title: "Hardness and Purity of Water",
  oneLineDefinition:
    "Hard water contains dissolved calcium and magnesium salts; temporary hardness (from bicarbonates) is removed by boiling, while permanent hardness (from sulphates and chlorides) needs chemical softening — and pure drinking water sits in a narrow pH band.",
  whyItMatters:
    "Five PYQs — the densest subtopic in the chapter — split between the temporary-versus-permanent hardness distinction (which ions, which salts, which removal method) and water-quality recall (pH range of drinking water, purest natural source). " +
    "The single highest-yield fact: boiling removes ONLY temporary hardness. Get the two columns of the hardness table straight and the marks follow.",
  concepts: [
    // foundation — what hardness is, the two types
    {
      kind: "reference" as const,
      slug: "temporary-vs-permanent-hardness",
      name: "Temporary versus permanent hardness",
      intuition:
        "Water is called hard when it carries dissolved calcium and magnesium salts — the salts that stop soap lathering and leave scale in kettles. " +
        "Hardness comes in two flavours depending on which salt is dissolved: bicarbonates give temporary hardness (it leaves when you boil the water), while sulphates and chlorides give permanent hardness (boiling does nothing).",
      definition:
        "The two types of hardness, by the dissolved salt:\n" +
        "- **Temporary hardness** — caused by the **bicarbonates (hydrogencarbonates) of calcium and magnesium**, i.e. Ca(HCO₃)₂ and Mg(HCO₃)₂. **Removed by boiling**, which precipitates the insoluble carbonate.\n" +
        "- **Permanent hardness** — caused by the **chlorides and sulphates of calcium and magnesium** (e.g. CaCl₂, CaSO₄, MgSO₄). **NOT removed by boiling.**\n" +
        "- The hardness-causing ions are always the metal cations **Ca²⁺ and Mg²⁺**.",
      table: {
        columns: ["Type", "Caused by", "Removed by boiling?"],
        rows: [
          {
            cells: ["Temporary", "Bicarbonates (hydrogencarbonates) of Ca and Mg", "Yes"],
            noteAmber: "Temporary hardness = hydrogencarbonates (bicarbonates) of Ca²⁺/Mg²⁺ — e.g. Mg(HCO₃)₂.",
            pyqExampleId: "7aaa0b4f-debf-4b1c-ae27-8c1b4e18b2ac",
          },
          {
            cells: ["Permanent", "Chlorides and sulphates of Ca and Mg", "No"],
            pyqExampleId: "8b892187-ca66-42b0-a478-f2d007849a18",
          },
        ],
        caption: "Bicarbonates → temporary (boil it off); chlorides/sulphates → permanent (needs chemical softening).",
      },
      pyqExampleId: "7aaa0b4f-debf-4b1c-ae27-8c1b4e18b2ac", // temporary hardness ion = hydrogencarbonates
      selfCheckExample: {
        prompt:
          "A sample of water leaves no scale after boiling and lathers freely with soap. Was its hardness temporary or permanent, and which salts were responsible?",
        steps: [
          "Boiling removed the hardness completely, so it was temporary hardness.",
          "Temporary hardness is caused by the bicarbonates (hydrogencarbonates) of calcium and magnesium.",
          "Boiling precipitates these as insoluble carbonates, softening the water.",
        ],
        answer: "Temporary hardness — caused by the bicarbonates (hydrogencarbonates) of calcium and magnesium.",
      },
      practiceSet: [
        { prompt: "Which salts cause temporary hardness?", answer: "Bicarbonates (hydrogencarbonates) of calcium and magnesium" },
        { prompt: "Which salts cause permanent hardness?", answer: "Chlorides and sulphates of calcium and magnesium" },
        { prompt: "Which two ions are responsible for hardness of water?", answer: "Ca²⁺ and Mg²⁺" },
        { prompt: "Is hardness from Mg(HCO₃)₂ temporary or permanent?", answer: "Temporary" },
        { prompt: "Is hardness from CaSO₄ temporary or permanent?", answer: "Permanent" },
      ],
      traps: [
        {
          title: "Hardness ions are Ca²⁺ and Mg²⁺, not Na⁺",
          body:
            "Hardness is caused by **calcium and magnesium** salts. Sodium salts make water alkaline but do not cause hardness — a Na⁺ option is a distractor.",
        },
      ],
    },

    // removal of hardness
    {
      kind: "reference" as const,
      slug: "removing-hardness",
      name: "Removing hardness of water",
      intuition:
        "Temporary hardness is easy — just boil the water and the bicarbonates fall out as carbonate scale. Permanent hardness needs a chemical: washing soda, the ion-exchange resin, or Calgon all swap out or lock up the Ca²⁺ and Mg²⁺. " +
        "The catch the bank loves: boiling does NOTHING to permanent hardness.",
      definition:
        "How each type is removed:\n" +
        "- **Boiling** — removes **temporary** hardness only (precipitates Ca/Mg carbonates). Does **NOT** remove permanent hardness.\n" +
        "- **Treatment with washing soda (Na₂CO₃)** — removes **both** temporary and permanent hardness by precipitating Ca²⁺/Mg²⁺ as carbonates.\n" +
        "- **Ion-exchange method** — a resin swaps the hardness ions for harmless ones; removes **both** types.\n" +
        "- **Calgon's method** — sodium hexametaphosphate locks Ca²⁺/Mg²⁺ into a soluble complex; removes **both** types.\n" +
        "So permanent hardness is removed by washing soda, ion exchange and Calgon — but **never by boiling alone**.",
      table: {
        columns: ["Method", "Removes temporary?", "Removes permanent?"],
        rows: [
          {
            cells: ["Boiling", "Yes", "No"],
            noteAmber: "Boiling cannot remove permanent hardness — this is the most-tested single fact in the chapter.",
            pyqExampleId: "a8897c5d-36f9-440f-838b-e19e74656fc8",
          },
          { cells: ["Washing soda (Na₂CO₃)", "Yes", "Yes"] },
          { cells: ["Ion-exchange method", "Yes", "Yes"] },
          { cells: ["Calgon's method", "Yes", "Yes"] },
        ],
        caption: "Only boiling is selective (temporary-only); washing soda, ion exchange and Calgon clear both.",
      },
      pyqExampleId: "a8897c5d-36f9-440f-838b-e19e74656fc8", // permanent hardness NOT removed by boiling
      selfCheckExample: {
        prompt:
          "Boiling a water sample reduces its hardness but does not remove it completely. Explain what kind of hardness remains and name one method to remove it.",
        steps: [
          "Boiling removes only temporary hardness, so the leftover hardness is permanent.",
          "Permanent hardness comes from chlorides and sulphates of calcium and magnesium.",
          "It can be removed by treatment with washing soda, the ion-exchange method, or Calgon's method.",
        ],
        answer: "The remaining hardness is permanent; remove it with washing soda (or ion exchange / Calgon).",
      },
      practiceSet: [
        { prompt: "Which method removes ONLY temporary hardness?", answer: "Boiling" },
        { prompt: "Does boiling remove permanent hardness?", answer: "No" },
        { prompt: "Name one method that removes permanent hardness.", answer: "Washing soda (or ion exchange / Calgon)" },
        { prompt: "How does washing soda soften water?", answer: "It precipitates Ca²⁺/Mg²⁺ as insoluble carbonates" },
        { prompt: "Which method uses a resin to swap out hardness ions?", answer: "Ion-exchange method" },
      ],
      traps: [
        {
          title: "Boiling cannot remove permanent hardness",
          body:
            "A 'which method CANNOT remove permanent hardness' question is answered by **boiling**. Washing soda, Calgon and ion exchange all work on permanent hardness; boiling does not.",
        },
      ],
    },

    // purity / quality of drinking water
    {
      kind: "reference" as const,
      slug: "purity-of-drinking-water",
      name: "Purity and quality of drinking water",
      intuition:
        "Beyond hardness, the bank tests two water-quality facts: the pH band that drinking water should sit in, and which natural source is the purest. " +
        "Rain water is distilled by nature — evaporation leaves the dissolved salts behind — so it is the purest natural source, while safe drinking water keeps to a gently-near-neutral pH.",
      definition:
        "The drinking-water quality facts:\n" +
        "- **Desirable pH range of drinking water** — about **6.5 to 8.5** (close to neutral, slightly either side).\n" +
        "- **Purest natural source of water** — **rain water**; it is naturally distilled by evaporation, leaving dissolved salts behind.\n" +
        "- **River/ground/sea water** all carry more dissolved salts, so none is as pure as rain water before it touches the ground.",
      table: {
        columns: ["Quality marker", "Value / fact"],
        rows: [
          {
            cells: ["Desirable pH of drinking water", "About 6.5 to 8.5"],
            noteAmber: "Drinking-water pH band = 6.5 to 8.5 — near neutral, not strongly acidic or alkaline.",
            pyqExampleId: "3ef8be52-874f-4173-b255-ab31699c033d",
          },
          {
            cells: ["Purest natural source", "Rain water (naturally distilled)"],
            pyqExampleId: "5ad0c115-a66c-441e-a6bc-3371479572fe",
          },
        ],
        caption: "Rain water is the purest natural source; safe drinking pH is about 6.5 to 8.5.",
      },
      pyqExampleId: "3ef8be52-874f-4173-b255-ab31699c033d", // desirable pH range of drinking water
      selfCheckExample: {
        prompt:
          "Why is rain water regarded as the purest natural source of water, even though it can still pick up some impurities?",
        steps: [
          "Rain forms when surface water evaporates, leaving dissolved salts and solids behind.",
          "The water vapour then condenses, so freshly fallen rain is essentially distilled water.",
          "It only becomes impure after it touches the ground and dissolves minerals, so as a natural source it is the purest.",
        ],
        answer: "Because rain is naturally distilled by evaporation, leaving dissolved salts behind.",
      },
      practiceSet: [
        { prompt: "Desirable pH range for drinking water?", answer: "About 6.5 to 8.5" },
        { prompt: "Which is the purest natural source of water?", answer: "Rain water" },
        { prompt: "Why is rain water pure?", answer: "It is naturally distilled by evaporation" },
        { prompt: "Is a drinking-water pH of 4 acceptable?", answer: "No — too acidic; the range is about 6.5 to 8.5" },
      ],
      traps: [
        {
          title: "Drinking-water pH is near neutral",
          body:
            "The desirable pH band is **6.5 to 8.5** — close to neutral. Options far from neutral (like 4 to 5 or 9 to 11) are wrong.",
        },
        {
          title: "Rain water, not river or sea water, is purest",
          body:
            "**Rain water** is the purest natural source because it is naturally distilled. River and sea water carry more dissolved salts.",
        },
      ],
    },
  ],
};
