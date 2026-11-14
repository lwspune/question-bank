import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_SR_FERTILISATION_NOTE: SubtopicNote = {
  subtopicName: "Fertilisation, Seed and Fruit",
  title: "Fertilisation, Seed and Fruit",
  oneLineDefinition:
    "Double fertilisation and the ploidy of every cell it makes, then the endosperm, the embryo and the seed, and the fruit the ovary becomes, true, false or parthenocarpic.",
  whyItMatters:
    "Seven NEET questions, all MODERATE, from six of the eight papers. Ploidy was asked three times (NEET 2023, NEET 2026 and Re-NEET 2026), and the thalamus of a false fruit twice, as a labelled figure in NEET 2022 and Re-NEET 2024. NEET 2025 and Re-NEET 2026 both asked which seeds keep no endosperm.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbosr-double-fertilisation",
      name: "Double fertilisation and endosperm",
      intuition:
        "A pollen tube brings two male gametes into the embryo sac, and both are used. One fuses with the egg and makes the diploid zygote. The other fuses with the two polar nuclei and makes a triploid cell that grows into the endosperm, the food store. Most ploidy questions are just counting the sets of chromosomes that went into each fusion.",
      definition:
        "Double fertilisation in NCERT:\n" +
        "- The pollen tube enters **one of the synergids** through the **filiform apparatus** and releases **two male gametes** into it.\n" +
        "- **Syngamy**: one male gamete fuses with the **egg** nucleus, forming the **diploid zygote**.\n" +
        "- **Triple fusion**: the other male gamete fuses with the **two polar nuclei** in the central cell, forming the **triploid primary endosperm nucleus (PEN)**. Three haploid nuclei take part, hence the name.\n" +
        "- Two kinds of fusion happen in one embryo sac, so this is **double fertilisation**.\n" +
        "- After triple fusion the central cell becomes the **primary endosperm cell (PEC)**, which grows into the **endosperm**. The zygote grows into the **embryo**.\n" +
        "- **Endosperm development comes before embryo development.** The PEC divides again and again to form **triploid** endosperm tissue.\n" +
        "- In the most common type the PEN first divides many times without walls (**free-nuclear endosperm**); walls form later and it becomes **cellular**. In a tender coconut the **coconut water** is free-nuclear endosperm with thousands of nuclei, and the **white kernel** around it is cellular endosperm.\n" +
        "- The endosperm may be **used up** by the embryo before the seed matures (pea, groundnut, beans) or may **persist** in the mature seed (castor, coconut).",
      table: {
        columns: ["Cell or tissue", "Ploidy", "Why"],
        rows: [
          { cells: ["Synergids, antipodals, egg", "Haploid (n)", "Cells of the embryo sac, made from a haploid megaspore by mitosis"] },
          { cells: ["Central cell before fertilisation", "Two haploid polar nuclei", "No male gamete has fused with it yet"] },
          { cells: ["Zygote, embryo", "Diploid (2n)", "Egg (n) plus male gamete (n)"] },
          {
            cells: ["Primary endosperm nucleus and primary endosperm cell", "Triploid (3n)", "Two polar nuclei (n + n) plus male gamete (n)"],
            noteAmber: "NEET 2026: the primary endosperm cell was the triploid one among synergid, central cell and zygote.",
            pyqExampleId: "d1858c37-c391-4ad7-89bc-6e4c9d06afc5",
          },
          {
            cells: ["Endosperm", "Triploid (3n)", "Grows from the primary endosperm cell by division"],
            noteAmber: "Re-NEET 2026: with 2n = 36, the endosperm has 3n = 54.",
          },
          { cells: ["Nucellus and integuments", "Diploid (2n)", "Tissue of the parent plant, not of the embryo sac"] },
        ],
      },
      pyqExampleId: "8d8eff44-f569-462d-85d6-b8ee22bab0bf",
      selfCheckExample: {
        prompt: "The egg cell of a flowering plant has 12 chromosomes. How many chromosomes are there in its zygote and in its endosperm?",
        steps: [
          "The egg is haploid, so n = 12.",
          "The zygote is egg plus one male gamete: \\(2n = 2 \\times 12 = 24\\).",
          "The endosperm comes from two polar nuclei plus one male gamete: \\(3n = 3 \\times 12 = 36\\).",
        ],
        answer: "24 in the zygote and 36 in the endosperm.",
      },
      practiceSet: [
        { prompt: "What is the fusion of a male gamete with the two polar nuclei called?", answer: "Triple fusion" },
        { prompt: "Through which structure does the pollen tube enter a synergid?", answer: "The filiform apparatus" },
        { prompt: "Which develops first after fertilisation, the endosperm or the embryo?", answer: "The endosperm" },
        { prompt: "What is the water of a tender coconut, in terms of endosperm?", answer: "Free-nuclear endosperm" },
        { prompt: "Name two seeds in which the endosperm persists in the mature seed.", answer: "Castor and coconut" },
      ],
      traps: [
        {
          title: "The central cell is not triploid yet",
          body: "Before fertilisation the central cell holds **two haploid polar nuclei**. It becomes the **triploid** primary endosperm cell only after the second male gamete fuses with them.",
        },
        {
          title: "Endosperm 3n, embryo 2n",
          body: "The **endosperm** is **triploid** (two polar nuclei plus a male gamete). The **embryo** comes from the zygote and is **diploid**. To get the endosperm count from 2n, multiply n by three.",
        },
        {
          title: "Coconut water is free-nuclear, the kernel is cellular",
          body: "The **water** of a tender coconut is **free-nuclear** endosperm. The **white kernel** is the **cellular** endosperm.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-seed",
      name: "Embryo and seed",
      intuition:
        "The seed is the fertilised ovule: a baby plant (the embryo), its food (cotyledons or endosperm) and a tough coat. NEET asks the names of the embryo parts, especially in grasses, and which seeds use up their endosperm and which keep it.",
      definition:
        "The embryo and seed in NCERT:\n" +
        "- The embryo forms at the **micropylar end** of the embryo sac, where the zygote lies. Most zygotes divide only after some endosperm has formed. It passes through **proembryo**, **globular** and **heart-shaped** stages to the mature embryo.\n" +
        "- **Dicot embryo**: an **embryonal axis** and **two cotyledons**. The part above the cotyledons is the **epicotyl**, ending in the **plumule** (stem tip). The part below is the **hypocotyl**, ending in the **radicle** (root tip) covered by a **root cap**.\n" +
        "- **Grass (monocot) embryo**: one cotyledon, the **scutellum**, to one side of the axis. The radicle and root cap are enclosed in an undifferentiated sheath, the **coleorhiza**. The shoot apex and a few leaf primordia are enclosed in a hollow leafy structure, the **coleoptile**.\n" +
        "- A seed has **seed coat(s)**, **cotyledon(s)** and an **embryo axis**. The cotyledons are often thick with stored food, as in legumes.\n" +
        "- **Non-albuminous (ex-albuminous)** seeds have **no endosperm left**: it was used up by the embryo (pea, groundnut). **Albuminous** seeds keep part of it (wheat, maize, barley, castor).\n" +
        "- In some seeds, such as **black pepper** and **beet**, part of the nucellus also persists. This residual, persistent nucellus is the **perisperm**.\n" +
        "- The integuments harden into the **seed coat**. The **micropyle** stays as a small pore that lets **oxygen and water** in during germination.\n" +
        "- A mature seed is dry, about **10 to 15%** moisture by mass. The embryo's activity slows down and it may enter **dormancy**.\n" +
        "- Seeds can stay alive a long time: a **lupine** (*Lupinus arcticus*) seed from the Arctic tundra germinated after about **10,000 years**, and a **date palm** (*Phoenix dactylifera*) seed about **2000 years** old was found near the Dead Sea.",
      table: {
        columns: ["Term", "What it is", "NCERT example"],
        rows: [
          {
            cells: ["Non-albuminous seed", "Seed with no endosperm left at maturity", "Pea, groundnut"],
            noteAmber: "Re-NEET 2026: pea was the non-albuminous seed among wheat, maize and barley.",
          },
          { cells: ["Albuminous seed", "Seed that keeps part of its endosperm", "Wheat, maize, barley, castor"] },
          { cells: ["Perisperm", "Residual nucellus that persists in the seed", "Black pepper, beet"] },
          { cells: ["Scutellum", "The single cotyledon of the grass embryo", "Grasses such as maize"] },
          {
            cells: ["Epiblast", "A rudimentary cotyledon on the grass embryo", "Grass embryo"],
            noteAmber: "NEET 2025 matched epiblast with rudimentary cotyledon.",
          },
          { cells: ["Coleoptile", "Hollow leafy sheath over the shoot apex and leaf primordia", "Grass embryo"] },
          { cells: ["Coleorhiza", "Undifferentiated sheath over the radicle and root cap", "Grass embryo"] },
        ],
      },
      pyqExampleId: "f24a020f-3f37-4af5-bce4-844ccd50251f",
      selfCheckExample: {
        prompt: "Name the parts of a dicot embryonal axis in order, from the shoot end to the root end, taking the cotyledons as the dividing point.",
        steps: [
          "Above the cotyledons is the epicotyl, which ends in the plumule.",
          "Below the cotyledons is the hypocotyl, which ends in the radicle.",
          "The radicle tip is covered by the root cap.",
        ],
        answer: "Plumule, epicotyl, (cotyledons), hypocotyl, radicle, root cap.",
      },
      practiceSet: [
        { prompt: "What does the micropyle of a mature seed let in during germination?", answer: "Oxygen and water" },
        { prompt: "About what share of a mature seed's mass is water?", answer: "About 10 to 15%" },
        { prompt: "Which part of the dicot embryonal axis ends in the plumule?", answer: "The epicotyl" },
        { prompt: "What do the integuments of the ovule become in the seed?", answer: "The seed coat" },
        { prompt: "About how old was the *Lupinus arcticus* seed that germinated after being dug out of the Arctic tundra?", answer: "About 10,000 years" },
      ],
      traps: [
        {
          title: "Groundnut and pea keep no endosperm",
          body: "**Pea and groundnut** are **non-albuminous**: the embryo uses up the endosperm and stores food in the cotyledons. **Castor** is a dicot but **albuminous**, like wheat, maize and barley.",
        },
        {
          title: "Perisperm is nucellus, not endosperm",
          body: "**Perisperm** is left-over **nucellus** (black pepper, beet). The **endosperm** comes from triple fusion. They are different tissues.",
        },
        {
          title: "Coleoptile covers the shoot, coleorhiza the root",
          body: "In a grass embryo the **coleoptile** covers the shoot apex and the **coleorhiza** covers the radicle and root cap. The **scutellum** is the cotyledon, not a sheath.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-fruit",
      name: "True, false and parthenocarpic fruits",
      intuition:
        "After fertilisation the ovary grows into the fruit and the ovules into the seeds. In most plants the rest of the flower falls away. In a few, such as apple and strawberry, the thalamus swells and becomes part of the fruit too, and that makes it a false fruit.",
      definition:
        "Fruits in NCERT:\n" +
        "- The **ovary** develops into the **fruit** and the **ovules** into the **seeds**.\n" +
        "- The ovary wall becomes the fruit wall, the **pericarp**. Fruits may be **fleshy** (guava, orange, mango) or **dry** (groundnut, mustard).\n" +
        "- In most plants the other floral parts degenerate and fall off. In a few, such as **apple, strawberry and cashew**, the **thalamus** also forms part of the fruit: these are **false fruits**.\n" +
        "- Most fruits develop from the **ovary alone**: these are **true fruits**.\n" +
        "- A few species form fruits **without fertilisation**: **parthenocarpic** fruits, such as **banana**. Parthenocarpy can be induced with **growth hormones**, and such fruits are **seedless**.",
      table: {
        columns: ["Kind of fruit", "Formed from", "NCERT example"],
        rows: [
          { cells: ["True fruit", "The ovary alone", "Most fruits"] },
          {
            cells: ["False fruit", "The ovary together with the thalamus", "Apple, strawberry, cashew"],
            noteAmber: "Re-NEET 2024: the part marked x in a strawberry was the thalamus.",
            pyqExampleId: "a047b36d-5232-422b-98b2-f6eb6cb1a2d3",
          },
          { cells: ["Parthenocarpic fruit", "The ovary, without fertilisation", "Banana"] },
        ],
      },
      pyqExampleId: "6ce2e7a7-b649-432e-a63f-68fdad6d9459",
      selfCheckExample: {
        prompt: "Why is a parthenocarpic fruit such as banana seedless?",
        steps: [
          "Seeds are fertilised ovules.",
          "A parthenocarpic fruit forms without fertilisation.",
          "So the ovules are never fertilised and do not become seeds.",
        ],
        answer: "It forms without fertilisation, so no ovule becomes a seed.",
      },
      practiceSet: [
        { prompt: "What does the wall of the ovary become after fertilisation?", answer: "The pericarp (fruit wall)" },
        { prompt: "Name two fruits with a dry pericarp.", answer: "Groundnut and mustard" },
        { prompt: "What can be applied to a plant to induce parthenocarpy?", answer: "Growth hormones" },
        { prompt: "What is a fruit formed from the ovary alone called?", answer: "A true fruit" },
        { prompt: "Name a parthenocarpic fruit.", answer: "Banana" },
      ],
      traps: [
        {
          title: "The thalamus, not the pericarp, makes a fruit false",
          body: "A **false fruit** is false because the **thalamus** joins the ovary in forming it. Mesocarp and endocarp are layers of the ovary wall, which every fruit has.",
        },
        {
          title: "Parthenocarpic means no fertilisation",
          body: "A **parthenocarpic** fruit (banana) forms **without fertilisation** and is seedless. A **false** fruit (apple) is fertilised normally; only the thalamus is extra.",
        },
      ],
    },
  ],
};
