import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_LW_CATEGORIES_NOTE: SubtopicNote = {
  subtopicName: "Taxonomic Categories",
  title: "Taxonomic Categories",
  oneLineDefinition:
    "The seven taxonomic categories from species up to kingdom, what each one groups together, and where NCERT places man, the housefly, mango and wheat.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026, and Re-NEET 2026 asked three of them. The order of the seven categories was asked twice (NEET 2022 and Re-NEET 2026). The others ask what a genus is, which insect is in family Muscidae, and the full classification of mango.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbolw-hierarchy",
      name: "The taxonomic hierarchy",
      visualizationSlug: "neet-taxon-hierarchy",
      intuition:
        "Classification sorts organisms into groups inside bigger groups, like a ladder. Each step on the ladder is a category, also called a rank, and a group at that rank is a taxon. There are seven main steps. The lowest is species and the highest is kingdom. Going up, each group holds more kinds of organisms, and they share fewer features.",
      definition:
        "The seven obligate categories:\n" +
        "- **Ascending** (lowest first): **species → genus → family → order → class → phylum or division → kingdom**.\n" +
        "- **Descending** (highest first): kingdom → phylum or division → class → order → family → genus → species.\n" +
        "- Animals use **phylum**; plants use **division** for the same step.\n" +
        "- Each category is a **rank**, and a group at that rank is a **taxon**.\n" +
        "- Going **up**, a taxon holds **more** organisms, and the number of **common characters falls**.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          {
            cells: ["Ascending order", "Species, genus, family, order, class, phylum or division, kingdom"],
            noteAmber: "Asked twice: NEET 2022 and Re-NEET 2026. Ascending always starts from species.",
          },
          { cells: ["Descending order", "Kingdom, phylum or division, class, order, family, genus, species"] },
          { cells: ["Lowest category", "Species"] },
          { cells: ["Highest category", "Kingdom"] },
          { cells: ["Phylum or division", "Phylum is used for animals, division for plants"] },
          { cells: ["Going up the ladder", "More organisms in each taxon, fewer characters they share"] },
        ],
      },
      pyqExampleId: "cf32cdb6-9777-4932-86eb-2769df310bc7",
      selfCheckExample: {
        prompt: "Which holds more kinds of organisms, an order or a genus, and which of the two do its members share more features in?",
        steps: [
          "Order sits higher on the ladder than genus (genus, family, order).",
          "A higher taxon holds more organisms, but they share fewer characters.",
        ],
        answer: "An order holds more organisms; the members of a genus share more features.",
      },
      practiceSet: [
        { prompt: "Which is the lowest taxonomic category?", answer: "Species" },
        { prompt: "Which word do plant taxonomists use in place of phylum?", answer: "Division" },
        { prompt: "Which category comes between family and class?", answer: "Order" },
        { prompt: "Put class, kingdom and order in descending order.", answer: "Kingdom, class, order" },
      ],
      traps: [
        {
          title: "Ascending starts at species",
          body: "**Ascending** means from the lowest rank up, so it begins with **species** and ends with **kingdom**. A list that opens with kingdom is the **descending** order.",
        },
        {
          title: "Higher rank, fewer shared features",
          body: "As we go up from species to kingdom, each taxon holds **more** organisms but they have **fewer** characters in common. It is not the other way round.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbolw-ranks",
      name: "What each category groups",
      intuition:
        "Each category is built from the one below it. Closely related species make a genus, related genera make a family, and so on up. NCERT shows this with two families of examples: the big cats and the potato family.",
      definition:
        "From species up to kingdom:\n" +
        "- **Species**: a group of individuals with **fundamental similarities**. *Panthera leo* (lion), *P. tigris* (tiger) and *P. pardus* (leopard) are three species; so are *Solanum tuberosum* (potato), *S. melongena* (brinjal) and *S. nigrum* (black nightshade).\n" +
        "- **Genus**: a group of **closely related species**, with more characters in common than species of other genera. *Panthera* and *Felis* (cat) are two genera.\n" +
        "- **Family**: a group of related **genera**. Felidae holds *Panthera* and *Felis*; Solanaceae holds *Solanum*, *Petunia* and *Datura*. Plant families are told apart by vegetative and reproductive features.\n" +
        "- **Order**: a group of related **families**. Carnivora holds Felidae and Canidae (dogs); Polymoniales holds Solanaceae and Convolvulaceae.\n" +
        "- **Class**: a group of related **orders**. Mammalia holds Primata (monkey, gorilla, gibbon) and Carnivora (tiger, cat, dog).\n" +
        "- **Phylum**: a group of related **classes**. Chordata holds fishes, amphibians, reptiles, birds and mammals, all with a **notochord** and a **dorsal hollow neural system**. In plants this rank is the **division**.\n" +
        "- **Kingdom**: the top rank, such as **Animalia** or **Plantae**.",
      table: {
        columns: ["Category", "Groups together", "Animal example", "Plant example"],
        rows: [
          { cells: ["Species", "Individuals with fundamental similarities", "*Panthera leo* (lion)", "*Solanum tuberosum* (potato)"] },
          { cells: ["Genus", "Closely related species", "*Panthera*: lion, tiger, leopard", "*Solanum*: potato, brinjal, black nightshade"] },
          { cells: ["Family", "Related genera", "Felidae: *Panthera* and *Felis*", "Solanaceae: *Solanum*, *Petunia*, *Datura*"] },
          { cells: ["Order", "Related families", "Carnivora: Felidae and Canidae", "Polymoniales: Solanaceae and Convolvulaceae"] },
          { cells: ["Class", "Related orders", "Mammalia: Primata and Carnivora", "Dicotyledonae (mango)"] },
          { cells: ["Phylum or division", "Related classes", "Chordata", "Angiospermae"] },
          { cells: ["Kingdom", "Related phyla or divisions", "Animalia", "Plantae"] },
        ],
      },
      pyqExampleId: "17eba4be-b165-45bc-b2ff-a97f0dd4eb65",
      selfCheckExample: {
        prompt: "Potato, brinjal and black nightshade are *Solanum tuberosum*, *S. melongena* and *S. nigrum*. Which category do all three share, and at which category do they differ?",
        steps: [
          "The first word of each name is the same, *Solanum*, so they share a genus.",
          "The second words differ, so each is a different species.",
        ],
        answer: "They share the genus *Solanum* and differ at the level of species.",
      },
      practiceSet: [
        { prompt: "Which genus holds the lion, the tiger and the leopard?", answer: "*Panthera*" },
        { prompt: "Which family holds both *Panthera* and *Felis*?", answer: "Felidae" },
        { prompt: "Which two families does the order Carnivora hold?", answer: "Felidae (cats) and Canidae (dogs)" },
        { prompt: "Which phylum holds animals with a notochord and a dorsal hollow neural system?", answer: "Chordata" },
        { prompt: "A family is a group of related members of which category?", answer: "Genera" },
      ],
      traps: [
        {
          title: "Genus groups species, not families",
          body: "A **genus** is a group of closely related **species**. A group of related families is an **order**, and a single plant or animal is just an individual.",
        },
        {
          title: "The cat is Felis, not Panthera",
          body: "Lion, tiger and leopard are in genus *Panthera*; the cat is in a different genus, *Felis*. Both genera sit in the same family, **Felidae**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbolw-examples",
      name: "NCERT example organisms",
      intuition:
        "NCERT places four organisms on every step of the ladder: man, the housefly, mango and wheat. NEET lifts its match-the-column questions straight from this table, so learn it row by row. A quick check: in animals a family name ends in idae, and in plants a family ends in aceae and an order in ales.",
      definition:
        "Endings that help:\n" +
        "- Animal families end in **idae**: Hominidae, Muscidae, Felidae, Canidae.\n" +
        "- Plant families end in **aceae** (Anacardiaceae, Poaceae, Solanaceae) and plant orders in **ales** (Sapindales, Poales).\n" +
        "- Man and the housefly are animals, so their top rank in the table is a **phylum**; mango and wheat are plants, so theirs is a **division**.",
      table: {
        columns: ["Category", "Man", "Housefly", "Mango", "Wheat"],
        rows: [
          { cells: ["Biological name", "*Homo sapiens*", "*Musca domestica*", "*Mangifera indica*", "*Triticum aestivum*"] },
          { cells: ["Genus", "*Homo*", "*Musca*", "*Mangifera*", "*Triticum*"] },
          {
            cells: ["Family", "Hominidae", "Muscidae", "Anacardiaceae", "Poaceae"],
            noteAmber: "NEET 2021: of firefly, grasshopper, cockroach and housefly, only the housefly is in family Muscidae.",
            pyqExampleId: "daba32bb-519e-4377-97dc-cc48d107397f",
          },
          { cells: ["Order", "Primata", "Diptera", "Sapindales", "Poales"] },
          { cells: ["Class", "Mammalia", "Insecta", "Dicotyledonae", "Monocotyledonae"] },
          { cells: ["Phylum or division", "Chordata", "Arthropoda", "Angiospermae", "Angiospermae"] },
        ],
      },
      pyqExampleId: "7875ec88-f317-46a4-b2fd-cd364f62cbb9",
      selfCheckExample: {
        prompt: "Give the family, order and class of man.",
        steps: [
          "Man is *Homo sapiens*, an animal, so the family ends in idae: Hominidae.",
          "The order is Primata and the class is Mammalia.",
        ],
        answer: "Family Hominidae, order Primata, class Mammalia.",
      },
      practiceSet: [
        { prompt: "To which class does wheat belong?", answer: "Monocotyledonae" },
        { prompt: "What is the order of the housefly?", answer: "Diptera" },
        { prompt: "To which family does wheat belong?", answer: "Poaceae" },
        { prompt: "Which phylum does the housefly belong to?", answer: "Arthropoda" },
        { prompt: "Which division do both mango and wheat belong to?", answer: "Angiospermae" },
      ],
      traps: [
        {
          title: "Do not swap order and family",
          body: "For mango the **family** is **Anacardiaceae** and the **order** is **Sapindales**. The ending tells them apart: plant families end in aceae, plant orders in ales.",
        },
        {
          title: "Muscidae is the housefly family only",
          body: "The housefly (*Musca domestica*) is in family **Muscidae**, order **Diptera**, class **Insecta**. The firefly, grasshopper and cockroach are insects too, but each sits in a different family.",
        },
        {
          title: "Mango and wheat part at the class",
          body: "Both are in division **Angiospermae**, but mango is in class **Dicotyledonae** and wheat in class **Monocotyledonae**.",
        },
      ],
    },
  ],
};
