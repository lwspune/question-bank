import type { SubtopicNote } from "@/app/notes/_types";

export const WAVEFRONTS_WO_NOTE: SubtopicNote = {
  subtopicName: "Wavefronts and Light in a Medium",
  title: "Wavefronts and Light in a Medium",
  oneLineDefinition:
    "A wavefront is a surface of constant phase and the rays are normal to it; when light enters a medium its frequency stays the same while its speed and wavelength both fall by the factor μ.",
  whyItMatters:
    "Twelve PYQs, all multiple choice, and two from 2026. Six are about wavefronts: the shape a source or a lens gives, the direction a plane wave travels, what happens when the obstacle is much smaller than the wavelength, and which effects the wave theory cannot explain. Six follow light into a medium, where the frequency stays and the speed and wavelength change. None needs more than one line of working once the rule is clear.",
  concepts: [
    // C1 — wavefront shapes
    {
      kind: "reference" as const,
      slug: "jpwo-wavefronts",
      name: "Wavefronts, rays and Huygens' principle",
      intuition:
        "Drop a stone in a pond and the crests spread as circles. Each circle joins points that move in step, so it is a surface of constant phase: a wavefront. Light travels at right angles to its wavefronts, so the rays are the normals. Far from any source the circles are so large that a small piece of them is flat: a plane wave.",
      definition:
        "- A **wavefront** is a surface on which every point has the same phase. Rays are normal to it.\n" +
        "- **Huygens' principle:** every point of a wavefront is a source of secondary wavelets; the new wavefront is the surface that touches them all a moment later.\n" +
        "- A plane wavefront \\(ax + by + cz = \\text{constant}\\) travels along its normal \\((a, b, c)\\). Its angle with the x-axis is \\(\\cos^{-1}\\dfrac{a}{\\sqrt{a^{2} + b^{2} + c^{2}}}\\).\n" +
        "- Size against wavelength: an object much larger than \\(\\lambda\\) reflects the wave, one about \\(\\lambda\\) in size diffracts it, one much smaller than \\(\\lambda\\) scatters it.\n" +
        "- The wave theory explains reflection, refraction, interference, diffraction and polarisation. It cannot explain the photoelectric effect or the Compton effect; those need photons.",
      table: {
        columns: ["Source or situation", "Shape of the wavefront", "Rays"],
        rows: [
          { cells: ["Point source nearby", "Spherical", "Spread out from the source"] },
          { cells: ["Line source, such as a lit slit or a tube light", "Cylindrical", "Spread out at right angles to the line"] },
          { cells: ["Very distant source, such as the Sun or a star", "Plane", "Parallel"] },
          { cells: ["Point source at the focus of a convex lens, after the lens", "Plane", "Parallel"], noteAmber: "The lens turns a spherical wave into a plane one; this is how a parallel beam is made." },
          { cells: ["Plane wave after a convex lens", "Spherical, shrinking onto the focus", "Converge to the focus"] },
          { cells: ["Plane wave after a prism", "Plane, turned through the deviation", "Parallel, bent towards the base"] },
          { cells: ["Plane wave after a pinhole much smaller than the beam", "Nearly spherical", "Spread out from the hole"], noteAmber: "A wider slit lets through a flatter, less curved wave." },
        ],
        caption: "The shape of the wavefront tells you the shape of the ray bundle: spherical spreads, plane stays parallel.",
      },
      selfCheckExample: {
        prompt:
          "A plane wave has wavefronts \\(2x + y + 2z = \\text{constant}\\). What angle does its direction of travel make with the x-axis?",
        steps: [
          "The wave travels along the normal \\((2, 1, 2)\\), whose length is \\(\\sqrt{4 + 1 + 4} = 3\\).",
          "The cosine of the angle with the x-axis is \\(\\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\cos^{-1}(2/3)\\), about \\(48^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "Wavefronts \\(x + y = \\text{constant}\\). Angle of travel with the x-axis?", answer: "\\(45^{\\circ}\\)" },
        { prompt: "Shape of the wavefront from a long straight filament?", answer: "Cylindrical" },
        { prompt: "A radio wave of wavelength 10 m meets a dust particle 1 mm across. Is it reflected, diffracted or scattered?", answer: "Scattered (the particle is much smaller than λ)" },
        { prompt: "Name one effect the wave theory of light cannot explain.", answer: "The photoelectric effect (or the Compton effect)" },
      ],
      pyqExampleId: "928a8f34-f312-47ee-97f5-039bf0ce66b4", // 2025: wavefronts x + y + z = c, angle cos⁻¹(1/√3)
      traps: [
        {
          title: "The wave travels along the normal",
          body: "The direction of travel is the normal to the wavefront, given by the coefficients of x, y and z, not a line lying in the wavefront.",
        },
        {
          title: "A prism does not curve a plane wave",
          body: "A prism only turns a plane wavefront. A lens curves it, and a tiny hole makes it nearly spherical by diffraction.",
        },
        {
          title: "Photons, not waves",
          body: "Interference, diffraction and polarisation are wave effects. The photoelectric and Compton effects are particle effects, and the wave theory fails on them.",
        },
      ],
    },

    // C2 — light in a medium
    {
      kind: "formula" as const,
      slug: "jpwo-medium",
      name: "Speed, wavelength and frequency in a medium",
      intuition:
        "The source sets the frequency: it is the number of crests it pushes out each second, and no boundary can change that count. Inside a denser medium the light slows down by the factor μ. With the same number of crests each second but a lower speed, the crests must sit closer together, so the wavelength falls by the same factor μ.",
      definition:
        "- Frequency is unchanged on entering any medium; colour goes with frequency, so the colour does not change either.\n" +
        "- \\(v = \\dfrac{c}{\\mu}\\) and \\(\\lambda = \\dfrac{\\lambda_{0}}{\\mu}\\), where \\(\\lambda_{0}\\) is the wavelength in vacuum.\n" +
        "- Between two media: \\(\\dfrac{\\lambda_{1}}{\\lambda_{2}} = \\dfrac{v_{1}}{v_{2}} = \\dfrac{\\mu_{2}}{\\mu_{1}}\\), and by Snell's law \\(\\dfrac{\\sin i}{\\sin r}\\) equals the same ratio.\n" +
        "- The speed of light in vacuum is the same in every direction and does not depend on how the source moves.\n" +
        "- In a medium the speed depends on the wavelength (this is dispersion), but not on the intensity.",
      formula: {
        label: "Light in a medium",
        latex: "f = f_{0}, \\qquad v = \\frac{c}{\\mu}, \\qquad \\lambda = \\frac{\\lambda_{0}}{\\mu}, \\qquad \\frac{\\lambda_{1}}{\\lambda_{2}} = \\frac{v_{1}}{v_{2}} = \\frac{\\mu_{2}}{\\mu_{1}}",
      },
      authoredExample: {
        prompt:
          "Light of wavelength 750 nm in vacuum enters glass of refractive index 1.5. Find its speed, wavelength and frequency in the glass. (c = 3 × 10⁸ m/s)",
        steps: [
          "Speed: \\(v = \\dfrac{3 \\times 10^{8}}{1.5} = 2 \\times 10^{8}\\) m/s.",
          "Wavelength: \\(\\lambda = \\dfrac{750}{1.5} = 500\\) nm.",
          "Frequency is the vacuum value: \\(f = \\dfrac{3 \\times 10^{8}}{750 \\times 10^{-9}} = 4 \\times 10^{14}\\) Hz. Check: \\(v/\\lambda = 2 \\times 10^{8}/(5 \\times 10^{-7})\\) gives the same.",
        ],
        answer: "\\(2 \\times 10^{8}\\) m/s, 500 nm, \\(4 \\times 10^{14}\\) Hz.",
      },
      selfCheckExample: {
        prompt:
          "Light has wavelength 500 nm in a medium of refractive index 1.2. What is its wavelength in a medium of refractive index 1.6?",
        steps: [
          "Frequency is fixed, so \\(\\lambda\\mu\\) is the same in both: \\(\\lambda_{2} = \\lambda_{1}\\dfrac{\\mu_{1}}{\\mu_{2}}\\).",
          "\\(\\lambda_{2} = 500 \\times \\dfrac{1.2}{1.6} = 375\\) nm.",
        ],
        answer: "375 nm",
      },
      practiceSet: [
        { prompt: "Speed of light in water of refractive index 4/3? (c = 3 × 10⁸ m/s)", answer: "\\(2.25 \\times 10^{8}\\) m/s" },
        { prompt: "Light of frequency \\(6 \\times 10^{14}\\) Hz enters glass. Its frequency in the glass?", answer: "\\(6 \\times 10^{14}\\) Hz" },
        { prompt: "Light of wavelength 600 nm in air enters water (μ = 4/3). Wavelength in water?", answer: "450 nm" },
        { prompt: "Refractive indices 1.5 and 2. Difference of the speeds of light in them? (c = 3 × 10⁸ m/s)", answer: "\\(5 \\times 10^{7}\\) m/s" },
      ],
      pyqExampleId: "b60b8309-db13-470d-a34f-dc07beb9df9f", // 2026: 540 nm in water (4/3), in a medium of 3/2 → 480 nm
      traps: [
        {
          title: "Frequency never changes at a boundary",
          body: "Only speed and wavelength change. An option that changes the frequency, or the colour, is wrong however neat its numbers.",
        },
        {
          title: "The μ ratio is upside down",
          body: "Wavelength and speed fall as μ rises, so λ₁/λ₂ = μ₂/μ₁. Writing μ₁/μ₂ gives the answer for going the other way.",
        },
        {
          title: "Go through the vacuum value",
          body: "Given a wavelength in one medium, multiply by its μ to get λ₀, then divide by the new μ. Skipping the step is where the ratio gets inverted.",
        },
      ],
    },
  ],
};
