import type { SubtopicNote } from "@/app/notes/_types";

export const ROADMAPS_ORM_NOTE: SubtopicNote = {
  subtopicName: "Multistep Conversions and Road Maps",
  title: "Multistep Conversions and Road Maps",
  oneLineDefinition:
    "A multistep scheme is solved by counting carbons first, marking the steps that add or remove carbon, and then following one functional group through each reagent in turn.",
  whyItMatters:
    "Nine PYQs, two of them asking for a number. Five build a carbon chain one step at a time: cyanide adding a carbon at each end, a Grignard reagent attacking an ester or formaldehyde, an acetylide alkylated by a bromo-alcohol, a nitrile carbanion added to a ketone, and a carbonyl protected as an acetal. Four are aromatic routes: Friedel-Crafts acylation then Clemmensen reduction, n-heptane aromatised and then oxidised by the Etard reaction, nitro groups turned into iodine through a diazonium salt, and chlorobenzene turned into phenol at 623 K and 300 atm.",
  concepts: [
    // C1 — chain building and carbon counting
    {
      kind: "reference" as const,
      slug: "jcorm-chain-building",
      name: "Carbon counting in chain-building steps",
      intuition:
        "Most reagents in a scheme only change a functional group. A few make or break a C–C bond, and those decide the answer. Count the carbons of the start and of each option first; the carbon-changing steps then tell you which options can be right before you work out a single structure.",
      definition:
        "- Step 1: count the carbons in the starting compound and in the product or options.\n" +
        "- Step 2: find the steps that change the count: cyanide (+1 per halogen), a Grignard reagent or acetylide (+ its own carbons), \\(\\mathrm{CO_2}\\) on a Grignard (+1); haloform, soda lime and Hofmann bromamide (−1 each).\n" +
        "- Step 3: follow the functional group through every other reagent: PCC stops a primary alcohol at the aldehyde, \\(\\mathrm{KMnO_4}\\) or Jones reagent goes on to the acid, \\(\\mathrm{NaBH_4}\\) and \\(\\mathrm{LiAlH_4}\\) reduce C=O to CH–OH, \\(\\mathrm{H_2/Ni}\\) reduces \\(\\mathrm{C{\\equiv}N}\\) to \\(\\mathrm{CH_2NH_2}\\).\n" +
        "- A Grignard reagent or an acetylide is destroyed by any O–H or N–H in the molecule; that is why a carbonyl that must survive is protected as an acetal first (ethylene glycol and \\(\\mathrm{H^+}\\)), and aqueous acid removes the acetal at the end.\n" +
        "- An acetylide is alkylated only by a primary halide; a secondary or tertiary halide gives elimination.",
      table: {
        columns: ["Reagent", "Carbon count change", "Group produced", "Example"],
        rows: [
          { cells: ["KCN on an alkyl halide", "+1 for each halogen replaced", "Nitrile; \\(\\mathrm{H_3O^+}\\) gives COOH, \\(\\mathrm{H_2/Ni}\\) gives \\(\\mathrm{CH_2NH_2}\\)", "\\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2CN \\to CH_3CH_2COOH}\\)"] },
          { cells: ["RMgX, then HCHO and \\(\\mathrm{H_3O^+}\\)", "+1 on R", "Primary alcohol \\(\\mathrm{RCH_2OH}\\)", "\\(\\mathrm{CH_3CH_2MgBr \\to CH_3CH_2CH_2OH}\\)"] },
          { cells: ["RMgX, then another aldehyde R′CHO", "R joins R′CHO", "Secondary alcohol", "\\(\\mathrm{C_6H_5MgBr + CH_3CHO \\to C_6H_5CH(OH)CH_3}\\)"] },
          { cells: ["RMgX, then a ketone", "R joins the ketone", "Tertiary alcohol", "\\(\\mathrm{CH_3MgBr + CH_3COCH_3 \\to (CH_3)_3COH}\\)"] },
          { cells: ["Two RMgX on an ester R′COOEt", "Two R groups join; OEt leaves", "Tertiary alcohol with two identical R groups", "\\(\\mathrm{2\\,CH_3MgBr + CH_3COOC_2H_5 \\to (CH_3)_3COH}\\)"] },
          { cells: ["RMgX, then \\(\\mathrm{CO_2}\\) and \\(\\mathrm{H_3O^+}\\)", "+1 on R", "Carboxylic acid RCOOH", "\\(\\mathrm{CH_3MgBr \\to CH_3COOH}\\)"] },
          { cells: ["\\(\\mathrm{NaNH_2}\\) on a terminal alkyne, then a primary RX", "+ the carbons of R", "Longer internal alkyne", "\\(\\mathrm{CH_3C{\\equiv}CH \\to CH_3C{\\equiv}CCH_2CH_3}\\) with \\(\\mathrm{CH_3CH_2Br}\\)"] },
          { cells: ["Base on \\(\\mathrm{ArCH_2CN}\\), then a ketone", "The α-carbon joins the C=O carbon", "β-Hydroxy nitrile", "\\(\\mathrm{C_6H_5CH_2CN + CH_3COCH_3 \\to (CH_3)_2C(OH)CH(C_6H_5)CN}\\)"] },
          { cells: ["Ethylene glycol and \\(\\mathrm{H^+}\\) on a C=O", "0 (temporary)", "Cyclic acetal, stable to base, Grignard reagents and \\(\\mathrm{NaBH_4}\\)", "Aqueous acid gives the C=O back"] },
          { cells: ["\\(\\mathrm{X_2/NaOH}\\) on a methyl ketone", "−1", "Carboxylate and \\(\\mathrm{CHX_3}\\)", "\\(\\mathrm{CH_3COCH_2CH_3 \\to CH_3CH_2COO^-}\\)"] },
          { cells: ["Soda lime on RCOONa", "−1", "Alkane RH", "\\(\\mathrm{CH_3CH_2COONa \\to CH_3CH_3}\\)"] },
          { cells: ["\\(\\mathrm{Br_2/NaOH}\\) on an amide \\(\\mathrm{RCONH_2}\\)", "−1", "Primary amine \\(\\mathrm{RNH_2}\\)", "\\(\\mathrm{CH_3CH_2CONH_2 \\to CH_3CH_2NH_2}\\)"] },
        ],
        caption: "Mark the steps that change the carbon count before anything else; every other reagent changes only the group.",
      },
      selfCheckExample: {
        prompt:
          "1-Bromopropane is treated with Mg in dry ether (A), then with \\(\\mathrm{CO_2}\\) and \\(\\mathrm{H_3O^+}\\) (B), then with \\(\\mathrm{LiAlH_4}\\) (C), then with PCC (D). Give A to D and the number of carbons in D.",
        steps: [
          "A is the Grignard reagent \\(\\mathrm{CH_3CH_2CH_2MgBr}\\).",
          "\\(\\mathrm{CO_2}\\) adds one carbon: B is butanoic acid, \\(\\mathrm{CH_3CH_2CH_2COOH}\\).",
          "\\(\\mathrm{LiAlH_4}\\) reduces the acid to butan-1-ol, C. PCC stops at the aldehyde: D is butanal, \\(\\mathrm{CH_3CH_2CH_2CHO}\\).",
        ],
        answer: "A \\(\\mathrm{CH_3CH_2CH_2MgBr}\\), B butanoic acid, C butan-1-ol, D butanal; four carbons, one more than the start.",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{CH_3CH_2MgBr}\\) reacts with HCHO, then \\(\\mathrm{H_3O^+}\\). Name the product and its carbon count.", answer: "Propan-1-ol, three carbons" },
        { prompt: "Ethyl ethanoate reacts with excess \\(\\mathrm{CH_3MgBr}\\), then \\(\\mathrm{H_3O^+}\\). What forms?", answer: "2-Methylpropan-2-ol (plus ethanol)" },
        { prompt: "1,3-Dibromopropane is treated with excess KCN, then hot aqueous acid. What forms?", answer: "Pentanedioic (glutaric) acid, \\(\\mathrm{HOOC(CH_2)_3COOH}\\): three carbons plus two" },
        { prompt: "A molecule has a ketone and an ester, and only the ester must react with a Grignard reagent. What is done first?", answer: "Protect the ketone as a cyclic acetal with ethylene glycol and \\(\\mathrm{H^+}\\)" },
      ],
      pyqExampleId: "8a42818b-9e85-45f7-bec2-096ec3da7a28", // 2024 — ethyl bromide to succinic acid
      traps: [
        {
          title: "A Grignard reagent attacks an ester twice",
          body: "After the first addition the ester loses \\(\\mathrm{OEt^-}\\) and becomes a ketone, which is more reactive than the ester, so a second equivalent adds at once. The product is a tertiary alcohol with two identical groups from the Grignard reagent, never a ketone.",
        },
        {
          title: "H₂/Ni adds hydrogen, not carbon",
          body: "Reducing \\(\\mathrm{C{\\equiv}N}\\) to \\(\\mathrm{CH_2NH_2}\\) keeps the carbon count; the extra carbon came in with the cyanide. Count it once, at the KCN step.",
        },
        {
          title: "An O–H in the molecule destroys the carbanion",
          body: "Grignard reagents and acetylide ions are strong bases. A free OH, COOH or NH in the same reaction protonates them before any C–C bond forms, so in practice such groups are protected first.",
        },
      ],
    },

    // C2 — aromatic road maps
    {
      kind: "formula" as const,
      slug: "jcorm-aromatic-roadmaps",
      name: "Aromatic road maps: acylation, reduction and diazonium routes",
      intuition:
        "On a benzene ring, a group is put on by electrophilic substitution and then changed step by step. Two habits solve most aromatic schemes. To attach a straight carbon chain, acylate and then reduce the C=O, because direct alkylation rearranges. To place a group that cannot go on directly (I, F, CN, OH), put on a nitro group, reduce it to \\(\\mathrm{NH_2}\\), make the diazonium salt and replace \\(\\mathrm{N_2}\\).",
      definition:
        "- **Friedel-Crafts acylation** (RCOCl or an anhydride with anhydrous \\(\\mathrm{AlCl_3}\\)): an aryl ketone, with no rearrangement and only one substitution. A cyclic anhydride gives a keto acid.\n" +
        "- **Clemmensen** (Zn–Hg and conc. HCl) or **Wolff-Kishner** (hydrazine, then KOH in ethylene glycol): C=O to \\(\\mathrm{CH_2}\\), leaving COOH alone.\n" +
        "- **Intramolecular acylation**: an aryl-butanoic acid with acid closes a six-membered ring onto the ring's ortho position (α-tetralone).\n" +
        "- **Nitro to diazonium**: \\(\\mathrm{HNO_3/H_2SO_4}\\); then Sn/HCl or \\(\\mathrm{H_2/Pd}\\) to \\(\\mathrm{ArNH_2}\\); then \\(\\mathrm{NaNO_2/HCl}\\) at 0–5 °C to \\(\\mathrm{ArN_2^+}\\). Then KI gives ArI, CuCl or CuBr gives ArCl or ArBr, CuCN gives ArCN, warm water gives ArOH, \\(\\mathrm{H_3PO_2}\\) gives ArH.\n" +
        "- **Side chains**: \\(\\mathrm{CrO_2Cl_2}\\) in \\(\\mathrm{CS_2}\\), then \\(\\mathrm{H_3O^+}\\) (Etard) turns \\(\\mathrm{ArCH_3}\\) into ArCHO; hot alkaline \\(\\mathrm{KMnO_4}\\) turns any alkyl side chain with a benzylic H into COOH.\n" +
        "- **Aromatisation**: n-hexane or n-heptane over \\(\\mathrm{Cr_2O_3}\\), \\(\\mathrm{V_2O_5}\\) or \\(\\mathrm{Mo_2O_3}\\) at 773 K and 10–20 atm gives benzene or toluene.\n" +
        "- **Dow process**: chlorobenzene with NaOH at 623 K and 300 atm gives sodium phenoxide; acid gives phenol.\n" +
        "- **Order matters**: \\(\\mathrm{CH_3}\\), OH and \\(\\mathrm{NH_2}\\) direct ortho and para; \\(\\mathrm{NO_2}\\), COOH and C=O direct meta. Friedel-Crafts fails on a ring carrying \\(\\mathrm{NO_2}\\).",
      formula: {
        label: "Straight-chain alkylbenzene by acylation then reduction",
        latex: "\\mathrm{C_6H_6 \\xrightarrow{RCOCl,\\ AlCl_3} C_6H_5COR \\xrightarrow{Zn{-}Hg,\\ HCl} C_6H_5CH_2R}",
      },
      authoredExample: {
        prompt: "Make n-propylbenzene from benzene. Why does 1-chloropropane with \\(\\mathrm{AlCl_3}\\) not do the job?",
        steps: [
          "1-Chloropropane gives a primary cation that shifts a hydride and becomes isopropyl, so the main product is isopropylbenzene.",
          "Acylate instead: propanoyl chloride, \\(\\mathrm{CH_3CH_2COCl}\\), with \\(\\mathrm{AlCl_3}\\) gives propiophenone, \\(\\mathrm{C_6H_5COCH_2CH_3}\\). The acylium ion does not rearrange.",
          "Clemmensen reduction (Zn–Hg, conc. HCl) turns the C=O into \\(\\mathrm{CH_2}\\): \\(\\mathrm{C_6H_5CH_2CH_2CH_3}\\).",
        ],
        answer: "Benzene → (\\(\\mathrm{CH_3CH_2COCl}\\), \\(\\mathrm{AlCl_3}\\)) propiophenone → (Zn–Hg, HCl) n-propylbenzene.",
      },
      selfCheckExample: {
        prompt: "Give a route from toluene to 4-iodobenzoic acid, and say why the nitration must come before the oxidation.",
        steps: [
          "Nitrate toluene with \\(\\mathrm{HNO_3/H_2SO_4}\\): \\(\\mathrm{CH_3}\\) directs ortho and para; separate 4-nitrotoluene. If the ring were oxidised first, COOH would direct the nitro group meta.",
          "Oxidise the methyl group with hot alkaline \\(\\mathrm{KMnO_4}\\), then acidify: 4-nitrobenzoic acid. This is done before the reduction because an \\(\\mathrm{NH_2}\\) group would be oxidised too.",
          "Reduce with Sn/HCl to 4-aminobenzoic acid, diazotise with \\(\\mathrm{NaNO_2/HCl}\\) at 0–5 °C, and add KI.",
        ],
        answer: "Toluene → 4-nitrotoluene → 4-nitrobenzoic acid → 4-aminobenzoic acid → diazonium salt → 4-iodobenzoic acid.",
      },
      practiceSet: [
        { prompt: "Benzene is treated with \\(\\mathrm{CH_3COCl}\\) and \\(\\mathrm{AlCl_3}\\), then with Zn–Hg and conc. HCl. What forms?", answer: "Ethylbenzene" },
        { prompt: "Toluene is treated with \\(\\mathrm{CrO_2Cl_2}\\) in \\(\\mathrm{CS_2}\\), then \\(\\mathrm{H_3O^+}\\). What forms?", answer: "Benzaldehyde (Etard reaction)" },
        { prompt: "Benzenediazonium chloride is warmed with aqueous KI. What forms?", answer: "Iodobenzene" },
        { prompt: "n-Hexane is passed over \\(\\mathrm{Cr_2O_3}\\) at 773 K and 10–20 atm. What forms?", answer: "Benzene (aromatisation)" },
      ],
      pyqExampleId: "afa623b0-639d-4864-a9e6-4bbe712726b7", // 2024 — acylation with succinic anhydride, Clemmensen, ring closure
      traps: [
        {
          title: "Acylate, then reduce, for a straight chain",
          body: "Friedel-Crafts alkylation with a primary halide rearranges and can add more than one group. Acylation gives one straight-chain ketone, and Clemmensen or Wolff-Kishner reduction turns it into the straight-chain alkylbenzene.",
        },
        {
          title: "Clemmensen leaves COOH alone",
          body: "Zn–Hg and HCl reduce a ketone or aldehyde C=O to \\(\\mathrm{CH_2}\\) but do not touch a carboxylic acid. A keto acid becomes an acid with the same number of carbons.",
        },
        {
          title: "Diazotise cold",
          body: "The diazonium salt is made with \\(\\mathrm{NaNO_2/HCl}\\) at 0–5 °C. Warmed in water it turns into the phenol, so a scheme that needs ArI or ArCN keeps it cold until the replacing reagent is added.",
        },
      ],
    },
  ],
};
