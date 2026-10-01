import type { SubtopicNote } from "@/app/notes/_types";

export const GALVANOMETER_MAG_NOTE: SubtopicNote = {
  subtopicName: "Galvanometer, Ammeter and Voltmeter",
  title: "Galvanometer, Ammeter and Voltmeter",
  oneLineDefinition:
    "In a moving coil galvanometer the torque NIAB is balanced by a spring, so the deflection is proportional to the current; a small shunt in parallel makes it an ammeter, a large resistor in series makes it a voltmeter.",
  whyItMatters:
    "Thirty PYQs, twenty-five of them multiple choice, and three from 2026: the largest page in the chapter. Twelve are about the galvanometer itself: six on current and voltage sensitivity, four turn a deflection into a current, a constant or a resistance, one asks why the core is metal and one reads a half-deflection graph. Eighteen convert it: twelve into an ammeter with a shunt, six into a voltmeter with a series resistor.",
  concepts: [
    // C1 — how the galvanometer works, sensitivity
    {
      kind: "formula" as const,
      slug: "jpmag-mcg-principle",
      name: "Moving coil galvanometer: deflection and sensitivity",
      intuition:
        "The coil sits in a radial field, so its plane always lies along the field and the torque on it is NIAB at every angle. A spring twists back with a torque Cθ. The coil stops where the two balance, so the deflection is proportional to the current. Sensitivity is how much deflection a given current, or a given voltage, produces.",
      definition:
        "- Balance: \\(NIAB = C\\theta\\), so \\(\\theta = \\dfrac{NAB}{C}I\\). C is the torsional constant, in N m/rad, with dimensions \\(ML^{2}T^{-2}\\).\n" +
        "- Current sensitivity \\(\\dfrac{\\theta}{I} = \\dfrac{NAB}{C}\\). Voltage sensitivity \\(\\dfrac{\\theta}{V} = \\dfrac{NAB}{CR}\\), where R is the coil's resistance.\n" +
        "- Current sensitivity rises with more turns, a stronger field, a larger area or a weaker spring.\n" +
        "- More turns of the same wire also raise R in proportion, so the voltage sensitivity stays the same. If the gain is made while keeping R fixed (a different wire), it carries through to the voltage sensitivity.\n" +
        "- Figure of merit K = I/θ, the current per division: the inverse of the current sensitivity.\n" +
        "- The coil is wound on a metal (non-magnetic) frame: eddy currents in it damp the motion, so the pointer comes to rest quickly.",
      formula: {
        label: "Balance and sensitivity",
        latex: "NIAB = C\\theta \\qquad \\frac{\\theta}{I} = \\frac{NAB}{C} \\qquad \\frac{\\theta}{V} = \\frac{NAB}{CR}",
      },
      authoredExample: {
        prompt:
          "A galvanometer coil has 50 turns of area 4 cm² in a radial field of 0.2 T, a torsional constant of \\(2 \\times 10^{-5}\\) N m/rad and a resistance of 40 Ω. Find its current sensitivity, the deflection for 1 mA, and its voltage sensitivity.",
        steps: [
          "\\(NAB = 50 \\times 4 \\times 10^{-4} \\times 0.2 = 4 \\times 10^{-3}\\) N m/A.",
          "Current sensitivity: \\(\\dfrac{4 \\times 10^{-3}}{2 \\times 10^{-5}} = 200\\) rad/A, so 1 mA gives 0.2 rad.",
          "Voltage sensitivity: \\(\\dfrac{200}{40} = 5\\) rad/V.",
        ],
        answer: "200 rad/A; 0.2 rad; 5 rad/V.",
      },
      selfCheckExample: {
        prompt:
          "A current of 300 μA deflects a galvanometer coil through \\(45^{\\circ}\\). What current deflects it through \\(15^{\\circ}\\)?",
        steps: [
          "The deflection is proportional to the current.",
          "\\(I = 300 \\times \\dfrac{15}{45} = 100\\ \\mu\\text{A}\\).",
        ],
        answer: "100 μA",
      },
      practiceSet: [
        { prompt: "What is the SI unit of the torsional constant of a galvanometer's suspension?", answer: "N m per radian" },
        { prompt: "Why is the magnetic field in a moving coil galvanometer made radial?", answer: "So the coil's plane always lies along the field: the torque is NIAB at every angle and θ is proportional to I" },
        { prompt: "A galvanometer has 30 divisions and a figure of merit of 20 μA per division. Full-scale current?", answer: "600 μA" },
        { prompt: "A galvanometer of resistance 20 Ω has a current sensitivity of 5 divisions per mA. Its voltage sensitivity?", answer: "0.25 divisions per mV" },
      ],
      pyqExampleId: "818ecf67-f820-4932-8a16-ecb1bd6f019c", // 2 Apr 2025: two coils with different R, N, A, B and the same spring; voltage sensitivities 1 : 1
      traps: [
        {
          title: "More turns also mean more resistance",
          body: "Adding turns of the same wire raises NAB and R together. Current sensitivity grows, but voltage sensitivity, NAB/CR, does not change.",
        },
        {
          title: "Figure of merit is the inverse of sensitivity",
          body: "Current sensitivity is divisions per ampere; figure of merit is amperes per division. A more sensitive galvanometer has a smaller figure of merit.",
        },
        {
          title: "Current and voltage sensitivity differ by R",
          body: "θ/V = (θ/I)/R. Comparing two galvanometers' voltage sensitivity needs each one's resistance as well as N, A, B and C.",
        },
      ],
    },

    // C2 — ammeter
    {
      kind: "formula" as const,
      slug: "jpmag-ammeter",
      name: "Converting a galvanometer into an ammeter with a shunt",
      intuition:
        "A galvanometer reaches full scale at a tiny current Ig. To measure a large current I, most of it must go round the coil. A small resistance, the shunt, joined in parallel carries the extra I − Ig. The coil and the shunt have the same voltage across them, which fixes the shunt.",
      definition:
        "- Same voltage across coil and shunt: \\(I_g G = (I - I_g)S\\), so \\(S = \\dfrac{I_g G}{I - I_g}\\).\n" +
        "- To make the range n times the full-scale current (\\(I = nI_g\\)): \\(S = \\dfrac{G}{n - 1}\\).\n" +
        "- Resistance of the ammeter: \\(\\dfrac{SG}{S + G}\\), smaller than S. An ideal ammeter has zero resistance.\n" +
        "- Share of the total current through the coil: \\(\\dfrac{I_g}{I} = \\dfrac{S}{S + G}\\). A shunt that cuts the deflection to a fraction f of what it was gives \\(\\dfrac{S}{S + G} = f\\).\n" +
        "- An ammeter goes in series with the part whose current it measures.",
      formula: {
        label: "Shunt",
        latex: "S = \\frac{I_g G}{I - I_g} \\qquad R_A = \\frac{SG}{S + G}",
      },
      authoredExample: {
        prompt:
          "A galvanometer of resistance 50 Ω reaches full scale at 2 mA. Find the shunt that turns it into an ammeter of range 1 A, and the resistance of the ammeter.",
        steps: [
          "\\(S = \\dfrac{I_g G}{I - I_g} = \\dfrac{0.002 \\times 50}{1 - 0.002} = \\dfrac{0.1}{0.998} \\approx 0.1002\\ \\Omega\\).",
          "At full scale the voltage across the meter is \\(I_g G = 0.1\\) V while 1 A flows, so its resistance is \\(\\dfrac{0.1}{1} = 0.1\\ \\Omega\\).",
        ],
        answer: "Shunt about 0.1 Ω; ammeter resistance 0.1 Ω.",
      },
      selfCheckExample: {
        prompt:
          "A galvanometer of resistance 60 Ω is shunted by 15 Ω. What percentage of the total current goes through the galvanometer?",
        steps: [
          "\\(\\dfrac{I_g}{I} = \\dfrac{S}{S + G} = \\dfrac{15}{75} = 0.2\\).",
        ],
        answer: "20%",
      },
      practiceSet: [
        { prompt: "Is the shunt of an ammeter connected in series or in parallel with the galvanometer?", answer: "In parallel" },
        { prompt: "A galvanometer of 20 Ω reaches full scale at 5 mA. Shunt for a range of 2 A?", answer: "About 0.050 Ω" },
        { prompt: "A 6 Ω shunt drops a galvanometer's deflection from 40 divisions to 10 for the same total current. Resistance of the galvanometer?", answer: "18 Ω" },
        { prompt: "A 99 Ω galvanometer is shunted by 1 Ω. Resistance of the resulting ammeter?", answer: "0.99 Ω" },
      ],
      pyqExampleId: "9407aa57-ad96-4c00-b33f-307439562214", // 24 Jan 2026 S2: 100 Ω, full scale 1 mA, ammeter of 5 mA, shunt 25 Ω
      traps: [
        {
          title: "The shunt carries I − Ig, not I",
          body: "S = IgG/(I − Ig). Using I in the denominator gives a slightly smaller shunt, and with a small range like 5 mA against 1 mA the error is large.",
        },
        {
          title: "A shunt goes in parallel",
          body: "The shunt is joined across the galvanometer. A resistor in series raises the range for voltage, not current.",
        },
        {
          title: "The ammeter's resistance is less than the shunt",
          body: "The coil and shunt are in parallel, so the meter's resistance SG/(S + G) is below both. It is not S + G.",
        },
      ],
    },

    // C3 — voltmeter, and the two conversions compared (reference)
    {
      kind: "reference" as const,
      slug: "jpmag-voltmeter",
      name: "Converting a galvanometer into a voltmeter, compared with an ammeter",
      intuition:
        "A voltmeter is a galvanometer that reaches full scale when the voltage V is across it. A large resistance in series limits the current to Ig at that voltage. The two conversions are mirror images: a small resistance in parallel for current, a large one in series for voltage, and the finished meters go into the circuit the opposite way round.",
      definition:
        "- Voltmeter: \\(I_g(G + R) = V\\), so \\(R = \\dfrac{V}{I_g} - G\\). Its resistance is \\(G + R = V/I_g\\).\n" +
        "- To raise a voltmeter's range from \\(V_1\\) to \\(V_2\\), add \\(R_V\\left(\\dfrac{V_2}{V_1} - 1\\right)\\) in series, where \\(R_V\\) is its own resistance.\n" +
        "- A coil tested once with a shunt and once with a series resistor: write Ig from each arrangement and set them equal to find G.\n" +
        "- In an Ohm's-law experiment, the galvanometer with the large series resistor goes across the resistor (voltmeter); the one with the tiny shunt goes in series with it (ammeter).",
      table: {
        columns: ["Property", "Ammeter", "Voltmeter"],
        rows: [
          { cells: ["What it measures", "Current, up to I", "Potential difference, up to V"] },
          { cells: ["Resistance added", "Shunt \\(S = \\dfrac{I_g G}{I - I_g}\\)", "Series \\(R = \\dfrac{V}{I_g} - G\\)"] },
          { cells: ["How it is joined to the galvanometer", "In parallel", "In series"] },
          { cells: ["How the meter goes into the circuit", "In series with the part", "In parallel, across the part"], noteAmber: "Mirror images: swap both connections when you swap meters." },
          { cells: ["Resistance of the finished meter", "\\(\\dfrac{SG}{S + G}\\), less than S", "\\(G + R\\), large"] },
          { cells: ["Ideal resistance", "Zero", "Infinite"] },
          { cells: ["Range made n times larger", "Shunt \\(\\dfrac{G}{n - 1}\\)", "Add \\((n - 1)\\) times the meter's resistance in series"] },
          { cells: ["For G = 100 Ω and Ig = 1 mA", "1 A range: S ≈ 0.1 Ω", "10 V range: R = 9900 Ω"] },
        ],
        caption: "A small resistance in parallel for current; a large resistance in series for voltage.",
      },
      selfCheckExample: {
        prompt:
          "With a 1 Ω shunt, a galvanometer reaches full scale for a total current of 610 mA. With 440 Ω in series instead, it reaches full scale at 5 V. Find its resistance G and its full-scale current.",
        steps: [
          "Shunt: \\(I_g G = 1 \\times (0.61 - I_g)\\), so \\(I_g = \\dfrac{0.61}{G + 1}\\).",
          "Series: \\(5 = I_g(G + 440)\\). Substituting: \\(5(G + 1) = 0.61(G + 440)\\).",
          "\\(5G + 5 = 0.61G + 268.4\\), so \\(4.39G = 263.4\\) and \\(G = 60\\ \\Omega\\).",
          "\\(I_g = \\dfrac{0.61}{61} = 0.01\\) A.",
        ],
        answer: "G = 60 Ω; full-scale current 10 mA.",
      },
      practiceSet: [
        { prompt: "A galvanometer of 25 Ω reaches full scale at 4 mA. Series resistance for a voltmeter of range 20 V?", answer: "4975 Ω" },
        { prompt: "A voltmeter of resistance x reads up to 10 V. What resistance in series lets it read up to 40 V?", answer: "3x" },
        { prompt: "Which meter should have a very high resistance, an ammeter or a voltmeter?", answer: "A voltmeter" },
        { prompt: "A galvanometer of 100 Ω with a full-scale current of 1 mA is made into a 10 V voltmeter. Total resistance of the voltmeter?", answer: "10 kΩ" },
      ],
      pyqExampleId: "69aa32c1-b89b-456d-b924-23d588204a44", // 6 Apr 2026 S2: 2 Ω shunt → 500 mA; 470 Ω series → 10 V; G = 50 Ω
      traps: [
        {
          title: "Subtract the galvanometer's own resistance",
          body: "The series resistor is V/Ig − G. V/Ig alone is the whole voltmeter's resistance, coil included.",
        },
        {
          title: "Raising a voltmeter's range uses the meter's resistance",
          body: "To multiply the range by n, add (n − 1) times the voltmeter's total resistance, not (n − 1) times the bare galvanometer's.",
        },
        {
          title: "A voltmeter in series reads almost the whole supply",
          body: "Its large resistance takes nearly all the voltage and lets almost no current through. A voltmeter must go across the part, in parallel.",
        },
      ],
    },
  ],
};
