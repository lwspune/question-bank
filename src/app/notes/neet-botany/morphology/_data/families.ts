import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MO_FAMILIES_NOTE: SubtopicNote = {
  subtopicName: "Floral Formula and Families",
  title: "Floral Formula and Families",
  oneLineDefinition:
    "The symbols of a floral formula, and the NCERT description of three families: Fabaceae, Solanaceae and Liliaceae, with their formulas, plants and uses.",
  whyItMatters:
    "Seven NEET questions: one HARD and six MODERATE. Fabaceae was asked in NEET 2022, NEET 2023 and Re-NEET 2024; Solanaceae in both NEET 2026 and Re-NEET 2026; floral formulas in 2021, 2025 and 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomo-floral-formula",
      name: "Reading a floral formula",
      intuition:
        "A floral formula packs a whole flower into one line of symbols: its symmetry, its sex, and for each whorl how many parts there are and whether they are fused. Once you can read the symbols, a formula tells you the family, and NEET asks it both ways.",
      definition:
        "Rules for writing a floral formula:\n" +
        "- **Br** bracteate, **K** calyx, **C** corolla, **P** perianth, **A** androecium, **G** gynoecium.\n" +
        "- \\(\\oplus\\) **actinomorphic**; \\(\\%\\) **zygomorphic**. Separate signs show a male, female or **bisexual** flower.\n" +
        "- \\(\\underline{G}\\) (line below) is a **superior** ovary; \\(\\overline{G}\\) (line above) is an **inferior** ovary.\n" +
        "- The number of parts follows each letter. A number in **brackets** means the parts are **fused**: \\(K_{(5)}\\) is five united sepals, \\(K_5\\) five free ones.\n" +
        "- **Adhesion** between two whorls is shown by a **line drawn above** their symbols, as for the epipetalous stamens of Solanaceae.",
      table: {
        columns: ["Family", "Floral formula", "What gives it away"],
        rows: [
          { cells: ["Fabaceae", "\\(\\%\\) bisexual \\(K_{(5)}\\, C_{1+2+(2)}\\, A_{(9)+1}\\, \\underline{G}_{1}\\)", "Zygomorphic; 1 standard, 2 wings, 2 fused keel petals; nine stamens fused and one free; one carpel"] },
          {
            cells: ["Solanaceae", "\\(\\oplus\\) bisexual \\(K_{(5)}\\, C_{(5)}\\, A_{5}\\, \\underline{G}_{(2)}\\), with a line joining C and A", "Five fused sepals and petals; stamens on the petals; two fused carpels"],
            noteAmber: "NEET 2026: the right Solanaceae formula shows both the fused sepals and the fused petals.",
          },
          { cells: ["Liliaceae", "Br \\(\\oplus\\) bisexual \\(P_{(3+3)}\\, A_{3+3}\\, \\underline{G}_{(3)}\\)", "Perianth instead of calyx and corolla; six stamens; three fused carpels"] },
          {
            cells: ["Brassicaceae (mustard)", "\\(\\oplus\\) bisexual \\(K_{2+2}\\, C_{4}\\, A_{2+4}\\, \\underline{G}_{(2)}\\)", "Four free petals; six stamens, two short and four long"],
            noteAmber: "NEET 2021 matched four formulas to Fabaceae, Solanaceae, Liliaceae and Brassicaceae. NCERT describes only the first three families.",
            pyqExampleId: "33266715-baba-4b7f-a9de-b3959495e8e5",
          },
        ],
      },
      pyqExampleId: "24ad88b9-649e-40a8-8481-88100d31e2e6",
      selfCheckExample: {
        prompt: "In a floral formula, what is the difference between \\(C_{(5)}\\) and \\(C_5\\)?",
        steps: [
          "C stands for the corolla, and 5 is the number of petals.",
          "Brackets around the number show that the parts are fused.",
        ],
        answer: "\\(C_{(5)}\\) is five united petals (gamopetalous); \\(C_5\\) is five free petals (polypetalous).",
      },
      practiceSet: [
        { prompt: "What does Br stand for in a floral formula?", answer: "Bracteate: the flower has a bract" },
        { prompt: "Which letter stands for the perianth in a floral formula?", answer: "P" },
        { prompt: "How is adhesion between two whorls shown in a floral formula?", answer: "By a line drawn above the symbols of those whorls" },
        { prompt: "What does \\(A_{(9)+1}\\) tell you about the stamens?", answer: "Ten stamens: nine fused together and one free" },
      ],
      traps: [
        {
          title: "Line below the G means superior",
          body: "\\(\\underline{G}\\), with the line **below**, is a **superior** ovary: the other parts are below it. \\(\\overline{G}\\), with the line **above**, is an **inferior** ovary.",
        },
        {
          title: "Brackets mean fused, not many",
          body: "A bracket around a number shows **fusion**. \\(G_{(2)}\\) is two **fused** carpels; \\(G_1\\) is a single carpel.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-fabaceae",
      name: "Fabaceae",
      intuition:
        "Fabaceae is the pea family. Its flower is the butterfly-shaped pea flower: zygomorphic, with vexillary petals, ten stamens in two bundles and a single carpel that becomes a pod. NEET names a plant, or lists these features, and asks which belong to Fabaceae.",
      definition:
        "Fabaceae in NCERT:\n" +
        "- Earlier called **Papilionoideae**, a subfamily of the family **Leguminosae**. Found all over the world.\n" +
        "- Trees, shrubs or herbs; roots with **root nodules**.\n" +
        "- Leaves alternate, **pinnately compound** or simple; leaf base **pulvinate**; stipulate; venation reticulate.\n" +
        "- Inflorescence **racemose**. Flower **bisexual** and **zygomorphic**.\n" +
        "- **Calyx**: five sepals, gamosepalous, imbricate aestivation.\n" +
        "- **Corolla**: five petals, polypetalous, papilionaceous: a posterior **standard**, two lateral **wings** and two anterior petals forming the **keel** that encloses the stamens and pistil; **vexillary** aestivation.\n" +
        "- **Androecium**: ten stamens, **diadelphous**; anthers **dithecous**.\n" +
        "- **Gynoecium**: ovary **superior**, **monocarpellary**, **unilocular**, with **many ovules**; style single.\n" +
        "- Fruit a **legume**; seeds one to many, **non-endospermic**.",
      table: {
        columns: ["Feature", "Fabaceae", "Plants or uses"],
        rows: [
          { cells: ["Petals in the bud", "Vexillary aestivation", "Pea, bean"] },
          {
            cells: ["Stamens", "Ten, diadelphous; anthers dithecous", "Pea"],
            noteAmber: "NEET 2023: diadelphous stamens are the stamen feature of Fabaceae that Solanaceae and Liliaceae lack.",
            pyqExampleId: "069b40e1-fe1f-453c-b592-41fa85f9b8ca",
          },
          {
            cells: ["Ovary", "Superior, monocarpellary, unilocular, many ovules", "*Sesbania*, *Indigofera*"],
            noteAmber: "Re-NEET 2024: Sesbania and Indigofera were the two plants with this ovary; brinjal, tobacco and Asparagus were not.",
            pyqExampleId: "46dc17f2-15a0-49f6-8652-08b88bb68f95",
          },
          { cells: ["Pulses", "Seeds eaten as dal", "Gram, arhar, sem, moong, soybean"] },
          { cells: ["Edible oil", "Oil from the seeds", "Soybean, groundnut"] },
          { cells: ["Dye", "Blue dye", "*Indigofera*"] },
          { cells: ["Fibre", "Fibre from the stem", "Sunhemp"] },
          { cells: ["Fodder", "Animal feed", "*Sesbania*, *Trifolium*"] },
          { cells: ["Ornamentals", "Grown for flowers", "Lupin, sweet pea"] },
          { cells: ["Medicine", "Medicinal root", "Muliathi"] },
        ],
      },
      pyqExampleId: "3b044930-b982-4499-b1dc-4ec901f77429",
      selfCheckExample: {
        prompt: "A plant has root nodules, pinnately compound leaves with a swollen leaf base, and a pod-like fruit. Name its family, the fruit, and say whether its seeds have endosperm.",
        steps: [
          "Root nodules, pinnately compound leaves and a pulvinate leaf base are Fabaceae features.",
          "The fruit of Fabaceae is a legume.",
          "NCERT describes Fabaceae seeds as non-endospermic.",
        ],
        answer: "Fabaceae; the fruit is a legume and the seeds are non-endospermic.",
      },
      practiceSet: [
        { prompt: "What was Fabaceae called earlier?", answer: "Papilionoideae, a subfamily of the family Leguminosae" },
        { prompt: "What is the fruit of a Fabaceae plant called?", answer: "A legume" },
        { prompt: "Which Fabaceae plant gives a dye?", answer: "*Indigofera*" },
        { prompt: "Which type of inflorescence does Fabaceae have?", answer: "Racemose" },
        { prompt: "Name the Fabaceae plant that gives fibre.", answer: "Sunhemp" },
      ],
      traps: [
        {
          title: "One carpel, many ovules",
          body: "The Fabaceae ovary is **monocarpellary and unilocular**, yet it has **many ovules**, which become the seeds in a pod. One carpel does not mean one ovule.",
        },
        {
          title: "Calyx imbricate, corolla vexillary",
          body: "In Fabaceae the **sepals** show **imbricate** aestivation and the **petals** show **vexillary** aestivation. Do not give both whorls the same type.",
        },
        {
          title: "Dithecous anthers are not special to Fabaceae",
          body: "Solanaceae and Liliaceae have **dithecous** anthers too. The stamen feature only Fabaceae has among the three is **diadelphous** union.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-solanaceae-liliaceae",
      name: "Solanaceae and Liliaceae",
      intuition:
        "Solanaceae, the potato family, is a dicot family with five united sepals and petals and stamens fixed on the petals. Liliaceae, the lily family, is a monocot family with a perianth of six tepals in two whorls and parts in threes. Both have bisexual, actinomorphic flowers and a superior ovary, so tell them apart by the number of parts and the stamens.",
      definition:
        "Solanaceae in NCERT:\n" +
        "- Mostly herbs and shrubs, rarely small trees; an underground stem in potato.\n" +
        "- Leaves alternate, simple, rarely pinnately compound, **exstipulate**; venation reticulate.\n" +
        "- Flower bisexual, actinomorphic. **Calyx**: five sepals, **united**, **persistent**, valvate. **Corolla**: five petals, **united**, valvate.\n" +
        "- **Androecium**: five stamens, **epipetalous**.\n" +
        "- **Gynoecium**: **bicarpellary**, syncarpous; ovary **superior**, **bilocular**, placenta swollen with many ovules, **axile**; carpels **obliquely** placed.\n" +
        "- Fruit a **berry** or **capsule**; seeds many, **endospermous**.\n" +
        "Liliaceae in NCERT:\n" +
        "- A typical **monocot** family: perennial herbs with underground **bulbs, corms or rhizomes**.\n" +
        "- Leaves mostly basal, alternate, **linear**, exstipulate, with **parallel** venation.\n" +
        "- Flower bisexual, actinomorphic. **Perianth**: six tepals (3+3), often united into a tube; valvate.\n" +
        "- **Androecium**: six stamens (3+3). **Gynoecium**: **tricarpellary**, syncarpous; ovary **superior**, **trilocular**, many ovules, **axile**.\n" +
        "- Fruit a **capsule**, rarely a berry; seed endospermous.",
      table: {
        columns: ["Character", "Solanaceae", "Liliaceae"],
        rows: [
          { cells: ["Common name", "Potato family", "Lily family"] },
          {
            cells: ["Flower", "Bisexual, actinomorphic", "Bisexual, actinomorphic"],
            noteAmber: "Re-NEET 2026: bisexual actinomorphic flowers, five united sepals and five epipetalous stamens are Solanaceae features; an inferior ovary is not.",
            pyqExampleId: "b9acf154-5917-4fdd-b906-3611a465c1cf",
          },
          { cells: ["Outer whorls", "Five united sepals (persistent) and five united petals, valvate", "Six tepals (3+3), often united into a tube, valvate"] },
          { cells: ["Stamens", "Five, epipetalous", "Six (3+3)"] },
          { cells: ["Ovary", "Superior, bicarpellary, bilocular, axile, swollen placenta", "Superior, tricarpellary, trilocular, axile"] },
          { cells: ["Fruit", "Berry or capsule", "Capsule, rarely berry"] },
          { cells: ["Food", "Tomato, brinjal, potato; chilli as a spice", "*Asparagus* as a vegetable"] },
          { cells: ["Medicine and drugs", "Belladonna, ashwagandha", "*Aloe*; colchicine from *Colchicum autumnale*"] },
          { cells: ["Other uses", "Tobacco (fumigatory); petunia (ornamental)", "Tulip, *Gloriosa* (ornamentals)"] },
        ],
      },
      pyqExampleId: "b9acf154-5917-4fdd-b906-3611a465c1cf",
      selfCheckExample: {
        prompt: "A plant grows from a bulb, has narrow leaves with parallel veins, six tepals in two whorls of three and a three-chambered superior ovary. Name the family and write its floral formula.",
        steps: [
          "A bulb, linear leaves with parallel veins and parts in threes point to a monocot family.",
          "A perianth of six tepals with a tricarpellary, trilocular superior ovary is Liliaceae.",
          "Its formula: Br \\(\\oplus\\) bisexual \\(P_{(3+3)}\\, A_{3+3}\\, \\underline{G}_{(3)}\\).",
        ],
        answer: "Liliaceae: Br \\(\\oplus\\) bisexual \\(P_{(3+3)}\\, A_{3+3}\\, \\underline{G}_{(3)}\\).",
      },
      practiceSet: [
        { prompt: "Which Liliaceae plant gives the drug colchicine?", answer: "*Colchicum autumnale*" },
        { prompt: "Which Solanaceae plant is grown for fumigatory use?", answer: "Tobacco" },
        { prompt: "What is the placentation in Solanaceae?", answer: "Axile, on a swollen placenta" },
        { prompt: "How are the carpels placed in a Solanaceae flower?", answer: "Obliquely" },
        { prompt: "Name the Liliaceae plant eaten as a vegetable.", answer: "*Asparagus*" },
      ],
      traps: [
        {
          title: "All three families have a superior ovary",
          body: "Fabaceae, Solanaceae and Liliaceae all have a **superior** ovary. A statement giving any of them an **inferior** ovary is false.",
        },
        {
          title: "Liliaceae has a perianth, not K and C",
          body: "Lily has six **tepals** (P, 3+3), not a separate calyx and corolla. Its stamens are attached to that perianth: **epiphyllous**.",
        },
        {
          title: "Solanaceae is bicarpellary, Liliaceae tricarpellary",
          body: "Solanaceae has **two** fused carpels and a bilocular ovary; Liliaceae has **three** fused carpels and a trilocular ovary.",
        },
      ],
    },
  ],
};
