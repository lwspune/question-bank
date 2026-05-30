import type { SubtopicNote } from "@/app/notes/_types";

export const WAVE_PROPERTIES_NOTE: SubtopicNote = {
  // DB subtopic name — must match the live taxonomy exactly.
  subtopicName: "Wave Properties (Frequency, Wavelength, Speed)",
  title: "Frequency, Wavelength, Speed — and Frequency Bands",
  oneLineDefinition:
    "The wave equation v = fλ relates the three quantities that describe any sound — and a small set of named bands and scales (audible, ultrasonic, Mach, decibel) carries most of this subtopic's recall load.",
  whyItMatters:
    "11 PYQs across 2017–2026, mostly EASY plus 4 MODERATE. " +
    "Three concepts cover everything: (1) the wave equation v = fλ and what frequency / period / Hz actually mean, " +
    "(2) the standout result that speed is a property of the MEDIUM (it does not depend on the wave's own frequency, and at constant temperature it does not depend on pressure either), " +
    "(3) a flat reference of the bands and scales NDA recycles — audible 20 Hz to 20 kHz, ultrasonic above 20 kHz, Mach number, typical sound speeds in air/water/steel, plus the Richter scale that shows up here as a related GK item.",
  concepts: [
    // Concept 1 — wave equation + units
    {
      kind: "formula" as const,
      slug: "wave-equation-and-units",
      name: "Frequency, period, wavelength — and v = fλ",
      intuition:
        "Frequency f is how many complete oscillations happen per second. Wavelength \\(\\lambda\\) is how much distance one full oscillation occupies. " +
        "Speed v is just \"how much wave passes you each second\" — so it must equal frequency multiplied by wavelength. " +
        "This single relation \\(v = f\\lambda\\) ties every sound problem together: give any two, the third is fixed.",
      definition:
        "**Frequency** \\(f\\): number of complete cycles per unit time. Unit: **hertz (Hz) = 1 cycle / second = 1 s⁻¹**. " +
        "Equivalent units: s⁻¹, min⁻¹, kHz, MHz. Not a unit of frequency: **decibel (dB)** — dB measures intensity LEVEL, not frequency.\n" +
        "**Period** \\(T = 1/f\\): time for one complete cycle.\n" +
        "**Wavelength** \\(\\lambda\\): spatial distance over which the wave repeats (compression-to-next-compression, in metres).\n" +
        "**Wave equation:** \\(v = f\\lambda\\) — for ANY periodic wave, in any medium.",
      formula: {
        label: "Wave equation",
        latex: "v = f\\lambda",
        symbols: [
          { symbol: "v", meaning: "wave speed (m/s)" },
          { symbol: "f", meaning: "frequency (Hz)" },
          { symbol: "\\lambda", meaning: "wavelength (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "A sound wave has frequency 1 kHz and wavelength 50 cm. Find its speed and the time it takes to travel 1 km.",
        steps: [
          "Convert units: \\(f = 1000\\) Hz, \\(\\lambda = 0.5\\) m, distance \\(d = 1000\\) m.",
          "Apply the wave equation: \\(v = f\\lambda = 1000 \\times 0.5 = 500\\) m/s.",
          "Time = distance / speed: \\(t = d/v = 1000/500 = 2\\) s.",
        ],
        answer: "\\(v = 500\\) m/s; time to cover 1 km \\(= 2\\) s.",
      },
      selfCheckExample: {
        prompt:
          "An alternating current has frequency 3 Hz. What does that mean — and what is its period?",
        steps: [
          "Frequency 3 Hz means 3 complete cycles per second by definition of hertz.",
          "Period \\(T = 1/f = 1/3\\) s \\(\\approx 0.33\\) s per cycle.",
        ],
        answer: "3 cycles per second; \\(T = 1/3\\) s.",
      },
      practiceSet: [
        {
          prompt: "If \\(f = 200\\) Hz and \\(\\lambda = 1.5\\) m, find \\(v\\).",
          answer: "\\(300\\) m/s",
          method: "\\(v = f\\lambda = 200 \\times 1.5\\)",
        },
        {
          prompt: "If \\(v = 340\\) m/s and \\(f = 170\\) Hz, find \\(\\lambda\\).",
          answer: "\\(2\\) m",
          method: "\\(\\lambda = v/f\\)",
        },
        {
          prompt: "If \\(f = 50\\) Hz, what is the period?",
          answer: "\\(0.02\\) s (20 ms)",
          method: "\\(T = 1/f\\)",
        },
        {
          prompt: "Which is NOT a unit of frequency: Hz, s⁻¹, min⁻¹, dB?",
          answer: "dB",
          method: "dB measures intensity level, not frequency",
        },
      ],
      pyqExampleId: "8da91884-a246-4048-9abe-1aebaf27af39", // 2022 — clean v = fλ application
      traps: [
        {
          title: "dB measures intensity LEVEL — not frequency, not amplitude",
          body:
            "Decibel is a logarithmic ratio of two intensities (or two powers). It is a unit of intensity LEVEL only. " +
            "Frequency uses Hz, s⁻¹, min⁻¹; amplitude uses Pa (pressure) or m (displacement). " +
            "Any \"which is NOT a unit of frequency\" question puts dB as the answer.",
        },
        {
          title: "3 Hz means 3 cycles per second — full cycles, not half or quarter",
          body:
            "Hz is defined as one COMPLETE cycle per second. 3 Hz = 3 complete cycles per second, NOT 6 cycles (one per half-cycle counted twice) and NOT 1.5 cycles.",
        },
      ],
    },

    // Concept 2 — speed of sound depends on medium properties only
    {
      kind: "formula" as const,
      slug: "speed-medium-only",
      name: "Speed of sound depends on the MEDIUM — not on f, not on P (at constant T)",
      intuition:
        "Speed of sound is set by the MEDIUM the wave travels through — specifically by its elasticity and density. " +
        "It does NOT depend on the wave's own frequency (a 100 Hz wave and a 10 kHz wave travel at the same speed in air), and at constant temperature it does NOT depend on pressure (doubling P doubles \\(\\rho\\) too, and they cancel in the formula). " +
        "It DOES grow with temperature — in a gas, \\(v \\propto \\sqrt{T}\\).",
      definition:
        "For an ideal gas: \\(v = \\sqrt{\\gamma P / \\rho} = \\sqrt{\\gamma RT/M}\\) — depends on temperature \\(T\\) and the gas's molar mass \\(M\\), but NOT on pressure \\(P\\) at constant \\(T\\) (\\(P\\) and \\(\\rho\\) move together). " +
        "Across phases: \\(v_\\text{solid} > v_\\text{liquid} > v_\\text{gas}\\) (elasticity dominates). " +
        "Frequency dependence: **none** — the wave equation \\(v = f\\lambda\\) holds because \\(\\lambda\\) adjusts; \\(v\\) itself is fixed by the medium.",
      formula: {
        label: "Speed of sound in an ideal gas",
        latex: "v = \\sqrt{\\dfrac{\\gamma P}{\\rho}} = \\sqrt{\\dfrac{\\gamma R T}{M}}",
        symbols: [
          { symbol: "\\gamma", meaning: "adiabatic index (\\(C_p/C_v\\))" },
          { symbol: "P", meaning: "pressure (Pa)" },
          { symbol: "\\rho", meaning: "density (kg/m³)" },
          { symbol: "T", meaning: "absolute temperature (K)" },
          { symbol: "M", meaning: "molar mass (kg/mol)" },
        ],
      },
      authoredExample: {
        prompt:
          "The speed of sound in a sealed container of air is \\(x\\) m/s. The pressure inside is then doubled while the temperature is held constant. The new speed is \\(y\\). Find \\(x/y\\).",
        steps: [
          "Speed of sound in a gas: \\(v = \\sqrt{\\gamma P/\\rho}\\).",
          "At constant temperature, doubling pressure also doubles density (gas obeys \\(P \\propto \\rho\\) at fixed T — ideal gas law).",
          "Both \\(P\\) and \\(\\rho\\) double, so the ratio \\(P/\\rho\\) is unchanged.",
          "Therefore \\(v\\) is unchanged: \\(y = x\\), and \\(x/y = 1\\).",
        ],
        answer: "\\(x/y = 1\\). Speed is independent of pressure at constant temperature.",
      },
      selfCheckExample: {
        prompt:
          "Two sound waves of frequency 100 Hz and 10 000 Hz travel through the same room at the same temperature. " +
          "Which travels faster?",
        steps: [
          "Speed of sound depends on the medium (T, elasticity, density), NOT on the wave's frequency.",
          "Both waves travel through the same air at the same T → both have the same speed.",
          "The 100 Hz wave just has a much longer wavelength (\\(\\lambda = v/f\\)).",
        ],
        answer:
          "Neither — both travel at the same speed. Speed depends on the medium, not on frequency.",
      },
      practiceSet: [
        {
          prompt: "Does the speed of sound in air depend on the wave's frequency?",
          answer: "No",
          method: "speed is set by the medium (T, density)",
        },
        {
          prompt: "Does the speed of sound in a gas depend on its pressure at constant temperature?",
          answer: "No",
          method: "\\(P\\) and \\(\\rho\\) cancel in \\(v = \\sqrt{\\gamma P/\\rho}\\)",
        },
        {
          prompt: "Does the speed of sound in air increase or decrease with temperature?",
          answer: "Increases",
          method: "\\(v \\propto \\sqrt{T}\\) in a gas",
        },
        {
          prompt: "Rank speed of sound in steel, water, and air, fastest first.",
          answer: "Steel > Water > Air",
          method: "solid > liquid > gas",
        },
      ],
      pyqExampleId: "4d92e75e-1222-4d5b-8ccc-d49e87845cce", // 2026 — clean "P doubled at const T → x/y = 1" test
      traps: [
        {
          title: "Pressure dependence trap — P only matters via T",
          body:
            "\"Pressure doubled, speed doubles\" is the wrong intuition. The formula \\(v = \\sqrt{\\gamma P/\\rho}\\) hides the fact that at constant temperature \\(P\\) and \\(\\rho\\) are proportional, so the ratio is fixed. " +
            "Speed only changes through TEMPERATURE: \\(v \\propto \\sqrt{T}\\).",
        },
        {
          title: "Frequency does NOT change the speed of sound",
          body:
            "A 100 Hz sound and a 10 kHz sound travel at the same speed in the same air. " +
            "Frequency only changes the WAVELENGTH (\\(\\lambda = v/f\\)) — the same medium-set speed is shared.",
        },
        {
          title: "Solid > Liquid > Gas (elasticity wins over density)",
          body:
            "Naively you might expect dense materials to be slower, but for sound speed elasticity dominates: " +
            "steel \\(\\approx 5000\\) m/s, water \\(\\approx 1500\\) m/s, air \\(\\approx 340\\) m/s. The ordering is monotone.",
        },
      ],
    },

    // Concept 3 — reference: frequency bands, sound speeds, Mach + scales
    {
      kind: "reference" as const,
      slug: "frequency-bands-and-scales",
      name: "Bands and scales — audible / ultrasonic, Mach, sound speeds, decibel, Richter",
      intuition:
        "A handful of named bands and scales come up here every other paper — the audible frequency range, the ultrasonic threshold, the Mach number labels (subsonic / sonic / supersonic / hypersonic), typical sound speeds in air / water / steel, plus what dB and Richter actually measure. " +
        "Memorise the table once and these recall questions become a lookup.",
      definition:
        "Six clusters of named numbers, all tested at EASY level. Drill the boundary numbers (20 Hz, 20 kHz, Mach 1) cold; the typical-speed numbers (340 / 1500 / 5000 m/s) are the most-repeated quantitative recall in the chapter.",
      visualizationSlug: "frequency-spectrum-strip",
      table: {
        columns: ["What", "Value / range", "Note"],
        rows: [
          {
            cells: ["**Audible** frequency range (human ear)", "**20 Hz to 20 000 Hz**", "Drilled most years — memorise both endpoints"],
          },
          {
            cells: ["**Infrasonic**", "< 20 Hz", "Below the lower limit of human hearing"],
          },
          {
            cells: ["**Ultrasonic**", "> 20 000 Hz (> 20 kHz)", "Bats, SONAR, medical imaging"],
          },
          {
            cells: ["Speed of sound in **air** (\\(20°\\)C)", "\\(\\approx 340\\) m/s", "Standard round number — memorise"],
          },
          {
            cells: ["Speed of sound in **water** (\\(20°\\)C)", "\\(\\approx 1500\\) m/s", "Tested in 2019: distractors at 330 / 800 / 5000"],
          },
          {
            cells: ["Speed of sound in **steel**", "\\(\\approx 5000\\) m/s", "Solid > liquid > gas"],
          },
          {
            cells: ["**Mach number**", "object speed / sound speed", "Compares object's speed to local sound speed"],
          },
          {
            cells: ["Mach < 1", "**Subsonic**", "Most everyday motion (cars, propeller aircraft)"],
          },
          {
            cells: ["Mach = 1", "**Sonic / transonic**", "At the speed of sound — sonic boom region"],
          },
          {
            cells: ["Mach > 1", "**Supersonic**", "Faster than sound (fighter jets, Concorde)"],
            noteAmber: "NDA 2017 tested exactly this — Mach > 1 means supersonic.",
          },
          {
            cells: ["Mach > 5", "**Hypersonic**", "Re-entry vehicles, scramjets"],
          },
          {
            cells: ["**Decibel (dB)**", "log scale of intensity ratio", "Unit of intensity LEVEL — NOT a unit of frequency or amplitude"],
          },
          {
            cells: ["**Richter scale**", "log scale of earthquake energy", "Devised 1935 by C.F. Richter; no upper limit (though > 9.5 is rare)"],
          },
        ],
        caption:
          "The audible-range endpoints (20 Hz, 20 kHz) and the speed-in-water number (\\(\\approx 1500\\) m/s) are the most-tested rows — they appear almost yearly.",
      },
      selfCheckExample: {
        prompt:
          "Sort these four quantities by typical magnitude, smallest to largest: " +
          "(i) human audible range upper limit, (ii) speed of sound in air, " +
          "(iii) speed of sound in water, (iv) speed of sound in steel.",
        steps: [
          "(i) 20 000 Hz (= 20 kHz, in hertz not m/s).",
          "(ii) 340 m/s in air.",
          "(iii) 1500 m/s in water.",
          "(iv) 5000 m/s in steel.",
          "Note (i) is in Hz; the other three are in m/s — can't compare numerically across units. " +
          "Just by m/s value: air (340) < water (1500) < steel (5000).",
        ],
        answer:
          "By m/s: air < water < steel. The 20 kHz value is in different units (Hz) and isn't comparable.",
      },
      practiceSet: [
        {
          prompt: "The human audible frequency range is approximately ___ to ___ Hz.",
          answer: "20 Hz to 20 000 Hz",
        },
        {
          prompt: "Sound waves above 20 kHz are called ___.",
          answer: "Ultrasonic",
        },
        {
          prompt: "Approximate speed of sound in water at 20°C?",
          answer: "\\(\\approx 1500\\) m/s",
        },
        {
          prompt: "A body with Mach number > 1 is called ___.",
          answer: "Supersonic",
        },
        {
          prompt: "Decibel measures ___ (frequency / amplitude / intensity level)?",
          answer: "Intensity level",
        },
      ],
      pyqExampleId: "0d4b177e-8cac-45ac-b4f2-af4c27503d3c", // 2018 — clean audible range test
      traps: [
        {
          title: "Audible range: 20 Hz to 20 kHz — NOT 0 Hz to 20 kHz",
          body:
            "Distractors often use \"0 – 200 Hz\" or \"200 – 20 000 Hz\" or \"2 000 – 20 000 Hz\" to test whether you remember the LOWER endpoint (20 Hz). " +
            "Below 20 Hz is infrasonic — you feel it as vibration but don't hear it as a tone.",
        },
        {
          title: "Speed of sound in water \\(\\approx 1500\\) m/s, NOT 5000 m/s (that's steel)",
          body:
            "Common distractor swaps water and steel speeds. Water sits in the middle: 1500 m/s. Steel \\(\\approx 5000\\) m/s. Air \\(\\approx 340\\) m/s.",
        },
        {
          title: "Mach > 1 is SUPERsonic, not SUBsonic",
          body:
            "Subsonic = slower than sound (Mach < 1). Supersonic = faster than sound (Mach > 1). Hypersonic kicks in around Mach 5. Easy to flip under exam pressure.",
        },
      ],
    },
  ],
};
