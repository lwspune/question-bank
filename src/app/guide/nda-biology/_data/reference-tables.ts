/**
 * Content for /guide/nda-biology/reference-tables.
 *
 * Biology-specific subject artefact — the analogue of nda-english's
 * /vocab-families, nda-physics's /formulas, and nda-chemistry's
 * /common-compounds. A single-page index of the ~50 named-fact PAIRS
 * NDA Biology actually tests.
 *
 * Structurally distinct from Chemistry's /common-compounds: chemistry has
 * one domain (name↔formula↔use), so the page is 6 themed clusters within
 * that one shape. Biology has FOUR domains — diseases↔pathogens,
 * vitamins↔deficiencies, hormones↔glands, scientists↔discoveries — so the
 * page is organised as multi-domain clusters, each with its own column
 * headers.
 *
 * Why themed clusters (not alphabetical flat list): matches the bank's
 * subtopic structure (Pathogens and Diseases, Nutrition + Vitamins,
 * Endocrine + Hormones, Antibiotics — Discovery), and active-recall is
 * easier when related named facts are co-located.
 *
 * Each entry: the entity (disease/vitamin/hormone/concept), the paired
 * fact (pathogen/deficiency/gland/discoverer), optionally the playbook
 * it most often appears in (so a reader can drill that chapter's bank q),
 * and an optional trap-note for the highest-leverage distractor.
 *
 * Curation rule: every entry has appeared in the 2017–2026 NDA Biology
 * bank at least once OR is a high-leverage NCERT-grade fact a candidate
 * needs cold. Editorial curation; not exhaustive.
 */

export type ReferenceEntry = {
  /** Stable kebab-case identifier. */
  id: string;
  /** The 'left column' value — the entity being asked about. */
  name: string;
  /** The 'middle column' value — the paired fact. */
  fact: string;
  /** One-line context / use / note. */
  context: string;
  /** Optional playbook slug — links to deep-dive. */
  playbookSlug?: string;
  /** Optional note for traps / clarification. */
  notes?: string;
};

export type ReferenceCluster = {
  /** Cluster theme. */
  theme: string;
  /** Sub-eyebrow shown below theme. */
  blurb: string;
  /** Column headers for the 3-column table. */
  columns: { name: string; fact: string; context: string };
  entries: ReferenceEntry[];
};

