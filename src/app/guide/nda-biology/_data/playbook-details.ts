/**
 * Per-playbook deep-dive content for /guide/nda-biology/playbooks/{slug}.
 *
 * Each entry mirrors the chemistry/physics/english shape: trigger (one-line
 * "when to reach for this"), story (2–3 paragraph teacherly explanation),
 * sub-skills (the rules / patterns inside), traps (chapter-specific
 * distractor shapes), worked example UUIDs (2 per playbook, resolved via
 * loadWorkedExamples at request time), and relatedSlugs (cross-links to
 * other playbooks).
 *
 * UUIDs SQL-picked 2026-05-18 against the live 190-q NDA Biology PUBLIC
 * bank — most-recent year first, HARD picked when the chapter has a HARD
 * pool, else MOD/EASY. All 9 chapters have details.
 */

export type PlaybookDetail = {
  /** One-line "when to use" cue. */
  trigger: string;
  /** 2–3 paragraph teacherly explanation. */
  story: string[];
  /** The rules / sub-skills inside this playbook. */
  subSkills: { name: string; description: string }[];
  /** Distractor patterns specific to this playbook. */
  traps: { name: string; description: string }[];
  /** Ordered worked-example UUIDs from the bank. */
  exampleQuestionIds: string[];
  /** Cross-link to 2–3 related playbook slugs. */
  relatedSlugs: string[];
};

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // ─────────────────────── RECALL ───────────────────────
  "human-physiology": {
    trigger:
      "A blood-component or blood-group identification, a digestive-enzyme match (pepsin/trypsin/amylase), a vitamin↔deficiency-disease pair, an endocrine-gland↔hormone match, a respiratory-process question, or a sense-organ function.",
    story: [
      "52 q in 10 years — NDA Biology's largest chapter. 1 HARD across the whole window, so it's mostly pure recall. The Circulatory + Lymphatic subtopic alone is 13 q: RBC (no nucleus, biconcave, lifespan ~120 days, carries O₂ via haemoglobin), WBC (5 types — neutrophils, lymphocytes, monocytes, eosinophils, basophils), platelets (clotting), 4 blood groups (A, B, AB, O — universal donor O, universal recipient AB), and the lymphatic system (collects tissue fluid, returns to blood via thoracic duct).",
      "Digestive System + Enzymes (7 q, 14% HARD) is the chapter's lone trap pocket. Memorise the enzyme table: salivary amylase (mouth, starch → maltose), pepsin (stomach, acid-activated, protein → peptides), trypsin (small intestine, pancreatic, protein → amino acids), lipase (small intestine, fat → fatty acids + glycerol). The acid-secreting cells of the stomach wall produce HCl, which activates pepsinogen → pepsin — damage these cells and PROTEIN digestion suffers most (HARD 2018 PYQ).",
      "Nutrition + Vitamins + Minerals (7 q) is the named-fact recall workhorse. Vitamin C deficiency = scurvy. Vitamin D deficiency = rickets (children) / osteomalacia (adults). Vitamin A deficiency = night blindness. Vitamin B1 (thiamine) deficiency = beriberi. Vitamin K = blood clotting. Intestinal bacteria synthesise vitamin K + some B vitamins. Drill /reference-tables → 'Vitamins and Deficiencies' cluster. The Endocrine subtopic (5 q) tests gland↔hormone pairs — pituitary (master gland), thyroid (thyroxine, regulates metabolism), adrenal (adrenaline, fight-or-flight), pancreas (insulin/glucagon, glucose regulation).",
    ],
    subSkills: [
      {
        name: "Blood-component property recall",
        description:
          "RBC: NO nucleus (in mammals), biconcave, ~120-day lifespan, contains haemoglobin (O₂ + CO₂ transport). WBC: HAS nucleus, 5 types (lymphocytes = adaptive immunity / neutrophils = bacterial phagocytosis). Platelets: cell fragments, clotting. Plasma: 90% water, transports nutrients/wastes/hormones.",
      },
      {
        name: "Digestive enzyme match",
        description:
          "Salivary amylase (mouth, pH 7) → starch to maltose. Pepsin (stomach, pH 1.5–2 — needs HCl) → protein to peptides. Trypsin + chymotrypsin (small intestine, pancreatic) → peptides to amino acids. Lipase (small intestine, pancreatic + bile-emulsified) → fats to fatty acids + glycerol. Bile = NOT enzyme (just emulsifier).",
      },
      {
        name: "Vitamin–deficiency pair recall",
        description:
          "A → night blindness. B1 (thiamine) → beriberi. B2 → cracks at mouth corners. B3 (niacin) → pellagra. B12 → pernicious anaemia. C (ascorbic) → scurvy. D → rickets / osteomalacia. E → reproductive issues + neuropathy. K → bleeding (no clotting). Drill the table.",
      },
      {
        name: "Hormone–gland pair recall",
        description:
          "Pituitary (master) → GH, FSH, LH, TSH, ACTH, prolactin, ADH, oxytocin. Thyroid → thyroxine (T4) + calcitonin. Parathyroid → PTH (calcium homeostasis). Adrenal → adrenaline, noradrenaline, cortisol, aldosterone. Pancreas → insulin (β-cells) + glucagon (α-cells). Ovaries → estrogen + progesterone. Testes → testosterone.",
      },
    ],
    traps: [
      {
        name: "RBC has nucleus (in mammals)",
        description:
          "Mammalian RBCs LOSE their nucleus during maturation — that's why they're biconcave (max surface area for O₂ uptake) and have a ~120-day lifespan. Distractor says 'mature RBCs have a nucleus' or 'RBCs synthesise haemoglobin throughout life'. Frog/bird RBCs DO have nuclei, but NDA uses 'human' or 'mammal' context.",
      },
      {
        name: "Universal donor vs recipient swap",
        description:
          "O = universal DONOR (no A/B antigens to attack). AB = universal RECIPIENT (no A/B antibodies to react). Distractor swaps them — 'AB is universal donor' or 'O is universal recipient'. The donor rule is about ANTIGENS on RBCs; the recipient rule is about ANTIBODIES in plasma.",
      },
      {
        name: "Pepsin works in alkaline conditions",
        description:
          "Pepsin is ACTIVATED by HCl (stomach pH ~1.5–2). It DENATURES in alkaline pH (small intestine pH ~8 — that's why trypsin takes over there). Distractor says pepsin works best at neutral or alkaline pH. Mnemonic: 'pepsin = acidic stomach, trypsin = alkaline small intestine'.",
      },
    ],
    exampleQuestionIds: [
      "61e34b98-4891-490b-b080-2d54c63914f2", // HARD 2018 — acid-secreting cells damaged → which biomolecule
      "1a75329f-4bab-4908-b910-36a46c42ef1e", // EASY 2026 — first meiotic cell division in spermatogenesis
    ],
    relatedSlugs: [
      "cell-biology",
      "microbiology-and-disease",
      "reproduction",
    ],
  },

  "cell-biology": {
    trigger:
      "A cell-organelle function match (ribosome/mitochondria/golgi/ER), a prokaryote-vs-eukaryote distinction, an osmosis-direction prediction, a cell-membrane property question, or a cell-respiration energetics question.",
    story: [
      "44 q in 10 years, 1 HARD. The chapter that defines 'cell theory' (Schleiden + Schwann, 1839 — all living things made of cells; Virchow, 1855 — cells from pre-existing cells). Cell Organelles + Functions is the giant subtopic (17 q): ribosome (protein synthesis, NO membrane), mitochondria (ATP, 'powerhouse', has its own DNA), chloroplast (photosynthesis, only plants + some protists), rough ER (ribosome-studded, protein modification), smooth ER (lipid synthesis), golgi apparatus (packaging + secretion), lysosomes (digestion, 'suicide bags'), vacuole (storage, large in plants).",
      "Prokaryote vs Eukaryote (5 q) is the rule subtopic. Prokaryotes (bacteria, archaea): NO membrane-bound organelles, NO true nucleus (nucleoid), 70S ribosomes, circular DNA, smaller (1–10 μm). Eukaryotes (plants, animals, fungi, protists): membrane-bound organelles, true nucleus, 80S ribosomes, linear DNA, larger (10–100 μm). All cells have ribosomes + plasma membrane + cytoplasm + DNA. NOT all cells have cell wall (only plants, fungi, bacteria) or true nucleus (prokaryotes don't).",
      "Osmosis and Tonicity (4 q, 25% HARD) is the chapter's lone trap pocket. Water moves from HIGH water potential (low solute) to LOW water potential (high solute). RBC in hypotonic solution → swells + bursts (haemolysis). RBC in hypertonic → shrinks (crenation). The HARD 2021 PYQ asks about RBCs in 2% detergent solution — detergent disrupts membrane lipids INDEPENDENTLY of tonicity, so the cell bursts via membrane disruption (not osmosis). Read the question carefully — same chemistry-of-tonicity trap as Chemistry's 'is this an osmosis question or a membrane-chemistry question'.",
    ],
    subSkills: [
      {
        name: "Cell organelle function match",
        description:
          "Ribosome → protein synthesis (no membrane). Mitochondria → ATP via cellular respiration (own DNA, double membrane). Chloroplast → photosynthesis (plant only, own DNA). Rough ER → protein modification (ribosome-studded). Smooth ER → lipid synthesis + detoxification. Golgi → packaging + secretion. Lysosome → intracellular digestion. Vacuole → storage. Centrosome → microtubule organisation (animal only).",
      },
      {
        name: "Prokaryote vs eukaryote distinction",
        description:
          "Prokaryote: NO true nucleus, NO membrane-bound organelles, 70S ribosomes, circular DNA. Eukaryote: true nucleus, membrane-bound organelles, 80S ribosomes, linear DNA. ALL cells have plasma membrane + cytoplasm + ribosomes + DNA. NOT all have cell wall or membrane-bound nucleus.",
      },
      {
        name: "Osmosis-direction prediction",
        description:
          "Water moves from high water potential (low solute conc) to LOW water potential (high solute conc). Cell in hypotonic solution (lower outside conc) → water in → swells/bursts. Cell in hypertonic (higher outside conc) → water out → shrinks. Isotonic → no net movement.",
      },
      {
        name: "Cellular respiration energetics",
        description:
          "Glycolysis (cytoplasm, anaerobic) → glucose to 2 pyruvate + 2 ATP. Krebs cycle (mitochondrial matrix) → pyruvate to CO₂ + NADH + FADH₂ + 2 ATP. ETC (inner mitochondrial membrane) → NADH/FADH₂ to ATP via O₂. Total = 36–38 ATP per glucose. Anaerobic = 2 ATP only.",
      },
    ],
    traps: [
      {
        name: "Cell wall in animal cells",
        description:
          "Animal cells have NO cell wall — only plasma membrane. Plants, fungi (chitin), bacteria (peptidoglycan), and some protists have cell walls. Distractor says 'all cells have a cell wall'. Statement-evaluation trap — common in multi-statement questions.",
      },
      {
        name: "Nucleus in all cells",
        description:
          "Prokaryotes have NO true nucleus (just a nucleoid region with DNA). Mammalian RBCs LOSE their nucleus during maturation. Distractor says 'all cells have a well-organised nucleus' — false on two counts.",
      },
      {
        name: "Osmosis-vs-membrane-disruption confusion",
        description:
          "When the external solution disrupts cell membranes chemically (detergents, alcohols, hypotonic saponins), the cell bursts via MEMBRANE DISRUPTION, not osmosis. Distractor says 'cell bursts because hypotonic' when the actual mechanism is detergent dissolving the lipid bilayer. Read for solvent identity.",
      },
    ],
    exampleQuestionIds: [
      "116f1f51-d093-43bd-bdb9-115c6ba8cb8c", // HARD 2021 — RBC in 2% detergent solution
      "74168eae-2768-4fc6-a2bd-fcd76155b455", // MOD 2026 — multi-statement Cell structure
    ],
    relatedSlugs: [
      "human-physiology",
      "plant-biology",
      "biochemistry",
    ],
  },

  "microbiology-and-disease": {
    trigger:
      "A disease↔pathogen pair (elephantiasis-Wuchereria, smallpox-virus, cholera-Vibrio, TB-Mycobacterium, malaria-Plasmodium), a vector identification (mosquito for malaria), an antibiotic-discovery question (Fleming-Penicillin), or a virus-vs-bacteria distinction.",
    story: [
      "21 q in 10 years, ZERO HARD. The most under-invested chapter in NDA Biology — every question is named-fact recall, and every paper has 2–3 of them. Pathogens and Diseases (13 q) is the marquee subtopic. The disease↔pathogen table is the single highest-leverage memorisation in NDA Biology — drill /reference-tables → 'Diseases and Pathogens' cluster cold.",
      "Bacterial diseases: TB (Mycobacterium tuberculosis), cholera (Vibrio cholerae), typhoid (Salmonella typhi), tetanus (Clostridium tetani), syphilis (Treponema). Viral: smallpox (Variola — eradicated 1980), AIDS (HIV — retrovirus, RNA genetic material), polio (Poliovirus), dengue (DENV — affects platelets), measles, chickenpox. Parasitic: malaria (Plasmodium, vector = female Anopheles mosquito), sleeping sickness (Trypanosoma, vector = tsetse fly), elephantiasis (Wuchereria bancrofti, filarial worm), kala-azar (Leishmania, vector = sandfly). Waterborne diseases: cholera, typhoid, hepatitis A, dysentery.",
      "Antibiotics — Discovery (7 q) is the second-biggest subtopic. Penicillin discovered by Alexander Fleming (1928). Antibiotics work against BACTERIA, NOT against viruses (viruses don't have the structures antibiotics target — no cell wall, no bacterial-style ribosomes). This is repeat-tested: 'antibiotics treat viral infections' is always wrong. Bacterial cell wall = peptidoglycan (the penicillin target). Disease Vectors — Malaria (1 q) keeps recurring as 'vector of malaria parasites is female Anopheles mosquito'.",
    ],
    subSkills: [
      {
        name: "Disease–pathogen pair recall",
        description:
          "TB = Mycobacterium tuberculosis. Cholera = Vibrio cholerae. Typhoid = Salmonella. Tetanus = Clostridium tetani. Malaria = Plasmodium. Sleeping sickness = Trypanosoma. Elephantiasis = Wuchereria bancrofti. AIDS = HIV (retrovirus). Smallpox = Variola virus. Dengue = DENV (reduces platelets).",
      },
      {
        name: "Pathogen-type classification",
        description:
          "Bacterial (cured by antibiotics): TB, cholera, typhoid, tetanus, leprosy, syphilis. Viral (NOT cured by antibiotics): AIDS, polio, smallpox, measles, hepatitis, dengue, COVID. Parasitic (cured by antiparasitics): malaria, kala-azar, sleeping sickness, elephantiasis. Fungal: ringworm, athlete's foot, candidiasis.",
      },
      {
        name: "Disease vector match",
        description:
          "Malaria → female Anopheles mosquito. Dengue + chikungunya + Zika → Aedes aegypti. Sleeping sickness → tsetse fly. Kala-azar → sandfly. Plague → rat flea (Xenopsylla). Filariasis → Culex mosquito. Match the vector species cold.",
      },
      {
        name: "Antibiotic-discovery + mechanism",
        description:
          "Penicillin → Alexander Fleming (1928) → first antibiotic, from Penicillium mould. Mechanism: blocks bacterial cell-wall synthesis. Antibiotics work ONLY against bacteria (cell wall + 70S ribosomes are targets). Viruses lack both → antibiotics useless against viral infections. Streptomycin → first effective TB drug (Waksman, 1943).",
      },
    ],
    traps: [
      {
        name: "Malaria : Mycobacterium swap",
        description:
          "Recurring NDA match-pair trap. Malaria is caused by PLASMODIUM (parasite), NOT Mycobacterium (that's TB). TB is caused by MYCOBACTERIUM tuberculosis, NOT Plasmodium. Distractor pairs them backwards — the 2025 PYQ tests exactly this swap.",
      },
      {
        name: "Antibiotics treat viral infections",
        description:
          "Wrong. Antibiotics target bacterial cell walls (peptidoglycan) and bacterial 70S ribosomes. Viruses have NEITHER — they have no cell wall and hijack host ribosomes. So antibiotics are useless against viral infections (COVID, flu, AIDS). Antiviral drugs (acyclovir, oseltamivir) are different. Distractor says 'antibiotics cure viral infections' — always false.",
      },
      {
        name: "Smallpox bacterium",
        description:
          "Smallpox is caused by Variola VIRUS (eradicated globally in 1980 via WHO vaccination). Distractor labels it bacterial. Eradicated diseases worth knowing: smallpox (1980, global), polio (regionally — India 2014), guinea worm (near elimination).",
      },
    ],
    exampleQuestionIds: [
      "8b39982f-d429-4308-963b-cc9582d954c2", // EASY 2025 — Malaria:Mycobacterium pairs question
      "9cb7e1e9-1101-4df4-926d-d507dbcb4f32", // EASY 2025 — vector of malaria parasites
    ],
    relatedSlugs: [
      "human-physiology",
      "cell-biology",
      "biodiversity-and-classification",
    ],
  },

  "biodiversity-and-classification": {
    trigger:
      "A 'sponges are which phylum' (Porifera) question, an animal-class identification (arthropod features, vertebrate vs invertebrate), a plant-group distinction (bryophyte vs pteridophyte vs gymnosperm vs angiosperm), or a fungal-kingdom question.",
    story: [
      "11 q in 10 years, ZERO HARD across the whole window. Pure classification recall — Pure marks if you read the kingdom + phylum tables once. Animal Kingdom (5 q) is the biggest subtopic. The 9 major animal phyla you need: Porifera (sponges), Cnidaria (jellyfish/hydra), Platyhelminthes (flatworms — tapeworm, planaria), Nematoda (roundworms — Ascaris, Wuchereria), Annelida (segmented worms — earthworm, leech), Arthropoda (insects, crustaceans, arachnids — JOINTED legs + chitin exoskeleton, the largest phylum), Mollusca (soft body + shell — snail, octopus, mussel), Echinodermata (starfish, sea urchin — spiny skin), Chordata (notochord — includes vertebrates).",
      "Plant Kingdom (4 q) — 4 major groups: Algae (aquatic, no true roots), Bryophyta (mosses, liverworts — non-vascular, need moisture for reproduction, 'amphibians of plants'), Pteridophyta (ferns — vascular, no seeds, reproduce by spores), Gymnosperms (conifers, cycads — seeds NOT enclosed in fruit, naked seeds), Angiosperms (flowering plants — seeds enclosed in fruit; monocot vs dicot subdivision). Bryophytes commonly tested distinction: no true vascular tissue, reproduce by spores, need water for fertilisation (motile sperm).",
      "Kingdom Fungi (2 q) is small but appears regularly. Fungi are heterotrophs (absorb nutrients), cell wall = chitin (NOT cellulose like plants), unicellular (yeast) or multicellular (mushrooms, moulds). Examples: Penicillium (penicillin source), Aspergillus, Saccharomyces (yeast, fermentation), Rhizopus (bread mould). Lichens = symbiotic fungus + algae (mutualism). Mycorrhiza = symbiotic fungus + plant roots.",
    ],
    subSkills: [
      {
        name: "Animal phylum identification",
        description:
          "Porifera = sponges (pore-bearing, no true tissues). Cnidaria = stinging cells (hydra, jellyfish, coral). Arthropoda = jointed legs + chitin exoskeleton (insects, crustaceans, arachnids). Mollusca = soft body + shell (snail, octopus). Echinodermata = spiny skin + water-vascular system (starfish, sea urchin). Chordata = notochord (vertebrates).",
      },
      {
        name: "Plant group distinction",
        description:
          "Algae: aquatic, no roots/stems/leaves. Bryophytes: non-vascular, motile sperm needs water (mosses). Pteridophytes: vascular but seedless, spore-reproducing (ferns). Gymnosperms: seeds NOT in fruit ('naked', conifers). Angiosperms: seeds enclosed in fruit (flowering plants). Monocot (1 cotyledon, parallel veins, fibrous root) vs dicot (2 cotyledons, reticulate veins, tap root).",
      },
      {
        name: "Vertebrate class identification",
        description:
          "Pisces (fish — gills, scales, cold-blooded). Amphibia (frogs — moist skin, larval gills, cold-blooded). Reptilia (snakes/lizards — scales, lay eggs on land, cold-blooded). Aves (birds — feathers, lay hard-shelled eggs, warm-blooded, hollow bones). Mammalia (warm-blooded, mammary glands, hair, mostly viviparous except monotremes).",
      },
      {
        name: "Fungal-kingdom features",
        description:
          "Fungi: heterotrophic (absorb nutrients via secreted enzymes), cell wall = CHITIN (not cellulose). Examples: Penicillium (antibiotic source), Yeast/Saccharomyces (fermentation), Rhizopus (bread mould), Aspergillus, Mushrooms (Agaricus). Lichens = fungus + alga symbiosis. Mycorrhiza = fungus + plant root.",
      },
    ],
    traps: [
      {
        name: "Insects = Insecta is a phylum",
        description:
          "Insecta is a CLASS within Arthropoda, NOT a phylum. Arthropoda is the phylum (includes Insecta + Crustacea + Arachnida + Myriapoda). Distractor says 'insects are a phylum' — wrong level of hierarchy.",
      },
      {
        name: "Bryophyte vs pteridophyte vascular swap",
        description:
          "Bryophytes (mosses) are NON-vascular (no xylem/phloem). Pteridophytes (ferns) ARE vascular but lack seeds. Distractor says 'bryophytes have vascular tissue' or 'pteridophytes have seeds'. Bryophytes also need water for fertilisation (motile sperm); seed plants don't.",
      },
      {
        name: "Fungi have cellulose cell wall",
        description:
          "Fungi have CHITIN cell walls (the same polymer as insect exoskeletons). Plants have CELLULOSE walls. Bacteria have PEPTIDOGLYCAN walls. Distractor says 'fungal cell walls are made of cellulose' — false. Cell-wall material is a recurring identity-confusion trap.",
      },
    ],
    exampleQuestionIds: [
      "a7108d1d-27da-4ee0-912e-e8d556556825", // EASY 2024 — sponges phylum
      "0422c1bc-5248-431a-bc7c-1cf5352e3d9e", // MOD 2023 — bryophytes statements
    ],
    relatedSlugs: [
      "microbiology-and-disease",
      "plant-biology",
      "ecology-and-environment",
    ],
  },

  "genetics-and-evolution": {
    trigger:
      "A DNA-base-pairing question (A-T and G-C), a heredity-principle question (gene/allele/chromosome basics), or a 'who proposed/wrote X' question (Darwin/Origin of Species).",
    story: [
      "4 q in 10 years, ZERO HARD. The smallest NDA Biology chapter. Heredity and DNA (3 q): the genetic-material questions test base pairing rules — adenine pairs with thymine (A-T, 2 H-bonds), guanine pairs with cytosine (G-C, 3 H-bonds); the double helix has antiparallel strands; humans have 46 chromosomes (23 pairs); chromatin = DNA + histone proteins.",
      "Theory of Evolution (1 q): Darwin's 'On the Origin of Species by Means of Natural Selection' (1859) is the textbook reference. Lamarck (1809) proposed inheritance of acquired characteristics (rejected). Mendel (1865) established laws of inheritance from pea-plant experiments (Law of Segregation, Law of Independent Assortment). Watson + Crick (1953) — DNA double helix structure.",
      "Don't over-invest in this chapter — 4 q across 10 years = 0.4 q per year on average. Read once in 30 min, recognise on test day, move on. The bigger chapter for inheritance content is Reproduction (Sexual Reproduction — Genetic Principles, 3 q).",
    ],
    subSkills: [
      {
        name: "DNA base-pairing rules",
        description:
          "A (adenine, purine) pairs with T (thymine, pyrimidine) via 2 H-bonds. G (guanine, purine) pairs with C (cytosine, pyrimidine) via 3 H-bonds. Strands are antiparallel (5'→3' opposite to 3'→5'). In RNA, T is replaced by U (uracil). Total purine = total pyrimidine (Chargaff's rule).",
      },
      {
        name: "Chromosome arithmetic",
        description:
          "Humans: 46 chromosomes = 23 pairs (22 autosomes + 1 sex pair). Gametes (egg, sperm) = 23 chromosomes (haploid). Zygote = 46 (diploid). XX = female, XY = male. Down syndrome = trisomy 21 (3 copies of chromosome 21).",
      },
      {
        name: "Evolution + heredity authorship",
        description:
          "Darwin (1859) → Origin of Species, natural selection. Mendel (1865) → laws of inheritance from pea plants. Lamarck (1809) → inheritance of acquired characteristics (refuted). Watson + Crick (1953) → DNA double helix. Morgan → chromosome theory of inheritance (fruit flies).",
      },
    ],
    traps: [
      {
        name: "A pairs with G",
        description:
          "Wrong. A always pairs with T (DNA) or U (RNA). G always pairs with C. Distractor swaps the pairings or pairs purine-with-purine. The 2025 PYQ tests exactly this — 'normal DNA base pairing' is A-T and G-C.",
      },
      {
        name: "Lamarck wrote Origin of Species",
        description:
          "DARWIN wrote 'On the Origin of Species' (1859). Lamarck proposed an EARLIER and now-rejected theory of inheritance of acquired characteristics (1809). Distractor swaps the authors. Mendel founded modern genetics with pea-plant experiments (1865).",
      },
    ],
    exampleQuestionIds: [
      "47058e32-0b9f-4a0c-838b-7bff51487d7c", // EASY 2025 — Origin of Species author
      "cc85ea66-7b53-47f6-b347-046bd80cf3b7", // EASY 2025 — DNA base pairing
    ],
    relatedSlugs: [
      "reproduction",
      "cell-biology",
      "biodiversity-and-classification",
    ],
  },

  // ─────────────────────── APPLY ───────────────────────
  "plant-biology": {
    trigger:
      "A plant-tissue function question (xylem vs phloem direction, meristem location), a photosynthesis-equation or site question, a seed/fruit/embryo development question, or a transpiration / tropism / plant-process experimental question.",
    story: [
      "29 q in 10 years, 1 HARD. Plant Biology is the Apply strand workhorse — every subtopic requires tracing a plant process, not just naming a structure. Plant Tissues + Meristems (11 q) is the biggest subtopic: xylem carries water + minerals UP (root → leaves, one-direction, via transpiration pull + root pressure); phloem carries food (sugars from photosynthesis) BIDIRECTIONALLY (source → sink, via pressure-flow). Meristems are growth tissues: apical meristem (tips → length, primary growth), lateral meristem (sides → width, secondary growth, only in dicots).",
      "Photosynthesis (10 q) — site = chloroplast (specifically thylakoid for light reactions, stroma for dark reactions). Equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Light-dependent reactions split water (H₂O → 2H⁺ + ½O₂ + 2e⁻), produce ATP + NADPH. Light-independent (Calvin cycle) uses ATP + NADPH to fix CO₂ into glucose. The pigment is chlorophyll (absorbs red + blue light, reflects green — that's why leaves look green).",
      "Transpiration, Tropisms and Plant Processes (3 q, 33% HARD) is the chapter's Apply pocket. The HARD 2021 PYQ is the classic vaseline-on-leaf experiment: vaseline on upper surface vs vaseline on lower surface vs control. Stomata are MOSTLY on the LOWER surface in most dicots → vaseline-lower blocks most transpiration → that leaf loses LEAST mass. Tropisms: phototropism (toward light), geotropism (toward gravity for roots), hydrotropism (toward water), thigmotropism (toward touch — vine tendrils). All are auxin-mediated growth responses.",
    ],
    subSkills: [
      {
        name: "Xylem vs phloem direction + function",
        description:
          "Xylem: dead cells (tracheids + vessels), carries WATER + dissolved minerals from roots UPWARD only (one-direction, via transpiration pull + root pressure). Phloem: living cells (sieve tubes + companion cells), carries FOOD (sugars from photosynthesis) BIDIRECTIONALLY from source (leaves) to sink (fruits, roots, growing parts).",
      },
      {
        name: "Meristem location + growth type",
        description:
          "Apical meristem: at root tips + shoot tips → PRIMARY GROWTH (increases length). Lateral meristem (vascular cambium + cork cambium): along stem + root sides → SECONDARY GROWTH (increases width / girth) — only in dicots + gymnosperms; monocots lack lateral meristem (no secondary growth, that's why grass stems don't thicken).",
      },
      {
        name: "Photosynthesis equation + site",
        description:
          "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Site: chloroplast. Light reactions in THYLAKOID membranes (produce ATP + NADPH, split H₂O → O₂). Dark reactions / Calvin cycle in STROMA (fix CO₂ into glucose using ATP + NADPH). Pigment: chlorophyll a (primary), chlorophyll b, carotenoids — absorb red + blue, reflect green.",
      },
      {
        name: "Transpiration physics",
        description:
          "Water loss from plant aerial parts (mostly leaves, mostly via STOMATA). Stomata mostly on LOWER leaf surface in dicots. Cohesion-tension theory: water column held together by cohesion (H-bonds) + adhesion to xylem walls → transpiration pull lifts water from root to leaf. Factors: temperature, humidity (low → more), wind, light (stomata open in light).",
      },
    ],
    traps: [
      {
        name: "Phloem one-direction (like xylem)",
        description:
          "Phloem is BIDIRECTIONAL — moves food from source (any photosynthesising leaf) to sink (any consuming tissue). Direction depends on time of year + plant part. Distractor says 'phloem moves food upward only' or 'phloem moves food downward only'. Only xylem is strictly one-direction (root→leaf, never reverse).",
      },
      {
        name: "Photosynthesis happens at night",
        description:
          "Light-DEPENDENT reactions need light → only daytime. Light-INDEPENDENT (Calvin cycle / dark reactions) can technically run without direct light BUT depend on ATP + NADPH from the light reactions — so in practice photosynthesis stops without light. Plants RESPIRE 24/7 (release CO₂); photosynthesis is daytime only.",
      },
      {
        name: "Vaseline-on-upper-surface = no effect",
        description:
          "In most dicots stomata are mostly on the LOWER surface, so vaseline on UPPER surface blocks fewer stomata + less transpiration. But it's NOT zero effect — some stomata + cuticular transpiration still occur upper. Distractor says 'upper-vaseline leaf transpires same as control'. Reality: upper-vaseline transpires slightly less than control; lower-vaseline transpires MUCH less than both.",
      },
    ],
    exampleQuestionIds: [
      "49fc1bf7-4778-4fb6-b833-aaad92649192", // HARD 2021 — vaseline-on-leaf experiment
      "b994766a-6266-4315-8ec6-8964b80db41e", // MOD 2026 — false fruit like apple
    ],
    relatedSlugs: [
      "cell-biology",
      "reproduction",
      "biochemistry",
    ],
  },

  "reproduction": {
    trigger:
      "A pollination question (self vs cross, agent), a fertilisation arithmetic (double fertilisation 2n + n = 3n), a sexual-vs-asexual genetic-principles question, an oestrus-cycle question, or a meiosis vs mitosis distinction.",
    story: [
      "13 q in 10 years, 1 HARD. Small chapter but disproportionately HARD-heavy (8% HARD vs the bank average 2.1%). Angiosperm Reproduction — Pollination and Fertilization (7 q) is the biggest subtopic. Pollination = transfer of pollen from anther to stigma. Self-pollination (same flower or same plant) vs cross-pollination (between plants). Cross-pollination agents: wind (anemophily — light, dry pollen, no nectar — grasses, conifers), insects (entomophily — bright + scented + nectar — most flowering plants), water (hydrophily — Vallisneria), birds (ornithophily — long tubular flowers).",
      "Double Fertilisation is the angiosperm signature — happens in the embryo sac. Two male nuclei from the pollen tube fuse: one with the EGG (1n + 1n = 2n zygote → develops into embryo), the other with the two POLAR NUCLEI (1n + 2n = 3n primary endosperm nucleus → develops into endosperm, feeds embryo). Result: embryo is 2n, endosperm is 3n, seed coat is 2n (from integuments of ovule, MATERNAL). The HARD pocket lives in Sexual Reproduction — Genetic Principles (3 q, 33% HARD).",
      "Animal and Human Reproduction (2 q) — oestrus cycle is observed in non-primate mammals (cats, dogs, cattle, rats), NOT humans + apes (we have menstrual cycle). Oestrus = receptive period (heat). Spermatogenesis occurs in seminiferous tubules (testes); first meiotic division converts primary spermatocyte (diploid) → secondary spermatocyte (haploid). Meiosis vs mitosis: meiosis halves chromosome number + creates 4 unique gametes (genetic variation via crossing over + independent assortment); mitosis maintains chromosome number + creates 2 identical daughter cells (growth + repair).",
    ],
    subSkills: [
      {
        name: "Pollination type + agent",
        description:
          "Self-pollination: same flower (autogamy) or different flowers same plant (geitonogamy). Cross-pollination (xenogamy): wind (anemophily — grasses, no nectar, light pollen), insects (entomophily — bright + scented + nectar, most flowering plants), water (hydrophily — Vallisneria, Hydrilla), birds (ornithophily — Bombax, hibiscus). Bee/butterfly/bird flowers have evolved features matching their pollinator.",
      },
      {
        name: "Double fertilisation arithmetic",
        description:
          "Pollen tube delivers 2 male nuclei to embryo sac. Nucleus 1 + egg = ZYGOTE (1n + 1n = 2n) → embryo. Nucleus 2 + 2 polar nuclei = PRIMARY ENDOSPERM NUCLEUS (1n + 2n = 3n) → endosperm. Embryo = 2n, endosperm = 3n, seed coat = 2n (maternal). Apomixis = seed formation WITHOUT fertilisation (asexual reproduction via seeds).",
      },
      {
        name: "Genetic continuity in sexual reproduction",
        description:
          "Parent and offspring share the same SPECIES + the same chromosome NUMBER (after fertilisation), but offspring's specific gene combination differs from each parent (50% from each). Meiosis halves chromosome number in gametes → fertilisation restores diploid. Crossing over + independent assortment generate genetic variation. Asexual reproduction → offspring genetically IDENTICAL to parent (clones).",
      },
      {
        name: "Oestrus cycle scope",
        description:
          "Oestrus cycle: regular reproductive cycle in NON-primate mammals (cats, dogs, cattle, rats, deer). Female is fertile + receptive only during oestrus ('heat'). Primates (humans, apes, monkeys) have MENSTRUAL cycle instead — periodic shedding of uterine lining; female is receptive throughout cycle. Birds, reptiles, fish do not show oestrus.",
      },
    ],
    traps: [
      {
        name: "Endosperm is 2n, embryo is 3n",
        description:
          "WRONG WAY ROUND. EMBRYO = 2n (1n egg + 1n sperm). ENDOSPERM = 3n (2n polar nuclei + 1n sperm). Distractor swaps the ploidy. Mnemonic: endosperm is the FOOD store, made from MORE genetic material (3n). Embryo is the offspring proper (2n like the parents).",
      },
      {
        name: "Humans show oestrus cycle",
        description:
          "Humans + apes show MENSTRUAL cycle, NOT oestrus. Distractor lists humans as oestrus-showing. The 2026 NDA PYQ tests this — 'in which group of animals oestrus cycle is NOT observed' = answer is primates / humans / apes (depending on options).",
      },
      {
        name: "Wind-pollinated flowers are bright + scented",
        description:
          "Wind-pollinated (anemophily) flowers are DULL, ODOURLESS, NO NECTAR — they don't need to attract pollinators. They produce huge amounts of dry, light pollen (grasses, conifers). BRIGHT + SCENTED + NECTAR = insect-pollinated (entomophily). Distractor mixes the trait list across pollination modes.",
      },
    ],
    exampleQuestionIds: [
      "44916a53-0bba-4c62-ad7c-0963dd5c54aa", // HARD 2023 — sexual reproduction parent/offspring statement
      "d27cb02c-4b06-4e96-9b04-d78860718875", // MOD 2026 — oestrus cycle NOT observed
    ],
    relatedSlugs: [
      "plant-biology",
      "cell-biology",
      "genetics-and-evolution",
    ],
  },

  // ─────────────────────── VERIFY ───────────────────────
  "ecology-and-environment": {
    trigger:
      "A biome-identification question (tropical rainforest features, taiga, savanna), a food-chain construction, a producer/consumer/decomposer identification, an ecological-interaction question (mutualism / commensalism / parasitism), or a 'consider the following statements about ecosystems' multi-statement evaluation.",
    story: [
      "12 q in 10 years, ZERO HARD across the whole window. Verify strand — half the questions are multi-statement evaluation ('Consider the following statements... which are correct?'). Environment and Biodiversity (6 q) covers biome-feature identification and ecological awareness. Ecosystems, Biomes and Ecological Interactions (6 q) covers food chains, ecological interactions, biome classification.",
      "Major land biomes you need: Tropical rainforest (high rainfall + temperature year-round, most biodiverse, evergreen broadleaf), Savanna (grassland + scattered trees, wet + dry seasons), Desert (low rainfall, extreme temperature variation), Temperate deciduous forest (4 seasons, leaf-shedding in autumn), Taiga / boreal forest (cold + coniferous, large biome by area), Tundra (frozen subsoil = permafrost, treeless, lichen + moss). The 2024 PYQ tests 'high rainfall + temperatures cold to mild + evergreen' → temperate rainforest (a less-tested biome — usually it's tropical that comes up).",
      "Ecological interactions: Mutualism = both benefit (+/+) — lichen, mycorrhiza, bee + flower. Commensalism = one benefits, other unaffected (+/0) — barnacles on whales. Parasitism = one benefits at cost to other (+/−) — tapeworm in human gut. Predation (+/−). Competition (−/−). Food chain = unidirectional flow of energy (producer → primary consumer → secondary consumer → tertiary → decomposer). Only ~10% energy transfers between trophic levels (90% lost as heat). Food web = interconnected food chains.",
    ],
    subSkills: [
      {
        name: "Biome identification by features",
        description:
          "Tropical rainforest: hot + wet year-round, broadleaf evergreen, most biodiverse. Savanna: tropical grassland + scattered trees, wet/dry seasons. Desert: very low rainfall, large temp swings, succulents + small mammals. Tundra: permafrost, treeless, lichens + mosses, short summer. Taiga: cold + coniferous, large area. Coral reef: warm + shallow tropical ocean, second-most biodiverse.",
      },
      {
        name: "Food chain + trophic levels",
        description:
          "Producers (autotrophs — plants, algae) → Primary consumers (herbivores) → Secondary consumers (carnivores eating herbivores) → Tertiary consumers (top predators) → Decomposers (bacteria + fungi). ~10% energy transfers per trophic level. Food web = interconnected chains.",
      },
      {
        name: "Ecological interaction types",
        description:
          "Mutualism (+/+): both benefit (lichen = fungus + alga; mycorrhiza = fungus + plant root; bee + flower). Commensalism (+/0): one benefits, other unaffected (barnacles on whales). Parasitism (+/−): one benefits at cost (tapeworm in gut, Plasmodium in human, mosquito feeding). Predation (+/−). Competition (−/−). Amensalism (0/−).",
      },
      {
        name: "Multi-statement evaluation discipline",
        description:
          "Read each statement INDEPENDENTLY before pairing with the answer options. Judge each as true / false against your knowledge. Then match to the option that lists EXACTLY the correct subset. Common trap: option that lists 2 of 3 correct statements (when there are actually 3 correct) — partial-credit distractor.",
      },
    ],
    traps: [
      {
        name: "Mutualism vs commensalism confusion",
        description:
          "Mutualism = BOTH benefit (lichen, mycorrhiza, bee + flower). Commensalism = ONE benefits, other UNAFFECTED (not harmed). Distractor labels lichen 'commensalism' (wrong — both partners benefit; the alga provides food, the fungus provides shelter + minerals). Always identify what each partner gets before classifying.",
      },
      {
        name: "Decomposers as consumers",
        description:
          "Decomposers (bacteria + fungi) are NOT classified as consumers — they form a separate functional group that breaks down dead organic matter. They recycle nutrients back to producers. Distractor groups them with carnivores or omnivores. Producers + consumers + decomposers are the three functional groups in an ecosystem.",
      },
      {
        name: "Energy increases up the food chain",
        description:
          "WRONG. Energy DECREASES up the food chain (only ~10% transfers per trophic level). Top predators have the LEAST available energy → smallest populations. BIOMAGNIFICATION of toxins (DDT) is what increases up the food chain, not energy. Distractor confuses energy flow with toxin accumulation.",
      },
    ],
    exampleQuestionIds: [
      "008bd53b-1630-4bd9-9f6d-1d1d4e084a5d", // MOD 2024 — biome identification by characteristics
      "0df19cfa-5a2c-42da-b4fb-830e39560210", // EASY 2023 — flower-honeybee relationship
    ],
    relatedSlugs: [
      "biodiversity-and-classification",
      "plant-biology",
      "biochemistry",
    ],
  },

  "biochemistry": {
    trigger:
      "A rancidity / browning question (fat-and-oil spoilage), an anaerobic-respiration / fermentation question (ethanol + CO₂ from yeast), or a protein-structure question (peptide bonds, primary/secondary/tertiary structure).",
    story: [
      "4 q in 10 years, ZERO HARD. The smallest NDA Biology chapter — tied with Genetics and Evolution. Verify strand because the recurring shape is 'which of the following statements about X is/are correct?'. Food Spoilage — Rancidity and Browning (2 q): rancidity = OXIDATION of fats + oils in food → off-smell + off-taste. Caused by air exposure + light + heat. Prevention: refrigeration, packaging in opaque containers, antioxidants (BHA, BHT), packaging in inert gas (N₂). Browning = Maillard reaction (sugars + amino acids react when heated — that's why baked bread + grilled meat brown).",
      "Anaerobic Respiration and Fermentation (1 q): cellular respiration without oxygen. In yeast (Saccharomyces) → ethanol + CO₂ (alcoholic fermentation, used in baking + brewing). In animal muscle under O₂-starvation → lactic acid (causes muscle fatigue). Net ATP: anaerobic = 2 ATP per glucose; aerobic = 36–38 ATP per glucose. So anaerobic is much less efficient — that's why organisms switch to aerobic when O₂ is available.",
      "Protein Structure (1 q): primary structure = linear sequence of amino acids joined by PEPTIDE BONDS (C-N bond between -COOH of one and -NH₂ of next). Secondary = α-helix or β-sheet (H-bonded). Tertiary = 3D folding (R-group interactions). Quaternary = multi-subunit assembly (haemoglobin = 4 subunits). The 2025 PYQ tests 'linear sequence of amino acids linked by peptide bonds best represents the' → answer = primary structure of protein.",
    ],
    subSkills: [
      {
        name: "Rancidity mechanism + prevention",
        description:
          "Rancidity = oxidation of fats/oils → off-smell + taste. Causes: O₂ exposure + light + heat + moisture. Prevention: refrigeration, opaque/airtight packaging, antioxidants (BHA, BHT, vitamin E), inert gas (N₂) flushing. The 2025 PYQ tests this: 'what happens when fat-and-oil-containing foods are left out long' = rancidity.",
      },
      {
        name: "Anaerobic respiration types",
        description:
          "Yeast / fungi: glucose → ethanol + CO₂ + 2 ATP (alcoholic fermentation, used in baking + brewing + alcohol production). Animal muscle: glucose → lactic acid + 2 ATP (lactic fermentation, builds up during intense exercise → muscle fatigue). Both produce only 2 ATP vs aerobic's 36–38.",
      },
      {
        name: "Protein structural hierarchy",
        description:
          "PRIMARY: linear amino acid sequence joined by PEPTIDE BONDS (C-N covalent bonds). SECONDARY: α-helix or β-sheet, held by H-bonds between backbone atoms. TERTIARY: overall 3D fold from R-group interactions (H-bonds, ionic bonds, disulfide bridges, hydrophobic). QUATERNARY: multi-subunit assembly (haemoglobin = 4 subunits).",
      },
    ],
    traps: [
      {
        name: "Rancidity is microbial spoilage",
        description:
          "Rancidity is CHEMICAL spoilage (oxidation of fats), NOT microbial. Microbial spoilage is what happens to milk (souring by Lactobacillus) or bread (mould). Distractor conflates the two types of food spoilage. Refrigeration slows both but the mechanisms are different.",
      },
      {
        name: "Anaerobic respiration produces more ATP",
        description:
          "Anaerobic respiration produces ONLY 2 ATP per glucose. Aerobic produces 36–38 ATP. Distractor swaps them or says 'anaerobic is more efficient'. Aerobic is much more efficient — that's evolutionary why organisms with O₂ access use it.",
      },
    ],
    exampleQuestionIds: [
      "129f4393-40fc-4006-81f3-618d9ef927dc", // EASY 2025 — fats/oils left outside
      "41f7058e-c9e3-42f0-bd4e-7c417e1fbb19", // EASY 2025 — peptide bond amino acid sequence
    ],
    relatedSlugs: [
      "cell-biology",
      "plant-biology",
      "human-physiology",
    ],
  },
};

/** Slugs that have detail entries — used by /playbooks index to flag "deep dive" badges. */
export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
