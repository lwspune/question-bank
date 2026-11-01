import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CEL_EVERYDAY_NOTE: SubtopicNote = {
  subtopicName: "Chemicals in Food and Daily Use",
  title: "Chemicals in Food and Daily Use",
  oneLineDefinition:
    "Preservatives, flavours and colours in food with the chemical behind each, food tests and adulterants, and gases and chemicals used in labs, signs, hospitals and medicine.",
  whyItMatters:
    "Fourteen questions in the bank: 11 from the 2023 shifts and three from the 2024 shifts. Each names a use and asks the chemical, or the reverse, so the two tables are the whole page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccelev-food",
      name: "Chemistry in the kitchen",
      intuition:
        "Food carries chemicals that keep it, flavour it and colour it. SSC gives the use and asks which chemical does it.",
      definition:
        "Preservatives:\n" +
        "- **Sodium benzoate**: the common preservative in sauces, dressings and drinks.\n" +
        "- **Sulphites**: stop **browning** in dried fruit, juice and wine.\n\n" +
        "Flavours, smells and colours:\n" +
        "- **Benzaldehyde**: **almond** flavour. Isoamyl acetate smells of banana.\n" +
        "- Garlic smells of **sulphur** compounds.\n" +
        "- **Oleic acid** is 55 to 80% of **olive oil**; lauric acid dominates coconut oil.\n" +
        "- **Betanin** colours **beetroot**; lycopene tomatoes, curcumin turmeric, beta carotene carrots.\n\n" +
        "Tests and methods:\n" +
        "- **Iodine** turns starch blue-black.\n" +
        "- **Mechanical leavening**: creaming fat and sugar, whipping egg whites or cream to trap air. Chemical leavening uses baking soda; biological uses yeast.\n" +
        "- **Ice cream** is adulterated with pepperonil, ethyl acetate, butyraldehyde and nitrate.",
      table: {
        columns: ["Use or feature", "Chemical"],
        rows: [
          { cells: ["Stops browning", "Sulphites"], pyqExampleId: "bf61e653-7150-4073-801e-14bdaa94319d" },
          { cells: ["Almond flavour", "Benzaldehyde"], pyqExampleId: "55bfe972-6aee-456a-9dc8-1117801f3f17" },
          { cells: ["Main acid of olive oil", "Oleic acid"], pyqExampleId: "15c50c14-7a3e-4af9-85ae-b8d4312bf14f" },
          { cells: ["Garlic smell", "Sulphur compounds"], pyqExampleId: "147e5712-6c35-4df6-8182-a7269a71ac45" },
          { cells: ["Test for starch", "Iodine"], pyqExampleId: "1afe2b18-9551-45c5-9134-31b924841223" },
          { cells: ["Beetroot colour", "Betanin"], pyqExampleId: "442511a1-4402-46e1-b4d6-b4f330b52718" },
        ],
      },
      pyqExampleId: "96e461bc-0315-4345-86e8-de923ba2644e",
      selfCheckExample: {
        prompt: "A baker whips egg whites to make a cake rise, with no baking soda or yeast. What kind of leavening is that?",
        steps: ["Whipping traps air in the batter by physical action.", "Leavening by beating or whipping is mechanical leavening."],
        answer: "Mechanical leavening.",
      },
      practiceSet: [
        { prompt: "Which pigment colours tomatoes red?", answer: "Lycopene" },
        { prompt: "Which food is adulterated with pepperonil?", answer: "Ice cream" },
        { prompt: "Which acid dominates coconut oil?", answer: "Lauric acid" },
      ],
      traps: [
        {
          title: "Benzoate keeps, bicarbonate raises",
          body: "**Sodium benzoate** preserves food. **Sodium bicarbonate** is baking soda, a raising agent. Options put both in the same list.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccelev-gases",
      name: "Gases and chemicals in use",
      intuition:
        "Noble gases light signs and cool magnets; a few other chemicals have well-known names or effects. Learn each with its one use.",
      definition:
        "Gases:\n" +
        "- **Liquid helium** (about 4 K) cools the superconducting magnets in **MRI** and NMR machines and at the **LHC**.\n" +
        "- **Neon** glows **red** in a discharge tube; argon glows violet-blue.\n" +
        "- **Sulphur hexafluoride** (SF6) is the **most potent greenhouse gas** known, used as an insulator in switchgear.\n\n" +
        "Names and medicine:\n" +
        "- **Trichloromethane** (CHCl3) is **chloroform**. Laughing gas is nitrous oxide; LPG is mainly propane and butane.\n" +
        "- Drugs are classified by **pharmacological effect**, drug action, **chemical structure** and **molecular target**, not by behaviour.",
      table: {
        columns: ["Chemical", "Known for"],
        rows: [
          { cells: ["Neon", "Red glow in signs"], pyqExampleId: "1f1bb812-d8ff-4188-81f9-9f6bf5352e31" },
          { cells: ["Sulphur hexafluoride", "Most potent greenhouse gas"], pyqExampleId: "c5c5a0be-b6a8-4fd0-aedf-e2a76d36bab2" },
          { cells: ["Trichloromethane", "Chloroform"], pyqExampleId: "87372117-3492-4739-86b3-ecf448bfa5b7" },
          { cells: ["Drug classification", "Effect, action, structure, target"], pyqExampleId: "a719d8fb-a3c3-4291-96a4-6d76dc634ffd" },
        ],
      },
      pyqExampleId: "6d239b3c-0c46-43fd-95a2-a72141c875aa",
      selfCheckExample: {
        prompt: "Which gas would you use for a red advertising sign, and which for a violet-blue one?",
        steps: ["Neon glows red-orange in a discharge tube.", "Argon glows violet-blue."],
        answer: "Neon for red; argon for violet-blue.",
      },
      practiceSet: [
        { prompt: "What is laughing gas?", answer: "Nitrous oxide" },
        { prompt: "Which liquid cools MRI magnets?", answer: "Liquid helium" },
        { prompt: "What is the formula of chloroform?", answer: "CHCl3" },
      ],
      traps: [
        {
          title: "SF6, not hydrogen fluoride",
          body: "The most potent greenhouse gas is **sulphur hexafluoride**. Other fluorine compounds in the options are not notable greenhouse gases.",
        },
      ],
    },
  ],
};
