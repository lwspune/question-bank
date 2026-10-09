import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Organic Reactions",
  title: "Organic Reactions: Types, Oxidation, Esters and Combustion",
  oneLineDefinition:
    "Most organic reactions are one of a few types (substitution, addition, elimination, condensation, hydrolysis, oxidation), and the type can be read from what goes in and what comes out.",
  whyItMatters:
    "The Cambridge papers asked to classify the steps of a reaction scheme, to name the products of oxidising an alcohol or reacting an acid, and in 2022 about making biodiesel from a fat. The ministry papers since 2023 have not asked a reaction question yet, so expect the simpler named facts if one appears.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-org-reaction-types",
      name: "The main types of organic reaction",
      intuition:
        "Compare the reactants with the products. If one atom has swapped for another, it is substitution. If two molecules became one and a double bond disappeared, it is addition. If a double bond appeared and a small molecule left, it is elimination. If two molecules joined and water came out, it is condensation.",
      definition:
        "- Alkanes undergo **substitution** with halogens in UV light. Haloalkanes undergo substitution with nucleophiles such as \\(\\mathrm{OH^-}\\) or \\(\\mathrm{CN^-}\\).\n" +
        "- Alkenes undergo **addition**: \\(\\mathrm{H_2}\\) (nickel catalyst) gives an alkane; \\(\\mathrm{Br_2}\\) gives a dibromoalkane and decolourises orange bromine water (the test for C=C); HBr gives a bromoalkane; steam (acid catalyst) gives an alcohol. With HBr on an unsymmetrical alkene, the H goes mainly to the carbon that already has more H (Markovnikov's rule).\n" +
        "- **Elimination** makes a C=C: an alcohol with hot concentrated \\(\\mathrm{H_2SO_4}\\) loses water (dehydration); a haloalkane with hot KOH in ethanol loses HBr. The same haloalkane with aqueous NaOH gives substitution instead.\n" +
        "- **Oxidation** of carbon: gaining O, losing H, or gaining a halogen (the oxidation number of carbon rises). **Reduction** is the reverse: adding \\(\\mathrm{H_2}\\) to a C=C, or turning a nitrile into an amine.\n" +
        "- Many alkene molecules can add to each other: **addition polymerisation**, e.g. ethene to poly(ethene).",
      table: {
        columns: ["Type", "What happens", "Example", "How to spot it"],
        rows: [
          { cells: ["Substitution", "One atom or group replaces another", "\\(\\mathrm{CH_3CH_2Br + OH^- \\rightarrow CH_3CH_2OH + Br^-}\\)", "Two reactants, two products; no change in multiple bonds"] },
          { cells: ["Addition", "Two molecules join across a C=C or C≡C", "\\(\\mathrm{CH_2{=}CH_2 + Br_2 \\rightarrow CH_2BrCH_2Br}\\)", "One product; a multiple bond is used up"] },
          { cells: ["Elimination", "A small molecule leaves neighbouring carbons, making a C=C", "\\(\\mathrm{CH_3CH_2OH \\rightarrow CH_2{=}CH_2 + H_2O}\\)", "A new C=C appears"] },
          { cells: ["Condensation", "Two molecules join and release a small molecule, usually water", "Acid + alcohol \\(\\rightarrow\\) ester + water", "Water among the products"] },
          { cells: ["Hydrolysis", "Water splits a molecule; the reverse of condensation", "Ester + water \\(\\rightarrow\\) acid + alcohol", "Water among the reactants"] },
          { cells: ["Oxidation", "Carbon gains O or loses H", "Ethanol \\(\\rightarrow\\) ethanal \\(\\rightarrow\\) ethanoic acid", "More O or fewer H in the product"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Ethanol is heated with excess concentrated sulfuric acid, and ethene and water are formed. What type of reaction is this?",
        options: [
          "Addition",
          "Elimination",
          "Substitution",
          "Condensation",
          "Hydrolysis",
        ],
        steps: [
          "One molecule becomes two smaller ones, and a C=C appears: water has been removed from neighbouring carbons. That is elimination (a dehydration).",
          "Addition is the reverse (ethene plus steam gives ethanol). Condensation also releases water, but it joins two molecules into one; here nothing is joined.",
        ],
        answer: "(B) Elimination",
      },
      practiceSet: [
        { prompt: "Ethene reacts with steam to give ethanol. What type of reaction?", answer: "Addition (hydration)", method: "Two molecules become one; the C=C is used up" },
        { prompt: "Chloroethane reacts with aqueous NaOH to give ethanol. What type?", answer: "Substitution", method: "OH replaces Cl" },
        { prompt: "What do you see when an alkene is shaken with bromine water?", answer: "The orange colour disappears", method: "\\(\\mathrm{Br_2}\\) adds across the C=C" },
        { prompt: "Bromoethane reacts with cyanide ions to give \\(\\mathrm{CH_3CH_2CN}\\), which is then turned into \\(\\mathrm{CH_3CH_2CH_2NH_2}\\) with hydrogen. Name the two steps.", answer: "Substitution, then reduction", method: "CN replaces Br; then H is added to the C≡N" },
      ],
      traps: [
        {
          title: "Adding bromine to an alkene is also an oxidation of carbon",
          body: "In ethene each carbon has oxidation number −2; in 1,2-dibromoethane each has −1. The carbons have been oxidised, even though no oxygen is involved. Adding \\(\\mathrm{H_2}\\) to make ethane is the opposite: a reduction.",
        },
        {
          title: "Condensation joins molecules; elimination splits one",
          body: "Both release water. In condensation two molecules join into a bigger one (acid + alcohol to ester). In elimination a single molecule loses water and gains a C=C (ethanol to ethene).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-org-alcohol-oxidation",
      name: "Oxidation of primary, secondary and tertiary alcohols",
      intuition:
        "To oxidise an alcohol, the oxidising agent removes the H from the OH and an H from the carbon carrying it, making a C=O. So the carbon carrying the OH must have at least one H. A primary alcohol has two such H and can be oxidised twice; a tertiary alcohol has none.",
      definition:
        "Classify an alcohol by how many carbons are bonded to the carbon carrying the OH:\n" +
        "- **Primary** (one carbon, or none for methanol): oxidised to an **aldehyde**, then to a **carboxylic acid**. Distil the aldehyde off as it forms to stop at the aldehyde; heat under reflux to go all the way to the acid.\n" +
        "- **Secondary** (two carbons): oxidised to a **ketone**, and no further.\n" +
        "- **Tertiary** (three carbons, no H on that carbon): **not oxidised** under normal conditions.\n" +
        "- The usual oxidising agent is acidified potassium dichromate, \\(\\mathrm{K_2Cr_2O_7/H^+}\\); it turns from **orange to green** when it reacts.\n" +
        "- Reduction reverses these steps: aldehydes give primary alcohols, ketones give secondary alcohols.",
      table: {
        columns: ["Alcohol class", "Example", "Product of oxidation", "Dichromate colour"],
        rows: [
          { cells: ["Primary", "Propan-1-ol \\(\\mathrm{CH_3CH_2CH_2OH}\\)", "Propanal, then propanoic acid", "Orange to green"] },
          { cells: ["Secondary", "Propan-2-ol \\(\\mathrm{CH_3CH(OH)CH_3}\\)", "Propanone (a ketone) only", "Orange to green"] },
          { cells: ["Tertiary", "2-methylpropan-2-ol \\(\\mathrm{(CH_3)_3COH}\\)", "No reaction", "Stays orange"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which alcohol gives a ketone when warmed with acidified potassium dichromate?",
        options: [
          "Butan-1-ol",
          "2-methylpropan-2-ol",
          "2-methylpropan-1-ol",
          "Methanol",
          "Butan-2-ol",
        ],
        steps: [
          "Butan-2-ol, \\(\\mathrm{CH_3CH(OH)CH_2CH_3}\\): the OH carbon is bonded to two carbons, so it is secondary and gives butanone.",
          "Butan-1-ol, 2-methylpropan-1-ol and methanol are primary: they give aldehydes and then acids. 2-methylpropan-2-ol is tertiary and is not oxidised.",
        ],
        answer: "(E) Butan-2-ol",
      },
      practiceSet: [
        { prompt: "What is the final product when propan-1-ol is heated under reflux with excess acidified dichromate?", answer: "Propanoic acid", method: "Primary alcohol, full oxidation" },
        { prompt: "Which compound forms when propan-2-ol is oxidised?", answer: "Propanone", method: "Secondary alcohol gives a ketone" },
        { prompt: "Why is a tertiary alcohol not oxidised by dichromate?", answer: "The carbon carrying the OH has no hydrogen to lose", method: "Oxidation needs an H on that carbon" },
      ],
      traps: [
        {
          title: "A primary alcohol never gives a ketone",
          body: "The carbon carrying the OH in a primary alcohol is at the end of the chain, so its C=O can only be an aldehyde, then an acid. Ketones come only from secondary alcohols, and ketones are not oxidised further.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-esters",
      name: "Esterification, hydrolysis and amide formation",
      intuition:
        "An acid and an alcohol can join by losing a water molecule between them: the OH comes from the acid and the H from the alcohol. Adding water back splits the ester again. The same idea joins an acid to an amine to give an amide, and amino acids to make proteins.",
      definition:
        "- **Esterification**: carboxylic acid + alcohol \\(\\rightleftharpoons\\) ester + water. A condensation reaction, catalysed by concentrated \\(\\mathrm{H_2SO_4}\\), and reversible.\n" +
        "- **Acid hydrolysis** of an ester (water, acid catalyst) is the reverse and is also reversible.\n" +
        "- **Base hydrolysis** (NaOH) goes to completion and gives the **carboxylate salt** and the alcohol. Base hydrolysis of fats gives glycerol and soaps (**saponification**).\n" +
        "- **Transesterification**: an ester reacts with another alcohol and swaps its alcohol part. Biodiesel is made this way: a triglyceride + 3 methanol \\(\\rightarrow\\) 3 methyl esters + glycerol, usually with a base catalyst (an enzyme can be used but is not required).\n" +
        "- **Amides**: an acid (or a more reactive acid derivative) with ammonia or an amine gives an amide; heating the ammonium salt of an acid gives the amide and water. Amides are hydrolysed back to an acid and an amine (or their salts) by hot acid or base.\n" +
        "- Amines are bases: they react with acids to form salts.",
      formula: {
        label: "Esterification",
        latex: "\\mathrm{RCOOH + R'OH \\rightleftharpoons RCOOR' + H_2O}",
        symbols: [
          { symbol: "\\(\\mathrm{RCOOH}\\)", meaning: "the carboxylic acid; gives the -oate half of the name" },
          { symbol: "\\(\\mathrm{R'OH}\\)", meaning: "the alcohol; gives the alkyl half of the name" },
        ],
      },
      authoredExample: {
        prompt:
          "Propanoic acid reacts with methanol in the presence of a little concentrated sulfuric acid. Name the ester, give its formula, and check that mass is conserved.",
        steps: [
          "The acid part is propanoate and the alcohol part is methyl: methyl propanoate.",
          "\\(\\mathrm{CH_3CH_2COOH + CH_3OH \\rightleftharpoons CH_3CH_2COOCH_3 + H_2O}\\). The ester is \\(\\mathrm{C_4H_8O_2}\\).",
          "Molar masses: acid \\(\\mathrm{C_3H_6O_2}\\) 74, methanol 32; ester 88, water 18.",
          "\\(74 + 32 = 106 = 88 + 18\\), so mass is conserved.",
        ],
        answer: "Methyl propanoate, \\(\\mathrm{CH_3CH_2COOCH_3}\\)",
      },
      selfCheckExample: {
        prompt: "Which pair of compounds reacts to form the ester ethyl propanoate?",
        options: [
          "Ethanoic acid and propan-1-ol",
          "Propan-1-ol and ethanol",
          "Propanoic acid and ethanol",
          "Propanal and ethanoic acid",
          "Ethanoic acid and propanoic acid",
        ],
        steps: [
          "The -oate part names the acid: propanoate, from propanoic acid. The alkyl part names the alcohol: ethyl, from ethanol.",
          "Option A gives propyl ethanoate, the reversed ester. Two alcohols or two acids cannot form an ester, and an aldehyde is not an acid.",
        ],
        answer: "(C) Propanoic acid and ethanol",
      },
      practiceSet: [
        { prompt: "Methyl ethanoate is boiled with NaOH solution. What are the products?", answer: "Sodium ethanoate and methanol", method: "Base hydrolysis gives the carboxylate salt" },
        { prompt: "What catalyst is used for esterification?", answer: "Concentrated sulfuric acid", method: "It also absorbs water and helps push the equilibrium" },
        { prompt: "What is the organic product when ammonium ethanoate is heated strongly?", answer: "Ethanamide, \\(\\mathrm{CH_3CONH_2}\\) (with water)", method: "A condensation: the salt loses water" },
        { prompt: "In biodiesel production from an oil, what kind of compound reacts with the triglyceride?", answer: "An alcohol, usually methanol", method: "Transesterification gives methyl esters and glycerol" },
      ],
      traps: [
        {
          title: "Base hydrolysis gives a salt, not the free acid",
          body: "Boiling an ester with NaOH gives the sodium carboxylate and the alcohol, and the reaction goes to completion. The free carboxylic acid appears only after acidifying, or in acid hydrolysis, which stays reversible.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-combustion",
      name: "Combustion of organic compounds",
      intuition:
        "Burning in plenty of oxygen turns every carbon into \\(\\mathrm{CO_2}\\) and every pair of hydrogens into \\(\\mathrm{H_2O}\\). Balance carbon first, then hydrogen, and finally count the oxygen atoms needed on the right. Any oxygen already in the fuel reduces what must come from the air.",
      definition:
        "- **Complete combustion** (plenty of \\(\\mathrm{O_2}\\)): products \\(\\mathrm{CO_2}\\) and \\(\\mathrm{H_2O}\\) only.\n" +
        "- **Incomplete combustion** (limited \\(\\mathrm{O_2}\\)): also carbon monoxide CO (toxic) and carbon (soot).\n" +
        "- Balance in the order C, H, O. A half in front of \\(\\mathrm{O_2}\\) is allowed, or double every coefficient.\n" +
        "- Combustion is exothermic and is an oxidation.",
      formula: {
        label: "Complete combustion of a fuel containing C, H and O",
        latex: "\\mathrm{C_xH_yO_z} + \\left(x + \\frac{y}{4} - \\frac{z}{2}\\right)\\mathrm{O_2} \\rightarrow x\\,\\mathrm{CO_2} + \\frac{y}{2}\\,\\mathrm{H_2O}",
        symbols: [
          { symbol: "\\(x, y, z\\)", meaning: "numbers of C, H and O atoms in the fuel (\\(z = 0\\) for a hydrocarbon)" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the equation for the complete combustion of propane, and find the mass of \\(\\mathrm{CO_2}\\) made by burning 11 g of propane (C = 12, H = 1, O = 16).",
        steps: [
          "\\(x = 3, y = 8\\): oxygen needed \\(3 + 8/4 = 5\\). So \\(\\mathrm{C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O}\\).",
          "\\(M(\\mathrm{C_3H_8}) = 44\\ \\text{g/mol}\\), so 11 g is 0.25 mol.",
          "Each mole of propane gives 3 mol \\(\\mathrm{CO_2}\\): 0.75 mol, and \\(0.75 \\times 44 = 33\\ \\text{g}\\).",
        ],
        answer: "\\(\\mathrm{C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O}\\); 33 g of \\(\\mathrm{CO_2}\\)",
      },
      selfCheckExample: {
        prompt: "How many moles of oxygen are needed to burn 1 mol of ethanol, \\(\\mathrm{C_2H_5OH}\\), completely?",
        options: ["2", "3", "3.5", "6", "7"],
        steps: [
          "Ethanol is \\(\\mathrm{C_2H_6O}\\): \\(x = 2, y = 6, z = 1\\).",
          "Oxygen needed: \\(2 + 6/4 - 1/2 = 3\\). Check: \\(\\mathrm{C_2H_5OH + 3O_2 \\rightarrow 2CO_2 + 3H_2O}\\); O atoms \\(1 + 6 = 4 + 3\\).",
          "Option C forgets the oxygen already in ethanol, as if burning ethane. Options D and E count O atoms instead of \\(\\mathrm{O_2}\\) molecules.",
        ],
        answer: "(B) 3",
      },
      practiceSet: [
        { prompt: "How many moles of \\(\\mathrm{O_2}\\) does 1 mol of butane, \\(\\mathrm{C_4H_{10}}\\), need for complete combustion?", answer: "6.5", method: "\\(4 + 10/4\\)" },
        { prompt: "How many moles of water form when 1 mol of cyclohexane, \\(\\mathrm{C_6H_{12}}\\), burns completely?", answer: "6", method: "\\(y/2 = 12/2\\)" },
        { prompt: "Name two carbon-containing products of incomplete combustion.", answer: "Carbon monoxide and carbon (soot)", method: "Not enough oxygen to make \\(\\mathrm{CO_2}\\)" },
        { prompt: "Balance the complete combustion of methane.", answer: "\\(\\mathrm{CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O}\\)", method: "\\(1 + 4/4 = 2\\)" },
      ],
      traps: [
        {
          title: "Subtract the oxygen the fuel already contains",
          body: "For alcohols, aldehydes and acids, part of the oxygen in the products comes from the fuel itself. Use \\(x + y/4 - z/2\\); leaving out the \\(z/2\\) gives the answer for the hydrocarbon with the same C and H.",
        },
      ],
    },
  ],
};
