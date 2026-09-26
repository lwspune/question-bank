import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/surface-chemistry";

export const CATALYSIS_NOTE: SubtopicNote = {
  subtopicName: "Catalysis and Nanomaterials",
  title: "Catalysis: Homogeneous and Heterogeneous, Promoters and Inhibitors, and Nanomaterials",
  oneLineDefinition:
    "A catalyst changes the rate of a reaction without being used up; it may share the reactants' phase or not, can be helped by a promoter or opposed by an inhibitor, and works best when finely divided — which is why nanomaterials make good catalysts.",
  whyItMatters:
    "6 PYQs, none HARD. Three name a catalyst's role or type — K₂O in the Haber process, glycerol with H₂O₂, nickel in hydrogenation; three are about nanomaterials — TiO₂ in photocatalysis, what SEM measures, and nano properties. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetsurf-catalysis-types",
      name: "Homogeneous and Heterogeneous Catalysis, Promoters and Inhibitors",
      intuition:
        "Ask two questions. Is the catalyst in the same phase as the reactants (homogeneous) or a different one (heterogeneous)? And does the added substance speed the catalyst up (promoter) or slow the reaction down (inhibitor, a negative catalyst)?",
      definition:
        "- **Homogeneous**: catalyst and reactants in **one phase** — SO₂ oxidised with NO (gases); sugar hydrolysed with aqueous H₂SO₄.\n" +
        "- **Heterogeneous**: **different phases** — solid **Ni** hydrogenating liquid oil; Fe in the Haber process; Pt/V₂O₅ in the contact process.\n" +
        "- **Promoter**: raises a catalyst's efficiency — **K₂O and Al₂O₃ for Fe** in the Haber process; Mo as well.\n" +
        "- **Inhibitor** (negative catalyst): slows a reaction — **glycerol** retards the decomposition of H₂O₂.",
      table: {
        columns: ["Reaction", "Catalyst", "Kind"],
        rows: [
          { cells: ["Vegetable oil + H₂ → ghee", "Ni (solid)", "**Heterogeneous**"], pyqExampleId: "ee82af13-e766-45bb-a1a5-d18592f559df" },
          { cells: ["N₂ + 3H₂ ⇌ 2NH₃ (Haber)", "Fe, with **K₂O** as promoter", "Heterogeneous; K₂O a promoter"], pyqExampleId: "e2f12aef-bafc-438f-b2d6-b4d2008798dc" },
          { cells: ["2H₂O₂ → 2H₂O + O₂", "**glycerol** slows it", "**Inhibitor**"], pyqExampleId: "3e318f30-af70-4728-9d3b-a933ef219001" },
          { cells: ["2SO₂ + O₂ → 2SO₃ (lead chamber)", "NO (gas)", "Homogeneous"] },
          { cells: ["Sucrose + H₂O → glucose + fructose", "H₂SO₄ (aq)", "Homogeneous"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is heterogeneous catalysis: SO₂ oxidised with NO; H₂O₂ decomposed with aqueous I⁻; sugar hydrolysed with aq. H₂SO₄; vegetable oil hydrogenated with Ni?",
        steps: ["Only the last has the catalyst (solid Ni) in a different phase from the reactants."],
        answer: "Hydrogenation of vegetable oil with Ni",
      },
      practiceSet: [
        { prompt: "Role of K₂O in the Haber process?", answer: "Promoter" },
        { prompt: "Role of glycerol in the decomposition of H₂O₂?", answer: "Inhibitor" },
      ],
      pyqExampleId: "ee82af13-e766-45bb-a1a5-d18592f559df",
      traps: [
        {
          title: "Calling a promoter the catalyst",
          body: "In the Haber process the catalyst is iron. K₂O is offered as 'catalyst' — it only makes the iron work better.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetsurf-nanomaterials",
      name: "Nanomaterials and Nanocatalysts",
      intuition:
        "Cut a solid into nanoparticles and its surface area per gram shoots up, so more of it is exposed to react — better catalysts. The same shrinking changes other properties too: nanoclusters of metals become HARDER, not softer, and carbon nanotubes conduct electricity.",
      definition:
        "- **Surface area** rises as particle size falls — hence higher **catalytic activity**.\n" +
        "- **Photocatalysis**: nano **TiO₂** (absorbs UV and generates reactive species).\n" +
        "- Nano **Cu and Pd clusters are harder** than the bulk metal.\n" +
        "- **Carbon nanotubes** conduct electricity.\n" +
        "- **Characterisation**: **SEM** — structure of the material's SURFACE; XRD — crystal structure; TEM — size and shape.",
      authoredExample: {
        prompt: "Which statement about nanomaterials is NOT correct: surface area rises as particle size falls; nano catalysts are more active; nano Cu and Pd clusters are much softer than bulk; carbon nanotubes conduct electricity?",
        steps: [
          "Surface area and catalytic activity both rise at the nanoscale — true.",
          "Nano metal clusters are HARDER than the bulk metal, so 'softer' is the false statement.",
        ],
        answer: "Nano Cu and Pd clusters are much softer than bulk",
      },
      selfCheckExample: {
        prompt: "What does scanning electron microscopy tell you about a material?",
        steps: ["An SEM image shows the topography of the surface."],
        answer: "The structure of the material's surface",
      },
      practiceSet: [
        { prompt: "Nanoparticle used in photocatalysis: TiO₂, Pd, Pt, Au?", answer: "TiO₂" },
      ],
      pyqExampleId: "517cd9da-a946-4048-bbbb-02e7ba8d5922",
    },
  ],
  related: [
    { label: "Adsorption — the step a solid catalyst depends on", href: `${BASE}/cetsurf-adsorption` },
    { label: "Colloids", href: `${BASE}/cetsurf-colloids` },
  ],
};
