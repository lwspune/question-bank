import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PB_HORMONES_NOTE: SubtopicNote = {
  subtopicName: "Plant Hormones and Movements",
  title: "Plant Hormones and Movements",
  oneLineDefinition:
    "Plants have no nerves, so they control growth with chemicals called plant hormones, and they respond to light, gravity, water and chemicals by growing towards or away from them.",
  whyItMatters:
    "Two questions in the bank, both EASY: the hormone that makes mature leaves and fruits fall, and the stimulus a sunflower follows. Five hormones and four tropisms cover every option either question can print.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spipbho-hormones",
      name: "The five plant hormones",
      intuition:
        "Four plant hormones push growth forward in different ways. One, abscisic acid, does the opposite: it slows growth down and makes old leaves and ripe fruit drop.",
      definition:
        "- **Auxin**: made at the shoot tip; makes cells grow longer; bends the shoot towards light.\n" +
        "- **Gibberellin**: makes the **stem grow long**.\n" +
        "- **Cytokinin**: promotes **cell division**; found where cells divide fast, as in fruits and seeds.\n" +
        "- **Abscisic acid**: **stops growth**; makes mature **leaves and fruits fall** (abscission) and leaves wilt.\n" +
        "- **Ethylene**: a gas that **ripens fruit**.",
      table: {
        columns: ["Hormone", "Main job", "Promotes or stops growth"],
        rows: [
          { cells: ["Auxin", "Cell lengthening, bending towards light", "Promotes"] },
          { cells: ["Gibberellin", "Stem lengthening", "Promotes"] },
          { cells: ["Cytokinin", "Cell division", "Promotes"] },
          {
            cells: ["Abscisic acid", "Fall of leaves and fruits, wilting", "Stops"],
            noteAmber: "Abscisic acid is the one growth stopper among them.",
          },
          { cells: ["Ethylene", "Ripening of fruit", "Ripens"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) auxin: bends the shoot to light (b) gibberellin: stem growth (c) cytokinin: makes leaves fall (d) ethylene: ripens fruit",
        steps: [
          "Auxin, gibberellin and ethylene are matched rightly.",
          "Cytokinin promotes cell division. Leaf fall is caused by abscisic acid.",
        ],
        answer: "(c) is wrong: cytokinin promotes cell division.",
      },
      practiceSet: [
        { prompt: "Which plant hormone promotes cell division?", answer: "Cytokinin" },
        { prompt: "Which plant hormone is a gas that ripens fruit?", answer: "Ethylene" },
        { prompt: "Which hormone makes a plant's stem grow longer?", answer: "Gibberellin" },
        { prompt: "Which hormone, made at the shoot tip, makes the shoot bend towards light?", answer: "Auxin" },
      ],
      pyqExampleId: "f8adef75-8be6-466d-afe7-15aa4b34c910",
      traps: [
        {
          title: "Thinking every plant hormone promotes growth",
          body: "Abscisic acid stops growth and makes leaves and fruits fall. It is the inhibitor; auxin, gibberellin and cytokinin all promote growth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipbho-tropisms",
      name: "Tropisms: growing towards or away",
      intuition:
        "A tropism is a slow bending of a plant part towards a stimulus or away from it. The name of the tropism is the name of the stimulus.",
      definition:
        "- **Phototropism**: response to **light**. Shoots bend towards light; sunflowers turn to follow the sun through the day.\n" +
        "- **Geotropism**: response to **gravity**. Roots grow down, shoots grow up.\n" +
        "- **Hydrotropism**: response to **water**. Roots grow towards water.\n" +
        "- **Chemotropism**: response to **chemicals**. The pollen tube grows towards the ovule.\n" +
        "- Touch-me-not (Mimosa) folding its leaves when touched is a quick movement, not growth, and not a tropism.",
      table: {
        columns: ["Tropism", "Stimulus", "Example"],
        rows: [
          {
            cells: ["Phototropism", "Light", "A shoot bending to a window; a sunflower following the sun"],
            noteAmber: "A question may call the stimulus 'day or night': it means light.",
          },
          { cells: ["Geotropism", "Gravity", "Roots growing downwards"] },
          { cells: ["Hydrotropism", "Water", "Roots growing towards wet soil"] },
          { cells: ["Chemotropism", "Chemicals", "Pollen tube growing to the ovule"] },
        ],
      },
      selfCheckExample: {
        prompt: "A pollen tube grows down the style towards the ovule. Which tropism is this?",
        steps: ["The ovule gives out chemicals.", "Growth towards chemicals is chemotropism."],
        answer: "Chemotropism",
      },
      practiceSet: [
        { prompt: "Roots grow downwards into the soil. Which stimulus are they responding to?", answer: "Gravity (geotropism)" },
        { prompt: "What is the response of a plant part to water called?", answer: "Hydrotropism" },
        { prompt: "A plant on a windowsill bends towards the window. Which tropism is this?", answer: "Phototropism" },
      ],
      pyqExampleId: "c7e8632e-750a-492a-b320-d07fcccfebab",
      traps: [
        {
          title: "Touch-me-not as a tropism",
          body: "The leaves of touch-me-not fold in seconds when touched, by a change of water in their cells. It is a quick movement without growth, so it is not a tropism.",
        },
        {
          title: "Shoots and roots answer gravity the same way",
          body: "Roots grow towards gravity (downwards) and shoots grow away from it (upwards). Both are geotropism, in opposite directions.",
        },
      ],
    },
  ],
};
