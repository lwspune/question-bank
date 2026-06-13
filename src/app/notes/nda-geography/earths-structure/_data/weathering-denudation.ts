import type { SubtopicNote } from "@/app/notes/_types";

export const WEATHERING_DENUDATION_NOTE: SubtopicNote = {
  subtopicName: "Weathering and Denudation",
  title: "Weathering and Denudation",
  oneLineDefinition:
    "Weathering breaks rock down in place — physically by stress, chemically by reaction with water and air — and together with erosion and transport it wears the land down, a process called denudation.",
  whyItMatters:
    "10 PYQs and a GUARANTEED-MARKS pocket — 0% HARD over ten years. Almost every question is one of two kinds: sort a process as mechanical vs chemical, or spot the odd one out. Lock the two lists (mechanical processes; chemical processes) and the climate rule (chemical loves hot+humid, mechanical loves hot+dry), and this subtopic is free.",
  concepts: [
    // 1. denudation foundation (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "denudation-foundation",
      name: "Weathering, erosion and denudation",
      intuition:
        "Three words are easy to mix up. WEATHERING is the breakdown of rock where it sits — no movement. EROSION is the wearing away AND removal of that broken material by an agent (river, wind, ice). DENUDATION is the umbrella term: the whole wearing-down of the land by weathering + mass wasting + erosion + transport. These are EXOGENIC (external, surface) processes, the opposite of the endogenic forces that build the land up.",
      definition:
        "- **Weathering** — in-place breakdown of rock (no transport).\n" +
        "- **Mass wasting** — downslope movement of rock/soil under gravity.\n" +
        "- **Erosion** — wearing away + removal by a moving agent (water, wind, ice).\n" +
        "- **Denudation** — the overall lowering of the land: **weathering + mass wasting + erosion + transportation** taken together. It is an **exogenic** (external) process.",
      authoredExample: {
        prompt:
          "Weathering, mass wasting, erosion and transportation together indicate which overall process?",
        steps: [
          "Each is a surface (exogenic) wearing-down step.",
          "Mountain building and diastrophism are endogenic — the opposite.",
          "The combined wearing-down of the land is denudation.",
        ],
        answer: "Denudation.",
      },
      selfCheckExample: {
        prompt: "Is weathering an endogenic or exogenic process?",
        steps: [
          "Endogenic forces come from inside the Earth and build land up.",
          "Weathering acts at the surface and breaks land down.",
        ],
        answer: "Exogenic.",
      },
      practiceSet: [
        { prompt: "Breakdown of rock in place, with no movement, is called?", answer: "Weathering" },
        { prompt: "The umbrella term for the overall wearing-down of land is?", answer: "Denudation" },
        { prompt: "Are weathering and erosion endogenic or exogenic?", answer: "Exogenic" },
      ],
      pyqExampleId: "df2843c4-e322-41ce-b168-a87450d41e54", // denudation
    },

    // 2. mechanical weathering (formula)
    {
      kind: "formula" as const,
      slug: "mechanical-weathering",
      name: "Mechanical (physical) weathering",
      intuition:
        "Mechanical weathering shatters rock WITHOUT changing its chemistry — pure physical stress. Water freezing in cracks wedges them open; salt crystals growing in pores push grains apart; daily heating and cooling makes outer layers peel off (exfoliation). It dominates where chemistry is sluggish — hot DRY deserts and cold climates.",
      definition:
        "Physical processes (no chemical change):\n" +
        "- **Frost wedging** — water freezes in cracks and expands.\n" +
        "- **Salt-crystal growth** — salts crystallise in pores and prise rock apart (a PHYSICAL process).\n" +
        "- **Thermal expansion / exfoliation** — repeated heating/cooling flakes off outer shells.\n" +
        "- Driving forces: **gravity, expansion force, and water-pressure force**.\n" +
        "- Mechanical weathering is most prevalent in **hot dry deserts** (and cold regions), where chemical reactions are slow. Granite hills weather into rounded **tors**.",
      authoredExample: {
        prompt:
          "Which type of weathering dominates in a hot tropical desert, and why?",
        steps: [
          "Chemical weathering needs moisture, which a desert lacks.",
          "Big day-night temperature swings stress the rock physically.",
          "So mechanical (physical) weathering dominates.",
        ],
        answer: "Mechanical (physical) weathering, because deserts are dry so chemical reactions are slow.",
      },
      selfCheckExample: {
        prompt: "Salt-crystal growth in rock pores is an example of which weathering?",
        steps: [
          "The salt does not chemically alter the rock minerals.",
          "It physically forces grains apart as crystals grow.",
        ],
        answer: "Physical (mechanical) weathering.",
      },
      practiceSet: [
        { prompt: "Which weathering dominates in hot deserts?", answer: "Mechanical (physical)" },
        { prompt: "Salt-crystal growth is physical or chemical weathering?", answer: "Physical" },
        { prompt: "Rounded granite residual hills are called?", answer: "Tors" },
      ],
      pyqExampleId: "af867a7b-80a5-4f46-9142-5260323992c9", // hot desert -> mechanical
      traps: [
        {
          title: "Salt-crystal growth is PHYSICAL",
          body:
            "Because it involves salt, students label salt-crystal growth 'chemical'. It is **physical (mechanical)** — the salt crystals exert a mechanical force; they don't react with the rock minerals.",
        },
      ],
    },

    // 3. chemical weathering (reference)
    {
      kind: "reference" as const,
      slug: "chemical-weathering",
      name: "Chemical weathering",
      intuition:
        "Chemical weathering ROTS the rock — water, oxygen and acids react with the minerals and change them into new substances. Solution dissolves minerals away; carbonation eats limestone; hydration makes minerals swell; oxidation rusts iron and reddens the rock. It thrives where it is hot AND wet, because warmth and water speed reactions. Watch the odd-one-out traps: thawing and exfoliation are PHYSICAL, not chemical.",
      definition:
        "Chemical processes (mineral change):\n" +
        "- **Solution** — soluble minerals dissolve, leaching them away.\n" +
        "- **Carbonation** — carbonic acid attacks carbonates/feldspar.\n" +
        "- **Hydration** — minerals absorb water, swell and change (increases rock volume).\n" +
        "- **Oxidation** — oxygen reacts with iron, changing the rock's colour (reddening).\n" +
        "- Chemical weathering is strongest in a **hot + humid** climate.\n" +
        "- NOT chemical: **thawing, exfoliation, frost action** (these are physical).",
      table: {
        columns: ["Process", "What it does"],
        rows: [
          { cells: ["Solution", "Dissolves and leaches minerals"] },
          { cells: ["Carbonation", "Acid attacks limestone / feldspar"] },
          {
            cells: ["**Hydration**", "Minerals absorb water, swell, increase volume"],
            noteAmber: "NDA 2021 — absorbing water and expanding is hydration.",
          },
          { cells: ["Oxidation", "Oxygen reddens iron-bearing rock"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which process is NOT chemical weathering: solution, carbonation, oxidation, exfoliation?",
        steps: [
          "Solution, carbonation and oxidation all chemically alter minerals.",
          "Exfoliation is the physical peeling of outer rock layers.",
        ],
        answer: "Exfoliation (it is physical).",
      },
      practiceSet: [
        { prompt: "Chemical weathering is strongest in which climate?", answer: "Hot and humid" },
        { prompt: "Minerals absorbing water and swelling is called?", answer: "Hydration" },
        { prompt: "Is thawing chemical or physical weathering?", answer: "Physical" },
      ],
      pyqExampleId: "9ed17b60-bf10-4ce7-bacc-98acc3951530", // hydration
      traps: [
        {
          title: "Thawing and exfoliation are NOT chemical",
          body:
            "Odd-one-out questions slip **thawing** or **exfoliation** into a chemical-weathering list. Both are PHYSICAL. The genuinely chemical processes are solution, carbonation, hydration and oxidation.",
        },
      ],
    },
  ],
};
