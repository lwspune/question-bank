import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTRICAL_DEVICES_NOTE: SubtopicNote = {
  subtopicName: "Electrical Devices",
  title: "Electrical Devices and Safety",
  oneLineDefinition:
    "The recall layer of the chapter: which material does what (nichrome heats, tungsten lights), how fuses and earthing keep us safe, how generators, motors and transformers work, and what ammeters, voltmeters and galvanometers measure.",
  whyItMatters:
    "Fifteen PYQs — almost all EASY single-fact recall, the most reliable marks in the chapter. The bank reuses the same facts every year: nichrome heating elements, tungsten filaments, low-melting-point fuses, the red/green/black wiring code, generator-vs-motor, transformers needing AC, and the ammeter-in-series / voltmeter-in-parallel rule. Drill the tables and bank the marks.",
  concepts: [
    // 1 — heating elements & filaments (REFERENCE)
    {
      kind: "reference" as const,
      slug: "heating-elements-and-filaments",
      name: "Heating elements and bulb filaments",
      intuition:
        "Two jobs, two metals. A heater needs a wire that resists current (to get hot) without melting — that's nichrome. A bulb filament needs to glow white-hot without melting at all — that's tungsten, the metal with the highest melting point in common use.",
      definition:
        "Match the device to the material the bank tests:",
      table: {
        columns: ["Device / part", "Material", "Why"],
        rows: [
          {
            cells: [
              "**Heating element** (iron, heater, toaster)",
              "**Nichrome**",
              "High resistivity (heats well) + high melting point + doesn't oxidise",
            ],
            pyqExampleId: "4f0ea196-9b76-4fc7-87bb-a5c08bb1f484",
          },
          {
            cells: [
              "**Incandescent bulb filament**",
              "**Tungsten**",
              "Highest melting point (~3400°C) — glows white-hot without melting",
            ],
            pyqExampleId: "062c80ba-7daa-489a-a057-b85a9bcec23c",
          },
          {
            cells: [
              "**Photoelectric cell**",
              "**Rubidium / caesium**",
              "Alkali metals have a low work function — emit electrons easily under light",
            ],
            noteAmber: "NDA 2018 Apr — photo-cell metal is rubidium (an alkali metal), NOT tungsten or copper.",
            pyqExampleId: "b41a151c-45bf-4d07-8e19-8d9476aa6f7f",
          },
        ],
        caption:
          "Nichrome HEATS, tungsten LIGHTS, alkali metals (rubidium/caesium) EMIT electrons in photocells.",
      },
      selfCheckExample: {
        prompt:
          "Why is tungsten used for a bulb filament but nichrome for a heater element?",
        steps: [
          "A filament must reach white heat without melting → needs the highest possible melting point → tungsten.",
          "A heater must convert electrical energy to heat efficiently and survive repeated heating → high resistivity + high melting point + oxidation resistance → nichrome.",
          "Different requirements pick different metals.",
        ],
        answer: "Tungsten has the highest melting point (for the glowing filament); nichrome combines high resistivity with durability (for heating).",
      },
      practiceSet: [
        { prompt: "Material of an electric-iron heating element?", answer: "Nichrome" },
        { prompt: "Metal used for an incandescent bulb filament?", answer: "Tungsten" },
        { prompt: "Metal used in a photoelectric cell?", answer: "Rubidium (or caesium)" },
      ],
      pyqExampleId: "4f0ea196-9b76-4fc7-87bb-a5c08bb1f484", // 2023 — heating element = nichrome
      traps: [
        {
          title: "Nichrome heats, tungsten lights — don't swap them",
          body:
            "Tungsten's selling point is its melting point (for a glowing filament); nichrome's is high resistivity with durability (for a heater). Swapping the two metals is the standard distractor.",
        },
      ],
    },

    // 2 — fuses, earthing & safety (REFERENCE)
    {
      kind: "reference" as const,
      slug: "fuses-earthing-and-safety",
      name: "Fuses, earthing and household wiring",
      intuition:
        "Safety devices all exploit one idea: a dangerous fault means a big current. A fuse is a thin wire with a LOW melting point placed in series — too much current and it melts, breaking the circuit. The three household wires are colour-coded so the earth wire can safely carry away fault current.",
      definition:
        "Household electrical safety facts the bank tests:",
      table: {
        columns: ["Item", "Key fact"],
        rows: [
          {
            cells: [
              "**Fuse wire**",
              "Conducting, **low melting point**; in SERIES — melts and breaks the circuit on excess current",
            ],
            pyqExampleId: "18530d3c-ef53-4c68-845a-1f989a1464f0",
          },
          {
            cells: [
              "**Short circuit**",
              "Resistance drops near zero ⟹ current **increases substantially** (which is what blows the fuse)",
            ],
            pyqExampleId: "7680ae37-e290-4b02-89d4-abed05f5f7e3",
          },
          {
            cells: [
              "**Three-wire colour code**",
              "**Red = live**, **Green = earth (ground)**, **Black = neutral**",
            ],
            noteAmber: "NDA 2018 Sep — the OLD Indian code: red live, green earth, black neutral (don't confuse with newer brown/green-yellow/blue).",
            pyqExampleId: "866c1a2a-2c63-4750-b181-37eaebe81133",
          },
        ],
        caption:
          "A fault ⟹ large current ⟹ the low-melting-point fuse melts first, protecting the rest of the circuit.",
      },
      selfCheckExample: {
        prompt:
          "Why must a fuse wire have a LOW melting point and be connected in series with the appliance?",
        steps: [
          "In series, the whole circuit current passes through the fuse.",
          "A low melting point means it melts at a modest excess current.",
          "When it melts it breaks the circuit, cutting off the dangerous current before wires overheat.",
        ],
        answer: "So that an over-current melts it quickly and breaks the (series) circuit before damage occurs.",
      },
      practiceSet: [
        { prompt: "A fuse wire must be… (two properties)", answer: "Conducting and of low melting point" },
        { prompt: "During a short circuit, the current…", answer: "Increases substantially" },
        { prompt: "Colour of the live wire in the old Indian code?", answer: "Red (green = earth, black = neutral)" },
      ],
      pyqExampleId: "18530d3c-ef53-4c68-845a-1f989a1464f0", // 2019 — fuse: conducting + low melting point
      traps: [
        {
          title: "Fuse = LOW melting point (and conducting)",
          body:
            "A fuse must conduct normally but melt easily on overload, so it needs a LOW melting point. 'High melting point' and 'insulator' are both wrong — an insulator wouldn't carry the normal current at all.",
        },
      ],
    },

    // 3 — generators & motors (REFERENCE)
    {
      kind: "reference" as const,
      slug: "generators-and-motors",
      name: "Generators, motors and the AC/DC distinction",
      intuition:
        "A generator turns motion into current (electromagnetic induction); a motor does the reverse, turning current into motion. The ONLY hardware difference between an AC and a DC generator is how the coil connects to the outside world: slip rings give AC, a split-ring commutator gives DC.",
      definition:
        "Rotating-machine facts:",
      table: {
        columns: ["Device / question", "Answer"],
        rows: [
          {
            cells: [
              "**Generator / dynamo works on…**",
              "Faraday's law of **electromagnetic induction**",
            ],
            pyqExampleId: "43e489ed-bbdb-462a-bffb-1838de96a1f9",
          },
          {
            cells: [
              "**Device used to produce electric current**",
              "**Generator** (a motor consumes current; a galvanometer detects it)",
            ],
            pyqExampleId: "3f3dac11-1150-4b90-a1f5-93d40a33e417",
          },
          {
            cells: [
              "**Convert an AC generator to DC**",
              "Replace slip rings with a **split-ring commutator**",
            ],
            noteAmber: "NDA 2023 Sep — slip rings ⟹ AC output; a split-ring commutator ⟹ DC output. That ring is the only change.",
            pyqExampleId: "62f7ca38-44db-4a9f-98fc-a196c5b84c6a",
          },
        ],
        caption:
          "Generator = motion → current (induction). Motor = current → motion. Commutator (split-ring) = the AC→DC converter.",
      },
      selfCheckExample: {
        prompt:
          "Ms. Rani has an AC generator and wants DC output. What single component should she change, and to what?",
        steps: [
          "An AC generator's coil connects to the circuit through slip rings, which reverse the output every half turn → AC.",
          "A split-ring commutator flips the connection each half turn, so the external current keeps one direction → DC.",
          "So she swaps the slip rings for a split-ring commutator.",
        ],
        answer: "Replace the slip rings with a split-ring commutator.",
      },
      practiceSet: [
        { prompt: "A generator works on which principle?", answer: "Electromagnetic induction (Faraday's law)" },
        { prompt: "Which device produces electric current?", answer: "Generator" },
        { prompt: "What gives a generator a DC output instead of AC?", answer: "A split-ring commutator" },
      ],
      pyqExampleId: "43e489ed-bbdb-462a-bffb-1838de96a1f9", // 2022 — DC generator = EM induction
      traps: [
        {
          title: "Generator produces current; motor consumes it",
          body:
            "A motor runs ON current (it doesn't produce it); a galvanometer DETECTS current. The device that PRODUCES current is the generator. And the AC↔DC switch is purely the slip-ring vs split-ring choice.",
        },
      ],
    },

    // 4 — transformers (FORMULA)
    {
      kind: "formula" as const,
      slug: "transformers",
      name: "Transformers — changing AC voltage",
      intuition:
        "A transformer trades voltage for current (and vice versa) using two coils linked by a changing magnetic field. More turns on the output coil means higher voltage (step-up); fewer means lower (step-down). Crucially, it only works on AC — a steady DC makes no changing flux, so nothing is induced.",
      definition:
        "A transformer changes an **AC** voltage using the ratio of turns:\n" +
        "**\\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\)** — more secondary turns ⟹ **step-up** (higher voltage); fewer ⟹ **step-down**. " +
        "It transfers power (ideally \\(V_pI_p = V_sI_s\\)), so stepping voltage UP steps current DOWN. **It cannot work on DC** (no changing flux).",
      formula: {
        label: "Transformer turns ratio",
        latex: "\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}",
        symbols: [
          { symbol: "V_p, V_s", meaning: "primary / secondary voltage" },
          { symbol: "N_p, N_s", meaning: "primary / secondary turns" },
        ],
      },
      authoredExample: {
        prompt:
          "A transformer has 100 turns on the primary and 500 on the secondary, with 220 V applied to the primary. Is it step-up or step-down, and what is the secondary voltage?",
        steps: [
          "More secondary turns (500 > 100) ⟹ step-UP.",
          "\\(V_s = V_p \\times N_s/N_p = 220 \\times 500/100\\).",
          "\\(V_s = 220 \\times 5 = 1100\\) V.",
        ],
        answer: "Step-up; secondary voltage = 1100 V.",
      },
      selfCheckExample: {
        prompt:
          "Why can a transformer change the voltage of an AC supply but not of a DC supply?",
        steps: [
          "A transformer works by mutual induction — a CHANGING magnetic flux in the primary induces a voltage in the secondary.",
          "AC continually changes, so the flux changes, and a voltage is induced.",
          "Steady DC gives a constant flux → no change → no induced secondary voltage.",
        ],
        answer: "It needs a changing flux; AC provides it, steady DC does not.",
      },
      practiceSet: [
        { prompt: "A step-up transformer does what to voltage?", answer: "Increases it" },
        { prompt: "Which device changes low AC voltage to high AC voltage and vice versa?", answer: "Transformer" },
        { prompt: "Can a transformer operate on DC?", answer: "No — it needs changing flux (AC)" },
      ],
      pyqExampleId: "6c81b076-b341-48fe-bd43-631ae5c98fe2", // 2017 — step-up increases voltage
      traps: [
        {
          title: "Transformers change VOLTAGE, not power — and need AC",
          body:
            "A step-up transformer raises voltage (and lowers current); it does NOT 'increase electrical power'. And it works only on AC. The distractors 'increases power' and any DC use are wrong.",
        },
      ],
    },

    // 5 — meters, conductors & photocells (REFERENCE)
    {
      kind: "reference" as const,
      slug: "meters-and-conductors",
      name: "Meters, conductors and insulators",
      intuition:
        "Each meter has a job and a placement. An ammeter measures current, so it goes IN the path (series) and must have LOW resistance. A voltmeter measures voltage ACROSS something (parallel) and must have HIGH resistance so it barely draws current. A galvanometer just detects whether current flows.",
      definition:
        "Measuring instruments and conductor facts:",
      table: {
        columns: ["Instrument / term", "Connection", "Key property"],
        rows: [
          {
            cells: ["**Ammeter**", "In **series**", "**Low** resistance (so it doesn't reduce the current)"],
          },
          {
            cells: ["**Voltmeter**", "In **parallel**", "**High** resistance (so it draws almost no current)"],
            noteAmber: "NDA 2025 Apr — the WRONG statement is 'voltmeter low resistance, ammeter high resistance' — it's the reverse.",
            pyqExampleId: "19a6968f-f191-4de3-b2d0-fe44cb03aa6c",
          },
          {
            cells: ["**Galvanometer**", "—", "**Detects** the presence of current in a circuit"],
            pyqExampleId: "062aca8e-1bb2-4e4c-bd38-cdc08296d5bc",
          },
          {
            cells: ["**Insulator**", "—", "Electrons do NOT flow through it easily (few free electrons)"],
            pyqExampleId: "bc508f63-f560-47e2-8df8-2c951c7a2338",
          },
        ],
        caption:
          "Ammeter: series + low R. Voltmeter: parallel + high R. Galvanometer: detects current. Insulator: electrons can't flow easily.",
      },
      selfCheckExample: {
        prompt:
          "Should an ammeter have high or low resistance, and should it be connected in series or parallel? Explain in one line each.",
        steps: [
          "An ammeter measures the circuit current, so it must sit IN the current path → series.",
          "To avoid changing that current, it must add as little resistance as possible → low resistance.",
          "(A voltmeter is the opposite: parallel, high resistance.)",
        ],
        answer: "Low resistance, connected in series.",
      },
      practiceSet: [
        { prompt: "An ammeter is connected in… and has … resistance.", answer: "Series; low" },
        { prompt: "A voltmeter is connected in… and has … resistance.", answer: "Parallel; high" },
        { prompt: "Which instrument detects the presence of current?", answer: "Galvanometer" },
        { prompt: "Why doesn't an insulator conduct?", answer: "Its electrons cannot flow easily (few free electrons)" },
      ],
      pyqExampleId: "19a6968f-f191-4de3-b2d0-fe44cb03aa6c", // 2025 — the false meter statement
      traps: [
        {
          title: "Voltmeter HIGH resistance, ammeter LOW — the common swap",
          body:
            "The false statement to catch: 'a voltmeter has low resistance and an ammeter has high resistance.' It's reversed. Voltmeter = high R (parallel); ammeter = low R (series).",
        },
      ],
    },
  ],
};
