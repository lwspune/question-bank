import type { SubtopicNote } from "@/app/notes/_types";

export const POLYHALOGEN_NOTE: SubtopicNote = {
  subtopicName: "Polyhalogen Compounds — Freon, DDT, War Gases",
  title: "Polyhalogen Compounds: Freons, DDT, BHC and War Gases",
  oneLineDefinition:
    "A handful of named polyhalogen compounds recur: Freon-12 (CCl₂F₂) the refrigerant, DDT and BHC the insecticides, and the war gases — phosgene COCl₂, mustard gas (ClCH₂CH₂)₂S, tear gas CCl₃NO₂ — each asked by name, formula or atom count.",
  whyItMatters:
    "12 PYQs, none HARD — pure recall. Two ask Freon-12 by name, two ask DDT's structure from four drawings, one asks its replacement (BHC), one asks the gas chloroform gives on oxidation (phosgene), and six are the war gases — which is tear gas (twice), the formula of mustard gas, how many Cl or N or S atoms in n moles, which has the most chlorines. " +
    "Two tables.",
  concepts: [
    // 1 — freons and insecticides
    {
      kind: "reference" as const,
      slug: "cethal-freons-ddt-bhc",
      name: "Freons, DDT and BHC",
      intuition:
        "Freons are chlorofluoromethanes and -ethanes: stable, non-toxic, easily liquefied — ideal refrigerants until their ozone damage phased them out. Freon-12 is dichlorodifluoromethane. DDT is 1,1,1-trichloro-2,2-bis(4-chlorophenyl)ethane: a CHCCl₃ carbon carrying two p-chlorophenyl rings. BHC (benzene hexachloride, lindane/gammexane) replaced it as an insecticide.",
      definition:
        "- **Freon-12**: \\(\\text{CCl}_2\\text{F}_2\\), dichlorodifluoromethane, made from \\(\\text{CCl}_4\\) with SbF₃/SbCl₅ (Swarts). Refrigerant-22 \\(\\text{CHClF}_2\\) from chloroform.\n" +
        "- **DDT**: two p-chlorophenyl rings on one carbon that also carries a \\(\\text{CCl}_3\\) — \\((p\\text{-ClC}_6\\text{H}_4)_2\\text{CH-CCl}_3\\); made from chlorobenzene and chloral with H₂SO₄. Non-biodegradable, banned.\n" +
        "- **BHC**: \\(\\text{C}_6\\text{H}_6\\text{Cl}_6\\), benzene + Cl₂ in sunlight; used instead of DDT.\n" +
        "- Chloroform (anaesthetic, forms phosgene in light; stored in dark bottles), iodoform (antiseptic), carbon tetrachloride (fire extinguisher, solvent).",
      table: {
        columns: ["Compound", "Formula", "Use"],
        rows: [
          { cells: ["Freon-12", "\\(\\text{CCl}_2\\text{F}_2\\)", "Refrigerant, aerosol propellant"], noteAmber: "Dichlorodifluoromethane — two Cl, two F." },
          { cells: ["Refrigerant-22", "\\(\\text{CHClF}_2\\)", "Refrigerant; made from chloroform"] },
          { cells: ["DDT", "\\((p\\text{-ClC}_6\\text{H}_4)_2\\text{CH-CCl}_3\\)", "Insecticide (banned)"], noteAmber: "Both rings carry a PARA chlorine; the side carbon carries CCl₃, not CCl₂." },
          { cells: ["BHC (lindane)", "\\(\\text{C}_6\\text{H}_6\\text{Cl}_6\\)", "Insecticide used in place of DDT"] },
          { cells: ["Chloroform", "\\(\\text{CHCl}_3\\)", "Solvent; once an anaesthetic"] },
          { cells: ["Iodoform", "\\(\\text{CHI}_3\\)", "Antiseptic"] },
        ],
        caption: "Freon-12 is the two-and-two halomethane; DDT is two para-chlorophenyls plus a trichloromethyl on one carbon.",
      },
      selfCheckExample: {
        prompt: "Name Freon-12 and describe DDT's structure in words.",
        steps: [
          "Dichlorodifluoromethane. DDT: a CH carbon bonded to two 4-chlorophenyl rings and a CCl₃ group.",
        ],
        answer: "Dichlorodifluoromethane; \\((p\\text{-ClC}_6\\text{H}_4)_2\\text{CH-CCl}_3\\)",
      },
      practiceSet: [
        { prompt: "Freon-12 is?", answer: "Dichlorodifluoromethane" },
        { prompt: "Insecticide used instead of DDT?", answer: "BHC" },
        { prompt: "Chlorines in one DDT molecule?", answer: "Five" },
        { prompt: "Refrigerant-22 is made from?", answer: "Trichloromethane" },
      ],
      pyqExampleId: "ad635b75-fb1f-46da-98a4-d914c2de6aa8",
      traps: [
        {
          title: "Picking the DDT drawing without the ring chlorines",
          body:
            "1,1,1-Trichloro-2,2-diphenylethane is offered every time. DDT's rings each carry a chlorine at the para position; the trichloromethyl alone is not enough.",
        },
      ],
    },

    // 2 — war gases
    {
      kind: "reference" as const,
      slug: "cethal-war-gases",
      name: "Phosgene, Mustard Gas and Tear Gas",
      intuition:
        "Three named agents with three formulas. Phosgene COCl₂ (a choking gas, formed from chloroform in light). Mustard gas (ClCH₂CH₂)₂S, a blister agent with one sulphur and two chlorines. Tear gas chloropicrin CCl₃NO₂, three chlorines and one nitrogen — the most chlorine-rich of the three. The paper asks atom counts per n moles.",
      definition:
        "- **Phosgene** \\(\\text{COCl}_2\\): 2 Cl. Carbonyl chloride, choking agent.\n" +
        "- **Mustard gas** \\(\\text{Cl-CH}_2\\text{CH}_2\\text{-S-CH}_2\\text{CH}_2\\text{-Cl}\\): 2 Cl, 1 S — n mol carries n mol S. Blister agent.\n" +
        "- **Tear gas (chloropicrin)** \\(\\text{CCl}_3\\text{NO}_2\\): 3 Cl, 1 N — n mol carries 3n mol Cl and n mol N. Lachrymator. The compound with the MOST chlorine atoms per molecule among the three.\n" +
        "- Phosphine PH₃ is not a halogen compound at all — a planted option.",
      table: {
        columns: ["Agent", "Formula", "Cl per molecule", "Type"],
        rows: [
          { cells: ["Phosgene", "\\(\\text{COCl}_2\\)", "2", "Choking"] },
          { cells: ["Mustard gas", "\\((\\text{ClCH}_2\\text{CH}_2)_2\\text{S}\\)", "2", "Blister (vesicant)"], noteAmber: "One S per molecule." },
          { cells: ["Tear gas (chloropicrin)", "\\(\\text{CCl}_3\\text{NO}_2\\)", "3", "Lachrymator"], noteAmber: "Highest chlorine count of the three — the official key on the 2022 paper." },
        ],
        caption: "Tear gas has three chlorines; the other two have two each.",
      },
      selfCheckExample: {
        prompt: "How many moles of Cl, N and S atoms are in n moles of tear gas and in n moles of mustard gas?",
        steps: [
          "Tear gas CCl₃NO₂: 3n Cl, n N, no S. Mustard gas: 2n Cl, no N, n S.",
        ],
        answer: "Tear gas 3n Cl, n N; mustard gas 2n Cl, n S",
      },
      practiceSet: [
        { prompt: "Formula of tear gas?", answer: "\\(\\text{CCl}_3\\text{NO}_2\\)" },
        { prompt: "Formula of mustard gas?", answer: "\\(\\text{ClCH}_2\\text{CH}_2\\text{SCH}_2\\text{CH}_2\\text{Cl}\\)" },
        { prompt: "Most Cl atoms per molecule: mustard gas, phosgene, tear gas, phosphine?", answer: "Tear gas" },
        { prompt: "Moles of S in n mol of mustard gas?", answer: "n" },
      ],
      pyqExampleId: "cad8f1e2-0c66-4594-b76f-012aef9fb15c",
      traps: [
        {
          title: "Giving mustard gas the most chlorine",
          body:
            "Mustard gas has two chlorines, one at each end. Chloropicrin has three on one carbon. The 2022 paper keyed tear gas.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Preparation — Swarts fluorination makes the Freons",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-preparation",
    },
    {
      label: "Classification — the halomethanes' boiling points",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties",
    },
  ],
};
