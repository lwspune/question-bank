import type { SubtopicNote } from "@/app/notes/_types";

export const BEATS_INSTRUMENTS_EAR_NOTE: SubtopicNote = {
  subtopicName: "Beats, Musical Instruments and Human Ear",
  title: "Beats, Transducers, and the Human Ear",
  oneLineDefinition:
    "Three short topics with one question each in most papers — the beat phenomenon and its frequency formula, sound transducers (microphone / loudspeaker), and the human ear's anatomy.",
  whyItMatters:
    "4 PYQs across 2017–2023 — small but reliable. " +
    "Three concepts: (1) **Beats** — periodic loud/soft modulation when two nearly-equal frequencies superpose, with a simple formula; " +
    "(2) **Sound transducers** — microphone converts sound to electrical signal; loudspeaker does the reverse; " +
    "(3) **Human ear + instruments** — anatomy chain pinna → eardrum → ossicles → cochlea → auditory nerve, plus how wind/string instruments produce notes.",
  concepts: [
    // Concept 1 — beats
    {
      kind: "formula" as const,
      slug: "beats-formation",
      name: "Beats — periodic loud/soft modulation from two close frequencies",
      intuition:
        "When two sound waves of NEARLY equal frequency are played together, their amplitudes alternately reinforce and cancel as their phases drift in and out of step. " +
        "You hear a slow PULSING of loudness — \"loud, soft, loud, soft...\". Each pulse is one beat. " +
        "The further apart the two frequencies, the FASTER the pulsing; if the frequencies are equal, there are no beats at all.",
      definition:
        "**Beats** occur when two sound waves of slightly different (nearly equal) frequencies \\(f_1\\) and \\(f_2\\) interfere. " +
        "The resulting sound has periodic amplitude variation — alternating maxima (constructive interference) and minima (destructive) — at a rate equal to the **difference of the two frequencies**. " +
        "If \\(f_1 = f_2\\), no beats. If \\(f_1, f_2\\) are far apart, the variation is too fast to perceive as separate pulses.",
      formula: {
        label: "Beat frequency",
        latex: "f_\\text{beat} = |f_1 - f_2|",
        symbols: [
          { symbol: "f_\\text{beat}", meaning: "number of beats per second (Hz)" },
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
        {
          prompt: "Two waves at 300 Hz and 304 Hz. Beat frequency?",
          answer: "4 Hz",
          method: "\\(|304 - 300|\\)",
        },
        {
          prompt: "If two sounds at 500 Hz are sounded together, how many beats are heard?",
          answer: "Zero",
          method: "equal frequencies → no beats",
        },
        {
          prompt: "Two tuning forks at 256 Hz and 250 Hz. Beats per second?",
          answer: "6 Hz",
        },
        {
          prompt:
            "For two waves to produce audible beats, their frequencies must be ___ (equal / nearly equal / very different).",
          answer: "Nearly equal",
          method: "differences of ~1–10 Hz are clearly perceived as separate pulses",
        },
      ],
      pyqExampleId: "0803a1c4-94d4-495a-b059-65b89ebb86db", // 2021 — clean definition of beats
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

    // Concept 2 — sound transducers (reference)
    {
      kind: "reference" as const,
      slug: "sound-transducers",
      name: "Microphone, loudspeaker — sound transducers",
      intuition:
        "A transducer converts energy from one form to another. For sound, the two important examples are the **microphone** (sound \\(\\to\\) electrical signal) and the **loudspeaker** (electrical signal \\(\\to\\) sound). " +
        "They are essentially the same device run forwards vs backwards — a vibrating diaphragm coupled to a coil and magnet.",
      definition:
        "Two electronic transducers + their biological counterparts in the ear. Memorise input \\(\\to\\) output direction for each — distractors swap them.",
      table: {
        columns: ["Device", "Input", "Output"],
        rows: [
          {
            cells: [
              "**Microphone**",
              "Sound waves (mechanical pressure)",
              "Electrical signal",
            ],
            noteAmber: "NDA 2022 Sep tested exactly this — distractor C/D swaps sound \\(\\leftrightarrow\\) microwaves.",
          },
          {
            cells: [
              "**Loudspeaker**",
              "Electrical signal",
              "Sound waves (mechanical pressure)",
            ],
          },
          {
            cells: [
              "Eardrum (tympanic membrane)",
              "Sound waves",
              "Mechanical vibration of three ossicles",
            ],
          },
          {
            cells: [
              "Cochlea",
              "Mechanical pressure vibrations",
              "Electrical signal (nerve impulses)",
            ],
          },
        ],
        caption:
          "Rows 1–2 are technological transducers; rows 3–4 are biological. The microphone is the technological analogue of the eardrum + cochlea chain combined.",
      },
      selfCheckExample: {
        prompt:
          "A microphone takes ___ as input and produces ___ as output. " +
          "A loudspeaker is the same device run in reverse — takes ___ as input and produces ___ as output.",
        steps: [
          "Microphone: sound (pressure variations) → electrical signal.",
          "Loudspeaker: electrical signal → sound (pressure variations).",
          "The internal mechanism (diaphragm + coil + magnet) is essentially the same in both, just driven oppositely.",
        ],
        answer:
          "Microphone: sound → electrical. Loudspeaker: electrical → sound.",
      },
      practiceSet: [
        {
          prompt: "A microphone converts ___ to ___.",
          answer: "Sound waves to electrical signals",
        },
        {
          prompt: "A loudspeaker converts ___ to ___.",
          answer: "Electrical signals to sound waves",
          method: "loudspeaker = microphone run in reverse",
        },
        {
          prompt: "Is the cochlea a sound-to-mechanical or a mechanical-to-electrical converter?",
          answer: "Mechanical-to-electrical",
          method: "pressure vibrations → nerve impulses",
        },
      ],
      pyqExampleId: "584f18ac-6129-49ee-b718-13fa8895e819", // 2022 — clean microphone direction test
      traps: [
        {
          title: "Microphone is sound \\(\\to\\) electrical, NOT the other way around",
          body:
            "Distractors swap input and output, or replace \"sound\" with \"microwaves\". " +
            "Microphone takes acoustic energy in, gives electrical energy out — the SPEAKER is the reverse.",
        },
      ],
    },

    // Concept 3 — human ear + instruments (reference)
    {
      kind: "reference" as const,
      slug: "ear-and-instruments",
      name: "Human ear chain + how musical instruments make notes",
      intuition:
        "The ear is a four-stage chain: outer ear catches sound, the eardrum converts it to vibration, three tiny bones amplify it, and the cochlea finally converts it to nerve signals. " +
        "Musical instruments make sound at the OTHER end of this pipeline — by setting some part of the instrument (air column in a flute, string in a guitar, membrane in a drum) into vibration at a specific frequency.",
      definition:
        "Top half of the table: the ear's signal-processing chain (anatomy). Bottom half: how the three main instrument families produce notes. " +
        "The single most-tested anatomy fact is **cochlea = mechanical \\(\\to\\) electrical converter**; the most-tested instrument fact is that **loudness comes from amplitude / intensity, not from \"momentum\" or arrival time**.",
      visualizationSlug: "ear-anatomy",
      table: {
        columns: ["Part / instrument", "Function / mechanism", "Note"],
        rows: [
          {
            cells: [
              "**Pinna (outer ear)**",
              "Funnels sound into ear canal",
              "Acoustic collector",
            ],
          },
          {
            cells: [
              "**Eardrum (tympanic membrane)**",
              "Sound waves \\(\\to\\) mechanical vibration",
              "Thin membrane at end of ear canal",
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
            noteAmber: "NDA 2022 Sep — the pressure \\(\\to\\) electrical converter IS the cochlea.",
          },
          {
            cells: [
              "**Auditory nerve**",
              "Carries nerve signals from cochlea to brain",
              "Transmission, not conversion",
            ],
          },
          {
            cells: [
              "**Wind instruments (flute, clarinet, etc.)**",
              "Vibrating air column inside (and outside) the tube",
              "Pitch set by tube length + holes; loudness set by amplitude (NOT momentum)",
            ],
            noteAmber:
              "NDA 2023 Apr trap — loudness comes from AMPLITUDE / intensity of the air column's oscillation, NOT from \"momentum of waves on the blowing jet\".",
          },
          {
            cells: [
              "**Stringed instruments (guitar, violin)**",
              "Vibrating string coupled to a resonance box",
              "Pitch by string length / tension / mass; loudness by amplitude",
            ],
          },
          {
            cells: [
              "**Percussion (drum, tabla)**",
              "Vibrating membrane or solid body",
              "Pitch depends on membrane tension + size; loudness by strike strength",
            ],
          },
        ],
        caption:
          "Top half: ear anatomy in signal order. Bottom half: three instrument families. The cochlea row and the wind-instrument loudness row carry the bulk of NDA's testing here.",
      },
      selfCheckExample: {
        prompt:
          "Order the four ear structures by the path a sound signal takes through them: eardrum, cochlea, ossicles, pinna.",
        steps: [
          "Sound first enters the OUTER ear and is funnelled by the PINNA.",
          "It hits the EARDRUM and is converted to mechanical vibration.",
          "Three OSSICLES (malleus, incus, stapes) amplify the vibration and pass it inward.",
          "The COCHLEA converts mechanical pressure to electrical nerve impulses, which the auditory nerve sends to the brain.",
        ],
        answer: "Pinna → Eardrum → Ossicles → Cochlea (→ auditory nerve → brain).",
      },
      practiceSet: [
        {
          prompt: "Which part of the human ear converts pressure variations into electrical signals?",
          answer: "Cochlea",
        },
        {
          prompt: "What converts sound waves into mechanical vibration in the ear?",
          answer: "Eardrum (tympanic membrane)",
        },
        {
          prompt:
            "In a flute, loudness is determined by ___ (momentum / amplitude / arrival time) of the air column vibration?",
          answer: "Amplitude (intensity)",
          method: "NDA 2023 trap — \"momentum of waves\" is the wrong answer",
        },
        {
          prompt: "Pitch in a string instrument depends on string length, tension, and ___.",
          answer: "Mass per unit length (linear density)",
        },
      ],
      pyqExampleId: "320c7419-1213-45e6-a2d1-0a001a90a08d", // 2022 MOD — cochlea question
      traps: [
        {
          title: "Cochlea, not eardrum, is the mechanical \\(\\to\\) electrical converter",
          body:
            "The EARDRUM converts sound to MECHANICAL vibration (acoustic to mechanical). " +
            "The OSSICLES amplify mechanical vibration mechanically. " +
            "The COCHLEA is where mechanical pressure finally becomes ELECTRICAL nerve impulses. Distinct stage.",
        },
        {
          title: "Flute loudness comes from amplitude — NOT momentum, NOT arrival time",
          body:
            "Arrival time of the jet pulses sets PITCH (frequency of the air column's oscillation). " +
            "AMPLITUDE of the air column's oscillation sets LOUDNESS (intensity). " +
            "\"Momentum of waves on the blowing jet\" is not how loudness is determined — that wording is a deliberate NDA distractor.",
        },
      ],
    },
  ],
};
