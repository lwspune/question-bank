import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WO_WAVEFRONTS_NOTE: SubtopicNote = {
  subtopicName: "Wavefronts and Interference",
  title: "Wavefronts and Interference",
  oneLineDefinition:
    "Wavefronts and Huygens' principle, what light keeps and what it changes in a medium, coherent sources, and how bright the screen is where two coherent waves overlap.",
  whyItMatters:
    "Two NEET questions so far. Re-NEET 2024 asked which pairs of waves can give an interference pattern (only waves of the same frequency with a fixed phase difference), and NEET 2026 asked for the intensity where the path difference is λ/3, given the intensity where it is λ. Both rest on the ideas of this page, and the double slit page builds on them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwo-coherence",
      name: "Wavefronts and coherent sources",
      intuition:
        "Drop a stone in still water and rings spread out. Every point on one ring moves up and down in step: that ring is a wavefront. Light spreads the same way, and Huygens saw that each point on a wavefront acts like a tiny new source. Two beams of light make a steady pattern only if they keep in step with each other, and two separate lamps never do.",
      definition:
        "- A **wavefront** is a surface on which every point vibrates in the same phase. Light travels along the normal to the wavefront.\n" +
        "- A point source gives a spherical wavefront. Far from the source, a small part of it is a plane wavefront, as with sunlight.\n" +
        "- **Huygens' principle:** every point of a wavefront sends out secondary wavelets at the speed of the wave. The surface touching all of them in the forward direction is the new wavefront.\n" +
        "- Entering a medium of refractive index \\(\\mu\\), light keeps its frequency. Its speed and wavelength both fall by the factor \\(\\mu\\).\n" +
        "- **Coherent sources** have the same frequency and a constant phase difference. Only they give a steady (sustained) interference pattern.\n" +
        "- Two independent lamps are never coherent, even if they look identical, because the phase of each changes at random. Young's experiment gets two coherent sources by splitting the light of one source with two slits.",
      formula: {
        label: "Light in a medium",
        latex: "v = \\frac{c}{\\mu}, \\qquad \\lambda' = \\frac{\\lambda}{\\mu}, \\qquad \\nu' = \\nu",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "refractive index of the medium" },
          { symbol: "\\(\\lambda'\\)", meaning: "wavelength inside the medium" },
          { symbol: "\\(\\nu\\)", meaning: "frequency, the same in every medium" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 600 nm in air enters glass of refractive index 1.5. Find its speed, wavelength and frequency in the glass.",
        steps: [
          "Speed: \\(v = \\dfrac{c}{\\mu} = \\dfrac{3 \\times 10^{8}}{1.5} = 2 \\times 10^{8}\\ \\text{m/s}\\).",
          "Wavelength: \\(\\lambda' = \\dfrac{600}{1.5} = 400\\ \\text{nm}\\).",
          "Frequency stays as in air: \\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^{8}}{6 \\times 10^{-7}} = 5 \\times 10^{14}\\ \\text{Hz}\\).",
        ],
        answer: "\\(2 \\times 10^{8}\\ \\text{m/s}\\), 400 nm, \\(5 \\times 10^{14}\\ \\text{Hz}\\)",
      },
      selfCheckExample: {
        prompt:
          "Light from a distant star reaches the Earth. What is the shape of a small part of its wavefront here, and in which direction does the light travel compared with that wavefront?",
        steps: [
          "The star is a point source, so its wavefronts are spheres.",
          "So far away, a small part of a huge sphere is flat: a plane wavefront.",
          "Light always travels along the normal to the wavefront.",
        ],
        answer: "A plane wavefront; the light travels at right angles to it",
      },
      practiceSet: [
        { prompt: "According to Huygens' principle, what does each point on a wavefront do?", answer: "It sends out secondary wavelets; their forward envelope is the new wavefront" },
        { prompt: "Light passes from air into water. Which of its speed, wavelength and frequency stays the same?", answer: "Frequency" },
        { prompt: "Light of wavelength 500 nm in air enters a medium of refractive index 1.25. What is its wavelength in the medium?", answer: "400 nm" },
        { prompt: "Why do two separate sodium lamps not give a steady interference pattern?", answer: "Their phase difference keeps changing, so they are not coherent" },
      ],
      pyqExampleId: "b801c53d-3615-4bff-be1d-996c50126f63",
      traps: [
        {
          title: "Frequency never changes at a boundary",
          body: "In a denser medium the speed and the wavelength both fall by \\(\\mu\\), but the frequency is set by the source and stays the same.",
        },
        {
          title: "Same frequency is not enough",
          body: "Coherent sources need the same frequency AND a constant phase difference. Waves such as \\(a\\sin\\omega t\\) and \\(a\\sin 2\\omega t\\) have different frequencies, so they cannot give a steady pattern.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwo-intensity",
      name: "Superposition and resultant intensity",
      intuition:
        "Where two coherent waves meet, their displacements add. If they arrive in step, crest on crest, the light is bright; if a crest meets a trough, they cancel and the point is dark. Whether they arrive in step depends on how much further one wave has travelled. No light is lost: it is only moved from the dark places to the bright ones.",
      definition:
        "- A path difference \\(\\Delta x\\) gives a phase difference \\(\\phi = \\dfrac{2\\pi}{\\lambda}\\,\\Delta x\\).\n" +
        "- **Constructive** (bright): \\(\\Delta x = n\\lambda\\). **Destructive** (dark): \\(\\Delta x = \\left(n + \\tfrac{1}{2}\\right)\\lambda\\), with \\(n = 0, 1, 2, \\dots\\)\n" +
        "- Two coherent waves of equal intensity \\(I_0\\): \\(I = 4I_0\\cos^{2}\\dfrac{\\phi}{2}\\). The brightest is \\(4I_0\\), the darkest is zero.\n" +
        "- Amplitudes add, not intensities: in phase the amplitude doubles, so the intensity, which goes as amplitude squared, becomes four times.\n" +
        "- Two coherent waves of unequal intensities \\(I_1\\) and \\(I_2\\): \\(I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi\\), so \\(I_{\\max} = (\\sqrt{I_1} + \\sqrt{I_2})^{2}\\) and \\(I_{\\min} = (\\sqrt{I_1} - \\sqrt{I_2})^{2}\\).\n" +
        "- Two incoherent sources: the phase difference changes all the time, the cosine averages to zero, and \\(I = 2I_0\\) everywhere, with no fringes.",
      formula: {
        label: "Two equal coherent waves",
        latex: "\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x, \\qquad I = 4I_0\\cos^{2}\\frac{\\phi}{2}, \\qquad I_{\\max} = 4I_0",
        symbols: [
          { symbol: "\\(\\Delta x\\)", meaning: "path difference" },
          { symbol: "\\(\\phi\\)", meaning: "phase difference" },
          { symbol: "\\(I_0\\)", meaning: "intensity of each wave alone" },
        ],
      },
      authoredExample: {
        prompt:
          "Two sources each give an intensity of 5 units at a point on their own. Find the largest and smallest intensity there if they are coherent, and the intensity if they are incoherent.",
        steps: [
          "Coherent and in phase: \\(I_{\\max} = 4I_0 = 4 \\times 5 = 20\\) units.",
          "Coherent and exactly out of phase: the amplitudes cancel, so \\(I_{\\min} = 0\\).",
          "Incoherent: intensities simply add, \\(I = 2I_0 = 10\\) units.",
        ],
        answer: "20 units and 0 if coherent; 10 units if incoherent",
      },
      selfCheckExample: {
        prompt:
          "Two coherent waves from one source reach a point after travelling 3.0 μm and 4.5 μm. The wavelength is 600 nm. Is the point bright or dark?",
        steps: [
          "Path difference: \\(4.5 - 3.0 = 1.5\\ \\mu\\text{m}\\).",
          "In wavelengths: \\(\\dfrac{1.5\\ \\mu\\text{m}}{0.6\\ \\mu\\text{m}} = 2.5\\), that is \\(\\left(2 + \\tfrac{1}{2}\\right)\\lambda\\).",
          "A path difference of a whole number plus a half wavelength is destructive.",
        ],
        answer: "Dark",
      },
      practiceSet: [
        { prompt: "What path difference between two coherent waves gives a dark point?", answer: "An odd multiple of half a wavelength, \\(\\left(n + \\tfrac{1}{2}\\right)\\lambda\\)" },
        { prompt: "Two coherent waves meet with a path difference of half a wavelength. What is their phase difference?", answer: "\\(\\pi\\)" },
        { prompt: "Two incoherent lamps each give intensity \\(I_0\\) at a point. What is the total intensity there?", answer: "\\(2I_0\\)" },
        { prompt: "Two coherent waves, each of intensity \\(I_0\\), meet in phase. What is the resultant intensity?", answer: "\\(4I_0\\)" },
      ],
      pyqExampleId: "bf40c564-df77-41ca-a690-1579ddaf0ba1",
      traps: [
        {
          title: "Half the phase inside the cosine",
          body: "The intensity is \\(4I_0\\cos^{2}(\\phi/2)\\), not \\(4I_0\\cos^{2}\\phi\\). For a phase difference of \\(2\\pi/3\\) the cosine is taken of \\(\\pi/3\\).",
        },
        {
          title: "Path is not phase",
          body: "Turn a path difference into a phase difference first, with \\(\\phi = 2\\pi\\Delta x/\\lambda\\). A path difference of \\(\\lambda/3\\) is a phase difference of \\(2\\pi/3\\).",
        },
        {
          title: "In phase gives four times, not two",
          body: "Two equal waves in phase double the amplitude, and intensity goes as amplitude squared, so the bright fringe is \\(4I_0\\). Adding intensities to get \\(2I_0\\) is right only for incoherent light.",
        },
      ],
    },
  ],
};
