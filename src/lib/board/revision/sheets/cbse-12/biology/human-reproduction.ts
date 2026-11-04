import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 2 Human Reproduction. Definitions and events
 * checked against the NCERT text (the book's own wording, trimmed);
 * most-asked years and marks from the CBSE board past-paper questions in the
 * bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Human Reproduction",
  chapterSlug: "human-reproduction",
  source: "NCERT Biology (CBSE Class 12), Chapter 2",
  keyPoints: [
    {
      term: "Testis",
      text: "In the **scrotum**, which keeps the testes **2-2.5 °C lower** than body temperature, as spermatogenesis needs. About **250 testicular lobules**, each with one to three **seminiferous tubules**, lined by **spermatogonia** (male germ cells) and **Sertoli cells** (nutrition to germ cells). **Leydig (interstitial) cells**, outside the tubules, secrete **androgens**.",
    },
    {
      term: "Male accessory ducts and glands",
      text: "Seminiferous tubules, **rete testis**, **vasa efferentia**, **epididymis**, **vas deferens**, ejaculatory duct, urethra. Glands: paired **seminal vesicles**, a **prostate** and paired **bulbourethral glands**; their secretions form the **seminal plasma**, rich in **fructose, calcium and certain enzymes**. Seminal plasma with sperms is **semen**.",
    },
    {
      term: "Sperm",
      text: "Head, neck, middle piece and tail. The head has an elongated haploid nucleus capped by the **acrosome**, filled with enzymes that help fertilisation. The **middle piece** has numerous **mitochondria** for the energy of tail movement. Of 200-300 million sperms per ejaculate, at least **60 per cent** must have normal shape and size and **40 per cent** vigorous motility.",
    },
    {
      term: "Ovary and oviduct",
      text: "Ovary: 2 to 4 cm, held to the pelvic wall and uterus by **ligaments**; stroma of a peripheral **cortex** and an inner **medulla**. Oviduct (fallopian tube, 10-12 cm): funnel-shaped **infundibulum** with **fimbriae** that collect the ovum, the wider **ampulla**, and the narrow **isthmus** joining the uterus.",
    },
    {
      term: "Wall of the uterus",
      text: "Outer thin **perimetrium**, middle thick smooth muscle **myometrium**, inner glandular **endometrium**. The endometrium undergoes **cyclical changes** during the menstrual cycle; the myometrium shows **strong contraction** during delivery. The cervical canal with the vagina forms the **birth canal**.",
    },
    {
      term: "Mammary gland",
      text: "Glandular tissue of each breast in **15-20 mammary lobes** with clusters of cells called **alveoli**, which secrete milk. Alveoli, mammary tubules, mammary duct, **mammary ampulla**, **lactiferous duct**, nipple.",
    },
    {
      term: "Oogenesis begins before birth",
      text: "A couple of million **oogonia** form in each fetal ovary; none are added after birth. They enter prophase I and are **arrested** as **primary oocytes**. Many follicles degenerate, so at puberty only **60,000-80,000 primary follicles** are left in each ovary.",
    },
    {
      term: "Menstrual cycle",
      text: "About **28/29 days**; first menstruation is **menarche**, the end (around 50 years) is **menopause**. Menstrual phase **3-5 days**, then follicular (proliferative), ovulatory and luteal phases. The **LH surge** at mid-cycle (about the 14th day) ruptures the Graafian follicle: ovulation. Menstruation occurs only if the ovum is not fertilised.",
    },
    {
      term: "Corpus luteum",
      text: "In the luteal phase the remaining parts of the Graafian follicle form the **corpus luteum**, which secretes large amounts of **progesterone**, essential for maintenance of the endometrium for implantation. Without fertilisation it **degenerates**, the endometrium disintegrates and menstruation follows.",
    },
    {
      term: "Fertilisation",
      text: "Takes place in the **ampullary region** of the fallopian tube, only if ovum and sperms reach it together; so not all copulations lead to pregnancy. A sperm contacting the **zona pellucida** induces changes that block other sperms. Sperm entry completes the **second meiotic division** of the secondary oocyte. The sex of the baby is decided by the **father's** sperm (X or Y).",
    },
    {
      term: "Blastocyst and implantation",
      text: "Cleavage gives blastomeres; 8 to 16 blastomeres is a **morula**, which becomes the **blastocyst**: outer **trophoblast** and an **inner cell mass**. The trophoblast attaches to the endometrium; the inner cell mass becomes the embryo. Embedding of the blastocyst in the endometrium is **implantation**. The inner cell mass has **stem cells**, able to form all tissues and organs.",
    },
    {
      term: "Placenta",
      text: "**Chorionic villi** of the trophoblast interdigitate with uterine tissue to form the placenta: supplies oxygen and nutrients, removes carbon dioxide and wastes, joined to the embryo by the **umbilical cord**. It is an endocrine tissue: **hCG, hPL, estrogens, progestogens**. **Relaxin** comes from the **ovary** late in pregnancy. hCG, hPL and relaxin occur only in pregnancy.",
    },
    {
      term: "Embryonic development by month",
      text: "Heart forms after **one month**; limbs and digits by the end of the **second month**; most major organ systems by **12 weeks** (first trimester). First movements and hair on the head in the **fifth month**. By **24 weeks**: fine body hair, eyelids separate, eyelashes. Fully developed at nine months.",
    },
    {
      term: "Lactation and colostrum",
      text: "Mammary glands differentiate during pregnancy and produce milk towards its end (**lactation**). The milk of the initial few days is **colostrum**, which contains several **antibodies** absolutely essential to develop resistance in the new-born.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Spermatogenesis and its hormonal control",
      steps: [
        "Begins at **puberty**. Spermatogonia (2n, 46) multiply by mitosis; some become **primary spermatocytes**.",
        "Meiosis I: two equal, haploid **secondary spermatocytes** (23 chromosomes). Meiosis II: four equal, haploid **spermatids**.",
        "**Spermiogenesis**: spermatids become sperms; heads embed in Sertoli cells, then sperms are released by **spermiation**.",
        "A rise in **GnRH** (hypothalamus) acts on the anterior pituitary to release **LH and FSH**.",
        "**LH** acts on **Leydig cells**: androgens, which stimulate spermatogenesis. **FSH** acts on **Sertoli cells**: factors that help spermiogenesis.",
      ],
    },
    {
      title: "Oogenesis, with the chromosome number at each step",
      steps: [
        "Fetal ovary: **oogonia** (46) form; they enter meiosis and arrest in prophase I as **primary oocytes** (46).",
        "Primary oocyte + a layer of granulosa cells: **primary follicle**; more granulosa layers and a theca: **secondary follicle**.",
        "**Tertiary follicle** (fluid-filled **antrum**): the primary oocyte completes meiosis I, unequally: a large **secondary oocyte** (23) and a tiny **first polar body**.",
        "**Graafian follicle**: the secondary oocyte forms the **zona pellucida**; the follicle ruptures and releases it (**ovulation**).",
        "Sperm entry completes meiosis II: an **ovum (ootid, 23)** and a **second polar body**; fusion with the sperm gives a zygote (46).",
      ],
    },
    {
      title: "Ovarian and uterine events of the menstrual cycle, with their hormones",
      steps: [
        "**Menstrual phase** (3-5 days): the endometrium and its blood vessels break down, as the corpus luteum has degenerated.",
        "**Follicular phase**: LH and FSH rise; primary follicles grow into a **Graafian follicle**, which secretes **estrogens**; the endometrium **regenerates by proliferation**.",
        "**Ovulatory phase**: LH and FSH peak about day 14; the **LH surge** ruptures the Graafian follicle and releases the ovum.",
        "**Luteal phase**: the **corpus luteum** forms and secretes progesterone, which maintains the endometrium for implantation.",
        "No fertilisation: the corpus luteum degenerates and menstruation starts a new cycle. Pregnancy: no menstruation.",
      ],
    },
    {
      title: "Trace the events from fertilisation to implantation",
      steps: [
        "Sperms reach the **ampullary region**; one contacts the **zona pellucida**, which blocks entry of other sperms.",
        "**Acrosome** secretions help the sperm enter; this completes meiosis II, giving the haploid ovum and a second polar body.",
        "Sperm and ovum nuclei fuse: a **diploid zygote**.",
        "**Cleavage** (mitosis) begins as the zygote moves through the **isthmus** towards the uterus: 2, 4, 8, 16 blastomeres; 8 to 16 is a **morula**.",
        "The morula becomes a **blastocyst** (trophoblast and inner cell mass); the trophoblast attaches to the endometrium and the blastocyst is embedded: **implantation**.",
      ],
    },
    {
      title: "Formation of the placenta and its role",
      steps: [
        "After implantation, finger-like **chorionic villi** appear on the trophoblast, surrounded by uterine tissue and maternal blood.",
        "Chorionic villi and uterine tissue **interdigitate**, forming the placenta: a structural and functional unit between foetus and mother.",
        "Supplies oxygen and nutrients; removes carbon dioxide and wastes; linked to the embryo by the **umbilical cord**.",
        "Acts as an **endocrine tissue**: hCG, hPL, estrogens and progestogens, which support fetal growth and maintain pregnancy.",
      ],
    },
    {
      title: "Neuroendocrine mechanism of parturition",
      steps: [
        "Signals from the fully developed **foetus and placenta** induce mild uterine contractions: the **foetal ejection reflex**.",
        "This triggers release of **oxytocin** from the **maternal pituitary**.",
        "Oxytocin causes **stronger uterine contractions**, which stimulate more oxytocin secretion: the cycle repeats.",
        "Stronger and stronger contractions expel the baby through the **birth canal**; the placenta is expelled soon after.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Sectional view of a seminiferous tubule, enlarged (Figure 2.5)",
      labels: ["spermatogonium", "primary spermatocyte", "secondary spermatocyte", "spermatids", "sperms", "Sertoli cell", "interstitial (Leydig) cells"],
    },
    {
      title: "Structure of a sperm (Figure 2.6)",
      labels: ["acrosome", "nucleus (head)", "neck", "middle piece with mitochondria", "tail", "plasma membrane"],
    },
    {
      title: "Sectional view of the ovary (Figure 2.7)",
      labels: ["primary follicle", "secondary follicle", "tertiary follicle with antrum", "Graafian follicle", "ovum (secondary oocyte)", "corpus luteum", "blood vessels"],
    },
    {
      title: "Schematic representation of spermatogenesis and oogenesis (Figure 2.8)",
      labels: ["spermatogonium and oogonium (46)", "primary spermatocyte and primary oocyte (46)", "secondary spermatocyte and secondary oocyte (23)", "first and second polar bodies", "spermatids, sperms and ovum (23)"],
    },
    {
      title: "Ovum surrounded by few sperms (Figure 2.10)",
      labels: ["zona pellucida", "corona radiata", "perivitelline space", "plasma membrane", "sperms"],
    },
    {
      title: "Blastocyst, the stage that is implanted (Figure 2.11)",
      labels: ["trophoblast", "inner cell mass", "blastocoel (cavity)", "endometrium"],
    },
  ],
  mostAsked: [
    {
      topic: "Menstrual cycle: its phases in order, ovarian and uterine changes, the pituitary and ovarian hormones, the LH surge and the corpus luteum",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Fertilisation to implantation: site of fertilisation, block to polyspermy, completion of meiosis II, morula, blastocyst diagram, stem cells",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Pregnancy, placenta and parturition: formation and role of the placenta, pregnancy hormones and their sources, foetal ejection reflex, colostrum",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Spermatogenesis: seminiferous tubule diagram, cells and chromosome numbers, role of GnRH, LH and FSH",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Oogenesis: schematic with chromosome numbers, follicle stages, polar bodies, how it differs from spermatogenesis",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Male reproductive system: accessory ducts and glands, seminal plasma, sperm diagram and its parts",
      marks: 1,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Female reproductive system: ovary, layers of the uterus, mammary glands",
      marks: 1,
      years: [2026, 2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Meiosis I in oogenesis written as equal",
      body: "In spermatogenesis both divisions are **equal**: one primary spermatocyte gives four sperms. In oogenesis both are **unequal**: one primary oocyte gives one ovum and polar bodies. A secondary spermatocyte has 23 chromosomes: **22 autosomes** and an X or a Y.",
    },
    {
      title: "Wrong time for meiosis II of the oocyte",
      body: "Meiosis I is completed in the **tertiary follicle**; ovulation releases a **secondary oocyte**. Meiosis II is completed only when the **sperm enters** the ovum, not at ovulation and not at implantation.",
    },
    {
      title: "Swapping the targets of LH and FSH",
      body: "In the male, **LH acts on Leydig cells** (androgens) and **FSH on Sertoli cells** (factors for spermiogenesis). In the female, the **LH surge** causes ovulation. GnRH acts on the anterior pituitary, not on the testis.",
    },
    {
      title: "Getting the source of a hormone wrong",
      body: "Oxytocin at parturition comes from the **maternal pituitary**, not the foetus. **Relaxin** in late pregnancy comes from the **ovary**. Progesterone in the cycle comes from the **corpus luteum**; hCG and hPL come from the placenta.",
    },
    {
      title: "Placing fertilisation in the uterus",
      body: "Fertilisation is in the **ampullary region** of the fallopian tube. Cleavage starts in the isthmus; the **blastocyst**, not the zygote or morula, is implanted in the **endometrium**.",
    },
    {
      title: "Mixing up the layers of the uterus",
      body: "**Endometrium** (inner, glandular): cyclical changes. **Myometrium** (middle, smooth muscle): contractions at delivery. **Perimetrium**: outer thin membrane.",
    },
  ],
};

export default sheet;
