import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 2 Reproduction in Lower and Higher Animals.
 * Definitions checked against the Balbharati text (the book's own wording,
 * trimmed); most-asked years from the 19 board past-paper questions in the
 * bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Reproduction in Lower and Higher Animals",
  chapterSlug: "reproduction-in-lower-and-higher-animals",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Asexual and sexual reproduction",
      text: "**Asexual**: one parent, no meiosis, no gamete formation or fusion; progeny are genetically identical **clones** (gemmule, budding). **Sexual** (amphimixis): formation and fusion of gametes, which are formed by **meiosis**; offspring show variation.",
    },
    {
      term: "Leydig's cells",
      text: "Interstitial cells lying in between the seminiferous tubules. They secrete the male hormone **androgen (testosterone)**.",
    },
    {
      term: "Sertoli cells",
      text: "Large pyramidal (sustentacular) cells in the lining of the seminiferous tubule. They **provide nutrition to the developing sperms**; sperm heads stay attached to them.",
    },
    {
      term: "Spermiogenesis",
      text: "The transformation of a non-motile, non-functional spermatid into a **functional spermatozoon**. During it the spermatid lengthens. (Spermatogenesis is the whole process from spermatogonia to sperms.)",
    },
    {
      term: "Acrosome and nebenkern",
      text: "**Acrosome**: cap over the sperm nucleus, formed from the Golgi body, with hydrolytic enzymes (hyaluronidase, zona lysins). **Nebenkern**: 10-14 spiral turns of mitochondria round the axial filament in the middle piece; it produces energy for sperm movement.",
    },
    {
      term: "Zona pellucida",
      text: "A non-cellular glycoprotein membrane secreted by the vitelline membrane, outside it. It carries the sperm receptor proteins (ZP3, ZP2), and its function is to **prevent implantation of the embryo at an abnormal site**; it ruptures only in the uterus.",
    },
    {
      term: "Graafian follicle",
      text: "A mature ovarian follicle: an eccentric secondary oocyte in zona pellucida and corona radiata; **antrum** filled with liquor folliculi; membrana granulosa; **theca interna** (secretes estrogen); **theca externa** (outer fibrous cover). Cumulus oophorus: the oocyte with its granulosa cells.",
    },
    {
      term: "Ovulation",
      text: "Rupture of the mature Graafian follicle and release of the ovum (**secondary oocyte**) into the pelvic cavity, usually on the 14th day. Rapid secretion of **LH** by positive feedback causes the follicle to rupture.",
    },
    {
      term: "Corpus luteum and corpus albicans",
      text: "After ovulation the remaining follicle becomes the **corpus luteum** under LH; it secretes progesterone, some estrogen and inhibin. Without fertilization it lives about two weeks and degenerates into a white scar, the **corpus albicans**. In pregnancy hCG keeps it alive.",
    },
    {
      term: "Colostrum",
      text: "The sticky, yellow fluid secreted by the mammary glands soon after child birth. It has proteins, lactose and the mother's antibodies (**IgA**), little fat; it builds resistance in the new born.",
    },
    {
      term: "Cells of Rauber",
      text: "The trophoblast cells in contact with the embryonal knob (inner cell mass) of the blastocyst.",
    },
    {
      term: "Infertility",
      text: "The inability to conceive naturally after one year of regular unprotected intercourse. Causes: physical, congenital, diseases, immunological or psychological (PCOS, hormonal imbalance, endometriosis in females; low sperm count in males).",
    },
    {
      term: "ZIFT and GIFT",
      text: "**ZIFT** (Zygote Intrafallopian Transfer): egg fertilized outside the body (IVF), the **zygote** put into the fallopian tube; for blocked tubes. **GIFT** (Gamete Intrafallopian Transfer): ova and sperms put directly into the oviduct, where fertilization happens; success about 30 percent.",
    },
    {
      term: "Vasectomy and tubectomy",
      text: "Permanent (surgical) birth control. **Vasectomy** (men): a small part of the vas deferens is tied and cut. **Tubectomy** (women): a small part of the **fallopian tube** is tied and cut.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Describe the histological structure of testis, with a labelled diagram",
      steps: [
        "Covering: outer tunica vaginalis (incomplete peritoneal), middle **tunica albuginea** (white fibrous), inner tunica vasculosa (vascular).",
        "Fibres of the tunica albuginea divide each testis into about 200-300 lobules, each with 1-4 highly coiled **seminiferous tubules**.",
        "Each tubule is lined by cuboidal **germinal epithelium** (spermatogonia) and a few large **Sertoli cells**, which nourish developing sperms.",
        "Stages of spermatogenesis from outside in: spermatogonia (2n), primary spermatocytes (2n), secondary spermatocytes (n), spermatids (n), sperms (n) in the lumen.",
        "**Leydig's (interstitial) cells** lie between the tubules and secrete testosterone.",
      ],
    },
    {
      title: "Describe the structure of human sperm, with a labelled diagram",
      steps: [
        "A motile, microscopic, elongated cell in three parts: head, middle piece and tail (with a short neck).",
        "**Head**: oval, haploid nucleus; above it the **acrosome** (from the Golgi body) with hyaluronidase and zona lysins.",
        "**Neck**: proximal and distal centrioles.",
        "**Middle piece**: axial filament with 10-14 spiral turns of mitochondria (**nebenkern**): energy for movement.",
        "**Tail**: axial filament from the distal centriole; main piece with plasma membrane, end piece without.",
      ],
    },
    {
      title: "Describe the structure of Graafian follicle",
      steps: [
        "Outermost protective, fibrous **theca externa**; inner cellular **theca interna**, which produces estrogen.",
        "Follicular cells inside form the **membrana granulosa**; from it come the discus proligerus and the **corona radiata**.",
        "The eccentric secondary oocyte is covered by the non-cellular **zona pellucida**.",
        "A fluid-filled cavity, the **antrum**, with liquor folliculi, lies between the oocyte and the membrana granulosa.",
      ],
    },
    {
      title: "Explain the phase of the menstrual cycle after ovulation (secretory or luteal phase)",
      steps: [
        "The longest phase: 14 days, from the 15th to the 28th day, between ovulation and the next menses.",
        "The rest of the Graafian follicle becomes the **corpus luteum** under LH; it secretes progesterone, some estrogen and inhibin.",
        "The endometrial glands grow, coil and secrete; the endometrium thickens to 8-10 mm and becomes vascular. Inhibin stops FSH.",
        "If the egg is fertilized and implants, **hCG** extends the life of the corpus luteum.",
        "If not, the corpus luteum degenerates into the **corpus albicans** after two weeks and the next cycle begins.",
      ],
    },
    {
      title: "Distinguish between human sperm and ovum",
      steps: [
        "Sperm: motile, microscopic, elongated, with head, middle piece and tail. Ovum: non-motile, rounded, about 0.1 mm.",
        "Sperm: acrosome with lytic enzymes, two centrioles. Ovum: no centrioles; large nucleus (germinal vesicle).",
        "Sperm: many mitochondria in the middle piece. Ovum: microlecithal (very little yolk), cytoplasm called ooplasm.",
        "Sperm: plasma membrane only. Ovum: vitelline membrane, zona pellucida and corona radiata.",
      ],
    },
  ],
  diagrams: [
    {
      title: "T.S. of testis",
      labels: ["seminiferous tubule", "germinal epithelium (spermatogonia)", "Sertoli cell", "sperm bundle in the lumen", "Leydig's (interstitial) cells", "basement membrane, connective tissue"],
    },
    {
      title: "Structure of sperm",
      labels: ["acrosome", "nucleus", "proximal and distal centrioles", "mitochondria (nebenkern)", "axial filament", "principal piece and end piece"],
    },
    {
      title: "Graafian follicle",
      labels: ["theca externa", "theca interna", "antrum", "granulosa cells", "corona radiata", "oocyte and zona pellucida"],
    },
    {
      title: "Unfertilized egg (secondary oocyte)",
      labels: ["germinal vesicle", "vitelline membrane", "perivitelline space", "first polar body", "zona pellucida", "corona radiata"],
    },
  ],
  mostAsked: [
    { topic: "Histology of testis with a diagram; Leydig's cells; spermiogenesis", years: [2026, 2024] },
    { topic: "Structure of human sperm with a diagram; nebenkern and zona pellucida; sperm versus ovum", years: [2026, 2025, 2024] },
    { topic: "Graafian follicle: draw and label, or identify parts and give their significance", years: [2026, 2025] },
    { topic: "Menstrual cycle: the phase after ovulation, and the fate of the corpus luteum", years: [2026, 2024] },
    { topic: "Infertility: ZIFT and GIFT", years: [2026, 2024] },
    { topic: "Colostrum: the milk secreted soon after parturition", years: [2026] },
    { topic: "Tubectomy: the permanent method in which the fallopian tube is tied and cut", years: [2025] },
    { topic: "Cells of Rauber", years: [2024] },
  ],
  mistakes: [
    {
      title: "Swapping Leydig's and Sertoli cells",
      body: "**Leydig's** cells lie **between** the tubules and secrete testosterone. **Sertoli** cells lie **inside** the tubule lining and nourish the developing sperms.",
    },
    {
      title: "Confusing spermatogenesis with spermiogenesis",
      body: "Spermatogenesis is the whole making of sperms from spermatogonia. Spermiogenesis is only its last step: a spermatid changing into a spermatozoon.",
    },
    {
      title: "Writing that a mature ovum is released at ovulation",
      body: "What is released is the **secondary oocyte**. Meiosis II is completed only when a sperm enters it.",
    },
    {
      title: "Mixing up ZIFT and GIFT",
      body: "ZIFT transfers a **zygote**, made by IVF outside the body, into the fallopian tube. GIFT transfers **gametes** (ova and sperms) into the oviduct, so fertilization happens inside.",
    },
    {
      title: "Calling the corpus albicans yellow, or the corpus luteum a scar",
      body: "The corpus luteum is the active, hormone-secreting body after ovulation. The corpus albicans is the **white scar** it leaves when there is no fertilization.",
    },
  ],
};

export default sheet;
