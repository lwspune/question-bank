import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HR_GAMETOGENESIS_NOTE: SubtopicNote = {
  subtopicName: "Gametogenesis",
  title: "Gametogenesis",
  oneLineDefinition:
    "How sperms and ova are made: the cell divisions of spermatogenesis and oogenesis with their chromosome numbers, the hormones that drive them, and the parts of a sperm.",
  whyItMatters:
    "Nine NEET questions from 2022 to 2026, the most of any page in the chapter, and NEET 2022 alone asked three. They are statement questions: which line is true of spermatogenesis but not oogenesis, which division makes which cell, and which hormone acts on which cell.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohr-spermatogenesis",
      name: "Spermatogenesis",
      intuition:
        "A boy is born with sperm mother cells, but they wait. At puberty they start dividing and never stop. A few of them go through meiosis: one cell with 46 chromosomes gives four cells with 23. Those four round cells then change shape into swimming sperms, and the sperms are let go into the tubule.",
      definition:
        "- Spermatogenesis takes place in the testes and **begins at puberty**.\n" +
        "- The **spermatogonia** on the inner wall of the seminiferous tubules multiply by **mitosis**. Each is **diploid, with 46 chromosomes**.\n" +
        "- Some spermatogonia, the **primary spermatocytes**, periodically undergo **meiosis**.\n" +
        "- A primary spermatocyte completes the **first meiotic division (the reduction division)** and forms **two equal haploid secondary spermatocytes**, each with **23 chromosomes**.\n" +
        "- The secondary spermatocytes undergo the **second meiotic division** and form **four equal haploid spermatids**.\n" +
        "- **Spermiogenesis:** the spermatids are **transformed into spermatozoa (sperms)**. No division happens here; it is a change of shape.\n" +
        "- **Spermiation:** after spermiogenesis the sperm heads become embedded in the **Sertoli cells**, and the sperms are finally **released from the seminiferous tubules**.",
      table: {
        columns: ["Cell or step", "Chromosomes", "How it forms"],
        rows: [
          { cells: ["Spermatogonium", "46 (diploid)", "Multiplies by mitosis on the wall of the seminiferous tubule"] },
          { cells: ["Primary spermatocyte", "46 (diploid)", "A spermatogonium that enters meiosis"] },
          { cells: ["Secondary spermatocyte", "23 (haploid)", "First meiotic division of a primary spermatocyte; two equal cells"] },
          { cells: ["Spermatid", "23 (haploid)", "Second meiotic division; four equal cells from one primary spermatocyte"] },
          { cells: ["Spermatozoon (sperm)", "23 (haploid)", "Spermiogenesis: a spermatid changes into a sperm"] },
          {
            cells: ["Spermiation", "Not a cell", "Release of the sperms from the seminiferous tubules"],
            noteAmber: "NEET 2022: spermiation is the release of sperms; spermiogenesis is not the formation of sperms from spermatogonia.",
            pyqExampleId: "bfbd8fec-8195-4153-9539-2c34a6be2197",
          },
        ],
      },
      pyqExampleId: "63852c8e-842e-4fc2-ae00-ea176f69ff9b",
      selfCheckExample: {
        prompt: "How many spermatids are formed from 10 primary spermatocytes, and how many chromosomes does each spermatid have?",
        steps: [
          "One primary spermatocyte gives two secondary spermatocytes after meiosis I.",
          "Each secondary spermatocyte gives two spermatids after meiosis II, so one primary spermatocyte gives four spermatids.",
          "Ten primary spermatocytes give \\(10 \\times 4 = 40\\) spermatids, each haploid with 23 chromosomes.",
        ],
        answer: "40 spermatids, each with 23 chromosomes.",
      },
      practiceSet: [
        { prompt: "What is the release of sperms from the seminiferous tubules called?", answer: "Spermiation" },
        { prompt: "How many chromosomes does a human secondary spermatocyte have?", answer: "23 (it is haploid)" },
        { prompt: "By which kind of cell division do spermatogonia multiply?", answer: "Mitosis" },
        { prompt: "At what stage of life does spermatogenesis begin in a human male?", answer: "At puberty" },
        { prompt: "In which cells do the sperm heads become embedded before the sperms are released?", answer: "The Sertoli cells" },
      ],
      traps: [
        {
          title: "Spermiogenesis and spermiation are different steps",
          body: "**Spermiogenesis** changes a spermatid into a sperm. **Spermiation** releases the sperms from the seminiferous tubules. Neither one is the whole process from spermatogonia to sperm: that is **spermatogenesis**.",
        },
        {
          title: "Primary spermatocytes divide by meiosis",
          body: "Spermatogonia multiply by **mitosis**, but a **primary spermatocyte** undergoes the **first meiotic division** to give secondary spermatocytes. A statement that primary spermatocytes divide mitotically is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-hormones",
      name: "Hormones that control spermatogenesis",
      intuition:
        "The brain gives the first signal, the pituitary passes it on, and the testis does the work. GnRH from the hypothalamus tells the anterior pituitary to release two hormones. Each of those two goes to a different cell in the testis, and that pairing is what NEET tests.",
      definition:
        "- Spermatogenesis starts at puberty because the secretion of **gonadotropin releasing hormone (GnRH)** from the hypothalamus rises sharply.\n" +
        "- GnRH acts on the **anterior pituitary** and makes it secrete two gonadotropins: **luteinising hormone (LH)** and **follicle stimulating hormone (FSH)**.\n" +
        "- **LH acts on the Leydig cells** and makes them synthesise and secrete **androgens**. The androgens in turn stimulate spermatogenesis.\n" +
        "- **FSH acts on the Sertoli cells** and makes them secrete some factors that help in **spermiogenesis**.\n" +
        "- In the female, the same two gonadotropins act on the ovary: they stimulate the growth of the **ovarian follicles**, and the growing follicles secrete **estrogens**.",
      table: {
        columns: ["Hormone", "Made by", "Acts on, and the effect"],
        rows: [
          { cells: ["GnRH", "Hypothalamus", "Anterior pituitary: makes it secrete LH and FSH"] },
          { cells: ["LH", "Anterior pituitary", "Leydig cells: secretion of androgens"] },
          {
            cells: ["FSH", "Anterior pituitary", "Sertoli cells: factors that help spermiogenesis"],
            noteAmber: "NEET 2024: a flow chart of this control had FSH, Leydig cells, Sertoli cells and spermiogenesis as its four blanks.",
          },
          { cells: ["Androgens", "Leydig cells", "Stimulate spermatogenesis and keep the male accessory ducts and glands working"] },
          { cells: ["Estrogens", "Growing ovarian follicles", "Made in the follicular phase under LH and FSH"] },
        ],
      },
      pyqExampleId: "b06c6265-2866-4b82-8069-a2b0967d07da",
      selfCheckExample: {
        prompt: "Which hormone makes the anterior pituitary release LH and FSH, and where is it made?",
        steps: [
          "The signal for the pituitary comes from the hypothalamus.",
          "That hormone is gonadotropin releasing hormone, GnRH.",
        ],
        answer: "GnRH, made by the hypothalamus.",
      },
      practiceSet: [
        { prompt: "Which hormone stimulates the Sertoli cells, and which process do the factors they secrete help?", answer: "FSH; spermiogenesis" },
        { prompt: "Which part of the pituitary secretes LH and FSH?", answer: "The anterior pituitary" },
        { prompt: "What do androgens from the Leydig cells stimulate in the testis?", answer: "Spermatogenesis" },
        { prompt: "Why does spermatogenesis start only at puberty?", answer: "Because the secretion of GnRH rises sharply at puberty" },
      ],
      traps: [
        {
          title: "FSH goes to the Sertoli cells, LH to the Leydig cells",
          body: "In the male, **LH acts on the Leydig cells** (androgens) and **FSH acts on the Sertoli cells** (spermiogenesis). Pairing FSH with the Leydig cells is the false half of the NEET 2024 assertion.",
        },
        {
          title: "GnRH does not act on the posterior pituitary",
          body: "GnRH acts on the **anterior pituitary** to release **LH and FSH**. Oxytocin is a posterior pituitary hormone and is not under GnRH.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-sperm",
      name: "Structure of a sperm",
      intuition:
        "A sperm is built for one job: to swim to the ovum and get its nucleus inside. So it carries only what it needs: the genes in the head, an enzyme cap to get in, a power pack of mitochondria, and a tail to swim.",
      definition:
        "- A sperm is a microscopic cell with a **head, neck, middle piece and tail**, all enveloped by a **plasma membrane**.\n" +
        "- The **head** holds an **elongated haploid nucleus**. Its front is covered by a cap-like **acrosome**, filled with **enzymes** that help the sperm fertilise the ovum.\n" +
        "- The **middle piece** has **numerous mitochondria**, which make the **energy** for the movement of the tail.\n" +
        "- The **tail** moves the sperm: **sperm motility** is by this flagellum and is essential for fertilisation.\n" +
        "- A human male ejaculates about **200 to 300 million sperms** during coitus. For normal fertility, **at least 60 per cent** must have a normal shape and size, and **at least 40 per cent** must show vigorous motility.\n" +
        "- The secretions of the **epididymis, vas deferens, seminal vesicle and prostate** are essential for the maturation and motility of sperms. **Seminal plasma together with the sperms is semen.**",
      table: {
        columns: ["Part", "What it holds", "Job"],
        rows: [
          { cells: ["Head", "Elongated haploid nucleus", "Carries the genetic material"] },
          { cells: ["Acrosome", "Cap over the front of the head, filled with enzymes", "Helps the sperm enter the ovum"] },
          { cells: ["Middle piece", "Numerous mitochondria", "Energy for the tail"] },
          {
            cells: ["Tail", "A flagellum", "Sperm motility"],
            noteAmber: "Re-NEET 2026: sperm motility is due to flagellar movement.",
            pyqExampleId: "0402c5e2-6093-40a7-b0bc-c0d817bc7a1a",
          },
        ],
      },
      pyqExampleId: "778faf0c-19d6-47f3-8563-dc70360cb208",
      selfCheckExample: {
        prompt: "A semen sample has 250 million sperms. For normal fertility, at least how many must be of normal shape and size, and at least how many must show vigorous motility?",
        steps: [
          "NCERT gives at least 60 per cent normal in shape and size: 60 per cent of 250 million is 150 million.",
          "At least 40 per cent must show vigorous motility: 40 per cent of 250 million is 100 million.",
        ],
        answer: "At least 150 million normal in shape and size, and at least 100 million vigorously motile.",
      },
      practiceSet: [
        { prompt: "Name the four parts of a human sperm from front to back.", answer: "Head, neck, middle piece and tail" },
        { prompt: "About how many sperms does a human male release in one ejaculation?", answer: "About 200 to 300 million" },
        { prompt: "What does semen consist of?", answer: "Seminal plasma together with the sperms" },
        { prompt: "Which ducts and glands produce secretions essential for the maturation and motility of sperms?", answer: "The epididymis, vas deferens, seminal vesicle and prostate" },
      ],
      traps: [
        {
          title: "Energy is in the middle piece, enzymes in the acrosome",
          body: "The **mitochondria** that power the tail are in the **middle piece**. The **acrosome** on the head holds the **enzymes** for entering the ovum.",
        },
        {
          title: "Sperms swim by a flagellum",
          body: "Sperm motility is **flagellar movement** of the tail, not ciliary, amoeboid or muscular movement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-oogenesis",
      name: "Oogenesis and how it differs from spermatogenesis",
      visualizationSlug: "neet-gametogenesis",
      intuition:
        "A girl's egg mother cells are all made before she is born, and their first meiosis starts then and stops halfway. Years later, one at a time, a cell finishes that first division just before it is released, and it finishes the second division only if a sperm enters. Each division is unequal: one big cell keeps the food, and a tiny polar body is thrown away.",
      definition:
        "- Oogenesis **starts during embryonic development**: a couple of million **oogonia** form in each foetal ovary. **No more oogonia are formed or added after birth.**\n" +
        "- The oogonia enter **prophase I of meiosis** and are **arrested** there: these are the **primary oocytes**.\n" +
        "- A primary oocyte surrounded by a layer of **granulosa cells** is a **primary follicle**. Many follicles degenerate between birth and puberty, so **at puberty only 60,000 to 80,000 primary follicles are left in each ovary**.\n" +
        "- Follicle stages: **primary follicle**, then **secondary follicle** (more granulosa layers and a new **theca**), then **tertiary follicle** (a fluid-filled cavity, the **antrum**; theca interna and theca externa), then the mature **Graafian follicle**.\n" +
        "- In the tertiary follicle the primary oocyte **completes meiosis I**. The division is **unequal**: a large haploid **secondary oocyte**, which keeps most of the nutrient-rich cytoplasm, and a tiny **first polar body**.\n" +
        "- The secondary oocyte forms a new membrane, the **zona pellucida**, around itself, and the Graafian follicle ruptures to release it (**ovulation**).\n" +
        "- **Meiosis II is completed only when a sperm enters.** It is also unequal and gives the haploid **ovum (ootid)** and a **second polar body**.\n" +
        "- So the female's reduction division starts long before the male's (in the foetus, not at puberty), and the gap between her two meiotic divisions is much longer than in the male, where meiosis II follows meiosis I directly.",
      table: {
        columns: ["Feature", "Spermatogenesis", "Oogenesis"],
        rows: [
          {
            cells: ["When it starts", "At puberty", "In the embryo (foetal ovary)"],
            noteAmber: "NEET 2025: the reductive division of female gametogenesis starts earlier than the male's, and the gap between meiosis I and II is much shorter in males.",
            pyqExampleId: "ebfe959f-575b-464c-8dbb-4f3135b15b18",
          },
          {
            cells: ["Stem cell supply", "Meiosis goes on continuously in a mitotically dividing stem cell population", "No new oogonia after birth"],
            noteAmber: "NEET 2022: differentiation after meiosis, continuous meiosis in dividing stem cells and a start at puberty hold for spermatogenesis only.",
            pyqExampleId: "5d5701d7-b2a1-4fe0-bf8a-9b220f439682",
          },
          { cells: ["Meiosis I", "Equal: two secondary spermatocytes", "Unequal: one secondary oocyte and the first polar body"] },
          { cells: ["Meiosis II", "Equal: four spermatids in all; follows meiosis I directly", "Unequal: ovum and second polar body; completed only after a sperm enters"] },
          { cells: ["Gametes from one meiocyte", "Four sperms", "One ovum (plus polar bodies)"] },
          { cells: ["After meiosis", "Spermatids change into sperms (spermiogenesis)", "No such change of shape"] },
          { cells: ["Hormonal control", "LH and FSH from the anterior pituitary", "LH and FSH from the anterior pituitary"] },
        ],
      },
      pyqExampleId: "22ea1b86-3a77-4552-8cb6-8ae280804c7c",
      selfCheckExample: {
        prompt: "In the ovary, at which stage does the primary oocyte complete its first meiotic division, and what two cells does it form?",
        steps: [
          "The primary oocyte stays arrested in prophase I through the primary and secondary follicle stages.",
          "It completes meiosis I inside the tertiary follicle.",
          "The division is unequal, giving a large secondary oocyte and a tiny first polar body.",
        ],
        answer: "In the tertiary follicle; a secondary oocyte and the first polar body.",
      },
      practiceSet: [
        { prompt: "About how many primary follicles are left in each human ovary at puberty?", answer: "60,000 to 80,000" },
        { prompt: "What is the fluid-filled cavity of a tertiary follicle called?", answer: "The antrum" },
        { prompt: "When does a human secondary oocyte complete its second meiotic division?", answer: "Only after a sperm enters it" },
        { prompt: "Which membrane does the secondary oocyte form around itself in the Graafian follicle?", answer: "The zona pellucida" },
        { prompt: "With the formation of which cell is the first polar body produced?", answer: "The secondary oocyte (at the end of meiosis I)" },
      ],
      traps: [
        {
          title: "The first polar body comes with the secondary oocyte",
          body: "The first polar body is made when the **primary oocyte divides** into the **secondary oocyte**. The primary oocyte itself forms from an oogonium, with no polar body.",
        },
        {
          title: "Both gametogeneses are under LH and FSH",
          body: "Making **haploid gametes** and control by **LH and FSH** are true of **both** spermatogenesis and oogenesis. What sets spermatogenesis apart is its start at puberty, continuous meiosis from a dividing stem cell pool and the change of spermatids into sperms.",
        },
        {
          title: "No oogonia are added after birth",
          body: "A woman's oogonia are all formed in the **foetal ovary**. Their number only falls after birth, to **60,000 to 80,000** primary follicles per ovary at puberty.",
        },
      ],
    },
  ],
};
