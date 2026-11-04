import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 5 Heat. Statements checked against
 * the Balbharati text; most-asked years from the board past papers in the
 * bank, 2018-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Heat",
  chapterSlug: "heat",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Latent heat of fusion",
      text: "The heat energy absorbed at constant temperature during transformation of solid into liquid. It weakens the bonds between molecules, so the temperature does not rise while ice melts.",
    },
    {
      term: "Latent heat of vaporization",
      text: "The heat energy absorbed at constant temperature during transformation of liquid into gas. The constant temperature at which a liquid turns into gas is its boiling point.",
    },
    {
      term: "Specific latent heat",
      text: "Heat absorbed at constant temperature by **unit mass** to change phase. For ice (fusion) 80 cal/g; for water (vaporization) 540 cal/g. Melting point, boiling point and latent heat depend on pressure.",
    },
    {
      term: "Regelation",
      text: "Ice converts to liquid due to applied pressure and re-converts to ice once the pressure is removed. Pressure lowers the melting point of ice below 0 °C. Examples: a wire passing through an ice slab, making an ice ball.",
    },
    {
      term: "Anomalous behaviour of water",
      text: "Heated from 0 °C to 4 °C, water **contracts** instead of expanding. At 4 °C its volume is minimum and its density is maximum. Above 4 °C it expands.",
    },
    {
      term: "Aquatic life in cold regions",
      text: "Water at 4 °C, being densest, stays at the bottom while ice forms on the surface. Ice is a poor conductor, so the water below does not freeze and plants and animals survive.",
    },
    {
      term: "Dew point",
      text: "The temperature at which unsaturated air, on cooling, becomes saturated with vapour. Relative humidity at the dew point is 100%.",
    },
    {
      term: "Absolute humidity",
      text: "The mass of vapour present in a unit volume of air, measured in kg/m³.",
    },
    {
      term: "Relative humidity",
      text: "The ratio of the actual mass of vapour in a given volume of air to the mass needed to saturate it at that temperature. Above 60% the air feels humid; below 60% it feels dry.",
    },
    {
      term: "Units of heat",
      text: "SI unit joule, CGS unit calorie. 1 cal raises 1 g of water by 1 °C from 14.5 °C to 15.5 °C. 1 kcal = 1000 cal; 1 cal = 4.18 J.",
    },
    {
      term: "Specific heat capacity",
      text: "The amount of heat energy required to raise the temperature of a unit mass of an object by 1 °C. SI unit J/kg °C, CGS unit cal/g °C. Water has a high value, 1 cal/g °C.",
    },
    {
      term: "Iron, copper and lead spheres",
      text: "Heated to 100 °C and put on wax, iron sinks deepest and lead least. So iron has the highest and lead the lowest specific heat of the three.",
    },
    {
      term: "Principle of heat exchange",
      text: "In an isolated system, heat energy lost by the hot object = heat energy gained by the cold object. Heat flows from the hot object to the cold one until their temperatures are equal.",
    },
    {
      term: "Calorimeter",
      text: "Used to measure specific heat by the mixing method. A hot solid is put in water in the calorimeter: heat lost by the solid = heat gained by the water + heat gained by the calorimeter.",
    },
  ],
  formulas: [
    { label: "Heat absorbed or lost", latex: "Q = mc\\Delta T" },
    { label: "Heat for a change of phase", latex: "Q = mL \\qquad L_{ice} = 80\\ \\text{cal/g} \\qquad L_{vap} = 540\\ \\text{cal/g}" },
    { label: "Principle of heat exchange", latex: "\\text{heat lost by hot object} = \\text{heat gained by cold object}" },
    {
      label: "Mixing method (calorimeter)",
      latex: "m_s c_s (T_s - T) = m_w c_w (T - T_w) + m_c c_c (T - T_w)",
      symbols: [{ symbol: "T", meaning: "final common temperature" }],
    },
    { label: "Units of heat", latex: "1\\ \\text{kcal} = 1000\\ \\text{cal} \\qquad 1\\ \\text{cal} = 4.18\\ \\text{J}" },
    {
      label: "Relative humidity",
      latex: "\\%\\,RH = \\frac{\\text{actual mass of vapour in a volume}}{\\text{mass needed to saturate that volume}} \\times 100",
    },
    {
      label: "5 kg of water from 20 to 100 degrees C",
      latex: "Q = 5 \\times 1 \\times 80 = 400\\ \\text{kcal} \\qquad Q = 5 \\times 4200 \\times 80 = 1.68 \\times 10^6\\ \\text{J}",
    },
  ],
  derivations: [
    {
      title: "Explain the temperature vs time graph of heating ice",
      steps: [
        "Ice at 0 °C is heated. Line AB: temperature stays at 0 °C while ice melts; the heat is the latent heat of fusion.",
        "Line BC: once all ice is water, the temperature rises from 0 °C to 100 °C.",
        "Line CD: temperature stays at 100 °C (boiling point) while water turns to steam; the heat is the latent heat of vaporization.",
      ],
    },
    {
      title: "Study of anomalous behaviour of water using Hope's apparatus",
      steps: [
        "Fill the cylinder with water; put a freezing mixture (ice and salt) in the flat bowl round its middle. Thermometer T1 is below the bowl, T2 above.",
        "Record T1 and T2 every 30 seconds and plot them against time.",
        "T1 falls fast to 4 °C and stays there; T2 falls slowly to 4 °C, then quickly to 0 °C. T2 reaches 0 °C first.",
        "Water at 4 °C is densest and sinks. The point where the two curves cross is the temperature of maximum density, 4 °C.",
      ],
    },
    {
      title: "Specific heat of a solid by the mixing method",
      steps: [
        "Heat the solid to a known temperature and drop it into water of known mass and temperature in a calorimeter.",
        "Stir and note the final common temperature \\(T\\).",
        "Heat lost by solid = heat gained by water + heat gained by calorimeter: \\(m_s c_s (T_s - T) = m_w c_w (T - T_w) + m_c c_c (T - T_w)\\).",
        "Knowing the specific heats of water and calorimeter, solve for \\(c_s\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Hope's apparatus",
      labels: ["cylindrical container with water", "flat bowl with freezing mixture (ice and salt)", "upper thermometer T2", "lower thermometer T1"],
    },
    { title: "Regelation", labels: ["ice slab", "thin metal wire", "weights hung on both ends"] },
    {
      title: "Temperature vs time graph (heating ice)",
      labels: ["temperature on Y-axis, time on X-axis", "AB at 0 °C (ice + water)", "BC: water 0 to 100 °C", "CD at 100 °C (water + steam)"],
    },
    { title: "Volume vs temperature of water", labels: ["volume on Y-axis", "temperature on X-axis", "minimum volume at 4 °C"] },
    { title: "Specific heat capacity of metals", labels: ["iron, copper and lead spheres", "thick slab of wax", "depth each sphere sinks"] },
  ],
  mostAsked: [
    { topic: "Anomalous behaviour of water: define it, Hope's apparatus, the volume graph, aquatic life in cold regions", years: [2026, 2025, 2024, 2022, 2020, 2019] },
    { topic: "Specific heat and units of heat: define, SI and CGS units, which metal has the highest or lowest, calorimeter, 1 cal = 4.18 J", marks: 1, years: [2025, 2024, 2023, 2018] },
    { topic: "Principle of heat exchange: name it, state it, where heat flows", marks: 3, years: [2026, 2025, 2022] },
    { topic: "Heat needed to raise 5 kg of water from 20 °C to 100 °C", years: [2025, 2020] },
    { topic: "Regelation: define it, effect of pressure on the melting point of ice, an example", years: [2026, 2024] },
    { topic: "Temperature vs time graph of heating ice: what AB and BC show", marks: 3, years: [2024, 2019] },
    { topic: "Humidity: absolute and relative humidity, how air feels above or below 60%", years: [2023, 2020] },
  ],
  mistakes: [
    {
      title: "Saying the volume of water is maximum at 4 °C",
      body: "At 4 °C the **volume is minimum** and the **density is maximum**. The anomalous range is 0 °C to 4 °C.",
    },
    {
      title: "Saying temperature rises during melting or boiling",
      body: "During a change of phase the temperature stays constant; the heat goes into breaking bonds (latent heat).",
    },
    {
      title: "Mixing calorie and joule units",
      body: "With c = 1 kcal/kg °C the answer is in kcal; with c = 4200 J/kg °C it is in joules. Use the temperature **change**, not the final temperature.",
    },
    {
      title: "Leaving out the calorimeter",
      body: "In the mixing method, the heat lost by the hot body goes to both the water and the calorimeter.",
    },
    {
      title: "Confusing absolute and relative humidity",
      body: "Absolute humidity is a mass per volume (kg/m³). Relative humidity is a ratio, written as a percentage.",
    },
  ],
};

export default sheet;
