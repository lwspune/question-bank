import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_EXTRACTION_NOTE: SubtopicNote = {
  subtopicName: "Extraction of Metals",
  title: "Metallurgy and the Extraction of Iron",
  oneLineDefinition:
    "Minerals, ores and the three kinds of metallurgy, the steps of extraction, the four zones of the blast furnace with their reactions, the commercial forms of iron, and van Arkel refining.",
  whyItMatters:
    "10 questions. Six were set in board papers: the reactions in the zone of reduction of the blast furnace (2015 and 2026), the reducing agents used there (2025), the van Arkel refining of zirconium (2018) and the halogen it uses (2019), and the definitions of pyrometallurgy and roasting (2024). The textbook adds the flux, the steps of metallurgy, all the zones of the furnace, and cast iron, wrought iron and steel compared.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscctr-metallurgy",
      name: "Ores and the steps of metallurgy",
      intuition:
        "A metal in the ground is locked up as a compound and mixed with sand and mud. Getting it out is a chain of jobs: dig it up, throw away the waste, change the ore into an oxide that is easy to reduce, reduce it to the metal, and finally purify the metal. Which method reduces it depends on the metal and its ore.",
      definition:
        "- Most metals occur in the earth's crust as carbonates, sulphates, sulphides and oxides. A few unreactive ones (silver, gold, platinum) occur free.\n" +
        "- **Mineral:** a naturally occurring substance in the earth's crust containing inorganic salts, solids, siliceous matter and so on. **Ore:** a mineral with a high percentage of the metal, from which the metal can be extracted economically.\n" +
        "- **Ores of iron (Table 8.9):** haematite Fe₂O₃, magnetite Fe₃O₄, limonite 2Fe₂O₃·3H₂O, iron pyrites FeS₂, siderite FeCO₃. Copper: chalcopyrite CuFeS₂, chalcocite Cu₂S, cuprite Cu₂O. Zinc: zinc blende ZnS, zincite ZnO, calamine ZnCO₃.\n" +
        "- **Metallurgy** is the commercial extraction of metals from their ores.\n" +
        "- The choice of technique depends on the nature of the ore, the cost of the reducing agent (cheap coke is generally used), the availability of hydraulic power, the purity needed and the value of by-products (SO₂ from roasting sulphide ores goes to make H₂SO₄).",
      table: {
        columns: ["Term", "Meaning (textbook)"],
        rows: [
          {
            cells: ["Pyrometallurgy", "The ore is reduced to the metal at high temperature using reducing agents like carbon, hydrogen or aluminium"],
            pyqExampleId: "bf936b83-25c9-4dfa-a1bd-58328ad43779",
            noteAmber: "Board 2024 asked you to define pyrometallurgy and roasting.",
          },
          { cells: ["Hydrometallurgy", "The metal is extracted from an aqueous solution of its salt using a suitable reducing agent"] },
          { cells: ["Electrometallurgy", "The metal is extracted by electrolytic reduction of a molten (fused) compound"] },
          { cells: ["Gangue", "The sand, mud and other unwanted impurities mixed with the ore"] },
          { cells: ["Concentration", "Removing the gangue: washing, hydraulic classification, magnetic separation, froth floatation, chosen to suit the ore"] },
          { cells: ["Roasting", "Heating the concentrated ore in a current of air; sulphur and arsenic impurities escape as their oxides, and FeO in iron ore becomes Fe₂O₃"] },
          { cells: ["Reduction (smelting)", "The oxide is reduced to the metal, for iron in a blast furnace"] },
          { cells: ["Flux", "A substance that combines with the gangue to form a fusible slag; limestone in the extraction of iron"] },
          { cells: ["Refining", "Purifying the crude metal, for example by electrolytic refining"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the difference between a mineral and an ore?", answer: "An ore is a mineral from which the metal can be extracted economically, because it has a high percentage of the metal" },
        { prompt: "Write the formula of zinc blende.", answer: "ZnS" },
        { prompt: "Which kind of metallurgy uses electrolytic reduction of a molten compound?", answer: "Electrometallurgy" },
        { prompt: "Name four methods of concentrating an ore.", answer: "Washing, hydraulic classification, magnetic separation and froth floatation" },
      ],
      pyqExampleId: "bf936b83-25c9-4dfa-a1bd-58328ad43779",
      traps: [
        {
          title: "Calling every mineral an ore",
          body: "All ores are minerals, but a mineral is an ore only if the metal can be extracted from it economically.",
        },
        {
          title: "Defining a process without its key condition",
          body: "Pyrometallurgy needs 'high temperature' and 'a reducing agent'; roasting needs 'heated in a current of air'. Leave either out and the definition is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-blast-furnace",
      name: "Extraction of iron in the blast furnace",
      intuition:
        "The blast furnace works on the counter-current principle: the solid charge of ore, coke and limestone falls down while hot gases rise up. The bottom is the hottest, about 2000 K, where coke burns; the top is the coolest, about 500 K. Each height has its own job, so learn the zones from the bottom up, each with its temperature and its reactions.",
      definition:
        "- The furnace is about 25 m tall and 5 to 10 m across, lined with refractory bricks, in three parts: hearth, bosh and stack. The charge enters through a cup and cone; preheated air is blown in below the bosh through the tuyeres.\n" +
        "- **Zone of combustion** (5 to 10 m from the bottom, about 2000 K): \\(\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO},\\ \\Delta H = -220\\ \\text{kJ}\\). Some CO dissociates to finely divided carbon, \\(2\\text{CO} \\longrightarrow 2\\text{C} + \\text{O}_2\\). The rising CO acts as a fuel and as a reducing agent.\n" +
        "- **Zone of reduction** (22 to 25 m, near the top, about 900 K): \\(\\text{Fe}_2\\text{O}_3\\) is reduced to spongy iron by CO, and some of it by carbon.\n" +
        "- **Zone of slag formation** (about 20 m, about 1200 K): limestone, the flux, decomposes, \\(\\text{CaCO}_3 \\longrightarrow \\text{CaO} + \\text{CO}_2\\), and the quicklime combines with the gangue to form a molten slag of calcium silicate and calcium aluminate, \\(\\text{CaO} + \\text{SiO}_2 \\longrightarrow \\text{CaSiO}_3\\). The slag is used for road foundations.\n" +
        "- **Zone of fusion** (about 15 m): MnO₂ and Ca₃(PO₄)₂ in the ore are reduced to Mn and P, and some silica to Si. The spongy iron melts and absorbs C, Si, Mn, P and S.\n" +
        "- Molten iron collects at the bottom; the lighter slag floats on it, and the two are tapped through separate outlets. Iron cast into moulds is **pig iron**, with about 4% carbon. Waste gases (N₂, CO, CO₂) leave at the top and preheat the air blast.\n" +
        "- The textbook says there are three temperature zones but describes four; write all four.",
      formula: {
        label: "Reactions in the zone of reduction",
        latex:
          "\\text{Fe}_2\\text{O}_3 + 3\\text{CO} \\xrightarrow{900\\ \\text{K}} 2\\text{Fe} + 3\\text{CO}_2, \\qquad \\text{Fe}_2\\text{O}_3 + 3\\text{C} \\longrightarrow 2\\text{Fe} + 3\\text{CO}",
      },
      authoredExample: {
        prompt: "Name the flux used in the extraction of iron and write the reactions in the zone of slag formation.",
        steps: [
          "Zone of slag formation: about 20 m up, about 1200 K.",
          "Flux: limestone. It decomposes: \\(\\text{CaCO}_3 \\xrightarrow{1200\\ \\text{K}} \\text{CaO} + \\text{CO}_2\\).",
          "The quicklime combines with the silica of the gangue: \\(\\text{CaO} + \\text{SiO}_2 \\longrightarrow \\text{CaSiO}_3\\) (slag).",
          "The molten slag is lighter than iron, floats on it and is tapped off separately.",
        ],
        answer: "Limestone; \\(\\text{CaCO}_3 \\longrightarrow \\text{CaO} + \\text{CO}_2\\), then \\(\\text{CaO} + \\text{SiO}_2 \\longrightarrow \\text{CaSiO}_3\\)",
      },
      selfCheckExample: {
        prompt: "Write the reaction in the zone of combustion of the blast furnace, with its enthalpy change, and say why the zone is the hottest.",
        steps: [
          "The hot air blast burns the coke: \\(\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO},\\ \\Delta H = -220\\ \\text{kJ}\\).",
          "The reaction is highly exothermic, so this zone reaches about 2000 K.",
        ],
        answer: "\\(\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO}\\), \\(\\Delta H = -220\\) kJ; it is highly exothermic",
      },
      practiceSet: [
        { prompt: "Name the three parts of a blast furnace.", answer: "Hearth, bosh and stack" },
        { prompt: "What is the iron formed in the zone of reduction called?", answer: "Spongy iron" },
        { prompt: "Name the gases that leave the top of the blast furnace, and what they are used for.", answer: "N₂, CO and CO₂; they preheat the blast of air" },
        { prompt: "About how much carbon does pig iron contain?", answer: "About 4%" },
      ],
      pyqExampleId: "4467f033-ba6e-4512-97e4-cc431758e65d",
      traps: [
        {
          title: "Writing only the CO reaction for the zone of reduction",
          body: "CO does most of the reducing, but the textbook also writes the direct reduction of Fe₂O₃ by carbon in this zone. Give both equations when the board asks for its reactions.",
        },
        {
          title: "Putting the slag reactions in the wrong zone",
          body: "Limestone decomposes and forms slag in the zone of slag formation, below the zone of reduction. Keep each reaction with its zone and its temperature.",
        },
        {
          title: "Unbalanced equations",
          body: "Check each equation before moving on: in \\(\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO}\\) one oxygen atom is needed for each carbon atom. An unbalanced equation loses its mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-iron-forms",
      name: "Cast iron, wrought iron and steel",
      intuition:
        "The three commercial forms of iron differ mainly in how much carbon they hold. More carbon makes iron harder but more brittle; less makes it softer. Pure iron melts at about 1800 K, and adding carbon lowers its melting point.",
      definition:
        "- Pig iron from the blast furnace has about 4% carbon. When pig iron is remelted, run into moulds and cooled, it becomes **cast iron**.\n" +
        "- The mechanical properties of steel can be changed by adding small amounts of alloying elements such as manganese, chromium, sulphur and nickel; these are **alloy steels**.\n" +
        "- A 'differences' answer gives the same three points for all three forms: nature, carbon content and uses.",
      table: {
        columns: ["Point", "Cast iron", "Wrought iron", "Steel"],
        rows: [
          {
            cells: ["Nature", "Hard and brittle", "Very soft", "Neither too hard nor too soft"],
            pyqExampleId: "9512b171-26c9-4cbc-a5e9-18cbdca2ef37",
            noteAmber: "Textbook Exercise Q.3 asks the differences between cast iron, wrought iron and steel.",
          },
          { cells: ["Carbon content", "About 4%", "Less than 0.2%", "0.2 to 2%"] },
          { cells: ["Uses", "Pipes, automotive parts, pots, pans, utensils", "Pipes, bars for stay bolts, engine bolts, rivets", "Buildings, tools, ships, automobiles, weapons"] },
        ],
      },
      practiceSet: [
        { prompt: "How is cast iron obtained from pig iron?", answer: "Pig iron is remelted, run into moulds and cooled" },
        { prompt: "Which commercial form of iron has the least carbon?", answer: "Wrought iron (less than 0.2%)" },
        { prompt: "What are alloy steels?", answer: "Steels whose properties are changed by adding small amounts of elements such as Mn, Cr, S or Ni" },
      ],
      pyqExampleId: "9512b171-26c9-4cbc-a5e9-18cbdca2ef37",
      traps: [
        {
          title: "Giving steel the most carbon",
          body: "Cast iron has the most carbon (about 4%), wrought iron the least (under 0.2%), and steel lies between (0.2 to 2%).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-van-arkel",
      name: "Van Arkel refining of zirconium and titanium",
      intuition:
        "To get a very pure metal, turn it into a vapour that leaves the impurities behind, then break that vapour up on a hot wire. Iodine is used because the iodide of zirconium or titanium is volatile and also breaks up easily when heated strongly.",
      definition:
        "- Board papers asked this method in 2018 and 2019. The present textbook does not teach it, so learn the two reactions and the reason, and give it less time than the blast furnace.\n" +
        "- **Step 1:** the impure metal is heated with iodine in an evacuated vessel. The volatile tetraiodide forms; the impurities do not form a volatile iodide and are left behind.\n" +
        "- **Step 2:** the iodide vapour meets a tungsten filament heated electrically to a high temperature. It decomposes, pure metal deposits on the filament, and the iodine set free is used again.",
      formula: {
        label: "Van Arkel method for zirconium",
        latex: "\\text{Zr (impure)} + 2\\text{I}_2 \\longrightarrow \\text{ZrI}_4, \\qquad \\text{ZrI}_4 \\xrightarrow{\\text{hot W filament}} \\text{Zr (pure)} + 2\\text{I}_2",
      },
      authoredExample: {
        prompt: "Write the two reactions by which titanium is refined in the van Arkel method.",
        steps: [
          "Formation of the volatile iodide: \\(\\text{Ti (impure)} + 2\\text{I}_2 \\longrightarrow \\text{TiI}_4\\).",
          "Decomposition on the hot tungsten filament: \\(\\text{TiI}_4 \\longrightarrow \\text{Ti (pure)} + 2\\text{I}_2\\).",
        ],
        answer: "\\(\\text{Ti} + 2\\text{I}_2 \\longrightarrow \\text{TiI}_4\\); \\(\\text{TiI}_4 \\longrightarrow \\text{Ti} + 2\\text{I}_2\\)",
      },
      selfCheckExample: {
        prompt: "Why are the impurities left behind in van Arkel refining?",
        steps: ["Only the metal forms a volatile iodide; the impurities do not, so they stay in the vessel while the iodide vapour moves to the filament."],
        answer: "They do not form volatile iodides",
      },
      practiceSet: [
        { prompt: "On what is the pure metal deposited in van Arkel refining?", answer: "A hot tungsten filament" },
        { prompt: "Is the iodine used up in the van Arkel method?", answer: "No. It is set free on the filament and used again" },
      ],
      pyqExampleId: "5b62cb67-d81e-4a20-bbfa-b0f79e28afad",
      traps: [
        {
          title: "Leaving out the reason for the method",
          body: "Say why it works: the metal iodide is volatile and decomposes on a hot filament, while the impurities form no volatile iodide.",
        },
      ],
    },
  ],
};
