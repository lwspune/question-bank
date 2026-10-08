import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_OSW_WAVES_SOUND_NOTE: SubtopicNote = {
  subtopicName: "Waves and Sound",
  title: "Waves, Sound and the Doppler Effect",
  oneLineDefinition:
    "A wave carries energy without carrying matter; its speed is frequency times wavelength, and sound is a longitudinal wave that needs a medium.",
  whyItMatters:
    "No past question has been set on this page yet. It is core syllabus, and a question on it is usually one line: v = fλ, an echo time, or which way a pitch shifts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-osw-wave-basics",
      name: "Transverse and longitudinal waves, and v = fλ",
      intuition:
        "Flick one end of a rope and a bump runs along it, but each bit of rope only moves up and down and comes back. A wave moves energy, not material. In one period the source sends out one wavelength, so the wave travels one wavelength per period: speed equals frequency times wavelength.",
      definition:
        "- In a **transverse** wave the particles vibrate **at right angles** to the direction the wave travels (waves on a string, water ripples, all electromagnetic waves).\n" +
        "- In a **longitudinal** wave they vibrate **along** the direction of travel, making compressions and rarefactions (sound).\n" +
        "- **Wavelength** \\(\\lambda\\): distance between neighbouring crests (or compressions). **Frequency** \\(f\\): waves per second. **Period** \\(T = 1/f\\).\n" +
        "- The **source** sets the frequency. When a wave passes into a new medium its **frequency stays the same**, while its speed and wavelength change together.",
      formula: {
        label: "Wave speed",
        latex: "v = f\\lambda \\qquad T = \\frac{1}{f}",
        symbols: [
          { symbol: "\\(v\\)", meaning: "wave speed, in m/s" },
          { symbol: "\\(f\\)", meaning: "frequency, in Hz" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength, in m" },
          { symbol: "\\(T\\)", meaning: "period, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "The end of a long rope is moved up and down 15 times in 5.0 s. The crests are 0.50 m apart. Find the frequency, period and speed of the wave.",
        steps: [
          "\\(f = 15 / 5.0 = 3.0\\ \\text{Hz}\\), so \\(T = 1/3.0 \\approx 0.33\\ \\text{s}\\).",
          "\\(v = f\\lambda = 3.0 \\times 0.50 = 1.5\\ \\text{m/s}\\).",
        ],
        answer: "3.0 Hz; 0.33 s; 1.5 m/s",
      },
      selfCheckExample: {
        prompt:
          "A 440 Hz sound passes from air, where it travels at 340 m/s, into water, where it travels at 1480 m/s. What is its wavelength in the water?",
        options: ["0.30 m", "3.4 m", "0.77 m", "4.4 m", "\\(6.5 \\times 10^5\\ \\text{m}\\)"],
        steps: [
          "The frequency stays 440 Hz in the water.",
          "\\(\\lambda = v/f = 1480/440 \\approx 3.4\\ \\text{m}\\).",
          "Option C is the wavelength in air; A divides the wrong way round; D is the ratio of the two speeds; E multiplies.",
        ],
        answer: "(B) 3.4 m",
      },
      practiceSet: [
        { prompt: "A wave has frequency 50 Hz and wavelength 4.0 m. What is its speed?", answer: "200 m/s" },
        { prompt: "What is the period of a 250 Hz wave?", answer: "0.004 s (4 ms)", method: "\\(T = 1/f\\)" },
        { prompt: "A wave travels at 12 m/s with frequency 4.0 Hz. What is its wavelength?", answer: "3.0 m", method: "\\(\\lambda = v/f\\)" },
        { prompt: "Is sound a transverse or a longitudinal wave?", answer: "Longitudinal" },
      ],
      traps: [
        {
          title: "The frequency does not change in a new medium",
          body: "When a wave enters a new medium its speed and wavelength change, but its frequency is fixed by the source. Options in which the frequency changes at a boundary are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-osw-sound",
      name: "Sound: speed, pitch, loudness and echoes",
      intuition:
        "Sound is a chain of squeezes and stretches passed from molecule to molecule, so it needs something to travel through. It is fastest where the particles are tightly linked, in solids, and slowest in gases. An echo is the same sound returning from a surface, and it has to go there and back.",
      definition:
        "- Sound needs a medium; it cannot cross a vacuum. Typical speeds: air about 340 m/s (faster in warmer air), water about 1500 m/s, steel about 5000 m/s.\n" +
        "- **Pitch** is set by the **frequency**; **loudness** by the **amplitude** (the intensity).\n" +
        "- Humans hear roughly 20 Hz to 20 kHz. **Ultrasound** is above 20 kHz and is used in medical imaging; **infrasound** is below 20 Hz.\n" +
        "- The **decibel** scale is logarithmic: each extra 10 dB multiplies the intensity by 10, so +20 dB is 100 times the intensity.\n" +
        "- In an **echo** the sound travels to the reflector and back, so the distance is half of speed times time.",
      formula: {
        label: "Distance from an echo",
        latex: "d = \\frac{v\\,t}{2}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance to the reflecting surface, in m" },
          { symbol: "\\(v\\)", meaning: "speed of sound in the medium, in m/s" },
          { symbol: "\\(t\\)", meaning: "time between sending and hearing the echo, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "An ultrasound pulse sent into the body returns from a boundary between two organs after \\(6.5 \\times 10^{-5}\\ \\text{s}\\). Sound travels at 1540 m/s in soft tissue. How deep is the boundary?",
        steps: [
          "Total path: \\(1540 \\times 6.5 \\times 10^{-5} \\approx 0.100\\ \\text{m}\\), there and back.",
          "Depth: half of that, \\(0.050\\ \\text{m}\\), so about 5.0 cm.",
        ],
        answer: "About 5.0 cm",
      },
      selfCheckExample: {
        prompt:
          "The sound level near a machine rises from 40 dB to 70 dB. By what factor has the sound intensity increased?",
        options: ["1.75", "3", "30", "1000", "10 000"],
        steps: [
          "The rise is 30 dB, which is three steps of 10 dB.",
          "Each step multiplies the intensity by 10: \\(10^3 = 1000\\).",
          "Option A divides the decibel values as if the scale were linear; C treats each decibel as one unit of intensity.",
        ],
        answer: "(D) 1000",
      },
      practiceSet: [
        { prompt: "You shout at a cliff and hear the echo 1.2 s later. Sound travels at 340 m/s. How far away is the cliff?", answer: "204 m", method: "\\(340 \\times 1.2 / 2\\)" },
        { prompt: "A note's frequency is doubled. What happens to what you hear?", answer: "The pitch rises (by an octave)" },
        { prompt: "Can sound travel through outer space?", answer: "No: there is no medium" },
        { prompt: "In which does sound travel fastest: air, water or steel?", answer: "Steel" },
      ],
      traps: [
        {
          title: "An echo goes there and back",
          body: "The time of an echo covers the trip to the reflector and back. The distance is \\(vt/2\\); using \\(vt\\) gives twice the true distance, and that answer is usually among the options.",
        },
        {
          title: "Louder is not higher",
          body: "Loudness depends on amplitude; pitch depends on frequency. Turning up the volume makes a note louder without changing its pitch.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-osw-doppler",
      name: "The Doppler effect in words",
      intuition:
        "A moving source sends out each new wave a little closer to the waves ahead of it, so in front of the source the waves are bunched and behind it they are stretched. Bunched waves arrive more often, so a listener ahead hears a higher pitch. Nothing about the source itself changes.",
      definition:
        "- The **Doppler effect** is the change in observed frequency when the source and the observer move relative to each other.\n" +
        "- **Approaching**: shorter wavelength reaches you, **higher** frequency. **Receding**: longer wavelength, **lower** frequency.\n" +
        "- The bigger the relative speed, the bigger the shift. The frequency the source emits does not change, and the speed of sound in the air is not changed by the source's motion.\n" +
        "- It applies to light too: a galaxy moving away shows a **red shift** (longer wavelengths).",
      table: {
        columns: ["Situation", "Frequency heard or seen", "Example"],
        rows: [
          { cells: ["Source moving towards you", "Higher than emitted", "An ambulance siren as it approaches"] },
          { cells: ["Source moving away from you", "Lower than emitted", "The same siren after it has passed"] },
          { cells: ["You moving towards a still source", "Higher: you meet the waves more often", "Driving towards a ringing alarm"] },
          { cells: ["No relative motion", "Same as emitted", "Standing next to a parked car sounding its horn"] },
          { cells: ["Light from a galaxy moving away", "Shifted to longer wavelengths (red shift)", "Evidence that the universe is expanding"] },
          { cells: ["Ultrasound reflected from moving blood", "Shifted by an amount that depends on the blood's speed", "Doppler ultrasound scans of arteries and the fetal heart"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A car sounding its horn drives past a pedestrian at a steady speed. What does the pedestrian hear?",
        options: [
          "A higher pitch as the car approaches, then a lower pitch as it moves away",
          "A pitch that rises steadily the whole time",
          "A lower pitch as the car approaches, then a higher pitch as it moves away",
          "The same pitch throughout, only louder and then quieter",
          "A higher pitch throughout, because sound travels faster from a moving source",
        ],
        steps: [
          "Approaching: waves bunched, higher frequency. Moving away: waves stretched, lower frequency.",
          "The pitch drops as the car passes; it does not rise steadily (B) or stay the same (D).",
          "Option E is wrong because the speed of sound is set by the air, not by the source.",
        ],
        answer: "(A) A higher pitch as the car approaches, then a lower pitch as it moves away",
      },
      practiceSet: [
        { prompt: "A source moves towards you. Is the wavelength you receive longer or shorter?", answer: "Shorter" },
        { prompt: "Does the frequency the source emits change when it moves?", answer: "No: only the frequency observed changes" },
        { prompt: "What does a red shift in a star's light tell you?", answer: "The star is moving away from us" },
      ],
      traps: [
        {
          title: "A moving source does not make sound travel faster",
          body: "The speed of sound depends on the medium only. A moving source changes the wavelength and so the frequency heard, not the wave's speed through the air.",
        },
      ],
    },
  ],
};
