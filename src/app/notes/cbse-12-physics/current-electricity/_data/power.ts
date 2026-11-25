import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Electrical Energy and Power",
  title: "Electrical Energy, Power and Joule Heating",
  oneLineDefinition:
    "The power P = VI = I²R = V²/R and the heat H = I²Rt produced in a resistor, and how a rating such as 1000 W, 220 V decides what an appliance does on another supply or joined to a second appliance.",
  whyItMatters:
    "12 questions, all from board papers from 2023 to 2026. The board asks you to find the heat produced in a resistor (2023), plot power against R, I and V (2023), compare bulbs joined in series (2023), find the power of rated heaters joined in series and in parallel (2024, 2026), find the power of a coil that is cut in half or a wire that is stretched (2024, 2025), find the rise in temperature when the current is doubled (2025), and work out the resistance and heat of an iron run at half its rated voltage (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-joule-heating",
      name: "Power and heat in a resistor",
      intuition:
        "Charges moving through a resistor lose potential energy, and the collisions with the atoms turn it into heat: the wire warms up. The rate of this loss is the power. Of its three forms, pick the one whose quantities stay fixed in the question: V²/R when the voltage is fixed, I²R when the current is fixed.",
      definition:
        "- A charge Q moving through a potential difference V loses energy \\(QV\\). With \\(Q = It\\), the energy in time t is \\(W = VIt\\).\n" +
        "- **Power** dissipated: \\(P = VI\\). With \\(V = IR\\), \\(P = I^2R = \\dfrac{V^2}{R}\\). Unit: watt (W).\n" +
        "- **Heat produced** in time t: \\(H = I^2Rt\\). This energy comes from the source, for a cell from its chemical energy.\n" +
        "- At fixed V, \\(P \\propto \\dfrac{1}{R}\\); at fixed R, \\(P \\propto I^2\\) and \\(P \\propto V^2\\) (parabolas through the origin).\n" +
        "- **Transmission:** to deliver power P through cables of resistance \\(R_c\\), the current is \\(P/V\\) and the loss in the cables is \\(\\dfrac{P^2R_c}{V^2}\\). So power is sent at a high voltage.",
      formula: {
        label: "Power and heat",
        latex: "P = VI = I^2R = \\frac{V^2}{R}, \\qquad H = I^2Rt",
      },
      authoredExample: {
        prompt: "A current of 3.0 A flows through a 20 Ω resistor for 5 minutes. Find the power and the heat produced.",
        steps: [
          "Given: \\(I = 3.0\\) A, \\(R = 20\\ \\Omega\\), \\(t = 5\\) min \\(= 300\\) s.",
          "Power: \\(P = I^2R = (3.0)^2 \\times 20 = 180\\) W.",
          "Heat: \\(H = I^2Rt = 180 \\times 300 = 5.4 \\times 10^{4}\\) J.",
        ],
        answer: "180 W; 5.4 × 10⁴ J",
      },
      selfCheckExample: {
        prompt: "A 12 V source with no internal resistance is connected across a 48 Ω resistor. Find the power taken by the resistor.",
        steps: ["\\(P = \\dfrac{V^2}{R} = \\dfrac{144}{48}\\)."],
        answer: "3 W",
      },
      practiceSet: [
        {
          prompt: "How much electrical energy does a 60 W lamp use in 10 minutes?",
          answer: "\\(W = Pt = 60 \\times 600 = 3.6 \\times 10^{4}\\) J",
        },
        {
          prompt: "Why is electric power transmitted over long distances at a high voltage?",
          answer: "For the same power the current \\(P/V\\) is smaller, and the loss \\(P^2R_c/V^2\\) in the cables falls as \\(V^2\\) rises",
        },
        {
          prompt: "Describe the graph of power against R for a resistor kept at a fixed voltage.",
          answer: "\\(P = V^2/R\\): a curve that falls as R increases, approaching the R axis without meeting it",
        },
      ],
      pyqExampleId: "b784cde4-7799-4521-bb12-d31371c32217",
      traps: [
        {
          title: "Leaving the time in minutes",
          body: "H = I²Rt gives joules only with t in seconds. Multiply minutes by 60 before you substitute.",
        },
        {
          title: "Taking heat as proportional to current",
          body: "The heat goes as the square of the current. Three times the current gives nine times the heat, and the temperature rise follows the heat.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-rated-power",
      name: "Rated appliances in series and in parallel",
      intuition:
        "A rating such as 100 W, 220 V tells you the appliance's resistance, R = V²/P, and that resistance is what stays the same when you change the supply or join appliances together. In parallel each appliance gets its full rated voltage and runs at its rated power. In series they share one current, so the one with the larger resistance, the lower rated one, takes more power and glows brighter.",
      definition:
        "- A rating \\((P, V)\\) fixes the resistance: \\(R = \\dfrac{V^2}{P}\\). The lower the rated power, the larger the resistance.\n" +
        "- On another supply \\(V'\\): \\(P' = \\dfrac{V'^2}{R} = P\\left(\\dfrac{V'}{V}\\right)^2\\). Half the voltage gives a quarter of the power.\n" +
        "- **In series** across the rated voltage: the same current flows, the power in each is \\(I^2R\\), largest for the largest R. Total: \\(\\dfrac{1}{P_s} = \\dfrac{1}{P_1} + \\dfrac{1}{P_2}\\), so \\(P_s = \\dfrac{P_1P_2}{P_1 + P_2}\\).\n" +
        "- **In parallel** across the rated voltage: each runs at its own rating, so \\(P_p = P_1 + P_2\\).\n" +
        "- Cutting a coil in half halves R, so on the same voltage it takes **twice** the power. Stretching a wire to n times its length makes R \\(n^2\\) times, so the power becomes \\(P/n^2\\).",
      formula: {
        label: "Rated appliances",
        latex: "R = \\frac{V^2}{P}, \\qquad \\frac{1}{P_s} = \\frac{1}{P_1} + \\frac{1}{P_2}, \\qquad P_p = P_1 + P_2",
      },
      authoredExample: {
        prompt:
          "Bulbs rated 100 W, 220 V and 60 W, 220 V are joined in series across a 220 V supply. Find the total power taken and say which bulb glows brighter.",
        steps: [
          "Resistances: \\(R_1 = \\dfrac{220^2}{100} = 484\\ \\Omega\\), \\(R_2 = \\dfrac{220^2}{60} = 807\\ \\Omega\\).",
          "Total power: \\(P_s = \\dfrac{P_1P_2}{P_1 + P_2} = \\dfrac{100 \\times 60}{160} = 37.5\\) W.",
          "Current: \\(I = \\dfrac{220}{484 + 807} = 0.170\\) A, the same in both.",
          "Power in each: \\(I^2R_1 = 14.1\\) W and \\(I^2R_2 = 23.4\\) W. The 60 W bulb takes more power.",
        ],
        answer: "37.5 W in all; the 60 W bulb glows brighter",
      },
      selfCheckExample: {
        prompt: "A heater rated 1000 W, 220 V is used on a 110 V supply. Find the power it takes, assuming its resistance does not change.",
        steps: ["Half the voltage, so \\(P' = 1000 \\times \\left(\\dfrac{1}{2}\\right)^2\\)."],
        answer: "250 W",
      },
      practiceSet: [
        {
          prompt: "A heater coil rated (P, V) is cut into two equal halves, and the halves are joined in parallel across the same voltage V. Find the power taken.",
          answer: "Each half is R/2 and the pair is R/4, so the power is 4P",
        },
        {
          prompt: "Find the resistance of a heater rated 2000 W, 240 V.",
          answer: "\\(R = \\dfrac{240^2}{2000} = 28.8\\ \\Omega\\)",
        },
        {
          prompt: "Of a 40 W bulb and a 100 W bulb rated at the same voltage, which has the larger resistance?",
          answer: "The 40 W bulb, since \\(R = V^2/P\\)",
        },
      ],
      pyqExampleId: "4a94272a-001a-466f-b03b-dd2ccbac2318",
      traps: [
        {
          title: "Expecting the higher rated bulb to glow brighter in series",
          body: "In series the current is common and the power is \\(I^2R\\), so the bulb with the larger resistance, the one with the lower rating, glows brighter. In parallel the higher rated bulb is brighter.",
        },
        {
          title: "Saying power is proportional to resistance",
          body: "At a fixed voltage \\(P = V^2/R\\): power is inversely proportional to resistance. \\(P \\propto R\\) holds only when the current is fixed. The board set this as a false reason in 2026.",
        },
      ],
    },
  ],
};
