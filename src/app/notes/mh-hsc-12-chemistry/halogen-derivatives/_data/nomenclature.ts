import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature of Halogen Derivatives",
  title: "Naming Halogen Derivatives",
  oneLineDefinition:
    "Common names (alkyl group plus halide) and IUPAC names (haloalkanes and haloarenes), with the numbering rules for chains, double bonds and rings.",
  whyItMatters:
    "4 questions, all from the textbook exercise: write the IUPAC names of a halo alkene, a branched haloalkane, a substituted cyclohexane and a substituted benzene. None has been set in the board papers in this bank, but every board answer in this chapter names its products, so the rules here earn marks on every other page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscchd-iupac-chains",
      name: "IUPAC names of haloalkanes and haloalkenes",
      intuition:
        "In the IUPAC system the halogen is never the suffix. It is a prefix, like a branch: fluoro, chloro, bromo, iodo. So name the hydrocarbon chain first, then hang the halogen and any alkyl branches on it with numbers, and list the prefixes in alphabetical order.",
      definition:
        "- **Common name:** the alkyl group followed by the halide: methyl iodide, tert-butyl chloride.\n" +
        "- **IUPAC name:** haloalkane. The halogen is a **prefix**: fluoro, chloro, bromo, iodo.\n" +
        "- **Step 1:** choose the longest chain of carbons. If there is a double bond, the chain must contain it.\n" +
        "- **Step 2:** number the chain so the double bond gets the lowest number; with no double bond, give the substituents the lowest set of numbers.\n" +
        "- **Step 3:** if both directions give the same set, the prefix that comes first in the alphabet gets the lower number.\n" +
        "- **Step 4:** write the prefixes in **alphabetical order** (bromo before methyl), then the parent name.",
      authoredExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CHCl-CH}_2\\text{-CH(CH}_3)\\text{-CH}_3\\).",
        steps: [
          "Longest chain: five carbons, so the parent is pentane.",
          "From the left: chlorine on C-2, methyl on C-4, set \\(\\{2, 4\\}\\). From the right: methyl on C-2, chlorine on C-4, also \\(\\{2, 4\\}\\).",
          "The sets tie, so the prefix first in the alphabet, chloro, takes the lower number: chlorine on C-2.",
          "Prefixes in alphabetical order: chloro, then methyl.",
        ],
        answer: "2-Chloro-4-methylpentane",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CH(CH}_3)\\text{-CH}_2\\text{I}\\).",
        steps: [
          "Longest chain: three carbons, propane.",
          "Number from the iodine end: iodine on C-1, methyl on C-2.",
        ],
        answer: "1-Iodo-2-methylpropane",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CHBr-CH}_3\\).", answer: "2-Bromopropane" },
        { prompt: "Write the IUPAC name of tert-butyl bromide, \\((\\text{CH}_3)_3\\text{C-Br}\\).", answer: "2-Bromo-2-methylpropane" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CH=CH-CH}_2\\text{Cl}\\).", answer: "1-Chlorobut-2-ene" },
        { prompt: "Write the IUPAC name of allyl bromide, \\(\\text{CH}_2\\text{=CH-CH}_2\\text{Br}\\).", answer: "3-Bromopropene" },
      ],
      pyqExampleId: "7eebc46c-e790-46d8-a585-f49bdd2a5d56",
      traps: [
        {
          title: "The double bond gets the low number, not the halogen",
          body: "In a haloalkene, number the chain from the end nearer the double bond, even if that gives the halogen a higher number. \\(\\text{CH}_2\\text{=CH-CH}_2\\text{-CH}_2\\text{Cl}\\) is 4-chlorobut-1-ene, not 1-chlorobut-3-ene.",
        },
        {
          title: "Missing the longest chain",
          body: "A methyl group written below or beside the carbon carrying the halogen may be part of the longest chain. Count every possible chain before you choose the parent.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscchd-names-table",
      name: "Common names, IUPAC names and ring compounds",
      intuition:
        "Most compounds in this chapter have an everyday name that you will meet in reactions: ethyl bromide, isobutyl bromide, vinyl chloride, benzyl iodide. Learn each with its IUPAC name. For a ring, the ring is the parent: number round the ring so the substituents get the lowest numbers.",
      definition:
        "- Aryl halides are named as **haloarenes** in both systems.\n" +
        "- For a dihalogen derivative of benzene, the common name uses **o-, m-, p-**; the IUPAC name uses the numerals **1,2-, 1,3-, 1,4-**.\n" +
        "- In a ring, start numbering at a substituted carbon and go round the way that gives the **lowest set** of numbers. If two ways tie, the prefix first in the alphabet gets number 1.",
      table: {
        columns: ["Formula", "Common name", "IUPAC name"],
        rows: [
          { cells: ["\\(\\text{CH}_2\\text{Cl}_2\\)", "Methylene chloride", "Dichloromethane"] },
          { cells: ["\\((\\text{CH}_3)_2\\text{CH-CH}_2\\text{Br}\\)", "Isobutyl bromide", "1-Bromo-2-methylpropane"] },
          { cells: ["\\((\\text{CH}_3)_3\\text{C-CH}_2\\text{Cl}\\)", "Neopentyl chloride", "1-Chloro-2,2-dimethylpropane"] },
          { cells: ["\\(\\text{CH}_2\\text{=CH-Cl}\\)", "Vinyl chloride", "Chloroethene"] },
          { cells: ["\\(\\text{HC}\\equiv\\text{C-Cl}\\)", "Chloroacetylene", "Chloroethyne"] },
          { cells: ["\\(\\text{C}_6\\text{H}_5\\text{-CH}_2\\text{I}\\)", "Benzyl iodide", "Iodophenylmethane"] },
          { cells: ["\\(\\text{I-C}_6\\text{H}_4\\text{-CH}_3\\) (para)", "p-Iodotoluene", "1-Iodo-4-methylbenzene"] },
          { cells: ["\\(\\text{C}_6\\text{H}_4\\text{Cl}_2\\) (meta)", "m-Dichlorobenzene", "1,3-Dichlorobenzene"] },
        ],
      },
      selfCheckExample: {
        prompt: "A cyclohexane ring carries a bromine atom on one carbon and a methyl group two carbons away from it. Write its IUPAC name.",
        steps: [
          "The parent is cyclohexane.",
          "Start at a substituted carbon and go the short way round: the substituents are on C-1 and C-3.",
          "The set \\(\\{1, 3\\}\\) is the same from either end, so bromo, first in the alphabet, takes C-1.",
        ],
        answer: "1-Bromo-3-methylcyclohexane",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of o-dichlorobenzene.", answer: "1,2-Dichlorobenzene" },
        { prompt: "Write the common name of 2-chloropropane.", answer: "Isopropyl chloride" },
        { prompt: "Write the IUPAC name of p-dibromobenzene.", answer: "1,4-Dibromobenzene" },
      ],
      pyqExampleId: "e07dce8a-3563-4a57-bc04-37d26ff1d634",
      traps: [
        {
          title: "o-, m-, p- belong to common names only",
          body: "An IUPAC name uses numbers: 1,2- for ortho, 1,3- for meta and 1,4- for para. 'p-Dichlorobenzene' is the common name; '1,4-dichlorobenzene' is the IUPAC name.",
        },
        {
          title: "Lowest set first, alphabet second",
          body: "In a ring, first find the numbering that gives the lowest set of numbers. Only when two numberings give the same set does the alphabet decide which substituent is C-1.",
        },
      ],
    },
  ],
};
