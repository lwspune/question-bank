import type { SubtopicNote } from "@/app/notes/_types";

export const PRESSURE_SURFACE_TENSION_NOTE: SubtopicNote = {
  subtopicName: "Pressure and Surface Tension",
  title: "Pressure and Surface Tension",
  oneLineDefinition:
    "Pressure is force spread over an area (P = F/A); inside a liquid it grows only with depth and density (P = rho g h) and is transmitted undiminished through an enclosed fluid (Pascal). Surface tension is the elastic skin of a liquid surface, and it weakens as temperature rises.",
  whyItMatters:
    "Eight PYQs and the foundation the whole chapter rests on. The recurring tests are: pressure = force / area (smaller area means more pressure), liquid pressure depends on height and density but NOT on the base area or container shape, the SI unit (pascal = N/m²), what a barometer measures, and the one surface-tension fact the bank loves — it falls when temperature increases. Two of the eight are HARD, both pressure-versus-area reasoning, so get the P = F/A intuition airtight.",
  concepts: [
    // 1 — FOUNDATION: pressure = force / area
    {
      kind: "formula" as const,
      slug: "flu-pressure-force-per-area",
      name: "Pressure — force spread over an area",
      intuition:
        "Pressure measures how concentrated a force is. The same weight pressing on a tiny area bites hard (a drawing pin); spread over a large area it barely registers (a flat shoe on snow). Push the same force through a smaller area and the pressure goes up.",
      definition:
        "**Pressure** is the normal force acting per unit area: \\(P = F/A\\).\n" +
        "- For a fixed force, **smaller contact area means larger pressure** (P proportional to 1/A).\n" +
        "- It is a **scalar** — pressure has magnitude but no single direction; in a fluid it pushes outward on every surface it touches.\n" +
        "- SI unit: the **pascal (Pa)**, where \\(1\\,\\text{Pa} = 1\\,\\text{N/m}^2\\).",
      visualizationSlug: "fluid-pressure-depth",
      formula: {
        label: "Pressure",
        latex: "P = \\dfrac{F}{A}",
        symbols: [
          { symbol: "P", meaning: "pressure (Pa = N/m²)" },
          { symbol: "F", meaning: "force normal to the surface (N)" },
          { symbol: "A", meaning: "area over which the force acts (m²)" },
        ],
      },
      authoredExample: {
        prompt:
          "A force of 30 N is applied normally to a surface of area 0.5 m². What pressure does it exert?",
        steps: [
          "Use \\(P = F/A\\).",
          "\\(P = 30 / 0.5 = 60\\,\\text{N/m}^2\\).",
          "So the pressure is 60 Pa.",
        ],
        answer: "60 Pa (60 N/m²).",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg box (take g = 10 m/s²) rests on a table on a face of area 0.04 m². What pressure does it exert on the table?",
        steps: [
          "Force on the table = weight = \\(mg = 2 \\times 10 = 20\\,\\text{N}\\).",
          "\\(P = F/A = 20 / 0.04 = 500\\,\\text{N/m}^2\\).",
        ],
        answer: "500 Pa.",
      },
      practiceSet: [
        { prompt: "SI unit of pressure?", answer: "Pascal (Pa = N/m²)" },
        { prompt: "Same force on half the area gives what pressure?", answer: "Double", method: "P proportional to 1/A" },
        { prompt: "Why does a sharp knife cut better than a blunt one?", answer: "Smaller edge area means much higher pressure for the same force" },
      ],
      pyqExampleId: "11963628-732e-458a-a31b-d22d73770e2e", // 2022 — box on table, P = F/A = 666.6 N/m²
      traps: [
        {
          title: "Pressure rises when area shrinks",
          body:
            "For a fixed force, P is inversely proportional to A. Resting a block on its SMALLEST face gives the GREATEST pressure. A common slip is to think the largest face presses hardest — it presses softest, because the same weight is spread over more area.",
        },
      ],
    },

    // 2 — Pressure in a liquid: P = rho g h
    {
      kind: "formula" as const,
      slug: "flu-pressure-in-a-liquid",
      name: "Pressure in a liquid — P = rho g h",
      intuition:
        "Dive deeper into water and you feel your ears squeeze: the deeper you go, the more liquid sits above you, and its weight presses down harder. The pressure at a point depends only on how deep it is and how dense the liquid is — not on the shape of the container or how wide its base is.",
      definition:
        "The **gauge pressure** at depth \\(h\\) below a liquid surface is \\(P = \\rho g h\\).\n" +
        "- It depends on **depth \\(h\\)** and **density \\(\\rho\\)** — and on \\(g\\).\n" +
        "- It does **NOT** depend on the base area or the shape of the container (the hydrostatic paradox).\n" +
        "- Pressure is the **same at all points on the same horizontal level** in a connected liquid at rest — but it INCREASES with depth, so it is not the same at every point.",
      formula: {
        label: "Pressure due to a liquid column",
        latex: "P = \\rho g h",
        symbols: [
          { symbol: "P", meaning: "gauge pressure at depth h (Pa)" },
          { symbol: "\\rho", meaning: "density of the liquid (kg/m³)" },
          { symbol: "g", meaning: "acceleration due to gravity (m/s²)" },
          { symbol: "h", meaning: "depth below the free surface (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the gauge pressure at a depth of 2 m in water (density 1000 kg/m³, g = 10 m/s²).",
        steps: [
          "Use \\(P = \\rho g h\\).",
          "\\(P = 1000 \\times 10 \\times 2 = 20000\\,\\text{Pa}\\).",
          "So the pressure due to the water column is 20 kPa.",
        ],
        answer: "20000 Pa (20 kPa).",
      },
      selfCheckExample: {
        prompt:
          "Two beakers hold water to the same height of 0.5 m, but one has twice the base area of the other. Compare the water pressure at the base of each (g = 10 m/s², density 1000 kg/m³).",
        steps: [
          "\\(P = \\rho g h\\) — pressure depends on height and density, NOT on base area.",
          "Both have the same height, so \\(P = 1000 \\times 10 \\times 0.5 = 5000\\,\\text{Pa}\\) in both.",
          "The wider base feels a larger total FORCE, but the same PRESSURE.",
        ],
        answer: "Equal pressure (5000 Pa) at both bases; base area does not change pressure.",
      },
      practiceSet: [
        { prompt: "Liquid pressure at the base depends on which two liquid properties?", answer: "Height of the column and its density" },
        { prompt: "Does doubling the base area change the liquid pressure at the bottom?", answer: "No", method: "P = rho g h has no area term" },
        { prompt: "Where is the pressure greatest in a still tank — top or bottom?", answer: "Bottom (greatest depth)" },
      ],
      pyqExampleId: "72e20708-f200-477b-9ad2-c1c55f3b13e9", // 2020 — pressure depends on height of liquid column
      traps: [
        {
          title: "Pressure is NOT the same at all points",
          body:
            "A frequent statement-MCQ trap claims 'pressure is the same at all points in a fluid at rest.' False — pressure is equal only at the same horizontal LEVEL; it grows with depth. What IS true: pressure exists everywhere in the fluid and presses on the walls.",
        },
        {
          title: "Shape and base area do not matter",
          body:
            "The hydrostatic paradox: a thin tall column and a wide shallow tank filled to the same height give the same pressure at the base. Only depth and density count, not the volume or the container shape.",
        },
      ],
    },

    // 3 — Pascal's principle / hydraulic press
    {
      kind: "formula" as const,
      slug: "flu-pascal-principle",
      name: "Pascal's principle — the hydraulic press",
      intuition:
        "Squeeze an enclosed liquid anywhere and the extra pressure shows up everywhere, equally. That is how a small push on a narrow piston lifts a heavy car on a wide piston: the same pressure acting on a bigger area gives a bigger force.",
      definition:
        "**Pascal's principle:** a pressure applied to an enclosed fluid is transmitted **undiminished to every point** of the fluid and the walls.\n" +
        "In a hydraulic press the pressure is the same under both pistons, so \\(F_1/A_1 = F_2/A_2\\).\n" +
        "- The wide piston multiplies force by the area ratio \\(A_2/A_1\\).\n" +
        "- It is a **force multiplier**, not an energy creator — the wide piston moves a shorter distance.",
      visualizationSlug: "pascal-hydraulic-press",
      formula: {
        label: "Hydraulic press",
        latex: "\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}",
        symbols: [
          { symbol: "F_1", meaning: "force on the small piston (N)" },
          { symbol: "A_1", meaning: "area of the small piston (m²)" },
          { symbol: "F_2", meaning: "force on the large piston (N)" },
          { symbol: "A_2", meaning: "area of the large piston (m²)" },
        ],
      },
      authoredExample: {
        prompt:
          "In a hydraulic press the small piston has area 0.01 m² and the large piston 0.5 m². A force of 20 N is applied to the small piston. What force appears on the large piston?",
        steps: [
          "Pressure is the same under both pistons: \\(F_1/A_1 = F_2/A_2\\).",
          "\\(F_2 = F_1 \\times A_2/A_1 = 20 \\times (0.5 / 0.01)\\).",
          "\\(F_2 = 20 \\times 50 = 1000\\,\\text{N}\\).",
        ],
        answer: "1000 N — a 50-fold force multiplication.",
      },
      selfCheckExample: {
        prompt:
          "A hydraulic lift has piston areas in the ratio 1 : 8. What input force lifts a 4000 N load on the larger piston?",
        steps: [
          "\\(F_1/A_1 = F_2/A_2\\), so \\(F_1 = F_2 \\times A_1/A_2\\).",
          "\\(A_1/A_2 = 1/8\\), so \\(F_1 = 4000 \\times (1/8)\\).",
          "\\(F_1 = 500\\,\\text{N}\\).",
        ],
        answer: "500 N.",
      },
      practiceSet: [
        { prompt: "A hydraulic press is a force ___?", answer: "Multiplier" },
        { prompt: "Pistons of area ratio 1:10, input 30 N — output force?", answer: "300 N", method: "F2 = F1 x A2/A1" },
        { prompt: "Pressure applied to an enclosed fluid is transmitted…", answer: "Equally (undiminished) to every point" },
      ],
      traps: [
        {
          title: "Force is multiplied, energy is not",
          body:
            "The hydraulic press gains force but loses distance — the big piston moves a smaller distance than the small piston, so work in equals work out. Do not claim it 'creates' energy. It only redistributes force and displacement.",
        },
      ],
    },

    // 4 — Atmospheric pressure, units, gauge vs absolute
    {
      kind: "formula" as const,
      slug: "flu-atmospheric-gauge-absolute",
      name: "Atmospheric pressure, gauge vs absolute, and the pascal",
      intuition:
        "The air above us has weight, and it presses on everything at about 100 kPa at sea level — that is atmospheric pressure, measured by a barometer. A pressure gauge usually reads the EXTRA pressure above the atmosphere; add the atmosphere back to get the true (absolute) pressure.",
      definition:
        "- **Atmospheric pressure** is the pressure of the air column above a point; it is measured with a **barometer** (a mercury barometer reads about 76 cm of Hg at sea level).\n" +
        "- **Gauge pressure** is pressure measured RELATIVE to the atmosphere; **absolute pressure** = gauge pressure + atmospheric pressure.\n" +
        "- **Units:** the SI unit is the **pascal**, and \\(1\\,\\text{Pa} = 1\\,\\text{N/m}^2\\) — they are the SAME unit. (1 bar = 100000 Pa; 1 atm is about 101325 Pa.)",
      formula: {
        label: "Absolute pressure in a liquid open to air",
        latex: "P_{\\text{abs}} = P_{\\text{atm}} + \\rho g h",
        symbols: [
          { symbol: "P_{\\text{abs}}", meaning: "absolute (true) pressure (Pa)" },
          { symbol: "P_{\\text{atm}}", meaning: "atmospheric pressure (Pa)" },
          { symbol: "\\rho g h", meaning: "gauge pressure due to the liquid column (Pa)" },
        ],
      },
      authoredExample: {
        prompt:
          "A pressure gauge on a tank reads 30 kPa. If atmospheric pressure is 100 kPa, what is the absolute pressure inside the tank?",
        steps: [
          "A gauge reads pressure relative to the atmosphere.",
          "Absolute = gauge + atmospheric = \\(30 + 100\\).",
          "Absolute pressure = 130 kPa.",
        ],
        answer: "130 kPa.",
      },
      selfCheckExample: {
        prompt:
          "Which device measures atmospheric pressure, and what is the SI unit of pressure?",
        steps: [
          "Atmospheric pressure is measured by a barometer (not a thermometer or hygrometer).",
          "The SI unit of pressure is the pascal, equal to N/m².",
        ],
        answer: "Barometer; the pascal (Pa = N/m²).",
      },
      practiceSet: [
        { prompt: "Device used to measure atmospheric pressure?", answer: "Barometer" },
        { prompt: "Are pascal and N/m² the same unit?", answer: "Yes" },
        { prompt: "Absolute pressure = gauge pressure + ___?", answer: "Atmospheric pressure" },
      ],
      pyqExampleId: "1ff6ae15-f66f-4c14-9e88-17403a116845", // 2025 — pascal and N/m² represent the same unit
      traps: [
        {
          title: "Barometer vs manometer vs thermometer",
          body:
            "A barometer measures ATMOSPHERIC pressure. A manometer measures the pressure of an enclosed gas. A thermometer measures temperature. The bank often lists all three as distractors — pick the barometer for atmospheric pressure.",
        },
      ],
    },

    // 5 — Surface tension
    {
      kind: "formula" as const,
      slug: "flu-surface-tension",
      name: "Surface tension — the skin of a liquid",
      intuition:
        "A liquid surface behaves like a stretched elastic skin. Molecules at the surface are pulled inward by their neighbours, so the surface tries to shrink to the smallest area — that is why droplets are round and a needle can rest on water. Heat the liquid and the skin weakens.",
      definition:
        "**Surface tension** is the force per unit length acting along a liquid surface, arising from the inward attraction on surface molecules. Consequences and facts:\n" +
        "- It makes drops **spherical** (smallest area for a given volume) and lets small dense objects rest on water.\n" +
        "- It drives **capillary rise** — a liquid that wets a narrow tube climbs higher in a thinner bore (rise proportional to 1/r) and forms a concave meniscus.\n" +
        "- **It DECREASES as temperature increases** (it becomes zero at the critical temperature). Adding detergent also lowers it.",
      visualizationSlug: "surface-tension-meniscus",
      formula: {
        label: "Surface tension",
        latex: "T = \\dfrac{F}{L}",
        symbols: [
          { symbol: "T", meaning: "surface tension (N/m)" },
          { symbol: "F", meaning: "force along the surface (N)" },
          { symbol: "L", meaning: "length over which the force acts (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "Why do free liquid drops take a spherical shape in the absence of other forces?",
        steps: [
          "Surface tension makes the surface shrink to the smallest possible area.",
          "For a fixed volume, the shape with the least surface area is a sphere.",
          "So a free drop pulls itself into a sphere.",
        ],
        answer: "Because a sphere has the minimum surface area for a given volume, and surface tension minimises area.",
      },
      selfCheckExample: {
        prompt:
          "A student heats a beaker of water. What happens to the water's surface tension, and why?",
        steps: [
          "Higher temperature gives molecules more thermal energy, weakening the inward attraction at the surface.",
          "So the surface tension falls as temperature rises.",
        ],
        answer: "It decreases as the temperature increases.",
      },
      practiceSet: [
        { prompt: "Surface tension when temperature increases — rises or falls?", answer: "Falls (decreases)" },
        { prompt: "Why is a free liquid drop spherical?", answer: "Sphere has the least surface area for a given volume" },
        { prompt: "Does adding detergent raise or lower water's surface tension?", answer: "Lowers it" },
      ],
      pyqExampleId: "314b5641-7f29-43fb-ba68-035976f70411", // 2025 — surface tension decreases when temperature increases
      traps: [
        {
          title: "Temperature LOWERS surface tension",
          body:
            "The bank tests this directly. A tempting wrong option says surface tension 'increases with temperature' — it does the opposite. More heat means weaker surface attraction, so surface tension falls (and vanishes at the critical temperature).",
        },
      ],
    },
  ],
};
