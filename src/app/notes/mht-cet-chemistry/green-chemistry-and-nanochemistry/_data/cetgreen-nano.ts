import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/green-chemistry-and-nanochemistry";

export const NANO_NOTE: SubtopicNote = {
  subtopicName: "Nanochemistry, Nanostructures, Classification and Synthesis",
  title: "Nanochemistry: Dimensions, Sol–Gel Synthesis and Characterisation",
  oneLineDefinition:
    "A nanomaterial has at least one dimension between 1 and 100 nm; it is classed by how many of its dimensions lie OUTSIDE that range, made by the sol–gel route, and identified with UV-visible, FTIR, XRD, SEM and TEM.",
  whyItMatters:
    "14 PYQs, mostly EASY. Seven classify a nanostructure by dimension or place something on the size scale, six ask which technique or step does what, and one asks about silver nanoparticles. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetgreen-nano-dimensions",
      name: "Classifying Nanostructures by Dimension",
      intuition:
        "Count the dimensions that are NOT nanoscale. A quantum dot is small every way, so it is zero-dimensional. A wire is long in one direction — one-dimensional. A film is wide in two — two-dimensional.",
      definition:
        "- **0-D**: nanoparticles, **quantum dots**, nano-rings, microcapsules.\n" +
        "- **1-D**: **nanowires, nanotubes**, nanorods, fibres.\n" +
        "- **2-D**: **thin films**, layers, coatings.\n" +
        "- **Size scale**: water, glucose (molecules) < virus < **bacteria** (largest of these).\n" +
        "- **Use**: **silver nanoparticles** kill E. coli in water purification.",
      table: {
        columns: ["Dimension", "Examples"],
        rows: [
          { cells: ["0-D", "**Quantum dots**, nanoparticles, nano-rings"], pyqExampleId: "9236e1b4-59a1-4adf-94dc-d3c3b92347f5" },
          { cells: ["1-D", "**Nanowires**, **nanotubes**, nanorods"], pyqExampleId: "7446138d-1587-400a-994b-a32ab8f941d0" },
          { cells: ["2-D", "**Thin films**, coatings"], pyqExampleId: "b7ad624c-6a3b-4ba7-b0da-cba5457e8f6f" },
          { cells: ["Largest of water, glucose, virus, bacteria", "**Bacteria**"], pyqExampleId: "f5602b3e-2ae6-4ca4-ad6a-65341f48f71b" },
          { cells: ["Removes E. coli from water", "**Silver nanoparticles**"], pyqExampleId: "d577b67c-bc7a-42d8-a064-6263c2b55cfc" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is a one-dimensional nanostructure: nano-rings, nanotubes, layers and coatings, quantum dots?",
        steps: ["A nanotube is long in one direction and nanoscale in the other two."],
        answer: "Nanotubes",
      },
      practiceSet: [
        { prompt: "Zero-dimensional: nanorods, nanoparticles, thin films, fibres?", answer: "Nanoparticles" },
        { prompt: "Which are zero-dimensional: nanowires; microcapsules, quantum dots and nano-rings; nanotubes; nanofilms?", answer: "Microcapsules, quantum dots and nano-rings" },
      ],
      pyqExampleId: "f3de3f71-a130-41f1-b921-2d8ed57cc665",
      traps: [
        {
          title: "Nano-rings as one-dimensional",
          body: "A ring looks like a bent wire, but the textbook lists nano-rings with quantum dots as zero-dimensional.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetgreen-nano-synthesis-characterisation",
      name: "Sol–Gel Synthesis and the Characterisation Techniques",
      intuition:
        "Sol–gel builds an oxide network from a solution: hydrolyse the precursor, let it condense into a gel, age it, dry it, and finally dehydrate it. Then each instrument answers one question — UV-visible is the quick first check, FTIR the bonding, XRD the crystal structure, SEM the surface, TEM the size.",
      definition:
        "- **Sol–gel**: **hydrolysis → polycondensation** (oxide or alcohol-bridged network) → aging of the gel → drying → **dehydration** (last step).\n" +
        "- **UV-visible spectroscopy**: **preliminary confirmation** of nanoparticles.\n" +
        "- **FTIR**: absorption by **functional groups** — the **binding nature**.\n" +
        "- **XRD**: crystal structure and phase. **SEM**: morphology. **TEM**: **particle size**.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Order of the sol–gel reactions", "**Hydrolysis, then polycondensation**"], pyqExampleId: "b43fc2ab-3387-42ab-815d-bc11fb90d3fc" },
          { cells: ["Last step of wet chemical synthesis", "**Dehydration**"], pyqExampleId: "6c31e7d9-8f2e-4f27-baf7-d8622c230416" },
          { cells: ["Preliminary confirmation", "**UV-visible spectroscopy**"], pyqExampleId: "7e610d71-c13d-4613-8b30-bc94c7eda5a5" },
          { cells: ["Information from FTIR", "**Functional-group absorption**"], pyqExampleId: "b451d51b-177a-49ff-bb6a-c524ecb228d6" },
          { cells: ["Binding nature", "**FTIR**"], pyqExampleId: "33c0739a-3827-4724-b6a0-a2a3e9aaa28b" },
          { cells: ["Particle size", "**TEM**"], pyqExampleId: "00370f4c-324f-4a48-a430-09183683a883" },
        ],
      },
      selfCheckExample: {
        prompt: "Which instrument determines particle size: SEM, TEM, FTIR, UV-visible?",
        steps: ["TEM images individual particles at the nanometre scale."],
        answer: "TEM",
      },
      pyqExampleId: "6c31e7d9-8f2e-4f27-baf7-d8622c230416",
      traps: [
        {
          title: "Drying as the last step",
          body: "Drying of the gel comes before the final dehydration, which is the last step the paper asks for.",
        },
      ],
    },
  ],
  related: [
    { label: "Green chemistry", href: `${BASE}/cetgreen-green` },
  ],
};
