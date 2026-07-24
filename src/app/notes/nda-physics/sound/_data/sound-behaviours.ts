import type { SubtopicNote } from "@/app/notes/_types";

export const SOUND_BEHAVIOURS_NOTE: SubtopicNote = {
  subtopicName: "Sound Behaviours — Reflection, Echo, Reverberation, Beats",
  title: "What Sound DOES — Reflection, Echo, Reverberation, Beats",
  oneLineDefinition:
    "Because sound is a wave, it does what waves do — reflect, refract, diffract, interfere — except polarize. Reflection gives echo (single) and reverberation (multiple); interference of two close frequencies gives beats.",
  whyItMatters:
    "Now you know what sound IS and how to MEASURE it. What does it DO? " +
    "Wave behaviours come in two flavours: (1) things sound CAN do because it's a wave (reflect, refract, diffract, interfere, resonate, Doppler) and (2) things it CAN'T do because it's longitudinal (polarize) or mechanical (vacuum). " +
    "Then the specific applications of reflection — ECHO (single, 17 m rule) and REVERBERATION (many bounces, halls) — and the interference application — BEATS (rate equal to |f₁ − f₂|). " +
    "5 PYQs; all EASY or MODERATE except one HARD (the flute-related instrument question is in Subtopic 4).",
  concepts: [
    // Concept 1 — properties checklist (REFERENCE)
    {
      kind: "reference" as const,
      slug: "sound-properties-checklist",
      name: "What sound CAN and CANNOT do — the properties checklist",
      intuition:
        "NDA recycles \"which of the following is NOT correct about sound\" every other year — the distractor is always one of the canonical wave properties. " +
        "Memorise this table once: every row is a property that either applies (because sound is a wave) or fails (because sound is longitudinal / mechanical). " +
        "The two **bold-NO** rows — POLARIZATION and TRAVEL-THROUGH-VACUUM — are the trap rows that carry almost every distractor.",
      definition:
        "Properties sound SHARES with all waves (reflection, refraction, diffraction, interference, resonance, Doppler) — and the two properties it lacks (polarization, propagation through vacuum). Drill the table top-to-bottom; the **bold-NO** rows are the trap rows.",
      table: {
        columns: ["Property / behaviour", "Sound?", "Why"],
        rows: [
          { cells: ["Reflection (echoes)", "Yes", "All waves reflect off a hard boundary"] },
          { cells: ["Refraction", "Yes", "Speed changes between media \\(\\Rightarrow\\) wave bends"] },
          { cells: ["Diffraction", "Yes", "Bends around obstacles when obstacle size \\(\\approx \\lambda\\)"] },
          { cells: ["Interference (beats)", "Yes", "Two waves superpose — alternating loud/soft"] },
          { cells: ["Resonance", "Yes", "Forced oscillation at the natural frequency"] },
          { cells: ["Doppler effect", "Yes", "Observed pitch shifts with source/observer motion"] },
          {
            cells: ["**Polarization**", "**NO**", "Polarization requires a TRANSVERSE wave; sound is **longitudinal**"],
            noteAmber: "The single most-tested NDA trap — \"polarization applies to sound\" is always WRONG.",
          },
          { cells: ["**Travel through vacuum**", "**NO**", "No medium \\(\\Rightarrow\\) no molecular collisions \\(\\Rightarrow\\) no propagation"] },
          { cells: ["Ultrasonic obeys all the above the same way", "Yes", "Ultrasonic = sound above 20 kHz, otherwise identical behaviour"] },
        ],
        caption:
          "Rows 7 (polarization) and 8 (vacuum) account for the bulk of the bank's \"which is NOT correct\" distractors. Row 9 catches the \"ultrasonic cannot reflect / refract / be absorbed\" trap.",
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
        { prompt: "Can sound waves be polarized? Why or why not?", answer: "No — sound is longitudinal; polarization needs a transverse wave" },
        { prompt: "Can ultrasonic waves be reflected, refracted, and absorbed?", answer: "Yes", method: "ultrasonic is just sound at \\(f > 20\\) kHz — same properties" },
        { prompt: "Does sound show the Doppler effect?", answer: "Yes", method: "any wave does — pitch shifts with motion of source/observer" },
        { prompt: "Can sound waves travel through vacuum?", answer: "No", method: "sound needs a medium (mechanical wave)" },
      ],
      pyqExampleId: "a1a79c30-d832-4e27-8078-039540b534ab", // 2017 — ultrasonic CAN reflect/refract
      traps: [
        {
          title: "Ultrasonic obeys the same property rules as audible sound",
          body:
            "Ultrasonic = above 20 kHz. Other than the frequency band, it is ordinary sound — it CAN reflect, refract, diffract, get absorbed, AND it cannot polarize / cannot travel in vacuum. " +
            "A distractor saying \"ultrasonic cannot be reflected, refracted, or absorbed\" is always WRONG.",
        },
      ],
    },

    // Concept 2 — echo
    {
      kind: "formula" as const,
      slug: "echo-and-minimum-distance",
      name: "Echo — a single distinct reflection",
      intuition:
        "When you shout at a distant cliff, the sound travels to the cliff, REFLECTS off it, and comes back. " +
        "If the cliff is far enough away, the reflected sound arrives at your ear AFTER the original has faded — you hear them as two separate sounds, and that's an echo. " +
        "Too close, and the reflection overlaps the original — you don't perceive an echo at all.",
      definition:
        "An **echo** is the repetition of a sound caused by a SINGLE reflection from a hard surface. " +
        "Human ears can resolve two sounds as separate only if their arrival times differ by at least about **0.1 s** (the persistence-of-hearing threshold). " +
        "For a reflection to be heard distinctly: the round-trip time must be at least 0.1 s, so the reflecting surface must be at least \\(d_\\text{min} = v \\times 0.1 / 2\\) away.",
      formula: {
        label: "Minimum distance for a distinct echo",
        latex: "d_\\text{min} = \\dfrac{v \\, t_\\text{persistence}}{2}",
        symbols: [
          { symbol: "v", meaning: "speed of sound in the medium (m/s)" },
          { symbol: "\\(t_\\text{persistence}\\)", meaning: "ear's persistence threshold \\(\\approx 0.1\\) s" },
          { symbol: "\\(d_\\text{min}\\)", meaning: "minimum reflector distance (m)" },
        ],
      },
      visualizationSlug: "echo-geometry",
      authoredExample: {
        prompt:
          "What is the minimum distance from a wall at which a shouted sound will produce a distinct echo? Take the speed of sound in air as \\(v = 340\\) m/s.",
        steps: [
          "Use \\(d_\\text{min} = v \\, t_\\text{persistence} / 2\\) with \\(t_\\text{persistence} = 0.1\\) s.",
          "Round trip travel: \\(v \\times 0.1 = 340 \\times 0.1 = 34\\) m.",
          "Divide by 2 (sound goes there AND comes back): \\(d_\\text{min} = 34/2 = 17\\) m.",
        ],
        answer: "\\(d_\\text{min} \\approx 17\\) m (in air at 20°C).",
      },
      selfCheckExample: {
        prompt:
          "A boy claps his hands once in front of a vertical cliff and hears the echo 0.6 s later. " +
          "How far is the cliff? Take \\(v = 340\\) m/s.",
        steps: [
          "Round-trip distance = \\(v \\times t = 340 \\times 0.6 = 204\\) m.",
          "Distance to cliff = round-trip / 2 = 102 m.",
        ],
        answer: "Cliff is 102 m away.",
      },
      practiceSet: [
        { prompt: "An echo is caused by which property of sound waves — refraction, reflection, diffraction, or resonance?", answer: "Reflection" },
        { prompt: "Echo time is 0.4 s; \\(v = 340\\) m/s. Find the distance to the reflector.", answer: "68 m", method: "\\(d = vt/2 = 340 \\times 0.4 / 2\\)" },
        { prompt: "Minimum distance for a distinct echo in air (\\(v = 340\\) m/s)?", answer: "\\(\\approx 17\\) m", method: "\\(d_\\text{min} = v \\times 0.1 / 2\\)" },
        { prompt: "If you are 5 m from a wall, will you hear a distinct echo?", answer: "No", method: "5 m < 17 m \\(\\Rightarrow\\) reflection overlaps the original" },
      ],
      pyqExampleId: "2143d3de-067e-4208-ab03-ca8ae6cb9b35", // 2025 — echo is reflection
      traps: [
        {
          title: "Echo is REFLECTION — not refraction, diffraction, or resonance",
          body:
            "Refraction is bending across a medium boundary; diffraction is bending around obstacles; resonance is forced oscillation at a natural frequency. " +
            "An echo is purely a reflection from a hard surface, heard back after a delay.",
        },
        {
          title: "Round-trip / 2 — sound goes there AND comes back",
          body:
            "The formula has a factor of 2 in the denominator because the wave travels the distance twice (source \\(\\to\\) wall \\(\\to\\) source). Forgetting the divide-by-2 gives an answer twice as big as the actual reflector distance.",
        },
      ],
    },

    // Concept 3 — reverberation
    {
      kind: "formula" as const,
      slug: "reverberation-multiple-reflections",
      name: "Reverberation — sustained sound from many reflections",
      intuition:
        "Inside a large hall, sound bounces off the walls, floor, and ceiling — and bounces off them AGAIN, and again. " +
        "Each bounce arrives at your ear a tiny bit later than the previous one. So instead of hearing the source then one distinct echo, you hear a CONTINUOUS, fading wash of overlapping reflections — sound that PERSISTS for a moment after the source has stopped. " +
        "That persistence is reverberation.",
      definition:
        "**Reverberation** is the persistence of sound in an enclosed space due to **multiple reflections** from the surrounding surfaces, overlapping in time. " +
        "Contrast with echo, which is a **single** reflection heard distinctly after the original. " +
        "**Reverberation time** \\(T\\) is the time taken for the sound intensity to fall by 60 dB (one-millionth of its original power) after the source stops; long \\(T\\) gives a \"live\" hall, short \\(T\\) a \"dry\" one. " +
        "Absorbent materials (curtains, carpets, acoustic panels) reduce reverberation by soaking up reflected energy.",
      authoredExample: {
        prompt:
          "Why does clapping in an empty marble hall produce a sustained, lingering sound, while the same clap in a curtained living room dies almost immediately?",
        steps: [
          "Marble walls are HARD and reflect sound efficiently — almost no energy is absorbed per bounce.",
          "Inside the hall, the clap bounces many times — wall to wall, floor to ceiling — and each bounce arrives at your ear with a small delay.",
          "These overlapping reflections add up to a continuous, slowly-decaying wash of sound — long reverberation time.",
          "In a carpeted, curtained room, soft materials ABSORB most of the reflected energy on each bounce — the clap fades in a fraction of a second.",
        ],
        answer:
          "Marble = hard, reflective → long reverberation. Carpet/curtains = absorbent → reverberation dies quickly.",
      },
      selfCheckExample: {
        prompt:
          "Distinguish echo from reverberation in one line each.",
        steps: [
          "Echo = ONE distinct reflection, heard separately after the original (\\(> 0.1\\) s delay).",
          "Reverberation = MANY overlapping reflections in an enclosed space, heard as sustained persistence after the source stops.",
        ],
        answer:
          "Echo = single distinct reflection. Reverberation = sustained persistence from multiple reflections.",
      },
      practiceSet: [
        { prompt: "Reverberation is associated with single or multiple reflection of sound?", answer: "Multiple", method: "echo is single; reverberation is many overlapping" },
        { prompt: "Sound persists in a big hall after the source stops. What is this phenomenon called?", answer: "Reverberation" },
        { prompt: "Do absorbent materials INCREASE or DECREASE reverberation time?", answer: "Decrease", method: "they soak up reflected energy → fewer overlapping reflections" },
        { prompt: "Auditoriums for music typically want longer or shorter reverberation than auditoriums for speech?", answer: "Longer for music", method: "music benefits from sustain; speech needs clarity → short reverberation" },
      ],
      pyqExampleId: "10ca2f04-0b1f-44ef-95d2-69ded34159d0", // 2021 — reverberation = multiple reflections
      traps: [
        {
          title: "Reverberation is MULTIPLE reflections — not refraction, not diffraction",
          body:
            "The defining property is REPEATED REFLECTION inside an enclosed space. " +
            "Distractors swap reflection for refraction or use \"single reflection\" (which would be an echo, not reverberation).",
        },
        {
          title: "Echo vs reverberation — single vs many, distinct vs sustained",
          body:
            "Echo: ONE reflection, heard as a SEPARATE event after a clear delay. Needs reflector \\(\\ge 17\\) m away in air. " +
            "Reverberation: MANY reflections, heard as CONTINUOUS persistence. Lives in halls/auditoriums where surfaces are close enough that reflections overlap.",
        },
      ],
    },

    // Concept 4 — beats
    {
      kind: "formula" as const,
      slug: "beats-formation",
      name: "Beats — periodic loud/soft from two close frequencies (interference)",
      intuition:
        "When two sound waves of NEARLY equal frequency are played together, their amplitudes alternately reinforce and cancel as their phases drift in and out of step. " +
        "You hear a slow PULSING of loudness — \"loud, soft, loud, soft...\". Each pulse is one beat. " +
        "The further apart the two frequencies, the FASTER the pulsing; if the frequencies are equal, there are no beats at all. " +
        "Beats are the audible signature of INTERFERENCE — the same wave behaviour that's row 4 of the properties checklist.",
      definition:
        "**Beats** occur when two sound waves of slightly different (nearly equal) frequencies \\(f_1\\) and \\(f_2\\) interfere. " +
        "The resulting sound has periodic amplitude variation — alternating maxima (constructive interference) and minima (destructive) — at a rate equal to the **difference of the two frequencies**. " +
        "If \\(f_1 = f_2\\), no beats. If \\(f_1, f_2\\) are far apart, the variation is too fast to perceive as separate pulses.",
      formula: {
        label: "Beat frequency",
        latex: "f_\\text{beat} = |f_1 - f_2|",
        symbols: [
          { symbol: "\\(f_\\text{beat}\\)", meaning: "number of beats per second (Hz)" },
          { symbol: "f_1, f_2", meaning: "the two nearly-equal source frequencies (Hz)" },
        ],
      },
      visualizationSlug: "beats-envelope",
      authoredExample: {
        prompt:
          "Two tuning forks of frequencies 256 Hz and 260 Hz are sounded together. How many beats per second does the listener hear?",
        steps: [
          "Beat frequency = \\(|f_1 - f_2|\\).",
          "Substitute: \\(|260 - 256| = 4\\) Hz.",
          "So the listener hears 4 pulses (beats) per second.",
        ],
        answer: "4 beats per second.",
      },
      selfCheckExample: {
        prompt:
          "A piano tuner strikes a piano string against a 440 Hz reference tone and hears 3 beats per second. " +
          "Give the two possible frequencies of the piano string.",
        steps: [
          "Beats = \\(|f_\\text{string} - 440| = 3\\).",
          "So \\(f_\\text{string} = 440 + 3\\) or \\(440 - 3\\).",
          "Either 443 Hz or 437 Hz.",
        ],
        answer:
          "443 Hz or 437 Hz. Beat formula gives the magnitude of the difference — direction is ambiguous without more info.",
      },
      practiceSet: [
        { prompt: "Two waves at 300 Hz and 304 Hz. Beat frequency?", answer: "4 Hz", method: "\\(|304 - 300|\\)" },
        { prompt: "If two sounds at 500 Hz are sounded together, how many beats are heard?", answer: "Zero", method: "equal frequencies → no beats" },
        { prompt: "Two tuning forks at 256 Hz and 250 Hz. Beats per second?", answer: "6 Hz" },
        { prompt: "For two waves to produce audible beats, their frequencies must be ___ (equal / nearly equal / very different).", answer: "Nearly equal", method: "differences of ~1–10 Hz are clearly perceived as separate pulses" },
      ],
      pyqExampleId: "0803a1c4-94d4-495a-b059-65b89ebb86db", // 2021 — beats = nearly same frequencies
      traps: [
        {
          title: "Beats need NEARLY equal frequencies — not equal, not far apart",
          body:
            "Equal frequencies (\\(f_1 = f_2\\)) give CONSTANT amplitude — no beats. " +
            "Far-apart frequencies give two distinct tones — no beats. " +
            "Beats only appear when \\(|f_1 - f_2|\\) is small enough (typically < 20 Hz) for the pulsing to be heard as separate maxima.",
        },
        {
          title: "Beat formula gives MAGNITUDE — the sign is ambiguous",
          body:
            "From beat-count alone you cannot tell which source is higher. If you hear 4 beats/s against a 440 Hz reference, the string is either 444 Hz or 436 Hz — extra info is needed (e.g. retune slightly and see if beats speed up or slow down).",
        },
      ],
    },
  ],
};
