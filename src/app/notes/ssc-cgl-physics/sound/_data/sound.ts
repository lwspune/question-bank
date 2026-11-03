import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FSO_SOUND_NOTE: SubtopicNote = {
  subtopicName: "Sound Waves and the Doppler Effect",
  title: "Sound Waves and the Doppler Effect",
  oneLineDefinition:
    "The wave equation and what changes when sound moves from air into water, the Doppler effect, and the range of human hearing.",
  whyItMatters:
    "Seven questions in the bank: one from the 2024 shifts and six from the 2025 shifts. Four use the one equation v = f x wavelength, so learn it with the rule that frequency never changes between media.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscfsoso-waves",
      name: "The wave equation",
      intuition:
        "Speed equals frequency times wavelength. The source fixes the frequency; the medium fixes the speed; so the wavelength adjusts.",
      definition:
        "The rules:\n" +
        "- **v = f x wavelength**.\n" +
        "- **Frequency stays the same** when sound passes from one medium to another.\n" +
        "- Sound is **faster in water** (about 1,500 m/s) than in air (about 340 m/s), so going from air into water its **wavelength grows**.\n" +
        "- Time = distance / speed.",
      formula: {
        latex: "v = f\\lambda",
        label: "Wave equation",
        symbols: [
          { symbol: "v", meaning: "Speed of the wave" },
          { symbol: "f", meaning: "Frequency" },
          { symbol: "\\(\\lambda\\)", meaning: "Wavelength" },
        ],
      },
      authoredExample: {
        prompt: "A sound of frequency 4 kHz has wavelength 8.5 cm. How long does it take to travel 1.7 km?",
        steps: ["v = 4000 x 0.085 = 340 m/s.", "t = 1700 / 340 = 5 s."],
        answer: "5 seconds.",
      },
      pyqExampleId: "2d62ffc9-8894-4a16-8675-09444e58d95f",
      selfCheckExample: {
        prompt: "A 500 Hz sound goes from air (340 m/s) into water (1,500 m/s). What happens to its frequency and its wavelength?",
        steps: ["Frequency is fixed by the source: still 500 Hz.", "Wavelength = v / f rises from 0.68 m to 3 m."],
        answer: "Frequency unchanged; wavelength increases.",
      },
      practiceSet: [
        { prompt: "Is sound faster in water or in air?", answer: "Water" },
        { prompt: "Which property of a wave never changes between media?", answer: "Frequency" },
        { prompt: "What is the wavelength of a 340 Hz sound at 340 m/s?", answer: "1 m" },
      ],
      traps: [
        {
          title: "Faster medium, longer wavelength",
          body: "Into water, speed **and** wavelength both increase. Options pairing a faster speed with a shorter wavelength are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfsoso-doppler",
      name: "The Doppler effect and hearing",
      intuition:
        "A train's whistle sounds higher as it comes towards you and lower as it goes away. If source and listener move together, nothing changes.",
      definition:
        "Doppler effect:\n" +
        "- The heard frequency changes with **relative motion** of source and listener: higher when they close in, lower when they separate.\n" +
        "- Source and listener moving at the **same speed in the same direction**: **no change**.\n\n" +
        "Hearing: humans hear about **20 Hz to 20,000 Hz**. Below is infrasound; above is ultrasound.",
      table: {
        columns: ["Case", "Heard frequency"],
        rows: [
          { cells: ["Train approaching", "Higher"] },
          { cells: ["Train moving away", "Lower"] },
          { cells: ["Both moving together", "Unchanged"], pyqExampleId: "2a2e4a0d-debd-407b-bed9-d169750c2e64" },
          { cells: ["Human hearing range", "20 to 20,000 Hz"], pyqExampleId: "a9b8d443-647e-4cd2-99d1-20e238144e84" },
        ],
      },
      pyqExampleId: "c4ad1ddf-fc5a-42b4-b567-4035fc6c4a42",
      selfCheckExample: {
        prompt: "What is sound above 20,000 Hz called, and sound below 20 Hz?",
        steps: ["Humans hear 20 to 20,000 Hz.", "Above that range is ultrasound; below it is infrasound."],
        answer: "Ultrasound; infrasound.",
      },
      practiceSet: [
        { prompt: "Does a whistle sound higher or lower as a train moves away?", answer: "Lower" },
        { prompt: "What is the upper limit of human hearing?", answer: "About 20,000 Hz" },
        { prompt: "Which effect explains a passing siren's change of pitch?", answer: "The Doppler effect" },
      ],
      traps: [
        {
          title: "No relative motion, no change",
          body: "If source and listener move **together** at the same speed, the frequency **does not change**. Options saying it rises are wrong.",
        },
      ],
    },
  ],
};
