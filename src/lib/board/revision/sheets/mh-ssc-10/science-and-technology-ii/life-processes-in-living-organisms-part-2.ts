import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 3 Life Processes in Living
 * Organisms Part 2 (reproduction). Statements checked against the Balbharati
 * text; most-asked years from the board past papers in the bank. Many board
 * items are parts of one diagram question; each part is counted as a line.
 * Puberty changes in boys (2018) are not taught in the current book.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Life Processes in Living Organisms Part 2",
  chapterSlug: "life-processes-in-living-organisms-part-2",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Reproduction",
      text: "Formation of new organism of same species by earlier existing organism. It does not keep the organism alive but maintains the **continuity of the species**. Two methods: asexual and sexual.",
    },
    {
      term: "Asexual reproduction",
      text: "New organism formed **without involvement of gametes**; uniparental, by mitosis, so the offspring is genetically identical. Advantage: fast. Drawback: no genetic recombination.",
    },
    {
      term: "Binary fission",
      text: "The parent cell divides into two similar daughter cells, in favourable conditions. **Amoeba**: simple (any plane). **Paramecium**: transverse. **Euglena**: longitudinal. Bacteria, mitochondria and chloroplasts also divide so.",
    },
    {
      term: "Multiple fission",
      text: "In adverse conditions Amoeba becomes rounded and forms a **cyst**. Repeated nuclear divisions inside give many amoebulae, released when favourable conditions return.",
    },
    {
      term: "Budding",
      text: "**Yeast** (unicellular): a bulge on the parent cell gets one daughter nucleus and separates. **Hydra** (multicellular): an outgrowth from regenerative cells of the body wall grows into a small hydra.",
    },
    {
      term: "Fragmentation and regeneration",
      text: "**Fragmentation**: the body breaks into fragments, each lives as a new organism (Spirogyra, Sycon). **Regeneration**: each part regrows the rest of the body (Planaria). A wall lizard's tail is limited regeneration.",
    },
    {
      term: "Vegetative propagation and spores",
      text: "Reproduction by root, stem, leaf or bud: potato (eyes on tuber), Bryophyllum (buds on leaf margin), sugarcane (buds on nodes). **Mucor** forms spores in sporangia; spores germinate into new colonies.",
    },
    {
      term: "Sexual reproduction",
      text: "Always needs two gametes. **Gamete formation** by meiosis gives haploid gametes; **fertilization** joins them into a diploid zygote. Offspring carry recombined genes of both parents, so they show variation.",
    },
    {
      term: "Flower",
      text: "Structural unit of sexual reproduction in plants. Four whorls: calyx, corolla (**accessory whorls**, protect), androecium and gynoecium (**essential whorls**, reproduce). Stamens are male; carpels (ovary, style, stigma) are female.",
    },
    {
      term: "Pollination and double fertilization",
      text: "Transfer of pollen grains from anther to stigma, by wind, water, insects or animals. One male gamete + egg cell gives the zygote; the second + two polar nuclei gives endosperm: **double fertilization**.",
    },
    {
      term: "Human male reproductive system",
      text: "Testes (in scrotum) make sperms by meiosis in seminiferous tubules. Ducts: rete testis, vasa efferentia, epididymis, **vas deferens**, ejaculatory duct, urinogenital duct. Glands: seminal vesicles, prostate, Cowper's. A sperm is about 60 micrometres long.",
    },
    {
      term: "Human female reproductive system",
      text: "A pair of ovaries, a pair of oviducts, single uterus and a vagina, plus a pair of Bartholin's glands. At birth the ovaries hold 2 to 4 million immature oocytes; menopause comes at about 45 to 50 years.",
    },
    {
      term: "Sex determination",
      text: "Sperms are (22 + X) or (22 + Y); oocytes only (22 + X). X from the father gives a girl (44 + XX), Y gives a boy (44 + XY). So the **man** decides the sex of the child, not the mother.",
    },
    {
      term: "Twins and modern techniques",
      text: "**Monozygotic** twins: one embryo splits, identical, same gender. **Dizygotic**: two oocytes, two sperms, genetically different. **IVF**, **surrogacy** and **sperm bank** help childless couples.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "What is menstrual cycle? Describe it in brief",
      steps: [
        "Changes in the female reproductive system repeating every **28 to 30 days**, controlled by four hormones: FSH, LH, estrogen, progesterone.",
        "FSH: a follicle develops and secretes **estrogen**; the endometrium of the uterus grows or regenerates.",
        "LH: the follicle bursts and releases the oocyte (**ovulation**); the rest forms the corpus luteum, which secretes **progesterone**; endometrial glands secrete.",
        "No fertilization in 24 hours: corpus luteum becomes corpus albicans, hormones stop, the endometrium breaks down with bleeding for about five days.",
      ],
    },
    {
      title: "Explain with examples types of asexual reproduction in unicellular organisms",
      steps: [
        "**Binary fission**: parent cell divides into two; Amoeba (simple), Paramecium (transverse), Euglena (longitudinal).",
        "**Multiple fission**: Amoeba forms a cyst in adverse conditions; many amoebulae form and are released later.",
        "**Budding**: in yeast, a bud gets one daughter nucleus, grows and separates.",
      ],
    },
    {
      title: "Explain sexual reproduction in plants",
      steps: [
        "Pollen from the anther reaches the sticky stigma (pollination) and grows a pollen tube with two male gametes.",
        "The tube passes down the style to the embryo sac in the ovule and bursts.",
        "One male gamete + egg cell gives the zygote; the other + two polar nuclei gives the endosperm (double fertilization).",
        "The ovule becomes the seed and the ovary the fruit; the seed germinates into a plantlet.",
      ],
    },
    {
      title: "Gender of child is determined by the male partner. True or false? Explain",
      steps: [
        "True. Women are 44 + XX, men 44 + XY.",
        "By meiosis, a woman gives only (22 + X) ova; a man gives (22 + X) or (22 + Y) sperms.",
        "X sperm + ovum gives a girl (44 + XX); Y sperm + ovum gives a boy (44 + XY). So blaming the mother for a girl is wrong.",
      ],
    },
    {
      title: "Explain IVF, surrogacy and sperm bank",
      steps: [
        "**IVF**: fertilization in a test tube; the embryo is implanted in the woman's uterus. For low sperm count or a blocked oviduct.",
        "**Surrogacy**: the couple's oocyte and sperm are joined in a test tube; the embryo is implanted in another woman's normal uterus (surrogate mother).",
        "**Sperm bank**: semen from checked donors is stored like a blood bank and used by IVF; the donor's name is kept secret.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Parts of flower (Fig. 3.12)",
      labels: ["calyx (sepals)", "corolla (petals)", "androecium: anther, filament", "gynoecium: stigma, style, ovary", "pedicel"],
    },
    {
      title: "Human male reproductive system (Fig. 3.16)",
      labels: ["testis, scrotum", "epididymis, vas deferens", "seminal vesicle, prostate gland, Cowper's gland", "ejaculatory duct, urinogenital duct", "urinary bladder, penis"],
    },
    {
      title: "Human female reproductive system (Fig. 3.17)",
      labels: ["ovary", "oviduct (funnel-like free end)", "uterus", "vagina"],
    },
    {
      title: "Menstrual cycle (Fig. 3.21)",
      labels: ["pituitary gland: FSH, LH", "fully grown follicle, ovulation", "corpus luteum, corpus albicans", "period of menstruation", "regeneration of endometrium", "secretion of glands in endometrium"],
    },
    {
      title: "Double fertilization in angiosperms (Fig. 3.14)",
      labels: ["pollen grain, pollen tube", "male gametes", "egg cell, synergids", "polar nuclei, antipodals", "embryo sac in ovule"],
    },
  ],
  mostAsked: [
    { topic: "Flower: essential and accessory whorls, parts of androecium and gynoecium, pollination and its agents, labelled flower", years: [2026, 2023, 2022, 2017, 2016] },
    { topic: "Types of asexual reproduction: binary and multiple fission, budding, fragmentation, regeneration, spores", marks: 1, years: [2026, 2025, 2024, 2023, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Human male reproductive system: diagram, glands, ducts, testes and sperm (60 micrometres, by meiosis)", years: [2026, 2025, 2024, 2020] },
    { topic: "Female reproductive system and menstrual cycle: diagram, hormones, ovulation, regeneration of endometrium", marks: 5, years: [2024, 2023, 2016] },
    { topic: "Modern techniques and twins: IVF, surrogacy, sperm bank, monozygotic twins", years: [2020, 2019] },
    { topic: "Sex determination: Y chromosome for maleness, why the mother is not responsible for a girl", years: [2026, 2025, 2019] },
    { topic: "Distinguish between sexual and asexual reproduction", years: [2024, 2023, 2022] },
    { topic: "Reproductive health and population: sexual diseases, family planning, problems of a large family", years: [2025, 2020, 2016] },
  ],
  mistakes: [
    {
      title: "Mixing up the fission planes",
      body: "Amoeba: simple binary fission (any plane). Paramecium: transverse. Euglena: longitudinal. Multiple fission happens in a cyst, in adverse conditions.",
    },
    {
      title: "Essential and accessory whorls swapped",
      body: "Androecium and gynoecium are essential (they reproduce). Calyx and corolla are accessory (they protect).",
    },
    {
      title: "Blaming the mother for a girl child",
      body: "The mother gives only an X chromosome. The father's sperm carries X or Y, so the father's chromosome decides the sex.",
    },
    {
      title: "Hormone order in the menstrual cycle",
      body: "FSH grows the follicle, which makes estrogen. LH causes ovulation. The corpus luteum makes progesterone. Do not swap estrogen and progesterone.",
    },
    {
      title: "Identical and fraternal twins",
      body: "Monozygotic: one zygote splits, same gender, genetically identical. Dizygotic: two oocytes fertilized separately, may differ in gender.",
    },
  ],
};

export default sheet;
