/**
 * Per-playbook deep-dive content for /guide/nda-chemistry/playbooks/{slug}.
 *
 * Each entry mirrors the physics/english shape: trigger (one-line "when to
 * reach for this"), story (2–3 paragraph teacherly explanation), sub-skills
 * (the rules / patterns inside), traps (chapter-specific distractor shapes),
 * worked example UUIDs (2 per playbook, resolved via loadWorkedExamples at
 * request time), and relatedSlugs (cross-links to other playbooks).
 *
 * UUIDs SQL-picked 2026-05-18 against the live 262-q NDA Chemistry PUBLIC
 * bank — recent year first, HARD picked when the chapter has a HARD pool,
 * else MOD. All 12 chapters have details.
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
  "carbon-and-its-compounds": {
    trigger:
      "An allotrope-of-carbon property question, a name↔formula recall on a common organic compound, a functional-group identification, a soap/detergent classification, or a hydrocarbon-formula match.",
    story: [
      "45 q in 10 years — NDA Chemistry's largest chapter. 2 HARD across the whole window, so it's mostly recall. The Allotropes subtopic alone is 15 q: diamond (sp³, hardest natural substance, electrical insulator), graphite (sp², layered, conducts electricity), fullerene (C₆₀ buckminsterfullerene), graphene (single graphite layer, strongest known material). Carbon's tetravalency + catenation explain why ~95% of all known compounds are organic.",
      "Common Carbon Compounds (10 q) is name↔formula↔use recall — methane CH₄ (natural gas), ethanol C₂H₅OH (alcoholic drinks), formaldehyde HCHO (preservative), acetic acid CH₃COOH (vinegar), glucose C₆H₁₂O₆ (blood sugar). The /common-compounds reference page indexes these end-to-end.",
      "Functional Groups (9 q) is the rule-application piece — given a structure, identify the FG: −OH alcohol, −CHO aldehyde, −COOH carboxylic acid, −NH₂ amine, −C=O ketone, −OR ether. Soaps + detergents (4 q): soap = Na/K salt of long-chain fatty acid; synthetic detergent = Na salt of long-chain sulphonic acid (work in hard water; soap doesn't).",
    ],
    subSkills: [
      {
        name: "Allotrope property recall",
        description:
          "Diamond: sp³ tetrahedral, hardest, INSULATOR, transparent. Graphite: sp² layered, CONDUCTS electricity (delocalised e⁻), lubricant. Fullerene: cage (C₆₀). Graphene: single layer of graphite. Thermodynamically most stable: graphite (NOT diamond).",
      },
      {
        name: "Common organic compound recall",
        description:
          "Methane CH₄, ethane C₂H₆, ethene C₂H₄, ethyne C₂H₂, ethanol C₂H₅OH, acetic acid CH₃COOH, methanol CH₃OH, formic acid HCOOH, formaldehyde HCHO, urea (NH₂)₂CO. Match name ↔ formula ↔ everyday use.",
      },
      {
        name: "Functional-group identification",
        description:
          "−OH alcohol, −CHO aldehyde, −COOH carboxylic acid, >C=O ketone, −COO− ester, −NH₂ amine, −O− ether, −X halide. NDA tests FG recognition from a structural formula or from a property (acidic? sweet smell?).",
      },
      {
        name: "Soap vs synthetic detergent",
        description:
          "Soap = sodium/potassium salt of fatty acid (R−COO⁻Na⁺). Synthetic detergent = sodium salt of long-chain sulphonic acid (R−SO₃⁻Na⁺) or alkyl sulfate (R−OSO₃⁻Na⁺). Detergents work in hard water; soaps don't (form scum with Ca²⁺/Mg²⁺).",
      },
    ],
    traps: [
      {
        name: "Diamond as 'electrical conductor'",
        description:
          "Diamond is an INSULATOR — sp³ carbons have no free electrons. The conductor in this family is GRAPHITE (sp², delocalised π electrons). Wrong option swaps them.",
      },
      {
        name: "Thermodynamically stable form",
        description:
          "Despite diamond being harder + denser + more valuable, GRAPHITE is the thermodynamically more stable allotrope (ΔG_diamond→graphite < 0 at 25 °C, 1 atm). The trap option says 'diamond' because of intuitive 'strongest = most stable.'",
      },
      {
        name: "Synthetic detergent = soap with extra steps",
        description:
          "Wrong. Soaps and synthetic detergents have DIFFERENT polar heads (carboxylate vs sulphonate/sulphate). The detergent class includes anionic, cationic, and non-ionic types — only some are 'soap-like.' Distractor lists all anionic compounds as synthetic detergents; some are not.",
      },
    ],
    exampleQuestionIds: [
      "f5283a4b-9c28-4f5a-8661-35853d7dfeca", // HARD 2023 — NOT an organic compound
      "42e321c4-acd7-4026-b5a9-54a8d0854154", // MOD 2026 — soaps + catenation statements
    ],
    relatedSlugs: [
      "chemical-bonding",
      "atomic-structure-and-periodic-classification",
      "industrial-and-applied-chemistry",
    ],
  },

  "matter-and-its-states": {
    trigger:
      "A separation-method match (distillation/chromatography/filtration/crystallisation), a compound-vs-mixture-vs-solution classification, a phase-change/diffusion statement, a colloid vs suspension distinction, or a physical-vs-chemical-change recognition.",
    story: [
      "30 q in 10 years, 1 HARD. Five small subtopics, all rule-of-thumb sized. Separation techniques (7 q): pick the method based on the mixture's nature — solid+liquid → filtration; two miscible liquids → distillation; pigments → chromatography; non-volatile solid in solution → evaporation OR crystallisation (cleaner).",
      "Compounds/Mixtures/Solutions (7 q): pure substance = element OR compound (fixed composition); mixture = variable composition (heterogeneous like sand+iron, homogeneous like air or salt water). True solution: particle size < 1 nm (dissolved sugar). Colloid: 1–1000 nm (milk, fog). Suspension: > 1000 nm (chalk in water, settles on standing).",
      "Colloids vs Suspensions (5 q, 20% HARD) is the trap subtopic. Colloids: heterogeneous BUT particles don't settle (Brownian motion keeps them suspended), show Tyndall effect (scatter light). Suspensions: heterogeneous AND particles settle on standing. Soap + water = colloid (specifically an emulsion). Phase changes (7 q): solid↔liquid (melting/freezing), liquid↔gas (vaporisation/condensation), solid↔gas (sublimation, e.g. iodine + camphor + dry ice).",
    ],
    subSkills: [
      {
        name: "Separation-method matching",
        description:
          "Insoluble solid + liquid: filtration. Soluble solid + liquid (recover solid): evaporation/crystallisation. Two miscible liquids of different BP: fractional distillation. Volatile from non-volatile: simple distillation. Pigments/dyes: chromatography. Iron from sand: magnetic separation.",
      },
      {
        name: "Mixture-type classification",
        description:
          "Element: 1 type of atom. Compound: 2+ elements chemically bonded, FIXED composition. Mixture: 2+ substances mechanically combined, VARIABLE composition. Homogeneous mixture = solution. Heterogeneous mixture = suspension OR colloid (depending on particle size).",
      },
      {
        name: "Colloid vs suspension vs solution",
        description:
          "Particle size: solution < 1 nm; colloid 1–1000 nm; suspension > 1000 nm. Tyndall effect: only colloid + suspension (true solution doesn't scatter). Settling: only suspension (colloid stays dispersed via Brownian motion).",
      },
      {
        name: "Physical vs chemical change identification",
        description:
          "Physical: reversible, no new substance, no energy beyond phase change (melting ice, dissolving sugar, evaporation). Chemical: irreversible (mostly), new substance formed, energy released/absorbed (burning, rusting, cooking, photosynthesis). Test: can you get the original back easily?",
      },
    ],
    traps: [
      {
        name: "Filtration ≠ purifies a solution",
        description:
          "Filtration only removes UNDISSOLVED solids. A dissolved solute (salt in water) passes through the filter paper unchanged. Wrong option offers filtration for salt-from-saltwater (need evaporation/distillation).",
      },
      {
        name: "Colloid 'settles on standing' confusion",
        description:
          "Colloids do NOT settle on standing (Brownian motion keeps particles dispersed); SUSPENSIONS settle. Wrong option treats them as the same category. Soap+water = colloid (specifically an emulsion); chalk+water = suspension.",
      },
      {
        name: "Sublimation candidates",
        description:
          "Sublimes (solid→gas without melting): iodine, camphor, naphthalene, dry ice, NH₄Cl. Wrong options include common solids like NaCl or sugar that just dissolve or melt — neither sublimes at ordinary pressure.",
      },
    ],
    exampleQuestionIds: [
      "e8bda6c2-e50f-49a2-ae19-85cda65c03ef", // HARD 2024 — soap + water forms (colloid)
      "02e0bb94-08e6-4ab9-92d3-285bc2bd5e17", // MOD 2026 — colloid + suspension statements
    ],
    relatedSlugs: [
      "chemical-bonding",
      "hydrogen-and-water",
      "carbon-and-its-compounds",
    ],
  },

  "industrial-and-applied-chemistry": {
    trigger:
      "An industrial-gas identification (water gas / producer gas / syngas), a cement/glass composition question, an NPK fertiliser name, an alloy composition match, or a paints + coatings additive role (pigment / drier / thinner / anti-skinning).",
    story: [
      "28 q in 10 years · 11% HARD overall — but the HARD pool concentrates almost entirely in the Paints and Coatings subtopic (3 of 4 paint q are HARD = 75%). The rest of the chapter (Industrial gases, Cement/Glass, Fertilisers, Alloys) is straight recall, mostly EASY.",
      "Industrial Gases (8 q): water gas = CO + H₂ (from steam over hot coke); producer gas = CO + N₂ (from air over coke); syngas = CO + H₂ from natural-gas reforming. Cement (Portland) = CaO + SiO₂ + Al₂O₃ + Fe₂O₃ + MgO. Glass = SiO₂ + Na₂CO₃ + CaCO₃ (soda-lime); coloured glass adds metal oxides (Fe → green, Co → blue, Cr → green, Mn → purple).",
      "Paints and Coatings (4 q at 75% HARD) carries a specialised vocabulary: pigment (provides colour, e.g. TiO₂ white, PbO red); vehicle/binder (linseed oil); drier (catalyst speeds drying, e.g. naphthenates); thinner (reduces viscosity, e.g. turpentine); anti-skinning agent (prevents skin formation in tin, e.g. polyhydroxy phenol). The trap is mixing up roles — TiO₂ as drier (it's a pigment), turpentine as anti-skinning (it's a thinner).",
    ],
    subSkills: [
      {
        name: "Industrial gas identification",
        description:
          "Water gas (CO + H₂) — fuel + synthesis. Producer gas (CO + N₂) — diluted, lower CV. Syngas (CO + H₂) — same as water gas from natural gas. Coal gas (H₂ + CH₄ + CO) — town gas, distillation of coal. LPG (propane + butane) — domestic fuel.",
      },
      {
        name: "Cement + glass composition",
        description:
          "Portland cement: CaO (~64%), SiO₂ (~22%), Al₂O₃ (~6%), Fe₂O₃ (~3%), MgO (~2%). Soda-lime glass: SiO₂ + Na₂CO₃ + CaCO₃. Pyrex (borosilicate): SiO₂ + B₂O₃ (thermal-shock resistant). Lead crystal: SiO₂ + PbO (high refractive index).",
      },
      {
        name: "NPK fertiliser breakdown",
        description:
          "N (nitrogen): urea CO(NH₂)₂, ammonium nitrate NH₄NO₃, ammonium sulphate (NH₄)₂SO₄. P (phosphorus): superphosphate of lime (Ca(H₂PO₄)₂ + CaSO₄), triple superphosphate. K (potassium): KCl, K₂SO₄. Mixed NPK fertilisers carry all three.",
      },
      {
        name: "Alloy composition recall",
        description:
          "Brass = Cu + Zn (60/40 to 70/30). Bronze = Cu + Sn. Stainless steel = Fe + Cr (10–18%) + Ni (8–10%) ± C. Solder = Pb + Sn (60/40). Duralumin = Al + Cu + Mg + Mn (light, aircraft). Steel = Fe + C (<2%). Wrought iron = nearly pure Fe.",
      },
      {
        name: "Paint additive roles",
        description:
          "Pigment = colour (TiO₂ white, PbO red, Cr₂O₃ green). Vehicle/binder = film-former (linseed oil, alkyd resin). Drier = oxidation catalyst (cobalt/manganese naphthenates). Thinner = viscosity reducer (turpentine, white spirit). Anti-skinning = prevents tin skin (polyhydroxy phenol). Filler = extends pigment (CaCO₃, talc).",
      },
    ],
    traps: [
      {
        name: "Pigment vs drier role swap",
        description:
          "TiO₂ is a pigment (provides white colour), NOT a drier. Naphthenates are driers, NOT thinners. Turpentine is a thinner, NOT an anti-skinning agent. The HARD pair-match questions deliberately swap one role to test exact recall.",
      },
      {
        name: "Stainless steel without chromium",
        description:
          "Stainless steel REQUIRES chromium (≥ 10.5%) — the Cr₂O₃ passive layer is what makes it 'stainless.' Some HARD questions list 'which is NOT essential in stainless steel' with Cr in the option set as a trap.",
      },
      {
        name: "Glass as 'crystalline solid'",
        description:
          "Glass is an AMORPHOUS solid (supercooled liquid), not crystalline. The trap option treats it as crystalline because we see 'glass' as solid-looking. Crystalline = ordered lattice (e.g. NaCl, quartz); amorphous = no long-range order (glass, plastic, rubber).",
      },
    ],
    exampleQuestionIds: [
      "2b2e92c6-fe78-4065-93f2-a9258f51df29", // HARD 2026 — paint pigment/drier/thinner/anti-skinning pairs
      "07e53f1c-487c-42b4-9fa4-c03813414d26", // MOD 2026 — physical tests for paper manufacture
    ],
    relatedSlugs: [
      "metals-and-non-metals",
      "carbon-and-its-compounds",
      "chemistry-in-everyday-life",
    ],
  },

  "metals-and-non-metals": {
    trigger:
      "A reactivity-series ordering, a metal + water/acid reaction product, a corrosion + prevention method (galvanisation/painting/electroplating), an alloy composition match, or an ore-extraction method (smelting/electrolysis/reduction).",
    story: [
      "17 q in 10 years · ZERO HARD. Pure recall, lowest-difficulty Rule-or-Recall chapter in the bank. The Reactivity Series (6 q) is the master tool: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Hg > Ag > Au. Metals above H react with dilute acid → release H₂. Metals above Mg react with cold water; below Mg react with steam (Fe with steam); below Cu don't react with water.",
      "Corrosion (5 q) = oxidation of metal by atmospheric O₂ + moisture. Iron rust = Fe₂O₃·xH₂O (reddish-brown, FLAKES — exposes fresh metal). Aluminium oxide Al₂O₃ STICKS (passive layer — protects), zinc oxide STICKS too. Galvanisation = coating Fe with Zn (Zn corrodes preferentially as sacrificial anode). Painting + greasing + electroplating + alloying (stainless steel) all prevent direct O₂ contact.",
      "Extraction (2 q) depends on reactivity. Top of series (K, Na, Ca, Mg, Al) — electrolysis of molten salt (too reactive to displace from oxide). Middle (Zn, Fe, Sn, Pb) — reduce oxide with carbon (smelting). Bottom (Cu, Ag, Au) — occur free in nature OR roast sulphide. Alloy composition (4 q) overlaps with the Industrial playbook; same compositions tested.",
    ],
    subSkills: [
      {
        name: "Reactivity series recall",
        description:
          "K > Na > Ca > Mg > Al > Zn > Fe > Cu > Hg > Ag > Au (decreasing reactivity). Mnemonic: 'Please Send Cats Monkeys And Zebras In Cute Sweet Glittering Animal Galleries.' Higher metal displaces lower from its salt solution (Zn + CuSO₄ → ZnSO₄ + Cu).",
      },
      {
        name: "Metal + water/acid reaction prediction",
        description:
          "K, Na: violent with cold water → H₂ + alkali (NaOH). Ca, Mg: slower with cold water. Al, Zn, Fe: react with steam, not cold water. Below H (Cu, Ag, Au): don't react with dilute acid. Above H: react with dilute HCl/H₂SO₄ → salt + H₂.",
      },
      {
        name: "Corrosion-prevention methods",
        description:
          "Barrier (painting, oiling, greasing, plastic coating) — keep O₂/moisture out. Sacrificial anode (galvanisation = Zn coating on Fe; magnesium blocks on ship hulls) — corrode in place of Fe. Alloying (stainless steel = Fe + Cr; bronze = Cu + Sn) — change electrochemistry. Electroplating (Cr, Ni layer) — combine barrier + ornamentation.",
      },
      {
        name: "Ore-extraction strategy",
        description:
          "Reactivity decides method. Most reactive (K/Na/Ca/Mg/Al): ELECTROLYSIS of molten chloride/oxide. Medium reactivity (Zn/Fe/Sn/Pb): REDUCTION with C, CO, or Al (thermite). Least reactive (Cu/Ag/Au): often found NATIVE, or roast the sulphide.",
      },
    ],
    traps: [
      {
        name: "Aluminium 'doesn't corrode'",
        description:
          "Aluminium DOES corrode (oxidises in air) — but the Al₂O₃ layer that forms is sticky and impermeable, so it STOPS further corrosion. The metal underneath is highly reactive. Wrong option claims Al doesn't react with O₂.",
      },
      {
        name: "Galvanisation = tin coating",
        description:
          "Galvanisation = ZINC coating (not tin). Tinning = tin coating (used for food cans). Wrong option swaps the two. Zn is sacrificial anode; tin is just a barrier coating.",
      },
      {
        name: "Iron extracted by electrolysis",
        description:
          "Iron is extracted by REDUCTION with C/CO in a blast furnace (Fe₂O₃ + 3CO → 2Fe + 3CO₂), NOT by electrolysis. Electrolysis is for top-of-series metals (Al via Hall-Héroult). Wrong option treats all metals identically.",
      },
    ],
    exampleQuestionIds: [
      "6229d938-d1f3-43f5-9795-2210eb180806", // MOD 2023 — which metal can be extracted with C
      "7b786af1-06c9-4431-a605-5780c20d5d63", // MOD 2023 — alloy containing non-metal
    ],
    relatedSlugs: [
      "industrial-and-applied-chemistry",
      "chemical-reactions",
      "chemistry-in-everyday-life",
    ],
  },

  "hydrogen-and-water": {
    trigger:
      "A permanent vs temporary hardness question, a softening-method recall (boiling/ion-exchange/lime-soda/permutit), a dihydrogen property statement, or a 'purest source of water' / 'water's anomalous behaviour' question.",
    story: [
      "11 q in 10 years · 9% HARD. Three subtopics. Hardness of Water (5 q) is the dominant subtopic. Temporary hardness = Ca(HCO₃)₂ and Mg(HCO₃)₂ (bicarbonates) — removed by BOILING (decomposes to insoluble carbonate that precipitates out). Permanent hardness = CaSO₄, MgSO₄, CaCl₂, MgCl₂ — NOT removed by boiling. Removed by ion-exchange (Na⁺ zeolite/permutit) or lime-soda (Ca(OH)₂ + Na₂CO₃) or distillation.",
      "Properties of Hydrogen (3 q · 33% HARD): H₂ is lightest gas, colourless, odourless, burns with pale-blue flame, can be liquefied at very low T (one HARD q tests how to store/transport large volumes — answer: solid metal hydrides or compression to liquid). H₂ in water = 'dihydrogen monoxide.' Heavy water D₂O = isotopic variant, used as neutron moderator in nuclear reactors.",
      "Water's anomalous behaviour (3 q): max density at 4 °C (not 0 °C), ice less dense than water (floats — that's why aquatic life survives winter), high specific heat (climate moderation), high boiling point for its molar mass (due to H-bonding). 'Purest source of water' = rainwater (in unpolluted air); ocean water is most saline.",
    ],
    subSkills: [
      {
        name: "Temporary vs permanent hardness",
        description:
          "Temporary = bicarbonates (Ca(HCO₃)₂, Mg(HCO₃)₂). Boil → CaCO₃ ↓ + CO₂ ↑ + H₂O. Permanent = sulphates + chlorides (CaSO₄, MgSO₄, CaCl₂, MgCl₂). NOT removed by boiling.",
      },
      {
        name: "Softening methods",
        description:
          "Temporary: boiling, OR add Ca(OH)₂ (lime — Clark's method). Permanent: lime-soda (Ca(OH)₂ + Na₂CO₃); ion-exchange (zeolite / Permutit, Na+ replaces Ca²⁺/Mg²⁺); synthetic resin (Calgon, EDTA); distillation. Distillation removes BOTH but is energy-intensive.",
      },
      {
        name: "Hydrogen properties + storage",
        description:
          "H₂ = lightest gas, ~0.09 g/L at STP. Burns with PALE BLUE flame. Diatomic. Cannot be liquefied easily (very low critical T). Large-volume storage: as liquid at ~−253 °C, OR adsorbed in metal hydrides (LaNi₅H₆, etc.). H₂ → H₂O on combustion (no CO₂, hence 'clean fuel').",
      },
      {
        name: "Water anomaly + purity",
        description:
          "Max density at 4 °C (not 0 °C). Ice density 0.92 g/cm³ < water 1.00 → ice floats. Specific heat 4.18 kJ/(kg·K) — highest among common liquids. Purest source: RAINWATER (before pollution); distilled > river > lake > sea (most saline).",
      },
    ],
    traps: [
      {
        name: "Boiling removes permanent hardness",
        description:
          "Boiling removes ONLY temporary hardness (decomposes bicarbonate). Sulphates and chlorides don't decompose on boiling — permanent hardness persists. Wrong option lists boiling as a solution for all hardness types.",
      },
      {
        name: "Water densest at 0 °C",
        description:
          "Water is densest at 4 °C, NOT 0 °C. As temperature drops from 4 °C to 0 °C, water EXPANDS (anomalous). At 0 °C, ice forms and density drops further to 0.92. Wrong option says '0 °C' as the densest point.",
      },
    ],
    exampleQuestionIds: [
      "f38b1ac1-50e6-4403-a7f8-5581fa8e60cd", // HARD 2019 — large volume of H₂ stored by
      "a8897c5d-36f9-440f-838b-e19e74656fc8", // MOD 2018 — permanent hardness cannot be removed by
    ],
    relatedSlugs: [
      "matter-and-its-states",
      "acids-bases-and-salts",
      "atomic-structure-and-periodic-classification",
    ],
  },

  "chemistry-in-everyday-life": {
    trigger:
      "A common-chemical-use match (deep-sea diver's gas, freezing mixture, fire-extinguisher, soft drink), or a medicine-type identification (antacid / analgesic / antibiotic / antiseptic).",
    story: [
      "10 q in 10 years · ZERO HARD. Pure recall — every q is a 'which substance does X' match. Common Chemicals (7 q): deep-sea diver's gas = He + O₂ (helium is non-narcotic at high pressure, unlike N₂); freezing mixture = ice + salt (NaCl lowers melting point to −21 °C); fire extinguisher = CO₂ (heavier than air, smothers flame, doesn't conduct electricity); soft drinks = CO₂ in water (carbonic acid); washing soda = Na₂CO₃·10H₂O; baking soda = NaHCO₃; bleach = NaOCl (chlorine bleach) or Ca(OCl)Cl (bleaching powder).",
      "Medicines (3 q): antacid = NaHCO₃, Mg(OH)₂, Al(OH)₃ (neutralise stomach acid for indigestion); analgesic = aspirin (acetylsalicylic acid), paracetamol, ibuprofen (pain relief); antibiotic = penicillin, amoxicillin (kill bacteria); antiseptic = Dettol, iodine tincture (skin disinfection); disinfectant = bleach, phenol (surface cleaning, NOT for skin); antipyretic = paracetamol (fever reducer).",
    ],
    subSkills: [
      {
        name: "Common-chemical identification",
        description:
          "Deep-sea breathing: He + O₂. Freezing mixture: ice + NaCl. Fire extinguisher: CO₂ (also dry powder for some). Soft drink fizz: dissolved CO₂. Washing soda: Na₂CO₃·10H₂O. Baking soda: NaHCO₃. Bleaching powder: Ca(OCl)Cl. Plaster of Paris: CaSO₄·½H₂O.",
      },
      {
        name: "Medicine-class assignment",
        description:
          "Antacid: neutralises stomach HCl (Mg(OH)₂, NaHCO₃). Analgesic: pain relief (aspirin, paracetamol). Antibiotic: kills bacteria (penicillin). Antiseptic: external skin disinfection (Dettol, iodine). Disinfectant: surface cleaning, NOT skin (phenol). Antipyretic: fever reduction (paracetamol). Antimalarial: chloroquine, artemisinin.",
      },
    ],
    traps: [
      {
        name: "Antiseptic vs disinfectant",
        description:
          "Antiseptic = SAFE for living tissue (skin, wounds). Disinfectant = TOO STRONG for skin (used on surfaces only — phenol, bleach). Same active mechanism but different concentrations. Wrong option swaps the two.",
      },
      {
        name: "N₂ for deep-sea breathing",
        description:
          "Deep-sea divers breathe HELIUM + O₂, NOT nitrogen + O₂. At high pressure, N₂ becomes narcotic ('nitrogen narcosis') and dissolves in blood → bends on resurfacing. He doesn't dissolve as much and isn't narcotic.",
      },
    ],
    exampleQuestionIds: [
      "7f7d5200-6976-471e-bc36-48a8811db561", // MOD 2022 — deep-sea divers oxygen mix
      "6f8e5c6b-6e48-41c8-8e7a-2e19852f627e", // EASY 2025 — medicine for indigestion
    ],
    relatedSlugs: [
      "carbon-and-its-compounds",
      "industrial-and-applied-chemistry",
      "acids-bases-and-salts",
    ],
  },

  "practical-chemistry": {
    trigger:
      "A food-preservation method, a curd-keeping/dairy method, a toothpaste action, or a lab-method recall.",
    story: [
      "3 q in 10 years · ZERO HARD. Tiniest playbook in the bank. Lab + food + health applications. Toothpaste prevents decay by neutralising acid (from bacteria fermenting sugar) — modern pastes are basic, with fluoride (F⁻) to strengthen enamel (CaF₂ is harder than hydroxyapatite). Curd-keeping: refrigerate (slow bacterial action) — adding sugar/salt also helps but the primary method is cold. Food preservation: salting (NaCl draws water out via osmosis), sugar (jam), refrigeration, canning, drying, vacuum-sealing, adding preservatives (BHA, BHT, sodium benzoate).",
      "Read once in 15 minutes — the 3 q in 10 years means you'll see 0–1 of these per paper, but they're free marks if you've read them. Don't allocate more than 30 min of prep.",
    ],
    subSkills: [
      {
        name: "Food-preservation methods",
        description:
          "Physical: refrigeration, freezing, drying, canning, vacuum-sealing, smoking. Chemical: salting (osmosis dehydration), sugaring (osmosis), pickling (acid), preservatives (sodium benzoate, BHA, BHT, sulphur dioxide). Curd → refrigerate.",
      },
      {
        name: "Toothpaste action",
        description:
          "Bacteria ferment sugar → produce acid → demineralise enamel (Ca₅(PO₄)₃OH). Toothpaste neutralises acid (mild base) + fluoride (F⁻) replaces hydroxyl in enamel → fluorapatite (Ca₅(PO₄)₃F) which is harder + more acid-resistant. Brushing also mechanically removes plaque.",
      },
    ],
    traps: [
      {
        name: "Toothpaste 'cleans by mechanical action only'",
        description:
          "The mechanical action of brushing matters, but toothpaste itself works CHEMICALLY: (a) neutralising acid, (b) fluoride incorporation into enamel. Wrong option treats toothpaste as a pure cleanser.",
      },
    ],
    exampleQuestionIds: [
      "3fdb5dbc-fb36-435a-bd99-ff4f2944dd2c", // EASY 2023 — keeping curd
      "75edaacd-e798-4a97-b646-b42d349d028d", // EASY 2023 — toothpaste action
    ],
    relatedSlugs: ["chemistry-in-everyday-life", "matter-and-its-states", "hydrogen-and-water"],
  },

  // ─────────────────────── RULE ───────────────────────
  "atomic-structure-and-periodic-classification": {
    trigger:
      "A periodic-trend ordering (atomic radius / IE / EN / metallic character), an atomic-number↔subatomic-particle count, an atomic-model history (Dalton/Thomson/Rutherford/Bohr), or an isotope vs isobar vs isoelectronic classification.",
    story: [
      "35 q in 10 years · 9% HARD. Five subtopics. Periodic Trends (12 q) is the largest — memorise the 4 master rules and the chapter falls open. ACROSS a period (left → right): nuclear charge ↑, atomic radius ↓, ionisation energy ↑, electronegativity ↑, metallic character ↓. DOWN a group: atomic radius ↑ (more shells), IE ↓, EN ↓, metallic character ↑. Valency = group number (1–4); for groups 5–8, valency = 8 − group. Order of valency: noble gases (group 18) = 0; Mg (group 2) = 2; N (group 15) = 3; Si (group 14) = 4. Predict any 'order of X' question from these.",
      "Atomic Models history (6 q · 17% HARD): Dalton — solid indivisible spheres (1808). Thomson — plum pudding (1897, after discovering e⁻). Rutherford — small dense nucleus + mostly empty space (1909, gold-foil α-scattering). Bohr — electrons in quantised orbits (1913). Rutherford did NOT propose quantised orbits — that was Bohr (common trap). What Rutherford couldn't explain: why orbiting electrons don't spiral into nucleus (Bohr's quantum postulate fixed this).",
      "Subatomic particles (7 q): proton (Goldstein 1886, +1, mass 1 amu), electron (J.J. Thomson 1897, −1, mass ≈ 1/1836 amu), neutron (Chadwick 1932, 0, mass 1 amu). Mass number A = p + n. Atomic number Z = p (= e in neutral atom). For ³²₁₆S²⁻: 16 protons, 16 neutrons (32−16), 18 electrons (16+2 from charge). Isotopes — same Z, different A (¹H, ²H, ³H). Isobars — same A, different Z (⁴⁰Ar, ⁴⁰K, ⁴⁰Ca). Isoelectronic — same e⁻ count (Na⁺, F⁻, Ne all have 10 e⁻).",
    ],
    subSkills: [
      {
        name: "Periodic-trend master rules",
        description:
          "Across period →: atomic radius ↓, IE ↑, EN ↑, metallic character ↓, electron affinity ↑. Down group ↓: atomic radius ↑, IE ↓, EN ↓, metallic character ↑. Reactivity: metals MOST reactive bottom-left (Fr, Cs); non-metals MOST reactive top-right (F, O).",
      },
      {
        name: "Valency from group number",
        description:
          "Groups 1–2 (alkali, alkaline earth): valency = group number (Na=1, Mg=2). Groups 13–14: valency = group number − 10 (Al=3, C/Si=4). Groups 15–17: valency = 18 − group (N=3, O=2, F=1). Group 18 (noble gases): valency = 0.",
      },
      {
        name: "Atomic-model history",
        description:
          "Dalton (1808): indivisible solid sphere. Thomson (1897): plum pudding (positive sphere with embedded e⁻). Rutherford (1909): nucleus + mostly empty space (gold-foil). Bohr (1913): quantised orbits (fixed Rutherford's stability problem). Quantum mechanics (1920s): probability clouds.",
      },
      {
        name: "Subatomic particle counting",
        description:
          "For ᴬ_Z X^q: protons = Z, neutrons = A − Z, electrons = Z − q (charge q subtracts e⁻). Mass number A = sum of nucleons. Atomic number Z fixes the element. Charge q shifts e⁻ count only.",
      },
      {
        name: "Isotope / isobar / isoelectronic classification",
        description:
          "Isotopes: same Z (same element), different A (¹H/²H/³H). Isobars: same A, different Z (⁴⁰Ar/⁴⁰K/⁴⁰Ca). Isotones: same N = A − Z, different Z (¹⁴C/¹⁵N/¹⁶O have N=8). Isoelectronic: same total e⁻ count (Na⁺/Mg²⁺/F⁻/Ne all 10 e⁻).",
      },
    ],
    traps: [
      {
        name: "Rutherford 'proposed quantised orbits'",
        description:
          "Rutherford proposed the NUCLEAR model (small dense nucleus). He did NOT propose quantised orbits — that was Bohr (1913). The trap option attributes Bohr's contribution to Rutherford.",
      },
      {
        name: "Atomic radius increases across period",
        description:
          "Atomic radius DECREASES across a period (left → right, increasing nuclear charge pulls e⁻ closer). Wrong option says 'increases.' Down a group, radius DOES increase (more shells).",
      },
      {
        name: "Isotope vs isobar swap",
        description:
          "Isotopes = SAME element, different mass. Isobars = SAME mass, different elements. Wrong option swaps definitions or treats them as synonymous.",
      },
    ],
    exampleQuestionIds: [
      "9d0f9315-635e-459f-b8f5-f0371a943159", // HARD 2023 — Dalton symbol for phosphorus
      "5202ef1f-276e-44e2-9f99-0a27097e2be5", // HARD 2022 — valency order Ne, Si, N, Mg
    ],
    relatedSlugs: [
      "chemical-bonding",
      "acids-bases-and-salts",
      "carbon-and-its-compounds",
    ],
  },

  "acids-bases-and-salts": {
    trigger:
      "A pH-scale classification (acidic/basic/neutral), a common-acid recall (citric/oxalic/lactic/acetic), an acid-base theory match (Arrhenius/Brønsted/Lewis), an oxide classification (acidic/basic/amphoteric/neutral), or a 'water of crystallisation' formula.",
    story: [
      "33 q in 10 years · 6% HARD. Five subtopics, each rule-of-thumb sized. pH Scale (8 q): 0–6 acidic (lemon ~2, vinegar ~3, soft drinks ~3), 7 neutral (pure water, blood ~7.4), 8–14 basic (soap ~10, NaOH ~14). Common Acids (8 q · 12% HARD) overlaps heavily with /common-compounds: citric (lemons), oxalic (tomatoes, spinach), lactic (sour milk, muscle fatigue), acetic (vinegar), malic (apples), tartaric (grapes), formic (ant sting), HCl (gastric juice), H₂SO₄ (battery), HNO₃ (fertilisers, explosives).",
      "Acid-Base Theory (7 q · 14% HARD): Arrhenius — acid releases H⁺ in water, base releases OH⁻. Brønsted-Lowry — acid donates H⁺, base accepts H⁺ (broader, includes NH₃ as base). Lewis — acid accepts e⁻ pair, base donates (broadest; includes AlCl₃, BF₃, FeCl₃ as Lewis acids despite no H⁺). Oxides: BASIC (Na₂O, MgO — metal oxides), ACIDIC (CO₂, SO₃ — non-metal oxides), AMPHOTERIC (Al₂O₃, ZnO — react with both acid and base), NEUTRAL (CO, NO, N₂O, H₂O — don't react).",
      "Salts (7 q): formed by acid + base neutralisation. Normal salt (NaCl from HCl + NaOH). Acidic salt (NaHSO₄ — has replaceable H⁺ still). Basic salt (basic Cu carbonate — has OH⁻ still). Water of crystallisation (3 q): the H₂O molecules built into a salt's crystal lattice. CuSO₄·5H₂O (blue, dehydrate → white). Na₂CO₃·10H₂O (washing soda). MgSO₄·7H₂O (Epsom salt). FeSO₄·7H₂O (green vitriol). Number after the dot = molecules of water per formula unit.",
    ],
    subSkills: [
      {
        name: "pH classification + common values",
        description:
          "pH = −log[H⁺]. Acidic: 0–6. Neutral: 7 (pure water, blood ~7.4). Basic: 8–14. Lemon 2, vinegar 3, soda 3, milk 6.5, blood 7.4, sea water 8, soap 9–10, NaOH 14. Stronger acid = lower pH.",
      },
      {
        name: "Common acid recall",
        description:
          "Citric (lemons, oranges). Oxalic (tomatoes, spinach, rhubarb). Lactic (sour milk, fatigued muscles). Acetic (vinegar). Malic (apples). Tartaric (grapes). Formic (ant sting). HCl (gastric juice). H₂SO₄ (battery). HNO₃ (fertiliser, explosives). H₃PO₄ (soft drinks acidulant).",
      },
      {
        name: "Acid-base theory selection",
        description:
          "Arrhenius (water-only, H⁺/OH⁻). Brønsted (broader, H⁺ donor/acceptor; NH₃ is a Brønsted base). Lewis (broadest, e⁻-pair acceptor/donor; AlCl₃, BF₃, FeCl₃, H⁺ are Lewis acids despite some having no H). Lewis-acid examples in NDA include AlCl₃, BF₃, FeCl₃, Cu²⁺.",
      },
      {
        name: "Oxide classification",
        description:
          "Basic: metal + O (Na₂O, CaO, MgO, K₂O). Acidic: non-metal + O (CO₂, SO₂, SO₃, NO₂, P₂O₅). Amphoteric: react with both acid + base (Al₂O₃, ZnO, PbO, SnO, BeO). Neutral: don't react with acid or base (CO, NO, N₂O, H₂O).",
      },
      {
        name: "Water of crystallisation count",
        description:
          "The H₂O after the dot = molecules per formula unit. CuSO₄·5H₂O has 5. Na₂CO₃·10H₂O has 10. MgSO₄·7H₂O has 7. Na₂SO₄·10H₂O has 10 (Glauber's salt). Heating drives water off (CuSO₄·5H₂O → CuSO₄ white).",
      },
    ],
    traps: [
      {
        name: "NH₃ as Arrhenius base",
        description:
          "NH₃ is NOT an Arrhenius base (it doesn't release OH⁻ directly). It IS a Brønsted base (accepts H⁺ from water → NH₄⁺ + OH⁻ indirectly) and a Lewis base (lone pair donor). Wrong option treats all bases as Arrhenius.",
      },
      {
        name: "Al₂O₃ as 'just acidic' or 'just basic'",
        description:
          "Al₂O₃ is AMPHOTERIC — reacts with HCl (→ AlCl₃, behaves as base) AND with NaOH (→ NaAlO₂, behaves as acid). Wrong option places it in one category only. Same for ZnO, PbO, BeO.",
      },
      {
        name: "CO as 'acidic oxide'",
        description:
          "CO (carbon monoxide) is a NEUTRAL oxide — it doesn't react with acid or base. CO₂ is acidic (forms H₂CO₃ with water). Wrong option treats both as acidic because both contain carbon.",
      },
    ],
    exampleQuestionIds: [
      "f6a97e5d-483f-413a-90fd-0beebe94b584", // HARD 2021 — acid in tomatoes (oxalic)
      "06bbf436-8993-4aa3-88ff-964c53e5e1dd", // MOD 2026 — Lewis acids count
    ],
    relatedSlugs: [
      "chemical-reactions",
      "atomic-structure-and-periodic-classification",
      "hydrogen-and-water",
    ],
  },

  "chemical-reactions": {
    trigger:
      "A redox identification (oxidation/reduction/reducing agent), a reaction-type classification (combination/decomposition/displacement), a specific reaction product (lime water + CO₂), or an endo/exothermic recognition.",
    story: [
      "30 q in 10 years · 10% HARD — the chapter's hottest subtopic is Redox (10 q at 20% HARD). LEO RGO: Loss of Electrons = Oxidation; Reduction = Gain of e⁻. Equivalently OIL RIG (Oxidation Is Loss, Reduction Is Gain). A species OXIDISED has its oxidation state INCREASE. A species REDUCED has its oxidation state DECREASE. The REDUCING AGENT gets oxidised (it does the reducing by giving up its e⁻). In Fe + 2HCl → FeCl₂ + H₂, Fe goes 0 → +2 (oxidised, so Fe = reducing agent); H goes +1 → 0 (reduced, so HCl = oxidising agent).",
      "Reaction Types (7 q · 14% HARD): COMBINATION A + B → AB (CaO + H₂O → Ca(OH)₂ slaking of lime). DECOMPOSITION AB → A + B (2H₂O → 2H₂ + O₂ electrolysis; CaCO₃ → CaO + CO₂ on heating). DISPLACEMENT A + BC → AC + B (more reactive displaces less; Zn + CuSO₄ → ZnSO₄ + Cu). DOUBLE-DISPLACEMENT AB + CD → AD + CB (often precipitation: AgNO₃ + NaCl → AgCl↓ + NaNO₃). Specific reactions: CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O (lime water TURNS MILKY — classic test for CO₂). Rusting = oxidation (Fe → Fe₂O₃·xH₂O). Combustion = oxidation + heat release.",
      "Endo vs Exo (3 q): EXOTHERMIC = releases heat (combustion, respiration, neutralisation, most combinations). ENDOTHERMIC = absorbs heat (decomposition of CaCO₃, photosynthesis, dissolving NH₄Cl in water). Reaction direction: ΔH negative for exo, positive for endo. Most reactions on a paper that need a 'condition' (heat, electrolysis, sunlight) are endothermic.",
    ],
    subSkills: [
      {
        name: "Redox via oxidation-state change",
        description:
          "Assign oxidation states to all atoms before + after. The atom that INCREASES is OXIDISED → its source is the REDUCING agent. The atom that DECREASES is REDUCED → its source is the OXIDISING agent. Free elements have ox-state 0.",
      },
      {
        name: "Reaction-type identification",
        description:
          "Combination: A + B → AB. Decomposition: AB → A + B (thermal/electric/photochemical). Displacement: A + BC → AC + B (reactivity series decides direction). Double-displacement: AB + CD → AD + CB (often precipitation or acid-base).",
      },
      {
        name: "Specific test reactions",
        description:
          "CO₂ + lime water Ca(OH)₂ → milky CaCO₃ ↓. NaCl + AgNO₃ → white AgCl ↓ (test for chloride). SO₂ + acidified K₂Cr₂O₇ → green Cr³⁺ (test for SO₂, reducing). Cu²⁺ + NH₃ excess → deep blue [Cu(NH₃)₄]²⁺.",
      },
      {
        name: "Endo vs exothermic recognition",
        description:
          "Exothermic: combustion (all fuels), respiration, neutralisation, rusting, most combinations, dissolving NaOH in water. Endothermic: photosynthesis, decomposition by heat (CaCO₃, KClO₃), dissolving NH₄Cl/KNO₃ in water, melting/boiling.",
      },
    ],
    traps: [
      {
        name: "Reducing agent IS the one reduced",
        description:
          "Wrong. The REDUCING agent is the species that gets OXIDISED (it reduces the OTHER thing by giving up its own e⁻). Equivalently: oxidising agent gets REDUCED. Easy to flip — write out e⁻ flow explicitly before assigning.",
      },
      {
        name: "Decomposition always endothermic",
        description:
          "Most decompositions ARE endothermic (need heat/electricity/light to break bonds), but exceptions exist (decomposition of explosives like H₂O₂ catalysed by MnO₂ is exothermic). Don't apply the rule blindly.",
      },
      {
        name: "Rusting is 'just a physical change'",
        description:
          "Rusting is CHEMICAL — new substance (Fe₂O₃·xH₂O) is formed, and the iron is permanently altered. Wrong option labels it physical because 'it's just iron + air.'",
      },
    ],
    exampleQuestionIds: [
      "8e5c3a7c-968d-49fb-8b11-d063d7aab9e9", // HARD 2026 — redox pair-property matching
      "8027235f-7465-4b61-a3ea-244279671579", // MOD 2026 — which are oxidation reactions
    ],
    relatedSlugs: [
      "acids-bases-and-salts",
      "metals-and-non-metals",
      "chemical-bonding",
    ],
  },

  "chemical-bonding": {
    trigger:
      "An ionic vs covalent prediction, an oxidation-state assignment (e.g. V in V₂O₅), a valency-from-electronic-configuration question, or a molecular formula → atom count.",
    story: [
      "11 q in 10 years · ZERO HARD. Pure rule-application chapter. Ionic vs Covalent (5 q) decided by electronegativity (EN) difference: ΔEN > 1.7 → ionic (NaCl ΔEN ≈ 2.1, MgO ΔEN ≈ 2.2); ΔEN < 1.7 → covalent (H₂O ΔEN ≈ 1.4, NH₃ ΔEN ≈ 0.9); ΔEN < 0.4 → mostly non-polar covalent (H₂, N₂, CH₄). Ionic compounds: high melting + boiling point, conduct electricity in molten/aqueous state, crystalline solids, soluble in water. Covalent: lower MP/BP, poor conductors, soluble in non-polar solvents.",
      "Oxidation-state assignment (4 q) uses a rule sequence: (a) free elements = 0 (Cu, O₂, N₂). (b) H = +1 except in metal hydrides (NaH, H = −1). (c) O = −2 except in peroxides (H₂O₂, O = −1) and OF₂ (O = +2). (d) Group I = +1, Group II = +2. (e) F always = −1; other halogens = −1 except with O or F. (f) Sum of ox-states = molecule's net charge. For V₂O₅: 2V + 5(−2) = 0 → 2V = 10 → V = +5. For Mn in KMnO₄: 1 + Mn + 4(−2) = 0 → Mn = +7.",
      "Bond Counting (2 q): atoms count in a molecular formula (H₂SO₄ has 2 H, 1 S, 4 O). Anion valency: O²⁻ = −2, S²⁻ = −2, N³⁻ = −3, P³⁻ = −3, F⁻/Cl⁻/Br⁻/I⁻ = −1. Cation valency: Na⁺ = +1, Ca²⁺ = +2, Al³⁺ = +3, Fe²⁺/Fe³⁺ variable.",
    ],
    subSkills: [
      {
        name: "Ionic vs covalent from EN",
        description:
          "ΔEN > 1.7: ionic. ΔEN 0.4–1.7: polar covalent. ΔEN < 0.4: non-polar covalent. EN values from Pauling: F 4.0, O 3.5, N 3.0, Cl 3.0, C 2.5, H 2.1, Na 0.9, K 0.8. Memorise top 5 + alkali metals.",
      },
      {
        name: "Oxidation-state assignment sequence",
        description:
          "1. Free element = 0. 2. H = +1 (−1 in metal hydrides). 3. O = −2 (−1 in peroxides, +2 in OF₂). 4. Group I = +1, Group II = +2. 5. F = −1. 6. Sum = molecule's charge. Apply in order; solve for the unknown.",
      },
      {
        name: "Property prediction by bond type",
        description:
          "Ionic: high MP/BP (~800–1500 °C), conduct in molten/aqueous, crystalline, water-soluble. Covalent: low MP/BP, poor conductors, often gas/liquid at RT, soluble in organic solvents. Metallic: malleable, ductile, conduct solid+molten.",
      },
      {
        name: "Atom counting + valency match",
        description:
          "Molecular formula gives explicit atom counts. Valency check: total +ve = total −ve. AlCl₃ valency check: Al³⁺ × 1 = +3; Cl⁻ × 3 = −3; balanced. Empirical formula from valency ratios (NPP).",
      },
    ],
    traps: [
      {
        name: "All metal-non-metal bonds are ionic",
        description:
          "Mostly true but not always. AlCl₃ has significant covalent character (small Al³⁺ polarises Cl⁻ heavily — Fajans' rules). HgCl₂ is covalent despite Hg being metallic. Borderline cases (BeCl₂, AlCl₃, FeCl₃) act covalent.",
      },
      {
        name: "Forgetting variable oxidation states",
        description:
          "Fe = +2 or +3 depending on compound. Cu = +1 or +2. Mn = +2/+4/+6/+7. Don't assume a default. Cl = −1 most often but +1 in HOCl, +5 in HClO₃, +7 in HClO₄.",
      },
    ],
    exampleQuestionIds: [
      "ec0b0031-c5b0-4fee-af5e-3e1ef42cc8d9", // MOD 2025 — N oxide that may dimerize
      "d5051c7a-c581-4240-99fe-72a8c0128c34", // MOD 2024 — oxide with highest m.p.
    ],
    relatedSlugs: [
      "atomic-structure-and-periodic-classification",
      "chemical-reactions",
      "carbon-and-its-compounds",
    ],
  },

  // ─────────────────────── CALCULATE ───────────────────────
  "mole-concept-and-stoichiometry": {
    trigger:
      "A mass↔mole conversion, an Avogadro-particle count, an equivalent-weight calculation, or a 'which law of chemical combination is shown' question.",
    story: [
      "9 q in 10 years · 11% HARD — the bank's only Calculate-strand chapter. The 4 core formulas: mol = mass / molar mass; mol = particles / N_A where N_A = 6.022×10²³; mass(g) = mol × molar mass; equiv-weight = molar mass / valency factor. Worked example: mass of 0.5 mol N₂. Molar mass N₂ = 28 g/mol. mass = 0.5 × 28 = 14 g. That's the standard MOD plug-in.",
      "Equivalent weight is the tricky form. For an acid: equiv-weight = molar mass / basicity (number of replaceable H⁺). HCl basicity 1 → equiv 36.5. H₂SO₄ basicity 2 → equiv 49. H₃PO₄ basicity 3 → equiv 32.7. For a base: / acidity (number of OH⁻). For a salt: / total positive charge. Oxalic acid C₂H₂O₄·2H₂O: molar mass = 24 + 2 + 64 + 36 = 126 g/mol; basicity 2 → equiv 63 (the classic NDA 2019 question).",
      "Stoichiometry questions in NDA are typically 'which law is shown': Conservation of mass (Lavoisier — total mass before = total mass after; e.g. 1.7 g AgNO₃ + 0.585 g NaCl → 1.435 g AgCl + 0.85 g NaNO₃, total 2.285 g both sides). Definite proportions (Proust — a pure compound always has the same elemental ratio by mass). Multiple proportions (Dalton — when same elements form 2+ compounds, the masses of B per fixed mass of A are in simple ratios; e.g. CO vs CO₂ have O:C ratios 16:12 vs 32:12, ratio 1:2). Match the data pattern to the law — don't try to derive.",
    ],
    subSkills: [
      {
        name: "Mass ↔ mole conversion",
        description:
          "mol = mass(g) / molar mass(g/mol). mass(g) = mol × molar mass. For ratios, the moles cancel — only the mass-to-mass ratio matters once balanced. Watch units: kg ↔ g, mL ↔ L.",
      },
      {
        name: "Avogadro particle counting",
        description:
          "mol = particles / N_A where N_A = 6.022×10²³. 1 mol H₂O contains N_A molecules of H₂O, but 2N_A H atoms + N_A O atoms (count atoms not molecules when asked). 22.4 L at STP = 1 mol gas (Avogadro's law).",
      },
      {
        name: "Equivalent weight calculation",
        description:
          "Acid: molar mass / basicity (replaceable H⁺ count). HCl/1, H₂SO₄/2, H₃PO₄/3, CH₃COOH/1, H₂C₂O₄/2 (oxalic acid). Base: / acidity (OH⁻ count). NaOH/1, Ca(OH)₂/2, Al(OH)₃/3. Salt: / total positive charge. Na₂CO₃: 106/2 = 53.",
      },
      {
        name: "Law-of-combination matching",
        description:
          "Mass conservation: total mass in = total mass out. Definite proportions: fixed elemental mass ratio in a pure compound (H₂O always 1:8 H:O by mass). Multiple proportions: 2+ compounds of same elements have mass ratios in simple integer ratios (CO vs CO₂; H₂O vs H₂O₂).",
      },
    ],
    traps: [
      {
        name: "Mass of N₂ vs mass of N atoms",
        description:
          "0.5 mol N₂ has mass 0.5 × 28 = 14 g (molar mass of N₂ molecule = 28). If the question asked for mass of N ATOMS in 0.5 mol N₂ (= 1 mol N atoms), it'd be 14 g (still equal because 1 mol N × 14 = 14). But for fractional cases — 0.5 mol N₂ contains 1 mol N atoms — count atoms not molecules.",
      },
      {
        name: "Equivalent weight of polyprotic acids",
        description:
          "For H₂SO₄ (diprotic), equiv = 98/2 = 49 (not 98). For H₃PO₄ (triprotic), equiv = 98/3 = 32.7 (not 98). Wrong option uses molar mass directly without dividing by basicity.",
      },
      {
        name: "STP volume only for IDEAL gas",
        description:
          "1 mol gas at STP = 22.4 L applies only to IDEAL gases (or close-to-ideal at low pressure, normal T). Real gases deviate. NDA generally tests ideal-gas only — but watch for 'at STP, 1 mol of ANY substance = 22.4 L' (false for solids/liquids).",
      },
    ],
    exampleQuestionIds: [
      "c5ddc56b-34ec-4126-9c50-d678db2d9dd8", // HARD 2017 — C6H12O4 contains
      "6ba46ed2-9561-4bb2-9849-ab894c7769be", // MOD 2019 — equivalent weight of oxalic acid
    ],
    relatedSlugs: [
      "atomic-structure-and-periodic-classification",
      "chemical-reactions",
      "acids-bases-and-salts",
    ],
  },
};

/** Slugs with full deep-dive content (all 12). */
export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
