import type { SubtopicNote } from "@/app/notes/_types";

export const PREP_ALD_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Aldehydes and Ketones",
  title: "Preparation of Aldehydes and Ketones",
  oneLineDefinition:
    "Aldehydes and ketones are made by stopping an oxidation or a reduction at the carbonyl level, by named reactions such as Rosenmund, Stephen, Etard and Gattermann–Koch, and from alkynes, gem-dihalides and alkenes.",
  whyItMatters:
    "Twenty-five PYQs, one numerical, one from 2026, the largest page in the chapter. Eleven name a reaction or its reagents; eight ask how far a reagent takes an alcohol, an ester, a nitrile or an acid; six make a carbonyl compound from a hydrocarbon or one of its halides.",
  concepts: [
    // C1 — named reactions
    {
      kind: "reference" as const,
      slug: "jcald-named-prep",
      name: "Named routes to aldehydes and ketones",
      intuition:
        "Each named method starts from a different compound and uses a reagent that stops at the carbonyl group. Learn each one as a set of three: the starting compound, the reagent and the name.",
      definition:
        "- **Rosenmund reduction**: an acyl chloride is hydrogenated over palladium on barium sulphate. The catalyst is partly poisoned (with sulphur or quinoline), so the aldehyde is not reduced further.\n" +
        "- **Stephen reduction**: \\(\\mathrm{SnCl_2}\\) and HCl reduce a nitrile to an imine salt; hydrolysis then gives the aldehyde.\n" +
        "- **Etard reaction**: chromyl chloride in \\(\\mathrm{CS_2}\\) oxidises the methyl group of toluene to a chromium complex, and water hydrolyses it to benzaldehyde.\n" +
        "- **Chromic oxide in acetic anhydride** (273–283 K) traps the aldehyde as benzylidene diacetate, \\(\\mathrm{C_6H_5CH(OCOCH_3)_2}\\), so it is not oxidised further; acid hydrolysis releases it.\n" +
        "- **Gattermann–Koch reaction**: benzene, CO and HCl with anhydrous \\(\\mathrm{AlCl_3}\\) and CuCl give benzaldehyde.\n" +
        "- **Friedel–Crafts acylation** gives aryl ketones and stops after one acyl group, because the ketone deactivates the ring.",
      table: {
        columns: ["Name", "Starting compound", "Reagents", "Product"],
        rows: [
          { cells: ["Rosenmund reduction", "Acyl chloride \\(\\mathrm{RCOCl}\\)", "\\(\\mathrm{H_2}\\), Pd–\\(\\mathrm{BaSO_4}\\) (poisoned)", "Aldehyde \\(\\mathrm{RCHO}\\)"] },
          { cells: ["Stephen reduction", "Nitrile \\(\\mathrm{RC{\\equiv}N}\\)", "\\(\\mathrm{SnCl_2}\\), HCl, then \\(\\mathrm{H_3O^+}\\)", "Aldehyde \\(\\mathrm{RCHO}\\), through the imine \\(\\mathrm{RCH{=}NH}\\)"] },
          { cells: ["Etard reaction", "Toluene", "\\(\\mathrm{CrO_2Cl_2}\\) in \\(\\mathrm{CS_2}\\), then \\(\\mathrm{H_3O^+}\\)", "Benzaldehyde, through \\(\\mathrm{C_6H_5CH(OCrOHCl_2)_2}\\)"] },
          { cells: ["Chromic oxide oxidation", "Toluene", "\\(\\mathrm{CrO_3}\\) in \\(\\mathrm{(CH_3CO)_2O}\\), 273–283 K, then \\(\\mathrm{H_3O^+}\\)", "Benzaldehyde, through benzylidene diacetate"] },
          { cells: ["Gattermann–Koch reaction", "Benzene", "CO, HCl, anhydrous \\(\\mathrm{AlCl_3}\\) and CuCl", "Benzaldehyde"] },
          { cells: ["Friedel–Crafts acylation", "Benzene", "\\(\\mathrm{RCOCl}\\), anhydrous \\(\\mathrm{AlCl_3}\\)", "Aryl ketone \\(\\mathrm{C_6H_5COR}\\); with \\(\\mathrm{C_6H_5COCl}\\), benzophenone"] },
          { cells: ["Dialkylcadmium route", "Acyl chloride \\(\\mathrm{RCOCl}\\)", "\\(\\mathrm{R'_2Cd}\\)", "Ketone \\(\\mathrm{RCOR'}\\)"] },
        ],
        caption: "Rosenmund starts from an acyl chloride, Stephen from a nitrile, Etard from toluene and Gattermann–Koch from benzene.",
      },
      selfCheckExample: {
        prompt: "Name a method, with its reagents, for each change: propanoyl chloride to propanal; benzonitrile to benzaldehyde; 4-nitrotoluene to 4-nitrobenzaldehyde.",
        steps: [
          "An acyl chloride goes to the aldehyde by hydrogenation over a poisoned catalyst: Rosenmund.",
          "A nitrile goes to the aldehyde through the imine: Stephen (\\(\\mathrm{SnCl_2}\\), HCl, then water).",
          "A methyl group on a ring goes to CHO without going on to COOH: Etard (\\(\\mathrm{CrO_2Cl_2}\\), then water), or \\(\\mathrm{CrO_3}\\) in acetic anhydride.",
        ],
        answer: "Rosenmund (\\(\\mathrm{H_2}\\), Pd–\\(\\mathrm{BaSO_4}\\)); Stephen (\\(\\mathrm{SnCl_2}\\)/HCl, \\(\\mathrm{H_3O^+}\\)); Etard (\\(\\mathrm{CrO_2Cl_2}\\), \\(\\mathrm{H_3O^+}\\))",
      },
      practiceSet: [
        { prompt: "Which reaction turns benzene into benzaldehyde in one step?", answer: "Gattermann–Koch: CO and HCl with anhydrous \\(\\mathrm{AlCl_3}\\) and CuCl" },
        { prompt: "Why is the palladium in the Rosenmund reduction poisoned?", answer: "So that the aldehyde is not reduced further to the alcohol" },
        { prompt: "What does benzene give with ethanoyl chloride and anhydrous \\(\\mathrm{AlCl_3}\\)?", answer: "Acetophenone, \\(\\mathrm{C_6H_5COCH_3}\\)" },
        { prompt: "Which intermediate does \\(\\mathrm{CrO_3}\\) in acetic anhydride form from toluene?", answer: "Benzylidene diacetate, \\(\\mathrm{C_6H_5CH(OCOCH_3)_2}\\)" },
      ],
      pyqExampleId: "581b5ae1-fd2b-41ea-b509-8f6b4e759c27", // 2026 — match reagents with Rosenmund, Stephen, Etard and Gattermann–Koch
      traps: [
        {
          title: "The Stephen reduction needs the water step",
          body: "\\(\\mathrm{SnCl_2}\\) and HCl stop at the imine salt. Only hydrolysis with \\(\\mathrm{H_3O^+}\\) turns it into the aldehyde, so a scheme without that step does not give RCHO yet.",
        },
        {
          title: "Etard and Gattermann–Koch start from different rings",
          body: "Etard oxidises a methyl group already on the ring (toluene). Gattermann–Koch adds a new CHO group to benzene itself. A match list often swaps these two.",
        },
      ],
    },

    // C2 — reagents that stop at the carbonyl
    {
      kind: "reference" as const,
      slug: "jcald-prep-controlled",
      name: "Reagents that stop at the aldehyde or ketone",
      intuition:
        "Many reagents pass through the aldehyde level, but most do not stop there. Oxidants in water go on to the acid; strong hydrides go on to the alcohol. The question is always which reagent halts at the carbonyl group.",
      definition:
        "- **PCC** (pyridinium chlorochromate) in dichloromethane oxidises a 1° alcohol to the aldehyde and stops, because no water is present.\n" +
        "- Chromic acid (\\(\\mathrm{CrO_3}\\)–\\(\\mathrm{H_2SO_4}\\), the Jones reagent), acidified dichromate and hot \\(\\mathrm{KMnO_4}\\) take a 1° alcohol on to the carboxylic acid. In water the aldehyde forms a hydrate, and the hydrate is oxidised again.\n" +
        "- A 2° alcohol stops at the ketone with any of these oxidants; a 3° alcohol is not oxidised.\n" +
        "- **DIBAL-H** at low temperature adds only one hydride to an ester or a nitrile, and work-up gives the aldehyde. \\(\\mathrm{LiAlH_4}\\) takes an ester down to two alcohols; \\(\\mathrm{NaBH_4}\\) does not reduce an ester at all.\n" +
        "- Hydroboration–oxidation of a terminal alkene gives the 1° alcohol, and PCC then gives the aldehyde, with oxygen on the end carbon.",
      table: {
        columns: ["Reagent", "Acts on", "Stops at"],
        rows: [
          { cells: ["PCC in \\(\\mathrm{CH_2Cl_2}\\)", "1° alcohol \\(\\mathrm{RCH_2OH}\\)", "Aldehyde \\(\\mathrm{RCHO}\\)"] },
          { cells: ["\\(\\mathrm{CrO_3}\\)–\\(\\mathrm{H_2SO_4}\\) (Jones) or \\(\\mathrm{K_2Cr_2O_7}\\)–\\(\\mathrm{H_2SO_4}\\)", "1° alcohol; 2° alcohol", "Carboxylic acid \\(\\mathrm{RCOOH}\\); ketone"] },
          { cells: ["Hot \\(\\mathrm{KMnO_4}\\)", "1° alcohol or aldehyde", "Carboxylic acid"] },
          { cells: ["Cu at 573 K", "1° or 2° alcohol vapour", "Aldehyde or ketone (dehydrogenation)"] },
          { cells: ["DIBAL-H at low temperature, then \\(\\mathrm{H_2O}\\)", "Ester \\(\\mathrm{RCOOR'}\\) or nitrile \\(\\mathrm{RCN}\\)", "Aldehyde \\(\\mathrm{RCHO}\\)"] },
          { cells: ["\\(\\mathrm{LiAlH_4}\\), then \\(\\mathrm{H_3O^+}\\)", "Ester \\(\\mathrm{RCOOR'}\\)", "Two alcohols, \\(\\mathrm{RCH_2OH}\\) and \\(\\mathrm{R'OH}\\)"] },
          { cells: ["Dilute \\(\\mathrm{H_2SO_4}\\), water", "Ester \\(\\mathrm{RCOOR'}\\)", "Acid \\(\\mathrm{RCOOH}\\) and alcohol \\(\\mathrm{R'OH}\\) (hydrolysis)"] },
          { cells: ["\\(\\mathrm{BH_3}\\); \\(\\mathrm{H_2O_2}\\), \\(\\mathrm{OH^-}\\); then PCC", "Terminal alkene \\(\\mathrm{RCH{=}CH_2}\\)", "Aldehyde \\(\\mathrm{RCH_2CHO}\\)"] },
          { cells: ["MnO at about 573 K", "Benzoic acid vapour", "Benzaldehyde, in one step"] },
        ],
        caption: "PCC and DIBAL-H are the two reagents built to stop at the aldehyde.",
      },
      selfCheckExample: {
        prompt: "Choose a reagent for each change: hexan-1-ol to hexanal; hexan-1-ol to hexanoic acid; methyl hexanoate to hexanal; hex-1-ene to hexanal.",
        steps: [
          "Alcohol to aldehyde and no further: PCC, which works without water.",
          "Alcohol all the way to the acid: an aqueous oxidant such as the Jones reagent or \\(\\mathrm{KMnO_4}\\).",
          "Ester to aldehyde: DIBAL-H at low temperature, then water.",
          "Alkene to the aldehyde with oxygen on the end carbon: hydroboration–oxidation gives hexan-1-ol, then PCC.",
        ],
        answer: "PCC; Jones reagent (or \\(\\mathrm{KMnO_4}\\)); DIBAL-H then \\(\\mathrm{H_2O}\\); \\(\\mathrm{BH_3}\\), \\(\\mathrm{H_2O_2/OH^-}\\), then PCC",
      },
      practiceSet: [
        { prompt: "What does butan-2-ol give with PCC?", answer: "Butanone: a 2° alcohol stops at the ketone" },
        { prompt: "Does \\(\\mathrm{NaBH_4}\\) reduce ethyl benzoate?", answer: "No: \\(\\mathrm{NaBH_4}\\) does not reduce esters" },
        { prompt: "What does propanenitrile give with DIBAL-H and then water?", answer: "Propanal, \\(\\mathrm{CH_3CH_2CHO}\\)" },
        { prompt: "Why does acidified dichromate take a 1° alcohol past the aldehyde?", answer: "In water the aldehyde forms a hydrate, which is oxidised again to the acid" },
      ],
      pyqExampleId: "ff5a9194-ac29-4dd8-82e7-bdc545b8ad41", // 2021 — match ester and nitrile changes with DIBAL-H, SnCl2/HCl, CH3MgBr and hydrolysis
      traps: [
        {
          title: "PCC stops at the aldehyde; the Jones reagent does not",
          body: "Both are chromium(VI) reagents. PCC is used without water and stops at RCHO. The Jones reagent is aqueous and takes a 1° alcohol on to RCOOH.",
        },
        {
          title: "Hydroboration puts the oxygen on the end carbon",
          body: "Acid-catalysed hydration or \\(\\mathrm{HgSO_4}\\) hydration follows Markovnikov's rule and leads to a ketone. Only hydroboration–oxidation puts OH on the terminal carbon, so only that route leads to the aldehyde.",
        },
      ],
    },

    // C3 — from hydrocarbons
    {
      kind: "reference" as const,
      slug: "jcald-prep-hydrocarbons",
      name: "Carbonyl compounds from alkynes, gem-dihalides and alkenes",
      intuition:
        "A hydrocarbon becomes a carbonyl compound when water adds across a triple bond, when two halogens on one carbon are hydrolysed, or when a double bond is cut. Where the oxygen lands decides aldehyde or ketone.",
      definition:
        "- **Alkyne hydration** (\\(\\mathrm{HgSO_4}\\), dilute \\(\\mathrm{H_2SO_4}\\)) goes through an enol that tautomerises. Addition follows Markovnikov's rule, so ethyne gives ethanal and every other alkyne gives a ketone.\n" +
        "- **Gem-dihalides** hydrolyse to a carbonyl compound: two halogens on an end carbon (\\(\\mathrm{RCHX_2}\\)) give an aldehyde; two on a middle carbon (\\(\\mathrm{RCX_2R'}\\)) give a ketone.\n" +
        "- **Side-chain chlorination** of toluene gives benzal chloride, \\(\\mathrm{C_6H_5CHCl_2}\\), which hydrolyses to benzaldehyde.\n" +
        "- **Ozonolysis** cuts a C=C; each carbon of the double bond becomes a C=O.\n" +
        "- **Hydroformylation** (the oxo process) adds H and CHO across a C=C, giving an aldehyde one carbon longer, mostly the straight chain.",
      table: {
        columns: ["Starting compound", "Reagents", "Product"],
        rows: [
          { cells: ["Ethyne \\(\\mathrm{HC{\\equiv}CH}\\)", "\\(\\mathrm{H_2O}\\), \\(\\mathrm{HgSO_4}\\), dilute \\(\\mathrm{H_2SO_4}\\)", "Ethanal \\(\\mathrm{CH_3CHO}\\)"] },
          { cells: ["Terminal alkyne \\(\\mathrm{RC{\\equiv}CH}\\)", "\\(\\mathrm{H_2O}\\), \\(\\mathrm{HgSO_4}\\), dilute \\(\\mathrm{H_2SO_4}\\)", "Methyl ketone \\(\\mathrm{RCOCH_3}\\)"] },
          { cells: ["Terminal gem-dihalide \\(\\mathrm{RCHCl_2}\\)", "Aqueous KOH (hydrolysis)", "Aldehyde \\(\\mathrm{RCHO}\\)"] },
          { cells: ["Internal gem-dihalide \\(\\mathrm{RCCl_2R'}\\)", "Aqueous KOH (hydrolysis)", "Ketone \\(\\mathrm{RCOR'}\\)"] },
          { cells: ["Toluene", "\\(\\mathrm{Cl_2}\\) and light, then water at 373 K", "Benzaldehyde, through \\(\\mathrm{C_6H_5CHCl_2}\\)"] },
          { cells: ["Alkene", "\\(\\mathrm{O_3}\\), then Zn and water", "Aldehydes or ketones, one from each end of the C=C"] },
          { cells: ["Alkene \\(\\mathrm{RCH{=}CH_2}\\)", "CO and \\(\\mathrm{H_2}\\), cobalt or rhodium catalyst", "Aldehyde \\(\\mathrm{RCH_2CH_2CHO}\\), one carbon longer"] },
          { cells: ["Methane", "\\(\\mathrm{O_2}\\) over a molybdenum oxide catalyst, heat", "Methanal \\(\\mathrm{HCHO}\\)"] },
        ],
        caption: "Only ethyne gives an aldehyde on hydration; an end-carbon gem-dihalide gives an aldehyde on hydrolysis.",
      },
      selfCheckExample: {
        prompt: "Give the product: 1,1-dichloropentane with aqueous KOH; 3,3-dichloropentane with aqueous KOH; pent-1-yne with water, \\(\\mathrm{HgSO_4}\\) and dilute \\(\\mathrm{H_2SO_4}\\).",
        steps: [
          "1,1-Dichloropentane has both chlorines on the end carbon, so it gives the aldehyde.",
          "3,3-Dichloropentane has both on a middle carbon, so it gives the ketone at that carbon.",
          "Pent-1-yne adds water by Markovnikov's rule: OH goes to C-2, and the enol becomes a ketone.",
        ],
        answer: "Pentanal; pentan-3-one; pentan-2-one",
      },
      practiceSet: [
        { prompt: "What does ethyne give with water, \\(\\mathrm{HgSO_4}\\) and dilute \\(\\mathrm{H_2SO_4}\\)?", answer: "Ethanal" },
        { prompt: "What does hex-1-yne give with the same reagents?", answer: "Hexan-2-one" },
        { prompt: "What is the main product of the oxo reaction of propene?", answer: "Butanal, \\(\\mathrm{CH_3CH_2CH_2CHO}\\)" },
        { prompt: "What does benzal chloride give on hydrolysis?", answer: "Benzaldehyde" },
      ],
      pyqExampleId: "f30d286b-a435-4581-88ec-e8742bf63d14", // 2021 — gem-dihalide C4H8Cl2 hydrolysed to a ketone that fails Tollens'
      traps: [
        {
          title: "Alkyne hydration gives an aldehyde only from ethyne",
          body: "Every other alkyne gives a ketone, because the OH goes to the more substituted carbon. Propanal, for example, cannot be made this way.",
        },
        {
          title: "The position of the two halogens decides the product",
          body: "Both halogens must sit on one carbon. On an end carbon they give an aldehyde, on a middle carbon a ketone. A 1,2-dihalide is not a gem-dihalide and does not give a carbonyl compound this way.",
        },
      ],
    },
  ],
};
