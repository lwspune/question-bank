import type { SubtopicNote } from "@/app/notes/_types";

export const UNITS_AND_DIMENSIONS_NOTE: SubtopicNote = {
  subtopicName: "Units and Dimensions",
  title: "Units, Measurement and Dimensions",
  oneLineDefinition:
    "Every physical quantity is measured against a unit; the seven SI base units build all derived units, and the dimensional formula [M^a L^b T^c] of a quantity lets you check equations, convert systems, and identify an unknown quantity from its units alone.",
  whyItMatters:
    "All 14 PYQs in NDA Physics's Units chapter live here, and about ten of them are EASY one-line recall. " +
    "Light year as a unit of distance is asked four separate times; 1 dyne = 10⁻⁵ N, H = Henry, 1 kWh = 3.6×10⁶ J and strain-is-dimensionless are each near-certain marks. " +
    "The only MODERATE/HARD work is one tool — the dimensional formula — used to find the dimension of G or to identify that thrust ÷ impulse is a frequency. " +
    "Lock the recall tables and the dimensional recipe and the whole chapter becomes a lookup.",
  concepts: [
    // 1 — FOUNDATION: physical quantity, unit, SI base units (REFERENCE)
    {
      kind: "reference" as const,
      slug: "umd-si-base-units",
      name: "Physical quantities, units, and the seven SI base units",
      intuition:
        "A measurement is always a number times a unit: \"5 metres\" means 5 of the agreed length-standard. " +
        "Some quantities are chosen as fundamental (base) and the rest are derived by multiplying and dividing them. " +
        "The whole of mechanics rests on just three base units — kilogram (mass), metre (length), second (time) — and the SI system fixes seven base units in all.",
      definition:
        "A **physical quantity** is anything measurable; its measure is a **numerical value × a unit**.\n" +
        "- **Fundamental (base) quantities** are independent and chosen by convention; in SI there are **seven**.\n" +
        "- **Derived quantities** are built from the base ones (e.g. speed = length/time, force = mass × length/time²).\n" +
        "- The three mechanics base units are **kilogram (mass)**, **metre (length)**, **second (time)** — these alone build every M–L–T dimensional formula.",
      table: {
        columns: ["Base quantity", "SI unit", "Symbol"],
        rows: [
          { cells: ["Length", "metre", "m"] },
          { cells: ["Mass", "kilogram", "kg"] },
          { cells: ["Time", "second", "s"] },
          { cells: ["Electric current", "ampere", "A"] },
          {
            cells: ["Temperature", "kelvin", "K"],
            noteAmber: "NDA 2025 match-list — Temperature → Kelvin, Mass → Kilogram (weight is a force → Newton, pressure → Pascal).",
            pyqExampleId: "8b031bc3-a7c4-427b-bb95-7d0a376f0289",
          },
          { cells: ["Amount of substance", "mole", "mol"] },
          { cells: ["Luminous intensity", "candela", "cd"] },
        ],
        caption:
          "The seven SI base units. Mass is the kilogram; weight is a force (newton), not a base unit — the classic match-list trap.",
      },
      selfCheckExample: {
        prompt:
          "Match each quantity to its SI base unit: temperature, mass, electric current, amount of substance.",
        steps: [
          "Temperature is measured in kelvin (K).",
          "Mass is measured in kilogram (kg) — note: weight would be the newton, a derived unit.",
          "Electric current is measured in ampere (A).",
          "Amount of substance is measured in mole (mol).",
        ],
        answer: "Temperature → kelvin, mass → kilogram, current → ampere, amount of substance → mole.",
      },
      practiceSet: [
        { prompt: "SI base unit of temperature?", answer: "Kelvin (K)" },
        { prompt: "SI base unit of mass?", answer: "Kilogram (kg)" },
        { prompt: "SI base unit of electric current?", answer: "Ampere (A)" },
        { prompt: "How many SI base units are there?", answer: "Seven" },
      ],
      pyqExampleId: "8b031bc3-a7c4-427b-bb95-7d0a376f0289", // 2025 — Temp/Weight/Mass/Pressure match list
      traps: [
        {
          title: "Mass is kilogram; weight is a force (newton)",
          body:
            "In a match-list, \"Weight\" pairs with **Newton**, not kilogram — weight is the gravitational force \\(mg\\), a derived unit. Only **mass** maps to the kilogram base unit. Pressure maps to the pascal, temperature to the kelvin.",
        },
      ],
    },

    // 2 — SI derived units named after scientists (REFERENCE)
    {
      kind: "reference" as const,
      slug: "umd-named-derived-units",
      name: "SI derived units named after scientists",
      intuition:
        "Many derived units carry a scientist's name and an agreed symbol — newton (force), pascal (pressure), joule (energy), watt (power), hertz (frequency), henry (inductance). " +
        "The exam tests two things: what a symbol stands for (H = Henry, not Hertz) and which two quantities share a unit (stress and pressure are both N/m²).",
      definition:
        "Common named SI derived units:\n" +
        "- **Newton (N)** — force; \\(1\\,\\text{N} = 1\\,\\text{kg·m/s}^2\\).\n" +
        "- **Pascal (Pa)** — pressure and stress; \\(1\\,\\text{Pa} = 1\\,\\text{N/m}^2\\).\n" +
        "- **Joule (J)** — work and energy; \\(1\\,\\text{J} = 1\\,\\text{N·m}\\).\n" +
        "- **Watt (W)** — power; \\(1\\,\\text{W} = 1\\,\\text{J/s}\\).\n" +
        "- **Hertz (Hz)** — frequency; \\(1\\,\\text{Hz} = 1\\,\\text{s}^{-1}\\).\n" +
        "- **Henry (H)** — inductance.\n" +
        "**Stress** and **pressure** are both force ÷ area, so they share the unit N/m² (pascal).",
      table: {
        columns: ["Unit (symbol)", "Quantity", "In base units"],
        rows: [
          { cells: ["Newton (N)", "Force", "kg·m/s²"] },
          { cells: ["Pascal (Pa)", "Pressure, stress", "N/m² = kg/(m·s²)"] },
          { cells: ["Joule (J)", "Work, energy", "N·m = kg·m²/s²"] },
          { cells: ["Watt (W)", "Power", "J/s = kg·m²/s³"] },
          { cells: ["Hertz (Hz)", "Frequency", "s⁻¹"] },
          {
            cells: ["Henry (H)", "Inductance", "kg·m²/(s²·A²)"],
            noteAmber: "NDA 2017 — the symbol H stands for Henry (after Joseph Henry), NOT Hertz.",
            pyqExampleId: "43d738d5-a25b-4247-a231-979e5d5c2433",
          },
        ],
        caption:
          "Stress and pressure share the same unit (N/m²). The symbol H is Henry (inductance); Hz is the hertz (frequency).",
      },
      selfCheckExample: {
        prompt:
          "Which physical quantity has the same SI unit as pressure: angular momentum, stress, strain, or work?",
        steps: [
          "Pressure = force ÷ area, unit N/m² (pascal).",
          "Stress is also force ÷ area, unit N/m² — same unit as pressure.",
          "Strain is a ratio (dimensionless), angular momentum is kg·m²/s, work is the joule — all different.",
        ],
        answer: "Stress (both pressure and stress are N/m²).",
      },
      practiceSet: [
        { prompt: "What does the SI symbol H stand for?", answer: "Henry (inductance)" },
        { prompt: "Which quantity shares pressure's unit?", answer: "Stress (both N/m²)" },
        { prompt: "SI unit of power?", answer: "Watt (W)" },
        { prompt: "SI unit of frequency?", answer: "Hertz (Hz)" },
      ],
      pyqExampleId: "0df47bec-8d65-453e-b7dc-d28326fce62a", // 2017 — same unit as pressure = stress
      traps: [
        {
          title: "H is Henry, not Hertz",
          body:
            "The symbol **H** is the **henry** (unit of inductance, after Joseph Henry). **Hertz** has the symbol **Hz** and measures frequency. The exam offers both as distractors.",
        },
        {
          title: "Stress and pressure share a unit",
          body:
            "Both stress and pressure are force per unit area (N/m² = pascal). Strain, by contrast, is a pure ratio and is **dimensionless** — don't confuse stress (has a unit) with strain (no unit).",
        },
      ],
    },

    // 3 — units of length / distance (REFERENCE) — the 4× light-year emphasis
    {
      kind: "reference" as const,
      slug: "umd-length-distance-units",
      name: "Units of length and distance — light year, ångström, nanometre",
      intuition:
        "Lengths span an enormous range, so physics uses special units at each end. " +
        "For astronomical DISTANCES we use the light year and the parsec; for atomic-scale lengths we use the ångström and the nanometre. " +
        "The single most-tested fact in this whole chapter: a **light year is a unit of distance, not time and not intensity** — it has been asked four separate times.",
      definition:
        "Special length units, large to small:\n" +
        "- **Light year (ly)** — the **distance** light travels in one year, about \\(9.46 \\times 10^{15}\\) m. It is a unit of **distance only**, never time or light intensity.\n" +
        "- **Astronomical unit (AU)** — mean Earth–Sun distance, about \\(1.496 \\times 10^{11}\\) m.\n" +
        "- **Parsec (pc)** — about \\(3.26\\) light years (\\(3.086 \\times 10^{16}\\) m), the astronomer's distance unit.\n" +
        "- **Nanometre (nm)** \\(= 10^{-9}\\) m.\n" +
        "- **Ångström (Å)** \\(= 10^{-10}\\) m — so \\(1\\,\\text{nm} = 10\\,\\text{Å}\\).",
      table: {
        columns: ["Unit", "Measures", "Value"],
        rows: [
          {
            cells: ["Light year (ly)", "Distance (astronomical)", "9.46 × 10¹⁵ m"],
            noteAmber: "Asked 4× (2017, 2018, 2021) — light year is DISTANCE, never time, never light intensity.",
            pyqExampleId: "005c8378-f228-446d-8492-d8bc0f1c4140",
          },
          { cells: ["Astronomical unit (AU)", "Distance (Earth–Sun)", "1.496 × 10¹¹ m"] },
          { cells: ["Parsec (pc)", "Distance (astronomical)", "3.086 × 10¹⁶ m ≈ 3.26 ly"] },
          { cells: ["Nanometre (nm)", "Length (atomic-scale)", "10⁻⁹ m"] },
          {
            cells: ["Ångström (Å)", "Length (atomic-scale)", "10⁻¹⁰ m"],
            noteAmber: "NDA 2018 — 1 nm = 10 Å (since nm is 10⁻⁹ m and Å is 10⁻¹⁰ m).",
            pyqExampleId: "db0917c6-0f4f-43c9-97f0-17f17c6201a3",
          },
        ],
        caption:
          "Light year, AU and parsec all measure DISTANCE. 1 nm = 10 Å. The light-year-is-distance fact is the chapter's single highest-yield line.",
      },
      selfCheckExample: {
        prompt:
          "Consider these statements about a light year: (1) it measures very large distances, (2) it measures very large time intervals, (3) it measures light intensity. Which are correct?",
        steps: [
          "A light year is the distance light travels in one year — a unit of distance. Statement 1 is correct.",
          "It is not a time unit (the word \"year\" inside it is misleading). Statement 2 is wrong.",
          "It says nothing about intensity. Statement 3 is wrong.",
        ],
        answer: "Only statement 1 is correct.",
      },
      practiceSet: [
        { prompt: "A light year measures what?", answer: "Distance" },
        { prompt: "1 nm equals how many ångströms?", answer: "10 Å", method: "nm = 10⁻⁹ m, Å = 10⁻¹⁰ m" },
        { prompt: "1 ångström in metres?", answer: "10⁻¹⁰ m" },
        { prompt: "Is the light year a unit of time?", answer: "No — it is a unit of distance" },
      ],
      pyqExampleId: "74a7cb7a-67a6-46ab-9b7c-f68f9120236c", // 2021 — light year statements
      traps: [
        {
          title: "Light year is DISTANCE, not time",
          body:
            "The word \"year\" plants the trap: a light year is the **distance** light covers in a year (~\\(9.46 \\times 10^{15}\\) m), **not** a time interval and **not** light intensity. This exact fact is asked again and again.",
        },
        {
          title: "1 nm = 10 Å (not 0.1 Å)",
          body:
            "Since 1 nm \\(= 10^{-9}\\) m and 1 Å \\(= 10^{-10}\\) m, the nanometre is the **larger** unit: \\(1\\,\\text{nm} = 10\\,\\text{Å}\\). Don't invert it.",
        },
      ],
    },

    // 4 — units of energy and power (FORMULA — kWh conversion)
    {
      kind: "formula" as const,
      slug: "umd-energy-power-units",
      name: "Units of energy and power — joule, kWh, and the force trap",
      intuition:
        "Energy and work share the joule; the commercial unit of electrical energy is the kilowatt-hour (kWh). " +
        "The recurring trap hands you a list of energy units and slips in a force unit — kg·m/s² is a newton (force), not energy. " +
        "Any newton-metre (N·m) is a joule, and watt-hour is power × time = energy.",
      definition:
        "**Energy / work** is measured in the **joule (J)**: \\(1\\,\\text{J} = 1\\,\\text{N·m} = 1\\,\\text{kg·m}^2/\\text{s}^2\\), with dimension \\([ML^2T^{-2}]\\). " +
        "The **kilowatt-hour (kWh)** is energy = power × time: \\(1\\,\\text{kWh} = 1000\\,\\text{W} \\times 3600\\,\\text{s} = 3.6 \\times 10^{6}\\,\\text{J}\\). " +
        "**Watt-hour** and **newton-metre** are also energy units; **kg·m/s²** is the newton — a unit of **force**, not energy.",
      formula: {
        label: "Kilowatt-hour to joules",
        latex: "1\\,\\text{kWh} = 1000\\,\\text{W} \\times 3600\\,\\text{s} = 3.6 \\times 10^{6}\\,\\text{J}",
        symbols: [
          { symbol: "W", meaning: "watt = joule per second (power)" },
          { symbol: "kWh", meaning: "kilowatt-hour, the commercial unit of electrical energy" },
        ],
      },
      authoredExample: {
        prompt:
          "An electric heater rated at 2 kW runs for 3 hours. How much energy does it consume, in kWh and in joules?",
        steps: [
          "Energy in kWh = power × time = \\(2\\,\\text{kW} \\times 3\\,\\text{h} = 6\\,\\text{kWh}\\).",
          "Convert one kWh: \\(1\\,\\text{kWh} = 1000 \\times 3600 = 3.6 \\times 10^{6}\\,\\text{J}\\).",
          "So \\(6\\,\\text{kWh} = 6 \\times 3.6 \\times 10^{6} = 2.16 \\times 10^{7}\\,\\text{J}\\).",
        ],
        answer: "6 kWh, which is \\(2.16 \\times 10^{7}\\) J.",
      },
      selfCheckExample: {
        prompt:
          "Which of these is NOT a unit of energy: joule, watt-hour, newton-metre, or kg·m/s²?",
        steps: [
          "Joule is energy; watt-hour is power × time = energy; newton-metre = joule = energy.",
          "kg·m/s² is mass × acceleration = force (the newton), not energy.",
        ],
        answer: "kg·m/s² (it is a unit of force, not energy).",
      },
      practiceSet: [
        { prompt: "1 kWh in joules?", answer: "3.6 × 10⁶ J", method: "1000 W × 3600 s" },
        { prompt: "Is newton-metre a unit of energy?", answer: "Yes — N·m = joule" },
        { prompt: "Is kg·m/s² a unit of energy?", answer: "No — it is force (newton)" },
        { prompt: "Energy used by a 100 W bulb in 10 h, in kWh?", answer: "1 kWh", method: "0.1 kW × 10 h" },
      ],
      pyqExampleId: "29740631-cfc8-48e8-99b7-394de74ff4cb", // 2018 — 1 kWh = 3.6×10⁶ J
      traps: [
        {
          title: "kg·m/s² is force, not energy",
          body:
            "In a \"which is NOT a unit of energy\" list, the planted answer is **kg·m/s²** — that is mass × acceleration = the **newton (force)**. Energy is kg·m²/**s²** (joule). Watch the exponent on the metre.",
        },
        {
          title: "1 kWh = 3.6 × 10⁶ J, not 3600",
          body:
            "It's 1000 W × 3600 s = \\(3.6 \\times 10^{6}\\) J. Multiplying only by 3600 (forgetting the kilo) gives \\(3.6 \\times 10^{3}\\) — a factor-of-1000 error.",
        },
      ],
    },

    // 5 — unit-system conversion (FORMULA — dyne)
    {
      kind: "formula" as const,
      slug: "umd-unit-system-conversion",
      name: "Unit-system conversion — CGS to SI (the dyne)",
      intuition:
        "The CGS system uses centimetre, gram, second; SI uses metre, kilogram, second. " +
        "To convert a unit, substitute the base-unit factors: 1 g = 10⁻³ kg and 1 cm = 10⁻² m. " +
        "Doing this for force gives the headline conversion: 1 dyne = 10⁻⁵ newton.",
      definition:
        "Convert a unit by replacing each base unit with its SI value:\n" +
        "- \\(1\\,\\text{g} = 10^{-3}\\,\\text{kg}\\), \\(1\\,\\text{cm} = 10^{-2}\\,\\text{m}\\).\n" +
        "- **Force:** \\(1\\,\\text{dyne} = 1\\,\\text{g·cm/s}^2 = 10^{-3}\\,\\text{kg} \\times 10^{-2}\\,\\text{m/s}^2 = 10^{-5}\\,\\text{N}\\).\n" +
        "- **Energy:** \\(1\\,\\text{erg} = 1\\,\\text{g·cm}^2/\\text{s}^2 = 10^{-7}\\,\\text{J}\\).",
      formula: {
        label: "CGS force unit to SI",
        latex: "1\\,\\text{dyne} = 1\\,\\frac{\\text{g·cm}}{\\text{s}^2} = (10^{-3}\\,\\text{kg})(10^{-2}\\,\\text{m})\\,\\text{s}^{-2} = 10^{-5}\\,\\text{N}",
        symbols: [
          { symbol: "dyne", meaning: "CGS unit of force (g·cm/s²)" },
          { symbol: "N", meaning: "SI unit of force (kg·m/s²)" },
        ],
      },
      authoredExample: {
        prompt:
          "Convert 1 erg (the CGS unit of energy, g·cm²/s²) into joules.",
        steps: [
          "Write erg in base units: \\(1\\,\\text{erg} = 1\\,\\text{g·cm}^2/\\text{s}^2\\).",
          "Substitute \\(1\\,\\text{g} = 10^{-3}\\,\\text{kg}\\) and \\((1\\,\\text{cm})^2 = (10^{-2}\\,\\text{m})^2 = 10^{-4}\\,\\text{m}^2\\).",
          "\\(1\\,\\text{erg} = 10^{-3} \\times 10^{-4}\\,\\text{kg·m}^2/\\text{s}^2 = 10^{-7}\\,\\text{J}\\).",
        ],
        answer: "\\(1\\,\\text{erg} = 10^{-7}\\) J.",
      },
      selfCheckExample: {
        prompt:
          "Express 1 dyne in SI base units.",
        steps: [
          "1 dyne = 1 g·cm/s².",
          "Substitute 1 g = 10⁻³ kg and 1 cm = 10⁻² m.",
          "1 dyne = 10⁻³ kg × 10⁻² m / s² = 10⁻⁵ kg·m/s² = 10⁻⁵ N.",
        ],
        answer: "1 dyne = 10⁻⁵ N (= 10⁻⁵ kg·m/s²).",
      },
      practiceSet: [
        { prompt: "1 dyne in newtons?", answer: "10⁻⁵ N", method: "10⁻³ kg × 10⁻² m / s²" },
        { prompt: "1 erg in joules?", answer: "10⁻⁷ J" },
        { prompt: "1 gram in kilograms?", answer: "10⁻³ kg" },
        { prompt: "1 newton in dynes?", answer: "10⁵ dyne" },
      ],
      pyqExampleId: "eef81c32-7ef0-45df-bb5c-f58141ae96a8", // 2019 — 1 dyne = 10⁻⁵ N
      traps: [
        {
          title: "1 dyne = 10⁻⁵ N (not 10⁻³ N)",
          body:
            "Both factors shrink the unit: gram → kg gives \\(10^{-3}\\) and cm → m gives \\(10^{-2}\\). Multiply them: \\(10^{-3} \\times 10^{-2} = 10^{-5}\\). Forgetting the centimetre factor gives the wrong \\(10^{-3}\\,\\text{N}\\) distractor.",
        },
      ],
    },

    // 6 — dimensional formulas (FORMULA — dimension of G)
    {
      kind: "formula" as const,
      slug: "umd-dimensional-formulas",
      name: "Dimensional formulas — writing [M^a L^b T^c]",
      intuition:
        "The dimensional formula of a quantity records how it is built from mass (M), length (L) and time (T). " +
        "Write the defining equation, replace each quantity by its dimensions, and simplify the powers. " +
        "Solving the gravitation law for G gives its dimension; the same recipe checks any formula for consistency.",
      definition:
        "The **dimensional formula** expresses a quantity as \\([M^a L^b T^c]\\) (with current, temperature etc. added when needed).\n" +
        "- **Velocity** \\([LT^{-1}]\\), **acceleration** \\([LT^{-2}]\\), **force** \\([MLT^{-2}]\\), **energy/work** \\([ML^2T^{-2}]\\), **pressure** \\([ML^{-1}T^{-2}]\\).\n" +
        "- **Method:** start from a defining equation, substitute dimensions for every symbol, and collect the powers of M, L, T.\n" +
        "- A correct physical equation must be **dimensionally homogeneous** — both sides carry the same dimensions.",
      formula: {
        label: "Dimension of the gravitational constant G",
        latex: "F = \\frac{G m_1 m_2}{r^2} \\;\\Rightarrow\\; [G] = \\frac{[F][r^2]}{[m^2]} = \\frac{(MLT^{-2})(L^2)}{M^2} = M^{-1}L^3T^{-2}",
        symbols: [
          { symbol: "F", meaning: "gravitational force, [MLT⁻²]" },
          { symbol: "m_1, m_2", meaning: "masses, [M] each" },
          { symbol: "r", meaning: "separation, [L]" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the dimensional formula of pressure.",
        steps: [
          "Pressure = force ÷ area.",
          "Force has dimension \\([MLT^{-2}]\\); area has dimension \\([L^2]\\).",
          "\\([P] = \\dfrac{MLT^{-2}}{L^2} = ML^{-1}T^{-2}\\).",
        ],
        answer: "\\([P] = M L^{-1} T^{-2}\\).",
      },
      selfCheckExample: {
        prompt:
          "Derive the dimensional formula of the gravitational constant G from Newton's law of gravitation.",
        steps: [
          "Newton's law: \\(F = G m_1 m_2 / r^2\\), so \\(G = F r^2 / (m_1 m_2)\\).",
          "Substitute dimensions: \\([F] = MLT^{-2}\\), \\([r^2] = L^2\\), \\([m_1 m_2] = M^2\\).",
          "\\([G] = (MLT^{-2})(L^2)/M^2 = M^{-1}L^3T^{-2}\\).",
        ],
        answer: "\\([G] = M^{-1} L^3 T^{-2}\\).",
      },
      practiceSet: [
        { prompt: "Dimensional formula of force?", answer: "[MLT⁻²]" },
        { prompt: "Dimensional formula of energy?", answer: "[ML²T⁻²]" },
        { prompt: "Dimensional formula of G?", answer: "[M⁻¹L³T⁻²]", method: "G = Fr²/m²" },
        { prompt: "Dimensional formula of velocity?", answer: "[LT⁻¹]" },
      ],
      pyqExampleId: "5deaac34-7d1a-4092-adf7-2b548daa325e", // 2022 — dimension of G
      traps: [
        {
          title: "G carries a NEGATIVE mass power: M⁻¹",
          body:
            "Because G = F·r²/(m₁m₂), the two masses sit in the denominator, giving \\(M^{-1}\\) — not \\(M^{+1}\\). The full result \\(M^{-1}L^3T^{-2}\\) has \\(L^3\\) (from force's L times r²'s L²) and \\(T^{-2}\\) (from force). A sign slip on M is the planted error.",
        },
      ],
    },

    // 7 — dimensionless quantities (FORMULA / classification)
    {
      kind: "formula" as const,
      slug: "umd-dimensionless-quantities",
      name: "Dimensionless quantities — strain, angle, refractive index",
      intuition:
        "A quantity built as a ratio of two same-dimension quantities has all its dimensions cancel — it is dimensionless and has no unit. " +
        "Strain (change in length ÷ original length), refractive index (ratio of speeds), relative density and plane angle (arc ÷ radius) are the standard dimensionless quantities the exam tests.",
      definition:
        "A **dimensionless** quantity has dimensional formula \\([M^0 L^0 T^0]\\) — no unit.\n" +
        "- **Strain** = change in length ÷ original length = \\(L/L\\) → dimensionless. (Contrast **stress** = force/area, which has units N/m².)\n" +
        "- **Refractive index** = speed in vacuum ÷ speed in medium → dimensionless.\n" +
        "- **Relative density (specific gravity)** = density ÷ density of water → dimensionless.\n" +
        "- **Plane angle (radian)** = arc length ÷ radius = \\(L/L\\) → dimensionless.",
      formula: {
        label: "Strain is a pure ratio",
        latex: "\\text{strain} = \\frac{\\Delta L}{L} = \\frac{[L]}{[L]} = [M^0 L^0 T^0]",
        symbols: [
          { symbol: "\\Delta L", meaning: "change in length, [L]" },
          { symbol: "L", meaning: "original length, [L]" },
        ],
      },
      authoredExample: {
        prompt:
          "Among stress, strain, pressure and force, which one is dimensionless?",
        steps: [
          "Stress = force/area = \\([ML^{-1}T^{-2}]\\) — has dimensions.",
          "Pressure = force/area = \\([ML^{-1}T^{-2}]\\) — has dimensions.",
          "Force = \\([MLT^{-2}]\\) — has dimensions.",
          "Strain = ΔL/L, a length-over-length ratio → \\([M^0L^0T^0]\\), dimensionless.",
        ],
        answer: "Strain is the dimensionless quantity.",
      },
      selfCheckExample: {
        prompt:
          "Is the refractive index of glass a dimensionless quantity? Justify in one line.",
        steps: [
          "Refractive index n = speed of light in vacuum ÷ speed in glass.",
          "Both are speeds \\([LT^{-1}]\\), so the ratio cancels to \\([M^0L^0T^0]\\).",
        ],
        answer: "Yes — refractive index is a ratio of two speeds, so it is dimensionless.",
      },
      practiceSet: [
        { prompt: "Is strain dimensionless?", answer: "Yes — ΔL/L, a pure ratio" },
        { prompt: "Is stress dimensionless?", answer: "No — it is force/area, [ML⁻¹T⁻²]" },
        { prompt: "Is refractive index dimensionless?", answer: "Yes — ratio of two speeds" },
        { prompt: "Is plane angle (radian) dimensionless?", answer: "Yes — arc/radius = L/L" },
      ],
      pyqExampleId: "acceba7a-5f78-4c5d-9b9f-5b62de3a43db", // 2025 — strain is dimensionless
      traps: [
        {
          title: "Strain is dimensionless; stress is NOT",
          body:
            "Strain is the **ratio** ΔL/L (no unit). Stress is force ÷ area (N/m²). The pair is designed to be confused — only **strain** is dimensionless.",
        },
      ],
    },

    // 8 — identify a quantity from its dimensions (FORMULA — the HARD thrust/impulse)
    {
      kind: "formula" as const,
      slug: "umd-identify-by-dimension",
      name: "Identifying a quantity from its units or dimensions",
      intuition:
        "When asked what an unfamiliar combination 'is the same as', reduce both candidate and combination to base units (or M–L–T dimensions) and compare. " +
        "Thrust is a force and impulse is force × time, so thrust ÷ impulse is 1/time — which is a frequency (hertz).",
      definition:
        "To identify an unknown combination, **reduce it to base units / dimensions** and match it to a known quantity.\n" +
        "- **Thrust** = force, \\([MLT^{-2}]\\) (unit N).\n" +
        "- **Impulse** = force × time = change in momentum, \\([MLT^{-1}]\\) (unit N·s).\n" +
        "- So **thrust ÷ impulse** \\(= \\dfrac{MLT^{-2}}{MLT^{-1}} = T^{-1}\\) → the dimension of **frequency** (unit Hz).",
      formula: {
        label: "Thrust ÷ impulse is a frequency",
        latex: "\\frac{\\text{thrust}}{\\text{impulse}} = \\frac{[MLT^{-2}]}{[MLT^{-1}]} = [T^{-1}] = \\text{frequency (Hz)}",
        symbols: [
          { symbol: "thrust", meaning: "a force, [MLT⁻²]" },
          { symbol: "impulse", meaning: "force × time, [MLT⁻¹]" },
        ],
      },
      authoredExample: {
        prompt:
          "The unit of (force ÷ momentum) is the same as that of which quantity?",
        steps: [
          "Force has dimension \\([MLT^{-2}]\\).",
          "Momentum = mass × velocity has dimension \\([MLT^{-1}]\\).",
          "Force ÷ momentum \\(= MLT^{-2} / MLT^{-1} = T^{-1}\\) — the dimension of frequency.",
        ],
        answer: "Frequency (it has dimension \\(T^{-1}\\), unit Hz).",
      },
      selfCheckExample: {
        prompt:
          "The ratio of thrust to impulse has the same unit as which quantity — speed, wavelength, acceleration, or frequency?",
        steps: [
          "Thrust = force = \\([MLT^{-2}]\\); impulse = force × time = \\([MLT^{-1}]\\).",
          "Ratio = \\(MLT^{-2}/MLT^{-1} = T^{-1}\\).",
          "Speed is \\(LT^{-1}\\), wavelength is \\(L\\), acceleration is \\(LT^{-2}\\) — none match. Frequency is \\(T^{-1}\\).",
        ],
        answer: "Frequency.",
      },
      practiceSet: [
        { prompt: "Dimension of thrust ÷ impulse?", answer: "[T⁻¹] = frequency", method: "MLT⁻²/MLT⁻¹" },
        { prompt: "Dimension of impulse?", answer: "[MLT⁻¹]", method: "force × time = momentum" },
        { prompt: "Which quantity has dimension T⁻¹?", answer: "Frequency (Hz)" },
        { prompt: "Force ÷ momentum has the unit of?", answer: "Frequency (1/time)" },
      ],
      pyqExampleId: "0fdb9e8b-a692-4c12-8bbb-fba78b1ee6a4", // 2021 HARD — thrust/impulse = frequency
      traps: [
        {
          title: "Impulse is force × TIME, not force",
          body:
            "Impulse = F·t = change in momentum \\([MLT^{-1}]\\), one power of T less negative than force \\([MLT^{-2}]\\). The thrust/impulse ratio therefore leaves \\(T^{-1}\\) (frequency). Treating impulse as a plain force would wrongly make the ratio dimensionless.",
        },
      ],
    },

    // 9 — measurement: precision, least count (FORMULA / REFERENCE — the 910 mm) — WITH DIAGRAM
    {
      kind: "formula" as const,
      slug: "umd-measurement-precision",
      name: "Measurement — precision, accuracy and least count",
      intuition:
        "The least count is the smallest division an instrument can read — 1 mm for an ordinary metre scale. " +
        "A measurement is only as precise as the instrument's least count; recording a value to a finer level than the least count is false precision. " +
        "Among several readings, the one written consistently with the instrument's least count (here, to the millimetre) is the most precise honest measurement.",
      definition:
        "- **Least count (LC)** — the smallest value an instrument can measure (metre scale: 1 mm; vernier callipers: 0.1 mm; screw gauge: 0.01 mm).\n" +
        "- **Precision** — how finely a result is recorded; it is limited by the least count.\n" +
        "- **Accuracy** — how close a result is to the true value (a separate idea from precision).\n" +
        "- A metre scale with LC = 1 mm can sensibly report a length **to the millimetre**: e.g. 910 mm is read at exactly the scale's precision, whereas 0.925 m (to the mm via metres) or 29.07 cm imply a finer reading than the scale allows.",
      formula: {
        label: "Least count of a metre scale",
        latex: "\\text{LC (metre scale)} = 1\\,\\text{mm} = 0.1\\,\\text{cm} = 10^{-3}\\,\\text{m}",
        symbols: [
          { symbol: "LC", meaning: "least count — smallest readable division" },
        ],
      },
      visualizationSlug: "umd-least-count-ruler",
      authoredExample: {
        prompt:
          "A metre scale has a least count of 1 mm. A student records a rod's length as 24.6 cm. To what precision is this honest, and how would you write it in mm?",
        steps: [
          "Least count 1 mm = 0.1 cm, so the scale can resolve to the first decimal of a centimetre.",
          "24.6 cm is given to 0.1 cm = 1 mm — exactly the scale's precision, so it is an honest reading.",
          "In millimetres: \\(24.6\\,\\text{cm} = 246\\,\\text{mm}\\).",
        ],
        answer: "It is precise to 1 mm (the least count); the length is 246 mm.",
      },
      selfCheckExample: {
        prompt:
          "Using a metre scale of least count 1 mm, which reading is recorded most consistently with the instrument's precision: 0.50 mm, 29.07 cm, 0.925 m, or 910 mm?",
        steps: [
          "The scale resolves to 1 mm, so an honest reading is stated to the millimetre.",
          "0.50 mm is below the scale's range/precision; 29.07 cm and 0.925 m are written to a finer level (0.01 cm and 0.001 m = sub-mm) than 1 mm allows.",
          "910 mm is recorded exactly to the millimetre — matching the least count.",
        ],
        answer: "910 mm (it is stated to the scale's 1 mm least count).",
      },
      practiceSet: [
        { prompt: "Least count of an ordinary metre scale?", answer: "1 mm" },
        { prompt: "Least count of a vernier calliper?", answer: "0.1 mm (typically)" },
        { prompt: "Does a smaller least count mean greater precision?", answer: "Yes" },
        { prompt: "Is precision the same as accuracy?", answer: "No — precision is fineness; accuracy is closeness to the true value" },
      ],
      pyqExampleId: "087c437b-c786-41a2-8e5c-f7e6761fea78", // 2019 — least count / 910 mm
      traps: [
        {
          title: "Precision is set by the least count",
          body:
            "A metre scale (LC = 1 mm) cannot honestly report below 1 mm. A value written to sub-millimetre detail (0.925 m, 29.07 cm) claims more precision than the instrument has; the reading recorded **to the millimetre** is the consistent one.",
        },
        {
          title: "Precision ≠ accuracy",
          body:
            "Precision is how finely you can read (least count); accuracy is how close you are to the true value. A finely-recorded reading can still be inaccurate, and vice versa — don't equate the two.",
        },
      ],
    },
  ],
};
