import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SO_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Sound Waves and Their Speed",
  title: "Sound Waves and Their Speed",
  oneLineDefinition:
    "Sound is a longitudinal mechanical wave that needs a material medium, and it travels fastest in solids, slower in liquids and slowest in gases.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE: which wave needs a material medium, where sound is fastest, air against water, what affects the speed most, and what heat does to it. Every one is answered by the order solids, liquids, gases and the fact that warm air carries sound faster.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisowa-wave",
      name: "Sound as a mechanical wave: v = fλ",
      intuition:
        "A vibrating object pushes the air next to it, that air pushes the next layer, and so on, so a pattern of squeezed and stretched air travels outwards. With no particles to push, as in a vacuum, there is no sound.",
      definition:
        "- Sound is a **mechanical** wave: it needs a **material medium** (solid, liquid or gas) and cannot travel through a vacuum.\n" +
        "- It is **longitudinal**: the particles move back and forth along the direction the wave travels, making **compressions** and **rarefactions**.\n" +
        "- Speed \\(=\\) frequency \\(\\times\\) wavelength, \\(v = f\\lambda\\). Frequency is in hertz (Hz).\n" +
        "- Humans hear about **20 Hz to 20 kHz**. Below 20 Hz is **infrasound**; above 20 kHz is **ultrasound**.",
      formula: {
        label: "Wave speed",
        latex: "v = f\\lambda \\qquad T = \\frac{1}{f}",
        symbols: [
          { symbol: "v", meaning: "speed of the wave, in m/s" },
          { symbol: "f", meaning: "frequency, in hertz" },
          { symbol: "λ", meaning: "wavelength, in metres" },
          { symbol: "T", meaning: "time period, in seconds" },
        ],
      },
      authoredExample: {
        prompt: "A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m. Find its speed.",
        steps: ["\\(v = f\\lambda = 500 \\times 0.68 = 340\\) m/s."],
        answer: "340 m/s",
      },
      selfCheckExample: {
        prompt: "Sound travels at 340 m/s in air. Find the wavelength of a note of frequency 170 Hz.",
        steps: ["\\(\\lambda = \\frac{v}{f} = \\frac{340}{170} = 2\\) m."],
        answer: "2 m",
      },
      practiceSet: [
        { prompt: "Is sound a transverse or a longitudinal wave?", answer: "Longitudinal" },
        { prompt: "What is the range of frequencies a human ear can hear?", answer: "About 20 Hz to 20 kHz" },
        { prompt: "What is sound above 20 kHz called?", answer: "Ultrasound" },
        { prompt: "A sound has a frequency of 250 Hz. What is its time period?", answer: "\\(\\frac{1}{250} = 0.004\\) s" },
      ],
      pyqExampleId: "22c5af21-a6b3-476a-abbd-26f811bd19ad",
      traps: [
        {
          title: "Thinking light needs a medium too",
          body: "Light is an electromagnetic wave and crosses empty space from the Sun. Only mechanical waves, like sound, need a material medium.",
        },
        {
          title: "Calling sound transverse",
          body: "Sound in air is longitudinal: the air moves back and forth along the wave's path, making compressions and rarefactions.",
        },
        {
          title: "Leaving kilohertz unconverted",
          body: "Change kHz to Hz before using \\(v = f\\lambda\\). A 2 kHz note at 340 m/s has \\(\\lambda = \\frac{340}{2000} = 0.17\\) m, not 170 m.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisowa-speed",
      name: "How fast sound travels, and what changes it",
      intuition:
        "Sound is passed from particle to particle. In a solid the particles are tightly bound, so the push passes on fastest; in a gas they are far apart, so it passes slowest. The medium matters far more than anything else.",
      definition:
        "- Order of speed: **solids > liquids > gases**. In a vacuum sound does not travel at all.\n" +
        "- The **nature of the medium** has by far the biggest effect.\n" +
        "- In air, the speed **rises with temperature**, by about 0.6 m/s for each degree Celsius, and rises slightly with humidity.\n" +
        "- The source, the loudness and the pitch do **not** change the speed in a given medium.",
      table: {
        columns: ["Medium", "Speed of sound"],
        rows: [
          { cells: ["Vacuum", "Sound cannot travel"] },
          { cells: ["Air at 0 °C", "about 331 m/s"] },
          { cells: ["Air at 20 °C", "about 343 m/s"] },
          { cells: ["Water", "about 1500 m/s, over four times the speed in air"] },
          {
            cells: ["Steel", "about 5000 to 6000 m/s"],
            noteAmber: "Fastest of the media the questions use.",
          },
        ],
        caption: "Warmer air carries sound faster; colder air carries it slower.",
      },
      selfCheckExample: {
        prompt: "Arrange water, air and iron in increasing order of the speed of sound in them.",
        steps: ["Gases are slowest, then liquids, then solids."],
        answer: "Air, water, iron",
      },
      practiceSet: [
        { prompt: "What happens to the speed of sound in air when the air gets warmer?", answer: "It increases" },
        { prompt: "Does a louder sound travel faster than a soft one in the same air?", answer: "No, loudness does not change the speed" },
        { prompt: "Is sound faster in humid air or in dry air at the same temperature?", answer: "In humid air, slightly" },
        { prompt: "A train's sound reaches you through the steel rail before it reaches you through the air. Why?", answer: "Sound travels faster in solids than in air" },
      ],
      pyqExampleId: "8a23f784-123e-4cbd-93c0-4ffc4c45f7bf",
      traps: [
        {
          title: "Sound is fastest in air",
          body: "Air is the slowest of the three. Sound is fastest in solids such as steel, then liquids such as water, then gases.",
        },
        {
          title: "The source sets the speed",
          body: "Who or what makes the sound does not matter. In one medium at one temperature, every sound travels at the same speed.",
        },
        {
          title: "Heat slows sound down",
          body: "In air it is the reverse: the speed rises as the temperature rises.",
        },
        {
          title: "Sound is slower in water than in air",
          body: "Sound travels over four times as fast in water (about 1500 m/s) as in air (about 340 m/s), because a liquid's particles are closer together.",
        },
      ],
    },
  ],
};
