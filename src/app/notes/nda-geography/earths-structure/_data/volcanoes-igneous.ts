import type { SubtopicNote } from "@/app/notes/_types";

export const VOLCANOES_IGNEOUS_NOTE: SubtopicNote = {
  subtopicName: "Volcanoes and Igneous Activity",
  title: "Volcanoes and Igneous Activity",
  oneLineDefinition:
    "Magma rising from the mantle either erupts at the surface to build volcanoes and extrusive rock, or cools at depth into intrusive bodies like batholiths — the starting point of the rock cycle.",
  whyItMatters:
    "5 PYQs, mostly MODERATE. The reliable earners are: the volcano shapes (especially the explosive composite cone), the named volcanic deposits (tuff, lapilli), and the intrusive igneous forms (batholith, laccolith). 'Igneous' simply means 'born of fire' — formed from cooled magma or lava.",
  concepts: [
    // 1. volcano types (reference + diagram)
    {
      kind: "reference" as const,
      slug: "volcano-types",
      name: "Types of volcano",
      intuition:
        "A volcano's shape is set by how runny its lava is. Thin, runny basaltic lava spreads far and builds a low, wide SHIELD (Hawaii). Thick, sticky lava traps gas and erupts EXPLOSIVELY, piling up steep COMPOSITE cones of lava and ash in layers (Fuji, Vesuvius, Mount Ibu). Small piles of cinders around a vent are CINDER cones.",
      definition:
        "- **Shield volcano** — gentle slopes, runny basaltic lava, quiet effusive eruptions (Mauna Loa, Hawaii).\n" +
        "- **Composite / stratovolcano** — steep cone built of alternating lava and ash; **EXPLOSIVE** eruptions throwing out **pyroclastic** material that accumulates in layers near the vent (Fuji, Vesuvius, Mount Ibu in Indonesia).\n" +
        "- **Cinder cone** — small, steep heap of cinders around a single vent.\n" +
        "- **Volcanic / lava dome** — thick lava piled over the vent without flowing far.",
      visualizationSlug: "esl-volcano-types",
      table: {
        columns: ["Type", "Lava / eruption", "Shape", "Example"],
        rows: [
          { cells: ["Shield", "Runny basalt · effusive", "Low, wide", "Mauna Loa"] },
          {
            cells: ["**Composite**", "Sticky · **explosive**, pyroclastic", "Steep cone, layered", "Fuji, Mount Ibu"],
            noteAmber: "NDA 2026 — composite = explosive + pyroclastic + layers near the vent.",
          },
          { cells: ["Cinder cone", "Cinders around a vent", "Small, steep", "Paricutin"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A volcano erupts explosively, ejecting pyroclastic ash that piles in layers near the vent, building a steep cone. Which type is it?",
        steps: [
          "Explosive + pyroclastic + steep layered cone are the signatures of one type.",
          "Shield volcanoes are quiet and low; cinder cones are small.",
          "The explosive, layered cone is the composite (strato) volcano.",
        ],
        answer: "A composite (stratovolcano).",
      },
      practiceSet: [
        { prompt: "Which volcano type erupts most explosively?", answer: "Composite (stratovolcano)" },
        { prompt: "Hawaii's gently-sloping volcanoes are which type?", answer: "Shield" },
        { prompt: "Mount Ibu (Indonesia) is which type?", answer: "Composite" },
      ],
      pyqExampleId: "62cc35e6-7c3b-4175-b7c4-8a3cbf06492a", // composite volcano statements (all three)
      traps: [
        {
          title: "Explosive = composite, not shield",
          body:
            "Shield volcanoes are the QUIET ones (runny lava). If a question stresses explosive eruptions and pyroclastic ash, the answer is the **composite** cone.",
        },
      ],
    },

    // 2. volcanic materials (reference)
    {
      kind: "reference" as const,
      slug: "volcanic-materials",
      name: "Volcanic ejecta and deposits",
      intuition:
        "An erupting volcano throws out fragments of every size — fine ash, pea-sized lapilli, and large bombs. When that loose ash is later carried by running water and laid down in layers, it hardens into a soft rock called tuff. Knowing the names of these deposits handles the 'what is this volcanic material' questions.",
      definition:
        "- **Pyroclastic material** — fragments blasted out in an explosive eruption.\n" +
        "- **Ash** (finest) → **lapilli** (pea- to walnut-sized) → **bombs / blocks** (largest).\n" +
        "- **Tuff** — rock formed when volcanic **ash is carried by running water and deposited as a sedimentary layer**, then cemented.",
      table: {
        columns: ["Material", "What it is"],
        rows: [
          { cells: ["Ash", "Finest volcanic dust"] },
          { cells: ["Lapilli", "Pea- to walnut-sized fragments"] },
          {
            cells: ["**Tuff**", "Hardened, water-deposited volcanic ash"],
            noteAmber: "NDA 2025 — ash carried by water and deposited as a layer becomes tuff.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Volcanic ash is washed downstream and settles as a sedimentary layer that hardens. What is the rock called?",
        steps: [
          "Loose ash + water transport + deposition in a layer.",
          "When that ash bed cements, it becomes a soft volcanic rock.",
          "That rock is tuff.",
        ],
        answer: "Tuff.",
      },
      practiceSet: [
        { prompt: "Pea-sized volcanic fragments are called?", answer: "Lapilli" },
        { prompt: "Water-deposited volcanic ash hardens into?", answer: "Tuff" },
      ],
      pyqExampleId: "a92394e8-7a01-4e90-a17c-52b1be8c5400", // volcanic ash + water -> tuff
    },

    // 3. intrusive igneous forms (reference)
    {
      kind: "reference" as const,
      slug: "intrusive-igneous-forms",
      name: "Intrusive igneous bodies",
      intuition:
        "Not all magma reaches the surface. Much of it cools slowly underground, freezing into shaped bodies called intrusions. The biggest and deepest is the BATHOLITH — a vast dome of granite at the roots of mountains. Smaller intrusions (laccolith, lopolith, phacolith, sill, dyke) take their names from their shape and position.",
      definition:
        "- **Batholith** — the LARGEST, deepest intrusive body; a huge dome of magma cooled deep in the crust (the 'lowermost/innermost' intrusion). Granite forms here.\n" +
        "- **Laccolith** — a mushroom-shaped dome that arches the overlying strata up.\n" +
        "- **Lopolith** — a saucer-shaped (downward-sagging) intrusion.\n" +
        "- **Phacolith** — a lens-shaped intrusion in the crest/trough of a fold.\n" +
        "- **Sill** (horizontal sheet) and **dyke** (vertical sheet) — thin tabular intrusions.",
      table: {
        columns: ["Intrusion", "Shape / position"],
        rows: [
          {
            cells: ["**Batholith**", "Largest, deepest dome of magma"],
            noteAmber: "NDA 2021 & 2023 — the large, deep-seated magma dome is the batholith.",
          },
          { cells: ["Laccolith", "Mushroom dome arching strata up"] },
          { cells: ["Lopolith", "Saucer-shaped (sagging)"] },
          { cells: ["Phacolith", "Lens in a fold crest/trough"] },
          { cells: ["Sill / Dyke", "Horizontal / vertical sheet"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A large body of magma cools deep in the crust and forms a big dome. Name this intrusive form.",
        steps: [
          "Deep + large + dome-shaped points to the biggest intrusion.",
          "Laccoliths and lopoliths are smaller, shallower shapes.",
          "The deep, large dome is the batholith.",
        ],
        answer: "A batholith.",
      },
      practiceSet: [
        { prompt: "The largest, deepest intrusive igneous body is?", answer: "Batholith" },
        { prompt: "A mushroom-shaped intrusion that domes up the strata is?", answer: "Laccolith" },
      ],
      pyqExampleId: "d8f79158-3fb7-45ef-bcc1-a1aab6da96bf", // large deep magma dome = batholith
      traps: [
        {
          title: "Batholith vs Laccolith",
          body:
            "Both are domes, but **batholith** is the giant, deep-seated one, while a **laccolith** is a smaller, shallower mushroom that pushes the overlying layers upward.",
        },
      ],
    },
  ],
};
