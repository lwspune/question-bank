import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_OF_SOUND_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Sound Waves",
  title: "Properties of Sound Waves",
  oneLineDefinition:
    "Sound is a mechanical longitudinal wave — it needs a medium, propagates as compressions and rarefactions, and the same physical signal carries pitch, loudness, and timbre.",
  whyItMatters:
    "11 PYQs across 2017–2024 — the most-tested Sound subtopic and the chapter's most reliable scoring territory, all EASY or MODERATE. " +
    "Three concepts cover everything: (1) what KIND of wave sound is and what it CANNOT do, " +
    "(2) the perceptual triad — pitch, loudness, quality — and their physical attributes, " +
    "(3) a quick-reference checklist of \"sound CAN reflect / cannot polarize / cannot pass through vacuum\" facts that NDA recycles every other year.",
  concepts: [
    // Concept 1 — mechanical + longitudinal + needs medium
    {
      kind: "formula" as const,
      slug: "mechanical-longitudinal-wave",
      name: "Sound is a mechanical longitudinal wave",
      intuition:
        "Sound propagates by molecules bumping their neighbours — a compression in air is a region of slightly higher pressure where molecules are crowded together; a rarefaction is where they are spread thin. " +
        "Because the molecules vibrate in the SAME direction the wave travels, the wave is LONGITUDINAL (not transverse, like light or water ripples). " +
        "And because there have to be molecules to bump each other, sound CANNOT travel through vacuum.",
      definition:
        "Sound is a **mechanical wave** — it requires a material medium (solid, liquid, or gas) to propagate; there is no sound in vacuum. " +
        "It is a **longitudinal wave** — particles of the medium oscillate parallel to the direction of wave propagation, producing alternating compressions and rarefactions. " +
        "Speed varies by medium: \\(v_\\text{solid} > v_\\text{liquid} > v_\\text{gas}\\). Within a gas, \\(v \\propto \\sqrt{T}\\) — speed grows with temperature but is independent of pressure at constant temperature.",
      visualizationSlug: "compression-rarefaction-wave",
      authoredExample: {
        prompt:
          "An astronaut on the Moon strikes a bell and watches the clapper hit the rim. Do they hear it? Why?",
        steps: [
          "Sound is a mechanical wave — it propagates through molecular collisions in a medium.",
          "The Moon has no atmosphere — no air to carry the pressure variations from the bell.",
          "With no medium, the bell's mechanical vibrations have nothing to transfer energy through.",
          "The astronaut sees the bell vibrate but hears nothing.",
        ],
        answer: "No. Sound needs a medium; there is no air on the Moon to carry the wave.",
      },
      selfCheckExample: {
        prompt:
          "Sound waves travel through water, air, and steel — but not through vacuum. " +
          "Rank the three media by sound speed, fastest to slowest, and explain in one line.",
        steps: [
          "Sound speed in an elastic medium grows with the medium's elasticity (resistance to deformation) and falls with density. Elasticity wins overall.",
          "Solids have by far the highest elasticity → fastest. \\(v_\\text{steel} \\approx 5000\\) m/s.",
          "Liquids next. \\(v_\\text{water} \\approx 1480\\) m/s at 20°C.",
          "Gases slowest. \\(v_\\text{air} \\approx 340\\) m/s at 20°C.",
        ],
        answer:
          "Steel > Water > Air. The order is Solid > Liquid > Gas — universally true at ordinary temperatures.",
      },
      practiceSet: [
        {
          prompt: "Can sound travel through vacuum?",
          answer: "No",
          method: "no medium → no molecular collisions → no sound",
        },
        {
          prompt: "Is sound a longitudinal or transverse wave?",
          answer: "Longitudinal",
          method: "particles oscillate parallel to wave direction",
        },
        {
          prompt: "In which medium does sound travel fastest — steel, water, or air?",
          answer: "Steel",
          method: "solids have the highest elasticity",
        },
        {
          prompt: "Is sound a mechanical wave or an electromagnetic wave?",
          answer: "Mechanical",
          method: "needs a material medium; not EM (light is EM, sound is mechanical)",
        },
      ],
      pyqExampleId: "cea49ac8-cf99-458e-aef9-2481bdc07dcd", // 2023 — clean test of mechanical + longitudinal
      traps: [
        {
          title: "Sound is longitudinal — and that's exactly why it CANNOT polarize",
          body:
            "Polarization is a phenomenon of TRANSVERSE waves only — it restricts the plane of oscillation perpendicular to wave direction. " +
            "Sound oscillates ALONG the wave direction, so there is no perpendicular plane to polarize. " +
            "NDA recycles this as a \"which of the following does NOT apply to sound waves\" trap.",
        },
        {
          title: "Sound vs light — both waves, but VERY different",
          body:
            "Sound = mechanical + longitudinal + needs medium + speed \\(\\approx 340\\) m/s in air. " +
            "Light = electromagnetic + transverse + travels in vacuum + speed \\(\\approx 3 \\times 10^8\\) m/s. " +
            "An option offering \"sound is electromagnetic\" or \"sound is transverse\" is always wrong.",
        },
      ],
    },

    // Concept 2 — pitch, loudness, quality
    {
      kind: "formula" as const,
      slug: "pitch-loudness-quality",
      name: "Pitch, loudness, and quality — the perceptual triad",
      intuition:
        "When you hear a note, your ear extracts three INDEPENDENT qualities: how HIGH it sounds (pitch), how LOUD it sounds (loudness), and what INSTRUMENT made it (quality, or timbre). " +
        "Each maps to a distinct physical attribute of the sound wave: pitch tracks FREQUENCY, loudness tracks AMPLITUDE, and quality tracks the WAVEFORM SHAPE — which harmonics accompany the fundamental.",
      definition:
        "Three perceptual qualities of sound, each mapped to a physical attribute:\n" +
        "- **Pitch** — how high or low the note sounds. Determined by **frequency** (Hz). Higher frequency = higher pitch.\n" +
        "- **Loudness** — how soft or intense. Determined by **amplitude** (and intensity \\(I \\propto A^2\\)). Larger amplitude = louder.\n" +
        "- **Quality** (or **timbre**) — what makes a violin and a flute sound different on the same note. Determined by **waveform shape** — the harmonics and overtones accompanying the fundamental.\n" +
        "The three are independent: you can change one without changing the others.",
      authoredExample: {
        prompt:
          "Singer A and singer B both sing the same note at the same volume. The audience can still tell them apart. Which property of the sound wave is different between them?",
        steps: [
          "Same note → same frequency → same pitch.",
          "Same volume → same amplitude → same loudness.",
          "What's left? The waveform shape — the mix of harmonics — is what differs between two voices (or two instruments).",
          "This is QUALITY or TIMBRE.",
        ],
        answer: "Quality (timbre). Same frequency + same amplitude, different harmonic content.",
      },
      selfCheckExample: {
        prompt:
          "A tuning fork is struck harder — its tone becomes louder, but the note itself stays the same. " +
          "Which property of its sound wave has increased, and which has stayed the same?",
        steps: [
          "Louder = higher loudness perception.",
          "Loudness depends on **amplitude** — so amplitude has increased.",
          "Pitch (the actual note) is unchanged → frequency is unchanged.",
          "The fork still vibrates at its natural frequency; only the amplitude of vibration grew because more energy was put in.",
        ],
        answer:
          "Amplitude has increased; frequency (and therefore pitch) is unchanged.",
      },
      practiceSet: [
        { prompt: "Pitch depends on which physical attribute of the sound wave?", answer: "Frequency" },
        {
          prompt: "Loudness depends on which physical attribute?",
          answer: "Amplitude",
          method: "intensity \\(\\propto A^2\\) drives perceived loudness",
        },
        {
          prompt: "What distinguishes two instruments playing the same note at the same volume?",
          answer: "Quality / timbre (waveform shape)",
        },
        {
          prompt: "If a sound's pitch doubles, what happens to its frequency?",
          answer: "Doubles",
          method: "pitch ↔ frequency directly",
        },
      ],
      pyqExampleId: "ff10ece4-ea24-4e4b-841d-c64a4178af19", // 2018 — clean pitch/loudness mapping test
      traps: [
        {
          title: "Amplitude is measured in pressure (Pa), NOT decibels",
          body:
            "Amplitude of a sound wave is the maximum displacement of particles (metres) or, more often for sound, the maximum **pressure variation (Pascals)**. " +
            "**Decibels (dB) measure intensity LEVEL** — a logarithmic ratio relative to a reference intensity. dB is NOT a unit of amplitude. " +
            "NDA 2022 Sep tested exactly this distinction.",
        },
        {
          title: "Loudness depends on amplitude, NOT frequency",
          body:
            "A common distractor: \"loudness depends on frequency\" or \"loudness depends on velocity\". Both wrong. " +
            "Frequency drives PITCH; loudness is driven by amplitude. The ear's response curve does have a mild frequency dependence, but for NDA purposes: amplitude only.",
        },
      ],
    },

    // Concept 3 — reference: properties checklist of sound
    {
      kind: "reference" as const,
      slug: "sound-properties-checklist",
      name: "What sound CAN and CANNOT do — properties checklist",
      intuition:
        "NDA recycles the same handful of \"which of the following is NOT correct about sound\" questions every other year — the distractor is always one of the canonical wave properties. " +
        "Memorise this table once and the entire \"properties\" question family collapses to a lookup: every row is a property that either applies to sound (because it is a wave) or fails (because it is longitudinal / mechanical).",
      definition:
        "Properties sound SHARES with all waves (reflection, refraction, diffraction, interference, resonance, Doppler) plus the two properties it lacks (polarization, propagation through vacuum), plus the medium-dependence quick facts. Drill the table top-to-bottom; the **bold-NO** rows are the trap rows.",
      table: {
        columns: ["Property / behaviour", "Sound?", "Why"],
        rows: [
          {
            cells: [
              "Reflection (echoes)",
              "Yes",
              "All waves reflect off a hard boundary",
            ],
          },
          {
            cells: [
              "Refraction",
              "Yes",
              "Speed changes between media \\(\\Rightarrow\\) wave bends",
            ],
          },
          {
            cells: [
              "Diffraction",
              "Yes",
              "Bends around obstacles when obstacle size \\(\\approx \\lambda\\)",
            ],
          },
          {
            cells: [
              "Interference (beats)",
              "Yes",
              "Two waves superpose \\(\\Rightarrow\\) alternating loud/soft",
            ],
          },
          { cells: ["Resonance", "Yes", "Forced oscillation at the natural frequency"] },
          {
            cells: [
              "Doppler effect",
              "Yes",
              "Observed pitch shifts with source/observer motion",
            ],
          },
          {
            cells: [
              "**Polarization**",
              "**NO**",
              "Polarization requires a TRANSVERSE wave; sound is **longitudinal**",
            ],
            noteAmber:
              "The single most-tested NDA trap — \"polarization applies to sound\" is always WRONG.",
          },
          {
            cells: [
              "**Travel through vacuum**",
              "**NO**",
              "No medium \\(\\Rightarrow\\) no molecular collisions \\(\\Rightarrow\\) no propagation",
            ],
          },
          {
            cells: [
              "Travel through gases / liquids / solids",
              "Yes",
              "Any elastic medium works; speed: solid > liquid > gas",
            ],
          },
          {
            cells: [
              "Speed depends on temperature (in gas)",
              "Yes",
              "\\(v \\propto \\sqrt{T}\\) — grows as gas warms",
            ],
          },
          {
            cells: [
              "Speed depends on pressure (at constant T)",
              "**NO**",
              "In \\(v = \\sqrt{\\gamma P / \\rho}\\), \\(P\\) and \\(\\rho\\) move together \\(\\Rightarrow\\) cancel",
            ],
            noteAmber:
              "Tested in 2026 NDA-1: \"pressure doubled at constant T, speed becomes y, find x/y\" — answer 1.",
          },
        ],
        caption:
          "Rows 7 (polarization) and 11 (pressure independence) account for the bulk of the bank's \"which is NOT correct\" distractors.",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong statement: " +
          "(a) Sound can be reflected off a hard wall. " +
          "(b) Sound can be refracted between hot and cold air layers. " +
          "(c) Sound can be polarized. " +
          "(d) Sound can show interference and beats.",
        steps: [
          "Reflection (a): TRUE — echoes.",
          "Refraction (b): TRUE — speed changes with temperature, so sound bends between layers.",
          "Polarization (c): **FALSE**. Polarization requires a transverse wave. Sound is longitudinal — no perpendicular plane to polarize.",
          "Interference (d): TRUE — two close-frequency waves superpose to give beats.",
        ],
        answer: "(c) — sound CANNOT be polarized because it is longitudinal.",
      },
      practiceSet: [
        {
          prompt: "Can sound waves be polarized? Why or why not?",
          answer: "No — sound is longitudinal; polarization needs a transverse wave",
        },
        {
          prompt: "Does the speed of sound in a gas depend on its pressure (temperature held constant)?",
          answer: "No",
          method: "in \\(v = \\sqrt{\\gamma P / \\rho}\\), \\(P\\) and \\(\\rho\\) cancel",
        },
        {
          prompt: "Can ultrasonic waves be reflected and refracted like ordinary sound?",
          answer: "Yes",
          method: "ultrasonic is just sound at \\(f > 20\\) kHz — same properties",
        },
        {
          prompt: "Does the speed of sound in air increase with temperature?",
          answer: "Yes",
          method: "\\(v \\propto \\sqrt{T}\\) in a gas",
        },
      ],
      pyqExampleId: "a1a79c30-d832-4e27-8078-039540b534ab", // 2017 — clean "ultrasonic CAN reflect/refract" trap
      traps: [
        {
          title: "Ultrasonic obeys the same property rules as audible sound",
          body:
            "Ultrasonic = above 20 kHz. Other than the frequency band, it is ordinary sound — it CAN reflect, refract, diffract, get absorbed, AND it cannot polarize / cannot travel in vacuum. " +
            "A distractor saying \"ultrasonic cannot be reflected, refracted, or absorbed\" is always WRONG.",
        },
      ],
    },
  ],
};
