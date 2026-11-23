import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Properties of Aldehydes and Ketones",
  title: "Reactions of Aldehydes and Ketones",
  oneLineDefinition:
    "The tests that tell aldehydes from ketones, nucleophilic addition of HCN, sodium bisulfite, alcohols and ammonia derivatives, aldol condensation and the Cannizzaro reaction, and Clemmensen, Wolf-Kishner and hydride reductions.",
  whyItMatters:
    "28 questions. Twenty were set in board papers from 2014 to 2026, six of them in 2026. The board asked aldol condensation five times (2014, 2020, 2023, 2025, 2026), the Cannizzaro reaction four times including the cross Cannizzaro (2014, 2024, 2025, 2026) and Clemmensen reduction four times (2024, 2025 twice, 2026), with Wolf-Kishner reduction, the Tollens' and Fehling tests, the haloform reaction, a cyclic ketal and a 2,4-dinitrophenylhydrazone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccak-tests",
      name: "Tests for aldehydes and ketones",
      intuition:
        "An aldehyde has a hydrogen on its carbonyl carbon, so even a mild oxidising agent turns it into the acid (as the carboxylate ion) and is itself reduced: Ag⁺ to silver metal, Cu²⁺ to red Cu₂O. A ketone has no such hydrogen and is not touched. Ketones are found by their own test, and methyl ketones by the iodoform test.",
      definition:
        "- **Tollens' reagent** is ammoniacal silver nitrate (AgNO₃ with dilute NaOH gives a brown precipitate, which is dissolved in dilute ammonia). \\(\\text{R-CHO} + 2\\,[\\text{Ag(NH}_3)_2]^+ + 3\\,\\text{OH}^- \\to \\text{R-COO}^- + 2\\,\\text{Ag} + 4\\,\\text{NH}_3 + 2\\,\\text{H}_2\\text{O}\\)\n" +
        "- **Fehling solution** is Fehling A (copper sulfate) mixed with Fehling B (sodium potassium tartrate in NaOH). \\(\\text{R-CHO} + 2\\,\\text{Cu}^{2+} + 5\\,\\text{OH}^- \\xrightarrow{\\text{boil}} \\text{R-COO}^- + \\text{Cu}_2\\text{O} + 3\\,\\text{H}_2\\text{O}\\). An \\(\\alpha\\)-hydroxy ketone also gives this test; benzaldehyde does not.\n" +
        "- **Haloform reaction:** acetaldehyde, methyl ketones (\\(\\text{CH}_3\\text{-CO-R}\\)) and alcohols with a \\(\\text{CH}_3\\text{CH(OH)-}\\) group, warmed with iodine and NaOH, give a yellow precipitate of iodoform: \\(\\text{CH}_3\\text{COCH}_3 + 3\\,\\text{NaOI} \\to \\text{CHI}_3 + \\text{CH}_3\\text{COONa} + 2\\,\\text{NaOH}\\). The acid salt has one carbon less. Such an alcohol is first oxidised to the methyl ketone; a C=C bond in the molecule is not attacked by the hypohalite.\n" +
        "- In each oxidation test, the aldehyde is oxidised and the metal ion is reduced, so the test is a redox reaction.",
      table: {
        columns: ["Test", "Reagent", "What is seen", "Given by"],
        rows: [
          { cells: ["Schiff test", "Schiff's reagent (magenta p-rosaniline hydrochloride made colourless with SO₂)", "Pink, red or magenta colour", "Aldehydes"] },
          {
            cells: ["Tollens' (silver mirror) test", "Ammoniacal silver nitrate, boiled", "Silver mirror", "Aldehydes, aliphatic and aromatic"],
            pyqExampleId: "9ea508d4-6573-4341-b356-db226b6729f9",
            noteAmber: "Board 2026 asked the Tollens' test for acetaldehyde.",
          },
          { cells: ["Fehling test", "Fehling solution, boiled in hot water", "Red precipitate of cuprous oxide, Cu₂O", "Aliphatic aldehydes (and α-hydroxy ketones), not benzaldehyde"] },
          { cells: ["Sodium nitroprusside test", "Freshly made sodium nitroprusside, then NaOH drop by drop", "Red colour", "Ketones"] },
          {
            cells: ["Iodoform test", "Iodine and NaOH, warmed", "Yellow precipitate of iodoform, CHI₃", "Ethanal, methyl ketones, alcohols with CH₃CH(OH) group"],
            pyqExampleId: "f8ec3ea7-d8cc-418b-9b53-4aaf1d2f18a8",
            noteAmber: "Board 2025 asked a note on the haloform reaction.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which of propanal and propanone gives a red precipitate on boiling with Fehling solution?", answer: "Propanal" },
        { prompt: "Does pentan-3-one give the iodoform test?", answer: "No: it is not a methyl ketone" },
        { prompt: "Does propan-2-ol give a yellow precipitate with iodine and NaOH?", answer: "Yes: the reagent first oxidises it to propanone, a methyl ketone" },
        { prompt: "Which of the two reagents, Tollens' reagent or Fehling solution, is not reduced by benzaldehyde?", answer: "Fehling solution" },
      ],
      traps: [
        {
          title: "Writing a Tollens' reaction for a ketone",
          body: "Ketones have no H on the carbonyl carbon and are not oxidised by Tollens' reagent or Fehling solution. A ketone is shown by the sodium nitroprusside test.",
        },
        {
          title: "Iodoform from every ketone",
          body: "Only methyl ketones, ethanal and alcohols with a \\(\\text{CH}_3\\text{CH(OH)-}\\) group give iodoform. A ketone such as diethyl ketone gives no yellow precipitate.",
        },
        {
          title: "A test with no observation",
          body: "Name what is seen: a silver mirror, a red precipitate of Cu₂O, a yellow precipitate of CHI₃. The observation is where the test's mark is.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-nucleophilic-addition",
      name: "Nucleophilic addition: HCN, sodium bisulfite, alcohols and ammonia derivatives",
      intuition:
        "The nucleophile bonds to the positive carbonyl carbon and the oxygen picks up a hydrogen. With alcohols the addition happens twice, giving first a hemiacetal and then an acetal. With ammonia derivatives, H₂N-Z, the addition is followed by loss of water, so the C=O becomes C=N-Z.",
      definition:
        "- **HCN:** adds across C=O to give a **cyanohydrin**; the CN⁻ attacks the carbonyl carbon, and an acid or a base catalyses the reaction: \\(\\text{CH}_3\\text{CHO} + \\text{HCN} \\to \\text{CH}_3\\text{CH(OH)CN}\\). A new C-C bond forms, so it is a step-up reaction; the CN group can later be turned into COOH or \\(\\text{CH}_2\\text{NH}_2\\).\n" +
        "- **NaHSO₃:** a saturated solution gives a crystalline **bisulfite adduct**. Dilute acid or base splits it back, so the reaction separates and purifies aldehydes and ketones.\n" +
        "- **Alcohols:** an aldehyde with one molecule of an anhydrous alcohol in dry HCl gives a **hemiacetal**, and with a second molecule the **acetal**. Ketones give hemiketals and ketals. With a 1,2- or 1,3-diol and dry HCl a ketone gives a five or six membered **cyclic ketal**, used to protect the ketone group; aqueous acid turns it back into the ketone.\n" +
        "- **Ammonia derivatives** \\(\\text{H}_2\\text{N-Z}\\): hydroxylamine gives an oxime, hydrazine a hydrazone, phenylhydrazine a phenylhydrazone, semicarbazide a semicarbazone, 2,4-dinitrophenylhydrazine a 2,4-dinitrophenylhydrazone, and a primary amine an imine. The products are crystalline solids, used to identify the carbonyl compound. In strongly acidic medium the nitrogen is protonated and is no longer a nucleophile.",
      formula: {
        label: "Addition then loss of water",
        latex: "\\text{>C=O} + \\text{H}_2\\text{N-Z} \\to \\text{>C=N-Z} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the reaction of propanone with hydroxylamine and name the product.",
        steps: [
          "Hydroxylamine, \\(\\text{H}_2\\text{N-OH}\\), is an ammonia derivative with Z = OH. It adds to the carbonyl carbon and then water is lost.",
          "\\((\\text{CH}_3)_2\\text{C=O} + \\text{H}_2\\text{N-OH} \\to (\\text{CH}_3)_2\\text{C=N-OH} + \\text{H}_2\\text{O}\\)",
        ],
        answer: "Propanone oxime (acetoxime), (CH₃)₂C=NOH",
      },
      selfCheckExample: {
        prompt: "What is formed when ethanal reacts with HCN? Give its formula.",
        steps: ["CN goes to the carbonyl carbon and H to the oxygen."],
        answer: "Ethanal cyanohydrin, CH₃CH(OH)CN",
      },
      practiceSet: [
        { prompt: "Which reagent gives a semicarbazone with an aldehyde?", answer: "Semicarbazide, \\(\\text{H}_2\\text{N-NH-CO-NH}_2\\)" },
        { prompt: "Why is the sodium bisulfite reaction useful?", answer: "The crystalline adduct can be split by dilute acid or base, so it separates and purifies aldehydes and ketones" },
        { prompt: "How is a cyclic ketal turned back into the ketone?", answer: "By hydrolysis with aqueous acid (dilute HCl)" },
        { prompt: "What does ethanal give with two molecules of ethanol in dry HCl?", answer: "The acetal \\(\\text{CH}_3\\text{CH(OC}_2\\text{H}_5)_2\\) (1,1-diethoxyethane)" },
      ],
      pyqExampleId: "c12e7cb9-4262-46cc-a82a-0f718e682354",
      traps: [
        {
          title: "Stopping at the hemiacetal",
          body: "With a second molecule of alcohol in dry HCl the stable product is the acetal (or ketal). The hemiacetal is only the intermediate.",
        },
        {
          title: "Water in the acetal reaction",
          body: "The alcohol and the HCl must be dry. Aqueous acid does the reverse and hydrolyses an acetal or ketal back to the carbonyl compound.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-aldol-cannizzaro",
      name: "Aldol condensation and the Cannizzaro reaction",
      intuition:
        "One question decides which reaction an aldehyde gives with alkali: does it have an α-hydrogen? If it does, dilute alkali pulls that hydrogen off and the carbanion adds to a second molecule: aldol. If it does not, concentrated alkali makes one molecule reduce another: Cannizzaro.",
      definition:
        "- **Aldol reaction:** an aldehyde with at least one \\(\\alpha\\)-hydrogen, with dilute alkali (NaOH, KOH or Na₂CO₃) as catalyst, gives a \\(\\beta\\)-hydroxy aldehyde, the **aldol**. This step is an addition. On warming the aldol loses water to give an \\(\\alpha,\\beta\\)-unsaturated aldehyde. The overall change, **aldol condensation**, is a nucleophilic addition-elimination reaction.\n" +
        "- **Ketones** with at least two \\(\\alpha\\)-hydrogens also react, giving a ketol and then an \\(\\alpha,\\beta\\)-unsaturated ketone.\n" +
        "- **Cross aldol condensation:** between two different aldehydes or ketones. If both have \\(\\alpha\\)-hydrogens, four products form (ethanal with propanal).\n" +
        "- **Mechanism of the aldol addition.** Board 2020 asked it, but the present book shows only the overall reaction, so give it less time than the reaction itself.\n" +
        "- Step 1: \\(\\text{OH}^-\\) removes an \\(\\alpha\\)-hydrogen: \\(\\text{CH}_3\\text{CHO} + \\text{OH}^- \\to {}^-\\text{CH}_2\\text{CHO} + \\text{H}_2\\text{O}\\); the carbanion is resonance stabilised.\n" +
        "- Step 2: the carbanion attacks the carbonyl carbon of a second molecule, giving an alkoxide ion, \\(\\text{CH}_3\\text{CH(O}^-)\\text{CH}_2\\text{CHO}\\).\n" +
        "- Step 3: the alkoxide takes \\(\\text{H}^+\\) from water, giving the aldol and setting \\(\\text{OH}^-\\) free again.\n" +
        "- **Cannizzaro reaction:** only aldehydes with **no** \\(\\alpha\\)-hydrogen (methanal, benzaldehyde), heated with **concentrated** alkali. One molecule is reduced to the alcohol and another oxidised to the salt of the acid: a disproportionation (self oxidation and reduction). \\(2\\,\\text{HCHO} + \\text{NaOH} \\xrightarrow{50\\%} \\text{CH}_3\\text{OH} + \\text{HCOONa}\\).\n" +
        "- **Cross Cannizzaro reaction:** methanal with another aldehyde that has no \\(\\alpha\\)-hydrogen, in strong base. Methanal is always the one oxidised (to sodium formate, formic acid on acidification); the other aldehyde is reduced to its alcohol.",
      formula: {
        label: "Cannizzaro reaction",
        latex: "2\\,\\text{R-CHO} \\xrightarrow{\\text{conc. NaOH},\\ \\Delta} \\text{R-CH}_2\\text{OH} + \\text{R-COONa} \\quad (\\text{R has no } \\alpha\\text{-H})",
      },
      authoredExample: {
        prompt: "Explain the aldol condensation of propanone with equations.",
        steps: [
          "Propanone has six \\(\\alpha\\)-hydrogens. Dilute NaOH removes one, and the carbanion adds to the C=O carbon of a second molecule.",
          "Addition: \\(2\\,\\text{CH}_3\\text{COCH}_3 \\xrightarrow{\\text{dil. NaOH}} (\\text{CH}_3)_2\\text{C(OH)CH}_2\\text{COCH}_3\\), 4-hydroxy-4-methylpentan-2-one (a ketol).",
          "Elimination on warming: \\((\\text{CH}_3)_2\\text{C(OH)CH}_2\\text{COCH}_3 \\xrightarrow[-\\text{H}_2\\text{O}]{\\Delta} (\\text{CH}_3)_2\\text{C=CHCOCH}_3\\).",
        ],
        answer: "4-Hydroxy-4-methylpentan-2-one, which loses water to give 4-methylpent-3-en-2-one (mesityl oxide)",
      },
      selfCheckExample: {
        prompt: "Write the Cannizzaro reaction of methanal and name both products.",
        steps: ["Methanal has no \\(\\alpha\\)-hydrogen. With 50% NaOH: \\(2\\,\\text{HCHO} + \\text{NaOH} \\to \\text{CH}_3\\text{OH} + \\text{HCOONa}\\)."],
        answer: "Methanol (reduced) and sodium formate (oxidised)",
      },
      practiceSet: [
        { prompt: "Which of methanal, ethanal, benzaldehyde and propanal can undergo aldol condensation?", answer: "Ethanal and propanal (they have \\(\\alpha\\)-hydrogens)" },
        { prompt: "How many products does a cross aldol condensation of ethanal and propanal give?", answer: "Four" },
        { prompt: "In a cross Cannizzaro reaction of methanal with benzaldehyde, which aldehyde is oxidised?", answer: "Methanal (to formate); benzaldehyde is reduced to benzyl alcohol" },
        { prompt: "Can 2-methylpropanal (isobutyraldehyde) undergo the Cannizzaro reaction?", answer: "No: it has one \\(\\alpha\\)-hydrogen, so with alkali it gives the aldol reaction instead" },
      ],
      pyqExampleId: "5117e139-dc2c-4c50-af19-2257beecdd7a",
      traps: [
        {
          title: "Dilute and concentrated alkali mixed up",
          body: "Aldol condensation uses dilute alkali as a catalyst. The Cannizzaro reaction needs concentrated (50%) alkali. Writing the wrong one over the arrow costs the condition mark.",
        },
        {
          title: "Aldol from an aldehyde with no α-hydrogen",
          body: "Methanal and benzaldehyde have no \\(\\alpha\\)-hydrogen, so they cannot form the carbanion and cannot give aldol condensation.",
        },
        {
          title: "Stopping at the aldol",
          body: "'Condensation' means water is lost. A full answer shows both stages: the \\(\\beta\\)-hydroxy compound and then the \\(\\alpha,\\beta\\)-unsaturated compound.",
        },
        {
          title: "Two alcohols from Cannizzaro",
          body: "It is a disproportionation: one product is the alcohol and the other is the salt of the carboxylic acid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-reductions",
      name: "Reduction and oxidation: Clemmensen, Wolf-Kishner and reduction to alcohols",
      intuition:
        "Reduce a carbonyl group gently and you get an alcohol. Reduce it fully and the oxygen leaves altogether, so >C=O becomes >CH₂: in acid (Clemmensen) or in base (Wolf-Kishner). Oxidation is easy for an aldehyde but hard for a ketone.",
      definition:
        "- **Clemmensen reduction:** zinc amalgam and concentrated HCl: \\(\\text{>C=O} + 4[\\text{H}] \\xrightarrow{\\text{Zn-Hg, conc. HCl}} \\text{>CH}_2 + \\text{H}_2\\text{O}\\).\n" +
        "- **Wolf-Kishner reduction:** the carbonyl compound with hydrazine gives the hydrazone, which on heating with NaOH or KOH in ethylene glycol loses N₂ and gives \\(\\text{>CH}_2\\). It is used to make straight chain alkyl benzenes, which Friedel-Crafts alkylation cannot.\n" +
        "- In both, the oxygen is replaced by two hydrogen atoms.\n" +
        "- **To alcohols** (from Chapter 11): H₂ with Ni, LiAlH₄ or NaBH₄ reduce an aldehyde to a primary alcohol and a ketone to a secondary alcohol. LiAlH₄ leaves an isolated C=C bond untouched.\n" +
        "- **Oxidation:** aldehydes are oxidised to acids by dilute HNO₃, KMnO₄ or acidified dichromate. Ketones resist oxidation, but strong oxidising agents (CrO₃, alkaline KMnO₄, hot concentrated HNO₃) break them into a mixture of acids with fewer carbon atoms.\n" +
        "- **Ring substitution:** in aromatic aldehydes and ketones the CHO and C=O groups withdraw electrons and direct nitration, sulfonation and halogenation to the meta position.",
      formula: {
        label: "Clemmensen and Wolf-Kishner reductions",
        latex: "\\text{>C=O} \\xrightarrow{\\text{Zn-Hg, conc. HCl}} \\text{>CH}_2 \\qquad \\text{>C=O} \\xrightarrow[\\text{(ii) KOH, ethylene glycol},\\ \\Delta]{\\text{(i) NH}_2\\text{NH}_2} \\text{>CH}_2",
      },
      authoredExample: {
        prompt: "Convert acetophenone into ethylbenzene by Wolf-Kishner reduction. Write the reactions.",
        steps: [
          "Hydrazone formation: \\(\\text{C}_6\\text{H}_5\\text{COCH}_3 + \\text{H}_2\\text{N-NH}_2 \\to \\text{C}_6\\text{H}_5\\text{C(=N-NH}_2)\\text{CH}_3 + \\text{H}_2\\text{O}\\).",
          "Heating with KOH in ethylene glycol: \\(\\text{C}_6\\text{H}_5\\text{C(=N-NH}_2)\\text{CH}_3 \\xrightarrow{\\text{KOH, ethylene glycol},\\ \\Delta} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}_3 + \\text{N}_2\\).",
        ],
        answer: "Ethylbenzene, C₆H₅CH₂CH₃",
      },
      selfCheckExample: {
        prompt: "What is formed when butanal is reduced with LiAlH₄ and the product is treated with dilute acid?",
        steps: ["An aldehyde is reduced to the primary alcohol with the same carbon chain."],
        answer: "Butan-1-ol",
      },
      practiceSet: [
        { prompt: "Name the product of Clemmensen reduction of propanal.", answer: "Propane" },
        { prompt: "Which of the two reductions suits a compound that cannot stand strong acid?", answer: "Wolf-Kishner reduction, which works in base" },
        { prompt: "What does propanone give with H₂ and nickel?", answer: "Propan-2-ol" },
        { prompt: "Which gas is given off in Wolf-Kishner reduction?", answer: "Nitrogen, N₂" },
      ],
      pyqExampleId: "7a37071d-c5a0-49f5-bc37-742ffe268fb1",
      traps: [
        {
          title: "Stopping at the alcohol",
          body: "Clemmensen and Wolf-Kishner reductions take the carbonyl group all the way to \\(\\text{-CH}_2\\text{-}\\). Propanone gives propane, not propan-2-ol.",
        },
        {
          title: "An unbalanced Clemmensen equation",
          body: "Write \\(4[\\text{H}]\\) on the left and \\(\\text{H}_2\\text{O}\\) on the right; the oxygen of the C=O leaves as water.",
        },
        {
          title: "Reducing the C=C too",
          body: "LiAlH₄ reduces the C=O of an unsaturated aldehyde but leaves an isolated C=C bond in place, so the double bond stays in the product.",
        },
      ],
    },
  ],
};
