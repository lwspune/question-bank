import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AP_ALCOHOLS_NOTE: SubtopicNote = {
  subtopicName: "Alcohols and Phenols",
  title: "Alcohols and Phenols: Preparation, Properties and Reactions",
  oneLineDefinition:
    "How alcohols and phenol are made, why they boil high and dissolve in water, why phenol is a stronger acid than an alcohol, and their reactions: dehydration with its mechanism, the Lucas test, oxidation, esterification, ring substitution, Kolbe's and the Reimer-Tiemann reactions.",
  whyItMatters:
    "150 questions. A hundred and twenty were set in board papers from 2023 to 2026. Every year the board asks for the mechanism of dehydration of ethanol at 443 K, Kolbe's and the Reimer-Tiemann reactions, hydroboration-oxidation, the alcohol made from a Grignard reagent, the order of acid strength of phenols and alcohols, and what phenol gives with bromine water. It also asks the mechanism of hydration of ethene (2023, 2025, 2026), bromination in CS₂ (2024, 2025, 2026), nitration with dilute or concentrated nitric acid, the Lucas test (2023, 2025, 2026), the oxidation of alcohols, aspirin (2023, 2024, 2026), phenol from cumene (2023, 2025) and the separation of o- and p-nitrophenol by steam distillation (2025). The textbook adds phenol from benzene through benzenesulphonic acid, and many conversions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcap-alcohol-prep",
      name: "Preparing alcohols: hydration, hydroboration, reduction and Grignard reagents",
      intuition:
        "Every method puts an OH group where something else was. Water can be added across a C=C double bond in two ways: with acid the OH goes to the more substituted carbon (Markovnikov), with diborane it goes to the carbon that had more hydrogens. Hydrogen can be added to a C=O group. Or a Grignard reagent can add a carbon group to a C=O group, and the class of carbonyl compound decides the class of alcohol.",
      definition:
        "- **Acid catalysed hydration** follows Markovnikov's rule: \\(\\text{CH}_3\\text{CH}{=}\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_3\\).\n" +
        "- **Mechanism of hydration of ethene**, three steps. First \\(\\text{H}_2\\text{O} + \\text{H}^+ \\rightarrow \\text{H}_3\\text{O}^+\\).\n" +
        "- Step 1, protonation of the alkene to a carbocation by electrophilic attack of H₃O⁺: \\(\\text{CH}_2{=}\\text{CH}_2 + \\text{H}_3\\text{O}^+ \\rightleftharpoons \\text{CH}_3-\\overset{+}{\\text{C}}\\text{H}_2 + \\text{H}_2\\text{O}\\).\n" +
        "- Step 2, nucleophilic attack of water on the carbocation: \\(\\text{CH}_3-\\overset{+}{\\text{C}}\\text{H}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2\\).\n" +
        "- Step 3, deprotonation to the alcohol: \\(\\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{CH}_2\\text{OH} + \\text{H}_3\\text{O}^+\\).\n" +
        "- **Hydroboration-oxidation:** diborane adds so that boron goes to the sp² carbon carrying more hydrogens; H₂O₂ in aqueous NaOH then gives the alcohol, as if water had added against Markovnikov's rule: \\(\\text{CH}_3\\text{CH}{=}\\text{CH}_2 \\xrightarrow{(\\text{BH}_3)_2} (\\text{CH}_3\\text{CH}_2\\text{CH}_2)_3\\text{B} \\xrightarrow{\\text{H}_2\\text{O}_2,\\ \\text{OH}^-} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}\\).\n" +
        "- **Reduction:** aldehydes give primary and ketones secondary alcohols with H₂ over Pt, Pd or Ni, or with NaBH₄ or LiAlH₄. Carboxylic acids give primary alcohols with LiAlH₄.\n" +
        "- **Grignard reagents:** methanal gives a primary alcohol, any other aldehyde a secondary alcohol, a ketone a tertiary alcohol. With methanal the alcohol is RCH₂OH, one carbon longer than R.",
      formula: {
        label: "Grignard reagent and a carbonyl compound",
        latex: "\\text{R}'\\text{MgX} + {>}\\text{C}{=}\\text{O} \\xrightarrow{\\text{dry ether}} {>}\\text{C}(\\text{OMgX})\\text{R}' \\xrightarrow{\\text{H}_2\\text{O}} {>}\\text{C}(\\text{OH})\\text{R}' + \\text{Mg(OH)X}",
      },
      authoredExample: {
        prompt: "Butanone is treated with methylmagnesium bromide and the product is hydrolysed. Write the reactions and give the IUPAC name of the alcohol formed.",
        steps: [
          "Butanone, \\(\\text{CH}_3\\text{COCH}_2\\text{CH}_3\\), is a ketone, so the product will be a tertiary alcohol.",
          "Addition: \\(\\text{CH}_3\\text{COCH}_2\\text{CH}_3 + \\text{CH}_3\\text{MgBr} \\xrightarrow{\\text{dry ether}} (\\text{CH}_3)_2\\text{C}(\\text{OMgBr})\\text{CH}_2\\text{CH}_3\\).",
          "Hydrolysis: \\((\\text{CH}_3)_2\\text{C}(\\text{OMgBr})\\text{CH}_2\\text{CH}_3 \\xrightarrow{\\text{H}_2\\text{O}} (\\text{CH}_3)_2\\text{C}(\\text{OH})\\text{CH}_2\\text{CH}_3 + \\text{Mg(OH)Br}\\).",
          "Longest chain with the OH carbon has four carbons, OH and CH₃ both on C-2.",
        ],
        answer: "2-Methylbutan-2-ol, a tertiary alcohol",
      },
      selfCheckExample: {
        prompt: "Name the alcohol formed from but-1-ene (a) by acid catalysed hydration and (b) by hydroboration-oxidation.",
        steps: [
          "(a) Markovnikov: H⁺ adds to the CH₂ end, OH to C-2: \\(\\text{CH}_3\\text{CH}_2\\text{CH}(\\text{OH})\\text{CH}_3\\).",
          "(b) Boron adds to the CH₂ end, so OH ends up on C-1: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{OH}\\).",
        ],
        answer: "(a) Butan-2-ol (b) Butan-1-ol",
      },
      practiceSet: [
        { prompt: "Which Grignard reagent, with methanal, gives 2-phenylethanol, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}_2\\text{OH}\\)?", answer: "Benzylmagnesium bromide, C₆H₅CH₂MgBr: methanal adds one CH₂OH carbon" },
        { prompt: "Name the product of reducing butan-2-one with NaBH₄.", answer: "Butan-2-ol, a secondary alcohol" },
        { prompt: "Which alkene gives 2-methylbutan-2-ol on acid catalysed hydration?", answer: "2-Methylbut-2-ene (2-methylbut-1-ene also works): the OH goes to the carbon that holds the methyl group" },
      ],
      pyqExampleId: "e0029db0-55d4-4f4f-ae2c-feb491991546",
      traps: [
        {
          title: "Putting the OH on the wrong carbon",
          body: "Acid hydration puts OH on the more substituted carbon; hydroboration-oxidation puts it on the carbon that carried more hydrogens. Propene gives propan-2-ol with acid but propan-1-ol with diborane.",
        },
        {
          title: "Expecting a primary alcohol from any aldehyde",
          body: "Only methanal gives a primary alcohol with a Grignard reagent. Every other aldehyde gives a secondary alcohol, and a ketone gives a tertiary one.",
        },
        {
          title: "Stopping at the adduct",
          body: "The Grignard step gives a magnesium alkoxide, not the alcohol. Write the hydrolysis step too, and dry ether over the first arrow.",
        },
        {
          title: "A hydration mechanism with a missing step",
          body: "Start with H₂O + H⁺ giving H₃O⁺, and show H₃O⁺ attacking the alkene to give the carbocation. Then water attacks, then a proton is lost. Each of the three steps carries its own mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-phenol-prep",
      name: "Preparing phenol",
      intuition:
        "Phenol cannot be made by adding water to benzene. It is made by swapping a group already on the ring for oxygen: Cl, SO₃H or N₂⁺. Most phenol in the world is made from cumene, which also gives acetone, so nothing is wasted.",
      definition:
        "- **From chlorobenzene:** fused with NaOH at 623 K and 320 atm, then acidified: \\(\\text{C}_6\\text{H}_5\\text{Cl} \\xrightarrow{\\text{NaOH},\\ 623\\ \\text{K},\\ 320\\ \\text{atm}} \\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{HCl}} \\text{C}_6\\text{H}_5\\text{OH}\\). The C-Cl bond of an aryl halide is hard to break, so the conditions are severe.\n" +
        "- **From benzenesulphonic acid:** benzene is sulphonated with oleum; heating with molten NaOH gives sodium phenoxide; acid gives phenol: \\(\\text{C}_6\\text{H}_6 \\xrightarrow{\\text{oleum}} \\text{C}_6\\text{H}_5\\text{SO}_3\\text{H} \\xrightarrow{\\text{molten NaOH}} \\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_5\\text{OH}\\).\n" +
        "- **From a diazonium salt:** aniline with nitrous acid (NaNO₂ + HCl) at 273 to 278 K gives benzene diazonium chloride, which gives phenol on warming with water: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{H}_2\\text{O} \\xrightarrow{\\text{warm}} \\text{C}_6\\text{H}_5\\text{OH} + \\text{N}_2 + \\text{HCl}\\).\n" +
        "- **From cumene** (isopropylbenzene), the main commercial method: air oxidises it to cumene hydroperoxide, and dilute acid splits that into phenol and acetone: \\(\\text{C}_6\\text{H}_5\\text{CH}(\\text{CH}_3)_2 \\xrightarrow{\\text{O}_2\\ (\\text{air})} \\text{C}_6\\text{H}_5\\text{C}(\\text{CH}_3)_2\\text{OOH} \\xrightarrow{\\text{H}^+,\\ \\text{H}_2\\text{O}} \\text{C}_6\\text{H}_5\\text{OH} + \\text{CH}_3\\text{COCH}_3\\).",
      table: {
        columns: ["Starting compound", "Reagents and conditions", "Products"],
        rows: [
          {
            cells: ["Chlorobenzene", "NaOH at 623 K and 320 atm, then acid", "Phenol (through sodium phenoxide)"],
            pyqExampleId: "70443273-5538-4ae4-9300-699efe498ab4",
            noteAmber: "Board 2024 asked for phenol from chlorobenzene as one of three preparations.",
          },
          {
            cells: ["Benzene", "Oleum, then molten NaOH, then acid", "Phenol (through benzenesulphonic acid)"],
            pyqExampleId: "b2fcc7a4-8ed4-4008-b3ff-63bb7ef8b220",
          },
          { cells: ["Aniline", "NaNO₂ + HCl at 273 to 278 K, then warm water", "Phenol, N₂ and HCl"] },
          {
            cells: ["Cumene", "Air, then dilute acid", "Phenol and acetone"],
            pyqExampleId: "6fc5576e-10c8-4206-9937-26f54dfdc672",
            noteAmber: "Board 2023 and 2025 asked for phenol from cumene.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write the steps to make phenol from aniline.",
        steps: [
          "Diazotise: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{NaNO}_2 + 2\\text{HCl} \\xrightarrow{273\\text{-}278\\ \\text{K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{NaCl} + 2\\text{H}_2\\text{O}\\).",
          "Warm with water: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{H}_2\\text{O} \\rightarrow \\text{C}_6\\text{H}_5\\text{OH} + \\text{N}_2 + \\text{HCl}\\).",
        ],
        answer: "Diazotisation at 273 to 278 K, then warming the diazonium salt with water",
      },
      practiceSet: [
        { prompt: "Name the gas given off when benzene diazonium chloride is warmed with water.", answer: "Nitrogen, N₂" },
        { prompt: "What is formed when sodium benzenesulphonate is fused with NaOH, before acid is added?", answer: "Sodium phenoxide, C₆H₅ONa" },
        { prompt: "Why does chlorobenzene need such severe conditions to give phenol?", answer: "Its C-Cl bond is on an sp² carbon of the ring and is hard to break" },
      ],
      pyqExampleId: "b4ab5075-9634-4832-b035-beb7cf525da1",
      traps: [
        {
          title: "Forgetting the acid step",
          body: "Fusion with NaOH gives sodium phenoxide, not phenol. Write the acidification as the last step, or the answer stops one step short.",
        },
        {
          title: "Cumene equations without the hydroperoxide",
          body: "Write two steps: air oxidation to cumene hydroperoxide, then dilute acid. Jumping straight from cumene to phenol loses the step marks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-physical",
      name: "Structure, boiling points and solubility",
      intuition:
        "An OH group lets molecules hold each other by hydrogen bonds. That is why alcohols and phenols boil far higher than hydrocarbons and ethers of the same size, and why small alcohols mix with water. Where an OH group bonds to a group in its own molecule instead, the molecules let go of each other easily and the compound becomes volatile.",
      definition:
        "- In alcohols the C-O bond uses sp³ orbitals of carbon and oxygen; the C-O-H angle is slightly less than tetrahedral because the lone pairs on oxygen repel.\n" +
        "- In phenol the OH is on an sp² carbon. Its C-O bond (136 pm) is slightly shorter than in methanol because of (i) partial double bond character, the lone pair on oxygen being conjugated with the ring, and (ii) the sp² carbon.\n" +
        "- This partial double bond is also why phenols do not undergo reactions that break the C-OH bond.\n" +
        "- **Boiling points** rise with the number of carbon atoms (more van der Waals force) and fall with branching (less surface area). They are much higher than those of hydrocarbons, ethers and haloalkanes of comparable mass because of **intermolecular hydrogen bonding**.\n" +
        "- **Solubility** in water comes from hydrogen bonds with water; it falls as the alkyl or aryl (hydrophobic) part grows.\n" +
        "- **o- and p-nitrophenol** are separated by steam distillation: o-nitrophenol is steam volatile because of **intramolecular** hydrogen bonding; p-nitrophenol is less volatile because **intermolecular** hydrogen bonding associates its molecules.",
      table: {
        columns: ["Pair", "Higher boiling or less volatile", "Reason"],
        rows: [
          {
            cells: ["Ethanol and methoxymethane (isomers)", "Ethanol", "Ethanol molecules are joined by intermolecular hydrogen bonds; ether molecules have no O-H to do this"],
            pyqExampleId: "29f2f93e-5d72-46ab-898a-308a9b3b501b",
            noteAmber: "Board 2024 and 2025 set this as assertion-reason items.",
          },
          {
            cells: ["Butan-1-ol and butan-2-ol", "Butan-1-ol", "Branching lowers the surface area and the van der Waals forces"],
            pyqExampleId: "ae6a1257-7b01-4d24-a29f-d44f136988a6",
            noteAmber: "Board 2023 asked why branching lowers boiling point; 2026 asked an order of four alcohols.",
          },
          {
            cells: ["o-Nitrophenol and p-nitrophenol", "p-Nitrophenol (o-nitrophenol is steam volatile)", "o-Nitrophenol bonds within its own molecule; p-nitrophenol bonds between molecules"],
            pyqExampleId: "6d1a475f-37b2-4fd6-b0a8-e7d2256128b5",
            noteAmber: "Board 2025 asked this four times, as assertion-reason items and a written answer.",
          },
          {
            cells: ["C-O bond in phenol and in methanol", "Longer in methanol", "Phenol's C-O bond has partial double bond character and its carbon is sp²"],
            pyqExampleId: "7ca64242-4769-45de-8bba-f87002043b76",
            noteAmber: "Board 2023 asked why the bond is shorter; 2024 and 2025 asked why phenol does not lose its OH group.",
          },
          {
            cells: ["Propanol and butane (similar mass)", "Propanol", "Hydrogen bonding in propanol; only weak van der Waals forces in butane"],
            pyqExampleId: "952105d5-e090-43f3-89cf-ca11b2d148af",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange in increasing order of boiling point: butan-1-ol, pentan-1-ol, propan-1-ol. Give the reason.",
        steps: ["All three are straight-chain primary alcohols with hydrogen bonding.", "The boiling point rises with the number of carbon atoms, as van der Waals forces grow."],
        answer: "Propan-1-ol < butan-1-ol < pentan-1-ol",
      },
      practiceSet: [
        { prompt: "Which boils higher, butan-2-ol or 2-methylpropan-2-ol? Give the reason.", answer: "Butan-2-ol: 2-methylpropan-2-ol is more branched, so it has less surface area and weaker van der Waals forces" },
        { prompt: "Why does the solubility of alcohols in water fall from methanol to pentan-1-ol?", answer: "The hydrophobic alkyl part grows while there is still only one OH group to hydrogen bond with water" },
        { prompt: "Why do lower alcohols dissolve in water while hydrocarbons of similar mass do not?", answer: "The OH group forms hydrogen bonds with water molecules; a hydrocarbon cannot" },
      ],
      pyqExampleId: "10b88f66-12e9-4563-94e3-d3f02f0ec378",
      traps: [
        {
          title: "Swapping intra and inter",
          body: "Intramolecular hydrogen bonding (within one molecule, as in o-nitrophenol) lowers the boiling point. Intermolecular hydrogen bonding (between molecules, as in ethanol or p-nitrophenol) raises it. Using the wrong word makes the reason false.",
        },
        {
          title: "Saying the ether forms hydrogen bonds between its molecules",
          body: "An ether has no H on oxygen, so its molecules cannot hydrogen bond to each other. It can only accept a hydrogen bond from water, which is why it dissolves a little.",
        },
        {
          title: "Steam distillation, not fractional distillation",
          body: "The method that separates o- and p-nitrophenol is steam distillation. Naming any other kind of distillation loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcap-acidity",
      name: "Acidity of alcohols and phenols",
      intuition:
        "An acid is strong when the ion left behind after it loses H⁺ is stable. When phenol loses H⁺, the negative charge on the phenoxide ion spreads over the ring by resonance; when an alcohol loses H⁺, the charge stays on one oxygen and the alkyl group even pushes more electron density onto it. A group that pulls electrons away (like NO₂) spreads the charge further and strengthens the acid; a group that pushes electrons in (like CH₃) weakens it.",
      definition:
        "- **Evidence of acidity:** alcohols and phenols react with active metals (Na, K, Al) to give alkoxides or phenoxides and H₂: \\(2\\text{R}-\\text{OH} + 2\\text{Na} \\rightarrow 2\\text{R}-\\text{ONa} + \\text{H}_2\\). Phenol also reacts with aqueous NaOH: \\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{NaOH} \\rightarrow \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}\\); alcohols do not.\n" +
        "- **Alcohols:** acidic because the O-H bond is polar. Alkyl groups release electrons and lower the acidity, so primary > secondary > tertiary. Alcohols are weaker acids than water: \\(\\text{R}-\\text{O}^- + \\text{H}-\\text{OH} \\rightarrow \\text{R}-\\text{OH} + \\text{OH}^-\\), so an alkoxide is a stronger base than hydroxide.\n" +
        "- Alcohols are also **Brønsted bases**: the unshared pairs on oxygen accept a proton.\n" +
        "- **Phenol is more acidic than alcohols and water:** (i) the sp² carbon it is bonded to is more electronegative, which makes the O-H bond more polar; (ii) the negative charge of the phenoxide ion is delocalised over the ring, while in an alkoxide ion it stays on oxygen.\n" +
        "- **Substituted phenols:** electron withdrawing groups (NO₂) raise the acidity, most of all at the ortho and para positions where they take part in the delocalisation. Electron releasing groups lower it: the cresols (alkyl groups) are less acidic than phenol, and an OCH₃ group at the ortho or para position, which releases electrons into the ring by resonance, also lowers it.\n" +
        "- **pKa:** the greater the pKa, the weaker the acid. o-Nitrophenol 7.2, m-nitrophenol 8.3, p-nitrophenol 7.1, phenol 10.0, cresols 10.1 to 10.2, ethanol 15.9.",
      formula: {
        label: "Order of acid strength",
        latex: "\\text{R}_3\\text{COH} < \\text{R}_2\\text{CHOH} < \\text{RCH}_2\\text{OH} < \\text{H}_2\\text{O} < \\text{C}_6\\text{H}_5\\text{OH}",
      },
      authoredExample: {
        prompt: "Arrange in increasing order of acid strength: phenol, ethanol, 4-nitrophenol, water, 4-methylphenol. Give reasons.",
        steps: [
          "Ethanol is the weakest: its alkoxide keeps the charge on one oxygen, and alcohols are weaker acids than water.",
          "All the phenols are stronger than water, because the phenoxide charge spreads over the ring.",
          "The CH₃ group of 4-methylphenol releases electrons and makes it weaker than phenol (pKa 10.2 against 10.0).",
          "The NO₂ group of 4-nitrophenol withdraws electrons and spreads the charge further (pKa 7.1).",
        ],
        answer: "Ethanol < water < 4-methylphenol < phenol < 4-nitrophenol",
      },
      selfCheckExample: {
        prompt: "Which is the stronger acid, 3-nitrophenol or 4-nitrophenol? Give the reason.",
        steps: [
          "At the para position the NO₂ group takes part in delocalising the negative charge of the phenoxide ion.",
          "At the meta position it cannot, so its effect is weaker (pKa 8.3 against 7.1).",
        ],
        answer: "4-Nitrophenol is the stronger acid",
      },
      practiceSet: [
        { prompt: "Why does phenol dissolve in aqueous NaOH while ethanol does not react with it?", answer: "Phenol is acidic enough to form sodium phenoxide with NaOH; ethanol is a weaker acid than water, so it does not" },
        { prompt: "Which is the stronger base, sodium ethoxide or sodium hydroxide?", answer: "Sodium ethoxide: ethanol is a weaker acid than water, so its anion is the stronger base" },
        { prompt: "Arrange propan-1-ol, propan-2-ol and 2-methylpropan-2-ol in decreasing order of acid strength.", answer: "Propan-1-ol > propan-2-ol > 2-methylpropan-2-ol (more alkyl groups, weaker acid)" },
      ],
      pyqExampleId: "7b90404e-7066-49a2-9346-171e518b165d",
      traps: [
        {
          title: "Reading pKa backwards",
          body: "A lower pKa means a stronger acid. Picric acid, with three NO₂ groups, has the lowest pKa of the common phenols and is the strongest acid among them.",
        },
        {
          title: "Explaining with the wrong species",
          body: "Acidity is decided by the stability of the ion left behind, the phenoxide or alkoxide ion. Say that the phenoxide ion is stabilised by resonance; saying only that phenol has resonance is not the reason.",
        },
        {
          title: "Alkyl groups do not help",
          body: "A methyl group releases electrons, so a cresol is a weaker acid than phenol, and a tertiary alcohol weaker than a primary one.",
        },
        {
          title: "The fourth assertion-reason code",
          body: "In Chemistry papers option (D) is \"Assertion false, Reason true\". A statement like \"phenol is less acidic than ethanol\" with the true reason \"phenoxide is more stable than ethoxide\" is (D).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcap-dehydration",
      name: "Dehydration of alcohols and its mechanism",
      intuition:
        "Strong acid takes a molecule of water out of an alcohol and leaves a double bond. The acid first makes the OH group into a good leaving group by adding H⁺ to it. Water then leaves and a carbocation remains: this is the slow step, so the easier the carbocation forms, the easier the alcohol dehydrates. Tertiary carbocations form most easily.",
      definition:
        "- Alcohols lose water to give alkenes with a protic acid (concentrated H₂SO₄ or H₃PO₄) or with anhydrous ZnCl₂ or alumina.\n" +
        "- Ethanol needs concentrated H₂SO₄ at 443 K. Secondary and tertiary alcohols need milder conditions: propan-2-ol with 85% H₃PO₄ at 440 K, 2-methylpropan-2-ol with 20% H₃PO₄ at 358 K.\n" +
        "- **Ease of dehydration:** tertiary > secondary > primary, because tertiary carbocations are the most stable and easiest to form.\n" +
        "- **Mechanism (ethanol to ethene)**, Step 1, formation of the protonated alcohol (fast): \\(\\text{CH}_3\\text{CH}_2-\\text{OH} + \\text{H}^+ \\rightleftharpoons \\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2\\) (ethyl oxonium ion).\n" +
        "- Step 2, formation of the carbocation, the slowest and rate determining step: \\(\\text{CH}_3\\text{CH}_2-\\overset{+}{\\text{O}}\\text{H}_2 \\rightleftharpoons \\text{CH}_3-\\overset{+}{\\text{C}}\\text{H}_2 + \\text{H}_2\\text{O}\\).\n" +
        "- Step 3, formation of ethene by elimination of a proton from the carbon next to the positive carbon: \\(\\text{H}-\\text{CH}_2-\\overset{+}{\\text{C}}\\text{H}_2 \\rightleftharpoons \\text{CH}_2{=}\\text{CH}_2 + \\text{H}^+\\).\n" +
        "- The acid used in step 1 is released in step 3. Ethene is removed as it forms, to drive the equilibrium to the right.\n" +
        "- At the lower temperature of 413 K, ethanol gives ethoxyethane instead (see the Ethers page).",
      formula: {
        label: "Dehydration of ethanol",
        latex: "\\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ 443\\ \\text{K}} \\text{CH}_2{=}\\text{CH}_2 + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the mechanism of the acid catalysed dehydration of propan-2-ol to propene.",
        steps: [
          "Step 1 (fast), protonation: \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_3 + \\text{H}^+ \\rightleftharpoons \\text{CH}_3\\text{CH}(\\overset{+}{\\text{O}}\\text{H}_2)\\text{CH}_3\\).",
          "Step 2 (slow), loss of water gives a secondary carbocation: \\(\\text{CH}_3\\text{CH}(\\overset{+}{\\text{O}}\\text{H}_2)\\text{CH}_3 \\rightleftharpoons \\text{CH}_3\\overset{+}{\\text{C}}\\text{HCH}_3 + \\text{H}_2\\text{O}\\).",
          "Step 3, loss of H⁺ from a CH₃ group next to the positive carbon: \\(\\text{CH}_3\\overset{+}{\\text{C}}\\text{HCH}_3 \\rightleftharpoons \\text{CH}_3\\text{CH}{=}\\text{CH}_2 + \\text{H}^+\\).",
          "Conditions: 85% H₃PO₄ at 440 K.",
        ],
        answer: "Protonation, then loss of water to the carbocation (slow), then loss of H⁺ to give propene",
      },
      selfCheckExample: {
        prompt: "Arrange ethanol, propan-2-ol and 2-methylpropan-2-ol in order of ease of dehydration, and give the reason.",
        steps: [
          "The slow step forms a carbocation, so the alcohol whose carbocation is most stable reacts most easily.",
          "Tertiary carbocation > secondary > primary in stability.",
        ],
        answer: "2-Methylpropan-2-ol > propan-2-ol > ethanol",
      },
      practiceSet: [
        { prompt: "Give the reagent and temperature for dehydrating 2-methylpropan-2-ol, and name the product.", answer: "20% H₃PO₄ at 358 K; 2-methylpropene" },
        { prompt: "Why is ethene removed from the flask as it forms during dehydration of ethanol?", answer: "To drive the equilibrium to the right" },
        { prompt: "Which species is released in the last step of the mechanism, and what does it do next?", answer: "H⁺; it is the acid catalyst, so it protonates the next alcohol molecule" },
      ],
      pyqExampleId: "da04051b-138c-4886-9aad-ee8a8b640f04",
      traps: [
        {
          title: "Calling protonation the slow step",
          body: "Protonation is the first step and it is fast. The slow, rate determining step is the loss of water to form the carbocation.",
        },
        {
          title: "No temperature over the arrow",
          body: "With concentrated H₂SO₄ ethanol gives ethene at the higher temperature and ethoxyethane at the lower one. Without the temperature over the arrow, the equation does not say which product you mean.",
        },
        {
          title: "Taking the proton from the wrong carbon",
          body: "In step 3 the H⁺ leaves from the carbon next to the positive carbon, and the double bond forms between these two carbons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-alcohol-reactions",
      name: "Reactions of alcohols: esters, the Lucas test and oxidation",
      intuition:
        "Alcohols react in two ways. When the O-H bond breaks, the alcohol acts as a nucleophile and gives esters or alkoxides. When the C-O bond breaks, the protonated alcohol acts as an electrophile and gives alkyl halides or alkenes. Oxidation removes the H from the O and an H from the carbinol carbon, so it needs a hydrogen on that carbon: tertiary alcohols have none.",
      definition:
        "- Alcohols react both as nucleophiles (O-H breaks) and, when protonated, as electrophiles (C-O breaks).\n" +
        "- **Esterification:** \\(\\text{R}-\\text{OH} + \\text{R}'\\text{COOH} \\overset{\\text{H}^+}{\\rightleftharpoons} \\text{R}'\\text{COOR} + \\text{H}_2\\text{O}\\). With a carboxylic acid or anhydride a little concentrated H₂SO₄ is used and water is removed as it forms; with an acid chloride, pyridine neutralises the HCl formed. Putting in a CH₃CO group is acetylation.\n" +
        "- **Aspirin** is made by acetylating salicylic acid (2-hydroxybenzoic acid): \\(\\text{o-HOC}_6\\text{H}_4\\text{COOH} + (\\text{CH}_3\\text{CO})_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{o-CH}_3\\text{COOC}_6\\text{H}_4\\text{COOH} + \\text{CH}_3\\text{COOH}\\).\n" +
        "- **Hydrogen halides:** \\(\\text{ROH} + \\text{HX} \\rightarrow \\text{R}-\\text{X} + \\text{H}_2\\text{O}\\); PBr₃ gives alkyl bromides. The **Lucas test** uses conc. HCl with ZnCl₂: alcohols dissolve in it, their chlorides do not and make it cloudy. Tertiary alcohols turn it cloudy at once; primary alcohols give no turbidity at room temperature; secondary alcohols take a few minutes.\n" +
        "- **Oxidation:** a primary alcohol gives an aldehyde with CrO₃ in an anhydrous medium or with PCC (pyridinium chlorochromate), and a carboxylic acid with a strong oxidant such as acidified KMnO₄. A secondary alcohol gives a ketone with CrO₃. A tertiary alcohol is not oxidised; under drastic conditions its C-C bonds break and acids with fewer carbons form.\n" +
        "- **Heated copper at 573 K:** primary alcohols give aldehydes and secondary alcohols ketones (dehydrogenation); tertiary alcohols lose water and give alkenes.",
      table: {
        columns: ["Reaction or test", "Reagent and conditions", "Result"],
        rows: [
          {
            cells: ["Lucas test, tertiary alcohol", "Conc. HCl and anhydrous ZnCl₂, room temperature", "Turbidity at once"],
            pyqExampleId: "b032777a-76e2-4eec-848f-2d818ed6248f",
            noteAmber: "Board 2023 and 2025 asked the order of reactivity, 1° < 2° < 3°; 2026 asked which alcohol turns cloudy at once.",
          },
          { cells: ["Lucas test, secondary alcohol", "Conc. HCl and anhydrous ZnCl₂", "Turbidity after a few minutes"] },
          { cells: ["Lucas test, primary alcohol", "Conc. HCl and anhydrous ZnCl₂", "No turbidity at room temperature"] },
          {
            cells: ["Primary alcohol to aldehyde", "PCC, or CrO₃ in an anhydrous medium", "RCHO, which is not oxidised further"],
            pyqExampleId: "9b922e00-d189-421f-a9b4-e7bf00915f74",
            noteAmber: "Board 2024 and 2026 asked these reagents.",
          },
          { cells: ["Primary alcohol to acid", "Acidified KMnO₄", "RCOOH"] },
          {
            cells: ["Secondary alcohol", "CrO₃ (chromic anhydride)", "Ketone"],
            pyqExampleId: "c0578c5c-e497-4420-ba98-ba17c3ecdc62",
            noteAmber: "Board 2024 and 2025 asked what CrO₃ gives with a secondary alcohol.",
          },
          { cells: ["Tertiary alcohol", "Ordinary oxidants", "No oxidation: no H on the carbinol carbon"] },
          {
            cells: ["Alcohol vapour over copper", "Cu at 573 K", "1°: aldehyde; 2°: ketone; 3°: alkene"],
            pyqExampleId: "146e507c-dddd-464c-b382-6ac998915b81",
            noteAmber: "Board 2024 and 2026 asked what a tertiary alcohol gives.",
          },
          {
            cells: ["Acetylation of salicylic acid", "Acetic anhydride with a little acid", "Aspirin (acetylsalicylic acid)"],
            pyqExampleId: "8919d967-75e6-414b-a0e8-0dc3fe93db28",
            noteAmber: "Board 2023, 2024 and 2026 asked which compound gives aspirin.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "An alcohol of formula C₄H₁₀O gives a ketone with CrO₃. Identify it and write the reaction.",
        steps: [
          "A ketone comes only from a secondary alcohol.",
          "The only secondary alcohol of formula C₄H₁₀O is butan-2-ol: \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_2\\text{CH}_3 \\xrightarrow{\\text{CrO}_3} \\text{CH}_3\\text{COCH}_2\\text{CH}_3\\).",
        ],
        answer: "Butan-2-ol, oxidised to butanone",
      },
      practiceSet: [
        { prompt: "Name a reagent that oxidises propan-1-ol to propanal without going on to the acid.", answer: "PCC (pyridinium chlorochromate), or CrO₃ in an anhydrous medium" },
        { prompt: "Write the equation for ethanol with ethanoic acid in the presence of a little concentrated H₂SO₄.", answer: "\\(\\text{C}_2\\text{H}_5\\text{OH} + \\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}\\)" },
        { prompt: "Why is pyridine added when an alcohol is esterified with an acid chloride?", answer: "To neutralise the HCl formed, which shifts the equilibrium to the right" },
      ],
      pyqExampleId: "f8ed6d19-851c-4711-b7b4-078886596a2b",
      traps: [
        {
          title: "A test answer without what you see",
          body: "For the Lucas test, name the reagent (conc. HCl with anhydrous ZnCl₂) and say what each alcohol shows and when: turbidity at once, after some minutes, or none at room temperature.",
        },
        {
          title: "A ketone from a tertiary alcohol",
          body: "Over copper at 573 K a tertiary alcohol has no H on its carbinol carbon to lose, so it is dehydrated to an alkene. It never gives a ketone.",
        },
        {
          title: "Using KMnO₄ to stop at the aldehyde",
          body: "Acidified KMnO₄ carries a primary alcohol right through to the acid. For the aldehyde use PCC or CrO₃ in an anhydrous medium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-phenol-reactions",
      name: "Reactions of phenol: ring substitution, Kolbe and Reimer-Tiemann",
      intuition:
        "The OH group feeds electron density into the benzene ring, most of all at the ortho and para positions. So phenol reacts with electrophiles far more easily than benzene, at those positions, and often more than once. Turn phenol into phenoxide with NaOH and the ring becomes even more reactive, enough to attack weak electrophiles such as CO₂.",
      definition:
        "- The OH group **activates** the ring towards electrophilic substitution and **directs** the incoming group to the ortho and para positions, which become electron rich by resonance.\n" +
        "- **Nitration:** dilute HNO₃ at low temperature (298 K) gives a mixture of o- and p-nitrophenol. Concentrated HNO₃ gives 2,4,6-trinitrophenol (picric acid), in poor yield; it is now made by first sulphonating phenol to phenol-2,4-disulphonic acid and then nitrating.\n" +
        "- **Bromination:** with Br₂ in a solvent of low polarity (CS₂ or CHCl₃) at low temperature, monobromophenols (o and p) form. With bromine water, 2,4,6-tribromophenol separates as a white precipitate. No Lewis acid is needed: the OH group activates the ring enough to polarise Br₂.\n" +
        "- **Kolbe's reaction:** \\(\\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{NaOH}} \\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{(i) CO}_2\\ \\text{(ii) H}^+} \\text{o-HOC}_6\\text{H}_4\\text{COOH}\\) (2-hydroxybenzoic acid, salicylic acid). Phenoxide is reactive enough to attack CO₂, a weak electrophile.\n" +
        "- **Reimer-Tiemann reaction:** phenol with CHCl₃ and aqueous NaOH puts a CHO group at the ortho position. The substituted benzal chloride is hydrolysed by the alkali, and acid gives salicylaldehyde: \\(\\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{CHCl}_3,\\ \\text{aq. NaOH}} \\text{o-HOC}_6\\text{H}_4\\text{CHCl}_2 \\xrightarrow{\\text{NaOH, then H}^+} \\text{o-HOC}_6\\text{H}_4\\text{CHO}\\).\n" +
        "- **Zinc dust:** \\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{Zn} \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_6 + \\text{ZnO}\\).\n" +
        "- **Oxidation:** chromic acid oxidises phenol to benzoquinone, a conjugated diketone.\n" +
        "- With two groups on the ring, both directing effects count: mononitration of 3-methylphenol gives 3-methyl-4-nitrophenol and 5-methyl-2-nitrophenol; dinitration gives 5-methyl-2,4-dinitrophenol.",
      table: {
        columns: ["Reaction", "Reagent and conditions", "Main product"],
        rows: [
          {
            cells: ["Bromination in a non-polar solvent", "Br₂ in CS₂ or CHCl₃, low temperature", "2-Bromophenol and 4-bromophenol"],
            pyqExampleId: "87027717-9155-4d2f-9b69-9d468c0575e1",
            noteAmber: "Board 2024, 2025 and 2026 asked this.",
          },
          {
            cells: ["Bromination in water", "Bromine water", "2,4,6-Tribromophenol, a white precipitate"],
            pyqExampleId: "d897d616-2c2c-42b9-a9c0-437c0242b200",
            noteAmber: "Asked every year from 2023 to 2026.",
          },
          {
            cells: ["Nitration, dilute acid", "Dilute HNO₃ at 298 K", "2-Nitrophenol and 4-nitrophenol"],
            pyqExampleId: "97cc0126-c01e-4b37-8172-e11834b6db71",
            noteAmber: "Board 2026 asked this as an MCQ.",
          },
          {
            cells: ["Nitration, concentrated acid", "Concentrated HNO₃", "2,4,6-Trinitrophenol (picric acid)"],
            pyqExampleId: "edf52ebd-38ce-4ae6-9f08-0cd3a9db77c1",
            noteAmber: "Board 2023, 2024 and 2025 asked this.",
          },
          {
            cells: ["Kolbe's reaction", "NaOH, then CO₂, then acid", "Salicylic acid (2-hydroxybenzoic acid)"],
            pyqExampleId: "956fe3e7-f61a-4568-89b4-58f555323ddd",
            noteAmber: "Asked every year from 2023 to 2026.",
          },
          {
            cells: ["Reimer-Tiemann reaction", "CHCl₃ and aqueous NaOH, then acid", "Salicylaldehyde (2-hydroxybenzaldehyde)"],
            pyqExampleId: "6a1904eb-0b0c-4b9d-ac21-0d09bdd91c3e",
            noteAmber: "Asked every year from 2023 to 2026; 2025 asked the IUPAC name of the product.",
          },
          { cells: ["Heating with zinc dust", "Zn dust, heat", "Benzene"] },
          {
            cells: ["Oxidation", "Chromic acid (Na₂Cr₂O₇ with acid)", "Benzoquinone"],
            pyqExampleId: "aab720df-329c-4bd0-be08-de5b94347cb2",
            noteAmber: "Board 2023 asked this.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write the equations for Kolbe's reaction and name the product.",
        steps: [
          "\\(\\text{C}_6\\text{H}_5\\text{OH} + \\text{NaOH} \\rightarrow \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}\\).",
          "\\(\\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{(i) CO}_2\\ \\text{(ii) H}^+} \\text{o-HOC}_6\\text{H}_4\\text{COOH}\\).",
        ],
        answer: "Salicylic acid (2-hydroxybenzoic acid)",
      },
      practiceSet: [
        { prompt: "Why does phenol give 2- and 4-bromophenol, and no 3-bromophenol, with Br₂ in CS₂?", answer: "The OH group makes the ortho and para positions electron rich by resonance, so the electrophile attacks there" },
        { prompt: "Name the product when phenol is heated with zinc dust.", answer: "Benzene" },
        { prompt: "Which group does the Reimer-Tiemann reaction put on the ring of phenol, and where?", answer: "A CHO group, ortho to the OH group" },
      ],
      pyqExampleId: "07dc0d8b-a30e-49eb-8a8b-44985b92d534",
      traps: [
        {
          title: "Mixing up Kolbe and Reimer-Tiemann",
          body: "CO₂ gives the acid (salicylic acid, Kolbe). CHCl₃ with NaOH gives the aldehyde (salicylaldehyde, Reimer-Tiemann). Both put the new group ortho to the OH.",
        },
        {
          title: "Ignoring the solvent in bromination",
          body: "Bromine water gives the tribromo product at once; Br₂ in CS₂ at low temperature gives only monobromophenols. Read the solvent before you write the product.",
        },
        {
          title: "Kolbe's reaction on phenol itself",
          body: "Phenol is not reactive enough for CO₂. Write the NaOH step that makes the phenoxide ion first.",
        },
        {
          title: "Meta for the OH group",
          body: "The OH group directs to ortho and para, never meta, and it activates the ring rather than deactivating it. Both facts come up as assertion-reason statements.",
        },
      ],
    },
  ],
};
