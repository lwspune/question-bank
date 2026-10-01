import type { SubtopicNote } from "@/app/notes/_types";

export const PROCESSES_TD_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamic Processes and Work from P-V Graphs",
  title: "Thermodynamic Processes and Work from P–V Graphs",
  oneLineDefinition:
    "Each standard process holds one quantity fixed and so zeroes one term of the first law; the work done by the gas along any path is the signed area under it on a P–V diagram.",
  whyItMatters:
    "Twenty-five PYQs, twenty-three of them multiple choice, two from 2026, and twelve carry a figure. Eleven ask which process is which, often as a match list of W, Q and ΔU or as a graph to recognise. Ten find work from a P–V path: an area under straight legs, an isothermal logarithm, or a comparison of paths. Four give the process as an equation, such as PV^(3/2) = constant, and ask for the work or a temperature.",
  concepts: [
    // C1 — the four processes (reference)
    {
      kind: "reference" as const,
      slug: "jpthermo-process-id",
      name: "The standard processes and their W, Q and ΔU",
      intuition:
        "Each standard process holds one thing fixed, and that one fact zeroes one term of the first law. Fix T and ΔU = 0. Fix V and W = 0. Allow no heat and Q = 0. Fix P and nothing vanishes, but the three terms keep a fixed ratio. Learn one row per process and most match-list questions answer themselves. W below is the work done BY the gas.",
      definition:
        "- Isothermal: \\(PV = \\text{const}\\), a hyperbola on a P–V graph; a higher temperature lies farther from the axes.\n" +
        "- Isochoric: \\(P \\propto T\\), a straight line through the origin of a P–T graph.\n" +
        "- Isobaric: \\(V \\propto T\\). On a V–T graph the slope is nR/P, so the **steeper line has the lower pressure**.\n" +
        "- Adiabatic: \\(PV^{\\gamma} = \\text{const}\\), steeper on a P–V graph than the isotherm through the same point.\n" +
        "- On any graph with T along one axis, an isotherm is a straight line at right angles to that axis.\n" +
        "- \"Sudden\", \"insulated walls\" or \"constant entropy\" mean adiabatic; \"slow, in contact with a large reservoir\" means isothermal.",
      table: {
        columns: ["Process", "Held fixed", "Work by the gas W", "Heat into the gas Q", "Change ΔU"],
        rows: [
          {
            cells: ["Isothermal", "Temperature", "\\(nRT\\ln\\dfrac{V_2}{V_1}\\)", "Q = W", "0"],
            noteAmber: "Heat flows in, yet the temperature does not rise: all of it leaves as work.",
          },
          { cells: ["Isochoric", "Volume", "0", "\\(nC_V\\Delta T\\), so Q = ΔU", "\\(nC_V\\Delta T\\)"] },
          { cells: ["Isobaric", "Pressure", "\\(P\\Delta V = nR\\Delta T\\)", "\\(nC_P\\Delta T\\)", "\\(nC_V\\Delta T\\)"] },
          { cells: ["Adiabatic", "No heat exchanged", "\\(\\dfrac{nR(T_1 - T_2)}{\\gamma - 1}\\)", "0", "−W"] },
          { cells: ["Cyclic", "Start and end state the same", "Area enclosed on the P–V diagram", "Q = W", "0"] },
          { cells: ["Free expansion into a vacuum", "Insulated, no outside pressure", "0", "0", "0, so an ideal gas keeps its temperature"] },
        ],
        caption: "Physics sign convention: W is work done BY the gas and Q is heat INTO the gas, so Q = ΔU + W in every row.",
      },
      selfCheckExample: {
        prompt:
          "A gas in a sealed rigid container is heated and receives \\(250\\ \\text{J}\\). Find W, Q and ΔU.",
        steps: [
          "Rigid container: the volume is fixed, so W = 0.",
          "Q = +250 J, and \\(\\Delta U = Q - W = 250\\ \\text{J}\\).",
        ],
        answer: "W = 0, Q = 250 J, ΔU = 250 J",
      },
      practiceSet: [
        { prompt: "In which standard process does all the heat supplied turn into work?", answer: "Isothermal" },
        { prompt: "The pressure of a gas is proportional to its absolute temperature throughout a process. Which process is it?", answer: "Isochoric" },
        { prompt: "Two straight isobars on a V–T graph pass through the origin. Which has the higher pressure?", answer: "The less steep one" },
        { prompt: "An insulated gas is compressed quickly. Which of W, Q and ΔU is zero?", answer: "Q" },
      ],
      pyqExampleId: "c5531f86-ff0f-4972-85dd-5d79660f73f4", // 30 Jan 2023: heat given in an isothermal process — ΔU = 0, W > 0
      traps: [
        {
          title: "Isothermal does not mean no heat",
          body: "In an isothermal process the temperature is fixed, but heat still flows: Q = W. The process with no heat is the adiabatic one.",
        },
        {
          title: "An isochoric line must pass through the origin",
          body: "P ∝ T describes an isochoric process only when the P–T line passes through absolute zero. A straight line with an intercept, P = a + bT, is not isochoric.",
        },
      ],
    },

    // C2 — work as area
    {
      kind: "formula" as const,
      slug: "jpthermo-work-area",
      name: "Work as the area under a P–V path",
      intuition:
        "W = ∫P dV, so on a P–V diagram the work done by the gas is the area between the path and the volume axis. Moving to the right (expansion) the area counts positive; moving to the left (compression) it counts negative. Break a path into straight pieces and add their signed areas. An isotherm is a curve, so there you use its formula instead.",
      definition:
        "- Horizontal leg (isobaric): \\(W = P(V_2 - V_1)\\).\n" +
        "- Vertical leg (isochoric): \\(W = 0\\).\n" +
        "- Straight sloping leg: a trapezium, \\(W = \\tfrac{1}{2}(P_1 + P_2)(V_2 - V_1)\\).\n" +
        "- Isothermal: \\(W = nRT\\ln\\dfrac{V_2}{V_1} = P_1V_1\\ln\\dfrac{P_1}{P_2}\\).\n" +
        "- From the same start to the same final volume in an expansion: \\(W_{\\text{adiabatic}} < W_{\\text{isothermal}} < W_{\\text{isobaric}}\\), because the adiabat falls fastest and the isobar not at all.\n" +
        "- An ideal gas held at constant temperature has bulk modulus \\(B = -V\\dfrac{dP}{dV} = P\\).\n" +
        "- A curve that starts and ends at the same volume: the size of W is the area between the curve and that vertical line. W is positive if the gas expands at the higher pressure and is compressed at the lower, negative the other way round. Read the two semi-axes of an arc separately, on the V scale and the P scale.\n" +
        "- Units: Pa × m³ = J; kPa × L = J; \\(1\\ \\text{dyne cm}^{-2} = 0.1\\ \\text{Pa}\\); \\(1\\ \\text{cm}^{3} = 10^{-6}\\ \\text{m}^{3}\\).",
      formula: {
        label: "Work done by the gas",
        latex: "W = \\int_{V_1}^{V_2} P\\,dV \\qquad W_{\\text{iso}} = nRT\\ln\\frac{V_2}{V_1}",
      },
      authoredExample: {
        prompt:
          "A gas goes in a straight line on a P–V diagram from A (1 L, 500 kPa) to B (5 L, 200 kPa), then at constant pressure back to C (1 L, 200 kPa). Find the work done by the gas on each leg and in total.",
        steps: [
          "AB is an expansion. Trapezium: \\(\\tfrac{1}{2}(500 + 200) \\times (5 - 1) = 1400\\ \\text{kPa L} = 1400\\ \\text{J}\\).",
          "BC is a compression at 200 kPa: \\(200 \\times (1 - 5) = -800\\ \\text{J}\\).",
          "Total: \\(1400 - 800 = 600\\ \\text{J}\\). This is the triangle between the two legs, \\(\\tfrac{1}{2} \\times 4 \\times 300 = 600\\ \\text{J}\\).",
        ],
        answer: "1400 J and −800 J; 600 J in total",
      },
      selfCheckExample: {
        prompt:
          "2 mol of an ideal gas at 300 K expands isothermally from 5 L to 20 L. Find the work done by the gas. (\\(R = 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1}\\), ln 2 = 0.693)",
        steps: [
          "\\(W = nRT\\ln\\dfrac{V_2}{V_1} = 2 \\times 8.3 \\times 300 \\times \\ln 4\\).",
          "\\(\\ln 4 = 2\\ln 2 = 1.386\\), so \\(W = 4980 \\times 1.386 \\approx 6900\\ \\text{J}\\).",
        ],
        answer: "about 6.9 kJ",
      },
      practiceSet: [
        { prompt: "A gas expands from 2 L to 6 L at a steady 150 kPa. Work done by the gas?", answer: "600 J" },
        { prompt: "A gas is heated at constant volume from 100 kPa to 300 kPa. Work done?", answer: "Zero" },
        { prompt: "1 mol of an ideal gas at 400 K expands isothermally to e times its volume. Work done, in terms of R?", answer: "400R" },
        { prompt: "An ideal gas at \\(2 \\times 10^{5}\\ \\text{Pa}\\) is kept at constant temperature. Its bulk modulus?", answer: "\\(2 \\times 10^{5}\\ \\text{Pa}\\)" },
      ],
      pyqExampleId: "7bb088c9-6898-4155-be54-4c61adcbeccd", // 23 Jan 2025: path ABCD on a P–V diagram, legs added with signs
      traps: [
        {
          title: "A leg to the left is negative work",
          body: "Any part of a path that runs towards smaller volume has negative work by the gas, however high the pressure. Add the areas with their signs.",
        },
        {
          title: "Read each axis on its own scale",
          body: "For an elliptical or circular arc on a P–V diagram, read the semi-axis along V in m³ and the semi-axis along P in Pa, each from its own axis. A circle on the page is usually an ellipse in physical units.",
        },
      ],
    },

    // C3 — processes given as an equation
    {
      kind: "formula" as const,
      slug: "jpthermo-polytropic",
      name: "Processes given by an equation such as PV^x = constant",
      intuition:
        "Some questions describe the process by a rule linking P and V, or V and T. Turn it into the form PV^x = constant, where x is a number fixed by the process. Then one formula gives the work, and PV = nRT turns it into a temperature rule. For a rule of any other shape, find P, V and T at each end separately from PV = nRT.",
      definition:
        "- \\(PV^{x} = \\text{const}\\) (x ≠ 1): \\(W = \\dfrac{P_1V_1 - P_2V_2}{x - 1} = \\dfrac{nR(T_1 - T_2)}{x - 1}\\).\n" +
        "- With PV = nRT: \\(TV^{x - 1} = \\text{const}\\), so \\(T \\propto V^{1 - x}\\).\n" +
        "- Given \\(V \\propto T^{m}\\): then \\(T \\propto V^{1/m}\\), so \\(1 - x = \\dfrac{1}{m}\\).\n" +
        "- x = 0 is isobaric, x = 1 isothermal, x = γ adiabatic, and x very large is isochoric.\n" +
        "- Any other rule P(V): find each end's temperature from \\(T = \\dfrac{PV}{nR}\\).",
      formula: {
        label: "Polytropic process PV^x = constant",
        latex: "W = \\frac{P_1V_1 - P_2V_2}{x - 1} = \\frac{nR(T_1 - T_2)}{x - 1} \\qquad T \\propto V^{1 - x}",
      },
      authoredExample: {
        prompt:
          "1 mol of an ideal gas at 400 K follows \\(PV^{4/3} = \\text{constant}\\) while its volume grows 8 times. Find its final temperature and the work it does. (\\(R = 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1}\\))",
        steps: [
          "\\(T \\propto V^{1 - 4/3} = V^{-1/3}\\), so \\(T_2 = 400 \\times 8^{-1/3} = 200\\ \\text{K}\\).",
          "\\(W = \\dfrac{nR(T_1 - T_2)}{x - 1} = \\dfrac{8.3 \\times 200}{1/3} = 4980\\ \\text{J}\\).",
          "The gas does work and cools, as an expansion with x > 1 must.",
        ],
        answer: "200 K; about 4.98 kJ",
      },
      selfCheckExample: {
        prompt:
          "In some process the volume of an ideal gas is proportional to the cube of its absolute temperature. Find x in \\(PV^{x} = \\text{const}\\), and the work done by 1 mol when its temperature rises by 40 K.",
        steps: [
          "\\(V \\propto T^{3}\\) gives \\(T \\propto V^{1/3}\\), so \\(1 - x = \\tfrac{1}{3}\\) and \\(x = \\tfrac{2}{3}\\).",
          "\\(W = \\dfrac{nR(T_1 - T_2)}{x - 1} = \\dfrac{R(-40)}{-1/3} = 120R\\).",
        ],
        answer: "x = 2/3; W = 120R",
      },
      practiceSet: [
        { prompt: "P is proportional to \\(1/V^{2}\\). Find x.", answer: "2" },
        { prompt: "P is proportional to V. How does T depend on V?", answer: "x = −1, so T ∝ V²" },
        { prompt: "A gas follows \\(PV^{2} = \\text{const}\\) as it expands. Does it heat up or cool down?", answer: "It cools: T ∝ 1/V" },
        { prompt: "x = 3, \\(P_1V_1 = 900\\ \\text{J}\\), \\(P_2V_2 = 300\\ \\text{J}\\). Work done by the gas?", answer: "300 J" },
      ],
      pyqExampleId: "cb710393-c1ba-4067-9d9e-f32aa3f9cd32", // 1 Feb 2024: PV^(3/2) = K, work from state A to state B
      traps: [
        {
          title: "x = 1 needs the logarithm",
          body: "The polytropic work formula divides by x − 1, so it fails for an isothermal process. There use W = nRT ln(V₂/V₁).",
        },
        {
          title: "The index belongs to the process, γ to the gas",
          body: "x in PV^x = constant is set by the process; γ = Cp/Cv is set by the gas. They are equal only in an adiabatic process, so do not call x by the name γ.",
        },
      ],
    },
  ],
};
