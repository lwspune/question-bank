import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions of Aldehydes and Ketones",
  title: "Chemical Reactions of Aldehydes and Ketones",
  oneLineDefinition:
    "Nucleophilic addition to the C=O group and its reactivity order, the addition products with HCN, NaHSO₃, Grignard reagents, alcohols and ammonia derivatives, reduction and oxidation with the Tollens', Fehling's and iodoform tests, and the reactions of the α-hydrogen: aldol, cross aldol and Cannizzaro.",
  whyItMatters:
    "117 questions, a hundred of them from board papers from 2022 to 2026, the most on any page of this chapter. Every year the board sets a chemical test to tell two compounds apart, an \"identify the compound\" problem built from test results, Cannizzaro's reaction and a Clemmensen or Wolff-Kishner reduction. It also asks reactivity orders towards HCN or nucleophilic addition, aldol and cross aldol products, why α-hydrogens are acidic (2022, 2023, 2024, 2026), and the products with 2,4-DNP, semicarbazide, Grignard reagents and NaBH₄. Seventeen come from the textbook.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcak-reactivity",
      name: "Nucleophilic addition: mechanism and reactivity",
      intuition:
        "Oxygen pulls the electrons of the C=O bond towards itself, so the carbon is left slightly positive. A nucleophile, a species rich in electrons, attacks that carbon. Anything that makes the carbon less positive or harder to reach slows the reaction: alkyl groups do both, and a benzene ring joined to the C=O shares its electrons with it.",
      definition:
        "- The carbonyl carbon is **electrophilic** because oxygen is more electronegative. Alkenes undergo electrophilic addition; aldehydes and ketones undergo **nucleophilic addition**.\n" +
        "- **Step 1:** the nucleophile attacks the carbonyl carbon from a direction roughly **perpendicular** to the plane of its sp² orbitals. The carbon changes from **sp² to sp³** and a tetrahedral **alkoxide intermediate** forms.\n" +
        "- **Step 2:** the alkoxide captures a **proton** from the medium, giving the neutral product. Net result: Nu and H add across the C=O.\n" +
        "- **Aldehydes are more reactive than ketones.** Steric: the two larger groups of a ketone block the nucleophile more than the one group of an aldehyde. Electronic: two alkyl groups lower the positive charge on the carbon more than one.\n" +
        "- So **HCHO > CH₃CHO > CH₃COCH₃**, and bigger alkyl groups lower reactivity further.\n" +
        "- **Benzaldehyde is less reactive than propanal:** resonance with the ring reduces the polarity of the C=O, so the carbon is less electrophilic.\n" +
        "- On the ring, an electron-withdrawing group raises reactivity and an electron-releasing group lowers it: acetophenone < p-tolualdehyde < benzaldehyde < p-nitrobenzaldehyde.",
      formula: {
        label: "Nucleophilic addition to a carbonyl group",
        latex: "\\text{R}_2\\text{C=O} + \\text{Nu}^- \\rightarrow \\text{R}_2\\text{C(Nu)-O}^- \\xrightarrow{\\text{H}^+} \\text{R}_2\\text{C(Nu)-OH}",
        symbols: [
          { symbol: "\\(\\text{Nu}^-\\)", meaning: "the nucleophile, for example CN⁻" },
          { symbol: "\\(\\text{R}_2\\text{C(Nu)-O}^-\\)", meaning: "the tetrahedral alkoxide intermediate" },
        ],
      },
      authoredExample: {
        prompt: "Arrange pentan-3-one, butanal and butanone in increasing order of reactivity towards HCN. Give reasons.",
        steps: [
          "Butanal is an aldehyde: one alkyl group on the carbonyl carbon.",
          "Butanone is a ketone: a methyl and an ethyl group.",
          "Pentan-3-one is a ketone with two ethyl groups: the most crowded carbonyl carbon and the most electron release.",
          "Steric: more and bigger groups block the CN⁻. Electronic: each alkyl group lowers the positive charge on the carbon.",
        ],
        answer: "Pentan-3-one < butanone < butanal",
      },
      selfCheckExample: {
        prompt: "Which adds HCN faster, benzaldehyde or ethanal? Give the reason.",
        steps: [
          "In benzaldehyde the C=O is conjugated with the ring.",
          "Resonance moves electron density from the ring towards the carbonyl carbon, so it is less positive.",
          "Ethanal's methyl group gives no such resonance.",
        ],
        answer: "Ethanal; resonance makes the carbonyl carbon of benzaldehyde less electrophilic",
      },
      practiceSet: [
        { prompt: "Give two reasons why aldehydes are more reactive than ketones in nucleophilic addition.", answer: "Steric: a ketone's two groups block the nucleophile more. Electronic: two alkyl groups reduce the positive charge on the carbonyl carbon more than one" },
        { prompt: "What is the hybridisation of the carbonyl carbon before and after a nucleophile adds?", answer: "sp² before, sp³ after (in the tetrahedral alkoxide)" },
        { prompt: "Which adds HCN faster, p-nitrobenzaldehyde or benzaldehyde?", answer: "p-Nitrobenzaldehyde: the nitro group withdraws electrons and makes the carbonyl carbon more positive" },
      ],
      pyqExampleId: "a4c3f8de-6f9a-4902-bb84-d0a284dc252b",
      traps: [
        {
          title: "Calling it electrophilic addition",
          body: "The first attack on a C=O is by an electron-rich nucleophile on the carbon. That is nucleophilic addition; electrophilic addition is what alkenes do.",
        },
        {
          title: "Giving one reason when the comparison needs two",
          body: "For aldehyde against ketone, write both the steric reason (bulk blocks the nucleophile) and the electronic reason (alkyl groups reduce the positive charge). Each carries marks.",
        },
        {
          title: "Leaving out the proton step",
          body: "The mechanism has two steps: attack gives the tetrahedral alkoxide, then the alkoxide picks up H⁺. An answer that stops at the alkoxide is incomplete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcak-addition",
      name: "Addition products: HCN, NaHSO₃, Grignard reagents, alcohols, ammonia derivatives and hydrides",
      intuition:
        "Each reagent here brings a nucleophile to the carbonyl carbon. Some products keep the new group and an -OH (cyanohydrin, alcohol from a Grignard reagent). Others lose water as well and end with a C=N bond (oxime, hydrazone, semicarbazone). Learn the reagent, the product and its name as a set.",
      definition:
        "- **HCN:** very slow with pure HCN, so a base is added; the **cyanide ion** adds to give a **cyanohydrin**, a useful synthetic intermediate.\n" +
        "- **NaHSO₃:** gives a water-soluble addition compound. The equilibrium lies to the right for most aldehydes and to the left for most ketones (steric reasons). Dilute mineral acid or alkali gives back the carbonyl compound, so it is used to **separate and purify aldehydes**.\n" +
        "- **Grignard reagent, then hydrolysis:** methanal gives a **primary** alcohol, other aldehydes a **secondary** alcohol, ketones a **tertiary** alcohol.\n" +
        "- **Alcohols with dry HCl:** an aldehyde with one equivalent gives a **hemiacetal**; a second equivalent gives an **acetal** (gem-dialkoxy compound). Ketones with ethylene glycol give cyclic **ethylene glycol ketals**. Dry HCl protonates the carbonyl oxygen and makes the carbon more electrophilic. Aqueous mineral acid hydrolyses acetals and ketals back.\n" +
        "- **Ammonia derivatives H₂N-Z:** add, then lose water to give **>C=N-Z**. The reaction is reversible and acid catalysed; fast dehydration drives it forward.\n" +
        "- **Reduction:** NaBH₄, LiAlH₄ or catalytic hydrogenation reduce **aldehydes to primary and ketones to secondary alcohols**.",
      table: {
        columns: ["Reagent", "Product", "Point to remember"],
        rows: [
          {
            cells: ["HCN (base catalysed)", "Cyanohydrin: \\(\\text{CH}_3\\text{CHO} + \\text{HCN} \\rightarrow \\text{CH}_3\\text{CH(OH)CN}\\)", "CN⁻ is the nucleophile; hydrolysis of the -CN gives a 2-hydroxy acid"],
            pyqExampleId: "ee455df6-d4f8-49cf-9c3d-32a6e2dd4488",
            noteAmber: "Board 2024 asked what kind of reaction cyanohydrin formation is: nucleophilic addition.",
          },
          { cells: ["NaHSO₃", "\\(\\text{R}_2\\text{C=O} + \\text{NaHSO}_3 \\rightleftharpoons \\text{R}_2\\text{C(OH)SO}_3\\text{Na}\\)", "Separates and purifies aldehydes; dilute acid or alkali reverses it"] },
          {
            cells: ["R'MgX, then H₃O⁺", "HCHO gives a primary, RCHO a secondary, R₂CO a tertiary alcohol", "The Grignard carbon joins the carbonyl carbon: one carbon group more"],
            pyqExampleId: "7b4888f7-768a-4412-8fc1-d67e315f41f3",
            noteAmber: "Board 2024 asked what a ketone gives with a Grignard reagent: a tertiary alcohol.",
          },
          {
            cells: ["R'OH, dry HCl", "\\(\\text{RCHO} \\rightarrow \\text{RCH(OH)OR'}\\) (hemiacetal) \\(\\rightarrow \\text{RCH(OR')}_2\\) (acetal)", "One equivalent stops at the hemiacetal; a ketone with ethylene glycol gives a cyclic ketal"],
            pyqExampleId: "dd329817-dd6c-4e5d-ac0d-f0f97b551ec7",
            noteAmber: "Board 2023 asked which structure is an acetal: two -OR groups on a carbon that also carries H.",
          },
          { cells: ["NH₂OH (hydroxylamine)", "\\(\\text{R}_2\\text{C=N-OH}\\), oxime", "Water is lost: addition then elimination"] },
          { cells: ["NH₂NH₂ (hydrazine)", "\\(\\text{R}_2\\text{C=N-NH}_2\\), hydrazone", "The first step of the Wolff-Kishner reduction"] },
          { cells: ["C₆H₅NHNH₂ (phenylhydrazine)", "\\(\\text{R}_2\\text{C=N-NHC}_6\\text{H}_5\\), phenylhydrazone", "Shows a C=O group is present"] },
          { cells: ["2,4-Dinitrophenylhydrazine", "\\(\\text{R}_2\\text{C=N-NH-C}_6\\text{H}_3(\\text{NO}_2)_2\\), 2,4-DNP derivative", "Yellow, orange or red solids used to characterise aldehydes and ketones"] },
          {
            cells: ["NH₂CONHNH₂ (semicarbazide)", "\\(\\text{R}_2\\text{C=N-NHCONH}_2\\), semicarbazone", "Only the -NH₂ not next to the C=O of semicarbazide reacts"],
            pyqExampleId: "278218a5-956b-4a75-9c3a-dde7fb89feb8",
            noteAmber: "Board 2025 asked the product of ethanal with semicarbazide.",
          },
          { cells: ["R'NH₂ (primary amine)", "\\(\\text{R}_2\\text{C=N-R'}\\), substituted imine (Schiff's base)", "Same pattern with Z = alkyl or aryl"] },
          {
            cells: ["NaBH₄ or LiAlH₄", "\\(\\text{RCHO} \\rightarrow \\text{RCH}_2\\text{OH}\\); \\(\\text{R}_2\\text{CO} \\rightarrow \\text{R}_2\\text{CHOH}\\)", "NaBH₄ reduces a ketone or aldehyde group and leaves an ester group in the same molecule"],
            pyqExampleId: "d1b73ea1-00d8-4145-91ea-7fdfbe496b86",
            noteAmber: "Board 2023, 2024, 2025 and 2026 asked NaBH₄ on a compound with a ketone and an ester: only the ketone is reduced.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write the product of butanone with semicarbazide in weakly acidic medium, and name it.",
        steps: [
          "Semicarbazide is H₂N-NH-CO-NH₂; the end -NH₂ attacks the carbonyl carbon.",
          "Water is lost and a C=N bond forms.",
          "\\(\\text{CH}_3\\text{COCH}_2\\text{CH}_3 + \\text{H}_2\\text{NNHCONH}_2 \\rightarrow \\text{CH}_3\\text{C(=NNHCONH}_2)\\text{CH}_2\\text{CH}_3 + \\text{H}_2\\text{O}\\)",
        ],
        answer: "Butanone semicarbazone, CH₃C(=NNHCONH₂)CH₂CH₃",
      },
      practiceSet: [
        { prompt: "Which alcohol forms when methanal reacts with CH₃MgBr followed by hydrolysis? Name its class.", answer: "Ethanol, CH₃CH₂OH, a primary alcohol" },
        { prompt: "Semicarbazide has two -NH₂ groups. Why does only one form the semicarbazone?", answer: "The -NH₂ joined to the C=O has its lone pair delocalised by resonance, so it is not nucleophilic; the other -NH₂ attacks" },
        { prompt: "Why is NaHSO₃ used to purify aldehydes?", answer: "It forms a water-soluble addition compound that can be separated, and dilute acid or alkali gives back the aldehyde" },
      ],
      pyqExampleId: "c24644f7-3a70-411f-9935-1d48eb1e2aa6",
      traps: [
        {
          title: "One mole of alcohol does not give an acetal",
          body: "An aldehyde with one equivalent of alcohol and dry HCl stops at the hemiacetal (one -OH and one -OR on the carbon). The acetal, with two -OR groups, needs a second equivalent.",
        },
        {
          title: "Treating 2,4-DNP as a test for aldehydes",
          body: "Aldehydes and ketones both give the coloured 2,4-DNP derivative. It shows a C=O group is present; Tollens' or Fehling's reagent then decides whether it is an aldehyde.",
        },
        {
          title: "Running the ammonia-derivative reaction in strong acid",
          body: "These additions need a weakly acidic medium. In strong acid the -NH₂ of the reagent is protonated, loses its free lone pair and can no longer attack the carbonyl carbon. Board 2026 asked for this reason.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcak-tests",
      name: "Reduction to hydrocarbons, oxidation and the tests",
      intuition:
        "An aldehyde has a hydrogen on its carbonyl carbon, so even a gentle oxidising agent can turn it into an acid. A ketone has carbon on both sides, so only harsh oxidation, which breaks the carbon chain, works. That difference is the basis of the Tollens' and Fehling's tests. The iodoform test looks for a different thing: a CH₃ joined to the C=O.",
      definition:
        "- **Clemmensen reduction:** zinc amalgam and **concentrated HCl** reduce >C=O to **>CH₂**.\n" +
        "- **Wolff-Kishner reduction:** **hydrazine**, then heating with **NaOH or KOH** in a high boiling solvent such as **ethylene glycol**, also gives >CH₂.\n" +
        "- **Aldehydes are easily oxidised** to carboxylic acids, even by mild reagents. **Ketones** need strong oxidising agents and high temperature; a C-C bond breaks and a mixture of acids with fewer carbons forms.\n" +
        "- **Tollens' test:** warm with freshly prepared **ammoniacal silver nitrate**: a **bright silver mirror**. The aldehyde becomes the carboxylate ion (alkaline medium).\n" +
        "- **Fehling's test:** Fehling A (aqueous **CuSO₄**) and Fehling B (alkaline **sodium potassium tartrate**, Rochelle salt), mixed in equal amounts. Heated with an aldehyde: a **reddish brown precipitate**. **Aromatic aldehydes do not respond.**\n" +
        "- **Iodoform test:** sodium hypoiodite (I₂ and NaOH) gives a **yellow precipitate of CHI₃** with a **CH₃CO- group** or a **CH₃CH(OH)- group**. The rest becomes the sodium salt of an acid with one carbon fewer; a C=C in the molecule is not affected.\n" +
        "- **Identifying a compound:** 2,4-DNP positive means C=O; Tollens' or Fehling's positive means aldehyde; iodoform positive means CH₃CO-; Cannizzaro means an aldehyde with no α-hydrogen; the acid from strong oxidation shows the skeleton.",
      table: {
        columns: ["Reaction or test", "Reagent and change", "What it tells you"],
        rows: [
          {
            cells: ["Clemmensen reduction", "\\(\\text{>C=O} \\xrightarrow{\\text{Zn-Hg, conc. HCl}} \\text{>CH}_2\\)", "Carbonyl compound to hydrocarbon, in acid"],
            pyqExampleId: "97ffcb7d-3c6b-47ba-a4f9-2826a29da6f4",
            noteAmber: "Board 2024 asked butan-2-one with Zn(Hg) and conc. HCl: it gives butane.",
          },
          {
            cells: ["Wolff-Kishner reduction", "\\(\\text{>C=O} \\xrightarrow{\\text{NH}_2\\text{NH}_2} \\text{>C=NNH}_2 \\xrightarrow[\\text{ethylene glycol, heat}]{\\text{KOH}} \\text{>CH}_2 + \\text{N}_2\\)", "The same change, in alkali"],
            pyqExampleId: "5a789d01-aaf0-43d1-ba76-20cb6fb736bf",
            noteAmber: "Board 2026 asked which reaction turns a ketone into a hydrocarbon.",
          },
          {
            cells: ["Tollens' test", "Ammoniacal AgNO₃, warm: silver mirror; \\(\\text{RCHO} \\rightarrow \\text{RCOO}^-\\)", "Any aldehyde, aliphatic or aromatic; ketones give nothing"],
            pyqExampleId: "890a3df1-0900-4ee6-91b8-b0bbbc3226dd",
            noteAmber: "Board 2023 and 2024 asked Tollens' reagent on a ring carrying both -CHO and a ketone: only the -CHO is oxidised.",
          },
          {
            cells: ["Fehling's test", "Cu²⁺ in alkaline tartrate, heat: reddish brown Cu₂O; \\(\\text{RCHO} \\rightarrow \\text{RCOO}^-\\)", "Aliphatic aldehydes only; benzaldehyde gives nothing"],
            pyqExampleId: "68ea21d3-5a89-46be-85e6-9fb9429500e1",
            noteAmber: "Board 2026 assertion-reason: the aldehyde is oxidised and the Fehling's reagent reduced, not the other way round.",
          },
          {
            cells: ["Iodoform test", "NaOI (I₂ and NaOH): \\(\\text{RCOCH}_3 \\rightarrow \\text{RCOONa} + \\text{CHI}_3\\downarrow\\) (yellow)", "A CH₃CO- or CH₃CH(OH)- group is present"],
            pyqExampleId: "07c744fb-c9e4-4282-86c0-5eff9ff98d64",
            noteAmber: "Board 2025 asked to tell pentan-2-one from pentan-3-one: only pentan-2-one gives the yellow precipitate.",
          },
          { cells: ["Strong oxidation of a ketone", "KMnO₄ or K₂Cr₂O₇ with heat: C-C bond cleaves", "A mixture of acids with fewer carbons; shows where the C=O was"] },
          { cells: ["NaHCO₃ solution", "Brisk effervescence of CO₂ with a -COOH compound only", "Tells a carboxylic acid from an aldehyde or ketone"] },
        ],
      },
      selfCheckExample: {
        prompt: "Compound P, C₄H₈O, gives a silver mirror with Tollens' reagent and no yellow precipitate with I₂ and NaOH. Wolff-Kishner reduction of P gives n-butane. Identify P.",
        steps: [
          "Silver mirror: P is an aldehyde.",
          "No iodoform: no CH₃CO- group, which fits an aldehyde other than ethanal.",
          "Reduction to n-butane: the four carbons are in a straight chain (2-methylpropanal would give 2-methylpropane).",
          "So P is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CHO}\\).",
        ],
        answer: "Butanal, CH₃CH₂CH₂CHO",
      },
      practiceSet: [
        { prompt: "Why is an aldehyde oxidised by Tollens' reagent while a ketone needs a strong oxidising agent?", answer: "The aldehyde has a hydrogen on its carbonyl carbon, so only a C-H bond breaks; oxidising a ketone must break a C-C bond" },
        { prompt: "Which of ethanal, propanal and benzaldehyde give a reddish brown precipitate with Fehling's reagent?", answer: "Ethanal and propanal; benzaldehyde, an aromatic aldehyde, does not" },
        { prompt: "Does propan-2-ol give the iodoform test? Why?", answer: "Yes: it has a CH₃CH(OH)- group, which hypoiodite first oxidises to CH₃CO-" },
      ],
      pyqExampleId: "86c7f7e3-719c-4814-a4d3-921ec3d5d2a0",
      traps: [
        {
          title: "Using the iodoform test on ethanal and propanone",
          body: "Both have a CH₃CO- group, so both give iodoform. To tell them apart use Tollens' or Fehling's reagent, which only the aldehyde reduces.",
        },
        {
          title: "Expecting benzaldehyde to give Fehling's test",
          body: "Aromatic aldehydes give the Tollens' silver mirror but not the Fehling's precipitate. To test an aromatic aldehyde, name Tollens' reagent.",
        },
        {
          title: "Mixing up Clemmensen and Wolff-Kishner conditions",
          body: "Clemmensen uses zinc amalgam with concentrated HCl (acid). Wolff-Kishner uses hydrazine, then KOH or NaOH in ethylene glycol with heat (alkali). Both end at >CH₂, not at an alcohol.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-alpha",
      name: "α-Hydrogen: aldol, cross aldol and Cannizzaro reactions",
      intuition:
        "A hydrogen on the carbon next to the C=O can be pulled off by a base, because the negative charge left behind spreads onto the oxygen. That carbanion attacks the C=O of a second molecule: the aldol reaction. An aldehyde with no such hydrogen cannot do this, so concentrated alkali makes it do something else: one molecule is reduced and another oxidised.",
      definition:
        "- **α-Hydrogens are acidic** because the carbonyl group strongly withdraws electrons and the **conjugate base is stabilised by resonance**: the negative charge moves onto the oxygen.\n" +
        "- **Aldol reaction:** an aldehyde or ketone with **at least one α-hydrogen**, with **dilute alkali**, gives a **β-hydroxy aldehyde (aldol)** or **β-hydroxy ketone (ketol)**.\n" +
        "- **Aldol condensation:** the aldol or ketol readily loses water to give an **α,β-unsaturated carbonyl compound**.\n" +
        "- **Cross aldol condensation:** between two different aldehydes or ketones. If **both have α-hydrogens, four products** form. A partner with no α-hydrogen (methanal, benzaldehyde) can only be attacked; it cannot supply the carbanion.\n" +
        "- **Cannizzaro reaction:** an aldehyde with **no α-hydrogen**, heated with **concentrated alkali**, disproportionates: one molecule is reduced to the **alcohol**, another oxidised to the **salt of the carboxylic acid**.\n" +
        "- **Ring substitution:** in aromatic aldehydes and ketones the carbonyl group is **deactivating and meta directing**.",
      formula: {
        label: "Aldol reaction and condensation of ethanal",
        latex: "2\\,\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO} \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH=CHCHO} + \\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO}\\)", meaning: "3-hydroxybutanal, the aldol" },
          { symbol: "\\(\\text{CH}_3\\text{CH=CHCHO}\\)", meaning: "but-2-enal, the aldol condensation product" },
        ],
      },
      authoredExample: {
        prompt: "Which of propanal, cyclohexanone and methanal undergo the aldol reaction and which the Cannizzaro reaction? Write the aldol of propanal.",
        steps: [
          "Look at the carbon next to the C=O. Propanal: a CH₂ with two α-hydrogens, so aldol.",
          "Cyclohexanone: both ring carbons next to the C=O carry hydrogens, so aldol.",
          "Methanal: no carbon next to the C=O at all, so no α-hydrogen: Cannizzaro.",
          "Aldol of propanal: the carbanion \\(\\text{CH}_3\\text{CH}^-\\text{CHO}\\) attacks a second propanal.",
          "\\(2\\,\\text{CH}_3\\text{CH}_2\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH}_2\\text{CH(OH)CH(CH}_3)\\text{CHO}\\)",
        ],
        answer: "Aldol: propanal and cyclohexanone; Cannizzaro: methanal. Aldol of propanal: 3-hydroxy-2-methylpentanal",
      },
      selfCheckExample: {
        prompt: "Write the products when 2,2-dimethylpropanal, (CH₃)₃CCHO, is heated with concentrated NaOH.",
        steps: [
          "The carbon next to the -CHO carries three methyl groups and no hydrogen: no α-hydrogen.",
          "So concentrated alkali gives the Cannizzaro reaction: one molecule reduced, one oxidised.",
          "\\(2\\,(\\text{CH}_3)_3\\text{CCHO} + \\text{NaOH} \\xrightarrow{\\Delta} (\\text{CH}_3)_3\\text{CCH}_2\\text{OH} + (\\text{CH}_3)_3\\text{CCOONa}\\)",
        ],
        answer: "2,2-Dimethylpropan-1-ol and sodium 2,2-dimethylpropanoate",
      },
      practiceSet: [
        { prompt: "Why are the α-hydrogens of aldehydes and ketones acidic?", answer: "The C=O withdraws electrons strongly and the carbanion left is stabilised by resonance, the negative charge moving onto oxygen" },
        { prompt: "How many aldol products can form from a mixture of ethanal and propanal with dilute alkali?", answer: "Four: both have α-hydrogens, so each can be the carbanion or the partner attacked" },
        { prompt: "Benzaldehyde is nitrated with HNO₃ and H₂SO₄. Where does the nitro group go?", answer: "To the meta position: 3-nitrobenzaldehyde, since -CHO is deactivating and meta directing" },
      ],
      pyqExampleId: "19bbf73c-f823-4d15-8daa-09b15354751f",
      traps: [
        {
          title: "Dilute against concentrated alkali",
          body: "Aldol needs dilute alkali and at least one α-hydrogen. Cannizzaro needs concentrated alkali and no α-hydrogen. Read the strength of the alkali and count the α-hydrogens before naming the reaction.",
        },
        {
          title: "Stopping or not stopping at the aldol",
          body: "Dilute alkali alone gives the β-hydroxy compound (aldol or ketol). With heat, water is lost and the α,β-unsaturated compound forms. Give the product the condition asks for.",
        },
        {
          title: "Counting the -CHO hydrogen as an α-hydrogen",
          body: "An α-hydrogen sits on the carbon next to the C=O, not on the C=O carbon itself. Methanal and benzaldehyde have none; acetophenone has three, on its CH₃ group.",
        },
      ],
    },
  ],
};
