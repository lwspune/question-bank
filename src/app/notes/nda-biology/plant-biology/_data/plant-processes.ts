import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Transpiration, Tropisms and Plant Processes",
  title: "Plant Processes — Gas Exchange, Transpiration and Tropisms",
  oneLineDefinition:
    "Photosynthesis and respiration are linked by oxygen; transpiration is water loss mostly through the lower-surface stomata; and tropisms are directional growth responses (shoots up = negative geotropism).",
  whyItMatters:
    "3 PYQs, but high quality — including the chapter's one HARD question (the vaseline-on-leaf transpiration experiment, 2021). " +
    "These are 'Apply' questions: you reason about a sequence (photosynthesis makes O₂ → respiration uses it) or a direction (shoots grow against gravity, water leaves through lower stomata), not a single recalled fact.",
  concepts: [
    // PHOTOSYNTHESIS–RESPIRATION GAS LINK
    {
      kind: "formula" as const,
      slug: "plant-photosynthesis-respiration-link",
      name: "The oxygen link — photosynthesis feeds respiration",
      intuition:
        "Two opposite plant processes hand a gas back and forth. Photosynthesis MAKES oxygen as a by-product. Respiration — the energy-releasing process in every living cell — USES that oxygen. So the gaseous product of one process is the requirement of the other.",
      definition:
        "**Photosynthesis** produces **oxygen** as a gaseous by-product. **Respiration** is the vital, energy-RELEASING process that **uses oxygen** (and glucose) to make ATP. " +
        "So oxygen links them: photosynthesis (product = O₂) → respiration (requires O₂).",
      authoredExample: {
        prompt:
          "Name a plant process whose gaseous PRODUCT is required by another energy-releasing process. Give both the process and the gas.",
        steps: [
          "Photosynthesis makes oxygen as a gaseous product.",
          "Respiration is the energy-releasing process that needs that oxygen.",
          "So the pair is photosynthesis (product) → respiration (energy release), linked by oxygen.",
        ],
        answer: "Photosynthesis and oxygen — the O₂ it makes is used by respiration.",
      },
      selfCheckExample: {
        prompt:
          "Which energy-releasing process consumes the oxygen made by photosynthesis?",
        steps: [
          "Photosynthesis produces oxygen.",
          "Cellular respiration releases energy and consumes oxygen.",
        ],
        answer: "Cellular respiration.",
      },
      practiceSet: [
        { prompt: "Which gas is the product of photosynthesis AND a requirement of respiration?", answer: "Oxygen" },
        { prompt: "Which process releases energy using oxygen?", answer: "Respiration" },
        { prompt: "Photosynthesis stores energy; respiration does what with it?", answer: "Releases it (as ATP)" },
      ],
      pyqExampleId: "624d0de3-d88d-424f-b9b8-3932243f822a", // photosynthesis + oxygen
      traps: [
        {
          title: "Photosynthesis + Oxygen is the linked pair",
          body:
            "The question pairs a process with its gaseous product that another vital process needs. The right pair is **photosynthesis and oxygen** — not 'respiration and nitric oxide' or 'germination and CO₂'. Photosynthesis makes O₂; respiration uses it.",
        },
      ],
    },

    // TROPISMS — shoots negative geotropic (features the shoot PYQ)
    {
      kind: "formula" as const,
      slug: "plant-tropisms",
      name: "Tropisms — directional growth responses",
      intuition:
        "A tropism is growth that bends in response to a direction in the environment. Name it by the stimulus (geo = gravity, photo = light, hydro = water, chemo = chemical) and the sign (positive = towards, negative = away). " +
        "A shoot grows UP, AWAY from gravity — that's NEGATIVE geotropism. A root grows DOWN, towards gravity — positive geotropism.",
      definition:
        "A **tropism** is a directional growth response to a stimulus:\n" +
        "- **Geotropism (gravitropism)** — response to gravity. **Shoots = negatively geotropic** (grow UP, away from gravity); **roots = positively geotropic** (grow DOWN, towards gravity).\n" +
        "- **Phototropism** — response to light. Shoots are **positively phototropic** (bend towards light).\n" +
        "- **Hydrotropism** — towards water; **chemotropism** — towards a chemical.\n" +
        "Naming rule: stimulus + sign (positive = towards, negative = away).",
      visualizationSlug: "plant-tropism-bending",
      authoredExample: {
        prompt:
          "A bean shoot grows straight upward, against the pull of gravity. Name this response precisely (stimulus + sign).",
        steps: [
          "The stimulus is gravity → geotropism (gravitropism).",
          "The shoot grows AWAY from gravity (upward).",
          "Away = negative.",
        ],
        answer: "Negative geotropism (negatively geotropic).",
      },
      selfCheckExample: {
        prompt:
          "A root grows downward into the soil, towards gravity. Name the tropism and its sign.",
        steps: [
          "Stimulus is gravity → geotropism.",
          "The root grows TOWARDS gravity (downward) = positive.",
        ],
        answer: "Positive geotropism.",
      },
      practiceSet: [
        { prompt: "Shoots growing upward against gravity show which tropism?", answer: "Negative geotropism", method: "away from gravity = negative" },
        { prompt: "Roots growing down towards gravity show which tropism?", answer: "Positive geotropism" },
        { prompt: "A shoot bending towards a window shows which tropism?", answer: "Positive phototropism" },
        { prompt: "Growth towards water is called?", answer: "Hydrotropism" },
      ],
      pyqExampleId: "d5cdeb58-8e05-4b83-b57b-da0a496ff1ee", // shoots upward = negatively geotropic
      traps: [
        {
          title: "Shoot up = NEGATIVE geotropism (not negative phototropism)",
          body:
            "A shoot's upward growth against gravity is **negatively geotropic**. The distractor 'negatively phototropic' is wrong — shoots are POSITIVELY phototropic (towards light). The upward-against-gravity fact is specifically negative geotropism.",
        },
      ],
    },

    // TRANSPIRATION — vaseline experiment (HARD)
    {
      kind: "formula" as const,
      slug: "plant-transpiration",
      name: "Transpiration — water loss through lower-surface stomata",
      intuition:
        "Transpiration is the evaporation of water from a plant, mostly through tiny pores called stomata. In a typical dicot leaf, MOST stomata are on the LOWER surface. So if you want to slow water loss the most, you seal the lower surface — that leaf keeps its water longest.",
      definition:
        "**Transpiration** is loss of water vapour from the plant, chiefly through the **stomata** on the leaf. In most dicot leaves, **stomata are concentrated on the LOWER surface**, so most transpiration happens there.\n" +
        "- Coating the **lower** surface (where most stomata are) blocks the MOST transpiration → that leaf dries up **last**.\n" +
        "- Coating the **upper** surface blocks little (few stomata there) → that leaf still loses water fast.",
      authoredExample: {
        prompt:
          "Vaseline is smeared on the LOWER surface of leaf X and the UPPER surface of leaf Y on the same unwatered dicot plant; leaf Z is untouched. Which leaf stays moist the longest?",
        steps: [
          "Most stomata in a dicot leaf are on the LOWER surface.",
          "Leaf X has its lower (stomata-rich) surface sealed → biggest cut in water loss.",
          "Leaf Y's upper surface is sealed → few stomata blocked, water still escapes below.",
          "Leaf Z loses water from both surfaces normally.",
        ],
        answer: "Leaf X (lower surface coated) dries up last — its main stomata are blocked.",
      },
      selfCheckExample: {
        prompt:
          "Why does sealing the upper surface of a dicot leaf barely slow its water loss?",
        steps: [
          "Transpiration is mainly through stomata.",
          "In dicots, few stomata are on the upper surface; most are on the lower surface.",
          "Sealing the upper surface blocks only the few upper stomata, so water still escapes below.",
        ],
        answer: "Because most stomata are on the lower surface, not the upper.",
      },
      practiceSet: [
        { prompt: "Through which structures does most transpiration occur?", answer: "Stomata" },
        { prompt: "In a typical dicot leaf, which surface has more stomata?", answer: "The lower surface" },
        { prompt: "Coating which surface slows water loss the most in a dicot leaf?", answer: "The lower surface", method: "most stomata are there" },
      ],
      pyqExampleId: "49fc1bf7-4778-4fb6-b833-aaad92649192", // vaseline experiment — leaf 2 (lower coated) dries last
      traps: [
        {
          title: "Lower surface coated = dries up LAST",
          body:
            "Because most dicot stomata are on the lower surface, sealing the LOWER surface cuts water loss the most, so that leaf dries up **last**. The trap is to pick the upper-coated leaf — but sealing the stomata-poor upper surface barely helps.",
        },
      ],
    },
  ],
};
