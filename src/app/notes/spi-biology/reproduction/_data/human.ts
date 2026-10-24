import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_RP_HUMAN_NOTE: SubtopicNote = {
  subtopicName: "Human Reproduction",
  title: "Human Reproduction",
  oneLineDefinition:
    "The testes make sperms and testosterone, the ovaries make eggs and oestrogen, and fertilisation in the oviduct starts a new life that grows in the uterus.",
  whyItMatters:
    "Four questions in the bank: two EASY (the hormones behind puberty, the kind of method a condom is) and two HARD figure questions (the glands of the male system, the follicles of the ovary). The HARD ones need only one more fact each: the glands' fluid protects sperms, and the growing follicle's hormone thickens the lining of the uterus.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spirphu-organs",
      name: "Reproductive organs and sex hormones",
      intuition:
        "Each sex has a pair of glands that make both the gametes and a hormone. The hormone is what changes the body at puberty. " +
        "The other organs are tubes and glands that carry, feed and protect the gametes.",
      definition:
        "- **Testes**: make **sperms** and **testosterone**. They sit outside the body in the scrotum, which is cooler.\n" +
        "- **Vas deferens**: carries sperms to the urethra. **Seminal vesicles and prostate**: add fluid that nourishes the sperms; it is **alkaline**, so it **neutralises any acid left from urine** and fewer sperms are damaged.\n" +
        "- **Ovaries**: make **eggs (ova)** and **oestrogen**; one egg is released about once a month (ovulation).\n" +
        "- **Oviduct (fallopian tube)**: the egg meets the sperm here; **fertilisation** happens in the oviduct.\n" +
        "- **Uterus**: the embryo grows here. Each month its lining (**endometrium**) thickens, made to grow by **oestrogen** from the growing follicle; if no egg is fertilised, the lining breaks down and comes out as **menstruation**.\n" +
        "- After ovulation, the empty follicle becomes the **corpus luteum**, which makes **progesterone** to keep the lining ready.",
      table: {
        columns: ["Organ", "Makes", "Hormone"],
        rows: [
          {
            cells: ["Testes (male)", "Sperms", "Testosterone"],
            noteAmber: "Testosterone from the testes, oestrogen from the ovaries: never the other way.",
          },
          { cells: ["Seminal vesicles and prostate", "Alkaline fluid that carries and protects sperms", "None"] },
          { cells: ["Ovaries (female)", "Eggs", "Oestrogen (from the growing follicle)"] },
          { cells: ["Corpus luteum (in the ovary, after ovulation)", "Nothing new; it is the empty follicle", "Progesterone"] },
        ],
        caption: "Oestrogen thickens the uterine lining; progesterone keeps it ready for an embryo.",
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) ovary: eggs (b) testes: sperms (c) uterus: where fertilisation happens (d) oviduct: carries the egg",
        steps: [
          "Ovaries make eggs, testes make sperms and the oviduct carries the egg: all right.",
          "Fertilisation happens in the oviduct. The uterus is where the embryo grows.",
        ],
        answer: "(c) is wrong: fertilisation happens in the oviduct.",
      },
      practiceSet: [
        { prompt: "Where in the female body does fertilisation take place?", answer: "In the oviduct (fallopian tube)" },
        { prompt: "Which tube carries sperms from the testes towards the urethra?", answer: "The vas deferens" },
        { prompt: "Why are the testes outside the body, in the scrotum?", answer: "Sperms need a temperature a little lower than the body's" },
        { prompt: "Which hormone does the corpus luteum make?", answer: "Progesterone" },
        { prompt: "What is the breakdown and flow of the uterine lining each month called?", answer: "Menstruation" },
      ],
      pyqExampleId: "131cd62b-23b9-46c6-89c1-77cfa8fccd00",
      traps: [
        {
          title: "Swapping the sex hormones",
          body: "Testosterone is made by the testes and oestrogen by the ovaries. An option that puts oestrogen in the testes, or names the thyroid or pituitary as the source, is wrong.",
        },
        {
          title: "Fertilisation in the uterus",
          body: "The egg is fertilised in the oviduct. The zygote then moves down and settles (implants) in the wall of the uterus.",
        },
        {
          title: "Giving the corpus luteum oestrogen's job",
          body: "The growing follicle's oestrogen makes the uterine lining grow. The corpus luteum, formed after ovulation, makes progesterone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spirphu-contraception",
      name: "Methods of contraception",
      intuition:
        "Contraception stops a pregnancy. Each method works in one of four ways: a physical barrier, a chemical, a change in hormones, or a small operation. The question names a method and asks for its kind.",
      definition:
        "- **Mechanical (barrier)**: **condom**, diaphragm. A physical cover stops sperms from reaching the egg. A condom also protects against sexually transmitted diseases.\n" +
        "- **Chemical**: spermicidal creams and jellies that kill sperms.\n" +
        "- **Hormonal**: **oral pills** that change hormone balance so no egg is released.\n" +
        "- **Intrauterine device**: the **Copper-T**, placed in the uterus.\n" +
        "- **Surgical**: **vasectomy** (the vas deferens is cut and tied in men) and **tubectomy** (the oviducts are cut and tied in women).",
      table: {
        columns: ["Method", "Kind", "How it works"],
        rows: [
          {
            cells: ["Condom", "Mechanical (barrier)", "Stops sperms reaching the egg"],
            noteAmber: "The only method here that also guards against sexually transmitted diseases.",
          },
          { cells: ["Spermicidal cream", "Chemical", "Kills sperms"] },
          { cells: ["Oral pill", "Hormonal", "Stops the release of eggs"] },
          { cells: ["Copper-T", "Intrauterine device", "Placed in the uterus"] },
          { cells: ["Vasectomy", "Surgical (men)", "Vas deferens cut and tied"] },
          { cells: ["Tubectomy", "Surgical (women)", "Oviducts cut and tied"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) oral pill: hormonal (b) vasectomy: surgical (c) spermicidal cream: mechanical (d) tubectomy: surgical",
        steps: ["Pills are hormonal; vasectomy and tubectomy are surgical.", "A spermicidal cream kills sperms with a chemical, so it is a chemical method."],
        answer: "(c) is wrong: a spermicidal cream is a chemical method.",
      },
      practiceSet: [
        { prompt: "Which method of contraception cuts and ties the vas deferens?", answer: "Vasectomy" },
        { prompt: "Oral pills are which kind of contraceptive method?", answer: "Hormonal" },
        { prompt: "What is the Copper-T?", answer: "An intrauterine device, placed in the uterus" },
      ],
      pyqExampleId: "17e1a5ee-0ea2-4a0e-b171-994951fadf25",
      traps: [
        {
          title: "Vasectomy and tubectomy swapped",
          body: "Vasectomy is done in men (the vas deferens); tubectomy is done in women (the oviducts, also called fallopian tubes).",
        },
      ],
    },
  ],
};
