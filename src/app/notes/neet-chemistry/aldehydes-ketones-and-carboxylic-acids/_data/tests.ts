import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AK_TESTS_NOTE: SubtopicNote = {
  subtopicName: "Aldol, Haloform and Tests",
  title: "Aldol, Haloform and Tests",
  oneLineDefinition:
    "Reactions that depend on the α-hydrogen (aldol and cross aldol condensation, and the haloform reaction of methyl ketones), the Cannizzaro reaction of aldehydes without one, and the tests that tell aldehydes, ketones and acids apart.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. Two ask which aldol product cannot form: a cross aldol of propanone and pentan-2-one (2022), and 2,2-dimethylcyclopentanone with benzaldehyde (Re-NEET 2026). One follows acetophenone through the haloform reaction (Re-NEET 2026). Three are tests: Tollens' oxidising only the aldehyde in a keto aldehyde (2023), what Fehling's solution A is (2024), and a C₈H₈O compound identified from its 2,4-DNP, Fehling's and oxidation results (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchak-aldol",
      name: "Aldol condensation and the Cannizzaro reaction",
      intuition:
        "A hydrogen on the carbon next to C=O (the α-carbon) is slightly acidic, because the anion left behind is stabilised by the carbonyl group. Dilute alkali removes it, and the anion attacks the C=O of a second molecule. The product has an OH on the β-carbon; heating removes water and leaves a C=C between the α and β carbons. An aldehyde with no α-hydrogen cannot do this, and in concentrated alkali it does the Cannizzaro reaction instead.",
      definition:
        "- **Aldol reaction:** an aldehyde or ketone with at least one α-hydrogen, in dilute alkali, gives a β-hydroxy aldehyde (aldol) or β-hydroxy ketone (ketol).\n" +
        "- **Aldol condensation:** on heating this loses water to give an α,β-unsaturated aldehyde or ketone.\n" +
        "- **Cross aldol:** two different carbonyl compounds that both have α-hydrogens give a mixture of four products. A ketone can be one of the two partners.\n" +
        "- **Cannizzaro reaction:** an aldehyde with no α-hydrogen (methanal, benzaldehyde) in concentrated alkali. One molecule is reduced to the alcohol, another oxidised to the salt of the acid.",
      formula: {
        label: "Aldol condensation of ethanal",
        latex: "2\\,\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO} \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH=CHCHO} + \\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO}\\)", meaning: "3-hydroxybutanal, the aldol" },
          { symbol: "\\(\\text{CH}_3\\text{CH=CHCHO}\\)", meaning: "but-2-enal, the condensation product" },
        ],
      },
      authoredExample: {
        prompt: "Propanone is treated with dilute NaOH and the product is then heated. Name the product of each step.",
        steps: [
          "The \\(\\text{CH}_3\\) groups of propanone carry α-hydrogens. Alkali removes one, and the anion adds to the C=O of a second propanone molecule.",
          "The ketol is \\(\\text{(CH}_3)_2\\text{C(OH)CH}_2\\text{COCH}_3\\), 4-hydroxy-4-methylpentan-2-one.",
          "Heating removes water between the OH carbon and the \\(\\text{CH}_2\\) next to C=O: \\(\\text{(CH}_3)_2\\text{C=CHCOCH}_3\\).",
        ],
        answer: "4-Hydroxy-4-methylpentan-2-one, then 4-methylpent-3-en-2-one",
      },
      selfCheckExample: {
        prompt: "Benzaldehyde is warmed with concentrated NaOH. Name the two products and say which molecule is oxidised.",
        steps: [
          "Benzaldehyde has no α-hydrogen, so it cannot give an aldol. In concentrated alkali it gives the Cannizzaro reaction.",
          "One molecule is reduced to benzyl alcohol, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\); another is oxidised to the benzoate ion.",
        ],
        answer: "Benzyl alcohol and sodium benzoate; the molecule that becomes benzoate is oxidised",
      },
      practiceSet: [
        { prompt: "Which of methanal, ethanal and benzaldehyde can undergo aldol condensation?", answer: "Ethanal only; the other two have no α-hydrogen" },
        { prompt: "What does methanal give with concentrated NaOH?", answer: "Methanol and sodium methanoate" },
        { prompt: "A mixture of ethanal and propanal is treated with dilute NaOH. How many aldol products can form?", answer: "Four" },
        { prompt: "What is the aldol formed from ethanal, before heating?", answer: "3-Hydroxybutanal" },
      ],
      pyqExampleId: "974dab5a-f731-451a-b096-a206b50267f3",
      traps: [
        {
          title: "No α-hydrogen, no aldol",
          body: "Methanal and benzaldehyde cannot form the anion that starts an aldol reaction. With concentrated alkali they give the Cannizzaro reaction instead.",
        },
        {
          title: "The new C=C sits at a carbon that had a hydrogen",
          body: "In an aldol condensation the double bond forms at the α-carbon that lost a hydrogen. A carbon carrying two methyl groups and no hydrogen next to C=O cannot be that carbon.",
        },
        {
          title: "Dilute for aldol, concentrated for Cannizzaro",
          body: "The aldol reaction needs dilute alkali. The Cannizzaro reaction needs concentrated alkali and an aldehyde with no α-hydrogen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchak-haloform",
      name: "The haloform reaction and the iodoform test",
      intuition:
        "In a methyl ketone the three hydrogens of the CH₃ next to C=O are acidic. Sodium hypohalite replaces all three with halogen. The CX₃ group then breaks off as haloform, CHX₃, and leaves behind the salt of an acid with one carbon fewer. With iodine the haloform is iodoform, a yellow solid, so the reaction doubles as a test.",
      definition:
        "- Aldehydes and ketones with a \\(\\text{CH}_3\\text{CO}\\) group are oxidised by sodium hypohalite (NaOX) to the sodium salt of an acid with **one carbon fewer**, and the methyl group becomes **haloform**, \\(\\text{CHX}_3\\).\n" +
        "- A C=C double bond in the molecule is not attacked.\n" +
        "- **Iodoform test:** with NaOI (iodine and NaOH) a yellow precipitate of iodoform, \\(\\text{CHI}_3\\), forms. It detects a \\(\\text{CH}_3\\text{CO}\\) group, or a \\(\\text{CH}_3\\text{CH(OH)}\\) group, which is first oxidised to \\(\\text{CH}_3\\text{CO}\\).\n" +
        "- Ethanal is the only aldehyde with a \\(\\text{CH}_3\\text{CO}\\) group, so it is the only aldehyde that gives the test.\n" +
        "- With NaOCl the haloform is chloroform, which air and light slowly oxidise to phosgene, \\(\\text{COCl}_2\\), a poisonous gas.",
      formula: {
        label: "Haloform reaction of a methyl ketone",
        latex: "\\text{R-CO-CH}_3 + 3\\,\\text{NaOX} \\rightarrow \\text{R-COONa} + \\text{CHX}_3 + 2\\,\\text{NaOH}",
        symbols: [
          { symbol: "\\(\\text{NaOX}\\)", meaning: "sodium hypohalite, from the halogen and NaOH" },
          { symbol: "\\(\\text{CHX}_3\\)", meaning: "the haloform: chloroform, bromoform or iodoform" },
        ],
      },
      authoredExample: {
        prompt: "Butanone, CH₃COCH₂CH₃, is treated with iodine and NaOH. Name the two products.",
        steps: [
          "Butanone has a \\(\\text{CH}_3\\text{CO}\\) group, so it gives the reaction.",
          "The \\(\\text{CH}_3\\) becomes iodoform, \\(\\text{CHI}_3\\).",
          "The rest, \\(\\text{CH}_3\\text{CH}_2\\text{CO}\\), becomes the salt of an acid with three carbons, one fewer than butanone: \\(\\text{CH}_3\\text{CH}_2\\text{COONa}\\).",
        ],
        answer: "Iodoform (yellow precipitate) and sodium propanoate",
      },
      selfCheckExample: {
        prompt: "Which of propanal, propanone, ethanol and pentan-3-one give the iodoform test?",
        steps: [
          "Propanone, \\(\\text{CH}_3\\text{COCH}_3\\), has a \\(\\text{CH}_3\\text{CO}\\) group: yes.",
          "Ethanol, \\(\\text{CH}_3\\text{CH}_2\\text{OH}\\), has a \\(\\text{CH}_3\\text{CH(OH)}\\) group: yes.",
          "Propanal, \\(\\text{CH}_3\\text{CH}_2\\text{CHO}\\), and pentan-3-one, \\(\\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3\\), have neither: no.",
        ],
        answer: "Propanone and ethanol",
      },
      practiceSet: [
        { prompt: "What is the yellow solid formed in the iodoform test?", answer: "Iodoform, \\(\\text{CHI}_3\\)" },
        { prompt: "Which is the only aldehyde that gives the iodoform test?", answer: "Ethanal" },
        { prompt: "Does sodium hypoiodite attack a C=C double bond present in a methyl ketone?", answer: "No" },
        { prompt: "Does propan-2-ol give the iodoform test?", answer: "Yes: it has a \\(\\text{CH}_3\\text{CH(OH)}\\) group" },
      ],
      pyqExampleId: "3736201d-f626-4ed1-ae5a-afb924eaf383",
      traps: [
        {
          title: "Some alcohols pass the iodoform test too",
          body: "Ethanol and propan-2-ol have a \\(\\text{CH}_3\\text{CH(OH)}\\) group, which the reagent oxidises to \\(\\text{CH}_3\\text{CO}\\). They give iodoform even though they are not carbonyl compounds.",
        },
        {
          title: "The acid has one carbon fewer",
          body: "The \\(\\text{CH}_3\\) of the methyl ketone leaves as the haloform. Propanone gives an ethanoate, with two carbons, not a propanoate with three.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchak-tollens-fehling",
      name: "Tollens', Fehling's and 2,4-DNP tests",
      intuition:
        "An aldehyde has a hydrogen on its carbonyl carbon, so even mild oxidising agents turn it into an acid. A ketone has no such hydrogen and resists them. Tollens' and Fehling's reagents use this to pick out aldehydes. 2,4-DNP oxidises nothing: it reacts with the C=O of any aldehyde or ketone.",
      definition:
        "- **Tollens' reagent** is freshly prepared ammoniacal silver nitrate. Warmed with an aldehyde it gives a bright silver mirror, and the aldehyde is oxidised to the carboxylate ion.\n" +
        "- **Fehling's reagent** is two solutions mixed in equal amounts just before use: **solution A** is aqueous copper sulphate, **solution B** is alkaline sodium potassium tartrate (Rochelle salt). An aldehyde gives a reddish brown precipitate of \\(\\text{Cu}_2\\text{O}\\). **Aromatic aldehydes do not respond.**\n" +
        "- **2,4-DNP** gives a yellow, orange or red solid with any aldehyde or ketone, so it shows a C=O is present but cannot tell the two apart.\n" +
        "- **Ketones** are oxidised only under vigorous conditions (strong oxidising agents, high temperature). The C-C bond next to C=O breaks, giving acids with fewer carbons.\n" +
        "- A carboxylic acid gives effervescence of \\(\\text{CO}_2\\) with sodium hydrogencarbonate solution.",
      table: {
        columns: ["Test", "Reagent", "Positive sign", "Given by"],
        rows: [
          { cells: ["Tollens'", "Ammoniacal silver nitrate", "Silver mirror", "All aldehydes, aliphatic and aromatic"], pyqExampleId: "387e3c4b-651b-4484-8617-45db04c138e9", noteAmber: "NEET 2023: in a compound with both a CHO and a ketone group, Tollens' oxidised only the CHO, to COO⁻." },
          { cells: ["Fehling's", "Solution A (aqueous CuSO₄) and solution B (alkaline Rochelle salt)", "Reddish brown precipitate of \\(\\text{Cu}_2\\text{O}\\)", "Aliphatic aldehydes, not aromatic ones"], pyqExampleId: "282bf62b-46d5-4545-8397-eacd0ce9bb1f", noteAmber: "NEET 2024: Fehling's solution A is aqueous copper sulphate." },
          { cells: ["2,4-DNP", "2,4-Dinitrophenylhydrazine", "Yellow, orange or red precipitate", "Any aldehyde or ketone"] },
          { cells: ["Iodoform", "Iodine and NaOH", "Yellow precipitate of \\(\\text{CHI}_3\\)", "A \\(\\text{CH}_3\\text{CO}\\) or \\(\\text{CH}_3\\text{CH(OH)}\\) group"] },
          { cells: ["Sodium hydrogencarbonate", "Aqueous \\(\\text{NaHCO}_3\\)", "Effervescence of \\(\\text{CO}_2\\)", "Carboxylic acids"] },
        ],
      },
      pyqExampleId: "282bf62b-46d5-4545-8397-eacd0ce9bb1f",
      selfCheckExample: {
        prompt: "Propanal and propanone are in two unlabelled bottles. Which test tells them apart, and what does each show?",
        steps: [
          "2,4-DNP is no use: both have a C=O group and both give a precipitate.",
          "Tollens' reagent oxidises only the aldehyde: propanal gives a silver mirror, propanone gives none. (Fehling's works too, as propanal is aliphatic.)",
        ],
        answer: "Tollens' test: propanal gives a silver mirror, propanone does not",
      },
      practiceSet: [
        { prompt: "Does benzaldehyde give a reddish brown precipitate with Fehling's solution?", answer: "No: aromatic aldehydes do not respond to Fehling's test" },
        { prompt: "What forms the mirror in Tollens' test?", answer: "Silver metal, as the aldehyde is oxidised" },
        { prompt: "Which reagent gives a yellow, orange or red precipitate with both aldehydes and ketones?", answer: "2,4-Dinitrophenylhydrazine (2,4-DNP)" },
        { prompt: "What does a ketone give when oxidised by a strong oxidising agent under vigorous conditions?", answer: "Carboxylic acids with fewer carbon atoms, as a C-C bond breaks" },
      ],
      traps: [
        {
          title: "Fehling's misses aromatic aldehydes",
          body: "Benzaldehyde gives a silver mirror with Tollens' reagent but no precipitate with Fehling's. A compound that fails Fehling's may still be an aromatic aldehyde.",
        },
        {
          title: "2,4-DNP does not separate aldehydes from ketones",
          body: "Both give the coloured precipitate. It only shows that an aldehyde or ketone group is present.",
        },
        {
          title: "Ketones do oxidise, under drastic conditions",
          body: "Ketones resist mild oxidants, but strong oxidants at high temperature break a C-C bond next to the C=O and give acids with fewer carbons.",
        },
      ],
    },
  ],
};
