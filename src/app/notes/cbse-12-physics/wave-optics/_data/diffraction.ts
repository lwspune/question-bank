import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_WO_DIFFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Diffraction",
  title: "Diffraction at a Single Slit",
  oneLineDefinition:
    "The single-slit diffraction pattern: where its minima and secondary maxima lie, why the maxima grow weaker, the width of the central maximum, how it differs from an interference pattern, and why sound bends round a wall when light does not.",
  whyItMatters:
    "28 questions, all of them from board papers. The board asks you to explain how the maxima and minima of a single slit form and why the maxima grow weaker (2022, 2024, 2026), find the position of a minimum or a secondary maximum (every year from 2022 to 2026), say how the central maximum changes with the slit width, the colour or the screen distance (2022, 2023, 2026), draw the intensity graph (every year from 2022 to 2026), give two differences between interference and diffraction patterns (every year), count the interference fringes inside the central maximum of a double slit (2023, 2024) and explain why sound bends round a wall and light does not (2023, 2025, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpwo-single-slit",
      name: "The single slit: minima, secondary maxima and the central maximum",
      intuition:
        "Treat every point of the wavefront inside the slit as a small source, all starting in step. Straight ahead they all arrive in step, so the centre is bright. Tilt the direction until the two edges of the slit differ in path by one wavelength. Now split the slit into two halves: every point in the top half has a partner in the bottom half exactly half a wavelength behind, and the pairs cancel. That direction is dark.",
      definition:
        "- A parallel beam falls normally on a slit LN of width a. The parts of the wavefront in the slit act as secondary sources, all in phase.\n" +
        "- At an angle \\(\\theta\\), the path difference between the two edges of the slit is \\(NP - LP \\approx a\\theta\\).\n" +
        "- **Central maximum** at \\(\\theta = 0\\): every part arrives in phase.\n" +
        "- **Minima** (zero intensity) at \\(\\theta = \\dfrac{n\\lambda}{a}\\), n = ±1, ±2, ±3, ... At \\(a\\theta = \\lambda\\), the two halves of the slit cancel in pairs.\n" +
        "- **Secondary maxima** at \\(\\theta \\approx (n + \\tfrac{1}{2})\\dfrac{\\lambda}{a}\\), n = 1, 2, 3, ... At \\(a\\theta = \\tfrac{3}{2}\\lambda\\), divide the slit into three parts: two cancel and one third of the slit is left, so this maximum is much weaker than the centre. At higher orders an ever smaller part is left, so the maxima grow weaker and weaker.\n" +
        "- On a screen at distance D, the first minimum is at \\(\\dfrac{\\lambda D}{a}\\), so the **central maximum** is \\(\\dfrac{2\\lambda D}{a}\\) wide (angular width \\(\\dfrac{2\\lambda}{a}\\)), twice the width of the other maxima.\n" +
        "- **Intensity graph:** a tall central peak, zeros at \\(\\theta = \\pm\\lambda/a, \\pm 2\\lambda/a, \\ldots\\), and small secondary peaks that fall away on each side.\n" +
        "- The present NCERT book states the positions of the minima and maxima and that the maxima grow weaker; the pairing argument above is what a full-marks answer to 'explain' (2022, 2024, 2026) needs.",
      formula: {
        label: "Single-slit minima and secondary maxima",
        latex: "\\theta_{\\min} = \\frac{n\\lambda}{a}, \\qquad \\theta_{\\max} \\approx \\left(n + \\tfrac{1}{2}\\right)\\frac{\\lambda}{a}, \\qquad \\text{central width} = \\frac{2\\lambda D}{a}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "width of the slit" },
          { symbol: "\\(D\\)", meaning: "distance from the slit to the screen" },
          { symbol: "\\(n\\)", meaning: "order: 1, 2, 3, ..." },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 500 nm falls normally on a slit 0.25 mm wide, and the pattern is seen on a screen 1.2 m away. Find the distance of the first minimum from the centre, the width of the central maximum, and the distance of the first secondary maximum.",
        steps: [
          "Given: \\(\\lambda = 500 \\times 10^{-9}\\) m, \\(a = 0.25 \\times 10^{-3}\\) m, \\(D = 1.2\\) m.",
          "First minimum: \\(y_1 = \\dfrac{\\lambda D}{a} = \\dfrac{500 \\times 10^{-9} \\times 1.2}{0.25 \\times 10^{-3}} = 2.4 \\times 10^{-3}\\) m \\(= 2.4\\) mm.",
          "Central maximum: \\(2y_1 = 4.8\\) mm wide.",
          "First secondary maximum: \\(\\dfrac{3}{2} \\times \\dfrac{\\lambda D}{a} = 1.5 \\times 2.4 = 3.6\\) mm.",
        ],
        answer: "2.4 mm; 4.8 mm; 3.6 mm",
      },
      selfCheckExample: {
        prompt: "Light of wavelength 480 nm falls on a slit 4 μm wide. At what angle is the second minimum?",
        steps: ["\\(\\sin\\theta = \\dfrac{2\\lambda}{a} = \\dfrac{2 \\times 480 \\times 10^{-9}}{4 \\times 10^{-6}} = 0.24\\)."],
        answer: "θ = sin⁻¹(0.24), about 14°",
      },
      practiceSet: [
        { prompt: "A slit is made narrower. What happens to the width of the central maximum?", answer: "It increases, since the width is \\(2\\lambda D/a\\)" },
        { prompt: "The waves from the two edges of a slit reach a point with a phase difference of \\(4\\pi\\). Is the point bright or dark?", answer: "Dark: the path difference is \\(2\\lambda\\), a minimum" },
        { prompt: "The screen is moved further from the slit. What happens to the angular width of the central maximum?", answer: "Nothing: \\(2\\lambda/a\\) has no D in it. Its width on the screen increases" },
      ],
      pyqExampleId: "76fb6031-06ad-42e0-9516-6248ba0d557f",
      traps: [
        {
          title: "Using the double-slit conditions",
          body: "In a single slit, \\(a\\sin\\theta = n\\lambda\\) gives a MINIMUM, and the secondary maxima are at \\((n + \\tfrac{1}{2})\\lambda/a\\). In a double slit, \\(n\\lambda\\) gives a maximum. Swapping them is the commonest error here.",
        },
        {
          title: "Taking the central maximum as λD/a wide",
          body: "\\(\\lambda D/a\\) reaches only from the centre to the first minimum. The central maximum runs from one first minimum to the other: \\(2\\lambda D/a\\).",
        },
        {
          title: "No graph where marks are given",
          body: "'Depict the intensity distribution' wants a sketch of intensity against \\(\\theta\\): a broad central peak, zeros labelled at \\(\\pm\\lambda/a\\) and \\(\\pm 2\\lambda/a\\), and small secondary peaks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpwo-compare",
      name: "Interference and diffraction compared",
      intuition:
        "Both patterns come from adding waves. Interference adds the waves from a few sources, usually two slits. Diffraction adds the wavelets from very many points of one wavefront in a single opening. The board wants clear points of difference, each one naming both patterns.",
      definition:
        "- **Interference:** superposition of waves from two coherent sources, such as the two slits of Young's experiment.\n" +
        "- **Diffraction:** superposition of the secondary wavelets from different points of the same wavefront inside one slit.\n" +
        "- The double-slit pattern is in fact the single-slit diffraction of each slit together with the double-slit interference pattern.\n" +
        "- In both, light energy is only redistributed; there is no gain or loss of energy.",
      table: {
        columns: ["Point of difference", "Interference (double slit)", "Diffraction (single slit)"],
        rows: [
          {
            cells: ["Where the waves come from", "Two separate coherent sources", "Different points of one wavefront in a single slit"],
            noteAmber: "The board asked for two differences in every year from 2022 to 2026.",
          },
          { cells: ["Width of the fringes", "All fringes of equal width", "Central maximum twice as wide as the others"] },
          { cells: ["Brightness of the maxima", "All bright fringes equally bright", "Brightness falls sharply after the central maximum"] },
          { cells: ["At the angle \\(\\lambda\\) divided by the slit size", "A maximum, at \\(\\theta = \\lambda/d\\)", "A minimum, at \\(\\theta = \\lambda/a\\)"] },
        ],
      },
      practiceSet: [
        { prompt: "Looking at a pattern on a screen, give two signs that it came from a single slit.", answer: "The central band is twice as wide as the others, and the bright bands fade quickly away from the centre" },
        { prompt: "One slit of a double slit is covered. What pattern is now seen?", answer: "The single-slit diffraction pattern of the open slit" },
      ],
      pyqExampleId: "ac282b1e-5cab-4e37-82b3-129fb21399c8",
      traps: [
        {
          title: "A difference that covers one side only",
          body: "'Fringes are of equal width' is not a difference by itself. Write both halves: equal width in interference, a central maximum twice as wide in diffraction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-envelope",
      name: "Interference fringes inside the central diffraction maximum",
      intuition:
        "Each slit of a double slit also diffracts. So the fine interference fringes are spread out under the broad single-slit pattern, like stripes painted on a hill. Only the stripes on the central hill are bright, and how many fit there depends on how wide the hill is compared with the spacing of the stripes.",
      definition:
        "- The double-slit pattern is the single-slit diffraction of each slit together with the double-slit interference pattern.\n" +
        "- The central diffraction maximum spans an angle \\(\\dfrac{2\\lambda}{a}\\), where a is the width of each slit.\n" +
        "- The interference fringes are \\(\\dfrac{\\lambda}{d}\\) apart in angle, where d is the distance between the slits.\n" +
        "- Number of interference fringes inside the central maximum: \\(N = \\dfrac{2\\lambda/a}{\\lambda/d} = \\dfrac{2d}{a}\\). The wavelength cancels.\n" +
        "- The present NCERT book only states that the double-slit pattern is this combination. The counting was asked in 2023 and in a 2024 case study.",
      formula: {
        label: "Fringes inside the central diffraction maximum",
        latex: "N = \\frac{2\\lambda / a}{\\lambda / d} = \\frac{2d}{a}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance between the two slits" },
          { symbol: "\\(a\\)", meaning: "width of each slit" },
        ],
      },
      authoredExample: {
        prompt: "Two slits, each 0.1 mm wide, are 0.5 mm apart. How many interference fringes lie within the central maximum of the diffraction pattern?",
        steps: [
          "Given: \\(a = 0.1\\) mm, \\(d = 0.5\\) mm.",
          "Formula: \\(N = \\dfrac{2d}{a}\\).",
          "\\(N = \\dfrac{2 \\times 0.5}{0.1} = 10\\).",
        ],
        answer: "10 fringes",
      },
      selfCheckExample: {
        prompt: "Two slits are 0.9 mm apart. How wide must each slit be for 12 interference fringes to lie within the central diffraction maximum?",
        steps: ["\\(a = \\dfrac{2d}{N} = \\dfrac{2 \\times 0.9}{12} = 0.15\\) mm."],
        answer: "0.15 mm",
      },
      practiceSet: [
        { prompt: "Does a change of wavelength change the number of interference fringes inside the central diffraction maximum?", answer: "No: \\(N = 2d/a\\) has no \\(\\lambda\\) in it" },
        { prompt: "The width of each slit is halved, with the slits the same distance apart. What happens to the number of fringes inside the central maximum?", answer: "It doubles" },
      ],
      pyqExampleId: "f67c10d2-219c-4f29-b9cf-a7f82a68872e",
      traps: [
        {
          title: "Using the slit separation for the diffraction minimum",
          body: "The single-slit minimum uses the width a of one slit: \\(\\sin\\theta = \\lambda/a\\). The fringe spacing uses the separation d. A case study gives both, so check which one each part needs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpwo-sound-light",
      name: "When diffraction is noticeable: sound and light",
      intuition:
        "Every wave bends round an edge, but how much it bends depends on the wavelength compared with the size of the gap or obstacle. Sound has wavelengths of the same size as doors and walls, so it bends round them easily. Light's wavelength is far smaller than anything around us, so it goes almost straight and casts sharp shadows.",
      definition:
        "- Diffraction is shown by all kinds of waves: sound, light, water waves and matter waves.\n" +
        "- It is noticeable only when the opening or obstacle is comparable in size to the wavelength. The light spreads through an angle of about \\(\\lambda/a\\).\n" +
        "- The wavelength of light is much smaller than most obstacles, so we do not see the diffraction of light in everyday life.\n" +
        "- Diffraction sets the limit on how much detail the eye, a telescope or a microscope can show. The colours seen on a CD are a diffraction effect.\n" +
        "- Interference and diffraction happen for sound too; polarisation happens only for transverse waves such as light.",
      table: {
        columns: ["Wave", "Wavelength", "Compared with a wall or a doorway", "Result"],
        rows: [
          { cells: ["Sound", "Centimetres to metres", "About the same size", "Bends round the edge: you hear the person behind the wall"] },
          { cells: ["Light", "About 400 nm to 700 nm", "Millions of times smaller", "Goes almost straight: you cannot see the person"] },
          { cells: ["Light through a very narrow slit", "About 400 nm to 700 nm", "Comparable to the slit width", "Spreads out into a diffraction pattern"] },
        ],
      },
      practiceSet: [
        { prompt: "Light of wavelength 500 nm passes through an opening 0.5 mm wide. About what angle does it spread through?", answer: "About \\(\\lambda/a = 10^{-3}\\) rad" },
        { prompt: "What sets the limit on how close two stars can be and still be seen as two in a telescope?", answer: "Diffraction of light at the telescope's opening" },
        { prompt: "Can sound waves in air be polarised?", answer: "No: sound in air is longitudinal, and polarisation needs a transverse wave" },
      ],
      pyqExampleId: "925780e7-008e-441d-98e5-9435e3736555",
      traps: [
        {
          title: "Saying light does not diffract",
          body: "Light does diffract. The effect is too small to notice in daily life because its wavelength is tiny compared with everyday objects. Always compare the wavelength with the size of the obstacle.",
        },
      ],
    },
  ],
};
