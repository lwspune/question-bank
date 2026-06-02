import type { SubtopicNote } from "@/app/notes/_types";

export const APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications — SONAR, Transducers, Instruments",
  title: "How We USE Sound — SONAR, Transducers, Musical Instruments",
  oneLineDefinition:
    "Once you know what sound is, how to measure it, and what it does, the applications follow. SONAR + bats use ultrasonic reflection; microphones convert acoustic to electrical; musical instruments produce notes by vibrating air columns, strings, or membranes.",
  whyItMatters:
    "The chapter's payoff — what all the foundations + wave equation + behaviours come together to let humans (and bats) actually DO with sound. " +
    "Three concepts: (1) SONAR (ultrasonic + reflection from Subtopic 3 = underwater distance) plus the bats/sonography/RADAR/LIDAR family; " +
    "(2) sound transducers — microphone (sound → electrical) and loudspeaker (the reverse); " +
    "(3) musical instruments — three families (wind, string, percussion) and what determines pitch + loudness in each. " +
    "5 PYQs across 2017–2025, all EASY except one HARD (the flute statement question).",
  concepts: [
    // Concept 1 — SONAR and ultrasonic applications (REFERENCE)
    {
      kind: "reference" as const,
      slug: "sonar-and-applications",
      name: "SONAR, bats, medical imaging — applications of ultrasonic",
      intuition:
        "The reason ultrasonic gets so much exam love is its APPLICATIONS — short wavelength lets it resolve small objects, and pulses can be precisely timed for ranging. " +
        "SONAR (ships measuring sea depth and underwater objects), bats (echolocation), and medical sonography all work the same way: emit a pulse, time the echo (the same reflection from Subtopic 3), infer distance.",
      definition:
        "Two anchors to memorise: (1) the SONAR acronym and its underwater-distance application — uses **ultrasonic** waves, not audible; (2) the family of \"send pulse, time echo\" acronyms — SONAR (sound), RADAR (radio), LIDAR (light) — and which medium each works in.",
      table: {
        columns: ["Acronym / use", "Wave type", "Application / setting"],
        rows: [
          {
            cells: ["**SONAR**", "Ultrasonic (sound)", "Sound Navigation And Ranging — underwater distance / submarine / sea-depth"],
            noteAmber: "SONAR uses ultrasonic, NOT audible sound — easy distractor.",
          },
          { cells: ["**RADAR**", "Radio waves (EM)", "RAdio Detection And Ranging — aircraft / weather, works through air"] },
          { cells: ["**LIDAR**", "Light / laser (EM)", "LIght Detection And Ranging — surveying, autonomous vehicles, atmospheric science"] },
          { cells: ["**Bats / dolphins**", "Ultrasonic", "Echolocation — emit ultrasonic, receive reflected echo, infer obstacle position"] },
          { cells: ["**Medical sonography / ultrasound imaging**", "Ultrasonic", "Pulse + echo through soft tissue — pregnancy scans, organ imaging"] },
          { cells: ["**Industrial: defect detection, drilling**", "Ultrasonic", "Reflections inside metal reveal cracks; high-frequency vibration drills hard materials"] },
          { cells: ["**Ultrasonic cleaning**", "Ultrasonic", "High-frequency vibrations in a liquid bath dislodge contaminants from delicate parts"] },
        ],
        caption:
          "All rows 4–7 work by the same principle as SONAR: emit pulse, measure echo, infer geometry. The only difference is medium.",
      },
      selfCheckExample: {
        prompt:
          "A ship wants to measure the depth of the sea below it. " +
          "What does it send, and what type of wave is that — audible sound, ultrasonic, radio, or light?",
        steps: [
          "The device used is SONAR — Sound Navigation And Ranging.",
          "SONAR works by emitting a pulse and timing the reflected echo from the sea floor.",
          "The pulse is **ultrasonic** (frequency > 20 kHz) — short wavelength gives better resolution, and it isn't disrupted by audible noise.",
        ],
        answer: "Emits an ultrasonic pulse; SONAR uses ultrasonic, NOT audible sound.",
      },
      practiceSet: [
        { prompt: "Which device measures sea depth or detects submarines by emitting an ultrasonic pulse and timing its echo?", answer: "SONAR (Sound Navigation And Ranging)" },
        { prompt: "What kind of waves does SONAR use?", answer: "Ultrasonic", method: "NOT audible sound — ultrasonic gives better resolution + immunity to audible noise" },
        { prompt: "Bats detect obstacles by receiving reflected ___ waves.", answer: "Ultrasonic" },
        { prompt: "RADAR uses what kind of waves?", answer: "Radio waves (electromagnetic)", method: "RAdio Detection And Ranging" },
        { prompt: "LIDAR uses what kind of waves?", answer: "Light (laser, electromagnetic)", method: "LIght Detection And Ranging" },
      ],
      pyqExampleId: "84bf2fe9-2880-47bd-8f29-003691b989cb", // 2025 — SONAR acronym
      traps: [
        {
          title: "SONAR uses ULTRASONIC, not audible sound",
          body:
            "The instinct \"SONAR = SOund + NAvigation, so it's sound\" is right — but the relevant kind of sound is ULTRASONIC, not audible. " +
            "Distractor (\"audible-range sound\") catches students who don't make this distinction.",
        },
        {
          title: "Bats use ULTRASONIC, not radio waves or microwaves",
          body:
            "Bats are biological — they emit and detect sound, not radio waves. Their echolocation calls are in the ultrasonic range (typically 20–100 kHz). " +
            "RADAR (radio) and microwave-based echolocation belong to technology, not bats.",
        },
      ],
    },

    // Concept 2 — sound transducers (REFERENCE)
    {
      kind: "reference" as const,
      slug: "sound-transducers",
      name: "Microphone, loudspeaker — converting between acoustic and electrical",
      intuition:
        "A transducer converts energy from one form to another. For sound, the two important examples are the **microphone** (sound \\(\\to\\) electrical signal) and the **loudspeaker** (electrical signal \\(\\to\\) sound). " +
        "They are essentially the same device run forwards vs backwards — a vibrating diaphragm coupled to a coil and magnet. " +
        "(The biological transducers — eardrum and cochlea — live in Subtopic 1's ear chain. Don't confuse the two contexts.)",
      definition:
        "Two electronic transducers + one piezoelectric crystal commonly tested as an ultrasonic generator. Memorise input \\(\\to\\) output direction for each — distractors swap them.",
      table: {
        columns: ["Device", "Input", "Output"],
        rows: [
          {
            cells: [
              "**Microphone**",
              "Sound waves (mechanical pressure)",
              "Electrical signal",
            ],
            noteAmber: "NDA 2022 Sep tested exactly this — distractor swaps sound \\(\\leftrightarrow\\) microwaves.",
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
              "**Piezoelectric crystal**",
              "Electrical signal (or mechanical stress)",
              "Mechanical vibration (or electrical signal)",
            ],
          },
        ],
        caption:
          "The microphone and loudspeaker are essentially the same device run in opposite directions. The piezoelectric crystal works both ways — it's how SONAR and medical-imaging probes generate ultrasonic pulses.",
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
        { prompt: "When you speak into a microphone, sound energy is converted into ___.", answer: "An electrical signal" },
        { prompt: "A loudspeaker converts ___ to ___.", answer: "Electrical signals to sound waves", method: "loudspeaker = microphone run in reverse" },
        { prompt: "What kind of crystal can convert electrical pulses into ultrasonic mechanical vibrations?", answer: "Piezoelectric crystal", method: "used in SONAR + medical-imaging probes" },
      ],
      pyqExampleId: "584f18ac-6129-49ee-b718-13fa8895e819", // 2022 — microphone direction
      traps: [
        {
          title: "Microphone is sound \\(\\to\\) electrical, NOT the other way around",
          body:
            "Distractors swap input and output, or replace \"sound\" with \"microwaves\". " +
            "Microphone takes acoustic energy in, gives electrical energy out — the SPEAKER is the reverse.",
        },
      ],
    },

    // Concept 3 — musical instruments (REFERENCE)
    {
      kind: "reference" as const,
      slug: "musical-instruments",
      name: "Musical instruments — how wind, string, and percussion produce notes",
      intuition:
        "All musical instruments make sound the same way: SOMETHING vibrates at a chosen frequency. " +
        "The \"something\" differs by family — wind instruments vibrate an AIR COLUMN, stringed instruments vibrate a STRING (coupled to a resonance box), percussion vibrates a MEMBRANE or solid body. " +
        "In every case, **pitch is set by the geometry / tension** of the vibrating element, and **loudness is set by AMPLITUDE / intensity** of that vibration — NOT by \"momentum of waves\" or other red-herring physics terms NDA likes to use.",
      definition:
        "Three instrument families and what determines pitch + loudness in each. The single most-tested fact (NDA 2023 HARD) is that in a wind instrument like a flute, loudness is determined by amplitude / intensity of the air column's oscillation — NOT by momentum of waves on the blowing jet.",
      table: {
        columns: ["Instrument family", "Vibrating element", "Pitch determined by"],
        rows: [
          {
            cells: [
              "**Wind (flute, clarinet, etc.)**",
              "Vibrating air column inside (and outside) the tube",
              "Tube length + open holes (sets the standing-wave wavelength)",
            ],
            noteAmber:
              "NDA 2023 Apr trap — loudness comes from AMPLITUDE / intensity of the air column's oscillation, NOT from \"momentum of waves on the blowing jet\".",
          },
          {
            cells: [
              "**Stringed (guitar, violin)**",
              "Vibrating string coupled to a resonance box",
              "String length / tension / mass per unit length",
            ],
          },
          {
            cells: [
              "**Percussion (drum, tabla)**",
              "Vibrating membrane or solid body",
              "Membrane tension + size",
            ],
          },
        ],
        caption:
          "In all three families, loudness is set by the AMPLITUDE of the vibrating element — bigger displacement = louder. Trap-aware row is the flute.",
      },
      selfCheckExample: {
        prompt:
          "In a flute, what determines (a) the pitch of the note and (b) the loudness of the note?",
        steps: [
          "(a) Pitch is set by the length of the vibrating air column — which is determined by the tube length and which finger-holes are open.",
          "(b) Loudness is set by the AMPLITUDE (intensity) of the air column's oscillation — the harder the player blows, the larger the amplitude, the louder the note.",
          "Common distractor: \"loudness depends on the momentum of waves on the blowing jet\" — wrong. That's a junk-physics phrase. Loudness depends on AMPLITUDE.",
        ],
        answer:
          "Pitch: tube length + holes. Loudness: amplitude / intensity of the air column's oscillation.",
      },
      practiceSet: [
        { prompt: "In a flute, loudness is determined by ___ (momentum / amplitude / arrival time) of the air column vibration?", answer: "Amplitude (intensity)", method: "NDA 2023 trap — \"momentum of waves\" is the wrong answer" },
        { prompt: "Pitch in a string instrument depends on string length, tension, and ___.", answer: "Mass per unit length (linear density)" },
        { prompt: "Sound in a flute comes from a vibrating ___.", answer: "Column of air" },
        { prompt: "What determines the pitch of a drum (percussion)?", answer: "Membrane tension and size" },
      ],
      pyqExampleId: "5ad1c511-68ba-4529-beb8-3e09fcf4f766", // 2023 HARD — flute
      traps: [
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
