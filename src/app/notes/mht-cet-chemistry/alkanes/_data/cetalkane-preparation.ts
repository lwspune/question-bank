import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkanes";

export const PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Alkanes, Wurtz, Grignard and Decarboxylation",
  title: "Making Alkanes: Wurtz, Grignard Reagents and Decarboxylation",
  oneLineDefinition:
    "Alkanes are made by joining two alkyl halides with sodium (Wurtz), by giving a Grignard reagent a proton from water, an alcohol or ammonia, by heating a sodium carboxylate with soda-lime, and by hydrogenating CO over nickel.",
  whyItMatters:
    "17 PYQs, the chapter's heaviest page and most of its MODERATE rows. Eight are Wurtz — which product cannot form from a mixed pair, mole counts, the Fittig variant; seven are Grignard reagents meeting an active hydrogen; two are decarboxylation and CO + H₂. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetalkane-wurtz",
      name: "The Wurtz Reaction and Mixed Halides",
      intuition:
        "Two alkyl groups lose their halogens to sodium and join. With ONE halide you get one product with double the carbons. With a MIXTURE of RX and R′X, every pairing happens — R–R, R–R′ and R′–R′ — so the question is which alkane is NOT among the three.",
      definition:
        "- **2RX + 2Na → R–R + 2NaX** (dry ether). 2 mol halide give **1 mol** alkane.\n" +
        "- **Mixed halides** RX + R′X → **R–R, R–R′, R′–R′**. From C₂ + C₃ halides: butane, pentane, hexane — **not propane**. From C₁ + C₃: ethane, butane, hexane — not propane. From C₁ + C₂: ethane, propane, butane — not pentane.\n" +
        "- A **secondary** halide couples at its own carbon: isopropyl bromide → **2,3-dimethylbutane**.\n" +
        "- **Wurtz–Fittig**: aryl + alkyl halide. **Fittig**: **two aryl halides** → biphenyl.",
      formula: {
        label: "Wurtz reaction",
        latex: "\\mathrm{2R{-}X + 2Na \\xrightarrow{\\text{dry ether}} R{-}R + 2NaX}",
      },
      authoredExample: {
        prompt: "A mixture of bromoethane and 1-bromopropane is treated with sodium in dry ether. Which alkane is NOT formed: propane, butane, pentane, hexane?",
        steps: [
          "The pairings are C₂+C₂, C₂+C₃ and C₃+C₃.",
          "They give butane, pentane and hexane.",
        ],
        answer: "Propane",
      },
      selfCheckExample: {
        prompt: "Moles of ethane from 2n mol of bromomethane and 2n mol of sodium?",
        steps: ["Two CH₃Br make one C₂H₆."],
        answer: "n",
      },
      practiceSet: [
        { prompt: "Molar mass of the hydrocarbon from 2 mol CH₃Br and excess Na?", answer: "30 g mol⁻¹ (ethane)" },
        { prompt: "Isopropyl bromide with sodium in dry ether gives?", answer: "2,3-Dimethylbutane" },
        { prompt: "Which reaction is Fittig: two aryl halides, aryl + alkyl, two alkyl?", answer: "Two aryl halides → biphenyl" },
      ],
      pyqExampleId: "ba86f365-904d-4fcb-adc1-35486253f023",
      traps: [
        {
          title: "Forgetting the self-coupled products",
          body: "A mixed Wurtz does not only give the cross product. Both halides also couple with themselves, so check all three alkanes before picking the one that cannot form.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetalkane-grignard",
      name: "Grignard Reagents Meeting an Active Hydrogen",
      intuition:
        "The carbon of R–MgX carries a negative charge and grabs any proton on offer. Water, an alcohol and ammonia all have an H on O or N, so each one turns the Grignard reagent into the alkane R–H. One mole of Grignard needs one mole of that proton source.",
      definition:
        "- **Making it**: RX + Mg (dry ether) → **R–MgX**.\n" +
        "- **R–MgX + H–Z → R–H + Mg(Z)X**, where H–Z is H₂O, ROH or NH₃.\n" +
        "- CH₃MgI + H₂O → **CH₄ + Mg(OH)I**, 1 : 1. CH₃OH + CH₃MgX → **CH₄** + CH₃OMgX. C₂H₅MgBr + CH₃OH → **C₂H₆**.\n" +
        "- Ethanol → (SOCl₂) C₂H₅Cl → (Mg) C₂H₅MgCl → (NH₃) **ethane** + Mg(NH₂)Cl.",
      formula: {
        label: "Grignard protonation",
        latex: "\\mathrm{R{-}MgX + H{-}Z \\rightarrow R{-}H + Mg(Z)X}\\quad (Z = OH,\\ OR,\\ NH_2)",
      },
      authoredExample: {
        prompt: "C₂H₅Br → (Mg / dry ether) A → (CH₃OH) B. Identify B.",
        steps: [
          "A is C₂H₅MgBr.",
          "Methanol gives the ethyl group a proton: C₂H₅–H.",
        ],
        answer: "Ethane, C₂H₆",
      },
      selfCheckExample: {
        prompt: "Moles of water needed to make n mol methane from n mol CH₃MgI?",
        steps: ["One H₂O supplies one H per Grignard."],
        answer: "n",
      },
      practiceSet: [
        { prompt: "Alkyl halide → (Mg, dry ether) A → (NH₃) B. B is?", answer: "A hydrocarbon (alkane)" },
        { prompt: "n CH₃MgI + H₂O gives?", answer: "n CH₄ and n Mg(OH)I" },
      ],
      pyqExampleId: "fe928045-426b-4848-9e65-17b7f153c650",
      traps: [
        {
          title: "Expecting an amine or an alcohol",
          body: "NH₃ and CH₃OH look like reagents that would add their group. With a Grignard reagent they only give up a proton: the product is the alkane every time.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetalkane-decarboxylation-hydrogenation",
      name: "Decarboxylation and Hydrogenation of CO",
      intuition: "Soda-lime removes CO₂ from a sodium carboxylate, so the alkane has one carbon fewer than the acid. Nickel lets hydrogen reduce CO all the way to methane.",
      definition:
        "- **Decarboxylation**: RCOONa + NaOH (soda-lime, Δ) → **R–H** + Na₂CO₃. Sodium propanoate → **ethane**, not propane.\n" +
        "- **CO + 3H₂ (Ni)** → **CH₄ + H₂O**.",
      table: {
        columns: ["Reaction", "Product"],
        rows: [
          { cells: ["Sodium propanoate + soda-lime, Δ", "Ethane + Na₂CO₃ (paper keys **propane**)"], pyqExampleId: "7692fb49-a012-4954-a1a3-92fe5012adaa", noteAmber: "Decarboxylation loses a carbon, so C₂H₅COONa gives ethane. The 9 May 2023 key is propane; learn the rule, and expect the paper's answer." },
          { cells: ["CO + H₂ over Ni", "**Methane and water**"], pyqExampleId: "bf7b77dd-0978-437f-b46d-397a53151e30" },
        ],
      },
      selfCheckExample: {
        prompt: "Which alkane does sodium ethanoate give with soda-lime?",
        steps: ["CH₃COONa loses CO₂ as Na₂CO₃, leaving CH₃–H."],
        answer: "Methane",
      },
      pyqExampleId: "bf7b77dd-0978-437f-b46d-397a53151e30",
    },
  ],
  related: [
    { label: "The alkane series and its isomers", href: `${BASE}/cetalkane-structure` },
    { label: "Free-radical halogenation", href: `${BASE}/cetalkane-reactions` },
  ],
};
