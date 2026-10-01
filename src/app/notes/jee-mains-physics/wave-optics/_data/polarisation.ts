import type { SubtopicNote } from "@/app/notes/_types";

export const POLARISATION_WO_NOTE: SubtopicNote = {
  subtopicName: "Polarisation by Polaroids and by Reflection",
  title: "Polarisation by Polaroids and by Reflection",
  oneLineDefinition:
    "A polaroid halves unpolarised light and then passes cos²θ of polarised light, θ being the angle from the previous axis; light reflected at Brewster's angle, tan i_B = μ, is completely polarised.",
  whyItMatters:
    "Nineteen PYQs, fourteen of them multiple choice, and five from 2026. Five send light through two polaroids, one with an optically active solution between them and one with polaroids over the slits of a double slit. Seven chain three or more sheets, most of them a third sheet slipped between two crossed ones. Seven are about Brewster's angle: the angle itself, the angle of refraction, and which way the reflected light vibrates.",
  concepts: [
    // C1 — Malus' law
    {
      kind: "formula" as const,
      slug: "jpwo-malus",
      name: "One polaroid after another: Malus' law",
      intuition:
        "Unpolarised light vibrates in every direction across the beam. A polaroid lets through only the part along its axis, which on average is half. The light that comes out is polarised along that axis. A second polaroid at angle θ passes only the component E cos θ of it, and intensity goes as the square: cos²θ.",
      definition:
        "- Unpolarised light through one polaroid: \\(I = \\dfrac{I_{0}}{2}\\), whatever the axis.\n" +
        "- Polarised light of intensity I′ through a polaroid at angle θ to its plane: \\(I = I'\\cos^{2}\\theta\\) (Malus' law).\n" +
        "- Parallel axes pass everything that reached the second sheet; crossed axes pass nothing.\n" +
        "- An optically active solution between polariser and analyser turns the plane by an angle α. With the analyser parallel to the polariser, the output is \\(\\dfrac{I_{0}}{2}\\cos^{2}\\alpha\\).\n" +
        "- Polaroids over the two slits of a double slit: find each slit's intensity with Malus first, then combine the beams with the interference formula.",
      formula: {
        label: "Malus' law",
        latex: "I_{1} = \\frac{I_{0}}{2}, \\qquad I_{2} = I_{1}\\cos^{2}\\theta",
      },
      authoredExample: {
        prompt:
          "Unpolarised light of intensity 40 W/m² passes through two polaroids whose axes are at \\(60^{\\circ}\\). Find the intensity that comes out. Then the second polaroid is turned parallel to the first and a solution that rotates the plane by \\(60^{\\circ}\\) is put between them. What comes out now?",
        steps: [
          "First polaroid: \\(\\dfrac{40}{2} = 20\\) W/m².",
          "Second: \\(20\\cos^{2}60^{\\circ} = 20 \\times \\dfrac{1}{4} = 5\\) W/m².",
          "With the solution, the light reaching the analyser is turned \\(60^{\\circ}\\) from its axis, so again \\(20\\cos^{2}60^{\\circ} = 5\\) W/m².",
        ],
        answer: "5 W/m² both times.",
      },
      selfCheckExample: {
        prompt:
          "Unpolarised light of 50 W/m² passes through two polaroids at \\(37^{\\circ}\\) (\\(\\cos 37^{\\circ} = 0.8\\)). Output?",
        steps: [
          "After the first: 25 W/m².",
          "After the second: \\(25 \\times 0.8^{2} = 16\\) W/m².",
        ],
        answer: "16 W/m²",
      },
      practiceSet: [
        { prompt: "Unpolarised light \\(I_{0}\\) through a single polaroid?", answer: "\\(I_{0}/2\\)" },
        { prompt: "Polarised light of intensity I meets a polaroid at \\(60^{\\circ}\\) to its plane. Output?", answer: "I/4" },
        { prompt: "Two polaroids, parallel, then one is turned through \\(90^{\\circ}\\). Output?", answer: "Zero" },
        { prompt: "Polariser and analyser parallel; a solution between them rotates the plane by \\(90^{\\circ}\\). Output?", answer: "Zero" },
      ],
      pyqExampleId: "45a3eb7e-a43c-4ef4-82ee-13939bc39798", // 2022: unpolarised 2I₀, polaroids at 30° → 3I₀/4
      traps: [
        {
          title: "The first sheet halves, it does not use cos²",
          body: "Unpolarised light has no single plane, so the first polaroid always passes half. Malus' law starts only from the second sheet.",
        },
        {
          title: "Polarised light is not halved",
          body: "If the light is already polarised, go straight to I cos²θ. Halving it first gives an answer half the right size.",
        },
        {
          title: "Cos squared, not cos",
          body: "Intensity goes as the square of the amplitude. At 60° the output is a quarter, not a half.",
        },
      ],
    },

    // C2 — chains of polaroids
    {
      kind: "formula" as const,
      slug: "jpwo-polaroid-chain",
      name: "Chains of polaroids",
      intuition:
        "Two crossed polaroids pass nothing. Slip a third one between them at an angle and light gets through, because each step now turns the plane only part of the way. Each sheet compares only with the sheet just before it: the light has forgotten every earlier axis.",
      definition:
        "- Each sheet multiplies by \\(\\cos^{2}\\) of the angle between its axis and the previous sheet's axis.\n" +
        "- A sheet at θ between crossed polaroids: \\(I = \\dfrac{I_{0}}{2}\\cos^{2}\\theta\\,\\sin^{2}\\theta = \\dfrac{I_{0}}{8}\\sin^{2}2\\theta\\). It is largest, \\(I_{0}/8\\), at \\(\\theta = 45^{\\circ}\\).\n" +
        "- n sheets, each at \\(45^{\\circ}\\) to the one before, unpolarised input: \\(I = \\dfrac{I_{0}}{2}\\left(\\dfrac{1}{2}\\right)^{n - 1} = \\dfrac{I_{0}}{2^{n}}\\).\n" +
        "- Order matters: a sheet placed after a crossed pair receives nothing.\n" +
        "- Some angles give the same output in pairs (θ and 90° − θ between crossed sheets); a question may need the smaller.",
      formula: {
        label: "A sheet between crossed polaroids",
        latex: "I = \\frac{I_{0}}{2}\\cos^{2}\\theta\\,\\sin^{2}\\theta = \\frac{I_{0}}{8}\\sin^{2}2\\theta, \\qquad I_{n} = \\frac{I_{0}}{2^{n}}\\ (45^{\\circ}\\ \\text{steps})",
      },
      authoredExample: {
        prompt:
          "Unpolarised light of intensity \\(I_{0}\\) meets two crossed polaroids with a third between them, its axis at \\(37^{\\circ}\\) to the first (\\(\\sin 37^{\\circ} = 0.6\\), \\(\\cos 37^{\\circ} = 0.8\\)). Find the output.",
        steps: [
          "First sheet: \\(\\dfrac{I_{0}}{2}\\).",
          "Middle sheet, \\(37^{\\circ}\\) from the first: \\(\\times 0.8^{2} = 0.64\\).",
          "Last sheet, \\(53^{\\circ}\\) from the middle: \\(\\times \\cos^{2}53^{\\circ} = 0.6^{2} = 0.36\\).",
          "\\(I = \\dfrac{I_{0}}{2} \\times 0.64 \\times 0.36 = 0.1152\\,I_{0}\\). Check: \\(\\dfrac{I_{0}}{8}(2 \\times 0.6 \\times 0.8)^{2} = \\dfrac{0.9216}{8}I_{0}\\), the same.",
        ],
        answer: "About \\(0.115\\,I_{0}\\)",
      },
      selfCheckExample: {
        prompt:
          "Unpolarised light \\(I_{0}\\) passes four sheets, each turned \\(30^{\\circ}\\) from the one before. Output?",
        steps: [
          "First sheet: \\(\\dfrac{I_{0}}{2}\\). Each of the next three: \\(\\cos^{2}30^{\\circ} = \\dfrac{3}{4}\\).",
          "\\(I = \\dfrac{I_{0}}{2}\\left(\\dfrac{3}{4}\\right)^{3} = \\dfrac{27}{128}I_{0}\\).",
        ],
        answer: "\\(\\dfrac{27}{128}I_{0} \\approx 0.21\\,I_{0}\\)",
      },
      practiceSet: [
        { prompt: "Two crossed polaroids, nothing between. Output for unpolarised \\(I_{0}\\)?", answer: "Zero" },
        { prompt: "A third sheet at \\(45^{\\circ}\\) is put after two crossed polaroids. Output?", answer: "Zero; nothing passes the crossed pair" },
        { prompt: "Five sheets, each at \\(45^{\\circ}\\) to the one before, unpolarised \\(I_{0}\\). Output?", answer: "\\(I_{0}/32\\)" },
        { prompt: "A sheet at θ between crossed polaroids. Output in terms of \\(I_{0}\\) and θ?", answer: "\\(\\dfrac{I_{0}}{8}\\sin^{2}2\\theta\\)" },
      ],
      pyqExampleId: "c74b30e6-43f2-471a-b710-7740b0446677", // 2023: n sheets at 45°, output I/64 → n = 6
      traps: [
        {
          title: "Angle to the previous sheet",
          body: "Each cos² uses the angle from the sheet just before, not from the first sheet. A sheet at 37° to the first is 53° from the last of a crossed pair.",
        },
        {
          title: "Count the halving once",
          body: "Only the first sheet halves unpolarised light. With n sheets at 45°, the factor is ½ for the first and ½ for each of the other n − 1: I₀/2ⁿ in all.",
        },
        {
          title: "Two angles can give the same output",
          body: "Between crossed sheets, θ and 90° − θ pass the same intensity. If the question wants one angle, check which one it means.",
        },
      ],
    },

    // C3 — Brewster's law
    {
      kind: "formula" as const,
      slug: "jpwo-brewster",
      name: "Polarisation by reflection: Brewster's law",
      intuition:
        "At one angle of incidence the reflected and refracted rays leave at right angles. The vibrations that would send light along the reflected ray are then pointing along that ray, and light cannot vibrate along its own direction. So the reflected light keeps only vibrations perpendicular to the plane of incidence: it is completely polarised.",
      definition:
        "- Brewster's angle: \\(\\tan i_{B} = \\dfrac{\\mu_{2}}{\\mu_{1}}\\) (from medium 1 into medium 2). For dielectrics with \\(\\mu_{r} = 1\\), \\(\\mu = \\sqrt{\\varepsilon_{r}}\\), so \\(\\tan i_{B} = \\sqrt{\\varepsilon_{2}/\\varepsilon_{1}}\\).\n" +
        "- At \\(i_{B}\\) the reflected and refracted rays are perpendicular: \\(r = 90^{\\circ} - i_{B}\\).\n" +
        "- The reflected light is completely polarised, vibrating perpendicular to the plane of incidence. The refracted light is only partly polarised.\n" +
        "- Going the other way (glass to air) the Brewster angle is \\(\\tan^{-1}\\dfrac{\\mu_{1}}{\\mu_{2}} = 90^{\\circ} - i_{B}\\).\n" +
        "- Light already polarised in the plane of incidence is not reflected at all at Brewster's angle.",
      formula: {
        label: "Brewster's law",
        latex: "\\tan i_{B} = \\frac{\\mu_{2}}{\\mu_{1}}, \\qquad i_{B} + r = 90^{\\circ}",
      },
      authoredExample: {
        prompt:
          "Unpolarised light falls from air on water of refractive index 4/3. Find Brewster's angle, the angle of refraction at that incidence, and the Brewster angle for light going from water into air.",
        steps: [
          "\\(\\tan i_{B} = \\dfrac{4}{3}\\), so \\(i_{B} \\approx 53.1^{\\circ}\\).",
          "\\(r = 90^{\\circ} - 53.1^{\\circ} = 36.9^{\\circ}\\).",
          "Water to air: \\(\\tan i = \\dfrac{3}{4}\\), so \\(i \\approx 36.9^{\\circ}\\), the complement of \\(53.1^{\\circ}\\).",
        ],
        answer: "\\(53.1^{\\circ}\\), \\(36.9^{\\circ}\\) and \\(36.9^{\\circ}\\).",
      },
      selfCheckExample: {
        prompt:
          "Light passes from a dielectric of dielectric constant 2 into one of dielectric constant 8 (both with \\(\\mu_{r} = 1\\)). At what angle of incidence are the reflected and refracted rays perpendicular?",
        steps: [
          "\\(\\tan i_{B} = \\sqrt{\\dfrac{8}{2}} = 2\\).",
          "\\(i_{B} = \\tan^{-1}2 \\approx 63.4^{\\circ}\\).",
        ],
        answer: "\\(\\tan^{-1}2 \\approx 63.4^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "Glass of μ = 1.5 in air. Angle of refraction when light falls at Brewster's angle?", answer: "About \\(33.7^{\\circ}\\)" },
        { prompt: "Angle between the reflected and refracted rays at Brewster's angle?", answer: "\\(90^{\\circ}\\)" },
        { prompt: "Which way does the reflected light vibrate at Brewster's angle?", answer: "Perpendicular to the plane of incidence" },
        { prompt: "Brewster angle air to glass is \\(i_{B}\\). Brewster angle glass to air?", answer: "\\(90^{\\circ} - i_{B}\\)" },
      ],
      pyqExampleId: "37419bea-0073-4dbc-8f31-5cb8f978d427", // 2026: glass 1.52, tan⁻¹(1.52) = 57.7°, refraction 32.3°
      traps: [
        {
          title: "Tangent, not sine",
          body: "Brewster's law is tan i_B = μ. Snell's sine law gives the angle of refraction, but the Brewster angle itself comes from the tangent.",
        },
        {
          title: "Refraction is the complement",
          body: "At Brewster's angle r = 90° − i_B. There is no need to use Snell's law; the two angles add to a right angle.",
        },
        {
          title: "Reverse direction, reverse ratio",
          body: "From glass to air the ratio is 1/μ, giving 90° − i_B. Using tan⁻¹ μ again for the glass-to-air side is the usual slip.",
        },
      ],
    },
  ],
};
