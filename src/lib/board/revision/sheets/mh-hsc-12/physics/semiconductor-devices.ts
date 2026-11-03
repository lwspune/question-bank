import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 16 Semiconductor Devices. Statements checked against
 * the Balbharati text; most-asked years from the 27 board past-paper questions
 * in the bank, 2017-2026, leaving out 3 on topics the current book does not
 * teach (p-type and n-type, intrinsic semiconductors, transistor saturation).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Semiconductor Devices",
  chapterSlug: "semiconductor-devices",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 16",
  keyPoints: [
    {
      term: "Rectifier",
      text: "The conversion of AC voltage into a DC voltage is called rectification; a circuit that does it is a rectifier. A diode conducts when forward biased (closed switch) and not when reverse biased (open switch).",
    },
    {
      term: "Half wave and full wave",
      text: "Half wave: one diode, output only in alternate (positive) half cycles, maximum efficiency 40.6%. Full wave: two diodes and a centre tapped transformer, current through the load in the same direction in both half cycles, maximum efficiency 81.2%.",
    },
    {
      term: "Ripple and filter",
      text: "The small AC component left in the rectifier output is the ripple. Ripple factor = rms value of the AC component / DC component. A full wave rectifier has less ripple. A capacitor across the load filters it.",
    },
    {
      term: "Zener diode",
      text: "A p-n junction diode designed to work in the breakdown region; heavily doped, with a thin depletion layer. In reverse breakdown the voltage across it stays almost constant even when its current changes a lot.",
    },
    {
      term: "Voltage regulator",
      text: "A regulated supply keeps its output steady when a load is connected. A voltage regulator maintains a constant voltage across a load regardless of changes in the input voltage and in the load current.",
    },
    {
      term: "Photodiode",
      text: "A special p-n junction diode which converts light energy into electrical energy, operated in reverse bias. Its reverse current grows with the intensity of light. Only minority current flows through it.",
    },
    {
      term: "Dark current",
      text: "The reverse current that flows even when the photodiode is not illuminated. It depends only on the concentration of minority carriers, not on the applied voltage. Less dark current means a more sensitive device.",
    },
    {
      term: "Photodiode: merits and limits",
      text: "Advantages: quick and linear response, high speed, light and compact, wide spectral response. Disadvantages: properties depend on temperature; low reverse current at low illumination.",
    },
    {
      term: "Solar cell",
      text: "A photovoltaic device: a p-n junction that converts solar energy into electrical energy. The thin n-side faces the light; light makes electron-hole pairs that the junction field separates.",
    },
    {
      term: "Light emitting diode (LED)",
      text: "A diode which emits light when a large forward current passes through it: electrons recombine with holes and release photons. Made of compound semiconductors (gallium, arsenic, phosphorus); forward drop 1.5 to 3.5 V.",
    },
    {
      term: "Advantages of LED",
      text: "Energy efficient, long lifetime (50,000 hours), rugged (no filament), almost no warm up, excellent colour rendering, environment friendly (no mercury), controllable brightness and colour.",
    },
    {
      term: "Transistor action",
      text: "Emitter: heavily doped. Base: thin and lightly doped. Collector: larger. With E-B forward biased and C-B reverse biased, about 95% of the emitter electrons reach the collector; \\(I_E = I_B + I_C\\).",
    },
    {
      term: "Logic gate",
      text: "A digital circuit with one or more input signals but only one output signal. Its output is either high (1) or low (0).",
    },
    {
      term: "Basic gates",
      text: "NOT: output is the inverse of the input, so it is an **inverter**. OR: high if any input is high. AND: high only if all inputs are high. NAND, NOR: universal gates. X-OR: high only when the two inputs differ.",
    },
  ],
  formulas: [
    { label: "Ripple factor", latex: "r = \\frac{\\text{rms value of AC component}}{\\text{value of DC component}}" },
    { label: "Output frequency (50 Hz input)", latex: "f_{half\\ wave} = 50\\ \\text{Hz} \\qquad f_{full\\ wave} = 100\\ \\text{Hz}" },
    { label: "Zener regulator", latex: "R_S = \\frac{V_S - V_Z}{I_S} \\qquad I_L = \\frac{V_Z}{R_L} \\qquad I_Z = I_S - I_L" },
    { label: "Transistor currents", latex: "I_E = I_B + I_C" },
    { label: "Current gains", latex: "\\alpha_{DC} = \\frac{I_C}{I_E} \\qquad \\beta_{DC} = \\frac{I_C}{I_B}" },
    { label: "Relation between alpha and beta", latex: "\\alpha = \\frac{\\beta}{1 + \\beta} \\qquad \\beta = \\frac{\\alpha}{1 - \\alpha}" },
    { label: "NOT, OR, AND", latex: "Y = \\overline{A} \\qquad Y = A + B \\qquad Y = A \\cdot B" },
    { label: "NAND, NOR", latex: "Y = \\overline{A \\cdot B} \\qquad Y = \\overline{A + B}" },
    { label: "Exclusive OR", latex: "Y = A \\oplus B = A\\overline{B} + \\overline{A}B" },
  ],
  derivations: [
    {
      title: "Explain the working of a half wave rectifier with a circuit diagram and waveforms",
      steps: [
        "Secondary AB of a transformer in series with a diode D and load \\(R_L\\). The transformer steps the voltage up or down and isolates the circuit from the mains.",
        "Positive half cycle: A is at a higher potential, D is forward biased and conducts; current flows through \\(R_L\\).",
        "Negative half cycle: D is reverse biased and does not conduct; no output.",
        "Output: DC in the form of alternate pulses (positive half cycles only).",
      ],
    },
    {
      title: "Explain the working of a full wave rectifier with a circuit diagram and waveforms",
      steps: [
        "Centre tapped transformer with diodes D1 and D2; load \\(R_L\\) between the diode junction and the centre tap.",
        "Positive half cycle: A is at a higher potential, D1 conducts; current through \\(R_L\\) along APQRC.",
        "Negative half cycle: B is at a higher potential, D2 conducts; current through \\(R_L\\) along BPQRC, in the same direction.",
        "Output: a pulse in every half cycle; less ripple, twice the efficiency of the half wave rectifier.",
      ],
    },
    {
      title: "Explain the working of a Zener diode as a voltage regulator",
      steps: [
        "Zener diode (breakdown voltage \\(V_Z\\)) in reverse bias across an input \\(V_S > V_Z\\), through a series resistor \\(R_S\\); load \\(R_L\\) in parallel with the Zener, so \\(V_L = V_Z\\).",
        "Input rises: current through \\(R_S\\) and the Zener rises; the extra voltage drops across \\(R_S\\), while \\(V_Z\\) stays constant.",
        "Input falls: the Zener current falls, the drop across \\(R_S\\) falls, and \\(V_Z\\) is still unchanged.",
        "So the output stays constant whatever the change in input: the Zener diode acts as a voltage regulator.",
      ],
    },
    {
      title: "Define the current gains alpha and beta of a transistor and obtain the relation between them",
      steps: [
        "\\(\\alpha_{DC} = \\frac{I_C}{I_E}\\) and \\(\\beta_{DC} = \\frac{I_C}{I_B}\\).",
        "\\(I_E = I_B + I_C\\). Divide by \\(I_C\\): \\(\\frac{1}{\\alpha} = \\frac{1}{\\beta} + 1\\).",
        "So \\(\\alpha = \\frac{\\beta}{1 + \\beta}\\) and \\(\\beta = \\frac{\\alpha}{1 - \\alpha}\\). Typical \\(\\beta\\): 20 to 200.",
      ],
    },
    {
      title: "Explain the working of an n-p-n transistor",
      steps: [
        "Emitter-base junction forward biased; collector-base junction reverse biased.",
        "When \\(V_{BE}\\) exceeds the barrier potential (0.6 to 0.7 V for silicon), many electrons from the emitter enter the thin, lightly doped base.",
        "Only a few (about 5%) recombine and form \\(I_B\\); the rest diffuse to the collector-base depletion region and are pushed into the collector by its field.",
        "So \\(I_C\\) is about 95% of \\(I_E\\), and \\(I_E = I_B + I_C\\). In common base, the base is common to the input and the output.",
      ],
    },
  ],
  diagrams: [
    { title: "Half wave rectifier", labels: ["transformer with secondary AB", "diode D", "load RL", "input and output waveforms"] },
    { title: "Full wave rectifier", labels: ["centre tapped transformer", "diodes D1 and D2", "load RL", "input, D1, D2 and total output waveforms"] },
    { title: "Zener voltage regulator", labels: ["input VS", "series resistor RS", "Zener diode in reverse bias", "load RL in parallel", "IS, IZ and IL"] },
    { title: "Biasing of an n-p-n transistor", labels: ["emitter, base, collector", "VBE forward bias", "VCB reverse bias", "IE, IB and IC directions"] },
    { title: "Logic gate symbols and truth tables", labels: ["NOT", "OR", "AND", "NAND", "NOR", "X-OR"] },
    { title: "Circuit symbols of LED and photodiode", labels: ["diode arrow", "arrows out (LED)", "arrows in (photodiode)", "anode and cathode"] },
  ],
  mostAsked: [
    { topic: "Logic gates: define a logic gate; NOT as an inverter; Boolean expressions of NOR, AND, OR, X-OR", years: [2026, 2025, 2024, 2023, 2022, 2019] },
    { topic: "Half wave or full wave rectifier: circuit diagram, working and waveforms", years: [2026, 2025, 2022, 2020, 2017] },
    { topic: "LED: what it is, its symbol, when it emits light, its advantages", years: [2025, 2024, 2023] },
    { topic: "Transistor: alpha and beta and their relation, n-p-n working, a current gain numerical", years: [2025, 2024, 2023] },
    { topic: "Photodiode and solar cell: dark current, advantages and disadvantages", years: [2026, 2025] },
    { topic: "Zener diode as a voltage regulator", years: [2024, 2018] },
  ],
  mistakes: [
    {
      title: "Drawing the full wave rectifier without a centre tap",
      body: "The two-diode full wave rectifier needs a centre tapped transformer, with the load returned to the centre tap. Show which diode conducts in each half cycle.",
    },
    {
      title: "Connecting the Zener the wrong way",
      body: "The Zener is **reverse** biased, with \\(R_S\\) in series and the load in **parallel** with it. Forward biased, it is an ordinary diode.",
    },
    {
      title: "Biasing an LED or photodiode the same way",
      body: "LED: forward biased, emits light. Photodiode: reverse biased, light increases its reverse current.",
    },
    {
      title: "Mixing up NOR and NAND expressions",
      body: "NOR: \\(Y = \\overline{A + B}\\), high only when both inputs are 0. NAND: \\(Y = \\overline{A \\cdot B}\\), low only when both inputs are 1.",
    },
    {
      title: "Using alpha where beta is given",
      body: "\\(\\beta = \\frac{I_C}{I_B}\\), so \\(I_B = \\frac{I_C}{\\beta}\\): with \\(\\beta = 50\\) and \\(I_C = 3\\) mA, \\(I_B = 60\\) μA. \\(\\alpha\\) is always just below 1.",
    },
  ],
};

export default sheet;
