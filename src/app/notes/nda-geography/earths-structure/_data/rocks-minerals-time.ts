import type { SubtopicNote } from "@/app/notes/_types";

export const ROCKS_MINERALS_TIME_NOTE: SubtopicNote = {
  subtopicName: "Rocks, Minerals and Geological Time",
  title: "Rocks, Minerals and Geological Time",
  oneLineDefinition:
    "Three rock families — igneous, sedimentary, metamorphic — endlessly transform into one another through the rock cycle, and the eras of geological time order the whole story of Earth history.",
  whyItMatters:
    "15 PYQs, ~29% HARD — one of the chapter's most-tested and trickiest subtopics. The marks come from (1) sorting a named rock into the right family, (2) the parent → metamorphic pairs (sandstone → quartzite, limestone → marble), and (3) the order of geological eras. Learn the rock cycle as a story and the identifications stop being random.",
  concepts: [
    // 1. rock cycle (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "rock-cycle-foundation",
      name: "The three rock families and the rock cycle",
      intuition:
        "Every rock belongs to one of three families, defined by HOW it formed. IGNEOUS rock freezes from molten magma or lava. SEDIMENTARY rock forms when loose sediment is compacted and cemented (lithified). METAMORPHIC rock is an older rock transformed in place by heat and pressure. And none of these is permanent — melting, weathering and metamorphism keep converting one into another. That endless conversion is the rock cycle.",
      definition:
        "- **Igneous** — solidified from molten **magma/lava** (the 'primary' rock).\n" +
        "- **Sedimentary** — loose sediments compacted + cemented. The process that turns loose sediment into solid sedimentary rock is **lithification**.\n" +
        "- **Metamorphic** — an existing rock changed by **heat + pressure** (without melting).\n" +
        "- **Rock cycle** — rocks do not stay in one form for long: weathering, erosion, melting and metamorphism continually transform igneous ↔ sedimentary ↔ metamorphic.",
      visualizationSlug: "esl-rock-cycle",
      authoredExample: {
        prompt:
          "By what process are loose sediments turned into solid sedimentary rock?",
        steps: [
          "Loose sand and mud must be compacted and cemented to become rock.",
          "Weathering breaks rock down; mass wasting moves it; neither makes rock.",
          "The compaction + cementation of sediment into rock is lithification.",
        ],
        answer: "Lithification.",
      },
      selfCheckExample: {
        prompt:
          "Statements: (i) rocks do not remain in their original form for long; (ii) rocks are transformed by weathering, erosion and metamorphic action. Which are correct?",
        steps: [
          "The rock cycle means rocks are continually converted — (i) correct.",
          "Weathering, erosion and metamorphism are exactly the agents that transform them — (ii) correct.",
        ],
        answer: "Both are correct.",
      },
      practiceSet: [
        { prompt: "Which rock family forms from cooled magma?", answer: "Igneous" },
        { prompt: "Name the process that turns loose sediment into rock.", answer: "Lithification" },
        { prompt: "Metamorphic rock forms from heat and ___?", answer: "Pressure" },
      ],
      pyqExampleId: "794291a8-7dca-439d-80e4-bea43a63a14c", // lithification
    },

    // 2. igneous rocks (reference)
    {
      kind: "reference" as const,
      slug: "igneous-rocks",
      name: "Identifying igneous rocks",
      intuition:
        "Igneous rocks are the 'fire-born' rocks. If magma cools SLOWLY deep underground, big crystals grow → coarse rocks like granite and gabbro (intrusive/plutonic). If lava cools FAST at the surface, crystals stay tiny → fine rocks like basalt (extrusive/volcanic). The exam trick is to spot the impostor — a sedimentary or metamorphic rock hiding in an igneous list.",
      definition:
        "- **Intrusive / plutonic** (slow cooling, coarse): granite, gabbro, pegmatite.\n" +
        "- **Extrusive / volcanic** (fast cooling, fine): basalt, rhyolite, obsidian, pumice.\n" +
        "- Common impostors that are **NOT** igneous: **dolomite** and **limestone** (sedimentary), **slate** and **marble** (metamorphic).",
      table: {
        columns: ["Rock", "Igneous?", "Actually"],
        rows: [
          { cells: ["Granite, Gabbro, Basalt", "Yes", "Igneous"] },
          {
            cells: ["**Dolomite**", "No", "Sedimentary"],
            noteAmber: "NDA 2017 — dolomite is the odd one out in an igneous list.",
          },
          {
            cells: ["**Slate**", "No", "Metamorphic"],
            noteAmber: "NDA 2023 — slate is metamorphic, not igneous.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which one is NOT an igneous rock: granite, slate, basalt, gabbro?",
        steps: [
          "Granite, basalt and gabbro all crystallise from magma/lava — igneous.",
          "Slate forms when shale is metamorphosed.",
        ],
        answer: "Slate (it is metamorphic).",
      },
      practiceSet: [
        { prompt: "Slow-cooled, coarse-grained igneous rock — name one.", answer: "Granite (or gabbro)" },
        { prompt: "Is dolomite igneous?", answer: "No — it is sedimentary" },
        { prompt: "Fast-cooled fine-grained igneous rock — name one.", answer: "Basalt" },
      ],
      pyqExampleId: "9969d25d-957d-45ff-be16-5b246901be2f", // NOT igneous = slate
      traps: [
        {
          title: "Slate and dolomite are the classic impostors",
          body:
            "In 'which is NOT igneous' questions the trap answer is almost always **slate** (metamorphic) or **dolomite/limestone** (sedimentary) sitting among granite, basalt and gabbro.",
        },
      ],
    },

    // 3. sedimentary rocks (reference)
    {
      kind: "reference" as const,
      slug: "sedimentary-rocks",
      name: "Sedimentary rocks: mechanical, chemical, organic",
      intuition:
        "Sedimentary rocks form from settled sediment, but the sediment can arrive three ways. MECHANICALLY formed rocks are made of broken fragments (sandstone, shale). CHEMICALLY formed rocks precipitate out of solution (chert, rock salt, gypsum). ORGANICALLY formed rocks are built from the remains of living things (limestone, chalk, coal).",
      definition:
        "Three modes of formation:\n" +
        "- **Mechanically formed** (clastic) — compacted fragments: **sandstone, shale, conglomerate**.\n" +
        "- **Chemically formed** — precipitated from solution: **chert, halite (rock salt), gypsum, geyserite**.\n" +
        "- **Organically formed** — from organic remains: **limestone, chalk, coal**.",
      table: {
        columns: ["Mode", "Examples"],
        rows: [
          { cells: ["Mechanical (clastic)", "Sandstone, shale, conglomerate"] },
          { cells: ["Chemical", "Chert, halite, gypsum, geyserite"] },
          {
            cells: ["**Organic**", "Limestone, **chalk**, coal"],
            noteAmber: "NDA 2019 — chalk is an organically-formed sedimentary rock.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which is an organically-formed sedimentary rock: shale, chert, halite, chalk?",
        steps: [
          "Shale is mechanical; chert and halite are chemical precipitates.",
          "Chalk is built from microscopic shell remains — organic.",
        ],
        answer: "Chalk.",
      },
      practiceSet: [
        { prompt: "Sandstone forms by which mode?", answer: "Mechanical (clastic)" },
        { prompt: "Chert and rock salt form by which mode?", answer: "Chemical (precipitation)" },
        { prompt: "Name an organically-formed sedimentary rock.", answer: "Limestone / chalk / coal" },
      ],
      pyqExampleId: "956a08f8-21a8-4270-97ba-e8ae633b47eb", // chalk organically formed
      traps: [
        {
          title: "Shale is mechanical, chert is chemical",
          body:
            "Match the mode carefully: **shale** = mechanically formed (compacted mud), **chert** = chemically formed (precipitated silica), **geyserite** = chemically formed (siliceous sinter, NOT organic).",
        },
      ],
    },

    // 4. metamorphic rocks (reference)
    {
      kind: "reference" as const,
      slug: "metamorphic-rocks",
      name: "Metamorphic rocks and their parents",
      intuition:
        "Metamorphism takes an existing rock and, under heat and pressure, recrystallises it into something denser and harder — without melting it. The exam staple is the parent → product pair: sandstone becomes quartzite, limestone becomes marble, shale becomes slate. Strong directed pressure also lines the minerals up into bands or sheets — that layering is called foliation.",
      definition:
        "Parent → metamorphic product:\n" +
        "- **Sandstone → quartzite**; **limestone → marble**; **shale → slate → schist → gneiss**; **coal → anthracite**; **granite → gneiss**.\n" +
        "- Agents of metamorphism: **heat, pressure (compression), chemically active fluids/solution** — but NOT 'decomposition'.\n" +
        "- **Foliation** — wavy bands or platy layers formed by recrystallisation under directed pressure. Broad mineral bands → very hard rock; thin foliation → the rock flakes apart.\n" +
        "- A rock can be transitional: **gneissoid** is regarded as both igneous and metamorphic.",
      table: {
        columns: ["Parent rock", "Metamorphic product"],
        rows: [
          {
            cells: ["Sandstone", "**Quartzite**"],
            noteAmber: "NDA 2026 — quartzite is metamorphosed sandstone.",
          },
          { cells: ["Limestone", "Marble"] },
          { cells: ["Shale", "Slate → schist → gneiss"] },
          { cells: ["Coal", "Anthracite"] },
        ],
      },
      selfCheckExample: {
        prompt: "Quartzite is the metamorphosed form of which rock?",
        steps: [
          "Match the parent to its product: limestone → marble, shale → slate.",
          "Quartzite forms when quartz-rich sandstone recrystallises.",
        ],
        answer: "Sandstone.",
      },
      practiceSet: [
        { prompt: "Limestone metamorphoses into?", answer: "Marble" },
        { prompt: "Which is NOT an agent of metamorphism: heat, compression, decomposition, solution?", answer: "Decomposition" },
        { prompt: "What is the layering in metamorphic rock called?", answer: "Foliation" },
      ],
      pyqExampleId: "4c2555fa-ee9b-46f1-b98c-f88411e2d5c3", // quartzite from sandstone
      traps: [
        {
          title: "Decomposition is not a metamorphic agent",
          body:
            "Heat, pressure and chemically active solutions drive metamorphism. **Decomposition** (a chemical-weathering term) is the impostor in an 'agents of metamorphism' list.",
        },
      ],
    },

    // 5. minerals (reference)
    {
      kind: "reference" as const,
      slug: "minerals",
      name: "Common rock-forming minerals",
      intuition:
        "Rocks are made of minerals, and a few dominate. Feldspar is the single most abundant mineral group in the crust; quartz is the hard, glassy one; pyroxene and amphibole are the dark, iron-magnesium minerals. The NDA tests their distinguishing facts: feldspar's colour and share of the crust, pyroxene's presence in meteorites.",
      definition:
        "- **Feldspar** — about HALF the Earth's crust; light cream to salmon-pink. (It does NOT always contain magnesium.)\n" +
        "- **Quartz** — silica (SiO₂), very hard, and NOT soluble in water.\n" +
        "- **Pyroxene** — a dark ferromagnesian mineral; commonly found in **meteorites**.\n" +
        "- **Amphibole** — dark ferromagnesian mineral; forms only a small percentage of the crust (not 20%).",
      table: {
        columns: ["Mineral", "Key fact"],
        rows: [
          {
            cells: ["**Feldspar**", "~half the crust; cream to salmon-pink"],
            noteAmber: "NDA 2025 — feldspar is ~half the crust and cream/pink, but does NOT always contain Mg.",
          },
          { cells: ["Quartz", "SiO₂, hard, insoluble in water"] },
          {
            cells: ["**Pyroxene**", "Dark mineral; common in meteorites"],
            noteAmber: "NDA 2024 — pyroxene is commonly found in meteorites.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement is correct: 'pyroxene is commonly found in meteorites' or 'quartz is soluble in water'?",
        steps: [
          "Quartz (silica) is famously insoluble in water — that claim is false.",
          "Pyroxene does occur commonly in meteorites — that claim is true.",
        ],
        answer: "Pyroxene is commonly found in meteorites.",
      },
      practiceSet: [
        { prompt: "Which mineral makes up roughly half the crust?", answer: "Feldspar" },
        { prompt: "Is quartz soluble in water?", answer: "No" },
        { prompt: "Which mineral is commonly found in meteorites?", answer: "Pyroxene" },
      ],
      pyqExampleId: "46d7dbac-120a-432b-99d0-6d1e50facb4f", // feldspar statements
      traps: [
        {
          title: "Feldspar does NOT always contain magnesium",
          body:
            "Feldspar is ~half the crust and cream-to-pink (both true), but a third claim — that magnesium is common in ALL feldspar — is false. Feldspars are mainly K/Na/Ca aluminosilicates.",
        },
      ],
    },

    // 6. geological time (reference)
    {
      kind: "reference" as const,
      slug: "geological-time",
      name: "Geological time scale",
      intuition:
        "Earth's 4.6-billion-year history is sliced into eras, then periods, then epochs. The oldest and longest stretch is the Precambrian; the most recent period (the Quaternary, our Ice-Age-to-now interval) splits into the Pleistocene and the Holocene. Reconstructing these past worlds and their maps is called palaeogeography.",
      definition:
        "- Eras, oldest → youngest: **Precambrian → Palaeozoic → Mesozoic → Cenozoic**. Precambrian is the OLDEST (and by far the longest).\n" +
        "- The **Quaternary** period (most recent) has two epochs: **Pleistocene** (Ice Age) and **Holocene** (present).\n" +
        "- **Palaeogeography** — piecing together geological time to make historical maps of the Earth (palaeoclimatology = past climate; palaeolithology = past rocks).",
      table: {
        columns: ["Division", "Detail"],
        rows: [
          {
            cells: ["Oldest era", "**Precambrian**"],
            noteAmber: "NDA 2023 — Precambrian is the oldest era.",
          },
          {
            cells: ["Quaternary epochs", "**Pleistocene + Holocene**"],
            noteAmber: "NDA 2023 — the two epochs of the Quaternary.",
          },
          { cells: ["Historical Earth maps", "Palaeogeography"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is the oldest geological era: Mesozoic, Precambrian, Cenozoic, Palaeozoic?",
        steps: [
          "Order them: Precambrian → Palaeozoic → Mesozoic → Cenozoic.",
          "The first and oldest is the Precambrian.",
        ],
        answer: "Precambrian.",
      },
      practiceSet: [
        { prompt: "Name the oldest geological era.", answer: "Precambrian" },
        { prompt: "The Quaternary's two epochs are?", answer: "Pleistocene and Holocene" },
        { prompt: "Making historical maps of the Earth is called?", answer: "Palaeogeography" },
      ],
      pyqExampleId: "374808ba-0cb8-49a7-b625-225e8920b65f", // oldest era = Precambrian
    },
  ],
};
