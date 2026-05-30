import type { SubtopicNote } from "@/app/notes/_types";

export const ECHO_ACOUSTICS_REVERBERATION_NOTE: SubtopicNote = {
  subtopicName: "Echo, Acoustics and Reverberation",
  title: "Echo, Acoustics, and Reverberation",
  oneLineDefinition:
    "Echo is a SINGLE reflection heard distinctly after the original; reverberation is MANY reflections heard as sustained persistence — the same physics with different geometry.",
  whyItMatters:
    "3 PYQs across 2021–2025, all EASY — pure conceptual recall, almost free marks once you have the echo / reverberation distinction locked in. " +
    "Two concepts: (1) **Echo** — single reflection from a far surface, with a minimum-distance rule (~17 m in air) so the reflection is heard separately; " +
    "(2) **Reverberation** — many reflections in an enclosed space (a hall, an auditorium) overlapping into sustained sound that persists after the source stops.",
  concepts: [
    // Concept 1 — echo
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
          { symbol: "t_\\text{persistence}", meaning: "ear's persistence threshold \\(\\approx 0.1\\) s" },
          { symbol: "d_\\text{min}", meaning: "minimum reflector distance (m)" },
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
        {
          prompt:
            "An echo is caused by which property of sound waves — refraction, reflection, diffraction, or resonance?",
          answer: "Reflection",
        },
        {
          prompt: "Echo time is 0.4 s; \\(v = 340\\) m/s. Find the distance to the reflector.",
          answer: "68 m",
          method: "\\(d = vt/2 = 340 \\times 0.4 / 2\\)",
        },
        {
          prompt:
            "Minimum distance for a distinct echo in air (\\(v = 340\\) m/s)?",
          answer: "\\(\\approx 17\\) m",
          method: "\\(d_\\text{min} = v \\times 0.1 / 2\\)",
        },
        {
          prompt:
            "If you are 5 m from a wall, will you hear a distinct echo?",
          answer: "No",
          method: "5 m < 17 m \\(\\Rightarrow\\) reflection overlaps the original",
        },
      ],
      pyqExampleId: "2143d3de-067e-4208-ab03-ca8ae6cb9b35", // 2025 — clean "echo is reflection" test
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

    // Concept 2 — reverberation
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
        {
          prompt:
            "Reverberation is associated with single or multiple reflection of sound?",
          answer: "Multiple",
          method: "echo is single; reverberation is many overlapping",
        },
        {
          prompt:
            "Sound persists in a big hall after the source stops. What is this phenomenon called?",
          answer: "Reverberation",
        },
        {
          prompt:
            "Do absorbent materials INCREASE or DECREASE reverberation time?",
          answer: "Decrease",
          method: "they soak up reflected energy → fewer overlapping reflections",
        },
        {
          prompt:
            "Auditoriums for music typically want longer or shorter reverberation than auditoriums for speech?",
          answer: "Longer for music",
          method: "music benefits from sustain; speech needs clarity → short reverberation",
        },
      ],
      pyqExampleId: "10ca2f04-0b1f-44ef-95d2-69ded34159d0", // 2021 — clean "reverberation = multiple reflections" test
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
  ],
};
