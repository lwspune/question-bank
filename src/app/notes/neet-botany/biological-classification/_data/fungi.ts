import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BC_FUNGI_NOTE: SubtopicNote = {
  subtopicName: "Fungi",
  title: "Fungi",
  oneLineDefinition:
    "The fungal body and how fungi feed and reproduce, the three steps of the sexual cycle, and the four classes of fungi with their spores and NCERT's example genera.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026: NEET 2021, NEET 2022, two in NEET 2024 and one in Re-NEET 2026. Two ask about the sexual cycle (plasmogamy, karyogamy and meiosis), one about the asexual spores of Penicillium, and two about the classes: the common names of four genera and the basis on which the classes are made.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobc-fungal-body",
      name: "Fungal body, nutrition and reproduction",
      intuition:
        "Bread mould, the rot on an orange, mushrooms and the yeast in bread are all fungi. Apart from yeast, a fungus is a mass of fine threads that grows into its food and soaks it up. Fungi are heterotrophs: most live on dead matter, some on living hosts, and some in partnership with algae or plant roots.",
      definition:
        "The fungal body:\n" +
        "- Fungi are **filamentous**, except **yeasts**, which are **unicellular**.\n" +
        "- Each thread is a **hypha**; a network of hyphae is a **mycelium**.\n" +
        "- Hyphae with no cross walls and many nuclei in one continuous cytoplasm are **coenocytic**; others have **septae**.\n" +
        "- The cell wall is made of **chitin and polysaccharides**.\n\n" +
        "The sexual cycle has three steps:\n" +
        "- **Plasmogamy**: fusion of the protoplasms of two motile or non-motile gametes.\n" +
        "- **Karyogamy**: fusion of the two nuclei.\n" +
        "- **Meiosis** in the zygote, giving **haploid spores**.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Saprophytes", "Absorb soluble organic matter from dead substrates"] },
          { cells: ["Parasites", "Depend on living plants and animals"] },
          { cells: ["Symbionts", "With algae as lichens; with the roots of higher plants as mycorrhiza"] },
          { cells: ["Vegetative reproduction", "Fragmentation, fission and budding"] },
          {
            cells: ["Asexual spores", "Conidia, sporangiospores or zoospores"],
            noteAmber: "NEET 2022: *Penicillium* reproduces asexually by conidia.",
            pyqExampleId: "fa4723c8-6d7c-4801-aedb-a79f8b7118a3",
          },
          { cells: ["Sexual spores", "Oospores, ascospores and basidiospores"] },
          {
            cells: ["Order of the sexual cycle", "Plasmogamy, then karyogamy, then meiosis"],
            noteAmber: "Re-NEET 2026 matched the three: protoplasm fusion is plasmogamy, nuclear fusion is karyogamy, haploid spores come from meiosis.",
            pyqExampleId: "8feb970b-823d-4308-a620-d5d0efec3bcc",
          },
          { cells: ["Start of the sexual cycle", "Two haploid hyphae of compatible mating types come together and fuse"] },
          { cells: ["Dikaryon", "In ascomycetes and basidiomycetes a stage with two nuclei per cell (n + n) comes between plasmogamy and karyogamy; this phase is the dikaryophase"] },
          { cells: ["Fruiting bodies", "Where reduction division (meiosis) takes place, giving haploid spores"] },
          { cells: ["Familiar fungi", "Yeast for bread and beer; *Puccinia* causes wheat rust; *Penicillium* gives antibiotics; a parasitic fungus makes white spots on mustard leaves"] },
        ],
      },
      pyqExampleId: "a42c4448-bc42-49f5-8dba-2053daf3e1ab",
      selfCheckExample: {
        prompt: "In a fungus, two compatible hyphae have fused, but each cell now holds two separate haploid nuclei. What is this stage called, and in which two classes of fungi does it occur?",
        steps: [
          "Two separate nuclei in one cell (n + n) is a dikaryon; the phase is the dikaryophase.",
          "NCERT names ascomycetes and basidiomycetes as the classes with this stage.",
        ],
        answer: "The dikaryon (dikaryophase), seen in ascomycetes and basidiomycetes.",
      },
      practiceSet: [
        { prompt: "What is a network of fungal hyphae called?", answer: "A mycelium" },
        { prompt: "What are fungal hyphae with no cross walls and many nuclei in one continuous cytoplasm called?", answer: "Coenocytic hyphae" },
        { prompt: "Which substance, along with polysaccharides, makes up the fungal cell wall?", answer: "Chitin" },
        { prompt: "Name the three kinds of sexual spores formed by fungi.", answer: "Oospores, ascospores and basidiospores" },
        { prompt: "Which fungus is unicellular and is used to make bread and beer?", answer: "Yeast" },
      ],
      traps: [
        {
          title: "Karyogamy fuses nuclei, not cells",
          body: "**Karyogamy** is the fusion of two **nuclei**. Fusion of the protoplasms of two gametes is **plasmogamy**, and it comes first.",
        },
        {
          title: "Living host means parasite",
          body: "A fungus that depends on **living** plants or animals is a **parasite**. A **saprophyte** absorbs food from **dead** matter.",
        },
        {
          title: "Meiosis comes last",
          body: "In the fungal sexual cycle the order is **plasmogamy, karyogamy, meiosis**. Meiosis in the zygote gives the haploid spores.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobc-fungal-classes",
      name: "The four classes of fungi",
      intuition:
        "Fungi are split into four classes by three things: what the mycelium looks like, how the spores are formed, and the kind of fruiting body. Learn each class as a short card: its mycelium, its asexual spores, its sexual spores and its NCERT examples. Most questions just match a genus to its class or its common name.",
      definition:
        "The four classes:\n" +
        "- **Phycomycetes**: aseptate, coenocytic mycelium; spores formed inside a sporangium.\n" +
        "- **Ascomycetes** (sac fungi): septate mycelium; **conidia** outside, **ascospores** inside sac-like **asci**.\n" +
        "- **Basidiomycetes**: septate mycelium; no sex organs; **four basidiospores** on a **basidium**.\n" +
        "- **Deuteromycetes** (imperfect fungi): only asexual or vegetative stages known.\n" +
        "- The basis of the classes is the **morphology of the mycelium, the mode of spore formation and the fruiting body**.",
      table: {
        columns: ["Feature", "Phycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes"],
        rows: [
          {
            cells: ["Mycelium", "Aseptate and coenocytic", "Branched and septate", "Branched and septate", "Septate and branched"],
            noteAmber: "NEET 2024: the classes rest on the mycelium, the mode of spore formation and the fruiting body, not on the mode of nutrition.",
            pyqExampleId: "beb3ea6a-955d-478e-85b3-de40626fbe31",
          },
          { cells: ["Habitat or habit", "Water, decaying wood in moist places, or obligate parasites of plants", "Saprophytes, decomposers, parasites or coprophilous (growing on dung)", "Soil, logs and tree stumps; rusts and smuts are parasites of living plants", "Saprophytes or parasites; many decompose litter and help in mineral cycling"] },
          { cells: ["Asexual spores", "Zoospores (motile) or aplanospores (non-motile), formed inside a sporangium", "Conidia, formed outside on conidiophores", "Generally not found; fragmentation is common", "Conidia only"] },
          { cells: ["Sexual reproduction", "Zygospore from two gametes that may be isogamous, anisogamous or oogamous", "Ascospores, formed inside asci, which sit in fruiting bodies called ascocarps", "No sex organs; two somatic cells of different strains fuse; karyogamy and meiosis in the basidium give four basidiospores, formed outside it, in basidiocarps", "Not known; once a sexual stage is found, the fungus moves to its rightful class"] },
          { cells: ["Examples", "*Mucor*, *Rhizopus* (bread mould), *Albugo* (parasite on mustard)", "*Penicillium*, yeast (*Saccharomyces*, unicellular), *Aspergillus*, *Claviceps*, *Neurospora*", "*Agaricus* (mushroom), *Ustilago* (smut), *Puccinia* (rust fungus)", "*Alternaria*, *Colletotrichum*, *Trichoderma*"] },
          { cells: ["Worth knowing", "*Rhizopus* is the common bread mould", "*Neurospora* is used in biochemical and genetic work; morels and truffles are edible delicacies", "Mushrooms, bracket fungi and puffballs belong here", "Called imperfect because no sexual stage is known"] },
        ],
      },
      pyqExampleId: "93291d6a-d406-4419-b38c-fe191bc0209f",
      selfCheckExample: {
        prompt: "A fungus has an aseptate, coenocytic mycelium and forms non-motile spores inside a sporangium. Name its class, the name of those spores, and one NCERT example.",
        steps: [
          "An aseptate, coenocytic mycelium with spores made inside a sporangium marks Phycomycetes.",
          "Non-motile spores of this class are aplanospores (motile ones are zoospores).",
          "NCERT's examples are *Mucor*, *Rhizopus* and *Albugo*.",
        ],
        answer: "Phycomycetes; aplanospores; for example *Mucor*.",
      },
      practiceSet: [
        { prompt: "Which class of fungi is called the imperfect fungi?", answer: "Deuteromycetes" },
        { prompt: "Which fungus is used extensively in biochemical and genetic work?", answer: "*Neurospora*" },
        { prompt: "How many basidiospores does one basidium produce?", answer: "Four" },
        { prompt: "In what sac-like structures are ascospores formed?", answer: "Asci" },
        { prompt: "Name the parasitic phycomycete that grows on mustard.", answer: "*Albugo*" },
        { prompt: "To which class do *Alternaria* and *Trichoderma* belong?", answer: "Deuteromycetes" },
      ],
      traps: [
        {
          title: "Conidia outside, ascospores inside",
          body: "In ascomycetes the asexual **conidia** form **exogenously** on conidiophores, while the sexual **ascospores** form **endogenously** inside asci.",
        },
        {
          title: "Basidiomycetes have no sex organs",
          body: "Basidiomycetes have **no sex organs**. Plasmogamy happens when two **somatic cells** of different strains fuse. Asexual spores are generally absent too.",
        },
        {
          title: "Rhizopus is a phycomycete",
          body: "*Rhizopus* (bread mould) and *Mucor* are **Phycomycetes**. *Penicillium* and *Aspergillus* are **Ascomycetes**, and *Agaricus*, *Ustilago* and *Puccinia* are **Basidiomycetes**.",
        },
        {
          title: "Yeast is an ascomycete",
          body: "Most ascomycetes are multicellular, but **yeast** (*Saccharomyces*) is a **unicellular** ascomycete.",
        },
      ],
    },
  ],
};
