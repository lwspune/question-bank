import type { SubtopicNote } from "@/app/notes/_types";

export const ACIDS_ALD_NOTE: SubtopicNote = {
  subtopicName: "Carboxylic Acids: Acidity and Reactions",
  title: "Carboxylic Acids: Acidity and Reactions",
  oneLineDefinition:
    "Carboxylic acids are made stronger by electron-withdrawing groups and weaker by donors; they are made by oxidation, by hydrolysis or from a Grignard reagent and CO₂, and they turn into esters, acid chlorides, amides, alcohols and alkanes.",
  whyItMatters:
    "Twenty-four PYQs, none numerical, four from 2026. Ten rank acid strength or ask which compounds release CO₂ from sodium hydrogencarbonate; four choose the route that ends at a carboxylic acid; ten ask what an acid or one of its derivatives does with a reagent.",
  concepts: [
    // C1 — acid strength
    {
      kind: "formula" as const,
      slug: "jcald-acid-strength",
      name: "Ranking the strength of carboxylic acids",
      intuition:
        "An acid is as strong as its anion is stable. The carboxylate ion already spreads its charge over two oxygens. A group that pulls electrons away spreads it further and strengthens the acid; a group that pushes electrons in weakens it.",
      definition:
        "- **−I groups** strengthen the acid. The more electronegative the group, the stronger (F > Cl > Br > I); the more such groups, the stronger (\\(\\mathrm{Cl_3C > Cl_2CH > ClCH_2}\\)); the closer to COOH, the stronger, because the inductive effect fades along the chain.\n" +
        "- **Alkyl groups** (+I) weaken it: methanoic acid (pKa 3.75) > ethanoic acid (4.76) > propanoic acid (4.88).\n" +
        "- Benzoic acid (4.19) is stronger than ethanoic acid. A para \\(\\mathrm{NO_2}\\) strengthens it; a para \\(\\mathrm{CH_3}\\) or \\(\\mathrm{OCH_3}\\) weakens it. Almost any ortho group strengthens it (the ortho effect).\n" +
        "- Carboxylic acids are stronger than phenols (pKa about 10). An acid stronger than carbonic acid (pKa about 6.4) releases \\(\\mathrm{CO_2}\\) from \\(\\mathrm{NaHCO_3}\\); phenols do not, except picric acid (2,4,6-trinitrophenol, pKa 0.38).",
      formula: {
        label: "pKa of some acids (lower pKa, stronger acid)",
        latex:
          "\\mathrm{CF_3COOH}\\ (0.23) < \\mathrm{CCl_3COOH}\\ (0.65) < \\mathrm{ClCH_2COOH}\\ (2.86) < \\mathrm{HCOOH}\\ (3.75) < \\mathrm{C_6H_5COOH}\\ (4.19) < \\mathrm{CH_3COOH}\\ (4.76)",
      },
      authoredExample: {
        prompt: "Arrange in decreasing order of acid strength: butanoic acid, 2-chlorobutanoic acid, 3-chlorobutanoic acid, 4-chlorobutanoic acid.",
        steps: [
          "The chlorine withdraws electrons by the −I effect, so the three chloro acids are all stronger than butanoic acid.",
          "The effect weakens with distance from the COOH group.",
          "Chlorine on C-2 is nearest, then C-3, then C-4.",
        ],
        answer: "2-Chlorobutanoic > 3-chlorobutanoic > 4-chlorobutanoic > butanoic acid",
      },
      selfCheckExample: {
        prompt: "Arrange in decreasing order of acid strength: benzoic acid, 4-methoxybenzoic acid, 4-nitrobenzoic acid, 4-methylbenzoic acid.",
        steps: [
          "\\(\\mathrm{NO_2}\\) withdraws electrons (−I, −R) and stabilises the carboxylate: strongest.",
          "\\(\\mathrm{CH_3}\\) donates weakly; \\(\\mathrm{OCH_3}\\) at the para position donates strongly by resonance (+R).",
        ],
        answer: "4-Nitrobenzoic > benzoic > 4-methylbenzoic > 4-methoxybenzoic acid",
      },
      practiceSet: [
        { prompt: "Which is stronger: \\(\\mathrm{Cl_2CHCOOH}\\) or \\(\\mathrm{ClCH_2COOH}\\)?", answer: "\\(\\mathrm{Cl_2CHCOOH}\\)" },
        { prompt: "Which is stronger: \\(\\mathrm{FCH_2COOH}\\) or \\(\\mathrm{ICH_2COOH}\\)?", answer: "\\(\\mathrm{FCH_2COOH}\\)" },
        { prompt: "Does phenol release \\(\\mathrm{CO_2}\\) from \\(\\mathrm{NaHCO_3}\\)?", answer: "No: it is weaker than carbonic acid" },
        { prompt: "Which is stronger: benzoic acid or ethanoic acid?", answer: "Benzoic acid (pKa 4.19 against 4.76)" },
      ],
      pyqExampleId: "a17825e4-f865-408e-b582-58821ced0195", // 2023 — CF3, F, Cl, Br and H acetic acids in descending order
      traps: [
        {
          title: "Distance weakens the inductive effect",
          body: "A halogen two or three carbons away from COOH has a small effect. Rank by position before counting halogens along a chain.",
        },
        {
          title: "Picric acid behaves like a carboxylic acid with NaHCO₃",
          body: "Three nitro groups make 2,4,6-trinitrophenol a strong acid, so it releases \\(\\mathrm{CO_2}\\) from \\(\\mathrm{NaHCO_3}\\). Other phenols do not.",
        },
      ],
    },

    // C2 — routes to carboxylic acids
    {
      kind: "reference" as const,
      slug: "jcald-acid-prep",
      name: "Routes that end at a carboxylic acid",
      intuition:
        "A carboxylic acid is made either by oxidising a carbon that already carries oxygen or a benzylic hydrogen, or by hydrolysing a group that is already at the acid oxidation level, or by adding \\(\\mathrm{CO_2}\\) to a Grignard reagent. Note whether each route keeps, adds or removes a carbon.",
      definition:
        "- Oxidation of a 1° alcohol or an aldehyde gives the acid with the same number of carbons. PCC is the exception: it stops at the aldehyde.\n" +
        "- Hot alkaline \\(\\mathrm{KMnO_4}\\) oxidises any alkyl side chain with a benzylic hydrogen down to COOH on the ring.\n" +
        "- Nitriles, amides, esters, acid chlorides and anhydrides all hydrolyse to the acid. A nitrile passes through the amide, and mild conditions stop there.\n" +
        "- A Grignard reagent with \\(\\mathrm{CO_2}\\) gives an acid one carbon longer. The haloform reaction gives an acid one carbon shorter than the methyl ketone.",
      table: {
        columns: ["Starting compound", "Reagents", "Product"],
        rows: [
          { cells: ["1° alcohol \\(\\mathrm{RCH_2OH}\\)", "Alkaline \\(\\mathrm{KMnO_4}\\), then \\(\\mathrm{H_3O^+}\\); or Jones reagent", "\\(\\mathrm{RCOOH}\\), same carbons"] },
          { cells: ["Aldehyde \\(\\mathrm{RCHO}\\)", "Tollens' reagent, \\(\\mathrm{K_2Cr_2O_7/H^+}\\) or bromine water", "\\(\\mathrm{RCOOH}\\), same carbons"] },
          { cells: ["Alkylbenzene with a benzylic H", "Hot alkaline \\(\\mathrm{KMnO_4}\\), then \\(\\mathrm{H_3O^+}\\)", "Benzoic acid, whatever the chain length"] },
          { cells: ["Nitrile \\(\\mathrm{RCN}\\)", "\\(\\mathrm{H_3O^+}\\) and heat (or \\(\\mathrm{OH^-}\\), then acid)", "\\(\\mathrm{RCOOH}\\), through the amide \\(\\mathrm{RCONH_2}\\)"] },
          { cells: ["Grignard reagent \\(\\mathrm{RMgX}\\)", "Dry ice \\(\\mathrm{CO_2}\\), then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{RCOOH}\\), one carbon more"] },
          { cells: ["Methyl ketone \\(\\mathrm{RCOCH_3}\\)", "\\(\\mathrm{I_2}\\) and NaOH, then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{RCOOH}\\), one carbon fewer, and \\(\\mathrm{CHI_3}\\)"] },
          { cells: ["1,1,1-Trihalide \\(\\mathrm{RCCl_3}\\)", "Aqueous KOH, then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{RCOOH}\\), same carbons"] },
          { cells: ["Ester, acid chloride or anhydride", "Water with acid or alkali, then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{RCOOH}\\) (an ester also gives the alcohol)"] },
        ],
        caption: "Grignard plus CO₂ adds a carbon; the haloform reaction removes one; the rest keep the count.",
      },
      selfCheckExample: {
        prompt: "Give two ways of making propanoic acid from bromoethane.",
        steps: [
          "Bromoethane has two carbons; propanoic acid has three, so a carbon must be added.",
          "KCN gives propanenitrile, \\(\\mathrm{CH_3CH_2CN}\\), which hydrolyses to the acid.",
          "Mg in dry ether gives \\(\\mathrm{C_2H_5MgBr}\\), which adds \\(\\mathrm{CO_2}\\); acid work-up gives the acid.",
        ],
        answer: "KCN, then \\(\\mathrm{H_3O^+}\\) and heat; or Mg in dry ether, then \\(\\mathrm{CO_2}\\), then \\(\\mathrm{H_3O^+}\\)",
      },
      practiceSet: [
        { prompt: "What does butylbenzene give with hot alkaline \\(\\mathrm{KMnO_4}\\), then acid?", answer: "Benzoic acid" },
        { prompt: "Does tert-butylbenzene give benzoic acid with hot \\(\\mathrm{KMnO_4}\\)?", answer: "No: it has no benzylic hydrogen" },
        { prompt: "What does ethanenitrile give on complete acid hydrolysis?", answer: "Ethanoic acid, through ethanamide" },
        { prompt: "What does propanone give with \\(\\mathrm{I_2}\\) and NaOH, then acid?", answer: "Ethanoic acid and iodoform" },
      ],
      pyqExampleId: "73f6c3fc-a0ce-4a8a-a162-fa2effaa74cb", // 2025 — which of five routes end at a carboxylic acid
      traps: [
        {
          title: "Mild hydrolysis of a nitrile stops at the amide",
          body: "A nitrile needs vigorous hydrolysis to reach the acid. Under mild conditions the product is \\(\\mathrm{RCONH_2}\\), not RCOOH.",
        },
        {
          title: "Count the carbons",
          body: "Grignard carboxylation adds one carbon and the haloform reaction removes one. A route that gives the right functional group but the wrong chain length is the wrong answer.",
        },
      ],
    },

    // C3 — reactions of acids and derivatives
    {
      kind: "reference" as const,
      slug: "jcald-acid-reactions",
      name: "Reactions of carboxylic acids and their derivatives",
      intuition:
        "Most reactions of an acid replace its OH (nucleophilic acyl substitution): with an alcohol it becomes an ester, with \\(\\mathrm{SOCl_2}\\) an acid chloride, with ammonia an amide. A few remove the COOH altogether, and one halogenates the carbon next to it.",
      definition:
        "- Acid derivatives react with nucleophiles by addition, then loss of the leaving group. The better the leaving group, the faster: \\(\\mathrm{Cl^- > RCOO^- > R'O^- > NH_2^-}\\).\n" +
        "- So the rate of hydrolysis is acid chloride > anhydride > ester > amide.\n" +
        "- Fischer esterification (acid, alcohol, concentrated \\(\\mathrm{H_2SO_4}\\)) is reversible. The OH of the water comes from the acid, the OR of the ester from the alcohol.\n" +
        "- The COOH group deactivates a benzene ring and directs to the meta position. Benzoic acid does not undergo Friedel–Crafts reactions.",
      table: {
        columns: ["Reagent", "Product from RCOOH", "Remember"],
        rows: [
          { cells: ["\\(\\mathrm{NaHCO_3}\\) solution", "\\(\\mathrm{RCOONa + CO_2 + H_2O}\\)", "Effervescence separates acids from phenols"] },
          { cells: ["\\(\\mathrm{R'OH}\\), conc. \\(\\mathrm{H_2SO_4}\\), heat", "Ester \\(\\mathrm{RCOOR'}\\)", "Reversible; nucleophilic acyl substitution"] },
          { cells: ["\\(\\mathrm{SOCl_2}\\) (or \\(\\mathrm{PCl_5}\\), \\(\\mathrm{PCl_3}\\))", "Acid chloride \\(\\mathrm{RCOCl}\\)", "With \\(\\mathrm{SOCl_2}\\) the by-products \\(\\mathrm{SO_2}\\) and HCl are gases"] },
          { cells: ["\\(\\mathrm{P_2O_5}\\), heat; or heat alone for a suitable diacid", "Anhydride \\(\\mathrm{(RCO)_2O}\\)", "cis-Butenedioic (maleic) acid gives a cyclic anhydride on heating; the trans acid cannot"] },
          { cells: ["\\(\\mathrm{NH_3}\\), then heat", "Amide \\(\\mathrm{RCONH_2}\\)", "Through the ammonium salt \\(\\mathrm{RCOONH_4}\\)"] },
          { cells: ["\\(\\mathrm{LiAlH_4}\\) or \\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_3O^+}\\)", "1° alcohol \\(\\mathrm{RCH_2OH}\\)", "\\(\\mathrm{NaBH_4}\\) does not reduce COOH"] },
          { cells: ["Sodium salt with NaOH and CaO (soda lime), heat", "Alkane \\(\\mathrm{RH}\\)", "Decarboxylation: one carbon fewer"] },
          { cells: ["Electrolysis of the sodium salt (Kolbe)", "Alkane \\(\\mathrm{R{-}R}\\)", "Two R groups join"] },
          { cells: ["\\(\\mathrm{X_2}\\) and red phosphorus, then water (Hell–Volhard–Zelinsky)", "α-Halo acid \\(\\mathrm{RCH(X)COOH}\\)", "Only the α-carbon is halogenated; it needs an α-hydrogen"] },
          { cells: ["Conc. \\(\\mathrm{HNO_3}\\) and conc. \\(\\mathrm{H_2SO_4}\\) (on benzoic acid)", "3-Nitrobenzoic acid", "COOH is meta-directing and deactivating"] },
        ],
        caption: "The first six change only the COOH group; soda lime and Kolbe remove it; HVZ acts at the α-carbon and nitration on the ring.",
      },
      selfCheckExample: {
        prompt: "Butanoic acid is treated with bromine and red phosphorus, then water. Separately, its sodium salt is heated with soda lime. Give both products.",
        steps: [
          "HVZ puts a bromine on the α-carbon (C-2) only.",
          "Soda lime removes \\(\\mathrm{CO_2}\\) from the salt and leaves the alkane with one carbon fewer.",
        ],
        answer: "2-Bromobutanoic acid; propane",
      },
      practiceSet: [
        { prompt: "Which is hydrolysed faster: ethanoyl chloride or ethanamide?", answer: "Ethanoyl chloride" },
        { prompt: "What does ethanoic acid give with \\(\\mathrm{SOCl_2}\\)?", answer: "Ethanoyl chloride, \\(\\mathrm{CH_3COCl}\\)" },
        { prompt: "Why does fumaric (trans-butenedioic) acid not form an anhydride on heating?", answer: "Its two COOH groups are on opposite sides and cannot reach each other" },
        { prompt: "What does salicylic acid give with acetic anhydride?", answer: "Aspirin (acetylsalicylic acid): the phenolic OH is acetylated" },
      ],
      pyqExampleId: "9d22a9c3-70c2-40b4-9543-781dc414eff3", // 2021 — rate of hydrolysis of an ester, an acid chloride and an anhydride
      traps: [
        {
          title: "HVZ halogenates only the α-carbon",
          body: "The halogen goes to the carbon next to COOH, never further along the chain. An acid with no α-hydrogen, such as 2,2-dimethylpropanoic acid, does not react.",
        },
        {
          title: "Soda lime removes a carbon",
          body: "Decarboxylation of \\(\\mathrm{RCOONa}\\) gives \\(\\mathrm{RH}\\), with one carbon fewer than the acid. Sodium propanoate gives ethane, not propane.",
        },
      ],
    },
  ],
};
