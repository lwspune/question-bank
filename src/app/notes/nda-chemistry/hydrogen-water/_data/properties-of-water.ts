import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_OF_WATER_NOTE: SubtopicNote = {
  subtopicName: "Properties and Anomalous Behaviour of Water",
  title: "Properties and Anomalous Behaviour of Water",
  oneLineDefinition:
    "Water is a bent, polar molecule held together by hydrogen bonds — and that hydrogen bonding gives it a set of famous anomalies: maximum density at 4 degrees C, very high latent heats, and solid ice that floats on liquid water.",
  whyItMatters:
    "Three PYQs, all 'which property statement is correct / NOT correct' recall. The anomalies are the whole game: water is densest at 4 degrees C (277 K), its latent heats are high (not low), and ice is less dense than water so it floats. " +
    "These come from hydrogen bonding — get the cause and every statement-trap resolves.",
  concepts: [
    // structure foundation
    {
      kind: "reference" as const,
      slug: "structure-and-hydrogen-bonding",
      name: "Structure of water and hydrogen bonding",
      intuition:
        "A water molecule is H₂O — one oxygen sharing electrons with two hydrogens. Oxygen pulls the shared electrons towards itself, so the molecule has a slightly negative oxygen end and slightly positive hydrogen ends: it is polar. " +
        "These oppositely charged ends attract neighbouring molecules through hydrogen bonds, and almost every special property of water traces back to that network of hydrogen bonds.",
      definition:
        "The structural facts that explain everything else:\n" +
        "- **Shape** — **bent (angular)**, with an H–O–H bond angle of about **104.5 degrees**.\n" +
        "- **Polarity** — **polar**: oxygen is the negative end, the two hydrogens the positive ends.\n" +
        "- **Hydrogen bonding** — each molecule can hydrogen-bond to neighbours, building an extensive network.\n" +
        "- **Universal solvent** — because it is polar, water dissolves many ionic and polar substances, earning it the name **universal solvent**.\n" +
        "- The strong hydrogen-bond network is the reason for water's **high boiling point, high latent heats, and its density anomaly**.",
      table: {
        columns: ["Feature", "Description"],
        rows: [
          { cells: ["Molecular formula", "H₂O — one oxygen, two hydrogens"] },
          { cells: ["Shape", "Bent / angular, bond angle about 104.5 degrees"] },
          { cells: ["Polarity", "Polar — negative O end, positive H ends"] },
          {
            cells: ["Intermolecular force", "Hydrogen bonding (strong, extensive network)"],
            noteAmber: "Hydrogen bonding is the single cause of water's anomalies — anchor every property statement to it.",
          },
          { cells: ["Solvent power", "Universal solvent (dissolves polar and ionic substances)"] },
        ],
        caption: "Bent + polar + hydrogen-bonded — the structure that drives the anomalies.",
      },
      pyqExampleId: "3fdceca2-ed0c-47ef-9e18-eda80fad5f87", // which statement about water is NOT correct
      selfCheckExample: {
        prompt: "Why is water called the universal solvent, and what shape is the water molecule?",
        steps: [
          "Water is a polar molecule — a negative oxygen end and positive hydrogen ends.",
          "Polar water surrounds and pulls apart ions and other polar molecules, dissolving a huge range of substances.",
          "Its shape is bent (angular), with an H–O–H angle of about 104.5 degrees.",
        ],
        answer: "It dissolves most polar and ionic substances because it is polar; the molecule is bent (about 104.5 degrees).",
      },
      practiceSet: [
        { prompt: "What is the shape of a water molecule?", answer: "Bent (angular), about 104.5 degrees" },
        { prompt: "Is water polar or non-polar?", answer: "Polar" },
        { prompt: "Which intermolecular force holds water molecules together?", answer: "Hydrogen bonding" },
        { prompt: "Why is water called the universal solvent?", answer: "Being polar, it dissolves many ionic and polar substances" },
      ],
      traps: [
        {
          title: "Water is bent, not linear",
          body:
            "Water is a **bent** molecule (about 104.5 degrees), not linear. The lone pairs on oxygen push the two O–H bonds closer together — a statement that water is linear is wrong.",
        },
      ],
    },

    // anomalous behaviour — the high-yield concept
    {
      kind: "reference" as const,
      slug: "anomalous-behaviour-of-water",
      name: "Anomalous behaviour of water",
      intuition:
        "Most liquids get steadily denser as they cool. Water does not: as it cools toward freezing the hydrogen-bonded molecules start arranging into an open, cage-like structure, so below 4 degrees C the water actually expands. " +
        "The result is that water is densest at 4 degrees C, ice is less dense than liquid water and floats, and water soaks up or releases a lot of heat when it changes state.",
      definition:
        "The anomalies the bank tests:\n" +
        "- **Maximum density at 4 degrees C (277 K)** — water is densest at 4 degrees C, not at 0 degrees C. Below this it expands as it cools.\n" +
        "- **Ice floats** — solid ice is **less dense** than liquid water, so it floats; this is why lakes freeze top-down and aquatic life survives below.\n" +
        "- **High latent heats** — water has a **high latent heat of fusion** and a **high latent heat of vaporisation** (a statement calling either 'very low' is wrong).\n" +
        "- **High specific heat and boiling point** — it takes a lot of heat to warm or boil water, because hydrogen bonds must be overcome.\n" +
        "- **Boiling gives water vapour** — when water boils, the bubbles rising to the surface are **water vapour** (gaseous water), not air or dissolved gases.",
      table: {
        columns: ["Anomaly", "The fact", "Cause"],
        rows: [
          {
            cells: ["Maximum density", "Densest at 4 degrees C (277 K)", "Open hydrogen-bonded structure forms below 4 degrees C"],
            noteAmber: "Maximum density of liquid water is at 4 degrees C = 277 K, NOT 0 degrees C / 273 K.",
            pyqExampleId: "41f26045-49c9-49f0-8062-03fe13af4017",
          },
          { cells: ["Ice floats", "Solid ice is less dense than liquid water", "Open cage structure of ice is less compact"] },
          {
            cells: ["Latent heats", "High latent heat of fusion AND vaporisation", "Hydrogen bonds must be broken to change state"],
            noteAmber: "Latent heat of fusion of water is HIGH, not low — that statement is the false one.",
            pyqExampleId: "3fdceca2-ed0c-47ef-9e18-eda80fad5f87",
          },
          {
            cells: ["Boiling bubbles", "Bubbles are water vapour", "Liquid water turning to gas"],
            pyqExampleId: "bdc42b9a-1cef-484c-a6c6-d0ce9d99143b",
          },
        ],
        caption: "Densest at 4 degrees C, ice floats, high latent heats — all from hydrogen bonding.",
      },
      pyqExampleId: "41f26045-49c9-49f0-8062-03fe13af4017", // max density temperature
      selfCheckExample: {
        prompt:
          "A pond is freezing over in winter. Explain, using the density behaviour of water, why fish can still survive at the bottom.",
        steps: [
          "Water is densest at 4 degrees C, so the densest water sinks to the bottom and stays at about 4 degrees C.",
          "As the surface cools below 4 degrees C it becomes less dense and stays on top, eventually freezing.",
          "Ice is less dense than liquid water, so it floats and insulates the water beneath, which remains liquid at around 4 degrees C — warm enough for fish.",
        ],
        answer: "The bottom water stays near 4 degrees C (its densest point) under a floating ice layer, so fish survive.",
      },
      practiceSet: [
        { prompt: "At what temperature is liquid water densest?", answer: "4 degrees C (277 K)" },
        { prompt: "Is ice more or less dense than liquid water?", answer: "Less dense — that is why it floats" },
        { prompt: "Is the latent heat of fusion of water high or low?", answer: "High" },
        { prompt: "When water boils, the bubbles are made of?", answer: "Water vapour" },
        { prompt: "Why does water have a high boiling point?", answer: "Strong hydrogen bonds must be overcome" },
      ],
      traps: [
        {
          title: "Max density is at 4 degrees C, not 0 degrees C",
          body:
            "Liquid water reaches **maximum density at 4 degrees C (277 K)**, then expands as it cools further to 0 degrees C. An option saying maximum density is at 0 degrees C / 273 K is wrong.",
        },
        {
          title: "Latent heats are HIGH",
          body:
            "Water's latent heat of fusion and latent heat of vaporisation are both **high** (hydrogen bonds resist melting and boiling). The statement 'latent heat of fusion of water is very low' is the incorrect one.",
        },
        {
          title: "Boiling bubbles are vapour, not air",
          body:
            "The bubbles that rise when water boils are **water vapour** (gaseous water), not trapped air or dissolved oxygen.",
        },
      ],
    },
  ],
};
