import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AW_GASES_NOTE: SubtopicNote = {
  subtopicName: "Preparing and Testing Gases",
  title: "Preparing and Testing Gases",
  oneLineDefinition:
    "Hydrogen is made from zinc and a dilute acid and burns with a pop; carbon dioxide is made from marble and dilute acid, collected in an upright jar and turns lime water milky; each common gas has its own test.",
  whyItMatters:
    "Six questions in the bank, five MODERATE and one HARD. Two are about hydrogen (why potassium and water are not used to make it, and the gas from aluminium foil in sodium hydroxide); three are about carbon dioxide (the right laboratory set-up, its melting and boiling facts, and whether it is denser than air); one asks which gas blackens lead acetate.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9awga-hydrogen",
      name: "Preparing hydrogen and its properties",
      intuition:
        "Many metals push hydrogen out of an acid. In the laboratory we want a steady, safe stream of it, so we use zinc, which reacts gently. Very active metals like sodium and potassium react so violently with water that the heat sets the hydrogen on fire.",
      definition:
        "- **Laboratory method**: **zinc granules** with **dilute sulphuric acid** (or dilute hydrochloric acid).\n" +
        "- Hydrogen hardly dissolves in water, so it is collected **over water** (by downward displacement of water).\n" +
        "- **Sodium** and **potassium** are **not** used: their reaction with cold water is **violent and gives out so much heat** that the hydrogen catches fire.\n" +
        "- **Aluminium** or **zinc** with **sodium hydroxide** solution also gives hydrogen.\n" +
        "- Properties: **colourless, odourless**, the **lightest** gas, burns with a **pop sound** when a burning splint is brought near.",
      table: {
        columns: ["Reactants", "Gives hydrogen?", "Note"],
        rows: [
          { cells: ["Zinc and dilute sulphuric acid", "Yes", "The usual laboratory method"] },
          { cells: ["Magnesium and dilute hydrochloric acid", "Yes", "Fast but safe"] },
          { cells: ["Aluminium or zinc and sodium hydroxide solution", "Yes", "A base can also free hydrogen from these metals"] },
          {
            cells: ["Sodium or potassium and cold water", "Yes", "Not used: violent, and the heat sets the hydrogen on fire"],
            noteAmber: "The reaction does happen; it is too dangerous to use.",
          },
          { cells: ["Copper and dilute hydrochloric acid", "No", "Copper is too unreactive"] },
        ],
        caption: "A metal that gives hydrogen too slowly or too violently is not used in the laboratory.",
      },
      selfCheckExample: {
        prompt: "Why is hydrogen not collected in an upright gas jar by upward displacement of air?",
        steps: ["Hydrogen is the lightest gas, much lighter than air.", "In an upright jar it would rise and escape."],
        answer: "It is lighter than air and would escape, so it is collected over water",
      },
      practiceSet: [
        { prompt: "Which metal and which acid are used to prepare hydrogen in the laboratory?", answer: "Zinc granules and dilute sulphuric acid" },
        { prompt: "Why can hydrogen be collected over water?", answer: "It hardly dissolves in water" },
        { prompt: "Does copper give hydrogen with dilute hydrochloric acid?", answer: "No: copper is too unreactive" },
        { prompt: "Which is the lightest of all gases?", answer: "Hydrogen" },
      ],
      pyqExampleId: "7ab6a7d2-3095-49c9-ac69-7fc45caef049",
      traps: [
        {
          title: "Thinking potassium does not react with water",
          body: "Potassium reacts with cold water very violently. That, and the heat that ignites the hydrogen, is why it is never used to make hydrogen.",
        },
        {
          title: "Saying hydrogen helps things burn",
          body: "Hydrogen itself burns, with a pop. The gas that makes a glowing splint burst into flame is oxygen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9awga-carbon",
      name: "Preparing carbon dioxide and its properties",
      intuition:
        "Drop marble chips into dilute acid and they fizz: the bubbles are carbon dioxide. Because this gas is heavier than air, it sinks to the bottom of an open jar and pushes the air out above it, so we collect it in a jar standing upright.",
      definition:
        "- **Laboratory method**: **marble chips** (calcium carbonate) with **dilute hydrochloric acid**.\n" +
        "- The **thistle funnel** must **dip into the acid**, so the gas cannot escape through it.\n" +
        "- The **delivery tube** must end **above the acid** in the flask, so only gas enters it.\n" +
        "- Carbon dioxide is about **1.5 times as dense as air**, so it is collected in an **upright jar** by **upward displacement of air**, the tube reaching the bottom of the jar.\n" +
        "- Properties: **colourless**, **odourless**, turns **lime water milky**, puts out a flame. Solid carbon dioxide (**dry ice**) turns straight into gas at \\(-78.5\\) °C; it melts only under high pressure, at about \\(-56.6\\) °C.",
      table: {
        columns: ["Part of the apparatus", "Correct position", "What goes wrong otherwise"],
        rows: [
          { cells: ["Thistle funnel", "Its end dips into the acid", "Gas escapes up the funnel"] },
          { cells: ["Delivery tube in the flask", "Ends above the acid", "Acid is pushed out along the tube"] },
          { cells: ["Gas jar", "Upright, tube reaching its bottom", "The heavy gas spills out of an upside-down jar"] },
        ],
        caption: "The same flask set-up is used for any gas made from a solid and a liquid without heating.",
      },
      selfCheckExample: {
        prompt: "In a carbon dioxide set-up, a student keeps the end of the thistle funnel above the acid. What goes wrong?",
        steps: ["The thistle funnel opens to the air.", "If its end is not sealed by the acid, the gas leaves through it."],
        answer: "The carbon dioxide escapes through the thistle funnel instead of going into the jar",
      },
      practiceSet: [
        { prompt: "Which two substances are used to prepare carbon dioxide in the laboratory?", answer: "Marble chips (calcium carbonate) and dilute hydrochloric acid" },
        { prompt: "Why is carbon dioxide collected in an upright gas jar?", answer: "It is heavier than air, so it settles at the bottom and pushes the air out" },
        { prompt: "What happens to lime water when carbon dioxide is passed through it?", answer: "It turns milky" },
        { prompt: "What is dry ice?", answer: "Solid carbon dioxide" },
      ],
      pyqExampleId: "29e875db-1c19-4170-9d5f-a7632d776323",
      traps: [
        {
          title: "Dipping the delivery tube into the acid",
          body: "Only the thistle funnel dips into the acid. A delivery tube under the acid carries acid, not gas, out of the flask.",
        },
        {
          title: "Thinking carbon dioxide is lighter than air",
          body: "Carbon dioxide (molecular mass 44) is heavier than air (average about 29), so it is collected upward in an upright jar.",
        },
        {
          title: "Giving carbon dioxide a melting point at normal pressure",
          body: "At normal pressure dry ice does not melt: it turns straight into gas at −78.5 °C. Liquid carbon dioxide forms only under pressure.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9awga-tests",
      name: "Tests for common gases",
      intuition:
        "Most gases are colourless, so you cannot tell them apart by looking. Each one, though, does something special: one pops, one relights a glowing stick, one turns lime water milky, one smells of rotten eggs. A test is just that special behaviour.",
      definition:
        "- **Hydrogen**: burns with a **pop** when a burning splint is brought near.\n" +
        "- **Oxygen**: makes a **glowing splint burst into flame**.\n" +
        "- **Carbon dioxide**: turns **lime water milky** and puts out a flame.\n" +
        "- **Hydrogen sulphide**: smells of **rotten eggs** and turns paper soaked in **lead acetate black** (lead sulphide, PbS).\n" +
        "- **Ammonia**: sharp smell, turns moist **red litmus blue**.\n" +
        "- **Sulphur dioxide**: sharp smell, turns acidified potassium dichromate from **orange to green**.",
      table: {
        columns: ["Gas", "Colour and smell", "Test"],
        rows: [
          { cells: ["Hydrogen", "Colourless, no smell", "Burning splint: pop sound"] },
          { cells: ["Oxygen", "Colourless, no smell", "Glowing splint relights"] },
          { cells: ["Carbon dioxide", "Colourless, no smell", "Lime water turns milky"] },
          { cells: ["Hydrogen sulphide", "Colourless, rotten egg smell", "Lead acetate paper turns black"] },
          { cells: ["Ammonia", "Colourless, sharp smell", "Moist red litmus turns blue"] },
          { cells: ["Sulphur dioxide", "Colourless, sharp choking smell", "Acidified potassium dichromate turns from orange to green"] },
          { cells: ["Nitrogen dioxide", "Brown, sharp smell", "Its brown colour"] },
        ],
        caption: "A brown gas is nitrogen dioxide; every other gas in this table is colourless.",
      },
      selfCheckExample: {
        prompt: "A colourless gas makes a glowing splint burst into flame. Name the gas.",
        steps: ["Only oxygen relights a glowing splint: it supports burning."],
        answer: "Oxygen",
      },
      practiceSet: [
        { prompt: "Which gas smells of rotten eggs?", answer: "Hydrogen sulphide" },
        { prompt: "Which gas turns moist red litmus blue?", answer: "Ammonia" },
        { prompt: "What is the colour of nitrogen dioxide gas?", answer: "Brown" },
        { prompt: "Which gas turns acidified potassium dichromate from orange to green?", answer: "Sulphur dioxide" },
      ],
      pyqExampleId: "02cab2d9-5f8b-49ff-8e04-89d1236dbe03",
      traps: [
        {
          title: "Using a glowing splint for hydrogen",
          body: "Hydrogen is tested with a burning splint (it pops). A glowing splint that relights shows oxygen.",
        },
        {
          title: "Mixing up the two sulphur gases",
          body: "Hydrogen sulphide blackens lead acetate paper; sulphur dioxide turns acidified potassium dichromate green.",
        },
      ],
    },
  ],
};
