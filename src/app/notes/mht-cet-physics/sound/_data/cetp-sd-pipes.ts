import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/sound";

export const PIPES_NOTE: SubtopicNote = {
  subtopicName: "Pipes, Resonance, Overtones, and Beats",
  title: "Organ Pipes, Resonance and Beats",
  oneLineDefinition:
    "A pipe open at both ends vibrates at every multiple of v/2L, a pipe closed at one end only at the odd multiples of v/4L; a resonance tube picks out the lengths λ/4, 3λ/4, 5λ/4…, and two close frequencies heard together beat at their difference.",
  whyItMatters:
    "22 PYQs, 6 of them HARD. Fourteen compare pipes — fundamental and overtones of open and closed pipes, overtones matched between two pipes, end corrections, the harmonic a pipe picks out. " +
    "Eight are resonance tubes, strings and beats: water poured into a tube, a string resonating with a pipe, sets of tuning forks, and a wire's tension changed without changing the beats. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-sd-organ-pipes",
      name: "Open and Closed Pipes",
      intuition:
        "An open pipe has antinodes at both ends and fits any whole number of half wavelengths: fₙ = nv/2L, all harmonics, the fundamental twice a same-length closed pipe's. A closed pipe has a node at the closed end and fits odd quarter wavelengths: f = (2n − 1)v/4L, odd harmonics only. Count overtones carefully: the pth overtone of an open pipe is harmonic p + 1; of a closed pipe, harmonic 2p + 1. Matching two pipes means setting these equal. End correction adds about 0.6r per open end, so it grows with the pipe's width. A tube dipped so only a quarter of it is above water becomes a closed pipe of that quarter length.",
      definition:
        "- **Open**: \\(f_n = \\dfrac{nv}{2L}\\), all harmonics; pth overtone = harmonic \\(p + 1\\).\n" +
        "- **Closed**: \\(f = \\dfrac{(2n - 1)v}{4L}\\), odd harmonics; pth overtone = harmonic \\(2p + 1\\).\n" +
        "- Same length: \\(f_{\\text{open}} = 2f_{\\text{closed}}\\). First overtones equal ⇒ \\(L_c : L_o = 3 : 4\\).\n" +
        "- End correction ≈ 0.6r per open end: open pipe \\(f = \\dfrac{v}{2(l + 1.2r)}\\).\n" +
        "- Closed pipe, second overtone (5th harmonic): 3 nodes and 3 antinodes.\n" +
        "- Two open pipes joined: \\(\\dfrac{1}{f} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}\\).",
      formula: {
        label: "Pipe frequencies",
        latex: "f_{\\text{open}} = \\frac{nv}{2L}, \\qquad f_{\\text{closed}} = \\frac{(2n - 1)v}{4L}",
      },
      authoredExample: {
        prompt: "The first overtone of a closed pipe equals the fundamental of an open pipe 50 cm long. Length of the closed pipe?",
        steps: ["Closed first overtone = 3v/4L_c; open fundamental = v/(2 × 0.5) = v.", "3/(4L_c) = 1 ⇒ L_c = 75 cm."],
        answer: "75 cm",
      },
      selfCheckExample: {
        prompt: "A closed pipe 25 cm long, v = 340 m/s. Fundamental and next resonant frequency?",
        steps: ["v/4L = 340 Hz; then 3 × 340."],
        answer: "340 Hz and 1020 Hz",
      },
      practiceSet: [
        { prompt: "A 60 cm open pipe (v = 330 m/s) resonates with 2.2 kHz. Which harmonic?", answer: "Eighth" },
        { prompt: "Fundamental of a closed pipe L equals the second overtone of an open pipe XL. X?", answer: "6" },
      ],
      pyqExampleId: "c8022e83-b22f-480b-a307-c0be6013306e",
      traps: [
        {
          title: "Numbering overtones as harmonics",
          body:
            "The first overtone is the SECOND harmonic of an open pipe but the THIRD of a closed pipe. Convert every overtone to its harmonic before setting frequencies equal.",
        },
        {
          title: "Allowing even harmonics in a closed pipe",
          body:
            "A closed pipe has only odd harmonics: v/4L, 3v/4L, 5v/4L. There is no 2v/4L.",
        },
        {
          title: "Adding one end correction to an open pipe",
          body:
            "An open pipe has two open ends, so its effective length is l + 1.2r (0.6r at each end); a closed pipe adds only 0.6r.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-sd-resonance-beats",
      name: "Resonance Tubes, Strings and Beats",
      intuition:
        "A resonance tube is a closed pipe whose length you set by pouring in water: it resonates when the air column is λ/4, 3λ/4, 5λ/4…; the least water needed is the tube height minus the longest resonant length that fits. A string of length l has frequencies (n/2l)√(T/μ), where μ is mass per unit LENGTH, so the mass is μl. Its frequency goes as √T and, for wires of one material, as 1/(r l). Two frequencies f₁ and f₂ together beat |f₁ − f₂| times a second. If the beat count stays the same while the string's frequency moves from one side of the fork to the other, the fork lies exactly between them.",
      definition:
        "- Resonance tube: air column \\(\\dfrac{(2n - 1)\\lambda}{4}\\); least water = height − longest fitting column (λ = 1 m in 1.5 m ⇒ 25 cm).\n" +
        "- String: \\(f_n = \\dfrac{n}{2l}\\sqrt{\\dfrac{T}{\\mu}}\\), mass = μl; same material: \\(f \\propto \\dfrac{\\sqrt{T}}{rl}\\).\n" +
        "- Beats = \\(|f_1 - f_2|\\); forks rising by x each: last = first + (N − 1)x.\n" +
        "- Same beats at T₁ and T₂ ⇒ fork between: \\(\\dfrac{f - b}{f + b} = \\sqrt{\\dfrac{T_1}{T_2}}\\) (225 N, 256 N, 6 beats ⇒ 186 Hz).",
      formula: {
        label: "Strings and beats",
        latex: "f_n = \\frac{n}{2l}\\sqrt{\\frac{T}{\\mu}}, \\qquad f_{\\text{beat}} = |f_1 - f_2|",
      },
      authoredExample: {
        prompt: "A 340 Hz fork is held over a 1 m tube (v = 340 m/s). Heights of water at which resonance occurs?",
        steps: ["λ = 1 m; air columns 25 cm and 75 cm fit.", "Water heights 75 cm and 25 cm."],
        answer: "75 cm and 25 cm",
      },
      selfCheckExample: {
        prompt: "A fork of 512 Hz and a wire give 5 beats; tightening the wire a little reduces the beats. Wire's frequency?",
        steps: ["Tightening raises the wire's frequency toward 512."],
        answer: "507 Hz",
      },
      practiceSet: [
        { prompt: "41 forks, each 5 beats above the last, the last an octave of the first. First and last?", answer: "200 Hz and 400 Hz" },
      ],
      pyqExampleId: "e2625ae5-b065-43ba-8d7c-2c1cf634d9cf",
      traps: [
        {
          title: "Reporting mass per unit length as the mass",
          body:
            "√(T/μ) gives μ in kg/m. A 0.5 m string with μ = 0.02 kg/m has mass 10 g, not 20 g.",
        },
        {
          title: "Adding frequencies to get beats",
          body:
            "Two notes beat at the DIFFERENCE of their frequencies. 256 Hz and 260 Hz give 4 beats a second.",
        },
        {
          title: "Taking the first resonance for the least water",
          body:
            "The least water gives the LONGEST air column that still resonates. In a 1.5 m tube with λ = 1 m, that is 1.25 m of air and 25 cm of water.",
        },
      ],
    },
  ],
  related: [
    { label: "Sound Waves", href: `${BASE}/cetp-sd-waves` },
    { label: "Doppler Effect", href: `${BASE}/cetp-sd-doppler` },
  ],
};
