import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const ALKANES_HC_NOTE: SubtopicNote = {
  subtopicName: "Alkanes: Preparation, Structure and Conformations",
  title: "Alkanes: Preparation, Structure and Conformations",
  oneLineDefinition:
    "Alkanes (CₙH₂ₙ₊₂) are made by adding hydrogen to a C=C or C≡C, by removing a halogen or a carboxyl group, or by joining two alkyl groups; their carbons are classed 1°, 2°, 3° or 4°, and rotation about each C–C bond gives staggered and eclipsed conformations.",
  whyItMatters:
    "Nineteen PYQs, fourteen of them multiple choice, and seven from 2026. Seven ask which route gives which alkane: Kolbe electrolysis, the Wurtz reaction, soda-lime decarboxylation or a Grignard reagent with water. Eight work from the formula, count primary or secondary carbons, or order the conformations of ethane and butane. Four are about isomerisation, aromatisation and oxidation of alkanes. Five of the nineteen ask for a number.",
  concepts: [
    // C1 — preparation of alkanes
    {
      kind: "reference" as const,
      slug: "jchc-alkane-prep",
      name: "Preparing alkanes and what each route does to the carbon count",
      intuition:
        "Each route to an alkane does one of three things to the carbon chain. It keeps it (adding H₂ to an alkene, reducing an alkyl halide, a Grignard reagent with water), it doubles it (Wurtz, Kolbe) or it shortens it by one carbon (soda-lime decarboxylation). So before you choose a route, ask how many carbons the product needs. A route that doubles the chain can never give methane, because methane has only one carbon.",
      definition:
        "- **Hydrogenation**: \\(\\mathrm{R{-}CH{=}CH_2 + H_2 \\xrightarrow{Pt/Pd/Ni} R{-}CH_2{-}CH_3}\\). Same carbon count; needs at least two carbons, so no methane.\n" +
        "- **Reduction of alkyl halides**: \\(\\mathrm{R{-}X + H_2 \\xrightarrow{Zn,\\ H^+} R{-}H + HX}\\). Same carbon count; \\(\\mathrm{CH_3Cl}\\) gives \\(\\mathrm{CH_4}\\).\n" +
        "- **Wurtz reaction**: \\(\\mathrm{2R{-}X + 2Na \\xrightarrow{dry\\ ether} R{-}R + 2NaX}\\). Doubles the chain; two different halides give three alkanes.\n" +
        "- **Kolbe electrolysis**: \\(\\mathrm{2RCOO^-Na^+ + 2H_2O \\rightarrow R{-}R + 2CO_2 + H_2 + 2NaOH}\\). Doubles the alkyl group; \\(\\mathrm{R{-}R}\\) and \\(\\mathrm{CO_2}\\) form at the anode.\n" +
        "- **Soda-lime decarboxylation**: \\(\\mathrm{RCOONa + NaOH \\xrightarrow{CaO,\\ \\Delta} R{-}H + Na_2CO_3}\\). One carbon fewer.\n" +
        "- **Grignard reagent + any compound with an acidic H** (water, an alcohol, an amine): \\(\\mathrm{R{-}MgX + H_2O \\rightarrow R{-}H + Mg(OH)X}\\). One mole of gas per mole of \\(\\mathrm{RMgX}\\); with \\(\\mathrm{D_2O}\\) the product is \\(\\mathrm{R{-}D}\\).",
      table: {
        columns: ["Route", "Reagents", "Carbon count of product", "Example"],
        rows: [
          { cells: ["Hydrogenation", "\\(\\mathrm{H_2}\\) with Pt, Pd or Ni", "Same as the alkene or alkyne", "Propene gives propane"] },
          { cells: ["Reduction of R–X", "Zn and dilute HCl", "Same as the halide", "\\(\\mathrm{CH_3CH_2Br}\\) gives ethane"] },
          { cells: ["Wurtz", "Na in dry ether", "Twice the alkyl group", "\\(\\mathrm{CH_3CH_2Br}\\) gives butane"] },
          { cells: ["Kolbe electrolysis", "Electrolysis of the aqueous sodium salt", "Twice the alkyl group", "Sodium propanoate gives butane"] },
          { cells: ["Soda-lime decarboxylation", "NaOH with CaO, heat", "One carbon fewer than the salt", "Sodium propanoate gives ethane"] },
          { cells: ["Grignard + acidic H", "\\(\\mathrm{H_2O}\\), ROH or \\(\\mathrm{RNH_2}\\)", "Same as the alkyl group", "\\(\\mathrm{C_2H_5MgBr}\\) gives ethane"] },
          { cells: ["Clemmensen reduction", "Zn–Hg and conc. HCl", "Same; C=O becomes CH₂", "Propanone gives propane"] },
        ],
        caption: "Wurtz and Kolbe double the chain, so neither can make methane; decarboxylation removes one carbon.",
      },
      selfCheckExample: {
        prompt: "Which alkane forms at the anode when aqueous sodium propanoate is electrolysed, and which alkane does the same salt give with soda lime?",
        steps: [
          "Kolbe electrolysis joins two ethyl groups after each propanoate loses \\(\\mathrm{CO_2}\\): \\(\\mathrm{CH_3CH_2{-}CH_2CH_3}\\).",
          "Soda lime removes the carboxyl carbon: \\(\\mathrm{CH_3CH_2COONa \\rightarrow CH_3CH_3}\\).",
        ],
        answer: "Butane by Kolbe electrolysis; ethane with soda lime.",
      },
      practiceSet: [
        { prompt: "How many alkanes form when a mixture of \\(\\mathrm{CH_3Br}\\) and \\(\\mathrm{CH_3CH_2Br}\\) is treated with sodium in dry ether?", answer: "3 (ethane, propane and butane)" },
        { prompt: "\\(\\mathrm{CH_3MgI}\\) reacts with \\(\\mathrm{D_2O}\\). What is the organic product?", answer: "\\(\\mathrm{CH_3D}\\)" },
        { prompt: "A Grignard reagent RMgBr and water give a gas; 1.12 L of it at STP weighs 1.5 g. Name the gas.", answer: "Ethane (0.05 mol, so M = 30)", method: "Moles = 1.12/22.4; M = mass/moles." },
        { prompt: "Which of Wurtz, Kolbe and soda-lime decarboxylation can give methane?", answer: "Only soda-lime decarboxylation (of sodium ethanoate)" },
      ],
      pyqExampleId: "8de6bc30-49a9-4e88-853a-59dfaf78cd82", // 2026 — which routes give methane
      traps: [
        {
          title: "Kolbe electrolysis of sodium ethanoate gives ethane",
          body: "Two methyl radicals join at the anode, so the product is \\(\\mathrm{CH_3{-}CH_3}\\). Methane from sodium ethanoate needs soda lime, not electrolysis.",
        },
        {
          title: "A mixture of two salts or two halides gives three alkanes",
          body: "Kolbe electrolysis of \\(\\mathrm{CH_3COONa}\\) with \\(\\mathrm{C_2H_5COONa}\\) couples methyl–methyl, methyl–ethyl and ethyl–ethyl: ethane, propane and butane. The Wurtz reaction on two different halides does the same.",
        },
        {
          title: "Every acidic H counts for a Grignard reagent",
          body: "Water, alcohols, amines and terminal alkynes all protonate RMgX. One mole of RMgX gives one mole of RH gas whatever the proton source, so the gas volume gives the moles.",
        },
      ],
    },

    // C2 — formula, carbon classes and conformations
    {
      kind: "formula" as const,
      slug: "jchc-alkane-structure",
      name: "Alkane formula, carbon classes and conformations",
      intuition:
        "An open-chain alkane is CₙH₂ₙ₊₂, so its molar mass is 14n + 2. That one fact turns a molar mass or an oxygen demand into the number of carbons. Then draw the isomers and class each carbon by how many carbons it is bonded to: one (primary), two (secondary), three (tertiary) or four (quaternary). The hydrogens take the class of the carbon they sit on. Rotation about a C–C single bond is free, but not equally easy: eclipsed forms put bonds (or groups) face to face and cost energy.",
      definition:
        "- Molar mass \\(= 14n + 2\\); complete combustion needs \\(\\dfrac{3n+1}{2}\\) mol \\(\\mathrm{O_2}\\) per mole of alkane.\n" +
        "- A 1° carbon is bonded to one carbon, 2° to two, 3° to three, 4° to four. 1° H sits on a 1° carbon, and so on; a 4° carbon has no H.\n" +
        "- **Ethane**: staggered (dihedral angle 60°) is the most stable, eclipsed (0°) the least; they differ by about 12.5 kJ mol⁻¹ (torsional strain). Between them lie infinitely many conformations, and they interconvert at room temperature, so they cannot be separated.\n" +
        "- **n-Butane** (along C2–C3), increasing energy: anti (CH₃ groups 180° apart) < gauche (60°) < eclipsed with CH₃ over H < fully eclipsed with CH₃ over CH₃ (0°).",
      formula: {
        label: "Open-chain alkane",
        latex: "\\mathrm{C_nH_{2n+2}}:\\quad M = 14n + 2,\\qquad \\mathrm{C_nH_{2n+2}} + \\tfrac{3n+1}{2}\\,\\mathrm{O_2} \\rightarrow n\\,\\mathrm{CO_2} + (n+1)\\,\\mathrm{H_2O}",
        symbols: [
          { symbol: "n", meaning: "number of carbon atoms" },
          { symbol: "M", meaning: "molar mass in g mol⁻¹ (C = 12, H = 1)" },
        ],
      },
      authoredExample: {
        prompt: "An alkane has molar mass 86 g mol⁻¹ and exactly two tertiary carbons. Name it and count its primary carbons.",
        steps: [
          "\\(14n + 2 = 86\\) gives \\(n = 6\\): the alkane is \\(\\mathrm{C_6H_{14}}\\).",
          "Of the five hexane isomers, only \\(\\mathrm{(CH_3)_2CH{-}CH(CH_3)_2}\\) has two carbons each bonded to three others.",
          "Its four methyl groups are each bonded to one carbon, so all four are primary.",
        ],
        answer: "2,3-Dimethylbutane, with 4 primary carbons.",
      },
      selfCheckExample: {
        prompt: "How many moles of \\(\\mathrm{O_2}\\) does one mole of heptane need for complete combustion?",
        steps: [
          "\\(n = 7\\), so \\(\\dfrac{3(7)+1}{2} = 11\\).",
          "Check: 7 \\(\\mathrm{CO_2}\\) use 14 O atoms and 8 \\(\\mathrm{H_2O}\\) use 8, total 22 O atoms = 11 \\(\\mathrm{O_2}\\).",
        ],
        answer: "11 mol",
      },
      practiceSet: [
        { prompt: "How many secondary hydrogens does 2,2-dimethylbutane have?", answer: "2 (on its one CH₂)" },
        { prompt: "What is the dihedral angle between the C–H bonds of the front and back carbons in eclipsed ethane?", answer: "0°" },
        { prompt: "Which conformation of n-butane has the lowest energy?", answer: "Anti (the two CH₃ groups 180° apart)" },
        { prompt: "An alkane needs 9.5 mol O₂ per mole to burn completely. What is its formula?", answer: "\\(\\mathrm{C_6H_{14}}\\) (3n + 1 = 19)" },
      ],
      pyqExampleId: "3972efca-d563-4f25-bf0f-da68e3fb85ba", // 2026 — M = 72 alkane with three primary carbons
      traps: [
        {
          title: "A ring has two hydrogens fewer",
          body: "A cycloalkane is CₙH₂ₙ, so its molar mass is 14n. A ring with the same carbons as an alkane is 2 g mol⁻¹ lighter, which rules it out when the molar mass fits CₙH₂ₙ₊₂.",
        },
        {
          title: "The fully eclipsed form of butane is the highest in energy",
          body: "Two eclipsed conformations exist. The one with CH₃ over CH₃ (0°) is higher than the one with CH₃ over H (120°). Gauche is higher than anti but lower than both eclipsed forms.",
        },
        {
          title: "Conformers are not isolable",
          body: "The barrier in ethane is only about 12.5 kJ mol⁻¹, so the conformations change into one another at room temperature. A statement that they can be separated is wrong.",
        },
      ],
    },

    // C3 — reactions of alkanes
    {
      kind: "reference" as const,
      slug: "jchc-alkane-reactions",
      name: "Isomerisation, aromatisation and oxidation of alkanes",
      intuition:
        "Alkanes are unreactive, so each of their reactions needs a special reagent or harsh conditions, and each one is named by what it does to the chain. Isomerisation keeps the formula but branches the chain. Aromatisation closes a six-carbon ring and removes hydrogen, so the carbon count stays the same. Oxidation with KMnO₄ attacks only a tertiary C–H.",
      definition:
        "- **Isomerisation**: anhydrous \\(\\mathrm{AlCl_3}\\) and HCl gas, heat. n-Hexane gives 2-methylpentane and 3-methylpentane (same formula).\n" +
        "- **Aromatisation**: \\(\\mathrm{Cr_2O_3}\\), \\(\\mathrm{V_2O_5}\\) or \\(\\mathrm{Mo_2O_3}\\) on alumina, 773 K, 10–20 atm. n-Hexane gives benzene; n-heptane gives toluene.\n" +
        "- **Oxidation by KMnO₄**: a tertiary C–H becomes C–OH: \\(\\mathrm{(CH_3)_3CH \\rightarrow (CH_3)_3COH}\\).\n" +
        "- **Controlled oxidation**: \\(\\mathrm{2CH_4 + O_2 \\xrightarrow{Cu,\\ 523\\,K,\\ 100\\,atm} 2CH_3OH}\\); \\(\\mathrm{CH_4 + O_2 \\xrightarrow{Mo_2O_3} HCHO + H_2O}\\).\n" +
        "- **Pyrolysis (cracking)**: heating without air breaks a large alkane into smaller alkanes and alkenes.",
      table: {
        columns: ["Reaction", "Conditions", "What changes", "Example"],
        rows: [
          { cells: ["Isomerisation", "Anhydrous \\(\\mathrm{AlCl_3}\\), HCl gas, heat", "Chain branches; formula unchanged", "n-Hexane → 2-methylpentane and 3-methylpentane"] },
          { cells: ["Aromatisation", "\\(\\mathrm{Cr_2O_3}\\) or \\(\\mathrm{V_2O_5}\\) on alumina, 773 K, 10–20 atm", "Six-carbon ring closes; H₂ is lost", "n-Hexane → benzene"] },
          { cells: ["KMnO₄ oxidation", "\\(\\mathrm{KMnO_4}\\)", "Tertiary C–H becomes C–OH", "2-Methylpropane → 2-methylpropan-2-ol"] },
          { cells: ["Controlled oxidation", "Cu at 523 K and 100 atm, or \\(\\mathrm{Mo_2O_3}\\)", "Methane becomes methanol or methanal", "\\(\\mathrm{CH_4 \\rightarrow CH_3OH}\\)"] },
          { cells: ["Steam reforming", "\\(\\mathrm{H_2O}\\), Ni, 1273 K", "Methane becomes CO and H₂", "\\(\\mathrm{CH_4 + H_2O \\rightarrow CO + 3H_2}\\)"] },
          { cells: ["Pyrolysis", "Strong heat, no air", "Chain breaks into smaller alkanes and alkenes", "Hexane → butene + ethane, among others"] },
        ],
        caption: "Aromatisation keeps the carbon count: count the carbons of the arene to find the alkane.",
      },
      selfCheckExample: {
        prompt: "Which arene forms when n-hexane is passed over \\(\\mathrm{Cr_2O_3}\\) on alumina at 773 K?",
        steps: [
          "Aromatisation keeps all six carbons and closes them into a ring.",
          "Six ring carbons with no side chain is benzene; four molecules of \\(\\mathrm{H_2}\\) are lost.",
        ],
        answer: "Benzene",
      },
      practiceSet: [
        { prompt: "What does anhydrous AlCl₃ with HCl do to n-hexane?", answer: "Isomerises it to branched hexanes (2- and 3-methylpentane)" },
        { prompt: "Which alkane gives a tertiary alcohol with KMnO₄: butane or 2-methylpropane?", answer: "2-Methylpropane (it has a tertiary C–H)" },
        { prompt: "Name the product of methane and oxygen over Mo₂O₃.", answer: "Methanal (HCHO)" },
        { prompt: "n-Octane is aromatised. How many carbons does the product have?", answer: "8 (an arene C₈H₁₀)" },
      ],
      pyqExampleId: "8ba1c38c-8530-4f3d-8413-ff31c414f315", // 2026 — the C7 alkane that isomerises, aromatises and cyclises
      traps: [
        {
          title: "Isomerisation does not change the formula",
          body: "An alkane and its isomerised product have the same molecular formula. If a product has fewer hydrogens, the reaction was aromatisation or cyclisation, not isomerisation.",
        },
        {
          title: "KMnO₄ needs a tertiary hydrogen",
          body: "n-Alkanes have no tertiary C–H, so KMnO₄ does not give an alcohol from them. 2-Methylbutane has one, at C-2, and gives 2-methylbutan-2-ol.",
        },
      ],
    },
  ],
  related: [
    { label: "Free-Radical Halogenation of Alkanes — the reaction every alkane undergoes", href: `${BASE}/jch-hc-halogenation` },
  ],
};
