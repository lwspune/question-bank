import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PK_GYMNOSPERMS_NOTE: SubtopicNote = {
  subtopicName: "Gymnosperms and Life Cycles",
  title: "Gymnosperms and Life Cycles",
  oneLineDefinition:
    "Gymnosperms with their naked seeds, roots, leaves, cones and reduced gametophytes; the haplontic, diplontic and haplo-diplontic life cycles; and how to place a named plant in its group.",
  whyItMatters:
    "Eight NEET questions from 2022 to 2026. Five are on gymnosperms, three of them on naked ovules and seeds (NEET 2025, Re-NEET 2026, NEET 2026). Two ask you to sort named genera into plant groups (Re-NEET 2024 and NEET 2025), and NEET 2022 matched four plants with their life cycles.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopk-gymno-features",
      name: "The gymnosperm plant",
      intuition:
        "Gymnosperm means naked seed. The ovules sit open on the plant, with no ovary wall around them, before and after fertilisation, so the seeds are not covered by a fruit. The plants are trees and shrubs with tap roots and tough leaves. NEET also asks the odd root partners: fungi in *Pinus* and nitrogen-fixing cyanobacteria in the coralloid roots of *Cycas*.",
      definition:
        "Gymnosperms, as NCERT describes them:\n" +
        "- **Gymnos** = naked, **sperma** = seeds. The **ovules are not enclosed by any ovary wall** and stay **exposed, both before and after fertilisation**. The seeds are **not covered**.\n" +
        "- **Medium-sized or tall trees and shrubs**. The giant redwood *Sequoia* is one of the **tallest tree species**.\n" +
        "- Roots are generally **tap roots**. *Pinus* roots have fungi as **mycorrhiza**; *Cycas* has small specialised **coralloid roots** with **nitrogen-fixing cyanobacteria**.\n" +
        "- Stems are **unbranched** (*Cycas*) or **branched** (*Pinus*, *Cedrus*).\n" +
        "- Leaves are simple or compound. The **pinnate leaves** of *Cycas* last for a few years. Leaves withstand **extremes of temperature, humidity and wind**. In conifers, **needle-like leaves** cut the surface area, and a **thick cuticle** and **sunken stomata** cut water loss.\n" +
        "- In their xylem gymnosperms **lack vessels**; in their phloem they have **sieve cells and albuminous cells**, not sieve tubes and companion cells (NCERT, Anatomy of Flowering Plants).",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          {
            cells: ["Ovules and seeds", "Ovules exposed before and after fertilisation; seeds not covered"],
            noteAmber: "NEET 2026: of *Funaria*, *Pinus*, *Selaginella* and *Wolffia*, the ovules are exposed in *Pinus*.",
            pyqExampleId: "ee3c3648-b085-4183-bbfd-44f6980fe216",
          },
          { cells: ["Habit", "Medium-sized or tall trees and shrubs; *Sequoia* is one of the tallest"] },
          { cells: ["Roots", "Generally tap roots"] },
          { cells: ["Mycorrhiza", "Fungal association in the roots of *Pinus*"] },
          { cells: ["Coralloid roots", "*Cycas*, with nitrogen-fixing cyanobacteria"] },
          { cells: ["Stem", "Unbranched in *Cycas*; branched in *Pinus* and *Cedrus*"] },
          { cells: ["Conifer leaves", "Needle-like, thick cuticle, sunken stomata"] },
          {
            cells: ["Xylem and phloem", "No vessels; sieve cells and albuminous cells"],
            noteAmber: "Re-NEET 2024: of sieve cells, albuminous cells, tracheids and vessels, vessels are the one not found in gymnosperms.",
            pyqExampleId: "6295fbdd-2fe1-4ba3-ba58-8770de6b1f7d",
          },
        ],
      },
      pyqExampleId: "959ee31e-bc73-442f-8a42-9424228c1f38",
      selfCheckExample: {
        prompt: "How are the needle-like leaves of a conifer suited to a dry, cold, windy place?",
        steps: [
          "Needle-like leaves have a small surface area.",
          "A thick cuticle and sunken stomata reduce water loss.",
        ],
        answer: "Their small surface area, thick cuticle and sunken stomata all cut water loss.",
      },
      practiceSet: [
        { prompt: "Which gymnosperm, the giant redwood, is one of the tallest tree species?", answer: "*Sequoia*" },
        { prompt: "In which gymnosperm do the roots have a fungal association called mycorrhiza?", answer: "*Pinus*" },
        { prompt: "What lives in the coralloid roots of *Cycas*?", answer: "Nitrogen-fixing cyanobacteria" },
        { prompt: "Name a gymnosperm with an unbranched stem.", answer: "*Cycas*" },
        { prompt: "What kind of root system do gymnosperms generally have?", answer: "Tap roots" },
      ],
      traps: [
        {
          title: "Coralloid roots hold cyanobacteria, not fungi",
          body: "The **coralloid roots** of *Cycas* carry **nitrogen-fixing cyanobacteria**. The fungal partner (**mycorrhiza**) is in the roots of *Pinus*.",
        },
        {
          title: "Gymnosperm xylem has no vessels",
          body: "Gymnosperms have **tracheids** but **no vessels** in their xylem, and **sieve cells with albuminous cells** in their phloem. Vessels are a mark of flowering plants.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-gymno-reproduction",
      name: "Cones, gametophytes and pollination",
      intuition:
        "A gymnosperm makes two kinds of spores in two kinds of cones. The small spores become pollen grains, which are tiny male gametophytes. The large spore stays inside the ovule and becomes the female gametophyte with its archegonia. Neither gametophyte ever lives free. Wind carries pollen to the ovule, and a pollen tube takes the male gametes to the archegonia.",
      definition:
        "From NCERT:\n" +
        "- Gymnosperms are **heterosporous**: they make haploid **microspores** and **megaspores** in sporangia on **sporophylls**, arranged spirally to form **strobili** or cones.\n" +
        "- **Male strobili** bear microsporophylls and microsporangia. A microspore becomes a **highly reduced male gametophyte** of a limited number of cells: the **pollen grain**, which develops inside the microsporangium.\n" +
        "- **Female strobili** bear megasporophylls with **ovules** (megasporangia). The **megaspore mother cell** comes from a cell of the **nucellus**; the nucellus with its protective envelopes is the **ovule**.\n" +
        "- The megaspore mother cell divides by **meiosis** into **four megaspores**. One grows into a **multicellular female gametophyte** with **two or more archegonia**, retained inside the megasporangium.\n" +
        "- Male and female cones are on the **same tree** in *Pinus*; in *Cycas*, male cones and megasporophylls are on **different trees**.\n" +
        "- Unlike bryophytes and pteridophytes, gymnosperm gametophytes **do not have an independent free-living existence**: they **remain within the sporangia** on the sporophyte.\n" +
        "- Pollen grains are released and **carried by air currents** to the opening of the ovules. A **pollen tube** carrying the male gametes grows towards the archegonia and discharges near their mouth.\n" +
        "- After fertilisation the zygote becomes the **embryo** and the ovule the **seed**, which is not covered.",
      table: {
        columns: ["Point", "Male side", "Female side"],
        rows: [
          { cells: ["Spore", "Microspore", "Megaspore"] },
          { cells: ["Cone", "Male (microsporangiate) strobilus", "Female (macrosporangiate) strobilus"] },
          { cells: ["Sporangium", "Microsporangium", "Megasporangium (the ovule)"] },
          { cells: ["Gametophyte", "Pollen grain, highly reduced, a few cells", "Multicellular, with two or more archegonia"] },
          {
            cells: ["Where the gametophyte stays", "Develops within the microsporangium", "Retained within the megasporangium"],
            noteAmber: "Re-NEET 2026: the statement that gymnosperm gametophytes remain within the sporangia was correct.",
            pyqExampleId: "995a0086-ec25-4ccd-adb2-5a819a23761e",
          },
          { cells: ["Same or different trees", "*Pinus*: male and female cones on the same tree", "*Cycas*: male cones and megasporophylls on different trees"] },
        ],
      },
      pyqExampleId: "9668ce08-ebc2-4806-8e87-be026ca12482",
      selfCheckExample: {
        prompt: "In a gymnosperm ovule, how many megaspores does the megaspore mother cell make, and what does one of them become?",
        steps: [
          "The megaspore mother cell divides by meiosis into four megaspores.",
          "One megaspore grows into the multicellular female gametophyte, which bears two or more archegonia.",
        ],
        answer: "Four; one becomes the multicellular female gametophyte with two or more archegonia.",
      },
      practiceSet: [
        { prompt: "What is the highly reduced male gametophyte of a gymnosperm called?", answer: "The pollen grain" },
        { prompt: "From which tissue does the megaspore mother cell of a gymnosperm come?", answer: "The nucellus" },
        { prompt: "In which gymnosperm are male and female cones borne on the same tree?", answer: "*Pinus*" },
        { prompt: "Are gymnosperms homosporous or heterosporous?", answer: "Heterosporous" },
        { prompt: "What does the ovule of a gymnosperm become after fertilisation?", answer: "The seed" },
      ],
      traps: [
        {
          title: "Gymnosperms do form a pollen tube",
          body: "Air currents carry the pollen only to the **opening of the ovule**. A **pollen tube** then grows towards the archegonia and releases the male gametes near their mouth.",
        },
        {
          title: "Pinus is monoecious, Cycas is dioecious",
          body: "*Pinus* bears male and female cones on the **same tree**. In *Cycas* male cones and megasporophylls are on **different trees**.",
        },
        {
          title: "Gymnosperm gametophytes are never free-living",
          body: "Bryophytes and pteridophytes have free-living gametophytes. In gymnosperms both gametophytes **stay within the sporangia** on the sporophyte.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-life-cycles",
      name: "Three patterns of life cycle",
      visualizationSlug: "neet-life-cycle-patterns",
      intuition:
        "Every plant alternates between a haploid gametophyte and a diploid sporophyte. What changes from group to group is which phase is big and free-living. If only the gametophyte is a real plant and the sporophyte is just the zygote, the cycle is haplontic. If only the sporophyte is a real plant, it is diplontic. If both are multicellular, it is haplo-diplontic.",
      definition:
        "The three patterns, as NCERT gives them:\n" +
        "- **Haplontic**: the sporophyte is only the **one-celled zygote**. Meiosis in the zygote gives haploid spores. The dominant, free-living phase is the **gametophyte**. Many algae: *Volvox*, *Spirogyra* and some species of *Chlamydomonas*.\n" +
        "- **Diplontic**: the **diploid sporophyte** is dominant, independent and photosynthetic; the gametophyte is single-celled or of a few cells. **All seed-bearing plants**, gymnosperms and angiosperms. Among algae, *Fucus* is diplontic.\n" +
        "- **Haplo-diplontic**: **both phases are multicellular**. Bryophytes and pteridophytes, and some algae such as *Ectocarpus*, *Polysiphonia* and kelps.\n" +
        "- In **bryophytes**, the **haploid gametophyte** is dominant and the short-lived sporophyte is wholly or partly dependent on it.\n" +
        "- In **pteridophytes**, the **diploid sporophyte** is dominant and the gametophyte is independent but short-lived.",
      table: {
        columns: ["Pattern", "Dominant phase", "Examples"],
        rows: [
          { cells: ["Haplontic", "Haploid gametophyte; sporophyte is only the zygote", "*Volvox*, *Spirogyra*, some *Chlamydomonas*"] },
          { cells: ["Diplontic", "Diploid sporophyte; gametophyte of one or a few cells", "Gymnosperms, angiosperms, *Fucus*"] },
          { cells: ["Haplo-diplontic, bryophyte type", "Haploid gametophyte; dependent multicellular sporophyte", "Mosses and liverworts"] },
          { cells: ["Haplo-diplontic, pteridophyte type", "Diploid sporophyte; independent short-lived gametophyte", "Ferns and other pteridophytes"] },
          { cells: ["Haplo-diplontic algae", "Both phases multicellular", "*Ectocarpus*, *Polysiphonia*, kelps"] },
        ],
      },
      pyqExampleId: "88cae775-3256-4c2d-825a-d81b5bd893b2",
      selfCheckExample: {
        prompt: "*Fucus* is an alga, yet its life cycle is classed with that of seed plants. Which pattern is it, and what is its dominant phase?",
        steps: [
          "NCERT names *Fucus* as the diplontic alga.",
          "In a diplontic cycle the diploid sporophyte is the dominant phase.",
        ],
        answer: "Diplontic; the diploid sporophyte dominates.",
      },
      practiceSet: [
        { prompt: "In a haplontic life cycle, what is the only diploid stage?", answer: "The one-celled zygote" },
        { prompt: "Which life-cycle pattern do all seed-bearing plants show?", answer: "Diplontic" },
        { prompt: "Name two algae with a haplo-diplontic life cycle.", answer: "Any two of *Ectocarpus*, *Polysiphonia* and kelps" },
        { prompt: "In which life-cycle pattern are both the gametophyte and the sporophyte multicellular?", answer: "Haplo-diplontic" },
      ],
      traps: [
        {
          title: "Not all algae are haplontic",
          body: "Most algae are **haplontic**, but *Ectocarpus*, *Polysiphonia* and kelps are **haplo-diplontic**, and *Fucus* is **diplontic**.",
        },
        {
          title: "Bryophytes and pteridophytes share a pattern but not a dominant phase",
          body: "Both are **haplo-diplontic**. In bryophytes the **gametophyte** dominates; in pteridophytes the **sporophyte** dominates.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-group-examples",
      name: "Placing a plant in its group",
      intuition:
        "Many NEET questions just name genera and ask which group they belong to. One wrong genus hidden in a list is enough to make an option false. So keep a clean list of NCERT's examples for each group, and watch for look-alike names such as *Salvinia* (a fern) and *Salvia* (a flowering plant).",
      definition:
        "NCERT examples, group by group:\n" +
        "- **Algae**: green *Chlamydomonas*, *Volvox*, *Ulothrix*, *Spirogyra*, *Chara*; brown *Ectocarpus*, *Dictyota*, *Laminaria*, *Sargassum*, *Fucus*; red *Polysiphonia*, *Porphyra*, *Gracilaria*, *Gelidium*.\n" +
        "- **Bryophytes**: liverwort *Marchantia*; mosses *Funaria*, *Polytrichum*, *Sphagnum*.\n" +
        "- **Pteridophytes**: *Psilotum*, *Selaginella*, *Lycopodium*, *Equisetum*, *Dryopteris*, *Pteris*, *Adiantum*, *Salvinia*.\n" +
        "- **Gymnosperms**: *Cycas*, *Pinus*, *Cedrus*, *Ginkgo*, *Sequoia*.\n" +
        "- **Angiosperms** (flowering plants, seeds inside fruits): *Wolffia* and *Eucalyptus*, for example.",
      table: {
        columns: ["Group", "Genera to know"],
        rows: [
          { cells: ["Algae", "*Volvox*, *Spirogyra*, *Chara*, *Fucus*, *Polysiphonia*, *Gelidium*"] },
          { cells: ["Bryophytes", "*Marchantia*, *Funaria*, *Polytrichum*, *Sphagnum*"] },
          { cells: ["Pteridophytes", "*Psilotum*, *Selaginella*, *Equisetum*, *Dryopteris*, *Adiantum*, *Salvinia*"] },
          {
            cells: ["Gymnosperms", "*Cycas*, *Pinus*, *Cedrus*, *Ginkgo*, *Sequoia*"],
            noteAmber: "Re-NEET 2024: *Cedrus*, *Pinus* and *Sequoia* were the all-gymnosperm option; *Polysiphonia* (an alga) and *Ginkgo* (a gymnosperm) spoiled two others.",
            pyqExampleId: "9471295b-ee59-476d-83bd-6e20d3e06f5a",
          },
          { cells: ["Angiosperms", "*Wolffia*, *Eucalyptus*"] },
        ],
      },
      pyqExampleId: "c3a0a4e0-c8ae-4927-b60f-d663a7626242",
      selfCheckExample: {
        prompt: "Which one of *Sphagnum*, *Gelidium*, *Equisetum* and *Cedrus* has no vascular tissue but is not an alga?",
        steps: [
          "*Gelidium* is a red alga, *Equisetum* a pteridophyte and *Cedrus* a gymnosperm; the last two have vascular tissue.",
          "*Sphagnum* is a moss, a bryophyte, with no vascular tissue.",
        ],
        answer: "*Sphagnum*, a moss.",
      },
      practiceSet: [
        { prompt: "To which plant group does *Marchantia* belong?", answer: "Bryophytes (a liverwort)" },
        { prompt: "To which plant group does *Polysiphonia* belong?", answer: "Algae (red algae)" },
        { prompt: "Is *Cedrus* a pteridophyte or a gymnosperm?", answer: "A gymnosperm" },
        { prompt: "To which plant group does *Wolffia* belong?", answer: "Angiosperms" },
        { prompt: "Is *Dryopteris* a bryophyte or a pteridophyte?", answer: "A pteridophyte" },
      ],
      traps: [
        {
          title: "Polysiphonia is an alga, not a moss",
          body: "*Polysiphonia* is a **red alga**. The bryophytes in such lists are *Polytrichum*, *Sphagnum* and *Funaria*.",
        },
        {
          title: "Ginkgo and Sequoia are gymnosperms",
          body: "*Ginkgo* is a **gymnosperm**, not a pteridophyte, and *Sequoia* is a **gymnosperm**, not an angiosperm.",
        },
        {
          title: "Salvinia and Salvia are different plants",
          body: "*Salvinia* is a heterosporous **pteridophyte**; *Salvia* is a flowering plant, an **angiosperm**.",
        },
      ],
    },
  ],
};
