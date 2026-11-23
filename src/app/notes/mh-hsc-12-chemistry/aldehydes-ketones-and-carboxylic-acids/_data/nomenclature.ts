import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature",
  title: "Naming Aldehydes, Ketones and Carboxylic Acids",
  oneLineDefinition:
    "Trivial and IUPAC names: the endings al, one and oic acid, numbering from the carbonyl or carboxyl carbon, and the names of aromatic and ring compounds such as benzaldehyde, acetophenone and cyclohexanone.",
  whyItMatters:
    "3 questions, two of them from board papers and both drawn structures to name: a ring carrying an acetyl group with a chlorine beside it (2025) and a ring carrying CHO with an OH beside it (2026). The textbook exercise adds a methylcyclohexanone and oxalic acid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccak-naming-aldehydes-acids",
      name: "Naming aldehydes and carboxylic acids",
      intuition:
        "The names of an aldehyde and the acid with the same carbon chain go together. Trivial names come from the acid: acetic acid gives acetaldehyde. IUPAC names come from the alkane: drop the final e and add al, or add oic acid. The CHO or COOH carbon always ends the chain, so it is always carbon 1.",
      definition:
        "- **Trivial names:** replace 'ic acid' of the acid by 'aldehyde': formic acid and formaldehyde, acetic acid and acetaldehyde, propionic, butyric. Substituents in trivial names are placed with Greek letters: the carbon next to CHO or COOH is \\(\\alpha\\), the next \\(\\beta\\), then \\(\\gamma\\).\n" +
        "- **IUPAC names:** take the longest chain that includes the CHO or COOH carbon, number it from that carbon (C-1), and name it alkanal or alkanoic acid. The CHO and COOH groups are always at the end of the chain, so their locant 1 is not written.\n" +
        "- **Two such groups** at the two ends: keep the e of the alkane and add dial or dioic acid (ethanedioic acid is oxalic acid).\n" +
        "- **Aromatic compounds:** CHO on a benzene ring is benzaldehyde (benzenecarbaldehyde); COOH on the ring is benzoic acid. The ring carbon carrying the group is C-1 and other groups get the lowest numbers: 4-hydroxy-3-methylbenzaldehyde.\n" +
        "- **Ring compounds:** CHO or COOH on a cyclohexane ring gives cyclohexanecarbaldehyde and cyclohexanecarboxylic acid.",
      formula: {
        label: "IUPAC endings",
        latex: "\\text{alkane} \\to \\text{alkanal} \\quad \\text{and} \\quad \\text{alkane} \\to \\text{alkanoic acid}",
      },
      authoredExample: {
        prompt: "Write the IUPAC names of \\((\\text{CH}_3)_2\\text{CH-CHO}\\) and \\(\\text{CH}_3\\text{-CHCl-CH}_2\\text{-COOH}\\).",
        steps: [
          "First compound: the longest chain including the CHO carbon has three carbons. Number from CHO: C-1 is CHO, the methyl group is on C-2. Parent: propanal.",
          "Name: 2-methylpropanal (trivial name isobutyraldehyde).",
          "Second compound: four carbons including the COOH carbon. Number from COOH: C-1 is COOH, the chlorine is on C-3. Parent: butanoic acid.",
          "Name: 3-chlorobutanoic acid.",
        ],
        answer: "2-Methylpropanal and 3-chlorobutanoic acid",
      },
      selfCheckExample: {
        prompt: "Give the IUPAC name of \\(\\text{HOOC-CH}_2\\text{-COOH}\\) (malonic acid).",
        steps: ["Three carbons with a COOH group at each end: keep 'propane' and add 'dioic acid'."],
        answer: "Propanedioic acid",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{CH}_2\\text{=CH-COOH}\\) (acrylic acid).", answer: "Prop-2-enoic acid" },
        { prompt: "What is the trivial name of methanal?", answer: "Formaldehyde" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CHO}\\).", answer: "Butanal" },
      ],
      pyqExampleId: "2bf9549e-7ce9-4552-82b6-188cdac1f580",
      traps: [
        {
          title: "Writing butan-1-al",
          body: "The CHO carbon is always C-1, so no locant is written for it: butanal, not butan-1-al. The same holds for butanoic acid.",
        },
        {
          title: "Leaving out the carboxyl carbon",
          body: "The COOH carbon is part of the parent chain. \\(\\text{CH}_3\\text{COOH}\\) has two carbons and is ethanoic acid, not methanoic acid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-naming-ketones",
      name: "Naming ketones",
      intuition:
        "A trivial ketone name just lists the two groups on the carbonyl carbon, in alphabetical order, followed by the word ketone. The IUPAC name swaps the final e of the alkane for one and says where the carbonyl carbon is, counting from the end nearer to it.",
      definition:
        "- **Trivial names:** the two alkyl or aryl groups in alphabetical order plus 'ketone': dimethyl ketone (acetone), ethyl methyl ketone, methyl phenyl ketone (acetophenone), diphenyl ketone (benzophenone).\n" +
        "- **IUPAC names:** alkanone. Number the longest chain containing C=O from the end nearer to it, and put the locant before 'one': pentan-2-one, pentan-3-one. Propanone and butanone need no locant.\n" +
        "- **Two C=O groups:** keep the e and add dione with both locants: hexane-2,4-dione.\n" +
        "- **A higher priority group present:** the ketonic carbonyl becomes the prefix **oxo**: \\(\\text{CH}_3\\text{COCH}_2\\text{CHO}\\) is 3-oxobutanal.\n" +
        "- **Ring ketones:** the carbonyl carbon is C-1: 2-chloro-4-methylcyclohexanone.\n" +
        "- **Aromatic ketones:** the book keeps the names acetophenone and benzophenone. In the systematic form the chain is the parent and the ring a substituent: acetophenone is 1-phenylethan-1-one.",
      formula: {
        label: "IUPAC ending for a ketone",
        latex: "\\text{alkane} \\to \\text{alkan-}n\\text{-one}",
      },
      authoredExample: {
        prompt: "Write the IUPAC names of \\(\\text{CH}_3\\text{-CO-CH}_2\\text{-CH}_2\\text{-CH}_3\\) and \\((\\text{CH}_3)_2\\text{C=CH-CO-CH}_3\\) (mesityl oxide).",
        steps: [
          "First compound: five carbons; numbering from the left end puts C=O on C-2. Name: pentan-2-one (methyl n-propyl ketone).",
          "Second compound: five carbon chain with C=O and C=C. Number from the end nearer C=O: C-1 is \\(\\text{CH}_3\\), C-2 is C=O, the double bond starts at C-3 and the methyl group is on C-4.",
          "Name: 4-methylpent-3-en-2-one.",
        ],
        answer: "Pentan-2-one and 4-methylpent-3-en-2-one",
      },
      selfCheckExample: {
        prompt: "Give the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3\\).",
        steps: ["Five carbons; C=O is C-3 from either end."],
        answer: "Pentan-3-one (diethyl ketone)",
      },
      practiceSet: [
        { prompt: "Write the trivial name of \\(\\text{CH}_3\\text{COC}_2\\text{H}_5\\).", answer: "Ethyl methyl ketone" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CO-CH}_2\\text{-CHO}\\).", answer: "3-Oxobutanal" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CO-CH}_2\\text{-CO-CH}_2\\text{-CH}_3\\).", answer: "Hexane-2,4-dione" },
      ],
      pyqExampleId: "7c001cd5-f3c7-490b-b737-788a4b12b588",
      traps: [
        {
          title: "Calling it a ketone when an aldehyde is present",
          body: "CHO outranks a ketonic C=O, so the aldehyde gives the suffix and the ketone becomes 'oxo'. \\(\\text{CH}_3\\text{COCH}_2\\text{CHO}\\) is 3-oxobutanal, not a butanone.",
        },
        {
          title: "Dropping the locant",
          body: "Pentan-2-one and pentan-3-one are different compounds, so the locant is part of the name. Only propanone and butanone can do without one.",
        },
      ],
    },
  ],
};
