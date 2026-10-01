import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_HW_WATER_NOTE: SubtopicNote = {
  subtopicName: "Water: Hardness and Properties",
  title: "Water: Hardness, Drying Agents and Density",
  oneLineDefinition:
    "Temporary and permanent hardness and how each is removed, the drying agents that take water out of gases, and why water is densest at 4 °C.",
  whyItMatters:
    "Five CDS questions. Three are on hard water, one on the drying agent in a guard tube (HARD) and one on how water's density changes between 0 and 4 °C.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschhw-hardness",
      name: "Temporary and permanent hardness",
      intuition:
        "Hard water carries dissolved calcium and magnesium salts, which stop soap from lathering. If the salts are hydrogen carbonates, boiling breaks them down and the hardness goes: that is temporary hardness. Chlorides and sulphates do not break down on boiling, so that hardness is permanent and needs a chemical such as washing soda.",
      definition:
        "The two kinds:\n" +
        "- **Temporary hardness**: **hydrogen carbonates (bicarbonates) of calcium and magnesium**, Ca(HCO₃)₂ and Mg(HCO₃)₂. Removed by **boiling** (they become insoluble carbonates) or by adding lime (Clark's method).\n" +
        "- **Permanent hardness**: **chlorides and sulphates of calcium and magnesium** (CaCl₂, MgSO₄). Boiling does not remove it.\n" +
        "- Permanent hardness is removed by **washing soda, Na₂CO₃**, which precipitates calcium and magnesium as carbonates, or by **ion exchange** (permutit) or **Calgon** (sodium hexametaphosphate).\n" +
        "- Hard water forms **scum** with soap because calcium and magnesium make insoluble salts with it.",
      table: {
        columns: ["Kind", "Caused by", "Removed by"],
        rows: [
          {
            cells: ["Temporary", "Ca(HCO₃)₂, Mg(HCO₃)₂", "Boiling; lime (Clark's method)"],
            pyqExampleId: "2886965a-c3cf-4f5a-b3d4-3c38bbc2a0f2",
          },
          {
            cells: ["Permanent", "Chlorides and sulphates of Ca and Mg", "Washing soda, ion exchange, Calgon"],
            pyqExampleId: "f643765e-2db7-463b-8731-7b14444d80bb",
          },
        ],
      },
      pyqExampleId: "b2ffe900-25f4-4c96-abcb-cf34ecea3f8f",
      selfCheckExample: {
        prompt: "A water sample stops being hard after it is boiled. What kind of hardness did it have, and which salts caused it?",
        steps: [
          "Hardness removed by boiling is temporary hardness.",
          "Boiling breaks down hydrogen carbonates into insoluble carbonates.",
        ],
        answer: "Temporary hardness, caused by calcium and magnesium hydrogen carbonates.",
      },
      practiceSet: [
        { prompt: "Why does hard water not lather well with soap?", answer: "Calcium and magnesium ions form an insoluble scum with soap" },
        { prompt: "What is Calgon?", answer: "Sodium hexametaphosphate, used to soften water" },
        { prompt: "Does boiling remove the hardness caused by magnesium sulphate?", answer: "No — that is permanent hardness" },
      ],
      traps: [
        {
          title: "Bicarbonates are temporary, chlorides and sulphates permanent",
          body: "Boiling removes only the **hydrogen carbonate** hardness. **CaCl₂** and **MgSO₄** cause permanent hardness, which boiling leaves behind.",
        },
        {
          title: "Washing soda, not baking soda, softens water",
          body: "Permanent hardness is removed with **washing soda, Na₂CO₃**. Baking soda (NaHCO₃) and caustic soda are distractors.",
        },
        {
          title: "Hardness is calcium and magnesium, not sodium",
          body: "Sodium salts do not make water hard. Hardness comes from dissolved **calcium and magnesium** compounds.",
        },
        {
          title: "Calcium is in both kinds",
          body: "Temporary hardness is calcium (and magnesium) **hydrogen carbonate**; permanent hardness is calcium (and magnesium) **chloride and sulphate**. The anion, not the metal, tells them apart.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschhw-drying",
      name: "Drying agents",
      intuition:
        "A drying agent takes up water vapour from a gas. The rule is that it must not react with the gas being dried. An acidic drying agent cannot dry a basic gas such as ammonia, and a basic one cannot dry an acidic gas.",
      definition:
        "The common drying agents:\n" +
        "- **Anhydrous calcium chloride**: packed in a **guard tube**; dries most neutral and acidic gases, including **HCl**. It is not used for ammonia, with which it combines.\n" +
        "- **Concentrated sulphuric acid**: dries acidic and neutral gases, but **not ammonia** (it reacts with it).\n" +
        "- **Quicklime (CaO)**: dries **ammonia**.\n" +
        "- **Phosphorus pentoxide (P₄O₁₀)**: a very strong drying agent for neutral and acidic gases.",
      table: {
        columns: ["Drying agent", "Dries", "Not used for"],
        rows: [
          {
            cells: ["Anhydrous calcium chloride", "HCl and most neutral gases", "Ammonia"],
            pyqExampleId: "ec97950c-4a7e-4a7f-a4c5-b09826459908",
          },
          { cells: ["Concentrated H₂SO₄", "Acidic and neutral gases", "Ammonia"] },
          { cells: ["Quicklime (CaO)", "Ammonia", "Acidic gases such as HCl"] },
          { cells: ["Phosphorus pentoxide", "Neutral and acidic gases", "Ammonia"] },
        ],
      },
      pyqExampleId: "ec97950c-4a7e-4a7f-a4c5-b09826459908",
      practiceSet: [
        { prompt: "Which drying agent is used for ammonia gas?", answer: "Quicklime (CaO)" },
        { prompt: "Why is concentrated sulphuric acid not used to dry ammonia?", answer: "It reacts with ammonia, a base" },
      ],
      traps: [
        {
          title: "A drying agent must not react with the gas",
          body: "Concentrated sulphuric acid absorbs water well but reacts with ammonia, so it cannot dry it. Choose a drying agent of the same acid-base nature as the gas.",
        },
        {
          title: "Calcium chloride, not calcium fluoride",
          body: "The guard-tube drying agent is **anhydrous calcium chloride**, which absorbs moisture strongly. Calcium bromide, iodide and fluoride are distractors.",
        },
        {
          title: "Ammonia needs a basic drying agent",
          body: "Ammonia is a base, so it is dried over **quicklime**. Acidic agents (H₂SO₄, P₄O₁₀) and calcium chloride combine with it.",
        },
        {
          title: "Anhydrous means without water",
          body: "Only the **anhydrous** salt can dry a gas. Calcium chloride that has already taken up water cannot absorb more.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschhw-anomalous",
      name: "Water's maximum density at 4 °C",
      intuition:
        "Most liquids shrink steadily as they cool. Water shrinks only down to 4 °C. Below that its molecules start lining up into the open, hydrogen-bonded pattern of ice, so it expands again. That is why ice floats and why a pond freezes from the top.",
      definition:
        "The facts:\n" +
        "- Water is **densest at 4 °C**.\n" +
        "- Heating water from **0 °C to 4 °C**, it **contracts**, so its **density increases**. Above 4 °C it expands like other liquids.\n" +
        "- **Ice is less dense than water** (an open, hydrogen-bonded structure), so it **floats**.\n" +
        "- In winter the water at 4 °C sinks to the bottom of a lake, the surface freezes first, and life survives below.",
      table: {
        columns: ["Temperature change", "Volume", "Density"],
        rows: [
          {
            cells: ["0 °C → 4 °C (heating)", "Decreases", "Increases"],
            pyqExampleId: "4fb5c65c-b554-4e62-af32-7c001787427a",
          },
          { cells: ["Above 4 °C (heating)", "Increases", "Decreases"] },
          { cells: ["Water → ice at 0 °C", "Increases", "Decreases (ice floats)"] },
        ],
      },
      pyqExampleId: "4fb5c65c-b554-4e62-af32-7c001787427a",
      practiceSet: [
        { prompt: "Why does ice float on water?", answer: "Ice is less dense than liquid water" },
        { prompt: "Why does a lake freeze from the top down?", answer: "Water at 4 °C, being densest, sinks; the colder water stays on top and freezes" },
      ],
      traps: [
        {
          title: "Water expands below 4 °C",
          body: "Between 0 and 4 °C water behaves oddly: cooling makes it **expand**, and heating makes it **contract**. Above 4 °C it behaves like other liquids.",
        },
        {
          title: "Density does not return to its old value at 4 °C",
          body: "From 0 to 4 °C the density simply **rises**, to a maximum at 4 °C. It does not rise and then fall back to where it started within that range.",
        },
        {
          title: "Ice is lighter than water",
          body: "Ice is less dense than liquid water, which is why icebergs float. For most substances the solid is denser than the liquid; water is the exception.",
        },
        {
          title: "4 °C, not 0 °C",
          body: "Water is densest at **4 °C**, not at its freezing point. At 0 °C, both as water and as ice, it is less dense.",
        },
      ],
    },
  ],
};
