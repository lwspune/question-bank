import type { SubtopicNote } from "@/app/notes/_types";

export const SCIENTIFIC_ACRONYMS_NOTE: SubtopicNote = {
  subtopicName: "Scientific Acronyms",
  title: "Scientific Acronyms: Full Forms to Memorise",
  oneLineDefinition:
    "A short list of physics-and-technology acronyms whose full forms the NDA tests directly — LED, LASER, LIGO and a few common companions.",
  whyItMatters:
    "Two PYQs, both pure recall of an acronym's expansion. " +
    "There is nothing to derive — just memorise the full forms. " +
    "LED (Light Emitting Diode) and LIGO (Laser Interferometer Gravitational-wave Observatory) have both appeared.",
  concepts: [
    // Concept 1 — device/optics acronyms (feature LED)
    {
      kind: "reference" as const,
      slug: "device-acronyms",
      name: "Device and optics acronyms — LED, LASER, LCD",
      intuition:
        "Everyday electronics carry physics acronyms. LED and LASER both involve light emission from controlled energy transitions. " +
        "The NDA simply asks for the full form, so memorise the expansion exactly.",
      definition:
        "Common device/optics acronyms:\n" +
        "- **LED** = **Light Emitting Diode** — a semiconductor that emits light when forward-biased.\n" +
        "- **LASER** = **Light Amplification by Stimulated Emission of Radiation**.\n" +
        "- **LCD** = **Liquid Crystal Display**.\n" +
        "- **CFL** = **Compact Fluorescent Lamp**.",
      table: {
        columns: ["Acronym", "Full form"],
        rows: [
          {
            cells: ["LED", "Light Emitting Diode"],
            noteAmber: "NDA 2018 / 2021 — LED stands for Light Emitting Diode.",
          },
          { cells: ["LASER", "Light Amplification by Stimulated Emission of Radiation"] },
          { cells: ["LCD", "Liquid Crystal Display"] },
          { cells: ["CFL", "Compact Fluorescent Lamp"] },
        ],
        caption:
          "LED = Light Emitting Diode. Note LASER's expansion turns on \"Stimulated Emission\".",
      },
      selfCheckExample: {
        prompt:
          "What is the full form of LED?",
        steps: [
          "LED is a semiconductor device that gives out light when current flows through it.",
          "It expands to Light Emitting Diode.",
        ],
        answer: "Light Emitting Diode.",
      },
      practiceSet: [
        { prompt: "Full form of LED?", answer: "Light Emitting Diode" },
        { prompt: "Full form of LASER?", answer: "Light Amplification by Stimulated Emission of Radiation" },
        { prompt: "Full form of LCD?", answer: "Liquid Crystal Display" },
        { prompt: "Is an LED a semiconductor device?", answer: "Yes", method: "it is a diode that emits light" },
      ],
      pyqExampleId: "8c59847b-9e5c-4682-b822-d2fc45485038", // 2018 — LED full form
      traps: [
        {
          title: "LED's D is DIODE, not Display",
          body:
            "LED = Light Emitting DIODE (a semiconductor). LCD = Liquid Crystal DISPLAY. Do not let the similar look swap the D-words.",
        },
      ],
    },

    // Concept 2 — big-science acronyms (feature LIGO)
    {
      kind: "reference" as const,
      slug: "big-science-acronyms",
      name: "Big-science and research acronyms — LIGO, LASER, MASER",
      intuition:
        "Large research facilities and effects have long acronyms. LIGO is the gravitational-wave observatory; expand it carefully because each word is tested.",
      definition:
        "Research-facility / advanced-physics acronyms:\n" +
        "- **LIGO** = **Laser Interferometer Gravitational-wave Observatory** — detected gravitational waves.\n" +
        "- **MASER** = **Microwave Amplification by Stimulated Emission of Radiation** (the microwave cousin of the laser).\n" +
        "- **SONAR** = **Sound Navigation and Ranging** (uses ultrasonic sound).\n" +
        "- **RADAR** = **Radio Detection and Ranging** (uses radio waves).",
      table: {
        columns: ["Acronym", "Full form"],
        rows: [
          {
            cells: ["LIGO", "Laser Interferometer Gravitational-wave Observatory"],
            noteAmber: "NDA 2019 — LIGO stands for Laser Interferometer Gravitational-wave Observatory.",
          },
          { cells: ["MASER", "Microwave Amplification by Stimulated Emission of Radiation"] },
          { cells: ["SONAR", "Sound Navigation and Ranging"] },
          { cells: ["RADAR", "Radio Detection and Ranging"] },
        ],
        caption:
          "LIGO opens with LASER and ends with OBSERVATORY. RADAR uses radio waves; SONAR uses sound.",
      },
      selfCheckExample: {
        prompt:
          "What does the acronym LIGO stand for?",
        steps: [
          "LIGO is the facility that first detected gravitational waves using laser interferometry.",
          "It expands to Laser Interferometer Gravitational-wave Observatory.",
        ],
        answer: "Laser Interferometer Gravitational-wave Observatory.",
      },
      practiceSet: [
        { prompt: "Full form of LIGO?", answer: "Laser Interferometer Gravitational-wave Observatory" },
        { prompt: "Full form of SONAR?", answer: "Sound Navigation and Ranging" },
        { prompt: "Full form of RADAR?", answer: "Radio Detection and Ranging" },
        { prompt: "LIGO uses what kind of beam to make its measurements?", answer: "Laser", method: "the L in LIGO is Laser" },
      ],
      pyqExampleId: "5e635033-a312-499a-bf10-2614018c9cb9", // 2019 — LIGO full form
      traps: [
        {
          title: "LIGO starts with LASER, not Light",
          body:
            "The first word of LIGO is \"Laser\" (the interferometer fires laser beams), giving Laser Interferometer Gravitational-wave Observatory. Do not expand the L as \"Light\".",
        },
      ],
    },
  ],
};
