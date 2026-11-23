import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Methods of Preparation of Alkyl Halides",
  title: "Preparing Alkyl and Aryl Halides",
  oneLineDefinition:
    "Making halogen derivatives from alcohols, from alkenes by adding a hydrogen halide, by halogen exchange (Finkelstein and Swartz reactions) and, for aryl halides, by halogenating the ring.",
  whyItMatters:
    "14 questions. Four were set in board papers: name the reaction that makes an alkyl fluoride from an alkyl chloride (2016 and 2020), identify the products when propene adds HBr in the presence of peroxide and the product meets alcoholic KCN (2025), and complete the reactions of propene with HBr and of ethanol with thionyl chloride (2025). The textbook adds products to name, conversions and one reason to give.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscchd-from-alcohols",
      name: "From alcohols: halogen acids, phosphorus halides and thionyl chloride",
      intuition:
        "An alcohol already has its carbon skeleton in place; you only need to swap the OH for a halogen. Three kinds of reagent do this. The best one for chlorides is thionyl chloride, because everything else it makes is a gas that bubbles away and leaves the alkyl chloride behind.",
      definition:
        "- **(a) Halogen acid, HX.** Order of reactivity of alcohols: \\(3^\\circ > 2^\\circ > 1^\\circ\\). Primary and secondary alcohols need HCl with **anhydrous** \\(\\text{ZnCl}_2\\) (Groves' process); tertiary alcohols react with concentrated HCl alone. Conc. HCl with anhydrous \\(\\text{ZnCl}_2\\) is the **Lucas reagent**.\n" +
        "- Alkyl bromides: constant boiling HBr (48%), or NaBr with \\(\\text{H}_2\\text{SO}_4\\) (HBr made in situ). Alkyl iodides: NaI or KI with 95% \\(\\text{H}_3\\text{PO}_4\\) (HI made in situ).\n" +
        "- **(b) Phosphorus halides.** \\(\\text{3R-OH} + \\text{PX}_3 \\longrightarrow \\text{3R-X} + \\text{H}_3\\text{PO}_3\\); \\(\\text{R-OH} + \\text{PCl}_5 \\longrightarrow \\text{R-Cl} + \\text{POCl}_3 + \\text{HCl}\\). \\(\\text{PBr}_3\\) and \\(\\text{PI}_3\\) are made in situ from red phosphorus and bromine or iodine. Phosphorus halides keep rearrangement to a minimum.\n" +
        "- **(c) Thionyl chloride.** \\(\\text{R-OH} + \\text{SOCl}_2 \\longrightarrow \\text{R-Cl} + \\text{SO}_2 + \\text{HCl}\\). The by-products are gases, so no effort is needed to separate them: this is the preferred method for alkyl chlorides.",
      formula: {
        label: "Alcohol with thionyl chloride",
        latex: "\\text{R-OH} + \\text{SOCl}_2 \\longrightarrow \\text{R-Cl} + \\text{SO}_2\\uparrow + \\text{HCl}\\uparrow",
      },
      authoredExample: {
        prompt: "Write balanced equations to prepare 1-bromopropane from propan-1-ol using PBr₃, and 1-chloropropane using PCl₅.",
        steps: [
          "Phosphorus tribromide replaces three OH groups, giving phosphorous acid: \\(3\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} + \\text{PBr}_3 \\longrightarrow 3\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br} + \\text{H}_3\\text{PO}_3\\).",
          "Phosphorus pentachloride replaces one OH group: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} + \\text{PCl}_5 \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Cl} + \\text{POCl}_3 + \\text{HCl}\\).",
        ],
        answer: "1-Bromopropane with H₃PO₃; 1-chloropropane with POCl₃ and HCl",
      },
      selfCheckExample: {
        prompt: "Write the reaction of 2-methylpropan-2-ol with concentrated HCl. Is anhydrous ZnCl₂ needed?",
        steps: [
          "2-Methylpropan-2-ol is a tertiary alcohol, the most reactive kind towards a halogen acid.",
          "\\((\\text{CH}_3)_3\\text{C-OH} + \\text{HCl} \\longrightarrow (\\text{CH}_3)_3\\text{C-Cl} + \\text{H}_2\\text{O}\\)",
          "Tertiary alcohols react with concentrated HCl in the absence of zinc chloride.",
        ],
        answer: "2-Chloro-2-methylpropane is formed; no ZnCl₂ is needed",
      },
      practiceSet: [
        { prompt: "What name is given to a mixture of concentrated HCl and anhydrous ZnCl₂?", answer: "Lucas reagent" },
        { prompt: "Which two substances produce PBr₃ in the reaction mixture?", answer: "Red phosphorus and bromine" },
        { prompt: "Arrange primary, secondary and tertiary alcohols by their reactivity with a halogen acid.", answer: "Tertiary > secondary > primary" },
        { prompt: "Name the inorganic product formed when an alcohol reacts with PCl₅, besides HCl.", answer: "Phosphorus oxychloride, POCl₃" },
      ],
      pyqExampleId: "2841ddfe-5ecd-4c0c-9aa4-f39ba0c904c3",
      traps: [
        {
          title: "Say why thionyl chloride is preferred",
          body: "The reason the board wants is that both by-products, \\(\\text{SO}_2\\) and HCl, are gases, so the alkyl chloride needs no separation. Writing only the equation loses that mark.",
        },
        {
          title: "Balancing the PX₃ equation",
          body: "One \\(\\text{PX}_3\\) reacts with three alcohol molecules and gives \\(\\text{H}_3\\text{PO}_3\\). Writing one alcohol to one \\(\\text{PX}_3\\) is unbalanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-from-alkenes",
      name: "From alkenes: Markownikov's rule and the peroxide effect",
      intuition:
        "A hydrogen halide adds across a double bond, one atom on each carbon. Which carbon gets the halogen? Normally the hydrogen goes to the carbon that already has more hydrogens, so the halogen lands on the more substituted carbon. With HBr and a peroxide the mechanism changes and the bromine lands on the other carbon.",
      definition:
        "- **Markownikov's rule:** when HX adds to an unsymmetrical alkene, the hydrogen goes to the doubly bonded carbon that already carries more hydrogens, and X goes to the other.\n" +
        "- **Peroxide effect:** in the presence of a peroxide, **HBr only** adds the other way (anti-Markownikov), so Br goes to the carbon with more hydrogens. HCl and HI are not affected by peroxide.\n" +
        "- Halogens \\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\) in an inert solvent such as \\(\\text{CCl}_4\\) add to give a **vicinal dihalide**.\n" +
        "- At high temperature, \\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\) substitutes an allylic hydrogen: \\(\\text{CH}_2\\text{=CH-CH}_3 + \\text{Cl}_2 \\longrightarrow \\text{CH}_2\\text{=CH-CH}_2\\text{Cl} + \\text{HCl}\\).\n" +
        "- **Halogenation of alkanes** is not used to prepare alkyl halides, because a mixture of mono and poly halogen compounds is formed.",
      formula: {
        label: "HBr addition to propene",
        latex: "\\text{CH}_3\\text{-CH=CH}_2 + \\text{HBr} \\longrightarrow \\text{CH}_3\\text{-CHBr-CH}_3 \\qquad \\text{CH}_3\\text{-CH=CH}_2 + \\text{HBr} \\xrightarrow{\\text{peroxide}} \\text{CH}_3\\text{-CH}_2\\text{-CH}_2\\text{Br}",
      },
      authoredExample: {
        prompt: "Write the products when 2-methylpropene reacts with HBr (i) without peroxide and (ii) with peroxide.",
        steps: [
          "(i) Markownikov addition: H goes to the \\(\\text{CH}_2\\) carbon, Br to the carbon carrying two methyl groups. \\((\\text{CH}_3)_2\\text{C=CH}_2 + \\text{HBr} \\longrightarrow (\\text{CH}_3)_3\\text{C-Br}\\), 2-bromo-2-methylpropane.",
          "(ii) Peroxide effect: Br goes to the \\(\\text{CH}_2\\) carbon. \\((\\text{CH}_3)_2\\text{C=CH}_2 + \\text{HBr} \\xrightarrow{\\text{peroxide}} (\\text{CH}_3)_2\\text{CH-CH}_2\\text{Br}\\), 1-bromo-2-methylpropane.",
        ],
        answer: "(i) 2-Bromo-2-methylpropane; (ii) 1-bromo-2-methylpropane",
      },
      selfCheckExample: {
        prompt: "What is the major product when propene reacts with HCl in the presence of a peroxide?",
        steps: [
          "The peroxide effect is shown by HBr only.",
          "So HCl adds by Markownikov's rule: \\(\\text{CH}_3\\text{-CH=CH}_2 + \\text{HCl} \\longrightarrow \\text{CH}_3\\text{-CHCl-CH}_3\\).",
        ],
        answer: "2-Chloropropane",
      },
      practiceSet: [
        { prompt: "What is formed when propene reacts with bromine in CCl₄?", answer: "1,2-Dibromopropane, a vicinal dihalide" },
        { prompt: "What is formed when propene is heated with chlorine at a high temperature?", answer: "Allyl chloride, 3-chloropropene, with HCl" },
        { prompt: "Name the major product of but-2-ene with HBr.", answer: "2-Bromobutane" },
      ],
      pyqExampleId: "252862b6-0fc4-4fd7-a408-2e2f07c0c029",
      traps: [
        {
          title: "Peroxide effect with HCl or HI",
          body: "Only HBr adds the anti-Markownikov way in the presence of peroxide. With HCl or HI the peroxide changes nothing and the halogen still goes to the more substituted carbon.",
        },
        {
          title: "Turning the rule round",
          body: "Markownikov's rule sends the HYDROGEN to the carbon with more hydrogens. Students often send the halogen there, which gives the anti-Markownikov product by mistake.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-exchange",
      name: "Halogen exchange: Finkelstein and Swartz reactions",
      intuition:
        "Iodides and fluorides are hard to make directly, so we make a chloride or bromide first and then swap the halogen. Sodium iodide in acetone swaps in iodine, because the sodium chloride formed does not dissolve and drops out. A metal fluoride swaps in fluorine.",
      definition:
        "- **Finkelstein reaction:** an alkyl chloride or bromide with **sodium iodide** in acetone or methanol gives the alkyl iodide. NaCl or NaBr precipitates and is removed by filtration.\n" +
        "- **Swartz reaction:** an alkyl chloride or bromide heated with a **metal fluoride** such as AgF, \\(\\text{Hg}_2\\text{F}_2\\), \\(\\text{AsF}_3\\) or \\(\\text{SbF}_3\\) gives the alkyl fluoride.",
      formula: {
        label: "Finkelstein and Swartz",
        latex: "\\text{R-Cl} + \\text{NaI} \\xrightarrow{\\text{acetone}} \\text{R-I} + \\text{NaCl}\\downarrow \\qquad \\text{R-Cl} + \\text{AgF} \\longrightarrow \\text{R-F} + \\text{AgCl}\\downarrow",
      },
      authoredExample: {
        prompt: "Write the reactions to obtain (i) 2-iodopropane from 2-chloropropane and (ii) 1-fluoropropane from 1-chloropropane. Name each reaction.",
        steps: [
          "(i) \\(\\text{CH}_3\\text{-CHCl-CH}_3 + \\text{NaI} \\xrightarrow{\\text{acetone}} \\text{CH}_3\\text{-CHI-CH}_3 + \\text{NaCl}\\downarrow\\). This is the Finkelstein reaction.",
          "(ii) \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Cl} + \\text{AgF} \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{F} + \\text{AgCl}\\downarrow\\). This is the Swartz reaction.",
        ],
        answer: "(i) Finkelstein reaction; (ii) Swartz reaction",
      },
      selfCheckExample: {
        prompt: "Write the balanced equation for 1-bromobutane heated with mercurous fluoride, Hg₂F₂.",
        steps: [
          "Each \\(\\text{Hg}_2\\text{F}_2\\) supplies two fluorine atoms, so two molecules of the bromide react.",
          "\\(2\\text{CH}_3(\\text{CH}_2)_3\\text{Br} + \\text{Hg}_2\\text{F}_2 \\longrightarrow 2\\text{CH}_3(\\text{CH}_2)_3\\text{F} + \\text{Hg}_2\\text{Br}_2\\)",
        ],
        answer: "1-Fluorobutane and Hg₂Br₂ (Swartz reaction)",
      },
      practiceSet: [
        { prompt: "Why does the Finkelstein reaction go to completion?", answer: "NaCl or NaBr is insoluble in acetone and precipitates out" },
        { prompt: "Name any two metal fluorides used in the Swartz reaction.", answer: "Any two of AgF, Hg₂F₂, AsF₃ and SbF₃" },
        { prompt: "Which reaction converts an alkyl bromide into an alkyl iodide?", answer: "The Finkelstein reaction, with NaI in acetone" },
      ],
      pyqExampleId: "ebb0aefa-63f5-4d75-829e-9f6f3a0d1812",
      traps: [
        {
          title: "Finkelstein gives iodides, Swartz gives fluorides",
          body: "Both are halogen exchanges, and the board's MCQs offer one as a decoy for the other. Iodide from NaI: Finkelstein. Fluoride from a metal fluoride: Swartz.",
        },
        {
          title: "Leaving out the solvent",
          body: "The Finkelstein equation needs acetone (or methanol) over the arrow and the sodium halide marked as a precipitate; that is how the reaction is driven forward.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-aryl-halides",
      name: "Aryl halides: halogenating the ring",
      intuition:
        "A benzene ring takes up chlorine or bromine by electrophilic substitution, but only with a Lewis acid catalyst and in the dark, at ordinary temperature. A group already on the ring decides where the halogen goes.",
      definition:
        "- Aryl chlorides and bromides are made by **electrophilic substitution**: halogen in the **dark**, at ordinary temperature, with a Lewis acid catalyst such as **Fe, \\(\\text{FeCl}_3\\) or anhydrous \\(\\text{AlCl}_3\\)**.\n" +
        "- Toluene with bromine and iron gives a mixture of **o-bromotoluene and p-bromotoluene**.\n" +
        "- Iodination is reversible; \\(\\text{HNO}_3\\) or \\(\\text{HIO}_4\\) oxidises the HI to \\(\\text{I}_2\\) and pushes the reaction forward.\n" +
        "- Fluoro compounds are **not** made this way: \\(\\text{F}_2\\) is too reactive.\n" +
        "- **Sandmeyer's reaction** (replacing the nitrogen of a diazonium salt) is the commonest way to make aryl halides; it is taught in the Amines chapter.",
      formula: {
        label: "Chlorination of benzene",
        latex: "\\text{C}_6\\text{H}_6 + \\text{Cl}_2 \\xrightarrow{\\text{FeCl}_3,\\ \\text{dark}} \\text{C}_6\\text{H}_5\\text{Cl} + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the reaction for the preparation of bromobenzene from benzene, with the conditions.",
        steps: [
          "Bromine attacks the ring by electrophilic substitution in the dark, with iron as the catalyst.",
          "\\(\\text{C}_6\\text{H}_6 + \\text{Br}_2 \\xrightarrow{\\text{Fe},\\ \\text{dark}} \\text{C}_6\\text{H}_5\\text{Br} + \\text{HBr}\\)",
        ],
        answer: "Bromobenzene, with HBr",
      },
      selfCheckExample: {
        prompt: "Why is fluorobenzene not prepared by direct fluorination of benzene?",
        steps: ["Fluorine is far too reactive for a controlled electrophilic substitution."],
        answer: "F₂ is highly reactive, so the reaction cannot be controlled",
      },
      practiceSet: [
        { prompt: "Name two Lewis acid catalysts used to chlorinate benzene.", answer: "Any two of Fe, FeCl₃ and anhydrous AlCl₃" },
        { prompt: "Which reaction is most commonly used to prepare aryl halides?", answer: "Sandmeyer's reaction, from a diazonium salt" },
        { prompt: "What is added in iodination of benzene to remove HI?", answer: "HNO₃ or HIO₄, which oxidises HI to I₂" },
      ],
      pyqExampleId: "6b3b8a90-864b-49ca-b78a-983815c14306",
      traps: [
        {
          title: "Conditions over the arrow",
          body: "For ring halogenation write 'dark' and the Lewis acid (Fe, \\(\\text{FeCl}_3\\) or anhydrous \\(\\text{AlCl}_3\\)) over the arrow. An equation without them does not earn the full mark.",
        },
      ],
    },
  ],
};
