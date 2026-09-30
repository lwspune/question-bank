import type { SubtopicNote } from "@/app/notes/_types";

export const NAMED_ORM_NOTE: SubtopicNote = {
  subtopicName: "Named Reactions",
  title: "Named Reactions",
  oneLineDefinition:
    "Each named reaction is a fixed triple of name, reagent and change, and the questions test it by giving one of the three and asking for another, usually four at a time in a match list.",
  whyItMatters:
    "Twelve PYQs, nine of them match lists and one asking for a number. Four pair halide and diazonium reactions with their names and reagents: Wurtz, Fittig, Wurtz-Fittig, Finkelstein, Sandmeyer, Gattermann, Lucas, and the two routes to an isocyanide. Four pair carbonyl, acid and amide reactions: Rosenmund, Clemmensen, HVZ, Hofmann bromamide, Etard, Gattermann-Koch, Cannizzaro, Reimer-Tiemann. Four ask for a mechanism class or a reagent's job.",
  concepts: [
    // C1 — halide and diazonium named reactions
    {
      kind: "reference" as const,
      slug: "jcorm-halide-name-reactions",
      name: "Named reactions of alkyl halides, aryl halides and diazonium salts",
      intuition:
        "The halide reactions pair up in ways that are easy to mix. Sodium joins two halides: two alkyl halides (Wurtz), two aryl halides (Fittig) or one of each (Wurtz-Fittig). A halogen is swapped for another by a salt whose by-product drops out: NaI in dry acetone makes iodides, metal fluorides make fluorides. A diazonium group is replaced by halogen with a copper(I) salt (Sandmeyer) or with copper powder and the acid (Gattermann).",
      definition:
        "- Coupling with Na in dry ether: RX + RX → R–R (Wurtz); ArX + ArX → Ar–Ar (Fittig); ArX + RX → Ar–R (Wurtz-Fittig).\n" +
        "- **Finkelstein**: NaI in dry acetone turns R–Cl or R–Br into R–I; NaCl or NaBr is insoluble in acetone and precipitates, which drives the reaction.\n" +
        "- **Swarts**: AgF, \\(\\mathrm{Hg_2F_2}\\), \\(\\mathrm{CoF_2}\\) or \\(\\mathrm{SbF_3}\\) turns R–Cl or R–Br into R–F.\n" +
        "- **Sandmeyer**: \\(\\mathrm{ArN_2^+}\\) with CuCl/HCl (cuprous chloride, often written \\(\\mathrm{Cu_2Cl_2}\\)), CuBr/HBr or CuCN gives ArCl, ArBr or ArCN. **Gattermann**: copper powder with HCl or HBr gives ArCl or ArBr.\n" +
        "- **Lucas reagent** (conc. HCl with anhydrous \\(\\mathrm{ZnCl_2}\\)) turns an alcohol into the chloride: at once for a tertiary alcohol, in about five minutes for a secondary, not at room temperature for a primary.\n" +
        "- **Cyanide or isocyanide**: KCN is ionic and attacks through C, giving the nitrile R–CN. AgCN is covalent and attacks through N, giving the isocyanide R–NC. A primary amine with \\(\\mathrm{CHCl_3}\\) and alcoholic KOH (carbylamine reaction) also gives R–NC.",
      table: {
        columns: ["Name", "Reagent", "Change", "Example"],
        rows: [
          { cells: ["Wurtz", "Na, dry ether", "2 RX → R–R", "\\(\\mathrm{2\\,CH_3CH_2Br \\to CH_3CH_2CH_2CH_3}\\)"] },
          { cells: ["Fittig", "Na, dry ether", "2 ArX → Ar–Ar", "\\(\\mathrm{2\\,C_6H_5Br \\to C_6H_5{-}C_6H_5}\\) (biphenyl)"] },
          { cells: ["Wurtz-Fittig", "Na, dry ether", "ArX + RX → Ar–R", "\\(\\mathrm{C_6H_5Br + CH_3CH_2Br \\to C_6H_5CH_2CH_3}\\)"] },
          { cells: ["Finkelstein", "NaI, dry acetone", "R–Cl or R–Br → R–I", "\\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2I}\\)"] },
          { cells: ["Swarts", "AgF, \\(\\mathrm{Hg_2F_2}\\), \\(\\mathrm{CoF_2}\\) or \\(\\mathrm{SbF_3}\\)", "R–Cl or R–Br → R–F", "\\(\\mathrm{CH_3Br \\to CH_3F}\\)"] },
          { cells: ["Sandmeyer", "CuCl/HCl, CuBr/HBr or CuCN", "\\(\\mathrm{ArN_2^+}\\) → ArCl, ArBr or ArCN", "\\(\\mathrm{C_6H_5N_2^+Cl^- \\to C_6H_5CN}\\) with CuCN"] },
          { cells: ["Gattermann", "Cu powder with HCl or HBr", "\\(\\mathrm{ArN_2^+}\\) → ArCl or ArBr", "\\(\\mathrm{C_6H_5N_2^+Cl^- \\to C_6H_5Cl}\\) with Cu/HCl"] },
          { cells: ["Balz-Schiemann", "\\(\\mathrm{HBF_4}\\), then heat", "\\(\\mathrm{ArN_2^+}\\) → ArF", "\\(\\mathrm{C_6H_5N_2^+Cl^- \\to C_6H_5F}\\)"] },
          { cells: ["Lucas", "Conc. HCl, anhydrous \\(\\mathrm{ZnCl_2}\\)", "ROH → RCl; rate 3° > 2° > 1°", "\\(\\mathrm{(CH_3)_2CHOH \\to (CH_3)_2CHCl}\\), cloudy in about 5 min"] },
          { cells: ["Nitrile from KCN", "KCN (ionic)", "RX → R–CN", "\\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2CN}\\)"] },
          { cells: ["Isocyanide from AgCN", "AgCN (covalent)", "RX → R–NC", "\\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2NC}\\)"] },
          { cells: ["Carbylamine", "\\(\\mathrm{CHCl_3}\\), alcoholic KOH", "Primary amine \\(\\mathrm{RNH_2}\\) → R–NC", "\\(\\mathrm{C_6H_5NH_2 \\to C_6H_5NC}\\), a foul smell"] },
        ],
        caption: "Sodium couples, halide salts swap, copper replaces a diazonium group, silver cyanide attacks through nitrogen.",
      },
      selfCheckExample: {
        prompt:
          "Name each reaction: (P) \\(\\mathrm{C_6H_5N_2^+Cl^-}\\) with CuCN; (Q) \\(\\mathrm{CH_3CH_2Cl}\\) with NaI in dry acetone; (R) \\(\\mathrm{C_6H_5Br}\\) and \\(\\mathrm{CH_3Br}\\) with Na in dry ether; (S) \\(\\mathrm{CH_3CH_2Br}\\) with AgF.",
        steps: [
          "P: a copper(I) salt replaces the diazonium group by CN: Sandmeyer.",
          "Q: chloride swapped for iodide, NaCl precipitating: Finkelstein.",
          "R: an aryl and an alkyl halide joined by sodium: Wurtz-Fittig, giving toluene.",
          "S: bromide swapped for fluoride by a metal fluoride: Swarts.",
        ],
        answer: "P Sandmeyer, Q Finkelstein, R Wurtz-Fittig, S Swarts.",
      },
      practiceSet: [
        { prompt: "Which reagent turns bromoethane into ethyl isocyanide rather than propanenitrile?", answer: "AgCN" },
        { prompt: "What do you get when two molecules of chlorobenzene react with Na in dry ether?", answer: "Biphenyl (Fittig reaction)" },
        { prompt: "Which reagent pair is the Gattermann reaction for making chlorobenzene from a diazonium salt?", answer: "Copper powder and HCl" },
        { prompt: "With the Lucas reagent, which alcohol turns cloudy at once: butan-1-ol, butan-2-ol or 2-methylpropan-2-ol?", answer: "2-Methylpropan-2-ol (tertiary)" },
      ],
      pyqExampleId: "da185f37-248d-41a6-b047-cb9124674724", // 2023 — Wurtz-Fittig, Fittig, Sandmeyer, Finkelstein match list
      traps: [
        {
          title: "Sandmeyer uses a copper(I) salt, Gattermann uses copper powder",
          body: "Both replace \\(\\mathrm{N_2^+}\\) by Cl or Br. CuCl with HCl (or CuBr with HBr) is Sandmeyer; Cu powder with HCl or HBr is Gattermann. A match list that pairs 'Cu, HCl' with Sandmeyer is wrong.",
        },
        {
          title: "AgCN gives the isocyanide, KCN the nitrile",
          body: "KCN is ionic, and the free cyanide ion attacks through its carbon. AgCN is largely covalent, so the nitrogen lone pair attacks. The same alkyl halide gives R–CN with KCN and R–NC with AgCN.",
        },
        {
          title: "Wurtz-Fittig needs one aryl and one alkyl halide",
          body: "Two aryl halides with sodium is the Fittig reaction and gives a biaryl; two alkyl halides is the Wurtz reaction. Only the mixed pair, ArX with RX, is Wurtz-Fittig and gives an alkylbenzene.",
        },
      ],
    },

    // C2 — carbonyl, acid, amide and arene named reactions
    {
      kind: "reference" as const,
      slug: "jcorm-carbonyl-name-reactions",
      name: "Named reactions of carbonyls, acids, amides and phenols",
      intuition:
        "These named reactions each make or remove one specific group, so they are best learned as 'from what to what'. Three make an aldehyde (Rosenmund from an acid chloride, Etard from a methylarene, Gattermann-Koch from benzene itself), two take C=O to \\(\\mathrm{CH_2}\\) (Clemmensen in acid, Wolff-Kishner in base), and the rest each own one change: HVZ puts a halogen next to COOH, Hofmann bromamide removes the amide carbon, Reimer-Tiemann puts CHO on a phenol.",
      definition:
        "- Aldehyde-making: **Rosenmund** \\(\\mathrm{RCOCl \\to RCHO}\\) (\\(\\mathrm{H_2}\\), Pd on \\(\\mathrm{BaSO_4}\\), poisoned so it stops at CHO); **Stephen** RCN → RCHO (\\(\\mathrm{SnCl_2/HCl}\\), then \\(\\mathrm{H_3O^+}\\)); **Etard** \\(\\mathrm{ArCH_3 \\to ArCHO}\\); **Gattermann-Koch** ArH → ArCHO (CO, HCl, anhydrous \\(\\mathrm{AlCl_3}\\)).\n" +
        "- C=O to \\(\\mathrm{CH_2}\\): **Clemmensen** (Zn–Hg, conc. HCl) or **Wolff-Kishner** (hydrazine, then KOH in ethylene glycol).\n" +
        "- **HVZ**: \\(\\mathrm{Cl_2}\\) or \\(\\mathrm{Br_2}\\) with red phosphorus, then water, halogenates the α-carbon of a carboxylic acid.\n" +
        "- **Hofmann bromamide**: \\(\\mathrm{Br_2}\\) and NaOH turn \\(\\mathrm{RCONH_2}\\) into \\(\\mathrm{RNH_2}\\), one carbon shorter, through an isocyanate.\n" +
        "- **Reimer-Tiemann**: \\(\\mathrm{CHCl_3}\\) and aqueous NaOH, then acid, put CHO ortho to the OH of phenol. **Kolbe**: sodium phenoxide with \\(\\mathrm{CO_2}\\) (4–7 atm, 400 K), then acid, gives salicylic acid.\n" +
        "- Friedel-Crafts acylation with \\(\\mathrm{C_6H_5COCl}\\) gives benzophenone, a ketone, not diphenylmethane.",
      table: {
        columns: ["Name", "Reagent", "Change", "Example"],
        rows: [
          { cells: ["Rosenmund", "\\(\\mathrm{H_2}\\), Pd on \\(\\mathrm{BaSO_4}\\)", "RCOCl → RCHO", "\\(\\mathrm{CH_3COCl \\to CH_3CHO}\\)"] },
          { cells: ["Stephen", "\\(\\mathrm{SnCl_2/HCl}\\), then \\(\\mathrm{H_3O^+}\\)", "RCN → RCHO", "\\(\\mathrm{CH_3CN \\to CH_3CHO}\\)"] },
          { cells: ["Etard", "\\(\\mathrm{CrO_2Cl_2}\\) in \\(\\mathrm{CS_2}\\), then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{ArCH_3}\\) → ArCHO", "Toluene → benzaldehyde"] },
          { cells: ["Gattermann-Koch", "CO, HCl, anhydrous \\(\\mathrm{AlCl_3}\\) (CuCl)", "ArH → ArCHO", "Benzene → benzaldehyde"] },
          { cells: ["Clemmensen", "Zn–Hg, conc. HCl", "C=O → \\(\\mathrm{CH_2}\\), in acid", "\\(\\mathrm{CH_3COCH_3 \\to CH_3CH_2CH_3}\\)"] },
          { cells: ["Wolff-Kishner", "\\(\\mathrm{NH_2NH_2}\\), then KOH in ethylene glycol, heat", "C=O → \\(\\mathrm{CH_2}\\), in base", "\\(\\mathrm{C_6H_5COCH_2CH_3 \\to C_6H_5CH_2CH_2CH_3}\\)"] },
          { cells: ["Cannizzaro", "Concentrated NaOH or KOH", "2 RCHO (no α-H) → \\(\\mathrm{RCH_2OH + RCOO^-}\\)", "\\(\\mathrm{2\\,HCHO \\to CH_3OH + HCOO^-}\\)"] },
          { cells: ["Aldol", "Dilute NaOH", "Two carbonyls with α-H → β-hydroxy carbonyl", "\\(\\mathrm{2\\,CH_3CHO \\to CH_3CH(OH)CH_2CHO}\\)"] },
          { cells: ["Hell-Volhard-Zelinsky (HVZ)", "\\(\\mathrm{Cl_2}\\) or \\(\\mathrm{Br_2}\\), red P, then \\(\\mathrm{H_2O}\\)", "\\(\\mathrm{RCH_2COOH \\to RCHXCOOH}\\)", "\\(\\mathrm{CH_3COOH \\to ClCH_2COOH}\\)"] },
          { cells: ["Hofmann bromamide", "\\(\\mathrm{Br_2}\\), NaOH", "\\(\\mathrm{RCONH_2 \\to RNH_2}\\), one carbon fewer", "\\(\\mathrm{C_6H_5CONH_2 \\to C_6H_5NH_2}\\)"] },
          { cells: ["Reimer-Tiemann", "\\(\\mathrm{CHCl_3}\\), aqueous NaOH, then \\(\\mathrm{H_3O^+}\\)", "Phenol → 2-hydroxybenzaldehyde", "\\(\\mathrm{C_6H_5OH \\to HOC_6H_4CHO}\\) (salicylaldehyde)"] },
          { cells: ["Kolbe", "NaOH, \\(\\mathrm{CO_2}\\) at 4–7 atm and 400 K, then \\(\\mathrm{H^+}\\)", "Phenol → 2-hydroxybenzoic acid", "\\(\\mathrm{C_6H_5OH \\to HOC_6H_4COOH}\\) (salicylic acid)"] },
          { cells: ["Haloform", "\\(\\mathrm{X_2}\\), NaOH", "\\(\\mathrm{CH_3COR \\to CHX_3 + RCOO^-}\\)", "\\(\\mathrm{CH_3COCH_3 \\to CHI_3 + CH_3COO^-}\\)"] },
          { cells: ["Decarboxylation", "Soda lime (NaOH and CaO), heat", "RCOONa → RH", "\\(\\mathrm{CH_3COONa \\to CH_4}\\)"] },
        ],
        caption: "Learn each row as reagent plus change; a match list gives you one and asks for the other.",
      },
      selfCheckExample: {
        prompt:
          "Name the reaction and give the reagent for each change: (i) phenol to salicylaldehyde; (ii) toluene to benzaldehyde; (iii) propanoic acid to 2-bromopropanoic acid.",
        steps: [
          "(i) CHO goes ortho to the phenolic OH: Reimer-Tiemann, \\(\\mathrm{CHCl_3}\\) with aqueous NaOH, then acid.",
          "(ii) A ring \\(\\mathrm{CH_3}\\) becomes CHO: Etard, \\(\\mathrm{CrO_2Cl_2}\\) in \\(\\mathrm{CS_2}\\), then water.",
          "(iii) Br goes on the carbon next to COOH: HVZ, \\(\\mathrm{Br_2}\\) with red phosphorus, then water.",
        ],
        answer: "(i) Reimer-Tiemann; (ii) Etard; (iii) Hell-Volhard-Zelinsky.",
      },
      practiceSet: [
        { prompt: "Which named reaction turns benzene directly into benzaldehyde?", answer: "Gattermann-Koch (CO, HCl, anhydrous \\(\\mathrm{AlCl_3}\\))" },
        { prompt: "Propanamide is treated with \\(\\mathrm{Br_2}\\) and NaOH. What forms?", answer: "Ethanamine, \\(\\mathrm{CH_3CH_2NH_2}\\) (Hofmann bromamide)" },
        { prompt: "Which reduction of C=O to \\(\\mathrm{CH_2}\\) suits a compound that decomposes in acid?", answer: "Wolff-Kishner (basic conditions)" },
        { prompt: "What does benzoyl chloride give with benzene and anhydrous \\(\\mathrm{AlCl_3}\\)?", answer: "Benzophenone, \\(\\mathrm{C_6H_5COC_6H_5}\\)" },
      ],
      pyqExampleId: "0de3b1af-fcc4-4b0b-a20e-a122c847881f", // 2021 — Rosenmund, HVZ, Hofmann, Clemmensen by transformation
      traps: [
        {
          title: "Rosenmund stops at the aldehyde",
          body: "The palladium is poisoned with \\(\\mathrm{BaSO_4}\\) so that \\(\\mathrm{H_2}\\) reduces the acid chloride only as far as the aldehyde. The product is never the carboxylic acid, and with an unpoisoned catalyst it would go on to the alcohol.",
        },
        {
          title: "Hofmann bromamide loses a carbon",
          body: "The carbonyl carbon of the amide leaves as carbonate, so benzamide gives aniline and propanamide gives ethanamine. Acid hydrolysis of an amide, by contrast, keeps every carbon and gives the carboxylic acid.",
        },
        {
          title: "Reimer-Tiemann gives an aldehyde, Kolbe gives an acid",
          body: "Both work ortho to the OH of phenol. Chloroform and alkali (Reimer-Tiemann) add CHO; carbon dioxide under pressure with sodium phenoxide (Kolbe) adds COOH.",
        },
      ],
    },

    // C3 — mechanism class and reagent roles
    {
      kind: "reference" as const,
      slug: "jcorm-reaction-types",
      name: "Mechanism class and reagent roles",
      intuition:
        "Every reaction has a class, set by what attacks what. A nucleophile replacing a leaving group is a nucleophilic substitution; an electrophile replacing an H on a ring is an electrophilic substitution; an electrophile adding across a C=C is an electrophilic addition; a halogen atom made by light is a free-radical reaction. Name the attacking species and the class follows.",
      definition:
        "- **Nucleophilic substitution**: \\(\\mathrm{S_N2}\\) for a primary halide with a strong nucleophile (Williamson ether synthesis); \\(\\mathrm{S_N1}\\) through a carbocation for a tertiary halide in water.\n" +
        "- **Electrophilic substitution**: an arene with \\(\\mathrm{NO_2^+}\\), \\(\\mathrm{R^+}\\), \\(\\mathrm{RCO^+}\\) or \\(\\mathrm{Cl^+}\\) (from \\(\\mathrm{Cl_2/FeCl_3}\\)).\n" +
        "- **Electrophilic addition**: \\(\\mathrm{Br_2}\\) or HX across a C=C, including the side chain of styrene.\n" +
        "- **Nucleophilic addition**: HCN, Grignard reagents or \\(\\mathrm{NaHSO_3}\\) on a C=O.\n" +
        "- **Free radical**: \\(\\mathrm{Cl_2}\\) with light on an alkane or on the side chain of toluene (substitution); \\(\\mathrm{Cl_2}\\) on benzene in UV light with no catalyst (addition, giving benzene hexachloride, \\(\\mathrm{C_6H_6Cl_6}\\)).\n" +
        "- **Elimination**: alcoholic KOH on an alkyl halide (β-elimination, Saytzeff alkene); Hofmann elimination of a quaternary ammonium hydroxide gives the less substituted (anti-Saytzeff) alkene.\n" +
        "- **Reducing systems**: \\(\\mathrm{H_2}\\) with Pt, Pd or Ni; Lindlar's catalyst (Pd on \\(\\mathrm{BaSO_4}\\) or \\(\\mathrm{CaCO_3}\\), poisoned) stops an alkyne at the cis-alkene; Na in liquid \\(\\mathrm{NH_3}\\) gives the trans-alkene; Zn with water or acid. Sodium with \\(\\mathrm{H_2}\\) only forms NaH and reduces nothing.",
      table: {
        columns: ["Reaction or reagent", "Class or role", "Key species", "Result"],
        rows: [
          { cells: ["Williamson synthesis: RONa + primary RX", "Nucleophilic substitution (\\(\\mathrm{S_N2}\\))", "Alkoxide ion", "Ether"] },
          { cells: ["tert-Butyl bromide in water", "Nucleophilic substitution (\\(\\mathrm{S_N1}\\))", "Tertiary carbocation", "2-Methylpropan-2-ol"] },
          { cells: ["Nitration, sulphonation, Friedel-Crafts", "Electrophilic substitution", "\\(\\mathrm{NO_2^+}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{R^+}\\) or \\(\\mathrm{RCO^+}\\)", "Substituted arene"] },
          { cells: ["\\(\\mathrm{Br_2}\\) on an alkene", "Electrophilic addition", "Cyclic bromonium ion", "Vicinal dibromide"] },
          { cells: ["HCN on a ketone", "Nucleophilic addition", "Cyanide ion", "Cyanohydrin"] },
          { cells: ["\\(\\mathrm{Cl_2}\\) on methane or on toluene's side chain, in light", "Free-radical substitution", "Cl atom; methyl or benzyl radical", "Chloromethane or benzyl chloride"] },
          { cells: ["\\(\\mathrm{Cl_2}\\) on benzene in UV light, no catalyst", "Free-radical addition", "Cl atom", "Benzene hexachloride, \\(\\mathrm{C_6H_6Cl_6}\\)"] },
          { cells: ["Alcoholic KOH on an alkyl halide", "β-Elimination", "Strong base in ethanol", "Alkene, the more substituted one"] },
          { cells: ["Heating a quaternary ammonium hydroxide", "Hofmann elimination", "Bulky trialkylamine leaving group", "The less substituted (anti-Saytzeff) alkene"] },
          { cells: ["Lindlar's catalyst with \\(\\mathrm{H_2}\\)", "Partial hydrogenation", "Poisoned palladium", "Alkyne to cis-alkene"] },
          { cells: ["Na in liquid \\(\\mathrm{NH_3}\\)", "Dissolving-metal reduction", "Solvated electrons", "Alkyne to trans-alkene"] },
          { cells: ["Hinsberg reagent, \\(\\mathrm{C_6H_5SO_2Cl}\\)", "Test that sorts amines", "Sulphonamide", "1° dissolves in alkali, 2° does not, 3° does not react"] },
          { cells: ["Na with \\(\\mathrm{H_2}\\)", "Not a reducing system for organic groups", "Sodium hydride forms", "No organic group is reduced"] },
        ],
        caption: "Name the species that attacks and whether it adds or replaces; the class follows from those two facts.",
      },
      selfCheckExample: {
        prompt:
          "Give the mechanism class of each: (i) bromoethane with NaCN in DMSO; (ii) benzene with conc. \\(\\mathrm{HNO_3}\\) and conc. \\(\\mathrm{H_2SO_4}\\); (iii) ethene with HBr; (iv) ethane with \\(\\mathrm{Cl_2}\\) in sunlight.",
        steps: [
          "(i) Cyanide replaces bromide on a primary carbon: nucleophilic substitution, \\(\\mathrm{S_N2}\\).",
          "(ii) \\(\\mathrm{NO_2^+}\\) replaces a ring H: electrophilic substitution.",
          "(iii) \\(\\mathrm{H^+}\\) adds to the C=C first, then bromide: electrophilic addition.",
          "(iv) Light splits \\(\\mathrm{Cl_2}\\) into atoms that take an H: free-radical substitution.",
        ],
        answer: "(i) \\(\\mathrm{S_N2}\\); (ii) electrophilic substitution; (iii) electrophilic addition; (iv) free-radical substitution.",
      },
      practiceSet: [
        { prompt: "Toluene with \\(\\mathrm{Cl_2}\\) and \\(\\mathrm{FeCl_3}\\) in the dark: where does Cl go?", answer: "On the ring, ortho and para (electrophilic substitution)" },
        { prompt: "But-2-yne is reduced with \\(\\mathrm{H_2}\\) over Lindlar's catalyst. What forms?", answer: "cis-But-2-ene" },
        { prompt: "What does alcoholic KOH do to 2-bromobutane?", answer: "β-Elimination, mainly to but-2-ene" },
        { prompt: "Which amine gives a sulphonamide with Hinsberg's reagent that is insoluble in alkali?", answer: "A secondary amine" },
      ],
      pyqExampleId: "7655f330-2023-4932-a6dc-91abb86a3e3d", // 2026 — reaction to mechanism class match list
      traps: [
        {
          title: "Toluene and chlorine: light or catalyst decides where",
          body: "In light or on heating, chlorine atoms take a benzylic H and give benzyl chloride: free-radical substitution on the side chain. With \\(\\mathrm{FeCl_3}\\) in the dark, \\(\\mathrm{Cl^+}\\) attacks the ring: electrophilic substitution at ortho and para.",
        },
        {
          title: "Benzene hexachloride is an addition product",
          body: "Benzene with chlorine in UV light and no catalyst adds three \\(\\mathrm{Cl_2}\\) molecules to give \\(\\mathrm{C_6H_6Cl_6}\\). It is not chlorobenzene and not a substitution.",
        },
        {
          title: "Alcoholic KOH eliminates, aqueous KOH substitutes",
          body: "In ethanol, KOH acts as a strong base and removes a β-hydrogen to give an alkene. In water, hydroxide acts as a nucleophile and replaces the halogen to give an alcohol.",
        },
      ],
    },
  ],
};
