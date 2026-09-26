import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/green-chemistry-and-nanochemistry";

export const GREEN_NOTE: SubtopicNote = {
  subtopicName: "Green Chemistry, Principles, Atom Economy and Green Solvents",
  title: "Green Chemistry: the Principles, Atom Economy and Safer Solvents",
  oneLineDefinition:
    "Green chemistry designs processes that make less waste: its twelve principles favour prevention over clean-up, high atom economy, renewable feedstocks, fewer derivatives and safer solvents such as water and supercritical CO₂.",
  whyItMatters:
    "19 PYQs, mostly EASY. Eight name or misstate a principle, six are atom-economy arithmetic, and five pick a green solvent or a plant source. " +
    "Three cards; the only one with a calculation is atom economy.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetgreen-principles",
      name: "The Principles of Green Chemistry",
      intuition:
        "Each principle is a way of not making waste in the first place. So a statement that increases waste — more auxiliary substances, protecting and deprotecting a group, few reactant atoms in the product — is the one that is NOT a principle.",
      definition:
        "- **Prevention** of waste; **atom economy**; less hazardous synthesis; safer chemicals; **safer solvents and auxiliaries** (minimum use); energy efficiency.\n" +
        "- **Renewable feedstocks** — chemicals from plants rather than crude oil.\n" +
        "- **Reduce derivatives** — avoid protection and deprotection steps.\n" +
        "- Catalysis; **design for degradation** (biodegradable pesticides); real-time analysis; safer chemistry for accident prevention.\n" +
        "- **Examples**: bio-plastics and bio-diesel; Draths and Frost made **adipic acid from glucose** with enzymes instead of from benzene.",
      table: {
        columns: ["Statement", "Verdict"],
        rows: [
          { cells: ["Maximum use of auxiliary substances", "**Not** a principle"], pyqExampleId: "494ff2e1-1eb2-4a2b-bc79-6ed53b285ba2" },
          { cells: ["Protection and deprotection is good practice", "**Not** true — reduce derivatives"], pyqExampleId: "14e9387a-93e3-4433-bbe3-218530a7c1f8" },
          { cells: ["Good atom economy = few reactant atoms in the product", "**Not** true — it means most"], pyqExampleId: "0e1789dd-0aaa-4752-bc95-64ccb59c5a84" },
          { cells: ["Plant-based chemicals", "Use of **renewable feedstocks**"], pyqExampleId: "e36dea44-7d6a-4581-85b0-2405ae7d42fa" },
          { cells: ["Avoid protecting a group", "**Reduce derivatives**"], pyqExampleId: "1847166e-6939-4395-86a7-a98174a284eb" },
          { cells: ["Adipic acid by enzymes (Draths and Frost)", "From **glucose**"], pyqExampleId: "c1990188-ab59-4d17-a9e0-f781a4065ffc" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is an example of green chemistry: recycled carpet, a product made on Earth Day, a sublimation reaction, bio-plastics or bio-diesel?",
        steps: ["Only bio-plastics and bio-diesel replace a crude-oil feedstock with a renewable one."],
        answer: "Bio-plastics or bio-diesel",
      },
      practiceSet: [
        {
          prompt: "An air sample turns lime water milky, turns acidified K₂Cr₂O₇ green and has low pH. Which pollutants?",
          answer: "SO₂ — it alone turns lime water milky, turns dichromate green and lowers the pH (the official key)",
        },
      ],
      pyqExampleId: "494ff2e1-1eb2-4a2b-bc79-6ed53b285ba2",
      traps: [
        {
          title: "Blaming two gases when one explains everything",
          body: "Milky lime water, green dichromate and low pH are all caused by SO₂. CO₂ cannot turn dichromate green, so 'both' is not needed — the 2021 key is SO₂.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetgreen-atom-economy",
      name: "Percentage Atom Economy",
      intuition:
        "Atom economy asks what fraction of the mass you put in ends up in the product you want. An addition reaction puts every atom into one product, so it scores 100%; a substitution or elimination throws away a by-product and scores less.",
      definition:
        "- **% atom economy = (formula mass of desired product ÷ sum of formula masses of all reactants) × 100**.\n" +
        "- **Addition** (C₂H₄ + H₂ → C₂H₆): **100%** — the best. Substitution and esterification lose a small molecule.\n" +
        "- Rearranged: product mass = atom economy × reactant mass. 274 u at 50% → **137 u**.",
      formula: {
        label: "Atom economy",
        latex: "\\%\\ \\text{atom economy} = \\dfrac{M_{\\text{desired product}}}{\\sum M_{\\text{reactants}}} \\times 100",
      },
      authoredExample: {
        prompt: "Ethanoic acid (60 u) and ethanol (46 u) give ethyl ethanoate (88 u) and water. Percentage atom economy for the ester?",
        steps: ["Reactants: 60 + 46 = 106 u.", "88 ÷ 106 × 100 = 83.0%. The water is the atoms lost."],
        answer: "83.0%",
      },
      selfCheckExample: {
        prompt: "Product 70 u from reactants totalling 140 u. Atom economy?",
        steps: ["70 ÷ 140 × 100."],
        answer: "50%",
      },
      practiceSet: [
        { prompt: "Product 175 u from 225 u of reactant?", answer: "77.7%" },
        { prompt: "Which has the best atom economy: esterification, C₂H₄ + H₂ → C₂H₆, or ROH + SOCl₂?", answer: "C₂H₄ + H₂ → C₂H₆ (addition, 100%)" },
      ],
      pyqExampleId: "545246c7-0563-41e4-b38f-c8b9bc804e11",
      traps: [
        {
          title: "Leaving a reactant out of the sum",
          body: "Every reactant counts, including the reagent that ends up in the by-product. For ethanol from chloroethane and KOH the denominator is 64.5 + 56 = 120.5, giving 38.17%. (The 2025 paper prints '6 g KOH', a misprint for 56.)",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetgreen-solvents-and-natural-products",
      name: "Green Solvents and Plant-Derived Compounds",
      intuition: "Chlorinated solvents are toxic and pollute air; water and supercritical CO₂ do neither. The plant questions are a short recall list.",
      definition:
        "- **Green solvents**: **water**, **supercritical CO₂**, ionic liquids. **Avoid** CH₂Cl₂, CHCl₃, CCl₄.\n" +
        "- **Clove** — eugenol: analgesic and antimicrobial.\n" +
        "- **Turmeric** — curcumin: the paper keys **antiseptic**.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Solvent that reduces pollution", "**Water**"], pyqExampleId: "7701c683-259c-4f27-8388-1cef4f36df5d" },
          { cells: ["Solvent to avoid waste and air pollution", "**H₂O**"], pyqExampleId: "ca60ef84-8a17-41ad-8672-6ddb068b6033" },
          { cells: ["A green solvent", "**Supercritical CO₂**"], pyqExampleId: "8c81737c-10bf-4759-ae92-56c81f82183d" },
          { cells: ["Source of analgesic and antimicrobial compounds", "**Clove**"], pyqExampleId: "4d3955d7-9757-46ea-b8db-0437477c1028" },
          { cells: ["Medicinal property of curcumin", "**Antiseptic**"], pyqExampleId: "93290a5e-dc24-4b2a-80ad-efbedc2ac48a" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is a green solvent: supercritical CO₂, CHCl₃, CH₂Cl₂, CCl₄?",
        steps: ["The other three are chlorinated solvents."],
        answer: "Supercritical CO₂",
      },
      pyqExampleId: "8c81737c-10bf-4759-ae92-56c81f82183d",
    },
  ],
  related: [
    { label: "Nanochemistry", href: `${BASE}/cetgreen-nano` },
  ],
};
