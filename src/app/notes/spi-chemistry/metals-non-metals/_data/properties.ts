import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MN_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties, Reactivity and Alloys",
  title: "Properties, Reactivity and Alloys",
  oneLineDefinition:
    "Metals and non-metals differ in how they look, conduct and react; the reactivity series says which metal can push out another; alloys mix metals to get better properties.",
  whyItMatters:
    "Three questions in the bank, one EASY and two MODERATE: the non-metal whose fibres go into bullet-proof vests, which metal strips react in a salt solution drawn in a figure, and the metals in alnico. Each needs one table on this page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimnpr-properties",
      name: "Properties and uses of metals and non-metals",
      intuition:
        "Most metals are shiny, can be beaten into sheets and drawn into wires, and conduct heat and electricity. Most non-metals are the opposite. A few exceptions are asked again and again, so learn them by name.",
      definition:
        "- **Metals** are lustrous, malleable, ductile and good conductors. They lose electrons to form positive ions, and their oxides are **basic** (aluminium and zinc oxides are **amphoteric**: they react with both acids and bases).\n" +
        "- **Non-metals** are dull and brittle and do not conduct. They gain electrons to form negative ions, and their oxides are **acidic** or neutral.\n" +
        "- Exceptions: **mercury** is a liquid metal; **bromine** is a liquid non-metal; **iodine** is lustrous; **graphite** conducts electricity; sodium and potassium are soft enough to cut with a knife.\n" +
        "- Uses of non-metals: **sulphur** for vulcanising rubber and making sulphuric acid, **chlorine** to purify water, **nitrogen** in fertilisers, **boron** fibres, which are strong and light, in bullet-proof vests and aircraft parts.",
      table: {
        columns: ["Property", "Metals", "Non-metals"],
        rows: [
          { cells: ["Lustre", "Shiny", "Dull (iodine is the exception)"] },
          { cells: ["Hammering", "Malleable and ductile", "Brittle"] },
          { cells: ["Heat and electricity", "Good conductors", "Poor conductors (graphite conducts)"] },
          {
            cells: ["State at room temperature", "Solid (mercury is liquid)", "Solid, liquid (bromine) or gas"],
            noteAmber: "Mercury and bromine are the two liquid elements.",
          },
          { cells: ["Oxides", "Basic (some amphoteric)", "Acidic or neutral"] },
          { cells: ["Ions", "Lose electrons: positive ions", "Gain electrons: negative ions"] },
        ],
        caption: "Silver and copper are the best conductors; lead and mercury are poor ones for metals.",
      },
      selfCheckExample: {
        prompt: "An element is a dull solid that breaks into powder when hammered, and its oxide turns blue litmus red. Is it a metal or a non-metal?",
        steps: ["Dull and brittle are non-metal properties.", "An oxide that turns blue litmus red is acidic, which is also non-metallic."],
        answer: "A non-metal",
      },
      practiceSet: [
        { prompt: "Which metal is a liquid at room temperature?", answer: "Mercury" },
        { prompt: "Which non-metal conducts electricity?", answer: "Graphite (a form of carbon)" },
        { prompt: "Which non-metal is a liquid at room temperature?", answer: "Bromine" },
        { prompt: "Which non-metal is used to harden rubber by vulcanising?", answer: "Sulphur" },
        { prompt: "Is the oxide of sulphur acidic or basic?", answer: "Acidic" },
      ],
      pyqExampleId: "cf7e0a67-547c-475e-885d-75d87e40491e",
      traps: [
        {
          title: "Treating every non-metal as dull and non-conducting",
          body: "Iodine is lustrous and graphite conducts electricity, yet both are non-metals. Learn these exceptions by name.",
        },
        {
          title: "Calling every metal oxide basic",
          body:
            "Aluminium oxide and zinc oxide are amphoteric: they react with acids and with bases. Most other metal oxides are basic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimnpr-reactivity",
      name: "The reactivity series and displacement",
      intuition:
        "Metals can be ranked by how eagerly they react. A metal higher in the list can push a lower one out of its salt solution; a lower one can do nothing to a higher one.",
      definition:
        "- Most to least reactive: **K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Hg, Ag, Au**.\n" +
        "- A metal **displaces** another from its salt solution only if it is **higher** in the series. A metal cannot displace itself.\n" +
        "- Metals above hydrogen give hydrogen gas with dilute acids; copper, mercury, silver and gold do not.\n" +
        "- Sodium and potassium react so fast with air and water that they are stored under kerosene.",
      table: {
        columns: ["Metal", "Reaction with water", "With dilute acid"],
        rows: [
          { cells: ["Potassium, sodium", "Violent with cold water", "Violent"] },
          { cells: ["Calcium", "Less violent with cold water", "Gives hydrogen"] },
          { cells: ["Magnesium", "Hot water", "Gives hydrogen"] },
          {
            cells: ["Aluminium, zinc, iron", "Steam only", "Gives hydrogen"],
            noteAmber: "Aluminium is above iron: it displaces iron from iron salts.",
          },
          { cells: ["Lead", "No reaction", "Slowly"] },
          { cells: ["Copper, mercury, silver, gold", "No reaction", "No hydrogen"] },
        ],
        caption: "Higher metal plus salt of a lower metal: reaction. Lower metal plus salt of a higher metal: nothing.",
      },
      selfCheckExample: {
        prompt: "A strip of magnesium is put into copper sulphate solution, and a strip of silver into a second beaker of copper sulphate solution. In which beaker does a reaction take place?",
        steps: ["Magnesium is above copper, so it displaces copper.", "Silver is below copper, so nothing happens."],
        answer: "Only in the beaker with magnesium.",
      },
      practiceSet: [
        { prompt: "Which is more reactive, zinc or copper?", answer: "Zinc" },
        { prompt: "Will lead displace copper from copper chloride solution?", answer: "Yes, lead is above copper" },
        { prompt: "Will silver displace copper from copper nitrate solution?", answer: "No, silver is below copper" },
        { prompt: "Name two metals that do not give hydrogen with dilute hydrochloric acid.", answer: "Any two of copper, mercury, silver and gold" },
        { prompt: "Why is sodium stored under kerosene?", answer: "It reacts very fast with air and water" },
      ],
      pyqExampleId: "84d1ade9-4bbe-474a-88b7-6f72a9217f14",
      traps: [
        {
          title: "Expecting a metal to react with its own salt",
          body: "A metal cannot displace itself. An iron strip in iron sulphate solution shows no reaction.",
        },
        {
          title: "Thinking aluminium is unreactive because it does not rust",
          body:
            "Aluminium is above iron and zinc in the series. A thin layer of aluminium oxide on its surface protects it, which is why aluminium objects last.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimnpr-alloys",
      name: "Alloys and what they are made of",
      intuition:
        "Pure metals are often too soft, rust too easily or melt too high. Mixing in another metal (or carbon) fixes that. Alloy questions ask what is in an alloy or what it is used for.",
      definition:
        "- An **alloy** is a uniform mixture of a metal with other metals or a non-metal. Its properties differ from those of the pure metals.\n" +
        "- **Pure gold** (24 carat) is too soft for jewellery; 22 carat gold is mixed with silver or copper.\n" +
        "- An alloy of **mercury** with another metal is an **amalgam**.\n" +
        "- Alloys are usually harder, resist corrosion better and often melt lower than their metals.",
      table: {
        columns: ["Alloy", "Made of", "Used for"],
        rows: [
          { cells: ["Brass", "Copper and zinc", "Utensils, taps and fittings"] },
          { cells: ["Bronze", "Copper and tin", "Statues and medals"] },
          { cells: ["Solder", "Lead and tin", "Joining electric wires (low melting point)"] },
          { cells: ["Stainless steel", "Iron, chromium, nickel and carbon", "Utensils that do not rust"] },
          { cells: ["Duralumin", "Aluminium, copper, magnesium and manganese", "Aircraft bodies"] },
          {
            cells: ["Alnico", "Iron with aluminium, nickel and cobalt", "Strong permanent magnets"],
            noteAmber: "The name is Al + Ni + Co.",
          },
          { cells: ["Amalgam", "Mercury and another metal", "Dental fillings"] },
        ],
        caption: "Brass has zinc, bronze has tin: both start from copper.",
      },
      selfCheckExample: {
        prompt: "Why is solder, and not pure lead, used to join electric wires?",
        steps: ["Solder is an alloy of lead and tin.", "It melts at a lower temperature than either metal, so it melts and sets easily."],
        answer: "Its melting point is low.",
      },
      practiceSet: [
        { prompt: "Name the two metals in brass.", answer: "Copper and zinc" },
        { prompt: "What is an alloy of mercury with another metal called?", answer: "An amalgam" },
        { prompt: "Which alloy is used to make aircraft bodies?", answer: "Duralumin" },
        { prompt: "Name the two metals in bronze.", answer: "Copper and tin" },
      ],
      pyqExampleId: "f9dd6e9a-312f-4d65-89f4-b8f08fe87513",
      traps: [
        {
          title: "Swapping brass and bronze",
          body: "Brass is copper and zinc. Bronze is copper and tin.",
        },
        {
          title: "Thinking an alloy behaves like its metals",
          body:
            "An alloy's properties are its own. Solder melts lower than lead or tin, and stainless steel resists rust although iron rusts.",
        },
      ],
    },
  ],
};
