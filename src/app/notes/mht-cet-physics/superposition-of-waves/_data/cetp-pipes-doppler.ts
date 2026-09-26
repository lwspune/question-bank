import type { SubtopicNote } from "@/app/notes/_types";

export const PIPES_DOPPLER_NOTE: SubtopicNote = {
  subtopicName: "Pipes, Resonance Tube, and Doppler Effect",
  title: "Organ Pipes, the Resonance Tube and the Doppler Effect",
  oneLineDefinition:
    "An open pipe has antinodes at both ends and sounds every harmonic of v/2L; a closed pipe has a node at the closed end and sounds only the odd harmonics of v/4L; end corrections lengthen the air column, and a moving source or listener shifts the frequency heard.",
  whyItMatters:
    "23 PYQs, five HARD. Three shapes: the frequencies and overtones of open and closed pipes (including a pipe dipped in water, which becomes closed), end corrections and the resonance tube, " +
    "and the Doppler formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-organ-pipes",
      name: "Open and Closed Pipes",
      intuition:
        "An open end is free, so it is an antinode; a closed end is blocked, so it is a node. An open pipe fits half a wavelength and all its multiples; a closed pipe fits only a quarter-wavelength and its odd multiples — so it is an octave lower and missing every even harmonic.",
      definition:
        "- Open: \\(n_p = \\dfrac{pv}{2L}\\), all harmonics; \\(p\\)th overtone = \\((p + 1)\\)th harmonic.\n" +
        "- Closed: \\(n = \\dfrac{(2p - 1)v}{4L}\\), odd harmonics only; the \\(p\\)th overtone is the \\((2p + 1)\\)th harmonic. Its fundamental is half the open pipe's of the same length.\n" +
        "- A pipe dipped in water becomes closed with the air length above the water: 80% immersed makes \\(n_2 = \\dfrac{v}{4(0.2L)}\\).\n" +
        "- End correction \\(e = 0.6r\\): open pipe length \\(l + 2e\\), closed \\(l + e\\). Resonance tube: \\(l_1 + e = \\dfrac{\\lambda}{4}\\), \\(l_2 + e = \\dfrac{3\\lambda}{4}\\).\n" +
        "- A closed pipe's second overtone (5th harmonic) has 3 nodes and 3 antinodes.",
      formula: {
        label: "Pipe frequencies",
        latex: "n_{\\text{open}} = \\frac{pv}{2L}, \\qquad n_{\\text{closed}} = \\frac{(2p - 1)v}{4L}",
      },
      authoredExample: {
        prompt: "A 0.5 m pipe, sound at 340 m/s. Fundamental if open, and the first three frequencies if one end is closed?",
        steps: ["Open: \\(\\dfrac{340}{1} = 340\\) Hz.", "Closed: \\(\\dfrac{340}{2} = 170\\) Hz, then 510 and 850 Hz (odd multiples)."],
        answer: "340 Hz; 170, 510, 850 Hz",
      },
      selfCheckExample: {
        prompt: "An open pipe 50 cm long has internal radius 1 cm. Its effective length with end corrections?",
        steps: ["Two ends: \\(50 + 2(0.6)\\) cm."],
        answer: "51.2 cm",
      },
      practiceSet: [
        { prompt: "Sum of the first three overtones of a closed pipe is 3930 Hz. Fundamental?", answer: "262 Hz" },
        { prompt: "Open pipe's 2nd overtone equals closed pipe's (length L) 1st overtone. Open pipe length?", answer: "2L" },
        { prompt: "An open pipe's total end correction (both ends) is 0.8 cm. Internal radius?", answer: "\\(\\dfrac{2}{3}\\) cm (\\(1.2r = 0.8\\))" },
      ],
      pyqExampleId: "3c8cb748-931f-414d-bdb6-79bedae1e301",
      traps: [
        {
          title: "Numbering a closed pipe's overtones like an open one's",
          body:
            "A closed pipe has no even harmonics, so its first overtone is the 3RD harmonic and its second the 5th. Counting 2nd, 3rd as for an open pipe gives the wrong frequency every time.",
        },
        {
          title: "One end correction for an open pipe",
          body:
            "An open pipe has TWO open ends, so its effective length is \\(l + 2e\\); a closed pipe has one, \\(l + e\\). Using \\(l + e\\) for an open pipe is the planted wrong wavelength.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-doppler",
      name: "The Doppler Effect",
      intuition:
        "A listener moving toward the source meets the wave crests sooner; a source moving toward the listener crowds its crests together. Either way the pitch rises. A car sounding its horn at a wall is both: the wall hears a moving source, and the driver hears the echo as a moving listener.",
      definition:
        "- \\(n = n_0\\dfrac{v \\pm v_L}{v \\mp v_S}\\): upper signs when they approach each other.\n" +
        "- Car at speed \\(u\\) toward a wall, hearing its own echo: \\(n = n_0\\dfrac{v + u}{v - u}\\).\n" +
        "- Moving apart: both signs flip, and the pitch falls.",
      formula: {
        label: "Doppler effect",
        latex: "n = n_0\\,\\frac{v + v_L}{v - v_S} \\quad (\\text{approaching})",
      },
      authoredExample: {
        prompt: "A 340 Hz source moves at 20 m/s toward a stationary listener; sound travels at 340 m/s. Frequency heard?",
        steps: ["\\(n = 340 \\times \\dfrac{340}{340 - 20} = 340 \\times \\dfrac{340}{320} \\approx 361\\) Hz."],
        answer: "≈ 361 Hz",
      },
      selfCheckExample: {
        prompt: "Source and listener both approach each other. Which terms change in the formula?",
        steps: ["Listener: numerator \\(v + v_L\\); source: denominator \\(v - v_S\\)."],
        answer: "\\(n_0\\dfrac{v + v_L}{v - v_S}\\)",
      },
      practiceSet: [
        { prompt: "Does the pitch rise or fall as a source recedes?", answer: "Fall" },
      ],
      pyqExampleId: "f5857bac-98b5-45f6-b004-a3c6abb070f6",
      traps: [
        {
          title: "Putting the source's speed in the numerator",
          body:
            "The LISTENER's speed goes on top, the SOURCE's underneath. Approaching means plus on top and minus below — both push the pitch up.",
        },
      ],
    },
  ],
  related: [
    { label: "Stationary Waves and Strings", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-stationary-waves" },
    { label: "Beats", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-beats" },
  ],
};
