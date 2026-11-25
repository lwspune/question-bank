import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature Dependence of Resistivity",
  title: "How Resistivity Changes with Temperature",
  oneLineDefinition:
    "The relation ρ = ρ₀[1 + α(T − T₀)] and the temperature coefficient α, finding the working temperature of a heating element, and why metals, semiconductors and alloys like manganin behave differently when heated.",
  whyItMatters:
    "21 questions, sixteen of them from board papers from 2023 to 2026. The board asks you to define the temperature coefficient of resistance and use it to find a temperature or a resistance (2024, 2025, 2026), find the steady temperature of a nichrome heater from the current it draws (2026), explain why a metal's resistivity rises with temperature (2025, 2026), say why manganin is used in standard resistors (2026) and pick the right graph for a conductor as it is heated (2023, 2025, 2026). The textbook adds a toaster, a heating element and a platinum resistance thermometer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-temp-coefficient",
      name: "Temperature coefficient of resistivity",
      intuition:
        "Warm a metal wire and its resistance rises a little for every degree. Over a range that is not too large, the rise is a straight line: the fractional change in resistance per degree is a constant of the material, α. Every numerical here is the same equation, R = R₀[1 + α(T − T₀)], with one unknown to find.",
      definition:
        "- Over a limited range of temperature, \\(\\rho_T = \\rho_0\\left[1 + \\alpha(T - T_0)\\right]\\), where \\(\\rho_0\\) is the resistivity at a reference temperature \\(T_0\\).\n" +
        "- \\(\\alpha\\) is the **temperature coefficient of resistivity**. For a wire whose size barely changes, R follows the same law, so \\(\\alpha = \\dfrac{R_T - R_0}{R_0(T - T_0)}\\): the fractional change in resistance per degree rise.\n" +
        "- Unit of \\(\\alpha\\): \\(^\\circ\\text{C}^{-1}\\) or \\(\\text{K}^{-1}\\). A rise of 1 °C is a rise of 1 K, so no conversion is needed for a temperature difference.\n" +
        "- \\(\\alpha\\) is **positive** for metals. The straight line fails at temperatures far below 0 °C.\n" +
        "- A rise of x% in resistance means \\(\\alpha\\,\\Delta T = \\dfrac{x}{100}\\).\n" +
        "- **Platinum resistance thermometer:** with \\(R_0\\) at the ice point and \\(R_{100}\\) at the steam point, \\(t = \\dfrac{R_t - R_0}{R_{100} - R_0} \\times 100\\ ^\\circ\\text{C}\\).",
      formula: {
        label: "Resistance against temperature",
        latex: "R_T = R_0\\left[1 + \\alpha (T - T_0)\\right]",
        symbols: [
          { symbol: "\\(R_0\\)", meaning: "resistance at the reference temperature T₀" },
          { symbol: "\\(\\alpha\\)", meaning: "temperature coefficient, per °C or per K" },
        ],
      },
      authoredExample: {
        prompt:
          "At what temperature will the resistance of a metal wire be 1.5 times its resistance at 20 °C? Take 20 °C as the reference temperature and the temperature coefficient of resistance of the metal as 5.0 × 10⁻³ °C⁻¹.",
        steps: [
          "Given: \\(R_T = 1.5R_0\\), \\(T_0 = 20\\ ^\\circ\\text{C}\\), \\(\\alpha = 5.0 \\times 10^{-3}\\ ^\\circ\\text{C}^{-1}\\).",
          "Formula: \\(R_T = R_0\\left[1 + \\alpha(T - T_0)\\right]\\), so \\(1.5 = 1 + \\alpha(T - T_0)\\).",
          "\\(\\alpha(T - T_0) = 0.5\\), so \\(T - T_0 = \\dfrac{0.5}{5.0 \\times 10^{-3}} = 100\\ ^\\circ\\text{C}\\).",
          "Answer: \\(T = 20 + 100 = 120\\ ^\\circ\\text{C}\\).",
        ],
        answer: "120 °C",
      },
      selfCheckExample: {
        prompt:
          "A platinum resistance thermometer reads 2.0 Ω at the ice point and 2.4 Ω at the steam point. In a hot liquid it reads 3.0 Ω. Find the temperature of the liquid.",
        steps: ["\\(t = \\dfrac{R_t - R_0}{R_{100} - R_0} \\times 100 = \\dfrac{3.0 - 2.0}{2.4 - 2.0} \\times 100\\)."],
        answer: "250 °C",
      },
      practiceSet: [
        {
          prompt: "A metal has α = 2.5 × 10⁻³ °C⁻¹. By how many degrees must it be heated to raise its resistance by 5%?",
          answer: "\\(\\Delta T = \\dfrac{0.05}{2.5 \\times 10^{-3}} = 20\\ ^\\circ\\text{C}\\)",
        },
        { prompt: "Is the temperature coefficient of resistivity positive or negative for a semiconductor?", answer: "Negative: its resistivity falls when it is heated" },
        { prompt: "Give the SI unit of the temperature coefficient of resistance.", answer: "\\(\\text{K}^{-1}\\) (or \\(^\\circ\\text{C}^{-1}\\))" },
      ],
      pyqExampleId: "1a988b27-2d5e-47e9-96b4-c003ae71ddf1",
      traps: [
        {
          title: "Dividing before taking away the 1",
          body: "From \\(R/R_0 = 1 + \\alpha\\Delta T\\), first subtract 1, then divide by \\(\\alpha\\). Dividing the ratio itself by \\(\\alpha\\) gives a temperature hundreds of degrees too high.",
        },
        {
          title: "Changing the reference temperature mid-way",
          body: "Measure every temperature difference from the same reference at which \\(R_0\\) was taken. Starting part (ii) from the hotter reading gives a slightly different and wrong answer.",
        },
        {
          title: "Giving the rise when the final temperature is asked",
          body: "\\(\\alpha\\Delta T\\) gives the rise. If the question asks for the temperature, add the starting temperature to it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-heating-element",
      name: "The steady temperature of a heating element",
      intuition:
        "When a heater is first switched on, its coil is still at room temperature, so it draws its largest current. As it warms, its resistance rises and the current falls, until it stops getting hotter and the current settles. The two currents, at the same supply voltage, give you the cold and the hot resistance, and the temperature formula does the rest.",
      definition:
        "- At the moment of switching on (or with a negligibly small current), the coil is at room temperature \\(T_1\\): \\(R_1 = \\dfrac{V}{I_1}\\).\n" +
        "- At the steady state, the coil is at \\(T_2\\): \\(R_2 = \\dfrac{V}{I_2}\\), larger than \\(R_1\\) because \\(I_2 < I_1\\).\n" +
        "- Then \\(R_2 = R_1\\left[1 + \\alpha(T_2 - T_1)\\right]\\), so \\(T_2 = T_1 + \\dfrac{R_2 - R_1}{R_1\\alpha}\\).\n" +
        "- Take \\(R_1\\), the room-temperature value, as the reference, because \\(\\alpha\\) is quoted against it.",
      formula: {
        label: "Steady temperature",
        latex: "T_2 = T_1 + \\frac{R_2 - R_1}{R_1\\,\\alpha}",
      },
      authoredExample: {
        prompt:
          "A heating element connected to a 240 V supply first draws 5.0 A, and the current settles at 4.0 A. The room temperature is 25 °C and the temperature coefficient of resistance of the element is 5.0 × 10⁻⁴ °C⁻¹. Find the steady temperature of the element.",
        steps: [
          "Given: \\(V = 240\\) V, \\(I_1 = 5.0\\) A, \\(I_2 = 4.0\\) A, \\(T_1 = 25\\ ^\\circ\\text{C}\\), \\(\\alpha = 5.0 \\times 10^{-4}\\ ^\\circ\\text{C}^{-1}\\).",
          "Resistances: \\(R_1 = \\dfrac{240}{5.0} = 48\\ \\Omega\\), \\(R_2 = \\dfrac{240}{4.0} = 60\\ \\Omega\\).",
          "Formula: \\(T_2 - T_1 = \\dfrac{R_2 - R_1}{R_1\\alpha} = \\dfrac{60 - 48}{48 \\times 5.0 \\times 10^{-4}} = \\dfrac{12}{0.024} = 500\\ ^\\circ\\text{C}\\).",
          "Answer: \\(T_2 = 500 + 25 = 525\\ ^\\circ\\text{C}\\).",
        ],
        answer: "525 °C",
      },
      selfCheckExample: {
        prompt:
          "A heating element has a resistance of 40 Ω at 20 °C and works at 1020 °C. Its temperature coefficient of resistance is 2.0 × 10⁻⁴ °C⁻¹. Find its resistance while it is working.",
        steps: ["\\(R = 40\\left[1 + 2.0 \\times 10^{-4} \\times (1020 - 20)\\right] = 40 \\times 1.2\\)."],
        answer: "48 Ω",
      },
      practiceSet: [
        {
          prompt: "Why does the current drawn by a heater fall a few seconds after it is switched on?",
          answer: "The coil heats up, its resistance rises, and at the same voltage a larger resistance draws less current",
        },
        {
          prompt: "In finding the steady temperature of an element, which resistance is used as R₀: the cold one or the hot one?",
          answer: "The cold one, at room temperature, which is the reference for α",
        },
      ],
      pyqExampleId: "80b3d572-6a17-4572-ab97-ed0cbd4c7daf",
      traps: [
        {
          title: "Matching the wrong current to room temperature",
          body: "The larger, first current belongs to the cold coil at room temperature. The smaller, steady current belongs to the hot coil. Swapping them gives a temperature below room temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpce-temp-materials",
      name: "Metals, semiconductors and alloys when heated",
      intuition:
        "Use ρ = m/(ne²τ). Heating does two things: the electrons move faster and collide more often, so τ falls; and in some materials more charge carriers are freed, so n rises. Which effect wins decides whether the resistivity goes up or down.",
      definition:
        "- Heating raises the average speed of the electrons, so they collide more often and **\\(\\tau\\) decreases**.\n" +
        "- In a **metal**, n hardly changes, so the fall in \\(\\tau\\) makes \\(\\rho\\) rise.\n" +
        "- In **insulators and semiconductors**, n increases with temperature and more than makes up for the fall in \\(\\tau\\), so \\(\\rho\\) falls.\n" +
        "- **Graphs:** \\(\\rho\\) of copper against T is nearly a straight line over ordinary temperatures and bends at very low temperatures. The conductivity of a metal, \\(\\sigma = 1/\\rho\\), falls with temperature along a curve. The resistivity of a semiconductor falls steeply with temperature.",
      table: {
        columns: ["Material", "Resistivity on heating", "What decides it"],
        rows: [
          {
            cells: [
              "Metal, such as copper",
              "Rises, nearly linearly over ordinary temperatures",
              "τ falls as collisions become more frequent; n stays almost the same",
            ],
            pyqExampleId: "5d82951f-a29f-4ee8-bf23-31fe5ee1ff43",
            noteAmber: "Board 2025 and 2026 asked why a metal's resistivity rises with temperature: τ decreases and n does not change appreciably.",
          },
          {
            cells: [
              "Semiconductor",
              "Falls",
              "n increases with temperature, more than making up for the fall in τ",
            ],
            pyqExampleId: "fd6d5e50-db7e-4f87-86f3-fa78cdc5330a",
            noteAmber: "Board 2024 set an assertion and reason on the signs of the temperature coefficient for metals and p-type semiconductors.",
          },
          {
            cells: [
              "Insulator",
              "Falls",
              "n increases with temperature, as in a semiconductor",
            ],
          },
          {
            cells: [
              "Alloys: nichrome, manganin, constantan",
              "Changes very little",
              "A very weak dependence on temperature, so they are used in wire bound standard resistors",
            ],
            pyqExampleId: "51b143bf-b1d0-4183-8d1f-00e6c0d1752d",
            noteAmber: "Board 2026 asked why manganin is used in wire-wound standard resistors.",
          },
        ],
      },
      practiceSet: [
        {
          prompt: "Name the alloy of nickel, iron and chromium whose resistivity depends only weakly on temperature.",
          answer: "Nichrome",
        },
        {
          prompt: "How does the resistivity of an insulator change as it is heated, and why?",
          answer: "It falls, because the number of charge carriers n increases with temperature",
        },
        {
          prompt: "How does the conductivity of a metal change as it is heated?",
          answer: "It decreases, because \\(\\sigma = 1/\\rho\\) and \\(\\rho\\) increases",
        },
      ],
      traps: [
        {
          title: "Explaining with the sign of the charge",
          body: "The temperature coefficient is positive for metals and negative for semiconductors because of how n and \\(\\tau\\) change, not because of whether the carriers are positive or negative. In an assertion and reason item, that makes the reason true but not the explanation.",
        },
        {
          title: "Saying n rises in a metal",
          body: "In a metal the number of free electrons per unit volume does not change appreciably with temperature. Only \\(\\tau\\) falls. Writing that n rises describes a semiconductor.",
        },
      ],
    },
  ],
};
