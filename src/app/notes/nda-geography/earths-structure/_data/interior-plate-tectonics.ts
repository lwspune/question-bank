import type { SubtopicNote } from "@/app/notes/_types";

export const INTERIOR_PLATE_TECTONICS_NOTE: SubtopicNote = {
  subtopicName: "Earth's Interior, Crust and Plate Tectonics",
  title: "Earth's Interior, Crust and Plate Tectonics",
  oneLineDefinition:
    "The Earth is built in shells — crust, mantle, core — separated by discontinuities, and its rigid outer shell is broken into plates whose movements build mountains, open oceans and ring the Pacific with fire.",
  whyItMatters:
    "15 PYQs and the densest-HARD subtopic in the chapter. Two ideas earn most of the marks: the layer order and what each layer is made of (inner core SOLID, outer core LIQUID), and the three plate-boundary types. Get the lithosphere definition and the major-vs-minor plate list cold.",
  concepts: [
    // 1. interior layers (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "interior-layers",
      name: "The layers of the Earth and the lithosphere",
      intuition:
        "Cut the Earth open and you find concentric shells, like an onion. From outside in: a thin CRUST, a thick MANTLE of hot silicate rock, then the CORE — a liquid outer core and a solid inner core. " +
        "The word lithosphere does NOT mean the crust alone: it means the rigid outer shell that the tectonic plates are made of — the crust PLUS the topmost, rigid part of the mantle.",
      definition:
        "The shells, outside in:\n" +
        "- **Crust** — the thin outermost skin (oceanic 5–10 km, continental 30–70 km).\n" +
        "- **Mantle** — silicate rock down to ~2900 km. Its upper part includes the **asthenosphere**, a partially-molten, slowly-flowing layer that the plates ride on.\n" +
        "- **Outer core** — **LIQUID** iron-nickel; its motion generates Earth's magnetic field.\n" +
        "- **Inner core** — **SOLID** iron-nickel (solid despite being hottest, because the pressure is enormous).\n" +
        "**Lithosphere** = crust + uppermost SOLID mantle (the rigid plate layer). It sits ON TOP of the soft asthenosphere. The lithosphere is thickest under the great mountain belts (deep crustal roots) and thinnest under the oceans.",
      visualizationSlug: "esl-earth-interior-layers",
      authoredExample: {
        prompt:
          "Arrange these four layers from the Earth's surface inward: outer core, crust, inner core, mantle.",
        steps: [
          "The crust is the outermost skin you stand on.",
          "Below it lies the mantle, the thick silicate shell.",
          "Below the mantle is the liquid outer core.",
          "At the centre is the solid inner core.",
        ],
        answer: "Crust → Mantle → Outer core → Inner core.",
      },
      selfCheckExample: {
        prompt:
          "The lithosphere consists of which parts of the Earth?",
        steps: [
          "Lithosphere is the rigid plate layer, not just the crust.",
          "It is the crust welded to the topmost solid part of the mantle.",
          "It rests on the soft asthenosphere below.",
        ],
        answer: "The crust together with the uppermost solid mantle.",
      },
      practiceSet: [
        { prompt: "Which is solid — the inner core or the outer core?", answer: "Inner core", method: "outer core is liquid" },
        { prompt: "Lithosphere = crust + ?", answer: "Uppermost solid mantle" },
        { prompt: "Where is the lithosphere thickest?", answer: "Under high mountains (e.g. the Himalayas)" },
      ],
      pyqExampleId: "a032d287-35e2-4e1a-9d98-b77e9856d08e", // lithosphere = crust + uppermost solid mantle
      traps: [
        {
          title: "Lithosphere is NOT just the crust",
          body:
            "A favourite trap offers 'crust and core' or 'upper and lower mantle' as the lithosphere. Neither is right — the lithosphere is the **crust + uppermost solid mantle**, the rigid layer the plates are cut from.",
        },
        {
          title: "Hottest is not always liquid",
          body:
            "The inner core is the hottest part of the Earth yet it is **solid**, because the crushing pressure at the centre keeps the iron from melting. The cooler **outer core** is the one that is liquid.",
        },
      ],
    },

    // 2. discontinuities (REFERENCE)
    {
      kind: "reference" as const,
      slug: "discontinuities",
      name: "Discontinuities between the layers",
      intuition:
        "The boundaries where one shell gives way to the next are called discontinuities — places where the speed of seismic waves jumps because the material changes. Each one has a name, and the NDA loves to test which boundary sits where.",
      definition:
        "The named boundaries, surface inward:\n" +
        "- **Conrad** — within the continental crust (upper 'sial' over lower 'sima').\n" +
        "- **Mohorovicic (Moho)** — separates the **crust from the mantle**.\n" +
        "- **Repetti** — within the mantle (upper / lower mantle).\n" +
        "- **Gutenberg** — separates the **mantle from the outer core**.\n" +
        "- **Lehmann** — separates the **outer core from the inner core** (the innermost discontinuity).",
      table: {
        columns: ["Discontinuity", "Separates", "Position"],
        rows: [
          { cells: ["Conrad", "Upper / lower crust", "Shallow"] },
          {
            cells: ["**Mohorovicic (Moho)**", "Crust / mantle", "Base of crust"],
            noteAmber: "NDA 2022 — Moho is THE crust-mantle boundary.",
          },
          { cells: ["Repetti", "Upper / lower mantle", "Mid-mantle"] },
          { cells: ["Gutenberg", "Mantle / outer core", "Deep"] },
          {
            cells: ["**Lehmann**", "Outer core / inner core", "Innermost"],
            noteAmber: "NDA 2023 — Lehmann is the deepest, in the innermost part of the Earth.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which discontinuity is found in the innermost part of the Earth?",
        steps: [
          "Work inward: Moho (crust-mantle), Gutenberg (mantle-core), Lehmann (within the core).",
          "Lehmann separates the liquid outer core from the solid inner core — the deepest of all.",
        ],
        answer: "The Lehmann discontinuity.",
      },
      practiceSet: [
        { prompt: "Which discontinuity separates the crust from the mantle?", answer: "Mohorovicic (Moho)" },
        { prompt: "Which discontinuity lies between the mantle and outer core?", answer: "Gutenberg" },
        { prompt: "Name the innermost discontinuity.", answer: "Lehmann" },
      ],
      pyqExampleId: "72da53b2-8201-4d51-9ace-b46f106b2574", // Moho separates crust from mantle
      traps: [
        {
          title: "Moho vs Gutenberg",
          body:
            "Both are mid-Earth boundaries, but **Moho** is shallow (crust ↔ mantle) and **Gutenberg** is deep (mantle ↔ outer core). Don't swap them.",
        },
      ],
    },

    // 3. crust properties (formula)
    {
      kind: "formula" as const,
      slug: "crust-properties",
      name: "Oceanic vs continental crust",
      intuition:
        "There are two kinds of crust and they behave very differently. Oceanic crust is thin, dense and basaltic; continental crust is thick, light and granitic. Because oceanic crust is heavier, it is the one that sinks (subducts) when the two meet. And the whole crust is brittle — it cracks rather than flows, which is why it breaks into plates and snaps in earthquakes.",
      definition:
        "Key contrasts:\n" +
        "- **Oceanic crust** — thin (~5–10 km), DENSE, basaltic ('sima', rich in silica + magnesium). Being heavier, it subducts beneath continental crust.\n" +
        "- **Continental crust** — thick (~30–70 km), LIGHT, granitic ('sial', rich in silica + aluminium).\n" +
        "- The crust is **brittle**, not plastic — it fractures, which is why plate edges and faults exist.\n" +
        "- Most of the Earth's internal heat is stored in the **mantle**; convection in the MANTLE (not the crust) drives the plates.",
      authoredExample: {
        prompt:
          "Two slabs of crust collide: one oceanic, one continental. Which one slides underneath, and why?",
        steps: [
          "Compare densities: oceanic crust is basaltic and dense; continental crust is granitic and light.",
          "The denser slab cannot ride over the lighter one — it sinks.",
          "So the oceanic slab subducts beneath the continental slab.",
        ],
        answer: "The oceanic crust subducts, because it is denser (heavier) than continental crust.",
      },
      selfCheckExample: {
        prompt:
          "Statement: 'The Earth's crust is brittle.' Is this correct?",
        steps: [
          "Brittle means it cracks rather than flowing.",
          "The crust does fracture — that is exactly why faults and plate boundaries exist.",
        ],
        answer: "Correct — the crust is brittle in nature.",
      },
      practiceSet: [
        { prompt: "Which crust is denser, oceanic or continental?", answer: "Oceanic" },
        { prompt: "Continental crust is rich in which two elements (sial)?", answer: "Silica and aluminium" },
        { prompt: "Where is most of the Earth's internal heat stored?", answer: "In the mantle" },
      ],
      pyqExampleId: "7b130de4-de53-4d24-87b4-2b1965ca73fe", // crust brittle; ocean/continental thickness
      traps: [
        {
          title: "Convection is in the MANTLE, not the crust",
          body:
            "A multi-statement trap claims the convective cells that move plates circulate 'in the crust'. They circulate in the **mantle** (the asthenosphere). The crust is too thin and brittle to convect.",
        },
        {
          title: "Oceanic crust is thinner, not thicker",
          body:
            "Don't be talked into '30 km oceanic crust'. Oceanic crust is the THIN one (~5–10 km); the thick (~30–70 km) crust is continental.",
        },
      ],
    },

    // 4. crust composition + permeability (formula)
    {
      kind: "formula" as const,
      slug: "crust-composition",
      name: "What the crust is made of",
      intuition:
        "The crust is overwhelmingly silicate minerals. By abundance, feldspars and quartz dominate, followed by the ferromagnesian minerals (pyroxene, amphibole, mica). Knowing the rough abundance order, and that the crust's pore space controls how water moves through it, covers the odd composition question.",
      definition:
        "- The continental crust is mostly **silicate minerals** — feldspar (~half the crust) and quartz are the most abundant; pyroxene, amphibole and mica are the common dark (ferromagnesian) minerals.\n" +
        "- A rough crustal-abundance order among the dark minerals tested by the NDA: **mica < amphibole < pyroxene**.\n" +
        "- Crust also stores **groundwater** in its pore spaces. Whether rainfall becomes groundwater depends on **precipitation amount, evaporation rate, and the ground's ability to let water infiltrate** — not on how far the site is from the sea.",
      authoredExample: {
        prompt:
          "Three minerals — mica, amphibole, pyroxene — are listed. Put them in ascending order of how much of the crust they form.",
        steps: [
          "Mica is comparatively minor among the three.",
          "Amphibole is somewhat more abundant.",
          "Pyroxene is the most abundant of the three.",
        ],
        answer: "Mica < Amphibole < Pyroxene.",
      },
      selfCheckExample: {
        prompt:
          "Which of these does NOT affect how much rainfall becomes groundwater: precipitation amount, evaporation rate, ground's infiltration ability, distance from the sea?",
        steps: [
          "Precipitation supplies the water; evaporation removes it; infiltration ability decides how much soaks in.",
          "Distance from the sea has no direct bearing on local groundwater recharge.",
        ],
        answer: "Distance from the sea.",
      },
      practiceSet: [
        { prompt: "Which mineral makes up about half the Earth's crust?", answer: "Feldspar" },
        { prompt: "Order by crustal abundance: mica, amphibole, pyroxene.", answer: "Mica < Amphibole < Pyroxene" },
        { prompt: "Name one factor that does NOT control groundwater recharge.", answer: "Distance from the sea" },
      ],
      pyqExampleId: "dc889144-010b-4c95-aa63-8db533584e4f", // ascending mineral abundance order
    },

    // 5. plates and boundaries (formula + diagram)
    {
      kind: "formula" as const,
      slug: "plates-and-boundaries",
      name: "Tectonic plates and their boundaries",
      intuition:
        "The lithosphere is cracked into about seven MAJOR plates and several MINOR ones, all drifting on the asthenosphere. Where plate edges meet, three things can happen: they collide (convergent), they pull apart (divergent), or they grind past each other (transform). Almost every dramatic feature on Earth — mountains, ocean ridges, the Ring of Fire — sits on one of these three boundary types.",
      definition:
        "**Major plates** (7): Pacific, North American, South American, Eurasian, African, Indo-Australian, Antarctic. **Minor plates** include Cocos, Nazca, Caroline, Philippine, Arabian, Juan de Fuca.\n" +
        "The three boundary types:\n" +
        "- **Convergent** (collide): oceanic-continental → SUBDUCTION + volcanic arc + deep trench (Andes); continental-continental → fold mountains (Himalayas); oceanic-oceanic → island arcs (Japan).\n" +
        "- **Divergent** (separate): mid-ocean ridges, sea-floor spreading, new land (Mid-Atlantic Ridge — Iceland sits on it, giving geothermal energy, new land and tourism).\n" +
        "- **Transform** (slide past): strike-slip faults (San Andreas).\n" +
        "The **Ring of Fire** circles the Pacific — a belt of convergent subduction zones, hence an active seismic AND volcanic zone with deep trenches.",
      visualizationSlug: "esl-plate-boundary-types",
      authoredExample: {
        prompt:
          "Iceland sits astride the Mid-Atlantic Ridge. Name the boundary type and one benefit the islanders get from it.",
        steps: [
          "The Mid-Atlantic Ridge is where two plates pull apart — a divergent boundary.",
          "Rising magma there gives geothermal heat, builds new land, and draws tourists.",
        ],
        answer: "A divergent boundary; benefits include geothermal energy (also new land and tourism).",
      },
      selfCheckExample: {
        prompt: "Which one is a MAJOR plate: Cocos, Arabian, Pacific, Philippine?",
        steps: [
          "Cocos, Arabian and Philippine are all minor plates.",
          "The Pacific is the largest of the major plates.",
        ],
        answer: "The Pacific Plate.",
      },
      practiceSet: [
        { prompt: "Name the boundary type that builds the Himalayas.", answer: "Convergent (continental-continental collision)" },
        { prompt: "What forms at a divergent boundary in an ocean?", answer: "A mid-ocean ridge (sea-floor spreading)" },
        { prompt: "The San Andreas Fault is which boundary type?", answer: "Transform" },
        { prompt: "Is the Antarctic Plate major or minor?", answer: "Major" },
      ],
      pyqExampleId: "21fbe2f1-b841-46be-bb41-d49a12801ee3", // Ring of Fire statements
      traps: [
        {
          title: "Antarctic is a MAJOR plate",
          body:
            "A 'which is NOT a minor plate' question hides the **Antarctic Plate** among Cocos/Nazca/Caroline. Antarctic is one of the seven majors, so it is the odd one out.",
        },
        {
          title: "Ring of Fire ≠ purely convergent",
          body:
            "The Ring of Fire is dominated by convergent subduction, but it also includes transform segments, so 'a zone of convergent boundaries' is treated as not fully correct. What IS always true: it is an active seismic + volcanic zone with deep trenches.",
        },
      ],
    },

    // 6. folds and crustal deformation (formula)
    {
      kind: "formula" as const,
      slug: "folds-deformation",
      name: "Folds and crustal deformation",
      intuition:
        "When plates push together, layered rock buckles into folds instead of breaking. The shape of a fold is described by its axial plane — the imaginary surface that splits the fold symmetrically. As compression increases, folds tilt from upright to overturned to recumbent (lying down).",
      definition:
        "Fold types by how far compression has tilted the axial plane:\n" +
        "- **Symmetrical / upright** — axial plane vertical.\n" +
        "- **Asymmetrical** — axial plane inclined.\n" +
        "- **Overturned** — one limb pushed past vertical.\n" +
        "- **Recumbent** — axial plane virtually **HORIZONTAL** (extreme compression, the fold lies on its side).\n" +
        "- **Isoclinal** — both limbs parallel (dipping the same way).\n" +
        "Folding at convergent boundaries is how fold mountains (Himalayas, Alps) are raised.",
      authoredExample: {
        prompt:
          "In which fold is the axial plane virtually horizontal?",
        steps: [
          "Upright = vertical axial plane; asymmetrical/overturned = inclined.",
          "As compression lays the fold flat, the axial plane approaches horizontal.",
          "That extreme is the recumbent fold.",
        ],
        answer: "A recumbent fold.",
      },
      practiceSet: [
        { prompt: "A fold whose axial plane is horizontal is called?", answer: "Recumbent" },
        { prompt: "Folding builds which class of mountains?", answer: "Fold mountains (e.g. Himalayas)" },
      ],
      pyqExampleId: "3e803d01-e64a-4e1b-a03c-fdabef2cc60d", // recumbent fold axial plane horizontal
    },
  ],
};
