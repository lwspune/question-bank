import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BBC_ANIMALS_NOTE: SubtopicNote = {
  subtopicName: "Animal Kingdom Classification",
  title: "Animal Kingdom Classification",
  oneLineDefinition:
    "The animal phyla from sponges to arthropods with their marks and examples, and the vertebrate classes: which are warm-blooded, which lay eggs, and the genus names SSC uses.",
  whyItMatters:
    "Twenty-six questions in the bank: 14 from the 2023 shifts and 12 from the 2024 shifts. Nearly every one gives a genus name (Obelia, Ascaris, Pteropus) and asks its group, so the example columns are what to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbbcan-lower",
      name: "Sponges, cnidarians and worms",
      intuition:
        "The simplest animals are sorted by how far their body is organised: loose cells, then tissues, then organs. Symmetry and body layers mark each step.",
      definition:
        "The phyla:\n" +
        "- **Porifera** (sponges: **Sycon**, **Spongilla**, **Euplectella**): **cellular** grade of organisation.\n" +
        "- **Cnidaria** or Coelenterata (**Hydra**, jellyfish, sea anemone **Adamsia**, brain coral **Meandrina**): **radial** symmetry, **cell-tissue** grade. **Obelia** shows **metagenesis**, a polyp stage alternating with a medusa stage.\n" +
        "- **Ctenophora** (Pleurobrachia, Ctenoplana): marine comb jellies.\n" +
        "- **Platyhelminthes** (flatworms: tapeworm **Taenia**, liver fluke): **bilateral**, **three-layered**, **no coelom**, no anus; **flame cells** for osmoregulation. Many are **endoparasites**.\n" +
        "- **Aschelminthes** (roundworms: **Ascaris**): a complete gut with a **muscular pharynx**. **Ancylostoma** is the **hookworm**, **Wuchereria** the filarial worm; the pinworm is Enterobius.\n\n" +
        "Protists such as Paramecium are at the **protoplasmic** grade.",
      table: {
        columns: ["Phylum", "Mark", "Example"],
        rows: [
          { cells: ["Porifera", "Cellular grade", "Sycon, Euplectella"], pyqExampleId: "e6faa4c0-2efc-4c9e-a0c9-496869387d05" },
          { cells: ["Cnidaria", "Radial symmetry", "Hydra, jellyfish"], pyqExampleId: "11ffdd92-0f06-4bf8-aac3-b45997ebc3e8" },
          { cells: ["Cnidaria", "Metagenesis", "Obelia"], pyqExampleId: "6f8fbc71-cfc9-4459-adeb-c777a65ade58" },
          { cells: ["Platyhelminthes", "Flame cells", "Tapeworm"], pyqExampleId: "9c7f5fd2-c4da-48c3-a397-5e1e9e45d93a" },
          { cells: ["Aschelminthes", "Muscular pharynx", "Ascaris"], pyqExampleId: "97ac8b40-9952-4c2f-b416-8a2ad3ec51ef" },
        ],
      },
      pyqExampleId: "31e6cf54-6608-4710-beb9-7ebc6d6b7d4f",
      selfCheckExample: {
        prompt: "Which of these is not a sponge: Spongilla, Hydra, Sycon, Euplectella?",
        steps: ["Spongilla, Sycon and Euplectella are all Porifera.", "Hydra is a cnidarian."],
        answer: "Hydra.",
      },
      practiceSet: [
        { prompt: "Which worm is Ancylostoma?", answer: "The hookworm" },
        { prompt: "What is Meandrina?", answer: "Brain coral" },
        { prompt: "What symmetry do cnidarians have?", answer: "Radial" },
      ],
      traps: [
        {
          title: "Euplectella is a sponge",
          body: "**Euplectella** (Venus's flower basket) is a **sponge**, so its grade is **cellular**, not tissue-organ.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbbcan-higher",
      name: "Annelids, arthropods, molluscs and echinoderms",
      intuition:
        "Higher invertebrates have segments, jointed legs, shells or spiny skins. Each phylum has one mark SSC names and a few examples.",
      definition:
        "The phyla:\n" +
        "- **Annelida** (earthworm, leech **Hirudinaria**, **Nereis**): ring segments; move with **setae** or **parapodia**.\n" +
        "- **Arthropoda**: **jointed legs** and an exoskeleton of **chitin** (not lignin); body in **head, thorax and abdomen**. The **largest** phylum, over 85% of known animals; **insects** are its largest class. Subphyla: **Hexapoda** (mosquito, butterfly, ant), **Crustacea** (**Daphnia**, crayfish), **Myriapoda** (**Julus**, a millipede), **Chelicerata** (**Limulus**, the king crab).\n" +
        "- **Mollusca** (**Pila**, octopus or devil fish): soft body, often a shell. **Pinctada margaritifera** is the **black-lip pearl oyster**.\n" +
        "- **Echinodermata** (**sea star**): spiny skin.",
      table: {
        columns: ["Phylum", "Example"],
        rows: [
          { cells: ["Annelida", "Earthworm, Nereis"], pyqExampleId: "34a351fb-95b5-462a-b720-f3d509a8a535" },
          { cells: ["Arthropoda", "Butterfly, ant, Limulus"], pyqExampleId: "688329bf-bad0-4353-9de2-482a09f6ccec" },
          { cells: ["Mollusca", "Pila, octopus, pearl oyster"], pyqExampleId: "8320689c-a6e6-435a-8ea3-fa04cb57d684" },
          { cells: ["Echinodermata", "Sea star"], pyqExampleId: "8f8f1352-4462-48fa-9640-7067ce1fa6e3" },
        ],
      },
      pyqExampleId: "781c9e6f-9313-4b94-9100-aad345b1367b",
      selfCheckExample: {
        prompt: "Match each to its arthropod subphylum: Daphnia, Julus, Limulus.",
        steps: ["Daphnia, the water flea, is a crustacean; Julus is a millipede, so Myriapoda.", "Limulus, the king crab, is a chelicerate."],
        answer: "Crustacea, Myriapoda, Chelicerata.",
      },
      practiceSet: [
        { prompt: "What is an arthropod's exoskeleton made of?", answer: "Chitin" },
        { prompt: "Which phylum is the devil fish (octopus) in?", answer: "Mollusca" },
        { prompt: "What helps annelids move?", answer: "Setae or parapodia" },
      ],
      traps: [
        {
          title: "Chitin, not lignin",
          body: "**Lignin** stiffens plant cell walls. A statement that arthropod exoskeletons are made of lignin is false; they are **chitin**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbbcan-vertebrates",
      name: "Reptiles, birds and mammals",
      intuition:
        "Among vertebrates SSC asks two things: whether a class is warm- or cold-blooded, and whether a genus name is a bird, a reptile or a mammal.",
      definition:
        "The classes:\n" +
        "- **Reptilia** (turtles, **chameleon**, snakes): **cold-blooded**, scaly, eggs on land. **Typhlops** is the **blind snake**.\n" +
        "- **Aves** (birds): **warm-blooded**, **four-chambered heart**, lungs, **all lay eggs**, pneumatic bones. Genera: **Psittacula** (parakeet), **Struthio** (ostrich), **Neophron** (vulture), **Pavo** (peacock).\n" +
        "- **Mammalia**: **warm-blooded**; most give birth to live young. **Pteropus**, the flying fox, is a **bat**, so a mammal. **Macropus** is the kangaroo.\n\n" +
        "The **gaur** (Indian bison) is the closest wild relative of domestic cattle, seen in Nagarhole and Bandipur.",
      table: {
        columns: ["Genus or animal", "Class"],
        rows: [
          { cells: ["Pteropus", "Mammal (bat)"], pyqExampleId: "2d7931a5-9b4c-44ba-b9fb-92106c0bd382" },
          { cells: ["Chameleon", "Reptile, cold-blooded"], pyqExampleId: "a8164f56-3d62-47fc-b0f3-496399de26ca" },
          { cells: ["Turtle", "Reptile"], pyqExampleId: "d4970ad0-b076-4dd5-af6c-126a6218989a" },
          { cells: ["Typhlops", "Reptile (blind snake)"], pyqExampleId: "3dee452c-1349-42f8-aac5-ed9391f6f84b" },
          { cells: ["Birds and mammals", "Both warm-blooded"], pyqExampleId: "1a3d86e4-cf68-446f-ba3e-3e9aadefe6bc" },
        ],
      },
      pyqExampleId: "c9c8ce36-d936-4592-bbef-8717334aece5",
      selfCheckExample: {
        prompt: "Which one of these is not a bird: Struthio, Neophron, Macropus, Psittacula?",
        steps: ["Struthio (ostrich), Neophron (vulture) and Psittacula (parakeet) are birds.", "Macropus is the kangaroo, a mammal."],
        answer: "Macropus.",
      },
      practiceSet: [
        { prompt: "Are reptiles warm- or cold-blooded?", answer: "Cold-blooded" },
        { prompt: "How many chambers does a bird's heart have?", answer: "Four" },
        { prompt: "Which wild animal is the closest relative of domestic cattle?", answer: "The gaur" },
      ],
      traps: [
        {
          title: "No bird gives birth to live young",
          body: "Live birth with a few egg-laying exceptions describes **mammals**. **All birds lay eggs**.",
        },
      ],
    },
  ],
};
