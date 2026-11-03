import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 5 Origin and Evolution of Life. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed); most-asked
 * years from the 17 board past-paper questions in the bank, 2024-2026. The
 * human-evolution table did not survive text extraction cleanly: the cranial
 * capacities are clear, the Homo erectus features were read from its jumbled cells.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Origin and Evolution of Life",
  chapterSlug: "origin-and-evolution-of-life",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Chemical evolution (self assembly theory)",
      text: "Life originated on earth by combinations of several chemicals through constant chemical reactions over a long period of time. Formulated by Haeckel, developed by **Oparin** (1924) and **Haldane** (1929).",
    },
    {
      term: "Protobionts (coacervates)",
      text: "Prebiotic chemical aggregates having some properties of living system, formed by coacervation (aggregation of organic molecules). Oparin called them coacervates; Sidney Fox called them protenoids or microspheres.",
    },
    {
      term: "RNA world hypothesis",
      text: "Early life must have been based exclusively on nucleic acids, most probably RNA. Supported by **ribozymes** (catalytic RNAs) found by Altman and Cech, and by RNA catalysing translation in the ribosome.",
    },
    {
      term: "Darwinism: five postulates",
      text: "Overproduction (prodigality of nature), struggle for existence, organic variations, natural selection (survival of the fittest, named by H. Spencer) and origin of new species. Book: On the Origin of Species by means of Natural Selection (1859).",
    },
    {
      term: "Mutation theory",
      text: "Proposed by **Hugo de Vries** (1901) from seven generations of evening primrose (Oenothera lamarckiana). Mutations are large, sudden, random and discontinuous variations in a population.",
    },
    {
      term: "Gene pool and gene frequency",
      text: "**Gene pool**: the total genetic information encoded in sum total of genes in a Mendelian population. **Gene frequency**: the proportion of an allele in the gene pool to the total number of alleles at a given locus.",
    },
    {
      term: "Gene flow",
      text: "Movement of genes into or out of a population, by migration of organisms, gametes (dispersal of pollen) or segments of DNA (transformation). It alters gene frequency.",
    },
    {
      term: "Genetic drift",
      text: "Any random fluctuation in allele frequency, occurring in the natural population by pure chance. The **bottle neck effect** is genetic drift after a disaster leaves only a few individuals.",
    },
    {
      term: "Chromosomal aberrations",
      text: "Changes in chromosome number (gains and losses) and in the structure of chromosomes: **deletion**, **duplication**, **inversion** (segment reattached after a 180° twist) and **translocation** (to a non-homologous chromosome).",
    },
    {
      term: "Natural selection",
      text: "The process by which better adapted organisms grow and produce more offspring. **Industrial melanism** in Biston betularia (grey) and Biston carbonaria (black) moths is the best example. Types: stabilizing, directional, disruptive.",
    },
    {
      term: "Hardy-Weinberg principle",
      text: "At equilibrium both the allele frequency and the genotypic frequency remain constant from generation to generation, in a large, random-mating, sexually reproducing population with no mutation, gene flow, drift or selection.",
    },
    {
      term: "Homologous and analogous organs",
      text: "**Homologous**: structurally similar but perform different functions (forelimbs of vertebrates); divergent evolution. **Analogous**: structurally dissimilar but functionally similar (wings of butterfly and bird); convergent evolution.",
    },
    {
      term: "Vestigial organs",
      text: "Imperfectly developed, non-functional, degenerate structures which were functional in related animals or ancestors. In man: nictitating membrane, wisdom teeth, coccyx, vermiform appendix.",
    },
    {
      term: "Molecular evidences",
      text: "Cell is the basic unit of life in all organisms; similar proteins and genetic material performing similar functions show a common ancestry; basic metabolism is similar; ATP is the energy source in all living organisms.",
    },
  ],
  formulas: [
    {
      label: "Hardy-Weinberg equilibrium",
      latex: "p + q = 1 \\qquad p^2 + 2pq + q^2 = 1",
      symbols: [
        { symbol: "p", meaning: "frequency of the dominant allele A" },
        { symbol: "q", meaning: "frequency of the recessive allele a" },
      ],
    },
  ],
  derivations: [
    {
      title: "Describe Urey and Miller's experiment",
      steps: [
        "Miller and his teacher Urey gave the first experimental evidence for Oparin's chemical evolution, using a spark-discharge apparatus.",
        "The sterilised, evacuated chamber got methane, ammonia and hydrogen in the proportion **1:2:2**, plus water vapour from boiling water.",
        "Lightning was mimicked by an electric discharge (carbon arc spark); a condenser cooled the gases for several days.",
        "The liquid collected in the U-tube turned brown and held simple organic compounds: urea, amino acids, lactic acid.",
      ],
    },
    {
      title: "Archaeopteryx: reptilian and avian characters",
      steps: [
        "A fossil crow-sized toothed bird from Jurassic rocks of Germany: the connecting link between reptiles and birds.",
        "Reptilian: long tail, claws and scales, jaws with homodont teeth, sternum without keel, solid (non-pneumatic) bones, single headed and abdominal ribs.",
        "Avian: feathery exoskeleton, forelimbs modified into wings, jaws modified into beak, completely fused skull, large rounded cranium, bird-like limb bones.",
      ],
    },
    {
      title: "Drawbacks of Darwinism",
      steps: [
        "Did not distinguish between environmental and hereditary variations, nor between somatic and germinal ones.",
        "Did not explain the arrival of the fittest, or the cause, origin and inheritance of variations and of vestigial organs.",
        "Intermediate forms expected from gradual accumulation of variations were mostly not found.",
        "Could not explain neutral flowers and the sterility of hybrids.",
      ],
    },
    {
      title: "Reproductive isolation: pre-mating and post-mating mechanisms",
      steps: [
        "Reproductive isolation prevents interbreeding, due to change in genetic material, gene pool and structure of genital organs.",
        "Pre-mating (pre-zygotic): habitat (ecological), seasonal (temporal), ethological (mating behaviour) and mechanical (reproductive organs) isolation.",
        "Post-mating (post-zygotic): gamete mortality, zygote mortality and hybrid sterility (mule).",
      ],
    },
    {
      title: "Sources of genetic variation",
      steps: [
        "Gene mutation: a sudden permanent heritable change within a single gene (point mutation).",
        "Genetic recombination: crossing over between non-sister chromatids during gamete formation.",
        "Gene flow, genetic drift and chromosomal aberrations also change gene frequencies.",
      ],
    },
    {
      title: "Stages of human evolution by cranial capacity",
      steps: [
        "Australopithecus 450 to 600 cc, Homo habilis 650 to 800 cc, Homo erectus 900 cc, Neanderthal man 1400 cc, Homo sapiens 1450 cc.",
        "Homo erectus: about 5 feet tall, heavy built, erect posture, prominent brow ridges, huge jaws, chin absent; probably ate meat and used fire.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Urey and Miller's experiment (Fig. 5.2)",
      labels: ["CH4, NH3, H2 gases", "electrodes (carbon spark)", "to vacuum pump", "condenser, water in and out", "boiling water", "water trap with organic compounds"],
    },
    {
      title: "Archaeopteryx (Fig. 5.11)",
      labels: ["beak with teeth", "feathers and wings", "clawed digits", "scales on the body", "long tail"],
    },
    {
      title: "Homologous organs (Fig. 5.12)",
      labels: ["humerus", "radius ulna", "carpals and metacarpals", "phalanges", "forelimbs of man, bat, bird, whale, horse"],
    },
    {
      title: "Chromosomal aberrations (Fig. 5.5)",
      labels: ["deletion", "duplication", "inversion", "translocation"],
    },
    {
      title: "Types of natural selection (Fig. 5.7 to 5.9)",
      labels: ["original population", "population after selection", "stabilising: against both extremes", "directional: against one extreme", "disruptive: against intermediates"],
    },
  ],
  mostAsked: [
    { topic: "Human evolution: cranial capacities in order, skeletal features of Homo erectus", years: [2026, 2024] },
    { topic: "Evidences of evolution: analogous organs, vestigial organs, molecular evidences", years: [2026, 2025, 2024] },
    { topic: "Genetic variation: gene pool, gene flow, chromosomal aberrations and their causes", years: [2025, 2024] },
    { topic: "Connecting links: Archaeopteryx (reptilian and avian features), Seymouria", years: [2026, 2025] },
    { topic: "Urey and Miller's experiment: labelled set-up or the ratio of gases", years: [2026, 2024] },
    { topic: "Darwinism: its drawbacks, and industrial melanism as natural selection", years: [2025, 2024] },
    { topic: "Reproductive isolation: pre-mating and post-mating mechanisms", years: [2024] },
  ],
  mistakes: [
    {
      title: "Swapping homologous and analogous",
      body: "Homologous: same structure, different function (divergent evolution). Analogous: different structure, same function (convergent evolution). Wings of a butterfly and a bird are analogous.",
    },
    {
      title: "Getting the gas ratio wrong",
      body: "Methane, ammonia and hydrogen were in the proportion 1:2:2. Water vapour came in through a separate tube from boiling water.",
    },
    {
      title: "Mixing up the connecting links",
      body: "Seymouria links amphibians and reptiles; Archaeopteryx links reptiles and birds.",
    },
    {
      title: "Confusing gene flow with genetic drift",
      body: "Gene flow is movement of genes into or out of a population. Genetic drift is a change in allele frequency by pure chance.",
    },
    {
      title: "Muddling the cranial capacities",
      body: "Increasing order: Australopithecus, Homo erectus, Neanderthal man, Homo sapiens. Neanderthal man is 1400 cc, not 900 cc (that is Homo erectus).",
    },
  ],
};

export default sheet;
