import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEOPHILIC_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Substitution Reactions (SN1 and SN2)",
  title: "Nucleophilic Substitution: SN1 and SN2",
  oneLineDefinition:
    "A nucleophile replaces the halide either in two steps through a planar carbocation (SN1 — tertiary fastest, racemisation at a chiral carbon) or in one concerted backside attack (SN2 — methyl fastest, inversion); the nucleophile's attacking atom decides the product, KCN giving a nitrile and AgCN an isocyanide.",
  whyItMatters:
    "12 PYQs, none HARD. Half ask a mechanism fact — which is NOT a feature of SN2 (a carbocation), which halide is fastest by SN1 or SN2, which substrate racemises; half ask a product — 2-bromobutane with aqueous NaOH, ethyl bromide with silver acetate or silver propanoate, the reagent for an alkyl nitrite or a nitrile. " +
    "Two cards.",
  concepts: [
    // 1 — SN1 vs SN2
    {
      kind: "formula" as const,
      slug: "cethal-sn1-vs-sn2",
      name: "SN1 Against SN2: Mechanism, Rate Order and Stereochemistry",
      intuition:
        "SN1: the C–X bond breaks first, a planar carbocation forms, the nucleophile attacks either face — so the rate depends only on the halide (tertiary fastest, stabilised cation) and a chiral centre is racemised. SN2: the nucleophile pushes in from the back while X leaves in ONE step — no intermediate, the rate depends on both reactants, crowding slows it (methyl fastest), and the configuration inverts.",
      definition:
        "- **SN2**: single step, bimolecular, backside attack, simultaneous bond making and breaking, inversion (Walden). NO carbocation. Rate: methyl > 1° > 2° > 3°. Fastest among 1-bromobutane, 1-chlorobutane, 2-chlorobutane, 1-iodobutane: the primary IODIDE (best leaving group, unhindered).\n" +
        "- **SN1**: two steps, unimolecular, planar carbocation, racemisation at a stereocentre. Rate: 3° > 2° > 1° — tert-butyl iodide fastest.\n" +
        "- Leaving group: I > Br > Cl > F for both.\n" +
        "- Racemisation needs a chiral C–X carbon: 2-chlorobutane racemises on SN1 hydrolysis; 2-chloropropane, 3-chloropentane and neopentyl chloride cannot.\n" +
        "- tert-Butyl bromide + AgF (SN1) keeps its skeleton: 2-fluoro-2-methylpropane. Tertiary alcohols react fastest with HBr for the same reason.",
      formula: {
        label: "Rate orders",
        latex:
          "\\text{SN1: } 3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3\\text{X};\\qquad \\text{SN2: } \\text{CH}_3\\text{X} > 1^\\circ > 2^\\circ > 3^\\circ",
      },
      authoredExample: {
        prompt: "(R)-2-bromooctane is hydrolysed once with aqueous NaOH (SN2) and once with water in acetone (SN1). Describe the product's stereochemistry in each case.",
        steps: [
          "SN2 inverts: (S)-octan-2-ol only. SN1 goes through a planar cation: a racemic mixture of (R) and (S).",
        ],
        answer: "SN2 — pure (S); SN1 — racemic",
      },
      selfCheckExample: {
        prompt: "Which is NOT a feature of SN2: single step; backside attack; a planar carbocation intermediate; simultaneous bond making and breaking?",
        steps: [
          "The carbocation belongs to SN1.",
        ],
        answer: "A planar carbocation intermediate",
      },
      practiceSet: [
        { prompt: "Intermediate NOT formed in SN2?", answer: "Carbocation" },
        { prompt: "Fastest by SN1: n-, sec-, iso- or tert-butyl iodide?", answer: "tert-Butyl iodide" },
        { prompt: "Racemises on SN1 hydrolysis: 2-chloropropane or 2-chlorobutane?", answer: "2-Chlorobutane" },
        { prompt: "Fastest SN2: 1-bromobutane, 1-chlorobutane, 2-chlorobutane, 1-iodobutane?", answer: "1-Iodobutane" },
      ],
      pyqExampleId: "4ead8f21-7d2f-44b0-adf6-703e57cba1ea",
      traps: [
        {
          title: "Expecting the 3°-fastest order for SN2",
          body:
            "Crowding blocks the backside. SN2 is fastest on the LEAST substituted carbon; tertiary halides go SN1 (or eliminate). The two orders are exact opposites.",
        },
      ],
    },

    // 2 — nucleophiles and products
    {
      kind: "formula" as const,
      slug: "cethal-nucleophiles-and-products",
      name: "Which Nucleophile Gives Which Product",
      intuition:
        "The product is the nucleophile bonded through its attacking atom. Aqueous OH⁻ gives the alcohol; alkoxide gives an ether; a silver carboxylate gives an ester; KCN attacks through carbon to give a nitrile while AgCN attacks through nitrogen to give an isocyanide; KNO₂ gives a nitroalkane while AgNO₂ gives an alkyl nitrite. Silver salts favour the more electronegative atom because Ag⁺ pulls the halide off (SN1-like).",
      definition:
        "- \\(\\text{R-X} + \\text{aq. NaOH} \\to \\text{R-OH}\\): 2-bromobutane → butan-2-ol (alcoholic KOH would give but-2-ene).\n" +
        "- \\(\\text{R-X} + \\text{R'ONa} \\to \\text{R-O-R'}\\) (Williamson ether synthesis).\n" +
        "- \\(\\text{R-X} + \\text{R'COOAg} \\to \\text{R'COOR}\\): ethyl bromide + silver acetate → ethyl acetate \\(\\text{CH}_3\\text{COOC}_2\\text{H}_5\\); + silver propanoate → ethyl propanoate.\n" +
        "- \\(\\text{R-X} + \\text{KCN (alc.)} \\to \\text{R-CN}\\) (nitrile, C-attack); \\(+ \\text{AgCN} \\to \\text{R-NC}\\) (isocyanide, N-attack).\n" +
        "- \\(\\text{R-X} + \\text{KNO}_2 \\to \\text{R-NO}_2\\) (nitroalkane); \\(+ \\text{AgNO}_2 \\to \\text{R-O-N=O}\\) (alkyl nitrite).\n" +
        "- \\(\\text{R-X} + \\text{NH}_3 \\to\\) amines (Hofmann); \\(+ \\text{NaSH} \\to \\text{R-SH}\\); \\(+ \\text{NaI} \\to \\text{R-I}\\) (Finkelstein).",
      formula: {
        label: "Ambident nucleophiles",
        latex:
          "\\text{KCN} \\to \\text{R-C≡N};\\quad \\text{AgCN} \\to \\text{R-N≡C};\\qquad \\text{KNO}_2 \\to \\text{R-NO}_2;\\quad \\text{AgNO}_2 \\to \\text{R-O-N=O}",
      },
      authoredExample: {
        prompt: "Give the products of 1-bromopropane with (i) alcoholic KCN, (ii) AgNO₂, (iii) silver acetate.",
        steps: [
          "(i) Butanenitrile \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CN}\\). (ii) Propyl nitrite \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{-O-N=O}\\). (iii) Propyl acetate \\(\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH}_3\\).",
        ],
        answer: "Butanenitrile; propyl nitrite; propyl acetate",
      },
      selfCheckExample: {
        prompt: "Identify Y in \\(\\text{C}_2\\text{H}_5\\text{Cl} + \\text{Y} \\to \\text{C}_2\\text{H}_5\\text{CN}\\), and the reagent that turns an alkyl halide into an alkyl nitrite.",
        steps: [
          "Nitrile from KCN (alcoholic); nitrite from AgNO₂.",
        ],
        answer: "KCN (alc.); \\(\\text{AgNO}_2\\)",
      },
      practiceSet: [
        { prompt: "2-Bromobutane + aqueous NaOH →?", answer: "Butan-2-ol" },
        { prompt: "\\(\\text{CH}_3\\text{CH}_2\\text{Br} + \\text{CH}_3\\text{COOAg} \\to\\)?", answer: "\\(\\text{CH}_3\\text{COOCH}_2\\text{CH}_3\\) (ethyl acetate)" },
        { prompt: "Reagent for alkyl halide → alkyl nitrite?", answer: "\\(\\text{AgNO}_2\\)" },
        { prompt: "Reagent A in ethyl bromide → ethyl propanoate?", answer: "Silver propanoate" },
      ],
      pyqExampleId: "2456f540-0a70-4821-bcf2-dfd8d692aedb",
      traps: [
        {
          title: "Writing the ester the wrong way round",
          body:
            "The acyl part comes from the silver salt, the alkyl from the halide: silver ACETATE + ETHYL bromide is CH₃COO–C₂H₅, ethyl acetate — not ethyl-COO-methyl.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Elimination — what alcoholic KOH does instead",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-elimination-and-haloarenes",
    },
    {
      label: "Basic Principles — carbocation stability behind the SN1 order",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-electronic-effects",
    },
  ],
};
