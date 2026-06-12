import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_TISSUES_MERISTEMS_NOTE: SubtopicNote = {
  subtopicName: "Plant Tissues and Meristems",
  title: "Plant Tissues and Meristems",
  oneLineDefinition:
    "Plants grow at meristems (regions of dividing cells), which mature into permanent tissues — simple ones (parenchyma, collenchyma, sclerenchyma) for packing and support, and complex conducting tissues (xylem, phloem) that carry water and food.",
  whyItMatters:
    "The highest-yield subtopic in the chapter — 11 PYQs, all EASY or MODERATE. " +
    "Three facts carry most marks: apical meristem grows LENGTH while lateral meristem (cambium) grows GIRTH; sclerenchyma is the only DEAD simple tissue; and xylem/phloem are the conducting tissues (the bank loves to slip pericycle in as a fake conducting component). " +
    "Pure recall once you have the three tables cold.",
  concepts: [
    // FOUNDATION — what a plant tissue is (no PYQ)
    {
      kind: "formula" as const,
      slug: "plant-tissue-foundation",
      name: "Plant tissues — meristematic vs permanent",
      intuition:
        "A plant tissue is a group of similar cells doing one job. Plants split their tissues into two big families by whether the cells still divide. " +
        "Meristematic tissue is the growth zone — its cells keep dividing. Permanent tissue is what those cells become after they stop dividing and specialise.",
      definition:
        "The two tissue families and the relationship between them:\n" +
        "- **Meristematic tissue** — actively dividing cells; the source of all plant growth. Found at root/shoot tips and in the cambium.\n" +
        "- **Permanent tissue** — cells that have stopped dividing and matured into a fixed form (parenchyma, collenchyma, sclerenchyma, xylem, phloem).\n" +
        "- A meristematic cell becomes a permanent cell by **differentiation** — it takes on a specific shape and job.",
      authoredExample: {
        prompt:
          "A cell at the tip of a growing root divides, then later develops thick walls and becomes part of the supporting tissue. Name the tissue type it started as, the tissue type it ended as, and the process that changed it.",
        steps: [
          "A dividing cell at a growing tip belongs to **meristematic** tissue.",
          "Once it matures and stops dividing, it is a **permanent** tissue cell.",
          "The change from a dividing cell to a specialised permanent cell is **differentiation**.",
        ],
        answer: "Started meristematic → became permanent, via differentiation.",
      },
    },

    // MERISTEMS — apical vs lateral vs intercalary; cambium; differentiation
    {
      kind: "reference" as const,
      slug: "plant-meristem-types",
      name: "Types of meristem — apical, lateral, intercalary",
      intuition:
        "Meristems are the plant's growth engines, and where one sits decides what it grows. " +
        "Apical meristems at the tips push the plant LONGER (primary growth, height). Lateral meristems (the cambium) along the sides make the stem THICKER (secondary growth, girth). " +
        "The single most-tested pair: apical = length, lateral = girth.",
      definition:
        "Three meristems by position, plus the cambium:\n" +
        "- **Apical meristem** — at root and shoot **tips**; drives **primary growth** = increase in **length/height**. Damage it and the plant cannot grow longer.\n" +
        "- **Lateral meristem (cambium)** — along the **sides** (vascular cambium, cork cambium); drives **secondary growth** = increase in **girth/thickness** of the stem.\n" +
        "- **Intercalary meristem** — at the **base of leaves/internodes** (common in grasses); helps regrowth after grazing/mowing.\n" +
        "- **Cambium** is a **lateral meristem** — it lies between the xylem and phloem.",
      table: {
        columns: ["Meristem", "Where", "Causes growth in"],
        rows: [
          {
            cells: ["**Apical**", "Root and shoot tips", "Length / height (primary growth)"],
            noteAmber: "Damage to the apical meristem reduces the LENGTH of the plant (NDA 2018).",
          },
          {
            cells: ["**Lateral (cambium)**", "Sides of the stem", "Girth / thickness (secondary growth)"],
            noteAmber: "Increase in girth of the stem is due to lateral meristem ONLY (NDA 2021). Cambium = a lateral meristem (NDA 2025).",
          },
          { cells: ["**Intercalary**", "Base of leaves / internodes", "Length (regrowth, e.g. grasses)"] },
        ],
        caption:
          "Memory hook: Apical = Altitude (height); Lateral = girth (wide). Cambium is lateral.",
      },
      selfCheckExample: {
        prompt:
          "A gardener trims the very top shoot tip of a young sapling but the trunk keeps getting thicker each year. Which meristem did she remove, and which one is still active?",
        steps: [
          "The top shoot tip is the **apical meristem** — removing it stops increase in height.",
          "The trunk getting thicker is increase in girth → driven by the **lateral meristem (cambium)**, which is still active.",
        ],
        answer: "Removed the apical meristem; the lateral meristem (cambium) is still active.",
      },
      practiceSet: [
        { prompt: "Cambium is an example of which meristem?", answer: "Lateral meristem", method: "between xylem and phloem; secondary growth" },
        { prompt: "Increase in girth of a stem is due to which meristem?", answer: "Lateral meristem only" },
        { prompt: "Damage to the apical meristem affects what?", answer: "The length (height) of the plant" },
        { prompt: "Which meristem causes regrowth at the base of grass leaves?", answer: "Intercalary meristem" },
      ],
      pyqExampleId: "82411742-5016-4c6c-a408-bee117af5932", // cambium = lateral meristem
      traps: [
        {
          title: "Apical = length, Lateral = girth — don't swap them",
          body:
            "Apical meristems (tips) make the plant **taller/longer**; lateral meristems / cambium (sides) make it **thicker (girth)**. The bank asks both directions — 'what increases girth?' (lateral) and 'damage to apical affects?' (length).",
        },
      ],
    },

    // DIFFERENTIATION — meristem → permanent
    {
      kind: "formula" as const,
      slug: "plant-cell-differentiation",
      name: "Differentiation — meristem cells become permanent tissue",
      intuition:
        "Meristematic cells are generalists that just divide. To become a useful part of the plant — a water pipe, a support fibre, a packing cell — a dividing cell must take on a fixed shape and job. " +
        "That maturing process has a name: differentiation.",
      definition:
        "**Differentiation** is the process by which meristematic (dividing) cells transform into specific **permanent tissues** with a fixed structure and function. " +
        "It is distinct from **cell division** (just making more cells) — differentiation is the SPECIALISATION step that follows division.",
      authoredExample: {
        prompt:
          "Cells produced by the shoot-tip meristem stop dividing and develop into long, hollow water-conducting tubes. Name the process by which they became these tubes.",
        steps: [
          "The cells started as dividing meristematic cells.",
          "Becoming a specific permanent type (conducting tubes) is specialisation, not mere multiplication.",
          "That specialisation step is **differentiation**.",
        ],
        answer: "Differentiation.",
      },
      selfCheckExample: {
        prompt:
          "Distinguish: which process simply increases the NUMBER of cells, and which converts them into permanent specialised tissues?",
        steps: [
          "Increasing the number of cells = **cell division** (multiplication).",
          "Converting them into permanent specialised tissues = **differentiation**.",
        ],
        answer: "Division increases number; differentiation specialises them into permanent tissues.",
      },
      pyqExampleId: "65046e6c-e0f1-4e21-995d-e82a25fb54ab", // transformation into permanent tissue = differentiation
      traps: [
        {
          title: "Differentiation ≠ division",
          body:
            "Distractors offer cell division, multiplication, regeneration. The transformation of meristematic cells INTO permanent tissue is **differentiation** — division only makes more identical cells; differentiation gives them their permanent identity.",
        },
      ],
    },

    // SIMPLE PERMANENT TISSUES — parenchyma / collenchyma / sclerenchyma
    {
      kind: "reference" as const,
      slug: "plant-simple-permanent-tissues",
      name: "Simple permanent tissues — parenchyma, collenchyma, sclerenchyma",
      intuition:
        "Once cells mature, the three 'simple' permanent tissues divide the labour: parenchyma packs and stores, collenchyma gives flexible support, and sclerenchyma gives rigid support. " +
        "The two facts the bank tests endlessly: sclerenchyma is the only DEAD one (thick lignified walls, no living contents), and parenchyma is the basic PACKING tissue found even inside xylem and phloem.",
      definition:
        "The three simple permanent tissues and their signature facts:\n" +
        "- **Parenchyma** — living, thin-walled; the basic **packing/storage** tissue. Found inside xylem and phloem as xylem/phloem parenchyma. Forms **aerenchyma** (air sacs) in aquatic plants for buoyancy.\n" +
        "- **Collenchyma** — living, with **thickened walls**; gives **flexibility** to young stems and leaf stalks.\n" +
        "- **Sclerenchyma** — **DEAD at maturity** (no protoplast); thick **lignified** walls give **rigid mechanical support**; forms fibres and the hard parts.",
      table: {
        columns: ["Tissue", "Living / dead", "Role + key fact"],
        rows: [
          {
            cells: ["**Parenchyma**", "Living", "Basic packing + storage; found in xylem and phloem; forms aerenchyma (air sacs) in aquatic plants"],
            noteAmber: "Parenchyma is the 'basic packing tissue' found in xylem and phloem (NDA 2021); aerenchyma buoyancy sacs are parenchyma (NDA 2022).",
          },
          { cells: ["**Collenchyma**", "Living", "Thickened walls give flexibility to the plant"] },
          {
            cells: ["**Sclerenchyma**", "DEAD", "Lignified walls; rigid support; no protoplast at maturity"],
            noteAmber: "Sclerenchyma is the simple tissue made of DEAD cells (NDA 2020, 2026).",
          },
        ],
        caption:
          "Only sclerenchyma is dead. Parenchyma = packing/storage; collenchyma = flexibility.",
      },
      selfCheckExample: {
        prompt:
          "A water lily floats because its stem and leaves contain large air-filled sacs. Which simple permanent tissue forms these sacs, and is it living or dead?",
        steps: [
          "Air sacs that give buoyancy are **aerenchyma**.",
          "Aerenchyma is formed from **parenchyma** with large intercellular air spaces.",
          "Parenchyma is a **living** tissue.",
        ],
        answer: "Parenchyma (a living tissue) forms the buoyancy air sacs.",
      },
      practiceSet: [
        { prompt: "Which simple permanent tissue is made of dead cells?", answer: "Sclerenchyma", method: "thick lignified walls, no protoplast" },
        { prompt: "Which tissue is the basic packing tissue found in xylem and phloem?", answer: "Parenchyma" },
        { prompt: "Which simple tissue gives flexibility with its thickened walls?", answer: "Collenchyma" },
        { prompt: "Buoyancy air sacs (aerenchyma) in aquatic plants are made of which tissue?", answer: "Parenchyma" },
      ],
      pyqExampleId: "f1970030-5ae1-48fa-9c7c-09d29c51b798", // tissue usually without protoplast = sclerenchyma
      traps: [
        {
          title: "Sclerenchyma is the DEAD one",
          body:
            "When asked which plant tissue is 'dead' or 'without protoplast', the answer is **sclerenchyma** (lignified walls). Parenchyma and collenchyma are both LIVING. Flexibility is collenchyma — not sclerenchyma.",
        },
        {
          title: "Parenchyma hides inside the conducting tissues",
          body:
            "Parenchyma is not just the soft filler — it occurs as **xylem parenchyma** and **phloem parenchyma** inside the conducting tissues, and as **aerenchyma** in aquatic plants. 'Basic packing tissue found in xylem and phloem' = parenchyma.",
        },
      ],
    },

    // CONDUCTING (COMPLEX) TISSUES — xylem / phloem / pericycle trap
    {
      kind: "reference" as const,
      slug: "plant-conducting-tissues",
      name: "Conducting tissues — xylem and phloem",
      intuition:
        "Xylem and phloem are the plant's plumbing — the 'complex' tissues, each built from several cell types. Xylem carries water and minerals; phloem carries food. " +
        "The bank's favourite trap is to mix up their components: tracheids and vessels belong to xylem; sieve tubes and companion cells belong to phloem; and the pericycle is NOT a conducting component at all.",
      definition:
        "The two complex (conducting) tissues and what each is made of:\n" +
        "- **Xylem** — conducts **water + minerals** upward. Made of **tracheids, vessels, xylem parenchyma, and xylem fibres**.\n" +
        "- **Phloem** — conducts **food (sucrose)**. Made of **sieve tubes, sieve plates, companion cells, phloem parenchyma, and phloem fibres**.\n" +
        "- **Pericycle** is a parenchymatous layer outside the vascular bundle — it is **NOT** a conducting component.\n" +
        "- Only plants with true vascular tissue (e.g. ferns like **Marsilea**) conduct this way; algae, fungi and cyanobacteria have no vascular tissue.",
      table: {
        columns: ["Tissue", "Carries", "Components"],
        rows: [
          {
            cells: ["**Xylem**", "Water + minerals", "Tracheids, vessels, xylem parenchyma, xylem fibres"],
            noteAmber: "Xylem = tracheids + vessels + xylem parenchyma + xylem fibres (NDA 2019).",
          },
          { cells: ["**Phloem**", "Food (sucrose)", "Sieve tubes, sieve plates, companion cells, phloem parenchyma, fibres"] },
          {
            cells: ["**Pericycle**", "NOT conducting", "A parenchyma layer outside the vascular bundle — a distractor"],
            noteAmber: "Pericycle is NOT a component of conducting tissue (NDA 2019).",
          },
        ],
        caption:
          "Tracheids/vessels = xylem; sieve tubes/companion cells = phloem; pericycle = neither.",
      },
      selfCheckExample: {
        prompt:
          "From this list — tracheids, sieve tubes, companion cells, vessels — which belong to xylem and which to phloem?",
        steps: [
          "Tracheids and vessels are water-conducting → **xylem**.",
          "Sieve tubes and companion cells are food-conducting → **phloem**.",
        ],
        answer: "Xylem: tracheids, vessels. Phloem: sieve tubes, companion cells.",
      },
      practiceSet: [
        { prompt: "Which tissue carries water and minerals?", answer: "Xylem", method: "tracheids + vessels + parenchyma + fibres" },
        { prompt: "Which tissue carries food (sucrose)?", answer: "Phloem", method: "sieve tubes + companion cells" },
        { prompt: "Is the pericycle a conducting tissue component?", answer: "No", method: "it's parenchyma outside the vascular bundle" },
        { prompt: "Sieve tubes and companion cells are part of which tissue?", answer: "Phloem" },
      ],
      pyqExampleId: "fb5d6709-47db-4b41-a1b4-47fdaa39c95d", // xylem = tracheids, vessels, parenchyma, fibres
      traps: [
        {
          title: "Pericycle is NOT a conducting component",
          body:
            "Asked for the 'odd one out' that is NOT part of conducting tissue, the answer is the **pericycle** — fibres, tracheids and sieve tubes ARE conducting components; the pericycle is a parenchyma layer outside the vascular bundle.",
        },
        {
          title: "Sieve plates and companion cells are PHLOEM, not xylem",
          body:
            "A trap statement lists 'xylem consists of sieve plate, sieve tube and companion cells' — those are **phloem** components. Xylem = tracheids, vessels, xylem parenchyma, xylem fibres.",
        },
      ],
    },

    // VASCULAR PLANTS — Marsilea (which organism has vascular tissue)
    {
      kind: "reference" as const,
      slug: "plant-vascular-organisms",
      name: "Which organisms have vascular tissue",
      intuition:
        "Vascular (conducting) tissue is a marker of 'higher' land plants. Ferns and all seed plants have it; algae, fungi and bacteria do not. " +
        "The bank tests this by hiding a fern among non-plants — pick the one that is a true plant with xylem and phloem.",
      definition:
        "Vascular tissue (xylem + phloem) is present only in **vascular plants** — pteridophytes (ferns) and all seed plants. It is ABSENT in:\n" +
        "- **Algae** (e.g. *Cladophora*) — simple, no true tissues.\n" +
        "- **Fungi** (e.g. *Penicillium*) — not plants at all.\n" +
        "- **Cyanobacteria** (e.g. *Anabaena*) — prokaryotes, no tissues.\n" +
        "- *Marsilea* is a **fern (pteridophyte)** — it HAS true vascular tissue.",
      table: {
        columns: ["Organism", "Group", "Vascular tissue?"],
        rows: [
          { cells: ["*Marsilea*", "Fern (pteridophyte)", "YES — true xylem + phloem"] },
          { cells: ["*Cladophora*", "Green alga", "No"] },
          { cells: ["*Penicillium*", "Fungus", "No"] },
          { cells: ["*Anabaena*", "Cyanobacterium", "No"] },
        ],
        caption:
          "Only the fern (Marsilea) has vascular tissue; algae, fungi and cyanobacteria do not.",
      },
      selfCheckExample: {
        prompt:
          "From Penicillium, Marsilea and Anabaena, which one has true xylem and phloem, and why?",
        steps: [
          "Penicillium is a fungus, Anabaena is a cyanobacterium — neither has vascular tissue.",
          "Marsilea is a fern (a pteridophyte), which is a vascular plant.",
        ],
        answer: "Marsilea — it is a fern, a true vascular plant.",
      },
      practiceSet: [
        { prompt: "Which has vascular tissue: a fern, an alga, or a fungus?", answer: "A fern", method: "ferns are pteridophytes — vascular plants" },
        { prompt: "Does Anabaena (a cyanobacterium) have vascular tissue?", answer: "No" },
        { prompt: "To which plant group does Marsilea belong?", answer: "Pteridophytes (ferns)" },
      ],
      pyqExampleId: "30ce7cac-00fb-4b53-b735-2ccc27c03eba", // Marsilea has vascular tissue
      traps: [
        {
          title: "Spot the plant among the non-plants",
          body:
            "*Cladophora* (alga), *Penicillium* (fungus) and *Anabaena* (cyanobacterium) are NOT vascular plants. *Marsilea*, a fern, is — it is the only one with true conducting tissue.",
        },
      ],
    },
  ],
};
