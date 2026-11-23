import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Substitution Reactions of Alkyl Halides",
  title: "Substitution, Elimination and the Reactions of Haloarenes",
  oneLineDefinition:
    "What a nucleophile does to an alkyl halide, the SN2 and SN1 mechanisms and what decides between them, dehydrohalogenation with alcoholic KOH, and why haloarenes resist substitution but take electrophiles at the ortho and para positions.",
  whyItMatters:
    "43 questions, the biggest page of the chapter. Eighteen were set in board papers from 2014 to 2026: distinguish SN1 and SN2 (2014), write the salient features of SN1 (2024) and SN2 (2025), explain the mechanism of alkaline hydrolysis of bromomethane (2026), write the action of reagents on ethyl bromide (2019, 2023, 2024, 2026), the reagent for a nitroalkane (2025), conversions (2022, 2026), dehydrohalogenation of 2-chlorobutane (2023), the sulphonation of chlorobenzene (2023) and its nitration and sulphonation (2026). The textbook adds conversions, reasons and reactivity orders.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscchd-sn-reagents",
      name: "Nucleophilic substitution: reagents and products",
      intuition:
        "The carbon holding the halogen is slightly positive, so anything with a spare electron pair (a nucleophile) attacks it and pushes the halogen out as a halide ion. Change the nucleophile and you change the product: one alkyl halide can become an alcohol, an ether, an ester, an amine, a nitrile or a nitro compound. That is why alkyl halides are the starting point of so many conversions.",
      definition:
        "- The C-X carbon is an **electrophilic centre**. A nucleophile replaces the halogen, which leaves as \\(\\text{X}^-\\) (the **leaving group**): \\(\\text{Nu}^- + \\text{R-X} \\longrightarrow \\text{R-Nu} + \\text{X}^-\\).\n" +
        "- Reactivity in SN reactions: \\(3^\\circ > 2^\\circ > 1^\\circ\\) and \\(\\text{R-I} > \\text{R-Br} > \\text{R-Cl}\\).\n" +
        "- **Ambident nucleophiles** can attack through two atoms. KCN is ionic: the C-C bond being stronger than the C-N bond, attack is through **carbon**, giving a **nitrile**. AgCN is mainly covalent, so nitrogen is free to donate its pair and the product is an **isocyanide**. In the same way \\(\\text{KNO}_2\\) gives an **alkyl nitrite** and \\(\\text{AgNO}_2\\) a **nitroalkane**.\n" +
        "- A nitrile carries one carbon more than the alkyl halide: ethyl bromide gives ethyl cyanide, which is propanenitrile.\n" +
        "- **Laboratory test:** warm the haloalkane with aqueous NaOH, acidify with dilute \\(\\text{HNO}_3\\) and add \\(\\text{AgNO}_3\\): a precipitate of silver halide shows a halogen.\n" +
        "- In a conversion, first make the alkyl halide (from the alcohol with \\(\\text{PBr}_3\\) or \\(\\text{SOCl}_2\\), or from the alkene with HBr), then let the right nucleophile replace the halogen.",
      table: {
        columns: ["Reagent", "Product from R-X", "From ethyl bromide"],
        rows: [
          { cells: ["NaOH (aq)", "Alcohol, R-OH", "Ethanol"] },
          { cells: ["Sodium alkoxide, NaOR'", "Ether, R-O-R'", "With \\(\\text{CH}_3\\text{ONa}\\): ethyl methyl ether"] },
          {
            cells: ["Silver carboxylate, R'COOAg", "Ester, R'COOR", "With silver acetate: ethyl acetate, \\(\\text{CH}_3\\text{COOC}_2\\text{H}_5\\)"],
            pyqExampleId: "6682bfaf-04e9-4b94-9ae3-fb2399d06314",
            noteAmber: "Board 2023 asked for the reaction of ethyl bromide heated with silver acetate.",
          },
          { cells: ["\\(\\text{NH}_3\\) (alc.), under pressure", "Primary amine, \\(\\text{R-NH}_2\\)", "Ethylamine"] },
          {
            cells: ["KCN (alc.)", "Nitrile (alkyl cyanide), R-CN", "Ethyl cyanide (propanenitrile), \\(\\text{C}_2\\text{H}_5\\text{CN}\\)"],
            pyqExampleId: "17bbabd8-080c-48de-949b-0e44db3d2a73",
            noteAmber: "Board 2024 asked how ethyl cyanide is prepared from ethyl bromide.",
          },
          {
            cells: ["AgCN (alc.)", "Isocyanide, R-NC", "Ethyl isocyanide, \\(\\text{C}_2\\text{H}_5\\text{NC}\\)"],
            pyqExampleId: "240dc9a1-d652-4081-a7a4-b143246e6c61",
            noteAmber: "Board 2024 asked you to complete the reaction of chloroethane with AgCN.",
          },
          { cells: ["\\(\\text{KNO}_2\\)", "Alkyl nitrite, R-O-N=O", "Ethyl nitrite"] },
          { cells: ["\\(\\text{AgNO}_2\\)", "Nitroalkane, \\(\\text{R-NO}_2\\)", "Nitroethane, \\(\\text{C}_2\\text{H}_5\\text{NO}_2\\)"] },
        ],
        caption: "Table 10.3 of the textbook, with ethyl bromide as the alkyl halide in the last column.",
      },
      selfCheckExample: {
        prompt: "Convert methanol into methyl isocyanide. Write both steps.",
        steps: [
          "Replace OH by Br with phosphorus tribromide: \\(3\\text{CH}_3\\text{OH} + \\text{PBr}_3 \\longrightarrow 3\\text{CH}_3\\text{Br} + \\text{H}_3\\text{PO}_3\\).",
          "Heat with alcoholic AgCN, where nitrogen attacks: \\(\\text{CH}_3\\text{Br} + \\text{AgCN} \\longrightarrow \\text{CH}_3\\text{NC} + \\text{AgBr}\\downarrow\\).",
        ],
        answer: "Methanol to bromomethane (PBr₃), then to methyl isocyanide (AgCN)",
      },
      practiceSet: [
        { prompt: "Name the product of 1-bromopropane heated with alcoholic KCN.", answer: "Butanenitrile, CH₃CH₂CH₂CN" },
        { prompt: "Name the product of methyl iodide with silver acetate.", answer: "Methyl acetate, CH₃COOCH₃" },
        { prompt: "What is an ambident nucleophile? Give one example.", answer: "A nucleophile that can attack through more than one atom, such as the cyanide ion or the nitrite ion" },
        { prompt: "Which halide reacts fastest in SN reactions: R-Cl, R-Br or R-I?", answer: "R-I" },
      ],
      pyqExampleId: "6664fba5-b18c-4490-b48d-baf58fb9f9e5",
      traps: [
        {
          title: "Potassium salt or silver salt",
          body: "KCN gives the nitrile and AgCN the isocyanide; \\(\\text{KNO}_2\\) gives the alkyl nitrite and \\(\\text{AgNO}_2\\) the nitroalkane. Name the reagent's metal before you write the product.",
        },
        {
          title: "Counting carbons in a nitrile",
          body: "The cyanide carbon becomes part of the chain. Ethyl cyanide has three carbons and is propanenitrile; to make a nitrile of n carbons, start from a halide of n minus 1 carbons.",
        },
        {
          title: "An alcohol does not react with KCN",
          body: "The OH group is not a leaving group. In a conversion from an alcohol, first turn it into the alkyl halide, then add the nucleophile.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-sn-mechanisms",
      name: "The SN2 and SN1 mechanisms",
      intuition:
        "There are two ways for the nucleophile to get in. In SN2 it pushes in from the back while the halogen is leaving, all in one step, like an umbrella turning inside out. In SN1 the halide first breaks apart on its own into a flat carbocation, slowly, and then the nucleophile joins it quickly from either side. A crowded tertiary carbon blocks the back door, so it uses SN1; an open primary carbon uses SN2.",
      definition:
        "**SN2: bromomethane with hydroxide (substitution nucleophilic bimolecular)**\n" +
        "- Second order kinetics: rate \\(= k[\\text{CH}_3\\text{Br}][\\text{OH}^-]\\). Both reactants are in the one, slow step.\n" +
        "- i. Single step: bond breaking and bond forming happen at the same time.\n" +
        "- ii. Backside attack: the nucleophile attacks from the side opposite the leaving group, to avoid steric and electrostatic repulsion.\n" +
        "- iii. In the transition state the nucleophile and the leaving group are joined to carbon by partial bonds and carry partial negative charges.\n" +
        "- iv. The T.S. has a **pentacoordinate carbon**: three sigma bonds in one plane at 120°, and two partial bonds on a line perpendicular to that plane.\n" +
        "- v. At a chiral carbon the product has the opposite configuration: **inversion**, like flipping an umbrella (**Walden inversion**).\n" +
        "**SN1: tert-butyl bromide with hydroxide (substitution nucleophilic unimolecular)**\n" +
        "- First order kinetics: rate \\(= k[(\\text{CH}_3)_3\\text{CBr}]\\). The nucleophile does not affect the rate.\n" +
        "- i. Two steps. ii. Slow, reversible heterolysis of C-X gives a **planar carbocation**. iii. The nucleophile attacks it in a fast second step.\n" +
        "- iv. At a chiral carbon the product is nearly **racemic**: the planar carbocation is attacked from either side.\n" +
        "**What decides the mechanism**\n" +
        "- Substrate: the SN2 T.S. is crowded, so SN2 is favoured in primary and least in tertiary halides. The carbocation is planar and stabilised by the +I effect and hyperconjugation of alkyl groups, so SN1 is favoured in tertiary halides. Secondary halides go either way.\n" +
        "- Allylic and benzylic carbocations are resonance stabilised, so these halides react fast by SN1.\n" +
        "- A stronger nucleophile favours SN2; the SN1 rate does not depend on the nucleophile.\n" +
        "- Polar protic solvents favour SN1; aprotic solvents or solvents of low polarity favour SN2.",
      formula: {
        label: "Rate laws",
        latex: "\\text{S}_\\text{N}2:\\ \\text{rate} = k[\\text{CH}_3\\text{Br}][\\text{OH}^-] \\qquad \\text{S}_\\text{N}1:\\ \\text{rate} = k[(\\text{CH}_3)_3\\text{CBr}]",
      },
      authoredExample: {
        prompt: "Explain the SN1 mechanism of the alkaline hydrolysis of tert-butyl bromide.",
        steps: [
          "Overall: \\((\\text{CH}_3)_3\\text{C-Br} + \\text{OH}^- \\longrightarrow (\\text{CH}_3)_3\\text{C-OH} + \\text{Br}^-\\). Rate \\(= k[(\\text{CH}_3)_3\\text{CBr}]\\): first order, so only the substrate is in the slow step.",
          "Step I (slow, reversible): the C-Br bond breaks heterolytically. \\((\\text{CH}_3)_3\\text{C-Br} \\rightleftharpoons (\\text{CH}_3)_3\\text{C}^+ + \\text{Br}^-\\). The carbocation is planar.",
          "Step II (fast): hydroxide uses its electron pair to bond to the carbocation. \\((\\text{CH}_3)_3\\text{C}^+ + \\text{OH}^- \\longrightarrow (\\text{CH}_3)_3\\text{C-OH}\\).",
          "The tertiary carbocation is stabilised by the +I effect and hyperconjugation of the three methyl groups, which is why this halide takes the SN1 path.",
        ],
        answer: "Two steps: slow ionisation to a planar tert-butyl carbocation, then fast attack by OH⁻",
      },
      selfCheckExample: {
        prompt: "In a substitution, doubling the hydroxide concentration (substrate fixed) doubles the rate. Which mechanism is it, and why?",
        steps: [
          "The rate depends on the nucleophile's concentration, so the nucleophile is in the slow step.",
          "That is second order kinetics, rate \\(= k[\\text{RX}][\\text{OH}^-]\\): the SN2 mechanism.",
        ],
        answer: "SN2, because the rate depends on both the substrate and the nucleophile",
      },
      practiceSet: [
        { prompt: "Which mechanism proceeds with inversion of configuration?", answer: "SN2 (Walden inversion)" },
        { prompt: "Which kind of solvent speeds up an SN1 reaction?", answer: "A polar protic solvent" },
        { prompt: "Why do primary allylic and benzylic halides react faster by SN1 than other primary halides?", answer: "Their carbocations are resonance stabilised" },
        { prompt: "Which reacts faster by SN2: \\(\\text{CH}_3\\text{CH}_2\\text{Br}\\) or \\((\\text{CH}_3)_3\\text{CBr}\\)?", answer: "CH₃CH₂Br, the primary halide, whose transition state is less crowded" },
      ],
      pyqExampleId: "3bbbb4f2-d945-4ed5-ade5-d1e8a01f48ac",
      traps: [
        {
          title: "The 1 and 2 are molecularity, not steps",
          body: "SN1 is unimolecular and has TWO steps; SN2 is bimolecular and has ONE step. Saying 'SN1 is a one-step reaction' loses the mark.",
        },
        {
          title: "Racemisation and inversion swapped",
          body: "The planar carbocation of SN1 gives a nearly racemic product. The backside attack of SN2 gives inversion. Swapping them is the commonest slip in a 'distinguish' answer.",
        },
        {
          title: "A distinguish point needs both sides",
          body: "Write every point for both mechanisms: number of steps, intermediate or transition state, rate law, stereochemistry, order of reactivity of halides. One-sided points do not score.",
        },
        {
          title: "Draw the transition state",
          body: "In the SN2 mechanism show \\([\\text{HO}\\cdots\\text{CH}_3\\cdots\\text{Br}]\\) with partial bonds and partial negative charges, the three hydrogens in one plane. The structure carries marks of its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-elimination",
      name: "Dehydrohalogenation and Saytzeff's rule",
      intuition:
        "With alcoholic KOH the hydroxide acts as a base, not a nucleophile. It pulls off a hydrogen from the carbon next door while the halogen leaves, and a double bond forms. If there are two different neighbours to take a hydrogen from, the alkene with more alkyl groups on the double bond wins, because it is the more stable one.",
      definition:
        "- The carbon carrying the halogen is the **α-carbon**; a carbon joined to it is a **β-carbon**, and its hydrogens are **β-hydrogens**.\n" +
        "- An alkyl halide with at least one β-hydrogen, boiled with **alcoholic KOH**, loses H from the β-carbon and X from the α-carbon to give an alkene: **β-elimination** (1,2-elimination), also called **dehydrohalogenation**.\n" +
        "- **Saytzeff's rule:** the preferred product is the alkene with the **greater number of alkyl groups** on the doubly bonded carbons. Stability: \\(\\text{R}_2\\text{C=CR}_2 > \\text{R}_2\\text{C=CHR} > \\text{R}_2\\text{C=CH}_2,\\ \\text{RCH=CHR} > \\text{RCH=CH}_2\\).\n" +
        "- **Substitution or elimination?** Tertiary halides prefer elimination, primary halides substitution. A bulkier, stronger base favours elimination. A less polar solvent and high temperature favour elimination; a polar solvent and low temperature favour substitution.",
      formula: {
        label: "Dehydrohalogenation",
        latex: "\\text{R-CH}_2\\text{-CH}_2\\text{-X} + \\text{KOH} \\xrightarrow{\\text{alc.},\\ \\Delta} \\text{R-CH=CH}_2 + \\text{KX} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the products of 2-bromo-2-methylbutane boiled with alcoholic KOH and name the major one.",
        steps: [
          "\\((\\text{CH}_3)_2\\text{CBr-CH}_2\\text{CH}_3\\): the α-carbon has β-hydrogens on two kinds of carbon, the methyl groups and the \\(\\text{CH}_2\\).",
          "Losing H from the \\(\\text{CH}_2\\): \\((\\text{CH}_3)_2\\text{C=CH-CH}_3\\), 2-methylbut-2-ene, with three alkyl groups on the double bond.",
          "Losing H from a methyl group: \\(\\text{CH}_2\\text{=C(CH}_3)\\text{-CH}_2\\text{CH}_3\\), 2-methylbut-1-ene, with two alkyl groups.",
          "By Saytzeff's rule the more substituted alkene is preferred.",
        ],
        answer: "2-Methylbut-2-ene (major) and 2-methylbut-1-ene (minor)",
      },
      selfCheckExample: {
        prompt: "What is formed when 2-bromopropane is boiled with alcoholic KOH? Why is there only one alkene?",
        steps: [
          "\\(\\text{CH}_3\\text{-CHBr-CH}_3 + \\text{KOH} \\xrightarrow{\\text{alc.}} \\text{CH}_3\\text{-CH=CH}_2 + \\text{KBr} + \\text{H}_2\\text{O}\\)",
          "Both β-carbons are equivalent methyl groups, so only one alkene can form.",
        ],
        answer: "Propene only",
      },
      practiceSet: [
        { prompt: "Which reagent gives elimination with an alkyl halide: aqueous KOH or alcoholic KOH?", answer: "Alcoholic KOH" },
        { prompt: "Arrange in increasing stability: (CH₃)₂C=C(CH₃)₂, CH₃CH=CH₂, (CH₃)₂C=CH₂.", answer: "CH₃CH=CH₂ < (CH₃)₂C=CH₂ < (CH₃)₂C=C(CH₃)₂" },
        { prompt: "Does a tertiary alkyl halide prefer substitution or elimination with a strong base?", answer: "Elimination" },
        { prompt: "Why is dehydrohalogenation called β-elimination?", answer: "The hydrogen removed is on the β-carbon, next to the carbon carrying the halogen" },
      ],
      pyqExampleId: "13b81c40-d27b-489a-8ec7-7c4ec92b2a6b",
      traps: [
        {
          title: "Aqueous or alcoholic",
          body: "Aqueous KOH substitutes and gives an alcohol; alcoholic KOH eliminates and gives an alkene. Write 'alc.' over the arrow, or the examiner reads it as substitution.",
        },
        {
          title: "Saytzeff counts alkyl groups, not hydrogens",
          body: "The major alkene is the one with MORE alkyl groups on the double bond carbons. Choosing the alkene with more hydrogens on the double bond gives the minor product.",
        },
        {
          title: "Name both alkenes when two can form",
          body: "If the halide has two different kinds of β-hydrogen, write both alkenes and say which is major. Writing only one loses the explanation mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscchd-haloarenes",
      name: "Reactions of haloarenes",
      intuition:
        "The halogen of a haloarene is held by a short, strong bond with partial double bond character, so nucleophiles can hardly remove it unless nitro groups at the ortho or para position pull electrons out of the ring. Electrophiles do attack the ring, but slowly, and they go to the ortho and para positions, mostly para.",
      definition:
        "- **Low reactivity in SN:** (i) resonance gives the C-X bond partial double bond character (C-Cl 169 pm in chlorobenzene against 178 pm in alkyl chloride), so it is hard to break; (ii) the carbon is sp². The phenyl cation from self-ionisation is not resonance stabilised, which rules out SN1; backside attack is blocked by the ring, which rules out SN2.\n" +
        "- An **electron withdrawing group at the ortho and/or para position** greatly increases reactivity; the more such groups, the greater the reactivity. A group at the meta position has practically no effect.\n" +
        "- **Electrophilic substitution** is slower than in benzene: the -I effect of chlorine is stronger than its +R effect, so chlorine **deactivates** the ring but is **ortho, para directing**. Because of steric hindrance at the ortho position, the **para** product usually predominates.",
      table: {
        columns: ["Reaction (chlorobenzene unless named)", "Reagents and conditions", "Products"],
        rows: [
          { cells: ["Hydrolysis", "NaOH, 623 K, 300 atm, then \\(\\text{H}_3\\text{O}^+\\)", "Phenol"] },
          { cells: ["Hydrolysis of p-nitrochlorobenzene", "NaOH, 433 K, then \\(\\text{H}_3\\text{O}^+\\)", "p-Nitrophenol"] },
          { cells: ["Hydrolysis of 2,4-dinitrochlorobenzene", "aq. \\(\\text{Na}_2\\text{CO}_3\\), 403 K", "2,4-Dinitrophenol"] },
          { cells: ["Hydrolysis of 2,4,6-trinitrochlorobenzene", "Warm water", "2,4,6-Trinitrophenol"] },
          { cells: ["Halogenation", "\\(\\text{Cl}_2\\), anhydrous \\(\\text{FeCl}_3\\)", "1,4-Dichlorobenzene (major), 1,2-dichlorobenzene"] },
          { cells: ["Nitration", "conc. \\(\\text{HNO}_3\\) with conc. \\(\\text{H}_2\\text{SO}_4\\), heat", "1-Chloro-4-nitrobenzene (major), 1-chloro-2-nitrobenzene"] },
          {
            cells: ["Sulphonation", "Fuming \\(\\text{H}_2\\text{SO}_4\\), heat", "4-Chlorobenzene sulphonic acid (major), 2-chlorobenzene sulphonic acid"],
            pyqExampleId: "440399d4-4c0f-452f-bd16-1abfbd62e509",
            noteAmber: "Board 2023 asked for the reaction of chlorobenzene heated with fuming sulphuric acid.",
          },
          { cells: ["Friedel-Crafts", "\\(\\text{CH}_3\\text{Cl}\\) or \\(\\text{CH}_3\\text{COCl}\\), anhydrous \\(\\text{AlCl}_3\\)", "2- and 4-chlorotoluene, or 2- and 4-chloroacetophenone"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is chlorine ortho, para directing yet deactivating?", answer: "Its -I effect is stronger than its +R effect: the ring is deactivated, but resonance raises the electron density at ortho and para" },
        { prompt: "What effect does a nitro group at the meta position have on the hydrolysis of chlorobenzene?", answer: "Practically none" },
        { prompt: "Why is the SN1 route closed to haloarenes?", answer: "The phenyl cation formed by self-ionisation is not stabilised by resonance" },
        { prompt: "Write the major product of the nitration of chlorobenzene.", answer: "1-Chloro-4-nitrobenzene" },
      ],
      pyqExampleId: "440399d4-4c0f-452f-bd16-1abfbd62e509",
      traps: [
        {
          title: "Ortho and para both, para major",
          body: "An electrophilic substitution on chlorobenzene gives both the ortho and the para product. Write both, and say the para one is major because the ortho position is hindered.",
        },
        {
          title: "Only ortho and para nitro groups help",
          body: "Nitro groups at ortho and para make the halogen easier to replace and lower the temperature needed (623 K for chlorobenzene, 433 K with one para nitro group). A meta nitro group does nothing.",
        },
      ],
    },
  ],
};
