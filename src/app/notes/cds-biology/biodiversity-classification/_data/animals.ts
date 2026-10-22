import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_BD_ANIMALS_NOTE: SubtopicNote = {
  subtopicName: "Animal Phyla and Classes",
  title: "Animal Phyla and Classes",
  oneLineDefinition:
    "The animal phyla from sponges to echinoderms, the organs animals and protists move with, and the chordate classes with their hearts and body temperature.",
  whyItMatters:
    "Eleven CDS questions from 2018 (I) to 2025 (I), three of them in the 2018 (I) paper. Five are about chordates, and the three-chambered heart has been asked twice. Nereis, the sea worm, has also come up twice: once for its symmetry and once for how it moves.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbibd-lower",
      name: "Sponges, cnidarians and worms",
      intuition:
        "The simplest animals are sorted by their body plan. Sponges have no real tissues, only a body full of pores. Cnidarians such as Hydra are built round a centre, like a wheel, so any cut through the middle gives two equal halves. Worms have a head end and a tail end, so only one cut, down the middle, gives two mirror halves: that is bilateral symmetry.",
      definition:
        "The non-chordate phyla up to the annelids (NCERT Class 9 and 11):\n" +
        "- **Porifera**: the **sponges**; a body full of **pores** through which water flows; no true tissues; mostly marine; for example Sycon, Spongilla.\n" +
        "- **Cnidaria (Coelenterata)**: **radial symmetry**; stinging cells (cnidoblasts); for example Hydra, jellyfish, sea anemone.\n" +
        "- **Platyhelminthes**: **flatworms**; bilateral symmetry; mostly parasites (liver fluke, tapeworm) but **Planaria is free-living** in fresh water.\n" +
        "- **Aschelminthes (Nematoda)**: **roundworms**; for example Ascaris and **Wuchereria** (filarial worm), both parasites.\n" +
        "- **Annelida**: **segmented** worms with bilateral symmetry; for example earthworm, leech and **Nereis**, a marine worm.\n" +
        "- From the flatworms upward, nearly all animals are **bilaterally symmetrical**. The echinoderms are the odd case: the adults are radial, the larvae bilateral.",
      table: {
        columns: ["Phylum", "Body plan", "Examples"],
        rows: [
          { cells: ["Porifera", "Pores, no true tissues", "Sycon, Spongilla"] },
          { cells: ["Cnidaria", "Radial symmetry, stinging cells", "Hydra, jellyfish, sea anemone"] },
          {
            cells: ["Platyhelminthes", "Flat, bilateral symmetry", "Planaria (free-living), liver fluke, tapeworm"],
            noteAmber: "CDS 2021 (I): Planaria is the free-living animal; liver fluke, Wuchereria and Plasmodium are parasites.",
            pyqExampleId: "5b3b9144-b5e5-425b-ba45-4597c4d7b011",
          },
          { cells: ["Aschelminthes", "Round, unsegmented", "Ascaris, Wuchereria"] },
          {
            cells: ["Annelida", "Segmented, bilateral symmetry", "Earthworm, leech, Nereis"],
            noteAmber: "CDS 2019 (I): Nereis is the bilaterally symmetrical one; sea anemone, starfish and sea urchin are not.",
            pyqExampleId: "8f5bcbc7-afb8-415b-9821-c63a4b366ede",
          },
        ],
      },
      pyqExampleId: "d5c40ecc-81c8-400a-a405-8c20ffc1e3b9",
      selfCheckExample: {
        prompt: "Sort these by symmetry: Hydra, earthworm, tapeworm and jellyfish.",
        steps: [
          "Hydra and jellyfish are cnidarians, built round a central axis, so they are radially symmetrical.",
          "The earthworm (an annelid) and the tapeworm (a flatworm) have a head end and a tail end.",
          "Only one cut, along the length, divides them into mirror halves, so they are bilaterally symmetrical.",
        ],
        answer: "Radial: Hydra and jellyfish. Bilateral: earthworm and tapeworm.",
      },
      practiceSet: [
        { prompt: "Which phylum has stinging cells called cnidoblasts?", answer: "Cnidaria" },
        { prompt: "In which phylum is Wuchereria, the worm that causes filariasis?", answer: "Aschelminthes (roundworms)" },
        { prompt: "Which phylum of worms has a body divided into segments?", answer: "Annelida" },
        { prompt: "What kind of symmetry does Hydra show?", answer: "Radial symmetry" },
      ],
      traps: [
        {
          title: "Not every flatworm is a parasite",
          body: "Liver fluke and tapeworm are parasites, but **Planaria** is a **free-living** flatworm of fresh water. Plasmodium, often listed beside them, is not a worm at all: it is a single-celled protist.",
        },
        {
          title: "Starfish are radial as adults",
          body: "Starfish (Asterias) and sea urchins (Echinus) are echinoderms whose **adults** have five-part **radial** symmetry. The bilaterally symmetrical choice is the worm, such as **Nereis**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-locomotion",
      name: "Organs of locomotion",
      intuition:
        "Each group of small animals and protists moves with its own tool. Some lash a long whip, some beat many tiny hairs, and Amoeba simply pushes out a bulge of its body and flows into it. Learn each pair, because the papers mix them up and ask which pair is wrong.",
      definition:
        "How some organisms move (NCERT Class 11):\n" +
        "- **Amoeba**: **pseudopodia** (false feet), temporary outgrowths of the cell.\n" +
        "- **Euglena**: a long **flagellum**, a whip (it has a second, very short one).\n" +
        "- **Paramecium**: **cilia**, many short hairs that beat together.\n" +
        "- **Nereis**: **parapodia**, flat side flaps on each segment, used for swimming.\n" +
        "- **Earthworm**: muscles in the body wall, helped by tiny bristles called **setae**.\n" +
        "- **Starfish**: **tube feet**, worked by the water vascular system.\n" +
        "- **Snail and other molluscs**: a **muscular foot**.",
      table: {
        columns: ["Organism", "Organ of locomotion"],
        rows: [
          { cells: ["Amoeba", "Pseudopodia"] },
          { cells: ["Euglena", "Flagellum"] },
          { cells: ["Paramecium", "Cilia"] },
          {
            cells: ["Nereis", "Parapodia"],
            noteAmber: "CDS 2018 (I): Nereis with pseudopodia is the wrongly matched pair.",
            pyqExampleId: "bf7718a3-8f6e-40a7-b76c-43e7ad7a3996",
          },
          { cells: ["Earthworm", "Body-wall muscles and setae"] },
          { cells: ["Starfish", "Tube feet"] },
          { cells: ["Snail", "Muscular foot"] },
        ],
      },
      pyqExampleId: "bf7718a3-8f6e-40a7-b76c-43e7ad7a3996",
      selfCheckExample: {
        prompt: "Name the organ of locomotion of each: Amoeba, earthworm and snail.",
        steps: [
          "Amoeba pushes out temporary bulges of its cell, the pseudopodia, and flows into them.",
          "An earthworm moves by its body-wall muscles, gripping the soil with bristles called setae.",
          "A snail is a mollusc and creeps on its muscular foot.",
        ],
        answer: "Amoeba: pseudopodia. Earthworm: muscles with setae. Snail: muscular foot.",
      },
      practiceSet: [
        { prompt: "Which protist moves by pseudopodia?", answer: "Amoeba" },
        { prompt: "What are the tiny bristles on an earthworm's body that help it move called?", answer: "Setae" },
        { prompt: "On what organ does a snail creep?", answer: "Its muscular foot" },
        { prompt: "Are the pseudopodia of Amoeba permanent or temporary?", answer: "Temporary: they form and disappear as it moves" },
      ],
      traps: [
        {
          title: "Pseudopodia belong to Amoeba",
          body: "**Pseudopodia** are the temporary bulges of **Amoeba**. The sea worm **Nereis** swims with **parapodia**, flaps on its segments. The two words differ by two letters, which is the whole trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-arthropods",
      name: "Arthropods, molluscs and echinoderms",
      intuition:
        "Arthropods are the largest phylum on Earth: insects, spiders, crabs and centipedes. Their one sure sign is jointed legs. Molluscs have a soft body, often inside a shell, and creep on a muscular foot. Echinoderms are sea animals with spiny skin, and they move on tube feet.",
      definition:
        "Three big non-chordate phyla:\n" +
        "- **Arthropoda**: **jointed legs** (the name means jointed feet), a hard **exoskeleton** of chitin, a segmented body. **Insects** have **six legs** and three body parts; spiders have eight legs.\n" +
        "- **Mollusca**: soft, unsegmented body, usually with a **shell**, and a **muscular foot**; for example Pila (apple snail), oyster, octopus, cuttlefish. **Pearls** form inside the **pearl oyster**, which lays down layers of nacre around a grain that gets inside its shell.\n" +
        "- **Echinodermata**: spiny skin, a **water vascular system** with **tube feet**; all marine; for example starfish (Asterias), sea urchin (Echinus).\n" +
        "- Segmentation, a long body and bilateral symmetry are found in **both** annelids and arthropods. Only **jointed legs** tell an insect from an earthworm.",
      table: {
        columns: ["Phylum", "Sure sign", "Examples"],
        rows: [
          {
            cells: ["Arthropoda", "Jointed legs, exoskeleton", "Insects, spiders, prawn, silverfish"],
            noteAmber: "CDS 2021 (II): jointed legs confirm that an animal is an insect and not an earthworm.",
            pyqExampleId: "4bb407fb-d775-4473-b6e8-196e6646ab1e",
          },
          {
            cells: ["Mollusca", "Soft body, shell, muscular foot", "Oyster, Pila, octopus, cuttlefish"],
            noteAmber: "CDS 2020 (II): pearls are harvested from oysters.",
            pyqExampleId: "88773f32-20d8-4ea7-a7bd-a70427d4add2",
          },
          { cells: ["Echinodermata", "Spiny skin, tube feet", "Starfish, sea urchin"] },
        ],
      },
      pyqExampleId: "4bb407fb-d775-4473-b6e8-196e6646ab1e",
      selfCheckExample: {
        prompt: "A spider has eight jointed legs and a hard outer skeleton. Is it an insect, and to which phylum does it belong?",
        steps: [
          "Jointed legs and a hard exoskeleton place it in phylum Arthropoda.",
          "An insect has six legs and three body parts; a spider has eight legs.",
          "So a spider is an arthropod but not an insect (it is an arachnid).",
        ],
        answer: "Not an insect; it is an arthropod (an arachnid).",
      },
      practiceSet: [
        { prompt: "How many legs does an adult insect have?", answer: "Six" },
        { prompt: "Which phylum has a water vascular system with tube feet?", answer: "Echinodermata" },
        { prompt: "To which phylum does Pila, the apple snail, belong?", answer: "Mollusca" },
        { prompt: "What is the hard outer covering of an arthropod made of?", answer: "Chitin" },
      ],
      traps: [
        {
          title: "Segments do not make an insect",
          body: "An earthworm is segmented, long and bilaterally symmetrical too. The feature that only an arthropod has is **jointed legs**.",
        },
        {
          title: "Pearls come from oysters, not snails",
          body: "Pila (the apple snail) is also a mollusc, but **pearls** are made by the **pearl oyster**. Prawn is an arthropod and tuna a fish.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-chordates",
      name: "Chordates and their hearts",
      intuition:
        "Every chordate has a notochord, a stiff rod along its back, at some stage of life. In the vertebrates a backbone grows in its place. The vertebrate classes can then be told apart by their hearts: two chambers in fish, three in amphibians and most reptiles, four in birds and mammals. A four-chambered heart keeps clean and used blood apart, which lets birds and mammals keep a steady body heat.",
      definition:
        "Phylum Chordata (NCERT Class 9):\n" +
        "- **Protochordata**: marine, bilaterally symmetrical, with a coelom and a **notochord**, but the notochord is **never replaced by a vertebral column**; for example Balanoglossus, Herdmania, Amphioxus.\n" +
        "- **Vertebrata**: the notochord is replaced by a backbone. Five classes:\n" +
        "- **Pisces** (fish): gills, fins, **two-chambered** heart, cold-blooded.\n" +
        "- **Amphibia** (frog, toad, salamander): moist skin, **three-chambered** heart, cold-blooded.\n" +
        "- **Reptilia** (lizard, snake, tortoise, crocodile): dry scaly skin; most have a **three-chambered** heart, but **crocodiles have four**; cold-blooded.\n" +
        "- **Aves** (birds) and **Mammalia** (mammals): **four-chambered** heart and **warm-blooded** (body temperature stays steady).",
      table: {
        columns: ["Group", "Heart and body temperature", "Examples"],
        rows: [
          {
            cells: ["Protochordata", "Notochord, but never a backbone; cold-blooded", "Balanoglossus, Herdmania, Amphioxus"],
            noteAmber: "CDS 2021 (II): marine, with a notochord, but never a vertebral column: Protochordata.",
            pyqExampleId: "0e46f16e-b960-4b06-b91b-a799e3048469",
          },
          {
            cells: ["Pisces", "Two chambers; cold-blooded", "Rohu, shark (Scoliodon), flying fish"],
            noteAmber: "CDS 2018 (I): of silverfish, jellyfish, cuttlefish and flying fish, only the flying fish is a true fish.",
            pyqExampleId: "85102289-553b-4730-820c-08ab237da73b",
          },
          {
            cells: ["Amphibia", "Three chambers; cold-blooded", "Frog, toad, salamander"],
            noteAmber: "CDS 2018 (I): the classes with a three-chambered heart are Amphibia and Reptilia.",
            pyqExampleId: "dc9396dc-cff0-4bc2-835c-c5c01673365b",
          },
          { cells: ["Reptilia", "Three chambers (four in crocodiles); cold-blooded", "Lizard, snake, tortoise, crocodile"] },
          {
            cells: ["Aves", "Four chambers; warm-blooded", "Pigeon, peacock, ostrich"],
            noteAmber: "CDS 2019 (I): the warm-blooded pair is peacock and camel.",
            pyqExampleId: "784b569f-5c68-464a-8cd7-79aa67e1834a",
          },
          { cells: ["Mammalia", "Four chambers; warm-blooded", "Camel, bat, whale, human being"] },
        ],
      },
      pyqExampleId: "5ba00ae4-8aa8-4b4a-a76f-50e7c62a4681",
      selfCheckExample: {
        prompt: "A bat flies and a whale swims, yet both are placed in the same class. Which class, and what do they share?",
        steps: [
          "Both have hair on the body and feed their young on milk from mammary glands.",
          "Both have a four-chambered heart and are warm-blooded.",
          "Flying or swimming does not decide the class; these features do.",
        ],
        answer: "Mammalia: both have hair, mammary glands, a four-chambered heart and a steady body temperature.",
      },
      practiceSet: [
        { prompt: "How many chambers does the heart of a fish have?", answer: "Two" },
        { prompt: "Which reptile has a four-chambered heart?", answer: "The crocodile" },
        { prompt: "Name a protochordate.", answer: "Amphioxus (or Balanoglossus, or Herdmania)" },
        { prompt: "What replaces the notochord in a vertebrate?", answer: "The vertebral column (backbone)" },
      ],
      traps: [
        {
          title: "Only birds and mammals are warm-blooded",
          body: "Crocodiles, tortoises and all fish are **cold-blooded**, even large ones. A warm-blooded pair must be a **bird and a mammal**, such as peacock and camel.",
        },
        {
          title: "Most fish names are not fish",
          body: "**Silverfish** is an insect, **jellyfish** a cnidarian, **cuttlefish** and starfish are not fish either (a mollusc and an echinoderm). A true fish has gills, fins and a backbone, like the **flying fish**.",
        },
        {
          title: "Reptiles are three, except the crocodile",
          body: "Amphibians and **most reptiles** have a three-chambered heart. So 'Reptilia only' or 'Amphibia only' is too narrow when both classes are offered together. The crocodile, a reptile, has four.",
        },
      ],
    },
  ],
};
