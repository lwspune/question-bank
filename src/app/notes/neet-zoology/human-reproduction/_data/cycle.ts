import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HR_CYCLE_NOTE: SubtopicNote = {
  subtopicName: "Menstrual Cycle and Fertilisation",
  title: "Menstrual Cycle and Fertilisation",
  oneLineDefinition:
    "The phases of the menstrual cycle with their days and hormones, the words menarche, menopause and oestrus cycle, and how a sperm fertilises the ovum and the embryo implants.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. The covering of the ovum, the zona pellucida, came up three times (NEET 2021, NEET 2026 and Re-NEET 2026), and the LH surge that causes ovulation twice (Re-NEET 2024 and Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohr-cycle-phases",
      name: "Phases of the menstrual cycle",
      visualizationSlug: "neet-menstrual-cycle",
      intuition:
        "Each month the body gets ready for a baby. The ovary ripens one follicle while the uterus rebuilds its lining. In the middle of the month a burst of LH bursts the follicle and the egg is released. What is left of the follicle becomes the corpus luteum and keeps the lining ready with progesterone. If no baby comes, the corpus luteum dies, the lining breaks down, and that bleeding starts the next cycle.",
      definition:
        "- A human menstrual cycle lasts on average about **28 or 29 days**, from one menstruation to the next, and **one ovum is released in the middle** of each cycle.\n" +
        "- **Menstrual phase:** the menstrual flow lasts **3 to 5 days**. It comes from the **breakdown of the endometrial lining** of the uterus and its blood vessels. Menstruation happens **only if the released ovum is not fertilised**.\n" +
        "- **Follicular phase (proliferative phase):** primary follicles grow into a mature **Graafian follicle**, and the **endometrium regenerates** by proliferation. **LH and FSH** rise gradually and make the growing follicles secrete **estrogens**.\n" +
        "- **Ovulation:** **LH and FSH both peak in the middle of the cycle (about day 14)**. The rapid secretion of LH to its maximum, the **LH surge**, **ruptures the Graafian follicle** and releases the ovum.\n" +
        "- **Luteal phase (secretory phase):** the remaining parts of the Graafian follicle become the **corpus luteum**, which secretes **large amounts of progesterone**. Progesterone **maintains the endometrium**, which is needed for **implantation** and the other events of pregnancy.\n" +
        "- **If fertilisation happens,** all the events of the cycle stop and there is **no menstruation** during pregnancy.\n" +
        "- **If there is no fertilisation,** the **corpus luteum degenerates**. This causes the **disintegration of the endometrium**, which is menstruation, and a new cycle begins.",
      table: {
        columns: ["Phase", "Days in a 28-day cycle", "What happens"],
        rows: [
          { cells: ["Menstrual", "Days 1 to 5", "Endometrium and its blood vessels break down; flow lasts 3 to 5 days"] },
          { cells: ["Follicular (proliferative)", "Days 6 to 13", "Graafian follicle matures; endometrium regenerates; follicles secrete estrogens"] },
          { cells: ["Ovulatory", "About day 14", "LH surge ruptures the Graafian follicle and releases the ovum"] },
          {
            cells: ["Luteal (secretory)", "Days 15 to 28", "Corpus luteum secretes large amounts of progesterone, which maintains the endometrium"],
            noteAmber: "Re-NEET 2026: the corpus luteum secretes large amounts of progesterone, not estrogen.",
            pyqExampleId: "583dc62e-99d2-4760-a5a0-bbb6a70f816f",
          },
          {
            cells: ["End of the cycle without fertilisation", "Around day 28", "Corpus luteum degenerates, the endometrium disintegrates, menstruation begins"],
            noteAmber: "NEET 2023: the endometrium is needed for implantation, and the corpus luteum degenerating without fertilisation breaks it down; both true, but the second does not explain the first.",
            pyqExampleId: "0d9747fd-0df3-441c-bdf2-b7b0fc1da98c",
          },
        ],
      },
      pyqExampleId: "8ee61768-e266-44d4-8b3a-0010c2a83e90",
      selfCheckExample: {
        prompt: "In a cycle where the ovum is not fertilised, explain why menstruation follows a few days after the luteal phase.",
        steps: [
          "In the luteal phase the corpus luteum secretes progesterone, which keeps the endometrium in place.",
          "Without fertilisation the corpus luteum degenerates, so the progesterone level falls.",
          "Without progesterone the endometrium disintegrates, and its breakdown with its blood vessels is the menstrual flow.",
        ],
        answer: "The corpus luteum degenerates, progesterone falls, and the endometrium breaks down as menstruation.",
      },
      practiceSet: [
        { prompt: "How long does the menstrual flow usually last?", answer: "3 to 5 days" },
        { prompt: "Which hormone does the corpus luteum secrete in large amounts, and what does it maintain?", answer: "Progesterone; the endometrium" },
        { prompt: "What happens to the endometrium during the follicular phase?", answer: "It regenerates through proliferation" },
        { prompt: "What do the growing ovarian follicles secrete during the follicular phase?", answer: "Estrogens" },
        { prompt: "Why is there no menstruation during pregnancy?", answer: "All the events of the menstrual cycle stop during pregnancy" },
      ],
      traps: [
        {
          title: "The corpus luteum makes progesterone",
          body: "The corpus luteum secretes **large amounts of progesterone**. Estrogens come mainly from the **growing follicles** of the follicular phase.",
        },
        {
          title: "The LH surge causes ovulation, not menstruation",
          body: "The mid-cycle **LH surge ruptures the Graafian follicle** (ovulation). Menstruation follows the **fall of progesterone** when the corpus luteum degenerates.",
        },
        {
          title: "Menstruation breaks down the endometrium, not the myometrium",
          body: "Only the inner **endometrium** breaks down in menstruation and regenerates in the follicular phase. The muscular **myometrium** stays.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-cycle-terms",
      name: "Menarche, menopause and the oestrus cycle",
      intuition:
        "The cycle has a start and an end in a woman's life, and each has its own name. NEET likes to swap the two names, so tie each to its meaning: menarche is the first, menopause is when it stops.",
      definition:
        "- The reproductive cycle of female **primates** (monkeys, apes and human beings) is the **menstrual cycle**.\n" +
        "- In **non-primate mammals** such as cows, sheep, rats and dogs, the cyclical changes during reproduction are called the **oestrus cycle**.\n" +
        "- **Menarche:** the **first menstruation**, which begins at **puberty**.\n" +
        "- **Menopause:** menstrual cycles **stop around 50 years** of age.\n" +
        "- Cyclic menstruation is a sign of the normal reproductive phase and **extends between menarche and menopause**.\n" +
        "- **Lack of menstruation may indicate pregnancy.** It may also come from other causes such as stress or poor health.",
      table: {
        columns: ["Term", "Meaning", "Note"],
        rows: [
          { cells: ["Menstrual cycle", "Reproductive cycle of female primates", "Monkeys, apes and human beings"] },
          { cells: ["Oestrus cycle", "Cyclical reproductive changes in non-primate mammals", "Cows, sheep, rats, dogs"] },
          {
            cells: ["Menarche", "The first menstruation", "Begins at puberty"],
            noteAmber: "NEET 2025: the first menstruation is called menarche.",
            pyqExampleId: "59d31bd4-bcda-460a-889b-8e9507ebd0d3",
          },
          { cells: ["Menopause", "Menstrual cycles stop", "Around 50 years of age"] },
          { cells: ["Missed menstruation", "May indicate pregnancy", "Also caused by stress or poor health"] },
        ],
      },
      pyqExampleId: "421ea4bd-e9e7-4482-bc04-429f3306735b",
      selfCheckExample: {
        prompt: "A woman had her first period at 12 and her cycles stopped at 50. Name the two events, and say over what span of her life cyclic menstruation runs.",
        steps: [
          "The first menstruation, at puberty, is menarche.",
          "The stopping of menstrual cycles, around 50 years of age, is menopause.",
          "Cyclic menstruation marks the normal reproductive phase, which runs between the two.",
        ],
        answer: "Menarche at 12 and menopause at 50; cyclic menstruation runs between menarche and menopause.",
      },
      practiceSet: [
        { prompt: "Around what age do human menstrual cycles stop?", answer: "Around 50 years" },
        { prompt: "In which group of animals is the female reproductive cycle called the menstrual cycle?", answer: "Primates: monkeys, apes and human beings" },
        { prompt: "Apart from pregnancy, name two causes NCERT gives for lack of menstruation.", answer: "Stress and poor health" },
        { prompt: "What is the average length of a human menstrual cycle?", answer: "About 28 or 29 days" },
      ],
      traps: [
        {
          title: "Menarche is the start, menopause the end",
          body: "The first menstruation at puberty is **menarche**. **Menopause** is when the cycles stop, around 50 years. A statement calling the first cycle menopause is false.",
        },
        {
          title: "Cows have an oestrus cycle",
          body: "The **menstrual cycle** belongs to **primates**. Non-primate mammals such as cows, sheep, rats and dogs have an **oestrus cycle**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-fertilisation",
      name: "Fertilisation and implantation",
      intuition:
        "The sperm and the ovum must reach the same spot in the oviduct at the same time. The first sperm to touch the egg's coat changes it so that no other sperm can get in. The fused cell then divides again and again as it slides down to the uterus, becomes a hollow ball, and sinks into the uterine lining.",
      definition:
        "Fertilisation:\n" +
        "- Semen is released into the vagina (**insemination**). Motile sperms pass through the cervix and uterus and reach the **ampullary-isthmic junction** of the oviduct, where the ovum also arrives. **Fertilisation happens there**, and only if the ovum and sperms reach it at the same time.\n" +
        "- From outside to inside, the released ovum (secondary oocyte) is covered by the **corona radiata**, the **zona pellucida**, the **perivitelline space** and its own **plasma membrane**.\n" +
        "- The sperm contacts the **zona pellucida** and induces changes in the membrane that **block the entry of more sperms**, so only one sperm fertilises an ovum.\n" +
        "- **Acrosome secretions** help the sperm enter the cytoplasm through the zona pellucida and the plasma membrane. This makes the secondary oocyte **complete meiosis II**, giving the haploid **ovum (ootid)** and the **second polar body**. The haploid nuclei of the sperm and the ovum fuse to form the **diploid zygote**.\n\n" +
        "Sex of the baby:\n" +
        "- A woman is XX and a man is XY. **Every ovum carries an X**, while **50 per cent of sperms carry X and 50 per cent carry Y**. An X sperm gives a girl (XX) and a Y sperm a boy (XY), so **the sex of the baby is decided by the father**.\n\n" +
        "Cleavage and implantation:\n" +
        "- As the zygote moves through the isthmus towards the uterus it divides by **mitosis (cleavage)** into 2, 4, 8, 16 cells called **blastomeres**. An embryo of **8 to 16 blastomeres is a morula**.\n" +
        "- The morula becomes the **blastocyst**: an outer layer, the **trophoblast**, and an **inner cell mass**. The trophoblast attaches to the **endometrium**, and the inner cell mass becomes the **embryo**.\n" +
        "- The uterine cells then divide rapidly and cover the blastocyst, which becomes embedded in the endometrium: this is **implantation**, and it leads to pregnancy.",
      table: {
        columns: ["Event or layer", "Where or what", "Key fact"],
        rows: [
          { cells: ["Corona radiata", "Outermost layer around the released ovum", "Cells around the zona pellucida"] },
          {
            cells: ["Zona pellucida", "Membrane formed by the secondary oocyte, just inside the corona radiata", "The sperm binds here; changes in it block more sperms"],
            noteAmber: "NEET 2021: the receptors for sperm binding in mammals are on the zona pellucida.",
            pyqExampleId: "c9196663-79b7-45e5-8251-f95137fb51e3",
          },
          { cells: ["Perivitelline space", "Gap between the zona pellucida and the plasma membrane", "Lies just outside the ovum's plasma membrane"] },
          { cells: ["Fertilisation", "Ampullary-isthmic junction of the oviduct", "Completes meiosis II and gives the second polar body"] },
          { cells: ["Morula", "Embryo of 8 to 16 blastomeres", "Formed by cleavage on the way to the uterus"] },
          { cells: ["Blastocyst", "Trophoblast outside, inner cell mass inside", "Trophoblast attaches; inner cell mass becomes the embryo"] },
          { cells: ["Implantation", "Blastocyst embedded in the endometrium", "Leads to pregnancy"] },
        ],
      },
      pyqExampleId: "8cf31bbb-219a-40a0-b8df-fc46d9c47458",
      selfCheckExample: {
        prompt: "An ovum is fertilised by a sperm carrying a Y chromosome. What will be the sex of the baby, and which parent decided it?",
        steps: [
          "Every ovum carries an X chromosome.",
          "The sperm adds a Y, so the zygote is XY.",
          "XY is male, and since only the sperm can carry a Y, the father decides the sex.",
        ],
        answer: "A boy (XY); the sex is decided by the father.",
      },
      practiceSet: [
        { prompt: "At which part of the oviduct does fertilisation take place in humans?", answer: "The ampullary-isthmic junction" },
        { prompt: "What is an embryo with 8 to 16 blastomeres called?", answer: "A morula" },
        { prompt: "Which part of the blastocyst attaches to the endometrium, and which part becomes the embryo?", answer: "The trophoblast attaches; the inner cell mass becomes the embryo" },
        { prompt: "What does the entry of a sperm make the secondary oocyte complete?", answer: "Its second meiotic division, giving the ovum and the second polar body" },
        { prompt: "What percentage of human sperms carry a Y chromosome?", answer: "50 per cent" },
      ],
      traps: [
        {
          title: "Fertilisation is in the oviduct, not the uterus",
          body: "The sperm meets the ovum at the **ampullary-isthmic junction** of the fallopian tube. The uterus is where the **blastocyst implants**.",
        },
        {
          title: "The corona radiata is outside the zona pellucida",
          body: "From outside in: **corona radiata, zona pellucida, perivitelline space, plasma membrane**. The perivitelline space lies inside the zona pellucida, not outside it.",
        },
        {
          title: "Zona radiata is not an ovum covering",
          body: "The membrane the secondary oocyte forms is the **zona pellucida**. The cell layer outside it is the **corona radiata**. Mixing the two names into zona radiata gives a wrong option.",
        },
      ],
    },
  ],
};
