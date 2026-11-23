import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_CARBOXYL_NOTE: SubtopicNote = {
  subtopicName: "Chemical Properties of Carboxylic Acids",
  title: "Reactions of Carboxylic Acids",
  oneLineDefinition:
    "Why carboxylic acids are acidic and how substituents change their strength, the tests for the COOH group, and their conversion into acyl chlorides, amides, anhydrides, esters, hydrocarbons and alcohols.",
  whyItMatters:
    "15 questions, ten of them from board papers from 2016 to 2026. The board asked acetic acid to acetic anhydride three times (2020, 2023, 2026), acetic acid to ethanol three times (2023, 2026 twice), esterification twice (2019, 2023), the action of soda lime on sodium acetate (2025), the Hell-Volhard-Zelinsky reaction (2019) and two choices of the strongest or weakest acid (2016, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccak-acidity",
      name: "Acidity of carboxylic acids and the effect of substituents",
      intuition:
        "When a carboxylic acid gives up its proton, the negative charge is shared equally by two oxygen atoms, through two equivalent resonance structures. That well stabilised ion is why the acid gives up its proton easily. A group that pulls electrons away spreads the charge further and makes the acid stronger; a group that pushes electrons in makes it weaker.",
      definition:
        "- \\(\\text{R-COOH} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R-COO}^- + \\text{H}_3\\text{O}^+\\). The carboxylate ion has two equivalent resonance structures.\n" +
        "- **pKa:** lower pKa (higher Ka) means a stronger acid. Alcohols about 16, phenols about 10, carboxylic acids about 4.5. The alkoxide ion is destabilised by the +I effect of R; the phenoxide ion is moderately stabilised (its resonance structures are not equivalent); the carboxylate ion is well stabilised (equivalent resonance structures).\n" +
        "- **Halogens** (-I effect) strengthen the acid: pKa of FCH₂COOH 2.56, ClCH₂COOH 2.86, BrCH₂COOH 2.90, ICH₂COOH 3.18, against 4.76 for CH₃COOH. More halogens make it stronger still: Cl₂CHCOOH 1.26.\n" +
        "- **Alkyl groups** (+I) weaken the acid, so formic acid is stronger than acetic acid.\n" +
        "- **Benzoic acid** (pKa 4.2) is stronger than acetic acid (4.76): the sp² ring carbon withdraws electrons. Electron withdrawing groups (Cl, CN, NO₂) make substituted benzoic acids stronger, for example 4-nitrobenzoic acid (3.41); electron donating groups (CH₃, OH, OCH₃, NH₂) make them weaker, for example 4-methylbenzoic acid (4.4).\n" +
        "- **Position matters** for OH and OCH₃ (the present book does not discuss this; Board 2025 used it). They donate electrons by resonance only to the ortho and para positions. From the meta position only their -I effect acts, so 3-hydroxybenzoic acid is slightly stronger than benzoic acid.\n" +
        "- **Tests for COOH:** blue litmus turns red (water soluble phenols do this too); sodium bicarbonate gives brisk effervescence of CO₂ (phenols do not); warming with ethanol and a drop of concentrated H₂SO₄ gives the fruity smell of an ester.",
      formula: {
        label: "Acid strength from pKa",
        latex: "\\text{p}K_a = -\\log_{10} K_a \\qquad \\text{lower p}K_a \\Rightarrow \\text{stronger acid}",
      },
      authoredExample: {
        prompt: "Arrange \\(\\text{CH}_3\\text{COOH}\\), \\(\\text{ClCH}_2\\text{COOH}\\), \\(\\text{Cl}_2\\text{CHCOOH}\\) and \\(\\text{FCH}_2\\text{COOH}\\) in increasing order of acid strength and justify.",
        steps: [
          "pKa values: \\(\\text{CH}_3\\text{COOH}\\) 4.76, \\(\\text{ClCH}_2\\text{COOH}\\) 2.86, \\(\\text{FCH}_2\\text{COOH}\\) 2.56, \\(\\text{Cl}_2\\text{CHCOOH}\\) 1.26. Lower pKa means stronger acid.",
          "A halogen's -I effect stabilises the carboxylate ion. Fluorine is more electronegative than chlorine, so \\(\\text{FCH}_2\\text{COOH}\\) is stronger than \\(\\text{ClCH}_2\\text{COOH}\\).",
          "Two chlorine atoms withdraw more than one, so \\(\\text{Cl}_2\\text{CHCOOH}\\) is the strongest; \\(\\text{CH}_3\\text{COOH}\\) has no halogen and is the weakest.",
        ],
        answer: "CH₃COOH < ClCH₂COOH < FCH₂COOH < Cl₂CHCOOH",
      },
      selfCheckExample: {
        prompt: "Benzoic acid has pKa 4.2 and acetic acid 4.76. Which is the stronger acid, and why?",
        steps: ["Lower pKa means stronger acid. The sp² carbon of the ring withdraws electrons (-I) and stabilises the benzoate ion."],
        answer: "Benzoic acid",
      },
      practiceSet: [
        { prompt: "Which is the stronger acid, a carboxylic acid or a phenol? Give the reason.", answer: "The carboxylic acid: its anion has two equivalent resonance structures, the phenoxide ion does not" },
        { prompt: "Is bromoacetic acid stronger or weaker than chloroacetic acid?", answer: "Weaker (pKa 2.90 against 2.86): bromine is less electronegative" },
        { prompt: "Which test tells a carboxylic acid from a phenol?", answer: "Sodium bicarbonate: the acid gives brisk effervescence of CO₂, the phenol does not" },
      ],
      pyqExampleId: "5267272f-fb6f-4e16-b191-53a2629b905d",
      traps: [
        {
          title: "Reading pKa the wrong way round",
          body: "A lower pKa means a stronger acid. Trichloroacetic acid has a smaller pKa than acetic acid because it is the stronger acid.",
        },
        {
          title: "Litmus as proof of COOH",
          body: "Water soluble phenols also turn blue litmus red. The sodium bicarbonate test (effervescence of CO₂) is the one that picks out the carboxylic acid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-acid-derivatives",
      name: "Acyl chlorides, amides, anhydrides and esters",
      intuition:
        "In every one of these reactions the OH of the COOH group is replaced: by Cl in an acyl chloride, by NH₂ in an amide, by an OCOR group in an anhydride, and by an OR group in an ester. The carbonyl part stays.",
      definition:
        "- **Acyl chlorides:** heating with PCl₃, PCl₅ or SOCl₂. SOCl₂ is preferred because its byproducts, SO₂ and HCl, are gases and escape: \\(\\text{R-COOH} + \\text{SOCl}_2 \\to \\text{R-COCl} + \\text{SO}_2 + \\text{HCl}\\). Also \\(3\\,\\text{R-COOH} + \\text{PCl}_3 \\to 3\\,\\text{R-COCl} + \\text{H}_3\\text{PO}_3\\) and \\(\\text{R-COOH} + \\text{PCl}_5 \\to \\text{R-COCl} + \\text{POCl}_3 + \\text{HCl}\\).\n" +
        "- **Amides:** with ammonia the acid gives an ammonium salt, which on strong heating loses water: \\(\\text{R-COOH} + \\text{NH}_3 \\to \\text{R-COONH}_4 \\xrightarrow[-\\text{H}_2\\text{O}]{\\Delta} \\text{R-CONH}_2\\). An acyl chloride with ammonia also gives the amide.\n" +
        "- **Anhydrides:** two molecules of a monocarboxylic acid heated with P₂O₅ or concentrated H₂SO₄ lose one molecule of water (reversible). A better yield comes from heating the sodium salt with the acyl chloride, both made from the acid (with NaOH and with SOCl₂): \\(\\text{R-COONa} + \\text{R-COCl} \\xrightarrow{\\Delta} (\\text{RCO})_2\\text{O} + \\text{NaCl}\\).\n" +
        "- **Esters:** the acid warmed with an alcohol and a little concentrated H₂SO₄ gives an ester (fruity smell) and water. The reaction is reversible.\n" +
        "- **Hell-Volhard-Zelinsky reaction** (Board 2019; not in the present book): an acid with an \\(\\alpha\\)-hydrogen, with Cl₂ or Br₂ and red phosphorus, has that hydrogen replaced by the halogen: \\(\\text{CH}_3\\text{COOH} + \\text{Cl}_2 \\xrightarrow{\\text{red P}} \\text{ClCH}_2\\text{COOH} + \\text{HCl}\\).",
      formula: {
        label: "Replacing the OH of COOH",
        latex: "\\text{R-COOH} \\xrightarrow{\\text{SOCl}_2} \\text{R-COCl}, \\qquad 2\\,\\text{R-COOH} \\xrightarrow[\\Delta]{\\text{P}_2\\text{O}_5} (\\text{RCO})_2\\text{O} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Convert propanoic acid into propanamide. Write the reactions.",
        steps: [
          "With ammonia the acid forms the ammonium salt: \\(\\text{CH}_3\\text{CH}_2\\text{COOH} + \\text{NH}_3 \\to \\text{CH}_3\\text{CH}_2\\text{COONH}_4\\).",
          "Strong heating removes water: \\(\\text{CH}_3\\text{CH}_2\\text{COONH}_4 \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{H}_2\\text{O}\\).",
        ],
        answer: "Propanamide, CH₃CH₂CONH₂",
      },
      selfCheckExample: {
        prompt: "Write the reaction of benzoic acid with thionyl chloride.",
        steps: ["The OH of COOH is replaced by Cl; SO₂ and HCl escape as gases."],
        answer: "C₆H₅COOH + SOCl₂ → C₆H₅COCl + SO₂ + HCl (benzoyl chloride)",
      },
      practiceSet: [
        { prompt: "Why is thionyl chloride preferred to PCl₅ for making an acyl chloride?", answer: "Its byproducts, SO₂ and HCl, are gases and escape, leaving the acyl chloride pure" },
        { prompt: "Name the ester formed from ethanoic acid and methanol with concentrated H₂SO₄.", answer: "Methyl ethanoate, CH₃COOCH₃" },
        { prompt: "Can benzoic acid give the Hell-Volhard-Zelinsky reaction?", answer: "No: it has no \\(\\alpha\\)-hydrogen" },
      ],
      pyqExampleId: "e2719f42-4038-493c-9e3c-93a2cb03fa7c",
      traps: [
        {
          title: "An anhydride from one molecule",
          body: "An anhydride comes from two molecules of acid losing one molecule of water, so write 2 R-COOH on the left.",
        },
        {
          title: "Esterification written as one-way",
          body: "Ester formation is reversible. Write concentrated H₂SO₄ and heat over the arrow; the acid is a catalyst and also takes up the water formed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-decarboxylation-reduction",
      name: "Decarboxylation and reduction",
      intuition:
        "Soda lime pulls the carboxyl carbon out as sodium carbonate, so the hydrocarbon left is one carbon shorter. A powerful hydride reducing agent instead turns COOH into CH₂OH and keeps every carbon.",
      definition:
        "- **Decarboxylation:** the sodium salt of a carboxylic acid heated with soda lime (NaOH with CaO) gives a hydrocarbon with one carbon atom less: \\(\\text{CH}_3\\text{COONa} + \\text{NaOH} \\xrightarrow[\\Delta]{\\text{CaO}} \\text{CH}_4 + \\text{Na}_2\\text{CO}_3\\).\n" +
        "- **Reduction:** lithium aluminium hydride in dry ether reduces a carboxylic acid to the primary alcohol, \\(\\text{R-CH}_2\\text{OH}\\).\n" +
        "- **Diborane** also reduces COOH, but it does not reduce an ester (COOR), nitro (NO₂) or halo (X) group.\n" +
        "- **Sodium borohydride does not reduce the COOH group.**",
      formula: {
        label: "Decarboxylation with soda lime",
        latex: "\\text{R-COONa} + \\text{NaOH} \\xrightarrow[\\Delta]{\\text{CaO}} \\text{R-H} + \\text{Na}_2\\text{CO}_3",
      },
      authoredExample: {
        prompt: "What is obtained when sodium propanoate is heated with soda lime? Write the reaction.",
        steps: [
          "Soda lime removes the carboxyl carbon as sodium carbonate.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{COONa} + \\text{NaOH} \\xrightarrow[\\Delta]{\\text{CaO}} \\text{CH}_3\\text{CH}_3 + \\text{Na}_2\\text{CO}_3\\)",
          "The three-carbon salt gives a two-carbon hydrocarbon.",
        ],
        answer: "Ethane (and sodium carbonate)",
      },
      selfCheckExample: {
        prompt: "Which reagent reduces a COOH group but leaves an ester group in the same molecule untouched?",
        steps: ["The book names a reducing agent that does not reduce COOR, NO₂ or X groups."],
        answer: "Diborane, B₂H₆",
      },
      practiceSet: [
        { prompt: "Does sodium borohydride reduce a carboxylic acid?", answer: "No: NaBH₄ does not reduce the COOH group" },
        { prompt: "What is soda lime?", answer: "Sodium hydroxide mixed with calcium oxide" },
        { prompt: "Name the inorganic product of decarboxylation with soda lime.", answer: "Sodium carbonate, Na₂CO₃" },
      ],
      pyqExampleId: "7c809b8d-b878-4328-84d1-58ac5f590c1d",
      traps: [
        {
          title: "Getting the carbon count wrong",
          body: "Decarboxylation loses one carbon; reduction with LiAlH₄ keeps every carbon. Propanoic acid gives propan-1-ol on reduction but ethane from its sodium salt and soda lime.",
        },
        {
          title: "NaBH₄ for an acid",
          body: "Sodium borohydride reduces aldehydes and ketones but not COOH. For an acid name LiAlH₄ (or diborane).",
        },
      ],
    },
  ],
};
