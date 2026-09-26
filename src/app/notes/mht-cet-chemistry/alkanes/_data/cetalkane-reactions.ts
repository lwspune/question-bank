import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkanes";

export const REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Alkanes, Free Radical Halogenation",
  title: "Free-Radical Halogenation: Reactivity and Selectivity",
  oneLineDefinition:
    "In UV light a halogen substitutes an H on an alkane through free radicals; fluorine reacts most violently and iodine least, and bromine is so selective that it almost always replaces the H on the most substituted carbon.",
  whyItMatters:
    "4 PYQs, all EASY: one reactivity order and three 'major product of bromination' questions. " +
    "One card.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetalkane-halogenation",
      name: "Halogen Reactivity and Bromine's Selectivity",
      intuition:
        "The halogen radical has to pull an H off the alkane. A tertiary radical is the most stable, so the tertiary H comes off most easily. Chlorine is reactive enough not to care much and gives mixtures; bromine is slow and choosy, so it takes the tertiary H about 99% of the time, or the secondary H when there is no tertiary one.",
      definition:
        "- **Reactivity**: **F₂ > Cl₂ > Br₂ > I₂**. Iodination is reversible and needs an oxidant.\n" +
        "- **Radical stability**: 3° > 2° > 1° > CH₃•.\n" +
        "- **Bromination (hν)**: isobutane (CH₃)₃CH → **(CH₃)₃CBr**, 2-bromo-2-methylpropane, ~99%. Propane → **2-bromopropane**.",
      table: {
        columns: ["Alkane + Br₂, UV", "Major product", "Why"],
        rows: [
          { cells: ["2-Methylpropane (isobutane)", "**2-Bromo-2-methylpropane**", "3° H"], pyqExampleId: "a7ed044f-b828-4175-b26c-745cf87bb71d" },
          { cells: ["(CH₃)₃CH", "**(CH₃)₃CBr**, 99%", "3° H"], pyqExampleId: "7e46ce2d-69cf-4563-99fb-e2375ef972c3" },
          { cells: ["Propane", "**2-Bromopropane**", "2° H"], pyqExampleId: "68558951-4f0d-4d1d-b7d5-ec5afbb938cf" },
        ],
      },
      selfCheckExample: {
        prompt: "Order the halogens by reactivity towards alkanes.",
        steps: ["Reactivity falls down group 17."],
        answer: "F₂ > Cl₂ > Br₂ > I₂",
      },
      pyqExampleId: "2b1da072-cc4f-4f2b-9175-e147947a975a",
      traps: [
        {
          title: "Counting hydrogens instead of ranking them",
          body: "Isobutane has nine primary H and one tertiary H, which would favour the 1-bromo product by number. Bromine's selectivity overrides the count: the tertiary bromide is 99%.",
        },
      ],
    },
  ],
  related: [
    { label: "Radicals and carbocations in organic reactions", href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry" },
    { label: "Preparing alkanes", href: `${BASE}/cetalkane-preparation` },
  ],
};
