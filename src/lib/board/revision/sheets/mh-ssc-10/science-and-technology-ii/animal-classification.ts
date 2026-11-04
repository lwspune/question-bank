import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 6 Animal Classification.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past papers in the bank. Connecting-link items (lungfish, duck billed
 * platypus) are filed here but taught in Ch. 1, so they are left out.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Animal Classification",
  chapterSlug: "animal-classification",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Animal classification",
      text: "Formation of groups and sub-groups of animals depending upon similarities and differences. Aristotle first classified animals (artificial method); later came the natural system and the evolution-based system.",
    },
    {
      term: "Non-chordates and chordates",
      text: "**Non-chordates**: no notochord, no pharyngeal gill-slits, solid paired ventral nerve cord, heart dorsal. **Chordates**: notochord, gill-slits or lungs, hollow dorsal nerve cord, heart ventral.",
    },
    {
      term: "Grades of organization",
      text: "**Protoplasmic** (unicellular), **cellular** (Porifera, no tissues), **cell-tissue** (Cnidaria), **tissue-organ** (flatworms), **organ-system** (crab, frog, human).",
    },
    {
      term: "Body symmetry",
      text: "**Asymmetrical**: no plane gives two equal halves (some sponges). **Radial**: any plane through the central axis does (star fish). **Bilateral**: only one plane does (insects, fishes, frog, birds, human).",
    },
    {
      term: "Germ layers and body cavity",
      text: "**Diploblastic**: endoderm and ectoderm only (Cnidaria); **triploblastic**: also mesoderm. **Acoelomate**: Porifera, Cnidaria, Platyhelminthes. **Pseudocoelomate**: Aschelminthes. **Eucoelomate**: Annelida onwards.",
    },
    {
      term: "Porifera and Cnidaria",
      text: "**Porifera** (sponges): pores (ostia), collar cells, attached to substratum, asymmetrical. **Cnidaria**: polyp or medusa, radial, diploblastic; tentacles with **cnidoblasts** inject toxin. Hydra, jelly fish, sea anemone.",
    },
    {
      term: "Flatworms and roundworms",
      text: "**Platyhelminthes**: flat body, mostly endoparasites, acoelomate, hermaphrodite (Planaria, liver fluke, tape worm). **Aschelminthes**: thread-like round worms, pseudocoelomate, unisexual (Ascaris, filarial worm).",
    },
    {
      term: "Annelida and Arthropoda",
      text: "**Annelida**: metamerically segmented, setae or parapodia (earthworm, leech). **Arthropoda**: jointed appendages, **chitinous exoskeleton**, largest phylum (crab, spider, scorpion, cockroach, butterfly).",
    },
    {
      term: "Mollusca",
      text: "Soft, slimy body; second largest phylum; triploblastic, eucoelomate, non-segmented; head, foot and visceral mass; mantle secretes a calcareous shell. Bivalve, snail, octopus.",
    },
    {
      term: "Echinodermata and Hemichordata",
      text: "**Echinodermata**: calcareous spines, only marine, radial in adults, **tube feet** for locomotion and capturing prey, good regeneration (star fish, sea urchin). **Balanoglossus** (Hemichordata) links non-chordates and chordates.",
    },
    {
      term: "Pisces and Amphibia",
      text: "**Pisces**: cold blooded, spindle-shaped body, fins, scales, gills (rohu, shark). **Amphibia**: larvae aquatic; adults live in water and on land; moist skin without scales; no neck; tympanum (frog, toad).",
    },
    {
      term: "Reptilia",
      text: "First true terrestrial animals with creeping movement; **cold blooded**; dry scaly skin; neck present; external ear absent; digits with claws. Tortoise, lizard, snake.",
    },
    {
      term: "Aves",
      text: "Adapted for aerial life; **warm blooded**; spindle-shaped body; forelimbs modified into wings; exoskeleton of **feathers**; jaws modified into beak. Peacock, pigeon, penguin.",
    },
    {
      term: "Mammalia",
      text: "**Mammary glands** are the typical character; warm blooded; body of head, neck, trunk and tail; exoskeleton of **hair or fur**. Elephant, human, dolphin, **bat**.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Write three characters of phylum Echinodermata",
      steps: [
        "Calcareous spines on the body; skeleton of spines or ossicles; found only in the ocean.",
        "Triploblastic, eucoelomate; radially symmetrical in adults, bilateral in larvae.",
        "Locomotion and capturing prey by tube feet; good ability of regeneration. Star fish, sea urchin.",
      ],
    },
    {
      title: "Write three characters of phylum Mollusca",
      steps: [
        "Soft and slimy body; second largest phylum; aquatic or terrestrial.",
        "Triploblastic, eucoelomate, non-segmented; body of head, foot and visceral mass.",
        "Mantle secretes a hard calcareous shell (external, internal or absent); unisexual. Snail, octopus.",
      ],
    },
    {
      title: "Though a tortoise lives on land and in water, it is not an amphibian",
      steps: [
        "Its skin is dry and scaly, with claws on its digits; amphibians have moist skin without scales and no claws.",
        "It has a neck; amphibians have none.",
        "So it belongs to class Reptilia.",
      ],
    },
    {
      title: "Distinguish between Aves and Mammalia",
      steps: [
        "Aves: exoskeleton of feathers; Mammalia: hair or fur.",
        "Aves: forelimbs modified into wings, jaws into beak; Mammalia: mammary glands present.",
        "Both are warm blooded. Pigeon, parrot; human, bat.",
      ],
    },
    {
      title: "Distinguish between Pisces and Reptilia",
      steps: [
        "Pisces: aquatic, breathe with gills, swim with fins; Reptilia: first true terrestrial animals, creep on land, breathe air.",
        "Pisces: scales and fins, no neck; Reptilia: dry scaly skin, neck present, digits with claws.",
        "Both are cold blooded. Rohu, shark; lizard, snake.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Types of body symmetry (Fig. 6.9)",
      labels: ["asymmetrical body (sponge)", "radial symmetry (star fish)", "bilateral symmetry (human, insect)"],
    },
    {
      title: "Class Pisces: Scoliodon (Fig. 6.24)",
      labels: ["mouth, eye", "gill slits", "pectoral and pelvic fins", "dorsal fin", "caudal fin", "lateral line"],
    },
    {
      title: "Class Amphibia: frog and toad (Fig. 6.25)",
      labels: ["nares, mouth", "tympanum", "soft skin (frog), rough skin (toad)", "fore arm, leg, digits"],
    },
    {
      title: "Animals in Cnidaria: Hydra (Fig. 6.13)",
      labels: ["mouth", "tentacles", "body", "new bud", "testes, ovary"],
    },
  ],
  mostAsked: [
    { topic: "Identify the non-chordate phylum from clues or a diagram: Aschelminthes, Arthropoda (cockroach, chitin), Echinodermata, Cnidaria (jelly fish sting)", marks: 1, years: [2026, 2024, 2022, 2020, 2019, 2018] },
    { topic: "Mammalia and Aves: bat and human are mammals, features of Aves, distinguish Aves and Mammalia", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019] },
    { topic: "Reptilia and Pisces: cold blooded, why a tortoise is not an amphibian, features of Reptilia, distinguish Pisces and Reptilia", marks: 2, years: [2026, 2025, 2024, 2022, 2019] },
    { topic: "Characters of phylum Echinodermata and Mollusca, regeneration in star fish", marks: 3, years: [2026, 2025] },
    { topic: "Body symmetry: identify radial, bilateral or asymmetrical", years: [2026, 2023, 2020] },
    { topic: "Distinguish between chordates and non-chordates", marks: 2, years: [2023] },
    { topic: "Benefits of animal classification", marks: 2, years: [2019] },
  ],
  mistakes: [
    {
      title: "Calling a tortoise or crocodile an amphibian",
      body: "Living on land and in water does not make an amphibian. Dry scaly skin, claws and a neck put them in Reptilia.",
    },
    {
      title: "Calling a bat a bird",
      body: "A bat has mammary glands and hair, so it is in class Mammalia, though it flies.",
    },
    {
      title: "Star fish symmetry",
      body: "Star fish is radially symmetrical as an adult but bilateral as a larva. It is not a fish: it is an echinoderm.",
    },
    {
      title: "Mixing the worms",
      body: "Flatworms (Platyhelminthes) are acoelomate and hermaphrodite. Round worms (Aschelminthes) are pseudocoelomate and unisexual; Ascaris lives in the small intestine.",
    },
    {
      title: "Cold and warm blooded",
      body: "Pisces, Amphibia and Reptilia are cold blooded (poikilotherms). Aves and Mammalia are warm blooded (homeotherms).",
    },
  ],
};

export default sheet;
