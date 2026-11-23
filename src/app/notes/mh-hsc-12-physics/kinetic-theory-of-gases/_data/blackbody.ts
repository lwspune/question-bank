import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_BLACKBODY_NOTE: SubtopicNote = {
  subtopicName: "Perfect Blackbody and Emissivity",
  title: "Perfect Blackbody, Emissive Power and Stefan's Law",
  oneLineDefinition:
    "The perfect blackbody and Ferry's way of making one, emissive power and emissivity, the Stefan-Boltzmann law for the heat a body radiates and loses, and the cooling of a body a little hotter than its surroundings.",
  whyItMatters:
    "20 questions, the largest page in this chapter. Nine were set in board papers from 2016 to 2025: define emissive power and the coefficient of emission (2016), explain Ferry's blackbody (2019), Stefan's law sums on the ratio of emissive powers (2024), the rate of loss of heat (2023), the temperature of a lamp filament and the energy radiated in a minute (both 2025), and three sums on the rate of cooling (2016, 2017, 2018). The textbook adds the energy from a furnace hole, a sphere kept hotter than its chamber and the size of a star.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpkt-perfect-blackbody",
      name: "Perfect blackbody and Ferry's blackbody",
      intuition:
        "A perfect blackbody swallows every bit of radiation that falls on it. No real surface does that, but a hollow ball with a tiny hole comes very close: a ray that gets in bounces around inside, losing energy at every bounce, and almost never finds its way back out of the hole. The hole itself is the blackbody.",
      definition:
        "- A **perfect blackbody** absorbs all the radiant energy falling on it: \\(a = 1\\), \\(r = 0\\), \\(t_r = 0\\). It is also the best emitter: its emissivity \\(e = 1\\).\n" +
        "- No real surface is perfectly black. Lamp black and platinum black absorb about 97% of the radiant heat falling on them.\n" +
        "- In practice a perfect blackbody is a **cavity with a small hole**. Ferry's blackbody is the standard design.\n" +
        "- In the board answer, draw a labelled sectional diagram: double wall, evacuated space, silvered outer surface, lamp-blacked inner surface, small hole, conical projection opposite the hole, and a ray reflected several times inside.",
      table: {
        columns: ["Part of Ferry's blackbody", "Why it is there"],
        rows: [
          {
            cells: ["Double-walled hollow sphere with a tiny hole", "Radiation enters only through the hole, and the hole acts as the blackbody"],
            pyqExampleId: "38946267-da18-4a2c-ade0-7036c4457d0d",
            noteAmber: "Board 2019 asked what a perfectly black body is and to explain Ferry's black body.",
          },
          { cells: ["Space between the walls evacuated", "Stops loss of heat by conduction and convection"] },
          { cells: ["Outer surface silvered", "Stops loss of heat by radiation"] },
          { cells: ["Inner surface coated with lamp black", "Absorbs most of the radiation at each reflection"] },
          { cells: ["Conical projection opposite the hole", "Stops a ray from being reflected straight back out of the hole"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does a ray that enters the small hole of Ferry's blackbody almost never come out again?",
        steps: [
          "Inside, the ray is reflected many times from the blackened surface.",
          "Most of its energy is absorbed at every reflection, and the hole is a tiny target to escape through.",
        ],
        answer: "It is almost completely absorbed after many reflections inside",
      },
      practiceSet: [
        { prompt: "Name two substances that come close to a perfect blackbody.", answer: "Lamp black and platinum black" },
        { prompt: "What are the coefficients of reflection and transmission of a perfect blackbody?", answer: "Both zero" },
        { prompt: "What is the emissivity of a perfect blackbody?", answer: "1" },
      ],
      traps: [
        {
          title: "No diagram for Ferry's blackbody",
          body: "The question says 'explain' but the marks include a labelled diagram. Without the labels (hole, cone, lamp black, evacuated space, silvering) the answer is incomplete.",
        },
        {
          title: "A blackbody must look black",
          body: "A perfect blackbody looks black only when it is cool. When it is hot enough it glows, because it is also the best emitter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-emissive-power",
      name: "Emissive power and emissivity",
      intuition:
        "Every body radiates heat. Emissive power measures how much leaves each square metre of the surface each second. Emissivity compares a surface with the best possible radiator, a perfect blackbody at the same temperature: 1 for a blackbody, less for everything else.",
      definition:
        "- **Emissive power** R of a body at a given temperature is the radiant energy emitted per unit time per unit surface area: \\(R = \\dfrac{Q}{At}\\). SI unit J m⁻² s⁻¹, that is W/m².\n" +
        "- **Coefficient of emission (emissivity)** e is the ratio of the emissive power of a surface to that of a perfect blackbody at the same temperature: \\(e = \\dfrac{R}{R_B}\\).\n" +
        "- e has no unit. \\(e = 1\\) for a perfect blackbody, \\(e = 0\\) for a perfect reflector, and \\(0 < e < 1\\) for other bodies.",
      formula: {
        label: "Emissive power and emissivity",
        latex: "R = \\frac{Q}{A\\,t}, \\qquad e = \\frac{R}{R_B}",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "radiant energy emitted" },
          { symbol: "\\(R_B\\)", meaning: "emissive power of a perfect blackbody at the same temperature" },
        ],
      },
      authoredExample: {
        prompt: "A surface of area 0.05 m² emits 600 J in 20 s. Find its emissive power. A perfect blackbody at the same temperature has an emissive power of 1500 W/m². Find the emissivity of the surface.",
        steps: [
          "Given: \\(Q = 600\\) J, \\(A = 0.05\\) m², \\(t = 20\\) s, \\(R_B = 1500\\) W/m².",
          "\\(R = \\dfrac{Q}{At} = \\dfrac{600}{0.05 \\times 20} = 600\\) W/m².",
          "\\(e = \\dfrac{R}{R_B} = \\dfrac{600}{1500} = 0.4\\).",
        ],
        answer: "R = 600 W/m²; e = 0.4",
      },
      selfCheckExample: {
        prompt: "A body of emissivity 0.25 is at the same temperature as a blackbody whose emissive power is 800 W/m². How much heat does 0.1 m² of the body emit each second?",
        steps: ["\\(R = eR_B = 0.25 \\times 800 = 200\\) W/m².", "Heat per second \\(= RA = 200 \\times 0.1 = 20\\) J."],
        answer: "20 J",
      },
      practiceSet: [
        { prompt: "What is the SI unit of emissive power?", answer: "W/m² (J m⁻² s⁻¹)" },
        { prompt: "Does emissivity have a unit?", answer: "No. It is a ratio of two emissive powers" },
        { prompt: "What is the emissivity of a perfect reflector?", answer: "0" },
      ],
      pyqExampleId: "bf286b38-9463-42e2-a1a2-cdb94ecafaeb",
      traps: [
        {
          title: "Defining emissivity without 'same temperature'",
          body: "Emissivity compares a body with a perfect blackbody AT THE SAME TEMPERATURE. Leave out that condition and the definition is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-stefan",
      name: "Stefan-Boltzmann law",
      intuition:
        "A hotter body radiates far more, and the rise is steep: double the absolute temperature and the radiation goes up sixteen times. A body also receives radiation from its surroundings, so what it actually loses is what it emits minus what it takes in.",
      definition:
        "- **Stefan-Boltzmann law:** the emissive power of a perfect blackbody is directly proportional to the fourth power of its absolute temperature: \\(R_B = \\sigma T^4\\), with \\(\\sigma = 5.67 \\times 10^{-8}\\) W m⁻² K⁻⁴ (Stefan's constant).\n" +
        "- A body of emissivity e and area A radiates energy at the rate \\(\\dfrac{dQ}{dt} = e\\sigma AT^4\\). In time t it radiates \\(Q = e\\sigma AT^4t\\).\n" +
        "- In surroundings at \\(T_0\\), the **net rate of loss** of heat is \\(\\dfrac{dQ}{dt} = e\\sigma A(T^4 - T_0^4)\\).\n" +
        "- T is always in kelvin.",
      formula: {
        label: "Stefan-Boltzmann law",
        latex: "R_B = \\sigma T^4, \\qquad \\frac{dQ}{dt} = e\\sigma A T^4, \\qquad \\text{net loss} = e\\sigma A\\,(T^4 - T_0^4)",
        symbols: [
          { symbol: "\\(\\sigma\\)", meaning: "Stefan's constant, 5.67 × 10⁻⁸ W m⁻² K⁻⁴" },
          { symbol: "\\(T_0\\)", meaning: "absolute temperature of the surroundings" },
        ],
      },
      authoredExample: {
        prompt: "A perfect blackbody of surface area 0.01 m² is kept at 727 °C. Find the power it radiates. (\\(\\sigma = 5.67 \\times 10^{-8}\\) W m⁻² K⁻⁴)",
        steps: [
          "Given: \\(A = 0.01\\) m², \\(T = 727 + 273 = 1000\\) K, \\(e = 1\\).",
          "Formula: \\(P = \\sigma AT^4\\).",
          "Substitution: \\(P = 5.67 \\times 10^{-8} \\times 0.01 \\times (1000)^4 = 5.67 \\times 10^{-8} \\times 10^{-2} \\times 10^{12}\\).",
          "\\(P = 567\\) W.",
        ],
        answer: "567 W",
      },
      selfCheckExample: {
        prompt: "The temperature of a blackbody is raised from 27 °C to 327 °C. By what factor does its emissive power increase?",
        steps: ["In kelvin: 300 K and 600 K.", "\\(\\left(\\dfrac{600}{300}\\right)^4 = 2^4 = 16\\)."],
        answer: "16 times",
      },
      practiceSet: [
        { prompt: "The absolute temperature of a blackbody is made three times. How many times does its emissive power become?", answer: "81 times" },
        { prompt: "Find the power radiated by a blackbody of area 2 m² at 300 K. (\\(\\sigma = 5.67 \\times 10^{-8}\\) W m⁻² K⁻⁴)", answer: "\\(5.67 \\times 10^{-8} \\times 2 \\times 8.1 \\times 10^9 = 918.5\\) W" },
        { prompt: "Write the net rate of loss of heat of a body at T kept in surroundings at \\(T_0\\).", answer: "\\(e\\sigma A(T^4 - T_0^4)\\)" },
      ],
      pyqExampleId: "19605e0f-17b0-4437-a487-ddf17795d6fa",
      traps: [
        {
          title: "Celsius in the fourth power",
          body: "Stefan's law works only with kelvin. Taking 1327 °C and 527 °C as they are gives a ratio near 40; in kelvin (1600 K and 800 K) it is 16.",
        },
        {
          title: "Fourth power of the difference",
          body: "The net loss uses \\(T^4 - T_0^4\\), not \\((T - T_0)^4\\). Raise each temperature to the fourth power first, then subtract.",
        },
        {
          title: "Emission is not loss",
          body: "The rate of emission depends only on the body's own temperature, \\(\\sigma AT^4\\). The rate of loss subtracts what it absorbs from the surroundings. A question may ask for both, and the two ratios differ.",
        },
        {
          title: "Area in cm²",
          body: "σ is per square metre. 200 cm² is \\(200 \\times 10^{-4} = 0.02\\) m², not 2 m².",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-cooling",
      name: "Rate of cooling",
      intuition:
        "A cup of tea cools fast at first and slowly near room temperature. When a body is only a little hotter than its surroundings, Stefan's law simplifies: the rate at which it cools is just proportional to how much hotter it is. Halve the excess temperature and the cooling rate halves.",
      definition:
        "- Net loss: \\(\\dfrac{dQ}{dt} = e\\sigma A(T^4 - T_0^4) = e\\sigma A(T - T_0)(T + T_0)(T^2 + T_0^2)\\).\n" +
        "- For a small excess, \\(T \\approx T_0\\) in the last two brackets, so \\(\\dfrac{dQ}{dt} \\approx 4e\\sigma AT_0^3(T - T_0)\\).\n" +
        "- Since \\(\\dfrac{dQ}{dt} = -mc\\dfrac{d\\theta}{dt}\\): rate of cooling \\(-\\dfrac{d\\theta}{dt} = k(\\theta - \\theta_0)\\), k being constant for a given body in given surroundings.\n" +
        "- **Newton's law of cooling:** for a small temperature difference, the rate of cooling is directly proportional to the excess of the body's temperature over the surroundings.\n" +
        "- Over a time interval, use the mean temperature: \\(\\dfrac{\\theta_1 - \\theta_2}{t} = k\\left[\\dfrac{\\theta_1 + \\theta_2}{2} - \\theta_0\\right]\\).\n" +
        "- The board asked these sums in 2016, 2017 and 2018, before the present textbook. The present book does not teach Newton's law of cooling by name, so give this concept less time than Stefan's law.",
      formula: {
        label: "Rate of cooling",
        latex: "-\\frac{d\\theta}{dt} = k(\\theta - \\theta_0), \\qquad \\frac{\\theta_1 - \\theta_2}{t} = k\\left[\\frac{\\theta_1 + \\theta_2}{2} - \\theta_0\\right]",
        symbols: [
          { symbol: "\\(\\theta_0\\)", meaning: "temperature of the surroundings" },
          { symbol: "\\(\\theta - \\theta_0\\)", meaning: "excess temperature of the body" },
        ],
      },
      authoredExample: {
        prompt: "A body cools from 70 °C to 60 °C in 5 minutes in surroundings at 20 °C. How long will it take to cool from 60 °C to 50 °C?",
        steps: [
          "First interval: mean temperature \\(65\\) °C, excess \\(65 - 20 = 45\\) °C. \\(\\dfrac{10}{5} = 45k\\), so \\(k = \\dfrac{2}{45}\\) per min.",
          "Second interval: mean temperature \\(55\\) °C, excess \\(35\\) °C. \\(\\dfrac{10}{t} = 35k = \\dfrac{70}{45}\\).",
          "\\(t = \\dfrac{10 \\times 45}{70} = 6.43\\) min.",
        ],
        answer: "About 6.4 minutes",
      },
      selfCheckExample: {
        prompt: "Why does the rule 'rate of cooling proportional to excess temperature' hold only when the body is a little hotter than its surroundings?",
        steps: ["The rule comes from \\(T^4 - T_0^4 \\approx 4T_0^3(T - T_0)\\).", "That step needs T close to \\(T_0\\)."],
        answer: "The approximation of Stefan's law behind it is valid only for a small temperature difference",
      },
      practiceSet: [
        { prompt: "State Newton's law of cooling.", answer: "For a small temperature difference, the rate of cooling of a body is directly proportional to the excess of its temperature over the surroundings" },
        { prompt: "Does hot water cool faster from 80 °C to 70 °C or from 50 °C to 40 °C, in a room at 25 °C?", answer: "From 80 °C to 70 °C, where the excess temperature is larger" },
        { prompt: "In \\(-\\frac{d\\theta}{dt} = k(\\theta - \\theta_0)\\), what is the unit of k if time is in minutes?", answer: "per minute (min⁻¹)" },
      ],
      pyqExampleId: "6e1ce6b3-0a58-4eb7-b9d8-14b360647d88",
      traps: [
        {
          title: "Using the body's temperature instead of the excess",
          body: "The rate is proportional to \\(\\theta - \\theta_0\\), not to θ. Subtract the temperature of the surroundings first.",
        },
        {
          title: "Using the starting temperature over an interval",
          body: "When a body cools over a stretch of time, use the mean temperature of that stretch, \\((\\theta_1 + \\theta_2)/2\\), in the excess.",
        },
      ],
    },
  ],
};
