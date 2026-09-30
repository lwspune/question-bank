import type { SubtopicNote } from "@/app/notes/_types";

export const PREP_HALO_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Haloalkanes and Haloarenes",
  title: "Preparation of Haloalkanes and Haloarenes",
  oneLineDefinition:
    "Haloalkanes come from alcohols (HX, PCl₅ or SOCl₂), from alkenes (HX, Markovnikov unless HBr meets a peroxide) and from C–H bonds by free-radical halogenation; haloarenes come from ring halogenation with a Lewis acid or from diazonium salts, never from phenol.",
  whyItMatters:
    "Eleven PYQs, one numerical, two from 2026. Seven follow a halogen onto an alcohol, an alkene or a C–H bond and ask where it lands, or what stops the reaction running backwards; four match named reactions to their reagents or products, or ask which routes can make an aryl halide.",
  concepts: [
    // C1 — from alcohols, alkenes and hydrocarbons
    {
      kind: "formula" as const,
      slug: "jchalo-hx-radical",
      name: "Haloalkanes from alcohols, alkenes and hydrocarbons",
      intuition:
        "There are three places a halogen can come from. It can replace the OH of an alcohol, it can add to a C=C together with a hydrogen, or it can replace a hydrogen on a C–H bond through radicals. In the first two the product is decided by the most stable carbocation; in the third it is decided by the most stable radical.",
      definition:
        "- **From alcohols**: \\(\\mathrm{R{-}OH + HX}\\). Tertiary alcohols react with conc. HCl at room temperature; primary and secondary need anhydrous \\(\\mathrm{ZnCl_2}\\) (Lucas reagent) and heat. Also \\(\\mathrm{PCl_5}\\), \\(\\mathrm{PCl_3}\\), \\(\\mathrm{PBr_3}\\) and \\(\\mathrm{PI_3}\\) (made from red P with \\(\\mathrm{Br_2}\\) or \\(\\mathrm{I_2}\\)). \\(\\mathrm{SOCl_2}\\) is preferred because both by-products are gases.\n" +
        "- The HX route goes through a carbocation, so an allylic alcohol can give a rearranged allylic halide.\n" +
        "- A benzylic OH is replaced easily; a phenolic OH is not replaced at all, because the C–O bond of phenol has partial double-bond character.\n" +
        "- **From alkenes**: HX adds by Markovnikov's rule, X going to the carbon that gives the more stable carbocation. HBr with a peroxide adds the other way (anti-Markovnikov, through a radical). \\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\) gives a vicinal dibromide.\n" +
        "- **From C–H bonds**: \\(\\mathrm{Cl_2}\\) or \\(\\mathrm{Br_2}\\) with light gives substitution through radicals. Bromine is selective for the 3° C–H; an allylic C–H is replaced rather than the C=C attacked.\n" +
        "- Iodination is reversible, because HI reduces the alkyl iodide back. An oxidising agent such as \\(\\mathrm{HIO_3}\\), \\(\\mathrm{HNO_3}\\) or \\(\\mathrm{HIO_4}\\) removes the HI.\n" +
        "- On an arene: \\(\\mathrm{Cl_2}\\) with \\(\\mathrm{FeCl_3}\\) in the dark substitutes the ring (ortho and para); \\(\\mathrm{Cl_2}\\) with light or heat and no catalyst substitutes the side chain of toluene.",
      formula: {
        label: "Alcohol to alkyl chloride with thionyl chloride; alcohol reactivity with HX",
        latex:
          "\\mathrm{R{-}OH + SOCl_2 \\longrightarrow R{-}Cl + SO_2\\uparrow + HCl\\uparrow} \\qquad \\text{reactivity with HX: } 3^\\circ > 2^\\circ > 1^\\circ",
      },
      authoredExample: {
        prompt: "Give the major product when but-1-ene reacts with HBr (a) in the dark with no peroxide, (b) in the presence of benzoyl peroxide.",
        steps: [
          "(a) \\(\\mathrm{H^+}\\) adds to C-1, the \\(\\mathrm{CH_2}\\) end, giving a secondary cation at C-2. A primary cation at C-1 would be less stable.",
          "\\(\\mathrm{Br^-}\\) adds to C-2: \\(\\mathrm{CH_3CH_2CH(Br)CH_3}\\), 2-bromobutane (Markovnikov).",
          "(b) The peroxide starts a radical chain. \\(\\mathrm{Br^\\bullet}\\) adds to C-1, giving the more stable secondary radical at C-2.",
          "That radical takes H from HBr: \\(\\mathrm{CH_3CH_2CH_2CH_2Br}\\), 1-bromobutane (anti-Markovnikov).",
        ],
        answer: "(a) 2-Bromobutane; (b) 1-bromobutane.",
      },
      selfCheckExample: {
        prompt: "Which alcohol gives turbidity fastest with the Lucas reagent (conc. HCl with anhydrous \\(\\mathrm{ZnCl_2}\\)): butan-1-ol, butan-2-ol or 2-methylpropan-2-ol?",
        steps: [
          "The reaction goes through a carbocation, so the alcohol that gives the most stable cation reacts fastest.",
          "2-Methylpropan-2-ol gives the tertiary cation \\(\\mathrm{(CH_3)_3C^+}\\).",
        ],
        answer: "2-Methylpropan-2-ol (the tertiary alcohol)",
      },
      practiceSet: [
        { prompt: "Which reagent converts ethanol into chloroethane with only gaseous by-products?", answer: "\\(\\mathrm{SOCl_2}\\)" },
        { prompt: "What does toluene give with \\(\\mathrm{Cl_2}\\) in sunlight and no catalyst?", answer: "Benzyl chloride, \\(\\mathrm{C_6H_5CH_2Cl}\\)" },
        { prompt: "What is the major product of 2-methylpropane with \\(\\mathrm{Br_2}\\) and light?", answer: "2-Bromo-2-methylpropane" },
        { prompt: "What does propene give with \\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\)?", answer: "1,2-Dibromopropane" },
      ],
      pyqExampleId: "866eafaf-0e91-4293-b1b6-59d165899a24", // 2021 — reversible iodination of methane
      traps: [
        {
          title: "Only HBr shows the peroxide effect",
          body: "A peroxide reverses the addition of HBr only. HCl and HI still add by Markovnikov's rule when a peroxide is present.",
        },
        {
          title: "Phenol does not give an aryl halide with HX",
          body: "The C–O bond of phenol has partial double-bond character and does not break. Aryl halides are made by ring halogenation or from diazonium salts. Phenol does not react violently with halogen acids either.",
        },
        {
          title: "Light chlorinates the side chain, iron(III) chloride the ring",
          body: "Toluene with \\(\\mathrm{Cl_2}\\) and light gives benzyl chloride; with \\(\\mathrm{Cl_2}\\) and \\(\\mathrm{FeCl_3}\\) in the dark it gives 2- and 4-chlorotoluene.",
        },
      ],
    },

    // C2 — named reactions
    {
      kind: "reference" as const,
      slug: "jchalo-named-reactions",
      name: "Named reactions that make or couple organic halides",
      intuition:
        "Each named reaction is a fixed pair of reagent and change. Halogen exchange swaps one halogen for another (Finkelstein for iodides, Swarts for fluorides). Diazonium salts give aryl halides (Sandmeyer with copper(I) salts, Gattermann with copper powder). Sodium in dry ether couples aryl halides (Wurtz-Fittig and Fittig).",
      definition:
        "- **Finkelstein**: \\(\\mathrm{R{-}Cl}\\) or \\(\\mathrm{R{-}Br}\\) + NaI in dry acetone → \\(\\mathrm{R{-}I}\\). NaCl and NaBr do not dissolve in acetone, so they precipitate and pull the reaction forward.\n" +
        "- **Swarts**: \\(\\mathrm{R{-}Cl}\\) or \\(\\mathrm{R{-}Br}\\) heated with a metal fluoride (AgF, \\(\\mathrm{Hg_2F_2}\\), \\(\\mathrm{CoF_2}\\) or \\(\\mathrm{SbF_3}\\)) → \\(\\mathrm{R{-}F}\\).\n" +
        "- **Sandmeyer**: \\(\\mathrm{ArN_2^+}\\) with \\(\\mathrm{Cu_2Cl_2/HCl}\\) → ArCl, with \\(\\mathrm{Cu_2Br_2/HBr}\\) → ArBr, with CuCN/KCN → ArCN.\n" +
        "- **Gattermann**: \\(\\mathrm{ArN_2^+}\\) with copper powder and HCl or HBr → ArCl or ArBr.\n" +
        "- \\(\\mathrm{ArN_2^+}\\) + KI → ArI, with no copper needed.\n" +
        "- **Wurtz-Fittig**: ArX + RX + Na in dry ether → Ar–R. **Fittig**: 2 ArX + 2 Na in dry ether → Ar–Ar.",
      table: {
        columns: ["Reaction", "Reagent", "Change", "Example"],
        rows: [
          { cells: ["Finkelstein", "NaI in dry acetone", "R–Cl or R–Br → R–I", "\\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2I}\\)"] },
          { cells: ["Swarts", "AgF, \\(\\mathrm{Hg_2F_2}\\), \\(\\mathrm{CoF_2}\\) or \\(\\mathrm{SbF_3}\\)", "R–Cl or R–Br → R–F", "\\(\\mathrm{CH_3Br + AgF \\to CH_3F}\\)"] },
          { cells: ["Sandmeyer", "\\(\\mathrm{Cu_2Cl_2/HCl}\\), \\(\\mathrm{Cu_2Br_2/HBr}\\) or CuCN/KCN", "\\(\\mathrm{ArN_2^+}\\) → ArCl, ArBr or ArCN", "Benzenediazonium chloride → chlorobenzene"] },
          { cells: ["Gattermann", "Copper powder with HCl or HBr", "\\(\\mathrm{ArN_2^+}\\) → ArCl or ArBr", "Benzenediazonium chloride → bromobenzene"] },
          { cells: ["Iodide from a diazonium salt", "KI (no copper)", "\\(\\mathrm{ArN_2^+}\\) → ArI", "Benzenediazonium chloride → iodobenzene"] },
          { cells: ["Wurtz-Fittig", "Na in dry ether", "ArX + RX → Ar–R", "Chlorobenzene + methyl chloride → toluene"] },
          { cells: ["Fittig", "Na in dry ether", "2 ArX → Ar–Ar", "Chlorobenzene → biphenyl"] },
        ],
        caption: "Sandmeyer uses copper(I) salts; Gattermann uses copper powder.",
      },
      selfCheckExample: {
        prompt: "Name the reaction that turns benzenediazonium chloride into bromobenzene with copper powder and HBr.",
        steps: [
          "The starting material is a diazonium salt, so the choice is between Sandmeyer and Gattermann.",
          "Copper powder, rather than a copper(I) salt, marks the Gattermann reaction.",
        ],
        answer: "The Gattermann reaction",
      },
      practiceSet: [
        { prompt: "Which reagent turns 2-chloropropane into 2-iodopropane?", answer: "NaI in dry acetone (Finkelstein)" },
        { prompt: "Which named reaction makes \\(\\mathrm{CH_3F}\\) from \\(\\mathrm{CH_3Br}\\)?", answer: "The Swarts reaction, with AgF" },
        { prompt: "What does benzenediazonium chloride give with KI?", answer: "Iodobenzene" },
        { prompt: "What does chlorobenzene give with ethyl chloride and sodium in dry ether?", answer: "Ethylbenzene (Wurtz-Fittig)" },
      ],
      pyqExampleId: "1290e160-5705-4d01-9fd5-f78100d7d77c", // 2026 — Finkelstein, Swarts, Sandmeyer, Fittig reagents
      traps: [
        {
          title: "Gattermann makes aryl chlorides and bromides, not cyanides",
          body: "In the NCERT scheme the Gattermann reaction uses copper powder with HCl or HBr and gives ArCl or ArBr. The aryl cyanide comes from the Sandmeyer reaction with CuCN. A statement that both reactions give aryl cyanides is false by this scheme.",
        },
        {
          title: "Finkelstein runs because the salt precipitates",
          body: "NaI dissolves in dry acetone but NaCl and NaBr do not. Their precipitation removes a product and drives the exchange forward; in water the reaction would not go to completion.",
        },
      ],
    },
  ],
};
