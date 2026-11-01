import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BBI_BIOMOLECULES_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates, Pigments and Proteins",
  title: "Carbohydrates, Pigments and Proteins",
  oneLineDefinition:
    "Starch, glycogen, pectin and the sugars with their sources, the plant and algal pigments SSC names, and essential amino acids and milk protein.",
  whyItMatters:
    "Eleven questions in the bank: five from the 2023 shifts, four from the 2024 shifts and two from the 2025 shifts, seven of them MODERATE. Most ask another name or a source, so the two tables are what to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbbibi-carbs",
      name: "Carbohydrates and energy molecules",
      intuition:
        "Plants store sugar as starch and animals as glycogen. Each sugar has a typical source, and SSC asks the source or a second name.",
      definition:
        "Stores and fibres:\n" +
        "- **Starch** (**amylum**): the plant store, in cereals, potatoes, tubers.\n" +
        "- **Glycogen**: the **animal** store, in liver and muscle.\n" +
        "- **Cellulose**: plant structure; an insoluble fibre, like lignin.\n" +
        "- **Pectin**: a **soluble** fibre of fruit walls, built from **galacturonic acid**; used to **thicken** jams and jellies.\n\n" +
        "Sugars: **maltose** in germinating grains, **fructose** in fruits such as grapes, **lactose** in milk, sucrose for transport in plants.\n\n" +
        "Energy molecules: **glucose** (fuel), **NADH** (carrier) and **ATP** (currency). **DNA** carries genes, not energy.",
      table: {
        columns: ["Substance", "Fact"],
        rows: [
          { cells: ["Amylum", "Another name for starch"], pyqExampleId: "596b0cdf-e8cd-4e2f-b799-58d22b5c6d41" },
          { cells: ["Pectin", "Thickener; galacturonic acid"], pyqExampleId: "012d3029-a409-41c7-ae07-400992a03421" },
          { cells: ["Starch is not in", "Egg yolk"], pyqExampleId: "7742dc70-dda4-4888-858f-06454d6e7f4a" },
          { cells: ["Odd one among ATP, glucose, NADH", "DNA"], pyqExampleId: "49bfc14c-4ba2-4a5f-ae96-0206bedd1a28" },
        ],
      },
      pyqExampleId: "3d6875dd-dd20-48a5-8c2e-0c2d2e5e8d09",
      selfCheckExample: {
        prompt: "What acid units make up the backbone of pectin?",
        steps: ["Pectin is a cell-wall polysaccharide.", "Its chains are built of galacturonic acid, a sugar acid."],
        answer: "Galacturonic acid.",
      },
      practiceSet: [
        { prompt: "Which sugar is found in milk?", answer: "Lactose" },
        { prompt: "Where is glycogen stored?", answer: "In the liver and muscles" },
        { prompt: "Is cellulose a soluble or insoluble fibre?", answer: "Insoluble" },
      ],
      traps: [
        {
          title: "Starch is for plants",
          body: "**Starch** is the **plant** store. The animal store is **glycogen**, and an egg yolk holds almost no starch.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbbibi-proteins",
      name: "Pigments, amino acids and milk protein",
      intuition:
        "A few pigments and proteins come up by name. Learn where each pigment is found and which amino acids the body cannot make.",
      definition:
        "Pigments:\n" +
        "- **Anthocyanins**: water-soluble phenolic pigments of pomegranate, brinjal, black carrot and red cabbage.\n" +
        "- **Fucoxanthin**: the brown pigment of **brown seaweed** and diatoms.\n" +
        "- Betalains colour beetroot; astaxanthin colours salmon and shrimp.\n\n" +
        "Proteins:\n" +
        "- **Essential** amino acids (nine) must come from food: histidine, isoleucine, leucine, **lysine**, methionine, phenylalanine, threonine, tryptophan, **valine**.\n" +
        "- **Lysine** helps absorb **calcium** and builds **collagen**.\n" +
        "- **Casein** is about **80%** of the protein in cow's milk; the rest is whey.",
      table: {
        columns: ["Name", "Fact"],
        rows: [
          { cells: ["Anthocyanins", "Pomegranate, red cabbage"], pyqExampleId: "2c5269c6-9849-46e7-b611-0752a7c30020" },
          { cells: ["Fucoxanthin", "Brown seaweed"], pyqExampleId: "d6faa1cd-36d7-4d0d-958e-403fa20eaf49" },
          { cells: ["Valine", "Essential amino acid"], pyqExampleId: "366e9b82-6d1e-48b3-ad42-6f82ce1a2c0c" },
          { cells: ["Lysine", "Calcium absorption, collagen"], pyqExampleId: "0b4d8f4f-ec5d-4be5-9b0a-5ac19bb78d47" },
        ],
      },
      pyqExampleId: "86b8f6eb-403e-4db7-a081-5c61b01910e0",
      selfCheckExample: {
        prompt: "A statement says valine is non-essential because the body makes it. Is it right?",
        steps: ["Valine is one of the nine essential amino acids.", "The body cannot make it, so it must come from food."],
        answer: "No: valine is essential.",
      },
      practiceSet: [
        { prompt: "Which pigment colours brown algae?", answer: "Fucoxanthin" },
        { prompt: "Which amino acid helps the body absorb calcium?", answer: "Lysine" },
        { prompt: "What is the rest of milk protein, besides casein?", answer: "Whey protein" },
      ],
      traps: [
        {
          title: "Betalains are not phenolic",
          body: "The **phenolic** pigment of red cabbage and pomegranate is **anthocyanin**. Betalains contain nitrogen and colour beetroot.",
        },
      ],
    },
  ],
};
