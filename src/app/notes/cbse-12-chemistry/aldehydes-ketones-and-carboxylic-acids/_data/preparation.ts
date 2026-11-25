import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Aldehydes and Ketones",
  title: "Preparation of Aldehydes and Ketones",
  oneLineDefinition:
    "Aldehydes and ketones from alcohols and hydrocarbons; aldehydes by Rosenmund reduction, the Stephen reaction, DIBAL-H and the oxidation of toluene; ketones from dialkylcadmium, nitriles with Grignard reagents and Friedel-Crafts acylation.",
  whyItMatters:
    "20 questions, eighteen of them from board papers from 2022 to 2026. The board asks Rosenmund's reduction or its catalyst (2022, 2024, 2025), the Etard and Stephen reactions (2022, 2023), DIBAL-H on a nitrile (2022, 2025), the CrO₃ and acetic anhydride route from toluene (2025, 2026), dimethylcadmium with an acyl chloride (2023, 2026) and a Grignard reagent with a nitrile (2023, 2026). The textbook adds the reagents for six transformations and Friedel-Crafts acylation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcak-from-alcohols",
      name: "From alcohols and hydrocarbons",
      intuition:
        "An aldehyde or ketone sits one oxidation step above an alcohol. Oxidise a primary alcohol gently and you get an aldehyde; oxidise a secondary alcohol and you get a ketone. Hydrocarbons work too: ozone cuts a C=C into two carbonyl compounds, and water adds to a C≡C to give one.",
      definition:
        "- **Oxidation of alcohols:** primary alcohols give aldehydes and secondary alcohols give ketones. To stop a primary alcohol at the aldehyde, use a mild reagent such as **PCC** (pyridinium chlorochromate).\n" +
        "- **Dehydrogenation:** alcohol vapour passed over a heated **Cu or Ag** catalyst; primary gives an aldehyde, secondary a ketone. Suited to volatile alcohols, used in industry.\n" +
        "- **Ozonolysis of alkenes:** O₃, then **zinc dust and water**, gives aldehydes, ketones or both, depending on the groups on the double bond.\n" +
        "- **Hydration of alkynes:** water with **H₂SO₄ and HgSO₄**. Ethyne gives ethanal; every other alkyne gives a ketone.",
      table: {
        columns: ["Starting compound", "Reagent", "Product"],
        rows: [
          { cells: ["Primary alcohol", "PCC", "Aldehyde: \\(\\text{CH}_3(\\text{CH}_2)_4\\text{CH}_2\\text{OH} \\xrightarrow{\\text{PCC}} \\text{CH}_3(\\text{CH}_2)_4\\text{CHO}\\) (hexanal)"] },
          { cells: ["Secondary alcohol", "Anhydrous CrO₃ or K₂Cr₂O₇ in acid", "Ketone: cyclohexanol gives cyclohexanone"] },
          { cells: ["Alcohol vapour", "Heated Cu or Ag", "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Cu, heat}} \\text{CH}_3\\text{CH}_2\\text{CHO} + \\text{H}_2\\)"] },
          { cells: ["Alkene", "1. O₃ 2. Zn dust and H₂O", "\\(\\text{CH}_3\\text{CH=CHCH}_3 \\rightarrow 2\\,\\text{CH}_3\\text{CHO}\\) (but-2-ene gives ethanal)"] },
          { cells: ["Alkyne", "H₂O with H₂SO₄ and HgSO₄", "\\(\\text{HC}\\equiv\\text{CH} \\rightarrow \\text{CH}_3\\text{CHO}\\); propyne gives propanone"] },
        ],
      },
      selfCheckExample: {
        prompt: "Butan-2-ol vapour is passed over heated copper. Write the equation and name the product.",
        steps: [
          "Hot copper removes hydrogen from an alcohol (dehydrogenation).",
          "Butan-2-ol is a secondary alcohol, so it gives a ketone.",
          "\\(\\text{CH}_3\\text{CH(OH)CH}_2\\text{CH}_3 \\xrightarrow{\\text{Cu, heat}} \\text{CH}_3\\text{COCH}_2\\text{CH}_3 + \\text{H}_2\\)",
        ],
        answer: "Butanone, CH₃COCH₂CH₃, with hydrogen gas",
      },
      practiceSet: [
        { prompt: "Write the products of ozonolysis of 2-methylpropene, (CH₃)₂C=CH₂, followed by zinc and water.", answer: "Propanone, (CH₃)₂C=O, and methanal, HCHO" },
        { prompt: "Which alkyne gives an aldehyde on hydration with H₂SO₄ and HgSO₄?", answer: "Only ethyne, which gives ethanal; every other alkyne gives a ketone" },
        { prompt: "Write the products of ozonolysis of pent-2-ene, CH₃CH=CHCH₂CH₃, followed by zinc and water.", answer: "Ethanal, CH₃CHO, and propanal, CH₃CH₂CHO" },
      ],
      pyqExampleId: "3613c032-97e4-4df0-9b59-20640de15249",
      traps: [
        {
          title: "Overshooting a primary alcohol to the acid",
          body: "Strong oxidising agents such as KMnO₄ carry a primary alcohol past the aldehyde to the carboxylic acid. To stop at the aldehyde, name PCC.",
        },
        {
          title: "Hydrating propyne to propanal",
          body: "Water adds to an alkyne so that the oxygen goes on the inner carbon. Only ethyne gives an aldehyde; propyne gives propanone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcak-aldehyde-routes",
      name: "Aldehydes from acyl chlorides, nitriles, esters and toluene",
      intuition:
        "Each method here is a way of stopping at the aldehyde. Reduce an acyl chloride or a nitrile with a gentle reagent, or oxidise the methyl group of toluene with a reagent that turns the aldehyde into something that cannot be oxidised further until you hydrolyse it.",
      definition:
        "- **Rosenmund reduction:** an acyl chloride is hydrogenated over **palladium on barium sulphate**; the reduction stops at the aldehyde.\n" +
        "- **Stephen reaction:** a nitrile is reduced by **SnCl₂ and HCl** to an imine, which is hydrolysed to the aldehyde.\n" +
        "- **DIBAL-H** (diisobutylaluminium hydride) reduces a nitrile to an imine, then water gives the aldehyde. It also reduces **esters to aldehydes**, and it leaves a C=C in the same molecule alone.\n" +
        "- **Etard reaction:** chromyl chloride (CrO₂Cl₂) turns the methyl group of toluene into a chromium complex; hydrolysis gives benzaldehyde.\n" +
        "- **CrO₃ in acetic anhydride:** toluene gives **benzylidene diacetate**, which aqueous acid hydrolyses to benzaldehyde.\n" +
        "- **Side chain chlorination** of toluene gives benzal chloride, C₆H₅CHCl₂, which on hydrolysis gives benzaldehyde (the commercial method).\n" +
        "- **Gatterman-Koch reaction:** benzene with **CO and HCl** and anhydrous AlCl₃ or CuCl gives benzaldehyde.",
      table: {
        columns: ["Method", "Reaction", "Point to remember"],
        rows: [
          {
            cells: ["Rosenmund reduction", "\\(\\text{R-COCl} + \\text{H}_2 \\xrightarrow{\\text{Pd-BaSO}_4} \\text{R-CHO} + \\text{HCl}\\)", "Gives aldehydes only, never ketones"],
            pyqExampleId: "5bc8ea87-d826-4a88-a0f5-b56ac63368cf",
            noteAmber: "Board 2025 asked how acetaldehyde is made from acetyl chloride: this reaction.",
          },
          {
            cells: ["Stephen reaction", "\\(\\text{R-CN} \\xrightarrow{\\text{SnCl}_2 + \\text{HCl}} \\text{R-CH=NH} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-CHO}\\)", "The imine is hydrolysed to the aldehyde"],
            pyqExampleId: "ddf9f73d-e257-4b5e-8871-d9c685761662",
            noteAmber: "Board 2022 asked the Rosenmund, Etard and Stephen equations in one question.",
          },
          {
            cells: ["DIBAL-H", "\\(\\text{R-CN} \\xrightarrow[\\text{2. H}_2\\text{O}]{\\text{1. AlH(i-Bu)}_2} \\text{R-CHO}\\)", "Also turns an ester into an aldehyde; a C=C is not touched"],
            pyqExampleId: "8be0445f-66a7-4c96-92eb-6c0bd19f4eb8",
            noteAmber: "Board 2025 asked which nitrile, C₄H₅N, gives but-2-enal with DIBAL-H.",
          },
          { cells: ["Etard reaction", "\\(\\text{C}_6\\text{H}_5\\text{CH}_3 \\xrightarrow[\\text{2. H}_3\\text{O}^+]{\\text{1. CrO}_2\\text{Cl}_2,\\ \\text{CS}_2} \\text{C}_6\\text{H}_5\\text{CHO}\\)", "A chromium complex forms first, then hydrolysis"] },
          {
            cells: ["CrO₃ in acetic anhydride", "\\(\\text{C}_6\\text{H}_5\\text{CH}_3 \\xrightarrow{\\text{CrO}_3,\\ (\\text{CH}_3\\text{CO})_2\\text{O}} \\text{C}_6\\text{H}_5\\text{CH(OCOCH}_3)_2 \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_6\\text{H}_5\\text{CHO}\\)", "Benzylidene diacetate resists further oxidation"],
            pyqExampleId: "c3cf1c3a-8902-4ad0-8163-d9ab6fba2d68",
            noteAmber: "Board 2025 asked this route, then a Cannizzaro step on the benzaldehyde; 2026 asked it twice more.",
          },
          { cells: ["Side chain chlorination", "\\(\\text{C}_6\\text{H}_5\\text{CH}_3 \\xrightarrow{\\text{Cl}_2,\\ h\\nu} \\text{C}_6\\text{H}_5\\text{CHCl}_2 \\xrightarrow{\\text{H}_2\\text{O}} \\text{C}_6\\text{H}_5\\text{CHO}\\)", "Commercial method for benzaldehyde"] },
          { cells: ["Gatterman-Koch reaction", "\\(\\text{C}_6\\text{H}_6 + \\text{CO} + \\text{HCl} \\xrightarrow{\\text{anhyd. AlCl}_3/\\text{CuCl}} \\text{C}_6\\text{H}_5\\text{CHO}\\)", "Puts a -CHO group straight onto the ring"] },
        ],
      },
      selfCheckExample: {
        prompt: "Write the equations for making propanal from propanenitrile by the Stephen reaction.",
        steps: [
          "Stannous chloride and HCl reduce the nitrile to the imine.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CN} \\xrightarrow{\\text{SnCl}_2 + \\text{HCl}} \\text{CH}_3\\text{CH}_2\\text{CH=NH}\\)",
          "Hydrolysis of the imine gives the aldehyde.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH=NH} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{CH}_3\\text{CH}_2\\text{CHO}\\)",
        ],
        answer: "Propanal, CH₃CH₂CHO",
      },
      practiceSet: [
        { prompt: "Name the reagent that converts ethyl ethanoate into ethanal.", answer: "DIBAL-H (diisobutylaluminium hydride), followed by water" },
        { prompt: "Why is toluene not oxidised to benzaldehyde with hot KMnO₄?", answer: "KMnO₄ carries it on to benzoic acid; the Etard reaction or CrO₃ in acetic anhydride stops at the aldehyde" },
        { prompt: "Name the reaction: benzene with CO and HCl in the presence of anhydrous AlCl₃.", answer: "Gatterman-Koch reaction; the product is benzaldehyde" },
      ],
      pyqExampleId: "65c9986f-34ce-491e-9c9d-3b3311e49eda",
      traps: [
        {
          title: "Reducing a nitrile with LiAlH₄ to get an aldehyde",
          body: "LiAlH₄ carries a nitrile on to the amine. To stop at the aldehyde use SnCl₂ and HCl (Stephen reaction) or DIBAL-H, each followed by hydrolysis.",
        },
        {
          title: "Forgetting the hydrolysis step",
          body: "The Etard reaction, the CrO₃ route, the Stephen reaction and DIBAL-H all give an intermediate first (complex, diacetate or imine). Write the H₃O⁺ or water step, or the aldehyde never appears.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-ketone-routes",
      name: "Ketones from acyl chlorides, nitriles and benzene",
      intuition:
        "To make a ketone, a carbon group must be joined to a C=O carbon. A dialkylcadmium does it to an acyl chloride and is gentle enough to stop at the ketone. A Grignard reagent does it to a nitrile, and hydrolysis turns the C=N into C=O. On a benzene ring, Friedel-Crafts acylation puts the acyl group on directly.",
      definition:
        "- **From acyl chlorides:** treat with a **dialkylcadmium**, made from cadmium chloride and a Grignard reagent. Each R of R₂Cd makes one ketone.\n" +
        "- **From nitriles:** a **Grignard reagent** adds to the C≡N; **hydrolysis** of the product gives a ketone. The nitrile carbon becomes the C=O carbon.\n" +
        "- **Friedel-Crafts acylation:** benzene or a substituted benzene with an **acyl chloride** (or anhydride) and **anhydrous AlCl₃** gives an aromatic ketone.\n" +
        "- Ketones also come from secondary alcohols, ozonolysis of alkenes and hydration of alkynes (other than ethyne).",
      formula: {
        label: "Ketone from an acyl chloride and a dialkylcadmium",
        latex: "2\\,\\text{R-COCl} + \\text{R'}_2\\text{Cd} \\rightarrow 2\\,\\text{R-CO-R'} + \\text{CdCl}_2",
        symbols: [
          { symbol: "\\(\\text{R'}_2\\text{Cd}\\)", meaning: "dialkylcadmium, from cadmium chloride and a Grignard reagent" },
        ],
      },
      authoredExample: {
        prompt: "How will you make butanone from propanenitrile?",
        steps: [
          "Count carbons: propanenitrile has three, butanone four, so one carbon must be added: use CH₃MgBr.",
          "The Grignard reagent adds across the C≡N: \\(\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{N} + \\text{CH}_3\\text{MgBr} \\rightarrow \\text{CH}_3\\text{CH}_2\\text{C(=NMgBr)CH}_3\\)",
          "Hydrolysis turns the C=N into C=O: \\(\\text{CH}_3\\text{CH}_2\\text{C(=NMgBr)CH}_3 \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{CH}_3\\text{CH}_2\\text{COCH}_3\\)",
        ],
        answer: "CH₃MgBr in dry ether, then hydrolysis: butanone, CH₃CH₂COCH₃",
      },
      selfCheckExample: {
        prompt: "Write the product when benzene is treated with ethanoyl chloride and anhydrous AlCl₃.",
        steps: [
          "This is Friedel-Crafts acylation: the CH₃CO group goes onto the ring.",
          "\\(\\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{anhyd. AlCl}_3} \\text{C}_6\\text{H}_5\\text{COCH}_3 + \\text{HCl}\\)",
        ],
        answer: "Acetophenone, C₆H₅COCH₃",
      },
      practiceSet: [
        { prompt: "Write the equation for making benzophenone from benzene.", answer: "C₆H₆ + C₆H₅COCl with anhydrous AlCl₃ gives C₆H₅COC₆H₅ + HCl" },
        { prompt: "Which ketone forms from benzonitrile with C₂H₅MgBr followed by hydrolysis?", answer: "Propiophenone, C₆H₅COCH₂CH₃ (1-phenylpropan-1-one)" },
        { prompt: "How is a dialkylcadmium prepared?", answer: "From cadmium chloride and a Grignard reagent" },
      ],
      pyqExampleId: "5c244729-8a7c-457d-bb33-539d0e2132dc",
      traps: [
        {
          title: "Using a Grignard reagent on an acyl chloride",
          body: "A Grignard reagent attacks the ketone as fast as it forms and ends at a tertiary alcohol. A dialkylcadmium is milder and stops at the ketone.",
        },
        {
          title: "Expecting an amine from a nitrile and a Grignard reagent",
          body: "Hydrolysis of the Grignard adduct of a nitrile gives a ketone. The nitrogen is lost as ammonia; no amine forms.",
        },
        {
          title: "Nitrating before acylating",
          body: "To make m-nitroacetophenone from benzene, acylate first and then nitrate: the -COCH₃ group sends the nitro group to the meta position. Nitrobenzene is too deactivated to undergo Friedel-Crafts acylation at all.",
        },
      ],
    },
  ],
};
