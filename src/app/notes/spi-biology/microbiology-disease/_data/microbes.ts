import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MB_MICROBES_NOTE: SubtopicNote = {
  subtopicName: "Microorganisms and Their Uses",
  title: "Microorganisms and Their Uses",
  oneLineDefinition:
    "Microorganisms are living things too small to see without a microscope: bacteria, fungi, protozoa, algae and viruses, found almost everywhere.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE from the 2022 paper: where microbes live, which organism digests its food outside its body, the microbe that enriches the soil, the scientist who made oil-eating bacteria, and who gave us pasteurisation. Each one pairs a microbe or a scientist with one fact.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimbmi-groups",
      name: "The groups of microbes and how they feed",
      intuition:
        "Microbes come in five main groups, and they live in every place you can think of: hot springs, ice, deserts, marshes, soil, water and inside other living things. " +
        "Many cannot make their own food. Some feed on dead matter by digesting it outside their bodies; others live on a living host.",
      definition:
        "- **Bacteria**: Rhizobium, Lactobacillus. **Fungi**: yeast, bread mould (**Rhizopus**), Penicillium. **Protozoa**: Amoeba, Plasmodium. **Algae**: Chlamydomonas, Spirogyra. **Viruses**: reproduce only inside a host cell.\n" +
        "- **Saprophytes** (most fungi, many bacteria) pour digestive juices onto dead food, **break it down outside the body** and then absorb it. Bread mould is the usual example.\n" +
        "- **Parasites** take food from a living host: Cuscuta (a plant), the tapeworm (an animal).\n" +
        "- **Symbiosis**: two organisms live together and both gain, as Rhizobium does in the roots of legumes.\n" +
        "- Microbes live in **all habitats**, from hot springs to deserts and marshy land.",
      table: {
        columns: ["How it feeds", "What it does", "Example"],
        rows: [
          {
            cells: ["Saprophytic", "Digests dead food outside its body, then absorbs it", "Rhizopus (bread mould), yeast"],
            noteAmber: "Outside the body, then absorbed: that is the mark of a saprophyte.",
          },
          { cells: ["Parasitic (plant)", "Draws food from a living host plant", "Cuscuta"] },
          { cells: ["Parasitic (animal)", "Absorbs food already digested by its host", "Tapeworm"] },
          { cells: ["Symbiotic", "Lives with a partner, both gain", "Rhizobium in pea roots"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) yeast: fungus (b) Plasmodium: protozoan (c) Spirogyra: alga (d) Rhizopus: bacterium",
        steps: ["Yeast is a fungus, Plasmodium a protozoan, Spirogyra an alga: all right.", "Rhizopus is the bread mould, a fungus."],
        answer: "(d) is wrong: Rhizopus is a fungus.",
      },
      practiceSet: [
        { prompt: "Which group of microbes can reproduce only inside a host cell?", answer: "Viruses" },
        { prompt: "Is Cuscuta a saprophyte or a parasite?", answer: "A parasite (on a host plant)" },
        { prompt: "Name a fungus that grows on stale bread.", answer: "Rhizopus (bread mould)" },
        { prompt: "To which group of microbes does Amoeba belong?", answer: "Protozoa" },
      ],
      pyqExampleId: "2f0a4eb1-3a52-48d1-b87b-13a8a575f3fe",
      traps: [
        {
          title: "A parasite as a saprophyte",
          body: "A tapeworm absorbs food that its host has already digested, and Cuscuta draws food from a living plant. Only a saprophyte such as Rhizopus digests food outside its own body.",
        },
        {
          title: "Picking one habitat when the options allow all",
          body: "Microbes live in hot springs, deserts, ice and marshes alike. When the options list several habitats and 'all of these', every one of them is right.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimbmi-uses",
      name: "Useful microbes and the scientists behind them",
      intuition:
        "Many microbes help us: they set curd, raise bread, make medicines and feed the soil. A few scientists are remembered for putting them to work or for keeping them out of food.",
      definition:
        "- **Lactobacillus**: turns milk into **curd**.\n" +
        "- **Yeast**: **fermentation** (alcohol) and making **bread** rise (it gives out carbon dioxide).\n" +
        "- **Rhizobium**: fixes nitrogen in legume roots and so **increases soil fertility**.\n" +
        "- **Penicillium**: gives the antibiotic **penicillin**, found by **Alexander Fleming** (1928).\n" +
        "- **Louis Pasteur**: **pasteurisation** (heating milk to kill microbes) and early vaccines.\n" +
        "- **Edward Jenner**: the first vaccine, against smallpox.\n" +
        "- **Ananda Mohan Chakrabarty**: made an **oil-eating bacterium** (a Pseudomonas, the 'superbug') to clean up oil spills.",
      table: {
        columns: ["Scientist", "Known for"],
        rows: [
          { cells: ["Louis Pasteur", "Pasteurisation"] },
          { cells: ["Alexander Fleming", "Penicillin"] },
          { cells: ["Edward Jenner", "Smallpox vaccine"] },
          {
            cells: ["Ananda Mohan Chakrabarty", "Oil-eating bacteria for oil spills"],
            noteAmber: "M S Swaminathan and Norman Borlaug are Green Revolution names, not microbiologists.",
          },
          { cells: ["Robert Hooke", "First saw cells"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong pair: (a) Lactobacillus: curd (b) yeast: bread (c) Penicillium: pasteurisation (d) Rhizobium: soil nitrogen",
        steps: ["Lactobacillus sets curd, yeast raises bread, Rhizobium fixes nitrogen: all right.", "Penicillium gives penicillin. Pasteurisation is heating, named after Louis Pasteur."],
        answer: "(c) is wrong: Penicillium gives the antibiotic penicillin.",
      },
      practiceSet: [
        { prompt: "Which microbe turns milk into curd?", answer: "Lactobacillus" },
        { prompt: "Who discovered penicillin?", answer: "Alexander Fleming" },
        { prompt: "Who made the first vaccine, against smallpox?", answer: "Edward Jenner" },
        { prompt: "Why does dough rise when yeast is added?", answer: "Yeast respires and gives out carbon dioxide, which puffs up the dough" },
      ],
      pyqExampleId: "6705f0a5-95b4-4498-8750-68e6ec646d01",
      traps: [
        {
          title: "Green Revolution names for a microbe question",
          body: "M S Swaminathan and Norman Borlaug raised crop yields; they did not engineer bacteria. The oil-eating bacterium was the work of Ananda Mohan Chakrabarty.",
        },
        {
          title: "Lactobacillus for soil fertility",
          body: "Lactobacillus sets curd and yeast ferments sugar. The microbe that adds nitrogen to the soil is Rhizobium.",
        },
      ],
    },
  ],
};
