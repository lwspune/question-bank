import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 11 Electricity. Statements checked against the
 * NCERT text (definitions and laws in the book's own words); formulas rebuilt.
 * Most-asked years and marks from all 162 CBSE board past-paper questions in
 * the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Electricity",
  chapterSlug: "electricity",
  source: "NCERT Science (CBSE Class 10), Chapter 11",
  keyPoints: [
    {
      term: "Electric current",
      text: "The rate of flow of electric charge: \\(I = \\frac{Q}{t}\\). One ampere is the flow of one coulomb of charge per second. By convention current flows opposite to the flow of electrons. 1 C is the charge of about \\(6 \\times 10^{18}\\) electrons; an electron carries \\(1.6 \\times 10^{-19}\\) C. An ammeter is joined in **series**.",
    },
    {
      term: "Potential difference",
      text: "The work done to move a unit charge from one point to the other: \\(V = \\frac{W}{Q}\\). **1 volt:** when 1 joule of work is done to move 1 coulomb of charge between the two points. Electrons move from lower to higher potential. A voltmeter is joined in **parallel**.",
    },
    {
      term: "Ohm's law",
      text: "The potential difference across the ends of a resistor is directly proportional to the current through it, provided its temperature remains the same: \\(V = IR\\). The V-I graph is a straight line through the origin; its slope gives the resistance. **1 ohm:** a current of 1 A flows when the potential difference is 1 V.",
    },
    {
      term: "Factors affecting resistance; resistivity",
      text: "Resistance depends directly on length, inversely on area of cross-section, and on the material (and temperature). \\(R = \\rho\\frac{l}{A}\\); \\(\\rho\\), the **resistivity**, is the resistance of a wire of unit length and unit area; its SI unit is ohm metre (\\(\\Omega\\) m). It depends only on the material, not on the shape.",
    },
    {
      term: "Alloys and conductors",
      text: "Metals and alloys have low resistivity; insulators very high. An alloy has a higher resistivity than its constituent metals and does not oxidise (burn) readily at high temperatures, so nichrome is used in heating devices. Copper and aluminium are used for transmission lines; tungsten for bulb filaments.",
    },
    {
      term: "Resistors in series",
      text: "The **same current** flows through each resistor. The total potential difference equals the sum of the potential differences across each. The equivalent resistance is the sum: \\(R_s = R_1 + R_2 + R_3\\), larger than the largest.",
    },
    {
      term: "Resistors in parallel",
      text: "The **same potential difference** is across each resistor. The total current equals the sum of the separate currents. The reciprocal of the equivalent resistance equals the sum of the reciprocals: \\(R_p\\) is smaller than the smallest resistor.",
    },
    {
      term: "Why domestic wiring is parallel",
      text: "In series, one failed bulb breaks the whole circuit, and all devices share one current though they need different currents. In parallel each device gets the full voltage and its own current, can be switched on and off separately, and the total resistance is less.",
    },
    {
      term: "Heating effect: Joule's law",
      text: "Heat produced in a resistor is directly proportional to the square of the current, to the resistance, and to the time for which the current flows: \\(H = I^2Rt\\). The source's energy is spent entirely as heat in a purely resistive circuit.",
    },
    {
      term: "Uses of the heating effect",
      text: "Electric iron, toaster, oven, kettle and heater. Electric bulb: the filament of tungsten (melting point 3380 °C) glows; the bulb is filled with inactive nitrogen and argon to prolong the filament's life. Electric fuse.",
    },
    {
      term: "Electric fuse",
      text: "A wire of a metal or alloy of suitable melting point, placed in **series** with the device. If a current larger than its rating flows, the wire heats up, melts and breaks the circuit, protecting the device. Domestic fuses are rated 1 A, 2 A, 3 A, 5 A, 10 A: a 1 kW, 220 V iron draws 4.54 A, so a 5 A fuse.",
    },
    {
      term: "Electric power and energy",
      text: "Power is the rate at which electric energy is consumed: \\(P = VI\\). SI unit watt: 1 W = 1 V × 1 A. Commercial unit of energy: kilowatt hour (kW h), the 'unit': \\(1\\text{ kW h} = 3.6 \\times 10^6\\) J.",
    },
  ],
  formulas: [
    { label: "Current and charge", latex: "I = \\frac{Q}{t} \\qquad Q = ne \\qquad e = 1.6 \\times 10^{-19}\\text{ C}" },
    { label: "Potential difference", latex: "V = \\frac{W}{Q}" },
    { label: "Ohm's law", latex: "V = IR" },
    { label: "Resistance and resistivity", latex: "R = \\rho\\,\\frac{l}{A} \\qquad A = \\pi r^2 \\qquad \\rho = \\frac{RA}{l}" },
    { label: "Series", latex: "R_s = R_1 + R_2 + R_3" },
    { label: "Parallel", latex: "\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}" },
    { label: "Heat produced (Joule's law)", latex: "H = VIt = I^2Rt = \\frac{V^2}{R}\\,t" },
    { label: "Electric power", latex: "P = VI = I^2R = \\frac{V^2}{R}" },
    { label: "Electric energy", latex: "E = Pt \\qquad 1\\text{ kW h} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J}" },
  ],
  derivations: [
    {
      title: "Derive the equivalent resistance of three resistors in series",
      steps: [
        "The same current I flows through \\(R_1\\), \\(R_2\\), \\(R_3\\); the total potential difference \\(V = V_1 + V_2 + V_3\\).",
        "By Ohm's law \\(V_1 = IR_1\\), \\(V_2 = IR_2\\), \\(V_3 = IR_3\\), and for the combination \\(V = IR_s\\).",
        "So \\(IR_s = IR_1 + IR_2 + IR_3\\), giving \\(R_s = R_1 + R_2 + R_3\\).",
      ],
    },
    {
      title: "Derive the equivalent resistance of three resistors in parallel",
      steps: [
        "The same potential difference V is across each; the total current \\(I = I_1 + I_2 + I_3\\).",
        "By Ohm's law \\(I_1 = \\frac{V}{R_1}\\), \\(I_2 = \\frac{V}{R_2}\\), \\(I_3 = \\frac{V}{R_3}\\), and \\(I = \\frac{V}{R_p}\\).",
        "So \\(\\frac{V}{R_p} = \\frac{V}{R_1} + \\frac{V}{R_2} + \\frac{V}{R_3}\\), giving \\(\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}\\).",
      ],
    },
    {
      title: "Establish Joule's law of heating, \\(H = I^2Rt\\)",
      steps: [
        "Charge Q moved through potential difference V does work \\(W = VQ\\); in time t, \\(Q = It\\).",
        "So the energy supplied, \\(H = VIt\\), is all turned into heat in a resistor.",
        "With \\(V = IR\\): \\(H = I^2Rt\\). Power \\(P = \\frac{H}{t} = VI = I^2R\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Circuit for studying Ohm's law (Figure 11.2)",
      labels: ["cells (battery)", "plug key", "ammeter in series", "nichrome wire XY", "voltmeter in parallel across XY", "rheostat"],
    },
    {
      title: "V-I graph for a nichrome wire (Figure 11.3)",
      labels: ["I on x-axis, V on y-axis", "straight line through the origin", "slope V/I = R", "units on both axes"],
    },
    {
      title: "Resistors in series (Figure 11.6)",
      labels: ["R₁, R₂, R₃ end to end", "battery and plug key", "one ammeter anywhere in the loop", "voltmeter across the combination"],
    },
    {
      title: "Resistors in parallel (Figure 11.7)",
      labels: ["R₁, R₂, R₃ between the same two points X and Y", "ammeter in the main line", "voltmeter across XY", "battery and plug key"],
    },
    {
      title: "Circuit symbols (Table 11.1)",
      labels: ["cell and battery", "plug key open and closed", "wire joint and wires crossing", "bulb, resistor, rheostat", "ammeter, voltmeter"],
    },
  ],
  mostAsked: [
    {
      topic: "Electric power and energy: \\(P = VI = I^2R = \\frac{V^2}{R}\\), ratings of lamps and heaters, cost in kWh, lamps in series and parallel",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Circuit numericals: current and potential difference in each resistor, circuit diagrams, and why domestic appliances are joined in parallel",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Equivalent resistance: series and parallel formulas (derive), arranging resistors for a given value, maximum and minimum resistance",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Heating effect: Joule's law, heater and bulb filament, why fuse and its rating",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Resistance and resistivity: factors, \\(R = \\rho\\frac{l}{A}\\), stretched or thicker wire, why alloys are used for heating",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ohm's law: statement, V-I graph and its slope, circuit symbols, ammeter in series and voltmeter in parallel",
      years: [2026, 2024, 2023, 2022],
    },
    {
      topic: "Charge, current and potential difference: define 1 volt and 1 ampere, \\(Q = It\\), \\(W = VQ\\)",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Ammeter and voltmeter the wrong way",
      body: "Ammeter in **series** (low resistance); voltmeter in **parallel** across the part being measured (high resistance).",
    },
    {
      title: "Adding resistances in parallel",
      body: "In parallel add the **reciprocals**, then invert: 2 Ω, 3 Ω, 6 Ω give \\(\\frac{1}{R_p} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = 1\\), so \\(R_p = 1\\) Ω; in series 11 Ω.",
    },
    {
      title: "Stretched or cut wire",
      body: "Stretching a wire to 3 times its length makes its area one-third, so R becomes **9 times**. Cutting a wire of resistance R into three equal parts and joining them in parallel gives \\(\\frac{R}{9}\\). Resistivity does not change.",
    },
    {
      title: "Diameter used as radius",
      body: "In \\(R = \\rho\\frac{l}{A}\\), \\(A = \\pi r^2\\) with r in metres: 0.01 cm = \\(1 \\times 10^{-4}\\) m, and \\(1\\text{ mm}^2 = 10^{-6}\\text{ m}^2\\). Halving the diameter makes R four times.",
    },
    {
      title: "Wrong power formula for the case",
      body: "Same current (series): use \\(P = I^2R\\), so the larger resistor (lower-wattage lamp) glows brighter. Same voltage (parallel): use \\(P = \\frac{V^2}{R}\\). From a rating, \\(R = \\frac{V^2}{P}\\): 220 V, 11 W gives 4400 Ω. Doubling the current makes the power four times.",
    },
    {
      title: "Joules and kilowatt hours mixed",
      body: "Energy in kW h = power in kW × time in hours. Convert to joules with \\(1\\text{ kW h} = 3.6 \\times 10^6\\) J.",
    },
  ],
};

export default sheet;
