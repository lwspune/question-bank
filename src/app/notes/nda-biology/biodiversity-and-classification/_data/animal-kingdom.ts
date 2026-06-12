import type { SubtopicNote } from "@/app/notes/_types";

export const ANIMAL_KINGDOM_NOTE: SubtopicNote = {
  subtopicName: "Animal Kingdom Classification",
  title: "Naming, Hierarchy and the Animal Kingdom",
  oneLineDefinition:
    "Classification names every organism with a two-word Latin name (binomial nomenclature) and files it into a nested hierarchy — Kingdom → Phylum → Class → Order → Family → Genus → Species; the animal kingdom is then split into invertebrate phyla (Porifera, Arthropoda…) and vertebrate classes (Pisces up to Mammalia).",
  whyItMatters:
    "This subtopic carries 5 of the 11 PYQs and starts with the two rules every classification question rests on: how to write a scientific name (genus capitalised, species lowercase, both italicised) and the order of the taxonomic hierarchy. " +
    "After that it is recall of the animal phyla — the bank's favourite is 'which phylum are sponges?' (Porifera). All EASY or MODERATE.",
  concepts: [
    // Foundation 1 — taxonomic hierarchy (HAS a PYQ)
    {
      kind: "formula" as const,
      slug: "biodiv-taxonomic-hierarchy",
      name: "The taxonomic hierarchy — Kingdom to Species",
      intuition:
        "Classification is a set of nested boxes, broadest to narrowest. The biggest box (Kingdom) holds the most organisms with the least in common; the smallest box (Species) holds organisms so alike they can interbreed. " +
        "Each step down adds shared features and removes members.",
      definition:
        "The seven main ranks of the **taxonomic hierarchy**, from highest (broadest) to lowest (narrowest):\n" +
        "**Kingdom → Phylum → Class → Order → Family → Genus → Species**\n" +
        "- **Kingdom** — broadest (e.g. Animalia).\n" +
        "- **Phylum** — major body plan (e.g. Chordata).\n" +
        "- **Class → Order → Family** — progressively finer groupings.\n" +
        "- **Genus** — closely related species (e.g. *Panthera*).\n" +
        "- **Species** — the narrowest; members interbreed (e.g. *Panthera leo*, the lion).\n" +
        "A common mnemonic: **K**ing **P**hilip **C**ame **O**ver **F**or **G**ood **S**oup.",
      authoredExample: {
        prompt:
          "Arrange these ranks from the broadest to the narrowest group: Family, Kingdom, Genus, Order.",
        steps: [
          "Kingdom is the broadest box of all.",
          "Order sits above Family in the hierarchy (Order → Family).",
          "Genus is narrower than Family.",
          "So broadest to narrowest: Kingdom → Order → Family → Genus.",
        ],
        answer: "Kingdom → Order → Family → Genus.",
      },
      selfCheckExample: {
        prompt:
          "Which is the correct sequence of the hierarchy from HIGHER to LOWER: Phylum, Class, Order, Family, Genus?",
        steps: [
          "The full order is Kingdom → Phylum → Class → Order → Family → Genus → Species.",
          "Dropping Kingdom and Species, the given ranks keep their order.",
          "So Phylum → Class → Order → Family → Genus.",
        ],
        answer: "Phylum → Class → Order → Family → Genus.",
      },
      practiceSet: [
        { prompt: "What is the broadest rank in the taxonomic hierarchy?", answer: "Kingdom" },
        { prompt: "What is the narrowest (most specific) rank?", answer: "Species" },
        { prompt: "Which rank sits between Class and Family?", answer: "Order", method: "Class → Order → Family" },
        { prompt: "Which rank sits just above Species?", answer: "Genus" },
      ],
      pyqExampleId: "fe8a54b0-08ec-49b4-82d4-b2b427b60083", // hierarchy higher→lower
      traps: [
        {
          title: "Order comes BEFORE Family",
          body:
            "The trap distractors swap Order and Family (e.g. 'Class – Family – Order'). The correct sequence is **Class → Order → Family**. Use the mnemonic: King Philip Came **O**ver **F**or — Order before Family.",
        },
      ],
    },

    // Foundation 2 — binomial nomenclature (HAS a PYQ)
    {
      kind: "formula" as const,
      slug: "biodiv-binomial-nomenclature",
      name: "Binomial nomenclature — writing a scientific name",
      intuition:
        "Common names cause chaos — the same animal has dozens of local names. So every species gets one universal two-word Latin name. The rules for writing it are strict and fully testable: two words, the first (genus) capitalised, the second (species) lowercase, both in italics.",
      definition:
        "**Binomial nomenclature** (introduced by **Carolus Linnaeus**) gives each organism a unique two-word Latin name. The rules:\n" +
        "- **Two words**: the first is the **genus**, the second is the **species** epithet.\n" +
        "- The **genus is Capitalised**; the **species is lowercase**.\n" +
        "- Both words are written in **italics** (or **underlined** separately when handwritten).\n" +
        "- Example: ***Amoeba proteus***, ***Homo sapiens***, ***Panthera leo***.",
      authoredExample: {
        prompt:
          "Which of these is the correctly written scientific name for the house cat: 'felis catus', 'Felis Catus', or 'Felis catus' (all in italics)?",
        steps: [
          "The genus (Felis) must be capitalised — rules out 'felis catus'.",
          "The species epithet (catus) must be lowercase — rules out 'Felis Catus'.",
          "'Felis catus', italicised, has a capital genus and lowercase species → correct.",
        ],
        answer: "Felis catus (genus capitalised, species lowercase, both italic).",
      },
      selfCheckExample: {
        prompt:
          "Spot the error in each: (a) Homo Sapiens, (b) homo sapiens, (c) Homo sapiens. Which is correct?",
        steps: [
          "(a) Homo Sapiens — species wrongly capitalised → wrong.",
          "(b) homo sapiens — genus wrongly lowercase → wrong.",
          "(c) Homo sapiens — genus capital, species lowercase → correct.",
        ],
        answer: "(c) Homo sapiens is correct.",
      },
      practiceSet: [
        { prompt: "How many words are in a binomial name?", answer: "Two — genus + species" },
        { prompt: "Which word is capitalised: genus or species?", answer: "Genus", method: "species epithet stays lowercase" },
        { prompt: "How are scientific names printed?", answer: "In italics", method: "or underlined when handwritten" },
        { prompt: "Who introduced binomial nomenclature?", answer: "Carolus Linnaeus" },
      ],
      pyqExampleId: "860087ed-2599-4d1f-8411-1ad0bb090b20", // correct way to write Amoeba proteus
      traps: [
        {
          title: "Genus capital, species lowercase — never both capitals",
          body:
            "The distractors capitalise the species ('Amoeba Proteus') or lowercase the genus ('amoeba proteus'). Only **Genus capital + species lowercase + italics** is correct: *Amoeba proteus*.",
        },
        {
          title: "Linnaeus is the father of taxonomy",
          body:
            "Carolus Linnaeus introduced binomial nomenclature and the modern classification system. Note a separate Indian botanist, **Panchanan Maheshwari**, popularised using **embryological characters** in taxonomy — don't confuse the two.",
        },
      ],
    },

    // History of taxonomy — embryological characters (MODERATE PYQ)
    {
      kind: "reference" as const,
      slug: "biodiv-taxonomy-contributors",
      name: "Key contributors to taxonomy",
      intuition:
        "A few names recur in NDA taxonomy questions. Linnaeus built the system; some Indian scientists added specific techniques. The most-tested pairing is Panchanan Maheshwari with embryological characters.",
      definition:
        "The contributors the bank names, and what each is known for:\n" +
        "- **Carolus Linnaeus** — father of modern taxonomy; gave **binomial nomenclature** and the hierarchy.\n" +
        "- **Panchanan Maheshwari** — Indian botanist; popularised the use of **embryological characters** in plant taxonomy.\n" +
        "- **Birbal Sahni** — Indian palaeobotanist (fossil plants), not a taxonomy-method figure.\n" +
        "- **Bentham and Hooker** — gave a major natural classification of flowering plants.",
      table: {
        columns: ["Scientist", "Known for"],
        rows: [
          { cells: ["**Carolus Linnaeus**", "Binomial nomenclature; father of taxonomy"] },
          {
            cells: ["**Panchanan Maheshwari**", "Popularised **embryological characters** in taxonomy"],
            noteAmber: "NDA 2019 — embryological characters in taxonomy = Panchanan Maheshwari.",
          },
          { cells: ["**Birbal Sahni**", "Palaeobotany (fossil plants)"] },
          { cells: ["**Bentham and Hooker**", "Natural classification of flowering plants"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which scientist popularised the use of embryological characters in taxonomy?",
        steps: [
          "Linnaeus gave nomenclature, not embryology-based taxonomy.",
          "Birbal Sahni worked on fossil plants; Bentham and Hooker gave a classification scheme.",
          "Panchanan Maheshwari is the embryology-in-taxonomy figure.",
        ],
        answer: "Panchanan Maheshwari.",
      },
      practiceSet: [
        { prompt: "Who popularised embryological characters in taxonomy?", answer: "Panchanan Maheshwari" },
        { prompt: "Who is called the father of taxonomy?", answer: "Carolus Linnaeus" },
        { prompt: "Birbal Sahni is known for which field?", answer: "Palaeobotany (fossil plants)" },
      ],
      pyqExampleId: "81b5905a-08b3-4bb7-825b-2ba4bcd6fb60", // embryological characters → Maheshwari
      traps: [
        {
          title: "Maheshwari = embryology, Sahni = fossils",
          body:
            "Both are Indian botanists, so the bank pairs them as distractors. **Panchanan Maheshwari** → embryological characters in taxonomy; **Birbal Sahni** → palaeobotany (fossil plants). Keep the two apart.",
        },
      ],
    },

    // Animal phyla and vertebrate classes (REFERENCE)
    {
      kind: "reference" as const,
      slug: "biodiv-animal-phyla",
      name: "Animal phyla and vertebrate classes",
      intuition:
        "The animal kingdom splits first into the major phyla (sponges, cnidarians, worms, arthropods, molluscs, echinoderms, chordates). The chordates are then split into vertebrate classes — Pisces (fish), Amphibia, Reptilia, Aves (birds), Mammalia. " +
        "The NDA's favourite is the simplest: sponges = phylum Porifera. Watch the '-fish' trap, where most '-fish' names are NOT fish.",
      definition:
        "Major **animal phyla** and the **vertebrate classes**:\n" +
        "- **Porifera** — **sponges** (pore-bearing, simplest animals).\n" +
        "- **Coelenterata (Cnidaria)** — jellyfish, Hydra, corals (stinging cells).\n" +
        "- **Platyhelminthes** — flatworms (tapeworm, planaria).\n" +
        "- **Arthropoda** — the **largest** phylum; jointed legs + exoskeleton (insects, spiders, crabs; silverfish is an insect).\n" +
        "- **Echinodermata** — spiny-skinned marine animals (starfish, sea urchin).\n" +
        "- **Chordata** — animals with a notochord; includes the **vertebrates**, split into classes: **Pisces** (fish, e.g. dogfish), **Amphibia** (frog), **Reptilia** (snake), **Aves** (birds), **Mammalia** (humans, whales).",
      table: {
        columns: ["Group", "What it is", "Examples"],
        rows: [
          {
            cells: ["**Porifera**", "Sponges (pore-bearing)", "Sponge, Sycon"],
            noteAmber: "NDA 2024 — sponges belong to phylum Porifera.",
          },
          { cells: ["**Coelenterata**", "Stinging-cell animals", "Jellyfish, Hydra, coral"] },
          { cells: ["**Platyhelminthes**", "Flatworms", "Tapeworm, planaria"] },
          { cells: ["**Arthropoda**", "Jointed legs, exoskeleton (largest phylum)", "Insects, spiders, crabs, **silverfish**"] },
          { cells: ["**Echinodermata**", "Spiny-skinned marine animals", "**Starfish**, sea urchin"] },
          {
            cells: ["**Pisces** (a class)", "True fish (cartilaginous or bony)", "**Dogfish**, shark, rohu"],
            noteAmber: "NDA 2022 — of jellyfish / silverfish / starfish / dogfish, only DOGFISH is a true fish (Pisces).",
          },
        ],
        caption:
          "The '-fish' trap: jellyfish (cnidarian), silverfish (insect) and starfish (echinoderm) are NOT fish — only dogfish is.",
      },
      selfCheckExample: {
        prompt:
          "Of jellyfish, silverfish, starfish and dogfish, which one is a true fish (class Pisces), and where do the other three belong?",
        steps: [
          "Jellyfish — a cnidarian (Coelenterata), not a fish.",
          "Silverfish — a wingless insect (Arthropoda), not a fish.",
          "Starfish — an echinoderm (Echinodermata), not a fish.",
          "Dogfish — a cartilaginous fish → class Pisces.",
        ],
        answer: "Only dogfish is a true fish (Pisces); the others are a cnidarian, an insect and an echinoderm.",
      },
      practiceSet: [
        { prompt: "Sponges belong to which phylum?", answer: "Porifera", method: "pore-bearing" },
        { prompt: "Which is the largest animal phylum?", answer: "Arthropoda", method: "jointed legs + exoskeleton" },
        { prompt: "Starfish belongs to which phylum?", answer: "Echinodermata", method: "spiny-skinned; NOT a fish" },
        { prompt: "Which class do true fish belong to?", answer: "Pisces", method: "e.g. dogfish, shark" },
      ],
      pyqExampleId: "a7108d1d-27da-4ee0-912e-e8d556556825", // sponges = Porifera
      traps: [
        {
          title: "Most '-fish' names are NOT fish",
          body:
            "Jellyfish (Coelenterata), silverfish (Arthropoda) and starfish (Echinodermata) all carry 'fish' in their name but belong to other phyla. Only animals in class **Pisces** (dogfish, shark, rohu) are true fish.",
        },
        {
          title: "Sponges = Porifera, not Coelenterata",
          body:
            "Sponges are the **simplest** animals — phylum **Porifera** (meaning 'pore-bearing'). Don't confuse them with Coelenterata (jellyfish, Hydra), which have stinging cells.",
        },
      ],
    },
  ],
};
