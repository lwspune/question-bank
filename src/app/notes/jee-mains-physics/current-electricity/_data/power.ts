import type { SubtopicNote } from "@/app/notes/_types";

export const POWER_CE_NOTE: SubtopicNote = {
  subtopicName: "Electrical Power and Heating",
  title: "Electrical Power and Heating",
  oneLineDefinition:
    "A resistor turns electrical energy into heat at the rate P = VI = I²R = V²/R; pick the form that holds fixed what the circuit holds fixed, current in series and voltage in parallel.",
  whyItMatters:
    "Thirty PYQs, eighteen of them multiple choice, and three from 2026. Fourteen start from a rating such as 220 V, 100 W: a bulb on a different supply, two bulbs in series, the resistor that lets a lamp run at its rating, a wire cut and reconnected, and the heating times of kettles and coils. Sixteen use H = I²Rt: energy rescaled when the current changes, heat shared among resistors in a circuit, power-line and motor losses, and one that melts ice.",
  concepts: [
    // C1 — ratings
    {
      kind: "formula" as const,
      slug: "jpce-power-ratings",
      name: "Power ratings, bulbs and heaters",
      intuition:
        "A rating like 220 V, 100 W tells you one fixed thing: the device's resistance, R = V²/P. Put it in any other circuit and that resistance stays the same while the power changes. In series every device has the same current, so the one with more resistance, the lower-rated bulb, dissipates more and glows brighter. In parallel every device has the same voltage, so the one with less resistance dissipates more.",
      definition:
        "- From a rating: \\(R = \\dfrac{V_0^{2}}{P_0}\\). On a supply V: \\(P = P_0\\left(\\dfrac{V}{V_0}\\right)^{2}\\).\n" +
        "- In series (same I): \\(P \\propto R\\). In parallel (same V): \\(P \\propto 1/R\\).\n" +
        "- To run a device at its rating on a higher supply, add a series resistor that carries the rated current \\(I_0 = P_0/V_0\\) and drops the extra voltage: \\(R_s = \\dfrac{V - V_0}{I_0}\\).\n" +
        "- n identical devices in parallel and then in series on the same supply: the powers are in the ratio \\(n^{2} : 1\\).\n" +
        "- Heating a fixed amount of water from a fixed supply: \\(t \\propto R\\). A shorter element has less R and boils sooner.\n" +
        "- Two coils that alone take \\(t_1\\) and \\(t_2\\) on the same supply: in series they take \\(t_1 + t_2\\); in parallel \\(\\dfrac{t_1t_2}{t_1 + t_2}\\).\n" +
        "- Brightness (illumination) is taken to be proportional to the power.",
      formula: {
        label: "From a rating",
        latex: "R = \\frac{V_0^{2}}{P_0}, \\qquad P = P_0\\left(\\frac{V}{V_0}\\right)^{2}, \\qquad R_s = \\frac{V - V_0}{P_0/V_0}",
      },
      authoredExample: {
        prompt:
          "A 120 V, 60 W bulb and a 120 V, 40 W bulb are joined in series across 120 V. Find the power in each. Which glows brighter?",
        steps: [
          "\\(R_1 = \\dfrac{120^{2}}{60} = 240\\ \\Omega\\), \\(R_2 = \\dfrac{120^{2}}{40} = 360\\ \\Omega\\).",
          "\\(I = \\dfrac{120}{600} = 0.2\\) A.",
          "\\(P_1 = 0.04 \\times 240 = 9.6\\) W; \\(P_2 = 0.04 \\times 360 = 14.4\\) W. The 40 W bulb glows brighter.",
        ],
        answer: "9.6 W and 14.4 W; the 40 W bulb is brighter",
      },
      selfCheckExample: {
        prompt:
          "A lamp rated 6 V, 3 W must run normally from a 15 V supply. What resistor should be put in series with it?",
        steps: [
          "Rated current: \\(3/6 = 0.5\\) A.",
          "The resistor must drop \\(15 - 6 = 9\\) V at 0.5 A.",
          "\\(R_s = 9/0.5 = 18\\ \\Omega\\).",
        ],
        answer: "18 Ω",
      },
      practiceSet: [
        { prompt: "A 200 V, 100 W bulb runs on 150 V. Power?", answer: "56.25 W" },
        { prompt: "The current through a lamp falls by 10%. By what percentage does its brightness fall?", answer: "19%" },
        { prompt: "A kettle with a 30 Ω element boils water in 12 min. With a 20 Ω element on the same supply?", answer: "8 min" },
        { prompt: "Two heaters alone take 10 min and 15 min on the same supply. Joined in series?", answer: "25 min" },
      ],
      pyqExampleId: "50a7bec1-e723-4cb5-a154-bb17df69adfc", // 2022: 220 V 100 W and 220 V 60 W in series on 220 V
      traps: [
        {
          title: "The resistance stays, the power changes",
          body: "Off its rated supply a device keeps its resistance, not its wattage. Find R from the rating first, then the new power.",
        },
        {
          title: "In series the lower rating glows more",
          body: "A 40 W bulb has more resistance than a 60 W bulb of the same voltage, so with the same current it dissipates more. In parallel the order flips.",
        },
        {
          title: "Power goes as the square",
          body: "A 10% fall in current or voltage cuts the power by 19%, not 10%. Square the factor.",
        },
      ],
    },

    // C2 — Joule heating
    {
      kind: "formula" as const,
      slug: "jpce-joule-heating",
      name: "Joule heating, losses and efficiency",
      intuition:
        "Every coulomb that falls through a potential difference V gives up energy V. In a resistor all of it becomes heat, so the heat in a time t is I²Rt. For a resistor with a fixed resistance, doubling the current quadruples the heat. Across a network, the same idea shares heat among resistors: in proportion to R where they share a current, and to 1/R where they share a voltage.",
      definition:
        "- \\(H = I^{2}Rt = VIt = \\dfrac{V^{2}}{R}t\\). The work done by a source moving charge Q through V is \\(QV\\).\n" +
        "- Same resistor, new current and time: \\(H \\propto I^{2}t\\).\n" +
        "- Series resistors: heat \\(\\propto R\\). Parallel resistors: heat \\(\\propto 1/R\\).\n" +
        "- \"Power in the whole circuit\" includes the cell's internal resistance: \\(P = \\varepsilon I\\).\n" +
        "- Transmission: the line current is \\(I = P/V\\), the loss is \\(I^{2}R_{\\text{line}}\\), and the efficiency is the delivered power over the sent power.\n" +
        "- A motor: input VI, output = efficiency × input, loss = the rest. \\(1\\ \\text{cal} = 4.2\\) J.\n" +
        "- Heat used to warm and melt: \\(Q = mc\\Delta T + mL\\), then \\(t = Q/P\\).",
      formula: {
        label: "Joule's law",
        latex: "H = I^{2}Rt = VIt = \\frac{V^{2}t}{R}, \\qquad Q = mc\\,\\Delta T + mL",
      },
      authoredExample: {
        prompt:
          "A resistor gives out 400 J in 10 s when it carries 2 A. How much heat does it give out in 4 s when it carries 5 A?",
        steps: [
          "\\(R = \\dfrac{400}{2^{2} \\times 10} = 10\\ \\Omega\\).",
          "\\(H = 5^{2} \\times 10 \\times 4 = 1000\\) J.",
          "Check by ratio: \\(400 \\times \\dfrac{25}{4} \\times \\dfrac{4}{10} = 1000\\) J.",
        ],
        answer: "1000 J",
      },
      selfCheckExample: {
        prompt:
          "A 1 kW kettle heats 1 kg of water from 20 °C to 100 °C. Taking the specific heat of water as 4200 J kg⁻¹ K⁻¹ and no losses, how long does it take?",
        steps: [
          "\\(Q = mc\\Delta T = 1 \\times 4200 \\times 80 = 3.36 \\times 10^{5}\\) J.",
          "\\(t = Q/P = 3.36 \\times 10^{5}/1000 = 336\\) s.",
        ],
        answer: "336 s, that is 5.6 min",
      },
      practiceSet: [
        { prompt: "A 2 Ω and a 6 Ω resistor are in parallel. Ratio of heat produced in them?", answer: "3 : 1" },
        { prompt: "10 kW is sent at 500 V along a line of resistance 1 Ω. Power lost in the line?", answer: "400 W" },
        { prompt: "A battery moves 30 C through a potential difference of 12 V. Work done?", answer: "360 J" },
        { prompt: "A motor on 200 V draws 2 A at 90% efficiency. Power lost, in cal/s?", answer: "About 9.5 cal/s (40 W)" },
      ],
      pyqExampleId: "952cce71-8290-49d3-977a-3df910fd281e", // 2021 Paper 24: ice in a 1 m pipe melted by 0.5 A through 4 kΩ
      traps: [
        {
          title: "In parallel the smaller resistor heats more",
          body: "Resistors in parallel share a voltage, so heat goes as V²/R: the smaller resistor gets the larger share. Using I²R with a single current gets it backwards.",
        },
        {
          title: "\"Whole circuit\" includes r",
          body: "The power of the whole circuit is εI, which counts the heat inside the cell. The power in the external resistors alone is smaller.",
        },
        {
          title: "Warm before you melt",
          body: "Ice below 0 °C must first be warmed to 0 °C (mcΔT) and then melted (mL). Leaving out either term gives a time that is too short.",
        },
      ],
    },
  ],
};
