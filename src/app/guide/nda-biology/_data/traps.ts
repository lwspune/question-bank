/**
 * Content for /guide/nda-biology/traps.
 *
 * NDA Biology distractor shapes — bucketed by the skill strand they affect
 * (Recall / Apply / Verify). Each trap: a mechanic (how it works), a fix
 * (the verification habit), and a worked-example UUID from the live bank
 * (where one is available).
 *
 * Different from Chemistry traps (identity-confusion across compound
 * names), Physics traps (formula misapplication), English traps
 * (near-synonym semantics). Biology distractors are about PAIRED-FACT
 * SWAP — disease↔pathogen, vitamin↔deficiency, hormone↔gland,
 * scientist↔discovery, organelle↔function, virus-vs-bacterium identity.
 * The lever is precise paired-fact recall + careful multi-statement
 * judgement; verification habit = always state BOTH halves of the pair
 * explicitly before picking an option.
 */

export type TrapBucket = "recall" | "apply" | "verify";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  bucket: TrapBucket;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // ──────── Recall traps ────────
  {
    id: "disease-pathogen-swap",
    title: "Disease ↔ pathogen swap",
    bucket: "recall",
    affects: ["microbiology-and-disease", "human-physiology"],
    mechanic:
      "Match-the-pair questions list disease names against pathogen names — distractor pairs them WRONG. Malaria : Mycobacterium (wrong — Plasmodium; Mycobacterium is TB). TB : Plasmodium (wrong — Mycobacterium). The 2025 PYQ tests exactly this swap. Other common swaps: Cholera : Salmonella (wrong — Vibrio; Salmonella is typhoid); Sleeping sickness : Plasmodium (wrong — Trypanosoma); AIDS : retrovirus is RIGHT but the type-of-virus or genetic material is often swapped.",
    fix: "Memorise the pairings as a 2-column table, not as one fused fact. Drill /reference-tables → 'Diseases and Pathogens' cluster. The 10 most-tested: TB-Mycobacterium, cholera-Vibrio, typhoid-Salmonella, tetanus-Clostridium, malaria-Plasmodium, sleeping sickness-Trypanosoma, elephantiasis-Wuchereria, smallpox-Variola, AIDS-HIV, dengue-DENV.",
    exampleQuestionId: "8b39982f-d429-4308-963b-cc9582d954c2",
  },
  {
    id: "vitamin-deficiency-swap",
    title: "Vitamin ↔ deficiency disease swap",
    bucket: "recall",
    affects: ["human-physiology"],
    mechanic:
      "Vitamin C deficiency = scurvy (right). Vitamin A deficiency = scurvy (WRONG — that's night blindness). Vitamin D deficiency = beriberi (WRONG — that's B1; D is rickets/osteomalacia). Distractor swaps the deficiency disease across vitamins. Common confusion pairs: B1 (beriberi) vs B3 (pellagra) vs B12 (pernicious anaemia); D (rickets) vs C (scurvy) vs K (bleeding).",
    fix: "Memorise as a table with FOUR columns: vitamin / alt name / deficiency / source. Then drill /reference-tables → 'Vitamins and Deficiencies' cluster with cover-and-recall. Mnemonic for fat-soluble vs water-soluble: 'A, D, E, K' = fat-soluble (stored in body); B + C = water-soluble (need regular intake, excess excreted in urine).",
  },
  {
    id: "hormone-gland-swap",
    title: "Hormone ↔ source gland swap",
    bucket: "recall",
    affects: ["human-physiology"],
    mechanic:
      "Insulin from adrenal (WRONG — pancreas, β-cells). Thyroxine from pituitary (WRONG — thyroid; pituitary makes TSH which regulates thyroid). Adrenaline from thyroid (WRONG — adrenal medulla). Distractor swaps source glands. The 'pituitary is the master gland' framing trips candidates into attributing every hormone to the pituitary.",
    fix: "Group hormones by gland (not alphabetically). Pituitary anterior: GH, FSH, LH, TSH, ACTH, prolactin. Pituitary posterior: ADH, oxytocin (made in hypothalamus, stored in pituitary). Thyroid: thyroxine T4 + calcitonin. Adrenal medulla: adrenaline + noradrenaline. Adrenal cortex: cortisol + aldosterone. Pancreas islets: insulin (β) + glucagon (α). Gonads: estrogen/progesterone (ovary) + testosterone (testis).",
  },
  {
    id: "rna-vs-dna-virus-swap",
    title: "RNA virus vs DNA virus identity swap",
    bucket: "recall",
    affects: ["microbiology-and-disease"],
    mechanic:
      "HIV (AIDS) genetic material = DNA (WRONG — it's a retrovirus, genetic material is RNA, reverse-transcribed into host DNA). Smallpox genetic material = RNA (WRONG — Variola is a DNA virus). Distractor swaps virus types or labels HIV a DNA virus. The 'retrovirus' label is the clue — retro = reverse → RNA reverse-transcribed.",
    fix: "Memorise key viruses by genetic material. RNA viruses: HIV (retrovirus), Influenza, Polio, Hepatitis A + C, SARS-CoV-2, Dengue, Measles, Rabies. DNA viruses: Smallpox/Variola, Herpes, Hepatitis B, Adenoviruses, Papillomavirus (HPV). Most NDA-tested viruses are RNA viruses; the prominent DNA exception is smallpox.",
  },
  {
    id: "scientist-discovery-pair-swap",
    title: "Scientist ↔ discovery pair swap",
    bucket: "recall",
    affects: ["microbiology-and-disease", "genetics-and-evolution", "cell-biology"],
    mechanic:
      "Fleming discovered DNA structure (WRONG — penicillin; Watson + Crick + Franklin discovered DNA structure). Mendel wrote Origin of Species (WRONG — Darwin; Mendel founded modern genetics with pea-plant experiments). Lamarck = natural selection (WRONG — Lamarck = inheritance of acquired characteristics, refuted; natural selection = Darwin). Distractor swaps the 'scientist for the most-famous thing' across pairs.",
    fix: "Lock the 6 cardinal pairs: Fleming-Penicillin (1928), Darwin-Origin of Species (1859), Mendel-laws of inheritance (1865), Watson+Crick-DNA double helix (1953), Pasteur-germ theory + rabies vaccine, Jenner-smallpox vaccine. Drill /reference-tables → 'Scientists and Discoveries' cluster. Each scientist gets ONE main contribution.",
  },
  {
    id: "monocot-dicot-trait-swap",
    title: "Monocot vs dicot trait swap",
    bucket: "recall",
    affects: ["plant-biology", "biodiversity-and-classification"],
    mechanic:
      "Monocot has 2 cotyledons (WRONG — by definition, monocot = 1 cotyledon; dicot = 2). Monocots have reticulate venation (WRONG — parallel; dicots have reticulate / net-like venation). Dicots have fibrous roots (WRONG — tap root; monocots have fibrous). Distractor swaps single traits across the two groups.",
    fix: "Memorise the 4-trait monocot-dicot table: cotyledon count (mono=1 / di=2), venation (mono=parallel / di=reticulate), root system (mono=fibrous / di=tap), floral parts (mono=in 3s / di=in 4s or 5s). Mnemonic: monocot examples = grass, rice, wheat, banana, palm (parallel veins). Dicot examples = bean, pea, sunflower, mango (net veins).",
  },
  {
    id: "kingdom-misclassification",
    title: "Kingdom / phylum misclassification",
    bucket: "recall",
    affects: ["biodiversity-and-classification"],
    mechanic:
      "Sponges are in Cnidaria (WRONG — Porifera; Cnidaria is jellyfish/hydra). Mushrooms are plants (WRONG — Kingdom Fungi, heterotrophic, chitin cell wall). Bacteria are in Protista (WRONG — Kingdom Monera, prokaryotic). Algae are in Plantae (debated — most classify in Protista). Distractor groups organisms at wrong taxonomic level.",
    fix: "Lock the 5 kingdoms (Whittaker, 1969): Monera (prokaryotes — bacteria, cyanobacteria), Protista (unicellular eukaryotes — amoeba, paramecium, euglena), Fungi (chitin walls, heterotrophic), Plantae (cellulose walls, autotrophic), Animalia (no walls, heterotrophic). 9 animal phyla: Porifera (sponges), Cnidaria (jellyfish), Platyhelminthes (flatworms), Nematoda (roundworms), Annelida (segmented worms), Arthropoda (jointed legs), Mollusca (soft body + shell), Echinodermata (spiny skin), Chordata (notochord).",
    exampleQuestionId: "a7108d1d-27da-4ee0-912e-e8d556556825",
  },

  // ──────── Apply traps ────────
  {
    id: "osmosis-direction-flip",
    title: "Osmosis direction flip — hypotonic vs hypertonic",
    bucket: "apply",
    affects: ["cell-biology"],
    mechanic:
      "Water moves from LOW solute (high water potential) to HIGH solute (low water potential). Distractor reverses the direction — 'water moves from hypertonic to hypotonic' (wrong). RBC in hypotonic solution → water enters → swells + bursts (haemolysis). RBC in hypertonic → water exits → shrinks (crenation). Distractor swaps the cell response. Also: the 2% detergent question (HARD 2021) tricks candidates into applying osmosis when the actual mechanism is membrane DISRUPTION by detergent.",
    fix: "Always state the gradient explicitly before picking. Step 1: identify solute concentration on each side. Step 2: water flows from LOW solute to HIGH solute (down its own concentration gradient). Step 3: predict cell response — water in = swell, water out = shrink. CHECK: is the external solvent disrupting the membrane chemically? Detergents + alcohols + saponins lyse cells INDEPENDENTLY of tonicity.",
    exampleQuestionId: "116f1f51-d093-43bd-bdb9-115c6ba8cb8c",
  },
  {
    id: "photosynthesis-input-output-flip",
    title: "Photosynthesis input ↔ output swap",
    bucket: "apply",
    affects: ["plant-biology"],
    mechanic:
      "Inputs (consumed): CO₂ + H₂O + light. Outputs (produced): C₆H₁₂O₆ + O₂. Distractor swaps O₂ to input side ('photosynthesis consumes O₂' — that's respiration). Site = chloroplast (specifically thylakoid for light-dependent, stroma for Calvin cycle). Distractor places light reactions in stroma or Calvin cycle in thylakoids.",
    fix: "Write the equation before picking: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Light reactions = SPLIT WATER + make ATP/NADPH (thylakoid membrane). Dark reactions / Calvin = FIX CO₂ into glucose using ATP + NADPH (stroma). Photosynthesis is the OPPOSITE of cellular respiration in terms of net inputs/outputs.",
  },
  {
    id: "double-fertilisation-ploidy-swap",
    title: "Double fertilisation ploidy swap — embryo vs endosperm",
    bucket: "apply",
    affects: ["reproduction", "plant-biology"],
    mechanic:
      "Embryo = 2n (1n egg + 1n sperm). Endosperm = 3n (1n sperm + 2 polar nuclei totalling 2n = 3n). Distractor swaps the ploidy — 'endosperm is 2n, embryo is 3n'. Common because students remember 'double fertilisation makes 2 products' but forget the arithmetic.",
    fix: "Mnemonic: endosperm is the FOOD-STORE (made from MORE genetic material → 3n). Embryo is the offspring proper (2n like the parents). Write the additions before picking: zygote = 1n + 1n = 2n; PEN (primary endosperm nucleus) = 1n + 2n = 3n. Seed coat = 2n (from maternal integuments).",
  },
  {
    id: "transpiration-experiment-misread",
    title: "Transpiration vaseline-leaf experiment — wrong-surface assumption",
    bucket: "apply",
    affects: ["plant-biology"],
    mechanic:
      "In most dicots, stomata are mostly on the LOWER leaf surface. Vaseline-on-lower blocks most transpiration → that leaf loses LEAST water. Distractor assumes stomata are equal both sides (loses equally) or all on upper (vaseline-upper blocks most). The HARD 2021 vaseline-leaf experiment tests exactly this reasoning. Also: aquatic floating leaves (water lily) have stomata on UPPER surface only.",
    fix: "Step 1: stomata distribution depends on plant type — terrestrial dicot = mostly lower; monocot grasses = ~equal both sides; aquatic floating = upper only. Step 2: vaseline blocks gas exchange where applied. Step 3: less transpiration = less mass loss (water exits as vapour). The control leaf transpires most (both surfaces open); vaseline-lower transpires least (most stomata blocked).",
    exampleQuestionId: "49fc1bf7-4778-4fb6-b833-aaad92649192",
  },

  // ──────── Verify traps ────────
  {
    id: "multi-statement-partial-credit",
    title: "Multi-statement evaluation — partial-credit distractor",
    bucket: "verify",
    affects: ["ecology-and-environment", "cell-biology", "biochemistry"],
    mechanic:
      "'Consider the following statements... which are correct?' with options like 'Only I, II' / 'Only II, III' / 'All' / 'None'. The trap option lists 2 of 3 correct statements (when there are actually 3 correct) — partial-credit distractor. Or lists 3 of 3 correct + 1 wrong → 'All four' becomes wrong because 1 is false.",
    fix: "Judge each statement INDEPENDENTLY before reading the options. Write a small T/F next to each. Then match to the option that lists EXACTLY your set of T statements. NEVER pick on partial recognition ('I'm sure about I and II but unsure about III, so I'll pick the option that says I, II' — wrong if III is also correct). If you're uncertain about any statement, the whole question is uncertain — consider skipping (−1.33 penalty is harsh).",
    exampleQuestionId: "74168eae-2768-4fc6-a2bd-fcd76155b455",
  },
  {
    id: "antibiotics-treat-viral",
    title: "Antibiotics treat viral infections",
    bucket: "verify",
    affects: ["microbiology-and-disease"],
    mechanic:
      "Antibiotics target BACTERIAL structures — cell wall (peptidoglycan, penicillin's target) and bacterial 70S ribosomes (streptomycin, tetracycline). Viruses have NEITHER — they use host machinery. Distractor says 'antibiotics cure viral infections' or 'antibiotics work against influenza' or 'COVID is treated by penicillin'. Always FALSE. Antiviral drugs (acyclovir, oseltamivir, remdesivir) are different.",
    fix: "Pair each infection with its drug class BEFORE judging the statement. Bacterial → antibiotic (penicillin, amoxicillin, etc). Viral → antiviral (acyclovir, oseltamivir). Fungal → antifungal (fluconazole). Parasitic → antiparasitic (chloroquine, ivermectin). The 'antibiotic treats virus' framing is one of the most common distractors in Microbiology-Verify questions.",
  },
  {
    id: "all-cells-have-nucleus",
    title: "'All cells have a well-organised nucleus' — statement trap",
    bucket: "verify",
    affects: ["cell-biology", "human-physiology"],
    mechanic:
      "False on TWO counts: (1) PROKARYOTES (bacteria, archaea) have NO true nucleus — just a nucleoid region with DNA. (2) Mammalian RBCs LOSE their nucleus during maturation. Multi-statement Cell Biology questions often include 'all cells have a nucleus' as one of 3-4 statements — judging it correctly distinguishes the right answer-option. The 2026 PYQ tests exactly this multi-statement shape.",
    fix: "Check each universal claim about cells against the two known exceptions: prokaryotes (no membrane organelles, no true nucleus) + mature RBCs (no nucleus). Similarly, NOT all cells have cell wall (only plants, fungi, bacteria) or chloroplasts (only plant + some protists). The only universally-true cell features: plasma membrane, cytoplasm, ribosomes, DNA (somewhere).",
    exampleQuestionId: "74168eae-2768-4fc6-a2bd-fcd76155b455",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  recall: TRAP_SHAPES.filter((t) => t.bucket === "recall"),
  apply: TRAP_SHAPES.filter((t) => t.bucket === "apply"),
  verify: TRAP_SHAPES.filter((t) => t.bucket === "verify"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
