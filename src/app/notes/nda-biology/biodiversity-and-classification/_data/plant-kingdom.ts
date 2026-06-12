import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_KINGDOM_NOTE: SubtopicNote = {
  subtopicName: "Plant Kingdom Classification",
  title: "Plant Kingdom — from Algae to Flowering Plants",
  oneLineDefinition:
    "The plant kingdom is a ladder of increasing complexity — Thallophyta (algae) → Bryophyta (mosses) → Pteridophyta (ferns) → Gymnosperms (naked seeds) → Angiosperms (flowering, enclosed seeds) — keyed on two features the NDA loves: vascular tissue and seed type.",
  whyItMatters:
    "This is the highest-yield cluster in the chapter — 4 of the 11 PYQs, and three of them turn on the same two facts: bryophytes have NO vascular tissue (and are the 'amphibians of the plant kingdom'), and gymnosperms have NAKED seeds. " +
    "Learn the progression as a ladder where each rung adds one feature, and these marks are free. All EASY or MODERATE.",
  concepts: [
    // The progression (REFERENCE) — the core ladder
    {
      kind: "reference" as const,
      slug: "biodiv-plant-groups",
      name: "The plant-kingdom groups — vascular tissue and seeds",
      intuition:
        "Read the plant kingdom as a story of plants conquering land. Algae stay in water with no body parts. Bryophytes crawl onto land but still need water to reproduce and have no plumbing (no vascular tissue). " +
        "Pteridophytes invent vascular tissue. Gymnosperms invent the seed — but naked, exposed. Angiosperms wrap the seed in a fruit and add flowers.",
      definition:
        "The five plant groups in order of increasing complexity, and the feature each one adds:\n" +
        "- **Thallophyta** (algae) — simple body with **no differentiation** into root, stem, leaf; mostly aquatic. *Spirogyra, Ulothrix.*\n" +
        "- **Bryophyta** (mosses, liverworts) — first land plants; **NO vascular (conducting) tissue**; need water for fertilisation → the **'amphibians of the plant kingdom'**. *Moss (Funaria), Marchantia.*\n" +
        "- **Pteridophyta** (ferns) — the **first plants with true vascular tissue** (xylem + phloem); reproduce by **spores**, no seeds. *Fern, Marsilea.*\n" +
        "- **Gymnosperms** — first **seed** plants; seeds are **naked** (not enclosed in a fruit); woody, evergreen. *Pine, Cycas, Cedar.*\n" +
        "- **Angiosperms** — **flowering** plants; seeds **enclosed in a fruit**; the most advanced group. *Mango, wheat, grass.*",
      table: {
        columns: ["Group", "Vascular tissue?", "Seeds?", "Key fact / example"],
        rows: [
          { cells: ["**Thallophyta**", "No", "No", "Algae; no body differentiation (Spirogyra)"] },
          {
            cells: ["**Bryophyta**", "**No**", "No (spores)", "'Amphibians of plant kingdom' (Moss, Marchantia)"],
            noteAmber: "NDA 2018/2022/2023 — bryophytes have NO vascular tissue and ARE the amphibians of the plant kingdom.",
          },
          { cells: ["**Pteridophyta**", "**Yes (first)**", "No (spores)", "First true vascular plants (Fern)"] },
          {
            cells: ["**Gymnosperms**", "Yes", "**Yes — naked**", "Naked seeds, no fruit; woody/evergreen (Pine, Cycas)"],
            noteAmber: "NDA 2021 — evergreen, woody, naked-seed plants = Gymnosperms.",
          },
          { cells: ["**Angiosperms**", "Yes", "**Yes — enclosed**", "Flowering; seeds in a fruit (Mango, wheat)"] },
        ],
        caption:
          "Two facts answer most questions: bryophytes = no vascular tissue (amphibians); gymnosperms = naked seeds.",
      },
      visualizationSlug: "biodiv-plant-progression",
      selfCheckExample: {
        prompt:
          "A plant is evergreen, has a woody stem, and bears seeds that sit exposed on a cone rather than inside a fruit. Which group is it, and how does it differ from an angiosperm?",
        steps: [
          "Seeds that are exposed (not enclosed in a fruit) are 'naked' seeds → Gymnosperms.",
          "Woody and evergreen fits gymnosperms such as pine and cycas.",
          "An angiosperm differs because its seeds are enclosed inside a fruit and it produces flowers.",
        ],
        answer: "It is a Gymnosperm — naked seeds, unlike an angiosperm whose seeds are enclosed in a fruit.",
      },
      practiceSet: [
        { prompt: "Which plant group is the 'amphibians of the plant kingdom'?", answer: "Bryophytes", method: "need water to reproduce; live on land" },
        { prompt: "Which group has the first true vascular tissue?", answer: "Pteridophytes" },
        { prompt: "Plants with naked seeds belong to which group?", answer: "Gymnosperms", method: "seeds not enclosed in fruit" },
        { prompt: "How do angiosperm seeds differ from gymnosperm seeds?", answer: "Angiosperm seeds are enclosed in a fruit (gymnosperm seeds are naked)" },
      ],
      pyqExampleId: "511af78c-76e2-4d71-98e1-794f4f542648", // naked seed → Gymnosperms
      traps: [
        {
          title: "Naked seed = Gymnosperm, enclosed seed = Angiosperm",
          body:
            "'Gymno-sperm' literally means 'naked seed'. If the seeds sit exposed on a cone (pine, cycas) it is a gymnosperm; if they are wrapped in a fruit (mango, pea) it is an angiosperm. Don't swap these.",
        },
        {
          title: "Pteridophytes are the FIRST vascular plants, not bryophytes",
          body:
            "Bryophytes have **no** vascular tissue — that is exactly why they are restricted to damp places. **Pteridophytes** (ferns) are the first plants with true xylem and phloem. A question asking 'first vascular plants' wants pteridophytes.",
        },
      ],
    },

    // Bryophytes — deeper (REFERENCE) — they carry 3 of the 4 PYQs
    {
      kind: "reference" as const,
      slug: "biodiv-bryophytes",
      name: "Bryophytes — the amphibians of the plant kingdom",
      intuition:
        "Bryophytes (mosses and liverworts) are the most-tested plant group because they sit at a famous halfway point — they live on land but still need water to reproduce, like an amphibian. " +
        "Three facts come up again and again: no vascular tissue, anchored by rhizoids (not true roots), and the dominant plant body is the gametophyte.",
      definition:
        "What the NDA tests about **Bryophytes**:\n" +
        "- Called the **'amphibians of the plant kingdom'** — they live on land but **need water for fertilisation** (sperm swim to the egg).\n" +
        "- **No specialised vascular (conducting) tissue** — no true xylem/phloem; this limits them to small size and damp habitats.\n" +
        "- Anchored to the ground by **rhizoids** (root-like threads), not true roots.\n" +
        "- The main plant body is the **gametophyte** (haploid generation).\n" +
        "- Examples: **Funaria** (moss), Marchantia (liverwort). *Note: Funaria is a moss, NOT a fungus.*",
      table: {
        columns: ["Statement about bryophytes", "True or false?"],
        rows: [
          { cells: ["They are the amphibians of the plant kingdom", "**True**"] },
          { cells: ["The plant body is a gametophyte", "**True**"] },
          { cells: ["Attached to the substratum by rhizoids", "**True**"] },
          {
            cells: ["Specialised water-conducting (vascular) tissue is present", "**False** — they have NONE"],
            noteAmber: "NDA 2023 — this is the FALSE statement the bank asks you to spot.",
          },
        ],
        caption:
          "When a bryophyte question asks for the 'incorrect' statement, it is almost always the one claiming they have vascular tissue.",
      },
      selfCheckExample: {
        prompt:
          "Which of these is NOT true of bryophytes: (a) they need water for fertilisation, (b) they have well-developed xylem and phloem, (c) they are anchored by rhizoids?",
        steps: [
          "Bryophytes do need water for fertilisation — true.",
          "Bryophytes have NO vascular tissue, so 'well-developed xylem and phloem' is false.",
          "They are anchored by rhizoids — true.",
        ],
        answer: "(b) is NOT true — bryophytes have no vascular tissue.",
      },
      practiceSet: [
        { prompt: "Do bryophytes have vascular tissue?", answer: "No", method: "no true xylem/phloem" },
        { prompt: "What anchors a bryophyte to the ground?", answer: "Rhizoids", method: "not true roots" },
        { prompt: "Funaria is a moss — true or false?", answer: "True", method: "it is a bryophyte, NOT a fungus" },
        { prompt: "Why do bryophytes need water to reproduce?", answer: "Sperm must swim to the egg for fertilisation" },
      ],
      pyqExampleId: "0422c1bc-5248-431a-bc7c-1cf5352e3d9e", // incorrect statement = vascular tissue present
      traps: [
        {
          title: "Funaria is a moss, not a fungus",
          body:
            "The name 'Funaria' looks like 'fungus', and the bank exploits this. **Funaria is a moss — a bryophyte**, a plant. A statement calling Funaria a fungus is false.",
        },
        {
          title: "Thallophytes (algae) are NOT well-differentiated",
          body:
            "A 'which statement is correct' question may offer 'Thallophytes have a well-differentiated body design' — this is **false**. Thallophytes (algae) have a simple, undifferentiated thallus with no root/stem/leaf.",
        },
      ],
    },
  ],
};
