import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkynes";

export const STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature and Identification of Alkynes",
  title: "Alkynes: Haloalkynes and Hybridisation",
  oneLineDefinition:
    "An alkyne has a C≡C triple bond whose two carbons are sp hybridised; a haloalkyne has its halogen on one of those triple-bond carbons.",
  whyItMatters:
    "4 PYQs. Three ask which structure is a haloalkyne, set three times in 2024; one counts sp² carbons in a diyne. " +
    "One card.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetalkyne-haloalkyne-hybridisation",
      name: "Haloalkynes and the Hybridisation of Carbon",
      intuition:
        "The name follows where the halogen sits. On a triple-bond carbon it is a haloalkyne; one carbon away it is propargylic; on a double-bond carbon it is a haloalkene. The hybridisation follows the bond: triple bond sp, double bond sp², single bonds only sp³.",
      definition:
        "- **Haloalkyne**: X bonded to an **sp carbon** of C≡C — CH₃CH₂C≡C–X, **chloroethyne** HC≡C–Cl.\n" +
        "- X on the carbon next to C≡C (CH₃C≡C–CH₂X, 3-chlorobut-1-yne) is **propargylic**, not a haloalkyne.\n" +
        "- **Hybridisation**: C≡C carbons **sp**; C=C carbons sp²; saturated carbons sp³.\n" +
        "- **Hexa-1,4-diyne** HC≡C–CH₂–C≡C–CH₃ has **no sp² carbon**.",
      table: {
        columns: ["Structure", "Class"],
        rows: [
          { cells: ["CH₃CH₂C≡C–X", "**Haloalkyne**"], pyqExampleId: "e560f8e8-6d09-4cf5-bb73-22053ac7abe3" },
          { cells: ["Chloroethyne, HC≡C–Cl", "**Haloalkyne**"], pyqExampleId: "44152afa-e783-4b7f-a056-f3e76a6ac621" },
          { cells: ["CH₃C≡C–CH₂X", "Propargylic halide"], pyqExampleId: "5c806b49-bf20-43ac-847f-99fe41fdc768" },
          { cells: ["CH₃CH₂CH=CH–X", "Haloalkene (vinylic)"] },
          { cells: ["sp² carbons in hexa-1,4-diyne", "**Zero**"], pyqExampleId: "75a7b927-81d5-47a6-a6a2-d2b35b15d6b9" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is a haloalkyne: chloroethyne, 3-chlorobut-1-yne, 1-chloropent-2-yne, 4-chloropent-2-yne?",
        steps: ["Only in chloroethyne is Cl on a triple-bond carbon; in the others it is one carbon away."],
        answer: "Chloroethyne",
      },
      pyqExampleId: "e560f8e8-6d09-4cf5-bb73-22053ac7abe3",
      traps: [
        {
          title: "Any halogen in an alkyne",
          body: "A halogen anywhere in the molecule does not make a haloalkyne. It must sit on the C≡C carbon itself.",
        },
      ],
    },
  ],
  related: [
    { label: "Making and reacting alkynes", href: `${BASE}/cetalkyne-reactions` },
  ],
};