export const REFERENCE_CLUSTERS: ReferenceCluster[] = [
  {
    theme: "Diseases ↔ Pathogens",
    blurb:
      "The marquee recall lever in NDA Biology — disease↔causative-organism pairs appear in every paper. Bacterial, viral, parasitic, fungal. Drill against the /playbooks/microbiology-and-disease deep-dive.",
    columns: {
      name: "Disease",
      fact: "Pathogen / cause",
      context: "Type + key fact",
    },
    entries: [
      {
        id: "tuberculosis",
        name: "Tuberculosis (TB)",
        fact: "Mycobacterium tuberculosis",
        context: "Bacterial · airborne · affects lungs",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "cholera",
        name: "Cholera",
        fact: "Vibrio cholerae",
        context: "Bacterial · waterborne · severe diarrhoea",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "typhoid",
        name: "Typhoid",
        fact: "Salmonella typhi",
        context: "Bacterial · waterborne · sustained fever",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "tetanus",
        name: "Tetanus",
        fact: "Clostridium tetani",
        context: "Bacterial · soil · muscle spasms",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "leprosy",
        name: "Leprosy",
        fact: "Mycobacterium leprae",
        context: "Bacterial · skin + nerves",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "smallpox",
        name: "Smallpox",
        fact: "Variola virus",
        context: "Viral · eradicated globally 1980 (WHO)",
        playbookSlug: "microbiology-and-disease",
        notes: "Variola is a VIRUS, not bacterium — common identity trap.",
      },
      {
        id: "aids",
        name: "AIDS",
        fact: "HIV (Human Immunodeficiency Virus)",
        context: "Viral · RETROVIRUS · genetic material = RNA",
        playbookSlug: "microbiology-and-disease",
        notes: "Genetic material is RNA (retrovirus), not DNA.",
      },
      {
        id: "polio",
        name: "Polio",
        fact: "Poliovirus",
        context: "Viral · faeco-oral · paralysis",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "dengue",
        name: "Dengue",
        fact: "Dengue virus (DENV)",
        context: "Viral · Aedes mosquito · reduces PLATELETS",
        playbookSlug: "microbiology-and-disease",
        notes: "Dengue reduces platelets (not RBC, not WBC).",
      },
      {
        id: "measles",
        name: "Measles",
        fact: "Measles virus (Morbillivirus)",
        context: "Viral · airborne · rash + fever",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "malaria",
        name: "Malaria",
        fact: "Plasmodium (P. vivax, P. falciparum)",
        context: "Parasitic · vector = female Anopheles mosquito",
        playbookSlug: "microbiology-and-disease",
        notes:
          "Malaria = PLASMODIUM (parasite), not Mycobacterium (TB). NDA tests this swap.",
      },
      {
        id: "sleeping-sickness",
        name: "Sleeping sickness",
        fact: "Trypanosoma",
        context: "Parasitic · vector = tsetse fly · CNS damage",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "elephantiasis",
        name: "Elephantiasis (filariasis)",
        fact: "Wuchereria bancrofti",
        context: "Parasitic worm · vector = Culex mosquito · lymph blockage",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "kala-azar",
        name: "Kala-azar (visceral leishmaniasis)",
        fact: "Leishmania donovani",
        context: "Parasitic · vector = sandfly · enlarged spleen + liver",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "ringworm",
        name: "Ringworm",
        fact: "Trichophyton / Microsporum (dermatophytes)",
        context: "Fungal · skin infection",
        playbookSlug: "microbiology-and-disease",
      },
    ],
  },
  {
    theme: "Vitamins ↔ Deficiencies",
    blurb:
      "Year-after-year recall in the Nutrition subtopic. Memorise vitamin name + alt name + deficiency disease + source. Drill against the /playbooks/human-physiology deep-dive.",
    columns: {
      name: "Vitamin",
      fact: "Deficiency disease",
      context: "Source + alt name",
    },
    entries: [
      {
        id: "vit-a",
        name: "Vitamin A (Retinol)",
        fact: "Night blindness · xerophthalmia",
        context: "Carrots, liver, milk, eggs · fat-soluble",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-b1",
        name: "Vitamin B1 (Thiamine)",
        fact: "Beriberi",
        context: "Whole grains, pulses, nuts · water-soluble",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-b2",
        name: "Vitamin B2 (Riboflavin)",
        fact: "Cheilosis (cracks at mouth corners)",
        context: "Milk, eggs, leafy greens",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-b3",
        name: "Vitamin B3 (Niacin)",
        fact: "Pellagra (dermatitis, diarrhoea, dementia)",
        context: "Meat, fish, peanuts, whole grains",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-b12",
        name: "Vitamin B12 (Cyanocobalamin)",
        fact: "Pernicious anaemia",
        context: "Meat, fish, dairy · intestinal bacteria synthesise small amounts",
        playbookSlug: "human-physiology",
        notes: "B12 deficiency common in strict vegans (only animal sources).",
      },
      {
        id: "vit-c",
        name: "Vitamin C (Ascorbic acid)",
        fact: "Scurvy (bleeding gums, slow healing)",
        context: "Citrus fruits, amla, guava, peppers · water-soluble",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-d",
        name: "Vitamin D (Calciferol)",
        fact: "Rickets (children) · Osteomalacia (adults)",
        context: "Sunlight (UV → skin synthesis), fish, egg yolk · fat-soluble",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-e",
        name: "Vitamin E (Tocopherol)",
        fact: "Reproductive issues, neuropathy",
        context: "Vegetable oils, nuts, seeds · fat-soluble · antioxidant",
        playbookSlug: "human-physiology",
      },
      {
        id: "vit-k",
        name: "Vitamin K (Phylloquinone)",
        fact: "Bleeding (no blood clotting)",
        context: "Leafy greens, intestinal bacteria · fat-soluble",
        playbookSlug: "human-physiology",
        notes:
          "Intestinal bacteria synthesise vitamin K — recurring NDA fact about gut microbiome.",
      },
    ],
  },
  {
    theme: "Hormones ↔ Glands",
    blurb:
      "Endocrine system recall. Each hormone has one source gland + one main function. Drill against the /playbooks/human-physiology deep-dive.",
    columns: {
      name: "Hormone",
      fact: "Source gland",
      context: "Function",
    },
    entries: [
      {
        id: "insulin",
        name: "Insulin",
        fact: "Pancreas (β-cells of Islets of Langerhans)",
        context: "Lowers blood glucose (drives uptake into cells)",
        playbookSlug: "human-physiology",
        notes:
          "β-cells produce insulin, α-cells produce GLUCAGON (opposite effect — raises glucose).",
      },
      {
        id: "glucagon",
        name: "Glucagon",
        fact: "Pancreas (α-cells)",
        context: "Raises blood glucose (glycogen → glucose in liver)",
        playbookSlug: "human-physiology",
      },
      {
        id: "thyroxine",
        name: "Thyroxine (T4)",
        fact: "Thyroid gland",
        context: "Regulates basal metabolic rate · needs iodine",
        playbookSlug: "human-physiology",
        notes:
          "Goitre = enlarged thyroid (iodine deficiency); hypothyroidism in children = cretinism.",
      },
      {
        id: "adrenaline",
        name: "Adrenaline (Epinephrine)",
        fact: "Adrenal medulla",
        context: "Fight-or-flight · ↑ heart rate, ↑ blood glucose, dilates pupils",
        playbookSlug: "human-physiology",
      },
      {
        id: "cortisol",
        name: "Cortisol",
        fact: "Adrenal cortex",
        context: "Stress hormone · ↑ glucose, suppresses immune system",
        playbookSlug: "human-physiology",
      },
      {
        id: "growth-hormone",
        name: "Growth Hormone (GH / Somatotropin)",
        fact: "Anterior pituitary",
        context: "Skeletal + tissue growth · deficiency = dwarfism, excess = gigantism / acromegaly",
        playbookSlug: "human-physiology",
        notes: "Pituitary is the 'master gland' — controls thyroid + adrenal + gonads.",
      },
      {
        id: "oxytocin",
        name: "Oxytocin",
        fact: "Posterior pituitary (made in hypothalamus)",
        context: "Childbirth contractions + milk ejection",
        playbookSlug: "human-physiology",
      },
      {
        id: "estrogen",
        name: "Estrogen",
        fact: "Ovaries",
        context: "Female secondary sexual characteristics + menstrual cycle",
        playbookSlug: "human-physiology",
      },
      {
        id: "testosterone",
        name: "Testosterone",
        fact: "Testes",
        context: "Male secondary sexual characteristics + sperm production",
        playbookSlug: "human-physiology",
      },
      {
        id: "parathyroid-hormone",
        name: "Parathyroid Hormone (PTH)",
        fact: "Parathyroid glands (4, behind thyroid)",
        context: "Raises blood calcium",
        playbookSlug: "human-physiology",
      },
    ],
  },
  {
    theme: "Scientists ↔ Discoveries",
    blurb:
      "Repeat-tested authorship facts. Discovery / theory / book title ↔ scientist name. Drill against /playbooks/microbiology-and-disease (Fleming) and /playbooks/genetics-and-evolution (Darwin, Watson + Crick).",
    columns: {
      name: "Discovery / contribution",
      fact: "Scientist",
      context: "Year + context",
    },
    entries: [
      {
        id: "penicillin",
        name: "Penicillin (first antibiotic)",
        fact: "Alexander Fleming",
        context: "1928 · from Penicillium mould · Nobel 1945",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "origin-of-species",
        name: "On the Origin of Species (natural selection)",
        fact: "Charles Darwin",
        context: "1859 · evolution by natural selection",
        playbookSlug: "genetics-and-evolution",
        notes:
          "Don't swap with Lamarck (1809, inheritance of acquired characteristics, rejected).",
      },
      {
        id: "laws-of-inheritance",
        name: "Laws of inheritance (Segregation + Independent Assortment)",
        fact: "Gregor Mendel",
        context: "1865 · pea-plant experiments · founded modern genetics",
        playbookSlug: "genetics-and-evolution",
      },
      {
        id: "dna-double-helix",
        name: "DNA double helix structure",
        fact: "James Watson + Francis Crick",
        context: "1953 · used Rosalind Franklin's X-ray data · Nobel 1962",
        playbookSlug: "genetics-and-evolution",
      },
      {
        id: "cell-theory",
        name: "Cell theory (all life is cellular)",
        fact: "Matthias Schleiden + Theodor Schwann",
        context:
          "1838–39 · Schleiden plants, Schwann animals; Virchow 1855 added 'cells from cells'",
        playbookSlug: "cell-biology",
      },
      {
        id: "blood-circulation",
        name: "Blood circulation (heart pumps blood in a circuit)",
        fact: "William Harvey",
        context: "1628 · disproved Galen's static-blood model",
        playbookSlug: "human-physiology",
      },
      {
        id: "smallpox-vaccine",
        name: "Smallpox vaccine (first vaccine)",
        fact: "Edward Jenner",
        context: "1796 · cowpox inoculation against smallpox",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "rabies-vaccine",
        name: "Rabies vaccine + germ theory of disease",
        fact: "Louis Pasteur",
        context: "1885 rabies vaccine · pasteurisation · disproved spontaneous generation",
        playbookSlug: "microbiology-and-disease",
      },
      {
        id: "discovery-of-cell",
        name: "First observed + named cells",
        fact: "Robert Hooke",
        context: "1665 · cork sections under microscope · 'Micrographia'",
        playbookSlug: "cell-biology",
      },
      {
        id: "first-living-cell",
        name: "First observed living cells (bacteria, protozoa)",
        fact: "Anton van Leeuwenhoek",
        context: "1670s · invented high-magnification microscope · 'animalcules'",
        playbookSlug: "cell-biology",
      },
    ],
  },
];

/** Quick stats for the reference-tables hero. */
export const REFERENCE_STATS = {
  facts: REFERENCE_CLUSTERS.reduce((s, c) => s + c.entries.length, 0),
  clusters: REFERENCE_CLUSTERS.length,
};
