import type { SubtopicNote } from "@/app/notes/_types";

export const SONAR_AND_ULTRASONIC_NOTE: SubtopicNote = {
  subtopicName: "SONAR and Ultrasonic",
  title: "Ultrasonic Waves and SONAR",
  oneLineDefinition:
    "Sound above 20 kHz — what makes it special, why it can't be heard, and the navigation / echolocation / medical applications NDA recycles every other year.",
  whyItMatters:
    "5 PYQs across 2017–2025, all EASY — pure recall, the easiest marks in the chapter. " +
    "Two concepts cover everything: (1) what ULTRASONIC actually is — its frequency band and how it compares to audible sound, " +
    "(2) the applications that come up — SONAR (underwater navigation), bats (echolocation), and the SONAR/RADAR/LIDAR acronym family.",
  concepts: [
    // Concept 1 — what ultrasonic IS
    {
      kind: "reference" as const,
      slug: "ultrasonic-band",
      name: "What ultrasonic is — band, properties, contrast with audible",
      intuition:
        "Ultrasonic just means \"above the upper limit of human hearing\" — sound waves with frequency \\(> 20\\) kHz. " +
        "It is ordinary sound otherwise: same speed in the same medium, obeying \\(v = f\\lambda\\), needing a medium, longitudinal. " +
        "The HIGHER FREQUENCY is what gives it useful properties — shorter wavelength means it can resolve smaller objects, and high-frequency reflections are easier to time precisely.",
      definition:
        "**Ultrasonic** = sound waves with frequency above the human audible range (> 20 kHz). " +
        "Compared to audible sound: same speed (speed depends on medium, not frequency), shorter wavelength (\\(\\lambda = v/f\\)), higher frequency. " +
        "All sound-wave properties still apply: reflects, refracts, diffracts, needs a medium, cannot polarize.",
      table: {
        columns: ["Band", "Frequency range", "What hears / uses it"],
        rows: [
          {
            cells: ["**Infrasonic**", "< 20 Hz", "Whales, elephants; earthquakes generate it"],
          },
          {
            cells: ["**Audible** (human)", "**20 Hz – 20 kHz**", "Human ears — the band we call \"sound\" colloquially"],
          },
          {
            cells: ["**Ultrasonic**", "**> 20 kHz**", "Bats, dolphins, dogs, SONAR, medical imaging"],
            noteAmber: "The 20 kHz threshold is the single most-tested fact in this subtopic.",
          },
        ],
        caption:
          "Ultrasonic vs audible — the only physical difference is frequency. Speed, medium-dependence, and longitudinal nature are identical.",
      },
      selfCheckExample: {
        prompt:
          "Compared to audible sound waves at the same temperature in the same air, ultrasonic waves have ___ frequency, ___ wavelength, and ___ speed.",
        steps: [
          "By definition, ultrasonic has HIGHER frequency than audible (\\(> 20\\) kHz vs ≤ 20 kHz).",
          "Speed of sound depends on medium + temperature, NOT on frequency — so same speed.",
          "From \\(v = f\\lambda\\): same \\(v\\), higher \\(f\\) ⇒ SHORTER wavelength.",
        ],
        answer: "Higher frequency, shorter wavelength, SAME speed.",
      },
      practiceSet: [
        { prompt: "Ultrasonic waves have frequency ___ Hz.", answer: "> 20 000 (i.e. > 20 kHz)" },
        {
          prompt: "Compared to audible sound, do ultrasonic waves travel faster, slower, or at the same speed?",
          answer: "Same speed",
          method: "speed depends on medium, not frequency",
        },
        {
          prompt: "Do ultrasonic waves have longer or shorter wavelength than audible sound (same medium)?",
          answer: "Shorter",
          method: "\\(\\lambda = v/f\\); higher \\(f\\), shorter \\(\\lambda\\)",
        },
        {
          prompt: "Sound waves with frequency below 20 Hz are called ___.",
          answer: "Infrasonic",
        },
      ],
      pyqExampleId: "a8890ff8-a003-4357-9791-1878b34793cf", // 2018 — clean "> 20 kHz" definition
      traps: [
        {
          title: "Ultrasonic does NOT travel faster than audible sound",
          body:
            "Distractors often pair higher frequency with higher speed. Wrong. Speed of sound is a property of the MEDIUM (T, elasticity, density) — frequency doesn't change it. " +
            "From \\(v = f\\lambda\\): when \\(f\\) goes up, \\(\\lambda\\) goes down; \\(v\\) is fixed.",
        },
      ],
    },

    // Concept 2 — applications and acronyms
    {
      kind: "reference" as const,
      slug: "sonar-and-applications",
      name: "SONAR, bats, medical imaging — applications of ultrasonic",
      intuition:
        "The reason ultrasonic gets so much exam love is its APPLICATIONS — short wavelength lets it resolve small objects, and pulses can be precisely timed for ranging. " +
        "SONAR (ships measuring sea depth and underwater objects), bats (echolocation), and medical sonography all work the same way: emit a pulse, time the echo, infer distance.",
      definition:
        "Two anchors to memorise: (1) the SONAR acronym and its underwater-distance application — uses **ultrasonic** waves, not audible; (2) the family of \"send pulse, time echo\" acronyms — SONAR (sound), RADAR (radio), LIDAR (light) — and which medium each works in.",
      table: {
        columns: ["Acronym / use", "Wave type", "Application / setting"],
        rows: [
          {
            cells: ["**SONAR**", "Ultrasonic (sound)", "Sound Navigation And Ranging — underwater distance / submarine / sea-depth"],
            noteAmber: "SONAR uses ultrasonic, NOT audible sound — easy distractor.",
          },
          {
            cells: ["**RADAR**", "Radio waves (EM)", "RAdio Detection And Ranging — aircraft / weather, works through air"],
          },
          {
            cells: ["**LIDAR**", "Light / laser (EM)", "LIght Detection And Ranging — surveying, autonomous vehicles, atmospheric science"],
          },
          {
            cells: ["**Bats / dolphins**", "Ultrasonic", "Echolocation — emit ultrasonic, receive reflected echo, infer obstacle position"],
          },
          {
            cells: ["**Medical sonography / ultrasound imaging**", "Ultrasonic", "Pulse + echo through soft tissue — pregnancy scans, organ imaging"],
          },
          {
            cells: ["**Industrial: defect detection, drilling**", "Ultrasonic", "Reflections inside metal reveal cracks; high-frequency vibration drills hard materials"],
          },
          {
            cells: ["**Ultrasonic cleaning**", "Ultrasonic", "High-frequency vibrations in a liquid bath dislodge contaminants from delicate parts"],
          },
        ],
        caption:
          "All three rows 4–7 work by the same principle as SONAR: emit pulse, measure echo, infer geometry. The only difference is medium.",
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
        { prompt: "SONAR stands for ___.", answer: "Sound Navigation And Ranging" },
        {
          prompt: "What kind of waves does SONAR use?",
          answer: "Ultrasonic",
          method: "NOT audible sound — ultrasonic gives better resolution + immunity to audible noise",
        },
        {
          prompt: "Bats detect obstacles by receiving reflected ___ waves.",
          answer: "Ultrasonic",
        },
        {
          prompt: "RADAR uses what kind of waves?",
          answer: "Radio waves (electromagnetic)",
          method: "RA dio D etection A nd R anging",
        },
        {
          prompt: "LIDAR uses what kind of waves?",
          answer: "Light (laser, electromagnetic)",
          method: "LI ght D etection A nd R anging",
        },
      ],
      pyqExampleId: "84bf2fe9-2880-47bd-8f29-003691b989cb", // 2025 — clean SONAR acronym test
      traps: [
        {
          title: "SONAR uses ULTRASONIC, not audible sound",
          body:
            "The instinct \"SONAR = SOund + NAvigation, so it's sound\" is right — but the relevant kind of sound is ULTRASONIC, not audible. " +
            "Distractor B (\"audible-range sound\") catches students who don't make this distinction.",
        },
        {
          title: "Bats use ULTRASONIC, not radio waves or microwaves",
          body:
            "Bats are biological — they emit and detect sound, not radio waves. Their echolocation calls are in the ultrasonic range (typically 20–100 kHz). " +
            "RADAR (radio) and microwave-based echolocation belong to technology, not bats.",
        },
      ],
    },
  ],
};
