import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CCC_FUNCTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Functional Groups and Reagents",
  title: "Functional Groups and Reagents",
  oneLineDefinition:
    "Primary, secondary and tertiary alcohols, ethers, aldehyde and acid names, which acid is strongest, and the named reagents and catalysts: Grignard and Rosenmund.",
  whyItMatters:
    "Fifteen questions in the bank: nine from the 2023 shifts and six from the 2024 shifts, ten of them MODERATE. Many ask a name for a given formula, so learn how the names are built rather than each name alone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccccfu-groups",
      name: "Functional groups and their names",
      intuition:
        "A functional group decides a compound's family and its name. For alcohols, count the carbons bonded to the carbon that carries the OH.",
      definition:
        "Alcohols: one carbon on the C-OH carbon gives a **primary**, two a **secondary**, three a **tertiary** alcohol. **Butan-2-ol** is secondary; tertiary butyl alcohol is **2-methylpropan-2-ol**.\n\n" +
        "Other groups:\n" +
        "- **Ether**: an oxygen between two alkyl groups, R-O-R'.\n" +
        "- A -CHO on a ring takes the suffix **carbaldehyde**.\n" +
        "- (C6H5)2CO is **benzophenone**, a ketone.\n" +
        "- Acids by carbon count: methanoic (formic, HCOOH), ethanoic (acetic), propionic, **butyric** (four carbons).\n" +
        "- **Formic acid** is the **strongest** of these; each added alkyl group weakens the acid.\n" +
        "- Melting points: acetic acid **290 K** (it freezes in cold weather), ethanol **156 K**.",
      table: {
        columns: ["Formula or name", "Answer"],
        rows: [
          { cells: ["(CH3)3C-OH", "2-methylpropan-2-ol"], pyqExampleId: "33e90f36-5d87-4930-8feb-2c0e3114acb4" },
          { cells: ["R-O-R'", "Ether"], pyqExampleId: "d717805f-1042-45f3-95cf-8f8f6143d5be" },
          { cells: ["-CHO on a ring", "Carbaldehyde"], pyqExampleId: "cec35a5f-af0a-4454-a955-343f084e7e66" },
          { cells: ["(C6H5)2CO", "Benzophenone"], pyqExampleId: "a6e1f2bf-33bb-4f4d-98cf-3610da2f61f7" },
          { cells: ["CH3CH2CH2COOH", "Butyric acid"], pyqExampleId: "af4ae0a8-98e9-4abb-b322-80d071a13304" },
          { cells: ["Most acidic", "Formic acid"], pyqExampleId: "5c8ba8ea-b840-4cc7-8e44-18ae5b897a14" },
        ],
      },
      pyqExampleId: "2751533d-91cb-45f1-b04f-92f015fafec7",
      selfCheckExample: {
        prompt: "In propan-2-ol, how many carbons are bonded to the carbon carrying OH? What kind of alcohol is it?",
        steps: ["Propan-2-ol is CH3-CH(OH)-CH3.", "The middle carbon carries OH and is bonded to two carbons."],
        answer: "Two; a secondary alcohol.",
      },
      practiceSet: [
        { prompt: "What is the common name of methanoic acid?", answer: "Formic acid" },
        { prompt: "What kind of alcohol has three carbons on the C-OH carbon?", answer: "Tertiary" },
        { prompt: "About what temperature does acetic acid melt at, in kelvin?", answer: "290 K" },
      ],
      traps: [
        {
          title: "Butan-2-ol is not a ketone",
          body: "**Butan-2-ol** has an **-OH** group, so it is an alcohol. The ketone is butan-2-**one**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccccfu-reagents",
      name: "Named reagents and chemists",
      intuition:
        "Some reagents carry a chemist's name. Learn what each is made of and what it does.",
      definition:
        "Reagents:\n" +
        "- **Grignard reagent**: R-Mg-X, an alkyl magnesium halide such as **CH3-Mg-Cl**. It forms when a haloalkane (or aryl or vinyl halide) reacts with **magnesium** in dry ether.\n" +
        "- **Rosenmund catalyst**: **palladium on barium sulphate**; it reduces an acyl chloride to an aldehyde.\n" +
        "- Tollens' and Fehling's reagents test for aldehydes; Hinsberg's reagent tells amines apart.\n\n" +
        "Chemists:\n" +
        "- **H. C. Brown**: diborane with aldehydes and ketones (organoboron chemistry).\n" +
        "- **Vladimir Prelog**: Nobel **1975**, stereochemistry of organic molecules.",
      table: {
        columns: ["Name", "What it is"],
        rows: [
          { cells: ["Grignard reagent", "R-Mg-X, from magnesium"], pyqExampleId: "c5b4b940-6eaa-4bbe-b473-41149f1315aa" },
          { cells: ["Rosenmund catalyst", "Pd on BaSO4"], pyqExampleId: "ad0c0c36-050e-4c4e-96b6-64e6402b6a7a" },
          { cells: ["H. C. Brown", "Diborane reactions"], pyqExampleId: "4ddf9e05-6db5-4abd-a407-c8a734ee5547" },
          { cells: ["Prelog, 1975", "Stereochemistry"], pyqExampleId: "21cc70bb-afbf-4417-9673-60c195f0cee6" },
        ],
      },
      pyqExampleId: "8455b7fa-9127-466e-b54a-39de0df7e9de",
      selfCheckExample: {
        prompt: "What does the Rosenmund catalyst turn an acyl chloride into?",
        steps: ["Palladium on barium sulphate adds hydrogen to the acyl chloride.", "It is poisoned so it stops at the aldehyde."],
        answer: "An aldehyde.",
      },
      practiceSet: [
        { prompt: "Which metal is in a Grignard reagent?", answer: "Magnesium" },
        { prompt: "What does Tollens' reagent test for?", answer: "Aldehydes" },
        { prompt: "What does the Hinsberg reagent distinguish?", answer: "Amines" },
      ],
      traps: [
        {
          title: "Grignard needs magnesium",
          body: "A Grignard reagent always has **magnesium** between the carbon group and the halogen. Options with calcium or beryllium are decoys.",
        },
      ],
    },
  ],
};
