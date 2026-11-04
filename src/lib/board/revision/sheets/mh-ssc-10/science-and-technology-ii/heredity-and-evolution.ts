import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 1 Heredity and Evolution. Statements
 * checked against the Balbharati text; most-asked years from the board past
 * papers in the bank. Sex determination, Mendel's crosses, chromosome pairs and
 * DNA structure are not taught in the current book and are left out.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Heredity and Evolution",
  chapterSlug: "heredity-and-evolution",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Heredity",
      text: "Heredity is the transfer of biological characters from one generation to another via genes. Gregor Johann Mendel is the pioneer of modern genetics.",
    },
    {
      term: "Central dogma",
      text: "Proteins are synthesized by DNA through the RNA. This is called the **central dogma**: DNA to mRNA (transcription), mRNA to protein (translation).",
    },
    {
      term: "Transcription",
      text: "mRNA is made as per the sequence of nucleotides on **one** strand of DNA. The mRNA sequence is complementary to that strand, and RNA has **uracil** in place of thymine.",
    },
    {
      term: "Triplet codon",
      text: "The code for each amino acid consists of **three nucleotides**. Dr Har Govind Khorana found the triplet codons for 20 amino acids (Nobel Prize, 1968).",
    },
    {
      term: "Translation and translocation",
      text: "**Translation**: tRNA, with an anticodon complementary to the codon on mRNA, brings amino acids; rRNA joins them by peptide bonds. **Translocation**: the ribosome moves along mRNA by one triplet codon at a time.",
    },
    {
      term: "Mutation",
      text: "Any nucleotide of a gene suddenly changes its position, causing a change: this is **mutation**. Some are minor, some considerable, e.g. sickle cell anaemia. Hugo de Vries gave the mutation theory (1901).",
    },
    {
      term: "Evolution",
      text: "Evolution is the **gradual change** occurring in living organisms over a long duration. It is a very slow process.",
    },
    {
      term: "Evidences of evolution",
      text: "Six kinds: **morphological**, **anatomical**, **vestigial organs**, **palaeontological** (fossils), **connecting links** and **embryological**.",
    },
    {
      term: "Anatomical evidence",
      text: "Human hand, foreleg of ox, flipper of whale and patagium of bat look different and do different jobs, but have similar bones and joints. So these animals may have a common ancestor.",
    },
    {
      term: "Vestigial organs",
      text: "Degenerated or underdeveloped useless organs. In man: appendix, ear muscles, tail bone (coccyx), wisdom teeth, body hair. The appendix is functional in **ruminants**; ear muscles move the ear pinna in **monkeys**.",
    },
    {
      term: "Fossils and carbon dating",
      text: "Remnants and impressions of buried organisms preserved underground are **fossils**. **Carbon dating** finds their age from the radioactivity of C-14 and the C-14 to C-12 ratio. Developed by Willard Libby.",
    },
    {
      term: "Connecting links",
      text: "Organisms with characters of two different groups. **Peripatus**: annelida and arthropoda. **Duck billed platypus**: reptiles and mammals. **Lung fish**: fishes and amphibians.",
    },
    {
      term: "Embryological evidence",
      text: "Embryos of fish, salamander, tortoise, chicken, pig, cow, rabbit and man are very similar in early stages; the similarity decreases later. This shows a common origin.",
    },
    {
      term: "Speciation",
      text: "Species: a group of organisms that can produce fertile individuals through natural reproduction. Genetic variation, and geographical or reproductive isolation, lead to formation of new species.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the process of formation of complex proteins",
      steps: [
        "**Transcription**: in the nucleus, mRNA is made from one strand of DNA, complementary to it, with uracil in place of thymine.",
        "mRNA comes into the cytoplasm carrying the code for amino acids, three nucleotides (a triplet codon) for each.",
        "**Translation**: tRNA with a matching anticodon brings the amino acid; rRNA joins amino acids by peptide bonds.",
        "**Translocation**: the ribosome moves along the mRNA one codon at a time. Many such chains join to form complex proteins.",
      ],
    },
    {
      title: "Explain Darwin's theory of natural selection and the objections to it",
      steps: [
        "Darwin published **Origin of Species**. All organisms reproduce prolifically and compete with each other.",
        "Only organisms with the modifications needed to win the competition survive (**survival of the fittest**).",
        "Nature selects only those fit to live; the rest perish. The selected ones reproduce and give rise to new species.",
        "Objections: natural selection is not the only factor; no explanation of useful and useless modifications; none of slow and abrupt changes.",
      ],
    },
    {
      title: "Explain Lamarckism with examples",
      steps: [
        "Lamarck: activity or laziness of an organism changes its organs (**use or disuse of organs**), and these acquired characters pass to the next generation.",
        "Examples: long neck of giraffe from browsing tall plants; strong shoulders of an ironsmith; weak wings of ostrich and emu.",
        "Swan and duck legs suited for swimming; snakes lost their legs for burrowing.",
        "Rejected: acquired modifications are not transferred to the next generation.",
      ],
    },
    {
      title: "Define fossils. Explain the importance of fossils as proof of evolution",
      steps: [
        "Organisms buried in floods, earthquakes or volcanoes leave remnants and impressions preserved underground: fossils.",
        "Carbon dating (C-14 decay) gives their age; from it we deduce which organisms lived when.",
        "Fossils in rock layers show vertebrates slowly arose from invertebrates: fishes, amphibians, reptiles, then birds and mammals.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Transcription (Fig. 1.1)",
      labels: ["DNA strand", "RNA polymerase", "RNA nucleotides", "mRNA being formed"],
    },
    {
      title: "Translation and translocation (Fig. 1.2)",
      labels: ["nucleus", "mRNA with codon", "ribosome", "tRNA", "amino acid chain"],
    },
    {
      title: "Structure of bones (Fig. 1.5)",
      labels: ["human hand", "foreleg of ox", "patagium of bat", "flipper of whale"],
    },
    {
      title: "Vestigial organs in man (Fig. 1.6)",
      labels: ["appendix (small and large intestine)", "ear muscles", "wisdom teeth", "tail bone (coccyx)"],
    },
  ],
  mostAsked: [
    { topic: "Vestigial organs: define, two in the human body, animals in which they are functional", marks: 3, years: [2025, 2024, 2023, 2018, 2017] },
    { topic: "Evidences of evolution: complete the concept map, anatomical and embryological evidence with examples", years: [2026, 2025, 2022, 2020, 2017] },
    { topic: "Mutation and heredity: Hugo de Vries, a nucleotide changing position, mechanism of hereditary changes", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Central dogma: transcription, triplet codon", years: [2020, 2019] },
    { topic: "Theories of evolution: Darwin's natural selection and its objections, Lamarckism with examples", marks: 3, years: [2026, 2023, 2022] },
    { topic: "Fossils and carbon dating: define, one use", marks: 2, years: [2026, 2025, 2016] },
    { topic: "Connecting links: Peripatus between annelida and arthropoda", years: [2026, 2019] },
    { topic: "Evolution means gradual change: fill the blank or true or false", marks: 1, years: [2025, 2024] },
  ],
  mistakes: [
    {
      title: "Mixing up the three T words",
      body: "Transcription: DNA to mRNA. Translation: tRNA brings amino acids as per mRNA codons. Translocation: the ribosome moves one codon along the mRNA.",
    },
    {
      title: "Writing thymine in RNA",
      body: "RNA has uracil in place of thymine, and only one of the two DNA strands is used to make mRNA.",
    },
    {
      title: "Calling a vestigial organ useless in every animal",
      body: "The appendix is useless in man but fully functional in ruminants. Ear muscles are useless in man but move the ear pinna in monkeys.",
    },
    {
      title: "Swapping Darwin and Lamarck",
      body: "Darwin: natural selection, survival of the fittest. Lamarck: use or disuse of organs and inheritance of acquired characters (disproved).",
    },
    {
      title: "Wrong pair for a connecting link",
      body: "Peripatus links annelida and arthropoda; duck billed platypus links reptiles and mammals; lung fish links fishes and amphibians.",
    },
  ],
};

export default sheet;
