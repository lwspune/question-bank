import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Aldehydes, Ketones and Carboxylic Acids",
  title: "Classifying Aldehydes, Ketones and Carboxylic Acids",
  oneLineDefinition:
    "How aldehydes, ketones and carboxylic acids are sorted by what is bonded to the carbonyl carbon: aliphatic or aromatic aldehydes, simple, mixed or aromatic ketones, and mono, di or tri carboxylic acids.",
  whyItMatters:
    "4 questions, two of them from board papers: the classification of aliphatic ketones with examples, followed by the action of sodium hypoiodite on acetone (2022), and picking the dicarboxylic acid from four acids (2025). The textbook adds what an aromatic ketone is and whether phenylacetic acid is an aromatic acid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccak-carbonyl-classes",
      name: "Classes of aldehydes and ketones",
      intuition:
        "Look only at the two groups joined to the carbonyl carbon. If one of them is a hydrogen atom, the compound is an aldehyde; if both are alkyl or aryl groups, it is a ketone. Then ask whether those groups are aliphatic or aromatic, and for an aliphatic ketone, whether its two alkyl groups are the same or different.",
      definition:
        "- **Carbonyl group:** \\(\\text{>C=O}\\). In an **aldehyde** the carbonyl carbon carries at least one hydrogen, so the functional group is \\(-\\text{CHO}\\) (the formyl group). In a **ketone** the carbonyl carbon carries two alkyl or aryl groups (the ketonic carbonyl group).\n" +
        "- **Aliphatic aldehyde:** the \\(-\\text{CHO}\\) group is joined to an sp³ (saturated) carbon. Formaldehyde, \\(\\text{HCHO}\\), is also counted as aliphatic.\n" +
        "- **Aromatic aldehyde:** the \\(-\\text{CHO}\\) group is joined directly to an aromatic ring (benzaldehyde, salicylaldehyde, p-nitrobenzaldehyde).\n" +
        "- **Aliphatic ketones** have two alkyl groups. They are **simple (symmetrical)** when the two are identical and **mixed (unsymmetrical)** when they differ.\n" +
        "- **Aromatic ketones** have two aryl groups, or one aryl and one alkyl group.",
      table: {
        columns: ["Class", "Groups on the carbonyl carbon", "Example"],
        rows: [
          { cells: ["Aliphatic aldehyde", "One hydrogen and one alkyl group (two hydrogens in methanal)", "Ethanal, CH₃CHO"] },
          { cells: ["Aromatic aldehyde", "One hydrogen and an aromatic ring", "Benzaldehyde, C₆H₅CHO"] },
          {
            cells: ["Simple (symmetrical) ketone", "Two identical alkyl groups", "Acetone (dimethyl ketone), CH₃COCH₃"],
            pyqExampleId: "8b8a5edc-e42f-4748-8acc-6cf38c12c9b9",
            noteAmber: "Board 2022 asked this classification with examples, then the action of sodium hypoiodite on acetone.",
          },
          { cells: ["Mixed (unsymmetrical) ketone", "Two different alkyl groups", "Ethyl methyl ketone (butanone), C₂H₅COCH₃"] },
          { cells: ["Aromatic ketone", "Two aryl groups, or one aryl and one alkyl group", "Acetophenone C₆H₅COCH₃; benzophenone C₆H₅COC₆H₅"] },
        ],
      },
      practiceSet: [
        {
          prompt: "Classify benzophenone, acetone, butanone and acetophenone as simple, mixed or aromatic ketones.",
          answer: "Acetone is simple; butanone is mixed; acetophenone and benzophenone are aromatic",
        },
        { prompt: "Is diethyl ketone, \\(\\text{C}_2\\text{H}_5\\text{COC}_2\\text{H}_5\\), a simple or a mixed ketone?", answer: "Simple: both alkyl groups are ethyl" },
        { prompt: "Is p-nitrobenzaldehyde an aliphatic or an aromatic aldehyde?", answer: "Aromatic: the CHO group is joined directly to the ring" },
      ],
      traps: [
        {
          title: "Calling acetophenone a mixed ketone",
          body: "Its two groups do differ, but one of them is a phenyl ring, so it is an aromatic ketone. The simple and mixed classes apply only to aliphatic ketones.",
        },
        {
          title: "An example with no formula",
          body: "A board answer to 'classify with examples' gets its marks for the rule and a named example with its condensed formula, such as \\(\\text{CH}_3\\text{COCH}_3\\). A name alone, or a class with no example, loses part of the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccak-acid-classes",
      name: "Classes of carboxylic acids",
      intuition:
        "A carboxylic acid is sorted twice. First by where its COOH group sits: on an alkyl group, directly on a ring, or on a side chain of a ring. Then by how many COOH groups it has: one, two or three.",
      definition:
        "- **Aliphatic carboxylic acids (fatty acids):** the \\(-\\text{COOH}\\) group is bonded to an alkyl group. Formic acid, \\(\\text{HCOOH}\\), is also counted as aliphatic.\n" +
        "- **Aromatic carboxylic acids:** one or more \\(-\\text{COOH}\\) groups are joined directly to the aromatic ring (benzoic acid).\n" +
        "- **Side chain aromatic acids:** the \\(-\\text{COOH}\\) group is on a carbon of a side chain, not on the ring itself (phenylacetic acid, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{COOH}\\)).\n" +
        "- **By the number of carboxyl groups:** mono, di and tri carboxylic acids.\n" +
        "- In nature: L-lactic acid in curd, citric acid in lemons, acetic acid in vinegar.",
      table: {
        columns: ["Class", "Rule", "Example"],
        rows: [
          { cells: ["Aliphatic (fatty acid)", "COOH bonded to an alkyl group (or to H in formic acid)", "Propionic acid, CH₃CH₂COOH"] },
          { cells: ["Aromatic", "COOH joined directly to the ring", "Benzoic acid, C₆H₅COOH"] },
          { cells: ["Side chain aromatic", "COOH on a side chain carbon, not on the ring", "Phenylacetic acid, C₆H₅CH₂COOH"] },
          { cells: ["Monocarboxylic", "One COOH group", "Acetic acid, CH₃COOH"] },
          {
            cells: ["Dicarboxylic", "Two COOH groups", "Oxalic acid (COOH)₂; phthalic acid C₆H₄(COOH)₂"],
            pyqExampleId: "e0a420ad-b772-4a67-8c9a-05c56c064ea7",
            noteAmber: "Board 2025 asked which of four named acids is a dicarboxylic acid.",
          },
          { cells: ["Tricarboxylic", "Three COOH groups", "Citric acid"] },
        ],
      },
      practiceSet: [
        { prompt: "How many COOH groups does adipic acid, \\(\\text{HOOC(CH}_2)_4\\text{COOH}\\), have, and what class is it?", answer: "Two, so it is a dicarboxylic acid" },
        { prompt: "Is formic acid aliphatic or aromatic?", answer: "Aliphatic, even though its COOH group is bonded to a hydrogen atom" },
        { prompt: "Benzoic acid or phenylacetic acid: which has its COOH group directly on the ring?", answer: "Benzoic acid" },
      ],
      traps: [
        {
          title: "Every acid with a ring is the same kind",
          body: "Phenylacetic acid is aromatic but of the side chain type, because a \\(-\\text{CH}_2-\\) group sits between the ring and COOH. In benzoic acid the COOH is on the ring itself.",
        },
      ],
    },
  ],
};
