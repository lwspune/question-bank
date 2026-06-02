import type { SubtopicNote } from "@/app/notes/_types";

export const POWER_AND_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Electrical Power, Energy and Heating",
  title: "Electrical Power, Energy and Heating",
  oneLineDefinition:
    "Electrical power is the rate of energy delivery — P = VI = I²R = V²/R; energy is power × time (billed in kilowatt-hours), and current passing through a resistance dissipates that energy as heat (Joule heating, H = I²Rt).",
  whyItMatters:
    "Ten PYQs spanning the three power formulas, the 'which expression is NOT power' recall trap, how an appliance's power changes when run at the wrong voltage (P ∝ V²), the cost of energy in kilowatt-hours, and Joule heating — including the HARD parallel-vs-series heat ratio. " +
    "Knowing WHEN to use I²R versus V²/R is the whole game.",
  concepts: [
    // 1 — power formulas
    {
      kind: "formula" as const,
      slug: "electrical-power",
      name: "Electrical power — three equivalent forms",
      intuition:
        "Power is energy delivered per second. The base formula is P = VI (voltage × current). Substituting Ohm's law gives two more forms — P = I²R and P = V²/R — which are handy when you happen to know current-and-resistance or voltage-and-resistance instead.",
      definition:
        "**Electrical power** (rate of energy use), in watts:\n" +
        "**\\(P = VI = I^2 R = \\dfrac{V^2}{R}\\)** — three equivalent forms via Ohm's law \\(V = IR\\).\n" +
        "Use \\(P = VI\\) always; \\(P = I^2R\\) when current and resistance are known; \\(P = V^2/R\\) when voltage and resistance are known. " +
        "Expressions like \\(IR^2\\) or \\(I^2/R\\) are NOT power (wrong dimensions).",
      formula: {
        label: "Electrical power",
        latex: "P = VI = I^2 R = \\dfrac{V^2}{R}",
        symbols: [
          { symbol: "P", meaning: "power (watt)" },
          { symbol: "V", meaning: "voltage (volt)" },
          { symbol: "I", meaning: "current (ampere)" },
          { symbol: "R", meaning: "resistance (ohm)" },
        ],
      },
      authoredExample: {
        prompt:
          "A bulb connected to a 220 V supply draws a current of 600 mA. What is its power?",
        steps: [
          "Use \\(P = VI\\); convert 600 mA = 0.6 A.",
          "\\(P = 220 \\times 0.6 = 132\\) W.",
        ],
        answer: "132 W.",
      },
      selfCheckExample: {
        prompt:
          "What current does a 60 W bulb draw on a 240 V domestic supply?",
        steps: [
          "From \\(P = VI\\), current \\(I = P/V\\).",
          "\\(I = 60/240 = 0.25\\) A.",
        ],
        answer: "0.25 A.",
      },
      practiceSet: [
        { prompt: "Write the three forms of electrical power.", answer: "P = VI = I²R = V²/R" },
        { prompt: "Which of IR², I²R, VI, V²/R is NOT a power expression?", answer: "IR²" },
        { prompt: "A 2 A current through a 100 Ω resistor dissipates what power?", answer: "400 W", method: "P = I²R" },
      ],
      pyqExampleId: "2a2cbd8d-3cad-4512-8fc2-8fe5c2d10ead", // 2022 — P = VI = 132 W
      traps: [
        {
          title: "I²R is power; IR² and I²/R are not",
          body:
            "The bank tests this by dimensions. P = I²R ✓ and P = V²/R ✓. But IR² and I²/R are NOT power — check by substituting V = IR if unsure. Memorise the three valid forms and spot the impostor.",
        },
      ],
    },

    // 2 — power rating & voltage
    {
      kind: "formula" as const,
      slug: "power-rating-and-voltage",
      name: "Power rating and running at the wrong voltage",
      intuition:
        "A bulb stamped '220 V, 100 W' only delivers 100 W AT 220 V. Its resistance is fixed, so if you run it at a lower voltage the power drops — and because P = V²/R, it drops with the SQUARE of the voltage. Halving the voltage quarters the power.",
      definition:
        "An appliance rated \\((V_0, P_0)\\) has a fixed resistance \\(R = V_0^2 / P_0\\). " +
        "Run at a different voltage \\(V\\), its actual power is \\(P = V^2 / R\\), so\n" +
        "**\\(P \\propto V^2\\)** (resistance fixed): halving the voltage gives one-quarter the power.",
      formula: {
        label: "Power vs voltage at fixed R",
        latex: "P = \\dfrac{V^2}{R}, \\quad R = \\dfrac{V_0^2}{P_0} \\;\\Rightarrow\\; \\dfrac{P}{P_0} = \\left(\\dfrac{V}{V_0}\\right)^2",
      },
      authoredExample: {
        prompt:
          "A bulb rated 60 W, 120 V is run on a 60 V supply. What power does it actually consume?",
        steps: [
          "Its resistance is fixed: \\(R = V_0^2/P_0 = 120^2/60 = 240\\,\\Omega\\).",
          "At 60 V: \\(P = V^2/R = 60^2/240 = 3600/240 = 15\\) W.",
          "Shortcut: voltage halved ⟹ power ×(1/2)² = 1/4 ⟹ \\(60/4 = 15\\) W.",
        ],
        answer: "15 W.",
      },
      selfCheckExample: {
        prompt:
          "A 100 W, 200 V heater is connected to a 100 V supply. What power does it now give out?",
        steps: [
          "Resistance fixed; \\(P \\propto V^2\\).",
          "Voltage ratio: \\(100/200 = 1/2\\) ⟹ power ratio \\((1/2)^2 = 1/4\\).",
          "\\(P = 100 \\times 1/4 = 25\\) W.",
        ],
        answer: "25 W.",
      },
      practiceSet: [
        { prompt: "An appliance run at half its rated voltage gives what fraction of rated power?", answer: "One-quarter", method: "P ∝ V²" },
        { prompt: "Resistance of a 220 V, 100 W bulb?", answer: "484 Ω", method: "R = V₀²/P₀ = 220²/100" },
        { prompt: "A bulb at double its rated voltage would draw how much power (if it survived)?", answer: "4× rated" },
      ],
      pyqExampleId: "486ab38a-a0df-4a55-b966-ef5ef60b9a23", // 2023 — 220V/80W at 110V ⟹ 20 W
      traps: [
        {
          title: "Power scales as V², not V",
          body:
            "Running a bulb at half voltage does NOT halve the power — it quarters it. The resistance is fixed by the rating, so P = V²/R falls with the square of the voltage. Picking 40 W (half) instead of 20 W (quarter) is the standard trap.",
        },
      ],
    },

    // 3 — energy & cost
    {
      kind: "formula" as const,
      slug: "electrical-energy-and-cost",
      name: "Electrical energy and the cost of running appliances",
      intuition:
        "Energy is power kept up over time. Electricity bills measure it in kilowatt-hours: run 1 kW for 1 hour and you've used 1 'unit'. Multiply units by the price per unit to get the cost.",
      definition:
        "**Electrical energy** = power × time. The commercial unit is the **kilowatt-hour (kWh)**: \\(1\\text{ kWh} = 1\\text{ kW} \\times 1\\text{ h}\\) = one 'unit'. " +
        "Energy in kWh = (power in kW) × (time in hours). " +
        "**Cost** = (number of units) × (rate per unit).",
      formula: {
        label: "Energy and cost",
        latex: "E\\,(\\text{kWh}) = P\\,(\\text{kW}) \\times t\\,(\\text{h}), \\qquad \\text{Cost} = E \\times \\text{rate}",
      },
      authoredExample: {
        prompt:
          "A 2 kW geyser runs for 3 hours a day for 10 days. At ₹5 per unit, what is the cost?",
        steps: [
          "Energy per day: \\(2 \\times 3 = 6\\) kWh.",
          "Over 10 days: \\(6 \\times 10 = 60\\) units.",
          "Cost: \\(60 \\times 5 = ₹300\\).",
        ],
        answer: "₹300.",
      },
      selfCheckExample: {
        prompt:
          "An air conditioner rated 3 kW runs 8 hours a day for 15 days. At ₹6 per unit, what is the running cost?",
        steps: [
          "Energy per day: \\(3 \\times 8 = 24\\) kWh.",
          "Over 15 days: \\(24 \\times 15 = 360\\) units.",
          "Cost: \\(360 \\times 6 = ₹2160\\).",
        ],
        answer: "₹2,160.",
      },
      practiceSet: [
        { prompt: "What is one commercial 'unit' of electrical energy?", answer: "1 kilowatt-hour (kWh)" },
        { prompt: "Energy used by a 1.5 kW heater in 4 hours?", answer: "6 kWh" },
        { prompt: "1 kWh in joules (order of magnitude)?", answer: "3.6×10⁶ J", method: "1000 W × 3600 s" },
      ],
      pyqExampleId: "f5dc2f0c-79cc-4e8f-bef6-5dd01075e1f2", // 2020 — 5kW × 10h × 30d × ₹4 = ₹6000
      traps: [
        {
          title: "Keep power in kW and time in hours",
          body:
            "kWh = kW × hours. Don't convert power to watts or time to seconds for billing problems — that buries you in 10⁶ factors. Units × rate per unit gives the cost directly.",
        },
      ],
    },

    // 4 — Joule heating
    {
      kind: "formula" as const,
      slug: "joule-heating",
      name: "Joule heating — current heats a resistor",
      intuition:
        "Whenever current flows through a resistance, electrical energy turns into heat. The amount depends on three things together: the voltage applied, the current driven, and how long it runs. Heaters, irons, and geysers all live on this effect.",
      definition:
        "**Joule's law of heating**: heat produced \\(H = I^2 R t = VIt = \\dfrac{V^2}{R}\\,t\\) (joules). " +
        "It depends on the **current, the resistance/voltage, AND the time** — all three. For a heating coil on a fixed supply, the temperature rise grows with the supply voltage, the current, and the time the voltage is applied.",
      formula: {
        label: "Joule heating",
        latex: "H = I^2 R\\,t = V I t = \\dfrac{V^2}{R}\\,t",
        symbols: [
          { symbol: "H", meaning: "heat produced (joule)" },
          { symbol: "I", meaning: "current (A)" },
          { symbol: "R", meaning: "resistance (Ω)" },
          { symbol: "t", meaning: "time (s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 5 Ω heating coil carries 4 A for 2 minutes. How much heat does it produce?",
        steps: [
          "Use \\(H = I^2 R t\\); convert time: 2 min = 120 s.",
          "\\(H = 4^2 \\times 5 \\times 120 = 16 \\times 5 \\times 120\\).",
          "\\(H = 80 \\times 120 = 9600\\) J.",
        ],
        answer: "9600 J.",
      },
      selfCheckExample: {
        prompt:
          "Water is heated by a coil of resistance R connected to the domestic supply. Does the temperature rise depend on (1) the supply voltage, (2) the current through the coil, (3) the time the supply is on?",
        steps: [
          "Heat \\(H = VIt = I^2Rt = (V^2/R)t\\).",
          "Voltage appears (1) — yes. Current appears (2) — yes. Time appears (3) — yes.",
          "All three control the heat, hence the temperature rise.",
        ],
        answer: "Yes to all three — voltage, current, and time each matter.",
      },
      practiceSet: [
        { prompt: "State Joule's heating law.", answer: "H = I²Rt (= VIt = V²t/R)" },
        { prompt: "Heat from 2 A through 10 Ω for 5 s?", answer: "200 J", method: "I²Rt = 4×10×5" },
        { prompt: "Double the current through a fixed resistor — heat per second changes by…", answer: "×4", method: "H ∝ I²" },
      ],
      pyqExampleId: "ef5d208b-7964-4d75-bb08-959fe68da8bf", // 2019 — heating depends on V, I, and t
      traps: [
        {
          title: "Heat depends on all of V, I, and t",
          body:
            "Multi-statement questions try to drop one factor. H = VIt contains voltage, current, AND time — the temperature rise needs all three. Don't select 'current and time only'.",
        },
      ],
    },

    // 5 — heat in combinations
    {
      kind: "formula" as const,
      slug: "heat-in-combinations",
      name: "Heat dissipation in series vs parallel",
      intuition:
        "Connect resistors across the SAME voltage and the one with the SMALLER resistance burns more power (P = V²/R). So a parallel combination (small equivalent R) dissipates more heat than the same resistors in series (large equivalent R). For two equal resistors at the same voltage, parallel beats series by a factor of 4.",
      definition:
        "At a **fixed voltage**, power dissipated \\(P = V^2/R\\) — so SMALLER equivalent resistance ⟹ MORE heat. " +
        "Parallel gives a smaller equivalent than series, so a parallel combination dissipates more. " +
        "For **two equal resistors** at the same applied voltage: \\(R_\\parallel = R/2\\), \\(R_\\text{series} = 2R\\), so \\(\\dfrac{P_\\parallel}{P_\\text{series}} = \\dfrac{R_\\text{series}}{R_\\parallel} = \\dfrac{2R}{R/2} = 4\\).",
      authoredExample: {
        prompt:
          "Two equal resistors are connected across the same battery, first in parallel and then in series. What is the ratio of heat produced (parallel : series)?",
        steps: [
          "Same voltage V across each arrangement; \\(P = V^2/R_\\text{eq}\\).",
          "Parallel equivalent \\(= R/2\\); series equivalent \\(= 2R\\).",
          "\\(\\dfrac{P_\\parallel}{P_\\text{series}} = \\dfrac{V^2/(R/2)}{V^2/(2R)} = \\dfrac{2R}{R/2} = 4\\).",
        ],
        answer: "4 : 1 (parallel produces four times the heat).",
      },
      selfCheckExample: {
        prompt:
          "Wire B has twice the radius and twice the length of wire A (same material). The same voltage V is applied to each. If A dissipates power P, what power P₁ does B dissipate?",
        steps: [
          "\\(R = \\rho L/A = \\rho L/(\\pi r^2)\\). For B: length ×2, radius ×2 ⟹ area ×4.",
          "\\(R_B = \\rho (2L)/(\\pi (2r)^2) = \\rho(2L)/(4\\pi r^2) = \\tfrac12 \\rho L/(\\pi r^2) = R_A/2\\).",
          "Same V: \\(P = V^2/R\\), so \\(P_1 = V^2/R_B = V^2/(R_A/2) = 2V^2/R_A = 2P\\).",
          "Therefore \\(P = P_1/2\\).",
        ],
        answer: "P₁ = 2P, i.e. P = P₁/2.",
      },
      practiceSet: [
        { prompt: "At the same voltage, which dissipates more heat — series or parallel?", answer: "Parallel", method: "smaller R_eq ⟹ more P = V²/R" },
        { prompt: "Two equal resistors, same V: ratio of heat parallel : series?", answer: "4 : 1" },
        { prompt: "At fixed voltage, halving the resistance changes the power by…", answer: "×2", method: "P = V²/R" },
      ],
      pyqExampleId: "d0db672d-9a24-4c22-bb9c-3d4e911a0be9", // 2025 — parallel:series heat = 4:1
      traps: [
        {
          title: "Same VOLTAGE → use V²/R; don't reach for I²R",
          body:
            "When the two arrangements share the same applied voltage, power is V²/R, so smaller resistance means more heat (parallel wins). Reaching for I²R here misleads, because the current is different in each arrangement. The ratio is 4 : 1, and picking the inverted 1 : 4 is the dominant trap.",
        },
      ],
    },
  ],
};
