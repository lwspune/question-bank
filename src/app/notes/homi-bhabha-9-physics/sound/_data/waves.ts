import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SO_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Frequency, Pitch and Loudness",
  title: "Frequency, Pitch and Loudness",
  oneLineDefinition:
    "A sound wave's speed, frequency and wavelength are tied by v = fλ, its time period is 1/f, its pitch follows its frequency and its loudness follows its amplitude.",
  whyItMatters:
    "Six questions in the bank, three EASY and three MODERATE: three use v = fλ or T = 1/f (two of them are the same tuning-fork question, asked in 2017 and again in 2021), one reads the frequency off a graph, and two compare waves drawn side by side for pitch and loudness.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9sowa-relations",
      name: "Wave speed, frequency and time period: v = fλ",
      intuition:
        "Frequency is how many waves leave the source each second; wavelength is the length of one wave. If 100 waves, each 3 m long, leave every second, the front of the sound has gone 300 m in that second. So speed is frequency times wavelength. The time for one wave is the time period, and it is just 1 divided by the frequency.",
      definition:
        "- **Frequency (f)**: the number of vibrations in one second, in **hertz (Hz)**. 1 kHz = 1000 Hz.\n" +
        "- **Wavelength (λ)**: the distance between two neighbouring compressions (or rarefactions), in metres.\n" +
        "- **Time period (T)**: the time for one vibration. \\(T = \\frac{1}{f}\\). 1 ms = 0.001 s.\n" +
        "- **Wave speed**: \\(v = f\\lambda\\). In one medium the speed is fixed, so a higher frequency means a shorter wavelength.\n" +
        "- **Reading a graph**: find the time from one crest to the next crest (one full wave). That is T; then \\(f = \\frac{1}{T}\\).",
      formula: {
        label: "Wave relations",
        latex: "v = f\\lambda \\qquad T = \\frac{1}{f}",
        symbols: [
          { symbol: "v", meaning: "speed of the wave, in m/s" },
          { symbol: "f", meaning: "frequency, in hertz (Hz)" },
          { symbol: "λ", meaning: "wavelength, in metres" },
          { symbol: "T", meaning: "time period, in seconds" },
        ],
      },
      authoredExample: {
        prompt: "A siren gives out a note of frequency 250 Hz on a hot day when sound travels at 350 m/s. Find the wavelength and the time period of the sound.",
        steps: [
          "Wavelength: \\(\\lambda = \\frac{v}{f} = \\frac{350}{250} = 1.4\\) m.",
          "Time period: \\(T = \\frac{1}{f} = \\frac{1}{250} = 0.004\\) s.",
        ],
        answer: "Wavelength 1.4 m, time period 0.004 s",
      },
      selfCheckExample: {
        prompt: "One vibration of a sound wave takes 0.025 s. What is its frequency?",
        steps: ["\\(f = \\frac{1}{T} = \\frac{1}{0.025} = 40\\) Hz."],
        answer: "40 Hz",
      },
      practiceSet: [
        { prompt: "Sound of wavelength 2 m travels at 340 m/s. What is its frequency?", answer: "\\(\\frac{340}{2} = 170\\) Hz" },
        { prompt: "A sound wave has a time period of 0.01 s. What is its frequency?", answer: "100 Hz" },
        { prompt: "On a graph of a sound wave, one full wave takes 4 ms. What is the frequency?", answer: "\\(\\frac{1}{0.004} = 250\\) Hz" },
        { prompt: "In the same air, the frequency of a note is doubled. What happens to its wavelength?", answer: "It becomes half, because the speed stays the same" },
      ],
      pyqExampleId: "3b80e765-3e4b-40c0-af98-be0f4bfd0618",
      traps: [
        {
          title: "Leaving ms or kHz unconverted",
          body: "Change milliseconds to seconds and kilohertz to hertz first. A time period of 2 ms is 0.002 s, so the frequency is 500 Hz, not 0.5 Hz.",
        },
        {
          title: "Multiplying instead of dividing for the time period",
          body: "The time period is 1 divided by the frequency. For 50 Hz it is \\(\\frac{1}{50} = 0.02\\) s, not 50 s.",
        },
        {
          title: "Thinking a higher note travels faster",
          body: "In one medium every sound travels at the same speed. A higher frequency only shortens the wavelength.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sowa-pitch",
      name: "Pitch, loudness and reading a wave diagram",
      intuition:
        "A bee's buzz is shrill and a lion's roar is deep: that is pitch, and it comes from how fast the source vibrates. A shout and a whisper of the same word differ in loudness: that comes from how far the particles swing, the amplitude. On a drawing of a wave, count the waves for pitch and measure their height for loudness.",
      definition:
        "- **Pitch** depends on **frequency**: higher frequency, higher (shriller) pitch.\n" +
        "- **Loudness** depends on **amplitude**: larger amplitude, louder sound. Loudness is measured in **decibels (dB)**.\n" +
        "- **Quality (timbre)** depends on the **shape** of the wave: it lets you tell a flute from a violin playing the same note.\n" +
        "- A **musical note** has a regular, repeating wave; **noise** has an irregular wave.\n" +
        "- **Comparing two drawn waves over the same time**: more waves means higher frequency and pitch; taller waves mean larger amplitude and a louder sound.",
      table: {
        columns: ["Property", "Depends on", "What to look for in a wave diagram"],
        rows: [
          { cells: ["Pitch", "Frequency", "More complete waves in the same time: higher pitch"] },
          { cells: ["Loudness", "Amplitude", "Taller crests and deeper troughs: louder; a small amplitude is a soft sound"] },
          { cells: ["Quality (timbre)", "Shape of the wave", "Two waves of the same frequency and height but different shapes"] },
          { cells: ["Noise", "Irregular vibration", "A jagged wave with no repeating pattern"] },
        ],
        caption: "Pitch and loudness are separate: a high note can be soft and a low note can be loud.",
      },
      selfCheckExample: {
        prompt: "Two sound waves are drawn over the same time. Wave P shows 4 complete waves and wave Q shows 8, and both are equally tall. Which has the higher pitch, and which is louder?",
        steps: ["Q has more waves in the same time, so its frequency and pitch are higher.", "Both have the same amplitude, so they are equally loud."],
        answer: "Q has the higher pitch; they are equally loud.",
      },
      practiceSet: [
        { prompt: "On what does the loudness of a sound depend?", answer: "On the amplitude of its wave" },
        { prompt: "In what unit is the loudness of sound measured?", answer: "Decibel (dB)" },
        { prompt: "Which has the higher frequency, the buzz of a mosquito or the roar of a lion?", answer: "The buzz of a mosquito" },
        { prompt: "A singer sings the same note softly and then loudly. What changes in the sound wave?", answer: "Only the amplitude increases; the frequency stays the same" },
      ],
      pyqExampleId: "3cfb892f-0500-484b-8173-a21c9b82d748",
      traps: [
        {
          title: "Mixing up pitch and loudness",
          body: "Pitch comes from frequency and loudness from amplitude. A soft wave has a small height, whatever its number of waves.",
        },
        {
          title: "Reading the taller wave as the higher pitch",
          body: "Height is amplitude, which decides loudness. For pitch, count how many complete waves fit into the same time.",
        },
        {
          title: "Calling every wave in a diagram a note",
          body: "An irregular, jagged wave is noise. A musical note repeats the same shape again and again.",
        },
      ],
    },
  ],
};
