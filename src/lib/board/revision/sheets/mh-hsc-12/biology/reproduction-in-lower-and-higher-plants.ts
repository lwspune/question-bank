import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 1 Reproduction in Lower and Higher Plants.
 * Definitions checked against the Balbharati text (the book's own wording,
 * trimmed); most-asked years from the 16 board past-paper questions in the
 * bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Reproduction in Lower and Higher Plants",
  chapterSlug: "reproduction-in-lower-and-higher-plants",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Cutting",
      text: "A small piece of any vegetative part of a plant having one or more buds is used for propagation. Stem cutting: Rose, Bougainvillea; leaf cutting: Sansevieria; root cutting: Blackberry.",
    },
    {
      term: "Grafting",
      text: "Parts of two plants are joined so that they grow as one plant. Part of a stem with more than one bud (**scion**) is joined onto a rooted plant (**stock**), e.g. Rose. In budding (bud grafting) only one bud is joined on the stock.",
    },
    {
      term: "Tapetum",
      text: "The innermost **nutritive** layer of the anther wall. It immediately encloses the sporogenous tissue (microspore mother cells) and nourishes it. The anther wall has four layers: epidermis, endothecium, middle layers and tapetum.",
    },
    {
      term: "Pollen wall (sporoderm)",
      text: "**Exine**: thick, of **sporopollenin**, complex and non-biodegradable, resistant to chemicals (so pollen is preserved as fossils). Thin areas of exine are **germ pores**, for the pollen tube. **Intine**: cellulose and pectin.",
    },
    {
      term: "Autogamy, geitonogamy and xenogamy",
      text: "**Autogamy**: a bisexual flower pollinated by its own pollen. **Geitonogamy**: pollen to the stigma of a different flower on the same plant; it needs a pollinating agent but gives no genetic variation, e.g. Cucurbita maxima. **Xenogamy**: pollen to a flower of a different plant of the same species.",
    },
    {
      term: "Siphonogamy",
      text: "Non-motile male gametes are carried to the egg through a hollow pollen tube. The tube usually enters the ovule through the micropyle (**porogamy**), sometimes through the chalaza (**chalazogamy**) or the integuments (**mesogamy**).",
    },
    {
      term: "Double fertilization",
      text: "Both male gametes take part. **Syngamy**: male gamete (n) + egg (n) gives the diploid zygote. **Triple fusion**: second male gamete (n) + secondary nucleus (2n) gives the triploid primary endosperm nucleus (PEN). Discovered by Nawaschin in Lilium and Fritillaria.",
    },
    {
      term: "Endosperm",
      text: "The nutritive tissue formed when the triploid primary endosperm nucleus divides repeatedly by mitosis. Embryo and endosperm develop together; the other cells of the embryo sac disorganise.",
    },
    {
      term: "Monocot embryo",
      text: "One shield-shaped cotyledon, the **scutellum**, in a terminal position; the plumule is lateral. The protective sheath of the plumule is the **coleoptile** and that of the radicle is the **coleorhiza**.",
    },
    {
      term: "Seed and its parts",
      text: "Integuments become the seed coat (outer testa, inner tegmen). A persistent nucellus is the **perisperm** (black pepper, beet). **Endospermic** (albuminous) seeds keep endosperm: castor, coconut, maize. **Non-endospermic** (exalbuminous): pea, bean.",
    },
    {
      term: "Apomixis",
      text: "Formation of embryo(s) through an asexual method, without formation of gametes and fertilization: unusual sexual reproduction with no meiosis and syngamy. Types: recurrent, non-recurrent and adventive embryony.",
    },
    {
      term: "Parthenocarpy",
      text: "Development of fruit without fertilization (term by Noll, 1902). The fruit is **seedless**. Natural in some pineapple, banana and papaya, where auxin IAA from the placenta enlarges the ovary; induced by spraying gibberellins.",
    },
    {
      term: "Polyembryony",
      text: "More than one embryo in a seed, giving many seedlings (first seen by Leeuwenhoek, 1719, in Citrus). **Adventive**: embryos from diploid cells of nucellus or integuments (Citrus). **Cleavage**: the proembryo divides into units. It raises the chances of survival.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Describe the development of male gametophyte from microspore",
      steps: [
        "The haploid pollen grain (microspore) is the first cell of the male gametophyte.",
        "First mitotic division: a bigger, naked **vegetative cell** (rich in food, irregular nucleus) and a small, thin-walled **generative cell** floating in its cytoplasm.",
        "Pollen is shed at this two-celled stage in most angiosperms.",
        "On a compatible stigma it absorbs water and nutrients and germinates; the pollen tube grows out through a germ pore, carrying the tube nucleus.",
        "Second mitotic division, of the generative cell only (in the pollen grain or the tube), gives **two non-motile male gametes**.",
      ],
    },
    {
      title: "Describe the development of female gametophyte (monosporic embryo sac)",
      steps: [
        "The diploid megaspore mother cell in the nucellus, towards the micropyle, divides by meiosis into a linear tetrad of haploid megaspores.",
        "The upper three abort; the one towards the centre of the nucellus is functional: the **first cell of the female gametophyte**.",
        "It undergoes three successive free nuclear mitoses: 8 nuclei, four at each pole.",
        "One nucleus from each pole moves to the centre: the two **polar nuclei**, which fuse into the diploid secondary nucleus just before fertilization.",
        "Micropylar end: egg apparatus (egg + 2 synergids with filiform apparatus). Chalazal end: 3 antipodals. Result: a 7-celled, 8-nucleate embryo sac.",
      ],
    },
    {
      title: "Explain double fertilization and give its significance",
      steps: [
        "The pollen tube, guided by chemicals from the synergids, enters the ovule (usually by the micropyle) and the embryo sac at its micropylar end.",
        "It enters one synergid, absorbs its contents, ruptures and releases two non-motile male gametes.",
        "**Syngamy**: one male gamete fuses with the egg, giving the diploid zygote, which becomes the embryo.",
        "**Triple fusion**: the second male gamete fuses with the diploid secondary nucleus, giving the triploid PEN, which becomes the endosperm.",
        "Significance: unique to angiosperms; food is stored in a seed only if the egg is fertilized; restores the diploid condition; gives nutritive endosperm.",
      ],
    },
    {
      title: "Define endosperm and describe its types",
      steps: [
        "**Nuclear** (commonest, 161 families): the PEN divides without walls into free nuclei, pushed to the periphery by a central vacuole; walls form later. e.g. wheat, sunflower, coconut.",
        "Coconut: multicellular endosperm outside, free nuclear and vacuolated endosperm in the centre.",
        "**Cellular** (72 dicot families): every division is followed by a wall, so it is cellular from the start. e.g. Balsam, Petunia, Adoxa.",
        "**Helobial** (order Helobiales, monocots): the first division gives a transverse wall, a small chalazal and a large micropylar cell; free nuclear divisions follow. Intermediate type. e.g. Asphodelus.",
      ],
    },
    {
      title: "Number of meiotic divisions for a given number of male gametes or seeds",
      steps: [
        "One meiosis of a microspore mother cell gives 4 pollen grains; each gives 2 male gametes. So 1 meiosis gives 8 male gametes: 80 male gametes need 80 ÷ 8 = **10** meioses.",
        "One meiosis of a megaspore mother cell gives one functional megaspore: one embryo sac, so one seed.",
        "Each seed also needs one pollen grain, and one meiosis gives 4 pollen grains.",
        "So N seeds need N + N/4 meioses: 300 seeds need 300 + 75 = **375**.",
      ],
    },
  ],
  diagrams: [
    {
      title: "L.S. of anatropous ovule",
      labels: ["funicle and hilum", "micropyle and chalaza", "outer and inner integument", "nucellus", "egg and synergids", "secondary nucleus and antipodals"],
    },
    {
      title: "Development of male gametophyte",
      labels: ["exine and intine", "germ pore", "vegetative cell (tube nucleus)", "generative cell", "two male gametes", "pollen tube"],
    },
    {
      title: "T.S. of anther",
      labels: ["epidermis", "endothecium", "middle layers", "tapetum", "sporogenous tissue", "connective"],
    },
    {
      title: "Development of female gametophyte",
      labels: ["megaspore mother cell", "four megaspores, three degenerate", "functional megaspore", "2, 4 and 8 nucleate stages", "egg, synergids, polar nuclei, antipodals"],
    },
    {
      title: "Double fertilization",
      labels: ["pollen tube in a synergid", "syngamy: egg + male gamete", "triple fusion: secondary nucleus + male gamete", "antipodals", "micropyle"],
    },
    {
      title: "V.S. of maize grain",
      labels: ["seed coat and fruit wall", "aleurone layer", "endosperm", "scutellum", "coleoptile and plumule", "radicle and coleorhiza"],
    },
  ],
  mostAsked: [
    { topic: "Define or explain: cutting, grafting, apomixis, parthenocarpy, polyembryony, siphonogamy", years: [2026, 2024] },
    { topic: "Anatropous ovule: identify its parts, their fate after fertilization, the first cell and nuclei of the embryo sac", years: [2026, 2024] },
    { topic: "Anther and pollen: role of tapetum, sporopollenin, development of male gametophyte with a diagram", years: [2026, 2025] },
    { topic: "Define endosperm and describe its types (nuclear, helobial)", years: [2026, 2025] },
    { topic: "Number of meiotic divisions for male gametes or seeds (numerical)", years: [2026, 2024] },
    { topic: "Significance of double fertilization", years: [2024] },
    { topic: "Geitonogamy: needs a pollinator but is genetically like autogamy", years: [2024] },
    { topic: "Monocot embryo: coleoptile, the sheath of the plumule", years: [2024] },
  ],
  mistakes: [
    {
      title: "Counting only one kind of meiosis for seeds",
      body: "Each seed needs one megaspore mother cell meiosis **and** one pollen grain, a quarter of a microspore mother cell meiosis. 300 seeds need 375 meioses, not 300 or 75.",
    },
    {
      title: "Writing the endosperm as diploid",
      body: "Angiosperm endosperm is **triploid**: it comes from triple fusion. The secondary nucleus before fertilization is diploid; the zygote is diploid.",
    },
    {
      title: "Calling geitonogamy cross pollination",
      body: "It uses a pollinating agent like cross pollination, but the pollen comes from the same plant, so genetically it is the same as autogamy.",
    },
    {
      title: "Confusing parthenocarpy with parthenogenesis",
      body: "Parthenocarpy is a seedless **fruit** formed without fertilization. Parthenogenesis is an **embryo** formed directly from the egg cell or a male gamete, a kind of apogamy.",
    },
    {
      title: "Mixing up coleoptile and coleorhiza",
      body: "The coleoptile sheaths the **plumule**; the coleorhiza sheaths the **radicle**. The scutellum is the single cotyledon.",
    },
    {
      title: "Counting eight haploid nuclei in the mature embryo sac",
      body: "Just before fertilization the two polar nuclei have fused: the book's figure shows seven nuclei, six haploid and one diploid.",
    },
  ],
};

export default sheet;
