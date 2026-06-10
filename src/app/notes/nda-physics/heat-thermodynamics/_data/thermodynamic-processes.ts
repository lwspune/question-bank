import type { SubtopicNote } from "@/app/notes/_types";

export const THERMODYNAMIC_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamic Processes",
  title: "Gas Laws and the Laws of Thermodynamics",
  oneLineDefinition:
    "An ideal gas obeys PV = nRT; the first law (ΔU = Q − W) tracks energy bookkeeping, and named processes — isothermal, adiabatic, isochoric, isobaric — each fix one variable and decide which heat capacity applies.",
  whyItMatters:
    "About 4 PYQs but punching above its weight in difficulty — recent HARD problems use a custom process (P = kT, PV² = constant) and ask you to identify its nature using the ideal gas law. " +
    "The recall layer is the named processes (adiabatic = no heat exchange) and the laws (second law = heat won't flow uphill on its own). " +
    "The HARD layer is combining the ideal gas law PV = nRT with the given process equation to deduce what stays constant.",
  concepts: [
    // Concept 1 — foundation: ideal gas law
    {
      kind: "formula" as const,
      slug: "ideal-gas-law",
      name: "The ideal gas law",
      intuition:
        "An ideal gas links three quantities — pressure, volume, and absolute temperature — in one equation, \\(PV = nRT\\). Fix any of them and the other two trade off: heat a gas at constant volume and its pressure rises; squeeze it at constant temperature and its pressure climbs. At constant temperature and volume, pressure tracks the NUMBER of molecules.",
      definition:
        "For \\(n\\) moles of an ideal gas: \\(PV = nRT\\), with \\(T\\) the **absolute (Kelvin)** temperature. Special cases (combined gas law):\n" +
        "- Constant \\(T\\) (**Boyle's law**): \\(PV = \\text{const}\\).\n" +
        "- Constant \\(P\\) (**Charles's law**): \\(V \\propto T\\).\n" +
        "- Constant \\(V\\) (**Gay-Lussac's law**): \\(P \\propto T\\).\n" +
        "- Constant \\(T\\) and \\(V\\): \\(P \\propto n\\) — pressure scales with the number of molecules.",
      formula: {
        label: "Ideal gas law and the combined gas law",
        latex: "PV = nRT \\qquad \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
        symbols: [
          { symbol: "P", meaning: "pressure" },
          { symbol: "V", meaning: "volume" },
          { symbol: "n", meaning: "number of moles (or molecules)" },
          { symbol: "R", meaning: "universal gas constant" },
          { symbol: "T", meaning: "absolute temperature (K)" },
        ],
      },
      authoredExample: {
        prompt:
          "A rigid chamber holds n argon atoms at temperature T and pressure P. The argon is replaced by n/2 carbon-dioxide molecules at the same temperature T. What is the new pressure P′?",
        steps: [
          "The chamber is rigid (constant V) and the temperature is unchanged (constant T).",
          "From \\(PV = nRT\\), at fixed V and T, \\(P \\propto n\\) — pressure depends only on the number of molecules.",
          "The number of molecules is halved (n → n/2), so the pressure halves.",
          "\\(P' = P/2\\).",
        ],
        answer: "P′ = P/2.",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas at 300 K and pressure P is heated at constant volume to 600 K. What is the new pressure?",
        steps: [
          "Constant volume → Gay-Lussac's law → \\(P \\propto T\\) (T in kelvin).",
          "Temperature doubles (300 K → 600 K), so the pressure doubles.",
        ],
        answer: "2P.",
      },
      practiceSet: [
        { prompt: "State the ideal gas law.", answer: "\\(PV = nRT\\)" },
        { prompt: "At constant T and V, pressure is proportional to?", answer: "Number of molecules (n)" },
        { prompt: "At constant T, PV = ? (Boyle's law)", answer: "Constant" },
        { prompt: "Must T be in °C or K in PV = nRT?", answer: "Kelvin (absolute)" },
      ],
      pyqExampleId: "89d607bd-7979-4038-9d23-fb3294b2d76a", // 2018 MOD — P ∝ n, P' = P/2
      traps: [
        {
          title: "Temperature in the gas law is ALWAYS in kelvin",
          body:
            "Using Celsius in \\(PV = nRT\\) or in \\(P \\propto T\\) gives wrong ratios. Convert to kelvin first. 'Pressure doubles when temperature doubles' is only true on the absolute scale.",
        },
      ],
    },

    // Concept 2 — first law of thermodynamics
    {
      kind: "formula" as const,
      slug: "first-law-thermodynamics",
      name: "First law of thermodynamics",
      intuition:
        "The first law is energy conservation for a gas. Heat you put IN either raises the gas's internal energy or gets spent doing work as the gas expands. Nothing is lost: \\(\\Delta U = Q - W\\). If no work is done, all the heat shows up as internal energy.",
      definition:
        "**First law:** \\(\\Delta U = Q - W\\). The heat \\(Q\\) supplied to a system equals the increase in its internal energy \\(\\Delta U\\) plus the work \\(W\\) done BY the system.\n" +
        "- If **\\(W = 0\\)** (rigid container): \\(\\Delta U = Q\\) — all heat goes to internal energy.\n" +
        "- Internal energy of an ideal gas depends **only on temperature**, so \\(\\Delta U = 0\\) for any isothermal process.\n" +
        "(Sign convention: \\(Q\\) positive when heat enters, \\(W\\) positive when the gas does work by expanding.)",
      formula: {
        label: "First law of thermodynamics",
        latex: "\\Delta U = Q - W",
        symbols: [
          { symbol: "\\Delta U", meaning: "change in internal energy" },
          { symbol: "Q", meaning: "heat supplied to the system" },
          { symbol: "W", meaning: "work done BY the system" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas is held in a rigid container so that no work is done on or by it. How does the change in internal energy relate to the heat exchanged?",
        steps: [
          "Rigid container → the gas cannot expand or be compressed → \\(W = 0\\).",
          "First law: \\(\\Delta U = Q - W = Q - 0\\).",
          "So the change in internal energy equals the heat flowing in or out.",
        ],
        answer: "The change in internal energy equals the heat exchanged (ΔU = Q).",
      },
      selfCheckExample: {
        prompt:
          "A gas absorbs 200 J of heat and does 80 J of work in expanding. What is the change in its internal energy?",
        steps: [
          "Apply \\(\\Delta U = Q - W\\).",
          "\\(Q = +200\\,\\text{J}\\) (heat absorbed), \\(W = +80\\,\\text{J}\\) (work done by the gas in expanding).",
          "\\(\\Delta U = 200 - 80 = 120\\,\\text{J}\\).",
        ],
        answer: "ΔU = +120 J.",
      },
      practiceSet: [
        { prompt: "State the first law of thermodynamics.", answer: "\\(\\Delta U = Q - W\\)" },
        { prompt: "If no work is done, ΔU equals what?", answer: "The heat exchanged, Q" },
        { prompt: "For an isothermal process on an ideal gas, ΔU = ?", answer: "0", method: "internal energy depends only on temperature" },
        { prompt: "Gas absorbs 50 J and does 50 J of work. Find ΔU.", answer: "0 J" },
      ],
      pyqExampleId: "b5bcd770-f4bd-4670-a4fe-aefd7e58eefd", // 2019 MOD — W = 0 → ΔU = Q
      traps: [
        {
          title: "Internal energy of an ideal gas depends only on temperature",
          body:
            "In an ISOTHERMAL process (constant T) the internal energy does not change at all (\\(\\Delta U = 0\\)), so any heat absorbed is entirely converted to work. Don't assume absorbing heat always raises internal energy.",
        },
      ],
    },

    // Concept 3 — named processes + heat capacities (HARD identification)
    {
      kind: "formula" as const,
      slug: "named-processes",
      name: "Named processes — isothermal, adiabatic, isochoric, isobaric",
      intuition:
        "Each named process fixes ONE thing. Isothermal holds temperature constant; adiabatic exchanges no heat; isochoric (isovolumetric) holds volume constant; isobaric holds pressure constant. For an unfamiliar process given as an equation, the trick is to combine it with \\(PV = nRT\\) and see which variable ends up constant.",
      definition:
        "Four standard processes:\n" +
        "- **Isothermal** — constant temperature (\\(\\Delta U = 0\\)); \\(PV = \\text{const}\\).\n" +
        "- **Adiabatic** — no heat exchange with surroundings (\\(Q = 0\\)); a perfectly insulated system.\n" +
        "- **Isochoric (isovolumetric)** — constant volume (\\(W = 0\\)); molar heat capacity \\(= C_V\\).\n" +
        "- **Isobaric** — constant pressure; molar heat capacity \\(= C_P\\) (and \\(C_P > C_V\\)).\n" +
        "For a process given as an unusual equation, substitute \\(PV = nRT\\) to find what is held fixed and hence which heat capacity / relation applies. The P–V diagram below shows how the four processes look as curves from a common start.",
      visualizationSlug: "ht-pv-process-diagram",
      formula: {
        label: "Identify a process by substituting PV = nRT",
        latex: "P = kT \\;\\Rightarrow\\; V = \\frac{nR}{k} = \\text{const} \\;\\Rightarrow\\; \\text{isochoric},\\; C = C_V",
        symbols: [
          { symbol: "k", meaning: "the constant in the given process equation" },
          { symbol: "C_V", meaning: "molar heat capacity at constant volume" },
          { symbol: "C_P", meaning: "molar heat capacity at constant pressure" },
        ],
      },
      authoredExample: {
        prompt:
          "For one mole of an ideal gas a process obeys P = kT (k constant). What is its molar heat capacity C for this process?",
        steps: [
          "Use the ideal gas law for one mole: \\(PV = RT\\).",
          "Substitute the process condition \\(P = kT\\): \\((kT)V = RT\\), so \\(V = R/k\\).",
          "\\(R/k\\) is a constant, so the volume is fixed — this is an isochoric (constant-volume) process.",
          "At constant volume the molar heat capacity is \\(C_V\\). Hence \\(C = C_V\\).",
        ],
        answer: "C = C_V (the process is isochoric).",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas undergoes a process with \\(PV^2 = \\text{constant}\\). If the initial state is \\((T_1, V_1)\\) and final \\((T_2, V_2)\\), find the relation between the temperatures and volumes.",
        steps: [
          "From \\(PV^2 = k\\) and \\(PV = nRT\\), divide: \\(\\frac{PV^2}{PV} = \\frac{k}{nRT}\\), giving \\(V = \\frac{k}{nRT}\\), i.e. \\(TV = \\text{const}\\).",
          "So \\(T_1 V_1 = T_2 V_2\\).",
          "Rearrange: \\(\\frac{T_1}{T_2} = \\frac{V_2}{V_1}\\).",
        ],
        answer: "\\(\\frac{T_1}{T_2} = \\frac{V_2}{V_1}\\) (since TV is constant).",
      },
      practiceSet: [
        { prompt: "Which process exchanges no heat with the surroundings?", answer: "Adiabatic", method: "Q = 0" },
        { prompt: "Which process holds volume constant, so W = 0?", answer: "Isochoric (isovolumetric)" },
        { prompt: "Molar heat capacity at constant pressure is denoted?", answer: "\\(C_P\\)" },
        { prompt: "In an isothermal process, ΔU = ?", answer: "0" },
      ],
      pyqExampleId: "55923af6-56f1-42f5-af25-b7f4c28dd58f", // 2026 HARD — P = kT is isochoric, C = C_V
      traps: [
        {
          title: "Don't guess the process — substitute PV = nRT",
          body:
            "A process given as \\(P = kT\\) or \\(PV^2 = \\text{const}\\) is not one of the four standard names on sight. Substitute the ideal gas law to see which variable is actually constant, then read off the heat capacity or T-V relation.",
        },
        {
          title: "Adiabatic means no HEAT exchange, not no temperature change",
          body:
            "An adiabatic process has \\(Q = 0\\) but the temperature usually DOES change (an adiabatic compression heats a gas). 'No heat exchange' is the definition; 'constant temperature' is isothermal — a different process.",
        },
      ],
    },

    // Concept 4 — second law + heat-flow direction (REFERENCE)
    {
      kind: "reference" as const,
      slug: "second-law-and-process-summary",
      name: "The second law and a process summary table",
      intuition:
        "The first law says energy is conserved, but it does not say which way heat flows. The SECOND law fixes the direction: heat will not flow on its own from a colder body to a hotter one — you need work (a refrigerator) to push it uphill. This table also collects the four named processes as a one-glance recall.",
      definition:
        "**Second law of thermodynamics:** heat cannot flow by itself from a body at lower temperature to one at higher temperature; some external work is always needed to do so (the basis of refrigerators and heat engines). The table below summarises the named processes for quick recall.",
      table: {
        columns: ["Process / law", "What is held / stated", "Key consequence"],
        rows: [
          {
            cells: [
              "**Isothermal**",
              "Temperature constant",
              "\\(\\Delta U = 0\\); \\(PV = \\text{const}\\); all heat becomes work",
            ],
          },
          {
            cells: [
              "**Adiabatic**",
              "No heat exchanged (Q = 0)",
              "Insulated; temperature still changes (compression heats the gas)",
            ],
          },
          {
            cells: [
              "**Isochoric**",
              "Volume constant (W = 0)",
              "\\(\\Delta U = Q\\); molar heat capacity \\(C_V\\); \\(P \\propto T\\)",
            ],
          },
          {
            cells: [
              "**Isobaric**",
              "Pressure constant",
              "Molar heat capacity \\(C_P\\) (and \\(C_P > C_V\\)); \\(V \\propto T\\)",
            ],
          },
          {
            cells: [
              "**Second law**",
              "Heat won't flow cold → hot unaided",
              "External work needed to move heat uphill (refrigerator); sets the direction of natural processes",
            ],
            noteAmber:
              "NDA 2017 — 'heat cannot flow by itself from a lower to a higher temperature' is the SECOND law of thermodynamics.",
          },
        ],
        caption:
          "The first law is energy bookkeeping (ΔU = Q − W); the second law sets the one-way direction of heat flow.",
      },
      selfCheckExample: {
        prompt:
          "The statement 'heat cannot flow by itself from a body at lower temperature to a body at higher temperature' is which law of thermodynamics?",
        steps: [
          "The first law is energy conservation (ΔU = Q − W) — it says nothing about direction.",
          "The statement is about the DIRECTION of spontaneous heat flow — heat naturally goes hot → cold.",
          "Restricting the direction of natural heat flow is exactly the second law.",
        ],
        answer: "The second law of thermodynamics.",
      },
      practiceSet: [
        { prompt: "A system that exchanges NO heat with its surroundings is called?", answer: "Adiabatic system" },
        { prompt: "Which law says heat won't flow cold-to-hot on its own?", answer: "Second law of thermodynamics" },
        { prompt: "Which process has molar heat capacity C_V?", answer: "Isochoric (constant volume)" },
        { prompt: "Which is larger, C_P or C_V?", answer: "C_P" },
        { prompt: "Which law is energy conservation, ΔU = Q − W?", answer: "First law of thermodynamics" },
      ],
      pyqExampleId: "254a17c4-3747-44f6-a8ca-3de289d3ca4a", // 2017 EASY — second law statement
      traps: [
        {
          title: "First law = energy; second law = direction",
          body:
            "The first law (ΔU = Q − W) is conservation of energy and is direction-blind. The second law adds the arrow: heat flows hot → cold spontaneously, never the reverse without work. Statements about 'cannot flow by itself' point to the SECOND law.",
        },
      ],
    },
  ],
};
