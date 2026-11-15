import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_AK_VERTEBRATES_NOTE: SubtopicNote = {
  subtopicName: "Vertebrate Classes",
  title: "Vertebrate Classes",
  oneLineDefinition:
    "The seven vertebrate classes from Cyclostomata to Mammalia: their skin, skeleton, gills or lungs, heart, body temperature and reproduction, and the example genera NCERT names.",
  whyItMatters:
    "Ten NEET questions from 2021 to 2026, the most of any page in this chapter, and NEET 2026 alone asked three. Five are about cyclostomes and fishes, mostly matching a genus with its common name or its class; the other five are about amphibians, reptiles, birds and mammals.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoak-fish-classes",
      name: "Cyclostomes and the two fish classes",
      intuition:
        "Three groups of fish-like animals live in water and breathe through gill slits. The cyclostomes have no jaws at all, just a round sucking mouth, and live as parasites on fishes. The cartilaginous fishes, like sharks, have powerful jaws, a skeleton of cartilage and no air bladder. The bony fishes have a skeleton of bone, a gill cover and an air bladder that keeps them afloat.",
      definition:
        "Class **Cyclostomata** (division Agnatha):\n" +
        "- **All living members are ectoparasites on some fishes.** The body is elongated, with **6 to 15 pairs of gill slits** for respiration.\n" +
        "- A **sucking, circular mouth without jaws**. No scales and no paired fins. The cranium and vertebral column are **cartilaginous**. Circulation is closed.\n" +
        "- They are marine but **migrate to fresh water for spawning**, and die within a few days after it. Their larvae return to the ocean after metamorphosis.\n\n" +
        "Class **Chondrichthyes** (cartilaginous fishes):\n" +
        "- Marine, streamlined, with a **cartilaginous endoskeleton**. The mouth is **ventral**. The **notochord persists throughout life**.\n" +
        "- Gill slits are separate and **without an operculum**. The tough skin has minute **placoid scales**; the **teeth are modified placoid scales**, backwardly directed. The jaws are very powerful; they are predators.\n" +
        "- With **no air bladder**, they must **swim constantly** to avoid sinking. The heart is **two-chambered** (one auricle, one ventricle). Some have **electric organs** (*Torpedo*) and some a **poison sting** (*Trygon*).\n" +
        "- Cold-blooded (poikilothermous). Sexes separate; male pelvic fins bear **claspers**. Fertilisation internal; many are viviparous.\n\n" +
        "Class **Osteichthyes** (bony fishes):\n" +
        "- Marine and fresh water, with a **bony endoskeleton**. The mouth is mostly **terminal**.\n" +
        "- **Four pairs of gills**, covered by an **operculum** on each side. The skin has **cycloid or ctenoid scales**.\n" +
        "- An **air bladder regulates buoyancy**. The heart is two-chambered. Cold-blooded.\n" +
        "- Sexes separate; fertilisation usually **external**; mostly oviparous, with direct development.",
      table: {
        columns: ["Feature", "Cyclostomata", "Chondrichthyes", "Osteichthyes"],
        rows: [
          { cells: ["Jaws and mouth", "No jaws; sucking, circular mouth", "Very powerful jaws; mouth ventral", "Jaws; mouth mostly terminal"] },
          { cells: ["Skeleton", "Cartilaginous cranium and vertebral column", "Cartilaginous; notochord persists for life", "Bony"] },
          { cells: ["Gills", "6 to 15 pairs of gill slits", "Separate gill slits, no operculum", "Four pairs of gills, each side covered by an operculum"] },
          { cells: ["Scales and fins", "No scales, no paired fins", "Minute placoid scales; teeth are modified placoid scales", "Cycloid or ctenoid scales"] },
          {
            cells: ["Way of life", "All living members ectoparasites on fishes", "Marine predators; no air bladder, so they swim constantly", "Marine and fresh water; air bladder regulates buoyancy"],
            noteAmber: "NEET 2025: all living members of Cyclostomata are ectoparasites.",
            pyqExampleId: "b0dd63da-660a-41b0-bdf1-be22db21be85",
          },
          { cells: ["Reproduction", "Migrate to fresh water to spawn, then die within days", "Claspers in males; internal fertilisation; many viviparous", "Usually external fertilisation; mostly oviparous"] },
          { cells: ["Examples", "Petromyzon (lamprey), Myxine (hagfish)", "Scoliodon, Pristis, Carcharodon, Trygon, Torpedo", "Exocoetus, Hippocampus, Labeo, Catla, Clarias, Betta, Pterophyllum"] },
        ],
      },
      pyqExampleId: "bea07589-0689-40a9-b28e-f6ca70eb7276",
      selfCheckExample: {
        prompt: "A fish has a cartilaginous skeleton and no air bladder. What must it do to avoid sinking, and to which class does it belong?",
        steps: [
          "The air bladder is what keeps a bony fish afloat.",
          "Cartilaginous fishes lack it, so they must swim constantly.",
        ],
        answer: "It must swim constantly; it is in Chondrichthyes.",
      },
      practiceSet: [
        { prompt: "What are the teeth of a cartilaginous fish modified from?", answer: "Placoid scales" },
        { prompt: "What covers the gills of a bony fish?", answer: "The operculum, one on each side" },
        { prompt: "What do the pelvic fins of a male cartilaginous fish bear?", answer: "Claspers" },
        { prompt: "Where do cyclostomes go to spawn, and what happens to them afterwards?", answer: "To fresh water; they die within a few days" },
        { prompt: "How many chambers does the heart of a fish have?", answer: "Two: one auricle and one ventricle" },
      ],
      traps: [
        {
          title: "The notochord persists in cartilaginous fishes",
          body: "In **Chondrichthyes** the **notochord persists throughout life**. A statement saying so is correct.",
        },
        {
          title: "Cyclostomes are ectoparasites",
          body: "All living **cyclostomes** are **ectoparasites** on some fishes, not free-living, endoparasitic or symbiotic. They have **no jaws and no paired fins**.",
        },
        {
          title: "Only bony fishes have an operculum and an air bladder",
          body: "**Osteichthyes** have a gill cover (**operculum**) and an **air bladder**. **Chondrichthyes** have neither.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-fish-names",
      name: "Fish names: genus, common name and class",
      intuition:
        "Fish questions in NEET are often lists of genus names to match with a common name or a class. Sort them first by class: two jawless cyclostomes, the cartilaginous sharks and rays, and the bony fishes, which NCERT splits into marine, fresh water and aquarium kinds. Then remember the three animals with fish in their names that are not fish at all.",
      definition:
        "NCERT's examples:\n" +
        "- **Cyclostomata:** *Petromyzon* (lamprey), *Myxine* (hagfish).\n" +
        "- **Chondrichthyes:** *Scoliodon* (dog fish), *Pristis* (saw fish), *Carcharodon* (great white shark), *Trygon* (sting ray); *Torpedo* has electric organs.\n" +
        "- **Osteichthyes, marine:** *Exocoetus* (flying fish), *Hippocampus* (sea horse).\n" +
        "- **Osteichthyes, fresh water:** *Labeo* (rohu), *Catla* (katla), *Clarias* (magur).\n" +
        "- **Osteichthyes, aquarium:** *Betta* (fighting fish), *Pterophyllum* (angel fish).\n\n" +
        "Not fish: the **devil fish** (*Octopus*) and the **cuttlefish** (*Sepia*) are molluscs, and the **star fish** (*Asterias*) is an echinoderm.",
      table: {
        columns: ["Genus", "Common name or feature", "Class"],
        rows: [
          { cells: ["Petromyzon", "Lamprey", "Cyclostomata"] },
          {
            cells: ["Myxine", "Hagfish", "Cyclostomata"],
            noteAmber: "Re-NEET 2024: Myxine goes with Cyclostomata, Carcharodon with Chondrichthyes, Clarias with Osteichthyes and Ichthyophis with Amphibia.",
            pyqExampleId: "51694d52-667a-4ea0-bf75-ba8d899829e0",
          },
          { cells: ["Scoliodon", "Dog fish", "Chondrichthyes"] },
          { cells: ["Pristis", "Saw fish", "Chondrichthyes"] },
          { cells: ["Carcharodon", "Great white shark", "Chondrichthyes"] },
          { cells: ["Trygon", "Sting ray, with a poison sting", "Chondrichthyes"] },
          { cells: ["Torpedo", "Has electric organs", "Chondrichthyes"] },
          {
            cells: ["Exocoetus", "Flying fish (marine)", "Osteichthyes"],
            noteAmber: "NEET 2024: Pterophyllum is the angel fish, Myxine the hagfish, Pristis the saw fish and Exocoetus the flying fish.",
            pyqExampleId: "ba66b3c6-e303-42d5-aa9c-83d4a7e0d76d",
          },
          { cells: ["Hippocampus", "Sea horse (marine)", "Osteichthyes"] },
          { cells: ["Labeo", "Rohu (fresh water)", "Osteichthyes"] },
          { cells: ["Catla", "Katla (fresh water)", "Osteichthyes"] },
          { cells: ["Clarias", "Magur (fresh water)", "Osteichthyes"] },
          { cells: ["Betta", "Fighting fish (aquarium)", "Osteichthyes"] },
          { cells: ["Pterophyllum", "Angel fish (aquarium)", "Osteichthyes"] },
        ],
      },
      pyqExampleId: "2c089eef-7ea8-479c-8591-3590f3b29009",
      selfCheckExample: {
        prompt: "Name the three fresh water bony fishes NCERT lists, with their common names.",
        steps: [
          "NCERT splits its bony fish examples into marine, fresh water and aquarium fishes.",
          "The fresh water list has three genera, each with an Indian common name.",
        ],
        answer: "Labeo (rohu), Catla (katla) and Clarias (magur).",
      },
      practiceSet: [
        { prompt: "What is Carcharodon commonly called?", answer: "The great white shark" },
        { prompt: "Which cartilaginous fish does NCERT name for its poison sting?", answer: "Trygon, the sting ray" },
        { prompt: "Which cartilaginous fish does NCERT name for its electric organs?", answer: "Torpedo" },
        { prompt: "What is Hippocampus commonly called, and is it a marine or a fresh water fish?", answer: "The sea horse; marine" },
      ],
      traps: [
        {
          title: "Devil fish, cuttlefish and star fish are not fish",
          body: "*Octopus* (devil fish) and *Sepia* (cuttlefish) are **molluscs**, and *Asterias* (star fish) is an **echinoderm**. None of them belongs to Pisces.",
        },
        {
          title: "The hagfish is a cyclostome",
          body: "*Myxine*, the **hagfish**, is a jawless **cyclostome**, like the lamprey *Petromyzon*. It is not a bony fish.",
        },
        {
          title: "Saw fish and dog fish are cartilaginous",
          body: "*Pristis* (saw fish) and *Scoliodon* (dog fish) are **Chondrichthyes**. The **fighting fish** *Betta* and the **angel fish** *Pterophyllum* are bony aquarium fishes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-tetrapods",
      name: "Amphibians, reptiles, birds and mammals",
      intuition:
        "The four classes with limbs make a ladder. Amphibians still need water: moist skin, external fertilisation and a larva. Reptiles live on land with dry, scaly skin, but like amphibians they are cold-blooded. Birds and mammals are warm-blooded with a four-chambered heart. Birds have feathers and hollow bones; mammals have hair, ear flaps and milk glands.",
      definition:
        "Class **Amphibia**:\n" +
        "- Live in water and on land; most have **two pairs of limbs**; body of head and trunk, a tail in some. **Moist skin without scales.** Eyes have eyelids; a **tympanum represents the ear**.\n" +
        "- The alimentary canal, urinary and reproductive tracts open into a common chamber, the **cloaca**. Respiration by **gills, lungs and skin**. **Three-chambered heart** (two auricles, one ventricle). Cold-blooded.\n" +
        "- Sexes separate; fertilisation **external**; oviparous; development **indirect**.\n\n" +
        "Class **Reptilia**:\n" +
        "- The name refers to their **creeping or crawling** mode of locomotion. Mostly terrestrial, with **dry, cornified skin and epidermal scales or scutes**. **No external ear openings**; a tympanum represents the ear. Limbs, when present, are two pairs.\n" +
        "- **Heart usually three-chambered, but four-chambered in crocodiles.** They are **poikilotherms** (cold-blooded). Snakes and lizards shed their scales as skin cast.\n" +
        "- Sexes separate; fertilisation **internal**; oviparous; development **direct**.\n\n" +
        "Class **Aves**:\n" +
        "- **Feathers**; most can fly except flightless birds such as the ostrich. A **beak**; **forelimbs modified into wings**; scaly hind limbs for walking, swimming or clasping branches. Dry skin with **no glands except the oil gland** at the base of the tail.\n" +
        "- The endoskeleton is fully ossified and the **long bones are hollow with air cavities (pneumatic)**. The digestive tract has extra chambers, the **crop and gizzard**. **Completely four-chambered heart.** Warm-blooded (homoiothermous). Lungs, with **air sacs** that supplement respiration.\n" +
        "- Sexes separate; fertilisation internal; oviparous; development direct.\n\n" +
        "Class **Mammalia**:\n" +
        "- The most unique mammalian feature is the **milk-producing mammary glands**. The skin has **hair**; **external ears (pinnae)** are present; the jaw has different types of teeth.\n" +
        "- Two pairs of limbs, adapted for walking, running, climbing, burrowing, swimming or flying. Four-chambered heart. Warm-blooded. Lungs.\n" +
        "- Sexes separate; fertilisation internal; **viviparous with few exceptions** (*Ornithorhynchus* lays eggs); development direct.",
      table: {
        columns: ["Feature", "Amphibia", "Reptilia", "Aves", "Mammalia"],
        rows: [
          { cells: ["Skin", "Moist, no scales", "Dry, cornified, with scales or scutes", "Feathers; only the oil gland", "Hair; mammary glands"] },
          {
            cells: ["Heart", "Three chambers", "Usually three; four in crocodiles", "Four chambers", "Four chambers"],
            noteAmber: "Re-NEET 2026: the class name Reptilia means creeping or crawling, but not every reptile has a three-chambered heart.",
          },
          { cells: ["Body temperature", "Cold-blooded", "Cold-blooded (poikilotherms)", "Warm-blooded", "Warm-blooded"] },
          { cells: ["Fertilisation and young", "External; oviparous; indirect development", "Internal; oviparous; direct", "Internal; oviparous; direct", "Internal; viviparous with few exceptions; direct"] },
          {
            cells: ["Special features", "Cloaca; eyelids; tympanum as the ear", "No external ear opening; skin cast shed by snakes and lizards", "Pneumatic long bones; crop and gizzard; air sacs", "Mammary glands, hair and pinnae"],
            noteAmber: "NEET 2022: a crop and gizzard mark birds, so Pavo, Psittacula and Corvus was the right set.",
            pyqExampleId: "e40193b4-6780-42a6-b866-dd70ea82c1a1",
          },
          {
            cells: ["Examples", "Bufo, Rana, Hyla, Salamandra, Ichthyophis", "Chelone, Testudo, Chameleon, Calotes, Crocodilus, Alligator, Hemidactylus, Naja, Bangarus, Vipera", "Corvus, Columba, Psittacula, Struthio, Pavo, Aptenodytes, Neophron", "Ornithorhynchus, Macropus, Pteropus, Camelus, Macaca, Rattus, Canis, Felis, Elephas, Equus, Delphinus, Balaenoptera, Panthera"],
            noteAmber: "NEET 2026: Aptenodytes, the penguin, was the flightless bird whose forelimbs are paddle-like for swimming.",
            pyqExampleId: "102d9367-c5ac-447d-9c2e-3a5d4e6c5f72",
          },
        ],
      },
      pyqExampleId: "7f7ac89a-1582-4a7d-97ce-46ebd88ac14f",
      selfCheckExample: {
        prompt: "Which reptile group does NCERT name as the exception to the three-chambered reptile heart?",
        steps: [
          "NCERT says the reptile heart is usually three-chambered.",
          "It names one exception, with a four-chambered heart.",
        ],
        answer: "The crocodiles (Crocodilus), with a four-chambered heart.",
      },
      practiceSet: [
        { prompt: "Into which common chamber do the alimentary canal, urinary and reproductive tracts of an amphibian open?", answer: "The cloaca" },
        { prompt: "What is the only skin gland of a bird, and where is it?", answer: "The oil gland, at the base of the tail" },
        { prompt: "What supplements the lungs in the respiration of birds?", answer: "Air sacs connected to the lungs" },
        { prompt: "Name the limbless amphibian in NCERT's list of examples.", answer: "Ichthyophis" },
        { prompt: "Name the egg-laying mammal NCERT lists.", answer: "Ornithorhynchus, the platypus" },
        { prompt: "What do snakes and lizards shed as skin cast?", answer: "Their scales" },
      ],
      traps: [
        {
          title: "Not every reptile has a three-chambered heart",
          body: "The reptile heart is **usually** three-chambered, but **crocodiles have a four-chambered heart**. A statement that all reptiles have three chambers is false.",
        },
        {
          title: "The tympanum is not unique to mammals",
          body: "Amphibians and reptiles have a **tympanum** too. The features found only in mammals are **mammary glands, hair and external ears (pinnae)**.",
        },
        {
          title: "Reptiles cannot keep a constant body temperature",
          body: "Reptiles are **poikilotherms** (cold-blooded). Only **birds and mammals** are warm-blooded and keep a constant body temperature.",
        },
        {
          title: "Amphibian fertilisation is external",
          body: "**Amphibians** have **external** fertilisation and indirect development; **reptiles, birds and mammals** have **internal** fertilisation and direct development.",
        },
        {
          title: "Not all mammals give birth to live young",
          body: "Mammals are **viviparous with few exceptions**: *Ornithorhynchus*, the platypus, lays eggs.",
        },
      ],
    },
  ],
};
