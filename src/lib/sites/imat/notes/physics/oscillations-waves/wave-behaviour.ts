import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_OSW_BEHAVIOUR_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Waves and Interference",
  title: "The Electromagnetic Spectrum, Diffraction and Interference",
  oneLineDefinition:
    "Light is one band of a spectrum of electromagnetic waves that all travel at c in a vacuum; like every wave they reflect, refract, diffract and interfere.",
  whyItMatters:
    "The one past question here is from the 2026 ministry paper and asked what makes two waves coherent. The rest of the page is syllabus that has not been tested yet.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-osw-em-spectrum",
      name: "The electromagnetic spectrum: order, wavelengths and uses",
      intuition:
        "Radio waves, light and X-rays are the same kind of wave: oscillating electric and magnetic fields. They differ only in wavelength, and so in frequency and in the energy each photon carries. Short wavelength means high frequency and high energy, which is why gamma rays, X-rays and ultraviolet can damage cells.",
      definition:
        "- All electromagnetic waves are **transverse**, need **no medium**, and travel at \\(c = 3.00 \\times 10^8\\ \\text{m/s}\\) in a vacuum, so \\(c = f\\lambda\\).\n" +
        "- In order of **increasing wavelength** (decreasing frequency): gamma, X-rays, ultraviolet, visible, infrared, microwaves, radio.\n" +
        "- Visible light runs from violet (about 400 nm) to red (about 700 nm).\n" +
        "- Photon energy \\(E = hf\\) rises with frequency. Gamma, X-rays and high-energy ultraviolet are **ionising**.",
      table: {
        columns: ["Region", "Typical wavelength", "Use or source"],
        rows: [
          { cells: ["Gamma rays", "Below about \\(10^{-11}\\ \\text{m}\\)", "Radiotherapy, sterilising medical equipment, radioactive decay"] },
          { cells: ["X-rays", "About \\(10^{-11}\\) to \\(10^{-8}\\ \\text{m}\\)", "Imaging bones and teeth, CT scans"] },
          { cells: ["Ultraviolet", "About 10 nm to 400 nm", "Sterilising water, vitamin D in the skin, sunburn"] },
          { cells: ["Visible light", "About 400 nm to 700 nm", "Sight, optical fibres, photosynthesis"] },
          { cells: ["Infrared", "About 700 nm to 1 mm", "Heat radiation, remote controls, thermal cameras"] },
          { cells: ["Microwaves", "About 1 mm to 30 cm", "Microwave ovens, mobile phones, radar"] },
          { cells: ["Radio waves", "Above about 30 cm", "Radio and TV broadcasting, MRI scanners"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A radio station broadcasts at 100 MHz. Taking \\(c = 3.0 \\times 10^8\\ \\text{m/s}\\), what is the wavelength of its signal?",
        options: ["0.33 m", "30 m", "3.0 m", "\\(3.0 \\times 10^6\\ \\text{m}\\)", "\\(3.0 \\times 10^{16}\\ \\text{m}\\)"],
        steps: [
          "100 MHz is \\(1.0 \\times 10^8\\ \\text{Hz}\\).",
          "\\(\\lambda = c/f = 3.0 \\times 10^8 / 1.0 \\times 10^8 = 3.0\\ \\text{m}\\).",
          "Option A divides the wrong way round; D treats MHz as \\(10^2\\) Hz; E multiplies.",
        ],
        answer: "(C) 3.0 m",
      },
      practiceSet: [
        { prompt: "Which has the higher frequency: ultraviolet or infrared?", answer: "Ultraviolet" },
        { prompt: "What is the wavelength of light of frequency \\(5.0 \\times 10^{14}\\ \\text{Hz}\\)?", answer: "\\(6.0 \\times 10^{-7}\\ \\text{m}\\) (600 nm)", method: "\\(\\lambda = c/f\\)" },
        { prompt: "Name the three ionising regions of the spectrum.", answer: "Gamma rays, X-rays and (high-energy) ultraviolet" },
        { prompt: "Put in order of increasing frequency: visible, radio, X-rays, microwaves.", answer: "Radio, microwaves, visible, X-rays" },
      ],
      traps: [
        {
          title: "All electromagnetic waves have the same speed in a vacuum",
          body: "Gamma rays and radio waves both travel at \\(3.00 \\times 10^8\\ \\text{m/s}\\) in a vacuum. What differs is the frequency and wavelength. Radio waves are not sound waves: they are electromagnetic and cross a vacuum.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-osw-wave-properties",
      name: "Reflection, refraction, diffraction and polarisation of waves",
      intuition:
        "Every kind of wave, from ripples to light, does the same few things at a boundary or a gap. It bounces back, it bends as its speed changes, and it spreads round edges. How much it spreads depends on how the gap compares with its wavelength, which is why sound bends round a doorway but light hardly does.",
      definition:
        "- **Reflection**: the angle of incidence equals the angle of reflection, both measured from the normal.\n" +
        "- **Refraction**: a change of speed at a boundary bends the wave if it arrives at an angle. Frequency stays; speed and wavelength change.\n" +
        "- **Diffraction**: spreading after passing through a gap or round an edge. It is strongest when the gap is about one wavelength wide.\n" +
        "- **Polarisation**: restricting the vibrations to one plane. Only **transverse** waves can be polarised, so sound cannot.",
      table: {
        columns: ["Behaviour", "What happens", "What changes", "Example"],
        rows: [
          { cells: ["Reflection", "The wave bounces off a boundary", "Direction only", "An echo; an image in a mirror"] },
          { cells: ["Refraction", "The wave bends as it changes speed entering a new medium", "Speed, wavelength and direction; not frequency", "A straw looking bent in water"] },
          { cells: ["Diffraction", "The wave spreads out after a gap or an edge", "Direction spreads; speed, frequency and wavelength stay", "Hearing a voice round a corner"] },
          { cells: ["Polarisation", "Vibrations are limited to one plane", "Plane of vibration", "Polarising sunglasses cutting glare"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why can you hear someone talking in the next room through an open door, but not see them?",
        options: [
          "Sound travels faster than light",
          "Light is a longitudinal wave and cannot bend",
          "Sound is reflected by walls but light is not",
          "Light is absorbed completely by air",
          "Sound wavelengths are similar to the width of the door, so sound diffracts round it; light's wavelength is far too small",
        ],
        steps: [
          "Diffraction is strong when the gap is about one wavelength. Speech has wavelengths of tens of centimetres to a metre or so, close to a door's width.",
          "Visible light has wavelengths below a micrometre, so it barely spreads through a door.",
          "Option A is false (light is far faster); B is false (light is transverse); C is false (light reflects too).",
        ],
        answer: "(E) Sound wavelengths are similar to the width of the door, so sound diffracts round it; light's wavelength is far too small",
      },
      practiceSet: [
        { prompt: "Which property of a wave never changes when it is refracted?", answer: "Its frequency" },
        { prompt: "Can sound waves be polarised?", answer: "No: they are longitudinal" },
        { prompt: "A gap is much wider than the wavelength. Is the diffraction strong or weak?", answer: "Weak" },
      ],
      traps: [
        {
          title: "Diffraction does not change the wavelength",
          body: "After a gap the wave spreads out, but its speed, frequency and wavelength are the same as before. Only refraction, a change of medium, changes the wavelength.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-osw-interference",
      name: "Superposition, coherence, interference and standing waves",
      intuition:
        "When two waves meet, their displacements simply add. Crest on crest gives a bigger wave; crest on trough cancels. For the pattern of loud and quiet spots to stay put, the two sources must keep in step, with a phase difference that never changes. That is coherence. Two waves travelling in opposite directions along a string add up to a standing wave, with points that never move.",
      definition:
        "- **Superposition**: where waves overlap, the resulting displacement is the sum of the separate displacements.\n" +
        "- Two sources are **coherent** if they have the **same frequency** and a **constant phase difference**. Only coherent sources give a steady interference pattern. Equal amplitude is not required.\n" +
        "- **Path difference** \\(\\Delta\\) from two coherent sources in phase: \\(\\Delta = n\\lambda\\) gives **constructive** interference (loud, bright); \\(\\Delta = (n + \\tfrac{1}{2})\\lambda\\) gives **destructive** (quiet, dark).\n" +
        "- A **standing wave** has **nodes** (no motion) and **antinodes** (largest motion). Neighbouring nodes are \\(\\lambda/2\\) apart.\n" +
        "- On a string of length \\(L\\) fixed at both ends, \\(L\\) holds a whole number \\(n\\) of half-wavelengths: \\(\\lambda_n = 2L/n\\). The fundamental (\\(n = 1\\)) has \\(\\lambda = 2L\\).",
      formula: {
        label: "Interference conditions and a string fixed at both ends",
        latex: "\\Delta = n\\lambda \\ \\text{(constructive)} \\qquad \\Delta = \\left(n + \\tfrac{1}{2}\\right)\\lambda \\ \\text{(destructive)} \\qquad \\lambda_n = \\frac{2L}{n}",
        symbols: [
          { symbol: "\\(\\Delta\\)", meaning: "path difference from the two sources, in m" },
          { symbol: "\\(n\\)", meaning: "a whole number (0, 1, 2, … for interference; 1, 2, 3, … for the string)" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength, in m" },
          { symbol: "\\(L\\)", meaning: "length of the string, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "Two loudspeakers play the same 680 Hz tone in phase. Sound travels at 340 m/s. A listener is 4.00 m from one speaker and 4.75 m from the other. Is the sound loud or quiet there?",
        steps: [
          "\\(\\lambda = v/f = 340/680 = 0.50\\ \\text{m}\\).",
          "Path difference: \\(4.75 - 4.00 = 0.75\\ \\text{m}\\).",
          "\\(0.75/0.50 = 1.5\\), so \\(\\Delta = 1.5\\lambda\\), a whole number plus a half: destructive interference.",
        ],
        answer: "Quiet: the waves arrive half a cycle out of step",
      },
      selfCheckExample: {
        prompt:
          "A string 0.90 m long, fixed at both ends, vibrates in a standing wave with three antinodes. What is the wavelength?",
        options: ["0.30 m", "0.45 m", "0.60 m", "0.90 m", "2.7 m"],
        steps: [
          "Three antinodes means three half-wavelengths fit on the string: \\(n = 3\\).",
          "\\(\\lambda = 2L/n = 2 \\times 0.90 / 3 = 0.60\\ \\text{m}\\).",
          "Option A takes each loop as a full wavelength; E multiplies by 3 instead of dividing.",
        ],
        answer: "(C) 0.60 m",
      },
      practiceSet: [
        { prompt: "What makes two wave sources coherent?", answer: "The same frequency and a constant phase difference" },
        { prompt: "Two in-phase sources give a path difference of \\(2\\lambda\\) at a point. Loud or quiet?", answer: "Loud (constructive)" },
        { prompt: "How far apart are neighbouring nodes in a standing wave?", answer: "Half a wavelength" },
        { prompt: "Two waves of amplitude 3 cm meet crest to crest. What is the resulting amplitude?", answer: "6 cm" },
      ],
      traps: [
        {
          title: "Coherence is about phase, not amplitude or brightness",
          body: "Two waves are coherent when their phase difference stays constant in time, which needs equal frequencies. A strong wave and a weak one can be perfectly coherent, and so can two radio or sound waves: coherence is about keeping in step.",
        },
        {
          title: "Nodes are half a wavelength apart, not a whole one",
          body: "In a standing wave each loop between neighbouring nodes is \\(\\lambda/2\\) long. Counting a loop as a whole wavelength halves every wavelength you work out.",
        },
      ],
    },
  ],
};
