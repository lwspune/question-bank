import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 5 Towards Green Energy. Statements
 * checked against the Balbharati text; the fission equation and the solar-cell
 * rules are rebuilt (the extracted text loses notation); most-asked years from
 * the board past papers in the bank. Biomass fuels, ethanol blending and
 * radiation effects are filed under this chapter but taught in Ch. 7 and Ch. 4.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Towards Green Energy",
  chapterSlug: "towards-green-energy",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Electromagnetic induction",
      text: "Whenever the magnetic field around a conductor changes, a potential difference is generated across it (Faraday). An **electric generator** works on this; a **turbine** rotates the magnet in the generator.",
    },
    {
      term: "Thermal power plant",
      text: "Coal burns in the boiler; steam at high temperature and pressure drives the turbine, which drives the generator. The condenser turns steam back to water, cooled by water from the cooling tower. Example: **Chandrapur**, Maharashtra.",
    },
    {
      term: "Problems of thermal power",
      text: "Burning coal emits carbon dioxide, sulphur oxide and nitrogen oxide; **soot particles** harm the respiratory system; coal reserves are **limited**.",
    },
    {
      term: "Nuclear power plant",
      text: "Fission of Uranium or Plutonium nuclei makes the steam. U-235 absorbs a neutron, becomes U-236, splits into Barium and Krypton with 3 neutrons and 200 MeV. A **controlled chain reaction** gives the heat. Example: **Tarapur**, Maharashtra.",
    },
    {
      term: "Problems of nuclear power",
      text: "No air pollution, but the fission products are radioactive **nuclear waste** that is hard to dispose of safely, and an accident can release very harmful radiations.",
    },
    {
      term: "Natural gas power plant",
      text: "A compressor sends pressurised air to the combustion chamber; natural gas burns; the very hot gas runs the turbine. **Higher efficiency** than coal, and **less pollution** since natural gas contains no sulphur.",
    },
    {
      term: "Fossil fuels are not green",
      text: "They give CO2 (global warming), CO from incomplete combustion, nitrogen dioxide (acid rain) and soot. Reserves took millions of years to form and will deplete (coal about 200 years).",
    },
    {
      term: "Green energy",
      text: "Electricity from water reservoir, wind, sunlight and biofuels. These sources are never ending (renewable) and do not cause the problems of fossil and nuclear fuels, so they are **environment friendly**.",
    },
    {
      term: "Hydroelectric power",
      text: "Potential energy of water stored in the dam becomes kinetic energy of flowing water, which drives the turbine at the bottom of the dam. Water is taken from about the middle height (point B). **Koyana** (Maharashtra) 1960 MW; Srishailam (Andhra Pradesh).",
    },
    {
      term: "Hydroelectric: advantages and problems",
      text: "**Advantages**: no fuel, no pollution; power when needed; the reservoir refills in the rainy season. **Problems**: back-water submerges villages, forests and fertile land (rehabilitation); river life is harmed.",
    },
    {
      term: "Wind energy",
      text: "A **wind turbine** converts kinetic energy of wind into electrical energy. A **gear box** increases the rotations per unit time. Clean, but suitable wind velocity (high on sea shores) is not available everywhere.",
    },
    {
      term: "Solar photovoltaic cell",
      text: "Converts solar radiation **directly into electrical energy**, without a generator. Made of a semiconductor (silicon). 1 cm² gives about 30 mA at 0.5 V; output is **DC**, changed to AC by an **inverter**. Works only in daytime.",
    },
    {
      term: "Solar cells to solar array",
      text: "Cells form a **panel**; panels in series form a **string**; strings in parallel form an **array**. 36 cells of 100 cm² in series give 18 V and 3 A. A good cell is about 15% efficient.",
    },
    {
      term: "Solar thermal power plant",
      text: "Reflectors concentrate solar radiation on absorbers; the heat makes steam, which drives the turbine and generator.",
    },
  ],
  formulas: [
    {
      label: "Nuclear fission of uranium-235",
      latex: "\\ce{^{235}_{92}U + ^{1}_{0}n -> ^{236}_{92}U -> ^{141}_{56}Ba + ^{92}_{36}Kr + 3^{1}_{0}n} + 200\\,\\text{MeV}",
    },
    {
      label: "Solar cells in series",
      latex: "V = V_1 + V_2 + \\dots, \\qquad I = I_1 = I_2",
      symbols: [
        { symbol: "V", meaning: "potential differences add" },
        { symbol: "I", meaning: "current stays that of one cell" },
      ],
    },
    {
      label: "Solar cells in parallel",
      latex: "I = I_1 + I_2 + \\dots, \\qquad V = V_1 = V_2",
      symbols: [
        { symbol: "I", meaning: "currents add" },
        { symbol: "V", meaning: "potential difference stays that of one cell" },
      ],
    },
    {
      label: "Efficiency of a solar panel",
      latex: "\\text{efficiency} = \\dfrac{\\text{electrical power output}}{\\text{solar power received}} \\times 100\\%",
    },
  ],
  derivations: [
    {
      title: "Explain with diagram step-by-step energy conversion in a thermal power plant",
      steps: [
        "Chemical energy of coal becomes thermal energy when coal burns in the boiler.",
        "Thermal energy makes steam of high temperature and pressure: kinetic energy of steam.",
        "Steam turns the turbine (kinetic energy of turbine), which drives the generator: **electrical energy**.",
        "The condenser and cooling tower turn steam back to water, which returns to the boiler.",
      ],
    },
    {
      title: "Energy conversion in a nuclear power plant",
      steps: [
        "Nuclear energy from the controlled fission of U-235 becomes thermal energy.",
        "Thermal energy becomes kinetic energy of steam, then kinetic energy of the turbine.",
        "The turbine drives the generator: **electrical energy**.",
      ],
    },
    {
      title: "Energy conversion in a hydroelectric power plant",
      steps: [
        "Potential energy of water stored in the dam becomes kinetic energy of fast flowing water.",
        "The water drives the turbine at the bottom of the dam: kinetic energy of the turbine.",
        "The turbine drives the generator: **electrical energy**.",
      ],
    },
    {
      title: "Stages in an electric generator using wind energy",
      steps: [
        "Wind strikes the blades; kinetic energy of wind turns them.",
        "The axle of the turbine drives the generator through a gear box, which raises the rotations per unit time.",
        "The generator gives **electrical energy**.",
      ],
    },
    {
      title: "From 18 V, 3 A panels, get 72 V and 9 A with a solar array",
      steps: [
        "Series adds potential difference: 4 panels in series give \\(4 \\times 18 = 72\\) V at 3 A (one string).",
        "Parallel adds current: 3 such strings in parallel give \\(3 \\times 3 = 9\\) A at 72 V.",
        "So 12 panels in all: 3 strings of 4 panels each.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Thermal power plant (Fig. 5.7)",
      labels: ["fuel, boiler", "turbine, generator", "condenser", "cooling tower", "combustion gases to stack", "pump"],
    },
    {
      title: "Nuclear power plant (Fig. 5.11)",
      labels: ["reactor with uranium fuel", "steam", "turbine, generator", "condenser", "cooling tower"],
    },
    {
      title: "Hydroelectric power plant (Fig. 5.17)",
      labels: ["dam and reservoir", "intake at point B", "penstock to turbine", "turbine, generator", "power lines"],
    },
    {
      title: "Wind mill (Fig. 5.20)",
      labels: ["blades", "gear box", "generator", "tower"],
    },
    {
      title: "Solar thermal power plant (Fig. 5.30)",
      labels: ["reflectors", "absorber", "steam, turbine, generator", "condenser", "power grid"],
    },
    {
      title: "Solar cell to solar array (Fig. 5.26)",
      labels: ["solar cell", "solar panel", "solar string (panels in series)", "solar array (strings in parallel)"],
    },
  ],
  mostAsked: [
    { topic: "Hydroelectric power: advantages, Koyana and Srishailam plants, the effect of the intake point (A, B, C) on generation", marks: 1, years: [2026, 2023, 2019] },
    { topic: "Thermal power plant: fuel used, problems, flow chart and diagram of energy conversion", marks: 3, years: [2026, 2025, 2024, 2022] },
    { topic: "Nuclear power: why it is not environment friendly, why fission must be controlled, Tarapur", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Wind energy: wind turbine, stages of the generator, limitations", marks: 1, years: [2025, 2024, 2022] },
    { topic: "Green energy and environment: why hydro, solar and wind are renewable, eco-friendly sources, carbon monoxide from incomplete combustion", years: [2024, 2020, 2017] },
    { topic: "Natural gas power plant: why it is more eco-friendly than coal", years: [2022, 2019] },
    { topic: "Solar energy: photovoltaic cell gives electrical energy, solar power plant", marks: 1, years: [2026, 2025] },
    { topic: "Forms of energy and the devices that use them: complete the table", marks: 3, years: [2020] },
  ],
  mistakes: [
    {
      title: "Adding the wrong quantity",
      body: "In series, potential differences add and the current stays the same. In parallel, currents add and the potential difference stays the same. A solar cell's voltage does not depend on its area.",
    },
    {
      title: "Saying a solar cell needs a generator",
      body: "A photovoltaic cell converts sunlight directly into electrical energy (DC). Only the solar thermal plant uses a turbine and generator.",
    },
    {
      title: "Calling nuclear power clean",
      body: "It gives no air pollution, but its radioactive waste and the risk of accidents mean it is not environment friendly.",
    },
    {
      title: "Wrong reason for natural gas being cleaner",
      body: "Natural gas contains no sulphur, so burning it causes less pollution, and the plant is more efficient than a coal plant.",
    },
    {
      title: "Mixing up the plants in Maharashtra",
      body: "Koyana: hydroelectric. Tarapur: nuclear (atomic). Chandrapur: thermal. Srishailam (Andhra Pradesh): hydroelectric.",
    },
  ],
};

export default sheet;
