import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_RE_REPRODUCTION_NOTE: SubtopicNote = {
  subtopicName: "Reproduction in Plants and Humans",
  title: "Reproduction in Plants and Humans",
  oneLineDefinition:
    "How a flowering plant goes from pollination to seedling, which cells of the ovule are haploid, how some seeds form without fertilisation, and why a newborn needs colostrum.",
  whyItMatters:
    "Five CDS questions from 2016 (II) to 2023 (II). Four are about flowering plants: the order of events, the cells of the ovule, selfing a tall plant, and seeds without fertilisation. One asks about the first milk a mother makes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbire-flower",
      name: "Sexual reproduction in a flowering plant",
      intuition:
        "A flower makes seeds in a fixed order. First pollen has to reach the stigma: that is pollination. Then a male gamete from the pollen fuses with the egg inside the ovule: that is fertilisation, and it makes a zygote. The zygote divides again and again to form an embryo, the ovule becomes a seed, and the seed later grows into a seedling. The egg and the cells around it carry half the chromosomes; the tissue that surrounds them carries the full set.",
      definition:
        "From flower to seedling:\n" +
        "- **Pollination**: pollen moves from the anther to the stigma. **Self-pollination** uses the same flower or plant; **cross-pollination** uses another plant.\n" +
        "- **Fertilisation**: a male gamete fuses with the **egg** to form a diploid **zygote**.\n" +
        "- The zygote divides to form the **embryo**; the ovule becomes the **seed** and the ovary the **fruit**. The seed germinates into a **seedling**.\n\n" +
        "Inside the ovule:\n" +
        "- The **embryo sac** comes from a haploid megaspore, so its cells are **haploid**: the **egg**, two **synergids** and three **antipodals** (the central cell has two haploid nuclei).\n" +
        "- The **nucellus** around it is tissue of the parent plant, so it is **diploid**.\n\n" +
        "Selfing as a test: a **pure-breeding** tall plant, when self-pollinated, gives only tall plants; a **hybrid** tall plant gives about **one short plant in four** (Mendel's 3 : 1).",
      table: {
        columns: ["Step or cell", "What it is"],
        rows: [
          { cells: ["Pollination", "Pollen reaches the stigma"] },
          { cells: ["Fertilisation", "Male gamete fuses with the egg; a zygote forms"] },
          { cells: ["Division of the zygote", "Builds the embryo inside the seed"] },
          { cells: ["Seedling", "The young plant when the seed germinates"] },
          {
            cells: ["Egg, synergids, antipodals", "Haploid cells of the embryo sac"],
            noteAmber: "CDS 2023 (II): the nucellus is the cell in the ovule that is not haploid.",
            pyqExampleId: "21614589-edfc-47c3-85f7-2262149710f9",
          },
          { cells: ["Nucellus", "Diploid tissue of the parent around the embryo sac"] },
        ],
      },
      pyqExampleId: "0436eb00-a18a-4266-8ded-d92a9919d4ac",
      selfCheckExample: {
        prompt: "A tall pea plant is self-pollinated, and about a quarter of its offspring are short. Was the plant pure-breeding tall or a hybrid?",
        steps: [
          "A pure-breeding tall plant carries only the tall form of the gene, so selfing it gives only tall offspring.",
          "Short offspring appear only if the plant carries a hidden dwarf form; one in four short is Mendel's 3 : 1.",
        ],
        answer: "A hybrid (Tt): it carries the dwarf form hidden.",
      },
      practiceSet: [
        { prompt: "What is the transfer of pollen from an anther to a stigma called?", answer: "Pollination" },
        { prompt: "After fertilisation, which part of the flower becomes the fruit?", answer: "The ovary" },
        { prompt: "How many synergids are in the embryo sac?", answer: "Two" },
        { prompt: "Is the zygote of a flowering plant haploid or diploid?", answer: "Diploid" },
      ],
      traps: [
        {
          title: "Pollination comes before fertilisation",
          body: "Pollen must reach the stigma **before** any gamete can fuse with the egg. The embryo and the seedling come **after** fertilisation, never before it.",
        },
        {
          title: "Nucellus is the odd one out",
          body: "The egg, synergids and antipodals all belong to the haploid embryo sac. The **nucellus** is the parent's own tissue and is **diploid**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbire-apomixis",
      name: "Seeds without fertilisation (apomixis)",
      intuition:
        "Some plants can make a seed with an embryo in it without any fertilisation. The embryo may grow from an egg that was never fertilised, from some other cell of the embryo sac, or even from a cell of the tissue around it. All of these are kinds of apomixis. Because no gametes fuse, the offspring is a copy of its mother.",
      definition:
        "Apomixis: forming an **embryo without fertilisation**. Three ways it happens:\n" +
        "- **Parthenogenesis**: the embryo grows from an **unfertilised egg**.\n" +
        "- **Apogamy**: it grows from **another cell** of the embryo sac, not the egg.\n" +
        "- **Adventive embryony** (sporophytic budding): it grows from a cell of the **nucellus** or integument, as in **citrus** and **mango**.\n\n" +
        "The seed's embryo has the **same genes as the mother**. This lets a good hybrid keep its qualities, so farmers need not buy new hybrid seed every year.",
      table: {
        columns: ["Kind of apomixis", "Embryo grows from"],
        rows: [
          {
            cells: ["Parthenogenesis", "An unfertilised egg"],
            noteAmber: "CDS 2016 (II): parthenogenesis, apogamy and sporophytic budding all give an embryo without fertilisation.",
            pyqExampleId: "afbbcadc-a9cf-4b91-854d-e28a943ab0b4",
          },
          { cells: ["Apogamy", "A cell of the embryo sac other than the egg"] },
          { cells: ["Adventive embryony (sporophytic budding)", "A cell of the nucellus or integument"] },
        ],
      },
      pyqExampleId: "afbbcadc-a9cf-4b91-854d-e28a943ab0b4",
      selfCheckExample: {
        prompt: "A farmer grows a high-yield hybrid crop. Why would apomictic seed of that hybrid save him money?",
        steps: [
          "Ordinary hybrid seed, if saved and resown, gives offspring that segregate and lose the hybrid's qualities, so new seed must be bought every year.",
          "An apomictic seed forms without fertilisation, so its embryo has exactly the mother's genes.",
        ],
        answer: "Its offspring stay identical to the hybrid, so he can save his own seed year after year.",
      },
      practiceSet: [
        { prompt: "What is the general name for forming an embryo without fertilisation?", answer: "Apomixis" },
        { prompt: "Name a fruit plant in which extra embryos grow from the nucellus.", answer: "Citrus (or mango)" },
        { prompt: "In apogamy, from which kind of cell does the embryo grow?", answer: "A cell of the embryo sac other than the egg" },
        { prompt: "Does an apomictic embryo have the same genes as its mother plant?", answer: "Yes" },
      ],
      traps: [
        {
          title: "All three count",
          body: "Parthenogenesis, apogamy and adventive embryony (sporophytic budding) are **all** ways of making an embryo without fertilisation. An option leaving one out is incomplete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbire-human",
      name: "Colostrum and the newborn",
      intuition:
        "A newborn baby's own defences are not ready yet. For the first few days after birth the mother makes a thick, yellowish milk, colostrum, that is full of antibodies. The baby receives these ready-made antibodies and is protected while its own immune system develops. This borrowed protection is called passive immunity.",
      definition:
        "Human reproduction and the newborn:\n" +
        "- **Fertilisation** takes place in the **oviduct** (fallopian tube); the embryo implants in the **uterus**.\n" +
        "- The **placenta** links the foetus to the mother for food, oxygen and wastes. Pregnancy (gestation) lasts about **nine months**.\n" +
        "- **Colostrum**: the first milk, made in the first few days after birth; rich in **antibodies (IgA)**.\n" +
        "- Antibodies received ready-made, from the mother's milk or across the placenta, give **passive immunity**. It works at once but **does not last**, because the baby did not make them and has no memory cells for them.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Colostrum", "The first milk; rich in antibodies"],
            noteAmber: "CDS 2018 (II): the milk essential for the newborn's immune response is colostrum.",
            pyqExampleId: "7cc84b89-fdf7-4d71-9f8c-290b074bba56",
          },
          { cells: ["Placenta", "Links the foetus to the mother"] },
          { cells: ["Oviduct", "Where fertilisation takes place"] },
          { cells: ["Passive immunity", "Ready-made antibodies from another body; short-lived"] },
        ],
      },
      pyqExampleId: "7cc84b89-fdf7-4d71-9f8c-290b074bba56",
      selfCheckExample: {
        prompt: "The protection a baby gets from its mother's antibodies fades within a few months. Why does it not last?",
        steps: [
          "The baby did not make these antibodies; it received them ready-made.",
          "Ready-made antibodies are slowly broken down, and the baby has no memory cells to make more of them.",
        ],
        answer: "It is passive immunity: borrowed antibodies wear out and cannot be replaced by the baby.",
      },
      practiceSet: [
        { prompt: "Where does fertilisation take place in a woman?", answer: "In the oviduct (fallopian tube)" },
        { prompt: "Which organ links the foetus to the mother?", answer: "The placenta" },
        { prompt: "About how long does human pregnancy last?", answer: "About nine months" },
        { prompt: "What is the immunity a person gets from ready-made antibodies called?", answer: "Passive immunity" },
      ],
      traps: [
        {
          title: "Colostrum is the first milk, not later milk",
          body: "Colostrum is made in the **first few days** after birth. Milk made a month later, 'transitional' milk or 'mineralised' milk are not the answer to an antibody question.",
        },
      ],
    },
  ],
};
