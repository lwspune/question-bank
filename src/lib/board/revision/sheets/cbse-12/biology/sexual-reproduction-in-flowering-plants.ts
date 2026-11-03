import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 1 Sexual Reproduction in Flowering Plants.
 * Definitions checked against the NCERT text (the book's own wording,
 * trimmed); most-asked years and marks from the CBSE board past-paper
 * questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Sexual Reproduction in Flowering Plants",
  chapterSlug: "sexual-reproduction-in-flowering-plants",
  source: "NCERT Biology (CBSE Class 12), Chapter 1",
  keyPoints: [
    {
      term: "Wall of the microsporangium",
      text: "Four wall layers: **epidermis, endothecium, middle layers and tapetum**. The outer three protect and help in dehiscence of the anther. The innermost, the **tapetum**, nourishes the developing pollen grains; its cells have dense cytoplasm and often more than one nucleus. The centre of a young microsporangium is **sporogenous tissue**.",
    },
    {
      term: "Pollen grain",
      text: "About 25-50 micrometers. **Exine** of **sporopollenin**, the most resistant organic material known (no enzyme degrades it), so pollen is preserved as fossils; **germ pores** are where sporopollenin is absent. **Intine**: thin, of cellulose and pectin. Mature pollen has a bigger **vegetative cell** and a small, spindle-shaped **generative cell**.",
    },
    {
      term: "Pollen viability and pollen banks",
      text: "Viability depends on temperature and humidity: **rice and wheat** pollen lose it within **30 minutes**; some members of **Rosaceae, Leguminoseae and Solanaceae** keep it for months. Pollen can be stored for years in **liquid nitrogen (-196 °C)**, as pollen banks for crop breeding.",
    },
    {
      term: "Megasporogenesis",
      text: "Formation of megaspores from the **megaspore mother cell** (MMC, in the micropylar region of the nucellus) by meiosis: four megaspores. One is functional, three degenerate. Embryo sac formation from a single megaspore is **monosporic development**.",
    },
    {
      term: "Mature embryo sac",
      text: "**8-nucleate but 7-celled**. Micropylar end: the **egg apparatus** (two **synergids** and one **egg cell**); the synergids carry the **filiform apparatus**, which guides the pollen tube. Chalazal end: three **antipodals**. The large **central cell** holds two **polar nuclei**.",
    },
    {
      term: "Kinds of pollination",
      text: "**Autogamy**: same flower. **Geitonogamy**: another flower of the same plant; functionally cross-pollination, genetically like autogamy. **Xenogamy**: a different plant; the only type that brings genetically different pollen. **Cleistogamous** flowers (Viola, Oxalis, Commelina) never open: invariably autogamous, with assured seed-set even without pollinators.",
    },
    {
      term: "Outbreeding devices",
      text: "Continued self-pollination results in **inbreeding depression**. Devices: pollen release and stigma receptivity **not synchronised**; anther and stigma at **different positions**; **self-incompatibility** (a genetic mechanism stopping self-pollen germination or tube growth); **unisexual flowers**. Monoecious castor and maize prevent autogamy, not geitonogamy; dioecious papaya prevents both.",
    },
    {
      term: "Agents of pollination",
      text: "**Wind**: light, non-sticky pollen, well-exposed stamens, large feathery stigma, one ovule per ovary, many flowers in an inflorescence. **Water** (about 30 genera, mostly monocots): Vallisneria, Hydrilla, Zostera; pollen protected from wetting by a **mucilaginous covering**. **Insects**: large, colourful, fragrant flowers rich in nectar.",
    },
    {
      term: "Pollen-pistil interaction",
      text: "All events from pollen deposition on the stigma until pollen tubes enter the ovule. The pistil accepts pollen of the **right type** (compatible) and rejects the **wrong type** by stopping germination on the stigma or tube growth in the style. A **dynamic process**: a dialogue mediated by chemical components of pollen and pistil.",
    },
    {
      term: "Double fertilisation",
      text: "One male gamete fuses with the egg (**syngamy**): diploid **zygote**. The other fuses with the two polar nuclei (**triple fusion**): triploid **primary endosperm nucleus (PEN)**. Two fusions in one embryo sac: **double fertilisation**, unique to flowering plants. The PEC forms the endosperm; the zygote forms the embryo.",
    },
    {
      term: "Endosperm",
      text: "Develops **before** the embryo, to assure nutrition to the developing embryo. Most common type: **free-nuclear** first, then cellular. **Coconut water** is free-nuclear endosperm; the white kernel is cellular endosperm. Consumed before maturity in pea, groundnut, beans; persists in castor and coconut.",
    },
    {
      term: "Seeds and fruits",
      text: "**Non-albuminous** (ex-albuminous): no residual endosperm (pea, groundnut). **Albuminous**: part of the endosperm retained (wheat, maize, barley, castor). **Perisperm**: residual, persistent nucellus (black pepper, beet). Integuments harden into seed coats; the micropyle stays as a pore for oxygen and water. The ovary wall becomes the **pericarp**.",
    },
    {
      term: "Seed dormancy and viability",
      text: "Maturing seeds dry to **10-15 per cent moisture**, metabolism slows and the embryo may enter **dormancy**; this lets seeds be stored for food and for the next crop. Oldest viable seed: a lupine, **Lupinus arcticus**, from the Arctic Tundra (about 10,000 years). Date palm, **Phoenix dactylifera**, about 2000 years, from King Herod's palace.",
    },
    {
      term: "Apomixis and polyembryony",
      text: "**Apomixis**: seeds without fertilisation (some Asteraceae and grasses), a form of asexual reproduction that mimics sexual reproduction. A diploid egg forms without meiosis, or nucellar cells grow into embryos (Citrus, mango). More than one embryo in a seed is **polyembryony**. A hybrid made apomictic does not segregate, so farmers need not buy seed every year.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Development of the male gametophyte (microsporogenesis to pollen grain)",
      steps: [
        "Each cell of the sporogenous tissue is a **pollen mother cell** (PMC), diploid.",
        "**Microsporogenesis**: each PMC divides by meiosis into a **microspore tetrad** (haploid).",
        "As the anther matures and dehydrates, the microspores separate and develop into **pollen grains**.",
        "The microspore gives a large **vegetative cell** and a small **generative cell**: over 60 per cent of angiosperms shed pollen at this 2-celled stage.",
        "In the rest, the generative cell divides mitotically into **two male gametes** before shedding (3-celled stage).",
      ],
    },
    {
      title: "Megasporogenesis and formation of the embryo sac (monosporic development)",
      steps: [
        "One **megaspore mother cell** differentiates in the micropylar region of the nucellus.",
        "It divides by **meiosis** into four megaspores; three degenerate and one is **functional**.",
        "The functional megaspore nucleus divides **mitotically** three times: 2, 4 and then 8-nucleate stages. These divisions are **free nuclear** (no wall formation).",
        "Cell walls then form: egg apparatus at the micropylar end, three antipodals at the chalazal end, two polar nuclei in the central cell: **7 cells, 8 nuclei**.",
      ],
    },
    {
      title: "Post-pollination events up to double fertilisation",
      steps: [
        "Compatible pollen germinates on the stigma; a **pollen tube** comes out through a germ pore.",
        "The tube grows through the stigma and style to the ovary. In 2-celled pollen the generative cell divides into **two male gametes** on the way.",
        "The tube enters the ovule through the **micropyle**, then a **synergid** through the **filiform apparatus**, and releases both male gametes.",
        "One male gamete + egg: **syngamy**, zygote (2n). The other + two polar nuclei: **triple fusion**, PEN (3n).",
        "The primary endosperm cell forms the **endosperm**; the zygote forms the **embryo**.",
      ],
    },
    {
      title: "Artificial hybridisation: emasculation and bagging",
      steps: [
        "Aim: only the desired pollen must pollinate, and the stigma must be protected from unwanted pollen.",
        "**Emasculation**: if the female parent has bisexual flowers, remove the anthers from the flower bud with forceps before they dehisce.",
        "**Bagging**: cover the emasculated flower with a bag, generally of butter paper.",
        "When the stigma is receptive, dust it with pollen from the male parent, **rebag** it, and let the fruit develop.",
        "Unisexual female flowers need **no emasculation**: bag the buds before the flowers open.",
      ],
    },
    {
      title: "Why endosperm develops before the embryo; stages of a dicot embryo",
      steps: [
        "Most zygotes divide only after some endosperm has formed: an adaptation for **assured nutrition** to the embryo.",
        "The embryo develops at the **micropylar end** of the embryo sac, where the zygote lies.",
        "Zygote, **proembryo**, **globular**, **heart-shaped**, then **mature embryo**.",
        "Mature dicot embryo: an embryonal axis and two cotyledons; the **epicotyl** ends in the plumule, the **hypocotyl** in the radicle with its root cap.",
      ],
    },
  ],
  diagrams: [
    {
      title: "T.S. of a young anther and one microsporangium (Figure 1.3)",
      labels: ["epidermis", "endothecium", "middle layers", "tapetum", "sporogenous tissue or microspore tetrads", "connective"],
    },
    {
      title: "Two-celled pollen grain (male gametophyte, Figure 1.5b)",
      labels: ["exine", "germ pore", "intine", "plasma membrane", "vegetative cell and its nucleus", "generative cell"],
    },
    {
      title: "Anatropous ovule (megasporangium, Figure 1.7d)",
      labels: ["funicle", "hilum", "outer and inner integuments", "micropyle", "nucellus", "embryo sac", "chalaza"],
    },
    {
      title: "Mature embryo sac (Figure 1.8c)",
      labels: ["filiform apparatus", "synergids", "egg cell", "central cell with two polar nuclei", "antipodals", "micropylar and chalazal ends"],
    },
    {
      title: "Stages of embryo development in a dicot (Figure 1.13b, 1.14a)",
      labels: ["zygote", "proembryo", "globular embryo", "heart-shaped embryo", "plumule and cotyledons", "hypocotyl, radicle and root cap"],
    },
    {
      title: "L.S. of an embryo of grass, as in a maize grain (Figure 1.14b)",
      labels: ["scutellum", "coleoptile", "shoot apex and leaf primordia", "epicotyl", "radicle and root cap", "coleorrhiza", "endosperm"],
    },
  ],
  mostAsked: [
    {
      topic: "Seed, endosperm and embryo: albuminous and non-albuminous seeds, perisperm, dicot and monocot embryos, maize grain, true and false fruits",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Kinds of pollination, chasmogamous and cleistogamous flowers, and outbreeding devices",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Male gametophyte: anther wall layers, microsporogenesis, the two cells of a pollen grain, pollen viability, counting pollen grains",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Megasporogenesis and the embryo sac: monosporic development, labelled ovule and mature embryo sac",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Apomixis and polyembryony: ways apomictic seeds form, why farmers prefer them, ploidy of apomictic embryos",
      years: [2026, 2025, 2024],
    },
    {
      topic: "Pollen-pistil interaction and double fertilisation, with the ploidy of the cells formed",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Agents of pollination: features of wind, water and insect pollinated flowers",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Artificial hybridisation: why breeders use it, emasculation and bagging",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Getting the ploidy wrong",
      body: "Nucellus, MMC and integuments: 2n. Megaspore, egg, synergids, antipodals, male gametes: n. Zygote 2n, PEN and endosperm **3n**, perisperm 2n. If the endosperm has 24 chromosomes, a gamete has 8. An apomictic embryo from a nucellus or integument cell is 2n; from a synergid or antipodal, n.",
    },
    {
      title: "Calling geitonogamy cross-pollination genetically",
      body: "Geitonogamy needs a pollinating agent, but the pollen comes from the **same plant**, so genetically it is autogamy. Monoecious castor and maize prevent only autogamy; dioecious papaya prevents both. Only xenogamy brings genetically different pollen.",
    },
    {
      title: "Counting pollen grains",
      body: "One PMC gives a tetrad: 4 pollen grains. A bilobed, dithecous anther has **4 microsporangia**, so 200 PMCs per microsporangium give \\(200 \\times 4 \\times 4 = 3200\\) pollen grains. One MMC gives one functional megaspore, so one embryo sac.",
    },
    {
      title: "Mixing up perisperm, endosperm and pericarp",
      body: "**Perisperm**: leftover nucellus (black pepper, beet). **Endosperm**: from the primary endosperm cell, 3n. **Pericarp**: the fruit wall, from the ovary wall. Apomixis gives **seeds** without fertilisation; parthenocarpy gives **seedless fruits** (banana). Apple, strawberry and cashew are **false fruits**: the thalamus contributes.",
    },
    {
      title: "Embryo stages in the wrong order",
      body: "Zygote, proembryo, globular, heart-shaped, mature embryo. The proembryo comes **before** the heart-shaped stage, never after it.",
    },
    {
      title: "Putting the filiform apparatus on the egg",
      body: "The filiform apparatus is on the **synergids**, at their micropylar tip, and guides the pollen tube. The tube enters a synergid, not the egg, and releases both male gametes there.",
    },
  ],
};

export default sheet;
