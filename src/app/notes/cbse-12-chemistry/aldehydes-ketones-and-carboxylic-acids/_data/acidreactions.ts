import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_ACIDREACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions of Carboxylic Acids",
  title: "Chemical Reactions of Carboxylic Acids",
  oneLineDefinition:
    "Acidity of carboxylic acids and how substituents change it, the reactions of the -OH and -COOH group (salts, anhydrides, esters, acyl chlorides, amides, reduction, decarboxylation), the Hell-Volhard-Zelinsky reaction and ring substitution in benzoic acid.",
  whyItMatters:
    "30 questions, twenty-seven of them from board papers from 2022 to 2025. The board asks acid-strength orders or \"which acid is stronger and why\" in each of those years, assertion-reason items on pKa (2024), why benzoic acid is meta directing and gives no Friedel-Crafts reaction (2023, 2024, 2025), the Hell-Volhard-Zelinsky reaction (2023, 2024), the reactions with PCl₅, P₄O₁₀ and ammonia (2024, 2025), decarboxylation (2024, 2025) and an ester to identify from its hydrolysis (2023, 2025). In 2026 acid strength came inside longer questions on the aldehydes and ketones reactions page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcak-acidity",
      name: "Acidity and the effect of substituents",
      intuition:
        "An acid is strong when the ion left after it loses H⁺ is stable. In a carboxylate ion the negative charge is shared equally by two oxygen atoms, which is very stable. Any group that pulls electrons away spreads that charge further and makes the acid stronger; any group that pushes electrons in makes it weaker.",
      definition:
        "- Carboxylic acids are weaker than mineral acids but **stronger than alcohols and most simple phenols** (pKa about 16 for ethanol, 10 for phenol, 4.76 for ethanoic acid).\n" +
        "- **Smaller pKa, stronger acid.** Trifluoroacetic acid (pKa 0.23) is the strongest carboxylic acid.\n" +
        "- **Stronger than phenol:** the carboxylate ion has **two equivalent resonance structures** with the charge on the more electronegative **oxygen** atoms. The phenoxide ion has non-equivalent structures that put the charge on **less electronegative carbon** atoms.\n" +
        "- **Electron-withdrawing groups increase acidity** by stabilising the carboxylate ion (inductive and/or resonance effect); **electron-donating groups decrease** it.\n" +
        "- Effect of groups, in increasing order of acidity: **Ph < I < Br < Cl < F < CN < NO₂ < CF₃**. More halogens add up: CCl₃COOH > CHCl₂COOH > ClCH₂COOH.\n" +
        "- The inductive effect **falls with distance**: a group on the α-carbon strengthens the acid more than the same group further along the chain.\n" +
        "- A **phenyl or vinyl group joined directly** to -COOH increases acidity, because the sp² carbon it joins is more electronegative.\n" +
        "- On the ring of benzoic acid: 4-methoxybenzoic acid (pKa 4.46) < benzoic acid (4.19) < 4-nitrobenzoic acid (3.41).",
      formula: {
        label: "Acid strength scale",
        latex: "\\text{p}K_\\text{a} = -\\log K_\\text{a}",
        symbols: [
          { symbol: "\\(K_\\text{a}\\)", meaning: "acid dissociation constant" },
          { symbol: "\\(\\text{p}K_\\text{a}\\)", meaning: "smaller value means a stronger acid" },
        ],
      },
      authoredExample: {
        prompt: "Arrange butanoic acid, 2-chlorobutanoic acid and 3-chlorobutanoic acid in increasing order of acid strength. Give the reason.",
        steps: [
          "Chlorine withdraws electrons (-I effect) and stabilises the carboxylate ion, so both chloro acids beat butanoic acid.",
          "The -I effect falls with distance: chlorine on C-2 (the α-carbon) is closer to -COOH than chlorine on C-3.",
          "So 2-chlorobutanoic acid is the strongest.",
        ],
        answer: "Butanoic acid < 3-chlorobutanoic acid < 2-chlorobutanoic acid",
      },
      selfCheckExample: {
        prompt: "Arrange CH₃COOH, C₆H₅COOH and C₆H₅CH₂COOH in increasing order of acid strength.",
        steps: [
          "The CH₃ of ethanoic acid pushes electrons in: weakest.",
          "In phenylacetic acid the phenyl group is one carbon away, so its electron pull is weakened.",
          "In benzoic acid the phenyl group is joined directly; its sp² carbon is more electronegative: strongest.",
        ],
        answer: "CH₃COOH < C₆H₅CH₂COOH < C₆H₅COOH",
      },
      practiceSet: [
        { prompt: "Which is the stronger acid, CF₃COOH or CCl₃COOH?", answer: "CF₃COOH: fluorine withdraws electrons more strongly than chlorine" },
        { prompt: "Which is the stronger acid, methanoic acid or ethanoic acid, and why?", answer: "Methanoic acid: the CH₃ group of ethanoic acid pushes electrons in and destabilises its anion" },
        { prompt: "Which has the lower pKa, 4-methylbenzoic acid or benzoic acid?", answer: "Benzoic acid: the methyl group donates electrons and weakens the acid" },
      ],
      pyqExampleId: "bba7c61a-686f-49c5-ad27-fb003aa38561",
      traps: [
        {
          title: "Reading pKa the wrong way round",
          body: "A lower pKa means a stronger acid. Board 2024 set an assertion that put a weaker acid's pKa below a stronger one's: the assertion was false.",
        },
        {
          title: "Counting resonance structures instead of judging them",
          body: "The phenoxide ion has more resonance structures than the carboxylate ion, yet phenol is the weaker acid. What matters is that the carboxylate's two structures are equivalent and put the charge on oxygen.",
        },
        {
          title: "Ignoring where the group sits",
          body: "The same halogen strengthens an acid much more on the α-carbon than on the β- or γ-carbon. In an order, compare position as well as the kind of group.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcak-cooh-reactions",
      name: "Reactions of the -OH and -COOH group",
      intuition:
        "Some reactions break the O-H bond (salts, the NaHCO₃ test). Some replace the whole -OH (anhydride, ester, acyl chloride, amide). Some change the -COOH group itself: reduction to -CH₂OH, or loss of CO₂ altogether.",
      definition:
        "- **O-H cleavage:** acids give hydrogen with electropositive metals and salts with alkalies; unlike phenols they also react with **carbonates and hydrogencarbonates**, giving CO₂, which is used to detect -COOH.\n" +
        "- **Anhydride:** heating with H₂SO₄ or **P₂O₅** removes water from two molecules.\n" +
        "- **Esterification:** with an alcohol or phenol and conc. H₂SO₄ or HCl gas; the reaction is reversible.\n" +
        "- **PCl₅, PCl₃ or SOCl₂** replace -OH by Cl. **SOCl₂ is preferred**: its other two products are gases and escape.\n" +
        "- **Ammonia** gives the ammonium salt, which on strong heating gives the **amide**.\n" +
        "- **Reduction:** LiAlH₄, or better **diborane**, gives the primary alcohol. **NaBH₄ does not reduce -COOH**. Diborane does not easily reduce ester, nitro or halo groups.\n" +
        "- **Decarboxylation:** the sodium salt heated with **soda lime** (NaOH and CaO, 3 : 1) loses CO₂ and gives a hydrocarbon with **one carbon fewer**.",
      table: {
        columns: ["Reagent", "Reaction", "Point to remember"],
        rows: [
          {
            cells: ["NaHCO₃", "\\(\\text{RCOOH} + \\text{NaHCO}_3 \\rightarrow \\text{RCOONa} + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow\\)", "Brisk effervescence: tells an acid from an aldehyde, a ketone or a phenol"],
            pyqExampleId: "9ce7b17e-7a1d-4447-b378-f67db3309bb3",
            noteAmber: "Board 2025 asked which test tells propanal from propanoic acid: the sodium bicarbonate test.",
          },
          {
            cells: ["P₂O₅ (P₄O₁₀) or H₂SO₄, heat", "\\(2\\,\\text{CH}_3\\text{COOH} \\rightarrow (\\text{CH}_3\\text{CO})_2\\text{O} + \\text{H}_2\\text{O}\\)", "Gives the acid anhydride"],
            pyqExampleId: "3dd6fd21-593a-4a2f-b875-6719bcc5749b",
            noteAmber: "Board 2025 asked the product of ethanoic acid heated with P₄O₁₀: ethanoic anhydride.",
          },
          { cells: ["R'OH, conc. H₂SO₄", "\\(\\text{RCOOH} + \\text{R'OH} \\rightleftharpoons \\text{RCOOR'} + \\text{H}_2\\text{O}\\)", "Reversible: remove the water or the ester as it forms"] },
          { cells: ["PCl₅, PCl₃ or SOCl₂", "\\(\\text{RCOOH} + \\text{SOCl}_2 \\rightarrow \\text{RCOCl} + \\text{SO}_2 + \\text{HCl}\\)", "SOCl₂ preferred: SO₂ and HCl escape as gases"] },
          {
            cells: ["NH₃, then strong heat", "\\(\\text{CH}_3\\text{COOH} + \\text{NH}_3 \\rightarrow \\text{CH}_3\\text{COONH}_4 \\xrightarrow{\\Delta} \\text{CH}_3\\text{CONH}_2 + \\text{H}_2\\text{O}\\)", "Ammonium salt first, then the amide; phthalic acid goes on to phthalimide"],
            pyqExampleId: "6664f03c-f949-4af4-b65e-382b37c127bf",
            noteAmber: "Board 2025 asked to identify the acid that gives ammonium acetate with NH₃.",
          },
          { cells: ["LiAlH₄ or B₂H₆", "\\(\\text{RCOOH} \\rightarrow \\text{RCH}_2\\text{OH}\\)", "NaBH₄ does not reduce -COOH"] },
          {
            cells: ["Soda lime (NaOH and CaO), heat", "\\(\\text{RCOONa} + \\text{NaOH} \\xrightarrow[\\Delta]{\\text{CaO}} \\text{RH} + \\text{Na}_2\\text{CO}_3\\)", "Decarboxylation: one carbon fewer"],
            pyqExampleId: "9cbbaa4a-5737-44e9-a36e-2d2fb1b487c8",
            noteAmber: "Board 2024 asked what sodium benzoate gives with soda lime: benzene.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write the equations for converting propanoic acid into propanamide.",
        steps: [
          "Ammonia first forms the ammonium salt.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{COOH} + \\text{NH}_3 \\rightarrow \\text{CH}_3\\text{CH}_2\\text{COONH}_4\\)",
          "Strong heating removes water and gives the amide.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{COONH}_4 \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{H}_2\\text{O}\\)",
        ],
        answer: "Propanamide, CH₃CH₂CONH₂",
      },
      practiceSet: [
        { prompt: "Why is SOCl₂ preferred to PCl₅ for making acyl chlorides from acids?", answer: "Its other products, SO₂ and HCl, are gases that escape, so the acyl chloride is easy to purify" },
        { prompt: "Which hydrocarbon forms when sodium propanoate is heated with soda lime?", answer: "Ethane, CH₃CH₃" },
        { prompt: "Name a reagent that reduces a -COOH group to -CH₂OH but does not easily reduce an ester group.", answer: "Diborane, B₂H₆" },
      ],
      pyqExampleId: "dbd2a439-9d2e-4ab8-b867-1f90915e8cf8",
      traps: [
        {
          title: "Decarboxylation that keeps the carbon",
          body: "Soda lime removes the -COOH carbon as carbonate, so the hydrocarbon has one carbon fewer than the acid. A seven-carbon benzoate cannot give a seven-carbon hydrocarbon.",
        },
        {
          title: "Reducing an acid with NaBH₄",
          body: "Sodium borohydride does not reduce the carboxyl group. Use LiAlH₄ or diborane.",
        },
        {
          title: "Halogenating the methyl group with PCl₅",
          body: "PCl₅, PCl₃ and SOCl₂ replace the -OH of -COOH and give the acyl chloride. Chlorine on the α-carbon needs Cl₂ with red phosphorus (Hell-Volhard-Zelinsky).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-hvz-ring",
      name: "Hell-Volhard-Zelinsky reaction and ring substitution",
      intuition:
        "The carbon next to -COOH carries the acid's α-hydrogens, and chlorine or bromine with a little red phosphorus swaps one of them for a halogen. On a benzene ring the -COOH group pulls electrons away, so the ring reacts slowly and sends a new group to the meta position. It also grabs the AlCl₃ catalyst, so Friedel-Crafts reactions fail.",
      definition:
        "- **Hell-Volhard-Zelinsky (HVZ) reaction:** carboxylic acids **having an α-hydrogen** are halogenated at the **α-position** by **chlorine or bromine with a small amount of red phosphorus**, giving α-halocarboxylic acids.\n" +
        "- **Ring substitution:** in aromatic acids the -COOH group is **deactivating and meta directing**.\n" +
        "- Aromatic acids **do not undergo Friedel-Crafts reactions**: the -COOH group is deactivating, and the catalyst **AlCl₃ (a Lewis acid) gets bonded to the carboxyl group**.",
      formula: {
        label: "Hell-Volhard-Zelinsky reaction",
        latex: "\\text{R-CH}_2\\text{-COOH} \\xrightarrow[\\text{(ii) H}_2\\text{O}]{\\text{(i) X}_2/\\text{red P}} \\text{R-CH(X)-COOH} \\qquad (\\text{X} = \\text{Cl, Br})",
      },
      authoredExample: {
        prompt: "Convert butanoic acid into 2-bromobutanoic acid. Would 2,2-dimethylpropanoic acid react the same way?",
        steps: [
          "The α-carbon of butanoic acid (C-2) carries two hydrogens, so HVZ works.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COOH} \\xrightarrow[\\text{(ii) H}_2\\text{O}]{\\text{(i) Br}_2/\\text{red P}} \\text{CH}_3\\text{CH}_2\\text{CH(Br)COOH}\\)",
          "In 2,2-dimethylpropanoic acid, (CH₃)₃CCOOH, the α-carbon carries three methyl groups and no hydrogen.",
        ],
        answer: "Br₂ with red P, then water; 2,2-dimethylpropanoic acid has no α-hydrogen and does not react",
      },
      selfCheckExample: {
        prompt: "Benzoic acid is warmed with concentrated HNO₃ and concentrated H₂SO₄. Write the main product.",
        steps: [
          "-COOH withdraws electrons: the ring is deactivated and the meta position is attacked.",
          "\\(\\text{C}_6\\text{H}_5\\text{COOH} \\xrightarrow{\\text{conc. HNO}_3 + \\text{conc. H}_2\\text{SO}_4} \\text{3-O}_2\\text{N-C}_6\\text{H}_4\\text{-COOH}\\)",
        ],
        answer: "m-Nitrobenzoic acid (3-nitrobenzoic acid)",
      },
      practiceSet: [
        { prompt: "Give the two reasons why benzoic acid does not undergo Friedel-Crafts reactions.", answer: "The -COOH group deactivates the ring, and the AlCl₃ catalyst bonds to the carboxyl group" },
        { prompt: "Which of ethanoic acid and 2-methylpropanoic acid gives an α-chloro acid with Cl₂ and red P?", answer: "Both: each has at least one α-hydrogen" },
        { prompt: "What does ethanoic acid give with Cl₂ and red phosphorus, followed by water?", answer: "Chloroethanoic acid, ClCH₂COOH" },
      ],
      pyqExampleId: "e41db68e-2f11-49eb-922a-0b77d5df43f1",
      traps: [
        {
          title: "Saying -COOH increases electron density at meta",
          body: "The -COOH group withdraws electrons from every position. Meta substitution happens because the ortho and para positions lose even more electron density, not because meta gains any. Board 2023 marked the opposite reason false.",
        },
        {
          title: "Giving one reason for no Friedel-Crafts reaction",
          body: "Write both: the ring is deactivated by -COOH, and the AlCl₃ catalyst is tied up by bonding to the carboxyl group.",
        },
      ],
    },
  ],
};
