import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_EVO_SPECIATION_NOTE: SubtopicNote = {
  subtopicName: "Speciation and Classification",
  title: "Speciation, Evidence for Evolution and Classification",
  oneLineDefinition:
    "New species form when populations stop interbreeding; fossils, anatomy and DNA show that all life shares ancestors, and classification groups it into three domains.",
  whyItMatters:
    "The papers asked in 2015 what evolution can lead to (new species, changed allele frequencies, more biodiversity) and in 2020 which kind of isolation a case of a new finch species shows. Evidence for evolution and classification are syllabus topics not yet asked.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-evo-speciation",
      name: "Species and speciation: isolation barriers, allopatric and sympatric",
      intuition:
        "Two groups of one species can only drift apart genetically if their genes stop mixing. Once something stops them interbreeding, each group changes on its own path, and eventually they could not interbreed even if they met. That point is a new species.",
      definition:
        "A **species** (biological species concept) is a group of populations whose members can interbreed in nature and produce **fertile** offspring.\n" +
        "- **Speciation** needs **reproductive isolation**: gene flow between the groups stops.\n" +
        "- **Allopatric** speciation: a geographical barrier (sea, mountain, river) splits the population.\n" +
        "- **Sympatric** speciation: a new species forms in the same area, for example by **polyploidy** in plants or by a change in mating behaviour or food.\n" +
        "- **Prezygotic** barriers stop a zygote forming; **postzygotic** barriers act on the hybrid.\n" +
        "- **Adaptive radiation**: one ancestor gives many species suited to different niches (Darwin's finches on the Galápagos).\n" +
        "- Outcomes of evolution: changed allele frequencies, adaptation, new species and so more **biodiversity** (and also extinction).",
      table: {
        columns: ["Barrier", "Before or after the zygote", "Example"],
        rows: [
          { cells: ["Habitat", "Before (prezygotic)", "Two species live in the same area but in different places, such as water and land"] },
          { cells: ["Temporal", "Before (prezygotic)", "Breeding seasons or flowering times differ"] },
          { cells: ["Behavioural", "Before (prezygotic)", "Different courtship songs or displays, so mates are not recognised"] },
          { cells: ["Mechanical or gametic", "Before (prezygotic)", "Reproductive parts do not fit, or sperm cannot fertilise the egg"] },
          { cells: ["Hybrid inviability", "After (postzygotic)", "The hybrid embryo dies early"] },
          { cells: ["Hybrid sterility", "After (postzygotic)", "The mule, from a horse and a donkey, is sterile"] },
        ],
      },
      selfCheckExample: {
        prompt: "Horses and donkeys can mate, but their offspring, mules, are sterile. What does this show?",
        options: [
          "Behavioural isolation",
          "Gametic isolation",
          "Sympatric speciation by polyploidy",
          "Postzygotic isolation by hybrid sterility",
          "Geographical isolation",
        ],
        steps: [
          "A zygote does form and grows into a mule, so the barrier acts after fertilisation: postzygotic.",
          "The mule is sterile, so this is hybrid sterility, and horses and donkeys stay separate species.",
          "A and B are prezygotic, but here mating and fertilisation succeed. C and E describe ways species arise, not this barrier.",
        ],
        answer: "(D) Postzygotic isolation by hybrid sterility",
      },
      practiceSet: [
        { prompt: "What kind of speciation follows a population being split by a new river?", answer: "Allopatric" },
        { prompt: "In which group is speciation by polyploidy common?", answer: "Plants" },
        { prompt: "Two bird species in one forest have different songs and never mate. Which kind of barrier is this?", answer: "Prezygotic (behavioural)" },
        { prompt: "Name a classic example of adaptive radiation.", answer: "Darwin's finches on the Galápagos" },
      ],
      traps: [
        {
          title: "Producing offspring is not enough to be one species",
          body: "The test is fertile offspring in nature. Horses and donkeys produce mules, but mules are sterile, so horses and donkeys are separate species. A barrier that acts after the zygote forms is still reproductive isolation.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-evidence",
      name: "Evidence for evolution: fossils, anatomy, embryos and molecules",
      intuition:
        "If all living things descend from shared ancestors, the traces should be everywhere: in rocks, in body plans, in embryos and in DNA. They are, and the different lines of evidence agree with each other.",
      definition:
        "The main lines of evidence:\n" +
        "- **Fossils**: older rock layers hold simpler forms; **transitional fossils** (Archaeopteryx, between reptiles and birds) link groups. Radioactive dating gives their ages.\n" +
        "- **Homologous structures**: same basic structure, different uses, from a common ancestor (**divergent evolution**).\n" +
        "- **Analogous structures**: same use, different structure and origin (**convergent evolution**). They do not show close relationship.\n" +
        "- **Vestigial structures**: reduced remnants with little or no function.\n" +
        "- **Molecular evidence**: the genetic code is nearly universal; the more closely related two species are, the more similar their DNA and protein sequences.\n" +
        "- **Biogeography**: island species resemble those of the nearest mainland. Evolution is also **observed directly**, as in antibiotic resistance.",
      table: {
        columns: ["Evidence", "What it shows", "Example"],
        rows: [
          { cells: ["Homologous structures", "Common ancestry", "Pentadactyl limb: human arm, bat wing, whale flipper"] },
          { cells: ["Analogous structures", "Similar pressures, separate origins", "Wings of birds and of insects"] },
          { cells: ["Vestigial structures", "Ancestors used the organ", "Human coccyx, hip bones inside whales"] },
          { cells: ["Comparative embryology", "Shared developmental plan", "Vertebrate embryos all have pharyngeal pouches and a tail"] },
          { cells: ["DNA and protein sequences", "Degree of relationship", "Human and chimpanzee DNA differ by only a few per cent"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "The forelimb of a mole, the wing of a bat and the arm of a human have the same arrangement of bones but are used for different jobs. What are they, and what do they suggest?",
        options: [
          "Analogous structures, showing convergent evolution",
          "Homologous structures, showing a common ancestor",
          "Vestigial structures, showing loss of function",
          "Analogous structures, showing a common ancestor",
          "Homologous structures, showing convergent evolution",
        ],
        steps: [
          "Same structure, different function: homologous.",
          "Homologous structures come from a shared ancestor and then diverged.",
          "Analogous structures are the reverse (same function, different structure), and none of these limbs is vestigial. D and E pair each term with the other's meaning.",
        ],
        answer: "(B) Homologous structures, showing a common ancestor",
      },
      practiceSet: [
        { prompt: "A bird's wing and a butterfly's wing: homologous or analogous?", answer: "Analogous" },
        { prompt: "Give a vestigial structure in humans.", answer: "The coccyx (tailbone)" },
        { prompt: "Which molecular fact points to one common origin of all life?", answer: "The genetic code is nearly universal" },
      ],
      traps: [
        {
          title: "Similar function does not mean close relatives",
          body: "Structures that do the same job but are built differently (analogous) evolved separately under similar conditions. Shared structure, not shared function, is what points to a common ancestor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-classification",
      name: "Classification: the three domains, the ranks and binomial names",
      intuition:
        "Classification sorts living things by relationship, from very broad groups to single species. The broadest split, found by comparing ribosomal RNA, is into three domains: two of prokaryotes and one of everything with a nucleus.",
      definition:
        "**Taxonomy** sorts organisms into nested ranks: **domain, kingdom, phylum, class, order, family, genus, species**.\n" +
        "- **Binomial nomenclature** (Linnaeus): genus plus species, written in italics with a capital only on the genus, as in *Homo sapiens*.\n" +
        "- The **three domains** (Woese, from ribosomal RNA): **Bacteria**, **Archaea** and **Eukarya**.\n" +
        "- Eukarya include protists, **fungi** (cell walls of chitin, feed by absorption), plants and animals.\n" +
        "- Viruses are not cells and belong to no domain.\n" +
        "- Humans: Eukarya, Animalia, Chordata, Mammalia, Primates, Hominidae, Homo, sapiens.",
      table: {
        columns: ["Domain", "Cell type", "Key features", "Examples"],
        rows: [
          { cells: ["Bacteria", "Prokaryote", "No nucleus; cell wall of peptidoglycan; 70S ribosomes", "E. coli, Streptococcus, cyanobacteria"] },
          { cells: ["Archaea", "Prokaryote", "No nucleus; no peptidoglycan; unusual membrane lipids; many live in extreme places", "Methanogens, salt-loving and heat-loving archaea"] },
          { cells: ["Eukarya", "Eukaryote", "Nucleus and membrane-bound organelles; 80S ribosomes in the cytoplasm", "Protists, fungi, plants, animals"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which feature do archaea share with bacteria but not with eukaryotes?",
        options: [
          "A cell wall made of peptidoglycan",
          "A membrane-bound nucleus",
          "Mitochondria",
          "Ribosomes",
          "No membrane-bound nucleus",
        ],
        steps: [
          "Archaea and bacteria are both prokaryotes: neither has a nucleus.",
          "Peptidoglycan walls are found in bacteria only, not archaea.",
          "B and C are eukaryotic features, and D is shared by all three domains, so it does not set eukaryotes apart.",
        ],
        answer: "(E) No membrane-bound nucleus",
      },
      practiceSet: [
        { prompt: "Put these in order from broad to narrow: genus, phylum, family, class.", answer: "Phylum, class, family, genus" },
        { prompt: "To which domain and kingdom does a mushroom belong?", answer: "Eukarya, kingdom Fungi" },
        { prompt: "Which part of a binomial name starts with a capital letter?", answer: "The genus" },
        { prompt: "Do viruses belong to one of the three domains?", answer: "No; they are not cells" },
      ],
      traps: [
        {
          title: "Archaea are not a kind of bacteria",
          body: "Archaea look like bacteria under a microscope, but they form their own domain. They lack peptidoglycan and in several molecular features (such as how they copy and read DNA) they are closer to eukaryotes than to bacteria.",
        },
      ],
    },
  ],
};
