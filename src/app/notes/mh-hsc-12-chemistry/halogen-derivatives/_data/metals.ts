import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_METALS_NOTE: SubtopicNote = {
  subtopicName: "Reaction with Active Metals",
  title: "Reactions with Active Metals: Grignard, Wurtz and Fittig",
  oneLineDefinition:
    "Magnesium turns an alkyl or aryl halide into a Grignard reagent; sodium joins two halide molecules in the Wurtz, Wurtz-Fittig and Fittig reactions.",
  whyItMatters:
    "11 questions. Five were set in board papers: name the metal used to make a Grignard reagent (2025), the hydrocarbon from methylmagnesium iodide and ammonia (2024), the product of chlorobenzene with sodium in dry ether (2023), the action of bromobenzene and of mercurous fluoride on bromomethane (2025), and the last product of a sequence ending in a Wurtz reaction (2015). The textbook adds Grignard and Wurtz products and one reason to give.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscchd-grignard",
      name: "Grignard reagent",
      intuition:
        "Magnesium slips in between the carbon and the halogen. The carbon now sits next to a metal that gives up electrons easily, so the carbon carries the negative end of the bond and behaves as a strong nucleophile and base. Any hydrogen on an oxygen or nitrogen, even a trace of water, grabs that carbon at once and turns it into a hydrocarbon.",
      definition:
        "- Active metals such as sodium, magnesium and cadmium combine with alkyl chlorides, bromides and iodides to give compounds with carbon-metal bonds: **organometallic compounds**.\n" +
        "- An alkyl halide with **magnesium in dry ether** gives an **alkyl magnesium halide**, the **Grignard reagent**. Vinyl and aryl halides also form Grignard reagents.\n" +
        "- The C-Mg bond is **polar covalent**: carbon pulls electrons from the electropositive magnesium, so it has negative polarity and acts as a nucleophile.\n" +
        "- Grignard reagents react with water and with any compound containing **hydrogen attached to an electronegative element** (alcohols, ammonia) to give the **hydrocarbon** R-H. That is why they are made and used under anhydrous conditions.\n" +
        "- Victor Grignard received the Nobel Prize in 1912 for this work.",
      formula: {
        label: "Grignard reagent and its reaction with water",
        latex: "\\text{R-X} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{R-Mg-X} \\qquad \\text{R-Mg-X} + \\text{H}_2\\text{O} \\longrightarrow \\text{R-H} + \\text{Mg(OH)X}",
      },
      authoredExample: {
        prompt: "Prepare ethylmagnesium bromide from bromoethane, and write its reaction with methanol.",
        steps: [
          "\\(\\text{C}_2\\text{H}_5\\text{Br} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{C}_2\\text{H}_5\\text{MgBr}\\)",
          "Methanol has H on oxygen, an electronegative element, so the ethyl carbon takes that hydrogen.",
          "\\(\\text{C}_2\\text{H}_5\\text{MgBr} + \\text{CH}_3\\text{OH} \\longrightarrow \\text{C}_2\\text{H}_6 + \\text{Mg(OCH}_3)\\text{Br}\\)",
        ],
        answer: "Ethylmagnesium bromide, which gives ethane with methanol",
      },
      selfCheckExample: {
        prompt: "Phenylmagnesium bromide is treated with water. Name the organic product.",
        steps: ["\\(\\text{C}_6\\text{H}_5\\text{MgBr} + \\text{H}_2\\text{O} \\longrightarrow \\text{C}_6\\text{H}_6 + \\text{Mg(OH)Br}\\)"],
        answer: "Benzene",
      },
      practiceSet: [
        { prompt: "Name the solvent used to prepare a Grignard reagent.", answer: "Dry ether" },
        { prompt: "Do aryl halides form Grignard reagents?", answer: "Yes. Vinyl and aryl halides also form Grignard reagents" },
        { prompt: "Which atom in R-Mg-X carries the negative polarity?", answer: "The carbon bonded to magnesium" },
        { prompt: "What is the general name for compounds containing a carbon-metal bond?", answer: "Organometallic compounds" },
      ],
      pyqExampleId: "50354bd8-197a-47aa-94ef-f8fc6f16d759",
      traps: [
        {
          title: "Water gives a hydrocarbon, not an alcohol",
          body: "A Grignard reagent with water gives R-H. Writing R-OH as the product is a common and costly error.",
        },
        {
          title: "Dry ether, every time",
          body: "Write 'dry ether' over the arrow. A trace of moisture destroys the reagent, and the board asks for this reason as a separate question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-wurtz",
      name: "Wurtz, Wurtz-Fittig and Fittig reactions",
      intuition:
        "Sodium in dry ether takes the halogen from two halide molecules and joins the two carbon groups that are left. Two alkyl groups make a bigger alkane (Wurtz); an aryl and an alkyl group make an alkylbenzene (Wurtz-Fittig); two aryl groups make biphenyl (Fittig).",
      definition:
        "- **Wurtz reaction:** alkyl halides with metallic sodium in dry ether give **higher alkanes with double the number of carbon atoms**: \\(2\\text{R-X} + 2\\text{Na} \\longrightarrow \\text{R-R} + 2\\text{NaX}\\). Example: \\(2\\text{C}_2\\text{H}_5\\text{Br} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_3 + 2\\text{NaBr}\\).\n" +
        "- With a **mixture of two different alkyl halides**, all three possible alkanes form: \\(\\text{CH}_3\\text{Br}\\) and \\(\\text{C}_2\\text{H}_5\\text{Br}\\) give ethane, propane and butane.\n" +
        "- **Wurtz-Fittig reaction:** an aryl halide, an alkyl halide and sodium in dry ether give an alkylbenzene. It alkylates aryl halides: \\(\\text{C}_6\\text{H}_5\\text{Br} + \\text{CH}_3\\text{Br} + 2\\text{Na} \\longrightarrow \\text{C}_6\\text{H}_5\\text{CH}_3 + 2\\text{NaBr}\\) (toluene).\n" +
        "- **Fittig reaction:** when only the aryl halide takes part, the product is **biphenyl**.",
      formula: {
        label: "Fittig reaction",
        latex: "2\\text{C}_6\\text{H}_5\\text{-Cl} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{C}_6\\text{H}_5\\text{-C}_6\\text{H}_5 + 2\\text{NaCl}",
      },
      authoredExample: {
        prompt: "What is formed when 1-bromopropane is treated with sodium in dry ether? Name the reaction.",
        steps: [
          "Sodium joins two propyl groups: \\(2\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{CH}_3(\\text{CH}_2)_4\\text{CH}_3 + 2\\text{NaBr}\\).",
          "Three carbons in the halide, six in the product.",
        ],
        answer: "n-Hexane, by the Wurtz reaction",
      },
      selfCheckExample: {
        prompt: "Iodobenzene and iodoethane are treated together with sodium in dry ether. Name the reaction and the product meant to be made.",
        steps: [
          "An aryl halide and an alkyl halide with sodium: the Wurtz-Fittig reaction.",
          "\\(\\text{C}_6\\text{H}_5\\text{I} + \\text{C}_2\\text{H}_5\\text{I} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{C}_6\\text{H}_5\\text{-C}_2\\text{H}_5 + 2\\text{NaI}\\)",
        ],
        answer: "Wurtz-Fittig reaction; ethylbenzene",
      },
      practiceSet: [
        { prompt: "Name the alkanes formed when a mixture of bromomethane and bromoethane reacts with sodium in dry ether.", answer: "Ethane, propane and butane" },
        { prompt: "How many carbon atoms does the Wurtz product of 2-chlorobutane have, and what is it?", answer: "Eight: 3,4-dimethylhexane" },
        { prompt: "Which metal is used in the Wurtz reaction?", answer: "Sodium" },
      ],
      pyqExampleId: "5209d400-cdc5-4c53-8afd-27f11f28d5a6",
      traps: [
        {
          title: "Fittig or Wurtz-Fittig",
          body: "Aryl halide alone with sodium: Fittig, giving biphenyl. Aryl halide plus alkyl halide with sodium: Wurtz-Fittig, giving an alkylbenzene. The board marks the name as well as the product.",
        },
        {
          title: "The Wurtz product doubles the carbons",
          body: "One alkyl halide of n carbons gives an alkane of 2n carbons. Join the two carbons that carried the halogen; do not join the chains end to end at other carbons.",
        },
      ],
    },
  ],
};
