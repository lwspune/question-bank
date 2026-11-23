import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WO_POLARISATION_NOTE: SubtopicNote = {
  subtopicName: "Diffraction and Polarisation",
  title: "Diffraction and Polarisation",
  oneLineDefinition:
    "Single slit diffraction and the width of its central maximum, polaroids and Malus' law, and polarisation by reflection at Brewster's angle.",
  whyItMatters:
    "Five NEET questions from 2024 to 2026. Two use Brewster's law (NEET 2024 and NEET 2025), two send light through three polaroids (Re-NEET 2024 and NEET 2025), and one (NEET 2026) asked whether interference and diffraction keep energy conserved and whether only light shows them. Four of the five are on polarisation, all of them from 2024 or 2025.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwo-diffraction",
      name: "Single slit diffraction",
      intuition:
        "Light passing a narrow slit does not make a sharp shadow: it spreads a little into the region behind the edges. Think of the slit as many tiny sources side by side. Straight ahead they are all in step, so the centre is brightest. At the angle where the two edges of the slit differ in path by one wavelength, the top half of the slit cancels the bottom half and the screen is dark.",
      definition:
        "- **Minima** (dark): \\(a\\sin\\theta = n\\lambda\\), \\(n = \\pm 1, \\pm 2, \\dots\\) For small angles \\(\\theta \\approx n\\lambda/a\\).\n" +
        "- Secondary maxima lie roughly halfway between the minima, near \\(\\theta \\approx \\left(n + \\tfrac{1}{2}\\right)\\dfrac{\\lambda}{a}\\), and get fainter as n grows.\n" +
        "- **Central maximum:** from the first minimum on one side to the first on the other. Angular width \\(\\dfrac{2\\lambda}{a}\\); on a screen at distance D its width is \\(\\dfrac{2\\lambda D}{a}\\), twice that of the other bright bands.\n" +
        "- A narrower slit spreads the light more. Diffraction is easy to notice only when the slit is not much wider than the wavelength.\n" +
        "- In interference and diffraction light energy is only moved: less in the dark regions, more in the bright ones. Energy is conserved.\n" +
        "- All waves diffract and interfere: sound and water waves as well as light.",
      formula: {
        label: "Single slit",
        latex: "a\\sin\\theta = n\\lambda \\ (\\text{minima}), \\qquad \\text{central width} = \\frac{2\\lambda D}{a}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "width of the slit" },
          { symbol: "\\(D\\)", meaning: "distance from the slit to the screen" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 600 nm falls on a slit 0.2 mm wide, and the pattern is seen on a screen 1 m away. Find the angle of the first minimum and the width of the central maximum.",
        steps: [
          "First minimum: \\(\\theta \\approx \\dfrac{\\lambda}{a} = \\dfrac{6 \\times 10^{-7}}{2 \\times 10^{-4}} = 3 \\times 10^{-3}\\ \\text{rad}\\).",
          "Central width: \\(\\dfrac{2\\lambda D}{a} = 2 \\times 3 \\times 10^{-3} \\times 1 = 6 \\times 10^{-3}\\ \\text{m}\\).",
        ],
        answer: "\\(3 \\times 10^{-3}\\) rad; 6 mm",
      },
      selfCheckExample: {
        prompt:
          "In a single slit experiment with light of wavelength 500 nm, the first minimum is at 30°. Find the width of the slit.",
        steps: [
          "First minimum: \\(a\\sin\\theta = \\lambda\\), so \\(a = \\dfrac{\\lambda}{\\sin 30^\\circ}\\).",
          "\\(a = \\dfrac{500 \\times 10^{-9}}{0.5} = 10^{-6}\\ \\text{m}\\).",
        ],
        answer: "1 μm",
      },
      practiceSet: [
        { prompt: "In single slit diffraction, write the condition for the first minimum in terms of the slit width a and the wavelength.", answer: "\\(a\\sin\\theta = \\lambda\\)" },
        { prompt: "A single slit is made narrower. Does the central maximum get wider or narrower?", answer: "Wider" },
        { prompt: "In single slit diffraction, how does the width of the central maximum compare with the width of the other bright bands?", answer: "It is twice as wide" },
        { prompt: "Why do radio waves bend round buildings while light does not?", answer: "Their wavelength is comparable to the size of a building; light's is far smaller" },
      ],
      pyqExampleId: "bf84bcf7-ce1a-4758-84fe-6164aa2aa1e3",
      traps: [
        {
          title: "nλ is dark for a single slit",
          body: "In single slit diffraction \\(a\\sin\\theta = n\\lambda\\) gives the dark points. In the double slit a path difference \\(n\\lambda\\) gives the bright ones. Do not swap them.",
        },
        {
          title: "Twice λD/a, not λD/a",
          body: "The central maximum runs from the first minimum on one side to the first on the other, so its width is \\(2\\lambda D/a\\).",
        },
        {
          title: "Not only light",
          body: "Interference and diffraction happen with every kind of wave, including sound and water waves. A statement that only light shows them is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwo-malus",
      name: "Polaroids and Malus' law",
      intuition:
        "Light is a transverse wave: its electric field shakes at right angles to the direction it travels. In ordinary (unpolarised) light it shakes in every such direction at random. A polaroid lets through only the part of the shaking along its pass axis, so the light that comes out shakes in one direction only: it is plane polarised. A second polaroid then passes a share that depends on the angle between the two axes.",
      definition:
        "- Unpolarised light of intensity \\(I_0\\) through one polaroid: \\(\\dfrac{I_0}{2}\\) comes out, whatever the way the polaroid is turned.\n" +
        "- **Malus' law:** plane polarised light of intensity \\(I_1\\) through a polaroid at angle \\(\\theta\\) to its plane of vibration gives \\(I = I_1\\cos^{2}\\theta\\).\n" +
        "- Crossed polaroids (\\(\\theta = 90^\\circ\\)) pass nothing.\n" +
        "- For a chain, multiply step by step, each \\(\\theta\\) being the angle between neighbouring axes.\n" +
        "- Only transverse waves can be polarised. Polarisation shows light is transverse; sound in air, a longitudinal wave, cannot be polarised.\n" +
        "- Polaroids are used to control how much light passes, as in sunglasses.",
      formula: {
        label: "Malus' law",
        latex: "I = I_1\\cos^{2}\\theta, \\qquad I_1 = \\frac{I_0}{2} \\ \\text{for unpolarised light}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the pass axes of neighbouring polaroids" },
          { symbol: "\\(I_0\\)", meaning: "intensity of the unpolarised light" },
        ],
      },
      authoredExample: {
        prompt:
          "Unpolarised light of intensity 40 W/m² passes through two polaroids whose pass axes are at 60° to each other. Find the intensity that comes out.",
        steps: [
          "After the first polaroid: \\(\\dfrac{40}{2} = 20\\ \\text{W/m}^{2}\\).",
          "After the second: \\(20 \\cos^{2}60^\\circ = 20 \\times \\dfrac{1}{4} = 5\\ \\text{W/m}^{2}\\).",
        ],
        answer: "5 W/m²",
      },
      selfCheckExample: {
        prompt:
          "Unpolarised light passes through two polaroids, and one quarter of the original intensity comes out. What is the angle between their pass axes?",
        steps: [
          "\\(\\dfrac{I_0}{2}\\cos^{2}\\theta = \\dfrac{I_0}{4}\\), so \\(\\cos^{2}\\theta = \\dfrac{1}{2}\\).",
          "\\(\\cos\\theta = \\dfrac{1}{\\sqrt{2}}\\), so \\(\\theta = 45^\\circ\\).",
        ],
        answer: "45°",
      },
      practiceSet: [
        { prompt: "Unpolarised light of intensity \\(I_0\\) falls on a single polaroid. What intensity comes out?", answer: "\\(I_0/2\\)" },
        { prompt: "Two polaroids are crossed, their pass axes at 90°. What intensity comes out of the second?", answer: "Zero" },
        { prompt: "Plane polarised light of intensity 8 units meets a polaroid whose pass axis is at 60° to the light's plane of vibration. What intensity comes out?", answer: "2 units" },
        { prompt: "Why can sound waves in air not be polarised?", answer: "They are longitudinal, and only transverse waves can be polarised" },
      ],
      pyqExampleId: "617fb1bb-2d69-4ea4-85d9-98b3871b2f06",
      traps: [
        {
          title: "The first polaroid halves",
          body: "For unpolarised light the first polaroid passes exactly half, \\(I_0/2\\). Do not use \\(\\cos^{2}\\theta\\) there: unpolarised light has no single direction to measure the angle from.",
        },
        {
          title: "Cos squared, not cos",
          body: "Malus' law is \\(I = I_1\\cos^{2}\\theta\\). At 60° the share is \\(1/4\\), not \\(1/2\\).",
        },
        {
          title: "Angle to the previous sheet",
          body: "In a chain of polaroids, each \\(\\theta\\) is measured from the axis of the sheet just before it, not from the first sheet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwo-brewster",
      name: "Polarisation by reflection: Brewster's law",
      visualizationSlug: "neet-brewster-angle",
      intuition:
        "Light reflected from glass or water is partly polarised. At one special angle of incidence it is completely polarised, and at that angle the reflected and refracted rays are exactly at right angles. The light that goes into the glass is only partly polarised.",
      definition:
        "- **Brewster's law:** at the polarising angle \\(i_B\\), \\(\\mu = \\tan i_B\\).\n" +
        "- At \\(i_B\\) the reflected and refracted rays are perpendicular, so \\(i_B + r = 90^\\circ\\).\n" +
        "- At \\(i_B\\) the reflected light is completely plane polarised; the refracted light is only partly polarised.\n" +
        "- Examples: \\(\\mu = \\sqrt{3}\\) gives \\(i_B = 60^\\circ\\) and \\(r = 30^\\circ\\); glass of \\(\\mu = 1.5\\) gives \\(i_B \\approx 56^\\circ\\).",
      formula: {
        label: "Brewster's law",
        latex: "\\mu = \\tan i_B, \\qquad i_B + r = 90^\\circ",
        symbols: [
          { symbol: "\\(i_B\\)", meaning: "polarising (Brewster) angle" },
          { symbol: "\\(r\\)", meaning: "angle of refraction at that incidence" },
        ],
      },
      authoredExample: {
        prompt:
          "Light falls on a glass slab at the polarising angle, and the refracted ray makes 33° with the normal. Find the angle of incidence and the refractive index of the glass.",
        steps: [
          "At the polarising angle \\(i_B + r = 90^\\circ\\), so \\(i_B = 90^\\circ - 33^\\circ = 57^\\circ\\).",
          "\\(\\mu = \\tan 57^\\circ \\approx 1.54\\).",
        ],
        answer: "57°; about 1.54",
      },
      selfCheckExample: {
        prompt:
          "Light travels at \\(2 \\times 10^{8}\\ \\text{m/s}\\) in a medium. At what angle of incidence from air is the reflected light completely polarised?",
        steps: [
          "\\(\\mu = \\dfrac{c}{v} = \\dfrac{3 \\times 10^{8}}{2 \\times 10^{8}} = 1.5\\).",
          "\\(\\tan i_B = 1.5\\), so \\(i_B \\approx 56^\\circ\\).",
        ],
        answer: "About 56°, the angle whose tangent is 1.5",
      },
      practiceSet: [
        { prompt: "State Brewster's law.", answer: "The tangent of the polarising angle equals the refractive index: \\(\\mu = \\tan i_B\\)" },
        { prompt: "At the polarising angle, what is the angle between the reflected and the refracted rays?", answer: "90°" },
        { prompt: "Is light reflected from glass completely polarised at every angle of incidence?", answer: "No; only at the polarising angle. At other angles it is partly polarised" },
        { prompt: "For water of refractive index 1.33, is the polarising angle closest to 37°, 45° or 53°?", answer: "53°" },
      ],
      pyqExampleId: "b8e5103b-2821-47df-bdf1-1bf66497d820",
      traps: [
        {
          title: "Tangent, not sine",
          body: "Brewster's law uses the tangent: \\(\\mu = \\tan i_B\\). The sine belongs to the critical angle, \\(\\sin C = 1/\\mu\\).",
        },
        {
          title: "Reflected fully, refracted partly",
          body: "At Brewster's angle only the reflected light is completely polarised. The refracted light is partly polarised.",
        },
        {
          title: "The angle of refraction is the complement",
          body: "At Brewster's angle \\(r = 90^\\circ - i_B\\). For \\(i_B = 60^\\circ\\) the refracted ray is at 30°, not 60°.",
        },
      ],
    },
  ],
};
