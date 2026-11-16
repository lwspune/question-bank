import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AK_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Carboxylic Acids",
  title: "Carboxylic Acids",
  oneLineDefinition:
    "How carboxylic acids are made from alcohols, alkylbenzenes, nitriles, Grignard reagents and acid derivatives, why they are acidic and what makes one acid stronger than another, and their reactions at the O-H, at the C-OH, at the α-carbon and on a benzene ring.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. One names the intermediate when a Grignard reagent takes up CO₂ (2022), one ranks four aliphatic acids by acidity (2025), one picks the incorrect reaction from four conversions of acids and their derivatives (Re-NEET 2024), and one matches four named reactions, among them Hell-Volhard-Zelinsky and esterification (2021).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchak-acid-prep",
      name: "Preparing carboxylic acids",
      intuition:
        "A carboxylic acid is the most oxidised state a carbon can reach while still bonded to another carbon. So acids come from oxidising primary alcohols, aldehydes or the side chain of an alkylbenzene, from hydrolysing compounds already at that level (nitriles, amides, acid chlorides, anhydrides, esters), or from adding CO₂ to a Grignard reagent.",
      definition:
        "- **Primary alcohols** are oxidised to acids by \\(\\text{KMnO}_4\\) (neutral, acidic or alkaline), or by \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) or \\(\\text{CrO}_3\\) in acid (Jones reagent).\n" +
        "- **Alkylbenzenes** with chromic acid or acidic or alkaline \\(\\text{KMnO}_4\\) give benzoic acid. The whole side chain, however long, becomes one COOH. Primary and secondary alkyl groups are oxidised; a tertiary one is not.\n" +
        "- **Nitriles and amides** are hydrolysed by acid or alkali to acids.\n" +
        "- **Grignard reagents** react with \\(\\text{CO}_2\\) (dry ice) to give the halomagnesium salt of the acid, which dilute acid turns into the acid. The acid has one carbon more than the alkyl halide.\n" +
        "- **Acid chlorides and anhydrides** are hydrolysed by water to acids. **Esters** give acids on acid hydrolysis, and carboxylate salts on basic hydrolysis.",
      table: {
        columns: ["Start", "Reagent", "Product"],
        rows: [
          { cells: ["Primary alcohol", "\\(\\text{KMnO}_4\\), or \\(\\text{CrO}_3\\) with \\(\\text{H}_2\\text{SO}_4\\)", "RCOOH"] },
          { cells: ["Alkylbenzene", "\\(\\text{KMnO}_4\\) (acidic or alkaline), or chromic acid", "Benzoic acid"] },
          { cells: ["Nitrile RCN", "\\(\\text{H}^+\\) or \\(\\text{OH}^-\\) in water", "RCOOH"] },
          { cells: ["Grignard reagent RMgX", "\\(\\text{CO}_2\\) (dry ice), then \\(\\text{H}_3\\text{O}^+\\)", "RCOOH, one carbon more than RX"], pyqExampleId: "9bc10cad-8fcd-4f65-b345-f7286dc93fd6", noteAmber: "NEET 2022: the intermediate Y before acid is added is RCOO⁻Mg⁺X." },
          { cells: ["Acid chloride or anhydride", "Water", "RCOOH"] },
          { cells: ["Ester", "Dilute acid, or alkali then acid", "RCOOH and an alcohol"] },
        ],
      },
      pyqExampleId: "9bc10cad-8fcd-4f65-b345-f7286dc93fd6",
      selfCheckExample: {
        prompt: "Propylbenzene, C₆H₅CH₂CH₂CH₃, is heated with alkaline KMnO₄ and the mixture is then acidified. Name the acid formed.",
        steps: [
          "The side chain is attached to the ring by a carbon that carries hydrogen, so it is oxidised.",
          "However long the chain, it is cut down to one COOH group on the ring.",
        ],
        answer: "Benzoic acid, \\(\\text{C}_6\\text{H}_5\\text{COOH}\\)",
      },
      practiceSet: [
        { prompt: "What does ethanenitrile give on hydrolysis with dilute acid?", answer: "Ethanoic acid" },
        { prompt: "What does propan-1-ol give with acidified KMnO₄?", answer: "Propanoic acid" },
        { prompt: "Is tert-butylbenzene oxidised to benzoic acid by KMnO₄?", answer: "No: a tertiary alkyl group is not oxidised" },
        { prompt: "What does ethanoyl chloride give with water?", answer: "Ethanoic acid (and HCl)" },
      ],
      traps: [
        {
          title: "The whole side chain becomes one COOH",
          body: "Oxidising ethylbenzene or propylbenzene gives benzoic acid, not phenylethanoic acid. Only the carbon attached to the ring survives, as COOH.",
        },
        {
          title: "Grignard with CO₂ adds a carbon",
          body: "The COOH carbon comes from \\(\\text{CO}_2\\), so the acid has one carbon more than the alkyl halide that made the Grignard reagent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchak-acidity",
      name: "Acidity of carboxylic acids",
      intuition:
        "A carboxylic acid gives up H⁺ easily because the carboxylate ion left behind spreads its negative charge equally over two oxygen atoms by resonance. Anything that spreads the charge further makes the acid stronger: an electron withdrawing group near COOH. Anything that pushes more electron density in makes it weaker: an alkyl group.",
      definition:
        "- Carboxylic acids are weaker than mineral acids but stronger than alcohols and most simple phenols.\n" +
        "- The strength of an acid is given by \\(K_a\\), or by \\(\\text{p}K_a = -\\log K_a\\). **The smaller the \\(\\text{p}K_a\\), the stronger the acid.**\n" +
        "- **Electron withdrawing groups** (halogen, \\(\\text{NO}_2\\), CN) increase acidity. More of them, a more electronegative one, or one closer to COOH, increases it more.\n" +
        "- **Electron donating groups** (alkyl groups) decrease acidity: \\(\\text{HCOOH} > \\text{CH}_3\\text{COOH} > \\text{CH}_3\\text{CH}_2\\text{COOH}\\).\n" +
        "- A phenyl or vinyl group attached directly to COOH increases acidity, so benzoic acid is stronger than ethanoic acid.",
      formula: {
        label: "pKa from Ka",
        latex: "\\text{p}K_a = -\\log K_a",
        symbols: [
          { symbol: "\\(K_a\\)", meaning: "the acid dissociation constant: larger means a stronger acid" },
          { symbol: "\\(\\text{p}K_a\\)", meaning: "its negative logarithm: smaller means a stronger acid" },
        ],
      },
      authoredExample: {
        prompt: "Acid X has Ka = 1.0 × 10⁻⁴ and acid Y has Ka = 1.0 × 10⁻⁵. Find the pKa of each and say which is the stronger acid.",
        steps: [
          "\\(\\text{p}K_a(\\text{X}) = -\\log(1.0 \\times 10^{-4}) = 4\\).",
          "\\(\\text{p}K_a(\\text{Y}) = -\\log(1.0 \\times 10^{-5}) = 5\\).",
          "X has the larger \\(K_a\\) and the smaller \\(\\text{p}K_a\\), so it is the stronger acid.",
        ],
        answer: "pKa of X is 4, of Y is 5; X is stronger",
      },
      selfCheckExample: {
        prompt: "Arrange ClCH₂COOH, FCH₂COOH and CH₃COOH in order of increasing acidity.",
        steps: [
          "\\(\\text{CH}_3\\text{COOH}\\) has no electron withdrawing group: weakest.",
          "A halogen on the α-carbon pulls electron density and stabilises the anion.",
          "Fluorine is more electronegative than chlorine, so it does this more.",
        ],
        answer: "CH₃COOH < ClCH₂COOH < FCH₂COOH",
      },
      practiceSet: [
        { prompt: "An acid has pKa = 3. What is its Ka?", answer: "\\(1 \\times 10^{-3}\\)" },
        { prompt: "Which is the stronger acid: CCl₃COOH or ClCH₂COOH?", answer: "\\(\\text{CCl}_3\\text{COOH}\\): three chlorines withdraw more than one" },
        { prompt: "Which is more acidic: benzoic acid or ethanoic acid?", answer: "Benzoic acid" },
        { prompt: "Of two acids with pKa 2.9 and 4.8, which is stronger?", answer: "The one with \\(\\text{p}K_a = 2.9\\)" },
      ],
      pyqExampleId: "c9b7a82d-bd78-493c-9f1a-4dcb2ce2f2b7",
      traps: [
        {
          title: "Alkyl groups weaken an acid",
          body: "Alkyl groups push electrons towards COOH and destabilise the carboxylate ion. Methanoic acid, with no alkyl group, is the strongest of the simple aliphatic acids, and more alkyl branching makes an acid weaker.",
        },
        {
          title: "Smaller pKa means stronger",
          body: "\\(\\text{p}K_a\\) is a negative logarithm, so it runs the opposite way to \\(K_a\\). An acid of \\(\\text{p}K_a = 3\\) is stronger than one of \\(\\text{p}K_a = 5\\).",
        },
        {
          title: "A nearer halogen has a bigger effect",
          body: "The pull of a halogen fades with distance, so \\(\\text{ClCH}_2\\text{COOH}\\) is a stronger acid than \\(\\text{ClCH}_2\\text{CH}_2\\text{COOH}\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchak-acid-reactions",
      name: "Reactions of carboxylic acids",
      intuition:
        "A carboxylic acid can react at four places. The O-H gives up its proton to bases and metals. The OH group can be replaced, giving esters, acid chlorides, anhydrides and amides. The α-hydrogen can be swapped for a halogen. And the COOH group can be removed or reduced. On a benzene ring, COOH pulls electrons away, so it slows ring substitution and sends it to the meta position.",
      definition:
        "- **As an acid:** with metals and alkalis it forms salts; with \\(\\text{NaHCO}_3\\) it gives \\(\\text{CO}_2\\), a test for the carboxyl group.\n" +
        "- **Replacing OH:** an alcohol with conc. \\(\\text{H}_2\\text{SO}_4\\) gives an ester (esterification). \\(\\text{PCl}_5\\), \\(\\text{PCl}_3\\) or \\(\\text{SOCl}_2\\) give an acid chloride; \\(\\text{SOCl}_2\\) is preferred because its other products are gases. Heating with \\(\\text{P}_2\\text{O}_5\\) or \\(\\text{H}_2\\text{SO}_4\\) gives an anhydride. Ammonia gives an ammonium salt, which on heating gives an amide.\n" +
        "- **Reduction:** \\(\\text{LiAlH}_4\\) or diborane reduces an acid to a primary alcohol. \\(\\text{LiAlH}_4\\) reduces an amide to an amine.\n" +
        "- **Losing COOH:** a sodium salt heated with soda lime (NaOH and CaO) gives an alkane with one carbon fewer. Electrolysis of a sodium or potassium salt in water (Kolbe electrolysis) gives an alkane with twice the carbons of the alkyl group.\n" +
        "- **Hell-Volhard-Zelinsky:** an acid with an α-hydrogen, treated with \\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\) and red phosphorus, gives the α-halo acid.\n" +
        "- **Ring substitution:** COOH is a deactivating, meta directing group. Benzoic acid does not undergo Friedel-Crafts reactions, because the ring is deactivated and the catalyst \\(\\text{AlCl}_3\\) bonds to the COOH group.",
      table: {
        columns: ["Reaction", "Reagent", "Product"],
        rows: [
          { cells: ["Esterification", "Alcohol, conc. \\(\\text{H}_2\\text{SO}_4\\)", "Ester"] },
          { cells: ["Acid chloride formation", "\\(\\text{PCl}_5\\), \\(\\text{PCl}_3\\) or \\(\\text{SOCl}_2\\)", "RCOCl"] },
          { cells: ["Amide formation", "\\(\\text{NH}_3\\), then heat", "\\(\\text{RCONH}_2\\)"] },
          { cells: ["Reduction of an acid", "\\(\\text{LiAlH}_4\\) or \\(\\text{B}_2\\text{H}_6\\)", "\\(\\text{RCH}_2\\text{OH}\\)"] },
          { cells: ["Reduction of an amide", "\\(\\text{LiAlH}_4\\), then \\(\\text{H}_2\\text{O}\\)", "Amine \\(\\text{RCH}_2\\text{NH}_2\\)"], pyqExampleId: "d45cea1f-8132-4606-9536-909cf6d96538", noteAmber: "Re-NEET 2024: benzamide with LiAlH₄ gives benzylamine, so a reaction showing benzoic acid was the incorrect one." },
          { cells: ["Decarboxylation", "Sodium salt with soda lime, heat", "Alkane with one carbon fewer"] },
          { cells: ["Kolbe electrolysis", "Electrolysis of the sodium or potassium salt in water", "Alkane with twice the carbons of the alkyl group"] },
          { cells: ["Hell-Volhard-Zelinsky", "\\(\\text{X}_2\\) and red P, then \\(\\text{H}_2\\text{O}\\)", "α-Halo acid"], pyqExampleId: "dd576090-2c0c-4134-8d21-4e70ca2a90b2", noteAmber: "NEET 2021: matched in one list with Gattermann-Koch, the haloform reaction and esterification." },
        ],
      },
      pyqExampleId: "dd576090-2c0c-4134-8d21-4e70ca2a90b2",
      selfCheckExample: {
        prompt: "Benzoic acid is nitrated with concentrated HNO₃ and H₂SO₄. Where does the nitro group go, and what is the product?",
        steps: [
          "The COOH group withdraws electrons from the ring, so it is deactivating and meta directing.",
          "The nitro group enters meta to COOH.",
        ],
        answer: "Meta position: 3-nitrobenzoic acid",
      },
      practiceSet: [
        { prompt: "What does ethanoic acid give with SOCl₂?", answer: "Ethanoyl chloride, \\(\\text{CH}_3\\text{COCl}\\) (with \\(\\text{SO}_2\\) and HCl)" },
        { prompt: "What does sodium ethanoate give when heated with soda lime?", answer: "Methane" },
        { prompt: "What does ethanoic acid give with LiAlH₄ followed by water?", answer: "Ethanol" },
        { prompt: "Does benzoic acid undergo the Friedel-Crafts reaction?", answer: "No: the ring is deactivated and \\(\\text{AlCl}_3\\) bonds to the COOH group" },
      ],
      traps: [
        {
          title: "Hell-Volhard-Zelinsky needs an α-hydrogen",
          body: "The halogen replaces a hydrogen on the carbon next to COOH. An acid with no hydrogen on that carbon does not react.",
        },
        {
          title: "Soda lime removes a carbon, Kolbe doubles the chain",
          body: "Heating a sodium salt with soda lime gives an alkane one carbon shorter than the acid. Kolbe electrolysis joins two alkyl groups, so sodium ethanoate gives ethane.",
        },
        {
          title: "LiAlH₄ turns an amide into an amine",
          body: "Reduction keeps the nitrogen: \\(\\text{RCONH}_2\\) becomes \\(\\text{RCH}_2\\text{NH}_2\\). It never gives back the acid.",
        },
        {
          title: "COOH on a ring directs meta",
          body: "COOH withdraws electrons, so nitration or bromination of benzoic acid goes to the meta position, and more slowly than for benzene.",
        },
      ],
    },
  ],
};
