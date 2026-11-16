import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HC_ALKENES_NOTE: SubtopicNote = {
  subtopicName: "Alkenes and Alkynes",
  title: "Alkenes and Alkynes",
  oneLineDefinition:
    "The double bond and when it gives cis and trans isomers, conjugated dienes, adding HBr by Markovnikov's rule and against it with peroxide, oxidation and ozonolysis of alkenes, and alkynes: their acidic hydrogen, adding water and reducing them to cis or trans alkenes.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, the largest page of this chapter. Two are about structure: which compound shows cis-trans isomerism (2025) and which diene is conjugated (Re-NEET 2026). One asks the anti-Markovnikov product of HBr with a peroxide (2021). Four are about oxidation and the tests for a double bond: the alkene from its ozonolysis products (2022), acidic KMnO₄ cutting a C=C into two acids (NEET 2024), Baeyer's reagent (Re-NEET 2024) and the compound that does not decolourise bromine water (2025). One reduces an alkyne to a cis and a trans alkene and adds HBr to each (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchhc-alkene-isomerism",
      name: "The double bond, geometrical isomers and conjugation",
      intuition:
        "A C=C double bond is one σ bond and one π bond. The π bond is made by sideways overlap of p orbitals, so the two carbons cannot turn about the bond without breaking it. That locked bond is why groups can sit on the same side (cis) or opposite sides (trans), and the two forms are different compounds. But if one carbon carries two identical groups, swapping sides changes nothing, so there is no cis-trans pair.",
      definition:
        "- Open-chain alkenes are \\(\\text{C}_n\\text{H}_{2n}\\). Each double-bond carbon is \\(sp^2\\); the C=C bond (134 pm) is shorter than C-C (154 pm).\n" +
        "- **Structural isomers** differ in the chain or in the position of the double bond (but-1-ene and but-2-ene).\n" +
        "- **Geometrical (cis-trans) isomerism** needs restricted rotation AND two different groups on **each** double-bond carbon. **Cis**: like groups on the same side. **Trans**: on opposite sides.\n" +
        "- cis-But-2-ene is polar; in trans-but-2-ene the bond dipoles cancel, so it is non-polar.\n" +
        "- A ring also stops rotation, so a ring with groups on two different carbons (1,2-dimethylcyclohexane) has cis and trans forms. Two groups on one ring carbon give none.\n" +
        "- **Conjugated** double bonds alternate with single bonds (C=C-C=C, as in buta-1,3-diene). Double bonds separated by two or more single bonds are **isolated**.",
      authoredExample: {
        prompt: "How many open-chain alkenes have the formula \\(\\text{C}_4\\text{H}_8\\), counting cis and trans forms separately?",
        steps: [
          "Straight chain with the double bond at C1: but-1-ene. C1 carries two H atoms, so no cis-trans pair.",
          "Straight chain with the double bond at C2: but-2-ene. Each double-bond carbon carries H and \\(\\text{CH}_3\\), so it has a cis and a trans form.",
          "Branched chain: 2-methylpropene. C2 carries two \\(\\text{CH}_3\\) groups, so no cis-trans pair.",
          "Total: 1 + 2 + 1.",
        ],
        answer: "4 (but-1-ene, cis-but-2-ene, trans-but-2-ene and 2-methylpropene)",
      },
      selfCheckExample: {
        prompt: "Does hexa-2,4-diene, \\(\\text{CH}_3\\text{-CH=CH-CH=CH-CH}_3\\), have conjugated double bonds?",
        steps: [
          "The double bonds are C2=C3 and C4=C5.",
          "Only one single bond (C3-C4) lies between them, so double and single bonds alternate.",
        ],
        answer: "Yes, the double bonds are conjugated",
      },
      practiceSet: [
        { prompt: "What is the general formula of an open-chain alkene?", answer: "\\(\\text{C}_n\\text{H}_{2n}\\)" },
        { prompt: "Which bonds make up a C=C double bond?", answer: "One σ bond and one π bond" },
        { prompt: "Which has a dipole moment: cis-but-2-ene or trans-but-2-ene?", answer: "cis-But-2-ene (the dipoles cancel in the trans form)" },
        { prompt: "How many single bonds separate the two double bonds in hexa-1,5-diene, and are they conjugated?", answer: "Three single bonds; no, they are isolated" },
      ],
      pyqExampleId: "41b835b4-ba05-4440-95d6-687d1170604e",
      traps: [
        {
          title: "A terminal =CH₂ rules out cis and trans",
          body: "A carbon carrying two H atoms (or two identical groups such as two methyls) cannot give a cis-trans pair. Pent-1-ene and 2-methylpropene have none.",
        },
        {
          title: "Check both carbons of the double bond",
          body: "Geometrical isomerism needs two different groups on EACH carbon of the double bond, not just on one of them.",
        },
        {
          title: "Conjugated means alternate",
          body: "Only a 1,3-arrangement (one single bond between the double bonds) is conjugated. A 1,4-diene or 1,5-diene has isolated double bonds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchhc-markovnikov",
      name: "Adding HX: Markovnikov's rule and the peroxide effect",
      intuition:
        "When HBr adds to an unsymmetrical alkene, H⁺ adds first and leaves a carbocation on the other carbon. The more stable carbocation wins (secondary over primary), so Br ends up on the carbon that had fewer hydrogens. Add a peroxide and the reaction changes route: a bromine free radical adds first, again making the more stable (secondary) radical, which puts Br on the end carbon. The rule is the same in both cases (the more stable intermediate wins); only the first species to add changes.",
      definition:
        "- **Markovnikov's rule**: the negative part of the adding molecule goes to the double-bond carbon carrying **fewer hydrogen atoms**. Propene and HBr give 2-bromopropane.\n" +
        "- It works through the more stable carbocation: secondary is more stable than primary.\n" +
        "- **Peroxide effect (Kharash effect)**: with a peroxide such as benzoyl peroxide, HBr adds **against** the rule (anti-Markovnikov) by a free radical path. Propene gives 1-bromopropane.\n" +
        "- The peroxide effect is seen **only with HBr**, not with HCl or HI.\n" +
        "- Order of reactivity of the halogen acids: HI > HBr > HCl.\n" +
        "- Water (with a few drops of conc. \\(\\text{H}_2\\text{SO}_4\\)) and \\(\\text{H}_2\\text{SO}_4\\) also add by Markovnikov's rule: propene and water give propan-2-ol.\n" +
        "- A symmetrical alkene (but-2-ene) gives one product either way.",
      authoredExample: {
        prompt: "2-Methylpropene, \\(\\text{(CH}_3\\text{)}_2\\text{C=CH}_2\\), reacts (a) with HBr and (b) with water containing a few drops of conc. \\(\\text{H}_2\\text{SO}_4\\). Name the major product each time.",
        steps: [
          "In both, \\(\\text{H}^+\\) adds first, to the \\(\\text{CH}_2\\) end, which has more H atoms.",
          "That leaves a tertiary carbocation on C2, more stable than the primary one the other way round would give.",
          "(a) Br⁻ joins C2: \\(\\text{(CH}_3\\text{)}_3\\text{C-Br}\\).",
          "(b) Water joins C2 and loses \\(\\text{H}^+\\): \\(\\text{(CH}_3\\text{)}_3\\text{C-OH}\\).",
        ],
        answer: "(a) 2-Bromo-2-methylpropane; (b) 2-methylpropan-2-ol",
      },
      selfCheckExample: {
        prompt: "Propene reacts with HCl in the presence of benzoyl peroxide. What is the major product?",
        steps: [
          "The peroxide effect works only with HBr.",
          "So HCl adds by Markovnikov's rule: Cl goes to C2, the carbon with fewer H atoms.",
        ],
        answer: "2-Chloropropane",
      },
      practiceSet: [
        { prompt: "What does but-2-ene give with HBr, and why is there only one product?", answer: "2-Bromobutane; the alkene is symmetrical, so both ends give the same product" },
        { prompt: "Arrange HCl, HBr and HI in order of reactivity towards alkenes.", answer: "HI > HBr > HCl" },
        { prompt: "What alcohol forms when propene adds water in the presence of a few drops of conc. sulphuric acid?", answer: "Propan-2-ol" },
        { prompt: "Which is more stable, a primary or a secondary carbocation?", answer: "Secondary" },
      ],
      pyqExampleId: "09dfb1f3-b69c-4ea8-9579-8be39b0633b6",
      traps: [
        {
          title: "No peroxide effect with HCl or HI",
          body: "With a peroxide, HBr adds anti-Markovnikov. HCl and HI still add by Markovnikov's rule.",
        },
        {
          title: "The peroxide does not end up in the product",
          body: "Benzoyl peroxide only starts the free radical chain. The product is the alkyl bromide, never an ester of benzoic acid.",
        },
        {
          title: "Markovnikov puts H where the H already is",
          body: "The hydrogen goes to the double-bond carbon that already has more hydrogens, and the halogen to the one with fewer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchhc-alkene-oxidation",
      name: "Tests for a double bond, oxidation and ozonolysis",
      intuition:
        "Two colour tests find a double bond: bromine loses its reddish orange colour and cold dilute KMnO₄ loses its pink colour, because each adds across the C=C. Stronger reagents cut the double bond right through. Picture the C=C snipped in two and each carbon given a C=O: that one picture gives the products of ozonolysis, and with acidic KMnO₄ any aldehyde half goes on to an acid.",
      definition:
        "- **Bromine in \\(\\text{CCl}_4\\)**: adds to give a vicinal dibromide; the reddish orange colour disappears. A saturated compound such as cyclohexane gives no change.\n" +
        "- **Baeyer's reagent** is cold, dilute, aqueous \\(\\text{KMnO}_4\\). It gives a vicinal glycol (diol), and its pink colour disappears.\n" +
        "- **Acidic \\(\\text{KMnO}_4\\) or acidic \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\)** cuts the C=C and gives ketones and/or acids: a =CHR end becomes RCOOH, a =CR₂ end becomes R₂C=O, a =CH₂ end becomes \\(\\text{CO}_2\\) and water.\n" +
        "- **Ozonolysis**: \\(\\text{O}_3\\) forms an ozonide, which Zn and water break into aldehydes and/or ketones. A =CH₂ end gives HCHO, =CHR gives RCHO, =CR₂ gives R₂C=O.\n" +
        "- **Working back**: join the two carbonyl carbons of the products with a double bond and drop the oxygens.",
      table: {
        columns: ["Reagent", "What it does", "Example"],
        rows: [
          { cells: ["\\(\\text{Br}_2\\) in \\(\\text{CCl}_4\\)", "Adds across C=C, orange colour lost", "Ethene gives 1,2-dibromoethane"], noteAmber: "NEET 2025: cyclohexane, being saturated, was the one that did not decolourise bromine. Phenol and aniline do, by substituting the ring (NCERT Class 12)." },
          { cells: ["Baeyer's reagent (cold, dilute, aqueous \\(\\text{KMnO}_4\\))", "Gives a vicinal diol, pink colour lost", "Ethene gives ethane-1,2-diol"], noteAmber: "Re-NEET 2024 asked what Baeyer's reagent is." },
          { cells: ["Acidic \\(\\text{KMnO}_4\\)", "Cuts C=C into ketones and/or acids", "But-2-ene gives two molecules of ethanoic acid; 2-methylpropene gives propanone, \\(\\text{CO}_2\\) and water"], noteAmber: "NEET 2024: an alkene with a cyclohexyl group on each double-bond carbon gave cyclohexanecarboxylic acid." },
          { cells: ["\\(\\text{O}_3\\), then Zn and \\(\\text{H}_2\\text{O}\\)", "Cuts C=C into aldehydes and/or ketones", "Propene gives ethanal and methanal; 2-methylpropene gives propanone and methanal"] },
        ],
      },
      pyqExampleId: "8a176953-8d40-4d88-9f3d-e520dd774605",
      selfCheckExample: {
        prompt: "What does 2-methylbut-2-ene, \\(\\text{(CH}_3\\text{)}_2\\text{C=CH-CH}_3\\), give with acidic \\(\\text{KMnO}_4\\)?",
        steps: [
          "Cut the C=C. The left carbon carries two methyl groups (=CR₂), so it becomes a ketone: propanone.",
          "The right carbon carries H and \\(\\text{CH}_3\\) (=CHR). It would be ethanal, but acidic \\(\\text{KMnO}_4\\) takes it on to an acid: ethanoic acid.",
        ],
        answer: "Propanone and ethanoic acid",
      },
      practiceSet: [
        { prompt: "What is seen when Baeyer's reagent is shaken with ethene, and what is the organic product?", answer: "The pink colour disappears; ethane-1,2-diol forms" },
        { prompt: "Why does cyclohexane not decolourise bromine in \\(\\text{CCl}_4\\)?", answer: "It is saturated: it has no double bond for bromine to add to" },
        { prompt: "What does but-2-ene give with acidic \\(\\text{KMnO}_4\\)?", answer: "Two molecules of ethanoic acid" },
        { prompt: "What is the product when bromine in \\(\\text{CCl}_4\\) adds to propene?", answer: "1,2-Dibromopropane" },
      ],
      traps: [
        {
          title: "Baeyer's reagent is cold and dilute",
          body: "Cold, dilute, aqueous \\(\\text{KMnO}_4\\) adds two OH groups and keeps the carbon chain. Acidic \\(\\text{KMnO}_4\\) cuts the double bond instead.",
        },
        {
          title: "Ozonolysis stops at the aldehyde",
          body: "With Zn and water, a =CHR end gives the aldehyde RCHO. Acidic \\(\\text{KMnO}_4\\) takes the same end on to the acid RCOOH.",
        },
        {
          title: "A =CH₂ end means methanal",
          body: "When ozonolysis gives formaldehyde, the alkene had a terminal =CH₂ group: the double bond was at the end of the chain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchhc-alkynes",
      name: "Alkynes: acidic hydrogen, adding water and reduction",
      intuition:
        "In a triple bond each carbon is \\(sp\\): half s character, so it holds electrons close and is more electronegative than an \\(sp^2\\) or \\(sp^3\\) carbon. A hydrogen on such a carbon can leave as H⁺, which is why ethyne reacts with sodium and ethene does not. The triple bond also adds things like an alkene does, and it can be stopped halfway at an alkene: one reagent gives the cis alkene, another the trans.",
      definition:
        "- Open-chain alkynes are \\(\\text{C}_n\\text{H}_{2n-2}\\). The C≡C bond is one σ and two π bonds, 120 pm long; ethyne is linear (180°).\n" +
        "- **Preparation**: calcium carbide and water give ethyne, \\(\\text{CaC}_2 + 2\\text{H}_2\\text{O} \\rightarrow \\text{C}_2\\text{H}_2 + \\text{Ca(OH)}_2\\). A vicinal dihalide with alcoholic KOH and then \\(\\text{NaNH}_2\\) also gives an alkyne.\n" +
        "- **Acidic character**: a hydrogen on a triple-bonded carbon is acidic. Ethyne with sodium gives sodium ethynide and hydrogen. Acidity: ethyne > ethene > ethane. An internal alkyne (but-2-yne) has no such hydrogen.\n" +
        "- **Water** adds with \\(\\text{HgSO}_4\\) and dilute \\(\\text{H}_2\\text{SO}_4\\) at 333 K: ethyne gives ethanal, propyne gives propanone.\n" +
        "- **Reduction to an alkene**: Lindlar's catalyst (partly deactivated palladium) gives the **cis** alkene; sodium in liquid ammonia gives the **trans** alkene.\n" +
        "- Ethyne passed through a red hot iron tube at 873 K forms benzene.",
      authoredExample: {
        prompt: "Propyne is passed into water containing \\(\\text{HgSO}_4\\) and dilute \\(\\text{H}_2\\text{SO}_4\\) at 333 K. Name the product.",
        steps: [
          "Water adds by Markovnikov's rule: H to the end carbon, OH to C2, giving \\(\\text{CH}_3\\text{-C(OH)=CH}_2\\).",
          "An OH on a double-bond carbon is unstable and rearranges to C=O.",
          "The carbonyl sits on C2 of a three-carbon chain: \\(\\text{CH}_3\\text{COCH}_3\\).",
        ],
        answer: "Propanone",
      },
      selfCheckExample: {
        prompt: "Which of ethyne, but-1-yne and but-2-yne does NOT give hydrogen gas with sodium metal?",
        steps: [
          "Sodium needs a hydrogen on a triple-bonded carbon.",
          "Ethyne and but-1-yne have one (HC≡C-). In but-2-yne both triple-bonded carbons carry \\(\\text{CH}_3\\) groups.",
        ],
        answer: "But-2-yne",
      },
      practiceSet: [
        { prompt: "Which gas forms when calcium carbide reacts with water?", answer: "Ethyne (acetylene)" },
        { prompt: "Arrange ethane, ethene and ethyne in order of decreasing acidic character.", answer: "Ethyne > ethene > ethane" },
        { prompt: "What is the H-C-C bond angle in ethyne?", answer: "180° (the molecule is linear)" },
        { prompt: "What does ethyne give with water in the presence of \\(\\text{HgSO}_4\\) and dilute \\(\\text{H}_2\\text{SO}_4\\) at 333 K?", answer: "Ethanal" },
      ],
      pyqExampleId: "5d4c14d3-7795-4cc9-ad7c-14e09dd39f07",
      traps: [
        {
          title: "Lindlar gives cis, sodium in ammonia gives trans",
          body: "Lindlar's catalyst adds both H atoms from the same side: a cis alkene. Sodium in liquid ammonia gives the trans alkene. The two products are geometrical isomers, not enantiomers.",
        },
        {
          title: "Only a terminal alkyne is acidic",
          body: "But-2-yne has no H on a triple-bonded carbon, so it does not react with sodium. Ethyne and propyne do.",
        },
        {
          title: "Ethyne gives ethanal, not ethanol",
          body: "Adding water to ethyne gives an aldehyde, ethanal. Every other open-chain alkyne gives a ketone.",
        },
      ],
    },
  ],
};
