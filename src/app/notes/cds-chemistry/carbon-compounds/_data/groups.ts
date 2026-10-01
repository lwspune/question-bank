import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CB_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Functional Groups and Isomerism",
  title: "Functional Groups and Isomerism",
  oneLineDefinition:
    "The functional groups that name an organic compound, which classes can be functional isomers of each other, the three ways of drawing a molecule in 3-D, and how Lassaigne's test finds nitrogen, sulphur and halogens.",
  whyItMatters:
    "Five CDS questions, four of them HARD. This is the part of CDS chemistry that reaches into Class 11 organic chemistry, so a little reading here goes further than anywhere else in the chapter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcb-functional-groups",
      name: "Functional groups",
      intuition:
        "A functional group is the small part of an organic molecule that decides how it reacts. Learn each group's formula and its name ending, and you can read a compound's class straight from its formula.",
      definition:
        "The groups CDS uses:\n" +
        "- **Alcohol** –OH (ending -ol): ethanol C₂H₅OH, methanol CH₃OH.\n" +
        "- **Aldehyde** –CHO (-al): methanal HCHO. **Ketone** >C=O (-one): propanone CH₃COCH₃.\n" +
        "- **Carboxylic acid** –COOH (-oic acid): ethanoic acid CH₃COOH, propanoic acid C₂H₅COOH.\n" +
        "- **Ester** –COO– (-oate). **Haloalkane** –X (chloro-, bromo-).\n" +
        "- **Methanol is poisonous**: the liver oxidises it to **methanal** (formaldehyde), which coagulates protoplasm and can cause blindness. Ethanol is oxidised to ethanal and then to harmless acetate.",
      table: {
        columns: ["Group", "Formula", "Example"],
        rows: [
          { cells: ["Alcohol", "–OH", "Ethanol, C₂H₅OH"] },
          { cells: ["Aldehyde", "–CHO", "Methanal, HCHO"] },
          { cells: ["Ketone", ">C=O", "Propanone, CH₃COCH₃"] },
          {
            cells: ["Carboxylic acid", "–COOH", "Propanoic acid, C₂H₅COOH"],
            pyqExampleId: "d00df522-0fa6-40b1-9844-63f837f39460",
          },
          { cells: ["Haloalkane", "–X (Cl, Br, I)", "Chloromethane, CH₃Cl"] },
        ],
      },
      pyqExampleId: "d00df522-0fa6-40b1-9844-63f837f39460",
      selfCheckExample: {
        prompt: "Name the class of each compound: (i) CH₃CHO (ii) CH₃OH (iii) CH₃COOH.",
        steps: [
          "(i) ends in –CHO: an aldehyde (ethanal).",
          "(ii) has –OH on a carbon chain: an alcohol (methanol).",
          "(iii) ends in –COOH: a carboxylic acid (ethanoic acid).",
        ],
        answer: "Aldehyde, alcohol, carboxylic acid.",
      },
      practiceSet: [
        { prompt: "What is the functional group of a carboxylic acid?", answer: "–COOH" },
        { prompt: "What class does CH₃COCH₃ belong to?", answer: "Ketone" },
        { prompt: "Into what does the liver oxidise methanol?", answer: "Methanal (formaldehyde)" },
      ],
      traps: [
        {
          title: "Methanol's damage comes from methanal",
          body: "Methanol is toxic because the liver turns it into **methanal**, which coagulates protoplasm. It is not converted to acetic acid or carbon monoxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-isomerism",
      name: "Catenation, isomerism and 3-D projections",
      intuition:
        "Carbon can bond to itself in long chains (catenation) and always makes four bonds (tetravalency), so one formula can often be built in several ways. Those different compounds with one formula are isomers. When the ways differ in the functional group itself, they are functional isomers.",
      definition:
        "The ideas:\n" +
        "- **Catenation**: carbon links to itself in chains and rings. **Tetravalency**: carbon makes four bonds.\n" +
        "- **Isomers**: same molecular formula, different structure (chain, position or functional group).\n" +
        "- **Functional isomer pairs**: alcohol and ether; aldehyde and ketone; carboxylic acid and ester; cyanide and isocyanide. An **alkyl halide** formula fits no other class, so it shows **no functional isomerism**.\n" +
        "- **Projections** for drawing 3-D molecules: **Fischer** shows the **eclipsed** form, the **least** stable conformation; **Newman** can show eclipsed, staggered and skew forms; in a **Sawhorse** projection the bonds are drawn at **120°** to each other.",
      table: {
        columns: ["Class", "Functional isomer"],
        rows: [
          { cells: ["Alcohol (C₂H₆O: ethanol)", "Ether (dimethyl ether)"] },
          { cells: ["Aldehyde (C₃H₆O: propanal)", "Ketone (propanone)"] },
          { cells: ["Carboxylic acid", "Ester"] },
          { cells: ["Cyanide (–CN)", "Isocyanide (–NC)"] },
          {
            cells: ["Alkyl halide", "None possible"],
            noteAmber: "CDS 2019 (I), HARD: alkyl halides cannot show functional isomerism.",
            pyqExampleId: "c101c6ed-19dc-4db3-91aa-ca160c1c710f",
          },
        ],
        caption: "CDS 2019 (I), HARD: a Fischer projection is the eclipsed, least stable conformation, not the most stable.",
      },
      pyqExampleId: "c101c6ed-19dc-4db3-91aa-ca160c1c710f",
      practiceSet: [
        { prompt: "Which class of compound is a functional isomer of an alcohol?", answer: "An ether" },
        { prompt: "What is the property of carbon to form long chains called?", answer: "Catenation" },
        { prompt: "Which conformation does a Fischer projection show?", answer: "The eclipsed conformation" },
      ],
      traps: [
        {
          title: "Fischer is the least stable view",
          body: "A Fischer projection draws the molecule **eclipsed**, which has the most strain. 'The Fischer projection is the most stable conformation' is the false statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-lassaigne",
      name: "Lassaigne's test for N, S and halogens",
      intuition:
        "To find which elements an organic compound contains, it is fused with sodium. That turns nitrogen, sulphur and halogens into ions that dissolve in water. Each ion then has its own test; halogens are found as silver halide precipitates.",
      definition:
        "The test:\n" +
        "- The compound is fused with **sodium**; the extract holds NaCN, Na₂S and NaX.\n" +
        "- **Halogens**: acidify, add **silver nitrate**. AgCl is **white**, AgBr pale yellow, AgI yellow.\n" +
        "- **Fluorine cannot be detected** this way: **silver fluoride is soluble**, so no precipitate forms.",
      table: {
        columns: ["Halogen", "Silver halide", "Seen as"],
        rows: [
          { cells: ["Chlorine", "AgCl", "White precipitate"] },
          { cells: ["Bromine", "AgBr", "Pale yellow precipitate"] },
          { cells: ["Iodine", "AgI", "Yellow precipitate"] },
          {
            cells: ["Fluorine", "AgF", "No precipitate (soluble)"],
            pyqExampleId: "4c1882ee-9539-4518-87b5-b1293dd0d022",
          },
        ],
      },
      pyqExampleId: "4c1882ee-9539-4518-87b5-b1293dd0d022",
      practiceSet: [
        { prompt: "Which metal is fused with the compound in Lassaigne's test?", answer: "Sodium" },
        { prompt: "What colour is the silver chloride precipitate?", answer: "White" },
        { prompt: "Which halogen does Lassaigne's test miss, and why?", answer: "Fluorine — silver fluoride is soluble" },
      ],
    },
  ],
};
