import type { SubtopicNote } from "@/app/notes/_types";

export const ALLOTROPES_NOTE: SubtopicNote = {
  subtopicName: "Allotropes of Carbon",
  title: "Allotropes of Carbon",
  oneLineDefinition:
    "The same element, carbon, crystallises in different structures — diamond, graphite, fullerene and graphene — each with its own bonding and dramatically different properties.",
  whyItMatters:
    "The single highest-yield subtopic in the chapter — 15 PYQs, recurring almost every year. " +
    "The bank tests it two ways: a straight 'match the allotrope to its property' table, and a 'which statement is NOT correct' trap where one allotrope's property is quietly swapped (diamond made a conductor, graphite made the second-hardest). Learn the structure→property chain for each and the traps fall away.",
  concepts: [
    // master reference table — the crystalline allotropes
    {
      kind: "reference" as const,
      slug: "crystalline-allotropes",
      name: "Crystalline allotropes — structure, hybridisation and properties",
      intuition:
        "Allotropes are different structural forms of the same element. For carbon, the bonding pattern decides everything: a 3-D tetrahedral network gives the hardest natural substance (diamond); flat sheets that slide give a soft conductor (graphite); a closed cage gives the purest form (fullerene); a single sheet gives the thinnest, strongest material (graphene). " +
        "Same element, four completely different materials.",
      definition:
        "The four crystalline allotropes the bank tests:\n" +
        "- **Diamond** — each carbon is **sp³**, bonded to four others in a rigid **3-D tetrahedral network**. Result: **hardest natural substance**, an electrical **insulator** (no free electrons), high refractive index. Its structure is **isomorphous with crystalline silicon**.\n" +
        "- **Graphite** — each carbon is **sp²**, bonded to three others in flat **hexagonal sheets**; the sheets are held by weak forces and slide. Result: **soft and slippery** (a lubricant and pencil 'lead'), a **good conductor** (delocalised electrons), and the **thermodynamically most stable** form of carbon.\n" +
        "- **Fullerene** (e.g. **C₆₀**, buckminsterfullerene) — sp², a closed **cage** that looks like a football. It is regarded as the **purest** form of carbon.\n" +
        "- **Graphene** — a **single one-atom-thick sheet** of graphite; the **thinnest and strongest** known material.",
      table: {
        columns: ["Allotrope", "Structure / hybridisation", "Key property", "Use / identity"],
        rows: [
          {
            cells: ["Diamond", "3-D tetrahedral network, sp³", "Hardest natural substance; electrical insulator", "Cutting/abrasives; isomorphous with silicon"],
            noteAmber: "Diamond does NOT conduct electricity — all four electrons are locked in covalent bonds.",
          },
          {
            cells: ["Graphite", "Flat hexagonal sheets, sp²", "Soft, slippery; good conductor; most stable form", "Pencil lead, lubricant, electrodes"],
          },
          {
            cells: ["Fullerene (C₆₀)", "Closed cage (football), sp²", "Purest form of carbon", "Nanotechnology, lubricants"],
          },
          {
            cells: ["Graphene", "Single one-atom-thick sheet, sp²", "Thinnest and strongest material", "Electronics, composites"],
          },
        ],
        caption: "Diamond = hardest + insulator; Graphite = soft + conductor + most stable; Fullerene = purest; Graphene = thinnest & strongest.",
      },
      pyqExampleId: "039d5697-f299-4dec-850c-1dd0979cc3c0", // match allotrope to property
      selfCheckExample: {
        prompt: "Which crystalline allotrope of carbon has the same structure as crystalline silicon, and why?",
        steps: [
          "Crystalline silicon has a 3-D tetrahedral covalent network.",
          "Diamond has the identical sp³ tetrahedral network of carbon atoms.",
          "Same structure type means the two are isomorphous.",
        ],
        answer: "Diamond — its sp³ tetrahedral network is isomorphous with crystalline silicon.",
      },
      practiceSet: [
        { prompt: "Which allotrope of carbon is the hardest natural substance?", answer: "Diamond" },
        { prompt: "Which allotrope is used as a lubricant and in pencil lead?", answer: "Graphite" },
        { prompt: "Which allotrope is the purest form of carbon?", answer: "Fullerene (C₆₀)" },
        { prompt: "Which allotrope is the thinnest and strongest material?", answer: "Graphene" },
        { prompt: "Which is the thermodynamically most stable form of carbon?", answer: "Graphite" },
        { prompt: "Hybridisation of carbon in graphite?", answer: "sp²" },
      ],
      traps: [
        {
          title: "Graphite is sp², diamond is sp³",
          body:
            "A statement that 'the hybridisation of each carbon in graphite is sp³' is **NOT true** — graphite is **sp²** (three bonds per carbon, in sheets). Diamond is the sp³ one.",
        },
        {
          title: "Only fullerene is cage-like",
          body:
            "Of diamond, graphite and fullerene, **only fullerene** has a cage (football) structure. Diamond is a network and graphite is layered sheets.",
        },
      ],
    },

    // allotrope property-traps + impure / non-allotropes
    {
      kind: "reference" as const,
      slug: "allotrope-traps-and-impure-forms",
      name: "Property traps and impure forms of carbon",
      intuition:
        "Most allotrope questions are phrased as 'which statement is NOT correct'. The bank takes a true property of one allotrope and swaps it onto another — diamond made a conductor, graphite made the second-hardest, graphite's weak interlayer forces called covalent bonds. " +
        "It also slips in fly ash, which sounds carbon-y but is a combustion residue, not an allotrope.",
      definition:
        "The false claims to recognise, and the truth behind each:\n" +
        "- 'Diamond is a good conductor' → **False**: diamond is an **insulator**.\n" +
        "- 'Graphite is the second-hardest substance' → **False**: graphite is **soft and slippery**.\n" +
        "- 'Graphite layers are held together by carbon–carbon single bonds' → **False**: held by **weak van der Waals forces** (that is why the layers slide).\n" +
        "- 'Diamond and graphite differ in both physical AND chemical properties' → **False**: same element, so the **chemistry is identical**; only **physical** properties differ.\n" +
        "- 'Fly ash is an allotrope of carbon' → **False**: fly ash is a **combustion residue**, not an allotrope.",
      table: {
        columns: ["Common false claim", "The truth"],
        rows: [
          { cells: ["Diamond conducts electricity", "Insulator — no free electrons"] },
          { cells: ["Graphite is the second-hardest substance", "Soft and slippery (a lubricant)"] },
          { cells: ["Graphite layers held by covalent single bonds", "Held by weak van der Waals forces"] },
          {
            cells: ["Diamond and graphite differ chemically", "Same element → same chemistry; only physical properties differ"],
            noteAmber: "Allotropes are the SAME element, so they always share chemical properties — only physical properties change.",
          },
          { cells: ["Fly ash is an allotrope of carbon", "A combustion residue, not an allotrope"] },
        ],
      },
      pyqExampleId: "73d566b5-1f69-4c45-926d-d502517b8da9", // diamond good conductor is NOT correct
      practiceSet: [
        { prompt: "True or false: diamond conducts electricity.", answer: "False", method: "diamond is an insulator" },
        { prompt: "What holds the layers of graphite together?", answer: "Weak van der Waals forces" },
        { prompt: "Is fly ash an allotrope of carbon?", answer: "No", method: "it is a combustion residue" },
        { prompt: "Do diamond and graphite have the same chemical properties?", answer: "Yes", method: "same element; only physical properties differ" },
      ],
      traps: [
        {
          title: "Allotropes share chemistry, not physics",
          body:
            "Because allotropes are the same element, their **chemical** properties match — both diamond and graphite burn to give CO₂. The statement that they differ in *both* physical and chemical properties is the wrong one.",
        },
      ],
    },
  ],
};
