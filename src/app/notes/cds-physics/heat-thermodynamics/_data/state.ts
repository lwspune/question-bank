import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_HE_STATE_NOTE: SubtopicNote = {
  subtopicName: "Change of State and Gases",
  title: "Change of State and Gases",
  oneLineDefinition:
    "Latent heat and why evaporation cools, the triple point of water, what the ideal gas model assumes, and how the common thermodynamic processes are named.",
  whyItMatters:
    "Five CDS questions from 2017 (II) to 2026 (I). Two turn on latent heat in daily life, one on the triple point of water, and two on how gases behave: the ideal gas and the Joule-Thomson process.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphhe-latent",
      name: "Latent heat, evaporation and the triple point",
      intuition:
        "When ice melts or water boils, you keep heating but the thermometer does not move. The heat is being used to break the bonds that hold the particles together, not to make them move faster. This hidden heat is latent heat. Evaporation also needs latent heat, and it takes that heat from whatever the liquid is touching. That is why sweat drying on your skin cools you.",
      definition:
        "Heat and change of state:\n" +
        "- **Latent heat**: heat taken in or given out during a change of state, **at constant temperature**. \\(Q = mL\\).\n" +
        "- **Latent heat of fusion** of ice: about \\(3.34 \\times 10^{5}\\) J/kg. **Latent heat of vaporisation** of water: about \\(2.26 \\times 10^{6}\\) J/kg, nearly seven times larger.\n" +
        "- **Evaporation** happens at any temperature, from the surface only, and **cools** what is left behind. It is faster with more surface area, more wind, higher temperature and drier air.\n" +
        "- **Cotton in summer**: cotton soaks up sweat and spreads it thin, so the sweat evaporates fast and takes latent heat from the body.\n" +
        "- **Triple point of water**: the one temperature and pressure at which ice, liquid water and water vapour exist together: **273.16 K** and about **611 Pa** (about 0.006 atmosphere).",
      formula: {
        label: "Heat for a change of state",
        latex: "Q = m\\,L",
        symbols: [
          { symbol: "Q", meaning: "heat taken in or given out, in joules" },
          { symbol: "m", meaning: "mass that changes state, in kg" },
          { symbol: "L", meaning: "latent heat of fusion or of vaporisation, in J/kg" },
        ],
      },
      authoredExample: {
        prompt: "How much heat turns 0.2 kg of water already at 100 °C into steam at 100 °C? Take the latent heat of vaporisation of water as \\(2.26 \\times 10^{6}\\) J/kg.",
        steps: [
          "The temperature does not change, so only latent heat is needed: \\(Q = mL\\).",
          "\\(Q = 0.2 \\times 2.26 \\times 10^{6}\\).",
          "\\(Q = 4.52 \\times 10^{5}\\) J.",
        ],
        answer: "\\(4.52 \\times 10^{5}\\) J, about 452 kJ.",
      },
      selfCheckExample: {
        prompt: "Water kept in an earthen pot (matka) stays cooler than the air around it in summer. Explain why.",
        steps: [
          "The pot has tiny pores, so some water seeps out to its outer surface.",
          "That water evaporates, and evaporation needs latent heat.",
          "The latent heat is taken from the pot and the water inside it, so their temperature falls.",
        ],
        answer: "Water evaporating from the pot's porous surface takes latent heat from the water inside, cooling it.",
      },
      pyqExampleId: "1dbdcc14-0925-4af3-8441-943e59b3c965",
      practiceSet: [
        { prompt: "Does the temperature of melting ice rise while it is melting?", answer: "No: the heat goes into changing the state, so the temperature stays at 0 °C" },
        { prompt: "What is the temperature of the triple point of water in kelvin?", answer: "273.16 K" },
        { prompt: "Why does a steam burn hurt more than a burn from boiling water at the same temperature?", answer: "Steam gives out its large latent heat of vaporisation as it condenses on the skin" },
        { prompt: "How much heat melts 2 kg of ice at 0 °C? Take the latent heat of fusion as \\(3.34 \\times 10^{5}\\) J/kg.", answer: "\\(6.68 \\times 10^{5}\\) J", method: "\\(Q = mL = 2 \\times 3.34 \\times 10^{5}\\)" },
      ],
      traps: [
        {
          title: "Latent heat changes the state, not the temperature",
          body: "During melting or boiling the temperature stays fixed until the whole mass has changed state. Use \\(Q = mL\\) for that stage and \\(Q = mc\\,\\Delta T\\) only for the stages where the temperature changes.",
        },
        {
          title: "The triple point is 273.16 K, not 273.15 K or 0 K",
          body: "Ice, water and vapour coexist at **273.16 K** and about **611 Pa**. The ice point at normal pressure is 273.15 K, a hundredth of a degree lower. Any option with 0 K or 373 K for the triple point is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphhe-gases",
      name: "The ideal gas and thermodynamic processes",
      intuition:
        "An ideal gas is a simple model of a real gas. Its molecules are tiny points that fly about at random, bump into each other and the walls, and do not pull on one another between collisions. They do not all move at the same speed: some are slow and some are fast. When a gas is squeezed, heated or allowed to expand, the change is named after the quantity that stays fixed.",
      definition:
        "What the ideal gas model assumes:\n" +
        "- Molecules have negligible size and **no forces** act between them, so the gas has **no potential energy** of attraction.\n" +
        "- Collisions are perfectly elastic.\n" +
        "- Molecular speeds are **spread over a range** (the Maxwell distribution), so the molecules do not all have the same speed or kinetic energy.\n" +
        "- The **average** kinetic energy depends only on the absolute temperature.\n\n" +
        "Processes are named by what stays constant:\n" +
        "- **Isothermal**: temperature. **Isobaric**: pressure. **Isochoric**: volume. **Adiabatic**: no heat enters or leaves.\n" +
        "- **Isoenthalpic**: enthalpy. The **Joule-Thomson** (throttling) expansion, a gas forced through a porous plug, keeps enthalpy constant and is used to cool gases to very low temperatures.",
      table: {
        columns: ["Process", "What stays constant"],
        rows: [
          { cells: ["Isothermal", "Temperature"] },
          { cells: ["Isobaric", "Pressure"] },
          { cells: ["Isochoric", "Volume"] },
          { cells: ["Adiabatic", "No heat flows in or out of the gas"] },
          { cells: ["Joule-Thomson throttling", "Enthalpy (an isoenthalpic process)"] },
        ],
      },
      pyqExampleId: "893e733f-9a16-4da5-b3eb-3e2dc4548206",
      selfCheckExample: {
        prompt: "A gas is held in a sealed steel cylinder and heated. Name the process and say what happens to its pressure.",
        steps: [
          "A sealed rigid cylinder cannot change its volume, so the volume stays constant.",
          "A constant-volume change is called isochoric.",
          "Heating makes the molecules move faster and hit the walls harder, so the pressure rises.",
        ],
        answer: "An isochoric process; the pressure increases.",
      },
      practiceSet: [
        { prompt: "In an isothermal process, which quantity stays constant?", answer: "Temperature" },
        { prompt: "What does the average kinetic energy of the molecules of an ideal gas depend on?", answer: "Only its absolute temperature" },
        { prompt: "In which process does no heat flow into or out of the gas?", answer: "An adiabatic process" },
        { prompt: "Do the molecules of an ideal gas attract one another?", answer: "No: the model assumes no forces between molecules except during collisions" },
      ],
      traps: [
        {
          title: "Equal average energy does not mean equal speeds",
          body: "At one temperature the molecules of a gas have one **average** kinetic energy, but individual molecules move at many different speeds. A statement that all the molecules move at the same speed is false even for an ideal gas.",
        },
        {
          title: "Isochoric is volume, isobaric is pressure",
          body: "Iso means 'equal'. **Isobaric** keeps the pressure (bar) fixed, **isochoric** keeps the volume fixed, **isothermal** keeps the temperature fixed. Match the root before choosing.",
        },
      ],
    },
  ],
};
