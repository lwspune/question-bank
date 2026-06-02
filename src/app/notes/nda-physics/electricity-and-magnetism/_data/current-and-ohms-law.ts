import type { SubtopicNote } from "@/app/notes/_types";

export const CURRENT_AND_OHMS_LAW_NOTE: SubtopicNote = {
  subtopicName: "Electric Current and Ohm's Law",
  title: "Electric Current and Ohm's Law",
  oneLineDefinition:
    "Electric current is the rate of flow of charge (I = Q/t); in a metal it is carried by free electrons, and for an ohmic conductor the current is proportional to the applied voltage (V = IR).",
  whyItMatters:
    "This is the gateway to every circuit problem in the chapter — 9 PYQs covering the definition of current (Q = It is asked almost every year), what carries it in a metal, Ohm's law V = IR, the ohmic/non-ohmic split, and AC vs DC. " +
    "Nail Q = It and V = IR here and the power, resistance, and network subtopics become arithmetic.",
  concepts: [
    // 1 — current = charge / time
    {
      kind: "formula" as const,
      slug: "electric-current-and-charge",
      name: "Electric current as rate of flow of charge",
      intuition:
        "Current measures how much charge passes a point each second. If 1 coulomb flows past every second, that is 1 ampere. Over a time t, the total charge delivered is simply current × time.",
      definition:
        "**Electric current** is the rate of flow of charge: \\(I = Q/t\\). " +
        "The SI unit is the **ampere** (1 A = 1 C/s). Rearranged, the charge transported in time \\(t\\) is \\(Q = It\\). " +
        "Conventional current is taken in the direction a POSITIVE charge would move — opposite to the actual electron drift in a metal.",
      formula: {
        label: "Current and charge",
        latex: "I = \\dfrac{Q}{t} \\quad\\Longleftrightarrow\\quad Q = I\\,t",
        symbols: [
          { symbol: "I", meaning: "current (ampere)" },
          { symbol: "Q", meaning: "charge (coulomb)" },
          { symbol: "t", meaning: "time (second)" },
        ],
      },
      authoredExample: {
        prompt:
          "A current of 2 A flows through a wire for 5 minutes. How much charge passes through it?",
        steps: [
          "Use \\(Q = It\\); convert time to seconds: \\(5\\text{ min} = 300\\) s.",
          "\\(Q = 2 \\times 300 = 600\\) C.",
        ],
        answer: "600 C.",
      },
      selfCheckExample: {
        prompt:
          "How long must a 0.5 A current flow to deliver 90 C of charge?",
        steps: [
          "From \\(Q = It\\), time \\(t = Q/I\\).",
          "\\(t = 90 / 0.5 = 180\\) s = 3 minutes.",
        ],
        answer: "180 s (3 minutes).",
      },
      practiceSet: [
        { prompt: "Charge delivered by 3 A in 2 minutes?", answer: "360 C", method: "Q = It = 3 × 120" },
        { prompt: "1 ampere equals how many coulombs per second?", answer: "1 C/s" },
        { prompt: "A 0.6 A current flows for 10 minutes. Charge?", answer: "360 C", method: "0.6 × 600" },
      ],
      pyqExampleId: "0d6c6660-7052-49da-bc80-e177480bc824", // 2022 — 0.6 A × 10 min = 360 C
      traps: [
        {
          title: "Convert minutes to seconds first",
          body:
            "Q = It needs t in SECONDS. The dominant wrong answer forgets the ×60: 0.6 A × 10 = 6 (using minutes) instead of 0.6 × 600 = 360 C. Always convert time to seconds before multiplying.",
        },
      ],
    },

    // 2 — conduction in metals
    {
      kind: "formula" as const,
      slug: "conduction-in-metals",
      name: "What carries current in a metal — free electrons",
      intuition:
        "A metal is a lattice of fixed positive ions in a 'sea' of loosely bound electrons. Those FREE electrons drift when a voltage is applied — they are the charge carriers. The ions stay put; they only vibrate.",
      definition:
        "In a metallic conductor, current is carried by **free (conduction) electrons** — not ions, not protons, not bound electrons. " +
        "When a potential difference is applied, these electrons drift opposite to the field; the **conventional current** points the other way (direction of positive-charge flow).",
      authoredExample: {
        prompt:
          "In a copper wire carrying current, which particles actually move, and in which direction relative to the conventional current?",
        steps: [
          "Copper is a metal — the charge carriers are its free electrons.",
          "Electrons are negative, so they drift TOWARD the higher potential, opposite to the field.",
          "Conventional current is defined as the direction positive charge would flow — the OPPOSITE of electron drift.",
        ],
        answer: "Free electrons move; they drift opposite to the conventional current.",
      },
      selfCheckExample: {
        prompt:
          "Why is an ionic solution able to conduct current, while a copper wire does so without any ions moving?",
        steps: [
          "Conduction needs mobile charge carriers.",
          "In copper, the carriers are free electrons — already mobile in the metal.",
          "In a solution there are no free electrons; instead dissolved IONS carry the charge.",
          "Different carriers, same idea: something charged must be free to move.",
        ],
        answer: "Copper conducts via free electrons; a solution conducts via mobile ions.",
      },
      practiceSet: [
        { prompt: "What carries current in a metal?", answer: "Free electrons" },
        { prompt: "Conventional current direction vs electron drift?", answer: "Opposite" },
        { prompt: "Do the metal ions move along the wire when current flows?", answer: "No — they stay fixed and only vibrate" },
      ],
      pyqExampleId: "2be66482-9710-44a7-8ac5-f819d4c7b693", // 2024 — free electrons
      traps: [
        {
          title: "Free electrons, not 'both bound and free'",
          body:
            "Bound electrons stay with their atoms and don't conduct. The carriers are the FREE electrons only. 'Ions' is correct for solutions/gases, not for a solid metal.",
        },
      ],
    },

    // 3 — Ohm's law
    {
      kind: "formula" as const,
      slug: "ohms-law",
      name: "Ohm's law — V = IR",
      intuition:
        "For an ordinary conductor at fixed temperature, push twice as hard (double the voltage) and twice as much current flows. The constant of proportionality is the resistance. On an I–V graph, an ohmic conductor is a straight line through the origin whose slope is 1/R.",
      definition:
        "**Ohm's law**: at constant temperature, the current through a conductor is directly proportional to the potential difference across it, \\(V = IR\\), where \\(R\\) is constant. " +
        "It is an **empirical law**, not a universal one — it holds for metals in a normal range, but NOT for all materials or arbitrarily strong fields. " +
        "On an I–V plot (I vertical, V horizontal) an ohmic conductor is a straight line through the origin with slope \\(1/R\\) — so a **steeper line means a smaller resistance**.",
      formula: {
        label: "Ohm's law",
        latex: "V = I\\,R",
        symbols: [
          { symbol: "V", meaning: "potential difference (volt)" },
          { symbol: "I", meaning: "current (ampere)" },
          { symbol: "R", meaning: "resistance (ohm, Ω)" },
        ],
      },
      authoredExample: {
        prompt:
          "A resistor carries 2 A when 10 V is applied. What current flows when the voltage is raised to 25 V (temperature unchanged)?",
        steps: [
          "Find R first: \\(R = V/I = 10/2 = 5\\,\\Omega\\).",
          "At 25 V: \\(I = V/R = 25/5 = 5\\) A.",
          "(Or directly: current scales with voltage, ×2.5, so 2 A → 5 A.)",
        ],
        answer: "5 A.",
      },
      selfCheckExample: {
        prompt:
          "An electric heater draws 0.5 A at 220 V. What is its resistance, and how much current would it draw at 110 V?",
        steps: [
          "\\(R = V/I = 220/0.5 = 440\\,\\Omega\\).",
          "At 110 V: \\(I = V/R = 110/440 = 0.25\\) A.",
          "Halving the voltage halves the current (ohmic, fixed R).",
        ],
        answer: "R = 440 Ω; current at 110 V is 0.25 A.",
      },
      practiceSet: [
        { prompt: "State Ohm's law as a formula.", answer: "V = IR" },
        { prompt: "An I–V graph that is steeper corresponds to a larger or smaller resistance?", answer: "Smaller", method: "slope = 1/R" },
        { prompt: "12 V across 4 Ω drives what current?", answer: "3 A", method: "I = V/R" },
        { prompt: "Is Ohm's law obeyed by all materials at all field strengths?", answer: "No — it is empirical, true only within a range" },
      ],
      pyqExampleId: "61628097-7a06-4fa6-a7b1-8578e2bd3a79", // 2023 — heater 0.5 A @220 V → 120 V
      traps: [
        {
          title: "Ohm's law is NOT universal",
          body:
            "The false statement the bank tests: 'all homogeneous materials obey Ohm's law irrespective of whether the field is within range or strong.' Wrong — Ohm's law is an empirical approximation that fails for non-ohmic materials and very strong fields.",
        },
      ],
    },

    // 4 — ohmic vs non-ohmic
    {
      kind: "formula" as const,
      slug: "ohmic-vs-nonohmic",
      name: "Ohmic vs non-ohmic conductors",
      intuition:
        "An ohmic device keeps the same resistance whatever the voltage — its I–V graph is a straight line. A non-ohmic device (like a diode or a bulb filament) changes resistance with conditions, so its I–V graph bends.",
      definition:
        "- **Ohmic** — obeys \\(V = IR\\) with constant \\(R\\); I–V graph is a straight line through the origin. Examples: copper wire, nichrome heating coil, rheostat (a variable resistor, but ohmic).\n" +
        "- **Non-ohmic** — \\(R\\) depends on voltage/current/direction; I–V graph is curved or asymmetric. Example: a **semiconductor diode** (conducts one way, blocks the other).",
      visualizationSlug: "iv-characteristic-graph",
      authoredExample: {
        prompt:
          "Of a copper coil, a nichrome heating element, a rheostat, and a semiconductor diode, which one is non-ohmic?",
        steps: [
          "Copper coil — metal, constant R → ohmic.",
          "Nichrome heating element — a metal alloy resistor → ohmic.",
          "Rheostat — a variable resistor, but each setting is ohmic → ohmic.",
          "Semiconductor diode — conducts in one direction only, R depends on polarity → NON-ohmic.",
        ],
        answer: "The semiconductor diode is non-ohmic.",
      },
      selfCheckExample: {
        prompt:
          "Device X has a straight-line I–V graph through the origin; device Y's I–V graph is a curve. Which obeys Ohm's law, and what does that say about each one's resistance?",
        steps: [
          "A straight line through the origin means I ∝ V → constant slope → constant R.",
          "So X is ohmic, with a single fixed resistance.",
          "Y's curve means the slope (hence R) changes with V → non-ohmic.",
        ],
        answer: "X is ohmic (constant R); Y is non-ohmic (R varies with V).",
      },
      practiceSet: [
        { prompt: "What shape is an ohmic conductor's I–V graph?", answer: "A straight line through the origin" },
        { prompt: "Give a common non-ohmic device.", answer: "Semiconductor diode (also a filament bulb)" },
        { prompt: "Is a rheostat ohmic or non-ohmic?", answer: "Ohmic", method: "it's just a variable resistor; each setting obeys V = IR" },
      ],
      pyqExampleId: "b3d5f882-2365-4b20-8671-47507358eaba", // 2018 — non-ohmic = semiconductor diode
      traps: [
        {
          title: "A rheostat is ohmic; a diode is not",
          body:
            "Students wrongly call a rheostat non-ohmic because it 'varies'. It varies the resistance VALUE by sliding a contact, but at any setting it obeys V = IR. The genuine non-ohmic device in the option list is the semiconductor diode.",
        },
      ],
    },

    // 5 — AC vs DC (REFERENCE)
    {
      kind: "reference" as const,
      slug: "ac-vs-dc",
      name: "Alternating current vs direct current",
      intuition:
        "Direct current flows one steady way (a battery). Alternating current reverses direction over and over — Indian mains runs at 50 Hz, so it completes 50 full back-and-forth cycles each second. A full cycle has two direction reversals, so it switches direction every 1/100 of a second.",
      definition:
        "**DC** flows in one direction (battery, cell). **AC** periodically reverses direction (mains supply). Indian mains frequency is **50 Hz** — 50 complete cycles per second. Because each cycle reverses direction twice, the current changes direction every \\(\\tfrac{1}{2\\times50} = \\tfrac{1}{100}\\) second.",
      table: {
        columns: ["Property", "DC", "AC"],
        rows: [
          { cells: ["Direction", "Constant (one way)", "Reverses periodically"] },
          { cells: ["Source", "Cell / battery / DC generator", "AC generator / mains"] },
          {
            cells: ["Indian mains frequency", "—", "**50 Hz** (reverses every 1/100 s)"],
            noteAmber: "NDA 2024 Sep — mains changes direction every 1/100 s, NOT 1/50 s: a 50 Hz cycle reverses TWICE per cycle.",
            pyqExampleId: "5d6d4b92-6ce1-41ac-82f6-16242a40b932",
          },
          { cells: ["Transformable?", "No (transformers need changing flux)", "Yes — step up/down by transformer"] },
        ],
        caption:
          "Frequency f = 50 Hz ⟹ period T = 1/50 s for a full cycle, but a direction reversal happens every half-cycle = 1/100 s.",
      },
      selfCheckExample: {
        prompt:
          "If a country's mains runs at 60 Hz, how often does the current reverse direction?",
        steps: [
          "A reversal happens every half cycle.",
          "Period of one cycle: \\(T = 1/60\\) s.",
          "Half cycle: \\(T/2 = 1/120\\) s.",
        ],
        answer: "Every 1/120 second.",
      },
      practiceSet: [
        { prompt: "Indian mains frequency?", answer: "50 Hz" },
        { prompt: "How often does 50 Hz AC reverse direction?", answer: "Every 1/100 s", method: "half-period of a 50 Hz cycle" },
        { prompt: "Which can a transformer change — AC or DC?", answer: "AC only" },
      ],
      pyqExampleId: "5d6d4b92-6ce1-41ac-82f6-16242a40b932", // 2024 — mains reverses every 1/100 s
      traps: [
        {
          title: "Reverses every 1/100 s, not 1/50 s",
          body:
            "The period of 50 Hz AC is 1/50 s — but that is one FULL cycle, which contains TWO reversals. The current changes direction every half-period = 1/100 s. Picking 1/50 s is the dominant trap.",
        },
      ],
    },
  ],
};
