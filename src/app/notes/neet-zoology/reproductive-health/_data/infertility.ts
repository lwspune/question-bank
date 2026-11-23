import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_RH_INFERTILITY_NOTE: SubtopicNote = {
  subtopicName: "Infertility and Assisted Reproduction",
  title: "Infertility and Assisted Reproduction",
  oneLineDefinition:
    "What infertility is and what causes it, how in vitro fertilisation works, the assisted reproductive technologies ZIFT, IUT, GIFT, ICSI, AI and IUI, the limits of these methods, and MOET in cattle.",
  whyItMatters:
    "Four NEET questions, three of them from 2025 or later: the drawbacks of IVF (NEET 2025), what GIFT is (NEET 2026) and what ICSI is (Re-NEET 2026). NEET 2021 asked which step of MOET, the embryo transfer method used in cattle breeding, is wrong.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzorh-infertility",
      name: "Infertility and in vitro fertilisation",
      intuition:
        "Some couples cannot have a child even though they have unprotected sex. The cause may lie in either partner. Doctors can now help some of them by bringing the egg and the sperm together outside the body, in a dish, and placing the embryo back inside. These methods work, but they are costly, need experts and are found in only a few centres.",
      definition:
        "- **Infertile** couples are unable to produce children in spite of **unprotected sexual co-habitation**. A large number of couples all over the world, India included, are infertile.\n" +
        "- The reasons may be **physical, congenital diseases, drugs, immunological or even psychological**.\n" +
        "- In India the **female** is often blamed for the couple being childless, but more often than not the problem lies in the **male partner**.\n" +
        "- **Specialised health care units** (infertility clinics) help with diagnosis and treatment. Where no cure is possible, **assisted reproductive technologies (ART)** help the couple have children.\n" +
        "- **In vitro fertilisation (IVF)** is fertilisation **outside the body** in almost the same conditions as inside the body, followed by **embryo transfer (ET)**. It is popularly called the **test tube baby programme**.\n" +
        "- In IVF, **ova from the wife or a donor** and **sperms from the husband or a donor** are collected and made to form a **zygote** in the laboratory, under simulated conditions.\n\n" +
        "Limits of ART:\n" +
        "- They need **extremely high precision handling by specialised professionals** and **expensive instrumentation**, so they are available in **only very few centres** in the country, and only a **limited number of people** can afford them.\n" +
        "- **Emotional, religious and social factors** also hold people back from these methods.\n" +
        "- India has many orphaned and destitute children. Our laws permit **legal adoption**, which is one of the best methods for couples looking for parenthood.",
      table: {
        columns: ["Point", "NCERT fact"],
        rows: [
          { cells: ["Infertility", "Unable to produce children in spite of unprotected sexual co-habitation"] },
          { cells: ["Causes", "Physical, congenital diseases, drugs, immunological or psychological"] },
          { cells: ["Partner at fault", "Often blamed on the female, but more often the problem lies in the male"] },
          { cells: ["IVF", "Fertilisation outside the body, followed by embryo transfer (ET); the test tube baby programme"] },
          { cells: ["Gametes used in IVF", "Ova from the wife or a donor; sperms from the husband or a donor"] },
          {
            cells: ["Drawbacks of ART", "Needs specialised professionals and expensive instruments; only a few centres; affordable to few; emotional, religious and social barriers"],
            noteAmber: "NEET 2025: expensive instruments and reagents, fewer orphans adopted and an early embryo that may not survive were the drawbacks; a donor need not be the husband or wife, and IVF is available in India.",
            pyqExampleId: "024a9df2-b2ba-491b-8597-c4e816c161a3",
          },
          { cells: ["Alternative NCERT recommends", "Legal adoption of orphaned and destitute children"] },
        ],
      },
      pyqExampleId: "024a9df2-b2ba-491b-8597-c4e816c161a3",
      selfCheckExample: {
        prompt: "List the five kinds of reason NCERT gives for infertility.",
        steps: [
          "NCERT says the reasons for infertility could be many.",
          "It names them in one list.",
        ],
        answer: "Physical, congenital diseases, drugs, immunological or even psychological reasons.",
      },
      practiceSet: [
        { prompt: "What does IVF stand for, and what is it popularly called?", answer: "In vitro fertilisation; the test tube baby programme" },
        { prompt: "In IVF, whose ova and whose sperms can be used?", answer: "Ova from the wife or a donor female, and sperms from the husband or a donor male" },
        { prompt: "In India, which partner is often blamed for a couple being childless, and where does the problem more often lie?", answer: "The female is often blamed, but the problem more often lies with the male partner" },
        { prompt: "What does ET stand for in IVF-ET?", answer: "Embryo transfer" },
      ],
      traps: [
        {
          title: "Donors are allowed in IVF",
          body: "The ova may come from the **wife or a donor**, and the sperms from the **husband or a donor**. IVF does not need the husband and wife to be the donors.",
        },
        {
          title: "The male is often the infertile partner",
          body: "Infertility is often blamed on the female, but NCERT says **more often than not the problem lies in the male partner**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzorh-transfers",
      name: "ZIFT, IUT, GIFT, ICSI and artificial insemination",
      visualizationSlug: "neet-art-transfers",
      intuition:
        "Each method has a short name that tells you what is moved and where it goes. Z means a zygote, G means a gamete, IU means into the uterus, and IF means into the fallopian tube. Count the cells too: an embryo of up to 8 cells goes to the tube, and a bigger one goes to the uterus. Match the name to the thing moved and the place, and the question is done.",
      definition:
        "Transfers after fertilisation in the laboratory:\n" +
        "- **ZIFT** (zygote intra fallopian transfer): the **zygote or early embryo with up to 8 blastomeres** is transferred into the **fallopian tube**.\n" +
        "- **IUT** (intra uterine transfer): an **embryo with more than 8 blastomeres** is transferred into the **uterus**.\n" +
        "- Embryos formed by **in vivo fertilisation** (fusion of gametes inside the female) can also be used for such transfers, to help females who cannot conceive.\n\n" +
        "Other techniques:\n" +
        "- **GIFT** (gamete intra fallopian transfer): an **ovum collected from a donor** is transferred into the **fallopian tube of another female** who **cannot produce ova** but can provide a suitable environment for fertilisation and further development.\n" +
        "- **ICSI** (intra cytoplasmic sperm injection): a specialised method to form an embryo in the laboratory, in which a **sperm is directly injected into the ovum**.\n" +
        "- **Artificial insemination (AI):** used when the **male cannot inseminate** the female or has a **very low sperm count**. Semen from the **husband or a healthy donor** is put artificially into the **vagina** or into the **uterus**. Putting it into the uterus is **IUI (intra-uterine insemination)**.\n\n" +
        "MOET (multiple ovulation embryo transfer) in cattle:\n" +
        "- A cow is given hormones with **FSH-like activity** to cause follicular maturation and **super ovulation**: she gives **6 to 8 eggs** in a cycle instead of one.\n" +
        "- She is mated with an **elite bull** or **artificially inseminated**. The fertilised eggs at the **8 to 32 cell stage** are recovered without surgery and transferred to **surrogate mothers**. The genetic mother is ready for another round of super ovulation.",
      table: {
        columns: ["Method", "What is transferred", "Where it goes"],
        rows: [
          { cells: ["ZIFT", "Zygote or early embryo with up to 8 blastomeres", "Fallopian tube"] },
          { cells: ["IUT", "Embryo with more than 8 blastomeres", "Uterus"] },
          { cells: ["GIFT", "Ovum from a donor", "Fallopian tube of a female who cannot produce ova"] },
          {
            cells: ["ICSI", "A single sperm, injected directly into the ovum", "Into the ovum, in the laboratory"],
            noteAmber: "Re-NEET 2026: injecting a sperm directly into the ovum is ICSI.",
            pyqExampleId: "f768454e-54f0-4609-b692-ff56d1bd7a50",
          },
          { cells: ["AI", "Semen from the husband or a healthy donor", "Vagina or uterus"] },
          { cells: ["IUI", "Semen from the husband or a healthy donor", "Uterus"] },
          {
            cells: ["MOET (cattle)", "Embryos at the 8 to 32 cell stage, after FSH-like hormones give 6 to 8 eggs", "Surrogate mothers"],
            noteAmber: "NEET 2021: the false step was a hormone with LH-like activity; MOET uses FSH-like activity.",
            pyqExampleId: "91d59666-efdb-49ba-81db-950ae5df19f2",
          },
        ],
      },
      pyqExampleId: "e3bd14e9-be92-458f-b5d4-258da94f42b2",
      selfCheckExample: {
        prompt: "An embryo made in the laboratory has 16 blastomeres. Where should it be transferred, and what is the method called?",
        steps: [
          "Up to 8 blastomeres, an embryo goes into the fallopian tube (ZIFT).",
          "16 is more than 8, so it goes into the uterus.",
        ],
        answer: "Into the uterus, by intra uterine transfer (IUT).",
      },
      practiceSet: [
        { prompt: "In ZIFT, what is transferred and into which organ?", answer: "A zygote or an early embryo with up to 8 blastomeres, into the fallopian tube" },
        { prompt: "For which two causes of infertility is artificial insemination used?", answer: "When the male cannot inseminate the female, or when his sperm count is very low" },
        { prompt: "What is intra-uterine insemination (IUI)?", answer: "Artificial insemination in which the semen is put into the uterus" },
        { prompt: "In MOET, how many eggs does a super ovulated cow give in one cycle?", answer: "6 to 8 eggs" },
        { prompt: "In MOET, at what stage are the fertilised eggs transferred to surrogate mothers?", answer: "At the 8 to 32 cell stage" },
      ],
      traps: [
        {
          title: "8 blastomeres is the dividing line",
          body: "**Up to 8 blastomeres:** fallopian tube (**ZIFT**). **More than 8:** uterus (**IUT**). Swapping the two places is the usual false option.",
        },
        {
          title: "GIFT moves a gamete, not an embryo",
          body: "In **GIFT** an **ovum from a donor** goes into the **fallopian tube** of a female who cannot make ova. A zygote or an embryo transferred into the tube is **ZIFT**.",
        },
        {
          title: "MOET uses FSH-like hormones",
          body: "Super ovulation in MOET is caused by hormones with **FSH-like** activity, not LH-like, and the embryos are transferred at the **8 to 32 cell** stage.",
        },
      ],
    },
  ],
};
