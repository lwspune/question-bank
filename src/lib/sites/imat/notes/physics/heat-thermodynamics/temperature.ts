import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature and Heat Transfer",
  title: "Temperature, Heat and How Heat Moves",
  oneLineDefinition:
    "Temperature measures how hot a body is; heat is energy that flows because of a temperature difference, by conduction, convection or radiation.",
  whyItMatters:
    "No past question has asked about temperature scales, expansion or heat transfer on their own. Every gas and calorimetry question in the chapter needs kelvin, though, and a calorimetry question in 2012 used thermal conductivity as a distractor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-hth-kelvin",
      name: "Temperature, heat and the Kelvin scale",
      intuition:
        "The particles of every body jiggle about. Temperature tells you how energetic that jiggling is on average. Put a hot body against a cold one and energy flows from hot to cold until both reach the same temperature; that flowing energy is heat. The Kelvin scale starts at absolute zero, where the jiggling would stop, so a doubled kelvin temperature really means double the average energy.",
      definition:
        "- **Temperature** measures the average kinetic energy of the particles. It is not an amount of energy.\n" +
        "- **Heat** \\(Q\\) is energy transferred because of a temperature difference, always from hotter to colder. It is measured in joules.\n" +
        "- **Internal energy** is the total kinetic and potential energy of all the particles in a body. A bath at 40 °C holds more internal energy than a cup at 80 °C.\n" +
        "- Two bodies in contact are in **thermal equilibrium** when they are at the same temperature and no net heat flows. If A and B are each in equilibrium with C, they are in equilibrium with each other (the **zeroth law**), which is what lets a thermometer work.\n" +
        "- **Absolute zero** is \\(0\\ \\text{K} = -273.15\\ ^\\circ\\text{C}\\). IMAT usually rounds to 273.\n" +
        "- One kelvin and one degree Celsius are the same size, so a **temperature change** has the same number in both scales.",
      formula: {
        label: "Celsius to kelvin",
        latex: "T\\,(\\text{K}) = \\theta\\,(^\\circ\\text{C}) + 273",
        symbols: [
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
          { symbol: "\\(\\theta\\)", meaning: "temperature in degrees Celsius" },
        ],
      },
      authoredExample: {
        prompt:
          "Normal body temperature is 37 °C and liquid nitrogen boils at 77 K. Write each in the other scale. A patient's temperature then rises from 37 °C to 39 °C: what is the rise in kelvin?",
        steps: [
          "Body temperature: \\(37 + 273 = 310\\ \\text{K}\\).",
          "Liquid nitrogen: \\(77 - 273 = -196\\ ^\\circ\\text{C}\\).",
          "The rise is \\(39 - 37 = 2\\ ^\\circ\\text{C}\\), and a change of \\(2\\ ^\\circ\\text{C}\\) is a change of \\(2\\ \\text{K}\\). Do not add 273 to a difference.",
        ],
        answer: "310 K; −196 °C; a rise of 2 K",
      },
      selfCheckExample: {
        prompt:
          "A sample of gas is heated from 27 °C to 327 °C. By what factor has its absolute temperature increased?",
        options: ["12.1", "2", "300", "0.5", "1.1"],
        steps: [
          "Convert both to kelvin: \\(27 + 273 = 300\\ \\text{K}\\) and \\(327 + 273 = 600\\ \\text{K}\\).",
          "Factor: \\(600 / 300 = 2\\).",
          "Option A divides the Celsius values, which is meaningless because 0 °C is not zero energy. Option C is the rise, not a factor; D is the ratio upside down.",
        ],
        answer: "(B) 2",
      },
      practiceSet: [
        { prompt: "What is absolute zero in degrees Celsius, to the nearest degree?", answer: "−273 °C" },
        { prompt: "Convert −40 °C to kelvin.", answer: "233 K", method: "\\(-40 + 273\\)" },
        { prompt: "A liquid warms by 15 °C. What is the change in kelvin?", answer: "15 K", method: "The degree and the kelvin are the same size" },
        { prompt: "Two insulated blocks at 20 °C and 60 °C are pressed together. Which way does heat flow, and when does it stop?", answer: "From the 60 °C block to the 20 °C block, until both have the same temperature", method: "Thermal equilibrium" },
      ],
      traps: [
        {
          title: "A temperature change is not converted by adding 273",
          body: "Adding 273 converts a temperature reading. A difference of 50 °C is a difference of 50 K, because the two scales have the same step size. Options that add 273 to a temperature rise are wrong.",
        },
        {
          title: "Heat and temperature are different quantities",
          body: "Temperature is an average per particle; heat is energy that moves. A large cool lake holds far more internal energy than a small hot spark. Statements treating a body as containing heat, or temperature as an amount of energy, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hth-transfer",
      name: "Heat transfer: conduction, convection and radiation",
      intuition:
        "Energy can get from hot to cold in three ways. Particles can pass it hand to hand to their neighbours, warm fluid can carry it bodily by flowing, or it can travel as electromagnetic waves with no matter at all. Knowing which needs a medium answers most questions on this topic.",
      definition:
        "- **Conduction**: energy passes from particle to particle by collisions. In metals free electrons carry it fast, so metals are good **conductors**; still air, wool and plastics are poor ones (**insulators**).\n" +
        "- The rate of conduction through a slab grows with its area, its **thermal conductivity** and the temperature difference, and falls with its thickness.\n" +
        "- **Convection**: a heated fluid expands, becomes less dense and rises, while cooler, denser fluid sinks to take its place. It cannot happen in a solid.\n" +
        "- **Radiation**: all bodies emit infrared radiation, more strongly the hotter they are. It needs no medium. Matt black surfaces absorb and emit it best; shiny, light surfaces reflect it.",
      table: {
        columns: ["Mechanism", "How the energy moves", "Needs a medium?", "Everyday example"],
        rows: [
          {
            cells: [
              "Conduction",
              "Vibrating particles and free electrons pass energy to neighbours",
              "Yes; works best in solids, especially metals",
              "The handle of a metal pan getting hot",
            ],
          },
          {
            cells: [
              "Convection",
              "Warm, less dense fluid rises and cooler fluid sinks, forming a current",
              "Yes; only liquids and gases",
              "Warm air rising above a radiator",
            ],
          },
          {
            cells: [
              "Radiation",
              "Electromagnetic waves, mainly infrared",
              "No; it crosses a vacuum",
              "Sunlight warming the Earth through space",
            ],
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A vacuum flask has a double glass wall with a vacuum between the two layers. Which heat transfer does the vacuum mainly stop?",
        options: [
          "Radiation only",
          "Radiation and convection",
          "Conduction and convection",
          "Conduction only",
          "Evaporation and radiation",
        ],
        steps: [
          "Conduction and convection both need particles. A vacuum has none, so it blocks both.",
          "Radiation crosses a vacuum easily; the flask reduces it with silvered walls, not with the vacuum.",
          "So options A, B and E credit the vacuum with stopping radiation, and D forgets convection.",
        ],
        answer: "(C) Conduction and convection",
      },
      practiceSet: [
        { prompt: "A metal bench and a wooden bench are both at 10 °C. Why does the metal feel colder?", answer: "Metal conducts heat away from your hand faster", method: "Same temperature, different conductivity" },
        { prompt: "How does energy from the Sun reach the Earth?", answer: "By radiation", method: "Space is a vacuum" },
        { prompt: "Why is a room heater usually placed low down?", answer: "Warm air rises from it and sets up a convection current through the room" },
        { prompt: "Which surface emits infrared radiation best: matt black or shiny silver?", answer: "Matt black" },
      ],
      traps: [
        {
          title: "Feeling colder does not mean a lower temperature",
          body: "Objects left in the same room reach the same temperature. Metal feels colder than wood because it conducts energy out of your skin faster, not because it is cooler.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hth-expansion",
      name: "Thermal expansion of solids and liquids",
      intuition:
        "Warmer particles vibrate with larger swings, so on average they sit a little further apart. Every length of a solid grows by a small fixed fraction for each kelvin. That is why bridges have expansion joints and why a thermometer liquid climbs its tube.",
      definition:
        "- **Linear expansion**: a rod of length \\(L_0\\) heated by \\(\\Delta T\\) grows by \\(\\Delta L = \\alpha L_0 \\Delta T\\), where \\(\\alpha\\) is the **coefficient of linear expansion** (unit \\(\\text{K}^{-1}\\)).\n" +
        "- **Volume expansion**: \\(\\Delta V = \\beta V_0 \\Delta T\\). For a solid, \\(\\beta \\approx 3\\alpha\\). Liquids expand more than solids.\n" +
        "- As a body expands its mass is unchanged, so its **density falls**.\n" +
        "- **Water is an exception**: from 0 °C to 4 °C it contracts when heated, so it is densest at about 4 °C. Ice floats and lakes freeze from the top down.",
      formula: {
        label: "Linear expansion",
        latex: "\\Delta L = \\alpha L_0 \\Delta T",
        symbols: [
          { symbol: "\\(\\Delta L\\)", meaning: "increase in length, in m" },
          { symbol: "\\(\\alpha\\)", meaning: "coefficient of linear expansion, in K⁻¹" },
          { symbol: "\\(L_0\\)", meaning: "original length, in m" },
          { symbol: "\\(\\Delta T\\)", meaning: "temperature rise, in K (or °C)" },
        ],
      },
      authoredExample: {
        prompt:
          "A steel rail is 25 m long at 10 °C. Steel has \\(\\alpha = 1.2 \\times 10^{-5}\\ \\text{K}^{-1}\\). How much longer is the rail on a day at 40 °C?",
        steps: [
          "Temperature rise: \\(40 - 10 = 30\\ \\text{K}\\).",
          "\\(\\Delta L = 1.2 \\times 10^{-5} \\times 25 \\times 30 = 9.0 \\times 10^{-3}\\ \\text{m}\\).",
          "That is 9.0 mm: small, but enough to buckle a track with no gap between rails.",
        ],
        answer: "9.0 mm",
      },
      selfCheckExample: {
        prompt:
          "An aluminium rod is 2.0 m long. Aluminium has \\(\\alpha = 2.4 \\times 10^{-5}\\ \\text{K}^{-1}\\). By how much does the rod lengthen when it is heated by 50 K?",
        options: ["2.4 mm", "1.2 mm", "24 mm", "0.24 mm", "4.8 mm"],
        steps: [
          "\\(\\Delta L = 2.4 \\times 10^{-5} \\times 2.0 \\times 50 = 2.4 \\times 10^{-3}\\ \\text{m} = 2.4\\ \\text{mm}\\).",
          "Option B forgets the 2.0 m length; C and D slip a power of ten when converting to millimetres.",
        ],
        answer: "(A) 2.4 mm",
      },
      practiceSet: [
        { prompt: "A brass rod 1.0 m long has \\(\\alpha = 2.0 \\times 10^{-5}\\ \\text{K}^{-1}\\). How much does it grow when heated by 100 K?", answer: "2.0 mm", method: "\\(2.0 \\times 10^{-5} \\times 1.0 \\times 100\\)" },
        { prompt: "The temperature rise is doubled. What happens to the expansion?", answer: "It doubles", method: "\\(\\Delta L\\) is proportional to \\(\\Delta T\\)" },
        { prompt: "A solid has \\(\\alpha = 1.0 \\times 10^{-5}\\ \\text{K}^{-1}\\). Estimate its volume coefficient.", answer: "About \\(3.0 \\times 10^{-5}\\ \\text{K}^{-1}\\)", method: "\\(\\beta \\approx 3\\alpha\\)" },
        { prompt: "Water at 1 °C is warmed to 3 °C. Does its volume go up or down?", answer: "Down", method: "Water contracts between 0 °C and 4 °C" },
      ],
      traps: [
        {
          title: "Water does not always expand when heated",
          body: "Between 0 °C and 4 °C water contracts as it warms, and it is densest at about 4 °C. Options claiming every liquid expands on heating at every temperature, or that water is densest at 0 °C, are wrong.",
        },
      ],
    },
  ],
};
