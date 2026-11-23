import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Aldehydes and Ketones",
  title: "Preparing Aldehydes and Ketones",
  oneLineDefinition:
    "Aldehydes and ketones from alcohols, alkenes and alkynes, from acyl chlorides (Rosenmund reduction, dialkyl cadmium, Friedel-Crafts acylation), from nitriles and esters (Stephen reaction, DIBAl-H, Grignard reagents) and from aromatic hydrocarbons (Etard reaction, Gatterman-Koch formylation).",
  whyItMatters:
    "17 questions, fourteen of them from board papers from 2019 to 2026, six in 2024 alone. Rosenmund reduction and Gatterman-Koch formylation were each asked four times (2019, 2024, 2025 and 2026). The board also asked the Etard reaction, the Stephen reaction, Friedel-Crafts acylation, ozonolysis, the hydration of an alkyne and the best reagent to stop a primary alcohol at the aldehyde.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccak-general-methods",
      name: "General methods: oxidation of alcohols, ozonolysis and hydration of alkynes",
      intuition:
        "Most general routes either take an alcohol one step up in oxidation, or work on a multiple bond. A primary alcohol gives an aldehyde and a secondary alcohol a ketone. Ozonolysis cuts a C=C bond and puts an oxygen on each of its carbons. Water added across a C≡C bond gives an enol, which at once becomes a carbonyl compound.",
      definition:
        "- **Oxidation of alcohols:** primary alcohols give aldehydes, secondary alcohols give ketones. Strong oxidising agents carry an aldehyde on to the acid; pyridinium chlorochromate (PCC) stops a primary alcohol at the aldehyde.\n" +
        "- **Dehydrogenation:** vapours of a primary or secondary alcohol passed over hot copper give the aldehyde or ketone. This is the industrial method.\n" +
        "- **Ozonolysis:** an alkene with ozone gives an ozonide, which zinc dust and water decompose to aldehydes and/or ketones. Each carbon of the C=C keeps its two groups and gains =O, so a carbon carrying a hydrogen gives an aldehyde and a carbon carrying two alkyl groups gives a ketone. Zinc dust removes the hydrogen peroxide formed, so the aldehyde is not oxidised further.\n" +
        "- **Hydration of alkynes:** an alkyne with water in presence of 40% H₂SO₄ and 1% HgSO₄ gives an aldehyde or a ketone. Ethyne gives ethanal; other alkynes give ketones, because the OH goes to the carbon that carries the alkyl group (Markovnikov's rule) and the enol rearranges.",
      formula: {
        label: "Ozonolysis",
        latex: "\\text{R-CH=CH-R'} \\xrightarrow[\\text{Zn, H}_2\\text{O}]{\\text{O}_3} \\text{R-CHO} + \\text{R'-CHO}",
      },
      authoredExample: {
        prompt: "Write the reaction for the ozonolysis of but-2-ene followed by treatment with zinc dust and water, and name the product.",
        steps: [
          "But-2-ene is \\(\\text{CH}_3\\text{-CH=CH-CH}_3\\). Ozone adds across the C=C bond to give the ozonide.",
          "\\(\\text{CH}_3\\text{-CH=CH-CH}_3 \\xrightarrow{\\text{O}_3} \\text{ozonide} \\xrightarrow{\\text{Zn, H}_2\\text{O}} 2\\,\\text{CH}_3\\text{-CHO}\\)",
          "Each carbon of the double bond carried one H and one \\(\\text{CH}_3\\), so each half becomes an aldehyde.",
        ],
        answer: "Two molecules of ethanal (acetaldehyde)",
      },
      selfCheckExample: {
        prompt: "Which carbonyl compound is formed when butan-2-ol is oxidised?",
        steps: ["Butan-2-ol is a secondary alcohol, and a secondary alcohol gives a ketone with the same carbon chain."],
        answer: "Butanone (ethyl methyl ketone)",
      },
      practiceSet: [
        { prompt: "What is the role of zinc dust in ozonolysis?", answer: "It decomposes the ozonide and removes the hydrogen peroxide formed, so the aldehyde is not oxidised to an acid" },
        { prompt: "Which alkyne gives an aldehyde on hydration with dilute H₂SO₄ and HgSO₄?", answer: "Ethyne, which gives ethanal" },
        { prompt: "What is formed when ethanol vapour is passed over hot copper?", answer: "Ethanal (dehydrogenation)" },
      ],
      pyqExampleId: "e7a70c19-5351-4ad1-a442-4233365842dd",
      traps: [
        {
          title: "An aldehyde from every alkyne",
          body: "Only ethyne gives an aldehyde on hydration. In any other alkyne the OH goes to the carbon carrying the alkyl group, so the product is a ketone.",
        },
        {
          title: "Naming KMnO₄ to make an aldehyde",
          body: "Potassium permanganate and acidified dichromate carry a primary alcohol on to the carboxylic acid. To stop at the aldehyde, the reagent is PCC.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-from-acyl-chlorides",
      name: "From acyl chlorides: Rosenmund reduction, dialkyl cadmium and Friedel-Crafts acylation",
      intuition:
        "An acyl chloride, R-COCl, already has its carbonyl group. Replace the Cl by H and you have an aldehyde; replace it by an alkyl or aryl group and you have a ketone. Each swap has its own reagent.",
      definition:
        "- **Rosenmund reduction (aldehydes):** an acyl chloride is reduced by hydrogen over a palladium catalyst poisoned with barium sulfate. The poisoned catalyst stops the reduction at the aldehyde; pure palladium would carry it on to the alcohol (benzoyl chloride would give benzyl alcohol).\n" +
        "- **Dialkyl cadmium (aliphatic ketones):** made by treating cadmium chloride with a Grignard reagent, \\(2\\,\\text{R-MgX} + \\text{CdCl}_2 \\to \\text{R}_2\\text{Cd} + 2\\,\\text{Mg(X)Cl}\\). It replaces the Cl of an acyl chloride by R: \\(2\\,\\text{R'-COCl} + \\text{R}_2\\text{Cd} \\to 2\\,\\text{R'-CO-R} + \\text{CdCl}_2\\).\n" +
        "- **Friedel-Crafts acylation (aromatic ketones):** an arene with an acyl chloride in presence of anhydrous AlCl₃: \\(\\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{anhyd. AlCl}_3} \\text{C}_6\\text{H}_5\\text{COCH}_3 + \\text{HCl}\\).",
      formula: {
        label: "Rosenmund reduction",
        latex: "\\text{R-COCl} + \\text{H}_2 \\xrightarrow{\\text{Pd-BaSO}_4} \\text{R-CHO} + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the reactions for preparing acetophenone from benzoyl chloride and dimethyl cadmium, starting from methylmagnesium bromide.",
        steps: [
          "Dimethyl cadmium from the Grignard reagent: \\(2\\,\\text{CH}_3\\text{MgBr} + \\text{CdCl}_2 \\to (\\text{CH}_3)_2\\text{Cd} + 2\\,\\text{Mg(Br)Cl}\\).",
          "It replaces the Cl of benzoyl chloride by \\(\\text{CH}_3\\): \\(2\\,\\text{C}_6\\text{H}_5\\text{COCl} + (\\text{CH}_3)_2\\text{Cd} \\to 2\\,\\text{C}_6\\text{H}_5\\text{COCH}_3 + \\text{CdCl}_2\\).",
        ],
        answer: "Acetophenone, C₆H₅COCH₃ (methyl phenyl ketone)",
      },
      selfCheckExample: {
        prompt: "Which alcohol is formed when benzoyl chloride is reduced with hydrogen over pure (unpoisoned) palladium?",
        steps: ["Without the BaSO₄ poison the reduction does not stop at benzaldehyde; it goes on to the primary alcohol."],
        answer: "Benzyl alcohol (phenylmethanol)",
      },
      practiceSet: [
        { prompt: "Why is the palladium catalyst poisoned with barium sulfate in Rosenmund reduction?", answer: "To stop the reduction at the aldehyde stage" },
        { prompt: "Which compound is treated with a Grignard reagent to make a dialkyl cadmium?", answer: "Cadmium chloride, CdCl₂" },
        { prompt: "Name the reaction that makes an aromatic ketone from an arene and an acyl chloride.", answer: "Friedel-Crafts acylation, with anhydrous AlCl₃" },
      ],
      pyqExampleId: "9a996f5e-36eb-467c-b628-de6ee4c9b62a",
      traps: [
        {
          title: "Rosenmund reduction for a ketone",
          body: "Rosenmund reduction replaces Cl by H, so it gives only aldehydes. A ketone from an acyl chloride needs a dialkyl cadmium (aliphatic) or Friedel-Crafts acylation (aromatic).",
        },
        {
          title: "Writing only Pd over the arrow",
          body: "With plain palladium the product would be the alcohol. Write Pd-BaSO₄ (poisoned palladium) over the arrow; the condition carries a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-from-nitriles-esters",
      name: "From nitriles and esters: Stephen reaction, DIBAl-H and Grignard reagents",
      intuition:
        "The carbon of a nitrile, R-C≡N, needs only to be partly reduced and then hydrolysed to become an aldehyde: the imine stage is the stopping point. If instead a Grignard reagent adds an alkyl or aryl group to that carbon, hydrolysis gives a ketone.",
      definition:
        "- **Stephen reaction:** a nitrile is reduced by stannous chloride and hydrochloric acid to the imine hydrochloride, which on acid hydrolysis gives the aldehyde: \\(\\text{R-C}\\equiv\\text{N} + 2[\\text{H}] \\xrightarrow{\\text{SnCl}_2,\\ \\text{HCl}} \\text{R-CH=NH.HCl} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-CHO} + \\text{NH}_4\\text{Cl}\\).\n" +
        "- **DIBAl-H with nitriles:** diisobutylaluminium hydride, \\(\\text{AlH(i-Bu)}_2\\), reduces nitriles to imines, which acid hydrolysis turns into aldehydes. A double or triple bond in the same molecule is not reduced (pent-3-enenitrile gives pent-3-enal).\n" +
        "- **DIBAl-H with esters:** aliphatic or aromatic esters are reduced to aldehydes, usually at 195 K so that the aldehyde is not reduced further.\n" +
        "- **Ketones from nitriles:** a nitrile with a Grignard reagent in dry ether, followed by acid hydrolysis: \\(\\text{CH}_3\\text{C}\\equiv\\text{N} + \\text{CH}_3\\text{MgCl} \\xrightarrow{\\text{dry ether}} (\\text{CH}_3)_2\\text{C=NMgCl} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{CH}_3\\text{COCH}_3 + \\text{NH}_3 + \\text{Mg(Cl)OH}\\).",
      formula: {
        label: "Stephen reaction",
        latex: "\\text{R-C}\\equiv\\text{N} \\xrightarrow{\\text{SnCl}_2,\\ \\text{HCl}} \\text{R-CH=NH.HCl} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-CHO}",
      },
      authoredExample: {
        prompt: "How is benzophenone prepared from benzonitrile? Write the reactions.",
        steps: [
          "Benzonitrile reacts with phenylmagnesium bromide in dry ether; the phenyl group adds to the nitrile carbon: \\(\\text{C}_6\\text{H}_5\\text{C}\\equiv\\text{N} + \\text{C}_6\\text{H}_5\\text{MgBr} \\xrightarrow{\\text{dry ether}} (\\text{C}_6\\text{H}_5)_2\\text{C=NMgBr}\\).",
          "Acid hydrolysis gives the ketone: \\((\\text{C}_6\\text{H}_5)_2\\text{C=NMgBr} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_6\\text{H}_5\\text{COC}_6\\text{H}_5 + \\text{NH}_3 + \\text{Mg(Br)OH}\\).",
        ],
        answer: "Benzophenone, C₆H₅COC₆H₅ (diphenyl ketone)",
      },
      selfCheckExample: {
        prompt: "What is obtained when ethyl ethanoate is reduced with DIBAl-H at 195 K and the product is hydrolysed?",
        steps: ["DIBAl-H reduces an ester only as far as the aldehyde, keeping the acid part's carbon chain."],
        answer: "Ethanal (with ethanol from the alcohol part)",
      },
      practiceSet: [
        { prompt: "Why is DIBAl-H chosen when the nitrile also has a C=C bond?", answer: "It does not reduce the double or triple bond" },
        { prompt: "Name the intermediate formed in the Stephen reaction.", answer: "The imine hydrochloride, R-CH=NH.HCl" },
        { prompt: "Name the ketone formed when ethanenitrile reacts with \\(\\text{CH}_3\\text{MgCl}\\) in dry ether and the product is hydrolysed.", answer: "Propanone (acetone)" },
      ],
      pyqExampleId: "b36a1b26-f347-4d4a-9f8c-51fff2bc79e3",
      traps: [
        {
          title: "A strong reducing agent for a nitrile",
          body: "LiAlH₄ takes a nitrile all the way to an amine. For the aldehyde use SnCl₂ and HCl (Stephen reaction) or DIBAl-H, then hydrolyse.",
        },
        {
          title: "Stopping at the imine",
          body: "The imine hydrochloride is not the aldehyde. Write the hydrolysis step (\\(\\text{H}_3\\text{O}^+\\)) and the \\(\\text{NH}_4\\text{Cl}\\) it releases.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-from-arenes",
      name: "From aromatic hydrocarbons: Etard reaction, side chain chlorination and Gatterman-Koch formylation",
      intuition:
        "A strong oxidising agent turns the CH₃ group of toluene all the way into COOH. To stop at CHO, the book uses special methods: hold the half oxidised carbon in a complex (Etard reaction, or CrO₃ in acetic anhydride), or make benzal chloride and hydrolyse it. Gatterman-Koch formylation instead puts a CHO group straight onto the ring.",
      definition:
        "- **Etard reaction:** the methyl group of methylbenzene (or a methylarene) is oxidised by chromyl chloride, \\(\\text{CrO}_2\\text{Cl}_2\\), in carbon disulfide to a chromium complex; acid hydrolysis of the complex gives benzaldehyde.\n" +
        "- **CrO₃ in acetic anhydride:** at about 273 K a methylarene gives a benzylidene diacetate, which on acid hydrolysis gives the aldehyde.\n" +
        "- **Side chain chlorination of toluene:** gives benzal chloride, \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2\\), which on hydrolysis at 373 K gives benzaldehyde. Benzaldehyde is made commercially this way.\n" +
        "- **Gatterman-Koch formylation:** benzene or a substituted benzene is treated under high pressure with carbon monoxide and hydrogen chloride in presence of anhydrous AlCl₃ or CuCl, giving benzaldehyde or a substituted benzaldehyde.\n" +
        "- **Aromatic ketones** come from the arene by Friedel-Crafts acylation (see the acyl chloride methods).",
      formula: {
        label: "Gatterman-Koch formylation",
        latex: "\\text{C}_6\\text{H}_6 \\xrightarrow[\\text{anhyd. AlCl}_3,\\ \\text{high pressure}]{\\text{CO, HCl}} \\text{C}_6\\text{H}_5\\text{CHO}",
      },
      authoredExample: {
        prompt: "How is benzaldehyde prepared from toluene by side chain chlorination? Write the reactions.",
        steps: [
          "Chlorine in sunlight replaces two hydrogens of the methyl group: \\(\\text{C}_6\\text{H}_5\\text{CH}_3 + 2\\,\\text{Cl}_2 \\xrightarrow{h\\nu} \\text{C}_6\\text{H}_5\\text{CHCl}_2 + 2\\,\\text{HCl}\\).",
          "Benzal chloride is hydrolysed at 373 K: \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2 + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}_3\\text{O}^+,\\ 373\\ \\text{K}} \\text{C}_6\\text{H}_5\\text{CHO} + 2\\,\\text{HCl}\\).",
        ],
        answer: "Benzaldehyde, through benzal chloride",
      },
      selfCheckExample: {
        prompt: "Name the product when benzene is treated with CO and HCl under high pressure in presence of anhydrous AlCl₃, and name the reaction.",
        steps: ["CO and HCl put a CHO group directly on the ring."],
        answer: "Benzaldehyde, by Gatterman-Koch formylation",
      },
      practiceSet: [
        { prompt: "Why can toluene not be converted into benzaldehyde with hot KMnO₄?", answer: "A strong oxidising agent turns the CH₃ group into COOH, so benzoic acid is formed" },
        { prompt: "Which reagent, with acetic anhydride, converts a methylarene into a benzylidene diacetate?", answer: "Chromium trioxide, CrO₃" },
        { prompt: "Name the main product of Gatterman-Koch formylation of toluene.", answer: "4-Methylbenzaldehyde (p-tolualdehyde)" },
      ],
      pyqExampleId: "1a80ab6a-4c61-4af3-880a-e813350c10fe",
      traps: [
        {
          title: "Dichromate in place of chromyl chloride",
          body: "The Etard reagent is chromyl chloride, \\(\\text{CrO}_2\\text{Cl}_2\\), in \\(\\text{CS}_2\\). Acidified dichromate or permanganate would give benzoic acid.",
        },
        {
          title: "HCl written on both sides",
          body: "In Gatterman-Koch formylation the CO and HCl are both used up. Write CO, HCl, anhydrous AlCl₃ and high pressure over the arrow, as the book does, and only the aldehyde as the product.",
        },
      ],
    },
  ],
};
