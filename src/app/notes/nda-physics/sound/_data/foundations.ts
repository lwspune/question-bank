import type { SubtopicNote } from "@/app/notes/_types";

export const FOUNDATIONS_NOTE: SubtopicNote = {
  subtopicName: "Foundations — Sound, Perception, and the Ear",
  title: "Foundations: What Sound Is and How We Hear It",
  oneLineDefinition:
    "Sound is a mechanical longitudinal wave; we perceive it via three independent attributes (pitch, loudness, quality) extracted by a four-stage ear chain (pinna → eardrum → ossicles → cochlea).",
  whyItMatters:
    "Start here. Every later concept in the chapter builds on these three ideas: " +
    "(1) sound is mechanical + longitudinal + needs a medium (six PYQs and the most-tested family in the chapter), " +
    "(2) the perceptual triad — pitch tracks frequency, loudness tracks amplitude, quality tracks waveform shape — explains what each property of the wave means for the listener, " +
    "(3) the ear's signal chain converts pressure variations into nerve impulses; the cochlea is the biological microphone. " +
    "Together: 11 PYQs, all EASY or MODERATE.",
  concepts: [
    // Concept 1 — sound is a mechanical longitudinal wave
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
        { prompt: "Can sound travel through vacuum?", answer: "No", method: "no medium → no molecular collisions → no sound" },
        { prompt: "Is sound a longitudinal or transverse wave?", answer: "Longitudinal", method: "particles oscillate parallel to wave direction" },
        { prompt: "In which medium does sound travel fastest — steel, water, or air?", answer: "Steel", method: "solids have the highest elasticity" },
        { prompt: "Is sound a mechanical wave or an electromagnetic wave?", answer: "Mechanical", method: "needs a material medium; not EM (light is EM, sound is mechanical)" },
      ],
      pyqExampleId: "cea49ac8-cf99-458e-aef9-2481bdc07dcd", // 2023 — mechanical + longitudinal
      traps: [
        {
          title: "Sound is longitudinal — and that's exactly why it CANNOT polarize",
          body:
            "Polarization is a phenomenon of TRANSVERSE waves only — it restricts the plane of oscillation perpendicular to wave direction. " +
            "Sound oscillates ALONG the wave direction, so there is no perpendicular plane to polarize. " +
            "(The full \"what sound can/can't do\" trap-row table is in Subtopic 3.)",
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
        { prompt: "Loudness depends on which physical attribute?", answer: "Amplitude", method: "intensity \\(\\propto A^2\\) drives perceived loudness" },
        { prompt: "What distinguishes two instruments playing the same note at the same volume?", answer: "Quality / timbre (waveform shape)" },
        { prompt: "If a sound's pitch doubles, what happens to its frequency?", answer: "Doubles", method: "pitch ↔ frequency directly" },
      ],
      pyqExampleId: "ff10ece4-ea24-4e4b-841d-c64a4178af19", // 2018 — pitch/loudness mapping
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

    // Concept 3 — human ear chain (REFERENCE)
    {
      kind: "reference" as const,
      slug: "human-ear-chain",
      name: "The human ear — anatomy chain that converts pressure to nerve impulses",
      intuition:
        "Now that you know what sound IS and how we PERCEIVE it (pitch/loudness/quality), the natural next question is HOW the ear actually does that conversion. " +
        "The answer is a four-stage chain: outer ear catches sound, the eardrum converts it to mechanical vibration, three tiny bones amplify it, and the cochlea finally converts it to nerve signals. " +
        "Each stage performs a specific physical transformation — memorise the chain and the NDA recall questions become a lookup.",
      definition:
        "Five labelled parts of the ear in signal order. The single most-tested fact is **cochlea = the mechanical → electrical converter** (it's the biological microphone).",
      visualizationSlug: "ear-anatomy",
      table: {
        columns: ["Part", "Function / mechanism", "Note"],
        rows: [
          {
            cells: [
              "**Pinna (outer ear)**",
              "Funnels sound into the ear canal",
              "Acoustic collector — no signal conversion",
            ],
          },
          {
            cells: [
              "**Eardrum (tympanic membrane)**",
              "Sound waves \\(\\to\\) mechanical vibration",
              "Thin membrane at the end of the ear canal",
            ],
          },
          {
            cells: [
              "**Ossicles (malleus, incus, stapes)**",
              "Mechanical amplification & impedance matching",
              "Three tiny bones in the middle ear",
            ],
          },
          {
            cells: [
              "**Cochlea**",
              "Mechanical pressure \\(\\to\\) electrical (nerve impulses)",
              "Fluid-filled spiral in the inner ear — the biological mic",
            ],
            noteAmber:
              "NDA 2022 Sep — the pressure \\(\\to\\) electrical converter IS the cochlea (not the eardrum, ossicles, or auditory nerve).",
          },
          {
            cells: [
              "**Auditory nerve**",
              "Carries nerve signals from cochlea to brain",
              "Transmission, not conversion",
            ],
          },
        ],
        caption:
          "Each stage performs a distinct physical conversion. Distractors swap the cochlea (the converter) with the eardrum (mechanical-only) or the auditory nerve (transmission-only).",
      },
      selfCheckExample: {
        prompt:
          "Order the four ear structures by the path a sound signal takes through them: eardrum, cochlea, ossicles, pinna. Then say which one converts pressure to electrical signals.",
        steps: [
          "Sound first enters the OUTER ear and is funnelled by the PINNA.",
          "It hits the EARDRUM and is converted to mechanical vibration.",
          "Three OSSICLES (malleus, incus, stapes) amplify the vibration and pass it inward.",
          "The COCHLEA converts mechanical pressure to electrical nerve impulses, which the auditory nerve sends to the brain.",
        ],
        answer:
          "Pinna → Eardrum → Ossicles → Cochlea. The COCHLEA is the pressure-to-electrical converter.",
      },
      practiceSet: [
        { prompt: "Which part of the human ear converts pressure variations into electrical signals?", answer: "Cochlea" },
        { prompt: "What converts sound waves into mechanical vibration in the ear?", answer: "Eardrum (tympanic membrane)" },
        { prompt: "What do the three ossicles (malleus, incus, stapes) do?", answer: "Amplify mechanical vibration", method: "they bridge eardrum to cochlea, providing impedance matching" },
        { prompt: "Where does the perception of pitch / loudness physically happen?", answer: "In the brain, on signals sent by the cochlea via the auditory nerve" },
      ],
      pyqExampleId: "320c7419-1213-45e6-a2d1-0a001a90a08d", // 2022 MOD — cochlea question
      traps: [
        {
          title: "Cochlea, not eardrum, is the mechanical \\(\\to\\) electrical converter",
          body:
            "The EARDRUM converts sound to MECHANICAL vibration (acoustic to mechanical). " +
            "The OSSICLES amplify mechanical vibration mechanically. " +
            "The COCHLEA is where mechanical pressure finally becomes ELECTRICAL nerve impulses. Three distinct stages — distractors often swap them.",
        },
      ],
    },
  ],
};
