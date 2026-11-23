import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_OPTICAL_NOTE: SubtopicNote = {
  subtopicName: "Optical Isomerism in Halogen Derivatives",
  title: "Optical Isomerism in Halogen Derivatives",
  oneLineDefinition:
    "Chiral carbon atoms, non-superimposable mirror images, plane polarised light, optical activity, enantiomers and racemic mixtures, with 2-chlorobutane as the textbook's example.",
  whyItMatters:
    "9 questions. Five were set in board papers: explain optical isomerism or optical activity in 2-chlorobutane (2024, 2025 and 2026), define enantiomers (2026) and define a racemic mixture (2017). The textbook adds picking out chiral molecules and deciding which halide racemises on hydrolysis.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscchd-chiral-carbon",
      name: "Chiral carbon and chiral molecules",
      intuition:
        "Hold up your two hands: they are mirror images, yet you cannot lay one exactly on the other. A carbon joined to four different groups makes a molecule like that. Its mirror image is a different molecule, just as a left glove is different from a right glove.",
      definition:
        "- A carbon atom carrying **four different groups or atoms** is a **chiral carbon** (asymmetric carbon). It is marked with an asterisk: \\(\\text{CH}_3\\text{-}\\overset{*}{\\text{C}}\\text{HCl-CH}_2\\text{-CH}_3\\).\n" +
        "- A molecule with one chiral atom **cannot be superimposed on its mirror image**; it is a **chiral molecule**. The property is called handedness or chirality (Greek cheir, hand).\n" +
        "- A chiral molecule and its mirror image have the same structural formula but a different spatial arrangement of the four groups: they are **stereoisomers**.\n" +
        "- Stereoisomerism in which the isomers differ in the arrangement of groups round a chiral atom is **optical isomerism**.\n" +
        "- **Board answer for 2-chlorobutane, in order:** write its formula; list the groups on C-2 (H, Cl, \\(\\text{CH}_3\\), \\(\\text{C}_2\\text{H}_5\\)) and call C-2 chiral; say the molecule is not superimposable on its mirror image; name the two forms enantiomers; say they rotate plane polarised light equally in opposite directions; draw the two mirror images (Fig. 10.1).",
      authoredExample: {
        prompt: "Show that 2-bromopentane is chiral and 3-bromopentane is not.",
        steps: [
          "2-Bromopentane is \\(\\text{CH}_3\\text{-CHBr-CH}_2\\text{CH}_2\\text{CH}_3\\). C-2 carries H, Br, \\(\\text{CH}_3\\) and \\(\\text{C}_3\\text{H}_7\\): four different groups.",
          "So C-2 is a chiral carbon, and 2-bromopentane is a chiral molecule: \\(\\text{CH}_3\\text{-}\\overset{*}{\\text{C}}\\text{HBr-C}_3\\text{H}_7\\).",
          "3-Bromopentane is \\(\\text{CH}_3\\text{CH}_2\\text{-CHBr-CH}_2\\text{CH}_3\\). C-3 carries H, Br and two \\(\\text{C}_2\\text{H}_5\\) groups.",
          "Two of its groups are the same, so C-3 is not chiral and the molecule is superimposable on its mirror image.",
        ],
        answer: "2-Bromopentane is chiral (C-2 has four different groups); 3-bromopentane is not",
      },
      selfCheckExample: {
        prompt: "Does lactic acid, \\(\\text{CH}_3\\text{-CH(OH)-COOH}\\), contain a chiral carbon? Name the groups on it.",
        steps: [
          "Look at C-2: it carries H, OH, \\(\\text{CH}_3\\) and COOH.",
          "All four are different, so C-2 is a chiral carbon.",
        ],
        answer: "Yes. C-2 carries H, OH, CH₃ and COOH",
      },
      practiceSet: [
        { prompt: "Is 2-chloropropane, \\(\\text{CH}_3\\text{-CHCl-CH}_3\\), a chiral molecule?", answer: "No. C-2 carries two identical CH₃ groups" },
        { prompt: "How many chiral carbons are there in \\(\\text{CH}_3\\text{-CHCl-CHCl-CH}_3\\)?", answer: "Two: C-2 and C-3 each carry H, Cl, CH₃ and a CHClCH₃ group" },
        { prompt: "What symbol is used to mark a chiral atom in a formula?", answer: "An asterisk (*)" },
        { prompt: "What is the minimum condition for a carbon atom to be chiral?", answer: "It must carry four different groups or atoms" },
      ],
      pyqExampleId: "e279fc8f-eada-4726-8e20-899f200f039d",
      traps: [
        {
          title: "Listing only three groups",
          body: "To call a carbon chiral, write all four groups on it. In 2-chlorobutane the fourth group, H, is the one students forget, and the reason is incomplete without it.",
        },
        {
          title: "Two ethyls are not different",
          body: "A carbon with two identical groups is never chiral, however big those groups are. Compare the groups one by one before marking an asterisk.",
        },
        {
          title: "No diagram where one is asked",
          body: "'Explain optical isomerism' carries a mark for the two mirror image structures of the molecule. Draw them facing each other across a mirror line.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscchd-optical-activity",
      name: "Optical activity, enantiomers and racemic mixtures",
      intuition:
        "Ordinary light vibrates in every direction. Pass it through a Nicol prism and only one plane of vibration gets through. A solution of a chiral compound twists that plane. The two mirror image forms twist it by the same angle, one to the right and one to the left, so an equal mixture of the two does not twist it at all.",
      definition:
        "- **Plane polarised light:** light with oscillations in only one plane, obtained by passing ordinary light through a **Nicol prism** (made from calcite).\n" +
        "- **Optical activity:** the property of a substance by which it rotates the plane of plane polarised light. The angle turned is the **optical rotation**.\n" +
        "- **Enantiomers:** optical isomers that are non-superimposable mirror images of each other (also enantiomorphs or optical antipodes). They have identical physical properties except the sign of optical rotation, and identical chemical properties except towards optically active reagents.\n" +
        "- **Racemic modification:** an equimolar mixture of the two enantiomers, written (dl) or (±). It is **optically inactive**.\n" +
        "- Optical activity is an observable property; chirality is a description of structure. Optical activity is the consequence of chirality.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Dextrorotatory, d- or (+)", "Rotates the plane of plane polarised light to the right (clockwise)"] },
          { cells: ["Laevorotatory, l- or (-)", "Rotates the plane of plane polarised light to the left (anticlockwise)"] },
          { cells: ["Enantiomers", "Non-superimposable mirror images; equal optical rotation of opposite sign"] },
          {
            cells: ["Racemic mixture, (dl) or (±)", "Equimolar mixture of the two enantiomers; inactive because the rotation of one cancels the other"],
            pyqExampleId: "b0148ca1-b938-4248-82d0-27a5f0f09741",
            noteAmber: "Board 2017 asked you to define a racemic mixture: say equimolar and say why it is inactive.",
          },
          { cells: ["Fischer projection", "Cross formula: horizontal lines are bonds above the plane, vertical lines are bonds below it"] },
          { cells: ["Wedge formula", "Solid wedge: bond above the plane; broken wedge: bond below; plain line: bond in the plane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why is a racemic mixture of 2-bromobutane optically inactive, though every molecule in it is chiral?",
        steps: [
          "The mixture contains equal amounts of the dextrorotatory and laevorotatory forms.",
          "The rotation caused by one enantiomer is cancelled by the equal and opposite rotation caused by the other.",
        ],
        answer: "The equal and opposite rotations of the two enantiomers cancel",
      },
      practiceSet: [
        { prompt: "Which device converts ordinary light into plane polarised light?", answer: "A Nicol prism (polariser)" },
        { prompt: "How is a racemic mixture written?", answer: "(dl) or (±)" },
        { prompt: "What is the angle through which a substance turns the plane of plane polarised light called?", answer: "Optical rotation" },
        { prompt: "Towards what kind of reagent do two enantiomers behave differently?", answer: "Optically active reagents" },
      ],
      pyqExampleId: "297f569b-6b83-4d21-8c06-7ae82a0d6bc2",
      traps: [
        {
          title: "Half a definition of enantiomers",
          body: "'Mirror images' alone is not enough: a molecule with no chiral carbon is its own mirror image. Write NON-SUPERIMPOSABLE mirror images.",
        },
        {
          title: "Racemic needs the word equimolar",
          body: "A racemic mixture is an EQUIMOLAR mixture of the two enantiomers. Any other ratio still rotates the light.",
        },
      ],
    },
  ],
};
