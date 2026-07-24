import type { SubtopicNote } from "@/app/notes/_types";

export const TEMPERATURE_AND_THERMOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Temperature and Thermometry",
  title: "Temperature, Scales, and Thermal Expansion",
  oneLineDefinition:
    "Temperature measures the average kinetic energy of a body's molecules; we read it on the Celsius, Fahrenheit, or Kelvin scales, convert between them with two linear formulas, and watch solids and liquids expand as they get hotter.",
  whyItMatters:
    "Start here — every later movement rests on these basics. " +
    "Scale conversion is the single most-tested skill in the chapter (Celsius to Fahrenheit, Celsius to Kelvin, and the famous 'when do two scales read the same?' problems). " +
    "Absolute zero (0 K = −273.15°C) is a recurring one-mark recall. " +
    "Thermal expansion adds a small numeric strand — the linear / areal / volume coefficients are related by a fixed ratio, and the pendulum-slows-when-heated idea shows up. " +
    "About 8 PYQs, mostly EASY and MODERATE with one HARD scale problem.",
  concepts: [
    // Concept 1 — foundation: what temperature is + the three scales
    {
      kind: "formula" as const,
      slug: "temperature-and-scales",
      name: "Temperature and the three scales",
      intuition:
        "Temperature tells you how hot something is — physically, it is a measure of the AVERAGE kinetic energy of the molecules of a body. It is NOT the same as heat: heat is energy flowing because of a temperature difference, temperature is the reading on the thermometer. " +
        "Three scales are in use: Celsius (water freezes at 0, boils at 100), Fahrenheit (32 and 212), and Kelvin, the SI scale, which starts at absolute zero and has the same step size as Celsius.",
      definition:
        "Temperature is a measure of the **average kinetic energy** of the particles of a substance. The three common scales:\n" +
        "- **Celsius (°C)** — ice point 0°C, steam point 100°C (100 divisions).\n" +
        "- **Fahrenheit (°F)** — ice point 32°F, steam point 212°F (180 divisions).\n" +
        "- **Kelvin (K)** — the SI absolute scale; 0 K is absolute zero. A change of **1 K equals a change of 1°C** (same size step); they differ only by the offset 273.15.\n" +
        "Kelvin is never written with a degree sign — it is '300 K', not '300°K'.",
      formula: {
        label: "Temperature-scale conversions",
        latex:
          "\\frac{C}{5} = \\frac{F - 32}{9} = \\frac{K - 273.15}{5} \\qquad F = \\frac{9}{5}C + 32 \\qquad K = C + 273.15",
        symbols: [
          { symbol: "C", meaning: "temperature in degrees Celsius" },
          { symbol: "F", meaning: "temperature in degrees Fahrenheit" },
          { symbol: "K", meaning: "temperature in kelvin (absolute)" },
        ],
      },
      authoredExample: {
        prompt: "Convert a body temperature of 37°C to the Fahrenheit and Kelvin scales.",
        steps: [
          "Fahrenheit: \\(F = \\frac{9}{5}C + 32 = \\frac{9}{5}(37) + 32\\).",
          "\\(\\frac{9}{5}\\times 37 = 66.6\\), so \\(F = 66.6 + 32 = 98.6°\\text{F}\\) — the familiar normal body temperature.",
          "Kelvin: \\(K = C + 273.15 = 37 + 273.15 = 310.15\\,\\text{K}\\) (often rounded to 310 K).",
        ],
        answer: "98.6°F and about 310 K.",
      },
      selfCheckExample: {
        prompt:
          "A place reads 113°F on a sunny day. What is this temperature on the Kelvin scale?",
        steps: [
          "First convert to Celsius: \\(C = \\frac{5}{9}(F - 32) = \\frac{5}{9}(113 - 32) = \\frac{5}{9}\\times 81 = 45°\\text{C}\\).",
          "Then convert to Kelvin: \\(K = C + 273 = 45 + 273 = 318\\,\\text{K}\\).",
        ],
        answer: "318 K.",
      },
      practiceSet: [
        { prompt: "Convert 100°C to Fahrenheit.", answer: "212°F", method: "\\(\\frac{9}{5}(100)+32\\)" },
        { prompt: "Convert 27°C to Kelvin.", answer: "300 K", method: "\\(27+273\\)" },
        { prompt: "A body warms from 310 K to 340 K. By how many °C did it rise?", answer: "30°C", method: "1 K step = 1°C step, so the rise is the same number" },
        { prompt: "In '°F = X + 1.8 × °C', what is X?", answer: "32", method: "1.8 = 9/5, and the offset is +32" },
      ],
      pyqExampleId: "d3d1e78e-1bed-4dd0-a853-bd2bb501d100", // 2019 — 113°F to Kelvin
      traps: [
        {
          title: "A temperature CHANGE is the same in K and °C, but a temperature VALUE is not",
          body:
            "If the question asks 'increase of 30 K equals how many °C?', the answer is 30°C — because the step size is identical. " +
            "But '300 K equals how many °C?' is \\(300 - 273 = 27°\\text{C}\\), because of the offset. Read whether it asks for a value or a change.",
        },
        {
          title: "Never write a degree sign with Kelvin",
          body:
            "It is '273 K' and '0 K', not '273°K'. The kelvin already IS an absolute scale, so the degree symbol is dropped by convention. An option that writes '°K' is usually the planted wrong one.",
        },
      ],
    },

    // Concept 2 — absolute zero + thermometers
    {
      kind: "formula" as const,
      slug: "absolute-zero-and-thermometers",
      name: "Absolute zero and choosing a thermometer",
      intuition:
        "There is a lowest possible temperature — absolute zero — where molecular motion is at its theoretical minimum. It sits at 0 K, which is −273.15°C. No temperature can ever be lower. " +
        "Different thermometers suit different ranges: a mercury thermometer works for everyday temperatures, but for very low temperatures (around −250°C) you need a thermocouple- or gas-based thermometer, because mercury freezes.",
      definition:
        "**Absolute zero** is the lowest possible temperature: **0 K = −273.15°C** (often quoted as −273°C). At this point the thermal kinetic energy of particles is at its minimum.\n" +
        "Thermometer choice by range:\n" +
        "- **Liquid-in-glass (mercury / alcohol)** — ordinary lab and clinical use.\n" +
        "- **Thermocouple thermometer** — wide range including very low (around −250°C) and very high temperatures; based on the voltage produced at a junction of two metals.\n" +
        "- **Constant-volume gas thermometer** — the most accurate standard, used to define the Kelvin scale.",
      authoredExample: {
        prompt: "Express absolute zero on the Celsius and Fahrenheit scales.",
        steps: [
          "Absolute zero is 0 K by definition.",
          "Celsius: \\(C = K - 273.15 = 0 - 273.15 = -273.15°\\text{C}\\).",
          "Fahrenheit: \\(F = \\frac{9}{5}C + 32 = \\frac{9}{5}(-273.15) + 32 = -459.67°\\text{F}\\).",
        ],
        answer: "−273.15°C and about −459.67°F.",
      },
      selfCheckExample: {
        prompt:
          "You need to measure a temperature of about −250°C in a cryogenics lab. Why can't you use an ordinary mercury thermometer, and what would you use instead?",
        steps: [
          "Mercury freezes at about −39°C, so it is solid long before −250°C — it cannot register the reading.",
          "A thermocouple-based thermometer measures the small voltage at a junction of two dissimilar metals and works over a very wide range, including these cryogenic temperatures.",
        ],
        answer: "Mercury freezes; use a thermocouple-based thermometer.",
      },
      practiceSet: [
        { prompt: "What is the lowest possible temperature in °C?", answer: "−273°C (absolute zero)" },
        { prompt: "What is absolute zero in kelvin?", answer: "0 K" },
        { prompt: "Which thermometer suits about −250°C?", answer: "Thermocouple-based thermometer", method: "mercury would freeze" },
        { prompt: "Which thermometer type defines the most accurate standard scale?", answer: "Constant-volume gas thermometer" },
      ],
      pyqExampleId: "2dddef7a-eecd-46f8-91b6-394f5d83521e", // 2025 — thermocouple for -250 C
      traps: [
        {
          title: "Absolute zero is −273°C, not −273 K",
          body:
            "Absolute zero is 0 K, equivalently −273.15°C. A distractor that says 'absolute zero is −273 K' confuses the two scales — −273 K is meaningless because the Kelvin scale cannot go below 0.",
        },
      ],
    },

    // Concept 3 — same-reading scale problems (HARD)
    {
      kind: "formula" as const,
      slug: "same-reading-scale-problems",
      name: "When do two scales read the same?",
      intuition:
        "A favourite NDA trick: 'at what temperature do the Celsius and Fahrenheit scales show the same number?' or even 'where do Kelvin and Fahrenheit agree?'. " +
        "The method is always the same — set the two scale variables equal, substitute one conversion into the other, and solve the resulting linear equation.",
      definition:
        "To find where two scales read the **same numerical value**, set their variables equal and solve:\n" +
        "- **C = F**: put \\(F = C\\) into \\(F = \\frac{9}{5}C + 32\\) and solve. Answer: **−40°** (the one temperature where Celsius and Fahrenheit coincide).\n" +
        "- **K = F**: put \\(K = F\\) into \\(K = C + 273\\) and \\(F = \\frac{9}{5}C + 32\\), then eliminate C.\n" +
        "The trick is purely algebraic: two linear relations, one unknown.",
      authoredExample: {
        prompt: "At what temperature do the Celsius and Fahrenheit thermometers show the same reading?",
        steps: [
          "Set \\(F = C\\) (same numerical value).",
          "Substitute into \\(F = \\frac{9}{5}C + 32\\): \\(C = \\frac{9}{5}C + 32\\).",
          "Move terms: \\(C - \\frac{9}{5}C = 32 \\Rightarrow -\\frac{4}{5}C = 32\\).",
          "So \\(C = 32 \\times \\left(-\\frac{5}{4}\\right) = -40\\).",
        ],
        answer: "−40° (i.e. −40°C = −40°F).",
      },
      selfCheckExample: {
        prompt:
          "A Kelvin thermometer and a Fahrenheit thermometer give the same numerical reading for one sample. What is the corresponding Celsius reading?",
        steps: [
          "Set \\(K = F\\). Use \\(K = C + 273\\) and \\(F = \\frac{9}{5}C + 32\\).",
          "So \\(C + 273 = \\frac{9}{5}C + 32\\).",
          "Rearrange: \\(273 - 32 = \\frac{9}{5}C - C \\Rightarrow 241 = \\frac{4}{5}C\\).",
          "Hence \\(C = 241 \\times \\frac{5}{4} = 301.25 \\approx 301\\).",
        ],
        answer: "About 301°C.",
      },
      practiceSet: [
        { prompt: "At what Celsius temperature does the Fahrenheit scale read the same number?", answer: "−40°", method: "set \\(C=F\\) in \\(F=\\tfrac{9}{5}C+32\\)" },
        { prompt: "Set up the equation for 'K equals F'.", answer: "\\(C+273=\\tfrac{9}{5}C+32\\)", method: "substitute both conversions, eliminate C" },
        { prompt: "If C = F, what is that single common reading?", answer: "−40 (both scales)" },
      ],
      pyqExampleId: "4b587f73-1558-45ab-aa55-7776cc0a6aba", // 2017 HARD — K = F gives C = 301
      traps: [
        {
          title: "Set the SCALE VARIABLES equal, not the formula sides",
          body:
            "The condition 'two scales read the same number' means \\(F = C\\) (or \\(K = F\\)) — set those equal, THEN use a conversion to get one equation in one unknown. Do not just equate \\(\\frac{9}{5}C+32\\) to something; first decide which two readings coincide.",
        },
      ],
    },

    // Concept 4 — thermal expansion (coefficients)
    {
      kind: "formula" as const,
      slug: "thermal-expansion-coefficients",
      name: "Thermal expansion — linear, areal, and volume coefficients",
      intuition:
        "Heat a solid and it grows in every dimension. A rod gets longer (linear expansion), a sheet grows in area (areal), and a block grows in volume (volume expansion). " +
        "The three coefficients are not independent — they are locked in a fixed ratio because area is length-squared and volume is length-cubed.",
      definition:
        "For a solid heated through \\(\\Delta\\theta\\):\n" +
        "- **Linear:** \\(\\Delta L = L\\alpha\\,\\Delta\\theta\\) — \\(\\alpha\\) is the coefficient of linear expansion.\n" +
        "- **Areal (superficial):** \\(\\Delta A = A\\beta\\,\\Delta\\theta\\) — \\(\\beta\\) is the coefficient of areal expansion.\n" +
        "- **Volume (cubical):** \\(\\Delta V = V\\gamma\\,\\Delta\\theta\\) — \\(\\gamma\\) is the coefficient of volume expansion.\n" +
        "They are related by the fixed ratio \\(\\alpha : \\beta : \\gamma = 1 : 2 : 3\\), so \\(\\beta = 2\\alpha\\) and \\(\\gamma = 3\\alpha = \\tfrac{3}{2}\\beta\\).\n" +
        "**Anomalous expansion of water:** water is the famous exception — between 0°C and 4°C it CONTRACTS on heating, reaching **maximum density at 4°C**. Above 4°C it expands normally. This is why ice floats and ponds freeze from the top down (the diagram below shows the density peak).",
      visualizationSlug: "ht-anomalous-water-expansion",
      formula: {
        label: "Expansion coefficients are in the ratio 1 : 2 : 3",
        latex:
          "\\Delta L = L\\alpha\\,\\Delta\\theta \\qquad \\beta = 2\\alpha \\qquad \\gamma = 3\\alpha = \\tfrac{3}{2}\\beta",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "linear expansion coefficient" },
          { symbol: "\\(\\beta\\)", meaning: "areal (superficial) expansion coefficient" },
          { symbol: "\\(\\gamma\\)", meaning: "volume (cubical) expansion coefficient" },
          { symbol: "\\(\\Delta\\theta\\)", meaning: "rise in temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "The coefficient of areal expansion of a material is \\(1.6\\times 10^{-5}\\,\\text{K}^{-1}\\). Find its coefficient of volume expansion.",
        steps: [
          "Volume relates to areal by \\(\\gamma = \\frac{3}{2}\\beta\\) (since \\(\\gamma = 3\\alpha\\) and \\(\\beta = 2\\alpha\\)).",
          "So \\(\\gamma = \\frac{3}{2}\\times 1.6\\times 10^{-5}\\).",
          "\\(\\gamma = 2.4\\times 10^{-5}\\,\\text{K}^{-1}\\).",
        ],
        answer: "\\(2.4\\times 10^{-5}\\,\\text{K}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A metal rod has linear expansion coefficient \\(\\alpha = 2\\times 10^{-5}\\,\\text{K}^{-1}\\). What are its areal and volume expansion coefficients?",
        steps: [
          "Areal: \\(\\beta = 2\\alpha = 2\\times 2\\times 10^{-5} = 4\\times 10^{-5}\\,\\text{K}^{-1}\\).",
          "Volume: \\(\\gamma = 3\\alpha = 3\\times 2\\times 10^{-5} = 6\\times 10^{-5}\\,\\text{K}^{-1}\\).",
        ],
        answer: "\\(\\beta = 4\\times 10^{-5}\\,\\text{K}^{-1}\\), \\(\\gamma = 6\\times 10^{-5}\\,\\text{K}^{-1}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\alpha = 1.7\\times 10^{-5}\\), what is \\(\\gamma\\)?", answer: "\\(5.1\\times 10^{-5}\\)", method: "\\(\\gamma = 3\\alpha\\)" },
        { prompt: "What is the ratio \\(\\alpha:\\beta:\\gamma\\)?", answer: "1 : 2 : 3" },
        { prompt: "A 2 m rod with \\(\\alpha = 10^{-5}\\,\\text{K}^{-1}\\) is heated 50 K. Find \\(\\Delta L\\).", answer: "1 mm", method: "\\(\\Delta L = L\\alpha\\Delta\\theta = 2\\times 10^{-5}\\times 50 = 10^{-3}\\,\\text{m}\\)" },
      ],
      pyqExampleId: "437a4ace-43c9-48bb-9c70-ac17c6d12a39", // 2018 MOD — areal to volume coeff
      traps: [
        {
          title: "Areal to volume is ×3/2, not ×3",
          body:
            "Going linear to volume multiplies by 3. But going AREAL to volume multiplies by only \\(\\frac{3}{2}\\), because areal is already \\(2\\alpha\\). Decide which coefficient you were given before scaling.",
        },
      ],
    },

    // Concept 5 — expansion consequences (pendulum, liquid apparent expansion)
    {
      kind: "formula" as const,
      slug: "expansion-consequences",
      name: "Consequences of expansion — pendulums and liquid measurement",
      intuition:
        "Thermal expansion shows up in two classic NDA scenarios. A pendulum clock runs SLOW in summer because its rod lengthens, increasing the time period. And measuring a liquid's expansion is tricky because the container expands too — so you only ever see the APPARENT expansion unless you correct for the vessel.",
      definition:
        "- **Pendulum clock:** the period is \\(T = 2\\pi\\sqrt{L/g}\\). When the rod is heated, \\(L\\) grows, so \\(T\\) increases — the clock loses time (runs slow) in hot weather. The fractional change is small: \\(\\frac{\\Delta T}{T} = \\tfrac{1}{2}\\alpha\\,\\Delta\\theta\\).\n" +
        "- **Liquid expansion:** a liquid is held in a container that ALSO expands. The observed rise gives only the **apparent expansion**; the **real (absolute) expansion** = apparent expansion + expansion of the container. This is why a liquid's coefficient is harder to measure than a solid's.",
      formula: {
        label: "Pendulum period and apparent expansion",
        latex:
          "T = 2\\pi\\sqrt{\\frac{L}{g}} \\qquad \\frac{\\Delta T}{T} = \\frac{1}{2}\\alpha\\,\\Delta\\theta \\qquad \\gamma_{\\text{real}} = \\gamma_{\\text{apparent}} + \\gamma_{\\text{vessel}}",
        symbols: [
          { symbol: "T", meaning: "time period of the pendulum" },
          { symbol: "L", meaning: "length of the pendulum rod" },
          { symbol: "\\(\\gamma_{\\text{real}}\\)", meaning: "true volume expansion of the liquid" },
          { symbol: "\\(\\gamma_{\\text{apparent}}\\)", meaning: "observed expansion (uncorrected)" },
        ],
      },
      authoredExample: {
        prompt:
          "A pendulum clock made with a copper rod is moved into a hotter room (temperature up by 30°C). What happens to its time period?",
        steps: [
          "The rod expands: \\(L\\) increases by \\(\\Delta L = L\\alpha\\,\\Delta\\theta\\).",
          "The period \\(T = 2\\pi\\sqrt{L/g}\\) grows with \\(\\sqrt{L}\\), so a longer rod gives a longer period.",
          "The fractional rise \\(\\frac{\\Delta T}{T} = \\frac{1}{2}\\alpha\\,\\Delta\\theta\\) is tiny (copper \\(\\alpha \\approx 17\\times 10^{-6}\\,\\text{K}^{-1}\\)), so the increase is slight.",
        ],
        answer: "The time period increases slightly (the clock runs slow).",
      },
      selfCheckExample: {
        prompt:
          "Why is it harder to measure the coefficient of expansion of a liquid than of a solid?",
        steps: [
          "A liquid must sit in a container, and the container itself expands when heated.",
          "So the rise you observe (apparent expansion) is less than the liquid's true expansion — part of the liquid's growth is 'absorbed' by the larger vessel.",
          "You must add back the vessel's expansion to recover the real coefficient, which is an extra correction a solid never needs.",
        ],
        answer: "Because the container also expands when heated, so you only see the apparent expansion.",
      },
      practiceSet: [
        { prompt: "Does a pendulum clock run fast or slow when heated?", answer: "Slow", method: "longer rod → larger period" },
        { prompt: "Real expansion of a liquid = apparent expansion + ?", answer: "Expansion of the container" },
        { prompt: "Fractional change in pendulum period for a rise \\(\\Delta\\theta\\)?", answer: "\\(\\tfrac{1}{2}\\alpha\\,\\Delta\\theta\\)" },
      ],
      pyqExampleId: "71072630-c67a-471e-b361-75b1a2cb71ce", // 2017 MOD — pendulum heated
      traps: [
        {
          title: "Heated pendulum slows DOWN — the period goes UP",
          body:
            "Students sometimes say 'faster' assuming heat speeds things up. Physically the rod lengthens, the period \\(T = 2\\pi\\sqrt{L/g}\\) rises, so the clock ticks slower and LOSES time. The effect is slight, not 'more than double'.",
        },
      ],
    },
  ],
};
