import type { SubtopicNote } from "@/app/notes/_types";

export const ACIDITY_ALC_NOTE: SubtopicNote = {
  subtopicName: "Acidity of Alcohols and Phenols",
  title: "Acidity of Alcohols and Phenols",
  oneLineDefinition:
    "Phenol is about a million times more acidic than ethanol because the phenoxide ion spreads its charge over the ring; groups that pull electrons, above all nitro groups at ortho and para, make a phenol stronger, and the NaOH, NaHCO₃ and FeCl₃ screens sort compounds by that acidity.",
  whyItMatters:
    "Twenty PYQs, eighteen of them multiple choice, and two from 2026. Six compare phenols with alcohols, including two numerical questions that count active hydrogens with a Grignard reagent. Ten rank substituted phenols or alcohols by pKa, most of them with nitro, methoxy, methyl or halogen groups. Four are solubility and colour screens with NaOH, NaHCO₃ and neutral FeCl₃.",
  concepts: [
    // C1 — phenol vs alcohol, active hydrogen
    {
      kind: "formula" as const,
      slug: "jcalc-phenol-vs-alcohol",
      name: "Why phenol is a stronger acid than an alcohol",
      intuition:
        "An acid is strong when the ion it leaves behind is stable. The phenoxide ion spreads its negative charge from oxygen onto the ortho and para carbons of the ring. The alkoxide ion keeps the charge on oxygen, and its alkyl group pushes more electron density there. So phenol gives up its proton far more easily.",
      definition:
        "- pKa (lower means stronger): carboxylic acids about 4–5, phenol 10.0, water 15.7, ethanol 15.9.\n" +
        "- Among alcohols: \\(\\mathrm{CH_3OH}\\) > 1° > 2° > 3°, because each extra alkyl group (+I) destabilises the alkoxide.\n" +
        "- Alcohols react with Na, K and Al to give alkoxides and \\(\\mathrm{H_2}\\), but not with aqueous NaOH. Phenol reacts with both, giving sodium phenoxide with NaOH.\n" +
        "- An alcohol acts as a nucleophile (its O lone pair attacks) and as an electrophile (the protonated C–O carbon is attacked). The reaction with sodium shows its acidity, not either of these roles.\n" +
        "- **Active hydrogen**: every O–H destroys one Grignard reagent, \\(\\mathrm{ROH + CH_3MgI \\to ROMgI + CH_4}\\). Moles of \\(\\mathrm{CH_4}\\) = moles of active H.\n" +
        "- A phenolic O–H is removed by the first equivalent of Grignard reagent before any adds to a C=O in the same molecule.",
      formula: {
        label: "Counting active hydrogens with a Grignard reagent",
        latex:
          "\\mathrm{ROH + CH_3MgI \\to ROMgI + CH_4\\uparrow} \\qquad M = \\dfrac{m}{n(\\mathrm{CH_4})} \\ \\ (\\text{one O–H per molecule})",
      },
      authoredExample: {
        prompt:
          "Arrange water, ethanol, phenol and 2-methylpropan-2-ol in increasing order of acidity, and say which of them dissolve in aqueous NaOH as a salt.",
        steps: [
          "2-Methylpropan-2-ol is a 3° alcohol: three alkyl groups push electrons onto the alkoxide, so it is the weakest acid.",
          "Ethanol (pKa 15.9) is a little weaker than water (pKa 15.7).",
          "Phenol (pKa 10.0) is far stronger, because phenoxide is stabilised by resonance with the ring.",
          "Hydroxide can remove a proton only from an acid stronger than water, so only phenol forms a sodium salt.",
        ],
        answer: "2-Methylpropan-2-ol < ethanol < water < phenol; only phenol dissolves in NaOH as sodium phenoxide.",
      },
      selfCheckExample: {
        prompt:
          "7.4 mg of a monohydric alcohol reacts with excess \\(\\mathrm{CH_3MgI}\\) and gives 2.24 mL of methane at STP (22400 mL mol\\(^{-1}\\)). Find its molar mass and a possible formula.",
        steps: [
          "Moles of \\(\\mathrm{CH_4}\\) \\(= 2.24/22400 = 1.0 \\times 10^{-4}\\) mol.",
          "One O–H per molecule, so moles of alcohol \\(= 1.0 \\times 10^{-4}\\) mol.",
          "\\(M = 7.4 \\times 10^{-3}/1.0 \\times 10^{-4} = 74\\) g mol\\(^{-1}\\).",
          "\\(\\mathrm{C_nH_{2n+1}OH}\\) with \\(14n + 18 = 74\\) gives \\(n = 4\\).",
        ],
        answer: "74 g mol\\(^{-1}\\); a butanol, \\(\\mathrm{C_4H_9OH}\\).",
      },
      practiceSet: [
        { prompt: "Which is the stronger acid: ethanol or 2-methylpropan-2-ol?", answer: "Ethanol" },
        { prompt: "Does ethanol dissolve in aqueous NaOH as its sodium salt?", answer: "No; ethanol is a weaker acid than water" },
        { prompt: "How many moles of \\(\\mathrm{CH_4}\\) does 0.01 mol of ethane-1,2-diol give with excess \\(\\mathrm{CH_3MgI}\\)?", answer: "0.02 mol (two O–H groups)" },
        { prompt: "One equivalent of \\(\\mathrm{CH_3MgBr}\\) is added to 4-hydroxyacetophenone. What does it attack first?", answer: "The phenolic O–H (it is deprotonated); the C=O is untouched" },
      ],
      pyqExampleId: "57fd63cd-cf21-4d68-9aed-7aa1d7dca8cc", // 2024 — pKa 10.0 vs 15.9, reason reversed
      traps: [
        {
          title: "Lower pKa means the stronger acid",
          body: "Phenol (10.0) is the stronger acid and ethanol (15.9) the weaker. A statement that ethanol is the stronger acid reverses this, even when it quotes the right numbers.",
        },
        {
          title: "A phenolic O–H uses up a Grignard reagent",
          body: "With one equivalent of Grignard reagent, a hydroxy aldehyde or ketone is only deprotonated. After work-up you get the starting compound back, not an alcohol.",
        },
        {
          title: "Use the molar volume the question gives",
          body: "Older papers use 22.4 L mol\\(^{-1}\\) at STP and newer data 22.7 L mol\\(^{-1}\\). Take whichever is stated; the nearest-integer answer usually survives either.",
        },
      ],
    },

    // C2 — substituent effects on acidity
    {
      kind: "formula" as const,
      slug: "jcalc-substituent-acidity",
      name: "Ranking substituted phenols and alcohols by pKa",
      intuition:
        "A group that pulls electrons stabilises the phenoxide and lowers the pKa. At ortho or para, a nitro group takes the negative charge onto its own oxygens (−R); at meta it can only pull through the bonds (−I). A group that pushes electrons does the opposite.",
      definition:
        "- NCERT values: p-nitrophenol 7.1, o-nitrophenol 7.2, m-nitrophenol 8.3, phenol 10.0, cresols 10.1–10.2, ethanol 15.9.\n" +
        "- More nitro groups at ortho and para: 2,4-dinitrophenol about 4, 2,4,6-trinitrophenol (picric acid) about 0.4.\n" +
        "- **Methoxy flips with position**: at para its +R wins, so p-methoxyphenol (10.2) is weaker than phenol; at meta only its −I acts, so m-methoxyphenol (9.65) is stronger.\n" +
        "- Halogens act by −I: chlorophenols are stronger acids than phenol (m-chlorophenol about 9.1).\n" +
        "- Alkyl groups (+I, hyperconjugation) and para \\(\\mathrm{NMe_2}\\) (+R) weaken a phenol.\n" +
        "- In alcohols the −I effect fades with distance: a chlorine on the carbon next to the carbinol carbon raises acidity much more than a fluorine four carbons away.",
      formula: {
        label: "The pKa ladder (NCERT values)",
        latex:
          "p\\text{-NO}_2\\,(7.1) < o\\text{-NO}_2\\,(7.2) < m\\text{-NO}_2\\,(8.3) < \\text{phenol}\\,(10.0) < p\\text{-CH}_3\\,(10.2) < \\text{ethanol}\\,(15.9)",
      },
      authoredExample: {
        prompt:
          "Arrange phenol, p-cresol, m-nitrophenol, p-nitrophenol and m-chlorophenol in increasing order of pKa.",
        steps: [
          "Increasing pKa means decreasing acidity, so start with the best-stabilised phenoxide.",
          "p-Nitrophenol: −R and −I, the charge reaches the nitro oxygens (7.1).",
          "m-Nitrophenol: only −I from the nitro group (8.3).",
          "m-Chlorophenol: a weaker −I than nitro (about 9.1).",
          "Phenol has no substituent (10.0); the methyl group of p-cresol pushes electrons in (10.2).",
        ],
        answer: "p-Nitrophenol < m-nitrophenol < m-chlorophenol < phenol < p-cresol.",
      },
      selfCheckExample: {
        prompt:
          "Arrange ethanol, 2-chloroethanol and 2,2,2-trifluoroethanol in increasing order of acidity.",
        steps: [
          "All three are primary alcohols; only the halogens differ.",
          "One chlorine on the next carbon pulls electrons away from the alkoxide oxygen (pKa about 14.3).",
          "Three fluorines on that carbon pull far more strongly (pKa about 12.4).",
        ],
        answer: "Ethanol < 2-chloroethanol < 2,2,2-trifluoroethanol.",
      },
      practiceSet: [
        { prompt: "Which is the stronger acid: o-nitrophenol or p-nitrophenol?", answer: "p-Nitrophenol (pKa 7.1 against 7.2)" },
        { prompt: "Is m-methoxyphenol a stronger or weaker acid than phenol?", answer: "Stronger (only −I acts at meta)" },
        { prompt: "Which is the stronger acid: 2,4-dinitrophenol or p-nitrophenol?", answer: "2,4-Dinitrophenol" },
        { prompt: "Which is the weakest acid: methanol, ethanol or 2-methylpropan-2-ol?", answer: "2-Methylpropan-2-ol" },
      ],
      pyqExampleId: "49cab294-40b9-424c-bcf4-3dbb50f876ff", // 2023 — five phenols in increasing pKa
      traps: [
        {
          title: "Ortho-nitro is not the strongest",
          body: "The intramolecular hydrogen bond between OH and \\(\\mathrm{NO_2}\\) in o-nitrophenol holds the proton back a little. So p-nitrophenol (7.1) is slightly stronger than o-nitrophenol (7.2), and m-nitrophenol (8.3) is the weakest of the three.",
        },
        {
          title: "Methoxy at meta makes phenol stronger",
          body: "Do not treat \\(\\mathrm{OCH_3}\\) as always electron-releasing. At meta its +R cannot reach the oxygen, so its −I effect makes m-methoxyphenol more acidic than phenol.",
        },
        {
          title: "Distance beats electronegativity for −I",
          body: "2-Chlorocyclohexanol is more acidic than 4-fluorocyclohexanol even though F is more electronegative than Cl. The inductive pull dies away within two or three bonds.",
        },
      ],
    },

    // C3 — solubility and colour screens
    {
      kind: "reference" as const,
      slug: "jcalc-solubility-screens",
      name: "Solubility and colour screens with NaOH, NaHCO₃ and FeCl₃",
      intuition:
        "Each screen is a pKa threshold. Hydroxide takes a proton from anything more acidic than water, so NaOH dissolves phenols and acids but not alcohols. Bicarbonate only takes a proton from acids stronger than carbonic acid (pKa about 6.4), so it separates carboxylic acids from ordinary phenols. Neutral FeCl₃ gives a colour with a phenolic OH.",
      definition:
        "- **Na metal** gives \\(\\mathrm{H_2}\\) with any O–H compound: alcohols, phenols and acids, but not ethers.\n" +
        "- **Aqueous NaOH** dissolves phenols and carboxylic acids as their sodium salts; alcohols stay undissolved.\n" +
        "- **Aqueous \\(\\mathrm{NaHCO_3}\\)** gives \\(\\mathrm{CO_2}\\) only with acids of pKa below about 6.4: carboxylic acids, picric acid, 2,4-dinitrophenol.\n" +
        "- **Neutral \\(\\mathrm{FeCl_3}\\)** gives a violet colour with phenol (and a colour with other phenols and enols); alcohols give none.",
      table: {
        columns: ["Screen", "Passes", "Fails", "Why"],
        rows: [
          { cells: ["Sodium metal (\\(\\mathrm{H_2}\\) evolved)", "Alcohols, phenols, carboxylic acids", "Ethers and alkanes", "Sodium replaces the hydrogen of an O–H group"] },
          { cells: ["Aqueous NaOH (dissolves as a salt)", "Phenols, cresols, nitrophenols, carboxylic acids", "Alcohols such as cyclohexanol and benzyl alcohol; ethers", "Hydroxide removes a proton only from acids stronger than water"] },
          { cells: ["Aqueous \\(\\mathrm{NaHCO_3}\\) (\\(\\mathrm{CO_2}\\) evolved)", "Carboxylic acids, picric acid, 2,4-dinitrophenol", "Phenol, cresols, m- and p-nitrophenol, alcohols", "Needs an acid stronger than carbonic acid, pKa below about 6.4"] },
          { cells: ["Neutral \\(\\mathrm{FeCl_3}\\) (colour)", "Phenol (violet), salicylic acid, other phenols and enols", "Alcohols, benzyl alcohol, anisole", "Iron(III) forms a coloured complex with an OH on the ring"] },
        ],
        caption: "Read the screens in order: NaOH tells a phenol from an alcohol, and NaHCO₃ tells a carboxylic acid (or a strongly nitrated phenol) from a phenol.",
      },
      selfCheckExample: {
        prompt:
          "A compound \\(\\mathrm{C_7H_8O}\\) dissolves in aqueous NaOH, does not give \\(\\mathrm{CO_2}\\) with \\(\\mathrm{NaHCO_3}\\), and gives a violet colour with neutral \\(\\mathrm{FeCl_3}\\). Is it benzyl alcohol, anisole or a cresol?",
        steps: [
          "Benzyl alcohol is an alcohol: no NaOH salt, no \\(\\mathrm{FeCl_3}\\) colour.",
          "Anisole has no O–H at all.",
          "A cresol is a phenol: it dissolves in NaOH, is too weak for \\(\\mathrm{NaHCO_3}\\) and gives the \\(\\mathrm{FeCl_3}\\) colour.",
        ],
        answer: "A cresol (a methylphenol).",
      },
      practiceSet: [
        { prompt: "Does p-nitrophenol give \\(\\mathrm{CO_2}\\) with aqueous \\(\\mathrm{NaHCO_3}\\)?", answer: "No; its pKa (7.1) is above about 6.4" },
        { prompt: "Which dissolves in aqueous NaOH: benzyl alcohol or p-cresol?", answer: "p-Cresol" },
        { prompt: "What colour does phenol give with neutral \\(\\mathrm{FeCl_3}\\)?", answer: "Violet" },
        { prompt: "Does picric acid give \\(\\mathrm{CO_2}\\) with aqueous \\(\\mathrm{NaHCO_3}\\)?", answer: "Yes; its pKa is about 0.4" },
      ],
      pyqExampleId: "912371a4-6af5-458d-8a50-be85f7187f9f", // 2022 — NaOH yes, NaHCO3 no, violet with FeCl3: phenol
      traps: [
        {
          title: "Benzyl alcohol is not a phenol",
          body: "In \\(\\mathrm{C_6H_5CH_2OH}\\) the OH sits on a \\(\\mathrm{CH_2}\\), not on the ring. It behaves as an alcohol: no salt with NaOH and no colour with \\(\\mathrm{FeCl_3}\\).",
        },
        {
          title: "One nitro group is not enough for bicarbonate",
          body: "m- and p-Nitrophenol are still weaker acids than carbonic acid. It takes two or three nitro groups at ortho and para (2,4-dinitrophenol, picric acid) to release \\(\\mathrm{CO_2}\\).",
        },
      ],
    },
  ],
};
